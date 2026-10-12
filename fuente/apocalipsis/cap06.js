/* Apocalipsis 6 — Los seis primeros sellos.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap6', label: 'Apocalipsis 6', sub: 'Los seis primeros sellos', vs: 17,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`El <strong>Cordero</strong> empieza a abrir los sellos del libro, uno
      por uno.<br><br>
      Con los cuatro primeros salen <strong>cuatro caballos</strong>:
      <strong>blanco, rojizo, negro y amarillo</strong>. En el quinto, Juan ve
      a los que murieron por ser fieles, y Dios les da <strong>ropas
      blancas</strong>. En el sexto hay un <strong>gran terremoto</strong>, el
      sol se pone negro y las estrellas caen.<br><br>
      La gente se esconde y pregunta: <strong>«¿quién podrá sostenerse en
      pie?»</strong> (6:17).<br><br>
      <em>La idea del capítulo: Jesús, el Cordero, tiene la historia en sus
      manos, y Dios no se olvida de los que le son fieles.</em>`) },

    { t: '🐎 Los cuatro caballos (6:1-8)', capa: 'nucleo', h:
      tbl(['Sello', 'Caballo', 'El jinete tiene', 'Lo que recibe o hace'], [
        ['1.º (6:1-2)', '<strong>Blanco</strong>', 'Un <strong>arco</strong>', 'Le fue dada una <strong>corona</strong>; salió venciendo y para vencer'],
        ['2.º (6:3-4)', '<strong>Rojizo</strong>', '—', 'Poder para <strong>quitar la paz</strong> de la tierra; una <strong>espada muy grande</strong>'],
        ['3.º (6:5-6)', '<strong>Negro</strong>', 'Una <strong>balanza</strong> en la mano', 'Una voz dice los precios del trigo y la cebada'],
        ['4.º (6:7-8)', '<strong>Amarillo</strong>', 'Se llama <strong>Muerte</strong>, y el Hades lo seguía', 'Potestad sobre <strong>la cuarta parte</strong> de la tierra'],
      ]) +
      wa(`En cada uno de los cuatro primeros sellos, <strong>un ser viviente
      distinto</strong> dice «¡Ven!». En el primer sello es <strong>«uno de los
      cuatro seres vivientes»</strong>, que habla <strong>«con una voz como de
      trueno»</strong> (6:1); después hablan el segundo, el tercero y el
      cuarto, en orden.`) },

    { t: '⚪ Primer sello: el caballo blanco (6:1-2)', capa: 'nucleo', h:
      hi(`El Cordero abrió uno de los sellos, y uno de los seres vivientes dijo
      <strong>«con una voz como de trueno: ¡Ven!»</strong> (6:1).<br><br>
      <strong>«Miré, y vi un caballo blanco. El que lo montaba tenía un arco y
      le fue dada una corona, y salió venciendo y para vencer»</strong>
      (6:2).`) +
      wa(`El jinete del caballo blanco tiene un <strong>arco</strong>, no una
      espada. La <strong>espada muy grande</strong> es del segundo jinete
      (6:4).`) },

    { t: '🔴 Segundo sello: el caballo rojizo (6:3-4)', capa: 'nucleo', h:
      li([`Habló el <strong>segundo ser viviente</strong>: «¡Ven!» (6:3).`,
          `Salió <strong>«otro caballo, de color rojizo»</strong> (6:4).`,
          `Su jinete recibió poder <strong>«para quitar la paz de la tierra y
           hacer que se mataran unos a otros»</strong> (6:4).`,
          `Y se le dio <strong>«una espada muy grande»</strong> (6:4).`]) },

    { t: '⚫ Tercer sello: el caballo negro (6:5-6)', capa: 'nucleo', h:
      hi(`Habló el <strong>tercer ser viviente</strong>. Juan vio <strong>un
      caballo negro</strong>, y su jinete <strong>«tenía una balanza en la
      mano»</strong> (6:5).`) +
      tbl(['La voz de en medio de los seres vivientes (6:6)', 'Precio'], [
        ['<strong>Dos libras de trigo</strong>', 'Un denario'],
        ['<strong>Seis libras de cebada</strong>', 'Un denario'],
        ['El <strong>aceite</strong> y el <strong>vino</strong>', '«No dañes»'],
      ]) +
      wa(`No los cruces: <strong>dos</strong> libras de <strong>trigo</strong>,
      <strong>seis</strong> libras de <strong>cebada</strong>. Y lo que no se
      debe dañar es <strong>el aceite y el vino</strong>.`) },

    { t: '🟡 Cuarto sello: el caballo amarillo (6:7-8)', capa: 'nucleo', h:
      hi(`<strong>«Miré, y vi un caballo amarillo. El que lo montaba tenía por
      nombre Muerte, y el Hades lo seguía»</strong> (6:8).`) +
      tbl(['Les fue dada potestad sobre la cuarta parte de la tierra para matar con… (6:8)'], [
        ['1. <strong>Espada</strong>'], ['2. <strong>Hambre</strong>'],
        ['3. <strong>Mortandad</strong>'], ['4. Las <strong>fieras</strong> de la tierra'],
      ]) +
      wa(`Aquí es <strong>la cuarta parte</strong> de la tierra. En las
      trompetas el daño es sobre <strong>la tercera parte</strong> (8:7-12).
      Y recuerda: Jesús tiene <strong>las llaves de la muerte y del
      Hades</strong> (1:18).`) },

    { t: '🕊️ Quinto sello: las almas debajo del altar (6:9-11)', capa: 'nucleo', h:
      li([`Juan vio <strong>«debajo del altar las almas de los que habían
           muerto por causa de la palabra de Dios y del testimonio que
           tenían»</strong> (6:9).`,
          `Clamaban: <strong>«¿Hasta cuándo Señor, santo y verdadero, vas a
           tardar en juzgar y vengar nuestra sangre…?»</strong> (6:10).`,
          `Se les dieron <strong>vestiduras blancas</strong> (6:11).`,
          `Se les dijo que <strong>descansaran todavía un poco de
           tiempo</strong>, hasta que se completara el número de sus consiervos
           y hermanos (6:11).`]) +
      wa(`En el quinto sello <strong>no sale caballo</strong> ni habla un ser
      viviente: Juan ve un altar y oye un clamor.`) },

    { t: '🌑 Sexto sello: señales en el cielo y en la tierra (6:12-14)', capa: 'nucleo', h:
      tbl(['Señal', 'Cómo fue'], [
        ['Tierra', 'Un <strong>gran terremoto</strong> (6:12)'],
        ['Sol', 'Se puso <strong>negro como tela de luto</strong> (6:12)'],
        ['Luna', 'La luna entera se volvió toda <strong>como sangre</strong> (6:12)'],
        ['Estrellas', 'Cayeron sobre la tierra, <strong>como la higuera deja caer sus higos</strong> sacudida por un fuerte viento (6:13)'],
        ['Cielo', 'Se replegó <strong>como un pergamino que se enrolla</strong> (6:14)'],
        ['Montes e islas', '<strong>Todo monte y toda isla</strong> fueron removidos de sus lugares (6:14)'],
      ]) },

    { t: '⛰️ «¿Quién podrá sostenerse en pie?» (6:15-17)', capa: 'nucleo', h:
      tbl(['Los que se escondieron (6:15)'], [
        ['Los <strong>reyes</strong> de la tierra'], ['Los <strong>grandes</strong>'],
        ['Los <strong>ricos</strong>'], ['Los <strong>capitanes</strong>'],
        ['Los <strong>poderosos</strong>'], ['Todo <strong>esclavo</strong> y todo <strong>libre</strong>'],
      ]) +
      hi(`Se escondieron <strong>en las cuevas y entre las peñas de los
      montes</strong> (6:15) y decían: <strong>«Caed sobre nosotros y
      escondednos del rostro de aquel que está sentado sobre el trono, y de la
      ira del Cordero»</strong> (6:16).<br><br>
      <strong>«…porque el gran día de su ira ha llegado y ¿quién podrá
      sostenerse en pie?»</strong> (6:17).`) +
      wa(`El capítulo 6 tiene solo <strong>seis</strong> sellos. El
      <strong>séptimo</strong> se abre en 8:1, y entonces hay silencio en el
      cielo como por media hora. Entre los dos está el capítulo 7, con los
      sellados y la gran multitud que está «delante del trono» (7:9).`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · Los sellos se leen como la <strong>historia de la iglesia
      cristiana</strong> desde los apóstoles hasta la venida de Jesús.<br>
      · <strong>Blanco:</strong> la iglesia de los apóstoles, que llevaba el
      evangelio puro y vencía. <strong>Rojizo:</strong> la persecución.
      <strong>Negro:</strong> la mezcla del evangelio con errores y la escasez
      de la Palabra. <strong>Amarillo:</strong> la gran apostasía y la
      persecución de la Edad Media.<br>
      · El <strong>quinto sello</strong> habla de los mártires con lenguaje
      figurado, como la sangre de Abel que clamaba desde la tierra (Génesis
      4:10); no enseña que los muertos estén conscientes. Las vestiduras
      blancas muestran que Dios les da la razón.<br>
      · En el <strong>sexto sello</strong>, «El conflicto de los siglos» ve
      cumplidas las primeras señales en el terremoto de Lisboa (1755), el día
      oscuro (1780) y la gran lluvia de estrellas (1833). El cielo que se
      enrolla y la gente que se esconde son la segunda venida de Jesús, que
      todavía está por llegar.`) },
  ],

  preguntas: [
    { t: 'mc', v: '6:1', lit: 'el Cordero abrió uno de los sellos',
      q: '¿Quién abre los sellos en Apocalipsis 6?',
      o: ['El Cordero', 'Un ángel poderoso', 'Uno de los ancianos', 'El primer ser viviente'], a: 0,
      e: '«Entonces vi que el Cordero abrió uno de los sellos» (6:1).' },
    { t: 'mc', v: '6:1', lit: 'con una voz como de trueno',
      q: '¿Cómo era la voz del ser viviente que dijo «¡Ven!» al abrirse el primer sello? (Apocalipsis 6:1)',
      o: ['Como de trueno', 'Como de trompeta', 'Como de muchas aguas', 'Como de arpistas'], a: 0,
      e: '«…oí a uno de los cuatro seres vivientes decir con una voz como de trueno: ¡Ven!» (6:1). La voz como de trompeta es la de 1:10 y 4:1.' },
    { t: 'mc', v: '6:2', lit: 'vi un caballo blanco',
      q: '¿De qué color era el caballo del primer sello? (Apocalipsis 6:2)',
      o: ['Blanco', 'Rojizo', 'Negro', 'Amarillo'], a: 0,
      e: '«Miré, y vi un caballo blanco» (6:2).' },
    { t: 'mc', v: '6:2', lit: 'tenía un arco',
      q: '¿Qué tenía el jinete del caballo blanco? (Apocalipsis 6:2)',
      o: ['Un arco', 'Una espada muy grande', 'Una balanza', 'Una hoz aguda'], a: 0,
      e: '«El que lo montaba tenía un arco y le fue dada una corona» (6:2).' },
    { t: 'fill', v: '6:2', ins: 'Apocalipsis 6:2 (RV1995) — Completa:',
      p: [{ x: '«El que lo montaba tenía un arco y le fue dada una ' }, { b: 'corona', h: '¿qué le dieron?' }, { x: ', y salió ' }, { b: 'venciendo', h: '¿cómo salió?' }, { x: ' y para vencer.»' }] },
    { t: 'mc', v: '6:3-4', lit: 'de color rojizo',
      q: '¿De qué color era el caballo del segundo sello? (Apocalipsis 6:4)',
      o: ['Rojizo', 'Blanco', 'Amarillo', 'Negro'], a: 0,
      e: '«Salió otro caballo, de color rojizo» (6:4).' },
    { t: 'tf', v: '6:3',
      q: 'Cuando el Cordero abrió el segundo sello, el que dijo «¡Ven!» fue el segundo ser viviente. (Apocalipsis 6:3)', a: true,
      e: 'Verdadero (Apocalipsis 6:3).' },
    { t: 'mc', v: '6:4', lit: 'para quitar la paz de la tierra',
      q: 'Según Apocalipsis 6:4, ¿para qué recibió poder el jinete del caballo rojizo?',
      o: ['Para quitar la paz de la tierra', 'Para vencer a todas las naciones', 'Para medir el trigo y la cebada', 'Para dañar el aceite y el vino'], a: 0,
      e: '«…le fue dado poder para quitar la paz de la tierra y hacer que se mataran unos a otros» (6:4).' },
    { t: 'tf', v: '6:4',
      q: 'Al jinete del caballo rojizo se le dio una espada muy grande. (Apocalipsis 6:4)', a: true,
      e: 'Verdadero (Apocalipsis 6:4).' },
    { t: 'mc', v: '6:5', lit: 'tenía una balanza en la mano',
      q: '¿Qué tenía en la mano el jinete del caballo negro? (Apocalipsis 6:5)',
      o: ['Una balanza', 'Un arco', 'Una espada', 'Una vara de medir'], a: 0,
      e: '«Miré, y vi un caballo negro. El que lo montaba tenía una balanza en la mano» (6:5).' },
    { t: 'tf', v: '6:5',
      q: 'El caballo del tercer sello era amarillo. (Apocalipsis 6:5)', a: false,
      e: 'Falso: el del tercer sello era NEGRO (6:5); el amarillo es el del cuarto sello (6:8).' },
    { t: 'mc', v: '6:6', lit: 'Dos libras de trigo por un denario',
      q: 'Según la voz de Apocalipsis 6:6, ¿cuánto trigo se daba por un denario?',
      o: ['Dos libras', 'Seis libras', 'Tres libras', 'Siete libras'], a: 0,
      e: '«Dos libras de trigo por un denario y seis libras de cebada por un denario» (6:6).' },
    { t: 'mc', v: '6:6', lit: 'no dañes el aceite ni el vino',
      q: '¿Qué dijo la voz que no se dañara? (Apocalipsis 6:6)',
      o: ['El aceite y el vino', 'El trigo y la cebada', 'La hierba y los árboles', 'El mar y las fuentes'], a: 0,
      e: '«…pero no dañes el aceite ni el vino» (6:6).' },
    { t: 'fill', v: '6:6', ins: 'Apocalipsis 6:6 (RV1995) — Completa:',
      p: [{ x: '«Dos libras de trigo por un denario y ' }, { b: 'seis', h: '¿cuántas libras?' }, { x: ' libras de ' }, { b: 'cebada', h: '¿de qué grano?' }, { x: ' por un denario…»' }] },
    { t: 'mc', v: '6:7-8', lit: 'vi un caballo amarillo',
      q: '¿De qué color era el caballo del cuarto sello? (Apocalipsis 6:8)',
      o: ['Amarillo', 'Negro', 'Rojizo', 'Blanco'], a: 0,
      e: '«Miré, y vi un caballo amarillo» (6:8).' },
    { t: 'mc', v: '6:8', lit: 'tenía por nombre Muerte, y el Hades lo seguía',
      q: '¿Qué texto dice «El que lo montaba tenía por nombre Muerte, y el Hades lo seguía»?',
      o: ['Apocalipsis 6:8', 'Apocalipsis 6:4', 'Apocalipsis 1:18', 'Apocalipsis 6:12'], a: 0,
      e: 'Apocalipsis 6:8. En 1:18 Jesús dice que tiene las llaves de la muerte y del Hades.' },
    { t: 'mc', v: '6:8', lit: 'sobre la cuarta parte de la tierra',
      q: 'Según Apocalipsis 6:8, ¿sobre qué parte de la tierra recibieron potestad la Muerte y el Hades?',
      o: ['La cuarta parte', 'La tercera parte', 'La mitad', 'La décima parte'], a: 0,
      e: '«…les fue dada potestad sobre la cuarta parte de la tierra» (6:8). La tercera parte es la de las trompetas (8:7-12).' },
    { t: 'tf', v: '6:8',
      q: 'Según Apocalipsis 6:8, debían matar con espada, con hambre, con mortandad y con las fieras de la tierra.', a: true,
      e: 'Verdadero (Apocalipsis 6:8).' },
    { t: 'mc', v: '6:9', lit: 'vi debajo del altar las almas',
      q: '¿Qué vio Juan cuando se abrió el quinto sello? (Apocalipsis 6:9)',
      o: ['Las almas de los muertos por la palabra de Dios, debajo del altar', 'Un caballo gris cuyo jinete se llamaba Hambre', 'Siete ángeles de pie con siete trompetas', 'Un gran terremoto y el sol negro como tela de luto'], a: 0,
      e: '«…vi debajo del altar las almas de los que habían muerto por causa de la palabra de Dios y del testimonio que tenían» (6:9).' },
    { t: 'tf', v: '6:9',
      q: 'En el quinto sello Juan vio las almas encima del altar. (Apocalipsis 6:9)', a: false,
      e: 'Falso: estaban DEBAJO del altar (6:9).' },
    { t: 'mc', v: '6:10', lit: 'Hasta cuándo Señor, santo y verdadero',
      q: '¿Qué texto dice «¿Hasta cuándo Señor, santo y verdadero, vas a tardar en juzgar…?»',
      o: ['Apocalipsis 6:10', 'Apocalipsis 6:17', 'Apocalipsis 5:2', 'Apocalipsis 6:16'], a: 0,
      e: 'Apocalipsis 6:10: el clamor de las almas debajo del altar.' },
    { t: 'mc', v: '6:11', lit: 'se les dieron vestiduras blancas',
      q: '¿Qué se les dio a las almas que estaban debajo del altar? (Apocalipsis 6:11)',
      o: ['Vestiduras blancas', 'Coronas de oro', 'Palmas en las manos', 'Arpas de Dios'], a: 0,
      e: '«Entonces se les dieron vestiduras blancas» (6:11).' },
    { t: 'mc', v: '6:11', lit: 'que descansaran todavía un poco de tiempo',
      q: 'Según Apocalipsis 6:11, ¿qué se les dijo a las almas debajo del altar?',
      o: ['Que descansaran todavía un poco de tiempo', 'Que subieran al trono y reinaran mil años', 'Que salieran a vencer con sus espadas', 'Que cantaran un cántico nuevo al Cordero'], a: 0,
      e: '«…se les dijo que descansaran todavía un poco de tiempo, hasta que se completara el número de sus consiervos» (6:11).' },
    { t: 'mc', v: '6:12', lit: 'hubo un gran terremoto',
      q: '¿Qué fue lo primero que pasó al abrirse el sexto sello? (Apocalipsis 6:12)',
      o: ['Un gran terremoto', 'Silencio en el cielo', 'Granizo y fuego', 'Una gran guerra'], a: 0,
      e: '«Miré cuando abrió el sexto sello, y hubo un gran terremoto» (6:12). El silencio en el cielo es del séptimo sello (8:1).' },
    { t: 'fill', v: '6:12', ins: 'Apocalipsis 6:12 (RV1995) — Completa:',
      p: [{ x: '«El sol se puso negro como tela de ' }, { b: 'luto', h: '¿tela de qué?' }, { x: ', la luna entera se volvió toda como ' }, { b: 'sangre', h: '¿como qué?' }] },
    { t: 'tf', v: '6:12',
      q: 'En el sexto sello, la luna se puso negra como tela de luto. (Apocalipsis 6:12)', a: false,
      e: 'Falso: el que se puso negro fue el SOL; la luna se volvió como SANGRE (6:12).' },
    { t: 'mc', v: '6:13', lit: 'como la higuera deja caer sus higos',
      q: 'Según Apocalipsis 6:13, ¿cómo cayeron las estrellas del cielo sobre la tierra?',
      o: ['Como la higuera deja caer sus higos', 'Como el granizo que cae en la tormenta', 'Como las hojas del olivo en otoño', 'Como chispas que saltan del fuego'], a: 0,
      e: '«…como la higuera deja caer sus higos cuando es sacudida por un fuerte viento» (6:13).' },
    { t: 'mc', v: '6:14', lit: 'como un pergamino que se enrolla',
      q: '¿Cómo se replegó el cielo en el sexto sello? (Apocalipsis 6:14)',
      o: ['Como un pergamino que se enrolla', 'Como una cortina que se rasga', 'Como humo que se lleva el viento', 'Como una tienda que se levanta'], a: 0,
      e: '«El cielo se replegó como un pergamino que se enrolla, y todo monte y toda isla fueron removidos de sus lugares» (6:14).' },
    { t: 'tf', v: '6:14',
      q: 'En Apocalipsis 6:14 todo monte y toda isla fueron removidos de sus lugares.', a: true,
      e: 'Verdadero (Apocalipsis 6:14).' },
    { t: 'mc', v: '6:15', lit: 'se escondieron en las cuevas y entre las peñas de los montes',
      q: '¿Dónde se escondieron los reyes, los grandes, los ricos y todos los demás? (Apocalipsis 6:15)',
      o: ['En las cuevas y entre las peñas de los montes', 'En el templo y detrás de los altares', 'En las islas y en lo profundo del mar', 'En sus palacios y detrás de sus murallas'], a: 0,
      e: '«…se escondieron en las cuevas y entre las peñas de los montes» (6:15).' },
    { t: 'mc', v: '6:16', lit: 'Caed sobre nosotros y escondednos',
      q: '¿Qué les decían a los montes y a las peñas? (Apocalipsis 6:16)',
      o: ['«Caed sobre nosotros y escondednos»', '«Abríos y dejadnos pasar al otro lado»', '«Temblad delante del Señor de la tierra»', '«Alabad al que está sentado en el trono»'], a: 0,
      e: '«Caed sobre nosotros y escondednos del rostro de aquel que está sentado sobre el trono, y de la ira del Cordero» (6:16).' },
    { t: 'mc', v: '6:17', lit: 'quién podrá sostenerse en pie',
      q: '¿Con qué pregunta termina Apocalipsis 6?',
      o: ['¿Quién podrá sostenerse en pie?', '¿Quién es digno de abrir el libro?', '¿Hasta cuándo, Señor, santo y verdadero?', '¿Quién es semejante a la bestia?'], a: 0,
      e: '«…porque el gran día de su ira ha llegado y ¿quién podrá sostenerse en pie?» (6:17).' },
    { t: 'mc', v: '6:1-2', f: 'c',
      q: 'En la interpretación adventista, ¿qué representa el caballo blanco del primer sello?',
      o: ['La iglesia de los apóstoles llevando el evangelio puro', 'Un rey de Roma que conquistó el mundo', 'El anticristo al final de los tiempos', 'La guerra entre las naciones de Asia'], a: 0,
      e: 'Interpretación: la iglesia apostólica, que salió «venciendo y para vencer» con el evangelio. El texto solo dice que el jinete tenía un arco y recibió una corona (6:2).' },
    { t: 'mc', v: '6:9-11', f: 'c',
      q: 'En la lectura adventista, ¿cómo se entienden las almas que claman debajo del altar en el quinto sello?',
      o: ['Como lenguaje figurado, igual que la sangre de Abel que clamaba', 'Como espíritus conscientes que viven ya en el cielo', 'Como ángeles que piden castigo para la tierra', 'Como los veinticuatro ancianos que oran por todos'], a: 0,
      e: 'Interpretación: es figura de los mártires que piden justicia, como la sangre de Abel (Génesis 4:10); los muertos no están conscientes. El texto dice que las almas clamaban y recibieron vestiduras blancas (6:9-11).' },
    { t: 'mc', v: '6:12-13', f: 'c',
      q: 'En la lectura adventista («El conflicto de los siglos»), ¿qué hechos cumplieron las primeras señales del sexto sello?',
      o: ['El terremoto de Lisboa, el día oscuro y la lluvia de estrellas', 'La caída de Jerusalén, la de Roma y la de Constantinopla', 'La Reforma, la Revolución Francesa y el diluvio de Noé', 'Las dos guerras mundiales y la gran gripe del siglo XX'], a: 0,
      e: 'Interpretación: el terremoto de Lisboa (1755), el día oscuro (1780) y la lluvia de estrellas (1833). El texto habla de un gran terremoto, el sol negro, la luna como sangre y las estrellas que caen (6:12-13).' },
  ],

  tarjetas: [
    { f: 'Los cuatro caballos, en orden (6:2-8)', r: 'Blanco, rojizo, negro, amarillo' },
    { f: 'Qué dice cada ser viviente en los cuatro primeros sellos (6:1-7)', r: '«¡Ven!» (en 6:1, uno de los cuatro, con voz como de trueno)' },
    { f: 'Jinete del caballo blanco (6:2)', r: 'Tenía un arco; le fue dada una corona; salió venciendo y para vencer' },
    { f: 'Jinete del caballo rojizo (6:4)', r: 'Poder para quitar la paz de la tierra; una espada muy grande' },
    { f: 'Jinete del caballo negro (6:5-6)', r: 'Una balanza en la mano; dos libras de trigo y seis de cebada por un denario; no dañes el aceite ni el vino' },
    { f: 'Jinete del caballo amarillo (6:8)', r: 'Se llamaba Muerte y el Hades lo seguía; potestad sobre la cuarta parte de la tierra' },
    { f: 'Cuatro formas de matar (6:8)', r: 'Espada, hambre, mortandad y fieras de la tierra' },
    { f: 'Quinto sello (6:9-11)', r: 'Almas debajo del altar; vestiduras blancas; descansar un poco de tiempo' },
    { f: '«¿Hasta cuándo Señor, santo y verdadero…?»', r: 'Apocalipsis 6:10' },
    { f: 'Sol, luna y estrellas en el sexto sello (6:12-13)', r: 'Sol negro como tela de luto; luna como sangre; estrellas como higos de la higuera' },
    { f: 'El cielo en el sexto sello (6:14)', r: 'Se replegó como un pergamino que se enrolla' },
    { f: 'La pregunta final (6:17)', r: '«¿Quién podrá sostenerse en pie?»' },
  ],
};
