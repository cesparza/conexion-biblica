/* LAS REGLAS DEL REGLAMENTO (v167)

   QUÉ ES
   Lo que se hace con una ficha de campamento: derivar de ella lo que la app
   usa, revisar que no traiga nada imposible y juntar las fichas que vienen
   escritas en el código con las que alguien guardó en la base.

   POR QUÉ ES UN ARCHIVO APARTE
   Hasta la v166 estas funciones vivían en campamentos.js y solo corrían al
   armar el index.html. Desde que una ficha se puede guardar en la base, la
   app tiene que derivar y revisar al abrir, en el aparato. Este archivo va
   tal cual dentro del index.html y también lo carga el build: la regla está
   escrita una vez y corre en los dos lados.

   No nombra ningún campamento ni ningún capítulo. Los datos están en
   campamentos.js (las fichas de fábrica) y en la tabla `ficha` de la base. */
const REGLAS = (function () {
  /* `nombre` es como se le dice el tema a quien arma un concurso. */
  /* `corto` es como se nombra el material solo, sin concurso (v214). */
  const TEMAS = {
    daniel: { tipo: 'libro', nombre: 'Daniel y Profetas y Reyes', corto: 'Daniel' },
    matutina: { tipo: 'dias', nombre: 'Devoción Matutina · Héroes y villanos', corto: 'Devoción Matutina' },
    creencias: { tipo: 'creencias', nombre: 'Las 28 creencias', corto: 'En esto creemos' },
    apocalipsis: { tipo: 'libro', nombre: 'Apocalipsis', corto: 'Apocalipsis' },
    /* v237: El conflicto de los siglos 24-43 como material (Camilo, 16-oct). Lo pide un
       concurso de otro tema con `obras` (abajo); sus ids son `cs24`…`cs43`. */
    conflicto: { tipo: 'libro', nombre: 'El conflicto de los siglos', corto: 'El conflicto de los siglos' },
  };
  const TIPOS = ['libro', 'dias', 'creencias'];
  /* v191: el club de una categoría, si lo tiene. Decide cómo se entra:
     Aventureros puede ir a cargo de un adulto; Conquistadores y Guías Mayores
     estudian con cuenta propia (y un conquistador sin cuenta, a cargo). */
  const CLUBES = ['aventureros', 'conquistadores', 'guias'];
  /* v236: OTRAS OBRAS EN EL ALCANCE DE UNA CATEGORÍA (política Conexión Bíblica 2027 de
     la Asociación del Alto Magdalena, 15-oct). Un concurso puede pedir capítulos de un
     libro que la app todavía no trae como material (hoy «El conflicto de los siglos»).
     La categoría lo dice en `obras`: { cs: [24, 25, …] }. Se guarda, se muestra y se
     revisa contra el rango de la obra. Los títulos de los capítulos viven en
     fuente/conflicto.js.
     v237: UNA FICHA, DOS LIBROS. Una obra con `tema` ya es material de la app: sus
     capítulos (`pre` + número, «cs24») entran a lo que la categoría estudia (estudiaDe),
     así que se filtran, se estudian y salen en el examen de práctica junto con los del
     tema de la ficha. Un capítulo que la obra todavía no tiene escrito no aparece y
     no rompe nada: la lista de la app solo trae los que existen. */
  const OBRAS = {
    cs: { nombre: 'El conflicto de los siglos', corto: 'CS', autor: 'Elena G. de White', de: 1, a: 43, tema: 'conflicto', pre: 'cs' },
  };
  /** Lo que estudia una categoría: su lista y los capítulos de sus obras que son material. */
  const estudiaDe = c => {
    const l = Array.isArray(c.estudia) ? c.estudia.slice() : [];
    for (const [o, ns] of Object.entries(esObjeto(c.obras) ? c.obras : {})) {
      const O = Object.prototype.hasOwnProperty.call(OBRAS, o) ? OBRAS[o] : null;
      if (O && O.pre && Array.isArray(ns)) for (const n of ns) if (Number.isInteger(n) && !l.includes(O.pre + n)) l.push(O.pre + n);
    }
    return l;
  };
  /** Los temas de una ficha: el suyo y los de las obras que son material. */
  const temasDe = f => [...new Set([f.tema, ...(f.categorias || []).flatMap(c => Object.keys(esObjeto(c.obras) ? c.obras : {})
    .map(o => (Object.prototype.hasOwnProperty.call(OBRAS, o) ? OBRAS[o] : {}).tema).filter(Boolean))])];
  const SEG_POR_PREGUNTA = 72;
  const ID = /^[a-z][a-z0-9]{1,11}$/;
  const esFecha = s => /^\d{4}-\d\d-\d\d$/.test(s) && !isNaN(new Date(s + 'T00:00:00').getTime());
  const esObjeto = x => !!x && typeof x === 'object' && !Array.isArray(x);

  /* Los textos de una ficha se pintan dentro del HTML y a veces dentro de un
     atributo. Mientras venían del código eran de confianza; ahora los puede
     escribir una persona. Lo que abre una etiqueta o cierra un atributo no
     entra, y cada texto tiene un largo máximo. */
  const PROHIBIDO = new RegExp('[<>"\'`\\\\\\u0000-\\u001F\\u007F]');
  const LARGO = { nombre: 60, icono: 8, cuando: 40, que: 90, edad: 30, alcance: 90, organiza: 60 };
  const textoMalo = (o, k) => {
    const v = o[k];
    if (typeof v !== 'string' || !v.trim()) return 'no tiene «' + k + '»';
    if (v.length > LARGO[k]) return 'tiene «' + k + '» de más de ' + LARGO[k] + ' caracteres';
    if (PROHIBIDO.test(v)) return 'tiene en «' + k + '» un signo que no se admite';
    return '';
  };

  /* De las fichas salen las tres cosas que la app usa. El orden de las fichas
     y el de sus categorías es el orden en que se ofrecen. */
  function deriva(fichas, tipos) {
    tipos = tipos || TEMAS;
    const ACTIVIDADES = {}, CATS = {};
    const orden = [];
    for (const f of fichas) {
      ACTIVIDADES[f.id] = { nombre: f.nombre, icono: f.icono, cuando: f.cuando, que: f.que,
        cats: f.categorias.map(c => c.id), tema: f.tema, temas: temasDe(f), tipo: (tipos[f.tema] || {}).tipo || '',
        fecha: f.fecha || '', organiza: f.organiza || '' };
      for (const c of f.categorias) {
        /* v214: `sinPoliticas`: la categoría no tiene reglamento de concurso (Guías
           Mayores, Camilo 14-oct): ve todo el material y practica el examen sobre todo.
           Si la ficha no lo dice, lo dice el club. */
        CATS[c.id] = { act: f.id, nombre: c.nombre, edad: c.edad, n: c.n, techo: c.techo,
          sinCompletar: c.sinCompletar, sinVF: !!c.sinVF, tarjetas: c.tarjetas || 0, alcance: c.alcance, seg: c.segundos || SEG_POR_PREGUNTA,
          rampa: !c.sinRampa, club: c.club || '', obras: c.obras || null,
          sinPoliticas: c.sinPoliticas !== undefined ? !!c.sinPoliticas : c.club === 'guias' };
        orden.push(c);
      }
    }
    const catsDe = id => orden.filter(c => estudiaDe(c).includes(id)).map(c => c.id);
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
      if (!esObjeto(f)) { mal.push('Hay una ficha que no es una ficha'); continue; }
      const de = 'La ficha «' + f.id + '»';
      if (typeof f.id !== 'string' || !ID.test(f.id)) mal.push(de + ' tiene un id que no sirve');
      if (fichasVistas.has(f.id)) mal.push(de + ' está repetida');
      fichasVistas.add(f.id);
      for (const k of ['nombre', 'icono', 'cuando', 'que']) { const m = textoMalo(f, k); if (m) mal.push(de + ' ' + m); }
      if (typeof f.fecha !== 'string' || (f.fecha && !esFecha(f.fecha))) mal.push(de + ' tiene una fecha que no es AAAA-MM-DD ni vacía');
      if (f.organiza !== undefined) { const m = textoMalo(f, 'organiza'); if (m) mal.push(de + ' ' + m); }
      const suyos = Object.prototype.hasOwnProperty.call(temas, f.tema) ? temas[f.tema] : null;
      const tipo = Object.prototype.hasOwnProperty.call(tipos, f.tema) ? tipos[f.tema] : null;
      if (!suyos) mal.push(de + ' nombra un tema que no existe: «' + f.tema + '»');
      else if (!tipo || !TIPOS.includes(tipo.tipo)) mal.push(de + ' es de un tema sin tipo: «' + f.tema + '»');
      if (!Array.isArray(f.categorias) || !f.categorias.length) { mal.push(de + ' no tiene categorías'); continue; }
      if (f.categorias.length > 12) mal.push(de + ' tiene más de 12 categorías');
      for (const c of f.categorias) {
        if (!esObjeto(c)) { mal.push(de + ' tiene una categoría que no es una categoría'); continue; }
        const dc = 'La categoría «' + c.id + '»';
        if (typeof c.id !== 'string' || !ID.test(c.id)) mal.push(dc + ' tiene un id que no sirve');
        if (vistas.has(c.id)) mal.push(dc + ' está en dos fichas o repetida');
        vistas.add(c.id);
        if (['nombre', 'edad', 'alcance'].some(k => !c[k] || typeof c[k] !== 'string')) mal.push(dc + ' no tiene nombre, edad o alcance');
        else for (const k of ['nombre', 'edad', 'alcance']) { const m = textoMalo(c, k); if (m) mal.push(dc + ' ' + m); }
        if (!Number.isInteger(c.n) || c.n < 1 || c.n > 100) mal.push(dc + ' no dice cuántas preguntas (de 1 a 100)');
        if (![1, 2, 3].includes(c.techo)) mal.push(dc + ' tiene un techo que no es 1, 2 ni 3');
        if (typeof c.sinCompletar !== 'boolean') mal.push(dc + ' no dice si lleva completar');
        if (c.sinVF !== undefined && typeof c.sinVF !== 'boolean') mal.push(dc + ' no dice bien si lleva verdadero o falso');
        if (c.tarjetas !== undefined && !(Number.isInteger(c.tarjetas) && c.tarjetas >= 5 && c.tarjetas <= 100)) mal.push(dc + ' tiene tarjetas por sesión fuera de 5 a 100');
        if (c.sinRampa !== undefined && typeof c.sinRampa !== 'boolean') mal.push(dc + ' no dice bien si entra directo a su nivel');
        if (c.club !== undefined && !CLUBES.includes(c.club)) mal.push(dc + ' tiene un club que no es ' + CLUBES.join(', '));
        if (c.sinPoliticas !== undefined && typeof c.sinPoliticas !== 'boolean') mal.push(dc + ' no dice bien si tiene reglamento de concurso');
        if (c.segundos !== undefined && !(Number.isInteger(c.segundos) && c.segundos >= 20 && c.segundos <= 600)) mal.push(dc + ' tiene un tiempo por pregunta fuera de 20 a 600 segundos');
        if (!Array.isArray(c.estudia) || !c.estudia.length) { mal.push(dc + ' no estudia nada'); continue; }
        if (new Set(c.estudia).size !== c.estudia.length) mal.push(dc + ' repite algo en «estudia»');
        if (suyos) for (const id of c.estudia) {
          if (!suyos.includes(id)) mal.push(dc + ' estudia «' + id + '», que no es del tema «' + f.tema + '»');
        }
        if (c.obras !== undefined) {
          if (!esObjeto(c.obras) || !Object.keys(c.obras).length) mal.push(dc + ' trae «obras» que no es una lista de obras');
          else for (const [o, caps] of Object.entries(c.obras)) {
            const O = Object.prototype.hasOwnProperty.call(OBRAS, o) ? OBRAS[o] : null;
            if (!O) { mal.push(dc + ' nombra una obra que no existe: «' + o + '»'); continue; }
            if (!Array.isArray(caps) || !caps.length || caps.some(n => !Number.isInteger(n) || n < O.de || n > O.a)) mal.push(dc + ' trae capítulos de «' + O.nombre + '» fuera de ' + O.de + ' a ' + O.a);
            else if (new Set(caps).size !== caps.length || caps.some((n, i) => i && n <= caps[i - 1])) mal.push(dc + ' trae capítulos de «' + O.nombre + '» repetidos o fuera de orden');
          }
        }
        if (c.soloEstudio !== undefined && !Array.isArray(c.soloEstudio)) { mal.push(dc + ' trae un «soloEstudio» que no es una lista'); continue; }
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
    const usados = new Set(fichas.flatMap(f => f.categorias.flatMap(estudiaDe)));
    return Object.values(temas).flat().filter(id => !usados.has(id));
  }

  /* JUNTAR LAS DE FÁBRICA CON LAS GUARDADAS

     MECANISMO
     `base` son las fichas escritas en el código y `guardadas` las que llegaron
     de la base. Una guardada con el id de una de fábrica la reemplaza entera,
     en su mismo puesto; una con id nuevo se agrega al final. Se prueban una
     por una: la que deja el conjunto sin pasar revisa() no entra, y las demás
     sí. Nunca lanza un error: con datos dañados devuelve las de fábrica, y la
     app abre igual.

     LO QUE UNA GUARDADA NO PUEDE HACER
     Cambiarle el tema a una ficha que ya existe, ni quitarle una categoría.
     Los ids de categoría están guardados en la base y en el progreso de cada
     aparato: una categoría que desaparece deja a esas personas sin la suya.

     Devuelve { fichas, fuera }, donde `fuera` dice cuáles no entraron y por
     qué, para poder mostrarlo. */
  const TOPE_GUARDADAS = 60;
  function junta(base, guardadas, temas, tipos) {
    let fichas = base.slice();
    const fuera = [];
    const lista = Array.isArray(guardadas) ? guardadas.slice(0, TOPE_GUARDADAS) : [];
    for (const g of lista) {
      const id = esObjeto(g) && typeof g.id === 'string' ? g.id : '';
      try {
        if (!id) { fuera.push({ id: '', por: 'no es una ficha' }); continue; }
        const i = fichas.findIndex(f => f.id === id);
        if (i >= 0) {
          const antes = fichas[i];
          if (g.tema !== antes.tema) { fuera.push({ id, por: 'le cambia el tema a una ficha que ya existe' }); continue; }
          const suyas = Array.isArray(g.categorias) ? g.categorias.map(c => esObjeto(c) ? c.id : '') : [];
          const falta = antes.categorias.map(c => c.id).filter(c => !suyas.includes(c));
          if (falta.length) { fuera.push({ id, por: 'le quita la categoría «' + falta.join('», «') + '»' }); continue; }
        }
        const prueba = i >= 0 ? fichas.map((f, k) => k === i ? g : f) : fichas.concat([g]);
        const mal = revisa(prueba, temas, tipos);
        if (mal.length) { fuera.push({ id, por: mal[0] }); continue; }
        fichas = prueba;
      } catch (e) { fuera.push({ id, por: 'está dañada' }); }
    }
    return { fichas, fuera };
  }

  /* LA FORMA DE UNA FICHA, y nada más (v171). Antes de guardar una ficha que
     escribió una persona se le dejan solo los campos que la app conoce, en su
     orden: lo que venga de más no se guarda. No revisa nada; eso es de
     revisa(). Devuelve null si no es una ficha. */
  function forma(f) {
    if (!esObjeto(f) || !Array.isArray(f.categorias)) return null;
    const cat = c => {
      if (!esObjeto(c)) return c;
      const o = { id: c.id, nombre: c.nombre, edad: c.edad, n: c.n, techo: c.techo, sinCompletar: c.sinCompletar };
      if (c.segundos !== undefined) o.segundos = c.segundos;
      if (c.sinRampa !== undefined) o.sinRampa = c.sinRampa;
      if (c.sinVF !== undefined) o.sinVF = c.sinVF;
      if (c.tarjetas !== undefined) o.tarjetas = c.tarjetas;
      if (c.club !== undefined) o.club = c.club;
      if (c.sinPoliticas !== undefined) o.sinPoliticas = c.sinPoliticas;
      if (c.obras !== undefined) o.obras = esObjeto(c.obras) ? Object.fromEntries(Object.entries(c.obras).map(([k, v]) => [k, Array.isArray(v) ? v.slice() : v])) : c.obras;
      o.alcance = c.alcance;
      o.estudia = Array.isArray(c.estudia) ? c.estudia.slice() : c.estudia;
      if (c.soloEstudio !== undefined) o.soloEstudio = Array.isArray(c.soloEstudio) ? c.soloEstudio.slice() : c.soloEstudio;
      return o;
    };
    const o = { id: f.id, tema: f.tema, nombre: f.nombre, icono: f.icono, cuando: f.cuando,
      fecha: f.fecha === undefined ? '' : f.fecha, que: f.que };
    if (f.organiza !== undefined) o.organiza = f.organiza;
    o.categorias = f.categorias.map(cat);
    return o;
  }

  /* EL ESTUDIO SIN CONCURSO (v214)

     LA DECISIÓN (Camilo, 14-oct): «todo el mundo debería poder estudiar; el material
     para todos los clubes es el mismo y pueden acceder a él; la diferencia son las
     políticas (reglamento de concurso)». El material es una sola biblioteca. Una
     persona puede sumar una preparación (un concurso y su categoría), que solo pone
     tres cosas: qué se ve de entrada («Lo del concurso» o «Todo»), la dificultad
     por edad y las reglas del examen. Sin preparación se estudia todo, con la
     dificultad completa.

     MECANISMO
     Por cada tema que tenga al menos un concurso sale una actividad «sin concurso»
     y su única categoría, «Estudio libre». No son fichas del reglamento: no se
     guardan en la base, el servidor no las conoce y no se ofrecen al armar una
     evaluación. Su id lleva guion (`libre-daniel`), que ningún id de ficha puede
     tener (ID), así que nunca chocan con uno guardado. Devuelve { ACTS, CATS }. */
  const LIBRE = 'libre-';
  function libres(actividades, tipos) {
    tipos = tipos || TEMAS;
    const ACTS = {}, CATS = {};
    /* v237: también los temas de las obras que son material (El conflicto de los siglos). */
    for (const a of Object.values(actividades)) for (const tema of (a.temas || [a.tema])) {
      const id = LIBRE + tema;
      if (ACTS[id] || !tipos[tema]) continue;
      const T = tipos[tema];
      ACTS[id] = { nombre: T.corto || T.nombre, icono: tema === a.tema ? a.icono : '📕', cuando: 'Sin concurso', que: T.nombre,
        cats: [id], tema, temas: [tema], tipo: T.tipo, fecha: '', libre: true };
      CATS[id] = { act: id, nombre: 'Estudio libre', edad: 'Para todos', n: 25, techo: 3,
        sinCompletar: false, sinVF: false, tarjetas: 20, alcance: 'Todo el material', seg: SEG_POR_PREGUNTA,
        rampa: false, club: '', sinPoliticas: true, libre: true };
    }
    return { ACTS, CATS };
  }

  return { TEMAS, TIPOS, CLUBES, OBRAS, deriva, revisa, sinUsar, junta, forma, libres, LIBRE, estudiaDe, temasDe };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = REGLAS;
