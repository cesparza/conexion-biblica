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

    { t: '🧭 La ramera sobre muchas aguas (17:1-2)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Aquí se habla de
      <strong>sistemas y poderes, no de personas</strong>.<br><br>
      <strong>¿Qué ángel habla?</strong> La Babilonia antigua estaba sentada
      sobre las aguas del Éufrates (Jeremías 51:13), y la única copa que
      menciona ese río es la sexta (16:12). Por eso parece ser el ángel de la
      sexta plaga, que vuelve a explicar lo que quedó pendiente.`) +
      tbl(['Símbolo', 'Significado'], [
        ['Una mujer', 'Una iglesia: la mujer pura es la iglesia fiel; la ramera, una iglesia que se apartó de Dios (ver Ezequiel 16)'],
        ['Fornicar con los reyes', 'Unir la iglesia con el estado para apoyarse en el poder civil'],
        ['Sentarse sobre algo', 'Gobernarlo: sobre las aguas, sobre la bestia y sobre los montes'],
        ['Las muchas aguas', 'Pueblos, muchedumbres, naciones y lenguas (17:15)'],
      ]) +
      hi(`La ramera es la religión apartada de Dios que se monta sobre los
      poderes civiles para perseguir al pueblo de Dios. Se aplica al papado
      como sistema, pero el símbolo es más amplio: a lo largo de la historia
      la religión falsa se alió con siete poderes civiles.`) +
      `<p>Fuente: Bohr, <i>Apocalipsis 17</i>, p. 3-5; CS 431.</p>` },

    { t: '🧭 La ropa, la copa y el vino (17:4-6)', capa: 'contexto', h:
      li([`<strong>Púrpura, escarlata, oro y perlas</strong>: colores de la
           realeza y gran riqueza. Describen «la magnificencia y la pompa más
           que reales» de la sede romana (CS 432).`,
          `<strong>La copa de oro y el vino</strong>: el vino son las falsas
           doctrinas que emborrachan a las naciones. Por ejemplo, la
           inmortalidad natural del alma, el tormento eterno de los impíos y
           exaltar el primer día de la semana por encima del sábado. Quien bebe
           ese vino se enfurece contra los que no lo aceptan.`,
          `<strong>Nombres de blasfemia</strong> (los lleva la bestia, que está
           «llena de nombres de blasfemia», 17:3): blasfemia es que un hombre
           pretenda el lugar de Dios en la tierra o el poder de perdonar
           pecados (Juan 10:33; Marcos 2:7).`,
          `<strong>Ebria de la sangre de los santos</strong>: de ningún otro
           poder se puede decir eso con más propiedad que del que por siglos
           persiguió a los discípulos de Cristo.`]) +
      wa(`Esto describe un sistema en su historia. No acusa a los creyentes
      sinceros que hoy pertenecen a esa iglesia.`) +
      `<p>Fuente: Bohr, <i>Apocalipsis 17</i>, p. 10-13; TM 59; CS 432-433.</p>` },

    { t: '🧭 La madre y sus hijas (17:5)', capa: 'contexto', h:
      hi(`Si Babilonia es «la madre de las rameras», tiene hijas: <strong>las
      iglesias que se quedan con sus doctrinas y tradiciones</strong> y la
      imitan buscando alianza con el mundo. Es el protestantismo que se apartó
      de los principios de la Reforma. Así se forma una triple alianza: la
      madre, las hijas y los reyes de la tierra (lo mismo que el dragón, la
      bestia y el falso profeta de 16:13). La madre existió primero; las hijas
      se le unen al final y le devuelven su antigua autoridad.<br><br>
      El nombre <strong>Babilonia</strong> quiere decir «confusión»: iglesias
      que dicen basarse en la Biblia pero están divididas en muchos credos
      opuestos.`) +
      wa(`Lo más importante para no juzgar a nadie: la mayoría de los
      verdaderos discípulos de Cristo están todavía en esas iglesias. Por eso
      Dios los llama con amor: «Salid de ella, pueblo mío» (18:4).`) +
      `<p>Fuente: CS 430-434 y 441; Bohr, <i>Apocalipsis 17</i>, p. 8-9; Treiyer, <i>Identificando a Babilonia</i>, p. 10-11.</p>` },

    { t: '🧭 La bestia que «era y no es, y será» (17:8)', capa: 'contexto', h:
      hi(`Las tres etapas son de la <strong>bestia</strong>, no de la mujer, y
      se unen con Apocalipsis 12 y 13 y con el cuerno pequeño de Daniel 7:`) +
      tbl(['Etapa', 'Significado'], [
        ['«Era»', 'Los 1260 años de dominio papal (538 a 1798), cuando la iglesia usó al estado para perseguir'],
        ['«No es»', 'La herida mortal de 1798: pierde el apoyo del poder civil'],
        ['«Está para subir del abismo»', 'La herida se sana y el mundo se maravilla en pos de la bestia (13:3)'],
      ]) +
      hi(`El <strong>abismo</strong> es el lugar de los muertos (Romanos
      10:7): la bestia «sube» porque revive de su herida. Daniel 11:40-45
      sigue el mismo orden: el rey del norte es herido, se recupera, inunda el
      mundo y al final llega a su fin sin que nadie lo ayude.`) +
      `<p>Fuente: Bohr, <i>Apocalipsis 17</i>, p. 7-8 y 15-18.</p>` },

    { t: '🧭 Las siete cabezas y el octavo (17:9-11)', capa: 'contexto', h:
      hi(`En la profecía, los <strong>montes</strong> son reinos, no reyes
      sueltos (Daniel 2:35, 44). Las cabezas gobiernan una tras otra:`) +
      tbl(['Cabeza', 'Reino'], [
        ['1', 'Babilonia'],
        ['2', 'Medo-Persia'],
        ['3', 'Grecia'],
        ['4', 'Roma imperial'],
        ['5', 'Europa bajo el dominio papal (los 1260 años)'],
        ['6', 'Estados Unidos, cuando el protestantismo se aparte de sus principios'],
        ['7', 'Roma papal sanada de su herida, aliada con los reyes del mundo'],
      ]) +
      hi(`<strong>El octavo</strong> no es otra cabeza: es la séptima, que
      cuenta como octava porque revive (el 8 es el número de la resurrección).
      La lista empieza por Babilonia porque Daniel 2 y 7 y Apocalipsis 13
      siempre empiezan ahí. Leer las cabezas como siete papas desde 1929 no
      encaja, porque termina fijando fechas.<br><br>
      Otra lectura: la quinta cabeza es Roma papal; la sexta, el poder secular
      y ateo que nació con la Revolución francesa y la hirió en 1798; la
      séptima, el protestantismo de Estados Unidos que le devuelve su poder; y
      el octavo, el papado restaurado.`) +
      `<p>Fuente: Bohr, <i>Apocalipsis 17</i>, p. 14-20; Treiyer, <i>Identificando a Babilonia</i>, p. 7.</p>` },

    { t: '🧭 Diez cuernos, «una hora» y el Cordero que vence (17:12-14)', capa: 'contexto', h:
      li([`Las cabezas reinan una tras otra; los <strong>diez cuernos</strong>
           reinan juntos, todos en la séptima cabeza, cuando la bestia revive.`,
          `En Daniel los diez cuernos fueron las divisiones de Europa; al
           final son <strong>los reyes de la tierra en todo el mundo</strong>
           (16:14). El número diez significa «todos», como los diez
           mandamientos expresan todo el deber.`,
          `<strong>«Un mismo propósito»</strong>: la unión de los gobiernos
           para imponer una ley dominical mundial. Será «un vínculo de unión
           universal, una gran armonía, una confederación de fuerzas de
           Satanás» (3MS 447).`,
          `Reinan <strong>«por una hora»</strong> juntamente con la bestia
           y le entregan su poder, como el dragón le dio el suyo en 13:2.`,
          `Pelean contra el Cordero al perseguir a sus seguidores: lo que se
           hace a ellos se le hace a él (Mateo 25:40). Pero <strong>el Cordero
           vence</strong>, y los suyos son «llamados, elegidos y fieles».`]) +
      `<p>Fuente: Bohr, <i>Apocalipsis 17</i>, p. 21-23; 3MS 447-448.</p>` },

    { t: '🧭 Los reyes se vuelven contra la ramera (17:15-18)', capa: 'contexto', h:
      hi(`Las aguas que sostienen a la ramera se le secaron una vez y se le
      secarán otra:`) +
      tbl(['Momento', 'Qué pasa'], [
        ['538-1798', 'Las aguas la sostienen: persecución'],
        ['1798', 'Se secan: pierde el apoyo del estado (Revolución francesa)'],
        ['Tiempo del fin', 'Vuelven a fluir: se sana la herida'],
        ['Sexta plaga', 'Se secan para siempre: los reyes y las multitudes la aborrecen (17:16)'],
      ]) +
      hi(`En ese momento las multitudes ven que fueron engañadas y se vuelven
      contra quienes las guiaron mal: «las espadas que debían servir para
      destruir al pueblo de Dios se emplean ahora para matar a sus enemigos»
      (CS 714).<br><br>
      Dios lo permite «hasta que se hayan cumplido las palabras de Dios»
      (17:17). Y 17:18, que llama a la mujer «la gran ciudad», es el puente al
      capítulo 18.`) +
      `<p>Fuente: Bohr, <i>Apocalipsis 17</i>, p. 5-8 y 23-24; Bohr, <i>Tres ángeles</i> 2:217; CS 713-714.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (1): la mujer', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Mujer', 'Una iglesia, el pueblo de Dios', 'Jeremías 6:2; 2 Corintios 11:2; Efesios 5:25-27'],
        ['Ramera', 'Una iglesia que se apartó de Dios', 'Ezequiel 16:15; Jeremías 3:1-3'],
        ['Fornicar con los reyes', 'Unir la iglesia con el poder civil', 'Ezequiel 16:26; Santiago 4:4; Apocalipsis 18:3'],
        ['Muchas aguas', 'Pueblos y naciones', 'El mismo capítulo: «Las aguas que has visto, donde se sienta la ramera, son pueblos, muchedumbres, naciones y lenguas» (17:15)'],
        ['Sentarse sobre algo', 'Gobernarlo', '«la gran ciudad que reina sobre los reyes de la tierra» (17:18)'],
        ['Vino y copa de oro', 'Falsas doctrinas que emborrachan', 'Jeremías 51:7 (Babilonia, copa de oro que embriagó a la tierra); Apocalipsis 14:8'],
        ['Púrpura y escarlata', 'Realeza', 'Juan 19:2, 5; Mateo 27:28'],
        ['Babilonia', 'Confusión', 'Génesis 11:9'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:102-106; Bohr, <i>Apocalipsis 17</i>, p. 4-5 y 11; CS 431 y 434.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): la bestia', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Bestia', 'Un reino o poder político', 'Daniel 7:17, 23: «La cuarta bestia será un cuarto reino»'],
        ['Cabezas y montes', 'Reinos que gobiernan uno tras otro', 'Apocalipsis 17:9-10; Daniel 2:35, 44 (la piedra se hace un gran monte: el reino de Dios); Jeremías 51:25'],
        ['Cuernos', 'Reyes', '«Los diez cuernos que has visto son diez reyes» (17:12); Daniel 7:24'],
        ['Diez', 'Todos, el conjunto completo', 'Los diez mandamientos expresan todo el deber (Eclesiastés 12:13; Mateo 22:40)'],
        ['Abismo', 'El lugar de los muertos', 'Romanos 10:7'],
        ['El octavo', 'No es otra cabeza: es una de las siete que revive', '«es uno de los siete» (17:11)'],
        ['Perdición', 'La destrucción final', '2 Tesalonicenses 2:3; Juan 17:12'],
        ['El Cordero', 'Cristo', 'Apocalipsis 17:14 con 19:13, 16: «La Palabra de Dios» lleva el nombre «Rey de reyes y Señor de señores»'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:105-106; Bohr, <i>Apocalipsis 17</i>, p. 14-16, 20-21 y 23-24.</p>` },
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
    { t: 'mc', v: '17:1', f: 'c',
      q: '¿Cuál de los siete ángeles de las copas le habla a Juan en Apocalipsis 17:1?',
      o: ['El de la sexta copa, la del Éufrates', 'El de la primera copa, la de la úlcera', 'El de la séptima copa, la del terremoto', 'El de la quinta copa, la de las tinieblas'], a: 0,
      e: 'Babilonia estaba sentada sobre las aguas del Éufrates (Jeremías 51:13) y la única plaga que nombra ese río es la sexta (16:12); ese ángel vuelve para explicar a Juan lo pendiente. Fuente: Bohr, Apocalipsis 17, p. 3-4.' },
    { t: 'mc', v: '17:1', f: 'c',
      q: '¿Qué representa una mujer en la profecía bíblica?',
      o: ['Una iglesia', 'Un imperio', 'Una ciudad antigua', 'Un ángel caído'], a: 0,
      e: 'La mujer es «figura que se emplea en la Biblia para representar una iglesia» (CS 431); la virtuosa, una iglesia pura; la vil, una iglesia apóstata (que se apartó de Dios). Fuente: CS 431.' },
    { t: 'mc', v: '17:2', f: 'c',
      q: '¿Qué significa que los reyes de la tierra «han fornicado» con la ramera (Apocalipsis 17:2)?',
      o: ['Que la iglesia se une con el estado', 'Que los reyes adoran ídolos de piedra', 'Que hay alianzas de guerra entre reyes', 'Que el comercio mundial se corrompe'], a: 0,
      e: 'Si la ramera es la religión que se apartó de Dios, su fornicación con los reyes es la unión de la iglesia con el estado. Fuente: Bohr, Apocalipsis 17, p. 4.' },
    { t: 'mc', v: '17:4', f: 'c',
      q: '¿Qué describen la púrpura, la escarlata, el oro y las perlas de la mujer (Apocalipsis 17:4)?',
      o: ['La pompa más que real de la sede romana', 'La riqueza de la antigua Babilonia', 'La hermosura de la iglesia fiel', 'El lujo de los imperios paganos'], a: 0,
      e: 'Describen «la magnificencia y la pompa más que reales» de la sede romana en su historia. Es un juicio sobre un sistema, no sobre sus fieles. Fuente: CS 432-433.' },
    { t: 'mc', v: '17:4', f: 'c',
      q: '¿Qué es el «vino» que Babilonia da a las naciones?',
      o: ['Falsas doctrinas, como el alma inmortal', 'Bebidas alcohólicas en los cultos', 'Riquezas mal ganadas en el comercio', 'Persecución contra los profetas'], a: 0,
      e: 'El vino del error son falsas doctrinas como la inmortalidad natural del alma, el tormento eterno y exaltar el primer día de la semana sobre el sábado. Fuente: Bohr, Apocalipsis 17, p. 11-12; TM 59.' },
    { t: 'tf', v: '17:6', f: 'c',
      q: 'La mujer ebria de la sangre de los santos señala al poder que por siglos persiguió a los discípulos de Cristo.', a: true,
      e: 'Verdadero: de ningún otro poder se podría decir con más propiedad que estaba «embriagada de la sangre de los santos». Fuente: CS 432-433.' },
    { t: 'mc', v: '17:5', f: 'c',
      q: '¿Qué simbolizan las hijas de «la madre de las rameras» (Apocalipsis 17:5)?',
      o: ['Iglesias que siguen sus doctrinas', 'Naciones que se separaron de Roma', 'Ciudades edificadas sobre siete montes', 'Reyes que la aborrecen al final'], a: 0,
      e: 'Las hijas son las iglesias que se atienen a sus doctrinas y tradiciones y buscan alianza ilícita con el mundo. Fuente: CS 433.' },
    { t: 'tf', v: '17:5', f: 'c',
      q: 'La mayoría de los verdaderos discípulos de Cristo se encuentran todavía en las iglesias que forman Babilonia.', a: true,
      e: 'Verdadero: por eso el juicio es contra un sistema y no contra personas, y Dios llama a los suyos a salir (18:4). Fuente: CS 441.' },
    { t: 'mc', v: '17:8', f: 'c',
      q: '¿Qué significa que la bestia «era y no es, y será» (Apocalipsis 17:8)?',
      o: ['Dominó 1260 años, fue herida y volverá a dominar', 'Reinó en Babilonia, cayó con Ciro y no volverá', 'Existió en tiempos de Juan y luego desapareció', 'Es un espíritu que aparece y se esconde en la historia'], a: 0,
      e: '«Era» durante los 1260 años; «no es» por la herida mortal; «subirá del abismo» cuando se sane la herida y el mundo la siga. Fuente: Bohr, Apocalipsis 17, p. 17-18.' },
    { t: 'mc', v: '17:8', f: 'c',
      q: '¿Qué fechas marcan el período en que la bestia «era»?',
      o: ['Del 538 al 1798', 'Del 1798 al 1844', 'Del 313 al 1517', 'Del 1260 al 1798'], a: 0,
      e: 'Los 1260 años (42 meses) de persecución papal van del 538 al 1798; en 1798 la bestia recibe la herida mortal. Fuente: Bohr, Apocalipsis 17, p. 8.' },
    { t: 'mc', v: '17:8', f: 'c',
      q: '¿Qué representa «el abismo» del que sube la bestia en Apocalipsis 17:8?',
      o: ['La esfera de los muertos', 'El fondo del mar Mediterráneo', 'El desierto donde huyó la mujer', 'Un infierno que arde para siempre'], a: 0,
      e: 'El abismo es la esfera de los muertos (Romanos 10:7); la bestia «sube» porque revive de su herida mortal. Fuente: Bohr, Apocalipsis 17, p. 15-16.' },
    { t: 'mc', v: '17:9', f: 'c',
      q: '¿Qué representan los siete montes de Apocalipsis 17:9?',
      o: ['Siete reinos que gobiernan en sucesión', 'Las siete colinas de la ciudad de Roma', 'Siete papas que reinan desde 1929', 'Siete iglesias de la provincia de Asia'], a: 0,
      e: 'En la profecía los montes representan reinos, no gobernantes sueltos (Daniel 2:35, 44); las cabezas reinan una tras otra. Fuente: Bohr, Apocalipsis 17, p. 14 y 18.' },
    { t: 'mc', v: '17:10', f: 'c',
      q: 'En la lista de las siete cabezas de esta lección, ¿cuál es la sexta?',
      o: ['Estados Unidos bajo el protestantismo', 'El Imperio romano de los días de Juan', 'Medo-Persia, después de Babilonia', 'El papado ya sanado de su herida'], a: 0,
      e: '1 Babilonia, 2 Medo-Persia, 3 Grecia, 4 Roma imperial, 5 Europa bajo el papado, 6 Estados Unidos bajo un protestantismo que se apartó de sus principios, 7 Roma papal sanada. Otra lectura pone como sexta al poder secular nacido en la Revolución francesa. Fuente: Bohr, Apocalipsis 17, p. 18.' },
    { t: 'mc', v: '17:10', f: 'c',
      q: '¿Por qué las siete cabezas no empiezan con Egipto y Asiria?',
      o: ['En Daniel la serie siempre empieza con Babilonia', 'Egipto y Asiria nunca oprimieron a Israel', 'Juan no conocía la historia de esos dos reinos', 'Esos reinos ya no existían cuando escribió Daniel'], a: 0,
      e: 'Egipto y Asiria no aparecen en la secuencia de Daniel 2, Daniel 7 ni Apocalipsis 13, que siempre comienza con Babilonia. Fuente: Bohr, Apocalipsis 17, p. 16.' },
    { t: 'mc', v: '17:10', f: 'c',
      q: 'En la otra lectura de las cabezas, ¿cuál es la sexta cabeza de la bestia?',
      o: ['El poder secular de la Revolución francesa', 'El Imperio romano de los días de Juan', 'El papado sanado de su herida mortal', 'El Imperio griego después de Alejandro'], a: 0,
      e: 'En esa lectura la quinta es Roma papal, la sexta la Francia atea que la hirió en 1798, la séptima el protestantismo de Estados Unidos que le devuelve el poder, y el octavo el papado restaurado. La lista principal pone a Estados Unidos como sexta. Fuente: Treiyer, Identificando a Babilonia, p. 7.' },
    { t: 'tf', v: '17:11', f: 'c',
      q: 'La bestia escarlata tiene una octava cabeza distinta de las siete.', a: false,
      e: 'Falso: solo tiene siete cabezas; la séptima cuenta como «octava» porque revive de su herida, y el 8 es el número de la resurrección. Fuente: Bohr, Apocalipsis 17, p. 20.' },
    { t: 'mc', v: '17:12', f: 'c',
      q: '¿Qué representan los diez cuernos al final de la historia?',
      o: ['Los reyes de la tierra y de todo el mundo', 'Diez reinos bárbaros que dividieron Roma', 'Diez naciones de la Unión Europea', 'Diez papas que gobernarán en el fin'], a: 0,
      e: 'En Daniel los diez cuernos fueron las divisiones de Europa, pero al final son los reyes de la tierra en todo el mundo (16:14); el diez significa «todos». Fuente: Bohr, Apocalipsis 17, p. 21.' },
    { t: 'mc', v: '17:13', f: 'c',
      q: '¿En qué tendrán «un mismo propósito» los reyes de Apocalipsis 17:13?',
      o: ['En imponer una ley dominical mundial', 'En reconstruir la ciudad de Babilonia', 'En destruir la ciudad de Jerusalén', 'En formar un gobierno sin religión'], a: 0,
      e: 'Los gobernantes del mundo, influidos por los sistemas religiosos, se unirán para redactar y hacer cumplir una ley dominical mundial. Fuente: Bohr, Apocalipsis 17, p. 21-22.' },
    { t: 'mc', v: '17:16', f: 'c',
      q: '¿Qué hecho histórico ilustra que los reyes se vuelvan contra la ramera (Apocalipsis 17:16)?',
      o: ['La Revolución francesa', 'La Reforma protestante', 'La caída de Constantinopla', 'El edicto de Constantino'], a: 0,
      e: 'Como en la Revolución francesa, la espada del poder civil que se usó contra el pueblo de Dios se levantará contra la ramera. Fuente: Bohr, Apocalipsis 17, p. 7.' },
    { t: 'tf', v: '17:16', f: 'c',
      q: 'Al final, las multitudes engañadas se vuelven contra quienes las guiaron a perseguir al pueblo de Dios.', a: true,
      e: 'Verdadero: «Las espadas que debían servir para destruir al pueblo de Dios se emplean ahora para matar a sus enemigos». Es lo que anuncia 17:16. Fuente: CS 713-714; Bohr, Apocalipsis 17, p. 23-24.' },
    { t: 'mc', v: '17:15', f: 'c',
      q: '¿Qué versículo del mismo capítulo explica qué son las aguas donde se sienta la ramera?',
      o: ['Apocalipsis 17:15', 'Apocalipsis 17:1', 'Apocalipsis 17:9', 'Apocalipsis 17:18'], a: 0,
      e: '«Las aguas que has visto, donde se sienta la ramera, son pueblos, muchedumbres, naciones y lenguas» (17:15). El ángel intérprete explica la visión en los versículos 9-18. Fuente: Bohr, Apocalipsis 17, p. 3 y 5.' },
    { t: 'mc', v: '17:1', f: 'c',
      q: '¿Qué texto del Antiguo Testamento compara al pueblo de Dios con una mujer?',
      o: ['Jeremías 6:2, la hija de Sión', 'Génesis 3:20, Eva, madre de todos', 'Rut 1:16, la moabita fiel', 'Proverbios 31:10, la mujer virtuosa'], a: 0,
      e: 'Una mujer pura representa una iglesia pura (Jeremías 6:2; Efesios 5:25-27), y una ramera, una iglesia que se prostituyó (Ezequiel 16). Fuente: Bohr, 15 principios 2:103.' },
    { t: 'mc', v: '17:2', f: 'c',
      q: '¿Qué texto llama adulterio a la amistad con el mundo, como la fornicación de la ramera con los reyes?',
      o: ['Santiago 4:4', 'Romanos 12:2', '1 Juan 2:15', 'Mateo 6:24'], a: 0,
      e: 'La mujer que se comporta como ramera es una iglesia que tiene relaciones ilícitas con los poderes civiles (Apocalipsis 17:1; Santiago 4:4; Ezequiel 16:15, 26). Fuente: Bohr, 15 principios 2:106.' },
    { t: 'tf', v: '17:12', f: 'c',
      q: 'Tanto Daniel 7:24 como Apocalipsis 17:12 explican que los cuernos representan reyes.', a: true,
      e: 'Verdadero: «Los diez cuernos significan que de aquel reino se levantarán diez reyes» (Daniel 7:24); «Los diez cuernos que has visto son diez reyes» (17:12). Fuente: Bohr, 15 principios 2:105.' },
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
