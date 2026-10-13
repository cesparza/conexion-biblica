/* Daniel 11: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: reyes persas (v190: el cuarto de 11:2 es Jerjes, con
   Treiyer; decisión de Camilo, 13-oct),
   reyes tolomeos y seléucidas, Berenice, guerras sirias, Roma, el pacto de
   Constantino a Justiniano, Canossa, Carlomagno, 1798, el «pequeño socorro»,
   36-39 y 40-45 según Treiyer y Maxwell. Aquí va la lectura de Bohr: cómo se
   leyó el rey del norte en la historia adventista, su esquema del capítulo,
   el paso de lo literal a lo espiritual, 11:31 y el 508, y 11:40-45 como
   postura suya, con otras lecturas al lado. v188: voz directa, sin nombrar
   autores en el cuerpo; una sola «Fuente:» corta por sección.
   Camilo (13-oct 13:04: «complementar con el libro de Daniel 11 de
   Treiyer»): Humberto R. Treiyer, «Enigmas descifrados» (2006; no confundir
   con Alberto Treiyer). Se suman los saltos del relato, 11:3-20 verso por
   verso, 21-30, palabras clave de 31-39 y detalles de 40-45. Camilo (13-oct
   14:55): 11:22 se combina (cruz y luego el ocultamiento de la intercesión);
   11:30 sigue a Bohr (Roma papal en los 1.260 años) con el golpe de 1798;
   la división de 16-39 se compara en una tabla. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd11',
  secciones: [
    { t: '🧭 Cómo se ha leído al rey del norte en la historia adventista', capa: 'contexto', h:
      tbl(['Cuándo', 'Quién', 'El rey del norte se leyó como'], [
        ['1836', 'Guillermo Miller', 'El papado: el mismo cuerno pequeño'],
        ['1847', 'Los pioneros', 'El último poder que pisotea a la iglesia'],
        ['1871', 'Un cambio de postura', 'Turquía'],
        ['1877-1878', 'Jaime White protesta', 'Si es Turquía, también lo serían los pies de Daniel 2 y el cuerno de Daniel 8'],
        ['Años 1930', 'Louis F. Were', 'Vuelve a la postura de los pioneros'],
      ]) +
      `<p>Hoy la iglesia ha vuelto en gran parte a la postura de los pioneros.</p>` +
      hi('Sobre 11:30-36: «mucho de la historia» de esos versículos «se repetirá» (Carta 103, 1904). Y <i>El conflicto de los siglos</i> sigue el mismo orden de 11:40-12:3: herida sanada, fuerte pregón, tiempo de angustia, liberación.') +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 5-12; Carta 103, 1904.</p>` },

    { t: '🧭 El esquema de Daniel 11', capa: 'contexto', h:
      `<p><b>Cuándo:</b> la visión sigue la de Daniel 10, el tercer año de Ciro el Grande, hacia el 535 a.C. El versículo 1 es un paréntesis: recuerda lo que el ángel hizo en el primer año de Darío (538 a.C.).</p>` +
      `<p>El <b>cuarto rey</b> de 11:2 es <b>Jerjes I</b>, o Asuero (485-465 a.C.), el rey de Ester: el más rico, y el que levantó a todo su imperio contra Grecia (Salamina, 480 a.C.). Los tres anteriores son los que siguieron a Ciro: Cambises II, Bardiya (el falso Esmerdis, unos meses de 522 a.C.) y Darío I. Así el versículo 2 va del tercer año de Ciro a la muerte de Jerjes, unos setenta años.</p>` +
      tbl(['Versículos', 'Qué describe', 'En Daniel 8'], [
        ['11:2', 'Persia hasta Jerjes', '8:3-4'],
        ['11:3-4', 'Alejandro Magno y su reino partido en cuatro', '8:5-8'],
        ['11:5-15', 'Siria (norte) contra Egipto (sur)', '—'],
        ['11:16-28', 'Roma imperial', '8:9-10'],
        ['11:29-39', 'Roma papal, los 1.260 años', '8:11-12'],
        ['11:40-45', 'El tiempo del fin, desde 1798', '8:17, 19, 25'],
        ['12:1-3', 'Se levanta Miguel, angustia, liberación', '—'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 15-18; Bohr, <i>Daniel 1-10</i>, p. 357; Treiyer, <i>Enigmas descifrados</i>, p. 34 y 50-52.</p>` },

    { t: '🧭 Daniel 11 en el tiempo: los saltos del relato', capa: 'contexto', h:
      `<p>El capítulo no cuenta toda la historia. Salta lo que no aclara la visión de Daniel 7 y 8, y a veces vuelve atrás.</p>` +
      tbl(['Versículos', 'Qué cubre', 'Años'], [
        ['11:2', 'De Ciro el Grande a la muerte de Jerjes I', '536-465 a.C.'],
        ['11:3-4', 'Alejandro Magno y el reparto de su reino', '336-301 a.C.'],
        ['11:5-13 y 15', 'Los Tolomeos (sur) contra los seléucidas (norte)', '301-198 a.C.'],
        ['11:14', 'Un paréntesis: Roma entra en escena, y cae', '198 a.C.-476 d.C.'],
        ['11:16-20', 'Roma vence a los dos reyes, hasta César Augusto', '198 a.C.-14 d.C.'],
        ['11:21-39', 'Roma pasa de imperial a papal y domina 1.260 años (ver la tabla siguiente)', 'hasta 1798'],
        ['11:40-45', 'El tiempo del fin', 'desde 1798'],
      ]) +
      li([
        '<b>Entre 2 y 3</b> faltan unos 130 años: de Jerjes I (465 a.C.) a Alejandro (336 a.C.).',
        '<b>En 40</b> el relato vuelve atrás, a 1798: el mismo golpe de 11:29-30.',
      ]) +
      `<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 30-36.</p>` },

    { t: '🧭 Dónde termina Roma imperial y empieza Roma papal', capa: 'contexto', h:
      `<p>Hay dos maneras de dividir 11:16-39. Las dos ven el mismo orden: Roma imperial, Roma papal por 1.260 años y el tiempo del fin. Solo cambia dónde cae la línea.</p>` +
      tbl(['Versículos', 'División 16-28 / 29-39', 'División 16-20 / 21-39'], [
        ['16-20', 'Roma imperial', 'Roma imperial, hasta César Augusto'],
        ['21-28', 'Roma imperial', 'El papado crece y se impone al poder civil'],
        ['29-30', 'Roma papal', 'Roma papal, hasta el golpe de 1798'],
        ['31-39', 'Roma papal, 538-1798', 'La misma época, vista por su enseñanza; 31 vuelve al comienzo'],
      ]) +
      hi('Entre 21 y 28 la historia misma es un paso de una Roma a la otra: el emperador Constantino I se hace cristiano (312) y el poder pasa poco a poco al obispo de Roma, hasta Justiniano I (538). Por eso las dos divisiones caben en esos versos.') +
      `<p>En la división 16-20 / 21-39, entre 20 y 21 faltan siglos: de la muerte de Augusto (14 d.C.) a los obispos de Roma.</p>` +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 17; Treiyer, <i>Enigmas descifrados</i>, p. 31-36 y 90-92.</p>` },

    { t: '🧭 Daniel 11:3-13: los reyes, uno por uno', capa: 'contexto', h:
      tbl(['Verso', 'Cómo se cumplió'], [
        ['3', 'Alejandro Magno sube al trono en 336 a.C., con 20 años, y muere en 323 a.C.'],
        ['4', 'Sus hijos son asesinados. Tras la batalla de Ipso (301 a.C.) el reino queda en cuatro: Casandro, Lisímaco, Seleuco I Nicátor y Tolomeo I Sóter.'],
        ['5', 'El rey del sur es Tolomeo I Sóter. «Uno de sus príncipes», Seleuco I Nicátor, llega a ser más fuerte: domina del mar Egeo al río Indo.'],
        ['6', 'Berenice, hija de Tolomeo II Filadelfo, se casa con Antíoco II Teos. Laodice, la esposa repudiada, lo envenena; Berenice y su hijo mueren (246 a.C.).'],
        ['7-8', 'Tolomeo III Evergetes, hermano de Berenice, entra en Antioquía y vence a Seleuco II Calínico. Lleva a Egipto unos 2.500 ídolos: por eso lo llaman «Benefactor».'],
        ['9', 'Seleuco II Calínico ataca Egipto y vuelve derrotado (242 a.C.).'],
        ['10', '«Los hijos de aquél» son los dos hijos de Seleuco II: el mayor muere asesinado en 223 a.C.; el otro es Antíoco III el Grande.'],
        ['11-12', 'En Rafia, el 22 de junio de 217 a.C., Tolomeo IV Filopátor vence, pero no aprovecha la victoria.'],
        ['13', 'Antíoco III el Grande vuelve con un ejército mayor: vence en Gaza (201 a.C.) y en Panias (198 a.C.).'],
      ]) +
      `<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 52-64.</p>` },

    { t: '🧭 Daniel 11:14-20: entra Roma', capa: 'contexto', h:
      tbl(['Verso', 'Cómo se cumplió'], [
        ['14', 'Muchos se levantan contra el niño-rey Tolomeo V Epífanes. Los «hombres turbulentos» son, en hebreo, «los que quebrantan a tu pueblo»: los romanos. Se levantan «para que se cumpla la visión» de Daniel 7 y 8, y caen en 476 d.C.'],
        ['15', 'Antíoco III el Grande vence a Escopas, general de Egipto, y toma «la ciudad fuerte» en la costa de Gaza, Tiro y Sidón (198 a.C.).'],
        ['16', 'Roma vence a Antíoco III el Grande en Magnesia (190 a.C.). Siria es provincia romana en 64 a.C., y Judea, «la tierra gloriosa», en 63 a.C.'],
        ['17', 'Roma pacta con Tolomeo XII Auletes, que deja a sus hijos bajo su protección. La «hija» es Cleopatra VII. El reino de los Tolomeos no permanece: Egipto es provincia romana en 30 a.C.'],
        ['18', 'Julio César vuelve su rostro «a las costas»: las Galias y Britania. «Un príncipe», Pompeyo, le ordena volver a Roma como simple ciudadano.'],
        ['19', 'Julio César se hace dictador de por vida, pero cae asesinado el 15 de marzo de 44 a.C.'],
        ['20', 'César Augusto hace pasar «un cobrador de tributos»: el censo de Lucas 2:1-3, que lleva a José y María a Belén. Muere en paz en 14 d.C., «no con ira ni en batalla».'],
      ]) +
      `<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 64-73.</p>` },

    { t: '🧭 Daniel 11:21-30: el papado frente al poder civil', capa: 'contexto', h:
      `<p>Así se leen estos versos en la división 16-20 / 21-39 (ver arriba). Desde el v. 21 el norte y el sur ya no son lugares. El rey del norte es el poder religioso, el papado: como Babilonia, una religión falsa. El rey del sur es el poder civil, el Estado: como Egipto, que dijo «no conozco a Jehová» (Éxodo 5:2).</p>` +
      tbl(['Verso', 'Qué significa'], [
        ['21', 'El «hombre despreciable» no es el emperador Tiberio, sino el papado. Empieza pequeño, «sin aviso», y toma el reino «con halagos»: salvación sin arrepentimiento, por indulgencias y sacramentos.'],
        ['22', 'El «príncipe del pacto» es Cristo (8:25; 9:26). Muere en tiempos de Roma imperial. Más tarde Roma papal, unión de poder político y religioso, oculta su intercesión en el cielo.'],
        ['24', '«Esto durará un tiempo»: los 1.260 años. En 756 Pepino el Breve le da al papa las tierras de los Estados Pontificios, que pierde en 1870.'],
        ['29', '«Al tiempo señalado», en 1798, la venida al sur ya no es como la primera: esta vez el poder civil le gana.'],
        ['30', 'El rey del norte es Roma papal, en sus 1.260 años. Durante ese tiempo «se entenderá con los que abandonen el santo pacto»: los que dejan los Diez Mandamientos (Deuteronomio 4:13). Las «naves de Quitim» son el golpe que la hiere al final: la Francia de la Revolución, el mismo golpe de 11:40. Sus tropas entran en Roma el 10 de febrero de 1798; el 15 toman preso a Pío VI, que muere cautivo en Valence el 29 de agosto de 1799. Pero «volverá».'],
      ]) +
      `<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 76-115; Bohr, <i>Daniel 1-10</i>, p. 203; Bohr, <i>Daniel 11</i>, p. 17 y 226-229.</p>` },

    { t: '🧭 Daniel 11:31-39: palabras clave', capa: 'contexto', h:
      li([
        '<b>«El santuario y la fortaleza» (31).</b> En hebreo no hay «y»: es «el santuario fortaleza», el santuario del cielo, de donde le viene la fuerza al creyente (Hebreos 4:14-16).',
        '<b>«El sacrificio continuo» (31).</b> «Sacrificio» fue agregado. «Continuo» (hebreo <i>tamid</i>) sale 103 veces en el Antiguo Testamento, y solo en Daniel va sin sustantivo (8:11-13; 11:31; 12:11). Es la obra continua de Cristo, que intercede en el santuario del cielo (Hebreos 7:24-25).',
        '<b>«Lisonjas» (32).</b> Promesas fáciles: perdón sin arrepentimiento, indulgencias, la intercesión de los santos.',
        '<b>«Algunos días» (33).</b> Varios manuscritos hebreos dicen «muchos días»: los 1.260 años.',
        '<b>«Hasta el tiempo determinado» (35).</b> Hasta el tiempo del fin, en 1798.',
        '<b>«Repartirá tierras» (39).</b> El papa repartió tierras y reinos: en 1493 dividió las tierras de América entre España y Portugal. La Inquisición, fundada en 1232 por Gregorio IX, daba a los delatores los bienes de los condenados.',
      ]) +
      `<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 39, 120-130, 140 y 148-149.</p>` },

    { t: '🧭 Norte y sur: de lo literal a lo espiritual', capa: 'contexto', h:
      `<p>Un principio: hasta el año 34 d.C. (el fin de las setenta semanas), Israel, Jerusalén, Egipto y Babilonia son lugares literales. Después, el pueblo de Dios es la iglesia en todo el mundo, y sus enemigos también son sistemas mundiales. Por eso en 11:5-15 el norte es Siria y el sur es Egipto, pero en 11:40 ya no.</p>` +
      li([
        '<b>El norte es religión falsa.</b> El verdadero Rey del norte es Dios, en el monte de Sion, «a los lados del norte» (Salmo 48:2; Isaías 14:13). Babilonia siempre invadía a Israel desde el norte. El norte no niega a Dios: lo imita.',
        '<b>El sur es negar a Dios.</b> El faraón dijo: «¿Quién es Jehová...? Yo no conozco a Jehová» (Éxodo 5:2). De todas las naciones de la historia bíblica, Egipto fue la que con más osadía negó al Dios vivo (CS 312): eso es ateísmo.',
      ]) +
      wa('Edom, Moab y Amón ya no existen como naciones: en 11:40-45 no se puede leer un mapa literal.') +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 19-24 y 98-99; CS 312.</p>` },

    { t: '🧭 Daniel 11:31: las tropas de 508', capa: 'contexto', h:
      `<p>«Se levantarán sus tropas, que profanarán el santuario... quitarán el sacrificio continuo y pondrán la abominación desoladora» (11:31). «Tropas», en plural, son fuerzas militares o políticas: el rey del norte ya existía, pero ahora recibe el apoyo del estado.</p>` +
      hi('En el año <b>508</b>, Clodoveo I, rey de los francos, fue el primero en dar poder civil al papado. Francia fue la primera nación de Europa en dejar el paganismo por la religión católica. Es la unión de iglesia y estado: el hierro mezclado con barro de Daniel 2, Roma papal.') +
      `<p>Desde ese año se cuentan los 1.290 y los 1.335 días de Daniel 12:11-12 (ver Daniel 12).</p>` +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 25-26; Bohr, <i>Daniel 1-10</i>, p. 5.</p>` },

    { t: '🧭 Daniel 11:40-45', capa: 'contexto', h:
      `<p>Hay otras lecturas de estos versículos (ver la sección siguiente y la de arriba).</p>` +
      tbl(['Versículo', 'Qué representa'], [
        ['40a', 'En 1798 el rey del sur (la Francia revolucionaria y atea) hiere al rey del norte (el papado). Después, el comunismo hereda ese ateísmo.'],
        ['40b', 'El norte se recupera y vence al sur «como una tempestad», como el Éufrates desbordado: la caída del comunismo, con ayuda de Estados Unidos.'],
        ['41', 'Entra en la tierra gloriosa: Estados Unidos como baluarte de los principios protestantes. «Muchos caerán». Edom, Moab y Amón, parientes de Israel, escapan: el pueblo de Dios que estaba disperso, también en otras iglesias, y se reúne con el remanente.'],
        ['42-43', 'Egipto, Libia y Etiopía: el resto del mundo y sus riquezas quedan bajo su influencia.'],
        ['44', 'Las «noticias del oriente y del norte» son el fuerte pregón y el mensaje del sellamiento, que lo enfurecen.'],
        ['45', 'Pone sus tiendas para dar el golpe final contra el pueblo de Dios, y ahí «llegará a su fin, y no tendrá quien lo ayude».'],
      ]) +
      `<p>Daniel 3 y 6 son la base: la crisis final será por la adoración y la obediencia a Dios.</p>` +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 17-19, 98-117, 126, 134-136, 157-158 y 175; Bohr, <i>Daniel 1-10</i>, p. 43.</p>` },

    { t: '🧭 Daniel 11:40-45: más detalles', capa: 'contexto', h:
      li([
        '<b>La tierra gloriosa (41)</b> aparece a fines del siglo XVIII, guarda la Biblia en su pureza, después se aparta del pacto (11:30) y llega a ser la única superpotencia: Estados Unidos (Apocalipsis 13:11).',
        '<b>El acercamiento.</b> En 1939 Franklin D. Roosevelt manda un representante personal al Vaticano. El 7 de junio de 1982 Ronald Reagan y Juan Pablo II acuerdan en el Vaticano poner fin al comunismo. En 1983 el Congreso aprueba una embajada ante el Vaticano.',
        '<b>Libia y Etiopía (43).</b> Libia era sinónimo de pobreza, y Etiopía de riqueza: pobres y ricos quedan bajo su control económico (Apocalipsis 13:16-17).',
        '<b>Del oriente y del norte (44).</b> El oriente es el lado de Cristo (Mateo 24:27; Apocalipsis 7:2), y el norte, el de Dios (Salmo 48:2). Las noticias son los tres mensajes de Apocalipsis 14:6-12.',
        '<b>«Plantará las tiendas» (45)</b> es lenguaje militar: usará la fuerza. «No tendrá quien lo ayude» porque ya tiene todo el poder humano; la única ayuda tendría que venir del cielo, y de allí viene Miguel (12:1).',
      ]) +
      `<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 154-191.</p>` },

    { t: '🧭 Otras lecturas de 11:40-45', capa: 'contexto', h:
      li([
        '<b>En tres pasos</b>, con la misma lectura: primero cae el rey del sur del siglo XX, la <b>Unión Soviética</b>, por una alianza del Vaticano con Estados Unidos; segundo, Estados Unidos (la tierra gloriosa) queda bajo la influencia de Roma; tercero, el mundo (Egipto) y su economía.',
        '<b>Turquía.</b> Desde 1871 se leyó al rey del norte como Turquía, y por años se predicó así, con una batalla final en el Medio Oriente.',
        '<b>Sin cerrar los detalles.</b> Otros comentaristas prefieren no fijar el cumplimiento de cada detalle (ver arriba).',
      ]) +
      wa('La profecía habla de sistemas, no de personas: dentro de ese sistema hay muchas personas sinceras que aman a Dios de corazón.') +
      `<p>Fuente: Pippenger, <i>El tiempo del fin</i>, p. 21; Bohr, <i>Daniel 11</i>, p. 6-12 y 114-117; Bohr, <i>La gran cadena</i>, p. 7.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (1): norte, sur y ejércitos', capa: 'contexto', h:
      `<p>Hasta el año 34 el norte y el sur son Siria y Egipto. Después, la Biblia misma da su sentido:</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['El norte', 'El trono de Dios; el rey del norte falso es Babilonia: religión falsa que imita a Dios', 'Salmo 48:2; Isaías 14:13; Jeremías 1:14 (el mal venía del norte: Babilonia)'],
        ['El sur, Egipto', 'Negar a Dios: el ateísmo', 'Éxodo 5:2; Apocalipsis 11:8: la ciudad que «en sentido espiritual se llama Sodoma y Egipto»'],
        ['Inundación, tempestad (11:22, 40)', 'Ejércitos que invaden', 'Daniel 11:22: «barridas delante de él como por inundación de aguas»; Isaías 8:7-8'],
        ['Tropas (11:31)', 'El poder del Estado al servicio del rey del norte', 'Daniel 8:24: «su poder se fortalecerá, mas no con fuerza propia»; Apocalipsis 17:2'],
        ['Mares, aguas (11:45)', 'Pueblos y naciones', 'Apocalipsis 17:15: las aguas «son pueblos, muchedumbres, naciones y lenguas»'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 18-25 y 98-99; Bohr, <i>15 principios</i> 2:102 y 2:105-106; Bohr, <i>Daniel 1-10</i>, p. 345.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): el tiempo del fin', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Tierra gloriosa (11:41)', 'La tierra del pueblo de Dios. Antes, Israel; después de la cruz, el Israel espiritual. Hoy, Estados Unidos como baluarte protestante', 'Daniel 8:9; Gálatas 3:29; Romanos 2:28-29; Apocalipsis 13:11'],
        ['Edom, Moab y Amón', 'Parientes de Israel: el pueblo de Dios disperso que escapa', 'Génesis 19:36-38; 36:1; «escaparán» es la palabra de «será libertado» (12:1)'],
        ['Egipto, Libia y Etiopía (11:42-43)', 'El resto del mundo y sus riquezas', 'Apocalipsis 11:8 (Egipto en sentido espiritual)'],
        ['Noticias del oriente (11:44)', 'El mensaje del sellamiento', 'Apocalipsis 7:2: un ángel «que subía desde donde sale el sol y que tenía el sello del Dios vivo»'],
        ['Noticias del norte (11:44)', 'El fuerte pregón, que viene de Dios', 'Apocalipsis 18:1: «la tierra fue alumbrada con su gloria»; Salmo 48:2'],
        ['Monte glorioso y santo (11:45)', 'Sion: el pueblo de Dios reunido', 'Hebreos 12:22; Joel 2:32'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 18-21, 126, 134-136, 175 y 235; Bohr, <i>15 principios</i> 2:106.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '11:2', f: 'c', q: '¿Quién es el cuarto rey persa de Daniel 11:2, el más rico, que levantó a todos contra Grecia?', o: ['Jerjes I', 'Artajerjes I', 'Darío I', 'Cambises II'], a: 0, e: 'Los tres que siguieron a Ciro el Grande fueron Cambises II, Bardiya (el falso Esmerdis) y Darío I; el cuarto, Jerjes I, invadió Grecia en 480 a.C. Artajerjes I es el del decreto de 457 a.C., no el cuarto rey. Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 50-52.' },
    { t: 'mc', v: '11:40', f: 'c', q: '¿Qué representa el «rey del sur» en el tiempo del fin?', o: ['El ateísmo y el secularismo', 'El mundo islámico', 'El Imperio otomano', 'El protestantismo'], a: 0, e: 'Egipto fue la nación que negó al Dios vivo (Éxodo 5:2). En el tiempo del fin representa todo sistema que deja a Dios fuera. Fuente: Bohr, <i>Daniel 11</i>, p. 98-99.' },
    { t: 'mc', v: '11:40', f: 'c', q: '¿Qué hecho de 1798 cumple que «el rey del sur contenderá con él»?', o: ['Francia tomó preso al papa', 'Napoleón invadió Egipto', 'Rusia derrotó a Turquía', 'Inglaterra rompió con Roma'], a: 0, e: 'La Francia revolucionaria y atea hirió al papado: llevó cautivo a Pío VI. Así comenzó el tiempo del fin. Fuente: Bohr, <i>Daniel 11</i>, p. 105.' },
    { t: 'mc', v: '11:41', f: 'c', q: '¿Qué representa la «tierra gloriosa» de 11:41?', o: ['Estados Unidos como baluarte protestante', 'El actual Estado de Israel', 'La ciudad de Roma y el Vaticano', 'Palestina bajo los turcos'], a: 0, e: 'No es Estados Unidos solo como país, sino como el lugar fuerte de los principios protestantes, que los llevó al mundo. Fuente: Bohr, <i>Daniel 11</i>, p. 126.' },
    { t: 'mc', v: '11:41', f: 'c', q: '¿Qué representan Edom, Moab y Amón, que «escaparán de sus manos»?', o: ['Parientes de Israel que se unen al pueblo fiel', 'Naciones paganas que apoyan al rey del norte', 'Los países árabes del Medio Oriente', 'Los aliados del rey del sur'], a: 0, e: 'Eran parientes de Israel (Esaú y los hijos de Lot). Al final representan al pueblo de Dios disperso que escapa del rey del norte y se reúne con el remanente. Fuente: Bohr, <i>Daniel 11</i>, p. 134-136 y 157-158.' },
    { t: 'tf', v: '11:41', f: 'c', q: 'La palabra hebrea traducida «escaparán» en 11:41 es la misma que «será libertado» en 12:1.', a: true, e: 'Verdadero. Por eso los que escapan en 11:41 son los mismos que serán librados en el tiempo de angustia. Fuente: Bohr, <i>Daniel 11</i>, p. 136.' },
    { t: 'tf', v: '11:40', f: 'c', q: 'En 1871 cambió la lectura adventista del rey del norte: del papado pasó a Turquía.', a: true, e: 'Verdadero. Jaime White se opuso, y en los años 1930 Louis F. Were volvió a la postura de los pioneros. Fuente: Bohr, <i>Daniel 11</i>, p. 6-7 y 12.' },
    { t: 'mc', v: '11:40', f: 'c', q: '¿Qué evangelista australiano retomó en los años 1930 la postura de los pioneros sobre el rey del norte?', o: ['Louis F. Were', 'Guillermo Miller', 'Raymond Cottrell', 'Jaime White'], a: 0, e: 'Louis F. Were lo hizo con oposición y aun perdió sus credenciales; después Cottrell y LaRondelle siguieron su trabajo. Fuente: Bohr, <i>Daniel 11</i>, p. 12-13.' },
    { t: 'tf', v: '11:30', f: 'c', q: '«Mucho de la historia» de Daniel 11:30-36 «se repetirá».', a: true, e: 'Verdadero (Carta 103, 1904). No dice que la profecía se cumpla dos veces, sino que esa historia se repite. Fuente: Bohr, <i>Daniel 11</i>, p. 8-9.' },
    { t: 'mc', v: '11:31', f: 'c', q: '¿Qué rey dio en 508 poder civil al papado, cumpliendo «se levantarán sus tropas»?', o: ['Clodoveo, rey de los francos', 'Justiniano, emperador de Oriente', 'Carlomagno, emperador de Occidente', 'Teodorico, rey de los ostrogodos'], a: 0, e: 'Clodoveo I fue el primero en dar poder temporal al papado. Desde 508 se cuentan los 1.290 y 1.335 días. Fuente: Bohr, <i>Daniel 11</i>, p. 26.' },
    { t: 'mc', v: '11:44', f: 'c', q: '¿Qué son las «noticias del oriente y del norte» que atemorizan al rey del norte?', o: ['El fuerte pregón y el sellamiento', 'Guerras de Rusia y de China', 'Rebeliones en el Imperio turco', 'Nuevas cruzadas en Oriente'], a: 0, e: 'El remanente, con la lluvia tardía, proclama el fuerte pregón y el mensaje del sellamiento; eso lo enfurece y lo lleva a perseguirlo. Fuente: Bohr, <i>Daniel 11</i>, p. 175.' },
    { t: 'mc', v: '11:40', f: 'c', q: '¿Qué potencia del siglo XX fue el rey del sur vencido por el rey del norte?', o: ['La Unión Soviética', 'La Francia de Napoleón', 'El Imperio otomano', 'La Alemania nazi'], a: 0, e: 'Cayó por una alianza del Vaticano con Estados Unidos. El comunismo heredó el ateísmo de 1798. Fuente: Pippenger, <i>El tiempo del fin</i>, p. 21; Bohr, <i>Daniel 11</i>, p. 107-108.' },

    { t: 'mc', v: '11:40', f: 'c', q: '¿Qué texto muestra que en la profecía un río que inunda representa la invasión de un ejército?', o: ['Isaías 8:7-8', 'Génesis 7:11-12', 'Salmo 23:1-2', 'Juan 7:37-38'], a: 0, e: 'Isaías compara la invasión asiria con el Éufrates desbordado; así avanza el rey del norte en 11:40. Fuente: Bohr, <i>Daniel 11</i>, p. 18.' },
    { t: 'mc', v: '11:40', f: 'c', q: '¿Por qué el «norte» de Daniel 11 representa una religión que imita a Dios?', o: ['El trono de Dios está a los lados del norte', 'Roma queda al norte de Jerusalén', 'Los papas vinieron del norte de Europa', 'En el norte se adoraba al sol'], a: 0, e: 'Sion está a los lados del norte (Salmo 48:2) y Lucifer quiso sentarse allí (Isaías 14:13). El rey del norte falso no niega a Dios: usurpa su lugar. Fuente: Bohr, <i>Daniel 11</i>, p. 23.' },
    { t: 'tf', v: '11:41', f: 'c', q: 'Como Edom, Moab y Amón ya no existen como naciones, Daniel 11:40-45 no se puede leer como un mapa literal.', a: true, e: 'Verdadero. Después de la cruz, Israel es espiritual y mundial, y sus enemigos también. Fuente: Bohr, <i>Daniel 11</i>, p. 19-21.' },
    { t: 'mc', v: '11:44', f: 'c', q: '¿Con qué texto se explican las «noticias del oriente» de 11:44?', o: ['Apocalipsis 7:2, el ángel con el sello', 'Apocalipsis 13:11, la bestia de la tierra', 'Apocalipsis 12:3, el dragón escarlata', 'Apocalipsis 9:14, los cuatro ángeles'], a: 0, e: 'El ángel sube «desde donde sale el sol» con el sello del Dios vivo: es el mensaje del sellamiento. Fuente: Bohr, <i>Daniel 11</i>, p. 175 y 235.' },
    { t: 'mc', v: '11:3', f: 'c', q: '¿Cuántos años salta la profecía entre Jerjes I (11:2) y Alejandro Magno (11:3)?', o: ['Unos 130 años', 'Unos 30 años', 'Unos 300 años', 'Unos 70 años'], a: 0, e: 'De la muerte de Jerjes I (465 a.C.) a la subida de Alejandro (336 a.C.). La profecía deja fuera lo que no aclara la visión de Daniel 7 y 8. Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 30-31.' },
    { t: 'mc', v: '11:14', f: 'c', q: '¿Quiénes son los «hombres turbulentos» que se levantan «para que se cumpla la visión» (11:14)?', o: ['Los romanos', 'Los macabeos', 'Los egipcios', 'Los persas'], a: 0, e: 'En hebreo son «los que quebrantan a tu pueblo». Roma entra en las guerras de Egipto y Siria, cumple la visión de Daniel 7 y 8, y cae en 476 d.C. Otra lectura ve aquí a los macabeos. Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 64-66.' },
    { t: 'mc', v: '11:20', f: 'c', q: '¿Qué «cobrador de tributos» de 11:20 llevó a José y María a Belén?', o: ['El censo de César Augusto', 'El impuesto de Herodes', 'El diezmo del templo', 'El tributo de Julio César'], a: 0, e: 'César Augusto mandó empadronar a todos (Lucas 2:1-3) y murió en paz en 14 d.C., «no con ira ni en batalla». Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 71-73.' },
    { t: 'tf', v: '11:31', f: 'c', q: 'En Daniel 11:31 la palabra «sacrificio» no está en el hebreo: dice solo «el continuo».', a: true, e: 'Verdadero. En Daniel, «continuo» (<i>tamid</i>) va siempre sin sustantivo: es la obra continua de Cristo en el santuario del cielo. Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 39 y 128.' },
    { t: 'mc', v: '11:43', f: 'c', q: '¿Qué representan Libia y Etiopía, que siguen al rey del norte (11:43)?', o: ['Los pobres y los ricos', 'Los aliados del sur', 'Las naciones del islam', 'Las iglesias de África'], a: 0, e: 'Libia era sinónimo de pobreza, y Etiopía de riqueza. Todos quedan bajo su control económico (Apocalipsis 13:16-17). Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 154 y 182.' },
  ],
};
