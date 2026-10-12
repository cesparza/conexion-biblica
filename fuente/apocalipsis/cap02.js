/* Apocalipsis 2 — Las cartas a Éfeso, Esmirna, Pérgamo y Tiatira.
   Sigue el modelo de cap01.js; ver tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap2', label: 'Apocalipsis 2', sub: 'Cartas a Éfeso, Esmirna, Pérgamo y Tiatira', vs: 29,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Jesús le manda a Juan escribir <strong>siete cartas</strong>, una para
      cada iglesia de Asia. En este capítulo van las cuatro primeras:
      <strong>Éfeso, Esmirna, Pérgamo y Tiatira</strong>.<br><br>
      Las cartas se parecen: Jesús dice quién es, dice <strong>«Yo conozco tus
      obras»</strong> (2:2), alaba lo bueno, corrige lo malo y hace una promesa
      al que venza.<br><br>
      Todas repiten: <strong>«El que tiene oído, oiga lo que el Espíritu dice a
      las iglesias»</strong> (2:7).<br><br>
      <em>La idea del capítulo: Jesús conoce a su iglesia, la corrige porque la
      ama y le promete un premio al que se mantenga fiel.</em>`) },

    { t: '🕯️ Éfeso (2:1-7)', capa: 'nucleo', h:
      tbl(['Éfeso', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«El que tiene las siete estrellas en su diestra, el que camina en medio de los siete candelabros de oro» (2:1)'],
        ['Qué alaba', 'Su arduo trabajo y su perseverancia; probó a los que se dicen apóstoles y los halló <strong>mentirosos</strong> (2:2-3). Y que aborrece <strong>las obras de los nicolaítas</strong> (2:6)'],
        ['Qué reprocha', '<strong>«has dejado tu primer amor»</strong> (2:4)'],
        ['Qué aconseja', 'Recordar de dónde ha caído, <strong>arrepentirse y hacer las primeras obras</strong>; si no, Jesús quitará su candelabro de su lugar (2:5)'],
        ['Qué promete al vencedor', 'Comer <strong>del árbol de la vida</strong>, que está en medio del paraíso de Dios (2:7)'],
      ]) +
      wa(`No se cruzan: Éfeso debe volver a <strong>las primeras obras</strong>
      (2:5). La iglesia cuyas obras postreras son <strong>«superiores a las
      primeras»</strong> (2:19) es Tiatira.`) },

    { t: '👑 Esmirna (2:8-11)', capa: 'nucleo', h:
      tbl(['Esmirna', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«El primero y el postrero, el que estuvo muerto y vivió» (2:8)'],
        ['Qué alaba', 'Conoce su tribulación y su <strong>pobreza</strong>, «aunque eres rico» (2:9)'],
        ['Qué reprocha', '<strong>Nada.</strong> Esmirna no recibe ningún reproche'],
        ['Qué aconseja', '«No temas lo que has de padecer» (2:10). El diablo echará a algunos en la cárcel y tendrán tribulación por <strong>diez días</strong>. «¡Sé fiel hasta la muerte y yo te daré la corona de la vida!» (2:10)'],
        ['Qué promete al vencedor', '<strong>«no sufrirá daño de la segunda muerte»</strong> (2:11)'],
      ]) +
      wa(`Esmirna es <strong>pobre, pero rica</strong> (2:9). Laodicea es al revés:
      dice que es rica y Jesús le dice que es pobre (3:17).<br>
      Los que dicen ser judíos y no lo son son <strong>«sinagoga de
      Satanás»</strong> (2:9). La misma frase vuelve en Filadelfia (3:9).`) },

    { t: '⚔️ Pérgamo (2:12-17)', capa: 'nucleo', h:
      tbl(['Pérgamo', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«El que tiene la espada aguda de dos filos» (2:12)'],
        ['Qué alaba', 'Vive <strong>«donde está el trono de Satanás»</strong> (2:13), pero retiene el nombre de Jesús y no negó su fe, aun cuando mataron a <strong>Antipas, su testigo fiel</strong> (2:13)'],
        ['Qué reprocha', 'Tiene a los que retienen la <strong>doctrina de Balaam</strong>, que enseñaba a Balac a poner tropiezo a Israel (2:14), y a los que retienen la <strong>doctrina de los nicolaítas</strong> (2:15)'],
        ['Qué aconseja', '«arrepiéntete, pues si no, vendré pronto hasta ti» (2:16); pelearía contra ellos con <strong>la espada de su boca</strong>'],
        ['Qué promete al vencedor', 'El <strong>maná escondido</strong> y una <strong>piedrecita blanca</strong> con un <strong>nombre nuevo</strong> que nadie conoce sino el que lo recibe (2:17)'],
      ]) +
      wa(`<strong>Nicolaítas</strong> en dos cartas: Éfeso aborrece sus obras y
      Jesús lo alaba (2:6); Pérgamo tiene a los que retienen su doctrina y Jesús
      lo reprocha (2:15).<br>
      Y el orden: <strong>Balaam</strong> enseñaba a <strong>Balac</strong>, no
      al revés (2:14).`) },

    { t: '🔥 Tiatira: la carta (2:18-29)', capa: 'nucleo', h:
      tbl(['Tiatira', 'Lo que dice la carta'], [
        ['Cómo se presenta Cristo', '«El Hijo de Dios, el que tiene ojos como llama de fuego y pies semejantes al bronce pulido» (2:18)'],
        ['Qué alaba', 'Su amor, su fe, su servicio, su perseverancia, y que sus obras postreras son superiores a las primeras (2:19)'],
        ['Qué reprocha', 'Que tolera a <strong>«esa mujer Jezabel, que se dice profetisa»</strong> (2:20)'],
        ['Qué aconseja', 'A los fieles: <strong>«lo que tenéis, retenedlo hasta que yo venga»</strong> (2:25)'],
        ['Qué promete al vencedor', '<strong>Autoridad sobre las naciones</strong>, regirlas con vara de hierro (2:26-27) y <strong>la estrella de la mañana</strong> (2:28)'],
      ]) +
      wa(`Es la única carta donde Cristo se llama <strong>«El Hijo de
      Dios»</strong> (2:18). Los ojos de fuego y los pies de bronce ya estaban
      en la visión de 1:14-15.`) },

    { t: '⚖️ Jezabel y los fieles de Tiatira (2:20-29)', capa: 'nucleo', h:
      li([`Jezabel enseñaba a los siervos de Jesús a fornicar y a comer cosas
           sacrificadas a los ídolos (2:20).`,
          `<strong>«Yo le he dado tiempo para que se arrepienta»</strong> (2:21),
           pero no quiso.`,
          `Jesús la arroja en cama, y en gran tribulación a los que adulteran con
           ella si no se arrepienten (2:22).`,
          `Así todas las iglesias sabrán que él es <strong>«el que escudriña la
           mente y el corazón»</strong> (2:23), y dará a cada uno según sus obras.`,
          `A los demás, que no conocen lo que ellos llaman «las profundidades de
           Satanás», les dice: <strong>«No os impongo otra carga»</strong> (2:24).`,
          `Al vencedor que guarde sus obras <strong>hasta el fin</strong>: las
           naciones serán quebradas <strong>«como un vaso de alfarero»</strong>
           (2:27).`]) +
      wa(`Aquí la frase <strong>«El que tiene oído…»</strong> va al final, después
      de la promesa (2:29). En Éfeso, Esmirna y Pérgamo va antes de la promesa
      (2:7, 2:11, 2:17).`) },

    { t: '🧩 Las cuatro cartas, lado a lado (2:1-29)', capa: 'nucleo', h:
      tbl(['Iglesia', 'Premio al vencedor'], [
        ['Éfeso', 'Árbol de la vida (2:7)'],
        ['Esmirna', 'No sufrir daño de la segunda muerte (2:11)'],
        ['Pérgamo', 'Maná escondido, piedrecita blanca, nombre nuevo (2:17)'],
        ['Tiatira', 'Autoridad sobre las naciones, estrella de la mañana (2:26-28)'],
      ]) +
      tbl(['Frase con «Satanás»', 'Iglesia'], [
        ['«sinagoga de Satanás»', 'Esmirna (2:9)'],
        ['«el trono de Satanás»', 'Pérgamo (2:13)'],
        ['«las profundidades de Satanás»', 'Tiatira (2:24)'],
      ]) +
      wa(`De estas cuatro, solo <strong>Esmirna</strong> no recibe reproche.`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · Las cartas eran para <strong>iglesias reales</strong> de Asia, y su
      consejo sirve para cada creyente: por eso dicen «a las iglesias», en
      plural.<br>
      · Además se leen como <strong>siete etapas</strong> de la historia de la
      iglesia cristiana, desde los apóstoles hasta el fin. Las cuatro de este
      capítulo:`) +
      tbl(['Iglesia', 'Etapa, en la lectura adventista'], [
        ['Éfeso', 'La iglesia del tiempo de los apóstoles'],
        ['Esmirna', 'La iglesia perseguida por el Imperio romano'],
        ['Pérgamo', 'La iglesia que se unió al poder del mundo y dejó entrar errores'],
        ['Tiatira', 'El largo tiempo de la Edad Media, con mucho error y unos pocos fieles perseguidos'],
      ]) +
      hi(`· <strong>La estrella de la mañana</strong> se entiende como Jesús
      mismo, que en 22:16 se llama así.<br>
      · <strong>La segunda muerte</strong> es la muerte final, de la que no se
      resucita (20:14).`) },
  ],

  preguntas: [
    { t: 'mc', v: '2:1', lit: 'Escribe al ángel de la iglesia en Éfeso',
      q: '¿A qué iglesia es la primera de las siete cartas? (Apocalipsis 2:1)',
      o: ['Éfeso', 'Esmirna', 'Laodicea', 'Pérgamo'], a: 0,
      e: '«Escribe al ángel de la iglesia en Éfeso» (2:1).' },
    { t: 'mc', v: '2:1', lit: 'El que tiene las siete estrellas en su diestra',
      q: '¿Cómo se presenta Cristo en la carta a Éfeso? (Apocalipsis 2:1)',
      o: ['El que tiene las siete estrellas en su diestra', 'El que tiene la espada aguda de dos filos', 'El primero y el postrero, que estuvo muerto', 'El que tiene la llave de David y abre'], a: 0,
      e: '«El que tiene las siete estrellas en su diestra, el que camina en medio de los siete candelabros de oro» (2:1).' },
    { t: 'mc', v: '2:1', f: 'c',
      q: 'En la interpretación adventista, ¿qué etapa de la iglesia representa Éfeso?',
      o: ['La iglesia del tiempo de los apóstoles', 'La iglesia del tiempo del fin', 'La iglesia de la Reforma protestante', 'La iglesia de la Edad Media'], a: 0,
      e: 'Interpretación: Éfeso es la primera etapa, la de los apóstoles. El texto solo dice que la carta es para la iglesia en Éfeso (2:1).' },
    { t: 'mc', v: '2:2', lit: 'has probado a los que se dicen ser apóstoles',
      q: '¿A quiénes probó la iglesia de Éfeso y halló mentirosos? (Apocalipsis 2:2)',
      o: ['A los que se dicen ser apóstoles y no lo son', 'A los que dicen ser judíos y no lo son', 'A una mujer que se dice profetisa', 'A los que retienen la doctrina de Balaam'], a: 0,
      e: '«…has probado a los que se dicen ser apóstoles y no lo son, y los has hallado mentirosos» (2:2).' },
    { t: 'tf', v: '2:3',
      q: 'La iglesia de Éfeso trabajó arduamente por amor del nombre de Jesús y no desmayó. (Apocalipsis 2:3)', a: true,
      e: 'Verdadero: «has trabajado arduamente por amor de mi nombre y no has desmayado» (2:3).' },
    { t: 'mc', v: '2:4', lit: 'tengo contra ti que has dejado tu primer amor',
      q: '¿Qué texto dice «Pero tengo contra ti que has dejado tu primer amor»?',
      o: ['Apocalipsis 2:4', 'Apocalipsis 2:14', 'Apocalipsis 2:20', 'Apocalipsis 3:15'], a: 0,
      e: 'Apocalipsis 2:4, en la carta a Éfeso.' },
    { t: 'mc', v: '2:4', lit: 'has dejado tu primer amor',
      q: '¿Qué le reprocha Jesús a la iglesia de Éfeso? (Apocalipsis 2:4)',
      o: ['Que ha dejado su primer amor', 'Que es tibia, ni fría ni caliente', 'Que tolera a la mujer Jezabel', 'Que tiene nombre de que vive'], a: 0,
      e: '«…has dejado tu primer amor» (2:4). Tibia es Laodicea (3:16); Jezabel está en Tiatira (2:20); «nombre de que vives» es Sardis (3:1).' },
    { t: 'fill', v: '2:5', ins: 'Apocalipsis 2:5 (RV1995) — Completa:',
      p: [{ x: '«Recuerda, por tanto, de dónde has caído, ' }, { b: 'arrepiéntete', h: '¿qué debe hacer?' }, { x: ' y haz las primeras ' }, { b: 'obras', h: '¿las primeras qué?' }, { x: '»' }] },
    { t: 'mc', v: '2:5', lit: 'quitaré tu candelabro de su lugar',
      q: '¿Qué haría Jesús si Éfeso no se arrepentía? (Apocalipsis 2:5)',
      o: ['Quitaría su candelabro de su lugar', 'Borraría su nombre del libro de la vida', 'La vomitaría de su boca', 'Vendría sobre ella como ladrón'], a: 0,
      e: '«…pronto vendré a ti y quitaré tu candelabro de su lugar» (2:5). «Vendré sobre ti como ladrón» es de Sardis (3:3), el libro de la vida aparece en la promesa a Sardis (3:5) y «vomitar» es de Laodicea (3:16).' },
    { t: 'tf', v: '2:6',
      q: 'Jesús alaba a Éfeso porque aborrece las obras de los nicolaítas, que él también aborrece. (Apocalipsis 2:6)', a: true,
      e: 'Verdadero: «aborreces las obras de los nicolaítas, las cuales yo también aborrezco» (2:6).' },
    { t: 'mc', v: '2:7', lit: 'Al vencedor le daré a comer del árbol de la vida',
      q: '¿Qué promete Jesús al vencedor de Éfeso? (Apocalipsis 2:7)',
      o: ['Comer del árbol de la vida', 'Comer del maná escondido', 'Recibir la estrella de la mañana', 'Sentarse en el trono de Jesús'], a: 0,
      e: '«Al vencedor le daré a comer del árbol de la vida» (2:7). El maná es de Pérgamo (2:17), la estrella de Tiatira (2:28), el trono de Laodicea (3:21).' },
    { t: 'tf', v: '2:7',
      q: 'Según Apocalipsis 2:7, el árbol de la vida está en medio del templo de Dios.', a: false,
      e: 'Falso: está «en medio del PARAÍSO de Dios» (2:7).' },
    { t: 'mc', v: '2:8', lit: 'el que estuvo muerto y vivió',
      q: '¿Cómo se presenta Cristo en la carta a Esmirna? (Apocalipsis 2:8)',
      o: ['El primero y el postrero, que estuvo muerto y vivió', 'El Hijo de Dios, con ojos como llama de fuego', 'El Amén, el testigo fiel y verdadero', 'El Santo, el Verdadero, que tiene la llave de David'], a: 0,
      e: '«El primero y el postrero, el que estuvo muerto y vivió, dice esto» (2:8).' },
    { t: 'mc', v: '2:9', lit: 'tu pobreza (aunque eres rico)',
      q: 'Según Apocalipsis 2:9, ¿cómo era la iglesia de Esmirna?',
      o: ['Pobre, aunque era rica', 'Rica, aunque era pobre', 'Tibia, ni fría ni caliente', 'Pequeña, con poca fuerza'], a: 0,
      e: '«Yo conozco… tu pobreza (aunque eres rico)» (2:9). Laodicea es al revés: se cree rica y es pobre (3:17).' },
    { t: 'tf', v: '2:9',
      q: 'En la carta a Esmirna, los que dicen ser judíos y no lo son son llamados «trono de Satanás». (Apocalipsis 2:9)', a: false,
      e: 'Falso: son «SINAGOGA de Satanás» (2:9). El trono de Satanás está en Pérgamo (2:13).' },
    { t: 'mc', v: '2:10', lit: 'tendréis tribulación por diez días',
      q: '¿Por cuántos días tendría tribulación la iglesia de Esmirna? (Apocalipsis 2:10)',
      o: ['Diez', 'Siete', 'Cuarenta', 'Tres y medio'], a: 0,
      e: '«…y tendréis tribulación por diez días» (2:10).' },
    { t: 'mc', v: '2:10', lit: 'El diablo echará a algunos de vosotros en la cárcel',
      q: 'Según Apocalipsis 2:10, ¿quién echaría a algunos de Esmirna en la cárcel?',
      o: ['El diablo', 'El rey de Asia', 'Los nicolaítas', 'La mujer Jezabel'], a: 0,
      e: '«El diablo echará a algunos de vosotros en la cárcel para que seáis probados» (2:10).' },
    { t: 'fill', v: '2:10', ins: 'Apocalipsis 2:10 (RV1995) — Completa:',
      p: [{ x: '«¡Sé fiel hasta la ' }, { b: 'muerte', h: '¿hasta cuándo?' }, { x: ' y yo te daré la ' }, { b: 'corona', h: '¿qué le dará?' }, { x: ' de la vida!»' }] },
    { t: 'mc', v: '2:11', lit: 'no sufrirá daño de la segunda muerte',
      q: '¿Qué texto dice «El vencedor no sufrirá daño de la segunda muerte»?',
      o: ['Apocalipsis 2:11', 'Apocalipsis 2:7', 'Apocalipsis 2:17', 'Apocalipsis 3:5'], a: 0,
      e: 'Apocalipsis 2:11, la promesa a Esmirna.' },
    { t: 'mc', v: '2:11', f: 'c',
      q: 'En la lectura adventista, ¿qué es «la segunda muerte» de Apocalipsis 2:11?',
      o: ['La muerte final, de la que no se resucita', 'La muerte de los mártires de Esmirna', 'La cárcel de diez días', 'Un sueño que dura mil años'], a: 0,
      e: 'Interpretación: es la muerte final de los impíos (20:14). El texto de 2:11 solo dice que el vencedor no sufrirá daño de ella.' },
    { t: 'mc', v: '2:12', lit: 'El que tiene la espada aguda de dos filos',
      q: '¿Cómo se presenta Cristo en la carta a Pérgamo? (Apocalipsis 2:12)',
      o: ['El que tiene la espada aguda de dos filos', 'El que tiene los siete espíritus de Dios', 'El que tiene ojos como llama de fuego', 'El que tiene la llave de David'], a: 0,
      e: '«El que tiene la espada aguda de dos filos dice esto» (2:12).' },
    { t: 'mc', v: '2:13', lit: 'donde está el trono de Satanás',
      q: 'Según Apocalipsis 2:13, ¿dónde habitaba la iglesia de Pérgamo?',
      o: ['Donde está el trono de Satanás', 'Donde está la sinagoga de Satanás', 'Junto a la isla llamada Patmos', 'En medio del paraíso de Dios'], a: 0,
      e: '«Yo conozco tus obras y dónde habitas: donde está el trono de Satanás» (2:13).' },
    { t: 'mc', v: '2:13', lit: 'Antipas, mi testigo fiel',
      q: '¿Quién fue el testigo fiel que mataron en Pérgamo? (Apocalipsis 2:13)',
      o: ['Antipas', 'Esteban', 'Timoteo', 'Epafras'], a: 0,
      e: '«…en los días en que Antipas, mi testigo fiel, fue muerto entre vosotros» (2:13).' },
    { t: 'tf', v: '2:14',
      q: 'Según Apocalipsis 2:14, Balac enseñaba a Balaam a poner tropiezo ante los hijos de Israel.', a: false,
      e: 'Falso: es al revés, BALAAM enseñaba a BALAC (2:14).' },
    { t: 'mc', v: '2:14', lit: 'a comer de cosas sacrificadas a los ídolos',
      q: 'Según Apocalipsis 2:14, ¿a qué llevaba la doctrina de Balaam a los hijos de Israel?',
      o: ['A comer de lo sacrificado a los ídolos y fornicar', 'A adorar la imagen de oro del rey', 'A dejar de llevar ofrendas al templo', 'A volver a la tierra de Egipto'], a: 0,
      e: '«…a comer de cosas sacrificadas a los ídolos y a cometer fornicación» (2:14).' },
    { t: 'mc', v: '2:15', lit: 'la doctrina de los nicolaítas',
      q: '¿Qué otra doctrina retenían algunos en Pérgamo? (Apocalipsis 2:15)',
      o: ['La de los nicolaítas', 'La de los fariseos', 'La de los saduceos', 'La de Jezabel'], a: 0,
      e: '«…los que retienen la doctrina de los nicolaítas, la que yo aborrezco» (2:15). Jezabel está en Tiatira (2:20).' },
    { t: 'mc', v: '2:16', lit: 'con la espada de mi boca',
      q: '¿Con qué pelearía Jesús contra ellos si Pérgamo no se arrepentía? (Apocalipsis 2:16)',
      o: ['Con la espada de su boca', 'Con una vara de hierro', 'Con fuego del cielo', 'Con las siete trompetas'], a: 0,
      e: '«…vendré pronto hasta ti y pelearé contra ellos con la espada de mi boca» (2:16).' },
    { t: 'mc', v: '2:17', lit: 'del maná escondido',
      q: '¿Qué promete Jesús al vencedor de Pérgamo? (Apocalipsis 2:17)',
      o: ['El maná escondido y una piedrecita blanca', 'El árbol de la vida y la corona de la vida', 'Autoridad sobre las naciones y una estrella', 'Vestiduras blancas y una columna de oro'], a: 0,
      e: '«Al vencedor le daré de comer del maná escondido, y le daré una piedrecita blanca» (2:17).' },
    { t: 'fill', v: '2:17', ins: 'Apocalipsis 2:17 (RV1995) — Completa:',
      p: [{ x: '«y le daré una ' }, { b: 'piedrecita', h: '¿una qué?' }, { x: ' blanca y en la piedrecita un ' }, { b: 'nombre', h: '¿qué va escrito?' }, { x: ' nuevo escrito»' }] },
    { t: 'tf', v: '2:17',
      q: 'Según Apocalipsis 2:17, el nombre nuevo de la piedrecita lo conoce toda la iglesia.', a: false,
      e: 'Falso: «nadie conoce sino el que lo recibe» (2:17).' },
    { t: 'mc', v: '2:18', lit: 'El Hijo de Dios',
      q: '¿Con qué título empieza Cristo la carta a Tiatira? (Apocalipsis 2:18)',
      o: ['El Hijo de Dios', 'El Hijo del hombre', 'El Amén', 'El Cordero de Dios'], a: 0,
      e: '«El Hijo de Dios, el que tiene ojos como llama de fuego…» (2:18). «El Amén» es en Laodicea (3:14).' },
    { t: 'tf', v: '2:18',
      q: 'En la carta a Tiatira, Cristo tiene ojos como llama de fuego y pies semejantes al bronce pulido. (Apocalipsis 2:18)', a: true,
      e: 'Verdadero (2:18). Son los mismos rasgos de la visión de 1:14-15.' },
    { t: 'mc', v: '2:19', lit: 'tus obras postreras son superiores a las primeras',
      q: '¿Qué alaba Jesús de la iglesia de Tiatira? (Apocalipsis 2:19)',
      o: ['Que sus obras postreras son superiores a las primeras', 'Que probó a los falsos apóstoles', 'Que no negó su fe donde habita Satanás', 'Que guardó la palabra de su paciencia'], a: 0,
      e: '«Yo conozco tus obras, tu amor, tu fe, tu servicio, tu perseverancia y que tus obras postreras son superiores a las primeras» (2:19).' },
    { t: 'mc', v: '2:20', lit: 'esa mujer Jezabel, que se dice profetisa',
      q: '¿Cómo se llama la mujer que se decía profetisa en Tiatira? (Apocalipsis 2:20)',
      o: ['Jezabel', 'Dalila', 'Atalía', 'Herodías'], a: 0,
      e: '«…toleras que esa mujer Jezabel, que se dice profetisa, enseñe y seduzca a mis siervos» (2:20).' },
    { t: 'tf', v: '2:21',
      q: 'Jesús le dio tiempo a Jezabel para que se arrepintiera, pero no quiso arrepentirse. (Apocalipsis 2:21)', a: true,
      e: 'Verdadero: «Yo le he dado tiempo para que se arrepienta, pero no quiere arrepentirse» (2:21).' },
    { t: 'mc', v: '2:22', lit: 'yo la arrojo en cama',
      q: 'Según Apocalipsis 2:22, ¿qué hace Jesús con Jezabel?',
      o: ['La arroja en cama', 'La echa en la cárcel', 'La vomita de su boca', 'Le quita su candelabro'], a: 0,
      e: '«Por tanto, yo la arrojo en cama; y en gran tribulación a los que adulteran con ella» (2:22).' },
    { t: 'mc', v: '2:23', lit: 'yo soy el que escudriña la mente y el corazón',
      q: '¿Qué texto dice «yo soy el que escudriña la mente y el corazón»?',
      o: ['Apocalipsis 2:23', 'Apocalipsis 2:13', 'Apocalipsis 2:19', 'Apocalipsis 3:19'], a: 0,
      e: 'Apocalipsis 2:23, en la carta a Tiatira.' },
    { t: 'tf', v: '2:23',
      q: '«Os daré a cada uno según vuestras obras» está en la carta a Pérgamo.', a: false,
      e: 'Falso: está en la carta a TIATIRA (2:23).' },
    { t: 'mc', v: '2:24', lit: 'las profundidades de Satanás',
      q: 'Según Apocalipsis 2:24, los fieles de Tiatira no han conocido lo que ellos llaman… ¿qué?',
      o: ['Las profundidades de Satanás', 'El trono de Satanás', 'La sinagoga de Satanás', 'Los secretos de Satanás'], a: 0,
      e: '«…no han conocido lo que ellos llaman “las profundidades de Satanás”» (2:24). El trono es de Pérgamo (2:13) y la sinagoga de Esmirna (2:9).' },
    { t: 'mc', v: '2:24', lit: 'No os impongo otra carga',
      q: '¿Qué les dice Jesús a los de Tiatira que no tienen la doctrina de Jezabel? (Apocalipsis 2:24)',
      o: ['«No os impongo otra carga»', '«Sé vigilante y confirma lo que queda»', '«Compra de mí oro refinado»', '«Haz las primeras obras»'], a: 0,
      e: '«…yo os digo: No os impongo otra carga» (2:24).' },
    { t: 'fill', v: '2:25', ins: 'Apocalipsis 2:25 (RV1995) — Completa:',
      p: [{ x: '«pero lo que tenéis, ' }, { b: 'retenedlo', h: '¿qué deben hacer?' }, { x: ' hasta que yo ' }, { b: 'venga', h: '¿hasta cuándo?' }, { x: '.»' }] },
    { t: 'mc', v: '2:26', lit: 'autoridad sobre las naciones',
      q: '¿Qué le dará Jesús al vencedor de Tiatira que guarde sus obras hasta el fin? (Apocalipsis 2:26)',
      o: ['Autoridad sobre las naciones', 'Un lugar en su trono', 'Ser columna en el templo', 'El maná escondido'], a: 0,
      e: '«Al vencedor que guarde mis obras hasta el fin, yo le daré autoridad sobre las naciones» (2:26).' },
    { t: 'fill', v: '2:27', ins: 'Apocalipsis 2:27 (RV1995) — Completa:',
      p: [{ x: '«las regirá con vara de ' }, { b: 'hierro', h: '¿vara de qué?' }, { x: ' y serán quebradas como un vaso de ' }, { b: 'alfarero', h: '¿vaso de quién?' }, { x: '»' }] },
    { t: 'mc', v: '2:28', lit: 'le daré la estrella de la mañana',
      q: '¿Qué estrella promete Jesús al vencedor de Tiatira? (Apocalipsis 2:28)',
      o: ['La estrella de la mañana', 'La estrella de Belén', 'Una de las siete estrellas', 'La estrella llamada Ajenjo'], a: 0,
      e: '«Y le daré la estrella de la mañana» (2:28).' },
    { t: 'mc', v: '2:28', f: 'c',
      q: 'En la lectura adventista, ¿quién es «la estrella de la mañana» de Apocalipsis 2:28?',
      o: ['Jesús mismo', 'El ángel de Tiatira', 'El profeta Juan', 'La iglesia fiel'], a: 0,
      e: 'Interpretación: en 22:16 Jesús se llama «la estrella resplandeciente de la mañana». El texto de 2:28 solo dice que se la dará al vencedor.' },
    { t: 'tf', v: '2:29',
      q: 'En la carta a Tiatira, la frase «El que tiene oído, oiga…» va después de la promesa al vencedor. (Apocalipsis 2:26-29)', a: true,
      e: 'Verdadero: la promesa está en 2:26-28 y la frase cierra la carta en 2:29. En Éfeso, Esmirna y Pérgamo va antes de la promesa.' },
  ],

  tarjetas: [
    { f: 'Las cuatro iglesias del capítulo 2, en orden', r: 'Éfeso, Esmirna, Pérgamo, Tiatira' },
    { f: 'Reproche a Éfeso (2:4)', r: '«has dejado tu primer amor»' },
    { f: 'Promesa a Éfeso (2:7)', r: 'Comer del árbol de la vida, en medio del paraíso de Dios' },
    { f: 'Esmirna: cuánto dura la tribulación y qué consejo recibe (2:10)', r: 'Diez días; «¡Sé fiel hasta la muerte y yo te daré la corona de la vida!»' },
    { f: 'Promesa a Esmirna (2:11)', r: 'No sufrirá daño de la segunda muerte' },
    { f: 'Pérgamo: dónde habita y quién murió (2:13)', r: 'Donde está el trono de Satanás; Antipas, el testigo fiel' },
    { f: 'Las dos doctrinas que reprocha a Pérgamo (2:14-15)', r: 'La de Balaam y la de los nicolaítas' },
    { f: 'Promesa a Pérgamo (2:17)', r: 'El maná escondido y una piedrecita blanca con un nombre nuevo' },
    { f: 'Título de Cristo en la carta a Tiatira (2:18)', r: '«El Hijo de Dios», con ojos como llama de fuego y pies como bronce pulido' },
    { f: 'La falsa profetisa de Tiatira (2:20)', r: 'Jezabel' },
    { f: 'Promesa a Tiatira (2:26-28)', r: 'Autoridad sobre las naciones, regirlas con vara de hierro, y la estrella de la mañana' },
    { f: 'Nicolaítas: ¿qué iglesia los aborrece y cuál los tiene? (2:6, 2:15)', r: 'Éfeso aborrece sus obras; Pérgamo tiene a los que retienen su doctrina' },
    { f: 'Las tres frases con «Satanás» (2:9, 2:13, 2:24)', r: 'Sinagoga (Esmirna), trono (Pérgamo), profundidades (Tiatira)' },
  ],
};
