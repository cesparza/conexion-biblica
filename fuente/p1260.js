/* Los 1.260 años en Cine (motor: cine-app.js). Artículo aparte, enlazado desde
   Daniel 7 y 12 y Apocalipsis 11, 12 y 13 (`en`). Orden del método: la Biblia de
   la app (RV1995; Números, Ezequiel y Mateo en RV1909), Elena G. de White
   (El conflicto de los siglos y El Deseado de todas las gentes, paginación entre
   corchetes de la biblioteca de Camilo) y después Bohr y Treiyer. `explica` solo
   explica cómo Elena de White aplica el texto; la historia va en `nota` con su fuente. */
const CS = 'Elena G. de White, <i>El conflicto de los siglos</i>';
const DTG = 'Elena G. de White, <i>El Deseado de todas las gentes</i>, cap. 23';
module.exports = { tipo: 'cine', libro: 'Los 1.260 años', titulo: 'Tiempo, tiempos y medio tiempo', dir: 'p1260/',
  miniF: 'rio', portada: 'rio',
  en: ['d7', 'd12', 'ap11', 'ap12', 'ap13'],
  /* Donde la app nombra el período, la frase abre este artículo (artTocables en app.js). */
  toca: ['1.260 años', '1260 años', '1.260 días', '1260 días', 'mil doscientos sesenta días', 'mil doscientos sesenta años',
    'tiempo, tiempos y medio tiempo', 'tiempo, tiempos y la mitad de un tiempo', 'un tiempo, y dos tiempos, y la mitad de un tiempo', 'cuarenta y dos meses', '42 meses'],
  invita: 'Siete escenas: la pregunta junto al río, los 1.260 días contados uno por uno, los tres nombres que la Biblia le da al mismo período, un día por un año, 538, los días acortados, 1798, el tiempo del fin y los 1.290 días.',
  actos: [
  { id: 'rio', corto: 'Junto al río', tipo: 'luz', alto: 4.2, imgs: ['rio', 'cuerno'], foco2: '60% center',
    cartel: '¿Hasta cuándo?', rot: 'Junto al río · Daniel 12:6-7',
    v: { cap: 'd12', de: 7 }, clave: ['juró', 'tiempo,', 'tiempos', 'mitad'] },
  { id: 'cuenta', corto: '1.260 días', tipo: 'cuenta', alto: 3.8, rot: 'Daniel 7:25 · el cuerno pequeño',
    de: '3½', a: 1260, cols: 60, tramos: [360, 720, 180], uniIni: 'tiempos', uniIni2: 'tiempo, tiempos y medio tiempo', uniFin: 'días proféticos',
    nombres: ['Un tiempo · 360 días', 'Tiempos · 720 días', 'Medio tiempo · 180 días'],
    v: { cap: 'd7', de: 25 },
    egw: [{ t: 'Los cuarenta y dos meses son lo mismo que «un tiempo, y dos tiempos, y la mitad de un tiempo», tres años y medio, o 1.260 días de Daniel 7, el tiempo durante el cual el poder papal debía oprimir al pueblo de Dios.', fuente: CS + ', p. 492' }] },
  { id: 'nombres', corto: 'Tres nombres', tipo: 'via', alto: 7, inicio: 'Un solo período',
    estaciones: [
     { n: 1, fecha: '3½ tiempos', img: 'cuerno', rot: 'Daniel 7:25 · el cuerno pequeño', v: { cap: 'd7', de: 25 } },
     { n: 2, fecha: '3½ tiempos', img: 'rio', rot: 'Daniel 12:7 · el juramento junto al río', v: { cap: 'd12', de: 7 } },
     { n: 3, fecha: '1.260 días', img: 'desierto', rot: 'Apocalipsis 12:6 · la mujer en el desierto', v: { cap: 'ap12', de: 6 } },
     { n: 4, fecha: '3½ tiempos', img: 'desierto', rot: 'Apocalipsis 12:14 · la misma mujer, el mismo desierto', v: { cap: 'ap12', de: 14 },
       nota: 'Apocalipsis 12 dice el mismo período de dos maneras: en el versículo 6 son 1.260 días, y en el 14, tiempo, tiempos y la mitad de un tiempo.', fuente: 'Apocalipsis 12:6, 14' },
     { n: 5, fecha: '42 meses', img: 'valdenses', rot: 'Apocalipsis 11:2 · la ciudad hollada', v: { cap: 'ap11', de: 2 } },
     { n: 6, fecha: '1.260 días', img: 'valdenses', rot: 'Apocalipsis 11:3 · los dos testigos', v: { cap: 'ap11', de: 3 },
       egw: [{ t: 'Los «cuarenta y dos meses» y los «mil doscientos sesenta días» designan el mismo plazo, o sea el tiempo durante el cual la iglesia de Cristo iba a sufrir bajo la opresión de Roma.', fuente: CS + ', p. 309' }] },
     { n: 7, fecha: '42 meses', img: 'roma538', rot: 'Apocalipsis 13:5 · la bestia', v: { cap: 'ap13', de: 5 } }
    ] },
  { id: 'dia', corto: 'Un día, un año', tipo: 'sello', alto: 3.4, img: 'libro', fecha: '1 día', era: '= 1 año', rot: 'La regla de la Biblia',
    v: { cap: 'numeros-14', de: 34 }, clave: ['año', 'día'],
    otros: [{ ref: 'Ezequiel 4:6', ver: 'RV1909', t: 'Y cumplidos estos, dormirás sobre tu lado derecho segunda vez, y llevarás la maldad de la casa de Judá cuarenta días: día por año, día por año te lo he dado.' }],
    egw: [{ t: 'En la profecía, un día representa un año.', fuente: DTG + ', p. 200' }],
    explica: 'Elena de White usa la misma regla de Números 14:34 y Ezequiel 4:6 para las profecías de tiempo: los 1.260 días proféticos son 1.260 años.' },
  { id: 'inicio', corto: '538', tipo: 'sello', alto: 3.4, img: 'roma538', fecha: '538', era: 'd.C.', rot: 'El comienzo',
    v: { cap: 'd7', de: 8, frase: 'otro cuerno pequeño salió entre ellos, y delante de él fueron arrancados tres cuernos de los primeros' },
    clave: ['cuerno', 'arrancados', 'tres'],
    egw: [{ t: 'El asiento de su poder quedó definitivamente fijado en la ciudad imperial, cuyo obispo fue proclamado cabeza de toda la iglesia. … Entonces empezaron a correr los 1260 años de la opresión papal predicha en las profecías de Daniel y en el Apocalipsis.', fuente: CS + ', p. 58' },
      { t: 'Los 1260 años del dominio temporal del papa comenzaron en el año 538 de J. C. y debían terminar en 1798.', fuente: CS + ', p. 309' }],
    explica: 'Elena de White pone el comienzo de los 1.260 años en 538, en el siglo sexto, cuando el obispo de Roma quedó como cabeza de toda la iglesia, y el final en 1798.' },
  { id: 'linea', corto: '538 a 1798', tipo: 'via', alto: 6, inicio: '538 d.C.',
    estaciones: [
     { n: 1, fecha: 'antes de 1798', img: 'valdenses', rot: 'Los días acortados',
       v: { cap: 'mateo-24', de: 22 },
       egw: [{ t: 'La persecución contra la iglesia no continuó durante todos los 1260 años. Dios, usando de misericordia con su pueblo, acortó el tiempo de tan horribles pruebas.', fuente: CS + ', p. 309' },
         { t: 'Debido a la influencia de los acontecimientos relacionados con la Reforma, las persecuciones cesaron antes del año 1798.', fuente: CS + ', pp. 309-310' }] },
     { n: 2, fecha: '1798', img: 'roma1798', rot: 'Termina el período',
       v: { cap: 'ap13', de: 3 },
       egw: [{ t: 'Este período, como fue indicado en capítulos anteriores, empezó con la supremacía del papado, en el año 538 de J. C., y terminó en 1798. Entonces, el papa fue hecho prisionero por el ejército francés, el poder papal recibió su golpe mortal', fuente: CS + ', p. 492' }],
       nota: 'El 10 de febrero de 1798 el general Louis-Alexandre Berthier ocupó Roma. El 20 de febrero Pío VI fue sacado de la ciudad, y murió prisionero en Valence el 29 de agosto de 1799.', fuente: '<i>The Catholic Encyclopedia</i> (1911), «Pope Pius VI»' },
     { n: 3, fecha: 'desde 1798', img: 'libro', rot: 'El tiempo del fin',
       v: { cap: 'd12', de: 4 },
       egw: [{ t: 'Pero desde 1798 el libro de Daniel ha sido desellado, la ciencia de las profecías ha aumentado y muchos han proclamado el solemne mensaje del juicio cercano.', fuente: CS + ', p. 405' }] }
    ] },
  { id: 'juntos', corto: '1.290 y 1.260', tipo: 'barra', alto: 3, cartel: 'Los 1.290 y los 1.260 terminan juntos', rot: 'Daniel 12:11',
    total: 1290, parte: 30, marcas: ['508', '538', '1798'],
    v: { cap: 'd12', de: 11 },
    nota: 'Los 1.290 años empiezan treinta años antes que los 1.260, en 508, cuando Clodoveo I, rey de los francos, comprometió el poder de Francia a la protección del papado. Los dos períodos terminan en 1798.',
    fuente: 'Bohr, <i>Daniel 1-10</i>, p. 361-364; Treiyer, <i>Enigmas descifrados</i>, p. 220-222' }
] };
