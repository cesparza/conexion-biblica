/* Daniel 6: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF) y «La Gran Cadena Profética». Las citas de Elena
   de White van como Bohr las cita (páginas de la edición en inglés). Lo que ya
   está en contenido.js (quién fue Darío de Media, la edad de Daniel, Bel y
   Nebo) no se repite aquí. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd6',
  secciones: [
    {
      t: '🧭 Daniel 3 y Daniel 6: imponer y prohibir',
      capa: 'contexto',
      h: `<p>En la estructura en espejo del libro, Daniel 6 se corresponde con Daniel 3. Bohr muestra que los dos decretos atacan la libertad religiosa desde lados opuestos:</p>` +
        tbl(['', 'Daniel 3', 'Daniel 6'], [
          ['Rey', 'Nabucodonosor (Babilonia)', 'Darío (Medo-Persia)'],
          ['El decreto', '<strong>Impone</strong> una adoración falsa', '<strong>Prohíbe</strong> la adoración verdadera'],
          ['La pena', 'El horno de fuego', 'El foso de los leones'],
          ['El fiel', 'Tres jóvenes', 'Daniel, ya anciano'],
          ['Quién libra', 'El cuarto en el horno', 'El ángel que cerró la boca de los leones'],
        ]) +
        `<p>Bohr lo compara con las dos partes de la garantía de libertad religiosa de la Constitución de Estados Unidos: el Estado no debe <strong>establecer</strong> una religión (Daniel 3) ni <strong>prohibir su libre ejercicio</strong> (Daniel 6).</p>` +
        hi(`Daniel no aparece en Daniel 3, y no sabemos dónde estaba. Pero, dice Bohr, Daniel 6 deja claro qué habría hecho si hubiera estado en Dura.`) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 113-114; Bohr, La Gran Cadena Profética, págs. 49-50.</p>`,
    },
    {
      t: '🧭 Fiel en el trabajo, acusado por su fe',
      capa: 'contexto',
      h: `<p>Los Diez Mandamientos tienen dos tablas: la primera (mandamientos 1 a 4) trata de la relación con Dios; la segunda (5 a 10), de la relación con el prójimo. Bohr usa esa división para leer el complot:</p>` +
        li([
          'Buscaron falta en Daniel «en lo relacionado con el reino» y no la hallaron (6:4). Bohr dice que «falta» puede traducirse mejor como <strong>corrupción</strong>: Daniel era honrado en su trabajo, fiel a la segunda tabla.',
          'Entonces atacaron la primera tabla: «la ley de su Dios» (6:5). Como no podían acusarlo de nada malo, hicieron ilegal lo bueno.',
          'La idea no fue de Darío. El rey no era enemigo de Daniel; se volvió un peligro cuando escuchó a sus consejeros.',
        ]) +
        `<p>¿Por qué Daniel no cerró las ventanas para no provocar? Elena de White responde que orar como siempre, a la vista de todos, le dio ocasión de mostrar quién es el Dios verdadero y por qué solo él merece adoración (Testimonios, tomo 5, pág. 453, citada por Bohr).</p>` +
        wa(`La aplicación de Bohr: si hoy no somos fieles en lo pequeño —el diezmo, el sábado, la honradez en el trabajo—, no lo seremos cuando la prueba sea la vida.`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 113-116.</p>`,
    },
    {
      t: '🧭 El decreto de Darío, figura del decreto final',
      capa: 'contexto',
      h: `<p>Para Bohr, lo que pasó con Daniel se repetirá a escala mundial con el pueblo de Dios al final del tiempo:</p>` +
        tbl(['Daniel 6', 'El decreto final'], [
          ['Los consejeros convencen al rey', 'Líderes religiosos convencen a los gobernantes de que los fieles son un peligro para el Estado'],
          ['Una ley religiosa dictada por el poder civil', 'Leyes religiosas sobre el día de adoración'],
          ['Escrita y firmada; no se puede revocar (6:8-9)', 'Escrito y firmado por los gobiernos (Apocalipsis 13:15; compárese Ester 3:8-9)'],
          ['Pena de muerte', 'Un decreto que declara a los fieles dignos de muerte'],
          ['Daniel ora con las ventanas abiertas', 'El pueblo de Dios clama día y noche'],
          ['Dios envía su ángel', 'Miguel se levanta y su pueblo es librado (Daniel 12:1)'],
          ['Los acusadores caen en el foso', 'Los enemigos sufren lo que planearon'],
        ]) +
        `<p>Elena de White describe que las leyes sobre el domingo terminarán castigando a quienes guarden el sábado (El conflicto de los siglos, pág. 615, citada por Bohr). Bohr lo dice así: una ley que impone un día termina prohibiendo el otro.</p>` +
        hi(`El hilo es la palabra <strong>«librar»</strong>: cinco veces en Daniel 6 (6:14, 16, 20, 27), varias en Daniel 3, y en 12:1. Daniel 3 y 6 son la base para entender el final de Daniel 11 y 12.`) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 42-43 y 115-117.</p>`,
    },
    {
      t: '🧭 ¿Por qué Dios dejó que lo echaran al foso?',
      capa: 'contexto',
      h: `<p>Dios pudo librar a Daniel antes del foso. No lo hizo. Elena de White explica que permitió a sus enemigos llegar hasta ahí para que la liberación fuera <strong>más notable</strong> y la derrota de ellos <strong>más completa</strong> (Profetas y reyes, págs. 543-544, citada por Bohr). Como dice el Salmo 76:10, aun la ira del hombre termina alabando a Dios.</p>` +
        li([
          '<strong>Un rey esclavo de su propia ley.</strong> Darío quiso mostrar su poder con el decreto, y quedó atado a él: trabajó hasta la puesta del sol y no pudo librar a Daniel (6:14-15). Hizo falta Uno verdaderamente todopoderoso.',
          '<strong>La controversia despierta preguntas.</strong> Elena de White: cada reproche contra la verdad será un medio de Dios para despertar mentes que de otro modo seguirían dormidas (Testimonios, tomo 5, pág. 453).',
          '<strong>Fe que confía.</strong> En la Septuaginta, la palabra de 6:23 («había confiado en su Dios») es la misma que el Nuevo Testamento traduce como <strong>fe</strong>, la de «la fe de Jesús» (Apocalipsis 14:12).',
        ]) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 42, 114 y 116.</p>`,
    },
    {
      t: '🧭 El decreto de Darío al final: bueno en intención, fuera de lugar',
      capa: 'contexto',
      h: `<p>El capítulo termina con otro decreto: que en todo el reino «todos teman y tiemblen ante la presencia del Dios de Daniel» (6:26). Suena bien, pero Bohr señala que Darío todavía no había entendido la lección: <strong>el Estado no puede legislar la adoración</strong>, ni la del dios falso ni la del Dios verdadero. Por eso, en La Gran Cadena Profética, Bohr anota junto a ese versículo «ordenanza ilegítima», y hace lo mismo con el decreto de Nabucodonosor en 3:29.</p>` +
        li([
          'La adoración que Dios quiere es libre y nace del amor; no se impone con leyes ni con castigos.',
          'Lo que sí hizo bien Darío fue dar testimonio: «él salva y libra» (6:27).',
        ]) +
        hi(`Para Bohr, Daniel prefigura al remanente final en cuatro cosas: el testimonio de Jesús (el don profético), la obediencia a los mandamientos, la adoración al Creador y la fe de Jesús (Apocalipsis 12:17; 14:7, 12).`) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. 115; Bohr, La Gran Cadena Profética, págs. 49-50.</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '6:7', f: 'c', q: 'Según Bohr, ¿en qué se diferencia el decreto de Daniel 6 del de Daniel 3?',
      o: ['El de Daniel 3 imponía una adoración falsa; el de Daniel 6 prohibía la verdadera', 'El de Daniel 3 era de Persia; el de Daniel 6, de Babilonia', 'El de Daniel 3 duraba treinta días; el de Daniel 6, siete', 'El de Daniel 3 era civil; el de Daniel 6 no tenía pena'], a: 0,
      e: 'Nabucodonosor intentó imponer la adoración falsa; Darío prohibió el libre ejercicio de la verdadera. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 113.' },
    { t: 'tf', v: '6:7', f: 'c', q: 'Según Bohr, la idea del decreto salió del propio rey Darío, que era enemigo de Daniel.',
      a: false,
      e: 'Falso: el rey no era enemigo de Daniel; la idea vino de sus consejeros, que lo engañaron. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 42 y 114.' },
    { t: 'mc', v: '6:5', f: 'c', q: 'Según Bohr, como no hallaron falta en Daniel en su trabajo, ¿por dónde lo atacaron sus enemigos?',
      o: ['Por su origen judío y extranjero', 'Por su edad y su salud', 'Por la ley de su Dios: la primera tabla', 'Por el manejo de los impuestos'], a: 2,
      e: 'Era fiel a la segunda tabla (el prójimo), así que legislaron contra la primera: la adoración a Dios. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 113.' },
    { t: 'mc', v: '6:10', f: 'c', q: 'Según Elena de White, citada por Bohr, ¿qué oportunidad le dio a Daniel seguir orando con las ventanas abiertas?',
      o: ['Escapar sin que lo vieran', 'Mostrar quién es el Dios verdadero', 'Ganarse el favor del pueblo', 'Probar que el decreto era falso'], a: 1,
      e: 'Así pudo mostrar quién es el Dios verdadero y por qué solo él merece adoración. Fuente: Elena de White, Testimonios, tomo 5, pág. 453, citada por Stephen Bohr, Studies in Daniel 1-10, pág. 114.' },
    { t: 'tf', v: '6:16', f: 'c', q: 'Según Elena de White, Dios permitió que echaran a Daniel al foso para que su liberación fuera más notable y la derrota de sus enemigos más completa.',
      a: true,
      e: 'Verdadero (Profetas y reyes, págs. 543-544). Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 114-115.' },
    { t: 'mc', v: '6:15', f: 'c', q: 'Según Bohr, ¿qué muestra que Darío no pudiera revocar su propia ley?',
      o: ['Que los medos eran más justos que los babilonios', 'Que Daniel había ofendido de verdad al rey', 'Que los sátrapas tenían más poder que Dios', 'Que el poder de los gobernantes humanos es limitado'], a: 3,
      e: 'El rey quedó esclavo de su decreto; hizo falta Uno verdaderamente todopoderoso para librar a Daniel. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 114.' },
    { t: 'mc', v: '6:9', f: 'c', q: 'Según Bohr, ¿qué pasaje de Apocalipsis describe el decreto final, escrito por el poder civil contra los que no adoran como se manda?',
      o: ['Apocalipsis 6:9', 'Apocalipsis 12:6', 'Apocalipsis 13:15', 'Apocalipsis 18:4'], a: 2,
      e: 'Apocalipsis 13:15 anuncia la muerte para quien no adore la imagen de la bestia; Bohr lo compara también con el decreto de Ester 3:8-9. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 116.' },
    { t: 'tf', v: '6:26', f: 'c', q: 'Según Bohr, el decreto final de Darío, que mandaba temer al Dios de Daniel, es un buen ejemplo de cómo el Estado debe promover la adoración verdadera.',
      a: false,
      e: 'Falso: fue bien intencionado pero ilegítimo; el Estado no puede legislar la adoración, ni la falsa ni la verdadera. Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. 115; Bohr, La Gran Cadena Profética, pág. 50.' },
    { t: 'mc', v: '6:23', f: 'c', q: 'Según Bohr, la palabra «confiado» de Daniel 6:23 en la Septuaginta es la misma que el Nuevo Testamento traduce como…',
      o: ['gracia', 'fe', 'esperanza', 'obediencia'], a: 1,
      e: 'Es la palabra de «la fe de Jesús» (Apocalipsis 14:12): la fe que tendrá el pueblo de Dios en la crisis final. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 42 y 114.' },
    { t: 'tf', v: '6:14', f: 'c', q: 'Según Bohr, la palabra «librar», que aparece varias veces en Daniel 6, une este capítulo con Daniel 3 y con Daniel 12:1.',
      a: true,
      e: 'Verdadero: por eso Daniel 3 y 6 son la base para entender la liberación final del pueblo de Dios en Daniel 11:44-12:1. Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 42-43 y 115; Bohr, La Gran Cadena Profética, pág. 50.' },
  ],
};
