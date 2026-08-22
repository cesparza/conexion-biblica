/* Contenido de estudio — profundidad completa, Daniel 1-6 y P&R 39-44.
   Se genera aquí y se inyecta en el HTML final. */

const CAPS = [
  { id:'d1', label:'Daniel 1', sub:'Cautivos en Babilonia', src:'Biblia', color:'#E8720C', cats:['av','gm'] },
  { id:'d2', label:'Daniel 2', sub:'El sueño de la gran imagen', src:'Biblia', color:'#2E8BC0', cats:['av','gm'] },
  { id:'d3', label:'Daniel 3', sub:'La imagen de oro y el horno', src:'Biblia', color:'#C0392B', cats:['av','gm'] },
  { id:'d4', label:'Daniel 4', sub:'Nabucodonosor humillado', src:'Biblia', color:'#7B5E00', cats:['gm'] },
  { id:'d5', label:'Daniel 5', sub:'La escritura en la pared', src:'Biblia', color:'#8B1A5E', cats:['gm'] },
  { id:'d6', label:'Daniel 6', sub:'En el foso de los leones', src:'Biblia', color:'#1A7A1A', cats:['av','gm'] },
  { id:'pr39', label:'P&R 39', sub:'En la corte de Babilonia', src:'Elena de White', color:'#7B2D8B', cats:['av','gm'] },
  { id:'pr40', label:'P&R 40', sub:'El sueño de la gran imagen', src:'Elena de White', color:'#7B2D8B', cats:['gm'] },
  { id:'pr41', label:'P&R 41', sub:'La imagen de oro y el horno de fuego', src:'Elena de White', color:'#7B2D8B', cats:['av','gm'] },
  { id:'pr42', label:'P&R 42', sub:'Nabucodonosor humillado', src:'Elena de White', color:'#7B2D8B', cats:['gm'] },
  { id:'pr43', label:'P&R 43', sub:'El vigía invisible', src:'Elena de White', color:'#7B2D8B', cats:['gm'] },
  { id:'pr44', label:'P&R 44', sub:'En el foso de los leones', src:'Elena de White', color:'#7B2D8B', cats:['av','gm'] },
];

// helpers para armar HTML compacto
const tbl = (head, rows) =>
  `<table class="info-table"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>` +
  rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===0?' class="key"':''}>${c}</td>`).join('')}</tr>`).join('') +
  `</tbody></table>`;
const hi = t => `<div class="highlight-box">${t}</div>`;
const wa = t => `<div class="warn-box">${t}</div>`;
const vs = t => `<div class="verse-box">${t}</div>`;
const li = arr => `<ul class="tight">${arr.map(x=>`<li>${x}</li>`).join('')}</ul>`;

