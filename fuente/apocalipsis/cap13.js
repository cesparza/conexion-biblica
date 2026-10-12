/* Apocalipsis 13 — La bestia del mar y la bestia de la tierra.
   Sigue el modelo de cap01.js; se revisa con tools/apocalipsis-revisa.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap13', label: 'Apocalipsis 13', sub: 'Las dos bestias, la marca y el número', vs: 18,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Juan ve <strong>dos bestias</strong>. La primera <strong>sube del
      mar</strong>: tiene siete cabezas y diez cuernos, y el dragón le da su
      poder. La segunda <strong>sube de la tierra</strong>: parece mansa, con
      dos cuernos como de cordero, pero <strong>habla como un dragón</strong>.<br><br>
      La segunda hace que todo el mundo adore a la primera bestia. Manda
      hacer una <strong>imagen</strong> y hace que pongan una
      <strong>marca</strong> en la mano derecha o en la frente. Sin la marca nadie puede <strong>comprar ni
      vender</strong>. Y el número de la bestia es <strong>666</strong>.<br><br>
      Pero en medio de todo, el capítulo recuerda a los que tienen su nombre
      en <strong>el libro de la vida del Cordero</strong> (13:8).<br><br>
      <em>La idea del capítulo: al final habrá presión para adorar a quien no
      es Dios, y los santos se mantienen fieles con paciencia y fe.</em>`) },

    { t: '🌊 La bestia que sube del mar (13:1-2)', capa: 'nucleo', h:
      hi(`<strong>«Me paré sobre la arena del mar y vi subir del mar una
      bestia»</strong> (13:1).`) +
      tbl(['Parte', 'Cómo era'], [
        ['Cabezas', '<strong>Siete</strong>, y sobre ellas <strong>nombres de blasfemia</strong> (13:1)'],
        ['Cuernos', '<strong>Diez</strong>, con <strong>diez diademas</strong> en los cuernos (13:1)'],
        ['Cuerpo', 'Semejante a un <strong>leopardo</strong> (13:2)'],
        ['Pies', 'Como de <strong>oso</strong> (13:2)'],
        ['Boca', 'Como boca de <strong>león</strong> (13:2)'],
        ['Quién le da poder', 'El <strong>dragón</strong>: «su poder, su trono y gran autoridad» (13:2)'],
      ]) +
      wa(`No se cruzan las diademas: el <strong>dragón</strong> de 12:3 tiene
      siete diademas <strong>en las cabezas</strong>; esta bestia tiene diez
      diademas <strong>en los cuernos</strong>.<br>
      Y los animales son los de Daniel 7 (león, oso, leopardo y una bestia con
      diez cuernos), pero aquí todo junto en una sola bestia.`) },

    { t: '🩹 La herida sanada (13:3-4)', capa: 'nucleo', h:
      li([`Una de sus cabezas estaba <strong>como herida de muerte</strong>,
           <strong>«pero su herida mortal fue sanada»</strong> (13:3).`,
          `<strong>«Toda la tierra se maravilló en pos de la bestia»</strong> (13:3).`,
          `Adoraron a dos: <strong>al dragón</strong>, que le dio autoridad, y
           <strong>a la bestia</strong> (13:4).`,
          `Y decían: <strong>«¿Quién como la bestia y quién podrá luchar contra
           ella?»</strong> (13:4).`]) },

    { t: '🗣️ Boca, 42 meses y guerra (13:5-8)', capa: 'nucleo', h:
      tbl(['Qué se le dio o hizo', 'Texto'], [
        ['Una boca', 'Que hablaba <strong>arrogancias y blasfemias</strong> (13:5)'],
        ['Tiempo', 'Autoridad para actuar por <strong>cuarenta y dos meses</strong> (13:5)'],
        ['Blasfemias', 'Contra <strong>Dios</strong>, su <strong>nombre</strong>, su <strong>tabernáculo</strong> y los que habitan en el cielo (13:6)'],
        ['Guerra', 'Contra <strong>los santos</strong>, y vencerlos (13:7)'],
        ['Autoridad', 'Sobre <strong>toda tribu, pueblo, lengua y nación</strong> (13:7)'],
      ]) +
      hi(`¿Quiénes la adoraron? Los habitantes de la tierra cuyos nombres no
      estaban escritos <strong>«en el libro de la vida del Cordero que fue
      inmolado»</strong> (13:8).`) +
      wa(`Los 42 meses salen también en 11:2. Contando meses de 30 días, dan
      los mismos <strong>1.260 días</strong> de 11:3 y 12:6.`) },

    { t: '👂 «Si alguno tiene oído» (13:9-10)', capa: 'nucleo', h:
      hi(`<strong>«Si alguno tiene oído, oiga»</strong> (13:9).<br><br>
      <strong>«Si alguno lleva en cautividad, a cautividad irá. Si alguno mata a
      espada, a espada será muerto»</strong> (13:10).<br><br>
      Y termina: <strong>«Aquí está la perseverancia y la fe de los
      santos»</strong> (13:10).`) +
      wa(`Frase parecida en 14:12: «Aquí está la perseverancia de los santos,
      los que guardan los mandamientos de Dios y la fe de Jesús». En
      <strong>13:10</strong> es «la perseverancia y la fe de los santos».`) },

    { t: '🐑 La bestia que sube de la tierra (13:11-15)', capa: 'nucleo', h:
      hi(`<strong>«Después vi otra bestia que subía de la tierra»</strong> (13:11).
      <strong>«Tenía dos cuernos semejantes a los de un cordero, pero hablaba
      como un dragón»</strong> (13:11).`) +
      li([`Ejerce toda la autoridad de la primera bestia y hace que la tierra
           <strong>adore a la primera bestia</strong> (13:12).`,
          `Hace grandes señales: hasta hace <strong>descender fuego del cielo</strong>
           a la tierra (13:13).`,
          `Engaña a la gente y les dice que hagan <strong>una imagen a la
           bestia</strong> «que fue herida de espada y revivió» (13:14).`,
          `Se le permitió <strong>infundir aliento</strong> a la imagen, para que
           la imagen <strong>hablara</strong> e hiciera matar a todo el que no la
           adorara (13:15).`]) },

    { t: '⚖️ Las dos bestias lado a lado (13:1-15)', capa: 'nucleo', h:
      tbl(['', 'Primera bestia', 'Segunda bestia'], [
        ['De dónde sube', 'Del <strong>mar</strong> (13:1)', 'De la <strong>tierra</strong> (13:11)'],
        ['Cuernos', '<strong>Diez</strong>, con diez diademas (13:1)', '<strong>Dos</strong>, como de cordero (13:11)'],
        ['Cabezas', 'Siete (13:1)', 'No se dice'],
        ['Cómo habla', 'Arrogancias y blasfemias (13:5)', 'Como un <strong>dragón</strong> (13:11)'],
        ['Su poder', 'Se lo da el <strong>dragón</strong> (13:2)', 'Ejerce la autoridad de la <strong>primera bestia</strong> (13:12)'],
        ['Qué hace', 'Guerra contra los santos (13:7)', 'Señales, fuego del cielo, la imagen y la marca (13:13-16)'],
        ['Lo que la distingue', 'Una cabeza herida de muerte y sanada (13:3)', 'Hace que adoren a la primera (13:12)'],
      ]) +
      wa(`La segunda bestia <strong>no pide que la adoren a ella</strong>: hace
      que adoren a la <strong>primera</strong>. En 19:20 aparece «el falso
      profeta», que hizo señales delante de la bestia y engañó a los que
      recibieron su marca: la misma obra de esta segunda bestia.`) },

    { t: '✋ La marca (13:16-17)', capa: 'nucleo', h:
      tbl(['Pregunta', 'Lo que dice el texto'], [
        ['¿A quiénes?', 'A todos: <strong>pequeños y grandes, ricos y pobres, libres y esclavos</strong> (13:16)'],
        ['¿Dónde?', '<strong>En la mano derecha o en la frente</strong> (13:16)'],
        ['¿Para qué?', 'Que nadie pudiera <strong>comprar ni vender</strong> sin ella (13:17)'],
        ['Tres formas', 'La <strong>marca</strong>, el <strong>nombre</strong> de la bestia o el <strong>número de su nombre</strong> (13:17)'],
      ]) +
      wa(`Contraste: los siervos de Dios reciben el <strong>sello</strong> «en
      sus frentes» (7:3), y los 144.000 tienen el nombre del Cordero y de su
      Padre <strong>en la frente</strong> (14:1). La marca de la bestia puede ir
      en la frente <strong>o en la mano derecha</strong>.`) },

    { t: '🔢 El número (13:18)', capa: 'nucleo', h:
      hi(`<strong>«Aquí hay sabiduría. El que tiene entendimiento cuente el
      número de la bestia, pues es número de hombre»</strong> (13:18).<br><br>
      <strong>«Y su número es seiscientos sesenta y seis»</strong> (13:18).`) +
      wa(`No confundir los números de estos capítulos: <strong>666</strong> es el
      número de la bestia (13:18); <strong>144.000</strong> son los que están con
      el Cordero (14:1); <strong>42 meses</strong> es el tiempo de la bestia
      (13:5).`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. La iglesia adventista lee
      estas bestias como <strong>sistemas y poderes</strong>, nunca como un
      juicio contra personas: Dios tiene hijos sinceros en todas las iglesias.<br><br>
      · La <strong>bestia del mar</strong> junta los animales de Daniel 7 y se
      entiende como el poder que siguió a Roma: el <strong>papado</strong> como
      sistema religioso y político.<br>
      · Los <strong>42 meses</strong> (13:5), con la regla de un día por un año
      (Ezequiel 4:6), son <strong>1.260 años</strong>: del 538 al 1798 d.C.<br>
      · La <strong>herida de muerte</strong> (13:3) se ve en 1798, cuando el papa
      fue llevado preso; la herida sanada, en que recuperó su influencia.<br>
      · La <strong>bestia de la tierra</strong> (13:11) no sube del mar de pueblos
      (17:15) sino de un lugar poco poblado, con cuernos de cordero (libertad
      civil y religiosa): los <strong>Estados Unidos</strong>. Que hable como
      dragón anuncia que al final usará la ley en asuntos de conciencia.<br>
      · La <strong>marca</strong> (13:16) es lo contrario del sello de Dios: la
      obediencia impuesta por ley a un día de culto en lugar del
      <strong>sábado</strong> del cuarto mandamiento. Nadie la tiene hoy: se
      recibe cuando esa ley se imponga y cada uno escoja a sabiendas.`) },
  ],

  preguntas: [
    { t: 'mc', v: '13:1', lit: 'Me paré sobre la arena del mar',
      q: '¿Dónde se paró Juan para ver la primera bestia? (Apocalipsis 13:1)',
      o: ['Sobre la arena del mar', 'Sobre el monte de Sión', 'A la orilla del río Éufrates', 'En la plaza de la gran ciudad'], a: 0,
      e: '«Me paré sobre la arena del mar y vi subir del mar una bestia» (13:1).' },
    { t: 'mc', v: '13:1', lit: 'vi subir del mar una bestia',
      q: '¿De dónde subía la primera bestia de Apocalipsis 13?',
      o: ['Del mar', 'De la tierra', 'Del abismo', 'Del desierto'], a: 0,
      e: '«…vi subir del mar una bestia» (13:1). La segunda sube de la tierra (13:11); la de 11:7 sube del abismo.' },
    { t: 'mc', v: '13:1', lit: 'siete cabezas y diez cuernos',
      q: '¿Cuántas cabezas y cuántos cuernos tenía la bestia del mar? (Apocalipsis 13:1)',
      o: ['Siete cabezas y diez cuernos', 'Diez cabezas y siete cuernos', 'Siete cabezas y siete cuernos', 'Cuatro cabezas y diez cuernos'], a: 0,
      e: '«…una bestia que tenía siete cabezas y diez cuernos» (13:1).' },
    { t: 'tf', v: '13:1',
      q: 'En Apocalipsis 13:1, las diez diademas de la bestia estaban sobre sus cabezas.', a: false,
      e: 'Falso: las diez diademas estaban en sus CUERNOS; sobre las cabezas tenía nombres de blasfemia (13:1).' },
    { t: 'mc', v: '13:2', lit: 'semejante a un leopardo, sus pies eran como de oso',
      q: '¿Cómo era la bestia que subió del mar? (Apocalipsis 13:2)',
      o: ['Leopardo, con pies de oso y boca de león', 'León, con pies de oso y boca de leopardo', 'Oso, con pies de leopardo y boca de león', 'Leopardo, con pies de león y boca de oso'], a: 0,
      e: '«…era semejante a un leopardo, sus pies eran como de oso y su boca como boca de león» (13:2).' },
    { t: 'mc', v: '13:2', lit: 'El dragón le dio su poder, su trono y gran autoridad',
      q: 'Según Apocalipsis 13:2, ¿qué le dio el dragón a la bestia?',
      o: ['Su poder, su trono y gran autoridad', 'Su espada, su corona y sus ángeles', 'Su sello, su nombre y su número', 'Su arco, su caballo y su balanza'], a: 0,
      e: '«El dragón le dio su poder, su trono y gran autoridad» (13:2).' },
    { t: 'tf', v: '13:3',
      q: 'Una de las cabezas de la bestia estaba como herida de muerte, pero su herida mortal fue sanada. (Apocalipsis 13:3)', a: true,
      e: 'Verdadero (13:3). Y «toda la tierra se maravilló en pos de la bestia».' },
    { t: 'mc', v: '13:4', lit: 'Quién como la bestia y quién podrá luchar contra ella',
      q: '¿Qué texto dice «¿Quién como la bestia y quién podrá luchar contra ella?»?',
      o: ['Apocalipsis 13:4', 'Apocalipsis 13:14', 'Apocalipsis 13:12', 'Apocalipsis 13:8'], a: 0,
      e: 'Apocalipsis 13:4. Es lo que decían los que adoraban a la bestia.' },
    { t: 'mc', v: '13:4', lit: 'adoraron al dragón que había dado autoridad a la bestia',
      q: 'Según Apocalipsis 13:4, ¿a quiénes adoraron?',
      o: ['Al dragón y a la bestia', 'Solo a la imagen de la bestia', 'Al falso profeta y a la imagen', 'A la mujer y al dragón'], a: 0,
      e: '«…y adoraron al dragón que había dado autoridad a la bestia, y adoraron a la bestia» (13:4).' },
    { t: 'mc', v: '13:5', lit: 'para actuar por cuarenta y dos meses',
      q: '¿Por cuánto tiempo se le dio autoridad a la bestia para actuar? (Apocalipsis 13:5)',
      o: ['Cuarenta y dos meses', 'Cinco meses de tormento', 'Tres días y medio', 'Diez días de tribulación'], a: 0,
      e: '«…se le dio autoridad para actuar por cuarenta y dos meses» (13:5). Los cinco meses son de 9:5; los tres días y medio, de 11:9; los diez días, de 2:10.' },
    { t: 'fill', v: '13:5', ins: 'Apocalipsis 13:5 (RV1995) — Completa:',
      p: [{ x: '«También se le dio boca que hablaba ' }, { b: 'arrogancias', h: '¿qué hablaba, además de blasfemias?' }, { x: ' y blasfemias, y se le dio autoridad para actuar por cuarenta y dos ' }, { b: 'meses', h: '¿cuarenta y dos qué?' }, { x: '.»' }] },
    { t: 'mc', v: '13:6', lit: 'de su tabernáculo y de los que habitan en el cielo',
      q: 'Según Apocalipsis 13:6, ¿contra qué blasfemaba la bestia?',
      o: ['Contra Dios, su nombre, su tabernáculo y los del cielo', 'Contra los reyes, los profetas, el templo y la ciudad', 'Contra la mujer, su hijo, el desierto y las aguas', 'Contra el Cordero, sus ángeles, su trono y su ley'], a: 0,
      e: '«…para blasfemar contra Dios, para blasfemar de su nombre, de su tabernáculo y de los que habitan en el cielo» (13:6).' },
    { t: 'tf', v: '13:7',
      q: 'Se le permitió a la bestia hacer guerra contra los santos, y vencerlos. (Apocalipsis 13:7)', a: true,
      e: 'Verdadero (13:7).' },
    { t: 'mc', v: '13:7', lit: 'sobre toda tribu, pueblo, lengua y nación',
      q: 'Según Apocalipsis 13:7, ¿sobre quiénes se le dio autoridad a la bestia?',
      o: ['Sobre toda tribu, pueblo, lengua y nación', 'Sobre las doce tribus de los hijos de Israel', 'Sobre las siete iglesias que están en Asia', 'Sobre los reyes que vienen del oriente'], a: 0,
      e: '«También se le dio autoridad sobre toda tribu, pueblo, lengua y nación» (13:7).' },
    { t: 'mc', v: '13:8', lit: 'cuyos nombres no estaban escritos',
      q: '¿Quiénes adoraron a la bestia, según Apocalipsis 13:8?',
      o: ['Los que no tenían su nombre en el libro de la vida', 'Los que tenían el sello de Dios en sus frentes', 'Solo los reyes y los grandes de la tierra', 'Los que vencieron por la sangre del Cordero'], a: 0,
      e: '«La adoraron todos los habitantes de la tierra cuyos nombres no estaban escritos… en el libro de la vida del Cordero» (13:8).' },
    { t: 'fill', v: '13:8', ins: 'Apocalipsis 13:8 (RV1995) — Completa:',
      p: [{ x: '«…en el libro de la ' }, { b: 'vida', h: '¿el libro de qué?' }, { x: ' del ' }, { b: 'Cordero', h: '¿de quién es el libro?' }, { x: ' que fue inmolado.»' }] },
    { t: 'mc', v: '13:9', lit: 'Si alguno tiene oído, oiga',
      q: '¿Qué texto dice «Si alguno tiene oído, oiga»?',
      o: ['Apocalipsis 13:9', 'Apocalipsis 13:18', 'Apocalipsis 13:1', 'Apocalipsis 14:12'], a: 0,
      e: 'Apocalipsis 13:9. Es un verso corto que llama a poner atención.' },
    { t: 'tf', v: '13:10',
      q: 'Apocalipsis 13:10 termina diciendo: «Aquí está la perseverancia y la fe de los santos».', a: true,
      e: 'Verdadero (13:10). No confundir con 14:12: «la perseverancia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús».' },
    { t: 'mc', v: '13:10', lit: 'Si alguno mata a espada, a espada será muerto',
      q: 'Según Apocalipsis 13:10, ¿qué le pasará al que mata a espada?',
      o: ['A espada será muerto', 'A cautividad irá', 'Será echado al lago de fuego', 'No tendrá reposo de día ni de noche'], a: 0,
      e: '«Si alguno mata a espada, a espada será muerto» (13:10). «A cautividad irá» es del que lleva en cautividad.' },
    { t: 'mc', v: '13:11', lit: 'otra bestia que subía de la tierra',
      q: '¿De dónde subía la segunda bestia de Apocalipsis 13?',
      o: ['De la tierra', 'Del mar', 'Del abismo', 'Del cielo'], a: 0,
      e: '«Después vi otra bestia que subía de la tierra» (13:11).' },
    { t: 'mc', v: '13:11', lit: 'dos cuernos semejantes a los de un cordero, pero hablaba como un dragón',
      q: '¿Cómo eran los cuernos y la voz de la bestia que sube de la tierra? (Apocalipsis 13:11)',
      o: ['Dos cuernos como de cordero, y hablaba como dragón', 'Diez cuernos como de toro, y hablaba como león', 'Dos cuernos como de carnero, y rugía como león', 'Siete cuernos como de cordero, y hablaba como trueno'], a: 0,
      e: '«Tenía dos cuernos semejantes a los de un cordero, pero hablaba como un dragón» (13:11). El carnero de dos cuernos es de Daniel 8.' },
    { t: 'tf', v: '13:11',
      q: 'La bestia que sube de la tierra tenía diez cuernos semejantes a los de un cordero.', a: false,
      e: 'Falso: tenía DOS cuernos (13:11). Los diez cuernos son de la bestia del mar (13:1).' },
    { t: 'fill', v: '13:11', ins: 'Apocalipsis 13:11 (RV1995) — Completa:',
      p: [{ x: '«Tenía dos cuernos semejantes a los de un ' }, { b: 'cordero', h: '¿como los de quién?' }, { x: ', pero hablaba como un ' }, { b: 'dragón', h: '¿cómo hablaba?' }, { x: '.»' }] },
    { t: 'tf', v: '13:12',
      q: 'La segunda bestia hace que la tierra y sus habitantes adoren a la primera bestia, cuya herida mortal fue sanada. (Apocalipsis 13:12)', a: true,
      e: 'Verdadero (13:12). No pide que la adoren a ella, sino a la primera.' },
    { t: 'mc', v: '13:13', lit: 'hace descender fuego del cielo a la tierra',
      q: '¿Qué gran señal hace la bestia que sube de la tierra? (Apocalipsis 13:13)',
      o: ['Hace descender fuego del cielo', 'Convierte las aguas en sangre', 'Hace caer granizo del cielo', 'Oscurece el sol y la luna'], a: 0,
      e: '«…incluso hace descender fuego del cielo a la tierra delante de los hombres» (13:13).' },
    { t: 'mc', v: '13:14', lit: 'que le hagan una imagen a la bestia',
      q: 'Según Apocalipsis 13:14, ¿qué les dice la segunda bestia a los habitantes de la tierra que hagan?',
      o: ['Una imagen a la bestia', 'Un altar al dragón', 'Un templo para la bestia', 'Una estatua de oro al rey'], a: 0,
      e: '«…que le hagan una imagen a la bestia que fue herida de espada y revivió» (13:14). La estatua de oro es la de Daniel 3.' },
    { t: 'tf', v: '13:14',
      q: 'Apocalipsis 13:14 dice que la bestia fue herida de lanza y revivió.', a: false,
      e: 'Falso: fue herida de ESPADA y revivió (13:14).' },
    { t: 'mc', v: '13:15', lit: 'infundir aliento a la imagen de la bestia',
      q: '¿Qué se le permitió hacer a la segunda bestia con la imagen? (Apocalipsis 13:15)',
      o: ['Infundirle aliento para que hablara', 'Ponerle una corona de oro', 'Llevarla al templo de Dios', 'Darle siete ojos y siete cuernos'], a: 0,
      e: '«Se le permitió infundir aliento a la imagen de la bestia, para que la imagen hablara» (13:15).' },
    { t: 'tf', v: '13:15',
      q: 'La imagen de la bestia hacía matar a todo el que no la adorara. (Apocalipsis 13:15)', a: true,
      e: 'Verdadero: «…e hiciera matar a todo el que no la adorara» (13:15).' },
    { t: 'mc', v: '13:16', lit: 'pequeños y grandes, ricos y pobres, libres y esclavos',
      q: 'Según Apocalipsis 13:16, ¿a quiénes hacía que se les pusiera la marca?',
      o: ['Pequeños y grandes, ricos y pobres, libres y esclavos', 'Solo a los reyes, capitanes y poderosos de la tierra', 'Solo a los que vivían en la gran ciudad de Babilonia', 'A los siervos de Dios de todas las tribus de Israel'], a: 0,
      e: '«Y hacía que a todos, pequeños y grandes, ricos y pobres, libres y esclavos, se les pusiera una marca…» (13:16).' },
    { t: 'mc', v: '13:16', lit: 'una marca en la mano derecha o en la frente',
      q: '¿Dónde se ponía la marca, según Apocalipsis 13:16?',
      o: ['En la mano derecha o en la frente', 'En la mano izquierda o en el pecho', 'En la frente o en el hombro', 'En el brazo o en el vestido'], a: 0,
      e: '«…se les pusiera una marca en la mano derecha o en la frente» (13:16).' },
    { t: 'mc', v: '13:17', lit: 'ninguno pudiera comprar ni vender',
      q: 'Según Apocalipsis 13:17, ¿qué no podía hacer el que no tenía la marca?',
      o: ['Comprar ni vender', 'Entrar al templo', 'Viajar ni casarse', 'Hablar en público'], a: 0,
      e: '«…y que ninguno pudiera comprar ni vender, sino el que tuviera la marca…» (13:17).' },
    { t: 'fill', v: '13:17', ins: 'Apocalipsis 13:17 (RV1995) — Completa:',
      p: [{ x: '«…sino el que tuviera la ' }, { b: 'marca', h: '¿qué cosa?' }, { x: ' o el ' }, { b: 'nombre', h: '¿o qué de la bestia?' }, { x: ' de la bestia o el número de su nombre.»' }] },
    { t: 'mc', v: '13:18', lit: 'Y su número es seiscientos sesenta y seis',
      q: '¿Cuál es el número de la bestia? (Apocalipsis 13:18)',
      o: ['Seiscientos sesenta y seis', 'Ciento cuarenta y cuatro mil', 'Seiscientos sesenta y nueve', 'Mil doscientos sesenta'], a: 0,
      e: '«Y su número es seiscientos sesenta y seis» (13:18). 144.000 son los que están con el Cordero (14:1).' },
    { t: 'mc', v: '13:18', lit: 'Aquí hay sabiduría. El que tiene entendimiento cuente el número de la bestia',
      q: '¿Qué texto dice «Aquí hay sabiduría. El que tiene entendimiento cuente el número de la bestia»?',
      o: ['Apocalipsis 13:18', 'Apocalipsis 13:10', 'Apocalipsis 13:17', 'Apocalipsis 14:12'], a: 0,
      e: 'Apocalipsis 13:18, el último versículo del capítulo.' },
    { t: 'tf', v: '13:18',
      q: 'Según Apocalipsis 13:18, el número de la bestia es número de ángel.', a: false,
      e: 'Falso: «es número de HOMBRE» (13:18).' },
    { t: 'mc', v: '13:1-2', f: 'c',
      q: 'En la lectura adventista, ¿qué representa la bestia que sube del mar?',
      o: ['El papado como sistema religioso y político', 'El imperio de Babilonia de Nabucodonosor', 'Un monstruo marino que saldrá al final', 'Los cuatro vientos de la tierra'], a: 0,
      e: 'Interpretación: el poder que siguió a Roma, leído como sistema, no contra personas. El texto solo describe una bestia que sube del mar (13:1-2).' },
    { t: 'mc', v: '13:5', f: 'c',
      q: 'En la interpretación adventista, ¿a qué equivalen los cuarenta y dos meses de Apocalipsis 13:5?',
      o: ['A 1.260 años, del 538 al 1798', 'A 42 años al final del mundo', 'A siete años de gran tribulación', 'A las setenta semanas de Daniel'], a: 0,
      e: 'Interpretación: 42 meses de 30 días son 1.260 días, y con la regla de un día por un año (Ezequiel 4:6) son 1.260 años. El texto solo dice «cuarenta y dos meses» (13:5).' },
    { t: 'mc', v: '13:11', f: 'c',
      q: 'En la lectura adventista, ¿qué nación representa la bestia que sube de la tierra?',
      o: ['Los Estados Unidos de América', 'El antiguo imperio romano', 'El reino de Media y Persia', 'La Grecia de Alejandro Magno'], a: 0,
      e: 'Interpretación: una nación que nace en un lugar poco poblado, con cuernos de cordero (libertad civil y religiosa), que al final hablará «como un dragón». El texto solo dice que subía de la tierra (13:11).' },
    { t: 'mc', v: '13:16-17', f: 'c',
      q: 'En la interpretación adventista, ¿qué es la marca de la bestia?',
      o: ['Un culto impuesto por ley en lugar del sábado, al final', 'Un chip o un tatuaje que se pone en el cuerpo', 'Una moneda especial que hará algún gobierno', 'Un nombre secreto escrito en una piedrecita'], a: 0,
      e: 'Interpretación: lo contrario del sello de Dios; se recibe cuando se imponga esa ley y cada uno escoja a sabiendas. Nadie la tiene hoy. El texto solo habla de una marca en la mano derecha o en la frente (13:16).' },
  ],

  tarjetas: [
    { f: 'De dónde sube cada bestia (13:1, 13:11)', r: 'La primera, del mar; la segunda, de la tierra' },
    { f: 'Cabezas, cuernos y diademas de la bestia del mar (13:1)', r: 'Siete cabezas, diez cuernos y diez diademas en los cuernos' },
    { f: 'Los tres animales de la bestia del mar (13:2)', r: 'Cuerpo de leopardo, pies de oso, boca de león' },
    { f: 'Lo que el dragón le dio a la bestia (13:2)', r: 'Su poder, su trono y gran autoridad' },
    { f: '«¿Quién como la bestia y quién podrá luchar contra ella?»', r: 'Apocalipsis 13:4' },
    { f: 'Tiempo de autoridad de la bestia (13:5)', r: 'Cuarenta y dos meses' },
    { f: 'Quiénes la adoraron (13:8)', r: 'Los que no tenían su nombre en el libro de la vida del Cordero que fue inmolado' },
    { f: 'Cuernos y voz de la bestia de la tierra (13:11)', r: 'Dos cuernos como de cordero; hablaba como un dragón' },
    { f: 'Señal de fuego (13:13)', r: 'Hace descender fuego del cielo a la tierra delante de los hombres' },
    { f: 'La imagen de la bestia (13:14-15)', r: 'La segunda bestia le infunde aliento para que hable y haga matar al que no la adore' },
    { f: 'Dónde va la marca (13:16)', r: 'En la mano derecha o en la frente' },
    { f: 'Para qué servía la marca (13:17)', r: 'Nadie podía comprar ni vender sin la marca, el nombre o el número de la bestia' },
    { f: 'El número de la bestia (13:18)', r: 'Seiscientos sesenta y seis: «es número de hombre»' },
  ],
};
