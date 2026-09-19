/* Auditoria del material completo, las tres actividades de una vez.

   POR QUE EXISTE
   tools/cobertura.js mira Daniel versiculo por versiculo, que es lo correcto
   para un libro de la Biblia. Pero la matutina y las creencias no tienen
   versiculos que contar: lo que hay que comprobar ahi es otra cosa, y no
   habia con que.

   Lo que esta herramienta exige de CADA capitulo, sea de la actividad que
   sea, es lo mismo:
     1. material de estudio con cuerpo, no un titulo vacio
     2. los TRES tipos de pregunta, porque el examen trae las tres secciones
     3. tarjetas para memorizar
     4. bloques interactivos, porque leer no es lo mismo que responder

   Mide sobre el index.html DESPLEGADO, no sobre las fuentes: parte del
   material (el recorrido versiculo por versiculo, el repaso) se inyecta en el
   build, y medir las fuentes daria un hueco que no existe.

   Uso:  node tools/auditoria.js  */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const js = html.match(/<script>([\s\S]*)<\/script>/)[1];
const saca = nombre => {
  const m = js.match(new RegExp('const ' + nombre + ' = ([\\s\\S]*?);\\n'));
  return eval('(' + m[1] + ')');
};
const CAPS = saca('CAPS'), CONTENIDO = saca('CONTENIDO');
const BANCO = saca('BANCO'), TARJETAS = saca('TARJETAS');
const ACT = { cb: 'Conexión Bíblica', dm: 'Devoción Matutina', ec: 'En esto creemos' };
const actDe = id => /^cr\d\d$/.test(id) ? 'ec' : /^m\d\d$/.test(id) ? 'dm' : 'cb';

const PISO_TEXTO = 400;   // menos que esto no es material, es un rotulo

/* Huecos CONOCIDOS y dichos. Se siguen mostrando, pero no tumban la
   herramienta: si un hueco documentado la deja en rojo para siempre, el rojo
   deja de significar algo y nadie la vuelve a correr. Lo que tiene que
   fallar es un hueco NUEVO. */
const SABIDOS = {
  'cr14|sin fill':
    'la cartilla 2026 imprime ahí el texto de la creencia 13, así que no hay ' +
    'declaración que completar. Pendiente de confirmar contra el impreso.',
};
const fallos = [];
const filas = [];

for (const c of CAPS) {
  const secs = CONTENIDO[c.id] || [];
  const texto = secs.reduce((a, s) => a + s.h.length, 0);
  const bloques = secs.reduce((a, s) => a + (s.h.match(/rev-q/g) || []).length, 0);
  const qs = BANCO.filter(q => q.cap === c.id);
  const tipos = { mc: 0, tf: 0, fill: 0 };
  qs.forEach(q => { tipos[q.t] = (tipos[q.t] || 0) + 1; });
  const tj = TARJETAS.filter(t => t.cap === c.id).length;

  const mal = [];
  if (!secs.length) mal.push('sin material');
  else if (texto < PISO_TEXTO) mal.push('material muy corto (' + texto + ' car)');
  for (const t of ['mc', 'tf', 'fill']) if (!tipos[t]) mal.push('sin ' + t);
  if (!tj) mal.push('sin tarjetas');
  if (!bloques) mal.push('sin bloques interactivos');
  if (mal.length) fallos.push({ id: c.id, act: actDe(c.id), mal });
  filas.push({ id: c.id, act: actDe(c.id), secs: secs.length, texto, bloques,
               mc: tipos.mc, tf: tipos.tf, fill: tipos.fill, tj });
}

console.log('AUDITORÍA DEL MATERIAL — ' + CAPS.length + ' capítulos\n');
for (const a of ['cb', 'dm', 'ec']) {
  const f = filas.filter(x => x.act === a);
  if (!f.length) continue;
  const sum = k => f.reduce((n, x) => n + x[k], 0);
  console.log(ACT[a] + '  (' + f.length + ' capítulos)');
  console.log('  secciones ' + sum('secs') +
    ' · caracteres ' + sum('texto').toLocaleString('es') +
    ' · bloques interactivos ' + sum('bloques'));
  console.log('  preguntas: múltiple ' + sum('mc') + ' · V/F ' + sum('tf') +
    ' · completar ' + sum('fill') + ' · tarjetas ' + sum('tj'));
  const flojos = f.filter(x => x.texto < 1500).map(x => x.id + ' (' + x.texto + ')');
  if (flojos.length) console.log('  los de menos texto: ' + flojos.slice(0, 6).join(', '));
  console.log('');
}

const nuevos = [];
const conocidos = [];
for (const f of fallos)
  for (const m of f.mal)
    (SABIDOS[f.id + '|' + m] ? conocidos : nuevos).push({ id: f.id, m });

if (conocidos.length) {
  console.log('HUECOS CONOCIDOS, ya explicados\n');
  for (const c of conocidos)
    console.log('  · ' + c.id + ' ' + c.m + ' — ' + SABIDOS[c.id + '|' + c.m]);
  console.log('');
}
if (nuevos.length) {
  console.log('HUECOS NUEVOS\n');
  for (const n of nuevos) console.log('  ❌ ' + n.id.padEnd(6) + n.m);
  console.log('\n' + nuevos.length + ' huecos que nadie ha explicado.');
  process.exit(1);
}
console.log('✅ Los ' + CAPS.length + ' capítulos tienen material, los tres tipos de pregunta, ' +
            'tarjetas y bloques interactivos' +
            (conocidos.length ? ', salvo los huecos conocidos de arriba.' : '.'));