const CONTENIDO = {

/* ═══════════════ DANIEL 1 ═══════════════ */
d1: [
  { t:'👑 Contexto histórico', h:
    wa(`<strong>Año:</strong> TERCER año del reinado de Joacim, rey de Judá (1:1)<br>
    Nabucodonosor, rey de Babilonia, vino a Jerusalén y la sitió.<br>
    <strong>El Señor entregó</strong> en sus manos a Joacim y parte de los utensilios de la casa de Dios (1:2).<br>
    Los llevó a <strong>tierra de Sinar</strong>, a la casa del tesoro de su dios (1:2).`) },

  { t:'👤 Personajes clave', h:
    tbl(['Persona','Quién es y referencia'],[
      ['Joacim','Rey de Judá — la invasión ocurre en su tercer año (1:1)'],
      ['Nabucodonosor','Rey de Babilonia que sitia Jerusalén (1:1)'],
      ['Aspenaz','Jefe de los eunucos — recibió del rey la orden de traer a los jóvenes (1:3)'],
      ['Melsar','Sirviente puesto <u>directamente</u> sobre Daniel y sus tres compañeros (1:11, 16)'],
      ['Daniel → Beltsasar','Nombre hebreo → nombre babilónico asignado (1:6-7)'],
      ['Ananías → Sadrac','Nombre hebreo → nombre babilónico asignado (1:6-7)'],
      ['Misael → Mesac','Nombre hebreo → nombre babilónico asignado (1:6-7)'],
      ['Azarías → Abed-nego','Nombre hebreo → nombre babilónico asignado (1:6-7)'],
    ]) +
    wa(`<strong>⚠ Aspenaz no es Melsar.</strong> Aspenaz era el jefe de los eunucos, quien recibió
    la orden del rey. Melsar era el sirviente que Aspenaz puso al cuidado de los cuatro jóvenes.
    <strong>Fue Daniel quien habló con Melsar</strong> para proponer la prueba de los diez días (1:11).`) },

  { t:'📋 Requisitos de los jóvenes escogidos (1:4)', h:
    li(['En quienes no hubiera <strong>tacha alguna</strong>',
        'De <strong>buen parecer</strong>',
        '<strong>Instruidos</strong> en toda sabiduría',
        '<strong>Sabios</strong> en ciencia',
        'De <strong>buen entendimiento</strong>',
        '<strong>Idóneos</strong> para estar en el palacio del rey',
        'Que aprendieran las <strong>letras y la lengua de los caldeos</strong>']) },

  { t:'🔢 Números exactos — los más preguntados', h:
    tbl(['Dato','Texto exacto RV1995'],[
      ['Tiempo de instrucción','TRES años, para presentarse después ante el rey (1:5)'],
      ['Comida asignada','Porción diaria de la comida del rey y del vino que él bebía (1:5)'],
      ['Duración de la prueba','DIEZ días (1:12)'],
      ['Alimento en la prueba','Legumbres para comer y agua para beber (1:12)'],
      ['Resultado (1:15)','«mejor y más robusto que el de los otros muchachos»'],
      ['Superioridad (1:20)','DIEZ VECES mejores que todos los magos y astrólogos'],
      ['Hasta cuándo sirvió','Año PRIMERO del rey Ciro (1:21)'],
    ]) },

  { t:'✨ Los dones que Dios dio (1:17)', h:
    hi(`A los <strong>cuatro</strong>: conocimiento e inteligencia en todas las letras y ciencias.<br>
    Solo a <strong>Daniel</strong>: entendimiento en toda <u>visión y sueños</u> — el don profético.`) },

  { t:'🗂️ Secuencia completa del capítulo', h:
    tbl(['#','Evento','Ref.'],[
      ['1','Nabucodonosor sitia Jerusalén en el tercer año de Joacim','1:1'],
      ['2','Lleva utensilios del templo a la casa del tesoro de su dios','1:2'],
      ['3','Ordena a Aspenaz traer jóvenes nobles sin tacha','1:3-4'],
      ['4','Se asigna la comida del rey por tres años','1:5'],
      ['5','Se cambian los nombres de los cuatro hebreos','1:7'],
      ['6','Daniel se propone no contaminarse y lo pide al jefe de eunucos','1:8'],
      ['7','Dios pone a Daniel en gracia y buena voluntad ante Aspenaz','1:9'],
      ['8','Daniel propone la prueba de diez días a Melsar','1:11-13'],
      ['9','A los diez días: mejor y más robusto que los demás','1:15'],
      ['10','Melsar les retira la comida del rey y les da legumbres','1:16'],
      ['11','Dios les da conocimiento e inteligencia; a Daniel, visiones','1:17'],
      ['12','Al final de los tres años: diez veces mejores que todos','1:19-20'],
      ['13','Daniel continúa hasta el año primero de Ciro','1:21'],
    ]) },

  { t:'📖 Versículo clave', h:
    vs(`«Y al cabo de los diez días pareció el rostro de ellos <strong>mejor y más robusto</strong>
    que el de los otros muchachos que comían de la porción de la comida del rey.» (Daniel 1:15)`) },
],

/* ═══════════════ DANIEL 2 ═══════════════ */
d2: [
  { t:'💭 El sueño y la crisis', h:
    wa(`<strong>Año:</strong> SEGUNDO año del reinado de Nabucodonosor (2:1)<br>
    El sueño perturbó su espíritu y se le fue el sueño.<br>
    <strong>Exigencia imposible:</strong> los sabios debían <u>decir el sueño</u> Y darle la interpretación (2:5).<br>
    <strong>Amenaza (2:5):</strong> serían hechos pedazos y sus casas convertidas en <strong>estercoleros</strong>.<br>
    <strong>Decreto (2:12):</strong> que todos los sabios de Babilonia fueran muertos.<br>
    <strong>Arioc:</strong> capitán de la guardia del rey, enviado a ejecutar la sentencia (2:14).`) },

  { t:'🙏 La respuesta de Daniel', h:
    li(['Habló a Arioc con <strong>prudencia y sabiduría</strong> (2:14)',
        'Pidió <strong>tiempo</strong> al rey para mostrar la interpretación (2:16)',
        'Fue a su casa e informó a sus compañeros; <strong>oraron pidiendo misericordia</strong> (2:17-18)',
        'El misterio le fue revelado en <strong>visión de noche</strong> (2:19)',
        'Bendijo y alabó a Dios antes de ir ante el rey (2:20-23)',
        'Declaró: «hay un Dios en los cielos, el cual revela los misterios» (2:28)']) },

  { t:'🗿 La estatua — materiales e imperios', h:
    tbl(['Parte y material','Imperio que representa'],[
      ['Cabeza — ORO FINO','Babilonia / Nabucodonosor (2:32, 37-38)'],
      ['Pecho y brazos — PLATA','Medo-Persia (2:32, 39)'],
      ['Vientre y muslos — BRONCE','Grecia (2:32, 39)'],
      ['Piernas — HIERRO','Roma (2:33, 40)'],
      ['Pies — HIERRO Y BARRO COCIDO','Reinos divididos, no se unen entre sí (2:33, 41-43)'],
      ['La PIEDRA — sin manos','El reino eterno de Dios / Cristo (2:34, 44-45)'],
    ]) },

  { t:'🪨 La piedra — detalles exactos', h:
    hi(`• Cortada del monte <strong>sin que la cortara mano alguna</strong> (2:34)<br>
    • Hirió la imagen <strong>en sus pies de hierro y de barro cocido</strong> (2:34)<br>
    • Fueron desmenuzados el hierro, el barro cocido, el bronce, la plata y el oro,
      y fueron <strong>como tamo de las eras del verano</strong> (2:35)<br>
    • El viento los llevó sin que quedara rastro alguno (2:35)<br>
    • La piedra se hizo <strong>un gran monte que llenó toda la tierra</strong> (2:35)<br>
    • Ese reino <strong>no será jamás destruido</strong> ni dejado a otro pueblo (2:44)`) },

  { t:'🏅 Consecuencias', h:
    tbl(['Persona','Lo que recibió'],[
      ['Daniel','Gobernador de toda la provincia de Babilonia y principal de los gobernadores sobre todos los sabios (2:48)'],
      ['Sadrac, Mesac y Abed-nego','Administradores de la provincia de Babilonia, por petición de Daniel (2:49)'],
      ['Daniel (además)','Permaneció en la puerta del rey (2:49)'],
    ]) },

  { t:'📖 Versículo clave', h:
    vs(`«Sea bendito el nombre de Dios de siglos en siglos, porque suyos son
    <strong>el poder y la sabiduría</strong>.» (Daniel 2:20)`) },
],

/* ═══════════════ DANIEL 3 ═══════════════ */
d3: [
  { t:'🗿 La estatua de oro', h:
    tbl(['Dato','Valor exacto'],[
      ['Altura','SESENTA codos (3:1)'],
      ['Anchura','SEIS codos (3:1)'],
      ['Material','Oro'],
      ['Lugar','Campo de DURA, en la provincia de Babilonia (3:1)'],
    ]) },

  { t:'🎵 Los seis instrumentos — orden exacto', h:
    wa(`<strong>Daniel 3:5 (se repite en 3:7, 3:10 y 3:15):</strong><br><br>
    1. BOCINA &nbsp;→&nbsp; 2. FLAUTA &nbsp;→&nbsp; 3. TAMBORIL &nbsp;→&nbsp;
    4. ARPA &nbsp;→&nbsp; 5. SALTERIO &nbsp;→&nbsp; 6. ZAMPOÑA<br><br>
    <strong>❌ NO aparece en Daniel 3:</strong> la TROMPETA`) },

  { t:'🔥 El horno de fuego', h:
    hi(`• El rostro de Nabucodonosor se demudó contra ellos (3:19)<br>
    • Mandó calentar el horno <strong>SIETE veces más</strong> de lo acostumbrado (3:19)<br>
    • Fueron atados con <strong>sus mantos, sus calzas, sus turbantes y sus vestidos</strong> (3:21)<br>
    • A los <strong>varones vigorosos</strong> que los echaron, <strong>la llama del fuego los mató</strong> (3:22)<br>
    • Nabucodonosor vio <strong>CUATRO varones sueltos</strong> paseándose en medio del fuego (3:25)<br>
    • El aspecto del cuarto: <strong>«semejante a un hijo de los dioses»</strong> (3:25, RV1995)<br>
    Así lo describió Nabucodonosor, que era pagano. <strong>P&amp;R cap. 41 aclara que era el Hijo de Dios mismo.</strong>`) },

  { t:'✨ El milagro verificado (3:27)', h:
    vs(`«...cómo <strong>el fuego no había tenido poder alguno</strong> sobre sus cuerpos
    y ni aun el cabello de sus cabezas se había quemado;
    sus ropas, <strong>intactas</strong>,
    <strong>ni siquiera olor de fuego tenían</strong>.» (RV1995)`) +
    hi(`Se juntaron los sátrapas, los gobernadores, los capitanes y los consejeros del rey
    <u>para verificarlo con sus propios ojos</u> (3:27).`) },

  { t:'📜 La respuesta de los tres jóvenes (3:17-18)', h:
    vs(`«He aquí nuestro Dios a quien servimos <strong>puede librarnos</strong> del horno de fuego ardiendo;
    y de tu mano, oh rey, nos librará. <strong>Y si no</strong>, sepas, oh rey, que no serviremos a tus dioses,
    ni tampoco adoraremos la estatua que has levantado.»`) },

  { t:'👑 El decreto de Nabucodonosor (3:28-30)', h:
    li(['Bendijo al Dios de Sadrac, Mesac y Abed-nego, que <strong>envió su ángel</strong> y los libró (3:28)',
        'Decretó que quien hablara blasfemia contra ese Dios <strong>sea descuartizado y su casa convertida en estercolero</strong> (3:29)',
        'Reconoció: <strong>«no hay dios que pueda librar como éste»</strong> (3:29)',
        'Los <strong>engrandeció</strong> en la provincia de Babilonia (3:30)']) },
],

/* ═══════════════ DANIEL 4 ═══════════════ */
d4: [
  { t:'🌳 El sueño del árbol', h:
    hi(`• Un árbol en medio de la tierra, cuya altura era grande (4:10)<br>
    • Crecía y su copa <strong>llegaba hasta el cielo</strong>, se veía hasta los confines de la tierra (4:11)<br>
    • Su follaje hermoso y su fruto abundante; en él había alimento para todos (4:12)<br>
    • Debajo de él se ponían a la sombra las bestias del campo (4:12)<br>
    • En sus ramas hacían morada las aves del cielo (4:12)`) },

  { t:'👁️ El vigilante y la sentencia', h:
    tbl(['Elemento','Texto RV1995'],[
      ['Quién desciende','Un vigilante y santo descendió del cielo (4:13)'],
      ['La orden','«Derribad el árbol y cortad sus ramas» (4:14)'],
      ['Lo que queda','La cepa de sus raíces en la tierra, con <strong>atadura de hierro y de bronce</strong> (4:15)'],
      ['Su suerte','Sea mojado con el rocío del cielo, con las bestias tenga su parte (4:15)'],
      ['Duración','<strong>SIETE TIEMPOS</strong> pasarán sobre él (4:16, 25)'],
      ['Propósito','Para que conozcan que el Altísimo gobierna el reino de los hombres (4:17)'],
    ]) },

  { t:'⚠️ El consejo de Daniel (4:27)', h:
    vs(`«Por tanto, oh rey, acepta mi consejo: tus pecados <strong>redime con justicia</strong>,
    y tus iniquidades <strong>haciendo misericordias para con los oprimidos</strong>;
    quizá será eso una prolongación de tu tranquilidad.»`) },

  { t:'⏳ El cumplimiento', h:
    tbl(['Momento','Detalle'],[
      ['Tiempo de gracia','<strong>DOCE MESES</strong> (al cabo de un año) después de la advertencia (4:29)'],
      ['La jactancia','«¿No es ésta la gran Babilonia que yo edifiqué... con la fuerza de mi poder y para gloria de mi majestad?» (4:30)'],
      ['El juicio','Aún estaba la palabra en su boca cuando vino una voz del cielo (4:31)'],
      ['Su cabello','Le creció <strong>como plumas de águila</strong> (4:33)'],
      ['Sus uñas','Como las <strong>de las aves</strong> (4:33)'],
      ['Su alimento','Comía hierba como los bueyes; su cuerpo se mojaba con el rocío (4:33)'],
    ]) },

  { t:'🙌 La restauración (4:34-37)', h:
    hi(`• Al fin del tiempo, Nabucodonosor <strong>alzó sus ojos al cielo</strong> (4:34)<br>
    • Su razón le fue devuelta; bendijo al Altísimo y lo alabó (4:34)<br>
    • Fue restituido en su reino, y <strong>mayor grandeza le fue añadida</strong> (4:36)`) +
    vs(`«Ahora yo Nabucodonosor <strong>alabo, engrandezco y glorifico al Rey del cielo</strong>,
    porque todas sus obras son verdaderas, y sus caminos justos;
    y él puede humillar a los que andan con soberbia.» (Daniel 4:37)`) },
],

/* ═══════════════ DANIEL 5 ═══════════════ */
d5: [
  { t:'🍷 El banquete de Belsasar', h:
    hi(`• Belsasar hizo un gran banquete a <strong>MIL de sus príncipes</strong> (5:1)<br>
    • Bebía vino en presencia de los mil<br>
    • Mandó traer <strong>los vasos de oro y de plata</strong> que Nabucodonosor había traído
      <strong>del templo de Jerusalén</strong> (5:2)<br>
    • Bebieron en ellos el rey, sus príncipes, sus mujeres y sus concubinas (5:3)<br>
    • <strong>Alabaron a los dioses</strong> de oro, plata, bronce, hierro, madera y piedra (5:4)`) },

  { t:'✍️ La escritura en la pared', h:
    tbl(['Detalle','Texto RV1995'],[
      ['Qué apareció','Dedos de mano de hombre que escribían (5:5)'],
      ['Dónde','Sobre lo encalado de la pared del palacio real (5:5)'],
      ['Frente a qué','<strong>Delante del candelero</strong> (5:5)'],
      ['Reacción del rey','Se demudó su rostro, sus pensamientos lo turbaron, se debilitaron sus lomos y sus rodillas daban la una contra la otra (5:6)'],
    ]) },

  { t:'🎁 Lo que ofreció Belsasar (5:7)', h:
    li(['Ser <strong>vestido de púrpura</strong>',
        'Un <strong>collar de oro</strong> a su cuello',
        'Ser el <strong>TERCER señor</strong> en el reino']) +
    hi(`Ningún sabio de Babilonia pudo leer la escritura ni mostrar su interpretación (5:8).<br>
    <strong>La reina</strong> entró a la sala del banquete y recordó a Daniel al rey (5:10-12).`) },

  { t:'📜 MENE MENE TEKEL UPARSIN', h:
    wa(`<strong>Texto exacto en la pared (Daniel 5:25):</strong><br><br>
    MENE &nbsp; MENE &nbsp; TEKEL &nbsp; UPARSIN<br><br>
    <em>La palabra MENE aparece DOS veces.</em>`) +
    tbl(['Palabra','Interpretación exacta'],[
      ['MENE','<strong>Contó</strong> Dios tu reino, y le ha puesto fin (5:26)'],
      ['TEKEL','<strong>Pesado</strong> has sido en balanza, y fuiste hallado falto (5:27)'],
      ['PERES','Tu reino ha sido <strong>roto</strong>, y dado a los medos y a los persas (5:28)'],
    ]) },

  { t:'⚔️ El desenlace', h:
    tbl(['Dato','Texto RV1995'],[
      ['Padre de Belsasar','Nabucodonosor, según el texto (5:2, 11, 13, 18)'],
      ['Qué recibió Daniel','Púrpura, collar de oro y proclamado tercer señor (5:29)'],
      ['El fin de Belsasar','<strong>La misma noche</strong> fue muerto Belsasar, rey de los caldeos (5:30)'],
      ['Quién tomó el reino','Darío de Media, de <strong>SESENTA Y DOS años</strong> (5:31)'],
    ]) },
],

/* ═══════════════ DANIEL 6 ═══════════════ */
d6: [
  { t:'🏛️ La organización del reino', h:
    tbl(['Cargo','Detalle'],[
      ['120 sátrapas','Constituidos sobre todo el reino (6:1)'],
      ['3 gobernadores','Sobre los sátrapas, para que el rey no recibiera daño (6:2)'],
      ['Daniel','<strong>Uno de los tres</strong>, y sobresalía sobre todos (6:2-3)'],
      ['Por qué','Había en él un <strong>espíritu superior</strong> (6:3)'],
      ['Plan del rey','Ponerlo sobre todo el reino (6:3)'],
    ]) },

  { t:'🕸️ El complot', h:
    hi(`• Buscaban ocasión para acusarlo <strong>en lo relacionado con el reino</strong> (6:4)<br>
    • No podían hallar motivo alguno o falta, porque <strong>él era fiel</strong>,
      y <strong>ningún error ni falta hallaron en él</strong> (6:4)<br>
    • Concluyeron: «No hallaremos contra este Daniel motivo alguno para acusarlo,
      si no la hallamos <strong>contra él en relación con la ley de su Dios</strong>» (6:5)`) +
    tbl(['El edicto','Detalle'],[
      ['Duración','TREINTA días (6:7)'],
      ['Prohibición','Pedir petición a cualquier dios u hombre fuera del rey (6:7)'],
      ['Pena','Ser echado en el <strong>foso de los leones</strong> (6:7)'],
      ['Carácter','Ley de Media y de Persia, <strong>la cual no puede ser abrogada</strong> (6:8)'],
    ]) },

  { t:'🙏 La fidelidad de Daniel — versículo central', h:
    vs(`«Cuando Daniel supo que el edicto había sido firmado, <strong>entró en su casa</strong>;
    abiertas las ventanas de su habitación que daban a Jerusalén,
    <strong>se arrodillaba tres veces al día</strong>, y oraba y daba gracias delante de su Dios,
    <strong>como lo solía hacer antes</strong>.» (Daniel 6:10)`) +
    wa(`Fíjate en tres cosas que suelen preguntarse por separado:
    <strong>hacia Jerusalén</strong>, <strong>tres veces al día</strong>,
    y <strong>como lo solía hacer antes</strong> — no cambió su costumbre por miedo.`) },

  { t:'🦁 El foso de los leones', h:
    tbl(['#','Evento','Ref.'],[
      ['1','Lo hallan orando y rogando delante de su Dios','6:11'],
      ['2','Lo acusan ante el rey recordándole el edicto','6:12-13'],
      ['3','El rey se afligió y <strong>hasta la puesta del sol trabajó por librarlo</strong>','6:14'],
      ['4','Los hombres insisten: la ley no puede ser abrogada','6:15'],
      ['5','Daniel es echado al foso; el rey le dice: «El Dios tuyo te libre»','6:16'],
      ['6','Una piedra sella la puerta, con el <strong>anillo del rey y el de sus príncipes</strong>','6:17'],
      ['7','El rey pasó <strong>la noche en ayuno</strong>, sin instrumentos de música, y se le fue el sueño','6:18'],
      ['8','<strong>Muy de mañana, al rayar el alba</strong>, fue apresuradamente al foso','6:19'],
      ['9','Clamó con voz triste: «¿te ha podido librar de los leones?»','6:20'],
      ['10','Daniel responde desde el foso','6:21-22'],
      ['11','Sacado del foso, <strong>ninguna lesión se halló en él, porque había confiado en su Dios</strong>','6:23'],
      ['12','Los acusadores, sus hijos y sus mujeres, echados al foso','6:24'],
    ]) },

  { t:'📖 La respuesta de Daniel (6:22)', h:
    vs(`«<strong>Mi Dios envió su ángel</strong>, el cual cerró la boca de los leones,
    para que no me hiciesen daño, porque ante él fui hallado inocente;
    y aun delante de ti, oh rey, yo no he hecho nada malo.»`) },

  { t:'👑 El decreto de Darío (6:25-27)', h:
    hi(`Escribió a todos los pueblos, naciones y lenguas:<br><br>
    • Que <strong>teman y tiemblen ante la presencia del Dios de Daniel</strong><br>
    • «Porque él es el <strong>Dios viviente y permanece por todos los siglos</strong>»<br>
    • «Su reino no será jamás destruido, y su dominio perdurará hasta el fin»<br>
    • «Él <strong>salva y libra</strong>, y hace señales y maravillas en el cielo y en la tierra»<br>
    • «Él ha librado a Daniel del poder de los leones»`) },
],

/* ═══════════════ P&R 39 ═══════════════ */
pr39: [
  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 39: «En la corte de Babilonia»</strong>`) },

  { t:'🍽️ Por qué rechazaron la comida del rey', h:
    hi(`• La comida <strong>había sido ofrecida a los ídolos</strong> antes de servirse<br>
    • Incluía carnes que la ley de Dios declaraba <strong>inmundas</strong><br>
    • Participar de ella se interpretaba como <strong>homenaje a los dioses de Babilonia</strong><br>
    • El vino embotaba las facultades mentales y debilitaba el dominio propio`) },

  { t:'🧠 Cuerpo y mente: la enseñanza central', h:
    hi(`• Los <strong>hábitos físicos temperantes</strong> favorecen directamente la claridad mental y espiritual<br>
    • La alimentación sencilla mantiene la mente despejada para discernir la voluntad de Dios<br>
    • Dios recompensó su fidelidad con <strong>salud, vigor y sabiduría superiores</strong><br>
    • El desarrollo intelectual de los cuatro fue resultado de la obediencia, no solo del estudio`) },

  { t:'💪 El carácter de Daniel', h:
    li(['Fue <strong>firme y cortés a la vez</strong> — no rebelde, no grosero, no agresivo',
        'Propuso una <strong>prueba razonable</strong> en lugar de solo negarse',
        'Se ganó el <strong>respeto</strong> de quienes tenían autoridad sobre él',
        'La fidelidad <strong>en cosas pequeñas</strong> lo preparó para pruebas mayores',
        'Su decisión fue tomada <strong>de antemano</strong>, no improvisada bajo presión']) },

  { t:'🎯 Aplicación para los jóvenes de hoy', h:
    hi(`Mantenerse fiel a los principios de Dios en un ambiente contrario es un
    <strong>acto de fe y un testimonio</strong> ante quienes no creen.
    El mayor peligro no era la persecución abierta, sino la
    <strong>tentación de ceder poco a poco</strong> en los principios.`) },
],

/* ═══════════════ P&R 40 ═══════════════ */
pr40: [
  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 40: «El sueño de Nabucodonosor»</strong>`) },

  { t:'🙏 La oración antes de la revelación', h:
    hi(`• Ante la sentencia de muerte, Daniel y sus compañeros
    <strong>recurrieron primero a la oración</strong>, no a la estrategia humana<br>
    • Pidieron misericordia del Dios del cielo sobre este misterio<br>
    • La respuesta llegó en visión de noche<br>
    • Daniel <strong>dio la gloria a Dios</strong> antes de presentarse ante el rey`) },

  { t:'🌍 El significado profético', h:
    hi(`• La imagen revela el <strong>plan de Dios para el curso de los imperios mundiales</strong><br>
    • Cada metal representa un imperio sucesivo en la historia<br>
    • La historia no es azar: <strong>Dios gobierna el reino de los hombres</strong><br>
    • Los reinos se levantan y caen conforme al propósito divino`) },

  { t:'🪨 La piedra', h:
    hi(`La piedra cortada sin manos representa a <strong>Cristo y el establecimiento
    de su reino eterno</strong>, que destruirá todos los reinos terrenales
    y permanecerá para siempre.`) },

  { t:'🎯 Aplicación', h:
    li(['Las profecías dan <strong>certeza de que Dios controla la historia</strong>',
        'Daniel nunca se atribuyó la gloria: apuntó siempre a Dios como la fuente',
        'El estudio de la profecía fortalece la fe en tiempos de incertidumbre']) },
],

