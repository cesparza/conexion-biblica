/* Contenido de estudio — profundidad completa, Daniel 1-6 y P&R 39-44.
   Se genera aquí y se inyecta en el HTML final.

   `vs` es el numero de versiculos del capitulo, contado sobre
   files/rv1995-daniel-N.txt, que es el texto RV1995 verificado: 21, 49, 30,
   37, 31 y 28, o sea 196. Se declara solo en los capitulos de la Biblia; los
   de Profetas y Reyes son capitulos de libro y no tienen versiculos. Una
   prueba usa este numero para rechazar cualquier referencia del banco que
   apunte mas alla del final del capitulo.

   Ojo con Daniel 5: en RV1995 tiene 31 versiculos porque 5:31 («Y Dario...»)
   va ahi. Otras ediciones lo mueven a 6:1, y con esa cuenta darian 30 y 29. */

const CAPS = [
  { id:'d1', label:'Daniel 1', sub:'Cautivos en Babilonia', src:'Biblia', color:'#E8720C', vs:21, cats:['me','av','pa','gm'] },
  /* El reglamento del campamento quedo en Daniel 1, 3 y 6, asi que Daniel 2
     sale del EXAMEN de esas categorias pero se sigue estudiando: `extra`
     lista las categorias para las que el capitulo es solo material. Guias
     Mayores es otro evento y ahi Daniel 2 si cuenta. */
  { id:'d2', label:'Daniel 2', sub:'El sueño de la gran imagen', src:'Biblia', color:'#2E8BC0', vs:49, cats:['me','av','pa','gm'], extra:['me','av','pa'] },
  { id:'d3', label:'Daniel 3', sub:'La imagen de oro y el horno', src:'Biblia', color:'#C0392B', vs:30, cats:['me','av','pa','gm'] },
  { id:'d4', label:'Daniel 4', sub:'Nabucodonosor humillado', src:'Biblia', color:'#7B5E00', vs:37, cats:['gm'] },
  { id:'d5', label:'Daniel 5', sub:'La escritura en la pared', src:'Biblia', color:'#8B1A5E', vs:31, cats:['gm'] },
  { id:'d6', label:'Daniel 6', sub:'En el foso de los leones', src:'Biblia', color:'#1A7A1A', vs:28, cats:['me','av','pa','gm'] },
  /* Ampliacion Daniel 7-12 (v54): material de estudio con dos libros que
     prohiben reproduccion literal (Maxwell y Holbrook), asi que preguntas y
     estudio se redactan propios. cats:['gm'], extra:['gm'] => aparece como
     material para Guias Mayores pero NO entra al examen de ninguna
     categoria (soloEstudio() en app.js). Sin texto en fuente/biblia.js: no
     tiene referencia tocable, capitulo completo ni modo lectura, igual que
     Profetas y Reyes. vs:28 sale de Maxwell, no de un .txt RV1995 propio. */
  { id:'d7', label:'Daniel 7', sub:'Las cuatro bestias y el juicio', src:'Biblia',
    color:'#4A5568', vs:28, cats:['gm'], extra:['gm'] },
  { id:'pr39', label:'P&R 39', sub:'En la corte de Babilonia', src:'Elena de White', color:'#7B2D8B', cats:['av','pa','gm'] },
  { id:'pr40', label:'P&R 40', sub:'El sueño de Nabucodonosor', src:'Elena de White', color:'#7B2D8B', cats:['gm'] },
  { id:'pr41', label:'P&R 41', sub:'El horno de fuego', src:'Elena de White', color:'#7B2D8B', cats:['av','pa','gm'] },
  { id:'pr42', label:'P&R 42', sub:'La verdadera grandeza', src:'Elena de White', color:'#7B2D8B', cats:['gm'] },
  { id:'pr43', label:'P&R 43', sub:'El vigía invisible', src:'Elena de White', color:'#7B2D8B', cats:['gm'] },
  { id:'pr44', label:'P&R 44', sub:'En el foso de los leones', src:'Elena de White', color:'#7B2D8B', cats:['av','pa','gm'] },
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
  { t:'📚 En pocas palabras', h:
    hi(`El rey de Babilonia gana la guerra y se lleva a cuatro muchachos de
    Jerusalén: <strong>Daniel, Ananías, Misael y Azarías</strong>.<br><br>
    En el palacio les cambian el nombre y les sirven la comida del rey. Daniel
    dice que no, porque esa comida iba contra lo que Dios había mandado. Pide
    una prueba: <strong>diez días comiendo solo legumbres y agua</strong>.<br><br>
    A los diez días los cuatro se ven mejor que todos los demás. Y cuando el
    rey los examina, los encuentra <strong>diez veces mejores</strong> que sus
    sabios.<br><br>
    <em>La idea del capítulo: Daniel decidió antes de que llegara la prueba.</em>`) },

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
  { t:'📚 En pocas palabras', h:
    hi(`El rey tiene un sueño que lo asusta y no quiere contarlo. Les exige a
    sus sabios que le digan <strong>qué soñó y qué significa</strong>. Nadie
    puede, y el rey manda matarlos a todos.<br><br>
    Daniel pide tiempo, ora con sus amigos, y Dios le muestra el sueño esa
    noche.<br><br>
    El sueño era <strong>una estatua gigante</strong>: cabeza de oro, pecho de
    plata, vientre de bronce, piernas de hierro, y pies de hierro con barro.
    Cada parte es un reino que iba a venir. Después una <strong>piedra</strong>
    que nadie cortó con la mano golpea la estatua y la deshace, y esa piedra se
    hace un monte que llena toda la tierra: ese es el reino de Dios.<br><br>
    <em>La idea del capítulo: Dios sabe y maneja lo que va a pasar en la
    historia.</em>`) },

  { t:'👑 Contexto histórico', h:
    hi(`Daniel 2 pasa en el <strong>segundo año del reinado de
    Nabucodonosor</strong> (2:1). Daniel y sus tres amigos ya salieron del
    entrenamiento de tres años de Daniel 1, así que ya cuentan como
    <strong>sabios de Babilonia</strong>: por eso el decreto de muerte los
    incluye (2:13), aunque a ellos nunca les preguntaron nada.<br><br>
    Ese detalle es la bisagra de todo el capítulo. Daniel no se mete de
    voluntario: <strong>la sentencia ya lo cubría</strong>.`) },

  { t:'💭 El sueño y la crisis', h:
    wa(`<strong>Año:</strong> SEGUNDO año del reinado de Nabucodonosor (2:1)<br>
    El sueño perturbó su espíritu y se le fue el sueño.<br>
    <strong>Exigencia imposible:</strong> los sabios debían <u>decir el sueño</u> Y darle la interpretación (2:5).<br>
    <strong>Amenaza (2:5):</strong> serían hechos pedazos y sus casas convertidas en <strong>estercoleros</strong>.<br>
    <strong>Decreto (2:12):</strong> que todos los sabios de Babilonia fueran muertos.<br>
    <strong>Arioc:</strong> capitán de la guardia del rey, enviado a ejecutar la sentencia (2:14).`) },

  { t:'🔮 Los cuatro grupos que llamó el rey', h:
    tbl(['Grupo','Qué hacían'],[
      ['Magos','Los sabios de la corte, expertos en los libros y los ritos'],
      ['Astrólogos','Leían el cielo para adivinar lo que iba a pasar'],
      ['Encantadores','Usaban conjuros y fórmulas'],
      ['Caldeos','La clase sacerdotal de Babilonia; son los que le contestan al rey'],
    ]) +
    li([`Los cuatro nombres están en <strong>2:2</strong>, en ese orden.`,
        `En <strong>2:27</strong> Daniel los nombra distinto: «ni sabios ni
         astrólogos, ni magos ni <strong>adivinos</strong>».`,
        `Los que hablan en arameo con el rey son los <strong>caldeos</strong> (2:4).`]) },

  { t:'💬 El pulso con los caldeos (2:4-11)', h:
    li([`Piden lo de siempre: <strong>«Cuenta el sueño a tus siervos, y te
         daremos la interpretación»</strong> (2:4). Lo piden <strong>dos
         veces</strong> (2:7).`,
        `El rey los acusa de <strong>poner dilaciones</strong> porque «veis que
         el asunto se me ha ido» (2:8).`,
        `La amenaza: <strong>hechos pedazos</strong> y las casas
         <strong>convertidas en estercoleros</strong> (2:5).`,
        `La promesa si aciertan: <strong>dones, favores y gran honra</strong> (2:6).`]) +
    wa(`La excusa con la que se rinden es la frase clave del capítulo:
    <strong>«no hay quien lo pueda declarar al rey, salvo los dioses cuya
    morada no está entre los hombres»</strong> (2:11). Ellos mismos dicen que
    hace falta un dios que viva cerca de la gente. Lo que sigue es Daniel
    demostrando que ese Dios existe.`) },

  { t:'🙌 La oración de Daniel, entera (2:20-23)', h:
    vs(`«Sea bendito el nombre de Dios de siglos en siglos, porque suyos son el
    poder y la sabiduría. Él muda los tiempos y las edades, quita reyes y pone
    reyes; da la sabiduría a los sabios y la ciencia a los entendidos. Él
    revela lo profundo y lo escondido, conoce lo que está en tinieblas y con él
    mora la luz.»`) +
    tbl(['Lo que dice de Dios','Versículo'],[
      ['Suyos son el poder y la sabiduría','2:20'],
      ['Muda los tiempos y las edades','2:21'],
      ['Quita reyes y pone reyes','2:21'],
      ['Da la sabiduría a los sabios y la ciencia a los entendidos','2:21'],
      ['Revela lo profundo y lo escondido','2:22'],
      ['Conoce lo que está en tinieblas, y con él mora la luz','2:22'],
    ]) +
    hi(`Daniel <strong>alaba antes de ir donde el rey</strong>, no después de
    que le salga bien (2:19-24). Y en 2:23 dice «nos has dado a conocer»: en
    plural, contando a los tres que oraron con él.`) },

  { t:'🙏 La respuesta de Daniel', h:
    li(['Habló a Arioc con <strong>prudencia y sabiduría</strong> (2:14)',
        'Pidió <strong>tiempo</strong> al rey para mostrar la interpretación (2:16)',
        'Fue a su casa e informó a sus compañeros; <strong>oraron pidiendo misericordia</strong> (2:17-18)',
        'El misterio le fue revelado en <strong>visión de noche</strong> (2:19)',
        'Bendijo y alabó a Dios antes de ir ante el rey (2:20-23)',
        'Declaró: «hay un Dios en los cielos que revela los misterios» (2:28)']) },

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
    hi(`• Se desprendió <strong>sin que la cortara mano alguna</strong> (2:34). Que salió del monte lo dice 2:45<br>
    • Hirió la imagen <strong>en sus pies de hierro y de barro cocido</strong> (2:34)<br>
    • Fueron desmenuzados el hierro, el barro cocido, el bronce, la plata y el oro,
      y fueron <strong>como tamo de las eras del verano</strong> (2:35)<br>
    • El viento los llevó sin que quedara rastro alguno (2:35)<br>
    • La piedra se hizo <strong>un gran monte que llenó toda la tierra</strong> (2:35)<br>
    • Ese reino <strong>no será jamás destruido</strong> ni dejado a otro pueblo (2:44)`) },

  { t:'☝️ Lo que Daniel aclaró antes de interpretar', h:
    li([`Primero dice quién <strong>no</strong> puede: «ni sabios ni
         astrólogos, ni magos ni adivinos» (2:27).`,
        `Después quién sí: <strong>«hay un Dios en los cielos que revela los
         misterios»</strong> (2:28).`,
        `Y aclara que <strong>no es mérito suyo</strong>: «no porque en mí haya
         más sabiduría que en los demás vivientes» (2:30).`,
        `Le dice para qué es el sueño: «lo que ha de acontecer en los
         <strong>últimos días</strong>» (2:28).`]) +
    hi(`Daniel tenía el problema resuelto y aun así <strong>dedicó tres
    versículos a decir que el crédito no era suyo</strong>. Ese es el gesto que
    el capítulo quiere que se vea, no el acertijo.`) },

  { t:'🦶 Los pies: por qué no se unen (2:41-43)', h:
    li([`El reino será <strong>dividido</strong>, pero con «algo de la fuerza
         del hierro» (2:41).`,
        `Por los dedos, en parte de hierro y en parte de barro, será
         <strong>en parte fuerte y en parte frágil</strong> (2:42).`,
        `<strong>«Se mezclarán por medio de alianzas humanas; pero no se unirán
         el uno con el otro, como el hierro no se mezcla con el barro»</strong>
         (2:43).`]) +
    hi(`Aquí está el único detalle del sueño que trae su propia explicación de
    por qué falla: <strong>las alianzas se intentan y no pegan</strong>. Si en
    el examen preguntan qué representan los pies, la respuesta lleva las dos
    partes: divididos, y que no logran unirse.`) },

  { t:'👑 El reino que no será destruido (2:44-45)', h:
    tbl(['Lo que dice el texto','Versículo'],[
      ['Lo levanta <strong>el Dios del cielo</strong>','2:44'],
      ['Aparece <strong>«en los días de estos reyes»</strong>','2:44'],
      ['<strong>No será jamás destruido</strong>','2:44'],
      ['No será dejado a otro pueblo','2:44'],
      ['Desmenuzará y consumirá a todos estos reinos','2:44'],
      ['Él permanecerá para siempre','2:44'],
      ['«El sueño es verdadero, y fiel su interpretación»','2:45'],
    ]) },

  { t:'🙇 La reacción de Nabucodonosor (2:46-47)', h:
    li([`<strong>Se postró sobre su rostro</strong> y se humilló ante Daniel (2:46).`,
        `Mandó que le ofrecieran <strong>presentes e incienso</strong> (2:46).`,
        `Dijo: <strong>«Ciertamente el Dios vuestro es Dios de dioses, Señor de
         los reyes y el que revela los misterios»</strong> (2:47).`]) +
    wa(`Ojo con esto, porque en Daniel 3 el mismo rey manda hacer una estatua
    de oro entera y exige que la adoren. <strong>Reconocer a Dios una vez no
    fue lo mismo que seguirlo.</strong>`) },

  { t:'🏅 Consecuencias', h:
    tbl(['Persona','Lo que recibió'],[
      ['Daniel','Gobernador de toda la provincia de Babilonia y <strong>jefe supremo de todos los sabios</strong> de Babilonia (2:48)'],
      ['Sadrac, Mesac y Abed-nego','Puestos <strong>sobre los negocios</strong> de la provincia de Babilonia, por petición de Daniel (2:49)'],
      ['Daniel (además)','Se quedó <strong>en la corte del rey</strong> (2:49)'],
    ]) },

  { t:'📖 Versículo clave', h:
    vs(`«Sea bendito el nombre de Dios de siglos en siglos, porque suyos son
    <strong>el poder y la sabiduría</strong>.» (Daniel 2:20)`) },
],

