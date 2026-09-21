/* biblia-otros.js — NO EDITAR A MANO.
   Generado desde files/rv1909-{libro}-{capitulo}.txt (dominio publico).
   Citas a libros distintos de Daniel, para refsTocables() en app.js.
   Ver tools/citas.js para la verificacion byte a byte contra la fuente.

   Cubre los textos clave de las 28 creencias de «En esto creemos» ademas de
   los del material de Daniel. El texto viene de la Biblia Libre (Reina Valera
   Antigua, licencia libre), comprobada contra los archivos que ya existian:
   95 de 107 versiculos identicos, y los 12 restantes difieren solo en
   tipografia. Los versiculos que ya estaban NO se reescribieron. */

const NOMBRES_OTROS = {
 "1corintios": "1 Corintios",
 "1cronicas": "1 Crónicas",
 "1juan": "1 Juan",
 "1pedro": "1 Pedro",
 "1samuel": "1 Samuel",
 "1tesalonicenses": "1 Tesalonicenses",
 "1timoteo": "1 Timoteo",
 "2corintios": "2 Corintios",
 "2cronicas": "2 Crónicas",
 "2pedro": "2 Pedro",
 "2reyes": "2 Reyes",
 "2tesalonicenses": "2 Tesalonicenses",
 "2timoteo": "2 Timoteo",
 "3juan": "3 Juan",
 "apocalipsis": "Apocalipsis",
 "colosenses": "Colosenses",
 "deuteronomio": "Deuteronomio",
 "eclesiastes": "Eclesiastés",
 "efesios": "Efesios",
 "exodo": "Éxodo",
 "ezequiel": "Ezequiel",
 "filipenses": "Filipenses",
 "galatas": "Gálatas",
 "genesis": "Génesis",
 "hageo": "Hageo",
 "hebreos": "Hebreos",
 "hechos": "Hechos",
 "isaias": "Isaías",
 "jeremias": "Jeremías",
 "joel": "Joel",
 "juan": "Juan",
 "judas": "Judas",
 "levitico": "Levítico",
 "lucas": "Lucas",
 "malaquias": "Malaquías",
 "marcos": "Marcos",
 "mateo": "Mateo",
 "numeros": "Números",
 "proverbios": "Proverbios",
 "romanos": "Romanos",
 "salmos": "Salmos",
 "tito": "Tito"
};

