/* Apocalipsis 16 — Las siete copas de la ira de Dios y Armagedón.
   Hecho sobre el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap16', label: 'Apocalipsis 16', sub: 'Las siete copas y Armagedón', vs: 21,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Una gran voz desde el templo manda a los siete ángeles:
      <strong>«Id y derramad sobre la tierra las siete copas de la ira de
      Dios»</strong> (16:1).<br><br>
      Cada ángel derrama su copa en un lugar distinto: la
      <strong>tierra</strong>, el <strong>mar</strong>, los
      <strong>ríos</strong>, el <strong>sol</strong>, el <strong>trono de la
      bestia</strong>, el <strong>río Éufrates</strong> y el
      <strong>aire</strong>.<br><br>
      En medio de las copas se oye: <strong>«Yo vengo como
      ladrón»</strong> (16:15). Y con la última copa, una voz desde el trono
      dice: <strong>«¡Ya está hecho!»</strong> (16:17).<br><br>
      <em>La idea del capítulo: Dios es justo, y su pueblo debe estar
      despierto y listo porque Jesús viene.</em>`) },

    { t: '📣 La orden y la primera copa (16:1-2)', capa: 'nucleo', h:
      hi(`Juan oyó <strong>desde el templo una gran voz</strong> que decía a
      los siete ángeles: <strong>«Id y derramad sobre la tierra las siete copas
      de la ira de Dios»</strong> (16:1).<br><br>
      El primero derramó su copa <strong>sobre la tierra</strong>, y vino
      <strong>«una úlcera maligna y pestilente»</strong> (16:2).`) +
      wa(`Ojo a quiénes les cae: <strong>«sobre los hombres que tenían la
      marca de la bestia y que adoraban su imagen»</strong> (16:2). No dice
      que les cayera a todos.`) },

    { t: '🌊 El mar y las aguas (16:3-7)', capa: 'nucleo', h:
      li([`<strong>Segunda copa: el mar.</strong> Se convirtió en
           <strong>«sangre como de muerto»</strong>, y murió
           <strong>todo</strong> ser viviente que había en el mar (16:3).`,
          `<strong>Tercera copa: los ríos y las fuentes de las aguas.</strong>
           Se convirtieron en sangre (16:4).`]) +
      tbl(['Quién habla', 'Qué dice'], [
        ['<strong>El ángel de las aguas</strong> (16:5-6)', '«Justo eres tú, Señor, el que eres y que eras, el Santo, porque has juzgado estas cosas.» Ellos derramaron la sangre de los santos y de los profetas, y ahora beben sangre.'],
        ['<strong>Otro, desde el altar</strong> (16:7)', '«¡Ciertamente, Señor Dios Todopoderoso, tus juicios son verdaderos y justos!»'],
      ]) +
      hi(`<strong>«Por cuanto derramaron la sangre de los santos y de los
      profetas, también tú les has dado a beber sangre»</strong> (16:6).`) },

    { t: '☀️ El sol y el trono de la bestia (16:8-11)', capa: 'nucleo', h:
      tbl(['Copa', 'Dónde', 'Qué pasó'], [
        ['4ª', '<strong>Sobre el sol</strong> (16:8)', 'Se le permitió <strong>quemar a los hombres con fuego</strong>; fueron quemados con el gran calor (16:8-9)'],
        ['5ª', '<strong>Sobre el trono de la bestia</strong> (16:10)', 'Su reino <strong>se cubrió de tinieblas</strong>; la gente <strong>se mordía la lengua</strong> por el dolor (16:10)'],
      ]) +
      wa(`Las dos veces la gente reacciona igual: <strong>blasfemaron</strong>
      y <strong>no se arrepintieron</strong> (16:9, 16:11). En 16:11
      blasfemaron <strong>«por sus dolores y por sus úlceras»</strong>: las
      úlceras recuerdan las de la primera copa (16:2).`) },

    { t: '🐸 El Éufrates y las tres ranas (16:12-14)', capa: 'nucleo', h:
      hi(`El sexto ángel derramó su copa <strong>«sobre el gran río
      Éufrates»</strong>, y el agua se secó <strong>«para preparar el camino a
      los reyes del oriente»</strong> (16:12).`) +
      hi(`Salieron <strong>de la boca del dragón, de la boca de la bestia y de
      la boca del falso profeta</strong> (16:13).`) +
      li([`Son <strong>tres</strong> espíritus <strong>semejantes a
           ranas</strong> (16:13).`,
          `Son <strong>«espíritus de demonios, que hacen señales»</strong>
           (16:14).`,
          `Van a <strong>los reyes de la tierra en todo el mundo</strong> para
           reunirlos <strong>«para la batalla de aquel gran día del Dios
           Todopoderoso»</strong> (16:14).`]) },

    { t: '⏰ «Yo vengo como ladrón» y Armagedón (16:15-16)', capa: 'nucleo', h:
      hi(`En medio de las copas se oye esta promesa: <strong>«Yo vengo como ladrón.
      Bienaventurado el que vela y guarda sus vestiduras, no sea que ande
      desnudo y vean su vergüenza»</strong> (16:15).<br><br>
      Es la <strong>tercera</strong> de las siete bienaventuranzas del libro
      (la primera está en 1:3). El texto no dice quién habla, pero es la
      misma promesa de Jesús a Sardis: «vendré sobre ti como ladrón» (3:3).`) +
      hi(`<strong>«Y los reunió en el lugar que en hebreo se llama
      Armagedón»</strong> (16:16).`) +
      wa(`Armagedón es el nombre del <strong>lugar</strong> donde los reúnen, y
      el texto dice que es un nombre <strong>en hebreo</strong>. El capítulo
      no cuenta la batalla: solo la reunión.`) },

    { t: '⚡ La séptima copa (16:17-21)', capa: 'nucleo', h:
      hi(`El séptimo ángel derramó su copa <strong>por el aire</strong>, y una
      gran voz <strong>del santuario del cielo, desde el trono</strong>, dijo:
      <strong>«¡Ya está hecho!»</strong> (16:17).`) +
      tbl(['Qué pasó', 'Texto'], [
        ['En el cielo y la tierra', 'Relámpagos, voces, truenos y un gran temblor de tierra (16:18)'],
        ['El terremoto', '<strong>«tan grande cual no lo hubo jamás desde que los hombres existen sobre la tierra»</strong> (16:18)'],
        ['La gran ciudad', 'Se dividió en <strong>tres partes</strong> (16:19)'],
        ['Las ciudades de las naciones', '<strong>Cayeron</strong> (16:19)'],
        ['La gran Babilonia', 'Vino en memoria delante de Dios, para darle el cáliz del vino del ardor de su ira (16:19)'],
        ['Islas y montes', '<strong>«Toda isla huyó y los montes ya no fueron hallados»</strong> (16:20)'],
        ['El granizo', 'Enorme, <strong>«como del peso de un talento»</strong> (16:21)'],
      ]) +
      wa(`Hasta el final los hombres <strong>blasfemaron contra Dios</strong>
      por la plaga del granizo (16:21).`) },

    { t: '📋 Las siete copas de un vistazo (16:2-21)', capa: 'nucleo', h:
      tbl(['Copa', 'Dónde se derrama', 'Qué pasa'], [
        ['1ª', 'La tierra (16:2)', 'Úlcera maligna y pestilente en los que tenían la marca de la bestia'],
        ['2ª', 'El mar (16:3)', 'Sangre como de muerto; muere todo ser viviente del mar'],
        ['3ª', 'Los ríos y las fuentes (16:4)', 'Se convierten en sangre'],
        ['4ª', 'El sol (16:8)', 'Quema a los hombres con fuego'],
        ['5ª', 'El trono de la bestia (16:10)', 'Su reino se cubre de tinieblas'],
        ['6ª', 'El gran río Éufrates (16:12)', 'Se seca para los reyes del oriente'],
        ['7ª', 'El aire (16:17)', '«¡Ya está hecho!», terremoto y granizo'],
      ]) },

    { t: '🎺 No las confundas: copas y trompetas (16:2-21)', capa: 'nucleo', h:
      wa(`Las trompetas (capítulos 8 a 11) y las copas siguen casi el mismo
      orden de lugares. Una diferencia: en las trompetas se repite <strong>«la
      tercera parte»</strong> (8:7-12; 9:15); en las copas no hay tercera
      parte: por ejemplo, el mar se vuelve sangre y muere <strong>todo</strong>
      ser viviente que había en él (16:3).`) +
      tbl(['#', 'Trompeta', 'Copa'], [
        ['1', 'Granizo y fuego con sangre; tercera parte de los árboles (8:7)', 'Úlcera en los que tienen la marca (16:2)'],
        ['2', 'Un gran monte ardiendo cae al mar; tercera parte del mar en sangre (8:8)', 'Todo el mar en sangre; muere todo ser viviente (16:3)'],
        ['3', 'La estrella Ajenjo cae en ríos y fuentes (8:10-11)', 'Ríos y fuentes en sangre (16:4)'],
        ['4', 'Se oscurece la tercera parte del sol, la luna y las estrellas (8:12)', 'El sol quema a los hombres (16:8)'],
        ['5', 'El pozo del abismo y las langostas (9:1-3)', 'Tinieblas en el reino de la bestia (16:10)'],
        ['6', 'Se desatan cuatro ángeles junto al Éufrates (9:14)', 'Se seca el Éufrates (16:12)'],
        ['7', 'Grandes voces: «Los reinos del mundo…» (11:15)', '«¡Ya está hecho!» (16:17)'],
      ]) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · Las <strong>siete plagas postreras</strong> caen después de que se
      cierra el tiempo de gracia (15:8) y solo sobre los que recibieron la
      marca de la bestia (la primera, dice el texto, cae sobre ellos: 16:2).
      Dios protege a su pueblo durante ellas, como
      promete el Salmo 91 («El conflicto de los siglos», cap. «El tiempo de
      angustia»).<br>
      · Los <strong>espíritus semejantes a ranas</strong> que hacen señales se
      leen como el engaño de los milagros falsos y del espiritismo en el
      tiempo del fin. El dragón, la bestia y el falso profeta se entienden
      como <strong>poderes y sistemas</strong> que se unen contra Dios, no
      como las personas sinceras que hay en todas las iglesias.<br>
      · <strong>Armagedón</strong> (16:16) se entiende como el conflicto
      final entre Cristo y las fuerzas del mal, más que como una guerra
      entre naciones por un territorio.<br>
      · <strong>«Yo vengo como ladrón»</strong> (16:15) es un llamado a estar
      preparados hoy: velar y guardar las vestiduras es vivir vestidos de la
      justicia de Cristo.`) },
  ],

  preguntas: [
    { t: 'mc', v: '16:1', lit: 'oí desde el templo una gran voz',
      q: '¿Desde dónde oyó Juan la gran voz que mandó derramar las copas? (Apocalipsis 16:1)',
      o: ['Desde el templo', 'Desde el altar', 'Desde el monte de Sión', 'Desde el desierto'], a: 0,
      e: '«Entonces oí desde el templo una gran voz que decía a los siete ángeles…» (16:1).' },
    { t: 'fill', v: '16:1', ins: 'Apocalipsis 16:1 (RV1995) — Completa:',
      p: [{ x: '«Id y derramad sobre la ' }, { b: 'tierra', h: '¿sobre dónde?' }, { x: ' las siete ' }, { b: 'copas', h: '¿las siete qué?' }, { x: ' de la ira de Dios.»' }] },
    { t: 'mc', v: '16:2', lit: 'una úlcera maligna y pestilente',
      q: '¿Qué vino cuando el primer ángel derramó su copa sobre la tierra? (Apocalipsis 16:2)',
      o: ['Una úlcera maligna y pestilente', 'Granizo y fuego mezclados con sangre', 'Langostas con poder de escorpiones', 'Un gran terremoto y tinieblas'], a: 0,
      e: '«…vino una úlcera maligna y pestilente» (16:2). El granizo y fuego con sangre es de la primera trompeta (8:7).' },
    { t: 'mc', v: '16:2', lit: 'sobre los hombres que tenían la marca de la bestia',
      q: 'Según Apocalipsis 16:2, ¿sobre quiénes vino la úlcera de la primera copa?',
      o: ['Sobre los que tenían la marca de la bestia', 'Sobre todos los habitantes de la tierra', 'Sobre la tercera parte de los hombres', 'Sobre los reyes y los capitanes'], a: 0,
      e: '«…sobre los hombres que tenían la marca de la bestia y que adoraban su imagen» (16:2).' },
    { t: 'mc', v: '16:3', lit: 'se convirtió en sangre como de muerto',
      q: '¿En qué se convirtió el mar con la segunda copa? (Apocalipsis 16:3)',
      o: ['En sangre como de muerto', 'En aguas amargas de ajenjo', 'En vidrio mezclado con fuego', 'En humo como de un horno'], a: 0,
      e: '«…éste se convirtió en sangre como de muerto» (16:3).' },
    { t: 'tf', v: '16:3',
      q: 'Con la segunda copa murió la tercera parte de los seres vivientes del mar. (Apocalipsis 16:3)', a: false,
      e: 'Falso: «murió TODO ser viviente que había en el mar» (16:3). La tercera parte es de la segunda trompeta (8:9).' },
    { t: 'mc', v: '16:4', lit: 'sobre los ríos y sobre las fuentes de las aguas',
      q: '¿Sobre qué derramó su copa el tercer ángel? (Apocalipsis 16:4)',
      o: ['Sobre los ríos y las fuentes de las aguas', 'Sobre el mar y todos los seres que lo habitan', 'Sobre el sol, la luna y las estrellas', 'Sobre el trono y el reino de la bestia'], a: 0,
      e: '«El tercer ángel derramó su copa sobre los ríos y sobre las fuentes de las aguas, y se convirtieron en sangre» (16:4).' },
    { t: 'mc', v: '16:5', lit: 'el ángel de las aguas',
      q: '¿Quién dijo «Justo eres tú, Señor… porque has juzgado estas cosas»? (Apocalipsis 16:5)',
      o: ['El ángel de las aguas', 'Uno de los veinticuatro ancianos', 'El ángel del evangelio eterno', 'Uno de los cuatro seres vivientes'], a: 0,
      e: '«Y oí que el ángel de las aguas decía: "Justo eres tú, Señor…"» (16:5).' },
    { t: 'mc', v: '16:5', lit: 'Justo eres tú, Señor, el que eres y que eras',
      q: '¿Qué texto dice «Justo eres tú, Señor, el que eres y que eras, el Santo»?',
      o: ['Apocalipsis 16:5', 'Apocalipsis 16:7', 'Apocalipsis 15:3', 'Apocalipsis 16:1'], a: 0,
      e: 'Apocalipsis 16:5, palabras del ángel de las aguas.' },
    { t: 'mc', v: '16:6', lit: 'derramaron la sangre de los santos y de los profetas',
      q: 'Según Apocalipsis 16:6, ¿por qué Dios les dio a beber sangre?',
      o: ['Porque derramaron la sangre de los santos y de los profetas', 'Porque adoraron a la bestia y recibieron su marca', 'Porque bebieron el vino de la gran Babilonia', 'Porque no quisieron oír a los dos testigos'], a: 0,
      e: '«Por cuanto derramaron la sangre de los santos y de los profetas, también tú les has dado a beber sangre» (16:6).' },
    { t: 'tf', v: '16:6',
      q: 'El ángel de las aguas dice que a los que derramaron sangre de santos se les dio a beber sangre, «pues se lo merecen». (Apocalipsis 16:6)', a: true,
      e: 'Verdadero (Apocalipsis 16:6).' },
    { t: 'mc', v: '16:7', lit: 'desde el altar decía',
      q: '¿Desde dónde habló el que dijo «¡Ciertamente, Señor Dios Todopoderoso, tus juicios son verdaderos y justos!»? (Apocalipsis 16:7)',
      o: ['Desde el altar', 'Desde el trono', 'Desde las aguas', 'Desde la nube'], a: 0,
      e: '«También oí a otro, que desde el altar decía…» (16:7).' },
    { t: 'fill', v: '16:7', ins: 'Apocalipsis 16:7 (RV1995) — Completa:',
      p: [{ x: '«¡Ciertamente, Señor Dios Todopoderoso, tus ' }, { b: 'juicios', h: '¿tus qué?' }, { x: ' son ' }, { b: 'verdaderos', h: '¿cómo son?' }, { x: ' y justos!»' }] },
    { t: 'mc', v: '16:8', lit: 'derramó su copa sobre el sol',
      q: '¿Sobre qué derramó su copa el cuarto ángel? (Apocalipsis 16:8)',
      o: ['Sobre el sol', 'Sobre la luna', 'Sobre las estrellas', 'Sobre el aire'], a: 0,
      e: '«El cuarto ángel derramó su copa sobre el sol, al cual le fue permitido quemar a los hombres con fuego» (16:8).' },
    { t: 'mc', v: '16:9', lit: 'blasfemaron el nombre de Dios',
      q: '¿Qué hicieron los hombres quemados por el gran calor? (Apocalipsis 16:9)',
      o: ['Blasfemaron el nombre de Dios y no se arrepintieron', 'Se arrepintieron y dieron gloria al Dios del cielo', 'Huyeron a los montes y se escondieron en las cuevas', 'Pidieron a los montes que cayeran sobre ellos'], a: 0,
      e: '«…blasfemaron el nombre de Dios… y no se arrepintieron para darle gloria» (16:9). Los que «dieron gloria al Dios del cielo» son los de 11:13.' },
    { t: 'tf', v: '16:9',
      q: 'Apocalipsis 16:9 dice que Dios tiene poder sobre estas plagas.', a: true,
      e: 'Verdadero: «…el nombre de Dios, que tiene poder sobre estas plagas» (16:9).' },
    { t: 'mc', v: '16:10', lit: 'sobre el trono de la bestia',
      q: '¿Sobre qué derramó su copa el quinto ángel? (Apocalipsis 16:10)',
      o: ['Sobre el trono de la bestia', 'Sobre el gran río Éufrates', 'Sobre el pozo del abismo', 'Sobre la gran Babilonia'], a: 0,
      e: '«El quinto ángel derramó su copa sobre el trono de la bestia» (16:10).' },
    { t: 'mc', v: '16:10', lit: 'su reino se cubrió de tinieblas',
      q: 'Según Apocalipsis 16:10, ¿qué le pasó al reino de la bestia?',
      o: ['Se cubrió de tinieblas', 'Se dividió en tres partes', 'Fue quemado con fuego', 'Se convirtió en desierto'], a: 0,
      e: '«…y su reino se cubrió de tinieblas» (16:10). La ciudad dividida en tres partes es de la séptima copa (16:19).' },
    { t: 'tf', v: '16:10',
      q: 'Con la quinta copa, la gente se mordía los labios por causa del dolor. (Apocalipsis 16:10)', a: false,
      e: 'Falso: «La gente se mordía la LENGUA por causa del dolor» (16:10).' },
    { t: 'mc', v: '16:11', lit: 'por sus dolores y por sus úlceras',
      q: 'Según Apocalipsis 16:11, ¿por qué blasfemaron contra el Dios del cielo?',
      o: ['Por sus dolores y por sus úlceras', 'Por el gran calor y el granizo', 'Por el hambre y por la sed', 'Por las tinieblas y el frío'], a: 0,
      e: '«…y blasfemaron contra el Dios del cielo por sus dolores y por sus úlceras» (16:11).' },
    { t: 'tf', v: '16:11',
      q: 'Después de la quinta copa, los hombres no se arrepintieron de sus obras. (Apocalipsis 16:11)', a: true,
      e: 'Verdadero: «…y no se arrepintieron de sus obras» (16:11).' },
    { t: 'mc', v: '16:12', lit: 'sobre el gran río Éufrates',
      q: '¿Sobre qué río derramó su copa el sexto ángel? (Apocalipsis 16:12)',
      o: ['El Éufrates', 'El Jordán', 'El Nilo', 'El Tigris'], a: 0,
      e: '«El sexto ángel derramó su copa sobre el gran río Éufrates» (16:12).' },
    { t: 'mc', v: '16:12', lit: 'preparar el camino a los reyes del oriente',
      q: 'Según Apocalipsis 16:12, ¿para qué se secó el agua del Éufrates?',
      o: ['Para preparar el camino a los reyes del oriente', 'Para que pasaran los ejércitos del cielo', 'Para que la mujer huyera al desierto', 'Para que el dragón no arrastrara a la mujer'], a: 0,
      e: '«…el agua de éste se secó para preparar el camino a los reyes del oriente» (16:12).' },
    { t: 'fill', v: '16:12', ins: 'Apocalipsis 16:12 (RV1995) — Completa:',
      p: [{ x: '«El sexto ángel derramó su copa sobre el gran río ' }, { b: 'Éufrates', h: '¿qué río?' }, { x: ', y el agua de éste se secó para preparar el camino a los reyes del ' }, { b: 'oriente', h: '¿reyes de dónde?' }, { x: '.»' }] },
    { t: 'mc', v: '16:13', lit: 'tres espíritus inmundos semejantes a ranas',
      q: '¿A qué eran semejantes los espíritus inmundos de Apocalipsis 16:13?',
      o: ['A ranas', 'A langostas', 'A escorpiones', 'A serpientes'], a: 0,
      e: '«…tres espíritus inmundos semejantes a ranas» (16:13). Las langostas con poder de escorpiones son de la quinta trompeta (9:3).' },
    { t: 'mc', v: '16:13', lit: 'de la boca del dragón, de la boca de la bestia y de la boca del falso profeta',
      q: 'Según Apocalipsis 16:13, ¿de qué tres bocas salieron los espíritus inmundos?',
      o: ['Del dragón, de la bestia y del falso profeta', 'Del dragón, de la serpiente y de la ramera', 'De la bestia, de su imagen y de los reyes', 'Del falso profeta, de Babilonia y del abismo'], a: 0,
      e: '«Vi salir de la boca del dragón, de la boca de la bestia y de la boca del falso profeta…» (16:13).' },
    { t: 'tf', v: '16:13',
      q: 'Juan vio salir siete espíritus inmundos semejantes a ranas. (Apocalipsis 16:13)', a: false,
      e: 'Falso: eran TRES espíritus inmundos, que salieron de la boca del dragón, de la bestia y del falso profeta (16:13).' },
    { t: 'mc', v: '16:14', lit: 'para la batalla de aquel gran día del Dios Todopoderoso',
      q: 'Según Apocalipsis 16:14, ¿para qué reúnen los espíritus de demonios a los reyes de la tierra?',
      o: ['Para la batalla del gran día del Dios Todopoderoso', 'Para adorar la imagen de la bestia en su templo', 'Para destruir a la gran ramera y quemarla', 'Para poner la marca a pequeños y grandes'], a: 0,
      e: '«…para reunirlos para la batalla de aquel gran día del Dios Todopoderoso» (16:14).' },
    { t: 'tf', v: '16:14',
      q: 'Los espíritus inmundos de Apocalipsis 16:14 son espíritus de demonios que hacen señales.', a: true,
      e: 'Verdadero: «Son espíritus de demonios, que hacen señales» (16:14).' },
    { t: 'mc', v: '16:15', lit: 'Yo vengo como ladrón',
      q: '¿Qué texto dice «Yo vengo como ladrón»?',
      o: ['Apocalipsis 16:15', 'Apocalipsis 16:17', 'Apocalipsis 16:13', 'Apocalipsis 16:12'], a: 0,
      e: 'Apocalipsis 16:15, en medio de la sexta y la séptima copa. Jesús ya había dicho algo parecido a Sardis (3:3).' },
    { t: 'mc', v: '16:15', lit: 'Bienaventurado el que vela y guarda sus vestiduras',
      q: 'Según Apocalipsis 16:15, ¿quién es bienaventurado?',
      o: ['El que vela y guarda sus vestiduras', 'El que lee y oye las palabras de la profecía', 'El que muere en el Señor de aquí en adelante', 'El que es llamado a la cena de las bodas'], a: 0,
      e: '«Bienaventurado el que vela y guarda sus vestiduras» (16:15). Las otras son bienaventuranzas de 1:3, 14:13 y 19:9.' },
    { t: 'fill', v: '16:15', ins: 'Apocalipsis 16:15 (RV1995) — Completa:',
      p: [{ x: '«Yo vengo como ' }, { b: 'ladrón', h: '¿como quién?' }, { x: '. Bienaventurado el que ' }, { b: 'vela', h: '¿qué hace?' }, { x: ' y guarda sus ' }, { b: 'vestiduras', h: '¿guarda qué?' }, { x: '…' }] },
    { t: 'mc', v: '16:16', lit: 'en hebreo se llama Armagedón',
      q: '¿Cómo se llama el lugar donde los espíritus reunieron a los reyes? (Apocalipsis 16:16)',
      o: ['Armagedón', 'Gólgota', 'Getsemaní', 'Betel'], a: 0,
      e: '«Y los reunió en el lugar que en hebreo se llama Armagedón» (16:16).' },
    { t: 'tf', v: '16:16',
      q: 'Según Apocalipsis 16:16, Armagedón es el nombre del lugar en griego.', a: false,
      e: 'Falso: «el lugar que en HEBREO se llama Armagedón» (16:16).' },
    { t: 'mc', v: '16:17', lit: 'derramó su copa por el aire',
      q: '¿Por dónde derramó su copa el séptimo ángel? (Apocalipsis 16:17)',
      o: ['Por el aire', 'Sobre el mar', 'Sobre el sol', 'Sobre la tierra'], a: 0,
      e: '«El séptimo ángel derramó su copa por el aire» (16:17).' },
    { t: 'mc', v: '16:17', lit: '¡Ya está hecho!',
      q: '¿Qué dijo la gran voz del santuario, desde el trono, en la séptima copa? (Apocalipsis 16:17)',
      o: ['«¡Ya está hecho!»', '«¡Ha caído Babilonia!»', '«¡He aquí, vengo pronto!»', '«¡Salid de ella, pueblo mío!»'], a: 0,
      e: '«…una gran voz del santuario del cielo, desde el trono, que decía: "¡Ya está hecho!"» (16:17).' },
    { t: 'mc', v: '16:18', lit: 'cual no lo hubo jamás desde que los hombres existen sobre la tierra',
      q: 'Según Apocalipsis 16:18, ¿cómo fue el terremoto de la séptima copa?',
      o: ['Como nunca lo hubo desde que existen los hombres', 'Mató a siete mil hombres en la gran ciudad', 'Derrumbó la décima parte de la gran ciudad', 'Hizo caer las estrellas del cielo a la tierra'], a: 0,
      e: '«…un terremoto tan grande cual no lo hubo jamás desde que los hombres existen sobre la tierra» (16:18). Los siete mil muertos y la décima parte son de 11:13.' },
    { t: 'tf', v: '16:18',
      q: 'Con la séptima copa hubo relámpagos, voces, truenos y un gran temblor de tierra. (Apocalipsis 16:18)', a: true,
      e: 'Verdadero (Apocalipsis 16:18).' },
    { t: 'mc', v: '16:19', lit: 'se dividió en tres partes',
      q: '¿En cuántas partes se dividió la gran ciudad? (Apocalipsis 16:19)',
      o: ['En tres', 'En dos', 'En siete', 'En diez'], a: 0,
      e: '«La gran ciudad se dividió en tres partes y las ciudades de las naciones cayeron» (16:19).' },
    { t: 'mc', v: '16:19', lit: 'La gran Babilonia vino en memoria delante de Dios',
      q: 'Según Apocalipsis 16:19, ¿qué ciudad vino en memoria delante de Dios para darle el cáliz del vino del ardor de su ira?',
      o: ['La gran Babilonia', 'Sodoma y Egipto', 'Jerusalén la santa', 'La ciudad de Nínive'], a: 0,
      e: '«La gran Babilonia vino en memoria delante de Dios, para darle el cáliz del vino del ardor de su ira» (16:19).' },
    { t: 'mc', v: '16:20', lit: 'Toda isla huyó y los montes ya no fueron hallados',
      q: '¿Qué pasó con las islas y los montes en la séptima copa? (Apocalipsis 16:20)',
      o: ['Toda isla huyó y los montes no fueron hallados', 'Se cubrieron de humo y de tinieblas', 'Se llenaron de langostas y de escorpiones', 'Se convirtieron en sangre como de muerto'], a: 0,
      e: '«Toda isla huyó y los montes ya no fueron hallados» (16:20).' },
    { t: 'mc', v: '16:21', lit: 'como del peso de un talento',
      q: '¿Cuánto pesaba el enorme granizo de Apocalipsis 16:21?',
      o: ['Como un talento', 'Como una mina', 'Como un siclo', 'Como una libra'], a: 0,
      e: '«Del cielo cayó sobre los hombres un enorme granizo, como del peso de un talento» (16:21).' },
    { t: 'tf', v: '16:21',
      q: 'Por la plaga del granizo, los hombres blasfemaron contra Dios. (Apocalipsis 16:21)', a: true,
      e: 'Verdadero: «…los hombres blasfemaron contra Dios por la plaga del granizo, porque su plaga fue sumamente grande» (16:21).' },
    { t: 'mc', v: '16:2', f: 'c',
      q: 'En la lectura adventista, ¿cuándo caen las siete plagas postreras de Apocalipsis 16?',
      o: ['Después de que se cierra el tiempo de gracia', 'Al principio de la historia de la iglesia', 'Mientras se predica el evangelio eterno', 'Durante los mil años después de la venida'], a: 0,
      e: 'Interpretación: caen cuando ya se cerró el tiempo de gracia (15:8) y Dios protege a su pueblo («El conflicto de los siglos»). El texto dice que la primera cae «sobre los hombres que tenían la marca de la bestia» (16:2).' },
    { t: 'mc', v: '16:13-14', f: 'c',
      q: 'En la interpretación adventista, ¿qué representan los espíritus semejantes a ranas que hacen señales (Apocalipsis 16:13-14)?',
      o: ['El engaño de los milagros falsos y el espiritismo', 'Las plagas de Egipto que volverán tal cual', 'Los ejércitos de los reyes del oriente', 'Los ángeles que derraman las siete copas'], a: 0,
      e: 'Interpretación: el engaño final por medio de señales y del espiritismo. El texto dice que «son espíritus de demonios, que hacen señales» (16:14).' },
    { t: 'mc', v: '16:16', f: 'c',
      q: 'En la lectura adventista, ¿qué es Armagedón (Apocalipsis 16:16)?',
      o: ['El conflicto final entre Cristo y las fuerzas del mal', 'Una guerra entre dos naciones por un territorio', 'El lugar donde Juan escribió el Apocalipsis', 'El nombre del ángel de la séptima copa'], a: 0,
      e: 'Interpretación: la batalla final del gran conflicto, más que una guerra entre naciones. El texto solo dice: «Y los reunió en el lugar que en hebreo se llama Armagedón» (16:16).' },
  ],

  tarjetas: [
    { f: 'Desde dónde se ordenó derramar las copas (16:1)', r: 'Desde el templo, con una gran voz' },
    { f: 'Las siete copas, dónde se derraman (16:2-17)', r: 'Tierra, mar, ríos y fuentes, sol, trono de la bestia, río Éufrates, aire' },
    { f: 'Primera copa (16:2)', r: 'Úlcera maligna y pestilente en los que tenían la marca de la bestia y adoraban su imagen' },
    { f: 'Copas frente a trompetas', r: 'Trompetas: se repite «la tercera parte» (8:7-12; 9:15). Copas: no hay tercera parte; en la segunda muere todo ser viviente del mar (16:3)' },
    { f: 'Quiénes alaban los juicios de Dios (16:5-7)', r: 'El ángel de las aguas y otro desde el altar' },
    { f: 'Quinta copa (16:10)', r: 'Sobre el trono de la bestia: su reino se cubrió de tinieblas' },
    { f: 'Sexta copa (16:12)', r: 'Se secó el Éufrates para preparar el camino a los reyes del oriente' },
    { f: 'Los tres espíritus inmundos (16:13)', r: 'Semejantes a ranas; de la boca del dragón, de la bestia y del falso profeta' },
    { f: '«Yo vengo como ladrón»', r: 'Apocalipsis 16:15: bienaventurado el que vela y guarda sus vestiduras' },
    { f: 'Armagedón (16:16)', r: 'El lugar que en hebreo se llama así, donde reunieron a los reyes' },
    { f: 'Séptima copa (16:17)', r: 'Por el aire; una voz desde el trono: «¡Ya está hecho!»' },
    { f: 'La gran ciudad y el granizo (16:19-21)', r: 'Se dividió en tres partes; granizo como del peso de un talento' },
  ],
};
