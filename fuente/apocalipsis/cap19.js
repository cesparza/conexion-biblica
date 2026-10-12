/* Apocalipsis 19 — Las bodas del Cordero y el jinete del caballo blanco.
   Sigue el modelo de cap01.js; se revisa con tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap19', label: 'Apocalipsis 19', sub: 'Las bodas del Cordero y el jinete fiel', vs: 21,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Después de la caída de Babilonia, en el cielo hay fiesta: una gran
      multitud canta <strong>«¡Aleluya!»</strong>, que quiere decir «alaben al
      Señor».<br><br>
      Se anuncia una boda: <strong>las bodas del Cordero</strong>. La esposa
      se viste de <strong>lino fino, limpio y resplandeciente</strong>.<br><br>
      Luego el cielo se abre y aparece Jesús en un <strong>caballo
      blanco</strong>, con muchas coronas, seguido por los ejércitos del cielo.
      En su ropa tiene escrito: <strong>«Rey de reyes y Señor de
      señores»</strong> (19:16). Él vence a la bestia y al falso profeta.<br><br>
      <em>La idea del capítulo: Jesús viene como Rey a llevar a su pueblo a
      la fiesta y a vencer a todos sus enemigos.</em>`) },

    { t: '🎶 Los «¡Aleluya!» del cielo (19:1-5)', capa: 'nucleo', h:
      tbl(['Quién', 'Qué dice'], [
        ['Una gran multitud en el cielo (19:1)', '«¡Aleluya!» <strong>Salvación, honra, gloria y poder</strong> son del Señor'],
        ['La razón (19:2)', '<strong>«sus juicios son verdaderos y justos»</strong>: juzgó a la gran ramera'],
        ['Otra vez (19:3)', '«¡Aleluya!» El humo de ella sube <strong>por los siglos de los siglos</strong>'],
        ['Los 24 ancianos y los 4 seres vivientes (19:4)', 'Se postraron y dijeron: <strong>«¡Amén! ¡Aleluya!»</strong>'],
        ['Una voz del trono (19:5)', '«Alabad a nuestro Dios todos sus siervos… <strong>así pequeños como grandes</strong>»'],
      ]) +
      wa(`Dios <strong>«ha vengado la sangre de sus siervos»</strong> (19:2). Es
      la respuesta a la sangre de los profetas y santos que se halló en
      Babilonia (18:24).`) },

    { t: '💍 Las bodas del Cordero (19:6-8)', capa: 'nucleo', h:
      hi(`La voz de la gran multitud era <strong>como el estruendo de muchas
      aguas</strong> y <strong>como la voz de grandes truenos</strong> (19:6):
      <strong>«¡Aleluya!, porque el Señor, nuestro Dios Todopoderoso,
      reina»</strong> (19:6).<br><br>
      <strong>«Gocémonos, alegrémonos y démosle gloria, porque han llegado las
      bodas del Cordero y su esposa se ha preparado»</strong> (19:7).`) +
      tbl(['El vestido de la esposa (19:8)'], [
        ['<strong>Lino fino, limpio y resplandeciente</strong>'],
        ['«se le ha concedido» vestirse así: es un regalo'],
        ['«El lino fino representa <strong>las acciones justas de los santos</strong>»'],
      ]) +
      wa(`No se confunda con Babilonia, que estaba vestida de <strong>púrpura y
      escarlata</strong> (18:16). La esposa va de <strong>lino fino
      limpio</strong>.`) },

    { t: '✍️ La cena de las bodas (19:9-10)', capa: 'nucleo', h:
      hi(`El ángel le dijo a Juan: <strong>«Escribe: “Bienaventurados los que son
      llamados a la cena de las bodas del Cordero.”»</strong> (19:9). Es la
      <strong>cuarta</strong> de las siete bienaventuranzas del libro.<br><br>
      Juan se postró para adorar al ángel, pero él le dijo: <strong>«¡Mira, no
      lo hagas! Yo soy consiervo tuyo»</strong> (19:10)… <strong>«¡Adora a
      Dios!»</strong><br><br>
      Y el texto explica: <strong>«El testimonio de Jesús es el espíritu de la
      profecía»</strong> (19:10).`) +
      wa(`A Juan le pasa <strong>dos veces</strong>: aquí (19:10) y otra vez en
      22:8-9. Las dos veces el ángel le dice «¡Mira, no lo hagas!» y
      «¡Adora a Dios!». Solo Dios recibe adoración.`) },

    { t: '🐎 El jinete del caballo blanco (19:11-15)', capa: 'nucleo', h:
      hi(`<strong>«Entonces vi el cielo abierto, y había un caballo
      blanco»</strong> (19:11).`) +
      tbl(['Parte', 'Cómo es'], [
        ['Cómo juzga', '<strong>Con justicia</strong> juzga y pelea (19:11)'],
        ['Ojos', 'Como <strong>llama de fuego</strong> (19:12)'],
        ['Cabeza', '<strong>Muchas diademas</strong> (19:12)'],
        ['Ropa', 'Una ropa <strong>teñida en sangre</strong> (19:13)'],
        ['Quién lo sigue', 'Los ejércitos celestiales, de <strong>lino finísimo, blanco y limpio</strong>, en caballos blancos (19:14)'],
        ['Boca', 'Una <strong>espada aguda</strong> para herir a las naciones (19:15)'],
        ['Cómo gobierna', 'Con <strong>vara de hierro</strong> (19:15)'],
        ['Qué pisa', '<strong>El lagar del vino del furor</strong> y de la ira de Dios (19:15)'],
      ]) +
      wa(`Otro caballo blanco sale en el primer sello (6:2): aquel jinete tiene
      un <strong>arco</strong> y una corona. El de 19:11 tiene
      <strong>muchas diademas</strong> y una <strong>espada</strong> en la boca.
      Y el dragón de 12:3 tiene <strong>siete</strong> diademas.`) },

    { t: '🏷️ Los nombres del jinete (19:11-16)', capa: 'nucleo', h:
      tbl(['#', 'Nombre', 'Dónde'], [
        ['1', '<strong>Fiel y Verdadero</strong>', '19:11'],
        ['2', 'Un nombre <strong>que ninguno conocía sino él mismo</strong>', '19:12'],
        ['3', '<strong>La Palabra de Dios</strong>', '19:13'],
        ['4', '<strong>Rey de reyes y Señor de señores</strong>, en su vestidura y en su muslo', '19:16'],
      ]) +
      wa(`Ojo con el orden: en 19:16 dice <strong>«Rey de reyes y Señor de
      señores»</strong>; en 17:14 dice al revés, «Señor de señores y Rey de
      reyes», hablando del Cordero.`) },

    { t: '🦅 La gran cena de Dios (19:17-18)', capa: 'nucleo', h:
      hi(`Juan vio <strong>un ángel que estaba de pie en el sol</strong>, que
      llamó a todas las aves: <strong>«¡Venid y congregaos a la gran cena de
      Dios!»</strong> (19:17). Es para comer carnes de reyes, capitanes,
      fuertes, caballos y jinetes, <strong>libres y esclavos, pequeños y
      grandes</strong> (19:18).`) +
      tbl(['Cena', 'Quiénes'], [
        ['La cena de las <strong>bodas del Cordero</strong> (19:9)', 'Los bienaventurados que son llamados'],
        ['La <strong>gran cena de Dios</strong> (19:17)', 'Las aves, que comen a los enemigos'],
      ]) +
      wa(`Son dos cenas distintas: una es fiesta para los salvados; la otra es
      el final de los que pelean contra el Rey.`) },

    { t: '⚔️ La batalla y el lago de fuego (19:19-21)', capa: 'nucleo', h:
      li([`La bestia, los reyes de la tierra y sus ejércitos se reunieron
           <strong>«para guerrear contra el que montaba el caballo y contra su
           ejército»</strong> (19:19).`,
          `<strong>La bestia fue apresada</strong>, y con ella <strong>el falso
           profeta</strong>, que con señales había engañado a los que
           recibieron <strong>la marca de la bestia</strong> y adoraron su
           imagen (19:20).`,
          `Los dos <strong>«fueron lanzados vivos dentro de un lago de fuego que
           arde con azufre»</strong> (19:20).`,
          `Los demás murieron con <strong>la espada que salía de la boca</strong>
           del jinete, y las aves se saciaron (19:21).`]) +
      wa(`Lo que 19:20 dice del falso profeta (señales delante de la bestia,
      la marca, la imagen) es lo mismo que hace la bestia que sube de la
      tierra en 13:13-16. Al dragón lo lanzan al lago de fuego después,
      en 20:10.`) },

    { t: '🧭 Las bodas del Cordero: qué son y quién es la esposa (19:7-9)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. En la lectura adventista,
      <strong>las bodas</strong> son el momento en que Cristo <strong>recibe su
      reino</strong> de manos del Padre, en el cielo (Daniel 7:13-14). Elena de
      White lo dice así: la boda representa «el acto de ser investido Cristo de la
      dignidad de Rey».<br><br>
      · <strong>La esposa</strong> es la santa ciudad, la nueva Jerusalén, capital
      del reino (21:9-10).<br>
      · <strong>El pueblo de Dios</strong> son los invitados a la cena (19:9):
      «Si son los invitados, no pueden representar también a la esposa».<br>
      · Antes de la boda, el rey revisa que cada invitado lleve el vestido de
      bodas (Mateo 22:11). Eso es el <strong>juicio investigador</strong>: la
      revisión de los casos en el cielo, que empezó en 1844 y termina antes de la
      venida.`) +
      wa(`Bohr lo une así: Jesús recibe el reino (y en ese sentido «se casa» con su
      iglesia completa) en el cielo; después vuelve a la tierra a buscar a los
      suyos y los lleva a la <strong>gran recepción de bodas</strong>. Los fieles
      «entran a las bodas» por la fe, con su nombre en el libro, sin estar allí en
      persona.`) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 350-351; Stephen Bohr, Mateo 24 y las señales del fin, págs. 168 y 170; Stephen Bohr, Lo que Jesús dijo, pág. 233.</p>` },

    { t: '🧭 El lino fino: un regalo que se ve en la vida (19:8)', capa: 'contexto', h:
      hi(`El texto dice que a la esposa <strong>«se le ha concedido»</strong>
      vestirse de lino fino (19:8): es un <strong>regalo</strong>, no algo que se
      gana. Elena de White lo explica: es «la justicia de Cristo, su propio carácter
      sin mancha», que se da por la fe a quien lo recibe como Salvador.<br><br>
      Pero el regalo se nota: el mismo versículo dice que representa «las acciones
      justas de los santos» (19:8).`) +
      li([`<strong>Justificación</strong> (Dios nos declara justos por Cristo) y
           <strong>santificación</strong> (Dios nos cambia la vida) van juntas:
           quien recibe el vestido lo guarda (3:4; 16:15).`,
          `Bohr: cuando termina el juicio y Dios <strong>vindica</strong> a su
           pueblo (lo defiende ante todos), lo viste de lino fino.`,
          `Escuela Sabática 2019: los invitados no reclaman mérito; las acciones
           justas nacen de su unión con Cristo.`]) +
      `<p>Fuentes: notas de Camilo en Evernote, "La segunda venida y el rapto secreto" (cita Palabras de vida del gran Maestro, pág. 252); Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, pág. 249; Escuela Sabática 2019-1T, lección 13, pág. 91.</p>` },

    { t: '🧭 Los «¡Aleluya!»: Dios responde a los mártires (19:1-6)', capa: 'contexto', h:
      hi(`Para Bohr, 19:1-2 es la <strong>respuesta</strong> al clamor de las almas
      debajo del altar en el quinto sello: «¿Hasta cuándo… vas a tardar en juzgar y
      vengar nuestra sangre…?» (6:10). Aquí el cielo canta que Dios «ha vengado la
      sangre de sus siervos» (19:2).<br><br>
      Bohr compara las escenas del trono en el libro:`) +
      tbl(['Capítulo', 'De qué tratan los cantos'], [
        ['Apocalipsis 4', 'Dios como <strong>Creador</strong>'],
        ['Apocalipsis 5', 'Cristo como <strong>Redentor</strong>'],
        ['Apocalipsis 7 y 19', 'La <strong>liberación</strong> del pueblo de Dios en la crisis final; ya está la gran multitud de redimidos'],
      ]) +
      wa(`Elena de White usa el canto de 19:6 («¡Aleluya!, porque el Señor… reina»)
      para el grito de victoria de todo el universo cuando termina el gran
      conflicto.`) +
      `<p>Fuentes: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, págs. 89-90, 253 y 296; Elena de White, El conflicto de los siglos, pág. 539.</p>` },

    { t: '🧭 «El testimonio de Jesús es el espíritu de la profecía» (19:10)', capa: 'contexto', h:
      hi(`Bohr lee 19:10 junto con 22:9. En 19:10 el ángel es consiervo de Juan «y de
      tus hermanos que mantienen el testimonio de Jesús» (19:10); en 22:9 dice «de
      tus hermanos los profetas». Los que tienen el testimonio de Jesús son los
      <strong>profetas</strong>: el testimonio de Jesús es el <strong>don de
      profecía</strong>.<br><br>
      · En 12:17, el pueblo de Dios del tiempo del fin «tiene el testimonio de
      Jesucristo»: según Bohr, tendrá «el verdadero don profético». La iglesia
      adventista lo ve en el ministerio de Elena G. de White, que se llamó a sí
      misma «mensajera del Señor».<br>
      · Bohr: la Biblia y los escritos de Elena de White son
      <strong>luz menor</strong> que lleva a la luz mayor, que es Jesús.<br>
      · El <strong>falso profeta</strong> de 19:20 imita ese don: habla como si
      viniera de Dios.<br>
      · La prueba de un profeta es la Palabra: «¡A la ley y al testimonio!»
      (Isaías 8:20).`) +
      wa(`El ángel no acepta adoración (19:10; 22:9). Ni el ángel ni el profeta toman
      el lugar de Dios.`) +
      `<p>Fuentes: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 179 y 186-188; Stephen Bohr, ¿Cuán cerca al fin?, pág. 158; notas de Camilo en Evernote, "LUZ MAYOR Y LUZ MENOR" y "El verdadero profeta".</p>` },

    { t: '🧭 El jinete del caballo blanco: Jesús viene como Rey (19:11-16)', capa: 'contexto', h:
      hi(`En la lectura adventista, el jinete es <strong>Cristo en su segunda
      venida</strong>. Elena de White describe esa venida con estos mismos
      versículos (19:11, 14 y 16): primero se ve una nube pequeña y oscura que crece
      hasta ser una gran nube blanca; Jesús viene «como un gran conquistador»,
      rodeado de una multitud de ángeles.`) +
      tbl(['', 'Primer sello (6:2)', 'Apocalipsis 19:11-12'], [
        ['Caballo', 'Blanco', 'Blanco'],
        ['Corona', '«una corona»: en griego <em>stéfanos</em>, la corona del <strong>vencedor</strong>', '«muchas diademas»: <em>diadémata</em>, coronas de <strong>rey</strong>'],
        ['Qué hace', 'Sale venciendo: el evangelio avanza', 'Juzga y pelea: la batalla final'],
      ]) +
      hi(`Bohr: «La corona del vencedor ha llegado a ser la corona del rey». Es una
      guerra <strong>literal</strong> al final de la historia: cuando los poderes de
      la tierra decreten la muerte del pueblo de Dios, Jesús mismo saldrá a
      defenderlo.`) +
      `<p>Fuentes: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, págs. 173-174; Elena de White, El conflicto de los siglos, pág. 515; Escuela Sabática 2019-1T, lección 13, pág. 92.</p>` },

    { t: '🧭 Una venida visible, no un rapto secreto', capa: 'contexto', h:
      hi(`Muchos expositores evangélicos enseñan un <strong>rapto secreto</strong>
      (la iglesia sube al cielo sin que el mundo vea a Jesús) y, siete años
      después, un regreso de Jesús para reinar mil años en la tierra. La lectura
      adventista es otra:`) +
      li([`Jesús viene una sola vez más, <strong>visible</strong> para todos
           (1:7; Mateo 24:30).`,
          `Los escogidos <strong>pasan por la tribulación</strong> y son reunidos
           en la venida «de los cuatro vientos» (Mateo 24:31). Bohr: si ya
           estuvieran en el cielo, no habría que reunirlos.`,
          `En la venida, los santos suben a recibir a Jesús «en el aire»
           (1 Tesalonicenses 4:17). Bohr: sus pies no tocan la tierra.`,
          `Bohr advierte: quien espera a un Cristo que reine en la tierra queda
           expuesto a la imitación de la venida que hará Satanás.`]) +
      wa(`Se habla de enseñanzas, no de personas: muchos creyentes sinceros esperan
      el rapto secreto.`) +
      `<p>Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 81; Stephen Bohr, Mateo 24 y las señales del fin, pág. 107; notas de Camilo en Evernote, "CRONOLOGÍA ESCATOLÓGICA ADVENTISTA — CONSOLIDADO FINAL".</p>` },

    { t: '🧭 La espada de su boca y las dos cenas (19:15-21)', capa: 'contexto', h:
      hi(`La única arma del jinete es la <strong>espada que sale de su boca</strong>.
      Elena de White: en la venida, los impíos son «consumidos por el espíritu de su
      boca y destruídos por el resplandor de su gloria» (2 Tesalonicenses 2:8). Y en
      otro lugar: «La luz de la gloria de Dios, que imparte vida a los justos, matará
      a los impíos».`) +
      li([`<strong>Las dos cenas</strong> (19:9 y 19:17): la Escuela Sabática lo
           resume así: «En una cena tú comes, en la otra te comen a ti».`,
          `Bohr: los grupos de 19:18 (reyes, capitanes, libres y esclavos) son los
           mismos que se esconden en el sexto sello (6:15-16).`,
          `Isaías 24:21-22 anuncia que Dios castigará «al ejército de los cielos» y
           «a los reyes de la tierra». Bohr: los reyes caen en 19:19-21, y el
           ejército de los cielos (Satanás y sus ángeles) queda preso en 20:1-3,
           para ser castigado «después de muchos días»: los mil años.`]) +
      wa(`Con la batalla de 19:19-21 empiezan los <strong>mil años</strong> de
      Apocalipsis 20. Qué es el lago de fuego de 19:20 se explica allí.`) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, pág. 527; Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 95 (cita El Deseado de todas las gentes, págs. 82-83); Escuela Sabática 2019-1T, lección 13, pág. 92; Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, págs. 96-97 y 296.</p>` },
  ],

  preguntas: [
    { t: 'mc', v: '19:1', lit: 'como de una gran multitud en el cielo',
      q: '¿De quién era la gran voz que Juan oyó al principio de Apocalipsis 19?',
      o: ['Como de una gran multitud en el cielo', 'De los siete ángeles con las trompetas', 'De un águila que volaba en medio del cielo', 'De los mártires debajo del altar'], a: 0,
      e: '«Después de esto oí una gran voz, como de una gran multitud en el cielo» (19:1).' },
    { t: 'mc', v: '19:1', lit: 'Salvación, honra, gloria y poder',
      q: 'Según Apocalipsis 19:1, ¿qué cuatro cosas son del Señor Dios nuestro?',
      o: ['Salvación, honra, gloria y poder', 'Sabiduría, riqueza, fuerza y gracia', 'Paz, amor, gozo y esperanza', 'Justicia, verdad, luz y vida'], a: 0,
      e: '«¡Aleluya! Salvación, honra, gloria y poder son del Señor Dios nuestro» (19:1).' },
    { t: 'mc', v: '19:2', lit: 'sus juicios son verdaderos y justos',
      q: '¿Qué texto dice «sus juicios son verdaderos y justos, pues ha juzgado a la gran ramera»?',
      o: ['Apocalipsis 19:2', 'Apocalipsis 19:11', 'Apocalipsis 18:20', 'Apocalipsis 19:6'], a: 0,
      e: 'Apocalipsis 19:2. En 16:7 se oye algo parecido desde el altar: «tus juicios son verdaderos y justos».' },
    { t: 'tf', v: '19:2',
      q: 'Según Apocalipsis 19:2, Dios ha juzgado a la gran ramera que corrompía la tierra con su fornicación.', a: true,
      e: 'Verdadero (Apocalipsis 19:2).' },
    { t: 'mc', v: '19:3', lit: 'El humo de ella ha de subir por los siglos de los siglos',
      q: 'Según Apocalipsis 19:3, ¿hasta cuándo ha de subir el humo de ella?',
      o: ['Por los siglos de los siglos', 'Por siete días y siete noches', 'Por mil años', 'Hasta la caída de la tarde'], a: 0,
      e: '«¡Aleluya! El humo de ella ha de subir por los siglos de los siglos» (19:3).' },
    { t: 'mc', v: '19:4', lit: 'los veinticuatro ancianos y los cuatro seres vivientes',
      q: '¿Quiénes se postraron y dijeron «¡Amén! ¡Aleluya!»? (Apocalipsis 19:4)',
      o: ['Los veinticuatro ancianos y los cuatro seres vivientes', 'Los ciento cuarenta y cuatro mil y los ángeles', 'Los siete ángeles y los mártires del altar', 'Los reyes de la tierra y sus ejércitos'], a: 0,
      e: '«Entonces los veinticuatro ancianos y los cuatro seres vivientes se postraron en tierra y adoraron a Dios» (19:4).' },
    { t: 'tf', v: '19:4',
      q: 'Según Apocalipsis 19:4, los ancianos que se postraron ante el trono eran doce.', a: false,
      e: 'Falso: eran los VEINTICUATRO ancianos, con los cuatro seres vivientes (19:4).' },
    { t: 'mc', v: '19:5', lit: 'así pequeños como grandes',
      q: 'Según Apocalipsis 19:5, ¿a quiénes llama a alabar la voz que salió del trono?',
      o: ['A todos sus siervos, pequeños y grandes', 'Solo a los ancianos que rodean el trono', 'Solo a los reyes y sacerdotes de Dios', 'Solo a los que vencieron a la bestia'], a: 0,
      e: '«Alabad a nuestro Dios todos sus siervos, y los que lo teméis, así pequeños como grandes» (19:5).' },
    { t: 'mc', v: '19:6', lit: 'el Señor, nuestro Dios Todopoderoso, reina',
      q: 'Según Apocalipsis 19:6, ¿por qué dice «¡Aleluya!» la gran multitud?',
      o: ['Porque el Señor, nuestro Dios Todopoderoso, reina', 'Porque la bestia fue lanzada al lago de fuego', 'Porque se abrió el templo de Dios en el cielo', 'Porque el dragón fue atado por mil años'], a: 0,
      e: '«¡Aleluya!, porque el Señor, nuestro Dios Todopoderoso, reina» (19:6).' },
    { t: 'tf', v: '19:6',
      q: 'La voz de la gran multitud de Apocalipsis 19:6 era como el estruendo de muchas aguas y como la voz de grandes truenos.', a: true,
      e: 'Verdadero (Apocalipsis 19:6).' },
    { t: 'mc', v: '19:7', lit: 'han llegado las bodas del Cordero',
      q: '¿Qué texto dice «han llegado las bodas del Cordero y su esposa se ha preparado»?',
      o: ['Apocalipsis 19:7', 'Apocalipsis 19:9', 'Apocalipsis 21:2', 'Apocalipsis 21:9'], a: 0,
      e: 'Apocalipsis 19:7. En 19:9 está la bienaventuranza de los llamados a la cena de las bodas.' },
    { t: 'fill', v: '19:7', ins: 'Apocalipsis 19:7 (RV1995) — Completa:',
      p: [{ x: '«Gocémonos, alegrémonos y démosle gloria, porque han llegado las ' }, { b: 'bodas', h: '¿qué llegó?' }, { x: ' del ' }, { b: 'Cordero', h: '¿de quién?' }, { x: ' y su ' }, { b: 'esposa', h: '¿quién se preparó?' }, { x: ' se ha preparado.' }] },
    { t: 'mc', v: '19:8', lit: 'lino fino, limpio y resplandeciente',
      q: 'Según Apocalipsis 19:8, ¿de qué se le concedió vestirse a la esposa?',
      o: ['De lino fino, limpio y resplandeciente', 'De púrpura y escarlata, con perlas', 'De ropas lavadas y blanqueadas', 'Del sol, con corona de doce estrellas'], a: 0,
      e: '«…se le ha concedido que se vista de lino fino, limpio y resplandeciente» (19:8).' },
    { t: 'mc', v: '19:8', lit: 'El lino fino representa las acciones justas de los santos',
      q: 'Según Apocalipsis 19:8, ¿qué representa el lino fino?',
      o: ['Las acciones justas de los santos', 'Las oraciones de los santos', 'La sangre de los mártires', 'Las palabras de los profetas'], a: 0,
      e: '«El lino fino representa las acciones justas de los santos» (19:8). Las oraciones de los santos son el incienso de 5:8.' },
    { t: 'mc', v: '19:9', lit: 'Bienaventurados los que son llamados a la cena de las bodas del Cordero',
      q: 'Según Apocalipsis 19:9, ¿quiénes son bienaventurados?',
      o: ['Los llamados a la cena de las bodas del Cordero', 'Los muertos que mueren en el Señor', 'Los que lavan sus ropas en la ciudad', 'Los que velan y guardan sus vestiduras'], a: 0,
      e: '«Bienaventurados los que son llamados a la cena de las bodas del Cordero» (19:9). Las otras son de 14:13, 22:14 y 16:15.' },
    { t: 'fill', v: '19:9', ins: 'Apocalipsis 19:9 (RV1995) — Completa:',
      p: [{ x: '«Bienaventurados los que son llamados a la ' }, { b: 'cena', h: '¿a qué?' }, { x: ' de las ' }, { b: 'bodas', h: '¿de qué?' }, { x: ' del Cordero.»' }] },
    { t: 'mc', v: '19:10', lit: 'Yo soy consiervo tuyo',
      q: '¿Qué le dijo el ángel a Juan cuando este se postró para adorarlo? (Apocalipsis 19:10)',
      o: ['«¡Mira, no lo hagas! Yo soy consiervo tuyo»', '«Levántate, tus pecados son perdonados»', '«Escribe en un libro lo que has visto»', '«Sube acá y te mostraré las cosas»'], a: 0,
      e: '«¡Mira, no lo hagas! Yo soy consiervo tuyo… ¡Adora a Dios!» (19:10). Lo mismo pasa en 22:8-9.' },
    { t: 'mc', v: '19:10', lit: 'El testimonio de Jesús es el espíritu de la profecía',
      q: '¿Qué texto dice «El testimonio de Jesús es el espíritu de la profecía»?',
      o: ['Apocalipsis 19:10', 'Apocalipsis 12:17', 'Apocalipsis 22:9', 'Apocalipsis 1:2'], a: 0,
      e: 'Apocalipsis 19:10. En 12:17 se habla de los que «tienen el testimonio de Jesucristo».' },
    { t: 'tf', v: '19:10',
      q: 'En Apocalipsis 19:10, el ángel dejó que Juan lo adorara.', a: false,
      e: 'Falso: le dijo «¡Mira, no lo hagas!… ¡Adora a Dios!» (19:10).' },
    { t: 'mc', v: '19:11', lit: 'se llamaba Fiel y Verdadero',
      q: '¿Cómo se llamaba el que montaba el caballo blanco, según Apocalipsis 19:11?',
      o: ['Fiel y Verdadero', 'Santo y Justo', 'Admirable y Consejero', 'Príncipe de paz'], a: 0,
      e: '«El que lo montaba se llamaba Fiel y Verdadero» (19:11).' },
    { t: 'mc', v: '19:11', lit: 'con justicia juzga y pelea',
      q: 'Según Apocalipsis 19:11, ¿cómo juzga y pelea el jinete del caballo blanco?',
      o: ['Con justicia', 'Con ira', 'Con fuego', 'Con astucia'], a: 0,
      e: '«…y con justicia juzga y pelea» (19:11).' },
    { t: 'tf', v: '19:11',
      q: 'En Apocalipsis 19:11, Juan vio el cielo abierto y un caballo rojo.', a: false,
      e: 'Falso: «vi el cielo abierto, y había un caballo BLANCO» (19:11). El caballo rojizo es el del segundo sello (6:4).' },
    { t: 'mc', v: '19:12', lit: 'en su cabeza tenía muchas diademas',
      q: '¿Qué tenía en su cabeza el jinete del caballo blanco? (Apocalipsis 19:12)',
      o: ['Muchas diademas', 'Siete diademas', 'Una corona de oro', 'Diez cuernos'], a: 0,
      e: '«…en su cabeza tenía muchas diademas» (19:12). El dragón tiene siete diademas (12:3); la corona de oro es la de 14:14.' },
    { t: 'mc', v: '19:12', lit: 'un nombre que ninguno conocía sino él mismo',
      q: 'Según Apocalipsis 19:12, ¿qué nombre tenía escrito el jinete?',
      o: ['Uno que ninguno conocía sino él mismo', 'El nombre de su Padre en la frente', 'El nombre de la nueva Jerusalén', 'Los nombres de las doce tribus'], a: 0,
      e: '«…y tenía escrito un nombre que ninguno conocía sino él mismo» (19:12).' },
    { t: 'mc', v: '19:13', lit: 'su nombre es: La Palabra de Dios',
      q: 'Según Apocalipsis 19:13, ¿cuál es el nombre del jinete?',
      o: ['La Palabra de Dios', 'El Hijo del Altísimo', 'El León de Judá', 'El Lucero de la mañana'], a: 0,
      e: '«…y su nombre es: La Palabra de Dios» (19:13).' },
    { t: 'fill', v: '19:13', ins: 'Apocalipsis 19:13 (RV1995) — Completa:',
      p: [{ x: '«Estaba vestido de una ropa teñida en ' }, { b: 'sangre', h: '¿teñida en qué?' }, { x: ' y su nombre es: La ' }, { b: 'Palabra', h: '¿la qué?' }, { x: ' de Dios.»' }] },
    { t: 'tf', v: '19:13',
      q: 'Según Apocalipsis 19:13, el jinete estaba vestido de una ropa blanca y resplandeciente.', a: false,
      e: 'Falso: estaba vestido de una ropa TEÑIDA EN SANGRE (19:13).' },
    { t: 'mc', v: '19:14', lit: 'lino finísimo, blanco y limpio',
      q: '¿Cómo iban vestidos los ejércitos celestiales que lo seguían? (Apocalipsis 19:14)',
      o: ['De lino finísimo, blanco y limpio', 'Con corazas de fuego, zafiro y azufre', 'De púrpura y escarlata, con oro', 'Con ropas ásperas, como los testigos'], a: 0,
      e: '«Los ejércitos celestiales, vestidos de lino finísimo, blanco y limpio, lo seguían en caballos blancos» (19:14).' },
    { t: 'tf', v: '19:14',
      q: 'Los ejércitos celestiales seguían al jinete en caballos blancos. (Apocalipsis 19:14)', a: true,
      e: 'Verdadero (Apocalipsis 19:14).' },
    { t: 'mc', v: '19:15', lit: 'las regirá con vara de hierro',
      q: 'Según Apocalipsis 19:15, ¿con qué regirá el jinete a las naciones?',
      o: ['Con vara de hierro', 'Con cetro de oro', 'Con caña de medir', 'Con cayado de pastor'], a: 0,
      e: '«…y él las regirá con vara de hierro» (19:15). La misma vara está en 2:27 y 12:5.' },
    { t: 'mc', v: '19:15', lit: 'pisa el lagar del vino del furor',
      q: '¿Qué pisa el jinete del caballo blanco, según Apocalipsis 19:15?',
      o: ['El lagar del vino del furor de Dios', 'La cabeza de la serpiente antigua', 'Las aguas del gran río Éufrates', 'La ciudad santa por cuarenta y dos meses'], a: 0,
      e: '«Él pisa el lagar del vino del furor y de la ira del Dios Todopoderoso» (19:15).' },
    { t: 'mc', v: '19:16', lit: 'Rey de reyes y Señor de señores',
      q: '¿Qué nombre tiene escrito el jinete en su vestidura y en su muslo? (Apocalipsis 19:16)',
      o: ['Rey de reyes y Señor de señores', 'El Cordero que fue inmolado', 'Santo, santo, santo', 'El Alfa y la Omega'], a: 0,
      e: '«En su vestidura y en su muslo tiene escrito este nombre: Rey de reyes y Señor de señores» (19:16).' },
    { t: 'tf', v: '19:16',
      q: 'En Apocalipsis 19:16 el nombre escrito en su vestidura dice «Señor de señores y Rey de reyes».', a: false,
      e: 'Falso: en 19:16 el orden es «Rey de reyes y Señor de señores». Al revés lo dice 17:14, del Cordero.' },
    { t: 'fill', v: '19:16', ins: 'Apocalipsis 19:16 (RV1995) — Completa:',
      p: [{ x: '«En su vestidura y en su ' }, { b: 'muslo', h: '¿dónde más?' }, { x: ' tiene escrito este nombre: Rey de ' }, { b: 'reyes', h: '¿rey de quiénes?' }, { x: ' y Señor de señores.»' }] },
    { t: 'mc', v: '19:17', lit: 'estaba de pie en el sol',
      q: '¿Dónde estaba de pie el ángel que llamó a las aves? (Apocalipsis 19:17)',
      o: ['En el sol', 'Sobre el mar y la tierra', 'Junto al altar de oro', 'Sobre una nube blanca'], a: 0,
      e: '«Vi un ángel que estaba de pie en el sol» (19:17). El que pone un pie en el mar y otro en la tierra es el de 10:2.' },
    { t: 'mc', v: '19:17', lit: 'la gran cena de Dios',
      q: 'Según Apocalipsis 19:17, ¿a qué llamó el ángel a las aves que vuelan en medio del cielo?',
      o: ['A la gran cena de Dios', 'A la cena de las bodas del Cordero', 'A la fiesta de los tabernáculos', 'Al monte de Sión con el Cordero'], a: 0,
      e: '«¡Venid y congregaos a la gran cena de Dios!» (19:17). La cena de las bodas del Cordero (19:9) es para los bienaventurados.' },
    { t: 'tf', v: '19:18',
      q: 'Según Apocalipsis 19:18, en la gran cena de Dios hay carnes de reyes, de capitanes y de caballos con sus jinetes.', a: true,
      e: 'Verdadero: «carnes de reyes y capitanes… carnes de caballos y de sus jinetes» (19:18).' },
    { t: 'mc', v: '19:19', lit: 'reunidos para guerrear contra el que montaba el caballo',
      q: 'Según Apocalipsis 19:19, ¿para qué estaban reunidos la bestia y los reyes de la tierra?',
      o: ['Para guerrear contra el que montaba el caballo', 'Para reconstruir la gran ciudad Babilonia', 'Para adorar a Dios que está en el trono', 'Para llorar por la gran ciudad caída'], a: 0,
      e: '«Vi a la bestia y a los reyes de la tierra y sus ejércitos, reunidos para guerrear contra el que montaba el caballo y contra su ejército» (19:19).' },
    { t: 'mc', v: '19:20', lit: 'el falso profeta',
      q: '¿Quién fue apresado junto con la bestia, según Apocalipsis 19:20?',
      o: ['El falso profeta', 'El dragón', 'La gran ramera', 'El ángel del abismo'], a: 0,
      e: '«La bestia fue apresada, y con ella el falso profeta» (19:20). Al dragón lo lanzan al lago de fuego en 20:10.' },
    { t: 'mc', v: '19:20', lit: 'lanzados vivos dentro de un lago de fuego que arde con azufre',
      q: '¿Qué pasó con la bestia y el falso profeta, según Apocalipsis 19:20?',
      o: ['Fueron lanzados vivos a un lago de fuego con azufre', 'Fueron atados con una gran cadena por mil años', 'Huyeron a los montes y se escondieron en cuevas', 'Fueron perdonados y llevados a la ciudad santa'], a: 0,
      e: '«Estos dos fueron lanzados vivos dentro de un lago de fuego que arde con azufre» (19:20).' },
    { t: 'tf', v: '19:20',
      q: 'Según Apocalipsis 19:20, el falso profeta engañó con señales a los que recibieron la marca de la bestia y adoraron su imagen.', a: true,
      e: 'Verdadero (Apocalipsis 19:20).' },
    { t: 'mc', v: '19:21', lit: 'muertos con la espada que salía de la boca',
      q: 'Según Apocalipsis 19:21, ¿cómo murieron los demás que pelearon contra el jinete?',
      o: ['Con la espada que salía de su boca', 'Con fuego que descendió del cielo', 'Con un enorme granizo del cielo', 'Con la hoz aguda de un ángel'], a: 0,
      e: '«Los demás fueron muertos con la espada que salía de la boca del que montaba el caballo» (19:21). El fuego del cielo es de 20:9.' },
    // ── Interpretación (f:'c'): no es texto del capítulo; cada una dice su fuente ──
    { t: 'mc', v: '19:7', f: 'c',
      q: 'Según Elena de White, ¿qué representan «las bodas» del Cordero?',
      o: ['Que Cristo recibe su reino como Rey', 'Que Jesús baja visible a la tierra', 'Que el alma se une a Dios al morir', 'Que la iglesia sube en un rapto secreto'], a: 0,
      e: 'La boda representa «el acto de ser investido Cristo de la dignidad de Rey»: recibe el reino del Padre (Daniel 7:13-14). El texto solo dice que «han llegado las bodas del Cordero» (19:7). Fuente: Elena de White, El conflicto de los siglos, pág. 350.' },
    { t: 'mc', v: '19:7', f: 'c',
      q: 'Según Elena de White, ¿quién es la esposa del Cordero?',
      o: ['La nueva Jerusalén, capital del reino', 'Los veinticuatro ancianos del trono', 'Los ángeles que no cayeron', 'La gran multitud de Apocalipsis 7'], a: 0,
      e: 'La esposa es la santa ciudad, que representa el reino; lo confirma 21:9-10, donde el ángel le muestra a Juan «la esposa del Cordero» y le enseña la ciudad. Fuente: Elena de White, El conflicto de los siglos, págs. 350-351.' },
    { t: 'tf', v: '19:9', f: 'c',
      q: 'Según Elena de White, los llamados a la cena de las bodas (19:9) son el pueblo de Dios, y por eso no pueden ser también la esposa.', a: true,
      e: 'Verdadero: «Si son los invitados, no pueden representar también a la esposa». Fuente: Elena de White, El conflicto de los siglos, pág. 351.' },
    { t: 'mc', v: '19:7', f: 'c',
      q: 'Según Bohr, ¿dónde y cuándo se celebran las bodas del Cordero?',
      o: ['En el cielo, antes de que Jesús vuelva', 'En la tierra, al comenzar los mil años', 'En Jerusalén, en un templo reconstruido', 'En la tierra nueva, al final de todo'], a: 0,
      e: 'Jesús recibe el reino ante el Padre en el cielo y luego vuelve a buscar a los suyos para la «gran recepción de bodas». Fuentes: Stephen Bohr, Mateo 24 y las señales del fin, pág. 170; Stephen Bohr, Lo que Jesús dijo, pág. 233.' },
    { t: 'mc', v: '19:8', f: 'c',
      q: 'Según Elena de White, ¿qué es el lino fino que se le concede a la esposa (Apocalipsis 19:8)?',
      o: ['La justicia de Cristo, dada por la fe', 'El premio por las obras de cada uno', 'Un vestido que la esposa tejió sola', 'El manto de los reyes de la tierra'], a: 0,
      e: 'Es «la justicia de Cristo, su propio carácter sin mancha», que se da por la fe y se ve en «las acciones justas de los santos» (19:8). Fuente: notas de Camilo en Evernote, "La segunda venida y el rapto secreto" (cita Palabras de vida del gran Maestro, pág. 252).' },
    { t: 'tf', v: '19:8', f: 'c',
      q: 'Según Bohr, Dios viste a su iglesia de lino fino cuando termina el juicio y él la vindica ante todos.', a: true,
      e: 'Verdadero: «Cuando concluya el proceso del juicio y Dios haya vindicado a su pueblo», la vestirá de lino fino (19:6-8). Fuente: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, pág. 249.' },
    { t: 'mc', v: '19:2', f: 'c',
      q: 'Según Bohr, ¿a qué clamor responden los «¡Aleluya!» de Apocalipsis 19:1-2?',
      o: ['Al de las almas debajo del altar', 'Al de los reyes que lloran a Babilonia', 'Al de los cuatro seres vivientes', 'Al de los siete ángeles con trompetas'], a: 0,
      e: 'Las almas del quinto sello preguntan «¿Hasta cuándo…?» (6:10); en 19:2 Dios ya «ha vengado la sangre de sus siervos». Fuente: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, pág. 253.' },
    { t: 'mc', v: '19:6', f: 'c',
      q: 'Según Bohr, ¿qué celebran los cantos de Apocalipsis 7 y 19, a diferencia de los de los capítulos 4 y 5?',
      o: ['La liberación del pueblo en la crisis final', 'A Dios como Creador de todas las cosas', 'A Cristo como Redentor en la cruz', 'La caída de Lucifer y sus ángeles'], a: 0,
      e: 'En el capítulo 4 se alaba al Creador, en el 5 al Redentor, y en 7 y 19 la liberación del pueblo de Dios; en 19 ya canta la multitud de redimidos. Fuente: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, págs. 89-90.' },
    { t: 'mc', v: '19:10', f: 'c',
      q: 'Según Bohr, ¿qué es «el testimonio de Jesús» que tendrá el pueblo de Dios del tiempo del fin (12:17; 19:10)?',
      o: ['El verdadero don profético', 'El poder de hacer milagros', 'El relato de su propia conversión', 'La sabiduría de los filósofos'], a: 0,
      e: 'El testimonio de Jesús es «el verdadero don profético» del remanente; la iglesia adventista lo ve en el ministerio de Elena G. de White. Fuentes: Stephen Bohr, ¿Cuán cerca al fin?, pág. 158; Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 188.' },
    { t: 'mc', v: '19:10', f: 'c',
      q: 'Según Bohr, ¿qué versículo muestra que los hermanos que «mantienen el testimonio de Jesús» (19:10) son los profetas?',
      o: ['Apocalipsis 22:9', 'Apocalipsis 12:17', 'Apocalipsis 1:2', 'Apocalipsis 6:9'], a: 0,
      e: 'En 22:9 el mismo ángel dice «de tus hermanos los profetas». Por eso el testimonio de Jesús es el don de profecía. Fuente: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 179.' },
    { t: 'mc', v: '19:10', f: 'c',
      q: 'Según Bohr, ¿quién es la «luz mayor» a la que llevan la Biblia y los escritos de Elena de White?',
      o: ['Jesucristo', 'La ley de Dios', 'La iglesia', 'El Espíritu de profecía'], a: 0,
      e: 'Para Bohr, tanto la Biblia como los escritos de Elena de White son luz menor que apunta a Jesús. Fuentes: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 188; notas de Camilo en Evernote, "LUZ MAYOR Y LUZ MENOR".' },
    { t: 'mc', v: '19:11', f: 'c',
      q: 'En la interpretación adventista, ¿quién es el jinete del caballo blanco de Apocalipsis 19?',
      o: ['Jesús en su segunda venida', 'Un emperador romano conquistador', 'El jinete del primer sello', 'El falso profeta con sus señales'], a: 0,
      e: 'Elena de White describe la segunda venida con 19:11, 14 y 16. El texto lo llama «La Palabra de Dios» (19:13) y «Rey de reyes y Señor de señores» (19:16). Fuentes: Elena de White, El conflicto de los siglos, pág. 515; Escuela Sabática 2019-1T, lección 13, pág. 92.' },
    { t: 'mc', v: '19:12', f: 'c',
      q: 'Según Bohr, ¿qué cambio muestra la corona del jinete de 19:12 frente a la del primer sello (6:2)?',
      o: ['De corona de vencedor a corona de rey', 'De corona de rey a corona de vencedor', 'De corona de espinas a corona de oro', 'De corona de sacerdote a una de juez'], a: 0,
      e: 'En 6:2 recibe un stéfanos (corona del vencedor); en 19:12 lleva diadémata (coronas de rey): «La corona del vencedor ha llegado a ser la corona del rey». Fuente: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, pág. 174.' },
    { t: 'mc', v: '19:14', f: 'c',
      q: 'Según Elena de White, ¿quiénes acompañan a Jesús en el descenso de su segunda venida?',
      o: ['Una multitud innumerable de ángeles', 'Los redimidos que ya estaban en el cielo', 'Los ciento cuarenta y cuatro mil', 'Los veinticuatro ancianos del trono'], a: 0,
      e: 'Los santos ángeles, «en inmensa e innumerable muchedumbre», lo acompañan; el texto habla de «los ejércitos celestiales» (19:14). Fuente: Elena de White, El conflicto de los siglos, pág. 515.' },
    { t: 'tf', v: '19:11', f: 'c',
      q: 'Según Bohr, los escogidos son llevados al cielo en un rapto secreto antes de la tribulación.', a: false,
      e: 'Falso: para Bohr los escogidos pasan por la tribulación y son reunidos en la venida visible «de los cuatro vientos» (Mateo 24:31). Fuente: Stephen Bohr, Mateo 24 y las señales del fin, pág. 107.' },
    { t: 'mc', v: '19:15', f: 'c',
      q: 'Según Elena de White, ¿cómo son destruidos los impíos que viven cuando Jesús viene?',
      o: ['Por el resplandor de su gloria', 'Por un ejército de santos armados', 'Por un diluvio de agua, como en Noé', 'Por el fuego que cae tras los mil años'], a: 0,
      e: 'Son «consumidos por el espíritu de su boca y destruídos por el resplandor de su gloria». El fuego del cielo de 20:9 es el de después de los mil años. Fuente: Elena de White, El conflicto de los siglos, pág. 527.' },
    { t: 'tf', v: '19:17', f: 'c',
      q: 'En la interpretación adventista, la cena de las bodas (19:9) y la gran cena de Dios (19:17) son la misma fiesta vista desde dos lados.', a: false,
      e: 'Falso: son dos cenas opuestas. La Escuela Sabática lo resume: «En una cena tú comes, en la otra te comen a ti». Fuente: Escuela Sabática 2019-1T, lección 13, pág. 92.' },
    { t: 'mc', v: '19:19', f: 'c',
      q: 'Según Bohr, ¿quiénes son «el ejército de los cielos» que Dios castiga junto con los reyes de la tierra (Isaías 24:21)?',
      o: ['Satanás y sus ángeles', 'Los ángeles fieles a Dios', 'El sol, la luna y las estrellas', 'Los veinticuatro ancianos'], a: 0,
      e: 'Son los ángeles caídos (Efesios 6:12). Los reyes caen en 19:19-21 y Satanás queda preso en 20:1-3. Fuente: Stephen Bohr, Los siete sellos de Apocalipsis, tomo 1, págs. 96-97.' },
    { t: 'mc', v: '19:20', f: 'c',
      q: 'Según Bohr, ¿qué imita el falso profeta de Apocalipsis 19:20?',
      o: ['El verdadero don profético', 'El sello de Dios en la frente', 'El sacrificio del Cordero', 'El canto de los redimidos'], a: 0,
      e: 'La bestia que sube de la tierra quiere contrarrestar el don profético «haciéndose pasar por un verdadero profeta» (16:13; 19:20). Fuente: Stephen Bohr, ¿Cuán cerca al fin?, pág. 158.' },
    { t: 'mc', v: '19:21', f: 'c',
      q: 'En la interpretación adventista, ¿qué comienza después de la batalla de Apocalipsis 19:19-21?',
      o: ['Los mil años de Apocalipsis 20', 'La gran tribulación final', 'El tiempo de gracia para los impíos', 'La semana setenta de Daniel 9'], a: 0,
      e: 'Con la venida mueren los impíos que viven y empiezan los mil años, con Satanás atado en la tierra vacía (20:1-3). Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, págs. 73-74; Elena de White, El conflicto de los siglos, págs. 527-528.' },
  ],

  tarjetas: [
    { f: 'Lo que es del Señor, según 19:1', r: 'Salvación, honra, gloria y poder' },
    { f: 'Quiénes dijeron «¡Amén! ¡Aleluya!» (19:4)', r: 'Los veinticuatro ancianos y los cuatro seres vivientes' },
    { f: '«Han llegado las bodas del Cordero y su esposa se ha preparado»', r: 'Apocalipsis 19:7' },
    { f: 'El vestido de la esposa (19:8)', r: 'Lino fino, limpio y resplandeciente: las acciones justas de los santos' },
    { f: 'La bienaventuranza de 19:9', r: '«Bienaventurados los que son llamados a la cena de las bodas del Cordero»' },
    { f: '«El testimonio de Jesús es el espíritu de la profecía»', r: 'Apocalipsis 19:10' },
    { f: 'Lo que el ángel le dijo a Juan (19:10)', r: '«¡Mira, no lo hagas! Yo soy consiervo tuyo… ¡Adora a Dios!»' },
    { f: 'Los nombres del jinete (19:11-16)', r: 'Fiel y Verdadero; un nombre que nadie conocía; La Palabra de Dios; Rey de reyes y Señor de señores' },
    { f: 'Ojos, cabeza y ropa del jinete (19:12-13)', r: 'Ojos como llama de fuego, muchas diademas, ropa teñida en sangre' },
    { f: 'Los ejércitos celestiales (19:14)', r: 'Vestidos de lino finísimo, blanco y limpio, en caballos blancos' },
    { f: 'Las dos cenas (19:9 y 19:17)', r: 'La cena de las bodas del Cordero; la gran cena de Dios (para las aves)' },
    { f: 'Quiénes van al lago de fuego en 19:20', r: 'La bestia y el falso profeta, lanzados vivos' },
  ],
};
