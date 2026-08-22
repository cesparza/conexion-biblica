/* Genera los dos manuales imprimibles: uno para quien estudia y uno para los
   directores del club.

   POR QUÉ SE GENERAN Y NO SE ESCRIBEN A MANO
   Un manual escrito aparte se desactualiza en la primera semana: cambia el
   número de preguntas, se agrega un capítulo, y el manual sigue diciendo lo
   de antes. Aquí las cifras y los alcances salen de los mismos archivos que
   alimentan la app, así que el manual no puede mentir sobre la app.

   Las capturas de pantalla NO van en el repo: se pasan por parámetro y se
   incrustan como data URI. Sin la carpeta, el manual sale igual pero sin
   imágenes, y lo dice.
   Uso:  node tools/manuales.js [carpetaDestino] [carpetaCapturas]        */
const fs = require('fs');
const path = require('path');
const { CAPS } = require('../fuente/contenido.js');
const { BANCO } = require('../fuente/preguntas.js');
const { MODULOS } = require('../fuente/modulos.js');
const { TARJETAS } = require('../fuente/tarjetas.js');
const { LOGO_TL } = require('../fuente/logo.js');
const MAT = require('../fuente/matutina.js');
const IMPR = require('../fuente/imprimible.js');

const DESTINO = process.argv[2] ||
  path.join(__dirname, '..', '..', '..', 'material-daniel', 'generado');
const CAPTURAS = process.argv[3] || path.join(__dirname, 'capturas');
fs.mkdirSync(DESTINO, { recursive: true });

/* Las mismas categorías que usa la app, con el mismo significado. */
const CATS = {
  me:  { ev: 'Conexión Bíblica', nombre: 'Menores', edad: '4 a 6 años', n: 10,
         alcance: 'Daniel 1, 2, 3 y 6' },
  av:  { ev: 'Conexión Bíblica', nombre: 'Aventureros', edad: '7 a 9 años', n: 15,
         alcance: 'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44' },
  pa:  { ev: 'Conexión Bíblica', nombre: 'Padres y consejeros', edad: 'Adultos', n: 25,
         alcance: 'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44' },
  gm:  { ev: 'Conexión Bíblica', nombre: 'Guías Mayores', edad: 'Otro evento', n: 25,
         alcance: 'Daniel 1 al 6 · P&R 39 al 44' },
  dm1: { ev: 'Devoción Matutina', nombre: 'Matutina menores', edad: '4 a 6 años', n: 10,
         alcance: 'Héroes y villanos · 1 al 15 de octubre' },
  dm2: { ev: 'Devoción Matutina', nombre: 'Matutina Aventureros', edad: '7 a 9 años', n: 15,
         alcance: 'Héroes y villanos · 1 al 30 de octubre' },
};

const TODOS_CAPS = [...CAPS, ...MAT.MAT_CAPS];
const TODO_BANCO = [...BANCO, ...MAT.MAT_BANCO];
const capsDe = c => TODOS_CAPS.filter(x => x.cats.includes(c));
const bancoDe = c => {
  const ids = capsDe(c).filter(x => !x.extra).map(x => x.id);
  return TODO_BANCO.filter(q => ids.includes(q.cap));
};

/* Capturas: se leen una vez y se incrustan. Si falta la carpeta, el manual
   sale sin imágenes en lugar de fallar. */
const hayCaps = fs.existsSync(CAPTURAS);
const cache = {};
function img(nombre, pie, ancho) {
  if (!hayCaps) return '';
  const f = path.join(CAPTURAS, nombre + '.png');
  if (!fs.existsSync(f)) return '';
  if (!cache[f]) cache[f] = 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
  return '<figure class="cap" style="max-width:' + (ancho || 300) + 'pt">' +
    '<img src="' + cache[f] + '" alt="' + pie + '">' +
    '<figcaption>' + pie + '</figcaption></figure>';
}

