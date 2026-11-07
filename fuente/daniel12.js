/* Daniel 12 en Cine (motor: cine-app.js). Mismo método que Daniel 9 y los 1.260 años:
   la Biblia de la app (RV1995), Elena G. de White en español (El conflicto de los
   siglos, paginación entre corchetes de la biblioteca de Camilo) y después Bohr y
   Treiyer, con las lecturas de complementos/daniel/d12.js. En los 1.335 días Bohr es la
   lectura principal (508-1843) y Treiyer la segunda (22 de octubre de 1844); Camilo,
   7-nov. `explica` solo explica cómo Elena de White aplica el texto; la historia y las
   lecturas van en `nota` con su fuente. */
const CS = 'Elena G. de White, <i>El conflicto de los siglos</i>';
const C = { papal: '#A0694A', juicio: '#B45309', venida: '#6B7B5A', reino: '#0E7490' };
const empieza = 'Empieza «en aquel tiempo»: al final de Daniel 11 (12:1)';
module.exports = { tipo: 'cine', libro: 'Daniel 12', titulo: 'El tiempo del fin', dir: 'd12/',
  miniF: 'libro', portada: 'libro',
  invita: 'Ocho escenas: Miguel se levanta, los que despiertan, los que brillan como estrellas, el libro que se abre en 1798, el juramento junto al río, los purificados, los 1.290 y los 1.335 días, y la heredad de Daniel.',
  actos: [
  { id: 'miguel', corto: 'Miguel se levanta', tipo: 'luz', alto: 4.2, imgs: ['d11/miguel', 'libro'], foco2: '55% center',
    cartel: 'En aquel tiempo', rot: 'Daniel 12:1 · el final de Daniel 11', v: { cap: 'd12', de: 1 }, clave: ['Miguel', 'libertado', 'libro'] },
  { id: 'despertar', corto: 'Despertarán', tipo: 'luz', alto: 4, imgs: ['resurreccion', 'estrellas'], foco2: '50% center',
    rot: 'Daniel 12:2 · la resurrección', v: { cap: 'd12', de: 2 }, clave: ['despertados', 'vida', 'eterna'] },
  { id: 'entendidos', corto: 'Como las estrellas', tipo: 'luz', alto: 4, imgs: ['estrellas', 'purificados'], foco2: '50% center',
    rot: 'Daniel 12:3 · los entendidos', v: { cap: 'd12', de: 3 }, clave: ['entendidos', 'resplandecerán', 'estrellas'] },
  { id: 'sellado', corto: 'El libro se abre', tipo: 'sello', alto: 3.4, img: 'p1260/libro', fecha: '1798', era: 'se abre', rot: 'Daniel 12:4 · sellado hasta el tiempo del fin',
    v: { cap: 'd12', de: 4 }, clave: ['sella', 'tiempo', 'fin', 'ciencia'],
    egw: [{ t: 'Pero desde 1798 el libro de Daniel ha sido desellado, la ciencia de las profecías ha aumentado y muchos han proclamado el solemne mensaje del juicio cercano.', fuente: CS + ', p. 405' }],
    explica: 'Elena de White pone en 1798 el comienzo del tiempo del fin: desde entonces el libro de Daniel se entiende y crece el conocimiento de sus profecías.' },
  { id: 'juramento', corto: 'El juramento', tipo: 'sello', alto: 3.4, img: 'p1260/rio', fecha: '1.260', era: 'años', rot: 'Daniel 12:7 · el varón sobre las aguas',
    v: { cap: 'd12', de: 7, frase: 'juró por el que vive por los siglos, que será por tiempo, tiempos y la mitad de un tiempo' }, clave: ['juró', 'tiempo,', 'tiempos', 'mitad'],
    egw: [{ t: 'Los 1260 años del dominio temporal del papa comenzaron en el año 538 de J. C. y debían terminar en 1798.', fuente: CS + ', p. 309' }],
    explica: 'Elena de White da el plazo del juramento: los 1.260 años, de 538 a 1798.' },
  { id: 'purificados', corto: 'Purificados', tipo: 'luz', alto: 4, imgs: ['purificados', 'millerita'], foco2: '50% center',
    rot: 'Daniel 12:10 · dos grupos', v: { cap: 'd12', de: 10 }, clave: ['limpios', 'emblanquecidos', 'purificados', 'entendidos'] },
  { id: 'periodos', corto: '1.290 y 1.335', tipo: 'via', alto: 6, inicio: '508 d.C.',
    estaciones: [
     { n: 1, fecha: '1798', img: 'p1260/roma1798', rot: '1.290 días', v: { cap: 'd12', de: 11 },
       nota: 'Desde 508, cuando Clodoveo I, rey de los francos, puso el poder civil al servicio del papado, hasta 1798. Son treinta más que los 1.260 años, y terminan juntos.',
       fuente: 'Bohr, <i>Daniel 11</i>, p. 26; Treiyer, <i>Enigmas descifrados</i>, p. 220-222' },
     { n: 2, fecha: '1843', img: 'millerita', rot: '1.335 días · la lectura principal', v: { cap: 'd12', de: 12 },
       nota: '508 más 1.335 llega a 1843: el movimiento millerita anuncia el juicio. Los 2.300 días marcan algo en el cielo, el comienzo del juicio; los 1.335, algo en la tierra: el pueblo que Dios levantó para anunciarlo.',
       fuente: 'Bohr, <i>Daniel 1-10</i>, p. 5; Bohr, <i>Daniel 11</i>, p. 26 y 217' },
     { n: 3, fecha: '22 oct. 1844', img: 'd8/purificado', rot: '1.335 días · otra lectura', v: { cap: 'd8', de: 14 },
       nota: 'Con el año judío que empieza en otoño, los 1.335 llegan al 22 de octubre de 1844, junto con los 2.300. Donde las dos lecturas coinciden: el cumplimiento está en el despertar adventista de 1843 y 1844, que anunció el juicio que empezó en 1844, y no queda un período futuro por contar.',
       fuente: 'Treiyer, <i>Enigmas descifrados</i>, p. 220-225 y 231-233; Bohr, <i>Daniel 11</i>, p. 217-218' }
    ] },
  { id: 'heredad', corto: 'Su heredad', tipo: 'luz', alto: 4, imgs: ['heredad', 'd11/miguel'], foco2: '55% center',
    rot: 'Daniel 12:13 · la promesa a Daniel', v: { cap: 'd12', de: 13 }, clave: ['reposarás', 'levantarás', 'heredad'] }
  ],
  /* Comparar: Daniel 12 como columna. Las lecturas son las de «Daniel 8, 11 y 12 lado a lado»
     (complementos/profundizar.js). `acto` lleva de la comparación a su escena del cine. */
  partes: [
    { id: 'juramento', img: 'p1260/rio', nombre: 'Tiempo, tiempos y la mitad de un tiempo', reino: 'Roma papal', fechas: '538 – 1798 d.C.', de: 538, a: 1798, c: C.papal,
      texto: 'que será por tiempo, tiempos y la mitad de un tiempo', ref: '12:7', acto: 'juramento',
      corto: 'Los 1.260 años, de 538 a 1798. Los 1.290 días (12:11) van de 508 a 1798.' },
    { id: 'bienaventurado', img: 'millerita', nombre: 'Bienaventurado el que espere', reino: 'El juicio en el cielo', fechas: 'desde 1844', era: 1844, de: 1844, a: 2026, c: C.juicio,
      texto: 'Bienaventurado el que espere, y llegue a mil trescientos treinta y cinco días', ref: '12:12', acto: 'periodos',
      corto: 'Los 1.335 días llegan a 1843, al anuncio del juicio; otra lectura los cierra el 22 de octubre de 1844, con los 2.300. El juicio termina cuando «se levantará Miguel» (12:1).' },
    { id: 'libertado', img: 'd11/miguel', nombre: 'Se levanta Miguel', reino: 'La segunda venida', fechas: '', de: null, fin: 'venida', c: C.venida,
      texto: 'en aquel tiempo será libertado tu pueblo, todos los que se hallen inscritos en el libro', ref: '12:1', acto: 'miguel',
      corto: 'Tiempo de angustia; el pueblo de Dios es librado y hay resurrección (12:1-2).' },
    { id: 'heredad', img: 'heredad', nombre: 'Las estrellas y la heredad', reino: 'El reino eterno', fechas: '', de: null, fin: 'reino', c: C.reino,
      texto: 'como las estrellas, a perpetua eternidad', ref: '12:3', acto: 'heredad',
      corto: 'Los entendidos resplandecen para siempre, y Daniel se levanta para recibir su heredad (12:13).' }
  ],
  noTrae: { '-605': empieza, '-539': empieza, '-331': empieza, '-168': empieza, '476': empieza, 'fin-sanada': 'Lo cuenta Daniel 11:40-45; Daniel 12 empieza cuando se levanta Miguel' },
  paraleloFuente: 'Bohr, <i>Daniel 11</i>, p. 15-26 y 98-99; Bohr, <i>Daniel 1-10</i>, p. 5 y 357; Treiyer, <i>Enigmas descifrados</i>, p. 220-233'
};
