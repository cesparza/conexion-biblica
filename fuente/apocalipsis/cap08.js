/* Apocalipsis 8 — El séptimo sello y las cuatro primeras trompetas.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap8', label: 'Apocalipsis 8', sub: 'El séptimo sello y las primeras trompetas', vs: 13,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Se abre el último de los siete sellos, el <strong>séptimo</strong>, y
      en el cielo hay <strong>silencio como por media hora</strong>.<br><br>
      Siete ángeles reciben <strong>siete trompetas</strong>. Otro ángel, con
      un <strong>incensario de oro</strong>, ofrece incienso junto con
      <strong>las oraciones de los santos</strong>, y el humo sube hasta
      Dios.<br><br>
      Después suenan <strong>cuatro trompetas</strong>. Cada una daña
      <strong>la tercera parte</strong> de algo: de los árboles, del mar, de
      los ríos, del sol, de la luna y de las estrellas. Al final, un ángel grita
      <strong>«¡Ay, ay, ay!»</strong> porque faltan tres trompetas.<br><br>
      <em>La idea del capítulo: Dios oye las oraciones de su pueblo, y estas
      trompetas todavía no son el final.</em>`) },

    { t: '🤫 El séptimo sello (8:1)', capa: 'nucleo', h:
      hi(`<strong>«Cuando abrió el séptimo sello, se hizo silencio en el cielo
      como por media hora»</strong> (8:1).`) +
      tbl(['Serie de siete', 'Dónde está', 'Quién actúa'], [
        ['<strong>Sellos</strong>', 'Capítulo 6 y 8:1', 'Los abre el Cordero (6:1)'],
        ['<strong>Trompetas</strong>', 'Capítulos 8, 9 y 11:15', 'Las tocan siete ángeles (8:2)'],
        ['<strong>Copas</strong>', 'Capítulos 15 y 16', 'Las derraman siete ángeles (16:1)'],
      ]) +
      wa(`No confundas las tres series: los <strong>sellos</strong> se abren,
      las <strong>trompetas</strong> se tocan y las <strong>copas</strong> se
      derraman. El séptimo sello no trae jinete: lo primero que trae
      es <strong>silencio</strong> (8:1).`) },

    { t: '🎺 Los siete ángeles (8:2-6)', capa: 'nucleo', h:
      li([`Juan vio <strong>«los siete ángeles que estaban de pie ante
           Dios»</strong> (8:2).`,
          `A ellos <strong>«se les dieron siete trompetas»</strong> (8:2).`,
          `Antes de que tocaran, vino otro ángel con el incensario (8:3-5).`,
          `Después, <strong>«Los siete ángeles que tenían las siete trompetas se
           dispusieron a tocarlas»</strong> (8:6).`]) },

    { t: '🔥 El incensario de oro (8:3-5)', capa: 'nucleo', h:
      tbl(['Paso', 'Lo que pasó'], [
        ['1', 'Otro ángel se paró ante el altar con <strong>un incensario de oro</strong> (8:3)'],
        ['2', 'Se le dio <strong>mucho incienso</strong> «para añadirlo a las oraciones de todos los santos» (8:3)'],
        ['3', 'Lo ofreció sobre <strong>el altar de oro</strong> que estaba delante del trono (8:3)'],
        ['4', 'El humo del incienso, con las oraciones, subió a la presencia de Dios (8:4)'],
        ['5', 'El ángel llenó el incensario <strong>del fuego del altar</strong> y lo arrojó a la tierra (8:5)'],
        ['6', 'Hubo <strong>truenos, voces, relámpagos y un terremoto</strong> (8:5)'],
      ]) +
      wa(`El mismo incensario se usa dos veces: primero <strong>sube</strong>
      el incienso con las oraciones hacia Dios (8:4); después
      <strong>baja</strong> el fuego del altar a la tierra (8:5).`) },

    { t: '🌳 Las cuatro primeras trompetas (8:7-12)', capa: 'nucleo', h:
      tbl(['Trompeta', 'Qué cae o qué pasa', 'Qué se afecta'], [
        ['1ª (8:7)', 'Granizo y fuego mezclados con sangre, sobre la <strong>tierra</strong>',
         'Se quema la tercera parte de los <strong>árboles</strong> y <strong>toda</strong> la hierba verde'],
        ['2ª (8:8-9)', 'Algo como un gran monte ardiendo en fuego, al <strong>mar</strong>',
         'Un tercio del mar se vuelve sangre; muere un tercio de los seres del mar; se destruye un tercio de las <strong>naves</strong>'],
        ['3ª (8:10-11)', 'Una gran estrella ardiendo como una antorcha, llamada <strong>Ajenjo</strong>',
         'Un tercio de los <strong>ríos</strong>, y las fuentes de las aguas; un tercio de las aguas se vuelve amargo y mueren muchos hombres'],
        ['4ª (8:12)', 'No cae nada: son heridos los astros del <strong>cielo</strong>',
         'Un tercio del <strong>sol, la luna y las estrellas</strong>; un tercio del día y de la noche sin luz'],
      ]) +
      wa(`Truco para el orden: <strong>tierra, mar, ríos, cielo</strong>. Y en
      cada una se habla de <strong>la tercera parte</strong>.`) },

    { t: '🔎 Detalles que se confunden (8:7-12)', capa: 'nucleo', h:
      li([`1ª trompeta: se quema un tercio de los árboles, pero <strong>«toda la
           hierba verde fue quemada»</strong> (8:7). La hierba no es un tercio:
           es toda.`,
          `2ª trompeta: <strong>«La tercera parte del mar se convirtió en
           sangre»</strong> (8:8), y se destruye un tercio de las naves (8:9).`,
          `3ª trompeta: <strong>«El nombre de la estrella es Ajenjo»</strong>
           (8:11). Muchos hombres murieron porque las aguas se volvieron
           amargas.`,
          `4ª trompeta: <strong>«no hubiera luz en la tercera parte del
           día»</strong> (8:12), y lo mismo en la noche.`]) +
      wa(`<strong>Monte</strong> ardiendo → cae al <strong>mar</strong> (2ª).
      <strong>Estrella</strong> ardiendo → cae en los <strong>ríos</strong>
      (3ª).<br>
      La estrella <strong>Ajenjo</strong> es la de la 3ª trompeta; la estrella
      que recibe <strong>la llave del abismo</strong> es la de la 5ª (9:1).`) },

    { t: '📢 ¡Ay, ay, ay! (8:13)', capa: 'nucleo', h:
      hi(`Juan oyó un ángel <strong>que volaba en medio del cielo</strong> y
      decía a gran voz: <strong>«¡Ay, ay, ay de los que habitan en la tierra, a
      causa de los otros toques de trompeta que están para tocar los tres
      ángeles!»</strong> (8:13).`) +
      tbl(['Ay', 'Con qué trompeta'], [
        ['Primer ay', '5ª trompeta (9:12)'],
        ['Segundo ay', '6ª trompeta (11:14)'],
        ['Tercer ay', 'Viene «pronto» después del segundo (11:14)'],
      ]) +
      wa(`Son <strong>tres</strong> ayes porque faltan <strong>tres</strong>
      trompetas: la quinta, la sexta y la séptima.`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Otras iglesias leen estas
      visiones de otra manera; aquí va la lectura adventista.<br><br>
      · El <strong>silencio</strong> del séptimo sello se relaciona con la
      segunda venida de Jesús: el cielo queda en silencio porque los ángeles
      vienen con él (Mateo 25:31).<br>
      · El ángel con el <strong>incensario</strong> recuerda la obra de Cristo
      como sumo sacerdote en el santuario del cielo, que intercede por su pueblo
      y presenta sus oraciones ante Dios (Hebreos 8:1-2).<br>
      · En la lectura clásica adventista, las <strong>cuatro primeras
      trompetas</strong> son las invasiones que derribaron al Imperio romano de
      Occidente.<br>
      · Como en la Biblia la trompeta avisaba de guerra o peligro, las
      trompetas se leen como <strong>advertencias</strong>: golpean un tercio,
      no todo.`) },
  ],

  preguntas: [
    { t: 'mc', v: '8:1', lit: 'se hizo silencio en el cielo como por media hora',
      q: '¿Qué pasó cuando se abrió el séptimo sello? (Apocalipsis 8:1)',
      o: ['Hubo silencio en el cielo como por media hora', 'Hubo un gran terremoto y el sol se oscureció', 'Salió un caballo amarillo con su jinete', 'Las almas bajo el altar clamaron a gran voz'], a: 0,
      e: '«Cuando abrió el séptimo sello, se hizo silencio en el cielo como por media hora» (8:1). El terremoto, el caballo amarillo y las almas bajo el altar son de los sellos del capítulo 6.' },
    { t: 'mc', v: '8:1', lit: 'como por media hora',
      q: '¿Cuánto duró el silencio en el cielo? (Apocalipsis 8:1)',
      o: ['Como media hora', 'Como una hora', 'Como tres días', 'Como siete días'], a: 0,
      e: '«…se hizo silencio en el cielo como por media hora» (8:1).' },
    { t: 'tf', v: '8:1',
      q: 'Al abrirse el sexto sello se hizo silencio en el cielo como por media hora.', a: false,
      e: 'Falso: fue al abrirse el SÉPTIMO sello (8:1).' },
    { t: 'mc', v: '8:1', lit: 'silencio en el cielo',
      q: '¿Qué texto dice «se hizo silencio en el cielo como por media hora»?',
      o: ['Apocalipsis 8:1', 'Apocalipsis 6:12', 'Apocalipsis 8:13', 'Apocalipsis 7:1'], a: 0,
      e: 'Apocalipsis 8:1, cuando se abre el séptimo sello.' },
    { t: 'fill', v: '8:1', ins: 'Apocalipsis 8:1 (RV1995) — Completa:',
      p: [{ x: 'Cuando abrió el ' }, { b: 'séptimo', h: '¿cuál sello?' }, { x: ' sello, se hizo silencio en el cielo como por media ' }, { b: 'hora', h: '¿media qué?' }, { x: '.' }] },
    { t: 'mc', v: '8:1', f: 'c',
      q: 'En la lectura adventista, ¿con qué se relaciona el silencio del séptimo sello?',
      o: ['Con la segunda venida de Jesús', 'Con el sábado de la creación', 'Con la prisión de Juan en Patmos', 'Con la oración callada de la iglesia'], a: 0,
      e: 'Interpretación: el cielo queda en silencio porque los ángeles vienen con Jesús en su segunda venida (Mateo 25:31). El texto solo dice que hubo silencio como por media hora (8:1).' },
    { t: 'mc', v: '8:2', lit: 'se les dieron siete trompetas',
      q: '¿Qué se les dio a los siete ángeles que estaban de pie ante Dios? (Apocalipsis 8:2)',
      o: ['Siete trompetas', 'Siete copas', 'Siete sellos', 'Siete coronas'], a: 0,
      e: '«…vi los siete ángeles que estaban de pie ante Dios, y se les dieron siete trompetas» (8:2). Las siete copas son del capítulo 16.' },
    { t: 'mc', v: '8:3', lit: 'con un incensario de oro',
      q: '¿Qué llevaba el ángel que se paró ante el altar? (Apocalipsis 8:3)',
      o: ['Un incensario de oro', 'Una trompeta de plata', 'Una copa de oro', 'Un librito abierto'], a: 0,
      e: '«Otro ángel vino entonces y se paró ante el altar, con un incensario de oro» (8:3).' },
    { t: 'mc', v: '8:3', lit: 'para añadirlo a las oraciones de todos los santos',
      q: '¿Para qué se le dio mucho incienso al ángel? (Apocalipsis 8:3)',
      o: ['Para añadirlo a las oraciones de todos los santos', 'Para quemarlo sobre la tierra contra los impíos', 'Para llenar las siete copas de los siete ángeles', 'Para ofrecerlo en el templo de Jerusalén'], a: 0,
      e: '«…se le dio mucho incienso para añadirlo a las oraciones de todos los santos» (8:3).' },
    { t: 'fill', v: '8:3', ins: 'Apocalipsis 8:3 (RV1995) — Completa:',
      p: [{ x: 'sobre el altar de ' }, { b: 'oro', h: '¿de qué era el altar?' }, { x: ' que estaba delante del ' }, { b: 'trono', h: '¿delante de qué?' }, { x: '.' }] },
    { t: 'mc', v: '8:3', f: 'c',
      q: 'En la lectura adventista, ¿qué obra recuerda el ángel con el incensario ante el altar?',
      o: ['La de Cristo, que intercede por su pueblo', 'La de los ancianos que tocan arpas', 'La de Moisés guiando a Israel', 'La de los sacerdotes de Jerusalén'], a: 0,
      e: 'Interpretación: recuerda a Cristo como sumo sacerdote en el santuario del cielo (Hebreos 8:1-2). El texto dice que el ángel ofrecía incienso con las oraciones de los santos (8:3-4).' },
    { t: 'tf', v: '8:4',
      q: 'El humo del incienso, con las oraciones de los santos, subió a la presencia de Dios. (Apocalipsis 8:4)', a: true,
      e: 'Verdadero (Apocalipsis 8:4).' },
    { t: 'mc', v: '8:5', lit: 'lo llenó del fuego del altar y lo arrojó a la tierra',
      q: '¿Qué hizo después el ángel con el incensario? (Apocalipsis 8:5)',
      o: ['Lo llenó del fuego del altar y lo arrojó a la tierra', 'Lo puso sobre el altar de oro delante del trono', 'Se lo entregó al primero de los siete ángeles', 'Lo dejó en el templo de Dios lleno de humo'], a: 0,
      e: '«Y el ángel tomó el incensario, lo llenó del fuego del altar y lo arrojó a la tierra» (8:5).' },
    { t: 'mc', v: '8:5', lit: 'truenos, voces, relámpagos y un terremoto',
      q: '¿Qué hubo cuando el ángel arrojó el incensario a la tierra? (Apocalipsis 8:5)',
      o: ['Truenos, voces, relámpagos y un terremoto', 'Granizo y fuego mezclados con sangre', 'Silencio en el cielo como por media hora', 'Una gran estrella ardiendo como antorcha'], a: 0,
      e: '«…y hubo truenos, voces, relámpagos y un terremoto» (8:5).' },
    { t: 'tf', v: '8:6',
      q: 'Los siete ángeles que tenían las siete trompetas se dispusieron a tocarlas. (Apocalipsis 8:6)', a: true,
      e: 'Verdadero (Apocalipsis 8:6).' },
    { t: 'mc', v: '8:7', lit: 'granizo y fuego mezclados con sangre',
      q: '¿Qué fue lanzado sobre la tierra con la primera trompeta? (Apocalipsis 8:7)',
      o: ['Granizo y fuego mezclados con sangre', 'Algo como un gran monte ardiendo', 'Una gran estrella llamada Ajenjo', 'Langostas con poder de escorpiones'], a: 0,
      e: '«…hubo granizo y fuego mezclados con sangre que fueron lanzados sobre la tierra» (8:7).' },
    { t: 'mc', v: '8:7', lit: 'se quemó la tercera parte de los árboles',
      q: 'Con la primera trompeta, ¿qué parte de los árboles se quemó? (Apocalipsis 8:7)',
      o: ['La tercera parte', 'La cuarta parte', 'La mitad', 'Todos los árboles'], a: 0,
      e: '«Y se quemó la tercera parte de los árboles» (8:7).' },
    { t: 'tf', v: '8:7',
      q: 'Con la primera trompeta se quemó la tercera parte de la hierba verde. (Apocalipsis 8:7)', a: false,
      e: 'Falso: «TODA la hierba verde fue quemada» (8:7). La tercera parte fue de los árboles.' },
    { t: 'mc', v: '8:7-12', f: 'c',
      q: 'En la lectura adventista clásica, ¿qué representan las cuatro primeras trompetas?',
      o: ['Las invasiones que derribaron al Imperio romano de Occidente', 'Las plagas que cayeron sobre Egipto en tiempos de Moisés', 'Los cuatro reinos de la estatua de Daniel 2', 'Cuatro guerras mundiales que todavía no han empezado'], a: 0,
      e: 'Interpretación: las invasiones de los pueblos que derribaron a Roma de Occidente. El texto solo describe granizo, un monte ardiendo, una estrella y el cielo herido (8:7-12).' },
    { t: 'mc', v: '8:8', lit: 'algo como un gran monte ardiendo en fuego',
      q: '¿Qué fue precipitado en el mar con la segunda trompeta? (Apocalipsis 8:8)',
      o: ['Algo como un gran monte ardiendo en fuego', 'Una gran estrella ardiendo como una antorcha', 'Granizo y fuego mezclados con sangre', 'Una gran piedra como de molino'], a: 0,
      e: '«…algo como un gran monte ardiendo en fuego fue precipitado en el mar» (8:8). La estrella ardiendo cae con la tercera trompeta (8:10).' },
    { t: 'fill', v: '8:8', ins: 'Apocalipsis 8:8 (RV1995) — Completa:',
      p: [{ x: 'La tercera parte del ' }, { b: 'mar', h: '¿de qué?' }, { x: ' se convirtió en ' }, { b: 'sangre', h: '¿en qué?' }, { x: ',' }] },
    { t: 'mc', v: '8:9', lit: 'la tercera parte de las naves fue destruida',
      q: 'Con la segunda trompeta, ¿qué fue destruido además de morir los seres del mar? (Apocalipsis 8:9)',
      o: ['La tercera parte de las naves', 'La tercera parte de los ríos', 'Toda la hierba verde', 'La tercera parte del sol'], a: 0,
      e: '«…murió la tercera parte de los seres vivientes que estaban en el mar y la tercera parte de las naves fue destruida» (8:9).' },
    { t: 'fill', v: '8:9', ins: 'Apocalipsis 8:9 (RV1995) — Completa:',
      p: [{ x: 'murió la tercera parte de los seres vivientes que estaban en el ' }, { b: 'mar', h: '¿dónde?' }, { x: ' y la tercera parte de las ' }, { b: 'naves', h: '¿de qué?' }, { x: ' fue destruida.' }] },
    { t: 'mc', v: '8:10', lit: 'una gran estrella ardiendo como una antorcha',
      q: '¿Qué cayó del cielo con la tercera trompeta? (Apocalipsis 8:10)',
      o: ['Una gran estrella ardiendo como una antorcha', 'Algo como un gran monte ardiendo en fuego', 'Granizo y fuego mezclados con sangre', 'Una estrella con la llave del abismo'], a: 0,
      e: '«…cayó del cielo una gran estrella ardiendo como una antorcha» (8:10). La estrella con la llave del abismo es de la quinta trompeta (9:1).' },
    { t: 'mc', v: '8:10', lit: 'Cayó sobre la tercera parte de los ríos',
      q: '¿Sobre qué cayó la estrella de la tercera trompeta? (Apocalipsis 8:10)',
      o: ['Sobre los ríos y las fuentes de las aguas', 'Sobre el mar y las naves que navegaban', 'Sobre los árboles y la hierba verde', 'Sobre el sol, la luna y las estrellas'], a: 0,
      e: '«Cayó sobre la tercera parte de los ríos y sobre las fuentes de las aguas» (8:10).' },
    { t: 'mc', v: '8:11', lit: 'El nombre de la estrella es Ajenjo',
      q: '¿Cómo se llama la estrella de la tercera trompeta? (Apocalipsis 8:11)',
      o: ['Ajenjo', 'Abadón', 'Apolión', 'Lucero'], a: 0,
      e: '«El nombre de la estrella es Ajenjo» (8:11). Abadón y Apolión son los nombres del ángel del abismo (9:11).' },
    { t: 'tf', v: '8:11',
      q: 'Las aguas se volvieron amargas y muchos hombres murieron a causa de ellas. (Apocalipsis 8:11)', a: true,
      e: 'Verdadero: «muchos hombres murieron a causa de esas aguas, porque se volvieron amargas» (8:11).' },
    { t: 'mc', v: '8:12', lit: 'fue herida la tercera parte del sol',
      q: '¿Qué fue herido con la cuarta trompeta? (Apocalipsis 8:12)',
      o: ['La tercera parte del sol, la luna y las estrellas', 'La tercera parte de los ríos y de las fuentes', 'La tercera parte del mar y de las naves', 'La tercera parte de los árboles y la hierba'], a: 0,
      e: '«…fue herida la tercera parte del sol, la tercera parte de la luna y la tercera parte de las estrellas» (8:12).' },
    { t: 'tf', v: '8:12',
      q: 'Con la cuarta trompeta no hubo luz en la tercera parte del día, y asimismo en la noche. (Apocalipsis 8:12)', a: true,
      e: 'Verdadero (Apocalipsis 8:12).' },
    { t: 'mc', v: '8:13', lit: '¡Ay, ay, ay de los que habitan en la tierra',
      q: '¿Qué decía a gran voz el ángel que volaba en medio del cielo? (Apocalipsis 8:13)',
      o: ['«¡Ay, ay, ay de los que habitan en la tierra!»', '«¡Ha caído, ha caído Babilonia la grande!»', '«¡Temed a Dios y dadle gloria!»', '«¡La salvación pertenece a nuestro Dios!»'], a: 0,
      e: '«¡Ay, ay, ay de los que habitan en la tierra, a causa de los otros toques de trompeta…!» (8:13).' },
    { t: 'mc', v: '8:13', lit: 'ay, ay, ay',
      q: '¿Cuántos «ay» anuncia el ángel que volaba en medio del cielo? (Apocalipsis 8:13)',
      o: ['Tres', 'Dos', 'Siete', 'Uno'], a: 0,
      e: 'Tres: «¡Ay, ay, ay…!», por las trompetas que faltaban por tocar los tres ángeles (8:13).' },
    { t: 'tf', v: '8:13',
      q: 'El ángel anunció los ayes por los toques de trompeta que estaban para tocar los cuatro ángeles. (Apocalipsis 8:13)', a: false,
      e: 'Falso: eran los TRES ángeles que faltaban por tocar (8:13): la quinta, la sexta y la séptima trompeta.' },
  ],

  tarjetas: [
    { f: 'Qué pasó al abrirse el séptimo sello (8:1)', r: 'Silencio en el cielo como por media hora' },
    { f: 'Qué recibieron los siete ángeles (8:2)', r: 'Siete trompetas' },
    { f: 'El ángel del incensario (8:3)', r: 'Incensario de oro; mucho incienso para añadirlo a las oraciones de todos los santos' },
    { f: 'Qué hizo con el incensario al final (8:5)', r: 'Lo llenó del fuego del altar y lo arrojó a la tierra: truenos, voces, relámpagos y un terremoto' },
    { f: '1ª trompeta (8:7)', r: 'Granizo y fuego con sangre: se quema un tercio de los árboles y toda la hierba verde' },
    { f: '2ª trompeta (8:8-9)', r: 'Un gran monte ardiendo cae al mar: un tercio del mar en sangre, de los seres del mar y de las naves' },
    { f: '3ª trompeta (8:10-11)', r: 'La estrella Ajenjo cae sobre un tercio de los ríos y sobre las fuentes; aguas amargas' },
    { f: '4ª trompeta (8:12)', r: 'Herido un tercio del sol, la luna y las estrellas' },
    { f: 'Orden de lo que golpean las trompetas 1 a 4', r: 'Tierra, mar, ríos, cielo' },
    { f: 'Nombre de la estrella de la 3ª trompeta (8:11)', r: 'Ajenjo' },
    { f: '«¡Ay, ay, ay de los que habitan en la tierra!»', r: 'Apocalipsis 8:13: tres ayes por las tres trompetas que faltan' },
    { f: 'Sellos, trompetas y copas', r: 'Los sellos los abre el Cordero; las trompetas y las copas, siete ángeles' },
  ],
};