const CSS_MAN = `
.man h1 { font-size: 21pt; margin-bottom: 6pt; }
.man .lead { text-align: center; font-size: 11pt; color: #444; max-width: 400pt;
  margin: 0 auto 14pt; line-height: 1.55; }
.paso { display: flex; gap: 12pt; margin: 0 0 16pt; page-break-inside: avoid; }
.paso .num { flex: none; width: 30pt; height: 30pt; border-radius: 50%;
  background: #E8720C; color: #fff; font-weight: bold; font-size: 15pt;
  display: flex; align-items: center; justify-content: center; }
.paso .cont { flex: 1; }
.paso .tit { font-size: 13pt; font-weight: bold; color: #1F3864; margin-bottom: 3pt; }
.paso p { margin: 0 0 5pt; font-size: 11pt; line-height: 1.6; }
figure.cap { margin: 8pt auto; text-align: center; page-break-inside: avoid; }
figure.cap img { width: 100%; border: 1px solid #d0d5dd; border-radius: 4pt; }
figure.cap figcaption { font-size: 8pt; color: #666; margin-top: 3pt; font-style: italic; }
.capdos { display: flex; gap: 12pt; justify-content: center; align-items: flex-start;
  page-break-inside: avoid; margin: 8pt 0; }
.capdos figure.cap { margin: 0; }
.regla { background: #1F3864; color: #fff; padding: 8pt 12pt; border-radius: 4pt;
  font-size: 11pt; font-weight: bold; text-align: center; margin: 10pt 0; }
.chip { display: inline-block; background: #eef2fa; border: 1px solid #c7d2e8;
  border-radius: 20pt; padding: 1pt 8pt; font-size: 9.5pt; font-weight: bold;
  color: #1F3864; white-space: nowrap; }
.man ol, .man ul { margin: 4pt 0 8pt 16pt; padding: 0; }
.man li { margin: 3pt 0; font-size: 10.5pt; line-height: 1.55; }
.pregunta { font-weight: bold; color: #1F3864; margin: 10pt 0 2pt; font-size: 11pt; }
.respuesta { margin: 0 0 8pt; font-size: 10.5pt; line-height: 1.6; }
`;

const cabecera = (titulo, sub, lead) =>
  '<img class="logo" src="' + LOGO_TL + '" alt="Iglesia Adventista Tierra Linda">' +
  '<div class="igl">Iglesia Adventista del Séptimo Día · Tierra Linda</div>' +
  '<h1>' + titulo + '</h1><div class="sub">' + sub + '</div>' +
  '<p class="lead">' + lead + '</p>';

const paso = (n, tit, cuerpo) =>
  '<div class="paso"><div class="num">' + n + '</div><div class="cont">' +
  '<div class="tit">' + tit + '</div>' + cuerpo + '</div></div>';

/* ─────────────────────────────────────────────────────────────
   MANUAL 1 — para quien estudia
   Lo lee un niño de nueve años, o un adulto en voz alta a uno de cinco.
   Una idea por paso, frases cortas, y la captura de la pantalla de la que
   se está hablando.
   ───────────────────────────────────────────────────────────── */
