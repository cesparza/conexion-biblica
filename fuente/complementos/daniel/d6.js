/* Daniel 6: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF) y «La Gran Cadena Profética». Las citas de Elena
   de White van como Bohr las cita (páginas de la edición en inglés). Lo que ya
   está en contenido.js (quién fue Darío de Media, la edad de Daniel, Bel y
   Nebo) no se repite aquí.
   v188: voz directa, sin autores en el cuerpo; una sola «Fuente:» corta. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd6',
  secciones: [
    {
      t: '🧭 Daniel 3 y Daniel 6: imponer y prohibir',
      capa: 'contexto',
      h: `<p><strong>Cuándo:</strong> poco después de la caída de Babilonia, entre 539 y 537 a.C., cuando reinaba Darío de Media (5:31; 6:1).</p>` +
        `<p>En la estructura en espejo del libro, Daniel 6 se corresponde con Daniel 3. Los dos decretos atacan la libertad religiosa desde lados opuestos:</p>` +
        tbl(['', 'Daniel 3', 'Daniel 6'], [
          ['Rey', 'Nabucodonosor (Babilonia)', 'Darío (Medo-Persia)'],
          ['El decreto', '<strong>Impone</strong> una adoración falsa', '<strong>Prohíbe</strong> la adoración verdadera'],
          ['La pena', 'El horno de fuego', 'El foso de los leones'],
          ['El fiel', 'Tres jóvenes', 'Daniel, ya anciano'],
          ['Quién libra', 'El cuarto en el horno', 'El ángel que cerró la boca de los leones'],
        ]) +
        `<p>Se puede comparar con las dos partes de la garantía de libertad religiosa de la Constitución de Estados Unidos: el Estado no debe <strong>establecer</strong> una religión (Daniel 3) ni <strong>prohibir su libre ejercicio</strong> (Daniel 6).</p>` +
        hi(`Daniel no aparece en Daniel 3, y no sabemos dónde estaba. Pero Daniel 6 deja claro qué habría hecho si hubiera estado en Dura.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 113, 116; Bohr, <i>La gran cadena</i>, p. 47-49.</p>`,
    },
    {
      t: '🧭 Fiel en el trabajo, acusado por su fe',
      capa: 'contexto',
      h: `<p>Los Diez Mandamientos tienen dos tablas: la primera (mandamientos 1 a 4) trata de la relación con Dios; la segunda (5 a 10), de la relación con el prójimo. Esa división explica el complot:</p>` +
        li([
          'Buscaron falta en Daniel «en lo relacionado con el reino» y no la hallaron (6:4). «Falta» puede traducirse mejor como <strong>corrupción</strong>: Daniel era honrado en su trabajo, fiel a la segunda tabla.',
          'Entonces atacaron la primera tabla: «la ley de su Dios» (6:5). Como no podían acusarlo de nada malo, hicieron ilegal lo bueno.',
          'La idea no fue de Darío. El rey no era enemigo de Daniel; se volvió un peligro cuando escuchó a sus consejeros.',
        ]) +
        `<p>¿Por qué Daniel no cerró las ventanas para no provocar? Orar como siempre, a la vista de todos, le dio ocasión de mostrar quién es el Dios verdadero y por qué solo él merece adoración.</p>` +
        wa(`La aplicación: si hoy no somos fieles en lo pequeño —el diezmo, el sábado, la honradez en el trabajo—, no lo seremos cuando la prueba sea la vida.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 113-116; 5T 453.</p>`,
    },
    {
      t: '🧭 El decreto de Darío, figura del decreto final',
      capa: 'contexto',
      h: `<p>Lo que pasó con Daniel se repetirá a escala mundial con el pueblo de Dios al final del tiempo:</p>` +
        tbl(['Daniel 6', 'El decreto final'], [
          ['Los consejeros convencen al rey', 'Líderes religiosos convencen a los gobernantes de que los fieles son un peligro para el Estado'],
          ['Una ley religiosa dictada por el poder civil', 'Leyes religiosas sobre el día de adoración'],
          ['Escrita y firmada; no se puede revocar (6:8-9)', 'Escrito y firmado por los gobiernos (Apocalipsis 13:15; compárese Ester 3:8-9)'],
          ['Pena de muerte', 'Un decreto que declara a los fieles dignos de muerte'],
          ['Daniel ora con las ventanas abiertas', 'El pueblo de Dios clama día y noche'],
          ['Dios envía su ángel', 'Miguel se levanta y su pueblo es librado (Daniel 12:1)'],
          ['Los acusadores caen en el foso', 'Los enemigos sufren lo que planearon'],
        ]) +
        `<p>Las leyes sobre el domingo terminarán castigando a quienes guarden el sábado: una ley que impone un día termina prohibiendo el otro.</p>` +
        hi(`El hilo es la palabra <strong>«librar»</strong>: varias veces en Daniel 6 (6:14, 16, 20, 27), en Daniel 3 y en 12:1. Daniel 3 y 6 son la base para entender el final de Daniel 11 y 12.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 40, 42-43, 115-117; CS 615.</p>`,
    },
    {
      t: '🧭 ¿Por qué Dios dejó que lo echaran al foso?',
      capa: 'contexto',
      verso: 16,
      h: `<p>Dios pudo librar a Daniel antes del foso. No lo hizo. Permitió a sus enemigos llegar hasta ahí para que la liberación fuera <strong>más notable</strong> y la derrota de ellos <strong>más completa</strong>. Como dice el Salmo 76:10, aun la ira del hombre termina alabando a Dios.</p>` +
        li([
          '<strong>Un rey esclavo de su propia ley.</strong> Darío quiso mostrar su poder con el decreto, y quedó atado a él: trabajó hasta la puesta del sol y no pudo librar a Daniel (6:14-15). Hizo falta Uno verdaderamente todopoderoso.',
          '<strong>La controversia despierta preguntas.</strong> Cada reproche contra la verdad será un medio de Dios para despertar mentes que de otro modo seguirían dormidas.',
          '<strong>Fe que confía.</strong> En la Septuaginta, la palabra de 6:23 («había confiado en su Dios») es la misma que el Nuevo Testamento traduce como <strong>fe</strong>, la de «la fe de Jesús» (Apocalipsis 14:12).',
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 42, 114, 116; PR 543-544; 5T 453.</p>`,
    },
    {
      t: '🧭 El decreto de Darío al final: bueno en intención, fuera de lugar',
      capa: 'contexto',
      h: `<p>El capítulo termina con otro decreto: que en todo el reino «todos teman y tiemblen ante la presencia del Dios de Daniel» (6:26). Suena bien, pero Darío todavía no había entendido la lección: <strong>el Estado no puede legislar la adoración</strong>, ni la del dios falso ni la del Dios verdadero. Es una ordenanza ilegítima, como el decreto de Nabucodonosor en 3:29.</p>` +
        li([
          'La adoración que Dios quiere es libre y nace del amor; no se impone con leyes ni con castigos.',
          'Lo que sí hizo bien Darío fue dar testimonio: «él salva y libra» (6:27).',
        ]) +
        hi(`Daniel prefigura al remanente final en cuatro cosas: el testimonio de Jesús (el don profético), la obediencia a los mandamientos, la adoración al Creador y la fe de Jesús (Apocalipsis 12:17; 14:7, 12).`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 115; Bohr, <i>La gran cadena</i>, p. 49-50.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos',
      capa: 'contexto',
      h: `<p>Daniel 6 no trae visiones: es historia. Pero cada parte es figura del final, y la Biblia misma muestra su cumplimiento:</p>` +
        tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
          ['Daniel, en quien no hallaron falta (6:4)', 'El remanente fiel del fin', 'Apocalipsis 14:5: «son sin mancha delante del trono de Dios»; 14:12'],
          ['La ley firmada que no se puede revocar (6:8)', 'El decreto final contra los que no adoran como se manda', 'Apocalipsis 13:15: hacer «matar a todo el que no la adorara»; Ester 3:8-9'],
          ['Orar tres veces al día ante el peligro (6:10)', 'El pueblo de Dios que clama en la angustia final', 'Lucas 18:7: los escogidos que claman a Dios día y noche'],
          ['El foso y la liberación (6:22, 27)', 'El tiempo de angustia y la liberación final', 'Daniel 12:1: «en aquel tiempo será libertado tu pueblo»'],
          ['Los acusadores echados al foso (6:24)', 'Los enemigos del pueblo de Dios caen en su propia trampa', 'Apocalipsis 17:16; Ester 7:10'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 42-43, 115-117; Bohr, <i>La gran cadena</i>, p. 47-50; Bohr, <i>15 principios</i> 2:111-112.</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '6:7', f: 'c', q: '¿En qué se diferencia el decreto de Daniel 6 del de Daniel 3?',
      o: ['El de Daniel 3 imponía una adoración falsa; el de Daniel 6 prohibía la verdadera', 'El de Daniel 3 era de Persia; el de Daniel 6, de Babilonia', 'El de Daniel 3 duraba treinta días; el de Daniel 6, siete', 'El de Daniel 3 era civil; el de Daniel 6 no tenía pena'], a: 0,
      e: 'Nabucodonosor intentó imponer la adoración falsa; Darío prohibió el libre ejercicio de la verdadera. Fuente: Bohr, Daniel 1-10, p. 113.' },
    { t: 'tf', v: '6:7', f: 'c', q: 'La idea del decreto salió del propio rey Darío, que era enemigo de Daniel.',
      a: false,
      e: 'Falso: el rey no era enemigo de Daniel; la idea vino de sus consejeros, que lo engañaron. Fuente: Bohr, Daniel 1-10, p. 42, 114.' },
    { t: 'mc', v: '6:5', f: 'c', q: 'Como no hallaron falta en Daniel en su trabajo, ¿por dónde lo atacaron sus enemigos?',
      o: ['Por su origen judío y extranjero', 'Por su edad y su salud', 'Por la ley de su Dios: la primera tabla', 'Por el manejo de los impuestos'], a: 2,
      e: 'Era fiel a la segunda tabla (el prójimo), así que legislaron contra la primera: la adoración a Dios. Fuente: Bohr, Daniel 1-10, p. 113.' },
    { t: 'mc', v: '6:10', f: 'c', q: '¿Qué oportunidad le dio a Daniel seguir orando con las ventanas abiertas?',
      o: ['Escapar sin que lo vieran', 'Mostrar quién es el Dios verdadero', 'Ganarse el favor del pueblo', 'Probar que el decreto era falso'], a: 1,
      e: 'Así pudo mostrar quién es el Dios verdadero y por qué solo él merece adoración. Fuente: 5T 453; Bohr, Daniel 1-10, p. 114.' },
    { t: 'tf', v: '6:16', f: 'c', q: 'Dios permitió que echaran a Daniel al foso para que su liberación fuera más notable y la derrota de sus enemigos más completa.',
      a: true,
      e: 'Verdadero. Así aun la ira del hombre terminó alabando a Dios (Salmo 76:10). Fuente: PR 543-544; Bohr, Daniel 1-10, p. 114-115.' },
    { t: 'mc', v: '6:15', f: 'c', q: '¿Qué muestra que Darío no pudiera revocar su propia ley?',
      o: ['Que los medos eran más justos que los babilonios', 'Que Daniel había ofendido de verdad al rey', 'Que los sátrapas tenían más poder que Dios', 'Que el poder de los gobernantes humanos es limitado'], a: 3,
      e: 'El rey quedó esclavo de su decreto; hizo falta Uno verdaderamente todopoderoso para librar a Daniel. Fuente: Bohr, Daniel 1-10, p. 114.' },
    { t: 'mc', v: '6:9', f: 'c', q: '¿Qué pasaje de Apocalipsis describe el decreto final, escrito por el poder civil contra los que no adoran como se manda?',
      o: ['Apocalipsis 6:9', 'Apocalipsis 12:6', 'Apocalipsis 13:15', 'Apocalipsis 18:4'], a: 2,
      e: 'Apocalipsis 13:15 anuncia la muerte para quien no adore la imagen de la bestia; se parece también al decreto de Ester 3:8-9. Fuente: Bohr, Daniel 1-10, p. 116.' },
    { t: 'tf', v: '6:26', f: 'c', q: 'El decreto final de Darío, que mandaba temer al Dios de Daniel, es un buen ejemplo de cómo el Estado debe promover la adoración verdadera.',
      a: false,
      e: 'Falso: fue bien intencionado pero ilegítimo; el Estado no puede legislar la adoración, ni la falsa ni la verdadera. Fuente: Bohr, Daniel 1-10, p. 115; Bohr, La gran cadena, p. 50.' },
    { t: 'mc', v: '6:23', f: 'c', q: 'La palabra «confiado» de Daniel 6:23 en la Septuaginta es la misma que el Nuevo Testamento traduce como…',
      o: ['gracia', 'fe', 'esperanza', 'obediencia'], a: 1,
      e: 'Es la palabra de «la fe de Jesús» (Apocalipsis 14:12): la fe que tendrá el pueblo de Dios en la crisis final. Fuente: Bohr, Daniel 1-10, p. 42, 114.' },
    { t: 'tf', v: '6:14', f: 'c', q: 'La palabra «librar», que aparece varias veces en Daniel 6, une este capítulo con Daniel 3 y con Daniel 12:1.',
      a: true,
      e: 'Verdadero: por eso Daniel 3 y 6 son la base para entender la liberación final del pueblo de Dios en Daniel 11:44-12:1. Fuente: Bohr, Daniel 1-10, p. 42-43, 115; Bohr, La gran cadena, p. 50.' },
    { t: 'mc', v: '6:4', f: 'c', q: 'Daniel, en quien no hallaron falta, prefigura al remanente del fin. ¿Qué texto de Apocalipsis dice que ese remanente es «sin mancha»?',
      o: ['Apocalipsis 3:17', 'Apocalipsis 14:5', 'Apocalipsis 9:20', 'Apocalipsis 20:8'], a: 1,
      e: '«En sus bocas no fue hallada mentira, pues son sin mancha delante del trono de Dios» (Apocalipsis 14:5). Fuente: Bohr, Daniel 1-10, p. 51, 115.' },
    { t: 'tf', v: '6:24', f: 'c', q: 'Que los acusadores de Daniel murieran en el foso anuncia que, al final, los reyes de la tierra se volverán contra la ramera.',
      a: true,
      e: 'Verdadero: los malvados sufrirán lo que planearon contra los justos (Apocalipsis 17:16-17). Fuente: CS 713-714; Bohr, Daniel 1-10, p. 117.' },
    { t: 'mc', v: '6:10', f: 'c', q: '¿A qué corresponde en el tiempo de angustia la oración constante de Daniel?',
      o: ['A los cultos públicos en los templos', 'Al pueblo de Dios que clama día y noche', 'A la oración de los ángeles por la tierra', 'A los rezos repetidos de memoria'], a: 1,
      e: 'En el tiempo de angustia el pueblo de Dios clama día y noche por liberación; como Jacob, no suelta a Dios hasta tener la seguridad de ser aceptado. Fuente: CS 676-677; Bohr, Daniel 1-10, p. 116.' },
  ],
};