const OTRAS_VERS = {
 "1corintios-10": {
  "4": "Y todos bebieron la misma bebida espiritual; porque bebían de la piedra espiritual que los seguía, y la piedra era Cristo.",
  "16": "La copa de bendición que bendecimos, ¿no es la comunión de la sangre de Cristo? El pan que partimos, ¿no es la comunión del cuerpo de Cristo?",
  "17": "Porque un pan, es que muchos somos un cuerpo; pues todos participamos de aquel un pan.",
  "31": "Si pues coméis, ó bebéis, ó hacéis otra cosa, haced lo todo á gloria de Dios."
 },
 "1corintios-11": {
  "23": "Porque yo recibí del Señor lo que también os he enseñado: Que el Señor Jesús, la noche que fué entregado, tomó pan;",
  "24": "Y habiendo dado gracias, lo partió, y dijo: Tomad, comed: esto es mi cuerpo que por vosotros es partido: haced esto en memoria de mí.",
  "25": "Asimismo tomó también la copa, después de haber cenado, diciendo: Esta copa es el nuevo pacto en mi sangre: haced esto todas las veces que bebiereis, en memoria de mí.",
  "26": "Porque todas las veces que comiereis este pan, y bebiereis esta copa, la muerte del Señor anunciáis hasta que venga.",
  "27": "De manera que, cualquiera que comiere este pan ó bebiere esta copa del Señor indignamente, será culpado del cuerpo y de la sangre del Señor.",
  "28": "Por tanto, pruébese cada uno á sí mismo, y coma así de aquel pan, y beba de aquella copa.",
  "29": "Porque el que come y bebe indignamente, juicio come y bebe para sí, no discerniendo el cuerpo del Señor.",
  "30": "Por lo cual hay muchos enfermos y debilitados entre vosotros; y muchos duermen."
 },
 "1corintios-12": {
  "9": "A otro, fe por el mismo Espíritu, y á otro, dones de sanidades por el mismo Espíritu;",
  "10": "A otro, operaciones de milagros, y á otro, profecía; y á otro, discreción de espíritus; y á otro, géneros de lenguas; y á otro, interpretación de lenguas.",
  "11": "Mas todas estas cosas obra uno y el mismo Espíritu, repartiendo particularmente á cada uno como quiere.",
  "12": "Porque de la manera que el cuerpo es uno, y tiene muchos miembros, empero todos los miembros del cuerpo, siendo muchos, son un cuerpo, así también Cristo.",
  "13": "Porque por un Espíritu somos todos bautizados en un cuerpo, ora Judíos ó Griegos, ora siervos ó libres; y todos hemos bebido de un mismo Espíritu.",
  "14": "Pues ni tampoco el cuerpo es un miembro, sino muchos.",
  "27": "Pues vosotros sois el cuerpo de Cristo, y miembros en parte.",
  "28": "Y á unos puso Dios en la iglesia, primeramente apóstoles, luego profetas, lo tercero doctores; luego facultades; luego dones de sanidades, ayudas, gobernaciones, géneros de lenguas."
 },
 "1corintios-15": {
  "3": "Porque primeramente os he enseñado lo que asimismo recibí: Que Cristo fué muerto por nuestros pecados conforme á las Escrituras;",
  "4": "Y que fué sepultado, y que resucitó al tercer día, conforme á las Escrituras;",
  "20": "Mas ahora Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho.",
  "21": "Porque por cuanto la muerte entró por un hombre, también por un hombre la resurrección de los muertos.",
  "22": "Porque así como en Adam todos mueren, así también en Cristo todos serán vivificados.",
  "28": "Mas luego que todas las cosas le fueren sujetas, entonces también el mismo Hijo se sujetará al que le sujetó á él todas las cosas, para que Dios sea todas las cosas en todos.",
  "51": "He aquí, os digo un misterio: Todos ciertamente no dormiremos, mas todos seremos transformados.",
  "52": "En un momento, en un abrir de ojo, á la final trompeta; porque será tocada la trompeta, y los muertos serán levantados sin corrupción, y nosotros seremos transformados.",
  "53": "Porque es menester que esto corruptible sea vestido de incorrupción, y esto mortal sea vestido de inmortalidad.",
  "54": "Y cuando esto corruptible fuere vestido de incorrupción, y esto mortal fuere vestido de inmortalidad, entonces se efectuará la palabra que está escrita: Sorbida es la muerte con victoria."
 },
 "1corintios-4": {
  "9": "Porque á lo que pienso, Dios nos ha mostrado á nosotros los apóstoles por los postreros, como á sentenciados á muerte: porque somos hechos espectáculo al mundo, y á los ángeles, y á los hombres."
 },
 "1corintios-6": {
  "2": "¿O no sabéis que los santos han de juzgar al mundo? Y si el mundo ha de ser juzgado por vosotros, ¿sois indignos de juzgar cosas muy pequeñas?",
  "3": "¿O no sabéis que hemos de juzgar á los angeles? ¿cuánto más las cosas de este siglo?",
  "19": "¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros?",
  "20": "Porque comprados sois por precio: glorificad pues á Dios en vuestro cuerpo y en vuestro espíritu, los cuales son de Dios."
 },
 "1corintios-7": {
  "10": "Mas á los que están juntos en matrimonio, denuncio, no yo, sino el Señor: Que la mujer no se aparte del marido;",
  "11": "Y si se apartare, que se quede sin casar, ó reconcíliese con su marido; y que el marido no despida á su mujer."
 },
 "1corintios-9": {
  "9": "Porque en la ley de Moisés está escrito: No pondrás bozal al buey que trilla. ¿Tiene Dios cuidado de los bueyes?",
  "10": "¿O dícelo enteramente por nosotros? Pues por nosotros está escrito: porque con esperanza ha de arar el que ara; y el que trilla, con esperanza de recibir el fruto.",
  "11": "Si nosotros os sembramos lo espiritual, ¿es gran cosa si segáremos lo vuestro carnal?",
  "12": "Si otros tienen en vosotros esta potestad, ¿no más bien nosotros? Mas no hemos usado de esta potestad: antes lo sufrimos todo, por no poner ningún obstáculo al evangelio de Cristo.",
  "13": "¿No sabéis que los que trabajan en el santuario, comen del santuario; y que los que sirven al altar, del altar participan?",
  "14": "Así también ordenó el Señor á los que anuncian el evangelio, que vivan del evangelio."
 },
 "1cronicas-29": {
  "14": "Porque ¿quién soy yo, y quién es mi pueblo, para que pudiésemos ofrecer de nuestra voluntad cosas semejantes? porque todo es tuyo, y lo recibido de tu mano te damos."
 },
 "1juan-2": {
  "1": "Hijitos míos, estas cosas os escribo, para que no pequéis; y si alguno hubiere pecado, abogado tenemos para con el Padre, á Jesucristo el justo;",
  "2": "Y él es la propiciación por nuestros pecados: y no solamente por los nuestros, sino también por los de todo el mundo.",
  "6": "El que dice que está en él, debe andar como él anduvo."
 },
 "1juan-4": {
  "4": "Hijitos, vosotros sois de Dios, y los habéis vencido; porque el que en vosotros está, es mayor que el que está en el mundo.",
  "8": "El que no ama, no conoce á Dios; porque Dios es amor.",
  "10": "En esto consiste el amor: no que nosotros hayamos amado á Dios, sino que él nos amó á nosotros, y ha enviado á su Hijo en propiciación por nuestros pecados."
 },
 "1juan-5": {
  "3": "Porque este es el amor de Dios, que guardemos sus mandamientos; y sus mandamientos no son penosos.",
  "15": "Y si sabemos que él nos oye en cualquiera cosa que demandáremos, sabemos que tenemos las peticiones que le hubiéremos demandado."
 },
 "1pedro-1": {
  "2": "Elegidos según la presciencia de Dios Padre en santificación del Espíritu, para obedecer y ser rociados con la sangre de Jesucristo: Gracia y paz os sea multiplicada.",
  "16": "Porque escrito está: Sed santos, porque yo soy santo.",
  "17": "Y si invocáis por Padre á aquel que sin acepción de personas juzga según la obra de cada uno, conversad en temor todo el tiempo de vuestra peregrinación:",
  "18": "Sabiendo que habéis sido rescatados de vuestra vana conversación, la cual recibisteis de vuestros padres, no con cosas corruptibles, como oro ó plata;",
  "19": "Sino con la sangre preciosa de Cristo, como de un cordero sin mancha y sin contaminación:"
 },
 "1pedro-2": {
  "21": "Porque para esto sois llamados; pues que también Cristo padeció por nosotros, dejándonos ejemplo, para que vosotros sigáis sus pisadas:",
  "22": "El cual no hizo pecado; ni fué hallado engaño en su boca:"
 },
 "1pedro-3": {
  "1": "Asimismo vosotras, mujeres, sed sujetas á vuestros maridos; para que también los que no creen á la palabra, sean ganados sin palabra por la conversación de sus mujeres,",
  "2": "Considerando vuestra casta conversación, que es en temor.",
  "3": "El adorno de las cuales no sea exterior con encrespamiento del cabello, y atavío de oro, ni en compostura de ropas;",
  "4": "Sino el hombre del corazón que está encubierto, en incorruptible ornato de espíritu agradable y pacífico, lo cual es de grande estima delante de Dios."
 },
 "1pedro-4": {
  "10": "Cada uno según el don que ha recibido, adminístrelo á los otros, como buenos dispensadores de las diferentes gracias de Dios.",
  "11": "Si alguno habla, hable conforme á las palabras de Dios; si alguno ministra, ministre conforme á la virtud que Dios suministra: para que en todas cosas sea Dios glorificado por Jesucristo, al cual es gloria é imperio para siempre jamás. Amén."
 },
 "1samuel-15": {
  "22": "Y Samuel dijo: ¿Tiene Jehová tanto contentamiento con los holocaustos y víctimas, como en obedecer á las palabras de Jehová? Ciertamente el obedecer es mejor que los sacrificios; y el prestar atención que el sebo de los carneros:"
 },
 "1samuel-2": {
  "30": "Por tanto, Jehová el Dios de Israel dice: Yo había dicho que tu casa y la casa de tu padre andarían delante de mí perpetuamente; mas ahora ha dicho Jehová: Nunca yo tal haga, porque yo honraré á los que me honran, y los que me tuvieren en poco, serán viles."
 },
 "1samuel-25": {
  "25": "No ponga ahora mi señor su corazón á aquel hombre brusco, á Nabal; porque conforme á su nombre, así es. El se llama Nabal, y la locura está con él: mas yo tu sierva no vi los criados de mi señor, los cuales tú enviaste."
 },
 "1tesalonicenses-2": {
  "13": "Por lo cual, también nosotros damos gracias á Dios sin cesar, de que habiendo recibido la palabra de Dios que oísteis de nosotros, recibisteis no palabra de hombres, sino según es en verdad, la palabra de Dios, el cual obra en vosotros los que creísteis."
 },
 "1tesalonicenses-4": {
  "13": "Tampoco, hermanos, queremos que ignoréis acerca de los que duermen, que no os entristezcáis como los otros que no tienen esperanza.",
  "14": "Porque si creemos que Jesús murió y resucitó, así también traerá Dios con él á los que durmieron en Jesús.",
  "15": "Por lo cual, os decimos esto en palabra del Señor: que nosotros que vivimos, que habremos quedado hasta la venida del Señor, no seremos delanteros á los que durmieron.",
  "16": "Porque el mismo Señor con aclamación, con voz de arcángel, y con trompeta de Dios, descenderá del cielo; y los muertos en Cristo resucitarán primero:",
  "17": "Luego nosotros, los que vivimos, los que quedamos, juntamente con ellos seremos arrebatados en las nubes á recibir al Señor en el aire, y así estaremos siempre con el Señor.",
  "18": "Por tanto, consolaos los unos á los otros en estas palabras."
 },
 "1tesalonicenses-5": {
  "1": "Empero acerca de los tiempos y de los momentos, no tenéis, hermanos, necesidad de que yo os escriba:",
  "2": "Porque vosotros sabéis bien, que el día del Señor vendrá así como ladrón de noche,",
  "3": "Que cuando dirán, Paz y seguridad, entonces vendrá sobre ellos destrucción de repente, como los dolores á la mujer preñada; y no escaparán.",
  "4": "Mas vosotros, hermanos, no estáis en tinieblas, para que aquel día os sobrecoja como ladrón;",
  "5": "Porque todos vosotros sois hijos de luz, é hijos del día; no somos de la noche, ni de las tinieblas.",
  "6": "Por tanto, no durmamos como los demás; antes velemos y seamos sobrios.",
  "16": "Estad siempre gozosos.",
  "17": "Orad sin cesar.",
  "18": "Dad gracias en todo; porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.",
  "23": "Y el Dios de paz os santifique en todo; para que vuestro espíritu y alma y cuerpo sea guardado entero sin reprensión para la venida de nuestro Señor Jesucristo."
 },
 "1timoteo-1": {
  "17": "Por tanto, al Rey de siglos, inmortal, invisible, al solo sabio Dios sea honor y gloria por los siglos de los siglos. Amén."
 },
 "1timoteo-2": {
  "4": "El cual quiere que todos los hombres sean salvos, y que vengan al conocimiento de la verdad."
 },
 "1timoteo-3": {
  "1": "Palabra fiel: Si alguno apetece obispado, buena obra desea.",
  "2": "Conviene, pues, que el obispo sea irreprensible, marido de una mujer, solícito, templado, compuesto, hospedador, apto para enseñar;",
  "3": "No amador del vino, no heridor, no codicioso de torpes ganancias, sino moderado, no litigioso, ajeno de avaricia;",
  "4": "Que gobierne bien su casa, que tenga sus hijos en sujeción con toda honestidad;",
  "5": "(Porque el que no sabe gobernar su casa, ¿cómo cuidará de la iglesia de Dios?)",
  "6": "No un neófito, porque inflándose no caiga en juicio del diablo.",
  "7": "También conviene que tenga buen testimonio de los extraños, porque no caiga en afrenta y en lazo del diablo.",
  "8": "Los diáconos asimismo, deben ser honestos, no bilingües, no dados á mucho vino, no amadores de torpes ganancias;",
  "9": "Que tengan el misterio de la fe con limpia conciencia.",
  "10": "Y éstos también sean antes probados; y así ministren, si fueren sin crimen.",
  "11": "Las mujeres asimismo, honestas, no detractoras, templadas, fieles en todo.",
  "12": "Los diáconos sean maridos de una mujer, que gobiernen bien sus hijos y sus casas.",
  "13": "Porque los que bien ministraren, ganan para sí buen grado, y mucha confianza en la fe que es en Cristo Jesús."
 },
 "1timoteo-6": {
  "15": "La cual á su tiempo mostrará el Bienaventurado y solo Poderoso, Rey de reyes, y Señor de señores;",
  "16": "Quien sólo tiene inmortalidad, que habita en luz inaccesible; á quien ninguno de los hombres ha visto ni puede ver: al cual sea la honra y el imperio sempiterno. Amén."
 },
 "2corintios-10": {
  "4": "(Porque las armas de nuestra milicia no son carnales, sino poderosas en Dios para la destrucción de fortalezas;)",
  "5": "Destruyendo consejos, y toda altura que se levanta contra la ciencia de Dios, y cautivando todo intento á la obediencia, de Cristo;"
 },
 "2corintios-13": {
  "14": "La gracia del Señor Jesucristo, y el amor de Dios, y la participación del Espíritu Santo sea con vosotros todos. Amén. Epístola á los Corintios fué enviada de Filipos de Macedonia con Tito y Lucas."
 },
 "2corintios-3": {
  "17": "Porque el Señor es el Espíritu; y donde hay el Espíritu del Señor, allí hay libertad.",
  "18": "Por tanto, nosotros todos, mirando á cara descubierta como en un espejo la gloria del Señor, somos transformados de gloria en gloria en la misma semejanza, como por el Espíritu del Señor."
 },
 "2corintios-5": {
  "10": "Porque es menester que todos nosotros parezcamos ante el tribunal de Cristo, para que cada uno reciba según lo que hubiere hecho por medio del cuerpo, ora sea bueno ó malo.",
  "14": "Porque el amor de Cristo nos constriñe, pensando esto: Que si uno murió por todos, luego todos son muertos;",
  "15": "Y por todos murió, para que los que viven, ya no vivan para sí, mas para aquel que murió y resucitó por ellos.",
  "16": "De manera que nosotros de aquí adelante á nadie conocemos según la carne: y aun si á Cristo conocimos según la carne, empero ahora ya no le conocemos.",
  "17": "De modo que si alguno está en Cristo, nueva criatura es: las cosas viejas pasaron; he aquí todas son hechas nuevas.",
  "18": "Y todo esto es de Dios, el cual nos reconcilió á sí por Cristo; y nos dió el ministerio de la reconciliación.",
  "19": "Porque ciertamente Dios estaba en Cristo reconciliando el mundo á sí, no imputándole sus pecados, y puso en nosotros la palabra de la reconciliación.",
  "20": "Así que, somos embajadores en nombre de Cristo, como si Dios rogase por medio nuestro; os rogamos en nombre de Cristo: Reconciliaos con Dios.",
  "21": "Al que no conoció pecado, hizo pecado por nosotros, para que nosotros fuésemos hechos justicia de Dios en él."
 },
 "2corintios-6": {
  "14": "No os juntéis en yugo con los infieles: porque ¿qué compañía tienes la justicia con la injusticia? ¿y qué comunión la luz con las tinieblas?",
  "15": "¿Y qué concordia Cristo con Belial? ¿ó qué parte el fiel con el infiel?",
  "16": "¿Y qué concierto el templo de Dios con los ídolos? porque vosotros sois el templo del Dios viviente, como Dios dijo: Habitaré y andaré en ellos; y seré el Dios de ellos, y ellos serán mi pueblo.",
  "17": "Por lo cual Salid de en medio de ellos, y apartaos, dice el Señor, Y no toquéis lo inmundo; Y yo os recibiré,",
  "18": "Y seré á vosotros Padre, Y vosotros me seréis á mí hijos é hijas, dice el Señor Todopoderoso."
 },
 "2corintios-7": {
  "1": "Asi que, amados, pues tenemos tales promesas, limpiémonos de toda inmundicia de carne y de espíritu, perfeccionando la santificación en temor de Dios."
 },
 "2corintios-8": {
  "1": "ASIMISMO, hermanos, os hacemos saber la gracia de Dios que ha sido dada á las iglesias de Macedonia:",
  "2": "Que en grande prueba de tribulación, la abundancia de su gozo y su profunda pobreza abundaron en riquezas de su bondad.",
  "3": "Pues de su grado han dado conforme á sus fuerzas, yo testifico, y aun sobre sus fuerzas;",
  "4": "Pidiéndonos con muchos ruegos, que aceptásemos la gracia y la comunicación del servicio para los santos.",
  "5": "Y no como lo esperábamos, mas aun á sí mismos se dieron primeramente al Señor, y á nosotros por la voluntad de Dios.",
  "6": "De manera que exhortamos á Tito, que como comenzó antes, así también acabe esta gracia entre vosotros también.",
  "7": "Por tanto, como en todo abundáis, en fe, y en palabra, y en ciencia, y en toda solicitud, y en vuestro amor para con nosotros, que también abundéis en esta gracia.",
  "8": "No hablo como quien manda, sino para poner á prueba, por la eficacia de otros, la sinceridad también de la caridad vuestra.",
  "9": "Porque ya sabéis la gracia de nuestro Señor Jesucristo, que por amor de vosotros se hizo pobre, siendo rico; para que vosotros con su pobreza fueseis enriquecidos.",
  "10": "Y en esto doy mi consejo; porque esto os conviene á vosotros, que comenzasteis antes, no sólo á hacerlo, mas aun á quererlo desde el año pasado.",
  "11": "Ahora pues, llevad también á cabo el hecho, para que como estuvisteis prontos á querer, así también lo estéis en cumplir conforme á lo que tenéis.",
  "12": "Porque si primero hay la voluntad pronta, será acepta por lo que tiene, no por lo que no tiene.",
  "13": "Porque no digo esto para que haya para otros desahogo, y para vosotros apretura;",
  "14": "Sino para que en este tiempo, con igualdad, vuestra abundancia supla la falta de ellos, para que también la abundancia de ellos supla vuestra falta, porque haya igualdad;",
  "15": "Como está escrito: El que recogió mucho, no tuvo más; y el que poco, no tuvo menos."
 },
 "2cronicas-36": {
  "1": "Entonces el pueblo de la tierra tomó á Joachâz hijo de Josías, é hiciéronle rey en lugar de su padre en Jerusalem.",
  "2": "De veinte y tres años era Joachâz cuando comenzó á reinar, y tres meses reinó en Jerusalem.",
  "3": "Y el rey de Egipto lo quitó de Jerusalem, y condenó la tierra en cien talentos de plata y uno de oro.",
  "4": "Y constituyó el rey de Egipto á su hermano Eliacim por rey sobre Judá y Jerusalem, y mudóle el nombre en Joacim; y á Joachâz su hermano tomó Nechâo, y llevólo á Egipto.",
  "5": "Cuando comenzó á reinar Joacim era de veinte y cinco años, y reinó once años en Jerusalem: é hizo lo malo en ojos de Jehová su Dios.",
  "6": "Y subió contra él Nabucodonosor rey de Babilonia, y atado con cadenas lo llevó á Babilonia.",
  "7": "También llevó Nabucodonosor á Babilonia de los vasos de la casa de Jehová, y púsolos en su templo en Babilonia.",
  "8": "Lo demás de los hechos de Joacim, y las abominaciones que hizo, y lo que en él se halló, he aquí está escrito en el libro de los reyes de Israel y de Judá: y reinó en su lugar Joachîn su hijo.",
  "9": "De ocho años era Joachîn cuando comenzó á reinar, y reinó tres meses y diez días en Jerusalem: é hizo lo malo en ojos de Jehová.",
  "10": "A la vuelta del año el rey Nabucodonosor envió, é hízolo llevar á Babilonia juntamente con los vasos preciosos de la casa de Jehová; y constituyó á Sedecías su hermano por rey sobre Judá y Jerusalem.",
  "11": "De veinte y un años era Sedecías cuando comenzó á reinar, y once años reinó en Jerusalem.",
  "12": "E hizo lo malo en ojos de Jehová su Dios, y no se humilló delante de Jeremías profeta, que le hablaba de parte de Jehová.",
  "13": "Rebelóse asimismo contra Nabucodonosor, al cual había jurado por Dios; y endureció su cerviz, y obstinó su corazón, para no volverse á Jehová el Dios de Israel.",
  "14": "Y también todos los príncipes de los sacerdotes, y el pueblo, aumentaron la prevaricación, siguiendo todas las abominaciones de las gentes, y contaminando la casa de Jehová, la cual él había santificado en Jerusalem.",
  "15": "Y Jehová el Dios de sus padres envió á ellos por mano de sus mensajeros, levantándose de mañana y enviando: porque él tenía misericordia de su pueblo, y de su habitación.",
  "16": "Mas ellos hacían escarnio de los mensajeros de Dios, y menospreciaban sus palabras, burlándose de sus profetas, hasta que subió el furor de Jehová contra su pueblo, y que no hubo remedio.",
  "17": "Por lo cual trajo contra ellos al rey de los Caldeos, que mató á cuchillo sus mancebos en la casa de su santuario, sin perdonar joven, ni doncella, ni viejo, ni decrépito; todos los entregó en sus manos.",
  "18": "Asimismo todos los vasos de la casa de Dios, grandes y chicos, los tesoros de la casa de Jehová, y los tesoros del rey y de sus príncipes, todo lo llevó á Babilonia.",
  "19": "Y quemaron la casa de Dios, y rompieron el muro de Jerusalem, y consumieron al fuego todos sus palacios, y destruyeron todos sus vasos deseables.",
  "20": "Los que quedaron del cuchillo, pasáronlos á Babilonia; y fueron siervos de él y de sus hijos, hasta que vino el reino de los Persas.",
  "21": "Para que se cumpliese la palabra de Jehová por la boca de Jeremías, hasta que la tierra hubo gozado sus sábados: porque todo el tiempo de su asolamiento reposó, hasta que los setenta años fueron cumplidos.",
  "22": "Mas al primer año de Ciro rey de los Persas, para que se cumpliese la palabra de Jehová por boca de Jeremías, Jehová excitó el espíritu de Ciro rey de los Persas, el cual hizo pasar pregón por todo su reino, y también por escrito, diciendo:",
  "23": "Así dice Ciro rey de los Persas: Jehová, el Dios de los cielos, me ha dado todos los reinos de la tierra; y él me ha encargado que le edifique casa en Jerusalem, que es en Judá. ¿Quién de vosotros hay de todo su pueblo? Jehová su Dios sea con él, y suba."
 },
 "2pedro-1": {
  "20": "Entendiendo primero esto, que ninguna profecía de la Escritura es de particular interpretación;",
  "21": "Porque la profecía no fué en los tiempos pasados traída por voluntad humana, sino los santos hombres de Dios hablaron siendo inspirados del Espíritu Santo."
 },
 "2pedro-2": {
  "9": "Sabe el Señor librar de tentación á los píos, y reservar á los injustos para ser atormentados en el día del juicio;"
 },
 "2pedro-3": {
  "6": "Por lo cual el mundo de entonces pereció anegado en agua:",
  "10": "Mas el día del Señor vendrá como ladrón en la noche; en el cual los cielos pasarán con grande estruendo, y los elementos ardiendo serán deshechos, y la tierra y las obras que en ella están serán quemadas.",
  "11": "Pues como todas estas cosas han de ser deshechas, ¿qué tales conviene que vosotros seáis en santas y pías conversaciones,",
  "12": "Esperando y apresurándoos para la venida del día de Dios, en el cual los cielos siendo encendidos serán deshechos, y los elementos siendo abrasados, se fundirán?",
  "13": "Bien que esperamos cielos nuevos y tierra nueva, según sus promesas, en los cuales mora la justicia.",
  "14": "Por lo cual, oh amados, estando en esperanza de estas cosas, procurad con diligencia que seáis hallados de él sin mácula, y sin reprensión, en paz.",
  "18": "Mas creced en la gracia y conocimiento de nuestro Señor y Salvador Jesucristo. A él sea gloria ahora y hasta el día de la eternidad. Amén."
 },
 "2reyes-24": {
  "1": "En su tiempo subió Nabucodonosor rey de Babilonia, al cual sirvió Joacim tres años; volvióse luego, y se rebeló contra él.",
  "2": "Jehová empero envió contra él tropas de Caldeos, y tropas de Siros, y tropas de Moabitas, y tropas de Ammonitas; los cuales envió contra Judá para que la destruyesen, conforme á la palabra de Jehová que había hablado por sus siervos los profetas.",
  "3": "Ciertamente vino esto contra Judá por dicho de Jehová, para quitarla de su presencia, por los pecados de Manasés, conforme á todo lo que hizo;",
  "4": "Asimismo por la sangre inocente que derramó, pues hinchió á Jerusalem de sangre inocente: Jehová por tanto, no quiso perdonar.",
  "5": "Lo demás de los hechos de Joacim, y todas las cosas que hizo, ¿no está escrito en el libro de las crónicas de los reyes de Judá?",
  "6": "Y durmió Joacim con sus padres, y reinó en su lugar Joachîn su hijo.",
  "7": "Y nunca más el rey de Egipto salió de su tierra: porque el rey de Babilonia le tomó todo lo que era suyo, desde el río de Egipto hasta el río de Eufrates.",
  "8": "De dieciocho años era Joachîn cuando comenzó á reinar, y reinó en Jerusalem tres meses. El nombre de su madre fué Neusta hija de Elnathán, de Jerusalem.",
  "9": "E hizo lo malo en ojos de Jehová, conforme á todas las cosas que había hecho su padre.",
  "10": "En aquel tiempo subieron los siervos de Nabucodonosor rey de Babilonia contra Jerusalem y la ciudad fué cercada.",
  "11": "Vino también Nabucodonosor rey de Babilonia contra la ciudad, cuando sus siervos la tenían cercada.",
  "12": "Entonces salió Joachîn rey de Judá al rey de Babilonia, él, y su madre, y sus siervos, y sus príncipes, y sus eunucos: y prendiólo el rey de Babilonia en el octavo año de su reinado.",
  "13": "Y sacó de allí todos los tesoros de la casa de Jehová, y los tesoros de la casa real, y quebró en piezas todos los vasos de oro que había hecho Salomón rey de Israel en la casa de Jehová, como Jehová había dicho.",
  "14": "Y llevó en cautiverio á toda Jerusalem, á todos los príncipes, y á todos los hombres valientes, hasta diez mil cautivos, y á todos los oficiales y herreros; que no quedó nadie, excepto los pobres del pueblo de la tierra.",
  "15": "Asimismo trasportó á Joachîn á Babilonia, y á la madre del rey, y á las mujeres del rey, y á sus eunucos, y á los poderosos de la tierra; cautivos los llevó de Jerusalem á Babilonia.",
  "16": "A todos los hombre de guerra, que fueron siete mil, y á los oficiales y herreros, que fueron mil, y á todos los valientes para hacer la guerra, llevó cautivos el rey de Babilonia.",
  "17": "Y el rey de Babilonia puso por rey en lugar de Joachîn á Mathanías su tío, y mudóle el nombre en el de Sedecías.",
  "18": "De veintiún años era Sedecías cuando comenzó á reinar, y reinó en Jerusalem once años. El nombre de su madre fué Amutal hija de Jeremías, de Libna.",
  "19": "E hizo lo malo en ojos de Jehová, conforme á todo lo que había hecho Joacim.",
  "20": "Fué pues la ira de Jehová contra Jerusalem y Judá, hasta que los echó de su presencia. Y Sedecías se rebeló contra el rey de Babilonia."
 },
 "2reyes-25": {
  "1": "Y aconteció á los nueve años de su reinado, en el mes décimo, á los diez del mes, que Nabucodonosor rey de Babilonia vino con todo su ejército contra Jerusalem, y cercóla; y levantaron contra ella ingenios alrededor.",
  "2": "Y estuvo la ciudad cercada hasta el undécimo año del rey Sedecías.",
  "3": "A los nueve del mes prevaleció el hambre en la ciudad, que no hubo pan para el pueblo de la tierra.",
  "4": "Abierta ya la ciudad, huyeron de noche todos los hombres de guerra por el camino de la puerta que estaba entre los dos muros, junto á los huertos del rey, estando los Caldeos alrededor de la ciudad; y el rey se fué camino de la campiña.",
  "5": "Y el ejército de los Caldeos siguió al rey, y tomólo en las llanuras de Jericó, habiéndose esparcido de él todo su ejército.",
  "6": "Tomado pues el rey, trajéronle al rey de Babilonia á Ribla, y profirieron contra él sentencia.",
  "7": "Y degollaron á los hijos de Sedecías en presencia suya; y á Sedecías sacaron los ojos, y atado con cadenas lleváronlo á Babilonia.",
  "8": "En el mes quinto, á los siete del mes, siendo el año diecinueve de Nabucodonosor rey de Babilonia, vino á Jerusalem Nabuzaradán, capitán de los de la guardia, siervo del rey de Babilonia.",
  "9": "Y quemó la casa de Jehová, y la casa del rey, y todas las casas de Jerusalem; y todas las casas de los príncipes quemó á fuego.",
  "10": "Y todo el ejército de los Caldeos que estaba con el capitán de la guardia, derribó los muros de Jerusalem alrededor.",
  "11": "Y á los del pueblo que habían quedado en la ciudad, y á los que se habían juntado al rey de Babilonia, y á los que habían quedado del vulgo, trasportólos Nabuzaradán, capitán de los de la guardia.",
  "12": "Mas de los pobres de la tierra dejó Nabuzaradán, capitán de los de la guardia, para que labrasen las viñas y las tierras.",
  "13": "Y quebraron los Caldeos las columnas de bronce que estaban en la casa de Jehová, y las basas, y el mar de bronce que estaba en la casa de Jehová, y llevaron el metal de ello á Babilonia.",
  "14": "Lleváronse también los calderos, y las paletas, y las tenazas, y los cucharones, y todos los vasos de metal con que ministraban.",
  "15": "Incensarios, cuencos, los que de oro, en oro, y los que de plata, en plata, todo lo llevó el capitán de los de la guardia.",
  "16": "Las dos columnas, un mar, y las basas que Salomón había hecho para la casa de Jehová: no había peso de todos estos vasos.",
  "17": "La altura de la una columna era diez y ocho codos y tenía encima un capitel de bronce, y la altura del capitel era de tres codos; y sobre el capitel había un enredado y granadas alrededor, todo de bronce: y semejante obra había en la otra columna con el enredado.",
  "18": "Tomó entonces el capitán de los de la guardia á Saraías primer sacerdote, y á Sophonías segundo sacerdote, y tres guardas de la vajilla.",
  "19": "Y de la ciudad tomó un eunuco, el cual era maestre de campo, y cinco varones de los continuos del rey, que se hallaron en la ciudad; y al principal escriba del ejército, que hacía la reseña de la gente del país; y sesenta varones del pueblo de la tierra, que se hallaron en la ciudad.",
  "20": "Estos tomó Nabuzaradán, capitán de los de la guardia, y llevólos á Ribla al rey de Babilonia.",
  "21": "Y el rey de Babilonia los hirió y mató en Ribla, en tierra de Hamath. Así fué trasportado Judá de sobre su tierra.",
  "22": "Y al pueblo que Nabucodonosor rey de Babilonia dejó en tierra de Judá, puso por gobernador á Gedalías, hijo de Ahicam hijo de Saphán.",
  "23": "Y oyendo todos los príncipes del ejército, ellos y su gente, que el rey de Babilonia había puesto por gobernador á Gedalías, viniéronse á él en Mizpa, es á saber, Ismael hijo de Nathanías, y Johanán hijo de Carea, y Saraía hijo de Tanhumet Netofatita, y Jaazanías hijo de Maachâti, ellos con los suyos.",
  "24": "Entonces Gedalías les hizo juramento, á ellos y á los suyos, y díjoles: No temáis de ser siervos de los Caldeos; habitad en la tierra, y servid al rey de Babilonia, y os irá bien.",
  "25": "Mas en el mes séptimo vino Ismael hijo de Nathanías, hijo de Elisama, de la estirpe real, y con él diez varones, é hirieron á Gedalías, y murió: y también á los Judíos y Caldeos que estaban con él en Mizpa.",
  "26": "Y levantándose todo el pueblo, desde el menor hasta el mayor, con los capitanes del ejército, fuéronse á Egipto por temor de los Caldeos.",
  "27": "Y aconteció á los treinta y siete años de la trasportación de Joachîn rey de Judá, en el mes duodécimo, á los veinte y siete del mes, que Evil-merodach rey de Babilonia, en el primer año de su reinado, levantó la cabeza de Joachîn rey de Judá, sacándolo de la casa de la cárcel.",
  "28": "Y hablóle bien, y puso su asiento sobre el asiento de los reyes que con él estaban en Babilonia.",
  "29": "Y mudóle los vestidos de su prisión, y comió siempre delante de él todos los días de su vida.",
  "30": "Y fuéle diariamente dada su comida de parte del rey de continuo, todos los días de su vida."
 },
 "2tesalonicenses-1": {
  "7": "Y á vosotros, que sois atribulados, dar reposo con nosotros, cuando se manifestará el Señor Jesús del cielo con los ángeles de su potencia,",
  "8": "En llama de fuego, para dar el pago á los que no conocieron á Dios, ni obedecen al evangelio de nuestro Señor Jesucristo;",
  "9": "Los cuales serán castigados de eterna perdición por la presencia del Señor, y por la gloria de su potencia,",
  "10": "Cuando viniere para ser glorificado en sus santos, y á hacerse admirable en aquel día en todos los que creyeron: (por cuanto nuestro testimonio ha sido creído entre vosotros.)"
 },
 "2tesalonicenses-2": {
  "8": "Y entonces será manifestado aquel inicuo, al cual el Señor matará con el espíritu de su boca, y destruirá con el resplandor de su venida;"
 },
 "2timoteo-2": {
  "21": "Así que, si alguno se limpiare de estas cosas, será vaso para honra, santificado, y útil para los usos del Señor, y aparejado para todo buena obra."
 },
 "2timoteo-3": {
  "1": "Esto también sepas, que en los postreros días vendrán tiempos peligrosos:",
  "2": "Que habrá hombres amadores de sí mismos, avaros, vanagloriosos, soberbios, detractores, desobedientes á los padres, ingratos, sin santidad,",
  "3": "Sin afecto, desleales, calumniadores, destemplados, crueles, aborrecedores de lo bueno,",
  "4": "Traidores, arrebatados, hinchados, amadores de los deleites más que de Dios;",
  "5": "Teniendo apariencia de piedad, mas habiendo negado la eficacia de ella: y á éstos evita.",
  "16": "Toda Escritura es inspirada divinamente y útil para enseñar, para redargüir, para corregir, para instituir en justicia,",
  "17": "Para que el hombre de Dios sea perfecto, enteramente instruído para toda buena obra."
 },
 "2timoteo-4": {
  "2": "Que prediques la palabra; que instes á tiempo y fuera de tiempo; redarguye, reprende; exhorta con toda paciencia y doctrina."
 },
 "3juan-1": {
  "2": "Amado, yo deseo que tú seas prosperado en todas cosas, y que tengas salud, así como tu alma está en prosperidad."
 },
 "apocalipsis-1": {
  "7": "He aquí que viene con las nubes, y todo ojo le verá, y los que le traspasaron; y todos los linajes de la tierra se lamentarán sobre él. Así sea. Amén.",
  "13": "Y en medio de los siete candeleros, uno semejante al Hijo del hombre, vestido de una ropa que llegaba hasta los pies, y ceñido por los pechos con una cinta de oro.",
  "14": "Y su cabeza y sus cabellos eran blancos como la lana blanca, como la nieve; y sus ojos como llama de fuego;",
  "15": "Y sus pies semejantes al latón fino, ardientes como en un horno; y su voz como ruido de muchas aguas.",
  "16": "Y tenía en su diestra siete estrellas: y de su boca salía una espada aguda de dos filos. Y su rostro era como el sol cuando resplandece en su fuerza."
 },
 "apocalipsis-10": {
  "6": "Y juró por el que vive para siempre jamás, que ha criado el cielo y las cosas que están en él, y la tierra y las cosas que están en ella, y el mar y las cosas que están en él, que el tiempo no será más."
 },
 "apocalipsis-11": {
  "5": "Y si alguno les quisiere dañar, sale fuego de la boca de ellos, y devora á sus enemigos: y si alguno les quisiere hacer daño, es necesario que él sea así muerto."
 },
 "apocalipsis-12": {
  "4": "Y su cola arrastraba la tercera parte de las estrellas del cielo, y las echó en tierra. Y el dragón se paró delante de la mujer que estaba para parir, á fin de devorar á su hijo cuando hubiese parido.",
  "5": "Y ella parió un hijo varón, el cual había de regir todas las gentes con vara de hierro: y su hijo fué arrebatado para Dios y á su trono.",
  "6": "Y la mujer huyó al desierto, donde tiene lugar aparejado de Dios, para que allí la mantengan mil doscientos y sesenta días.",
  "7": "Y fué hecha una grande batalla en el cielo: Miguel y sus ángeles lidiaban contra el dragón; y lidiaba el dragón y sus ángeles.",
  "8": "Y no prevalecieron, ni su lugar fué más hallado en el cielo.",
  "9": "Y fué lanzado fuera aquel gran dragón, la serpiente antigua, que se llama Diablo y Satanás, el cual engaña á todo el mundo; fué arrojado en tierra, y sus ángeles fueron arrojados con él.",
  "17": "Entonces el dragón fué airado contra la mujer; y se fué á hacer guerra contra los otros de la simiente de ella, los cuales guardan los mandamientos de Dios, y tienen el testimonio de Jesucristo."
 },
 "apocalipsis-13": {
  "5": "Y le fué dada boca que hablaba grandes cosas y blasfemias: y le fué dada potencia de obrar cuarenta y dos meses."
 },
 "apocalipsis-14": {
  "6": "Y vi otro ángel volar por en medio del cielo, que tenía el evangelio eterno para predicarlo á los que moran en la tierra, y á toda nación y tribu y lengua y pueblo,",
  "7": "Diciendo en alta voz: Temed á Dios, y dadle honra; porque la hora de su juicio es venida; y adorad á aquel que ha hecho el cielo y la tierra y el mar y las fuentes de las aguas.",
  "8": "Y otro ángel le siguió, diciendo: Ha caído, ha caído Babilonia, aquella grande ciudad, porque ella ha dado á beber á todas las naciones del vino del furor de su fornicación.",
  "9": "Y el tercer ángel los siguió, diciendo en alta voz: Si alguno adora á la bestia y á su imagen, y toma la señal en su frente, ó en su mano,",
  "10": "Este también beberá del vino de la ira de Dios, el cual está echado puro en el cáliz de su ira; y será atormentado con fuego y azufre delante de los santos ángeles, y delante del Cordero:",
  "11": "Y el humo del tormento de ellos sube para siempre jamás. Y los que adoran á la bestia y á su imagen, no tienen reposo día ni noche, ni cualquiera que tomare la señal de su nombre.",
  "12": "Aquí está la paciencia de los santos; aquí están los que guardan los mandamientos de Dios, y la fe de Jesús.",
  "14": "Y miré, y he aquí una nube blanca; y sobre la nube uno sentado semejante al Hijo del hombre, que tenía en su cabeza una corona de oro, y en su mano una hoz aguda.",
  "15": "Y otro ángel salió del templo, clamando en alta voz al que estaba sentado sobre la nube: Mete tu hoz, y siega; porque la hora de segar te es venida, porque la mies de la tierra está madura.",
  "16": "Y el que estaba sentado sobre la nube echó su hoz sobre la tierra, y la tierra fué segada.",
  "17": "Y salió otro ángel del templo que está en el cielo, teniendo también una hoz aguda.",
  "18": "Y otro ángel salió del altar, el cual tenía poder sobre el fuego, y clamó con gran voz al que tenía la hoz aguda, diciendo: Mete tu hoz aguda, y vendimia los racimos de la tierra; porque están maduras sus uvas.",
  "19": "Y el ángel echó su hoz aguda en la tierra, y vendimió la viña de la tierra, y echó la uva en el grande lagar de la ira de Dios.",
  "20": "Y el lagar fué hollado fuera de la ciudad, y del lagar salió sangre hasta los frenos de los caballos por mil y seiscientos estadios."
 },
 "apocalipsis-18": {
  "1": "Y DESPUÉS de estas cosas vi otro ángel descender del cielo teniendo grande potencia; y la tierra fué alumbrada de su gloria.",
  "2": "Y clamó con fortaleza en alta voz, diciendo: Caída es, caída es la grande Babilonia, y es hecha habitación de demonios, y guarida de todo espíritu inmundo, y albergue de todas aves sucias y aborrecibles.",
  "3": "Porque todas las gentes han bebido del vino del furor de su fornicación; y los reyes de la tierra han fornicado con ella, y los mercaderes de la tierra se han enriquecido de la potencia de sus deleites.",
  "4": "Y oí otra voz del cielo, que decía: Salid de ella, pueblo mío, porque no seáis participantes de sus pecados, y que no recibáis de sus plagas;"
 },
 "apocalipsis-19": {
  "10": "Y yo me eché á sus pies para adorarle. Y él me dijo: Mira que no lo hagas: yo soy siervo contigo, y con tus hermanos que tienen el testimonio de Jesús: adora á Dios; porque el testimonio de Jesús es el espíritu de la profecía.",
  "11": "Y vi el cielo abierto; y he aquí un caballo blanco, y el que estaba sentado sobre él, era llamado Fiel y Verdadero, el cual con justicia juzga y pelea.",
  "12": "Y sus ojos eran como llama de fuego, y había en su cabeza muchas diademas; y tenía un nombre escrito que ninguno entendía sino él mismo.",
  "13": "Y estaba vestido de una ropa teñida en sangre: y su nombre es llamado EL VERBO DE DIOS.",
  "14": "Y los ejércitos que están en el cielo le seguían en caballos blancos, vestidos de lino finísimo, blanco y limpio.",
  "15": "Y de su boca sale una espada aguda, para herir con ella las gentes: y él los regirá con vara de hierro; y él pisa el lagar del vino del furor, y de la ira del Dios Todopoderoso.",
  "16": "Y en su vestidura y en su muslo tiene escrito este nombre: REY DE REYES Y SEÑOR DE SEÑORES.",
  "17": "Y vi un ángel que estaba en el sol, y clamó con gran voz, diciendo á todas las aves que volaban por medio del cielo: Venid, y congregaos á la cena del gran Dios,",
  "18": "Para que comáis carnes de reyes, y de capitanes, y carnes de fuertes, y carnes de caballos, y de los que están sentados sobre ellos; y carnes de todos, libres y siervos, de pequeños y de grandes",
  "19": "Y vi la bestia, y los reyes de la tierra y sus ejércitos, congregados para hacer guerra contra el que estaba sentado sobre el caballo, y contra su ejército.",
  "20": "Y la bestia fué presa, y con ella el falso profeta que había hecho las señales delante de ella, con las cuales había engañado á los que tomaron la señal de la bestia, y habían adorado su imagen. Estos dos fueron lanzados vivos dentro de un lago de fuego ardiendo en azufre.",
  "21": "Y los otros fueron muertos con la espada que salía de la boca del que estaba sentado sobre el caballo, y todas las aves fueron hartas de las carnes de ellos."
 },
 "apocalipsis-2": {
  "10": "No tengas ningún temor de las cosas que has de padecer. He aquí, el diablo ha de enviar algunos de vosotros á la cárcel, para que seáis probados, y tendréis tribulación de diez días. Sé fiel hasta la muerte, y yo te daré la corona de la vida."
 },
 "apocalipsis-20": {
  "1": "Y VI un ángel descender del cielo, que tenía la llave del abismo, y una grande cadena en su mano.",
  "2": "Y prendió al dragón, aquella serpiente antigua, que es el Diablo y Satanás, y le ató por mil años;",
  "3": "Y arrojólo al abismo, y le encerró, y selló sobre él, porque no engañe más á las naciones, hasta que mil años sean cumplidos: y después de esto es necesario que sea desatado un poco de tiempo.",
  "4": "Y vi tronos, y se sentaron sobre ellos, y les fué dado juicio; y vi las almas de los degollados por el testimonio de Jesús, y por la palabra de Dios, y que no habían adorado la bestia, ni á su imagen, y que no recibieron la señal en sus frentes, ni en sus manos, y vivieron y reinaron con Cristo mil años.",
  "5": "Mas los otros muertos no tornaron á vivir hasta que sean cumplidos mil años. Esta es la primera resurrección.",
  "6": "Bienaventurado y santo el que tiene parte en la primera resurrección; la segunda muerte no tiene potestad en éstos; antes serán sacerdotes de Dios y de Cristo, y reinarán con él mil años.",
  "7": "Y cuando los mil años fueren cumplidos, Satanás será suelto de su prisión,",
  "8": "Y saldrá para engañar las naciones que están sobre los cuatro ángulos de la tierra, á Gog y á Magog, á fin de congregarlos para la batalla; el número de los cuales es como la arena del mar.",
  "9": "Y subieron sobre la anchura de la tierra, y circundaron el campo de los santos, y la ciudad amada: y de Dios descendió fuego del cielo, y los devoró.",
  "10": "Y el diablo que los engañaba, fué lanzado en el lago de fuego y azufre, donde está la bestia y el falso profeta; y serán atormentados día y noche para siempre jamás.",
  "11": "Y vi un gran trono blanco y al que estaba sentado sobre él, de delante del cual huyó la tierra y el cielo; y no fué hallado el lugar de ellos.",
  "12": "Y vi los muertos, grandes y pequeños, que estaban delante de Dios; y los libros fueron abiertos: y otro libro fué abierto, el cual es de la vida: y fueron juzgados los muertos por las cosas que estaban escritas en los libros, según sus obras.",
  "13": "Y el mar dió los muertos que estaban en él; y la muerte y el infierno dieron los muertos que estaban en ellos; y fué hecho juicio de cada uno según sus obras.",
  "14": "Y el infierno y la muerte fueron lanzados en el lago de fuego. Esta es la muerte segunda.",
  "15": "Y el que no fué hallado escrito en el libro de la vida, fué lanzado en el lago de fuego."
 },
 "apocalipsis-21": {
  "1": "Y VI un cielo nuevo, y una tierra nueva: porque el primer cielo y la primera tierra se fueron, y el mar ya no es.",
  "2": "Y yo Juan vi la santa ciudad, Jerusalem nueva, que descendía del cielo, de Dios, dispuesta como una esposa ataviada para su marido.",
  "3": "Y oí una gran voz del cielo que decía: He aquí el tabernáculo de Dios con los hombres, y morará con ellos; y ellos serán su pueblo, y el mismo Dios será su Dios con ellos.",
  "4": "Y limpiará Dios toda lágrima de los ojos de ellos; y la muerte no será más; y no habrá más llanto, ni clamor, ni dolor: porque las primeras cosas son pasadas.",
  "5": "Y el que estaba sentado en el trono dijo: He aquí, yo hago nuevas todas las cosas. Y me dijo: Escribe; porque estas palabras son fieles y verdaderas.",
  "6": "Y díjome: Hecho es. Yo soy Alpha y Omega, el principio y el fin. Al que tuviere sed, yo le daré de la fuente del agua de vida gratuitamente.",
  "7": "El que venciere, poseerá todas las cosas; y yo seré su Dios, y él será mi hijo.",
  "8": "Mas á los temerosos é incrédulos, á los abominables y homicidas, á los fornicarios y hechiceros, y á los idólatras, y á todos los mentirosos, su parte será en el lago ardiendo con fuego y azufre, que es la muerte segunda.",
  "9": "Y vino á mí uno de los siete ángeles que tenían las siete copas llenas de las siete postreras plagas, y habló conmigo, diciendo: Ven acá, yo te mostraré la esposa, mujer del Cordero.",
  "10": "Y llevóme en Espíritu á un grande y alto monte, y me mostró la grande ciudad santa de Jerusalem, que descendía del cielo de Dios,",
  "11": "Teniendo la claridad de Dios: y su luz era semejante á una piedra preciosísima, como piedra de jaspe, resplandeciente como cristal.",
  "12": "Y tenía un muro grande y alto con doce puertas; y en las puertas, doce ángeles, y nombres escritos, que son los de las doce tribus de los hijos de Israel.",
  "13": "Al oriente tres puertas; al norte tres puertas; al mediodiá tres puertas; al poniente tres puertas.",
  "14": "Y el muro de la ciudad tenía doce fundamentos, y en ellos los doce nombres de los doce apóstoles del Cordero."
 },
 "apocalipsis-22": {
  "1": "Después me mostró un río limpio de agua de vida, resplandeciente como cristal, que salía del trono de Dios y del Cordero.",
  "2": "En el medio de la plaza de ella, y de la una y de la otra parte del río, estaba el árbol de la vida, que lleva doce frutos, dando cada mes su fruto: y las hojas del árbol eran para la sanidad de las naciones.",
  "3": "Y no habrá más maldición; sino que el trono de Dios y del Cordero estará en ella, y sus siervos le servirán.",
  "4": "Y verán su cara; y su nombre estará en sus frentes.",
  "5": "Y allí no habrá más noche; y no tienen necesidad de lumbre de antorcha, ni de lumbre de sol: porque el Señor Dios los alumbrará: y reinarán para siempre jamás.",
  "12": "Y he aquí, yo vengo presto, y mi galardón conmigo, para recompensar á cada uno según fuere su obra."
 },
 "apocalipsis-3": {
  "10": "Porque has guardado la palabra de mi paciencia, yo también te guardaré de la hora de la tentación que ha de venir en todo el mundo, para probar á los que moran en la tierra.",
  "20": "He aquí, yo estoy á la puerta y llamo: si alguno oyere mi voz y abriere la puerta, entraré á él, y cenaré con él, y él conmigo."
 },
 "apocalipsis-4": {
  "11": "Señor, digno eres de recibir gloria y honra y virtud: porque tú criaste todas las cosas, y por tu voluntad tienen ser y fueron criadas."
 },
 "colosenses-1": {
  "13": "Que nos ha librado de la potestad de las tinieblas, y trasladado al reino de su amado Hijo;",
  "14": "En el cual tenemos redención por su sangre, la remisión de pecados:",
  "15": "El cual es la imagen del Dios invisible, el primogénito de toda criatura.",
  "16": "Porque por él fueron criadas todas las cosas que están en los cielos, y que están en la tierra, visibles é invisibles; sean tronos, sean dominios, sean principados, sean potestades; todo fué criado por él y para él.",
  "17": "Y él es antes de todas las cosas, y por él todas las cosas subsisten:",
  "18": "Y él es la cabeza del cuerpo que es la iglesia; él que es el principio, el primogénito de los muertos, para que en todo tenga el primado.",
  "19": "Por cuanto agradó al Padre que en él habitase toda plenitud,"
 },
 "colosenses-2": {
  "6": "Por tanto, de la manera que habéis recibido al Señor Jesucristo, andad en él:",
  "12": "Sepultados juntamente con él en la bautismo, en el cual también resucitasteis con él, por la fe de la operación de Dios que le levantó de los muertos.",
  "13": "Y á vosotros, estando muertos en pecados y en la incircuncisión de vuestra carne, os vivificó juntamente con él, perdonándoos todos los pecados,",
  "14": "Rayendo la cédula de los ritos que nos era contraria, que era contra nosotros, quitándola de en medio y enclavándola en la cruz;",
  "15": "Y despojando los principados y las potestades, sacólos á la vergüenza en público, triunfando de ellos en sí mismo."
 },
 "colosenses-3": {
  "4": "Cuando Cristo, vuestra vida, se manifestare, entonces vosotros también seréis manifestados con él en gloria.",
  "10": "Y revestídoos del nuevo, el cual por el conocimiento es renovado conforme á la imagen del que lo crió;",
  "11": "Donde no hay Griego ni Judío, circuncisión ni incircuncisión, bárbaro ni Scytha, siervo ni libre; mas Cristo es el todo, y en todos.",
  "12": "Vestíos pues, como escogidos de Dios, santos y amados, de entrañas de misericordia, de benignidad, de humildad, de mansedumbre, de tolerancia;",
  "13": "Sufriéndoos los unos á los otros, y perdonándoos los unos á los otros si alguno tuviere queja del otro: de la manera que Crito os perdonó, así también hacedlo vosotros.",
  "14": "Y sobre todas estas cosas vestíos de caridad, la cual es el vínculo de la perfección.",
  "15": "Y la paz de Dios gobierne en vuestros corazones, á la cual asimismo sois llamados en un cuerpo; y sed agradecidos."
 },
 "deuteronomio-28": {
  "1": "Y SERA que, si oyeres diligente la voz de Jehová tu Dios, para guardar, para poner por obra todos sus mandamientos que yo te prescribo hoy, también Jehová tu Dios te pondrá alto sobre todas las gentes de la tierra;",
  "2": "Y vendrán sobre ti todas estas bendiciones, y te alcanzarán, cuando oyeres la voz de Jehová tu Dios.",
  "3": "Bendito serás tú en la ciudad, y bendito tú en el campo.",
  "4": "Bendito el fruto de tu vientre, y el fruto de tu bestia, la cría de tus vacas, y los rebaños de tus ovejas.",
  "5": "Bendito tu canastillo y tus sobras.",
  "6": "Bendito serás en tu entrar, y bendito en tu salir.",
  "7": "Pondrá Jehová á tus enemigos que se levantaren contra ti, de rota batida delante de ti: por un camino saldrán á ti, por siete caminos huirán delante de ti.",
  "8": "Enviará Jehová contigo la bendición en tus graneros, y en todo aquello en que pusieres tu mano; y te bendecirá en la tierra que Jehová tu Dios te da.",
  "9": "Confirmarte ha Jehová por pueblo suyo santo, como te ha jurado, cuando guardares los mandamientos de Jehová tu Dios, y anduvieres en sus caminos.",
  "10": "Y verán todos los pueblos de la tierra que el nombre de Jehová es llamado sobre ti, y te temerán.",
  "11": "Y te hará Jehová sobreabundar en bienes, en el fruto de tu vientre, y en el fruto de tu bestia, y en el fruto de tu tierra, en el país que juró Jehová á tus padres que te había de dar.",
  "12": "Abrirte ha Jehová su buen depósito, el cielo, para dar lluvia á tu tierra en su tiempo, y para bendecir toda obra de tus manos. Y prestarás á muchas gentes, y tú no tomarás emprestado.",
  "13": "Y te pondrá Jehová por cabeza, y no por cola: y estarás encima solamente, y no estarás debajo; cuando obedecieres á los mandamientos de Jehová tu Dios, que yo te ordeno hoy, para que los guardes y cumplas.",
  "14": "Y no te apartes de todas las palabras que yo os mando hoy, ni á diestra ni á siniestra, para ir tras dioses ajenos para servirles."
 },
 "deuteronomio-5": {
  "12": "Guardarás el día del reposo para santificarlo, como Jehová tu Dios te ha mandado.",
  "13": "Seis días trabajarás y harás toda tu obra:",
  "14": "Mas el séptimo es reposo á Jehová tu Dios: ninguna obra harás tú, ni tu hijo, ni tu hija, ni tu siervo, ni tu sierva, ni tu buey, ni tu asno, ni ningún animal tuyo, ni tu peregrino que está dentro de tus puertas: porque descanse tu siervo y tu sierva como tú.",
  "15": "Y acuérdate que fuiste siervo en tierra de Egipto, y que Jehová tu Dios te sacó de allá con mano fuerte y brazo extendido: por lo cual Jehová tu Dios te ha mandado que guardes el día del reposo."
 },
 "deuteronomio-6": {
  "4": "Oye, Israel: Jehová nuestro Dios, Jehová uno es:",
  "5": "Y Amarás á Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todo tu poder.",
  "6": "Y estas palabras que yo te mando hoy, estarán sobre tu corazón:",
  "7": "Y las repetirás á tus hijos, y hablarás de ellas estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes:",
  "8": "Y has de atarlas por señal en tu mano, y estarán por frontales entre tus ojos:",
  "9": "Y las escribirás en los postes de tu casa, y en tus portadas."
 },
 "eclesiastes-9": {
  "5": "Porque los que viven saben que han de morir: mas los muertos nada saben, ni tienen más paga; porque su memoria es puesta en olvido.",
  "6": "También su amor, y su odio y su envidia, feneció ya: ni tiene ya más parte en el siglo, en todo lo que se hace debajo del sol."
 },
 "efesios-1": {
  "22": "Y sometió todas las cosas debajo de sus pies, y diólo por cabeza sobre todas las cosas á la iglesia,",
  "23": "La cual es su cuerpo, la plenitud de Aquel que hinche todas las cosas en todos."
 },
 "efesios-2": {
  "8": "Porque por gracia sois salvos por la fe; y esto no de vosotros, pues es don de Dios:",
  "9": "No por obras, para que nadie se gloríe.",
  "10": "Porque somos hechura suya, criados en Cristo Jesús para buenas obras, las cuales Dios preparó para que anduviésemos en ellas.",
  "19": "Así que ya no sois extranjeros ni advenedizos, sino juntamente ciudadanos con los santos, y domésticos de Dios;",
  "20": "Edificados sobre el fundamento de los apóstoles y profetas, siendo la principal piedra del ángulo Jesucristo mismo;",
  "21": "En el cual, compaginado todo el edificio, va creciendo para ser un templo santo en el Señor:",
  "22": "En el cual vosotros también sois juntamente edificados, para morada de Dios en Espíritu."
 },
 "efesios-3": {
  "8": "A mí, que soy menos que el más pequeño de todos los santos, es dada esta gracia de anunciar entre los Gentiles el evangelio de las inescrutables riquezas de Cristo,",
  "9": "Y de aclarar á todos cuál sea la dispensación del misterio escondido desde los siglos en Dios, que crió todas las cosas.",
  "10": "Para que la multiforme sabiduría de Dios sea ahora notificada por la iglesia á los principados y potestades en los cielos,",
  "11": "Conforme á la determinación eterna, que hizo en Cristo Jesús nuestro Señor:"
 },
 "efesios-4": {
  "4": "Un cuerpo, y un Espíritu; como sois también llamados á una misma esperanza de vuestra vocación:",
  "5": "Un Señor, una fe, un bautismo,",
  "6": "Un Dios y Padre de todos, el cual es sobre todas las cosas, y por todas las cosas, y en todos vosotros.",
  "8": "Por lo cual dice: Subiendo á lo alto, llevó cautiva la cautividad, Y dió dones á los hombres.",
  "11": "Y él mismo dió unos, ciertamente apóstoles; y otros, profetas; y otros, evangelistas; y otros, pastores y doctores;",
  "12": "Para perfección de los santos, para la obra del ministerio, para edificación del cuerpo de Cristo;",
  "13": "Hasta que todos lleguemos á la unidad de la fe y del conocimiento del Hijo de Dios, á un varón perfecto, á la medida de la edad de la plenitud de Cristo:",
  "14": "Que ya no seamos niños fluctuantes, y llevados por doquiera de todo viento de doctrina, por estratagema de hombres que, para engañar, emplean con astucia los artificios del error:",
  "15": "Antes siguiendo la verdad en amor, crezcamos en todas cosas en aquel que es la cabeza, a saber, Cristo;",
  "16": "Del cual, todo el cuerpo compuesto y bien ligado entre sí por todas las junturas de su alimento, que recibe según la operación, cada miembro conforme á su medida toma aumento de cuerpo edificándose en amor."
 },
 "efesios-5": {
  "1": "SED, pues, imitadores de Dios como hijos amados:",
  "2": "Y andad en amor, como también Cristo nos amó, y se entregó á sí mismo por nosotros, ofrenda y sacrificio á Dios en olor suave.",
  "3": "Pero fornicación y toda inmundicia, ó avaricia, ni aun se nombre entre vosotros, como conviene á santos;",
  "4": "Ni palabras torpes, ni necedades, ni truhanerías, que no convienen; sino antes bien acciones de gracias.",
  "5": "Porque sabéis esto, que ningún fornicario, ó inmundo, ó avaro, que es servidor de ídolos, tiene herencia en el reino de Cristo y de Dios.",
  "6": "Nadie os engañe con palabras vanas; porque por estas cosas viene la ira de Dios sobre los hijos de desobediencia.",
  "7": "No seáis pues aparceros con ellos;",
  "8": "Porque en otro tiempo erais tinieblas; mas ahora sois luz en el Señor: andad como hijos de luz,",
  "9": "(Porque el fruto del Espíritu es en toda bondad, y justicia, y verdad;)",
  "10": "Aprobando lo que es agradable al Señor.",
  "11": "Y no comuniquéis con las obras infructuosas de las tinieblas; sino antes bien redargüidlas.",
  "12": "Porque torpe cosa es aun hablar de lo que ellos hacen en oculto.",
  "13": "Mas todas las cosas cuando son redargüidas, son manifestadas por la luz; porque lo que manifiesta todo, la luz es.",
  "14": "Por lo cual dice: Despiértate, tú que duermes, y levántate de los muertos, y te alumbrará Cristo.",
  "15": "Mirad, pues, cómo andéis avisadamente; no como necios, mas como sabios;",
  "16": "Redimiendo el tiempo, porque los días son malos.",
  "17": "Por tanto, no seáis imprudentes, sino entendidos de cuál sea la voluntad del Señor.",
  "18": "Y no os embriaguéis de vino, en lo cual hay disolución; mas sed llenos de Espíritu;",
  "19": "Hablando entre vosotros con salmos, y con himnos, y canciones espirituales, cantando y alabando al Señor en vuestros corazones;",
  "20": "Dando gracias siempre de todo al Dios y Padre en el nombre de nuestro Señor Jesucristo:",
  "21": "Sujetados los unos á los otros en el temor de Dios.",
  "22": "Las casadas estén sujetas á sus propios maridos, como al Señor.",
  "23": "Porque el marido es cabeza de la mujer, así como Cristo es cabeza de la iglesia; y él es el que da la salud al cuerpo.",
  "24": "Así que, como la iglesia está sujeta á Cristo, así también las casadas lo estén á sus maridos en todo.",
  "25": "Maridos, amad á vuestras mujeres, así como Cristo amó á la iglesia, y se entregó á sí mismo por ella,",
  "26": "Para santificarla limpiándola en el lavacro del agua por la palabra,",
  "27": "Para presentársela gloriosa para sí, una iglesia que no tuviese mancha ni arruga, ni cosa semejante; sino que fuese santa y sin mancha.",
  "28": "Así también los maridos deben amar á sus mujeres como á sus mismos cuerpos. El que ama á su mujer, á sí mismo se ama.",
  "29": "Porque ninguno aborreció jamás á su propia carne, antes la sustenta y regala, como también Cristo á la iglesia;",
  "30": "Porque somos miembros de su cuerpo, de su carne y de sus huesos.",
  "31": "Por esto dejará el hombre á su padre y á su madre, y se allegará á su mujer, y serán dos en una carne.",
  "32": "Este misterio grande es: mas yo digo esto con respecto á Cristo y á la iglesia.",
  "33": "Cada uno empero de vosotros de por sí, ame también á su mujer como á sí mismo; y la mujer reverencie á su marido."
 },
 "efesios-6": {
  "1": "HIJOS, obedeced en el Señor á vuestros padres; porque esto es justo.",
  "2": "Honra á tu padre y á tu madre, que es el primer mandamiento con promesa,",
  "3": "Para que te vaya bien, y seas de larga vida sobre la tierra.",
  "4": "Y vosotros, padres, no provoquéis á ira á vuestros hijos; sino fhhijos; sino fh amonestación del Señor.",
  "12": "Porque no tenemos lucha contra sangre y carne; sino contra principados, contra potestades, contra señores del mundo, gobernadores de estas tinieblas, contra malicias espirituales en los aires.",
  "13": "Por tanto, tomad toda la armadura de Dios, para que podáis resistir en el día malo, y estar firmes, habiendo acabado todo.",
  "14": "Estad pues firmes, ceñidos vuestros lomos de verdad, y vestidos de la cota de justicia.",
  "15": "Y calzados los pies con el apresto del evangelio de paz;",
  "16": "Sobre todo, tomando el escudo de la fe, con que podáis apagar todos los dardos de fuego del maligno.",
  "17": "Y tomad el yelmo de salud, y la espada del Espíritu; que es la palabra de Dios;",
  "18": "Orando en todo tiempo con toda deprecación y súplica en el Espíritu, y velando en ello con toda instancia y suplicación por todos los santos,"
 },
 "exodo-20": {
  "1": "Y HABLO Dios todas estas palabras, diciendo:",
  "2": "Yo soy JEHOVA tu Dios, que te saqué de la tierra de Egipto, de casa de siervos.",
  "3": "No tendrás dioses ajenos delante de mí.",
  "4": "No te harás imagen, ni ninguna semejanza de cosa que esté arriba en el cielo, ni abajo en la tierra, ni en las aguas debajo de la tierra:",
  "5": "No te inclinarás á ellas, ni las honrarás; porque yo soy Jehová tu Dios, fuerte, celoso, que visito la maldad de los padres sobre los hijos, sobre los terceros y sobre los cuartos, á los que me aborrecen,",
  "6": "Y que hago misericordia en millares á los que me aman, y guardan mis mandamientos.",
  "7": "No tomarás el nombre de Jehová tu Dios en vano; porque no dará por inocente Jehová al que tomare su nombre en vano.",
  "8": "Acordarte has del día del reposo, para santificarlo:",
  "9": "Seis días trabajarás, y harás toda tu obra;",
  "10": "Mas el séptimo día será reposo para Jehová tu Dios: no hagas en él obra alguna, tú, ni tu hijo, ni tu hija, ni tu siervo, ni tu criada, ni tu bestia, ni tu extranjero que está dentro de tus puertas:",
  "11": "Porque en seis días hizo Jehová los cielos y la tierra, la mar y todas las cosas que en ellos hay, y reposó en el séptimo día: por tanto Jehová bendijo el día del reposo y lo santificó.",
  "12": "Honra á tu padre y á tu madre, porque tus días se alarguen en la tierra que Jehová tu Dios te da.",
  "13": "No matarás.",
  "14": "No cometerás adulterio.",
  "15": "No hurtarás.",
  "16": "No hablarás contra tu prójimo falso testimonio.",
  "17": "No codiciarás la casa de tu prójimo, no codiciarás la mujer de tu prójimo, ni su siervo, ni su criada, ni su buey, ni su asno, ni cosa alguna de tu prójimo."
 },
 "exodo-3": {
  "2": "Y apareciósele el Angel de Jehová en una llama de fuego en medio de una zarza: y él miró, y vió que la zarza ardía en fuego, y la zarza no se consumía."
 },
 "exodo-31": {
  "13": "Y tú hablarás á los hijos de Israel, diciendo: Con todo eso vosotros guardaréis mis sábados: porque es señal entre mí y vosotros por vuestras edades, para que sepáis que yo soy Jehová que os santifico.",
  "14": "Así que guardaréis el sábado, porque santo es á vosotros: el que lo profanare, de cierto morirá; porque cualquiera que hiciere obra alguna en él, aquella alma será cortada de en medio de sus pueblos.",
  "15": "Seis días se hará obra, mas el día séptimo es sábado de reposo consagrado á Jehová; cualquiera que hiciere obra el día del sábado, morirá ciertamente.",
  "16": "Guardarán, pues, el sábado los hijos de Israel: celebrándolo por sus edades por pacto perpetuo:",
  "17": "Señal es para siempre entre mí y los hijos de Israel; porque en seis días hizo Jehová los cielos y la tierra, y en el séptimo día cesó, y reposó."
 },
 "exodo-34": {
  "6": "Y pasando Jehová por delante de él, proclamó: Jehová, Jehová, fuerte, misericordioso, y piadoso; tardo para la ira, y grande en benignidad y verdad;",
  "7": "Que guarda la misericordia en millares, que perdona la iniquidad, la rebelión, y el pecado, y que de ningún modo justificará al malvado; que visita la iniquidad de los padres sobre los hijos y sobre los hijos de los hijos, sobre los terceros, y sobre los cuartos."
 },
 "ezequiel-20": {
  "12": "Y díles también mis sábados que fuesen por señal entre mí y ellos, para que supiesen que yo soy Jehová que los santifico.",
  "20": "Y santificad mis sábados, y sean por señal entre mí y vosotros, para que sepáis que yo soy Jehová vuestro Dios."
 },
 "ezequiel-26": {
  "7": "Porque así ha dicho el Señor Jehová: He aquí que del aquilón traigo yo contra Tiro á Nabucodonosor, rey de Babilonia, rey de reyes, con caballos, y carros, y caballeros, y compañías, y mucho pueblo."
 },
 "ezequiel-28": {
  "12": "Hijo del hombre, levanta endechas sobre el rey de Tiro, y dile: Así ha dicho el Señor Jehová: Tú echas el sello á la proporción, lleno de sabiduría, y acabado de hermosura.",
  "13": "En Edén, en el huerto de Dios estuviste: toda piedra preciosa fué tu vestidura; el sardio, topacio, diamante, crisólito, onique, y berilo, el zafiro, carbunclo, y esmeralda, y oro, los primores de tus tamboriles y pífanos estuvieron apercibidos para ti en el día de tu creación.",
  "14": "Tú, querubín grande, cubridor: y yo te puse; en el santo monte de Dios estuviste; en medio de piedras de fuego has andado.",
  "15": "Perfecto eras en todos tus caminos desde el día que fuiste criado, hasta que se halló en ti maldad.",
  "16": "A causa de la multitud de tu contratación fuiste lleno de iniquidad, y pecaste: por lo que yo te eché del monte de Dios, y te arrojé de entre las piedras del fuego, oh querubín cubridor.",
  "17": "Enaltecióse tu corazón á causa de tu hermosura, corrompiste tu sabiduría á causa de tu resplandor: yo te arrojaré por tierra; delante de los reyes te pondré para que miren en ti.",
  "18": "Con la multitud de tus maldades, y con la iniquidad de tu contratación ensuciaste tu santuario: yo pues saqué fuego de en medio de ti, el cual te consumió, y púsete en ceniza sobre la tierra á los ojos de todos los que te miran.",
  "19": "Todos los que te conocieron de entre los pueblos, se maravillarán sobre ti: en espanto serás, y para siempre dejarás de ser."
 },
 "ezequiel-4": {
  "6": "Y cumplidos estos, dormirás sobre tu lado derecho segunda vez, y llevarás la maldad de la casa de Judá cuarenta días: día por año, día por año te lo he dado."
 },
 "filipenses-2": {
  "6": "El cual, siendo en forma de Dios, no tuvo por usurpación ser igual á Dios:",
  "7": "Sin embargo, se anonadó á sí mismo, tomando forma de siervo, hecho semejante á los hombres;",
  "8": "Y hallado en la condición como hombre, se humilló á sí mismo, hecho obediente hasta la muerte, y muerte de cruz.",
  "9": "Por lo cual Dios también le ensalzó á lo sumo, y dióle un nombre que es sobre todo nombre;",
  "10": "Para que en el nombre de Jesús se doble toda rodilla de los que están en los cielos, y de los que en la tierra, y de los que debajo de la tierra;",
  "11": "Y toda lengua confiese que Jesucristo es el Señor, á la gloria de Dios Padre."
 },
 "filipenses-3": {
  "7": "Pero las cosas que para mí eran ganancias, helas reputado pérdidas por amor de Cristo.",
  "8": "Y ciertamente, aun reputo todas las cosas pérdida por el eminente conocimiento de Cristo Jesús, mi Señor, por amor del cual lo he perdido todo, y téngolo por estiércol, para ganar á Cristo,",
  "9": "Y ser hallado en él, no teniendo mi justicia, que es por la ley, sino la que es por la fe de Cristo, la justicia que es de Dios por la fe;",
  "10": "A fin de conocerle, y la virtud de su resurrección, y la participación de sus padecimientos, en conformidad á su muerte,",
  "11": "Si en alguna manera llegase á la resurrección de los muertos.",
  "12": "No que ya haya alcanzado, ni que ya sea perfecto; sino que prosigo, por ver si alcanzo aquello para lo cual fuí también alcanzado de Cristo Jesús.",
  "13": "Hermanos, yo mismo no hago cuenta de haber lo ya alcanzado; pero una cosa hago: olvidando ciertamente lo que queda atrás, y extendiéndome á lo que está delante,",
  "14": "Prosigo al blanco, al premio de la soberana vocación de Dios en Cristo Jesús."
 },
 "filipenses-4": {
  "3": "Asimismo te ruego también á ti, hermano compañero, ayuda á las que trabajaron juntamente conmigo en el evangelio, con Clemente también, y los demás mis colaboradores, cuyos nombres están en el libro de la vida.",
  "8": "Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si alguna alabanza, en esto pensad.",
  "19": "Mi Dios, pues, suplirá todo lo que os falta conforme á sus riquezas en gloria en Cristo Jesús."
 },
 "galatas-1": {
  "4": "El cual se dió á sí mismo por nuestros pecados para librarnos de este presente siglo malo, conforme á la voluntad de Dios y Padre nuestro;",
  "10": "Porque, ¿persuado yo ahora á hombres ó á Dios? ¿ó busco de agradar á hombres? Cierto, que si todavía agradara á los hombres, no sería siervo de Cristo."
 },
 "galatas-3": {
  "13": "Cristo nos redimió de la maldición de la ley, hecho por nosotros maldición; (porque está escrito: Maldito cualquiera que es colgado en madero:)",
  "14": "Para que la bendición de Abraham fuese sobre los Gentiles en Cristo Jesús; para que por la fe recibamos la promesa del Espíritu.",
  "27": "Porque todos los que habéis sido bautizados en Cristo, de Cristo estáis vestidos.",
  "29": "Y si vosotros sois de Cristo, ciertamente la simiente de Abraham sois, y conforme á la promesa los herederos."
 },
 "galatas-4": {
  "4": "Mas venido el cumplimiento del tiempo, Dios envió su Hijo, hecho de mujer, hecho súbdito á la ley,",
  "5": "Para que redimiese á los que estaban debajo de la ley, á fin de que recibiésemos la adopción de hijos.",
  "6": "Y por cuanto sois hijos, Dios envió el Espíritu de su Hijo en vuestros corazones, el cual clama: Abba, Padre.",
  "7": "Así que ya no eres más siervo, sino hijo, y si hijo, también heredero de Dios por Cristo."
 },
 "galatas-5": {
  "16": "Digo pues: Andad en el Espíritu, y no satisfagáis la concupiscencia de la carne.",
  "17": "Porque la carne codicia contra el Espíritu, y el Espíritu contra la carne: y estas cosas se oponen la una á la otra, para que no hagáis lo que quisieres.",
  "22": "Mas el fruto del Espíritu es: caridad, gozo, paz, tolerancia, benignidad, bondad, fe,",
  "23": "Mansedumbre, templanza: contra tales cosas no hay ley.",
  "24": "Porque los que son de Cristo, han crucificado la carne con los afectos y concupiscencias.",
  "25": "Si vivimos en el Espíritu, andemos también en el Espíritu."
 },
 "genesis-1": {
  "1": "En el principio crió Dios los cielos y la tierra.",
  "2": "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la haz del abismo, y el Espíritu de Dios se movía sobre la haz de las aguas.",
  "3": "Y dijo Dios: Sea la luz: y fué la luz.",
  "4": "Y vió Dios que la luz era buena: y apartó Dios la luz de las tinieblas.",
  "5": "Y llamó Dios á la luz Día, y á las tinieblas llamó Noche: y fué la tarde y la mañana un día.",
  "6": "Y dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas.",
  "7": "E hizo Dios la expansión, y apartó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión: y fué así.",
  "8": "Y llamó Dios á la expansión Cielos: y fué la tarde y la mañana el día segundo.",
  "9": "Y dijo Dios: Júntense las aguas que están debajo de los cielos en un lugar, y descúbrase la seca: y fué así.",
  "10": "Y llamó Dios á la seca Tierra, y á la reunión de las aguas llamó Mares: y vió Dios que era bueno.",
  "11": "Y dijo Dios: Produzca la tierra hierba verde, hierba que dé simiente; árbol de fruto que dé fruto según su género, que su simiente esté en él, sobre la tierra: y fué así.",
  "12": "Y produjo la tierra hierba verde, hierba que da simiente según su naturaleza, y árbol que da fruto, cuya simiente está en él, según su género: y vió Dios que era bueno.",
  "13": "Y fué la tarde y la mañana el día tercero.",
  "14": "Y dijo Dios: Sean lumbreras en la expansión de los cielos para apartar el día y la noche: y sean por señales, y para las estaciones, y para días y años;",
  "15": "Y sean por lumbreras en la expansión de los cielos para alumbrar sobre la tierra: y fue.",
  "16": "E hizo Dios las dos grandes lumbreras; la lumbrera mayor para que señorease en el día, y la lumbrera menor para que señorease en la noche: hizo también las estrellas.",
  "17": "Y púsolas Dios en la expansión de los cielos, para alumbrar sobre la tierra,",
  "18": "Y para señorear en el día y en la noche, y para apartar la luz y las tinieblas: y vió Dios que era bueno.",
  "19": "Y fué la tarde y la mañana el día cuarto.",
  "20": "Y dijo Dios: Produzcan las aguas reptil de ánima viviente, y aves que vuelen sobre la tierra, en la abierta expansión de los cielos.",
  "21": "Y crió Dios las grandes ballenas, y toda cosa viva que anda arrastrando, que las aguas produjeron según su género, y toda ave alada según su especie: y vió Dios que era bueno.",
  "22": "Y Dios los bendijo diciendo: Fructificad y multiplicad, y henchid las aguas en los mares, y las aves se multipliquen en la tierra.",
  "23": "Y fué la tarde y la mañana el día quinto.",
  "24": "Y dijo Dios: Produzca la tierra seres vivientes según su género, bestias y serpientes y animales de la tierra según su especie: y fué así.",
  "25": "E hizo Dios animales de la tierra según su género, y ganado según su género, y todo animal que anda arrastrando sobre la tierra según su especie: y vió Dios que era bueno.",
  "26": "Y dijo Dios: Hagamos al hombre á nuestra imagen, conforme á nuestra semejanza; y señoree en los peces de la mar, y en las aves de los cielos, y en las bestias, y en toda la tierra, y en todo animal que anda arrastrando sobre la tierra.",
  "27": "Y crió Dios al hombre á su imagen, á imagen de Dios lo crió; varón y hembra los crió.",
  "28": "Y los bendijo Dios; y díjoles Dios: Fructificad y multiplicad, y henchid la tierra, y sojuzgadla, y señoread en los peces de la mar, y en las aves de los cielos, y en todas las bestias que se mueven sobre la tierra.",
  "29": "Y dijo Dios: He aquí que os he dado toda hierba que da simiente, que está sobre la haz de toda la tierra; y todo árbol en que hay fruto de árbol que da simiente, seros ha para comer.",
  "30": "Y á toda bestia de la tierra, y á todas las aves de los cielos, y á todo lo que se mueve sobre la tierra, en que hay vida, toda hierba verde les será para comer: y fué así.",
  "31": "Y vió Dios todo lo que había hecho, y he aquí que era bueno en gran manera. Y fué la tarde y la mañana el día sexto."
 },
 "genesis-12": {
  "2": "Y haré de ti una nación grande, y bendecirte he, y engrandeceré tu nombre, y serás bendición:",
  "3": "Y bendeciré á los que te bendijeren, y á los que te maldijeren maldeciré: y serán benditas en ti todas las familias de la tierra."
 },
 "genesis-2": {
  "1": "Y FUERON acabados los cielos y la tierra, y todo su ornamento.",
  "2": "Y acabó Dios en el día séptimo su obra que hizo, y reposó el día séptimo de toda su obra que había hecho.",
  "3": "Y bendijo Dios al día séptimo, y santificólo, porque en él reposó de toda su obra que había Dios criado y hecho.",
  "4": "Estos son los orígenes de los cielos y de la tierra cuando fueron criados, el día que Jehová Dios hizo la tierra y los cielos,",
  "5": "Y toda planta del campo antes que fuese en la tierra, y toda hierba del campo antes que naciese: porque aun no había Jehová Dios hecho llover sobre la tierra, ni había hombre para que labrase la tierra;",
  "6": "Mas subía de la tierra un vapor, que regaba toda la faz de la tierra.",
  "7": "Formó, pues, Jehová Dios al hombre del polvo de la tierra, y alentó en su nariz soplo de vida; y fué el hombre en alma viviente.",
  "8": "Y había Jehová Dios plantado un huerto en Edén al oriente, y puso allí al hombre que había formado.",
  "9": "Y había Jehová Dios hecho nacer de la tierra todo árbol delicioso á la vista, y bueno para comer: también el árbol de vida en medio del huerto, y el árbol de ciencia del bien y del mal.",
  "10": "Y salía de Edén un río para regar el huerto, y de allí se repartía en cuatro ramales.",
  "11": "El nombre del uno era Pisón: éste es el que cerca toda la tierra de Havilah, donde hay oro:",
  "12": "Y el oro de aquella tierra es bueno: hay allí también bdelio y piedra cornerina.",
  "13": "El nombre del segundo río es Gihón: éste es el que rodea toda la tierra de Etiopía.",
  "14": "Y el nombre del tercer río es Hiddekel: éste es el que va delante de Asiria. Y el cuarto río es el Eufrates.",
  "15": "Tomó, pues, Jehová Dios al hombre, y le puso en el huerto de Edén, para que lo labrara y lo guardase.",
  "16": "Y mandó Jehová Dios al hombre, diciendo: De todo árbol del huerto comerás;",
  "17": "Mas del árbol de ciencia del bien y del mal no comerás de él; porque el día que de él comieres, morirás.",
  "18": "Y dijo Jehová Dios: No es bueno que el hombre esté solo; haréle ayuda idónea para él.",
  "19": "Formó, pues, Jehová Dios de la tierra toda bestia del campo, y toda ave de los cielos, y trájolas á Adam, para que viese cómo les había de llamar; y todo lo que Adam llamó á los animales vivientes, ese es su nombre.",
  "20": "Y puso Adam nombres á toda bestia y ave de los cielos y á todo animal del campo: mas para Adam no halló ayuda que estuviese idónea para él.",
  "21": "Y Jehová Dios hizo caer sueño sobre Adam, y se quedó dormido: entonces tomó una de sus costillas, y cerró la carne en su lugar;",
  "22": "Y de la costilla que Jehová Dios tomó del hombre, hizo una mujer, y trájola al hombre.",
  "23": "Y dijo Adam: Esto es ahora hueso de mis huesos, y carne de mi carne: ésta será llamada Varona, porque del varón fué tomada.",
  "24": "Por tanto, dejará el hombre á su padre y á su madre, y allegarse ha á su mujer, y serán una sola carne.",
  "25": "Y estaban ambos desnudos, Adam y su mujer, y no se avergonzaban."
 },
 "genesis-3": {
  "1": "Empero la serpiente era astuta, más que todos los animales del campo que Jehová Dios había hecho; la cual dijo á la mujer: ¿Conque Dios os ha dicho: No comáis de todo árbol del huerto?",
  "2": "Y la mujer respondió á la serpiente: Del fruto de los árboles del huerto comemos;",
  "3": "Mas del fruto del árbol que está en medio del huerto dijo Dios: No comeréis de él, ni le tocaréis, porque no muráis.",
  "4": "Entonces la serpiente dijo á la mujer: No moriréis;",
  "5": "Mas sabe Dios que el día que comiereis de él, serán abiertos vuestros ojos, y seréis como dioses sabiendo el bien y el mal.",
  "6": "Y vió la mujer que el árbol era bueno para comer, y que era agradable á los ojos, y árbol codiciable para alcanzar la sabiduría; y tomó de su fruto, y comió; y dió también á su marido, el cual comió así como ella.",
  "7": "Y fueron abiertos los ojos de entrambos, y conocieron que estaban desnudos: entonces cosieron hojas de higuera, y se hicieron delantales.",
  "8": "Y oyeron la voz de Jehová Dios que se paseaba en el huerto al aire del día: y escondióse el hombre y su mujer de la presencia de Jehová Dios entre los árboles del huerto.",
  "9": "Y llamó Jehová Dios al hombre, y le dijo: ¿Dónde estás tú?",
  "10": "Y él respondió: Oí tu voz en el huerto, y tuve miedo, porque estaba desnudo; y escondíme.",
  "11": "Y díjole: ¿Quién te enseñó que estabas desnudo? ¿Has comido del árbol de que yo te mandé no comieses?",
  "12": "Y el hombre respondió: La mujer que me diste por compañera me dió del árbol, y yo comí.",
  "13": "Entonces Jehová Dios dijo á la mujer: ¿Qué es lo que has hecho? Y dijo la mujer: La serpiente me engañó, y comí.",
  "14": "Y Jehová Dios dijo á la serpiente: Por cuanto esto hiciste, maldita serás entre todas las bestias y entre todos los animales del campo; sobre tu pecho andarás, y polvo comerás todos los días de tu vida:",
  "15": "Y enemistad pondré entre ti y la mujer, y entre tu simiente y la simiente suya; ésta te herirá en la cabeza, y tú le herirás en el calcañar.",
  "16": "A la mujer dijo: Multiplicaré en gran manera tus dolores y tus preñeces; con dolor parirás los hijos; y á tu marido será tu deseo, y él se enseñoreará de ti.",
  "17": "Y al hombre dijo: Por cuanto obedeciste á la voz de tu mujer, y comiste del árbol de que te mandé diciendo, No comerás de él; maldita será la tierra por amor de ti; con dolor comerás de ella todos los días de tu vida;",
  "18": "Espinos y cardos te producirá, y comerás hierba del campo;",
  "19": "En el sudor de tu rostro comerás el pan hasta que vuelvas á la tierra; porque de ella fuiste tomado: pues polvo eres, y al polvo serás tornado.",
  "20": "Y llamó el hombre el nombre de su mujer, Eva; por cuanto ella era madre de todos lo vivientes.",
  "21": "Y Jehová Dios hizo al hombre y á su mujer túnicas de pieles, y vistiólos.",
  "22": "Y dijo Jehová Dios: He aquí el hombre es como uno de Nos sabiendo el bien y el mal: ahora, pues, porque no alargue su mano, y tome también del árbol de la vida, y coma, y viva para siempre:",
  "23": "Y sacólo Jehová del huerto de Edén, para que labrase la tierra de que fué tomado.",
  "24": "Echó, pues, fuera al hombre, y puso al oriente del huerto de Edén querubines, y una espada encendida que se revolvía á todos lados, para guardar el camino del árbol de la vida."
 },
 "genesis-6": {
  "8": "Empero Noé halló gracia en los ojos de Jehová."
 },
 "hageo-1": {
  "3": "Fué pues palabra de Jehová por mano del profeta Haggeo, diciendo:",
  "4": "¿Es para vosotros tiempo, para vosotros, de morar en vuestras casas enmaderadas, y esta casa está desierta?",
  "5": "Pues así ha dicho Jehová de los ejércitos: Pensad bien sobre vuestros caminos.",
  "6": "Sembráis mucho, y encerráis poco; coméis, y no os hartáis; bebéis, y no os saciáis; os vestís, y no os calentáis; y el que anda á jornal recibe su jornal en trapo horadado.",
  "7": "Así ha dicho Jehová de los ejércitos: Meditad sobre vuestros caminos.",
  "8": "Subid al monte, y traed madera, y reedificad la casa; y pondré en ella, mi voluntad, y seré honrado, ha dicho Jehová.",
  "9": "Buscáis mucho, y halláis poco; y encerráis en casa, y soplo en ello. ¿Por qué? dice Jehová de los ejércitos. Por cuanto mi casa está desierta, y cada uno de vosotros corre á su propia casa.",
  "10": "Por eso se detuvo de los cielos sobre vosotros la lluvia, y la tierra detuvo sus frutos.",
  "11": "Y llamé la sequedad sobre esta tierra, y sobre los montes, y sobre el trigo, y sobre el vino, y sobre el aceite, y sobre todo lo que la tierra produce, y sobre los hombres sobre y las bestias, y sobre todo trabajo de manos."
 },
 "hebreos-1": {
  "1": "DIOS, habiendo hablado muchas veces y en muchas maneras en otro tiempo á los padres por los profetas,",
  "2": "En estos porstreros días nos ha hablado por el Hijo, al cual constituyó heredero de todo, por el cual asimismo hizo el universo:",
  "3": "El cual siendo el resplandor de su gloria, y la misma imagen de su sustancia, y sustentando todas las cosas con la palabra de su potencia, habiendo hecho la purgación de nuestros pecados por sí mismo, se sentó á la diestra de la Majestad en las alturas,",
  "14": "¿No son todos espíritus administradores, enviados para servicio á favor de los que serán herederos de salud?"
 },
 "hebreos-10": {
  "19": "Así que, hermanos, teniendo libertad para entrar en el santuario por la sangre de Jesucristo,",
  "20": "Por el camino que él nos consagró nuevo y vivo, por el velo, esto es, por su carne;",
  "21": "Y teniendo un gran sacerdote sobre la casa de Dios,",
  "22": "Lleguémonos con corazón verdadero, en plena certidumbre de fe, purificados los corazones de mala conciencia, y lavados los cuerpos con agua limpia.",
  "25": "No dejando nuestra congregación, como algunos tienen por costumbre, mas exhortándonos; y tanto más, cuanto veis que aquel día se acerca."
 },
 "hebreos-11": {
  "3": "Por la fe entendemos haber sido compuestos los siglos por la palabra de Dios, siendo hecho lo que se ve, de lo que no se veía."
 },
 "hebreos-2": {
  "16": "Porque ciertamente no tomó á los ángeles, sino á la simiente de Abraham tomó.",
  "17": "Por lo cual, debía ser en todo semejante á los hermanos, para venir á ser misericordioso y fiel Pontífice en lo que es para con Dios, para expiar los pecados del pueblo."
 },
 "hebreos-4": {
  "1": "TEMAMOS, pues, que quedando aún la promesa de entrar en su reposo, parezca alguno de vosotros haberse apartado.",
  "2": "Porque también á nosotros se nos ha evangelizado como á ellos; mas no les aprovechó el oir la palabra á los que la oyeron sin mezclar fe.",
  "3": "Empero entramos en el reposo los que hemos creído, de la manera que dijo: Como juré en mi ira, No entrarán en mi reposo: aun acabadas las obras desde el principio del mundo.",
  "4": "Porque en un cierto lugar dijo así del séptimo día: Y reposó Dios de todas sus obras en el séptimo día.",
  "5": "Y otra vez aquí: No entrarán en mi reposo.",
  "6": "Así que, pues que resta que algunos han de entrar en él, y aquellos á quienes primero fué anunciado no entraron por causa de desobediencia,",
  "7": "Determina otra vez un cierto día, diciendo por David: Hoy, después de tanto tiempo; como está dicho: Si oyereis su voz hoy, No endurezcáis vuestros corazones.",
  "8": "Porque si Josué les hubiera dado el reposo, no hablaría después de otro día.",
  "9": "Por tanto, queda un reposo para el pueblo de Dios.",
  "10": "Porque el que ha entrado en su reposo, también él ha reposado de sus obras, como Dios de las suyas.",
  "11": "Procuremos pues de entrar en aquel reposo; que ninguno caiga en semejante ejemplo de desobediencia.",
  "12": "Porque la palabra de Dios es viva y eficaz, y más penetrante que toda espada de dos filos: y que alcanza hasta partir el alma, y aun el espíritu, y las coyunturas y tuétanos, y discierne los pensamientos y las intenciones del corazón.",
  "14": "Por tanto, teniendo un gran Pontífice, que penetró los cielos, Jesús el Hijo de Dios, retengamos nuestra profesión.",
  "15": "Porque no tenemos un Pontífice que no se pueda compadecer de nuestras flaquezas; mas tentado en todo según nuestra semejanza, pero sin pecado.",
  "16": "Lleguémonos pues confiadamente al trono de la gracia, para alcanzar misericordia, y hallar gracia para el oportuno socorro."
 },
 "hebreos-7": {
  "21": "Porque los otros cierto sin juramento fueron hechos sacerdotes; mas éste, con juramento por el que le dijo: Juró el Señor, y no se arrepentirá: Tú eres sacerdote eternamente Según el orden de Melchîsedec:",
  "22": "Tanto de mejor testamento es hecho fiador Jesús.",
  "23": "Y los otros cierto fueron muchos sacerdotes, en cuanto por la muerte no podían permanecer.",
  "24": "Mas éste, por cuanto permanece para siempre, tiene un sacerdocio inmutable:",
  "25": "Por lo cual puede también salvar eternamente á los que por él se allegan á Dios, viviendo siempre para interceder por ellos."
 },
 "hebreos-8": {
  "1": "Asi que, la suma acerca de lo dicho es: Tenemos tal pontífice que se asentó á la diestra del trono de la Majestad en los cielos;",
  "2": "Ministro del santuario, y de aquel verdadero tabernáculo que el Señor asentó, y no hombre.",
  "3": "Porque todo pontífice es puesto para ofrecer presentes y sacrificios; por lo cual es necesario que también éste tuviese algo que ofrecer.",
  "4": "Así que, si estuviese sobre la tierra, ni aun sería sacerdote, habiendo aún los sacerdotes que ofrecen los presentes según la ley;",
  "5": "Los cuales sirven de bosquejo y sombre de las cosas celestiales, como fué respondido á Moisés cuando había de acabar el tabernáculo: Mira, dice, haz todas las cosas conforme al dechado que te ha sido mostrado en el monte.",
  "8": "Porque reprendiéndolos dice: He aquí vienen días, dice el Señor, Y consumaré para con la casa de Israel y para con la casa de Judá un nuevo pacto;",
  "9": "No como el pacto que hice con sus padres El día que los tomé por la mano para sacarlos de la tierra de Egipto: Porque ellos no permanecieron en mi pacto, Y yo los menosprecié, dice el Señor.",
  "10": "Por lo cual, este es el pacto que ordenaré á la casa de Israel Después de aquellos días, dice el Señor: Daré mis leyes en el alma de ellos, Y sobre el corazón de ellos las escribiré; Y seré á ellos por Dios, Y ellos me serán á mí por pueblo:"
 },
 "hebreos-9": {
  "11": "Mas estando ya presente Cristo, pontífice de los bienes que habían de venir, por el más amplio y más perfecto tabernáculo, no hecho de manos, es á saber, no de esta creación;",
  "12": "Y no por sangre de machos cabríos ni de becerros, mas por su propia sangre, entró una sola vez en el santuario, habiendo obtenido eterna redención.",
  "13": "Porque si la sangre de los toros y de los machos cabríos, y la ceniza de la becerra, rociada á los inmundos, santifica para la purificación de la carne,",
  "14": "¿Cuánto más la sangre de Cristo, el cual por el Espíritu eterno se ofreció á sí mismo sin mancha á Dios, limpiará vuestras conciencias de las obras de muerte para que sirváis al Dios vivo?",
  "15": "Así que, por eso es mediador del nuevo testamento, para que interviniendo muerte para la remisión de las rebeliones que había bajo del primer testamento, los que son llamados reciban la promesa de la herencia eterna.",
  "16": "Porque donde hay testamento, necesario es que intervenga muerte del testador.",
  "17": "Porque el testamento con la muerte es confirmado; de otra manera no es válido entre tanto que el testador vive.",
  "18": "De donde vino que ni aun el primero fué consagrado sin sangre.",
  "19": "Porque habiendo leído Moisés todos los mandamientos de la ley á todo el pueblo, tomando la sangre de los becerros y de los machos cabríos, con agua, y lana de grana, é hisopo, roció al mismo libro, y también á todo el pueblo,",
  "20": "Diciendo: Esta es la sangre del testamento que Dios os ha mandado.",
  "21": "Y además de esto roció también con la sangre el tabernáculo y todos los vasos del ministerio.",
  "22": "Y casi todo es purificado según la ley con sangre; y sin derramamiento de sangre no se hace remisión.",
  "23": "Fué, pues, necesario que las figuras de las cosas celestiales fuesen purificadas con estas cosas; empero las mismas cosas celestiales con mejores sacrificios que éstos.",
  "24": "Porque no entró Cristo en el santuario hecho de mano, figura del verdadero, sino en el mismo cielo para presentarse ahora por nosotros en la presencia de Dios.",
  "25": "Y no para ofrecerse muchas veces á sí mismo, como entra el pontífice en el santuario cada año con sangre ajena;",
  "26": "De otra manera fuera necesario que hubiera padecido muchas veces desde el principio del mundo: mas ahora una vez en la consumación de los siglos, para deshacimiento del pecado se presentó por el sacrificio de sí mismo.",
  "27": "Y de la manera que está establecido á los hombres que mueran una vez, y después el juicio;",
  "28": "Así también Cristo fué ofrecido una vez para agotar los pecados de muchos; y la segunda vez, sin pecado, será visto de los que le esperan para salud."
 },
 "hechos-1": {
  "8": "Mas recibiréis la virtud del Espíritu Santo que vendrá sobre vosotros; y me sereís testigos en Jerusalem, en toda Judea, y Samaria, y hasta lo último de la tierra.",
  "9": "Y habiendo dicho estas cosas, viéndo lo ellos, fué alzado; y una nube le recibió y le quitó de sus ojos.",
  "10": "Y estando con los ojos puestos en el cielo, entre tanto que él iba, he aquí dos varones se pusieron junto á ellos en vestidos blancos;",
  "11": "Los cuales también les dijeron: Varones Galileos, ¿qué estáis mirando al cielo? este mismo Jesús que ha sido tomado desde vosotros arriba en el cielo, así vendrá como le habéis visto ir al cielo."
 },
 "hechos-10": {
  "34": "Entonces Pedro, abriendo su boca, dijo: Por verdad hallo que Dios no hace acepción de personas;",
  "38": "Cuanto á Jesús de Nazaret; cómo le ungió Dios de Espíritu Santo y de potencia; el cual anduvo haciendo bienes, y sanando á todos los oprimidos del diablo; porque Dios era con él."
 },
 "hechos-16": {
  "30": "Y sacándolos fuera, le dice: Señores, ¿qué es menester que yo haga para ser salvo?",
  "31": "Y ellos dijeron: Cree en el Señor Jesucristo, y serás salvo tú, y tu casa.",
  "32": "Y le hablaron la palabra del Señor, y á todos los que estan en su casa.",
  "33": "Y tomándolos en aquella misma hora de la noche, les lavó los azotes; y se bautizó luego él, y todos los suyos."
 },
 "hechos-17": {
  "24": "El Dios que hizo el mundo y todas las cosas que en él hay, éste, como sea Señor del cielo y de la tierra, no habita en templos hechos de manos,",
  "25": "Ni es honrado con manos de hombres, necesitado de algo; pues él da á todos vida, y respiración, y todas las cosas;",
  "26": "Y de una sangre ha hecho todo el linaje de los hombres, para que habitasen sobre toda la faz de la tierra; y les ha prefijado el orden de los tiempos, y los términos de los habitación de ellos;",
  "27": "Para que buscasen á Dios, si en alguna manera, palpando, le hallen; aunque cierto no está lejos de cada uno de nosotros:",
  "28": "Porque en él vivimos, y nos movemos, y somos; como también algunos de vuestros poetas dijeron: Porque linaje de éste somos también."
 },
 "hechos-2": {
  "14": "Entonces Pedro, poniéndose en pie con los once, alzó su voz, y hablóles diciendo: Varones Judíos, y todos los que habitáis en Jerusalem, esto os sea notorio, y oid mis palabras.",
  "15": "Porque éstos no están borrachos, como vosotros pensáis, siendo la hora tercia del día;",
  "16": "Mas esto es lo que fué dicho por el profeta Joel:",
  "17": "Y será en los postreros días, dice Dios, Derramaré de mi Espíritu sobre toda carne, Y vuestros hijos y vuestras hijas profetizarán; Y vuestros mancebos verán visiones, Y vuestros viejos soñarán sueños:",
  "18": "Y de cierto sobre mis siervos y sobre mis siervas en aquellos días Derramaré de mi Espíritu, y profetizarán.",
  "19": "Y daré prodigios arriba en el cielo, Y señales abajo en la tierra, Sangre y fuego y vapor de humo:",
  "20": "El sol se volverá en tinieblas, Y la luna en sangre, Antes que venga el día del Señor, Grande y manifiesto;",
  "21": "Y será que todo aquel que invocare el nombre del Señor, será salvo.",
  "38": "Y Pedro les dice: Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados; y recibiréis el don del Espíritu Santo."
 },
 "hechos-22": {
  "16": "Ahora pues, ¿por qué te detienes? Levántate, y bautízate, y lava tus pecados, invocando su nombre.",
  "21": "Y me dijo: Ve, porque yo te tengo que enviar lejos á los Gentiles."
 },
 "hechos-6": {
  "1": "En aquellos días, creciendo el número de los discípulos, hubo murmuración de los Griegos contra los Hebreos, de que sus viudas eran menospreciadas en el ministerio cotidiano.",
  "2": "Así que, los doce convocaron la multitud de los discípulos, y dijeron: No es justo que nosotros dejemos la palabra de Dios, y sirvamos á las mesas.",
  "3": "Buscad pues, hermanos, siete varones de vosotros de buen testimonio, llenos de Espíritu Santo y de sabiduría, los cuales pongamos en esta obra.",
  "4": "Y nosotros persistiremos en la oración, y en el ministerio de la palabra.",
  "5": "Y plugo el parecer á toda la multitud; y eligieron á Esteban, varón lleno de fe y de Espíritu Santo, y á Felipe, y á Prócoro, y á Nicanor, y á Timón, y á Parmenas, y á Nicolás, prosélito de Antioquía:",
  "6": "A estos presentaron delante de los apóstoles, los cuales orando les pusieron las manos encima.",
  "7": "Y crecía la palabra del Señor, y el número de los discípulos se multiplicaba mucho en Jerusalem: también una gran multitud de los sacerdotes obedecía á la fe."
 },
 "hechos-7": {
  "38": "Este es aquél que estuvo en la congregación en el desierto con el ángel que le hablaba en el monte Sina, y con nuestros padres; y recibió las palabras de vida para darnos:"
 },
 "isaias-14": {
  "12": "Cómo caiste del cielo, oh Lucero, hijo de la mañana! Cortado fuiste por tierra, tú que debilitabas las gentes.",
  "13": "Tú que decías en tu corazón: Subiré al cielo, en lo alto junto á las estrellas de Dios ensalzaré mi solio, y en el monte del testimonio me sentaré, á los lados del aquilón;",
  "14": "Sobre las alturas de las nubes subiré, y seré semejante al Altísimo."
 },
 "isaias-35": {
  "1": "Alegrarse han el desierto y la soledad: el yermo se gozará, y florecerá como la rosa.",
  "2": "Florecerá profusamente, y también se alegrará y cantará con júbilo: la gloria del Líbano le será dada, la hermosura de Carmel y de Sarón. Ellos verán la gloria de Jehová, la hermosura del Dios nuestro.",
  "3": "Confortad á las manos cansadas, roborad las vacilantes rodillas.",
  "4": "Decid á los de corazón apocado: Confortaos, no temáis: he aquí que vuestro Dios viene con venganza, con pago: el mismo Dios vendrá, y os salvará.",
  "5": "Entonces los ojos de los ciegos serán abiertos, y los oídos de los sordos se abrirán.",
  "6": "Entonces el cojo saltará como un ciervo, y cantará la lengua del mudo; porque aguas serán cavadas en el desierto, y torrentes en la soledad.",
  "7": "El lugar seco será tornado en estanque, y el secadal en manaderos de aguas; en la habitación de chacales, en su cama, será lugar de cañas y de juncos.",
  "8": "Y habrá allí calzada y camino, y será llamado Camino de Santidad; no pasará por él inmundo; y habrá para ellos en él quien los acompañe, de tal manera que los insensatos no yerren.",
  "9": "No habrá allí león, ni bestia fiera subirá por él, ni allí se hallará, para que caminen los redimidos.",
  "10": "Y los redimidos de Jehová volverán, y vendrán á Sión con alegría; y gozo perpetuo será sobre sus cabezas: y retendrán el gozo y alegría, y huirá la tristeza y el gemido."
 },
 "isaias-41": {
  "10": "No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia."
 },
 "isaias-43": {
  "2": "Cuando pasares por las aguas, yo seré contigo; y por los ríos, no te anegarán. Cuando pasares por el fuego, no te quemarás, ni la llama arderá en ti."
 },
 "isaias-52": {
  "7": "Cuán hermosos son sobre los montes los pies del que trae alegres nuevas, del que publica la paz, del que trae nuevas del bien, del que publica salud, del que dice á Sión: Tu Dios reina!"
 },
 "isaias-53": {
  "1": "¿QUIÉN ha creído á nuestro anuncio? ¿y sobre quién se ha manifestado el brazo de Jehová?",
  "2": "Y subirá cual renuevo delante de él, y como raíz de tierra seca: no hay parecer en él, ni hermosura: verlo hemos, mas sin atractivo para que le deseemos.",
  "3": "Despreciado y desechado entre los hombres, varón de dolores, experimentado en quebranto: y como que escondimos de él el rostro, fué menospreciado, y no lo estimamos.",
  "4": "Ciertamente llevó él nuestras enfermedades, y sufrió nuestros dolores; y nosotros le tuvimos por azotado, por herido de Dios y abatido.",
  "5": "Mas él herido fué por nuestras rebeliones, molido por nuestros pecados: el castigo de nuestra paz sobre él; y por su llaga fuimos nosotros curados.",
  "6": "Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino: mas Jehová cargó en él el pecado de todos nosotros.",
  "7": "Angustiado él, y afligido, no abrió su boca: como cordero fué llevado al matadero; y como oveja delante de sus trasquiladores, enmudeció, y no abrió su boca.",
  "8": "De la cárcel y del juicio fué quitado; y su generación ¿quién la contará? Porque cortado fué de la tierra de los vivientes; por la rebelión de mi pueblo fué herido.",
  "9": "Y dipúsose con los impíos su sepultura, mas con los ricos fué en su muerte; porque nunca hizo él maldad, ni hubo engaño en su boca.",
  "10": "Con todo eso Jehová quiso quebrantarlo, sujetándole á padecimiento. Cuando hubiere puesto su vida en expiación por el pecado, verá linaje, vivirá por largos días, y la voluntad de Jehová será en su mano prosperada.",
  "11": "Del trabajo de su alma verá y será saciado; con su conocimiento justificará mi siervo justo á muchos, y él llevará las iniquidades de ellos.",
  "12": "Por tanto yo le daré parte con los grandes, y con los fuertes repartirá despojos; por cuanto derramó su vida hasta la muerte, y fué contado con los perversos, habiendo él llevado el pecado de muchos y orado por los transgresores."
 },
 "isaias-56": {
  "5": "Yo les daré lugar en mi casa y dentro de mis muros, y nombre mejor que el de hijos é hijas; nombre perpetuo les daré que nunca perecerá.",
  "6": "Y á los hijos de los extranjeros que se allegaren á Jehová para ministrarle, y que amaren el nombre de Jehová para ser sus siervos: á todos los que guardaren el sábado de profanarlo, y abrazaren mi pacto,"
 },
 "isaias-58": {
  "13": "Si retrajeres del sábado tu pie, de hacer tu voluntad en mi día santo, y al sábado llamares delicias, santo, glorioso de Jehová; y lo venerares, no hacinedo tus caminos, ni buscando tu voluntad, ni hablando tus palabras:",
  "14": "Entonces te delelitarás en Jehová; y yo te haré subir sobre las alturas de la tierra, y te daré á comer la heredad de Jacob tu padre: porque la boca de Jehová lo ha hablado."
 },
 "isaias-65": {
  "17": "Porque he aquí que yo crío nuevos cielos y nueva tierra: y de lo primero no habrá memoria, ni más vendrá al pensamiento.",
  "18": "Mas os gozaréis y os alegraréis por siglo de siglo en las cosas que yo crío: porque he aquí que yo las cosas que yo crío: porque he aquí que yo fzacrío á Jerusalem alegría, y á su pueblo gozo.",
  "19": "Y alegraréme con Jerusalem, y gozaréme con mi pueblo; y nunca más se oirán en ella voz de lloro, ni voz de clamor.",
  "20": "No habrá más allí niño de días, ni viejo que sus días no cumpla: porque el niño morirá de cien años, y el pecador de cien años, será maldito.",
  "21": "Y edificarán casas, y morarán en ellas; plantarán viñas, y comerán el fruto de ellas.",
  "22": "No edificarán, y otro morará; no plantarán, y otro comerá: porque según los días de los árboles serán los días de mi pueblo, y mis escogidos perpetuarán las obras de sus manos.",
  "23": "No trabajarán en vano, ni parirán para maldición; porque son simiente de los benditos de Jehová, y sus descendientes con ellos.",
  "24": "Y será que antes que clamen, responderé yo; aun estando ellos hablando, yo habré oído.",
  "25": "El lobo y el cordero serán apacentados juntos, y el león comerá paja como el buey; y á la serpiente el polvo será su comida. No afligirán, ni harán mal en todo mi santo monte, dijo Jehová."
 },
 "isaias-8": {
  "20": "A la ley y al testimonio! Si no dijeren conforme á esto, es porque no les ha amanecido."
 },
 "jeremias-25": {
  "11": "Y toda esta tierra será puesta en soledad, en espanto; y servirán estas gentes al rey de Babilonia setenta años.",
  "12": "Y será que, cuando fueren cumplidos los setenta años, visitaré sobre el rey de Babilonia y sobre aquella gente su maldad, ha dicho Jehová, y sobre la tierra de los Caldeos; y pondréla en desiertos para siempre."
 },
 "jeremias-4": {
  "23": "Miré la tierra, y he aquí que estaba asolada y vacía; y los cielos, y no había en ellos luz.",
  "24": "Miré los montes, y he aquí que temblaban, y todos los collados fueron destruídos.",
  "25": "Miré, y no parecía hombre, y todas las aves del cielo se habían ido.",
  "26": "Miré, y he aquí el Carmelo desierto, y todas sus ciudades eran asoladas á la presencia de Jehová, á la presencia del furor de su ira."
 },
 "joel-2": {
  "28": "Y será que después de esto, derramaré mi Espíritu sobre toda carne, y profetizarán vuestros hijos y vuestras hijas; vuestros viejos soñarán sueños, y vuestros mancebos verán visiones.",
  "29": "Y aun también sobre los siervos y sobre las siervas derramaré mi Espíritu en aquellos días."
 },
 "juan-1": {
  "1": "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
  "2": "Este era en el principio con Dios.",
  "3": "Todas las cosas por él fueron hechas; y sin él nada de lo que es hecho, fué hecho.",
  "14": "Y aquel Verbo fué hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad."
 },
 "juan-10": {
  "30": "Yo y el Padre una cosa somos."
 },
 "juan-11": {
  "11": "Dicho esto, díceles después: Lázaro nuestro amigo duerme; mas voy á despertarle del sueño.",
  "12": "Dijeron entonces sus discípulos: Señor, si duerme, salvo estará.",
  "13": "Mas esto decía Jesús de la muerte de él: y ellos pensaron que hablaba del reposar del sueño.",
  "14": "Entonces, pues, Jesús les dijo claramente: Lázaro es muerto;"
 },
 "juan-13": {
  "1": "Antes de la fiesta de la Pascua, sabiendo Jesús que su hora había venido para que pasase de este mundo al Padre, como había amado á los suyos que estaban en el mundo, amólos hasta el fin.",
  "2": "Y la cena acabada, como el diablo ya había metido en el corazón de Judas, hijo de Simón Iscariote, que le entregase,",
  "3": "Sabiendo Jesús que el Padre le había dado todas las cosas en las manos, y que había salido de Dios, y á Dios iba,",
  "4": "Levántase de la cena, y quítase su ropa, y tomando una toalla, ciñóse.",
  "5": "Luego puso agua en un lebrillo, y comenzó á lavar los pies de los discípulos, y á limpiarlos con la toalla con que estaba ceñido.",
  "6": "Entonces vino á Simón Pedro; y Pedro le dice: ¿Señor, tú me lavas los pies?",
  "7": "Respondió Jesús, y díjole: Lo que yo hago, tú no entiendes ahora; mas lo entenderás después.",
  "8": "Dícele Pedro: No me lavarás los pies jamás. Respondióle Jesús: Si no te lavare, no tendrás parte conmigo.",
  "9": "Dícele Simón Pedro: Señor, no sólo mis pies, mas aun las manos y la cabeza.",
  "10": "Dícele Jesús: El que está lavado, no necesita sino que lave los pies, mas está todo limpio: y vosotros limpios estáis, aunque no todos.",
  "11": "Porque sabía quién le había de entregar; por eso dijo: No estáis limpios todos.",
  "12": "Así que, después que les hubo lavado los pies, y tomado su ropa, volviéndose á sentar á la mesa, díjoles: ¿Sabéis lo que os he hecho?",
  "13": "Vosotros me llamáis, Maestro, y, Señor: y decís bien; porque lo soy.",
  "14": "Pues si yo, el Señor y el Maestro, he lavado vuestros pies, vosotros también debéis lavar los pies los unos á los otros.",
  "15": "Porque ejemplo os he dado, para que como yo os he hecho, vosotros también hagáis.",
  "16": "De cierto, de cierto os digo: El siervo no es mayor que su señor, ni el apóstol es mayor que el que le envió.",
  "17": "Si sabéis estas cosas, bienaventurados seréis, si las hiciereis."
 },
 "juan-14": {
  "1": "No se turbe vuestro corazón; creéis en Dios, creed también en mí.",
  "2": "En la casa de mi Padre muchas moradas hay: de otra manera os lo hubiera dicho: voy, pues, á preparar lugar para vosotros.",
  "3": "Y si me fuere, y os aparejare lugar, vendré otra vez, y os tomaré á mí mismo: para que donde yo estoy, vosotros también estéis.",
  "9": "Jesús le dice: ¿Tanto tiempo ha que estoy con vosotros, y no me has conocido, Felipe? El que me ha visto, ha visto al Padre; ¿cómo, pues, dices tú: Muéstranos el Padre?",
  "16": "Y yo rogaré al Padre, y os dará otro Consolador, para que esté con vosotros para siempre:",
  "17": "Al Espíritu de verdad, al cual el mundo no puede recibir, porque no le ve, ni le conoce: mas vosotros le conocéis; porque está con vosotros, y será en vosotros.",
  "18": "No os dejaré huérfanos: vendré á vosotros.",
  "26": "Mas el Consolador, el Espíritu Santo, al cual el Padre enviará en mi nombre, él os enseñará todas las cosas, y os recordará todas las cosas que os he dicho."
 },
 "juan-15": {
  "7": "Si estuviereis en mí, y mis palabras estuvieren en vosotros, pedid todo lo que quisiereis, y os será hecho.",
  "8": "En esto es glorificado mi Padre, en que llevéis mucho fruto, y seáis así mis discípulos.",
  "9": "Como el Padre me amó, también yo os he amado: estad en mi amor.",
  "10": "Si guardareis mis mandamientos, estaréis en mi amor; como yo también he guardado los mandamientos de mi Padre, y estoy en su amor.",
  "26": "Empero cuando viniere el Consolador, el cual yo os enviaré del Padre, el Espíritu de verdad, el cual procede del Padre, él dará testimonio de mí.",
  "27": "Y vosotros daréis testimonio, porque estáis conmigo desde el principio."
 },
 "juan-16": {
  "7": "Empero yo os digo la verdad: Os es necesario que yo vaya: porque si yo no fuese, el Consolador no vendría á vosotros; mas si yo fuere, os le enviaré.",
  "8": "Y cuando él viniere redargüirá al mundo de pecado, y de justicia, y de juicio:",
  "9": "De pecado ciertamente, por cuanto no creen en mí;",
  "10": "Y de justicia, por cuanto voy al Padre, y no me veréis más;",
  "11": "Y de juicio, por cuanto el príncipe de este mundo es juzgado.",
  "12": "Aun tengo muchas cosas que deciros, mas ahora no las podéis llevar.",
  "13": "Pero cuando viniere aquel Espíritu de verdad, él os guiará á toda verdad; porque no hablará de sí mismo, sino que hablará todo lo que oyere, y os hará saber las cosas que han de venir."
 },
 "juan-17": {
  "17": "Santifícalos en tu verdad: tu palabra es verdad."
 },
 "juan-2": {
  "1": "Y AL tercer día hiciéronse unas bodas en Caná de Galilea; y estaba allí la madre de Jesús.",
  "2": "Y fué también llamado Jesús y sus discípulos á las bodas.",
  "3": "Y faltando el vino, la madre de Jesús le dijo: Vino no tienen.",
  "4": "Y dícele Jesús: ¿Qué tengo yo contigo, mujer? aun no ha venido mi hora.",
  "5": "Su madre dice á los que servían: Haced todo lo que os dijere.",
  "6": "Y estaban allí seis tinajuelas de piedra para agua, conforme á la purificación de los Judíos, que cabían en cada una dos ó tres cántaros.",
  "7": "Díceles Jesús: Henchid estas tinajuelas de agua. E hinchiéronlas hasta arriba.",
  "8": "Y díceles: Sacad ahora, y presentad al maestresala. Y presentáron le.",
  "9": "Y como el maestresala gustó el agua hecha vino, que no sabía de dónde era (mas lo sabían los sirvientes que habían sacado el agua), el maestresala llama al esposo,",
  "10": "Y dícele: Todo hombre pone primero el buen vino, y cuando están satisfechos, entonces lo que es peor; mas tú has guardado el buen vino hasta ahora.",
  "11": "Este principio de señales hizo Jesús en Caná de Galilea, y manifestó su gloria; y sus discípulos creyeron en él."
 },
 "juan-20": {
  "21": "Entonces les dijo Jesús otra vez: Paz á vosotros: como me envió el Padre, así también yo os envío."
 },
 "juan-3": {
  "4": "Dícele Nicodemo: ¿Cómo puede el hombre nacer siendo viejo? ¿puede entrar otra vez en el vientre de su madre, y nacer?",
  "16": "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
 },
 "juan-5": {
  "22": "Porque el Padre á nadie juzga, mas todo el juicio dió al Hijo;",
  "28": "No os maravilléis de esto; porque vendrá hora, cuando todos los que están en los sepulcros oirán su voz;",
  "29": "Y los que hicieron bien, saldrán á resurrección de vida; mas los que hicieron mal, á resurrección de condenación."
 },
 "juan-6": {
  "48": "Yo soy el pan de vida.",
  "49": "Vuestros padres comieron el maná en el desierto, y son muertos.",
  "50": "Este es el pan que desciende del cielo, para que el que de él comiere, no muera.",
  "51": "Yo soy el pan vivo que he descendido del cielo: si alguno comiere de este pan, vivirá para siempre; y el pan que yo daré es mi carne, la cual yo daré por la vida del mundo.",
  "52": "Entonces los Judíos contendían entre sí, diciendo: ¿Cómo puede éste darnos su carne á comer?",
  "53": "Y Jesús les dijo: De cierto, de cierto os digo: Si no comiereis la carne del Hijo del hombre, y bebiereis su sangre, no tendréis vida en vosotros.",
  "54": "El que come mi carne y bebe mi sangre, tiene vida eterna: y yo le resucitaré en el día postrero.",
  "55": "Porque mi carne es verdadera comida, y mi sangre es verdadera bebida.",
  "56": "El que come mi carne y bebe mi sangre, en mí permanece, y yo en él.",
  "57": "Como me envió el Padre viviente, y yo vivo por el Padre, asimismo el que me come, él también vivirá por mí.",
  "58": "Este es el pan que descendió del cielo: no como vuestros padres comieron el maná, y son muertos: el que come de este pan, vivirá eternamente.",
  "59": "Estas cosas dijo en la sinagoga, enseñando en Capernaum.",
  "60": "Y muchos de sus discípulos oyéndo lo, dijeron: Dura es esta palabra: ¿quién la puede oir?",
  "61": "Y sabiendo Jesús en sí mismo que sus discípulos murmuraban de esto, díjoles: ¿Esto os escandaliza?",
  "62": "¿Pues qué, si viereis al Hijo del hombre que sube donde estaba primero?",
  "63": "El espíritu es el que da vida; la carne nada aprovecha: las palabras que yo os he hablado, son espíritu y son vida."
 },
 "judas-1": {
  "3": "Amados, por la gran solicitud que tenía de escribiros de la común salud, me ha sido necesario escribiros amonestándoos que contendáis eficazmente por la fe que ha sido una vez dada á los santos.",
  "14": "De los cuales también profetizó Enoc, séptimo desde Adam, diciendo: He aquí, el Señor es venido con sus santos millares,"
 },
 "levitico-11": {
  "1": "Y HABLO Jehová á Moisés y á Aarón, diciéndoles:",
  "2": "Hablad á los hijos de Israel, diciendo: Estos son los animales que comeréis de todos los animales que están sobre la tierra.",
  "3": "De entre los animales, todo el de pezuña, y que tiene las pezuñas hendidas, y que rumia, éste comeréis.",
  "4": "Estos empero no comeréis de los que rumian y de los que tienen pezuña: el camello, porque rumia mas no tiene pezuña hendida, habéis de tenerlo por inmundo;",
  "5": "También el conejo, porque rumia, mas no tiene pezuña, tendréislo por inmundo;",
  "6": "Asimismo la liebre, porque rumia, mas no tiene pezuña, tendréisla por inmunda;",
  "7": "También el puerco, porque tiene pezuñas, y es de pezuñas hendidas, mas no rumia, tendréislo por inmundo.",
  "8": "De la carne de ellos no comeréis, ni tocaréis su cuerpo muerto: tendréislos por inmundos.",
  "9": "Esto comeréis de todas las cosas que están en las aguas: todas las cosas que tienen aletas y escamas en las aguas de la mar, y en los ríos, aquellas comeréis;",
  "10": "Mas todas las cosas que no tienen aletas ni escamas en la mar y en los ríos, así de todo reptil de agua como de toda cosa viviente que está en las aguas, las tendréis en abominación.",
  "11": "Os serán, pues, en abominación: de su carne no comeréis, y abominaréis sus cuerpos muertos.",
  "12": "Todo lo que no tuviere aletas y escamas en las aguas, tendréislo en abominación.",
  "13": "Y de las aves, éstas tendréis en abominación; no se comerán, serán abominación: el águila, el quebrantahuesos, el esmerejón,",
  "14": "El milano, y el buitre según su especie;",
  "15": "Todo cuervo según su especie;",
  "16": "El avestruz, y la lechuza, y el laro, y el gavilán según su especie;",
  "17": "Y el buho, y el somormujo, y el ibis,",
  "18": "Y el calamón, y el cisne, y el onocrótalo,",
  "19": "Y el herodión, y el caradrión, según su especie, y la abubilla, y el murciélago.",
  "20": "Todo reptil alado que anduviere sobre cuatro pies, tendréis en abominación.",
  "21": "Empero esto comeréis de todo reptil alado que anda sobre cuatro pies, que tuviere piernas además de sus pies para saltar con ellas sobre la tierra;",
  "22": "Estos comeréis de ellos: la langosta según su especie, y el langostín según su especie, y el aregol según su especie, y el haghab según su especie.",
  "23": "Todo reptil alado que tenga cuatro pies, tendréis en abominación.",
  "24": "Y por estas cosas seréis inmundos: cualquiera que tocare á sus cuerpos muertos, será inmundo hasta la tarde:",
  "25": "Y cualquiera que llevare de sus cuerpos muertos, lavará sus vestidos, y será inmundo hasta la tarde.",
  "26": "Todo animal de pezuña, pero que no tiene pezuña hendida, ni rumia, tendréis por inmundo: cualquiera que los tocare será inmundo.",
  "27": "Y de todos los animales que andan á cuatro pies, tendréis por inmundo cualquiera que ande sobre sus garras: cualquiera que tocare sus cuerpos muertos, será inmundo hasta la tarde.",
  "28": "Y el que llevare sus cuerpos muertos, lavará sus vestidos, y será inmundo hasta la tarde: habéis de tenerlos por inmundos.",
  "29": "Y estos tendréis por inmundos de los reptiles que van arrastrando sobre la tierra: la comadreja, y el ratón, y la rana según su especie,",
  "30": "Y el erizo, y el lagarto, y el caracol, y la babosa, y el topo.",
  "31": "Estos tendréis por inmundos de todos los reptiles: cualquiera que los tocare, cuando estuvieren muertos, será inmundo hasta la tarde.",
  "32": "Y todo aquello sobre que cayere alguno de ellos después de muertos, será inmundo; así vaso de madera, como vestido, ó piel, ó saco, cualquier instrumento con que se hace obra, será metido en agua, y será inmundo hasta la tarde, y así será limpio.",
  "33": "Y toda vasija de barro dentro de la cual cayere alguno de ellos, todo lo que estuviere en ella será inmundo, y quebraréis la vasija:",
  "34": "Toda vianda que se come, sobre la cual viniere el agua de tales vasijas, será inmunda: y toda bebida que se bebiere, será en todas esas vasijas inmunda:",
  "35": "Y todo aquello sobre que cayere algo del cuerpo muerto de ellos, será inmundo: el horno ú hornillos se derribarán; son inmundos, y por inmundos los tendréis.",
  "36": "Con todo, la fuente y la cisterna donde se recogen aguas, serán limpias: mas lo que hubiere tocado en sus cuerpos muertos será inmundo.",
  "37": "Y si cayere de sus cuerpos muertos sobre alguna simiente que se haya de sembrar, será limpia.",
  "38": "Mas si se hubiere puesto agua en la simiente, y cayere de sus cuerpos muertos sobre ella, tendréisla por inmunda.",
  "39": "Y si algún animal que tuviereis para comer se muriere, el que tocare su cuerpo muerto será inmundo hasta la tarde:",
  "40": "Y el que comiere de su cuerpo muerto, lavará sus vestidos, y será inmundo hasta la tarde: asimismo el que sacare su cuerpo muerto, lavará sus vestidos, y será inmundo hasta la tarde.",
  "41": "Y todo reptil que va arrastrando sobre la tierra, es abominación; no se comerá.",
  "42": "Todo lo que anda sobre el pecho, y todo lo que anda sobre cuatro ó más pies, de todo reptil que anda arrastrando sobre la tierra, no lo comeréis, porque es abominación.",
  "43": "No ensuciéis vuestras personas con ningún reptil que anda arrastrando, ni os contaminéis con ellos, ni seáis inmundos por ellos.",
  "44": "Pues que yo soy Jehová vuestro Dios, vosotros por tanto os santificaréis, y seréis santos, porque yo soy santo: así que no ensuciéis vuestras personas con ningún reptil que anduviere arrastrando sobre la tierra.",
  "45": "Porque yo soy Jehová, que os hago subir de la tierra de Egipto para seros por Dios: seréis pues santos, porque yo soy santo.",
  "46": "Esta es la ley de los animales y de las aves, y de todo ser viviente que se mueve en las aguas, y de todo animal que anda arrastrando sobre la tierra;",
  "47": "Para hacer diferencia entre inmundo y limpio, y entre los animales que se pueden comer y los animales que no se pueden comer."
 },
 "levitico-16": {
  "1": "Y HABLO Jehová á Moisés, después que murieron los dos hijos de Aarón, cuando se llegaron delante de Jehová, y murieron;",
  "2": "Y Jehová dijo á Moisés: Di á Aarón tu hermano, que no en todo tiempo entre en el santuario del velo adentro, delante de la cubierta que está sobre el arca, para que no muera: porque yo apareceré en la nube sobre la cubierta.",
  "3": "Con esto entrará Aarón en el santuario: con un becerro por expiación, y un carnero en holocausto.",
  "4": "La túnica santa de lino se vestirá, y sobre su carne tendrá pañetes de lino, y ceñiráse el cinto de lino; y con la mitra de lino se cubrirá: son las santas vestiduras: con ellas, después de lavar su carne con agua, se ha de vestir.",
  "5": "Y de la congregación de los hijos de Israel tomará dos machos de cabrío para expiación, y un carnero para holocausto.",
  "6": "Y hará allegar Aarón el becerro de la expiación, que es suyo, y hará la reconciliación por sí y por su casa.",
  "7": "Después tomará los dos machos de cabrío, y los presentará delante de Jehová á la puerta del tabernáculo del testimonio.",
  "8": "Y echará suertes Aarón sobre los dos machos de cabrío; la una suerte por Jehová, y la otra suerte por Azazel.",
  "9": "Y hará allegar Aarón el macho cabrío sobre el cual cayere la suerte por Jehová, y ofrecerálo en expiación.",
  "10": "Mas el macho cabrío, sobre el cual cayere la suerte por Azazel, lo presentará vivo delante de Jehová, para hacer la reconciliación sobre él, para enviarlo á Azazel al desierto.",
  "11": "Y hará llegar Aarón el becerro que era suyo para expiación, y hará la reconciliación por sí y por su casa, y degollará en expiación el becerro que es suyo.",
  "12": "Después tomará el incensario lleno de brasas de fuego, del altar de delante de Jehová, y sus puños llenos del perfume aromático molido, y meterálo del velo adentro:",
  "13": "Y pondrá el perfume sobre el fuego delante de Jehová, y la nube del perfume cubrirá la cubierta que está sobre el testimonio, y no morirá.",
  "14": "Tomará luego de la sangre del becerro, y rociará con su dedo hacia la cubierta al lado oriental: hacia la cubierta esparcirá siete veces de aquella sangre con su dedo.",
  "15": "Después degollará en expiación el macho cabrío, que era del pueblo, y meterá la sangre de él del velo adentro; y hará de su sangre como hizo de la sangre del becerro, y esparcirá sobre la cubierta y delante de la cubierta:",
  "16": "Y limpiará el santuario, de las inmundicias de los hijos de Israel, y de sus rebeliones, y de todos sus pecados: de la misma manera hará también al tabernáculo del testimonio, el cual reside entre ellos en medio de sus inmundicias.",
  "17": "Y ningún hombre estará en el tabernáculo del testimonio cuando él entrare á hacer la reconciliación en el santuario, hasta que él salga, y haya hecho la reconciliación por sí, y por su casa, y por toda la congregación de Israel.",
  "18": "Y saldrá al altar que está delante de Jehová, y lo expiará; y tomará de la sangre del becerro, y de la sangre del macho cabrío, y pondrá sobre los cuernos del altar alrededor.",
  "19": "Y esparcirá sobre él de la sangre con su dedo siete veces, y lo limpiará, y lo santificará de las inmundicias de los hijos de Israel.",
  "20": "Y cuando hubiere acabado de expiar el santuario, y el tabernáculo del testimonio, y el altar, hará llegar el macho cabrío vivo:",
  "21": "Y pondrá Aarón ambas manos suyas sobre la cabeza del macho cabrío vivo, y confesará sobre él todas las iniquidades de los hijos de Israel, y todas sus rebeliones, y todos sus pecados, poniéndolos así sobre la cabeza del macho cabrío, y lo enviará al desierto por mano de un hombre destinado para esto.",
  "22": "Y aquel macho cabrío llevará sobre sí todas las iniquidades de ellos á tierra inhabitada: y dejará ir el macho cabrío por el desierto.",
  "23": "Después vendrá Aarón al tabernáculo del testimonio, y se desnudará las vestimentas de lino, que había vestido para entrar en el santuario, y pondrálas allí.",
  "24": "Lavará luego su carne con agua en el lugar del santuario, y después de ponerse sus vestidos saldrá, y hará su holocausto, y el holocausto del pueblo, y hará la reconciliación por sí y por el pueblo.",
  "25": "Y quemará el sebo de la expiación sobre el altar.",
  "26": "Y el que hubiere llevado el macho cabrío á Azazel, lavará sus vestidos, lavará también con agua su carne, y después entrará en el real.",
  "27": "Y sacará fuera del real el becerro del pecado, y el macho cabrío de la culpa, la sangre de los cuales fué metida para hacer la expiación en el santuario; y quemarán en el fuego sus pellejos, y sus carnes, y su estiércol.",
  "28": "Y el que los quemare, lavará sus vestidos, lavará también su carne con agua, y después entrará en el real.",
  "29": "Y esto tendréis por estatuto perpetuo: En el mes séptimo, á los diez del mes, afligiréis vuestras almas, y ninguna obra haréis, ni el natural ni el extranjero que peregrina entre vosotros:",
  "30": "Porque en este día se os reconciliará para limpiaros; y seréis limpios de todos vuestros pecados delante de Jehová.",
  "31": "Sábado de reposo es para vosotros, y afligiréis vuestras almas, por estatuto perpetuo.",
  "32": "Y hará la reconciliación el sacerdote que fuere ungido, y cuya mano hubiere sido llena para ser sacerdote en lugar de su padre; y se vestirá las vestimentas de lino, las vestiduras sagradas:",
  "33": "Y expiará el santuario santo, y el tabernáculo del testimonio; expiará también el altar, y á los sacerdotes, y á todo el pueblo de la congregación.",
  "34": "Y esto tendréis por estatuto perpetuo, para expiar á los hijos de Israel de todos sus pecados una vez en el año. Y Moisés lo hizo como Jehová le mandó."
 },
 "levitico-23": {
  "32": "Sábado de reposo será á vosotros, y afligiréis vuestras almas, comenzando á los nueve del mes en la tarde: de tarde á tarde holgaréis vuestro sábado."
 },
 "lucas-1": {
  "35": "Y respondiendo el ángel le dijo: El Espíritu Santo vendrá sobre ti, y la virtud del Altísimo te hará sombra; por lo cual también lo Santo que nacerá, será llamado Hijo de Dios."
 },
 "lucas-10": {
  "17": "Y volvieron los setenta con gozo, diciendo: Señor, aun los demonios se nos sujetan en tu nombre.",
  "18": "Y les dijo: Yo veía á Satanás, como un rayo, que caía del cielo.",
  "19": "He aquí os doy potestad de hollar sobre las serpientes y sobre los escorpiones, y sobre toda fuerza del enemigo, y nada os dañará.",
  "20": "Mas no os gocéis de esto, que los espíritus se os sujetan; antes gozaos de que vuestros nombres están escritos en los cielos."
 },
 "lucas-12": {
  "15": "Y díjoles: Mirad, y guardaos de toda avaricia; porque la vida del hombre no consiste en la abundancia de los bienes que posee."
 },
 "lucas-16": {
  "18": "Cualquiera que repudia á su mujer, y se casa con otra, adultera: y el que se casa con la repudiada del marido, adultera."
 },
 "lucas-17": {
  "5": "Y dijeron los apóstoles al Señor: Auméntanos la fe."
 },
 "lucas-2": {
  "46": "Y aconteció, que tres días después le hallaron en el templo, sentado en medio de los doctores, oyéndoles y preguntándoles.",
  "47": "Y todos los que le oían, se pasmaban de su entendimiento y de sus respuestas."
 },
 "lucas-21": {
  "1": "Y MIRANDO, vió á los ricos que echaban sus ofrendas en el gazofilacio.",
  "2": "Y vió también una viuda pobrecilla, que echaba allí dos blancas.",
  "3": "Y dijo: De verdad os digo, que esta pobre viuda echó más que todos:",
  "4": "Porque todos estos, de lo que les sobra echaron para las ofrendas de Dios; mas ésta de su pobreza echó todo el sustento que tenía.",
  "5": "Y á unos que decían del templo, que estaba adornado de hermosas piedras y dones, dijo:",
  "6": "Estas cosas que veis, días vendrán que no quedará piedra sobre piedra que no sea destruída.",
  "7": "Y le preguntaron, diciendo: Maestro, ¿cuándo será esto? ¿y qué señal habrá cuando estas cosas hayan de comenzar á ser hechas?",
  "8": "El entonces dijo: Mirad, no seáis engañados; porque vendrán muchos en mi nombre, diciendo: Yo soy; y, el tiempo está cerca: por tanto, no vayáis en pos de ellos.",
  "9": "Empero cuando oyereis guerras y sediciones, no os espantéis; porque es necesario que estas cosas acontezcan primero: mas no luego será el fin.",
  "10": "Entonces les dijo: Se levantará gente contra gente, y reino contra reino;",
  "11": "Y habrá grandes terremotos, y en varios lugares hambres y pestilencias: y habrá espantos y grandes señales del cielo.",
  "12": "Mas antes de todas estas cosas os echarán mano, y perseguirán, entregándoos á las sinagogas y á las cárceles, siendo llevados á los reyes y á los gobernadores por causa de mi nombre.",
  "13": "Y os será para testimonio.",
  "14": "Poned pues en vuestros corazones no pensar antes cómo habéis de responder:",
  "15": "Porque yo os daré boca y sabiduría, á la cual no podrán resistir ni contradecir todos los que se os opondrán.",
  "16": "Mas seréis entregados aun de vuestros padres, y hermanos, y parientes, y amigos; y matarán á algunos de vosotros.",
  "17": "Y seréis aborrecidos de todos por causa de mi nombre.",
  "18": "Mas un pelo de vuestra cabeza no perecerá.",
  "19": "En vuestra paciencia poseeréis vuestras almas.",
  "20": "Y cuando viereis á Jerusalem cercada de ejércitos, sabed entonces que su destrucción ha llegado.",
  "21": "Entonces los que estuvieren en Judea, huyan á los montes; y los que en medio de ella, váyanse; y los que estén en los campos, no entren en ella.",
  "22": "Porque estos son días de venganza: para que se cumplan todas las cosas que están escritas.",
  "23": "Mas ­ay de las preñadas, y de las que crían en aquellos días! porque habrá apuro grande sobre la tierra é ira en este pueblo.",
  "24": "Y caerán á filo de espada, y serán llevados cautivos á todas las naciones: y Jerusalem será hollada de las gentes, hasta que los tiempos de las gentes sean cumplidos.",
  "25": "Entonces habrá señales en el sol, y en la luna, y en las estrellas; y en la tierra angustia de gentes por la confusión del sonido de la mar y de las ondas:",
  "26": "Secándose los hombres á causa del temor y expectación de las cosas que sobrevendrán á la redondez de la tierra: porque las virtudes de los cielos serán conmovidas.",
  "27": "Y entonces verán al Hijo del hombre, que vendrá en una nube con potestad y majestad grande.",
  "28": "Y cuando estas cosas comenzaren á hacerse, mirad, y levantad vuestras cabezas, porque vuestra redención está cerca.",
  "29": "Y díjoles una parábola: Mirad la higuera y todos los árboles:",
  "30": "Cuando ya brotan, viéndolo, de vosotros mismos entendéis que el verano está ya cerca.",
  "31": "Así también vosotros, cuando viereis hacerse estas cosas, entended que está cerca el reino de Dios.",
  "32": "De cierto os digo, que no pasará esta generación hasta que todo sea hecho.",
  "33": "El cielo y la tierra pasarán; mas mis palabras no pasarán.",
  "34": "Y mirad por vosotros, que vuestros corazones no sean cargados de glotonería y embriaguez, y de los cuidados de esta vida, y venga de repente sobre vosotros aquel día.",
  "35": "Porque como un lazo vendrá sobre todos los que habitan sobre la faz de toda la tierra.",
  "36": "Velad pues, orando en todo tiempo, que seáis tenidos por dignos de evitar todas estas cosas que han de venir, y de estar en pie delante del Hijo del hombre.",
  "37": "Y enseñaba de día en el templo; y de noche saliendo, estábase en el monte que se llama de las Olivas.",
  "38": "Y todo el pueblo venía á él por la mañana, para oirle en el templo."
 },
 "lucas-4": {
  "16": "Y vino á Nazaret, donde había sido criado; y entró, conforme á su costumbre, el día del sábado en la sinagoga, y se levantó á leer.",
  "18": "El Espíritu del Señor es sobre mí, Por cuanto me ha ungido para dar buenas nuevas á los pobres: Me ha enviado para sanar á los quebrantados de corazón; Para pregonar á los cautivos libertad, Y á los ciegos vista; Para poner en libertad á los quebrantados:"
 },
 "malaquias-3": {
  "8": "¿Robará el hombre á Dios? Pues vosotros me habéis robado. Y dijisteis: ¿En qué te hemos robado? Los diezmos y las primicias.",
  "9": "Malditos sois con maldición, porque vosotros, la nación toda, me habéis robado.",
  "10": "Traed todos los diezmos al alfolí, y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos, y vaciaré sobre vosotros bendición hasta que sobreabunde.",
  "11": "Increparé también por vosotros al devorador, y no os corromperá el fruto de la tierra; ni vuestra vid en el campo abortará, dice Jehová de los ejércitos.",
  "12": "Y todas las gentes os dirán bienaventurados; porque seréis tierra deseable, dice Jehová de los ejércitos.",
  "16": "Entonces los que temen á Jehová hablaron cada uno á su compañero; y Jehová escuchó y oyó, y fué escrito libro de memoria delante de él para los que temen á Jehová, y para los que piensan en su nombre."
 },
 "malaquias-4": {
  "1": "Porque he aquí, viene el día ardiente como un horno; y todos los soberbios, y todos los que hacen maldad, serán estopa; y aquel día que vendrá, los abrasará, ha dicho Jehová de los ejércitos, el cual no les dejará ni raíz ni rama.",
  "5": "He aquí, yo os envío á Elías el profeta, antes que venga el día de Jehová grande y terrible.",
  "6": "El convertirá el corazón de los padres á los hijos, y el corazón de los hijos á los padres: no sea que yo venga, y con destrucción hiera la tierra."
 },
 "marcos-1": {
  "32": "Y cuando fué la tarde, luego que el sol se puso, traían á él todos los que tenían mal, y endemoniados;"
 },
 "marcos-10": {
  "11": "Y les dice: Cualquiera que repudiare á su mujer, y se casare con otra, comete adulterio contra ella:",
  "12": "Y si la mujer repudiare á su marido y se casare con otro, comete adulterio."
 },
 "marcos-13": {
  "1": "Y SALIENDO del templo, le dice uno de sus discípulos: Maestro, mira qué piedras, y qué edificios.",
  "2": "Y Jesús respondiendo, le dijo: ¿Ves estos grandes edificios? no quedará piedra sobre piedra que no sea derribada.",
  "3": "Y sentándose en el monte de las Olivas delante del templo, le preguntaron aparte Pedro y Jacobo y Juan y Andrés:",
  "4": "Dinos, ¿cuándo serán estas cosas? ¿y qué señal habrá cuando todas estas cosas han de cumplirse?",
  "5": "Y Jesús respondiéndoles, comenzó á decir: Mirad, que nadie os engañe;",
  "6": "Porque vendrán muchos en mi nombre, diciendo: Yo soy el Cristo; y engañaran á muchos.",
  "7": "Mas cuando oyereis de guerras y de rumores de guerras no os turbéis, porque conviene hacerse así; mas aun no será el fin.",
  "8": "Porque se levantará nación contra nación, y reino contra reino; y habrá terremotos en muchos lugares, y habrá hambres y alborotos; principios de dolores serán estos.",
  "9": "Mas vosotros mirad por vosotros: porque os entregarán en los concilios, y en sinagogas seréis azotados: y delante de presidentes y de reyes seréis llamados por causa de mí, en testimonio á ellos.",
  "10": "Y á todas las gentes conviene que el evangelio sea predicado antes.",
  "11": "Y cuando os trajeren para entregaros, no premeditéis qué habéis de decir, ni lo penséis: mas lo que os fuere dado en aquella hora, eso hablad; porque no sois vosotros los que habláis, sino el Espíritu Santo.",
  "12": "Y entregará á la muerte el hermano al hermano, y el padre al hijo: y se levantarán los hijos contra los padres, y los matarán.",
  "13": "Y seréis aborrecidos de todos por mi nombre: mas el que perseverare hasta el fin, éste será salvo.",
  "14": "Empero cuando viereis la abominación de asolamiento, que fué dicha por el profeta Daniel, que estará donde no debe (el que lee, entienda), entonces los que estén en Judea huyan á los montes;",
  "15": "Y el que esté sobre el terrado, no descienda á la casa, ni entre para tomar algo de su casa;",
  "16": "Y el que estuviere en el campo, no vuelva atrás á tomar su capa.",
  "17": "Mas ­ay de las preñadas, y de las que criaren en aquellos días!",
  "18": "Orad pues, que no acontezca vuestra huída en invierno.",
  "19": "Porque aquellos días serán de aflicción, cual nunca fué desde el principio de la creación que crió Dios, hasta este tiempo, ni será.",
  "20": "Y si el Señor no hubiese abreviado aquellos días, ninguna carne se salvaría; mas por causa de los escogidos que él escogió, abrevió aquellos días.",
  "21": "Y entonces si alguno os dijere: He aquí, aquí está el Cristo; ó, He aquí, allí está, no le creáis.",
  "22": "Porque se levantarán falsos Cristos y falsos profetas, y darán señales y prodigios, para engañar, si se pudiese hacer, aun á los escogidos.",
  "23": "Mas vosotros mirad; os lo he dicho antes todo.",
  "24": "Empero en aquellos días, después de aquella aflicción, el sol se obscurecerá, y la luna no dará su resplandor;",
  "25": "Y las estrellas caerán del cielo, y las virtudes que están en los cielos serán conmovidas;",
  "26": "Y entonces verán al Hijo del hombre, que vendrá en las nubes con mucha potestad y gloria.",
  "27": "Y entonces enviará sus ángeles, y juntará sus escogidos de los cuatro vientos, desde el cabo de la tierra hasta el cabo del cielo.",
  "28": "De la higuera aprended la semejanza: Cuando su rama ya se enternece, y brota hojas, conocéis que el verano está cerca:",
  "29": "Así también vosotros, cuando viereis hacerse estas cosas, conoced que está cerca, á las puertas.",
  "30": "De cierto os digo que no pasará esta generación, que todas estas cosas no sean hechas.",
  "31": "El cielo y la tierra pasarán, mas mis palabras no pasarán.",
  "32": "Empero de aquel día y de la hora, nadie sabe; ni aun los ángeles que están en el cielo, ni el Hijo, sino el Padre.",
  "33": "Mirad, velad y orad: porque no sabéis cuándo será el tiempo.",
  "34": "Como el hombre que partiéndose lejos, dejó su casa, y dió facultad á sus siervos, y á cada uno su obra, y al portero mandó que velase:",
  "35": "Velad pues, porque no sabéis cuándo el señor de la casa vendrá; si á la tarde, ó á la media noche, ó al canto del gallo, ó á la mañana;",
  "36": "Porque cuando viniere de repente, no os halle durmiendo.",
  "37": "Y las cosas que á vosotros digo, á todos las dijo: Velad."
 },
 "marcos-5": {
  "19": "Mas Jesús no le permitió, sino le dijo: Vete á tu casa, á los tuyos, y cuéntales cuán grandes cosas el Señor ha hecho contigo, y cómo ha tenido misericordia de ti.",
  "20": "Y se fué, y comenzó á publicar en Decápolis cuan grandes cosas Jesús había hecho con él: y todos se maravillaban."
 },
 "marcos-9": {
  "23": "Y Jesús le dijo: Si puedes creer, al que cree todo es posible.",
  "24": "Y luego el padre del muchacho dijo clamando: Creo, ayuda mi incredulidad."
 },
 "mateo-12": {
  "1": "En aquel tiempo iba Jesús por los sembrados en sábado; y sus discípulos tenían hambre, y comenzaron á coger espigas, y á comer.",
  "2": "Y viéndolo los Fariseos, le dijeron: He aquí tus discípulos hacen lo que no es lícito hacer es sábado.",
  "3": "Y él les dijo: ¿No habéis leído qué hizo David, teniendo él hambre y los que con él estaban:",
  "4": "Cómo entró en la casa de Dios, y comió los panes de la proposición, que no le era lícito comer, ni á los que estaban con él, sino á solos los sacerdotes¿",
  "5": "O ¿no habéis leído en la ley, que los sábados en el templo los sacerdotes profanan el sábado, y son sin culpa?",
  "6": "Pues os digo que uno mayor que el templo está aquí.",
  "7": "Mas si supieseis qué es: Misericordia quiero y no sacrificio, no condenarías á los inocentes:",
  "8": "Porque Señor es del sábado el Hijo del hombre.",
  "9": "Y partiéndose de allí, vino á la sinagoga de ellos.",
  "10": "Y he aquí había allí uno que tenía una mano seca: y le preguntaron, diciendo: ¿Es lícito curar en sábado? por acusarle.",
  "11": "Y él les dijo: ¿Qué hombre habrá de vosotros, que tenga una oveja, y si cayere ésta en una fosa en sábado, no le eche mano, y la levante?",
  "12": "Pues ¿cuánto más vale un hombre que una oveja? Así que, lícito es en los sábados hacer bien."
 },
 "mateo-16": {
  "13": "Y viniendo Jesús á las partes de Cesarea de Filipo, preguntó á sus discípulos, diciendo: ¿Quién dicen los hombres que es el Hijo del hombre?",
  "14": "Y ellos dijeron: Unos, Juan el Bautista; y otros, Elías; y otros; Jeremías, ó alguno de los profetas.",
  "15": "El les dice: Y vosotros, ¿quién decís que soy?",
  "16": "Y respondiendo Simón Pedro, dijo: Tú eres el Cristo, el Hijo del Dios viviente.",
  "17": "Entonces, respondiendo Jesús, le dijo: Bienaventurado eres, Simón, hijo de Jonás; porque no te lo reveló carne ni sangre, mas mi Padre que está en los cielos.",
  "18": "Mas yo también te digo, que tú eres Pedro, y sobre esta piedra edificaré mi iglesia; y las puertas del infierno no prevalecerán contra ella.",
  "19": "Y á ti daré las llaves del reino de los cielos; y todo lo que ligares en la tierra será ligado en los cielos; y todo lo que desatares en la tierra será desatado en los cielos.",
  "20": "Entonces mandó á sus discípulos que á nadie dijesen que él era Jesús el Cristo."
 },
 "mateo-18": {
  "18": "De cierto os digo que todo lo que ligareis en la tierra, será ligado en el cielo; y todo lo que desatareis en la tierra, será desatado en el cielo."
 },
 "mateo-19": {
  "3": "Entonces se llegaron á él los Fariseos, tentándole, y diciéndole: ¿Es lícito al hombre repudiar á su mujer por cualquiera causa?",
  "4": "Y él respondiendo, les dijo: ¿No habéis leído que el que los hizo al principio, macho y hembra los hizo,",
  "5": "Y dijo: Por tanto, el hombre dejará padre y madre, y se unirá á su mujer, y serán dos en una carne?",
  "6": "Así que, no son ya más dos, sino una carne: por tanto, lo que Dios juntó, no lo aparte el hombre.",
  "7": "Dícenle: ¿Por qué, pues, Moisés mandó dar carta de divorcio, y repudiarla?",
  "8": "Díceles: Por la dureza de vuestro corazón Moisés os permitió repudiar á vuestras mujeres: mas al principio no fué así.",
  "9": "Y yo os digo que cualquiera que repudiare á su mujer, si no fuere por causa de fornicación, y se casare con otra, adultera: y el que se casare con la repudiada, adultera."
 },
 "mateo-20": {
  "25": "Entonces Jesús llamándolos, dijo: Sabéis que los príncipes de los Gentiles se enseñorean sobre ellos, y los que son grandes ejercen sobre ellos potestad.",
  "26": "Mas entre vosotros no será así; sino el que quisiere entre vosotros hacerse grande, será vuestro servidor;",
  "27": "Y el que quisiere entre vosotros ser el primero, será vuestro siervo:",
  "28": "Como el Hijo del hombre no vino para ser servido, sino para servir, y para dar su vida en rescate por muchos."
 },
 "mateo-22": {
  "36": "Maestro, ¿cuál es el mandamiento grande en la ley?",
  "37": "Y Jesús le dijo: Amarás al Señor tu Dios de todo tu corazón, y de toda tu alma, y de toda tu mente.",
  "38": "Este es el primero y el grande mandamiento.",
  "39": "Y el segundo es semejante á éste: Amarás á tu prójimo como á ti mismo.",
  "40": "De estos dos mandamientos depende toda la ley y los profetas."
 },
 "mateo-23": {
  "23": "Ay de vosotros, escribas y Fariseos, hipócritas! porque diezmáis la menta y el eneldo y el comino, y dejasteis lo que es lo más grave de la ley, es á saber, el juicio y la misericordia y la fe: esto era menester hacer, y no dejar lo otro."
 },
 "mateo-24": {
  "1": "Y SALIDO Jesús, íbase del templo; y se llegaron sus discípulos, para mostrarle los edificios del templo.",
  "2": "Y respondiendo él, les dijo: ¿Veis todo esto? de cierto os digo, que no será dejada aquí piedra sobre piedra, que no sea destruída.",
  "3": "Y sentándose él en el monte de las Olivas, se llegaron á él los discípulos aparte, diciendo: Dinos, ¿cuándo serán estas cosas, y qué señal habrá de tu venida, y del fin del mundo?",
  "4": "Y respondiendo Jesús, les dijo: Mirad que nadie os engañe.",
  "5": "Porque vendrán muchos en mi nombre, diciendo: Yo soy el Cristo; y á muchos engañarán.",
  "6": "Y oiréis guerras, y rumores de guerras: mirad que no os turbéis; porque es menester que todo esto acontezca; mas aún no es el fin.",
  "7": "Porque se levantará nación contra nación, y reino contra reino; y habrá pestilencias, y hambres, y terremotos por los lugares.",
  "8": "Y todas estas cosas, principio de dolores.",
  "9": "Entonces os entregarán para ser afligidos, y os matarán; y seréis aborrecidos de todas las gentes por causa de mi nombre.",
  "10": "Y muchos entonces serán escandalizados; y se entregarán unos á otros, y unos á otros se aborrecerán.",
  "11": "Y muchos falsos profetas se levantarán y engañarán á muchos.",
  "12": "Y por haberse multiplicado la maldad, la caridad de muchos se resfriará.",
  "13": "Mas el que perseverare hasta el fin, éste será salvo.",
  "14": "Y será predicado este evangelio del reino en todo el mundo, por testimonio á todos los Gentiles; y entonces vendrá el fin.",
  "15": "Por tanto, cuando viereis la abominación del asolamiento, que fué dicha por Daniel profeta, que estará en el lugar santo,(el que lee, entienda),",
  "16": "Entonces los que están en Judea, huyan á los montes;",
  "17": "Y el que sobre el terrado, no descienda á tomar algo de su casa;",
  "18": "Y el que en el campo, no vuelva atrás á tomar sus vestidos.",
  "19": "Mas ­ay de las preñadas, y de las que crían en aquellos días!",
  "20": "Orad, pues, que vuestra huída no sea en invierno ni en sábado;",
  "21": "Porque habrá entonces grande aflicción, cual no fué desde el principio del mundo hasta ahora, ni será.",
  "22": "Y si aquellos días no fuesen acortados, ninguna carne sería salva; mas por causa de los escogidos, aquellos días serán acortados.",
  "23": "Entonces, si alguno os dijere: He aquí está el Cristo, ó allí, no creáis.",
  "24": "Porque se levantarán falsos Cristos, y falsos profetas, y darán señales grandes y prodigios; de tal manera que engañarán, si es posible, aun á los escogidos.",
  "25": "He aquí os lo he dicho antes.",
  "26": "Así que, si os dijeren: He aquí en el desierto está; no salgáis: He aquí en las cámaras; no creáis.",
  "27": "Porque como el relámpago que sale del oriente y se muestra hasta el occidente, así será también la venida del Hijo del hombre.",
  "28": "Porque donde quiera que estuviere el cuerpo muerto, allí se juntarán las águilas.",
  "29": "Y luego después de la aflicción de aquellos días, el sol se obscurecerá, y la luna no dará su lumbre, y las estrellas caerán del cielo, y las virtudes de los cielos serán conmovidas.",
  "30": "Y entonces se mostrará la señal del Hijo del hombre en el cielo; y entonces lamentarán todas las tribus de la tierra, y verán al Hijo del hombre que vendrá sobre las nubes del cielo, con grande poder y gloria.",
  "31": "Y enviará sus ángeles con gran voz de trompeta, y juntarán sus escogidos de los cuatro vientos, de un cabo del cielo hasta el otro.",
  "32": "De la higuera aprended la parábola: Cuando ya su rama se enternece, y las hojas brotan, sabéis que el verano está cerca.",
  "33": "Así también vosotros, cuando viereis todas estas cosas, sabed que está cercano, á las puertas.",
  "34": "De cierto os digo, que no pasará esta generación, que todas estas cosas no acontezcan.",
  "35": "El cielo y la tierra pasarán, mas mis palabras no pasarán.",
  "36": "Empero del día y hora nadie sabe, ni aun los ángeles de los cielos, sino mi Padre solo.",
  "37": "Mas como los días de Noé, así será la venida del Hijo del hombre.",
  "38": "Porque como en los días antes del diluvio estaban comiendo y bebiendo, casándose y dando en casamiento, hasta el día que Noé entró en el arca,",
  "39": "Y no conocieron hasta que vino el diluvio y llevó á todos, así será también la venida del Hijo del hombre.",
  "40": "Entonces estarán dos en el campo; el uno será tomado, y el otro será dejado:",
  "41": "Dos mujeres moliendo á un molinillo; la una será tomada, y la otra será dejada.",
  "42": "Velad pues, porque no sabéis á qué hora ha de venir vuestro Señor.",
  "43": "Esto empero sabed, que si el padre de la familia supiese á cuál vela el ladrón había de venir, velaría, y no dejaría minar su casa.",
  "44": "Por tanto, también vosotros estad apercibidos; porque el Hijo del hombre ha de venir á la hora que no pensáis.",
  "45": "¿Quién pues es el siervo fiel y prudente, al cual puso su señor sobre su familia para que les dé alimento á tiempo?",
  "46": "Bienaventurado aquel siervo, al cual, cuando su señor viniere, le hallare haciendo así.",
  "47": "De cierto os digo, que sobre todos sus bienes le pondrá.",
  "48": "Y si aquel siervo malo dijere en su corazón Mi señor se tarda en venir:",
  "49": "Y comenzare á herir á sus consiervos, y aun á comer y á beber con los borrachos;",
  "50": "Vendrá el señor de aquel siervo en el día que no espera, y á la hora que no sabe,",
  "51": "Y le cortará por medio, y pondrá su parte con los hipócritas: allí será el lloro y el crujir de dientes."
 },
 "mateo-26": {
  "17": "Y el primer día de la fiesta de los panes sin levadura, vinieron los discípulos á Jesús, diciéndole: ¿Dónde quieres que aderecemos para ti para comer la pascua?",
  "18": "Y él dijo: Id á la ciudad á cierto hombre, y decidle: El Maestro dice: Mi tiempo está cerca; en tu casa haré la pascua con mis discípulos.",
  "19": "Y los discípulos hicieron como Jesús les mandó, y aderezaron la pascua.",
  "20": "Y como fué la tarde del día, se sentó á la mesa con los doce.",
  "21": "Y comiendo ellos, dijo: De cierto os digo, que uno de vosotros me ha de entregar.",
  "22": "Y entristecidos ellos en gran manera, comenzó cada uno de ellos á decirle: ¿Soy yo, Señor?",
  "23": "Entonces él respondiendo, dijo: El que mete la mano conmigo en el plato, ése me ha de entregar.",
  "24": "A la verdad el Hijo del hombre va, como está escrito de él, mas ­ay de aquel hombre por quien el Hijo del hombre es entregado! bueno le fuera al tal hombre no haber nacido.",
  "25": "Entonces respondiendo Judas, que le entregaba, dijo. ¿Soy yo, Maestro? Dícele: Tú lo has dicho.",
  "26": "Y comiendo ellos, tomó Jesús el pan, y bendijo, y lo partió, y dió á sus discípulos, y dijo: Tomad, comed. esto es mi cuerpo.",
  "27": "Y tomando el vaso, y hechas gracias, les dió, diciendo: Bebed de él todos;",
  "28": "Porque esto es mi sangre del nuevo pacto, la cual es derramada por muchos para remisión de los pecados.",
  "29": "Y os digo, que desde ahora no beberé más de este fruto de la vid, hasta aquel día, cuando lo tengo de beber nuevo con vosotros en el reino de mi Padre.",
  "30": "Y habiendo cantado el himno, salieron al monte de las Olivas.",
  "64": "Jesús le dijo: Tú lo has dicho: y aun os digo, que desde ahora habéis de ver al Hijo del hombre sentado á la diestra de la potencia de Dios, y que viene en las nubes del cielo."
 },
 "mateo-28": {
  "19": "Por tanto, id, y doctrinad á todos los Gentiles, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo:",
  "20": "Enseñándoles que guarden todas las cosas que os he mandado: y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo. Amén."
 },
 "mateo-3": {
  "16": "Y Jesús, después que fué bautizado, subió luego del agua; y he aquí los cielos le fueron abiertos, y vió al Espíritu de Dios que descendía como paloma, y venía sobre él.",
  "17": "Y he aquí una voz de los cielos que decía: Este es mi Hijo amado, en el cual tengo contentamiento."
 },
 "mateo-5": {
  "5": "Bienaventurados los mansos: porque ellos recibirán la tierra por heredad.",
  "17": "No penséis que he venido para abrogar la ley ó los profetas: no he venido para abrogar, sino á cumplir.",
  "18": "Porque de cierto os digo, que hasta que perezca el cielo y la tierra, ni una jota ni un tilde perecerá de la ley, hasta que todas las cosas sean hechas.",
  "19": "De manera que cualquiera que infringiere uno de estos mandamientos muy pequeños, y así enseñare á los hombres, muy pequeño será llamado en el reino de los cielos: mas cualquiera que hiciere y enseñare, éste será llamado grande en el reino de los cielos.",
  "20": "Porque os digo, que si vuestra justicia no fuere mayor que la de los escribas y de los Fariseos, no entraréis en el reino de los cielos.",
  "31": "También fué dicho: Cualquiera que repudiare á su mujer, déle carta de divorcio:",
  "32": "Mas yo os digo, que el que repudiare á su mujer, fuera de causa de fornicación, hace que ella adultere; y el que se casare con la repudiada, comete adulterio."
 },
 "mateo-9": {
  "6": "Pues para que sepáis que el Hijo del hombre tiene potestad en la tierra de perdonar pecados, (dice entonces al paralítico): Levántate, toma tu cama, y vete á tu casa.",
  "27": "Y pasando Jesús de allí, le siguieron dos ciegos, dando voces y diciendo: Ten misericordia de nosotros, Hijo de David.",
  "31": "Mas ellos salidos, divulgaron su fama por toda aquella tierra."
 },
 "numeros-14": {
  "34": "Conforme al número de los días, de los cuarenta días en que reconocisteis la tierra, llevaréis vuestras iniquidades cuarenta años, un año por cada día; y conoceréis mi castigo."
 },
 "proverbios-12": {
  "25": "El cuidado congojoso en el corazón del hombre, lo abate; Mas la buena palabra lo alegra."
 },
 "proverbios-14": {
  "29": "El que tarde se aira, es grande de entendimiento: Mas el corto de espíritu engrandece el desatino."
 },
 "proverbios-15": {
  "1": "La blanda respuesta quita la ira: Mas la palabra áspera hace subir el furor."
 },
 "proverbios-16": {
  "9": "El corazón del hombre piensa su camino: Mas Jehová endereza sus pasos."
 },
 "proverbios-21": {
  "1": "Como los repartimientos de las aguas, así está el corazón del rey en la mano de Jehová: A todo lo que quiere lo inclina."
 },
 "proverbios-22": {
  "6": "Instruye al niño en su carrera: Aun cuando fuere viejo no se apartará de ella."
 },
 "proverbios-29": {
  "11": "El necio da suelta á todo su espíritu; Mas el sabio al fin le sosiega."
 },
 "proverbios-30": {
  "5": "Toda palabra de Dios es limpia: Es escudo á los que en él esperan.",
  "6": "No añadas á sus palabras, porque no te reprenda, Y seas hallado mentiroso."
 },
 "proverbios-31": {
  "10": "Mujer fuerte, ¿quién la hallará? Porque su estima sobrepuja largamente á la de piedras preciosas."
 },
 "romanos-1": {
  "4": "El cual fué declarado Hijo de Dios con potencia, según el espíritu de santidad, por la resurrección de los muertos), de Jesucristo Señor nuestro,",
  "19": "Porque lo que de Dios se conoce, á ellos es manifiesto; porque Dios se lo manifestó.",
  "20": "Porque las cosas invisibles de él, su eterna potencia y divinidad, se echan de ver desde la creación del mundo, siendo entendidas por las cosas que son hechas; de modo que son inexcusables:",
  "21": "Porque habiendo conocido á Dios, no le glorificaron como á Dios, ni dieron gracias; antes se desvanecieron en sus discursos, y el necio corazón de ellos fué entenebrecido.",
  "22": "Diciéndose ser sabios, se hicieron fatuos,",
  "23": "Y trocaron la gloria del Dios incorruptible en semejanza de imagen de hombre corruptible, y de aves, y de animales de cuatro pies, y de serpientes.",
  "24": "Por lo cual también Dios los entregó á inmundicia, en las concupiscencias de sus corazones, de suerte que contaminaron sus cuerpos entre sí mismos:",
  "25": "Los cuales mudaron la verdad de Dios en mentira, honrando y sirviendo á las criaturas antes que al Criador, el cual es bendito por los siglos. Amén.",
  "26": "Por esto Dios los entregó á afectos vergonzosos; pues aun sus mujeres mudaron el natural uso en el uso que es contra naturaleza:",
  "27": "Y del mismo modo también los hombres, dejando el uso natural de las mujeres, se encendieron en sus concupiscencias los unos con los otros, cometiendo cosas nefandas hombres con hombres, y recibiendo en sí mismos la recompensa que convino á su extravío.",
  "28": "Y como á ellos no les pareció tener á Dios en su noticia, Dios los entregó á una mente depravada, para hacer lo que no conviene,",
  "29": "Estando atestados de toda iniquidad, de fornicación, de malicia, de avaricia, de maldad; llenos de envidia, de homicidios, de contiendas, de engaños, de malignidades;",
  "30": "Murmuradores, detractores, aborrecedores de Dios, injuriosos, soberbios, altivos, inventores de males, desobedientes á los padres,",
  "31": "Necios, desleales, sin afecto natural, implacables, sin misericordia:",
  "32": "Que habiendo entendido el juicio de Dios que los que hacen tales cosas son dignos de muerte, no sólo las hacen, más aún consienten á los que las hacen."
 },
 "romanos-10": {
  "17": "Luego la fe es por el oir; y el oir por la palabra de Dios."
 },
 "romanos-12": {
  "1": "Asi que, hermanos, os ruego por las misericordias de Dios, que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable á Dios, que es vuestro racional culto.",
  "2": "Y no os conforméis á este siglo; mas reformaos por la renovación de vuestro entendimiento, para que experimentéis cuál sea la buena voluntad de Dios, agradable y perfecta.",
  "4": "Porque de la manera que en un cuerpo tenemos muchos miembros, empero todos los miembros no tienen la misma operación;",
  "5": "Así muchos somos un cuerpo en Cristo, mas todos miembros los unos de los otros.",
  "6": "De manera que, teniendo diferentes dones según la gracia que nos es dada, si el de profecía, úsese conforme á la medida de la fe;",
  "7": "si ministerio, en servir; ó el que enseña, en doctrina;",
  "8": "El que exhorta, en exhortar; el que reparte, hágalo en simplicidad; el que preside, con solicitud; el que hace misericordia, con alegría."
 },
 "romanos-15": {
  "26": "Porque Macedonia y Acaya tuvieron por bien hacer una colecta para los pobres de los santos que están en Jerusalem.",
  "27": "Porque les pareció bueno, y son deudores á ellos: porque si los Gentiles han sido hechos participantes de sus bienes espirituales, deben también ellos servirles en los carnales."
 },
 "romanos-3": {
  "25": "Al cual Dios ha propuesto en propiciación por la fe en su sangre, para manifestación de su justicia, atento á haber pasado por alto, en su paciencia, los pecados pasados,"
 },
 "romanos-4": {
  "25": "El cual fué entregado por nuestros delitos, y resucitado para nuestra justificación"
 },
 "romanos-5": {
  "12": "De consiguiente, vino la reconciliación por uno, así como el pecado entró en el mundo por un hombre, y por el pecado la muerte, y la muerte así pasó á todos los hombres, pues que todos pecaron.",
  "13": "Porque hasta la ley, el pecado estaba en el mundo; pero no se imputa pecado no habiendo ley.",
  "14": "No obstante, reinó la muerte desde Adam hasta Moisés, aun en los que no pecaron á la manera de la rebelión de Adam; el cual es figura del que había de venir.",
  "15": "Mas no como el delito, tal fué el don: porque si por el delito de aquel uno murieron los muchos, mucho más abundó la gracia de Dios á los muchos, y el don por la gracia de un hombre, Jesucristo.",
  "16": "Ni tampoco de la manera que por un pecado, así también el don: porque el juicio á la verdad vino de un pecado para condenación, mas la gracia vino de muchos delitos para justificación.",
  "17": "Porque, si por un delito reinó la muerte por uno, mucho más reinarán en vida por un Jesucristo los que reciben la abundancia de gracia, y del don de la justicia.",
  "18": "Así que, de la manera que por un delito vino la culpa á todos los hombres para condenación, así por una justicia vino la gracia á todos los hombres para justificación de vida.",
  "19": "Porque como por la desobediencia de un hombre los muchos fueron constituídos pecadores, así por la obediencia de uno los muchos serán constituídos justos.",
  "20": "La ley empero entró para que el pecado creciese; mas cuando el pecado creció, sobrepujó la gracia;",
  "21": "Para que, de la manera que el pecado reinó para muerte, así también la gracia reine por la justicia para vida eterna por Jesucristo Señor nuestro."
 },
 "romanos-6": {
  "1": "¿PUES qué diremos? Perseveraremos en pecado para que la gracia crezca?",
  "2": "En ninguna manera. Porque los que somos muertos al pecado, ¿cómo viviremos aún en él?",
  "3": "¿O no sabéis que todos los que somos bautizados en Cristo Jesús, somos bautizados en su muerte?",
  "4": "Porque somos sepultados juntamente con él á muerte por el bautismo; para que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en novedad de vida.",
  "5": "Porque si fuimos plantados juntamente en él á la semejanza de su muerte, así también lo seremos á la de su resurrección:",
  "6": "Sabiendo esto, que nuestro viejo hombre juntamente fué crucificado con él, para que el cuerpo del pecado sea deshecho, á fin de que no sirvamos más al pecado.",
  "23": "Porque la paga del pecado es muerte: mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro."
 },
 "romanos-8": {
  "3": "Porque lo que era imposible á la ley, por cuanto era débil por la carne, Dios enviando á su Hijo en semejanza de carne de pecado, y á causa del pecado, condenó al pecado en la carne;",
  "4": "Para que la justicia de la ley fuese cumplida en nosotros, que no andamos conforme á la carne, mas conforme al espíritu.",
  "17": "Y si hijos, también herederos; herederos de Dios, y coherederos de Cristo; si empero padecemos juntamente con él, para que juntamente con él seamos glorificados.",
  "19": "Porque el continuo anhelar de las criaturas espera la manifestación de los hijos de Dios.",
  "20": "Porque las criaturas sujetas fueron á vanidad, no de grado, mas por causa del que las sujetó con esperanza,",
  "21": "Que también las mismas criaturas serán libradas de la servidumbre de corrupción en la libertad gloriosa de los hijos de Dios.",
  "22": "Porque sabemos que todas las criaturas gimen á una, y á una están de parto hasta ahora.",
  "38": "Por lo cual estoy cierto que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir,",
  "39": "Ni lo alto, ni lo bajo, ni ninguna criatura nos podrá apartar del amor de Dios, que es en Cristo Jesús Señor nuestro."
 },
 "salmos-1": {
  "1": "Bienaventurado el varón que no anduvo en consejo de malos, Ni estuvo en camino de pecadores, Ni en silla de escarnecedores se ha sentado;",
  "2": "Antes en la ley de Jehová está su delicia, Y en su ley medita de día y de noche."
 },
 "salmos-104": {
  "1": "BENDICE, alma mía, á Jehová. Jehová, Dios mío, mucho te has engrandecido; Haste vestido de gloria y de magnificencia.",
  "2": "El que se cubre de luz como de vestidura, Que extiende los cielos como una cortina;",
  "3": "Que establece sus aposentos entre las aguas; El que pone las nubes por su carroza, El que anda sobre las alas del viento;",
  "4": "El que hace á sus ángeles espíritus, Sus ministros al fuego flameante.",
  "5": "El fundó la tierra sobre sus basas; No será jamás removida.",
  "6": "Con el abismo, como con vestido, la cubriste; Sobre los montes estaban las aguas.",
  "7": "A tu reprensión huyeron; Al sonido de tu trueno se apresuraron;",
  "8": "Subieron los montes, descendieron los valles, Al lugar que tú les fundaste.",
  "9": "Pusísteles término, el cual no traspasarán; Ni volverán á cubrir la tierra.",
  "10": "Tú eres el que envías las fuentes por los arroyos; Van entre los montes.",
  "11": "Abrevan á todas las bestias del campo: Quebrantan su sed los asnos montaraces.",
  "12": "Junto á aquellos habitarán las aves de los cielos; Entre las ramas dan voces.",
  "13": "El que riega los montes desde sus aposentos: Del fruto de sus obras se sacia la tierra.",
  "14": "El que hace producir el heno para las bestias, Y la hierba para el servicio del hombre; Sacando el pan de la tierra.",
  "15": "Y el vino que alegra el corazón del hombre, Y el aceite que hace lucir el rostro, Y el pan que sustenta el corazón del hombre.",
  "16": "Llénanse de jugo los árboles de Jehová, Los cedros del Líbano que él plantó.",
  "17": "Allí anidan las aves; En las hayas hace su casa la cigüeña.",
  "18": "Los montes altos para las cabras monteses; Las peñas, madrigueras para los conejos.",
  "19": "Hizo la luna para los tiempos: El sol conoce su ocaso.",
  "20": "Pone las tinieblas, y es la noche: En ella corretean todas las bestias de la selva.",
  "21": "Los leoncillos braman á la presa, Y para buscar de Dios su comida.",
  "22": "Sale el sol, recógense, Y échanse en sus cuevas.",
  "23": "Sale el hombre á su hacienda, Y á su labranza hasta la tarde.",
  "24": "Cuán muchas son tus obras, oh Jehová! Hiciste todas ellas con sabiduría: La tierra está llena de tus beneficios.",
  "25": "Asimismo esta gran mar y ancha de términos: En ella pescados sin número, Animales pequeños y grandes.",
  "26": "Allí andan navíos; Allí este leviathán que hiciste para que jugase en ella.",
  "27": "Todos ellos esperan en ti, Para que les des su comida á su tiempo.",
  "28": "Les das, recogen; Abres tu mano, hártanse de bien.",
  "29": "Escondes tu rostro, túrbanse: Les quitas el espíritu, dejan de ser, Y tórnanse en su polvo.",
  "30": "Envías tu espíritu, críanse: Y renuevas la haz de la tierra.",
  "31": "Sea la gloria de Jehová para siempre; Alégrese Jehová en sus obras;",
  "32": "El cual mira á la tierra, y ella tiembla; Toca los montes, y humean.",
  "33": "A Jehová cantaré en mi vida: A mi Dios salmearé mientras viviere.",
  "34": "Serme ha suave hablar de él: Yo me alegraré en Jehová.",
  "35": "Sean consumidos de la tierra los pecadores, Y los impíos dejen de ser. Bendice, alma mía, á Jehová. Aleluya."
 },
 "salmos-119": {
  "105": "NUN. Lámpara es á mis pies tu palabra, Y lumbrera á mi camino."
 },
 "salmos-133": {
  "1": "Cántico gradual: de David. ­MIRAD cuán bueno y cuán delicioso es Habitar los hermanos igualmente en uno!"
 },
 "salmos-146": {
  "3": "No confiéis en los príncipes, Ni en hijo de hombre, porque no hay en él salud.",
  "4": "Saldrá su espíritu, tornaráse en su tierra: En aquel día perecerán sus pensamientos."
 },
 "salmos-19": {
  "1": "Al Músico principal: Salmo de David. LOS cielos cuentan la gloria de Dios, Y la expansión denuncia la obra de sus manos.",
  "2": "El un día emite palabra al otro día, Y la una noche á la otra noche declara sabiduría.",
  "3": "No hay dicho, ni palabras, Ni es oída su voz.",
  "4": "Por toda la tierra salió su hilo, Y al cabo del mundo sus palabras. En ellos puso tabernáculo para el sol.",
  "5": "Y él, como un novio que sale de su tálamo, Alégrase cual gigante para correr el camino.",
  "6": "Del un cabo de los cielos es su salida, Y su giro hasta la extremidad de ellos: Y no hay quien se esconda de su calor.",
  "7": "La ley de Jehová es perfecta, que vuelve el alma: El testimonio de Jehová, fiel, que hace sabio al pequeño.",
  "8": "Los mandamientos de Jehová son rectos, que alegran el corazón: El precepto de Jehová, puro, que alumbra los ojos.",
  "9": "El temor de Jehová, limpio, que permanece para siempre; Los juicios de Jehová son verdad, todos justos.",
  "10": "Deseables son más que el oro, y más que mucho oro afinado; Y dulces más que miel, y que la que destila del panal.",
  "11": "Tu siervo es además amonestado con ellos: En guardarlos hay grande galardón.",
  "12": "Los errores, ¿quién los entenderá? Líbrame de los que me son ocultos.",
  "13": "Detén asimismo á tu siervo de las soberbias; Que no se enseñoreen de mí: Entonces seré íntegro, y estaré limpio de gran rebelión.",
  "14": "Sean gratos los dichos de mi boca y la meditación de mi corazón delante de ti, Oh Jehová, roca mía, y redentor mío"
 },
 "salmos-23": {
  "4": "Aunque ande en valle de sombra de muerte, No temeré mal alguno; porque tú estarás conmigo: Tu vara y tu cayado me infundirán aliento."
 },
 "salmos-33": {
  "6": "Por la palabra de Jehová fueron hechos los cielos, Y todo el ejército de ellos por el espíritu de su boca.",
  "9": "Porque él dijo, y fué hecho; El mandó, y existió."
 },
 "salmos-40": {
  "7": "Entonces dije: He aquí, vengo; En el envoltorio del libro está escrito de mí:",
  "8": "El hacer tu voluntad, Dios mío, hame agradado; Y tu ley está en medio de mis entrañas."
 },
 "salmos-51": {
  "5": "He aquí, en maldad he sido formado, Y en pecado me concibió mi madre."
 },
 "salmos-77": {
  "11": "Acordaréme de las obras de JAH: Sí, haré yo memoria de tus maravillas antiguas.",
  "12": "Y meditaré en todas tus obras, Y hablaré de tus hechos."
 },
 "salmos-8": {
  "4": "Digo: ¿Qué es el hombre, para que tengas de él memoria, Y el hijo del hombre, que lo visites?",
  "5": "Pues le has hecho poco menor que los ángeles, Y coronástelo de gloria y de lustre.",
  "6": "Hicístelo enseñorear de las obras de tus manos; Todo lo pusiste debajo de sus pies:",
  "7": "Ovejas, y bueyes, todo ello; Y asimismo las bestias del campo,",
  "8": "Las aves de los cielos, y los peces de la mar; Todo cuanto pasa por los senderos de la mar."
 },
 "tito-2": {
  "11": "Porque la gracia de Dios que trae salvación á todos los hombres, se manifestó.",
  "12": "Enseñándonos que, renunciando á la impiedad y á los deseos mundanos, vivamos en este siglo templada, y justa, y píamente,",
  "13": "Esperando aquella esperanza bienaventurada, y la manifestación gloriosa del gran Dios y Salvador nuestro Jesucristo.",
  "14": "Que se dió á sí mismo por nosotros para redimirnos de toda iniquidad, y limpiar para sí un pueblo propio, celoso de buenas obras."
 },
 "tito-3": {
  "3": "Porque también éramos nosotros necios en otro tiempo, rebeldes, extraviados, sirviendo á concupiscencias y deleites diversos, viviendo en malicia y en envidia, aborrecibles, aborreciendo los unos á los otros.",
  "4": "Mas cuando se manifestó la bondad de Dios nuestro Salvador, y su amor para con los hombres,",
  "5": "No por obras de justicia que nosotros habíamos hecho, mas por su misericordia nos salvó, por el lavacro de la regeneración, y de la renovación del Espíritu Santo;",
  "6": "El cual derramó en nosotros abundantemente por Jesucristo nuestro Salvador,",
  "7": "Para que, justificados por su gracia, seamos hechos herederos según la esperanza de la vida eterna."
 }
};

