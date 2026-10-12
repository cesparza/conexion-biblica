/* Apocalipsis 3 — Las cartas a Sardis, Filadelfia y Laodicea.
   Sigue el modelo de cap01.js; ver tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap3', label: 'Apocalipsis 3', sub: 'Cartas a Sardis, Filadelfia y Laodicea', vs: 22,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Aquí terminan las siete cartas. Van las tres últimas:
      <strong>Sardis, Filadelfia y Laodicea</strong>.<br><br>
      <strong>Sardis</strong> parecía viva, pero estaba muerta.
      <strong>Filadelfia</strong> tenía poca fuerza, pero fue fiel, y Jesús le
      abrió una puerta. <strong>Laodicea</strong> era tibia: ni fría ni
      caliente.<br><br>
      Y Jesús dice: <strong>«Yo estoy a la puerta y llamo»</strong> (3:20). Él
      no entra a la fuerza: espera que le abramos.<br><br>
      <em>La idea del capítulo: Jesús viene pronto, y nos invita a estar
      despiertos, fieles y con el corazón abierto para él.</em>`) },

    { t: '💤 Sardis (3:1-6)', capa: 'nucleo', h:
      tbl(['Sardis', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«El que tiene los siete espíritus de Dios y las siete estrellas» (3:1)'],
        ['Qué alaba', 'Que tiene <strong>unas pocas personas</strong> que no han manchado sus vestiduras (3:4)'],
        ['Qué reprocha', '<strong>«tienes nombre de que vives y estás muerto»</strong> (3:1); sus obras no están bien acabadas delante de Dios (3:2)'],
        ['Qué aconseja', '«Sé vigilante y confirma las otras cosas que están para morir» (3:2). Acordarse, guardar y arrepentirse; si no vela, Jesús vendrá <strong>como ladrón</strong> (3:3)'],
        ['Qué promete al vencedor', '<strong>Vestiduras blancas</strong>; no borrará su nombre <strong>del libro de la vida</strong> y lo confesará delante de su Padre y de sus ángeles (3:5)'],
      ]) +
      wa(`No se cruzan: en Éfeso, Cristo tiene las siete estrellas <strong>en su
      diestra</strong> (2:1). En Sardis tiene <strong>los siete espíritus de
      Dios</strong> y las siete estrellas (3:1).`) },

    { t: '🚪 Filadelfia (3:7-13)', capa: 'nucleo', h:
      tbl(['Filadelfia', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«el Santo, el Verdadero, el que tiene la llave de David, el que abre y ninguno cierra» (3:7)'],
        ['Qué alaba', 'Aunque tiene <strong>poca fuerza</strong>, ha guardado su palabra y no ha negado su nombre (3:8); guardó <strong>la palabra de su paciencia</strong> (3:10)'],
        ['Qué reprocha', '<strong>Nada.</strong> Filadelfia no recibe ningún reproche'],
        ['Qué aconseja', '<strong>«Vengo pronto; retén lo que tienes, para que ninguno tome tu corona»</strong> (3:11)'],
        ['Qué promete al vencedor', 'Hacerlo <strong>columna en el templo de su Dios</strong> y escribir sobre él el nombre de Dios, el de la nueva Jerusalén y su nombre nuevo (3:12)'],
      ]) +
      li([`Le puso delante <strong>«una puerta abierta, la cual nadie puede
           cerrar»</strong> (3:8).`,
          `Algunos de la sinagoga de Satanás vendrán y se postrarán a sus pies (3:9).`,
          `Jesús la guardará de <strong>la hora de la prueba</strong> que vendrá
           sobre el mundo entero (3:10).`]) },

    { t: '🔑 Filadelfia: lo que no se cruza (3:7-12)', capa: 'nucleo', h:
      tbl(['Lo que tiene Jesús', 'Dónde'], [
        ['La <strong>llave de David</strong>', 'Filadelfia (3:7)'],
        ['Las <strong>llaves de la muerte y del Hades</strong>', 'La visión de Juan (1:18)'],
      ]) +
      tbl(['Puerta', 'Dónde'], [
        ['Una <strong>puerta abierta</strong> que nadie puede cerrar', 'Filadelfia (3:8)'],
        ['Jesús <strong>está a la puerta y llama</strong>', 'Laodicea (3:20)'],
      ]) +
      wa(`El <strong>nombre nuevo</strong> sale dos veces: en Pérgamo va en una
      piedrecita blanca (2:17); en Filadelfia es <strong>«mi nombre
      nuevo»</strong>, escrito sobre el vencedor (3:12).<br>
      La <strong>«sinagoga de Satanás»</strong> (3:9) también aparece en Esmirna
      (2:9).`) },

    { t: '🌡️ Laodicea (3:14-22)', capa: 'nucleo', h:
      tbl(['Laodicea', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«El Amén, el testigo fiel y verdadero, el Principio de la creación de Dios» (3:14)'],
        ['Qué alaba', '<strong>Nada.</strong> Es la única de las siete sin alabanza'],
        ['Qué reprocha', '<strong>«ni eres frío ni caliente»</strong> (3:15). Por ser tibio: «te vomitaré de mi boca» (3:16)'],
        ['Qué aconseja', 'Comprarle oro, vestiduras blancas y colirio (3:18); <strong>«sé, pues, celoso y arrepiéntete»</strong> (3:19)'],
        ['Qué promete al vencedor', '<strong>«que se siente conmigo en mi trono»</strong> (3:21), como él se sentó con su Padre en su trono'],
      ]) +
      wa(`Laodicea es lo contrario de Esmirna: Esmirna es pobre, pero rica (2:9);
      Laodicea se cree rica, pero es pobre (3:17).`) },

    { t: '🪞 Lo que Laodicea cree y lo que necesita (3:17-20)', capa: 'nucleo', h:
      tbl(['Laodicea dice', 'Jesús le dice que es'], [
        ['«Yo soy rico, me he enriquecido y de nada tengo necesidad» (3:17)', 'Desventurado, miserable, pobre, ciego y desnudo (3:17)'],
      ]) +
      tbl(['Qué le aconseja comprar (3:18)', 'Para qué'], [
        ['Oro refinado en el fuego', 'Para que sea rico'],
        ['Vestiduras blancas', 'Para vestirse y que no se descubra la vergüenza de su desnudez'],
        ['Colirio para ungir los ojos', 'Para que vea'],
      ]) +
      hi(`<strong>«Yo reprendo y castigo a todos los que amo»</strong> (3:19): la
      corrección es una prueba de amor.<br><br>
      <strong>«Yo estoy a la puerta y llamo; si alguno oye mi voz y abre la
      puerta, entraré a él y cenaré con él y él conmigo»</strong> (3:20).`) },

    { t: '🧩 Las siete cartas, lado a lado (2:1–3:22)', capa: 'nucleo', h:
      tbl(['Iglesia', 'Premio al vencedor'], [
        ['Éfeso', 'Árbol de la vida (2:7)'],
        ['Esmirna', 'No sufrir daño de la segunda muerte (2:11)'],
        ['Pérgamo', 'Maná escondido y piedrecita blanca (2:17)'],
        ['Tiatira', 'Autoridad sobre las naciones y la estrella de la mañana (2:26-28)'],
        ['Sardis', 'Vestiduras blancas; su nombre en el libro de la vida (3:5)'],
        ['Filadelfia', 'Columna en el templo de Dios (3:12)'],
        ['Laodicea', 'Sentarse con Jesús en su trono (3:21)'],
      ]) +
      wa(`Sin reproche: <strong>Esmirna y Filadelfia</strong>. Sin alabanza:
      <strong>Laodicea</strong>.<br>
      Las siete cartas traen la misma frase: «El que tiene oído, oiga lo que el
      Espíritu dice a las iglesias» (3:22). En Éfeso, Esmirna y Pérgamo va antes
      de la promesa; en las otras cuatro, al final.`) },

    { t: '🧭 Sardis, la Reforma que quedó a medias (1517-1833)', capa: 'contexto', h:
      hi(`<strong>Sardis</strong> significa «escapando»: la iglesia que se escapaba
      de la oscuridad de la Edad Media. La ciudad había sido gloriosa siglos
      antes, pero en tiempos de Juan vivía de su fama pasada.<br><br>
      Así fue el período: la <strong>Reforma</strong> empezó con vida, pero
      después de los grandes reformadores las iglesias se quedaron en sus
      credos y no quisieron recibir más luz. Tenían fama de vivas (3:1) pero se
      iban apagando en un formalismo seco.<br><br>
      «No he hallado tus obras <strong>bien acabadas</strong>» (3:2): según Bohr,
      la palabra griega habla de algo <strong>incompleto</strong>, no imperfecto.
      La Reforma no se terminó: muchos siguieron guardando el domingo y otras
      fiestas que no vienen de la Biblia, aunque algunos sí guardaron el
      sábado.`) +
      wa(`Elena de White ubica la frase «tienes nombre de que vives y estás
      muerto» (3:1) en el tiempo de las señales de 1755 a 1780. Otras fechas:
      Urías Smith empieza Sardis en 1798; Maxwell la pone en 1565-1740.`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 14 y 107-113; Elena de White, El conflicto de los siglos, pág. 259; Urías Smith, Las profecías del Apocalipsis, pág. 30; C. Mervyn Maxwell, Apocalipsis, sus revelaciones, pág. 127.</p>` },

    { t: '🧭 Sardis: velar, el libro de la vida y las vestiduras (3:3-5)', capa: 'contexto', h:
      hi(`<strong>Velar.</strong> Sardis estaba sobre un cerro tan empinado que se
      creía invencible. Cayó dos veces (ante Ciro, en 549 a.C., y ante Antíoco,
      en 218 a.C.) porque nadie vigilaba de noche. Por eso Jesús le dice
      «vela».<br><br>
      Elena de White aplica el llamado a velar sobre todo al
      <strong>cierre de la gracia</strong>, cuando Jesús termine su obra en el
      santuario: llegará de repente, como un ladrón.`) +
      tbl(['Promesa (3:5)', 'Significado, según Bohr'], [
        ['Vestiduras blancas', 'La justicia de Cristo: Dios ve en el creyente la obediencia perfecta de Jesús.'],
        ['No borrar su nombre del libro de la vida', 'Los nombres quedan escritos hasta que el caso de cada uno pasa en el juicio investigador.'],
        ['Confesar su nombre ante el Padre', 'Jesús defiende al creyente en ese juicio.'],
      ]) +
      wa(`Las tres promesas tienen que ver con el <strong>juicio investigador</strong>,
      el juicio que hace Dios en el cielo antes de la venida de Jesús.`) +
      `<p>Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 115-120 (cita a Elena de White, Testimonios para la iglesia, tomo 2, págs. 190-192; Palabras de vida del gran Maestro, pág. 253).</p>` },

    { t: '🧭 Filadelfia, el gran despertar (1833-1843)', capa: 'contexto', h:
      hi(`<strong>Filadelfia</strong> significa «amor fraternal». Como período,
      es el gran despertar religioso de mediados del siglo XIX, cuando el
      <strong>movimiento millerita</strong> (por Guillermo Miller) anunció que
      Jesús venía en 1844. Gente de muchas iglesias dejó a un lado sus
      diferencias y se unió para esperarlo.<br><br>
      Se equivocaron en <strong>lo que</strong> pasaría, pero no en la
      <strong>fecha</strong>: en 1844 terminaron los 2.300 días de Daniel 8:14 y
      Jesús empezó una nueva obra en el cielo. Según Bohr, cada vez que Jesús
      empieza una nueva etapa de su obra, Dios lo anuncia en la tierra: al
      nacer, los pastores; en Pentecostés, las lenguas de fuego; en 1844, el
      movimiento millerita.`) +
      wa(`Elena de White dice que ningún gran movimiento desde los apóstoles fue
      más libre de imperfecciones humanas que el del otoño de 1844. Urías Smith
      también cierra Filadelfia en 1844; Maxwell la empieza en 1750.`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 14 y 123-128; Elena de White, El conflicto de los siglos, pág. 331; Urías Smith, Las profecías del Apocalipsis, pág. 32; C. Mervyn Maxwell, Apocalipsis, sus revelaciones, pág. 130.</p>` },

    { t: '🧭 Filadelfia: la puerta abierta de 1844 (3:7-8)', capa: 'contexto', h:
      hi(`Para Bohr y Elena de White, la <strong>puerta abierta</strong> es la del
      <strong>lugar santísimo</strong> del santuario celestial. En 1844 Jesús
      terminó su obra en el lugar santo, cerró esa puerta y abrió la del
      santísimo, donde está el arca con los diez mandamientos (11:19).<br><br>
      Por eso Jesús se presenta como el que «abre y ninguno cierra, y cierra y
      ninguno abre» (3:7). Cuando los creyentes de 1844 entendieron el
      santuario, vieron que esas palabras eran para su tiempo.`) +
      tbl(['Daniel', 'Apocalipsis'], [
        ['8:14: a las 2.300 tardes y mañanas el santuario será purificado', '11:19: se abre el templo y se ve el arca'],
        ['7:13: el Hijo del hombre llega ante el Anciano de días para el juicio', '14:7: «la hora de su juicio ha llegado»'],
      ]) +
      wa(`Elena de White: desde que se abrió esa puerta, los mandamientos brillan
      sobre el pueblo de Dios, y el sábado llegó a ser una prueba.`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 37 y 124-126 (cita a Elena de White, Primeros escritos, pág. 42); Elena de White, El conflicto de los siglos, págs. 353 y 356.</p>` },

    { t: '🧭 Filadelfia: la hora de la prueba, en dos etapas (3:9-12)', capa: 'contexto', h:
      hi(`Según Bohr, el mensaje a Filadelfia se cumple en <strong>dos
      etapas</strong>: en parte con los milleritas, y en pleno con los fieles
      que vivan cuando Jesús venga.`) +
      tbl(['Frase', 'Significado, según Bohr'], [
        ['«Sinagoga de Satanás»', 'Los que se opusieron con dureza al mensaje; al final reconocerán que Dios amó a su pueblo fiel.'],
        ['«La hora de la prueba»', 'Viene sobre todo el mundo habitado (en griego, <em>oikouméne</em>): es la gran prueba final.'],
        ['«Te guardaré»', 'Dios guarda a los suyos en la prueba, sin sacarlos del mundo (Juan 17:15). No es un rapto antes de la tribulación.'],
        ['Columna y nombre de Dios', 'Se cumple en los 144.000, que llevan el nombre de Dios en la frente (14:1).'],
      ]) +
      hi(`Elena de White: a los que estudian la verdad y obedecen, Jesús les
      promete que enviaría a todos los ángeles del cielo antes que dejar que
      Satanás venza a uno solo que confíe en él.`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 128-134 y 137-149; Elena de White, El conflicto de los siglos, págs. 452-453.</p>` },

    { t: '🧭 Laodicea, la iglesia del juicio (desde 1844)', capa: 'contexto', h:
      hi(`<strong>Laodicea</strong> significa «juicio del pueblo»: es la iglesia
      del tiempo en que Dios juzga a los que llevan su nombre, desde 1844 hasta
      el cierre de la gracia.<br><br>
      Quien habla es <strong>el Amén</strong> (el «así sea»), el testigo fiel y
      verdadero. Su mensaje es la verdad completa. «El Principio de la creación
      de Dios» (3:14) no quiere decir que Jesús fue creado: Urías Smith explica
      que él es el que inició la creación, aquel por medio de quien Dios creó
      todo (Juan 1:3).`) +
      wa(`La iglesia adventista no lee este mensaje como dicho a otros: Elena de
      White lo aplica a los adventistas que han tenido gran luz y no andan en
      ella. Bohr insiste en que es para cada miembro de hoy.`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 14 y 152-154 (cita a Elena de White, Mensajes selectos, tomo 2, pág. 75); Urías Smith, Las profecías del Apocalipsis, pág. 35.</p>` },

    { t: '🧭 Laodicea: el diagnóstico y la cura (3:15-20)', capa: 'contexto', h:
      hi(`<strong>Tibio</strong> es agua caliente mezclada con fría. Según Bohr,
      Laodicea es caliente por fuera (doctrinas, escuelas, hospitales, buen
      estilo de vida) y fría por dentro: hace lo correcto con motivos
      equivocados, y no sabe que está enferma.`) +
      tbl(['Lo que Jesús aconseja comprar (3:18)', 'Significado, según Elena de White'], [
        ['Oro refinado en el fuego', 'La fe y el amor'],
        ['Vestiduras blancas', 'La pureza de carácter: la justicia de Cristo'],
        ['Colirio', 'La sabiduría y la gracia para distinguir el bien del mal y descubrir el pecado'],
      ]) +
      hi(`«Yo estoy a la puerta y llamo» (3:20): el problema de Laodicea es que
      Jesús está <strong>fuera</strong> del corazón. Elena de White: muchos
      tienen tanta escoria ante la puerta (rencores, mal genio, codicia, el
      mundo) que no pueden abrirla.<br><br>
      Y el mensaje no deja sin esperanza: «Yo reprendo y castigo a todos los que
      amo» (3:19).`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 155-158 y 165-178 (cita a Elena de White, Testimonios para la iglesia, tomo 4, pág. 91, y tomo 1, pág. 135).</p>` },

    { t: '🧭 De Laodicea a Filadelfia: el zarandeo (3:16, 3:21)', capa: 'contexto', h:
      hi(`Según Bohr, <strong>«te vomitaré de mi boca»</strong> (3:16) es el
      <strong>zarandeo</strong>: una separación dentro del pueblo de Dios. Elena
      de White vio que lo causará el testimonio directo del consejo del Testigo
      fiel a Laodicea: unos lo aceptan, otros se levantan contra él.`) +
      tbl(['Los tibios que…', 'Terminan'], [
        ['Se calientan', 'Unidos a Filadelfia, con el sello de Dios'],
        ['Se enfrían', 'Con la sinagoga de Satanás, con la marca de la bestia'],
      ]) +
      hi(`Por eso Bohr dice que cuando Jesús venga ya no habrá tibios: solo fríos
      y calientes.<br><br>
      <strong>El trono (3:21).</strong> Elena de White explica que Cristo está
      sentado ahora con el Padre en su trono como sacerdote: el vencedor
      compartirá ese trono con él.`) +
      `<p>Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 15, 124 y 152 (cita a Elena de White, Primeros escritos, pág. 270); Elena de White, El conflicto de los siglos, pág. 342.</p>` },
  ],

  preguntas: [
    { t: 'mc', v: '3:1', lit: 'el que tiene los siete espíritus de Dios y las siete estrellas',
      q: '¿Qué tiene el que habla a la iglesia de Sardis? (Apocalipsis 3:1)',
      o: ['Los siete espíritus de Dios y las siete estrellas', 'Las siete estrellas y los siete candelabros de oro', 'La espada aguda de dos filos en su boca', 'La llave de David que abre y nadie cierra'], a: 0,
      e: '«El que tiene los siete espíritus de Dios y las siete estrellas dice esto» (3:1). Los candelabros van con Éfeso (2:1).' },
    { t: 'mc', v: '3:1', lit: 'tienes nombre de que vives y estás muerto',
      q: '¿Qué le reprocha Jesús a la iglesia de Sardis? (Apocalipsis 3:1)',
      o: ['Que tiene nombre de que vive y está muerta', 'Que ha dejado su primer amor', 'Que es tibia, ni fría ni caliente', 'Que tolera a la mujer Jezabel'], a: 0,
      e: '«…tienes nombre de que vives y estás muerto» (3:1). El primer amor es de Éfeso (2:4); tibia, Laodicea (3:16); Jezabel, Tiatira (2:20).' },
    { t: 'mc', v: '3:2', lit: 'Sé vigilante y confirma las otras cosas que están para morir',
      q: '¿Qué le manda Jesús a Sardis en Apocalipsis 3:2?',
      o: ['Sé vigilante y confirma lo que está para morir', 'Sé fiel hasta la muerte y te daré la corona', 'Sé celoso y arrepiéntete de tus obras', 'Retén lo que tienes hasta que yo venga'], a: 0,
      e: '«Sé vigilante y confirma las otras cosas que están para morir» (3:2). «Fiel hasta la muerte» es a Esmirna (2:10); «celoso», a Laodicea (3:19).' },
    { t: 'tf', v: '3:2',
      q: 'Jesús le dice a Sardis: «no he hallado tus obras bien acabadas delante de Dios». (Apocalipsis 3:2)', a: true,
      e: 'Verdadero (3:2).' },
    { t: 'mc', v: '3:3', lit: 'vendré sobre ti como ladrón',
      q: '¿Cómo vendría Jesús sobre Sardis si no velaba? (Apocalipsis 3:3)',
      o: ['Como ladrón', 'Con las nubes', 'Como relámpago', 'Con vara de hierro'], a: 0,
      e: '«…si no velas vendré sobre ti como ladrón y no sabrás a qué hora vendré sobre ti» (3:3).' },
    { t: 'fill', v: '3:3', ins: 'Apocalipsis 3:3 (RV1995) — Completa:',
      p: [{ x: '«Acuérdate, pues, de lo que has recibido y ' }, { b: 'oído', h: '¿recibido y qué?' }, { x: '; guárdalo y ' }, { b: 'arrepiéntete', h: '¿qué más debe hacer?' }, { x: '»' }] },
    { t: 'mc', v: '3:4', lit: 'no han manchado sus vestiduras',
      q: 'Según Apocalipsis 3:4, ¿qué tenían de bueno unas pocas personas en Sardis?',
      o: ['No habían manchado sus vestiduras', 'No habían negado el nombre de Jesús', 'No conocían las profundidades de Satanás', 'No habían dejado su primer amor'], a: 0,
      e: '«…tienes unas pocas personas en Sardis que no han manchado sus vestiduras» (3:4). No negar el nombre es de Filadelfia (3:8).' },
    { t: 'tf', v: '3:4',
      q: 'Los pocos fieles de Sardis andarán con Jesús en vestiduras de púrpura. (Apocalipsis 3:4)', a: false,
      e: 'Falso: andarán con él «en vestiduras BLANCAS, porque son dignas» (3:4).' },
    { t: 'mc', v: '3:5', lit: 'no borraré su nombre del libro de la vida',
      q: '¿Qué promete Jesús al vencedor de Sardis? (Apocalipsis 3:5)',
      o: ['Vestiduras blancas y su nombre en el libro de la vida', 'El maná escondido y una piedrecita blanca', 'Ser columna en el templo de Dios', 'Sentarse con Jesús en su trono'], a: 0,
      e: '«El vencedor será vestido de vestiduras blancas, y no borraré su nombre del libro de la vida» (3:5).' },
    { t: 'mc', v: '3:5', lit: 'confesaré su nombre delante de mi Padre',
      q: '¿Qué texto dice «no borraré su nombre del libro de la vida, y confesaré su nombre delante de mi Padre»?',
      o: ['Apocalipsis 3:5', 'Apocalipsis 3:12', 'Apocalipsis 2:17', 'Apocalipsis 3:21'], a: 0,
      e: 'Apocalipsis 3:5, la promesa a Sardis.' },
    { t: 'tf', v: '3:5',
      q: 'Jesús promete confesar el nombre del vencedor delante de su Padre y delante de sus ángeles. (Apocalipsis 3:5)', a: true,
      e: 'Verdadero (3:5).' },
    { t: 'mc', v: '3:6', lit: 'El que tiene oído, oiga lo que el Espíritu dice',
      q: '¿Qué frase cierra la carta a Sardis? (Apocalipsis 3:6)',
      o: ['«El que tiene oído, oiga lo que el Espíritu dice»', '«Vengo pronto; retén lo que tienes»', '«Sé fiel hasta la muerte, y te daré la corona»', '«Bienaventurado el que lee y los que oyen»'], a: 0,
      e: '«El que tiene oído, oiga lo que el Espíritu dice a las iglesias» (3:6). Es la frase que cierra o acompaña cada una de las siete cartas.' },
    { t: 'mc', v: '3:7', lit: 'el que tiene la llave de David',
      q: '¿Qué llave tiene el que habla a la iglesia de Filadelfia? (Apocalipsis 3:7)',
      o: ['La llave de David', 'Las llaves de la muerte y del Hades', 'La llave del abismo', 'La llave del templo'], a: 0,
      e: '«…el que tiene la llave de David, el que abre y ninguno cierra» (3:7). Las llaves de la muerte y del Hades son las de 1:18.' },
    { t: 'fill', v: '3:7', ins: 'Apocalipsis 3:7 (RV1995) — Completa:',
      p: [{ x: '«Esto dice el ' }, { b: 'Santo', h: '¿el qué?' }, { x: ', el Verdadero, el que tiene la llave de ' }, { b: 'David', h: '¿la llave de quién?' }, { x: '»' }] },
    { t: 'mc', v: '3:8', lit: 'una puerta abierta, la cual nadie puede cerrar',
      q: '¿Qué puso Jesús delante de la iglesia de Filadelfia? (Apocalipsis 3:8)',
      o: ['Una puerta abierta que nadie puede cerrar', 'Una corona que nadie le puede quitar', 'Un libro sellado con siete sellos', 'Un candelabro de oro siempre encendido'], a: 0,
      e: '«…he puesto delante de ti una puerta abierta, la cual nadie puede cerrar» (3:8).' },
    { t: 'tf', v: '3:8',
      q: 'Filadelfia tenía mucha fuerza y por eso guardó la palabra de Jesús. (Apocalipsis 3:8)', a: false,
      e: 'Falso: «aunque tienes POCA fuerza, has guardado mi palabra y no has negado mi nombre» (3:8).' },
    { t: 'mc', v: '3:9', lit: 'se postren a tus pies',
      q: 'Según Apocalipsis 3:9, ¿qué harán algunos de la sinagoga de Satanás ante Filadelfia?',
      o: ['Vendrán y se postrarán a sus pies', 'La echarán en la cárcel diez días', 'Le quitarán su corona', 'Le harán guerra con la espada'], a: 0,
      e: '«Yo haré que vengan y se postren a tus pies reconociendo que yo te he amado» (3:9).' },
    { t: 'mc', v: '3:10', lit: 'has guardado la palabra de mi paciencia',
      q: '¿Por qué guardará Jesús a Filadelfia de la hora de la prueba? (Apocalipsis 3:10)',
      o: ['Porque guardó la palabra de su paciencia', 'Porque no manchó sus vestiduras', 'Porque aborreció a los nicolaítas', 'Porque fue fiel hasta la muerte'], a: 0,
      e: '«Por cuanto has guardado la palabra de mi paciencia, yo también te guardaré de la hora de la prueba» (3:10).' },
    { t: 'tf', v: '3:10',
      q: 'Según Apocalipsis 3:10, la hora de la prueba vendrá solo sobre la ciudad de Filadelfia.', a: false,
      e: 'Falso: vendrá «sobre el MUNDO ENTERO para probar a los que habitan sobre la tierra» (3:10).' },
    { t: 'mc', v: '3:11', lit: 'retén lo que tienes, para que ninguno tome tu corona',
      q: '¿Qué texto dice «Vengo pronto; retén lo que tienes, para que ninguno tome tu corona»?',
      o: ['Apocalipsis 3:11', 'Apocalipsis 2:25', 'Apocalipsis 3:3', 'Apocalipsis 2:10'], a: 0,
      e: 'Apocalipsis 3:11, en la carta a Filadelfia. Ojo: 2:25 es «lo que tenéis, retenedlo hasta que yo venga» (Tiatira).' },
    { t: 'mc', v: '3:12', lit: 'Al vencedor yo lo haré columna en el templo de mi Dios',
      q: '¿Qué promete Jesús al vencedor de Filadelfia? (Apocalipsis 3:12)',
      o: ['Hacerlo columna en el templo de Dios', 'Darle a comer del árbol de la vida', 'Darle la estrella de la mañana', 'Sentarlo con él en su trono'], a: 0,
      e: '«Al vencedor yo lo haré columna en el templo de mi Dios y nunca más saldrá de allí» (3:12).' },
    { t: 'mc', v: '3:12', lit: 'el nombre de mi Dios y el nombre de la ciudad de mi Dios',
      q: 'Según Apocalipsis 3:12, ¿qué nombres escribirá Jesús sobre el vencedor?',
      o: ['El de su Dios, el de la nueva Jerusalén y su nombre nuevo', 'El de su Padre, el del Cordero y el de los doce apóstoles', 'El de su Dios, el de Sion y el de las doce tribus', 'El del Santo, el del Verdadero y el de David'], a: 0,
      e: '«Escribiré sobre él el nombre de mi Dios y el nombre de la ciudad de mi Dios, la nueva Jerusalén… y mi nombre nuevo» (3:12).' },
    { t: 'tf', v: '3:12',
      q: 'Según Apocalipsis 3:12, la nueva Jerusalén desciende del cielo.', a: true,
      e: 'Verdadero: «la nueva Jerusalén, la cual desciende del cielo, con mi Dios» (3:12).' },
    { t: 'tf', v: '3:13',
      q: 'La carta a Filadelfia termina con «El que tiene oído, oiga lo que el Espíritu dice a las iglesias». (Apocalipsis 3:13)', a: true,
      e: 'Verdadero (3:13).' },
    { t: 'mc', v: '3:14', lit: 'El Amén, el testigo fiel y verdadero',
      q: '¿Cómo se presenta Cristo en la carta a Laodicea? (Apocalipsis 3:14)',
      o: ['El Amén, el testigo fiel y verdadero', 'El Hijo de Dios, con ojos de fuego', 'El primero y el postrero', 'El Santo, el Verdadero'], a: 0,
      e: '«El Amén, el testigo fiel y verdadero, el Principio de la creación de Dios, dice esto» (3:14).' },
    { t: 'mc', v: '3:14', lit: 'el Principio de la creación de Dios',
      q: '¿Qué texto dice «el Principio de la creación de Dios»?',
      o: ['Apocalipsis 3:14', 'Apocalipsis 3:7', 'Apocalipsis 2:8', 'Apocalipsis 1:8'], a: 0,
      e: 'Apocalipsis 3:14, al empezar la carta a Laodicea.' },
    { t: 'mc', v: '3:14', f: 'c',
      q: 'Según Bohr, ¿qué período de la historia de la iglesia representa Laodicea?',
      o: ['Desde 1844 hasta el cierre de la gracia', 'El tiempo de los apóstoles', 'El tiempo de la Reforma protestante', 'El tiempo de la persecución romana'], a: 0,
      e: 'Laodicea («juicio del pueblo») es la última etapa: el tiempo del juicio, desde 1844. El texto solo dice que la carta es para la iglesia en Laodicea (3:14). Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 14-15.' },
    { t: 'mc', v: '3:15', lit: 'ni eres frío ni caliente',
      q: 'Según Apocalipsis 3:15-16, ¿cómo era la iglesia de Laodicea?',
      o: ['Tibia, ni fría ni caliente', 'Fría, pero no muerta', 'Caliente, pero sin amor', 'Pobre, aunque rica'], a: 0,
      e: '«…ni eres frío ni caliente. ¡Ojalá fueras frío o caliente!» (3:15).' },
    { t: 'fill', v: '3:16', ins: 'Apocalipsis 3:16 (RV1995) — Completa:',
      p: [{ x: '«Pero por cuanto eres ' }, { b: 'tibio', h: '¿cómo es?' }, { x: ' y no frío ni caliente, te ' }, { b: 'vomitaré', h: '¿qué hará?' }, { x: ' de mi boca.»' }] },
    { t: 'mc', v: '3:17', lit: 'Yo soy rico, me he enriquecido y de nada tengo necesidad',
      q: '¿Qué decía de sí misma la iglesia de Laodicea? (Apocalipsis 3:17)',
      o: ['Soy rico y de nada tengo necesidad', 'Soy pobre y tengo poca fuerza', 'Soy pequeño, pero sigo fiel', 'Estuve muerto, pero vivo'], a: 0,
      e: '«Tú dices: Yo soy rico, me he enriquecido y de nada tengo necesidad» (3:17).' },
    { t: 'tf', v: '3:17',
      q: 'Jesús le dice a Laodicea que es desventurada, miserable, pobre, ciega y desnuda. (Apocalipsis 3:17)', a: true,
      e: 'Verdadero: «no sabes que eres desventurado, miserable, pobre, ciego y estás desnudo» (3:17).' },
    { t: 'mc', v: '3:18', lit: 'oro refinado en el fuego',
      q: '¿Qué tres cosas le aconseja Jesús comprar a Laodicea? (Apocalipsis 3:18)',
      o: ['Oro refinado, vestiduras blancas y colirio', 'Aceite para la lámpara, vino nuevo y trigo', 'Oro, incienso y mirra para el templo', 'Lino fino, perlas preciosas y plata'], a: 0,
      e: '«…que compres de mí oro refinado en el fuego… y vestiduras blancas… Y unge tus ojos con colirio» (3:18).' },
    { t: 'tf', v: '3:18',
      q: 'Jesús le aconseja a Laodicea ungir sus ojos con aceite para que vea. (Apocalipsis 3:18)', a: false,
      e: 'Falso: con COLIRIO: «unge tus ojos con colirio para que veas» (3:18).' },
    { t: 'mc', v: '3:18', f: 'c',
      q: 'Según Elena de White, ¿qué representan las vestiduras blancas que Jesús aconseja comprar en Apocalipsis 3:18?',
      o: ['La justicia de Cristo', 'La riqueza de la iglesia', 'La ropa de los sacerdotes', 'Los ángeles del trono'], a: 0,
      e: 'La vestidura blanca es la pureza de carácter, la justicia de Cristo impartida al pecador. El texto dice que son «para vestirte». Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 172 (cita a Elena de White, Testimonios para la iglesia, tomo 4, pág. 91).' },
    { t: 'mc', v: '3:19', lit: 'Yo reprendo y castigo a todos los que amo',
      q: 'Según Apocalipsis 3:19, ¿a quiénes reprende y castiga Jesús?',
      o: ['A todos los que ama', 'A los que no lo conocen', 'A los reyes de la tierra', 'A los que adoran ídolos'], a: 0,
      e: '«Yo reprendo y castigo a todos los que amo; sé, pues, celoso y arrepiéntete» (3:19).' },
    { t: 'mc', v: '3:20', lit: 'Yo estoy a la puerta y llamo',
      q: '¿Qué texto dice «Yo estoy a la puerta y llamo»?',
      o: ['Apocalipsis 3:20', 'Apocalipsis 3:8', 'Apocalipsis 3:11', 'Apocalipsis 3:3'], a: 0,
      e: 'Apocalipsis 3:20, en la carta a Laodicea. La «puerta abierta» que nadie puede cerrar es la de Filadelfia (3:8).' },
    { t: 'fill', v: '3:20', ins: 'Apocalipsis 3:20 (RV1995) — Completa:',
      p: [{ x: '«si alguno oye mi ' }, { b: 'voz', h: '¿oye qué?' }, { x: ' y abre la ' }, { b: 'puerta', h: '¿abre qué?' }, { x: ', entraré a él y ' }, { b: 'cenaré', h: '¿qué hará con él?' }, { x: ' con él y él conmigo.»' }] },
    { t: 'mc', v: '3:20', f: 'c',
      q: 'Según Bohr, ¿qué muestra «Yo estoy a la puerta y llamo» sobre el problema de Laodicea?',
      o: ['Que Jesús está fuera del corazón y pide entrar', 'Que Jesús ya entró en todos los corazones', 'Que la puerta del cielo ya se cerró', 'Que solo los pastores pueden abrirle'], a: 0,
      e: 'El gran problema de Laodicea es que Jesús está afuera y el yo reina adentro; Jesús llama y no fuerza la puerta. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 173.' },
    { t: 'mc', v: '3:21', lit: 'que se siente conmigo en mi trono',
      q: '¿Qué promete Jesús al vencedor de Laodicea? (Apocalipsis 3:21)',
      o: ['Sentarse con él en su trono', 'Ser columna en el templo', 'Comer del maná escondido', 'Autoridad sobre las naciones'], a: 0,
      e: '«Al vencedor le concederé que se siente conmigo en mi trono» (3:21).' },
    { t: 'tf', v: '3:21',
      q: 'Jesús dice que él ha vencido y se ha sentado con su Padre en su trono. (Apocalipsis 3:21)', a: true,
      e: 'Verdadero: «así como yo he vencido y me he sentado con mi Padre en su trono» (3:21).' },
    { t: 'mc', v: '3:22', lit: 'El que tiene oído, oiga lo que el Espíritu dice a las iglesias',
      q: '¿Cuántas veces se repite «El que tiene oído, oiga lo que el Espíritu dice a las iglesias» en las cartas? (Apocalipsis 2-3)',
      o: ['Siete, una en cada carta', 'Tres, una en cada carta del capítulo 3', 'Cuatro, en las cartas del capítulo 2', 'Doce, como las tribus'], a: 0,
      e: 'Siete: 2:7, 2:11, 2:17, 2:29, 3:6, 3:13 y 3:22. La última está en 3:22, al cerrar la carta a Laodicea.' },
    { t: 'mc', v: '3:1', f: 'c',
      q: 'Según Bohr, ¿qué período de la historia de la iglesia representa Sardis?',
      o: ['1517-1833, la Reforma y lo que siguió', '538-1517, la Edad Media', '313-538, desde Constantino', '1844 en adelante, el tiempo del juicio'], a: 0,
      e: 'Sardis («escapando») empezó a salir de la oscuridad medieval, pero no se desligó del todo. Urías Smith la empieza en 1798. Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 14; Urías Smith, Las profecías del Apocalipsis, pág. 30.' },
    { t: 'mc', v: '3:1', f: 'c',
      q: 'Según Bohr, ¿qué significa el nombre «Sardis»?',
      o: ['Escapando', 'Deseable', 'Amor fraternal', 'Juicio del pueblo'], a: 0,
      e: 'Sardis es «escapando»: la iglesia que se escapaba del dominio de la Edad Media. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 14 y 110.' },
    { t: 'mc', v: '3:2', f: 'c',
      q: 'Según Bohr, ¿qué quiere decir que Jesús no halló «bien acabadas» las obras de Sardis?',
      o: ['Que no completó la Reforma ni quiso recibir más luz', 'Que sus templos quedaron sin terminar', 'Que sus miembros no daban suficientes ofrendas', 'Que dejó de predicar la justificación por la fe'], a: 0,
      e: 'La palabra griega habla de algo incompleto: las iglesias se quedaron en lo que enseñaron los reformadores. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 114-115.' },
    { t: 'tf', v: '3:3', f: 'c',
      q: 'Según Bohr, la ciudad de Sardis cayó dos veces porque nadie vigilaba de noche, y por eso Jesús le dice que vele.', a: true,
      e: 'Verdadero: cayó ante Ciro (549 a.C.) y ante Antíoco (218 a.C.) por exceso de confianza. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 115.' },
    { t: 'mc', v: '3:3', f: 'c',
      q: 'Según Elena de White (citada por Bohr), ¿a qué momento apunta sobre todo el llamado a velar?',
      o: ['Al cierre de la gracia en el santuario', 'A la destrucción de Jerusalén', 'Al regreso de Juan de Patmos', 'Al comienzo de la Reforma'], a: 0,
      e: 'Se refiere a cuando Jesús termine su obra en el santuario y se cierre la gracia: llegará de repente. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 117-118 (cita Testimonios para la iglesia, tomo 2, págs. 190-192).' },
    { t: 'mc', v: '3:5', f: 'c',
      q: 'Según Bohr, ¿con qué obra de Jesús en el cielo tienen que ver las tres promesas de Apocalipsis 3:5?',
      o: ['Con el juicio investigador', 'Con la creación del mundo', 'Con el milenio en el cielo', 'Con la purificación del templo de Jerusalén'], a: 0,
      e: 'Vestiduras blancas, no borrar el nombre del libro de la vida y confesar el nombre ante el Padre: las tres son del juicio investigador. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 119-120.' },
    { t: 'mc', v: '3:7', f: 'c',
      q: 'Según Bohr, ¿qué período de la historia de la iglesia representa Filadelfia?',
      o: ['1833-1843, el gran despertar adventista', '1517-1833, la Reforma protestante', '1844 en adelante, el tiempo del juicio', '31-100 d.C., los apóstoles'], a: 0,
      e: 'Filadelfia («amor fraternal») es el gran despertar de mediados del siglo XIX, con el movimiento millerita. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 14 y 124.' },
    { t: 'mc', v: '3:8', f: 'c',
      q: 'Según Bohr y Elena de White, ¿qué puerta abrió Jesús en 1844?',
      o: ['La del lugar santísimo del santuario celestial', 'La del lugar santo del santuario celestial', 'La de la salvación para los gentiles', 'La del cielo para los redimidos'], a: 0,
      e: 'Jesús cerró la puerta del lugar santo y abrió la del santísimo, donde está el arca (11:19). Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 124-125; Elena de White, El conflicto de los siglos, pág. 356.' },
    { t: 'tf', v: '3:8', f: 'c',
      q: 'Según Bohr, los milleritas se equivocaron sobre lo que pasaría en 1844, pero la fecha era correcta.', a: true,
      e: 'Verdadero: en 1844 empezó el juicio en el lugar santísimo, aunque ellos esperaban la venida de Jesús. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 125.' },
    { t: 'mc', v: '3:10', f: 'c',
      q: 'Según Bohr, ¿qué significa «te guardaré de la hora de la prueba» (3:10)?',
      o: ['Que Dios cuida a los suyos en la prueba, sin sacarlos del mundo', 'Que Dios se llevará a la iglesia al cielo antes de la tribulación', 'Que la iglesia no tendrá pruebas en el tiempo del fin', 'Que la prueba solo vendrá sobre los que no creen'], a: 0,
      e: 'Es como la oración de Jesús: «No ruego que los quites del mundo, sino que los guardes del mal» (Juan 17:15). No enseña un rapto antes de la tribulación. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 131.' },
    { t: 'tf', v: '3:10', f: 'c',
      q: 'Según Bohr, el mensaje a Filadelfia se cumple en dos etapas: en parte con los milleritas y en pleno con los fieles que vivan cuando Jesús venga.', a: true,
      e: 'Verdadero: la «hora de la prueba» viene sobre todo el mundo habitado, algo que en 1844 no ocurrió. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 124 y 131-132.' },
    { t: 'mc', v: '3:12', f: 'c',
      q: 'Según Bohr, ¿en quiénes se cumple al final la promesa de llevar escrito el nombre de Dios (3:12)?',
      o: ['En los 144.000 que estarán vivos cuando Jesús venga', 'En los apóstoles que fundaron la iglesia', 'En los reformadores del siglo XVI', 'En los mártires de Esmirna'], a: 0,
      e: 'Los 144.000 tienen el nombre del Padre escrito en la frente (14:1). Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 134.' },
    { t: 'mc', v: '3:14', f: 'c',
      q: 'Según Urías Smith, ¿qué significa que Jesús sea «el Principio de la creación de Dios»?',
      o: ['Que por medio de él Dios creó todas las cosas', 'Que fue el primer ser creado por Dios', 'Que nació al principio del mundo', 'Que apareció antes que los ángeles'], a: 0,
      e: 'No significa que fue creado: él inició la obra de la creación (Juan 1:3). Fuente: Urías Smith, Las profecías del Apocalipsis, pág. 35.' },
    { t: 'mc', v: '3:15', f: 'c',
      q: 'Según Bohr, ¿cuál es el problema principal de Laodicea?',
      o: ['Hace lo correcto con motivos equivocados', 'Persigue a los que guardan el sábado', 'Dejó de tener escuelas e instituciones', 'Abandonó todas sus doctrinas'], a: 0,
      e: 'Es caliente por fuera y fría por dentro: tiene la forma de la piedad sin su poder, y no sabe que está enferma. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 155-163.' },
    { t: 'mc', v: '3:16', f: 'c',
      q: 'Según Bohr, ¿qué es el «te vomitaré de mi boca» de Apocalipsis 3:16?',
      o: ['El zarandeo: los tibios se calientan o se enfrían', 'La destrucción de la ciudad de Laodicea', 'La expulsión de los pastores infieles', 'El terremoto final antes de la venida'], a: 0,
      e: 'Cuando termine el zarandeo solo habrá fríos y calientes; cuando Jesús venga no habrá tibios. Fuentes: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, págs. 15 y 124 (cita a Elena de White, Primeros escritos, pág. 270).' },
    { t: 'mc', v: '3:18', f: 'c',
      q: 'Según Elena de White, ¿qué representa el «oro refinado en el fuego» de Apocalipsis 3:18?',
      o: ['La fe y el amor', 'Las ofrendas de la iglesia', 'Las doctrinas correctas', 'El don de profecía'], a: 0,
      e: 'El oro probado en el fuego es la fe y el amor, que brillan más cuanto más se prueban. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 172 (cita Testimonios para la iglesia, tomo 4, pág. 91).' },
    { t: 'tf', v: '3:18', f: 'c',
      q: 'Según Elena de White, el colirio es la sabiduría y la gracia que permiten distinguir el bien del mal y descubrir el pecado.', a: true,
      e: 'Verdadero: con ese colirio Dios da claridad al entendimiento. Fuente: Stephen Bohr, Las siete iglesias, la iglesia militante y triunfante, pág. 172 (cita Testimonios para la iglesia, tomo 4, pág. 91).' },
  ],

  tarjetas: [
    { f: 'Las tres iglesias del capítulo 3, en orden', r: 'Sardis, Filadelfia, Laodicea' },
    { f: 'Reproche a Sardis (3:1)', r: '«tienes nombre de que vives y estás muerto»' },
    { f: 'Cómo vendrá Jesús si Sardis no vela (3:3)', r: 'Como ladrón, y no sabrá a qué hora' },
    { f: 'Promesa a Sardis (3:5)', r: 'Vestiduras blancas; no borrará su nombre del libro de la vida; lo confesará ante su Padre y sus ángeles' },
    { f: 'La llave del que habla a Filadelfia (3:7)', r: 'La llave de David: abre y ninguno cierra, cierra y ninguno abre' },
    { f: 'Lo que Jesús puso delante de Filadelfia (3:8)', r: 'Una puerta abierta, que nadie puede cerrar' },
    { f: '«Vengo pronto; retén lo que tienes, para que ninguno tome tu corona»', r: 'Apocalipsis 3:11' },
    { f: 'Promesa a Filadelfia (3:12)', r: 'Columna en el templo de Dios; el nombre de Dios, de la nueva Jerusalén y su nombre nuevo' },
    { f: 'Cómo se presenta Cristo a Laodicea (3:14)', r: 'El Amén, el testigo fiel y verdadero, el Principio de la creación de Dios' },
    { f: 'Por qué Laodicea será vomitada (3:15-16)', r: 'Porque es tibia, ni fría ni caliente' },
    { f: 'Las tres cosas que aconseja comprar (3:18)', r: 'Oro refinado en el fuego, vestiduras blancas y colirio' },
    { f: '«Yo estoy a la puerta y llamo»', r: 'Apocalipsis 3:20' },
    { f: 'Promesa a Laodicea (3:21)', r: 'Sentarse con Jesús en su trono' },
    { f: 'Iglesias sin reproche y sin alabanza (caps. 2-3)', r: 'Sin reproche: Esmirna y Filadelfia. Sin alabanza: Laodicea' },
  ],
};
