/* Módulos transversales de repaso. No pertenecen a un capítulo:
   cruzan todo el material y son los que más rinden antes del examen. */

const tbl = (head, rows) =>
  `<table class="info-table"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>` +
  rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===0?' class="key"':''}>${c}</td>`).join('')}</tr>`).join('') +
  `</tbody></table>`;
const hi = t => `<div class="highlight-box">${t}</div>`;
const wa = t => `<div class="warn-box">${t}</div>`;
const vs = t => `<div class="verse-box">${t}</div>`;
const li = a => `<ul class="tight">${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;

const MODULOS = [
  { id:'m-linea', label:'Línea de tiempo', sub:'Del sitio de Jerusalén a Ciro',
    icono:'🕰️', color:'#0F766E', cats:['av','pa','gm'] },
  { id:'m-personajes', label:'Personajes', sub:'Tabla maestra de todos',
    icono:'👥', color:'#7C3AED', cats:['me','av','pa','gm'] },
  { id:'m-numeros', label:'Números', sub:'Todas las cifras del libro',
    icono:'🔢', color:'#B45309', cats:['me','av','pa','gm'] },
  { id:'m-trampas', label:'Trampas', sub:'Los errores más comunes',
    icono:'⚠️', color:'#BE123C', cats:['av','pa','gm'] },
  { id:'m-versiculos', label:'Versículos', sub:'Para memorizar palabra por palabra',
    icono:'📖', color:'#1D4ED8', cats:['me','av','pa','gm'] },
  { id:'m-reyes', label:'Los reyes', sub:'Cómo reacciona cada uno ante Dios',
    icono:'👑', color:'#A16207', cats:['gm'] },
  { id:'m-profetico', label:'Paralelos', sub:'Daniel 2 y los imperios',
    icono:'🗿', color:'#0369A1', cats:['gm'] },
  { id:'m-lugares', label:'Lugares', sub:'Geografía del libro',
    icono:'🗺️', color:'#15803D', cats:['me','av','pa','gm'] },
  { id:'m-version', label:'RV1995 vs RV1960', sub:'Palabras que cambian entre versiones',
    icono:'📕', color:'#9D174D', cats:['av','pa','gm'] },
  { id:'m-prioridades', label:'Lo que más preguntan', sub:'Los diez temas de mayor rendimiento',
    icono:'🎯', color:'#B91C1C', cats:['av','pa','gm'] },
  { id:'m-palabras', label:'Palabras difíciles', sub:'Qué significan en palabras sencillas',
    icono:'💬', color:'#0E7490', cats:['me','av','pa','gm'] },
];

const CONT_MODULOS = {

/* ═══════════ LÍNEA DE TIEMPO ═══════════ */
'm-linea': [
  { t:'🕰️ Secuencia de los seis capítulos', h:
    tbl(['Cuándo','Qué ocurre','Cap.'],[
      ['Año 3 de Joacim','Nabucodonosor sitia Jerusalén; se llevan a Daniel y sus compañeros','1'],
      ['Tres años después','Los cuatro se presentan ante el rey; diez veces mejores','1'],
      ['Año 2 de Nabucodonosor','El sueño de la gran imagen','2'],
      ['Sin fecha indicada','La estatua de oro en el campo de Dura y el horno','3'],
      ['Al final de su reinado','El sueño del árbol; siete tiempos de locura','4'],
      ['Última noche de Babilonia','El banquete de Belsasar y la escritura en la pared','5'],
      ['Bajo el reino de Darío','El decreto de treinta días y el foso de los leones','6'],
      ['Año 1 de Ciro','Hasta aquí continuó Daniel (mencionado en 1:21)','1'],
    ]) },

  { t:'⏳ Detalle importante del orden', h:
    wa(`El capítulo 1 <strong>termina mencionando el año primero de Ciro</strong> (1:21),
    que es <u>posterior</u> a todo lo que se narra en los capítulos 2 al 6.<br><br>
    Es un resumen anticipado, no un error de orden. Daniel sirvió bajo
    <strong>Nabucodonosor, Belsasar, Darío y Ciro</strong> — cuatro reinados.`) },

  { t:'👴 La edad de Daniel', h:
    hi(`Daniel era <strong>un muchacho</strong> cuando llegó a Babilonia (cap. 1)
    y <strong>un anciano de más de ochenta años</strong> cuando fue echado al foso (cap. 6).<br><br>
    <strong>Lo que decidió de joven fue lo que lo sostuvo de viejo.</strong>
    Ese contraste es la lección central del libro y aparece en las preguntas de aplicación.`) },
],

/* ═══════════ PERSONAJES ═══════════ */
'm-personajes': [
  { t:'👥 Todos los personajes del libro', h:
    tbl(['Nombre','Quién es','Dónde aparece'],[
      ['Joacim','Rey de Judá cuando cae Jerusalén','1:1-2'],
      ['Nabucodonosor','Rey de Babilonia; protagonista de los caps. 1 al 4','1 – 4'],
      ['Aspenaz','Jefe de los eunucos; recibió la orden del rey','1:3'],
      ['Melsar','Sirviente puesto sobre Daniel y sus tres compañeros','1:11, 16'],
      ['Daniel / Beltsasar','El profeta; nombre babilónico Beltsasar','1 – 6'],
      ['Ananías / Sadrac','Compañero de Daniel','1 – 3'],
      ['Misael / Mesac','Compañero de Daniel','1 – 3'],
      ['Azarías / Abed-nego','Compañero de Daniel','1 – 3'],
      ['Arioc','Capitán de la guardia del rey','2:14-15, 24-25'],
      ['El vigilante santo','Ser celestial que anuncia el juicio del árbol','4:13, 23'],
      ['Belsasar','Rey de Babilonia en la última noche','5'],
      ['La reina','Entra al banquete y recuerda a Daniel','5:10-12'],
      ['Darío de Media','Recibe el reino; tenía 62 años','5:31; 6'],
      ['Ciro','Rey persa; hasta su año primero sirvió Daniel','1:21'],
    ]) },

  { t:'🔀 Los pares que se confunden', h:
    wa(`<strong>Aspenaz y Melsar</strong><br>
    Aspenaz = jefe de los eunucos, recibió la orden del rey (1:3).<br>
    Melsar = el sirviente que Aspenaz puso sobre los cuatro (1:11).<br>
    Daniel habló <u>primero</u> con Aspenaz (1:8) y <u>después</u> con Melsar (1:11).`) +
    wa(`<strong>Beltsasar y Belsasar</strong><br>
    Beltsasar = el nombre babilónico de <u>Daniel</u> (1:7).<br>
    Belsasar = el <u>rey</u> del banquete y la escritura en la pared (cap. 5).<br>
    Son dos personas distintas, y los nombres se parecen a propósito en el examen.`) +
    wa(`<strong>Darío y Ciro</strong><br>
    Darío de Media recibió el reino a los 62 años (5:31) y firmó el decreto del cap. 6.<br>
    Ciro es el rey persa mencionado solo en 1:21.`) },
],

/* ═══════════ NÚMEROS ═══════════ */
'm-numeros': [
  { t:'🔢 Cifras de Daniel 1 al 3', h:
    tbl(['Número','A qué se refiere','Ref.'],[
      ['3','Año del reinado de Joacim cuando cae Jerusalén','1:1'],
      ['3','Años de educación de los jóvenes','1:5'],
      ['4','Jóvenes hebreos escogidos','1:6'],
      ['10','Días de la prueba de las legumbres','1:12'],
      ['10','Veces mejores que los magos y astrólogos','1:20'],
      ['1','Año de Ciro, hasta donde sirvió Daniel','1:21'],
      ['2','Año del reinado de Nabucodonosor: el sueño','2:1'],
      ['60','Codos de altura de la estatua de oro','3:1'],
      ['6','Codos de anchura de la estatua de oro','3:1'],
      ['6','Instrumentos musicales en la lista','3:5'],
      ['7','Veces más caliente el horno','3:19'],
      ['4','Varones vistos en el horno','3:25'],
    ]) },

  { t:'🔢 Cifras de Daniel 4 al 6', h:
    tbl(['Número','A qué se refiere','Ref.'],[
      ['7','Tiempos de la locura de Nabucodonosor','4:25'],
      ['12','Meses entre la advertencia y el juicio','4:29'],
      ['1000','Príncipes en el banquete de Belsasar','5:1'],
      ['3','El puesto ofrecido: tercer señor del reino','5:7'],
      ['62','Años de Darío al recibir el reino','5:31'],
      ['120','Sátrapas sobre el reino','6:1'],
      ['3','Gobernadores sobre los sátrapas','6:2'],
      ['30','Días del decreto de Darío','6:7'],
      ['3','Veces al día que oraba Daniel','6:10'],
    ]) },

  { t:'🎯 Los que más se preguntan', h:
    hi(`Si solo alcanzas a memorizar seis, que sean estos:<br><br>
    <strong>3</strong> años de educación &nbsp;·&nbsp; <strong>10</strong> días de prueba &nbsp;·&nbsp;
    <strong>10</strong> veces mejores<br>
    <strong>60 × 6</strong> codos la estatua &nbsp;·&nbsp; <strong>7</strong> veces el horno &nbsp;·&nbsp;
    <strong>3</strong> veces al día la oración`) },

  { t:'🧠 Truco para no confundirlos', h:
    hi(`<strong>El 3 aparece cinco veces</strong> y en cosas distintas:
    año de Joacim, años de educación, gobernadores, tercer señor del reino,
    y veces al día que oraba Daniel.<br><br>
    <strong>El 7 aparece dos veces:</strong> veces más caliente el horno (3:19)
    y tiempos de la locura (4:25).<br><br>
    <strong>Regla:</strong> el 60 y el 6 van juntos (la estatua), el 120 y el 3 van juntos
    (sátrapas y gobernadores), el 62 es solo de Darío.`) },
],

/* ═══════════ TRAMPAS ═══════════ */
'm-trampas': [
  { t:'⚠️ Errores comunes — Daniel 1 al 3', h:
    tbl(['Se suele decir','Pero el texto dice','Ref.'],[
      ['«más rozagante»','<strong>mejor y más robusto</strong>','1:15'],
      ['«ágiles en sabiduría»','<strong>instruidos</strong> en toda sabiduría','1:4'],
      ['«sin defecto»','en quienes no hubiera <strong>tacha alguna</strong>','1:4'],
      ['Aspenaz aceptó la prueba','fue <strong>Melsar</strong> quien la aceptó','1:11-14'],
      ['La cabeza era de plata','la cabeza era de <strong>oro fino</strong>','2:32'],
      ['Golpeó la cabeza','hirió la imagen <strong>en sus pies</strong>','2:34'],
      ['Aparece la trompeta','<strong>no aparece</strong> en la lista de seis','3:5'],
      ['Los desnudaron','entraron con <strong>mantos, calzas, turbantes y vestidos</strong>','3:21'],
      ['«no olían a humo»','<strong>ni olor de fuego había en ellos</strong>','3:27'],
    ]) },

  { t:'⚠️ Errores comunes — Daniel 4 al 6', h:
    tbl(['Se suele decir','Pero el texto dice','Ref.'],[
      ['Atadura de hierro y oro','atadura de <strong>hierro y de bronce</strong>','4:15, 23'],
      ['El rey vio la mano completa','vio <strong>los dedos</strong> de mano de hombre','5:5'],
      ['Frente al trono','<strong>delante del candelero</strong>','5:5'],
      ['MENE una vez','<strong>MENE, MENE</strong> — se repite dos veces','5:25'],
      ['Segundo señor del reino','<strong>tercer</strong> señor en el reino','5:7'],
      ['Los magos recordaron a Daniel','fue <strong>la reina</strong>','5:10-12'],
      ['Cien sátrapas','<strong>ciento veinte</strong> sátrapas','6:1'],
      ['Solo el anillo del rey','el anillo del rey <strong>y el de sus príncipes</strong>','6:17'],
      ['El rey durmió intranquilo','<strong>se le fue el sueño</strong>; no durmió','6:18'],
      ['Daniel dejó de orar','siguió <strong>como lo solía hacer antes</strong>','6:10'],
    ]) },

  { t:'🎭 Distractores típicos del examen', h:
    wa(`Las opciones incorrectas suelen ser <strong>casi verdaderas</strong>:<br><br>
    • Cambian un número por otro que sí aparece en el libro (7 por 3, 60 por 6)<br>
    • Cambian un nombre por otro parecido (Beltsasar por Belsasar)<br>
    • Cambian una palabra del versículo por un sinónimo (robusto por rozagante)<br>
    • Ponen «todas las anteriores» cuando solo dos son ciertas<br><br>
    <strong>Estrategia:</strong> lee la pregunta completa antes de ver las opciones,
    y responde mentalmente primero. Si tu respuesta no está tal cual, sospecha.`) },
],

/* ═══════════ VERSÍCULOS ═══════════ */
'm-versiculos': [
  { t:'📖 Daniel 1:8 — La decisión', h:
    vs(`«Y Daniel <strong>propuso en su corazón</strong> no contaminarse con la porción
    de la comida del rey, ni con el vino que él bebía; pidió, pues, al jefe de los eunucos
    que no se le obligase a contaminarse.»`) },

  { t:'📖 Daniel 1:15 — El resultado', h:
    vs(`«Y al cabo de los diez días pareció el rostro de ellos
    <strong>mejor y más robusto</strong> que el de los otros muchachos
    que comían de la porción de la comida del rey.»`) },

  { t:'📖 Daniel 2:20 — La alabanza', h:
    vs(`«Sea bendito el nombre de Dios de siglos en siglos,
    porque suyos son <strong>el poder y la sabiduría</strong>.»`) },

  { t:'📖 Daniel 3:17-18 — «Y si no»', h:
    vs(`«He aquí nuestro Dios a quien servimos <strong>puede librarnos</strong>
    del horno de fuego ardiendo; y de tu mano, oh rey, nos librará.
    <strong>Y si no</strong>, sepas, oh rey, que no serviremos a tus dioses,
    ni tampoco adoraremos la estatua que has levantado.»`) },

  { t:'📖 Daniel 3:25 — El cuarto varón', h:
    vs(`«He aquí yo veo <strong>cuatro varones sueltos</strong>,
    que se pasean en medio del fuego, y ningún daño hay en ellos;
    y el aspecto del cuarto es <strong>semejante a un hijo de los dioses</strong>.»`) },

  { t:'📖 Daniel 4:37 — El rey humillado', h:
    vs(`«Ahora yo Nabucodonosor <strong>alabo, engrandezco y glorifico al Rey del cielo</strong>,
    porque todas sus obras son verdaderas, y sus caminos justos;
    y él puede humillar a los que andan con soberbia.»`) },

  { t:'📖 Daniel 5:27 — La balanza', h:
    vs(`«TEKEL: <strong>Pesado has sido en balanza, y fuiste hallado falto</strong>.»`) },

  { t:'📖 Daniel 6:10 — La costumbre', h:
    vs(`«Cuando Daniel supo que el edicto había sido firmado, entró en su casa;
    abiertas las ventanas de su habitación que daban a Jerusalén,
    <strong>se arrodillaba tres veces al día</strong>, y oraba y daba gracias delante de su Dios,
    <strong>como lo solía hacer antes</strong>.»`) },

  { t:'📖 Daniel 6:22 — El ángel', h:
    vs(`«<strong>Mi Dios envió su ángel</strong>, el cual cerró la boca de los leones,
    para que no me hiciesen daño, porque ante él fui hallado inocente;
    y aun delante de ti, oh rey, yo no he hecho nada malo.»`) },

  { t:'📖 Daniel 6:26-27 — El decreto de Darío', h:
    vs(`«Porque él es el <strong>Dios viviente y permanece por todos los siglos</strong>,
    y su reino no será jamás destruido, y su dominio perdurará hasta el fin.
    Él <strong>salva y libra</strong>, y hace señales y maravillas en el cielo y en la tierra.»`) },
],

/* ═══════════ LOS REYES ═══════════ */
'm-reyes': [
  { t:'👑 Cómo reacciona cada rey ante Dios', h:
    tbl(['Rey','Qué ve de Dios','Cómo responde'],[
      ['Nabucodonosor (cap. 2)','El sueño interpretado','Se postra ante Daniel y reconoce al Dios de los dioses'],
      ['Nabucodonosor (cap. 3)','El milagro del horno','Bendice a Dios y prohíbe blasfemar contra él'],
      ['Nabucodonosor (cap. 4)','Su propia humillación y restauración','Alaba, engrandece y glorifica al Rey del cielo'],
      ['Belsasar (cap. 5)','La escritura en la pared','Se aterra, viste a Daniel de púrpura, pero <strong>no se arrepiente</strong>'],
      ['Darío (cap. 6)','La liberación del foso','Decreta que todos teman al Dios de Daniel'],
    ]) },

  { t:'📈 El contraste central del libro', h:
    hi(`<strong>Nabucodonosor</strong> tuvo tres encuentros con Dios y en cada uno
    fue más lejos, hasta terminar adorándolo de verdad.<br><br>
    <strong>Belsasar</strong> tuvo <u>toda esa historia disponible</u>
    y no se movió. Murió esa misma noche.<br><br>
    El libro muestra que <strong>lo decisivo no es cuánta luz recibes,
    sino qué haces con ella</strong>.`) },

  { t:'⚖️ Preguntas de comparación', h:
    wa(`Estas suelen aparecer como pregunta de aplicación:<br><br>
    • ¿Cuál rey terminó adorando al Dios verdadero? → <strong>Nabucodonosor</strong><br>
    • ¿Cuál tenía más luz y aun así se rebeló? → <strong>Belsasar</strong><br>
    • ¿Cuál intentó salvar a Daniel hasta la puesta del sol? → <strong>Darío</strong><br>
    • ¿Cuál emitió un decreto a favor del Dios de los hebreos? → <strong>Nabucodonosor (3:29) y Darío (6:26)</strong>`) },
],

/* ═══════════ PARALELOS PROFÉTICOS ═══════════ */
'm-profetico': [
  { t:'🗿 La imagen de Daniel 2, completa', h:
    tbl(['Parte','Material','Reino','Texto'],[
      ['Cabeza','Oro fino','Babilonia','2:32, 37-38'],
      ['Pecho y brazos','Plata','Medo-Persia','2:32, 39'],
      ['Vientre y muslos','Bronce','Grecia','2:32, 39'],
      ['Piernas','Hierro','Roma','2:33, 40'],
      ['Pies y dedos','Hierro y barro','Reinos divididos','2:33, 41-43'],
      ['La piedra','Cortada sin manos','Reino eterno de Dios','2:34, 44-45'],
    ]) },

  { t:'🔍 Por qué cada metal', h:
    hi(`El valor <strong>baja</strong> del oro al barro, pero la <strong>dureza sube</strong>
    del oro al hierro.<br><br>
    Los imperios se vuelven más fuertes militarmente y menos gloriosos.
    Los pies mezclan hierro con barro: fuerza y fragilidad juntas,
    <strong>«no se unirán el uno con el otro»</strong> (2:43).`) },

  { t:'🪨 Lo que dice el texto sobre la piedra', h:
    vs(`«En los días de estos reyes, el Dios del cielo levantará <strong>un reino
    que no será jamás destruido</strong>, ni será el reino dejado a otro pueblo;
    desmenuzará y consumirá a todos estos reinos, pero él permanecerá para siempre.» (2:44)`) },

  { t:'🔗 Conexión entre el capítulo 3 y el 2', h:
    hi(`Nabucodonosor oyó que él era <strong>solo la cabeza de oro</strong> (2:38),
    o sea que su reino terminaría.<br><br>
    Su respuesta en el capítulo 3 fue hacer una estatua
    <strong>toda de oro</strong> — no solo la cabeza.<br><br>
    Fue una <u>respuesta de orgullo</u> a la profecía: quiso declarar que su reino
    no pasaría. Ese detalle conecta los dos capítulos y suele preguntarse.`) },
],

/* ═══════════ LUGARES ═══════════ */
'm-lugares': [
  { t:'🗺️ Los lugares del libro', h:
    tbl(['Lugar','Qué pasó allí','Ref.'],[
      ['Jerusalén','Ciudad sitiada; hacia allá oraba Daniel','1:1; 6:10'],
      ['Tierra de Sinar','A donde fueron llevados los utensilios del templo','1:2'],
      ['Babilonia','La capital y todo el escenario del libro','1 – 6'],
      ['Campo de Dura','Donde se levantó la estatua de oro','3:1'],
      ['Palacio real','Donde apareció la escritura en la pared','5:5'],
      ['El foso de los leones','Donde fue echado Daniel','6:16'],
    ]) },

  { t:'🧭 El detalle de las ventanas', h:
    hi(`Daniel oraba con las ventanas abiertas <strong>hacia Jerusalén</strong> (6:10),
    a más de mil kilómetros de distancia y con el templo ya destruido.<br><br>
    No oraba hacia un edificio: oraba hacia la <strong>promesa de Dios</strong>
    sobre ese lugar. Ese matiz aparece en las preguntas de aplicación.`) },
],

/* ═══════════ RV1995 vs RV1960 ═══════════ */
'm-version': [
  { t:'📕 Por qué importa esta lista', h:
    wa(`El examen se califica sobre la <strong>Reina Valera 1995</strong>. La RV1960
    es la que más se oye en la iglesia, y en varios versículos famosos usa
    <strong>otras palabras</strong>. Si respondes con la RV1960 donde piden RV1995,
    la idea es correcta pero la palabra no.<br><br>
    Regla: <strong>si la pregunta dice «según la RV1995», usa la columna de la izquierda.</strong>`) },

  { t:'🔤 Palabra por palabra — Daniel 1 al 3', h:
    tbl(['Ref.','RV1995 (la que se califica)','RV1960 (la que suena familiar)'],[
      ['1:15','pareció el rostro de ellos <strong>mejor y más robusto</strong>','más <strong>rozagante</strong> y más robusto'],
      ['2:5','vuestras casas serán convertidas en <strong>estercoleros</strong>','convertidas en <strong>muladares</strong>'],
      ['3:5','el son de la bocina, la flauta, <strong>la cítara</strong>, el arpa, el salterio, la zampoña','de la bocina, de la flauta, <strong>del tamboril</strong>...'],
      ['3:25','el aspecto del cuarto es semejante a <strong>un hijo de los dioses</strong>','semejante a hijo de los dioses'],
      ['3:27','el fuego <strong>no había tenido poder alguno</strong> sobre sus cuerpos; sus ropas, <strong>intactas</strong>','el fuego <strong>no se enseñoreó</strong>; sus vestidos <strong>no se alteraron</strong>'],
      ['3:29','su casa convertida en <strong>estercolero</strong>','su casa puesta por <strong>muladar</strong>'],
    ]) },

  { t:'🔤 Palabra por palabra — Daniel 4 al 6', h:
    tbl(['Ref.','RV1995 (la que se califica)','RV1960 (la que suena familiar)'],[
      ['4:27','<strong>redime tus pecados</strong> con justicia... misericordias <strong>con</strong> los oprimidos','tus pecados <strong>redime</strong> con justicia... <strong>para con</strong> los oprimidos'],
      ['5:27','Pesado has sido en balanza <strong>y hallado falto</strong>','y <strong>fuiste</strong> hallado falto'],
      ['6:4','ningún <strong>error</strong> ni falta <strong>hallaron</strong> en él','ningún <strong>vicio</strong> ni falta <strong>fue hallado</strong> en él'],
      ['6:5','no hallaremos contra este Daniel <strong>motivo alguno para acusarlo</strong>','<strong>ocasión alguna</strong>'],
      ['6:10','las ventanas de su <strong>habitación</strong>','las ventanas de su <strong>cámara</strong>'],
      ['6:22','para que no me <strong>hicieran</strong> daño','para que no me <strong>hiciesen</strong> daño'],
    ]) },

  { t:'✝️ El caso especial de Daniel 3:25', h:
    hi(`Esta es la trampa más fina de todo el material, y hay que entender el
    mecanismo, no memorizar la respuesta.<br><br>
    <strong>Quién habla:</strong> el que describe al cuarto varón es
    <strong>Nabucodonosor</strong>, un rey pagano que adoraba muchos dioses.
    Él dijo lo que su mente pagana podía nombrar: «semejante a
    <strong>un hijo de los dioses</strong>» (3:25).<br><br>
    <strong>Quién lo identifica:</strong> Elena de White, en
    <strong>P&amp;R cap. 41</strong>, dice que ese cuarto era
    <strong>el Hijo de Dios mismo</strong>.<br><br>
    Las dos cosas son ciertas y no se contradicen: una es lo que el rey
    <em>vio y dijo</em>; la otra es lo que la inspiración <em>revela</em>.`) +
    tbl(['Si la pregunta dice...','Responde'],[
      ['«según Daniel 3:25»','semejante a <strong>un hijo de los dioses</strong>'],
      ['«según P&amp;R cap. 41»','<strong>el Hijo de Dios</strong> mismo'],
    ]) },

  { t:'📗 Títulos de Profetas y Reyes — verificados', h:
    wa(`Circulan listas equivocadas de estos títulos. Estos son los del índice
    del libro:`) +
    tbl(['Cap.','Título exacto','Con qué va'],[
      ['39','En la corte de Babilonia','Daniel 1'],
      ['40','El sueño de Nabucodonosor','Daniel 2'],
      ['41','El horno de fuego','Daniel 3'],
      ['42','La verdadera grandeza','Daniel 4'],
      ['43','El vigía invisible','Daniel 5'],
      ['44','En el foso de los leones','Daniel 6'],
    ]) +
    hi(`Los tres que más se equivocan: el <strong>41</strong> no es «La imagen de
    oro y el horno de fuego», el <strong>42</strong> no es «Nabucodonosor
    humillado», y el <strong>43</strong> no es «La escritura en la pared».`) },
],

/* ═══════════ LO QUE MÁS PREGUNTAN ═══════════ */
'm-prioridades': [
  { t:'🎯 Si solo te queda una hora, estudia esto', h:
    wa(`Estos diez temas son los que más aparecen en los concursos de Daniel.
    Están ordenados por rendimiento: el primero da más puntos que el último.`) +
    hi(`<strong>Lo que sí sabemos del examen del campamento:</strong> tiene tres
    secciones — selección múltiple, verdadero o falso, y completar el
    versículo — y se califica sobre la <strong>RV1995</strong>.<br>
    <strong>Lo que no sabemos:</strong> cuántas preguntas trae ni cuántas por
    sección. Por eso conviene practicar con exámenes de distintos tamaños en
    vez de acostumbrarse a uno solo.`) },

  { t:'1️⃣ al 5️⃣ — Los de mayor peso', h:
    li([
      '<strong>Los números exactos.</strong> 3 años de instrucción · 10 días de prueba · 10 veces mejores · 2.º año de Nabucodonosor · 60 y 6 codos · 7 veces el horno · 4 varones · 7 tiempos · 12 meses · 1.000 convidados · 62 años Darío · 120 sátrapas · 30 días el decreto · 3 veces al día',
      '<strong>Nombres hebreos → babilónicos.</strong> Daniel→Beltsasar · Ananías→Sadrac · Misael→Mesac · Azarías→Abed-nego',
      '<strong>Aspenaz no es Melsar.</strong> Aspenaz = jefe de los eunucos (1:3). Melsar = el sirviente puesto sobre los cuatro (1:11). Daniel habló con <u>Melsar</u>',
      '<strong>Los 6 instrumentos en orden</strong> (3:5, RV1995): bocina, flauta, <u>cítara</u>, arpa, salterio, zampoña. <u>La trompeta no aparece</u>. Cuidado: la RV1960 dice «tamboril» en el tercer lugar',
      '<strong>MENE, MENE, TEKEL, UPARSIN</strong> (5:25) y el significado de cada palabra: contó · pesado y hallado falto · roto y dado a medos y persas',
    ]) },

  { t:'6️⃣ al 🔟 — Los que deciden el desempate', h:
    li([
      '<strong>El cuarto del horno.</strong> Daniel 3:25 (RV1995): «semejante a un hijo de los dioses», así lo dijo el rey pagano. P&amp;R 41: era el Hijo de Dios mismo. Fíjate qué te preguntan',
      '<strong>Títulos de P&amp;R 39 al 44 en orden:</strong> En la corte de Babilonia · El sueño de Nabucodonosor · El horno de fuego · La verdadera grandeza · El vigía invisible · En el foso de los leones',
      '<strong>Los materiales de la estatua y sus imperios</strong> (2:32-45): oro, plata, bronce, hierro, hierro con barro, y la piedra',
      '<strong>El año de cada evento:</strong> 3.er año de Joacim (cap. 1) · 2.º año de Nabucodonosor (cap. 2) · año 1.º de Ciro (1:21)',
      '<strong>Los versículos de completar:</strong> 1:15 · 2:20 · 3:18 · 4:37 · 6:10 · 6:22 · 6:26-27',
    ]) },

  { t:'📅 Plan de siete semanas hasta el campamento', h:
    wa(`El campamento de Aventureros es el <strong>9 de octubre de 2026</strong>.
    Hay siete semanas, y la dificultad sube de a poco: primero los datos,
    después las palabras exactas, al final los simulacros.
    La app muestra en «Qué estudiar hoy» en qué semana vas.`) +
    tbl(['Semana','Foco','Qué hacer'],[
      ['1','Conocer el material','Leer capítulo por capítulo sin apuro. Exámenes de <strong>nivel 1</strong> para fijar nombres, números y lugares.'],
      ['2','Fijar los datos','Terminar todos los capítulos y los repasos. Tarjetas todos los días, aunque sean diez minutos.'],
      ['3','Entrar a lo literal','Empiezan las citas exactas. Módulo RV1995 vs RV1960. Exámenes de <strong>nivel 2</strong>.'],
      ['4','Dominar las trampas','Módulos de Trampas y de RV1995 vs RV1960. Repasar errores hasta vaciar la lista.'],
      ['5','Precisión palabra por palabra','Completar el versículo, <strong>nivel 3</strong>. Aquí se decide el concurso.'],
      ['6','Simulacros','Exámenes cronometrados sin pistas, con las tres secciones. Practicar con distintos tamaños: no sabemos cuántas preguntas trae el examen real.'],
      ['7','Afinar y descansar','Solo errores pendientes y este módulo. Dormir bien la noche anterior.'],
    ]) +
    hi(`Regla de las sesiones: <strong>cortas y seguidas</strong> rinde más que
    una jornada larga. Veinte minutos diarios de tarjetas ganan a dos horas
    el sábado.`) },

  { t:'🧠 Cómo responder cuando dudas', h:
    hi(`• Si la pregunta cita un versículo, la respuesta está en <u>las palabras
    exactas</u> de ese versículo, no en la idea general.<br>
    • Si dice «según la RV1995», descarta la opción que suene a como lo has
    oído en la iglesia: suele ser la RV1960.<br>
    • Si dice «según Profetas y Reyes», la respuesta es la <u>explicación</u> de
    Elena de White, no el dato bíblico.<br>
    • En verdadero o falso, un solo detalle cambiado hace falsa toda la frase:
    lee los números y los nombres dos veces.`) },
],

/* ═══════════ PALABRAS DIFÍCILES ═══════════ */
'm-palabras': [
  { t:'💬 Para qué es esta lista', h:
    wa(`El examen usa las palabras del libro, no palabras fáciles. Aquí están
    explicadas en sencillo, <strong>sin cambiarlas</strong>: hay que entenderlas
    y también reconocerlas cuando aparezcan tal cual en una opción.`) },

  { t:'📖 Palabras del texto bíblico', h:
    tbl(['Palabra','Qué significa','Dónde sale'],[
      ['Sitiar','Rodear una ciudad con el ejército para que no entre ni salga nadie','1:1'],
      ['Eunuco','Funcionario de confianza del palacio del rey','1:3'],
      ['Tacha','Defecto, algo que esté mal en el cuerpo o en la persona','1:4'],
      ['Idóneo','Que sirve para algo, que tiene lo que se necesita','1:4'],
      ['Legumbres','Comida que viene de plantas: granos, verduras','1:12'],
      ['Robusto','Fuerte y sano de cuerpo','1:15'],
      ['Astrólogo','El que dice adivinar mirando las estrellas','1:20'],
      ['Estercolero','Basurero, montón de desperdicios. Era la peor humillación','2:5; 3:29'],
      ['Tamo','La cascarilla del trigo, tan liviana que se la lleva el viento','2:35'],
      ['Desmenuzar','Romper algo en pedacitos muy pequeños','2:34-35'],
      ['Sátrapa','Gobernador de una provincia del reino','6:1'],
      ['Edicto / decreto','Una ley que el rey firma y todos deben obedecer','6:8'],
      ['Abrogar','Cancelar una ley, dejarla sin efecto','6:8'],
      ['Vigilante','Un ser del cielo que anuncia lo que Dios ha decidido','4:13'],
      ['Lesión','Herida o daño en el cuerpo','6:23'],
    ]) },

  { t:'📗 Palabras de Profetas y Reyes', h:
    tbl(['Palabra','Qué significa'],[
      ['Temperante','Que se domina, que no se pasa en la comida ni en la bebida'],
      ['Embotar','Poner torpe, dejar la mente lenta y sin filo'],
      ['Dominio propio','Poder controlarse a sí mismo'],
      ['Intachable','Que no tiene ninguna falta que se le pueda señalar'],
      ['Integridad','Ser el mismo en público y a solas'],
      ['Soberbia / arrogancia','Creerse más que los demás y más que Dios'],
      ['Iniquidad','Maldad, hacer lo que está mal a propósito'],
      ['Profanar','Tratar como cualquier cosa algo que es sagrado'],
      ['Idolatría','Adorar a algo o alguien en lugar de Dios'],
      ['Providencia','El cuidado de Dios que va guiando la historia'],
    ]) },

  { t:'🧩 Tres frases que hay que entender, no solo repetir', h:
    hi(`<strong>«Los hábitos temperantes favorecen la claridad mental.»</strong><br>
    Quiere decir: comer y beber con dominio propio deja la cabeza despierta
    para pensar y para entender a Dios. Por eso los cuatro salieron diez veces
    mejores.`) +
    hi(`<strong>«Su vida pública y privada eran igual de intachables.»</strong><br>
    Quiere decir: Daniel era el mismo en la oficina del rey y en su casa
    orando solo. Por eso sus enemigos no encontraron nada.`) +
    hi(`<strong>«La sentencia es por decreto de los vigilantes.»</strong> (4:17)<br>
    Quiere decir: la decisión de humillar a Nabucodonosor venía del cielo,
    no de un accidente ni de una enfermedad cualquiera.`) },
],

};

module.exports = { MODULOS, CONT_MODULOS };
