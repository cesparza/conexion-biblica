/* Apocalipsis 8 — El séptimo sello y las cuatro primeras trompetas.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');
/* Línea de fuente al pie de cada sección de interpretación. */
const fu = t => `<p class="fuente"><small>${t}</small></p>`;

module.exports = {
  cap: 'ap8', label: 'Apocalipsis 8', sub: 'El séptimo sello y las primeras trompetas', vs: 13,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Se abre el último de los siete sellos, el <strong>séptimo</strong>, y
      en el cielo hay <strong>silencio como por media hora</strong>.<br><br>
      Siete ángeles reciben <strong>siete trompetas</strong>. Otro ángel, con
      un <strong>incensario de oro</strong>, ofrece incienso junto con
      <strong>las oraciones de los santos</strong>, y el humo sube hasta
      Dios.<br><br>
      Después suenan <strong>cuatro trompetas</strong>. Cada una daña
      <strong>la tercera parte</strong> de algo: de los árboles, del mar, de
      los ríos, del sol, de la luna y de las estrellas. Al final, un ángel grita
      <strong>«¡Ay, ay, ay!»</strong> porque faltan tres trompetas.<br><br>
      <em>La idea del capítulo: Dios oye las oraciones de su pueblo, y estas
      trompetas todavía no son el final.</em>`) },

    { t: '🤫 El séptimo sello (8:1)', capa: 'nucleo', h:
      hi(`<strong>«Cuando abrió el séptimo sello, se hizo silencio en el cielo
      como por media hora»</strong> (8:1).`) +
      tbl(['Serie de siete', 'Dónde está', 'Quién actúa'], [
        ['<strong>Sellos</strong>', 'Capítulo 6 y 8:1', 'Los abre el Cordero (6:1)'],
        ['<strong>Trompetas</strong>', 'Capítulos 8, 9 y 11:15', 'Las tocan siete ángeles (8:2)'],
        ['<strong>Copas</strong>', 'Capítulos 15 y 16', 'Las derraman siete ángeles (16:1)'],
      ]) +
      wa(`No confundas las tres series: los <strong>sellos</strong> se abren,
      las <strong>trompetas</strong> se tocan y las <strong>copas</strong> se
      derraman. El séptimo sello no trae jinete: lo primero que trae
      es <strong>silencio</strong> (8:1).`) },

    { t: '🎺 Los siete ángeles (8:2-6)', capa: 'nucleo', h:
      li([`Juan vio <strong>«los siete ángeles que estaban de pie ante
           Dios»</strong> (8:2).`,
          `A ellos <strong>«se les dieron siete trompetas»</strong> (8:2).`,
          `Antes de que tocaran, vino otro ángel con el incensario (8:3-5).`,
          `Después, <strong>«Los siete ángeles que tenían las siete trompetas se
           dispusieron a tocarlas»</strong> (8:6).`]) },

    { t: '🔥 El incensario de oro (8:3-5)', capa: 'nucleo', h:
      tbl(['Paso', 'Lo que pasó'], [
        ['1', 'Otro ángel se paró ante el altar con <strong>un incensario de oro</strong> (8:3)'],
        ['2', 'Se le dio <strong>mucho incienso</strong> «para añadirlo a las oraciones de todos los santos» (8:3)'],
        ['3', 'Lo ofreció sobre <strong>el altar de oro</strong> que estaba delante del trono (8:3)'],
        ['4', 'El humo del incienso, con las oraciones, subió a la presencia de Dios (8:4)'],
        ['5', 'El ángel llenó el incensario <strong>del fuego del altar</strong> y lo arrojó a la tierra (8:5)'],
        ['6', 'Hubo <strong>truenos, voces, relámpagos y un terremoto</strong> (8:5)'],
      ]) +
      wa(`El mismo incensario se usa dos veces: primero <strong>sube</strong>
      el incienso con las oraciones hacia Dios (8:4); después
      <strong>baja</strong> el fuego del altar a la tierra (8:5).`) },

    { t: '🌳 Las cuatro primeras trompetas (8:7-12)', capa: 'nucleo', h:
      tbl(['Trompeta', 'Qué cae o qué pasa', 'Qué se afecta'], [
        ['1ª (8:7)', 'Granizo y fuego mezclados con sangre, sobre la <strong>tierra</strong>',
         'Se quema la tercera parte de los <strong>árboles</strong> y <strong>toda</strong> la hierba verde'],
        ['2ª (8:8-9)', 'Algo como un gran monte ardiendo en fuego, al <strong>mar</strong>',
         'Un tercio del mar se vuelve sangre; muere un tercio de los seres del mar; se destruye un tercio de las <strong>naves</strong>'],
        ['3ª (8:10-11)', 'Una gran estrella ardiendo como una antorcha, llamada <strong>Ajenjo</strong>',
         'Un tercio de los <strong>ríos</strong>, y las fuentes de las aguas; un tercio de las aguas se vuelve amargo y mueren muchos hombres'],
        ['4ª (8:12)', 'No cae nada: son heridos los astros del <strong>cielo</strong>',
         'Un tercio del <strong>sol, la luna y las estrellas</strong>; un tercio del día y de la noche sin luz'],
      ]) +
      wa(`Truco para el orden: <strong>tierra, mar, ríos, cielo</strong>. Y en
      cada una se habla de <strong>la tercera parte</strong>.`) },

    { t: '🔎 Detalles que se confunden (8:7-12)', capa: 'nucleo', h:
      li([`1ª trompeta: se quema un tercio de los árboles, pero <strong>«toda la
           hierba verde fue quemada»</strong> (8:7). La hierba no es un tercio:
           es toda.`,
          `2ª trompeta: <strong>«La tercera parte del mar se convirtió en
           sangre»</strong> (8:8), y se destruye un tercio de las naves (8:9).`,
          `3ª trompeta: <strong>«El nombre de la estrella es Ajenjo»</strong>
           (8:11). Muchos hombres murieron porque las aguas se volvieron
           amargas.`,
          `4ª trompeta: <strong>«no hubiera luz en la tercera parte del
           día»</strong> (8:12), y lo mismo en la noche.`]) +
      wa(`<strong>Monte</strong> ardiendo → cae al <strong>mar</strong> (2ª).
      <strong>Estrella</strong> ardiendo → cae en los <strong>ríos</strong>
      (3ª).<br>
      La estrella <strong>Ajenjo</strong> es la de la 3ª trompeta; la estrella
      que recibe <strong>la llave del abismo</strong> es la de la 5ª (9:1).`) },

    { t: '📢 ¡Ay, ay, ay! (8:13)', capa: 'nucleo', h:
      hi(`Juan oyó un ángel <strong>que volaba en medio del cielo</strong> y
      decía a gran voz: <strong>«¡Ay, ay, ay de los que habitan en la tierra, a
      causa de los otros toques de trompeta que están para tocar los tres
      ángeles!»</strong> (8:13).`) +
      tbl(['Ay', 'Con qué trompeta'], [
        ['Primer ay', '5ª trompeta (9:12)'],
        ['Segundo ay', '6ª trompeta (11:14)'],
        ['Tercer ay', 'Viene «pronto» después del segundo (11:14)'],
      ]) +
      wa(`Son <strong>tres</strong> ayes porque faltan <strong>tres</strong>
      trompetas: la quinta, la sexta y la séptima.`) },

    { t: '🧭 Cómo estudia Bohr las trompetas', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Es la lectura del
      pastor adventista <strong>Stephen (Esteban) Bohr</strong>.<br><br>
      Bohr describe cuatro maneras de leer las trompetas:
      <strong>preterista</strong> (todo se cumplió en el primer siglo),
      <strong>futurista</strong> (todo pasará al final),
      <strong>doble cumplimiento</strong> (una vez en el pasado y otra en el
      futuro) e <strong>historicista</strong> (se cumplen en orden a lo largo
      de la historia de la iglesia, una sola vez). Él sigue la
      historicista.`) +
      li([`<strong>La escena de entrada marca el comienzo y el final.</strong>
           El ángel que ofrece incienso (8:3-4) muestra el comienzo: desde
           <strong>Pentecostés</strong> Jesús intercede en el santuario del
           cielo. El incensario arrojado (8:5) muestra el final: termina la
           intercesión.`,
          `<strong>El libro sigue el orden del santuario.</strong> Las iglesias,
           junto a los candeleros; los sellos, junto a la mesa de los panes;
           las trompetas, junto al <strong>altar del incienso</strong>; en
           11:19 se abre el lugar santísimo.`,
          `<strong>Siete períodos.</strong> Las trompetas recorren la historia
           cristiana, desde el primer siglo hasta que Cristo recibe el reino
           (11:15).`]) +
      fu(`Fuentes: Stephen Bohr, «Introducción a las siete trompetas», pág. 3-4,
      8 y 20; Bohr, «La Razón de Nuestro Existir», pág. 44.`) },

    { t: '🧭 El incensario: oraciones que Dios responde (8:3-5)', capa: 'contexto', h:
      hi(`<strong>El incienso</strong> son las oraciones de los santos mezcladas
      con los méritos de Jesús, y <strong>el fuego</strong> es símbolo del
      Espíritu Santo. Elena de White lo dice así: Cristo
      «mezcla con ellas los méritos de su propia vida de perfecta
      obediencia».<br><br>
      <strong>Dos altares.</strong> En el quinto sello las almas claman bajo
      el altar del sacrificio (6:9-10). Dios oye ese clamor en el altar del
      incienso y responde con las trompetas. Así fue en Egipto: Israel gimió,
      Dios «se acordó de su pacto» (Éxodo 2:24) y envió juicios. Y en Números
      10:9 la trompeta sonaba en la guerra contra el enemigo opresor, para que
      Dios se acordara de su pueblo y lo librara.<br><br>
      <strong>El incensario arrojado (8:5)</strong> no es Pentecostés: es el
      momento en que termina la intercesión y se cierra el tiempo de gracia
      (compara 15:5-8). Entre 8:4 y 8:5 hay un largo intervalo: toda la
      historia de las trompetas.`) +
      fu(`Fuentes: Stephen Bohr, «Introducción a las siete trompetas», pág. 16-18
      y 21-24; Bohr, «La Razón de Nuestro Existir», pág. 79 (cita a Elena de
      White, «Hijos e hijas de Dios», pág. 24).`) },

    { t: '🧭 Las siete trompetas según Bohr', capa: 'contexto', h:
      tbl(['Trompeta', 'Juicio sobre…', 'Fechas'], [
        ['1ª (8:7)', 'Jerusalén, que cae', '34-70 d.C.'],
        ['2ª (8:8-9)', 'Roma imperial, que cae', '300-476'],
        ['3ª (8:10-11)', 'La iglesia profanada', '313-538'],
        ['4ª (8:12; 11:2-6)', 'Dominio del papado', '538-1798'],
        ['5ª (9:1-11; 11:7-12)', 'Revolución Francesa · 1.er ay', '1789-1798'],
        ['6ª (9:13-21; 10:1-11:13)', 'Se reúnen impíos y justos · 2.º ay', '1844 al fin de la gracia'],
        ['7ª (11:15-17)', 'Cristo recibe el reino · 3.er ay', 'Tras el fin de la gracia'],
      ]) +
      wa(`<strong>Por qué así:</strong> las trompetas son juicios
      <strong>parciales</strong> (una tercera parte) contra los poderes que
      oprimieron al pueblo de Dios, mientras todavía hay tiempo de gracia.
      Los tres ayes (8:13) se anuncian al terminar la cuarta.<br>
      <strong>Otras lecturas adventistas:</strong> la clásica de Urías Smith y
      Josías Litch, que defiende Alberto Treiyer, ve en las trompetas 1-4 las
      invasiones bárbaras contra Roma, y en la 5ª y 6ª a sarracenos y
      turcos; Ekkehardt Mueller propone otra. Una nota antigua de Camilo
      (2022) trae la lectura clásica; sus notas de 2025 siguen a Bohr.`) +
      fu(`Fuentes: Bohr, «Introducción a las siete trompetas», pág. 16 y 19; Bohr,
      «15 principios de interpretación profética», vol. 2, pág. 89-90;
      Treiyer, reseña de Mueller, pág. 1-3; Treiyer, «Fechas trompetas»,
      pág. 3-4; notas de Camilo, "Las trompetas" y "1 - Las 7 Trompetas".`) },

    { t: '🧭 Las cuatro primeras, una por una (8:7-12)', capa: 'contexto', h:
      li([`<strong>1ª · Jerusalén (34-70).</strong> Para Bohr los juicios
           empiezan con la destrucción de Jerusalén. En las notas de Camilo:
           el juicio empieza por la casa de Dios (1 Pedro 4:17); los árboles
           son el pueblo de Dios (Salmo 1:3; Jeremías 11:16); granizo y fuego
           son imágenes de guerra.`,
          `<strong>2ª · Roma imperial (300-476).</strong> El monte ardiendo
           recuerda a Babilonia, el «monte destruidor» que Dios reduce a monte
           quemado (Jeremías 51:25).`,
          `<strong>3ª · La iglesia profanada (313-538).</strong> La estrella
           que cae recuerda al «Lucero» caído de Isaías 14:12-15. Notas de
           Camilo: castigo sobre el pueblo de Dios que permitió la mezcla.`,
          `<strong>4ª · El dominio papal (538-1798).</strong> Los 1.260 años
           que amplían 11:2-6, 12 y 13:1-8; en las notas de Camilo, la
           oscuridad de la Edad Media.`]) +
      wa(`En el material de Bohr que tenemos están el poder y las fechas de
      cada trompeta, pero no la explicación de cada símbolo. Los árboles como
      pueblo de Dios y los trasfondos de la 2ª y la 3ª salen de sus listas de
      símbolos.`) +
      fu(`Fuentes: Bohr, «Introducción a las siete trompetas», pág. 16 y 19; Bohr,
      «15 principios de interpretación profética», vol. 2, pág. 89-90, 105 y
      215-216;
      notas de Camilo en Evernote, "Las trompetas".`) },

    { t: '🧭 Trompetas y plagas: aviso antes del final', capa: 'contexto', h:
      tbl(['', 'Trompetas', 'Plagas (copas)'], [
        ['1-4', 'Tierra, mar, ríos y fuentes, astros', 'Las mismas cosas, en el mismo orden'],
        ['5-6', 'Oscuridad · río Éufrates', 'Oscuridad · río Éufrates'],
        ['Alcance', 'Una tercera parte: parcial', 'Toda la ira de Dios: total'],
        ['Cuándo', 'Con tiempo de gracia', 'Después del tiempo de gracia'],
      ]) +
      hi(`Para Bohr las trompetas son el <strong>tipo</strong> (la figura) y las
      plagas el <strong>antitipo</strong> (el cumplimiento mayor). Durante las
      trompetas todavía es posible arrepentirse; en las plagas ya no.<br><br>
      También compara las series: los cuatro primeros sellos con las cuatro
      primeras trompetas; el sexto sello y la sexta trompeta, cada uno con su
      paréntesis (capítulo 7; capítulos 10 y 11); el séptimo sello trae
      silencio y la séptima trompeta trae el reino.`) +
      fu(`Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 14-16.`) },

    { t: '🧭 El silencio del séptimo sello (8:1)', capa: 'contexto', h:
      hi(`Bohr repasa dos ideas que circulan: que la media hora son unos siete
      días y medio proféticos con el cielo vacío, o que son los siete días del
      viaje de los redimidos al cielo. Las descarta: después del tiempo de
      gracia ya no hay tiempo profético, y el viaje al cielo será todo menos
      silencioso.<br><br>
      Su lectura: es un silencio <strong>literal y breve</strong> cuando Jesús
      desciende. El sexto sello termina con la pregunta «¿quién podrá
      sostenerse en pie?» (6:17). Elena de White describe que, tras esa
      pregunta, «sigue un periodo de silencio aterrador», y luego Jesús dice
      «Bástaos mi gracia».`) +
      fu(`Fuente: Stephen Bohr, «Los siete sellos de Apocalipsis», tomo 2,
      pág. 201-203 (cita «El conflicto de los siglos», pág. 624).`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Incienso (8:3-4)', 'Las oraciones de los santos, con los méritos de Cristo', 'Apocalipsis 5:8: «copas de oro llenas de incienso, que son las oraciones de los santos»; Salmo 141:2'],
        ['Fuego arrojado (8:5)', 'El juicio de Dios al terminar la intercesión', 'Ezequiel 10:2'],
        ['Trompeta (8:2)', 'Alarma de guerra y aviso del juicio de Dios', 'Números 10:9; Josué 6'],
        ['Granizo y fuego (8:7)', 'Guerra', 'Salmo 18:12-14'],
        ['Árboles (8:7)', 'El pueblo de Dios', 'Salmo 1:3; 92:12; Jeremías 17:8'],
        ['Monte (8:8)', 'Un reino', 'Jeremías 51:25; Daniel 2:35, 44'],
        ['Mar y aguas (8:8-11)', 'Pueblos y naciones', 'Apocalipsis 17:15: «Las aguas que has visto… son pueblos, muchedumbres, naciones y lenguas»'],
        ['Estrella (8:10)', 'Un ángel; la que cae, Lucifer', 'Apocalipsis 1:20; Isaías 14:12-15'],
        ['Sol (8:12)', 'Cristo, el Sol de justicia', 'Malaquías 4:2'],
      ]) +
      fu(`Fuentes: Bohr, «Introducción a las siete trompetas», pág. 16-17 y 21-24;
      Bohr, «15 principios de interpretación profética», vol. 2, pág. 105-106 y
      215-216; notas de Camilo en Evernote, "Las trompetas".`) },
  ],

  preguntas: [
    { t: 'mc', v: '8:1', lit: 'se hizo silencio en el cielo como por media hora',
      q: '¿Qué pasó cuando se abrió el séptimo sello? (Apocalipsis 8:1)',
      o: ['Hubo silencio en el cielo como por media hora', 'Hubo un gran terremoto y el sol se oscureció', 'Salió un caballo amarillo con su jinete', 'Las almas bajo el altar clamaron a gran voz'], a: 0,
      e: '«Cuando abrió el séptimo sello, se hizo silencio en el cielo como por media hora» (8:1). El terremoto, el caballo amarillo y las almas bajo el altar son de los sellos del capítulo 6.' },
    { t: 'mc', v: '8:1', lit: 'como por media hora',
      q: '¿Cuánto duró el silencio en el cielo? (Apocalipsis 8:1)',
      o: ['Como media hora', 'Como una hora', 'Como tres días', 'Como siete días'], a: 0,
      e: '«…se hizo silencio en el cielo como por media hora» (8:1).' },
    { t: 'tf', v: '8:1',
      q: 'Al abrirse el sexto sello se hizo silencio en el cielo como por media hora.', a: false,
      e: 'Falso: fue al abrirse el SÉPTIMO sello (8:1).' },
    { t: 'mc', v: '8:1', lit: 'silencio en el cielo',
      q: '¿Qué texto dice «se hizo silencio en el cielo como por media hora»?',
      o: ['Apocalipsis 8:1', 'Apocalipsis 6:12', 'Apocalipsis 8:13', 'Apocalipsis 7:1'], a: 0,
      e: 'Apocalipsis 8:1, cuando se abre el séptimo sello.' },
    { t: 'fill', v: '8:1', ins: 'Apocalipsis 8:1 (RV1995) — Completa:',
      p: [{ x: 'Cuando abrió el ' }, { b: 'séptimo', h: '¿cuál sello?' }, { x: ' sello, se hizo silencio en el cielo como por media ' }, { b: 'hora', h: '¿media qué?' }, { x: '.' }] },
    { t: 'mc', v: '8:2', lit: 'se les dieron siete trompetas',
      q: '¿Qué se les dio a los siete ángeles que estaban de pie ante Dios? (Apocalipsis 8:2)',
      o: ['Siete trompetas', 'Siete copas', 'Siete sellos', 'Siete coronas'], a: 0,
      e: '«…vi los siete ángeles que estaban de pie ante Dios, y se les dieron siete trompetas» (8:2). Las siete copas son del capítulo 16.' },
    { t: 'mc', v: '8:3', lit: 'con un incensario de oro',
      q: '¿Qué llevaba el ángel que se paró ante el altar? (Apocalipsis 8:3)',
      o: ['Un incensario de oro', 'Una trompeta de plata', 'Una copa de oro', 'Un librito abierto'], a: 0,
      e: '«Otro ángel vino entonces y se paró ante el altar, con un incensario de oro» (8:3).' },
    { t: 'mc', v: '8:3', lit: 'para añadirlo a las oraciones de todos los santos',
      q: '¿Para qué se le dio mucho incienso al ángel? (Apocalipsis 8:3)',
      o: ['Para añadirlo a las oraciones de todos los santos', 'Para quemarlo sobre la tierra contra los impíos', 'Para llenar las siete copas de los siete ángeles', 'Para ofrecerlo en el templo de Jerusalén'], a: 0,
      e: '«…se le dio mucho incienso para añadirlo a las oraciones de todos los santos» (8:3).' },
    { t: 'fill', v: '8:3', ins: 'Apocalipsis 8:3 (RV1995) — Completa:',
      p: [{ x: 'sobre el altar de ' }, { b: 'oro', h: '¿de qué era el altar?' }, { x: ' que estaba delante del ' }, { b: 'trono', h: '¿delante de qué?' }, { x: '.' }] },
    { t: 'tf', v: '8:4',
      q: 'El humo del incienso, con las oraciones de los santos, subió a la presencia de Dios. (Apocalipsis 8:4)', a: true,
      e: 'Verdadero (Apocalipsis 8:4).' },
    { t: 'mc', v: '8:5', lit: 'lo llenó del fuego del altar y lo arrojó a la tierra',
      q: '¿Qué hizo después el ángel con el incensario? (Apocalipsis 8:5)',
      o: ['Lo llenó del fuego del altar y lo arrojó a la tierra', 'Lo puso sobre el altar de oro delante del trono', 'Se lo entregó al primero de los siete ángeles', 'Lo dejó en el templo de Dios lleno de humo'], a: 0,
      e: '«Y el ángel tomó el incensario, lo llenó del fuego del altar y lo arrojó a la tierra» (8:5).' },
    { t: 'mc', v: '8:5', lit: 'truenos, voces, relámpagos y un terremoto',
      q: '¿Qué hubo cuando el ángel arrojó el incensario a la tierra? (Apocalipsis 8:5)',
      o: ['Truenos, voces, relámpagos y un terremoto', 'Granizo y fuego mezclados con sangre', 'Silencio en el cielo como por media hora', 'Una gran estrella ardiendo como antorcha'], a: 0,
      e: '«…y hubo truenos, voces, relámpagos y un terremoto» (8:5).' },
    { t: 'tf', v: '8:6',
      q: 'Los siete ángeles que tenían las siete trompetas se dispusieron a tocarlas. (Apocalipsis 8:6)', a: true,
      e: 'Verdadero (Apocalipsis 8:6).' },
    { t: 'mc', v: '8:7', lit: 'granizo y fuego mezclados con sangre',
      q: '¿Qué fue lanzado sobre la tierra con la primera trompeta? (Apocalipsis 8:7)',
      o: ['Granizo y fuego mezclados con sangre', 'Algo como un gran monte ardiendo', 'Una gran estrella llamada Ajenjo', 'Langostas con poder de escorpiones'], a: 0,
      e: '«…hubo granizo y fuego mezclados con sangre que fueron lanzados sobre la tierra» (8:7).' },
    { t: 'mc', v: '8:7', lit: 'se quemó la tercera parte de los árboles',
      q: 'Con la primera trompeta, ¿qué parte de los árboles se quemó? (Apocalipsis 8:7)',
      o: ['La tercera parte', 'La cuarta parte', 'La mitad', 'Todos los árboles'], a: 0,
      e: '«Y se quemó la tercera parte de los árboles» (8:7).' },
    { t: 'tf', v: '8:7',
      q: 'Con la primera trompeta se quemó la tercera parte de la hierba verde. (Apocalipsis 8:7)', a: false,
      e: 'Falso: «TODA la hierba verde fue quemada» (8:7). La tercera parte fue de los árboles.' },
    { t: 'mc', v: '8:8', lit: 'algo como un gran monte ardiendo en fuego',
      q: '¿Qué fue precipitado en el mar con la segunda trompeta? (Apocalipsis 8:8)',
      o: ['Algo como un gran monte ardiendo en fuego', 'Una gran estrella ardiendo como una antorcha', 'Granizo y fuego mezclados con sangre', 'Una gran piedra como de molino'], a: 0,
      e: '«…algo como un gran monte ardiendo en fuego fue precipitado en el mar» (8:8). La estrella ardiendo cae con la tercera trompeta (8:10).' },
    { t: 'fill', v: '8:8', ins: 'Apocalipsis 8:8 (RV1995) — Completa:',
      p: [{ x: 'La tercera parte del ' }, { b: 'mar', h: '¿de qué?' }, { x: ' se convirtió en ' }, { b: 'sangre', h: '¿en qué?' }, { x: ',' }] },
    { t: 'mc', v: '8:9', lit: 'la tercera parte de las naves fue destruida',
      q: 'Con la segunda trompeta, ¿qué fue destruido además de morir los seres del mar? (Apocalipsis 8:9)',
      o: ['La tercera parte de las naves', 'La tercera parte de los ríos', 'Toda la hierba verde', 'La tercera parte del sol'], a: 0,
      e: '«…murió la tercera parte de los seres vivientes que estaban en el mar y la tercera parte de las naves fue destruida» (8:9).' },
    { t: 'fill', v: '8:9', ins: 'Apocalipsis 8:9 (RV1995) — Completa:',
      p: [{ x: 'murió la tercera parte de los seres vivientes que estaban en el ' }, { b: 'mar', h: '¿dónde?' }, { x: ' y la tercera parte de las ' }, { b: 'naves', h: '¿de qué?' }, { x: ' fue destruida.' }] },
    { t: 'mc', v: '8:10', lit: 'una gran estrella ardiendo como una antorcha',
      q: '¿Qué cayó del cielo con la tercera trompeta? (Apocalipsis 8:10)',
      o: ['Una gran estrella ardiendo como una antorcha', 'Algo como un gran monte ardiendo en fuego', 'Granizo y fuego mezclados con sangre', 'Una estrella con la llave del abismo'], a: 0,
      e: '«…cayó del cielo una gran estrella ardiendo como una antorcha» (8:10). La estrella con la llave del abismo es de la quinta trompeta (9:1).' },
    { t: 'mc', v: '8:10', lit: 'Cayó sobre la tercera parte de los ríos',
      q: '¿Sobre qué cayó la estrella de la tercera trompeta? (Apocalipsis 8:10)',
      o: ['Sobre los ríos y las fuentes de las aguas', 'Sobre el mar y las naves que navegaban', 'Sobre los árboles y la hierba verde', 'Sobre el sol, la luna y las estrellas'], a: 0,
      e: '«Cayó sobre la tercera parte de los ríos y sobre las fuentes de las aguas» (8:10).' },
    { t: 'mc', v: '8:11', lit: 'El nombre de la estrella es Ajenjo',
      q: '¿Cómo se llama la estrella de la tercera trompeta? (Apocalipsis 8:11)',
      o: ['Ajenjo', 'Abadón', 'Apolión', 'Lucero'], a: 0,
      e: '«El nombre de la estrella es Ajenjo» (8:11). Abadón y Apolión son los nombres del ángel del abismo (9:11).' },
    { t: 'tf', v: '8:11',
      q: 'Las aguas se volvieron amargas y muchos hombres murieron a causa de ellas. (Apocalipsis 8:11)', a: true,
      e: 'Verdadero: «muchos hombres murieron a causa de esas aguas, porque se volvieron amargas» (8:11).' },
    { t: 'mc', v: '8:12', lit: 'fue herida la tercera parte del sol',
      q: '¿Qué fue herido con la cuarta trompeta? (Apocalipsis 8:12)',
      o: ['La tercera parte del sol, la luna y las estrellas', 'La tercera parte de los ríos y de las fuentes', 'La tercera parte del mar y de las naves', 'La tercera parte de los árboles y la hierba'], a: 0,
      e: '«…fue herida la tercera parte del sol, la tercera parte de la luna y la tercera parte de las estrellas» (8:12).' },
    { t: 'tf', v: '8:12',
      q: 'Con la cuarta trompeta no hubo luz en la tercera parte del día, y asimismo en la noche. (Apocalipsis 8:12)', a: true,
      e: 'Verdadero (Apocalipsis 8:12).' },
    { t: 'mc', v: '8:13', lit: '¡Ay, ay, ay de los que habitan en la tierra',
      q: '¿Qué decía a gran voz el ángel que volaba en medio del cielo? (Apocalipsis 8:13)',
      o: ['«¡Ay, ay, ay de los que habitan en la tierra!»', '«¡Ha caído, ha caído Babilonia la grande!»', '«¡Temed a Dios y dadle gloria!»', '«¡La salvación pertenece a nuestro Dios!»'], a: 0,
      e: '«¡Ay, ay, ay de los que habitan en la tierra, a causa de los otros toques de trompeta…!» (8:13).' },
    { t: 'mc', v: '8:13', lit: 'ay, ay, ay',
      q: '¿Cuántos «ay» anuncia el ángel que volaba en medio del cielo? (Apocalipsis 8:13)',
      o: ['Tres', 'Dos', 'Siete', 'Uno'], a: 0,
      e: 'Tres: «¡Ay, ay, ay…!», por las trompetas que faltaban por tocar los tres ángeles (8:13).' },
    { t: 'tf', v: '8:13',
      q: 'El ángel anunció los ayes por los toques de trompeta que estaban para tocar los cuatro ángeles. (Apocalipsis 8:13)', a: false,
      e: 'Falso: eran los TRES ángeles que faltaban por tocar (8:13): la quinta, la sexta y la séptima trompeta.' },
    { t: 'mc', v: '8:1', f: 'c',
      q: 'Según Bohr, ¿qué es la media hora de silencio del séptimo sello?',
      o: ['Un silencio breve cuando Jesús desciende', 'Los siete días del viaje de los salvos al cielo', 'Siete días y medio con el cielo vacío', 'Una pausa del cielo antes del juicio de 1844'], a: 0,
      e: 'Bohr la toma como un silencio literal y breve en la venida de Jesús: tras la pregunta «¿quién podrá sostenerse en pie?» (6:17) «sigue un periodo de silencio aterrador» (El conflicto de los siglos, 624). Descarta las otras dos lecturas de días. Fuente: Stephen Bohr, «Los siete sellos de Apocalipsis», tomo 2, pág. 201-203.' },
    { t: 'tf', v: '8:1', f: 'c',
      q: 'Según Bohr, la media hora de 8:1 es tiempo profético: unos siete días y medio.', a: false,
      e: 'Falso: Bohr dice que es tiempo literal, porque después del cierre del tiempo de gracia ya no hay períodos proféticos. Fuente: Stephen Bohr, «Los siete sellos de Apocalipsis», tomo 2, pág. 201-202.' },
    { t: 'mc', v: '8:3-4', f: 'c',
      q: 'Según Bohr, ¿cuándo empezó la obra del ángel que ofrece el incienso con las oraciones?',
      o: ['En Pentecostés, cuando Jesús empezó a interceder', 'En 1844, cuando se abrió el lugar santísimo', 'En el año 70, cuando cayó Jerusalén', 'En 1798, al terminar los 1.260 años'], a: 0,
      e: 'La escena de 8:3-4 marca el punto de partida de las trompetas: desde Pentecostés Jesús intercede en el altar de oro del lugar santo. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 4 y 20.' },
    { t: 'mc', v: '8:3', f: 'c',
      q: 'Según Bohr, ¿qué representa el incienso que se añade a las oraciones de los santos?',
      o: ['Los méritos de Jesús', 'Las buenas obras de los santos', 'Las ofrendas de los ancianos', 'La sangre de los mártires'], a: 0,
      e: 'El incienso son las oraciones mezcladas con los méritos de Jesús, y el fuego es símbolo del Espíritu Santo. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 24.' },
    { t: 'mc', v: '8:5', f: 'c',
      q: 'Según Bohr, ¿qué representa que el ángel arroje el incensario a la tierra?',
      o: ['El fin de la intercesión y del tiempo de gracia', 'El Espíritu Santo que bajó en Pentecostés', 'La caída de Jerusalén en el año 70', 'El comienzo del juicio celestial en 1844'], a: 0,
      e: 'Arrojar el incensario marca el final de la serie: termina la intercesión y se cierra el tiempo de gracia (compara 15:5-8). Bohr rechaza que sea Pentecostés, porque allí Jesús empezó a interceder. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 20-22.' },
    { t: 'mc', v: '8:2', f: 'c',
      q: 'Según Bohr, ¿junto a qué mueble del santuario ministra Jesús en la serie de las trompetas?',
      o: ['El altar del incienso', 'El candelero de oro', 'La mesa de los panes', 'El arca del pacto'], a: 0,
      e: 'El Apocalipsis sigue el orden del santuario: iglesias y candeleros, sellos y mesa de los panes, trompetas y altar del incienso; en 11:19 se ve el arca. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 8.' },
    { t: 'tf', v: '8:2', f: 'c',
      q: 'Según Bohr, las trompetas son la respuesta de Dios al clamor de su pueblo contra los que lo oprimen, como en Números 10:9.', a: true,
      e: 'Verdadero: el clamor de las almas bajo el altar (6:9-10) sube al altar del incienso, y Dios responde con juicios sobre los opresores, como en Egipto (Éxodo 2:23-25). Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 16-17.' },
    { t: 'mc', v: '8:7', f: 'c',
      q: 'Según Bohr, ¿sobre quién cae el juicio de la primera trompeta?',
      o: ['Sobre Jerusalén, del 34 al 70 d.C.', 'Sobre Roma, saqueada en el 410', 'Sobre el papado, del 538 al 1798', 'Sobre Francia, del 1789 al 1798'], a: 0,
      e: 'Para Bohr los juicios de las trompetas empiezan con la destrucción de Jerusalén (34-70 d.C.). El saqueo de Roma en el 410 es de la lectura clásica. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 16 y 19.' },
    { t: 'mc', v: '8:8-9', f: 'c',
      q: 'Según Bohr, ¿a qué corresponde la segunda trompeta?',
      o: ['La caída de Roma imperial (300-476)', 'La caída de Jerusalén (34-70)', 'La iglesia profanada (313-538)', 'El dominio papal (538-1798)'], a: 0,
      e: 'La segunda trompeta es la caída de Roma, entre el 300 y el 476. Bohr relaciona el monte ardiendo con Jeremías 51:25. Fuentes: Bohr, «Introducción a las siete trompetas», pág. 19; Bohr, «15 principios de interpretación profética», vol. 2, pág. 216.' },
    { t: 'mc', v: '8:10-11', f: 'c',
      q: 'Según Bohr, ¿a qué corresponde la tercera trompeta, la de la estrella Ajenjo?',
      o: ['La iglesia profanada (313-538)', 'La caída de Roma imperial (300-476)', 'La Revolución Francesa (1789-1798)', 'La invasión de los hunos (siglo V)'], a: 0,
      e: 'La tercera trompeta es la iglesia profanada, del 313 al 538. Bohr relaciona la estrella con el «Lucero» caído de Isaías 14:12-15. La de los hunos es la lectura clásica. Fuentes: Bohr, «Introducción a las siete trompetas», pág. 19; Bohr, «15 principios de interpretación profética», vol. 2, pág. 216.' },
    { t: 'mc', v: '8:12', f: 'c',
      q: 'Según Bohr, ¿a qué período corresponde la cuarta trompeta, cuando se oscurecen los astros?',
      o: ['Al dominio papal, del 538 al 1798', 'A la Revolución Francesa, 1789-1798', 'A la caída de Roma, del 300 al 476', 'Al tiempo del fin, desde 1844'], a: 0,
      e: 'La cuarta trompeta son los 1.260 años de dominio papal (538-1798); 11:2-6 vuelve a ese período. Fuentes: Bohr, «Introducción a las siete trompetas», pág. 19; Bohr, «15 principios de interpretación profética», vol. 2, pág. 89.' },
    { t: 'tf', v: '8:7-12', f: 'c',
      q: 'Según Bohr, las cuatro primeras trompetas son las invasiones bárbaras que derribaron a Roma.', a: false,
      e: 'Falso: esa es la lectura clásica de Urías Smith. Bohr pregunta por qué esas invasiones merecerían cuatro trompetas y las aplica a Jerusalén, Roma, la iglesia profanada y el dominio papal. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 6 y 19.' },
    { t: 'mc', v: '8:7-12', f: 'c',
      q: 'Según Bohr, ¿por qué las trompetas dañan solo «la tercera parte»?',
      o: ['Son juicios parciales con tiempo de gracia', 'Porque solo un tercio del mundo era pagano', 'Porque cada una dura un tercio de la historia', 'Porque son las plagas finales sin misericordia'], a: 0,
      e: 'Que caigan en tercios muestra que son juicios preliminares y parciales, y que todavía hay arrepentimiento. Las plagas, en cambio, son totales y vienen tras el cierre de la gracia. Fuente: Stephen Bohr, «Introducción a las siete trompetas», pág. 16.' },
    { t: 'mc', v: '8:13', f: 'c',
      q: 'Según Bohr, ¿qué hecho histórico es el primer ay, la quinta trompeta?',
      o: ['La Revolución Francesa', 'La caída de Jerusalén', 'La Reforma protestante', 'La caída de Constantinopla'], a: 0,
      e: 'Los tres ayes se anuncian al terminar la cuarta trompeta (8:13); el primero, la quinta trompeta, es la Revolución Francesa (1789-1798). Fuente: Stephen Bohr, «15 principios de interpretación profética», vol. 2, pág. 89.' },
    { t: 'mc', v: '8:7', f: 'c',
      q: 'En la lista de símbolos de Bohr, ¿qué representan los árboles, como los de la primera trompeta?',
      o: ['El pueblo de Dios', 'Los reyes de la tierra', 'Las riquezas del mundo', 'Los ejércitos paganos'], a: 0,
      e: 'Los árboles son el pueblo de Dios: el justo es como un árbol plantado junto al agua (Salmo 1:3; 92:12; Jeremías 17:8). Las notas de Camilo dicen lo mismo. Fuentes: Bohr, «15 principios de interpretación profética», vol. 2, pág. 105 y 215; notas de Camilo en Evernote, "Las trompetas".' },
    { t: 'mc', v: '8:8', f: 'c',
      q: 'Según Bohr, ¿qué representa un monte en la profecía bíblica?',
      o: ['Un reino', 'Un templo', 'Un profeta', 'Un ejército'], a: 0,
      e: 'Un monte es un reino: Dios llama a Babilonia monte destructor (Jeremías 51:25), y en Daniel 2 la piedra se hace un gran monte, el reino de Dios (Daniel 2:35, 44). Fuente: Bohr, «15 principios de interpretación profética», vol. 2, pág. 106 y 216.' },
    { t: 'mc', v: '8:10-11', f: 'c',
      q: '¿Qué texto del mismo Apocalipsis explica que las aguas representan pueblos?',
      o: ['Apocalipsis 17:15', 'Apocalipsis 8:11', 'Apocalipsis 12:15', 'Apocalipsis 16:4'], a: 0,
      e: '«Las aguas que has visto… son pueblos, muchedumbres, naciones y lenguas» (Apocalipsis 17:15). Fuente: Bohr, «15 principios de interpretación profética», vol. 2, pág. 105.' },
    { t: 'tf', v: '8:5', f: 'c',
      q: 'Según Bohr, el trasfondo del fuego arrojado a la tierra (8:5) es Ezequiel 10:2, donde se esparcen carbones encendidos sobre la ciudad como señal de juicio.', a: true,
      e: 'Verdadero: el hombre vestido de lino toma carbones de entre los querubines y los esparce sobre la ciudad (Ezequiel 10:2). En 8:5 el fuego arrojado marca el fin de la intercesión. Fuente: Bohr, «Introducción a las siete trompetas», pág. 21-22.' },
  ],

  tarjetas: [
    { f: 'Qué pasó al abrirse el séptimo sello (8:1)', r: 'Silencio en el cielo como por media hora' },
    { f: 'Qué recibieron los siete ángeles (8:2)', r: 'Siete trompetas' },
    { f: 'El ángel del incensario (8:3)', r: 'Incensario de oro; mucho incienso para añadirlo a las oraciones de todos los santos' },
    { f: 'Qué hizo con el incensario al final (8:5)', r: 'Lo llenó del fuego del altar y lo arrojó a la tierra: truenos, voces, relámpagos y un terremoto' },
    { f: '1ª trompeta (8:7)', r: 'Granizo y fuego con sangre: se quema un tercio de los árboles y toda la hierba verde' },
    { f: '2ª trompeta (8:8-9)', r: 'Un gran monte ardiendo cae al mar: un tercio del mar en sangre, de los seres del mar y de las naves' },
    { f: '3ª trompeta (8:10-11)', r: 'La estrella Ajenjo cae sobre un tercio de los ríos y sobre las fuentes; aguas amargas' },
    { f: '4ª trompeta (8:12)', r: 'Herido un tercio del sol, la luna y las estrellas' },
    { f: 'Orden de lo que golpean las trompetas 1 a 4', r: 'Tierra, mar, ríos, cielo' },
    { f: 'Nombre de la estrella de la 3ª trompeta (8:11)', r: 'Ajenjo' },
    { f: '«¡Ay, ay, ay de los que habitan en la tierra!»', r: 'Apocalipsis 8:13: tres ayes por las tres trompetas que faltan' },
    { f: 'Sellos, trompetas y copas', r: 'Los sellos los abre el Cordero; las trompetas y las copas, siete ángeles' },
  ],
};
