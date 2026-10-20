/* Daniel 3: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF), «15 principios de interpretación profética»
   vol. 1, «La Gran Cadena Profética», «Los Secretos del Génesis»; Gerhard
   Pfandl, «Daniel» (libro complementario). Las citas de Elena de White van
   como Bohr las cita (páginas de la edición en inglés).
   Lo que ya está en contenido.js (instrumentos griegos, «y si no», Desmond
   Doss, el cuarto como Hijo de Dios) no se repite aquí.
   v188: voz directa, sin autores en el cuerpo; una sola «Fuente:» corta. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd3',
  secciones: [
    {
      t: '🧭 Una imagen toda de oro: el desafío a la profecía',
      capa: 'contexto',
      h: `<p><strong>Cuándo:</strong> el texto no da el año. Lo más probable es hacia 594 a.C., después de una revuelta en el ejército de Babilonia: la dedicación servía para que todos los oficiales mostraran su lealtad. Ese año Sedequías, rey de Judá, viajó a Babilonia (Jeremías 51:59). La versión griega dice «el año dieciocho» del rey (587 a.C.), pero es muy tarde: Jerusalén ya estaba sitiada.</p>` +
        `<p>Daniel 3 es la respuesta del rey a Daniel 2. Dios le había mostrado que Babilonia, la cabeza de oro, sería seguida por otros reinos. Al rey y a sus sabios no les gustó ese futuro. Con la estatua, el rey decía que la historia iría como él quisiera, no como Dios había dicho.</p>` +
        li([
          'La idea salió de los sabios del reino: le propusieron hacer una imagen como la del sueño.',
          'Pero <strong>toda de oro</strong>: sin bajar de valor de la cabeza a los pies, como símbolo de una Babilonia eterna que nunca daría paso a otro reino.',
          'Dos palabras unen los capítulos: «oro» e «imagen». En arameo «imagen» es la misma palabra en los dos (<i>tselem</i>, <span class="heb" lang="he">צְלֵם</span>); la RV1995 traduce «imagen» en 2:31 y «estatua» en 3:1.',
          'Y un verbo: Dios «levantará» un reino que no será destruido (2:44); el capítulo 3 repite que el rey «levantó» la estatua (3:1, 2, 3, 5, 7, 12, 14, 18).',
        ]) +
        hi(`La imagen no era solo un monumento político, como saludar una bandera. Era un símbolo religioso: el rey los acusa de no servir a «mis dioses» y de no adorar la estatua (3:14).`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 65-66, 69; Bohr, <i>15 principios</i> 1:18; PR 504; Pfandl, <i>Daniel</i>, p. 18.</p>`,
    },
    {
      t: '🧭 Sesenta por seis: los números de Babilonia',
      capa: 'contexto',
      h: `<p>La estatua medía 60 codos de alto y 6 de ancho (3:1), unos 27 metros por 3. Esos números no son casualidad:</p>` +
        li([
          'Babilonia contaba en <strong>base 60</strong> (sistema sexagesimal). De ahí vienen todavía los 60 minutos, los 60 segundos y los 360 grados del círculo.',
          '60 × 6 = 360, un número sagrado para ellos: el ciclo completo del tiempo y del espacio.',
          'El oro, por su color, se asociaba con el sol. El dios principal de Babilonia, Marduk, era visto como dios del sol y señor de todo el tiempo y el espacio.',
          'Los babilonios repartían el cielo entre 36 dioses, y la suma de 1 a 36 da <strong>666</strong>, el número del dios sol. Así Daniel 3 se une con el número de la bestia (Apocalipsis 13:18).',
        ]) +
        wa(`Este último punto viene de la religión babilónica, no del texto de Daniel. Lo que sí está en el texto es la medida de 60 por 6.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 66-67.</p>`,
    },
    {
      t: '🧭 Daniel 3 y Apocalipsis 13: la historia que se repite',
      capa: 'contexto',
      h: `<p>Las historias del Antiguo Testamento también son profecía. Lo que en Daniel 3 fue <strong>literal y local</strong> se repetirá al final en forma <strong>mundial y espiritual</strong>.</p>` +
        tbl(['Daniel 3', 'Apocalipsis 13'], [
          ['Un rey que llegó a vivir como bestia (4:16)', 'Una bestia'],
          ['Una imagen', 'La imagen de la bestia'],
          ['Medidas de 60 y 6', 'El número 666'],
          ['«Pueblos, naciones y lenguas» deben adorar (3:4)', 'Todos deben adorar la imagen'],
          ['Horno de fuego para el que no adore', 'Pena de muerte para el que no adore (13:15)'],
          ['Los caldeos, líderes religiosos, acusan ante el rey', 'Líderes religiosos influyen en el poder civil'],
          ['Tres jóvenes que no se arrodillan', 'Un remanente fiel'],
        ]) +
        `<p>En los dos, el conflicto es por la <strong>adoración</strong>: la palabra «adorar» se repite doce veces en el capítulo (3:5-28). Y en los dos religión y Estado van unidos: todas las autoridades del imperio asisten a una ceremonia religiosa ordenada por el gobierno (3:2-3).</p>` +
        `<p>Fuente: Bohr, <i>Los secretos del Génesis</i>, p. 27-28; Bohr, <i>Daniel 1-10</i>, p. 39-40, 68, 72.</p>`,
    },
    {
      t: '🧭 La lección para el tiempo del fin',
      capa: 'contexto',
      h: `<p>«Se ha levantado un sábado ídolo, como la imagen de oro fue levantada en la llanura de Dura» (14MR 91). Así como hubo un decreto de muerte contra quien no se inclinara, habrá una ley que castigue a quien no honre un día de reposo hecho por los hombres en lugar del sábado del Creador.</p>` +
        `<p>La estrategia del rey tuvo tres pasos:</p>` +
        tbl(['Paso', 'En Dura'], [
          ['Fascinación', 'La estatua, la música, las autoridades de todo el mundo, la presión de la mayoría'],
          ['Intimidación', '«¿Qué dios será el que os libre de mis manos?» (3:15)'],
          ['Aniquilación', 'El horno calentado siete veces más'],
        ]) +
        hi(`El carácter de los jóvenes no se formó en la crisis; se mostró en ella. Su fidelidad en la comida (cap. 1) los preparó para el horno. Ninguna consideración, «ni aun la de la vida misma», debe llevar a la menor concesión a la adoración falsa (PR 512-513).`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 41, 70-71, 75, 81-82; 14MR 91; PR 512-513.</p>`,
    },
    {
      t: '🧭 El cuarto en el horno y la palabra «librar»',
      capa: 'contexto',
      verso: 25,
      h: `<p>El héroe de Daniel 3 no son los jóvenes sino <strong>Cristo</strong>, que en el momento crítico entra al horno. ¿Cómo supo el rey a quién se parecía el cuarto? Los cautivos hebreos le habían hablado de Cristo, el Redentor que vendría, y por esa descripción lo reconoció.</p>` +
        li([
          'La palabra clave del capítulo es <strong>«librar»</strong> (3:15, 17, 28, 29). Vuelve en Daniel 6 y en Daniel 12:1, donde el pueblo de Dios «será librado» en el tiempo de angustia. Por eso los tres pasajes se leen juntos.',
          'El horno calentado «siete veces» indica el máximo: el siete es número de totalidad.',
          'El horno también es figura de la prueba que purifica (Isaías 48:10): salen como oro.',
          'Los que los echaron murieron por la llama (3:22). Al final, las armas preparadas contra el pueblo de Dios se volverán contra sus enemigos.',
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 40, 71-72, 81; Bohr, <i>La gran cadena</i>, p. 48-49; CTr 178; CS 655.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos',
      capa: 'contexto',
      h: `<p>Lo que en Dura fue literal, en Apocalipsis 13 es símbolo. La Biblia misma da la clave:</p>` +
        tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
          ['Un rey que vive «como bestia» (4:16)', 'Un rey o un reino', 'Daniel 7:17 y 23: las bestias «son cuatro reyes»; «la cuarta bestia será un cuarto reino»'],
          ['El oro', 'Babilonia', 'Daniel 2:38: «Tú eres aquella cabeza de oro»; Isaías 14:4'],
          ['La imagen que todos deben adorar', 'La imagen de la bestia', 'Apocalipsis 13:14-15: «que le hagan una imagen a la bestia»'],
          ['El seis (60 × 6)', 'La apostasía contra Dios', 'Apocalipsis 13:18: el número de la bestia «es número de hombre»; 1 Reyes 10:14'],
          ['Siete veces más (3:19)', 'El máximo, la totalidad', 'Génesis 2:2; Levítico 16:14'],
          ['El horno de fuego', 'La prueba que purifica al pueblo de Dios', 'Isaías 48:10; Malaquías 3:2-3; Apocalipsis 3:18'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 66-67, 71, 74; Bohr, <i>15 principios</i> 2:104-105.</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '3:1', f: 'c', q: '¿Qué quiso expresar Nabucodonosor al hacer la imagen toda de oro?',
      o: ['Que Babilonia sería un reino eterno', 'Que honraba al Dios de Daniel', 'Que su tesoro era el más rico', 'Que Marduk había vencido a Egipto'], a: 0,
      e: 'La imagen no debía bajar de valor de la cabeza a los pies: simbolizaba una Babilonia eterna e indestructible. Fuente: PR 504; Bohr, Daniel 1-10, p. 65.' },
    { t: 'mc', v: '3:1', f: 'c', q: '¿De quién salió la idea de hacer una imagen parecida a la del sueño?',
      o: ['Del propio Daniel', 'De los sabios del reino', 'De la reina de Babilonia', 'De los sátrapas del rey'], a: 1,
      e: 'Los sabios aprovecharon que el rey había vuelto a la idolatría y le propusieron la imagen. Fuente: PR 504; Bohr, Daniel 1-10, p. 65.' },
    { t: 'tf', v: '3:3', f: 'c', q: 'El verbo «levantar», que Daniel 3 repite al hablar de la estatua del rey, responde a Daniel 2:44, donde Dios «levantará» un reino que no será destruido.',
      a: true,
      e: 'Verdadero. El rey quiso contradecir el plan de Dios levantando su propia imagen toda de oro. Fuente: Bohr, 15 principios 1:18; Bohr, Daniel 1-10, p. 65.' },
    { t: 'mc', v: '3:1', f: 'c', q: '¿Qué número sagrado de Babilonia resulta de multiplicar las medidas de la estatua (60 × 6)?',
      o: ['666', '600', '360', '66'], a: 2,
      e: '60 × 6 = 360, el ciclo completo del tiempo y del espacio en el sistema de base 60 de Babilonia. Fuente: Bohr, Daniel 1-10, p. 66-67.' },
    { t: 'tf', v: '3:5', f: 'c', q: 'Daniel 3 es una figura literal y local de lo que Apocalipsis 13 describe en forma mundial y espiritual.',
      a: true,
      e: 'Verdadero: bestia, imagen, decreto universal de adoración, pena de muerte y un remanente fiel aparecen en los dos. Fuente: Bohr, Daniel 1-10, p. 39, 72.' },
    { t: 'mc', v: '3:15', f: 'c', q: '¿Cuáles fueron los tres pasos de la estrategia del rey en Dura?',
      o: ['Persuasión, soborno y destierro', 'Fiesta, decreto y castigo', 'Amenaza, juicio y perdón', 'Fascinación, intimidación y aniquilación'], a: 3,
      e: 'Primero deslumbrar con la ceremonia, luego amenazar y por último el horno. Fuente: Bohr, Daniel 1-10, p. 70.' },
    { t: 'mc', v: '3:7', f: 'c', q: '¿Qué se ha «levantado» para el tiempo del fin como la imagen en la llanura de Dura?',
      o: ['Un día de reposo falso', 'Un templo en Jerusalén', 'Una estatua de oro literal', 'Un gobierno sin religión'], a: 0,
      e: '«Se ha levantado un sábado ídolo, como la imagen de oro fue levantada en la llanura de Dura». Fuente: 14MR 91; Bohr, Daniel 1-10, p. 75.' },
    { t: 'tf', v: '3:25', f: 'c', q: 'Nabucodonosor reconoció al cuarto en el horno porque los cautivos hebreos le habían hablado de Cristo, el Redentor que vendría.',
      a: true,
      e: 'Verdadero. Por esa descripción el rey reconoció la forma del cuarto como la del Hijo de Dios. Fuente: CTr 178; Bohr, Daniel 1-10, p. 72.' },
    { t: 'mc', v: '3:28', f: 'c', q: '¿Qué palabra clave une Daniel 3, Daniel 6 y Daniel 12:1?',
      o: ['Adorar', 'Decreto', 'Librar', 'Fuego'], a: 2,
      e: '«Librar» aparece en 3:15, 17, 28 y 29, varias veces en Daniel 6, y en 12:1, donde el pueblo de Dios «será librado». Fuente: Bohr, Daniel 1-10, p. 40; Bohr, La gran cadena, p. 48.' },
    { t: 'tf', v: '3:22', f: 'c', q: 'Que la llama matara a los que echaron a los jóvenes al horno anuncia que, al final, las armas preparadas contra el pueblo de Dios se volverán contra sus enemigos.',
      a: true,
      e: 'Verdadero. Lo mismo pasó con los acusadores de Daniel en el foso. Fuente: CS 714; Bohr, Daniel 1-10, p. 52, 81.' },
    { t: 'mc', v: '3:1', f: 'c', q: 'Nabucodonosor llegó a vivir como bestia (4:16). Según Daniel 7:17 y 23, ¿qué representa una bestia en la profecía?',
      o: ['Un rey o un reino', 'Un ángel caído', 'Un falso profeta', 'Una iglesia apóstata'], a: 0,
      e: 'Daniel 7 lo explica: las bestias «son cuatro reyes» y «la cuarta bestia será un cuarto reino». Fuente: Bohr, Daniel 1-10, p. 66; Bohr, 15 principios 2:105.' },
    { t: 'tf', v: '3:19', f: 'c', q: 'El horno calentado «siete veces» más indica el máximo, porque en la profecía el siete representa la totalidad.',
      a: true,
      e: 'Verdadero: fue la plenitud de la ira del rey. Daniel 3:19 está entre los textos donde el siete es totalidad. Fuente: Bohr, Daniel 1-10, p. 71; Bohr, 15 principios 2:104.' },
    { t: 'mc', v: '3:20', f: 'c', q: '¿Qué texto muestra que el horno es figura de la prueba con que Dios purifica a su pueblo?',
      o: ['Levítico 10:2', 'Génesis 19:24', 'Isaías 48:10', 'Hechos 2:3'], a: 2,
      e: 'En Isaías 48:10 Dios dice que escoge a su pueblo en el horno de la aflicción; los tres jóvenes salieron como oro probado. Fuente: Bohr, Daniel 1-10, p. 71.' },
  ],
};
