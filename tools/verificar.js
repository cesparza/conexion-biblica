/* Verificador de citas contra el texto RV1995.

   MECANISMO
   Se le pasa un archivo con versículos verificados uno por línea, en el
   formato «d3:5 texto...». El script recorre el material y, para cada cita
   que declara una referencia, comprueba que las palabras que afirma estén
   realmente en ese versículo. Compara sin tildes, sin mayúsculas y sin
   puntuación, porque lo que importa es la palabra, no el formato.

   QUÉ REVISA
   1. Preguntas de completar: cada palabra en blanco (la respuesta) tiene que
      aparecer en el versículo citado. Si no aparece, la estudiante escribiría
      la respuesta "correcta" y estaría mal en el examen real.
   2. El texto visible de esas mismas preguntas.
   3. Las citas entre comillas angulares («») del contenido y los módulos que
      llevan una referencia al lado.

   Es la red que faltaba: así se encontró que la RV1995 dice «cítara» y no
   «tamboril» en Daniel 3:5.

   Uso:  node tools/verificar.js [archivoDeReferencia]                      */
const fs = require('fs');
const path = require('path');
const { CONTENIDO } = require('../fuente/contenido.js');
const { BANCO } = require('../fuente/preguntas.js');
const { CONT_MODULOS } = require('../fuente/modulos.js');
const { TARJETAS } = require('../fuente/tarjetas.js');

const REF = process.argv[2] || '/tmp/rv1995/verificados.txt';
if (!fs.existsSync(REF)) {
  console.log('No encuentro el archivo de referencia:', REF);
  console.log('Debe tener una línea por versículo, así:  d3:5 que al oír el son...');
  process.exit(2);
}

/* Normaliza para comparar: sin tildes, sin puntuación, minúsculas. */
const norm = s => String(s)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .toLowerCase()
  .replace(/[^a-z0-9ñ ]/g, ' ')
  .replace(/\s+/g, ' ').trim();

const TEXTO = {};
for (const linea of fs.readFileSync(REF, 'utf8').split('\n')) {
  const m = linea.match(/^(d\d+):(\d+)\s+(.*)$/);
  if (m) TEXTO[m[1] + ':' + m[2]] = norm(m[3]);
}
const refsConocidas = Object.keys(TEXTO).length;

let problemas = [];
let revisadas = 0;
let sinReferencia = 0;

/* Extrae la referencia (cap:versículo) de un texto suelto. */
function refDe(s) {
  const m = String(s).match(/(?:Daniel\s*)?(\d{1,2})\s*:\s*(\d{1,2})/);
  return m ? 'd' + m[1] + ':' + m[2] : null;
}

/* ── 1 y 2. Preguntas de completar ── */
for (const q of BANCO.filter(x => x.t === 'fill')) {
  const ref = refDe(q.ins);
  if (!ref) { sinReferencia++; continue; }
  if (!TEXTO[ref]) continue;               // versículo no verificado aún
  revisadas++;
  const versiculo = TEXTO[ref];

  /* La respuesta: la palabra en blanco tiene que estar en el versículo. */
  for (const p of q.p) {
    if (!p.b) continue;
    if (!versiculo.includes(norm(p.b)))
      problemas.push(`[${ref}] RESPUESTA que no está en el versículo: «${p.b}»\n        en: ${q.ins}`);
  }

  /* La cita completa: se reconstruye poniendo las respuestas en su lugar y se
     compara contra el versículo. Los puntos suspensivos parten la cita en
     fragmentos, y cada fragmento debe aparecer tal cual. */
  const completa = q.p.map(p => p.b ? p.b : p.x).join('');
  for (const frag of fragmentos(completa)) {
    if (!versiculo.includes(frag))
      problemas.push(`[${ref}] CITA que no coincide con el texto:\n        dice:  «${frag}»\n        en:    ${q.ins}`);
  }
}

/* Parte una cita en los fragmentos separados por puntos suspensivos, y
   descarta los muy cortos (una o dos palabras no prueban nada). */
function fragmentos(cita) {
  return String(cita)
    .split(/\.\.\.|…/)
    .map(norm)
    .filter(f => f.split(' ').length >= 4);
}

/* ── 3. Citas entre comillas angulares con referencia al lado ── */
const trozos = [];
for (const [cap, secs] of Object.entries(CONTENIDO))
  secs.forEach(s => trozos.push({ donde: 'contenido/' + cap, t: s.t, h: s.h }));
for (const [mid, secs] of Object.entries(CONT_MODULOS))
  secs.forEach(s => trozos.push({ donde: 'modulo/' + mid, t: s.t, h: s.h }));
TARJETAS.forEach(t => trozos.push({ donde: 'tarjeta/' + t.cap, t: t.f, h: t.r }));

for (const z of trozos) {
  /* Cada cita «...» junto con la referencia que la acompaña en la misma sección */
  const citas = [...String(z.h).matchAll(/«([^»]{25,400})»/g)].map(m => m[1]);
  if (!citas.length) continue;
  const refs = [...String(z.h).matchAll(/(\d{1,2})\s*:\s*(\d{1,2})/g)].map(m => 'd' + m[1] + ':' + m[2]);
  const conocidas = refs.filter(r => TEXTO[r]);
  if (!conocidas.length) continue;
  for (const cita of citas) {
    const frags = fragmentos(cita);
    if (!frags.length) continue;
    revisadas++;
    /* Basta que la cita calce con alguno de los versículos citados en la
       sección: una sección puede citar dos o tres. */
    const calza = conocidas.some(r => frags.every(f => TEXTO[r].includes(f)));
    if (!calza)
      problemas.push(`[${conocidas.join('/')}] CITA que no calza con el texto\n        ${z.donde} · ${z.t}\n        «${cita.slice(0, 150)}»`);
  }
}

console.log(`VERIFICACIÓN CONTRA RV1995`);
console.log(`  Versículos de referencia disponibles: ${refsConocidas}`);
console.log(`  Citas y respuestas contrastadas: ${revisadas}`);
if (sinReferencia) console.log(`  Preguntas de completar sin referencia legible: ${sinReferencia}`);
console.log('');
if (!problemas.length) {
  console.log('✅ Ninguna discrepancia. Todo lo contrastado coincide con el texto.');
} else {
  console.log(`❌ ${problemas.length} discrepancias:\n`);
  problemas.forEach((p, i) => console.log(`  ${i + 1}. ${p}\n`));
}
process.exit(problemas.length ? 1 : 0);
