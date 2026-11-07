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
  for (const o of a.otros || []) { const [lib, cv] = o.ref.split(' '); const [c, v] = cv.split(':'); const k = lib.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') + '-' + c; if (!OTRAS[k]) { assert(a.tipo === 'diluvio' && o.ver === 'RV1909' && /^Génesis [78]:/.test(o.ref), 'texto fuera de la Biblia de la app solo en el diluvio: ' + o.ref); continue; } assert.equal(o.t, OTRAS[k][v], 'texto literal: ' + o.ref); }
}
for (const v of versos) { const t = TODO[v.cap] && TODO[v.cap][v.de]; assert(t, 'el versículo existe: ' + v.cap + ':' + v.de); if (v.frase) assert(t.includes(v.frase), 'la frase es literal: ' + v.cap + ':' + v.de); }
for (const f of new Set(imgs)) assert(fs.existsSync(path.join(__dirname, '../laminas', L.dir, f + '.webp')), 'imagen existente: ' + f);
const caps = g.CONTENIDO ? Object.keys(g.CONTENIDO) : null;
for (const c of L.en) assert(VERS[c] || VERS_AP[c], 'el capítulo enlazado existe: ' + c);
const cuenta = L.actos.find(a => a.tipo === 'cuenta');
assert.equal(cuenta.tramos.reduce((x, y) => x + y, 0), cuenta.a, 'tiempo + tiempos + medio tiempo = 1.260');
const b = L.actos.find(a => a.tipo === 'barra');
assert(508 + 1290 === 1798 && 538 + 1260 === 1798 && b.barras.length === 2 && Math.abs(b.barras[1].desde * 1290 - 30) < 1e-9 && b.barras.every(x => x.a === '1798'), 'los 1.290 (508) y los 1.260 (538) terminan juntos en 1798, a la misma escala');
assert(L.actos.find(a => a.id === 'inicio').egw.some(e => e.t.includes('538') && e.t.includes('1798')), '538 y 1798 vienen de Elena de White');
const nom = L.actos.find(a => a.id === 'nombres').estaciones.map(e => e.v.cap + ':' + e.v.de);
for (const r of ['ap12:6', 'ap12:14', 'ap11:2', 'ap11:3', 'ap13:5']) assert(nom.includes(r), 'la Biblia nombra el período en ' + r);
const todos = L.actos.flatMap(a => [a.v, ...(a.estaciones || []).map(e => e.v)]).filter(Boolean).map(v => v.cap + ':' + v.de);
assert.equal(new Set(todos).size, todos.length, 'ningún versículo se repite entre escenas');
const marcas = L.actos.find(a => a.id === 'nombres').estaciones.map(e => e.fecha);
assert.equal(new Set(marcas).size, marcas.length, 'cada estación de la línea tiene su propia marca');
const bal = L.actos.find(a => a.tipo === 'balanza');
assert.equal(bal.fichas.filter(f => f.va).reduce((x, f) => x + f.d, 0), bal.meta, 'las piezas correctas de la balanza suman 1.260');
assert(bal.fichas.some(f => !f.va), 'la balanza tiene una pieza que sobra');
const dil = L.actos.find(a => a.tipo === 'diluvio');
assert.equal(dil.dias / (dil.hasta - dil.desde), 30, 'el diluvio: 150 días en 5 meses son 30 por mes');
const rep = L.actos.find(a => a.tipo === 'repaso');
assert(rep.preguntas.length >= 5 && rep.preguntas.every(q => q.o[q.ok] && q.e.length > 30), 'el repaso tiene preguntas con respuesta y explicación');
for (const x of [bal, dil, rep, ...L.actos.filter(a => a.piensa)]) if (x.piensa) assert(x.piensa.o[x.piensa.ok], 'piensa primero tiene respuesta');
const A = montar('CINE_HTML, CINE_FX, CINE_PAUSAS');
for (const a of L.actos) assert(A.CINE_HTML[a.tipo] && A.CINE_FX[a.tipo] && A.CINE_PAUSAS[a.tipo] !== undefined, 'el motor sabe dibujar, mover y pausar ' + a.tipo);
console.log('Los 1.260 años: fuente y entrega, versículos literales, citas con página, imágenes, enlaces y aritmética: TODO BIEN');
