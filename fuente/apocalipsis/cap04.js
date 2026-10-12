/* Apocalipsis 4 — El trono de Dios en el cielo.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap4', label: 'Apocalipsis 4', sub: 'El trono en el cielo', vs: 11,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Juan vio <strong>una puerta abierta en el cielo</strong> y oyó una voz
      que le dijo: <strong>«¡Sube acá!»</strong> (4:1).<br><br>
      Allá vio <strong>un trono</strong> y a Dios sentado en él, con un
      <strong>arco iris</strong> alrededor. Cerca del trono había
      <strong>24 ancianos</strong> con ropas blancas y coronas de oro, y
      <strong>cuatro seres vivientes</strong> llenos de ojos: uno como león,
      otro como becerro, otro con cara de hombre y otro como águila.<br><br>
      Los seres vivientes decían: <strong>«¡Santo, santo, santo…!»</strong>
      (4:8), y los ancianos se inclinaban y adoraban a Dios (4:10).<br><br>
      <em>La idea del capítulo: Dios está en su trono y merece toda la
      adoración, porque él creó todas las cosas.</em>`) },

    { t: '🚪 Una puerta abierta en el cielo (4:1-2)', capa: 'nucleo', h:
      li([`<strong>«Después de esto miré, y vi que había una puerta abierta en el
           cielo»</strong> (4:1).`,
          `La voz era <strong>«la primera voz»</strong>, la que sonaba
           <strong>como de una trompeta</strong> (4:1).`,
          `La orden: <strong>«¡Sube acá y yo te mostraré las cosas que sucederán
           después de éstas!»</strong> (4:1).`,
          `Juan estaba <strong>«en el Espíritu»</strong> y vio <strong>«un trono
           establecido en el cielo, y en el trono, uno sentado»</strong> (4:2).`]) +
      wa(`«La primera voz» se entiende como la misma voz como de trompeta que
      Juan oyó en Patmos (1:10). No la confundas con la voz <strong>«como de
      trueno»</strong> de uno de los cuatro seres vivientes en 6:1.`) },

    { t: '💎 El que está sentado en el trono (4:3)', capa: 'nucleo', h:
      tbl(['Qué', 'Cómo se veía (4:3)'], [
        ['El que estaba sentado', 'Semejante a una piedra de <strong>jaspe</strong> y de <strong>cornalina</strong>'],
        ['Alrededor del trono', 'Un <strong>arco iris</strong>'],
        ['El arco iris', 'Semejante en su apariencia a la <strong>esmeralda</strong>'],
      ]) +
      wa(`Son tres piedras y no se cruzan: <strong>jaspe y cornalina</strong>
      para el que está sentado; <strong>esmeralda</strong> para el arco
      iris.`) },

    { t: '👑 Los veinticuatro ancianos (4:4)', capa: 'nucleo', h:
      tbl(['Detalle', 'Lo que dice 4:4'], [
        ['Cuántos tronos', '<strong>Veinticuatro</strong>, alrededor del trono'],
        ['Quiénes se sientan', '<strong>Veinticuatro ancianos</strong>'],
        ['Ropa', '<strong>Ropas blancas</strong>'],
        ['En la cabeza', '<strong>Coronas de oro</strong>'],
      ]) +
      hi(`<strong>«…vi sentados a veinticuatro ancianos vestidos de ropas blancas,
      con coronas de oro en sus cabezas»</strong> (4:4).`) },

    { t: '⚡ Lo que sale y lo que está delante del trono (4:5-6)', capa: 'nucleo', h:
      tbl(['Dónde', 'Qué había'], [
        ['Salían del trono', '<strong>Relámpagos, truenos y voces</strong> (4:5)'],
        ['Delante del trono', '<strong>Siete lámparas de fuego</strong>, «que son los siete espíritus de Dios» (4:5)'],
        ['También delante del trono', '<strong>Como un mar de vidrio</strong> semejante al cristal (4:6)'],
        ['Junto y alrededor del trono', '<strong>Cuatro seres vivientes</strong> llenos de ojos por delante y por detrás (4:6)'],
      ]) +
      wa(`No confundas: en el capítulo 1 había <strong>siete candelabros de
      oro</strong>, que son las iglesias (1:20). Aquí hay <strong>siete
      lámparas de fuego</strong>, que son los siete espíritus de Dios
      (4:5).`) },

    { t: '🦁 Los cuatro seres vivientes (4:6-8)', capa: 'nucleo', h:
      tbl(['#', 'A qué se parecía (4:7)'], [
        ['Primero', 'Semejante a un <strong>león</strong>'],
        ['Segundo', 'Semejante a un <strong>becerro</strong>'],
        ['Tercero', 'Tenía <strong>rostro como de hombre</strong>'],
        ['Cuarto', 'Semejante a un <strong>águila volando</strong>'],
      ]) +
      li([`Cada uno tenía <strong>seis alas</strong> (4:8).`,
          `Estaban <strong>llenos de ojos</strong>, por delante y por detrás
           (4:6), alrededor y por dentro (4:8).`,
          `Hablaban <strong>día y noche, sin cesar</strong> (4:8).`]) +
      wa(`No los mezcles con las cuatro bestias de Daniel 7 (león, oso,
      leopardo y una bestia espantosa). Aquí el orden es <strong>león,
      becerro, hombre, águila</strong>.`) },

    { t: '🎶 «Santo, santo, santo» (4:8)', capa: 'nucleo', h:
      hi(`<strong>«¡Santo, santo, santo es el Señor Dios Todopoderoso, el que
      era, el que es y el que ha de venir!»</strong> (4:8).`) +
      wa(`Fíjate en el orden. Aquí: <strong>«el que era, el que es y el que ha
      de venir»</strong> (4:8). En el capítulo 1 el orden era otro: «el que es
      y que era y que ha de venir» (1:4, 1:8).`) },

    { t: '🙇 Los ancianos echan sus coronas (4:9-11)', capa: 'nucleo', h:
      li([`Cada vez que los seres vivientes dan <strong>gloria, honra y acción
           de gracias</strong> al que está en el trono (4:9)…`,
          `…los veinticuatro ancianos <strong>se postran</strong>,
           <strong>adoran</strong> y <strong>echan sus coronas delante del
           trono</strong> (4:10).`]) +
      hi(`Su canto: <strong>«Señor, digno eres de recibir la gloria, la honra y
      el poder, porque tú creaste todas las cosas, y por tu voluntad existen y
      fueron creadas»</strong> (4:11).`) +
      wa(`La razón por la que Dios es digno aquí es <strong>la
      creación</strong>: «tú creaste todas las cosas» (4:11). En el capítulo 5
      el Cordero es digno por otra razón: porque fue inmolado (5:9).`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · La escena es el <strong>santuario celestial</strong>, el lugar desde
      donde Dios gobierna; las siete lámparas de fuego recuerdan el candelabro
      del santuario que Moisés construyó.<br>
      · Los <strong>veinticuatro ancianos</strong> se entienden como seres
      humanos redimidos: tienen ropas blancas y coronas, que en el Apocalipsis
      son premio de los vencedores.<br>
      · Los <strong>cuatro seres vivientes</strong> se parecen a los querubines
      de Ezequiel 1 y a los serafines de Isaías 6, que también dicen «Santo,
      santo, santo».<br>
      · El canto de 4:11 adora a Dios como <strong>Creador</strong>. Por eso se
      une con el mensaje del primer ángel («adorad a aquel que hizo el cielo y
      la tierra», 14:7) y con el sábado, que recuerda la creación.`) },
  ],

  preguntas: [
    { t: 'mc', v: '4:1', lit: 'una puerta abierta en el cielo',
      q: '¿Qué vio Juan al comenzar Apocalipsis 4?',
      o: ['Una puerta abierta en el cielo', 'Un libro sellado con siete sellos', 'Siete candelabros de oro', 'Un caballo blanco con su jinete'], a: 0,
      e: '«…vi que había una puerta abierta en el cielo» (4:1).' },
    { t: 'mc', v: '4:1', lit: 'Sube acá',
      q: '¿Qué le dijo a Juan la voz como de trompeta? (Apocalipsis 4:1)',
      o: ['«¡Sube acá!»', '«¡Ven y ve!»', '«¡No temas!»', '«¡Escribe!»'], a: 0,
      e: '«¡Sube acá y yo te mostraré las cosas que sucederán después de éstas!» (4:1).' },
    { t: 'tf', v: '4:1',
      q: 'La primera voz que Juan oyó en Apocalipsis 4:1 era como de un trueno.', a: false,
      e: 'Falso: era «como de una TROMPETA» (4:1). La voz como de trueno es la de uno de los cuatro seres vivientes (6:1).' },
    { t: 'mc', v: '4:2', lit: 'vi un trono establecido en el cielo',
      q: '¿Qué texto dice «vi un trono establecido en el cielo, y en el trono, uno sentado»?',
      o: ['Apocalipsis 4:2', 'Apocalipsis 4:4', 'Apocalipsis 5:1', 'Apocalipsis 4:10'], a: 0,
      e: 'Apocalipsis 4:2: «Al instante, estando yo en el Espíritu, vi un trono establecido en el cielo, y en el trono, uno sentado».' },
    { t: 'mc', v: '4:3', lit: 'semejante a una piedra de jaspe y de cornalina',
      q: '¿A qué era semejante la apariencia del que estaba sentado en el trono? (Apocalipsis 4:3)',
      o: ['A una piedra de jaspe y de cornalina', 'A una piedra de zafiro y de rubí', 'Al bronce pulido y al oro fino', 'A una llama de fuego y al sol'], a: 0,
      e: '«La apariencia del que estaba sentado era semejante a una piedra de jaspe y de cornalina» (4:3).' },
    { t: 'mc', v: '4:3', lit: 'arco iris semejante en su apariencia a la esmeralda',
      q: '¿A qué se parecía el arco iris que rodeaba el trono? (Apocalipsis 4:3)',
      o: ['A la esmeralda', 'Al zafiro', 'Al jaspe', 'Al cristal'], a: 0,
      e: '«…alrededor del trono había un arco iris semejante en su apariencia a la esmeralda» (4:3).' },
    { t: 'mc', v: '4:4', lit: 'veinticuatro tronos',
      q: '¿Cuántos tronos había alrededor del trono? (Apocalipsis 4:4)',
      o: ['24', '12', '7', '4'], a: 0,
      e: '«Alrededor del trono había veinticuatro tronos» (4:4).' },
    { t: 'fill', v: '4:4', ins: 'Apocalipsis 4:4 (RV1995) — Completa:',
      p: [{ x: '«…vi sentados a veinticuatro ancianos vestidos de ropas ' }, { b: 'blancas', h: '¿de qué color?' }, { x: ', con coronas de ' }, { b: 'oro', h: '¿de qué material?' }, { x: ' en sus cabezas.»' }] },
    { t: 'tf', v: '4:4',
      q: 'Los veinticuatro ancianos tenían coronas de oro en sus cabezas. (Apocalipsis 4:4)', a: true,
      e: 'Verdadero (Apocalipsis 4:4).' },
    { t: 'mc', v: '4:5', lit: 'relámpagos, truenos y voces',
      q: '¿Qué salía del trono, según Apocalipsis 4:5?',
      o: ['Relámpagos, truenos y voces', 'Fuego, humo y granizo', 'Un río de agua de vida', 'Ángeles con trompetas'], a: 0,
      e: '«Del trono salían relámpagos, truenos y voces» (4:5).' },
    { t: 'mc', v: '4:5', lit: 'siete lámparas de fuego, que son los siete espíritus de Dios',
      q: 'Según Apocalipsis 4:5, ¿qué son las siete lámparas de fuego que arden delante del trono?',
      o: ['Los siete espíritus de Dios', 'Las siete iglesias de Asia', 'Los ángeles de las iglesias', 'Las oraciones de los santos'], a: 0,
      e: '«…siete lámparas de fuego, que son los siete espíritus de Dios» (4:5). Las siete iglesias son los candelabros (1:20).' },
    { t: 'mc', v: '4:6', lit: 'como un mar de vidrio semejante al cristal',
      q: '¿Qué más había delante del trono, según Apocalipsis 4:6?',
      o: ['Como un mar de vidrio semejante al cristal', 'Un candelabro de oro de siete brazos', 'Una mesa de oro con doce panes', 'Una fuente de agua clara y viva'], a: 0,
      e: '«También delante del trono había como un mar de vidrio semejante al cristal» (4:6).' },
    { t: 'tf', v: '4:6',
      q: 'Los cuatro seres vivientes estaban llenos de ojos por delante y por detrás. (Apocalipsis 4:6)', a: true,
      e: 'Verdadero (Apocalipsis 4:6).' },
    { t: 'mc', v: '4:7', lit: 'el segundo era semejante a un becerro',
      q: 'Según Apocalipsis 4:7, ¿a qué era semejante el segundo ser viviente?',
      o: ['A un becerro', 'A un león', 'A un águila volando', 'A un oso'], a: 0,
      e: '«…el segundo era semejante a un becerro» (4:7).' },
    { t: 'mc', v: '4:7', lit: 'semejante a un león',
      q: '¿Cuál es el orden de los cuatro seres vivientes en Apocalipsis 4:7?',
      o: ['León, becerro, hombre, águila', 'León, oso, leopardo, águila', 'Hombre, león, becerro, águila', 'Águila, león, becerro, hombre'], a: 0,
      e: 'Apocalipsis 4:7: el primero como león, el segundo como becerro, el tercero con rostro como de hombre y el cuarto como águila volando.' },
    { t: 'tf', v: '4:7',
      q: 'El tercer ser viviente era semejante a un águila volando. (Apocalipsis 4:7)', a: false,
      e: 'Falso: el tercero tenía rostro como de HOMBRE; el águila volando es el CUARTO (4:7).' },
    { t: 'mc', v: '4:8', lit: 'tenían cada uno seis alas',
      q: '¿Cuántas alas tenía cada ser viviente? (Apocalipsis 4:8)',
      o: ['Seis', 'Cuatro', 'Dos', 'Siete'], a: 0,
      e: '«Los cuatro seres vivientes tenían cada uno seis alas» (4:8).' },
    { t: 'mc', v: '4:8', lit: 'Santo, santo, santo es el Señor Dios Todopoderoso',
      q: '¿Qué texto dice «¡Santo, santo, santo es el Señor Dios Todopoderoso!»?',
      o: ['Apocalipsis 4:8', 'Apocalipsis 4:11', 'Apocalipsis 5:12', 'Apocalipsis 1:8'], a: 0,
      e: 'Apocalipsis 4:8. Lo dicen los cuatro seres vivientes «día y noche, sin cesar».' },
    { t: 'fill', v: '4:8', ins: 'Apocalipsis 4:8 (RV1995) — Completa:',
      p: [{ x: '«¡Santo, santo, santo es el Señor Dios ' }, { b: 'Todopoderoso', h: '¿qué título?' }, { x: ', el que era, el que es y el que ha de ' }, { b: 'venir', h: '¿qué hará?' }, { x: '!»' }] },
    { t: 'mc', v: '4:8', lit: 'día y noche, sin cesar',
      q: '¿Cuándo decían los seres vivientes «Santo, santo, santo»? (Apocalipsis 4:8)',
      o: ['Día y noche, sin cesar', 'Solo en el día del Señor', 'Cada vez que se abría un sello', 'Al principio de cada mañana'], a: 0,
      e: '«…y día y noche, sin cesar, decían: ¡Santo, santo, santo…!» (4:8).' },
    { t: 'mc', v: '4:9-10', lit: 'echan sus coronas delante del trono',
      q: '¿Qué hacen los veinticuatro ancianos cuando los seres vivientes dan gloria a Dios? (Apocalipsis 4:9-10)',
      o: ['Se postran, adoran y echan sus coronas delante del trono', 'Tocan las arpas y cantan un cántico nuevo', 'Se levantan de sus tronos y se cubren el rostro', 'Abren el libro y leen en voz alta los sellos'], a: 0,
      e: '«…los veinticuatro ancianos se postran… y adoran… y echan sus coronas delante del trono» (4:10). El cántico nuevo con arpas es en 5:8-9.' },
    { t: 'tf', v: '4:9',
      q: 'Los seres vivientes dan gloria y honra y acción de gracias al que vive por los siglos de los siglos. (Apocalipsis 4:9)', a: true,
      e: 'Verdadero (Apocalipsis 4:9).' },
    { t: 'mc', v: '4:11', lit: 'porque tú creaste todas las cosas',
      q: 'Según Apocalipsis 4:11, ¿por qué es digno el Señor de recibir la gloria, la honra y el poder?',
      o: ['Porque creó todas las cosas', 'Porque fue inmolado por nosotros', 'Porque venció al dragón', 'Porque abrió los siete sellos'], a: 0,
      e: '«…porque tú creaste todas las cosas, y por tu voluntad existen y fueron creadas» (4:11). «Porque tú fuiste inmolado» se le dice al Cordero en 5:9.' },
    { t: 'mc', v: '4:11', lit: 'Señor, digno eres de recibir la gloria',
      q: '¿Qué texto dice «Señor, digno eres de recibir la gloria, la honra y el poder»?',
      o: ['Apocalipsis 4:11', 'Apocalipsis 5:12', 'Apocalipsis 5:9', 'Apocalipsis 4:8'], a: 0,
      e: 'Apocalipsis 4:11. En 5:12 se dice del Cordero, con siete cosas: poder, riquezas, sabiduría, fortaleza, honra, gloria y alabanza.' },
    { t: 'fill', v: '4:11', ins: 'Apocalipsis 4:11 (RV1995) — Completa:',
      p: [{ x: '«Señor, digno eres de recibir la gloria, la honra y el poder, porque tú ' }, { b: 'creaste', h: '¿qué hizo?' }, { x: ' todas las cosas, y por tu ' }, { b: 'voluntad', h: '¿por qué existen?' }, { x: ' existen y fueron creadas.»' }] },
    { t: 'tf', v: '4:11',
      q: 'En Apocalipsis 4:11 los ancianos dicen que el Señor es digno de recibir la gloria, la honra y las riquezas.', a: false,
      e: 'Falso: dicen «la gloria, la honra y el PODER» (4:11). Las riquezas aparecen en la lista de 5:12.' },
    { t: 'mc', v: '4:4', f: 'c',
      q: 'En la lectura adventista, ¿quiénes son los veinticuatro ancianos?',
      o: ['Seres humanos redimidos que están en el cielo', 'Los doce apóstoles repetidos dos veces', 'Los ángeles que gobiernan las naciones', 'Los jefes de las veinticuatro iglesias de Asia'], a: 0,
      e: 'Interpretación: se entienden como redimidos, por sus ropas blancas y sus coronas. El texto solo dice que son veinticuatro ancianos vestidos de blanco con coronas de oro (4:4).' },
    { t: 'mc', v: '4:2-6', f: 'c',
      q: 'En la interpretación adventista, ¿dónde ocurre la escena del trono de Apocalipsis 4?',
      o: ['En el santuario celestial', 'En el templo de Jerusalén', 'En la isla de Patmos', 'En la tierra nueva'], a: 0,
      e: 'Interpretación: el trono, las lámparas y el mar de vidrio se leen como el santuario celestial. El texto dice que el trono estaba «establecido en el cielo» (4:2).' },
    { t: 'mc', v: '4:11', f: 'c',
      q: 'En la lectura adventista, ¿con qué se une la adoración a Dios como Creador de Apocalipsis 4:11?',
      o: ['Con el mensaje del primer ángel y el sábado', 'Con la Pascua y la salida de Egipto', 'Con el bautismo de Jesús en el Jordán', 'Con la caída de Babilonia la grande'], a: 0,
      e: 'Interpretación: el primer ángel llama a adorar «a aquel que hizo el cielo y la tierra» (14:7), y el sábado recuerda la creación. El texto de 4:11 dice «tú creaste todas las cosas».' },
  ],

  tarjetas: [
    { f: 'Qué vio Juan y qué le dijo la voz (4:1)', r: 'Una puerta abierta en el cielo; «¡Sube acá!»' },
    { f: 'Piedras del que está en el trono y del arco iris (4:3)', r: 'Jaspe y cornalina; el arco iris como esmeralda' },
    { f: 'Los 24 ancianos (4:4)', r: 'En 24 tronos, con ropas blancas y coronas de oro' },
    { f: 'Qué salía del trono (4:5)', r: 'Relámpagos, truenos y voces' },
    { f: 'Las siete lámparas de fuego (4:5)', r: 'Son los siete espíritus de Dios' },
    { f: 'Qué había delante del trono (4:6)', r: 'Como un mar de vidrio semejante al cristal' },
    { f: 'Los cuatro seres vivientes, en orden (4:7)', r: 'León, becerro, rostro como de hombre, águila volando' },
    { f: 'Alas y ojos de los seres vivientes (4:6-8)', r: 'Seis alas cada uno; llenos de ojos' },
    { f: '«¡Santo, santo, santo es el Señor Dios Todopoderoso!»', r: 'Apocalipsis 4:8' },
    { f: 'Qué echan los ancianos delante del trono (4:10)', r: 'Sus coronas' },
    { f: 'Por qué es digno el Señor en 4:11', r: '«Porque tú creaste todas las cosas»' },
  ],
};
