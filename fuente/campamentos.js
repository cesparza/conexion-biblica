/* LA FICHA DEL CAMPAMENTO (v163)

   QUÉ ES
   Una ficha por concurso: de qué tema es, cuándo, y qué categorías tiene. Cada
   categoría dice cuántas preguntas trae su examen, hasta qué nivel llega y qué
   se estudia. Es el reglamento, escrito como datos.

   POR QUÉ VIVE AQUÍ
   Antes el reglamento estaba repartido en tres sitios: la lista de categorías
   y la de actividades en app.js, y una marca `cats` en cada capítulo y en cada
   repaso. Cambiar un reglamento era tocar los tres y acordarse de los tres.
   Desde la v163 sale de las fichas: de ellas se derivan ACTIVIDADES, CATS y la
   marca `cats` de cada capítulo. El contenido ya no sabe para quién es; solo
   existe.

   DOS SITIOS, UNA REGLA DE QUIÉN GANA (v167)
   Estas son las fichas DE FÁBRICA: las que la app trae escritas y con las que
   abre sin señal y sin base. Una ficha también se puede guardar en la base
   (tabla `ficha`, migración 012). La guardada con el mismo id reemplaza entera
   a la de aquí; una con id nuevo es un concurso nuevo. Las reglas (derivar,
   revisar, juntar) están en reglamento.js y corren al armar y al abrir.
   Si una ficha de aquí ya tiene una guardada encima, cambiarla aquí no se ve.

   CÓMO SE AGREGA UN CAMPAMENTO
   Una ficha más en CAMPAMENTOS, con categorías de ids nuevos. Si es de un tema
   que ya está (Daniel para otro club, por ejemplo), no hay que escribir
   contenido: basta listar en `estudia` lo que entra.

   CÓMO SE AGREGA UN TEMA
   1. Su contenido en fuente/ (capítulos, estudio, preguntas, tarjetas), como
      matutina.js o creencias.js.
   2. Su tipo en TEMAS, en reglamento.js, y los ids que aporta en IDS_DE_TEMA
      de build.js.
   3. Su ficha aquí. revisa() no deja pasar una ficha que nombre un id que su
      tema no tiene.

   LOS IDS DE CATEGORÍA NO SE CAMBIAN
   Están guardados en la base (participante.categoria, evaluacion.categorias) y
   en el progreso de cada aparato. Una categoría nueva lleva un id nuevo. */

const sec = (pre, a, b) =>
  Array.from({ length: b - a + 1 }, (_, i) => pre + String(a + i).padStart(2, '0'));

/* Lo que comparten varias categorías se escribe una vez. */
const DANIEL_RELATOS = ['d1', 'd2', 'd3', 'd6'];
const REPASOS_MENORES = ['m-personajes', 'm-numeros', 'm-versiculos', 'm-lugares', 'm-palabras'];
const REPASOS_AV = ['m-linea', 'm-personajes', 'm-numeros', 'm-trampas', 'm-versiculos',
  'm-lugares', 'm-version', 'm-prioridades', 'm-palabras'];
const AV_ESTUDIA = [...DANIEL_RELATOS, 'pr39', 'pr41', 'pr44', ...REPASOS_AV];
const REPASOS_MATUTINA = ['mm-quien', 'mm-versiculos', 'mm-plan'];
const CREENCIAS = [...sec('cr', 1, 28), 'mc-doctrinas', 'mc-lista'];

/* LOS TEMAS Y SU TIPO
   La app no se porta distinto según el club ni según el campamento: se porta
   según el TIPO de material. Un libro por capítulos se escoge con fichas y se
   puede filtrar por fuente; un devocional va por días y por tramos; las
   creencias son las 28. Un tema nuevo declara su tipo y hereda ese
   comportamiento entero; un campamento nuevo no agrega lógica, solo su ficha.
   Si un día un reglamento pide algo que ningún tipo sabe hacer, se agrega la
   capacidad al tipo (o un tipo nuevo), nunca un «si es tal club».
   Los tipos están en reglamento.js (TEMAS). */

/* Cada ficha dice su fecha en `fecha` (AAAA-MM-DD), o '' si todavía no se
   sabe. De ahí salen la cuenta de días, la semana del plan y el freno de
   dificultad por calendario. `cuando` es el texto que se muestra. */

/* Cada categoría:
     n             preguntas del examen de práctica
     techo         nivel máximo de dificultad que se le ofrece (1 a 3)
     sinCompletar  el examen no trae sección de completar
     segundos      tiempo por pregunta en el examen (si no se dice, 72)
     sinRampa      entra directo a su techo, sin subir de nivel por semanas
     alcance       cómo se le dice a la persona lo que entra
     estudia       capítulos y repasos que ve
     soloEstudio   de esos, los que se leen pero no entran al examen */
