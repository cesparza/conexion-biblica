const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { montar } = require('./entorno.js');
const L = require('../fuente/daniel12.js');
const D11 = require('../fuente/daniel11.js').lamina;
const g = montar('LAMINAS, CONTENIDO');
assert.deepEqual(JSON.parse(JSON.stringify(g.LAMINAS.d12)), JSON.parse(JSON.stringify(L)), 'Daniel 12 servido coincide con su fuente');
const { VERS } = require('../fuente/biblia.js');
const img = (Lm, f) => path.join(__dirname, '../laminas', f.includes('/') ? '' : Lm.dir, f + '.webp');
const versos = [];
for (const a of L.actos) {
  if (a.v) versos.push(a.v);
  for (const f of [...(a.imgs || []), ...(a.img ? [a.img] : []), ...(a.estaciones || []).map(e => e.img)]) assert(fs.existsSync(img(L, f)), 'imagen: ' + f);
  for (const e of a.estaciones || []) { versos.push(e.v); assert(e.fuente && /p\. \d/.test(e.fuente), 'nota con fuente y página: ' + e.rot); }
  for (const e of a.egw || []) { assert(/pp?\. \d/.test(e.fuente), 'Elena de White con página'); assert(!/\b(the|and|which|would)\b/i.test(e.t), 'Elena de White en español'); }
}
const textos = JSON.stringify(L.actos.map(a => ({ ...a, estaciones: (a.estaciones || []).map(e => ({ ...e, fuente: '' })), egw: [] }))) + JSON.stringify(L.partes);
assert(!/\b(Bohr|Treiyer|seg[uú]n)\b/.test(textos), 'voz directa: los autores van solo en la fuente');
for (const v of versos) { const t = VERS[v.cap] && VERS[v.cap][v.de]; assert(t, 'versículo: ' + v.cap + ':' + v.de); if (v.frase) assert(t.includes(v.frase), 'frase literal ' + v.cap + ':' + v.de); }
assert.deepEqual([...new Set(L.actos.filter(a => a.v && a.v.cap === 'd12').map(a => a.v.de))].sort((a, b) => a - b), [1, 2, 3, 4, 7, 10, 13], 'escenas en el orden del capítulo');
const p = L.actos.find(a => a.id === 'periodos').estaciones;
assert(p[1].rot.includes('principal') && p[1].fuente.startsWith('Bohr') && p[1].fecha === '1843' && p[2].fuente.startsWith('Treiyer') && p[2].fecha.includes('1844'), '1.335: Bohr principal (1843) y Treiyer como otra lectura (1844)');
// Comparar: Daniel 11 y 12 son columnas, cada parte con texto literal y escena que existe
for (const [Lm, cap] of [[D11, 'd11'], [L, 'd12']]) {
  assert(Lm.partes.length >= 4, cap + ' tiene partes para Comparar');
  for (const q of [...Lm.partes, ...(Lm.cmpExtra || [])]) {
    const v = Number(String(q.ref).split(':')[1]);
    assert(VERS[cap][v].includes(q.texto), 'texto literal de ' + cap + ':' + v);
    assert(Lm.actos.some(a => a.id === q.acto), 'la escena existe: ' + q.acto);
    assert(fs.existsSync(img(Lm, q.img)), 'imagen de la parte: ' + q.img);
  }
}
for (const a of D11.actos) assert(!/^(camino|d8\/|d2\/|d7\/)/.test(a.img), 'Daniel 11 ya no usa imágenes de otros capítulos: ' + a.id);
console.log('Daniel 12: cine de 8 escenas, versículos literales, citas con página, 1.335 con las dos lecturas, y Daniel 11 y 12 en Comparar: TODO BIEN');
