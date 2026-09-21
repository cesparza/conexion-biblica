/* ¿Qué tan difícil es el banco, de verdad?

   MECANISMO. Una pregunta de selección múltiple no se hace difícil por el tema
   sino por los distractores: si tres de las cuatro opciones se pueden descartar
   SIN saber la respuesta, la pregunta mide otra cosa. Esta herramienta busca las
   formas en que un distractor se delata, cada una con su ejemplo, para poder
   arreglarlas donde de verdad están.

   No mide si el contenido es profundo. Mide si la forma regala la respuesta. */

const { BANCO } = require('../fuente/preguntas.js');
const { CAPS }  = require('../fuente/contenido.js');

const limpia = s => String(s || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();

const hayNumero = s => /\d|\b(un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|veinte|treinta|sesenta|setenta|cien|mil)\b/i.test(limpia(s));
const esNombre  = s => /^[A-ZÁÉÍÓÚÑ]/.test(String(s || '').trim().replace(/^(el|la|los|las|un|una)\s+/i, ''));

/* Todo el texto de estudio, para saber si un distractor existe en el material. */
const TEXTO = (() => {
  let t = '';
  for (const c of (CAPS || [])) {
    t += ' ' + (c.label || '') + ' ' + (c.sub || '');
    for (const s of (c.secciones || c.sec || [])) t += ' ' + (s.t || '') + ' ' + (s.c || s.cuerpo || '');
  }
  for (const q of BANCO) t += ' ' + (q.q || q.ins || '') + ' ' + (q.o || []).join(' ') + ' ' + (q.exp || '');
  return limpia(t);
})();

const mc = BANCO.filter(q => q.t === 'mc' && Array.isArray(q.o) && q.o.length === 4);
const tf = BANCO.filter(q => q.t === 'tf');

const H = { enunciado: [], clase: [], inexistente: [], rara: [], absolutos: [] };

for (const q of mc) {
  const cor = q.o[q.a];
  const dis = q.o.filter((_, i) => i !== q.a);
  const enun = limpia(q.q);
  const c = limpia(cor);

  /* 1. La respuesta ya está escrita en la pregunta. */
  if (c.length > 3 && enun.includes(c)) H.enunciado.push({ q, por: cor });

  /* 2. La correcta es de otra clase que los distractores: número contra texto,
        o nombre propio contra sustantivo común. Se puede escoger sin leer. */
  const nCor = hayNumero(cor), nDis = dis.filter(hayNumero).length;
  if (nCor && nDis === 0) H.clase.push({ q, por: 'la correcta trae número y ninguna otra' });
  else if (!nCor && nDis === 3) H.clase.push({ q, por: 'las tres falsas traen número y la correcta no' });
  else {
    const pCor = esNombre(cor), pDis = dis.filter(esNombre).length;
    if (pCor && pDis === 0) H.clase.push({ q, por: 'la correcta es nombre propio y ninguna otra' });
  }

  /* 3. Un distractor que NO aparece en ninguna parte del material se descarta
        sin saber nada: quien estudió sabe que esa palabra no existe ahí. */
  const fuera = dis.filter(d => { const x = limpia(d); return x.length > 4 && !TEXTO.includes(x); });
  if (fuera.length >= 2) H.inexistente.push({ q, por: fuera.length + ' de 3 no existen en el material' });

  /* 4. Las tres falsas se parecen entre sí y la correcta es la rara. */
  const par = (a, b) => { const A = new Set(limpia(a).split(' ')), B = limpia(b).split(' ');
    return B.filter(w => A.has(w)).length / Math.max(1, B.length); };
  const entreFalsas = (par(dis[0], dis[1]) + par(dis[1], dis[2]) + par(dis[0], dis[2])) / 3;
  const contraCor   = (par(cor, dis[0]) + par(cor, dis[1]) + par(cor, dis[2])) / 3;
  if (entreFalsas > 0.55 && contraCor < 0.20) H.rara.push({ q, por: 'las tres falsas se parecen y la correcta no' });
}

/* 5. Verdadero o falso con absolutos: casi siempre son falsas, y se sabe. */
const ABS = /\b(siempre|nunca|todos|todas|ninguno|ninguna|jamas|unico|unica|solamente)\b/;
for (const q of tf) if (ABS.test(limpia(q.q))) H.absolutos.push({ q, por: 'usa un absoluto', vf: q.a });

const pct = (n, d) => d ? (n / d * 100).toFixed(1) + '%' : '0%';
const muestra = (a, n = 3) => a.slice(0, n).map(x =>
  '      · [' + x.q.cap + '] ' + String(x.q.q).slice(0, 88) + (String(x.q.q).length > 88 ? '…' : '') +
  '\n        correcta: ' + (x.q.o ? x.q.o[x.q.a] : x.q.a) + '   (' + x.por + ')').join('\n');

console.log('BANCO DE DANIEL Y PROFETAS Y REYES');
console.log('  ' + BANCO.length + ' preguntas: ' + mc.length + ' de selección, ' + tf.length +
  ' de verdadero o falso, ' + BANCO.filter(q => q.t === 'fill').length + ' de completar\n');

const nv = BANCO.reduce((a, q) => { a[q.nv || 1] = (a[q.nv || 1] || 0) + 1; return a; }, {});
console.log('NIVEL DECLARADO  (sin `nv`, la pregunta cuenta como nivel 1)');
for (const k of Object.keys(nv).sort()) console.log('  nivel ' + k + ': ' + nv[k] + '  (' + pct(nv[k], BANCO.length) + ')');
console.log('');

console.log('DONDE LA FORMA REGALA LA RESPUESTA  (sobre ' + mc.length + ' de selección)');
const filas = [
  ['La respuesta está escrita en el enunciado', H.enunciado],
  ['La correcta es de otra clase que las falsas', H.clase],
  ['Dos o más falsas no existen en el material', H.inexistente],
  ['Las tres falsas se parecen y la correcta no', H.rara],
];
let tocadas = new Set();
for (const [t, a] of filas) {
  console.log('  ' + t.padEnd(46) + String(a.length).padStart(4) + '  ' + pct(a.length, mc.length));
  a.forEach(x => tocadas.add(x.q));
}
console.log('  ' + '—'.repeat(46) + '  ' + String(tocadas.size).padStart(4) + '  ' + pct(tocadas.size, mc.length) + ' del total con alguna señal\n');

for (const [t, a] of filas) {
  if (!a.length) continue;
  console.log('  ' + t.toUpperCase() + ' (' + a.length + ')');
  console.log(muestra(a));
  console.log('');
}

console.log('VERDADERO O FALSO');
const ver = tf.filter(q => q.a === true || q.a === 1).length;
console.log('  verdaderas: ' + ver + ' de ' + tf.length + ' (' + pct(ver, tf.length) + ')');
console.log('  con un absoluto (siempre, nunca, todos): ' + H.absolutos.length + '  ' + pct(H.absolutos.length, tf.length));
if (H.absolutos.length) {
  const absFalsas = H.absolutos.filter(x => !(x.vf === true || x.vf === 1)).length;
  console.log('  y de esas, ' + absFalsas + ' son FALSAS (' + pct(absFalsas, H.absolutos.length) +
    '): si el patrón pasa de 70%, el absoluto es la pista');
  console.log(muestra(H.absolutos, 2));
}
