/* Apocalipsis 9 — La quinta y la sexta trompetas (primer y segundo ay).
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

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

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Otras iglesias leen estas
      visiones de otra manera; aquí va la lectura adventista.<br><br>
      · En la lectura clásica adventista, la <strong>quinta</strong> y la
      <strong>sexta</strong> trompetas se aplican a dos poderes de la historia:
      primero el poder sarraceno y después el Imperio otomano. Es una lectura
      de imperios del pasado, no un juicio sobre ningún pueblo ni sobre las
      personas de hoy.<br>
      · Los tiempos proféticos, como los <strong>cinco meses</strong> (9:5),
      se leen con el principio de <strong>un día por un año</strong> (Números
      14:34; Ezequiel 4:6).<br>
      · Los versículos 20 y 21 muestran el propósito de las trompetas: son
      <strong>advertencias</strong> que llaman al arrepentimiento, antes de
      las siete plagas finales (las copas del capítulo 16).`) },
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
    { t: 'mc', v: '9:5', f: 'c',
      q: 'En la lectura adventista, ¿con qué principio se leen tiempos proféticos como los «cinco meses»?',
      o: ['Un día profético equivale a un año', 'Un mes profético equivale a mil años', 'Cada número es un día literal', 'Los tiempos se cuentan en semanas'], a: 0,
      e: 'Interpretación: el principio de un día por un año (Números 14:34; Ezequiel 4:6). El texto solo dice «cinco meses» (9:5).' },
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
    { t: 'mc', v: '9:1-19', f: 'c',
      q: 'En la lectura adventista clásica, ¿a qué se aplican la quinta y la sexta trompetas?',
      o: ['Al poder sarraceno y al Imperio otomano', 'A las invasiones bárbaras contra Roma', 'A las guerras de Napoleón en Europa', 'A plagas de insectos del tiempo del fin'], a: 0,
      e: 'Interpretación: a dos poderes de la historia, primero el sarraceno y después el Imperio otomano. El texto habla de langostas (9:3) y de jinetes (9:16). Las invasiones contra Roma se aplican a las trompetas 1 a 4.' },
    { t: 'mc', v: '9:20-21', f: 'c',
      q: 'En la interpretación adventista, ¿qué muestran 9:20-21 sobre el propósito de las trompetas?',
      o: ['Que son advertencias que llaman al arrepentimiento', 'Que son las plagas finales, sin más tiempo de gracia', 'Que son castigos solo para la iglesia infiel', 'Que son señales de que el mundo ya terminó'], a: 0,
      e: 'Interpretación: las trompetas son advertencias antes de las siete plagas finales (capítulo 16). El texto dice que «ni aun así se arrepintieron» (9:20).' },
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