/* ═══════════════ DANIEL 3 ═══════════════ */
d3: [
  { t:'📚 En pocas palabras', h:
    hi(`El rey manda hacer <strong>una estatua de oro enorme</strong> y ordena
    que todos se arrodillen cuando suene la música. El que no lo haga va a un
    horno de fuego.<br><br>
    <strong>Sadrac, Mesac y Abed-nego</strong> no se arrodillan. El rey los
    llama, les da otra oportunidad y les pregunta qué dios podrá salvarlos.
    Ellos responden que su Dios puede salvarlos, <strong>y que si no lo hace,
    igual no van a adorar la estatua</strong>.<br><br>
    El rey manda calentar el horno siete veces más y los echa adentro. Y
    entonces ve <strong>cuatro</strong> caminando en el fuego, no tres. Al
    salir, ni el pelo se les había quemado.<br><br>
    <em>La idea del capítulo: obedecer a Dios sin condiciones, aunque no se vea
    el milagro de antemano.</em>`) },

  { t:'🗿 La estatua de oro', h:
    tbl(['Dato','Valor exacto'],[
      ['Altura','SESENTA codos (3:1)'],
      ['Anchura','SEIS codos (3:1)'],
      ['Material','Oro'],
      ['Lugar','Campo de DURA, en la provincia de Babilonia (3:1)'],
    ]) },

  { t:'👔 Los ocho cargos que convocó el rey (3:2-3)', h:
    hi(`<strong>Sátrapas, magistrados, capitanes, oidores, tesoreros,
    consejeros, jueces</strong> y todos los gobernadores de las
    provincias.<br><br>
    La lista aparece <strong>dos veces seguidas</strong>, en 3:2 (cuando el rey
    ordena que vengan) y en 3:3 (cuando llegan), palabra por palabra. Ese es un
    recurso del capítulo: repetir la lista completa para que se sienta el
    tamaño del acto oficial.`) +
    wa(`Ojo con no confundirla con los cuatro grupos de sabios de Daniel 2:2
    (magos, astrólogos, encantadores, caldeos). Aquí son
    <strong>funcionarios de gobierno</strong>, no adivinos.`) },

  { t:'📢 La orden y la amenaza (3:4-6)', h:
    li([`Quién lo anuncia: <strong>el pregonero</strong>, en alta voz (3:4).`,
        `A quiénes: <strong>«pueblos, naciones y lenguas»</strong> (3:4).`,
        `Qué hay que hacer: <strong>postrarse y adorar</strong> al oír la música (3:5).`,
        `El castigo: <strong>«inmediatamente será echado dentro de un horno de
         fuego ardiente»</strong> (3:6).`]) +
    hi(`En 3:7 dice que <strong>«todos los pueblos, naciones y lenguas se
    postraron»</strong>. Los tres jóvenes no se enfrentaron a una ley
    impopular: se quedaron de pie cuando <strong>todo el mundo se
    arrodilló</strong>.`) },

  { t:'🕵️ Quién los acusó, y de qué (3:8-12)', h:
    li([`Fueron <strong>«algunos hombres caldeos»</strong> los que
         «acusaron maliciosamente a los judíos» (3:8).`,
        `Primero le recordaron al rey su propia ley (3:10-11), para que no
         pudiera echarse atrás.`,
        `Los identificaron por el cargo: <strong>«a los cuales pusiste sobre
         los negocios de la provincia de Babilonia»</strong> (3:12), el puesto
         que Daniel les consiguió en 2:49.`,
        `Tres acusaciones: <strong>no te han respetado</strong>, no adoran a
         tus dioses, y no adoran la estatua (3:12).`]) +
    hi(`La acusación no salió de un desconocido: salió de gente que sabía
    exactamente <strong>qué cargo tenían y quién los había puesto ahí</strong>.
    El ascenso de Daniel 2 fue lo que los volvió un blanco.`) },

  { t:'🗣️ El desafío del rey, y la respuesta corta (3:14-16)', h:
    li([`El rey pregunta si es verdad, y les <strong>ofrece una segunda
         oportunidad</strong>: si adoran al oír la música, no pasa nada (3:15).`,
        `Cierra con un reto directo: <strong>«¿y qué dios será el que os libre
         de mis manos?»</strong> (3:15).`,
        `Ellos contestan primero una sola frase: <strong>«No es necesario que
         te respondamos sobre este asunto»</strong> (3:16).`]) +
    hi(`Esa frase es lo que hace fuerte lo que dicen después. <strong>No
    estaban decidiendo en ese momento</strong>: la decisión ya estaba tomada,
    y no había nada que deliberar.`) },

  { t:'🎵 Los seis instrumentos — orden exacto', h:
    wa(`<strong>Daniel 3:5 en la RV1995</strong> (la lista se repite en 3:7, 3:10 y 3:15):<br><br>
    1. BOCINA &nbsp;→&nbsp; 2. FLAUTA &nbsp;→&nbsp; 3. CÍTARA &nbsp;→&nbsp;
    4. ARPA &nbsp;→&nbsp; 5. SALTERIO &nbsp;→&nbsp; 6. ZAMPOÑA<br><br>
    Y después: «y todo instrumento de música».<br><br>
    <strong>❌ NO aparece:</strong> la TROMPETA`) +
    hi(`<strong>⚠ Ojo con el tercero.</strong> La RV1995 dice
    <strong>CÍTARA</strong>. La RV1960, que es la que más se oye, dice
    <strong>tamboril</strong> en ese lugar.<br>
    Si la pregunta dice <em>según la RV1995</em>, la respuesta es <u>cítara</u>.`) },

  { t:'🔥 El horno de fuego', h:
    hi(`• El rostro de Nabucodonosor se demudó contra ellos (3:19)<br>
    • Mandó calentar el horno <strong>SIETE veces más</strong> de lo acostumbrado (3:19)<br>
    • Fueron atados con <strong>sus mantos, sus calzados, sus turbantes y sus vestidos</strong> (3:21)<br>
    • A los <strong>varones vigorosos</strong> que los echaron, <strong>la llama del fuego los mató</strong> (3:22)<br>
    • Nabucodonosor vio <strong>CUATRO varones sueltos</strong> paseándose en medio del fuego (3:25)<br>
    • El aspecto del cuarto: <strong>«semejante a un hijo de los dioses»</strong> (3:25, RV1995)<br>
    Así lo describió Nabucodonosor, que era pagano. <strong>P&amp;R cap. 41 aclara que era el Hijo de Dios mismo.</strong>`) },

  { t:'🔢 Lo que pasó dentro del horno (3:19-25)', h:
    tbl(['Dato','Texto RV1995'],[
      ['Cuánto lo calentaron','<strong>Siete veces más</strong> de lo acostumbrado (3:19)'],
      ['Quién los ató','Hombres <strong>muy vigorosos</strong> del ejército (3:20)'],
      ['Con qué ropa entraron','Sus <strong>mantos, calzados, turbantes y vestidos</strong> (3:21)'],
      ['Quiénes murieron','<strong>Los que los alzaron</strong>, por la llama (3:22)'],
      ['Cómo cayeron','<strong>Atados</strong>, dentro del horno (3:23)'],
      ['Cuántos vio el rey','<strong>Cuatro</strong> hombres <strong>sueltos</strong>, paseándose (3:25)'],
      ['El cuarto','«El aspecto del cuarto es semejante a un hijo de los dioses» (3:25)'],
    ]) +
    hi(`El contraste que el capítulo arma es exacto: <strong>entraron atados y
    vestidos, y adentro estaban sueltos y paseándose</strong>. Lo único que se
    quemó fueron las cuerdas, y eso lo confirma 3:27 al decir que la ropa no se
    dañó.`) +
    wa(`Cuidado con una pregunta trampa: <strong>el rey no cambió el aspecto
    del horno, cambió «el aspecto de su rostro»</strong> (3:19). Y el que se
    espantó y se levantó apresuradamente fue él (3:24).`) },

  { t:'✨ El milagro verificado (3:27)', h:
    vs(`«...cómo <strong>el fuego no había tenido poder alguno</strong> sobre sus cuerpos
    y ni aun el cabello de sus cabezas se había quemado;
    sus ropas, <strong>intactas</strong>,
    <strong>ni siquiera olor de fuego tenían</strong>.» (RV1995)`) +
    hi(`Se juntaron los sátrapas, los gobernadores, los capitanes y los consejeros del rey
    <u>para verificarlo con sus propios ojos</u> (3:27).`) },

  { t:'📜 La respuesta de los tres jóvenes (3:17-18)', h:
    vs(`«Nuestro Dios, a quien servimos, <strong>puede librarnos</strong> del horno de fuego ardiente;
    y de tus manos, rey, nos librará. <strong>Y si no</strong>, has de saber, oh rey, que no serviremos
    a tus dioses ni tampoco adoraremos la estatua que has levantado.»`) },

  { t:'👑 El decreto de Nabucodonosor (3:28-30)', h:
    li(['Bendijo al Dios de Sadrac, Mesac y Abed-nego, que <strong>envió su ángel</strong> y los libró (3:28)',
        'Decretó que quien hablara blasfemia contra ese Dios <strong>sea descuartizado y su casa convertida en estercolero</strong> (3:29)',
        'Reconoció: <strong>«no hay dios que pueda librar como éste»</strong> (3:29)',
        'Los <strong>engrandeció</strong> en la provincia de Babilonia (3:30)']) },
],

