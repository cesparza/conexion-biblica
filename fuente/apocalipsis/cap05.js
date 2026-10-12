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

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · El <strong>Cordero como inmolado</strong> es Jesús, que murió en la cruz
      y resucitó: por eso está «en pie» aunque fue sacrificado.<br>
      · <strong>León de la tribu de Judá</strong> y <strong>raíz de
      David</strong> lo presentan como el Mesías prometido, descendiente de
      Judá (Génesis 49:9-10) y de David (2 Samuel 7:12-13).<br>
      · El número <strong>siete</strong> indica plenitud: los siete cuernos,
      todo el poder; los siete ojos, el Espíritu de Dios que lo ve todo.<br>
      · El <strong>libro sellado</strong> se entiende como el plan de Dios para
      la historia y la salvación, que solo Cristo, por su sacrificio, puede
      abrir.<br>
      · La escena muestra que la salvación es para <strong>todas las
      naciones</strong>, y que las oraciones de los creyentes llegan delante
      de Dios.`) },
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
      q: 'En la lectura adventista, ¿quién es el Cordero «como inmolado» de Apocalipsis 5:6?',
      o: ['Jesús, que murió en la cruz y resucitó', 'Uno de los veinticuatro ancianos', 'El ángel poderoso de 5:2', 'El pueblo de Israel perseguido'], a: 0,
      e: 'Interpretación: es Jesús, sacrificado y vivo. El texto dice «un Cordero como inmolado» que estaba en pie (5:6) y que redimió con su sangre (5:9).' },
    { t: 'mc', v: '5:6', f: 'c',
      q: 'En la interpretación adventista, ¿qué indica el número siete en los cuernos y los ojos del Cordero?',
      o: ['Plenitud: todo el poder y todo el conocimiento', 'Las siete iglesias de Asia, una por cuerno', 'Los siete días que duró la creación', 'Siete reyes que gobernarán la tierra'], a: 0,
      e: 'Interpretación: siete es número de plenitud. El texto solo dice que los siete ojos «son los siete espíritus de Dios enviados por toda la tierra» (5:6).' },
    { t: 'mc', v: '5:1-7', f: 'c',
      q: 'En la lectura adventista, ¿qué representa el libro sellado que toma el Cordero?',
      o: ['El plan de Dios para la historia y la salvación', 'La lista de los nombres de los ángeles', 'Las leyes del antiguo Israel', 'Las cartas a las siete iglesias'], a: 0,
      e: 'Interpretación: el plan de Dios que solo Cristo puede abrir. El texto dice que era un libro escrito por dentro y por fuera, con siete sellos (5:1).' },
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
