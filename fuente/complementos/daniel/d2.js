/* Daniel 2: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF), «La Gran Cadena Profética», «15 principios de
   interpretación profética» vol. 1; Urías Smith, «Las profecías de Daniel»;
   notas de Camilo en Evernote. Lo que ya está en contenido.js (la piedra en la
   Segunda Venida, Ireneo e Hipólito, los intentos de reunir Europa) no se
   repite aquí. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd2',
  secciones: [
    {
      t: '🧭 Por qué Dios le hizo olvidar el sueño',
      capa: 'contexto',
      h: `<p>Bohr compara Daniel 2 con una partida de ajedrez: Dios mueve, Satanás responde, pero Dios ya conoce todas las jugadas. Así ve él la secuencia del capítulo:</p>` +
        li([
          'El rey se acostó pensando en el futuro de su reino (2:29). Dios lo sabía.',
          'Dios le dio un sueño que contestaba esa inquietud (2:1)…',
          '…y luego se lo borró de la memoria (2:5). ¿Para qué? Porque sabía que el rey llamaría a los expertos en lo oculto, y quería <strong>desenmascarar</strong> esos métodos delante de todos.',
          'Si el diablo hubiera podido leer la mente del rey, se lo habría dicho a los astrólogos para que la religión de Babilonia quedara como verdadera. No pudo.',
        ]) +
        hi(`«Satanás no puede leer nuestros pensamientos», pero ve nuestras acciones y oye nuestras palabras (Elena de White, Review and Herald, 27-feb-1913, citada por Bohr).`) +
        `<p>Los caldeos dijeron que solo lo sabrían dioses que no viven con los hombres (2:11). Bohr contrasta: el Dios de la Biblia sí se acerca; en Jesús «se hizo carne y habitó entre nosotros» (Juan 1:14). Y Daniel no consultó estrellas: el secreto llegó cuando los cuatro oraron (2:17-19; Amós 3:7).</p>` +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 55-57; Bohr, 15 principios de interpretación profética, vol. 1, pág. 17.</p>`,
    },
    {
      t: '🧭 Los cuatro imperios, con sus fechas',
      capa: 'contexto',
      h: `<p>Daniel solo nombra a Babilonia, pero el mismo libro identifica a los siguientes (la plata en 5:28, el bronce en 8:20-21). Las fechas que da Bohr:</p>` +
        tbl(['Metal', 'Imperio', 'Fechas'], [
          ['Oro', 'Babilonia', '605-539 a.C.'],
          ['Plata', 'Medo-Persia', '539-331 a.C.'],
          ['Bronce', 'Grecia', '331-168 a.C.'],
          ['Piernas de hierro', 'Roma imperial; el historiador Gibbon la llamó «la monarquía de hierro»', '168 a.C.-476 d.C.'],
          ['Diez dedos', 'Roma dividida en los reinos bárbaros', 'Desde 476 d.C.'],
          ['Hierro mezclado con barro', 'Roma papal: el poder político unido al religioso', 'Desde 538 d.C.: domina 538-1798 y vuelve al final'],
          ['La piedra que se hace monte', 'La segunda venida de Cristo y su reino eterno', 'Futuro'],
        ]) +
        `<p>Roma pasa por <strong>tres fases</strong> en la imagen: imperial, dividida y papal. Las tres son hierro: el poder de Roma sigue, pero cambia de forma.</p>` +
        `<p>Una lectura que Bohr subraya: los metales <strong>bajan de valor</strong> (del oro al hierro) pero <strong>suben en dureza</strong>. La historia no avanza hacia una edad de oro hecha por el hombre; va en descenso. Elena de White, citada por él, dice que la imagen muestra también el deterioro de la religión y la moral: a medida que las naciones olvidan a Dios se debilitan moralmente. Bohr añade que, sin valores morales, las naciones tienden a imponer la moral por la fuerza.</p>` +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 57-58 (cita de Comentario bíblico adventista, tomo 4, pág. 1168); Bohr, La Gran Cadena Profética, pág. 39.</p>`,
    },
    {
      t: '🧭 Los pies: la Europa dividida',
      capa: 'contexto',
      h: `<p>Los dedos son diez, y Daniel 7 tiene diez cuernos que el mismo capítulo explica como «diez reyes» (7:24). Por eso Urías Smith, con la lectura adventista clásica, concluye que los dedos son <strong>los reinos en que se dividió el Imperio Romano de Occidente</strong>, entre los años <strong>351 y 476</strong>.</p>` +
        li([
          'Son anglosajones, francos, alamanes, lombardos, suevos, visigodos, burgundios, ostrogodos, hérulos y vándalos. Los tres últimos fueron «arrancados» (7:8): hérulos en 493, vándalos en 534 y ostrogodos en 538. Urías Smith pone a los hunos en lugar de los alamanes; sus propios revisores anotan que otros ponen a los alamanes.',
          'Sus nombres siguen vivos en Europa: Inglaterra, Borgoña, Lombardía, Francia.',
          '«En los días de estos reyes» (2:44) habla de varios reyes al mismo tiempo: el reino de Dios llega cuando Europa ya está dividida, no en tiempos de un solo imperio.',
        ]) +
        `<p>La división no aparece en las piernas sino en los pies, justo donde entra el barro. Ninguno de los pedazos volvió a tener la fuerza del hierro original.</p>` +
        hi(`Elena de White, citada por Bohr: «No podemos esperar unión entre las naciones de la tierra». Nuestro lugar en la imagen son los dedos, «en estado dividido» (Testimonios, tomo 1, pág. 361). Bohr: «estamos en las uñas de los pies de la historia».`) +
        `<p>Fuentes: Urías Smith, Las profecías de Daniel, págs. 24-25; Stephen Bohr, Studies in Daniel 1-10, págs. 62 y 64.</p>`,
    },
    {
      t: '🧭 El barro de alfarero, según Bohr',
      capa: 'contexto',
      h: `<p>Bohr va un paso más allá. El hierro de las piernas sigue en los pies: <strong>Roma continúa</strong>, pero es otra clase de Roma, mezclada con algo que no es metal. Y el barro es especial: «barro cocido de alfarero» (2:41).</p>` +
        li([
          'En la Biblia el barro en manos del alfarero es el pueblo de Dios (Jeremías 18:6; Isaías 64:8).',
          'Por eso, para Bohr, el hierro mezclado con barro es el <strong>poder político unido a la iglesia</strong>: la unión de iglesia y Estado que dominó Europa en la Edad Media. Esa mezcla tiene dos etapas: los 1.260 años (538-1798) y, cuando sane la herida de 1798, una alianza mundial poco antes de la venida de Cristo (Apocalipsis 13:3; 17:12-14). Por eso la piedra todavía la encuentra en los pies.',
          'Por separado, cada uno tiene su lugar; mezclados, los dos se debilitan. La fuerza de la iglesia está en predicar con el poder del Espíritu, no en apoyarse en el Estado.',
        ]) +
        tbl(['En la imagen', 'Fecha'], [
          ['Piernas de hierro: Imperio Romano', '168 a.C.-476 d.C.'],
          ['Diez dedos: Roma dividida', '476 d.C.'],
          ['Se añade el barro al hierro: Roma papal', '538 d.C.'],
        ]) +
        hi(`Elena de White: «La mezcla de los asuntos de la iglesia con los del Estado se representa con el hierro y el barro» (Manuscrito 63, 1899).`) +
        `<p>Para Bohr, el cumplimiento final es Apocalipsis 17: la ramera que se une a los reyes de la tierra. Smith, en cambio, ve en el barro sobre todo la debilidad que partió el imperio.</p>` +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 58-62; notas de Camilo en Evernote, "1. Daniel 2 - Jaque Mate"; Urías Smith, Las profecías de Daniel, pág. 24.</p>`,
    },
    {
      t: '🧭 La piedra «no con mano» y el monte',
      capa: 'contexto',
      h: `<p>Ya se vio que la piedra es Cristo en su segunda venida. Bohr añade dos detalles que suelen pasarse por alto:</p>` +
        li([
          '<strong>«No con mano».</strong> La misma idea está en 8:25 («no por mano humana») y en 11:45 («no tendrá quien le ayude»): el poder perseguidor cae <strong>sin intervención humana</strong>. El fin de la historia será una irrupción sobrenatural de Dios. Bohr lo contrasta con la idea, que viene de Agustín, de que la piedra es la iglesia que va conquistando el mundo hasta establecer el reino aquí.',
          '<strong>El monte.</strong> En la Escritura los montes representan reinos (Isaías 2:2). Hay dos montes: la piedra sale del monte Sion, la Sion celestial (2:45; 1 Pedro 2:6), y después ella misma se vuelve el gran monte que llena la tierra: el reino eterno de Cristo (2:35, 44).',
        ]) +
        wa(`La aplicación personal que Bohr toma de Jesús (Mateo 21:44): «el que caiga sobre esta piedra será quebrantado; y sobre quien ella caiga, será desmenuzado». Caer hoy sobre la piedra es dejar que Cristo quiebre el orgullo; si no, ella caerá al final.`) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 63-64; notas de Camilo en Evernote, "1. Daniel 2 - Jaque Mate".</p>`,
    },
    {
      t: '🧭 Daniel 1-7: un libro en espejo',
      capa: 'contexto',
      h: `<p>Bohr muestra que Daniel 2 a 7 tiene forma de <strong>quiasmo</strong>: una estructura en espejo donde el primer capítulo se corresponde con el último, el segundo con el penúltimo, y así hacia el centro. Esos capítulos, además, están escritos en arameo, no en hebreo.</p>` +
        tbl(['Capítulos', 'Lo que tienen en común'], [
          ['2 y 7', 'Cuatro reinos (cuatro metales, cuatro bestias) y después el reino eterno de Dios'],
          ['3 y 6', 'Un decreto sobre la adoración, un remanente fiel, una condena a muerte y la palabra «librar»'],
          ['4 y 5', 'Dos reyes de Babilonia soberbios: uno es humillado y restaurado; el otro, juzgado para siempre'],
        ]) +
        `<p>Por eso Daniel 2 y 7 se estudian juntos: el mismo orden («tú eres la cabeza de oro», «otro», «tercer», «cuarto»), el hierro en el cuarto reino en los dos, y el reino eterno descrito casi con las mismas palabras (2:44; 7:27).</p>` +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 20, 83 y 119-120.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos',
      capa: 'contexto',
      h: `<p>Daniel mismo da la clave del sueño, y el resto de la Biblia la confirma:</p>` +
        tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
          ['La imagen y sus metales', 'Reinos que se suceden', 'Daniel 2:38-39: «Tú eres aquella cabeza de oro. Después de ti se levantará otro reino»'],
          ['El hierro', 'Un reino fuerte que todo lo rompe: Roma', 'Daniel 2:40'],
          ['Pies y dedos', 'Un reino dividido en varios reyes', 'Daniel 2:41: «será un reino dividido»; 7:24: los diez cuernos son «diez reyes»'],
          ['Barro de alfarero', 'El pueblo de Dios', 'Jeremías 18:6; Isaías 64:8'],
          ['Hierro mezclado con barro', 'La iglesia unida al Estado', 'Apocalipsis 17:2: «con ella han fornicado los reyes de la tierra»'],
          ['La piedra', 'Cristo', '1 Pedro 2:6-8; Salmo 118:22; Mateo 21:44'],
          ['«Sin que la cortara mano alguna»', 'Sin intervención humana', 'Daniel 8:25: «no por mano humana»; Hebreos 9:11; Marcos 14:58'],
          ['El monte', 'Un reino; el gran monte es el reino eterno', 'Daniel 2:35 y 44; Isaías 2:2; Jeremías 51:25'],
        ]) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 57-64; Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 106; Bohr, ¿Cuán cerca al fin?, pág. PDF 43; notas de Camilo en Evernote, "1. Daniel 2 - Jaque Mate".</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '2:5', f: 'c', q: 'Según Bohr, ¿para qué hizo Dios que Nabucodonosor olvidara el sueño?',
      o: ['Para castigar al rey por su idolatría', 'Para probar la paciencia de Daniel', 'Para desenmascarar los métodos ocultistas de Babilonia', 'Para que el sueño no llegara a cumplirse'], a: 2,
      e: 'Dios sabía que el rey llamaría a los expertos en lo oculto y quería mostrar que sus métodos no funcionan. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 56.' },
    { t: 'tf', v: '2:10', f: 'c', q: 'Según Bohr, Daniel 2 muestra que Satanás no puede leer la mente; por eso no pudo darles el sueño a los astrólogos.',
      a: true,
      e: 'Verdadero. Si hubiera podido, se lo habría dicho para que la religión de Babilonia quedara como verdadera. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 56.' },
    { t: 'mc', v: '2:39', f: 'c', q: 'Según Bohr, ¿en qué fechas gobernó Medo-Persia, el reino de plata?',
      o: ['605-539 a.C.', '539-331 a.C.', '331-168 a.C.', '168-31 a.C.'], a: 1,
      e: 'Babilonia (605-539), Medo-Persia (539-331), Grecia (331-168) y Roma (168 a.C.-476 d.C.). Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 57.' },
    { t: 'mc', v: '2:40', f: 'c', q: 'Según Bohr, ¿hasta qué año gobernó Roma, el reino de hierro, antes de dividirse?',
      o: ['Hasta el 70 d.C.', 'Hasta el 538 d.C.', 'Hasta el 1798 d.C.', 'Hasta el 476 d.C.'], a: 3,
      e: 'Roma gobernó del 168 a.C. al 476 d.C.; después viene la etapa de los pies, la Roma dividida. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 57-58.' },
    { t: 'tf', v: '2:32', f: 'c', q: 'Según Bohr, el valor decreciente de los metales muestra que la historia va en descenso, y Elena de White dice que la imagen representa también el deterioro moral de las naciones.',
      a: true,
      e: 'Verdadero. La historia no avanza hacia una edad de oro humana; a medida que las naciones olvidan a Dios se debilitan moralmente. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 57 (cita de Comentario bíblico adventista, tomo 4, pág. 1168).' },
    { t: 'mc', v: '2:41', f: 'c', q: 'Según Urías Smith, ¿entre qué años se dividió el Imperio Romano de Occidente en diez reinos?',
      o: ['Entre 351 y 476 d.C.', 'Entre 476 y 538 d.C.', 'Entre 538 y 1798 d.C.', 'Entre 168 a.C. y 70 d.C.'], a: 0,
      e: 'Smith fija la división entre 351 y 476. Su lista pone a los hunos; las notas de Camilo y otros intérpretes ponen a los alamanes. Fuente: Urías Smith, Las profecías de Daniel, págs. 24-25 y 32; notas de Camilo en Evernote, «Tribús Barbaras».' },
    { t: 'mc', v: '2:41', f: 'c', q: 'Según Bohr, ¿qué representa el barro cocido de alfarero mezclado con el hierro en los pies?',
      o: ['Los pueblos bárbaros que invadieron Roma', 'La iglesia unida al poder del Estado', 'Las democracias modernas', 'El pueblo judío disperso'], a: 1,
      e: 'En la Biblia el barro del alfarero es el pueblo de Dios (Jeremías 18:6); mezclado con el hierro romano representa la unión de iglesia y Estado. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 58-60.' },
    { t: 'tf', v: '2:43', f: 'c', q: 'Según Elena de White, citada por Bohr, la mezcla de los asuntos de la iglesia con los del Estado se representa con el hierro y el barro.',
      a: true,
      e: 'Verdadero (Manuscrito 63, 1899, en Comentario bíblico adventista, tomo 4, pág. 1168). Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 62.' },
    { t: 'mc', v: '2:34', f: 'c', q: 'Según Bohr, comparando 2:34 con 8:25, ¿qué significa que la piedra fue cortada «no con mano»?',
      o: ['Que vendría con un gran ejército', 'Que llegaría por la predicación', 'Que crecería en forma lenta', 'Sin intervención humana'], a: 3,
      e: 'El fin de la historia será una irrupción sobrenatural de Dios, no obra humana. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 63.' },
    { t: 'tf', v: '2:44', f: 'c', q: 'Según Bohr, la piedra representa a la iglesia que va conquistando el mundo poco a poco hasta establecer el reino de Dios en la tierra.',
      a: false,
      e: 'Falso: Bohr señala que esa idea viene de Agustín; para él la piedra es la intervención directa de Dios al final de la historia. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 63.' },
    { t: 'mc', v: '2:45', f: 'c', q: 'Según Bohr, ¿cuál es el monte del que se corta la piedra?',
      o: ['El Sinaí', 'El Carmelo', 'Sion', 'El monte de los Olivos'], a: 2,
      e: 'Pedro dice que Dios pone la piedra «en Sion» (1 Pedro 2:6); el monte representa el reino eterno de Cristo. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 63-64.' },
    { t: 'mc', v: '2:31', f: 'c', q: 'Según Bohr, en la estructura en espejo de Daniel 2-7, ¿con qué capítulo se corresponde Daniel 2?',
      o: ['Con Daniel 7', 'Con Daniel 3', 'Con Daniel 8', 'Con Daniel 12'], a: 0,
      e: 'Los pares son 2 y 7, 3 y 6, 4 y 5. Daniel 2 y 7 tienen cuatro reinos y después el reino eterno. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 83 y 119-120.' },
    { t: 'mc', v: '2:39', f: 'c', q: '¿Qué versículos de Daniel 2 dan la clave de que los metales de la imagen representan reinos?',
      o: ['Daniel 2:21-22', 'Daniel 2:27-28', 'Daniel 2:38-39', 'Daniel 2:46-47'], a: 2,
      e: '«Tú eres aquella cabeza de oro. Después de ti se levantará otro reino» (2:38-39): la cabeza es el reino de Babilonia, y cada metal que sigue es «otro reino». Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 57.' },
    { t: 'mc', v: '2:42', f: 'c', q: 'Según Bohr, ¿qué versículo de Daniel explica que los diez dedos representan reyes o reinos?',
      o: ['Daniel 5:28', 'Daniel 7:24', 'Daniel 9:25', 'Daniel 12:4'], a: 1,
      e: 'Los diez cuernos de la cuarta bestia «significan que de aquel reino se levantarán diez reyes» (7:24); son los mismos diez dedos de la imagen. Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 61; Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 105.' },
    { t: 'mc', v: '2:35', f: 'c', q: 'Según Bohr, en la profecía, ¿qué representa un monte?',
      o: ['Un templo', 'Un reino', 'Un ejército', 'Un juicio'], a: 1,
      e: 'Bohr lo muestra con Jeremías 51:24-25 y con el mismo Daniel 2: la piedra se hace «un gran monte» (2:35) y es el reino que Dios «levantará» (2:44). Fuente: Esteban Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 106.' },
  ],
};
