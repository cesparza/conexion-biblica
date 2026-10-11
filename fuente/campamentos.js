/* LA FICHA DEL CAMPAMENTO (v163)

   QUÉ ES
   Una ficha por concurso: de qué tema es, cuándo, y qué categorías tiene. Cada
   categoría dice cuántas preguntas trae su examen, hasta qué nivel llega y qué
   se estudia. Es el reglamento, escrito como datos.

   POR QUÉ VIVE AQUÍ
   Antes el reglamento estaba repartido en tres sitios: la lista de categorías
   y la de actividades en app.js, y una marca `cats` en cada capítulo y en cada
   repaso. Cambiar un reglamento era tocar los tres y acordarse de los tres.
   Ahora esta es la única fuente: de aquí salen ACTIVIDADES, CATS y la marca
   `cats` de cada capítulo (deriva(), más abajo). El contenido ya no sabe para
   quién es; solo existe.

   CÓMO SE AGREGA UN CAMPAMENTO
   Una ficha más en CAMPAMENTOS, con categorías de ids nuevos. Si es de un tema
   que ya está (Daniel para otro club, por ejemplo), no hay que escribir
   contenido: basta listar en `estudia` lo que entra.

   CÓMO SE AGREGA UN TEMA
   1. Su contenido en fuente/ (capítulos, estudio, preguntas, tarjetas), como
      matutina.js o creencias.js.
   2. Su tipo en TEMAS, aquí abajo, y los ids que aporta en IDS_DE_TEMA de
      build.js.
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
   capacidad al tipo (o un tipo nuevo), nunca un «si es tal club». */
const TEMAS = {
  daniel: { tipo: 'libro' },
  matutina: { tipo: 'dias' },
  creencias: { tipo: 'creencias' },
};
const TIPOS = ['libro', 'dias', 'creencias'];
const SEG_POR_PREGUNTA = 72;
const esFecha = s => /^\d{4}-\d\d-\d\d$/.test(s) && !isNaN(new Date(s + 'T00:00:00').getTime());

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

/* De las fichas salen las tres cosas que la app usa. El orden de las fichas y
   el de sus categorías es el orden en que se ofrecen. */
function deriva(fichas, tipos) {
  tipos = tipos || TEMAS;
  const ACTIVIDADES = {}, CATS = {};
  const orden = [];
  for (const f of fichas) {
    ACTIVIDADES[f.id] = { nombre: f.nombre, icono: f.icono, cuando: f.cuando, que: f.que,
      cats: f.categorias.map(c => c.id), tema: f.tema, tipo: (tipos[f.tema] || {}).tipo || '',
      fecha: f.fecha || '' };
    for (const c of f.categorias) {
      CATS[c.id] = { act: f.id, nombre: c.nombre, edad: c.edad, n: c.n, techo: c.techo,
        sinCompletar: c.sinCompletar, alcance: c.alcance, seg: c.segundos || SEG_POR_PREGUNTA,
        rampa: !c.sinRampa };
      orden.push(c);
    }
  }
  const catsDe = id => orden.filter(c => c.estudia.includes(id)).map(c => c.id);
  const extraDe = id => orden.filter(c => (c.soloEstudio || []).includes(id)).map(c => c.id);
  /* Le pone a cada capítulo o repaso para quién es. `extra` solo aparece
     cuando hay alguien para quien es de solo estudio. */
  const conCats = lista => lista.map(x => {
    const { cats, extra, ...resto } = x;
    const e = extraDe(x.id);
    return e.length ? { ...resto, cats: catsDe(x.id), extra: e } : { ...resto, cats: catsDe(x.id) };
  });
  return { ACTIVIDADES, CATS, catsDe, extraDe, conCats };
}

/* Lo que una ficha no puede traer. `temas` dice qué ids aporta cada tema:
   { daniel: ['d1', ...], ... }. Devuelve la lista de problemas; vacía es bien. */
function revisa(fichas, temas, tipos) {
  tipos = tipos || TEMAS;
  const mal = [], vistas = new Set(), fichasVistas = new Set();
  for (const f of fichas) {
    const de = 'La ficha «' + f.id + '»';
    if (!/^[a-z][a-z0-9]{1,11}$/.test(f.id || '')) mal.push(de + ' tiene un id que no sirve');
    if (fichasVistas.has(f.id)) mal.push(de + ' está repetida');
    fichasVistas.add(f.id);
    for (const k of ['nombre', 'icono', 'cuando', 'que']) if (!f[k]) mal.push(de + ' no tiene «' + k + '»');
    if (typeof f.fecha !== 'string' || (f.fecha && !esFecha(f.fecha))) mal.push(de + ' tiene una fecha que no es AAAA-MM-DD ni vacía');
    const suyos = temas[f.tema];
    if (!suyos) mal.push(de + ' nombra un tema que no existe: «' + f.tema + '»');
    else if (!tipos[f.tema] || !TIPOS.includes(tipos[f.tema].tipo)) mal.push(de + ' es de un tema sin tipo: «' + f.tema + '»');
    if (!Array.isArray(f.categorias) || !f.categorias.length) { mal.push(de + ' no tiene categorías'); continue; }
    for (const c of f.categorias) {
      const dc = 'La categoría «' + c.id + '»';
      if (!/^[a-z][a-z0-9]{1,11}$/.test(c.id || '')) mal.push(dc + ' tiene un id que no sirve');
      if (vistas.has(c.id)) mal.push(dc + ' está en dos fichas o repetida');
      vistas.add(c.id);
      if (!c.nombre || !c.edad || !c.alcance) mal.push(dc + ' no tiene nombre, edad o alcance');
      if (!Number.isInteger(c.n) || c.n < 1) mal.push(dc + ' no dice cuántas preguntas');
      if (![1, 2, 3].includes(c.techo)) mal.push(dc + ' tiene un techo que no es 1, 2 ni 3');
      if (typeof c.sinCompletar !== 'boolean') mal.push(dc + ' no dice si lleva completar');
      if (c.segundos !== undefined && !(Number.isInteger(c.segundos) && c.segundos >= 20 && c.segundos <= 600)) mal.push(dc + ' tiene un tiempo por pregunta fuera de 20 a 600 segundos');
      if (!Array.isArray(c.estudia) || !c.estudia.length) { mal.push(dc + ' no estudia nada'); continue; }
      if (new Set(c.estudia).size !== c.estudia.length) mal.push(dc + ' repite algo en «estudia»');
      if (suyos) for (const id of c.estudia) {
        if (!suyos.includes(id)) mal.push(dc + ' estudia «' + id + '», que no es del tema «' + f.tema + '»');
      }
      for (const id of c.soloEstudio || []) {
        if (!c.estudia.includes(id)) mal.push(dc + ' marca de solo estudio «' + id + '», que no estudia');
      }
    }
  }
  return mal;
}

/* Lo que ningún campamento usa. No es un error de la ficha, pero un capítulo
   escrito que nadie ve casi siempre es un olvido. */
function sinUsar(fichas, temas) {
  const usados = new Set(fichas.flatMap(f => f.categorias.flatMap(c => c.estudia)));
  return Object.values(temas).flat().filter(id => !usados.has(id));
}

module.exports = { CAMPAMENTOS, TEMAS, TIPOS, deriva, revisa, sinUsar };
