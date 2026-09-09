/* biblia-otros.js — NO EDITAR A MANO.
   Generado desde files/rv1909-{libro}-{capitulo}.txt (dominio publico).
   Citas a libros distintos de Daniel, para refsTocables() en app.js.
   Ver tools/citas.js para la verificacion byte a byte contra la fuente. */

const NOMBRES_OTROS = {
 "genesis": "Génesis",
 "1samuel": "1 Samuel",
 "2reyes": "2 Reyes",
 "2cronicas": "2 Crónicas",
 "isaias": "Isaías",
 "jeremias": "Jeremías",
 "ezequiel": "Ezequiel",
 "mateo": "Mateo",
 "juan": "Juan",
 "hechos": "Hechos",
 "efesios": "Efesios",
 "hebreos": "Hebreos",
 "1tesalonicenses": "1 Tesalonicenses",
 "apocalipsis": "Apocalipsis"
};

const OTRAS_VERS = {
 "genesis-12": {
  2: "Y haré de ti una nación grande, y bendecirte he, y engrandeceré tu nombre, y serás bendición:"
 },
 "1samuel-2": {
  30: "Por tanto, Jehová el Dios de Israel dice: Yo había dicho que tu casa y la casa de tu padre andarían delante de mí perpetuamente; mas ahora ha dicho Jehová: Nunca yo tal haga, porque yo honraré á los que me honran, y los que me tuvieren en poco, serán viles."
 },
 "2reyes-24": {
  1: "En su tiempo subió Nabucodonosor rey de Babilonia, al cual sirvió Joacim tres años; volvióse luego, y se rebeló contra él.",
  2: "Jehová empero envió contra él tropas de Caldeos, y tropas de Siros, y tropas de Moabitas, y tropas de Ammonitas; los cuales envió contra Judá para que la destruyesen, conforme á la palabra de Jehová que había hablado por sus siervos los profetas.",
  3: "Ciertamente vino esto contra Judá por dicho de Jehová, para quitarla de su presencia, por los pecados de Manasés, conforme á todo lo que hizo;",
  4: "Asimismo por la sangre inocente que derramó, pues hinchió á Jerusalem de sangre inocente: Jehová por tanto, no quiso perdonar.",
  5: "Lo demás de los hechos de Joacim, y todas las cosas que hizo, ¿no está escrito en el libro de las crónicas de los reyes de Judá?",
  6: "Y durmió Joacim con sus padres, y reinó en su lugar Joachîn su hijo.",
  7: "Y nunca más el rey de Egipto salió de su tierra: porque el rey de Babilonia le tomó todo lo que era suyo, desde el río de Egipto hasta el río de Eufrates.",
  8: "De dieciocho años era Joachîn cuando comenzó á reinar, y reinó en Jerusalem tres meses. El nombre de su madre fué Neusta hija de Elnathán, de Jerusalem.",
  9: "E hizo lo malo en ojos de Jehová, conforme á todas las cosas que había hecho su padre.",
  10: "En aquel tiempo subieron los siervos de Nabucodonosor rey de Babilonia contra Jerusalem y la ciudad fué cercada.",
  11: "Vino también Nabucodonosor rey de Babilonia contra la ciudad, cuando sus siervos la tenían cercada.",
  12: "Entonces salió Joachîn rey de Judá al rey de Babilonia, él, y su madre, y sus siervos, y sus príncipes, y sus eunucos: y prendiólo el rey de Babilonia en el octavo año de su reinado.",
  13: "Y sacó de allí todos los tesoros de la casa de Jehová, y los tesoros de la casa real, y quebró en piezas todos los vasos de oro que había hecho Salomón rey de Israel en la casa de Jehová, como Jehová había dicho.",
  14: "Y llevó en cautiverio á toda Jerusalem, á todos los príncipes, y á todos los hombres valientes, hasta diez mil cautivos, y á todos los oficiales y herreros; que no quedó nadie, excepto los pobres del pueblo de la tierra.",
  15: "Asimismo trasportó á Joachîn á Babilonia, y á la madre del rey, y á las mujeres del rey, y á sus eunucos, y á los poderosos de la tierra; cautivos los llevó de Jerusalem á Babilonia.",
  16: "A todos los hombre de guerra, que fueron siete mil, y á los oficiales y herreros, que fueron mil, y á todos los valientes para hacer la guerra, llevó cautivos el rey de Babilonia.",
  17: "Y el rey de Babilonia puso por rey en lugar de Joachîn á Mathanías su tío, y mudóle el nombre en el de Sedecías.",
  18: "De veintiún años era Sedecías cuando comenzó á reinar, y reinó en Jerusalem once años. El nombre de su madre fué Amutal hija de Jeremías, de Libna.",
  19: "E hizo lo malo en ojos de Jehová, conforme á todo lo que había hecho Joacim.",
  20: "Fué pues la ira de Jehová contra Jerusalem y Judá, hasta que los echó de su presencia. Y Sedecías se rebeló contra el rey de Babilonia."
 },
 "2reyes-25": {
  1: "Y aconteció á los nueve años de su reinado, en el mes décimo, á los diez del mes, que Nabucodonosor rey de Babilonia vino con todo su ejército contra Jerusalem, y cercóla; y levantaron contra ella ingenios alrededor.",
  2: "Y estuvo la ciudad cercada hasta el undécimo año del rey Sedecías.",
  3: "A los nueve del mes prevaleció el hambre en la ciudad, que no hubo pan para el pueblo de la tierra.",
  4: "Abierta ya la ciudad, huyeron de noche todos los hombres de guerra por el camino de la puerta que estaba entre los dos muros, junto á los huertos del rey, estando los Caldeos alrededor de la ciudad; y el rey se fué camino de la campiña.",
  5: "Y el ejército de los Caldeos siguió al rey, y tomólo en las llanuras de Jericó, habiéndose esparcido de él todo su ejército.",
  6: "Tomado pues el rey, trajéronle al rey de Babilonia á Ribla, y profirieron contra él sentencia.",
  7: "Y degollaron á los hijos de Sedecías en presencia suya; y á Sedecías sacaron los ojos, y atado con cadenas lleváronlo á Babilonia.",
  8: "En el mes quinto, á los siete del mes, siendo el año diecinueve de Nabucodonosor rey de Babilonia, vino á Jerusalem Nabuzaradán, capitán de los de la guardia, siervo del rey de Babilonia.",
  9: "Y quemó la casa de Jehová, y la casa del rey, y todas las casas de Jerusalem; y todas las casas de los príncipes quemó á fuego.",
  10: "Y todo el ejército de los Caldeos que estaba con el capitán de la guardia, derribó los muros de Jerusalem alrededor.",
  11: "Y á los del pueblo que habían quedado en la ciudad, y á los que se habían juntado al rey de Babilonia, y á los que habían quedado del vulgo, trasportólos Nabuzaradán, capitán de los de la guardia.",
  12: "Mas de los pobres de la tierra dejó Nabuzaradán, capitán de los de la guardia, para que labrasen las viñas y las tierras.",
  13: "Y quebraron los Caldeos las columnas de bronce que estaban en la casa de Jehová, y las basas, y el mar de bronce que estaba en la casa de Jehová, y llevaron el metal de ello á Babilonia.",
  14: "Lleváronse también los calderos, y las paletas, y las tenazas, y los cucharones, y todos los vasos de metal con que ministraban.",
  15: "Incensarios, cuencos, los que de oro, en oro, y los que de plata, en plata, todo lo llevó el capitán de los de la guardia.",
  16: "Las dos columnas, un mar, y las basas que Salomón había hecho para la casa de Jehová: no había peso de todos estos vasos.",
  17: "La altura de la una columna era diez y ocho codos y tenía encima un capitel de bronce, y la altura del capitel era de tres codos; y sobre el capitel había un enredado y granadas alrededor, todo de bronce: y semejante obra había en la otra columna con el enredado.",
  18: "Tomó entonces el capitán de los de la guardia á Saraías primer sacerdote, y á Sophonías segundo sacerdote, y tres guardas de la vajilla.",
  19: "Y de la ciudad tomó un eunuco, el cual era maestre de campo, y cinco varones de los continuos del rey, que se hallaron en la ciudad; y al principal escriba del ejército, que hacía la reseña de la gente del país; y sesenta varones del pueblo de la tierra, que se hallaron en la ciudad.",
  20: "Estos tomó Nabuzaradán, capitán de los de la guardia, y llevólos á Ribla al rey de Babilonia.",
  21: "Y el rey de Babilonia los hirió y mató en Ribla, en tierra de Hamath. Así fué trasportado Judá de sobre su tierra.",
  22: "Y al pueblo que Nabucodonosor rey de Babilonia dejó en tierra de Judá, puso por gobernador á Gedalías, hijo de Ahicam hijo de Saphán.",
  23: "Y oyendo todos los príncipes del ejército, ellos y su gente, que el rey de Babilonia había puesto por gobernador á Gedalías, viniéronse á él en Mizpa, es á saber, Ismael hijo de Nathanías, y Johanán hijo de Carea, y Saraía hijo de Tanhumet Netofatita, y Jaazanías hijo de Maachâti, ellos con los suyos.",
  24: "Entonces Gedalías les hizo juramento, á ellos y á los suyos, y díjoles: No temáis de ser siervos de los Caldeos; habitad en la tierra, y servid al rey de Babilonia, y os irá bien.",
  25: "Mas en el mes séptimo vino Ismael hijo de Nathanías, hijo de Elisama, de la estirpe real, y con él diez varones, é hirieron á Gedalías, y murió: y también á los Judíos y Caldeos que estaban con él en Mizpa.",
  26: "Y levantándose todo el pueblo, desde el menor hasta el mayor, con los capitanes del ejército, fuéronse á Egipto por temor de los Caldeos.",
  27: "Y aconteció á los treinta y siete años de la trasportación de Joachîn rey de Judá, en el mes duodécimo, á los veinte y siete del mes, que Evil-merodach rey de Babilonia, en el primer año de su reinado, levantó la cabeza de Joachîn rey de Judá, sacándolo de la casa de la cárcel.",
  28: "Y hablóle bien, y puso su asiento sobre el asiento de los reyes que con él estaban en Babilonia.",
  29: "Y mudóle los vestidos de su prisión, y comió siempre delante de él todos los días de su vida.",
  30: "Y fuéle diariamente dada su comida de parte del rey de continuo, todos los días de su vida."
 },
 "2cronicas-36": {
  1: "Entonces el pueblo de la tierra tomó á Joachâz hijo de Josías, é hiciéronle rey en lugar de su padre en Jerusalem.",
  2: "De veinte y tres años era Joachâz cuando comenzó á reinar, y tres meses reinó en Jerusalem.",
  3: "Y el rey de Egipto lo quitó de Jerusalem, y condenó la tierra en cien talentos de plata y uno de oro.",
  4: "Y constituyó el rey de Egipto á su hermano Eliacim por rey sobre Judá y Jerusalem, y mudóle el nombre en Joacim; y á Joachâz su hermano tomó Nechâo, y llevólo á Egipto.",
  5: "Cuando comenzó á reinar Joacim era de veinte y cinco años, y reinó once años en Jerusalem: é hizo lo malo en ojos de Jehová su Dios.",
  6: "Y subió contra él Nabucodonosor rey de Babilonia, y atado con cadenas lo llevó á Babilonia.",
  7: "También llevó Nabucodonosor á Babilonia de los vasos de la casa de Jehová, y púsolos en su templo en Babilonia.",
  8: "Lo demás de los hechos de Joacim, y las abominaciones que hizo, y lo que en él se halló, he aquí está escrito en el libro de los reyes de Israel y de Judá: y reinó en su lugar Joachîn su hijo.",
  9: "De ocho años era Joachîn cuando comenzó á reinar, y reinó tres meses y diez días en Jerusalem: é hizo lo malo en ojos de Jehová.",
  10: "A la vuelta del año el rey Nabucodonosor envió, é hízolo llevar á Babilonia juntamente con los vasos preciosos de la casa de Jehová; y constituyó á Sedecías su hermano por rey sobre Judá y Jerusalem.",
  11: "De veinte y un años era Sedecías cuando comenzó á reinar, y once años reinó en Jerusalem.",
  12: "E hizo lo malo en ojos de Jehová su Dios, y no se humilló delante de Jeremías profeta, que le hablaba de parte de Jehová.",
  13: "Rebelóse asimismo contra Nabucodonosor, al cual había jurado por Dios; y endureció su cerviz, y obstinó su corazón, para no volverse á Jehová el Dios de Israel.",
  14: "Y también todos los príncipes de los sacerdotes, y el pueblo, aumentaron la prevaricación, siguiendo todas las abominaciones de las gentes, y contaminando la casa de Jehová, la cual él había santificado en Jerusalem.",
  15: "Y Jehová el Dios de sus padres envió á ellos por mano de sus mensajeros, levantándose de mañana y enviando: porque él tenía misericordia de su pueblo, y de su habitación.",
  16: "Mas ellos hacían escarnio de los mensajeros de Dios, y menospreciaban sus palabras, burlándose de sus profetas, hasta que subió el furor de Jehová contra su pueblo, y que no hubo remedio.",
  17: "Por lo cual trajo contra ellos al rey de los Caldeos, que mató á cuchillo sus mancebos en la casa de su santuario, sin perdonar joven, ni doncella, ni viejo, ni decrépito; todos los entregó en sus manos.",
  18: "Asimismo todos los vasos de la casa de Dios, grandes y chicos, los tesoros de la casa de Jehová, y los tesoros del rey y de sus príncipes, todo lo llevó á Babilonia.",
  19: "Y quemaron la casa de Dios, y rompieron el muro de Jerusalem, y consumieron al fuego todos sus palacios, y destruyeron todos sus vasos deseables.",
  20: "Los que quedaron del cuchillo, pasáronlos á Babilonia; y fueron siervos de él y de sus hijos, hasta que vino el reino de los Persas.",
  21: "Para que se cumpliese la palabra de Jehová por la boca de Jeremías, hasta que la tierra hubo gozado sus sábados: porque todo el tiempo de su asolamiento reposó, hasta que los setenta años fueron cumplidos.",
  22: "Mas al primer año de Ciro rey de los Persas, para que se cumpliese la palabra de Jehová por boca de Jeremías, Jehová excitó el espíritu de Ciro rey de los Persas, el cual hizo pasar pregón por todo su reino, y también por escrito, diciendo:",
  23: "Así dice Ciro rey de los Persas: Jehová, el Dios de los cielos, me ha dado todos los reinos de la tierra; y él me ha encargado que le edifique casa en Jerusalem, que es en Judá. ¿Quién de vosotros hay de todo su pueblo? Jehová su Dios sea con él, y suba."
 },
 "isaias-43": {
  2: "Cuando pasares por las aguas, yo seré contigo; y por los ríos, no te anegarán. Cuando pasares por el fuego, no te quemarás, ni la llama arderá en ti."
 },
 "jeremias-25": {
  11: "Y toda esta tierra será puesta en soledad, en espanto; y servirán estas gentes al rey de Babilonia setenta años.",
  12: "Y será que, cuando fueren cumplidos los setenta años, visitaré sobre el rey de Babilonia y sobre aquella gente su maldad, ha dicho Jehová, y sobre la tierra de los Caldeos; y pondréla en desiertos para siempre."
 },
 "ezequiel-4": {
  6: "Y cumplidos estos, dormirás sobre tu lado derecho segunda vez, y llevarás la maldad de la casa de Judá cuarenta días: día por año, día por año te lo he dado."
 },
 "ezequiel-26": {
  7: "Porque así ha dicho el Señor Jehová: He aquí que del aquilón traigo yo contra Tiro á Nabucodonosor, rey de Babilonia, rey de reyes, con caballos, y carros, y caballeros, y compañías, y mucho pueblo."
 },
 "mateo-3": {
  16: "Y Jesús, después que fué bautizado, subió luego del agua; y he aquí los cielos le fueron abiertos, y vió al Espíritu de Dios que descendía como paloma, y venía sobre él.",
  17: "Y he aquí una voz de los cielos que decía: Este es mi Hijo amado, en el cual tengo contentamiento."
 },
 "mateo-24": {
  9: "Entonces os entregarán para ser afligidos, y os matarán; y seréis aborrecidos de todas las gentes por causa de mi nombre.",
  15: "Por tanto, cuando viereis la abominación del asolamiento, que fué dicha por Daniel profeta, que estará en el lugar santo,(el que lee, entienda),"
 },
 "mateo-26": {
  64: "Jesús le dijo: Tú lo has dicho: y aun os digo, que desde ahora habéis de ver al Hijo del hombre sentado á la diestra de la potencia de Dios, y que viene en las nubes del cielo."
 },
 "juan-5": {
  28: "No os maravilléis de esto; porque vendrá hora, cuando todos los que están en los sepulcros oirán su voz;",
  29: "Y los que hicieron bien, saldrán á resurrección de vida; mas los que hicieron mal, á resurrección de condenación."
 },
 "hechos-22": {
  21: "Y me dijo: Ve, porque yo te tengo que enviar lejos á los Gentiles."
 },
 "efesios-6": {
  12: "Porque no tenemos lucha contra sangre y carne; sino contra principados, contra potestades, contra señores del mundo, gobernadores de estas tinieblas, contra malicias espirituales en los aires.",
  18: "Orando en todo tiempo con toda deprecación y súplica en el Espíritu, y velando en ello con toda instancia y suplicación por todos los santos,"
 },
 "hebreos-7": {
  21: "Porque los otros cierto sin juramento fueron hechos sacerdotes; mas éste, con juramento por el que le dijo: Juró el Señor, y no se arrepentirá: Tú eres sacerdote eternamente Según el orden de Melchîsedec:",
  22: "Tanto de mejor testamento es hecho fiador Jesús.",
  23: "Y los otros cierto fueron muchos sacerdotes, en cuanto por la muerte no podían permanecer.",
  24: "Mas éste, por cuanto permanece para siempre, tiene un sacerdocio inmutable:",
  25: "Por lo cual puede también salvar eternamente á los que por él se allegan á Dios, viviendo siempre para interceder por ellos."
 },
 "1tesalonicenses-4": {
  16: "Porque el mismo Señor con aclamación, con voz de arcángel, y con trompeta de Dios, descenderá del cielo; y los muertos en Cristo resucitarán primero:"
 },
 "apocalipsis-1": {
  13: "Y en medio de los siete candeleros, uno semejante al Hijo del hombre, vestido de una ropa que llegaba hasta los pies, y ceñido por los pechos con una cinta de oro.",
  14: "Y su cabeza y sus cabellos eran blancos como la lana blanca, como la nieve; y sus ojos como llama de fuego;",
  15: "Y sus pies semejantes al latón fino, ardientes como en un horno; y su voz como ruido de muchas aguas.",
  16: "Y tenía en su diestra siete estrellas: y de su boca salía una espada aguda de dos filos. Y su rostro era como el sol cuando resplandece en su fuerza."
 },
 "apocalipsis-2": {
  10: "No tengas ningún temor de las cosas que has de padecer. He aquí, el diablo ha de enviar algunos de vosotros á la cárcel, para que seáis probados, y tendréis tribulación de diez días. Sé fiel hasta la muerte, y yo te daré la corona de la vida."
 },
 "apocalipsis-3": {
  10: "Porque has guardado la palabra de mi paciencia, yo también te guardaré de la hora de la tentación que ha de venir en todo el mundo, para probar á los que moran en la tierra."
 },
 "apocalipsis-10": {
  6: "Y juró por el que vive para siempre jamás, que ha criado el cielo y las cosas que están en él, y la tierra y las cosas que están en ella, y el mar y las cosas que están en él, que el tiempo no será más."
 },
 "apocalipsis-12": {
  6: "Y la mujer huyó al desierto, donde tiene lugar aparejado de Dios, para que allí la mantengan mil doscientos y sesenta días.",
  7: "Y fué hecha una grande batalla en el cielo: Miguel y sus ángeles lidiaban contra el dragón; y lidiaba el dragón y sus ángeles."
 },
 "apocalipsis-13": {
  5: "Y le fué dada boca que hablaba grandes cosas y blasfemias: y le fué dada potencia de obrar cuarenta y dos meses."
 },
 "apocalipsis-20": {
  12: "Y vi los muertos, grandes y pequeños, que estaban delante de Dios; y los libros fueron abiertos: y otro libro fué abierto, el cual es de la vida: y fueron juzgados los muertos por las cosas que estaban escritas en los libros, según sus obras."
 },
};

