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

    { t: '🧭 Cómo leer los sellos (6:1)', capa: 'contexto', h:
      hi(`Desde aquí, lo que sigue es <strong>interpretación</strong>. La guía
      principal es el pastor Stephen (Esteban) Bohr.<br><br>
      · <strong>De dónde a dónde:</strong> los sellos empiezan cuando Jesús llega
      al cielo y es puesto como sacerdote y rey (capítulos 4 y 5) y terminan con
      la segunda venida (el séptimo sello, 8:1). Van <strong>en orden</strong>,
      como los hechos de Mateo 24.<br>
      · <strong>Sellos e iglesias:</strong> cubren los mismos períodos. Las
      siete iglesias muestran cómo estaba la iglesia <strong>por dentro</strong>;
      los sellos, las fuerzas <strong>de afuera</strong> que la atacaron.<br>
      · <strong>Las dos armas de Satanás:</strong> la
      <strong>persecución</strong> (como Caín contra Abel) y, cuando esta no
      funciona, la <strong>infiltración</strong>: meter el error dentro de la
      iglesia para corromperla.<br>
      · Los sellos hablan de la historia <strong>religiosa</strong>, no de la
      historia política en general.<br><br>
      <strong>Aplicación:</strong> Bohr dice que al final de la historia se
      repetirán los mismos principios: una iglesia con poder del Espíritu
      (blanco), persecución (rojizo), errores (negro), muerte (amarillo), y por
      fin la venida de Jesús.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 108,
      116-117 y 208; tomo 2, págs. 213-216.`) },

    { t: '🧭 Los sellos y sus períodos según Bohr', capa: 'contexto', h:
      tbl(['Sello', 'Qué representa', 'Período', 'Iglesia'], [
        ['1.º Blanco', 'La iglesia apostólica vence con el evangelio', 'Era apostólica', 'Éfeso'],
        ['2.º Rojizo', 'Los emperadores romanos persiguen a la iglesia', 'Hasta el edicto de Constantino (313)', 'Esmirna'],
        ['3.º Negro', 'El mundo entra en la iglesia; falta la Palabra', '313 a 538', 'Pérgamo'],
        ['4.º Amarillo', 'Dominio papal: hambre de la Palabra y mártires', '538 a 1798 (1.260 años)', 'Tiatira'],
        ['5.º Altar', 'Los mártires piden justicia; el juicio empieza en 1844', 'Mártires de 538-1798 y los del fin', '—'],
        ['6.º Señales', 'Señales en el cielo y en la tierra; después, la venida', '1755, 1780, 1833… y la segunda venida', '—'],
        ['7.º (8:1)', 'Silencio en el cielo', 'La segunda venida', '—'],
      ]) +
      hi(`<strong>Otras lecturas:</strong> Urías Smith ve en el caballo rojizo
      el comienzo de la corrupción de la iglesia, más que la persecución. En las
      notas de Camilo ("Los 144000") el caballo amarillo va de 538 a 1517 y el
      quinto sello de 1517 a 1755.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 117-119,
      165, 177, 208, 219 y 244; Urías Smith, «Las profecías del Apocalipsis»,
      pág. 55; notas de Camilo en Evernote, "Los 144000".`) },

    { t: '🧭 El caballo blanco y el rojizo (6:1-4)', capa: 'contexto', h:
      hi(`<strong>Caballo blanco</strong> (según Bohr):<br>
      · El <strong>jinete es Cristo</strong> y el <strong>caballo es su
      iglesia</strong>: el jinete guía al caballo. Elena de White aplica
      «venciendo y para vencer» a las conquistas del evangelio.<br>
      · El <strong>blanco</strong>, en el Apocalipsis, siempre se relaciona con
      Cristo o con la victoria.<br>
      · Las <strong>flechas</strong> del arco son el mensaje de la Palabra
      (2 Reyes 13:17, «saeta de salvación»).<br>
      · La <strong>corona</strong> es <em>stéfanos</em>, la del vencedor.
      «Vencer» es la misma palabra de las promesas a las siete iglesias.<br>
      · La lectura <strong>futurista</strong> ve aquí al anticristo; Bohr dice
      que el texto no da base para eso.<br><br>
      <strong>Caballo rojizo:</strong><br>
      · El rojo es <strong>sangre derramada</strong>.<br>
      · La espada que quita la paz se explica con Mateo 10:34: el evangelio trae
      paz al que lo recibe, pero despierta el odio del que lo rechaza. Elena de
      White dice que por eso el evangelio se llama una espada.<br>
      · Los emperadores usaron mal la espada del Estado (Romanos 13:4) para
      perseguir a los cristianos, hasta el edicto de Constantino en 313.<br><br>
      Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 108,
      165-172 y 177-181 (cita «El conflicto de los siglos», pág. 43).`) },

    { t: '🧭 El caballo negro y el amarillo (6:5-8)', capa: 'contexto', h:
      hi(`<strong>Caballo negro</strong> (según Bohr):<br>
      · Cuando la persecución no detuvo a la iglesia, Satanás cambió de plan:
      en los días de <strong>Constantino</strong> el Estado la favoreció, y
      entraron costumbres y enseñanzas paganas. El <strong>negro</strong> es la
      oscuridad donde falta la luz de la Palabra.<br>
      · La <strong>balanza</strong> pesa granos. El trigo y la cebada, con los
      que se hacía el pan, estaban carísimos: según Cicerón, de 8 a 16 veces más.
      Es <strong>hambre de la Palabra de Dios</strong> (Amós 8:11).<br>
      · El <strong>aceite</strong> es el Espíritu Santo y el
      <strong>vino</strong>, la sangre de Cristo. Elena de White usa la frase
      para pedir que no se maltrate a nadie de los comprados por esa sangre.<br><br>
      <strong>Caballo amarillo:</strong><br>
      · En griego es <em>chloros</em>: un verde pálido, el color de la
      muerte.<br>
      · Espada, hambre, mortandad y fieras eran los castigos del pacto en
      Israel (Levítico 26). Aquí son símbolos: la falta de la Palabra lleva a la
      muerte espiritual, y las fieras son líderes y naciones que actuaron con
      crueldad.<br>
      · Es el período de los <strong>1.260 años</strong> en que el sistema papal
      privó al pueblo de la Palabra y persiguió a quienes no aceptaban sus
      enseñanzas. En 1798 recibió la
      «herida mortal».<br><br>
      Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 118,
      207-213, 219-223 (cita «Testimonios para la iglesia», tomo 5, pág. 578).`) },

    { t: '🧭 Quinto sello: el clamor de los mártires (6:9-11)', capa: 'contexto', h:
      hi(`<strong>¿Cómo claman los muertos?</strong> Bohr responde con la
      Biblia: igual que <strong>la sangre de Abel</strong> clamaba desde la
      tierra (Génesis 4:10). En el santuario, la sangre se derramaba <strong>al
      pie del altar del sacrificio</strong>, en el atrio (Levítico 4:7), y «la
      vida de la carne en la sangre está» (Levítico 17:11). Por eso las «almas»
      debajo del altar son la vida derramada de los mártires que pide justicia;
      el texto <strong>no enseña</strong> que los muertos estén conscientes.<br><br>
      <strong>Dos grupos de mártires:</strong><br>
      · Los que murieron durante los <strong>1.260 años</strong> (538-1798).<br>
      · Los que morirán <strong>al final</strong>, antes del cierre de la
      gracia: son los «consiervos» que faltan.<br><br>
      <strong>Las vestiduras blancas:</strong> los mártires ya tenían el manto de
      la <strong>justicia de Cristo</strong> cuando murieron. Desde 1844, el
      juicio del cielo lo confirma ante el universo y anula las sentencias
      injustas de los tribunales de la tierra. En la segunda venida recibirán un
      manto de luz.<br><br>
      Bohr distingue <strong>«juzgar»</strong> (examinar los casos, desde 1844)
      de <strong>«vengar»</strong> (ejecutar la sentencia, en la venida).<br><br>
      Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 234-237,
      243-247 y 254-256.`) },

    { t: '🧭 Sexto sello: señales del juicio (6:12-17)', capa: 'contexto', h:
      hi(`<strong>¿Literales o simbólicas?</strong> Los adventistas las leen
      <strong>literales</strong>. Bohr explica que la palabra «como» compara un
      hecho real con una figura: el sol se puso negro <em>como</em> tela de
      luto.<br><br>
      <strong>Dos partes, según Bohr:</strong>`) +
      tbl(['Parte', 'Qué pasó o pasará', 'Para qué'], [
        ['6:12-13', 'Terremoto de Lisboa (1 de noviembre de 1755); día oscuro y luna como sangre (19 de mayo de 1780); lluvia de estrellas (13 de noviembre de 1833)', 'Anunciar el fin de los 1.260 años y el comienzo del juicio en 1844'],
        ['6:14-17', 'El cielo se enrolla, se mueven montes e islas, los impíos se esconden', 'Es la segunda venida: Dios venga a los mártires'],
      ]) +
      hi(`Elena de White ve en Lisboa, el día oscuro y la lluvia de estrellas el
      cumplimiento de 6:12-13, y aplica 6:15-17 a la venida de Cristo.<br><br>
      Entre las dos partes está el juicio y el <strong>sellamiento</strong>. La
      pregunta final, «¿quién podrá sostenerse en pie?», tiene respuesta en el
      capítulo 7: los sellados.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 262,
      266-268 y 299; tomo 2, págs. 4-5; Elena de White, «El conflicto de los
      siglos», págs. 255-258, 278 y 516.`) },
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
    { t: 'mc', v: '6:1', f: 'c',
      q: 'Según Bohr, ¿qué período de la historia cubren los siete sellos?',
      o: ['De la ascensión de Jesús a su segunda venida', 'Del diluvio de Noé a la caída de Babilonia', 'Solo los siete años antes de la venida', 'Del reinado de Constantino hasta 1844'], a: 0,
      e: 'Los sellos empiezan cuando Jesús es puesto como sacerdote y rey en el cielo y terminan con el séptimo sello, en la segunda venida. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 108.' },
    { t: 'tf', v: '6:1', f: 'c',
      q: 'Según Bohr, los sellos y las siete iglesias cubren los mismos períodos: las iglesias muestran la condición interna de la iglesia y los sellos, las fuerzas de afuera.', a: true,
      e: 'Verdadero: es la misma historia vista desde dos ángulos. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 116.' },
    { t: 'mc', v: '6:1-2', f: 'c',
      q: 'Según Bohr, ¿qué representan el caballo blanco y su jinete?',
      o: ['La iglesia apostólica guiada por Cristo', 'El anticristo que imita a Cristo', 'Un emperador romano conquistador', 'Los ejércitos de la antigua Babilonia'], a: 0,
      e: 'El jinete es Cristo y el caballo, su iglesia, que en la era apostólica salió «venciendo y para vencer» con el evangelio. Los futuristas ven aquí al anticristo; Bohr lo rechaza. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 165-168 y 172.' },
    { t: 'mc', v: '6:2', f: 'c',
      q: 'Según Bohr, ¿qué simbolizan las flechas del arco del primer jinete?',
      o: ['El mensaje de la Palabra que predicaban los apóstoles', 'Las guerras de Roma contra los pueblos vecinos', 'Las plagas que caerán sobre los impíos', 'Los dardos de fuego del maligno'], a: 0,
      e: 'Bohr cita 2 Reyes 13:17, «saeta de salvación de Jehová»: las flechas son la Palabra que hiere el corazón y lo convierte. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 169-170.' },
    { t: 'mc', v: '6:3-4', f: 'c',
      q: 'Según Bohr, ¿qué período representa el caballo rojizo?',
      o: ['La persecución de los emperadores hasta el año 313', 'La conquista de Jerusalén por los babilonios', 'Las dos guerras mundiales del siglo XX', 'La Reforma protestante del siglo XVI'], a: 0,
      e: 'Es la iglesia perseguida, paralela a Esmirna, hasta el edicto de Constantino en 313. Urías Smith lo ve, en cambio, como el comienzo de la corrupción. Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 177; Urías Smith, «Las profecías del Apocalipsis», pág. 55.' },
    { t: 'mc', v: '6:4', f: 'c',
      q: 'Según Bohr y Elena de White, ¿por qué el evangelio, que es mensaje de paz, se relaciona con la espada que quita la paz?',
      o: ['Despierta el odio de los que lo rechazan', 'Los apóstoles tomaron armas para predicar', 'Dios mandó guerras contra los paganos', 'Los cristianos pelearon entre ellos mismos'], a: 0,
      e: 'Jesús dijo que no vino a traer paz sino espada (Mateo 10:34): el evangelio condena el pecado y los que lo rechazan persiguen a los fieles. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 180-181 (cita «El conflicto de los siglos», pág. 43).' },
    { t: 'mc', v: '6:5', f: 'c',
      q: 'Según Bohr, ¿qué representa el color negro del tercer caballo?',
      o: ['La oscuridad que entró a la iglesia con Constantino', 'La peste negra que mató a media Europa', 'El luto por la caída de Jerusalén', 'El día oscuro de mayo de 1780'], a: 0,
      e: 'Cuando la persecución no detuvo a la iglesia, el mundo entró en ella (313 a 538) y faltó la luz de la Palabra. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 207-209.' },
    { t: 'mc', v: '6:6', f: 'c',
      q: 'Según Bohr, ¿qué significa que el trigo y la cebada estuvieran tan caros?',
      o: ['Había hambre de la Palabra de Dios', 'Había una gran sequía en Palestina', 'Roma cobraba impuestos muy altos', 'Los mercaderes se volvieron ricos'], a: 0,
      e: 'Según Cicerón, ese precio era de 8 a 16 veces lo normal. El pan es la Palabra, y hay «hambre… de oír la palabra de Jehová» (Amós 8:11). Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 212-213.' },
    { t: 'mc', v: '6:6', f: 'c',
      q: 'Según Bohr, ¿qué simbolizan el aceite y el vino que no se deben dañar?',
      o: ['El Espíritu Santo y la sangre de Cristo', 'La riqueza de la iglesia y su poder', 'Las fiestas y los sacrificios judíos', 'Las cosechas de Israel y de Egipto'], a: 0,
      e: 'Elena de White usa la frase para pedir que nadie maltrate a los que fueron comprados por la sangre de Cristo. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 213 (cita «Testimonios para la iglesia», tomo 5, pág. 578).' },
    { t: 'mc', v: '6:7-8', f: 'c',
      q: 'Según Bohr, ¿qué período representa el caballo amarillo?',
      o: ['Los 1.260 años de dominio papal (538-1798)', 'Las invasiones bárbaras contra Roma', 'La Revolución francesa de 1789', 'El tiempo de angustia después de 1844'], a: 0,
      e: 'Es la Edad Media, cuando faltó la Palabra y hubo mártires. En las notas de Camilo ("Los 144000") este caballo va de 538 a 1517. Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 118, 219 y 244; notas de Camilo en Evernote, "Los 144000".' },
    { t: 'mc', v: '6:9', f: 'c',
      q: 'Según Bohr, ¿debajo de qué altar estaban las almas del quinto sello?',
      o: ['El del sacrificio, en el atrio', 'El del incienso, en el lugar santo', 'El de Baal, en el monte Carmelo', 'El de Noé, después del diluvio'], a: 0,
      e: 'La sangre de las víctimas se derramaba al pie del altar del holocausto (Levítico 4:7); en el altar del incienso nunca se ofrecía sangre. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 236.' },
    { t: 'mc', v: '6:9-10', f: 'c',
      q: 'Según Bohr, ¿cómo «claman» los mártires que ya están muertos?',
      o: ['Como la sangre de Abel que clamaba desde la tierra', 'Como espíritus que viven conscientes en el cielo', 'Como ángeles que oran en lugar de ellos', 'Como voces que se oyen en los sueños'], a: 0,
      e: 'Es lenguaje figurado: la vida está en la sangre (Levítico 17:11), y la sangre derramada pide justicia, como la de Abel (Génesis 4:10). No enseña que los muertos estén conscientes. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 234-237.' },
    { t: 'mc', v: '6:11', f: 'c',
      q: 'Según Bohr, ¿qué significan las vestiduras blancas que reciben los mártires?',
      o: ['La justicia de Cristo que ya tenían, confirmada en el juicio', 'Un premio por haber muerto con valentía', 'Un permiso para volver a vivir en la tierra', 'La ropa de los sacerdotes del templo'], a: 0,
      e: 'Desde 1844 el juicio confirma ante el universo que tenían el manto de Cristo; en la segunda venida recibirán un manto de luz. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 246-247 y 254-256.' },
    { t: 'tf', v: '6:11', f: 'c',
      q: 'Según Bohr, el quinto sello habla de dos grupos de mártires: los de los 1.260 años y otros que morirán al final, antes del cierre de la gracia.', a: true,
      e: 'Verdadero: son los «consiervos» que faltaban; cuando se complete su número, Dios vengará a los dos grupos. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 243-244 y 256.' },
    { t: 'mc', v: '6:12-13', f: 'c',
      q: 'Según Bohr, ¿por qué las señales de 6:12-13 se entienden de forma literal?',
      o: ['Por la palabra «como», que compara con hechos reales', 'Porque Juan las vio con los ojos abiertos', 'Porque ocurrieron en tiempos de Juan', 'Porque todo el Apocalipsis es literal'], a: 0,
      e: 'Bohr cita a Ranko Stefanovic: «como» introduce una comparación figurada de un hecho real. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 262.' },
    { t: 'mc', v: '6:12', f: 'c',
      q: 'Según Elena de White, ¿qué terremoto cumplió la primera señal del sexto sello?',
      o: ['El de Lisboa, en 1755', 'El de San Francisco, en 1906', 'El de Messina, en 1908', 'El de Jerusalén, en la cruz'], a: 0,
      e: 'El terremoto del 1 de noviembre de 1755, que se sintió en gran parte de Europa, África y América. Fuentes: Elena de White, «El conflicto de los siglos», pág. 255; Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 266.' },
    { t: 'mc', v: '6:12', f: 'c',
      q: 'En la interpretación adventista, ¿en qué fecha fue el «día oscuro» que cumplió la señal del sol?',
      o: ['19 de mayo de 1780', '1 de noviembre de 1755', '13 de noviembre de 1833', '22 de octubre de 1844'], a: 0,
      e: 'El sol se oscureció el 19 de mayo de 1780; esa noche la luna se vio como sangre. Las otras fechas son el terremoto de Lisboa, la lluvia de estrellas y el fin de los 2.300 días. Fuentes: Elena de White, «El conflicto de los siglos», págs. 256-258; Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 266.' },
    { t: 'mc', v: '6:13', f: 'c',
      q: 'Según Elena de White, ¿qué hecho cumplió la caída de las estrellas?',
      o: ['La lluvia de meteoros de 1833', 'El paso del cometa Halley en 1910', 'El gran eclipse de sol de 1919', 'La caída de un meteorito en 1908'], a: 0,
      e: 'La gran lluvia de estrellas fugaces del 13 de noviembre de 1833, vista en toda América del Norte. Fuente: Elena de White, «El conflicto de los siglos», pág. 278.' },
    { t: 'mc', v: '6:14-17', f: 'c',
      q: 'Según Bohr, ¿qué anuncian las dos partes del sexto sello?',
      o: ['El comienzo del juicio y la segunda venida', 'La caída de Roma y la de Constantinopla', 'La Reforma y la Revolución francesa', 'El diluvio y la destrucción de Sodoma'], a: 0,
      e: 'Las señales de 1755-1833 anunciaron el juicio de 1844; las de 6:14-17 son la segunda venida. Elena de White aplica 6:15-17 a la venida de Cristo. Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 267-268; Elena de White, «El conflicto de los siglos», pág. 516.' },
    { t: 'tf', v: '6:17', f: 'c',
      q: 'Según Bohr, la pregunta «¿quién podrá sostenerse en pie?» recibe su respuesta en el capítulo 7, con los sellados.', a: true,
      e: 'Verdadero: «sostenerse en pie» es lo contrario de caer, y los sellados de 7:1-8 son los que estarán firmes. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 4-5.' },
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