function manualEstudiante() {
  const nAv = bancoDe('av').length, nTj = TARJETAS.length;
  let h = '<div class="man">' + cabecera(
    'CÓMO USAR LA APP',
    'Manual para quien estudia',
    'Esta app te prepara para el campamento. No hay que instalar nada: se abre ' +
    'como una página y todo se guarda solo. Son cinco botones y ya.') +

  '<div class="regla">Si algún día no sabes qué hacer, abre «Qué estudiar hoy» y haz lo que diga.</div>' +

  '<h2>Primero: la app te pregunta quién eres</h2>' +
  paso(1, 'Escribe tu nombre',
    '<p>La primera vez la app te pregunta cómo te llamas. Escríbelo y toca ' +
    '<span class="chip">Siguiente</span>.</p>' +
    '<p>Tu nombre sirve para que tu progreso sea tuyo y no se mezcle con el de otro.</p>') +
  paso(2, 'Di cuántos años tienes',
    '<p>Toca el botón de tu edad. Esto decide <b>qué capítulos vas a estudiar</b>, ' +
    'así que si no estás seguro pregúntale a tu director.</p>') +
  paso(3, 'Di en qué concurso participas',
    '<p><b>Conexión Bíblica</b> es el libro de Daniel. <b>Devoción Matutina</b> es ' +
    '«Héroes y villanos», la lectura de octubre. Si vas a los dos, toca ' +
    '<span class="chip">En los dos</span> y la app te hace dos fichas.</p>') +
  '<div class="capdos">' + img('01-bienvenida1', 'Paso 1: tu nombre', 150) +
  img('02-bienvenida2', 'Paso 2: tu edad', 150) + '</div>' +

  '<div class="gcap"><h2>Los cinco botones de arriba</h2>' +
  '<ul>' +
  '<li><b>🏠 Inicio</b> — qué te toca hoy y cómo vas.</li>' +
  '<li><b>📖 Estudiar</b> — para leer los capítulos.</li>' +
  '<li><b>🃏 Tarjetas</b> — para memorizar.</li>' +
  '<li><b>✏️ Examen</b> — para practicar.</li>' +
  '<li><b>🏆 Logros</b> — tus errores y tus exámenes pasados.</li>' +
  '</ul>' +
  '<h3>🏠 Inicio: empieza siempre aquí</h3>' +
  '<p>Arriba te dice cuántos días faltan para el campamento. Debajo está ' +
  '<b>«Qué estudiar hoy»</b>: tres o cuatro cosas, en orden, escogidas según ' +
  'cómo vas. No tienes que decidir nada, solo tocar el botón naranja de la ' +
  'primera y hacerla.</p>' +
  img('05-hoy', 'La app te dice qué hacer hoy y en qué orden', 260) +
  '</div>' +

  '<div class="gcap"><h2>📖 Estudiar: leer</h2>' +
  paso(1, 'Toca el capítulo que quieras leer',
    '<p>Cada tarjeta tiene un capítulo. Debajo dice cuánto llevas leído.</p>') +
  paso(2, 'Lee de arriba abajo, sin apuro',
    '<p>Cada capítulo empieza con <b>«En pocas palabras»</b>: es el resumen. ' +
    'Después vienen los datos, los versículos y las trampas.</p>') +
  paso(3, 'Cuando termines, toca «Ya lo estudié»',
    '<p>El círculo del Inicio se llena. Eso es lo que hace subir tu progreso: ' +
    'si no lo tocas, el círculo se queda en 0% aunque hayas leído.</p>') +
  img('08-capitulo', 'Un capítulo abierto', 250) +
  '</div>' +

  '<div class="gcap"><h2>🃏 Tarjetas: memorizar</h2>' +
  '<p>Una tarjeta tiene una pregunta por delante y la respuesta por detrás. ' +
  'Se usa así:</p>' +
  '<ol>' +
  '<li>Lee el frente.</li>' +
  '<li><b>Responde en voz alta</b>, antes de voltearla. Esto es lo importante: ' +
  'si solo lees la respuesta, no se te queda.</li>' +
  '<li>Toca la tarjeta para ver si acertaste.</li>' +
  '<li>Toca <span class="chip">✅ La sabía</span> o <span class="chip">🔁 Repasar</span>, ' +
  'con la verdad.</li>' +
  '</ol>' +
  '<p>Una tarjeta queda <b>dominada</b> cuando la aciertas <b>dos veces seguidas</b>. ' +
  'Las que fallas vuelven a salir primero. Si dices «la sabía» sin saberla, la ' +
  'app deja de mostrártela y ahí pierdes puntos el día del examen.</p>' +
  '<p>Hay <b>' + nTj + ' tarjetas</b> en total; cada categoría ve las suyas.</p>' +
  img('09-tarjetas', 'Una tarjeta lista para voltear', 260) +
  '</div>' +

  '<div class="gcap"><h2>✏️ Examen: practicar</h2>' +
  '<p>La pantalla abre con <b>un solo botón</b>. Dice cuántas preguntas trae y de ' +
  'qué nivel, y con tocar <span class="chip">🚀 Comenzar</span> empieza.</p>' +
  img('10-examen', 'Toca Comenzar y ya', 250) +
  '<h3>Mientras lo haces</h3>' +
  '<ul>' +
  '<li>Arriba corre un reloj. Se pone rojo en los últimos dos minutos.</li>' +
  '<li>Las preguntas <b>cambian cada vez</b>. Nunca te sale el mismo examen dos veces.</li>' +
  '<li>Al terminar, toca <span class="chip">✅ Entregar</span>.</li>' +
  '</ul>' +
  '<h3>Al terminar</h3>' +
  '<p>Ves tu puntaje y, más abajo, <b>todas las preguntas con la respuesta correcta</b>. ' +
  'Léelas, sobre todo las que fallaste. Las que fallas quedan guardadas y puedes ' +
  'hacer un examen <b>solo con tus errores</b> desde «Qué estudiar hoy».</p>' +
  img('14-resultado', 'El resultado, con la respuesta correcta de cada pregunta', 250) +
  '</div>' +

  '<div class="gcap"><h2>Si prefieres estudiar en papel</h2>' +
  '<p>En <b>📖 Estudiar</b>, hasta abajo, hay un botón que dice ' +
  '<span class="chip">🖨️ Imprimir o guardar en PDF</span>. Ábrelo y escoge:</p>' +
  '<ul>' +
  '<li><b>Toda mi guía de estudio</b> — todos tus capítulos y repasos, en orden.</li>' +
  '<li><b>Mis tarjetas, para recortar</b> — las tarjetas en papel. Tapas la ' +
  'respuesta con la mano, contestas en voz alta, y destapas.</li>' +
  '</ul>' +
  '<p>Y si solo quieres un capítulo, ábrelo y usa <span class="chip">🖨️ Imprimir ' +
  'este capítulo</span> al final.</p>' +
  '<p>Se abre el cuadro de impresión. Si no vas a usar la impresora, escoge ' +
  '<b>Guardar como PDF</b> y te queda el archivo en el teléfono.</p>' +
  img('16-imprimir-estudio', 'Los botones para imprimir tu material', 260) +
  '</div>' +

  '<div class="gcap"><h2>Mandarle a tu director cómo vas</h2>' +
  '<p>Tu progreso vive solo en este aparato, así que tu director no puede verlo ' +
  'desde el suyo. Para mostrárselo hay un código de texto.</p>' +
  paso(1, 'Entra a 🏆 Logros',
    '<p>Abre <span class="chip">📤 Pasar o compartir mi progreso</span>.</p>') +
  paso(2, 'Toca «Código para mostrar cómo voy»',
    '<p>Aparece un código corto que empieza en <b>CB1R</b>.</p>') +
  paso(3, 'Toca «Copiar» y pégalo en el chat',
    '<p>Tu director lo pega en su app y ve tus capítulos, tus exámenes y tu racha. ' +
    '<b>No le pasa tu progreso</b>: solo le muestra una foto de cómo vas.</p>') +
  '<p class="warn-box">El otro botón, <b>«Código para pasar todo a otro aparato»</b>, ' +
  'sirve para cuando cambias de teléfono. Ese sí lleva todo y es mucho más largo.</p>' +
  img('17-codigo', 'Los dos códigos', 220) +
  '</div>' +

  '<div class="gcap"><h2>Tres reglas para que sirva</h2>' +
  '<div class="regla">1. Todos los días un rato corto, mejor que un día entero.</div>' +
  '<div class="regla">2. Responde en voz alta antes de ver la respuesta.</div>' +
  '<div class="regla">3. Sé honesto con «La sabía». Nadie te está calificando ahí.</div>' +
  '<h3>Preguntas que todos hacen</h3>' +
  '<div class="pregunta">¿Se me borra si cierro la app?</div>' +
  '<div class="respuesta">No. Todo se guarda en el teléfono o computador donde la ' +
  'abriste. Pero <b>solo ahí</b>: si la abres en otro aparato, empiezas de cero.</div>' +
  '<div class="pregunta">¿Necesito internet?</div>' +
  '<div class="respuesta">Solo para abrirla la primera vez. Después funciona sin ' +
  'internet.</div>' +
  '<div class="pregunta">Escogí mal mi edad, ¿qué hago?</div>' +
  '<div class="respuesta">En el Inicio, arriba, toca <span class="chip">Cambiar</span> ' +
  'y escoge la categoría correcta.</div>' +
  '<div class="pregunta">¿Cuántas preguntas trae el examen del campamento?</div>' +
  '<div class="respuesta">No lo sabemos todavía. Sí sabemos que trae tres secciones: ' +
  'selección múltiple, verdadero o falso, y completar el versículo. Por eso aquí ' +
  'puedes practicar con varios tamaños.</div>' +
  '<div class="pregunta">¿Cuántas preguntas hay para estudiar?</div>' +
  '<div class="respuesta">Para Aventureros hay <b>' + nAv + '</b> preguntas distintas. ' +
  'Cada examen saca unas cuantas al azar.</div>' +
  '</div>' +

  '<div class="pie">Generado desde la app · Club de Aventureros, Iglesia Adventista Tierra Linda</div>' +
  '</div>';
  return IMPR.paginaImpr('Manual para quien estudia', h);
}

