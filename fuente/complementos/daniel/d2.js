/* Daniel 2: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF), «La Gran Cadena Profética», «15 principios de
   interpretación profética» vol. 1; Urías Smith, «Las profecías de Daniel»;
   notas de Camilo en Evernote («Daniel 2 al 11», verificada contra Bohr y
   Smith). Lo que ya está en contenido.js (la piedra en la Segunda Venida,
   Ireneo e Hipólito, los intentos de reunir Europa) no se repite aquí.
   v188: voz directa, sin autores en el cuerpo; una sola «Fuente:» corta. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd2',
  secciones: [
    {
      t: '🧭 Por qué Dios le hizo olvidar el sueño',
      capa: 'contexto',
      h: `<p><strong>Cuándo:</strong> en el segundo año de Nabucodonosor (2:1), que reinaba desde 605 a.C. Babilonia contaba sus años desde que reinó solo; por eso cabe después de los tres años de estudio de Daniel (1:5).</p>` +
        `<p>Daniel 2 se puede comparar con una partida de ajedrez: Dios mueve, Satanás responde, pero Dios ya conoce todas las jugadas:</p>` +
        li([
          'El rey se acostó pensando en el futuro de su reino (2:29). Dios lo sabía.',
          'Dios le dio un sueño que contestaba esa inquietud (2:1)…',
          '…y luego se lo borró de la memoria (2:5). ¿Para qué? Porque sabía que el rey llamaría a los expertos en lo oculto, y quería <strong>desenmascarar</strong> esos métodos delante de todos.',
          'Si el diablo hubiera podido leer la mente del rey, se lo habría dicho a los astrólogos para que la religión de Babilonia quedara como verdadera. No pudo.',
        ]) +
        hi(`«Satanás no puede leer nuestros pensamientos», pero ve nuestras acciones y oye nuestras palabras (RH 27-feb-1913).`) +
        `<p>Los caldeos dijeron que solo lo sabrían dioses que no viven con los hombres (2:11). El Dios de la Biblia sí se acerca: en Jesús «se hizo carne y habitó entre nosotros» (Juan 1:14). Y Daniel no consultó estrellas: el secreto llegó cuando los cuatro oraron (2:17-19; Amós 3:7).</p>` +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 55-57; Bohr, <i>15 principios</i> 1:17; Smith, <i>Las profecías de Daniel</i>, p. 8.</p>`,
    },
    {
      t: '🧭 Los cuatro imperios, con sus fechas',
      capa: 'contexto',
      h: `<p>Daniel solo nombra a Babilonia, pero el mismo libro identifica a los siguientes (la plata en 5:28, el bronce en 8:20-21):</p>` +
        tbl(['Metal', 'Imperio', 'Fechas'], [
          ['Oro', 'Babilonia', '605-539 a.C.'],
          ['Plata', 'Medo-Persia', '539-331 a.C.'],
          ['Bronce', 'Grecia', '331-168 a.C.'],
          ['Piernas de hierro', 'Roma imperial, una monarquía de hierro', '168 a.C.-476 d.C.'],
          ['Diez dedos', 'Roma dividida en los reinos bárbaros', 'Desde 476 d.C.'],
          ['Hierro mezclado con barro', 'Roma papal: el poder político unido al religioso', 'Supremacía 538-1798 d.C.; herida en 1798, sana y vuelve al final'],
          ['La piedra que se hace monte', 'La segunda venida de Cristo y su reino eterno', 'Futuro'],
        ]) +
        `<p>Roma pasa por <strong>tres fases</strong> en la imagen: imperial, dividida y papal. Las tres son hierro: el poder de Roma sigue, pero cambia de forma.</p>` +
        `<p>Los metales <strong>bajan de valor</strong> (del oro al hierro) pero <strong>suben en dureza</strong>. La historia no avanza hacia una edad de oro hecha por el hombre; va en descenso. La imagen muestra también el deterioro de la religión y la moral: a medida que las naciones olvidan a Dios se debilitan moralmente. Y, sin valores morales, tienden a imponer la moral por la fuerza.</p>` +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 57-58; Bohr, <i>La gran cadena</i>, p. 39; CBA 4:1168.</p>`,
    },
    {
      t: '🧭 Los diez dedos: Roma dividida',
      capa: 'contexto',
      h: `<p>Roma no cayó ante otro imperio: se fue deshaciendo. Desde 330 d.C., cuando Constantino mudó la capital a Constantinopla, el occidente declinó. Las tribus del norte dividieron el imperio y en <strong>476</strong> depusieron a Rómulo Augústulo, el último emperador de occidente.</p>` +
        `<p>Los dedos son diez, y Daniel 7 tiene diez cuernos que el mismo capítulo explica como «diez reyes» (7:24). Los dedos son <strong>los reinos en que se dividió el Imperio Romano de Occidente</strong>, entre <strong>351 y 476</strong>:</p>` +
        li([
          'Anglosajones, francos, alamanes, lombardos, suevos, visigodos, burgundios, ostrogodos, hérulos y vándalos. Los tres últimos fueron «arrancados» (7:8): hérulos en 493, vándalos en 534 y ostrogodos en 538. Otra lista pone a los hunos en lugar de los alamanes.',
          'Sus nombres siguen vivos en Europa: Inglaterra, Borgoña, Lombardía, Francia.',
          '«En los días de estos reyes» (2:44) habla de varios reyes al mismo tiempo: el reino de Dios llega cuando Europa ya está dividida.',
        ]) +
        `<p>La división no aparece en las piernas sino en los dedos. Ninguno de los pedazos volvió a tener la fuerza del hierro original.</p>` +
        hi(`«No podemos esperar unión entre las naciones de la tierra» (1T 361). Estamos en los dedos, en las uñas de los pies de la historia.`) +
        `<p>Fuente: Smith, <i>Las profecías de Daniel</i>, p. 24-25; Bohr, <i>Daniel 1-10</i>, p. 62, 64, 128, 133.</p>`,
    },
    {
      t: '🧭 El barro de alfarero',
      capa: 'contexto',
      h: `<p>El hierro de las piernas sigue en los pies: <strong>Roma continúa</strong>, pero es otra clase de Roma, mezclada con algo que no es metal. Y el barro es especial: «barro cocido de alfarero» (2:41).</p>` +
        li([
          'En la Biblia el barro en manos del alfarero es el pueblo de Dios (Jeremías 18:6; Isaías 64:8).',
          'Por eso el hierro mezclado con barro es el <strong>poder político unido a la iglesia</strong>: la unión de iglesia y Estado que dominó Europa en la Edad Media. Esa mezcla tiene dos etapas: los 1.260 años (538-1798) y, cuando sane la herida de 1798, una alianza mundial poco antes de la venida de Cristo (Apocalipsis 13:3; 17:12-14). Por eso la piedra todavía la encuentra en los pies.',
          'Por separado, cada uno tiene su lugar; mezclados, los dos se debilitan. La fuerza de la iglesia está en predicar con el poder del Espíritu, no en apoyarse en el Estado.',
        ]) +
        tbl(['En la imagen', 'Fecha'], [
          ['Piernas de hierro: Imperio Romano', '168 a.C.-476 d.C.'],
          ['Diez dedos: Roma dividida', '476 d.C.'],
          ['Se añade el barro: Belisario expulsa de Roma a los ostrogodos y empieza la Roma papal', '538 d.C.'],
          ['El general Berthier entra en Roma y toma prisionero al papa', '1798 d.C.'],
        ]) +
        hi(`«La mezcla de los asuntos de la iglesia con los del Estado se representa con el hierro y el barro» (Ms 63, 1899).`) +
        `<p>El cumplimiento final es Apocalipsis 17: la ramera que se une a los reyes de la tierra.</p>` +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 58-62, 134; Smith, <i>Las profecías de Daniel</i>, p. 24, 80.</p>`,
    },
    {
      t: '🧭 La piedra «no con mano» y el monte',
      capa: 'contexto',
      h: `<p>Ya se vio que la piedra es Cristo en su segunda venida. Hay dos detalles que suelen pasarse por alto:</p>` +
        li([
          '<strong>«No con mano».</strong> La misma idea está en 8:25 («no por mano humana») y en 11:45 («no tendrá quien le ayude»): el poder perseguidor cae <strong>sin intervención humana</strong>. El fin de la historia será una irrupción sobrenatural de Dios, no una iglesia que va conquistando el mundo hasta establecer el reino aquí.',
          '<strong>El monte.</strong> En la Escritura los montes representan reinos (Isaías 2:2). Hay dos montes: la piedra sale del monte Sion, la Sion celestial (2:45; 1 Pedro 2:6), y después ella misma se vuelve el gran monte que llena la tierra: el reino eterno de Cristo (2:35, 44).',
        ]) +
        wa(`Jesús lo aplicó a cada persona (Mateo 21:44): «el que caiga sobre esta piedra será quebrantado; y sobre quien ella caiga, será desmenuzado». Caer hoy sobre la piedra es dejar que Cristo quiebre el orgullo; si no, ella caerá al final.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 63-64.</p>`,
    },
    {
      t: '🧭 Daniel 1-7: un libro en espejo',
      capa: 'contexto',
      h: `<p>Daniel 2 a 7 tiene forma de <strong>quiasmo</strong>: una estructura en espejo donde el primer capítulo se corresponde con el último, el segundo con el penúltimo, y así hacia el centro. Esos capítulos, además, están escritos en arameo, no en hebreo.</p>` +
        tbl(['Capítulos', 'Lo que tienen en común'], [
          ['2 y 7', 'Cuatro reinos (cuatro metales, cuatro bestias) y después el reino eterno de Dios'],
          ['3 y 6', 'Un decreto sobre la adoración, un remanente fiel, una condena a muerte y la palabra «librar»'],
          ['4 y 5', 'Dos reyes de Babilonia soberbios: uno es humillado y restaurado; el otro, juzgado para siempre'],
        ]) +
        `<p>Por eso Daniel 2 y 7 se estudian juntos: el mismo orden («tú eres la cabeza de oro», «otro», «tercer», «cuarto»), el hierro en el cuarto reino en los dos, y el reino eterno descrito casi con las mismas palabras (2:44; 7:27).</p>` +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 20, 83, 119-120.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos',
      capa: 'contexto',
      h: `<p>Daniel mismo da la clave del sueño, y el resto de la Biblia la confirma:</p>` +
        tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
          ['La imagen y sus metales', 'Reinos que se suceden', 'Daniel 2:38-39: «Tú eres aquella cabeza de oro. Después de ti se levantará otro reino»'],
          ['El hierro', 'Un reino fuerte que todo lo rompe: Roma', 'Daniel 2:40'],
          ['Diez dedos', 'Roma dividida en varios reyes', 'Daniel 2:41: «será un reino dividido»; 7:24: los diez cuernos son «diez reyes»'],
          ['Barro de alfarero', 'El pueblo de Dios', 'Jeremías 18:6; Isaías 64:8'],
          ['Hierro mezclado con barro', 'La iglesia unida al Estado', 'Apocalipsis 17:2: «con ella han fornicado los reyes de la tierra»'],
          ['La piedra', 'Cristo', '1 Pedro 2:6-8; Salmo 118:22; Mateo 21:44'],
          ['«Sin que la cortara mano alguna»', 'Sin intervención humana', 'Daniel 8:25: «no por mano humana»; Hebreos 9:11; Marcos 14:58'],
          ['El monte', 'Un reino; el gran monte es el reino eterno', 'Daniel 2:35 y 44; Isaías 2:2; Jeremías 51:25'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 57-64; Bohr, <i>15 principios</i> 2:106; Bohr, <i>¿Cuán cerca al fin?</i>, p. 43.</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '2:5', f: 'c', q: '¿Para qué hizo Dios que Nabucodonosor olvidara el sueño?',
      o: ['Para castigar al rey por su idolatría', 'Para probar la paciencia de Daniel', 'Para desenmascarar los métodos ocultistas de Babilonia', 'Para que el sueño no llegara a cumplirse'], a: 2,
      e: 'Dios sabía que el rey llamaría a los expertos en lo oculto y quería mostrar que sus métodos no funcionan. Fuente: Bohr, Daniel 1-10, p. 56.' },
    { t: 'tf', v: '2:10', f: 'c', q: 'Daniel 2 muestra que Satanás no puede leer la mente; por eso no pudo darles el sueño a los astrólogos.',
      a: true,
      e: 'Verdadero. Si hubiera podido, se lo habría dicho para que la religión de Babilonia quedara como verdadera. Fuente: Bohr, Daniel 1-10, p. 56.' },
    { t: 'mc', v: '2:39', f: 'c', q: '¿En qué fechas gobernó Medo-Persia, el reino de plata?',
      o: ['605-539 a.C.', '539-331 a.C.', '331-168 a.C.', '168-31 a.C.'], a: 1,
      e: 'Babilonia (605-539), Medo-Persia (539-331), Grecia (331-168) y Roma (168 a.C.-476 d.C.). Fuente: Bohr, Daniel 1-10, p. 57.' },
    { t: 'mc', v: '2:40', f: 'c', q: '¿Hasta qué año gobernó Roma, el reino de hierro, antes de dividirse?',
      o: ['Hasta el 70 d.C.', 'Hasta el 538 d.C.', 'Hasta el 1798 d.C.', 'Hasta el 476 d.C.'], a: 3,
      e: 'Roma gobernó del 168 a.C. al 476 d.C., cuando fue depuesto Rómulo Augústulo, el último emperador de occidente; después viene la etapa de los dedos, la Roma dividida. Fuente: Bohr, Daniel 1-10, p. 57-58, 133.' },
    { t: 'tf', v: '2:32', f: 'c', q: 'El valor decreciente de los metales muestra que la historia va en descenso, y la imagen representa también el deterioro moral de las naciones.',
      a: true,
      e: 'Verdadero. La historia no avanza hacia una edad de oro humana; a medida que las naciones olvidan a Dios se debilitan moralmente. Fuente: Bohr, Daniel 1-10, p. 57; CBA 4:1168.' },
    { t: 'mc', v: '2:41', f: 'c', q: '¿Entre qué años se dividió el Imperio Romano de Occidente en diez reinos?',
      o: ['Entre 351 y 476 d.C.', 'Entre 476 y 538 d.C.', 'Entre 538 y 1798 d.C.', 'Entre 168 a.C. y 70 d.C.'], a: 0,
      e: 'La división va de 351 a 476. Una lista pone a los hunos; otra, a los alamanes. Fuente: Smith, Las profecías de Daniel, p. 24-25, 32.' },
    { t: 'mc', v: '2:41', f: 'c', q: '¿Qué representa el barro cocido de alfarero mezclado con el hierro en los pies?',
      o: ['Los pueblos bárbaros que invadieron Roma', 'La iglesia unida al poder del Estado', 'Las democracias modernas', 'El pueblo judío disperso'], a: 1,
      e: 'En la Biblia el barro del alfarero es el pueblo de Dios (Jeremías 18:6); mezclado con el hierro romano representa la unión de iglesia y Estado. Fuente: Bohr, Daniel 1-10, p. 58-60.' },
    { t: 'tf', v: '2:43', f: 'c', q: 'La mezcla de los asuntos de la iglesia con los del Estado se representa con el hierro y el barro.',
      a: true,
      e: 'Verdadero. Fuente: Bohr, Daniel 1-10, p. 62; Ms 63, 1899 (CBA 4:1168).' },
    { t: 'mc', v: '2:34', f: 'c', q: 'Comparando 2:34 con 8:25, ¿qué significa que la piedra fue cortada «no con mano»?',
      o: ['Que vendría con un gran ejército', 'Que llegaría por la predicación', 'Que crecería en forma lenta', 'Sin intervención humana'], a: 3,
      e: 'El fin de la historia será una irrupción sobrenatural de Dios, no obra humana. Fuente: Bohr, Daniel 1-10, p. 63.' },
    { t: 'tf', v: '2:44', f: 'c', q: 'La piedra representa a la iglesia que va conquistando el mundo poco a poco hasta establecer el reino de Dios en la tierra.',
      a: false,
      e: 'Falso: la piedra es la intervención directa de Dios al final de la historia, no el avance de la iglesia. Fuente: Bohr, Daniel 1-10, p. 63.' },
    { t: 'mc', v: '2:45', f: 'c', q: '¿Cuál es el monte del que se corta la piedra?',
      o: ['El Sinaí', 'El Carmelo', 'Sion', 'El monte de los Olivos'], a: 2,
      e: 'Pedro dice que Dios pone la piedra «en Sion» (1 Pedro 2:6); el monte representa el reino eterno de Cristo. Fuente: Bohr, Daniel 1-10, p. 63-64.' },
    { t: 'mc', v: '2:31', f: 'c', q: 'En la estructura en espejo de Daniel 2-7, ¿con qué capítulo se corresponde Daniel 2?',
      o: ['Con Daniel 7', 'Con Daniel 3', 'Con Daniel 8', 'Con Daniel 12'], a: 0,
      e: 'Los pares son 2 y 7, 3 y 6, 4 y 5. Daniel 2 y 7 tienen cuatro reinos y después el reino eterno. Fuente: Bohr, Daniel 1-10, p. 83, 119-120.' },
    { t: 'mc', v: '2:39', f: 'c', q: '¿Qué versículos de Daniel 2 dan la clave de que los metales de la imagen representan reinos?',
      o: ['Daniel 2:21-22', 'Daniel 2:27-28', 'Daniel 2:38-39', 'Daniel 2:46-47'], a: 2,
      e: '«Tú eres aquella cabeza de oro. Después de ti se levantará otro reino» (2:38-39): la cabeza es el reino de Babilonia, y cada metal que sigue es «otro reino». Fuente: Bohr, Daniel 1-10, p. 57.' },
    { t: 'mc', v: '2:42', f: 'c', q: '¿Qué versículo de Daniel explica que los diez dedos representan reyes o reinos?',
      o: ['Daniel 5:28', 'Daniel 7:24', 'Daniel 9:25', 'Daniel 12:4'], a: 1,
      e: 'Los diez cuernos de la cuarta bestia «significan que de aquel reino se levantarán diez reyes» (7:24); son los mismos diez dedos de la imagen. Fuente: Bohr, Daniel 1-10, p. 61; Bohr, 15 principios 2:105.' },
    { t: 'mc', v: '2:35', f: 'c', q: 'En la profecía, ¿qué representa un monte?',
      o: ['Un templo', 'Un reino', 'Un ejército', 'Un juicio'], a: 1,
      e: 'Se ve en Jeremías 51:24-25 y en el mismo Daniel 2: la piedra se hace «un gran monte» (2:35) y es el reino que Dios «levantará» (2:44). Fuente: Bohr, 15 principios 2:106.' },
  ],
};
