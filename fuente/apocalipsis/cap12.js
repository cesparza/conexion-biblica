/* Apocalipsis 12 — La mujer, el dragón y el hijo varón. */
const { tbl, hi, wa, li } = require('./ayudas.js');
/* Línea de fuente al pie de cada sección de interpretación. */
const fu = t => `<p class="fuente"><small>${t}</small></p>`;

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

    { t: '🧭 La clave del capítulo: Génesis 3:15 en tres etapas', capa: 'contexto', h:
      hi(`Desde aquí empieza la <strong>interpretación</strong>: cómo se
      entiende el capítulo en la iglesia adventista, sobre todo según el pastor
      <strong>Esteban (Stephen) Bohr</strong>. No es parte del texto del examen.<br><br>
      Para Bohr, detrás de Apocalipsis 12 está la primera promesa de la Biblia,
      <strong>Génesis 3:15</strong>: una serpiente, una mujer, la
      «simiente» (el descendiente) de la mujer y una enemistad entre ellos. El
      capítulo cuenta esa guerra en <strong>tres etapas</strong>:`) +
      tbl(['Etapa', 'El dragón ataca a…', 'Cuándo'], [
        ['1', 'El <strong>hijo varón</strong> (12:4-5)', 'Cuando nace Jesús, bajo la Roma de los césares'],
        ['2', 'La <strong>mujer</strong> (12:6, 13-16)', 'Los 1.260 años de persecución'],
        ['3', 'El <strong>resto de la descendencia</strong> (12:17)', 'La crisis final, todavía futura'],
      ]) +
      wa(`El capítulo no va en orden de reloj: cada parte se repite y se amplía.
      12:1-5 se amplía en 12:10-12; 12:6 en 12:13-16; y 12:17 se amplía en
      todo el capítulo 13 (13:11-18). Además, completa a Daniel 7: el dragón
      tiene diez cuernos como la cuarta bestia, y la mujer sufre «tiempo,
      tiempos y la mitad de un tiempo», como los santos en Daniel 7:25.`) +
      fu(`Fuentes: Bohr, ¿Cuán cerca al fin?, pág. 70-73; Bohr, Gemas de la verdad
      presente, pág. 71-73.`) },

    { t: '🧭 La mujer y el hijo varón (12:1-5)', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué significa, según Bohr'], [
        ['La mujer', 'La <strong>iglesia fiel de Dios</strong>: Israel en el Antiguo Testamento y la iglesia en el Nuevo. Dios llama esposa a su pueblo (Jeremías 31:32; Efesios 5:25). Es <strong>una sola iglesia</strong> en dos etapas.'],
        ['Vestida del sol', '<strong>Cristo</strong>, la luz que brilla por sí misma: una iglesia cubierta de Cristo.'],
        ['La luna bajo sus pies', 'Las <strong>Escrituras</strong>: como la luna refleja la luz del sol, la Biblia da testimonio de Jesús (Juan 5:39). La iglesia está parada sobre la Palabra.'],
        ['Doce estrellas', 'Los <strong>doce patriarcas</strong> (las tribus de Israel) y los <strong>doce apóstoles</strong>.'],
        ['Encinta', 'La iglesia del Antiguo Testamento esperando al Mesías.'],
        ['El hijo varón', '<strong>Jesús</strong>: nació, venció en la cruz, resucitó y subió al trono del Padre (3:21).'],
      ]) +
      wa(`Apocalipsis muestra dos mujeres: la <strong>pura</strong>, vestida
      del sol (la iglesia de Dios), y la <strong>ramera</strong> del capítulo
      17 (la iglesia que se apartó). Bohr ve también aquí la historia de
      Moisés: un faraón, llamado «gran dragón» en Ezequiel 29:3, quiso matar al
      niño libertador, y Dios lo protegió.`) +
      fu(`Fuentes: Bohr, Gemas de la verdad presente, pág. 73-82; Bohr, ¿Cuán cerca
      al fin?, pág. 77-79; notas de Camilo en Evernote, "Apocalipsis 12".`) },

    { t: '🧭 El dragón: Satanás obrando por medio de poderes (12:3-4, 9)', capa: 'contexto', h:
      hi(`El texto mismo dice que el dragón es <strong>Satanás</strong> (12:9).
      Pero Satanás casi nunca ataca solo: usa gobiernos. Elena G. de White lo
      explica así: el dragón «representa primero a Satanás», pero «en sentido
      derivado es un símbolo de la Roma pagana», porque fue Roma, por medio
      del rey <strong>Herodes</strong>, la que quiso matar a Jesús al nacer
      (Mateo 2:16).`) +
      li([`<strong>Rojo (escarlata):</strong> color de sangre y persecución;
           el dragón tiene sed de la sangre del niño y de sus hijos.`,
          `<strong>Siete cabezas:</strong> siete reinos que gobiernan uno
           después de otro, no al mismo tiempo (Bohr sigue aquí a J. N. Andrews).`,
          `<strong>Diez cuernos:</strong> los reinos en que se dividió Roma,
           como los diez cuernos de Daniel 7:24.`,
          `<strong>La cola y la tercera parte de las estrellas:</strong> la
           cola es «el profeta que enseña mentira» (Isaías 9:15). Con sus
           mentiras, Lucifer arrastró en su rebelión a <strong>una tercera
           parte de los ángeles</strong>, que fueron echados del cielo con él.`]) +
      fu(`Fuentes: Elena G. de White, El conflicto de los siglos, pág. 359;
      Bohr, El Mensaje de los Tres Ángeles, tomo 2, pág. 114-115; Bohr, ¿Cuán
      cerca al fin?, pág. 81-84; notas de Camilo en Evernote, "Apocalipsis 12".`) },

    { t: '🧭 Miguel y la guerra en el cielo (12:7-12)', capa: 'contexto', h:
      hi(`<strong>¿Quién es Miguel?</strong> Para Bohr, Miguel es
      <strong>Cristo mismo</strong>. En Judas 9 el «arcángel Miguel» disputa
      con el diablo por el cuerpo de Moisés, porque vino a resucitarlo; y en
      1 Tesalonicenses 4:16 Jesús vuelve con «voz de arcángel». Bohr aclara que
      eso <strong>no</strong> quiere decir que Jesús sea un ángel creado:
      Jesús es Dios eterno. «Arcángel» significa jefe de los ángeles.`) +
      li([`<strong>La guerra empezó en el cielo</strong>, cuando Lucifer se
           rebeló y fue echado con sus ángeles.`,
          `<strong>Siguió en la tierra y se decidió en la cruz.</strong> Antes,
           Satanás se presentaba en el cielo como representante de este mundo
           (Job 1). En la cruz fue echado fuera como «príncipe de este mundo»
           (Juan 12:31). Por eso la gran voz de 12:10 canta la victoria de
           Cristo y dice que el acusador fue expulsado.`,
          `<strong>«Poco tiempo»:</strong> Bohr lo compara con un león herido
           de muerte, más peligroso que uno sano. Satanás sabe que perdió en la
           cruz y que su fin se acerca.`,
          `<strong>Cómo se le vence:</strong> por la sangre del Cordero y por la
           palabra del testimonio, aun a costa de la vida (12:11).`]) +
      fu(`Fuentes: Bohr, Gemas de la verdad presente, pág. 77-78 y 84-87; Bohr,
      ¿Cuán cerca al fin?, pág. 74-75.`) },

    { t: '🧭 La mujer en el desierto: 1.260 años (12:6, 14)', capa: 'contexto', h:
      hi(`Después de perder contra el niño, el dragón se lanza contra la mujer,
      la iglesia. Las dos cifras del capítulo son el mismo período:`) +
      tbl(['Cifra', 'Cuenta'], [
        ['1.260 días (12:6)', 'En profecía, <strong>un día representa un año</strong> (Ezequiel 4:6): 1.260 años.'],
        ['Un tiempo, tiempos y la mitad de un tiempo (12:14)', '1 + 2 + ½ = 3½ «tiempos» (años). 3½ × 360 días = <strong>1.260</strong>.'],
        ['Cuarenta y dos meses (13:5)', '42 × 30 días = <strong>1.260</strong>.'],
      ]) +
      li([`<strong>Fechas:</strong> del <strong>538 al 1798 d.C.</strong>, los
           años de supremacía papal. Así lo dice también Elena G. de White.`,
          `<strong>Cómo fue la persecución:</strong> Satanás obró por medio de
           la iglesia que se había unido al poder civil (el Estado): la iglesia
           declaraba «hereje» a alguien y el Estado lo castigaba. Bohr lo
           relaciona con los pies de hierro mezclado con barro de Daniel 2.`,
          `<strong>Las dos alas de la gran águila:</strong> la protección de
           Dios, que le preparó un lugar apartado. Bohr menciona, por ejemplo, a
           los creyentes refugiados en los valles del Piamonte (los valdenses).`]) +
      wa(`Se habla de un <strong>sistema</strong> de unión entre iglesia y
      Estado, no de las personas sinceras que han pertenecido a esa iglesia.`) +
      fu(`Fuentes: Bohr, Gemas de la verdad presente, pág. 87-89; Bohr, ¿Cuán cerca
      al fin?, pág. 82-83 y 93; Elena G. de White, El conflicto de los siglos,
      pág. 359.`) },

    { t: '🧭 El río y la tierra que ayudó (12:15-16)', capa: 'contexto', h:
      li([`<strong>El agua como un río:</strong> en la profecía las aguas son
           «pueblos, muchedumbres, naciones y lenguas» (17:15). Aquí son
           pueblos y gobiernos movidos a perseguir a la mujer. Bohr lo ve como
           un Éufrates crecido, el río de Babilonia.`,
          `<strong>De una sola boca:</strong> aunque el dragón tiene siete
           cabezas, el agua sale de una. Bohr lo toma como señal de que las
           cabezas reinan una tras otra; la que persigue en los 1.260 años es la
           <strong>quinta</strong>, la misma que después recibe la herida (13:3).`,
          `<strong>La tierra que ayudó:</strong> un <strong>territorio</strong>
           poco poblado, todavía no una nación: <strong>Norteamérica</strong>,
           adonde huyeron los perseguidos de Europa buscando libertad de
           conciencia. Allí se levantará después la bestia que «subía de la
           tierra» (13:11).`]) +
      wa(`Bohr reconoce que en las colonias también hubo intolerancia (algunos
      colonos castigaban a los disidentes), pero el territorio fue el refugio
      que secó aquel río. Elena G. de White, en El conflicto de los siglos,
      pasa de 1798 a la historia de los peregrinos en América, el mismo salto
      que hace 12:16.`) +
      fu(`Fuentes: Bohr, ¿Cuán cerca al fin?, pág. 84-92; Bohr, El Mensaje de los
      Tres Ángeles, tomo 2, pág. 47.`) },

    { t: '🧭 El resto de la descendencia (12:17)', capa: 'contexto', h:
      hi(`<strong>«El resto»</strong> es el <strong>remanente</strong>, la
      última parte del pueblo de Dios. Bohr lo llama «la simiente de la
      simiente»: Cristo es la simiente (Gálatas 3:16) y los que son de Cristo
      son también simiente (Gálatas 3:29). Contra ellos va el último ataque
      del dragón, que el capítulo 13 explica en detalle.`) +
      tbl(['Señal del remanente', 'Qué significa'], [
        ['Guardan los mandamientos de Dios', 'Los diez, incluido el sábado. El remanente se opone al cambio que el cuerno pequeño pensó hacer en la ley (Daniel 7:25).'],
        ['Tienen el testimonio de Jesucristo', '«El testimonio de Jesús es el espíritu de la profecía» (19:10): el don de profecía en medio del pueblo de Dios.'],
      ]) +
      hi(`Bohr compara ese don con Juan el Bautista, que no hizo milagros pero
      dio un testimonio verdadero de Jesús: una <strong>luz menor</strong> que
      lleva a la luz mayor. La iglesia adventista reconoce ese don en el
      ministerio de <strong>Elena G. de White</strong>, cuyos escritos llevan
      a la Biblia y no la reemplazan. Elena de White aplicó 12:17 a la crisis
      final, cuando se quiera imponer por ley el domingo.`) +
      fu(`Fuentes: Bohr, El Mensaje de los Tres Ángeles, tomo 2, pág. 47 y
      179-189; Bohr, Gemas de la verdad presente, pág. 89-91; Bohr, ¿Cuán cerca
      al fin?, pág. 90.`) },
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
      q: 'Según Bohr, ¿qué representa la mujer vestida del sol de Apocalipsis 12?',
      o: ['La iglesia fiel en los dos testamentos', 'Solo la nación de Israel literal', 'La virgen María como persona', 'La ciudad de Jerusalén restaurada'], a: 0,
      e: 'Bohr: Dios llama esposa a su pueblo (Jeremías 31:32; Efesios 5:25). La mujer es una sola iglesia en dos etapas: Israel antes de Cristo y la iglesia después. Fuente: Bohr, Gemas de la verdad presente, pág. 79-82.' },
    { t: 'mc', v: '12:1', f: 'c',
      q: 'Según Bohr, ¿qué representan el sol que viste a la mujer y la luna bajo sus pies?',
      o: ['Cristo y las Escrituras que lo reflejan', 'El Padre y el Espíritu Santo', 'La Roma pagana y la Roma papal', 'La ley de Dios y la ley ceremonial'], a: 0,
      e: 'Bohr: el sol tiene luz propia, como Cristo; la luna refleja la luz del sol, como las Escrituras dan testimonio de Jesús (Juan 5:39). Fuente: Bohr, Gemas de la verdad presente, pág. 81.' },
    { t: 'mc', v: '12:1', f: 'c',
      q: 'Según Bohr, ¿qué representan las doce estrellas de la corona de la mujer?',
      o: ['Los doce patriarcas y los doce apóstoles', 'Los doce meses del año profético', 'Doce reinos que salieron de Roma', 'Doce ángeles a las puertas de la ciudad'], a: 0,
      e: 'Bohr: las doce tribus de Israel (Génesis 37:9; 49:28) y los doce apóstoles; por eso tuvieron que completar el número doce cuando Judas cayó (Hechos 1). Fuente: Bohr, ¿Cuán cerca al fin?, pág. 77-78.' },
    { t: 'mc', v: '12:3', f: 'c',
      q: 'Según Elena de White, ¿qué simboliza el dragón «en sentido derivado»?',
      o: ['La Roma pagana', 'El papado medieval', 'La Babilonia antigua', 'El imperio griego'], a: 0,
      e: 'El dragón «representa primero a Satanás», pero «en sentido derivado es un símbolo de la Roma pagana», que por medio de Herodes quiso matar a Jesús. Fuente: Elena G. de White, El conflicto de los siglos, pág. 359.' },
    { t: 'tf', v: '12:3', f: 'c',
      q: 'Según Bohr, las siete cabezas del dragón son siete reinos que gobiernan todos al mismo tiempo.', a: false,
      e: 'Falso: Bohr, siguiendo a J. N. Andrews, enseña que las cabezas reinan una después de otra; por eso el agua contra la mujer sale de una sola boca (12:15). Fuente: Bohr, ¿Cuán cerca al fin?, pág. 84.' },
    { t: 'tf', v: '12:4', f: 'c',
      q: 'Según Bohr, la tercera parte de las estrellas que arrastró la cola del dragón son los ángeles que Lucifer engañó.', a: true,
      e: 'Verdadero: la cola es «el profeta que enseña mentira» (Isaías 9:15); con sus mentiras Lucifer arrastró a una tercera parte de los ángeles, que fueron echados con él (12:9). Fuente: Bohr, El Mensaje de los Tres Ángeles, tomo 2, pág. 114-115.' },
    { t: 'mc', v: '12:4', f: 'c',
      q: 'Según Bohr, ¿por medio de quién quiso el dragón devorar al niño apenas naciera?',
      o: ['Del rey Herodes', 'Del faraón de Egipto', 'De Poncio Pilato', 'Del emperador Nerón'], a: 0,
      e: 'Bohr: Satanás no atacó directamente; usó a Herodes, que mandó matar a los niños de Belén (Mateo 2:16), como antes usó a faraón contra Moisés. Fuente: Bohr, ¿Cuán cerca al fin?, pág. 81.' },
    { t: 'mc', v: '12:5', f: 'c',
      q: 'Según Bohr, ¿quién es el hijo varón que fue arrebatado para Dios y para su trono?',
      o: ['Jesús, que venció y subió al trono', 'Constantino, el emperador cristiano', 'Moisés, el libertador de Israel', 'El pueblo de Dios del tiempo final'], a: 0,
      e: 'Bohr: Jesús nació bajo Roma, venció a Satanás en la cruz, resucitó y se sentó con el Padre en su trono (3:21). Moisés es solo una figura de él. Fuente: Bohr, Gemas de la verdad presente, pág. 86-87.' },
    { t: 'mc', v: '12:7', f: 'c',
      q: 'Según Bohr, ¿quién es Miguel, el que lucha contra el dragón?',
      o: ['Cristo mismo, jefe de los ángeles', 'El ángel Gabriel, mensajero de Dios', 'Un ángel creado, el más poderoso', 'El Espíritu Santo de Dios'], a: 0,
      e: 'Bohr: el arcángel Miguel vino a resucitar a Moisés (Judas 9) y Jesús vuelve con «voz de arcángel» (1 Tesalonicenses 4:16). No es un ángel creado: Jesús es Dios eterno. Fuente: Bohr, Gemas de la verdad presente, pág. 77-78.' },
    { t: 'mc', v: '12:10', f: 'c',
      q: 'Según Bohr, ¿cuándo fue echado fuera Satanás como acusador y representante de este mundo?',
      o: ['En la cruz, cuando Jesús venció', 'En 1844, al empezar el juicio', 'En 1798, con la herida mortal', 'Al final de los mil años'], a: 0,
      e: 'Bohr: antes Satanás se presentaba en el cielo como representante de la tierra (Job 1); en la cruz fue echado fuera (Juan 12:31), y 12:10 canta esa victoria. Fuente: Bohr, Gemas de la verdad presente, pág. 84-86.' },
    { t: 'tf', v: '12:12', f: 'c',
      q: 'Según Bohr, el diablo tiene gran ira porque fue herido de muerte en la cruz y sabe que le queda poco tiempo.', a: true,
      e: 'Verdadero: Bohr lo compara con un león herido, más peligroso que uno sano. Fuente: Bohr, Gemas de la verdad presente, pág. 86-87.' },
    { t: 'mc', v: '12:6', f: 'c',
      q: 'Según Bohr, ¿a qué años se aplican los 1.260 días de la mujer en el desierto?',
      o: ['Del 538 al 1798 d.C.', 'Del 457 a.C. al 1844', 'Del 1798 al 1844 d.C.', 'Del 70 al 313 d.C.'], a: 0,
      e: 'Un día por un año (Ezequiel 4:6): 1.260 años de persecución por la unión de iglesia y Estado, del 538 al 1798. Fuentes: Bohr, ¿Cuán cerca al fin?, pág. 83 y 93; Elena G. de White, El conflicto de los siglos, pág. 359.' },
    { t: 'mc', v: '12:14', f: 'c',
      q: 'Según Bohr, ¿cómo se llega de «un tiempo, tiempos y la mitad de un tiempo» a 1.260 años?',
      o: ['3½ años de 360 días, un día por año', '3½ años literales de 365 días', 'Siete años partidos en dos mitades', 'Cuarenta y dos generaciones de 30 años'], a: 0,
      e: 'Bohr: un tiempo es un año, tiempos dos y medio tiempo medio año: 3½ × 360 = 1.260 días, y cada día es un año. Fuente: Bohr, Gemas de la verdad presente, pág. 89.' },
    { t: 'mc', v: '12:15', f: 'c',
      q: 'Según Bohr, ¿qué representa el agua como un río que la serpiente arrojó tras la mujer?',
      o: ['Pueblos y gobiernos que la perseguían', 'Falsas doctrinas que confunden', 'Un diluvio literal del tiempo final', 'El agua de un bautismo falsificado'], a: 0,
      e: 'Las aguas son «pueblos, muchedumbres, naciones y lenguas» (17:15); aquí, gentes movidas a perseguir a la iglesia. Bohr lo ve como un Éufrates crecido. Fuente: Bohr, ¿Cuán cerca al fin?, pág. 85-86.' },
    { t: 'mc', v: '12:16', f: 'c',
      q: 'Según Bohr, ¿qué es «la tierra» que ayudó a la mujer?',
      o: ['El territorio de Norteamérica', 'Los príncipes de la Reforma', 'El imperio de Constantino', 'Las montañas de Palestina'], a: 0,
      e: 'Bohr: un territorio poco poblado, antes de ser nación, que dio refugio a los perseguidos de Europa; de esa misma tierra sube después la bestia de 13:11. Fuente: Bohr, ¿Cuán cerca al fin?, pág. 87-89.' },
    { t: 'mc', v: '12:17', f: 'c',
      q: 'Según Bohr, ¿quiénes son «el resto de la descendencia» de la mujer?',
      o: ['El remanente fiel unido a Cristo, al final', 'Judíos que se convertirán tras un rapto', 'Los mártires de los 1.260 años', 'Los veinticuatro ancianos del trono'], a: 0,
      e: 'Bohr: «la simiente de la simiente»: Cristo es la simiente (Gálatas 3:16) y los que son de él también lo son (Gálatas 3:29). Contra ellos va el ataque final del dragón. Fuente: Bohr, Gemas de la verdad presente, pág. 89-91.' },
    { t: 'mc', v: '12:17', f: 'c',
      q: 'En la interpretación adventista, ¿qué es «el testimonio de Jesucristo» que tiene el remanente?',
      o: ['El espíritu de profecía', 'El bautismo por inmersión', 'El libro de los Hechos', 'La santa cena del Señor'], a: 0,
      e: 'Según 19:10, «el testimonio de Jesús es el espíritu de la profecía». Bohr lo ve en el ministerio de Elena G. de White, una luz menor que lleva a la Biblia. Fuente: Bohr, El Mensaje de los Tres Ángeles, tomo 2, pág. 179 y 187-188.' },
    { t: 'tf', v: '12:17', f: 'c',
      q: 'Según Bohr, la guerra final del dragón contra el remanente (12:17) se explica en detalle en Apocalipsis 13:11-18.', a: true,
      e: 'Verdadero: para Bohr, 13:11-18 es la gran ampliación de un solo versículo, 12:17. Fuente: Bohr, ¿Cuán cerca al fin?, pág. 73 y 93.' },
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
