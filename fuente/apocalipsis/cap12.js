/* Apocalipsis 12 — La mujer, el dragón y el hijo varón. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap12', label: 'Apocalipsis 12', sub: 'La mujer, el dragón y el niño', vs: 17,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`En el cielo apareció una <strong>mujer vestida del sol</strong>, con
      la luna bajo los pies y una <strong>corona de doce estrellas</strong>.
      Iba a tener un bebé.<br><br>
      Frente a ella se paró un <strong>gran dragón escarlata</strong> que
      quería comerse al niño apenas naciera. Pero el niño fue llevado
      <strong>a Dios y a su trono</strong>, y la mujer huyó al
      <strong>desierto</strong>, donde Dios la cuidó.<br><br>
      Hubo guerra en el cielo: <strong>Miguel y sus ángeles</strong> vencieron
      al dragón, que es <strong>el Diablo y Satanás</strong>, y lo echaron a la
      tierra. Desde entonces persigue a la mujer y a sus hijos.<br><br>
      <em>La idea del capítulo: el dragón es fuerte, pero ya perdió; a los
      que son de Dios Él los protege.</em>`) },

    { t: '👑 La mujer (12:1-2)', capa: 'nucleo', h:
      tbl(['Parte', 'Cómo era'], [
        ['Dónde', '<strong>Una gran señal</strong> en el cielo (12:1)'],
        ['Vestida', '<strong>Del sol</strong> (12:1)'],
        ['Bajo los pies', '<strong>La luna</strong> (12:1)'],
        ['Sobre la cabeza', 'Una <strong>corona de doce estrellas</strong> (12:1)'],
        ['Cómo estaba', '<strong>Encinta</strong>, gritando con dolores de parto (12:2)'],
      ]) +
      wa(`No la cruces con la mujer del capítulo 17: aquella está
      <strong>sentada sobre una bestia escarlata</strong> (17:3). La de 12:1
      está <strong>vestida del sol</strong>.`) },

    { t: '🐉 El dragón (12:3-4)', capa: 'nucleo', h:
      tbl(['Parte', 'Qué dice el texto'], [
        ['Qué era', '<strong>Otra señal</strong> en el cielo: <strong>un gran dragón escarlata</strong> (12:3)'],
        ['Cabezas', '<strong>Siete</strong> (12:3)'],
        ['Cuernos', '<strong>Diez</strong> (12:3)'],
        ['Diademas', '<strong>Siete, en sus cabezas</strong> (12:3)'],
        ['Su cola', 'Arrastró <strong>la tercera parte de las estrellas</strong> del cielo y las arrojó a la tierra (12:4)'],
        ['Qué quería', '<strong>«devorar a su hijo tan pronto como naciera»</strong> (12:4)'],
      ]) +
      wa(`Ojo con las diademas: el dragón tiene <strong>siete diademas en sus
      cabezas</strong> (12:3); la bestia del mar tiene <strong>diez diademas
      en sus cuernos</strong> (13:1).`) },

    { t: '👶 El hijo y el desierto (12:5-6)', capa: 'nucleo', h:
      li([`Ella dio a luz <strong>un hijo varón</strong>, que va a regir a todas
           las naciones <strong>con vara de hierro</strong> (12:5).`,
          `<strong>«su hijo fue arrebatado para Dios y para su trono»</strong>
           (12:5).`,
          `<strong>«La mujer huyó al desierto»</strong> (12:6), a un lugar
           preparado por Dios.`,
          `Allí fue sustentada <strong>mil doscientos sesenta días</strong>
           (12:6).`]) },

    { t: '⚔️ Guerra en el cielo (12:7-9)', capa: 'nucleo', h:
      hi(`<strong>«Miguel y sus ángeles luchaban contra el dragón»</strong>
      (12:7). El dragón y sus ángeles <strong>no prevalecieron</strong>, ni se
      halló ya lugar para ellos en el cielo (12:8).`) +
      tbl(['Nombres del dragón en 12:9'], [
        ['El gran dragón'], ['La serpiente antigua'], ['Diablo'], ['Satanás'],
        ['El que <strong>engaña al mundo entero</strong>'],
      ]) +
      wa(`Fue arrojado <strong>a la tierra</strong> y <strong>sus ángeles con
      él</strong> (12:9). El texto mismo dice quién es el dragón: no hace
      falta adivinarlo.`) },

    { t: '📣 La gran voz en el cielo (12:10-12)', capa: 'nucleo', h:
      li([`<strong>«Ahora ha venido la salvación, el poder y el reino de
           nuestro Dios»</strong> (12:10).`,
          `Fue expulsado <strong>el acusador de nuestros hermanos</strong>, que
           los acusaba delante de Dios <strong>día y noche</strong> (12:10).`,
          `<strong>«Ellos lo han vencido por medio de la sangre del Cordero y de
           la palabra del testimonio de ellos»</strong> (12:11).`,
          `Alegría en el cielo, pero <strong>«¡Ay de los moradores de la tierra y
           del mar!»</strong> (12:12): el diablo bajó con gran ira,
           <strong>«sabiendo que tiene poco tiempo»</strong> (12:12).`]) },

    { t: '🦅 La mujer perseguida (12:13-16)', capa: 'nucleo', h:
      tbl(['#', 'Qué pasó'], [
        ['1', 'El dragón, en la tierra, <strong>persiguió a la mujer</strong> (12:13)'],
        ['2', 'A ella le dieron <strong>las dos alas de la gran águila</strong> para volar al desierto (12:14)'],
        ['3', 'Allí es sustentada <strong>«por un tiempo, tiempos y la mitad de un tiempo»</strong> (12:14)'],
        ['4', 'La serpiente echó de su boca <strong>agua como un río</strong> tras la mujer (12:15)'],
        ['5', '<strong>La tierra ayudó a la mujer</strong>: abrió su boca y se tragó el río (12:16)'],
      ]) },

    { t: '🛡️ El resto de la descendencia (12:17)', capa: 'nucleo', h:
      hi(`El dragón se llenó de ira y se fue a hacer la guerra contra
      <strong>el resto de la descendencia</strong> de la mujer:
      <strong>«contra los que guardan los mandamientos de Dios y tienen el
      testimonio de Jesucristo»</strong> (12:17).`) +
      wa(`Un par que se confunde: en 12:17 es <strong>«el testimonio de
      Jesucristo»</strong>; en 14:12 es <strong>«la fe de Jesús»</strong>. Los
      dos dicen «guardan los mandamientos de Dios».`) },

    { t: '🔢 Las cifras: dónde está cada una', capa: 'nucleo', h:
      tbl(['Cifra', 'Dónde', 'De qué se trata'], [
        ['<strong>Mil doscientos sesenta días</strong>', '11:3 · 12:6', 'Los dos testigos · la mujer en el desierto'],
        ['<strong>Cuarenta y dos meses</strong>', '11:2 · 13:5', 'La ciudad santa hollada · la bestia actúa'],
        ['<strong>Un tiempo, tiempos y la mitad de un tiempo</strong>', '12:14', 'La mujer sustentada en el desierto'],
        ['<strong>Tiempo, tiempos y medio tiempo</strong>', 'Daniel 7:25', 'El cuerno pequeño contra los santos'],
      ]) +
      wa(`Fíjate que la mujer está en el desierto <strong>dos veces</strong> en
      el capítulo: en 12:6 se cuentan <strong>1.260 días</strong>, y en 12:14
      <strong>un tiempo, tiempos y la mitad de un tiempo</strong>. Si cada
      «tiempo» es un año de 360 días (así se suele contar), 3½ años dan los
      mismos 1.260 días.`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias.<br><br>
      · La <strong>mujer</strong> representa a la <strong>iglesia fiel de
      Dios</strong>, y el <strong>hijo varón</strong> es
      <strong>Jesús</strong>, que nació, venció y subió al trono de Dios.<br>
      · <strong>Miguel</strong> se entiende como un nombre de
      <strong>Cristo</strong> mismo, el jefe de los ángeles (Judas 9, Daniel
      12:1). La tercera parte de las estrellas son los ángeles que siguieron a
      Satanás.<br>
      · El dragón es Satanás (12:9), que también obró por medio de poderes de
      la tierra, como la Roma pagana, cuyo rey Herodes quiso matar a Jesús al
      nacer.<br>
      · Los <strong>1.260 días</strong> en el desierto son 1.260 años,
      <strong>del 538 al 1798</strong>, cuando la iglesia fiel fue perseguida y
      se refugió en lugares apartados.<br>
      · El <strong>resto</strong> (12:17) es el pueblo de Dios del tiempo del
      fin, que guarda los mandamientos y tiene «el espíritu de la profecía»
      (19:10), don que la iglesia adventista reconoce en el ministerio de
      Elena G. de White.<br>
      Otras iglesias lo leen de otra manera; aquí se presenta la lectura del
      Comentario Bíblico Adventista y de «El conflicto de los siglos».`) },
  ],

  preguntas: [
    { t: 'mc', v: '12:1', lit: 'una mujer vestida del sol',
      q: '¿De qué estaba vestida la mujer de la gran señal? (Apocalipsis 12:1)',
      o: ['Del sol', 'De la luna', 'De lino fino', 'De púrpura'], a: 0,
      e: '«…una mujer vestida del sol, con la luna debajo de sus pies» (12:1). La vestida «de púrpura y escarlata» es la de 17:4.' },
    { t: 'mc', v: '12:1', lit: 'con la luna debajo de sus pies',
      q: '¿Qué tenía la mujer debajo de sus pies? (Apocalipsis 12:1)',
      o: ['La luna', 'El sol', 'El mar', 'Las estrellas'], a: 0,
      e: '«…con la luna debajo de sus pies» (12:1).' },
    { t: 'mc', v: '12:1', lit: 'una corona de doce estrellas',
      q: '¿Qué tenía la mujer sobre su cabeza? (Apocalipsis 12:1)',
      o: ['Una corona de doce estrellas', 'Una corona de siete estrellas', 'Siete diademas de oro', 'El arco iris'], a: 0,
      e: '«…y sobre su cabeza una corona de doce estrellas» (12:1). El arco iris sobre la cabeza era del ángel fuerte (10:1).' },
    { t: 'fill', v: '12:1', ins: 'Apocalipsis 12:1 (RV1995) — Completa:',
      p: [{ x: '«una mujer vestida del ' }, { b: 'sol', h: '¿vestida de qué?' }, { x: ', con la luna debajo de sus pies y sobre su cabeza una corona de ' }, { b: 'doce', h: '¿cuántas estrellas?' }, { x: ' estrellas.»' }] },
    { t: 'tf', v: '12:2',
      q: 'La mujer estaba encinta y gritaba con dolores de parto. (Apocalipsis 12:2)', a: true,
      e: 'Verdadero (Apocalipsis 12:2).' },
    { t: 'mc', v: '12:3', lit: 'un gran dragón escarlata',
      q: '¿De qué color era el gran dragón? (Apocalipsis 12:3)',
      o: ['Escarlata', 'Negro', 'Amarillo', 'Verde'], a: 0,
      e: '«…un gran dragón escarlata que tenía siete cabezas y diez cuernos» (12:3).' },
    { t: 'mc', v: '12:3', lit: 'siete cabezas y diez cuernos, y en sus cabezas tenía siete diademas',
      q: '¿Cuántas cabezas, cuernos y diademas tenía el dragón? (Apocalipsis 12:3)',
      o: ['7 cabezas, 10 cuernos y 7 diademas', '7 cabezas, 10 cuernos y 10 diademas', '10 cabezas, 7 cuernos y 7 diademas', '7 cabezas, 7 cuernos y 12 diademas'], a: 0,
      e: '«…siete cabezas y diez cuernos, y en sus cabezas tenía siete diademas» (12:3). La bestia del mar tiene diez diademas en los cuernos (13:1).' },
    { t: 'tf', v: '12:3',
      q: 'El dragón de Apocalipsis 12:3 tenía diez diademas en sus cuernos.', a: false,
      e: 'Falso: tenía SIETE diademas, en sus CABEZAS (12:3). Las diez diademas en los cuernos son de la bestia del mar (13:1).' },
    { t: 'mc', v: '12:4', lit: 'la tercera parte de las estrellas del cielo',
      q: '¿Qué arrastró la cola del dragón? (Apocalipsis 12:4)',
      o: ['La tercera parte de las estrellas', 'La cuarta parte de las estrellas', 'La décima parte de las estrellas', 'La mitad de todas las estrellas'], a: 0,
      e: '«Su cola arrastró la tercera parte de las estrellas del cielo y las arrojó sobre la tierra» (12:4).' },
    { t: 'mc', v: '12:5', lit: 'regir a todas las naciones con vara de hierro',
      q: '¿Con qué va a regir el hijo varón a todas las naciones? (Apocalipsis 12:5)',
      o: ['Con vara de hierro', 'Con vara de oro', 'Con espada de dos filos', 'Con cetro de marfil'], a: 0,
      e: '«…un hijo varón, que va a regir a todas las naciones con vara de hierro» (12:5).' },
    { t: 'tf', v: '12:5',
      q: 'El hijo de la mujer fue arrebatado para Dios y para su trono. (Apocalipsis 12:5)', a: true,
      e: 'Verdadero: «su hijo fue arrebatado para Dios y para su trono» (12:5).' },
    { t: 'mc', v: '12:6', lit: 'La mujer huyó al desierto',
      q: '¿A dónde huyó la mujer? (Apocalipsis 12:6)',
      o: ['Al desierto', 'Al monte de Sion', 'A la ciudad santa', 'A una isla del mar'], a: 0,
      e: '«La mujer huyó al desierto, donde tenía un lugar preparado por Dios» (12:6).' },
    { t: 'mc', v: '12:6', lit: 'por mil doscientos sesenta días',
      q: '¿Por cuántos días fue sustentada la mujer en el desierto, según 12:6?',
      o: ['Mil doscientos sesenta', 'Mil doscientos noventa', 'Mil trescientos treinta y cinco', 'Dos mil trescientos'], a: 0,
      e: '«…para ser sustentada allí por mil doscientos sesenta días» (12:6). Los 1.290 y 1.335 días son de Daniel 12:11-12.' },
    { t: 'mc', v: '12:6',
      q: '¿Qué texto dice que la mujer fue sustentada en el desierto «por mil doscientos sesenta días»?',
      o: ['Apocalipsis 12:6', 'Apocalipsis 11:3', 'Apocalipsis 12:14', 'Apocalipsis 13:5'], a: 0,
      e: 'Apocalipsis 12:6. En 11:3 los 1.260 días son de los dos testigos; en 12:14 la misma mujer está «un tiempo, tiempos y la mitad de un tiempo»; en 13:5 son 42 meses.' },
    { t: 'mc', v: '12:7', lit: 'Miguel y sus ángeles luchaban contra el dragón',
      q: '¿Quiénes lucharon contra el dragón en el cielo? (Apocalipsis 12:7)',
      o: ['Miguel y sus ángeles', 'Gabriel y sus ángeles', 'Los siete ángeles de las trompetas', 'Los veinticuatro ancianos'], a: 0,
      e: '«Entonces hubo una guerra en el cielo: Miguel y sus ángeles luchaban contra el dragón» (12:7).' },
    { t: 'tf', v: '12:7',
      q: 'La guerra de Apocalipsis 12:7 entre Miguel y el dragón fue en la tierra.', a: false,
      e: 'Falso: «hubo una guerra en el CIELO» (12:7).' },
    { t: 'tf', v: '12:8',
      q: 'El dragón y sus ángeles no prevalecieron, ni se halló ya lugar para ellos en el cielo. (Apocalipsis 12:8)', a: true,
      e: 'Verdadero (Apocalipsis 12:8).' },
    { t: 'mc', v: '12:9', lit: 'la serpiente antigua, que se llama Diablo y Satanás',
      q: 'Según Apocalipsis 12:9, ¿qué otros nombres tiene el gran dragón?',
      o: ['La serpiente antigua, Diablo y Satanás', 'La bestia, el falso profeta y Babilonia', 'Abadón, Apolión y el ángel del abismo', 'El cuerno pequeño y el rey del norte'], a: 0,
      e: '«…el gran dragón, la serpiente antigua, que se llama Diablo y Satanás, el cual engaña al mundo entero» (12:9). Abadón y Apolión son nombres del ángel del abismo (9:11).' },
    { t: 'fill', v: '12:9', ins: 'Apocalipsis 12:9 (RV1995) — Completa:',
      p: [{ x: '«Y fue lanzado fuera el gran dragón, la ' }, { b: 'serpiente', h: '¿la qué antigua?' }, { x: ' antigua, que se llama ' }, { b: 'Diablo', h: 'el primero de los dos nombres' }, { x: ' y Satanás, el cual engaña al mundo entero.»' }] },
    { t: 'mc', v: '12:10', lit: 'el acusador de nuestros hermanos',
      q: '¿Cómo llama la gran voz del cielo al que fue expulsado? (Apocalipsis 12:10)',
      o: ['El acusador de nuestros hermanos', 'El padre de la mentira', 'El príncipe de este mundo', 'El hijo de perdición'], a: 0,
      e: '«…porque ha sido expulsado el acusador de nuestros hermanos» (12:10).' },
    { t: 'tf', v: '12:10',
      q: 'El acusador acusaba a los hermanos delante de Dios solo de noche. (Apocalipsis 12:10)', a: false,
      e: 'Falso: los acusaba delante de Dios «DÍA Y NOCHE» (12:10).' },
    { t: 'mc', v: '12:11', lit: 'por medio de la sangre del Cordero y de la palabra del testimonio de ellos',
      q: '¿Con qué vencieron los hermanos al acusador? (Apocalipsis 12:11)',
      o: ['La sangre del Cordero y la palabra de su testimonio', 'La espada de dos filos y el fuego del cielo', 'Las siete trompetas y las siete copas', 'El ayuno y la oración de todos los santos'], a: 0,
      e: '«Ellos lo han vencido por medio de la sangre del Cordero y de la palabra del testimonio de ellos» (12:11).' },
    { t: 'mc', v: '12:11',
      q: '¿Qué texto dice «Ellos lo han vencido por medio de la sangre del Cordero»?',
      o: ['Apocalipsis 12:11', 'Apocalipsis 12:10', 'Apocalipsis 12:17', 'Apocalipsis 7:14'], a: 0,
      e: 'Apocalipsis 12:11. En 7:14 se habla de los que «han lavado sus ropas» en la sangre del Cordero.' },
    { t: 'fill', v: '12:11', ins: 'Apocalipsis 12:11 (RV1995) — Completa:',
      p: [{ x: '«Ellos lo han vencido por medio de la ' }, { b: 'sangre', h: '¿de qué del Cordero?' }, { x: ' del Cordero y de la palabra del ' }, { b: 'testimonio', h: '¿la palabra de qué?' }, { x: ' de ellos»' }] },
    { t: 'mc', v: '12:12', lit: 'sabiendo que tiene poco tiempo',
      q: 'Según Apocalipsis 12:12, ¿por qué el diablo descendió con gran ira?',
      o: ['Porque sabe que tiene poco tiempo', 'Porque la mujer lo venció en el desierto', 'Porque los testigos subieron al cielo', 'Porque el templo fue abierto en el cielo'], a: 0,
      e: '«…el diablo ha descendido a vosotros con gran ira, sabiendo que tiene poco tiempo» (12:12).' },
    { t: 'tf', v: '12:12',
      q: 'Apocalipsis 12:12 dice: «¡Ay de los moradores de la tierra y del mar!»', a: true,
      e: 'Verdadero (12:12): mientras los cielos se alegran, el diablo baja a la tierra con gran ira.' },
    { t: 'mc', v: '12:13', lit: 'persiguió a la mujer que había dado a luz al hijo varón',
      q: '¿Qué hizo el dragón cuando vio que había sido arrojado a la tierra? (Apocalipsis 12:13)',
      o: ['Persiguió a la mujer', 'Subió otra vez al cielo', 'Se escondió en el abismo', 'Buscó al hijo en el trono'], a: 0,
      e: '«…persiguió a la mujer que había dado a luz al hijo varón» (12:13).' },
    { t: 'mc', v: '12:14', lit: 'las dos alas de la gran águila',
      q: '¿Qué se le dio a la mujer para volar al desierto? (Apocalipsis 12:14)',
      o: ['Las dos alas de la gran águila', 'Las alas de una paloma blanca', 'Seis alas, como los seres vivientes', 'Un carro de fuego con sus caballos'], a: 0,
      e: '«Pero se le dieron a la mujer las dos alas de la gran águila para que volara… al desierto» (12:14). Las seis alas son de los seres vivientes (4:8).' },
    { t: 'mc', v: '12:14', lit: 'un tiempo, tiempos y la mitad de un tiempo',
      q: '¿Por cuánto tiempo es sustentada la mujer en el desierto, según 12:14?',
      o: ['Un tiempo, tiempos y la mitad de un tiempo', 'Mil doscientos sesenta meses completos', 'Cuarenta y dos días en el desierto', 'Tres días y medio sin ser sepultada'], a: 0,
      e: '«…donde es sustentada por un tiempo, tiempos y la mitad de un tiempo» (12:14). En 12:6 la misma estancia se cuenta en días: 1.260.' },
    { t: 'tf', v: '12:14',
      q: 'Según Apocalipsis 12:14, la mujer es sustentada en el desierto por tres días y medio.', a: false,
      e: 'Falso: «por un tiempo, tiempos y la mitad de un tiempo» (12:14). Los tres días y medio son de los dos testigos (11:9).' },
    { t: 'mc', v: '12:15', lit: 'agua como un río',
      q: '¿Qué arrojó la serpiente de su boca tras la mujer? (Apocalipsis 12:15)',
      o: ['Agua como un río', 'Fuego y azufre', 'Humo del abismo', 'Espíritus como ranas'], a: 0,
      e: '«Y la serpiente arrojó de su boca, tras la mujer, agua como un río» (12:15).' },
    { t: 'mc', v: '12:16', lit: 'la tierra abrió su boca y se tragó el río',
      q: '¿Quién ayudó a la mujer cuando el río la iba a arrastrar? (Apocalipsis 12:16)',
      o: ['La tierra, que se tragó el río', 'El mar, que se secó ante ella', 'Un ángel, que detuvo el agua', 'Miguel, que partió el río en dos'], a: 0,
      e: '«Pero la tierra ayudó a la mujer, pues la tierra abrió su boca y se tragó el río» (12:16).' },
    { t: 'mc', v: '12:17', lit: 'los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo',
      q: '¿Cómo describe Apocalipsis 12:17 al resto de la descendencia de la mujer?',
      o: ['Guardan los mandamientos y tienen el testimonio de Jesucristo', 'Tienen el sello del Dios vivo puesto en sus frentes', 'Lavaron sus ropas en la sangre del Cordero', 'No adoraron a la bestia ni recibieron su marca'], a: 0,
      e: '«…contra los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo» (12:17).' },
    { t: 'mc', v: '12:17',
      q: '¿Qué texto dice «los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo»?',
      o: ['Apocalipsis 12:17', 'Apocalipsis 14:12', 'Apocalipsis 12:11', 'Apocalipsis 19:10'], a: 0,
      e: 'Apocalipsis 12:17. Ojo: 14:12 dice «los que guardan los mandamientos de Dios y la fe de Jesús».' },
    { t: 'tf', v: '12:17',
      q: 'El dragón se llenó de ira y se fue a hacer la guerra contra el resto de la descendencia de la mujer. (Apocalipsis 12:17)', a: true,
      e: 'Verdadero (Apocalipsis 12:17).' },
    { t: 'fill', v: '12:17', ins: 'Apocalipsis 12:17 (RV1995) — Completa:',
      p: [{ x: '«contra los que guardan los ' }, { b: 'mandamientos', h: '¿qué guardan?' }, { x: ' de Dios y tienen el ' }, { b: 'testimonio', h: '¿qué tienen de Jesucristo?' }, { x: ' de Jesucristo.»' }] },
    { t: 'mc', v: '12:1', f: 'c',
      q: 'En la lectura adventista, ¿qué representa la mujer de Apocalipsis 12?',
      o: ['La iglesia fiel de Dios', 'La gran ciudad de Roma', 'La gran ramera Babilonia', 'La nación de Egipto'], a: 0,
      e: 'Interpretación: la iglesia fiel, de la que nace el Mesías. El texto la describe «vestida del sol» (12:1), sin decir quién es.' },
    { t: 'mc', v: '12:7', f: 'c',
      q: 'En la interpretación adventista, ¿quién es Miguel, el que lucha contra el dragón (12:7)?',
      o: ['Cristo mismo', 'El ángel Gabriel', 'El apóstol Juan', 'Uno de los ancianos'], a: 0,
      e: 'Interpretación: Miguel, el arcángel (Judas 9), se entiende como un nombre de Cristo. El texto solo dice «Miguel y sus ángeles» (12:7).' },
    { t: 'mc', v: '12:6', f: 'c',
      q: 'En la lectura adventista, ¿a qué años se aplican los 1.260 días de la mujer en el desierto (12:6)?',
      o: ['Del 538 al 1798 d.C.', 'Del 457 a.C. al 1844', 'Del 1798 al 1844 d.C.', 'Del 70 al 313 d.C.'], a: 0,
      e: 'Interpretación: un día por un año (Ezequiel 4:6), el tiempo en que la iglesia fiel fue perseguida. El texto solo dice «mil doscientos sesenta días» (12:6).' },
    { t: 'mc', v: '12:17', f: 'c',
      q: 'En la interpretación adventista, ¿qué es «el testimonio de Jesucristo» que tiene el resto (12:17)?',
      o: ['El espíritu de profecía', 'El bautismo por inmersión', 'El libro de los Hechos', 'La santa cena del Señor'], a: 0,
      e: 'Interpretación: según 19:10, «El testimonio de Jesús es el espíritu de la profecía»; la iglesia adventista lo ve en el ministerio de Elena G. de White. 12:17 solo dice «el testimonio de Jesucristo».' },
  ],

  tarjetas: [
    { f: 'La mujer de la gran señal (12:1)', r: 'Vestida del sol, la luna bajo los pies, corona de doce estrellas' },
    { f: 'El dragón (12:3)', r: 'Escarlata, siete cabezas, diez cuernos y siete diademas en las cabezas' },
    { f: 'Qué arrastró la cola del dragón (12:4)', r: 'La tercera parte de las estrellas del cielo' },
    { f: 'El hijo varón (12:5)', r: 'Va a regir a todas las naciones con vara de hierro; fue arrebatado para Dios y para su trono' },
    { f: 'La mujer en el desierto (12:6)', r: 'Mil doscientos sesenta días' },
    { f: 'Quiénes lucharon contra el dragón (12:7)', r: 'Miguel y sus ángeles' },
    { f: 'Los nombres del dragón (12:9)', r: 'La serpiente antigua, Diablo y Satanás, el que engaña al mundo entero' },
    { f: 'Cómo lo vencieron (12:11)', r: 'Por la sangre del Cordero y la palabra del testimonio de ellos' },
    { f: 'Por qué el diablo tiene gran ira (12:12)', r: 'Sabe que tiene poco tiempo' },
    { f: 'Las alas y el tiempo de la mujer (12:14)', r: 'Las dos alas de la gran águila; un tiempo, tiempos y la mitad de un tiempo' },
    { f: 'Quién se tragó el río (12:16)', r: 'La tierra' },
    { f: 'El resto de la descendencia (12:17)', r: 'Los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo' },
    { f: 'Diademas: dragón vs. bestia del mar', r: 'Dragón: siete, en las cabezas (12:3). Bestia: diez, en los cuernos (13:1)' },
  ],
};