/* ─────────────────────────────────────────────────────────────
   MANUAL 2 — para directores
   Lo lee un adulto que tiene que montar seis participantes, revisar cómo van
   e imprimir exámenes. Va directo a lo operativo y termina diciendo lo que
   la app NO hace, que es lo que suele sorprender.
   ───────────────────────────────────────────────────────────── */
function manualDirector() {
  const filas = Object.entries(CATS).map(([k, c]) =>
    '<tr><td class="key">' + c.nombre + '</td><td>' + c.edad + '</td><td>' + c.ev +
    '</td><td>' + c.alcance + '</td><td style="text-align:center">' +
    bancoDe(k).length + '</td></tr>').join('');

  let h = '<div class="man">' + cabecera(
    'GUÍA PARA DIRECTORES',
    'Cómo funciona la app de preparación',
    'Qué es, cómo montar a cada participante, cómo ver si están estudiando de ' +
    'verdad, cómo imprimir los exámenes, y qué cosas la app no hace.') +

  '<h2>1. Qué es y qué no es</h2>' +
  '<p>Es <b>una sola página web</b>. Se abre en el navegador del celular o del ' +
  'computador, no se instala nada, y después de abrirla una vez funciona sin ' +
  'internet. Todo el progreso se guarda <b>en ese aparato</b>.</p>' +
  '<p>Cubre <b>los dos eventos del campamento</b> con material verificado contra ' +
  'la fuente: los ' + CAPS.length + ' capítulos de Conexión Bíblica y los 31 días ' +
  'de la matutina de octubre. En total <b>' + TODO_BANCO.length + ' preguntas</b> y ' +
  (TARJETAS.length + MAT.MAT_TARJETAS.length) + ' tarjetas.</p>' +
  '<p><b>No</b> es el examen del campamento ni lo reemplaza. Es práctica: las ' +
  'preguntas las armamos nosotros a partir del material del reglamento.</p>' +

  '<h2>2. Las seis categorías</h2>' +
  '<p>La categoría es el dato del que depende todo: qué capítulos ve el ' +
  'participante, de dónde salen sus preguntas y hasta qué dificultad le llega. ' +
  'Las del reglamento son las tres primeras de cada evento.</p>' +
  '<table class="info-table"><thead><tr><th>Categoría</th><th>Edad</th>' +
  '<th>Evento</th><th>Alcance</th><th>Preguntas</th></tr></thead><tbody>' +
  filas + '</tbody></table>' +
  '<p class="warn-box"><b>Guías Mayores</b> no está en el reglamento del ' +
  'campamento: es el alcance ampliado (Daniel 1 al 6 y P&R 39 al 44) para el ' +
  'otro evento.</p>' +

  '<div class="gcap"><h2>3. Montar a un participante</h2>' +
  '<p>La primera vez que se abre, la app hace tres preguntas y de ahí deduce la ' +
  'categoría. <b>El participante nunca escoge entre las seis</b>, justamente para ' +
  'que un niño de cinco años no termine estudiando el material de nueve.</p>' +
  '<ol>' +
  '<li>Nombre.</li>' +
  '<li>Edad: 4 a 6, 7 a 9, o adulto. Los Guías Mayores tienen un enlace abajo.</li>' +
  '<li>Evento: Conexión Bíblica, Devoción Matutina, o los dos.</li>' +
  '</ol>' +
  '<p>Si escoge <b>«En los dos»</b>, la app le crea <b>dos fichas</b> con el mismo ' +
  'nombre, una por evento. Son cuentas separadas a propósito: el progreso de ' +
  'Daniel y el de la matutina no se deben mezclar.</p>' +
  img('03-bienvenida3', 'Paso 3 de la bienvenida', 240) +
  '<h3>Varios participantes en un mismo aparato</h3>' +
  '<p>En el Inicio, la barra de arriba dice quién está estudiando. Al tocar ' +
  '<span class="chip">Cambiar</span> se abre el selector de personas y de ' +
  'categoría. Caben <b>hasta 12 fichas</b> en un aparato, cada una con su propio ' +
  'progreso, sus errores y sus exámenes.</p>' +
  img('06-ident', 'La barra de identidad: quién estudia y qué estudia', 300) +
  '<p class="warn-box"><b>Lo primero que hay que revisar</b> cuando un niño lleva ' +
  'días estudiando: que la barra diga la categoría correcta. Si dice otra, tocar ' +
  'Cambiar y corregir. El progreso no se pierde.</p>' +
  '</div>' +

  '<div class="gcap"><h2>4. Ver si están estudiando de verdad</h2>' +
  '<p>Tres lugares, en orden de utilidad:</p>' +
  '<h3>Progreso por capítulo (Inicio)</h3>' +
  '<p>Un círculo por capítulo. Se llena cuando el participante toca «Ya lo ' +
  'estudié» al final del capítulo, no por el hecho de abrirlo. Círculos en 0% ' +
  'con exámenes hechos significa que está adivinando en vez de leer.</p>' +
  '<h3>Tus números (Inicio)</h3>' +
  '<p>Capítulos leídos, mejor puntaje, exámenes hechos, días de racha y errores ' +
  'pendientes. La tarjeta aparece solo cuando ya hay algo que mostrar.</p>' +
  '<h3>Logros</h3>' +
  '<p><b>Puntos débiles</b> es la pantalla que más sirve: dice en qué capítulo va ' +
  'más flojo. <b>Historial</b> muestra cada examen con su puntaje y su fecha, así ' +
  'que se ve si está mejorando o estancado.</p>' +
  img('15-logros', 'Logros: puntos débiles e historial', 250) +
  '</div>' +

  '<div class="gcap"><h2>5. Cómo sube la dificultad</h2>' +
  '<p>Las preguntas están en tres niveles: <b>1 Básico</b> (nombres, números, ' +
  'lugares), <b>2 Intermedio</b> (V/F y matices) y <b>3 Avanzado</b> (citas ' +
  'literales, completar el versículo, diferencias entre versiones).</p>' +
  '<p>La app sube de nivel sola, con dos frenos, y manda el más bajo de los dos:</p>' +
  '<ul>' +
  '<li><b>El calendario:</b> las dos primeras semanas solo nivel 1, hasta la ' +
  'cuarta nivel 2, después nivel 3.</li>' +
  '<li><b>El desempeño:</b> no sube a nivel 2 hasta promediar 70%, ni a nivel 3 ' +
  'hasta promediar 85% en los últimos exámenes.</li>' +
  '</ul>' +
  '<p>Los de 4 a 6 años se quedan en nivel 1 y no ven la sección de completar: el ' +
  'reglamento no les pide escribir la palabra exacta. Los adultos entran directo ' +
  'a nivel 3.</p>' +
  '<p>Se puede fijar el nivel a mano en <b>Examen → Cambiar este examen</b>, pero ' +
  'lo normal es dejarlo en Progresivo.</p>' +
  img('12-ajustar', 'Los ajustes del examen, escondidos hasta que se necesitan', 250) +
  '</div>' +

  '<div class="gcap"><h2>6. Imprimir exámenes en papel o PDF</h2>' +
  '<p>En <b>Examen → Para el director: imprimir</b>. Cuatro botones:</p>' +
  '<table class="info-table"><thead><tr><th>Botón</th><th>Qué saca</th></tr></thead><tbody>' +
  '<tr><td class="key">Este examen, sin respuestas</td><td>La hoja del ' +
  'concursante, con espacio para nombre, club y puntaje.</td></tr>' +
  '<tr><td class="key">Este examen, con respuestas</td><td>La misma hoja con la ' +
  'correcta marcada en verde. Es la clave para calificar.</td></tr>' +
  '<tr><td class="key">Las 6 categorías, sin respuestas</td><td>Un solo documento ' +
  'con los seis exámenes, cada uno en su hoja.</td></tr>' +
  '<tr><td class="key">Las 6 categorías, con respuestas</td><td>Las seis claves ' +
  'en un solo documento.</td></tr>' +
  '</tbody></table>' +
  '<p>Se abre el cuadro de impresión del aparato. Ahí se manda a la impresora o ' +
  'se escoge <b>Guardar como PDF</b>. Los dos primeros botones usan lo que esté ' +
  'escogido en «Cambiar este examen»: capítulo, cantidad y dificultad.</p>' +
  '<div class="regla">La hoja con respuestas dice «SOLO PARA LÍDERES» en el ' +
  'encabezado. Revísalo antes de repartir.</div>' +
  '<p>El examen y su clave salen del mismo armado, así que el número 7 de la hoja ' +
  'del niño es el número 7 de la clave. Las opciones se barajan en cada examen: ' +
  'no se puede aprobar marcando siempre la misma letra.</p>' +
  img('11-imprimir', 'Los cuatro botones de impresión', 260) +
  '<p class="warn-box">En iPhone y iPad el cuadro de impresión no siempre abre. ' +
  'Si no abre, aparece un enlace debajo de los botones para ver el examen en otra ' +
  'pestaña y usar Compartir → Imprimir. Lo cómodo es imprimir desde un ' +
  'computador.</p>' +
  '</div>' +

  '<div class="gcap"><h2>7. Imprimir el material de estudio</h2>' +
  '<p>Además de los exámenes se puede imprimir todo el material. Está en ' +
  '<b>📖 Estudiar</b>, al final de la pantalla:</p>' +
  '<table class="info-table"><thead><tr><th>Botón</th><th>Qué saca</th></tr></thead><tbody>' +
  '<tr><td class="key">Toda mi guía de estudio</td><td>Los capítulos y repasos de ' +
  'la categoría activa, cada uno en su hoja.</td></tr>' +
  '<tr><td class="key">Mis tarjetas, para recortar</td><td>Las tarjetas en dos ' +
  'columnas, con la respuesta debajo y línea de corte.</td></tr>' +
  '<tr><td class="key">Las guías de los dos eventos</td><td>El material completo ' +
  'de Conexión Bíblica y de la Devoción Matutina en un solo documento.</td></tr>' +
  '</tbody></table>' +
  '<p>Y dentro de cada capítulo hay un <b>Imprimir este capítulo</b>, útil para ' +
  'repartir de a poco en las reuniones del club.</p>' +
  '<p>Es el mismo material que la app: no hay una versión de papel distinta que se ' +
  'pueda quedar atrás.</p>' +
  img('16-imprimir-estudio', 'Impresión del material de estudio', 260) +
  '</div>' +

  '<div class="gcap"><h2>8. Ver el progreso de otro aparato</h2>' +
  '<p>El progreso no sale del navegador donde se estudió. Para revisarlo sin tener ' +
  'el teléfono en la mano, el participante manda un código de texto.</p>' +
  '<h3>Cómo se hace</h3>' +
  '<ol>' +
  '<li>El participante entra a <b>🏆 Logros → Pasar o compartir mi progreso</b> y ' +
  'toca <b>«Código para mostrar cómo voy»</b>.</li>' +
  '<li>Toca <b>Copiar</b> y te lo manda por chat. Son unos 300 caracteres.</li>' +
  '<li>Tú lo pegas en el recuadro de abajo de esa misma pantalla y tocas ' +
  '<b>Ver el código</b>.</li>' +
  '</ol>' +
  '<p>Sale un boletín con capítulos leídos, mejor puntaje, exámenes hechos, días de ' +
  'racha, tarjetas dominadas, errores pendientes y los últimos cinco exámenes con ' +
  'fecha.</p>' +
  '<div class="regla">Ver un resumen no cambia nada de tus propios datos.</div>' +
  img('18-boletin', 'El boletín que sale al pegar un código', 250) +
  '<h3>Los dos códigos, y para qué es cada uno</h3>' +
  '<table class="info-table"><thead><tr><th>Código</th><th>Largo</th>' +
  '<th>Para qué</th></tr></thead><tbody>' +
  '<tr><td class="key">CB1R — resumen</td><td>~300 caracteres</td><td>Mandar por ' +
  'chat cómo va alguien. Solo se ve, no se importa.</td></tr>' +
  '<tr><td class="key">CB1F — ficha completa</td><td>~1.000 y sube</td><td>Pasar ' +
  'todo a otro aparato, con errores y tarjetas. Se puede agregar como ficha nueva ' +
  'o reemplazar la actual.</td></tr>' +
  '</tbody></table>' +
  '<p class="warn-box">Si el código no se entiende, casi siempre llegó cortado. ' +
  'Que lo copie otra vez con el botón <b>Copiar</b>, no seleccionando a mano. Los ' +
  'saltos de línea que mete el chat no importan: la app los ignora.</p>' +
  '</div>' +

  '<div class="gcap"><h2>9. Lo que la app NO hace</h2>' +
  '<p>Vale más saberlo antes que descubrirlo el 8 de octubre.</p>' +
  '<ul>' +
  '<li><b>No sincroniza entre aparatos.</b> El progreso vive en el navegador donde ' +
  'se estudió. Si el niño estudia en el celular de la mamá y después abre la app ' +
  'en la tablet, la tablet empieza en cero.</li>' +
  '<li><b>No se sincroniza sola.</b> Para ver el progreso de otro aparato hay que ' +
  'pedir el código del punto 8; no llega solo.</li>' +
  '<li><b>No borra nada solo</b>, pero si alguien limpia los datos del navegador ' +
  'o usa modo incógnito, el progreso se va. Modo incógnito no sirve para esto.</li>' +
  '<li><b>No es el examen oficial.</b> No sabemos cuántas preguntas trae el real ' +
  'ni cómo reparte las secciones.</li>' +
  '</ul>' +
  '<h2>10. El punto que hay que confirmar con la organización</h2>' +
  '<p>El volante dice «Nueva Reina Valera 1995». Con ese nombre exacto no existe ' +
  'ninguna versión publicada. Existen dos cosas distintas:</p>' +
  '<ul>' +
  '<li><b>Reina-Valera 1995</b> (Sociedades Bíblicas Unidas). Es contra esta que ' +
  'verificamos palabra por palabra todo el material.</li>' +
  '<li><b>Nueva Reina-Valera</b> 1990 o 2000 (Sociedad Bíblica Emanuel), de uso ' +
  'adventista. Es otro texto.</li>' +
  '</ul>' +
  '<p>Para las preguntas de datos da igual. Para la sección de <b>completar el ' +
  'versículo</b> no: varias palabras cambian. <b>Hay que preguntarle a la ' +
  'organización del campamento cuál de las dos se califica.</b></p>' +
  '<div class="regla">Es la única cosa de este material que no podemos resolver ' +
  'nosotros.</div>' +
  '</div>' +

  '<div class="gcap"><h2>11. Si algo no funciona</h2>' +
  '<div class="pregunta">El progreso apareció en cero.</div>' +
  '<div class="respuesta">Casi siempre es otro navegador, otro aparato, o modo ' +
  'incógnito. Revisar también que la barra de arriba tenga seleccionada la ficha ' +
  'correcta.</div>' +
  '<div class="pregunta">Los círculos no se llenan aunque el niño lee.</div>' +
  '<div class="respuesta">Falta tocar «Ya lo estudié» al final de cada capítulo.</div>' +
  '<div class="pregunta">El examen sale con menos preguntas de las pedidas.</div>' +
  '<div class="respuesta">El alcance escogido no tiene tantas. La app avisa ' +
  '«Se usarán todas» y usa las que hay.</div>' +
  '<div class="pregunta">Volvió a salir la pantalla de bienvenida.</div>' +
  '<div class="respuesta">Solo aparece cuando no hay ningún dato guardado, así que ' +
  'se borraron los datos del navegador.</div>' +
  '<div class="pregunta">Quiero empezar de cero con un participante.</div>' +
  '<div class="respuesta">Logros → Datos guardados → Borrar solo a este ' +
  'participante.</div>' +
  '</div>' +

  '<div class="pie">Generado desde los mismos archivos que alimentan la app · ' +
  'Club de Aventureros, Iglesia Adventista Tierra Linda</div></div>';
  return IMPR.paginaImpr('Guía para directores', h);
}

/* El CSS del manual se agrega al del imprimible, que ya trae @page, saltos de
   página y las cajas de color. */
const conCss = html => html.replace('</style>', CSS_MAN + '</style>');

const SALIDAS = {
  'Manual_Para_Estudiar.html': conCss(manualEstudiante()),
  'Manual_Para_Directores.html': conCss(manualDirector()),
};
for (const [nombre, html] of Object.entries(SALIDAS)) {
  fs.writeFileSync(path.join(DESTINO, nombre), html);
  console.log('✅', path.join(DESTINO, nombre), Math.round(html.length / 1024) + 'KB');
}
if (!hayCaps) console.log('⚠️  Sin capturas (' + CAPTURAS + '): los manuales salen sin imágenes.');
console.log('Para PDF: abrir el HTML en el navegador → Imprimir → Guardar como PDF.');
