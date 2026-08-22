/* Revisión de los niveles asignados. Sirve para leer cómo quedó
   clasificado el banco y decidir si alguna pregunta necesita `nv:`.
   Uso:  node tools/niveles.js            (resumen)
         node tools/niveles.js 1          (lista las de nivel 1)  */
const { CAPS } = require('../fuente/contenido.js');
const { BANCO } = require('../fuente/preguntas.js');
const { nivelDe, ETIQUETA } = require('../fuente/niveles.js');

const pedido = Number(process.argv[2]);
const porNivel = { 1: [], 2: [], 3: [] };
for (const q of BANCO) porNivel[nivelDe(q)].push(q);

console.log('NIVELES DEL BANCO\n');
for (const n of [1, 2, 3]) {
  const g = porNivel[n];
  const tipos = ['mc', 'tf', 'fill'].map(t => t + ':' + g.filter(q => q.t === t).length).join(' ');
  console.log(`  Nivel ${n} — ${ETIQUETA[n].padEnd(11)} ${String(g.length).padStart(3)} preguntas   (${tipos})`);
}

for (const cat of ['av', 'gm']) {
  const ids = CAPS.filter(c => c.cats.includes(cat)).map(c => c.id);
  const b = BANCO.filter(q => ids.includes(q.cap));
  const c = n => b.filter(q => nivelDe(q) === n).length;
  console.log(`\n  ${cat === 'av' ? 'Aventureros ' : 'Guías Mayores'}: ` +
    `nivel 1 = ${c(1)} · nivel 2 = ${c(2)} · nivel 3 = ${c(3)}`);
}

if ([1, 2, 3].includes(pedido)) {
  console.log(`\n─── Preguntas de nivel ${pedido} (${ETIQUETA[pedido]}) ───`);
  porNivel[pedido].forEach(q => console.log(`  [${q.cap}] ${(q.q || q.ins).slice(0, 95)}`));
}
