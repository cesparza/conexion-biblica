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

    { t: '🧭 La bestia del mar es el cuerno pequeño de Daniel 7 (13:1-2)', capa: 'contexto', h:
      hi(`Desde aquí empieza la <strong>interpretación</strong>. Se habla de
      <strong>sistemas y poderes</strong>, nunca contra personas: hay hijos
      sinceros de Dios en todas las iglesias.<br><br>
      La bestia del mar es el mismo poder que el <strong>cuerno
      pequeño</strong> de Daniel 7, por tres razones: está en el mismo lugar de
      la «cadena profética» (la lista de imperios que se siguen), hace lo mismo
      (blasfemias, guerra contra los santos) y dura el mismo tiempo (42 meses =
      tiempo, tiempos y medio tiempo).`) +
      tbl(['Daniel 7', 'Poder', 'Años'], [
        ['León', 'Babilonia', '605-539 a.C.'],
        ['Oso', 'Medo-Persia', '539-331 a.C.'],
        ['Leopardo', 'Grecia', '331-168 a.C.'],
        ['Cuarta bestia (el dragón)', 'Roma', '168 a.C.-476 d.C.'],
        ['Diez cuernos', 'Roma dividida', 'Desde 476 d.C.'],
        ['Cuerno pequeño = bestia del mar', 'Roma papal', 'Supremacía 538-1798; herida en 1798; sana y vuelve al final (13:3)'],
      ]) +
      wa(`Fíjate: la bestia del mar junta las fieras de Daniel 7 en orden
      inverso (leopardo, oso, león) y recibe del dragón su trono. Este símbolo,
      como lo creyeron la mayoría de los protestantes, representa al papado,
      que heredó el poder del antiguo Imperio Romano.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:163-164; CS 492.</p>` },

    { t: '🧭 El trono del dragón y los 42 meses (13:2, 5-7)', capa: 'contexto', h:
      li([`<strong>«El dragón le dio su poder, su trono»:</strong> cuando el
           emperador se fue a Constantinopla y las tribus bárbaras deshicieron
           el imperio de Occidente, el obispo de Roma quedó como única autoridad
           en la ciudad. En el siglo VI, el paganismo le había dejado el lugar
           al papado.`,
          `<strong>Los tres cuernos arrancados</strong> (Daniel 7:8): los
           hérulos (493), los vándalos (534) y los ostrogodos (538).`,
          `<strong>Cuarenta y dos meses:</strong> 42 × 30 = 1.260 días; un día
           por un año (Ezequiel 4:6) da <strong>1.260 años, del 538 al 1798</strong>.`,
          `<strong>Blasfemias:</strong> en la Biblia blasfema el hombre que
           ocupa el lugar de Dios (Juan 10:33) o dice perdonar pecados por su
           propia autoridad (Marcos 2:7). Esto se aplica a las pretensiones del
           sistema papal, no a los fieles católicos.`,
          `<strong>Guerra contra los santos:</strong> la iglesia usaba la
           espada del Estado para castigar a los que no aceptaban sus
           doctrinas, como en la Inquisición.`]) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:63, 148-154, 166-168 y 211-214; Bohr, <i>¿Cuán cerca al fin?</i>, p. 75-76; CS 58 y 492.</p>` },

    { t: '🧭 La espada, el cautiverio y la herida (13:3, 10)', capa: 'contexto', h:
      hi(`El versículo 13:10 dice qué le pasa a la bestia al terminar los 42
      meses: va <strong>en cautividad</strong> y es herida <strong>a
      espada</strong>. ¿Qué espada? La Biblia habla de dos: la del Espíritu,
      que es la Palabra (Efesios 6:17), y la del <strong>gobierno
      civil</strong>, que castiga al que hace lo malo (Romanos 13:4). Durante
      1.260 años el papado usó la espada de los reyes de Europa; en 1798 esa
      misma espada se volvió contra él.`) +
      li([`<strong>Febrero de 1798:</strong> el general francés Louis-Alexandre Berthier entró
           en Roma, quitó del trono al papa Pío VI y se lo llevó preso; murió en
           el destierro en 1799.`,
          `<strong>La herida no cerró la iglesia:</strong> los fieles siguieron
           bautizando, yendo a misa y confesándose. Lo que perdió el papado fue
           el poder civil para obligar y castigar.`,
          `<strong>Un sistema, no un papa:</strong> lo que cayó en cautiverio
           fue el sistema que unía iglesia y Estado, no solo un hombre.`]) +
      wa(`Otra lectura dice que la espada era la Biblia y que la herida la dio
      la Reforma de 1517. No encaja: el papado no mató a nadie con la Biblia, y
      la herida debía llegar al final de los 1.260 años, no en 1517.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:165-170; CS 492.</p>` },

    { t: '🧭 La herida sanada (13:3-4, 12)', capa: 'contexto', h:
      hi(`La curación de la herida es la <strong>cuarta etapa</strong> del
      dragón: el papado volverá a contar con el poder civil de las naciones, y
      el mundo entero se maravillará en pos de él. <strong>1798 corresponde a
      la herida, no a su curación.</strong> La recuperación de influencia no
      equivale a la restauración final del poder para imponer creencias,
      que se presenta como futura, sin fecha fijada.`) +
      li([`<strong>Qué la sanará:</strong> que los gobiernos quiten los
           frenos que hoy limitan a Roma: «Deróguense las medidas restrictivas
           impuestas en la actualidad por los gobiernos civiles» (CS 620), y
           Roma volverá a perseguir.`,
          `<strong>Quién la sanará:</strong> la bestia de la tierra, que hace
           que el mundo adore «a la primera bestia, cuya herida mortal fue
           sanada» (13:12). Ella le devuelve la espada que perdió.`,
          `<strong>La imagen de la bestia:</strong> el protestantismo apóstata
           buscará el apoyo del Estado para imponer sus creencias. La primera
           bestia y su imagen son símbolos relacionados, pero distintos
           (13:11-15; CS 439). Una relación diplomática no prueba por sí sola
           que esta restauración final ya se haya cumplido.`,
          `<strong>«Adoraron al dragón»</strong> (13:4): al seguir a la bestia,
           el mundo en el fondo honra a Satanás, que le dio su autoridad.`]) +
      wa(`La herida quedará plenamente sanada cuando los Estados Unidos ayuden
      al papado a recuperar el poder político que perdió. Otra lectura ve un
      primer paso en 1929, cuando Italia y el Vaticano firmaron el Tratado de
      Letrán.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:170-175; CS 620.</p>` },

    { t: '🧭 La bestia que sube de la tierra (13:11)', capa: 'contexto', h:
      tbl(['Rasgo del texto', 'Qué indica'], [
        ['Es una bestia', 'Una nación, no una persona.'],
        ['Sube cuando la primera es herida', 'Alrededor de <strong>1798</strong>.'],
        ['Sube de la tierra, no del mar', 'El mar son pueblos y guerras (17:15). La tierra es un territorio <strong>poco poblado</strong>: crece en paz, sin derribar a otras naciones, «como una planta». Al occidente de Europa.'],
        ['Es la tierra que ayudó a la mujer', 'El territorio que dio refugio a los perseguidos (12:16).'],
        ['Dos cuernos de cordero', '<strong>Dos reinos en una nación:</strong> la iglesia y el Estado separados, como enseñó Jesús (Mateo 22:21). De ahí salen la <strong>libertad civil</strong> y la <strong>libertad religiosa</strong>: republicanismo y protestantismo.'],
        ['Crece hasta mandar a toda la tierra', 'Llega a ser una potencia política, económica y militar mundial.'],
      ]) +
      hi(`«Una nación, y sólo una, responde a los datos» de esta profecía
      (CS 493): los <strong>Estados Unidos de Norteamérica</strong>. Su
      Constitución y la Primera Enmienda prohíben que el Congreso establezca
      una religión o impida practicarla.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:177-186; CS 491-495.</p>` },

    { t: '🧭 «Hablaba como un dragón» (13:11-14)', capa: 'contexto', h:
      hi(`La bestia habla como dragón <strong>mientras todavía tiene</strong>
      los cuernos de cordero: dice defender la libertad, pero la niega en la
      práctica. Es «una extraña contradicción entre lo que profesa ser y lo
      que practica» (CS 495).`) +
      li([`<strong>Cómo habla una nación:</strong> por los actos de sus
           autoridades legislativas y judiciales. No hace falta borrar la
           Primera Enmienda: basta contradecirla declarando válidas leyes
           religiosas.`,
          `<strong>Habla como dragón:</strong> como Satanás obrando por medio
           de Roma, con el espíritu de intolerancia de los poderes anteriores.`,
          `<strong>Todo «en presencia» de la primera bestia:</strong> la
           expresión significa actuar por encargo de ella.`,
          `<strong>Fuego del cielo</strong> (13:13): no serán simples trucos;
           los agentes de Satanás tendrán poder para hacer milagros. Es un falso
           avivamiento que imita a Elías y a Pentecostés, para engañar al
           mundo.`]) +
      `<p>Fuente: CS 494-496 y 609-610; Bohr, <i>Tres ángeles</i> 1:177-178 y 190-193; Bohr, <i>¿Cuán cerca al fin?</i>, p. 135; Bohr, <i>La sexta trompeta</i>, p. 1.</p>` },

    { t: '🧭 La imagen de la bestia (13:14-15)', capa: 'contexto', h:
      hi(`Una imagen es una copia. Para saber cómo es, hay que ver el rasgo
      principal de la primera bestia: <strong>una iglesia que domina al
      Estado</strong> y usa su poder para imponer su religión y castigar a
      los que no la aceptan.`) +
      li([`Para que haya imagen, el poder religioso debe dominar al gobierno
           civil, de modo que la iglesia use la autoridad del Estado para sus
           fines.`,
          `<strong>Quién la forma:</strong> el «protestantismo apóstata», es
           decir, iglesias que se apartaron de los principios de la Reforma,
           cuando se unan en puntos comunes de doctrina y pidan al Estado que
           imponga sus decretos.`,
          `<strong>La imagen habla y manda matar</strong> (13:15): leyes
           religiosas con castigo civil, que llegan hasta un decreto de muerte.
           Daniel 3 lo ilustra: una imagen, una orden de adorar y un horno para
           el que no obedezca.`]) +
      wa(`Igual que con la primera bestia, se habla de sistemas y no de los
      creyentes sinceros de esas iglesias.`) +
      `<p>Fuente: CS 495-498; Bohr, <i>Tres ángeles</i> 1:195-203.</p>` },

    { t: '🧭 La marca de la bestia (13:16-17)', capa: 'contexto', h:
      hi(`El sello de Dios y la marca de la bestia son <strong>señales de
      autoridad</strong>. El cuarto mandamiento es el único que trae el nombre,
      el título y el dominio del Legislador: es el sello de Dios en su ley. Y
      Roma señala como prueba de su autoridad el haber cambiado el día de
      reposo del sábado al domingo. Ese cambio es la marca de la autoridad de
      la iglesia romana.`) +
      li([`<strong>Frente o mano:</strong> Dios pidió llevar su ley en la mano
           y en la frente (Deuteronomio 6:8). La frente es la mente: ahí la
           reciben los que creen el engaño; en la mano derecha, símbolo de
           fuerza, los que ceden obligados.`,
          `<strong>Comprar y vender:</strong> presión económica sobre los que no
           la reciban, y al final un decreto de muerte.`,
          `<strong>Nadie la tiene hoy:</strong> hay «verdaderos cristianos en
           todas las iglesias, sin exceptuar la católica romana» (CS 502), que
           guardan el domingo con sinceridad, y Dios los acepta. La marca se
           recibe cuando el domingo sea impuesto por ley y la persona, ya
           informada, elija la orden humana en lugar de la de Dios.`]) +
      wa(`No es un tatuaje literal con el número: la gran prueba final no es
      tanto de días como de <strong>autoridad</strong>, a quién se obedece y
      se adora.`) +
      `<p>Fuente: CS 498-503; Bohr, <i>Tres ángeles</i> 2:25 y 46-50; Bohr, <i>Juan Pablo II, el papa Francisco y la gran prueba final</i>, p. 3; Bohr, <i>15 principios</i> 2:105.</p>` },

    { t: '🧭 El 666 (13:18)', capa: 'contexto', h:
      li([`<strong>Es el número de un nombre</strong> (13:17), y ese nombre es
           <strong>de blasfemia</strong> (13:1): un hombre que dice ocupar el
           lugar de Dios en la tierra.`,
          `<strong>Se cuenta con letras:</strong> en hebreo, griego y latín las
           letras servían de números (gematría).`,
          `<strong>En latín:</strong> el dragón que dio el trono era Roma, y el
           latín es la lengua oficial de Roma y del papado.`,
          `<strong>«Número de hombre»:</strong> sin artículo en griego; es un
           sistema centrado en el hombre, no un individuo.`]) +
      tbl(['Vicarius Filii Dei («Vicario del Hijo de Dios»)', 'Suma'], [
        ['V(5) I(1) C(100) A R I(1) V(5) S', '112'],
        ['F I(1) L(50) I(1) I(1)', '53'],
        ['D(500) E I(1)', '501'],
        ['<strong>Total</strong>', '<strong>666</strong>'],
      ]) +
      wa(`El título aparece en la Donación de Constantino, un documento falso
      que varios papas usaron, y en el Decreto de Graciano. No hay forma de
      probar que estuviera en la tiara, pero eso no importa: el título se le
      ha aplicado al papa. Otros nombres propuestos (Lateinos, Dux Cleri,
      Ludovicus) no sirven porque no son blasfemos. Es un título del sistema,
      no un ataque a personas.`) +
      `<p>Fuente: Bohr, <i>Tres ángeles</i> 1:211-224; CBA 7:823-824.</p>` },
    { t: '🧭 La Biblia explica sus símbolos (1): la bestia del mar', capa: 'contexto', h:
      `<p>Los símbolos de este capítulo ya los explicó Daniel 7, y el mismo Apocalipsis completa el resto.</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Mar', 'Pueblos y naciones en lucha', 'Apocalipsis 17:15; Daniel 7:2-3'],
        ['Bestia', 'Rey o reino', 'Daniel 7:17 y 23: las bestias «son cuatro reyes»; «la cuarta bestia será un cuarto reino»'],
        ['León, oso, leopardo', 'Babilonia, Medo-Persia y Grecia', 'Daniel 7:4-6 y 17; Jeremías 50:17; Daniel 8:20-21'],
        ['Cabezas', 'Reinos que se suceden', 'Apocalipsis 17:9-10'],
        ['Cuernos', 'Reyes o reinos', 'Daniel 7:24; Apocalipsis 17:12: «Los diez cuernos que has visto son diez reyes»'],
        ['Dragón', 'Satanás, que obra por medio de Roma', 'Apocalipsis 12:9'],
        ['Cuarenta y dos meses', '1.260 años', 'Números 14:34; Ezequiel 4:6 (un día por año); Apocalipsis 12:6 y 14'],
        ['Espada', 'Aquí, el poder civil que castiga; en otros textos, la Palabra', 'Romanos 13:4; Efesios 6:17'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:102-103, 105 y 216; Bohr, <i>Tres ángeles</i> 1:164-166; CS 491-493.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): la bestia de la tierra y la marca', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Tierra (frente al mar)', 'Un territorio poco poblado', 'Apocalipsis 17:15 (el mar son pueblos); 12:16 (la tierra que ayudó a la mujer)'],
        ['Dos cuernos', 'Dos reinos en una sola nación', 'Daniel 8:20: el carnero de dos cuernos son «los reyes de Media y de Persia»'],
        ['Cordero', 'Cristo', 'Isaías 53:7; Apocalipsis 5:6'],
        ['Fuego del cielo', 'Una imitación del poder de Dios', '1 Reyes 18:38 (Elías); Hechos 2:3 (Pentecostés)'],
        ['Imagen', 'Una copia que se impone por ley, con pena de muerte', 'Daniel 3:1-6'],
        ['Frente', 'La mente', 'Deuteronomio 6:6-8; Hebreos 10:16'],
        ['Nombre', 'El carácter y la autoridad del dueño', 'Deuteronomio 28:10; Isaías 43:7'],
        ['Número seis', 'Apostasía contra Dios', '1 Reyes 10:14 (los 666 talentos de Salomón); Daniel 3:1 (estatua de sesenta codos por seis)'],
      ]) +
      `<p>Fuente: Bohr, <i>15 principios</i> 2:104-105 y 216; Bohr, <i>Tres ángeles</i> 1:182 y 197; Bohr, <i>La sexta trompeta</i>, p. 1; CS 492-493.</p>` },
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
      q: '¿Qué poder representa la bestia que sube del mar?',
      o: ['El papado, el mismo cuerno pequeño', 'Un anticristo de los últimos 7 años', 'El imperio romano de los césares', 'Antíoco Epífanes, rey de Siria'], a: 0,
      e: 'Es el mismo poder que el cuerno pequeño de Daniel 7, leído como sistema religioso y político, no contra personas. Fuente: Bohr, Tres ángeles 1:163-164; CS 492.' },
    { t: 'tf', v: '13:1-2', f: 'c',
      q: 'La bestia del mar y el cuerno pequeño son el mismo poder porque están en el mismo lugar de la cadena profética, hacen lo mismo y duran el mismo tiempo.', a: true,
      e: 'Verdadero: esas son las tres razones. Fuente: Bohr, Tres ángeles 1:164.' },
    { t: 'mc', v: '13:2', f: 'c',
      q: '¿Cuándo le dio el dragón a la bestia «su poder y su trono»?',
      o: ['En el siglo VI, al afirmarse el papado', 'En el año 31, cuando murió Jesús', 'En 313, con el edicto de Milán', 'En 1798, con la Revolución Francesa'], a: 0,
      e: 'En el siglo VI «el paganismo había dejado el lugar al papado» (CS 58), y empezaron los 1.260 años. Fuente: CS 58.' },
    { t: 'mc', v: '13:5', f: 'c',
      q: 'En la interpretación adventista, ¿a qué equivalen los cuarenta y dos meses de Apocalipsis 13:5?',
      o: ['A 1.260 años, del 538 al 1798', 'A 42 años al final del mundo', 'A siete años de gran tribulación', 'A las setenta semanas de Daniel'], a: 0,
      e: '42 × 30 = 1.260 días; un día por un año (Ezequiel 4:6). Es el mismo tiempo que «un tiempo, tiempos y la mitad de un tiempo». Fuente: CS 492; Bohr, Tres ángeles 1:164.' },
    { t: 'mc', v: '13:10', f: 'c',
      q: '¿Qué representa la espada que hirió a la bestia?',
      o: ['El poder civil del Estado', 'La Biblia predicada en la Reforma', 'Los ejércitos del islam', 'Una guerra mundial futura'], a: 0,
      e: 'Es la espada del gobierno (Romanos 13:4). El papado la usó 1.260 años y en 1798 se volvió contra él. No es la Biblia de la Reforma. Fuente: Bohr, Tres ángeles 1:165-166.' },
    { t: 'mc', v: '13:3', f: 'c',
      q: '¿Qué pasó en febrero de 1798?',
      o: ['Un general francés depuso al papa y se lo llevó', 'El papa renunció a su cargo por su voluntad', 'Napoleón fue coronado emperador por el papa', 'Italia confiscó todos los estados papales'], a: 0,
      e: 'El general Louis-Alexandre Berthier quitó del trono a Pío VI y lo llevó preso; murió en el destierro en 1799. La coronación de Napoleón Bonaparte fue en 1804 y la toma de los estados papales en 1870. Fuente: Bohr, Tres ángeles 1:169-170.' },
    { t: 'tf', v: '13:3', f: 'c',
      q: 'La herida mortal de 1798 significa que la Iglesia católica cerró sus puertas y dejó de funcionar.', a: false,
      e: 'Falso: los fieles siguieron con su vida religiosa; lo que perdió el papado fue el poder civil para imponer y castigar. Fuente: Bohr, Tres ángeles 1:170.' },
    { t: 'mc', v: '13:3', f: 'c',
      q: '¿Cuándo quedará plenamente sanada la herida mortal?',
      o: ['Cuando EE.UU. ayude a Roma a recobrar el poder', 'Ya se sanó en 1929 con el Tratado de Letrán', 'Se sanó en 1870 con el concilio Vaticano', 'Cuando se elija al último papa de la lista'], a: 0,
      e: 'La herida se va sanando y quedará plenamente sanada cuando la bestia de la tierra le ayude a recuperar el poder político que perdió. Otra lectura ve en 1929 un primer paso, no la curación completa. Fuente: Bohr, Tres ángeles 1:174-175.' },
    { t: 'mc', v: '13:11', f: 'c',
      q: '¿Qué nación representa la bestia que sube de la tierra?',
      o: ['Los Estados Unidos de América', 'El antiguo imperio romano', 'El reino de Media y Persia', 'La Francia de la Revolución'], a: 0,
      e: '«Una nación, y sólo una, responde a los datos» (CS 493): los Estados Unidos, que crecían en 1798 en un territorio poco poblado. Fuente: CS 493.' },
    { t: 'mc', v: '13:11', f: 'c',
      q: '¿Por qué esta bestia sube «de la tierra» y no del mar?',
      o: ['Creció en un territorio poco poblado y en paz', 'Nació de una revolución sangrienta en Europa', 'Salió de una isla en medio del océano', 'Subió del abismo, como la bestia de 11:7'], a: 0,
      e: 'El mar son «pueblos, muchedumbres, naciones y lenguas» (17:15) y los vientos, guerras; esta nación crece gradual y pacíficamente en territorio desocupado. Fuente: CS 493.' },
    { t: 'mc', v: '13:11', f: 'c',
      q: '¿Qué representan los dos cuernos semejantes a los de un cordero?',
      o: ['La libertad civil y la libertad religiosa', 'Dos papas que gobernaron a la vez', 'El Antiguo y el Nuevo Testamento', 'Inglaterra y Francia, aliadas'], a: 0,
      e: 'Dos reinos en una nación, la iglesia y el Estado separados, como enseñó Jesús (Mateo 22:21): republicanismo y protestantismo. Fuente: Bohr, Tres ángeles 1:182-186.' },
    { t: 'mc', v: '13:11', f: 'c',
      q: '¿Cómo «habla» una nación?',
      o: ['Por sus actos legislativos y judiciales', 'Por las protestas del pueblo en la calle', 'Por la voz de sus predicadores', 'Por la fuerza de sus ejércitos'], a: 0,
      e: '«El "hablar" de la nación son los actos de sus autoridades legislativas y judiciales» (CS 495). Fuente: CS 495.' },
    { t: 'tf', v: '13:13', f: 'c',
      q: 'Los milagros de Apocalipsis 13:13 serán solo trucos sin poder real.', a: false,
      e: 'Falso: «Lo que se predice aquí no es una simple impostura» (CS 609); los agentes de Satanás tendrán poder para hacerlos. Fuente: CS 609.' },
    { t: 'mc', v: '13:14-15', f: 'c',
      q: '¿Qué es la imagen de la bestia?',
      o: ['Iglesias que usan al Estado para imponer su fe', 'Una estatua literal levantada en una plaza', 'Un gobierno ateo que prohíbe toda religión', 'Una copia del templo de Jerusalén'], a: 0,
      e: 'Es el «protestantismo apóstata» cuando las iglesias busquen el poder civil para imponer sus dogmas, copiando a la primera bestia. Fuente: CS 495-498.' },
    { t: 'mc', v: '13:16-17', f: 'c',
      q: 'En la interpretación adventista, ¿qué es la marca de la bestia?',
      o: ['El domingo impuesto por ley, en lugar del sábado', 'Un chip o un tatuaje que se pone en el cuerpo', 'Una moneda especial que hará algún gobierno', 'Un nombre secreto escrito en una piedrecita'], a: 0,
      e: 'Roma presenta el cambio del sábado al domingo como signo de su autoridad; la marca se recibe cuando ese día se imponga por ley y se elija a sabiendas. Fuente: CS 501-503.' },
    { t: 'tf', v: '13:16', f: 'c',
      q: 'Ya hoy tienen la marca todos los que guardan el domingo.', a: false,
      e: 'Falso: hay «verdaderos cristianos en todas las iglesias, sin exceptuar la católica romana» (CS 502), y Dios acepta su sinceridad; la marca se recibe cuando se imponga por ley y se elija contra la luz. Fuente: CS 502.' },
    { t: 'mc', v: '13:16', f: 'c',
      q: '¿Qué indica que la marca pueda ir en la frente o en la mano?',
      o: ['Aceptarla por convicción o por la fuerza', 'Que unos son ricos y otros son pobres', 'Que unos son judíos y otros gentiles', 'Que unos son clérigos y otros laicos'], a: 0,
      e: 'La frente es la mente (Deuteronomio 6:6-8; Hebreos 10:16): la reciben ahí los que creen el engaño. La mano derecha es símbolo de fuerza: la reciben ahí los que ceden obligados. Fuente: Bohr, 15 principios 2:105.' },
    { t: 'mc', v: '13:18', f: 'c',
      q: '¿En qué idioma hay que buscar el nombre cuyo número es 666?',
      o: ['En latín', 'En hebreo', 'En griego', 'En arameo'], a: 0,
      e: 'El dragón que dio el trono fue Roma, y el latín es la lengua oficial de Roma y del papado (Juan 19:20 muestra que se usaba). Fuente: Bohr, Tres ángeles 1:217.' },
    { t: 'mc', v: '13:18', f: 'c',
      q: '¿Qué título da 666 y además es blasfemo?',
      o: ['Vicarius Filii Dei', 'Lateinos, hombre latino', 'Dux Cleri, jefe del clero', 'Ludovicus, de la corte'], a: 0,
      e: 'Lateinos, Dux Cleri y Ludovicus no sirven porque no son blasfemos. Vicarius Filii Dei, «Vicario del Hijo de Dios», suma 666 en números romanos. Fuente: Bohr, Tres ángeles 1:218 y 223.' },
    { t: 'tf', v: '13:18', f: 'c',
      q: '«Número de hombre» quiere decir que el 666 señala a un individuo en particular.', a: false,
      e: 'Falso: «hombre» va sin artículo en griego; señala un sistema centrado en el hombre, no una persona. Fuente: Bohr, Tres ángeles 1:216-217.' },
    { t: 'mc', v: '13:1', f: 'c',
      q: '¿Qué texto de la misma Biblia explica que una bestia representa un reino?',
      o: ['Daniel 7:17 y 23', 'Génesis 1:24', 'Job 40:15', 'Isaías 11:6'], a: 0,
      e: 'Daniel 7:17 dice que las bestias «son cuatro reyes», y 7:23 que «la cuarta bestia será un cuarto reino». Fuente: Bohr, 15 principios 2:105.' },
    { t: 'tf', v: '13:11', f: 'c',
      q: 'Los dos cuernos de la bestia de la tierra se explican con el carnero de Daniel 8, cuyos dos cuernos eran dos reinos en una sola nación.', a: true,
      e: 'Verdadero: los dos cuernos del carnero son «los reyes de Media y de Persia» (Daniel 8:20). Así, dos cuernos son dos reinos en una nación: la iglesia y el Estado separados. Fuente: Bohr, Tres ángeles 1:182.' },
    { t: 'mc', v: '13:13', f: 'c',
      q: '¿Qué historias imita el «fuego del cielo» de Apocalipsis 13:13?',
      o: ['Elías en el Carmelo y Pentecostés', 'Sodoma y la zarza de Moisés', 'Nadab y Abiú y el diluvio', 'Babel y la caída de Jericó'], a: 0,
      e: 'Es un falso avivamiento que imita el fuego que cayó en los días de Elías (1 Reyes 18:38) y las lenguas de fuego de Pentecostés (Hechos 2:3). Fuente: Bohr, 15 principios 2:216; Bohr, La sexta trompeta, p. 1.' },
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