const OTRAS_META = {
 "genesis-12": {
  "libro": "Génesis",
  "cap": "12",
  "version": "RV1909"
 },
 "1samuel-2": {
  "libro": "1 Samuel",
  "cap": "2",
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
 "2cronicas-36": {
  "libro": "2 Crónicas",
  "cap": "36",
  "version": "RV1909"
 },
 "isaias-43": {
  "libro": "Isaías",
  "cap": "43",
  "version": "RV1909"
 },
 "jeremias-25": {
  "libro": "Jeremías",
  "cap": "25",
  "version": "RV1909"
 },
 "ezequiel-4": {
  "libro": "Ezequiel",
  "cap": "4",
  "version": "RV1909"
 },
 "ezequiel-26": {
  "libro": "Ezequiel",
  "cap": "26",
  "version": "RV1909"
 },
 "mateo-3": {
  "libro": "Mateo",
  "cap": "3",
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
 "juan-5": {
  "libro": "Juan",
  "cap": "5",
  "version": "RV1909"
 },
 "hechos-22": {
  "libro": "Hechos",
  "cap": "22",
  "version": "RV1909"
 },
 "efesios-6": {
  "libro": "Efesios",
  "cap": "6",
  "version": "RV1909"
 },
 "hebreos-7": {
  "libro": "Hebreos",
  "cap": "7",
  "version": "RV1909"
 },
 "1tesalonicenses-4": {
  "libro": "1 Tesalonicenses",
  "cap": "4",
  "version": "RV1909"
 },
 "apocalipsis-1": {
  "libro": "Apocalipsis",
  "cap": "1",
  "version": "RV1909"
 },
 "apocalipsis-2": {
  "libro": "Apocalipsis",
  "cap": "2",
  "version": "RV1909"
 },
 "apocalipsis-3": {
  "libro": "Apocalipsis",
  "cap": "3",
  "version": "RV1909"
 },
 "apocalipsis-10": {
  "libro": "Apocalipsis",
  "cap": "10",
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
 "apocalipsis-20": {
  "libro": "Apocalipsis",
  "cap": "20",
  "version": "RV1909"
 }
};

if (typeof module !== "undefined") module.exports = { NOMBRES_OTROS, OTRAS_VERS, OTRAS_META };
