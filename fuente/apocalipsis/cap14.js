/* Apocalipsis 14 — El Cordero con los 144.000, los tres ángeles y las dos siegas.
   Sigue el modelo de cap01.js; se revisa con tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap14', label: 'Apocalipsis 14', sub: 'Los 144.000 y los tres ángeles', vs: 20,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Después de las bestias del capítulo 13, Juan ve algo hermoso: el
      <strong>Cordero</strong> de pie sobre el <strong>monte de Sión</strong>, y
      con él <strong>144.000</strong> que cantan un cántico nuevo.<br><br>
      Luego vuelan <strong>tres ángeles</strong> con un mensaje para todo el
      mundo: <strong>temed a Dios</strong> y adorad al Creador; Babilonia ha
      caído; no adoréis a la bestia ni recibáis su marca.<br><br>
      Al final viene la cosecha: uno como el <strong>Hijo del hombre</strong>,
      sentado sobre una <strong>nube blanca</strong>, siega la tierra con su
      hoz.<br><br>
      <em>La idea del capítulo: Dios avisa a todos antes de la cosecha final,
      y su pueblo guarda sus mandamientos y la fe de Jesús.</em>`) },

    { t: '🏔️ El Cordero en el monte de Sión (14:1-3)', capa: 'nucleo', h:
      hi(`<strong>«Vi que el Cordero estaba de pie sobre el monte de
      Sión»</strong> (14:1), y con él <strong>ciento cuarenta y cuatro
      mil</strong> que tenían el nombre de él y el de su Padre
      <strong>escrito en la frente</strong> (14:1).`) +
      tbl(['La voz del cielo (14:2)', 'Era como…'], [
        ['1', 'El estruendo de <strong>muchas aguas</strong>'],
        ['2', 'El sonido de <strong>un gran trueno</strong>'],
        ['3', '<strong>Arpistas</strong> que tocaban sus arpas'],
      ]) +
      hi(`<strong>«Cantaban un cántico nuevo delante del trono»</strong> (14:3),
      delante de los cuatro seres vivientes y de los ancianos. Nadie podía
      aprender el cántico, sino los 144.000 <strong>«que fueron redimidos de
      entre los de la tierra»</strong> (14:3).`) },

    { t: '🤍 Quiénes son los 144.000 (14:4-5)', capa: 'nucleo', h:
      tbl(['Lo que dice el texto', 'Versículo'], [
        ['No se han contaminado con mujeres, <strong>son vírgenes</strong>', '14:4'],
        ['<strong>Siguen al Cordero</strong> por dondequiera que va', '14:4'],
        ['Fueron redimidos de entre los hombres <strong>como primicias</strong> para Dios y para el Cordero', '14:4'],
        ['En sus bocas <strong>no fue hallada mentira</strong>', '14:5'],
        ['Son <strong>sin mancha</strong> delante del trono de Dios', '14:5'],
      ]) +
      wa(`<strong>144.000 frente a la gran multitud.</strong> En 7:4 los 144.000
      son «sellados» de las tribus de Israel; en 7:9 aparece otro grupo,
      <strong>«una gran multitud, la cual nadie podía contar»</strong>. Aquí, en
      14:1, los 144.000 tienen <strong>el nombre</strong> del Cordero y de su
      Padre en la frente. Y no los confundas con el <strong>666</strong> de 13:18.`) },

    { t: '📣 Los tres ángeles, palabra por palabra (14:6-11)', capa: 'nucleo', h:
      tbl(['Ángel', 'Lo que dice'], [
        ['1.º, vuela en medio del cielo con el evangelio eterno (14:6)',
          '«¡Temed a Dios y dadle gloria, porque la hora de su juicio ha llegado. Adorad a aquel que hizo el cielo y la tierra, el mar y las fuentes de las aguas!» (14:7)'],
        ['2.º, lo sigue (14:8)',
          '«Ha caído, ha caído Babilonia, la gran ciudad, porque ha hecho beber a todas las naciones del vino del furor de su fornicación.» (14:8)'],
        ['3.º, los sigue, a gran voz (14:9)',
          '«Si alguno adora a la bestia y a su imagen y recibe la marca en su frente o en su mano, él también beberá del vino de la ira de Dios, que ha sido vaciado puro en el cáliz de su ira; y será atormentado con fuego y azufre delante de los santos ángeles y del Cordero. El humo de su tormento sube por los siglos de los siglos. No tienen reposo de día ni de noche los que adoran a la bestia y a su imagen, ni nadie que reciba la marca de su nombre.» (14:9-11)'],
      ]) },

    { t: '🔎 El primer ángel, de cerca (14:6-7)', capa: 'nucleo', h:
      li([`Vuela <strong>«en medio del cielo»</strong> (14:6).`,
          `Tiene <strong>el evangelio eterno</strong> para predicarlo a
           <strong>«toda nación, tribu, lengua y pueblo»</strong> (14:6).`,
          `Habla <strong>a gran voz</strong> (14:7).`]) +
      tbl(['#', 'Lo que pide o anuncia (14:7)'], [
        ['1', '<strong>Temed</strong> a Dios'],
        ['2', '<strong>Dadle gloria</strong>'],
        ['3', 'Porque <strong>la hora de su juicio ha llegado</strong>'],
        ['4', '<strong>Adorad</strong> a aquel que hizo el cielo y la tierra, el mar y las fuentes de las aguas'],
      ]) +
      wa(`El primer ángel va a <strong>«toda nación, tribu, lengua y
      pueblo»</strong> (14:6); en 13:7 la bestia tiene autoridad sobre «toda
      tribu, pueblo, lengua y nación». Mismas palabras, distinto orden.`) },

    { t: '🍷 El segundo y el tercer ángel (14:8-11)', capa: 'nucleo', h:
      li([`El segundo anuncia que <strong>Babilonia, la gran ciudad</strong>, ha
           caído, y lo dice dos veces: «Ha caído, ha caído» (14:8).`,
          `El tercero advierte contra adorar <strong>a la bestia y a su
           imagen</strong> y recibir <strong>la marca</strong> (14:9).`,
          `El que lo haga beberá <strong>del vino de la ira de Dios</strong> y
           será atormentado <strong>con fuego y azufre</strong> (14:10).`,
          `<strong>«No tienen reposo de día ni de noche»</strong> (14:11).`]) +
      wa(`Dos vinos distintos: Babilonia da a beber <strong>«del vino del furor
      de su fornicación»</strong> (14:8); el que adora a la bestia beberá
      <strong>«del vino de la ira de Dios»</strong> (14:10).<br>
      Y el orden de la marca cambia: en 13:16 es «en la mano derecha o en la
      frente»; en <strong>14:9</strong> es <strong>«en su frente o en su
      mano»</strong>.`) },

    { t: '✊ Los santos y los que mueren en el Señor (14:12-13)', capa: 'nucleo', h:
      hi(`<strong>«Aquí está la perseverancia de los santos, los que guardan los
      mandamientos de Dios y la fe de Jesús»</strong> (14:12).`) +
      wa(`No confundir con 13:10: «Aquí está la perseverancia y la fe de los
      santos». En <strong>14:12</strong> aparecen los <strong>mandamientos de
      Dios</strong> y <strong>la fe de Jesús</strong>.`) +
      hi(`Una voz del cielo le dice a Juan: <strong>«Escribe»</strong> (14:13).<br>
      <strong>«Bienaventurados de aquí en adelante los muertos que mueren en el
      Señor»</strong> (14:13).<br>
      Y el Espíritu añade: <strong>«descansarán de sus trabajos, porque sus
      obras con ellos siguen»</strong> (14:13).`) },

    { t: '🌾 Las dos siegas (14:14-20)', capa: 'nucleo', h:
      tbl(['', 'La siega de la mies', 'La vendimia de las uvas'], [
        ['Quién siega', 'Uno <strong>semejante al Hijo del hombre</strong>, sentado sobre una <strong>nube blanca</strong>, con <strong>corona de oro</strong> (14:14)', 'Otro <strong>ángel</strong> que salió del templo que está en el cielo (14:17)'],
        ['Con qué', 'Una <strong>hoz aguda</strong> (14:14)', 'También una <strong>hoz aguda</strong> (14:17)'],
        ['Quién da la orden', 'Otro ángel que <strong>salió del templo</strong> (14:15)', 'Otro ángel que <strong>salió del altar</strong> y tenía <strong>poder sobre el fuego</strong> (14:18)'],
        ['Por qué', '<strong>«La mies de la tierra está madura»</strong> (14:15)', '<strong>«Sus uvas están maduras»</strong> (14:18)'],
        ['Qué pasa', 'La tierra <strong>fue segada</strong> (14:16)', 'Las uvas van al <strong>gran lagar de la ira de Dios</strong> (14:19)'],
      ]) +
      hi(`El lagar fue pisado <strong>fuera de la ciudad</strong>, y salió sangre
      <strong>«hasta los frenos de los caballos»</strong> (14:20), en
      <strong>mil seiscientos estadios</strong> (14:20).`) },

    { t: '🧭 Los 144.000: los vencedores del capítulo 13 (14:1-5)', capa: 'contexto', h:
      hi(`Desde aquí empieza la <strong>interpretación</strong>. Como en el
      capítulo 13, se habla de sistemas y no de personas: el mensaje es una
      invitación para todos.<br><br>
      14:1-5 es la <strong>conclusión del capítulo 13</strong>: responde si
      alguien se mantuvo fiel. Llevan el nombre del Padre en la frente, en
      contraste con la marca. Apocalipsis los muestra tres veces:`) +
      tbl(['Texto', 'Qué muestra'], [
        ['7:1-8', 'Su <strong>sello</strong>: protegidos antes de los vientos'],
        ['14:1-5', 'Su <strong>carácter</strong>'],
        ['15:2-4', 'Su <strong>victoria</strong> sobre la bestia, su imagen y su marca'],
      ]) +
      li([`<strong>Cuándo viven:</strong> están vivos en la crisis final y
           cuando Jesús vuelve.`,
          `<strong>Vírgenes:</strong> se enlaza con la ramera y sus hijas de
           17:1-5: no se mezclaron con la religión falsa.`,
          `<strong>Primicias:</strong> en calidad, no en tiempo; los maduró el
           mensaje de los tres ángeles con la lluvia tardía.`,
          `<strong>El número:</strong> es un tema discutido (¿literal o
           simbólico?). Aquí se toma como simbólico, igual que las tribus:
           Israel hoy es el pueblo espiritual de Dios. Lo importante no es
           discutir quiénes serán, sino luchar por estar entre ellos.`]) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 2:165-167 y 208; Bohr, <i>Los 144.000 y los 24 ancianos</i>, p. 88, 94 y 116-117.</p>` },

    { t: '🧭 Los tres ángeles: quiénes predican y en qué orden (14:6-12)', capa: 'contexto', h:
      li([`<strong>Ángel significa mensajero.</strong> No hay que esperar
           ángeles volando: Dios encargó la predicación a personas, y los
           ángeles las ayudan (Mateo 28:19-20).`,
          `<strong>Vuelan en medio del cielo:</strong> el mensaje viene de
           arriba y corre rápido. <strong>A gran voz:</strong> se anuncia con
           poder y claridad.`,
          `<strong>A toda nación, tribu, lengua y pueblo:</strong> un mensaje
           mundial necesita un pueblo esparcido por todo el mundo.`,
          `<strong>Van en orden y se suman:</strong> el primero llama a temer,
           dar gloria y adorar; el segundo dice que Babilonia cayó por rechazar
           al primero; el tercero advierte qué les pasará a los que se queden
           en ella.`,
          `<strong>Son el último llamado:</strong> justo después viene la
           cosecha (14:14-20). Desde ahí solo hay dos grupos.`,
          `<strong>Unidos al santuario:</strong> 11:19 abre el lugar santísimo
           (el arca con la ley) y 15:5-8 lo cierra; los mensajes se dan
           mientras está abierto.`]) +
      wa(`Los tres mensajes son como tres escalones, y a los adventistas se les
      confió proclamarlos: no hay obra más importante.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:4-9 y 2:210 y 213.</p>` },

    { t: '🧭 Primer ángel: el evangelio eterno, temed y dad gloria (14:6-7)', capa: 'contexto', h:
      li([`<strong>El evangelio eterno:</strong> es la única vez que Juan usa
           la palabra «evangelio». Es eterno porque el plan de salvación se
           pensó en la eternidad, se anunció a Adán y Eva, se ilustró con los
           sacrificios y se cumplió en Cristo. Somos salvos por gracia, por
           medio de la fe; y Jesús es nuestro único intercesor.`,
          `<strong>Temed a Dios:</strong> no es tenerle miedo. Es respeto y
           <strong>obediencia reverente</strong> a sus mandamientos: «Teme a
           Dios y guarda sus mandamientos» (Eclesiastés 12:13).`,
          `<strong>Dadle gloria:</strong> la gloria de Dios es su
           <strong>carácter</strong>. Cuando Moisés pidió ver su gloria, Dios
           le mostró su bondad y su misericordia (Éxodo 33:18-19; 34:6-7). Dar
           gloria es <strong>reflejar ese carácter</strong>, como la luna
           refleja la luz del sol.`]) +
      wa(`Los tres verbos del primer ángel (temed, dad gloria, adorad) son
      órdenes: los tres imperativos del evangelio eterno. El que recibe el
      regalo de la salvación responde con una vida nueva.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:11-12, 25-28 y 37-38 y 2:210-211.</p>` },

    { t: '🧭 Primer ángel: «la hora de su juicio ha llegado» (14:7)', capa: 'contexto', h:
      hi(`El juicio no es un solo momento sino un proceso: se investiga antes de
      la segunda venida (14:7), los santos revisan los casos de los perdidos
      durante los mil años (20:4) y la pena de los impíos se cumple después de
      ellos (20:13-15). El primer ángel anuncia el comienzo.`) +
      li([`<strong>Cuándo empieza:</strong> en <strong>1844</strong>, al
           terminar los 2.300 días de Daniel 8:14. Contados como años desde el
           decreto para restaurar Jerusalén en el otoño del <strong>457
           a.C.</strong>, llegan al otoño de 1844.`,
          `<strong>Por qué antes de la venida:</strong> Jesús viene «y mi
           galardón conmigo» (22:12); para traer la recompensa, el juicio tiene
           que haberse hecho antes.`,
          `<strong>Cómo es:</strong> se abren los libros del cielo (Daniel
           7:10) y se revisan los casos de los que profesaron creer en Jesús,
           empezando por Adán y terminando con los vivos.`,
          `<strong>Tres pasos:</strong> investigación, veredicto y
           recompensa, como en un tribunal.`]) +
      wa(`Es el antitipo (el cumplimiento real) del Día de la Expiación, el
      gran día de juicio de Israel en el lugar santísimo. El juicio que empezó
      en 1844 sigue hasta que se decidan los casos de todos; por eso el
      mensaje se predica hasta el fin del tiempo de gracia.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:8-9, 49-50, 55-56 y 63-64; CS 374, 450 y 488-489.</p>` },

    { t: '🧭 Primer ángel: «Adorad a aquel que hizo el cielo y la tierra» (14:7)', capa: 'contexto', h:
      hi(`Las palabras del ángel repiten las del <strong>cuarto
      mandamiento</strong>: «en seis días hizo Jehová los cielos y la tierra,
      el mar» (Éxodo 20:11). El ángel llama a adorar a Dios
      <strong>como Creador</strong>, y el sábado es la señal de que Él lo es.`) +
      li([`Por eso este mensaje invita especialmente a guardar el cuarto
           mandamiento.`,
          `Si el sábado se hubiera guardado siempre, nunca habría habido un
           idólatra, un ateo o un incrédulo: recuerda cada semana quién nos
           hizo.`,
          `El sábado nació en la creación, cuando no había pecado, ni judíos,
           ni antiguo pacto; Dios trabajó seis días, reposó el séptimo y
           después lo bendijo. Es un regalo para toda la humanidad.`,
          `La prueba final será de <strong>autoridad</strong>: guardar el
           sábado reconoce la autoridad del Creador. Por eso la idea de que el
           mundo salió de la evolución ataca también el sábado, memorial de la
           creación.`]) +
      `<p>Fuente: CS 489-491; Bohr, <i>Tres ángeles</i> 1:71-73; Bohr, <i>Juan Pablo II, el papa Francisco y la gran prueba final</i>, p. 2-3.</p>` },

    { t: '🧭 Segundo ángel: ¿qué es Babilonia? (14:8)', capa: 'contexto', h:
      hi(`<strong>Babel</strong> significa <strong>confusión</strong>. La
      primera Babilonia nació en Génesis 11 como un proyecto humano de
      rebelión contra Dios, fundado por Nimrod. En Apocalipsis, Babilonia es
      la religión que se aparta de Dios y se une al poder político. El
      capítulo 17 describe a los mismos tres actores del 13:`) +
      tbl(['Apocalipsis 13', 'Apocalipsis 17', 'Qué representa'], [
        ['El dragón', 'Los reyes de la tierra', 'Los gobiernos civiles'],
        ['La bestia del mar', 'La gran ramera', 'El papado'],
        ['La bestia de la tierra', 'Las hijas de la ramera', 'El protestantismo apóstata'],
      ]) +
      wa(`Babilonia es un <strong>sistema</strong>, no las personas que están
      en esas iglesias. «La mayoría de los verdaderos discípulos de Cristo»
      todavía están en ellas (CS 441), y por eso Dios los llama: «Salid de
      ella, pueblo mío» (18:4).`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:82-83 y 96-99; CS 441.</p>` },

    { t: '🧭 Segundo ángel: el vino, la fornicación y la caída (14:8)', capa: 'contexto', h:
      li([`<strong>El vino:</strong> las falsas doctrinas que confunden. Entre
           otras, la inmortalidad natural del alma, el tormento eterno de los
           malos y poner el domingo en lugar del día santo de Dios. Un pueblo
           así embriagado no sabe qué creer.`,
          `<strong>La fornicación:</strong> la unión ilegítima de la iglesia con
           los reyes de la tierra (17:1-2): una iglesia que deja a Cristo, su
           esposo, para buscar el apoyo del poder civil.`,
          `<strong>¿Por qué «ha caído»?</strong> Por rechazar el mensaje del
           primer ángel. La repetición («ha caído, ha caído») muestra que es
           seguro.`,
          `<strong>Cuándo:</strong> el segundo mensaje se predicó por primera
           vez en el <strong>verano de 1844</strong>, sobre todo a las iglesias
           de los Estados Unidos que rechazaron el aviso del juicio. Pero la
           caída es progresiva: su cumplimiento completo todavía es futuro,
           cuando la unión de la iglesia con el mundo sea total.`]) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:7-8, 99, 101 y 111-112; CS 440-441.</p>` },

    { t: '🧭 Tercer ángel: la advertencia más solemne (14:9-11)', capa: 'contexto', h:
      tbl(['En el mensaje', 'Qué es'], [
        ['La bestia', 'El papado (13:1-10)'],
        ['Su imagen', 'El protestantismo apóstata usando el poder civil'],
        ['La marca', 'El signo de la autoridad de Roma, el domingo impuesto por ley'],
        ['El vino de la ira de Dios', 'Las <strong>siete plagas postreras</strong> (15:1), «sin mezcla» de misericordia'],
        ['Fuego y azufre', 'Como en Sodoma: «fuego eterno» que la dejó en cenizas (Judas 7; 2 Pedro 2:6)'],
      ]) +
      hi(`<strong>«Por los siglos de los siglos»:</strong> la palabra griega
      <em>aión</em> (y la hebrea <em>olam</em>) no siempre significa «sin
      fin», sino un tiempo que dura lo que dura su objeto. Dios es «fuego
      consumidor» (Hebreos 12:29); los malos quedarán sin «raíz ni rama» y
      serán cenizas (Malaquías 4:1-3). El castigo es real y terrible, pero
      termina cuando el fuego consume: no es un tormento sin fin.`) +
      wa(`Es «la más terrible amenaza» de la Biblia (CS 503). Por eso el aviso
      debe darse a todo el mundo antes de los juicios, para que nadie quede
      sin saber y todos puedan librarse.`) +
      `<p>Fuente: CS 498-503; Bohr, <i>Tres ángeles</i> 2:73-74, 86-87 y 98-99.</p>` },

    { t: '🧭 La perseverancia de los santos (14:12-13)', capa: 'contexto', h:
      li([`<strong>Perseverancia</strong> (en griego <em>hupomoné</em>):
           aguantar firmes en la prueba. Los santos del final son continuación
           de los perseguidos de los 1.260 años: la mujer de Apocalipsis 12.`,
          `<strong>Los mandamientos de Dios:</strong> los diez, incluido el
           cuarto, en contraste con los que adoran a la bestia.`,
          `<strong>La fe de Jesús:</strong> el griego permite «la fe de Jesús»
           y «la fe en Jesús». Hay un equilibrio: guardar los mandamientos sin
           caer en el legalismo, y confiar en Jesús sin caer en una gracia que
           desprecia la ley. Abarca la ley y el evangelio.`,
          `<strong>Dos grupos:</strong> al final, toda la cristiandad quedará
           dividida entre los que guardan los mandamientos y la fe de Jesús, y
           los que adoran a la bestia y reciben su marca.`]) +
      wa(`Sobre los que mueren en el Señor (14:13): poco antes de la venida,
      «todos los que murieron en la fe del mensaje del tercer ángel»
      resucitan (Daniel 12:2) para ver cumplida la promesa (CS 695).`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 2:26, 101-102 y 125-126; CS 503 y 695.</p>` },

    { t: '🧭 Las dos siegas (14:14-20)', capa: 'contexto', h:
      hi(`Cuando los tres ángeles terminan, el mundo queda en
      <strong>dos grupos</strong> y se cierra la puerta de la gracia: ya nadie
      cambia de lado. Entonces viene la cosecha.`) +
      tbl(['', 'La mies (14:14-16)', 'Las uvas (14:17-20)'], [
        ['Quiénes', 'Los que aceptaron los tres mensajes', 'Los que los rechazaron'],
        ['Señal', 'El sello de Dios', 'La marca de la bestia'],
        ['Dónde', 'Dentro de la ciudad, en sentido espiritual', 'Fuera de la ciudad, en el lagar'],
        ['Qué reciben', 'Jesús, sobre la nube, los recoge primero', 'El gran lagar de la ira de Dios'],
      ]) +
      li([`El que está sobre la nube, «semejante al Hijo del hombre», es
           <strong>Jesús</strong> en su venida.`,
          `La <strong>lluvia tardía</strong>, que acompaña a los tres mensajes,
           es la que madura la mies y también las uvas.`,
          `<strong>El lagar fuera de la ciudad:</strong> los impíos rodean al
           remanente para destruirlo, y Jesús viene con los ejércitos del cielo
           a pisar el lagar (19:11-16) y librar a los suyos.`]) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:8 y 2:167-168 y 211-212.</p>` },
    { t: '🧭 La Biblia explica sus símbolos (1): los 144.000 y los ángeles', capa: 'contexto', h:
      `<p>Como en los capítulos 12 y 13, la misma Biblia explica estos símbolos.</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Monte de Sion', 'La morada de Dios con su pueblo fiel', 'Hebreos 12:22-24; Gálatas 4:26'],
        ['Cordero', 'Cristo, el sacrificio', 'Isaías 53:7; Apocalipsis 5:6'],
        ['Nombre en la frente', 'El carácter de Dios grabado en la mente', 'Hebreos 10:16; Deuteronomio 6:6-8'],
        ['Mujer', 'Iglesia: pura o apóstata', '2 Corintios 11:2; Apocalipsis 17:5: «la madre de las rameras»'],
        ['Vírgenes', 'Fieles que no se unieron a la religión falsa', '2 Corintios 11:2; Apocalipsis 17:1-5'],
        ['Tribus de Israel', 'El pueblo espiritual de Dios', 'Gálatas 3:29; Romanos 2:28-29'],
        ['Ángel', 'Mensajero', 'Lucas 7:24 (la misma palabra para los mensajeros de Juan); Apocalipsis 1:20'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:103, 105-106 y 216; Bohr, <i>Tres ángeles</i> 1:4 y 2:42, 122 y 192; Bohr, <i>Los 144.000 y los 24 ancianos</i>, p. 116-117.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): Babilonia y la cosecha', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Babilonia', 'Confusión: la religión que se aparta de Dios', 'Génesis 11:9; Apocalipsis 17:5'],
        ['Vino de Babilonia', 'Doctrinas falsas', 'Jeremías 51:7; Apocalipsis 17:2'],
        ['Fornicación', 'La unión ilícita de la iglesia con los poderes civiles', 'Apocalipsis 17:1-2; Santiago 4:4; Ezequiel 16:15 y 26'],
        ['Fuego y azufre; humo que sube', 'Destrucción total, como la de Edom y Sodoma', 'Isaías 34:9-10; Judas 7'],
        ['Siega', 'El fin del mundo, cuando Cristo recoge a los suyos', 'Mateo 13:39; Mateo 3:12'],
        ['Lagar', 'La ira de Dios sobre los impíos', 'Isaías 63:1-6; Apocalipsis 19:15: «Él pisa el lagar del vino del furor y de la ira del Dios Todopoderoso»'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:102, 104, 106 y 215; Bohr, <i>El calendario religioso hebreo</i>, p. 42; Bohr, <i>Tres ángeles</i> 1:82.</p>` },
  ],

  preguntas: [
    { t: 'mc', v: '14:1', lit: 'el Cordero estaba de pie sobre el monte de Sión',
      q: '¿Dónde estaba de pie el Cordero, según Apocalipsis 14:1?',
      o: ['Sobre el monte de Sión', 'Sobre el mar de vidrio', 'Sobre una nube blanca', 'Sobre el monte de los Olivos'], a: 0,
      e: '«…vi que el Cordero estaba de pie sobre el monte de Sión» (14:1). La nube blanca es la del Hijo del hombre (14:14).' },
    { t: 'mc', v: '14:1', lit: 'ciento cuarenta y cuatro mil',
      q: '¿Cuántos estaban con el Cordero sobre el monte de Sión? (Apocalipsis 14:1)',
      o: ['144.000', '24.000', '7.000', '12.000'], a: 0,
      e: '«…y con él ciento cuarenta y cuatro mil» (14:1).' },
    { t: 'mc', v: '14:1', lit: 'el nombre de él y el de su Padre escrito en la frente',
      q: '¿Qué tenían escrito en la frente los 144.000? (Apocalipsis 14:1)',
      o: ['El nombre de él y el de su Padre', 'El número del nombre de la bestia', 'El nombre de la nueva Jerusalén', 'La palabra «Santidad al Señor»'], a: 0,
      e: '«…que tenían el nombre de él y el de su Padre escrito en la frente» (14:1).' },
    { t: 'tf', v: '14:1',
      q: 'Los 144.000 tenían el nombre del Cordero y el de su Padre escrito en la mano. (Apocalipsis 14:1)', a: false,
      e: 'Falso: lo tenían escrito en la FRENTE (14:1).' },
    { t: 'mc', v: '14:2', lit: 'como de arpistas que tocaban sus arpas',
      q: 'Según Apocalipsis 14:2, ¿cómo era la voz que Juan oyó del cielo, además de aguas y trueno?',
      o: ['Como de arpistas que tocaban sus arpas', 'Como de trompeteros que tocaban trompetas', 'Como de un coro de ángeles con címbalos', 'Como de un gran ejército que marchaba'], a: 0,
      e: '«La voz que oí era como de arpistas que tocaban sus arpas» (14:2).' },
    { t: 'tf', v: '14:2',
      q: 'La voz del cielo de Apocalipsis 14:2 era como el estruendo de muchas aguas y como el sonido de un gran trueno.', a: true,
      e: 'Verdadero (14:2).' },
    { t: 'mc', v: '14:3', lit: 'Cantaban un cántico nuevo',
      q: '¿Qué cantaban delante del trono? (Apocalipsis 14:3)',
      o: ['Un cántico nuevo', 'El cántico de Moisés', 'Un salmo de David', 'El cántico de María'], a: 0,
      e: '«Cantaban un cántico nuevo delante del trono» (14:3). El cántico de Moisés aparece en 15:3.' },
    { t: 'mc', v: '14:3', lit: 'Nadie podía aprender el cántico, sino aquellos ciento cuarenta y cuatro mil',
      q: 'Según Apocalipsis 14:3, ¿quiénes podían aprender el cántico?',
      o: ['Solo los 144.000 redimidos', 'Los veinticuatro ancianos', 'Los cuatro seres vivientes', 'Todos los habitantes de la tierra'], a: 0,
      e: '«Nadie podía aprender el cántico, sino aquellos ciento cuarenta y cuatro mil que fueron redimidos de entre los de la tierra» (14:3).' },
    { t: 'tf', v: '14:3',
      q: 'Cantaban delante del trono, delante de los cuatro seres vivientes y de los ancianos. (Apocalipsis 14:3)', a: true,
      e: 'Verdadero (14:3).' },
    { t: 'mc', v: '14:4', lit: 'siguen al Cordero por dondequiera que va',
      q: 'Según Apocalipsis 14:4, ¿qué hacen los 144.000?',
      o: ['Siguen al Cordero por dondequiera que va', 'Sellan a los siervos de Dios en la frente', 'Miden el templo de Dios y el altar', 'Profetizan vestidos de ropas ásperas'], a: 0,
      e: '«Son los que siguen al Cordero por dondequiera que va» (14:4).' },
    { t: 'mc', v: '14:4', lit: 'como primicias para Dios y para el Cordero',
      q: '¿Como qué fueron redimidos los 144.000? (Apocalipsis 14:4)',
      o: ['Como primicias', 'Como reyes y sacerdotes', 'Como testigos fieles', 'Como columnas del templo'], a: 0,
      e: '«Éstos fueron redimidos de entre los hombres como primicias para Dios y para el Cordero» (14:4). «Reyes y sacerdotes» es de 1:6.' },
    { t: 'fill', v: '14:4', ins: 'Apocalipsis 14:4 (RV1995) — Completa:',
      p: [{ x: '«Son los que siguen al ' }, { b: 'Cordero', h: '¿a quién siguen?' }, { x: ' por dondequiera que va. Éstos fueron redimidos de entre los hombres como ' }, { b: 'primicias', h: '¿como qué?' }, { x: ' para Dios y para el Cordero.»' }] },
    { t: 'tf', v: '14:5',
      q: 'Apocalipsis 14:5 dice que en la boca de los 144.000 no fue hallada envidia.', a: false,
      e: 'Falso: «En sus bocas no fue hallada MENTIRA, pues son sin mancha delante del trono de Dios» (14:5).' },
    { t: 'mc', v: '14:6', lit: 'el evangelio eterno',
      q: '¿Qué tenía el ángel que volaba en medio del cielo? (Apocalipsis 14:6)',
      o: ['El evangelio eterno', 'Un librito abierto', 'Una hoz aguda', 'El sello del Dios vivo'], a: 0,
      e: '«…otro ángel que tenía el evangelio eterno para predicarlo» (14:6). El librito abierto es de 10:2; el sello del Dios vivo, de 7:2.' },
    { t: 'mc', v: '14:6', lit: 'En medio del cielo vi volar otro ángel',
      q: '¿Por dónde volaba el primer ángel de Apocalipsis 14?',
      o: ['En medio del cielo', 'Sobre el mar', 'Junto al trono', 'Sobre el monte de Sión'], a: 0,
      e: '«En medio del cielo vi volar otro ángel…» (14:6).' },
    { t: 'tf', v: '14:6',
      q: 'El ángel de Apocalipsis 14:6 tenía el evangelio eterno para predicarlo solo al pueblo de Israel.', a: false,
      e: 'Falso: era para «los habitantes de la tierra, a toda nación, tribu, lengua y pueblo» (14:6).' },
    { t: 'mc', v: '14:7', lit: 'Temed a Dios y dadle gloria, porque la hora de su juicio ha llegado',
      q: '¿Qué texto dice «Temed a Dios y dadle gloria, porque la hora de su juicio ha llegado»?',
      o: ['Apocalipsis 14:7', 'Apocalipsis 14:6', 'Apocalipsis 14:9', 'Apocalipsis 14:15'], a: 0,
      e: 'Apocalipsis 14:7, el mensaje del primer ángel.' },
    { t: 'mc', v: '14:7', lit: 'porque la hora de su juicio ha llegado',
      q: 'Según el primer ángel, ¿por qué hay que temer a Dios y darle gloria? (Apocalipsis 14:7)',
      o: ['Porque la hora de su juicio ha llegado', 'Porque la hora de segar ha llegado', 'Porque Babilonia la gran ciudad ha caído', 'Porque el tiempo de la bestia se acabó'], a: 0,
      e: '«…porque la hora de su juicio ha llegado» (14:7). «La hora de segar ha llegado» es de 14:15.' },
    { t: 'fill', v: '14:7', ins: 'Apocalipsis 14:7 (RV1995) — Completa:',
      p: [{ x: '«Adorad a aquel que hizo el ' }, { b: 'cielo', h: '¿qué hizo primero?' }, { x: ' y la tierra, el ' }, { b: 'mar', h: '¿y qué más?' }, { x: ' y las fuentes de las ' }, { b: 'aguas', h: '¿las fuentes de qué?' }, { x: '!»' }] },
    { t: 'mc', v: '14:8', lit: 'Ha caído, ha caído Babilonia, la gran ciudad',
      q: '¿Qué anunció el segundo ángel? (Apocalipsis 14:8)',
      o: ['«Ha caído, ha caído Babilonia»', '«La hora de segar ha llegado»', '«Temed a Dios y dadle gloria»', '«Bienaventurados los muertos»'], a: 0,
      e: '«Ha caído, ha caído Babilonia, la gran ciudad…» (14:8).' },
    { t: 'mc', v: '14:8', lit: 'del vino del furor de su fornicación',
      q: 'Según Apocalipsis 14:8, ¿por qué cayó Babilonia?',
      o: ['Hizo beber a las naciones del vino de su fornicación', 'Mató a los dos testigos en la plaza de la ciudad', 'Hizo una imagen y le dio aliento para que hablara', 'Edificó una torre cuya cúspide llegara al cielo'], a: 0,
      e: '«…porque ha hecho beber a todas las naciones del vino del furor de su fornicación» (14:8).' },
    { t: 'tf', v: '14:8',
      q: 'El segundo ángel llama a Babilonia «la gran ciudad». (Apocalipsis 14:8)', a: true,
      e: 'Verdadero: «Ha caído, ha caído Babilonia, la gran ciudad» (14:8).' },
    { t: 'mc', v: '14:9', lit: 'Si alguno adora a la bestia y a su imagen y recibe la marca',
      q: '¿Contra qué advierte el tercer ángel? (Apocalipsis 14:9)',
      o: ['Adorar a la bestia y a su imagen y recibir su marca', 'Comer de lo sacrificado a los ídolos y fornicar', 'Dejar el primer amor y no arrepentirse de ello', 'Añadir o quitar palabras de este libro de profecía'], a: 0,
      e: '«Si alguno adora a la bestia y a su imagen y recibe la marca en su frente o en su mano…» (14:9).' },
    { t: 'mc', v: '14:10', lit: 'beberá del vino de la ira de Dios',
      q: 'Según Apocalipsis 14:10, ¿qué beberá el que adora a la bestia?',
      o: ['Del vino de la ira de Dios', 'Del agua de la vida', 'Del vino nuevo del reino', 'De las aguas amargas de Ajenjo'], a: 0,
      e: '«…él también beberá del vino de la ira de Dios, que ha sido vaciado puro en el cáliz de su ira» (14:10).' },
    { t: 'mc', v: '14:10', lit: 'atormentado con fuego y azufre',
      q: '¿Con qué será atormentado el que adora a la bestia? (Apocalipsis 14:10)',
      o: ['Con fuego y azufre', 'Con granizo y sangre', 'Con úlceras y tinieblas', 'Con hambre y espada'], a: 0,
      e: '«…y será atormentado con fuego y azufre delante de los santos ángeles y del Cordero» (14:10).' },
    { t: 'tf', v: '14:11',
      q: 'No tienen reposo de día ni de noche los que adoran a la bestia y a su imagen. (Apocalipsis 14:11)', a: true,
      e: 'Verdadero (14:11).' },
    { t: 'fill', v: '14:11', ins: 'Apocalipsis 14:11 (RV1995) — Completa:',
      p: [{ x: '«El ' }, { b: 'humo', h: '¿qué sube?' }, { x: ' de su tormento sube por los ' }, { b: 'siglos', h: '¿por los qué?' }, { x: ' de los siglos.»' }] },
    { t: 'mc', v: '14:12', lit: 'Aquí está la perseverancia de los santos, los que guardan los mandamientos de Dios',
      q: '¿Qué texto dice «Aquí está la perseverancia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús»?',
      o: ['Apocalipsis 14:12', 'Apocalipsis 13:10', 'Apocalipsis 12:17', 'Apocalipsis 14:13'], a: 0,
      e: 'Apocalipsis 14:12. En 13:10 dice «la perseverancia y la fe de los santos»; en 12:17, «guardan los mandamientos de Dios y tienen el testimonio de Jesucristo».' },
    { t: 'mc', v: '14:12', lit: 'guardan los mandamientos de Dios y la fe de Jesús',
      q: 'Según Apocalipsis 14:12, ¿qué guardan los santos?',
      o: ['Los mandamientos de Dios y la fe de Jesús', 'Las tradiciones de los ancianos y la ley', 'Las palabras del librito y el sello', 'Sus vestiduras blancas y sus lámparas'], a: 0,
      e: '«…los que guardan los mandamientos de Dios y la fe de Jesús» (14:12).' },
    { t: 'fill', v: '14:12', ins: 'Apocalipsis 14:12 (RV1995) — Completa:',
      p: [{ x: '«Aquí está la ' }, { b: 'perseverancia', h: '¿qué está aquí?' }, { x: ' de los santos, los que guardan los ' }, { b: 'mandamientos', h: '¿qué guardan?' }, { x: ' de Dios y la fe de ' }, { b: 'Jesús', h: '¿la fe de quién?' }, { x: '.»' }] },
    { t: 'mc', v: '14:13', lit: 'los muertos que mueren en el Señor',
      q: 'Según Apocalipsis 14:13, ¿quiénes son bienaventurados de aquí en adelante?',
      o: ['Los muertos que mueren en el Señor', 'Los que lavan sus ropas', 'Los que son llamados a la cena de bodas', 'Los que tienen parte en la primera resurrección'], a: 0,
      e: '«Bienaventurados de aquí en adelante los muertos que mueren en el Señor» (14:13). Las otras bienaventuranzas son de 22:14, 19:9 y 20:6.' },
    { t: 'tf', v: '14:13',
      q: 'Según Apocalipsis 14:13, los que mueren en el Señor descansarán de sus trabajos, porque sus obras con ellos siguen.', a: true,
      e: 'Verdadero: «Sí, dice el Espíritu, descansarán de sus trabajos, porque sus obras con ellos siguen» (14:13).' },
    { t: 'mc', v: '14:14', lit: 'vi una nube blanca',
      q: '¿Sobre qué estaba sentado el que era semejante al Hijo del hombre? (Apocalipsis 14:14)',
      o: ['Sobre una nube blanca', 'Sobre un caballo blanco', 'Sobre un gran trono blanco', 'Sobre el mar de vidrio'], a: 0,
      e: '«Miré, y vi una nube blanca. Sentado sobre la nube, uno semejante al Hijo del hombre» (14:14). El caballo blanco es de 19:11 y el gran trono blanco, de 20:11.' },
    { t: 'mc', v: '14:14', lit: 'una corona de oro y en la mano una hoz aguda',
      q: '¿Qué llevaba el que estaba sentado sobre la nube? (Apocalipsis 14:14)',
      o: ['Corona de oro y una hoz aguda', 'Un arco y una corona', 'Siete estrellas y una espada', 'Una caña de medir y un libro'], a: 0,
      e: '«…que llevaba en la cabeza una corona de oro y en la mano una hoz aguda» (14:14). El arco y la corona son del caballo blanco de 6:2.' },
    { t: 'tf', v: '14:14',
      q: 'El que estaba sentado sobre la nube llevaba en la cabeza una corona de espinas. (Apocalipsis 14:14)', a: false,
      e: 'Falso: llevaba una corona de ORO (14:14).' },
    { t: 'mc', v: '14:15', lit: 'la mies de la tierra está madura',
      q: 'Según Apocalipsis 14:15, ¿por qué debía meter su hoz y segar?',
      o: ['Porque la mies de la tierra está madura', 'Porque las uvas de la tierra están maduras', 'Porque Babilonia la gran ciudad ha caído', 'Porque el séptimo sello ya fue abierto'], a: 0,
      e: '«¡Mete tu hoz y siega, porque la hora de segar ha llegado, pues la mies de la tierra está madura!» (14:15). Las uvas maduras son de 14:18.' },
    { t: 'fill', v: '14:15', ins: 'Apocalipsis 14:15 (RV1995) — Completa:',
      p: [{ x: '«¡Mete tu ' }, { b: 'hoz', h: '¿qué debe meter?' }, { x: ' y siega, porque la hora de segar ha llegado, pues la ' }, { b: 'mies', h: '¿qué está madura?' }, { x: ' de la tierra está madura!»' }] },
    { t: 'tf', v: '14:16',
      q: 'El que estaba sentado sobre la nube metió su hoz en la tierra y la tierra fue segada. (Apocalipsis 14:16)', a: true,
      e: 'Verdadero (14:16).' },
    { t: 'mc', v: '14:17', lit: 'Otro ángel salió del templo que está en el cielo',
      q: '¿De dónde salió el ángel que llevaba la segunda hoz aguda? (Apocalipsis 14:17)',
      o: ['Del templo que está en el cielo', 'Del altar, con poder sobre el fuego', 'Del abismo, con una gran cadena', 'De donde sale el sol, con un sello'], a: 0,
      e: '«Otro ángel salió del templo que está en el cielo, llevando también una hoz aguda» (14:17). El que salió del altar es el de 14:18.' },
    { t: 'mc', v: '14:18', lit: 'que tenía poder sobre el fuego',
      q: 'Según Apocalipsis 14:18, ¿sobre qué tenía poder el ángel que salió del altar?',
      o: ['Sobre el fuego', 'Sobre las aguas', 'Sobre los vientos', 'Sobre el abismo'], a: 0,
      e: '«Y salió del altar otro ángel, que tenía poder sobre el fuego» (14:18). El ángel de las aguas es de 16:5; los de los vientos, de 7:1.' },
    { t: 'mc', v: '14:18', lit: 'vendimia los racimos de la tierra',
      q: '¿Qué le mandó el ángel del altar al que llevaba la hoz aguda? (Apocalipsis 14:18)',
      o: ['Vendimiar los racimos de la tierra', 'Segar la mies madura de la tierra', 'Medir el templo de Dios y el altar', 'Sellar a los siervos de nuestro Dios'], a: 0,
      e: '«¡Mete tu hoz aguda y vendimia los racimos de la tierra, porque sus uvas están maduras!» (14:18).' },
    { t: 'mc', v: '14:19', lit: 'el gran lagar de la ira de Dios',
      q: '¿Dónde echó el ángel las uvas? (Apocalipsis 14:19)',
      o: ['En el gran lagar de la ira de Dios', 'En el cáliz de oro de la ramera', 'En el mar de vidrio mezclado con fuego', 'En el granero del Señor de la mies'], a: 0,
      e: '«…y echó las uvas en el gran lagar de la ira de Dios» (14:19).' },
    { t: 'mc', v: '14:20', lit: 'hasta los frenos de los caballos',
      q: '¿Hasta dónde llegó la sangre que salió del lagar? (Apocalipsis 14:20)',
      o: ['Hasta los frenos de los caballos', 'Hasta las rodillas de los hombres', 'Hasta los muros de la gran ciudad', 'Hasta las puertas del templo'], a: 0,
      e: '«…del lagar salió sangre que llegó hasta los frenos de los caballos» (14:20).' },
    { t: 'mc', v: '14:20', lit: 'mil seiscientos estadios',
      q: '¿En qué extensión llegó la sangre del lagar? (Apocalipsis 14:20)',
      o: ['1.600 estadios', '12.000 estadios', '1.260 estadios', '144 estadios'], a: 0,
      e: '«…en una extensión de mil seiscientos estadios» (14:20). Los 12.000 estadios son la medida de la ciudad (21:16).' },
    { t: 'tf', v: '14:20',
      q: 'Según Apocalipsis 14:20, el lagar fue pisado dentro de la ciudad.', a: false,
      e: 'Falso: «El lagar fue pisado FUERA de la ciudad» (14:20).' },
    { t: 'mc', v: '14:1', f: 'c',
      q: '¿Cuándo viven los 144.000 de Apocalipsis 14?',
      o: ['En la crisis final, vivos cuando Jesús vuelve', 'Son los que resucitaron con Cristo en el año 31', 'Son judíos que se convertirán tras un rapto', 'Son los mártires de los 1.260 años'], a: 0,
      e: 'Vencen a la bestia, su imagen y su marca (15:2-4), así que tienen que estar vivos en la crisis final. Fuente: Bohr, Tres ángeles 2:166-167.' },
    { t: 'mc', v: '14:4', f: 'c',
      q: '¿En qué sentido los 144.000 son «primicias»?',
      o: ['En calidad: maduros por la lluvia tardía', 'En tiempo: los primeros en ser salvados', 'En número: los primeros 144.000 conversos', 'En edad: los más jóvenes del pueblo'], a: 0,
      e: 'Primicias en calidad: el mensaje de los tres ángeles, con el poder de la lluvia tardía, los maduró para la cosecha. Fuente: Bohr, Tres ángeles 2:208; Bohr, Los 144.000 y los 24 ancianos, p. 94.' },
    { t: 'tf', v: '14:1', f: 'c',
      q: 'El número 144.000 se puede entender como simbólico, igual que las tribus de Israel.', a: true,
      e: 'Verdadero: el libro está lleno de símbolos, y las doce tribus literales se perdieron en el 722 a.C. Es un tema discutido. Fuente: Bohr, Los 144.000 y los 24 ancianos, p. 116-117.' },
    { t: 'mc', v: '14:6', f: 'c',
      q: '¿Quiénes predican en realidad los mensajes de los tres ángeles?',
      o: ['Personas, ayudadas por los ángeles', 'Ángeles literales volando por el cielo', 'Los veinticuatro ancianos del trono', 'Los dos testigos del capítulo 11'], a: 0,
      e: '«Ángel» significa mensajero; Dios encargó el evangelio a las personas (Mateo 28:19-20) y los ángeles las ayudan. Fuente: Bohr, Tres ángeles 1:4-5.' },
    { t: 'mc', v: '14:6', f: 'c',
      q: '¿Por qué el evangelio que lleva el primer ángel es «eterno»?',
      o: ['Se planeó en la eternidad, antes del pecado', 'Solo se predicará en la eternidad futura', 'Lo escribió un ángel en el cielo', 'Reemplaza a la ley, que ya no rige'], a: 0,
      e: 'El plan se trazó en la eternidad, se reveló a Adán y Eva, se ilustró en los sacrificios y se cumplió en Cristo. Fuente: Bohr, Tres ángeles 1:11-12.' },
    { t: 'mc', v: '14:7', f: 'c',
      q: '¿Qué significa «Temed a Dios» en el mensaje del primer ángel?',
      o: ['Obedecer con reverencia sus mandamientos', 'Tener miedo de su castigo eterno', 'Alejarse de Dios por respeto', 'Ayunar antes de entrar al templo'], a: 0,
      e: 'Temer a Dios no es tenerle miedo, sino obedecer con reverencia sus mandamientos (Eclesiastés 12:13). Fuente: Bohr, Tres ángeles 2:210-211.' },
    { t: 'mc', v: '14:7', f: 'c',
      q: '¿Qué es «dar gloria» a Dios?',
      o: ['Reflejar su carácter en la vida', 'Cantarle himnos en voz alta', 'Darle ofrendas generosas', 'Construirle templos grandes'], a: 0,
      e: 'La gloria de Dios es su carácter, como se lo mostró a Moisés (Éxodo 33:18-19; 34:6-7); darle gloria es reflejarlo, como la luna refleja al sol. Fuente: Bohr, Tres ángeles 1:37-38 y 2:211.' },
    { t: 'mc', v: '14:7', f: 'c',
      q: 'En la lectura adventista, ¿qué es «la hora de su juicio» que anuncia el primer ángel?',
      o: ['El juicio que empezó en el cielo en 1844', 'La destrucción de Jerusalén en el año 70', 'El juicio de los mil años después', 'El diluvio en los tiempos de Noé'], a: 0,
      e: 'Es la primera etapa del juicio, antes de la segunda venida, que empezó al terminar los 2.300 días de Daniel 8:14. Fuente: Bohr, Tres ángeles 1:49-50; CS 488.' },
    { t: 'mc', v: '14:7', f: 'c',
      q: '¿Desde qué año se cuentan los 2.300 días que llegan a 1844?',
      o: ['Desde el 457 a.C.', 'Desde el 538 d.C.', 'Desde el 605 a.C.', 'Desde el 31 d.C.'], a: 0,
      e: 'Desde el decreto para restaurar Jerusalén, en el otoño del 457 a.C., hasta el otoño de 1844. Fuente: CS 374 y 450.' },
    { t: 'mc', v: '14:7', f: 'c',
      q: '¿Por qué el juicio debe hacerse antes de la segunda venida?',
      o: ['Porque Jesús trae la recompensa al venir', 'Porque los muertos van al cielo al morir', 'Porque el juicio es en el momento de morir', 'Porque así lo decidió un concilio'], a: 0,
      e: 'Jesús dice «mi galardón conmigo» (22:12; Mateo 16:27); para traer la recompensa, el caso ya tiene que estar decidido. Fuente: Bohr, Tres ángeles 1:55.' },
    { t: 'mc', v: '14:7', f: 'c',
      q: '¿A qué mandamiento invita especialmente «Adorad a aquel que hizo el cielo y la tierra»?',
      o: ['Al cuarto, el del sábado', 'Al quinto, el de los padres', 'Al octavo, el de no hurtar', 'Al décimo, el de no codiciar'], a: 0,
      e: 'Usa las palabras de Éxodo 20:11; por eso invita especialmente a guardar el cuarto mandamiento. Fuente: CS 490-491.' },
    { t: 'mc', v: '14:8', f: 'c',
      q: '¿Qué forma Babilonia en el tiempo del fin?',
      o: ['La ramera, sus hijas y los reyes de la tierra', 'La ciudad que hoy está en Irak', 'La iglesia de Laodicea, que era tibia', 'El imperio de Nabucodonosor que volverá'], a: 0,
      e: 'El papado (la ramera), el protestantismo apóstata (las hijas) y los gobiernos (los reyes); son sistemas, no las personas sinceras que están en ellos. Fuente: Bohr, Tres ángeles 1:96-99.' },
    { t: 'mc', v: '14:8', f: 'c',
      q: '¿Qué es el vino de Babilonia?',
      o: ['Las falsas doctrinas que confunden', 'Las riquezas de los comerciantes', 'La sangre de los mártires', 'El vino de la santa cena'], a: 0,
      e: 'Por ejemplo, la inmortalidad natural del alma, el tormento eterno y el domingo en lugar del sábado. Fuente: Bohr, Tres ángeles 1:101; CS 439.' },
    { t: 'mc', v: '14:8', f: 'c',
      q: '¿Cuándo se predicó por primera vez el mensaje del segundo ángel?',
      o: ['En el verano de 1844', 'En la Reforma de 1517', 'En 1798, al caer el papa', 'En el Pentecostés del año 31'], a: 0,
      e: 'Sobre todo a las iglesias de los Estados Unidos que rechazaron el aviso del juicio; pero su cumplimiento completo todavía es futuro. Fuente: CS 440-441.' },
    { t: 'tf', v: '14:8', f: 'c',
      q: 'La mayoría de los verdaderos discípulos de Cristo todavía están en las iglesias que forman Babilonia.', a: true,
      e: 'Verdadero: por eso Dios los llama a salir (18:4). Babilonia es un sistema, no sus miembros sinceros. Fuente: CS 441.' },
    { t: 'mc', v: '14:10', f: 'c',
      q: '¿Qué es «el vino de la ira de Dios» del tercer ángel?',
      o: ['Las siete plagas postreras', 'La destrucción de Jerusalén', 'El diluvio del tiempo de Noé', 'La guerra de los dos testigos'], a: 0,
      e: 'La ira se guarda en las siete copas (15:1; 16:1) y se termina de beber en el lago de fuego. Fuente: Bohr, Tres ángeles 2:73-74.' },
    { t: 'tf', v: '14:11', f: 'c',
      q: '«Por los siglos de los siglos» prueba que los malos sufrirán un tormento sin fin.', a: false,
      e: 'Falso: aión (y olam) no siempre significa sin fin; los malos serán cenizas, sin raíz ni rama (Malaquías 4:1-3), como Sodoma (Judas 7). Fuente: Bohr, Tres ángeles 2:86-87 y 98-99.' },
    { t: 'mc', v: '14:12', f: 'c',
      q: '¿Qué equilibrio enseña «los mandamientos de Dios y la fe de Jesús»?',
      o: ['Obediencia sin legalismo y fe sin desprecio de la ley', 'Que la fe reemplaza a los mandamientos', 'Que basta guardar la ley para salvarse', 'Que los mandamientos eran solo para Israel'], a: 0,
      e: 'Ni el legalismo ni una gracia barata: abarca la ley y el evangelio. Fuente: Bohr, Tres ángeles 2:26 y 125-126.' },
    { t: 'mc', v: '14:14-16', f: 'c',
      q: '¿Quiénes son la mies que siega el que está sobre la nube?',
      o: ['Los que aceptaron los tres mensajes', 'Los que adoraron a la bestia', 'Los ángeles que salen del templo', 'Las naciones del mundo antiguo'], a: 0,
      e: 'La mies tiene el sello de Dios y es cosechada primero, cuando Jesús viene; las uvas tienen la marca de la bestia. Fuente: Bohr, Tres ángeles 2:211.' },
    { t: 'tf', v: '14:19-20', f: 'c',
      q: 'El lagar pisado fuera de la ciudad se relaciona con Apocalipsis 19, cuando Jesús viene con los ejércitos del cielo a librar a su pueblo.', a: true,
      e: 'Verdadero: los impíos rodean al remanente y Jesús pisa «el lagar del vino del furor» (19:15). Fuente: Bohr, Tres ángeles 2:212.' },
    { t: 'mc', v: '14:8', f: 'c',
      q: '¿Qué significa el nombre «Babel», de donde viene Babilonia?',
      o: ['Confusión', 'Fortaleza', 'Ciudad grande', 'Río caudaloso'], a: 0,
      e: 'En Babel Dios confundió la lengua de los hombres (Génesis 11:9). Por eso Babilonia representa la confusión de la religión que se aparta de Dios. Fuente: Bohr, 15 principios 2:104.' },
    { t: 'tf', v: '14:8', f: 'c',
      q: 'En la profecía, una mujer que actúa como ramera representa una iglesia unida ilícitamente a los poderes civiles.', a: true,
      e: 'Verdadero: con la gran ramera «han fornicado los reyes de la tierra» (17:2); ver Santiago 4:4 y Ezequiel 16. Fuente: Bohr, 15 principios 2:106.' },
    { t: 'mc', v: '14:15', f: 'c',
      q: '¿Qué texto de Jesús explica que la siega representa el fin del mundo?',
      o: ['Mateo 13:39', 'Juan 4:35', 'Lucas 10:2', 'Gálatas 6:7'], a: 0,
      e: 'En la parábola del trigo y la cizaña, Jesús explica que la siega es el fin del siglo (Mateo 13:39). Es la misma cosecha de 14:14-16. Fuente: Bohr, El calendario religioso hebreo, p. 42.' },
  ],

  tarjetas: [
    { f: 'Dónde estaba el Cordero y con cuántos (14:1)', r: 'De pie sobre el monte de Sión, con 144.000' },
    { f: 'Qué tenían en la frente los 144.000 (14:1)', r: 'El nombre del Cordero y el de su Padre' },
    { f: 'La voz del cielo era como… (14:2)', r: 'Muchas aguas, un gran trueno y arpistas que tocaban sus arpas' },
    { f: 'Cómo son los 144.000 (14:4-5)', r: 'Vírgenes, siguen al Cordero, primicias, sin mentira en su boca, sin mancha' },
    { f: 'Mensaje del primer ángel (14:7)', r: 'Temed a Dios y dadle gloria, porque la hora de su juicio ha llegado; adorad al que hizo el cielo, la tierra, el mar y las fuentes de las aguas' },
    { f: 'Mensaje del segundo ángel (14:8)', r: '«Ha caído, ha caído Babilonia, la gran ciudad»' },
    { f: 'Mensaje del tercer ángel (14:9-10)', r: 'El que adore a la bestia y a su imagen y reciba la marca beberá del vino de la ira de Dios' },
    { f: '«Aquí está la perseverancia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús»', r: 'Apocalipsis 14:12' },
    { f: 'Los bienaventurados de 14:13', r: 'Los muertos que mueren en el Señor: descansarán de sus trabajos' },
    { f: 'El que está sobre la nube (14:14)', r: 'Semejante al Hijo del hombre, con corona de oro y hoz aguda, sobre una nube blanca' },
    { f: 'Las dos siegas (14:15-19)', r: 'Primero la mies madura; luego las uvas, al gran lagar de la ira de Dios' },
    { f: 'El ángel del altar (14:18)', r: 'Tenía poder sobre el fuego' },
    { f: 'La sangre del lagar (14:20)', r: 'Hasta los frenos de los caballos, en 1.600 estadios' },
  ],
};
