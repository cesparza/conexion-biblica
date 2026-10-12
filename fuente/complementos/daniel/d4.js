/* Daniel 4: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF) y «15 principios de interpretación profética»
   vol. 1. Las citas de Elena de White van como Bohr las cita (páginas de la
   edición en inglés). Lo que ya está en contenido.js (la carta del rey, la
   tablilla B.M. 34.113, el respeto a los gobiernos, los tres profetas) no se
   repite aquí. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd4',
  secciones: [
    {
      t: '🧭 Un Dios que no se rinde con el rey',
      capa: 'contexto',
      h: `<p>Bohr lee Daniel 1 a 4 como la historia de la paciencia de Dios con un solo hombre. Capítulo tras capítulo Dios le mostró a Nabucodonosor que la religión de Babilonia estaba en bancarrota, y aun así el rey tardó en entregarse:</p>` +
        tbl(['Capítulo', 'Lo que vio el rey', 'Dónde quedó su corazón'], [
          ['1', 'Cuatro jóvenes diez veces mejores que sus sabios', 'Seguro de que él controlaba todo'],
          ['2', 'Solo el Dios de Daniel reveló el sueño', 'Lo llamó «Dios de dioses»: el mayor, pero no el único'],
          ['3', 'Cristo libró a los tres del horno', 'Su decreto solo prohíbe hablar mal de «el Dios de Sadrac»; sigue siendo idólatra y cruel'],
          ['4', 'Su propia humillación', 'Por fin, convertido'],
        ]) +
        `<p>Y todavía en 4:7 vuelve a llamar a los mismos magos. Bohr nota que el rey, como los caldeos de 2:11, pensaba en un dios lejano al que no le importan los hombres. Poco a poco aprendió que el Dios de los hebreos quería <strong>salvarlo a él</strong>.</p>` +
        hi(`Para Bohr, el milagro más grande del libro no es el horno ni los leones: es que un tirano soberbio se volviera un hijo humilde de Dios.`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 85-86 y 88.</p>`,
    },
    {
      t: '🧭 Una profecía condicional y doce meses de gracia',
      capa: 'contexto',
      h: `<p>El juicio del sueño no era inevitable. Daniel le dio un consejo (4:27): redimir sus pecados con justicia y con misericordia hacia los oprimidos, «pues tal vez será eso una prolongación de tu tranquilidad». Según Bohr, eso hace de esta una <strong>profecía condicional</strong>: si el rey cambiaba, el castigo se podía evitar.</p>` +
        li([
          'Dios le dio <strong>doce meses</strong> para arrepentirse (4:29).',
          'Elena de White describe lo que pasó: a medida que el sueño se borraba de su mente, el rey perdió la confianza en la interpretación y se burló de sus temores (Profetas y reyes, pág. 519, citada por Bohr).',
          'Bohr: las cosas iban tan bien que se olvidó de Dios. «Tranquilo en mi casa, floreciente en mi palacio» (4:4) es justo el momento de mayor peligro.',
        ]) +
        wa(`¿Por qué caen las naciones? Bohr responde con el mismo consejo de Daniel (4:27): por la injusticia y la falta de misericordia (ver también Proverbios 14:34).`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 84, 86 y 89.</p>`,
    },
    {
      t: '🧭 ¿Cuándo pasó? Los siete tiempos al final de su reinado',
      capa: 'contexto',
      h: `<p>Nabucodonosor reinó <strong>43 años</strong> (605-562 a.C.). Bohr reúne las pistas para ubicar el capítulo hacia el final:</p>` +
        tbl(['Año a.C.', 'El rey seguía en sus cabales'], [
          ['605', 'Toma Jerusalén por primera vez'],
          ['597', 'Segunda caída de Jerusalén'],
          ['586', 'Destruye Jerusalén y el templo'],
          ['582-569', 'Sitio de Tiro, unos 13 años'],
          ['568', 'Conquista Egipto, su año 37: su última campaña'],
        ]) +
        `<p>Después de 568 los registros sobre él casi callan. Según Bohr, ahí caben los <strong>siete tiempos</strong>, que en este capítulo son <strong>siete años</strong> literales: los últimos de su reinado. Encaja con 4:4: las guerras habían terminado y el rey disfrutaba de sus conquistas.</p>` +
        hi(`Bohr ve un milagro aparte: que un rey enloquecido pasara siete años lejos del trono sin que nadie se lo usurpara. La «cepa de las raíces» (4:15, 26) quedó protegida: Dios le guardó el reino.`) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 86-87; Bohr, 15 principios de interpretación profética, vol. 1, pág. 20.</p>`,
    },
    {
      t: '🧭 Quién cuenta la historia, y quién la dirige',
      capa: 'contexto',
      h: `<p>El rey escribe el capítulo, pero Bohr nota que no todo está en primera persona:</p>` +
        tbl(['Versículos', 'Persona', 'Por qué'], [
          ['2-27', 'Primera («yo, Nabucodonosor»)', 'El rey cuenta su propia experiencia'],
          ['28-33', 'Tercera («el rey»)', 'Mientras estaba fuera de sí, otro cuenta lo que pasó'],
          ['34-37', 'Primera otra vez', 'El rey recobró la razón'],
        ]) +
        `<p>Bohr añade que la Septuaginta (la traducción griega antigua) pone 4:1-3 como cierre del capítulo 3.</p>` +
        `<p>Además, el capítulo está lleno de verbos en <strong>voz pasiva</strong>: «te echarán», «fue echado», «fui restablecido», «me fue añadida». Alguien, detrás del telón, hace todo eso: «la sentencia es por decreto de los vigilantes» (4:17). En el rey se cumplen las tres ideas de Daniel 2:21:</p>` +
        li([
          'Dios <strong>muda los tiempos</strong>: siete tiempos pasaron sobre él.',
          'Dios <strong>quita reyes y pone reyes</strong>: lo quitó y lo restauró.',
          'Dios <strong>da la sabiduría</strong>: se la quitó en un instante y se la devolvió.',
        ]) +
        `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, págs. 84 y 88-89; Bohr, 15 principios de interpretación profética, vol. 1, págs. 19-20.</p>`,
    },
    {
      t: '🧭 La conversión del rey y la ley de la humildad',
      capa: 'contexto',
      h: `<p>Elena de White afirma que el rey se convirtió de verdad: el monarca soberbio llegó a ser «un humilde hijo de Dios» y aprendió que «la verdadera grandeza consiste en la verdadera bondad» (Profetas y reyes, pág. 521, citada por Bohr). Después dio su testimonio a otros: el capítulo mismo es esa carta.</p>` +
        `<p>Bohr resume la lección con las palabras de Jesús: «el que se enaltece será humillado, y el que se humilla será enaltecido» (Mateo 23:12). Si no nos humillamos nosotros, alguien más lo hará.</p>` +
        li([
          '<strong>El misterio de la iniquidad quiere subir:</strong> Eva quiso ser como Dios; Lucifer se enorgulleció de su sabiduría, su belleza, sus riquezas y su posición (Ezequiel 28; Isaías 14).',
          '<strong>El misterio de la piedad baja:</strong> Cristo se humilló hasta la muerte, y por eso fue exaltado (Filipenses 2:6-11).',
          'La palabra «humildad» viene del latín <em>humus</em>, tierra: reconocer que somos polvo.',
        ]) +
        hi(`El giro del capítulo está en 4:34: cuando el rey <strong>alzó los ojos al cielo</strong>, le volvió la razón.`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 87-88 y 90-91.</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '4:27', f: 'c', q: 'Según Bohr, ¿por qué el juicio anunciado en el sueño del árbol se podía evitar?',
      o: ['Porque Daniel intercedió por el rey', 'Porque la profecía era condicional', 'Porque el rey ofreció sacrificios', 'Porque los vigilantes cambiaron de opinión'], a: 1,
      e: 'El consejo de 4:27 abría una salida: si el rey cambiaba, el castigo podía no llegar. Dios le dio doce meses. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 86.' },
    { t: 'mc', v: '4:29', f: 'c', q: 'Según Elena de White, ¿qué le pasó al rey en los doce meses que siguieron al sueño?',
      o: ['Dejó de creer en la interpretación y se burló de sus temores', 'Liberó a todos los cautivos de Judá que había en Babilonia', 'Mandó destruir los ídolos de Babilonia y de sus provincias', 'Salió a una larga campaña militar contra Egipto y Tiro'], a: 0,
      e: 'A medida que el sueño se borraba de su mente, perdió la confianza en la interpretación y se burló de sus temores. Fuente: Elena de White, Profetas y reyes, pág. 519, citada por Stephen Bohr, Studies in Daniel 1-10, pág. 86.' },
    { t: 'tf', v: '4:8', f: 'c', q: 'Según Bohr, el decreto de Daniel 3:29 demuestra que Nabucodonosor ya se había convertido de verdad antes de Daniel 4.',
      a: false,
      e: 'Falso: ese decreto solo prohíbe hablar mal del «Dios de Sadrac, Mesac y Abed-nego», no la idolatría; en 4:8 el rey todavía habla de «mi dios». Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 85.' },
    { t: 'mc', v: '4:33', f: 'c', q: 'Según Bohr, ¿en qué parte del reinado de Nabucodonosor ocurrió su locura?',
      o: ['Al comienzo, antes de sitiar Jerusalén', 'A la mitad, durante el sitio de Tiro', 'Justo después del sueño de la estatua', 'En los últimos siete años de su reinado'], a: 3,
      e: 'Tras su última campaña, la conquista de Egipto en 568 a.C., los registros casi callan; ahí ubica Bohr los siete tiempos. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 87.' },
    { t: 'mc', v: '4:36', f: 'c', q: 'Según Bohr, ¿cuántos años reinó Nabucodonosor?',
      o: ['21 años', '37 años', '43 años', '70 años'], a: 2,
      e: 'Reinó 43 años, de 605 a 562 a.C.; su año 37 fue el de la conquista de Egipto. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 86-87.' },
    { t: 'tf', v: '4:16', f: 'c', q: 'Según Bohr, los «siete tiempos» que pasaron sobre Nabucodonosor fueron siete años literales.',
      a: true,
      e: 'Verdadero: el rey estuvo siete años fuera de sí, y aun así nadie le quitó el trono. Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 1, pág. 20; Bohr, Studies in Daniel 1-10, pág. 84.' },
    { t: 'mc', v: '4:31', f: 'c', q: 'Según Bohr, ¿por qué los versículos 28 al 33 de Daniel 4 están en tercera persona?',
      o: ['Porque Daniel escribió todo el capítulo', 'Porque el rey estaba fuera de sí', 'Porque es una cita de otro libro', 'Porque lo narra la reina'], a: 1,
      e: 'Mientras el rey estaba sin razón, otro cuenta la historia; en 4:34 vuelve la primera persona porque el rey recobró el juicio. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 84.' },
    { t: 'mc', v: '4:37', f: 'c', q: 'Según Elena de White, ¿qué lección aprendió por fin Nabucodonosor?',
      o: ['Que la verdadera grandeza está en la bondad', 'Que Babilonia no podía ser conquistada', 'Que los sabios caldeos lo habían engañado', 'Que debía dejar el trono a su hijo'], a: 0,
      e: '«La verdadera grandeza consiste en la verdadera bondad»: el tirano se volvió un rey sabio y compasivo. Fuente: Elena de White, Profetas y reyes, pág. 521, citada por Stephen Bohr, Studies in Daniel 1-10, pág. 87.' },
    { t: 'tf', v: '4:3', f: 'c', q: 'Según Bohr, la Septuaginta coloca el himno de Daniel 4:1-3 como cierre del capítulo 3.',
      a: true,
      e: 'Verdadero: después del horno el rey alababa a un Dios de señales y maravillas; al final del capítulo 4 lo conoce como el que humilla al soberbio y cambia el corazón. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 84.' },
  ],
};
