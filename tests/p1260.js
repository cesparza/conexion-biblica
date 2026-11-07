const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { montar } = require('./entorno.js');
const L = require('../fuente/p1260.js');
const g = montar('LAMINAS, CONTENIDO');
assert.deepEqual(JSON.parse(JSON.stringify(g.LAMINAS.p1260)), JSON.parse(JSON.stringify(L)), 'el artículo servido coincide con su fuente');
const { VERS } = require('../fuente/biblia.js');
const { VERS_AP } = require('../fuente/biblia-apocalipsis.js');
const src = fs.readFileSync(path.join(__dirname, '../fuente/biblia-otros.js'), 'utf8');
const OTRAS = eval('(' + src.match(/const OTRAS_VERS = (\{[\s\S]*?\n\});/)[1] + ')');
const TODO = { ...VERS, ...VERS_AP, ...OTRAS };
const versos = [];
const imgs = [];
for (const a of L.actos) {
  if (a.v) versos.push(a.v);
  for (const e of a.estaciones || []) { versos.push(e.v); imgs.push(e.img); }
  imgs.push(...(a.imgs || []), ...(a.img ? [a.img] : []));
  for (const e of [...(a.egw || []), ...(a.estaciones || []).flatMap(x => x.egw || [])]) { assert(/pp?\. \d/.test(e.fuente), 'cita de Elena de White con página: ' + e.t.slice(0, 40)); assert(!/\b(the|and|which|would|of the)\b/i.test(e.t) && !/Great Controversy/.test(e.fuente), 'cita en español, de la edición en español: ' + e.t.slice(0, 40)); }
  for (const o of a.otros || []) { const [lib, cv] = o.ref.split(' '); const [c, v] = cv.split(':'); const k = lib.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + '-' + c; assert.equal(o.t, OTRAS[k][v], 'texto literal: ' + o.ref); }
}
for (const v of versos) { const t = TODO[v.cap] && TODO[v.cap][v.de]; assert(t, 'el versículo existe: ' + v.cap + ':' + v.de); if (v.frase) assert(t.includes(v.frase), 'la frase es literal: ' + v.cap + ':' + v.de); }
for (const f of new Set(imgs)) assert(fs.existsSync(path.join(__dirname, '../laminas', L.dir, f + '.webp')), 'imagen existente: ' + f);
const caps = g.CONTENIDO ? Object.keys(g.CONTENIDO) : null;
for (const c of L.en) assert(VERS[c] || VERS_AP[c], 'el capítulo enlazado existe: ' + c);
const cuenta = L.actos.find(a => a.tipo === 'cuenta');
assert.equal(cuenta.tramos.reduce((x, y) => x + y, 0), cuenta.a, 'tiempo + tiempos + medio tiempo = 1.260');
const b = L.actos.find(a => a.tipo === 'barra');
assert.equal(b.total - b.parte, 1260, 'los 1.290 menos los treinta años antes son los 1.260');
assert(L.actos.find(a => a.id === 'inicio').egw.some(e => e.t.includes('538') && e.t.includes('1798')), '538 y 1798 vienen de Elena de White');
const nom = L.actos.find(a => a.id === 'nombres').estaciones.map(e => e.v.cap + ':' + e.v.de);
for (const r of ['d7:25', 'd12:7', 'ap12:6', 'ap12:14', 'ap11:2', 'ap11:3', 'ap13:5']) assert(nom.includes(r), 'la Biblia nombra el período en ' + r);
console.log('Los 1.260 años: fuente y entrega, versículos literales, citas con página, imágenes, enlaces y aritmética: TODO BIEN');
