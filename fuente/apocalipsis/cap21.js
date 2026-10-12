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

    { t: '🧭 ¿Cuándo baja la ciudad? (21:1-2, 21:10)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. En la lectura adventista, la
      nueva Jerusalén <strong>baja al terminar los mil años</strong>, con Cristo, los
      redimidos y los ángeles. Elena de White: se asienta en el lugar purificado y
      preparado, donde estaba el monte de los Olivos (Zacarías 14:4).`) +
      tbl(['Orden', 'Qué pasa', 'Dónde se lee'], [
        ['1', 'Cristo vuelve y los impíos resucitan', '20:5'],
        ['2', 'La ciudad baja del cielo', '21:2; 21:10'],
        ['3', 'Satanás reúne a los impíos y rodean la ciudad', '20:7-9'],
        ['4', 'Fuego de Dios los consume', '20:9'],
        ['5', 'Cielo nuevo y tierra nueva', '21:1'],
      ]) +
      wa(`Bohr: por eso 21:2 pasa <strong>antes</strong> que 21:1. El versículo 21:1
      en realidad cierra el capítulo 20 (la división de capítulos la pusieron
      después), y 21:2 empieza el último ciclo, el de Dios con su pueblo. Bohr nota que
      allí, por primera vez en estos ciclos, la ciudad recibe su nombre: «la nueva
      Jerusalén».`) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, pág. 531; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 79.</p>` },

    { t: '🧭 Esta misma tierra, hecha nueva (21:1)', capa: 'contexto', h:
      hi(`Elena de White: «El fuego que consume a los impíos purifica la tierra».
      Desaparece todo rastro de la maldición, y ningún infierno que arda para
      siempre quedará recordando el pecado.`) +
      li([`<strong>«Nuevo»</strong> traduce el griego <em>kainos</em>: nuevo en
           calidad, no en origen. Es este planeta, purificado y restaurado
           (2 Pedro 3:10-13). (Escuela Sabática 2019.)`,
          `<strong>«El mar ya no existía más»</strong>: la misma lección piensa que
           Juan recordaba el mar de Patmos, que lo separaba de los suyos; en la
           tierra nueva no hay más separación.`,
          `Elena de White advierte contra <strong>espiritualizar</strong> la
           herencia: la tierra será la morada eterna de los redimidos (Salmo 37:29;
           Isaías 45:18).`,
          `Bohr: así se cumplen las dos promesas, ir con Jesús a la casa del Padre
           (Juan 14:3) y heredar la tierra (Mateo 5:5): mil años en el cielo y
           después la tierra nueva como hogar para siempre.`]) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 539-540; Escuela Sabática 2019-1T, lección 13, pág. 94; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 81; Stephen Bohr, El calendario religioso hebreo, pág. 253.</p>` },

    { t: '🧭 «El tabernáculo de Dios está ahora con los hombres» (21:3-4)', capa: 'contexto', h:
      hi(`Bohr ve aquí el <strong>último paso del santuario</strong>: Jesús vuelve al
      «campamento» para vivir con su pueblo para siempre (21:2-4). El Apocalipsis
      presenta a Jesús en este orden:`) +
      tbl(['Función', 'Dónde'], [
        ['<strong>Cordero</strong> inmolado: el sacrificio', '1:5; 1:17-18'],
        ['<strong>Sumo sacerdote</strong>: intercede', 'Capítulos 4 a 11'],
        ['<strong>Juez</strong>', 'De 11:19 al capítulo 20'],
        ['<strong>Rey</strong>', '19:11-14 y capítulos 21-22'],
      ]) +
      li([`«Tabernáculo» recuerda la <strong>Fiesta de los Tabernáculos</strong>.
           Bohr: Jesús ya «tabernaculó» entre nosotros (Juan 1:14); ahora Dios
           habitará con su pueblo para siempre.`,
          `Escuela Sabática 2019: la <strong>presencia de Dios</strong> es la que
           quita el dolor y la muerte. Marta lo sabía: «Señor, si hubieses estado
           aquí, mi hermano no habría muerto» (Juan 11:21).`]) +
      `<p>Fuentes: Stephen Bohr, El Santuario en Apocalipsis, págs. 2 y 8; Stephen Bohr, El calendario religioso hebreo, pág. 255; Escuela Sabática 2019-1T, lección 13, pág. 94.</p>` },

    { t: '🧭 La esposa: una ciudad para los fieles de todos los tiempos (21:9-14)', capa: 'contexto', h:
      hi(`El ángel dice «te mostraré la desposada, la esposa del Cordero» (21:9), y lo
      que le muestra es <strong>la ciudad</strong> (21:10). Elena de White: «la
      Esposa representa la ciudad santa», y los fieles son los invitados a las
      bodas (19:9).`) +
      li([`Bohr: en las puertas están los nombres de las <strong>doce
           tribus</strong> (21:12) y en los cimientos los de los <strong>doce
           apóstoles</strong> (21:14). Es <strong>una sola ciudad</strong> para los
           fieles del Antiguo y del Nuevo Testamento. Abraham ya la esperaba
           (Hebreos 11:10).`,
          `Bohr: es la <strong>vuelta al Edén</strong>. Adán fue echado por la
           puerta del huerto y había ángeles guardando la entrada; ahora hay ángeles en
           las puertas, pero para dejar entrar a los fieles (21:12).`,
          `Escuela Sabática 2019: tres puertas a cada lado permiten entrar desde
           cualquier dirección; la ciudad es para gente de todo el mundo.`]) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, pág. 350; Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 121 y 159; Escuela Sabática 2019-1T, lección 13, pág. 95.</p>` },

    { t: '🧭 Un cubo como el lugar santísimo, y sin templo (21:16, 21:22)', capa: 'contexto', h:
      hi(`«La longitud, la altura y la anchura de ella son iguales» (21:16): la ciudad
      es un <strong>cubo</strong>. La Escuela Sabática 2019 recuerda que el
      <strong>lugar santísimo</strong> del templo de Salomón también era un cubo
      (1 Reyes 6:20). La ciudad entera es el lugar donde se adora a Dios.<br><br>
      Por eso no hace falta templo: «el Señor Dios Todopoderoso es su templo, y el
      Cordero» (21:22). Elena de White: el pueblo de Dios tendrá «comunión directa
      con el Padre y el Hijo», y lo verá cara a cara (1 Corintios 13:12).`) +
      wa(`Es un lugar <strong>real</strong>, habitado por gente real, pero las
      palabras humanas no alcanzan para describirlo: son «cosas que ojo no vio»
      (1 Corintios 2:9).`) +
      `<p>Fuentes: Escuela Sabática 2019-1T, lección 13, pág. 95; Elena de White, El conflicto de los siglos, págs. 540 y 542.</p>` },

    { t: '🧭 Sin necesidad de sol ni de luna, pero con meses y sábados (21:23-25)', capa: 'contexto', h:
      hi(`Bohr se fija en las palabras exactas: el texto no dice que el sol y la luna
      dejarán de existir. Dice que «la ciudad no tiene necesidad de sol ni de luna»
      (21:23), porque la gloria de Dios brilla más. Lo mismo anuncia Isaías 24:23:
      la luna se avergonzará y el sol se confundirá cuando Dios reine en Sion.`) +
      li([`Habrá <strong>meses</strong>: el árbol de la vida da fruto «cada mes»
           (22:2).`,
          `Habrá <strong>sábados</strong>: «de mes en mes, y de día de reposo en día
           de reposo, vendrán todos a adorar delante de mí» (Isaías 66:22-23).`,
          `Bohr: el sol, la luna y las estrellas, movidos de su lugar en la venida,
           vuelven a su lugar cuando Dios hace cielos nuevos y tierra nueva.`,
          `Elena de White: en la ciudad «no habrá ya más noche»; es una luz que
           supera al sol sin deslumbrar.`]) +
      `<p>Fuentes: Stephen Bohr, El calendario religioso hebreo, pág. 84; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 80; Stephen Bohr, ¿Cuán cerca al fin?, págs. 210-211; Elena de White, El conflicto de los siglos, págs. 541-542.</p>` },

    { t: '🧭 Quiénes entran y quiénes quedan fuera (21:7-8, 21:27)', capa: 'contexto', h:
      hi(`Bohr: en este último ciclo se ve <strong>qué decían los libros</strong> que
      condenaron a los impíos (20:12). La lista de 21:8 (y la de 22:15) es la de los
      <strong>mandamientos</strong> quebrantados:`) +
      tbl(['En la lista', 'Mandamiento, según Bohr'], [
        ['Hechiceros', '1.º · otros dioses'],
        ['Idólatras', '2.º · imágenes'],
        ['Homicidas', '6.º · no matarás'],
        ['Fornicarios', '7.º · no cometerás adulterio'],
        ['Mentirosos', '9.º · no hablarás falso testimonio'],
      ]) +
      li([`«El vencedor heredará todas las cosas» (21:7). Bohr: el verbo griego
           (<em>nikao</em>) describe al que <strong>sigue venciendo</strong>, una
           lucha que continúa hasta la victoria.`,
          `Solo entran «los que están inscritos en el libro de la vida del
           Cordero» (21:27). Bohr: para ver a Dios hay que ser limpio de corazón
           (Mateo 5:8), y el que tiene esta esperanza «se purifica a sí mismo»
           (1 Juan 3:3), guardando la Palabra en el corazón (Salmo 119:11).`]) +
      `<p>Fuentes: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 121-122; Stephen Bohr, 15 principios de interpretación profética, vol. 2, págs. 80-81; Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 52.</p>` },

    { t: '🧭 Cómo será la vida allí (21:4-5)', capa: 'contexto', h:
      hi(`Elena de White describe la tierra nueva al final de «El conflicto de los
      siglos»:`) +
      li([`Los redimidos tendrán casas y viñas (Isaías 65:21-22): una vida real;
           construirán y plantarán.`,
          `Conocerán «como son conocidos»: amistad con los ángeles y con los fieles
           de todos los tiempos.`,
          `Aprenderán sin cansarse, y viajarán a otros mundos que nunca cayeron.`,
          `Cuanto más conozcan a Dios, más lo admirarán y lo amarán.`,
          `Del pecado quedará <strong>una sola huella</strong>: las marcas de la
           crucifixión en las manos, los pies y el costado de Jesús.`]) +
      wa(`Así termina el libro: «El gran conflicto ha terminado. Ya no hay más
      pecado ni pecadores», y toda la creación declara «que Dios es amor».`) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 540-543.</p>` },
    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Esposa del Cordero', 'La santa ciudad', '«te mostraré la desposada, la esposa del Cordero» (21:9) y le muestra «la santa Jerusalén» (21:10)'],
        ['Jerusalén', 'La ciudad y el pueblo de Dios, no la de Palestina', 'Gálatas 4:26; Hebreos 12:22-24; Hebreos 11:10'],
        ['Tabernáculo', 'Dios que vive con su pueblo', 'Éxodo 25:8; Juan 1:14; «Él morará con ellos» (21:3)'],
        ['Doce tribus y doce apóstoles', 'El pueblo de Dios de los dos Testamentos', 'Apocalipsis 21:12, 14; Efesios 2:19-20'],
        ['Cubo', 'El lugar santísimo', '1 Reyes 6:20'],
        ['Cordero', 'Jesucristo', 'Juan 1:29; Apocalipsis 5:6, 9'],
        ['Agua de la vida', 'La vida que Dios da gratis', 'Juan 4:13-14; Isaías 55:1. En la ciudad será un río real (22:1)'],
      ]) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, pág. PDF 350; Stephen Bohr, 15 principios de interpretación profética, vol. 2, págs. PDF 80 y 106; Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. PDF 159; Stephen Bohr, El calendario religioso hebreo, pág. PDF 255; Escuela Sabática 2019-1T, lección 13, pág. PDF 95.</p>` },
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
    // ── Interpretación (f:'c'): no es texto del capítulo; cada una dice su fuente ──
    { t: 'mc', v: '21:2', f: 'c',
      q: 'En la lectura adventista, ¿cuándo desciende la santa ciudad, la nueva Jerusalén, a la tierra?',
      o: ['Al terminar los mil años', 'En la segunda venida de Jesús', 'Al comenzar los mil años', 'Nunca: se queda en el cielo'], a: 0,
      e: 'Baja al final de los mil años y se asienta donde estaba el monte de los Olivos; después los impíos la rodean (20:9). El texto solo dice que Juan la vio «descender del cielo, de parte de Dios» (21:2). Fuentes: Elena de White, El conflicto de los siglos, pág. 531; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 79.' },
    { t: 'tf', v: '21:1', f: 'c',
      q: 'Según Bohr, lo que cuenta 21:1 (el cielo nuevo y la tierra nueva) ocurre antes que lo de 21:2 (la ciudad que desciende).', a: false,
      e: 'Falso: para Bohr 21:2 pasa antes, porque los impíos rodean una ciudad que ya está en la tierra (20:9); 21:1 en realidad cierra el capítulo 20. Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 79.' },
    { t: 'mc', v: '21:1', f: 'c',
      q: 'En la interpretación adventista, ¿dónde vivirán para siempre los redimidos?',
      o: ['En esta tierra, hecha nueva por Dios', 'En el cielo, lejos de toda tierra', 'En un lugar solo espiritual, sin cuerpo', 'En la Jerusalén que hoy existe'], a: 0,
      e: 'Dios purifica esta tierra y la hace el hogar eterno: «Los justos heredarán la tierra» (Salmo 37:29). El texto dice que Juan vio «un cielo nuevo y una tierra nueva» (21:1). Fuente: Elena de White, El conflicto de los siglos, pág. 540.' },
    { t: 'mc', v: '21:1', f: 'c',
      q: 'Según Elena de White, ¿qué hace con la tierra el fuego que consume a los impíos?',
      o: ['La purifica', 'La deja ardiendo para siempre', 'La convierte en desierto eterno', 'La hace desaparecer del universo'], a: 0,
      e: '«El fuego que consume a los impíos purifica la tierra»; no queda un infierno que arda para siempre. Fuente: Elena de White, El conflicto de los siglos, págs. 539-540.' },
    { t: 'mc', v: '21:1', f: 'c',
      q: 'En la interpretación adventista (Escuela Sabática 2019), ¿qué significa «nuevo» (en griego kainos) en «una tierra nueva»?',
      o: ['Nuevo en calidad, no en origen', 'Creado otra vez desde la nada', 'Un planeta distinto, en otro lugar', 'Nuevo solo en sentido espiritual'], a: 0,
      e: 'Kainos es algo nuevo en calidad: este mismo planeta, purificado por el fuego y restaurado (2 Pedro 3:10-13). Fuente: Escuela Sabática 2019-1T, lección 13, pág. 94.' },
    { t: 'tf', v: '21:1', f: 'c',
      q: 'En la interpretación adventista (Escuela Sabática 2019), «el mar ya no existía más» se relaciona con el fin de la separación, como el mar que separaba a Juan de los suyos en Patmos.', a: true,
      e: 'Verdadero: la lección piensa que Juan tenía en mente el mar de Patmos, símbolo de separación y sufrimiento. Fuente: Escuela Sabática 2019-1T, lección 13, pág. 94.' },
    { t: 'mc', v: '21:3', f: 'c',
      q: 'Según Bohr, ¿qué último paso de la obra de Jesús en el santuario muestra Apocalipsis 21:2-4?',
      o: ['Volver al campamento a vivir con su pueblo', 'Entrar al lugar santísimo para el juicio', 'Ofrecerse en el altar del sacrificio', 'Interceder en el lugar santo por todos'], a: 0,
      e: 'Después del juicio y del castigo de Azazel, Jesús «regresa al campamento de los santos para habitar con ellos para siempre». Fuente: Stephen Bohr, El Santuario en Apocalipsis, págs. 2 y 8.' },
    { t: 'mc', v: '21:3', f: 'c',
      q: 'Según Bohr, ¿en qué orden presenta el Apocalipsis las funciones de Jesús?',
      o: ['Cordero, Sacerdote, Juez y Rey', 'Rey, Juez, Sacerdote y Cordero', 'Sacerdote, Cordero, Rey y Juez', 'Juez, Cordero, Rey y Sacerdote'], a: 0,
      e: 'Cordero inmolado (1:5), Sumo sacerdote (capítulos 4 a 11), Juez (11:19 al capítulo 20) y Rey (19:11-14; capítulos 21-22). Fuente: Stephen Bohr, El Santuario en Apocalipsis, pág. 8.' },
    { t: 'mc', v: '21:4', f: 'c',
      q: 'En la lectura adventista, ¿qué significa que no habrá más muerte ni dolor (Apocalipsis 21:4)?',
      o: ['Que el pecado termina para siempre y no vuelve', 'Que solo los ángeles quedan libres del dolor', 'Que el dolor vuelve después de otros mil años', 'Que la muerte pasa a ser solo un sueño corto'], a: 0,
      e: '«El gran conflicto ha terminado. Ya no hay más pecado ni pecadores». El texto dice que no habrá más muerte, llanto, clamor ni dolor «porque las primeras cosas ya pasaron» (21:4). Fuente: Elena de White, El conflicto de los siglos, pág. 543.' },
    { t: 'tf', v: '21:4', f: 'c',
      q: 'Según Elena de White, en la tierra nueva quedará una sola huella del pecado: las marcas de la crucifixión en Jesús.', a: true,
      e: 'Verdadero: en su cabeza, su costado, sus manos y sus pies se verán «las únicas huellas» del pecado, y serán su mayor honor. Fuente: Elena de White, El conflicto de los siglos, pág. 540.' },
    { t: 'mc', v: '21:9', f: 'c',
      q: 'Según Elena de White, ¿qué muestra Apocalipsis 21:9-10 sobre la esposa del Cordero?',
      o: ['Que la esposa es la ciudad santa', 'Que la esposa es el ángel de las copas', 'Que la esposa son los veinticuatro ancianos', 'Que la esposa es un monte grande y alto'], a: 0,
      e: 'El ángel promete mostrar «la esposa del Cordero» y le muestra la ciudad: «la Esposa representa la ciudad santa». Fuente: Elena de White, El conflicto de los siglos, pág. 350.' },
    { t: 'mc', v: '21:12', f: 'c',
      q: 'Según Bohr, ¿qué enseñan los nombres de las doce tribus (en las puertas) y de los doce apóstoles (en los cimientos)?',
      o: ['Una sola ciudad para los fieles de todos los tiempos', 'Que solo entran los descendientes de Israel', 'Que cada tribu tendrá su propia ciudad', 'Que los apóstoles reemplazan a las tribus'], a: 0,
      e: 'Dios tiene una sola ciudad, compuesta por los santos de las dos épocas (Antiguo y Nuevo Testamento). Fuente: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 159.' },
    { t: 'tf', v: '21:12', f: 'c',
      q: 'Según Bohr, los ángeles de las puertas recuerdan al Edén, donde había ángeles guardando la entrada; pero en la ciudad dejan entrar a los fieles.', a: true,
      e: 'Verdadero: es la vuelta al Génesis: los que guardan los mandamientos entran por las puertas y comen del árbol de la vida (21:12; 22:14). Fuente: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 121.' },
    { t: 'mc', v: '21:16', f: 'c',
      q: 'En la interpretación adventista (Escuela Sabática 2019), ¿qué recuerda la ciudad con largo, ancho y alto iguales?',
      o: ['El lugar santísimo del templo', 'La torre de Babel en Sinar', 'El arca de Noé sobre las aguas', 'El altar de bronce del atrio'], a: 0,
      e: 'El lugar santísimo era un cubo perfecto (1 Reyes 6:20); la ciudad entera es el centro de la adoración a Dios. Fuente: Escuela Sabática 2019-1T, lección 13, pág. 95.' },
    { t: 'mc', v: '21:22', f: 'c',
      q: 'Según Elena de White, ¿qué privilegio tendrá el pueblo de Dios en una ciudad sin templo?',
      o: ['Comunión directa con el Padre y el Hijo', 'Un sacerdote para cada familia', 'Un altar de oro en cada casa', 'Un sacrificio cada día de reposo'], a: 0,
      e: 'Sin templo, el pueblo de Dios lo ve cara a cara, «sin velo que nos lo oculte». El texto: «el Señor Dios Todopoderoso es su templo, y el Cordero» (21:22). Fuente: Elena de White, El conflicto de los siglos, pág. 542.' },
    { t: 'tf', v: '21:23', f: 'c',
      q: 'Según Bohr, Apocalipsis 21:23 enseña que en la tierra nueva ya no existirán el sol ni la luna.', a: false,
      e: 'Falso: el texto dice que la ciudad «no tiene necesidad» de ellos; habrá meses y sábados (22:2; Isaías 66:22-23). Fuente: Stephen Bohr, El calendario religioso hebreo, pág. 84.' },
    { t: 'mc', v: '21:25', f: 'c',
      q: 'Según Bohr, ¿con qué ritmo se adorará a Dios en la tierra nueva, según Isaías 66:22-23?',
      o: ['De mes en mes y de sábado en sábado', 'Solo una vez al año, en una gran fiesta', 'Cada siete años, en el año del jubileo', 'Sin días ni meses, en un tiempo sin fin'], a: 0,
      e: '«De mes en mes, y de día de reposo en día de reposo, vendrán todos a adorar delante de mí». Fuentes: Stephen Bohr, El calendario religioso hebreo, pág. 84; Stephen Bohr, Gemas de la verdad presente, pág. 110.' },
    { t: 'mc', v: '21:8', f: 'c',
      q: 'Según Bohr, ¿con qué se corresponde la lista de 21:8 (homicidas, fornicarios, hechiceros, idólatras, mentirosos)?',
      o: ['Con mandamientos de la ley de Dios', 'Con las siete plagas postreras', 'Con las siete iglesias de Asia', 'Con los doce cimientos del muro'], a: 0,
      e: 'Son transgresores de los mandamientos (1.º, 2.º, 6.º, 7.º y 9.º); dentro de la ciudad están los que los guardan. Fuente: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 121-122.' },
    { t: 'mc', v: '21:7', f: 'c',
      q: 'Según Bohr, ¿qué describe el verbo griego «vencer» (nikao) en promesas como «El vencedor heredará todas las cosas» (21:7)?',
      o: ['Una lucha continua que acaba en victoria', 'Un solo triunfo que basta para siempre', 'Derrotar a otros pueblos en la guerra', 'Haber nacido en una familia fiel'], a: 0,
      e: 'Es un participio presente: «el que continúa ganando la victoria». Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 52.' },
    { t: 'mc', v: '21:6', f: 'c',
      q: 'Según Bohr, ¿cómo se relaciona el agua de vida que se bebe hoy (Juan 4:13-14) con la de la ciudad (21:6)?',
      o: ['Hoy se bebe por la fe; allí será un río real', 'Las dos son solo un símbolo', 'Hoy es real; allí será un símbolo', 'No tienen ninguna relación'], a: 0,
      e: '«Aun ahora podemos beber espiritualmente… Pero en la ciudad beberemos agua literal de un río literal». Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 80.' },
    { t: 'mc', v: '21:2', f: 'c',
      q: 'Según Bohr, ¿qué textos muestran que «Jerusalén» en la profecía es el pueblo y la ciudad de Dios, no un lugar de Palestina?',
      o: ['Gálatas 4 y Hebreos 12:22-24', 'Génesis 11 y Daniel 4', 'Jonás 3 y Nahúm 1', 'Ester 1 y Nehemías 2'], a: 0,
      e: 'Bohr pone a Israel y Jerusalén entre los lugares simbólicos de la profecía (Gálatas 3:29; 4; Romanos 9:6-8; Hebreos 12:22-24). Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 106.' },
    { t: 'tf', v: '21:3', f: 'c',
      q: 'Según Bohr, la palabra «tabernáculo» de 21:3 recuerda que Jesús ya habitó entre nosotros (Juan 1:14) y que ahora Dios vivirá con su pueblo para siempre.', a: true,
      e: 'Verdadero: en su primera venida Jesús «tabernaculó» entre nosotros; en la tierra nueva Dios será el tabernáculo con su pueblo. Fuente: Stephen Bohr, El calendario religioso hebreo, pág. PDF 255.' },
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
