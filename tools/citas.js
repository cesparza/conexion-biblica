#!/usr/bin/env node
/**
 * Coteja TODA cita biblica del material contra el texto RV1995 verificado.
 *
 * MECANISMO
 * En este proyecto las comillas angulares « » estan reservadas para citas de
 * la Biblia: nada mas va entre ellas. Asi que el verificador puede extraer
 * cada fragmento entre « » del contenido de estudio, normalizarlo (sin
 * etiquetas, sin dobles espacios, sin distinguir mayusculas) y exigir que
 * aparezca literal en files/rv1995-daniel-N.txt.
 *
 * Una cita con elipsis se parte por «...» y cada trozo se coteja aparte: en
 * el texto original esos trozos estan separados, pero cada uno tiene que
 * existir tal cual.
 *
 * POR QUE EXISTE
 * Dos veces se colo redaccion de RV1960 en citas rotuladas como RV1995, y las
 * dos veces la encontro una lectura a ojo, no una prueba. Los casos reales
 * fueron «tus pecados redime con justicia» por «redime tus pecados con
 * justicia» (4:27), «hiciesen» por «hicieran» (6:22), «ardiendo» por
 * «ardiente» y «de tu mano» por «de tus manos» (3:17), y comas de mas. Nada
 * de eso rompe la app: solo hace que la niña memorice la version equivocada
 * de un versiculo que el examen pregunta literal.
 *
 * USO
 *   node tools/citas.js
 * Sale con codigo 1 si algo no coincide. Si no encuentra los archivos de
 * files/ avisa y sale con 0, porque viven fuera del repositorio.
 */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

/* files/ vive fuera del repositorio: el material impreso no puede quedar en
   un repo publico. Se busca al lado del proyecto y dos niveles arriba. */
const CANDIDATOS = [
  path.join(RAIZ, '..', '..', 'files'),
  path.join(RAIZ, '..', 'files'),
  path.join(RAIZ, 'files'),
];
const CARPETA = CANDIDATOS.find(d => fs.existsSync(path.join(d, 'rv1995-daniel-1.txt')));

if (!CARPETA) {
  console.log('⚠️  No se encontro rv1995-daniel-1.txt en ninguna de estas rutas:');
  CANDIDATOS.forEach(d => console.log('     ' + d));
  console.log('   Sin el texto fuente no se puede cotejar. Nada que verificar.');
  process.exit(0);
}

const norm = s => String(s)
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/[«»“”]/g, '')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

let biblia = '';
for (let n = 1; n <= 6; n++) {
  const f = path.join(CARPETA, `rv1995-daniel-${n}.txt`);
  biblia += ' ' + fs.readFileSync(f, 'utf8')
    .split('\n').map(l => l.replace(/^\d+\|/, '')).join(' ');
}
biblia = norm(biblia);

const { CONTENIDO } = require(path.join(RAIZ, 'fuente', 'contenido.js'));
const CAPS_BIBLIA = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];

let exactas = 0;
const malas = [];
for (const cap of CAPS_BIBLIA) {
  for (const sec of (CONTENIDO[cap] || [])) {
    for (const m of sec.h.matchAll(/«([^»]{12,500})»/g)) {
      for (const parte of norm(m[1]).split(/\.\.\.|…/)) {
        const frase = parte.replace(/^[ ,;:.]+|[ ,;:.]+$/g, '').trim();
        if (frase.length < 12) continue;
        if (biblia.includes(frase)) exactas++;
        else malas.push({ cap, sec: sec.t, frase });
      }
    }
  }
}

console.log(`Citas cotejadas contra RV1995: ${exactas} exactas, ${malas.length} con diferencia.`);
if (malas.length) {
  console.log('');
  for (const m of malas) {
    console.log(`❌ [${m.cap}] ${m.sec}`);
    console.log(`   dice: ${m.frase.slice(0, 160)}`);
  }
  console.log('\nRevisar contra ' + CARPETA + '. Casi siempre es RV1960 colada en una cita RV1995.');
  process.exit(1);
}
console.log('✅ Todas las citas de Daniel 1-6 coinciden con RV1995.');
