/* Revisa fuente/complementos/daniel.js: la interpretación de Daniel que se
   suma al estudio (v179). Falla si:
   - una sección no es capa 'contexto', pasa de 1.900 caracteres, no dice
     «Fuente:» o va a un capítulo que no existe;
   - una pregunta no va marcada f:'c', no dice «Fuente:» en su explicación, su
     `v` no existe en Daniel, o no tiene la forma de las del banco (4 opciones
     distintas, respuesta válida, la correcta no mucho más larga);
   - hay preguntas repetidas, o repetidas con el banco de Daniel. */
const path = require('path');
const F = p => require(path.join(__dirname, '..', 'fuente', p));
const C = F('complementos/daniel.js');
const { CAPS } = F('contenido.js');
const { VERS } = F('biblia.js');
const { BANCO } = F('preguntas.js');
let mal = 0;
const no = m => { mal++; console.log('  ❌ ' + m); };
const ids = new Set(CAPS.map(c => c.id));
for (const [cap, secs] of Object.entries(C.secciones)) {
  if (!ids.has(cap)) no('capítulo inexistente: ' + cap);
  for (const s of secs) {
    if (s.capa !== 'contexto') no(cap + ' «' + s.t + '» no es capa contexto');
    if (!s.t || !s.h) no(cap + ': sección sin título o contenido');
    if ((s.h || '').length > 1900) no(cap + ' «' + s.t + '» de ' + s.h.length + ' caracteres');
    if (!/Fuentes?:/.test(s.h || '')) no(cap + ' «' + s.t + '» sin «Fuente:»');
  }
}
const vistas = new Set(BANCO.map(q => q.q));
for (const q of C.preguntas) {
  const id = (q.q || '').slice(0, 60);
  if (!ids.has(q.cap)) no('cap inexistente en: ' + id);
  if (q.f !== 'c') no('sin f:\'c\': ' + id);
  if (!/Fuentes?:/.test(q.e || '')) no('sin «Fuente:»: ' + id);
  const m = /^(\d{1,2}):(\d{1,2})(?:-(\d{1,2}))?$/.exec(q.v || '');
  if (!m || 'd' + m[1] !== q.cap || (VERS[q.cap] && !VERS[q.cap][m[2]])) no('v inválido «' + q.v + '»: ' + id);
  if (vistas.has(q.q)) no('repetida: ' + id);
  vistas.add(q.q);
  if (q.t === 'mc') {
    const o = q.o || [];
    if (o.length !== 4 || new Set(o).size !== 4 || !(q.a >= 0 && q.a <= 3)) no('forma mc: ' + id);
    const L = o.map(x => x.length), mx = Math.max(...L);
    if (L.indexOf(mx) === q.a && L.filter(x => x === mx).length === 1 && mx > 1.6 * ((L.reduce((x, y) => x + y, 0) - mx) / 3)) no('la correcta es mucho más larga: ' + id);
  } else if (q.t === 'tf') { if (typeof q.a !== 'boolean') no('tf sin a booleano: ' + id); }
  else no('tipo no permitido (solo mc y tf): ' + id);
}
console.log('Daniel, interpretación: ' + Object.values(C.secciones).flat().length + ' secciones, ' + C.preguntas.length + ' preguntas');
console.log(mal ? mal + ' FALLAS' : 'COMPLEMENTOS: TODO BIEN');
process.exit(mal ? 1 : 0);
