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
  { id:'d1', label:'Daniel 1', sub:'Cautivos en Babilonia', src:'Biblia', color:'#E8720C', vs:21 },
  /* Daniel 2 ENTRA al examen en las cuatro categorias, por decision de Camilo
     del 19 de septiembre. Estuvo marcado `extra` (solo material de estudio)
     mientras el reglamento hablaba de Daniel 1, 3 y 6; el mecanismo `extra`
     se queda para otros capitulos, y aqui ya no aplica. */
  { id:'d2', label:'Daniel 2', sub:'El sueño de la gran imagen', src:'Biblia', color:'#2E8BC0', vs:49 },
  { id:'d3', label:'Daniel 3', sub:'La imagen de oro y el horno', src:'Biblia', color:'#C0392B', vs:30 },
  { id:'d4', label:'Daniel 4', sub:'Nabucodonosor humillado', src:'Biblia', color:'#7B5E00', vs:37 },
  { id:'d5', label:'Daniel 5', sub:'La escritura en la pared', src:'Biblia', color:'#8B1A5E', vs:31 },
  { id:'d6', label:'Daniel 6', sub:'En el foso de los leones', src:'Biblia', color:'#1A7A1A', vs:28 },
  /* Ampliacion Daniel 7-12 (v54): material de estudio con dos libros que
     prohiben reproduccion literal (Maxwell y Holbrook), asi que preguntas y
     estudio se redactan propios. La ficha del campamento (campamentos.js) lo
     da a Guias Mayores como material de solo estudio: NO entra al examen de
     ninguna categoria (soloEstudio() en app.js). Sin texto en fuente/biblia.js: no
     tiene referencia tocable, capitulo completo ni modo lectura, igual que
     Profetas y Reyes. vs:28 sale de Maxwell, no de un .txt RV1995 propio. */
  { id:'d7', label:'Daniel 7', sub:'Las cuatro bestias y el juicio', src:'Biblia',
    color:'#4A5568', vs:28 },
  { id:'d8', label:'Daniel 8', sub:'El carnero, el macho cabrío y las 2.300 tardes', src:'Biblia',
    color:'#5B3A29', vs:27 },
  { id:'d9', label:'Daniel 9', sub:'Las setenta semanas y el Mesías', src:'Biblia',
    color:'#2F4858', vs:27 },
  { id:'d10', label:'Daniel 10', sub:'La visión junto al Tigris', src:'Biblia',
    color:'#6A4C93', vs:21 },
  { id:'d11', label:'Daniel 11', sub:'Los reyes del norte y del sur', src:'Biblia',
    color:'#A44A3F', vs:45 },
  { id:'d12', label:'Daniel 12', sub:'El tiempo del fin', src:'Biblia',
    color:'#264653', vs:13 },
  { id:'pr39', label:'P&R 39', sub:'En la corte de Babilonia', src:'Elena de White', color:'#7B2D8B' },
  { id:'pr40', label:'P&R 40', sub:'El sueño de Nabucodonosor', src:'Elena de White', color:'#7B2D8B' },
  { id:'pr41', label:'P&R 41', sub:'El horno de fuego', src:'Elena de White', color:'#7B2D8B' },
  { id:'pr42', label:'P&R 42', sub:'La verdadera grandeza', src:'Elena de White', color:'#7B2D8B' },
  { id:'pr43', label:'P&R 43', sub:'El vigía invisible', src:'Elena de White', color:'#7B2D8B' },
  { id:'pr44', label:'P&R 44', sub:'En el foso de los leones', src:'Elena de White', color:'#7B2D8B' },
];

// helpers para armar HTML compacto
const tbl = (head, rows) =>
  `<div class="tabla-scroll"><table class="info-table"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>` +
  rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===0?' class="key"':''}>${c}</td>`).join('')}</tr>`).join('') +
  `</tbody></table></div>`;
const hi = t => `<div class="highlight-box">${t}</div>`;
const wa = t => `<div class="warn-box">${t}</div>`;
const vs = t => `<div class="verse-box">${t}</div>`;
const li = arr => `<ul class="tight">${arr.map(x=>`<li>${x}</li>`).join('')}</ul>`;
/* El botón de audio NO se escribe aquí: se deja una marca corta con su
   etiqueta y fuente/app.js la convierte en el botón con grupoVoz(), el mismo
   de los demás bloques (hidrataVoz). Un solo lugar arma el botón, y sin voz en
   el aparato no aparece. Escribirlo entero aquí repetía ~300 caracteres por
   versículo y pasaba el límite de 2000 por sección. */