/* ═══════════════ P&R 41 ═══════════════ */
pr41: [
  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 41: «El horno de fuego»</strong>`) },

  { t:'🔥 El cuarto personaje', h:
    hi(`El cuarto que apareció en el horno era <strong>el Hijo de Dios mismo</strong>,
    quien acompañó a sus fieles en el momento de la prueba.<br><br>
    No los libró <em>de</em> la prueba, sino que <strong>estuvo con ellos dentro de ella</strong>.`) },

  { t:'⚖️ La decisión de los tres jóvenes', h:
    vs(`«Nuestro Dios puede librarnos… <strong>y si no</strong>,
    no serviremos a tus dioses ni adoraremos tu estatua.»`) +
    hi(`Esa frase — <strong>«y si no»</strong> — es el corazón del capítulo:
    la fe verdadera obedece <u>aunque no vea de antemano el resultado</u>.
    No negociaron con Dios ni condicionaron su lealtad al milagro.`) },

  { t:'🕰️ Modelo para la crisis final', h:
    hi(`• Este evento es un <strong>modelo para el tiempo del fin</strong>,
    cuando se exigirá adoración contraria a la voluntad de Dios<br>
    • La fidelidad puede costar la vida, pero <strong>Dios libera a los suyos</strong><br>
    • Ningún poder humano puede vencer a quienes permanecen fieles<br>
    • El milagro fue testimonio ante el rey más poderoso de la tierra`) },

  { t:'🎯 Aplicación', h:
    hi(`No aplica solo a la idolatría literal con estatuas.
    Es un <strong>modelo de fidelidad ante cualquier presión</strong>
    para desobedecer a Dios, en cualquier época y circunstancia.`) },
],

/* ═══════════════ P&R 42 ═══════════════ */
pr42: [
  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 42: «La verdadera grandeza»</strong>`) },

  { t:'👑 El pecado de Nabucodonosor', h:
    hi(`• Su pecado principal fue el <strong>orgullo y la arrogancia</strong><br>
    • Se atribuyó a sí mismo <strong>la gloria que pertenecía a Dios</strong><br>
    • «¿No es ésta la gran Babilonia que <u>yo</u> edifiqué?»<br>
    • Olvidó que su poder y su reino eran un don, no un logro propio`) },

  { t:'⏳ La paciencia de Dios', h:
    hi(`• Dios <strong>siempre advierte antes de castigar</strong><br>
    • Daniel le dio el mensaje y un consejo claro para evitar el juicio<br>
    • Le fue concedido <strong>un año completo</strong> para arrepentirse<br>
    • El juicio solo cayó cuando la jactancia salió de su boca`) },

  { t:'🙌 La restauración', h:
    hi(`• La humillación fue el <strong>camino de la restauración</strong><br>
    • Al reconocer la soberanía de Dios, su razón y su reino le fueron devueltos<br>
    • Su testimonio final es uno de los más poderosos de un rey gentil en toda la Biblia<br>
    • Terminó siendo <strong>un adorador del Dios verdadero</strong>`) },

  { t:'🎯 La lección central', h:
    wa(`<strong>La verdadera grandeza no está en el poder ni en las obras,
    sino en reconocer a Dios como soberano.</strong><br><br>
    Dios resiste a los soberbios y da gracia a los humildes.
    El caso de Nabucodonosor es la advertencia más solemne de la Biblia contra el orgullo.`) },
],

