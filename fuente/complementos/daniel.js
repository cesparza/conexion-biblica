/* DANIEL: LA INTERPRETACIÓN, APARTE DEL EXAMEN (v179)

   Camilo, 12-oct: hay contenido de examen y otro que es estudio de
   interpretación, y la app también es para aprender un tema con su
   interpretación. Esto es lo segundo para Daniel: secciones de capa
   'contexto' que se suman al final de cada capítulo, y preguntas que van todas
   marcadas f:'c' (complementarias), así que con «Solo el material del
   reglamento» no salen al examen.

   DE DÓNDE SALE
   La biblioteca de Camilo (iCloud > Iglesia > Biblioteca: Stephen Bohr sobre
   todo, Elena de White, Urías Smith y otros) y sus notas de Evernote (pila
   «Estudio Bíblico»). Cada sección y cada pregunta dice su fuente. Lo que
   estaba en inglés se tradujo. Nada se copia largo: se resume con palabras
   propias y las citas son cortas.

   UN ARCHIVO POR CAPÍTULO en fuente/complementos/daniel/dN.js, con la forma
   { cap: 'd1', secciones: [...], preguntas: [...] } (las preguntas sin `cap`,
   se lo pone este archivo). Lo revisa tools/complementos-revisa.js. */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, 'daniel');
const caps = fs.readdirSync(DIR).filter(f => /^d\d{1,2}\.js$/.test(f))
  .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1))).map(f => require(path.join(DIR, f)));
const secciones = Object.fromEntries(caps.map(c => [c.cap, c.secciones || []]));
const preguntas = caps.flatMap(c => (c.preguntas || []).map(q => ({ cap: c.cap, ...q })));
module.exports = { secciones, preguntas };
