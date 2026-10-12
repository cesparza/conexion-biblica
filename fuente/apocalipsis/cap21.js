/* Apocalipsis 21 — Cielo nuevo, tierra nueva y la Nueva Jerusalén.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap21', label: 'Apocalipsis 21', sub: 'Cielo nuevo, tierra nueva y la Nueva Jerusalén', vs: 27,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Juan ve <strong>un cielo nuevo y una tierra nueva</strong> (21:1), y
      una ciudad hermosísima que baja del cielo: <strong>la nueva
      Jerusalén</strong> (21:2).<br><br>
      Dios va a vivir con su pueblo, y <strong>enjugará toda lágrima</strong>:
      ya no habrá muerte, ni llanto, ni dolor (21:3-4).<br><br>
      La ciudad tiene <strong>doce puertas de perla</strong>, <strong>doce
      cimientos</strong> de piedras preciosas y una <strong>calle de oro
      puro</strong>. No necesita sol ni luna, porque la gloria de Dios la
      ilumina (21:19-23).<br><br>
      <em>La idea del capítulo: Dios hace nuevas todas las cosas y vive para
      siempre con su pueblo.</em>`) },

    { t: '🌍 Cielo nuevo y tierra nueva (21:1-2)', capa: 'nucleo', h:
      hi(`<strong>«Entonces vi un cielo nuevo y una tierra nueva»</strong>
      (21:1). El primer cielo y la primera tierra habían pasado, y
      <strong>«el mar ya no existía más»</strong> (21:1).<br><br>
      Juan vio <strong>«la santa ciudad, la nueva Jerusalén»</strong> (21:2)
      bajar del cielo, de parte de Dios, <strong>«ataviada como una esposa
      hermoseada para su esposo»</strong> (21:2).`) },

    { t: '🤲 Dios con los hombres (21:3-5)', capa: 'nucleo', h:
      li([`Una gran voz del cielo: <strong>«El tabernáculo de Dios está ahora
           con los hombres»</strong> (21:3).`,
          `Él morará con ellos, ellos serán su pueblo y Dios mismo estará con
           ellos como su Dios (21:3).`,
          `<strong>«Enjugará Dios toda lágrima de los ojos de ellos»</strong> (21:4).`,
          `Ya no habrá más <strong>muerte, llanto, clamor ni dolor</strong>,
           <strong>«porque las primeras cosas ya pasaron»</strong> (21:4).`,
          `El que estaba sentado en el trono dijo: <strong>«Yo hago nuevas todas
           las cosas»</strong> (21:5).`,
          `Y a Juan: <strong>«Escribe, porque estas palabras son fieles y
           verdaderas»</strong> (21:5).`]) },

    { t: '💧 «Hecho está» y los de afuera (21:6-8)', capa: 'nucleo', h:
      hi(`<strong>«Hecho está. Yo soy el Alfa y la Omega, el principio y el
      fin»</strong> (21:6). Al que tiene sed le dará <strong>gratuitamente de la
      fuente del agua de vida</strong> (21:6).<br><br>
      <strong>«El vencedor heredará todas las cosas»</strong> (21:7), y Dios
      será su Dios y él será su <strong>hijo</strong>.`) +
      tbl(['Los que tienen su parte en el lago de fuego (21:8)'], [
        ['Los cobardes e incrédulos'], ['Los abominables y homicidas'],
        ['Los fornicarios y hechiceros'], ['Los idólatras y todos los mentirosos'],
      ]) +
      wa(`El lago que arde con fuego y azufre <strong>«es la muerte
      segunda»</strong> (21:8), la misma de 20:14.`) },

    { t: '💎 La esposa del Cordero (21:9-11)', capa: 'nucleo', h:
      li([`Vino <strong>uno de los siete ángeles que tenían las siete
           copas</strong> (21:9).`,
          `Le dijo: <strong>«Ven acá, te mostraré la desposada, la esposa del
           Cordero»</strong> (21:9).`,
          `Lo llevó en el Espíritu <strong>a un monte grande y alto</strong> (21:10)
           y le mostró la santa Jerusalén que descendía del cielo.`,
          `Tenía la gloria de Dios, y su fulgor era <strong>«como piedra de
           jaspe, diáfana como el cristal»</strong> (21:11).`]) +
      wa(`En 17:1-3 uno de esos mismos ángeles le mostró a la <strong>gran
      ramera</strong> y lo llevó <strong>al desierto</strong>. Aquí le muestra a
      la <strong>esposa del Cordero</strong> desde <strong>un monte grande y
      alto</strong>.`) },

    { t: '🚪 Muro, puertas y cimientos (21:12-14)', capa: 'nucleo', h:
      tbl(['Parte', 'Cuántos', 'Qué tenía escrito'], [
        ['Puertas', '<strong>Doce</strong>, con doce ángeles (21:12)', 'Los nombres de las <strong>doce tribus</strong> de los hijos de Israel (21:12)'],
        ['Cimientos', '<strong>Doce</strong> (21:14)', 'Los nombres de los <strong>doce apóstoles</strong> del Cordero (21:14)'],
      ]) +
      tbl(['Lado', 'Puertas (21:13)'], [
        ['Oriente', '3'], ['Norte', '3'], ['Sur', '3'], ['Occidente', '3'],
      ]) +
      wa(`No se cruzan: <strong>puertas = tribus</strong>, <strong>cimientos =
      apóstoles</strong>. El orden de 21:13 es oriente, norte, sur,
      occidente.`) },

    { t: '📏 Las medidas de la ciudad (21:15-18)', capa: 'nucleo', h:
      tbl(['Qué', 'Medida o material'], [
        ['Con qué midió', 'Una <strong>caña de medir, de oro</strong> (21:15)'],
        ['Forma', 'Un <strong>cuadrado</strong>: la longitud es igual a la anchura (21:16)'],
        ['La ciudad', '<strong>Doce mil estadios</strong>; longitud, altura y anchura iguales (21:16)'],
        ['El muro', '<strong>Ciento cuarenta y cuatro codos</strong>, según medida de hombre (21:17)'],
        ['Material del muro', '<strong>Jaspe</strong> (21:18)'],
        ['Material de la ciudad', '<strong>Oro puro</strong>, semejante al vidrio limpio (21:18)'],
      ]) +
      wa(`Tres números que se parecen: la ciudad mide <strong>12.000
      estadios</strong>, el muro <strong>144 codos</strong>, y los sellados de
      7:4 son <strong>144.000</strong> personas. No se mezclan.`) },

    { t: '💠 Las doce piedras de los cimientos (21:19-20)', capa: 'nucleo', h:
      tbl(['#', 'Cimiento', '#', 'Cimiento'], [
        ['1', 'Jaspe', '7', 'Crisólito'],
        ['2', 'Zafiro', '8', 'Berilo'],
        ['3', 'Ágata', '9', 'Topacio'],
        ['4', 'Esmeralda', '10', 'Crisopraso'],
        ['5', 'Ónice', '11', 'Jacinto'],
        ['6', 'Cornalina', '12', 'Amatista'],
      ]) +
      wa(`El primer cimiento es de <strong>jaspe</strong>, el mismo material del
      muro (21:18). La lista empieza con jaspe y termina con
      <strong>amatista</strong>.`) },

    { t: '🛣️ Puertas de perla y calle de oro (21:21)', capa: 'nucleo', h:
      hi(`<strong>«Las doce puertas eran doce perlas»</strong> (21:21): cada
      puerta era una sola perla.<br><br>
      <strong>«Y la calle de la ciudad era de oro puro, como vidrio
      transparente»</strong> (21:21).`) +
      wa(`Ojo con las comparaciones: la ciudad es de oro puro
      <strong>«semejante al vidrio limpio»</strong> (21:18); la calle, de oro
      puro <strong>«como vidrio transparente»</strong> (21:21).`) },

    { t: '☀️ Sin templo y sin noche (21:22-27)', capa: 'nucleo', h:
      li([`<strong>«En ella no vi templo»</strong> (21:22), porque el Señor Dios
           Todopoderoso <strong>es su templo, y el Cordero</strong>.`,
          `No necesita <strong>sol ni luna</strong>: <strong>«la gloria de Dios
           la ilumina y el Cordero es su lumbrera»</strong> (21:23).`,
          `Las naciones que hayan sido salvas andarán a su luz, y los reyes de la
           tierra traerán su gloria y su honor (21:24).`,
          `<strong>«Sus puertas nunca serán cerradas de día, pues allí no habrá
           noche»</strong> (21:25).`,
          `Llevarán a ella la gloria y el honor de las naciones (21:26).`,
          `No entra nada impuro; solo <strong>«los que están inscritos en el
           libro de la vida del Cordero»</strong> (21:27).`]) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · La santa ciudad <strong>desciende al terminar los mil años</strong>
      (ver Apocalipsis 20). Después del fuego final, Dios purifica y
      <strong>hace nueva esta misma tierra</strong>.<br>
      · La tierra nueva es el <strong>hogar eterno</strong> de los redimidos:
      «los mansos… recibirán la tierra por heredad» (Mateo 5:5).<br>
      · Es un lugar <strong>real</strong>, no solo un símbolo: allí los
      salvados viven con Dios cara a cara.<br>
      · Que no haya muerte ni dolor (21:4) quiere decir que <strong>el pecado
      termina para siempre</strong> y no vuelve a levantarse.`) },
  ],

  preguntas: [
    { t: 'mc', v: '21:1', lit: 'vi un cielo nuevo y una tierra nueva',
      q: '¿Qué vio Juan al comenzar Apocalipsis 21?',
      o: ['Un cielo nuevo y una tierra nueva', 'Un trono blanco y unos libros', 'Un ángel con una gran cadena', 'Un mar de vidrio con fuego'], a: 0,
      e: '«Entonces vi un cielo nuevo y una tierra nueva» (21:1). El gran trono blanco y los libros son de 20:11-12.' },
    { t: 'tf', v: '21:1',
      q: 'En la tierra nueva de Apocalipsis 21:1, el mar ya no existía más.', a: true,
      e: 'Verdadero: «…y el mar ya no existía más» (21:1).' },
    { t: 'mc', v: '21:2', lit: 'ataviada como una esposa hermoseada para su esposo',
      q: '¿Cómo descendía del cielo la nueva Jerusalén? (Apocalipsis 21:2)',
      o: ['Como una esposa hermoseada para su esposo', 'Como una mujer vestida del sol', 'Como una nube blanca con fuego', 'Como una reina sentada en su trono'], a: 0,
      e: '«…la nueva Jerusalén, descender del cielo, de parte de Dios, ataviada como una esposa hermoseada para su esposo» (21:2). La mujer vestida del sol es la de 12:1.' },
    { t: 'mc', v: '21:3', lit: 'El tabernáculo de Dios está ahora con los hombres',
      q: 'Según la gran voz de Apocalipsis 21:3, ¿qué está ahora con los hombres?',
      o: ['El tabernáculo de Dios', 'El arca del pacto', 'El libro de la vida', 'El altar de oro'], a: 0,
      e: '«El tabernáculo de Dios está ahora con los hombres. Él morará con ellos…» (21:3).' },
    { t: 'mc', v: '21:4', lit: 'Enjugará Dios toda lágrima',
      q: '¿Qué texto dice «Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá más muerte»?',
      o: ['Apocalipsis 21:4', 'Apocalipsis 21:3', 'Apocalipsis 21:5', 'Apocalipsis 22:4'], a: 0,
      e: 'Apocalipsis 21:4.' },
    { t: 'fill', v: '21:4', ins: 'Apocalipsis 21:4 (RV1995) — Completa:',
      p: [{ x: '«y ya no habrá más ' }, { b: 'muerte', h: '¿qué ya no habrá?' }, { x: ', ni habrá más ' }, { b: 'llanto', h: 'ni habrá más…' }, { x: ' ni clamor ni dolor»' }] },
    { t: 'tf', v: '21:4',
      q: 'Según Apocalipsis 21:4, ya no habrá más dolor porque el mar ya no existe.', a: false,
      e: 'Falso: dice «porque las primeras cosas ya pasaron» (21:4). Lo del mar está en 21:1.' },
    { t: 'mc', v: '21:5', lit: 'Yo hago nuevas todas las cosas',
      q: '¿Qué dijo el que estaba sentado en el trono en Apocalipsis 21:5?',
      o: ['«Yo hago nuevas todas las cosas»', '«Yo soy la luz del mundo»', '«Yo estoy a la puerta y llamo»', '«Yo soy el primero y el último»'], a: 0,
      e: '«El que estaba sentado en el trono dijo: “Yo hago nuevas todas las cosas.”» (21:5).' },
    { t: 'mc', v: '21:5', lit: 'estas palabras son fieles y verdaderas',
      q: 'Según Apocalipsis 21:5, ¿por qué debía escribir Juan?',
      o: ['Porque estas palabras son fieles y verdaderas', 'Porque el tiempo de la cosecha ya llegó', 'Porque las iglesias debían arrepentirse', 'Porque el libro iba a ser sellado'], a: 0,
      e: '«Escribe, porque estas palabras son fieles y verdaderas» (21:5).' },
    { t: 'mc', v: '21:6', lit: 'le daré gratuitamente de la fuente del agua de vida',
      q: '¿Qué le dará Dios al que tiene sed? (Apocalipsis 21:6)',
      o: ['Gratuitamente de la fuente del agua de vida', 'Vino nuevo en la cena de las bodas', 'Leche y miel de la tierra prometida', 'Agua de la peña que brotó en el desierto'], a: 0,
      e: '«Al que tiene sed, le daré gratuitamente de la fuente del agua de vida» (21:6).' },
    { t: 'tf', v: '21:6',
      q: 'En Apocalipsis 21:6 Dios dice: «Hecho está. Yo soy el Alfa y la Omega, el principio y el fin».', a: true,
      e: 'Verdadero (Apocalipsis 21:6).' },
    { t: 'mc', v: '21:7', lit: 'El vencedor heredará todas las cosas',
      q: 'Según Apocalipsis 21:7, ¿qué heredará el vencedor?',
      o: ['Todas las cosas', 'Una corona de oro', 'Un nombre nuevo', 'La estrella de la mañana'], a: 0,
      e: '«El vencedor heredará todas las cosas, y yo seré su Dios y él será mi hijo» (21:7).' },
    { t: 'fill', v: '21:7', ins: 'Apocalipsis 21:7 (RV1995) — Completa:',
      p: [{ x: '«El vencedor heredará todas las cosas, y yo seré su ' }, { b: 'Dios', h: '¿qué será Dios para él?' }, { x: ' y él será mi ' }, { b: 'hijo', h: '¿qué será él?' }, { x: '.»' }] },
    { t: 'mc', v: '21:8', lit: 'los cobardes e incrédulos',
      q: '¿Cuál de estos grupos aparece en la lista de Apocalipsis 21:8?',
      o: ['Los cobardes e incrédulos', 'Los pobres y los humildes', 'Los perros y los ladrones', 'Los pequeños y los débiles'], a: 0,
      e: '«Pero los cobardes e incrédulos, los abominables y homicidas…» (21:8). Los «perros» aparecen en 22:15.' },
    { t: 'mc', v: '21:8', lit: 'que es la muerte segunda',
      q: 'Según Apocalipsis 21:8, ¿qué es el lago que arde con fuego y azufre?',
      o: ['La muerte segunda', 'La primera resurrección', 'El abismo sin fondo', 'La gran tribulación'], a: 0,
      e: '«…tendrán su parte en el lago que arde con fuego y azufre, que es la muerte segunda» (21:8).' },
    { t: 'mc', v: '21:9', lit: 'uno de los siete ángeles que tenían las siete copas',
      q: '¿Quién vino a mostrarle a Juan la esposa del Cordero? (Apocalipsis 21:9)',
      o: ['Uno de los siete ángeles que tenían las siete copas', 'Uno de los veinticuatro ancianos que rodean el trono', 'Uno de los cuatro seres vivientes llenos de ojos', 'El ángel que tenía la llave del abismo y la cadena'], a: 0,
      e: '«Entonces vino a mí uno de los siete ángeles que tenían las siete copas llenas de las siete plagas postreras» (21:9).' },
    { t: 'tf', v: '21:9',
      q: 'El ángel le dijo a Juan: «Ven acá, te mostraré la desposada, la esposa del Cordero». (Apocalipsis 21:9)', a: true,
      e: 'Verdadero (Apocalipsis 21:9).' },
    { t: 'mc', v: '21:10', lit: 'a un monte grande y alto',
      q: '¿A dónde llevó el ángel a Juan para mostrarle la santa Jerusalén? (Apocalipsis 21:10)',
      o: ['A un monte grande y alto', 'Al desierto', 'A la isla de Patmos', 'Al mar de vidrio'], a: 0,
      e: '«Me llevó en el Espíritu a un monte grande y alto» (21:10). Al desierto lo llevó en 17:3, para ver a la ramera.' },
    { t: 'mc', v: '21:11', lit: 'como piedra de jaspe, diáfana como el cristal',
      q: '¿A qué piedra era semejante el fulgor de la ciudad? (Apocalipsis 21:11)',
      o: ['A piedra de jaspe', 'A piedra de zafiro', 'A piedra de esmeralda', 'A piedra de amatista'], a: 0,
      e: '«…su fulgor era semejante al de una piedra preciosísima, como piedra de jaspe, diáfana como el cristal» (21:11).' },
    { t: 'mc', v: '21:12', lit: 'con doce puertas',
      q: '¿Cuántas puertas tenía el muro de la ciudad? (Apocalipsis 21:12)',
      o: ['Doce', 'Siete', 'Cuatro', 'Veinticuatro'], a: 0,
      e: '«Tenía un muro grande y alto, con doce puertas, y en las puertas doce ángeles» (21:12).' },
    { t: 'mc', v: '21:12', lit: 'los de las doce tribus de los hijos de Israel',
      q: '¿Qué nombres estaban inscritos en las puertas? (Apocalipsis 21:12)',
      o: ['Los de las doce tribus de los hijos de Israel', 'Los de los doce apóstoles del Cordero', 'Los de las siete iglesias que están en Asia', 'Los de los veinticuatro ancianos del trono'], a: 0,
      e: '«…y nombres inscritos, que son los de las doce tribus de los hijos de Israel» (21:12). Los apóstoles están en los cimientos (21:14).' },
    { t: 'tf', v: '21:13',
      q: 'La ciudad tenía cuatro puertas al oriente. (Apocalipsis 21:13)', a: false,
      e: 'Falso: tenía TRES puertas al oriente, tres al norte, tres al sur y tres al occidente (21:13).' },
    { t: 'mc', v: '21:14', lit: 'los doce nombres de los doce apóstoles del Cordero',
      q: '¿Qué había sobre los doce cimientos del muro? (Apocalipsis 21:14)',
      o: ['Los nombres de los doce apóstoles del Cordero', 'Los nombres de las doce tribus de Israel', 'Doce ángeles con trompetas de oro', 'Doce coronas de oro y piedras preciosas'], a: 0,
      e: '«El muro de la ciudad tenía doce cimientos y sobre ellos los doce nombres de los doce apóstoles del Cordero» (21:14).' },
    { t: 'tf', v: '21:14',
      q: 'Según Apocalipsis 21:14, sobre los cimientos estaban los nombres de las doce tribus de Israel.', a: false,
      e: 'Falso: sobre los cimientos estaban los nombres de los doce APÓSTOLES; las tribus estaban en las puertas (21:12).' },
    { t: 'mc', v: '21:15', lit: 'una caña de medir, de oro',
      q: '¿Con qué midió el ángel la ciudad, sus puertas y su muro? (Apocalipsis 21:15)',
      o: ['Con una caña de medir, de oro', 'Con una vara de hierro', 'Con un cordel de plata', 'Con una caña de bronce'], a: 0,
      e: '«El que hablaba conmigo tenía una caña de medir, de oro, para medir la ciudad, sus puertas y su muro» (21:15).' },
    { t: 'mc', v: '21:16', lit: 'doce mil estadios',
      q: '¿Cuánto midió la ciudad? (Apocalipsis 21:16)',
      o: ['Doce mil estadios', 'Ciento cuarenta y cuatro mil estadios', 'Mil seiscientos estadios', 'Ciento cuarenta y cuatro codos'], a: 0,
      e: '«Con la caña midió la ciudad: doce mil estadios» (21:16). Los 144 codos son del muro (21:17); los 1.600 estadios, de 14:20.' },
    { t: 'tf', v: '21:16',
      q: 'La longitud de la ciudad era el doble de su anchura. (Apocalipsis 21:16)', a: false,
      e: 'Falso: «su longitud es igual a su anchura»; y la longitud, la altura y la anchura son iguales (21:16).' },
    { t: 'mc', v: '21:17', lit: 'ciento cuarenta y cuatro codos',
      q: '¿Cuánto midió el muro de la ciudad? (Apocalipsis 21:17)',
      o: ['Ciento cuarenta y cuatro codos', 'Doce mil codos', 'Ciento cuarenta y cuatro estadios', 'Mil doscientos codos'], a: 0,
      e: '«Y midió su muro: ciento cuarenta y cuatro codos, según medida de hombre, la cual era la del ángel» (21:17).' },
    { t: 'mc', v: '21:18', lit: 'El material de su muro era de jaspe',
      q: '¿De qué material era el muro? (Apocalipsis 21:18)',
      o: ['De jaspe', 'De oro puro', 'De zafiro', 'De perla'], a: 0,
      e: '«El material de su muro era de jaspe, pero la ciudad era de oro puro» (21:18).' },
    { t: 'fill', v: '21:18', ins: 'Apocalipsis 21:18 (RV1995) — Completa:',
      p: [{ x: '«pero la ciudad era de ' }, { b: 'oro', h: '¿de qué era la ciudad?' }, { x: ' puro, semejante al ' }, { b: 'vidrio', h: '¿semejante a qué?' }, { x: ' limpio.»' }] },
    { t: 'mc', v: '21:19', lit: 'El primer cimiento era de jaspe',
      q: '¿De qué piedra era el primer cimiento? (Apocalipsis 21:19)',
      o: ['Jaspe', 'Zafiro', 'Ágata', 'Esmeralda'], a: 0,
      e: '«El primer cimiento era de jaspe, el segundo de zafiro, el tercero de ágata, el cuarto de esmeralda» (21:19).' },
    { t: 'mc', v: '21:19', lit: 'el cuarto de esmeralda',
      q: '¿De qué piedra era el cuarto cimiento? (Apocalipsis 21:19)',
      o: ['Esmeralda', 'Cornalina', 'Crisólito', 'Ágata'], a: 0,
      e: 'El tercero era de ágata y «el cuarto de esmeralda» (21:19). La cornalina es el sexto y el crisólito el séptimo (21:20).' },
    { t: 'mc', v: '21:20', lit: 'el duodécimo de amatista',
      q: '¿De qué piedra era el duodécimo (último) cimiento? (Apocalipsis 21:20)',
      o: ['Amatista', 'Jacinto', 'Crisopraso', 'Topacio'], a: 0,
      e: '«…el décimo de crisopraso, el undécimo de jacinto y el duodécimo de amatista» (21:20).' },
    { t: 'tf', v: '21:20',
      q: 'El sexto cimiento era de cornalina. (Apocalipsis 21:20)', a: true,
      e: 'Verdadero: «el quinto de ónice, el sexto de cornalina, el séptimo de crisólito» (21:20).' },
    { t: 'mc', v: '21:21', lit: 'Las doce puertas eran doce perlas',
      q: '¿De qué eran las doce puertas de la ciudad? (Apocalipsis 21:21)',
      o: ['Cada una era una perla', 'Cada una era de jaspe', 'Cada una era de oro', 'Cada una era de cristal'], a: 0,
      e: '«Las doce puertas eran doce perlas; cada una de las puertas era una perla» (21:21).' },
    { t: 'mc', v: '21:21', lit: 'la calle de la ciudad era de oro puro, como vidrio transparente',
      q: 'Según Apocalipsis 21:21, ¿cómo era la calle de la ciudad?',
      o: ['De oro puro, como vidrio transparente', 'De jaspe, diáfana como el cristal', 'De plata, brillante como el sol', 'De perla, blanca como la nieve'], a: 0,
      e: '«Y la calle de la ciudad era de oro puro, como vidrio transparente» (21:21).' },
    { t: 'mc', v: '21:22', lit: 'En ella no vi templo',
      q: '¿Qué texto dice «En ella no vi templo, porque el Señor Dios Todopoderoso es su templo, y el Cordero»?',
      o: ['Apocalipsis 21:22', 'Apocalipsis 21:23', 'Apocalipsis 21:3', 'Apocalipsis 22:3'], a: 0,
      e: 'Apocalipsis 21:22.' },
    { t: 'mc', v: '21:22', lit: 'el Señor Dios Todopoderoso es su templo, y el Cordero',
      q: '¿Por qué Juan no vio templo en la ciudad? (Apocalipsis 21:22)',
      o: ['Porque el Señor Dios Todopoderoso y el Cordero son su templo', 'Porque el templo había sido destruido antes', 'Porque el templo quedó en el primer cielo', 'Porque todavía lo estaban construyendo'], a: 0,
      e: '«En ella no vi templo, porque el Señor Dios Todopoderoso es su templo, y el Cordero» (21:22).' },
    { t: 'mc', v: '21:23', lit: 'la gloria de Dios la ilumina y el Cordero es su lumbrera',
      q: 'Según Apocalipsis 21:23, ¿qué ilumina la ciudad?',
      o: ['La gloria de Dios, y el Cordero es su lumbrera', 'El sol y la luna, que nunca se apagan', 'Siete lámparas de fuego ante el trono', 'Las doce estrellas de la corona'], a: 0,
      e: '«La ciudad no tiene necesidad de sol ni de luna… porque la gloria de Dios la ilumina y el Cordero es su lumbrera» (21:23).' },
    { t: 'mc', v: '21:24', lit: 'Las naciones que hayan sido salvas andarán a la luz de ella',
      q: '¿Quiénes andarán a la luz de la ciudad? (Apocalipsis 21:24)',
      o: ['Las naciones que hayan sido salvas', 'Los ángeles de las siete iglesias', 'Los que adoraron a la bestia', 'Los reyes de Gog y Magog'], a: 0,
      e: '«Las naciones que hayan sido salvas andarán a la luz de ella y los reyes de la tierra traerán su gloria y su honor a ella» (21:24).' },
    { t: 'tf', v: '21:25',
      q: 'Las puertas de la ciudad se cierran cuando llega la noche. (Apocalipsis 21:25)', a: false,
      e: 'Falso: «Sus puertas nunca serán cerradas de día, pues allí no habrá noche» (21:25).' },
    { t: 'mc', v: '21:26', lit: 'la gloria y el honor de las naciones',
      q: 'Según Apocalipsis 21:26, ¿qué llevarán a la ciudad?',
      o: ['La gloria y el honor de las naciones', 'El oro y la plata de los reyes', 'Las coronas de los veinticuatro ancianos', 'Las ofrendas del templo de Jerusalén'], a: 0,
      e: '«Llevarán a ella la gloria y el honor de las naciones» (21:26).' },
    { t: 'mc', v: '21:27', lit: 'los que están inscritos en el libro de la vida del Cordero',
      q: '¿Quiénes entrarán en la ciudad? (Apocalipsis 21:27)',
      o: ['Los inscritos en el libro de la vida del Cordero', 'Los que lleven una marca en su mano derecha', 'Los que traigan ofrendas al templo de Dios', 'Los que nacieron en la Jerusalén de abajo'], a: 0,
      e: '«No entrará en ella ninguna cosa impura… sino solamente los que están inscritos en el libro de la vida del Cordero» (21:27).' },
    { t: 'fill', v: '21:27', ins: 'Apocalipsis 21:27 (RV1995) — Completa:',
      p: [{ x: '«sino solamente los que están inscritos en el ' }, { b: 'libro', h: '¿inscritos en qué?' }, { x: ' de la vida del ' }, { b: 'Cordero', h: '¿de quién es el libro?' }, { x: '.»' }] },
    { t: 'mc', v: '21:2', f: 'c',
      q: 'En la lectura adventista, ¿cuándo desciende la santa ciudad, la nueva Jerusalén, a la tierra?',
      o: ['Al terminar los mil años', 'En la segunda venida de Jesús', 'Al comenzar los mil años', 'Nunca: se queda en el cielo'], a: 0,
      e: 'Interpretación: baja al final de los mil años de Apocalipsis 20. El texto solo dice que Juan la vio «descender del cielo, de parte de Dios» (21:2).' },
    { t: 'mc', v: '21:1', f: 'c',
      q: 'En la interpretación adventista, ¿dónde vivirán para siempre los redimidos?',
      o: ['En esta tierra, hecha nueva por Dios', 'En el cielo, lejos de toda tierra', 'En un lugar solo espiritual, sin cuerpo', 'En la Jerusalén que hoy existe'], a: 0,
      e: 'Interpretación: Dios purifica y renueva esta tierra, que será el hogar eterno (Mateo 5:5). El texto dice que Juan vio «un cielo nuevo y una tierra nueva» (21:1).' },
    { t: 'mc', v: '21:4', f: 'c',
      q: 'En la lectura adventista, ¿qué significa que no habrá más muerte ni dolor (Apocalipsis 21:4)?',
      o: ['Que el pecado termina para siempre y no vuelve', 'Que solo los ángeles quedan libres del dolor', 'Que el dolor vuelve después de otros mil años', 'Que la muerte pasa a ser solo un sueño corto'], a: 0,
      e: 'Interpretación: el mal no se levanta otra vez. El texto dice que no habrá más muerte, llanto, clamor ni dolor «porque las primeras cosas ya pasaron» (21:4).' },
  ],

  tarjetas: [
    { f: 'Lo primero que vio Juan (21:1)', r: 'Un cielo nuevo y una tierra nueva; el mar ya no existía más' },
    { f: 'Cómo bajaba la nueva Jerusalén (21:2)', r: 'Ataviada como una esposa hermoseada para su esposo' },
    { f: 'Lo que ya no habrá (21:4)', r: 'Muerte, llanto, clamor ni dolor' },
    { f: '«Yo hago nuevas todas las cosas»', r: 'Apocalipsis 21:5' },
    { f: 'Quién le mostró la esposa del Cordero (21:9)', r: 'Uno de los siete ángeles que tenían las siete copas' },
    { f: 'Puertas y cimientos (21:12-14)', r: '12 puertas con los nombres de las 12 tribus; 12 cimientos con los nombres de los 12 apóstoles' },
    { f: 'Puertas por lado (21:13)', r: 'Tres al oriente, tres al norte, tres al sur, tres al occidente' },
    { f: 'Medida de la ciudad y del muro (21:16-17)', r: 'Ciudad: 12.000 estadios. Muro: 144 codos' },
    { f: 'Material del muro y de la ciudad (21:18)', r: 'Muro de jaspe; ciudad de oro puro, semejante al vidrio limpio' },
    { f: 'Los doce cimientos, en orden (21:19-20)', r: 'Jaspe, zafiro, ágata, esmeralda, ónice, cornalina, crisólito, berilo, topacio, crisopraso, jacinto, amatista' },
    { f: 'Puertas y calle (21:21)', r: 'Cada puerta, una perla; la calle, de oro puro como vidrio transparente' },
    { f: 'Por qué no hay templo ni sol (21:22-23)', r: 'Dios Todopoderoso y el Cordero son su templo; la gloria de Dios la ilumina y el Cordero es su lumbrera' },
    { f: 'Quiénes entran (21:27)', r: 'Solo los inscritos en el libro de la vida del Cordero' },
  ],
};
