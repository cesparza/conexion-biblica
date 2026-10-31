/* EL CONFLICTO DE LOS SIGLOS (v236: sus capítulos; v237: el tema `conflicto`)

   PARA QUÉ. La política de Conexión Bíblica 2027 (Asociación del Alto Magdalena)
   pide capítulos de este libro en cada categoría. CS_CAPS trae los 43 (número, título y
   página donde empieza) para nombrarlos en el concurso («24 · El Templo de Dios»).

   v237 (Camilo, 16-oct): «autorizo usar el texto completo; las preguntas las reviso yo».
   Los capítulos 24 a 43, los que pide la política, son material de estudio: un archivo
   por capítulo en fuente/conflicto/capNN.js con el texto, sus preguntas y sus tarjetas,
   como Apocalipsis. El estudio de cada capítulo es el texto mismo, partido por páginas
   (con la página de esta edición y la voz de la app). Las preguntas y las tarjetas salen
   de una frase literal (`lit`) con una palabra tapada y van marcadas `pend: 1`:
   pendientes de revisión de Camilo (se ven así en el examen y en «Revisar el material»
   del director).

   PESO. El texto son unos 600 KB: no va en el index.html. build.js escribe un archivo
   por capítulo en conflicto/ (raíz del repo) y la app lo pide al abrir el capítulo
   (csCarga, en app.js). Al index.html solo van los capítulos, las preguntas y las
   tarjetas.

   DE DÓNDE. La edición en español de la biblioteca (Asociación Publicadora
   Interamericana, 1954; copia digital del Ministerio Evangelio Eterno), que tiene
   43 capítulos: «Capítulo N» y su título en el cuerpo del libro, y la página en el
   índice. Verificado capítulo por capítulo el 15-oct. Otras ediciones (la inglesa
   tiene 42) numeran distinto: la política usa esta. */
const fs = require('fs');
const path = require('path');

const CS_EDICION = 'APIA, 1954';
const CS_CAPS = [
  [1, 'El Destino del Mundo Predicho', 14], [2, 'La Fe de los Mártires', 31], [3, 'Una Era de Tinieblas Espirituales', 39],
  [4, 'Fieles Portaantorchas', 49], [5, 'El Lucero de la Reforma', 63], [6, 'Dos Héroes de la Edad Media', 77],
  [7, 'En la Encrucijada de los Caminos', 95], [8, 'Un Campeón de la Verdad', 114], [9, 'Se Enciende una Luz en Suiza', 134],
  [10, 'Progresos de la Reforma', 145], [11, 'La Protesta de los Príncipes', 154], [12, 'La Reforma en Francia', 165],
  [13, 'El Despertar de España', 186], [14, 'En los Países Bajos y Escandinavia', 203], [15, 'La Verdad Progresa en Inglaterra', 209],
  [16, 'La Biblia y la Revolución Francesa', 225], [17, 'América, Tierra de Libertad', 243], [18, 'Heraldos de una Nueva Era', 251],
  [19, 'Una Profecía Significativa', 265], [20, 'Luz a Través de las Tinieblas', 286], [21, 'Un Gran Despertar Religioso', 295],
  [22, 'Una Amonestación Rechazada', 310], [23, 'Profecías Cumplidas', 323], [24, 'El Templo de Dios', 337],
  [25, 'Jesucristo Nuestro Abogado', 348], [26, 'Los Estados Unidos en la Profecía', 355], [27, 'Una Obra de Reforma', 368],
  [28, 'La Verdadera Conversión es Esencial', 376], [29, 'El Juicio Investigador', 390], [30, 'El Origen del Mal y del Dolor', 400],
  [31, 'El Peor Enemigo del Hombre', 410], [32, '¿Quiénes Son los Ángeles?', 415], [33, 'Las Asechanzas del Enemigo', 421],
  [34, 'El Misterio de la Inmortalidad', 431], [35, '¿Pueden Hablarnos Nuestros Muertos?', 446], [36, 'La Libertad de Conciencia Amenazada', 455],
  [37, 'El Conflicto Inminente', 470], [38, 'Nuestra Única Salvaguardia', 479], [39, 'El Mensaje Final de Dios', 487],
  [40, 'El Tiempo de Angustia', 495], [41, 'La Liberación del Pueblo de Dios', 511], [42, 'La Desolación de la Tierra', 524],
  [43, 'El Fin del Conflicto', 531],
].map(([n, t, p]) => ({ n, t, p }));

