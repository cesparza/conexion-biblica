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

    { t: '🧭 Dónde encaja Apocalipsis 15', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      Bohr lee Apocalipsis 11:19 y 15:5-8 como los dos extremos de un mismo
      cuadro. En 11:19 se abre el templo de Dios en el cielo y se ve el arca:
      empieza el juicio en el <strong>lugar santísimo</strong> (la parte más
      interna del santuario, donde estaba el arca con la ley), que la iglesia
      adventista ubica en <strong>1844</strong>. En 15:5-8 el templo se abre
      otra vez, pero para que salgan los ángeles con las plagas: es el
      <strong>final</strong> de ese juicio.<br><br>
      Lo que queda en medio (capítulos 12 a 14) cuenta lo que pasa en la tierra
      mientras el juicio sigue abierto.`) +
      tbl(['Texto', 'Qué marca, según Bohr'], [
        ['11:19', 'Se abre el templo: comienza el juicio'],
        ['12 a 14', 'La lucha del dragón y las bestias; los tres ángeles'],
        ['15:2-4', 'Los vencedores ya están a salvo'],
        ['15:5-8', 'Se cierra la puerta de la gracia'],
        ['16', 'Caen las siete plagas'],
      ]) +
      hi(`Fuente: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 93-94.`) },

    { t: '🧭 El cántico de Moisés: el éxodo se repite (15:2-4)', capa: 'contexto', h:
      hi(`Apocalipsis usa palabras del Antiguo Testamento para que estudiemos
      toda la historia de donde vienen. Para Bohr, «el cántico de Moisés» nos
      lleva a Éxodo 14 y 15: la liberación final del pueblo de Dios seguirá el
      mismo patrón que la salida de Egipto, pero en todo el mundo. Los que
      cantan son el remanente (el pueblo fiel del final) que venció a la bestia
      en la última crisis.`) +
      tbl(['En Egipto', 'Al final, según Bohr'], [
        ['Faraón, llamado «el gran dragón» (Ezequiel 29:3)', 'El dragón que hace guerra al remanente (12:17)'],
        ['Plagas que endurecen a Faraón', 'Plagas que no traen arrepentimiento (16:9, 11)'],
        ['Israel encerrado junto al mar', 'El pueblo de Dios bajo un decreto de muerte'],
        ['Tinieblas para Egipto, luz para Israel', 'La quinta plaga (16:10)'],
        ['El mar se seca y abre un camino', 'La sexta plaga: se seca el Éufrates (16:12)'],
        ['Truenos y terremoto (Salmo 77)', 'La séptima plaga (16:18)'],
        ['Cantan a orillas del mar (Éxodo 15)', 'Cantan sobre el mar de vidrio'],
      ]) +
      hi(`Fuente: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 225-227 y 236-238.`) },

    { t: '🧭 El templo cerrado: termina la intercesión (15:5-8)', capa: 'contexto', h:
      hi(`Para Bohr, «el templo del tabernáculo del testimonio» es el lugar
      santísimo dentro del santuario del cielo: «el templo del templo». Antes
      se abría para que el pueblo entrara por la fe; aquí se abre para que
      salgan los ángeles con las copas.<br><br>
      Que nadie pueda entrar hasta que terminen las plagas quiere decir que
      Cristo terminó su <strong>intercesión</strong> (su obra de pedir perdón
      por nosotros como sacerdote): se cerró la <strong>puerta de la
      gracia</strong>, el tiempo en que Dios todavía ofrece perdón.`) +
      li([`Elena de White: Jesús deja de interceder y anuncia «el que es
           injusto, sea injusto aún» (Apocalipsis 22:11). Cada caso ya fue
           decidido.`,
          `Desde ahí los justos viven «sin intercesor, a la vista del santo
           Dios», pero protegidos por él.`,
          `Bohr lo compara con Noé: se predicó con poder, se cerró la puerta
           del arca y después vino el diluvio.`,
          `Daniel 12:1 describe el mismo momento: «se levantará Miguel», es
           decir, Jesús empieza a reinar porque el número de los suyos está
           completo.`]) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 28 y 157-158; Bohr, «Culto en el trono de Satanás», pág. 26; Elena
      de White, «El conflicto de los siglos», pág. 671-672.`) },

    { t: '🧭 ¿Por qué ahora copas de ira? (15:1, 7)', capa: 'contexto', h:
      hi(`Las copas están «llenas de la ira de Dios» porque llegan cuando la
      gracia ya se cerró (Bohr). Elena de White explica la diferencia:
      <strong>todos los juicios anteriores</strong> al cierre de la gracia
      «fueron mitigados con misericordia», porque la sangre de Cristo todavía
      cubría al pecador; en las siete plagas la ira cae «sin mezcla de
      misericordia».<br><br>
      Dios es «lento en iras»: espera hasta que una nación o un sistema llena
      la medida de su maldad. Por eso las plagas no son un llamado al
      arrepentimiento, sino la respuesta final a quienes ya decidieron.`) +
      wa(`La aplicación es para hoy: todavía estamos en tiempo de gracia. El
      mensaje de Apocalipsis 15 no es miedo, sino una invitación a decidirse
      mientras la puerta sigue abierta.`) +
      hi(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 685-687;
      Bohr, «15 principios de interpretación profética», tomo 2, pág. 28.`) },
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
    { t: 'mc', v: '15:1', f: 'c',
      q: 'En la interpretación adventista (según Bohr), ¿cuándo se derraman las siete plagas postreras de Apocalipsis 15:1?',
      o: ['Después de que se cierra la puerta de la gracia', 'Durante los 1260 años de la Edad Media', 'Antes de que se predique el fuerte pregón', 'Durante los mil años después de la venida'], a: 0,
      e: 'Bohr: las siete plagas caen «después que se cierre la puerta de la gracia (Apocalipsis 15:5-8)». Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 221.' },
    { t: 'mc', v: '15:2', f: 'c',
      q: 'Según Bohr, ¿quiénes están de pie sobre el mar de vidrio en Apocalipsis 15:2?',
      o: ['El remanente que venció en la crisis final', 'Los ángeles que no siguieron a Lucifer', 'Los profetas del Antiguo Testamento', 'Los mártires de los primeros siglos cristianos'], a: 0,
      e: 'Para Bohr es el remanente final, el que venció a la bestia, su imagen y su marca; por eso canta el cántico de la liberación. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 236-238.' },
    { t: 'mc', v: '15:3', f: 'c',
      q: 'Según Bohr, ¿por qué los vencedores cantan «el cántico de Moisés» (Apocalipsis 15:3)?',
      o: ['Porque la liberación final repite el éxodo de Egipto', 'Porque recuerda la entrega de la ley en el Sinaí', 'Porque Moisés resucitará para cantar con ellos', 'Porque Moisés fue el autor del libro de los Salmos'], a: 0,
      e: 'Bohr: la experiencia de Israel al salir de Egipto es un tipo (un modelo) de la liberación final; los sucesos que llevaron a cantar en Éxodo 15 se repiten en escala mundial. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 230 y 238.' },
    { t: 'tf', v: '15:3', f: 'c',
      q: 'Según Bohr, en el éxodo hubo tinieblas para los egipcios y luz para Israel, igual que en la quinta plaga del fin.', a: true,
      e: 'Verdadero: Bohr compara Éxodo 14:19-20 (nube oscura para Egipto, luz para Israel) con la quinta plaga, y el mar que se seca con la sexta. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 225-226.' },
    { t: 'mc', v: '15:5', f: 'c',
      q: 'Según Bohr, ¿qué marca Apocalipsis 15:5-8 dentro del libro?',
      o: ['El final del juicio en el santuario del cielo', 'El comienzo del juicio en el año 1844', 'La destrucción de Jerusalén en el año 70', 'El nacimiento de la iglesia de los apóstoles'], a: 0,
      e: 'Bohr: Apocalipsis 11:19 abre el templo y marca el comienzo del juicio (1844); 15:5-8 marca su final, cuando termina la intercesión y salen las plagas. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 93-94.' },
    { t: 'mc', v: '15:5', f: 'c',
      q: 'Según Bohr, ¿a qué parte del santuario se refiere «el templo» del tabernáculo del testimonio en Apocalipsis 15:5?',
      o: ['Al lugar santísimo', 'Al atrio de afuera', 'Al altar del holocausto', 'Al lugar del candelero'], a: 0,
      e: 'Bohr: el «tabernáculo del testimonio» es todo el santuario celestial; el «templo» (en griego naos) es el lugar santísimo, «el templo del templo». Fuente: Bohr, «Culto en el trono de Satanás», pág. 26.' },
    { t: 'mc', v: '15:8', f: 'c',
      q: 'Según Elena de White, ¿qué texto anuncia Jesús cuando deja de interceder en el santuario?',
      o: ['«El que es injusto, sea injusto aún»', '«Consumado es»', '«He aquí, yo hago nuevas todas las cosas»', '«Venid, benditos de mi Padre»'], a: 0,
      e: 'Elena de White: Jesús dice «Hecho es» y anuncia Apocalipsis 22:11: «El que es injusto, sea injusto aún…». Cada caso ya fue decidido. Fuente: Elena de White, «El conflicto de los siglos», pág. 671.' },
    { t: 'tf', v: '15:8', f: 'c',
      q: 'Según Elena de White, después del cierre de la gracia los justos viven sin intercesor, a la vista del santo Dios.', a: true,
      e: 'Verdadero: «los justos deben vivir sin intercesor, a la vista del santo Dios», aunque Dios los protege. Fuente: Elena de White, «El conflicto de los siglos», pág. 672.' },
    { t: 'mc', v: '15:8', f: 'c',
      q: 'Según Bohr, ¿qué historia del Antiguo Testamento se parece al cierre de la gracia de Apocalipsis 15:8?',
      o: ['La puerta del arca de Noé que se cerró', 'La caída de los muros de Jericó', 'El paso del río Jordán con Josué', 'La confusión de lenguas en Babel'], a: 0,
      e: 'Bohr: como en los días de Noé, primero se predica con poder, luego se cierra la puerta y después viene la destrucción. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 158.' },
    { t: 'mc', v: '15:8', f: 'c',
      q: 'Según Bohr, ¿qué texto de Daniel describe el mismo momento que Apocalipsis 15:5-8?',
      o: ['Daniel 12:1, cuando se levanta Miguel', 'Daniel 8:14, la purificación del santuario', 'Daniel 9:27, a la mitad de la semana', 'Daniel 7:9, cuando se ponen los tronos'], a: 0,
      e: 'Bohr: «se levantará Miguel» (Daniel 12:1) es cuando Jesús comienza a reinar porque el número de sus súbditos está completo; es el cierre de la intercesión de 15:5-8. Daniel 8:14 y 7:9 hablan del comienzo del juicio. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 28.' },
    { t: 'tf', v: '15:7', f: 'c',
      q: 'Según Elena de White, los juicios de Dios antes del cierre de la gracia venían mezclados con misericordia, pero las siete plagas no.', a: true,
      e: 'Verdadero: «Todos los juicios que cayeron sobre los hombres antes del fin del tiempo de gracia fueron mitigados con misericordia»; en las plagas la ira cae sin esa mezcla. Fuente: Elena de White, «El conflicto de los siglos», pág. 687.' },
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
