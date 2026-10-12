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

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · El <strong>«día del Señor»</strong> (1:10) se entiende como el sábado,
      porque Jesús dijo que el Hijo del hombre es Señor del sábado (Mateo
      12:8; Marcos 2:28).<br>
      · Las <strong>siete iglesias</strong> eran iglesias reales de Asia, y
      también se leen como siete etapas de la iglesia cristiana, desde los
      apóstoles hasta el fin.<br>
      · Jesús <strong>caminando entre los candelabros</strong> muestra que
      está cerca de su iglesia y la cuida.`) },
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
      q: 'En la lectura adventista, ¿qué día es «el día del Señor» de Apocalipsis 1:10?',
      o: ['El sábado', 'El domingo', 'El día del juicio final', 'El día de la Pascua'], a: 0,
      e: 'Interpretación: Jesús dijo que el Hijo del hombre es Señor del sábado (Mateo 12:8; Marcos 2:28). El texto de 1:10 solo dice «el día del Señor».' },
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
      q: 'Además de iglesias reales de Asia, ¿cómo se leen las siete iglesias en la interpretación adventista?',
      o: ['Como siete etapas de la iglesia cristiana hasta el fin', 'Como los siete continentes del mundo', 'Como siete ángeles que gobiernan la tierra', 'Como los siete días de la creación'], a: 0,
      e: 'Interpretación: siete períodos de la historia de la iglesia, de los apóstoles al tiempo del fin. El texto solo las nombra (1:11, 1:20).' },
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
