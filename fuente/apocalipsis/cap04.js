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

    { t: '🧭 ¿Cuándo ocurre esta escena? (4:1-2)', capa: 'contexto', h:
      hi(`Desde aquí, lo que sigue es <strong>interpretación</strong>, no texto
      del capítulo.<br><br>
      El método es el <strong>historicista</strong>: las profecías se cumplen
      en orden a lo largo de la historia, desde los días del profeta hasta el
      fin. Con ese método, los capítulos 4 y 5 muestran lo que pasó en el cielo
      cuando <strong>Jesús ascendió</strong>, y los siete sellos van desde ese
      momento hasta la segunda venida.<br><br>
      · <strong>Apocalipsis 3:21 es la clave:</strong> Jesús ya venció y se
      sentó con su Padre en su trono; los que venzan se sentarán después con
      Jesús en el trono de él.<br>
      · En el capítulo 4 el Padre está en el trono y <strong>Jesús todavía no
      aparece</strong>: el cielo se prepara para recibir al «héroe de guerra»
      que vuelve victorioso. Llega en el capítulo 5.<br>
      · El canto del capítulo 4 alaba a Dios como <strong>Creador</strong>, y
      el del capítulo 5 al Cordero como <strong>Redentor</strong>. No hay
      lenguaje de tribunal (de juicio) en estos dos capítulos.<br><br>
      <strong>Otras lecturas:</strong> una ve en Apocalipsis 4-5 una escena del
      <strong>juicio investigador</strong> que comenzó en 1844. La lectura
      <strong>futurista</strong> ve en 4:1 el rapto de la iglesia; la
      historicista la rechaza.`) +
      `<p>Fuente: Bohr, <i>Los siete sellos</i> 1:3-4, 21-22, 33-34 y 108-109; Treiyer, <i>La crisis final en Apocalipsis 4 y 5</i>, p. 108.</p>` },

    { t: '🧭 El trono en el lugar santo del santuario (4:5-6)', capa: 'contexto', h:
      hi(`El santuario de Moisés tenía <strong>dos salas</strong>: el
      <strong>lugar santo</strong> (con el candelabro, la mesa de los panes y
      el altar del incienso) y el <strong>lugar santísimo</strong> (con el arca
      del pacto). Era una copia del santuario del cielo.<br><br>
      La puerta abierta de 4:1 lleva al <strong>lugar santo</strong> del
      santuario celestial:<br>
      · Las <strong>siete lámparas de fuego</strong> son el candelabro. En
      griego dice <em>lampades</em>, la misma palabra que usa la Septuaginta (la
      traducción griega del Antiguo Testamento) para el candelabro.<br>
      · Juan vio allí las siete lámparas y el altar de oro: se le permitió
      contemplar «el primer departamento del santuario en el cielo» (CS
      467).<br>
      · El trono se relaciona con la <strong>mesa de los panes</strong>: tenía
      dos coronas y dos hileras de pan, como dos personas (el Padre y el Hijo)
      que comparten un trono y alimentan al pueblo con la Palabra.<br>
      · Las siete lámparas son <strong>el Espíritu Santo en su
      plenitud</strong> (siete = plenitud).<br>
      · Los <strong>relámpagos</strong> muestran la rapidez de los ángeles, que
      van y vuelven «a semejanza de relámpagos» (Ezequiel 1:14).`) +
      `<p>Fuente: Bohr, <i>Los siete sellos</i> 1:22-26; Bohr, <i>El santuario en Apocalipsis</i>, p. 4; CS 467.</p>` },

    { t: '🧭 Apocalipsis 4-5 y Daniel 7', capa: 'contexto', h:
      hi(`Daniel 7:9-14 también muestra el trono de Dios, tronos, millones de
      seres celestiales y al Hijo de Dios que llega. ¿Es la misma escena?<br><br>
      <strong>No:</strong> son <strong>los mismos personajes en dos momentos
      distintos</strong>.`) +
      tbl(['', 'Apocalipsis 4-5', 'Daniel 7'], [
        ['Cuándo', 'Cuando Jesús ascendió', '1844, al final de los 2.300 días'],
        ['Dónde', 'Lugar santo', 'Lugar santísimo'],
        ['Los tronos', 'Ya están allí', 'Son puestos; el trono tiene ruedas y se mueve'],
        ['Los libros', 'Uno solo, sellado', 'Varios, que se abren'],
        ['Jesús llega como', 'Cordero inmolado', 'Hijo del Hombre'],
        ['Para qué', 'Ser investido sacerdote y rey de la gracia', 'Comenzar el juicio'],
      ]) +
      hi(`Por eso las escenas se parecen tanto: los que recibieron a Jesús en el
      lugar santo se movieron con el Padre y el Hijo al lugar santísimo en 1844.
      Apocalipsis añade lo que Daniel no dice: que los tronos eran
      <strong>24</strong> y que en ellos se sentaban <strong>los
      ancianos</strong>.`) +
      `<p>Fuente: Bohr, <i>Los siete sellos</i> 1:33-34 y 110-116.</p>` },

    { t: '🧭 ¿Quiénes son los 24 ancianos? (4:4)', capa: 'contexto', h:
      hi(`No todos los adventistas leen igual este punto.<br><br>
      Los ancianos serían <strong>ángeles de alto rango</strong>: los «hijos de
      Dios» que, según Job 1 y 2, se reúnen en concilio delante de Dios. Cada
      uno representaría a un <strong>mundo que nunca pecó</strong>. Adán era el
      representante de la tierra, pero Satanás le quitó ese puesto; por eso
      llegaba a esas reuniones «entre» los hijos de Dios.<br><br>
      Las razones principales:<br>
      · Ya estaban en el cielo <strong>antes</strong> de que Jesús llegara con
      los ángeles.<br>
      · Un anciano le pregunta a Juan quiénes son los de la gran multitud
      (7:13): no es parte de ella. Al que habla con Juan allí se le llama
      «ángel».<br>
      · Son distintos de los 144.000, que cantan delante de los ancianos
      (14:3).<br>
      · Los ángeles más excelsos se ocupan de las oraciones, y los ancianos
      llevan las oraciones de los santos (5:8).<br>
      · Hay un problema de traducción en 5:9-10 (lo verás en el capítulo
      5).<br><br>
      <strong>Otra lectura</strong>, la tradicional, los ve como santos que
      <strong>resucitaron con Jesús</strong> (Mateo 27:52-53) y subieron con
      él: santos glorificados.`) +
      `<p>Fuente: Bohr, <i>Los siete sellos</i> 1:47-57 y 79-81; Treiyer, <i>La crisis final en Apocalipsis 4 y 5</i>, p. 103; Smith, <i>Las profecías del Apocalipsis</i>, p. 45; Escuela Sabática 2019-1T, p. 29.</p>` },

    { t: '🧭 Los seres vivientes y el canto al Creador (4:6-11)', capa: 'contexto', h:
      hi(`· <strong>Quiénes son:</strong> son <strong>serafines</strong>,
      porque como en Isaías 6 tienen seis alas y dicen «Santo, santo, santo».
      Ezequiel 1 y 10 describen a los <strong>querubines</strong> de forma
      parecida; otra lectura los ve como querubines, los que cubrían el arca y
      dirigen la adoración.<br>
      · <strong>Los ojos</strong> simbolizan <strong>sabiduría</strong>: cumplen
      su tarea con inteligencia.<br>
      · <strong>El canto de 4:11</strong> honra a Dios como Creador. La
      creación fue obra del Padre y del Hijo: el Padre fue el arquitecto, y
      Jesús, el albañil.<br><br>
      <strong>Aplicación:</strong> este canto muestra que Dios merece adoración
      <strong>porque es el Creador</strong>. Se une con Apocalipsis 14, que
      llama a adorar «a aquel que hizo el cielo y la tierra», y con el
      <strong>sábado</strong> del cuarto mandamiento, que recuerda la
      creación.`) +
      `<p>Fuente: Bohr, <i>Los siete sellos</i> 1:27-28; CS 488-491.</p>` },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      hi(`La Biblia misma dice qué significan sus símbolos. Antes de dar una
      interpretación, busca el texto que los explica.`) +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Siete lámparas de fuego', 'El Espíritu Santo en su plenitud (siete es plenitud)', 'Apocalipsis 4:5: son «los siete espíritus de Dios»; el siete: Génesis 2:2'],
        ['Ojos', 'Sabiduría, inteligencia', 'Efesios 1:18; Apocalipsis 2:18'],
        ['Ropas blancas', 'La justicia, la pureza', 'Apocalipsis 19:8: «El lino fino representa las acciones justas de los santos»; Isaías 61:10'],
        ['Corona (stéfanos)', 'La victoria del que vence', 'Santiago 1:12'],
        ['Relámpagos', 'La rapidez de los ángeles', 'Ezequiel 1:13-14'],
        ['Seres de seis alas', 'Serafines (otra lectura: querubines)', 'Isaías 6:2-3; Ezequiel 10:20'],
        ['Arco iris', 'La fidelidad de Dios a sus promesas', 'Génesis 9:13-16'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:104-106; Bohr, <i>Los siete sellos</i> 1:24-28 y 171; Escuela Sabática 2019-1T, p. 28-29.</p>` },
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
    { t: 'mc', v: '4:1', f: 'c',
      q: '¿Qué momento muestra la escena de Apocalipsis 4 y 5?',
      o: ['La llegada de Jesús al cielo tras su ascensión', 'El comienzo del juicio investigador en 1844', 'El rapto secreto de la iglesia antes del fin', 'La coronación de Cristo después del milenio'], a: 0,
      e: 'Con el método historicista, es la llegada de Jesús al Padre cuando ascendió; desde allí empiezan los sellos. Otra lectura ve el juicio de 1844, y la futurista, un rapto. Fuente: Bohr, <i>Los siete sellos</i> 1:4 y 108-109.' },
    { t: 'tf', v: '4:1', f: 'c',
      q: 'Apocalipsis 4:1 describe el rapto de la iglesia antes de la gran tribulación.', a: false,
      e: 'Falso: esa es la lectura futurista. La escena es la llegada de Jesús al cielo después de su ascensión. Fuente: Bohr, <i>Los siete sellos</i> 1:3-4.' },
    { t: 'tf', v: '4:2', f: 'c',
      q: 'En el capítulo 4 Jesús todavía no aparece en la escena, porque viene en camino desde la tierra con los ángeles.', a: true,
      e: 'Verdadero: en el capítulo 4 el Padre está en el trono y Jesús llega con la hueste de ángeles en el capítulo 5. Fuente: Bohr, <i>Los siete sellos</i> 1:28-29 y 116.' },
    { t: 'mc', v: '4:5', f: 'c',
      q: '¿En qué parte del santuario celestial ocurre la escena de Apocalipsis 4?',
      o: ['En el lugar santo', 'En el lugar santísimo', 'En el atrio de afuera', 'Junto al altar de bronce'], a: 0,
      e: 'Las siete lámparas son el candelabro, que estaba en el lugar santo: Juan vio «el primer departamento del santuario en el cielo» (CS 467). Otra lectura la ubica en el santísimo. Fuente: Bohr, <i>Los siete sellos</i> 1:23-25; CS 467.' },
    { t: 'mc', v: '4:5', f: 'c',
      q: '¿Qué palabra griega une las siete lámparas de 4:5 con el candelabro del santuario?',
      o: ['Lampades', 'Menorá', 'Stéfanos', 'Biblíon'], a: 0,
      e: '«Lámparas» traduce lampades, la palabra que usa la Septuaginta (la traducción griega del Antiguo Testamento) para el candelabro de siete brazos. Fuente: Bohr, <i>Los siete sellos</i> 1:24.' },
    { t: 'mc', v: '4:5', f: 'c',
      q: '¿Qué representan los relámpagos que salían del trono?',
      o: ['La rapidez con que los ángeles hacen su obra', 'La ira de Dios que cae sobre los impíos', 'El anuncio de las siete trompetas futuras', 'Las voces de los mártires que piden justicia'], a: 0,
      e: 'Los ángeles van y vuelven «a semejanza de relámpagos» (Ezequiel 1:14). Fuente: Bohr, <i>Los siete sellos</i> 1:26.' },
    { t: 'mc', v: '4:2-6', f: 'c',
      q: '¿En qué se diferencia la escena de Apocalipsis 4-5 de la de Daniel 7?',
      o: ['Son los mismos personajes en dos momentos distintos', 'Son la misma escena del juicio contada dos veces', 'Daniel ve la tierra nueva y Juan ve el milenio', 'Daniel ve a Babilonia y Juan ve a la iglesia'], a: 0,
      e: 'Apocalipsis 4-5 es la llegada de Jesús al lugar santo; Daniel 7, el paso del Padre y del Hijo al lugar santísimo en 1844 para el juicio. Fuente: Bohr, <i>Los siete sellos</i> 1:114-116.' },
    { t: 'mc', v: '4:4', f: 'c',
      q: '¿Quiénes son los veinticuatro ancianos?',
      o: ['Ángeles de alto rango que representan mundos sin pecado', 'Santos que resucitaron con Jesús y subieron con él', 'Los doce patriarcas y los doce apóstoles juntos', 'Los jefes de los turnos de sacerdotes del templo'], a: 0,
      e: 'Son los «hijos de Dios» de Job 1 y 2, representantes de mundos que no pecaron. Otra lectura, la tradicional, los ve como los santos que resucitaron con Jesús (Mateo 27:52-53). Fuente: Bohr, <i>Los siete sellos</i> 1:47-57 y 79-81; Smith, <i>Las profecías del Apocalipsis</i>, p. 45.' },
    { t: 'tf', v: '4:4', f: 'c',
      q: 'Los veinticuatro ancianos forman parte de la gran multitud de redimidos de Apocalipsis 7.', a: false,
      e: 'Falso: no lo son, porque uno de los ancianos le pregunta a Juan quiénes son los de la gran multitud (7:13). Fuente: Bohr, <i>Los siete sellos</i> 1:80.' },
    { t: 'mc', v: '4:4', f: 'c',
      q: '¿Qué pasaje muestra a los «hijos de Dios» reunidos delante de Dios, con Satanás entre ellos?',
      o: ['Job 1 y 2', 'Génesis 6', 'Isaías 6', 'Ezequiel 1'], a: 0,
      e: 'Job 1:6 y 2:1 muestran reuniones del concilio del cielo; Satanás llegaba como si representara a la tierra, porque le había quitado ese lugar a Adán. En Génesis 6, en cambio, los «hijos de Dios» son los descendientes de Set. Fuente: Bohr, <i>Los siete sellos</i> 1:48-51.' },
    { t: 'mc', v: '4:4', f: 'c',
      q: 'En otra lectura adventista, ¿qué podría representar el número 24 de los ancianos?',
      o: ['Todo el pueblo de Dios: dos grupos de doce', 'Las veinticuatro horas del día y la noche', 'Los veinticuatro libros de la Biblia hebrea', 'Los veinticuatro reyes de Israel y de Judá'], a: 0,
      e: 'En esa lectura, el 12 es número del pueblo de Dios y los ancianos serían santos glorificados, quizá los que resucitaron con Jesús. Aquí se los ve, en cambio, como ángeles de alto rango. Fuente: Escuela Sabática 2019-1T, p. 29.' },
    { t: 'mc', v: '4:6-8', f: 'c',
      q: '¿Con qué seres de Isaías 6 se identifican los cuatro seres vivientes?',
      o: ['Con los serafines', 'Con los ancianos de Israel', 'Con los ángeles destructores', 'Con los profetas del templo'], a: 0,
      e: 'Como los serafines de Isaías 6, tienen seis alas y dicen «Santo, santo, santo». Ezequiel describe a los querubines de forma parecida; otra lectura los ve como querubines. Fuente: Bohr, <i>Los siete sellos</i> 1:27-28.' },
    { t: 'mc', v: '4:6', f: 'c',
      q: '¿Qué simbolizan los muchos ojos de los seres vivientes?',
      o: ['La sabiduría con que cumplen su tarea', 'Las estrellas que adornan todo el cielo', 'Los pecados que Dios ve en la tierra', 'Las siete iglesias que vigilan el mundo'], a: 0,
      e: 'Los ojos son símbolo de sabiduría o inteligencia: los seres vivientes cumplen su tarea con máxima sabiduría. Fuente: Bohr, <i>Los siete sellos</i> 1:27.' },
    { t: 'mc', v: '4:11', f: 'c',
      q: '¿Cómo participaron el Padre y el Hijo en la creación que se alaba en 4:11?',
      o: ['El Padre hizo el plan y el Hijo lo realizó', 'El Padre creó todo solo, sin el Hijo', 'El Hijo creó todo solo, sin el Padre', 'Ninguno: la obra fue de los ángeles'], a: 0,
      e: 'El Padre fue el arquitecto, y Jesús, el albañil (Juan 1:3). Fuente: Bohr, <i>Los siete sellos</i> 1:28.' },
    { t: 'tf', v: '4:11', f: 'c',
      q: 'El canto de 4:11 muestra que Dios merece adoración porque es el Creador, y el sábado recuerda esa razón.', a: true,
      e: 'Verdadero: 4:11 se une con el llamado de Apocalipsis 14 a adorar al Creador y con el cuarto mandamiento. Fuente: CS 488-491.' },
    { t: 'mc', v: '4:4', f: 'c',
      q: '¿Qué texto del mismo Apocalipsis explica que el vestido blanco representa la justicia?',
      o: ['Apocalipsis 19:8', 'Apocalipsis 17:15', 'Apocalipsis 1:20', 'Apocalipsis 12:17'], a: 0,
      e: 'Dice: «El lino fino representa las acciones justas de los santos». La vestimenta es símbolo de justicia (Isaías 61:10). Fuente: Bohr, <i>15 principios</i> 2:105.' },
    { t: 'mc', v: '4:6-7', f: 'c',
      q: '¿Qué texto llama «querubines» a los seres vivientes que vio Ezequiel junto al trono?',
      o: ['Ezequiel 10:20', 'Isaías 6:2', 'Daniel 7:10', 'Salmo 103:20'], a: 0,
      e: 'Ezequiel vio seres con cara de hombre, león, buey y águila, y dice que eran querubines. Aquí se los llama serafines, por Isaías 6. Fuente: Bohr, <i>Los siete sellos</i> 1:27-28.' },
    { t: 'tf', v: '4:3', f: 'c',
      q: 'El arco iris alrededor del trono señala la fidelidad de Dios a sus promesas, como en Génesis 9.', a: true,
      e: 'Verdadero: Génesis 9:13-16 e Isaías 54:9-10. Fuente: Escuela Sabática 2019-1T, p. 28.' },
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