/* ═══════════════ DANIEL 4 ═══════════════ */
d4: [
  { t:'📚 En pocas palabras', h:
    hi(`El rey Nabucodonosor está en la cima: tranquilo en su casa, floreciente
    en su palacio. Sueña con <strong>un árbol enorme</strong> que da sombra y
    alimento a todos, y oye a un mensajero del cielo ordenar que lo
    derriben.<br><br>
    Daniel le dice que el árbol <strong>es él</strong>, y le da un consejo para
    evitarlo. El rey no lo toma. <strong>Doce meses después</strong>, mirando
    Babilonia desde su palacio, se atribuye la gloria, y en esa misma hora
    pierde la razón y vive como una bestia por <strong>siete tiempos</strong>.<br><br>
    Al final alza los ojos al cielo, recupera la razón y recupera el reino con
    <strong>mayor grandeza</strong>. El capítulo entero lo cuenta él mismo.`) },

  { t:'✍️ Quién escribe este capítulo', h:
    hi(`Daniel 4 es el único capítulo del libro escrito como
    <strong>carta del propio Nabucodonosor</strong>. Abre así:
    «Nabucodonosor, rey, a todos los pueblos, naciones y lenguas que moran en
    toda la tierra: Paz os sea multiplicada» (4:1).<br><br>
    Por eso el texto habla en primera persona: «Yo, Nabucodonosor, estaba
    tranquilo en mi casa, floreciente en mi palacio» (4:4). Es
    <strong>el rey contando su propia humillación</strong> y publicándola en
    todo el imperio.`) },

  { t:'🔮 Los sabios fallaron otra vez (4:6-9)', h:
    li([`Llamó a <strong>todos los sabios de Babilonia</strong> (4:6).`,
        `Vinieron <strong>magos, astrólogos, caldeos y adivinos</strong> (4:7).
         Es una lista distinta a la de 2:2, donde eran magos, astrólogos,
         encantadores y caldeos.`,
        `Les contó el sueño y <strong>«no me pudieron dar su
         interpretación»</strong> (4:7). Esta vez el rey sí les dijo qué había
         soñado, y aun así fallaron.`,
        `A Daniel lo llama <strong>«jefe de los magos»</strong> (4:9), el cargo
         que recibió en 2:48.`]) +
    hi(`Vale comparar los dos capítulos: en Daniel 2 la excusa fue que el rey
    no contaba el sueño. Aquí lo contó, y <strong>el resultado fue el
    mismo</strong>.`) },

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
    vs(`«Por tanto, oh rey, acepta mi consejo: <strong>redime tus pecados con justicia</strong>,
    y tus iniquidades <strong>haciendo misericordias con los oprimidos</strong>,
    pues tal vez será eso una prolongación de tu tranquilidad.»`) },

  { t:'⏳ El cumplimiento', h:
    tbl(['Momento','Detalle'],[
      ['Tiempo de gracia','<strong>DOCE MESES</strong> (al cabo de un año) después de la advertencia (4:29)'],
      ['La jactancia','«¿No es ésta la gran Babilonia que yo edifiqué para casa real con la fuerza de mi poder, y para gloria de mi majestad?» (4:30)'],
      ['El juicio','Aún estaba la palabra en su boca cuando vino una voz del cielo (4:31)'],
      ['Su cabello','Le creció <strong>como plumas de águila</strong> (4:33)'],
      ['Sus uñas','Como las <strong>de las aves</strong> (4:33)'],
      ['Su alimento','Comía hierba como los bueyes; su cuerpo se mojaba con el rocío (4:33)'],
    ]) },

  { t:'👤 Cómo reaccionó Daniel al entender el sueño (4:19)', h:
    li([`<strong>Quedó atónito casi una hora</strong> y sus pensamientos lo
         turbaban (4:19).`,
        `El rey tuvo que calmarlo a él: «no te turben ni el sueño ni su
         interpretación» (4:19).`,
        `Daniel le contestó: <strong>«Señor mío, el sueño sea para tus enemigos
         y su interpretación para los que mal te quieren»</strong> (4:19).`]) +
    hi(`Daniel llevaba décadas cautivo del imperio de este hombre y aun así
    <strong>le dolió tener que darle la noticia</strong>. Eso es lo que hace
    creíble el consejo que da ocho versículos después: no venía de rencor.`) },

  { t:'⚖️ Qué significaba cada parte (4:20-26)', h:
    tbl(['En el sueño','Qué significaba'],[
      ['El árbol grande y fuerte','El rey mismo: «tú mismo eres, oh rey» (4:22)'],
      ['La copa hasta el cielo','Su grandeza, que «ha llegado hasta el cielo» (4:22)'],
      ['Verse desde los confines','Su dominio «hasta los confines de la tierra» (4:22)'],
      ['Derribar el árbol','Que lo echarían de entre los hombres (4:25)'],
      ['Vivir con las bestias','Comer hierba «como a los bueyes» y ser bañado por el rocío (4:25)'],
      ['<strong>La cepa que queda</strong>','Que <strong>el reino le quedaría firme</strong> después de reconocer «que es el cielo el que gobierna» (4:26)'],
    ]) +
    hi(`La cepa es la parte que suele olvidarse. <strong>El castigo traía la
    restauración adentro desde el primer día</strong>: nunca fue el fin del
    reino, fue un plazo.`) },

  { t:'🎯 Para qué era todo, según el texto', h:
    li([`«Para que <strong>conozcan los vivientes</strong> que el Altísimo
         gobierna el reino de los hombres» (4:17).`,
        `«Hasta que <strong>conozcas</strong> que el Altísimo tiene dominio en
         el reino de los hombres, y que lo da a quien él quiere» (4:25).`,
        `«Hasta que <strong>reconozcas</strong> que el Altísimo tiene el dominio
         en el reino de los hombres, y lo da a quien él quiere» (4:32).`]) +
    hi(`La misma idea aparece <strong>tres veces</strong>, en boca del
    mensajero, de Daniel y de la voz del cielo. Cuando un capítulo repite algo
    tres veces con palabras casi iguales, eso es lo que va a preguntar el
    examen.`) },

  { t:'🙌 La restauración (4:34-37)', h:
    hi(`• Al fin del tiempo, Nabucodonosor <strong>alzó sus ojos al cielo</strong> (4:34)<br>
    • Su razón le fue devuelta; bendijo al Altísimo y lo alabó (4:34)<br>
    • Fue restituido en su reino, y <strong>mayor grandeza le fue añadida</strong> (4:36)`) +
    vs(`«Ahora yo, Nabucodonosor, <strong>alabo, engrandezco y glorifico al Rey del cielo</strong>,
    porque todas sus obras son verdaderas y sus caminos justos;
    y él puede humillar a los que andan con soberbia.» (Daniel 4:37)`) },
],

