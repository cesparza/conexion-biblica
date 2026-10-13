/* Apocalipsis 10 — El ángel fuerte y el librito abierto. */
const { tbl, hi, wa, li } = require('./ayudas.js');
/* Línea de fuente al pie de cada sección de interpretación. */
const fu = t => `<p class="fuente"><small>${t}</small></p>`;

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

    { t: '🧭 El ángel fuerte es Cristo (10:1-3)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Ningún pasaje describe
      mejor el origen, el mensaje y la misión de la Iglesia Adventista que
      Apocalipsis 10. El capítulo es un paréntesis dentro de la <strong>sexta
      trompeta</strong>, en «el tiempo del fin».<br><br>
      El ángel poderoso que instruyó a Juan «no es ni más ni menos que
      Jesucristo» (CBA 7:971). Las otras escenas lo confirman:`) +
      li([`Rostro como el sol y pies como columnas de fuego: como Jesús en
           1:15-16.`,
          `Ruge como un león: Jesús es el León de la tribu de Judá (5:5).`,
          `El arco iris sobre su cabeza: une la misericordia y la justicia de
           Dios.`]) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 42, 44 y 46; CBA 7:971; Ed 102-103.`) },

    { t: '🧭 El librito abierto: Daniel (10:2)', capa: 'contexto', h:
      li([`<strong>Qué libro es.</strong> En la Biblia solo un libro se cerró y
           se selló «hasta el tiempo del fin»: la parte de Daniel que habla de
           los últimos días (Daniel 12:4). Es Daniel 8 a 12, sobre todo los
           <strong>2.300 días</strong> y el comienzo del juicio (Daniel
           8:14).`,
          `<strong>Desde cuándo está abierto.</strong> En griego, «abierto» indica
           algo que se abrió antes y sigue abierto: el libro se abrió al
           comenzar el tiempo del fin, en <strong>1798</strong>, y entre 1798
           y 1844 hubo un gran despertar en el estudio de Daniel y el
           Apocalipsis.`,
          `<strong>Un pie en el mar y otro en la tierra.</strong> El mensaje
           cruzará el océano y llegará a todo el mundo. Además, el ángel
           reclama el planeta como suyo (Deuteronomio 11:24), y lo recibe en la
           séptima trompeta (11:15).`]) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46-49; Bohr, <i>Apocalipsis 10</i>, p. 1-2; 2MS 123.`) },

    { t: '🧭 Los siete truenos (10:3-4)', capa: 'contexto', h:
      hi(`El trueno puede ser una voz que se entiende: en Juan 12:28-29 la voz
      del Padre sonó como trueno. Juan sí entendió los siete truenos, pero
      recibió la orden de no escribirlos.<br><br>
      Los truenos eran «una delineación de los eventos» que pasarían bajo los
      mensajes del primer y segundo ángel (CBA 7:971). No convenía que la gente
      los conociera, porque su fe debía ser probada.`) +
      li([`Guillermo Miller esperó a Jesús primero en la primavera de 1843 y
           luego en el otoño de 1843: hubo chascos.`,
          `El 12 de agosto de 1844 Samuel Snow mostró que el día de la
           expiación de ese año caía el <strong>22 de octubre</strong>.`,
          `Los truenos van entre 1842 y la primavera de 1844, después de
           abrirse el libro (1798) y antes del juramento (otoño de 1844).`]) +
      wa(`Algunos creen que los truenos aún no se cumplen. Pero eran futuros
      para Daniel y Juan, no para los que vivieron en 1844.`) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 51-54; CBA 7:971.`) },

    { t: '🧭 «El tiempo no sería más» (10:5-7)', capa: 'contexto', h:
      li([`<strong>Qué tiempo.</strong> No es el fin de la historia ni del
           tiempo de gracia, sino el fin del <strong>tiempo profético</strong>.
           El cálculo más largo llega al otoño de 1844, y después no habrá otro
           mensaje basado en una fecha.`,
          `<strong>Por qué no es el fin del mundo.</strong> Después del juramento
           Juan debe profetizar otra vez (10:11) y medir el templo (11:1).`,
          `<strong>No es «demora».</strong> La palabra griega es
           <em>chronos</em>, «tiempo», y nunca se traduce «demora» en el Nuevo
           Testamento.`,
          `<strong>Jura por el Creador</strong> «que creó el cielo y las cosas
           que están en él» (10:6), como el primer ángel llama a adorar al que
           hizo el cielo y la tierra (14:7): eso apunta al sábado.`,
          `<strong>El misterio de Dios (10:7)</strong> es el evangelio
           (Romanos 16:25-26). Se consuma cuando la séptima trompeta está «a
           punto» de sonar: se cierra la gracia y termina la predicación.`]) +
      wa(`Por eso <strong>no se fijan fechas</strong> para la venida de Jesús
      ni para otros sucesos.`) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 54-61; Bohr, <i>Apocalipsis 10</i>, p. 3-5.`) },

    { t: '🧭 Dulce y amargo: el chasco de 1844 (10:8-10)', capa: 'contexto', h:
      hi(`Comer el libro es entender el mensaje y recibirlo con gozo (compara
      Ezequiel 3:1-4). <strong>Dulce</strong> fue el mensaje de la hora del
      juicio: los milleritas creían que Jesús vendría el 22 de octubre de
      1844. <strong>Amargo</strong> fue el gran chasco, cuando no vino. Hiram
      Edson escribió que lloraron hasta el amanecer.<br><br>
      Acertaron en la fecha y se equivocaron en el evento: ese día Jesús
      entró al <strong>lugar santísimo</strong> del santuario celestial
      para comenzar el juicio.`) +
      tbl(['Discípulos (año 31)', 'Milleritas (1844)'], [
        ['Entrada triunfal: esperaban un reino en la tierra', 'Esperaban la venida de Jesús'],
        ['Se cumplió la profecía de las 70 semanas', 'Se cumplió la de los 2.300 días'],
        ['Chasco en la cruz', 'Gran chasco del 22 de octubre'],
        ['Jesús entró al lugar santo', 'Jesús entró al lugar santísimo'],
        ['Un remanente formó la iglesia', 'Un remanente formó la Iglesia Adventista'],
      ]) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 65-69.`) },

    { t: '🧭 Profetizar otra vez (10:11)', capa: 'contexto', h:
      li([`<strong>Un quiasmo</strong> (estructura en espejo): «toma y cómelo»
           (10:9) corresponde a «es necesario que profetices otra vez» (10:11).
           Comer el libro es predicar su mensaje; después del chasco había que
           predicarlo <strong>de nuevo</strong>, con mejor comprensión.`,
          `<strong>El nuevo mensaje</strong> es el de los tres ángeles
           (14:6-12): mundial, centrado en el Creador y en la hora del juicio,
           que ahora incluye medir el templo (11:1).`,
          `<strong>Juan representa a un pueblo.</strong> Un hombre solo no
           podía predicar a «muchos pueblos, naciones, lenguas y reyes»
           (10:11): lo cumple un movimiento.`,
          `<strong>Ante reyes</strong>, porque los reyes de la tierra se unen a
           la ramera (17:2; 18:3) y deben ser advertidos.`]) +
      wa(`Esta es «la razón de nuestro existir»: Dios levantó a la Iglesia
      Adventista poco después de 1844 para profetizar otra vez.`) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 70-72 y 82.`) },

    { t: '🧭 Apocalipsis 10 en orden de tiempo', capa: 'contexto', h:
      tbl(['Versículos', 'Qué pasa', 'Cuándo'], [
        ['10:1-2', 'Baja el ángel con el librito abierto', '1798 en adelante'],
        ['10:3-4', 'Suenan los siete truenos', '1842 a primavera de 1844'],
        ['10:5-6', 'Jura que el tiempo no sería más', '22 de octubre de 1844'],
        ['10:8-10', 'Juan come el librito: dulce y amargo', 'Antes y después del chasco'],
        ['10:11 · 11:1', 'Profetizar otra vez y medir el templo', 'Desde 1844'],
        ['10:7', 'Se consuma el misterio de Dios', 'Cierre del tiempo de gracia'],
        ['11:15', 'Suena la séptima trompeta', 'Cristo toma el reino'],
      ]) +
      wa(`El versículo 7 está escrito antes, pero se cumple al final: es una
      nota que mira hacia adelante.`) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 45, 54 y 65.`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Ángel fuerte (10:1)', 'Cristo', 'Apocalipsis 1:16: «su rostro era como el sol»; 5:5: «el León de la tribu de Judá»'],
        ['Arco iris (10:1)', 'El pacto y la misericordia de Dios', 'Génesis 9:13-16; Ezequiel 1:28'],
        ['Librito abierto (10:2)', 'La parte de Daniel sellada para el fin', 'Daniel 12:4: «sella el libro hasta el tiempo del fin»; 12:9'],
        ['Pies sobre el mar y la tierra (10:2)', 'Cristo reclama todo el mundo; el mensaje irá a todas partes', 'Deuteronomio 11:24'],
        ['Trueno (10:3)', 'Una voz de Dios que se entiende', 'Juan 12:28-29'],
        ['Comer el libro (10:9)', 'Recibir el mensaje y hacerlo propio para predicarlo', 'Ezequiel 3:1-4'],
      ]) +
      fu(`Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46-51; Bohr, <i>15 principios</i> 2:106 y 216.`) },
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
    { t: 'mc', v: '10:1', f: 'c',
      q: '¿Quién es el ángel fuerte de Apocalipsis 10?',
      o: ['Jesucristo', 'El ángel Gabriel', 'Guillermo Miller', 'El primer ángel de Apocalipsis 14'], a: 0,
      e: '«El ángel poderoso que instruyó a Juan no es ni más ni menos que Jesucristo» (CBA 7:971). Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46; CBA 7:971.' },
    { t: 'mc', v: '10:1', f: 'c',
      q: '¿Qué representa el arco iris sobre la cabeza del ángel?',
      o: ['La unión de la misericordia y la justicia de Dios', 'La paz entre las naciones de la tierra', 'Las siete iglesias de Asia', 'La gloria de los ángeles del cielo'], a: 0,
      e: 'El arco sobre el trono representa la unión de la misericordia y la justicia de Dios. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46; Ed 102-103.' },
    { t: 'mc', v: '10:2', f: 'c',
      q: '¿Qué es el librito abierto en la mano del ángel?',
      o: ['La parte de Daniel sellada hasta el fin', 'El libro de la vida del Cordero', 'El libro de los siete sellos', 'El rollo que comió Ezequiel'], a: 0,
      e: 'Es la parte de Daniel que se cerró y selló «hasta el tiempo del fin» (Daniel 12:4): Daniel 8 a 12, sobre todo los 2.300 días. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46-47.' },
    { t: 'mc', v: '10:2', f: 'c',
      q: '¿Desde cuándo estaba abierto el librito?',
      o: ['Desde 1798, al comenzar el tiempo del fin', 'Desde 1844, después del gran chasco', 'Desde el año 538, con el papado', 'Desde que Juan escribió en Patmos'], a: 0,
      e: 'El verbo griego indica algo abierto antes y que sigue abierto: el libro se abrió en 1798 y luego el ángel bajó con él en la mano. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46-47.' },
    { t: 'mc', v: '10:2', f: 'c',
      q: '¿Qué significa que el ángel ponga un pie en el mar y otro en la tierra?',
      o: ['Que el mensaje irá a todo el mundo', 'Que el ángel viene a destruir la tierra', 'Que el juicio es solo para Europa', 'Que el mar y la tierra serán renovados'], a: 0,
      e: 'La posición del ángel indica la extensión mundial del mensaje: cruzará el océano y llegará a otros países. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 48; 2MS 123.' },
    { t: 'mc', v: '10:3-4', f: 'c',
      q: '¿Qué eran los siete truenos?',
      o: ['Sucesos bajo los mensajes del 1.º y 2.º ángel', 'Las siete plagas del capítulo 16', 'Siete juicios sobre el Imperio otomano', 'Las siete iglesias del capítulo 2 y 3'], a: 0,
      e: 'Eran «una delineación de los eventos» que ocurrirían bajo los mensajes del primer y segundo ángel (CBA 7:971). Van entre 1842 y la primavera de 1844. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 52; CBA 7:971.' },
    { t: 'tf', v: '10:4', f: 'c',
      q: 'Los siete truenos son sucesos que todavía no se han cumplido.', a: false,
      e: 'Falso: eran futuros para Daniel y Juan, no para los que vivieron en 1844; se cumplieron entre 1842 y 1844 con los chascos del movimiento millerita. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 52-54.' },
    { t: 'mc', v: '10:6', f: 'c',
      q: '¿Qué quiere decir que «el tiempo no sería más»?',
      o: ['Que terminó el tiempo profético en 1844', 'Que terminó el tiempo de gracia', 'Que ya no habría más demora', 'Que la historia del mundo terminó'], a: 0,
      e: 'No es el fin de la historia ni del tiempo de gracia, sino de los tiempos proféticos: el cálculo más largo llega al otoño de 1844. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 54-55.' },
    { t: 'tf', v: '10:6', f: 'c',
      q: '«el tiempo no sería más» se traduce bien como «ya no habrá más demora».', a: false,
      e: 'Falso: la palabra griega es chronos, «tiempo», y en el Nuevo Testamento nunca se traduce «demora». Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 55.' },
    { t: 'mc', v: '10:5-6', f: 'c',
      q: '¿Cuándo se cumple el juramento del ángel?',
      o: ['El 22 de octubre de 1844', 'El 11 de agosto de 1840', 'En la primavera de 1843', 'En el año 1798'], a: 0,
      e: 'Primero se abre el libro (1798), luego suenan los truenos (1842-1844) y el juramento llega el 22 de octubre de 1844. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 54.' },
    { t: 'mc', v: '10:6', f: 'c',
      q: '¿Con qué mensaje une el juramento «por el que creó el cielo», la tierra y el mar?',
      o: ['El del primer ángel y el sábado (14:7)', 'El de la caída de Babilonia (14:8)', 'El de la marca de la bestia (14:9)', 'El de la siega de la tierra (14:15)'], a: 0,
      e: 'El ángel jura por el Creador, y el primer ángel llama a adorar al que hizo el cielo, la tierra y el mar (14:7): los dos llevan al cuarto mandamiento y al sábado. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 56-57.' },
    { t: 'mc', v: '10:7', f: 'c',
      q: '¿Qué es «el misterio de Dios» que se consumará?',
      o: ['El evangelio de la salvación', 'La fecha de la segunda venida', 'Lo que dijeron los siete truenos', 'El nombre secreto del ángel'], a: 0,
      e: 'Es el evangelio, oculto desde la eternidad y revelado desde Génesis 3:15 (Romanos 16:25-26). Se consuma cuando la séptima trompeta está a punto de sonar y se cierra la gracia. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 59-61.' },
    { t: 'mc', v: '10:9-10', f: 'c',
      q: '¿Qué experiencia muestra el librito dulce en la boca y amargo en el vientre?',
      o: ['El mensaje de 1844 y el gran chasco', 'La caída de Jerusalén en el año 70', 'La persecución de los 1.260 años', 'La Reforma protestante del siglo XVI'], a: 0,
      e: 'Dulce fue el mensaje de que Jesús vendría el 22 de octubre de 1844; amargo, el chasco cuando no vino. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 65-67.' },
    { t: 'mc', v: '10:10', f: 'c',
      q: '¿Con qué experiencia bíblica se parece el chasco de 1844?',
      o: ['El chasco de los discípulos tras la entrada triunfal', 'El de Israel ante los muros de Jericó', 'El de Elías en el monte Carmelo', 'El de Noé mientras construía el arca'], a: 0,
      e: 'Los discípulos esperaban un reino en la tierra, se cumplió la profecía de las 70 semanas y quedaron chasqueados; un remanente formó la iglesia. Lo mismo pasó en 1844 con los 2.300 días. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 68-69.' },
    { t: 'mc', v: '10:11', f: 'c',
      q: '¿Qué mensaje cumple el mandato de «profetizar otra vez»?',
      o: ['Los mensajes de los tres ángeles (14:6-12)', 'La predicación de la Reforma protestante', 'La fundación de las sociedades bíblicas', 'El mensaje de Juan a las siete iglesias'], a: 0,
      e: 'Después del chasco había que predicar de nuevo, con mejor comprensión: el mensaje del primer ángel y los otros dos (14:6-12). Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 69 y 72.' },
    { t: 'tf', v: '10:11', f: 'c',
      q: 'En Apocalipsis 10 Juan representa a un movimiento del tiempo del fin.', a: true,
      e: 'Verdadero: un hombre solo no podía profetizar a muchos pueblos, naciones, lenguas y reyes; un mensaje mundial pide un pueblo mundial. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 70.' },
    { t: 'mc', v: '10:9', f: 'c',
      q: '¿Qué pasaje del Antiguo Testamento explica el acto de comer el librito?',
      o: ['Ezequiel 3:1-4', 'Jeremías 1:9-10', 'Isaías 6:6-7', 'Zacarías 5:1-4'], a: 0,
      e: 'A Ezequiel le mandan comer un rollo y luego hablar a Israel (Ezequiel 3:1-4): comer el libro es recibir el mensaje para predicarlo. Fuente: Bohr, <i>15 principios</i> 2:106 y 216; Bohr, <i>La razón de nuestro existir</i>, p. 66.' },
    { t: 'mc', v: '10:1', f: 'c',
      q: '¿Qué trasfondo bíblico tiene el arco iris sobre la cabeza del ángel?',
      o: ['El pacto con Noé y la visión de Ezequiel', 'La columna de nube del desierto', 'La gloria que llenó el templo de Salomón', 'La transfiguración de Jesús en el monte'], a: 0,
      e: 'El arco iris remite al pacto de Dios con Noé (Génesis 9:13-16) y al trono de Dios en Ezequiel 1:28. Fuente: Bohr, <i>15 principios</i> 2:216.' },
    { t: 'tf', v: '10:3', f: 'c',
      q: 'En Juan 12:28-29 la voz del Padre sonó como un trueno; por eso un trueno puede ser un mensaje que se entiende.', a: true,
      e: 'Verdadero: la multitud dijo que había sido un trueno, pero era la voz del Padre. Así, Juan entendió lo que dijeron los siete truenos. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 51-52.' },
    { t: 'mc', v: '10:2', f: 'c',
      q: '¿Qué texto de Daniel manda sellar el libro «hasta el tiempo del fin»?',
      o: ['Daniel 12:4', 'Daniel 8:14', 'Daniel 7:10', 'Daniel 9:24'], a: 0,
      e: '«Pero tú, Daniel, cierra las palabras y sella el libro hasta el tiempo del fin» (Daniel 12:4). Ese libro sellado es el librito que el ángel trae abierto. Fuente: Bohr, <i>La razón de nuestro existir</i>, p. 46-47.' },
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
