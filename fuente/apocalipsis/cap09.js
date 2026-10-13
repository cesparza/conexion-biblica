/* Apocalipsis 9 — La quinta y la sexta trompetas (primer y segundo ay).
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');
/* Línea de fuente al pie de cada sección de interpretación. */
const fu = t => `<p class="fuente"><small>${t}</small></p>`;

module.exports = {
  cap: 'ap9', label: 'Apocalipsis 9', sub: 'La quinta y la sexta trompetas', vs: 21,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Suenan la <strong>quinta</strong> y la <strong>sexta</strong>
      trompetas, que son los dos primeros «ayes».<br><br>
      Con la quinta, una estrella abre <strong>el pozo del abismo</strong>:
      sale humo y del humo salen <strong>langostas</strong> que pican como
      escorpiones. Solo pueden atormentar, durante <strong>cinco
      meses</strong>, a los que <strong>no tienen el sello de Dios</strong>.<br><br>
      Con la sexta, se sueltan <strong>cuatro ángeles</strong> que estaban
      atados junto al río <strong>Éufrates</strong>, y aparece un ejército de
      <strong>doscientos millones</strong> de jinetes.<br><br>
      <em>La idea del capítulo: los que tienen el sello de Dios están
      protegidos; y aun después de tantas plagas, mucha gente no quiso
      arrepentirse.</em>`) },

    { t: '🗝️ Quinta trompeta: el pozo del abismo (9:1-3)', capa: 'nucleo', h:
      li([`Juan vio <strong>una estrella que cayó del cielo a la
           tierra</strong>, y <strong>«se le dio la llave del pozo del
           abismo»</strong> (9:1).`,
          `Al abrir el pozo <strong>«subió humo como humo de un gran
           horno»</strong> (9:2), y el sol y el aire se oscurecieron.`,
          `<strong>«Del humo salieron langostas sobre la tierra»</strong> (9:3),
           con un poder como el de <strong>los escorpiones</strong>.`]) +
      wa(`Dos estrellas que caen: la de la <strong>3ª trompeta</strong> se
      llama <strong>Ajenjo</strong> y cae en los ríos (8:10-11); la de la
      <strong>5ª</strong> recibe <strong>la llave del abismo</strong> (9:1) y
      el texto no le da nombre.`) },

    { t: '🦗 Lo que podían y no podían hacer (9:4-6)', capa: 'nucleo', h:
      tbl(['Las langostas…', 'Lo que dice el texto'], [
        ['NO podían dañar', 'La hierba, ninguna cosa verde ni ningún árbol (9:4)'],
        ['SÍ podían dañar', '«solamente a los hombres que no tuvieran el sello de Dios en sus frentes» (9:4)'],
        ['NO podían', 'Matarlos (9:5)'],
        ['SÍ podían', 'Atormentarlos <strong>cinco meses</strong>, como pica el escorpión (9:5)'],
      ]) +
      hi(`<strong>«En aquellos días los hombres buscarán la muerte, pero no la
      hallarán; ansiarán morir, pero la muerte huirá de ellos»</strong>
      (9:6).`) +
      wa(`Une 7:3 con 9:4: los sellados <strong>en sus frentes</strong> en el
      capítulo 7 son los que las langostas <strong>no</strong> pueden tocar.`) },

    { t: '🐴 Cómo eran las langostas (9:7-11)', capa: 'nucleo', h:
      tbl(['Parte', 'Cómo era'], [
        ['Aspecto', 'Como <strong>caballos preparados para la guerra</strong> (9:7)'],
        ['Cabeza', 'Como <strong>coronas de oro</strong> (9:7)'],
        ['Cara', 'Como <strong>caras humanas</strong> (9:7)'],
        ['Cabello', 'Como <strong>cabello de mujer</strong> (9:8)'],
        ['Dientes', 'Como de <strong>leones</strong> (9:8)'],
        ['Corazas', 'Como <strong>corazas de hierro</strong> (9:9)'],
        ['Ruido de las alas', 'Como muchos <strong>carros de caballos</strong> corriendo a la batalla (9:9)'],
        ['Colas', 'Como de <strong>escorpiones</strong>, con aguijones; poder para dañar <strong>cinco meses</strong> (9:10)'],
        ['Rey', 'El <strong>ángel del abismo</strong>: en hebreo <strong>Abadón</strong>, en griego <strong>Apolión</strong> (9:11)'],
      ]) +
      wa(`<strong>Abadón</strong> va con el <strong>hebreo</strong> y
      <strong>Apolión</strong> con el <strong>griego</strong> (9:11). No los
      cruces, y no los mezcles con <strong>Ajenjo</strong>, que es la estrella
      de 8:11.`) },

    { t: '⏳ El primer ay (9:12)', capa: 'nucleo', h:
      hi(`<strong>«El primer ay pasó; pero vienen aún dos ayes después de
      esto»</strong> (9:12).<br><br>
      La quinta trompeta es el <strong>primer ay</strong>; la sexta será el
      segundo.`) },

    { t: '🌊 Sexta trompeta: cuatro ángeles desatados (9:13-16)', capa: 'nucleo', h:
      li([`Juan oyó una voz <strong>«de entre los cuatro cuernos del altar de
           oro»</strong> (9:13).`,
          `La orden al sexto ángel: <strong>«¡Desata a los cuatro ángeles que
           están atados junto al gran río Éufrates!»</strong> (9:14).`,
          `Estaban preparados <strong>«para la hora, día, mes y año»</strong>
           (9:15), para matar <strong>la tercera parte de los hombres</strong>.`,
          `Los ejércitos de jinetes eran <strong>doscientos millones</strong>, y
           Juan dice: «Yo oí su número» (9:16).`]) +
      wa(`Cuatro ángeles en 7:1 y cuatro en 9:14, pero distintos: en el
      capítulo 7 están <strong>de pie en los ángulos de la tierra</strong>
      deteniendo los vientos; aquí están <strong>atados junto al
      Éufrates</strong> y son desatados.<br>
      Igual que con los 144.000 (7:4), Juan <strong>oyó</strong> el número.`) },

    { t: '🔥 Los caballos y sus jinetes (9:17-19)', capa: 'nucleo', h:
      li([`Los jinetes tenían <strong>corazas de fuego, zafiro y azufre</strong> (9:17).`,
          `Las cabezas de los caballos eran <strong>como cabezas de leones</strong> (9:17).`,
          `<strong>«de sus bocas salía fuego, humo y azufre»</strong> (9:17):
           por estas <strong>tres plagas</strong> murió la tercera parte de los
           hombres (9:18).`,
          `Su poder estaba <strong>en sus bocas y en sus colas</strong>; las colas
           eran <strong>semejantes a serpientes</strong> y tenían cabezas (9:19).`]) +
      tbl(['', 'Langostas (5ª)', 'Caballos (6ª)'], [
        ['Corazas', 'De hierro (9:9)', 'De fuego, zafiro y azufre (9:17)'],
        ['Leones', 'Dientes como de leones (9:8)', 'Cabezas como de leones (9:17)'],
        ['Colas', 'Como de escorpiones (9:10)', 'Semejantes a serpientes (9:19)'],
        ['Qué hacen', 'Atormentan 5 meses, no matan (9:5)', 'Matan un tercio de los hombres (9:18)'],
      ]) },

    { t: '💔 No se arrepintieron (9:20-21)', capa: 'nucleo', h:
      hi(`Los que no murieron <strong>«ni aun así se arrepintieron de las obras
      de sus manos»</strong> (9:20). Siguieron adorando a los demonios y a
      ídolos de <strong>oro, plata, bronce, piedra y madera</strong>, que
      <strong>«no pueden ver ni oír ni andar»</strong> (9:20).`) +
      tbl(['#', 'No se arrepintieron de… (9:21)'], [
        ['1', 'Sus homicidios'], ['2', 'Sus hechicerías'],
        ['3', 'Su fornicación'], ['4', 'Sus robos'],
      ]) },

    { t: '📋 Las seis primeras trompetas, de un vistazo (9:1-21)', capa: 'nucleo', h:
      tbl(['Trompeta', 'Qué cae o qué viene', 'Qué se afecta'], [
        ['1ª (8:7)', 'Granizo y fuego con sangre', 'Un tercio de los árboles; toda la hierba verde'],
        ['2ª (8:8-9)', 'Un gran monte ardiendo, al mar', 'Un tercio del mar, de sus seres y de las naves'],
        ['3ª (8:10-11)', 'La estrella Ajenjo', 'Un tercio de los ríos, y las fuentes; un tercio de las aguas'],
        ['4ª (8:12)', 'No cae nada', 'Herido un tercio del sol, la luna y las estrellas'],
        ['5ª (9:1-11)', 'Estrella con la llave del abismo; langostas', 'Sin tercio: atormentan 5 meses a los que no tienen el sello'],
        ['6ª (9:13-19)', 'Cuatro ángeles del Éufrates; 200 millones de jinetes', 'Muere un tercio de los hombres'],
      ]) +
      wa(`La 5ª es el <strong>primer ay</strong> y la 6ª el <strong>segundo
      ay</strong> (9:12). La 7ª se toca en el capítulo 11.`) },

    { t: '🧭 La quinta trompeta (9:1-12)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. La quinta trompeta, el
      <strong>primer ay</strong>, es la <strong>Revolución Francesa
      (1789-1798)</strong>: el juicio que cayó sobre el poder que había
      dominado 1.260 años (la cuarta trompeta).`) +
      li([`<strong>El abismo.</strong> Sobre las langostas reina el «ángel del
           abismo» (9:11): Satanás. En 11:7 «la bestia que sube del abismo» es
           Francia, y 11:7-10 describe el mismo momento (1793-1797).`,
          `<strong>La herida.</strong> En esos años el papado recibe la herida
           mortal de 13:3: en 1798 un ejército francés toma preso al papa.`,
          `<strong>Las aguas que se secan.</strong> El río que el dragón echaba
           contra la mujer (12:15) se seca: los gobiernos civiles dejan de
           prestar su espada para perseguir.`,
          `<strong>Cuándo termina.</strong> El primer ay pasa (9:12) en 1798.
           Ahí empieza el tiempo del fin y se abre el librito (capítulo 10).`]) +
      wa(`Los cinco meses son simbólicos. <strong>Otra lectura
      adventista</strong>, la clásica, aplica la 5ª y la 6ª a los turcos
      otomanos: 1299-1449 y hasta el 11 de agosto de 1840 (CS 383).`) +
      fu(`Fuente: Bohr, <i>15 principios</i> 1:239; Bohr, <i>15 principios</i> 2:89-91 y 105; Bohr, <i>La sexta trompeta</i>, p. 5; Bohr, <i>Tres ángeles</i> 1:5; Treiyer, <i>Fechas trompetas</i>, p. 3-4; CS 383.`) },

    { t: '🧭 La sexta trompeta: desde 1844 (9:13-14)', capa: 'contexto', h:
      hi(`La sexta trompeta va <strong>desde 1844 hasta el cierre del tiempo de
      gracia</strong>. Describe cómo se reúnen los impíos para la batalla final
      contra el pueblo de Dios.`) +
      li([`<strong>La voz del altar de oro (9:13).</strong> Habla quien ministra
           ante Dios en el altar del incienso: Jesucristo, el Mediador. Los
           cuernos de ese altar se untaban con sangre una vez al año, en el
           <strong>día de la expiación</strong> (Éxodo 30:10): la sexta
           trompeta suena en el tiempo del juicio.`,
          `<strong>Los cuatro ángeles atados (9:14)</strong> no son los ángeles
           buenos que retienen los vientos (7:1). Son ángeles malos que Dios
           tenía contenidos. El número cuatro indica todo el mundo.`,
          `<strong>El Éufrates.</strong> Solo aparece aquí y en la sexta plaga
           (16:12); por eso es un símbolo, igual en los dos lugares, y no un
           río del Medio Oriente.`,
          `<strong>¿Qué los retenía?</strong> Los gobiernos civiles que desde
           1798 no dejan que el papado recupere su antiguo poder. Cuando ese
           freno se quite, el poder de persecución volverá a correr.`]) +
      fu(`Fuente: Bohr, <i>La sexta trompeta</i>, p. 1 y 11-14.`) },

    { t: '🧭 Hora, día, mes y año; doscientos millones (9:15-16)', capa: 'contexto', h:
      li([`<strong>«La hora, día, mes y año» (9:15).</strong> La hora es «la
           hora de su juicio» (14:7); el día es el <strong>décimo</strong>, el
           mes es el <strong>séptimo</strong> (el día de la expiación,
           Levítico 23:27) y el año es <strong>1844</strong> (Daniel 8:14).`,
          `<strong>Una tercera parte (9:15).</strong> No es la destrucción
           final de los impíos: solo cae un tercio, y todavía hay tiempo de
           gracia.`,
          `<strong>«Yo oí su número» (9:16).</strong> Solo aquí y en 7:4 dice
           Juan que oyó un número. En 7:4 se cuenta a los 144.000 sellados; en
           9:16, a los doscientos millones del otro bando. Es un número
           simbólico: la gran multitud de los impíos frente a un remanente
           pequeño.`]) +
      wa(`El sexto sello tiene su paréntesis con los sellados (capítulo 7); la
      sexta trompeta, el suyo con el librito y la medición del templo
      (capítulos 10 y 11). Los dos sextos llevan a 1844 y al juicio.`) +
      fu(`Fuente: Bohr, <i>La sexta trompeta</i>, p. 14-15; Bohr, <i>Los 144.000 y los 24 ancianos</i>, p. 118; Bohr, <i>Las siete trompetas</i>, p. 15.`) },

    { t: '🧭 Fuego, humo, azufre y colas (9:17-21)', capa: 'contexto', h:
      li([`<strong>De sus bocas (9:17-18).</strong> El fuego, el humo y el
           azufre recuerdan el lago de fuego, y al Leviatán de Job 41, que
           echa fuego y humo por la boca. En 16:13 salen espíritus inmundos de
           la boca del dragón, de la bestia y del falso profeta: lo que sale de
           la boca son los engaños que reúnen al mundo.`,
          `<strong>Las colas (9:19).</strong> En la Biblia la cola es símbolo de
           la mentira: el profeta que enseña mentira es la cola (Isaías 9:15).`,
          `<strong>Los ídolos (9:20).</strong> La lista «de oro, plata, bronce,
           piedra y madera, las cuales no pueden ver ni oír» viene de Daniel
           5:23, la noche en que cayó Babilonia. Así se unen Daniel 5, la
           sexta trompeta y la sexta plaga.`,
          `<strong>No se arrepintieron (9:21).</strong> Homicidios, hechicerías,
           fornicación y robos son los mismos pecados que Apocalipsis 17 y 18
           señalan en Babilonia (17:2, 6; 18:23).`]) +
      fu(`Fuente: Bohr, <i>La sexta trompeta</i>, p. 15-17.`) },

    { t: '🧭 Dos reuniones: capítulo 9 y capítulo 10', capa: 'contexto', h:
      tbl(['Pasaje', 'Qué describe'], [
        ['9:13-21', 'Se reúnen los impíos, desde 1844 hasta el cierre de la gracia'],
        ['10:1-11:1', 'Se reúnen los justos con el mensaje del librito, en el mismo período'],
        ['12:17; 13:11-18', 'Los impíos contra el remanente, antes del cierre de la gracia'],
        ['14:6-12', 'Los justos, con los mensajes de los tres ángeles'],
        ['14:14-20', 'La cosecha: los dos grupos ya están reunidos'],
      ]) +
      hi(`La sexta trompeta muestra el lado de los enemigos; Apocalipsis 10, el
      del remanente fiel, en el mismo tiempo. Por eso, cuando termina el
      capítulo 9, no se dice que el segundo ay pasó: eso llega hasta 11:14.
      Dios tiene tres ángeles que reúnen a los suyos (capítulo 14) y Satanás,
      tres espíritus que reúnen a los impíos (16:13-14).`) +
      fu(`Fuente: Bohr, <i>La sexta trompeta</i>, p. 1-2 y 12; Bohr, <i>15 principios</i> 2:89-90.`) },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Estrella que cae (9:1)', 'Un ángel caído: Satanás', 'Isaías 14:12-14; Lucas 10:18; Apocalipsis 12:9'],
        ['Ángel del abismo (9:11)', 'Satanás. Abadón quiere decir «destructor»', 'Apocalipsis 20:1-3'],
        ['Langostas (9:3)', 'Un ejército que invade', 'Joel 1:4-6; 2:4-11'],
        ['Cuatro (9:14)', 'Todo el mundo', 'Apocalipsis 7:1: «los cuatro ángulos de la tierra»; Ezequiel 7:2'],
        ['Río Éufrates (9:14)', 'Los pueblos que sostienen a Babilonia', 'Isaías 8:7; Apocalipsis 17:15'],
        ['La hora (9:15)', 'La hora del juicio', 'Apocalipsis 14:7: «la hora de su juicio ha llegado»'],
        ['Lo que sale de la boca (9:17)', 'Los engaños que reúnen al mundo', 'Apocalipsis 16:13-14: «espíritus de demonios, que hacen señales»'],
        ['Cola (9:19)', 'La mentira', 'Isaías 9:15'],
      ]) +
      fu(`Fuente: Bohr, <i>La sexta trompeta</i>, p. 3, 12-16; Bohr, <i>15 principios</i> 2:104-105; Bohr, <i>Tres ángeles</i> 1:5.`) },
  ],

  preguntas: [
    { t: 'mc', v: '9:1', lit: 'se le dio la llave del pozo del abismo',
      q: 'Con la quinta trompeta cayó una estrella del cielo. ¿Qué se le dio? (Apocalipsis 9:1)',
      o: ['La llave del pozo del abismo', 'Un incensario lleno de fuego', 'El sello del Dios vivo', 'Una trompeta de oro'], a: 0,
      e: '«…vi una estrella que cayó del cielo a la tierra. Y se le dio la llave del pozo del abismo» (9:1).' },
    { t: 'tf', v: '9:1',
      q: 'La estrella que cayó con la quinta trompeta se llamaba Ajenjo. (Apocalipsis 9:1)', a: false,
      e: 'Falso: 9:1 no le da nombre; Ajenjo es la estrella de la TERCERA trompeta (8:11).' },
    { t: 'mc', v: '9:2', lit: 'subió humo como humo de un gran horno',
      q: '¿Qué subió del pozo del abismo cuando se abrió? (Apocalipsis 9:2)',
      o: ['Humo como de un gran horno', 'Fuego mezclado con sangre', 'Una bestia con siete cabezas', 'Agua amarga como ajenjo'], a: 0,
      e: '«…del pozo subió humo como humo de un gran horno» (9:2).' },
    { t: 'tf', v: '9:2',
      q: 'El humo del pozo oscureció el sol y el aire. (Apocalipsis 9:2)', a: true,
      e: 'Verdadero: «el sol y el aire se oscurecieron por el humo del pozo» (9:2).' },
    { t: 'mc', v: '9:3', lit: 'Del humo salieron langostas',
      q: '¿Qué salió del humo del pozo del abismo? (Apocalipsis 9:3)',
      o: ['Langostas', 'Ranas', 'Caballos', 'Serpientes'], a: 0,
      e: '«Del humo salieron langostas sobre la tierra» (9:3). Las ranas son de 16:13.' },
    { t: 'mc', v: '9:3', lit: 'como el poder que tienen los escorpiones de la tierra',
      q: '¿Qué poder se les dio a las langostas? (Apocalipsis 9:3)',
      o: ['Como el de los escorpiones de la tierra', 'Como el de los leones del desierto', 'Como el de las serpientes del mar', 'Como el de los caballos de guerra'], a: 0,
      e: '«…se les dio poder, como el poder que tienen los escorpiones de la tierra» (9:3).' },
    { t: 'mc', v: '9:4', lit: 'solamente a los hombres que no tuvieran el sello de Dios',
      q: '¿A quiénes podían dañar las langostas? (Apocalipsis 9:4)',
      o: ['A los hombres que no tuvieran el sello de Dios', 'A la hierba y a todo árbol verde', 'A los ríos y a las fuentes de agua', 'A todos los hombres, sin excepción'], a: 0,
      e: '«…sino solamente a los hombres que no tuvieran el sello de Dios en sus frentes» (9:4).' },
    { t: 'tf', v: '9:4',
      q: 'A las langostas se les mandó dañar la hierba de la tierra y los árboles. (Apocalipsis 9:4)', a: false,
      e: 'Falso: se les mandó que NO dañaran la hierba, ni cosa verde, ni ningún árbol (9:4).' },
    { t: 'mc', v: '9:4', lit: 'el sello de Dios en sus frentes',
      q: '¿Qué texto dice que las langostas solo dañarían a los hombres que no tuvieran «el sello de Dios en sus frentes»?',
      o: ['Apocalipsis 9:4', 'Apocalipsis 7:3', 'Apocalipsis 9:10', 'Apocalipsis 8:7'], a: 0,
      e: 'Apocalipsis 9:4. En 7:3 es donde se sella a los siervos de Dios en sus frentes.' },
    { t: 'mc', v: '9:5', lit: 'los atormentaran cinco meses',
      q: '¿Cuánto tiempo podían atormentar las langostas a los hombres? (Apocalipsis 9:5)',
      o: ['Cinco meses', 'Tres meses y medio', 'Siete meses', 'Doce meses'], a: 0,
      e: '«…sino que los atormentaran cinco meses» (9:5). Se repite en 9:10.' },
    { t: 'tf', v: '9:5',
      q: 'A las langostas se les permitió matar a los hombres. (Apocalipsis 9:5)', a: false,
      e: 'Falso: «no se les permitió que los mataran, sino que los atormentaran» (9:5).' },
    { t: 'fill', v: '9:6', ins: 'Apocalipsis 9:6 (RV1995) — Completa:',
      p: [{ x: 'En aquellos días los hombres buscarán la ' }, { b: 'muerte', h: '¿qué buscarán?' }, { x: ', pero no la ' }, { b: 'hallarán', h: '¿qué pasará?' }, { x: ';' }] },
    { t: 'mc', v: '9:6', lit: 'la muerte huirá de ellos',
      q: '¿Qué texto dice «ansiarán morir, pero la muerte huirá de ellos»?',
      o: ['Apocalipsis 9:6', 'Apocalipsis 9:5', 'Apocalipsis 6:16', 'Apocalipsis 9:15'], a: 0,
      e: 'Apocalipsis 9:6, en la quinta trompeta.' },
    { t: 'mc', v: '9:7', lit: 'semejante a caballos preparados para la guerra',
      q: '¿A qué se parecían las langostas? (Apocalipsis 9:7)',
      o: ['A caballos preparados para la guerra', 'A leones rugiendo en el desierto', 'A serpientes con cabezas de león', 'A águilas volando por el cielo'], a: 0,
      e: '«El aspecto de las langostas era semejante a caballos preparados para la guerra» (9:7).' },
    { t: 'mc', v: '9:7', lit: 'como coronas de oro',
      q: '¿Qué tenían las langostas en la cabeza? (Apocalipsis 9:7)',
      o: ['Como coronas de oro', 'Como cuernos de carnero', 'Como cascos de hierro', 'Como diademas de plata'], a: 0,
      e: '«…en las cabezas tenían como coronas de oro» (9:7).' },
    { t: 'tf', v: '9:7',
      q: 'Las caras de las langostas eran como caras humanas. (Apocalipsis 9:7)', a: true,
      e: 'Verdadero: «sus caras eran como caras humanas» (9:7).' },
    { t: 'mc', v: '9:8', lit: 'sus dientes eran como de leones',
      q: '¿Cómo eran los dientes de las langostas? (Apocalipsis 9:8)',
      o: ['Como de leones', 'Como de osos', 'Como de lobos', 'Como de hierro'], a: 0,
      e: '«…sus dientes eran como de leones» (9:8). Los dientes de hierro son de la cuarta bestia de Daniel 7:7.' },
    { t: 'tf', v: '9:8',
      q: 'Las langostas tenían cabello como cabello de mujer. (Apocalipsis 9:8)', a: true,
      e: 'Verdadero (Apocalipsis 9:8).' },
    { t: 'mc', v: '9:9', lit: 'carros de caballos corriendo a la batalla',
      q: '¿Cómo era el ruido de las alas de las langostas? (Apocalipsis 9:9)',
      o: ['Como de carros de caballos corriendo a la batalla', 'Como el estruendo de muchas aguas que corren', 'Como el sonido de una gran trompeta', 'Como un viento recio que soplaba fuerte'], a: 0,
      e: '«…el ruido de sus alas era como el estruendo de muchos carros de caballos corriendo a la batalla» (9:9).' },
    { t: 'mc', v: '9:10', lit: 'tenían colas como de escorpiones',
      q: '¿Dónde tenían las langostas el poder para dañar? (Apocalipsis 9:10)',
      o: ['En sus colas, como de escorpiones', 'En sus bocas, que echaban fuego', 'En sus dientes, como de leones', 'En sus alas, que hacían ruido'], a: 0,
      e: '«…tenían colas como de escorpiones, y también aguijones, y en sus colas tenían poder para dañar» (9:10).' },
    { t: 'mc', v: '9:11', lit: 'como rey al ángel del abismo',
      q: '¿Quién era el rey de las langostas? (Apocalipsis 9:11)',
      o: ['El ángel del abismo', 'La estrella llamada Ajenjo', 'El sexto ángel de la trompeta', 'El gran dragón escarlata'], a: 0,
      e: '«Sobre ellos tienen como rey al ángel del abismo» (9:11).' },
    { t: 'mc', v: '9:11', lit: 'cuyo nombre en hebreo es Abadón, y en griego, Apolión',
      q: '¿Cómo se llama el ángel del abismo en hebreo y en griego? (Apocalipsis 9:11)',
      o: ['Abadón en hebreo y Apolión en griego', 'Apolión en hebreo y Abadón en griego', 'Ajenjo en hebreo y Abadón en griego', 'Abadón en hebreo y Ajenjo en griego'], a: 0,
      e: '«…cuyo nombre en hebreo es Abadón, y en griego, Apolión» (9:11).' },
    { t: 'fill', v: '9:12', ins: 'Apocalipsis 9:12 (RV1995) — Completa:',
      p: [{ x: 'El primer ' }, { b: 'ay', h: '¿qué pasó?' }, { x: ' pasó; pero vienen aún ' }, { b: 'dos', h: '¿cuántos más?' }, { x: ' ayes después de esto.' }] },
    { t: 'tf', v: '9:12',
      q: 'Después de pasar el primer ay, todavía vienen dos ayes. (Apocalipsis 9:12)', a: true,
      e: 'Verdadero: «El primer ay pasó; pero vienen aún dos ayes después de esto» (9:12).' },
    { t: 'mc', v: '9:13', lit: 'de entre los cuatro cuernos del altar de oro',
      q: 'Con la sexta trompeta, ¿de dónde salió la voz que oyó Juan? (Apocalipsis 9:13)',
      o: ['De entre los cuatro cuernos del altar de oro', 'Del pozo del abismo lleno de humo', 'De un ángel que volaba en medio del cielo', 'De en medio de los cuatro seres vivientes'], a: 0,
      e: '«…oí una voz de entre los cuatro cuernos del altar de oro que estaba delante de Dios» (9:13).' },
    { t: 'mc', v: '9:14', lit: 'junto al gran río Éufrates',
      q: '¿Dónde estaban atados los cuatro ángeles? (Apocalipsis 9:14)',
      o: ['Junto al gran río Éufrates', 'En los cuatro ángulos de la tierra', 'En el fondo del pozo del abismo', 'Junto al mar de vidrio'], a: 0,
      e: '«¡Desata a los cuatro ángeles que están atados junto al gran río Éufrates!» (9:14). Los de los cuatro ángulos de la tierra son los de 7:1.' },
    { t: 'fill', v: '9:14', ins: 'Apocalipsis 9:14 (RV1995) — Completa:',
      p: [{ x: '«¡Desata a los ' }, { b: 'cuatro', h: '¿cuántos?' }, { x: ' ángeles que están atados junto al gran río ' }, { b: 'Éufrates', h: '¿qué río?' }, { x: '!»' }] },
    { t: 'mc', v: '9:15', lit: 'preparados para la hora, día, mes y año',
      q: '¿Para qué tiempo estaban preparados los cuatro ángeles? (Apocalipsis 9:15)',
      o: ['Para la hora, día, mes y año', 'Para cinco meses de tormento', 'Para tres tiempos y medio tiempo', 'Para mil doscientos sesenta días'], a: 0,
      e: '«…estaban preparados para la hora, día, mes y año» (9:15). Los cinco meses son de las langostas (9:5).' },
    { t: 'mc', v: '9:15', lit: 'matar la tercera parte de los hombres',
      q: '¿Qué parte de los hombres iban a matar los cuatro ángeles desatados? (Apocalipsis 9:15)',
      o: ['La tercera parte', 'La cuarta parte', 'La mitad', 'La décima parte'], a: 0,
      e: '«…a fin de matar la tercera parte de los hombres» (9:15). La cuarta parte es del cuarto sello (6:8).' },
    { t: 'mc', v: '9:16', lit: 'doscientos millones',
      q: '¿Cuál era el número de los ejércitos de los jinetes? (Apocalipsis 9:16)',
      o: ['Doscientos millones', 'Ciento cuarenta y cuatro mil', 'Doce mil por cada tribu', 'Diez mil veces diez mil'], a: 0,
      e: '«…el número de los ejércitos de los jinetes era de doscientos millones» (9:16).' },
    { t: 'tf', v: '9:16',
      q: 'Juan dice que oyó el número de los jinetes. (Apocalipsis 9:16)', a: true,
      e: 'Verdadero: «Yo oí su número» (9:16). Igual que con los 144.000 (7:4).' },
    { t: 'fill', v: '9:16', ins: 'Apocalipsis 9:16 (RV1995) — Completa:',
      p: [{ x: 'Y el número de los ejércitos de los ' }, { b: 'jinetes', h: '¿de quiénes?' }, { x: ' era de ' }, { b: 'doscientos millones', h: '¿cuántos?' }, { x: '. Yo oí su número.' }] },
    { t: 'mc', v: '9:17', lit: 'como cabezas de leones',
      q: '¿Cómo eran las cabezas de los caballos? (Apocalipsis 9:17)',
      o: ['Como cabezas de leones', 'Como cabezas de águilas', 'Como cabezas de serpientes', 'Como cabezas humanas'], a: 0,
      e: '«Las cabezas de los caballos eran como cabezas de leones» (9:17). Las colas eran las semejantes a serpientes (9:19).' },
    { t: 'mc', v: '9:17', lit: 'de sus bocas salía fuego, humo y azufre',
      q: '¿Qué salía de la boca de los caballos? (Apocalipsis 9:17)',
      o: ['Fuego, humo y azufre', 'Granizo, fuego y sangre', 'Truenos, voces y relámpagos', 'Agua, sangre y ajenjo'], a: 0,
      e: '«…de sus bocas salía fuego, humo y azufre» (9:17).' },
    { t: 'tf', v: '9:17',
      q: 'Los jinetes de la sexta trompeta tenían corazas de hierro. (Apocalipsis 9:17)', a: false,
      e: 'Falso: tenían corazas de FUEGO, ZAFIRO Y AZUFRE (9:17). Las corazas de hierro eran de las langostas (9:9).' },
    { t: 'mc', v: '9:18', lit: 'Por estas tres plagas',
      q: 'Según Apocalipsis 9:18, ¿por cuántas plagas fue muerta la tercera parte de los hombres?',
      o: ['Tres', 'Dos', 'Siete', 'Cuatro'], a: 0,
      e: '«Por estas tres plagas…: por el fuego, el humo y el azufre que salía de sus bocas» (9:18).' },
    { t: 'mc', v: '9:19', lit: 'el poder de los caballos estaba en sus bocas y en sus colas',
      q: '¿Dónde estaba el poder de los caballos? (Apocalipsis 9:19)',
      o: ['En sus bocas y en sus colas', 'En sus cascos y en sus alas', 'En sus cuernos y en sus ojos', 'En sus dientes y en sus crines'], a: 0,
      e: '«…el poder de los caballos estaba en sus bocas y en sus colas» (9:19).' },
    { t: 'tf', v: '9:19',
      q: 'Las colas de los caballos de la sexta trompeta eran semejantes a escorpiones. (Apocalipsis 9:19)', a: false,
      e: 'Falso: eran semejantes a SERPIENTES y tenían cabezas (9:19). Las colas como de escorpiones eran de las langostas (9:10).' },
    { t: 'mc', v: '9:20', lit: 'ni aun así se arrepintieron de las obras de sus manos',
      q: '¿Qué hicieron los hombres que no murieron con estas plagas? (Apocalipsis 9:20)',
      o: ['No se arrepintieron de las obras de sus manos', 'Se arrepintieron y dieron gloria a Dios', 'Huyeron a los montes y a las cuevas', 'Pidieron a los montes que cayeran sobre ellos'], a: 0,
      e: '«Los demás hombres… ni aun así se arrepintieron de las obras de sus manos» (9:20).' },
    { t: 'fill', v: '9:20', ins: 'Apocalipsis 9:20 (RV1995) — Completa:',
      p: [{ x: 'las imágenes de oro, ' }, { b: 'plata', h: '¿de qué más?' }, { x: ', bronce, piedra y madera, las cuales no pueden ver ni oír ni ' }, { b: 'andar', h: '¿qué más no pueden?' }, { x: '.' }] },
    { t: 'mc', v: '9:21', lit: 'ni de sus hechicerías, ni de su fornicación, ni de sus robos',
      q: '¿De qué cuatro cosas no se arrepintieron, según Apocalipsis 9:21?',
      o: ['Homicidios, hechicerías, fornicación y robos', 'Mentiras, envidias, borracheras y robos', 'Homicidios, idolatría, avaricia y orgullo', 'Hechicerías, blasfemias, mentiras y odio'], a: 0,
      e: '«No se arrepintieron de sus homicidios, ni de sus hechicerías, ni de su fornicación, ni de sus robos» (9:21).' },
    { t: 'mc', v: '9:21', lit: 'No se arrepintieron de sus homicidios',
      q: '¿Qué texto dice «No se arrepintieron de sus homicidios, ni de sus hechicerías»?',
      o: ['Apocalipsis 9:21', 'Apocalipsis 9:20', 'Apocalipsis 16:11', 'Apocalipsis 9:18'], a: 0,
      e: 'Apocalipsis 9:21, el último versículo del capítulo.' },
    { t: 'mc', v: '9:1-11', f: 'c',
      q: '¿Qué representa la quinta trompeta, el primer ay?',
      o: ['La Revolución Francesa (1789-1798)', 'El poder sarraceno del siglo VII', 'La caída de Roma imperial (476)', 'El Imperio otomano (1299-1449)'], a: 0,
      e: '9:1-11 es la Revolución Francesa, el primer ay; 11:7-10 describe el mismo momento. Sarracenos y otomanos son de la lectura clásica. Fuente: Bohr, <i>15 principios</i> 2:89.' },
    { t: 'tf', v: '9:5', f: 'c',
      q: 'Los cinco meses de la quinta trompeta son los 150 años del 1299 al 1449.', a: false,
      e: 'Falso: esas fechas son de la lectura clásica. La quinta trompeta se ubica en la Revolución Francesa (1789-1798). Fuente: Bohr, <i>Las siete trompetas</i>, p. 19; Treiyer, <i>Fechas trompetas</i>, p. 3-4.' },
    { t: 'mc', v: '9:11', f: 'c',
      q: '¿Quién es el rey del abismo que gobierna a las langostas?',
      o: ['Satanás', 'Napoleón Bonaparte', 'Osmán, el fundador otomano', 'El último emperador romano'], a: 0,
      e: 'Satanás es el rey del abismo (9:11). Fuente: Bohr, <i>Tres ángeles</i> 1:5.' },
    { t: 'mc', v: '9:12', f: 'c',
      q: '¿En qué año pasa el primer ay?',
      o: ['En 1798', 'En 1844', 'En 1449', 'En 1840'], a: 0,
      e: 'El primer ay (la Revolución Francesa) termina en 1798; ese año empieza el tiempo del fin y el mensaje del primer ángel. Fuente: Bohr, <i>15 principios</i> 2:91.' },
    { t: 'mc', v: '9:13-21', f: 'c',
      q: '¿Qué período abarca la sexta trompeta?',
      o: ['De 1844 al cierre del tiempo de gracia', 'De 1449 al 11 de agosto de 1840', 'De 1789 a 1798, con la Revolución', 'De 538 a 1798, con el papado'], a: 0,
      e: 'La sexta trompeta describe la reunión de los impíos que empezó en 1844 y se intensifica hasta el cierre de la gracia. Las fechas 1449-1840 son de la lectura clásica. Fuente: Bohr, <i>La sexta trompeta</i>, p. 1.' },
    { t: 'mc', v: '9:13', f: 'c',
      q: '¿Quién habla desde los cuatro cuernos del altar de oro?',
      o: ['Jesucristo, el Mediador', 'Dios el Padre, desde el trono', 'El ángel que tenía la llave', 'Uno de los cuatro seres vivientes'], a: 0,
      e: 'No es el Padre, porque el altar está «delante de Dios». Habla quien ministra en el altar del incienso: Jesucristo, el Mediador (1 Timoteo 2:5). Fuente: Bohr, <i>La sexta trompeta</i>, p. 11.' },
    { t: 'mc', v: '9:13', f: 'c',
      q: '¿Qué fiesta recuerdan los cuernos del altar del incienso en la sexta trompeta?',
      o: ['El día de la expiación', 'La fiesta de la Pascua', 'La fiesta de Pentecostés', 'La fiesta de los tabernáculos'], a: 0,
      e: 'La sangre se ponía en los cuernos del altar del incienso una vez al año, en el día de la expiación (Éxodo 30:10): la sexta trompeta suena en el tiempo del juicio, desde 1844. Fuente: Bohr, <i>La sexta trompeta</i>, p. 12.' },
    { t: 'mc', v: '9:14', f: 'c',
      q: '¿Quiénes son los cuatro ángeles atados junto al gran río Éufrates?',
      o: ['Ángeles malos que Dios tenía contenidos', 'Los ángeles que retienen los cuatro vientos', 'Cuatro ejércitos literales del Medio Oriente', 'Cuatro arcángeles que protegen a los santos'], a: 0,
      e: 'No son los ángeles buenos de 7:1, que retienen los vientos, sino ángeles malos que esperaban ser soltados; el número cuatro indica todo el mundo. Fuente: Bohr, <i>La sexta trompeta</i>, p. 12.' },
    { t: 'tf', v: '9:14', f: 'c',
      q: 'El Éufrates de 9:14 es simbólico, igual que el de la sexta plaga (16:12).', a: true,
      e: 'Verdadero: «el gran río Éufrates» solo aparece en 9:14 y 16:12; ¿con qué principio se leería uno literal y el otro simbólico? Fuente: Bohr, <i>La sexta trompeta</i>, p. 12-13.' },
    { t: 'mc', v: '9:15', f: 'c',
      q: '¿Qué señala «la hora, día, mes y año» de 9:15?',
      o: ['El juicio: día 10 del mes 7 de 1844', '391 años y 15 días hasta 1840', 'Una fecha literal que aún es futura', 'Los 150 años de la quinta trompeta'], a: 0,
      e: 'La hora es «la hora de su juicio» (14:7); el día, el décimo; el mes, el séptimo (Levítico 23:27); y el año, 1844 (Daniel 8:14). Los 391 años son de la lectura clásica. Fuente: Bohr, <i>La sexta trompeta</i>, p. 14.' },
    { t: 'mc', v: '9:16', f: 'c',
      q: '¿Con qué grupo contrastan los doscientos millones de jinetes?',
      o: ['Con los 144.000 sellados (7:4)', 'Con los veinticuatro ancianos', 'Con los siete mil muertos (11:13)', 'Con los reyes del oriente (16:12)'], a: 0,
      e: '«Yo oí su número» solo aparece en 7:4 y 9:16: son el remanente fiel y la gran multitud de los impíos. Fuente: Bohr, <i>La sexta trompeta</i>, p. 15; Bohr, <i>Los 144.000 y los 24 ancianos</i>, p. 118.' },
    { t: 'mc', v: '9:17-18', f: 'c',
      q: '¿Con qué pasaje se une el fuego, el humo y el azufre que salen de la boca de los caballos?',
      o: ['Los espíritus que salen de la boca del dragón (16:13)', 'El fuego que bajó del cielo en Pentecostés', 'El fuego del altar arrojado a la tierra (8:5)', 'El humo del pozo de donde salen las langostas'], a: 0,
      e: 'Lo que sale de la boca es lo que destruye: en 16:13 salen espíritus inmundos de la boca del dragón, de la bestia y del falso profeta. Fuente: Bohr, <i>La sexta trompeta</i>, p. 16.' },
    { t: 'mc', v: '9:19', f: 'c',
      q: '¿De qué es símbolo la cola en la Biblia?',
      o: ['De la mentira', 'De la fuerza militar', 'De la riqueza', 'Del paso del tiempo'], a: 0,
      e: 'La cola es símbolo de la mentira (Isaías 9:15; Juan 8:44; Apocalipsis 12:3-4). Fuente: Bohr, <i>La sexta trompeta</i>, p. 16.' },
    { t: 'mc', v: '9:20', f: 'c',
      q: '¿De qué pasaje viene la lista de imágenes «de oro, plata, bronce, piedra y madera»?',
      o: ['Daniel 5, la caída de Babilonia', 'Éxodo 32, el becerro de oro', 'Daniel 3, la estatua de oro', 'Jueces 17, los ídolos de Micaía'], a: 0,
      e: 'La frase viene casi literal de Daniel 5:23, la noche en que cayó Babilonia; así se unen Daniel 5, la sexta trompeta y la sexta plaga. Fuente: Bohr, <i>La sexta trompeta</i>, p. 16.' },
    { t: 'mc', v: '9:21', f: 'c',
      q: 'Si la sexta trompeta describe la reunión de los impíos, ¿qué describe el capítulo 10?',
      o: ['La reunión de los justos', 'La caída del Imperio otomano', 'La Revolución Francesa', 'Las siete últimas plagas'], a: 0,
      e: 'Terminada la reunión de los impíos (9:21), el capítulo 10 vuelve atrás en el tiempo para mostrar la reunión de los justos por el mensaje del librito. Fuente: Bohr, <i>La sexta trompeta</i>, p. 1.' },
    { t: 'mc', v: '9:3', f: 'c',
      q: '¿Qué libro del Antiguo Testamento describe una plaga de langostas como un ejército que invade?',
      o: ['Joel', 'Amós', 'Nahúm', 'Habacuc'], a: 0,
      e: 'Joel compara las langostas con un pueblo fuerte que sube contra la tierra, con aspecto de caballos y dientes de león (Joel 1:4-6; 2:4-11), como las de 9:7-8. Fuente: apuntes «Abismo».' },
    { t: 'mc', v: '9:14', f: 'c',
      q: '¿Qué indica en la Biblia el número cuatro, como en los cuatro ángeles de 9:14?',
      o: ['Que abarca todo el mundo', 'Que son cuatro naciones', 'Que dura cuatro siglos', 'Que viene de Dios'], a: 0,
      e: 'El cuatro indica universalidad: los cuatro ángulos de la tierra (Apocalipsis 7:1; Ezequiel 7:2). Satanás y sus ángeles obran en todo el mundo. Fuente: Bohr, <i>La sexta trompeta</i>, p. 12; Bohr, <i>15 principios</i> 2:104.' },
    { t: 'mc', v: '9:5', f: 'c',
      q: '¿Por qué los cinco meses de 9:5 se leen como tiempo simbólico?',
      o: ['Porque el pasaje está lleno de símbolos', 'Porque una langosta vive cinco meses', 'Porque Daniel los explica en 12:7', 'Porque ocurren después de la gracia'], a: 0,
      e: 'Los cinco meses están entre símbolos: humo, langostas, escorpiones, una estrella, una llave y el abismo; por eso el tiempo también es simbólico. Fuente: Bohr, <i>15 principios</i> 1:239.' },
    { t: 'tf', v: '9:11', f: 'c',
      q: 'Abadón, el nombre del ángel del abismo, quiere decir «destructor».', a: true,
      e: 'Verdadero: Abadón significa «destructor»; ese rey del abismo es Satanás. Fuente: Bohr, <i>15 principios</i> 2:104; Bohr, <i>Tres ángeles</i> 1:5.' },
  ],

  tarjetas: [
    { f: 'Qué se le dio a la estrella de la 5ª trompeta (9:1)', r: 'La llave del pozo del abismo' },
    { f: 'Qué salió del pozo del abismo (9:2-3)', r: 'Humo como de un gran horno, y del humo, langostas con poder de escorpiones' },
    { f: 'A quiénes podían dañar las langostas (9:4)', r: 'Solo a los hombres que no tuvieran el sello de Dios en sus frentes' },
    { f: 'Cuánto tiempo atormentaban (9:5, 9:10)', r: 'Cinco meses; no podían matar' },
    { f: '«buscarán la muerte, pero no la hallarán»', r: 'Apocalipsis 9:6' },
    { f: 'Cómo eran las langostas (9:7-10)', r: 'Caballos de guerra, coronas de oro, caras humanas, cabello de mujer, dientes de león, corazas de hierro, colas de escorpión' },
    { f: 'Rey de las langostas (9:11)', r: 'El ángel del abismo: Abadón en hebreo, Apolión en griego' },
    { f: 'De dónde salió la voz de la 6ª trompeta (9:13)', r: 'De entre los cuatro cuernos del altar de oro' },
    { f: 'Dónde estaban atados los cuatro ángeles (9:14)', r: 'Junto al gran río Éufrates' },
    { f: 'Para qué estaban preparados (9:15)', r: 'Para la hora, día, mes y año, a fin de matar la tercera parte de los hombres' },
    { f: 'Número de los jinetes (9:16)', r: 'Doscientos millones («Yo oí su número»)' },
    { f: 'Las tres plagas de la boca de los caballos (9:17-18)', r: 'Fuego, humo y azufre' },
    { f: 'De qué no se arrepintieron (9:21)', r: 'Homicidios, hechicerías, fornicación y robos' },
  ],
};
