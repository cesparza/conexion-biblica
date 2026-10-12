/* Apocalipsis 22 — El río y el árbol de la vida; las últimas palabras del libro.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap22', label: 'Apocalipsis 22', sub: 'El río y el árbol de la vida', vs: 21,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`En la ciudad de Dios corre un <strong>río de agua de vida</strong>,
      limpio como cristal, que sale del trono de Dios y del Cordero (22:1). A
      los lados está <strong>el árbol de la vida</strong>, que da <strong>doce
      frutos</strong>, uno cada mes (22:2).<br><br>
      Allí los hijos de Dios <strong>verán su rostro</strong> (22:4), y no habrá
      noche (22:5).<br><br>
      Jesús dice tres veces que viene pronto, y el libro termina con una
      oración: <strong>«¡Ven, Señor Jesús!»</strong> (22:20).<br><br>
      <em>La idea del capítulo: Jesús viene pronto, y nos invita a todos:
      «¡Ven!».</em>`) },

    { t: '🌊 El río y el árbol de la vida (22:1-2)', capa: 'nucleo', h:
      tbl(['Qué', 'Cómo era'], [
        ['El río', 'Limpio, <strong>de agua de vida</strong>, resplandeciente como <strong>cristal</strong> (22:1)'],
        ['De dónde sale', 'Del <strong>trono de Dios y del Cordero</strong> (22:1)'],
        ['Dónde está el árbol', 'En medio de la calle y <strong>a uno y otro lado del río</strong> (22:2)'],
        ['Frutos', '<strong>Doce frutos</strong>, dando <strong>cada mes</strong> su fruto (22:2)'],
        ['Hojas', '<strong>«para la sanidad de las naciones»</strong> (22:2)'],
      ]) +
      wa(`El árbol de la vida ya se le prometió al vencedor de Éfeso (2:7). En
      22:14 vuelve: los que lavan sus ropas tienen derecho a él.`) },

    { t: '👀 Verán su rostro (22:3-5)', capa: 'nucleo', h:
      li([`<strong>«Y no habrá más maldición»</strong> (22:3).`,
          `El <strong>trono de Dios y del Cordero</strong> estará en ella, y sus
           siervos lo servirán (22:3).`,
          `<strong>«verán su rostro y su nombre estará en sus frentes»</strong> (22:4).`,
          `No habrá más noche; no necesitan <strong>luz de lámpara ni luz del
           sol</strong>, porque Dios el Señor los iluminará (22:5).`,
          `Y <strong>«reinarán por los siglos de los siglos»</strong> (22:5).`]) +
      wa(`En 20:4-6 reinan con Cristo <strong>mil años</strong>; en 22:5 reinan
      <strong>por los siglos de los siglos</strong>.`) },

    { t: '📖 Juan quiere adorar al ángel (22:6-9)', capa: 'nucleo', h:
      li([`<strong>«Estas palabras son fieles y verdaderas»</strong> (22:6).`,
          `Dios envió su ángel para mostrar <strong>«las cosas que deben suceder
           pronto»</strong> (22:6), como en 1:1.`,
          `<strong>«¡Vengo pronto! Bienaventurado el que guarda las palabras de la
           profecía de este libro»</strong> (22:7).`,
          `Juan se postró a los pies del ángel para adorarlo (22:8).`,
          `El ángel le dijo: <strong>«¡Mira, no lo hagas!»</strong> (22:9); él
           es <strong>consiervo</strong> de Juan. <strong>«¡Adora a
           Dios!»</strong> (22:9).`]) +
      wa(`Juan ya había querido adorar a un ángel en 19:10, y recibió la misma
      respuesta. Solo Dios recibe adoración.`) },

    { t: '🔓 No selles el libro (22:10-11)', capa: 'nucleo', h:
      hi(`<strong>«No selles las palabras de la profecía de este libro, porque el
      tiempo está cerca»</strong> (22:10).<br><br>
      Y luego (22:11): el injusto sea injusto todavía, el impuro sea impuro
      todavía, <strong>el justo practique la justicia todavía</strong> y
      <strong>el santo santifíquese más todavía</strong>.`) +
      wa(`Contraste con Daniel: a Daniel se le dijo que <strong>sellara</strong>
      el libro hasta el tiempo del fin (Daniel 12:4). A Juan se le dice
      <strong>«No selles»</strong>, porque el tiempo está cerca.`) },

    { t: '🎁 El galardón y los de afuera (22:12-15)', capa: 'nucleo', h:
      li([`<strong>«¡Vengo pronto!, y mi galardón conmigo»</strong> (22:12), para
           recompensar a cada uno según sea su obra.`,
          `<strong>«Yo soy el Alfa y la Omega, el principio y el fin, el primero
           y el último»</strong> (22:13).`,
          `<strong>«Bienaventurados los que lavan sus ropas»</strong> (22:14),
           para tener derecho al árbol de la vida y entrar por las puertas.`]) +
      tbl(['Los que estarán afuera (22:15)'], [
        ['Los perros'], ['Los hechiceros'], ['Los fornicarios'], ['Los homicidas'],
        ['Los idólatras'], ['Todo aquel que ama y practica la mentira'],
      ]) },

    { t: '⭐ «¡Ven!» (22:16-17)', capa: 'nucleo', h:
      hi(`<strong>«Yo, Jesús, he enviado mi ángel»</strong> (22:16) para dar
      testimonio en las iglesias. Jesús se presenta como <strong>«la raíz y el
      linaje de David, la estrella resplandeciente de la mañana»</strong>
      (22:16).<br><br>
      La gran invitación (22:17):`) +
      li([`<strong>El Espíritu y la Esposa</strong> dicen: «¡Ven!»`,
          `El que oye, diga: «¡Ven!»`,
          `El que tiene sed, venga.`,
          `<strong>«El que quiera, tome gratuitamente del agua de la
           vida»</strong> (22:17).`]) },

    { t: '⚠️ No añadir ni quitar (22:18-19)', capa: 'nucleo', h:
      tbl(['Si alguno…', 'Dios…'], [
        ['<strong>Añade</strong> a estas cosas (22:18)', 'Traerá sobre él <strong>las plagas</strong> escritas en este libro'],
        ['<strong>Quita</strong> de las palabras del libro (22:19)', 'Quitará su parte <strong>del libro de la vida</strong>, de la santa ciudad y de lo escrito en el libro'],
      ]) +
      wa(`No se cruzan: al que <strong>añade</strong>, se le <strong>añaden
      plagas</strong>; al que <strong>quita</strong>, se le <strong>quita su
      parte</strong>.`) },

    { t: '🙏 Las últimas palabras (22:20-21)', capa: 'nucleo', h:
      hi(`<strong>«Ciertamente vengo en breve.» ¡Amén! ¡Ven, Señor Jesús!</strong>
      (22:20).<br><br>
      <strong>«La gracia de nuestro Señor Jesucristo sea con todos vosotros.
      Amén»</strong> (22:21).`) +
      tbl(['Versículo', 'Jesús dice que viene'], [
        ['22:7', '«¡Vengo pronto!»'],
        ['22:12', '«¡Vengo pronto!, y mi galardón conmigo»'],
        ['22:20', '«Ciertamente vengo en breve»'],
      ]) +
      wa(`Las dos últimas bienaventuranzas del libro están aquí: la de
      <strong>22:7</strong> (el que guarda las palabras) y la de
      <strong>22:14</strong> (los que lavan sus ropas). La primera era
      1:3.`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · El árbol de la vida que se perdió en el Edén (Génesis 3:22-24) vuelve
      en la tierra nueva: <strong>Dios recupera lo que el pecado
      quitó</strong>.<br>
      · 22:11 se lee como el <strong>cierre de la gracia</strong>: antes de que
      Jesús vuelva, cada uno ya habrá decidido de qué lado está, y ya no hay
      cambio de bando.<br>
      · Lavar las ropas (22:14) es ser limpiado por la sangre del Cordero
      (como en 7:14) y vivir en obediencia a Dios.<br>
      · Las promesas «Vengo pronto» sostienen la esperanza de la
      <strong>segunda venida</strong>, que da su nombre a la iglesia
      adventista.`) },
  ],

  preguntas: [
    { t: 'mc', v: '22:1', lit: 'un río limpio, de agua de vida, resplandeciente como cristal',
      q: '¿Qué le mostró el ángel a Juan al comenzar Apocalipsis 22?',
      o: ['Un río limpio, de agua de vida', 'Un mar de vidrio mezclado con fuego', 'Una fuente de aguas amargas', 'Un lago de fuego y azufre'], a: 0,
      e: '«Después me mostró un río limpio, de agua de vida, resplandeciente como cristal» (22:1).' },
    { t: 'mc', v: '22:1', lit: 'que fluía del trono de Dios y del Cordero',
      q: '¿De dónde fluía el río de agua de vida? (Apocalipsis 22:1)',
      o: ['Del trono de Dios y del Cordero', 'Del monte de Sion, hacia el oriente', 'Del templo, debajo del altar', 'De la peña que golpeó Moisés'], a: 0,
      e: '«…que fluía del trono de Dios y del Cordero» (22:1).' },
    { t: 'mc', v: '22:2', lit: 'que produce doce frutos, dando cada mes su fruto',
      q: '¿Cuántos frutos produce el árbol de la vida? (Apocalipsis 22:2)',
      o: ['Doce, uno cada mes', 'Siete, uno cada día', 'Doce, todos a la vez', 'Uno, una vez al año'], a: 0,
      e: '«…el árbol de la vida, que produce doce frutos, dando cada mes su fruto» (22:2).' },
    { t: 'mc', v: '22:2', lit: 'para la sanidad de las naciones',
      q: 'Según Apocalipsis 22:2, ¿para qué eran las hojas del árbol?',
      o: ['Para la sanidad de las naciones', 'Para dar sombra a los redimidos', 'Para cubrir el trono de Dios', 'Para alimentar a los ángeles'], a: 0,
      e: '«…y las hojas del árbol eran para la sanidad de las naciones» (22:2).' },
    { t: 'tf', v: '22:2',
      q: 'El árbol de la vida estaba a uno y otro lado del río. (Apocalipsis 22:2)', a: true,
      e: 'Verdadero: «En medio de la calle de la ciudad y a uno y otro lado del río estaba el árbol de la vida» (22:2).' },
    { t: 'mc', v: '22:3', lit: 'no habrá más maldición',
      q: '¿Qué texto dice «Y no habrá más maldición»?',
      o: ['Apocalipsis 22:3', 'Apocalipsis 21:4', 'Apocalipsis 22:5', 'Apocalipsis 21:25'], a: 0,
      e: 'Apocalipsis 22:3. En 21:4 lo que ya no habrá es muerte, llanto, clamor ni dolor.' },
    { t: 'mc', v: '22:4', lit: 'verán su rostro y su nombre estará en sus frentes',
      q: 'Según Apocalipsis 22:4, ¿qué tendrán los siervos de Dios en sus frentes?',
      o: ['Su nombre', 'Una corona', 'Una marca de fuego', 'Una piedrecita blanca'], a: 0,
      e: '«…verán su rostro y su nombre estará en sus frentes» (22:4). La piedrecita blanca es la promesa de 2:17.' },
    { t: 'fill', v: '22:4', ins: 'Apocalipsis 22:4 (RV1995) — Completa:',
      p: [{ x: '«verán su ' }, { b: 'rostro', h: '¿qué verán?' }, { x: ' y su nombre estará en sus ' }, { b: 'frentes', h: '¿dónde estará su nombre?' }, { x: '.»' }] },
    { t: 'tf', v: '22:5',
      q: 'En la ciudad de Dios necesitan luz de lámpara durante la noche. (Apocalipsis 22:5)', a: false,
      e: 'Falso: «Allí no habrá más noche; y no tienen necesidad de luz de lámpara ni de luz del sol» (22:5).' },
    { t: 'mc', v: '22:5', lit: 'reinarán por los siglos de los siglos',
      q: 'Según Apocalipsis 22:5, ¿por cuánto tiempo reinarán los siervos de Dios?',
      o: ['Por los siglos de los siglos', 'Por mil años', 'Por siete tiempos', 'Por mil doscientos sesenta días'], a: 0,
      e: '«…porque Dios el Señor los iluminará y reinarán por los siglos de los siglos» (22:5). Los mil años son de 20:4-6.' },
    { t: 'mc', v: '22:6', lit: 'las cosas que deben suceder pronto',
      q: 'Según Apocalipsis 22:6, ¿para qué envió el Señor su ángel?',
      o: ['Para mostrar a sus siervos las cosas que deben suceder pronto', 'Para medir el templo de Dios, el altar y a los adoradores', 'Para sellar a los siervos de Dios en sus frentes', 'Para atar al dragón en el abismo por mil años'], a: 0,
      e: '«…ha enviado su ángel para mostrar a sus siervos las cosas que deben suceder pronto» (22:6). Es casi la misma frase de 1:1.' },
    { t: 'tf', v: '22:6',
      q: 'En Apocalipsis 22:6 se dice: «Estas palabras son fieles y verdaderas».', a: true,
      e: 'Verdadero (Apocalipsis 22:6). La misma frase está en 21:5.' },
    { t: 'mc', v: '22:7', lit: 'Bienaventurado el que guarda las palabras de la profecía de este libro',
      q: 'Según Apocalipsis 22:7, ¿quién es bienaventurado?',
      o: ['El que guarda las palabras de la profecía de este libro', 'El que vela y guarda sus vestiduras para no andar desnudo', 'El que es llamado a la cena de las bodas del Cordero', 'El que muere en el Señor de aquí en adelante'], a: 0,
      e: '«¡Vengo pronto! Bienaventurado el que guarda las palabras de la profecía de este libro» (22:7). Las otras son de 16:15, 19:9 y 14:13.' },
    { t: 'mc', v: '22:8', lit: 'me postré a los pies del ángel',
      q: '¿Qué hizo Juan después de oír y ver estas cosas? (Apocalipsis 22:8)',
      o: ['Se postró a los pies del ángel para adorarlo', 'Comió el librito que el ángel le dio', 'Midió el templo con una caña de oro', 'Escribió una carta a cada iglesia'], a: 0,
      e: '«…me postré a los pies del ángel que me mostraba estas cosas, para adorarlo» (22:8).' },
    { t: 'mc', v: '22:9', lit: '¡Adora a Dios!',
      q: '¿Qué le dijo el ángel a Juan cuando quiso adorarlo? (Apocalipsis 22:9)',
      o: ['«¡Mira, no lo hagas!… ¡Adora a Dios!»', '«Toma y cómelo; te amargará el vientre»', '«Levántate y mide el templo de Dios»', '«Sube acá y yo te mostraré las cosas»'], a: 0,
      e: '«¡Mira, no lo hagas!, pues yo soy consiervo tuyo… ¡Adora a Dios!» (22:9). Igual que en 19:10. «Toma y cómelo» es de 10:9; «Levántate y mide el templo» de 11:1; «Sube acá» de 4:1.' },
    { t: 'tf', v: '22:9',
      q: 'El ángel dijo que era consiervo de Juan, de sus hermanos los profetas y de los que guardan las palabras del libro. (Apocalipsis 22:9)', a: true,
      e: 'Verdadero (Apocalipsis 22:9).' },
    { t: 'mc', v: '22:10', lit: 'No selles las palabras de la profecía de este libro',
      q: '¿Qué le ordenó el ángel a Juan sobre el libro en Apocalipsis 22:10?',
      o: ['Que no sellara las palabras de la profecía', 'Que sellara el libro hasta el tiempo del fin', 'Que se comiera el librito abierto', 'Que lo enviara solo a la iglesia de Éfeso'], a: 0,
      e: '«No selles las palabras de la profecía de este libro, porque el tiempo está cerca» (22:10). A Daniel, en cambio, se le dijo que sellara el libro (Daniel 12:4).' },
    { t: 'fill', v: '22:10', ins: 'Apocalipsis 22:10 (RV1995) — Completa:',
      p: [{ x: '«No ' }, { b: 'selles', h: '¿qué no debe hacer?' }, { x: ' las palabras de la profecía de este libro, porque el tiempo está ' }, { b: 'cerca', h: '¿cómo está el tiempo?' }, { x: '.»' }] },
    { t: 'mc', v: '22:11', lit: 'el que es santo, santifíquese más todavía',
      q: 'Según Apocalipsis 22:11, ¿qué debe hacer el que es santo?',
      o: ['Santificarse más todavía', 'Esperar en silencio', 'Ir a predicar a las naciones', 'Volver a lavar sus ropas'], a: 0,
      e: '«…el que es justo, practique la justicia todavía, y el que es santo, santifíquese más todavía» (22:11).' },
    { t: 'mc', v: '22:12', lit: 'mi galardón conmigo',
      q: '¿Qué trae Jesús consigo cuando viene, según Apocalipsis 22:12?',
      o: ['Su galardón, para recompensar a cada uno', 'Una hoz aguda, para segar la tierra', 'Las siete copas de la ira de Dios', 'Un libro sellado con siete sellos'], a: 0,
      e: '«¡Vengo pronto!, y mi galardón conmigo, para recompensar a cada uno según sea su obra» (22:12).' },
    { t: 'tf', v: '22:12',
      q: 'Según Apocalipsis 22:12, Jesús recompensará a cada uno según sea su fe.', a: false,
      e: 'Falso: dice «según sea su OBRA» (22:12).' },
    { t: 'mc', v: '22:13', lit: 'Yo soy el Alfa y la Omega, el principio y el fin, el primero y el último',
      q: '¿Qué texto dice «Yo soy el Alfa y la Omega, el principio y el fin, el primero y el último»?',
      o: ['Apocalipsis 22:13', 'Apocalipsis 22:16', 'Apocalipsis 21:6', 'Apocalipsis 22:12'], a: 0,
      e: 'Apocalipsis 22:13. En 21:6 dice «el principio y el fin», sin «el primero y el último».' },
    { t: 'mc', v: '22:14', lit: 'Bienaventurados los que lavan sus ropas',
      q: 'Según Apocalipsis 22:14, ¿quiénes tienen derecho al árbol de la vida?',
      o: ['Los que lavan sus ropas', 'Los que tienen siete estrellas', 'Los que miden el templo', 'Los que traen ofrendas'], a: 0,
      e: '«Bienaventurados los que lavan sus ropas para tener derecho al árbol de la vida y para entrar por las puertas en la ciudad» (22:14).' },
    { t: 'fill', v: '22:14', ins: 'Apocalipsis 22:14 (RV1995) — Completa:',
      p: [{ x: '«Bienaventurados los que lavan sus ' }, { b: 'ropas', h: '¿qué lavan?' }, { x: ' para tener derecho al ' }, { b: 'árbol', h: '¿derecho a qué?' }, { x: ' de la vida»' }] },
    { t: 'mc', v: '22:15', lit: 'los perros estarán afuera',
      q: '¿Cuál de estos aparece en la lista de los que estarán afuera, en Apocalipsis 22:15?',
      o: ['Los perros', 'Los cobardes', 'Los pobres', 'Los incrédulos'], a: 0,
      e: '«Pero los perros estarán afuera, y los hechiceros, los fornicarios, los homicidas, los idólatras…» (22:15). Los cobardes e incrédulos son de la lista de 21:8.' },
    { t: 'tf', v: '22:15',
      q: 'Según Apocalipsis 22:15, todo aquel que ama y practica la mentira estará afuera.', a: true,
      e: 'Verdadero (Apocalipsis 22:15).' },
    { t: 'mc', v: '22:16', lit: 'la raíz y el linaje de David, la estrella resplandeciente de la mañana',
      q: '¿Cómo se presenta Jesús en Apocalipsis 22:16?',
      o: ['La raíz y el linaje de David, la estrella resplandeciente de la mañana', 'El León de la tribu de Judá, que ha vencido para abrir el libro', 'El testigo fiel, el primogénito de los muertos y el soberano', 'El que tiene la llave de David, que abre y ninguno cierra'], a: 0,
      e: '«Yo soy la raíz y el linaje de David, la estrella resplandeciente de la mañana» (22:16). El León de Judá es de 5:5.' },
    { t: 'mc', v: '22:16', lit: 'Yo, Jesús, he enviado mi ángel',
      q: '¿Qué texto dice «Yo, Jesús, he enviado mi ángel para daros testimonio de estas cosas en las iglesias»?',
      o: ['Apocalipsis 22:16', 'Apocalipsis 22:6', 'Apocalipsis 1:1', 'Apocalipsis 22:20'], a: 0,
      e: 'Apocalipsis 22:16. En 22:6 el ángel lo envía «el Señor, el Dios de los espíritus de los profetas».' },
    { t: 'mc', v: '22:17', lit: 'El Espíritu y la Esposa dicen',
      q: 'Según Apocalipsis 22:17, ¿quiénes dicen «¡Ven!»?',
      o: ['El Espíritu y la Esposa', 'Los ángeles y los ancianos', 'Juan y los profetas', 'Las siete iglesias'], a: 0,
      e: '«El Espíritu y la Esposa dicen: “¡Ven!” El que oye, diga: “¡Ven!”» (22:17).' },
    { t: 'tf', v: '22:17',
      q: 'Según Apocalipsis 22:17, el que quiera puede tomar el agua de la vida pagando su precio.', a: false,
      e: 'Falso: «El que quiera, tome GRATUITAMENTE del agua de la vida» (22:17).' },
    { t: 'mc', v: '22:18', lit: 'Dios traerá sobre él las plagas que están escritas en este libro',
      q: 'Según Apocalipsis 22:18, ¿qué hará Dios con el que añade a las palabras del libro?',
      o: ['Traerá sobre él las plagas escritas en este libro', 'Quitará su parte del libro de la vida', 'Borrará su nombre del muro de la ciudad', 'Lo dejará fuera de las doce puertas'], a: 0,
      e: '«Si alguno añade a estas cosas, Dios traerá sobre él las plagas que están escritas en este libro» (22:18). Quitar su parte es para el que QUITA (22:19).' },
    { t: 'mc', v: '22:19', lit: 'Dios quitará su parte del libro de la vida',
      q: 'Según Apocalipsis 22:19, ¿qué hará Dios con el que quita de las palabras del libro?',
      o: ['Quitará su parte del libro de la vida y de la santa ciudad', 'Traerá sobre él las siete plagas que están escritas', 'Lo lanzará al abismo y pondrá un sello sobre él', 'Lo dejará afuera junto con los perros y los hechiceros'], a: 0,
      e: '«…Dios quitará su parte del libro de la vida y de la santa ciudad y de las cosas que están escritas en este libro» (22:19).' },
    { t: 'mc', v: '22:20', lit: '¡Ven, Señor Jesús!',
      q: '¿Con qué oración responde Juan en Apocalipsis 22:20 a «Ciertamente vengo en breve»?',
      o: ['«¡Amén! ¡Ven, Señor Jesús!»', '«¡Aleluya! ¡Gloria a Dios!»', '«¡Santo, santo, santo!»', '«¡Hosanna al Hijo de David!»'], a: 0,
      e: '«El que da testimonio de estas cosas dice: “Ciertamente vengo en breve.” ¡Amén! ¡Ven, Señor Jesús!» (22:20).' },
    { t: 'mc', v: '22:21', lit: 'La gracia de nuestro Señor Jesucristo sea con todos vosotros',
      q: '¿Con qué palabras termina el libro del Apocalipsis? (Apocalipsis 22:21)',
      o: ['«La gracia de nuestro Señor Jesucristo sea con todos vosotros. Amén»', '«Bienaventurado el que lee y los que oyen las palabras de esta profecía»', '«He aquí que viene con las nubes, y todo ojo lo verá»', '«El que tiene oído, oiga lo que el Espíritu dice a las iglesias»'], a: 0,
      e: 'Apocalipsis 22:21. El libro empieza con «La revelación de Jesucristo» (1:1) y termina con «la gracia de nuestro Señor Jesucristo».' },
    { t: 'mc', v: '22:11', f: 'c',
      q: 'En la lectura adventista, ¿qué anuncia Apocalipsis 22:11 («el que es injusto, sea injusto todavía…»)?',
      o: ['El cierre de la gracia antes de la venida de Jesús', 'El comienzo de los mil años en la tierra', 'Que nadie puede cambiar nunca en la vida', 'El día en que Juan salió de Patmos'], a: 0,
      e: 'Interpretación: antes de que Jesús vuelva, cada uno ya habrá decidido, y ya no hay cambio de bando. El texto dice que el injusto sea injusto todavía y el santo se santifique más todavía (22:11).' },
    { t: 'mc', v: '22:14', f: 'c',
      q: 'En la interpretación adventista, ¿qué significa «lavar las ropas» en Apocalipsis 22:14?',
      o: ['Ser limpiado por la sangre del Cordero y obedecer a Dios', 'Bautizarse varias veces durante la vida', 'Usar ropa blanca para ir a la iglesia', 'Cumplir los lavamientos de la ley de Moisés'], a: 0,
      e: 'Interpretación: como en 7:14, las ropas se lavan en la sangre del Cordero, y eso se ve en una vida obediente. El texto dice «Bienaventurados los que lavan sus ropas» (22:14).' },
    { t: 'mc', v: '22:2', f: 'c',
      q: 'En la lectura adventista, ¿qué muestra que el árbol de la vida aparezca en la ciudad de Dios?',
      o: ['Que Dios devuelve lo que se perdió en el Edén', 'Que en el cielo hay que trabajar la tierra', 'Que los ángeles comen de sus frutos', 'Que el árbol nunca existió en la tierra'], a: 0,
      e: 'Interpretación: el árbol de la vida del Edén (Génesis 3:22-24) vuelve en la tierra nueva. El texto dice que está a uno y otro lado del río y da doce frutos (22:2).' },
  ],

  tarjetas: [
    { f: 'El río (22:1)', r: 'Limpio, de agua de vida, resplandeciente como cristal; fluye del trono de Dios y del Cordero' },
    { f: 'El árbol de la vida (22:2)', r: 'Doce frutos, cada mes su fruto; las hojas, para la sanidad de las naciones' },
    { f: 'Qué verán y qué tendrán en la frente (22:4)', r: 'Verán su rostro; su nombre estará en sus frentes' },
    { f: 'Por cuánto reinarán (22:5)', r: 'Por los siglos de los siglos' },
    { f: 'La respuesta del ángel cuando Juan quiso adorarlo (22:9)', r: '«¡Mira, no lo hagas!… ¡Adora a Dios!»' },
    { f: 'Qué no debía hacer Juan con el libro (22:10)', r: 'No sellarlo, porque el tiempo está cerca' },
    { f: '«Yo soy el Alfa y la Omega… el primero y el último»', r: 'Apocalipsis 22:13' },
    { f: 'Quiénes tienen derecho al árbol de la vida (22:14)', r: 'Los que lavan sus ropas' },
    { f: 'Cómo se presenta Jesús (22:16)', r: 'La raíz y el linaje de David, la estrella resplandeciente de la mañana' },
    { f: 'Quiénes dicen «¡Ven!» (22:17)', r: 'El Espíritu y la Esposa, y el que oye' },
    { f: 'Añadir y quitar (22:18-19)', r: 'Al que añade, las plagas; al que quita, Dios le quita su parte del libro de la vida' },
    { f: 'Las tres veces que dice que viene (22:7, 12, 20)', r: '«¡Vengo pronto!», «¡Vengo pronto!, y mi galardón conmigo», «Ciertamente vengo en breve»' },
    { f: 'Últimas palabras del libro (22:21)', r: '«La gracia de nuestro Señor Jesucristo sea con todos vosotros. Amén»' },
  ],
};
