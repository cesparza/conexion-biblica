/* Apocalipsis 11 — Los dos testigos y la séptima trompeta. */
const { tbl, hi, wa, li } = require('./ayudas.js');
/* Línea de fuente al pie de cada sección de interpretación. */
const fu = t => `<p class="fuente"><small>${t}</small></p>`;

module.exports = {
  cap: 'ap11', label: 'Apocalipsis 11', sub: 'Los dos testigos y la séptima trompeta', vs: 19,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`A Juan le dieron una <strong>caña para medir</strong> el templo de
      Dios.<br><br>
      Dios tiene <strong>dos testigos</strong> que predican
      <strong>1.260 días</strong> vestidos con ropas ásperas. Cuando terminan,
      una bestia los mata y la gente se alegra. Pero a los <strong>tres días y
      medio</strong> Dios les da vida otra vez y <strong>suben al cielo en una
      nube</strong>.<br><br>
      Al final suena la <strong>séptima trompeta</strong>, y en el cielo dicen
      que los reinos del mundo ya son de Dios y de su Cristo. Se abre el templo
      del cielo y se ve el <strong>Arca de su pacto</strong>.<br><br>
      <em>La idea del capítulo: aunque callen y persigan a los testigos de
      Dios, Él les devuelve la vida, y al final Él reina para siempre.</em>`) },

    { t: '📏 Medir el templo (11:1-2)', capa: 'nucleo', h:
      tbl(['Qué', 'Qué hacer'], [
        ['Lo que le dieron', 'Una <strong>caña semejante a una vara de medir</strong> (11:1)'],
        ['Medir', '<strong>El templo de Dios, el altar y a los que adoran en él</strong> (11:1)'],
        ['No medir', '<strong>El patio que está fuera del templo</strong>, porque fue entregado a los gentiles (11:2)'],
        ['Cuánto tiempo', 'Los gentiles hollarán la ciudad santa <strong>cuarenta y dos meses</strong> (11:2)'],
      ]) +
      wa(`No lo cruces con el capítulo 10: allí a Juan le dieron un
      <strong>librito para comer</strong> (10:9); aquí le dan una
      <strong>caña para medir</strong> (11:1).`) },

    { t: '👥 Los dos testigos (11:3-6)', capa: 'nucleo', h:
      tbl(['Dato', 'Qué dice el texto'], [
        ['Cuánto profetizan', '<strong>Mil doscientos sesenta días</strong> (11:3)'],
        ['Vestidos', 'Con <strong>ropas ásperas</strong> (11:3)'],
        ['Qué son', '<strong>Los dos olivos y los dos candelabros</strong> que están delante del Dios de la tierra (11:4)'],
        ['Si alguien los daña', '<strong>Sale fuego de la boca de ellos</strong> y devora a sus enemigos (11:5)'],
        ['Poder sobre el cielo', 'Cerrarlo <strong>a fin de que no llueva</strong> (11:6)'],
        ['Poder sobre las aguas', '<strong>Convertirlas en sangre</strong> (11:6)'],
        ['Poder sobre la tierra', 'Herirla con toda plaga, cuantas veces quieran (11:6)'],
      ]) +
      wa(`Son <strong>dos</strong> candelabros (11:4), no los
      <strong>siete</strong> candelabros de oro del capítulo 1 (1:12).`) },

    { t: '⚔️ Mueren y vuelven a vivir (11:7-12)', capa: 'nucleo', h:
      tbl(['#', 'Qué pasó'], [
        ['1', 'Al acabar su testimonio, <strong>la bestia que sube del abismo</strong> los vence y los mata (11:7)'],
        ['2', 'Sus cadáveres quedan en la plaza de la gran ciudad, que en sentido espiritual se llama <strong>Sodoma y Egipto</strong> (11:8)'],
        ['3', 'La gente los ve muertos <strong>tres días y medio</strong> y no deja que los sepulten (11:9)'],
        ['4', 'Los habitantes de la tierra se alegran y <strong>se envían regalos</strong> (11:10)'],
        ['5', 'Después de tres días y medio, <strong>el espíritu de vida</strong> enviado por Dios entra en ellos (11:11)'],
        ['6', 'Una gran voz del cielo: <strong>«¡Subid acá!»</strong>, y <strong>suben al cielo en una nube</strong> (11:12)'],
      ]) +
      wa(`Hay tres bestias que se confunden: la que <strong>sube del
      abismo</strong> (11:7), la que <strong>sube del mar</strong> (13:1) y la
      que <strong>sube de la tierra</strong> (13:11).`) },

    { t: '🌋 El terremoto y los ayes (11:13-14)', capa: 'nucleo', h:
      li([`Hubo un <strong>gran terremoto</strong> y <strong>la décima
           parte</strong> de la ciudad se derrumbó (11:13).`,
          `<strong>«Por el terremoto murieron siete mil hombres»</strong>
           (11:13). Los demás dieron gloria al Dios del cielo.`]) +
      tbl(['Ay', 'Dónde'], [
        ['Se anuncian los tres ayes', '8:13'],
        ['El primer ay pasó', '9:12'],
        ['<strong>El segundo ay pasó</strong>; el tercero viene pronto', '<strong>11:14</strong>'],
      ]) },

    { t: '🎺 La séptima trompeta (11:15-18)', capa: 'nucleo', h:
      hi(`El séptimo ángel tocó la trompeta y hubo grandes voces en el cielo:
      <strong>«Los reinos del mundo han venido a ser de nuestro Señor y de su
      Cristo; y él reinará por los siglos de los siglos»</strong> (11:15).`) +
      li([`<strong>Los veinticuatro ancianos</strong> se postraron sobre sus
           rostros y adoraron a Dios (11:16).`,
          `Dijeron: <strong>«Te damos gracias, Señor Dios Todopoderoso»</strong>
           (11:17).`,
          `Llegó <strong>«el tiempo de juzgar a los muertos»</strong> (11:18),
           de dar el galardón a los profetas, a los santos y a los que temen su
           nombre, y de <strong>destruir a los que destruyen la
           tierra</strong>.`]) +
      wa(`Esta es la trompeta que anunció 10:7: con ella <strong>«el misterio
      de Dios se consumará»</strong> (10:7).`) },

    { t: '🏛️ El templo abierto (11:19)', capa: 'nucleo', h:
      hi(`<strong>«El templo de Dios fue abierto en el cielo, y el Arca de su
      pacto se dejó ver en el templo»</strong> (11:19).<br><br>
      Y hubo cinco cosas: <strong>relámpagos, voces, truenos, un terremoto y
      granizo grande</strong> (11:19).`) },

    { t: '🔢 Las cifras proféticas (11, 12 y 13)', capa: 'nucleo', h:
      tbl(['Cifra', 'Dónde', 'De qué se trata'], [
        ['<strong>Cuarenta y dos meses</strong>', '11:2 · 13:5', 'Los gentiles hollan la ciudad santa · la bestia actúa'],
        ['<strong>Mil doscientos sesenta días</strong>', '11:3 · 12:6', 'Profetizan los dos testigos · la mujer en el desierto'],
        ['<strong>Un tiempo, tiempos y la mitad de un tiempo</strong>', '12:14', 'La mujer sustentada en el desierto'],
        ['<strong>Tiempo, tiempos y medio tiempo</strong>', 'Daniel 7:25 (también 12:7)', 'El cuerno pequeño contra los santos'],
        ['<strong>Tres días y medio</strong>', '11:9 · 11:11', 'Los cadáveres de los testigos'],
      ]) +
      wa(`La cuenta, si cada mes es de 30 días: 42 meses × 30 = <strong>1.260
      días</strong>. Y si cada «tiempo» es un año de 360 días (así se suele
      contar), «un tiempo, tiempos y la mitad» también dan 1.260 días.
      Pero <strong>tres días y medio</strong> (11:9) es otra cifra: no la
      cruces con los tres tiempos y medio.`) },

    { t: '🧭 Medir el templo (11:1)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Para el pastor
      <strong>Stephen Bohr</strong>, 11:1 continúa el capítulo 10: el mismo
      ángel que mandó profetizar otra vez manda ahora medir. Para él, este
      capítulo es un paréntesis dentro de la sexta trompeta.`) +
      li([`<strong>Qué templo.</strong> El del cielo: el de Jerusalén ya no
           existía. La palabra griega <em>naos</em> se usa 16 veces en el
           Apocalipsis para el santuario celestial; en 11:19 deja ver el arca,
           que estaba en el <strong>lugar santísimo</strong>.`,
          `<strong>Medir es juzgar</strong>: «con la medida con que medís, os
           será medido» (Mateo 7:2). Elena de White: «Mide el templo y los que
           adoran en él»; Dios mide nuestras palabras y acciones.`,
          `<strong>El altar</strong> es el del incienso, donde suben las
           oraciones; se examina cuáles fueron sinceras.`,
          `<strong>Los que adoran</strong> son los que dicen ser pueblo de Dios:
           el juicio comienza por la casa de Dios (1 Pedro 4:17). Hay trigo y
           cizaña, vírgenes prudentes e insensatas.`]) +
      fu(`Fuentes: Stephen Bohr, «La Razón de Nuestro Existir», pág. 72-81; Bohr,
      «Introducción a las siete trompetas», pág. 13-14 (cita el Comentario
      bíblico adventista, tomo 7, pág. 972).`) },

    { t: '🧭 Los 1.260 años y los dos testigos (11:2-4)', capa: 'contexto', h:
      li([`<strong>42 meses y 1.260 días (11:2-3).</strong> Con un día por un
           año son <strong>1.260 años, del 538 al 1798</strong>: el tiempo en
           que la iglesia sufrió bajo la opresión de Roma. En 1798 un ejército
           francés tomó preso al papa. Para Bohr es el período de la
           <strong>cuarta trompeta</strong>, que aquí se amplía.`,
          `<strong>Los dos testigos</strong> son el Antiguo y el Nuevo
           Testamento: los dos dan testimonio de Jesús (Juan 5:39). «Lámpara
           es a mis pies tu palabra» (Salmo 119:105).`,
          `<strong>Olivos y candelabros (11:4).</strong> El aceite es el
           Espíritu Santo, que inspiró los dos Testamentos (Zacarías 4); los
           candelabros, la luz que dan por medio de la iglesia.`,
          `<strong>Ropas ásperas.</strong> En la Biblia son señal de
           sufrimiento y luto: la Escritura estuvo oculta y prohibida, y sus
           fieles perseguidos. Aun así, el testimonio no calló.`]) +
      fu(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 226-227;
      Stephen Bohr, «Studies on Daniel 11», pág. 101-102; Bohr, «15 principios
      de interpretación profética», vol. 2, pág. 89 y 216.`) },

    { t: '🧭 Fuego y sequía: el poder de la Palabra (11:5-6)', capa: 'contexto', h:
      li([`<strong>Fuego de su boca (11:5).</strong> Nadie desprecia la
           Palabra de Dios sin consecuencias. Elena de White lo une con la
           advertencia final del libro: no añadir ni quitar a la profecía
           (22:18-19).`,
          `<strong>Cerrar el cielo (11:6).</strong> Como Elías cerró el cielo
           en tiempos de Acab (1 Reyes 17:1). La lluvia es figura de la
           enseñanza de Dios (Deuteronomio 32:2); donde no llueve hay
           «hambre de oír la palabra» (Amós 8:11).`,
          `<strong>Tres años y medio.</strong> La sequía de Elías duró tres
           años y seis meses (Santiago 5:17): son los 1.260 días. Como esos
           días son años, Elías aquí no es una persona sola, sino un grupo que
           vivió y predicó como él.`,
          `<strong>Aguas en sangre y plagas</strong> recuerdan a Moisés en
           Egipto. En las notas de Camilo: Moisés y Elías, la ley y los
           profetas; el pueblo fiel guarda los mandamientos y tiene el
           testimonio de Jesucristo (12:17).`]) +
      fu(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 227; Stephen
      Bohr, «Las siete iglesias», pág. 95-96; notas de Camilo en Evernote,
      "Las trompetas".`) },

    { t: '🧭 La bestia del abismo: Francia (11:7-10)', capa: 'contexto', h:
      hi(`Al final de los 1.260 años sube del abismo otro poder que hace guerra
      abierta a la Biblia. Elena de White y Bohr lo aplican a la
      <strong>Francia de la Revolución</strong>. Bohr lo une con la
      <strong>quinta trompeta</strong> y el primer ay.`) +
      li([`<strong>«Egipto» (11:8)</strong>: el ateísmo. El faraón dijo
           «¿Quién es Jehová…? Yo no conozco a Jehová» (Éxodo 5:2). En 1793 la
           asamblea francesa negó a Dios y quiso abolir la Biblia.`,
          `<strong>«Sodoma» (11:8)</strong>: la corrupción moral que acompañó
           a la Revolución.`,
          `<strong>«Donde nuestro Señor fue crucificado»</strong>: los nombres
           son simbólicos, no lugares del mapa; Sodoma ya no existía.`,
          `<strong>La fiesta (11:10)</strong>: la gente celebró verse libre de
           la iglesia y de la Biblia.`]) +
      wa(`Elena de White: «Esta profecía se cumplió de un modo muy preciso y
      sorprendente en la historia de Francia». Se habla de un régimen y sus
      decretos, no de los franceses de hoy.`) +
      fu(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 227-228;
      Stephen Bohr, «Studies on Daniel 11», pág. 102-104; Bohr, «15 principios
      de interpretación profética», vol. 2, pág. 89 y 105.`) },

    { t: '🧭 Los testigos se levantan (11:11-14)', capa: 'contexto', h:
      li([`<strong>Tres días y medio (11:9, 11)</strong> son tres años y
           medio. Elena de White: en 1793 la Asamblea francesa abolió la
           religión y desechó la Biblia; tres años y medio después revocó esos
           decretos y dio tolerancia a las Escrituras.`,
          `<strong>Suben al cielo en una nube (11:12)</strong>: la Biblia
           recibió más honra que nunca. En 1804 nació la Sociedad Bíblica
           Británica y Extranjera, y en 1816 la Sociedad Bíblica Americana.
           Bohr añade el gran despertar en el estudio de Daniel y el
           Apocalipsis.`,
          `<strong>Dos grupos (11:13).</strong> Los enemigos de los testigos y
           un remanente que «dieron gloria al Dios del cielo». Bohr lo une con
           el primer ángel: «Temed a Dios y dadle gloria» (14:7).`,
          `<strong>El segundo ay (11:14)</strong> pasa recién aquí, porque los
           capítulos 10 y 11 amplían la sexta trompeta.`]) +
      fu(`Fuentes: Elena de White, «El conflicto de los siglos», pág. 241;
      Stephen Bohr, «15 principios de interpretación profética», vol. 2,
      pág. 89-90.`) },

    { t: '🧭 La séptima trompeta y el templo abierto (11:15-19)', capa: 'contexto', h:
      li([`<strong>11:15-17, la séptima trompeta.</strong> Cristo toma
           posesión de los reinos del mundo en su segunda venida. Antes, cuando
           está a punto de sonar, se cierra la gracia (10:7).`,
          `<strong>11:18 resume el resto del libro</strong>, con Elena de White
           («Primeros escritos», pág. 36): las naciones se airan (capítulos
           12-14), viene la ira de Dios (15-19), el juicio de los muertos
           (20), el galardón (19 y 22:12) y la destrucción de los que destruyen
           la tierra (20:14-15).`,
          `<strong>11:19 abre la sección siguiente.</strong> Se abre el lugar
           santísimo en <strong>1844</strong> y se ve el arca, con la ley y el
           sábado en su centro. Relámpagos, voces y truenos recuerdan el Sinaí,
           cuando Dios dio los Diez Mandamientos (Éxodo 19:16).`]) +
      wa(`Otra lectura adventista, la que sigue Treiyer, ve sonar la séptima
      trompeta ya desde 1844, con el mensaje del juicio.`) +
      fu(`Fuentes: Stephen Bohr, «Introducción a las siete trompetas», pág. 5-6 y
      19-21; Bohr, «La Razón de Nuestro Existir», pág. 74; Bohr, «15 principios
      de interpretación profética», vol. 2, pág. 91-92 y 97; Treiyer, «Las siete
      trompetas, reseña de Ekkehardt Mueller», pág. 3.`) },
  ],

  preguntas: [
    { t: 'mc', v: '11:1', lit: 'una caña semejante a una vara de medir',
      q: '¿Qué le fue dado a Juan en Apocalipsis 11:1?',
      o: ['Una caña semejante a una vara de medir', 'Un librito abierto para comérselo', 'La llave del pozo del abismo', 'Una hoz aguda para segar la tierra'], a: 0,
      e: '«Entonces me fue dada una caña semejante a una vara de medir» (11:1).' },
    { t: 'mc', v: '11:1', lit: 'mide el templo de Dios y el altar y a los que adoran en él',
      q: '¿Qué le mandaron medir a Juan? (Apocalipsis 11:1)',
      o: ['El templo de Dios, el altar y a los que adoran en él', 'La ciudad santa, sus doce puertas y su muro', 'El patio de afuera y la plaza de la gran ciudad', 'El trono de Dios y los veinticuatro tronos'], a: 0,
      e: '«Levántate y mide el templo de Dios y el altar y a los que adoran en él» (11:1).' },
    { t: 'tf', v: '11:2',
      q: 'A Juan le mandaron medir también el patio que está fuera del templo. (Apocalipsis 11:2)', a: false,
      e: 'Falso: «el patio que está fuera del templo déjalo aparte y NO lo midas» (11:2).' },
    { t: 'mc', v: '11:2', lit: 'hollarán la ciudad santa cuarenta y dos meses',
      q: '¿Cuánto tiempo hollarán los gentiles la ciudad santa? (Apocalipsis 11:2)',
      o: ['Cuarenta y dos meses', 'Mil doscientos sesenta meses', 'Tres días y medio', 'Setenta semanas'], a: 0,
      e: '«Ellos hollarán la ciudad santa cuarenta y dos meses» (11:2).' },
    { t: 'fill', v: '11:2', ins: 'Apocalipsis 11:2 (RV1995) — Completa:',
      p: [{ x: '«Ellos hollarán la ciudad ' }, { b: 'santa', h: '¿qué ciudad?' }, { x: ' ' }, { b: 'cuarenta y dos', h: '¿cuántos meses?' }, { x: ' meses.»' }] },
    { t: 'mc', v: '11:3', lit: 'mil doscientos sesenta días',
      q: '¿Por cuántos días profetizarían los dos testigos? (Apocalipsis 11:3)',
      o: ['Mil doscientos sesenta días', 'Mil doscientos noventa días', 'Dos mil trescientos días', 'Cuarenta y dos días'], a: 0,
      e: '«…que profeticen por mil doscientos sesenta días» (11:3). Los 1.290 días son de Daniel 12:11.' },
    { t: 'mc', v: '11:3', lit: 'vestidos con ropas ásperas',
      q: '¿Cómo estaban vestidos los dos testigos? (Apocalipsis 11:3)',
      o: ['Con ropas ásperas', 'Con ropas blancas', 'Con lino fino y limpio', 'Con mantos de púrpura'], a: 0,
      e: '«…vestidos con ropas ásperas» (11:3).' },
    { t: 'mc', v: '11:3', lit: 'ordenaré a mis dos testigos que profeticen por mil doscientos sesenta días',
      q: '¿Qué texto dice «ordenaré a mis dos testigos que profeticen por mil doscientos sesenta días»?',
      o: ['Apocalipsis 11:3', 'Apocalipsis 12:6', 'Apocalipsis 11:2', 'Apocalipsis 13:5'], a: 0,
      e: 'Apocalipsis 11:3. Los mismos 1.260 días vuelven en 12:6 (la mujer en el desierto); los 42 meses están en 11:2 y 13:5.' },
    { t: 'fill', v: '11:3', ins: 'Apocalipsis 11:3 (RV1995) — Completa:',
      p: [{ x: '«Y ordenaré a mis dos ' }, { b: 'testigos', h: '¿a quiénes?' }, { x: ' que profeticen por mil doscientos sesenta ' }, { b: 'días', h: '¿días, meses o años?' }, { x: ', vestidos con ropas ásperas.»' }] },
    { t: 'mc', v: '11:4', lit: 'los dos olivos y los dos candelabros',
      q: 'Según Apocalipsis 11:4, ¿qué son los dos testigos?',
      o: ['Los dos olivos y los dos candelabros', 'Las dos alas de la gran águila', 'Los dos cuernos como de cordero', 'Las dos tablas de piedra de la ley'], a: 0,
      e: '«Estos testigos son los dos olivos y los dos candelabros que están de pie delante del Dios de la tierra» (11:4).' },
    { t: 'tf', v: '11:4',
      q: 'Los dos testigos son los dos olivos y los siete candelabros. (Apocalipsis 11:4)', a: false,
      e: 'Falso: son los dos olivos y los DOS candelabros (11:4). Los siete candelabros de oro son los de 1:12.' },
    { t: 'mc', v: '11:5', lit: 'sale fuego de la boca de ellos y devora a sus enemigos',
      q: '¿Qué pasa si alguno quiere dañar a los dos testigos? (Apocalipsis 11:5)',
      o: ['Sale fuego de su boca y devora a sus enemigos', 'Cae granizo del cielo sobre sus enemigos', 'La tierra se abre y se traga a sus enemigos', 'Un ángel baja del cielo y hiere a sus enemigos'], a: 0,
      e: '«Si alguno quiere dañarlos, sale fuego de la boca de ellos y devora a sus enemigos» (11:5).' },
    { t: 'tf', v: '11:6',
      q: 'Los dos testigos tienen poder sobre las aguas para convertirlas en sangre. (Apocalipsis 11:6)', a: true,
      e: 'Verdadero: «tienen poder sobre las aguas, para convertirlas en sangre» (11:6). También pueden cerrar el cielo para que no llueva.' },
    { t: 'mc', v: '11:7', lit: 'la bestia que sube del abismo',
      q: '¿Quién hace guerra contra los dos testigos? (Apocalipsis 11:7)',
      o: ['La bestia que sube del abismo', 'La bestia que sube del mar', 'La bestia que sube de la tierra', 'El dragón que cayó del cielo'], a: 0,
      e: '«…la bestia que sube del abismo hará guerra contra ellos» (11:7). La del mar es la de 13:1 y la de la tierra la de 13:11.' },
    { t: 'mc', v: '11:8', lit: 'en sentido espiritual se llama Sodoma y Egipto',
      q: '¿Cómo se llama en sentido espiritual la gran ciudad donde quedan los cadáveres? (Apocalipsis 11:8)',
      o: ['Sodoma y Egipto', 'Tiro y Sidón', 'Sodoma y Gomorra', 'Nínive y Babilonia'], a: 0,
      e: '«…la gran ciudad que en sentido espiritual se llama Sodoma y Egipto» (11:8).' },
    { t: 'tf', v: '11:8',
      q: 'Los cadáveres de los testigos quedan en la plaza de la gran ciudad donde también nuestro Señor fue crucificado. (Apocalipsis 11:8)', a: true,
      e: 'Verdadero (Apocalipsis 11:8).' },
    { t: 'mc', v: '11:9', lit: 'verán sus cadáveres por tres días y medio',
      q: '¿Cuánto tiempo ve la gente los cadáveres de los dos testigos? (Apocalipsis 11:9)',
      o: ['Tres días y medio', 'Cuarenta y dos días', 'Siete días completos', 'Tres días y tres noches'], a: 0,
      e: '«…verán sus cadáveres por tres días y medio» (11:9).' },
    { t: 'tf', v: '11:9',
      q: 'La gente permitió que los dos testigos fueran sepultados. (Apocalipsis 11:9)', a: false,
      e: 'Falso: «no permitirán que sean sepultados» (11:9).' },
    { t: 'mc', v: '11:10', lit: 'se enviarán regalos unos a otros',
      q: '¿Qué hacen los habitantes de la tierra por la muerte de los testigos? (Apocalipsis 11:10)',
      o: ['Se alegran y se envían regalos', 'Lloran y se visten de luto', 'Se arrepienten y dan gloria a Dios', 'Huyen a los montes y a las cuevas'], a: 0,
      e: '«Los habitantes de la tierra se regocijarán sobre ellos, se alegrarán y se enviarán regalos unos a otros» (11:10).' },
    { t: 'mc', v: '11:11', lit: 'el espíritu de vida enviado por Dios entró en ellos',
      q: '¿Qué pasó con los testigos después de tres días y medio? (Apocalipsis 11:11)',
      o: ['El espíritu de vida de Dios entró en ellos', 'Sus cuerpos fueron llevados al desierto', 'Los sepultaron en la gran ciudad', 'Un ángel los llevó al templo de Dios'], a: 0,
      e: '«…el espíritu de vida enviado por Dios entró en ellos, se levantaron sobre sus pies» (11:11).' },
    { t: 'mc', v: '11:12', lit: '¡Subid acá!',
      q: '¿Qué les dijo a los testigos la gran voz del cielo? (Apocalipsis 11:12)',
      o: ['«¡Subid acá!»', '«¡Levantaos!»', '«¡Ya está hecho!»', '«¡Venid y ved!»'], a: 0,
      e: '«Entonces oyeron una gran voz del cielo, que les decía: “¡Subid acá!”» (11:12).' },
    { t: 'tf', v: '11:12',
      q: 'Los dos testigos subieron al cielo en una nube, y los vieron sus enemigos. (Apocalipsis 11:12)', a: true,
      e: 'Verdadero (Apocalipsis 11:12).' },
    { t: 'mc', v: '11:13', lit: 'murieron siete mil hombres',
      q: '¿Cuántos hombres murieron en el terremoto de Apocalipsis 11:13?',
      o: ['Siete mil', 'Diez mil', 'Doce mil', 'Cuarenta mil'], a: 0,
      e: '«Por el terremoto murieron siete mil hombres» (11:13).' },
    { t: 'mc', v: '11:13', lit: 'la décima parte de la ciudad se derrumbó',
      q: '¿Qué parte de la ciudad se derrumbó en el terremoto? (Apocalipsis 11:13)',
      o: ['La décima parte', 'La tercera parte', 'La cuarta parte', 'La mitad'], a: 0,
      e: '«…hubo un gran terremoto y la décima parte de la ciudad se derrumbó» (11:13). La «tercera parte» es la de las trompetas (8:7-12).' },
    { t: 'tf', v: '11:13',
      q: 'Después del terremoto, los demás se aterrorizaron y dieron gloria al Dios del cielo. (Apocalipsis 11:13)', a: true,
      e: 'Verdadero (Apocalipsis 11:13).' },
    { t: 'mc', v: '11:14', lit: 'El segundo ay pasó',
      q: 'Según Apocalipsis 11:14, ¿qué ay pasó?',
      o: ['El segundo; el tercero viene pronto', 'El primero; vienen aún dos más', 'El tercero; ya no vendrá otro', 'El séptimo; el misterio se acabó'], a: 0,
      e: '«El segundo ay pasó. He aquí que el tercer ay viene pronto» (11:14). El primero pasó en 9:12.' },
    { t: 'mc', v: '11:15', lit: 'Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo',
      q: '¿Qué decían las grandes voces del cielo cuando sonó la séptima trompeta? (Apocalipsis 11:15)',
      o: ['Que los reinos del mundo son ya del Señor y de su Cristo', 'Que el Cordero era digno de tomar el libro', 'Que la gran Babilonia había caído para siempre', 'Que había llegado la hora de segar la tierra'], a: 0,
      e: '«Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo; y él reinará por los siglos de los siglos» (11:15).' },
    { t: 'mc', v: '11:15',
      q: '¿Qué texto dice «Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo»?',
      o: ['Apocalipsis 11:15', 'Apocalipsis 11:17', 'Apocalipsis 12:10', 'Apocalipsis 10:7'], a: 0,
      e: 'Apocalipsis 11:15, al sonar la séptima trompeta. En 12:10 se habla del «reino de nuestro Dios y la autoridad de su Cristo».' },
    { t: 'fill', v: '11:15', ins: 'Apocalipsis 11:15 (RV1995) — Completa:',
      p: [{ x: '«Los reinos del ' }, { b: 'mundo', h: '¿los reinos de qué?' }, { x: ' han venido a ser de nuestro Señor y de su Cristo; y él ' }, { b: 'reinará', h: '¿qué hará?' }, { x: ' por los siglos de los siglos.»' }] },
    { t: 'mc', v: '11:16', lit: 'Los veinticuatro ancianos',
      q: '¿Quiénes se postraron y adoraron a Dios después de la séptima trompeta? (Apocalipsis 11:16)',
      o: ['Los veinticuatro ancianos', 'Los cuatro seres vivientes', 'Los siete ángeles del trono', 'Los ciento cuarenta y cuatro mil'], a: 0,
      e: '«Los veinticuatro ancianos que estaban sentados en sus tronos delante de Dios, se postraron sobre sus rostros» (11:16).' },
    { t: 'tf', v: '11:16',
      q: 'Después de la séptima trompeta, los cuatro seres vivientes se postraron sobre sus rostros y adoraron a Dios. (Apocalipsis 11:16)', a: false,
      e: 'Falso: los que se postraron fueron «los veinticuatro ancianos que estaban sentados en sus tronos delante de Dios» (11:16).' },
    { t: 'mc', v: '11:17', lit: 'Te damos gracias, Señor Dios Todopoderoso',
      q: '¿Con qué palabras empieza la alabanza de los ancianos en Apocalipsis 11:17?',
      o: ['«Te damos gracias, Señor Dios Todopoderoso»', '«Santo, santo, santo es el Señor Dios»', '«Digno eres de tomar el libro y abrirlo»', '«La salvación pertenece a nuestro Dios»'], a: 0,
      e: '«Te damos gracias, Señor Dios Todopoderoso, el que eres, que eras y que has de venir» (11:17).' },
    { t: 'mc', v: '11:18', lit: 'el tiempo de juzgar a los muertos',
      q: 'Según Apocalipsis 11:18, ¿de qué llegó el tiempo?',
      o: ['De juzgar a los muertos y dar el galardón', 'De sellar a los siervos de Dios en la frente', 'De medir el templo de Dios y el altar', 'De abrir el libro de los siete sellos'], a: 0,
      e: '«…el tiempo de juzgar a los muertos, de dar el galardón a tus siervos los profetas, a los santos…» (11:18).' },
    { t: 'tf', v: '11:18',
      q: 'Según Apocalipsis 11:18, llegó el tiempo de destruir a los que destruyen la tierra.', a: true,
      e: 'Verdadero: «…y de destruir a los que destruyen la tierra» (11:18).' },
    { t: 'mc', v: '11:19', lit: 'el Arca de su pacto se dejó ver en el templo',
      q: '¿Qué se vio cuando el templo de Dios fue abierto en el cielo? (Apocalipsis 11:19)',
      o: ['El Arca de su pacto', 'El candelabro de oro', 'El altar del incienso', 'La mesa de los panes'], a: 0,
      e: '«El templo de Dios fue abierto en el cielo, y el Arca de su pacto se dejó ver en el templo» (11:19).' },
    { t: 'fill', v: '11:19', ins: 'Apocalipsis 11:19 (RV1995) — Completa:',
      p: [{ x: '«El templo de Dios fue abierto en el ' }, { b: 'cielo', h: '¿dónde?' }, { x: ', y el ' }, { b: 'Arca', h: '¿qué se dejó ver?' }, { x: ' de su pacto se dejó ver en el templo.»' }] },
    { t: 'mc', v: '11:1', f: 'c',
      q: 'Según Bohr, ¿qué templo se manda medir en Apocalipsis 11:1?',
      o: ['El lugar santísimo del santuario del cielo', 'El templo de Jerusalén, que se reconstruirá', 'El templo de Herodes antes del año 70', 'Las siete iglesias de la provincia de Asia'], a: 0,
      e: 'El templo terrenal ya no existía; la palabra naos en el Apocalipsis se refiere al santuario celestial, y en 11:19 deja ver el arca del lugar santísimo. Fuente: Stephen Bohr, «La Razón de Nuestro Existir», pág. 73-74.' },
    { t: 'mc', v: '11:1', f: 'c',
      q: 'Según Bohr, ¿qué significa «medir» en Apocalipsis 11:1?',
      o: ['Juzgar', 'Construir', 'Proteger', 'Contar los años'], a: 0,
      e: 'Medir es juzgar: «con la medida con que medís, os será medido» (Mateo 7:2). Es el juicio que comenzó en 1844. Fuente: Stephen Bohr, «La Razón de Nuestro Existir», pág. 77-78.' },
    { t: 'mc', v: '11:1', f: 'c',
      q: 'Según Bohr, ¿qué altar se mide y por qué?',
      o: ['El del incienso: se examinan las oraciones', 'El del sacrificio: se cuentan las víctimas', 'El del atrio: se calcula su tamaño', 'El de Jerusalén: se prepara su reconstrucción'], a: 0,
      e: 'Es el altar del incienso, porque el atrio con el altar del sacrificio no se mide (11:2); se mide para ver qué oraciones fueron sinceras. Fuente: Stephen Bohr, «La Razón de Nuestro Existir», pág. 78-80.' },
    { t: 'tf', v: '11:1', f: 'c',
      q: 'Según Bohr, los que adoran en el templo son los que dicen ser pueblo de Dios, porque el juicio comienza por la casa de Dios (1 Pedro 4:17).', a: true,
      e: 'Verdadero: en la iglesia hay trigo y cizaña; por eso hay que medir a los que adoran. Fuente: Stephen Bohr, «La Razón de Nuestro Existir», pág. 80-81.' },
    { t: 'mc', v: '11:2', f: 'c',
      q: 'Según Elena de White, ¿a qué años corresponden los 42 meses de Apocalipsis 11:2?',
      o: ['Del 538 al 1798', 'Del 457 a.C. al 34 d.C.', 'Del 1793 al 1797', 'Del 1798 al 1844'], a: 0,
      e: 'Los 42 meses y los 1.260 días son el mismo período: 1.260 años de dominio papal, del 538 al 1798. Fuente: Elena de White, «El conflicto de los siglos», pág. 226.' },
    { t: 'mc', v: '11:2-6', f: 'c',
      q: 'Según Bohr, ¿qué trompeta amplía Apocalipsis 11:2-6?',
      o: ['La cuarta', 'La quinta', 'La sexta', 'La séptima'], a: 0,
      e: 'Apocalipsis 11:2-6 vuelve a los 1.260 años de dominio papal (538-1798), que para Bohr son la cuarta trompeta. Fuente: Stephen Bohr, «15 principios de interpretación profética», vol. 2, pág. 89.' },
    { t: 'mc', v: '11:3', f: 'c',
      q: 'Según Elena de White y Bohr, ¿quiénes son los dos testigos?',
      o: ['El Antiguo y el Nuevo Testamento', 'Enoc y Elías, que volverán al final', 'Los apóstoles Pedro y Pablo', 'Dos ángeles que están ante el trono'], a: 0,
      e: 'Los dos testigos son las Escrituras del Antiguo y del Nuevo Testamento, que dan testimonio de Jesús. Fuentes: Elena de White, «El conflicto de los siglos», pág. 226; Stephen Bohr, «Studies on Daniel 11», pág. 101.' },
    { t: 'mc', v: '11:3', f: 'c',
      q: 'Según Bohr, ¿qué indica que los testigos profeticen «vestidos con ropas ásperas»?',
      o: ['Sufrimiento: la Biblia oculta y prohibida', 'Pobreza: los profetas no tenían dinero', 'Humildad: rechazaban los títulos', 'Fiesta: celebraban su victoria'], a: 0,
      e: 'Las ropas ásperas (cilicio) son señal de sufrimiento y luto: durante los 1.260 años la Biblia dio su testimonio en oscuridad. Fuentes: Stephen Bohr, «Studies on Daniel 11», pág. 101-102; Elena de White, «El conflicto de los siglos», pág. 226-227.' },
    { t: 'mc', v: '11:4', f: 'c',
      q: 'Según Bohr, ¿qué representa el aceite de los dos olivos?',
      o: ['El Espíritu Santo, que inspiró la Biblia', 'La riqueza de la iglesia medieval', 'La sangre de los mártires', 'La paz entre dos naciones'], a: 0,
      e: 'El aceite es el Espíritu Santo, que inspiró los dos Testamentos (2 Pedro 1:21); los candelabros, la luz que dan por medio de la iglesia. Fuente: Stephen Bohr, «Studies on Daniel 11», pág. 101.' },
    { t: 'mc', v: '11:6', f: 'c',
      q: 'Según Bohr, ¿qué representa que no llueva en los días de la profecía de los testigos?',
      o: ['La escasez de la Palabra de Dios', 'Una sequía literal en la Europa medieval', 'El cierre del tiempo de gracia', 'Las plagas de Egipto repetidas'], a: 0,
      e: 'La lluvia es figura de la enseñanza de Dios (Deuteronomio 32:2); donde no llueve hay «hambre de oír la palabra» (Amós 8:11). Fuente: Stephen Bohr, «Las siete iglesias», pág. 96.' },
    { t: 'mc', v: '11:7', f: 'c',
      q: 'Según Elena de White y Bohr, ¿qué poder es «la bestia que sube del abismo»?',
      o: ['La Francia de la Revolución', 'El papado de la Edad Media', 'El Imperio otomano', 'La Roma de los césares'], a: 0,
      e: 'Al final de los 1.260 años un poder hizo guerra abierta a la Biblia: Francia, en la Revolución. Fuentes: Elena de White, «El conflicto de los siglos», pág. 227-228; Stephen Bohr, «15 principios de interpretación profética», vol. 2, pág. 105.' },
    { t: 'mc', v: '11:8', f: 'c',
      q: 'Según Elena de White, ¿qué rasgo representa el nombre simbólico «Egipto» en 11:8?',
      o: ['El ateísmo: negar al Dios vivo', 'La esclavitud del pueblo de Dios', 'La riqueza de sus gobernantes', 'El culto a los animales'], a: 0,
      e: 'Egipto fue la nación que con más osadía negó al Dios vivo: el faraón dijo «Yo no conozco a Jehová» (Éxodo 5:2). Sodoma representa la corrupción moral. Fuente: Elena de White, «El conflicto de los siglos», pág. 228.' },
    { t: 'tf', v: '11:8', f: 'c',
      q: 'Según Bohr, «Sodoma y Egipto» en 11:8 son lugares literales del mapa.', a: false,
      e: 'Falso: el texto dice «en sentido espiritual»; Sodoma ya no existía y Jesús no fue crucificado en Egipto. Son símbolos. Fuente: Stephen Bohr, «Studies on Daniel 11», pág. 102.' },
    { t: 'mc', v: '11:9-11', f: 'c',
      q: 'Según Elena de White, ¿cómo se cumplieron los tres días y medio de los testigos muertos?',
      o: ['Tres años y medio tras los decretos de 1793', 'Tres días literales en una plaza de París', 'Los 1.260 años de dominio del papado', 'Del 1798 al 1844, hasta el juicio'], a: 0,
      e: 'En 1793 la Asamblea francesa abolió la religión y desechó la Biblia; tres años y medio después revocó esos decretos. Fuente: Elena de White, «El conflicto de los siglos», pág. 241.' },
    { t: 'mc', v: '11:12', f: 'c',
      q: 'Según Elena de White, ¿qué cumplimiento tuvo que los testigos subieran al cielo en una nube?',
      o: ['La Biblia honrada como nunca: sociedades bíblicas', 'La resurrección literal de dos profetas', 'El arrebatamiento secreto de la iglesia', 'La caída del Imperio otomano en 1840'], a: 0,
      e: 'Desde entonces la Biblia recibió más honra que nunca: en 1804 la Sociedad Bíblica Británica y Extranjera, en 1816 la Americana. Fuente: Elena de White, «El conflicto de los siglos», pág. 241.' },
    { t: 'mc', v: '11:13', f: 'c',
      q: 'Según Bohr, ¿con qué mensaje se une que los demás «dieron gloria al Dios del cielo» (11:13)?',
      o: ['El del primer ángel (14:7)', 'El de la caída de Babilonia (14:8)', 'El del sexto sello (6:12)', 'El de la séptima plaga (16:17)'], a: 0,
      e: 'El remanente que «teme a Dios y le da gloria» adelanta el mensaje del primer ángel: «Temed a Dios y dadle gloria» (14:7). Fuente: Stephen Bohr, «15 principios de interpretación profética», vol. 2, pág. 90.' },
    { t: 'mc', v: '11:15', f: 'c',
      q: 'Según Bohr, ¿qué ocurre cuando suena la séptima trompeta?',
      o: ['Cristo toma los reinos del mundo en su venida', 'Empieza el juicio celestial en 1844', 'Termina la Revolución Francesa', 'Se abre el librito de Daniel'], a: 0,
      e: 'La séptima trompeta es la segunda venida, cuando Cristo toma posesión de los reinos; antes, al estar por sonar, se cierra la gracia (10:7). Otra lectura adventista, la de Treiyer, la hace empezar en 1844. Fuentes: Bohr, «15 principios de interpretación profética», vol. 2, pág. 97; Treiyer, «Las siete trompetas, reseña de Ekkehardt Mueller», pág. 3.' },
    { t: 'mc', v: '11:18', f: 'c',
      q: 'Según Bohr, ¿qué es Apocalipsis 11:18 dentro del libro?',
      o: ['Un resumen de los capítulos 12 al 22', 'La conclusión de los capítulos 8 al 11', 'Una descripción de la Revolución', 'Una lista de las siete plagas'], a: 0,
      e: 'Con Elena de White (Primeros escritos, pág. 36), Bohr ve en 11:18 cinco etapas: las naciones se airan (12-14), la ira de Dios (15-19), el juicio de los muertos (20), el galardón y la destrucción de los que destruyen la tierra. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 5-6.' },
    { t: 'mc', v: '11:19', f: 'c',
      q: 'Según Bohr, ¿qué muestra el arca vista en el templo abierto (11:19)?',
      o: ['El lugar santísimo abierto en 1844', 'Que el templo de Jerusalén volverá', 'El fin del santuario del cielo', 'Que el arca de Noé será hallada'], a: 0,
      e: 'Es la apertura del lugar santísimo en 1844: se ve el arca con la ley y el sábado; el versículo abre la sección de los capítulos 12 al 14. Fuentes: Stephen Bohr, «La Razón de Nuestro Existir», pág. 74; Bohr, «15 principios de interpretación profética», vol. 2, pág. 91-92.' },
  ],

  tarjetas: [
    { f: 'Qué le dieron a Juan y qué debía medir (11:1)', r: 'Una caña como vara de medir; el templo de Dios, el altar y a los que adoran en él' },
    { f: 'Cuánto hollarán los gentiles la ciudad santa (11:2)', r: 'Cuarenta y dos meses' },
    { f: 'Cuánto profetizan los dos testigos y cómo visten (11:3)', r: 'Mil doscientos sesenta días, vestidos con ropas ásperas' },
    { f: 'Qué son los dos testigos (11:4)', r: 'Los dos olivos y los dos candelabros' },
    { f: 'Quién mata a los testigos (11:7)', r: 'La bestia que sube del abismo' },
    { f: 'Nombre espiritual de la gran ciudad (11:8)', r: 'Sodoma y Egipto' },
    { f: 'Cuánto tiempo quedaron muertos (11:9, 11:11)', r: 'Tres días y medio' },
    { f: 'Qué les dijo la voz del cielo (11:12)', r: '«¡Subid acá!»; y subieron al cielo en una nube' },
    { f: 'El terremoto de 11:13', r: 'Se derrumbó la décima parte de la ciudad y murieron siete mil hombres' },
    { f: '«Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo»', r: 'Apocalipsis 11:15 (séptima trompeta)' },
    { f: 'Qué se vio en el templo abierto en el cielo (11:19)', r: 'El Arca de su pacto' },
    { f: '42 meses y 1.260 días: dónde', r: '42 meses: 11:2 y 13:5. 1.260 días: 11:3 y 12:6' },
  ],
};
