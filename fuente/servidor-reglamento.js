/* GENERADO por fuente/build.js con reglamento.js y campamentos.js. No se edita a mano. */
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
  /* v191: el club de una categoría, si lo tiene. Decide cómo se entra:
     Aventureros puede ir a cargo de un adulto; Conquistadores y Guías Mayores
     estudian con cuenta propia (y un conquistador sin cuenta, a cargo). */
  const CLUBES = ['aventureros', 'conquistadores', 'guias'];
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
          rampa: !c.sinRampa, club: c.club || '' };
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
        if (c.club !== undefined && !CLUBES.includes(c.club)) mal.push(dc + ' tiene un club que no es ' + CLUBES.join(', '));
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
      if (c.club !== undefined) o.club = c.club;
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
export const FICHAS_BASE = [
 {
  "id": "cb",
  "tema": "daniel",
  "nombre": "Conexión Bíblica",
  "icono": "📘",
  "cuando": "10 de octubre",
  "fecha": "2026-10-10",
  "que": "El libro de Daniel y Profetas y Reyes",
  "categorias": [
   {
    "id": "me",
    "nombre": "Menores",
    "edad": "4 a 6 años",
    "n": 10,
    "techo": 1,
    "sinCompletar": true,
    "segundos": 100,
    "club": "aventureros",
    "alcance": "Daniel 1, 2, 3 y 6",
    "estudia": [
     "d1",
     "d2",
     "d3",
     "d6",
     "m-personajes",
     "m-numeros",
     "m-versiculos",
     "m-lugares",
     "m-palabras"
    ]
   },
   {
    "id": "av",
    "nombre": "Aventureros",
    "edad": "7 a 9 años",
    "n": 30,
    "techo": 3,
    "sinCompletar": true,
    "sinVF": true,
    "segundos": 80,
    "tarjetas": 15,
    "club": "aventureros",
    "alcance": "Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44 para estudiar",
    "estudia": [
     "d1",
     "d2",
     "d3",
     "d6",
     "pr39",
     "pr41",
     "pr44",
     "m-linea",
     "m-personajes",
     "m-numeros",
     "m-trampas",
     "m-versiculos",
     "m-lugares",
     "m-version",
     "m-prioridades",
     "m-palabras"
    ],
    "soloEstudio": [
     "pr39",
     "pr41",
     "pr44"
    ]
   },
   {
    "id": "pa",
    "nombre": "Padres y consejeros",
    "edad": "Adultos",
    "n": 35,
    "techo": 3,
    "sinCompletar": true,
    "sinRampa": true,
    "tarjetas": 25,
    "club": "aventureros",
    "alcance": "Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44",
    "estudia": [
     "d1",
     "d2",
     "d3",
     "d6",
     "pr39",
     "pr41",
     "pr44",
     "m-linea",
     "m-personajes",
     "m-numeros",
     "m-trampas",
     "m-versiculos",
     "m-lugares",
     "m-version",
     "m-prioridades",
     "m-palabras"
    ]
   }
  ]
 },
 {
  "id": "cbg",
  "tema": "daniel",
  "nombre": "Conexión Bíblica: Daniel",
  "icono": "📘",
  "cuando": "Fecha por confirmar",
  "fecha": "",
  "que": "Daniel 1 al 6 y Profetas y Reyes 39 al 44",
  "categorias": [
   {
    "id": "gm",
    "nombre": "Guías Mayores",
    "edad": "Desde 16 años",
    "n": 25,
    "techo": 3,
    "sinCompletar": false,
    "club": "guias",
    "alcance": "Daniel 1 al 6 · P&R 39 al 44",
    "estudia": [
     "d1",
     "d2",
     "d3",
     "d4",
     "d5",
     "d6",
     "d7",
     "d8",
     "d9",
     "d10",
     "d11",
     "d12",
     "pr39",
     "pr40",
     "pr41",
     "pr42",
     "pr43",
     "pr44",
     "m-linea",
     "m-personajes",
     "m-numeros",
     "m-trampas",
     "m-versiculos",
     "m-lugares",
     "m-version",
     "m-prioridades",
     "m-palabras",
     "m-reyes",
     "m-profetico"
    ],
    "soloEstudio": [
     "d7",
     "d8",
     "d9",
     "d10",
     "d11",
     "d12"
    ]
   }
  ]
 },
 {
  "id": "dm",
  "tema": "matutina",
  "nombre": "Devoción Matutina",
  "icono": "🌅",
  "cuando": "10 de octubre",
  "fecha": "2026-10-10",
  "que": "Héroes y villanos, un día a la vez",
  "categorias": [
   {
    "id": "dm1",
    "nombre": "Menores",
    "edad": "4 a 6 años",
    "n": 10,
    "techo": 1,
    "sinCompletar": true,
    "alcance": "Héroes y villanos · 1 al 15 de octubre",
    "estudia": [
     "m01",
     "m02",
     "m03",
     "m04",
     "m05",
     "m06",
     "m07",
     "m08",
     "m09",
     "m10",
     "m11",
     "m12",
     "m13",
     "m14",
     "m15",
     "mm-quien",
     "mm-versiculos",
     "mm-plan"
    ]
   },
   {
    "id": "dm2",
    "nombre": "Aventureros",
    "edad": "7 a 9 años",
    "n": 15,
    "techo": 2,
    "sinCompletar": true,
    "alcance": "Héroes y villanos · 1 al 30 de octubre",
    "estudia": [
     "m01",
     "m02",
     "m03",
     "m04",
     "m05",
     "m06",
     "m07",
     "m08",
     "m09",
     "m10",
     "m11",
     "m12",
     "m13",
     "m14",
     "m15",
     "m16",
     "m17",
     "m18",
     "m19",
     "m20",
     "m21",
     "m22",
     "m23",
     "m24",
     "m25",
     "m26",
     "m27",
     "m28",
     "m29",
     "m30",
     "m31",
     "mm-quien",
     "mm-versiculos",
     "mm-plan"
    ],
    "soloEstudio": [
     "m31"
    ]
   }
  ]
 },
 {
  "id": "ec",
  "tema": "creencias",
  "nombre": "En esto creemos",
  "icono": "✝️",
  "cuando": "10 de octubre",
  "fecha": "2026-10-10",
  "que": "Las 28 creencias",
  "categorias": [
   {
    "id": "ec1",
    "nombre": "Los dos del examen escrito",
    "edad": "Adultos",
    "n": 25,
    "techo": 3,
    "sinCompletar": false,
    "alcance": "Las 28 creencias",
    "estudia": [
     "cr01",
     "cr02",
     "cr03",
     "cr04",
     "cr05",
     "cr06",
     "cr07",
     "cr08",
     "cr09",
     "cr10",
     "cr11",
     "cr12",
     "cr13",
     "cr14",
     "cr15",
     "cr16",
     "cr17",
     "cr18",
     "cr19",
     "cr20",
     "cr21",
     "cr22",
     "cr23",
     "cr24",
     "cr25",
     "cr26",
     "cr27",
     "cr28",
     "mc-doctrinas",
     "mc-lista"
    ]
   },
   {
    "id": "ec2",
    "nombre": "El resto del club",
    "edad": "Cuestionario",
    "n": 15,
    "techo": 2,
    "sinCompletar": true,
    "alcance": "Las 28 creencias",
    "estudia": [
     "cr01",
     "cr02",
     "cr03",
     "cr04",
     "cr05",
     "cr06",
     "cr07",
     "cr08",
     "cr09",
     "cr10",
     "cr11",
     "cr12",
     "cr13",
     "cr14",
     "cr15",
     "cr16",
     "cr17",
     "cr18",
     "cr19",
     "cr20",
     "cr21",
     "cr22",
     "cr23",
     "cr24",
     "cr25",
     "cr26",
     "cr27",
     "cr28",
     "mc-doctrinas",
     "mc-lista"
    ]
   }
  ]
 },
 {
  "id": "ap",
  "tema": "apocalipsis",
  "nombre": "Conexión Bíblica: Apocalipsis",
  "icono": "📖",
  "cuando": "Fecha por confirmar",
  "fecha": "",
  "que": "El libro de Apocalipsis completo, en RV1995",
  "categorias": [
   {
    "id": "apme",
    "nombre": "Menores",
    "edad": "4 a 6 años",
    "n": 10,
    "techo": 1,
    "sinCompletar": true,
    "segundos": 100,
    "club": "aventureros",
    "alcance": "Apocalipsis",
    "estudia": [
     "ap1",
     "ap2",
     "ap3",
     "ap4",
     "ap5",
     "ap6",
     "ap7",
     "ap8",
     "ap9",
     "ap10",
     "ap11",
     "ap12",
     "ap13",
     "ap14",
     "ap15",
     "ap16",
     "ap17",
     "ap18",
     "ap19",
     "ap20",
     "ap21",
     "ap22"
    ]
   },
   {
    "id": "apav",
    "nombre": "Aventureros",
    "edad": "7 a 9 años",
    "n": 30,
    "techo": 3,
    "sinCompletar": true,
    "sinVF": true,
    "segundos": 80,
    "tarjetas": 15,
    "club": "aventureros",
    "alcance": "Apocalipsis",
    "estudia": [
     "ap1",
     "ap2",
     "ap3",
     "ap4",
     "ap5",
     "ap6",
     "ap7",
     "ap8",
     "ap9",
     "ap10",
     "ap11",
     "ap12",
     "ap13",
     "ap14",
     "ap15",
     "ap16",
     "ap17",
     "ap18",
     "ap19",
     "ap20",
     "ap21",
     "ap22"
    ]
   },
   {
    "id": "appa",
    "nombre": "Padres y consejeros",
    "edad": "Adultos",
    "n": 35,
    "techo": 3,
    "sinCompletar": true,
    "sinRampa": true,
    "tarjetas": 25,
    "club": "aventureros",
    "alcance": "Apocalipsis",
    "estudia": [
     "ap1",
     "ap2",
     "ap3",
     "ap4",
     "ap5",
     "ap6",
     "ap7",
     "ap8",
     "ap9",
     "ap10",
     "ap11",
     "ap12",
     "ap13",
     "ap14",
     "ap15",
     "ap16",
     "ap17",
     "ap18",
     "ap19",
     "ap20",
     "ap21",
     "ap22"
    ]
   },
   {
    "id": "apcq",
    "nombre": "Conquistadores",
    "edad": "10 a 15 años",
    "n": 30,
    "techo": 2,
    "sinCompletar": true,
    "segundos": 80,
    "tarjetas": 20,
    "club": "conquistadores",
    "alcance": "Apocalipsis",
    "estudia": [
     "ap1",
     "ap2",
     "ap3",
     "ap4",
     "ap5",
     "ap6",
     "ap7",
     "ap8",
     "ap9",
     "ap10",
     "ap11",
     "ap12",
     "ap13",
     "ap14",
     "ap15",
     "ap16",
     "ap17",
     "ap18",
     "ap19",
     "ap20",
     "ap21",
     "ap22"
    ]
   },
   {
    "id": "apgm",
    "nombre": "Guías Mayores",
    "edad": "Desde 16 años",
    "n": 35,
    "techo": 3,
    "sinCompletar": false,
    "sinRampa": true,
    "tarjetas": 25,
    "club": "guias",
    "alcance": "Apocalipsis",
    "estudia": [
     "ap1",
     "ap2",
     "ap3",
     "ap4",
     "ap5",
     "ap6",
     "ap7",
     "ap8",
     "ap9",
     "ap10",
     "ap11",
     "ap12",
     "ap13",
     "ap14",
     "ap15",
     "ap16",
     "ap17",
     "ap18",
     "ap19",
     "ap20",
     "ap21",
     "ap22"
    ]
   }
  ]
 }
];

