/* Apocalipsis 5 — El libro sellado y el Cordero.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap5', label: 'Apocalipsis 5', sub: 'El libro sellado y el Cordero', vs: 14,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Dios tenía en su mano derecha <strong>un libro sellado con siete
      sellos</strong>. Un ángel preguntó quién podía abrirlo, y nadie
      podía. Juan <strong>lloraba mucho</strong>.<br><br>
      Un anciano le dijo: <strong>«No llores»</strong> (5:5), porque el
      <strong>León de la tribu de Judá</strong> había vencido. Juan miró y vio
      <strong>un Cordero</strong> que había sido sacrificado, pero estaba en
      pie. El Cordero tomó el libro.<br><br>
      Entonces todos lo alabaron: los seres vivientes, los ancianos,
      <strong>millones de ángeles</strong> y todo lo creado.<br><br>
      <em>La idea del capítulo: solo Jesús, el Cordero que dio su vida por
      nosotros, es digno de abrir el libro.</em>`) },

    { t: '📜 El libro sellado con siete sellos (5:1)', capa: 'nucleo', h:
      tbl(['Detalle', 'Lo que dice 5:1'], [
        ['Dónde estaba', 'En la <strong>mano derecha</strong> del que estaba sentado en el trono'],
        ['Cómo estaba escrito', '<strong>Por dentro y por fuera</strong>'],
        ['Cómo estaba cerrado', 'Sellado con <strong>siete sellos</strong>'],
      ]) +
      hi(`<strong>«Vi en la mano derecha del que estaba sentado en el trono un
      libro escrito por dentro y por fuera, sellado con siete sellos»</strong>
      (5:1).`) },

    { t: '😢 ¿Quién es digno? (5:2-4)', capa: 'nucleo', h:
      li([`Un <strong>ángel poderoso</strong> pregonaba a gran voz:
           <strong>«¿Quién es digno de abrir el libro y desatar sus
           sellos?»</strong> (5:2).`,
          `Nadie podía abrirlo <strong>ni siquiera mirarlo</strong>: ni en el
           cielo, ni en la tierra, ni debajo de la tierra (5:3).`,
          `<strong>«Y lloraba yo mucho»</strong> (5:4), dice Juan, porque no se
           hallaba a nadie digno.`]) },

    { t: '🦁 El León que es un Cordero (5:5-7)', capa: 'nucleo', h:
      hi(`Uno de los <strong>ancianos</strong> le dijo: <strong>«No llores,
      porque el León de la tribu de Judá, la raíz de David, ha vencido para
      abrir el libro»</strong> (5:5).`) +
      tbl(['Lo que Juan vio (5:6)', 'Detalle'], [
        ['Dónde', 'En medio del trono, de los cuatro seres vivientes y de los ancianos'],
        ['Quién', 'Un <strong>Cordero</strong>, en pie, <strong>como inmolado</strong>'],
        ['Cuernos', '<strong>Siete</strong>'],
        ['Ojos', '<strong>Siete</strong>, «los cuales son los siete espíritus de Dios»'],
      ]) +
      hi(`Y el Cordero <strong>«vino y tomó el libro»</strong> de la mano derecha
      del que estaba en el trono (5:7).`) +
      wa(`Juan <strong>oye</strong> «León» y <strong>ve</strong> un Cordero. El
      León vence para abrir el libro (5:5) y el que lo toma es el Cordero
      (5:7): no son dos personajes distintos.`) },

    { t: '🎵 Arpas, copas e incienso (5:8)', capa: 'nucleo', h:
      li([`Los <strong>cuatro seres vivientes</strong> y los
           <strong>veinticuatro ancianos</strong> se postraron delante del
           Cordero (5:8).`,
          `Todos tenían <strong>arpas</strong> y <strong>copas de oro llenas de
           incienso</strong> (5:8).`,
          `El incienso: <strong>«que son las oraciones de los santos»</strong>
           (5:8).`]) +
      wa(`No confundas estas copas con las <strong>siete copas</strong> de los
      capítulos 15 y 16, que están llenas de la ira de Dios. Aquí las copas de
      oro tienen <strong>incienso</strong>, que son las oraciones.`) },

    { t: '🎶 El cántico nuevo (5:9-10)', capa: 'nucleo', h:
      hi(`<strong>«Digno eres de tomar el libro y de abrir sus sellos, porque tú
      fuiste inmolado, y con tu sangre nos has redimido para Dios»</strong>
      (5:9).`) +
      tbl(['El cántico dice', 'Qué'], [
        ['De dónde redimió', 'De todo <strong>linaje, lengua, pueblo y nación</strong> (5:9)'],
        ['Qué nos hizo', 'Para nuestro Dios <strong>un reino y sacerdotes</strong> (5:10)'],
        ['Qué haremos', '<strong>«Reinaremos sobre la tierra»</strong> (5:10)'],
      ]) +
      wa(`En 4:11 Dios es digno porque <strong>creó</strong> todas las cosas. En
      5:9 el Cordero es digno porque <strong>fue inmolado</strong> y nos
      redimió con su sangre.`) },

    { t: '👼 Millones de ángeles (5:11-12)', capa: 'nucleo', h:
      hi(`Juan oyó la voz de <strong>muchos ángeles</strong> alrededor del trono.
      <strong>«Su número era millones de millones»</strong> (5:11).<br><br>
      Decían: <strong>«El Cordero que fue inmolado es digno de tomar el poder,
      las riquezas, la sabiduría, la fortaleza, la honra, la gloria y la
      alabanza»</strong> (5:12).`) +
      wa(`Daniel vio algo parecido: una multitud enorme que servía y estaba
      delante del Anciano de días (Daniel 7:10).`) },

    { t: '🌍 Todo lo creado alaba (5:13-14)', capa: 'nucleo', h:
      hi(`Todo lo creado, <strong>en el cielo, sobre la tierra, debajo de la
      tierra y en el mar</strong>, decía: <strong>«Al que está sentado en el
      trono y al Cordero, sea la alabanza, la honra, la gloria y el
      poder»</strong> (5:13).<br><br>
      Los cuatro seres vivientes decían <strong>«¡Amén!»</strong> y los
      ancianos se postraron y adoraron (5:14).`) +
      tbl(['Texto', 'A quién', 'Cuántas cosas'], [
        ['4:11', 'Al Señor (el Creador)', '<strong>3</strong>: gloria, honra, poder'],
        ['5:12', 'Al Cordero', '<strong>7</strong>: poder, riquezas, sabiduría, fortaleza, honra, gloria, alabanza'],
        ['5:13', 'Al que está en el trono y al Cordero', '<strong>4</strong>: alabanza, honra, gloria, poder'],
      ]) },

    { t: '🧭 El héroe vuelve de la batalla (5:5-7)', capa: 'contexto', h:
      hi(`Desde aquí, lo que sigue es <strong>interpretación</strong>. La guía
      principal es el pastor Stephen (Esteban) Bohr.<br><br>
      Para Bohr, el capítulo 5 muestra a Jesús <strong>llegando al cielo después
      de su ascensión</strong>, como un héroe que vuelve victorioso de la guerra
      contra Satanás. Elena de White lo describe en «El Deseado de todas las
      gentes»: Jesús muestra al Padre sus heridas, presenta a los que
      resucitaron con él y le dice que la obra de la redención está completa.
      El Padre acepta su sacrificio y los ángeles lo adoran.<br><br>
      · <strong>«Como inmolado»:</strong> las heridas estaban frescas; venía del
      campo de batalla. Está <strong>en pie</strong> porque los reyes y los
      sacerdotes estaban de pie cuando se los ungía (se los consagraba).<br>
      · <strong>Siete cuernos:</strong> rayos de gloria que salen de él, su poder
      como rey (Habacuc 3:4).<br>
      · <strong>Siete ojos:</strong> los siete espíritus, el Espíritu Santo en su
      plenitud. En el capítulo 4 estaba delante del trono; aquí es
      <strong>enviado a la tierra</strong>: es el Pentecostés.<br><br>
      Elena de White lo confirma: «El derramamiento pentecostal era la
      comunicación del Cielo de que el Redentor había iniciado su ministerio
      celestial».<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 29-31,
      33-34 y 37-38 (cita «El Deseado de todas las gentes», págs. 772-773, y
      «Los hechos de los apóstoles», págs. 31-32).`) },

    { t: '🧭 ¿Qué es el libro sellado? (5:1-4)', capa: 'contexto', h:
      hi(`<strong>La historia de fondo, según Bohr:</strong> Dios hizo a Adán rey
      de la tierra (Salmo 8). Al pecar, Adán perdió su trono y su territorio, y
      Satanás se quedó con ellos (Lucas 4:5-6).<br><br>
      En Israel, cuando alguien perdía su herencia o se vendía como esclavo,
      solo un <strong>pariente cercano</strong> podía rescatarlo pagando el
      precio (Levítico 25:25, 47-49). Ese rescatador se llamaba en hebreo
      <em>go'el</em>. Ningún ser humano podía hacerlo, porque todos pecaron. Por
      eso Jesús <strong>se hizo nuestro hermano</strong> (Hebreos 2:14).<br><br>
      <strong>El libro:</strong> los autores que cita Bohr explican que en la
      ley romana un <strong>testamento</strong> llevaba siete sellos de siete
      testigos, y no se podía abrir hasta romperlos todos. El libro sería como
      la <strong>escritura de propiedad</strong> del mundo, que Adán perdió y
      Cristo recupera.<br><br>
      Elena de White dice que contiene la historia de los actos de Dios, la
      historia profética de las naciones y de la iglesia.<br><br>
      <strong>Por qué lloraba Juan:</strong> la palabra griega es muy fuerte.
      Si nadie abría el libro, la herencia quedaba perdida para siempre.<br><br>
      Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 7-9, 35-36
      y 41-42.`) },

    { t: '🧭 El León y el Cordero: ¿cuándo se abre el libro? (5:5-7)', capa: 'contexto', h:
      hi(`Juan <strong>oye</strong> «León» y <strong>ve</strong> un Cordero.
      Para Bohr son <strong>dos etapas</strong> de la obra de Jesús:<br>
      · <strong>Cordero:</strong> ahora, mientras es sacerdote y rey del reino
      de la gracia, salva al que se arrepiente.<br>
      · <strong>León:</strong> al final, cuando termina su obra en el santuario,
      juzga y toma su reino. Por eso en 6:16 se habla de «la ira del
      Cordero».<br><br>
      Elena de White lo dice así: el León de Judá es terrible para los que
      rechazan su gracia, y es el Cordero de Dios para el obediente.<br><br>
      <strong>¿Cuándo se abre el libro?</strong> Bohr separa dos cosas: los
      sellos se <strong>rompen</strong> a lo largo de la historia (capítulos 6 y
      8:1), pero el libro se <strong>abre</strong> después del milenio, ante los
      impíos resucitados. Se apoya en Elena de White: la decisión de los
      dirigentes que eligieron a Barrabás quedó escrita en ese libro, y la verán
      cuando el León le quite el sello.<br><br>
      <strong>Otra lectura:</strong> Treiyer entiende que tomar y abrir el libro
      ocurre en el juicio investigador.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 36-37,
      43-45 y 117 (cita «Los hechos de los apóstoles», págs. 470-471, y «Palabras
      de vida del gran Maestro», pág. 236); Treiyer, «La crisis final en
      Apocalipsis 4 y 5», pág. 108.`) },

    { t: '🧭 Incienso, oraciones y el cántico nuevo (5:8-14)', capa: 'contexto', h:
      hi(`· <strong>Las copas de incienso:</strong> según Bohr, los seres
      vivientes y los ancianos cumplen una tarea de
      <strong>intercesión</strong>: llevan las oraciones de los santos a Jesús, y
      por medio de Jesús, a Dios. Recuerda la escalera de Jacob, con ángeles que
      suben y bajan.<br>
      · <strong>«Digno»</strong> quiere decir <strong>calificado</strong>: el que
      cumple los requisitos para abrir el libro.<br>
      · <strong>«Redimir»</strong> (en griego <em>agorazo</em>) es comprar algo
      pagando un precio de rescate, como quien recupera algo empeñado.<br>
      · <strong>El tema cambia:</strong> en el capítulo 4 se alaba la
      creación; en el 5, la redención.<br>
      · <strong>Los ángeles</strong> no aparecían en el capítulo 4 porque habían
      ido a la tierra a buscar a Jesús (Hechos 1:9-11), y vuelven con él.<br><br>
      <strong>¿«Nos» o «los»? (postura de Bohr):</strong> la Reina-Valera dice
      que el Cordero «nos» redimió y que «reinaremos». Bohr explica que las
      versiones modernas en inglés traducen «los», es decir, que los ancianos
      cantan sobre los redimidos y no sobre sí mismos. Por eso no ve aquí una
      prueba de que los ancianos sean humanos. Urías Smith, en cambio, usa el
      «nos» para decir que sí lo son.<br><br>
      Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 35, 39-40
      y 81-83; Urías Smith, «Las profecías del Apocalipsis», pág. 45.`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      hi(`Un mismo símbolo puede tener otro sentido en otro pasaje (un león
      puede ser Cristo o Satanás). Por eso se busca el texto que lo explica en
      su contexto.`) +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['León de la tribu de Judá', 'Cristo, el Rey que vence', 'Génesis 49:9-10; Apocalipsis 5:5'],
        ['Raíz de David', 'Cristo, origen y descendiente de David', 'Apocalipsis 22:16: «Yo soy la raíz y el linaje de David»; Mateo 1:1'],
        ['Cordero inmolado', 'Cristo, el sacrificio que paga el rescate', 'Éxodo 12:5-6; 1 Pedro 1:18-20'],
        ['Cuernos', 'Poder de rey; en Daniel, un cuerno es un rey', 'Daniel 7:24: «Los diez cuernos significan que de aquel reino se levantarán diez reyes»; Habacuc 3:4'],
        ['Siete ojos', 'El Espíritu Santo enviado a la tierra', 'Apocalipsis 5:6: «los siete espíritus de Dios enviados por toda la tierra»; Zacarías 4:10'],
        ['Copas de incienso', 'Las oraciones de los santos', 'Apocalipsis 5:8: «que son las oraciones de los santos»; Salmo 141:2'],
        ['Libro sellado', 'Lo que no se entiende hasta que se rompen los sellos; aquí, la herencia perdida que rescata el pariente cercano', 'Daniel 12:4; Levítico 25:25'],
      ]) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      págs. 102-105; Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs.
      38-41 y 129; notas de Camilo en Evernote, "Los siete sellos".`) },
  ],

  preguntas: [
    { t: 'mc', v: '5:1', lit: 'sellado con siete sellos',
      q: '¿Con cuántos sellos estaba sellado el libro? (Apocalipsis 5:1)',
      o: ['7', '4', '12', '24'], a: 0,
      e: '«…un libro escrito por dentro y por fuera, sellado con siete sellos» (5:1).' },
    { t: 'mc', v: '5:1', lit: 'en la mano derecha del que estaba sentado en el trono',
      q: '¿Dónde vio Juan el libro sellado? (Apocalipsis 5:1)',
      o: ['En la mano derecha del que estaba en el trono', 'En las manos de uno de los veinticuatro ancianos', 'Sobre el altar de oro delante del trono', 'En la mano izquierda de un ángel poderoso'], a: 0,
      e: '«Vi en la mano derecha del que estaba sentado en el trono un libro…» (5:1).' },
    { t: 'tf', v: '5:1',
      q: 'El libro estaba escrito por dentro y por fuera. (Apocalipsis 5:1)', a: true,
      e: 'Verdadero (Apocalipsis 5:1).' },
    { t: 'mc', v: '5:2', lit: 'Quién es digno de abrir el libro y desatar sus sellos',
      q: '¿Qué pregonaba a gran voz el ángel poderoso? (Apocalipsis 5:2)',
      o: ['¿Quién es digno de abrir el libro y desatar sus sellos?', '¿Hasta cuándo, Señor, vas a tardar en juzgar?', '¿Quién podrá sostenerse en pie en el gran día?', '¿Quién es semejante a la bestia y quién podrá luchar?'], a: 0,
      e: '«¿Quién es digno de abrir el libro y desatar sus sellos?» (5:2). «¿Hasta cuándo…?» es de 6:10 y «¿quién podrá sostenerse…?» de 6:17.' },
    { t: 'mc', v: '5:3', lit: 'ni siquiera mirarlo',
      q: 'Según Apocalipsis 5:3, ¿qué podía hacer alguien en el cielo, en la tierra o debajo de la tierra con el libro?',
      o: ['Nada: nadie podía abrirlo, ni siquiera mirarlo', 'Mirarlo, pero no abrirlo', 'Abrir el primer sello, pero no los demás', 'Leerlo por fuera, pero no por dentro'], a: 0,
      e: '«Pero ninguno… podía abrir el libro, ni siquiera mirarlo» (5:3).' },
    { t: 'mc', v: '5:4', lit: 'Y lloraba yo mucho',
      q: '¿Qué hacía Juan porque nadie era digno de abrir el libro? (Apocalipsis 5:4)',
      o: ['Lloraba mucho', 'Cayó como muerto', 'Oraba en silencio', 'Cantaba un cántico nuevo'], a: 0,
      e: '«Y lloraba yo mucho, porque no se hallaba a nadie que fuera digno…» (5:4). Caer «como muerto» fue en 1:17.' },
    { t: 'tf', v: '5:5',
      q: 'Uno de los ángeles le dijo a Juan: «No llores». (Apocalipsis 5:5)', a: false,
      e: 'Falso: fue «uno de los ANCIANOS» (5:5).' },
    { t: 'mc', v: '5:5', lit: 'el León de la tribu de Judá, la raíz de David',
      q: 'Según Apocalipsis 5:5, ¿quién ha vencido para abrir el libro?',
      o: ['El León de la tribu de Judá, la raíz de David', 'El Cordero de la tribu de Leví, hijo de Aarón', 'El ángel poderoso que estaba junto al trono', 'El primero de los cuatro seres vivientes'], a: 0,
      e: '«No llores, porque el León de la tribu de Judá, la raíz de David, ha vencido para abrir el libro…» (5:5).' },
    { t: 'mc', v: '5:5', lit: 'No llores, porque el León de la tribu de Judá',
      q: '¿Qué texto dice «No llores, porque el León de la tribu de Judá… ha vencido»?',
      o: ['Apocalipsis 5:5', 'Apocalipsis 5:4', 'Apocalipsis 5:9', 'Apocalipsis 4:5'], a: 0,
      e: 'Apocalipsis 5:5.' },
    { t: 'fill', v: '5:5', ins: 'Apocalipsis 5:5 (RV1995) — Completa:',
      p: [{ x: '«No llores, porque el León de la tribu de ' }, { b: 'Judá', h: '¿qué tribu?' }, { x: ', la raíz de ' }, { b: 'David', h: '¿de qué rey?' }, { x: ', ha vencido para abrir el libro…»' }] },
    { t: 'mc', v: '5:6', lit: 'un Cordero como inmolado',
      q: 'Cuando Juan miró, después de oír del León, ¿qué vio en medio del trono? (Apocalipsis 5:6)',
      o: ['Un Cordero como inmolado', 'Un león con alas de águila', 'Un caballo blanco', 'Un ángel con un incensario'], a: 0,
      e: '«…estaba en pie un Cordero como inmolado» (5:6).' },
    { t: 'mc', v: '5:6', lit: 'tenía siete cuernos y siete ojos',
      q: '¿Cuántos cuernos y cuántos ojos tenía el Cordero? (Apocalipsis 5:6)',
      o: ['Siete cuernos y siete ojos', 'Diez cuernos y siete ojos', 'Dos cuernos y dos ojos', 'Siete cuernos y diez ojos'], a: 0,
      e: '«…que tenía siete cuernos y siete ojos, los cuales son los siete espíritus de Dios» (5:6).' },
    { t: 'tf', v: '5:6',
      q: 'Según Apocalipsis 5:6, los siete ojos del Cordero son los siete espíritus de Dios enviados por toda la tierra.', a: true,
      e: 'Verdadero (5:6). En 4:5 los siete espíritus de Dios eran las siete lámparas de fuego.' },
    { t: 'mc', v: '5:7', lit: 'tomó el libro de la mano derecha',
      q: '¿Qué hizo el Cordero, según Apocalipsis 5:7?',
      o: ['Vino y tomó el libro de la mano derecha del que estaba en el trono', 'Abrió de una vez los siete sellos del libro delante de todos', 'Entregó el libro a uno de los ancianos para que lo leyera', 'Se sentó en uno de los veinticuatro tronos junto al trono'], a: 0,
      e: '«Él vino y tomó el libro de la mano derecha del que estaba sentado en el trono» (5:7).' },
    { t: 'mc', v: '5:8', lit: 'que son las oraciones de los santos',
      q: 'Según Apocalipsis 5:8, ¿qué es el incienso de las copas de oro?',
      o: ['Las oraciones de los santos', 'La ira de Dios', 'La sangre de los mártires', 'Los siete espíritus de Dios'], a: 0,
      e: '«…copas de oro llenas de incienso, que son las oraciones de los santos» (5:8). Las copas de la ira son las de los capítulos 15 y 16.' },
    { t: 'mc', v: '5:8', lit: 'Todos tenían arpas y copas de oro',
      q: '¿Qué tenían los seres vivientes y los ancianos cuando se postraron ante el Cordero? (Apocalipsis 5:8)',
      o: ['Arpas y copas de oro llenas de incienso', 'Trompetas y palmas en las manos', 'Rollos y plumas para escribir', 'Lámparas encendidas y aceite'], a: 0,
      e: '«Todos tenían arpas y copas de oro llenas de incienso» (5:8).' },
    { t: 'mc', v: '5:9', lit: 'cantaban un cántico nuevo',
      q: '¿Qué cantaban delante del Cordero? (Apocalipsis 5:9)',
      o: ['Un cántico nuevo', 'El cántico de Moisés', 'Un salmo de David', 'El cántico de los ángeles'], a: 0,
      e: '«Y cantaban un cántico nuevo, diciendo: Digno eres…» (5:9). El cántico de Moisés aparece en 15:3.' },
    { t: 'mc', v: '5:9', lit: 'porque tú fuiste inmolado',
      q: 'Según el cántico de Apocalipsis 5:9, ¿por qué es digno el Cordero de tomar el libro?',
      o: ['Porque fue inmolado y nos redimió con su sangre', 'Porque creó todas las cosas por su voluntad', 'Porque es el más fuerte de los ángeles', 'Porque estuvo sentado en el trono desde siempre'], a: 0,
      e: '«…porque tú fuiste inmolado, y con tu sangre nos has redimido para Dios» (5:9). «Creaste todas las cosas» es la razón de 4:11.' },
    { t: 'fill', v: '5:9', ins: 'Apocalipsis 5:9 (RV1995) — Completa:',
      p: [{ x: '«…y con tu ' }, { b: 'sangre', h: '¿con qué?' }, { x: ' nos has redimido para Dios, de todo linaje, ' }, { b: 'lengua', h: '¿de todo qué?' }, { x: ', pueblo y nación»' }] },
    { t: 'tf', v: '5:10',
      q: 'El cántico dice que el Cordero nos hizo para nuestro Dios un reino y sacerdotes. (Apocalipsis 5:10)', a: true,
      e: 'Verdadero (Apocalipsis 5:10). Compara con 1:6: «reyes y sacerdotes».' },
    { t: 'mc', v: '5:10', lit: 'reinaremos sobre la tierra',
      q: '¿Con qué promesa termina el cántico nuevo? (Apocalipsis 5:10)',
      o: ['«Reinaremos sobre la tierra»', '«Veremos su rostro»', '«No tendremos más hambre»', '«Moraremos en su templo»'], a: 0,
      e: '«…nos has hecho para nuestro Dios un reino y sacerdotes, y reinaremos sobre la tierra» (5:10).' },
    { t: 'mc', v: '5:11', lit: 'Su número era millones de millones',
      q: '¿Cuántos ángeles oyó Juan alrededor del trono? (Apocalipsis 5:11)',
      o: ['Millones de millones', 'Ciento cuarenta y cuatro mil', 'Doce legiones', 'Siete mil'], a: 0,
      e: '«Su número era millones de millones» (5:11).' },
    { t: 'tf', v: '5:11',
      q: 'Según Apocalipsis 5:11, el número de los ángeles era miles de miles.', a: false,
      e: 'Falso: dice «millones de millones» (5:11).' },
    { t: 'mc', v: '5:12', lit: 'El Cordero que fue inmolado es digno',
      q: '¿Qué texto dice «El Cordero que fue inmolado es digno de tomar el poder, las riquezas, la sabiduría…»?',
      o: ['Apocalipsis 5:12', 'Apocalipsis 4:11', 'Apocalipsis 5:13', 'Apocalipsis 5:9'], a: 0,
      e: 'Apocalipsis 5:12. Son siete cosas: poder, riquezas, sabiduría, fortaleza, honra, gloria y alabanza.' },
    { t: 'fill', v: '5:12', ins: 'Apocalipsis 5:12 (RV1995) — Completa:',
      p: [{ x: '«El Cordero que fue ' }, { b: 'inmolado', h: '¿qué le pasó?' }, { x: ' es digno de tomar el poder, las ' }, { b: 'riquezas', h: '¿qué más?' }, { x: ', la sabiduría…»' }] },
    { t: 'mc', v: '5:12', lit: 'la sabiduría, la fortaleza',
      q: 'Según Apocalipsis 5:12, ¿cuántas cosas es digno de tomar el Cordero que fue inmolado?',
      o: ['Siete', 'Tres', 'Cuatro', 'Doce'], a: 0,
      e: 'Poder, riquezas, sabiduría, fortaleza, honra, gloria y alabanza (5:12). En 4:11 son tres y en 5:13 son cuatro.' },
    { t: 'mc', v: '5:13', lit: 'en el cielo, sobre la tierra, debajo de la tierra y en el mar',
      q: 'Según Apocalipsis 5:13, ¿quiénes alababan al que está en el trono y al Cordero?',
      o: ['Todo lo creado, en el cielo, la tierra, debajo de la tierra y el mar', 'Solo los veinticuatro ancianos y los cuatro seres vivientes', 'Solo los ciento cuarenta y cuatro mil sellados de Israel', 'Solo los ángeles que estaban alrededor del trono de Dios'], a: 0,
      e: '«A todo lo creado que está en el cielo, sobre la tierra, debajo de la tierra y en el mar… oí decir…» (5:13).' },
    { t: 'tf', v: '5:13',
      q: 'En Apocalipsis 5:13 la alabanza es al que está sentado en el trono y al Cordero, por los siglos de los siglos.', a: true,
      e: 'Verdadero (Apocalipsis 5:13).' },
    { t: 'mc', v: '5:14', lit: 'Los cuatro seres vivientes decían',
      q: '¿Qué decían los cuatro seres vivientes al final de Apocalipsis 5?',
      o: ['«¡Amén!»', '«¡Aleluya!»', '«¡Ven!»', '«¡Hosanna!»'], a: 0,
      e: '«Los cuatro seres vivientes decían: ¡Amén!» (5:14). «¡Ven!» lo dicen al abrirse los sellos (6:1).' },
    { t: 'mc', v: '5:6', f: 'c',
      q: 'Según Bohr, ¿por qué el Cordero aparece «como inmolado» en la escena del trono?',
      o: ['Acababa de llegar del campo de batalla', 'Iba a ser sacrificado en ese momento', 'Era una figura del pueblo de Israel', 'Representaba los sacrificios del templo'], a: 0,
      e: 'Para Bohr, Jesús llega al cielo después de su victoria, con las heridas de la cruz todavía frescas. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 34 y 38.' },
    { t: 'mc', v: '5:6', f: 'c',
      q: 'Según Bohr y Elena de White, ¿qué hecho en la tierra anunció que Jesús había comenzado su ministerio en el cielo?',
      o: ['El derramamiento del Espíritu en Pentecostés', 'La destrucción de Jerusalén por Roma', 'La conversión de Pablo camino a Damasco', 'El concilio de los apóstoles en Jerusalén'], a: 0,
      e: 'Elena de White: «El derramamiento pentecostal era la comunicación del Cielo de que el Redentor había iniciado su ministerio celestial». Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 38 (cita «Los hechos de los apóstoles», págs. 31-32).' },
    { t: 'mc', v: '5:6', f: 'c',
      q: 'Según Bohr, ¿qué representan los siete ojos del Cordero, «enviados por toda la tierra»?',
      o: ['El Espíritu Santo enviado en Pentecostés', 'Los siete ángeles de las trompetas', 'Los siete pastores de las iglesias', 'Las siete edades de la historia'], a: 0,
      e: 'En el capítulo 4 los siete espíritus estaban delante del trono; en el 5 son enviados a la tierra, en el Pentecostés. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 24 y 38.' },
    { t: 'mc', v: '5:6', f: 'c',
      q: 'Según Bohr, ¿qué representan los siete cuernos del Cordero?',
      o: ['Rayos de gloria: su poder como rey', 'Siete reyes que gobernarán la tierra', 'Las siete iglesias de la provincia de Asia', 'Los siete días de la creación'], a: 0,
      e: 'Bohr cita Habacuc 3:4 y a Elena de White: los «cuernos» son rayos de gloria que salen de Jesús, y muestran su poder como rey del reino de la gracia. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 38.' },
    { t: 'mc', v: '5:1', f: 'c',
      q: 'Según los autores que cita Bohr, ¿qué documento de la ley romana llevaba siete sellos de siete testigos?',
      o: ['Un testamento', 'Un decreto de guerra', 'Una carta de un rey', 'Un libro de cuentas'], a: 0,
      e: 'Stefanovic, Charles y Strand explican que un testamento romano no se podía ejecutar hasta romper sus siete sellos; aquí sería como la escritura de propiedad del mundo. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 41-42.' },
    { t: 'mc', v: '5:1', f: 'c',
      q: 'Según Bohr, ¿qué perdió Adán que Cristo recupera, y que tiene que ver con el libro sellado?',
      o: ['Su trono y su dominio sobre la tierra', 'Su lugar entre los doce patriarcas', 'El templo que construyó en el Edén', 'La lista con los nombres de sus hijos'], a: 0,
      e: 'Adán era rey de la tierra (Salmo 8) y Satanás le quitó el trono y el territorio (Lucas 4:5-6). El libro sería la escritura de propiedad que Cristo rescata. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 7-8 y 41.' },
    { t: 'mc', v: '5:2', f: 'c',
      q: 'Según Bohr, ¿qué quiere decir «digno» en la pregunta del ángel poderoso?',
      o: ['Calificado, que cumple los requisitos', 'Famoso, que todos conocen y respetan', 'Rico, que puede pagar con oro y plata', 'Anciano, que tiene muchos años de edad'], a: 0,
      e: 'Bohr lo explica con otros textos: «el obrero es digno de su salario» (Mateo 10:10). Es tener las condiciones para romper los sellos. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 35.' },
    { t: 'tf', v: '5:3', f: 'c',
      q: 'Según Bohr, antes de que llegara el Cordero, ni los ángeles, ni los querubines, ni siquiera el Padre estaban calificados para abrir el libro.', a: true,
      e: 'Verdadero: solo un pariente cercano de la familia humana que pagara el precio podía hacerlo. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 35-36.' },
    { t: 'mc', v: '5:9', f: 'c',
      q: 'Según Bohr, ¿por qué Jesús tuvo que hacerse hombre para poder abrir el libro?',
      o: ['El rescatador debía ser un pariente cercano', 'Los ángeles no sabían leer ese libro', 'El Padre no podía bajar a la tierra', 'Así lo pedían las leyes de Roma'], a: 0,
      e: 'En Israel solo un pariente cercano (el go\'el) podía rescatar la herencia perdida (Levítico 25:25, 47-49). Jesús se hizo nuestro hermano (Hebreos 2:14). Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 8-9.' },
    { t: 'tf', v: '5:9', f: 'c',
      q: 'Según Bohr, la palabra griega que se traduce «redimido» en el cántico significa comprar algo pagando un precio de rescate.', a: true,
      e: 'Verdadero: Bohr la compara con una casa de empeño, donde se paga para recuperar lo que se perdió. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 40.' },
    { t: 'mc', v: '5:5', f: 'c',
      q: 'Según Bohr, ¿cuándo actúa Jesús como el León de la tribu de Judá?',
      o: ['Al final, cuando juzga y toma su reino', 'Cuando nace en el pesebre de Belén', 'Cuando lo bautizan en el río Jordán', 'Cuando predica el sermón del monte'], a: 0,
      e: 'Como Cordero salva ahora; como León juzga al final (por eso 6:16 habla de «la ira del Cordero»). Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 36-37 (cita «Los hechos de los apóstoles», págs. 470-471).' },
    { t: 'mc', v: '5:7', f: 'c',
      q: 'Según Bohr, ¿cuándo se abrirá por fin el libro de los siete sellos?',
      o: ['Después del milenio, ante los impíos', 'En 1844, cuando comenzó el juicio', 'En el día de Pentecostés', 'Cuando cayó Roma en el siglo V'], a: 0,
      e: 'Los sellos se rompen en la historia, pero el libro se abre después del milenio. Treiyer, en cambio, pone la toma y apertura del libro en el juicio investigador. Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 43-45 y 117; Treiyer, «La crisis final en Apocalipsis 4 y 5», pág. 108.' },
    { t: 'mc', v: '5:8', f: 'c',
      q: 'Según Bohr, ¿qué tarea cumplen los ancianos y los seres vivientes con las copas de incienso?',
      o: ['Llevan las oraciones de los santos a Dios', 'Derraman la ira de Dios sobre la tierra', 'Ofrecen sacrificios por los pecados', 'Escriben los nombres en el libro de la vida'], a: 0,
      e: 'Tienen una tarea de intercesión: llevan las oraciones a Jesús, y por medio de él a Dios, como los ángeles de la escalera de Jacob. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 39.' },
    { t: 'mc', v: '5:9-10', f: 'c',
      q: 'Según Bohr, ¿qué problema de traducción hay en 5:9-10 en la Reina-Valera?',
      o: ['Dice «nos» donde debería decir «los»', 'Dice «sangre» donde debería decir «agua»', 'Dice «reino» donde debería decir «templo»', 'Dice «Dios» donde debería decir «Señor»'], a: 0,
      e: 'Bohr dice que las versiones modernas en inglés traducen «los»: los ancianos cantan sobre los redimidos, no sobre sí mismos. Urías Smith usa el «nos» para decir que los ancianos son humanos. Fuentes: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 81-83; Urías Smith, «Las profecías del Apocalipsis», pág. 45.' },
    { t: 'mc', v: '5:11', f: 'c',
      q: 'Según Bohr, ¿por qué los millones de ángeles aparecen en el capítulo 5 y no en el 4?',
      o: ['Habían ido a la tierra a buscar a Jesús', 'Estaban castigando a los ángeles caídos', 'Estaban en otra parte lejana del cielo', 'No tenían permiso para ver el trono'], a: 0,
      e: 'Una nube de ángeles llevó a Jesús al cielo (Hechos 1:9-11); por eso llegan con él en el capítulo 5. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 40 y 114.' },
    { t: 'mc', v: '5:12', f: 'c',
      q: 'Según Bohr, ¿cuál es el tema de los cantos del capítulo 5, distinto del capítulo 4?',
      o: ['La redención', 'La creación', 'El juicio', 'La ley'], a: 0,
      e: 'En el capítulo 4 se alaba a Dios como Creador; en el 5, al Cordero como Redentor. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, págs. 33-34 y 40.' },
    { t: 'mc', v: '5:6', f: 'c',
      q: '¿Qué texto de Daniel explica que, en la profecía, un cuerno representa a un rey?',
      o: ['Daniel 7:24', 'Daniel 2:44', 'Daniel 9:25', 'Daniel 12:4'], a: 0,
      e: 'Daniel 7:24 dice: «Los diez cuernos significan que de aquel reino se levantarán diez reyes». Por eso los siete cuernos del Cordero hablan de su poder como rey. Fuentes: Bohr, «15 principios de interpretación profética», tomo 2, pág. 105; Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 38.' },
    { t: 'mc', v: '5:8', f: 'c',
      q: 'Según Bohr, ¿qué salmo une el incienso con la oración, como lo hace Apocalipsis 5:8?',
      o: ['Salmo 141:2', 'Salmo 23:1', 'Salmo 8:6', 'Salmo 110:1'], a: 0,
      e: 'El salmista pide que su oración suba delante de Dios como el incienso. Bohr añade que en 8:3-4 el incienso son los méritos de Cristo que se suman a las oraciones. Fuente: Bohr, «Los siete sellos de Apocalipsis», tomo 1, pág. 129.' },
    { t: 'tf', v: '5:5', f: 'c',
      q: 'Según Bohr, en la Biblia el león siempre representa a Cristo.', a: false,
      e: 'Falso: los símbolos dependen del contexto. El león puede ser Cristo (5:5), Judá (Génesis 49), Babilonia (Jeremías 50:44) o Satanás (1 Pedro 5:8). Fuente: Bohr, «15 principios de interpretación profética», tomo 2, pág. 102.' },
  ],

  tarjetas: [
    { f: 'El libro de 5:1', r: 'En la mano derecha del que estaba en el trono; escrito por dentro y por fuera; siete sellos' },
    { f: 'La pregunta del ángel poderoso (5:2)', r: '«¿Quién es digno de abrir el libro y desatar sus sellos?»' },
    { f: 'Qué hacía Juan (5:4)', r: 'Lloraba mucho' },
    { f: 'Quién le dijo «No llores» y de quién habló (5:5)', r: 'Uno de los ancianos; del León de la tribu de Judá, la raíz de David' },
    { f: 'El Cordero de 5:6', r: 'Como inmolado, en pie; siete cuernos y siete ojos (los siete espíritus de Dios)' },
    { f: 'Qué es el incienso de las copas de oro (5:8)', r: 'Las oraciones de los santos' },
    { f: 'De dónde redimió el Cordero (5:9)', r: 'De todo linaje, lengua, pueblo y nación' },
    { f: 'Cuántos ángeles (5:11)', r: 'Millones de millones' },
    { f: 'Las siete cosas de 5:12', r: 'Poder, riquezas, sabiduría, fortaleza, honra, gloria y alabanza' },
    { f: '«El Cordero que fue inmolado es digno…»', r: 'Apocalipsis 5:12' },
    { f: 'Qué decían los seres vivientes al final (5:14)', r: '«¡Amén!»' },
  ],
};