/* ═══════════════ DANIEL 5 ═══════════════ */
d5: [
  { t:'📚 En pocas palabras', h:
    hi(`El rey Belsasar hace una fiesta para <strong>mil príncipes</strong> y,
    ya con el vino, manda traer <strong>los vasos del templo de
    Jerusalén</strong> para beber en ellos y brindar por sus dioses.<br><br>
    En esa misma hora aparece <strong>una mano escribiendo en la pared</strong>.
    Ningún sabio puede leerla. La reina se acuerda de Daniel; Daniel entra,
    <strong>rechaza los regalos</strong>, le recuerda lo que le pasó a
    Nabucodonosor y le lee la sentencia.<br><br>
    <strong>Esa misma noche</strong> Belsasar fue muerto y Darío de Media tomó
    el reino (5:30-31).`) },

  { t:'⚡ Cómo quedó el rey al ver la mano (5:6)', h:
    li([`<strong>Palideció</strong>.`,
        `Sus pensamientos lo turbaron.`,
        `<strong>Se debilitaron sus caderas</strong>.`,
        `<strong>Sus rodillas daban la una contra la otra</strong>.`]) +
    hi(`Son cuatro detalles físicos en un solo versículo, y el examen los puede
    pedir. Vale memorizarlos como una escena: <strong>color, cabeza, caderas,
    rodillas</strong>, de arriba abajo.`) },

  { t:'👸 La reina fue la que se acordó de Daniel (5:10-12)', h:
    li([`Entró sola a la sala del banquete, sin que la llamaran (5:10).`,
        `Dijo que en Daniel había <strong>«luz, inteligencia y
         sabiduría»</strong> (5:11).`,
        `Recordó que Nabucodonosor lo puso <strong>jefe sobre todos los magos,
         astrólogos, caldeos y adivinos</strong> (5:11).`,
        `Nombró tres capacidades: <strong>interpretar sueños, descifrar enigmas
         y resolver dudas</strong> (5:12).`]) +
    wa(`Dato que se pregunta: <strong>Belsasar no conocía a Daniel</strong>,
    o no lo tenía presente, aunque Daniel llevaba décadas sirviendo en ese
    mismo palacio. Hizo falta que alguien más se acordara.`) },

  { t:'🚫 Daniel rechazó el pago (5:17)', h:
    vs(`«Tus dones sean para ti; da tus recompensas a otros. Leeré la escritura
    al rey y le daré la interpretación.»`) +
    hi(`Lo dijo <strong>antes</strong> de leer la escritura, no después. Y al
    final igual recibió la púrpura, el collar y el tercer puesto, porque el rey
    lo mandó (5:29). <strong>Rechazar el pago no fue lo mismo que rechazar el
    cargo</strong>: lo que hizo fue no cobrar por decir la verdad.`) },

  { t:'📖 La acusación exacta (5:18-23)', h:
    tbl(['Lo que Daniel le recordó','Versículo'],[
      ['A Nabucodonosor Dios le dio el reino, la grandeza, la gloria y la majestad','5:18'],
      ['Cuando «su corazón se ensoberbeció», fue depuesto del trono','5:20'],
      ['Vivió con las bestias hasta reconocer que el Altísimo tiene dominio','5:21'],
      ['<strong>«Pero tú, su hijo Belsasar, no has humillado tu corazón sabiendo todo esto»</strong>','5:22'],
      ['Bebió en los vasos de la Casa de Dios','5:23'],
      ['Alabó dioses «que ni ven ni oyen ni saben»','5:23'],
      ['<strong>«Nunca honraste al Dios en cuya mano está tu vida»</strong>','5:23'],
    ]) +
    hi(`El cargo no es la fiesta ni los vasos: es <strong>«sabiendo todo
    esto»</strong> (5:22). Belsasar tenía el caso de su propio padre delante y
    no aprendió. Ahí está la diferencia con Daniel 4, donde el rey sí
    reaccionó.`) },

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
  { t:'📚 En pocas palabras', h:
    hi(`Daniel ya es un anciano y es el primero de los tres gobernadores del
    reino. A los demás les da envidia y lo espían buscando algo malo.
    <strong>No encuentran nada.</strong><br><br>
    Entonces convencen al rey Darío de firmar una ley: por
    <strong>treinta días</strong>, el que le pida algo a un dios o a un hombre
    que no sea el rey, va al foso de los leones.<br><br>
    Daniel se entera y sigue orando igual que siempre: con las ventanas
    abiertas hacia Jerusalén, <strong>tres veces al día</strong>. Lo acusan y
    el rey, que no puede cambiar su propia ley, lo manda al foso.<br><br>
    Al amanecer el rey corre a llamarlo, y Daniel está vivo: Dios envió su
    ángel y le cerró la boca a los leones.<br><br>
    <em>La idea del capítulo: lo que Daniel hacía todos los días fue lo que lo
    sostuvo el día difícil.</em>`) },

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
      si no lo hallamos <strong>contra él en relación con la ley de su Dios</strong>» (6:5)`) +
    tbl(['El edicto','Detalle'],[
      ['Duración','TREINTA días (6:7)'],
      ['Prohibición','Pedir petición a cualquier dios u hombre fuera del rey (6:7)'],
      ['Pena','Ser echado en el <strong>foso de los leones</strong> (6:7)'],
      ['Carácter','Ley de Media y de Persia, <strong>la cual no puede ser abrogada</strong> (6:8)'],
    ]) },

  { t:'🙏 La fidelidad de Daniel — versículo central', h:
    vs(`«Cuando Daniel supo que el edicto había sido firmado, <strong>entró en su casa</strong>;
    abiertas las ventanas de su habitación que daban a Jerusalén,
    <strong>se arrodillaba tres veces al día</strong>, oraba y daba gracias delante de su Dios
    <strong>como solía hacerlo antes</strong>.» (Daniel 6:10)`) +
    wa(`Fíjate en tres cosas que suelen preguntarse por separado:
    <strong>hacia Jerusalén</strong>, <strong>tres veces al día</strong>,
    y <strong>como solía hacerlo antes</strong> — no cambió su costumbre por miedo.`) },

  { t:'🦁 El foso de los leones', h:
    tbl(['#','Evento','Ref.'],[
      ['1','Lo hallan orando y rogando delante de su Dios','6:11'],
      ['2','Lo acusan ante el rey recordándole el edicto','6:12-13'],
      ['3','El rey se afligió y <strong>hasta la puesta del sol trabajó por librarlo</strong>','6:14'],
      ['4','Los hombres insisten: la ley no puede ser abrogada','6:15'],
      ['5','Daniel es echado al foso; el rey le dice: «El Dios tuyo, a quien tú continuamente sirves, él te libre»','6:16'],
      ['6','Una piedra sella la puerta, con el <strong>anillo del rey y el de sus príncipes</strong>','6:17'],
      ['7','El rey <strong>se acostó en ayunas</strong>; no trajeron ante él instrumentos musicales, y se le fue el sueño','6:18'],
      ['8','<strong>Se levantó muy de mañana</strong> y fue apresuradamente al foso','6:19'],
      ['9','Clamó con voz triste: «¿te ha podido librar de los leones?»','6:20'],
      ['10','Daniel responde desde el foso','6:21-22'],
      ['11','Sacado del foso, <strong>ninguna lesión se halló en él, porque había confiado en su Dios</strong>','6:23'],
      ['12','Los acusadores, sus hijos y sus mujeres, echados al foso','6:24'],
    ]) },

  { t:'📖 La respuesta de Daniel (6:22)', h:
    vs(`«<strong>Mi Dios envió su ángel</strong>, el cual cerró la boca de los leones
    para que no me hicieran daño, porque ante él fui hallado inocente;
    y aun delante de ti, oh rey, yo no he hecho nada malo.»`) },

  { t:'👑 El decreto de Darío (6:25-27)', h:
    hi(`Escribió a todos los pueblos, naciones y lenguas:<br><br>
    • Que <strong>teman y tiemblen ante la presencia del Dios de Daniel</strong><br>
    • «Porque él es el <strong>Dios viviente y permanece por todos los siglos</strong>»<br>
    • «Su reino no será jamás destruido y su dominio perdurará hasta el fin»<br>
    • «Él <strong>salva y libra</strong>, y hace señales y maravillas en el cielo y en la tierra»<br>
    • «Él ha librado a Daniel del poder de los leones»`) },
],

/* ═══════════════ P&R 39 ═══════════════ */
pr39: [
  { t:'📚 En pocas palabras', h:
    hi(`Este capítulo del libro de Elena de White explica <strong>por qué</strong>
    Daniel no quiso la comida del rey.<br><br>
    No fue capricho ni mala educación. Esa comida se le ofrecía primero a los
    ídolos, y comerla era como aceptar a esos dioses. Además el vino del rey
    <strong>ponía la mente torpe</strong>.<br><br>
    Daniel pidió el cambio <strong>con respeto</strong>, no peleando. Y Dios le
    dio salud y una cabeza más despierta que la de todos.<br><br>
    <em>La idea: lo que comemos y cómo cuidamos el cuerpo también afecta la
    mente y la vida con Dios.</em>`) },

  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 39: «En la corte de Babilonia»</strong>`) },

  { t:'🔗 En qué capítulo de Daniel se basa', h:
    hi(`El libro lo dice en la primera línea:
    <strong>“Este capítulo está basado en Daniel 1.”</strong><br><br>
    Los seis van emparejados uno a uno:<br>
    <strong>P&amp;R 39 → Daniel 1</strong> · P&amp;R 40 → Daniel 2 ·
    P&amp;R 41 → Daniel 3 · P&amp;R 42 → Daniel 4 · P&amp;R 43 → Daniel 5 ·
    P&amp;R 44 → Daniel 6.`) },

  { t:'⚙️ Para qué estaban ahí, según P&R', h:
    li([`Eran <strong>“cautivos puestos en un país extraño por la Sabiduría
         infinita”</strong>: no los llevó allá el orgullo ni la ambición.`,
        `Su tarea era <strong>dar a las naciones paganas el conocimiento de
         Jehová</strong>. Iban a ser <strong>representantes de Dios</strong>.`,
        `<strong>No debían transigir con los idólatras</strong> en ningún caso.`,
        `Honraron a Dios <strong>en la prosperidad y en la adversidad</strong>,
         y Dios los honró a ellos.`]) +
    hi(`Ese es el giro del capítulo: los babilonios usaban el cautiverio y los
    vasos del templo <strong>como prueba de que su religión era
    superior</strong>. Dios dio evidencia de lo contrario
    <strong>por medio de los que le eran leales</strong>, y de la única manera
    en que podía darse.`) },

  { t:'📈 Cómo les fue en los tres años', h:
    tbl(['Momento','Lo que dice el capítulo'],[
      ['A los diez días','El resultado fue <strong>lo opuesto</strong> de lo que temía el príncipe'],
      ['Qué estudiaron','<strong>Tres años</strong> las letras y la lengua de los caldeos'],
      ['Qué unían a sus hábitos','<strong>Propósito ferviente, diligencia y constancia</strong>'],
      ['Qué les dio Dios','Conocimiento e inteligencia en todas las letras y ciencia'],
      ['Lo propio de Daniel','<strong>Entendimiento en toda visión y sueños</strong>'],
      ['En el examen final','No fue hallado otro como ellos entre todos los candidatos'],
    ]) +
    hi(`La promesa que el capítulo aplica al caso es de otro libro:
    <strong>“Yo honraré a los que me honran”</strong> (1 Samuel 2:30). Vale
    saberla, porque es una cita que no está en Daniel.`) },

  { t:'🚫 Lo que NO fue', h:
    wa(`Tres cosas que el capítulo descarta expresamente, y que son las
    respuestas equivocadas típicas:<br><br>
    • <strong>No fue capricho ni moda</strong>: la comida iba contra la ley de Dios.<br>
    • <strong>No fue orgullo ni ambición</strong> lo que los llevó a la corte.<br>
    • <strong>No fue rebeldía</strong>: Daniel propuso una prueba y pidió permiso.`) },

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
  { t:'🔗 En qué capítulo de Daniel se basa', h:
    hi(`El libro lo dice en la primera línea:
    <strong>“Este capítulo está basado en Daniel 2.”</strong><br><br>
    Los seis van emparejados uno a uno:<br>
    P&amp;R 39 → Daniel 1 · <strong>P&amp;R 40 → Daniel 2</strong> · P&amp;R 41 → Daniel 3 · P&amp;R 42 → Daniel 4 · P&amp;R 43 → Daniel 5 · P&amp;R 44 → Daniel 6`) },

  { t:'🔁 Las dos veces que los sabios evadieron', h:
    li([`El rey los llamó y les contó su problema, no el sueño, porque
         <strong>al despertar no pudo recordar los detalles</strong>.`,
        `Ellos contestaron: <em>di el sueño a tus siervos, y mostraremos la
         declaración</em>. Es una <strong>respuesta evasiva</strong>.`,
        `El rey sospechó que, <strong>a pesar de sus aseveraciones jactanciosas
         de poder revelar los secretos</strong>, no estaban dispuestos a
         ayudarle.`,
        `Puso las dos cosas en la mesa: <strong>riquezas y honores por un lado,
         amenazas de muerte por el otro</strong>.`,
        `Y ellos <strong>repitieron exactamente lo mismo</strong>.`]) +
    hi(`Ese es el punto que P&amp;R agrega a Daniel 2: el rey no estaba siendo
    caprichoso. <strong>Estaba probando si sus sabios podían lo que
    decían</strong> que podían, y la segunda respuesta idéntica fue lo que lo
    hizo estallar.`) },


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
  { t:'📚 En pocas palabras', h:
    hi(`Aquí Elena de White explica quién era <strong>el cuarto</strong> que el
    rey vio caminando en el horno: era <strong>el Hijo de Dios mismo</strong>.<br><br>
    Fíjate en algo importante: Dios <u>no</u> los sacó de la prueba. Los
    acompañó <strong>dentro</strong> de ella.<br><br>
    Lo más fuerte del capítulo es la frase de los tres jóvenes:
    <strong>«y si no»</strong>. Querían decir que iban a obedecer aunque Dios
    no los salvara. No estaban haciendo un trato con Dios.<br><br>
    <em>La idea: la fe de verdad obedece sin pedir el resultado por
    adelantado.</em>`) },

  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 41: «El horno de fuego»</strong>`) },

  { t:'🔗 En qué capítulo de Daniel se basa', h:
    hi(`El libro lo dice en la primera línea del capítulo:
    <strong>“Este capítulo está basado en Daniel 3.”</strong><br><br>
    Los seis van emparejados uno a uno, y esa correspondencia se pregunta:<br>
    P&amp;R 39 → Daniel 1 · P&amp;R 40 → Daniel 2 ·
    <strong>P&amp;R 41 → Daniel 3</strong> · P&amp;R 42 → Daniel 4 ·
    P&amp;R 43 → Daniel 5 · P&amp;R 44 → Daniel 6.`) },

  { t:'🗿 Por qué la estatua era TODA de oro', h:
    hi(`Este dato <strong>solo está en P&amp;R</strong>, no en Daniel 3, y por
    eso es de los que más se preguntan.<br><br>
    La frase <strong>“Tú eres aquella cabeza de oro”</strong> (Daniel 2:38) le
    quedó marcada al rey. Sus propios sabios le propusieron
    <strong>hacer una imagen parecida a la del sueño</strong> y levantarla
    donde todos pudieran verla.`) +
    li([`El rey no se conformó con copiarla: decidió
         <strong>superar el original</strong>.`,
        `En su estatua <strong>no habría descenso de valores</strong> de la
         cabeza a los pies: sería <strong>toda de oro</strong>.`,
        `El mensaje era que Babilonia sería un <strong>reino eterno,
         indestructible y todopoderoso</strong>, y no uno de cuatro que serían
         reemplazados.`]) +
    wa(`O sea que la estatua de Daniel 3 fue <strong>una respuesta al sueño de
    Daniel 2</strong>: el rey estaba contradiciendo la profecía a propósito.`) },

  { t:'⏳ Qué pasó entre Daniel 2 y Daniel 3', h:
    li([`Después de reconocer a Dios, Nabucodonosor <strong>sintió el temor de
         Dios por un tiempo</strong>.`,
        `Pero su corazón <strong>no quedó limpio de ambición</strong> ni del
         deseo de ensalzarse a sí mismo.`,
        `<strong>La prosperidad lo llenó de orgullo</strong>.`,
        `Con el tiempo dejó de honrar a Dios y volvió a los ídolos
         <strong>con más celo y fanatismo que antes</strong>.`]) +
    hi(`Eso contesta la pregunta que a los niños se les hace sola: <em>¿cómo el
    mismo rey que se postró ante Daniel manda quemar a tres muchachos?</em>
    Según P&amp;R, <strong>reconocer a Dios una vez no le cambió el
    carácter</strong>, y fue la prosperidad, no la desgracia, la que lo
    tumbó.`) },

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
  { t:'🔗 En qué capítulo de Daniel se basa', h:
    hi(`El libro lo dice en la primera línea:
    <strong>“Este capítulo está basado en Daniel 4.”</strong><br><br>
    Los seis van emparejados uno a uno:<br>
    P&amp;R 39 → Daniel 1 · P&amp;R 40 → Daniel 2 · P&amp;R 41 → Daniel 3 · <strong>P&amp;R 42 → Daniel 4</strong> · P&amp;R 43 → Daniel 5 · P&amp;R 44 → Daniel 6`) },

  { t:'👑 Lo que Dios pudo usar en un rey idólatra', h:
    li([`La Inspiración misma lo llama <strong>“rey de reyes”</strong>
         (Ezequiel 26:7).`,
        `Varias veces <strong>había atribuido la gloria de su reino al favor de
         Jehová</strong>, sobre todo después del sueño de la gran imagen.`,
        `Después <strong>perdió de vista</strong> el propósito de Dios con las
         naciones.`,
        `Aun siendo <strong>idólatra por nacimiento y educación</strong>, tenía
         <strong>un sentido innato de la justicia y de lo recto</strong>, y por
         eso Dios pudo usarlo.`]) +
    hi(`El título del capítulo es <strong>“La verdadera grandeza”</strong> y
    ahí está la tesis: la grandeza del rey no estaba en el imperio sino en lo
    que reconocía. El capítulo no lo pinta como un monstruo, lo pinta como
    alguien que <strong>subía y bajaba</strong>.`) },


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
  { t:'🔗 En qué capítulo de Daniel se basa', h:
    hi(`El libro lo dice en la primera línea:
    <strong>“Este capítulo está basado en Daniel 5.”</strong><br><br>
    Los seis van emparejados uno a uno:<br>
    P&amp;R 39 → Daniel 1 · P&amp;R 40 → Daniel 2 · P&amp;R 41 → Daniel 3 · P&amp;R 42 → Daniel 4 · <strong>P&amp;R 43 → Daniel 5</strong> · P&amp;R 44 → Daniel 6`) },

  { t:'👨‍👦 ¿Padre o abuelo? El dato que aclara P&R', h:
    wa(`<strong>Daniel 5 llama a Nabucodonosor “su padre”</strong> (5:2, 11,
    13, 18). <strong>P&amp;R dice que Belsasar era su nieto.</strong><br><br>
    No es una contradicción: en el lenguaje de la Biblia
    <strong>“padre” incluye al antepasado</strong>, como «hijo de David» se le
    dice a alguien de generaciones después. Si en el examen preguntan por el
    parentesco, hay que fijarse en <strong>cuál de los dos libros</strong>
    están preguntando.`) },

  { t:'⏳ Cuánto tiempo había pasado', h:
    li([`Los cambios pasan <strong>hacia el fin de la vida de Daniel</strong>.`,
        `Habían sido llevados cautivos <strong>más de sesenta años
         antes</strong>.`,
        `Nabucodonosor ya había muerto, y Babilonia quedó en manos de
         <strong>sucesores imprudentes</strong>: el resultado fue
         <strong>“una disolución gradual pero segura”</strong>.`,
        `Belsasar fue <strong>admitido en su juventud a compartir la autoridad
         real</strong>.`]) +
    hi(`Eso pone en escala todo el libro: entre Daniel 1 y Daniel 5 pasan más
    de sesenta años. <strong>El muchacho que pidió legumbres y agua ya es un
    anciano</strong> cuando lee la escritura en la pared.`) },

  { t:'⚖️ Por qué Belsasar no tenía excusa, según P&R', h:
    li([`Tuvo <strong>muchas oportunidades</strong> de conocer la voluntad
         divina.`,
        `<strong>Sabía</strong> que su abuelo había sido desterrado de la
         sociedad de los hombres por decreto divino.`,
        `<strong>Sabía también de su conversión</strong> y de su curación
         milagrosa.`,
        `Dejó que <strong>el amor por los placeres y la glorificación
         propia</strong> borraran esas lecciones.`]) },


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
  { t:'📚 En pocas palabras', h:
    hi(`Este capítulo explica <strong>por qué</strong> los enemigos de Daniel no
    le encontraron ninguna falta.<br><br>
    Daniel era el mismo en el trabajo y en su casa. Cumplía bien su cargo con
    reyes que no creían en Dios, y nunca dejó de ser fiel.<br><br>
    Su fuerza no apareció el día del foso: venía de <strong>orar todos los
    días</strong>, mucho antes de que hubiera peligro. Cuando salió el decreto,
    no cambió nada.<br><br>
    <em>La idea: se puede servir a Dios en cualquier trabajo y en cualquier
    lugar, y eso se construye día por día.</em>`) },

  { t:'📗 Título exacto del capítulo', h:
    wa(`<strong>Capítulo 44: «En el foso de los leones»</strong>`) },

  { t:'🔗 En qué capítulo de Daniel se basa', h:
    hi(`El libro lo dice en la primera línea:
    <strong>“Este capítulo está basado en Daniel 6.”</strong><br><br>
    Los seis van emparejados uno a uno:<br>
    P&amp;R 39 → Daniel 1 · P&amp;R 40 → Daniel 2 · P&amp;R 41 → Daniel 3 ·
    P&amp;R 42 → Daniel 4 · P&amp;R 43 → Daniel 5 ·
    <strong>P&amp;R 44 → Daniel 6</strong>.`) },

  { t:'😠 De dónde salió el complot', h:
    li([`Darío reorganizó el gobierno al subir al trono: <strong>120
         gobernadores y tres presidentes</strong>, y Daniel era uno de los tres.`,
        `El rey <strong>pensaba ponerlo sobre todo el reino</strong>. Eso fue
         lo que encendió todo.`,
        `Los honores <strong>despertaron los celos</strong> de los principales,
         que buscaron de qué quejarse <strong>y no encontraron nada</strong>.`,
        `<strong>Su conducta intachable les dio más rabia</strong>, no menos.`]) +
    hi(`La frase que resume el capítulo la dicen los enemigos, no Daniel:
    <strong>“No hallaremos contra este Daniel ocasión alguna, si no la
    hallamos contra él en la ley de su Dios.”</strong><br><br>
    O sea que <strong>tuvieron que inventar una ley</strong> que lo obligara a
    escoger. No lo acusaron de robar ni de mentir: no había de qué.`) },

  { t:'🪤 Cómo lograron que el rey firmara', h:
    li([`El decreto lo redactaron <strong>los presidentes y príncipes</strong>,
         no el rey.`,
        `Prohibía por <strong>treinta días</strong> pedir algo a Dios o a los
         hombres, <strong>excepto al rey Darío</strong>.`,
        `El castigo: ser arrojado <strong>al foso de los leones</strong>.`,
        `Convencieron a Darío <strong>apelando a su vanidad</strong>: le
         dijeron que el edicto aumentaría su honor y su autoridad.`,
        `<strong>El rey no vio la trampa</strong>: no conocía el propósito de
         los príncipes y cedió a sus adulaciones.`]) +
    wa(`Dato de examen: <strong>Darío no quería perjudicar a Daniel</strong>.
    Firmó por vanidad y por no darse cuenta, y por eso después pasó la noche
    sin comer tratando de salvarlo. La trampa fue de los príncipes.`) },

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
/* ═══════════════ DANIEL 7 ═══════════════ */
d7: [
  { t:'📚 En pocas palabras', h:
    hi(`Daniel, ya con unos <strong>setenta años</strong>, sueña de noche con
    <strong>cuatro bestias que salen del mar</strong>: un león con alas, un oso,
    un leopardo de cuatro cabezas y una cuarta que no se parece a ningún
    animal.<br><br>
    De la cuarta salen <strong>diez cuernos</strong>, y entre ellos brota
    <strong>uno pequeño</strong> que arranca a tres, habla contra Dios y persigue
    a los santos.<br><br>
    Entonces se abre un <strong>tribunal en el cielo</strong>: el Anciano se
    sienta, se abren los libros, y el reino se le entrega al pueblo de Dios para
    siempre.<br><br>
    <em>La idea del capítulo: el juicio no es contra el pueblo de Dios, es a
    favor de él.</em>`) },

  { t:'🌊 Cuándo y dónde fue la visión', h:
    wa(`<strong>Año:</strong> el año primero de Belsasar (7:1), unos
    <strong>553 a.C.</strong><br>
    <strong>Dónde:</strong> en su cama, soñando. No es una visión de día.<br>
    <strong>Qué hizo después:</strong> «escribió el sueño» (7:1).<br><br>
    Los capítulos de Daniel <strong>no van en orden cronológico</strong>: esta
    visión ocurre ANTES de la caída de Babilonia (capítulo 5) y del foso de los
    leones (capítulo 6), aunque esos capítulos se leen antes. Habían pasado unos
    <strong>cincuenta años</strong> desde el sueño de la estatua de Daniel 2.`) },

  { t:'🦁 Las cuatro bestias, una por una', h:
    tbl(['Bestia','Cómo la describe (7:4-7)','Qué reino es'],[
      ['1ª — León','Con alas de águila; le arrancan las alas y se para como hombre','Babilonia'],
      ['2ª — Oso','Alzado de un costado, tres costillas en la boca','Medo-Persia'],
      ['3ª — Leopardo','Cuatro alas de ave y cuatro cabezas','Grecia'],
      ['4ª — Sin nombre','Espantosa, dientes de hierro, diez cuernos','Roma'],
    ]) + `<p class="nota">Las cuatro salen del <strong>mar</strong> agitado por
    los cuatro vientos (7:2-3). En la profecía las aguas representan multitudes
    de gente, y el ángel dice que las bestias son «cuatro reyes» o reinos
    (7:17).</p>` },

  { t:'🔗 Por qué el leopardo tiene cuatro cabezas', h:
    `<p>Alejandro Magno unió a los griegos y venció a Persia en
    <strong>doce años</strong>, y murió a los <strong>treinta y dos</strong>.
    Sus generales se pelearon el imperio, y tras la batalla de
    <strong>Ipso (301 a.C.)</strong> quedaron cuatro reinos:</p>` +
    tbl(['General','Lo que le tocó'],[
      ['Casandro','Macedonia y Grecia'],
      ['Lisímaco','Tracia y buena parte de Asia Menor'],
      ['Tolomeo','Egipto, Cirenaica y Palestina'],
      ['Seleuco','Siria y las tierras del oriente'],
    ]) + `<p class="nota">Cuatro cabezas, cuatro reinos. Y las cuatro alas son la
    velocidad: Alejandro conquistó más rápido que nadie.</p>` },

  { t:'🗿 Daniel 7 y la estatua de Daniel 2 dicen lo mismo', h:
    tbl(['Daniel 2 — la estatua','Daniel 7 — las bestias','Reino'],[
      ['Cabeza de oro','León con alas','Babilonia'],
      ['Pecho y brazos de plata','Oso','Medo-Persia'],
      ['Vientre y muslos de bronce','Leopardo','Grecia'],
      ['Piernas de hierro','Cuarta bestia','Roma'],
      ['Pies de hierro y barro','Diez cuernos','Europa dividida'],
      ['La piedra que crece','El reino dado a los santos','El reino de Dios'],
    ]) + `<p class="nota">Es la misma historia contada dos veces. Lo que Daniel 7
    agrega es <strong>el cuerno pequeño y la escena del juicio</strong>, que en
    Daniel 2 no aparecen.</p>` },

  { t:'👑 Los diez cuernos', h:
    `<p>Roma no cayó de golpe: se fue partiendo mientras entraban las tribus
    germánicas, y de ahí salieron las naciones de Europa. Las más nombradas son
    <strong>diez</strong>:</p>` +
    li(['Visigodos','Ostrogodos','Vándalos','Burgundios','Lombardos',
        'Anglosajones','Francos','Alamanes','Hérulos','Suevos']) +
    `<p class="nota">«De este reino saldrán diez reyes» (7:24). Concuerda con los
    pies de hierro y barro de Daniel 2: un imperio que se divide y ya no se
    vuelve a pegar.</p>` },

  { t:'🔍 Las ocho marcas del cuerno pequeño', h:
    `<p>El capítulo da ocho señas para identificarlo. Todas salen del texto:</p>` +
    tbl(['#','La seña','Versículo'],[
      ['1','Sale de la cuarta bestia','7:8, 24'],
      ['2','Aparece después de los diez cuernos','7:24'],
      ['3','Empieza pequeño y termina mayor que los otros','7:8, 20'],
      ['4','Arranca a tres de los primeros cuernos','7:8, 24'],
      ['5','Tiene ojos de hombre y una boca que habla contra el Altísimo','7:8, 25'],
      ['6','Pone a prueba a los santos','7:25'],
      ['7','Pretende cambiar los tiempos y la ley','7:25'],
      ['8','Tiene poder por «tiempo, tiempos y medio tiempo»','7:25'],
    ]) },

  { t:'⚔️ Los tres cuernos arrancados', h:
    tbl(['Tribu','Año en que fue eliminada'],[
      ['Hérulos','493'],
      ['Vándalos','534'],
      ['Ostrogodos','538'],
    ]) + wa(`Las tres eran <strong>arrianas</strong>: creían que Jesús no es Dios
    en esencia sino un ser creado. Por eso chocaban con la iglesia católica de
    Roma, y por eso el texto dice que el cuerno pequeño «derribará a tres
    reyes».`) },

  { t:'⏳ «Tiempo, tiempos y medio tiempo»', h:
    `<p>Un tiempo (1) + tiempos (2) + medio tiempo (½) = <strong>3 años y
    medio</strong>. En el calendario profético son
    <strong>1.260 días</strong>, y el mismo período aparece en otras palabras:</p>` +
    tbl(['Pasaje','Cómo lo dice'],[
      ['Daniel 7:25','Tiempo, tiempos y medio tiempo'],
      ['Apocalipsis 13:5','Cuarenta y dos meses'],
      ['Apocalipsis 12:6','Mil doscientos sesenta días'],
    ]) +
    hi(`<strong>La regla de día por año.</strong> En la profecía simbólica un día
    representa un año, y Dios se lo dijo así a Ezequiel: «día por año te lo he
    dado» (Ezequiel 4:6). Ezequiel vivía cerca de Daniel, en Nipur.<br><br>
    Con esa regla, 1.260 días son <strong>1.260 años: del 538 al 1798</strong>.
    En 1798 el general francés Berthier arrestó al papa Pío VI en Roma y lo
    llevó al exilio.`) },

  { t:'⚖️ El tribunal y los libros', h:
    vs(`«Se aderezaron unos tronos y un Anciano se sentó... El juicio abrió
    sesión, y se abrieron los libros» (7:9-10).`) +
    `<p>El mensaje del juicio se repite <strong>cuatro veces</strong> en el
    capítulo: 7:9-14, 7:18, 7:22 y 7:26-27. Y las cuatro veces termina igual:
    <strong>el reino se le entrega a los santos</strong>.</p>` +
    tbl(['En la escena','Qué es'],[
      ['El Anciano','Dios Padre, sentado como juez (7:9)'],
      ['Los libros','El registro de las obras (7:10; Apocalipsis 20:12)'],
      ['El Hijo de hombre','Cristo, que se acerca al Anciano (7:13)'],
      ['Los santos','Los que reciben el reino para siempre (7:18, 27)'],
    ]) +
    hi(`El juicio de Daniel 7 <strong>no es contra el pueblo de Dios</strong>:
    «vino el Anciano a hacer justicia a los santos del Altísimo» (7:22). El
    tribunal se abre y el resultado es que los santos reciben el reino.`) },

  { t:'🗂️ Secuencia completa del capítulo', h:
    li(['<strong>7:1</strong> — Año primero de Belsasar. Daniel sueña y escribe el sueño.',
        '<strong>7:2-3</strong> — Cuatro vientos agitan el mar; salen cuatro bestias.',
        '<strong>7:4-7</strong> — León, oso, leopardo y la cuarta bestia con diez cuernos.',
        '<strong>7:8</strong> — Sale el cuerno pequeño y arranca a tres.',
        '<strong>7:9-10</strong> — Se sienta el Anciano. Se abren los libros.',
        '<strong>7:11-12</strong> — La bestia es muerta; a las otras se les prolonga la vida.',
        '<strong>7:13-14</strong> — El Hijo de hombre recibe un reino eterno.',
        '<strong>7:15-16</strong> — Daniel queda turbado y pregunta.',
        '<strong>7:17-18</strong> — Las bestias son cuatro reyes; los santos reciben el reino.',
        '<strong>7:19-22</strong> — Daniel pregunta por la cuarta bestia y el cuerno.',
        '<strong>7:23-26</strong> — La explicación del ángel y el juicio.',
        '<strong>7:27-28</strong> — El reino a los santos. Daniel guarda todo en su corazón.']) },

  { t:'📖 Versículo clave', h:
    vs(`«Su dominio es dominio eterno, que nunca pasará, y su reino uno que no
    será destruido» (Daniel 7:14).`) },
],

};


/* ─── Ampliación 8-sep: sección de VERSÍCULOS CLAVE en los tres capítulos del
   reglamento del campamento (Daniel 1, 3 y 6).
   POR QUÉ: la sección III del examen real es completar el versículo, y hasta
   ahora el material de estudio explicaba el capítulo pero no ponía el texto
   literal a la vista. Estos son los mismos versículos que el banco pide
   completar, así que se estudia exactamente lo que se evalúa.
   El texto es RV1995 verbatim, sin abreviar. ─── */
const VERS_CLAVE = {
  d1: [
    ['1:8','Daniel propuso en su corazón no contaminarse con la porción de la comida del rey ni con el vino que él bebía; pidió, por tanto, al jefe de los eunucos que no se le obligara a contaminarse.'],
    ['1:12','Te ruego que hagas la prueba con tus siervos durante diez días: que nos den legumbres para comer y agua para beber.'],
    ['1:15','Y al cabo de los diez días pareció el rostro de ellos mejor y más robusto que el de los otros muchachos que comían de la porción de la comida del rey.'],
    ['1:17','A estos cuatro muchachos, Dios les dio conocimiento e inteligencia en todas las letras y ciencias; y Daniel tuvo entendimiento en toda visión y sueños.'],
    ['1:20','En todo asunto de sabiduría e inteligencia que el rey los consultó, los halló diez veces mejores que todos los magos y astrólogos que había en todo su reino.'],
    ['1:21','Así continuó Daniel hasta el año primero del rey Ciro.'],
  ],
  d3: [
    ['3:1','El rey Nabucodonosor hizo una estatua de oro, cuya altura era de sesenta codos y la anchura de seis codos; la levantó en el campo de Dura, en la provincia de Babilonia.'],
    ['3:17','Nuestro Dios, a quien servimos, puede librarnos del horno de fuego ardiente; y de tus manos, rey, nos librará.'],
    ['3:18','Y si no, has de saber, oh rey, que no serviremos a tus dioses ni tampoco adoraremos la estatua que has levantado.'],
    ['3:25','Sin embargo, yo veo cuatro hombres sueltos, que se pasean en medio del fuego sin sufrir ningún daño; y el aspecto del cuarto es semejante a un hijo de los dioses.'],
    ['3:27','...cómo el fuego no había tenido poder alguno sobre sus cuerpos y ni aun el cabello de sus cabezas se había quemado; sus ropas, intactas, ni siquiera olor de fuego tenían.'],
    ['3:28','Bendito sea el Dios de Sadrac, Mesac y Abed-nego, que envió su ángel y libró a sus siervos que confiaron en él...'],
  ],
  d6: [
    ['6:4','Los gobernadores y sátrapas buscaron ocasión para acusar a Daniel en lo relacionado con el reino; pero no podían hallar motivo alguno o falta, porque él era fiel, y ningún error ni falta hallaron en él.'],
    ['6:10','Cuando Daniel supo que el edicto había sido firmado, entró en su casa; abiertas las ventanas de su habitación que daban a Jerusalén, se arrodillaba tres veces al día, oraba y daba gracias delante de su Dios como solía hacerlo antes.'],
    ['6:16','El Dios tuyo, a quien tú continuamente sirves, él te libre.'],
    ['6:22','Mi Dios envió su ángel, el cual cerró la boca de los leones para que no me hicieran daño, porque ante él fui hallado inocente; y aun delante de ti, oh rey, yo no he hecho nada malo.'],
    ['6:26','...Porque él es el Dios viviente y permanece por todos los siglos, su reino no será jamás destruido y su dominio perdurará hasta el fin.'],
    ['6:27','Él salva y libra, y hace señales y maravillas en el cielo y en la tierra; él ha librado a Daniel del poder de los leones.'],
  ],
};

/* data-leer marca el bloque que el botón de voz tiene que leer: el texto no se
   repite dentro de un atributo, se lee del propio párrafo.
   SE PARTE EN BLOQUES DE TRES. Ninguna línea del index.html puede pasar de 2000
   caracteres, y seis versículos con su botón se pasaban. Ya había ocurrido con
   los módulos de «trampas» y de «números»: la solución del proyecto es partir
   la sección, no acortar el contenido. */
const versHTML = v =>
  '<p data-leer><strong>' + v[0] + '</strong><br>«' + v[1] + '»' +
  ' <button class="btn-voz" aria-label="Escuchar el versículo"' +
  ' onclick="leeCerca(this)">🔊</button></p>';

for (const cap of Object.keys(VERS_CLAVE)) {
  const lista = VERS_CLAVE[cap];
  const bloques = [];
  for (let i = 0; i < lista.length; i += 3) bloques.push(lista.slice(i, i + 3));
  bloques.forEach((b, i) => {
    CONTENIDO[cap].push({
      t: '📖 Versículos clave (RV1995)' + (bloques.length > 1 ? ' · ' + (i + 1) : ''),
      h: (i === 0
          ? '<div class="highlight-box"><strong>Estos son los que el examen pide completar.</strong> ' +
            'Palabra por palabra, en la Reina-Valera 1995. Si una palabra cambia, la respuesta no cuenta.' +
            '<br>El botón 🔊 lo lee en voz alta: memorizar escuchando rinde distinto que leyendo.</div>'
          : '') + b.map(versHTML).join(''),
    });
  });
}

module.exports = { CAPS, CONTENIDO };
