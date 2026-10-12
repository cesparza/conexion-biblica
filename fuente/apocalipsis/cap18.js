/* Apocalipsis 18 — La caída de Babilonia.
   Sigue el modelo de cap01.js; se revisa con tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap18', label: 'Apocalipsis 18', sub: 'La caída de Babilonia', vs: 24,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Un ángel baja del cielo con tanta luz que <strong>la tierra se
      ilumina</strong>, y grita: <strong>«¡Ha caído, ha caído la gran
      Babilonia!»</strong> (18:2).<br><br>
      Otra voz del cielo llama con cariño: <strong>«¡Salid de ella, pueblo
      mío»</strong> (18:4). Dios no quiere que sus hijos sufran las plagas.<br><br>
      Los reyes, los comerciantes y los marineros lloran desde lejos, porque la
      gran ciudad se quema <strong>en una sola hora</strong>. Al final, un ángel
      tira al mar una piedra enorme, como de molino: así cae Babilonia y nunca
      más será hallada.<br><br>
      <em>La idea del capítulo: Dios llama a su pueblo a salir de Babilonia
      antes de que llegue su juicio.</em>`) },

    { t: '👼 El ángel que alumbra la tierra (18:1-3)', capa: 'nucleo', h:
      hi(`Juan vio <strong>otro ángel que descendía del cielo con gran
      poder</strong>, y <strong>«la tierra fue alumbrada con su gloria»</strong>
      (18:1).`) +
      tbl(['En qué se convirtió Babilonia (18:2)'], [
        ['Habitación de <strong>demonios</strong>'],
        ['Guarida de todo <strong>espíritu inmundo</strong>'],
        ['Albergue de toda <strong>ave inmunda y aborrecible</strong>'],
      ]) +
      tbl(['Quién', 'Qué hizo con Babilonia (18:3)'], [
        ['Todas las naciones', 'Bebieron <strong>del vino del furor de su fornicación</strong>'],
        ['Los reyes de la tierra', '<strong>Fornicaron</strong> con ella'],
        ['Los mercaderes de la tierra', 'Se <strong>enriquecieron</strong> con el poder de sus lujos'],
      ]) +
      wa(`El grito «¡Ha caído, ha caído…!» ya se oyó en 14:8, de boca del
      <strong>segundo</strong> ángel. En 18:2 lo repite un ángel que
      <strong>alumbra toda la tierra</strong>.`) },

    { t: '📣 «Salid de ella, pueblo mío» (18:4-8)', capa: 'nucleo', h:
      hi(`<strong>«¡Salid de ella, pueblo mío, para que no seáis partícipes de
      sus pecados ni recibáis parte de sus plagas!»</strong> (18:4). Las dos
      razones: <strong>no participar de sus pecados</strong> y <strong>no
      recibir sus plagas</strong>.`) +
      li([`<strong>«sus pecados han llegado hasta el cielo»</strong> y Dios se ha
           <strong>acordado</strong> de sus maldades (18:5).`,
          `<strong>«pagadle el doble según sus obras»</strong> (18:6).`,
          `Lo que dice en su corazón: <strong>«Yo estoy sentada como una reina,
           no soy viuda y no veré llanto»</strong> (18:7).`,
          `<strong>«en un solo día vendrán sus plagas»</strong>: muerte, llanto y
           hambre, y será <strong>quemada con fuego</strong> (18:8).`,
          `La razón: <strong>«poderoso es Dios el Señor, que la juzga»</strong> (18:8).`]) +
      wa(`Un solo <strong>DÍA</strong> para las plagas (18:8); una sola
      <strong>HORA</strong> en los lamentos (18:10, 18:17, 18:19).`) },

    { t: '👑 Los reyes lloran (18:9-10)', capa: 'nucleo', h:
      hi(`Los reyes de la tierra que vivieron en deleites con ella
      <strong>llorarán</strong> «cuando vean el humo de su incendio» (18:9).
      Se ponen <strong>lejos</strong>, por el temor de su tormento, y dicen:<br><br>
      <strong>«¡Ay, ay de la gran ciudad, de Babilonia, la ciudad fuerte!,
      porque en una sola hora vino tu juicio»</strong> (18:10).`) +
      wa(`Nadie se acerca a ayudarla: los tres grupos que lloran (reyes,
      mercaderes y gente del mar) <strong>se ponen lejos</strong> (18:10, 18:15,
      18:17).`) },

    { t: '🛒 Las mercaderías que nadie compra (18:11-14)', capa: 'nucleo', h:
      hi(`Los mercaderes lloran <strong>«porque ninguno compra más sus
      mercaderías»</strong> (18:11). La lista, en el orden del texto:`) +
      tbl(['Grupo', 'Mercaderías (18:12-13)'], [
        ['Metales y joyas', 'Oro y plata; piedras preciosas y perlas'],
        ['Telas', 'Lino fino, púrpura, seda y escarlata'],
        ['Maderas y marfil', 'Madera olorosa, objetos de marfil y de madera preciosa'],
        ['Metales y piedra', 'Cobre, hierro y mármol'],
        ['Aromas', 'Canela y especias; <strong>incienso, mirra y olíbano</strong>'],
        ['Comida', 'Vino y aceite; flor de harina y trigo'],
        ['Animales y carros', 'Bestias y ovejas; caballos y carros'],
        ['Al final', '<strong>Esclavos y almas de hombres</strong>'],
      ]) +
      hi(`Y le dicen a la ciudad: las cosas exquisitas y espléndidas
      <strong>«te han faltado y nunca más las hallarás»</strong> (18:14).`) },

    { t: '💰 El lamento de los mercaderes (18:15-17)', capa: 'nucleo', h:
      hi(`Los mercaderes que se enriquecieron a costa de ella se ponen lejos,
      llorando, y dicen:<br><br>
      <strong>«¡Ay, ay de la gran ciudad, que estaba vestida de lino fino,
      púrpura y escarlata, y estaba adornada de oro, piedras preciosas y
      perlas!»</strong> (18:16)<br><br>
      <strong>«porque en una sola hora han sido consumidas tantas
      riquezas»</strong> (18:17).`) +
      wa(`La misma ropa tenía la mujer de 17:4: <strong>púrpura y
      escarlata</strong>, con oro, piedras preciosas y perlas. Babilonia es la
      gran ciudad y es también la mujer (17:18).`) },

    { t: '⛵ La gente del mar (18:17-20)', capa: 'nucleo', h:
      li([`Se pusieron lejos: <strong>todo piloto</strong>, los que viajan en
           naves, <strong>los marineros</strong> y todos los que trabajan en el
           mar (18:17).`,
          `Al ver el humo gritaban: <strong>«¿Qué ciudad era semejante a esta gran
           ciudad?»</strong> (18:18).`,
          `<strong>Echaron polvo sobre sus cabezas</strong> y lloraban (18:19).`,
          `Su lamento: <strong>«¡En una sola hora ha sido desolada!»</strong> (18:19).`]) +
      tbl(['Quién lamenta', 'Versículos'], [
        ['1. Los reyes de la tierra', '18:9-10'],
        ['2. Los mercaderes de la tierra', '18:11-17'],
        ['3. Pilotos, marineros y gente del mar', '18:17-19'],
      ]) +
      hi(`En cambio, el cielo se alegra: <strong>«Alégrate sobre ella, cielo, y
      vosotros santos, apóstoles y profetas»</strong> (18:20).`) },

    { t: '🪨 La piedra de molino (18:21-24)', capa: 'nucleo', h:
      hi(`<strong>Un ángel poderoso</strong> tomó una piedra <strong>«como una
      gran piedra de molino»</strong> y la arrojó <strong>en el mar</strong>
      (18:21): <strong>«Con el mismo ímpetu será derribada Babilonia, la gran
      ciudad, y nunca más será hallada»</strong> (18:21).`) +
      tbl(['Lo que no habrá más en ella (18:22-23)'], [
        ['Voz de <strong>arpistas, músicos, flautistas y trompetistas</strong>'],
        ['<strong>Artífice</strong> de oficio alguno'],
        ['<strong>Ruido de molinos</strong>'],
        ['<strong>Luz de lámpara</strong>'],
        ['<strong>Voz de esposo y esposa</strong>'],
      ]) +
      li([`Sus mercaderes eran <strong>los grandes de la tierra</strong> (18:23).`,
          `<strong>«por tus hechicerías fueron engañadas todas las naciones»</strong> (18:23).`,
          `En ella se halló <strong>«la sangre de los profetas y de los
           santos»</strong> (18:24).`]) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · <strong>Babilonia</strong> (de Babel, «confusión») representa la
      religión que se ha apartado de la verdad de Dios y se une con los poderes
      de la tierra (los reyes de 18:3). No señala a personas: en todas las
      iglesias hay hijos sinceros de Dios.<br>
      · El <strong>ángel que alumbra la tierra</strong> (18:1) se une al
      mensaje de los tres ángeles de Apocalipsis 14 y repite con más fuerza el
      del segundo (14:8). Es el último llamado al mundo antes del fin, el
      «fuerte pregón».<br>
      · <strong>«Salid de ella, pueblo mío»</strong>: Dios todavía tiene
      pueblo allí y lo llama con amor antes de que caigan las plagas (las siete
      postreras de Apocalipsis 16).`) },
  ],

  preguntas: [
    { t: 'mc', v: '18:1', lit: 'la tierra fue alumbrada con su gloria',
      q: '¿Qué pasó con la tierra cuando descendió el ángel de Apocalipsis 18:1?',
      o: ['Fue alumbrada con su gloria', 'Tembló con un gran estruendo', 'Se cubrió de tinieblas', 'Se secó como en verano'], a: 0,
      e: '«…y la tierra fue alumbrada con su gloria» (18:1).' },
    { t: 'tf', v: '18:1',
      q: 'El ángel de Apocalipsis 18:1 subía de la tierra hacia el cielo.', a: false,
      e: 'Falso: «vi otro ángel que DESCENDÍA del cielo con gran poder» (18:1).' },
    { t: 'mc', v: '18:2', lit: 'Ha caído, ha caído la gran Babilonia',
      q: '¿Qué texto dice «¡Ha caído, ha caído la gran Babilonia!»?',
      o: ['Apocalipsis 18:2', 'Apocalipsis 18:21', 'Apocalipsis 17:5', 'Apocalipsis 18:10'], a: 0,
      e: 'Apocalipsis 18:2. Un grito parecido da el segundo ángel en 14:8.' },
    { t: 'mc', v: '18:2', lit: 'habitación de demonios',
      q: 'Según Apocalipsis 18:2, ¿en qué se ha convertido Babilonia?',
      o: ['En habitación de demonios', 'En un desierto sin agua', 'En un monte de ceniza', 'En un lago de fuego'], a: 0,
      e: '«Se ha convertido en habitación de demonios, en guarida de todo espíritu inmundo…» (18:2).' },
    { t: 'mc', v: '18:3', lit: 'los mercaderes de la tierra se han enriquecido',
      q: 'Según Apocalipsis 18:3, ¿quiénes se han enriquecido con el poder de sus lujos?',
      o: ['Los mercaderes de la tierra', 'Los reyes del oriente', 'Los falsos profetas', 'Los ancianos del pueblo'], a: 0,
      e: '«…y los mercaderes de la tierra se han enriquecido con el poder de sus lujos sensuales» (18:3).' },
    { t: 'tf', v: '18:3',
      q: 'Según Apocalipsis 18:3, todas las naciones han bebido del vino del furor de su fornicación.', a: true,
      e: 'Verdadero (Apocalipsis 18:3).' },
    { t: 'mc', v: '18:4', lit: 'Salid de ella, pueblo mío',
      q: '¿Qué texto dice «¡Salid de ella, pueblo mío!»?',
      o: ['Apocalipsis 18:4', 'Apocalipsis 18:2', 'Apocalipsis 18:20', 'Apocalipsis 19:5'], a: 0,
      e: 'Apocalipsis 18:4. Es «otra voz del cielo», no el ángel de 18:1.' },
    { t: 'mc', v: '18:4', lit: 'para que no seáis partícipes de sus pecados ni recibáis parte de sus plagas',
      q: 'Según Apocalipsis 18:4, ¿para qué debe salir de Babilonia el pueblo de Dios?',
      o: ['Para no participar de sus pecados ni recibir sus plagas', 'Para ir a pelear contra la bestia y sus reyes', 'Para llevar la sangre de los santos al templo', 'Para construir otra ciudad junto al mar'], a: 0,
      e: '«…para que no seáis partícipes de sus pecados ni recibáis parte de sus plagas» (18:4).' },
    { t: 'fill', v: '18:4', ins: 'Apocalipsis 18:4 (RV1995) — Completa:',
      p: [{ x: '«¡Salid de ella, ' }, { b: 'pueblo', h: '¿a quién llama?' }, { x: ' mío, para que no seáis partícipes de sus ' }, { b: 'pecados', h: '¿de qué?' }, { x: ' ni recibáis parte de sus ' }, { b: 'plagas', h: '¿de qué?' }, { x: '!»' }] },
    { t: 'mc', v: '18:4', f: 'c',
      q: 'En la lectura adventista, ¿quiénes son «pueblo mío» en el llamado de Apocalipsis 18:4?',
      o: ['Hijos sinceros de Dios que todavía están en Babilonia', 'Solamente los ángeles que viven en el cielo', 'Los reyes de la tierra que lloran por ella', 'Los mercaderes que se enriquecieron con ella'], a: 0,
      e: 'Interpretación: Dios tiene hijos fieles en todas las iglesias y los llama a salir antes de las plagas. El texto solo dice «pueblo mío» (18:4).' },
    { t: 'mc', v: '18:5', lit: 'sus pecados han llegado hasta el cielo',
      q: 'Según Apocalipsis 18:5, ¿hasta dónde han llegado los pecados de Babilonia?',
      o: ['Hasta el cielo', 'Hasta el abismo', 'Hasta el gran río', 'Hasta el trono'], a: 0,
      e: '«…porque sus pecados han llegado hasta el cielo» (18:5).' },
    { t: 'tf', v: '18:5',
      q: 'Según Apocalipsis 18:5, Dios se ha olvidado de las maldades de Babilonia.', a: false,
      e: 'Falso: «Dios se ha ACORDADO de sus maldades» (18:5).' },
    { t: 'mc', v: '18:6', lit: 'pagadle el doble según sus obras',
      q: 'Según Apocalipsis 18:6, ¿cuánto se le debía pagar a Babilonia según sus obras?',
      o: ['El doble', 'El triple', 'Siete veces más', 'La mitad'], a: 0,
      e: '«Dadle a ella tal como ella os ha dado y pagadle el doble según sus obras» (18:6).' },
    { t: 'mc', v: '18:7', lit: 'Yo estoy sentada como una reina',
      q: '¿Qué dice Babilonia en su corazón, según Apocalipsis 18:7?',
      o: ['«Yo estoy sentada como una reina, no soy viuda»', '«Yo soy rica y de nada tengo necesidad»', '«Subiré al cielo y seré como el Altísimo»', '«Yo soy la madre de todas las naciones»'], a: 0,
      e: '«Yo estoy sentada como una reina, no soy viuda y no veré llanto» (18:7). Laodicea dice otra cosa: «Yo soy rico… de nada tengo necesidad» (3:17).' },
    { t: 'tf', v: '18:7',
      q: 'Babilonia dice en su corazón que no es viuda y que no verá llanto. (Apocalipsis 18:7)', a: true,
      e: 'Verdadero: «no soy viuda y no veré llanto» (18:7).' },
    { t: 'mc', v: '18:8', lit: 'muerte, llanto y hambre',
      q: '¿Qué plagas vendrán sobre Babilonia, según Apocalipsis 18:8?',
      o: ['Muerte, llanto y hambre', 'Guerra, peste y sequía', 'Granizo, fuego y sangre', 'Úlceras, tinieblas y sed'], a: 0,
      e: '«…en un solo día vendrán sus plagas: muerte, llanto y hambre» (18:8).' },
    { t: 'mc', v: '18:8', lit: 'en un solo día vendrán sus plagas',
      q: 'Según Apocalipsis 18:8, ¿en cuánto tiempo vendrán las plagas de Babilonia?',
      o: ['En un solo día', 'En una semana', 'En tres días y medio', 'En cuarenta y dos meses'], a: 0,
      e: '«…en un solo día vendrán sus plagas» (18:8). Ojo: los lamentos dicen «en una sola hora» (18:10, 18:17, 18:19).' },
    { t: 'tf', v: '18:8',
      q: 'Según Apocalipsis 18:8, Babilonia será tragada por la tierra.', a: false,
      e: 'Falso: «será QUEMADA CON FUEGO, porque poderoso es Dios el Señor, que la juzga» (18:8).' },
    { t: 'mc', v: '18:9', lit: 'cuando vean el humo de su incendio',
      q: 'Según Apocalipsis 18:9, ¿cuándo llorarán los reyes de la tierra sobre Babilonia?',
      o: ['Cuando vean el humo de su incendio', 'Cuando oigan la séptima trompeta', 'Cuando caiga la piedra de molino', 'Cuando se seque el río Éufrates'], a: 0,
      e: '«…llorarán y harán lamentación sobre ella cuando vean el humo de su incendio» (18:9).' },
    { t: 'mc', v: '18:10', lit: 'Babilonia, la ciudad fuerte',
      q: '¿Cómo llaman los reyes a Babilonia en su lamento? (Apocalipsis 18:10)',
      o: ['La ciudad fuerte', 'La ciudad santa', 'La ciudad del gran Rey', 'La ciudad de los siete montes'], a: 0,
      e: '«¡Ay, ay de la gran ciudad, de Babilonia, la ciudad fuerte!» (18:10).' },
    { t: 'fill', v: '18:10', ins: 'Apocalipsis 18:10 (RV1995) — Completa:',
      p: [{ x: '«¡Ay, ay de la gran ciudad, de Babilonia, la ciudad fuerte!, porque en una sola ' }, { b: 'hora', h: '¿en cuánto tiempo?' }, { x: ' vino tu ' }, { b: 'juicio', h: '¿qué vino?' }, { x: '.»' }] },
    { t: 'tf', v: '18:10',
      q: 'Según Apocalipsis 18:10, los reyes se acercaron a Babilonia para ayudarla.', a: false,
      e: 'Falso: se pusieron LEJOS «por el temor de su tormento» (18:10).' },
    { t: 'mc', v: '18:11', lit: 'ninguno compra más sus mercaderías',
      q: '¿Por qué lloran los mercaderes de la tierra, según Apocalipsis 18:11?',
      o: ['Porque ninguno compra más sus mercaderías', 'Porque perdieron sus naves en el mar', 'Porque el ángel les quitó el oro', 'Porque la bestia les quitó la marca'], a: 0,
      e: '«…porque ninguno compra más sus mercaderías» (18:11).' },
    { t: 'mc', v: '18:12', lit: 'de cobre, hierro y mármol',
      q: '¿Cuál de estos grupos está en la lista de mercaderías de Apocalipsis 18:12?',
      o: ['Cobre, hierro y mármol', 'Bronce, estaño y plomo', 'Cedro, ciprés y olivo', 'Sal, miel y leche'], a: 0,
      e: '«…de cobre, hierro y mármol» (18:12).' },
    { t: 'mc', v: '18:12', lit: 'de lino fino, púrpura, seda y escarlata',
      q: '¿Qué telas aparecen en la lista de mercaderías de Apocalipsis 18:12?',
      o: ['Lino fino, púrpura, seda y escarlata', 'Lana, algodón, cuero y pieles', 'Cilicio, saco, lana y lino', 'Seda, terciopelo, azul y blanco'], a: 0,
      e: '«…de lino fino, púrpura, seda y escarlata» (18:12).' },
    { t: 'mc', v: '18:13', lit: 'esclavos y almas de hombres',
      q: '¿Qué es lo último de la lista de mercaderías? (Apocalipsis 18:13)',
      o: ['Esclavos y almas de hombres', 'Caballos y carros', 'Incienso, mirra y olíbano', 'Oro y plata'], a: 0,
      e: 'La lista termina con «esclavos y almas de hombres» (18:13). El oro y la plata van al principio (18:12).' },
    { t: 'tf', v: '18:13',
      q: 'En la lista de mercaderías de Apocalipsis 18:13 aparecen el incienso, la mirra y el olíbano.', a: true,
      e: 'Verdadero: «incienso, mirra y olíbano» (18:13).' },
    { t: 'fill', v: '18:13', ins: 'Apocalipsis 18:13 (RV1995) — Completa:',
      p: [{ x: '«…vino y ' }, { b: 'aceite', h: '¿vino y qué?' }, { x: '; flor de harina y ' }, { b: 'trigo', h: '¿harina y qué?' }, { x: '; bestias y ovejas; ' }, { b: 'caballos', h: '¿qué animales?' }, { x: ' y carros…»' }] },
    { t: 'mc', v: '18:14', lit: 'nunca más las hallarás',
      q: 'Según Apocalipsis 18:14, ¿qué pasó con las cosas exquisitas y espléndidas de Babilonia?',
      o: ['Le faltaron y nunca más las hallará', 'Fueron llevadas al templo de Dios', 'Fueron repartidas entre los santos', 'Se guardaron hasta el día del juicio'], a: 0,
      e: '«…todas las cosas exquisitas y espléndidas te han faltado y nunca más las hallarás» (18:14).' },
    { t: 'tf', v: '18:15',
      q: 'Los mercaderes que lloran por Babilonia se habían enriquecido a costa de ella. (Apocalipsis 18:15)', a: true,
      e: 'Verdadero: «…que se han enriquecido a costa de ella, se pondrán lejos» (18:15).' },
    { t: 'mc', v: '18:16', lit: 'vestida de lino fino, púrpura y escarlata',
      q: 'Según los mercaderes, ¿de qué estaba vestida la gran ciudad? (Apocalipsis 18:16)',
      o: ['De lino fino, púrpura y escarlata', 'Del sol, con la luna a sus pies', 'De cilicio y de ceniza', 'De ropas blancas y limpias'], a: 0,
      e: '«…la gran ciudad, que estaba vestida de lino fino, púrpura y escarlata» (18:16). La mujer vestida del sol es la de 12:1.' },
    { t: 'mc', v: '18:17', lit: 'en una sola hora han sido consumidas tantas riquezas',
      q: '¿Qué texto dice «en una sola hora han sido consumidas tantas riquezas»?',
      o: ['Apocalipsis 18:17', 'Apocalipsis 18:10', 'Apocalipsis 18:19', 'Apocalipsis 18:8'], a: 0,
      e: 'Apocalipsis 18:17, al final del lamento de los mercaderes.' },
    { t: 'mc', v: '18:17', lit: 'Todo piloto y todos los que viajan en naves',
      q: 'Según Apocalipsis 18:17, ¿qué otro grupo se puso lejos y lloró por la ciudad?',
      o: ['Pilotos, marineros y los que trabajan en el mar', 'Sacerdotes, levitas y los que sirven en el templo', 'Soldados, capitanes y los que van a caballo', 'Pastores, labradores y los que cuidan la viña'], a: 0,
      e: '«Todo piloto y todos los que viajan en naves, los marineros y todos los que trabajan en el mar, se pusieron lejos» (18:17).' },
    { t: 'mc', v: '18:18', lit: 'Qué ciudad era semejante a esta gran ciudad',
      q: '¿Qué gritaba la gente del mar al ver el humo del incendio? (Apocalipsis 18:18)',
      o: ['«¿Qué ciudad era semejante a esta gran ciudad?»', '«¿Quién como la bestia y quién podrá luchar contra ella?»', '«¿Hasta cuándo Señor, santo y verdadero?»', '«¿Quién no te temerá, Señor?»'], a: 0,
      e: '«¿Qué ciudad era semejante a esta gran ciudad?» (18:18). «¿Quién como la bestia?» lo dicen en 13:4.' },
    { t: 'tf', v: '18:19',
      q: 'Según Apocalipsis 18:19, la gente del mar echó ceniza sobre sus cabezas.', a: false,
      e: 'Falso: «echaron POLVO sobre sus cabezas» (18:19).' },
    { t: 'mc', v: '18:20', lit: 'santos, apóstoles y profetas',
      q: 'Según Apocalipsis 18:20, ¿quiénes deben alegrarse sobre Babilonia?',
      o: ['El cielo, y los santos, apóstoles y profetas', 'Los reyes, los capitanes y los fuertes', 'Los mercaderes, pilotos y marineros', 'Las naciones, tribus y lenguas'], a: 0,
      e: '«Alégrate sobre ella, cielo, y vosotros santos, apóstoles y profetas, porque Dios os ha hecho justicia en ella» (18:20).' },
    { t: 'mc', v: '18:21', lit: 'como una gran piedra de molino',
      q: '¿Qué arrojó al mar el ángel poderoso de Apocalipsis 18:21?',
      o: ['Una piedra como una gran piedra de molino', 'Un incensario lleno del fuego del altar', 'Una copa llena de la ira de Dios', 'Una gran estrella ardiendo como antorcha'], a: 0,
      e: '«Un ángel poderoso tomó una piedra, como una gran piedra de molino, y la arrojó en el mar» (18:21).' },
    { t: 'tf', v: '18:21',
      q: 'El ángel poderoso arrojó la piedra de molino en el río Éufrates. (Apocalipsis 18:21)', a: false,
      e: 'Falso: «la arrojó en el MAR» (18:21).' },
    { t: 'mc', v: '18:22', lit: 'arpistas, músicos, flautistas y trompetistas',
      q: 'Según Apocalipsis 18:22, ¿qué voces no se oirán más en Babilonia?',
      o: ['De arpistas, músicos, flautistas y trompetistas', 'De sacerdotes, levitas, cantores y porteros', 'De pastores, labradores, viñadores y pescadores', 'De reyes, capitanes, jinetes y soldados'], a: 0,
      e: '«Voz de arpistas, músicos, flautistas y trompetistas no se oirá más de ti» (18:22).' },
    { t: 'fill', v: '18:23', ins: 'Apocalipsis 18:23 (RV1995) — Completa:',
      p: [{ x: '«Luz de ' }, { b: 'lámpara', h: '¿luz de qué?' }, { x: ' no alumbrará más en ti, ni voz de ' }, { b: 'esposo', h: '¿de quién?' }, { x: ' y esposa se oirá más en ti…»' }] },
    { t: 'mc', v: '18:23', lit: 'por tus hechicerías fueron engañadas todas las naciones',
      q: 'Según Apocalipsis 18:23, ¿con qué fueron engañadas todas las naciones?',
      o: ['Con sus hechicerías', 'Con sus riquezas', 'Con sus ejércitos', 'Con sus banquetes'], a: 0,
      e: '«…por tus hechicerías fueron engañadas todas las naciones» (18:23).' },
    { t: 'mc', v: '18:24', lit: 'la sangre de los profetas y de los santos',
      q: '¿Qué se halló en Babilonia, según Apocalipsis 18:24?',
      o: ['La sangre de los profetas y de los santos', 'El arca del pacto y el candelabro de oro', 'El libro sellado con siete sellos', 'Los tesoros del templo de Jerusalén'], a: 0,
      e: '«En ella se halló la sangre de los profetas y de los santos y de todos los que han sido muertos en la tierra» (18:24).' },
    { t: 'mc', v: '18:1', f: 'c',
      q: 'En la interpretación adventista, ¿con qué mensaje se une el ángel de Apocalipsis 18:1 que alumbra la tierra?',
      o: ['Con el mensaje de los tres ángeles de Apocalipsis 14', 'Con el mensaje de las siete trompetas', 'Con las cartas a las siete iglesias', 'Con el canto de los veinticuatro ancianos'], a: 0,
      e: 'Interpretación: repite con más fuerza el mensaje del segundo ángel (14:8), el último llamado antes del fin. El texto solo dice que la tierra fue alumbrada con su gloria (18:1).' },
    { t: 'mc', v: '18:2', f: 'c',
      q: 'En la lectura adventista, ¿qué representa Babilonia en Apocalipsis 18?',
      o: ['La religión que se apartó de la verdad de Dios', 'La antigua ciudad de Nabucodonosor, reconstruida', 'Una sola nación poderosa de hoy en día', 'El imperio de Grecia de Alejandro Magno'], a: 0,
      e: 'Interpretación: Babilonia (de Babel, confusión) es la religión que se aparta de Dios y se une con los reyes de la tierra; no señala a personas. El texto la llama «la gran ciudad» (18:10).' },
  ],

  tarjetas: [
    { f: 'El ángel de 18:1', r: 'Descendía del cielo con gran poder, y la tierra fue alumbrada con su gloria' },
    { f: '«¡Ha caído, ha caído la gran Babilonia!»', r: 'Apocalipsis 18:2 (parecido a 14:8)' },
    { f: '«¡Salid de ella, pueblo mío…!»', r: 'Apocalipsis 18:4: para no ser partícipes de sus pecados ni recibir sus plagas' },
    { f: 'Lo que dice Babilonia en su corazón (18:7)', r: '«Yo estoy sentada como una reina, no soy viuda y no veré llanto»' },
    { f: 'Sus plagas, y en cuánto tiempo (18:8)', r: 'En un solo día: muerte, llanto y hambre; y será quemada con fuego' },
    { f: 'Los tres grupos que lloran desde lejos (18:9-19)', r: 'Los reyes, los mercaderes y la gente del mar (pilotos y marineros)' },
    { f: '«En una sola hora…» (18:10, 17, 19)', r: 'Vino tu juicio · fueron consumidas tantas riquezas · ha sido desolada' },
    { f: 'Primero y último de las mercaderías (18:12-13)', r: 'Empieza con oro y plata; termina con esclavos y almas de hombres' },
    { f: 'Lo que gritaba la gente del mar (18:18)', r: '«¿Qué ciudad era semejante a esta gran ciudad?»' },
    { f: 'Quiénes se alegran (18:20)', r: 'El cielo, y los santos, apóstoles y profetas' },
    { f: 'La piedra de molino (18:21)', r: 'Un ángel poderoso la arrojó en el mar: así será derribada Babilonia' },
    { f: 'Lo que se halló en ella (18:24)', r: 'La sangre de los profetas y de los santos' },
  ],
};