const CAMPAMENTOS = [
  /* Los tres concursos de Aventureros (este, la matutina y las creencias)
     fueron el mismo día, el 10 de octubre de 2026. Lo confirmó Camilo el 11 de
     octubre; el código traía el 9. */
  { id: 'cb', tema: 'daniel', nombre: 'Conexión Bíblica', icono: '📘', cuando: '10 de octubre', fecha: '2026-10-10',
    que: 'El libro de Daniel y Profetas y Reyes',
    /* El reglamento del campamento pide dos integrantes de 4 a 6 años (solo
       Daniel), dos de 7 a 9 (Daniel y Profetas y Reyes) y dos padres o
       consejeros con el alcance de 7 a 9. */
    categorias: [
      { id: 'me', nombre: 'Menores', edad: '4 a 6 años', n: 10, techo: 1, sinCompletar: true, segundos: 100,
        alcance: 'Daniel 1, 2, 3 y 6',
        estudia: [...DANIEL_RELATOS, ...REPASOS_MENORES] },
      { id: 'av', nombre: 'Aventureros', edad: '7 a 9 años', n: 15, techo: 3, sinCompletar: false, segundos: 80,
        alcance: 'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44',
        estudia: AV_ESTUDIA },
      { id: 'pa', nombre: 'Padres y consejeros', edad: 'Adultos', n: 25, techo: 3, sinCompletar: false, sinRampa: true,
        alcance: 'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44',
        estudia: AV_ESTUDIA },
    ] },
  /* v164: Guías Mayores es otro evento, con el mismo tema y el alcance
     ampliado. Compartía la ficha de arriba; Camilo pidió separarla el 10 de
     octubre de 2026. La categoría conserva su id, así que el progreso y los
     participantes guardados siguen siendo de ella. */
  { id: 'cbg', tema: 'daniel', nombre: 'Conexión Bíblica de Guías Mayores', icono: '📘', cuando: 'Fecha por confirmar', fecha: '',
    que: 'Daniel 1 al 6 y Profetas y Reyes 39 al 44',
    categorias: [
      { id: 'gm', nombre: 'Guías Mayores', edad: 'Desde 16 años', n: 25, techo: 3, sinCompletar: false,
        alcance: 'Daniel 1 al 6 · P&R 39 al 44',
        estudia: [...Array.from({ length: 12 }, (_, i) => 'd' + (i + 1)), ...sec('pr', 39, 44),
          ...REPASOS_AV, 'm-reyes', 'm-profetico'],
        /* Daniel 7 al 12 es material de estudio: no entra al examen. */
        soloEstudio: ['d7', 'd8', 'd9', 'd10', 'd11', 'd12'] },
    ] },
  /* El concurso fue el 10 de octubre; la lectura sigue todo el mes. */
  { id: 'dm', tema: 'matutina', nombre: 'Devoción Matutina', icono: '🌅', cuando: '10 de octubre', fecha: '2026-10-10',
    que: 'Héroes y villanos, un día a la vez',
    categorias: [
      { id: 'dm1', nombre: 'Menores', edad: '4 a 6 años', n: 10, techo: 1, sinCompletar: true,
        alcance: 'Héroes y villanos · 1 al 15 de octubre',
        estudia: [...sec('m', 1, 15), ...REPASOS_MATUTINA] },
      { id: 'dm2', nombre: 'Aventureros', edad: '7 a 9 años', n: 15, techo: 2, sinCompletar: true,
        alcance: 'Héroes y villanos · 1 al 30 de octubre',
        estudia: [...sec('m', 1, 31), ...REPASOS_MATUTINA],
        /* El 31 cierra la historia del 30; el reglamento llega hasta el 30. */
        soloEstudio: ['m31'] },
    ] },
  { id: 'ec', tema: 'creencias', nombre: 'En esto creemos', icono: '✝️', cuando: '10 de octubre', fecha: '2026-10-10',
    que: 'Las 28 creencias',
    /* El reglamento reparte el club en dos: dos adultos presentan un examen
       escrito y el resto contesta otro cuestionario, y las dos notas se
       suman. Por eso son dos categorías y no una. */
    categorias: [
      { id: 'ec1', nombre: 'Los dos del examen escrito', edad: 'Adultos', n: 25, techo: 3, sinCompletar: false,
        alcance: 'Las 28 creencias', estudia: CREENCIAS },
      { id: 'ec2', nombre: 'El resto del club', edad: 'Cuestionario', n: 15, techo: 2, sinCompletar: true,
        alcance: 'Las 28 creencias', estudia: CREENCIAS },
    ] },
];

const { TEMAS, TIPOS, deriva, revisa, sinUsar, junta, forma } = require('./reglamento.js');

module.exports = { CAMPAMENTOS, TEMAS, TIPOS, deriva, revisa, sinUsar, junta, forma };
