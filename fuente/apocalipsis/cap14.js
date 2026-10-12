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

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Igual que en el capítulo 13,
      se habla de <strong>sistemas y poderes</strong>, no de personas: el
      mensaje es una invitación para todos, en todas las iglesias.<br><br>
      · Los <strong>144.000</strong> se entienden como los fieles que viven
      cuando Jesús vuelve. La iglesia no ha definido si el número es literal o
      simbólico, y Elena de White aconsejó no discutir sobre eso.<br>
      · Los <strong>tres ángeles</strong> son el último mensaje de Dios al mundo
      antes de la venida de Jesús, y la iglesia adventista entiende que su
      misión es predicarlo.<br>
      · <strong>«La hora de su juicio ha llegado»</strong> se lee como el juicio
      que empezó en el cielo en <strong>1844</strong> (Daniel 8:14).<br>
      · <strong>«Adorad a aquel que hizo el cielo y la tierra, el mar»</strong>
      recuerda las palabras del <strong>cuarto mandamiento</strong> (Éxodo
      20:11): un llamado a adorar al Creador y a guardar su sábado.<br>
      · <strong>Babilonia</strong> significa confusión: los sistemas religiosos
      que mezclan la verdad con el error. Dios tiene hijos allí y los llama a
      salir (18:4).<br>
      · La <strong>siega de la mies</strong> es la segunda venida, cuando Jesús
      recoge a los suyos; la <strong>vendimia</strong>, el juicio sobre los que
      rechazaron a Dios.`) },
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
    { t: 'mc', v: '14:7', f: 'c',
      q: 'En la lectura adventista, ¿qué es «la hora de su juicio» que anuncia el primer ángel?',
      o: ['El juicio que empezó en el cielo en 1844', 'La destrucción de Jerusalén en el año 70', 'El juicio de los mil años después', 'El diluvio en los tiempos de Noé'], a: 0,
      e: 'Interpretación: el juicio que empieza al final de los 2.300 días de Daniel 8:14, en 1844. El texto solo dice «la hora de su juicio ha llegado» (14:7).' },
    { t: 'mc', v: '14:7', f: 'c',
      q: 'En la interpretación adventista, ¿a qué mandamiento recuerda «Adorad a aquel que hizo el cielo y la tierra, el mar»?',
      o: ['Al cuarto, el del sábado', 'Al quinto, el de los padres', 'Al octavo, el de no hurtar', 'Al décimo, el de no codiciar'], a: 0,
      e: 'Interpretación: usa las palabras de Éxodo 20:11, el cuarto mandamiento, y llama a adorar al Creador. El texto de 14:7 no nombra el sábado.' },
    { t: 'mc', v: '14:8', f: 'c',
      q: 'En la lectura adventista, ¿qué representa Babilonia en el mensaje del segundo ángel?',
      o: ['La confusión de sistemas que mezclan verdad y error', 'La ciudad que hoy está en el territorio de Irak', 'La iglesia de Laodicea, que era tibia', 'El imperio de Nabucodonosor que volverá'], a: 0,
      e: 'Interpretación: Babilonia significa confusión; son sistemas, no personas, y Dios llama a sus hijos a salir de ella (18:4). El texto solo dice que cayó (14:8).' },
    { t: 'mc', v: '14:14-16', f: 'c',
      q: 'En la interpretación adventista, ¿qué representa la siega que hace el que está sobre la nube blanca?',
      o: ['La segunda venida de Jesús por los suyos', 'La cosecha de trigo en la tierra de Israel', 'La caída de Babilonia la gran ciudad', 'El sellamiento de los 144.000'], a: 0,
      e: 'Interpretación: Jesús viene en las nubes (1:7) a recoger a los suyos. El texto solo dice que metió su hoz y la tierra fue segada (14:16).' },
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
