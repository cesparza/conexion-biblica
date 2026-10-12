/* Daniel 12: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: Miguel se levanta, tiempo de angustia,
   resurrección especial, los doctos, el libro sellado y Apocalipsis 10,
   1.260 años, y la cautela de Maxwell sobre 1.290 y 1.335. Aquí va lo que
   agrega Bohr: qué es «levantarse» y «ser libertado», qué parte del libro
   se selló, y su lectura de 1.290 (508-1798) y 1.335 (508-1843). */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd12',
  secciones: [
    { t: '🧭 «Se levantará Miguel» y «será libertado tu pueblo»', capa: 'contexto', h:
      `<p>Bohr explica dos palabras de 12:1:</p>` +
      li([
        '<b>«Se levantará»</b>: en Daniel, un rey «se levanta» cuando empieza a reinar (11:2-3; 8:22). Miguel se levanta cuando termina el juicio y recibe el reino. Elena de White: «todos los casos habían sido fallados para vida o para muerte».',
        '<b>«Será libertado»</b>: es la palabra clave que une a Daniel 3 (el horno), Daniel 6 (los leones) y Daniel 12:1. Como entonces, el pueblo de Dios será librado en el momento más crítico. Y es la misma palabra hebrea de «escaparán» en 11:41.',
      ]) +
      `<p>Bohr también nota que 12:1 empieza con «en aquel tiempo»: sigue directamente a 11:45. La división entre capítulos aquí, dice, es desafortunada.</p>` +
      hi('<b>El orden de 12:1-2</b>, como lo sigue Elena de White en <i>El conflicto de los siglos</i>: Miguel se levanta, viene el tiempo de angustia, el pueblo de Dios es librado y ocurre la resurrección especial.') +
      `<p>Fuentes: Esteban Bohr, La Gran Cadena Profética, pág. PDF 44 (cita Primeros escritos, p. 280); Stephen Bohr, Studies on Daniel 11, pág. PDF 11 y 136.</p>` },

    { t: '🧭 Qué parte del libro se selló', capa: 'contexto', h:
      `<p>Para Bohr, lo que quedó «cerrado y sellado hasta el tiempo del fin» (12:4, 9) no es todo Daniel, sino los capítulos <b>8 a 12</b>: la parte de los 2.300 días y del mensaje del juicio. Sus razones:</p>` +
      li([
        'La segunda mitad está en hebreo y la primera (2 a 7) en arameo.',
        'Daniel 1 a 7 ya se entendía mucho antes: en el siglo III, Hipólito explicaba que el león era Babilonia y el oso Persia.',
        'Es el único libro del Antiguo Testamento que se mandó sellar hasta el tiempo del fin, y en Apocalipsis 10:2 aparece «abierto».',
      ]) +
      hi('<b>«Muchos correrán de aquí para allá».</b> Bohr lo lee como ojos que recorren el libro: muchos lo estudiarían y aumentaría el conocimiento de su contenido. Se cumplió en el despertar adventista de los años 1830 y 1840.') +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 20, 28-29 y 360.</p>` },

    { t: '🧭 1.260, 1.290 y 1.335: tres períodos, un mismo poder', capa: 'contexto', h:
      `<p>Bohr toma el punto de partida de 12:11: «desde el tiempo en que sea quitado el sacrificio continuo» y puesta «la abominación desoladora». Lo ubica en <b>508</b>, cuando Clodoveo, rey de los francos, dio por primera vez poder civil al papado (ver Daniel 11:31). Los 1.290 y los 1.335 empiezan juntos.</p>` +
      tbl(['Período', 'Desde', 'Hasta', 'Qué marca'], [
        ['1.290 días (12:11)', '508', '1798', 'De la unión con el poder civil a la herida de 1798'],
        ['1.260 días (7:25; 12:7)', '538', '1798', 'La supremacía papal'],
        ['1.335 días (12:12)', '508', '1843', 'El movimiento millerita anuncia el juicio'],
        ['2.300 días (8:14)', '457 a.C.', '1844', 'Empieza el juicio en el cielo'],
      ]) +
      hi('Las notas de Camilo resumen la idea de Bohr: los 1.290 se relacionan con los 1.260, y los 1.335 con los 2.300. Los 2.300 marcan algo en el cielo en 1844; los 1.335, algo en la tierra: el pueblo que Dios levantó para anunciar ese juicio.') +
      `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 5; Stephen Bohr, Studies on Daniel 11, pág. PDF 26 y 217; notas de Camilo en Evernote, "Daniel 12 (Bohr" y "Periodos proféticos Daniel 12".</p>` },

    { t: '🧭 «Bienaventurado el que espere»: por qué los 1.335 ya terminaron', capa: 'contexto', h:
      `<p>Bohr une dos bienaventuranzas:</p>` +
      li([
        '«Bienaventurado el que espere, y llegue a mil trescientos treinta y cinco días» (12:12).',
        '«Bienaventurados de aquí en adelante los muertos que mueren en el Señor» (Apocalipsis 14:13), al final de los tres mensajes angélicos.',
      ]) +
      `<p>Los que vivieron después de 1843 y murieron en ese mensaje tienen una bendición especial: según Bohr, saldrán en la resurrección especial de 12:2.</p>` +
      wa('<b>Una advertencia.</b> Algunos adventistas bien intencionados proyectan los 1.335 días al futuro como días literales. Bohr lo rechaza: Elena de White corrigió a un tal hermano Hewitt, entre otras cosas, porque enseñaba que los 1.335 días no habían terminado. Y Apocalipsis 10:6 dice que el tiempo profético terminó en 1844.') +
      `<p>Maxwell, en cambio, prefiere no dar por cerrado cómo se cumplen estos dos períodos (ver arriba).</p>` +
      `<p>Fuentes: Stephen Bohr, Studies on Daniel 11, pág. PDF 217-218 (cita Manuscript Releases, tomo 16, p. 208); notas de Camilo en Evernote, "Daniel 12 (Bohr".</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '12:1', f: 'c', q: 'Según Bohr, ¿qué significa en el libro de Daniel que alguien «se levanta»?', o: ['Que empieza a reinar', 'Que resucita de los muertos', 'Que se pone de pie para orar', 'Que declara una guerra'], a: 0, e: 'Así se usa para los reyes de Persia y Grecia (11:2-3; 8:22). Miguel se levanta cuando, terminado el juicio, recibe el reino. Fuente: Esteban Bohr, La Gran Cadena Profética, pág. PDF 44.' },
    { t: 'mc', v: '12:1', f: 'c', q: 'Según Bohr, ¿en qué otros capítulos de Daniel aparece la palabra clave «librar», que los une con Daniel 12:1?', o: ['Daniel 3 y 6', 'Daniel 2 y 5', 'Daniel 4 y 9', 'Daniel 1 y 10'], a: 0, e: 'Dios libró del horno a los tres jóvenes y de los leones a Daniel; en 12:1 librará a su pueblo del tiempo de angustia. Fuente: Esteban Bohr, La Gran Cadena Profética, pág. PDF 44.' },
    { t: 'tf', v: '12:1', f: 'c', q: 'Según Bohr, Daniel 12:1 es la continuación directa de 11:45, y la división entre los capítulos corta el relato.', a: true, e: 'Verdadero: «en aquel tiempo» une a Miguel que se levanta con el rey del norte que llega a su fin. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 11.' },
    { t: 'mc', v: '12:4', f: 'c', q: 'Según Bohr, ¿qué capítulos de Daniel son el libro sellado hasta el tiempo del fin?', o: ['Los capítulos 8 a 12', 'Los capítulos 1 a 7', 'Solo el capítulo 12', 'Todo el libro de Daniel'], a: 0, e: 'Es la parte de los 2.300 días y del juicio, escrita en hebreo; la primera mitad ya se entendía mucho antes. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 20.' },
    { t: 'mc', v: '12:4', f: 'c', q: 'Según Bohr, ¿qué escritor cristiano del siglo III muestra que Daniel 1 a 7 ya se entendía mucho antes del tiempo del fin?', o: ['Hipólito', 'Jerónimo', 'Porfirio', 'Agustín'], a: 0, e: 'Hipólito ya explicaba que el león era Babilonia y el oso Persia. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 20.' },
    { t: 'mc', v: '12:11', f: 'c', q: 'Según Bohr, ¿en qué año comienzan los 1.290 y los 1.335 días?', o: ['508 d.C.', '538 d.C.', '476 d.C.', '533 d.C.'], a: 0, e: 'Los dos empiezan juntos en 508, cuando el poder civil se puso por primera vez al servicio del papado. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 5.' },
    { t: 'mc', v: '12:11', f: 'c', q: 'Según Bohr, ¿qué ocurrió en el año 508?', o: ['Clodoveo dio poder civil al papado', 'Justiniano escribió al papa Juan', 'Cayó el último emperador de Roma', 'Los ostrogodos tomaron Roma'], a: 0, e: 'Clodoveo, rey de los francos, fue el primero en prestar el poder del estado al papado. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 26.' },
    { t: 'mc', v: '12:12', f: 'c', q: 'Según Bohr, ¿en qué año terminaron los 1.335 días?', o: ['1843', '1798', '1844', '1863'], a: 0, e: 'De 508 a 1843, en pleno movimiento millerita, que anunciaba el juicio. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 5.' },
    { t: 'mc', v: '12:12', f: 'c', q: 'Según Bohr, ¿con qué versículo se enlaza la bienaventuranza de Daniel 12:12?', o: ['Apocalipsis 14:13', 'Apocalipsis 1:3', 'Mateo 5:3', 'Apocalipsis 22:14'], a: 0, e: '«Bienaventurados de aquí en adelante los muertos que mueren en el Señor»: los que mueren en el mensaje del tercer ángel. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 217.' },
    { t: 'tf', v: '12:12', f: 'c', q: 'Según Bohr, los 1.335 días deben proyectarse al futuro como días literales antes de la segunda venida.', a: false, e: 'Falso: terminaron en 1843, y el tiempo profético acabó en 1844 (Apocalipsis 10:6). Bohr advierte contra fijar fechas. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 217-218.' },
    { t: 'mc', v: '12:12', f: 'c', q: 'Según Elena de White, citada por Bohr, ¿qué error enseñaba el hermano Hewitt sobre los 1.335 días?', o: ['Que todavía no habían terminado', 'Que se contaban desde el año 538', 'Que se cumplieron con Antíoco', 'Que había que sumarlos a los 2.300'], a: 0, e: 'Ella le dijo que «los 1.335 días habían terminado». Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 218 (cita Manuscript Releases, tomo 16, p. 208).' },
    { t: 'tf', v: '12:12', f: 'c', q: 'Según las notas de Camilo sobre Bohr, los 2.300 días marcan algo en el cielo en 1844 y los 1.335 algo en la tierra en ese tiempo.', a: true, e: 'Verdadero: en el cielo empieza el juicio y en la tierra Dios levanta un movimiento que lo anuncia. Fuente: notas de Camilo en Evernote, "Daniel 12 (Bohr".' },
  ],
};