export const IDS_DE_TEMA = {
 "daniel": [
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "d10",
  "d11",
  "d12",
  "pr39",
  "pr40",
  "pr41",
  "pr42",
  "pr43",
  "pr44",
  "m-linea",
  "m-personajes",
  "m-numeros",
  "m-trampas",
  "m-versiculos",
  "m-reyes",
  "m-profetico",
  "m-lugares",
  "m-version",
  "m-prioridades",
  "m-palabras"
 ],
 "matutina": [
  "m01",
  "m02",
  "m03",
  "m04",
  "m05",
  "m06",
  "m07",
  "m08",
  "m09",
  "m10",
  "m11",
  "m12",
  "m13",
  "m14",
  "m15",
  "m16",
  "m17",
  "m18",
  "m19",
  "m20",
  "m21",
  "m22",
  "m23",
  "m24",
  "m25",
  "m26",
  "m27",
  "m28",
  "m29",
  "m30",
  "m31",
  "mm-quien",
  "mm-versiculos",
  "mm-plan"
 ],
 "creencias": [
  "cr01",
  "cr02",
  "cr03",
  "cr04",
  "cr05",
  "cr06",
  "cr07",
  "cr08",
  "cr09",
  "cr10",
  "cr11",
  "cr12",
  "cr13",
  "cr14",
  "cr15",
  "cr16",
  "cr17",
  "cr18",
  "cr19",
  "cr20",
  "cr21",
  "cr22",
  "cr23",
  "cr24",
  "cr25",
  "cr26",
  "cr27",
  "cr28",
  "mc-doctrinas",
  "mc-lista"
 ],
 "apocalipsis": [
  "ap1",
  "ap2",
  "ap3",
  "ap4",
  "ap5",
  "ap6",
  "ap7",
  "ap8",
  "ap9",
  "ap10",
  "ap11",
  "ap12",
  "ap13",
  "ap14",
  "ap15",
  "ap16",
  "ap17",
  "ap18",
  "ap19",
  "ap20",
  "ap21",
  "ap22"
 ]
};

