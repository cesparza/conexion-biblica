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

    { t: '🧭 Cuándo caen las plagas y sobre quién', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      Las siete copas se derraman cuando Cristo ya dejó de interceder
      (15:5-8). Elena de White dice que entonces cae, sin mezcla, la ira que
      el tercer ángel anunció contra los que adoran a la bestia y reciben su
      marca (14:9-10).`) +
      li([`Son <strong>parecidas a las plagas de Egipto</strong>, que cayeron
           justo antes de que Dios librara a Israel.`,
          `<strong>No son universales</strong>: si cayeran sobre todos, nadie
           quedaría vivo. Pero serán los peores azotes de la historia.`,
          `El <strong>pueblo de Dios</strong> pasa escasez y persecución, pero
           no es abandonado: Dios lo cuida como cuidó a Elías, y se cumple el
           Salmo 91: «ni plaga tocará tu morada».`,
          `Bohr: los que reciben las plagas <strong>no se arrepienten</strong>
           (16:9, 11) porque la gracia ya se cerró y el Espíritu Santo ya no
           los convence de pecado.`,
          `Bohr: las plagas devuelven la tierra a como estaba antes de la
           creación: desordenada, vacía y oscura (Jeremías 4:23-27).`]) +
      hi(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 685-688;
      Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 221-223.`) },

    { t: '🧭 Las primeras cuatro copas (16:2-9)', capa: 'contexto', h:
      tbl(['Copa', 'Lo que destaca la interpretación'], [
        ['1.ª Tierra', 'La úlcera cae solo sobre los que tienen la marca y adoran la imagen: la plaga separa a los dos grupos que formó el mensaje del tercer ángel.'],
        ['2.ª Mar', 'El mar se vuelve sangre y muere todo ser vivo del mar.'],
        ['3.ª Ríos y fuentes', 'Elena de White: los que condenaron a muerte al pueblo de Dios son tan culpables de su sangre como si la hubieran derramado; por eso el ángel declara que Dios es justo (16:5-6).'],
        ['4.ª Sol', 'Calor que quema. Elena de White usa Joel 1 para describir la tierra: cosechas perdidas, árboles secos, ganado sin pastos.'],
      ]) +
      wa(`Bohr nota que Elena de White cita versículos de las cuatro primeras
      plagas y de la séptima, pero no de la quinta ni de la sexta. Aun así,
      dice Bohr, las describe con sus propias palabras (lo verás en las
      secciones siguientes).`) +
      hi(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 686-687;
      Bohr, «¿Cuán cerca al fin?», pág. 327-328.`) },

    { t: '🧭 Quinta copa: tinieblas sobre el trono de la bestia (16:10-11)', capa: 'contexto', h:
      hi(`Para Bohr, esta bestia es la misma de Apocalipsis 13:1-10 y el
      <strong>cuerno pequeño</strong> de Daniel 7: el poder que habló contra el
      Altísimo, persiguió a los santos y gobernó 1260 años. La identifica con
      el <strong>papado como sistema religioso y político</strong>. El
      «trono» es su sede de gobierno y su reino es mundial (13:3, 7).`) +
      li([`Las tinieblas son sobrenaturales y cubren todo su reino.`,
          `Los que se muerden la lengua de dolor entran en pánico y se vuelven
           unos contra otros, como dice Zacarías 14:12-13.`,
          `No se arrepienten, porque la gracia ya se cerró.`]) +
      hi(`¿Dónde lo ve Bohr en Elena de White? Cuando multitudes armadas están
      por atacar de noche al pueblo de Dios para cumplir el decreto de muerte,
      caen «densas tinieblas, más sombrías que la obscuridad de la noche», y
      un arco iris de la gloria de Dios rodea a los que oran.<br><br>
      Se habla de un sistema de poder, no de las personas sinceras que hay en
      él.`) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 222-223 y 228; Elena de White, «El conflicto de los siglos»,
      pág. 692-694.`) },

    { t: '🧭 Sexta copa: el Éufrates se seca (16:12)', capa: 'contexto', h:
      hi(`Bohr lo explica con la caída de la Babilonia antigua (Daniel 5;
      Jeremías 50 y 51): el río Éufrates era su gran defensa. Ciro desvió el
      río, entró con su ejército por el cauce seco la noche en que Babilonia
      bebía vino en sus fiestas, y la ciudad cayó. Así el pueblo de Dios quedó
      libre para volver a Jerusalén. Al final eso se repite, pero en forma
      simbólica y mundial:`) +
      tbl(['Símbolo', 'Significado, según Bohr'], [
        ['El gran río Éufrates', 'Pueblos y naciones que sostienen a Babilonia (Isaías 8:7-8; 17:12-13; Apocalipsis 17:15)'],
        ['Las aguas se secan', 'Esas multitudes le quitan su apoyo y se vuelven contra ella (17:16)'],
        ['Los reyes del oriente', 'Cristo y sus ángeles, que vienen a librar a su pueblo'],
      ]) +
      hi(`Elena de White lo describe sin citar el versículo: «Las multitudes
      encolerizadas se sienten contenidas en el acto», y poco después aparece
      en el este la pequeña nube que trae a Cristo.`) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 223; Bohr, «¿Cuán cerca al fin?», pág. 328-330; Elena de White,
      «El conflicto de los siglos», pág. 694 y 698.`) },

    { t: '🧭 Las ranas: la gran alianza del engaño (16:13-14)', capa: 'contexto', h:
      hi(`Salen tres espíritus de tres bocas. Así identifica Bohr a los tres
      poderes:`) +
      tbl(['Boca', 'Qué representa, según Bohr'], [
        ['El dragón', 'Los poderes civiles del mundo: reyes y gobernantes'],
        ['La bestia', 'El papado (la bestia del mar de Apocalipsis 13)'],
        ['El falso profeta', 'Estados Unidos, la bestia de la tierra, que hará una imagen de la bestia uniendo la iglesia y el estado'],
      ]) +
      hi(`Elena de White cita 16:13-14 al hablar del <strong>espiritismo</strong>
      (la creencia de que se puede hablar con los muertos): por medio de él se
      harán milagros que muchos tomarán como obra de Dios. Y explica la
      alianza: con dos errores, la inmortalidad del alma y la santidad del
      domingo, Satanás unirá al espiritismo, al poder romano y a los
      protestantes de los Estados Unidos.<br><br>
      Son sistemas y poderes. La misma autora dice que en las iglesias hay
      muchos verdaderos hijos de Dios.`) +
      hi(`Fuentes: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 216;
      Elena de White, «El conflicto de los siglos», pág. 618-619, 645-646 y
      441.`) },

    { t: '🧭 Armagedón y «Yo vengo como ladrón» (16:15-16)', capa: 'contexto', h:
      hi(`Bohr da a <strong>Armagedón</strong> el significado de «monte de la
      congregación». La palabra «lugar» no apunta solo al valle de Meguido en
      Israel: la batalla es mundial. Es la reunión de los reyes del mundo
      contra Dios en la persona de su pueblo, porque perseguir a los hijos de
      Dios es perseguir a Cristo (Mateo 25:40; Hechos 9:4).`) +
      li([`Para Bohr el centro de la batalla es la <strong>adoración</strong>:
           obedecer a Dios o no, como en la historia de Caín y Abel.`,
          `Otra traducción del nombre: «monte de Meguido» (Escuela Sabática
           2019; Doukhan). Meguido está al pie del monte Carmelo, donde Elías
           enfrentó a los profetas de Baal; la batalla final es como el
           Carmelo, pero en todo el mundo.`,
          `Otra lectura, de muchos comentarios evangélicos: una guerra
           literal en el valle de Meguido. Bohr la rechaza, igual que la idea
           de una guerra por el petróleo o entre árabes y judíos.`]) +
      hi(`El versículo 15 decide de qué lado estará cada uno. Bohr nota que son
      las únicas palabras de Jesús entre los capítulos 3 y 21, y que las
      vestiduras, la desnudez y la vergüenza nos llevan a Génesis 2 y 3 y al
      consejo a Laodicea (3:18): estar vestidos de la justicia de Cristo.`) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 104, 226 y 230; Bohr, «Los 144.000 y los 24 ancianos», pág. 118-119;
      Bohr, «Gemas de la verdad presente», pág. 136-137 y 148-149; Escuela
      Sabática 2019-1T, pág. 81; Doukhan, «Secretos del Apocalipsis», pág.
      168.`) },

    { t: '🧭 Séptima copa: «Hecho es» (16:17-21)', capa: 'contexto', h:
      hi(`Elena de White describe esta copa: es a <strong>medianoche</strong>
      cuando Dios manifiesta su poder. La voz de Dios dice «Hecho es» (la RV1995
      traduce «¡Ya está hecho!»).`) +
      li([`Un terremoto como nunca hubo: se hunden cordilleras y desaparecen
           islas.`,
          `Los puertos que se volvieron como Sodoma son tragados por el mar.`,
          `Cae granizo «como del peso de un talento» y se derrumban los
           palacios.`,
          `Se parten los muros de las cárceles y quedan libres los hijos de
           Dios presos por su fe; los sepulcros se abren.`]) +
      hi(`Bohr ve aquí el final del modelo del éxodo: como en el Salmo 77, la
      liberación viene con truenos, relámpagos y terremoto. Cita 16:19 junto
      con 16:13-14: la gran ciudad se rompe en tres partes, los mismos tres
      poderes que se habían unido. Y explica que «vino en memoria» no quiere
      decir que Dios se había olvidado: espera hasta que la copa de maldad
      está llena, y entonces ejecuta la sentencia.`) +
      hi(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 694-695;
      Bohr, «15 principios de interpretación profética», tomo 2, pág. 224-226;
      Bohr, «El Mensaje de los Tres Ángeles», tomo 1, pág. 96, y tomo 2,
      pág. 202-203 y 224-225; Bohr, «15 principios de interpretación
      profética», tomo 2, pág. 145.`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Bestia', 'Un reino o poder político', 'Daniel 7:17, 23: «La cuarta bestia será un cuarto reino»'],
        ['Trono de la bestia', 'Su sede de gobierno, su autoridad', 'Apocalipsis 13:2: el dragón le dio «su poder, su trono y gran autoridad»'],
        ['El gran río Éufrates', 'Pueblos y naciones que sostienen a Babilonia', 'Isaías 8:7-8 (el río es el rey de Asiria y su ejército); Isaías 17:12-13; Apocalipsis 17:15'],
        ['Reyes del oriente', 'Cristo y sus ángeles, que vienen a librar', 'Mateo 24:27 (viene como el relámpago que sale del oriente); Isaías 41:25 (Ciro, del oriente)'],
        ['Ranas', 'Espíritus de demonios que engañan', 'El mismo capítulo: «Son espíritus de demonios, que hacen señales» (16:14)'],
        ['Dragón', 'Satanás, que obra por los poderes civiles', 'Apocalipsis 12:9; Ezequiel 29:3 (a Faraón se le llama gran dragón)'],
        ['Falso profeta', 'La bestia de la tierra, que engaña con señales', 'Apocalipsis 19:20 con 13:13-14'],
        ['Vestiduras y desnudez', 'Estar o no cubierto por la justicia de Cristo', 'Apocalipsis 3:18; 19:8; Isaías 61:10'],
        ['La gran ciudad en tres partes', 'Se rompe la alianza de los tres poderes', 'Apocalipsis 16:13 con 16:19'],
      ]) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 104-105, 145, 222-223 y 231; Bohr, «¿Cuán cerca al fin?», pág.
      329; Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 202 y 216.`) },
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
    { t: 'mc', v: '16:1', f: 'c',
      q: 'Según Elena de White, ¿en qué se diferencian las siete plagas de los juicios de Dios anteriores?',
      o: ['Caen sin mezcla de misericordia', 'Caen solo sobre el mar y los ríos', 'Caen antes del fuerte pregón', 'Caen durante los mil años'], a: 0,
      e: 'Elena de White: los juicios anteriores al cierre de la gracia fueron mitigados con misericordia; en las plagas la ira de Dios se derrama sin esa mezcla. Fuente: Elena de White, «El conflicto de los siglos», pág. 687.' },
    { t: 'tf', v: '16:2', f: 'c',
      q: 'Según Elena de White, las siete plagas postreras serán universales y caerán sobre todos los habitantes de la tierra.', a: false,
      e: 'Falso: «Estas plagas no serán universales, pues de lo contrario los habitantes de la tierra serían enteramente destruídos». Fuente: Elena de White, «El conflicto de los siglos», pág. 687.' },
    { t: 'mc', v: '16:2', f: 'c',
      q: 'Según Elena de White, ¿a qué plagas del Antiguo Testamento se parecen las siete plagas postreras?',
      o: ['A las de Egipto antes del éxodo', 'A las de los filisteos con el arca', 'A la peste en los días de David', 'A la sequía en los días de Elías'], a: 0,
      e: 'Elena de White: las plagas que cayeron sobre Egipto cuando Dios iba a librar a Israel fueron parecidas a los juicios que caerán justo antes de la liberación final. Fuente: Elena de White, «El conflicto de los siglos», pág. 686.' },
    { t: 'tf', v: '16:6', f: 'c',
      q: 'Según Elena de White, los que condenan a muerte al pueblo de Dios son tan culpables de su sangre como si la hubieran derramado con sus propias manos.', a: true,
      e: 'Verdadero: así explica por qué el ángel declara justo a Dios en la tercera plaga (16:5-6). Fuente: Elena de White, «El conflicto de los siglos», pág. 686.' },
    { t: 'mc', v: '16:9', f: 'c',
      q: 'Según Bohr, ¿por qué los hombres no se arrepienten durante las plagas (Apocalipsis 16:9, 11)?',
      o: ['Porque la gracia ya se cerró', 'Porque nadie les predicó antes', 'Porque las plagas duran muy poco', 'Porque Dios les prohíbe arrepentirse'], a: 0,
      e: 'Bohr: no se arrepienten porque la puerta de la gracia se cerró y el Espíritu Santo ya no los convence de pecado. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 223.' },
    { t: 'mc', v: '16:10', f: 'c',
      q: 'Según Bohr, ¿qué representa «el trono de la bestia» de la quinta plaga (Apocalipsis 16:10)?',
      o: ['La sede de gobierno del papado', 'La ciudad de Jerusalén reconstruida', 'El trono de Satanás en Pérgamo', 'La capital de la antigua Babilonia'], a: 0,
      e: 'Bohr: la bestia es la de Apocalipsis 13 y el cuerno pequeño de Daniel 7; el trono es su sede de gobierno, y la plaga golpea esa autoridad. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 222.' },
    { t: 'mc', v: '16:10', f: 'c',
      q: 'Según Bohr, ¿qué escena de «El conflicto de los siglos» corresponde a la quinta plaga?',
      o: ['Caen tinieblas cuando atacan a los fieles', 'Cae fuego del cielo ante los hombres', 'Un ángel alumbra toda la tierra', 'Se ve la pequeña nube en el oriente'], a: 0,
      e: 'Bohr: cuando las multitudes van a atacar de noche al pueblo de Dios, caen «densas tinieblas, más sombrías que la obscuridad de la noche»: es la quinta plaga. Fuentes: Bohr, «15 principios de interpretación profética», tomo 2, pág. 228; Elena de White, «El conflicto de los siglos», pág. 693-694.' },
    { t: 'mc', v: '16:12', f: 'c',
      q: 'Según Bohr, ¿qué representa el gran río Éufrates en la sexta plaga?',
      o: ['Pueblos y naciones que apoyan a Babilonia', 'El río literal que hoy cruza Irak y Siria', 'Los ejércitos que vienen del Asia oriental', 'Un gran ejército de doscientos millones'], a: 0,
      e: 'Bohr: el río es simbólico y mundial; las aguas son multitudes (Isaías 8:7-8; 17:12-13; Apocalipsis 17:15). Que se seque significa que dejan de sostener a Babilonia. Fuente: Bohr, «Los 144.000 y los 24 ancianos», pág. 100.' },
    { t: 'tf', v: '16:12', f: 'c',
      q: 'Según Bohr, el secamiento del Éufrates se entiende con la caída de la Babilonia antigua, cuando Ciro desvió el río y entró por el cauce seco.', a: true,
      e: 'Verdadero: esa historia (Daniel 5; Jeremías 50 y 51) se aplica en forma simbólica y mundial al final. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 223.' },
    { t: 'mc', v: '16:12', f: 'c',
      q: 'Según Bohr, ¿quiénes son «los reyes del oriente» de Apocalipsis 16:12?',
      o: ['Cristo y sus ángeles, que vienen a librar', 'Los reyes de China, Japón y la India', 'Los ejércitos de Ciro el persa', 'Los reyes de la tierra y de todo el mundo'], a: 0,
      e: 'Bohr: después de las tinieblas y del secamiento de las aguas, vienen Jesús y sus ángeles como reyes del oriente para rescatar al remanente. Ciro solo es el modelo antiguo. Fuente: Bohr, «¿Cuán cerca al fin?», pág. 329-330.' },
    { t: 'mc', v: '16:13', f: 'c',
      q: 'Según Bohr, ¿qué representa el falso profeta de Apocalipsis 16:13?',
      o: ['EE. UU., que unirá la iglesia y el estado', 'Los poderes civiles de todo el mundo', 'El papado como sistema religioso-político', 'El espiritismo con sus falsos milagros'], a: 0,
      e: 'Bohr: el dragón son los poderes civiles del mundo, la bestia es el papado y el falso profeta es Estados Unidos (la bestia de la tierra), que hará una imagen de la bestia. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 216.' },
    { t: 'mc', v: '16:14', f: 'c',
      q: 'Según Elena de White, ¿cuáles son los dos grandes errores con que Satanás unirá a los hombres al final?',
      o: ['El alma inmortal y la santidad del domingo', 'La evolución y la negación de la creación', 'El ateísmo y el amor al dinero', 'La idolatría y el culto a los ángeles'], a: 0,
      e: 'Elena de White: la inmortalidad del alma es la base del espiritismo y la santidad del domingo crea un lazo con Roma; así se forma una triple alianza. Fuente: Elena de White, «El conflicto de los siglos», pág. 645.' },
    { t: 'tf', v: '16:14', f: 'c',
      q: 'Según Elena de White, por medio del espiritismo se harán milagros y sanidades que muchos aceptarán como obra de Dios.', a: true,
      e: 'Verdadero: «Por medio del espiritismo han de cumplirse milagros, los enfermos sanarán»; y los espíritus de demonios de 16:14 «hacen señales». Fuente: Elena de White, «El conflicto de los siglos», pág. 645-646.' },
    { t: 'mc', v: '16:15', f: 'c',
      q: 'Según Bohr, ¿qué tiene de especial Apocalipsis 16:15 («Yo vengo como ladrón»)?',
      o: ['Son las únicas palabras de Jesús entre 3 y 21', 'Es la última frase que Juan escribió en Patmos', 'Es la única bienaventuranza del Apocalipsis', 'Es una cita directa del profeta Isaías'], a: 0,
      e: 'Bohr: es el único lugar entre los capítulos 3 y 21 donde habla Jesús, señal de que es algo de suma importancia. (El Apocalipsis tiene siete bienaventuranzas.) Fuente: Bohr, «Gemas de la verdad presente», pág. 137.' },
    { t: 'tf', v: '16:15', f: 'c',
      q: 'Según Bohr, las vestiduras, la desnudez y la vergüenza de Apocalipsis 16:15 nos llevan de vuelta a Génesis 2 y 3.', a: true,
      e: 'Verdadero: allí aparecen por primera vez esas ideas; estar vestido es estar cubierto por la justicia de Cristo. Fuente: Bohr, «Gemas de la verdad presente», pág. 137.' },
    { t: 'mc', v: '16:16', f: 'c',
      q: 'Según Bohr, ¿qué significa el nombre «Armagedón»?',
      o: ['Monte de la congregación', 'Valle de la matanza final', 'Llanura de los reyes', 'Ciudad de la confusión'], a: 0,
      e: 'Bohr lo pone en su lista de nombres bíblicos con sentido simbólico: Armagedón, «monte de la congregación». Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 104.' },
    { t: 'mc', v: '16:16', f: 'c',
      q: 'Según Bohr, ¿dónde se pelea la batalla de Armagedón?',
      o: ['En todo el mundo: es una batalla global', 'Solo en el valle de Meguido, en Israel', 'En el cielo, entre Miguel y el dragón', 'En el Medio Oriente, por el petróleo'], a: 0,
      e: 'Bohr: el «lugar» de la batalla es mundial, aunque muchos eruditos evangélicos lo ponen en el valle de Meguido; y no tiene que ver con el petróleo, sino con la adoración. Fuentes: Bohr, «Los 144.000 y los 24 ancianos», pág. 118-119; Bohr, «Gemas de la verdad presente», pág. 149.' },
    { t: 'mc', v: '16:17', f: 'c',
      q: 'Según Elena de White, ¿a qué hora manifiesta Dios su poder para librar a su pueblo, cuando se oye la voz de 16:17?',
      o: ['A medianoche', 'Al amanecer', 'Al mediodía', 'Al ponerse el sol'], a: 0,
      e: '«Es a medianoche cuando Dios manifiesta su poder para librar a su pueblo»; luego la voz de Dios dice «Hecho es». Fuente: Elena de White, «El conflicto de los siglos», pág. 694.' },
    { t: 'tf', v: '16:18', f: 'c',
      q: 'Según Elena de White, en el gran terremoto de la séptima plaga se parten los muros de las cárceles y quedan libres los hijos de Dios.', a: true,
      e: 'Verdadero: «Los muros de las cárceles se parten de arriba abajo, y son libertados los hijos de Dios que habían sido apresados por su fe». Fuente: Elena de White, «El conflicto de los siglos», pág. 695.' },
    { t: 'tf', v: '16:19', f: 'c',
      q: 'Según Bohr, que Babilonia «vino en memoria» significa que Dios se había olvidado de ella hasta ese momento.', a: false,
      e: 'Falso: Dios conoce sus pecados; espera hasta que la copa de maldad está llena y entonces «se acuerda», es decir, ejecuta la sentencia. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 224-225.' },
    { t: 'mc', v: '16:13', f: 'c',
      q: '¿Qué versículo del mismo capítulo explica qué son los tres espíritus semejantes a ranas?',
      o: ['Apocalipsis 16:14', 'Apocalipsis 16:16', 'Apocalipsis 16:12', 'Apocalipsis 16:10'], a: 0,
      e: '«Son espíritus de demonios, que hacen señales» (16:14). Bohr enseña que a veces el significado del símbolo está en el contexto inmediato del pasaje. Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 102.' },
    { t: 'mc', v: '16:10', f: 'c',
      q: 'Según Daniel 7:17 y 23, ¿qué representa una bestia en la profecía, como la de la quinta copa?',
      o: ['Un reino o poder político', 'Un ángel caído del cielo', 'Un falso maestro religioso', 'Una plaga sobre la tierra'], a: 0,
      e: 'Daniel 7:17 dice que las cuatro bestias «son cuatro reyes», y 7:23, que la cuarta «será un cuarto reino». Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 105.' },
    { t: 'mc', v: '16:12', f: 'c',
      q: 'Según Bohr, ¿qué texto muestra que Cristo viene desde el oriente, como los reyes de 16:12?',
      o: ['Mateo 24:27, el relámpago', 'Mateo 2:1, los magos', 'Génesis 2:8, el huerto', 'Jonás 4:8, el viento solano'], a: 0,
      e: 'Bohr: después de la quinta y la sexta plaga vienen los reyes del oriente, Cristo con sus ángeles (Mateo 24:27: como el relámpago que sale del oriente). Fuente: Bohr, «¿Cuán cerca al fin?», pág. 329.' },
    { t: 'tf', v: '16:15', f: 'c',
      q: 'En el Apocalipsis las vestiduras limpias representan la justicia; por eso 16:15 llama a guardar las vestiduras para no andar desnudo.', a: true,
      e: 'Verdadero: Apocalipsis 3:18 aconseja comprar vestiduras blancas para que no se descubra la vergüenza de la desnudez, y 19:8 dice que el lino fino representa las acciones justas de los santos. Fuentes: Bohr, «15 principios de interpretación profética», tomo 2, pág. 105; Bohr, «Gemas de la verdad presente», pág. 137.' },
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
