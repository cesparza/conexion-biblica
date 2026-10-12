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
  const TEMAS = {
    daniel: { tipo: 'libro', nombre: 'Daniel y Profetas y Reyes' },
    matutina: { tipo: 'dias', nombre: 'Devoción Matutina · Héroes y villanos' },
    creencias: { tipo: 'creencias', nombre: 'Las 28 creencias' },
    apocalipsis: { tipo: 'libro', nombre: 'Apocalipsis' },
  };
  const TIPOS = ['libro', 'dias', 'creencias'];
  const SEG_POR_PREGUNTA = 72;
  const ID = /^[a-z][a-z0-9]{1,11}$/;
  const esFecha = s => /^\d{4}-\d\d-\d\d$/.test(s) && !isNaN(new Date(s + 'T00:00:00').getTime());
  const esObjeto = x => !!x && typeof x === 'object' && !Array.isArray(x);

  /* Los textos de una ficha se pintan dentro del HTML y a veces dentro de un
     atributo. Mientras venían del código eran de confianza; ahora los puede
     escribir una persona. Lo que abre una etiqueta o cierra un atributo no
     entra, y cada texto tiene un largo máximo. */
  const PROHIBIDO = new RegExp('[<>"\'`\\\\\\u0000-\\u001F\\u007F]');
  const LARGO = { nombre: 60, icono: 8, cuando: 40, que: 90, edad: 30, alcance: 90 };
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
        cats: f.categorias.map(c => c.id), tema: f.tema, tipo: (tipos[f.tema] || {}).tipo || '',
        fecha: f.fecha || '' };
      for (const c of f.categorias) {
        CATS[c.id] = { act: f.id, nombre: c.nombre, edad: c.edad, n: c.n, techo: c.techo,
          sinCompletar: c.sinCompletar, sinVF: !!c.sinVF, tarjetas: c.tarjetas || 0, alcance: c.alcance, seg: c.segundos || SEG_POR_PREGUNTA,
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
      if (!esObjeto(f)) { mal.push('Hay una ficha que no es una ficha'); continue; }
      const de = 'La ficha «' + f.id + '»';
      if (typeof f.id !== 'string' || !ID.test(f.id)) mal.push(de + ' tiene un id que no sirve');
      if (fichasVistas.has(f.id)) mal.push(de + ' está repetida');
      fichasVistas.add(f.id);
      for (const k of ['nombre', 'icono', 'cuando', 'que']) { const m = textoMalo(f, k); if (m) mal.push(de + ' ' + m); }
      if (typeof f.fecha !== 'string' || (f.fecha && !esFecha(f.fecha))) mal.push(de + ' tiene una fecha que no es AAAA-MM-DD ni vacía');
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
        if (c.segundos !== undefined && !(Number.isInteger(c.segundos) && c.segundos >= 20 && c.segundos <= 600)) mal.push(dc + ' tiene un tiempo por pregunta fuera de 20 a 600 segundos');
        if (!Array.isArray(c.estudia) || !c.estudia.length) { mal.push(dc + ' no estudia nada'); continue; }
        if (new Set(c.estudia).size !== c.estudia.length) mal.push(dc + ' repite algo en «estudia»');
        if (suyos) for (const id of c.estudia) {
          if (!suyos.includes(id)) mal.push(dc + ' estudia «' + id + '», que no es del tema «' + f.tema + '»');
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
    const usados = new Set(fichas.flatMap(f => f.categorias.flatMap(c => c.estudia)));
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
      o.alcance = c.alcance;
      o.estudia = Array.isArray(c.estudia) ? c.estudia.slice() : c.estudia;
      if (c.soloEstudio !== undefined) o.soloEstudio = Array.isArray(c.soloEstudio) ? c.soloEstudio.slice() : c.soloEstudio;
      return o;
    };
    return { id: f.id, tema: f.tema, nombre: f.nombre, icono: f.icono, cuando: f.cuando,
      fecha: f.fecha === undefined ? '' : f.fecha, que: f.que, categorias: f.categorias.map(cat) };
  }

  return { TEMAS, TIPOS, deriva, revisa, sinUsar, junta, forma };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = REGLAS;
