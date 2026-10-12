/* Apocalipsis 7 — Los 144.000 sellados y la gran multitud.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap7', label: 'Apocalipsis 7', sub: 'Los 144.000 y la gran multitud', vs: 17,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Al final del capítulo 6 la gente preguntaba quién podría sostenerse en
      pie (6:17). Antes de que se abra el séptimo sello, el capítulo 7 nos
      muestra a los que son de Dios.<br><br>
      Cuatro ángeles <strong>detienen los cuatro vientos</strong> para que no
      hagan daño, mientras otro ángel pone <strong>el sello del Dios
      vivo</strong> en la frente de los siervos de Dios.<br><br>
      Juan <strong>oye</strong> el número: <strong>144.000</strong>, doce mil
      de cada tribu de Israel. Después <strong>ve</strong> una <strong>gran
      multitud</strong> que nadie podía contar, vestida de blanco y con palmas,
      delante del trono.<br><br>
      <em>La idea del capítulo: Dios marca y cuida a los suyos antes de la
      tormenta, y al final los lleva a vivir con él, sin hambre, sin sed y sin
      lágrimas.</em>`) },

    { t: '🌬️ Los cuatro vientos detenidos (7:1-3)', capa: 'nucleo', h:
      li([`Juan vio <strong>cuatro ángeles</strong> de pie sobre <strong>los
           cuatro ángulos de la tierra</strong> (7:1).`,
          `Estaban <strong>«deteniendo los cuatro vientos de la tierra»</strong>
           (7:1), para que no soplara viento sobre la tierra, ni sobre el mar,
           ni sobre ningún árbol.`,
          `Otro ángel <strong>«subía desde donde sale el sol»</strong> (7:2) y
           tenía <strong>el sello del Dios vivo</strong>.`,
          `Ese ángel les gritó a los cuatro: <strong>«No hagáis daño a la tierra
           ni al mar ni a los árboles hasta que hayamos sellado en sus frentes a
           los siervos de nuestro Dios»</strong> (7:3).`]) +
      wa(`Primero el sello, después el daño: los vientos no se sueltan hasta que
      los siervos de Dios estén sellados <strong>en sus frentes</strong>.<br>
      No confundas estos cuatro ángeles (en los <strong>cuatro ángulos de la
      tierra</strong>, deteniendo vientos) con los cuatro ángeles
      <strong>atados junto al gran río Éufrates</strong> de la sexta trompeta
      (9:14).`) },

    { t: '🔢 Los 144.000 sellados (7:4-8)', capa: 'nucleo', h:
      hi(`<strong>«Y oí el número de los sellados: ciento cuarenta y cuatro mil
      sellados de todas las tribus de los hijos de Israel»</strong> (7:4).
      Doce tribus por <strong>12.000</strong> cada una dan
      <strong>144.000</strong>.`) +
      tbl(['#', 'Tribu, en el orden del texto', 'Versículo'], [
        ['1', '<strong>Judá</strong>', '7:5'], ['2', 'Rubén', '7:5'], ['3', 'Gad', '7:5'],
        ['4', 'Aser', '7:6'], ['5', 'Neftalí', '7:6'], ['6', 'Manasés', '7:6'],
        ['7', 'Simeón', '7:7'], ['8', 'Leví', '7:7'], ['9', 'Isacar', '7:7'],
        ['10', 'Zabulón', '7:8'], ['11', 'José', '7:8'], ['12', '<strong>Benjamín</strong>', '7:8'],
      ]) +
      wa(`Judá va <strong>primero</strong> y Benjamín <strong>último</strong>.
      En esta lista <strong>no aparecen Dan ni Efraín</strong>; sí aparecen
      <strong>Leví</strong> (7:7), <strong>José</strong> (7:8) y
      <strong>Manasés</strong> (7:6). Cada tribu: <strong>doce mil</strong>.`) },

    { t: '🌴 La gran multitud (7:9-10)', capa: 'nucleo', h:
      hi(`<strong>«Después de esto miré, y vi una gran multitud, la cual nadie
      podía contar»</strong> (7:9).`) +
      tbl(['Detalle', 'Lo que dice el texto'], [
        ['De dónde', '«de todas las naciones, tribus, pueblos y lenguas» (7:9)'],
        ['Dónde estaban', 'Delante del <strong>trono</strong> y en la presencia del <strong>Cordero</strong> (7:9)'],
        ['Ropa', '<strong>Ropas blancas</strong> (7:9)'],
        ['En las manos', '<strong>Palmas</strong> (7:9)'],
        ['Qué clamaban', '«¡La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero!» (7:10)'],
      ]) },

    { t: '🔍 144.000 y gran multitud: no confundir (7:4-9)', capa: 'nucleo', h:
      tbl(['', 'Los 144.000', 'La gran multitud'], [
        ['Cómo lo supo Juan', 'Lo <strong>oyó</strong> (7:4)', 'La <strong>vio</strong> (7:9)'],
        ['¿Se puede contar?', 'Sí: 12.000 por tribu (7:5-8)', 'No: nadie podía contarla (7:9)'],
        ['De dónde', 'De las tribus de los hijos de Israel (7:4)', 'De todas las naciones, tribus, pueblos y lenguas (7:9)'],
        ['Qué se dice', 'Sellados en la frente (7:3-4)', 'Ropas blancas y palmas, delante del trono (7:9)'],
      ]) +
      wa(`El capítulo no dice si son dos grupos distintos o el mismo pueblo visto
      de dos maneras. Para el concurso, quédate con lo que dice cada versículo:
      el número se <strong>oye</strong>, la multitud se <strong>ve</strong>.`) },

    { t: '🙌 Los ángeles adoran (7:11-12)', capa: 'nucleo', h:
      hi(`Todos los ángeles que estaban alrededor del trono, de los ancianos y
      de los cuatro seres vivientes, <strong>«se postraron sobre sus rostros
      delante del trono y adoraron a Dios»</strong> (7:11).`) +
      tbl(['#', 'Lo que dan a Dios, en el orden de 7:12'], [
        ['1', 'La bendición'], ['2', 'La gloria'], ['3', 'La sabiduría'],
        ['4', 'La acción de gracias'], ['5', 'La honra'], ['6', 'El poder'],
        ['7', 'La fortaleza'],
      ]) +
      wa(`Son <strong>siete</strong> cosas, y la alabanza empieza y termina con
      <strong>«¡Amén!»</strong> (7:12). No la mezcles con la de 5:12, que
      dice poder, riquezas, sabiduría, fortaleza, honra, gloria y alabanza.`) },

    { t: '❓ ¿Quiénes son los de ropas blancas? (7:13-14)', capa: 'nucleo', h:
      tbl(['Quién habla', 'Qué dice'], [
        ['Uno de los ancianos', '«Estos que están vestidos de ropas blancas, ¿quiénes son y de dónde han venido?» (7:13)'],
        ['Juan', '«Señor, tú lo sabes» (7:14)'],
        ['El anciano', '«Éstos son los que han salido de la gran tribulación» (7:14)'],
        ['El anciano', '«han lavado sus ropas y las han blanqueado en la sangre del Cordero» (7:14)'],
      ]) +
      wa(`Ojo: las ropas quedaron blancas <strong>en la sangre del
      Cordero</strong>, no en agua. Y la pregunta la hace <strong>un
      anciano</strong>, no un ángel.`) },

    { t: '🏕️ Lo que Dios les promete (7:15-17)', capa: 'nucleo', h:
      tbl(['Promesa', 'Versículo'], [
        ['Están delante del trono y lo <strong>sirven día y noche</strong> en su templo', '7:15'],
        ['El que está sentado sobre el trono <strong>extenderá su tienda</strong> junto a ellos', '7:15'],
        ['Ya no tendrán <strong>hambre ni sed</strong>', '7:16'],
        ['El <strong>sol</strong> no caerá más sobre ellos, ni calor alguno', '7:16'],
        ['El Cordero <strong>los pastoreará</strong> y los guiará a <strong>fuentes de aguas vivas</strong>', '7:17'],
        ['«Dios enjugará toda lágrima de los ojos de ellos» (7:17)', '7:17'],
      ]) +
      wa(`Aquí el <strong>Cordero</strong> hace de <strong>pastor</strong>:
      «el Cordero que está en medio del trono los pastoreará» (7:17).`) },

    { t: '🧭 Un paréntesis que responde a 6:17', capa: 'contexto', h:
      hi(`Desde aquí, lo que sigue es <strong>interpretación</strong>. La guía
      principal es el pastor Stephen (Esteban) Bohr.<br><br>
      El capítulo 7 es un <strong>paréntesis</strong> entre el sexto y el
      séptimo sello. El sexto terminó con una pregunta: ¿quién podrá
      <strong>sostenerse en pie</strong> en el día de la ira? En el Nuevo
      Testamento, «estar en pie» es lo contrario de <strong>caer</strong>. La
      respuesta son los <strong>sellados</strong>.<br><br>
      Bohr ve <strong>tres retratos</strong> de los 144.000:<br>
      · 7:1-8: el <strong>sello</strong> que los protege en el tiempo de
      angustia.<br>
      · 14:1-5: su <strong>carácter</strong>.<br>
      · 15:2-4: su <strong>victoria</strong> sobre la bestia y su imagen.<br><br>
      <strong>El orden de los hechos, según Bohr:</strong> se predican los
      mensajes de los tres ángeles → el mundo queda dividido en dos grupos →
      termina el sellamiento → Jesús deja de interceder (se cierra la puerta de
      la gracia) → los ángeles sueltan los vientos → vienen las siete plagas y
      la gran tribulación → Jesús viene y libra a su pueblo.<br><br>
      En todos los pasajes de los 144.000 se repite el esquema <strong>ira →
      sello → liberación</strong>.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 3-9;
      Bohr, «Los 144.000 y los 24 ancianos», pág. 129.`) },

    { t: '🧭 Los cuatro vientos (7:1-3)', capa: 'contexto', h:
      hi(`· <strong>Qué son:</strong> en la profecía, los vientos representan
      <strong>luchas</strong>. Elena de White lo explica con Daniel 7:2, donde
      los cuatro vientos agitan el mar y surgen los imperios. Sobre Apocalipsis
      7 dice que Juan vio «terremotos, tempestades y lucha política» retenidos
      por cuatro ángeles.<br>
      · <strong>Quién los detiene:</strong> mientras Jesús intercede en el
      santuario, el Espíritu Santo, por medio de los ángeles, retiene los
      vientos. Ahí está la seguridad de la iglesia.<br>
      · <strong>Cuándo se sueltan:</strong> cuando termine el sellamiento,
      Jesús dejará de interceder, el Espíritu se retirará de los que lo
      rechazaron y vendrá un tiempo de angustia como nunca hubo (Daniel
      12:1).<br><br>
      <strong>Aplicación:</strong> Elena de White dice que el Espíritu que
      refrena ya se está retirando: los desastres que se siguen uno tras otro
      son señales de que la venida de Jesús está cerca, y llaman a prepararse
      ahora, mientras los vientos están detenidos.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 7-8 y
      12-14 (cita «Testimonios para los ministros», pág. 444, y «Testimonios
      para la iglesia», tomo 6, pág. 407); Elena de White, «El conflicto de los
      siglos», pág. 360.`) },

    { t: '🧭 El sello del Dios vivo (7:2-3)', capa: 'contexto', h:
      hi(`<strong>El trasfondo es Ezequiel 9.</strong> Antes de que Babilonia
      destruyera Jerusalén, Dios mandó poner una señal en la frente de los que
      gemían por las abominaciones del pueblo (la peor era adorar al sol). Así
      separó a los fieles y los protegió.<br><br>
      · <strong>Para qué sirve un sello:</strong> dice de quién es algo
      (<strong>propiedad</strong>) y lo cuida (<strong>protección</strong>).
      La marca de la bestia es lo contrario.<br>
      · <strong>El sábado:</strong> Elena de White enseña que el cuarto
      mandamiento es el sello de la ley, porque es el único que tiene el nombre
      y el título del Legislador. Como los sellos de los antiguos pactos, dice
      quién es el Rey (el Creador) y cuál es su territorio (los cielos y la
      tierra).<br>
      · <strong>¿Y el Espíritu Santo?</strong> La Biblia dice que somos sellados
      con el Espíritu (Efesios 1:13). Para Bohr no hay contradicción: el
      Espíritu hace la obra <strong>por dentro</strong> y el sábado es la señal
      <strong>por fuera</strong>, como la circuncisión era sello de la fe de
      Abraham (Romanos 4:11).<br>
      · <strong>En la frente:</strong> la frente es la mente, donde Dios promete
      escribir su ley (Hebreos 8:10; Deuteronomio 6:8).<br><br>
      Las notas de Camilo añaden que no basta guardar el día por fuera: el sello
      es la aprobación de Dios sobre un corazón purificado.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 12,
      119-123 (cita «Patriarcas y profetas», pág. 315), 145 y 153-154; Elena
      de White, «El conflicto de los siglos»,
      pág. 488; notas de Camilo en Evernote, "El sello de Dios".`) },

    { t: '🧭 ¿Quiénes son los 144.000? (7:4-8)', capa: 'contexto', h:
      hi(`<strong>Esta es la postura de Bohr.</strong> Elena de White pidió no
      entrar «en controversias» sobre quiénes serán, pero sí luchar para estar
      entre ellos.<br><br>
      · <strong>Quiénes:</strong> el pueblo fiel de Dios que estará
      <strong>vivo cuando Jesús venga</strong>. Pasarán por la gran tribulación
      sin intercesor y no adorarán a la bestia.<br>
      · <strong>De dónde:</strong> son el <strong>Israel espiritual</strong>,
      de todas las naciones. Las diez tribus del norte se perdieron con el
      cautiverio asirio (722 a. C.).<br>
      · <strong>El número es simbólico:</strong> el capítulo está lleno de
      símbolos; si Israel es simbólico, el número también. 12 (el número de
      Israel) × 12 × 1.000 indica el verdadero pueblo de Dios en todo el mundo.
      En griego dice «ciento cuarenta y cuatro miles», y en hebreo «mil» puede
      significar un clan. Compáralo con los «siete mil» fieles de Elías.<br>
      · <strong>La lista de tribus</strong> (notas de Camilo): Judá va primero
      (Cristo es el León de Judá), y faltan Dan y Efraín porque ambas se
      inclinaron a la apostasía.<br><br>
      La Escuela Sabática de 2019 también lee el número como simbólico. Hay
      quienes lo toman literal; Bohr responde que entonces Dios tendría que
      predeterminar exactamente 12.000 por tribu.<br><br>
      Fuentes: Bohr, «Los 144.000 y los 24 ancianos», págs. 88, 94-95 y
      116-118; Bohr, «Los siete sellos de Apocalipsis», tomo 2, pág. 3;
      Escuela Sabática 2019-1T, pág. 43; notas de Camilo en Evernote, "Tribús de
      Israel".`) },

    { t: '🧭 La gran multitud: los mismos, vistos de otra manera (7:9-17)', capa: 'contexto', h:
      hi(`<strong>Postura de Bohr:</strong> los 144.000 y la gran multitud son
      <strong>el mismo grupo</strong> en dos momentos. Juan a menudo
      <strong>oye</strong> una cosa y luego la <strong>ve</strong> con otra
      figura: oye «León» y ve un Cordero (capítulo 5).`) +
      tbl(['Juan oye (7:4)', 'Juan ve (7:9)'], [
        ['El número', 'Nadie podía contarla'],
        ['144.000', 'Una gran multitud'],
        ['De las tribus de Israel', 'De todas las naciones'],
        ['Sellados, antes de la tribulación', 'Con ropas blancas, después de ella'],
      ]) +
      hi(`· El griego dice «la tribulación, <strong>la grande</strong>»: es el
      tiempo de angustia final (Daniel 12:1), no las pruebas de toda época.<br>
      · Elena de White mezcla las descripciones de los dos grupos, dice que solo
      los 144.000 entran al templo («Primeros escritos», pág. 19), y 7:15 dice que la multitud sirve en el
      templo.<br>
      · «Ya no tendrán hambre ni sed»: pasaron vivos por las plagas.<br>
      · Las <strong>palmas</strong> recuerdan la fiesta de los
      tabernáculos.<br><br>
      <strong>Otras lecturas:</strong> unos ven dos grupos (la multitud sería
      el fruto de la predicación de los 144.000); la Escuela Sabática de 2019
      sugiere que la multitud son los redimidos de todas las épocas.<br><br>
      Fuentes: Bohr, «Los 144.000 y los 24 ancianos», págs. 94 y 120-125; Bohr,
      «Los siete sellos de Apocalipsis», tomo 2, págs. 81-86; Elena de White,
      «El conflicto de los siglos», pág. 521; Escuela Sabática 2019-1T,
      pág. 44.`) },

    { t: '🧭 Ropas lavadas en la sangre (7:13-14)', capa: 'contexto', h:
      hi(`· <strong>¿Quién pregunta?</strong> El texto dice «uno de los
      ancianos». Elena de White, al contar la escena, dice que fue
      <strong>un ángel</strong>. Bohr usa esto para apoyar su idea de que los
      ancianos son ángeles de alto rango.<br>
      · <strong>Las ropas:</strong> Elena de White las une con el traje de bodas
      de la parábola (Mateo 22:11): es el <strong>carácter</strong> lavado y
      emblanquecido en la sangre del Cordero. En el juicio, Dios examina si cada
      uno tiene ese manto.<br><br>
      <strong>Aplicación:</strong> nadie se limpia solo; la limpieza viene de la
      sangre de Jesús. Pero cada uno decide acercarse a él mientras la puerta de
      la gracia está abierta. Elena de White animó: «Luchemos con todas las
      fuerzas que Dios nos ha dado para estar entre los 144,000».<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 55-56;
      tomo 2, pág. 3; Elena de White, «El conflicto de los siglos»,
      págs. 351-352.`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      hi(`Cada símbolo del capítulo tiene un texto bíblico que lo explica.`) +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Vientos', 'Luchas y guerras entre naciones', 'Jeremías 49:36-37; Daniel 7:2: «los cuatro vientos del cielo combatían en el gran mar»'],
        ['Cuatro ángulos de la tierra', 'Todo el mundo (cuatro es universalidad)', 'Apocalipsis 20:8: «las naciones que están en los cuatro ángulos de la tierra»'],
        ['Sello', 'Propiedad y protección de Dios', 'Ezequiel 9:4-6; 2 Timoteo 2:19; Efesios 1:13'],
        ['Frente', 'La mente, donde Dios escribe su ley', 'Hebreos 10:16; Deuteronomio 6:6-8'],
        ['Árboles', 'El pueblo de Dios', 'Salmo 1:3; Jeremías 17:8'],
        ['Israel y sus tribus', 'El pueblo de Dios de todas las naciones', 'Gálatas 3:29; Romanos 2:28-29'],
        ['Doce', 'El número del pueblo de Dios', 'Apocalipsis 21:12, 14: las doce tribus y los doce apóstoles'],
        ['Ropas blanqueadas en la sangre', 'El carácter limpio por la justicia de Cristo', 'Isaías 1:18; Apocalipsis 19:8'],
        ['Palmas', 'La fiesta de los tabernáculos, fiesta de alegría', 'Levítico 23:40'],
      ]) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      págs. 104-106; Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 4,
      12, 69-71 y 120; Bohr, «Los 144.000 y los 24 ancianos», págs. 94 y 117; Elena
      de White, «El conflicto de los siglos», pág. 360; notas de Camilo en
      Evernote, "Vientos".`) },
  ],

  preguntas: [
    { t: 'mc', v: '7:1', lit: 'cuatro ángeles de pie sobre los cuatro ángulos de la tierra',
      q: '¿Qué vio Juan de pie sobre los cuatro ángulos de la tierra? (Apocalipsis 7:1)',
      o: ['Cuatro ángeles', 'Cuatro seres vivientes', 'Cuatro jinetes', 'Cuatro ancianos'], a: 0,
      e: '«…vi cuatro ángeles de pie sobre los cuatro ángulos de la tierra» (7:1). Los cuatro jinetes son los de los sellos del capítulo 6.' },
    { t: 'mc', v: '7:1', lit: 'deteniendo los cuatro vientos de la tierra',
      q: '¿Qué estaban deteniendo los cuatro ángeles? (Apocalipsis 7:1)',
      o: ['Los cuatro vientos de la tierra', 'Las aguas del gran río Éufrates', 'Las siete trompetas del juicio', 'El fuego del altar de oro'], a: 0,
      e: '«…deteniendo los cuatro vientos de la tierra para que no soplara viento alguno» (7:1).' },
    { t: 'tf', v: '7:1',
      q: 'Los cuatro ángeles detenían los vientos para que no soplaran sobre la tierra, ni sobre el mar, ni sobre árbol alguno. (Apocalipsis 7:1)', a: true,
      e: 'Verdadero (Apocalipsis 7:1).' },
    { t: 'mc', v: '7:2', lit: 'subía desde donde sale el sol',
      q: '¿De dónde subía el ángel que tenía el sello del Dios vivo? (Apocalipsis 7:2)',
      o: ['Desde donde sale el sol', 'Desde el pozo del abismo', 'Desde el gran río Éufrates', 'Desde el mar de vidrio'], a: 0,
      e: '«Vi también otro ángel, que subía desde donde sale el sol» (7:2).' },
    { t: 'mc', v: '7:2', lit: 'tenía el sello del Dios vivo',
      q: '¿Qué tenía el ángel que subía desde donde sale el sol? (Apocalipsis 7:2)',
      o: ['El sello del Dios vivo', 'Un incensario de oro', 'La llave del abismo', 'Una hoz aguda'], a: 0,
      e: '«…y que tenía el sello del Dios vivo» (7:2). El incensario es de 8:3 y la llave del abismo de 9:1.' },
    { t: 'fill', v: '7:3', ins: 'Apocalipsis 7:3 (RV1995) — Completa:',
      p: [{ x: '«No hagáis daño a la tierra ni al mar ni a los ' }, { b: 'árboles', h: '¿a qué más?' }, { x: ' hasta que hayamos sellado en sus ' }, { b: 'frentes', h: '¿dónde?' }, { x: ' a los siervos de nuestro Dios.»' }] },
    { t: 'mc', v: '7:3', lit: 'sellado en sus frentes',
      q: '¿En qué parte del cuerpo se sellaba a los siervos de Dios? (Apocalipsis 7:3)',
      o: ['En sus frentes', 'En sus manos derechas', 'En sus corazones', 'En sus ropas blancas'], a: 0,
      e: '«…hasta que hayamos sellado en sus frentes a los siervos de nuestro Dios» (7:3).' },
    { t: 'mc', v: '7:3', lit: 'No hagáis daño a la tierra',
      q: '¿Qué texto dice «No hagáis daño a la tierra ni al mar ni a los árboles»?',
      o: ['Apocalipsis 7:3', 'Apocalipsis 7:1', 'Apocalipsis 9:4', 'Apocalipsis 8:7'], a: 0,
      e: 'Apocalipsis 7:3: lo grita el ángel que tenía el sello del Dios vivo a los cuatro ángeles.' },
    { t: 'mc', v: '7:4', lit: 'ciento cuarenta y cuatro mil sellados',
      q: '¿Cuántos sellados oyó Juan? (Apocalipsis 7:4)',
      o: ['144.000', '12.000', '200.000.000', '7.000'], a: 0,
      e: '«…ciento cuarenta y cuatro mil sellados de todas las tribus de los hijos de Israel» (7:4). Los doscientos millones son los jinetes de 9:16.' },
    { t: 'tf', v: '7:4',
      q: 'Según Apocalipsis 7:4, Juan vio el número de los sellados.', a: false,
      e: 'Falso: dice «Y OÍ el número de los sellados» (7:4). La gran multitud, en cambio, la vio (7:9).' },
    { t: 'fill', v: '7:4', ins: 'Apocalipsis 7:4 (RV1995) — Completa:',
      p: [{ x: 'Y oí el número de los sellados: ' }, { b: 'ciento cuarenta y cuatro mil', h: '¿cuántos?' }, { x: ' sellados de todas las tribus de los hijos de ' }, { b: 'Israel', h: '¿de quién?' }, { x: '.' }] },
    { t: 'mc', v: '7:5', lit: 'De la tribu de Judá, doce mil sellados',
      q: '¿Cuál es la primera tribu en la lista de los sellados? (Apocalipsis 7:5)',
      o: ['Judá', 'Rubén', 'Leví', 'Benjamín'], a: 0,
      e: '«De la tribu de Judá, doce mil sellados» (7:5). Le siguen Rubén y Gad.' },
    { t: 'mc', v: '7:5-8', lit: 'doce mil',
      q: '¿Cuántos sellados había de cada tribu? (Apocalipsis 7:5-8)',
      o: ['Doce mil', 'Diez mil', 'Siete mil', 'Mil'], a: 0,
      e: 'De cada tribu, «doce mil» (7:5-8). Doce tribus por doce mil dan 144.000 (7:4).' },
    { t: 'tf', v: '7:6',
      q: 'Apocalipsis 7:6 nombra las tribus de Aser, Neftalí y Efraín.', a: false,
      e: 'Falso: nombra a Aser, Neftalí y MANASÉS (7:6). Efraín no aparece en la lista.' },
    { t: 'mc', v: '7:7', lit: 'De la tribu de Simeón',
      q: '¿Qué tribus se nombran en Apocalipsis 7:7?',
      o: ['Simeón, Leví e Isacar', 'Aser, Neftalí y Manasés', 'Judá, Rubén y Gad', 'Zabulón, José y Benjamín'], a: 0,
      e: 'Apocalipsis 7:7: Simeón, Leví e Isacar. Judá, Rubén y Gad son de 7:5; Aser, Neftalí y Manasés de 7:6; Zabulón, José y Benjamín de 7:8.' },
    { t: 'mc', v: '7:5-8',
      q: '¿Cuál de estas tribus NO aparece en la lista de Apocalipsis 7:5-8?',
      o: ['Dan', 'Leví', 'José', 'Manasés'], a: 0,
      e: 'La lista nombra a Leví (7:7), José (7:8) y Manasés (7:6). Dan no aparece; tampoco Efraín.' },
    { t: 'tf', v: '7:8',
      q: 'La última tribu de la lista de los sellados es Benjamín. (Apocalipsis 7:8)', a: true,
      e: 'Verdadero: «De la tribu de Benjamín, doce mil sellados» (7:8).' },
    { t: 'mc', v: '7:9', lit: 'la cual nadie podía contar',
      q: '¿Qué vio Juan después de oír el número de los sellados? (Apocalipsis 7:9)',
      o: ['Una gran multitud que nadie podía contar', 'Un ejército de doscientos millones', 'Siete ángeles con siete trompetas', 'Un ángel con un incensario de oro'], a: 0,
      e: '«…vi una gran multitud, la cual nadie podía contar» (7:9).' },
    { t: 'mc', v: '7:9', lit: 'de todas las naciones, tribus, pueblos y lenguas',
      q: '¿De dónde venía la gran multitud? (Apocalipsis 7:9)',
      o: ['De todas las naciones, tribus, pueblos y lenguas', 'Solo de las doce tribus de los hijos de Israel', 'De las siete iglesias que están en Asia', 'De la gran ciudad de Jerusalén y de Judea'], a: 0,
      e: '«…de todas las naciones, tribus, pueblos y lenguas» (7:9). Los 144.000 son «de todas las tribus de los hijos de Israel» (7:4).' },
    { t: 'mc', v: '7:9', lit: 'con palmas en sus manos',
      q: '¿Qué tenían en las manos los de la gran multitud? (Apocalipsis 7:9)',
      o: ['Palmas', 'Arpas de oro', 'Copas de incienso', 'Coronas de oro'], a: 0,
      e: '«…vestidos de ropas blancas y con palmas en sus manos» (7:9).' },
    { t: 'tf', v: '7:10',
      q: 'La gran multitud clamaba que la salvación pertenece a nuestro Dios y al Cordero. (Apocalipsis 7:10)', a: true,
      e: 'Verdadero: «¡La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero!» (7:10).' },
    { t: 'mc', v: '7:10', lit: 'La salvación pertenece a nuestro Dios',
      q: '¿Qué texto dice «La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero»?',
      o: ['Apocalipsis 7:10', 'Apocalipsis 7:12', 'Apocalipsis 7:14', 'Apocalipsis 5:13'], a: 0,
      e: 'Apocalipsis 7:10: lo clama a gran voz la gran multitud.' },
    { t: 'mc', v: '7:11', lit: 'se postraron sobre sus rostros',
      q: '¿Qué hicieron todos los ángeles que estaban alrededor del trono? (Apocalipsis 7:11)',
      o: ['Se postraron sobre sus rostros y adoraron a Dios', 'Tocaron sus trompetas delante del trono', 'Echaron sus coronas delante del trono', 'Cantaron un cántico nuevo con sus arpas'], a: 0,
      e: '«…se postraron sobre sus rostros delante del trono y adoraron a Dios» (7:11). Los que echan sus coronas son los ancianos de 4:10.' },
    { t: 'mc', v: '7:12', lit: 'la honra, el poder y la fortaleza',
      q: '¿Cuántas cosas dan los ángeles a Dios en la alabanza de Apocalipsis 7:12?',
      o: ['Siete', 'Cuatro', 'Tres', 'Doce'], a: 0,
      e: 'Siete: la bendición, la gloria, la sabiduría, la acción de gracias, la honra, el poder y la fortaleza (7:12).' },
    { t: 'tf', v: '7:12',
      q: 'La alabanza de los ángeles en Apocalipsis 7:12 empieza y termina con «¡Amén!».', a: true,
      e: 'Verdadero: «¡Amén! La bendición… por los siglos de los siglos. ¡Amén!» (7:12).' },
    { t: 'mc', v: '7:13', lit: 'uno de los ancianos habló',
      q: '¿Quién le preguntó a Juan quiénes eran los vestidos de ropas blancas? (Apocalipsis 7:13)',
      o: ['Uno de los ancianos', 'Uno de los seres vivientes', 'El ángel del sello', 'Uno de los siete ángeles'], a: 0,
      e: '«Entonces uno de los ancianos habló, diciéndome…» (7:13).' },
    { t: 'mc', v: '7:14', lit: 'Señor, tú lo sabes',
      q: '¿Qué le respondió Juan al anciano? (Apocalipsis 7:14)',
      o: ['«Señor, tú lo sabes»', '«No lo sé, Señor»', '«Son los profetas»', '«Son los apóstoles»'], a: 0,
      e: '«Yo le dije: “Señor, tú lo sabes”» (7:14). Entonces el anciano le explicó.' },
    { t: 'mc', v: '7:14', lit: 'los que han salido de la gran tribulación',
      q: 'Según el anciano, ¿de dónde habían salido los vestidos de ropas blancas? (Apocalipsis 7:14)',
      o: ['De la gran tribulación', 'De las doce tribus', 'Del pozo del abismo', 'De la gran ciudad'], a: 0,
      e: '«Éstos son los que han salido de la gran tribulación» (7:14).' },
    { t: 'fill', v: '7:14', ins: 'Apocalipsis 7:14 (RV1995) — Completa:',
      p: [{ x: 'han lavado sus ropas y las han ' }, { b: 'blanqueado', h: '¿qué hicieron con ellas?' }, { x: ' en la ' }, { b: 'sangre', h: '¿en qué?' }, { x: ' del Cordero.' }] },
    { t: 'tf', v: '7:14',
      q: 'El anciano dice que los de ropas blancas son los que han salido de la gran batalla. (Apocalipsis 7:14)', a: false,
      e: 'Falso: dice «de la gran TRIBULACIÓN» (7:14).' },
    { t: 'mc', v: '7:15', lit: 'lo sirven día y noche en su templo',
      q: '¿Qué hacen los de ropas blancas delante del trono de Dios? (Apocalipsis 7:15)',
      o: ['Lo sirven día y noche en su templo', 'Juzgan a las doce tribus de Israel', 'Reinan sobre la tierra mil años', 'Tocan arpas sobre el mar de vidrio'], a: 0,
      e: '«Por eso están delante del trono de Dios y lo sirven día y noche en su templo» (7:15).' },
    { t: 'tf', v: '7:15',
      q: 'El que está sentado sobre el trono extenderá su tienda junto a ellos. (Apocalipsis 7:15)', a: true,
      e: 'Verdadero (Apocalipsis 7:15).' },
    { t: 'mc', v: '7:16', lit: 'Ya no tendrán hambre ni sed',
      q: 'Según Apocalipsis 7:16, ¿qué ya no tendrán los de ropas blancas?',
      o: ['Hambre ni sed', 'Miedo ni dolor', 'Frío ni noche', 'Trabajo ni cansancio'], a: 0,
      e: '«Ya no tendrán hambre ni sed, y el sol no caerá más sobre ellos, ni calor alguno» (7:16).' },
    { t: 'tf', v: '7:16',
      q: 'Según Apocalipsis 7:16, la luna no caerá más sobre ellos.', a: false,
      e: 'Falso: dice que el SOL no caerá más sobre ellos, ni calor alguno (7:16).' },
    { t: 'mc', v: '7:17', lit: 'los guiará a fuentes de aguas vivas',
      q: '¿A dónde los guiará el Cordero? (Apocalipsis 7:17)',
      o: ['A fuentes de aguas vivas', 'A la ciudad de oro puro', 'Al monte de Sion', 'A verdes pastos junto al río'], a: 0,
      e: '«…el Cordero que está en medio del trono los pastoreará y los guiará a fuentes de aguas vivas» (7:17).' },
    { t: 'fill', v: '7:17', ins: 'Apocalipsis 7:17 (RV1995) — Completa:',
      p: [{ x: 'porque el ' }, { b: 'Cordero', h: '¿quién?' }, { x: ' que está en medio del trono los ' }, { b: 'pastoreará', h: '¿qué hará con ellos?' }, { x: ' y los guiará a fuentes de aguas vivas.' }] },
    { t: 'mc', v: '7:17', lit: 'Dios enjugará toda lágrima',
      q: '¿Qué texto dice «Y Dios enjugará toda lágrima de los ojos de ellos»?',
      o: ['Apocalipsis 7:17', 'Apocalipsis 7:16', 'Apocalipsis 7:15', 'Apocalipsis 7:10'], a: 0,
      e: 'Apocalipsis 7:17, el último versículo del capítulo.' },
    { t: 'mc', v: '7:1', f: 'c',
      q: 'Según Bohr, ¿qué lugar ocupa Apocalipsis 7 en la serie de los sellos?',
      o: ['Un paréntesis entre el sexto y el séptimo sello', 'La apertura misma del séptimo sello', 'El primero de los siete sellos', 'Una visión aparte, sin relación con los sellos'], a: 0,
      e: 'Es un interludio que responde la pregunta de 6:17, «¿quién podrá sostenerse en pie?». Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 4-5.' },
    { t: 'mc', v: '7:1', f: 'c',
      q: 'Según Elena de White, ¿qué representan los cuatro vientos que detienen los ángeles?',
      o: ['Terremotos, tempestades y lucha política', 'Los cuatro evangelios del Nuevo Testamento', 'Las cuatro estaciones del año', 'Los cuatro imperios de Daniel 2'], a: 0,
      e: 'Juan ve «terremotos, tempestades y lucha política» retenidos por cuatro ángeles hasta que Dios ordene soltarlos. Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 2, pág. 7 (cita «Testimonios para los ministros», pág. 444); Elena de White, «El conflicto de los siglos», pág. 360.' },
    { t: 'tf', v: '7:1', f: 'c',
      q: 'Según Bohr, cuando Jesús termine su intercesión en el santuario, los ángeles dejarán de detener los vientos y vendrá la gran tribulación.', a: true,
      e: 'Verdadero: mientras Jesús intercede, el Espíritu retiene los vientos por medio de los ángeles; al cerrarse la gracia, se sueltan. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 7-8 y 12.' },
    { t: 'mc', v: '7:2', f: 'c',
      q: 'Según Bohr, ¿qué pasaje del Antiguo Testamento es el trasfondo del sellamiento?',
      o: ['Ezequiel 9', 'Génesis 6', 'Éxodo 12', 'Daniel 3'], a: 0,
      e: 'En Ezequiel 9 Dios manda poner una señal en la frente de los que gemían por las abominaciones, antes de la destrucción de Jerusalén. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 112-113, y tomo 2, pág. 12.' },
    { t: 'mc', v: '7:2', f: 'c',
      q: 'Según Bohr, ¿qué dos cosas indica el sello de Dios, igual que la marca de la bestia en el bando contrario?',
      o: ['Propiedad y protección', 'Riqueza y poder', 'Edad y nacionalidad', 'Fama y autoridad'], a: 0,
      e: 'El que tiene el sello pertenece a Dios y tiene su protección; el que tiene la marca pertenece a la bestia. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, pág. 12.' },
    { t: 'mc', v: '7:2', f: 'c',
      q: 'Según Elena de White, ¿por qué el cuarto mandamiento es el sello de la ley de Dios?',
      o: ['Es el único con el nombre y el título del Legislador', 'Es el más largo de los diez mandamientos', 'Fue el primero que Dios escribió en piedra', 'Es el único que trae una promesa'], a: 0,
      e: 'En «Patriarcas y profetas» dice que es el único que dice por autoridad de quién se dio la ley. Bohr lo compara con los sellos de los pactos antiguos: nombre, cargo y territorio del rey. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 119 y 145.' },
    { t: 'tf', v: '7:2', f: 'c',
      q: 'Según Bohr, decir que el sábado es el sello de Dios contradice la Biblia, que dice que somos sellados con el Espíritu Santo.', a: false,
      e: 'Falso: para Bohr son dos caras de la misma moneda: la obra interna del Espíritu y su señal externa, como la circuncisión fue sello de la fe de Abraham (Romanos 4:11). Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 120-121.' },
    { t: 'mc', v: '7:3', f: 'c',
      q: 'Según Bohr, ¿por qué el sello se pone «en sus frentes»?',
      o: ['La frente representa la mente, donde Dios escribe su ley', 'Para que todos vean una marca en la piel', 'Porque allí llevaban la corona los reyes', 'Porque así se marcaba a los esclavos romanos'], a: 0,
      e: 'Dios pidió llevar su ley «como frontales entre tus ojos» (Deuteronomio 6:8) y prometió escribirla en la mente (Hebreos 8:10). Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 153-154.' },
    { t: 'mc', v: '7:3', f: 'c',
      q: 'Según Elena de White en «El conflicto de los siglos», ¿cuál será la gran prueba de lealtad que separe a los que reciben el sello de Dios?',
      o: ['El sábado del cuarto mandamiento', 'La forma de bautizar a los creyentes', 'El pago fiel de los diezmos', 'La manera de celebrar la Santa Cena'], a: 0,
      e: 'El sábado será «la gran piedra de toque de la lealtad». Las notas de Camilo añaden que no basta la observancia externa: el sello es la aprobación de Dios sobre un corazón limpio. Fuentes: Elena de White, «El conflicto de los siglos», pág. 488; notas de Camilo en Evernote, "El sello de Dios".' },
    { t: 'mc', v: '7:4', f: 'c',
      q: 'Según Bohr, ¿quiénes son los 144.000?',
      o: ['El pueblo fiel que estará vivo cuando Jesús venga', 'Los judíos que se conviertan en el tiempo del fin', 'Los mártires de todas las épocas de la historia', 'Los pioneros adventistas del siglo XIX'], a: 0,
      e: 'Es la postura de Bohr: son el Israel espiritual que pasa por la gran tribulación y no adora a la bestia. Fuentes: Bohr, «Los 144.000 y los 24 ancianos», págs. 94-95; «Los siete sellos de Apocalipsis», tomo 2, págs. 6 y 11.' },
    { t: 'tf', v: '7:4', f: 'c',
      q: 'Según Bohr, el número 144.000 debe entenderse literal: ni uno más ni uno menos.', a: false,
      e: 'Falso: para Bohr es simbólico, como casi todo en el capítulo; si Israel es simbólico, el número también. La Escuela Sabática de 2019 opina lo mismo. Fuentes: Bohr, «Los 144.000 y los 24 ancianos», págs. 116-117; Escuela Sabática 2019-1T, pág. 43.' },
    { t: 'mc', v: '7:4', f: 'c',
      q: 'Según Bohr, ¿qué indica el número 144.000, que resulta de 12 × 12 × 1.000?',
      o: ['El verdadero Israel de Dios en todo el mundo al final', 'La cantidad exacta de judíos fieles en el fin', 'El número de ángeles que rodean el trono', 'Los años que faltan para la segunda venida'], a: 0,
      e: 'El 12 es el número de Israel (doce patriarcas, doce apóstoles); su intensificación señala al pueblo de Dios completo en todo el mundo. Fuente: Bohr, «Los 144.000 y los 24 ancianos», pág. 117.' },
    { t: 'mc', v: '7:4', f: 'c',
      q: 'Según Elena de White, citada por Bohr, ¿qué actitud se debe tener ante la pregunta de quiénes formarán los 144.000?',
      o: ['No discutirlo, y luchar por estar entre ellos', 'Hacer una lista de nombres en cada iglesia', 'Esperar una señal visible en la frente', 'Calcular cuántos habrá en cada país'], a: 0,
      e: 'Pidió no entrar «en controversias» sobre quiénes serán, y también: «Luchemos con todas las fuerzas que Dios nos ha dado para estar entre los 144,000». Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, pág. 3.' },
    { t: 'mc', v: '7:5-8', f: 'c',
      q: 'Según las notas de Camilo, ¿por qué no aparecen Dan ni Efraín en la lista de las tribus?',
      o: ['Ambas se inclinaron fuertemente a la apostasía', 'Ambas desaparecieron en tiempo de los jueces', 'Ambas eran tribus de sacerdotes', 'Ambas vivían fuera de la tierra de Canaán'], a: 0,
      e: 'Las notas explican que ambas tenían «mala prensa» en el Antiguo Testamento por su tendencia a la apostasía, y que Judá va primero porque Cristo es la cabeza del nuevo Israel. Fuente: notas de Camilo en Evernote, "Tribús de Israel".' },
    { t: 'mc', v: '7:9', f: 'c',
      q: 'Según Bohr, ¿qué relación hay entre los 144.000 y la gran multitud?',
      o: ['Son el mismo grupo: Juan lo oye y luego lo ve', 'La multitud es el fruto de la predicación de ellos', 'La multitud son los redimidos de todas las épocas', 'Los 144.000 son judíos y la multitud, gentiles'], a: 0,
      e: 'Como en 5:5-6 (oye «León», ve un Cordero), Juan oye el número y luego ve la multitud. La Escuela Sabática de 2019 sugiere que la multitud son los redimidos de todas las épocas. Fuentes: Bohr, «Los 144.000 y los 24 ancianos», págs. 120-121; Escuela Sabática 2019-1T, pág. 44.' },
    { t: 'mc', v: '7:9', f: 'c',
      q: 'Según Bohr, ¿qué fiesta judía recuerdan las palmas en las manos de la multitud?',
      o: ['La fiesta de los tabernáculos', 'La fiesta de la Pascua', 'El día de la expiación', 'La fiesta de Pentecostés'], a: 0,
      e: 'Bohr relaciona las palmas con la fiesta de los tabernáculos (Levítico 23:34-36). Fuente: Bohr, «Los 144.000 y los 24 ancianos», pág. 94.' },
    { t: 'mc', v: '7:13', f: 'c',
      q: 'Según Bohr, ¿cómo llama Elena de White al «anciano» que le pregunta a Juan quiénes son los de ropas blancas?',
      o: ['Un ángel', 'Un profeta', 'Un apóstol', 'Un mártir'], a: 0,
      e: 'En varios escritos dice que fue «el ángel» quien preguntó; Bohr lo usa para apoyar que los ancianos son ángeles de alto rango. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 55-56.' },
    { t: 'mc', v: '7:14', f: 'c',
      q: 'Según Bohr, ¿qué es «la gran tribulación» de la que salió la multitud?',
      o: ['El tiempo de angustia final de Daniel 12:1', 'Las pruebas de los cristianos de toda época', 'La persecución de Nerón contra la iglesia', 'La destrucción de Jerusalén por Roma'], a: 0,
      e: 'El griego dice «la tribulación, la grande», la misma de Daniel 12:1 y Mateo 24:21. La Escuela Sabática de 2019 la ve más amplia. Fuentes: Bohr, «Los 144.000 y los 24 ancianos», pág. 122; Escuela Sabática 2019-1T, pág. 44.' },
    { t: 'tf', v: '7:15', f: 'c',
      q: 'Según Bohr, Elena de White dice que solo los 144.000 entran al templo celestial, y la gran multitud sirve a Dios en su templo; por eso son el mismo grupo.', a: true,
      e: 'Verdadero: es uno de los argumentos de Bohr. Fuente: Bohr, «Los 144.000 y los 24 ancianos», pág. 125.' },
    { t: 'mc', v: '7:16', f: 'c',
      q: 'Según Bohr, ¿por qué se dice que la multitud ya no tendrá hambre ni sed?',
      o: ['Pasaron vivos por las plagas del fin', 'Ayunaron durante toda su vida', 'Vivieron en el desierto con Moisés', 'Murieron de hambre en la Edad Media'], a: 0,
      e: 'Las plagas convierten el agua en sangre y el sol quema la vegetación; el pueblo de Dios sufre hambre y sed, pero es librado. Fuentes: Bohr, «Los 144.000 y los 24 ancianos», pág. 125; Elena de White, «El conflicto de los siglos», pág. 521.' },
    { t: 'mc', v: '7:1', f: 'c',
      q: 'Según una nota de Camilo, ¿qué texto de los profetas usa «los cuatro vientos» para la guerra que dispersa a una nación?',
      o: ['Jeremías 49:36', 'Génesis 8:1', 'Éxodo 14:21', 'Números 11:31'], a: 0,
      e: 'En los profetas el viento es la acción destructora de las naciones; Génesis 8:1, Éxodo 14:21 y Números 11:31 hablan de vientos literales que Dios usa. Fuentes: notas de Camilo en Evernote, "Vientos"; Elena de White, «El conflicto de los siglos», pág. 360.' },
    { t: 'mc', v: '7:4', f: 'c',
      q: 'Según Bohr, ¿qué texto enseña que los que son de Cristo son linaje de Abraham, es decir, el Israel de Dios?',
      o: ['Gálatas 3:29', 'Génesis 49:10', '2 Reyes 17:6', 'Zacarías 10:3'], a: 0,
      e: 'Por eso las tribus de 7:4-8 no son judíos literales sino el pueblo de Dios de todas las naciones (Romanos 2:28-29). Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 59 y 69-71; Bohr, «15 principios de interpretación profética», tomo 2, pág. 106.' },
    { t: 'tf', v: '7:2-3', f: 'c',
      q: 'Según Bohr, 2 Timoteo 2:19 une el sello de Dios con la propiedad: el Señor conoce a los que son suyos.', a: true,
      e: 'Verdadero: el sello dice a quién pertenece alguien y lo protege. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 2, págs. 4 y 12.' },
  ],

  tarjetas: [
    { f: 'Qué detenían los cuatro ángeles (7:1)', r: 'Los cuatro vientos de la tierra' },
    { f: 'De dónde subía el ángel del sello y qué tenía (7:2)', r: 'Desde donde sale el sol; el sello del Dios vivo' },
    { f: 'Dónde se sella a los siervos de Dios (7:3)', r: 'En sus frentes' },
    { f: 'Número de los sellados (7:4)', r: '144.000 (lo oyó Juan): 12.000 de cada tribu' },
    { f: 'Las doce tribus, en orden (7:5-8)', r: 'Judá, Rubén, Gad, Aser, Neftalí, Manasés, Simeón, Leví, Isacar, Zabulón, José, Benjamín' },
    { f: 'Tribus que no aparecen en la lista (7:5-8)', r: 'Dan y Efraín' },
    { f: 'La gran multitud (7:9)', r: 'Nadie podía contarla; de todas las naciones, tribus, pueblos y lenguas; ropas blancas y palmas' },
    { f: '«¡La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero!»', r: 'Apocalipsis 7:10' },
    { f: 'Las siete cosas de la alabanza de los ángeles (7:12)', r: 'Bendición, gloria, sabiduría, acción de gracias, honra, poder y fortaleza' },
    { f: 'Respuesta de Juan al anciano (7:14)', r: '«Señor, tú lo sabes»' },
    { f: 'Quiénes son los de ropas blancas (7:14)', r: 'Los que salieron de la gran tribulación y blanquearon sus ropas en la sangre del Cordero' },
    { f: 'Promesas de 7:16-17', r: 'Sin hambre ni sed, sin sol ni calor; el Cordero los pastorea y los lleva a fuentes de aguas vivas; Dios enjuga toda lágrima' },
  ],
};
