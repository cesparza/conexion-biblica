/* Apocalipsis 7 — Los 144.000 sellados y la gran multitud.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap7', label: 'Apocalipsis 7', sub: 'Los 144.000 y la gran multitud', vs: 17,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Al final del capítulo 6 la gente preguntaba quién podría sostenerse en
      pie (6:17). Antes de que se abra el séptimo sello, el capítulo 7 nos
      muestra a los que son de Dios.<br><br>
      Cuatro ángeles <strong>detienen los cuatro vientos</strong> para que no
      hagan daño, mientras otro ángel pone <strong>el sello del Dios
      vivo</strong> en la frente de los siervos de Dios.<br><br>
      Juan <strong>oye</strong> el número: <strong>144.000</strong>, doce mil
      de cada tribu de Israel. Después <strong>ve</strong> una <strong>gran
      multitud</strong> que nadie podía contar, vestida de blanco y con palmas,
      delante del trono.<br><br>
      <em>La idea del capítulo: Dios marca y cuida a los suyos antes de la
      tormenta, y al final los lleva a vivir con él, sin hambre, sin sed y sin
      lágrimas.</em>`) },

    { t: '🌬️ Los cuatro vientos detenidos (7:1-3)', capa: 'nucleo', h:
      li([`Juan vio <strong>cuatro ángeles</strong> de pie sobre <strong>los
           cuatro ángulos de la tierra</strong> (7:1).`,
          `Estaban <strong>«deteniendo los cuatro vientos de la tierra»</strong>
           (7:1), para que no soplara viento sobre la tierra, ni sobre el mar,
           ni sobre ningún árbol.`,
          `Otro ángel <strong>«subía desde donde sale el sol»</strong> (7:2) y
           tenía <strong>el sello del Dios vivo</strong>.`,
          `Ese ángel les gritó a los cuatro: <strong>«No hagáis daño a la tierra
           ni al mar ni a los árboles hasta que hayamos sellado en sus frentes a
           los siervos de nuestro Dios»</strong> (7:3).`]) +
      wa(`Primero el sello, después el daño: los vientos no se sueltan hasta que
      los siervos de Dios estén sellados <strong>en sus frentes</strong>.<br>
      No confundas estos cuatro ángeles (en los <strong>cuatro ángulos de la
      tierra</strong>, deteniendo vientos) con los cuatro ángeles
      <strong>atados junto al gran río Éufrates</strong> de la sexta trompeta
      (9:14).`) },

    { t: '🔢 Los 144.000 sellados (7:4-8)', capa: 'nucleo', h:
      hi(`<strong>«Y oí el número de los sellados: ciento cuarenta y cuatro mil
      sellados de todas las tribus de los hijos de Israel»</strong> (7:4).
      Doce tribus por <strong>12.000</strong> cada una dan
      <strong>144.000</strong>.`) +
      tbl(['#', 'Tribu, en el orden del texto', 'Versículo'], [
        ['1', '<strong>Judá</strong>', '7:5'], ['2', 'Rubén', '7:5'], ['3', 'Gad', '7:5'],
        ['4', 'Aser', '7:6'], ['5', 'Neftalí', '7:6'], ['6', 'Manasés', '7:6'],
        ['7', 'Simeón', '7:7'], ['8', 'Leví', '7:7'], ['9', 'Isacar', '7:7'],
        ['10', 'Zabulón', '7:8'], ['11', 'José', '7:8'], ['12', '<strong>Benjamín</strong>', '7:8'],
      ]) +
      wa(`Judá va <strong>primero</strong> y Benjamín <strong>último</strong>.
      En esta lista <strong>no aparecen Dan ni Efraín</strong>; sí aparecen
      <strong>Leví</strong> (7:7), <strong>José</strong> (7:8) y
      <strong>Manasés</strong> (7:6). Cada tribu: <strong>doce mil</strong>.`) },

    { t: '🌴 La gran multitud (7:9-10)', capa: 'nucleo', h:
      hi(`<strong>«Después de esto miré, y vi una gran multitud, la cual nadie
      podía contar»</strong> (7:9).`) +
      tbl(['Detalle', 'Lo que dice el texto'], [
        ['De dónde', '«de todas las naciones, tribus, pueblos y lenguas» (7:9)'],
        ['Dónde estaban', 'Delante del <strong>trono</strong> y en la presencia del <strong>Cordero</strong> (7:9)'],
        ['Ropa', '<strong>Ropas blancas</strong> (7:9)'],
        ['En las manos', '<strong>Palmas</strong> (7:9)'],
        ['Qué clamaban', '«¡La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero!» (7:10)'],
      ]) },

    { t: '🔍 144.000 y gran multitud: no confundir (7:4-9)', capa: 'nucleo', h:
      tbl(['', 'Los 144.000', 'La gran multitud'], [
        ['Cómo lo supo Juan', 'Lo <strong>oyó</strong> (7:4)', 'La <strong>vio</strong> (7:9)'],
        ['¿Se puede contar?', 'Sí: 12.000 por tribu (7:5-8)', 'No: nadie podía contarla (7:9)'],
        ['De dónde', 'De las tribus de los hijos de Israel (7:4)', 'De todas las naciones, tribus, pueblos y lenguas (7:9)'],
        ['Qué se dice', 'Sellados en la frente (7:3-4)', 'Ropas blancas y palmas, delante del trono (7:9)'],
      ]) +
      wa(`El capítulo no dice si son dos grupos distintos o el mismo pueblo visto
      de dos maneras. Para el concurso, quédate con lo que dice cada versículo:
      el número se <strong>oye</strong>, la multitud se <strong>ve</strong>.`) },

    { t: '🙌 Los ángeles adoran (7:11-12)', capa: 'nucleo', h:
      hi(`Todos los ángeles que estaban alrededor del trono, de los ancianos y
      de los cuatro seres vivientes, <strong>«se postraron sobre sus rostros
      delante del trono y adoraron a Dios»</strong> (7:11).`) +
      tbl(['#', 'Lo que dan a Dios, en el orden de 7:12'], [
        ['1', 'La bendición'], ['2', 'La gloria'], ['3', 'La sabiduría'],
        ['4', 'La acción de gracias'], ['5', 'La honra'], ['6', 'El poder'],
        ['7', 'La fortaleza'],
      ]) +
      wa(`Son <strong>siete</strong> cosas, y la alabanza empieza y termina con
      <strong>«¡Amén!»</strong> (7:12). No la mezcles con la de 5:12, que
      dice poder, riquezas, sabiduría, fortaleza, honra, gloria y alabanza.`) },

    { t: '❓ ¿Quiénes son los de ropas blancas? (7:13-14)', capa: 'nucleo', h:
      tbl(['Quién habla', 'Qué dice'], [
        ['Uno de los ancianos', '«Estos que están vestidos de ropas blancas, ¿quiénes son y de dónde han venido?» (7:13)'],
        ['Juan', '«Señor, tú lo sabes» (7:14)'],
        ['El anciano', '«Éstos son los que han salido de la gran tribulación» (7:14)'],
        ['El anciano', '«han lavado sus ropas y las han blanqueado en la sangre del Cordero» (7:14)'],
      ]) +
      wa(`Ojo: las ropas quedaron blancas <strong>en la sangre del
      Cordero</strong>, no en agua. Y la pregunta la hace <strong>un
      anciano</strong>, no un ángel.`) },

    { t: '🏕️ Lo que Dios les promete (7:15-17)', capa: 'nucleo', h:
      tbl(['Promesa', 'Versículo'], [
        ['Están delante del trono y lo <strong>sirven día y noche</strong> en su templo', '7:15'],
        ['El que está sentado sobre el trono <strong>extenderá su tienda</strong> junto a ellos', '7:15'],
        ['Ya no tendrán <strong>hambre ni sed</strong>', '7:16'],
        ['El <strong>sol</strong> no caerá más sobre ellos, ni calor alguno', '7:16'],
        ['El Cordero <strong>los pastoreará</strong> y los guiará a <strong>fuentes de aguas vivas</strong>', '7:17'],
        ['«Dios enjugará toda lágrima de los ojos de ellos» (7:17)', '7:17'],
      ]) +
      wa(`Aquí el <strong>Cordero</strong> hace de <strong>pastor</strong>:
      «el Cordero que está en medio del trono los pastoreará» (7:17).`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Otras iglesias leen estos
      símbolos de otra manera; aquí va la lectura adventista.<br><br>
      · Los <strong>cuatro vientos</strong> se entienden como la lucha y la
      destrucción del final, que Dios detiene por un tiempo mientras sella a su
      pueblo («El conflicto de los siglos»).<br>
      · El <strong>sellamiento</strong> ocurre en el tiempo del fin, antes de
      la venida de Jesús. El sello de Dios se relaciona con su ley, y en
      especial con el <strong>sábado</strong> del cuarto mandamiento, que
      presenta a Dios como Creador (Éxodo 20:8-11).<br>
      · El sello <strong>en la frente</strong> se lee como una mente firme en
      la verdad de Dios, no como una marca visible.<br>
      · Sobre si el número 144.000 es literal o simbólico hay opiniones
      distintas aun dentro de la iglesia, y Elena de White aconsejó no
      discutir sobre quiénes lo forman.`) },
  ],

  preguntas: [
    { t: 'mc', v: '7:1', lit: 'cuatro ángeles de pie sobre los cuatro ángulos de la tierra',
      q: '¿Qué vio Juan de pie sobre los cuatro ángulos de la tierra? (Apocalipsis 7:1)',
      o: ['Cuatro ángeles', 'Cuatro seres vivientes', 'Cuatro jinetes', 'Cuatro ancianos'], a: 0,
      e: '«…vi cuatro ángeles de pie sobre los cuatro ángulos de la tierra» (7:1). Los cuatro jinetes son los de los sellos del capítulo 6.' },
    { t: 'mc', v: '7:1', lit: 'deteniendo los cuatro vientos de la tierra',
      q: '¿Qué estaban deteniendo los cuatro ángeles? (Apocalipsis 7:1)',
      o: ['Los cuatro vientos de la tierra', 'Las aguas del gran río Éufrates', 'Las siete trompetas del juicio', 'El fuego del altar de oro'], a: 0,
      e: '«…deteniendo los cuatro vientos de la tierra para que no soplara viento alguno» (7:1).' },
    { t: 'tf', v: '7:1',
      q: 'Los cuatro ángeles detenían los vientos para que no soplaran sobre la tierra, ni sobre el mar, ni sobre árbol alguno. (Apocalipsis 7:1)', a: true,
      e: 'Verdadero (Apocalipsis 7:1).' },
    { t: 'mc', v: '7:1', f: 'c',
      q: 'En la interpretación adventista, ¿qué representan los cuatro vientos detenidos?',
      o: ['La lucha y destrucción final que Dios detiene', 'Las cuatro estaciones del año', 'Los cuatro evangelios del Nuevo Testamento', 'Los cuatro seres vivientes del trono'], a: 0,
      e: 'Interpretación: la lucha y la destrucción del final, detenidas mientras Dios sella a su pueblo. El texto solo dice que los ángeles detenían los vientos (7:1).' },
    { t: 'mc', v: '7:2', lit: 'subía desde donde sale el sol',
      q: '¿De dónde subía el ángel que tenía el sello del Dios vivo? (Apocalipsis 7:2)',
      o: ['Desde donde sale el sol', 'Desde el pozo del abismo', 'Desde el gran río Éufrates', 'Desde el mar de vidrio'], a: 0,
      e: '«Vi también otro ángel, que subía desde donde sale el sol» (7:2).' },
    { t: 'mc', v: '7:2', lit: 'tenía el sello del Dios vivo',
      q: '¿Qué tenía el ángel que subía desde donde sale el sol? (Apocalipsis 7:2)',
      o: ['El sello del Dios vivo', 'Un incensario de oro', 'La llave del abismo', 'Una hoz aguda'], a: 0,
      e: '«…y que tenía el sello del Dios vivo» (7:2). El incensario es de 8:3 y la llave del abismo de 9:1.' },
    { t: 'mc', v: '7:2', f: 'c',
      q: 'En la lectura adventista, ¿con qué se relaciona el sello del Dios vivo?',
      o: ['Con la ley de Dios y el sábado', 'Con un anillo de sellar de oro', 'Con una marca visible en la piel', 'Con la circuncisión de Israel'], a: 0,
      e: 'Interpretación: el sello se relaciona con la ley de Dios y en especial con el sábado, que lo presenta como Creador. El texto solo dice «el sello del Dios vivo» (7:2).' },
    { t: 'fill', v: '7:3', ins: 'Apocalipsis 7:3 (RV1995) — Completa:',
      p: [{ x: '«No hagáis daño a la tierra ni al mar ni a los ' }, { b: 'árboles', h: '¿a qué más?' }, { x: ' hasta que hayamos sellado en sus ' }, { b: 'frentes', h: '¿dónde?' }, { x: ' a los siervos de nuestro Dios.»' }] },
    { t: 'mc', v: '7:3', lit: 'sellado en sus frentes',
      q: '¿En qué parte del cuerpo se sellaba a los siervos de Dios? (Apocalipsis 7:3)',
      o: ['En sus frentes', 'En sus manos derechas', 'En sus corazones', 'En sus ropas blancas'], a: 0,
      e: '«…hasta que hayamos sellado en sus frentes a los siervos de nuestro Dios» (7:3).' },
    { t: 'mc', v: '7:3', lit: 'No hagáis daño a la tierra',
      q: '¿Qué texto dice «No hagáis daño a la tierra ni al mar ni a los árboles»?',
      o: ['Apocalipsis 7:3', 'Apocalipsis 7:1', 'Apocalipsis 9:4', 'Apocalipsis 8:7'], a: 0,
      e: 'Apocalipsis 7:3: lo grita el ángel que tenía el sello del Dios vivo a los cuatro ángeles.' },
    { t: 'mc', v: '7:3', f: 'c',
      q: 'En la lectura adventista, ¿cuándo ocurre el sellamiento de los siervos de Dios?',
      o: ['En el tiempo del fin, antes de la venida de Jesús', 'En los días de Moisés en el desierto', 'Después de los mil años del milenio', 'En el día de Pentecostés en Jerusalén'], a: 0,
      e: 'Interpretación: en el tiempo del fin, antes de que se suelten los vientos y venga Jesús. El texto dice que el daño espera «hasta que hayamos sellado» (7:3).' },
    { t: 'mc', v: '7:4', lit: 'ciento cuarenta y cuatro mil sellados',
      q: '¿Cuántos sellados oyó Juan? (Apocalipsis 7:4)',
      o: ['144.000', '12.000', '200.000.000', '7.000'], a: 0,
      e: '«…ciento cuarenta y cuatro mil sellados de todas las tribus de los hijos de Israel» (7:4). Los doscientos millones son los jinetes de 9:16.' },
    { t: 'tf', v: '7:4',
      q: 'Según Apocalipsis 7:4, Juan vio el número de los sellados.', a: false,
      e: 'Falso: dice «Y OÍ el número de los sellados» (7:4). La gran multitud, en cambio, la vio (7:9).' },
    { t: 'fill', v: '7:4', ins: 'Apocalipsis 7:4 (RV1995) — Completa:',
      p: [{ x: 'Y oí el número de los sellados: ' }, { b: 'ciento cuarenta y cuatro mil', h: '¿cuántos?' }, { x: ' sellados de todas las tribus de los hijos de ' }, { b: 'Israel', h: '¿de quién?' }, { x: '.' }] },
    { t: 'mc', v: '7:5', lit: 'De la tribu de Judá, doce mil sellados',
      q: '¿Cuál es la primera tribu en la lista de los sellados? (Apocalipsis 7:5)',
      o: ['Judá', 'Rubén', 'Leví', 'Benjamín'], a: 0,
      e: '«De la tribu de Judá, doce mil sellados» (7:5). Le siguen Rubén y Gad.' },
    { t: 'mc', v: '7:5-8', lit: 'doce mil',
      q: '¿Cuántos sellados había de cada tribu? (Apocalipsis 7:5-8)',
      o: ['Doce mil', 'Diez mil', 'Siete mil', 'Mil'], a: 0,
      e: 'De cada tribu, «doce mil» (7:5-8). Doce tribus por doce mil dan 144.000 (7:4).' },
    { t: 'tf', v: '7:6',
      q: 'Apocalipsis 7:6 nombra las tribus de Aser, Neftalí y Efraín.', a: false,
      e: 'Falso: nombra a Aser, Neftalí y MANASÉS (7:6). Efraín no aparece en la lista.' },
    { t: 'mc', v: '7:7', lit: 'De la tribu de Simeón',
      q: '¿Qué tribus se nombran en Apocalipsis 7:7?',
      o: ['Simeón, Leví e Isacar', 'Aser, Neftalí y Manasés', 'Judá, Rubén y Gad', 'Zabulón, José y Benjamín'], a: 0,
      e: 'Apocalipsis 7:7: Simeón, Leví e Isacar. Judá, Rubén y Gad son de 7:5; Aser, Neftalí y Manasés de 7:6; Zabulón, José y Benjamín de 7:8.' },
    { t: 'mc', v: '7:5-8',
      q: '¿Cuál de estas tribus NO aparece en la lista de Apocalipsis 7:5-8?',
      o: ['Dan', 'Leví', 'José', 'Manasés'], a: 0,
      e: 'La lista nombra a Leví (7:7), José (7:8) y Manasés (7:6). Dan no aparece; tampoco Efraín.' },
    { t: 'tf', v: '7:8',
      q: 'La última tribu de la lista de los sellados es Benjamín. (Apocalipsis 7:8)', a: true,
      e: 'Verdadero: «De la tribu de Benjamín, doce mil sellados» (7:8).' },
    { t: 'mc', v: '7:9', lit: 'la cual nadie podía contar',
      q: '¿Qué vio Juan después de oír el número de los sellados? (Apocalipsis 7:9)',
      o: ['Una gran multitud que nadie podía contar', 'Un ejército de doscientos millones', 'Siete ángeles con siete trompetas', 'Un ángel con un incensario de oro'], a: 0,
      e: '«…vi una gran multitud, la cual nadie podía contar» (7:9).' },
    { t: 'mc', v: '7:9', lit: 'de todas las naciones, tribus, pueblos y lenguas',
      q: '¿De dónde venía la gran multitud? (Apocalipsis 7:9)',
      o: ['De todas las naciones, tribus, pueblos y lenguas', 'Solo de las doce tribus de los hijos de Israel', 'De las siete iglesias que están en Asia', 'De la gran ciudad de Jerusalén y de Judea'], a: 0,
      e: '«…de todas las naciones, tribus, pueblos y lenguas» (7:9). Los 144.000 son «de todas las tribus de los hijos de Israel» (7:4).' },
    { t: 'mc', v: '7:9', lit: 'con palmas en sus manos',
      q: '¿Qué tenían en las manos los de la gran multitud? (Apocalipsis 7:9)',
      o: ['Palmas', 'Arpas de oro', 'Copas de incienso', 'Coronas de oro'], a: 0,
      e: '«…vestidos de ropas blancas y con palmas en sus manos» (7:9).' },
    { t: 'tf', v: '7:10',
      q: 'La gran multitud clamaba que la salvación pertenece a nuestro Dios y al Cordero. (Apocalipsis 7:10)', a: true,
      e: 'Verdadero: «¡La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero!» (7:10).' },
    { t: 'mc', v: '7:10', lit: 'La salvación pertenece a nuestro Dios',
      q: '¿Qué texto dice «La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero»?',
      o: ['Apocalipsis 7:10', 'Apocalipsis 7:12', 'Apocalipsis 7:14', 'Apocalipsis 5:13'], a: 0,
      e: 'Apocalipsis 7:10: lo clama a gran voz la gran multitud.' },
    { t: 'mc', v: '7:11', lit: 'se postraron sobre sus rostros',
      q: '¿Qué hicieron todos los ángeles que estaban alrededor del trono? (Apocalipsis 7:11)',
      o: ['Se postraron sobre sus rostros y adoraron a Dios', 'Tocaron sus trompetas delante del trono', 'Echaron sus coronas delante del trono', 'Cantaron un cántico nuevo con sus arpas'], a: 0,
      e: '«…se postraron sobre sus rostros delante del trono y adoraron a Dios» (7:11). Los que echan sus coronas son los ancianos de 4:10.' },
    { t: 'mc', v: '7:12', lit: 'la honra, el poder y la fortaleza',
      q: '¿Cuántas cosas dan los ángeles a Dios en la alabanza de Apocalipsis 7:12?',
      o: ['Siete', 'Cuatro', 'Tres', 'Doce'], a: 0,
      e: 'Siete: la bendición, la gloria, la sabiduría, la acción de gracias, la honra, el poder y la fortaleza (7:12).' },
    { t: 'tf', v: '7:12',
      q: 'La alabanza de los ángeles en Apocalipsis 7:12 empieza y termina con «¡Amén!».', a: true,
      e: 'Verdadero: «¡Amén! La bendición… por los siglos de los siglos. ¡Amén!» (7:12).' },
    { t: 'mc', v: '7:13', lit: 'uno de los ancianos habló',
      q: '¿Quién le preguntó a Juan quiénes eran los vestidos de ropas blancas? (Apocalipsis 7:13)',
      o: ['Uno de los ancianos', 'Uno de los seres vivientes', 'El ángel del sello', 'Uno de los siete ángeles'], a: 0,
      e: '«Entonces uno de los ancianos habló, diciéndome…» (7:13).' },
    { t: 'mc', v: '7:14', lit: 'Señor, tú lo sabes',
      q: '¿Qué le respondió Juan al anciano? (Apocalipsis 7:14)',
      o: ['«Señor, tú lo sabes»', '«No lo sé, Señor»', '«Son los profetas»', '«Son los apóstoles»'], a: 0,
      e: '«Yo le dije: “Señor, tú lo sabes”» (7:14). Entonces el anciano le explicó.' },
    { t: 'mc', v: '7:14', lit: 'los que han salido de la gran tribulación',
      q: 'Según el anciano, ¿de dónde habían salido los vestidos de ropas blancas? (Apocalipsis 7:14)',
      o: ['De la gran tribulación', 'De las doce tribus', 'Del pozo del abismo', 'De la gran ciudad'], a: 0,
      e: '«Éstos son los que han salido de la gran tribulación» (7:14).' },
    { t: 'fill', v: '7:14', ins: 'Apocalipsis 7:14 (RV1995) — Completa:',
      p: [{ x: 'han lavado sus ropas y las han ' }, { b: 'blanqueado', h: '¿qué hicieron con ellas?' }, { x: ' en la ' }, { b: 'sangre', h: '¿en qué?' }, { x: ' del Cordero.' }] },
    { t: 'tf', v: '7:14',
      q: 'El anciano dice que los de ropas blancas son los que han salido de la gran batalla. (Apocalipsis 7:14)', a: false,
      e: 'Falso: dice «de la gran TRIBULACIÓN» (7:14).' },
    { t: 'mc', v: '7:15', lit: 'lo sirven día y noche en su templo',
      q: '¿Qué hacen los de ropas blancas delante del trono de Dios? (Apocalipsis 7:15)',
      o: ['Lo sirven día y noche en su templo', 'Juzgan a las doce tribus de Israel', 'Reinan sobre la tierra mil años', 'Tocan arpas sobre el mar de vidrio'], a: 0,
      e: '«Por eso están delante del trono de Dios y lo sirven día y noche en su templo» (7:15).' },
    { t: 'tf', v: '7:15',
      q: 'El que está sentado sobre el trono extenderá su tienda junto a ellos. (Apocalipsis 7:15)', a: true,
      e: 'Verdadero (Apocalipsis 7:15).' },
    { t: 'mc', v: '7:16', lit: 'Ya no tendrán hambre ni sed',
      q: 'Según Apocalipsis 7:16, ¿qué ya no tendrán los de ropas blancas?',
      o: ['Hambre ni sed', 'Miedo ni dolor', 'Frío ni noche', 'Trabajo ni cansancio'], a: 0,
      e: '«Ya no tendrán hambre ni sed, y el sol no caerá más sobre ellos, ni calor alguno» (7:16).' },
    { t: 'tf', v: '7:16',
      q: 'Según Apocalipsis 7:16, la luna no caerá más sobre ellos.', a: false,
      e: 'Falso: dice que el SOL no caerá más sobre ellos, ni calor alguno (7:16).' },
    { t: 'mc', v: '7:17', lit: 'los guiará a fuentes de aguas vivas',
      q: '¿A dónde los guiará el Cordero? (Apocalipsis 7:17)',
      o: ['A fuentes de aguas vivas', 'A la ciudad de oro puro', 'Al monte de Sion', 'A verdes pastos junto al río'], a: 0,
      e: '«…el Cordero que está en medio del trono los pastoreará y los guiará a fuentes de aguas vivas» (7:17).' },
    { t: 'fill', v: '7:17', ins: 'Apocalipsis 7:17 (RV1995) — Completa:',
      p: [{ x: 'porque el ' }, { b: 'Cordero', h: '¿quién?' }, { x: ' que está en medio del trono los ' }, { b: 'pastoreará', h: '¿qué hará con ellos?' }, { x: ' y los guiará a fuentes de aguas vivas.' }] },
    { t: 'mc', v: '7:17', lit: 'Dios enjugará toda lágrima',
      q: '¿Qué texto dice «Y Dios enjugará toda lágrima de los ojos de ellos»?',
      o: ['Apocalipsis 7:17', 'Apocalipsis 7:16', 'Apocalipsis 7:15', 'Apocalipsis 7:10'], a: 0,
      e: 'Apocalipsis 7:17, el último versículo del capítulo.' },
  ],

  tarjetas: [
    { f: 'Qué detenían los cuatro ángeles (7:1)', r: 'Los cuatro vientos de la tierra' },
    { f: 'De dónde subía el ángel del sello y qué tenía (7:2)', r: 'Desde donde sale el sol; el sello del Dios vivo' },
    { f: 'Dónde se sella a los siervos de Dios (7:3)', r: 'En sus frentes' },
    { f: 'Número de los sellados (7:4)', r: '144.000 (lo oyó Juan): 12.000 de cada tribu' },
    { f: 'Las doce tribus, en orden (7:5-8)', r: 'Judá, Rubén, Gad, Aser, Neftalí, Manasés, Simeón, Leví, Isacar, Zabulón, José, Benjamín' },
    { f: 'Tribus que no aparecen en la lista (7:5-8)', r: 'Dan y Efraín' },
    { f: 'La gran multitud (7:9)', r: 'Nadie podía contarla; de todas las naciones, tribus, pueblos y lenguas; ropas blancas y palmas' },
    { f: '«¡La salvación pertenece a nuestro Dios, que está sentado en el trono, y al Cordero!»', r: 'Apocalipsis 7:10' },
    { f: 'Las siete cosas de la alabanza de los ángeles (7:12)', r: 'Bendición, gloria, sabiduría, acción de gracias, honra, poder y fortaleza' },
    { f: 'Respuesta de Juan al anciano (7:14)', r: '«Señor, tú lo sabes»' },
    { f: 'Quiénes son los de ropas blancas (7:14)', r: 'Los que salieron de la gran tribulación y blanquearon sus ropas en la sangre del Cordero' },
    { f: 'Promesas de 7:16-17', r: 'Sin hambre ni sed, sin sol ni calor; el Cordero los pastorea y los lleva a fuentes de aguas vivas; Dios enjuga toda lágrima' },
  ],
};