/* ═══════════════ P&R 43 ═══════════════ */
pr43: [
  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 43: «El vigía invisible»</strong>`) },

  { t:'⚖️ Por qué Belsasar no tenía excusa', h:
    hi(`• <strong>Conocía la experiencia de Nabucodonosor</strong>: su orgullo, su humillación y su restauración<br>
    • Tenía <u>más luz</u> que su predecesor y aun así eligió el camino del mal<br>
    • <strong>Mayor conocimiento significa mayor responsabilidad</strong> delante de Dios<br>
    • No pecó por ignorancia sino con pleno conocimiento de lo que hacía`) },

  { t:'🏺 La profanación de los vasos sagrados', h:
    hi(`Usar los vasos del templo de Jerusalén para beber vino y alabar a los ídolos
    no fue un descuido ni una costumbre normal:<br><br>
    fue un <strong>desafío deliberado a Dios</strong> y la <strong>cima de su impiedad</strong>.
    Fue el acto que colmó la medida.`) },

  { t:'⚡ El juicio inmediato', h:
    hi(`• La mano apareció <strong>en el momento mismo</strong> de la profanación<br>
    • El juicio se ejecutó <strong>esa misma noche</strong> (Daniel 5:30)<br>
    • Cuando se colma la medida del pecado, <strong>no hay demora</strong><br>
    • Babilonia cayó en una sola noche, en medio de su fiesta`) },

  { t:'🎯 Aplicación', h:
    wa(`Las naciones y las personas son pesadas en la balanza de Dios.
    La luz rechazada se convierte en tinieblas, y el tiempo de gracia
    <strong>tiene un límite</strong>.`) },
],

/* ═══════════════ P&R 44 ═══════════════ */
pr44: [
  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 44: «En el foso de los leones»</strong>`) },

  { t:'💎 La integridad de Daniel', h:
    hi(`• Sus enemigos lo investigaron a fondo buscando corrupción y <strong>no hallaron nada</strong><br>
    • Su vida pública y privada eran <strong>igual de intachables</strong><br>
    • Fue <strong>fiel en su trabajo</strong> como funcionario del gobierno, no solo en lo religioso<br>
    • Su carácter fue construido <strong>día a día</strong>, no improvisado en la crisis`) },

  { t:'🙏 La oración como hábito diario', h:
    hi(`• La oración era la <strong>fuente diaria de su fortaleza</strong>, no una emergencia<br>
    • Cuando llegó el decreto, <strong>no cambió nada</strong>: siguió como solía hacerlo antes<br>
    • No oró más para desafiar, ni menos para esconderse<br>
    • Esa constancia previa fue lo que hizo posible su firmeza en el momento crítico`) },

  { t:'🏛️ Fidelidad en un cargo secular', h:
    hi(`Daniel sirvió a <strong>reyes paganos</strong> durante toda su vida
    y nunca comprometió su lealtad a Dios.<br><br>
    Es un modelo de que se puede ser <strong>testigo fiel de Dios en cualquier posición</strong>,
    incluyendo puestos de gobierno y responsabilidad pública.`) },

  { t:'🌍 El alcance del testimonio', h:
    hi(`Su liberación no fue solo un rescate personal:<br><br>
    • Convirtió a <strong>Darío en proclamador</strong> del Dios verdadero<br>
    • El decreto llegó a <strong>todos los pueblos, naciones y lenguas</strong> del imperio<br>
    • La fidelidad de un hombre alcanzó a un imperio entero`) },

  { t:'🎯 Aplicación para los jóvenes', h:
    wa(`Lo que Daniel decidió <strong>de joven</strong> (Daniel 1) fue lo que lo sostuvo
    <strong>de anciano</strong> (Daniel 6). Tenía más de ochenta años en el foso.<br><br>
    Las decisiones de hoy construyen el carácter que responderá mañana.`) },
],

};

module.exports = { CAPS, CONTENIDO };
