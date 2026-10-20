/* Daniel 7: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Completa lo que ya está en fuente/contenido.js (bestias, ocho marcas, tres
   cuernos, 1.260 años, orden del juicio, anticristo, Porfirio) sin repetirlo:
   las once señas con su cumplimiento, los tiempos y la ley, las fechas
   533/538 y 1793/1798, la escena de los tronos, el juicio como Día de la
   Expiación, a quién se juzga, los muertos en el juicio, los símbolos que
   explica la Biblia y la comparación con el dragón de Apocalipsis 12, 13 y
   17. Lo de Bohr en inglés va traducido. v188: voz directa, sin nombrar
   autores en el cuerpo; una sola «Fuente:» corta por sección. v198 (13-oct):
   pedido de Camilo sobre el juicio y la bestia espantosa. v210 (14-oct): el tribunal
   y sus libros, las tres fases del juicio, nitsdaq, el día de las trompetas y la
   justicia que absuelve y condena. v213 (Camilo, 14-oct): las tres fases en el
   orden de Daniel 7: la sentencia cuando el Hijo recibe el reino (7:13-14, 22), la
   ejecución cuando los santos lo reciben (7:22, 27); Apocalipsis 20 la continúa. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd7',
  secciones: [
    { t: '🧭 Las señas del cuerno pequeño (1): de dónde sale', capa: 'contexto', verso: 8, h:
      `<p><b>Cuándo:</b> el primer año de Belsasar (7:1), hacia el 553 a.C., catorce años antes de la caída de Babilonia.</p>` +
      `<p>Daniel 7 da <b>once</b> señas del cuerno, y las once se cumplen en un mismo poder. Las seis primeras dicen de dónde sale:</p>` +
      tbl(['Seña', 'Texto', 'Se cumple en'], [
        ['Sale de la cuarta bestia', '7:8, 24', 'Es romano: sede en Roma, el latín y el título de <i>Pontifex Maximus</i> que usaban los emperadores.'],
        ['Sale entre los diez cuernos', '7:8', 'Nace en Europa occidental.'],
        ['Se levanta «tras ellos»', '7:24', 'Después del 476, cuando cayó Rómulo Augústulo, el último emperador de occidente.'],
        ['Es «pequeño» y después «parecía más grande que sus compañeros»', '7:8, 20', 'El obispo de Roma creció poco a poco hasta estar por encima de los reyes de Europa.'],
        ['Derriba a tres reyes', '7:8, 20, 24', 'Hérulos (493), vándalos (534) y ostrogodos (538), los tres arrianos.'],
        ['Es «diferente de los primeros»', '7:24', 'Los diez eran reinos políticos; este une la iglesia y el estado.'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 124-127; Smith, <i>Las profecías de Daniel</i>, p. 58; Vicuña, <i>Estudios del libro de Daniel</i>, p. 89.</p>` },

    { t: '🧭 Las señas del cuerno pequeño (2): qué hace', capa: 'contexto', h:
      tbl(['Seña', 'Texto', 'Se cumple en'], [
        ['«Ojos como de hombre»', '7:8, 20', 'En la profecía los ojos son entendimiento (Efesios 1:18): se apoya en la sabiduría y la tradición humanas.'],
        ['Una boca que habla «con gran insolencia» y «palabras contra el Altísimo»', '7:8, 20, 25', 'La palabra aramea es «cosas grandes»: un cuerno pequeño con palabras grandes, señal de orgullo. Toma títulos y poderes de Dios: ocupar su lugar en la tierra y perdonar pecados (Juan 10:33; Marcos 2:7; Apocalipsis 13:5-6).'],
        ['Hace guerra contra los santos y los vence', '7:21, 25', 'La persecución de valdenses, albigenses y hugonotes, y la Inquisición.'],
        ['«Pensará en cambiar los tiempos y la Ley»', '7:25', 'El sábado y el calendario profético de Dios (ver «Los tiempos y la ley»).'],
        ['Domina «tiempo, tiempos y medio tiempo»', '7:25', '1.260 años: del 538 al 1798.'],
      ]) +
      `<p>Apocalipsis 13 describe el mismo poder con más señas: su descripción “es casi la misma que la descripción del cuerno pequeño en Daniel 7” (CS 492).</p>` +
      wa('Se habla de un <b>sistema</b>, no de personas: dentro de él hay muchas personas sinceras que aman a Dios de corazón.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 119 y 125; Bohr, <i>La gran cadena</i>, p. 7; Doukhan, <i>Secretos de Daniel</i>, p. 109; Vicuña, <i>Estudios del libro de Daniel</i>, p. 91-92; CS 492.</p>` },

    { t: '🧭 Las cuatro etapas de Roma', capa: 'contexto', h:
      `<p>La cuarta bestia, sus diez cuernos y el cuerno pequeño son el mismo imperio en etapas seguidas:</p>` +
      tbl(['Etapa', 'En Daniel 7', 'Años'], [
        ['1. Roma imperial', 'La bestia misma, con dientes de hierro (7:7, 23)', '168 a.C.-476 d.C.'],
        ['2. Roma dividida', 'Los diez cuernos: «diez reyes» (7:24)', 'Desde 476'],
        ['3. Roma papal', 'El cuerno pequeño (7:8, 24-25)', '538-1798'],
        ['4. Roma papal sanada', 'No va aparte en Daniel 2 ni 7; la muestra Apocalipsis 13:3, 12 y 17:8: la bestia «era y no es, y será»', 'Restauración final futura, sin fecha fijada'],
      ]) +
      `<p>La cuarta etapa se incluye porque el poder papal sigue hasta el fin. 1798 corresponde a la herida, no a su curación. La restauración final de su poder perseguidor es futura (Apocalipsis 13:3, 11-15; CS 439), y volverá a perseguir a los santos hasta que el juicio le quite el dominio y Cristo vuelva (7:21-22, 26). La piedra hiere la imagen «en sus pies de hierro y de barro cocido» (2:34, 44-45). El cuerno de Daniel 8 «será quebrantado, aunque no por mano humana» (8:25), y el rey del norte, recuperado de su herida, «llegará a su fin» (11:40-45).</p>` +
      hi('La herida mortal corresponde a la pérdida del poder civil coercitivo en 1798. La profecía anuncia una restauración final futura, sin fijar fecha, cuando «toda la tierra» irá en pos de la bestia. El hombre de pecado sigue hasta la segunda venida (2 Tesalonicenses 2:8).') +
      `<p>Fuente: CS 492 y 636; Bohr, <i>Daniel 1-10</i>, p. 120-121; Bohr, <i>Apocalipsis 17</i>, p. 7-8.</p>` },

    /* v236: el fin de la bestia y de las otras tres (7:11-12), con fuente y página. */
    { t: '🧭 El fin de la bestia (7:11-12)', capa: 'contexto', h:
      `<p>«mientras miraba mataron a la bestia, y su cuerpo fue destrozado y entregado para quemarlo en el fuego» (7:11). Las palabras del cuerno traen su fin: la bestia no se convierte, es destruida.</p>` +
      `<p>A las otras tres «les habían quitado su dominio, pero les había sido prolongada la vida hasta cierto tiempo» (7:12). Babilonia, Medo-Persia y Grecia perdieron el poder, pero sus pueblos siguieron viviendo bajo el reino siguiente. Con la cuarta no pasa así: después de ella no viene otro reino de hombres.</p>` +
      `<p>Los versículos 11 y 12 adelantan el final. En el orden de los hechos: se ponen los tronos, se sienta el Anciano de días, llega el Hijo del hombre, se hace el juicio, se da la recompensa al Hijo del hombre y a los santos y, al final, se destruye la bestia. El cuerno de Daniel 7 y el de Daniel 8 terminan por obra de Dios, no de hombres (7:11, 26; 8:25).</p>` +
      `<p>Fuente: Smith, <i>Las profecías de Daniel</i>, p. 59-60; Maxwell, <i>El porvenir del mundo revelado</i>, p. 117; Bohr, <i>Daniel 1-10</i>, p. 305.</p>` },

    { t: '🧭 Los tiempos y la ley (7:25)', capa: 'contexto', h:
      `<p>Daniel 7:25 usa dos palabras arameas para «tiempo». En «tiempo, tiempos y medio tiempo» es un <b>lapso</b>: los 1.260 años. En «cambiar los tiempos» es otra palabra, <b>tiempos fijados que se repiten</b>, y va unida a «la Ley», en singular. Dios es el que «muda los tiempos» (2:21); el cuerno quiere hacer lo que solo Dios hace.</p>` +
      li([
        '<b>La ley.</b> Se quitó el mandamiento sobre las imágenes y se dividió en dos el último para seguir contando diez (CS 55).',
        '<b>El sábado.</b> Es el único tiempo fijado de los diez mandamientos, y se cambió por el domingo. «El cambio introducido en el cuarto mandamiento cumple exactamente la profecía» (CS 499).',
        '<b>El calendario profético.</b> En lugar de leer la profecía como historia que se cumple en orden, de Daniel hasta el fin, se propuso ponerla toda en el pasado o toda en el futuro.',
      ]) +
      `<p>El cuerno quebranta sobre todo la <b>primera tabla</b>: se hace como Dios (1.º), blasfema (3.º), cambia el sábado (4.º) y además mata a los santos (6.º). Apocalipsis 13 agrega la adoración a una imagen (2.º). En la carta <i>Dies Domini</i> (1998), el papa Juan Pablo II explica el paso del sábado al domingo por la <b>tradición</b>.</p>` +
      wa('Si en 1844 se juzga con la ley, la ley seguía vigente en 1844: no fue clavada en la cruz.') +
      `<p>Fuente: CS 55 y 499; Shea, <i>Daniel</i>, p. 122 y 208; Bohr, <i>Daniel 1-10</i>, p. 125, 162, 265 y 273-274.</p>` },

    { t: '🧭 De febrero a febrero: 538 y 1798 al mes', capa: 'contexto', h:
      tbl(['Año', 'Qué pasó', '1.260 años después'], [
        ['533', 'El emperador Justiniano I escribe al papa Juan II y lo reconoce como «cabeza de todas las santas iglesias». La carta entra a su código de leyes.', '1793: el 26 de noviembre Francia decreta abolir toda religión.'],
        ['538', 'En febrero el general Flavio Belisario derrota a los ostrogodos, el último cuerno arriano. Recién ahí el decreto se puede aplicar.', '1798: el 10 de febrero el general Louis-Alexandre Berthier quita al papa Pío VI de su trono.'],
      ]) +
      `<p>Que coincida «al mes» confirma que los 1.260 días son años. El período empezó «con la supremacía del papado, en el año 538» y terminó en 1798, cuando el papa fue hecho prisionero (CS 492).</p>` +
      hi('<b>«Anti» también es «en lugar de».</b> En griego <i>anti</i> no solo es «contra»: Herodes <i>Antipas</i> gobernó «en lugar de» su padre. Un poder que se presenta como representante de Cristo en la tierra encaja con «anticristo».') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 133-134, 198-199 y 201; CS 492.</p>` },

    { t: '🧭 «Fueron puestos unos tronos»: la escena del juicio (7:9-10, 13)', capa: 'contexto', verso: 9, h:
      tbl(['Lo que ve Daniel', 'Qué enseña'], [
        ['«Fueron puestos unos tronos»', 'El verbo arameo (<i>remiv</i>, <span class="heb" lang="he">רְמִיו</span>) es el mismo de «echar» al horno (3:6) y al foso (6:16); aquí es <b>colocar</b>. Los tronos se ponen porque antes no estaban: empieza algo nuevo.'],
        ['«Se sentó un Anciano de días»', 'Dios el Padre, el Eterno (Salmo 90:2), preside el juicio. En 7:22 «vino»: llega al lugar del juicio.'],
        ['Vestido blanco como la nieve; pelo como lana limpia', 'Pureza sin mancha y eternidad.'],
        ['Trono de llamas con ruedas de fuego, y un río de fuego', 'Un trono que se mueve, como el carro de Ezequiel 1. El fuego es el juicio que purifica.'],
        ['Miles de miles y millones de millones', 'Ángeles, «ministros y testigos» del tribunal (CS 533; Apocalipsis 5:11). No son los juzgados.'],
        ['El Hijo del hombre viene «con las nubes» y «lo hicieron acercarse»', 'Los ángeles lo llevan ante el Padre, no a la tierra. El Día de la Expiación la nube entraba al lugar santísimo (Levítico 16:2).'],
      ]) +
      hi('El trono con ruedas muestra un <b>traslado</b>: del lugar santo al <b>lugar santísimo</b> del santuario celestial, donde está el arca con la ley. Los tronos son varios: en Apocalipsis 4:4 hay veinticuatro tronos alrededor del de Dios. Otra lectura ve un plural de majestad: un solo gran trono.') +
      `<p>Fuente: CS 533; Bohr, <i>Daniel 1-10</i>, p. 276-280; Smith, <i>Las profecías de Daniel</i>, p. 58-59; Doukhan, <i>Secretos de Daniel</i>, p. 115-116.</p>` },

    { t: '🧭 Dónde y cuándo empieza el juicio', capa: 'contexto', verso: 9, h:
      `<p><b>Dónde: en el cielo.</b> En Daniel 7 lo que pasa en la tierra va en prosa y lo que pasa en el cielo va en poesía:</p>` +
      tbl(['Versículos', 'Escena', 'Estilo'], [
        ['2-8', 'Tierra', 'Prosa'], ['9-10', 'Cielo', 'Poesía'], ['11-12', 'Tierra', 'Prosa'],
        ['13-14', 'Cielo', 'Poesía'], ['15-22', 'Tierra', 'Prosa'], ['23-27', 'Cielo', 'Poesía'],
      ]) +
      `<p><b>Cuándo: después de 1798 y antes de la segunda venida.</b> Tres veces el juicio llega como respuesta a la obra del cuerno (7:8 y 9; 7:21 y 22; 7:25 y 26): empieza después de sus 1.260 años (538-1798). En 7:13 el Hijo del hombre va <i>al Padre</i>, al juicio, «no a la tierra» (CS 477), y solo después vuelve a dar el reino. La fecha exacta, 1844, la da Daniel 8:14.</p>` +
      `<p>Daniel 8:14 dice que el santuario «será purificado». El verbo hebreo (<i>nitsdaq</i>, <span class="heb" lang="he">נִצְדַּק</span>) también es «será vindicado, declarado justo»: es el lenguaje de un tribunal. Daniel 8:14 y 7:9-10 hablan del mismo juicio.</p>` +
      hi('<b>Tres pasos</b>, como en un juicio humano: investigación (se abren los libros, 7:10), sentencia, cuando el Hijo recibe el reino y el fallo sale a favor de los santos (7:14, 22), y ejecución, cuando los santos reciben el reino y el cuerno pierde su dominio (7:22, 26-27). Son las tres fases del juicio, que van más abajo.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 120-121 y 275-276; Bohr, <i>La hora del juicio</i>, p. 1 y 6; CS 477; Treiyer, <i>Los tiempos apocalípticos del santuario</i>, p. 139-140.</p>` },

    { t: '🧭 El juicio es el gran Día de la Expiación', capa: 'contexto', h:
      `<p>Daniel 7 ve el juicio; Daniel 8:14 lo llama purificar el santuario. Es el mismo suceso, y el santuario de Israel lo ensayaba cada año:</p>` +
      tbl(['Día de la Expiación (Levítico 16)', 'El juicio en el cielo'], [
        ['Una vez al año, el día diez del mes séptimo (16:29)', 'Una sola vez: desde 1844, al terminar las 2.300 tardes y mañanas (8:14)'],
        ['El sumo sacerdote entra al lugar santísimo, ante el arca (16:2, 12-15)', '«El templo de Dios fue abierto en el cielo, y el Arca de su pacto se dejó ver» (Apocalipsis 11:19)'],
        ['Se purifica el santuario de los pecados confesados en el año (16:16, 30)', 'Se abren los libros (7:10) y se borran los pecados perdonados'],
        ['Quien no se humillaba ese día era cortado del pueblo (Levítico 23:29)', 'Se decide quién recibe el reino (7:22, 27)'],
      ]) +
      `<p>Diez días antes, el día de las trompetas llamaba a todo Israel a prepararse (Levítico 23:24, 27). Nadie llegaba a la alegría de los Tabernáculos sin pasar por la Expiación.</p>` +
      hi('Por eso el primer ángel anuncia: «la hora de su juicio ha llegado» (Apocalipsis 14:7). Lo dice mientras todavía se predica el evangelio eterno (14:6) y antes de que el Hijo del hombre venga sobre la nube (14:14): el juicio va <b>antes</b> de la segunda venida. Cristo trae su recompensa cuando viene (Mateo 16:27; Apocalipsis 22:12) porque ya se decidió en el juicio.') +
      `<p>Fuente: CS 471-472, 476-477, 485 y 537-538; Bohr, <i>Daniel 1-10</i>, p. 275 y 280; Bohr, <i>La hora del juicio</i>, p. 1 y 6; Treiyer, <i>Los tiempos apocalípticos del santuario</i>, p. 78-79 y 144.</p>` },

    { t: '🧭 A quién se juzga y a favor de quién (7:22, 26)', capa: 'contexto', h:
      `<p>«Se hizo justicia a los santos del Altísimo» (7:22). Otras versiones dicen «se dio el juicio a los santos»: el fallo sale <b>a favor</b> de ellos. Y para que el fallo sea a su favor, sus casos tienen que estar en el juicio.</p>` +
      li([
        '<b>Los que profesaron ser hijos de Dios.</b> En el Día de la Expiación solo contaban los pecados que se habían confesado en el santuario. Así, ahora se examinan solo los casos de quienes hayan profesado ser hijos de Dios (CS 534): el juicio empieza por la casa de Dios (1 Pedro 4:17).',
        '<b>El cuerno pequeño.</b> Dice ser cristiano, y su caso también llega al tribunal: «le quitarán su dominio» (7:26). La sentencia a favor de los santos es sentencia contra él.',
        '<b>Los impíos</b> se juzgan después, en otra etapa: durante los mil años (Apocalipsis 20:4, 12).',
      ]) +
      `<p>La justicia de la Biblia tiene dos caras: absolver al justo y condenar al culpable (Deuteronomio 25:1; 1 Reyes 8:32). Por eso el mismo juicio da el reino a los santos y le quita el dominio al cuerno.</p>` +
      hi('Dios no necesita el juicio para enterarse. Así lo hizo siempre: preguntó a Adán antes de dar la sentencia (Génesis 3:9-13) y bajó a ver antes de juzgar a Sodoma (Génesis 18:21). Los libros se abren para que todo el universo vea que sus decisiones son justas (1 Corintios 4:9), y después «llegó el tiempo, y los santos recibieron el reino» (7:22).') +
      `<p>Fuente: CS 534; Pfandl, <i>Daniel</i>, p. 47; Bohr, <i>Daniel 1-10</i>, p. 121 y 279; Bohr, <i>La hora del juicio</i>, p. 1; Vicuña, <i>Estudios del libro de Daniel</i>, p. 87; Goldstein, <i>Ataque contra el lugar santísimo</i>, p. 78-79.</p>` },

    { t: '🧭 Cómo se juzga a los que ya murieron', capa: 'contexto', h:
      `<p>Si Adán murió y volvió al polvo, ¿cómo pudo comparecer en el juicio de 1844? La respuesta está en los <b>libros</b> de 7:10:</p>` +
      li([
        'Dios guarda un registro exacto de cada vida: obras, palabras y aun secretos (2 Corintios 5:10; Mateo 12:36-37; Eclesiastés 12:14).',
        'El juicio empieza con los que vivieron primero, sigue generación por generación y termina con los vivos (CS 536).',
        'Los muertos no están presentes en persona: se examina su registro. Es como un video: la persona ya murió, pero en la grabación está viva.',
        'Quien se arrepintió y confesó tiene a Cristo como abogado (1 Juan 2:1), y sus pecados se borran del registro (Levítico 16:16).',
      ]) +
      hi('Por eso el juicio es una buena noticia para el que está en Cristo: lo que se borra en el juicio no se le devuelve en la resurrección.') +
      `<p>Fuente: Bohr, <i>La hora del juicio</i>, p. 3-13; CS 536-537.</p>` },

    { t: '🧭 «El Juez se sentó y los libros fueron abiertos» (7:10)', capa: 'contexto', verso: 10, h:
      `<p>En visión, el Padre se levantó y «en un carro de llamas entró en el Lugar Santísimo, al interior del velo, y se sentó» (PE 55). Es el Juez de 7:10. Así está formado el tribunal:</p>` +
      tbl(['En el tribunal', 'Quién es', 'Dónde lo dice'], [
        ['El Juez', 'Dios el Padre, el Anciano de días', 'Daniel 7:9-10; CS 533'],
        ['El abogado', 'Cristo, que presenta a los suyos y recibe el reino', '1 Juan 2:1; Daniel 7:13-14'],
        ['El acusador', 'Satanás', 'Zacarías 3:1; Apocalipsis 12:10'],
        ['Los testigos', 'Los ángeles, «miles de miles»', 'Daniel 7:10; CS 533'],
        ['La evidencia', 'Los libros', 'Daniel 7:10; Apocalipsis 20:12'],
      ]) +
      tbl(['Libro', 'Qué guarda'], [
        ['El libro de la vida', 'Los nombres de los que entraron al servicio de Dios (Filipenses 4:3; Daniel 12:1)'],
        ['El libro de memoria', 'Las buenas obras de los que temen a Dios (Malaquías 3:16; Salmo 56:8)'],
        ['El registro de los pecados', 'Toda obra, aun lo encubierto (Eclesiastés 12:14; Mateo 12:36-37)'],
      ]) +
      hi('El abogado no pierde ningún caso que se le confía: los pecados confesados se borran del registro y el nombre queda en el libro de la vida (Apocalipsis 3:5).') +
      `<p>Fuente: PE 55; CS 533-538; Bohr, <i>Culto en el trono de Satanás</i>, p. 44; Bohr, <i>La hora del juicio</i>, p. 3-5 y 11-12.</p>` },

    { t: '🧭 Las tres fases del juicio', capa: 'contexto', h:
      `<p>Daniel 7 muestra las tres fases en orden. Las dos primeras pasan en el cielo; la tercera empieza cuando Cristo vuelve:</p>` +
      tbl(['Fase', 'Cuándo', 'Qué pasa'], [
        ['1 · Investigación', 'Desde 1844 hasta el cierre de la gracia', 'Se abren los libros de los que profesaron ser hijos de Dios (7:10)'],
        ['2 · Sentencia', 'Al cierre de la gracia, en el cielo, antes de las plagas y de la venida', 'El Hijo, que llegó ante el Anciano de días en 1844 (7:13), recibe el reino (7:14); el fallo es a favor de los santos (7:22a)'],
        ['3 · Ejecución', 'Cuando los santos reciben el reino: en la segunda venida', 'Los santos reciben el reino (7:18, 22b, 27) y al cuerno le quitan el dominio (7:26)'],
      ]) +
      li([
        'El reino son sus súbditos. Cuando se falla el último caso, el número está completo: Cristo «había recibido su reino» (PE 280). Termina su mediación y se cierra la gracia: «se levantará Miguel» (Daniel 12:1; Apocalipsis 22:11).',
        'En 1844 va al Padre a recibir el reino (7:13), y se le da al terminar su obra de mediador (CS 533). Como el noble de Lucas 19:12 y 15: recibe el reino y vuelve.',
        'Primero el Hijo recibe el reino en el cielo; después vuelve por los suyos «de las bodas» (Lucas 12:36; CS 480).',
      ]) +
      hi('Apocalipsis 20 sigue el juicio más allá de la venida: en los mil años los santos juzgan con Cristo (20:4) y el gran trono blanco cumple la sentencia de los perdidos (20:11-15). No se contradicen: la ejecución empieza en la venida y termina después del milenio.') +
      `<p>Fuente: PE 55 y 280; CS 368-369, 480-481, 533, 671 y 718-719; Bohr, <i>Daniel 1-10</i>, p. 121 y 288; Bohr, <i>15 principios</i> 2:306-307.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (1): la visión', capa: 'contexto', verso: 17, h:
      `<p>Daniel 7 no deja los símbolos a la imaginación: la misma Biblia dice qué son.</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Vientos', 'Guerras y luchas entre naciones', 'Jeremías 25:32-33'],
        ['Mar, aguas', 'Pueblos y naciones', 'Apocalipsis 17:15: las aguas «son pueblos, muchedumbres, naciones y lenguas»; Isaías 17:12'],
        ['Bestia', 'Rey o reino', 'Daniel 7:17 y 23: las bestias «son cuatro reyes»; «la cuarta bestia será un cuarto reino»'],
        ['León', 'Babilonia', 'Jeremías 50:17, 43-44'],
        ['Alas', 'Rapidez para conquistar', 'Habacuc 1:6-8; Deuteronomio 28:49'],
        ['Cuerno', 'Rey o reino', 'Daniel 7:24: «Los diez cuernos significan que de aquel reino se levantarán diez reyes»'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 121; Bohr, <i>15 principios</i> 2:105; Bohr, <i>La gran cadena</i>, p. 4-5; Smith, <i>Las profecías de Daniel</i>, p. 55; CS 493.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): el cuerno y el juicio', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Ojos', 'Sabiduría, inteligencia', 'Efesios 1:18'],
        ['Tiempo, tiempos y medio tiempo', 'Tres años y medio: 1.260 días', 'Apocalipsis 12:6 y 14 (1.260 días = «un tiempo, tiempos y la mitad de un tiempo»); Daniel 4:16 («siete tiempos»: años)'],
        ['Día', 'Año', 'Números 14:34; Ezequiel 4:6'],
        ['Nubes', 'Los ángeles que acompañan a Cristo', 'Salmo 68:17; Deuteronomio 33:2'],
        ['Libros', 'El registro de cada vida', 'Apocalipsis 20:12: juzgados «por las cosas que estaban escritas en los libros»; Malaquías 3:16; Eclesiastés 12:14'],
      ]) +
      hi('Con esta clave, 7:13 no es la segunda venida: las nubes de ángeles llevan al Hijo del hombre <b>hasta el Anciano de días</b>, al juicio.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 125 y 280; Bohr, <i>15 principios</i> 2:105; Bohr, <i>La hora del juicio</i>, p. 3-4.</p>` },

    { t: '🧭 ¿La bestia espantosa es el dragón?', capa: 'contexto', h:
      `<p>Daniel no le da nombre: solo dice que era «muy diferente de todas las bestias» (7:7). Apocalipsis muestra el mismo poder con otras figuras:</p>` +
      tbl(['', 'Daniel 7', 'Apoc. 12', 'Apoc. 13', 'Apoc. 17'], [
        ['Figura', 'Sin nombre, dientes de hierro', 'Gran dragón escarlata', 'Leopardo con pies de oso y boca de león', 'Bestia escarlata; una mujer encima'],
        ['Cabezas', 'Una (7:20)', 'Siete', 'Siete', 'Siete'],
        ['Cuernos', 'Diez y el pequeño', 'Diez', 'Diez', 'Diez'],
        ['Coronas', 'No dice', 'Siete, en las cabezas', 'Diez, en los cuernos', 'No dice'],
        ['El poder', 'El cuerno pequeño sale de su cabeza', 'Da a la bestia «su poder, su trono y gran autoridad» (13:2)', 'Lo recibe del dragón', 'Los diez reyes se lo entregan (17:13)'],
        ['Es', 'Roma imperial', 'Satanás (12:9), por medio de Roma pagana', 'Roma papal, 1.260 años', 'Roma papal sanada, al final'],
      ]) +
      `<p><b>Respuesta:</b> el dragón es primero Satanás (12:9) y en segundo lugar Roma pagana (CS 491). En esa etapa representa el mismo poder que la cuarta bestia de Daniel 7, Roma pagana, con otra figura; Daniel no la llama dragón. Pero el dragón es más amplio: sus siete cabezas abarcan los reinos uno tras otro, con Satanás detrás de todos. Lo que Daniel muestra como un cuerno que sale de la cabeza de la bestia, Apocalipsis lo muestra como el dragón que le da su trono a la bestia del mar (CS 492).</p>` +
      `<p>Fuente: CS 491-492; Bohr, <i>Daniel 1-10</i>, p. 61, 120 y 304; Smith, <i>Las profecías del Apocalipsis</i>, p. 127-129.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '7:8', f: 'c', q: '¿Qué representan los «ojos como de hombre» del cuerno pequeño?', o: ['Dependencia de la sabiduría humana', 'Vigilancia constante sobre los santos', 'Un conocimiento profético verdadero', 'La fuerza de sus ejércitos'], a: 0, e: 'En la profecía los ojos simbolizan sabiduría (Efesios 1:18). El cuerno se apoyaría en la sabiduría y la tradición de los hombres. Fuente: Bohr, <i>Daniel 1-10</i>, p. 125.' },
    { t: 'mc', v: '7:25', f: 'c', q: '¿Qué son «los tiempos» que el cuerno pequeño pensaría cambiar?', o: ['Tiempos fijados por Dios, como el sábado', 'Las fechas de las fiestas judías', 'El calendario juliano por el gregoriano', 'Los años de reinado de los césares'], a: 0, e: 'La palabra aramea habla de tiempos fijados que se repiten, unidos a «la Ley»: el sábado del cuarto mandamiento, y también el calendario profético de Dios, que «muda los tiempos» (2:21). Fuente: CS 499; Shea, <i>Daniel</i>, p. 122; Bohr, <i>Daniel 1-10</i>, p. 125.' },
    { t: 'mc', v: '7:24', f: 'c', q: '¿En qué era «diferente» el cuerno pequeño de los diez cuernos?', o: ['Unía la iglesia y el estado', 'Era un reino de Asia', 'Nunca tuvo un rey propio', 'Solo gobernaba en África'], a: 0, e: 'Los diez cuernos eran reinos políticos; el cuerno pequeño sería una mezcla de poder religioso y civil. Fuente: Bohr, <i>Daniel 1-10</i>, p. 125.' },
    { t: 'mc', v: '7:25', f: 'c', q: '¿En qué mes de 538 fueron derrotados los ostrogodos y en qué mes de 1798 Berthier quitó al papa de su trono?', o: ['Febrero en los dos casos', 'Marzo y octubre', 'Junio y febrero', 'Diciembre y agosto'], a: 0, e: 'La derrota decisiva de los ostrogodos fue en febrero de 538 y Louis-Alexandre Berthier actuó el 10 de febrero de 1798: 1.260 años «al mes». Fuente: Bohr, <i>Daniel 1-10</i>, p. 134 y 199.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'El decreto de Justiniano que reconoció al papa como cabeza de todas las iglesias se dio en 533, pero solo pudo aplicarse del todo en 538.', a: true, e: 'Verdadero. Mientras los ostrogodos arrianos dominaban Italia el decreto no se podía hacer cumplir; su derrota en 538 lo hizo efectivo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 134 y 198.' },
    { t: 'mc', v: '7:25', f: 'c', q: '¿Qué pasó en Francia el 26 de noviembre de 1793, 1.260 años después del decreto de Justiniano?', o: ['Se decretó abolir toda religión', 'Napoleón fue coronado emperador', 'Se firmó un concordato con Roma', 'Se proclamó la libertad de cultos'], a: 0, e: 'La Convención francesa decretó la abolición de la religión: iglesias cerradas y Biblias quemadas. Contado desde 533, es la contraparte de 1798, que se cuenta desde 538. Fuente: Bohr, <i>Daniel 1-10</i>, p. 198-199.' },
    { t: 'mc', v: '7:9', f: 'c', q: '¿Qué detalle del texto muestra que el juicio de Daniel 7 ocurre en el cielo?', o: ['Va en poesía, como toda escena celestial del capítulo', 'Se celebra en el valle de Josafat', 'Lo preside un tribunal del Imperio romano', 'Ocurre después de la segunda venida'], a: 0, e: 'En Daniel 7 lo terrenal va en prosa y lo celestial en poesía; las escenas del juicio (7:9-10, 13-14, 23-27) están en poesía. Fuente: Bohr, <i>Daniel 1-10</i>, p. 120 y 275.' },
    { t: 'tf', v: '7:13', f: 'c', q: 'En Daniel 7:13 el Hijo del hombre viene a la tierra en su segunda venida.', a: false, e: 'Falso: Cristo vino «no a la tierra, como ellos lo esperaban, sino» al lugar santísimo, ante el Anciano de días, en el cielo, para el juicio que empezó en 1844. Fuente: CS 477.' },
    { t: 'mc', v: '7:14', f: 'c', q: 'Según Daniel 7, ¿cuándo se da la sentencia del juicio?', o: ['Cuando el Hijo recibe el reino', 'Cuando Cristo vuelve a la tierra', 'Durante los mil años', 'En el gran trono blanco'], a: 0, e: 'El Hijo «vino hasta el Anciano de días» en 1844 (7:13), y al cierre de la gracia, en el cielo, antes de las plagas y de la venida, «le fue dado dominio, gloria y reino» (7:14): el fallo es a favor de los santos (7:22). La ejecución viene después, cuando «los santos recibieron el reino» (7:22). Fuente: PE 280; CS 533; Bohr, <i>15 principios</i> 2:306-307.' },
    { t: 'mc', v: '7:14', f: 'c', q: '¿Cuándo recibe el Hijo del hombre el reino?', o: ['Al cierre de la gracia', 'En 1844, al llegar al Padre', 'En la segunda venida', 'Después de los mil años'], a: 0, e: 'En 1844 va al Padre a recibirlo (7:13), pero el reino «le será dado a la conclusión de su obra de mediador» (CS 533): cuando se levanta Miguel (12:1) y se cierra la gracia (Apocalipsis 22:11). Después vuelve como Rey de reyes (Lucas 19:12, 15). Fuente: CS 533 y 671; Bohr, <i>Daniel 1-10</i>, p. 288.' },
    { t: 'tf', v: '7:10', f: 'c', q: 'En la visión de Primeros escritos, el Padre entra en el lugar santísimo en un carro de llamas y se sienta: es el Juez que se sienta en Daniel 7:10.', a: true, e: 'Verdadero. Hasta 1844 el Padre y el Hijo estaban en el lugar santo; allí el Padre pasa al lugar santísimo y empieza el juicio. Fuente: PE 55; Bohr, <i>Culto en el trono de Satanás</i>, p. 44.' },
    { t: 'mc', v: '7:10', f: 'c', q: '¿Qué fiesta llamaba a Israel a prepararse diez días antes del Día de la Expiación?', o: ['El día de las trompetas', 'La fiesta de la Pascua', 'El día de Pentecostés', 'La fiesta de los Tabernáculos'], a: 0, e: 'El primer día del mes séptimo sonaban las trompetas; el día diez era la Expiación (Levítico 23:24, 27). Es el tono de Apocalipsis 14:7: «la hora de su juicio ha llegado». Fuente: Treiyer, <i>Los tiempos apocalípticos del santuario</i>, p. 78-79.' },
    { t: 'mc', v: '7:26', f: 'c', q: '¿Por qué el mismo juicio da el reino a los santos y le quita el dominio al cuerno?', o: ['La justicia absuelve al justo y condena al culpable', 'El cuerno pidió que lo juzgaran aparte', 'Los santos juzgan al cuerno en la tierra', 'El juicio solo trata del cuerno pequeño'], a: 0, e: 'Así se juzgaba en Israel: «absolverán al justo, y condenarán al culpable» (Deuteronomio 25:1; 1 Reyes 8:32). El fallo a favor de los santos (7:22) es el fallo contra el cuerno (7:26). Fuente: Goldstein, <i>Ataque contra el lugar santísimo</i>, p. 78-79.' },
    { t: 'mc', v: '7:22', f: 'c', q: '¿Cuáles son los tres pasos del juicio que muestra Daniel 7?', o: ['Investigación, sentencia y ejecución', 'Acusación, defensa y apelación', 'Arresto, proceso y perdón', 'Registro, sellamiento y castigo'], a: 0, e: 'Se abren los libros (7:10), el Hijo recibe el reino y la sentencia sale a favor de los santos (7:14, 22), y en la venida los santos reciben el reino (7:22, 27). Fuente: Bohr, <i>Daniel 1-10</i>, p. 121; Bohr, <i>15 principios</i> 2:306-307.' },
    { t: 'mc', v: '7:10', f: 'c', q: '¿Con quiénes comenzó el juicio en 1844?', o: ['Con los que vivieron primero en la tierra', 'Con los creyentes que vivían en 1844', 'Con los mártires de la Edad Media', 'Con los doce apóstoles de Jesús'], a: 0, e: 'El juicio empieza con los primeros que vivieron, sigue generación por generación y termina con los vivos. Adán fue el primero en comparecer. Fuente: Bohr, <i>La hora del juicio</i>, p. 7; CS 536.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'El cuerno pequeño es acusado sobre todo de quebrantar mandamientos de la primera tabla de la ley.', a: true, e: 'Verdadero: se hace como Dios (1.º), blasfema (3.º) y cambia el sábado (4.º); además mata a los santos (6.º). Fuente: Bohr, <i>Daniel 1-10</i>, p. 162.' },
    { t: 'mc', v: '7:2', f: 'c', q: 'Según la misma Biblia, ¿qué representan los vientos que agitan el mar en Daniel 7:2?', o: ['Guerras y luchas entre naciones', 'El Espíritu Santo obrando', 'Los ángeles de Dios', 'El paso del tiempo'], a: 0, e: 'Jeremías 25:32-33 usa la tempestad para la calamidad que pasa de nación en nación; los vientos simbolizan luchas. Fuente: Bohr, <i>Daniel 1-10</i>, p. 121; CS 493.' },
    { t: 'mc', v: '7:17', f: 'c', q: '¿Qué versículo del mismo capítulo explica que las bestias de Daniel 7 son reyes o reinos?', o: ['Daniel 7:17', 'Daniel 7:2', 'Daniel 7:9', 'Daniel 7:28'], a: 0, e: '«Estas cuatro grandes bestias son cuatro reyes que se levantarán en la tierra» (7:17), y 7:23 lo repite: la cuarta bestia será «un cuarto reino». Fuente: Bohr, <i>La gran cadena</i>, p. 4.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'Apocalipsis 12:6 y 14 muestran que «un tiempo, tiempos y la mitad de un tiempo» es lo mismo que 1.260 días.', a: true, e: 'Verdadero: el tiempo de la mujer en el desierto se da de las dos formas. Con la regla de día por año (Números 14:34; Ezequiel 4:6) son 1.260 años. Fuente: Bohr, <i>15 principios</i> 2:105.' },
    { t: 'mc', v: '7:13', f: 'c', q: '¿Qué representan las nubes con las que el Hijo del hombre llega al Anciano de días?', o: ['Una multitud de ángeles', 'Las oraciones de los santos', 'Las naciones de la tierra', 'El humo del incienso'], a: 0, e: 'Salmo 68:17 y Deuteronomio 33:2 muestran a Dios rodeado de miles de ángeles. En 7:13 esas nubes llevan a Cristo al Padre para comenzar el juicio, no a la tierra. Fuente: Bohr, <i>Daniel 1-10</i>, p. 280.' },
    { t: 'mc', v: '7:8', f: 'c', q: '¿Qué otro sentido tiene el prefijo griego «anti» de «anticristo»?', o: ['En lugar de', 'Antes de', 'Después de', 'Junto a'], a: 0, e: '«Anti» puede ser «contra», pero también «en lugar de», como en Herodes Antipas, que gobernó en lugar de su padre. Fuente: Bohr, <i>Daniel 1-10</i>, p. 201.' },
    { t: 'mc', v: '7:9', f: 'c', q: '¿Qué significa el verbo arameo de «fueron puestos unos tronos» en Daniel 7:9?', o: ['Colocar: los tronos se ponen para juzgar', 'Derribar: caen los tronos de los reyes', 'Quemar: los tronos arden en el fuego', 'Esconder: las nubes cubren los tronos'], a: 0, e: 'Es el mismo verbo de «echar» al horno y al foso, pero aquí significa colocar: los tronos se ponen porque antes no estaban, y empieza el juicio. Fuente: Smith, <i>Las profecías de Daniel</i>, p. 58-59; Bohr, <i>Daniel 1-10</i>, p. 277.' },
    { t: 'mc', v: '7:9', f: 'c', q: '¿Qué muestran las ruedas de fuego del trono del Anciano de días?', o: ['Que el trono se traslada al lugar del juicio', 'Que Dios destruye la tierra con fuego', 'Que el juicio dura muy poco tiempo', 'Que los ángeles adoran sin descanso'], a: 0, e: 'Como el trono de Ezequiel 1, es un trono que se mueve: el Padre pasa al lugar santísimo del santuario celestial para el juicio. Fuente: Bohr, <i>Daniel 1-10</i>, p. 277-278.' },
    { t: 'mc', v: '7:13', f: 'c', q: '¿Qué día del santuario de Israel anunciaba el juicio de Daniel 7?', o: ['El Día de la Expiación', 'La Pascua', 'La fiesta de los Tabernáculos', 'El día de Pentecostés'], a: 0, e: 'Una vez al año el sumo sacerdote entraba al lugar santísimo para purificar el santuario (Levítico 16). En 1844 Cristo entró al lugar santísimo del cielo para el juicio. Fuente: CS 471-472 y 477.' },
    { t: 'mc', v: '7:22', f: 'c', q: '¿De quiénes son los casos que se examinan en el juicio que empezó en 1844?', o: ['De los que profesaron ser hijos de Dios', 'Solo de los que nunca creyeron en Dios', 'Solo de los que vivían en 1844', 'De los ángeles que cayeron con Satanás'], a: 0, e: 'Como en el Día de la Expiación, se consideran los casos de quienes profesaron ser hijos de Dios; el juicio de los impíos es obra distinta y posterior (1 Pedro 4:17). Fuente: CS 534.' },
    { t: 'tf', v: '7:22', f: 'c', q: 'Daniel 7:22 muestra que el juicio se da a favor de los santos del Altísimo.', a: true, e: 'Verdadero: «se hizo justicia a los santos del Altísimo», y la sentencia a su favor es a la vez sentencia contra el cuerno pequeño (7:26). Fuente: Pfandl, <i>Daniel</i>, p. 47; Bohr, <i>Daniel 1-10</i>, p. 121.' },
    { t: 'mc', v: '7:10', f: 'c', q: '¿Qué anuncio de Apocalipsis dice que el juicio de Daniel 7 ya empezó?', o: ['«La hora de su juicio ha llegado»', '«Salid de ella, pueblo mío»', '«¡Vengo pronto!, y mi galardón conmigo»', '«Hecho está. Yo soy el Alfa y la Omega»'], a: 0, e: 'El primer ángel lo anuncia mientras todavía se predica el evangelio (Apocalipsis 14:6-7), antes de la segunda venida (14:14). Fuente: CS 476-477; Bohr, <i>Daniel 1-10</i>, p. 275.' },
    { t: 'tf', v: '7:7', f: 'c', q: 'Daniel 7 llama «dragón» a la cuarta bestia.', a: false, e: 'Falso: Daniel no le da nombre; solo dice que era muy diferente de todas. El dragón de Apocalipsis 12 es primero Satanás y en segundo lugar Roma pagana: el mismo poder que la cuarta bestia en su etapa imperial, con otra figura. Fuente: CS 491.' },
    { t: 'mc', v: '7:20', f: 'c', q: '¿Qué dice Daniel 7:20 del cuerno que al principio era pequeño?', o: ['Que parecía más grande que sus compañeros', 'Que se quebró en cuatro cuernos', 'Que cayó delante de los diez cuernos', 'Que creció hacia el oriente y el sur'], a: 0, e: 'Empezó pequeño (7:8) y llegó a ser mayor que los otros: el obispo de Roma creció poco a poco hasta estar sobre los reyes de Europa. Fuente: Smith, <i>Las profecías de Daniel</i>, p. 58; Vicuña, <i>Estudios del libro de Daniel</i>, p. 88-89.' },
  ],
};