const OTRAS_META = {
 "1corintios-10": {
  "libro": "1 Corintios",
  "cap": "10",
  "version": "RV1909"
 },
 "1corintios-11": {
  "libro": "1 Corintios",
  "cap": "11",
  "version": "RV1909"
 },
 "1corintios-12": {
  "libro": "1 Corintios",
  "cap": "12",
  "version": "RV1909"
 },
 "1corintios-15": {
  "libro": "1 Corintios",
  "cap": "15",
  "version": "RV1909"
 },
 "1corintios-4": {
  "libro": "1 Corintios",
  "cap": "4",
  "version": "RV1909"
 },
 "1corintios-6": {
  "libro": "1 Corintios",
  "cap": "6",
  "version": "RV1909"
 },
 "1corintios-7": {
  "libro": "1 Corintios",
  "cap": "7",
  "version": "RV1909"
 },
 "1corintios-9": {
  "libro": "1 Corintios",
  "cap": "9",
  "version": "RV1909"
 },
 "1cronicas-29": {
  "libro": "1 Crónicas",
  "cap": "29",
  "version": "RV1909"
 },
 "1juan-2": {
  "libro": "1 Juan",
  "cap": "2",
  "version": "RV1909"
 },
 "1juan-4": {
  "libro": "1 Juan",
  "cap": "4",
  "version": "RV1909"
 },
 "1juan-5": {
  "libro": "1 Juan",
  "cap": "5",
  "version": "RV1909"
 },
 "1pedro-1": {
  "libro": "1 Pedro",
  "cap": "1",
  "version": "RV1909"
 },
 "1pedro-2": {
  "libro": "1 Pedro",
  "cap": "2",
  "version": "RV1909"
 },
 "1pedro-3": {
  "libro": "1 Pedro",
  "cap": "3",
  "version": "RV1909"
 },
 "1pedro-4": {
  "libro": "1 Pedro",
  "cap": "4",
  "version": "RV1909"
 },
 "1samuel-15": {
  "libro": "1 Samuel",
  "cap": "15",
  "version": "RV1909"
 },
 "1samuel-2": {
  "libro": "1 Samuel",
  "cap": "2",
  "version": "RV1909"
 },
 "1samuel-25": {
  "libro": "1 Samuel",
  "cap": "25",
  "version": "RV1909"
 },
 "1tesalonicenses-2": {
  "libro": "1 Tesalonicenses",
  "cap": "2",
  "version": "RV1909"
 },
 "1tesalonicenses-4": {
  "libro": "1 Tesalonicenses",
  "cap": "4",
  "version": "RV1909"
 },
 "1tesalonicenses-5": {
  "libro": "1 Tesalonicenses",
  "cap": "5",
  "version": "RV1909"
 },
 "1timoteo-1": {
  "libro": "1 Timoteo",
  "cap": "1",
  "version": "RV1909"
 },
 "1timoteo-2": {
  "libro": "1 Timoteo",
  "cap": "2",
  "version": "RV1909"
 },
 "1timoteo-3": {
  "libro": "1 Timoteo",
  "cap": "3",
  "version": "RV1909"
 },
 "1timoteo-6": {
  "libro": "1 Timoteo",
  "cap": "6",
  "version": "RV1909"
 },
 "2corintios-10": {
  "libro": "2 Corintios",
  "cap": "10",
  "version": "RV1909"
 },
 "2corintios-13": {
  "libro": "2 Corintios",
  "cap": "13",
  "version": "RV1909"
 },
 "2corintios-3": {
  "libro": "2 Corintios",
  "cap": "3",
  "version": "RV1909"
 },
 "2corintios-5": {
  "libro": "2 Corintios",
  "cap": "5",
  "version": "RV1909"
 },
 "2corintios-6": {
  "libro": "2 Corintios",
  "cap": "6",
  "version": "RV1909"
 },
 "2corintios-7": {
  "libro": "2 Corintios",
  "cap": "7",
  "version": "RV1909"
 },
 "2corintios-8": {
  "libro": "2 Corintios",
  "cap": "8",
  "version": "RV1909"
 },
 "2cronicas-36": {
  "libro": "2 Crónicas",
  "cap": "36",
  "version": "RV1909"
 },
 "2pedro-1": {
  "libro": "2 Pedro",
  "cap": "1",
  "version": "RV1909"
 },
 "2pedro-2": {
  "libro": "2 Pedro",
  "cap": "2",
  "version": "RV1909"
 },
 "2pedro-3": {
  "libro": "2 Pedro",
  "cap": "3",
  "version": "RV1909"
 },
 "2reyes-24": {
  "libro": "2 Reyes",
  "cap": "24",
  "version": "RV1909"
 },
 "2reyes-25": {
  "libro": "2 Reyes",
  "cap": "25",
  "version": "RV1909"
 },
 "2tesalonicenses-1": {
  "libro": "2 Tesalonicenses",
  "cap": "1",
  "version": "RV1909"
 },
 "2tesalonicenses-2": {
  "libro": "2 Tesalonicenses",
  "cap": "2",
  "version": "RV1909"
 },
 "2timoteo-2": {
  "libro": "2 Timoteo",
  "cap": "2",
  "version": "RV1909"
 },
 "2timoteo-3": {
  "libro": "2 Timoteo",
  "cap": "3",
  "version": "RV1909"
 },
 "2timoteo-4": {
  "libro": "2 Timoteo",
  "cap": "4",
  "version": "RV1909"
 },
 "3juan-1": {
  "libro": "3 Juan",
  "cap": "1",
  "version": "RV1909"
 },
 "apocalipsis-1": {
  "libro": "Apocalipsis",
  "cap": "1",
  "version": "RV1909"
 },
 "apocalipsis-10": {
  "libro": "Apocalipsis",
  "cap": "10",
  "version": "RV1909"
 },
 "apocalipsis-11": {
  "libro": "Apocalipsis",
  "cap": "11",
  "version": "RV1909"
 },
 "apocalipsis-12": {
  "libro": "Apocalipsis",
  "cap": "12",
  "version": "RV1909"
 },
 "apocalipsis-13": {
  "libro": "Apocalipsis",
  "cap": "13",
  "version": "RV1909"
 },
 "apocalipsis-14": {
  "libro": "Apocalipsis",
  "cap": "14",
  "version": "RV1909"
 },
 "apocalipsis-18": {
  "libro": "Apocalipsis",
  "cap": "18",
  "version": "RV1909"
 },
 "apocalipsis-19": {
  "libro": "Apocalipsis",
  "cap": "19",
  "version": "RV1909"
 },
 "apocalipsis-2": {
  "libro": "Apocalipsis",
  "cap": "2",
  "version": "RV1909"
 },
 "apocalipsis-20": {
  "libro": "Apocalipsis",
  "cap": "20",
  "version": "RV1909"
 },
 "apocalipsis-21": {
  "libro": "Apocalipsis",
  "cap": "21",
  "version": "RV1909"
 },
 "apocalipsis-22": {
  "libro": "Apocalipsis",
  "cap": "22",
  "version": "RV1909"
 },
 "apocalipsis-3": {
  "libro": "Apocalipsis",
  "cap": "3",
  "version": "RV1909"
 },
 "apocalipsis-4": {
  "libro": "Apocalipsis",
  "cap": "4",
  "version": "RV1909"
 },
 "colosenses-1": {
  "libro": "Colosenses",
  "cap": "1",
  "version": "RV1909"
 },
 "colosenses-2": {
  "libro": "Colosenses",
  "cap": "2",
  "version": "RV1909"
 },
 "colosenses-3": {
  "libro": "Colosenses",
  "cap": "3",
  "version": "RV1909"
 },
 "deuteronomio-28": {
  "libro": "Deuteronomio",
  "cap": "28",
  "version": "RV1909"
 },
 "deuteronomio-5": {
  "libro": "Deuteronomio",
  "cap": "5",
  "version": "RV1909"
 },
 "deuteronomio-6": {
  "libro": "Deuteronomio",
  "cap": "6",
  "version": "RV1909"
 },
 "eclesiastes-9": {
  "libro": "Eclesiastés",
  "cap": "9",
  "version": "RV1909"
 },
 "efesios-1": {
  "libro": "Efesios",
  "cap": "1",
  "version": "RV1909"
 },
 "efesios-2": {
  "libro": "Efesios",
  "cap": "2",
  "version": "RV1909"
 },
 "efesios-3": {
  "libro": "Efesios",
  "cap": "3",
  "version": "RV1909"
 },
 "efesios-4": {
  "libro": "Efesios",
  "cap": "4",
  "version": "RV1909"
 },
 "efesios-5": {
  "libro": "Efesios",
  "cap": "5",
  "version": "RV1909"
 },
 "efesios-6": {
  "libro": "Efesios",
  "cap": "6",
  "version": "RV1909"
 },
 "exodo-20": {
  "libro": "Éxodo",
  "cap": "20",
  "version": "RV1909"
 },
 "exodo-3": {
  "libro": "Éxodo",
  "cap": "3",
  "version": "RV1909"
 },
 "exodo-31": {
  "libro": "Éxodo",
  "cap": "31",
  "version": "RV1909"
 },
 "exodo-34": {
  "libro": "Éxodo",
  "cap": "34",
  "version": "RV1909"
 },
 "ezequiel-20": {
  "libro": "Ezequiel",
  "cap": "20",
  "version": "RV1909"
 },
 "ezequiel-26": {
  "libro": "Ezequiel",
  "cap": "26",
  "version": "RV1909"
 },
 "ezequiel-28": {
  "libro": "Ezequiel",
  "cap": "28",
  "version": "RV1909"
 },
 "ezequiel-4": {
  "libro": "Ezequiel",
  "cap": "4",
  "version": "RV1909"
 },
 "filipenses-2": {
  "libro": "Filipenses",
  "cap": "2",
  "version": "RV1909"
 },
 "filipenses-3": {
  "libro": "Filipenses",
  "cap": "3",
  "version": "RV1909"
 },
 "filipenses-4": {
  "libro": "Filipenses",
  "cap": "4",
  "version": "RV1909"
 },
 "galatas-1": {
  "libro": "Gálatas",
  "cap": "1",
  "version": "RV1909"
 },
 "galatas-3": {
  "libro": "Gálatas",
  "cap": "3",
  "version": "RV1909"
 },
 "galatas-4": {
  "libro": "Gálatas",
  "cap": "4",
  "version": "RV1909"
 },
 "galatas-5": {
  "libro": "Gálatas",
  "cap": "5",
  "version": "RV1909"
 },
 "genesis-1": {
  "libro": "Génesis",
  "cap": "1",
  "version": "RV1909"
 },
 "genesis-12": {
  "libro": "Génesis",
  "cap": "12",
  "version": "RV1909"
 },
 "genesis-2": {
  "libro": "Génesis",
  "cap": "2",
  "version": "RV1909"
 },
 "genesis-3": {
  "libro": "Génesis",
  "cap": "3",
  "version": "RV1909"
 },
 "genesis-6": {
  "libro": "Génesis",
  "cap": "6",
  "version": "RV1909"
 },
 "hageo-1": {
  "libro": "Hageo",
  "cap": "1",
  "version": "RV1909"
 },
 "hebreos-1": {
  "libro": "Hebreos",
  "cap": "1",
  "version": "RV1909"
 },
 "hebreos-10": {
  "libro": "Hebreos",
  "cap": "10",
  "version": "RV1909"
 },
 "hebreos-11": {
  "libro": "Hebreos",
  "cap": "11",
  "version": "RV1909"
 },
 "hebreos-2": {
  "libro": "Hebreos",
  "cap": "2",
  "version": "RV1909"
 },
 "hebreos-4": {
  "libro": "Hebreos",
  "cap": "4",
  "version": "RV1909"
 },
 "hebreos-7": {
  "libro": "Hebreos",
  "cap": "7",
  "version": "RV1909"
 },
 "hebreos-8": {
  "libro": "Hebreos",
  "cap": "8",
  "version": "RV1909"
 },
 "hebreos-9": {
  "libro": "Hebreos",
  "cap": "9",
  "version": "RV1909"
 },
 "hechos-1": {
  "libro": "Hechos",
  "cap": "1",
  "version": "RV1909"
 },
 "hechos-10": {
  "libro": "Hechos",
  "cap": "10",
  "version": "RV1909"
 },
 "hechos-16": {
  "libro": "Hechos",
  "cap": "16",
  "version": "RV1909"
 },
 "hechos-17": {
  "libro": "Hechos",
  "cap": "17",
  "version": "RV1909"
 },
 "hechos-2": {
  "libro": "Hechos",
  "cap": "2",
  "version": "RV1909"
 },
 "hechos-22": {
  "libro": "Hechos",
  "cap": "22",
  "version": "RV1909"
 },
 "hechos-6": {
  "libro": "Hechos",
  "cap": "6",
  "version": "RV1909"
 },
 "hechos-7": {
  "libro": "Hechos",
  "cap": "7",
  "version": "RV1909"
 },
 "isaias-14": {
  "libro": "Isaías",
  "cap": "14",
  "version": "RV1909"
 },
 "isaias-35": {
  "libro": "Isaías",
  "cap": "35",
  "version": "RV1909"
 },
 "isaias-41": {
  "libro": "Isaías",
  "cap": "41",
  "version": "RV1909"
 },
 "isaias-43": {
  "libro": "Isaías",
  "cap": "43",
  "version": "RV1909"
 },
 "isaias-52": {
  "libro": "Isaías",
  "cap": "52",
  "version": "RV1909"
 },
 "isaias-53": {
  "libro": "Isaías",
  "cap": "53",
  "version": "RV1909"
 },
 "isaias-56": {
  "libro": "Isaías",
  "cap": "56",
  "version": "RV1909"
 },
 "isaias-58": {
  "libro": "Isaías",
  "cap": "58",
  "version": "RV1909"
 },
 "isaias-65": {
  "libro": "Isaías",
  "cap": "65",
  "version": "RV1909"
 },
 "isaias-8": {
  "libro": "Isaías",
  "cap": "8",
  "version": "RV1909"
 },
 "jeremias-25": {
  "libro": "Jeremías",
  "cap": "25",
  "version": "RV1909"
 },
 "jeremias-4": {
  "libro": "Jeremías",
  "cap": "4",
  "version": "RV1909"
 },
 "joel-2": {
  "libro": "Joel",
  "cap": "2",
  "version": "RV1909"
 },
 "juan-1": {
  "libro": "Juan",
  "cap": "1",
  "version": "RV1909"
 },
 "juan-10": {
  "libro": "Juan",
  "cap": "10",
  "version": "RV1909"
 },
 "juan-11": {
  "libro": "Juan",
  "cap": "11",
  "version": "RV1909"
 },
 "juan-13": {
  "libro": "Juan",
  "cap": "13",
  "version": "RV1909"
 },
 "juan-14": {
  "libro": "Juan",
  "cap": "14",
  "version": "RV1909"
 },
 "juan-15": {
  "libro": "Juan",
  "cap": "15",
  "version": "RV1909"
 },
 "juan-16": {
  "libro": "Juan",
  "cap": "16",
  "version": "RV1909"
 },
 "juan-17": {
  "libro": "Juan",
  "cap": "17",
  "version": "RV1909"
 },
 "juan-2": {
  "libro": "Juan",
  "cap": "2",
  "version": "RV1909"
 },
 "juan-20": {
  "libro": "Juan",
  "cap": "20",
  "version": "RV1909"
 },
 "juan-3": {
  "libro": "Juan",
  "cap": "3",
  "version": "RV1909"
 },
 "juan-5": {
  "libro": "Juan",
  "cap": "5",
  "version": "RV1909"
 },
 "juan-6": {
  "libro": "Juan",
  "cap": "6",
  "version": "RV1909"
 },
 "judas-1": {
  "libro": "Judas",
  "cap": "1",
  "version": "RV1909"
 },
 "levitico-11": {
  "libro": "Levítico",
  "cap": "11",
  "version": "RV1909"
 },
 "levitico-16": {
  "libro": "Levítico",
  "cap": "16",
  "version": "RV1909"
 },
 "levitico-23": {
  "libro": "Levítico",
  "cap": "23",
  "version": "RV1909"
 },
 "lucas-1": {
  "libro": "Lucas",
  "cap": "1",
  "version": "RV1909"
 },
 "lucas-10": {
  "libro": "Lucas",
  "cap": "10",
  "version": "RV1909"
 },
 "lucas-12": {
  "libro": "Lucas",
  "cap": "12",
  "version": "RV1909"
 },
 "lucas-16": {
  "libro": "Lucas",
  "cap": "16",
  "version": "RV1909"
 },
 "lucas-17": {
  "libro": "Lucas",
  "cap": "17",
  "version": "RV1909"
 },
 "lucas-2": {
  "libro": "Lucas",
  "cap": "2",
  "version": "RV1909"
 },
 "lucas-21": {
  "libro": "Lucas",
  "cap": "21",
  "version": "RV1909"
 },
 "lucas-4": {
  "libro": "Lucas",
  "cap": "4",
  "version": "RV1909"
 },
 "malaquias-3": {
  "libro": "Malaquías",
  "cap": "3",
  "version": "RV1909"
 },
 "malaquias-4": {
  "libro": "Malaquías",
  "cap": "4",
  "version": "RV1909"
 },
 "marcos-1": {
  "libro": "Marcos",
  "cap": "1",
  "version": "RV1909"
 },
 "marcos-10": {
  "libro": "Marcos",
  "cap": "10",
  "version": "RV1909"
 },
 "marcos-13": {
  "libro": "Marcos",
  "cap": "13",
  "version": "RV1909"
 },
 "marcos-5": {
  "libro": "Marcos",
  "cap": "5",
  "version": "RV1909"
 },
 "marcos-9": {
  "libro": "Marcos",
  "cap": "9",
  "version": "RV1909"
 },
 "mateo-12": {
  "libro": "Mateo",
  "cap": "12",
  "version": "RV1909"
 },
 "mateo-16": {
  "libro": "Mateo",
  "cap": "16",
  "version": "RV1909"
 },
 "mateo-18": {
  "libro": "Mateo",
  "cap": "18",
  "version": "RV1909"
 },
 "mateo-19": {
  "libro": "Mateo",
  "cap": "19",
  "version": "RV1909"
 },
 "mateo-20": {
  "libro": "Mateo",
  "cap": "20",
  "version": "RV1909"
 },
 "mateo-22": {
  "libro": "Mateo",
  "cap": "22",
  "version": "RV1909"
 },
 "mateo-23": {
  "libro": "Mateo",
  "cap": "23",
  "version": "RV1909"
 },
 "mateo-24": {
  "libro": "Mateo",
  "cap": "24",
  "version": "RV1909"
 },
 "mateo-26": {
  "libro": "Mateo",
  "cap": "26",
  "version": "RV1909"
 },
 "mateo-28": {
  "libro": "Mateo",
  "cap": "28",
  "version": "RV1909"
 },
 "mateo-3": {
  "libro": "Mateo",
  "cap": "3",
  "version": "RV1909"
 },
 "mateo-5": {
  "libro": "Mateo",
  "cap": "5",
  "version": "RV1909"
 },
 "mateo-9": {
  "libro": "Mateo",
  "cap": "9",
  "version": "RV1909"
 },
 "numeros-14": {
  "libro": "Números",
  "cap": "14",
  "version": "RV1909"
 },
 "proverbios-12": {
  "libro": "Proverbios",
  "cap": "12",
  "version": "RV1909"
 },
 "proverbios-14": {
  "libro": "Proverbios",
  "cap": "14",
  "version": "RV1909"
 },
 "proverbios-15": {
  "libro": "Proverbios",
  "cap": "15",
  "version": "RV1909"
 },
 "proverbios-16": {
  "libro": "Proverbios",
  "cap": "16",
  "version": "RV1909"
 },
 "proverbios-21": {
  "libro": "Proverbios",
  "cap": "21",
  "version": "RV1909"
 },
 "proverbios-22": {
  "libro": "Proverbios",
  "cap": "22",
  "version": "RV1909"
 },
 "proverbios-29": {
  "libro": "Proverbios",
  "cap": "29",
  "version": "RV1909"
 },
 "proverbios-30": {
  "libro": "Proverbios",
  "cap": "30",
  "version": "RV1909"
 },
 "proverbios-31": {
  "libro": "Proverbios",
  "cap": "31",
  "version": "RV1909"
 },
 "romanos-1": {
  "libro": "Romanos",
  "cap": "1",
  "version": "RV1909"
 },
 "romanos-10": {
  "libro": "Romanos",
  "cap": "10",
  "version": "RV1909"
 },
 "romanos-12": {
  "libro": "Romanos",
  "cap": "12",
  "version": "RV1909"
 },
 "romanos-15": {
  "libro": "Romanos",
  "cap": "15",
  "version": "RV1909"
 },
 "romanos-3": {
  "libro": "Romanos",
  "cap": "3",
  "version": "RV1909"
 },
 "romanos-4": {
  "libro": "Romanos",
  "cap": "4",
  "version": "RV1909"
 },
 "romanos-5": {
  "libro": "Romanos",
  "cap": "5",
  "version": "RV1909"
 },
 "romanos-6": {
  "libro": "Romanos",
  "cap": "6",
  "version": "RV1909"
 },
 "romanos-8": {
  "libro": "Romanos",
  "cap": "8",
  "version": "RV1909"
 },
 "salmos-1": {
  "libro": "Salmos",
  "cap": "1",
  "version": "RV1909"
 },
 "salmos-104": {
  "libro": "Salmos",
  "cap": "104",
  "version": "RV1909"
 },
 "salmos-119": {
  "libro": "Salmos",
  "cap": "119",
  "version": "RV1909"
 },
 "salmos-133": {
  "libro": "Salmos",
  "cap": "133",
  "version": "RV1909"
 },
 "salmos-146": {
  "libro": "Salmos",
  "cap": "146",
  "version": "RV1909"
 },
 "salmos-19": {
  "libro": "Salmos",
  "cap": "19",
  "version": "RV1909"
 },
 "salmos-23": {
  "libro": "Salmos",
  "cap": "23",
  "version": "RV1909"
 },
 "salmos-33": {
  "libro": "Salmos",
  "cap": "33",
  "version": "RV1909"
 },
 "salmos-40": {
  "libro": "Salmos",
  "cap": "40",
  "version": "RV1909"
 },
 "salmos-51": {
  "libro": "Salmos",
  "cap": "51",
  "version": "RV1909"
 },
 "salmos-77": {
  "libro": "Salmos",
  "cap": "77",
  "version": "RV1909"
 },
 "salmos-8": {
  "libro": "Salmos",
  "cap": "8",
  "version": "RV1909"
 },
 "tito-2": {
  "libro": "Tito",
  "cap": "2",
  "version": "RV1909"
 },
 "tito-3": {
  "libro": "Tito",
  "cap": "3",
  "version": "RV1909"
 }
};

if (typeof module !== "undefined") module.exports = { NOMBRES_OTROS, OTRAS_VERS, OTRAS_META };
