/* Apocalipsis 15 — El cántico de Moisés y del Cordero; los ángeles de las
   siete plagas postreras. Hecho sobre el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap15', label: 'Apocalipsis 15', sub: 'El cántico de Moisés y del Cordero', vs: 8,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Es el capítulo más corto del Apocalipsis: solo <strong>8
      versículos</strong>. Juan ve <strong>siete ángeles</strong> que traen
      las <strong>siete plagas postreras</strong>, las últimas (15:1).<br><br>
      Pero antes de las plagas, Dios le muestra a Juan a los que ganaron:
      están de pie sobre un <strong>mar de vidrio mezclado con fuego</strong>,
      con arpas, y cantan <strong>el cántico de Moisés y el cántico del
      Cordero</strong> (15:2-3).<br><br>
      Después se abre el templo del cielo, los ángeles reciben
      <strong>siete copas de oro</strong> y el templo se llena de
      <strong>humo</strong> (15:5-8).<br><br>
      <em>La idea del capítulo: antes de las últimas plagas, Dios muestra
      que su pueblo está a salvo y canta su victoria.</em>`) },

    { t: '🌟 Otra señal en el cielo (15:1)', capa: 'nucleo', h:
      hi(`<strong>«Vi en el cielo otra señal grande y admirable: siete ángeles
      con las siete plagas postreras»</strong> (15:1).<br><br>
      «Postreras» quiere decir <strong>últimas</strong>. El versículo da la
      razón: <strong>«porque en ellas se consumaba la ira de Dios»</strong>
      (15:1).`) +
      wa(`Dice «otra señal»: antes ya hubo señales en el cielo, la mujer
      vestida del sol (12:1) y el gran dragón escarlata (12:3). No las
      mezcles con esta, que son siete ángeles.`) },

    { t: '🌊 Los vencedores sobre el mar de vidrio (15:2)', capa: 'nucleo', h:
      tbl(['Qué vio Juan', 'Detalle (15:2)'], [
        ['El mar', 'Como un <strong>mar de vidrio mezclado con fuego</strong>'],
        ['Quiénes estaban', 'Los que habían alcanzado <strong>la victoria</strong>'],
        ['Sobre qué vencieron', 'Sobre <strong>la bestia</strong>, <strong>su imagen</strong>, <strong>su marca</strong> y <strong>el número de su nombre</strong>'],
        ['Cómo estaban', '<strong>De pie</strong> sobre el mar de vidrio'],
        ['Qué tenían', '<strong>Las arpas de Dios</strong>'],
      ]) +
      wa(`No confundas los dos mares de vidrio: en 4:6 es <strong>«semejante
      al cristal»</strong>, delante del trono; en 15:2 está
      <strong>«mezclado con fuego»</strong> y tiene encima a los
      vencedores.`) },

    { t: '🎵 El cántico de Moisés y del Cordero (15:3-4)', capa: 'nucleo', h:
      hi(`Cantan <strong>«el cántico de Moisés, siervo de Dios, y el cántico
      del Cordero»</strong> (15:3). Lo que dicen:<br><br>
      <strong>«Grandes y maravillosas son tus obras, Señor Dios Todopoderoso;
      justos y verdaderos son tus caminos, Rey de los santos»</strong>
      (15:3).<br><br>
      <strong>«¿Quién no te temerá, Señor, y glorificará tu nombre?, pues sólo
      tú eres santo»</strong> (15:4).`) +
      li([`Las <strong>obras</strong> de Dios: grandes y maravillosas.`,
          `Sus <strong>caminos</strong>: justos y verdaderos.`,
          `Lo que harán <strong>todas las naciones</strong>: vendrán y lo
           adorarán, porque sus juicios se han manifestado (15:4).`]) +
      wa(`No es el mismo canto de 14:3. Allí es <strong>un cántico
      nuevo</strong> que solo podían aprender los ciento cuarenta y cuatro
      mil; aquí es <strong>el cántico de Moisés y del Cordero</strong>.`) },

    { t: '🏛️ Se abre el templo y salen los ángeles (15:5-7)', capa: 'nucleo', h:
      hi(`<strong>«Fue abierto en el cielo el santuario del tabernáculo del
      testimonio»</strong> (15:5).`) +
      tbl(['Detalle', 'Lo que dice el texto'], [
        ['De dónde salieron', 'Del <strong>templo</strong> (15:6)'],
        ['Ropa', '<strong>Lino limpio y resplandeciente</strong> (15:6)'],
        ['En el pecho', '<strong>Cintos de oro</strong> alrededor del pecho (15:6)'],
        ['Quién les dio las copas', '<strong>Uno de los cuatro seres vivientes</strong> (15:7)'],
        ['Las copas', '<strong>Siete copas de oro</strong> llenas de la ira de Dios (15:7)'],
      ]) +
      wa(`Copas de oro hay dos veces: en 5:8 están <strong>llenas de
      incienso</strong>, que son las oraciones de los santos; en 15:7 están
      <strong>llenas de la ira de Dios</strong>.`) },

    { t: '💨 El templo lleno de humo (15:8)', capa: 'nucleo', h:
      hi(`<strong>«Y el templo se llenó de humo por causa de la gloria de Dios
      y por causa de su poder»</strong> (15:8).<br><br>
      <strong>«Nadie podía entrar en el templo hasta que se cumplieran las
      siete plagas de los siete ángeles»</strong> (15:8).`) +
      tbl(['#', 'Los «siete» de este capítulo'], [
        ['1', 'Siete ángeles (15:1)'],
        ['2', 'Siete plagas postreras (15:1)'],
        ['3', 'Siete copas de oro (15:7)'],
      ]) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · Los <strong>vencedores</strong> de 15:2 son el pueblo fiel del tiempo
      del fin, los que no adoraron a la bestia ni recibieron su marca (el
      mensaje de 14:9-12).<br>
      · El <strong>cántico de Moisés</strong> recuerda el canto de Israel
      después de cruzar el mar Rojo (Éxodo 15): así como Dios libró a Israel,
      librará a su pueblo al final. Es un canto de liberación.<br>
      · Que <strong>nadie pueda entrar en el templo</strong> (15:8) se
      entiende como el fin de la intercesión de Cristo en el santuario: se
      cierra el tiempo de gracia antes de que caigan las siete plagas
      postreras («El conflicto de los siglos», cap. «El tiempo de
      angustia»).<br>
      · Por eso las plagas no son un llamado al arrepentimiento: llegan
      cuando cada persona ya decidió. Hoy, en cambio, todavía es tiempo de
      gracia.`) },
  ],

  preguntas: [
    { t: 'mc', v: '15:1', lit: 'siete ángeles con las siete plagas postreras',
      q: '¿Qué traían los siete ángeles que Juan vio en Apocalipsis 15:1?',
      o: ['Las siete plagas postreras', 'Las siete trompetas de oro', 'Los siete sellos del libro', 'Las siete estrellas del cielo'], a: 0,
      e: '«…siete ángeles con las siete plagas postreras» (15:1). Las trompetas son de los capítulos 8 a 11.' },
    { t: 'mc', v: '15:1', lit: 'en ellas se consumaba la ira de Dios',
      q: 'Según Apocalipsis 15:1, ¿qué se consumaba en las siete plagas postreras?',
      o: ['La ira de Dios', 'El misterio de Dios', 'La paciencia de los santos', 'El tiempo de la profecía'], a: 0,
      e: '«…porque en ellas se consumaba la ira de Dios» (15:1). «El misterio de Dios se consumará» es de 10:7.' },
    { t: 'tf', v: '15:1',
      q: 'Juan llama a la señal de Apocalipsis 15:1 «otra señal grande y admirable».', a: true,
      e: 'Verdadero: «Vi en el cielo otra señal grande y admirable» (15:1).' },
    { t: 'mc', v: '15:2', lit: 'un mar de vidrio mezclado con fuego',
      q: '¿Qué mar vio Juan en Apocalipsis 15:2?',
      o: ['Un mar de vidrio mezclado con fuego', 'Un mar de vidrio semejante al cristal', 'Un mar convertido en sangre', 'Un lago de fuego que arde con azufre'], a: 0,
      e: '«También vi como un mar de vidrio mezclado con fuego» (15:2). El de 4:6 es «semejante al cristal».' },
    { t: 'mc', v: '15:2', lit: 'sobre la bestia y su imagen, sobre su marca y el número de su nombre',
      q: 'Según Apocalipsis 15:2, ¿sobre qué habían alcanzado la victoria los que estaban sobre el mar de vidrio?',
      o: ['Sobre la bestia, su imagen, su marca y el número de su nombre', 'Sobre el dragón, la serpiente antigua y todos sus ángeles', 'Sobre la muerte, el Hades y el lago de fuego y azufre', 'Sobre la gran ramera, sus reyes y sus siete montes'], a: 0,
      e: '«…los que habían alcanzado la victoria sobre la bestia y su imagen, sobre su marca y el número de su nombre» (15:2).' },
    { t: 'mc', v: '15:2', lit: 'con las arpas de Dios',
      q: '¿Con qué estaban de pie los vencedores sobre el mar de vidrio? (Apocalipsis 15:2)',
      o: ['Con las arpas de Dios', 'Con palmas en sus manos', 'Con copas llenas de incienso', 'Con coronas de oro'], a: 0,
      e: '«…de pie sobre el mar de vidrio, con las arpas de Dios» (15:2). Las palmas son de la gran multitud (7:9).' },
    { t: 'fill', v: '15:2', ins: 'Apocalipsis 15:2 (RV1995) — Completa:',
      p: [{ x: '«También vi como un mar de ' }, { b: 'vidrio', h: '¿mar de qué?' }, { x: ' mezclado con ' }, { b: 'fuego', h: '¿mezclado con qué?' }, { x: '»' }] },
    { t: 'tf', v: '15:2',
      q: 'Los vencedores estaban sentados sobre el mar de vidrio. (Apocalipsis 15:2)', a: false,
      e: 'Falso: estaban DE PIE sobre el mar de vidrio (15:2).' },
    { t: 'mc', v: '15:3', lit: 'el cántico de Moisés, siervo de Dios, y el cántico del Cordero',
      q: '¿Qué cántico cantan los vencedores en Apocalipsis 15:3?',
      o: ['El de Moisés y el del Cordero', 'El de David y el del Cordero', 'El de Moisés y el de María', 'Un cántico nuevo de los 144.000'], a: 0,
      e: '«Y cantan el cántico de Moisés, siervo de Dios, y el cántico del Cordero» (15:3). El cántico nuevo de los 144.000 es de 14:3.' },
    { t: 'mc', v: '15:3', lit: 'Grandes y maravillosas son tus obras',
      q: '¿Qué texto dice «Grandes y maravillosas son tus obras, Señor Dios Todopoderoso»?',
      o: ['Apocalipsis 15:3', 'Apocalipsis 15:1', 'Apocalipsis 16:7', 'Apocalipsis 15:5'], a: 0,
      e: 'Apocalipsis 15:3, el cántico de Moisés y del Cordero.' },
    { t: 'fill', v: '15:3', ins: 'Apocalipsis 15:3 (RV1995) — Completa:',
      p: [{ x: '«Grandes y maravillosas son tus ' }, { b: 'obras', h: '¿tus qué?' }, { x: ', Señor Dios Todopoderoso; justos y verdaderos son tus ' }, { b: 'caminos', h: '¿tus qué?' }, { x: ', Rey de los ' }, { b: 'santos', h: '¿Rey de quiénes?' }, { x: '.»' }] },
    { t: 'mc', v: '15:4', lit: 'Quién no te temerá, Señor',
      q: '¿Qué texto dice «¿Quién no te temerá, Señor, y glorificará tu nombre?»?',
      o: ['Apocalipsis 15:4', 'Apocalipsis 15:2', 'Apocalipsis 16:5', 'Apocalipsis 15:8'], a: 0,
      e: 'Apocalipsis 15:4, en el cántico de Moisés y del Cordero.' },
    { t: 'mc', v: '15:4', lit: 'pues sólo tú eres santo',
      q: 'Según el cántico de Apocalipsis 15:4, ¿por qué todos temerán al Señor y glorificarán su nombre?',
      o: ['Porque sólo él es santo', 'Porque ha vencido al dragón', 'Porque viene con las nubes', 'Porque es el primero y el último'], a: 0,
      e: '«¿Quién no te temerá, Señor, y glorificará tu nombre?, pues sólo tú eres santo» (15:4).' },
    { t: 'tf', v: '15:4',
      q: 'Según Apocalipsis 15:4, solo algunas naciones vendrán y adorarán al Señor.', a: false,
      e: 'Falso: «TODAS las naciones vendrán y te adorarán, porque tus juicios se han manifestado» (15:4).' },
    { t: 'mc', v: '15:5', lit: 'el santuario del tabernáculo del testimonio',
      q: 'Según Apocalipsis 15:5, ¿qué fue abierto en el cielo?',
      o: ['El santuario del tabernáculo del testimonio', 'El libro sellado con siete sellos', 'El pozo del abismo y su llave', 'La puerta de la ciudad santa'], a: 0,
      e: '«…fue abierto en el cielo el santuario del tabernáculo del testimonio» (15:5).' },
    { t: 'tf', v: '15:5',
      q: 'En Apocalipsis 15:5, lo que se abrió en el cielo fue el santuario del tabernáculo del testimonio.', a: true,
      e: 'Verdadero (Apocalipsis 15:5).' },
    { t: 'mc', v: '15:6', lit: 'vestidos de lino limpio y resplandeciente',
      q: '¿Cómo iban vestidos los siete ángeles que salieron del templo? (Apocalipsis 15:6)',
      o: ['De lino limpio y resplandeciente', 'De ropas blancas, con palmas', 'De púrpura y de escarlata', 'De cilicio, como los profetas'], a: 0,
      e: '«…vestidos de lino limpio y resplandeciente y ceñidos alrededor del pecho con cintos de oro» (15:6).' },
    { t: 'tf', v: '15:6',
      q: 'Los siete ángeles de las plagas estaban ceñidos alrededor del pecho con cintos de plata. (Apocalipsis 15:6)', a: false,
      e: 'Falso: eran cintos de ORO (15:6).' },
    { t: 'mc', v: '15:7', lit: 'Uno de los cuatro seres vivientes dio a los siete ángeles',
      q: '¿Quién les dio las siete copas a los siete ángeles? (Apocalipsis 15:7)',
      o: ['Uno de los cuatro seres vivientes', 'Uno de los veinticuatro ancianos', 'El Cordero que estaba en el trono', 'El ángel que estaba junto al altar'], a: 0,
      e: '«Uno de los cuatro seres vivientes dio a los siete ángeles siete copas de oro» (15:7).' },
    { t: 'mc', v: '15:7', lit: 'siete copas de oro llenas de la ira de Dios',
      q: 'Según Apocalipsis 15:7, ¿de qué estaban llenas las siete copas de oro?',
      o: ['De la ira de Dios', 'De incienso y oraciones', 'De la sangre de los santos', 'Del vino de Babilonia'], a: 0,
      e: '«…siete copas de oro llenas de la ira de Dios» (15:7). Las copas llenas de incienso, que son las oraciones de los santos, son las de 5:8.' },
    { t: 'mc', v: '15:8', lit: 'el templo se llenó de humo',
      q: '¿De qué se llenó el templo en Apocalipsis 15:8?',
      o: ['De humo', 'De luz', 'De agua', 'De ángeles'], a: 0,
      e: '«Y el templo se llenó de humo por causa de la gloria de Dios y por causa de su poder» (15:8).' },
    { t: 'mc', v: '15:8', lit: 'por causa de la gloria de Dios y por causa de su poder',
      q: 'Según Apocalipsis 15:8, ¿por qué causa se llenó de humo el templo?',
      o: ['Por la gloria de Dios y por su poder', 'Por el incienso y las oraciones de los santos', 'Por el fuego que cayó del altar a la tierra', 'Por la caída de la gran Babilonia'], a: 0,
      e: '«…por causa de la gloria de Dios y por causa de su poder» (15:8).' },
    { t: 'tf', v: '15:8',
      q: 'Nadie podía entrar en el templo hasta que se cumplieran las siete plagas de los siete ángeles. (Apocalipsis 15:8)', a: true,
      e: 'Verdadero (Apocalipsis 15:8).' },
    { t: 'fill', v: '15:8', ins: 'Apocalipsis 15:8 (RV1995) — Completa:',
      p: [{ x: '«Nadie podía entrar en el ' }, { b: 'templo', h: '¿en dónde?' }, { x: ' hasta que se cumplieran las siete ' }, { b: 'plagas', h: '¿las siete qué?' }, { x: ' de los siete ángeles.»' }] },
    { t: 'mc', v: '15:2', f: 'c',
      q: 'En la lectura adventista, ¿quiénes son los vencedores que están sobre el mar de vidrio en Apocalipsis 15:2?',
      o: ['El pueblo fiel del fin, que no adoró a la bestia', 'Los ángeles que no siguieron al dragón', 'Los profetas del Antiguo Testamento', 'Los veinticuatro ancianos del trono'], a: 0,
      e: 'Interpretación: el pueblo fiel del tiempo del fin, que no recibió la marca (ver 14:9-12). El texto dice que vencieron «sobre la bestia y su imagen, sobre su marca y el número de su nombre» (15:2).' },
    { t: 'mc', v: '15:3', f: 'c',
      q: 'En la interpretación adventista, ¿qué recuerda el «cántico de Moisés» de Apocalipsis 15:3?',
      o: ['El canto de Israel al cruzar el mar Rojo', 'El canto de los ángeles en Belén', 'El salmo que cantó David ante el arca', 'El canto de Débora después de la batalla'], a: 0,
      e: 'Interpretación: así como Israel cantó su liberación al cruzar el mar Rojo (Éxodo 15), los redimidos cantan la suya. El texto solo dice que cantan «el cántico de Moisés, siervo de Dios, y el cántico del Cordero» (15:3).' },
    { t: 'mc', v: '15:8', f: 'c',
      q: 'En la lectura adventista, ¿qué significa que nadie pueda entrar en el templo hasta que se cumplan las siete plagas (Apocalipsis 15:8)?',
      o: ['Que terminó la intercesión de Cristo y se cerró el tiempo de gracia', 'Que el templo del cielo quedó destruido para siempre', 'Que los ángeles se fueron a vivir a la tierra', 'Que Dios abandonó a su pueblo durante las plagas'], a: 0,
      e: 'Interpretación: las siete plagas postreras caen después del cierre del tiempo de gracia («El conflicto de los siglos»). El texto dice: «Nadie podía entrar en el templo hasta que se cumplieran las siete plagas» (15:8).' },
  ],

  tarjetas: [
    { f: 'Lo que traen los siete ángeles (15:1)', r: 'Las siete plagas postreras, «porque en ellas se consumaba la ira de Dios»' },
    { f: 'El mar de 15:2', r: 'Un mar de vidrio mezclado con fuego (el de 4:6 es «semejante al cristal»)' },
    { f: 'Sobre qué vencieron los de 15:2', r: 'La bestia, su imagen, su marca y el número de su nombre' },
    { f: 'Qué cantan (15:3)', r: 'El cántico de Moisés, siervo de Dios, y el cántico del Cordero' },
    { f: '«Grandes y maravillosas son tus obras, Señor Dios Todopoderoso»', r: 'Apocalipsis 15:3' },
    { f: '«¿Quién no te temerá, Señor, y glorificará tu nombre?»', r: 'Apocalipsis 15:4, «pues sólo tú eres santo»' },
    { f: 'Qué se abrió en el cielo (15:5)', r: 'El santuario del tabernáculo del testimonio' },
    { f: 'Ropa de los siete ángeles (15:6)', r: 'Lino limpio y resplandeciente, cintos de oro en el pecho' },
    { f: 'Quién dio las copas y de qué estaban llenas (15:7)', r: 'Uno de los cuatro seres vivientes; siete copas de oro llenas de la ira de Dios' },
    { f: 'El templo lleno de humo (15:8)', r: 'Por la gloria y el poder de Dios; nadie podía entrar hasta que se cumplieran las siete plagas' },
  ],
};
