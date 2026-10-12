/* Revisa los capítulos de Apocalipsis (fuente/apocalipsis/capNN.js) contra el
   texto RV1995 (fuente/biblia-apocalipsis.js). Sin argumentos revisa todos;
   con números («node tools/apocalipsis-revisa.js 1 2») solo esos.

   Falla (código 1) si encuentra algo de esto:
   - un versículo del capítulo sin ninguna pregunta (campo `v`);
   - una referencia `v` fuera del capítulo;
   - un completar cuyo texto no está literal en el versículo;
   - un `lit` (trozo literal de la respuesta) que no está en el versículo;
   - una cita «…» del estudio seguida de (C:V) que no está literal ahí;
   - opción múltiple sin 4 opciones distintas, sin respuesta válida, con la
     correcta mucho más larga que las demás o como la única entre comillas;
   - V/F sin explicación; preguntas repetidas; secciones de más de 1.900
     caracteres (el hook del repo corta líneas de 2.000).
   Avisa (sin fallar) si el reparto del examen (sin f:'c') se aleja de 60/25/15. */
const fs = require('fs');
const path = require('path');
const { VERS_AP } = require('../fuente/biblia-apocalipsis.js');

const DIR = path.join(__dirname, '..', 'fuente', 'apocalipsis');
const pedidos = process.argv.slice(2).map(Number).filter(Boolean);
const norm = s => String(s).replace(/<[^>]+>/g, '').replace(/[«»“”"—–]/g, ' ').replace(/\.\.\.|…/g, ' … ')
  .replace(/\s+/g, ' ').trim().toLowerCase();

function rango(v, n) {
  const m = /^(\d{1,2}):(\d{1,2})(?:-(\d{1,2}))?$/.exec(String(v || ''));
  if (!m || Number(m[1]) !== n) return null;
  const a = Number(m[2]), b = Number(m[3] || m[2]);
  const vs = VERS_AP['ap' + n];
  if (!vs[a] || !vs[b] || b < a) return null;
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}
const textoDe = (n, nums) => nums.map(x => VERS_AP['ap' + n][x]).join(' ');

let fallas = 0, avisos = 0;
const mal = (n, m) => { fallas++; console.log('  ❌ ' + m); };
const ojo = (n, m) => { avisos++; console.log('  ⚠️  ' + m); };

const lista = fs.readdirSync(DIR).filter(f => /^cap\d\d\.js$/.test(f)).sort()
  .filter(f => !pedidos.length || pedidos.includes(Number(f.slice(3, 5))));
for (const f of lista) {
  const n = Number(f.slice(3, 5));
  const ruta = path.join(DIR, f);
  console.log('Apocalipsis ' + n + ' (' + f + ')');
  for (const [i, l] of fs.readFileSync(ruta, 'utf8').split('\n').entries())
    if (l.length > 2000) mal(n, 'la línea ' + (i + 1) + ' pasa de 2.000 caracteres');
  delete require.cache[require.resolve(ruta)];
  const C = require(ruta);
  const vs = VERS_AP['ap' + n];
  const nv = Object.keys(vs).length;
  if (C.cap !== 'ap' + n) mal(n, 'cap debería ser ap' + n);
  if (C.vs !== nv) mal(n, 'vs debería ser ' + nv);
  if (!C.label || !C.sub) mal(n, 'falta label o sub');

  /* ── estudio ── */
  if (!Array.isArray(C.estudio) || C.estudio.length < 5) mal(n, 'el estudio trae menos de 5 secciones');
  for (const s of C.estudio || []) {
    if (!s.t || !s.h) mal(n, 'sección sin título o sin contenido');
    if (!['nucleo', 'apoyo', 'contexto'].includes(s.capa)) mal(n, 'sección «' + s.t + '» sin capa válida');
    if ((s.h || '').length > 1900) mal(n, 'sección «' + s.t + '» de ' + s.h.length + ' caracteres');
    /* v179: la interpretación dice de dónde sale (autor, obra, página). */
    if (s.capa === 'contexto' && !/Fuentes?:/.test(s.h || '')) mal(n, 'sección de interpretación «' + s.t + '» sin «Fuente:»');
    const plano = String(s.h || '').replace(/<[^>]+>/g, '');
    for (const m of plano.matchAll(/«([^«»]{12,})»\s*\((\d{1,2}):(\d{1,2})(?:-(\d{1,2}))?\)/g)) {
      if (Number(m[2]) !== n) continue;
      const r = rango(m[2] + ':' + m[3] + (m[4] ? '-' + m[4] : ''), n);
      if (!r) { mal(n, 'cita fuera del capítulo: (' + m[2] + ':' + m[3] + ')'); continue; }
      const trozos = norm(m[1]).split('…').map(x => x.trim()).filter(x => x.length > 2);
      if (!trozos.every(t => norm(textoDe(n, r)).includes(t)))
        mal(n, 'cita no literal en ' + m[2] + ':' + m[3] + ': «' + m[1].slice(0, 70) + '»');
    }
    for (const m of plano.matchAll(/\((\d{1,2}):(\d{1,2})(?:-(\d{1,2}))?\)/g))
      if (Number(m[1]) === n && !rango(m[1] + ':' + m[2] + (m[3] ? '-' + m[3] : ''), n))
        mal(n, 'referencia (' + m[0] + ') fuera del capítulo');
  }

  /* ── preguntas ── */
  const P = C.preguntas || [];
  const cubiertos = new Set(), vistas = new Set();
  const cuenta = { mc: 0, tf: 0, fill: 0 };
  for (const q of P) {
    const id = (q.q || q.ins || '').slice(0, 60);
    cuenta[q.t] = (cuenta[q.t] || 0) + 1;
    const r = rango(q.v, n);
    if (!r) { mal(n, 'v inválido «' + q.v + '» en: ' + id); continue; }
    r.forEach(x => cubiertos.add(x));
    const llave = q.t === 'fill' ? JSON.stringify(q.p) : q.q;
    if (vistas.has(llave)) mal(n, 'repetida: ' + id);
    vistas.add(llave);
    const txt = norm(textoDe(n, r));
    if (q.f !== undefined && q.f !== 'c') mal(n, 'f solo puede ser «c»: ' + id);
    if (q.f === 'c' && !/Fuentes?:/.test(q.e || '')) mal(n, 'interpretación sin «Fuente:» en la explicación: ' + id);
    if (q.t === 'mc') {
      const o = q.o || [];
      if (o.length !== 4 || new Set(o).size !== 4) mal(n, 'no trae 4 opciones distintas: ' + id);
      if (!Number.isInteger(q.a) || q.a < 0 || q.a > 3) mal(n, 'respuesta inválida: ' + id);
      if (!q.e) mal(n, 'sin explicación: ' + id);
      if (q.lit && !txt.includes(norm(q.lit))) mal(n, 'lit no está en ' + q.v + ': «' + q.lit + '»');
      const L = o.map(x => String(x).length), mx = Math.max(...L);
      if (L.indexOf(mx) === q.a && L.filter(x => x === mx).length === 1 &&
          mx > 1.6 * ((L.reduce((x, y) => x + y, 0) - mx) / 3)) mal(n, 'la correcta es mucho más larga: ' + id);
      const tipo = x => /^\s*«/.test(x) ? '«' : '-';
      const t = o.map(tipo);
      if (new Set(t).size > 1 && t.filter(x => x === t[q.a]).length === 1) mal(n, 'solo la correcta va entre comillas: ' + id);
    } else if (q.t === 'tf') {
      if (typeof q.a !== 'boolean') mal(n, 'V/F sin a booleano: ' + id);
      if (!q.e) mal(n, 'V/F sin explicación: ' + id);
    } else if (q.t === 'fill') {
      if (!/^Apocalipsis \d{1,2}:\d{1,2}(?:-\d{1,2})? \(RV1995\) — /.test(q.ins || '')) mal(n, 'ins debe empezar «Apocalipsis C:V (RV1995) — »: ' + id);
      const huecos = (q.p || []).filter(x => x.b);
      if (huecos.length < 1 || huecos.length > 3) mal(n, 'completar con 1 a 3 huecos: ' + id);
      if ((q.p || []).some(x => x.b !== undefined && !String(x.b).trim())) mal(n, 'hueco vacío: ' + id);
      const junto = norm((q.p || []).map(x => x.b || x.x || '').join(''));
      const trozos = junto.split('…').map(x => x.trim()).filter(x => x.length > 2);
      if (!trozos.every(t => txt.includes(t))) mal(n, 'el completar no está literal en ' + q.v + ': ' + junto.slice(0, 80));
    } else mal(n, 'tipo desconocido: ' + q.t);
  }
  const sin = Object.keys(vs).map(Number).filter(x => !cubiertos.has(x));
  if (sin.length) mal(n, 'versículos sin pregunta: ' + sin.join(', '));
  const tot = P.length;
  if (tot < nv + 4) mal(n, 'pocas preguntas: ' + tot + ' para ' + nv + ' versículos');
  /* El reparto 60/25/15 es del examen: la interpretación (f:'c') no cuenta. */
  const ex = { mc: 0, tf: 0, fill: 0 }, PE = P.filter(q => q.f !== 'c');
  PE.forEach(q => { ex[q.t] = (ex[q.t] || 0) + 1; });
  const te = PE.length;
  if (te && (ex.mc / te < 0.5 || ex.tf / te < 0.15 || ex.fill / te > 0.2 || ex.fill / te < 0.08))
    ojo(n, 'reparto del examen ' + JSON.stringify(ex));
  if (!P.some(q => /qué (texto|versículo)/i.test(q.q || ''))) ojo(n, 'ninguna de «¿qué texto dice…?»');

  /* ── tarjetas ── */
  const T = C.tarjetas || [];
  if (T.length < 6) mal(n, 'menos de 6 tarjetas');
  if (T.some(t => !t.f || !t.r)) mal(n, 'tarjeta sin frente o sin respuesta');
  console.log('  ' + tot + ' preguntas ' + JSON.stringify(cuenta) + ' · ' + (C.estudio || []).length + ' secciones · ' + T.length + ' tarjetas');
}
console.log('\n' + (fallas ? fallas + ' FALLAS' : 'APOCALIPSIS: TODO BIEN') + (avisos ? ' · ' + avisos + ' avisos' : ''));
process.exit(fallas ? 1 : 0);
