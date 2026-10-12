/* Apocalipsis 17 — La mujer sentada sobre la bestia escarlata.
   Hecho sobre el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap17', label: 'Apocalipsis 17', sub: 'La mujer sobre la bestia escarlata', vs: 18,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Uno de los ángeles de las siete copas lleva a Juan al
      <strong>desierto</strong> y le muestra a una <strong>mujer</strong>
      sentada sobre una <strong>bestia escarlata</strong> con <strong>siete
      cabezas y diez cuernos</strong> (17:3).<br><br>
      La mujer está vestida de <strong>púrpura y escarlata</strong>, tiene un
      <strong>cáliz de oro</strong> en la mano y en la frente un nombre:
      <strong>«Babilonia la grande»</strong> (17:4-5).<br><br>
      El ángel le explica a Juan qué significa cada cosa, y le cuenta que los
      reyes pelearán contra el Cordero, pero <strong>«el Cordero los
      vencerá»</strong> (17:14).<br><br>
      <em>La idea del capítulo: el mal se ve grande y rico, pero el Cordero
      gana, y los que están con él son fieles.</em>`) },

    { t: '⚖️ La sentencia contra la gran ramera (17:1-2)', capa: 'nucleo', h:
      hi(`Vino <strong>uno de los siete ángeles que tenían las siete
      copas</strong> y le dijo a Juan: <strong>«Ven acá y te mostraré la
      sentencia contra la gran ramera, la que está sentada sobre muchas
      aguas»</strong> (17:1).`) +
      li([`Con ella han fornicado <strong>los reyes de la tierra</strong> (17:2).`,
          `Los <strong>habitantes de la tierra</strong> se han embriagado
           <strong>con el vino de su fornicación</strong> (17:2).`]) +
      wa(`En 21:9 otro de esos siete ángeles le dice a Juan lo mismo, «Ven
      acá», pero para mostrarle <strong>la desposada, la esposa del
      Cordero</strong>. Aquí es <strong>la gran ramera</strong>.`) },

    { t: '🐉 La mujer y la bestia escarlata (17:3-6)', capa: 'nucleo', h:
      hi(`<strong>«Me llevó en el Espíritu al desierto, y vi a una mujer
      sentada sobre una bestia escarlata llena de nombres de blasfemia»</strong>
      (17:3).`) +
      tbl(['Detalle', 'Lo que dice el texto'], [
        ['La bestia', '<strong>Escarlata</strong>, llena de nombres de blasfemia, con <strong>siete cabezas y diez cuernos</strong> (17:3)'],
        ['Ropa de la mujer', '<strong>Púrpura y escarlata</strong> (17:4)'],
        ['Adornos', '<strong>Oro, piedras preciosas y perlas</strong> (17:4)'],
        ['En la mano', 'Un <strong>cáliz de oro</strong> lleno de abominaciones (17:4)'],
        ['En la frente', '<strong>«Babilonia la grande, la madre de las rameras y de las abominaciones de la tierra»</strong> (17:5)'],
        ['Ebria de', 'La <strong>sangre de los santos</strong> y de los <strong>mártires de Jesús</strong> (17:6)'],
      ]) +
      hi(`Juan dice: <strong>«Cuando la vi quedé asombrado con gran
      asombro»</strong> (17:6).`) },

    { t: '🔀 No las confundas (17:3-4)', capa: 'nucleo', h:
      tbl(['Dónde', 'Qué es', 'Cómo la distingues'], [
        ['12:3', 'Un gran dragón escarlata', 'Siete cabezas, diez cuernos y <strong>siete diademas en las cabezas</strong>'],
        ['13:1', 'La bestia que sube del mar', 'Siete cabezas, diez cuernos y <strong>diez diademas en los cuernos</strong>'],
        ['17:3', 'La bestia escarlata', 'Siete cabezas, diez cuernos, <strong>llena de nombres de blasfemia</strong>, y una mujer sentada encima'],
      ]) +
      wa(`Y no confundas a las dos mujeres: la de 12:1 está <strong>vestida del
      sol</strong>, con una corona de doce estrellas; la de 17:4 está vestida
      de <strong>púrpura y escarlata</strong>, con un cáliz de oro en la
      mano.`) },

    { t: '🔑 El misterio de la bestia (17:7-11)', capa: 'nucleo', h:
      hi(`El ángel le dice: <strong>«¿Por qué te asombras? Yo te diré el
      misterio de la mujer y de la bestia que la lleva»</strong> (17:7).`) +
      li([`<strong>«La bestia que has visto era y no es, y está para subir del
           abismo e ir a perdición»</strong> (17:8).`,
          `Se asombrarán los habitantes de la tierra <strong>cuyos nombres no
           están escritos en el libro de la vida</strong> desde la fundación
           del mundo (17:8).`,
          `<strong>«Esto, para la mente que tenga sabiduría»</strong>: las
           siete cabezas son <strong>siete montes</strong> donde se sienta la
           mujer (17:9) y son <strong>siete reyes</strong> (17:10).`]) +
      tbl(['Los siete reyes (17:10-11)', 'Qué dice'], [
        ['Cinco', 'Han caído'],
        ['Uno', 'Es'],
        ['El otro', 'Aún no ha venido; cuando venga, durará breve tiempo'],
        ['La bestia', 'Es también <strong>el octavo</strong>, es uno de los siete y va a la perdición'],
      ]) },

    { t: '👑 Los diez cuernos y el Cordero (17:12-14)', capa: 'nucleo', h:
      li([`Los diez cuernos son <strong>diez reyes</strong> que aún no han
           recibido reino; recibirán autoridad como reyes <strong>por una
           hora</strong>, junto con la bestia (17:12).`,
          `Tienen <strong>un mismo propósito</strong>: entregarán su poder y
           autoridad <strong>a la bestia</strong> (17:13).`]) +
      hi(`<strong>«Pelearán contra el Cordero, y el Cordero los vencerá, porque
      es Señor de señores y Rey de reyes»</strong> (17:14).<br><br>
      Los que están con él son <strong>«llamados, elegidos y
      fieles»</strong> (17:14).`) +
      wa(`Fíjate en el orden. En 17:14 dice <strong>«Señor de señores y Rey de
      reyes»</strong>; en 19:16 dice al revés, <strong>«Rey de reyes y Señor
      de señores»</strong>.`) },

    { t: '🔥 El final de la ramera (17:15-18)', capa: 'nucleo', h:
      li([`Los diez cuernos y la bestia <strong>aborrecerán a la
           ramera</strong>: la dejarán desolada y desnuda, devorarán sus carnes
           y <strong>la quemarán con fuego</strong> (17:16).`,
          `<strong>«Dios ha puesto en sus corazones el ejecutar lo que él
           quiso»</strong> (17:17): darán su reino a la bestia <strong>hasta
           que se hayan cumplido las palabras de Dios</strong>.`]) +
      wa(`Los que se unieron con la ramera terminan contra ella. Y Dios sigue
      al mando: todo pasa hasta que se cumplen <strong>sus</strong>
      palabras (17:17).`) },

    { t: '🗝️ Los símbolos que explica el ángel (17:9-18)', capa: 'nucleo', h:
      tbl(['Símbolo', 'Qué es, según el ángel'], [
        ['Las siete cabezas', '<strong>Siete montes</strong> donde se sienta la mujer, y <strong>siete reyes</strong> (17:9-10)'],
        ['Los diez cuernos', '<strong>Diez reyes</strong> que aún no han recibido reino (17:12)'],
        ['Las aguas', '<strong>«pueblos, muchedumbres, naciones y lenguas»</strong> (17:15)'],
        ['La mujer', '<strong>«la gran ciudad que reina sobre los reyes de la tierra»</strong> (17:18)'],
      ]) +
      wa(`Como en 1:20, aquí el libro explica sus propios símbolos. Las
      <strong>aguas</strong> son gente, no mares: pueblos, muchedumbres,
      naciones y lenguas (17:15).`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · En la profecía, una <strong>mujer</strong> representa una iglesia. La
      mujer vestida del sol (12:1) es la iglesia fiel; la ramera es una
      iglesia que se apartó de Dios y se unió con los reyes de la tierra.<br>
      · <strong>Babilonia</strong> quiere decir confusión: es un
      <strong>sistema religioso</strong> que mezcla la verdad con el error.
      «El conflicto de los siglos» identifica a la madre con el sistema
      religioso y político de la Roma papal, y a las hijas con las iglesias
      que conservan sus errores.<br>
      · Es un juicio sobre <strong>sistemas y poderes, no sobre
      personas</strong>. La misma obra dice que la mayoría de los verdaderos
      hijos de Dios todavía están en esas iglesias, y Dios los llama con
      amor: «Salid de ella, pueblo mío» (18:4).<br>
      · Lo seguro para todos: <strong>el Cordero vence</strong> (17:14), y
      los suyos son llamados, elegidos y fieles.`) },
  ],

  preguntas: [
    { t: 'mc', v: '17:1', lit: 'uno de los siete ángeles que tenían las siete copas',
      q: '¿Quién vino a hablar con Juan en Apocalipsis 17:1?',
      o: ['Uno de los siete ángeles que tenían las copas', 'Uno de los veinticuatro ancianos del trono', 'El ángel que volaba en medio del cielo', 'El ángel que tenía una hoz aguda'], a: 0,
      e: '«Vino uno de los siete ángeles que tenían las siete copas y habló conmigo» (17:1).' },
    { t: 'mc', v: '17:1', lit: 'la que está sentada sobre muchas aguas',
      q: 'Según Apocalipsis 17:1, ¿sobre qué está sentada la gran ramera?',
      o: ['Sobre muchas aguas', 'Sobre un trono de oro', 'Sobre la arena del mar', 'Sobre un monte alto'], a: 0,
      e: '«…la gran ramera, la que está sentada sobre muchas aguas» (17:1).' },
    { t: 'tf', v: '17:1',
      q: 'En Apocalipsis 17:1 el ángel le dice a Juan: «Ven acá y te mostraré la desposada».', a: false,
      e: 'Falso: «te mostraré la sentencia contra la GRAN RAMERA» (17:1). La desposada, la esposa del Cordero, es de 21:9.' },
    { t: 'mc', v: '17:2', lit: 'se han embriagado con el vino de su fornicación',
      q: 'Según Apocalipsis 17:2, ¿con qué se han embriagado los habitantes de la tierra?',
      o: ['Con el vino de su fornicación', 'Con el vino de la ira de Dios', 'Con la sangre de los santos', 'Con el agua del río Éufrates'], a: 0,
      e: '«…los habitantes de la tierra se han embriagado con el vino de su fornicación» (17:2).' },
    { t: 'tf', v: '17:2',
      q: 'Según Apocalipsis 17:2, con la gran ramera han fornicado los reyes de la tierra.', a: true,
      e: 'Verdadero: «Con ella han fornicado los reyes de la tierra» (17:2).' },
    { t: 'mc', v: '17:3', lit: 'Me llevó en el Espíritu al desierto',
      q: '¿Adónde llevó el ángel a Juan para mostrarle a la mujer? (Apocalipsis 17:3)',
      o: ['Al desierto', 'A un monte grande y alto', 'A la orilla del mar', 'Al templo del cielo'], a: 0,
      e: '«Me llevó en el Espíritu al desierto» (17:3). Al «monte grande y alto» lo llevan en 21:10, para ver la nueva Jerusalén.' },
    { t: 'mc', v: '17:3', lit: 'una bestia escarlata',
      q: '¿De qué color era la bestia sobre la que estaba sentada la mujer? (Apocalipsis 17:3)',
      o: ['Escarlata', 'Blanca', 'Negra', 'Amarilla'], a: 0,
      e: '«…vi a una mujer sentada sobre una bestia escarlata» (17:3).' },
    { t: 'mc', v: '17:3', lit: 'que tenía siete cabezas y diez cuernos',
      q: '¿Cuántas cabezas y cuernos tenía la bestia escarlata? (Apocalipsis 17:3)',
      o: ['Siete cabezas y diez cuernos', 'Siete cabezas y siete cuernos', 'Diez cabezas y siete cuernos', 'Una cabeza y dos cuernos'], a: 0,
      e: '«…que tenía siete cabezas y diez cuernos» (17:3). El Cordero de 5:6 tiene siete cuernos; la bestia de la tierra, dos (13:11).' },
    { t: 'tf', v: '17:3',
      q: 'La bestia escarlata estaba llena de ojos por delante y por detrás. (Apocalipsis 17:3)', a: false,
      e: 'Falso: estaba «llena de NOMBRES DE BLASFEMIA» (17:3). Los llenos de ojos son los cuatro seres vivientes (4:6).' },
    { t: 'fill', v: '17:3', ins: 'Apocalipsis 17:3 (RV1995) — Completa:',
      p: [{ x: '«vi a una ' }, { b: 'mujer', h: '¿a quién?' }, { x: ' sentada sobre una bestia ' }, { b: 'escarlata', h: '¿de qué color?' }, { x: ' llena de nombres de blasfemia»' }] },
    { t: 'mc', v: '17:4', lit: 'vestida de púrpura y escarlata',
      q: '¿De qué estaba vestida la mujer? (Apocalipsis 17:4)',
      o: ['De púrpura y escarlata', 'De lino fino y limpio', 'Del sol, con la luna a sus pies', 'De ropas blancas'], a: 0,
      e: '«La mujer estaba vestida de púrpura y escarlata» (17:4). La vestida del sol es la mujer de 12:1.' },
    { t: 'mc', v: '17:4', lit: 'un cáliz de oro lleno de abominaciones',
      q: '¿Qué tenía la mujer en la mano? (Apocalipsis 17:4)',
      o: ['Un cáliz de oro lleno de abominaciones', 'Un librito abierto y dulce como la miel', 'Una balanza para pesar el trigo', 'Una copa de oro llena de incienso'], a: 0,
      e: '«…y tenía en la mano un cáliz de oro lleno de abominaciones y de la inmundicia de su fornicación» (17:4).' },
    { t: 'tf', v: '17:4',
      q: 'La mujer estaba adornada de plata, piedras preciosas y perlas. (Apocalipsis 17:4)', a: false,
      e: 'Falso: estaba «adornada de ORO, piedras preciosas y perlas» (17:4).' },
    { t: 'mc', v: '17:5', lit: 'En su frente tenía un nombre escrito',
      q: '¿Dónde tenía escrito su nombre la mujer? (Apocalipsis 17:5)',
      o: ['En la frente', 'En la mano derecha', 'En la vestidura', 'En el muslo'], a: 0,
      e: '«En su frente tenía un nombre escrito, un misterio» (17:5). «En su vestidura y en su muslo» es el nombre del Rey de reyes (19:16).' },
    { t: 'mc', v: '17:5', lit: 'Babilonia la grande, la madre de las rameras',
      q: '¿Qué texto dice «Babilonia la grande, la madre de las rameras y de las abominaciones de la tierra»?',
      o: ['Apocalipsis 17:5', 'Apocalipsis 17:18', 'Apocalipsis 16:19', 'Apocalipsis 17:1'], a: 0,
      e: 'Apocalipsis 17:5: es el nombre escrito en la frente de la mujer.' },
    { t: 'fill', v: '17:5', ins: 'Apocalipsis 17:5 (RV1995) — Completa:',
      p: [{ x: '«' }, { b: 'Babilonia', h: '¿qué nombre?' }, { x: ' la grande, la ' }, { b: 'madre', h: '¿la qué?' }, { x: ' de las rameras y de las abominaciones de la tierra.»' }] },
    { t: 'mc', v: '17:6', lit: 'ebria de la sangre de los santos',
      q: 'Según Apocalipsis 17:6, ¿de qué estaba ebria la mujer?',
      o: ['De la sangre de los santos y de los mártires de Jesús', 'Del vino de la ira de Dios vaciado puro en el cáliz', 'Del agua amarga de la estrella llamada Ajenjo', 'Del vino nuevo de las bodas del Cordero'], a: 0,
      e: '«Vi a la mujer ebria de la sangre de los santos y de la sangre de los mártires de Jesús» (17:6).' },
    { t: 'tf', v: '17:6',
      q: 'Cuando Juan vio a la mujer, quedó asombrado con gran asombro. (Apocalipsis 17:6)', a: true,
      e: 'Verdadero (Apocalipsis 17:6). Por eso el ángel le pregunta: «¿Por qué te asombras?» (17:7).' },
    { t: 'mc', v: '17:7', lit: 'Yo te diré el misterio de la mujer y de la bestia',
      q: 'Según Apocalipsis 17:7, ¿qué le dijo el ángel a Juan que le iba a explicar?',
      o: ['El misterio de la mujer y de la bestia', 'El número del nombre de la bestia', 'Lo que dijeron los siete truenos', 'El día y la hora de la venida'], a: 0,
      e: '«¿Por qué te asombras? Yo te diré el misterio de la mujer y de la bestia que la lleva» (17:7).' },
    { t: 'mc', v: '17:8', lit: 'está para subir del abismo',
      q: 'Según Apocalipsis 17:8, ¿de dónde está para subir la bestia que «era y no es»?',
      o: ['Del abismo', 'Del mar', 'De la tierra', 'Del desierto'], a: 0,
      e: '«La bestia que has visto era y no es, y está para subir del abismo e ir a perdición» (17:8). La de 13:1 sube del mar y la de 13:11, de la tierra.' },
    { t: 'tf', v: '17:8',
      q: 'Según Apocalipsis 17:8, se asombrarán de la bestia aquellos cuyos nombres están escritos en el libro de la vida.', a: false,
      e: 'Falso: los que se asombrarán son aquellos cuyos nombres NO están escritos en el libro de la vida (17:8).' },
    { t: 'mc', v: '17:9', lit: 'Las siete cabezas son siete montes',
      q: 'Según Apocalipsis 17:9, ¿qué son las siete cabezas?',
      o: ['Siete montes sobre los que se sienta la mujer', 'Siete iglesias que están en Asia', 'Siete espíritus que están ante el trono', 'Siete ángeles con siete trompetas'], a: 0,
      e: '«Las siete cabezas son siete montes sobre los cuales se sienta la mujer» (17:9), y también siete reyes (17:10).' },
    { t: 'mc', v: '17:9', lit: 'para la mente que tenga sabiduría',
      q: '¿Qué texto dice «Esto, para la mente que tenga sabiduría»?',
      o: ['Apocalipsis 17:9', 'Apocalipsis 17:7', 'Apocalipsis 17:15', 'Apocalipsis 17:12'], a: 0,
      e: 'Apocalipsis 17:9. Se parece a 13:18 («Aquí hay sabiduría»), pero esta es la de las siete cabezas.' },
    { t: 'mc', v: '17:10', lit: 'Cinco de ellos han caído',
      q: 'De los siete reyes, ¿cuántos han caído? (Apocalipsis 17:10)',
      o: ['Cinco', 'Tres', 'Seis', 'Dos'], a: 0,
      e: '«Cinco de ellos han caído; uno es y el otro aún no ha venido» (17:10).' },
    { t: 'tf', v: '17:10',
      q: 'El rey que aún no ha venido, cuando venga, deberá durar breve tiempo. (Apocalipsis 17:10)', a: true,
      e: 'Verdadero: «…cuando venga deberá durar breve tiempo» (17:10).' },
    { t: 'mc', v: '17:11', lit: 'es también el octavo',
      q: 'Según Apocalipsis 17:11, la bestia que era y no es, ¿qué rey es también?',
      o: ['El octavo', 'El séptimo', 'El décimo', 'El sexto'], a: 0,
      e: '«La bestia que era y no es, es también el octavo, y es uno de los siete y va a la perdición» (17:11).' },
    { t: 'mc', v: '17:12', lit: 'diez reyes que aún no han recibido reino',
      q: 'Según Apocalipsis 17:12, ¿qué son los diez cuernos?',
      o: ['Diez reyes que aún no han recibido reino', 'Diez reinos que ya gobiernan la tierra', 'Diez ángeles que sirven delante del trono', 'Diez días de tribulación para la iglesia'], a: 0,
      e: '«Los diez cuernos que has visto son diez reyes que aún no han recibido reino» (17:12). Los «diez días» de tribulación son de Esmirna (2:10).' },
    { t: 'mc', v: '17:12', lit: 'por una hora',
      q: '¿Por cuánto tiempo recibirán autoridad como reyes los diez cuernos? (Apocalipsis 17:12)',
      o: ['Por una hora', 'Por mil años', 'Por cuarenta y dos meses', 'Por tres días y medio'], a: 0,
      e: '«…recibirán autoridad como reyes por una hora, juntamente con la bestia» (17:12). Los cuarenta y dos meses son de la bestia de 13:5.' },
    { t: 'mc', v: '17:13', lit: 'entregarán su poder y autoridad a la bestia',
      q: 'Según Apocalipsis 17:13, ¿a quién entregarán su poder y autoridad los diez reyes?',
      o: ['A la bestia', 'Al Cordero', 'A la ramera', 'Al falso profeta'], a: 0,
      e: '«Estos tienen un mismo propósito: entregarán su poder y autoridad a la bestia» (17:13).' },
    { t: 'tf', v: '17:13',
      q: 'Los diez reyes de Apocalipsis 17:13 tienen un mismo propósito.', a: true,
      e: 'Verdadero: «Estos tienen un mismo propósito» (17:13).' },
    { t: 'mc', v: '17:14', lit: 'el Cordero los vencerá',
      q: 'Según Apocalipsis 17:14, ¿qué pasa cuando los reyes pelean contra el Cordero?',
      o: ['El Cordero los vence', 'Los reyes vencen al Cordero', 'El dragón pelea en su lugar', 'Nadie gana la batalla'], a: 0,
      e: '«Pelearán contra el Cordero, y el Cordero los vencerá» (17:14).' },
    { t: 'mc', v: '17:14', lit: 'porque es Señor de señores y Rey de reyes',
      q: 'Según Apocalipsis 17:14, ¿por qué el Cordero vencerá a los reyes?',
      o: ['Porque es Señor de señores y Rey de reyes', 'Porque es el León de la tribu de Judá', 'Porque tiene las llaves de la muerte', 'Porque tiene siete cuernos y siete ojos'], a: 0,
      e: '«…el Cordero los vencerá, porque es Señor de señores y Rey de reyes» (17:14).' },
    { t: 'tf', v: '17:14',
      q: 'En Apocalipsis 17:14 el título dice «Rey de reyes y Señor de señores», en ese orden.', a: false,
      e: 'Falso: en 17:14 dice «SEÑOR DE SEÑORES y Rey de reyes». El orden «Rey de reyes y Señor de señores» es el de 19:16.' },
    { t: 'fill', v: '17:14', ins: 'Apocalipsis 17:14 (RV1995) — Completa:',
      p: [{ x: '«y los que están con él son ' }, { b: 'llamados', h: '¿son qué? (1)' }, { x: ', ' }, { b: 'elegidos', h: '¿son qué? (2)' }, { x: ' y ' }, { b: 'fieles', h: '¿son qué? (3)' }, { x: '.»' }] },
    { t: 'mc', v: '17:15', lit: 'son pueblos, muchedumbres, naciones y lenguas',
      q: 'Según Apocalipsis 17:15, ¿qué son las aguas donde se sienta la ramera?',
      o: ['Pueblos, muchedumbres, naciones y lenguas', 'Los ríos y las fuentes de las aguas', 'El mar de vidrio mezclado con fuego', 'Las lágrimas de los santos y mártires'], a: 0,
      e: '«Las aguas que has visto, donde se sienta la ramera, son pueblos, muchedumbres, naciones y lenguas» (17:15).' },
    { t: 'fill', v: '17:15', ins: 'Apocalipsis 17:15 (RV1995) — Completa:',
      p: [{ x: '«Las ' }, { b: 'aguas', h: '¿las qué?' }, { x: ' que has visto, donde se sienta la ramera, son ' }, { b: 'pueblos', h: '¿son qué?' }, { x: ', muchedumbres, naciones y lenguas.' }] },
    { t: 'mc', v: '17:16', lit: 'aborrecerán a la ramera',
      q: 'Según Apocalipsis 17:16, ¿qué harán los diez cuernos y la bestia con la ramera?',
      o: ['La aborrecerán y la quemarán con fuego', 'La defenderán de los reyes del oriente', 'La sentarán en un trono sobre las aguas', 'La adorarán y le darán su reino'], a: 0,
      e: '«…aborrecerán a la ramera, la dejarán desolada y desnuda, devorarán sus carnes y la quemarán con fuego» (17:16).' },
    { t: 'tf', v: '17:16',
      q: 'Según Apocalipsis 17:16, la bestia y los diez cuernos dejarán a la ramera desolada y desnuda.', a: true,
      e: 'Verdadero (Apocalipsis 17:16).' },
    { t: 'mc', v: '17:17', lit: 'Dios ha puesto en sus corazones',
      q: 'Según Apocalipsis 17:17, ¿quién puso en el corazón de los reyes ejecutar lo que él quiso?',
      o: ['Dios', 'El dragón', 'La bestia', 'El falso profeta'], a: 0,
      e: '«Dios ha puesto en sus corazones el ejecutar lo que él quiso» (17:17).' },
    { t: 'mc', v: '17:17', lit: 'hasta que se hayan cumplido las palabras de Dios',
      q: 'Según Apocalipsis 17:17, ¿hasta cuándo darán su reino a la bestia?',
      o: ['Hasta que se cumplan las palabras de Dios', 'Hasta que pasen los cuarenta y dos meses', 'Hasta que se seque el río Éufrates', 'Hasta que caiga la séptima copa'], a: 0,
      e: '«…y dar su reino a la bestia hasta que se hayan cumplido las palabras de Dios» (17:17).' },
    { t: 'mc', v: '17:18', lit: 'la gran ciudad que reina sobre los reyes de la tierra',
      q: 'Según Apocalipsis 17:18, ¿qué es la mujer que vio Juan?',
      o: ['La gran ciudad que reina sobre los reyes de la tierra', 'La iglesia fiel que huyó al desierto', 'La santa ciudad que desciende del cielo', 'Una de las siete iglesias que están en Asia'], a: 0,
      e: '«Y la mujer que has visto es la gran ciudad que reina sobre los reyes de la tierra» (17:18).' },
    { t: 'mc', v: '17:18', lit: 'Y la mujer que has visto es la gran ciudad',
      q: '¿Qué texto dice «Y la mujer que has visto es la gran ciudad»?',
      o: ['Apocalipsis 17:18', 'Apocalipsis 17:15', 'Apocalipsis 17:9', 'Apocalipsis 17:5'], a: 0,
      e: 'Apocalipsis 17:18, el último versículo del capítulo.' },
    { t: 'mc', v: '17:3', f: 'c',
      q: 'En la lectura adventista, ¿qué representa una mujer en la profecía bíblica?',
      o: ['Una iglesia', 'Un imperio', 'Un ángel caído', 'Una nación'], a: 0,
      e: 'Interpretación: la mujer vestida del sol (12:1) es la iglesia fiel; la ramera, una iglesia que se apartó de Dios. El texto de 17:18 solo dice que la mujer «es la gran ciudad que reina sobre los reyes de la tierra».' },
    { t: 'mc', v: '17:5', f: 'c',
      q: 'En la interpretación adventista, ¿qué es «Babilonia la grande» de Apocalipsis 17:5?',
      o: ['Un sistema religioso que mezcla la verdad con el error', 'La antigua ciudad de Babilonia, que será reconstruida', 'El nombre de una de las siete iglesias de Asia', 'El imperio de Nabucodonosor en tiempos de Daniel'], a: 0,
      e: 'Interpretación: Babilonia (confusión) es un sistema religioso apartado de Dios, no las personas. El texto dice que es un nombre escrito en la frente de la mujer, «un misterio» (17:5).' },
    { t: 'mc', v: '17:6', f: 'c',
      q: 'En la lectura adventista, ¿qué dice «El conflicto de los siglos» de los creyentes sinceros que están en otras iglesias?',
      o: ['Que muchos son verdaderos hijos de Dios y él los llama', 'Que ya no tienen ninguna oportunidad de salvarse', 'Que deben ser obligados a cambiar de iglesia', 'Que no pueden entender nada de la Biblia'], a: 0,
      e: 'Interpretación: la condena es contra un sistema, no contra personas; la mayoría de los verdaderos hijos de Dios todavía están en esas iglesias, y Dios los llama: «Salid de ella, pueblo mío» (18:4). El texto de 17:6 habla de la mujer ebria de la sangre de los santos.' },
  ],

  tarjetas: [
    { f: 'Quién le mostró a Juan la ramera (17:1)', r: 'Uno de los siete ángeles que tenían las siete copas' },
    { f: 'Dónde está sentada la ramera (17:1, 17:15)', r: 'Sobre muchas aguas: pueblos, muchedumbres, naciones y lenguas' },
    { f: 'Adónde llevaron a Juan (17:3)', r: 'En el Espíritu, al desierto' },
    { f: 'La bestia de 17:3', r: 'Escarlata, llena de nombres de blasfemia, siete cabezas y diez cuernos' },
    { f: 'Ropa, adornos y cáliz de la mujer (17:4)', r: 'Púrpura y escarlata; oro, piedras preciosas y perlas; cáliz de oro lleno de abominaciones' },
    { f: 'El nombre en su frente (17:5)', r: '«Babilonia la grande, la madre de las rameras y de las abominaciones de la tierra»' },
    { f: 'De qué estaba ebria la mujer (17:6)', r: 'De la sangre de los santos y de los mártires de Jesús' },
    { f: 'Las siete cabezas (17:9-10)', r: 'Siete montes y siete reyes: cinco han caído, uno es, el otro aún no ha venido' },
    { f: 'Los diez cuernos (17:12)', r: 'Diez reyes que aún no han recibido reino; recibirán autoridad como reyes por una hora, con la bestia' },
    { f: '«El Cordero los vencerá»', r: 'Apocalipsis 17:14: es Señor de señores y Rey de reyes' },
    { f: 'Los que están con el Cordero (17:14)', r: 'Llamados, elegidos y fieles' },
    { f: 'Qué es la mujer (17:18)', r: 'La gran ciudad que reina sobre los reyes de la tierra' },
  ],
};
