/* APOCALIPSIS (v178): el tema del próximo concurso, el libro entero en RV1995.

   CÓMO ESTÁ HECHO
   Un archivo por capítulo en fuente/apocalipsis/capNN.js, con su estudio, sus
   preguntas y sus tarjetas juntos: así cada capítulo se escribe, se revisa
   (tools/apocalipsis-revisa.js) y se corrige solo. Este archivo los junta con
   la misma forma que matutina.js y creencias.js.

   LAS REGLAS CON QUE SE ESCRIBIÓ (aprendidas del examen real de Daniel 2026,
   ver aprendizajes-examen-2026 en el repo de contexto)
   1. Todo versículo tiene al menos una pregunta (campo `v`).
   2. Datos directos del texto, «¿qué texto dice…?», V/F con una pieza cambiada
      y distractores que mezclan capítulos.
   3. La interpretación va marcada `f:'c'` (complementaria) mientras no haya
      libro de apoyo: con «Solo el material del reglamento» no sale al examen.
   4. Completar, poco: costó mucho y el examen de niños no lo trajo. */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'apocalipsis');
const COLOR = '#6D28D9';
/* AP_SOLO=01,02 limita qué capítulos se cargan (para probar el código sin
   depender de capítulos que se están escribiendo). Sin la variable, todos. */
const SOLO = (process.env.AP_SOLO || '').split(',').filter(Boolean);
const archivos = fs.readdirSync(DIR).filter(f => /^cap\d\d\.js$/.test(f)).sort()
  .filter(f => !SOLO.length || SOLO.includes(f.slice(3, 5)));
const caps = archivos.map(f => require(path.join(DIR, f)));

const AP_CAPS = caps.map(c => ({ id: c.cap, label: c.label, sub: c.sub, src: 'Biblia', color: COLOR, vs: c.vs }));
const AP_CONTENIDO = Object.fromEntries(caps.map(c => [c.cap, c.estudio]));
const AP_BANCO = caps.flatMap(c => c.preguntas.map(q => ({ cap: c.cap, ...q })));
const AP_TARJETAS = caps.flatMap(c => c.tarjetas.map(t => ({ cap: c.cap, ...t })));
const AP_MODULOS = [];
const AP_CONT_MODULOS = {};

module.exports = { AP_CAPS, AP_CONTENIDO, AP_BANCO, AP_TARJETAS, AP_MODULOS, AP_CONT_MODULOS };