const vozPar = aria => '<span class="grupo-voz" data-voz="' + aria + '"></span>';

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
    wa(`<strong><svg class="ico-t" aria-hidden="true"><use href="#i-alerta"/></svg> Aspenaz no es Melsar.</strong> Aspenaz era el jefe de los eunucos, quien recibió
    la orden del rey. Melsar era el sirviente que Aspenaz puso al cuidado de los cuatro jóvenes.
    <strong>Fue Daniel quien habló con Melsar</strong> para proponer la prueba de los diez días (1:11).`) },

  { t:'🏷️ Por qué les cambiaron el nombre (1:7)', h:
    hi(`Los cuatro nombres hebreos originales <strong>honran al Dios de Israel</strong>; los cuatro
    nombres babilónicos que Aspenaz les puso <strong>honran a dioses de Babilonia</strong>. No es un
    detalle administrativo: era una forma de borrar su identidad y su lealtad religiosa, empezando
    por lo primero que alguien oye de una persona.`) +
    tbl(['Nombre','Significado hebreo','Nombre babilónico','A qué dios honra'],[
      ['Daniel','"Dios es mi juez"','Beltsasar','A Bel (Marduk), "que Bel proteja su vida"'],
      ['Ananías','"Jehová ha tenido misericordia"','Sadrac','Asociado a Aku, el dios luna'],
      ['Misael','"¿Quién es lo que Dios es?"','Mesac','De origen incierto, también ligado a Aku'],
      ['Azarías','"Jehová ha ayudado"','Abed-nego','A Nebo, dios babilónico de la sabiduría y la escritura'],
    ]) +
    `<p class="nota">El patrón importa más que cada etimología puntual (algunas, como Mesac, no
    tienen una traducción segura entre los eruditos): los cuatro nombres hebreos nombran al Dios
    de Israel: Daniel se propuso en su corazón no contaminarse (1:8), pero nunca dice haberse
    negado a usar el nombre que le impusieron. El capítulo no hace de esto un punto de conflicto:
    lo que sí decide defender, la comida, lo pide explícitamente.</p>` },

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
      ['Hasta cuándo sirvió','Año PRIMERO del rey Ciro el Grande (1:21)'],
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
      ['13','Daniel continúa hasta el año primero de Ciro el Grande','1:21'],
    ]) },

  { t: '🗓️ La primera de tres deportaciones a Babilonia',
    h: '<p>Lo que cuenta Daniel 1:1-2 es la <strong>primera</strong> de tres deportaciones de Judá a Babilonia, no un hecho aislado.</p>' +
    tbl(['Año','Qué pasó'],[
      ['605 a.C.','Nabucodonosor sitia Jerusalén, se lleva utensilios del templo y jóvenes nobles — Daniel, Ananías, Misael y Azarías entre ellos (2 Reyes 24:1; Daniel 1:1-2).'],
      ['597 a.C.','Nabucodonosor vuelve a sitiar Jerusalén; Joaquín se rinde y es deportado con su corte y el profeta Ezequiel. Pone en su lugar a Sedequías, como rey vasallo (2 Reyes 24:12).'],
      ['586 a.C.','Sedequías se rebela; tras un sitio de año y medio, Jerusalén y el templo son destruidos y el resto del pueblo es deportado (2 Crónicas 36:19; 2 Reyes 25:1-21). Daniel llega en la primera de las tres, 19 años antes de que el templo desapareciera.'],
    ]) +
    vs(`2 Reyes 24:12: “Entonces salió Joachîn rey de Judá al rey de Babilonia,
    él, y su madre, y sus siervos, y sus príncipes, y sus eunucos: y prendiólo
    el rey de Babilonia en el octavo año de su reinado.”`) +
    vs(`2 Crónicas 36:19: “Y quemaron la casa de Dios, y rompieron el muro de
    Jerusalem, y consumieron al fuego todos sus palacios, y destruyeron todos
    sus vasos deseables.”`) +
    '<p class="nota">Las citas de 2 Reyes y 2 Crónicas de esta sección son de la <strong>Reina-Valera 1909</strong> (traducción de dominio público), no de RV1995: esta app todavía no tiene el texto RV1995 de esos dos libros verificado verso por verso como sí lo tiene de Daniel 1-6. Por eso estas dos citas no cuentan como preguntas de completar (esas solo se hacen sobre texto RV1995 verificado).</p>' },

  { t: '🧱 Nabucodonosor fuera de la Biblia',
    h: '<p>La conquista que abre Daniel 1 no depende solo del relato bíblico: hay registro extrabíblico independiente, con fechas exactas.</p>' +
    tbl(['Fuente','Qué aporta'],[
      ['Crónica Babilónica<br>(B.M. 21946)','Tablilla cuneiforme del Museo Británico: Nabucodonosor, todavía príncipe heredero, derrota al ejército egipcio en Carquemis (Éufrates) y toma Siria y Palestina.'],
      ['8 de Ab, 605 a.C.<br>(15 de agosto)','Muere Nabopolasar, padre de Nabucodonosor, tras 21 años de reinado.'],
      ['1 de Elul, 605 a.C.<br>(7 de septiembre)','Nabucodonosor asume el trono de Babilonia.'],
      ['Beroso<br>(c. 300-250 a.C.)','Sacerdote babilonio citado por el historiador judío Flavio Josefo (s. I d.C.): narra, de forma independiente, la misma victoria en Carquemis y la misma sucesión al trono.'],
      ['Ladrillos y documentos','El nombre de Nabucodonosor aparece estampado en miles de ladrillos de construcción hallados en Babilonia, y en numerosos documentos comerciales de la época.'],
    ]) },

  { t: '🏺 5.469 utensilios: por qué a Dios le importa el templo',
    h: hi(`Cuando Nabucodonosor se llevó los utensilios sagrados del templo de Jerusalén a la Esagila, el templo de su dios Marduc en Babilonia, dio por hecho que su dios había vencido al Dios de Israel (1:2). Pero el texto dice que fue Dios mismo quien "entregó" esos utensilios, por la misma razón por la que entregó el reino de Judá: no una derrota, sino una consecuencia. Nabucodonosor hizo tres viajes a Jerusalén hasta reunir una colección de <strong>5.469 utensilios</strong>, que no le trajeron ningún bien a Babilonia (ver Daniel 5 y Esdras 1:9-11): el tema del santuario, lejos de cerrarse aquí, reaparece en el corazón de Daniel 8 ("será purificado el santuario") y en la visión del santuario celestial que abre Apocalipsis.`) },

  { t: '💔 Por qué Dios "entregó" a Judá, y quién le enseñó la Biblia a Daniel',
    h: '<p>El libro no dice que Babilonia venció a Dios, sino que Dios "entregó" a Joacim y a Judá (1:2) después de siglos de advertencias por medio de los profetas:</p>' +
    li([`En el reino del norte: <strong>Elías, Amós y Oseas</strong>.`,
        `En Judá: <strong>Miqueas, Isaías, Habacuc, Sofonías y Jeremías</strong>.`]) +
    '<p>Los pecados que denunciaban eran concretos:</p>' +
    li([`Deshonestidad e <strong>injusticia con los pobres</strong>.`,
        `<strong>Homicidio</strong>.`,
        `<strong>Profanación del sábado</strong>.`,
        `Persecución de los profetas verdaderos.`,
        `La <strong>adoración a Baal</strong>.`]) +
    hi(`La entrega no fue abandono: Dios prometió que después de setenta años de exilio permitiría el regreso (Jeremías 25:11-12) y un corazón nuevo. ¿Quién le enseñó esto a Daniel desde niño? El profeta Jeremías profetizaba en Jerusalén cuando Daniel era pequeño, así que es razonable que haya sido su maestro; y su propio nombre —"Daniel", que significa "Dios es mi juez"— sugiere un hogar piadoso. Casi un siglo antes de que naciera, el profeta Isaías ya le había anunciado al rey Ezequías que algunos de sus descendientes servirían como eunucos en el palacio del rey de Babilonia: una profecía que Daniel bien pudo haber conocido sobre sí mismo.`) },
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
      ['Piernas — HIERRO','Roma imperial, 168 a.C.-476 d.C. (2:33, 40)'],
      ['Diez dedos — HIERRO Y BARRO','Roma dividida en los reinos bárbaros, desde 476 d.C. (2:41-42)'],
      ['HIERRO MEZCLADO CON BARRO COCIDO','Roma papal: el poder político unido al religioso; supremacía 538-1798 d.C., herida en 1798, sana y vuelve al final (2:41-43)'],
      ['La PIEDRA — sin manos','La segunda venida de Cristo (2:34, 44-45)'],
      ['El GRAN MONTE','El reino eterno, después de los mil años (2:35, 44)'],
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
    por qué falla: <strong>las alianzas se intentan y no pegan</strong>.<br><br>
    Ojo con la diferencia entre lo que <strong>dice</strong> el texto y lo que
    <strong>representa</strong>. El versículo dice «será un reino dividido»
    (2:41). Lo que representa: los <strong>diez dedos</strong> son Roma dividida
    en los reinos bárbaros (desde 476 d.C.), y el <strong>hierro mezclado con
    barro</strong> es <strong>Roma papal</strong>, el poder político unido al
    religioso (supremacía 538-1798 d.C.).`) },

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

  { t: '🗓️ Los "tres años" de Daniel: un cálculo que sí cuadra',
    h: '<p>Los críticos señalaron una contradicción: Daniel 1:5 y 1:18 dicen que Daniel estudió <strong>"tres años"</strong> antes de presentarse ante el rey, pero Daniel 2:1 sitúa el sueño apenas en el <strong>"año segundo"</strong> de reinado de Nabucodonosor. La solución está en el calendario babilónico y en el "año de ascensión", que no contaba todavía como el "año primero" oficial de un rey.</p>' +
    tbl(['Fecha','Qué pasó'],[
      ['15 de agosto, 605 a.C.','Muere Nabopolasar, padre de Nabucodonosor.'],
      ['7 de septiembre, 605 a.C.','Nabucodonosor "asciende" al trono, pero ese período todavía no cuenta como su año primero oficial.'],
      ['605-604 a.C.','Año de ascensión de Nabucodonosor — primer año de estudio de Daniel.'],
      ['604-603 a.C.','Año primero oficial (empieza en el Año Nuevo de primavera del 604 a.C.) — segundo año de estudio.'],
      ['603-602 a.C.','Año segundo de Nabucodonosor: el mismo que menciona Daniel 2:1 — tercer año de estudio, y el del sueño de la estatua.'],
    ]) +
    '<p>Contando de manera inclusiva, como era costumbre en la época, los tres años de estudio de Daniel 1 terminan justo en el año en que Nabucodonosor tuvo el sueño. Los dos textos, lejos de contradecirse, describen el mismo calendario visto desde dos ángulos distintos.</p>' },

  { t: '🪨 ¿Quién es la Piedra? Cristo, en dos tiempos distintos',
    h: hi(`La Escritura identifica varias veces a Cristo con una piedra o roca: "la roca era Cristo" (1 Corintios 10:4), y Jesús mismo se aplicó a sí mismo la imagen de la piedra que los constructores desecharon. Pero la Piedra de Daniel 2 no cae sobre la estatua en la primera venida de Cristo, sino en la segunda. Jesús vino primero a establecer el <strong>"reino de la gracia"</strong> — crece despacio y sin ruido, "como la levadura que una mujer esconde en la masa" — y solo al final establecerá el <strong>"reino de gloria"</strong>, el que "desmenuzará y consumirá a todos estos reinos" (2:44). Por eso el Imperio Romano y las naciones de Europa que salieron de él siguieron existiendo siglos después de la cruz: la piedra todavía no ha caído sobre los pies de la estatua.`) },
  { t: '🔗 Los dedos no se vuelven a unir: intentos reales de reunir Europa',
    h: hi(`<strong>Los diez dedos son Roma dividida en los reinos bárbaros (desde 476 d.C.), y después de ellos la estatua no tiene otro imperio: el siguiente reino es la piedra, que llega «en los días de estos reyes» (2:44).</strong> La historia registra varios intentos concretos de volver a unir esos reinos bajo un solo poder, todos fracasados:<ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>Alianzas matrimoniales</strong> entre las casas reales de Europa: hacia 1914 casi todas estaban emparentadas entre sí, y aun así estalló la Primera Guerra Mundial entre ellas.</li><li><strong>Carlomagno</strong> (siglo VIII), <strong>Carlos V</strong> (siglo XVI), <strong>Napoleón Bonaparte</strong> (siglo XIX) y <strong>Adolf Hitler</strong> (siglo XX) intentaron, cada uno a su manera, reunificar Europa bajo un solo poder.</li><li>La Iglesia unida al Estado (el hierro mezclado con barro, Roma papal) sostuvo por siglos el ideal de un "Santo Imperio Romano" unido bajo un rey y un papa; las naciones siguieron guerreando entre sí de todos modos.</li></ul>`) },
  { t: '🔮 Por qué la astrología moderna es menos científica que la de Babilonia',
    h: hi(`<strong>Cuando Daniel salvó su vida, salvó también la de todos los astrólogos y sabios de Babilonia (2:24): Dios los amaba a ellos también, aunque su "ciencia" fuera un fracaso.</strong> Los astrólogos modernos calculan los signos zodiacales según la posición de las constelaciones en tiempos de Claudio Tolomeo, en el siglo II — pero por un fenómeno astronómico llamado "precesión de los equinoccios", esas constelaciones ya no están donde estaban hace casi veinte siglos: alguien "nacido bajo Libra" en realidad nació bajo Virgo. Un estudio sobre 154.000 reclutas de la Marina de EE. UU. tampoco encontró que los nacidos bajo Aries o Escorpio (los signos "guerreros") se hicieran soldados con más frecuencia que los demás, y otro estudio con 2.000 artistas no encontró más músicos ni pintores nacidos bajo Libra.`) },

  {t:'🏛️ La lectura más antigua de la iglesia: los cuatro reinos hasta Roma, y la piedra en la Segunda Venida',h:`<p><strong>Que el reino de la piedra llega con la Segunda Venida, no antes ni durante el ministerio terrenal de Cristo, no es una idea moderna</strong>: es la lectura más antigua que se conserva de la iglesia cristiana, documentada ya en el siglo II — mucho antes de cualquier debate del siglo XIX.</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>Ireneo, obispo de Lyon (siglo II):</strong> uno de los primeros autores cristianos en sostener que los cuatro metales representan Babilonia, Medo-Persia, Grecia y Roma, y que la piedra es Cristo destruyendo los reinos del mundo en su segunda venida.</li><li><strong>Hipólito de Roma (m. 236 d.C.):</strong> uno de los eruditos más versados de su siglo, subrayó el paralelo entre Daniel 2 y 7 y escribió sobre la piedra: "es Cristo, quien viene del cielo y trae al mundo juicio".</li><li><strong>Eusebio de Cesarea</strong>, padre de la historia eclesiástica, coincidía en que Daniel 2 "no difiere en modo alguno" de Daniel 7 — pero después de la conversión de Constantino I y la exaltación política de la iglesia, cambió de postura para ajustarla a los acontecimientos de su época.</li></ul><p>El punto de quiebre lo marcó antes que nadie <strong>Orígenes</strong> (ca. 185-254), presbítero de Cesarea: al alegorizar las profecías en vez de leerlas en su sentido literal, dio lo que los historiadores llaman "el primer paso fatal" hacia restarle importancia a la Segunda Venida como acontecimiento literal y futuro.</p><div class="highlight-box">La secuencia Babilonia-Medo Persia-Grecia-Roma, y una piedra que actúa al final de la historia humana y no antes, es la lectura documentada más antigua de la iglesia cristiana sobre Daniel 2 — no una reinterpretación tardía.</div>`},

  { t:'📖 Versículo clave', h:
    vs(`«Sea bendito el nombre de Dios de siglos en siglos, porque suyos son
    <strong>el poder y la sabiduría</strong>.» (Daniel 2:20)`) },
],

/* ═══════════════ DANIEL 3 ═══════════════ */
/* CAPA POR SECCIÓN — núcleo entra al examen y se memoriza, apoyo ayuda a
   entender el núcleo pero no se exige literal, contexto es historia o
   aplicación y el examen no la toca. Clasificación de las 17 secciones de
   Daniel 3 (15 de aquí + las 2 de "Versículos clave" que build.js agrega
   solas): 11 núcleo, 3 apoyo, 3 contexto. Por ahora solo Daniel 3 la tiene;
   un capítulo sin `capa` en sus secciones simplemente no muestra el filtro. */
d3: [
  { t:'📚 En pocas palabras', capa:'apoyo', h:
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

  { t:'🗿 La estatua de oro', capa:'nucleo', h:
    tbl(['Dato','Valor exacto'],[
      ['Altura','SESENTA codos (3:1)'],
      ['Anchura','SEIS codos (3:1)'],
      ['Material','Oro'],
      ['Lugar','Campo de DURA, en la provincia de Babilonia (3:1)'],
    ]) },

  { t:'👔 Los ocho cargos que convocó el rey (3:2-3)', capa:'nucleo', h:
    hi(`<strong>Sátrapas, magistrados, capitanes, oidores, tesoreros,
    consejeros, jueces</strong> y todos los gobernadores de las
    provincias.<br><br>
    La lista aparece <strong>dos veces seguidas</strong>, en 3:2 (cuando el rey
    ordena que vengan) y en 3:3 (cuando llegan), palabra por palabra. Ese es un
    recurso del capítulo: repetir la lista completa para que se sienta el
    tamaño del acto oficial.`) +
    wa(`Ojo con no confundirla con los cuatro grupos de sabios de Daniel 2:2
    (magos, astrólogos, encantadores, caldeos). Aquí son
    <strong>funcionarios de gobierno</strong>, no adivinos.<br><br>
    En el examen real de Adultos del 10 de octubre de 2026 esta fue
    <strong>la única que el club perdió</strong> (34 de 35): marcó los magos y
    astrólogos. A la dedicación de la estatua van los funcionarios.`) },

  { t:'📢 La orden y la amenaza (3:4-6)', capa:'nucleo', h:
    li([`Quién lo anuncia: <strong>el pregonero</strong>, en alta voz (3:4).`,
        `A quiénes: <strong>«pueblos, naciones y lenguas»</strong> (3:4).`,
        `Qué hay que hacer: <strong>postrarse y adorar</strong> al oír la música (3:5).`,
        `El castigo: <strong>«inmediatamente será echado dentro de un horno de
         fuego ardiente»</strong> (3:6).`]) +
    hi(`En 3:7 dice que <strong>«todos los pueblos, naciones y lenguas se
    postraron»</strong>. Los tres jóvenes no se enfrentaron a una ley
    impopular: se quedaron de pie cuando <strong>todo el mundo se
    arrodilló</strong>.`) },

  { t:'🕵️ Quién los acusó, y de qué (3:8-12)', capa:'apoyo', h:
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

  { t:'🗣️ El desafío del rey, y la respuesta corta (3:14-16)', capa:'nucleo', h:
    li([`El rey pregunta si es verdad, y les <strong>ofrece una segunda
         oportunidad</strong>: si adoran al oír la música, no pasa nada (3:15).`,
        `Cierra con un reto directo: <strong>«¿y qué dios será el que os libre
         de mis manos?»</strong> (3:15).`,
        `Ellos contestan primero una sola frase: <strong>«No es necesario que
         te respondamos sobre este asunto»</strong> (3:16).`]) +
    hi(`Esa frase es lo que hace fuerte lo que dicen después. <strong>No
    estaban decidiendo en ese momento</strong>: la decisión ya estaba tomada,
    y no había nada que deliberar.`) },

  { t:'🎵 Los seis instrumentos — orden exacto', capa:'nucleo', h:
    wa(`<strong>Daniel 3:5 en la RV1995</strong> (la lista se repite en 3:7, 3:10 y 3:15):<br><br>
    1. BOCINA &nbsp;→&nbsp; 2. FLAUTA &nbsp;→&nbsp; 3. CÍTARA &nbsp;→&nbsp;
    4. ARPA &nbsp;→&nbsp; 5. SALTERIO &nbsp;→&nbsp; 6. ZAMPOÑA<br><br>
    Y después: «y todo instrumento de música».<br><br>
    <strong><svg class="ico-t" aria-hidden="true"><use href="#i-x"/></svg> NO aparece:</strong> la TROMPETA`) +
    hi(`<strong><svg class="ico-t" aria-hidden="true"><use href="#i-alerta"/></svg> Ojo con el tercero.</strong> La RV1995 dice
    <strong>CÍTARA</strong>. La RV1960, que es la que más se oye, dice
    <strong>tamboril</strong> en ese lugar.<br>
    Si la pregunta dice <em>según la RV1995</em>, la respuesta es <u>cítara</u>.`) },

  { t:'🔥 El horno de fuego', capa:'apoyo', h:
    hi(`• El rostro de Nabucodonosor se demudó contra ellos (3:19)<br>
    • Mandó calentar el horno <strong>SIETE veces más</strong> de lo acostumbrado (3:19)<br>
    • Fueron atados con <strong>sus mantos, sus calzados, sus turbantes y sus vestidos</strong> (3:21)<br>
    • A los <strong>varones vigorosos</strong> que los echaron, <strong>la llama del fuego los mató</strong> (3:22)<br>
    • Nabucodonosor vio <strong>CUATRO varones sueltos</strong> paseándose en medio del fuego (3:25)<br>
    • El aspecto del cuarto: <strong>«semejante a un hijo de los dioses»</strong> (3:25, RV1995)<br>
    Así lo describió Nabucodonosor, que era pagano. <strong>P&amp;R cap. 41 aclara que era el Hijo de Dios mismo.</strong>`) },

  { t:'🔢 Lo que pasó dentro del horno (3:19-25)', capa:'nucleo', h:
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

  { t:'✨ El milagro verificado (3:27)', capa:'nucleo', h:
    vs(`«...cómo <strong>el fuego no había tenido poder alguno</strong> sobre sus cuerpos
    y ni aun el cabello de sus cabezas se había quemado;
    sus ropas, <strong>intactas</strong>,
    <strong>ni siquiera olor de fuego tenían</strong>.» (RV1995)`) +
    hi(`Se juntaron los sátrapas, los gobernadores, los capitanes y los consejeros del rey
    <u>para verificarlo con sus propios ojos</u> (3:27).`) },

  { t:'📜 La respuesta de los tres jóvenes (3:17-18)', capa:'nucleo', h:
    vs(`«Nuestro Dios, a quien servimos, <strong>puede librarnos</strong> del horno de fuego ardiente;
    y de tus manos, rey, nos librará. <strong>Y si no</strong>, has de saber, oh rey, que no serviremos
    a tus dioses ni tampoco adoraremos la estatua que has levantado.»`) },

  { t:'👑 El decreto de Nabucodonosor (3:28-30)', capa:'nucleo', h:
    li(['Bendijo al Dios de Sadrac, Mesac y Abed-nego, que <strong>envió su ángel</strong> y los libró (3:28)',
        'Decretó que quien hablara blasfemia contra ese Dios <strong>sea descuartizado y su casa convertida en estercolero</strong> (3:29)',
        'Reconoció: <strong>«no hay dios que pueda librar como éste»</strong> (3:29)',
        'Los <strong>engrandeció</strong> en la provincia de Babilonia (3:30)']) },

  { t: '🎶 Los instrumentos griegos y la fecha del capítulo', capa:'contexto',
    h: wa(`Entre los instrumentos que suenan para ordenar la adoración de la estatua (Daniel 3:5) hay uno de origen griego: la <strong>"zampoña"</strong> (un tipo de gaita). Durante mucho tiempo los críticos usaron este detalle como prueba de que Daniel 3 fue escrito siglos después, cuando la cultura griega ya se había extendido por el Cercano Oriente.`) +
    hi(`Pero la arqueología muestra que, ya en el <strong>siglo VI a.C.</strong> —el propio siglo de Nabucodonosor—, comerciantes, soldados y obreros griegos estaban activos en Babilonia, algunos empleados en proyectos de construcción del imperio. No hace falta esperar a Alejandro Magno para explicar un instrumento griego sonando en la corte babilónica: es lo que cabría esperar de un rey que reunía en su capital a gente de todo el mundo conocido.`) },

  { t: '🙏 Dios puede librar, pero no siempre lo hace igual', capa:'contexto',
    h: hi(`<strong>La frase "y si no" de Sadrac, Mesac y Abed-nego (3:17-18) es el corazón teológico del capítulo: confiaban en Dios sin condicionar su fidelidad al resultado.</strong> La Biblia registra los dos desenlaces posibles:`) +
    `<ul class="tight"><li>Poco antes del episodio del horno, el profeta <strong>Urías</strong> predicó contra los crímenes del rey Joacim y Dios no impidió que el rey lo mandara matar: no hubo milagro.</li>
    <li>Siglos después, en <strong>Getsemaní</strong>, el propio Jesús oró pidiendo que se apartara de él una prueba —"si es posible"— y terminó aceptando la cruz.</li></ul>
    <p class="nota">Dios puede librar, pero a veces decide que su pueblo dé testimonio en una derrota visible y no en una victoria evidente; la fidelidad de los tres jóvenes no dependía de saber, de antemano, cuál de las dos iba a tocarles.</p>` },
  { t: '🎖️ Desmond Doss: «Y si no» en el siglo XX', capa:'contexto',
    h: hi(`<strong>El único soldado no combatiente condecorado con la Medalla de Honor del Congreso, la máxima distinción militar de Estados Unidos, vivió su propia versión del horno de fuego.</strong> Desmond Doss se alistó en 1942 pidiendo servir como camillero: su conciencia cristiana le impedía portar armas y guardaba el sábado como día de reposo. El 5 de mayo de 1945, en las barrancas de Maeda (Okinawa), su pelotón sufrió cerca de cien bajas en minutos; mientras los demás se replegaban, Doss se quedó solo, bajo fuego cruzado, y durante horas fue bajando a 75 heridos por el acantilado hasta ponerlos a salvo. Nunca fue alcanzado ese día. Días después resultó gravemente herido por una granada, y aun así ayudó primero a otro soldado antes de atenderse. Doss atribuyó su protección a la misma confianza que llevó a Sadrac, Mesac y Abed-nego al horno: Dios puede librar, y a veces libra de un modo tan concreto como ese.`) },
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

  { t: '🏺 La tablilla que registra la locura de Nabucodonosor',
    h: '<p>En 1975 se publicó la traducción de una tablilla de arcilla muy dañada del Museo Británico (<strong>B.M. 34.113</strong>), que según el asiriólogo A. K. Grayson podría referirse al mismo episodio narrado en Daniel 4. Muchas palabras de cada línea son ilegibles, pero las frases que sí se conservan incluyen:</p>' +
    li(['"Nabucodonosor consideró..."',
        '"su vida parecía no tener valor..."',
        '"no manifiesta amor ni a hijo ni a hija..."',
        '"no existen ni familia ni clan..."',
        '"lloró amargamente ante Marduk..."']) +
    '<p class="nota">No es un relato completo ni una confirmación definitiva, pero coincide con el cuadro general de un rey que atravesó una crisis profunda que lo alejó de su propia familia y de su reino, tal como describe Daniel 4:33.</p>' },

  { t: '🙇 Por qué Dios respeta a los gobiernos, aun a los malos',
    h: hi(`<strong>El capítulo dice que el Altísimo «gobierna el reino de los hombres, que a quien él quiere lo da» (4:17): la misma idea que Pablo repite en Romanos 13, que hasta un mal gobierno presta algún servicio y merece respeto, no solo obediencia forzada.</strong> Pero ese respeto tiene un límite concreto, y el propio Daniel lo muestra en la práctica: obedeció al rey al inscribirse en la "universidad" pagana de Babilonia, porque ninguna ley de Dios se lo prohibía; pero rehusó comer los alimentos prohibidos por la ley, y Sadrac, Mesac y Abed-nego rehusaron inclinarse ante la estatua, porque ahí sí había un mandamiento explícito de por medio. El principio práctico es simple: se obedece al Estado hasta el punto exacto en que una orden choca con un mandamiento bíblico claro, ni un paso antes ni un paso después.`) },
  { t: '📜 Tres profetas al mismo tiempo: Daniel, Ezequiel y Jeremías',
    h: hi(`<strong>Mientras Daniel servía en el palacio de Babilonia, Dios tenía activos a otros dos profetas al mismo tiempo: Jeremías, en Judá y luego en Egipto, y Ezequiel, en una colonia judía junto al canal de Kebar, a solo 80 km de Babilonia.</strong> Es un patrón que se repite en la Biblia —Isaías y Miqueas fueron contemporáneos, y en el Nuevo Testamento las cuatro hijas de Felipe profetizaban a la vez que Agabo—: Dios no se limita a un solo mensajero cuando el momento lo exige. Hay incluso un posible vínculo directo con el propio sueño de Nabucodonosor: 19 años antes de que el rey soñara con el gran árbol derribado (Daniel 4), Ezequiel ya había recibido una advertencia paralela para el faraón de Egipto, comparado también con un árbol destinado a ser talado. Dado que Daniel conocía y usaba los escritos de sus contemporáneos, es razonable pensar que le haya mostrado ese pasaje a Nabucodonosor.`) },
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

  { t: '👑 Belsasar en las crónicas: el corregente olvidado',
    h: wa(`Durante mucho tiempo los críticos señalaron que ningún documento fuera de la Biblia mencionaba a un rey llamado <strong>Belsasar</strong>, y concluyeron que el personaje era ficticio.`) +
    tbl(['Año','Hallazgo'],[
      ['1861','W. H. Fox Talbot publica una plegaria cuneiforme en la que el rey Nabonido pide a su dios que bendiga a su hijo Belsasar.'],
      ['1924','Sidney Smith traduce la Crónica en Verso de Nabonido (Museo Británico N.º 38.299): al partir Nabonido hacia el oasis de Tema, deja el "campamento" y el reinado en manos de su hijo mayor.'],
    ]) +
    hi(`Esto explica por qué Daniel 5:16 y 29 dicen que Belsasar solo podía ofrecerle a Daniel el <strong>tercer</strong> lugar del reino: el propio Belsasar ocupaba el segundo lugar, como corregente bajo la autoridad de su padre Nabonido, el verdadero primer rey.`) },

  { t: '📜 Seraías y la piedra en el Éufrates (594 a.C.)',
    h: hi(`<strong>Décadas antes de que Babilonia cayera, el profeta Jeremías ya había escrito su ruina: que quedaría deshabitada "para siempre", "un montón de piedras" sin ningún habitante.</strong> Para dramatizar el mensaje, Jeremías le encargó a un oficial llamado Seraías que viajara a Babilonia (probablemente durante la misma visita real en la que se dedicó la estatua de oro de Daniel 3), leyera el pergamino ante testigos, le atara una piedra y lo arrojara al Éufrates diciendo: "así se hundirá Babilonia, y no se recobrará". En ese momento, la ciudad estaba en plena expansión. El cumplimiento tomó siglos: primero Jerjes I arrasó sus murallas y templos tras una revuelta; después Alejandro Magno, ya emperador del mundo conocido, puso a 10.000 hombres a reconstruirla como su nueva capital — y murió esa misma ciudad, en 323 a.C., sin lograrlo; finalmente su general Seleuco Nicátor se llevó a gran parte de la población y millones de ladrillos para fundar una ciudad rival, Seleucia. Para la época de Jesús, Babilonia ya era una ciudad fantasma.`) },
  { t: '⚖️ Por qué Baltasar era más culpable que Nabucodonosor',
    h: hi(`<strong>El propio Daniel se lo dice en la cara: «tú, su hijo Belsasar, no has humillado tu corazón sabiendo todo esto» (5:22).</strong> Nabucodonosor, antes de su humillación, era ignorante de fondo: atribuía sus éxitos a los dioses sin entender que Dios pide una humildad genuina, y Dios lo llevó por un camino largo (la locura del capítulo 4) para enseñárselo. Belsasar no tenía esa excusa: había visto con sus propios ojos —o al menos conocía de primera mano— la caída y la restauración de su predecesor, y aun así decidió profanar los utensilios sagrados del templo en un banquete de borrachera. Por eso, cuando la balanza lo "pesa" y lo encuentra "falto" (TEKEL, 5:27), el juicio no es arbitrario: mide la distancia entre lo que Baltasar sabía y lo que decidió hacer con eso.`) },
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

  { t: '🔍 ¿Quién fue Darío el Medo?',
    h: wa(`Durante años los críticos señalaron que <strong>"Darío el Medo"</strong> (Daniel 6:1) no aparece en ningún documento fuera de la Biblia, y concluyeron —como antes habían hecho con Belsasar— que era un personaje inventado.`) +
    tbl(['Fuente','Qué aporta'],[
      ['Crónica de Nabonido','El general que tomó Babilonia el 12 de octubre del 539 a.C. se llamaba <strong>Gubaru</strong>, y gobernaba la provincia meda de Gutium. La crónica dice que Gubaru "nombró gobernadores en Babilonia", igual que Daniel 6:2 describe a Darío nombrando sátrapas.'],
      ['Jenofonte (historiador griego)','Describe la ayuda que un tal <strong>Gobryas</strong> —equivalente griego de Gubaru— le dio a Ciro el Grande para conquistar la ciudad.'],
    ]) +
    hi(`Sobre esa base, algunos eruditos proponen identificar a Gubaru/Gobryas con el "Darío el Medo" de Daniel: un gobernador de origen medo puesto por Ciro al frente de Babilonia. No es la única propuesta que existe, pero muestra que el silencio inicial de las fuentes extrabíblicas —como ocurrió antes con Belsasar— no equivale a que el personaje no haya existido.`) },
],

/* ═══════════════ P&R 39 ═══════════════ */
pr39: [
  { t:'📚 En pocas palabras', h:
    hi(`Este capítulo del libro de Elena de White explica <strong>por qué</strong>
    Daniel no quiso la comida del rey.<br><br>
    Esa comida se le ofrecía primero a los
    ídolos, y comerla era como aceptar a esos dioses. Además el vino del rey
    <strong>ponía la mente torpe</strong>.<br><br>
    Daniel pidió el cambio y propuso una prueba, y su petición
    <strong>fue recibida con respeto</strong>. Y Dios le
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

  /* v176: el examen real de Adultos preguntó este párrafo (PR 351) y el
     estudio no lo traía. Texto literal del libro. */
  { t:'🪨 Fieles como el acero (PR 351)', h:
    hi(`Así abre el capítulo: entre los llevados a Babilonia al principio de
    los setenta años de cautiverio había <strong>«hombres que eran tan fieles
    a los buenos principios como el acero, que no serían corrompidos por el
    egoísmo, sino que honrarían a Dios aun cuando lo perdiesen todo»</strong>
    (PR 351).<br><br>
    Son tres cosas, y el examen de 2026 dio la respuesta «Todas las
    anteriores»: <strong>fieles como el acero</strong>, <strong>no
    corrompidos por el egoísmo</strong>, <strong>honrar a Dios aunque lo
    perdieran todo</strong>.`) },
  { t:'🏷️ Cuatro nombres nuevos', h:
    hi(`En Babilonia les cambiaron el nombre a los cuatro jóvenes. Daniel pasó a llamarse Beltsasar, Ananías se llamó Sadrach, Misael se llamó Mesach y Azarías se llamó Abednego. Los nombres nuevos recordaban a los dioses de los caldeos. El rey no los obligó a adorar ídolos de golpe: quería que poco a poco se olvidaran de Dios (PR 352.3-352.4).`) },
  { t:'🍽️ Por qué rechazaron la comida del rey', h:
    hi(`• <strong>Una porción</strong> de esa comida y ese vino <strong>se ofrecía a los ídolos</strong><br>
    • Por eso el alimento de la mesa del rey estaba <strong>consagrado a la idolatría</strong><br>
    • Participar de ella se interpretaba como <strong>homenaje a los dioses de Babilonia</strong><br>
    • Sabían que el vino <strong>perjudicaría sus facultades físicas y mentales</strong>
    (conocían la historia de Nadab y Abihú)`) },

  { t:'❤️ Lo que Daniel valoraba más', h:
    hi(`El libro dice que, si hubiera querido, Daniel podía haber hallado en sus circunstancias «una excusa plausible» para ceder: era un cautivo en la corte del rey (PR 353.3). Pero para él la aprobación de Dios valía más que el favor del rey, y hasta más que su vida. Sus tres amigos lo apoyaron. Si hubieran cedido una vez, habría sido más fácil ceder otra vez, y otra (PR 353.3-354.2).`) },
  { t:'🚫 Lo que NO fue', h:
    wa(`Dos cosas que el capítulo descarta expresamente, y que son
    respuestas equivocadas típicas:<br><br>
    • <strong>No fue orgullo ni ambición</strong> lo que los llevó a la corte:
    eran cautivos que Dios había puesto en un país extraño.<br>
    • <strong>No obraron con presunción</strong> ni decidieron
    <strong>singularizarse</strong>: actuaron confiando firmemente en Dios.<br><br>
    Lo que sí cuenta el capítulo: Daniel <strong>solicitó</strong> que se les
    excusara de la comida del rey y propuso una prueba de diez días.`) },

  { t:'🔟 La prueba de los diez días', h:
    hi(`Aspenaz tenía miedo: si los jóvenes se veían flacos, el rey podía castigarlo. Entonces Daniel habló con Melsar, el encargado de ellos, y le pidió probar diez días con comida sencilla. Al terminar, los cuatro se veían más sanos que los que comían la comida del rey, y les dejaron seguir así todo el tiempo de estudio (PR 354.3-355.1).`) },
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

  { t:'🏆 Diez veces mejores', h:
    hi(`Después de tres años, el rey examinó a todos los estudiantes. Nadie fue como Daniel, Ananías, Misael y Azarías: el rey los halló diez veces mejores que todos sus magos y astrólogos. Dios les dio conocimiento a los cuatro, y a Daniel además le dio entendimiento de visiones y sueños (PR 355.3-356.1).`) },
  { t:'🧠 Cuerpo y mente: la enseñanza central', h:
    hi(`• Los <strong>hábitos físicos temperantes</strong> favorecen directamente la claridad mental y espiritual<br>
    • <strong>Evitaron lo que habría debilitado sus facultades</strong> y siguieron reglas de vida que les daban fuerza intelectual<br>
    • Dios recompensó su fidelidad con <strong>salud, vigor y sabiduría superiores</strong><br>
    • El desarrollo intelectual de los cuatro fue resultado de la obediencia, no solo del estudio`) },

  { t:'🤝 Dios y yo trabajamos juntos', h:
    hi(`Los cuatro jóvenes no fueron sabios por suerte. Oraban, estudiaban con cuidado y se alejaban de lo que los debilitaba, y Dios era su Maestro. El libro lo resume así: «Dios da las oportunidades; el éxito depende del uso que se haga de ellas» (PR 357.1). Dios nos ayuda, pero no hace nuestra parte por nosotros (PR 357.2).`) },
  { t:'💪 El carácter de Daniel', h:
    li(['Fue <strong>firme y cortés a la vez</strong> — no rebelde, no grosero, no agresivo',
        'Propuso una <strong>prueba razonable</strong> en lugar de solo negarse',
        'Se ganó el <strong>respeto</strong> de quienes tenían autoridad sobre él',
        'La fidelidad <strong>en cosas pequeñas</strong> lo hizo apto para un puesto de confianza y honor',
        'Pudo buscar excusas, pero <strong>no vaciló</strong>: resolvió mantenerse firme, fueran cuales fueran los resultados']) },

  { t:'🌟 Dios también quiere usarte a ti', h:
    hi(`Daniel y sus amigos no se imaginaban lo que Dios haría con ellos cuando salieron de su casa. Lo que Dios hizo por medio de ellos quiere hacerlo hoy por medio de los jóvenes y de los niños que se entregan a él de todo corazón (PR 360.2-360.3).`) },
  /* v176: preguntado en el examen real de Adultos como frase para completar. */
  { t:'🏙️ En nuestras grandes ciudades (PR 360)', h:
    hi(`Para los jóvenes de hoy, el libro dice: <strong>«Aunque rodeados por
    tentaciones a satisfacer sus apetitos, especialmente en nuestras grandes
    ciudades, donde resulta fácil y atrayente toda complacencia sensual,
    pueden permanecer por la gracia de Dios firmes en su propósito de honrar a
    Dios»</strong> (PR 360).<br><br>
    Las dos palabras que preguntaron: <strong>grandes ciudades</strong> y
    <strong>honrar</strong>. Y sigue: «Pero sólo podrá alcanzar la victoria el
    que resuelva hacer el bien por el bien mismo».`) },
  { t:'🎯 Aplicación para los jóvenes de hoy', h:
    hi(`Mantenerse fiel a los principios de Dios en un ambiente contrario es un
    <strong>acto de fe y un testimonio</strong> ante quienes no creen.
    El rey no los obligó a dejar su fe: esperaba lograrlo
    <strong>poco a poco</strong>. Y el capítulo advierte que <strong>el primer
    paso</strong> en la dirección equivocada habría llevado a otros.`) },
  /* v150: lo que el examen pregunta de este capítulo y el estudio no
     decía. Cada línea sale de la pregunta y su respuesta del banco, nada más. */
  { t:'Otros datos que se preguntan', capa:'nucleo', h:
    li([
      `Melsar aceptó hacer la prueba de los diez días, aunque temía que esa concesión pudiera desagradar al rey.`,
      `Los padres de Daniel y sus amigos les habían inculcado hábitos de estricta templanza.`
    ]) },
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
    decían</strong> que podían. Tras la segunda respuesta los acusó de preparar
    <strong>respuestas mentirosas</strong>; y cuando dijeron que ningún hombre
    podía hacerlo, mandó matar a todos los sabios de Babilonia.`) },


  { t:'😨 «Ningún hombre puede hacerlo»', h:
    hi(`La tercera vez, los magos tuvieron miedo y dijeron que ningún hombre en la tierra podía decirle al rey su sueño, que solo los dioses podían. Eso enojó muchísimo al rey, y mandó matar a todos los sabios de Babilonia. Daniel y sus amigos también estaban en esa lista (PR 362.1-362.3).`) },
  { t:'🛡️ Daniel habla con Arioc y con el rey', h:
    hi(`Cuando vinieron a buscarlo, Daniel le preguntó con calma a Arioc, el capitán de la guardia, por qué había tanta prisa. Luego, arriesgando su vida, fue ante el rey y le pidió tiempo para orar a su Dios. Después se reunió con Ananías, Misael y Azarías, y juntos pidieron sabiduría a Dios. Esa noche Dios le mostró a Daniel el sueño y su significado (PR 362.3-362.4).`) },
  { t:'🙏 La oración antes de la revelación', h:
    hi(`• Ante la sentencia de muerte, Daniel preguntó a Arioc la causa y se
    presentó ante el rey a pedir tiempo <strong>para rogar a su Dios</strong><br>
    • Luego, junto con sus compañeros, <strong>pidieron sabiduría</strong> a Dios y
    le rogaron que los librara. En el peligro <strong>siempre se habían dirigido al Señor</strong><br>
    • La respuesta llegó en visión de noche<br>
    • Daniel <strong>dio la gloria a Dios</strong> antes de presentarse ante el rey`) },

  { t:'🗿 La imagen, de la cabeza a los pies', h:
    hi(`Cabeza: oro fino. Pecho y brazos: plata. Vientre y muslos: metal. Piernas: hierro. Pies: parte hierro y parte barro cocido. Una piedra cortada sin que nadie la tocara con las manos golpeó los pies y deshizo toda la imagen, y el viento se llevó los pedazos como polvo. La piedra creció hasta ser un gran monte que llenó toda la tierra (PR 364.2-364.3).`) },
  { t:'👑 Qué quería decir el sueño', h:
    hi(`Daniel le dijo al rey: «tú eres aquella cabeza de oro» (PR 365.1). Después vendrían otros reinos, uno fuerte como el hierro y luego uno dividido, parte fuerte y parte frágil. Al final, el Dios del cielo levantaría un reino que nunca será destruido y que durará para siempre (PR 365.2-365.5).`) },
  { t:'🌍 El significado profético', h:
    hi(`• La imagen revela el <strong>plan de Dios para el curso de los imperios mundiales</strong><br>
    • Cada metal representa un imperio sucesivo en la historia<br>
    • La historia no es azar: <strong>Dios gobierna el reino de los hombres</strong><br>
    • Los reinos se levantan y caen conforme al propósito divino`) },

  { t:'🪨 La piedra', h:
    hi(`La piedra cortada sin manos desmenuzó toda la imagen y se hizo un gran
    monte que llenó la tierra. Daniel lo explica así: <strong>el Dios del cielo
    levantará un reino que nunca será destruido</strong>, que acabará con todos
    esos reinos y permanecerá para siempre.<br><br>
    <em>Esto no lo dice el capítulo: que la piedra represente a Cristo viene de
    la interpretación que la une con otros textos de la Biblia sobre Cristo como
    la piedra (por ejemplo, en los evangelios y en la primera carta de Pedro).</em>`) },

  { t:'🙇 El rey se inclina ante Dios', h:
    hi(`El rey supo que la explicación era verdad. Se postró con el rostro en el suelo y dijo que el Dios de Daniel es «Dios de dioses» (PR 365.6). Anuló la orden de matar a los sabios, hizo a Daniel gobernador de toda la provincia de Babilonia y, porque Daniel se lo pidió, puso a sus tres amigos a cargo de los asuntos de la provincia (PR 365.7).`) },
  { t:'🏛️ Por qué cayó Babilonia', h:
    hi(`Los reyes de Babilonia solo buscaban a Dios cuando estaban en problemas. Cuando les iba bien, creían que no lo necesitaban y se daban la gloria a sí mismos, y por eso su reino cayó (PR 367.2-367.3). El capítulo termina enseñando que la fuerza de un país o de una persona no está en lo que tiene, sino en lo fiel que es a Dios (PR 368.3).`) },
  { t:'🎯 Aplicación', h:
    li(['Las profecías dan <strong>certeza de que Dios controla la historia</strong>',
        'Daniel nunca se atribuyó la gloria: apuntó siempre a Dios como la fuente',
        'Quien estudia la Palabra de Dios puede ver en la historia <strong>el cumplimiento literal de la profecía</strong>']) },
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

  { t:'😈 El plan escondido detrás de la estatua', h:
    hi(`Dios había usado la imagen del sueño para enseñar lo que iba a pasar en el futuro. Pero ahora esa misma imagen se iba a usar para aplaudir al hombre y hacer olvidar lo que Daniel explicó. Detrás de los hombres orgullosos estaba Satanás. Él sabe que la verdad sin mezcla de error tiene gran poder para salvar, pero que, si se usa para presumir, se convierte en algo malo (PR 370.3).`) },
  { t:'🏛️ El gran día en la llanura de Dura', h:
    hi(`La estatua medía «sesenta codos de altura y seis codos de anchura» (PR 371.1) y se levantó en la llanura de Dura. Llegó gente de todos los pueblos y lenguas. Cuando sonó la música, todos se inclinaron. Satanás quería que ese culto a la estatua durara para siempre y así impedir que el pueblo de Israel, preso en Babilonia, fuera una bendición para las demás naciones (PR 371.2).`) },
  { t:'👀 Los acusaron por celos, y el rey les dio otra oportunidad', h:
    hi(`Unos sabios que tenían celos de los honores dados a los amigos de Daniel fueron a acusarlos ante el rey (PR 372.1). El rey los amenazó con el horno, pero notó que eran distintos: habían cumplido bien todos sus deberes. Por eso les dio otra oportunidad. Luego, levantando la mano, los desafió: «¿Qué dios será aquel que os libre de mis manos?» (PR 372.3). Ser fiel en el trabajo de cada día también habla de Dios.`) },
  { t:'⚖️ La decisión de los tres jóvenes', h:
    vs(`«Nuestro Dios puede librarnos… <strong>y si no</strong>,
    no serviremos a tus dioses ni adoraremos tu estatua.»`) +
    hi(`Esa frase — <strong>«y si no»</strong> — es el corazón del capítulo:
    la fe verdadera obedece <u>aunque no vea de antemano el resultado</u>.
    No negociaron con Dios ni condicionaron su lealtad al milagro.`) },

  { t:'📖 Lo que aprendieron de la historia de su pueblo', h:
    hi(`¿Por qué no tuvieron miedo? Porque conocían la historia de sus padres. Habían aprendido que desobedecer a Dios trae deshonra, desastre y muerte, y que respetar a Dios es el comienzo de la sabiduría (PR 372.4). Conocer lo que Dios hizo antes nos ayuda a ser fieles hoy.`) },
  { t:'🔥 Un horno siete veces más caliente', h:
    hi(`El rey se enojó tanto que mandó calentar el horno siete veces más de lo normal. El fuego estaba tan fuerte que mató a los soldados que llevaron a los tres jóvenes (PR 373.1-373.2). Pero adentro, el Salvador estaba con ellos, y las llamas no los pudieron quemar (PR 373.3).`) },
  { t:'🔥 El cuarto personaje', h:
    hi(`El cuarto que apareció en el horno era <strong>el Hijo de Dios mismo</strong>,
    quien acompañó a sus fieles en el momento de la prueba.<br><br>
    No los libró <em>de</em> la prueba, sino que <strong>estuvo con ellos dentro de ella</strong>.`) },

  { t:'🙌 Salieron sin olor a humo', h:
    hi(`El rey se olvidó de su grandeza, bajó de su trono y los llamó a salir (PR 374.2). Salieron sanos delante de todos: solo se quemaron las cuerdas que los ataban (PR 374.3). Nadie volvió a pensar en la gran estatua de oro (PR 374.4). El rey tuvo que reconocer que el Dios de ellos sí podía librar.`) },
  { t:'⚖️ Lo que el rey hizo bien y lo que hizo mal', h:
    hi(`Estuvo BIEN que el rey reconociera a Dios delante de todos y lo pusiera por encima de los otros dioses (PR 375.3). Estuvo MAL que obligara a los demás a creer lo mismo que él, amenazándolos de muerte. Dios nunca obliga a nadie: deja que cada uno elija a quién quiere servir.`) },
  { t:'🌍 La noticia viajó por el mundo', h:
    hi(`En la fiesta de Dura había representantes de muchas naciones que el rey había invitado. Ellos vieron el milagro y llevaron la noticia a muchos países. Así, gracias a la fidelidad de tres jóvenes, Dios fue conocido y honrado en toda la tierra (PR 375.4).`) },
  /* v176: lo que el examen real de Adultos preguntó de PR 375 y 376. */
  { t:'🤝 De parte de los oprimidos (PR 375)', h:
    hi(`<strong>«Mediante la liberación de sus fieles siervos, el Señor declaró
    que está de parte de los oprimidos, y reprende a todos los poderes
    terrenales que se rebelan contra la autoridad del Cielo»</strong>
    (PR 375).<br><br>
    En la hora de su prueba, los tres <strong>recordaron la promesa de Isaías
    43:2</strong>: «Cuando pasares por las aguas, yo seré contigo… Cuando
    pasares por el fuego, no te quemarás».`) },
  { t:'🕰️ Modelo para la crisis final', h:
    hi(`• Este evento es un <strong>modelo para el tiempo del fin</strong>,
    cuando se exigirá adoración contraria a la voluntad de Dios<br>
    • «La ira del hombre se despertará en forma especial contra aquellos que
    <strong>santifican el sábado</strong> del cuarto mandamiento» (PR 376), y
    en el <strong>tiempo de angustia</strong> el que anduvo con ellos en el
    horno acompañará a los suyos. Esas son las lecciones que preguntó el
    examen de 2026<br>
    • La fidelidad puede costar la vida, pero <strong>Dios libera a los suyos</strong><br>
    • «Satanás, con toda la hueste del mal, no puede destruir al más débil
    de los santos de Dios» (PR 376.3), aunque obedecer pueda costar cárcel,
    destierro o muerte (PR 376.2)<br>
    • La noticia de la liberación llegó a <strong>muchos países</strong> por medio de
    los representantes de las naciones invitadas a la dedicación, y así
    <strong>Dios fue glorificado en toda la tierra</strong> (PR 375.4)`) },

  { t:'🎯 Aplicación', h:
    hi(`No aplica solo a la idolatría literal con estatuas.
    El capítulo dice que lo vivido en la llanura de Dura deja
    <strong>lecciones importantes para nuestra época</strong>: en el tiempo del
    fin los fieles serán presionados a dar un culto falso, y deberán poner la
    Palabra de Dios por encima de los mandatos de los hombres (PR 376.1-2).`) },
  /* v150: lo que el examen pregunta de este capítulo y el estudio no
     decía. Cada línea sale de la pregunta y su respuesta del banco, nada más. */
  { t:'Otros datos que se preguntan', capa:'nucleo', h:
    li([
      `Nabucodonosor supo cómo se vería el Hijo de Dios porque los cautivos hebreos le habían hablado de Cristo, el Redentor que iba a venir.`,
      `En la hora de su prueba, los tres jóvenes recordaron la promesa de Isaías 43:2: al pasar por el fuego, no se quemarían.`,
      `En el tiempo del fin, la ira del hombre se despertará en forma especial contra los que santifican el sábado del cuarto mandamiento.`
    ]) },
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
        `A veces <strong>había atribuido la gloria de su reino al favor de
         Jehová</strong>, sobre todo después del sueño de la gran imagen.`,
        `Después <strong>perdió de vista</strong> el propósito de Dios con las
         naciones.`,
        `Aun siendo <strong>idólatra por nacimiento y educación</strong>, tenía
         <strong>un sentido innato de la justicia y de lo recto</strong>, y por
         eso Dios pudo usarlo.`]) +
    hi(`El título del capítulo es <strong>“La verdadera grandeza”</strong>, y el
    mismo capítulo la define: <strong>«la verdadera grandeza consiste en ser
    verdaderamente buenos»</strong> (PR 382.3). También dice que la humildad es
    la única senda que lleva a ella (PR 377.3).<br><br>
    Y muestra el cambio del rey: el que había sido un «gobernante tiránico e
    intolerante» llegó a ser «un rey sabio y compasivo» (PR 382.3).`) },


  { t:'🏗️ Babilonia, la ciudad que lo llenó de orgullo', h:
    hi(`Nabucodonosor ganó muchas guerras: conquistó Tiro después de años de esfuerzo, y también Egipto (PR 377.2). Entre una guerra y otra se dedicó a construir y a embellecer Babilonia hasta volverla una de las maravillas del mundo. Pero eso lo hizo muy orgulloso. El libro dice que la humildad es el único camino que lleva a la verdadera grandeza (PR 377.3).`) },
  { t:'🌳 El sueño del árbol gigante', h:
    hi(`Dios quería al rey, y por eso le mandó otro sueño para avisarle del peligro. Vio un árbol enorme que llegaba hasta el cielo; los animales descansaban a su sombra, los pájaros hacían nidos en sus ramas y todos comían de su fruto. Entonces un «vigilante y santo» bajó y mandó cortarlo, pero dejar en la tierra la cepa de sus raíces, atada con hierro y metal. Todo iba a pasar para que se supiera que el Altísimo manda sobre los reinos de los hombres (PR 378.1-378.3).`) },
  { t:'🙊 Nadie pudo, pero Daniel dijo la verdad', h:
    hi(`Los magos y sabios no pudieron explicar el sueño. Solo los que aman y temen a Dios entienden sus misterios (PR 379.1). El rey llamó a Daniel. Daniel entendió el sueño y se asustó tanto que se quedó callado casi una hora (PR 379.3). Aun así, sabía que tenía que decirle la verdad al rey, aunque eso le trajera problemas (PR 379.4). Decir la verdad con respeto es valentía.`) },
  { t:'🔍 Qué significaba el árbol', h:
    hi(`Daniel le explicó: «tú mismo eres, oh rey» (PR 380.1). Como el árbol, el rey había crecido y su poder llegaba lejos. Iba a ser sacado de entre la gente y viviría con los animales, comiendo hierba como los bueyes, durante siete tiempos, hasta reconocer que Dios manda. La cepa que quedaba en la tierra quería decir que su reino lo esperaría y volvería a él cuando entendiera que el que gobierna está en los cielos (PR 380.2).`) },
  { t:'💡 El consejo de Daniel', h:
    hi(`Daniel no solo dio la mala noticia. Le rogó al rey que se arrepintiera y se volviera a Dios: que hiciera lo justo y que tuviera misericordia de los pobres. Tal vez así seguiría viviendo en paz (PR 380.3).`) },
  { t:'📉 Cuando el aviso se olvida', h:
    hi(`Por un tiempo el rey se tomó en serio el consejo. Pero su corazón no había cambiado por dentro, así que el orgullo volvió. Su gobierno, que había sido bastante justo, se volvió duro con la gente (PR 380.4). Dios esperó meses, pero en vez de arrepentirse, el rey terminó burlándose de sus propios temores (PR 381.1).`) },
  { t:'⏳ La paciencia de Dios', h:
    hi(`• En su misericordia, Dios le dio <strong>otro sueño para advertirle</strong>
    del peligro que corría (PR 378.1)<br>
    • Daniel le dio el mensaje y un consejo claro para evitar el juicio<br>
    • Le fue concedido <strong>un año completo</strong> para arrepentirse<br>
    • El juicio solo cayó cuando la jactancia salió de su boca`) },

  { t:'👑 El pecado de Nabucodonosor', h:
    hi(`• Su pecado principal fue el <strong>orgullo y la arrogancia</strong><br>
    • Se atribuyó a sí mismo <strong>la gloria que pertenecía a Dios</strong><br>
    • «¿No es ésta la gran Babilonia que <u>yo</u> edifiqué?»<br>
    • Olvidó que su poder y su reino eran un don, no un logro propio`) },

  { t:'🐂 Siete años como los bueyes', h:
    hi(`Mientras el rey todavía hablaba con orgullo, una voz del cielo anunció el castigo (PR 381.3). En un momento perdió la razón: ya no podía gobernar, comía hierba como los bueyes y su pelo y sus uñas crecieron como de ave (PR 381.4). Así estuvo siete años, y todo el mundo lo vio (PR 382.1).`) },
  { t:'🙌 La restauración', h:
    hi(`• La humillación fue el <strong>camino de la restauración</strong><br>
    • Al reconocer la soberanía de Dios, su razón y su reino le fueron devueltos<br>
    • Con su proclamación pública se cumplió el propósito de Dios de que
    <strong>el mayor reino del mundo</strong> lo alabara, y fue <strong>el último
    acto de su vida</strong> que registra la historia sagrada (PR 383.1)<br>
    • Terminó siendo <strong>un adorador del Dios verdadero</strong>`) },

  { t:'⭐ La verdadera grandeza, según el libro', h:
    hi(`Al final, el rey orgulloso se volvió humilde hijo de Dios, un rey sabio y compasivo que quería que su pueblo respetara a Dios y fuera feliz. Aprendió la lección que todo gobernante necesita: «la verdadera grandeza consiste en ser verdaderamente buenos» (PR 382.3). Su anuncio público alabando a Dios es lo último que la historia sagrada cuenta de su vida (PR 383.1).`) },
  { t:'🎯 La lección central', h:
    wa(`<strong>La verdadera grandeza consiste en ser verdaderamente buenos</strong>
    (PR 382.3), y la humildad es la única senda que lleva a ella (PR 377.3).<br><br>
    El rey lo aprendió y lo confesó: Dios «humillar puede a los que andan con
    soberbia» (PR 382.3).<br><br>
    <em>Esto no lo dice el capítulo: la frase «Dios resiste a los soberbios y da
    gracia a los humildes» viene de Santiago 4:6.</em>`) },
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
    wa(`<strong>P&amp;R dice que Belsasar era nieto de Nabucodonosor</strong>
    (PR 384.2). <strong>Daniel 5 llama a Nabucodonosor “su padre”</strong>
    (5:2, 11, 13, 18).<br><br>
    <em>Esto no lo dice el capítulo: viene del uso de la Biblia</em>, donde
    <strong>“padre” puede referirse a un antepasado</strong>, como «hijo de
    David» se le dice a alguien de generaciones después. Si en el examen preguntan por el
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
    • Tuvo <u>muchas oportunidades</u> de conocer la voluntad de Dios y las desperdició<br>
    • Esa noche comprendió que <strong>debía dar cuenta</strong> de lo que Dios le había confiado, y que no tenía excusa (PR 386.2)<br>
    • No pecó por ignorancia sino con pleno conocimiento de lo que hacía`) },

  { t:'🏰 Una ciudad que se creía segura', h:
    hi(`Ciro el Grande, sobrino de Darío el Medo y general de los ejércitos de medos y persas, rodeó Babilonia. Pero Belsasar no tuvo miedo: la ciudad tenía murallas enormes, puertas de bronce, el río Éufrates alrededor y mucha comida guardada. Por eso se dedicó a hacer fiestas. Hizo un gran banquete para mil de sus príncipes y, bajo el efecto del vino, mandó traer los vasos de oro y plata del templo de Jerusalén para beber en ellos y alabar a dioses de oro, plata, madera y piedra. Quería mostrar que para él nada era demasiado sagrado (PR 384.3–385.2).`) },
  { t:'🏺 La profanación de los vasos sagrados', h:
    hi(`Usar los vasos del templo de Jerusalén para beber vino y alabar a los ídolos
    no fue un descuido ni una costumbre normal:<br><br>
    fue un <strong>desafío deliberado a Dios</strong> y la <strong>cima de su impiedad</strong>.
    Fue parte de <strong>aquella última noche</strong> en la que Belsasar y sus señores
    colmaron la medida de su culpa (PR 389.2).`) },

  { t:'👁️ El Vigía que nadie invitó', h:
    hi(`Belsasar no se imaginaba que un Testigo del cielo estaba mirando su fiesta. Ese «Vigía divino» es el que da nombre al capítulo. Cuando la fiesta estaba en su peor momento, apareció una mano sin sangre que escribió en la pared letras que brillaban como fuego. Las risas se apagaron y todos se pusieron pálidos. Belsasar fue el más asustado: «sus rodillas se batían la una con la otra» (PR 386.2). Su conciencia despertó y entendió que tenía que rendir cuentas a Dios por todo lo que se le había confiado.`) },
  { t:'📜 Nadie pudo leer, pero Daniel sí', h:
    hi(`El rey llamó a los astrólogos, caldeos y adivinos. Prometió ropa de púrpura, un collar de oro y el tercer lugar en el reino a quien leyera la escritura. Ninguno pudo, porque «la sabiduría celestial no puede comprarse ni venderse» (PR 386.3). Entonces la reina madre se acordó de Daniel, que más de cincuenta años antes había explicado el sueño de Nabucodonosor. Daniel llegó tranquilo y no se interesó en los premios: «Tus dones sean para ti» (PR 387.3). Venía a dar un mensaje de Dios, no a quedar bien con el rey.`) },
  { t:'⚖️ MENE, MENE, TEKEL, UPHARSIN', h:
    hi(`Antes de leer, Daniel le recordó al rey lo que le pasó a Nabucodonosor por su orgullo y cómo después reconoció a Dios. Luego lo reprendió con valentía: Belsasar sabía todo eso y no humilló su corazón, usó los vasos de la casa de Dios, alabó a dioses que «ni ven, ni oyen, ni saben» y no honró al Dios que tenía su vida en su mano (PR 388.2). Después explicó las palabras. MENE: Dios contó los días de tu reino y le puso fin. TEKEL: fuiste pesado en la balanza y te faltó peso. PERES: tu reino es partido y dado a medos y persas (PR 389.1).`) },
  { t:'🌊 Babilonia cae en una sola noche', h:
    hi(`Aunque el mensaje era terrible, el rey cumplió su palabra: vistió a Daniel de púrpura y lo nombró tercer señor del reino (PR 389.3). Más de cien años antes, la profecía ya había anunciado que esa noche de fiesta terminaría en miedo y destrucción. Mientras el rey y sus nobles bebían en los vasos sagrados, los medos y persas desviaron el río Éufrates y entraron a la ciudad desprevenida. Esa misma noche murió Belsasar, y un rey extranjero se sentó en su trono (PR 389.4–390.1).`) },
  { t:'⚡ El juicio inmediato', h:
    hi(`• La mano apareció <strong>cuando el desenfreno llegó a su apogeo</strong>, después de beber en los vasos y alabar a los ídolos<br>
    • El juicio se ejecutó <strong>esa misma noche</strong> (Daniel 5:30)<br>
    • Dios dictó una <strong>sentencia irrevocable</strong>: su mano ya no detendría el mal que venía sobre ellos (PR 389.2)<br>
    • Babilonia cayó en una sola noche, en medio de su fiesta`) },

  { t:'📖 Los profetas ya lo habían dicho', h:
    hi(`Jeremías e Isaías habían escrito, mucho antes, que Babilonia caería de repente, que sus muros serían derribados y que quedaría vacía, sin nadie que viviera allí, solo con animales salvajes. La ciudad orgullosa que decía «Para siempre seré señora» (PR 391.5) terminó sentada en el polvo, sin trono (PR 390.2–392.4).`) },
  { t:'☸️ Las ruedas de Ezequiel: Dios guía la historia', h:
    hi(`Cada gran imperio (Babilonia, Medo-Persia, Grecia y Roma) tuvo su tiempo de prueba, y todos fracasaron (PR 392.5). El profeta Ezequiel, junto al río Chebar, vio unas ruedas muy complicadas que se movían en armonía perfecta. Las guiaba una mano que estaba debajo de las alas de los querubines. Más arriba, Dios estaba sentado en un trono como de zafiro, rodeado de un arco iris, señal de su misericordia. La lección: aunque las naciones se peleen, Dios sigue guiando lo que pasa en la tierra. Y cada persona, con sus propias elecciones, decide su destino (PR 393.1–393.3).`) },
  { t:'🕊️ Dios no abandona a su iglesia', h:
    hi(`Jesús anunció guerras, hambres y terremotos antes de su venida, y el capítulo dice que esas señales se están cumpliendo. Solo la Biblia muestra correctamente lo que viene. Hay una promesa segura: «Dios no desamparará a su iglesia en la hora de su mayor peligro» (PR 395.5). Al final, el propósito de Dios se cumplirá (PR 394.1–395.6).`) },
  { t:'🎯 Aplicación', h:
    wa(`«Hoy los hombres y las naciones son probados por <strong>la plomada</strong>
    que está en la mano de Aquel que no comete error» (PR 393.3). Cada uno decide
    su destino por su propia elección; y así como cada imperio tuvo su plazo de
    prueba (PR 392.5), el tiempo de gracia <strong>tiene un límite</strong>.`) },
],

/* ═══════════════ P&R 44 ═══════════════ */
pr44: [
  { t:'📚 En pocas palabras', h:
    hi(`Este capítulo explica <strong>por qué</strong> los enemigos de Daniel no
    le encontraron ninguna falta.<br><br>
    Daniel era el mismo en la prueba y en la prosperidad: en el foso fue el
    mismo que delante del rey (PR 400.2). Cumplía bien su cargo con
    reyes que no creían en Dios, y nunca dejó de ser fiel.<br><br>
    Su fuerza no apareció el día del foso: venía de <strong>orar todos los
    días</strong>, mucho antes de que hubiera peligro. Cuando salió el decreto,
    no cambió nada.<br><br>
    <em>La idea: se puede servir a Dios en cualquier trabajo y en cualquier
    lugar, y ser el mismo en la prueba que en la prosperidad.</em>`) },

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

  { t:'💎 La integridad de Daniel', h:
    hi(`• Sus enemigos lo investigaron a fondo buscando corrupción y <strong>no hallaron nada</strong><br>
    • No se halló en él <strong>ningún vicio ni falta</strong>, y sus negocios, examinados con severidad, resultaron <strong>intachables</strong> (PR 396.2; 400.4)<br>
    • Fue <strong>fiel en su trabajo</strong> como funcionario del gobierno, no solo en lo religioso<br>
    • Oraba <strong>según su costumbre</strong>, y cuando llegó el decreto no cambió su conducta en nada (PR 397.2)`) },

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
    Firmó por vanidad y por no darse cuenta. Cuando vio la trampa,
    <strong>trabajó hasta la puesta del sol para librarlo</strong> (PR 398.4); y
    después de echarlo al foso pasó la noche sin comer y sin dormir (PR 398.5).
    La trampa fue de los príncipes.`) },

  { t:'👿 Quién estaba detrás del plan', h:
    hi(`El plan no salió solo de los príncipes. Satanás tuvo un papel importante. Los malos ángeles tenían miedo de que la influencia de Daniel les quitara el control que tenían sobre los gobernantes. Por eso movieron a los príncipes a sentir envidia y les dieron la idea de destruirlo, y los príncipes aceptaron ser instrumentos del mal (PR 397.1).`) },
  { t:'🙏 La oración como hábito diario', h:
    hi(`• Oraba <strong>«según su costumbre»</strong>, no solo en la emergencia: antes dejaría la vida que <strong>la esperanza de ayuda que hallaba en Dios</strong> (PR 397.2)<br>
    • Cuando llegó el decreto, <strong>no cambió nada</strong>: siguió como solía hacerlo antes<br>
    • No oró más para desafiar, ni menos para esconderse<br>
    • Esa constancia previa fue lo que hizo posible su firmeza en el momento crítico`) },

  { t:'🪟 Ventanas abiertas hacia Jerusalén', h:
    hi(`Daniel se dio cuenta enseguida de la trampa, pero no cambió nada. Seguía haciendo su trabajo con calma y, a la hora de orar, iba a su cuarto con las ventanas abiertas hacia Jerusalén, como siempre. No se escondía. Daniel obedecía al rey en todo lo que al rey le tocaba mandar, pero ni el rey ni su decreto podían apartarlo de su lealtad al «Rey de reyes» (PR 397.2).`) },
  { t:'📜 Una ley que no se podía cambiar', h:
    hi(`Los príncipes vigilaron a Daniel todo un día y lo vieron ir a orar tres veces. Al día siguiente lo acusaron ante el rey. Darío entendió que todo era una trampa por envidia. Le dolió mucho lo que había hecho y trabajó hasta la puesta del sol para salvarlo. Pero los príncipes le recordaron que, según la ley de Media y de Persia, un decreto firmado por el rey no se podía cambiar (PR 398.1–398.4).`) },
  { t:'🤔 ¿Por qué Dios dejó que lo echaran al foso?', h:
    hi(`Daniel fue echado al foso. Pusieron una piedra en la entrada y el rey la selló con su anillo y con el de sus príncipes. Esa noche Darío no comió, no quiso música y no pudo dormir. Dios no impidió que echaran a Daniel al foso. Lo permitió para que su liberación se viera todavía más grande y la derrota de sus enemigos fuera completa. Gracias al valor de un solo hombre, Satanás fue derrotado y el nombre de Dios fue honrado (PR 398.5–399.1).`) },
  { t:'🦁 El ángel cerró la boca de los leones', h:
    hi(`Muy temprano, el rey fue corriendo al foso y llamó a Daniel con voz triste. Daniel le contestó que Dios había enviado a su ángel, que cerró la boca de los leones para que no le hicieran daño. Lo sacaron del foso sin una sola herida, «porque creyó en su Dios» (PR 399.4). Después, los hombres que lo habían acusado fueron echados al foso (PR 399.2–399.5).`) },
  { t: '🙏 Por qué Daniel dio gracias frente a los leones',
    h: hi(`<strong>Al enterarse del decreto que le prohibía orar, Daniel «se arrodillaba tres veces al día, oraba y daba gracias delante de su Dios como solía hacerlo antes» (6:10).</strong> P&amp;R 44 no menciona que diera gracias: dice que no cambió su conducta en nada y que oraba «según su costumbre», porque antes renunciaría a la vida que a la esperanza de ayuda que hallaba en Dios (PR 397.2).<br><br><em>Esto no lo dice el capítulo: viene de la Biblia.</em> Daniel 7:1 fecha la visión de las cuatro bestias en el primer año de Belsasar, años antes del foso; allí vio a Dios derrotar a "bestias" mucho más temibles que cualquier león. La promesa de levantarse «al fin de los días» (Daniel 12:13) la menciona P&amp;R 44 como recibida antes de terminar su vida (PR 401.2), sin decir si fue antes o después del foso.`) },
  { t:'🌍 El alcance del testimonio', h:
    hi(`Su liberación no fue solo un rescate personal:<br><br>
    • Convirtió a <strong>Darío en proclamador</strong> del Dios verdadero<br>
    • El decreto llegó a <strong>todos los pueblos, naciones y lenguas</strong> del imperio<br>
    • La fidelidad de un hombre alcanzó a un imperio entero`) },

  { t:'💙 El cielo está cerca de los que sufren', h:
    hi(`El cielo está muy cerca de los que sufren por hacer lo correcto. Cristo siente como propio lo que sufre su pueblo fiel: «cualquiera que toque a sus escogidos le toca a él» (PR 400.3). El mismo poder que puede librar del peligro también ayuda al siervo de Dios a mantenerse fiel en todo momento.`) },
  { t:'🏛️ Fidelidad en un cargo secular', h:
    hi(`Daniel sirvió a <strong>reyes paganos</strong> durante toda su vida
    y nunca comprometió su lealtad a Dios.<br><br>
    Es un modelo de que se puede ser <strong>testigo fiel de Dios en cualquier posición</strong>,
    incluyendo puestos de gobierno y responsabilidad pública.`) },

  { t:'📖 Las profecías de Daniel son para nuestro tiempo', h:
    hi(`Dios le dio a Daniel muchas profecías (capítulos 7 al 12 de su libro) que ni él mismo entendió del todo. El ángel le dijo que sellara el libro «hasta el tiempo del fin» (PR 401.2). Hoy esas profecías, junto con el libro de Apocalipsis, merecen atención especial. Satanás ha hecho creer a muchos que no se pueden entender, pero Dios promete una bendición especial a quien las estudia (PR 402.1).`) },
  { t:'🌸 Lo único que dura para siempre', h:
    hi(`Babilonia parecía que iba a durar para siempre, pero desapareció «como la flor de la hierba» (PR 402.2). Lo mismo les pasó a Medo-Persia, Grecia y Roma. Todo lo que no está fundado en Dios se acaba. Solo dura lo que va con el propósito de Dios. Si miramos las cosas como Dios las mira, podemos vivir, como Daniel y sus compañeros, para lo que es verdadero, noble y perdurable (PR 402.2–403.1).`) },
  { t:'🎯 Aplicación para los jóvenes', h:
    wa(`Lo que Daniel decidió <strong>de joven</strong> (Daniel 1) fue lo que lo sostuvo
    <strong>de anciano</strong> (Daniel 6). <em>La edad no la dice el capítulo:</em>
    se calcula con las fechas del libro de Daniel, y da más de ochenta años en el foso.<br><br>
    Las decisiones de hoy construyen el carácter que responderá mañana.`) },

  { t: '👴 Daniel, de unos 84 años, y el Dios que carga a los suyos hasta la vejez',
    h: hi(`<em>Esto no lo dice el capítulo: la edad se calcula con las fechas del libro de Daniel, lo de Bel y Nebo viene del libro de Isaías y la fiesta de Año Nuevo, de la historia de Babilonia. Es contexto de apoyo, no materia del examen.</em><br><br><strong>Daniel tenía cerca de 84 años cuando lo arrojaron al foso: Dios seguía interesado en él en la ancianidad tanto como en su juventud.</strong> El profeta Isaías había contrastado esto mismo con los ídolos de Babilonia: cada primavera, en la fiesta de Año Nuevo, las estatuas de los dioses Bel y Nebo tenían que ser cargadas a lomo de animales por las calles, porque no podían moverse por sí solas. El Dios verdadero, en cambio, promete lo contrario: "hasta la vejez seré el mismo, hasta las canas los llevaré" — es Dios quien carga a su pueblo, no al revés. Daniel vivió esa promesa en carne propia esa noche en el foso.`) },
  /* v150: lo que el examen pregunta de este capítulo y el estudio no
     decía. Cada línea sale de la pregunta y su respuesta del banco, nada más. */
  { t:'Otros datos que se preguntan', capa:'nucleo', h:
    li([
      `La vida de Daniel muestra que un hombre de negocios puede ser un hombre instruido por Dios a cada paso.`
    ]) },
],
/* ═══════════════ DANIEL 7 ═══════════════ */
d7: [
  { t:'📚 En pocas palabras', h:
    hi(`Daniel, ya con unos <strong>setenta años</strong> (Maxwell, <i>El porvenir del mundo revelado</i>, p. 109), sueña de noche con
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
      ['Tolomeo I Sóter','Egipto, Cirenaica y Palestina'],
      ['Seleuco I Nicátor','Siria y las tierras del oriente'],
    ]) + `<p class="nota">Cuatro cabezas, cuatro reinos. Y las cuatro alas son la
    velocidad: Alejandro conquistó más rápido que nadie.</p>` },

  { t:'🗿 Daniel 7 y la estatua de Daniel 2 dicen lo mismo', h:
    tbl(['Daniel 2 — la estatua','Daniel 7 — las bestias','Reino'],[
      ['Cabeza de oro','León con alas','Babilonia'],
      ['Pecho y brazos de plata','Oso','Medo-Persia'],
      ['Vientre y muslos de bronce','Leopardo','Grecia'],
      ['Piernas de hierro','Cuarta bestia','Roma imperial (168 a.C.-476 d.C.)'],
      ['Diez dedos','Diez cuernos','Roma dividida (desde 476 d.C.)'],
      ['Hierro mezclado con barro','Cuerno pequeño','Roma papal (supremacía 538-1798 d.C.)'],
      ['La piedra que hiere los pies','Los santos reciben el reino (7:22)','La segunda venida'],
      ['El gran monte','Su reino es reino eterno (7:27)','El reino eterno, después de los mil años'],
    ]) + `<p class="nota">Es la misma historia contada dos veces. Lo que Daniel 7
    agrega son <strong>los rasgos del cuerno pequeño y la escena del juicio</strong>,
    que en Daniel 2 no aparecen.</p>` },

  { t:'👑 Los diez cuernos', h:
    `<p>Roma no cayó de golpe: se fue partiendo mientras entraban las tribus
    germánicas, y de ahí salieron las naciones de Europa. Las más nombradas son
    <strong>diez</strong>:</p>` +
    li(['Visigodos','Ostrogodos','Vándalos','Burgundios','Lombardos',
        'Anglosajones','Francos','Alamanes','Hérulos','Suevos']) +
    `<p class="nota">«De aquel reino se levantarán diez reyes» (7:24). Concuerda con los
    diez dedos de Daniel 2: Roma dividida desde 476 d.C., que ya no se vuelve
    a pegar.</p>` },

  { t:'🔍 Las ocho señas principales del cuerno pequeño', h:
    `<p>El capítulo da once señas; aquí van las ocho principales. Todas salen del texto:</p>` +
    tbl(['#','La seña','Versículo'],[
      ['1','Sale de la cuarta bestia','7:8, 24'],
      ['2','Aparece después de los diez cuernos','7:24'],
      ['3','Empieza pequeño y termina mayor que los otros','7:8, 20'],
      ['4','Arranca a tres de los primeros cuernos','7:8, 24'],
      ['5','Tiene ojos de hombre y una boca que habla contra el Altísimo','7:8, 25'],
      ['6','«A los santos del Altísimo quebrantará»','7:25'],
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
    representa un año, y Dios se lo dijo así a Ezequiel: día por año te lo he
    dado (Ezequiel 4:6). Ezequiel vivía cerca de Daniel, en Nipur.<br><br>
    Con esa regla, 1.260 días son <strong>1.260 años: del 538 al 1798</strong>.
    En 1798 el general francés Louis-Alexandre Berthier arrestó al papa Pío VI en Roma y lo
    llevó al exilio.`) },

  { t:'⚖️ El tribunal y los libros', h:
    vs(`«Estuve mirando hasta que fueron puestos unos tronos y se sentó un
    Anciano de días... El Juez se sentó y los libros fueron abiertos» (7:9-10).`) +
    `<p>El mensaje del juicio se repite <strong>cuatro veces</strong> en el
    capítulo: 7:9-14, 7:18, 7:22 y 7:26-27. La visión muestra que el reino se
    entrega al Hijo de hombre (7:14) y que los santos participan de ese reino
    (7:18, 22, 27).</p>` +
    tbl(['En la escena','Qué es'],[
      ['El Anciano','Dios Padre, sentado como juez (7:9)'],
      ['Los libros','El registro de las obras (7:10; Apocalipsis 20:12)'],
      ['El Hijo de hombre','Cristo, que se acerca al Anciano (7:13)'],
      ['Los santos','Los que reciben el reino para siempre (7:18, 27)'],
    ]) +
    hi(`El juicio de Daniel 7 <strong>no es contra el pueblo de Dios</strong>:
    «se hizo justicia a los santos del Altísimo» (7:22). El
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

  { t:'🕵️ ¿Quién es "el anticristo"? Tres lecturas y un consenso antiguo', h:
    `<p><strong>La palabra "anticristo" no aparece en Daniel, sino en las cartas de Juan</strong>, y ahí designa a quienes "salieron de entre nosotros" negando que Jesús vino en carne. El cuerno pequeño de Daniel 7 no necesita ese nombre para ser identificado: el capítulo ya trae sus propias once señas (ver arriba).</p><p>Entre los cristianos hay tres lecturas distintas de la profecía sobre el anticristo:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>Preteristas:</strong> ya apareció, en el siglo I.</li><li><strong>Futuristas:</strong> todavía no ha aparecido.</li><li><strong>Historicistas:</strong> ha actuado a lo largo de toda la historia de la iglesia, y de forma especial en la iglesia cristiana medieval.</li></ul><p>Lo llamativo es que, mucho antes de la Reforma protestante, <strong>varios católicos ya llamaban "anticristo" al papado</strong>:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>991:</strong> Arnulfo, obispo de Orleans, en un concilio francés.</li><li><strong>1240:</strong> Eberardo II, arzobispo de Salzburgo, en un sínodo de Regensburgo.</li><li><strong>Cisma de Occidente (1378-1417):</strong> con dos papas rivales, cada uno llamó anticristo al otro; Juan Wiclef dijo que juntos formaban "las dos mitades del Anticristo".</li><li><strong>Martín Lutero</strong>, monje agustino, llegó a la misma conclusión ya en el siglo XVI.</li></ul><div class="highlight-box">La identificación del cuerno pequeño con el papado no nació con los protestantes: circulaba dentro de la propia Iglesia Católica siglos antes de la Reforma.</div>` },

  { t:'⚖️ El orden real del juicio, y por qué Cristo es Juez y Abogado a la vez', h:
    `<p><strong>Daniel 7:9-14 no narra los sucesos del juicio en el orden en que ocurren</strong>: los versículos 11-12, donde se destruye a la bestia, son un paréntesis dentro del relato. El orden real es este:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>1. Se instalan los tronos.</li><li>2. El Anciano de días toma asiento.</li><li>3. Se le da la bienvenida al Hijo del hombre.</li><li>4. Se lleva a cabo el juicio.</li><li>5. Se entrega el reino al Hijo del hombre y a los santos.</li><li>6. Se destruye a la bestia.</li></ul><p><strong>El Padre preside el juicio (7:9-10; CS 533) y ha dado el juicio al Hijo (Juan 5:22, 27); Cristo es a la vez el abogado de los suyos (1 Juan 2:1).</strong></p><p>La escena también menciona más de un tipo de registro escrito:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>El <strong>registro de las obras</strong> de cada persona (7:10; Apocalipsis 20:12).</li><li>Un <strong>libro memorial</strong> con las buenas acciones de quienes temen a Dios (Malaquías 3:16).</li><li>El <strong>libro de la vida</strong>, con los nombres de los verdaderos cristianos.</li></ul><div class="highlight-box">Daniel 7:14 dice que el reino se le da al Hijo del hombre; 7:27, que se les da a los santos. No compiten: Cristo es "heredero de todo" y los santos son sus <strong>coherederos</strong> (Romanos 8:17).</div>` },

  { t:'🩸 Cinco mil mártires bajo Roma pagana, ocho millones en guerras entre cristianos', h:
    `<p><strong>Roma pagana fue descrita como una bestia "espantosa y terrible" (7:7) por perseguir a la iglesia, pero la cifra real de mártires cristianos bajo esa Roma fue baja</strong>: según el historiador W. H. C. Frend, de Cambridge, no pasa de cinco mil en casi tres siglos, desde Pentecostés (31 d.C.) hasta el fin de la persecución de Diocleciano (313 d.C.).</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>Solo hubo <strong>dos</strong> periodos de persecución sistemática: bajo Decio (250 d.C.) y bajo Diocleciano (303-313 d.C.).</li><li>La mayoría de los gobernadores romanos preferían no ejecutar a nadie durante su servicio en las provincias.</li><li>Aun así, el temor a la persecución, presente durante siglos, funcionaba como una forma de persecución en sí mismo.</li></ul><p><strong>La cifra se dispara cuando, siglos después, cristianos persiguieron a otros cristianos</strong>: la bula "Regnans in excelsis" del papa Pío V (1570) declaró hereje a la reina protestante Isabel I de Inglaterra; se calculan cerca de dos mil protestantes ejecutados en Holanda y varios miles de hugonotes franceses en la matanza de San Bartolomé (1572); y la Guerra de los Treinta Años (1618-1648), en gran medida un conflicto religioso, dejó más de ocho millones de víctimas militares y civiles, protestantes y católicas.</p><div class="highlight-box">El punto de Daniel 7 no es comparar cifras de un bando contra otro: es mostrar cuánto le disgusta a Dios la persecución religiosa, venga de quien venga.</div>` },
  {t:'🎭 Porfirio: el crítico pagano que primero aplicó Antíoco IV Epífanes al cuerno pequeño de Daniel 7',h:`<p><strong>La idea de que el cuerno pequeño es Antíoco Epífanes no nació con la erudición moderna: la propuso por primera vez, hacia el año 270-280 d.C., un filósofo pagano llamado Porfirio</strong>, en el libro doce de su obra "Contra los cristianos". Su objetivo no era exegético sino polémico: si podía demostrar que Daniel fue escrito DESPUÉS de los sucesos que narra (durante la crisis macabea del siglo II a.C.) y no antes, como pretendía ser una profecía auténtica, entonces Daniel dejaba de ser evidencia a favor del cristianismo.</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>Porfirio tomó la idea de un autor cristiano anterior, Hipólito de Roma (m. 236 d.C.), que ya había identificado a Antíoco con el cuerno pequeño de Daniel 8.</li><li>Pero fue Porfirio, no Hipólito, el primero en extender esa misma identificación también al cuerno pequeño de Daniel 7 — y de ahí la extendió además a Daniel 11 y 12.</li><li>Ninguna copia de la obra de Porfirio sobrevivió: se ordenó quemarla dos veces en el siglo V. Hoy solo se conoce su argumento por las citas que hizo de él, para refutarlo, el erudito cristiano Jerónimo (340-420 d.C.) en su propio comentario sobre Daniel.</li></ul><div class="highlight-box">El mismo argumento que hoy repiten algunos comentarios bíblicos críticos — que Daniel es "profecía después del hecho" — tiene 1.800 años de antigüedad, y nació de un opositor declarado del cristianismo, no de un estudio neutral del texto.</div>`},

  { t:'📖 Versículo clave', h:
    vs(`«Su dominio es dominio eterno, que nunca pasará; y su reino es uno que
    nunca será destruido» (Daniel 7:14).`) },
],

  d8: [
    { t: '📚 En pocas palabras',
      h: hi(`En el año tercero de Belsasar, 550 a.C. (Daniel 7 fue en el primero, 553 a.C.), Daniel ve un carnero de dos cuernos derrotado por un macho cabrío con un cuerno "notable". El cuerno se rompe y salen cuatro; de uno de ellos crece un cuerno pequeño que llega hasta el santuario mismo, quita el continuo (tamid) y echa por tierra el lugar de su santuario. La visión llega hasta el final de 2.300 tardes y mañanas: «luego el santuario será purificado» (8:14).`) },
    { t: '🌊 Cuándo y dónde',
      h: hi(`Daniel está en visión junto al río Ulai, en Susa (Elam), la futura capital de invierno del Imperio Medo-Persa: simbólicamente el profeta es trasladado a la época que va a describir. La visión ocurre en el año 550 a.C., el tercero de Belsasar (Daniel 7 fue en el primero, 553 a.C.); a Babilonia todavía le quedaba más de una década de existencia, pero no aparece en esta profecía porque los 2.300 años empiezan en tiempos de Persia (Bohr, <i>Daniel 1-10</i>, p. 293).`) },
    { t: '🐏 El carnero de dos cuernos',
      h: hi(`El carnero con dos cuernos, uno más alto que el otro y el más alto salido después, es <strong>Media-Persia</strong> (Daniel 8:20). El cuerno que despunta después y llega a ser el mayor representa a Persia, que en un principio fue la nación menor: Ciro el Grande se rebeló contra su abuelo Astiages (rey de Media) en el año 553 a.C. y en el 550 a.C. puso a Media bajo su control, invirtiendo el orden de los cuernos. El carnero embiste hacia el oeste, el norte y el sur, y «ninguna bestia podía parar delante de él» (v. 4).`) },
    { t: '🐐 El macho cabrío y su cuerno',
      h: hi(`El macho cabrío que viene de occidente «sin tocar tierra» es <strong>Grecia</strong> (Daniel 8:21, "Yaván"); su cuerno grande entre los ojos es "su primer rey" (v. 21), Alejandro Magno. Alejandro derrotó a los persas en tres batallas: el río Gránico (334 a.C.), Iso (333 a.C.) y Arbela/Gaugamela (331 a.C.). El macho cabrío despedazó al carnero con una velocidad que la propia visión ya anunciaba doscientos años antes de que ocurriera.`) },
    { t: '👑 Los cuatro cuernos',
      h: hi(`En la plenitud de su poder el gran cuerno de Alejandro Magno se rompe (murió a los 32 años, en el 323 a.C., sin heredero capaz de sostener el imperio) y en su lugar surgen cuatro cuernos «hacia los cuatro vientos del cielo»: los cuatro reinos en que se repartió el Imperio Helenístico bajo <strong>Casandro</strong> (Macedonia y Grecia), <strong>Lisímaco</strong> (Tracia y Asia Menor), <strong>Seleuco I Nicátor</strong> (Siria y Mesopotamia) y <strong>Tolomeo I Sóter</strong> (Egipto). Los reinos seléucida (al norte de Palestina) y tolemaico (al sur) son los que después protagonizan la larga guerra que describe Daniel 11.`) },
    { t: '🗡️ El cuerno pequeño que llega al santuario',
      h: hi(`«De uno de ellos» (8:9): de uno de los cuatro "vientos" o puntos cardinales. En hebreo «ellos» es masculino y «cuernos» es femenino, así que no son los cuernos. De allí sale un cuerno pequeño que "creció mucho hacia el sur y el oriente, y hacia la tierra gloriosa" (Palestina). Ese cuerno llega hasta "el príncipe de los ejércitos", quita el continuo (tamid; la palabra «sacrificio» la agregaron los traductores) y hace caer el lugar de su santuario (Daniel 8:9-11). El texto no dice de qué viento sale. El <em>Simposio sobre Daniel</em> concluye que “el punto cardinal del que salió el ‘cuerno pequeño’ solo puede ser el oeste” y que “Roma salió del oeste (desde el punto de vista de Israel)”; no sale de ninguno de los cuatro cuernos griegos: es <strong>Roma</strong> (Hasel, p. 396-399).`) },
    { t: '⚖️ Por qué no es Antíoco Epífanes',
      h: hi(`Algunos identifican este cuerno pequeño con Antíoco IV Epífanes, el rey seléucida que profanó el templo de Jerusalén entre 168 y 165 a.C. (episodio narrado en 1 y 2 de Macabeos). Pero el texto dice que el cuerno aparece "al término" del reino helénico (v. 23) y Antíoco reinó hacia la mitad de la dinastía seléucida (312/311 a 65 a.C.); además los cuernos representan reinos, no reyes individuales, y Antíoco murió en el 164 a.C., casi doscientos años antes de que Jesús hablara de la abominación desoladora anunciada por Daniel como algo todavía futuro (Mateo 24:15). Roma sí "creció mucho" hacia el sur, el oriente y Palestina: conquistó Macedonia en 168 a.C., Siria en 65 a.C., Palestina en 63 a.C. y Egipto en 30 a.C.`) },
    { t: '✝️ El tamid: el ministerio continuo de Cristo',
      h: hi(`La palabra hebrea <em>tamid</em>, que la Reina-Valera traduce "sacrificio continuo", no significa literalmente "sacrificio": significa "continuo" o "permanente" y se usaba en el santuario del Antiguo Testamento para el holocausto diario, las lámparas siempre encendidas y el pan siempre presente. En Daniel 8 representa, en sentido más amplio, el ministerio permanente de Cristo como Sumo Sacerdote en el santuario celestial (Hebreos 7:21-25; 8:1-2). Solo la fase papal del cuerno quita el continuo: viene después de que el cuerno crece «hasta llegar al ejército del cielo» (8:10-11). Roma pagana destruyó el templo de la tierra: «El pueblo de un príncipe que ha de venir destruirá la ciudad y el santuario» (9:26). Y los sacrificios de la tierra los terminó la muerte de Cristo: «a la mitad de la semana hará cesar el sacrificio y la ofrenda» (9:27); el velo del templo se rasgó (Mateo 27:51).`) },
    { t: '⏳ Las 2.300 tardes y mañanas',
      h: hi(`Un ángel pregunta hasta cuándo durará la visión: «la visión del sacrificio continuo, la prevaricación asoladora y la entrega del santuario y el ejército para ser pisoteados» (v. 13), y la respuesta es «Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado» (v. 14). Con la regla de día por año (Números 14:34; Ezequiel 4:6; la misma que se aplica a los 1.260 días de Daniel 7:25), 2.300 tardes y mañanas equivalen a <strong>2.300 años</strong>. Daniel «estaba espantado a causa de la visión, y no la entendía» (v. 27): el ángel Gabriel había explicado los símbolos, pero Daniel quedó quebrantado y enfermo antes de que le explicara el punto de partida del período de tiempo. Ese vacío es justamente lo que retoma Daniel 9.`) },
    { t: '🕊️ Reivindicado, purificado',
      h: hi(`La palabra hebrea que se traduce "reivindicado" o "purificado" es <em>nitsdaq</em>, emparentada con "justificar". El día del año judío dedicado a purificar el santuario era el <strong>Día de la Expiación</strong> (Levítico 16), el día más solemne del calendario, un día de juicio para el pueblo. Que la purificación del santuario celestial de Daniel 8:14 sea paralela a la escena de juicio de Daniel 7:9-14 no es casualidad: ambos pasajes describen, con símbolos distintos, el mismo acontecimiento celestial que marca el comienzo del juicio investigador.`) },
    { t: '🗓️ El punto de partida: 457 a.C.',
      h: hi(`Como se ve en Daniel 9, el ángel Gabriel retoma exactamente donde se había quedado en el capítulo 8 y fija el inicio de las 2.300 tardes y mañanas en el decreto del rey persa Artajerjes I para restaurar y reedificar Jerusalén, año 457 a.C. (Esdras 7). Contando 2.300 años completos desde el 457 a.C. (sin año cero entre a.C. y d.C.), el período termina en el <strong>año 1844</strong>. En 1818, estudiando la Biblia por su cuenta, el agricultor bautista Guillermo Miller, en Estados Unidos, concluyó que Cristo vendría unos veinticinco años después; en otros países hubo cristianos que, por el solo estudio de las Escrituras, llegaron a creer que la venida estaba cerca (CS 377 y 406). Primero esperaron la primavera de 1844, pero contando desde el otoño de 457 a.C. los 2.300 años terminaban en el otoño de 1844 (CS 376 y 450). Lo que en realidad comenzó en 1844 fue el juicio investigador en el santuario celestial, no el regreso visible de Cristo a la tierra.`) },
    { t: '🔗 Daniel 2, 7 y 8-9: una misma historia repetida y ampliada',
      h: hi(`Cada visión de Daniel repite el esquema de la anterior y le añade detalle. Daniel 2 muestra el ascenso y la caída de los imperios y termina con la piedra, que es la segunda venida, y el gran monte, el reino eterno. Daniel 7 recorre el mismo camino político y culmina con el tribunal celestial que entrega el reino a los santos: mira a Cristo como <strong>Juez</strong>. Daniel 8 y 9 recorren de nuevo la historia (sin Babilonia: los 2.300 años empiezan en tiempos de Persia; Bohr, <i>Daniel 1-10</i>, p. 293) y culminan con la obra de Cristo como <strong>Sumo Sacerdote</strong> que purifica el santuario y perdona el pecado. Daniel 2 mira a Cristo Rey, Daniel 7 a Cristo Juez, Daniel 8-9 a Cristo Sumo Sacerdote.`) },
    { t: '🏹 La artillería que ayudó a Alejandro Magno, y el rey que perdió el valor', h:
      `<p><strong>Alejandro no solo tuvo genio militar: contó con tecnología de punta para su época.</strong> Sus ejércitos usaban catapultas de torsión, impulsadas por cuerdas de crin y tendones entrelazados que actuaban como resortes; podían lanzar piedras de hasta 26 kilos con una precisión sorprendente contra los muros de una ciudad o las filas enemigas.</p><p>Pero el factor decisivo no fue la tecnología sino el liderazgo. En las tres grandes batallas contra Persia los persas superaban ampliamente en número a los griegos:</p>
    <ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>Gránico (334 a.C.)</strong></li><li><strong>Iso (333 a.C.)</strong></li><li><strong>Arbela/Gaugamela (331 a.C.)</strong></li></ul>
    <p>En el Gránico pelearon los sátrapas: Darío III no estaba. En Iso y en Arbela sí, y en las dos perdió el ánimo ante la primera dificultad, dio la vuelta a su carro y huyó, arrastrando consigo la moral de todo su ejército.</p><div class="highlight-box">"Como los repartimientos de las aguas, así está el corazón del rey en la mano de Jehová; a todo lo que quiere lo inclina" (Proverbios 21:1). Dios le dio valor a Daniel frente a los leones y a sus amigos frente al horno; pudo haber hecho lo mismo con Darío. Pero Persia había decidido su camino sin apoyarse en el Dios de Israel, y en la hora de la crisis Dios permitió que la debilidad humana siguiera su curso.</div><p>Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 159-160.</p>`},
    { t: '🌍 «Hasta cierto tiempo»: por qué Alejandro Magno casó a diez mil soldados con persas', h:
      `<p>Daniel 7:12 dice algo fácil de pasar por alto: a las tres primeras bestias (Babilonia, Medopersia, Grecia), a diferencia de la cuarta, <strong>«les había sido prolongada la vida hasta cierto tiempo»</strong> después de perder el dominio político. Ese detalle se cumple de forma muy concreta en la historia de Alejandro.</p><p>En un gesto simbólico, Alejandro se casó con la princesa bactriana Roxana y patrocinó con entusiasmo la boda de diez mil de sus soldados griegos con mujeres persas. Fusionó a propósito las civilizaciones babilónica, persa y griega en algo nuevo: la cultura <strong>helenística</strong>, que siguió marcando a Occidente mucho después de que el imperio político de Alejandro dejara de existir.</p><div class="highlight-box">Los reinos caen como poder político en el momento que marca la profecía, pero su huella cultural puede seguir viva "durante un tiempo": eso es justamente lo que Daniel 7:12 anticipó, y lo que Alejandro cumplió a propósito con sus matrimonios masivos.</div>`},

        { t: '🔢 Policronio y la primera vez que alguien partió las 2.300 tardes y mañanas por la mitad',h:`<p><strong>Partir los 2.300 días de Daniel 8:14 en dos mitades (1.150) para que combinen con el "tiempo, tiempos y medio tiempo" del cuerno pequeño de Daniel 7 no es un cálculo moderno: el primer autor conocido en intentarlo fue Policronio, un intérprete sirio del siglo V (374-430 d.C.)</strong> que seguía la lectura de Antíoco Epífanes ya propuesta por Porfirio.</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>Policronio quería hacer encajar el período de tiempo del capítulo 8 con el del capítulo 7, y para lograrlo dividió 2.300 entre dos.</li><li>Jerónimo, que escribió el comentario cristiano más influyente sobre Daniel en esa misma época, no siguió a Porfirio en los capítulos 2, 7 ni 9 — pero sí coincidió con la lectura de Antíoco para los capítulos 8 y 11, y le agregó la idea de que Antíoco era además un símbolo profético de un "anticristo" todavía futuro.</li></ul><div class="highlight-box">La regla de día por año que usa este material para leer los 2.300 años literales no es la única lectura que ha existido en la historia de la iglesia: la lectura literal de "2.300 días" que algunos comentarios modernos repiten tiene su origen documentado en un intérprete del siglo V que ya seguía el marco de Antíoco Epífanes.</div>`},
{ t: '📖 Versículo clave',
      h: '<p data-leer><strong>Daniel 8:14</strong><br>«Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado» ' + vozPar('Escuchar el versículo') + '</p>'},
  ],
  d9: [
    { t: '📚 En pocas palabras',
      h: hi(`Daniel lee a Jeremías, confiesa el pecado y pide misericordia por Jerusalén y su santuario. Gabriel responde con setenta semanas: un período de 490 años que abarca la restauración, el ministerio y la muerte del Mesías, y el testimonio apostólico. La muerte de Cristo ocurre en la mitad de la última semana; no al terminar los 490 años.`) },
    { t: '📜 Setenta años que terminan, setenta semanas que empiezan',
      h: hi(`Daniel 9:1-2 sitúa la escena en el año primero de Darío el Medo, después de la caída de Babilonia, justo cuando Daniel entendía por los libros (Jeremías 25:11-12; 29:10) que los 70 años de desolación de Jerusalén estaban por cumplirse. Esa lectura lo lleva a orar con ayuno, cilicio y ceniza, confesando el pecado de Israel (Daniel 9:3-19). Mientras oraba, Gabriel vino a él «volando con presteza» (v. 21) para contestarle: no con los 70 años de Jeremías, sino con "setenta semanas" (Daniel 9:24), un período distinto y mucho más largo.`) },
    { t: '🔢 Setenta semanas = 490 años',
      h: hi(`«Setenta semanas están determinadas sobre tu pueblo y sobre tu santa ciudad» (Daniel 9:24). Una semana agrupa siete unidades; <strong>Levítico 25:8</strong> ofrece el precedente explícito de semanas de años. Si se entiende que aquí son semanas de años, el cálculo es directo: <strong>70 × 7 años = 490 años</strong>. No se necesita convertir ese resultado otra vez mediante día por año.<br><br>Hay que distinguir ese cómputo de otra forma de explicarlo: <strong>El Deseado de todas las gentes, capítulo 23</strong>, presenta 490 días proféticos que representan 490 años. Shea compara ambas explicaciones y conserva el principio día por año al traducir «semanas» (<i>Simposio sobre Apocalipsis</i>, p. 444). Llegan a la misma duración; no son operaciones que deban acumularse. RV1995 dice «Setenta semanas», sin añadir «de años»: la unidad anual se argumenta, no se inserta en la cita.<br><br>Daniel 8:27 dice que el profeta quedó enfermo y no entendía la visión. La lectura adventista relaciona la explicación de Gabriel en Daniel 9 con ese período pendiente de comprensión: los 490 años son la primera parte de los 2.300. Fuente: Levítico 25:8; DTG, cap. 23; Shea, <i>Simposio sobre Daniel</i>, PDF 249–254; <i>Simposio sobre Apocalipsis</i>, p. 444.`) },
    { t: '🗓️ El decreto de 457 a.C.',
      h: hi(`De los varios decretos persas relacionados con la restauración de Jerusalén, el que realmente le dio autoridad civil y judicial a Esdras para reorganizar la nación judía fue el emitido por <strong>Artajerjes I</strong> en el séptimo año de su reinado (Esdras 7). Ese decreto entró en vigencia hacia el otoño del <strong>año 457 a.C.</strong> Ese es el punto de arranque de las setenta semanas —y, por extensión, de los 2.300 años de Daniel 8:14—.`) },
    { t: '🧮 Las tres divisiones de las setenta semanas',
      h: hi(`Daniel 9:25-27 divide las setenta semanas en tres bloques: <strong>siete semanas</strong> (49 años) para la restauración y reedificación de Jerusalén "en tiempos angustiosos" (del 457 a.C. al 408 a.C.); <strong>sesenta y dos semanas</strong> más (434 años) hasta la llegada de «Mesías Príncipe» (del 408 a.C. al año 27 d.C.); y una <strong>última semana</strong> (7 años, del 27 al 34 d.C.) en la que el Mesías «confirmará el pacto con muchos» y, "a la mitad de la semana", hará "cesar el sacrificio y la ofrenda".`) },
    { t: '✝️ El Mesías Príncipe: el bautismo de Jesús',
      h: hi(`"Mesías" significa "ungido"; en tiempos bíblicos se ungía con aceite a reyes, sacerdotes y profetas para consagrarlos a su función (David, Aarón, Eliseo). Jesús —que era a la vez Rey, Sacerdote y Profeta— fue ungido por Dios, no con aceite sino con el Espíritu Santo, en su bautismo en el río Jordán (Mateo 3:16-17), hacia fines del <strong>año 27 d.C.</strong>, exactamente donde las sesenta y nueve semanas (7+62=69, o sea 483 años desde 457 a.C.) señalaban la llegada del "Mesías Príncipe".`) },
    { t: '⏳ La última semana: 27-34 d.C.',
      h: hi(`«A la mitad de la semana» el Mesías haría cesar el sacrificio y la ofrenda (Daniel 9:27): tres años y medio después de su bautismo (27 d.C.), en la primavera del <strong>año 31 d.C.</strong>, Jesús fue crucificado. Su muerte hizo innecesarios, en el plano simbólico, los sacrificios del santuario terrenal, aunque los ritos continuaran hasta la destrucción del templo. «Se quitará la vida al Mesías» (v. 26): Jesús murió no por sus propios pecados sino por los de la humanidad.`) },
    { t: '🪨 El fin de las setenta semanas: 34 d.C.',
      h: hi(`Los 490 años que comenzaron en el otoño de 457 a.C. terminan en el <strong>año 34 d.C.</strong> DTG, cap. 23, sitúa en ese año el martirio de Esteban que narra Hechos 7; Hechos no expresa el año 34. Ese acontecimiento y la persecución posterior marcan, en esa cronología, el cierre del período especial de responsabilidad de Israel como nación. Poco después, con la conversión del centurión romano Cornelio (Hechos 10) y la predicación de Pablo, el evangelio se extendió abiertamente "a los gentiles" (Hechos 22:21), sin dejar nunca de incluir también a los judíos que aceptaran a Cristo.`) },
    { t: '➗ Restando 490 de 2.300: quedan 1.810 años',
      h: hi(`Puesto que las setenta semanas (490 años) son la primera parte de los 2.300 años de Daniel 8:14, y ambos períodos comparten el mismo punto de partida (457 a.C.), basta restar: 2.300 − 490 = <strong>1.810 años</strong> que quedan después del 34 d.C. Contando esos 1.810 años a partir del 34 d.C. se llega otra vez al <strong>año 1844</strong>, el mismo punto que Daniel 8 señalaba para la purificación del santuario celestial y el inicio del juicio investigador.`) },
    { t: '🔗 Por qué esto responde la pregunta de Daniel 8',
      h: hi(`Daniel no comprendía la visión de las tardes y mañanas (8:26-27). Gabriel, el mismo mensajero, vuelve para darle entendimiento (9:21-23). Shea une cuatro argumentos: la disposición de los períodos, su comienzo en la época persa, la referencia a la visión anterior y el sentido de «determinadas». El término hebreo <i>marʾeh</i> relaciona 9:23 con las tardes y mañanas de 8:26. El verbo <i>ḥātak</i> favorece «cortar», aunque no demuestra por sí solo toda la conexión. Dentro de ese argumento, la orden de 9:25 da el punto de partida; su identificación histórica con Esdras 7 permite fecharlo en 457 a.C.`) + `<p>Fuente: CS, cap. 18; Shea, <i>Simposio sobre Daniel</i>, PDF 251-254.</p>` },
    { t: '🙏 La oración de Daniel 9: un modelo de confesión',
      h: hi(`Antes de recibir la profecía, Daniel dedica una oración extensa a la confesión (9:3-19) que es, en sí mismo, un modelo de confesión bíblica: reconoce el pecado colectivo de su pueblo («hemos pecado, hemos cometido iniquidad», v. 5) sin excusarlo ni atribuirlo solo a otros, recuerda la fidelidad de Dios a pesar de la infidelidad humana, y basa su pedido no en los méritos de Israel sino «en tus muchas misericordias» (v. 18). Es la misma actitud que Daniel mostró toda su vida: un hombre que se identificaba con las faltas de su nación en vez de considerarse mejor que ella, aun siendo él personalmente irreprochable ante el rey (Daniel 6:4).`) },
    { t: '🌅 De la confesión a la certeza',
      h: hi(`Es notable el contraste entre el tono de la oración de Daniel —angustiado, consciente de una deuda que su pueblo no puede pagar— y la respuesta que recibe: no un simple perdón puntual, sino un mapa de 490 años que culmina en el Mesías que "hará cesar el sacrificio y la ofrenda" para siempre. La misma estructura se repite en el resto del libro: cada vez que Daniel busca a Dios con sinceridad (el sueño de la estatua, los leones, esta oración), la respuesta no solo resuelve el problema inmediato sino que revela algo mayor sobre el plan de salvación.`) },
    { t: '📖 Las Escrituras que iluminan la oración', h:
      `<p>Daniel 9:2 dice expresamente que el profeta leía a Jeremías. Su oración tiene además paralelos con las advertencias de Moisés y la oración de Salomón. Esos vínculos ayudan a comprenderla; el relato no dice que tuviera tres cartas abiertas:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>Los consejos de Moisés para los futuros exiliados (Levítico 26).</li><li>La oración de Salomón por los futuros exiliados, pronunciada en la dedicación del mismo templo que ahora estaba en ruinas (1 Reyes 8:46-53).</li><li>La carta de Jeremías a los exiliados en Babilonia (Jeremías 29).</li></ul><p>Los tres coinciden en algo: el exilio es consecuencia del pecado, pero la confesión sincera trae perdón y restauración. Sobre esa base, la oración de Daniel reúne al menos seis elementos:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li>Fervor genuino, con ayuno, saco y ceniza.</li><li>Dependencia de la justicia de Dios, no de la propia.</li><li>Uso deliberado de las Escrituras.</li><li>Confesión de sus propios pecados y los de su pueblo.</li><li>Búsqueda de la gloria de Dios y de su santuario.</li><li>El reclamo del cumplimiento de las promesas de la alianza.</li></ul><div class="highlight-box">Daniel era, según sus propios enemigos, intachable en su conducta (Daniel 6:4). Aun así oró: «hemos pecado, hemos cometido iniquidad» (9:5). No mentía: se identificaba con su pueblo en vez de sentirse superior a él.</div>`},
    { t: '🎭 Las seis metas y su centro: expiación y justicia', verso: 24, h:
      `<p>Shea estudia dos grupos de tres propósitos en Daniel 9:24: los tres primeros hablan de pecado; los tres últimos, de la respuesta que Dios trae. Propone una estructura en espejo, con estas correspondencias:</p>` +
      li(['<b>A y A′:</b> terminar la prevaricación y ungir el santo de santos: desenlace de la situación antigua e inauguración del servicio celestial.',
          '<b>B y B′:</b> sellar el pecado y sellar la visión y al profeta, según la lectura del hebreo que usa el autor. RV1995 traduce la primera expresión «poner fin al pecado» y la última «la profecía».',
          '<b>C y C′:</b> expiar la iniquidad y traer justicia perdurable: acontecimiento y resultado.']) +
      hi('El par central explica el significado de la muerte del Mesías. En el esquema de 9:25-27, Shea coloca esa muerte en el centro; al unir ambos esquemas se ve qué ocurre y qué logra: Cristo muere, hace expiación y pone la justicia duradera al alcance del creyente.') +
      `<p>Fuente: Shea, <i>Simposio sobre Daniel</i>, <i>La unidad de Daniel</i>, PDF 265-268. Se presenta su propuesta de estructura sin alterar las citas de RV1995.</p>` },

    { t: '📖 Versículo clave',
      h: '<p data-leer><strong>Daniel 9:25</strong><br>«Sabe, pues, y entiende que desde la salida de la orden para restaurar y edificar a Jerusalén hasta el Mesías Príncipe, habrá siete semanas y sesenta y dos semanas» ' + vozPar('Escuchar el versículo') + '</p>'},
  ],
  d10: [
    { t: '📚 En pocas palabras',
      h: hi(`Daniel 10 es la introducción a la última gran visión del libro (capítulos 10-12): mientras Daniel ayuna tres semanas junto al río Tigris, angustiado por la oposición a la reconstrucción del templo, se le aparece un Ser glorioso —Jesús mismo— que le revela una guerra invisible entre ángeles de Dios y espíritus malignos por el destino de las naciones.`) },
    { t: '🌊 Cuándo y dónde',
      h: hi(`La escena ocurre en la primavera del año tercero de Ciro el Grande, hacia el 535 a.C., junto al río Tigris. Daniel, que tenía 18 años cuando fue llevado cautivo en 605 a.C., tenía ahora unos 88: se acercaba ya a los noventa. Su motivo de oración: la reconstrucción del templo de Jerusalén, autorizada por Ciro, enfrentaba la fuerte oposición de los pueblos vecinos (Esdras 4). Daniel ayunó "tres semanas" completas (Daniel 10:2-3), del 4 al 24 del primer mes, absteniéndose de alimentos suculentos, carne y vino.`) },
    { t: '✨ El Ser glorioso junto al Tigris',
      h: hi(`El personaje que se le aparece a Daniel —«un varón vestido de lino... Su cuerpo era como de berilo, su rostro parecía un relámpago, sus ojos como antorchas de fuego» (Daniel 10:5-6)— coincide en cada detalle con la descripción que Juan hace de Jesús glorificado en Apocalipsis 1:13-16. El impacto es tan grande que Daniel queda sin fuerzas, «con mi rostro en tierra» (v. 9), como también les ocurrió a Pedro, Santiago y Juan en el monte de la Transfiguración, y al propio Juan en Patmos.`) },
    { t: '🛡️ El príncipe de Persia y la guerra invisible',
      h: hi(`El ángel que finalmente le habla a Daniel explica el motivo de la demora: «el príncipe del reino de Persia se me opuso durante veintiún días» (v. 13) —los mismos 21 días que duró el ayuno de Daniel—. Este "príncipe de Persia" no es el rey Ciro el Grande sino un ángel maligno que se identificaba con el Imperio Persa, tratando de que Ciro anulara su decreto de reconstrucción. Solo cuando <strong>Miguel</strong>, «uno de los principales príncipes», viene en ayuda, la resistencia es vencida y Ciro mantiene su decisión.`) },
    { t: '⚔️ Miguel: el arcángel',
      h: hi(`Judas 9 llama a Miguel "el arcángel" —literalmente "el jefe de los ángeles"—; en las Escrituras solo existe un arcángel, y es Miguel. Su nombre en hebreo es una pregunta: "¿Quién es semejante a Dios?". Según Apocalipsis 12:7, Miguel comandó a los ángeles de Dios en la guerra celestial contra Satanás y sus ángeles.`) },
    { t: '👑 Miguel es Jesús',
      h: hi(`Varias líneas de evidencia identifican a Miguel con Jesucristo, no con un ángel creado: 1 Tesalonicenses 4:16 dice que la voz del arcángel resucita a los muertos, y Juan 5:28-29 dice que es "la voz del Hijo de Dios" la que hace lo mismo; Daniel 12:1 llama a Miguel «el gran príncipe que está de parte de los hijos de tu pueblo», papel que en el resto de la Biblia corresponde a Cristo. La versión Reina-Valera de Daniel 10:13 —«Miguel... vino para ayudarme, y quedé allí con los reyes de Persia»— deja claro que el Ser resplandeciente de esta visión no era Gabriel sino Miguel: es decir, el mismo Jesús que Daniel había visto como "Hijo de hombre" en el capítulo 7.`) },
    { t: '🕊️ Por qué importa saber que Miguel es Jesús',
      h: hi(`Entender esto centra correctamente toda la visión de los capítulos 10 a 12: no gira en torno a un ángel intermedio, un rey humano ni un "anticristo" abstracto, sino en torno a Jesucristo mismo, que aquí aparece glorificado antes de que la profecía recorra la historia hasta el fin de los tiempos. El mismo Jesús que es la piedra de Daniel 2, el Hijo de hombre de Daniel 7 y el Mesías Príncipe de Daniel 9, es Miguel, "vuestro Príncipe" (10:21) y "el gran Príncipe" que defiende a su pueblo (12:1).`) },
    { t: '🙏 Un hombre de oración',
      h: hi(`Daniel 10 corona un patrón que recorre todo el libro: Daniel oró en lugar de quejarse ante el peligro de muerte (cap. 2), dio gracias tres veces al día frente a la amenaza de los leones (cap. 6), confesó el pecado de su pueblo estudiando la profecía de los 70 años (cap. 9), y ahora, ya anciano, ayuna tres semanas por la causa de su pueblo. La respuesta del ángel es contundente: «desde el primer día que dispusiste tu corazón a entender y a humillarte en la presencia de tu Dios, fueron oídas tus palabras» (10:12): la oración de Daniel había sido escuchada de inmediato, aunque la respuesta tardó tres semanas en manifestarse por la resistencia angélica invisible.`) },
    { t: '🌍 Una guerra que también se libra hoy',
      h: hi(`Pablo describe la misma clase de conflicto invisible en Efesios 6:12: "No tenemos lucha contra sangre y carne, sino contra... los espíritus del mal que están en las regiones celestes". Si un ángel maligno pudo resistir por tres semanas la respuesta a la oración de un anciano fiel como Daniel, la lección práctica es doble: primero, que una oración aparentemente sin respuesta inmediata no significa una oración no escuchada; y segundo, que la perseverancia en la oración —"orando en toda ocasión... y velando en ello con toda perseverancia" (Efesios 6:18)— tiene un peso real en un conflicto que no siempre se ve.`) },
    { t: '🕰️ Daniel, anciano y todavía útil',
      h: hi(`Cuando ocurre esta visión Daniel se acercaba a los noventa años: fue llevado cautivo siendo un joven de 18 años, y ahora, unos setenta años después (605-535 a.C.), seguía orando con el mismo fervor de su juventud. El libro no presenta a Daniel como una figura del pasado que ya cumplió su función: su último acto registrado es un ayuno de tres semanas por el bienestar de su pueblo, seguido de la visión más larga y detallada de todo el libro (capítulos 10-12). La vejez, para Daniel, no fue el final de su utilidad espiritual sino la continuación natural de una vida entera de fidelidad.`) },
    { t: '🔥 Dos hombres descalzos: Josué y Moisés frente al mismo Comandante', h:
      `<p>La identificación de Miguel con Jesús no depende de un solo texto: la Biblia ya había mostrado antes al mismo Ser divino presentándose como "ángel" en dos escenas muy conocidas.</p><p>Antes del ataque a Jericó, Josué se encontró con un soldado armado y le preguntó de qué bando era. Le respondió que venía como "Príncipe del ejército de Jehová", y le mandó quitarse el calzado, porque aquel lugar era santo (Josué 5:13-15). Años antes, Moisés había recibido la misma orden junto a la zarza que ardía sin consumirse, de labios de Aquel que se presentó como el Dios de Abraham, de Isaac y de Jacob, y como "Yo soy el que soy" (Éxodo 3:2-6, 14) —y sin embargo el propio relato lo llama, en ese mismo pasaje, "el ángel de Jehová" (Éxodo 3:2).</p><div class="highlight-box">La palabra "ángel" significa simplemente "mensajero". Jesús es, en ese sentido especial, el Mensajero supremo del Padre, según su propia oración antes de la cruz: plenamente Dios y, a la vez, el que trae el mensaje de Dios a la tierra. Eso es lo que hace posible que el mismo Ser sea Jehová en Éxodo 3 y "Miguel, uno de los principales príncipes" en Daniel 10.</p>`},
    { t: '🐴 «Más son los que están con nosotros»: la protección invisible de Eliseo', h:
      `<p>Daniel no fue el único siervo de Dios que enfrentó un cerco invisible mientras oraba. El profeta Eliseo vivía en la ciudad de Dotán cuando un ejército enemigo la rodeó de noche, con la esperanza de capturarlo. Al amanecer, su joven siervo vio los carros y las tropas y exclamó, aterrado: "¡Ay, mi señor! ¿qué vamos a hacer?".</p><p>Eliseo respondió con calma: "No temas, que hay más con nosotros que con ellos", y pidió a Dios que le abriera los ojos al joven. Cuando este miró de nuevo, vio que el monte que rodeaba la ciudad estaba lleno de caballos y carros de fuego alrededor de Eliseo (episodio narrado en 2 Reyes 6).</p><div class="highlight-box">Es la misma clase de ejército invisible que en Daniel 10 se enfrenta al "príncipe de Persia" durante veintiún días. Efesios 6:12 lo resume: nuestra lucha "no es contra sangre y carne, sino contra... los espíritus del mal en las regiones celestes". Los ángeles de Dios superan en número y en poder a cualquier fuerza que se les oponga.</div>`},

    { t: '📖 Versículo clave',
      h: '<p data-leer><strong>Daniel 10:12</strong><br>«Daniel, no temas, porque desde el primer día que dispusiste tu corazón a entender y a humillarte en la presencia de tu Dios, fueron oídas tus palabras» ' + vozPar('Escuchar el versículo') + '</p>'},
  ],
  d11: [
    { t: '📚 En pocas palabras',
      h: hi(`Daniel 11 es la profecía más detallada y con más nombres de reyes de todo el libro: el ángel (el mismo Miguel/Jesús de Daniel 10) le narra a Daniel, verso a verso, la sucesión de imperios desde Persia hasta el fin de los tiempos, pasando por Grecia, los reinos de Egipto y Siria que se disputan Palestina durante siglos, Roma, y finalmente un poder que «se engrandecerá sobre todo dios» antes de llegar a su fin.`) },
    { t: '👑 Los cuatro reyes persas',
      h: hi(`<strong>«Aún habrá tres reyes en Persia, y el cuarto se hará de grandes riquezas, más que todos ellos. Éste, al hacerse fuerte con sus riquezas, levantará a todos contra el reino de Grecia» (Daniel 11:2): son los cuatro reyes que siguieron a Ciro el Grande.</strong><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>Cambises II</strong> (530-522 a.C.) — hijo de Ciro, conquistó Egipto en 525 a.C.</li><li><strong>Bardiya o Gaumata</strong> (522 a.C.) — el impostor que tomó el trono al morir Cambises haciéndose pasar por Esmerdis, hijo de Ciro: el falso Esmerdis. Reinó unos meses, pero ocupó el trono, y por eso entra en la cuenta.</li><li><strong>Darío I el Grande</strong> (522-485 a.C.) — reorganizó el imperio y comenzó las guerras médicas contra Grecia (Maratón, 490 a.C.).</li><li><strong>Jerjes I, o Asuero</strong> (485-465 a.C.) — el <strong>cuarto</strong>: el rey del libro de Ester, el más rico de todos, que levantó a todo su imperio contra Grecia (Salamina, 480 a.C.; Platea, 479 a.C.).</li></ul>Así 11:2 abarca unos setenta años de Persia: desde el tercer año de Ciro (536-535 a.C.) hasta la muerte de Jerjes (465 a.C.). Artajerjes I, su hijo, es el del decreto de 457 a.C. (Esdras 7), pero no está entre estos cuatro.`) },
    { t: '⚔️ El reino de Grecia se divide',
      h: hi(`Alejandro Magno ("un rey valeroso") conquista un vasto imperio y, tras su muerte, «su reino será quebrantado y repartido hacia los cuatro vientos del cielo» (v. 4) —el mismo reparto entre cuatro generales visto en Daniel 8—. Daniel 11 se concentra desde aquí en dos de esos cuatro reinos: <strong>Egipto</strong> (dinastía ptolemaica, "rey del sur") y <strong>Siria</strong> (dinastía seléucida, "rey del norte"), porque Palestina —la tierra gloriosa— queda geográficamente entre ambos y es el terreno de sus guerras.`) },
    { t: '📋 Reyes ptolemaicos y seléucidas',
      h: hi(`<p>Los "reyes del sur" (Egipto, dinastía de Tolomeo) y "reyes del norte" (Siria, dinastía de Seleuco) que Daniel 11 describe, con sus fechas:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>Tolomeo I Sóter</strong> (323-285 a.C.) — sur — y <strong>Seleuco I Nicátor</strong> (312-281 a.C.) — norte.</li><li><strong>Tolomeo II Filadelfo</strong> (285-246) — sur — y <strong>Antíoco I Sóter</strong> (281-261), seguido de <strong>Antíoco II "el Divino"</strong> (261-246) — norte.</li><li><strong>Tolomeo III Evergetes</strong> (246-221) — sur — y <strong>Seleuco II Calínico</strong> — norte.</li><li><strong>Tolomeo IV Filopátor</strong> (221-203) — sur — y <strong>Antíoco III "el Grande"</strong> (223-187) — norte.</li><li><strong>Tolomeo V, VI y VII</strong>, hasta <strong>Cleopatra VII</strong> (51-30 a.C.), la última reina ptolemaica — sur.</li></ul>`) },
    { t: '💍 El matrimonio roto de Antíoco II y Berenice',
      h: hi(`Daniel 11:6 anuncia una alianza matrimonial entre "la hija del rey del sur" (Berenice, hija de Tolomeo II) y el rey del norte (Antíoco II), que se divorció de su primera esposa, Laodicea, para casarse con ella. El pacto fracasó: cuando murió Tolomeo II, Antíoco volvió con Laodicea, quien hizo asesinar a Antíoco, a Berenice y a su hijo pequeño, cumpliendo con precisión la advertencia «ella no podrá retener la fuerza de su brazo, y ni él ni su brazo permanecerán» (v. 6).`) },
    { t: '🗡️ Antíoco III el Grande y el ascenso de Roma',
      h: hi(`Antíoco III el Grande (223-187 a.C.) libra varias campañas contra Egipto (v. 10-15) y finalmente vence en la batalla de Panias (198 a.C.), tomando el control de Palestina. Pero al intentar expandirse hacia Grecia se enfrenta a un nuevo poder: <strong>Roma</strong>, que lo vence en Magnesia (190 a.C.) y lo obliga a replegarse. «El que vendrá contra él hará su propia voluntad, y no habrá quien se le pueda enfrentar» (v. 16). Desde este punto, el "rey del norte" de la profecía deja de ser exclusivamente Siria y pasa a describir a Roma.`) + '<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 64-67.</p>' },
    { t: '🕊️ El príncipe de la alianza y la abominación desoladora',
      h: hi(`El «príncipe del pacto» (v. 22), que es destruido, no es un rey humano como el sumo sacerdote Onías III, sino <strong>Jesucristo</strong>, cuya muerte y ministerio sacerdotal esta profecía sigue anunciando (recuérdese que Jesús mismo, en Mateo 24:15, dijo que "la abominación desoladora" de la que habla Daniel todavía era futura en su tiempo, casi dos siglos después de que Antíoco Epífanes profanara el templo). Cristo muere en tiempos de Roma imperial. Más adelante, ese mismo poder en su fase papal, la unión del poder político y el religioso, oscurece durante siglos su ministerio sacerdotal en el santuario celestial: esa es la "abominación desoladora" del v. 31, que no se agota en el altar pagano que Antíoco levantó en el 168 a.C.`) },
    { t: '🩸 Los doctos perseguidos: 538-1798',
      h: hi(`«Los sabios del pueblo instruirán a muchos; pero durante algunos días caerán a espada y a fuego, en cautividad y despojo» (v. 33): la lectura histórica ve aquí a los valdenses, lolardos, husitas, luteranos, anabaptistas y hugonotes que sufrieron persecución durante la Edad Media y la Reforma, en el mismo período de 1.260 años (538-1798) que señalan Daniel 7:25 y Apocalipsis 12:6, 14.`) },
    { t: '👑 El rey que se engrandece sobre todo dios',
      h: hi(`«El rey hará su voluntad, se ensoberbecerá y se engrandecerá sobre todo dios... honrará en su lugar al dios de las fortalezas... con oro y plata, con piedras preciosas y cosas de gran precio» (vv. 36-38). La lectura histórica identifica aquí al <strong>papado medieval</strong>: no porque algún papa individual pretendiera literalmente ser Dios, sino porque reclamó autoridad para perdonar pecados, condenar a muerte a disidentes y modificar los Diez Mandamientos —prerrogativas que corresponden solo a Dios— y desarrolló un culto opulento en oro, plata y piedras preciosas en torno a símbolos y figuras marianas.`) },
    { t: '🏁 Los versículos finales (40-45): con cautela',
      h: hi(`<strong>Los versículos 40 a 45, verso por verso (de 1798 al regreso de Cristo), en lectura historicista, sin cumplimiento cerrado en cada detalle:</strong><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>v. 40</strong> — "al cabo del tiempo" (1798) el sur ataca al norte con una herida de muerte, pero el norte se recupera y contraataca "con carros y gente de a caballo, y muchas naves": recupera poder político, militar y económico.</li><li><strong>v. 41</strong> — entra a "la tierra gloriosa", pero «escaparán de sus manos Edom, Moab y la mayoría de los hijos de Amón» — el dominio recuperado no llega a ser total.</li><li><strong>v. 42</strong> — "no escapará el país de Egipto": a diferencia de esos tres pueblos, sí queda bajo su control.</li><li><strong>v. 43</strong> — el control llega también a «los tesoros de oro y plata» y a "los de Libia y de Etiopía" — los dos extremos de riqueza y pobreza del mundo antiguo.</li><li><strong>v. 44</strong> — "noticias del oriente y del norte" lo alarman y "saldrá con gran ira para destruir y matar a muchos": una reacción violenta ante un desafío que no esperaba.</li><li><strong>v. 45</strong> — planta sus tiendas «entre los mares y el monte glorioso y santo» pero «llegará a su fin, y no tendrá quien lo ayude»: el desenlace final, sin ayuda posible.</li></ul><p>La estructura verso por verso es clara; los sucesos y fechas exactos se conocerán del todo cuando ocurran. <em>El conflicto de los siglos</em> no cita estos versículos ni usa su lenguaje: cita el siguiente, Daniel 12:1.</p>`) + '<p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 154-191; Maxwell, <i>El porvenir del mundo revelado</i>, p. 298; Bohr, <i>Daniel 11</i>, p. 229.</p>' },
    { t: '🔗 Por qué Daniel 11 repite el mensaje de Daniel 7 y 8',
      h: hi(`Pese a su detalle histórico, el propósito de Daniel 11 no es distinto del de las visiones anteriores: mostrar que un poder político-religioso surgiría entre los imperios de la tierra para oscurecer el ministerio sacerdotal de Cristo y perseguir a su pueblo fiel, y que ese poder llegaría finalmente a su fin sin ayuda ni remedio —igual que el cuerno pequeño de Daniel 7 es «destrozado y entregado para quemarlo en el fuego» en el juicio (Daniel 7:11, 26)—.`) },
    { t: '🏛️ Las guerras sirias y la ruta hacia Roma',
      h: hi(`<strong>Entre 274 y 198 a.C., Egipto y Siria se disputaron Palestina en cinco guerras sucesivas</strong>, la franja de historia que Daniel 11:10-19 sigue casi verso a verso.<ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>274-272 a.C.</strong> — primera guerra siria</li><li><strong>260-252 a.C.</strong> — segunda guerra siria</li><li><strong>246-241 a.C.</strong> — tercera guerra siria</li><li><strong>221-217 a.C.</strong> — cuarta guerra siria, con la <strong>batalla de Rafia</strong> (217 a.C.): la única derrota seléucida del período, con elefantes de guerra en ambos bandos</li><li><strong>201-198 a.C.</strong> — quinta guerra siria, con la <strong>batalla de Panias</strong> (198 a.C.): fin de 103 años de dominio ptolemaico sobre Judea e inicio del dominio seléucida</li></ul>Justo después de Panias entra en escena Roma, el poder que «vendrá contra él» (v. 16).`) },
    { t: '🌀 "Hombres turbulentos" (v. 14): ¿macabeos o romanos?',
      h: hi(`<strong>El verso 14 admite dos lecturas, y ambas siguen de cerca la política del siglo II a.C.</strong> Los "hombres turbulentos" que «se levantarán, para que se cumpla la visión, pero caerán» se identifican tradicionalmente con los hermanos Macabeos, que se rebelaron contra Antíoco IV Epífanes. Pero el hebreo original admite otra lectura, más cercana a "saqueadores" u "opresores" que a "rebeldes": bajo esa lectura, los "hombres turbulentos" son los invasores romanos que fueron tomando control de Judea en ese mismo siglo.`) },
    { t: '⛪ El pacto entre Iglesia y Estado (v. 21-23): de Constantino I a Justiniano I',
      h: hi(`<strong>Los versículos 21 a 23 describen un poder que «tomará el reino con halagos» mediante un pacto con "poca gente" detrás.</strong> La lectura histórica ubica aquí un proceso de más de dos siglos entre el obispo de Roma y el poder imperial:<ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>312</strong> — pacto original entre el emperador Constantino I y el obispo Silvestre I</li><li><strong>fines del siglo IV</strong> — Teodosio I declara al paganismo "delito de Estado"</li><li><strong>siglo V</strong> — acuerdo entre el emperador Valentiniano III y el papa León I</li><li><strong>533-538</strong> — edicto del emperador Justiniano, vigente desde 538, reconoce al papa como cabeza de todas las iglesias: la misma fecha con la que Daniel 7:25 y Apocalipsis 12:6 y 13:5 marcan el inicio de los 1.260 años</li></ul>Siglos después se sumó un documento fraudulento, la "Donación de Constantino", que pretendía falsamente que Constantino le había cedido al obispo de Roma toda autoridad imperial sobre Occidente.`) },
    { t: '🏰 Canossa, 1077: un ejemplo de cómo operaba el poder papal (v. 24-27)',
      h: hi(`<strong>Si Roma papal empieza en el v. 21 (ver la interpretación: hay dos maneras de dividir 11:16-39), Daniel 11:24-27 describe un patrón que se repite durante los 1.260 años: el poder religioso gana terreno sobre el poder político a fuerza de engaños y alianzas rotas</strong> —«sentados a una misma mesa, se mentirán el uno al otro» (v. 27)—. El ejemplo más citado es la "humillación de Canossa" (enero de 1077): el papa Gregorio VII excomulgó y depuso al emperador Enrique IV, quien, abandonado por sus propios príncipes, cruzó los Alpes en pleno invierno y esperó tres días descalzo, en ayuno, a las puertas del castillo hasta que el papa aceptó perdonarlo. Durante siglos, Canossa fue el ejemplo de referencia de lo que una excomunión o "entredicho" papal podía hacerle a cualquier gobernante de Europa, sin importar su poder militar: la misma arma se usó después contra Felipe II Augusto de Francia (1200) y contra Juan Sin Tierra de Inglaterra (1209).`) },
    { t: '👑 La coronación de Carlomagno y el giro de 1798 (v. 28-30)',
      h: hi(`<strong>El verso 29 anuncia un cambio de fondo: «la última venida no será como la primera».</strong> Antes de ese cambio, y si Roma papal empieza en el v. 21, el verso 28 resume siglos de victorias papales sobre el poder civil, simbolizadas en la coronación de Carlomagno como emperador por el papa León III la Navidad del año 800: un acto con el que el papado afirmaba que todo poder político legítimo debía pasar por su autorización. El cambio llegó en 1798, cuando tropas francesas —herederas de una Revolución declaradamente atea— tomaron prisionero al papa Pío VI, hiriendo de muerte, en apariencia, el poder temporal del papado: la misma imagen detrás de la "cabeza herida de muerte" que después "fue sanada". Con eso se cierran, exactamente, los 1.260 años que habían comenzado en 538.`) },
    { t: '🕊️ El "pequeño socorro" (v. 34): doce hechos que aliviaron la persecución',
      h: hi(`<strong>El verso 34 promete que, durante los 1.260 años de persecución (538-1798), el pueblo de Dios recibiría un "pequeño socorro": un respiro parcial, no una liberación completa.</strong> La lectura histórica identifica ese respiro con una serie de hechos que, uno tras otro, fueron distrayendo o debilitando al poder perseguidor:<ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>896-963</strong> — un siglo de papas impuestos por facciones nobiliarias rivales, con intrigas y asesinatos que distrajeron la persecución</li><li><strong>1096-1270</strong> — las Cruzadas, que desviaron la atención de Europa hacia el Cercano Oriente</li><li><strong>1309-1378</strong> — el "cautiverio" de los papas en Avignon, Francia</li><li><strong>1378-1417</strong> — el Gran Cisma de Occidente, con hasta tres papas a la vez</li><li><strong>1455</strong> — la imprenta de tipos móviles de Johannes Gutenberg</li><li><strong>1492</strong> — el descubrimiento de América, futuro refugio de perseguidos religiosos</li><li><strong>1517</strong> — la Reforma protestante</li><li><strong>1776</strong> — la independencia de Estados Unidos</li><li><strong>1789-1798</strong> — la Revolución Francesa, que le da al Papado la "herida de muerte" con la que se cierran los 1.260 años</li></ul>`) },
    { t: '🍞 Tres enigmas de los versos 36-39',
      h: hi(`<strong>Los versos 36 a 39 describen a un poder que "se engrandecerá sobre todo dios" y honrará "en su lugar" a un "dios de las fortalezas".</strong> Tres detalles concretos ayudan a leerlos: primero, "el amor [o el amado] de las mujeres" (v. 37) no es una referencia al celibato sacerdotal, sino —por el contexto de divinidad del pasaje— al Mesías mismo, el Redentor que toda mujer en Israel esperaba dar a luz. Segundo, el "dios de las fortalezas" o "dios ajeno" (vv. 38-39) se identifica más plausiblemente con el Santísimo Sacramento de la Eucaristía: la enseñanza de que el sacerdote repite la encarnación de Cristo en la hostia es, para esta lectura, la sustitución más completa de la obra continua de Cristo en el Santuario celestial. Tercero, "hablará maravillas" (v. 36) encuentra su cumplimiento más citado en el dogma de la infalibilidad papal, declarado el 18 de julio de 1870 y reafirmado por el Concilio Vaticano II en 1964 (documento Lumen Gentium): que el papa, al hablar "ex cátedra" sobre fe y moral, no puede errar.`) },
    { t: '🪨 La Piedra Rosetta y el niño-rey que cumplió el versículo 14', h:
      `<p>Daniel 11:14 anuncia que «se levantarán muchos contra el rey del sur». Ese detalle se cumplió de una manera que hoy se puede comprobar en un museo.</p><p>Tras la derrota egipcia frente a Antíoco III, el nuevo rey de Egipto era <strong>Ptolomeo V Epífanes, un niño de apenas seis años</strong>. Aprovechando la debilidad del trono, los propios egipcios se rebelaron contra sus gobernantes griegos. Para calmar los ánimos, los regentes del niño-rey concedieron una serie de privilegios al pueblo egipcio, y mandaron grabar esas concesiones en piedra, en tres escrituras distintas, para que todos pudieran leerlas.</p><div class="highlight-box">Esa piedra es la <strong>Piedra Rosetta</strong>, hoy en el Museo Británico. Además de confirmar el cumplimiento de Daniel 11:14, se hizo famosa por otra razón: al repetir el mismo texto en jeroglíficos, escritura demótica y griego, permitió siglos más tarde descifrar por primera vez los jeroglíficos egipcios.</div>`},

    { t: '🩹 Los cinco pasos con que el papado sanó su herida (1800-hoy)', h:
      `<p>Después de la caída de 1798 (Daniel 11:40-45), el poder papal se recupera en pasos concretos y documentados, sin necesidad de fijar fechas futuras:</p><ul style="margin:.4rem 0 .2rem 1.1rem;padding:0"><li><strong>1800</strong> — elección de Pío VII, que termina la vacancia del trono papal tras la muerte de Pío VI en el exilio.</li><li><strong>1815</strong> — el Congreso de Viena, que busca restaurar el orden anterior a Napoleón Bonaparte, y en el que reyes protestantes, el zar ortodoxo y el emperador católico firman juntos un compromiso de gobernar según "principios de la santa religión".</li><li><strong>1870</strong> — el Concilio Vaticano I proclama la infalibilidad papal justo cuando pierde sus últimos territorios (los Estados Pontificios), cambiando poder político por autoridad espiritual.</li><li><strong>1929</strong> — los Tratados de Letrán entre Benito Mussolini y el Vaticano restauran el poder temporal del papado sobre un territorio (44 hectáreas: la Ciudad del Vaticano).</li><li><strong>1914-hoy</strong> — el crecimiento de relaciones diplomáticas con el Vaticano: 14 países en 1914, 25 en 1922, 50 en 1958, más de 170 en la actualidad.</li></ul><div class="highlight-box">Ninguno de estos hechos es una fecha profética con significado propio: son la evidencia histórica de que la "herida" del poder papal (1798) ha venido sanando de forma constante y documentable durante más de dos siglos.</div><p>Fuente: Treiyer, <i>Enigmas descifrados</i>, p. 158-160.</p>`},

    { t: '📖 Versículo clave',
      h: '<p data-leer><strong>Daniel 11:45</strong><br>«Plantará las tiendas de su palacio entre los mares y el monte glorioso y santo; pero llegará a su fin, y no tendrá quien lo ayude» ' + vozPar('Escuchar el versículo') + '</p>'},
  ],
  d12: [
    { t: '📚 En pocas palabras',
      h: hi(`Daniel 12 cierra el libro con cuatro partes: los acontecimientos del tiempo del fin (vv. 1-4), preguntas y respuestas sobre cuánto durará (vv. 5-10), dos plazos de días (vv. 11-12), y una promesa personal de despedida para el anciano profeta (v. 13). Es la conclusión directa de la visión que comenzó en Daniel 10:5 y que ocupó todo el capítulo 11.`) },
    { t: '⚔️ Se levanta Miguel',
      h: hi(`«En aquel tiempo se levantará Miguel, el gran príncipe que está de parte de los hijos de tu pueblo» (Daniel 12:1): la escena continúa exactamente donde termina Daniel 11, cuando el perseguidor final de los últimos días está por llegar a su fin. Esta aparición de Miguel —que ya vimos en Daniel 10 que es Jesús mismo— marca que el juicio celestial anunciado en Daniel 7:9-14 y Daniel 8:14 ha concluido: los libros han sido examinados, y Jesús se levanta para venir a la tierra como la piedra sobrenatural de Daniel 2 que destruye la estatua y establece su reino eterno.`) },
    { t: '😰 Un tiempo de angustia sin precedentes',
      h: hi(`«Será tiempo de angustia, cual nunca fue desde que hubo gente hasta entonces» (v. 1). A diferencia de la tribulación anterior descrita en Mateo 24:9 ("os entregarán a la tortura y os matarán"), en la que los santos son entregados a la muerte, en esta tribulación final los santos son librados de la muerte (compárese Apocalipsis 2:10 con Apocalipsis 3:10). «En aquel tiempo será libertado tu pueblo, todos los que se hallen inscritos en el libro» (v. 1).`) },
    { t: '⚰️ La resurrección especial',
      h: hi(`«Muchos de los que duermen en el polvo de la tierra serán despertados: unos para vida eterna, otros para vergüenza y confusión perpetua» (v. 2). Este «muchos» no es la resurrección general de todos los muertos (que ocurre en la segunda venida y, mil años después, para los injustos: Apocalipsis 20): es una <strong>resurrección especial</strong>, limitada, que incluye tanto a algunos justos fallecidos recientemente como a quienes participaron directamente en la crucifixión de Jesús (compárese Mateo 26:64, "veréis al Hijo del hombre venir sobre las nubes del cielo", dicho por Jesús al sumo sacerdote que lo condenó).`) },
    { t: '⭐ Los entendidos resplandecerán como el firmamento',
      h: hi(`«Los entendidos resplandecerán como el resplandor del firmamento; y los que enseñan la justicia a la multitud, como las estrellas, a perpetua eternidad» (v. 3). En el paralelismo poético hebreo de este versículo, los «entendidos» son los mismos que «enseñan la justicia a la multitud»: no una elite intelectual, sino la gente que estudió las profecías de Daniel hasta comprenderlas, las compartió con otros y se dejó purificar por ellas.`) },
    { t: '🔒 Sella el libro hasta el tiempo del fin',
      h: hi(`«Pero tú, Daniel, cierra las palabras y sella el libro hasta el tiempo del fin. Muchos correrán de aquí para allá, y la ciencia aumentará» (v. 4). No todo el libro de Daniel quedaba sellado —la identidad de Babilonia, Media-Persia y Grecia ya estaba clara sin misterio—: lo que permanecía cerrado eran específicamente los acontecimientos relacionados con el tiempo del fin, que solo se comprenderían plenamente más cerca de su cumplimiento. Entonces muchos recorrerían el libro con los ojos, y aumentaría el conocimiento de lo que dice.`) + '<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 20 y 28.</p>' },
    { t: '⏳ Tiempo, tiempos y la mitad de un tiempo',
      h: hi(`Cuando uno de los que están junto al río pregunta «¿Cuándo será el fin de estas maravillas?» (v. 6), el varón vestido de lino (Miguel) responde con un juramento solemne, alzando las dos manos al cielo: «será por tiempo, tiempos y la mitad de un tiempo. Y cuando se acabe la dispersión del poder del pueblo santo, todas estas cosas se cumplirán» (v. 7) —el mismo período de 1.260 años (538-1798) que ya señalaba Daniel 7:25—. Cuando Daniel pregunta «¿cuál será el fin de estas cosas?» (v. 8), primero oye: «Anda, Daniel, pues estas palabras están cerradas y selladas hasta el tiempo del fin» (v. 9): la profecía se da con propósitos prácticos, no para satisfacer la curiosidad.`) },
    { t: '📖 El librito de Apocalipsis 10',
      h: hi(`El mismo Ser de Daniel 12:7 —de pie sobre las aguas, levantando la mano y jurando «por el que vive por los siglos» (12:7)— reaparece en Apocalipsis 10. Pero hay una diferencia clave: las palabras que en Daniel 12 quedan «cerradas y selladas hasta el tiempo del fin» (12:9) aparecen en un librito <strong>abierto</strong> en Apocalipsis 10, y el ángel jura que el tiempo no sería más (Apocalipsis 10:6): el libro de Daniel, sellado para su época, queda por fin abierto para los últimos días.`) },
    { t: '🗓️ 1.290 y 1.335 días',
      h: hi(`«Desde el tiempo en que sea quitado el sacrificio continuo hasta la abominación desoladora, habrá mil doscientos noventa días. Bienaventurado el que espere, y llegue a mil trescientos treinta y cinco días» (vv. 11-12). La palabra «sacrificio» la agregaron los traductores: el hebreo dice solo «el continuo». El texto no nombra el suceso que abre estos dos períodos: hay que buscarlo con cuidado, con el resto del libro. Los dos empiezan juntos en 508, cuando el poder civil se puso por primera vez al servicio del papado: los 1.290 llegan a 1798 y los 1.335 a 1843.`) + '<p>Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 306; Bohr, <i>Daniel 1-10</i>, p. 5.</p>' },
    { t: '💤 Reposarás, y te levantarás',
      h: hi(`El libro termina con una promesa personal para el anciano profeta: «Tú irás hasta el fin, y reposarás, y te levantarás para recibir tu heredad al fin de los días» (v. 13). Daniel moriría, dormiría en la tumba hasta la resurrección, y al levantarse Miguel tendría asegurado su lugar entre los santos en el reino eterno de Dios. La misma promesa vale para todo lector del libro.`) },
    { t: '🌍 Buenas noticias, en seis frases',
      h: '<p>El mensaje final de todo el libro de Daniel cabe en seis buenas noticias:</p>' +
      `<ul class="tight"><li>Dios conoce el pasado, el presente y el futuro; nada lo sorprende.</li>
      <li>Dios dirige el destino de los imperios y de cada persona, y todos serán llevados a juicio.</li>
      <li>La primera fase del juicio final ya está en sesión: Jesús revela ante el universo la identidad de sus seguidores fieles.</li>
      <li>Dios puede librarnos de leones, hornos de fuego y toda dificultad presente, y pronto nos librará de la muerte misma.</li>
      <li>Cristo anhela que su alianza prevalezca, a un costo infinito para sí mismo.</li>
      <li>Dios está tan interesado en nosotros que no concibe la eternidad sin nosotros a su lado.</li></ul><p>Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 309.</p>` },
    { t: '🕯️ «Entendidos» que lo pagaron con la vida: Oswald Glait y Andreas Fischer', h:
      `<p>Daniel 12:3 promete que «los entendidos resplandecerán como el resplandor del firmamento... a perpetua eternidad». Esa promesa tiene nombres.</p><p>Oswald Glait y Andreas Fischer fueron anabautistas del siglo XVI que, al estudiar Daniel 7 y ver que el cuerno pequeño había pensado «en cambiar los tiempos y la Ley» (7:25), llegaron a la convicción de que debían guardar el sábado bíblico en vez del domingo. Lo sostuvieron a pesar de la fuerte oposición de su época, y lo pagaron con la vida.</p><div class="highlight-box">Cuando Miguel se levante (12:1) y los santos resuciten, personas como Glait y Fischer resplandecerán «como las estrellas, a perpetua eternidad»: no por ser eruditos, sino por haber comprendido una verdad de la profecía y haberla obedecido a cualquier precio.</div><p>Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 145 y 309.</p>`},

    { t: '⚡ "Jehová te reprenda": por qué Miguel no maldijo a Satanás', h:
      `<p>En la disputa por el cuerpo de Moisés, el arcángel Miguel no se atrevió a maldecir al diablo, sino que dijo: "El Señor te reprenda" (Judas 9). Algunos ven ahí una limitación de poder. Pero el profeta Zacarías, en una visión, muestra al mismo ángel de Jehová —cuya divinidad el Antiguo Testamento no discute— usando la misma fórmula: que Jehová reprenda a Satanás (Zacarías 3:1-2).</p><p>La diferencia no es de poder, sino de tiempo: cuando Jesús quiso, maldijo con resultado inmediato una higuera sin fruto, que se secó de raíz en cuestión de horas (Marcos 11). Si Miguel hubiera maldecido a Satanás en esa disputa, este habría corrido la misma suerte al instante.</p><div class="highlight-box">Miguel no maldijo a Satanás porque todavía no era el momento: hacía falta darle tiempo al "gran enemigo" para terminar de manifestar su maldad ante el universo, antes del juicio final. La misma fórmula —que Jehová lo reprenda— y el mismo poder para usarla de otro modo cuando corresponde son, juntos, otra prueba de que Miguel es plenamente divino.</div>`},

    { t: '📖 Versículo clave',
      h: '<p data-leer><strong>Daniel 12:3</strong><br>«Los entendidos resplandecerán como el resplandor del firmamento; y los que enseñan la justicia a la multitud, como las estrellas, a perpetua eternidad» ' + vozPar('Escuchar el versículo') + '</p>'},
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
  '<p data-leer><span class="vc-cab"><strong>' + v[0] + '</strong>' +
  vozPar('Escuchar el versículo') + '</span>' +
  '«' + v[1] + '»</p>';

for (const cap of Object.keys(VERS_CLAVE)) {
  const lista = VERS_CLAVE[cap];
  const bloques = [];
  for (let i = 0; i < lista.length; i += 3) bloques.push(lista.slice(i, i + 3));
  bloques.forEach((b, i) => {
    CONTENIDO[cap].push({
      t: '📖 Versículos clave (RV1995)' + (bloques.length > 1 ? ' · ' + (i + 1) : ''),
      /* Un versículo clave es, por definición, lo que el examen pide
         literal — capa núcleo en cualquier capítulo que la use, no solo en
         Daniel 3. */
      capa: 'nucleo',
      h: (i === 0
          ? '<div class="highlight-box"><strong>Estos son los que el examen pide completar.</strong> ' +
            'Palabra por palabra, en la Reina-Valera 1995. Si una palabra cambia, la respuesta no cuenta.' +
            '<br>El botón <strong>Escuchar</strong> lo lee en voz alta: memorizar escuchando rinde distinto que leyendo.</div>'
          : '') + b.map(versHTML).join(''),
    });
  });
}

module.exports = { CAPS, CONTENIDO };
