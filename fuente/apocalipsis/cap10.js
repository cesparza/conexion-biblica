/* Apocalipsis 10 — El ángel fuerte y el librito abierto. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap10', label: 'Apocalipsis 10', sub: 'El ángel con el librito', vs: 11,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Juan vio bajar del cielo un <strong>ángel fuerte</strong>, envuelto en
      una nube, con el <strong>arco iris</strong> sobre la cabeza. Tenía en la
      mano un <strong>librito abierto</strong> y puso un pie sobre el
      <strong>mar</strong> y el otro sobre la <strong>tierra</strong>.<br><br>
      El ángel gritó como ruge un león y hablaron <strong>siete
      truenos</strong>, pero a Juan le dijeron que no escribiera lo que
      dijeron.<br><br>
      Después Juan se <strong>comió el librito</strong>: en la boca era
      <strong>dulce como la miel</strong>, pero en el vientre se volvió
      <strong>amargo</strong>.<br><br>
      <em>La idea del capítulo: Dios abre su mensaje a tiempo, y hay que
      llevarlo otra vez a todo el mundo, aunque a veces duela.</em>`) },

    { t: '⚡ El ángel fuerte (10:1-3)', capa: 'nucleo', h:
      tbl(['Parte', 'Cómo era'], [
        ['De dónde venía', 'Descendía <strong>del cielo</strong>, «otro ángel fuerte» (10:1)'],
        ['Vestido', '<strong>Envuelto en una nube</strong> (10:1)'],
        ['Cabeza', 'Con <strong>el arco iris</strong> sobre su cabeza (10:1)'],
        ['Rostro', 'Como <strong>el sol</strong> (10:1)'],
        ['Pies', 'Como <strong>columnas de fuego</strong> (10:1)'],
        ['En la mano', 'Un <strong>librito abierto</strong> (10:2)'],
        ['Pie derecho', 'Sobre <strong>el mar</strong> (10:2)'],
        ['Pie izquierdo', 'Sobre <strong>la tierra</strong> (10:2)'],
        ['Su voz', 'Clamó a gran voz, <strong>«como ruge un león»</strong> (10:3)'],
      ]) +
      wa(`No lo cruces con el capítulo 1: allí los pies de Jesús eran como
      <strong>bronce pulido</strong> (1:15); aquí los del ángel son como
      <strong>columnas de fuego</strong> (10:1).`) },

    { t: '🔇 Los siete truenos (10:3-4)', capa: 'nucleo', h:
      hi(`Cuando el ángel clamó, <strong>siete truenos</strong> emitieron sus
      voces (10:3). Juan iba a escribir, pero una voz del cielo le dijo:
      <strong>«Sella las cosas que los siete truenos han dicho, y no las
      escribas»</strong> (10:4).<br><br>
      Es la única vez en el libro que a Juan se le manda no escribir algo.`) +
      wa(`Un par que se confunde: aquí la orden es <strong>«Sella»</strong>
      (10:4). Al final del libro es al revés: <strong>«No selles las palabras
      de la profecía de este libro»</strong> (22:10).`) },

    { t: '✋ El juramento del ángel (10:5-7)', capa: 'nucleo', h:
      li([`El ángel, de pie sobre el mar y la tierra, <strong>levantó su mano
           hacia el cielo</strong> (10:5).`,
          `Juró <strong>«por el que vive por los siglos de los siglos»</strong>
           (10:6), el que creó el cielo, la tierra y el mar con todo lo que hay
           en ellos.`,
          `Lo que juró: <strong>«que el tiempo no sería más»</strong> (10:6).`,
          `Cuando el <strong>séptimo ángel</strong> comience a tocar la
           trompeta, <strong>«el misterio de Dios se consumará»</strong> (10:7),
           como lo anunció a sus siervos los profetas.`]) +
      wa(`Dónde va este capítulo: la <strong>sexta</strong> trompeta sonó en
      9:13 y la <strong>séptima</strong> suena en 11:15. Los capítulos 10 y
      11:1-14 son una pausa entre las dos.`) },

    { t: '📖 Juan se come el librito (10:8-10)', capa: 'nucleo', h:
      tbl(['Paso', 'Qué pasó'], [
        ['1', 'La voz del cielo: <strong>«Ve y toma el librito»</strong> (10:8)'],
        ['2', 'Juan le pidió el librito al ángel (10:9)'],
        ['3', 'El ángel: <strong>«Toma y cómelo»</strong> (10:9)'],
        ['4', 'Juan lo tomó <strong>y lo comió</strong> (10:10)'],
        ['5', 'En la boca: <strong>dulce como la miel</strong> (10:10)'],
        ['6', 'En el vientre: <strong>amargo</strong> (10:10)'],
      ]) +
      wa(`El orden importa: <strong>primero dulce</strong> (en la boca),
      <strong>después amargo</strong> (en el vientre).<br>
      Y no lo cruces con el capítulo 5: aquel era un <strong>libro sellado
      con siete sellos</strong> (5:1); este es un <strong>librito
      abierto</strong> (10:2).`) },

    { t: '🌍 Profetizar otra vez (10:11)', capa: 'nucleo', h:
      hi(`Al final le dijeron a Juan: <strong>«Es necesario que profetices otra
      vez sobre muchos pueblos, naciones, lenguas y reyes»</strong> (10:11).
      <br><br>
      Son cuatro: <strong>pueblos, naciones, lenguas y reyes</strong>. El
      mensaje no se queda guardado: hay que llevarlo de nuevo a todo el
      mundo.`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · El <strong>librito abierto</strong> (10:2) se entiende como el libro de
      <strong>Daniel</strong>, cuyas profecías debían quedar selladas «hasta el
      tiempo del fin» (Daniel 12:4) y se abren en los últimos tiempos.<br>
      · <strong>«El tiempo no sería más»</strong> (10:6) se lee como que, al
      terminar la profecía de las 2.300 tardes y mañanas (Daniel 8:14) en
      <strong>1844</strong>, ya no quedan profecías de tiempo por cumplirse.<br>
      · El librito <strong>dulce y luego amargo</strong> (10:10) se aplica a
      los creyentes que esperaban a Jesús en 1844: la alegría de estudiar la
      profecía y después el <strong>gran chasco</strong>, cuando Jesús no
      vino.<br>
      · <strong>«Es necesario que profetices otra vez»</strong> (10:11) se ve
      como el llamado a seguir predicando a todo el mundo, que continúa en los
      mensajes de los tres ángeles (14:6-12).<br>
      Muchos cristianos de otras iglesias lo leen de otra manera; aquí se
      presenta la lectura del Comentario Bíblico Adventista y de los escritos
      de Elena de White.`) },
  ],

  preguntas: [
    { t: 'mc', v: '10:1', lit: 'con el arco iris sobre su cabeza',
      q: '¿Qué tenía sobre su cabeza el ángel fuerte? (Apocalipsis 10:1)',
      o: ['El arco iris', 'Una corona de oro', 'Siete diademas', 'Doce estrellas'], a: 0,
      e: '«…envuelto en una nube, con el arco iris sobre su cabeza» (10:1).' },
    { t: 'mc', v: '10:1', lit: 'sus pies como columnas de fuego',
      q: '¿Cómo eran los pies del ángel fuerte? (Apocalipsis 10:1)',
      o: ['Como columnas de fuego', 'Como bronce pulido', 'Como columnas de mármol', 'Como pies de oso'], a: 0,
      e: '«Su rostro era como el sol y sus pies como columnas de fuego» (10:1). Los pies «semejantes al bronce pulido» son los de Jesús en 1:15.' },
    { t: 'tf', v: '10:1',
      q: 'El ángel fuerte de Apocalipsis 10:1 descendió del cielo envuelto en una nube.', a: true,
      e: 'Verdadero: «Vi descender del cielo otro ángel fuerte, envuelto en una nube» (10:1).' },
    { t: 'mc', v: '10:2', lit: 'Tenía en su mano un librito abierto',
      q: '¿Qué tenía el ángel en su mano? (Apocalipsis 10:2)',
      o: ['Un librito abierto', 'Un libro con siete sellos', 'Una caña de medir', 'Una hoz aguda'], a: 0,
      e: '«Tenía en su mano un librito abierto» (10:2). El libro sellado con siete sellos es el de 5:1; la caña, la de 11:1.' },
    { t: 'mc', v: '10:2', lit: 'puso su pie derecho sobre el mar y el izquierdo sobre la tierra',
      q: '¿Dónde puso el ángel sus pies? (Apocalipsis 10:2)',
      o: ['El derecho sobre el mar y el izquierdo sobre la tierra', 'El derecho sobre la tierra y el izquierdo sobre el mar', 'Los dos sobre el monte de Sion, junto al Cordero', 'Los dos sobre el mar de vidrio delante del trono'], a: 0,
      e: '«…puso su pie derecho sobre el mar y el izquierdo sobre la tierra» (10:2).' },
    { t: 'tf', v: '10:2',
      q: 'El ángel puso su pie derecho sobre la tierra y el izquierdo sobre el mar. (Apocalipsis 10:2)', a: false,
      e: 'Falso: el DERECHO sobre el mar y el IZQUIERDO sobre la tierra (10:2).' },
    { t: 'mc', v: '10:3', lit: 'como ruge un león',
      q: '¿Cómo clamó el ángel fuerte? (Apocalipsis 10:3)',
      o: ['A gran voz, como ruge un león', 'A gran voz, como de trompeta', 'Como estruendo de muchas aguas', 'Con voz suave, como de brisa'], a: 0,
      e: '«…y clamó a gran voz, como ruge un león» (10:3).' },
    { t: 'mc', v: '10:3', lit: 'siete truenos emitieron sus voces',
      q: '¿Qué pasó cuando el ángel clamó? (Apocalipsis 10:3)',
      o: ['Siete truenos emitieron sus voces', 'Siete trompetas sonaron a la vez', 'Hubo un gran terremoto en la tierra', 'Cayó del cielo granizo grande'], a: 0,
      e: '«…cuando hubo clamado, siete truenos emitieron sus voces» (10:3).' },
    { t: 'mc', v: '10:4', lit: 'Sella las cosas que los siete truenos han dicho',
      q: '¿Qué le dijo la voz del cielo a Juan sobre lo que dijeron los siete truenos? (Apocalipsis 10:4)',
      o: ['Que lo sellara y no lo escribiera', 'Que lo escribiera y lo enviara', 'Que lo predicara a las naciones', 'Que lo leyera a las siete iglesias'], a: 0,
      e: '«Sella las cosas que los siete truenos han dicho, y no las escribas» (10:4).' },
    { t: 'mc', v: '10:4',
      q: '¿Qué texto dice «Sella las cosas que los siete truenos han dicho, y no las escribas»?',
      o: ['Apocalipsis 10:4', 'Apocalipsis 10:3', 'Apocalipsis 10:7', 'Apocalipsis 22:10'], a: 0,
      e: 'Apocalipsis 10:4. Ojo: en 22:10 es al revés, «No selles las palabras de la profecía de este libro».' },
    { t: 'tf', v: '10:5',
      q: 'El ángel que estaba de pie sobre el mar y sobre la tierra levantó su mano hacia el cielo. (Apocalipsis 10:5)', a: true,
      e: 'Verdadero (Apocalipsis 10:5).' },
    { t: 'mc', v: '10:6', lit: 'que el tiempo no sería más',
      q: '¿Qué juró el ángel? (Apocalipsis 10:6)',
      o: ['Que el tiempo no sería más', 'Que el fin llegaría en siete días', 'Que los truenos hablarían otra vez', 'Que el templo sería medido pronto'], a: 0,
      e: '«…y juró por el que vive por los siglos de los siglos… que el tiempo no sería más» (10:6).' },
    { t: 'mc', v: '10:6', lit: 'juró por el que vive por los siglos de los siglos',
      q: '¿Por quién juró el ángel? (Apocalipsis 10:6)',
      o: ['Por el que vive por los siglos de los siglos', 'Por el templo de Dios y por su altar', 'Por el Cordero que está en el trono', 'Por los siete espíritus de Dios'], a: 0,
      e: 'Juró «por el que vive por los siglos de los siglos, que creó el cielo… la tierra… y el mar» (10:6).' },
    { t: 'fill', v: '10:6', ins: 'Apocalipsis 10:6 (RV1995) — Completa:',
      p: [{ x: '«y juró por el que vive por los ' }, { b: 'siglos', h: '¿por los qué?' }, { x: ' de los siglos, que creó el cielo … que el ' }, { b: 'tiempo', h: '¿qué no sería más?' }, { x: ' no sería más»' }] },
    { t: 'mc', v: '10:7', lit: 'el misterio de Dios se consumará',
      q: 'Según Apocalipsis 10:7, ¿qué pasará cuando el séptimo ángel comience a tocar la trompeta?',
      o: ['El misterio de Dios se consumará', 'Los siete truenos hablarán otra vez', 'El librito será sellado de nuevo', 'La mujer huirá hacia el desierto'], a: 0,
      e: '«…cuando él comience a tocar la trompeta, el misterio de Dios se consumará» (10:7).' },
    { t: 'tf', v: '10:7',
      q: 'Según Apocalipsis 10:7, el misterio de Dios se consumará en los días de la voz del quinto ángel.', a: false,
      e: 'Falso: en los días de la voz del SÉPTIMO ángel (10:7).' },
    { t: 'mc', v: '10:8', lit: 'Ve y toma el librito',
      q: '¿Qué le mandó a Juan la voz del cielo en Apocalipsis 10:8?',
      o: ['Que fuera y tomara el librito', 'Que midiera el templo de Dios', 'Que escribiera a las iglesias', 'Que subiera a ver el trono'], a: 0,
      e: '«Ve y toma el librito que está abierto en la mano del ángel» (10:8). La orden de medir el templo es de 11:1.' },
    { t: 'tf', v: '10:8',
      q: 'La voz del cielo mandó a Juan tomar el librito de la mano del ángel que estaba sobre el mar y sobre la tierra. (Apocalipsis 10:8)', a: true,
      e: 'Verdadero (Apocalipsis 10:8).' },
    { t: 'mc', v: '10:9', lit: 'Toma y cómelo',
      q: '¿Qué texto dice «Toma y cómelo; te amargará el vientre, pero en tu boca será dulce como la miel»?',
      o: ['Apocalipsis 10:9', 'Apocalipsis 10:10', 'Apocalipsis 10:8', 'Apocalipsis 10:11'], a: 0,
      e: 'Apocalipsis 10:9: lo dice el ángel. En 10:10 Juan cuenta lo que pasó cuando lo comió.' },
    { t: 'fill', v: '10:9', ins: 'Apocalipsis 10:9 (RV1995) — Completa:',
      p: [{ x: '«Toma y cómelo; te amargará el ' }, { b: 'vientre', h: '¿qué le amargará?' }, { x: ', pero en tu boca será dulce como la ' }, { b: 'miel', h: '¿dulce como qué?' }, { x: '.»' }] },
    { t: 'mc', v: '10:10', lit: 'En mi boca era dulce como la miel, pero cuando lo hube comido amargó mi vientre',
      q: '¿Qué sintió Juan al comer el librito? (Apocalipsis 10:10)',
      o: ['Dulce en la boca y amargo en el vientre', 'Amargo en la boca y dulce en el vientre', 'Dulce en la boca y dulce en el vientre', 'Amargo en la boca y amargo en el vientre'], a: 0,
      e: '«En mi boca era dulce como la miel, pero cuando lo hube comido amargó mi vientre» (10:10).' },
    { t: 'tf', v: '10:10',
      q: 'Cuando Juan comió el librito, en su boca era amargo. (Apocalipsis 10:10)', a: false,
      e: 'Falso: en su boca era DULCE como la miel; lo amargo fue en el vientre (10:10).' },
    { t: 'mc', v: '10:11', lit: 'Es necesario que profetices otra vez',
      q: '¿Qué le dijeron a Juan después de comer el librito? (Apocalipsis 10:11)',
      o: ['Que profetizara otra vez sobre muchos pueblos', 'Que sellara el librito hasta el fin', 'Que volviera a la isla de Patmos', 'Que guardara silencio por tres días'], a: 0,
      e: '«Es necesario que profetices otra vez sobre muchos pueblos, naciones, lenguas y reyes» (10:11).' },
    { t: 'fill', v: '10:11', ins: 'Apocalipsis 10:11 (RV1995) — Completa:',
      p: [{ x: '«Es necesario que ' }, { b: 'profetices', h: '¿qué debía hacer?' }, { x: ' otra vez sobre muchos pueblos, naciones, lenguas y ' }, { b: 'reyes', h: 'la cuarta palabra de la lista' }, { x: '.»' }] },
    { t: 'mc', v: '10:2', f: 'c',
      q: 'En la lectura adventista, ¿qué libro es el librito abierto de Apocalipsis 10:2?',
      o: ['El libro de Daniel', 'El libro de Ezequiel', 'El libro de la vida', 'El libro de Isaías'], a: 0,
      e: 'Interpretación: Daniel, cuyas profecías se sellaron «hasta el tiempo del fin» (Daniel 12:4). El texto de 10:2 solo dice «un librito abierto».' },
    { t: 'mc', v: '10:6', f: 'c',
      q: 'En la interpretación adventista, ¿qué quiere decir «el tiempo no sería más» (10:6)?',
      o: ['Que tras 1844 no quedan profecías de tiempo', 'Que Jesús vendría ese mismo año', 'Que ya no habría días ni noches', 'Que los relojes se detendrían'], a: 0,
      e: 'Interpretación: al terminar las 2.300 tardes y mañanas (Daniel 8:14) en 1844, no quedan más profecías de tiempo. El texto solo dice «que el tiempo no sería más» (10:6).' },
    { t: 'mc', v: '10:10', f: 'c',
      q: 'En la lectura adventista, ¿qué experiencia se ve en el librito dulce en la boca y amargo en el vientre?',
      o: ['El gran chasco de 1844', 'La caída de Jerusalén', 'La persecución de Nerón', 'La reforma de Lutero'], a: 0,
      e: 'Interpretación: la alegría de esperar a Jesús en 1844 y la amargura cuando no vino. El texto solo cuenta que fue dulce en la boca y amargo en el vientre (10:10).' },
  ],

  tarjetas: [
    { f: 'Cómo era el ángel fuerte (10:1)', r: 'Envuelto en una nube, con el arco iris sobre la cabeza, rostro como el sol, pies como columnas de fuego' },
    { f: 'Qué tenía en la mano el ángel (10:2)', r: 'Un librito abierto' },
    { f: 'Dónde puso los pies (10:2)', r: 'El derecho sobre el mar y el izquierdo sobre la tierra' },
    { f: 'Cómo clamó el ángel (10:3)', r: 'A gran voz, como ruge un león; y siete truenos emitieron sus voces' },
    { f: '«Sella las cosas que los siete truenos han dicho, y no las escribas»', r: 'Apocalipsis 10:4' },
    { f: 'Qué juró el ángel (10:6)', r: '«Que el tiempo no sería más»' },
    { f: 'Cuándo se consuma el misterio de Dios (10:7)', r: 'Cuando el séptimo ángel comience a tocar la trompeta' },
    { f: 'El librito en la boca y en el vientre (10:10)', r: 'Dulce como la miel en la boca; amargo en el vientre' },
    { f: 'Sobre quiénes debía profetizar otra vez (10:11)', r: 'Muchos pueblos, naciones, lenguas y reyes' },
    { f: 'Librito abierto vs. libro sellado', r: 'Librito abierto: 10:2. Libro sellado con siete sellos: 5:1' },
  ],
};