/* ── v237: los capítulos que están en la app ── */
const DIR = path.join(__dirname, 'conflicto');
const COLOR = '#9A3412';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const archivos = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => /^cap\d\d\.js$/.test(f)).sort() : [];
const caps = archivos.map(f => require(path.join(DIR, f)));
const idDe = n => 'cs' + n;

/* El texto en párrafos: un bloque separado por renglón en blanco es un párrafo; los
   renglones de un párrafo se juntan con un espacio. */
const parrafos = c => c.texto.trim().split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
/** El texto sin marcas de página, para comprobar que una frase está en el libro. */
const textoPlano = c => parrafos(c).map(p => p.replace(/\{p\d+\}\s*/g, '').replace(/\s*\[\d+\]/g, '')).join('\n');

/* Un párrafo en HTML: la página de esta edición como rótulo («p. 338») y la de la copia
   digital entre corchetes, en gris. Ninguno de los dos se lee en voz alta (textoLimpio). */
const parrafoHTML = p => '<p class="cs-par">' + esc(p)
  .replace(/\{p(\d+)\}\s*/g, (_, n) => '<span class="cs-pag" title="Página ' + n + ' de esta edición">p. ' + n + '</span> ')
  .replace(/\s*\[(\d+)\]/g, (_, n) => ' <span class="cs-ref">[' + n + ']</span>') + '</p>';

/* Un párrafo largo se parte en trozos de menos de 1.200 caracteres (por palabras): el hook
   del repo no deja renglones de más de 2.000, y el archivo del capítulo se escribe con un
   trozo por renglón. La app los vuelve a juntar al cargar. */
const trozos = (t, tope = 1200) => {
  const out = []; let r = t;
  while (r.length > tope) { const i = r.lastIndexOf(' ', tope); out.push(r.slice(0, i)); r = r.slice(i); }
  out.push(r); return out;
};

/* El estudio: una entrada corta y el texto en secciones de unas dos páginas. */
function estudio(c) {
  const ps = parrafos(c);
  const secs = [{ t: '📚 El capítulo', capa: 'apoyo', h: ['<div class="highlight-box"><strong>Capítulo ' + c.n + ': «' + esc(c.titulo) +
    '»</strong>, páginas ' + c.pag + ' a ' + c.fin + ' de esta edición (' + CS_EDICION + ').<br><br>' +
    'Abajo está el capítulo completo, por páginas. Toca ▶ para escucharlo. Las preguntas y las tarjetas ' +
    'de este capítulo salen de sus frases, tal cual, y están <strong>pendientes de revisión</strong>.</div>'] }];
  let pag = c.pag, desde = c.pag, actual = [];
  const cierra = hasta => {
    if (!actual.length) return;
    secs.push({ t: '📖 ' + (hasta > desde ? 'Páginas ' + desde + ' a ' + hasta : 'Página ' + desde), capa: 'nucleo', h: actual.flatMap(p => trozos(parrafoHTML(p))) });
    actual = [];
  };
  for (const p of ps) {
    const m = /^\{p(\d+)\}/.exec(p);
    const empieza = m ? Number(m[1]) : pag;
    if (actual.length && empieza >= desde + 2) { cierra(pag); desde = empieza; }
    actual.push(p);
    for (const x of p.matchAll(/\{p(\d+)\}/g)) pag = Number(x[1]);
  }
  cierra(pag);
  return secs;
}

const CS_TEMA_CAPS = caps.map(c => ({ id: idDe(c.n), label: 'CS ' + c.n, sub: c.titulo, src: 'El conflicto de los siglos', color: COLOR, pag: c.pag, fin: c.fin }));
/* `lit` y `pag` quedan en la pregunta: con eso el director la revisa contra el libro. */
const CS_BANCO = caps.flatMap(c => c.preguntas.map(q => ({ cap: idDe(c.n), ...q })));
const CS_TARJETAS = caps.flatMap(c => c.tarjetas.map(t => ({ cap: idDe(c.n), ...t })));
const CS_CONTENIDO = Object.fromEntries(caps.map(c => [idDe(c.n), estudio(c)]));
const CS_TEXTO = Object.fromEntries(caps.map(c => [idDe(c.n), textoPlano(c)]));

module.exports = { CS_CAPS, CS_EDICION, CS_TEMA_CAPS, CS_BANCO, CS_TARJETAS, CS_CONTENIDO, CS_TEXTO, parrafos };
