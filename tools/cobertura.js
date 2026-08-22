/* Reporte de cobertura del material.
   Mecanismo: casi toda pregunta lleva su referencia en el texto
   («(Daniel 1:11)»), así que se extrae con una expresión regular y se
   cuenta qué versículos del alcance quedan sin una sola pregunta.
   Sirve para ver dónde se pierden puntos, no para adivinar.
   Uso:  node tools/cobertura.js            (resumen)
         node tools/cobertura.js --detalle  (lista versículo por versículo) */
const { CAPS, CONTENIDO } = require('../fuente/contenido.js');
const { BANCO } = require('../fuente/preguntas.js');
const { TARJETAS } = require('../fuente/tarjetas.js');
const { CONT_MODULOS } = require('../fuente/modulos.js');

/* Versículos por capítulo en Daniel (RV1995), para saber el denominador. */
const VERSICULOS = { d1: 21, d2: 49, d3: 30, d4: 37, d5: 31, d6: 28 };

const texto = q => [q.q, q.ins, q.e, ...(q.o || []),
  ...(q.p || []).map(p => (p.x || '') + (p.b || ''))].filter(Boolean).join(' ');

/* Devuelve el set de versículos citados por una pregunta. */
function refsDe(q) {
  const out = new Set();
  const t = texto(q);
  const re = /(?:Daniel\s*)?(\d{1,2})\s*:\s*(\d{1,2})(?:\s*[-,–]\s*(\d{1,2}))?/g;
  let m;
  while ((m = re.exec(t))) {
    const cap = 'd' + m[1];
    if (!VERSICULOS[cap]) continue;
    const a = Number(m[2]), b = Number(m[3] || m[2]);
    for (let v = a; v <= Math.min(b, VERSICULOS[cap]); v++) out.add(cap + ':' + v);
  }
  return out;
}

const cubiertos = new Set();
for (const q of BANCO) refsDe(q).forEach(r => cubiertos.add(r));
/* Cobertura de la GUÍA (contenido por capítulo + módulos + tarjetas):
   qué versículos se estudian, aunque no tengan pregunta todavía. */
const enGuia = new Set();
const trozos = [];
Object.values(CONTENIDO).forEach(v => v.forEach(s => trozos.push(s.t + ' ' + s.h)));
Object.values(CONT_MODULOS).forEach(v => v.forEach(s => trozos.push(s.t + ' ' + s.h)));
TARJETAS.forEach(t => trozos.push(t.f + ' ' + t.r));
trozos.forEach(t => refsDe({ q: t }).forEach(r => enGuia.add(r)));

console.log('COBERTURA DEL LIBRO DE DANIEL, versículo por versículo\n');
let faltanTotal = [];
for (const [cap, n] of Object.entries(VERSICULOS)) {
  const falta = [];
  for (let v = 1; v <= n; v++) if (!cubiertos.has(cap + ':' + v)) falta.push(v);
  const pct = Math.round((n - falta.length) / n * 100);
  let enG = 0;
  for (let v = 1; v <= n; v++) if (enGuia.has(cap + ':' + v)) enG++;
  const barra = '█'.repeat(Math.round(pct / 5)).padEnd(20, '·');
  console.log(`  ${cap.toUpperCase().padEnd(3)} ${barra} preguntas ${String(pct).padStart(3)}%` +
    `  ·  guía ${String(Math.round(enG / n * 100)).padStart(3)}%`);
  if (process.argv.includes('--detalle') && falta.length)
    console.log(`      sin pregunta: ${falta.join(', ')}`);
  faltanTotal = faltanTotal.concat(falta.map(v => cap + ':' + v));
}

/* Preguntas por capítulo y peso de Profetas y Reyes. */
const porCap = {};
for (const q of BANCO) porCap[q.cap] = (porCap[q.cap] || 0) + 1;
const pr = Object.entries(porCap).filter(([k]) => k.startsWith('pr'));
const nPR = pr.reduce((s, [, v]) => s + v, 0);

console.log('\nPESO DE CADA FUENTE EN EL BANCO');
console.log(`  Libro de Daniel ......... ${BANCO.length - nPR} preguntas ` +
  `(${Math.round((BANCO.length - nPR) / BANCO.length * 100)}%)`);
console.log(`  Profetas y Reyes ........ ${nPR} preguntas ` +
  `(${Math.round(nPR / BANCO.length * 100)}%)`);
console.log('  Nota: el reparto del examen REAL no se conoce. El 20% se toma del');
console.log('  examen de práctica de 100 preguntas, no de una fuente del campamento.');

console.log('\nPREGUNTAS POR CAPÍTULO');
for (const c of CAPS) {
  const n = porCap[c.id] || 0;
  const alerta = n < 8 ? '  ← pocas' : '';
  console.log(`  ${c.label.padEnd(9)} ${String(n).padStart(3)}${alerta}`);
}

/* Por tipo, dentro de cada categoría. */
console.log('\nPOR TIPO Y CATEGORÍA');
for (const cat of ['av', 'gm']) {
  const ids = CAPS.filter(c => c.cats.includes(cat)).map(c => c.id);
  const b = BANCO.filter(q => ids.includes(q.cap));
  const t = x => b.filter(q => q.t === x).length;
  console.log(`  ${cat === 'av' ? 'Aventureros ' : 'Guías Mayores'} ` +
    `total ${String(b.length).padStart(3)}  ·  múltiple ${t('mc')}  V/F ${t('tf')}  completar ${t('fill')}`);
}

console.log(`\nRESUMEN: ${faltanTotal.length} versículos de Daniel sin una sola pregunta.`);
if (!process.argv.includes('--detalle'))
  console.log('Corre con --detalle para ver cuáles.');