export const CATALOGO = {
 "daniel": {
  "caps": [
   {
    "id": "d1",
    "label": "Daniel 1",
    "sub": "Cautivos en Babilonia",
    "grupo": "Biblia",
    "n": [
     49,
     26,
     14
    ]
   },
   {
    "id": "d2",
    "label": "Daniel 2",
    "sub": "El sueño de la gran imagen",
    "grupo": "Biblia",
    "n": [
     50,
     50,
     9
    ]
   },
   {
    "id": "d3",
    "label": "Daniel 3",
    "sub": "La imagen de oro y el horno",
    "grupo": "Biblia",
    "n": [
     42,
     39,
     13
    ]
   },
   {
    "id": "d4",
    "label": "Daniel 4",
    "sub": "Nabucodonosor humillado",
    "grupo": "Biblia",
    "n": [
     24,
     31,
     13
    ]
   },
   {
    "id": "d5",
    "label": "Daniel 5",
    "sub": "La escritura en la pared",
    "grupo": "Biblia",
    "n": [
     25,
     24,
     8
    ]
   },
   {
    "id": "d6",
    "label": "Daniel 6",
    "sub": "En el foso de los leones",
    "grupo": "Biblia",
    "n": [
     38,
     39,
     20
    ]
   },
   {
    "id": "d7",
    "label": "Daniel 7",
    "sub": "Las cuatro bestias y el juicio",
    "grupo": "Biblia",
    "n": [
     35,
     15,
     20
    ]
   },
   {
    "id": "d8",
    "label": "Daniel 8",
    "sub": "El carnero, el macho cabrío y las 2.300 tardes",
    "grupo": "Biblia",
    "n": [
     31,
     15,
     22
    ]
   },
   {
    "id": "d9",
    "label": "Daniel 9",
    "sub": "Las setenta semanas y el Mesías",
    "grupo": "Biblia",
    "n": [
     33,
     14,
     20
    ]
   },
   {
    "id": "d10",
    "label": "Daniel 10",
    "sub": "La visión junto al Tigris",
    "grupo": "Biblia",
    "n": [
     24,
     15,
     17
    ]
   },
   {
    "id": "d11",
    "label": "Daniel 11",
    "sub": "Los reyes del norte y del sur",
    "grupo": "Biblia",
    "n": [
     41,
     24,
     30
    ]
   },
   {
    "id": "d12",
    "label": "Daniel 12",
    "sub": "El tiempo del fin",
    "grupo": "Biblia",
    "n": [
     29,
     20,
     9
    ]
   },
   {
    "id": "pr39",
    "label": "P&R 39",
    "sub": "En la corte de Babilonia",
    "grupo": "Elena de White",
    "n": [
     2,
     29,
     8
    ]
   },
   {
    "id": "pr40",
    "label": "P&R 40",
    "sub": "El sueño de Nabucodonosor",
    "grupo": "Elena de White",
    "n": [
     2,
     20,
     8
    ]
   },
   {
    "id": "pr41",
    "label": "P&R 41",
    "sub": "El horno de fuego",
    "grupo": "Elena de White",
    "n": [
     1,
     25,
     12
    ]
   },
   {
    "id": "pr42",
    "label": "P&R 42",
    "sub": "La verdadera grandeza",
    "grupo": "Elena de White",
    "n": [
     2,
     24,
     9
    ]
   },
   {
    "id": "pr43",
    "label": "P&R 43",
    "sub": "El vigía invisible",
    "grupo": "Elena de White",
    "n": [
     2,
     22,
     10
    ]
   },
   {
    "id": "pr44",
    "label": "P&R 44",
    "sub": "En el foso de los leones",
    "grupo": "Elena de White",
    "n": [
     1,
     28,
     8
    ]
   }
  ],
  "repasos": [
   {
    "id": "m-linea",
    "label": "Línea de tiempo"
   },
   {
    "id": "m-personajes",
    "label": "Personajes"
   },
   {
    "id": "m-numeros",
    "label": "Números"
   },
   {
    "id": "m-trampas",
    "label": "Trampas"
   },
   {
    "id": "m-versiculos",
    "label": "Versículos"
   },
   {
    "id": "m-reyes",
    "label": "Los reyes"
   },
   {
    "id": "m-profetico",
    "label": "Paralelos"
   },
   {
    "id": "m-lugares",
    "label": "Lugares"
   },
   {
    "id": "m-version",
    "label": "RV1995 vs RV1960"
   },
   {
    "id": "m-prioridades",
    "label": "Lo que más preguntan"
   },
   {
    "id": "m-palabras",
    "label": "Palabras difíciles"
   }
  ]
 },
 "matutina": {
  "caps": [
   {
    "id": "m01",
    "label": "1.º de octubre",
    "sub": "El villano pirata Dienterroto",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m02",
    "label": "2 de octubre",
    "sub": "El héroe sabe que Dios lo levanta",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m03",
    "label": "3 de octubre",
    "sub": "El héroe que dio 5 kinas",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m04",
    "label": "4 de octubre",
    "sub": "El héroe que ayudaba a jóvenes estudiantes",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m05",
    "label": "5 de octubre",
    "sub": "Estás invitado a la boda",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m06",
    "label": "6 de octubre",
    "sub": "Nunca estás solo",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m07",
    "label": "7 de octubre",
    "sub": "Una joven heroína alienta a los tripulantes",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m08",
    "label": "8 de octubre",
    "sub": "El poder del héroe",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     5,
     1
    ]
   },
   {
    "id": "m09",
    "label": "9 de octubre",
    "sub": "El héroe narrador de historias",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     5,
     1
    ]
   },
   {
    "id": "m10",
    "label": "10 de octubre",
    "sub": "El héroe se enamora — 1.ª parte",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m11",
    "label": "11 de octubre",
    "sub": "El héroe se enamora — 2.ª parte",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m12",
    "label": "12 de octubre",
    "sub": "La pequeña gran mujer",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     5,
     1
    ]
   },
   {
    "id": "m13",
    "label": "13 de octubre",
    "sub": "Mujer virtuosa",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m14",
    "label": "14 de octubre",
    "sub": "No me arrepiento",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m15",
    "label": "15 de octubre",
    "sub": "Testigos de Jesús",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m16",
    "label": "16 de octubre",
    "sub": "Héroes anónimos",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m17",
    "label": "17 de octubre",
    "sub": "El amigo villano",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m18",
    "label": "18 de octubre",
    "sub": "¿Héroes o no?",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m19",
    "label": "19 de octubre",
    "sub": "Di siempre dónde estás",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m20",
    "label": "20 de octubre",
    "sub": "El villano del baloncesto",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m21",
    "label": "21 de octubre",
    "sub": "Tus maestros son héroes",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m22",
    "label": "22 de octubre",
    "sub": "Jesús: el Maestro de los maestros",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m23",
    "label": "23 de octubre",
    "sub": "Héroes de ayer y de hoy",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m24",
    "label": "24 de octubre",
    "sub": "El villano que maltrató a un animal",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m25",
    "label": "25 de octubre",
    "sub": "Fernando, el niño enojado",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m26",
    "label": "26 de octubre",
    "sub": "La heroína que ayudó a un niño con sus palabras",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m27",
    "label": "27 de octubre",
    "sub": "El niño que se quedó sentado en el banquillo",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     3,
     1
    ]
   },
   {
    "id": "m28",
    "label": "28 de octubre",
    "sub": "Un héroe diferente",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m29",
    "label": "29 de octubre",
    "sub": "Dios provee",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     4,
     1
    ]
   },
   {
    "id": "m30",
    "label": "30 de octubre",
    "sub": "Nabal, el villano necio",
    "grupo": "Matutina Héroes y villanos",
    "n": [
     4,
     5,
     1
    ]
   },
   {
    "id": "m31",
    "label": "31 de octubre",
    "sub": "La sabia Abigail",
    "grupo": "Matutina · complemento del día 30",
    "n": [
     4,
     4,
     1
    ]
   }
  ],
  "repasos": [
   {
    "id": "mm-quien",
    "label": "Héroes y villanos"
   },
   {
    "id": "mm-versiculos",
    "label": "Versículos de octubre"
   },
   {
    "id": "mm-plan",
    "label": "Cómo estudiar la matutina"
   }
  ]
 },
 "creencias": {
  "caps": [
   {
    "id": "cr01",
    "label": "Creencia 1",
    "sub": "La Palabra de Dios",
    "grupo": "En esto creemos",
    "n": [
     11,
     15,
     2
    ]
   },
   {
    "id": "cr02",
    "label": "Creencia 2",
    "sub": "La Deidad",
    "grupo": "En esto creemos",
    "n": [
     3,
     5,
     2
    ]
   },
   {
    "id": "cr03",
    "label": "Creencia 3",
    "sub": "Dios el Padre",
    "grupo": "En esto creemos",
    "n": [
     2,
     6,
     2
    ]
   },
   {
    "id": "cr04",
    "label": "Creencia 4",
    "sub": "Dios el Hijo",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     3
    ]
   },
   {
    "id": "cr05",
    "label": "Creencia 5",
    "sub": "Dios el Espíritu Santo",
    "grupo": "En esto creemos",
    "n": [
     2,
     6,
     2
    ]
   },
   {
    "id": "cr06",
    "label": "Creencia 6",
    "sub": "La creación",
    "grupo": "En esto creemos",
    "n": [
     6,
     10,
     2
    ]
   },
   {
    "id": "cr07",
    "label": "Creencia 7",
    "sub": "La naturaleza humana",
    "grupo": "En esto creemos",
    "n": [
     3,
     5,
     2
    ]
   },
   {
    "id": "cr08",
    "label": "Creencia 8",
    "sub": "El gran conflicto",
    "grupo": "En esto creemos",
    "n": [
     5,
     10,
     2
    ]
   },
   {
    "id": "cr09",
    "label": "Creencia 9",
    "sub": "La vida, muerte y resurrección de Cristo",
    "grupo": "En esto creemos",
    "n": [
     2,
     6,
     2
    ]
   },
   {
    "id": "cr10",
    "label": "Creencia 10",
    "sub": "La experiencia de la salvación",
    "grupo": "En esto creemos",
    "n": [
     3,
     5,
     3
    ]
   },
   {
    "id": "cr11",
    "label": "Creencia 11",
    "sub": "Crecer en Cristo",
    "grupo": "En esto creemos",
    "n": [
     6,
     9,
     2
    ]
   },
   {
    "id": "cr12",
    "label": "Creencia 12",
    "sub": "La iglesia",
    "grupo": "En esto creemos",
    "n": [
     3,
     5,
     2
    ]
   },
   {
    "id": "cr13",
    "label": "Creencia 13",
    "sub": "El remanente y su misión",
    "grupo": "En esto creemos",
    "n": [
     3,
     6,
     2
    ]
   },
   {
    "id": "cr14",
    "label": "Creencia 14",
    "sub": "La unidad en el cuerpo de Cristo",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   },
   {
    "id": "cr15",
    "label": "Creencia 15",
    "sub": "El bautismo",
    "grupo": "En esto creemos",
    "n": [
     3,
     6,
     2
    ]
   },
   {
    "id": "cr16",
    "label": "Creencia 16",
    "sub": "La Cena del Señor",
    "grupo": "En esto creemos",
    "n": [
     2,
     6,
     2
    ]
   },
   {
    "id": "cr17",
    "label": "Creencia 17",
    "sub": "Los dones y ministerios espirituales",
    "grupo": "En esto creemos",
    "n": [
     3,
     5,
     2
    ]
   },
   {
    "id": "cr18",
    "label": "Creencia 18",
    "sub": "El don de profecía",
    "grupo": "En esto creemos",
    "n": [
     2,
     6,
     2
    ]
   },
   {
    "id": "cr19",
    "label": "Creencia 19",
    "sub": "La ley de Dios",
    "grupo": "En esto creemos",
    "n": [
     4,
     10,
     2
    ]
   },
   {
    "id": "cr20",
    "label": "Creencia 20",
    "sub": "El sábado",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   },
   {
    "id": "cr21",
    "label": "Creencia 21",
    "sub": "La mayordomía",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   },
   {
    "id": "cr22",
    "label": "Creencia 22",
    "sub": "La conducta cristiana",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   },
   {
    "id": "cr23",
    "label": "Creencia 23",
    "sub": "El matrimonio y la familia",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   },
   {
    "id": "cr24",
    "label": "Creencia 24",
    "sub": "El ministerio de Cristo en el Santuario celestial",
    "grupo": "En esto creemos",
    "n": [
     5,
     10,
     2
    ]
   },
   {
    "id": "cr25",
    "label": "Creencia 25",
    "sub": "La segunda venida de Cristo",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   },
   {
    "id": "cr26",
    "label": "Creencia 26",
    "sub": "La muerte y la resurrección",
    "grupo": "En esto creemos",
    "n": [
     3,
     5,
     2
    ]
   },
   {
    "id": "cr27",
    "label": "Creencia 27",
    "sub": "El milenio y el fin del pecado",
    "grupo": "En esto creemos",
    "n": [
     2,
     6,
     2
    ]
   },
   {
    "id": "cr28",
    "label": "Creencia 28",
    "sub": "La Tierra Nueva",
    "grupo": "En esto creemos",
    "n": [
     2,
     5,
     2
    ]
   }
  ],
  "repasos": [
   {
    "id": "mc-doctrinas",
    "label": "Las 6 doctrinas"
   },
   {
    "id": "mc-lista",
    "label": "Las 28 de corrido"
   }
  ]
 },
 "apocalipsis": {
  "caps": [
   {
    "id": "ap1",
    "label": "Apocalipsis 1",
    "sub": "Cristo entre los candelabros",
    "grupo": "Biblia",
    "n": [
     35,
     23,
     4
    ]
   },
   {
    "id": "ap2",
    "label": "Apocalipsis 2",
    "sub": "Cartas a Éfeso, Esmirna, Pérgamo y Tiatira",
    "grupo": "Biblia",
    "n": [
     39,
     22,
     5
    ]
   },
   {
    "id": "ap3",
    "label": "Apocalipsis 3",
    "sub": "Cartas a Sardis, Filadelfia y Laodicea",
    "grupo": "Biblia",
    "n": [
     36,
     21,
     4
    ]
   },
   {
    "id": "ap4",
    "label": "Apocalipsis 4",
    "sub": "El trono en el cielo",
    "grupo": "Biblia",
    "n": [
     25,
     16,
     3
    ]
   },
   {
    "id": "ap5",
    "label": "Apocalipsis 5",
    "sub": "El libro sellado y el Cordero",
    "grupo": "Biblia",
    "n": [
     29,
     16,
     3
    ]
   },
   {
    "id": "ap6",
    "label": "Apocalipsis 6",
    "sub": "Los seis primeros sellos",
    "grupo": "Biblia",
    "n": [
     34,
     18,
     3
    ]
   },
   {
    "id": "ap7",
    "label": "Apocalipsis 7",
    "sub": "Los 144.000 y la gran multitud",
    "grupo": "Biblia",
    "n": [
     40,
     16,
     4
    ]
   },
   {
    "id": "ap8",
    "label": "Apocalipsis 8",
    "sub": "El séptimo sello y las primeras trompetas",
    "grupo": "Biblia",
    "n": [
     32,
     11,
     4
    ]
   },
   {
    "id": "ap9",
    "label": "Apocalipsis 9",
    "sub": "La quinta y la sexta trompetas",
    "grupo": "Biblia",
    "n": [
     41,
     15,
     5
    ]
   },
   {
    "id": "ap10",
    "label": "Apocalipsis 10",
    "sub": "El ángel con el librito",
    "grupo": "Biblia",
    "n": [
     30,
     11,
     3
    ]
   },
   {
    "id": "ap11",
    "label": "Apocalipsis 11",
    "sub": "Los dos testigos y la séptima trompeta",
    "grupo": "Biblia",
    "n": [
     40,
     15,
     4
    ]
   },
   {
    "id": "ap12",
    "label": "Apocalipsis 12",
    "sub": "La mujer, el dragón y el niño",
    "grupo": "Biblia",
    "n": [
     34,
     19,
     4
    ]
   },
   {
    "id": "ap13",
    "label": "Apocalipsis 13",
    "sub": "Las dos bestias, la marca y el número",
    "grupo": "Biblia",
    "n": [
     30,
     25,
     4
    ]
   },
   {
    "id": "ap14",
    "label": "Apocalipsis 14",
    "sub": "Los 144.000 y los tres ángeles",
    "grupo": "Biblia",
    "n": [
     36,
     27,
     5
    ]
   },
   {
    "id": "ap15",
    "label": "Apocalipsis 15",
    "sub": "El cántico de Moisés y del Cordero",
    "grupo": "Biblia",
    "n": [
     20,
     16,
     3
    ]
   },
   {
    "id": "ap16",
    "label": "Apocalipsis 16",
    "sub": "Las siete copas y Armagedón",
    "grupo": "Biblia",
    "n": [
     34,
     29,
     4
    ]
   },
   {
    "id": "ap17",
    "label": "Apocalipsis 17",
    "sub": "La mujer sobre la bestia escarlata",
    "grupo": "Biblia",
    "n": [
     31,
     31,
     4
    ]
   },
   {
    "id": "ap18",
    "label": "Apocalipsis 18",
    "sub": "La caída de Babilonia",
    "grupo": "Biblia",
    "n": [
     28,
     31,
     4
    ]
   },
   {
    "id": "ap19",
    "label": "Apocalipsis 19",
    "sub": "Las bodas del Cordero y el jinete fiel",
    "grupo": "Biblia",
    "n": [
     29,
     32,
     4
    ]
   },
   {
    "id": "ap20",
    "label": "Apocalipsis 20",
    "sub": "Los mil años y el gran trono blanco",
    "grupo": "Biblia",
    "n": [
     28,
     21,
     3
    ]
   },
   {
    "id": "ap21",
    "label": "Apocalipsis 21",
    "sub": "Cielo nuevo, tierra nueva y la Nueva Jerusalén",
    "grupo": "Biblia",
    "n": [
     39,
     23,
     4
    ]
   },
   {
    "id": "ap22",
    "label": "Apocalipsis 22",
    "sub": "El río y el árbol de la vida",
    "grupo": "Biblia",
    "n": [
     26,
     26,
     3
    ]
   }
  ],
  "repasos": []
 }
};

export { REGLAS };
