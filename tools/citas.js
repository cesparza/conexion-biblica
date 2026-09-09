#!/usr/bin/env node
/**
 * Verifica que fuente/biblia.js coincide con el texto RV1995 de files/.
 *
 * POR QUE CAMBIO DE PAPEL
 * Antes esta herramienta cotejaba todo el material contra los .txt. Eso ahora
 * lo hace la suite (tests/test.js), en cada corrida, contra fuente/biblia.js,
 * que vive en el repositorio. Quedan dos niveles y cada uno cuida una cosa:
 *
 *   tests/test.js  → el material coincide con biblia.js   (en cada corrida)
 *   tools/citas.js → biblia.js coincide con files/*.txt    (cuando hay files/)
 *
 * Sin este segundo nivel, biblia.js podria irse desviando del texto real y la
 * suite seguiria en verde: estaria comparando el material contra una copia ya
 * equivocada. Los .txt viven fuera del repositorio porque el repo es publico,
 * asi que esta herramienta solo puede correr en la maquina de Camilo.
 *
 * USO
 *   node tools/citas.js
 * Sale con 1 si algo no coincide; con 0 y un aviso si no encuentra files/.
 */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

const CANDIDATOS = [
  path.join(RAIZ, '..', '..', 'files'),
  path.join(RAIZ, '..', 'files'),
  path.join(RAIZ, 'files'),
];
const CARPETA = CANDIDATOS.find(d => fs.existsSync(path.join(d, 'rv1995-daniel-1.txt')));

if (!CARPETA) {
  console.log('⚠️  No se encontro rv1995-daniel-1.txt en ninguna de estas rutas:');
  CANDIDATOS.forEach(d => console.log('     ' + d));
  console.log('   Los .txt viven fuera del repositorio. Nada que verificar.');
  process.exit(0);
}

const { VERS } = require(path.join(RAIZ, 'fuente', 'biblia.js'));

let iguales = 0;
const fallos = [];
let totalTxt = 0;

for (let n = 1; n <= 12; n++) {
  const cid = 'd' + n;
  const enTxt = {};
  const bruto = fs.readFileSync(path.join(CARPETA, `rv1995-daniel-${n}.txt`), 'utf8');
  for (const linea of bruto.split('\n')) {
    const m = linea.match(/^(\d+)\|(.*)$/);
    if (m) { enTxt[+m[1]] = m[2]; totalTxt++; }
  }
  const numsTxt = Object.keys(enTxt).map(Number).sort((a, b) => a - b);
  const numsJs = Object.keys(VERS[cid] || {}).map(Number).sort((a, b) => a - b);

  if (numsTxt.length !== numsJs.length)
    fallos.push(`${cid}: el .txt trae ${numsTxt.length} versiculos y biblia.js ${numsJs.length}`);

  for (const v of numsTxt) {
    const a = enTxt[v];
    const b = (VERS[cid] || {})[v];
    if (b === undefined) { fallos.push(`${cid}:${v} falta en biblia.js`); continue; }
    /* Comparacion EXACTA, caracter por caracter: el punto de este proyecto es
       que la niña memorice el texto tal cual. Una coma de diferencia importa. */
    if (a === b) iguales++;
    else fallos.push(`${cid}:${v} no es identico\n     txt: ${a.slice(0, 110)}\n     js:  ${String(b).slice(0, 110)}`);
  }
}

console.log(`Versiculos comparados: ${iguales} identicos de ${totalTxt} en los .txt.`);
if (fallos.length) {
  console.log('');
  fallos.slice(0, 12).forEach(f => console.log('❌ ' + f));
  if (fallos.length > 12) console.log(`   … y ${fallos.length - 12} mas.`);
  console.log('\nfuente/biblia.js se genero de estos .txt. Si hay que corregir un');
  console.log('versiculo, se corrige el .txt y se regenera: no se editan los dos.');
  process.exit(1);
}
console.log('✅ fuente/biblia.js es identico al texto RV1995 de ' + CARPETA);
