/* Apocalipsis 18 — La caída de Babilonia.
   Sigue el modelo de cap01.js; se revisa con tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap18', label: 'Apocalipsis 18', sub: 'La caída de Babilonia', vs: 24,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Un ángel baja del cielo con tanta luz que <strong>la tierra se
      ilumina</strong>, y grita: <strong>«¡Ha caído, ha caído la gran
      Babilonia!»</strong> (18:2).<br><br>
      Otra voz del cielo llama con cariño: <strong>«¡Salid de ella, pueblo
      mío»</strong> (18:4). Dios no quiere que sus hijos sufran las plagas.<br><br>
      Los reyes, los comerciantes y los marineros lloran desde lejos, porque la
      gran ciudad se quema <strong>en una sola hora</strong>. Al final, un ángel
      tira al mar una piedra enorme, como de molino: así cae Babilonia y nunca
      más será hallada.<br><br>
      <em>La idea del capítulo: Dios llama a su pueblo a salir de Babilonia
      antes de que llegue su juicio.</em>`) },

    { t: '👼 El ángel que alumbra la tierra (18:1-3)', capa: 'nucleo', h:
      hi(`Juan vio <strong>otro ángel que descendía del cielo con gran
      poder</strong>, y <strong>«la tierra fue alumbrada con su gloria»</strong>
      (18:1).`) +
      tbl(['En qué se convirtió Babilonia (18:2)'], [
        ['Habitación de <strong>demonios</strong>'],
        ['Guarida de todo <strong>espíritu inmundo</strong>'],
        ['Albergue de toda <strong>ave inmunda y aborrecible</strong>'],
      ]) +
      tbl(['Quién', 'Qué hizo con Babilonia (18:3)'], [
        ['Todas las naciones', 'Bebieron <strong>del vino del furor de su fornicación</strong>'],
        ['Los reyes de la tierra', '<strong>Fornicaron</strong> con ella'],
        ['Los mercaderes de la tierra', 'Se <strong>enriquecieron</strong> con el poder de sus lujos'],
      ]) +
      wa(`El grito «¡Ha caído, ha caído…!» ya se oyó en 14:8, de boca del
      <strong>segundo</strong> ángel. En 18:2 lo repite un ángel que
      <strong>alumbra toda la tierra</strong>.`) },

    { t: '📣 «Salid de ella, pueblo mío» (18:4-8)', capa: 'nucleo', h:
      hi(`<strong>«¡Salid de ella, pueblo mío, para que no seáis partícipes de
      sus pecados ni recibáis parte de sus plagas!»</strong> (18:4). Las dos
      razones: <strong>no participar de sus pecados</strong> y <strong>no
      recibir sus plagas</strong>.`) +
      li([`<strong>«sus pecados han llegado hasta el cielo»</strong> y Dios se ha
           <strong>acordado</strong> de sus maldades (18:5).`,
          `<strong>«pagadle el doble según sus obras»</strong> (18:6).`,
          `Lo que dice en su corazón: <strong>«Yo estoy sentada como una reina,
           no soy viuda y no veré llanto»</strong> (18:7).`,
          `<strong>«en un solo día vendrán sus plagas»</strong>: muerte, llanto y
           hambre, y será <strong>quemada con fuego</strong> (18:8).`,
          `La razón: <strong>«poderoso es Dios el Señor, que la juzga»</strong> (18:8).`]) +
      wa(`Un solo <strong>DÍA</strong> para las plagas (18:8); una sola
      <strong>HORA</strong> en los lamentos (18:10, 18:17, 18:19).`) },

    { t: '👑 Los reyes lloran (18:9-10)', capa: 'nucleo', h:
      hi(`Los reyes de la tierra que vivieron en deleites con ella
      <strong>llorarán</strong> «cuando vean el humo de su incendio» (18:9).
      Se ponen <strong>lejos</strong>, por el temor de su tormento, y dicen:<br><br>
      <strong>«¡Ay, ay de la gran ciudad, de Babilonia, la ciudad fuerte!,
      porque en una sola hora vino tu juicio»</strong> (18:10).`) +
      wa(`Nadie se acerca a ayudarla: los tres grupos que lloran (reyes,
      mercaderes y gente del mar) <strong>se ponen lejos</strong> (18:10, 18:15,
      18:17).`) },

    { t: '🛒 Las mercaderías que nadie compra (18:11-14)', capa: 'nucleo', h:
      hi(`Los mercaderes lloran <strong>«porque ninguno compra más sus
      mercaderías»</strong> (18:11). La lista, en el orden del texto:`) +
      tbl(['Grupo', 'Mercaderías (18:12-13)'], [
        ['Metales y joyas', 'Oro y plata; piedras preciosas y perlas'],
        ['Telas', 'Lino fino, púrpura, seda y escarlata'],
        ['Maderas y marfil', 'Madera olorosa, objetos de marfil y de madera preciosa'],
        ['Metales y piedra', 'Cobre, hierro y mármol'],
        ['Aromas', 'Canela y especias; <strong>incienso, mirra y olíbano</strong>'],
        ['Comida', 'Vino y aceite; flor de harina y trigo'],
        ['Animales y carros', 'Bestias y ovejas; caballos y carros'],
        ['Al final', '<strong>Esclavos y almas de hombres</strong>'],
      ]) +
      hi(`Y le dicen a la ciudad: las cosas exquisitas y espléndidas
      <strong>«te han faltado y nunca más las hallarás»</strong> (18:14).`) },

    { t: '💰 El lamento de los mercaderes (18:15-17)', capa: 'nucleo', h:
      hi(`Los mercaderes que se enriquecieron a costa de ella se ponen lejos,
      llorando, y dicen:<br><br>
      <strong>«¡Ay, ay de la gran ciudad, que estaba vestida de lino fino,
      púrpura y escarlata, y estaba adornada de oro, piedras preciosas y
      perlas!»</strong> (18:16)<br><br>
      <strong>«porque en una sola hora han sido consumidas tantas
      riquezas»</strong> (18:17).`) +
      wa(`La misma ropa tenía la mujer de 17:4: <strong>púrpura y
      escarlata</strong>, con oro, piedras preciosas y perlas. Babilonia es la
      gran ciudad y es también la mujer (17:18).`) },

    { t: '⛵ La gente del mar (18:17-20)', capa: 'nucleo', h:
      li([`Se pusieron lejos: <strong>todo piloto</strong>, los que viajan en
           naves, <strong>los marineros</strong> y todos los que trabajan en el
           mar (18:17).`,
          `Al ver el humo gritaban: <strong>«¿Qué ciudad era semejante a esta gran
           ciudad?»</strong> (18:18).`,
          `<strong>Echaron polvo sobre sus cabezas</strong> y lloraban (18:19).`,
          `Su lamento: <strong>«¡En una sola hora ha sido desolada!»</strong> (18:19).`]) +
      tbl(['Quién lamenta', 'Versículos'], [
        ['1. Los reyes de la tierra', '18:9-10'],
        ['2. Los mercaderes de la tierra', '18:11-17'],
        ['3. Pilotos, marineros y gente del mar', '18:17-19'],
      ]) +
      hi(`En cambio, el cielo se alegra: <strong>«Alégrate sobre ella, cielo, y
      vosotros santos, apóstoles y profetas»</strong> (18:20).`) },

    { t: '🪨 La piedra de molino (18:21-24)', capa: 'nucleo', h:
      hi(`<strong>Un ángel poderoso</strong> tomó una piedra <strong>«como una
      gran piedra de molino»</strong> y la arrojó <strong>en el mar</strong>
      (18:21): <strong>«Con el mismo ímpetu será derribada Babilonia, la gran
      ciudad, y nunca más será hallada»</strong> (18:21).`) +
      tbl(['Lo que no habrá más en ella (18:22-23)'], [
        ['Voz de <strong>arpistas, músicos, flautistas y trompetistas</strong>'],
        ['<strong>Artífice</strong> de oficio alguno'],
        ['<strong>Ruido de molinos</strong>'],
        ['<strong>Luz de lámpara</strong>'],
        ['<strong>Voz de esposo y esposa</strong>'],
      ]) +
      li([`Sus mercaderes eran <strong>los grandes de la tierra</strong> (18:23).`,
          `<strong>«por tus hechicerías fueron engañadas todas las naciones»</strong> (18:23).`,
          `En ella se halló <strong>«la sangre de los profetas y de los
           santos»</strong> (18:24).`]) },

    { t: '🧭 Otro ángel con gran poder: el fuerte pregón (18:1)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Babilonia es un
      <strong>sistema</strong>, no las personas que están en él.<br><br>
      Bohr llama a este ángel el del <strong>fuerte clamor</strong> (también
      «fuerte pregón»): amplía e intensifica los tres mensajes de Apocalipsis
      14:6-12. Así como el «clamor de medianoche» de 1844 dio fuerza al mensaje
      del segundo ángel, este dará fuerza al del tercero, con más poder y en
      todo el mundo. Elena de White: su obra «comienza a tiempo para unirse a
      la última magna obra del mensaje del tercer ángel».`) +
      li([`Será como <strong>Pentecostés</strong>: la «lluvia temprana» del
           Espíritu marcó el comienzo del evangelio, y la «lluvia tardía»
           marcará su final, con milagros y sanidades.`,
          `Lo darán <strong>instrumentos humildes</strong>, preparados más por
           el Espíritu que por los estudios.`,
          `Al mismo tiempo Satanás hará falsos milagros, hasta hacer caer fuego
           del cielo (13:13).`,
          `Bohr: la <strong>gloria</strong> que alumbra la tierra es el carácter
           de Dios que su pueblo refleja.`]) +
      hi(`Fuentes: Bohr, «Culto en el trono de Satanás», pág. 105 y 111 (cita
      «Primeros escritos», pág. 277); Elena de White, «El conflicto de los
      siglos», pág. 664 y 669-670; Bohr, «El Mensaje de los Tres Ángeles»,
      tomo 2, pág. 220-221.`) },

    { t: '🧭 Apocalipsis 14:8 y 18:1-5, lado a lado', capa: 'contexto', h:
      hi(`Bohr compara el mensaje del segundo ángel con el de este capítulo.
      El mensaje es el mismo («ha caído Babilonia»), pero ahora más completo y
      urgente:`) +
      tbl(['14:8', '18:1-5'], [
        ['Un ángel proclama', 'Un ángel desciende con gran poder'],
        ['No se menciona voz potente', 'Clama con voz potente'],
        ['No hay llamado a salir', 'Llamado a salir antes de las plagas'],
        ['No se mencionan demonios', 'Babilonia es habitación de demonios'],
        ['No se nombran reyes ni mercaderes', 'Se nombran reyes y mercaderes'],
        ['No se habla de su castigo', 'Sus pecados llegaron al cielo; viene el castigo'],
      ]) +
      hi(`Elena de White explica por qué: el anuncio de 1844 se repite «con la
      mención adicional de las corrupciones» que entraron en las
      organizaciones religiosas desde entonces. Cada vez que se rechaza la
      verdad hay más confusión, y al aceptar el espiritismo se abre la puerta a
      la influencia de los ángeles malos.`) +
      hi(`Fuentes: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág.
      215-216; Elena de White, «El conflicto de los siglos», pág.
      661-662.`) },

    { t: '🧭 Habitación de demonios, vino y mercaderes (18:2-3)', capa: 'contexto', h:
      li([`<strong>Tres frases paralelas</strong> (habitación de demonios,
           guarida de espíritus inmundos, albergue de aves inmundas): para Bohr
           muestran que la apostasía de Babilonia creció desde 1844 hasta no
           tener remedio. Confirma lo de 16:13-14: los espíritus de demonios
           mueven la alianza final.`,
          `<strong>Las aves aborrecibles</strong> no son gorriones: son aves
           de rapiña que comen carroña, como las de 19:17.`,
          `<strong>El vino</strong>: falsas doctrinas que emborrachan y
           enfurecen a las naciones (ver la sección sobre 17:4).`,
          `<strong>Los reyes</strong>: la unión de la iglesia con el estado.`,
          `<strong>Los mercaderes</strong>: el trasfondo es Tiro (Ezequiel 27).
           Bohr los une con 13:17, donde nadie podía comprar ni vender sin la
           marca; en el capítulo 18 se da vuelta la mesa y la que prohibía
           comerciar queda en la ruina.`]) +
      hi(`Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág.
      221-223.`) },

    { t: '🧭 «Salid de ella, pueblo mío» (18:4)', capa: 'contexto', h:
      hi(`Para Bohr, esta «otra voz del cielo» no es la del ángel que alumbra
      la tierra: es <strong>la voz de Dios mismo</strong> llamando a los
      suyos. El modelo está en el Antiguo Testamento: Dios llamó a Israel a
      salir de la Babilonia literal (Isaías 48:20; Jeremías 50:8; 51:6, 45),
      no para andar sin rumbo, sino para volver a Jerusalén. Al final llama a
      su Israel espiritual a salir de la Babilonia espiritual.`) +
      li([`Elena de White: la mayoría de los verdaderos discípulos de Cristo
           todavía están en esas iglesias; muchos nunca oyeron las verdades
           para este tiempo y tienen sed de más luz.`,
          `Es el <strong>último mensaje</strong> que se dará al mundo, y llega
           antes de las plagas: por eso dice «ni recibáis parte de sus
           plagas».`,
          `Es un llamado de amor a personas sinceras, no una condena a
           ellas.`]) +
      hi(`Fuentes: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág.
      218-219 y 223-224; Elena de White, «El conflicto de los siglos», pág.
      441-442.`) },

    { t: '🧭 Por qué cae Babilonia (18:5-8)', capa: 'contexto', h:
      hi(`Bohr resume los pecados de Babilonia en Apocalipsis 17 y 18:`) +
      tbl(['Pecado', 'Dónde se ve'], [
        ['Orgullo y arrogancia', '18:7'],
        ['Materialismo', '18:11-14'],
        ['Dar al mundo el vino de la falsa doctrina', '14:8; 17:2; 18:3'],
        ['Unir la iglesia con el estado', '17:2; 18:3'],
        ['Perseguir al pueblo de Dios', '17:6; 18:20, 24'],
        ['Engañar con hechicerías', '16:13-14; 18:23'],
      ]) +
      hi(`<strong>«Dios se ha acordado»</strong> no quiere decir que se le había
      olvidado: Dios espera hasta que la copa de maldad está llena, como con
      Sodoma o los amorreos (Génesis 15:16), y entonces ejecuta la sentencia.
      Para Bohr, el castigo llega a su punto final en las últimas dos plagas,
      cuando las multitudes le retiran su apoyo y se vuelven contra ella
      (16:19; 17:16).`) +
      hi(`Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág.
      224-225.`) },

    { t: '🧭 Los lamentos y la piedra de molino (18:9-24)', capa: 'contexto', h:
      tbl(['Versículos', 'Qué pasa, según Bohr'], [
        ['18:9-10', 'Lloran los poderes civiles de la tierra'],
        ['18:11-16', 'Lloran los grandes capitalistas, «los grandes de la tierra» (18:23)'],
        ['18:17-19', 'Lloran los empleados y los viajeros del mar'],
        ['18:20', 'El cielo se alegra por la caída de Babilonia'],
        ['18:21-24', 'La ciudad se hunde y cesan todas sus actividades'],
      ]) +
      li([`<strong>La piedra de molino</strong>: el ángel repite lo que hizo
           Jeremías cuando arrojó una piedra al Éufrates y dijo «así se hundirá
           Babilonia» (Jeremías 51:63-64). Doukhan nota que el molino servía
           para vivir (Deuteronomio 24:6): ya nadie lo usa, porque Babilonia
           quedó vacía.`,
          `<strong>Las hechicerías</strong> (18:23): los engaños con que
           Babilonia se ganó a las naciones, como los espíritus que hacen
           señales de 16:14.`]) +
      hi(`Fuentes: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 217 y
      224; Doukhan, «Secretos del Apocalipsis», pág. 182-183; Vicuña,
      «Interpretación histórica del Apocalipsis», pág. 145.`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Babilonia, la gran ciudad', 'Confusión; el sistema religioso que se apartó de Dios', 'Génesis 11:9; Apocalipsis 17:5, 18'],
        ['La gloria que alumbra la tierra', 'El carácter de Dios, reflejado en su pueblo', 'Éxodo 33:18-19 y 34:6-7: Moisés pide ver la gloria y Dios le muestra su bondad y su nombre'],
        ['El vino de su fornicación', 'Falsas doctrinas', 'Jeremías 51:7; Apocalipsis 14:8; 17:2'],
        ['Aves inmundas y aborrecibles', 'Aves de rapiña que comen carroña', 'Levítico 11:13 (el águila y el azor son abominación); Apocalipsis 19:17-18'],
        ['Los mercaderes', 'El comercio que se enriqueció con ella', 'Ezequiel 27 (los mercaderes de Tiro); Apocalipsis 13:17'],
        ['«Salid de ella»', 'Dios llama a su pueblo a dejar el sistema antes del castigo', 'Jeremías 50:8; 51:6, 45; Isaías 48:20'],
        ['La piedra de molino', 'Una caída total y sin regreso', 'Jeremías 51:63-64: Jeremías hundió una piedra en el Éufrates'],
        ['Las hechicerías', 'El engaño del espiritismo', 'Deuteronomio 18:10-12; Apocalipsis 16:14'],
      ]) +
      hi(`Fuentes: Bohr, «15 principios de interpretación profética», tomo 2,
      pág. 102-104; Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág.
      220-224; Bohr, «Apocalipsis 17», pág. 11; Doukhan, «Secretos del
      Apocalipsis», pág. 182.`) },
  ],

  preguntas: [
    { t: 'mc', v: '18:1', lit: 'la tierra fue alumbrada con su gloria',
      q: '¿Qué pasó con la tierra cuando descendió el ángel de Apocalipsis 18:1?',
      o: ['Fue alumbrada con su gloria', 'Tembló con un gran estruendo', 'Se cubrió de tinieblas', 'Se secó como en verano'], a: 0,
      e: '«…y la tierra fue alumbrada con su gloria» (18:1).' },
    { t: 'tf', v: '18:1',
      q: 'El ángel de Apocalipsis 18:1 subía de la tierra hacia el cielo.', a: false,
      e: 'Falso: «vi otro ángel que DESCENDÍA del cielo con gran poder» (18:1).' },
    { t: 'mc', v: '18:2', lit: 'Ha caído, ha caído la gran Babilonia',
      q: '¿Qué texto dice «¡Ha caído, ha caído la gran Babilonia!»?',
      o: ['Apocalipsis 18:2', 'Apocalipsis 18:21', 'Apocalipsis 17:5', 'Apocalipsis 18:10'], a: 0,
      e: 'Apocalipsis 18:2. Un grito parecido da el segundo ángel en 14:8.' },
    { t: 'mc', v: '18:2', lit: 'habitación de demonios',
      q: 'Según Apocalipsis 18:2, ¿en qué se ha convertido Babilonia?',
      o: ['En habitación de demonios', 'En un desierto sin agua', 'En un monte de ceniza', 'En un lago de fuego'], a: 0,
      e: '«Se ha convertido en habitación de demonios, en guarida de todo espíritu inmundo…» (18:2).' },
    { t: 'mc', v: '18:3', lit: 'los mercaderes de la tierra se han enriquecido',
      q: 'Según Apocalipsis 18:3, ¿quiénes se han enriquecido con el poder de sus lujos?',
      o: ['Los mercaderes de la tierra', 'Los reyes del oriente', 'Los falsos profetas', 'Los ancianos del pueblo'], a: 0,
      e: '«…y los mercaderes de la tierra se han enriquecido con el poder de sus lujos sensuales» (18:3).' },
    { t: 'tf', v: '18:3',
      q: 'Según Apocalipsis 18:3, todas las naciones han bebido del vino del furor de su fornicación.', a: true,
      e: 'Verdadero (Apocalipsis 18:3).' },
    { t: 'mc', v: '18:4', lit: 'Salid de ella, pueblo mío',
      q: '¿Qué texto dice «¡Salid de ella, pueblo mío!»?',
      o: ['Apocalipsis 18:4', 'Apocalipsis 18:2', 'Apocalipsis 18:20', 'Apocalipsis 19:5'], a: 0,
      e: 'Apocalipsis 18:4. Es «otra voz del cielo», no el ángel de 18:1.' },
    { t: 'mc', v: '18:4', lit: 'para que no seáis partícipes de sus pecados ni recibáis parte de sus plagas',
      q: 'Según Apocalipsis 18:4, ¿para qué debe salir de Babilonia el pueblo de Dios?',
      o: ['Para no participar de sus pecados ni recibir sus plagas', 'Para ir a pelear contra la bestia y sus reyes', 'Para llevar la sangre de los santos al templo', 'Para construir otra ciudad junto al mar'], a: 0,
      e: '«…para que no seáis partícipes de sus pecados ni recibáis parte de sus plagas» (18:4).' },
    { t: 'fill', v: '18:4', ins: 'Apocalipsis 18:4 (RV1995) — Completa:',
      p: [{ x: '«¡Salid de ella, ' }, { b: 'pueblo', h: '¿a quién llama?' }, { x: ' mío, para que no seáis partícipes de sus ' }, { b: 'pecados', h: '¿de qué?' }, { x: ' ni recibáis parte de sus ' }, { b: 'plagas', h: '¿de qué?' }, { x: '!»' }] },
    { t: 'mc', v: '18:5', lit: 'sus pecados han llegado hasta el cielo',
      q: 'Según Apocalipsis 18:5, ¿hasta dónde han llegado los pecados de Babilonia?',
      o: ['Hasta el cielo', 'Hasta el abismo', 'Hasta el gran río', 'Hasta el trono'], a: 0,
      e: '«…porque sus pecados han llegado hasta el cielo» (18:5).' },
    { t: 'tf', v: '18:5',
      q: 'Según Apocalipsis 18:5, Dios se ha olvidado de las maldades de Babilonia.', a: false,
      e: 'Falso: «Dios se ha ACORDADO de sus maldades» (18:5).' },
    { t: 'mc', v: '18:6', lit: 'pagadle el doble según sus obras',
      q: 'Según Apocalipsis 18:6, ¿cuánto se le debía pagar a Babilonia según sus obras?',
      o: ['El doble', 'El triple', 'Siete veces más', 'La mitad'], a: 0,
      e: '«Dadle a ella tal como ella os ha dado y pagadle el doble según sus obras» (18:6).' },
    { t: 'mc', v: '18:7', lit: 'Yo estoy sentada como una reina',
      q: '¿Qué dice Babilonia en su corazón, según Apocalipsis 18:7?',
      o: ['«Yo estoy sentada como una reina, no soy viuda»', '«Yo soy rica y de nada tengo necesidad»', '«Subiré al cielo y seré como el Altísimo»', '«Yo soy la madre de todas las naciones»'], a: 0,
      e: '«Yo estoy sentada como una reina, no soy viuda y no veré llanto» (18:7). Laodicea dice otra cosa: «Yo soy rico… de nada tengo necesidad» (3:17).' },
    { t: 'tf', v: '18:7',
      q: 'Babilonia dice en su corazón que no es viuda y que no verá llanto. (Apocalipsis 18:7)', a: true,
      e: 'Verdadero: «no soy viuda y no veré llanto» (18:7).' },
    { t: 'mc', v: '18:8', lit: 'muerte, llanto y hambre',
      q: '¿Qué plagas vendrán sobre Babilonia, según Apocalipsis 18:8?',
      o: ['Muerte, llanto y hambre', 'Guerra, peste y sequía', 'Granizo, fuego y sangre', 'Úlceras, tinieblas y sed'], a: 0,
      e: '«…en un solo día vendrán sus plagas: muerte, llanto y hambre» (18:8).' },
    { t: 'mc', v: '18:8', lit: 'en un solo día vendrán sus plagas',
      q: 'Según Apocalipsis 18:8, ¿en cuánto tiempo vendrán las plagas de Babilonia?',
      o: ['En un solo día', 'En una semana', 'En tres días y medio', 'En cuarenta y dos meses'], a: 0,
      e: '«…en un solo día vendrán sus plagas» (18:8). Ojo: los lamentos dicen «en una sola hora» (18:10, 18:17, 18:19).' },
    { t: 'tf', v: '18:8',
      q: 'Según Apocalipsis 18:8, Babilonia será tragada por la tierra.', a: false,
      e: 'Falso: «será QUEMADA CON FUEGO, porque poderoso es Dios el Señor, que la juzga» (18:8).' },
    { t: 'mc', v: '18:9', lit: 'cuando vean el humo de su incendio',
      q: 'Según Apocalipsis 18:9, ¿cuándo llorarán los reyes de la tierra sobre Babilonia?',
      o: ['Cuando vean el humo de su incendio', 'Cuando oigan la séptima trompeta', 'Cuando caiga la piedra de molino', 'Cuando se seque el río Éufrates'], a: 0,
      e: '«…llorarán y harán lamentación sobre ella cuando vean el humo de su incendio» (18:9).' },
    { t: 'mc', v: '18:10', lit: 'Babilonia, la ciudad fuerte',
      q: '¿Cómo llaman los reyes a Babilonia en su lamento? (Apocalipsis 18:10)',
      o: ['La ciudad fuerte', 'La ciudad santa', 'La ciudad del gran Rey', 'La ciudad de los siete montes'], a: 0,
      e: '«¡Ay, ay de la gran ciudad, de Babilonia, la ciudad fuerte!» (18:10).' },
    { t: 'fill', v: '18:10', ins: 'Apocalipsis 18:10 (RV1995) — Completa:',
      p: [{ x: '«¡Ay, ay de la gran ciudad, de Babilonia, la ciudad fuerte!, porque en una sola ' }, { b: 'hora', h: '¿en cuánto tiempo?' }, { x: ' vino tu ' }, { b: 'juicio', h: '¿qué vino?' }, { x: '.»' }] },
    { t: 'tf', v: '18:10',
      q: 'Según Apocalipsis 18:10, los reyes se acercaron a Babilonia para ayudarla.', a: false,
      e: 'Falso: se pusieron LEJOS «por el temor de su tormento» (18:10).' },
    { t: 'mc', v: '18:11', lit: 'ninguno compra más sus mercaderías',
      q: '¿Por qué lloran los mercaderes de la tierra, según Apocalipsis 18:11?',
      o: ['Porque ninguno compra más sus mercaderías', 'Porque perdieron sus naves en el mar', 'Porque el ángel les quitó el oro', 'Porque la bestia les quitó la marca'], a: 0,
      e: '«…porque ninguno compra más sus mercaderías» (18:11).' },
    { t: 'mc', v: '18:12', lit: 'de cobre, hierro y mármol',
      q: '¿Cuál de estos grupos está en la lista de mercaderías de Apocalipsis 18:12?',
      o: ['Cobre, hierro y mármol', 'Bronce, estaño y plomo', 'Cedro, ciprés y olivo', 'Sal, miel y leche'], a: 0,
      e: '«…de cobre, hierro y mármol» (18:12).' },
    { t: 'mc', v: '18:12', lit: 'de lino fino, púrpura, seda y escarlata',
      q: '¿Qué telas aparecen en la lista de mercaderías de Apocalipsis 18:12?',
      o: ['Lino fino, púrpura, seda y escarlata', 'Lana, algodón, cuero y pieles', 'Cilicio, saco, lana y lino', 'Seda, terciopelo, azul y blanco'], a: 0,
      e: '«…de lino fino, púrpura, seda y escarlata» (18:12).' },
    { t: 'mc', v: '18:13', lit: 'esclavos y almas de hombres',
      q: '¿Qué es lo último de la lista de mercaderías? (Apocalipsis 18:13)',
      o: ['Esclavos y almas de hombres', 'Caballos y carros', 'Incienso, mirra y olíbano', 'Oro y plata'], a: 0,
      e: 'La lista termina con «esclavos y almas de hombres» (18:13). El oro y la plata van al principio (18:12).' },
    { t: 'tf', v: '18:13',
      q: 'En la lista de mercaderías de Apocalipsis 18:13 aparecen el incienso, la mirra y el olíbano.', a: true,
      e: 'Verdadero: «incienso, mirra y olíbano» (18:13).' },
    { t: 'fill', v: '18:13', ins: 'Apocalipsis 18:13 (RV1995) — Completa:',
      p: [{ x: '«…vino y ' }, { b: 'aceite', h: '¿vino y qué?' }, { x: '; flor de harina y ' }, { b: 'trigo', h: '¿harina y qué?' }, { x: '; bestias y ovejas; ' }, { b: 'caballos', h: '¿qué animales?' }, { x: ' y carros…»' }] },
    { t: 'mc', v: '18:14', lit: 'nunca más las hallarás',
      q: 'Según Apocalipsis 18:14, ¿qué pasó con las cosas exquisitas y espléndidas de Babilonia?',
      o: ['Le faltaron y nunca más las hallará', 'Fueron llevadas al templo de Dios', 'Fueron repartidas entre los santos', 'Se guardaron hasta el día del juicio'], a: 0,
      e: '«…todas las cosas exquisitas y espléndidas te han faltado y nunca más las hallarás» (18:14).' },
    { t: 'tf', v: '18:15',
      q: 'Los mercaderes que lloran por Babilonia se habían enriquecido a costa de ella. (Apocalipsis 18:15)', a: true,
      e: 'Verdadero: «…que se han enriquecido a costa de ella, se pondrán lejos» (18:15).' },
    { t: 'mc', v: '18:16', lit: 'vestida de lino fino, púrpura y escarlata',
      q: 'Según los mercaderes, ¿de qué estaba vestida la gran ciudad? (Apocalipsis 18:16)',
      o: ['De lino fino, púrpura y escarlata', 'Del sol, con la luna a sus pies', 'De cilicio y de ceniza', 'De ropas blancas y limpias'], a: 0,
      e: '«…la gran ciudad, que estaba vestida de lino fino, púrpura y escarlata» (18:16). La mujer vestida del sol es la de 12:1.' },
    { t: 'mc', v: '18:17', lit: 'en una sola hora han sido consumidas tantas riquezas',
      q: '¿Qué texto dice «en una sola hora han sido consumidas tantas riquezas»?',
      o: ['Apocalipsis 18:17', 'Apocalipsis 18:10', 'Apocalipsis 18:19', 'Apocalipsis 18:8'], a: 0,
      e: 'Apocalipsis 18:17, al final del lamento de los mercaderes.' },
    { t: 'mc', v: '18:17', lit: 'Todo piloto y todos los que viajan en naves',
      q: 'Según Apocalipsis 18:17, ¿qué otro grupo se puso lejos y lloró por la ciudad?',
      o: ['Pilotos, marineros y los que trabajan en el mar', 'Sacerdotes, levitas y los que sirven en el templo', 'Soldados, capitanes y los que van a caballo', 'Pastores, labradores y los que cuidan la viña'], a: 0,
      e: '«Todo piloto y todos los que viajan en naves, los marineros y todos los que trabajan en el mar, se pusieron lejos» (18:17).' },
    { t: 'mc', v: '18:18', lit: 'Qué ciudad era semejante a esta gran ciudad',
      q: '¿Qué gritaba la gente del mar al ver el humo del incendio? (Apocalipsis 18:18)',
      o: ['«¿Qué ciudad era semejante a esta gran ciudad?»', '«¿Quién como la bestia y quién podrá luchar contra ella?»', '«¿Hasta cuándo Señor, santo y verdadero?»', '«¿Quién no te temerá, Señor?»'], a: 0,
      e: '«¿Qué ciudad era semejante a esta gran ciudad?» (18:18). «¿Quién como la bestia?» lo dicen en 13:4.' },
    { t: 'tf', v: '18:19',
      q: 'Según Apocalipsis 18:19, la gente del mar echó ceniza sobre sus cabezas.', a: false,
      e: 'Falso: «echaron POLVO sobre sus cabezas» (18:19).' },
    { t: 'mc', v: '18:20', lit: 'santos, apóstoles y profetas',
      q: 'Según Apocalipsis 18:20, ¿quiénes deben alegrarse sobre Babilonia?',
      o: ['El cielo, y los santos, apóstoles y profetas', 'Los reyes, los capitanes y los fuertes', 'Los mercaderes, pilotos y marineros', 'Las naciones, tribus y lenguas'], a: 0,
      e: '«Alégrate sobre ella, cielo, y vosotros santos, apóstoles y profetas, porque Dios os ha hecho justicia en ella» (18:20).' },
    { t: 'mc', v: '18:21', lit: 'como una gran piedra de molino',
      q: '¿Qué arrojó al mar el ángel poderoso de Apocalipsis 18:21?',
      o: ['Una piedra como una gran piedra de molino', 'Un incensario lleno del fuego del altar', 'Una copa llena de la ira de Dios', 'Una gran estrella ardiendo como antorcha'], a: 0,
      e: '«Un ángel poderoso tomó una piedra, como una gran piedra de molino, y la arrojó en el mar» (18:21).' },
    { t: 'tf', v: '18:21',
      q: 'El ángel poderoso arrojó la piedra de molino en el río Éufrates. (Apocalipsis 18:21)', a: false,
      e: 'Falso: «la arrojó en el MAR» (18:21).' },
    { t: 'mc', v: '18:22', lit: 'arpistas, músicos, flautistas y trompetistas',
      q: 'Según Apocalipsis 18:22, ¿qué voces no se oirán más en Babilonia?',
      o: ['De arpistas, músicos, flautistas y trompetistas', 'De sacerdotes, levitas, cantores y porteros', 'De pastores, labradores, viñadores y pescadores', 'De reyes, capitanes, jinetes y soldados'], a: 0,
      e: '«Voz de arpistas, músicos, flautistas y trompetistas no se oirá más de ti» (18:22).' },
    { t: 'fill', v: '18:23', ins: 'Apocalipsis 18:23 (RV1995) — Completa:',
      p: [{ x: '«Luz de ' }, { b: 'lámpara', h: '¿luz de qué?' }, { x: ' no alumbrará más en ti, ni voz de ' }, { b: 'esposo', h: '¿de quién?' }, { x: ' y esposa se oirá más en ti…»' }] },
    { t: 'mc', v: '18:23', lit: 'por tus hechicerías fueron engañadas todas las naciones',
      q: 'Según Apocalipsis 18:23, ¿con qué fueron engañadas todas las naciones?',
      o: ['Con sus hechicerías', 'Con sus riquezas', 'Con sus ejércitos', 'Con sus banquetes'], a: 0,
      e: '«…por tus hechicerías fueron engañadas todas las naciones» (18:23).' },
    { t: 'mc', v: '18:24', lit: 'la sangre de los profetas y de los santos',
      q: '¿Qué se halló en Babilonia, según Apocalipsis 18:24?',
      o: ['La sangre de los profetas y de los santos', 'El arca del pacto y el candelabro de oro', 'El libro sellado con siete sellos', 'Los tesoros del templo de Jerusalén'], a: 0,
      e: '«En ella se halló la sangre de los profetas y de los santos y de todos los que han sido muertos en la tierra» (18:24).' },
    { t: 'mc', v: '18:1', f: 'c',
      q: 'Según Bohr, ¿cómo se llama el mensaje del ángel que alumbra la tierra con su gloria (Apocalipsis 18:1)?',
      o: ['El fuerte pregón', 'El clamor de medianoche', 'El evangelio eterno', 'El mensaje a Laodicea'], a: 0,
      e: 'Bohr lo llama el «fuerte clamor» (fuerte pregón). El «clamor de medianoche» fue el movimiento de 1844, que este mensaje superará en poder. Fuente: Bohr, «Culto en el trono de Satanás», pág. 105 y 111.' },
    { t: 'mc', v: '18:1', f: 'c',
      q: 'Según Bohr, ¿qué hace el ángel de Apocalipsis 18:1 con los mensajes de los tres ángeles de Apocalipsis 14?',
      o: ['Los amplía e intensifica', 'Los reemplaza por otro distinto', 'Los anula porque ya pasaron', 'Los repite solo en el cielo'], a: 0,
      e: 'Bohr: el fuerte clamor «es una ampliación e intensificación de los tres mensajes angélicos de Apocalipsis 14:6-12». Fuente: Bohr, «Culto en el trono de Satanás», pág. 105.' },
    { t: 'mc', v: '18:1', f: 'c',
      q: 'Según Elena de White, ¿a qué suceso se parecerá la obra del último mensaje con poder?',
      o: ['Al día de Pentecostés', 'Al bautismo de Jesús', 'A la zarza que ardía', 'A la nube del Sinaí'], a: 0,
      e: 'Elena de White: como la «lluvia temprana» del Espíritu en Pentecostés abrió la predicación del evangelio, la «lluvia tardía» la cerrará con milagros y sanidades. Fuente: Elena de White, «El conflicto de los siglos», pág. 669-670.' },
    { t: 'mc', v: '18:1', f: 'c',
      q: 'Según Elena de White, ¿cómo serán los obreros que den el último mensaje con mayor poder?',
      o: ['Humildes, guiados por el Espíritu de Dios', 'Graduados en las mejores universidades', 'Reyes y gobernantes de las naciones', 'Ángeles visibles que predican en las plazas'], a: 0,
      e: 'Elena de White: «el Señor obrará por conducto de humildes instrumentos»; serán calificados más por la unción de su Espíritu que por los estudios. Fuente: Elena de White, «El conflicto de los siglos», pág. 664.' },
    { t: 'tf', v: '18:2', f: 'c',
      q: 'Según Elena de White, Apocalipsis 18:1-2 repite el anuncio del segundo ángel (14:8) y añade las corrupciones que entraron en las iglesias desde 1844.', a: true,
      e: 'Verdadero: el anuncio de la caída de Babilonia se repite «con la mención adicional de las corrupciones» introducidas desde 1844. Fuente: Elena de White, «El conflicto de los siglos», pág. 661.' },
    { t: 'mc', v: '18:2', f: 'c',
      q: 'Según Bohr, ¿qué muestran las tres frases de 18:2: habitación de demonios, guarida de espíritus y albergue de aves inmundas?',
      o: ['Que la apostasía de Babilonia ya no tiene remedio', 'Que Babilonia se convirtió en un desierto literal', 'Que los demonios huyen de la ciudad caída', 'Que Dios manda aves para limpiar la ciudad'], a: 0,
      e: 'Bohr: son un paralelismo (tres frases que dicen lo mismo); muestran que la apostasía creció desde 1844 y la condición de Babilonia es irreparable. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 221.' },
    { t: 'mc', v: '18:2', f: 'c',
      q: 'Según Bohr, ¿qué clase de aves son las «aves inmundas y aborrecibles» de Babilonia?',
      o: ['Aves de rapiña que comen carroña', 'Gorriones que anidan en las ruinas', 'Palomas como las del templo', 'Aves que cantan en la ciudad'], a: 0,
      e: 'Bohr: «¡Las aves aborrecibles no son gorriones! Son aves de rapiña», como las aves de 19:17. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 222.' },
    { t: 'mc', v: '18:3', f: 'c',
      q: 'Según Bohr, ¿con qué texto se relacionan los mercaderes que se enriquecieron con Babilonia (Apocalipsis 18:3)?',
      o: ['Con la prohibición de comprar y vender', 'Con los cambistas que Jesús echó del templo', 'Con el joven rico que se fue triste', 'Con la parábola de los talentos'], a: 0,
      e: 'Bohr: se unen con 13:17, donde nadie podía comprar ni vender sin la marca; en el capítulo 18 se invierte: Babilonia queda en bancarrota. El trasfondo es el comercio de Tiro (Ezequiel 27). Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 223.' },
    { t: 'mc', v: '18:4', f: 'c',
      q: 'Según Bohr, ¿de quién es la voz que dice «Salid de ella, pueblo mío» (Apocalipsis 18:4)?',
      o: ['De Dios mismo', 'Del ángel que alumbra la tierra', 'Del segundo ángel de Apocalipsis 14', 'De los mártires bajo el altar'], a: 0,
      e: 'Bohr: la voz que anuncia la caída no es la misma que llama a salir; esta es «la voz de Dios mismo que llama a su pueblo». Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 223.' },
    { t: 'mc', v: '18:4', f: 'c',
      q: 'Según Bohr, ¿qué historia del Antiguo Testamento está detrás del llamado «Salid de ella»?',
      o: ['El llamado a Israel a salir de Babilonia', 'La salida de Abraham de Ur de los caldeos', 'La huida de Jacob de la casa de Labán', 'La salida de Israel de Egipto con Moisés'], a: 0,
      e: 'Bohr: Dios llamó al Israel literal a salir de la Babilonia literal para volver a Jerusalén (Jeremías 51:6, 45); al final llama a su Israel espiritual a salir de la Babilonia espiritual. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 224.' },
    { t: 'mc', v: '18:4', f: 'c',
      q: 'En la interpretación adventista, ¿a quiénes llama Dios cuando dice «pueblo mío» en Apocalipsis 18:4?',
      o: ['A sus hijos sinceros que aún están en Babilonia', 'A los ángeles que todavía están en el cielo', 'A los reyes que lloran por la gran ciudad', 'A los mercaderes que se arrepienten tarde'], a: 0,
      e: 'Elena de White: la mayoría de los verdaderos discípulos de Cristo todavía están en esas iglesias; muchos tienen sed de más luz y oirán el llamado. Fuente: Elena de White, «El conflicto de los siglos», pág. 441-442.' },
    { t: 'tf', v: '18:4', f: 'c',
      q: 'Según Elena de White, el llamado «Salid de ella, pueblo mío» será el último mensaje que se dé al mundo.', a: true,
      e: 'Verdadero: «Este mensaje será el último que se dé al mundo y cumplirá su obra». Fuente: Elena de White, «El conflicto de los siglos», pág. 441.' },
    { t: 'mc', v: '18:5', f: 'c',
      q: 'Según Bohr, ¿qué significa que «Dios se ha acordado» de las maldades de Babilonia (Apocalipsis 18:5)?',
      o: ['Que su copa se llenó y llega la sentencia', 'Que Dios se había olvidado de sus pecados', 'Que Dios perdona a Babilonia por fin', 'Que Dios recuerda a los santos que ella mató'], a: 0,
      e: 'Bohr: Dios conoce los pecados que se acumulan; demora su ira hasta que la copa de maldad está llena (como con los amorreos, Génesis 15:16) y entonces «se acuerda», es decir, ejecuta la sentencia. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 224-225.' },
    { t: 'tf', v: '18:7', f: 'c',
      q: 'Según Bohr, entre los pecados de Babilonia están el orgullo, el materialismo y la unión de la iglesia con el estado.', a: true,
      e: 'Verdadero: Bohr nombra orgullo (18:7), materialismo (18:11-14), el vino de la falsa doctrina, la unión iglesia-estado, la persecución y el engaño por hechicería. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 224.' },
    { t: 'mc', v: '18:9', f: 'c',
      q: 'Según Bohr, ¿a quiénes representan los reyes que lloran en Apocalipsis 18:9-10?',
      o: ['A los poderes civiles de la tierra', 'A los ángeles que vieron su caída', 'A los profetas que la anunciaron', 'A los mártires que ella persiguió'], a: 0,
      e: 'Bohr divide el capítulo así: 18:9-10, lamento de los poderes civiles; 18:11-16, de los capitalistas; 18:17-19, de los empleados y viajeros. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 217.' },
    { t: 'mc', v: '18:11', f: 'c',
      q: 'Según Bohr, ¿quiénes son los mercaderes que lloran en Apocalipsis 18:11-16?',
      o: ['Los grandes capitalistas de la tierra', 'Los pequeños vendedores de los mercados', 'Los sacerdotes que vendían indulgencias', 'Los marineros y los viajeros del mar'], a: 0,
      e: 'Bohr: son los capitalistas, «los grandes de la tierra» (18:23); los marineros y viajeros lloran después, en 18:17-19. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 217.' },
    { t: 'mc', v: '18:21', f: 'c',
      q: 'En la interpretación adventista, ¿qué gesto de un profeta repite el ángel que arroja la piedra de molino (Apocalipsis 18:21)?',
      o: ['El de Jeremías, que hundió una piedra en el Éufrates', 'El de Ezequiel, que cavó en la pared del templo', 'El de Isaías, que anduvo descalzo tres años', 'El de Elías, que levantó un altar en el Carmelo'], a: 0,
      e: 'Jeremías arrojó una piedra al Éufrates y dijo: «Así se hundirá Babilonia» (Jeremías 51:63-64). Doukhan nota que esta vez es una piedra de molino, lo que servía para vivir: Babilonia queda vacía. Fuentes: Doukhan, «Secretos del Apocalipsis», pág. 182-183; Vicuña, «Interpretación histórica del Apocalipsis», pág. 145.' },
    { t: 'mc', v: '18:23', f: 'c',
      q: 'Según Bohr, ¿qué representan las hechicerías con que Babilonia engañó a las naciones (Apocalipsis 18:23)?',
      o: ['El engaño de los espíritus de demonios', 'La magia de los astrólogos de Nabucodonosor', 'Las medicinas falsas que vendían sus mercaderes', 'Los ídolos de oro de la antigua Babilonia'], a: 0,
      e: 'Bohr: es «el arte del engaño por medio de la hechicería», el mismo de los espíritus de demonios que hacen señales (16:13-14). Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 224.' },
    { t: 'mc', v: '18:1', f: 'c',
      q: 'Según Bohr, ¿qué pasaje muestra que la «gloria» de Dios es su carácter, como la gloria que alumbra la tierra en 18:1?',
      o: ['Éxodo 33:18-19 y 34:6-7', 'Génesis 1:3-5 y 1:14-16', 'Salmo 19:1-2 y 19:7-8', 'Ezequiel 1:26-28 y 3:12'], a: 0,
      e: 'Moisés pide ver la gloria de Dios, y Dios le muestra su bondad y proclama su nombre: misericordioso, clemente, lento para la ira (Éxodo 33:18-19; 34:6-7). Bohr: la gloria de 18:1 es el carácter de Dios que su pueblo refleja. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 220-221.' },
    { t: 'mc', v: '18:2', f: 'c',
      q: '¿Qué texto explica el sentido del nombre Babel o Babilonia?',
      o: ['Génesis 11:9, allí confundió Jehová', 'Génesis 10:10, el comienzo del reino', 'Daniel 4:30, la gran Babilonia', 'Isaías 13:19, hermosura de reinos'], a: 0,
      e: 'Génesis 11:9: la ciudad se llamó Babel porque allí Dios confundió el lenguaje. Babilonia quiere decir «confusión». Fuentes: Bohr, «15 principios de interpretación profética», tomo 2, pág. 104; Elena de White, «El conflicto de los siglos», pág. 434.' },
    { t: 'tf', v: '18:2', f: 'c',
      q: 'La ley de Levítico 11 declara inmundas a las aves de rapiña, como el águila y el azor; así se entienden las aves inmundas de 18:2.', a: true,
      e: 'Verdadero: Levítico 11:13 llama abominación al águila, al quebrantahuesos y al azor. Bohr: las aves de 18:2 no son gorriones sino aves de rapiña, como las de 19:17. Fuente: Bohr, «El Mensaje de los Tres Ángeles», tomo 2, pág. 222.' },
    { t: 'mc', v: '18:23', f: 'c',
      q: '¿Qué ley del Antiguo Testamento prohíbe la hechicería y consultar a los muertos, prácticas que 18:23 atribuye a Babilonia?',
      o: ['Deuteronomio 18:10-12', 'Levítico 23:3', 'Éxodo 20:8-11', 'Números 6:24-26'], a: 0,
      e: 'Deuteronomio 18:10-12 prohíbe al hechicero, al adivino y a quien consulte a los muertos. Bohr cuenta el intento de hablar con los muertos entre el vino de Babilonia. Fuente: Bohr, «Apocalipsis 17», pág. 11.' },
  ],

  tarjetas: [
    { f: 'El ángel de 18:1', r: 'Descendía del cielo con gran poder, y la tierra fue alumbrada con su gloria' },
    { f: '«¡Ha caído, ha caído la gran Babilonia!»', r: 'Apocalipsis 18:2 (parecido a 14:8)' },
    { f: '«¡Salid de ella, pueblo mío…!»', r: 'Apocalipsis 18:4: para no ser partícipes de sus pecados ni recibir sus plagas' },
    { f: 'Lo que dice Babilonia en su corazón (18:7)', r: '«Yo estoy sentada como una reina, no soy viuda y no veré llanto»' },
    { f: 'Sus plagas, y en cuánto tiempo (18:8)', r: 'En un solo día: muerte, llanto y hambre; y será quemada con fuego' },
    { f: 'Los tres grupos que lloran desde lejos (18:9-19)', r: 'Los reyes, los mercaderes y la gente del mar (pilotos y marineros)' },
    { f: '«En una sola hora…» (18:10, 17, 19)', r: 'Vino tu juicio · fueron consumidas tantas riquezas · ha sido desolada' },
    { f: 'Primero y último de las mercaderías (18:12-13)', r: 'Empieza con oro y plata; termina con esclavos y almas de hombres' },
    { f: 'Lo que gritaba la gente del mar (18:18)', r: '«¿Qué ciudad era semejante a esta gran ciudad?»' },
    { f: 'Quiénes se alegran (18:20)', r: 'El cielo, y los santos, apóstoles y profetas' },
    { f: 'La piedra de molino (18:21)', r: 'Un ángel poderoso la arrojó en el mar: así será derribada Babilonia' },
    { f: 'Lo que se halló en ella (18:24)', r: 'La sangre de los profetas y de los santos' },
  ],
};
