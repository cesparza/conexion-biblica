/* Daniel 8: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: carnero, macho cabrío, cuatro cuernos
   como generales, Roma y no Antíoco, tamid como ministerio de Cristo, regla
   de día por año, nitsdaq, 457-1844 y Policronio. Aquí va lo que agrega Bohr:
   por qué animales del santuario, de dónde sale el cuerno (su lectura de
   Pérgamo, distinta de la de «los vientos»), qué parte del santuario es «el
   continuo», por qué la pregunta de 8:13 obliga a contar años, y el mes y
   el día de 1844. v188: voz directa, sin nombrar autores en el cuerpo; una
   sola «Fuente:» corta por sección. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd8',
  secciones: [
    { t: '🧭 Animales del santuario: lo que Daniel 8 quiere que veamos', capa: 'contexto', h:
      `<p><b>Cuándo:</b> el tercer año de Belsasar (8:1), hacia el 550 a.C., once años antes de la caída de Babilonia.</p>` +
      `<p>Comparado con Daniel 7, hay cuatro diferencias que apuntan al santuario:</p>` +
      li([
        '<b>No aparece Babilonia</b>: la visión empieza con Persia porque los 2.300 años empiezan en tiempos de Persia (457 a.C.).',
        '<b>Animales domésticos, no fieras</b>: el carnero se usaba en el servicio diario del santuario y el macho cabrío en el anual, el Día de la Expiación (Levítico 16). El cuerno quita «el continuo» (lo diario) y Dios lo juzga en lo anual.',
        '<b>Un solo símbolo para las dos Romas</b>: la pagana y la papal son el mismo cuerno, para no romper la imagen del santuario.',
        '<b>No termina con el reino eterno</b>: Daniel 8 a 12 es un solo libro y el reino llega al final, en 12:1-3.',
      ]) +
      hi('<b>Cada uno crece más.</b> El carnero «se engrandecía» (8:4), el macho cabrío «creció en gran manera» (8:8) y el cuerno «creció mucho» y aun «hasta llegar al ejército del cielo» (8:9-10). Los dos animales pelean contra otros reinos; el cuerno además pelea hacia arriba, contra Dios.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 293-295 y 305-306.</p>` },

    { t: '🧭 ¿De un viento o de un cuerno?', capa: 'contexto', h:
      `<p>El estudio de arriba dice que el cuerno sale de uno de los cuatro <i>vientos</i>, por el género de las palabras hebreas. Otra lectura del hebreo ve que sale de uno de los cuernos, <b>que están hacia</b> los cuatro vientos; así leen también la Septuaginta, Flavio Josefo y 1 Macabeos. Las dos llegan a Roma.</p>` +
      `<p>En esta lectura los cuatro cuernos son reinos, no generales:</p>` +
      tbl(['Punto cardinal', 'Reino'], [
        ['Oeste', 'Antigónidas (Macedonia y Grecia)'], ['Este', 'Seléucidas (Siria y Mesopotamia)'],
        ['Sur', 'Tolomeos (Egipto)'], ['Norte', 'Atálidas (Pérgamo)'],
      ]) +
      `<p>Roma sale de <b>Pérgamo</b>: fue el único de los cuatro que no tuvo que conquistar, porque el rey Atalo III se lo dejó en herencia al Senado romano en 133 a.C. Allí se habían refugiado los sacerdotes de la religión babilónica, y desde allí esa religión pasó a Roma. Pérgamo une a Babilonia con la Roma pagana, y más tarde con la papal.</p>` +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 296-302.</p>` },

    { t: '🧭 Qué quitó el cuerno: «el continuo» del atrio y del lugar santo', capa: 'contexto', h:
      `<p>El texto dice «<b>el</b> continuo» (<i>hatamid</i>), sin la palabra «sacrificio», que agregaron los traductores. En el santuario esa palabra describe el ministerio diario del sacerdote en el <b>atrio y el lugar santo</b>, nunca en el santísimo. El cuerno no puede subir al cielo: copia en la tierra lo que le pertenece al Príncipe en el cielo.</p>` +
      tbl(['Mueble', 'Qué representa', 'Qué se puso en su lugar'], [
        ['Altar del sacrificio', 'La muerte de Cristo', 'La penitencia'],
        ['Lavacro', 'El bautismo', 'El bautismo por aspersión'],
        ['Mesa de los panes', 'La Palabra de Dios', 'Solo el sacerdote la explica'],
        ['Candelabro', 'Cristo, luz del mundo', 'Una iglesia a oscuras'],
        ['Altar del incienso', 'La oración y la intercesión', 'El confesionario'],
      ]) +
      wa('Otra lectura ve en «el continuo» el paganismo, quitado para dar lugar al papado. Aquí se sigue la del ministerio de Cristo.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 307-309 y 313; apuntes «Cómo quitó el continuo el papado».</p>` },

    { t: '🧭 «¿Hasta cuándo durará la visión?»: por qué son años', capa: 'contexto', h:
      `<p>Tres razones del mismo texto:</p>` +
      li([
        '<b>La pregunta es por toda la visión.</b> En 8:13 el santo pregunta «¿Hasta cuándo durará la visión...?» con la palabra <i>jazón</i>, la misma de 8:1-2, que abarca todo: Persia, Grecia, Roma pagana y Roma papal. 2.300 días literales son unos seis años y medio, muy poco para todo eso.',
        '<b>Pregunta por el final</b>, no por la duración: «hasta cuándo», y la respuesta es «luego el santuario será purificado».',
        '<b>No son sacrificios.</b> El hebreo dice «tarde-mañana» en singular, como en la creación. Los sacrificios siempre se nombran al revés, «mañana y tarde» (Éxodo 29:39), así que no se puede partir en 1.150 de cada uno.',
      ]) +
      hi('<i>Jazón</i> es la visión completa; <i>mareh</i>, la parte de la visión sobre el tiempo (8:26). Gabriel explicó la <i>jazón</i>, pero la <i>mareh</i> quedó sin entender (8:27), y por eso vuelve en el capítulo 9.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 313-316.</p>` },

    { t: '🧭 El año, el mes y el día: 22 de octubre de 1844', capa: 'contexto', h:
      `<p>La Biblia da cada fecha del plan de salvación. Para el juicio:</p>` +
      tbl(['Dato', 'De dónde sale'], [
        ['El año: 1844', 'Daniel 8:14, contando 2.300 años desde 457 a.C.'],
        ['El mes y el día', 'Levítico 23:27: el día diez del mes séptimo, el Día de la Expiación'],
        ['En 1844', 'Ese día cayó el 22 de octubre'],
      ]) +
      `<p>La fiesta de las Trompetas, diez días antes, anunciaba el comienzo del juicio: se cumplió en el movimiento millerita, que proclamó Daniel 8:14. Los meses sin fiestas entre Pentecostés y el otoño representan los siglos de dominio papal.</p>` +
      `<p>Guillermo Miller pensó primero en la primavera de 1844, pero la profecía señalaba el otoño.</p>` +
      wa('Es la <b>última fecha</b> del calendario que Dios reveló. No se deben fijar fechas para el cierre de la gracia ni para la segunda venida (PE 75).') +
      `<p>Fuente: Bohr, <i>El calendario del Mesías</i>, p. 8; CS 376; PE 75.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (1): los animales y los cuernos', capa: 'contexto', h:
      `<p>En Daniel 8 el ángel Gabriel explica casi todo él mismo (8:19-26):</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Carnero de dos cuernos', 'Media y Persia', 'Daniel 8:20: «éstos son los reyes de Media y de Persia»'],
        ['Macho cabrío', 'Grecia', 'Daniel 8:21: «El macho cabrío es el rey de Grecia»'],
        ['Cuerno grande', 'Su primer rey, Alejandro Magno', 'Daniel 8:21: el cuerno grande «es el rey primero»'],
        ['Cuatro cuernos', 'Cuatro reinos', 'Daniel 8:22: «cuatro reinos se levantarán de esa nación»'],
        ['Cuatro vientos del cielo', 'Los cuatro puntos cardinales', 'Daniel 11:4: el reino de Alejandro, «repartido hacia los cuatro vientos del cielo»'],
        ['Cuerno pequeño', 'Un rey o poder: Roma, pagana y luego papal', 'Daniel 8:23-25; 7:24 (cuerno = rey)'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:105; Bohr, <i>Daniel 1-10</i>, p. 296-298 y 307.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): el santuario y el tiempo', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Ejército y estrellas', 'El pueblo de Dios', 'Daniel 8:24: destruirá «al pueblo de los santos»; Daniel 12:3; Éxodo 12:41'],
        ['Príncipe del ejército', 'Cristo', 'Josué 5:13-15 (recibe adoración); Daniel 8:25: «el Príncipe de los príncipes»'],
        ['Santuario', 'El santuario del cielo, donde Cristo ministra', 'Hebreos 8:1-2; 9:24'],
        ['Tarde y mañana', 'Un día completo', 'Génesis 1:5, 8'],
        ['Día', 'Año', 'Números 14:34; Ezequiel 4:6'],
      ]) +
      hi('Por eso 2.300 tardes y mañanas son 2.300 días proféticos, es decir, 2.300 años: de 457 a.C. a 1844.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 306-308 y 315; Bohr, <i>15 principios</i> 2:105.</p>` },

    { t: '🧭 Hacia dónde crece el cuerno: primero a lo ancho, después hacia arriba', capa: 'contexto', h:
      `<p>El carnero «se engrandecía» (8:4), el macho cabrío «creció en gran manera» (8:8) y el cuerno crece más que los dos. Pero no crece igual todo el tiempo:</p>` +
      tbl(['Fase', 'Hacia dónde', 'Cumplimiento'], [
        ['Roma imperial (8:9)', 'A lo ancho, sobre la tierra: al oriente, al sur y a la tierra gloriosa', 'Macedonia (168 a.C.), Siria (65 a.C.), Judea (63 a.C.) y Egipto (30 a.C.)'],
        ['Roma papal (8:10-12)', 'Hacia arriba: hasta el ejército del cielo y frente al Príncipe', 'Persigue al pueblo de Dios y pone en la tierra lo que Cristo hace en el santuario del cielo (538-1798)'],
      ]) +
      hi('Es un solo cuerno porque es un solo poder en dos fases, como en Daniel 2 (hierro y hierro con barro) y Daniel 7 (la bestia espantosa y su cuerno pequeño). Las dos fases gobiernan desde Roma.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 305-306; Maxwell, <i>El porvenir del mundo revelado</i>, p. 164.</p>` },

    { t: '🧭 ¿Antíoco IV Epífanes? Por qué no', capa: 'contexto', h:
      `<p>Muchos comentarios dicen que el cuerno pequeño es Antíoco IV Epífanes, el rey seléucida que profanó el templo de Jerusalén entre 168 y 165 a.C. El texto no encaja:</p>` +
      li([
        '<b>Un cuerno es un reino</b> (8:22), y Antíoco era un rey de uno de los cuatro cuernos, no un poder nuevo.',
        '<b>Llega tarde y es chico.</b> El cuerno sale «al fin del reinado de estos» (8:23); Antíoco reinó a mitad de la dinastía seléucida (312-65 a.C.). Y el cuerno crece más que Persia y que Alejandro; Antíoco tuvo que salir de Egipto porque Roma se lo ordenó.',
        '<b>El tiempo no da.</b> Su profanación duró unos tres años (1 Macabeos 1:54; 4:52), no 2.300 días; para hacerlo encajar se parten las tardes y mañanas en 1.150 días.',
        '<b>Jesús la puso en el futuro.</b> La «abominación desoladora» de Daniel todavía estaba por venir cuando Jesús habló (Mateo 24:15), casi dos siglos después de la muerte de Antíoco (164 a.C.).',
        '<b>La visión es para el tiempo del fin</b> (8:17, 19), y el cuerno solo es quebrantado «no por mano humana» (8:25).',
      ]) +
      `<p>Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 162-163; Bohr, <i>Daniel 1-10</i>, p. 305-306 y 314-315.</p>` },

    { t: '🧭 De 457 a.C. a 1844: la cuenta de las 2.300 tardes y mañanas', capa: 'contexto', h:
      `<p>Daniel 8 da el número y Daniel 9 el punto de partida: «desde la salida de la orden para restaurar y edificar a Jerusalén» (9:25). Gabriel vuelve a explicar lo que en 8:27 quedó sin entender.</p>` +
      tbl(['Paso', 'Cuenta', 'Fecha'], [
        ['La orden de Artajerjes I (Esdras 7:7-26)', 'su séptimo año, contado de otoño a otoño', 'otoño de 457 a.C.'],
        ['7 semanas (9:25)', '49 años: Jerusalén reedificada', '408 a.C.'],
        ['62 semanas más (9:25)', '483 años: el Mesías Príncipe, ungido en su bautismo', 'otoño de 27 d.C.'],
        ['La mitad de la última semana (9:27)', 'la cruz: cesan el sacrificio y la ofrenda', 'primavera de 31 d.C.'],
        ['Fin de las 70 semanas (9:24)', '490 años: Esteban muere y el evangelio va a los gentiles', '34 d.C.'],
        ['Lo que queda: 2.300 − 490 = 1.810', '34 + 1.810', '1844'],
      ]) +
      hi('«Determinadas» (9:24) quiere decir cortadas. Solo se pueden cortar 490 años de un periodo más largo que empieza a la vez: los 2.300. Por eso son años, y empiezan juntos en 457 a.C. Sin año cero, 2.300 − 457 da 1843 y se llega a 1844.') +
      `<p>Fuente: CS 372-376; Bohr, <i>Daniel 1-10</i>, p. 325-336.</p>` },

    { t: '🧭 «Será purificado»: el Día de la Expiación y el juicio de Daniel 7', capa: 'contexto', h:
      `<p>En el santuario, cada día los pecados confesados se llevaban al lugar santo; una vez al año, el Día de la Expiación, el sumo sacerdote entraba al lugar santísimo y purificaba el santuario (Levítico 16:16, 29-30). Era un día de juicio: quien no se afligía era cortado de su pueblo (Levítico 23:29).</p>` +
      li([
        '<b>La palabra.</b> Daniel 8:14 usa <i>nitsdaq</i>: será justificado, vindicado. Las traducciones antiguas la leyeron «purificado», y en la Biblia «justo» y «limpio» van juntos (Job 4:17; 25:4).',
        '<b>El mismo suceso que Daniel 7.</b> Daniel 7 pasa del cuerno al juicio (7:9-10) y Daniel 8 del cuerno al santuario purificado (8:14): las dos visiones ponen en el mismo lugar el comienzo del juicio, en 1844.',
        '<b>En el cielo.</b> El templo de Jerusalén ya no existía cuando terminaron los 2.300 años. Cristo entró en 1844 al lugar santísimo del santuario celestial para su obra final: el juicio investigador.',
      ]) +
      wa('La purificación del santuario no es la segunda venida: eso esperaba la mayoría en 1844. Es la obra que Cristo hace en el cielo antes de volver.') +
      `<p>Fuente: CS 451 y 470-477; Bohr, <i>Daniel 1-10</i>, p. 315-320.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '8:3', f: 'c', q: '¿Por qué Daniel 8 usa un carnero y un macho cabrío y no fieras como en Daniel 7?', o: ['Son animales del servicio del santuario', 'Eran signos zodiacales de Persia y Grecia', 'Muestran que esos imperios fueron pacíficos', 'Eran animales sagrados en Babilonia'], a: 0, e: 'El carnero se usaba en el servicio diario y el macho cabrío en el del Día de la Expiación: el tema del capítulo es el santuario. Fuente: Bohr, <i>Daniel 1-10</i>, p. 293.' },
    { t: 'mc', v: '8:1', f: 'c', q: '¿Por qué la visión de Daniel 8 no incluye a Babilonia?', o: ['Porque los 2.300 años empiezan en tiempos de Persia', 'Porque Babilonia ya había caído cuando Daniel la vio', 'Porque Babilonia no persiguió al pueblo de Dios', 'Porque Daniel 7 ya había explicado todo sobre ella'], a: 0, e: 'Babilonia todavía existía (cayó once años después). Si la visión empezara con Babilonia, parecería que los 2.300 años empiezan allí. Fuente: Bohr, <i>Daniel 1-10</i>, p. 293.' },
    { t: 'tf', v: '8:9', f: 'c', q: 'Una lectura del hebreo de Daniel 8:8-9 ve salir el cuerno pequeño de uno de los cuatro cuernos, que están hacia los cuatro vientos.', a: true, e: 'Verdadero. Otra lectura, la del estudio de arriba, lo ve salir «de uno de los vientos»; las dos llegan a Roma. Fuente: Bohr, <i>Daniel 1-10</i>, p. 297.' },
    { t: 'mc', v: '8:8', f: 'c', q: 'Si los cuatro cuernos son reinos, ¿cuál de estos era uno de ellos?', o: ['Los atálidas de Pérgamo', 'Los partos de Persia', 'Los nabateos de Petra', 'Los asmoneos de Judea'], a: 0, e: 'Los cuatro cuernos son antigónidas (oeste), seléucidas (este), tolomeos (sur) y atálidas de Pérgamo (norte). Fuente: Bohr, <i>Daniel 1-10</i>, p. 296-297.' },
    { t: 'mc', v: '8:9', f: 'c', q: '¿Cómo llegó el reino de Pérgamo a manos de Roma en 133 a.C.?', o: ['Su rey Atalo III se lo dejó en herencia', 'Lo conquistó el general Pompeyo', 'El Senado romano lo compró', 'Se rindió después de un largo sitio'], a: 0, e: 'Fue el único de los cuatro reinos que Roma no tuvo que pelear: Atalo III se lo dejó al Senado. Por eso se ve al cuerno salir de Pérgamo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 302.' },
    { t: 'mc', v: '8:10', f: 'c', q: 'Según la explicación del ángel en 8:24, ¿qué representan el «ejército» y las «estrellas» que el cuerno echa por tierra?', o: ['El pueblo de Dios', 'Los ángeles caídos', 'Los astros del cielo', 'Los ejércitos persas'], a: 0, e: 'En la explicación, el cuerno destruye «al pueblo de los santos» (8:24), en el mismo lugar que el ejército y las estrellas de la visión; Daniel 12:3 compara a los fieles con estrellas. Fuente: Bohr, <i>Daniel 1-10</i>, p. 306.' },
    { t: 'mc', v: '8:11', f: 'c', q: '¿Qué pasaje usa la misma expresión «Príncipe del ejército» y muestra que es Cristo, porque recibe adoración?', o: ['Josué 5:13-15', 'Génesis 14:18-20', 'Jueces 6:11-14', '1 Samuel 17:45'], a: 0, e: 'Josué se postra y lo adora, y el Príncipe le pide quitarse el calzado porque el lugar es santo, como a Moisés. Fuente: Bohr, <i>Daniel 1-10</i>, p. 307.' },
    { t: 'tf', v: '8:8', f: 'c', q: 'Daniel 11:4 ayuda a entender que los «cuatro vientos del cielo» de Daniel 8:8 son los cuatro puntos cardinales hacia donde se repartió el reino de Alejandro.', a: true, e: 'Verdadero: 11:4 dice que su reino sería «repartido hacia los cuatro vientos del cielo». Fuente: Bohr, <i>Daniel 1-10</i>, p. 296 y 298.' },
    { t: 'mc', v: '8:11', f: 'c', q: '¿En qué partes del santuario se hacía el ministerio llamado «el continuo»?', o: ['En el atrio y el lugar santo', 'Solo en el lugar santísimo', 'Solo en el altar del atrio', 'En el santísimo y el atrio'], a: 0, e: 'La palabra describe el servicio diario del sacerdote en el atrio y el lugar santo; nunca se usa para el santísimo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 308.' },
    { t: 'mc', v: '8:11', f: 'c', q: '¿Qué puso el papado en lugar del altar del incienso, que representa la oración e intercesión?', o: ['El confesionario', 'El rosario', 'La misa en latín', 'Las procesiones'], a: 0, e: 'En vez de llevar la oración a Dios por medio de Cristo, el único mediador (1 Timoteo 2:5), se pidió hacerlo ante un sacerdote. Fuente: apuntes «Cómo quitó el continuo el papado».' },
    { t: 'mc', v: '8:13', f: 'c', q: '¿Qué abarca la «visión» (jazón) por la que pregunta el ángel en 8:13?', o: ['Toda la visión, desde Persia', 'Solo la obra del cuerno pequeño', 'Solo la profanación de Antíoco', 'Solo los 1.260 años papales'], a: 0, e: 'Es la misma palabra de 8:1-2. Si la visión va de Persia hasta la purificación del santuario, 2.300 días literales no alcanzan: tienen que ser años. Fuente: Bohr, <i>Daniel 1-10</i>, p. 314.' },
    { t: 'tf', v: '8:14', f: 'c', q: 'Las «tardes y mañanas» de 8:14 son 1.150 sacrificios de la tarde y 1.150 de la mañana.', a: false, e: 'Falso: el hebreo dice «tarde-mañana» en singular, como en la creación, y los sacrificios siempre se nombran «mañana y tarde». Es una lectura para hacer encajar a Antíoco IV Epífanes. Fuente: Bohr, <i>Daniel 1-10</i>, p. 315.' },
    { t: 'mc', v: '8:14', f: 'c', q: '¿Qué pasaje da el mes y el día en que terminaron los 2.300 años?', o: ['Levítico 23:27', 'Éxodo 12:6', 'Números 29:1', 'Ezequiel 4:6'], a: 0, e: 'Daniel 8:14 da el año (1844) y Levítico 23:27 el día diez del mes séptimo, el Día de la Expiación, que en 1844 cayó el 22 de octubre. Fuente: Bohr, <i>El calendario del Mesías</i>, p. 8.' },
    { t: 'mc', v: '8:14', f: 'c', q: '¿Cuándo creyeron primero Miller y sus colaboradores que terminarían los 2.300 días?', o: ['En la primavera de 1844', 'En el otoño de 1843', 'En el invierno de 1844', 'En el verano de 1845'], a: 0, e: 'Primero pensaron en la primavera de 1844, pero la profecía señalaba el otoño de ese año. Fuente: CS 376.' },
    { t: 'tf', v: '8:14', f: 'c', q: 'El 22 de octubre de 1844 es la última fecha del calendario profético que Dios ha revelado.', a: true, e: 'Verdadero. Dios tiene fecha para el cierre de la gracia y la segunda venida, pero no la ha revelado; por eso no se deben fijar fechas. Fuente: Bohr, <i>El calendario del Mesías</i>, p. 8; PE 75.' },

    { t: 'mc', v: '8:9', f: 'c', q: '¿En qué orden «creció» Roma imperial sobre los reinos de Daniel 8:9?', o: ['Macedonia, Siria, Judea y Egipto', 'Egipto, Judea, Siria y Macedonia', 'Siria, Egipto, Macedonia y Judea', 'Judea, Macedonia, Egipto y Siria'], a: 0, e: 'Macedonia en 168 a.C., Siria en 65, Judea en 63 y Egipto en 30 a.C. Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 164.' },
    { t: 'tf', v: '8:10', f: 'c', q: 'En Daniel 8 el cuerno crece primero a lo ancho (Roma imperial) y después hacia arriba, hasta el ejército del cielo (Roma papal).', a: true, e: 'Verdadero: primero conquista reinos de la tierra (8:9) y después se levanta contra Dios y su pueblo (8:10-12). Fuente: Bohr, <i>Daniel 1-10</i>, p. 306.' },
    { t: 'mc', v: '8:23', f: 'c', q: '¿Por qué la abominación desoladora de Daniel no fue la de Antíoco IV Epífanes?', o: ['Jesús la puso en el futuro (Mateo 24:15)', 'Antíoco nunca fue rey seléucida', 'Antíoco no persiguió a los judíos', 'Antíoco reinó después de Roma'], a: 0, e: 'Antíoco murió en 164 a.C.; casi dos siglos después Jesús habló de la abominación como algo por venir. Fuente: Maxwell, <i>El porvenir del mundo revelado</i>, p. 163.' },
    { t: 'mc', v: '8:14', f: 'c', q: '¿En qué año empiezan juntas las 70 semanas y las 2.300 tardes y mañanas?', o: ['457 a.C.', '538 a.C.', '536 a.C.', '444 a.C.'], a: 0, e: 'Con la orden de Artajerjes I, en su séptimo año (Esdras 7), que entró en vigencia en el otoño de 457 a.C. Fuente: CS 373.' },
    { t: 'mc', v: '8:14', f: 'c', q: 'Si de las 2.300 tardes y mañanas se cortan las 70 semanas, ¿cuántos años quedan después de 34 d.C.?', o: ['1.810', '1.260', '1.844', '2.300'], a: 0, e: '2.300 − 490 = 1.810, y 34 + 1.810 = 1844. Fuente: CS 376.' },
    { t: 'tf', v: '8:14', f: 'c', q: 'La purificación del santuario de Daniel 8:14 y el juicio de Daniel 7:9-10 son el mismo suceso, que empieza en 1844.', a: true, e: 'Verdadero: las dos visiones pasan del cuerno pequeño al juicio en el cielo. Fuente: CS 477; Bohr, <i>Daniel 1-10</i>, p. 288.' },
    { t: 'mc', v: '8:14', f: 'c', q: '¿Qué fiesta del santuario representa la purificación de Daniel 8:14?', o: ['El Día de la Expiación', 'La Pascua', 'Pentecostés', 'La fiesta de las Cabañas'], a: 0, e: 'El día diez del mes séptimo el sumo sacerdote purificaba el santuario (Levítico 16:29-30); en 1844 cayó el 22 de octubre. Fuente: CS 451.' },
  ],
};
