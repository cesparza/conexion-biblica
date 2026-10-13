/* Apocalipsis 1 — La visión de Cristo entre los candelabros.
   Modelo de los demás capítulos: ver fuente/apocalipsis.js y
   tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap1', label: 'Apocalipsis 1', sub: 'Cristo entre los candelabros', vs: 20,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`El libro empieza diciendo de quién es: <strong>«La revelación de
      Jesucristo»</strong> (1:1). Dios se la dio a Jesús, Jesús la mandó con su
      ángel, y el ángel se la mostró a <strong>Juan</strong>.<br><br>
      Juan estaba en la isla de <strong>Patmos</strong> por anunciar la
      palabra de Dios. Un día oyó detrás de él una voz como de trompeta, se
      volteó y vio a Jesús en medio de <strong>siete candelabros de oro</strong>, con
      <strong>siete estrellas</strong> en la mano derecha.<br><br>
      Juan cayó como muerto, y Jesús le puso la mano encima y le dijo:
      <strong>«No temas»</strong> (1:17).<br><br>
      <em>La idea del capítulo: el Apocalipsis no es un libro de miedo, es la
      revelación de Jesús, que vive y cuida a su iglesia.</em>`) },

    { t: '📜 Cómo llegó el mensaje (1:1-2)', capa: 'nucleo', h:
      tbl(['Paso', 'Quién'], [
        ['1', 'Dios se lo dio a <strong>Jesucristo</strong> (1:1)'],
        ['2', 'Jesucristo lo envió por medio de <strong>su ángel</strong> (1:1)'],
        ['3', 'El ángel lo mostró a <strong>su siervo Juan</strong> (1:1)'],
        ['4', 'Juan lo escribió para <strong>sus siervos</strong>, las iglesias (1:1, 1:4)'],
      ]) +
      hi(`Juan dio testimonio de tres cosas: <strong>la palabra de Dios, el
      testimonio de Jesucristo</strong> y todas las cosas que vio (1:2).`) },

    { t: '🙌 La primera bienaventuranza (1:3)', capa: 'nucleo', h:
      hi(`<strong>«Bienaventurado el que lee y los que oyen las palabras de esta
      profecía, y guardan las cosas en ella escritas, porque el tiempo está
      cerca»</strong> (1:3).<br><br>
      Son tres cosas: <strong>leer, oír y guardar</strong>. Es la primera de
      las <strong>siete</strong> bienaventuranzas del libro.`) +
      wa(`Ojo con la razón que da el versículo: <strong>«porque el tiempo está
      cerca»</strong>. No dice «porque el fin ya llegó».`) },

    { t: '✉️ El saludo a las siete iglesias (1:4-6)', capa: 'nucleo', h:
      li([`Juan escribe <strong>«a las siete iglesias que están en Asia»</strong> (1:4).`,
          `La gracia y la paz vienen <strong>«del que es y que era y que ha de
           venir»</strong>, de los siete espíritus y de Jesucristo (1:4-5).`,
          `Tres títulos de Jesús: <strong>el testigo fiel, el primogénito de los
           muertos y el soberano de los reyes de la tierra</strong> (1:5).`,
          `Lo que hizo: nos ama, <strong>nos ha lavado de nuestros pecados con su
           sangre</strong> y nos hizo <strong>reyes y sacerdotes</strong> para
           Dios (1:5-6).`]) },

    { t: '☁️ Viene con las nubes (1:7-8)', capa: 'nucleo', h:
      hi(`<strong>«He aquí que viene con las nubes: Todo ojo lo verá»</strong>
      (1:7). La venida de Jesús no es secreta: la ve todo el mundo, hasta
      <strong>los que lo traspasaron</strong>.<br><br>
      Y Dios se presenta: <strong>«Yo soy el Alfa y la Omega, principio y
      fin»</strong> (1:8). Alfa es la primera letra del alfabeto griego y Omega
      la última: Dios está al principio y al final de todo.`) },

    { t: '🏝️ Juan en Patmos (1:9-11)', capa: 'nucleo', h:
      li([`Juan se llama <strong>hermano y compañero en la tribulación</strong> (1:9).`,
          `Estaba en <strong>la isla llamada Patmos</strong>, «por causa de la
           palabra de Dios y del testimonio de Jesucristo» (1:9).`,
          `Fue <strong>en el día del Señor</strong> y estando «en el Espíritu» (1:10).`,
          `Oyó detrás de él <strong>una gran voz, como de trompeta</strong> (1:10).`,
          `La orden: escribir en un libro y enviarlo a las siete iglesias (1:11).`]) +
      tbl(['#', 'Las siete iglesias, en el orden de 1:11'], [
        ['1', 'Éfeso'], ['2', 'Esmirna'], ['3', 'Pérgamo'], ['4', 'Tiatira'],
        ['5', 'Sardis'], ['6', 'Filadelfia'], ['7', 'Laodicea'],
      ]) },

    { t: '✨ Cómo se veía Jesús (1:12-16)', capa: 'nucleo', h:
      tbl(['Parte', 'Cómo era'], [
        ['Dónde estaba', 'En medio de <strong>siete candelabros de oro</strong> (1:12-13)'],
        ['Ropa', 'Una ropa que llegaba <strong>hasta los pies</strong> y un <strong>cinto de oro</strong> en el pecho (1:13)'],
        ['Cabeza y cabellos', 'Blancos como <strong>lana</strong>, como <strong>nieve</strong> (1:14)'],
        ['Ojos', 'Como <strong>llama de fuego</strong> (1:14)'],
        ['Pies', 'Como <strong>bronce pulido</strong>, refulgente como en un horno (1:15)'],
        ['Voz', 'Como el estruendo de <strong>muchas aguas</strong> (1:15)'],
        ['Mano derecha', '<strong>Siete estrellas</strong> (1:16)'],
        ['Boca', 'Una <strong>espada aguda de dos filos</strong> (1:16)'],
        ['Rostro', 'Como <strong>el sol</strong> cuando resplandece con toda su fuerza (1:16)'],
      ]) },

    { t: '🤲 «No temas» (1:17-19)', capa: 'nucleo', h:
      hi(`Juan <strong>cayó a sus pies como muerto</strong>, y Jesús puso su
      diestra sobre él (1:17). Le dijo quién es: <strong>«el primero y el
      último, el que vive. Estuve muerto, pero vivo por los siglos de los
      siglos»</strong> (1:17-18).<br><br>
      Y tiene <strong>«las llaves de la muerte y del Hades»</strong> (1:18): la
      muerte no tiene la última palabra.`) +
      hi(`Lo que Juan debía escribir tiene tres partes (1:19): <strong>las cosas
      que has visto, las que son y las que han de ser</strong> después de
      éstas.`) },

    { t: '🔑 El misterio explicado (1:20)', capa: 'nucleo', h:
      tbl(['Símbolo', 'Qué es, según 1:20'], [
        ['Las siete estrellas', 'Los <strong>ángeles</strong> de las siete iglesias'],
        ['Los siete candelabros', 'Las <strong>siete iglesias</strong>'],
      ]) +
      wa(`Es de las pocas veces que el libro explica su propio símbolo. No se
      cruzan: <strong>estrellas = ángeles</strong>, <strong>candelabros =
      iglesias</strong>.`) },

    { t: '🧭 Un libro abierto, no sellado (1:1-3)', capa: 'contexto', h:
      hi(`<strong>Apocalipsis</strong> viene del griego <em>apokalypsis</em>:
      «quitar el velo», revelar. Lo contrario es <em>apocryphon</em>, esconder.
      Por eso el libro no está cerrado: a Daniel se le dijo que sellara su libro
      «hasta el tiempo del fin» (Daniel 12:4), y a Juan, que no lo sellara
      (Apocalipsis 22:10). El Apocalipsis le quita el sello a Daniel.<br><br>
      La palabra «declaró» de 1:1 viene de <em>semaino</em>, «dar a conocer por
      señales»: el mensaje llega en <strong>símbolos</strong>, como un drama con
      escenas y personajes.<br><br>
      En 1:3, «oír» es oír <strong>entendiendo</strong>. Dios no bendice a nadie
      por leer algo imposible de entender.`) +
      wa(`El mismo título desmiente que el libro sea un misterio: es «un misterio
      revelado, un libro abierto» (CS 389-390).`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 9-12; CS 389-390.</p>` },

    { t: '🧭 Pasado, presente y futuro (1:4-8, 1:19)', capa: 'contexto', h:
      hi(`Hay tres maneras de leer el Apocalipsis:`) +
      tbl(['Escuela', 'Qué dice'], [
        ['Preterista', 'Casi todo se cumplió en tiempos de Juan'],
        ['Futurista', 'Casi todo se cumplirá al final'],
        ['Historicista', 'Se va cumpliendo en orden, desde Juan hasta la venida de Jesús'],
      ]) +
      hi(`La iglesia adventista lee de la tercera forma, el <strong>método
      histórico continuo</strong>. Se apoya en 1:19: «las cosas que has visto»
      (pasado), «las que son» (presente) y «las que han de ser» (futuro); y en el
      nombre de Dios en 1:4: el que es, el que era y el que ha de venir.<br><br>
      En 1:5-6 los verbos miran atrás (nos lavó, nos hizo): la obra de Jesús en
      la tierra. En 1:7 se mira adelante: la segunda venida. Entre esos dos
      postes cabe toda la historia que cuenta el libro.`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 6-7 y 36.</p>` },

    { t: '🧭 Las siete iglesias y sus siete períodos (1:11, 1:20)', capa: 'contexto', h:
      hi(`Había más iglesias en Asia (Troas, Mileto, Colosas…). Jesús escogió
      estas siete por dos razones: en el mapa forman un candelabro, y su
      carácter retrata <strong>siete etapas</strong> de la iglesia. Sus nombres
      son «un símbolo de la iglesia en distintos períodos de la era cristiana»
      (HAp 585).`) +
      tbl(['Iglesia', 'Su nombre', 'Período'], [
        ['Éfeso', 'deseable', '31-100 d.C. · los apóstoles'],
        ['Esmirna', 'mirra', '100-313 · la persecución romana'],
        ['Pérgamo', 'elevación', '313-538 · la iglesia unida al Estado'],
        ['Tiatira', 'sacrificio de contrición', '538-1517 · la Edad Media'],
        ['Sardis', 'escapando', '1517-1833 · la Reforma'],
        ['Filadelfia', 'amor fraternal', '1833-1843 · el gran despertar'],
        ['Laodicea', 'juicio del pueblo', 'de 1844 al cierre de la gracia'],
      ]) +
      wa(`Otra lectura pone Pérgamo en 323-538, Tiatira en 538-1798 y Sardis
      desde 1798; otra, Tiatira en 538-1565 y Sardis en 1565-1740. Todas
      empiezan Laodicea en 1844.`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 6, 13-15; HAp 585; Smith, <i>Las profecías del Apocalipsis</i>, p. 26 y 30; Maxwell, <i>Apocalipsis</i>, p. 121 y 127.</p>` },

    { t: '🧭 Patmos y el «día del Señor» (1:9-10)', capa: 'contexto', h:
      hi(`<strong>Patmos</strong> es una isla rocosa del mar Egeo, a unos 80 km de
      Éfeso, sin árboles ni ríos: Roma mandaba allí a sus desterrados. En
      tiempos del emperador <strong>Domiciano</strong> (81-96 d.C.) echaron a
      Juan en una caldera de aceite hirviendo; Dios lo guardó como a los tres
      hebreos en el horno, y luego lo desterraron. Tertuliano cuenta lo
      mismo.`) +
      hi(`<strong>El día del Señor.</strong> Algunos lo leen como el día de la
      segunda venida. Pero el capítulo muestra a Jesús sirviendo como
      sacerdote, no viniendo. Fue <strong>en sábado</strong> cuando Juan vio la
      gloria del Señor.<br><br>
      La Biblia llama al sábado «mi día santo» (Isaías 58:13), y Jesús se
      llamó «Señor aun del sábado» (Marcos 2:28). La Biblia señala el séptimo
      día, «y no el primero, como día del Señor» (CS 500).`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 8-9; HAp 455 y 464-465; CS 500; Smith, <i>Las profecías del Apocalipsis</i>, p. 14.</p>` },

    { t: '🧭 Jesús, sumo sacerdote entre los candelabros (1:12-13)', capa: 'contexto', h:
      hi(`El candelabro estaba en el <strong>lugar santo</strong>, la primera sala
      del santuario. Al verlo entre los candelabros, Juan ve a Jesús en el lugar
      santo del santuario celestial, donde ministró durante la mayor parte de la
      era cristiana. Juan vio allí las lámparas y el altar de oro del primer
      departamento.<br><br>
      La ropa hasta los pies y el cinto de oro son el vestido del
      <strong>sumo sacerdote</strong> (Levítico 8). Jesús es nuestro sumo
      sacerdote en el cielo (Hebreos 8:1-2).<br><br>
      El sumo sacerdote cuidaba que las lámparas nunca se apagaran (Levítico
      24:1-4). El <strong>aceite</strong> es el Espíritu Santo y la
      <strong>luz</strong>, la predicación del evangelio. Jesús camina entre las
      iglesias para que la luz no se apague, ni siquiera en la Edad Media.`) +
      wa(`El libro sigue los pasos de Jesús por el santuario: las iglesias, los
      sellos y las trompetas pasan en el lugar santo; desde 11:19 se abre el
      lugar santísimo.`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 18-22; Bohr, <i>El santuario en Apocalipsis</i>, p. 3 y 6; CS 466-467.</p>` },

    { t: '🧭 Qué significa cada rasgo de Jesús (1:14-16, 1:20)', capa: 'contexto', h:
      tbl(['Símbolo', 'Significado'], [
        ['Ojos como llama de fuego', 'Lo ven todo. Buscan el pecado para quitarlo: por eso cada carta dice «yo conozco tus obras». En 19:12 esos ojos ya vienen a juzgar.'],
        ['Espada de dos filos', 'La palabra de Dios, que sale de su boca (Hebreos 4:12; Efesios 6:17).'],
        ['Siete estrellas en la diestra', 'Los mensajeros o ministros de la iglesia en cada etapa. La diestra es la mano del favor: nadie los arrebata de ella (Juan 10:28).'],
        ['Candelabros', 'Las iglesias, que reciben el aceite del Espíritu y alumbran al mundo.'],
      ]) +
      hi(`Los ojos y la espada trabajan juntos, como un médico: primero
      <strong>diagnostica</strong> dónde está el mal y después
      <strong>opera</strong> para quitarlo. Duele, pero salva.`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 22-28.</p>` },

    { t: '🧭 Viene con las nubes: la resurrección especial (1:7)', capa: 'contexto', h:
      hi(`Las <strong>nubes</strong> son nubes de ángeles: una nube se llevó a
      Jesús al cielo (Hechos 1:9) y él volverá con todos sus ángeles (Mateo
      25:31). En Daniel 7:13, con las nubes llega el Hijo del hombre ante el
      Anciano de días para el juicio.<br><br>
      «Los que lo traspasaron» no viven hoy. Por eso hay una
      <strong>resurrección especial</strong> antes de la venida: Daniel 12:2
      dice que despertarán «muchos», no todos.`) +
      tbl(['Quiénes resucitan para verlo venir', 'Por qué'], [
        ['Los que se burlaron de Cristo y los peores enemigos de su verdad', 'Para mirarlo en su gloria y ver el honor de los fieles (Mateo 26:64)'],
        ['Los que murieron en la fe del mensaje del tercer ángel (desde 1844)', 'Para oír el pacto de paz de Dios con los que guardaron su ley (14:13)'],
      ]) +
      wa(`La resurrección de todos los demás impíos es después del milenio (20:5).`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 37-43; CS 695.</p>` },

    { t: '🧭 Las llaves de la muerte y del Hades (1:5, 1:17-18)', capa: 'contexto', h:
      hi(`<strong>Hades</strong> es la palabra griega que equivale al
      <strong>Seol</strong> hebreo: el <strong>sepulcro</strong>, no un lugar de
      tormento. Pedro cita el Salmo 16:10 («no dejarás mi alma en el Seol») y en
      griego dice Hades (Hechos 2:27).<br><br>
      Satanás era el carcelero, el sepulcro la cárcel y los muertos sus presos.
      Jesús entró al sepulcro, le quitó las llaves y salió con ellas en la mano
      (Hebreos 2:14-15).<br><br>
      <strong>«El primogénito de los muertos»</strong> (1:5) no quiere decir el
      primero que resucitó (antes resucitaron Lázaro y otros). Quiere decir el
      de <strong>mayor rango</strong>, porque su resurrección hace posibles todas
      las demás (Colosenses 1:15-18).<br><br>
      El capítulo empieza y termina con su muerte y resurrección (1:5 y 1:18).
      Un muerto no puede mantener las lámparas encendidas: Jesús vive para
      interceder (Hebreos 7:25).`) +
      `<p>Fuente: Bohr, <i>Las siete iglesias</i>, p. 17-18 y 31-36.</p>` },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      `<p>Dos símbolos se explican en el mismo capítulo (1:20); los demás, en otros textos.</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Candelabros de oro', 'Las iglesias', 'Apocalipsis 1:20: «los siete candelabros que has visto son las siete iglesias»'],
        ['Estrellas', 'Los ángeles o mensajeros de las iglesias: sus ministros', 'Apocalipsis 1:20: «las siete estrellas son los ángeles de las siete iglesias»'],
        ['Siete espíritus', 'El Espíritu Santo, en su plenitud', 'Apocalipsis 4:5: siete lámparas «que son los siete espíritus de Dios»; Isaías 11:2'],
        ['Número siete', 'Plenitud, algo completo', 'Génesis 2:2; Apocalipsis 15:1'],
        ['Nubes', 'Ángeles', 'Hechos 1:9-11 con Mateo 25:31; Salmo 68:17'],
        ['Ropa hasta los pies y cinto de oro', 'El vestido del sumo sacerdote', 'Levítico 8:7; Hebreos 8:1'],
        ['Ojos', 'Sabiduría; lo conoce todo', 'Efesios 1:18; Apocalipsis 2:23: «el que escudriña la mente y el corazón»'],
        ['Espada de dos filos', 'La palabra de Dios', 'Hebreos 4:12; Efesios 6:17'],
        ['Sol', 'Cristo, el Sol de justicia', 'Malaquías 4:2'],
        ['Hades', 'El sepulcro', 'Hechos 2:27 con Salmo 16:10'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:104-105; Bohr, <i>Las siete iglesias</i>, p. 19, 23-24, 32-33 y 37.</p>` },
  ],

  preguntas: [
    { t: 'mc', v: '1:1', lit: 'La revelación de Jesucristo',
      q: '¿Con qué palabras empieza el libro del Apocalipsis?',
      o: ['«La revelación de Jesucristo»', '«La visión de Juan el apóstol»', '«Las palabras del ángel de Dios»', '«El libro de los siete sellos»'], a: 0,
      e: '«La revelación de Jesucristo, que Dios le dio…» (Apocalipsis 1:1).' },
    { t: 'mc', v: '1:1', lit: 'por medio de su ángel a su siervo Juan',
      q: '¿Por medio de quién fue enviada la revelación a Juan? (Apocalipsis 1:1)',
      o: ['Por medio de su ángel', 'Por medio de un profeta', 'Por medio de Pedro', 'Por medio de un sueño'], a: 0,
      e: '«La declaró enviándola por medio de su ángel a su siervo Juan» (1:1).' },
    { t: 'mc', v: '1:1', lit: 'las cosas que deben suceder pronto',
      q: 'Según Apocalipsis 1:1, ¿para qué le dio Dios la revelación a Jesucristo?',
      o: ['Para manifestar a sus siervos las cosas que deben suceder pronto', 'Para castigar a las naciones que no creen', 'Para explicar las profecías de Daniel una por una', 'Para que Juan escribiera la historia de Israel'], a: 0,
      e: '«…para manifestar a sus siervos las cosas que deben suceder pronto» (1:1).' },
    { t: 'tf', v: '1:2',
      q: 'Juan dio testimonio de la palabra de Dios, del testimonio de Jesucristo y de todas las cosas que vio. (Apocalipsis 1:2)', a: true,
      e: 'Verdadero (Apocalipsis 1:2).' },
    { t: 'mc', v: '1:3', lit: 'Bienaventurado el que lee',
      q: '¿Qué texto dice «Bienaventurado el que lee y los que oyen las palabras de esta profecía»?',
      o: ['Apocalipsis 1:3', 'Apocalipsis 1:1', 'Apocalipsis 22:3', 'Apocalipsis 1:8'], a: 0,
      e: 'Apocalipsis 1:3. Es la primera de las siete bienaventuranzas del libro.' },
    { t: 'mc', v: '1:3', lit: 'guardan las cosas en ella escritas',
      q: 'Según Apocalipsis 1:3, ¿qué tres cosas hace el que es bienaventurado?',
      o: ['Lee, oye y guarda', 'Ora, ayuna y ofrenda', 'Ve, escribe y envía', 'Canta, alaba y predica'], a: 0,
      e: '«…el que lee y los que oyen… y guardan las cosas en ella escritas» (1:3).' },
    { t: 'fill', v: '1:3', ins: 'Apocalipsis 1:3 (RV1995) — Completa:',
      p: [{ x: '«Bienaventurado el que lee y los que oyen las palabras de esta ' }, { b: 'profecía', h: '¿de qué?' }, { x: ', y guardan las cosas en ella escritas, porque el tiempo está ' }, { b: 'cerca', h: '¿cómo está el tiempo?' }, { x: '.»' }] },
    { t: 'tf', v: '1:3',
      q: 'Apocalipsis 1:3 dice que hay que guardar la profecía porque el tiempo ya llegó.', a: false,
      e: 'Falso: dice «porque el tiempo está CERCA» (1:3).' },
    { t: 'mc', v: '1:4', lit: 'a las siete iglesias que están en Asia',
      q: '¿A quiénes escribe Juan el libro? (Apocalipsis 1:4)',
      o: ['A las siete iglesias que están en Asia', 'A las doce tribus de Israel', 'A la iglesia de Jerusalén', 'A los siete ángeles del trono'], a: 0,
      e: '«Juan, a las siete iglesias que están en Asia» (1:4).' },
    { t: 'mc', v: '1:4', lit: 'que ha de venir',
      q: 'Apocalipsis 1:4: «Gracia y paz a vosotros de parte del que es y que era y…». ¿Cómo sigue?',
      o: ['«…que ha de venir»', '«…que reina en Sion»', '«…que todo lo sabe»', '«…que juzga la tierra»'], a: 0,
      e: '«…de parte del que es y que era y que ha de venir» (1:4). La misma frase vuelve en 1:8.' },
    { t: 'mc', v: '1:5', lit: 'el testigo fiel, el primogénito de los muertos',
      q: '¿Qué tres títulos le da Apocalipsis 1:5 a Jesucristo?',
      o: ['El testigo fiel, el primogénito de los muertos y el soberano de los reyes', 'El Cordero inmolado, el León de la tribu de Judá y la Raíz de David', 'El Verbo de Dios, la Luz verdadera del mundo y el buen Pastor de las ovejas', 'El Hijo del hombre, el Mesías prometido a Israel y el Salvador del mundo'], a: 0,
      e: '«…el testigo fiel, el primogénito de los muertos y el soberano de los reyes de la tierra» (1:5).' },
    { t: 'fill', v: '1:5', ins: 'Apocalipsis 1:5 (RV1995) — Completa:',
      p: [{ x: '«Al que nos ama, nos ha ' }, { b: 'lavado', h: '¿qué hizo?' }, { x: ' de nuestros pecados con su ' }, { b: 'sangre', h: '¿con qué?' }, { x: '»' }] },
    { t: 'mc', v: '1:6', lit: 'reyes y sacerdotes para Dios',
      q: 'Según Apocalipsis 1:6, ¿qué nos hizo Jesucristo para Dios?',
      o: ['Reyes y sacerdotes', 'Profetas y apóstoles', 'Jueces y gobernadores', 'Ángeles y mensajeros'], a: 0,
      e: '«…y nos hizo reyes y sacerdotes para Dios, su Padre» (1:6).' },
    { t: 'mc', v: '1:7', lit: 'He aquí que viene con las nubes',
      q: '¿Cómo viene Jesús, según Apocalipsis 1:7?',
      o: ['Con las nubes, y todo ojo lo verá', 'En secreto, y solo los fieles lo verán', 'Sobre un caballo blanco, de noche', 'En el templo, en medio de los candelabros'], a: 0,
      e: '«He aquí que viene con las nubes: Todo ojo lo verá» (1:7).' },
    { t: 'tf', v: '1:7',
      q: 'Según Apocalipsis 1:7, también verán a Jesús los que lo traspasaron.', a: true,
      e: 'Verdadero: «Todo ojo lo verá, y los que lo traspasaron» (1:7).' },
    { t: 'mc', v: '1:8', lit: 'Yo soy el Alfa y la Omega',
      q: '¿Qué texto dice «Yo soy el Alfa y la Omega, principio y fin», dice el Señor?',
      o: ['Apocalipsis 1:8', 'Apocalipsis 1:18', 'Apocalipsis 1:5', 'Apocalipsis 1:17'], a: 0,
      e: 'Apocalipsis 1:8. En 1:11 la voz repite «el Alfa y la Omega, el primero y el último».' },
    { t: 'mc', v: '1:8', lit: 'el Todopoderoso',
      q: '¿Con qué nombre termina Apocalipsis 1:8?',
      o: ['El Todopoderoso', 'El Altísimo', 'El Santo de Israel', 'El Dios de los cielos'], a: 0,
      e: '«…el que es y que era y que ha de venir, el Todopoderoso» (1:8).' },
    { t: 'mc', v: '1:9', lit: 'la isla llamada Patmos',
      q: '¿Dónde estaba Juan cuando recibió la revelación? (Apocalipsis 1:9)',
      o: ['En la isla llamada Patmos', 'En la ciudad de Éfeso', 'En la isla de Creta', 'En la cárcel de Roma'], a: 0,
      e: '«…estaba en la isla llamada Patmos» (1:9).' },
    { t: 'mc', v: '1:9', lit: 'por causa de la palabra de Dios',
      q: '¿Por qué estaba Juan en Patmos, según Apocalipsis 1:9?',
      o: ['Por causa de la palabra de Dios y del testimonio de Jesucristo', 'Porque huía de una persecución en Jerusalén', 'Porque iba de viaje a visitar las iglesias', 'Porque el ángel lo llevó para orar a solas'], a: 0,
      e: '«…por causa de la palabra de Dios y del testimonio de Jesucristo» (1:9).' },
    { t: 'tf', v: '1:9',
      q: 'Juan se presenta como «vuestro hermano y compañero en la tribulación». (Apocalipsis 1:9)', a: true,
      e: 'Verdadero (Apocalipsis 1:9).' },
    { t: 'mc', v: '1:10', lit: 'en el día del Señor',
      q: '¿En qué día tuvo Juan la visión? (Apocalipsis 1:10)',
      o: ['En el día del Señor', 'En el día de Pentecostés', 'En el primer día de la semana', 'En el día de la Pascua'], a: 0,
      e: '«Estando yo en el Espíritu en el día del Señor…» (1:10).' },
    { t: 'mc', v: '1:10', lit: 'como de trompeta',
      q: '¿Cómo era la voz que Juan oyó detrás de él? (Apocalipsis 1:10)',
      o: ['Una gran voz, como de trompeta', 'Una voz suave, como de brisa', 'Una voz como de muchas aguas', 'Una voz como de trueno lejano'], a: 0,
      e: '«…oí detrás de mí una gran voz, como de trompeta» (1:10). La voz «como de muchas aguas» es la de 1:15.' },
    { t: 'mc', v: '1:10', f: 'c',
      q: '¿Qué día es «el día del Señor» de Apocalipsis 1:10?',
      o: ['El sábado', 'El domingo', 'El día de la segunda venida', 'El día de la Pascua'], a: 0,
      e: 'Fue en sábado cuando Juan vio la gloria del Señor; Jesús es «Señor aun del sábado» (Marcos 2:28). Algunos lo leen como la segunda venida, pero el capítulo muestra a Jesús como sacerdote. Fuente: Bohr, <i>Las siete iglesias</i>, p. 8-9; CS 500.' },
    { t: 'mc', v: '1:11', lit: 'Esmirna, Pérgamo, Tiatira',
      q: '¿Cuál es el orden de las siete iglesias en Apocalipsis 1:11?',
      o: ['Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia, Laodicea', 'Éfeso, Pérgamo, Esmirna, Sardis, Tiatira, Laodicea, Filadelfia', 'Esmirna, Éfeso, Tiatira, Pérgamo, Filadelfia, Sardis, Laodicea', 'Laodicea, Filadelfia, Sardis, Tiatira, Pérgamo, Esmirna, Éfeso'], a: 0,
      e: 'Apocalipsis 1:11: Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia y Laodicea.' },
    { t: 'tf', v: '1:11',
      q: 'La primera iglesia de la lista de Apocalipsis 1:11 es Laodicea.', a: false,
      e: 'Falso: la primera es ÉFESO; Laodicea es la última (1:11).' },
    { t: 'mc', v: '1:12', lit: 'siete candelabros de oro',
      q: '¿Qué vio Juan al voltearse para ver la voz? (Apocalipsis 1:12)',
      o: ['Siete candelabros de oro', 'Siete trompetas de plata', 'Un trono rodeado de un arco iris', 'Siete lámparas de fuego'], a: 0,
      e: '«…vi siete candelabros de oro» (1:12). Las siete lámparas de fuego están en 4:5.' },
    { t: 'mc', v: '1:13', lit: 'un cinto de oro',
      q: '¿Qué tenía en el pecho el que era semejante al Hijo del hombre? (Apocalipsis 1:13)',
      o: ['Un cinto de oro', 'Un pectoral de piedras preciosas', 'Una cadena de plata', 'Un manto de púrpura'], a: 0,
      e: '«…tenía el pecho ceñido con un cinto de oro» (1:13).' },
    { t: 'fill', v: '1:14', ins: 'Apocalipsis 1:14 (RV1995) — Completa:',
      p: [{ x: '«Su cabeza y sus cabellos eran blancos como blanca ' }, { b: 'lana', h: '¿como qué?' }, { x: ', como nieve; sus ojos, como llama de ' }, { b: 'fuego', h: '¿llama de qué?' }, { x: '.»' }] },
    { t: 'mc', v: '1:15', lit: 'semejantes al bronce pulido',
      q: '¿A qué eran semejantes los pies del Hijo del hombre? (Apocalipsis 1:15)',
      o: ['Al bronce pulido', 'Al oro fino', 'Al hierro mezclado con barro', 'A columnas de mármol'], a: 0,
      e: '«Sus pies eran semejantes al bronce pulido, refulgente como en un horno» (1:15).' },
    { t: 'tf', v: '1:15',
      q: 'La voz del Hijo del hombre era como el estruendo de muchas aguas. (Apocalipsis 1:15)', a: true,
      e: 'Verdadero (1:15). Ojo: la voz «como de trompeta» es la que Juan oyó primero, en 1:10.' },
    { t: 'mc', v: '1:16', lit: 'una espada aguda de dos filos',
      q: '¿Qué salía de la boca del Hijo del hombre? (Apocalipsis 1:16)',
      o: ['Una espada aguda de dos filos', 'Fuego y humo', 'Una gran voz como de trueno', 'Un río de agua de vida'], a: 0,
      e: '«…de su boca salía una espada aguda de dos filos» (1:16).' },
    { t: 'mc', v: '1:16', lit: 'En su diestra tenía siete estrellas',
      q: '¿Qué tenía en su mano derecha? (Apocalipsis 1:16)',
      o: ['Siete estrellas', 'Siete candelabros', 'Un libro sellado', 'Las llaves de la muerte'], a: 0,
      e: '«En su diestra tenía siete estrellas» (1:16). Las llaves de la muerte las menciona en 1:18, no en su mano.' },
    { t: 'tf', v: '1:16',
      q: 'Su rostro era como la luna cuando resplandece con toda su fuerza. (Apocalipsis 1:16)', a: false,
      e: 'Falso: era como el SOL cuando resplandece con toda su fuerza (1:16).' },
    { t: 'mc', v: '1:17', lit: 'caí a sus pies como muerto',
      q: '¿Qué le pasó a Juan cuando vio al Hijo del hombre? (Apocalipsis 1:17)',
      o: ['Cayó a sus pies como muerto', 'Se cubrió el rostro y huyó', 'Comenzó a cantar alabanzas', 'Se quedó mudo siete días'], a: 0,
      e: '«Cuando lo vi, caí a sus pies como muerto» (1:17).' },
    { t: 'mc', v: '1:17', lit: 'No temas',
      q: '¿Qué le dijo Jesús a Juan al poner su diestra sobre él? (Apocalipsis 1:17)',
      o: ['«No temas»', '«Levántate y anda»', '«La paz sea contigo»', '«Escucha, Israel»'], a: 0,
      e: '«No temas. Yo soy el primero y el último» (1:17).' },
    { t: 'mc', v: '1:18', lit: 'las llaves de la muerte y del Hades',
      q: 'Según Apocalipsis 1:18, ¿qué llaves tiene Jesús?',
      o: ['Las de la muerte y del Hades', 'Las del cielo y de la tierra', 'Las del templo y del arca', 'Las de David y de Salomón'], a: 0,
      e: '«…tengo las llaves de la muerte y del Hades» (1:18). La «llave de David» aparece en 3:7.' },
    { t: 'fill', v: '1:18', ins: 'Apocalipsis 1:18 (RV1995) — Completa:',
      p: [{ x: '«el que vive. Estuve ' }, { b: 'muerto', h: '¿cómo estuvo?' }, { x: ', pero vivo por los ' }, { b: 'siglos', h: '¿por los qué?' }, { x: ' de los siglos, amén.' }] },
    { t: 'mc', v: '1:19', lit: 'las que son y las que han de ser',
      q: 'Según Apocalipsis 1:19, ¿qué debía escribir Juan?',
      o: ['Las cosas que ha visto, las que son y las que han de ser', 'Solo las cosas que van a pasar al final', 'Las cartas que le dictara cada ángel', 'La historia de su vida con Jesús'], a: 0,
      e: '«Escribe, pues, las cosas que has visto, las que son y las que han de ser después de éstas» (1:19).' },
    { t: 'mc', v: '1:20', lit: 'las siete estrellas son los ángeles de las siete iglesias',
      q: 'Según Apocalipsis 1:20, ¿qué son las siete estrellas?',
      o: ['Los ángeles de las siete iglesias', 'Las siete iglesias', 'Los siete espíritus de Dios', 'Los siete sellos del libro'], a: 0,
      e: '«…las siete estrellas son los ángeles de las siete iglesias» (1:20).' },
    { t: 'tf', v: '1:20',
      q: 'Según Apocalipsis 1:20, los siete candelabros son los ángeles de las siete iglesias.', a: false,
      e: 'Falso: los candelabros son las siete IGLESIAS; las estrellas son los ángeles (1:20).' },
    { t: 'mc', v: '1:20', f: 'c',
      q: 'Además de ser iglesias reales de Asia, ¿qué representan las siete iglesias?',
      o: ['Siete etapas de la historia de la iglesia hasta el fin', 'Siete denominaciones que existirán al mismo tiempo', 'Siete ángeles que gobiernan las naciones', 'Siete años de tribulación antes del fin'], a: 0,
      e: 'Sus nombres son «un símbolo de la iglesia en distintos períodos de la era cristiana» (HAp 585). El texto solo las nombra (1:11, 1:20). Fuente: Bohr, <i>Las siete iglesias</i>, p. 6; HAp 585.' },
    { t: 'mc', v: '1:1', f: 'c',
      q: '¿Qué significa la palabra griega «apokalypsis», que da nombre al libro?',
      o: ['Quitar el velo, revelar', 'Esconder, ocultar', 'El fin del mundo', 'Una visión de castigo'], a: 0,
      e: 'Apokalypsis es «quitar el velo»; lo contrario es apocryphon, «esconder». Fuente: Bohr, <i>Las siete iglesias</i>, p. 9.' },
    { t: 'tf', v: '1:1', f: 'c',
      q: 'El Apocalipsis no fue sellado como Daniel, y le quita el sello a la parte de Daniel que estaba cerrada hasta el tiempo del fin.', a: true,
      e: 'Verdadero: a Daniel se le dijo que sellara el libro (Daniel 12:4) y a Juan que no lo sellara (Apocalipsis 22:10). Fuente: Bohr, <i>Las siete iglesias</i>, p. 9-10.' },
    { t: 'mc', v: '1:3', f: 'c',
      q: '¿Qué quiere decir «oír» en la bienaventuranza de Apocalipsis 1:3?',
      o: ['Oír entendiendo lo que se oye', 'Oír el sonido sin entenderlo', 'Obedecer sin hacer preguntas', 'Leer en voz alta en la iglesia'], a: 0,
      e: 'El verbo indica comprender lo que se oye: Dios no bendice por leer algo imposible de entender. Fuente: Bohr, <i>Las siete iglesias</i>, p. 11-12.' },
    { t: 'mc', v: '1:19', f: 'c',
      q: 'En la interpretación adventista (método histórico), ¿cómo se leen las tres partes de Apocalipsis 1:19?',
      o: ['Como pasado, presente y futuro', 'Como tres visiones del mismo día final', 'Como tres cartas para tres iglesias', 'Como tres etapas de la vida de Juan'], a: 0,
      e: '«Las cosas que has visto» (pasado), «las que son» (presente) y «las que han de ser» (futuro): el libro se cumple en orden a lo largo de la historia. Fuente: Bohr, <i>Las siete iglesias</i>, p. 6-7.' },
    { t: 'mc', v: '1:11', f: 'c',
      q: '¿Qué fechas tiene el período de Éfeso, la primera iglesia?',
      o: ['31-100 d.C.', '100-313 d.C.', '313-538 d.C.', '538-1517 d.C.'], a: 0,
      e: 'Éfeso es la iglesia apostólica, del 31 al 100 d.C. Las otras fechas son de Esmirna, Pérgamo y Tiatira. Fuente: Bohr, <i>Las siete iglesias</i>, p. 13.' },
    { t: 'mc', v: '1:11', f: 'c',
      q: '¿Desde cuándo corre el período de Laodicea, la última iglesia?',
      o: ['Desde 1844 hasta el cierre de la gracia', 'Desde 1517 hasta el despertar de 1833', 'Desde 1798 hasta el chasco de 1844', 'Desde 538 hasta la herida de 1798'], a: 0,
      e: 'Laodicea («juicio del pueblo») va de 1844 al cierre de la gracia. Las otras lecturas adventistas también la empiezan en 1844. Fuente: Bohr, <i>Las siete iglesias</i>, p. 14-15.' },
    { t: 'mc', v: '1:9', f: 'c',
      q: '¿Qué le pasó a Juan antes de ser desterrado a Patmos?',
      o: ['Lo echaron en aceite hirviendo y salió con vida', 'Lo echaron a los leones en Éfeso', 'Lo encerraron en una cárcel de Roma', 'Lo apedrearon y lo dieron por muerto'], a: 0,
      e: 'Bajo Domiciano lo echaron en una caldera de aceite hirviendo; Dios lo guardó como a los tres hebreos en el horno. Fuente: Bohr, <i>Las siete iglesias</i>, p. 8; HAp 455.' },
    { t: 'mc', v: '1:9', f: 'c',
      q: '¿Bajo qué emperador romano fue desterrado Juan a Patmos?',
      o: ['Domiciano', 'Nerón', 'Constantino', 'Diocleciano'], a: 0,
      e: 'Domiciano gobernó del 81 al 96 d.C. Nerón persiguió antes; Diocleciano, en los «diez días» de Esmirna; Constantino I detuvo la persecución. Fuente: Bohr, <i>Las siete iglesias</i>, p. 8.' },
    { t: 'mc', v: '1:12', f: 'c',
      q: '¿En qué parte del santuario celestial ve Juan a Jesús en Apocalipsis 1?',
      o: ['En el lugar santo, entre los candelabros', 'En el lugar santísimo, junto al arca', 'En el atrio, junto al altar del sacrificio', 'A la entrada del santuario, por fuera'], a: 0,
      e: 'El candelabro estaba en el lugar santo; el lugar santísimo se abre hasta 11:19. Fuente: Bohr, <i>Las siete iglesias</i>, p. 18; Bohr, <i>El santuario en Apocalipsis</i>, p. 3 y 6.' },
    { t: 'mc', v: '1:13', f: 'c',
      q: '¿Qué muestran la ropa hasta los pies y el cinto de oro de Apocalipsis 1:13?',
      o: ['Que Jesús viste como sumo sacerdote', 'Que Jesús viste como rey guerrero', 'Que Jesús viste como profeta del desierto', 'Que Jesús viste como juez romano'], a: 0,
      e: 'Es el vestido del sumo sacerdote (Levítico 8); Jesús ministra en el santuario celestial (Hebreos 8:1-2). Fuente: Bohr, <i>Las siete iglesias</i>, p. 19.' },
    { t: 'tf', v: '1:12', f: 'c',
      q: 'En los candelabros, el aceite representa al Espíritu Santo y la luz, la predicación del evangelio.', a: true,
      e: 'Verdadero. Jesús camina entre ellos para que la luz nunca se apague (Levítico 24:1-4). Fuente: Bohr, <i>Las siete iglesias</i>, p. 21.' },
    { t: 'mc', v: '1:14', f: 'c',
      q: '¿Qué hacen en Apocalipsis 1 los ojos de Jesús «como llama de fuego»?',
      o: ['Ven el pecado para quitarlo de la iglesia', 'Anuncian el castigo de las naciones', 'Muestran que Jesús está enojado con Juan', 'Alumbran el camino de los ángeles'], a: 0,
      e: 'Son ojos que lo ven todo para sanar: «yo conozco tus obras». En 19:12 los mismos ojos vienen a juzgar. Fuente: Bohr, <i>Las siete iglesias</i>, p. 23 y 28.' },
    { t: 'mc', v: '1:16', f: 'c',
      q: '¿Qué representa la espada aguda de dos filos que sale de la boca de Jesús?',
      o: ['La palabra de Dios', 'La ira del Cordero', 'El poder de los ejércitos', 'El juicio de los ángeles'], a: 0,
      e: 'Lo que sale de la boca son palabras: la espada es la palabra de Dios (Hebreos 4:12; Efesios 6:17). Fuente: Bohr, <i>Las siete iglesias</i>, p. 24.' },
    { t: 'mc', v: '1:20', f: 'c',
      q: '¿A quiénes representan las siete estrellas que Jesús tiene en su diestra?',
      o: ['A los ministros de la iglesia en cada etapa', 'A los siete arcángeles del trono', 'A los siete diáconos de Hechos 6', 'A los siete emperadores de Roma'], a: 0,
      e: 'Son los mensajeros o ministros de cada etapa, sostenidos en la mano del favor de Jesús. Fuente: Bohr, <i>Las siete iglesias</i>, p. 22 y 47.' },
    { t: 'mc', v: '1:7', f: 'c',
      q: '¿Quiénes resucitan antes de la venida de Jesús, además de «los que lo traspasaron»?',
      o: ['Los que murieron en la fe del mensaje del tercer ángel', 'Todos los justos que han muerto desde Adán', 'Todos los impíos de todas las épocas', 'Solo los apóstoles y los profetas'], a: 0,
      e: 'Es una resurrección especial (Daniel 12:2: «muchos», no todos). Los demás impíos resucitan después del milenio (20:5). Fuente: CS 695; Bohr, <i>Las siete iglesias</i>, p. 38-43.' },
    { t: 'tf', v: '1:7', f: 'c',
      q: 'Las nubes con las que viene Jesús son nubes de ángeles.', a: true,
      e: 'Verdadero: vendrá «con todos los santos ángeles» (Mateo 25:31; Salmo 68:17). Fuente: Bohr, <i>Las siete iglesias</i>, p. 37.' },
    { t: 'mc', v: '1:18', f: 'c',
      q: '¿Qué significa «Hades» en Apocalipsis 1:18?',
      o: ['El sepulcro, igual que el Seol hebreo', 'Un lugar de tormento para las almas', 'Un lugar de espera entre cielo y tierra', 'El fondo del mar, donde quedan los muertos'], a: 0,
      e: 'Hades es la palabra griega que traduce el Seol hebreo: el sepulcro (Hechos 2:27; Salmo 16:10). Fuente: Bohr, <i>Las siete iglesias</i>, p. 32-34.' },
    { t: 'mc', v: '1:5', f: 'c',
      q: '¿Por qué se llama a Jesús «el primogénito de los muertos» si otros resucitaron antes?',
      o: ['Por su rango: su resurrección hace posibles las demás', 'Porque fue el primero que resucitó en la historia', 'Porque resucitó el primer día de la semana', 'Porque fue el hijo mayor de María y José'], a: 0,
      e: 'Primogénito habla de preeminencia, no de orden (Colosenses 1:15-18). Moisés, Lázaro y otros resucitaron antes. Fuente: Bohr, <i>Las siete iglesias</i>, p. 17-18.' },
    { t: 'mc', v: '1:20', f: 'c',
      q: '¿Dónde explica la Biblia qué son los candelabros de Apocalipsis 1?',
      o: ['En el mismo capítulo, en 1:20', 'En Daniel 7:17, con las bestias', 'En Apocalipsis 17:15, con las aguas', 'En Hebreos 4:12, con la espada'], a: 0,
      e: 'Apocalipsis 1:20 dice que «los siete candelabros que has visto son las siete iglesias». A veces el símbolo se explica en el contexto inmediato. Fuente: Bohr, <i>15 principios</i> 2:102.' },
    { t: 'mc', v: '1:4', f: 'c',
      q: 'Según Apocalipsis 4:5, ¿qué representan «los siete espíritus» de Apocalipsis 1:4?',
      o: ['El Espíritu Santo en su plenitud', 'Siete ángeles que gobiernan', 'Siete profetas del pasado', 'Siete virtudes del creyente'], a: 0,
      e: 'Las siete lámparas del trono son «los siete espíritus de Dios» (Apocalipsis 4:5), y el siete indica plenitud (Isaías 11:2). Fuente: Bohr, <i>15 principios</i> 2:104.' },
    { t: 'tf', v: '1:16', f: 'c',
      q: 'El sol representa a Cristo, a quien Malaquías 4:2 llama Sol de justicia.', a: true,
      e: 'Verdadero. Por eso el rostro de Jesús brilla «como el sol» en 1:16. Fuente: Bohr, <i>15 principios</i> 2:105.' },
  ],

  tarjetas: [
    { f: 'Primeras palabras del libro (1:1)', r: '«La revelación de Jesucristo»' },
    { f: 'La cadena del mensaje (1:1)', r: 'Dios → Jesucristo → su ángel → su siervo Juan' },
    { f: 'Las tres cosas del bienaventurado (1:3)', r: 'Leer, oír y guardar, «porque el tiempo está cerca»' },
    { f: 'Tres títulos de Jesús (1:5)', r: 'El testigo fiel, el primogénito de los muertos, el soberano de los reyes de la tierra' },
    { f: '«Yo soy el Alfa y la Omega, principio y fin»', r: 'Apocalipsis 1:8' },
    { f: 'Dónde estaba Juan y por qué (1:9)', r: 'En la isla llamada Patmos, por la palabra de Dios y el testimonio de Jesucristo' },
    { f: 'Las siete iglesias, en orden (1:11)', r: 'Éfeso, Esmirna, Pérgamo, Tiatira, Sardis, Filadelfia, Laodicea' },
    { f: 'Ojos, pies y voz del Hijo del hombre (1:14-15)', r: 'Ojos como llama de fuego, pies como bronce pulido, voz como muchas aguas' },
    { f: 'Qué tiene en la diestra y qué sale de su boca (1:16)', r: 'Siete estrellas; una espada aguda de dos filos' },
    { f: 'Las llaves que tiene Jesús (1:18)', r: 'Las de la muerte y del Hades' },
    { f: 'Estrellas y candelabros (1:20)', r: 'Estrellas = ángeles de las iglesias; candelabros = las siete iglesias' },
  ],
};
