/* «Para profundizar» (capa contexto, no entra al examen): glosario, símbolos
   proféticos y la comparación de Daniel 2, 7, 8, 11 y 12. Se muestra en Daniel
   y en Apocalipsis. Pedido de Camilo del 13-oct-2026.
   Fuentes: Bohr («15 principios» vol. 1 y 2, «Studies in Daniel 1-10»,
   «Studies on Daniel 11», «La Gran Cadena Profética»), El conflicto de los
   siglos (página impresa), Smith, Shea y Pfandl; Biblia RV1995 de
   fuente/biblia.js y fuente/biblia-apocalipsis.js. Las lecturas de la
   comparación son las mismas de complementos/daniel/d2, d7, d8, d11 y d12. */
const { tbl, hi, li } = require('../apocalipsis/ayudas.js');

const G = ['Palabra', 'Qué significa', 'Texto'];
const S = ['Símbolo', 'Qué representa', 'Texto que lo comprueba'];

module.exports = {
  glosario: [
    {
      t: '🧭 Glosario: A – B',
      capa: 'contexto',
      h: `<p>Palabras que conviene tener claras para estudiar Daniel y Apocalipsis.</p>` +
        tbl(G, [
          ['Abismo', 'La tierra vacía y oscura, sin vida. Allí queda atado Satanás durante los mil años.', 'Apocalipsis 20:1-3; Génesis 1:2'],
          ['Abominación desoladora', 'Lo que profana el santuario y lo deja desolado. Jesús la anunció como algo todavía futuro. En Daniel 11:31 y 12:11 es la obra del poder papal apoyado por el Estado, desde el año 508.', 'Mateo 24:15; Lucas 21:20; Daniel 11:31; 12:11'],
          ['Alejandro Magno', 'Rey de Grecia, el «cuerno grande» del macho cabrío. Venció a Persia en 331 a.C. y murió joven; su reino se repartió en cuatro.', 'Daniel 8:5-8, 21; 11:3-4'],
          ['Anciano de días', 'Dios el Padre, que se sienta como Juez en el juicio del cielo.', 'Daniel 7:9, 13, 22'],
          ['Anticristo', 'Palabra de las cartas de Juan. En griego <i>anti</i> es «contra» y también «en lugar de».', '1 Juan 2:18, 22'],
          ['Arameo', 'La lengua internacional de esa época. Daniel 2:4 a 7:28 está escrito en arameo; el resto del libro, en hebreo.', 'Daniel 2:4: «en lengua aramea»'],
          ['Armagedón', 'En hebreo, «monte de la congregación». Es el lugar de la batalla final del gran día de Dios.', 'Apocalipsis 16:14, 16'],
          ['Arrianos', 'Creían que Jesús fue creado y no es Dios por naturaleza. Hérulos, vándalos y ostrogodos lo eran: son los tres cuernos arrancados.', 'Daniel 7:8, 24'],
          ['Babilonia', 'El imperio de Nabucodonosor (605-539 a.C.), la cabeza de oro. En la profecía significa «confusión»: la religión que se aparta de Dios.', 'Daniel 2:38; Génesis 11:9; Apocalipsis 17:5'],
          ['Belsasar', 'Hijo de Nabonido, reinaba junto con su padre. Fue el último rey de Babilonia: murió la noche en que cayó la ciudad, en 539 a.C.', 'Daniel 5:30; 7:1; 8:1'],
          ['Bestia', 'Un rey o un reino.', 'Daniel 7:17, 23: «La cuarta bestia será un cuarto reino en la tierra»'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 1:233 y 2:104; Bohr, <i>Daniel 1-10</i>, p. 57-58, 133-134, 201 y 296-298; Bohr, <i>Daniel 11</i>, p. 25-26; Pfandl, <i>Daniel</i>, p. 5 y 9; Smith, <i>Las profecías de Daniel</i>, p. 17; CS 533, 718.</p>`,
    },
    {
      t: '🧭 Glosario: C – D',
      capa: 'contexto',
      h: tbl(G, [
          ['Caldeos', 'El pueblo que gobernó Babilonia. También, la clase de sabios y sacerdotes de la corte; su nombre llegó a significar «mago» o «adivino».', 'Daniel 1:4; 2:2, 4; 5:30'],
          ['Ciro el Grande', 'Rey de Persia. Tomó Babilonia en 539 a.C. y dejó volver a los judíos. Dios lo llamó por nombre mucho antes.', 'Isaías 44:28; 45:1; Daniel 1:21; 6:28'],
          ['Continuo, el', 'En hebreo <i>hatamid</i>: lo diario. Es el ministerio diario de Cristo como sacerdote, que el cuerno pequeño quiso quitar. La palabra «sacrificio» la agregaron los traductores.', 'Daniel 8:11-13; 11:31; 12:11; Hebreos 8:1-2'],
          ['Cuerno', 'Un rey o un reino.', 'Daniel 7:24: «Los diez cuernos significan que de aquel reino se levantarán diez reyes»'],
          ['Cuerno pequeño', 'En Daniel 7, Roma papal: sale de la cuarta bestia y domina 1.260 años. En Daniel 8, Roma en sus dos fases, pagana y papal.', 'Daniel 7:8, 24-25; 8:9-12'],
          ['Darío de Media', 'El rey medo que tomó el reino de Babilonia a los 62 años.', 'Daniel 5:31; 9:1'],
          ['Día de la Expiación', 'El día diez del mes séptimo. El sumo sacerdote purificaba el santuario: era un día de juicio. Su cumplimiento empezó el 22 de octubre de 1844.', 'Levítico 16; 23:27'],
          ['Día por año', 'En la profecía simbólica, un día representa un año.', 'Números 14:34; Ezequiel 4:6'],
          ['Dos mil trescientas tardes y mañanas', '2.300 días proféticos: 2.300 años, desde el decreto de 457 a.C. hasta 1844, cuando empieza la purificación del santuario.', 'Daniel 8:14: «Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado»'],
          ['Dragón', 'Satanás, que obra por medio de poderes de la tierra.', 'Apocalipsis 12:9: «el gran dragón, la serpiente antigua, que se llama Diablo y Satanás»'],
        ]) +
        `<p>Fuente: Pfandl, <i>Daniel</i>, p. 5; Smith, <i>Las profecías de Daniel</i>, p. 2 y 18; Bohr, <i>Daniel 1-10</i>, p. 119-125 y 293-316; Bohr, <i>El calendario del Mesías</i>, p. 8; CS 374, 451.</p>`,
    },
    {
      t: '🧭 Glosario: G – L',
      capa: 'contexto',
      h: tbl(G, [
          ['Gabriel', 'El ángel que explica a Daniel las visiones de los capítulos 8 y 9. Está en la presencia de Dios.', 'Daniel 8:16; 9:21; Lucas 1:19'],
          ['Grecia', 'El imperio de Alejandro Magno (331-168 a.C.): el bronce, el leopardo y el macho cabrío.', 'Daniel 8:21: «El macho cabrío es el rey de Grecia»'],
          ['Herida de muerte', 'El golpe que recibió el papado en 1798, cuando el papa fue llevado prisionero. La profecía anuncia que la herida sana.', 'Apocalipsis 13:3: «su herida mortal fue sanada»'],
          ['Hijo del hombre', 'Cristo. En Daniel 7:13 va hasta el Anciano de días, al juicio en el cielo; no es su venida a la tierra.', 'Daniel 7:13; Mateo 26:64'],
          ['Historicismo', 'Leer la profecía como historia que se cumple en orden, desde el tiempo del profeta hasta el fin.', 'Daniel 2:38-44'],
          ['Imagen de la bestia', 'Una copia del papado: iglesias que buscan el poder civil para imponer su fe.', 'Apocalipsis 13:14-15'],
          ['Juicio investigador', 'La primera parte del juicio final. Empieza en 1844 en el cielo: se examinan los libros antes de la venida de Cristo.', 'Daniel 7:9-10; 8:14; Apocalipsis 14:7: «la hora de su juicio ha llegado»'],
          ['Libro de la vida', 'El registro con los nombres de los que pertenecen a Dios.', 'Daniel 12:1: «todos los que se hallen inscritos en el libro»; Apocalipsis 20:12, 15'],
          ['Libros, los', 'El registro de cada vida: obras, palabras y aun secretos.', 'Daniel 7:10: «los libros fueron abiertos»; Eclesiastés 12:14'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 57-58 y 124-125; Bohr, <i>La hora del juicio</i>, p. 3-6; CS 496-498, 533-536 y 636.</p>`,
    },
    {
      t: '🧭 Glosario: M',
      capa: 'contexto',
      h: tbl(G, [
          ['Marca de la bestia', 'La señal de sumisión al poder que se prefiere obedecer en lugar de Dios. En la crisis final será guardar el falso día de reposo impuesto por ley. Nadie la recibe sin haber conocido antes la verdad y rechazarla.', 'Apocalipsis 13:16-17; 14:9'],
          ['Media', 'Reino vecino de Persia. Sus reyes se unieron a los persas y juntos tomaron Babilonia.', 'Daniel 5:28: «dado a los medos y a los persas»; 5:31'],
          ['Medo-Persia', 'El imperio de los medos y los persas (539-331 a.C.): la plata, el oso y el carnero.', 'Daniel 8:20: «éstos son los reyes de Media y de Persia»'],
          ['Mesías Príncipe', '«Mesías» quiere decir ungido. Es Jesús, ungido con el Espíritu Santo en su bautismo, el año 27 d.C.', 'Daniel 9:25; Hechos 10:38'],
          ['Miguel', 'Su nombre pregunta «¿quién es como Dios?». Es Cristo, el jefe de los ángeles, que defiende a su pueblo.', 'Daniel 10:13, 21; 12:1; Judas 9'],
          ['Mil doscientos noventa y mil trescientos treinta y cinco días', 'Empiezan juntos en 508. Los 1.290 llegan a 1798; los 1.335, a 1843, cuando se anuncia el juicio.', 'Daniel 12:11-12'],
          ['Mil doscientos sesenta días', '1.260 años de dominio papal: de 538 a 1798. Es lo mismo que 42 meses y que «tiempo, tiempos y medio tiempo».', 'Apocalipsis 12:6; 13:5; Daniel 7:25'],
          ['Milenio', 'Los mil años después de la segunda venida. Los santos están con Cristo y juzgan; Satanás queda atado en la tierra desolada.', 'Apocalipsis 20:1-6; 1 Corintios 6:2'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:104; Bohr, <i>Daniel 1-10</i>, p. 5 y 361-364; Bohr, <i>Daniel 11</i>, p. 26; CS 492, 662-663 y 718-719.</p>`,
    },
    {
      t: '🧭 Glosario: N – R',
      capa: 'contexto',
      h: tbl(G, [
          ['Nabucodonosor', 'Rey de Babilonia desde 605 a.C. Llevó cautivos a Daniel y sus amigos.', 'Daniel 1:1-2; 2:37-38'],
          ['Papado', 'El sistema de gobierno de la iglesia de Roma, con el papa a la cabeza. La profecía habla del sistema, no de las personas: dentro de él hay muchas personas sinceras.', 'Daniel 7:8, 24-25'],
          ['Persia', 'El pueblo de Ciro el Grande. Desde 539 a.C. dominó, junto con Media, todo el antiguo imperio de Babilonia.', 'Daniel 6:28; 8:20'],
          ['Príncipe del ejército', 'Cristo, el que recibe adoración como jefe del ejército del Señor.', 'Daniel 8:11, 25; Josué 5:14-15'],
          ['Purificación del santuario', 'La obra final de Cristo en el santuario del cielo, que el Día de la Expiación anunciaba. Empieza al terminar los 2.300 años, en 1844.', 'Daniel 8:14; Levítico 16:16, 30'],
          ['Ramera', 'Una iglesia que se apartó de Dios y se unió a los poderes del mundo.', 'Apocalipsis 17:1-2, 5; Ezequiel 16:15'],
          ['Remanente', 'El pueblo fiel del fin: los que guardan los mandamientos y tienen el testimonio de Jesús.', 'Apocalipsis 12:17: «el resto de la descendencia de ella»; 14:12'],
          ['Rey del norte', 'En 11:5-15, Siria. Después, el poder que imita a Dios, cuyo trono está «al norte»: el papado.', 'Daniel 11:40; Salmo 48:2; Isaías 14:13'],
          ['Rey del sur', 'En 11:5-15, Egipto. Después, el poder que niega a Dios: el ateísmo, como el faraón.', 'Daniel 11:40; Éxodo 5:2; Apocalipsis 11:8'],
          ['Roma', 'El cuarto reino. Imperial (168 a.C.-476 d.C.), dividida en reinos desde 476, y papal (538-1798).', 'Daniel 2:40-43; 7:7-8, 23-25'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:102-106; Bohr, <i>Daniel 1-10</i>, p. 57-62 y 306-308; Bohr, <i>Daniel 11</i>, p. 19-24 y 98-99; Bohr, <i>La gran cadena</i>, p. 7; CS 312, 374 y 492.</p>`,
    },
    {
      t: '🧭 Glosario: S – V',
      capa: 'contexto',
      h: tbl(G, [
          ['Santuario', 'La casa de Dios. El de Moisés era una copia del santuario del cielo, donde Cristo ministra hoy como sumo sacerdote.', 'Hebreos 8:1-2, 5; 9:24; Éxodo 25:8-9'],
          ['Sátrapas', 'Palabra persa: «protector del reino». Gobernadores de provincia u oficiales del rey. Darío puso 120.', 'Daniel 3:2; 6:1-2'],
          ['Sello de Dios', 'La señal de que alguien pertenece a Dios y le es leal. En la crisis final, guardar el sábado del cuarto mandamiento.', 'Apocalipsis 7:2-3; Ezequiel 9:4; 20:12, 20'],
          ['Setenta semanas', '490 años para el pueblo judío: de 457 a.C. a 34 d.C. Son la primera parte de los 2.300 años.', 'Daniel 9:24-27'],
          ['Sinar', 'La tierra de Babilonia, donde se construyó la torre de Babel.', 'Daniel 1:2; Génesis 11:2'],
          ['Tiempo de angustia', 'El tiempo después que Cristo termina su intercesión y antes de su venida. Dios libra a su pueblo.', 'Daniel 12:1: «Será tiempo de angustia, cual nunca fue»'],
          ['Tiempo del fin', 'El período que empieza en 1798. Desde entonces el libro de Daniel quedó abierto y se entiende cada vez más.', 'Daniel 8:17; 11:40; 12:4: «sella el libro hasta el tiempo del fin»'],
          ['Tiempo, tiempos y medio tiempo', 'Tres años y medio: 1.260 días proféticos, o sea 1.260 años (538-1798).', 'Daniel 7:25; 12:7; Apocalipsis 12:6 y 14'],
          ['Tierra gloriosa', 'Primero, la tierra de Israel. Después de la cruz, la tierra del pueblo de Dios; en 11:41 se lee como Estados Unidos, baluarte protestante.', 'Daniel 8:9; 11:16, 41'],
          ['Vigilante', 'Un ángel, mensajero de Dios, que baja del cielo y anuncia su sentencia.', 'Daniel 4:13, 17'],
        ]) +
        `<p>Fuente: Pfandl, <i>Daniel</i>, p. 33; <i>Escuela Sabática</i> 2020-1T, p. 14; Bohr, <i>El calendario del Mesías</i>, p. 3 y 5; Bohr, <i>Daniel 11</i>, p. 18-21; CS 374, 405, 465-469, 491, 663 y 671.</p>`,
    },
  ],

  simbolos: [
    {
      t: '🧭 La Biblia explica sus símbolos: animales',
      capa: 'contexto',
      h: `<p>La Biblia explica sus propios símbolos. Un mismo símbolo puede cambiar de sentido según el pasaje: el león es Babilonia en Jeremías y Cristo en Apocalipsis 5:5. Por eso se busca el texto que lo explica en su contexto.</p>` +
        tbl(S, [
          ['Bestia', 'Un rey o un reino', 'Daniel 7:17: «Estas cuatro grandes bestias son cuatro reyes»; 7:23'],
          ['León', 'Babilonia', 'Jeremías 50:17, 43-44; Daniel 7:4 en el lugar de la cabeza de oro (2:38)'],
          ['Oso', 'Medo-Persia', 'Daniel 7:5, 17; el reino de Babilonia es «dado a los medos y a los persas» (5:28)'],
          ['Leopardo', 'Grecia', 'Daniel 7:6 en el lugar del macho cabrío: «El macho cabrío es el rey de Grecia» (8:21)'],
          ['Carnero', 'Medo-Persia', 'Daniel 8:20: «éstos son los reyes de Media y de Persia»'],
          ['Macho cabrío', 'Grecia', 'Daniel 8:21: «El macho cabrío es el rey de Grecia»'],
          ['Alas', 'Rapidez para conquistar', 'Habacuc 1:6-8; Deuteronomio 28:49'],
          ['Alas de águila (a la mujer)', 'La protección de Dios', 'Éxodo 19:4; Deuteronomio 32:11'],
          ['Dragón, serpiente', 'Satanás', 'Apocalipsis 12:9: «el gran dragón, la serpiente antigua, que se llama Diablo y Satanás»'],
          ['Cordero', 'Cristo', 'Juan 1:29; Isaías 53:7; Apocalipsis 5:6'],
          ['Langostas', 'Un ejército que invade', 'Joel 1:4-6; 2:4-11'],
          ['Ranas', 'Espíritus de demonios que engañan', 'Apocalipsis 16:13-14: «Son espíritus de demonios, que hacen señales»'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:102-105; Bohr, <i>Daniel 1-10</i>, p. 121; Bohr, <i>La sexta trompeta</i>, p. 12-16.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos: personas y cuerpo',
      capa: 'contexto',
      h: tbl(S, [
          ['Mujer pura', 'La iglesia fiel', 'Jeremías 6:2; 2 Corintios 11:2; Efesios 5:25-27'],
          ['Ramera', 'Una iglesia que se apartó de Dios', 'Ezequiel 16:15; Jeremías 3:1-3; Apocalipsis 17:5: «la madre de las rameras»'],
          ['Fornicación', 'La unión de la iglesia con los poderes del mundo', 'Santiago 4:4; Ezequiel 16:26; Apocalipsis 17:2: «Con ella han fornicado los reyes de la tierra»'],
          ['Jezabel', 'Una iglesia apóstata que usa el poder civil para perseguir', '1 Reyes 18:4; 2 Reyes 9; Apocalipsis 2:20'],
          ['Ángel', 'Un mensajero', 'Lucas 7:24; Apocalipsis 1:20'],
          ['Cabeza', 'Un rey o un reino; varias cabezas, reinos que se suceden', 'Daniel 2:38: «Tú eres aquella cabeza de oro»; Apocalipsis 17:9-10: las cabezas «son siete reyes»'],
          ['Cuerno', 'Un rey o un reino', 'Daniel 8:22; Apocalipsis 17:12: «Los diez cuernos que has visto son diez reyes»'],
          ['Ojos', 'Sabiduría, inteligencia', 'Efesios 1:18; Apocalipsis 2:18'],
          ['Frente', 'La mente', 'Deuteronomio 6:6-8; Hebreos 10:16'],
          ['Nombre', 'El carácter, y a quién pertenece uno', 'Génesis 32:27-28; Éxodo 34:5-7; Apocalipsis 14:1'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:103-106; Bohr, <i>Las siete iglesias</i>, p. 23 y 93-100; Bohr, <i>Apocalipsis 17</i>, p. 4-5.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos: naturaleza y lugares',
      capa: 'contexto',
      h: tbl(S, [
          ['Mar, aguas', 'Pueblos y naciones', 'Apocalipsis 17:15: las aguas «son pueblos, muchedumbres, naciones y lenguas»; Isaías 17:12-13'],
          ['Vientos', 'Guerras y luchas entre naciones', 'Jeremías 25:32-33; 49:36-37'],
          ['Tierra (frente al mar)', 'Un territorio poco poblado', 'Apocalipsis 17:15 (el mar son pueblos); 12:16'],
          ['Monte', 'Un reino', 'Daniel 2:35, 44; Jeremías 51:25'],
          ['Sol', 'Cristo, el Sol de justicia', 'Malaquías 4:2'],
          ['Estrellas', 'Ángeles o mensajeros; también los fieles que enseñan', 'Apocalipsis 1:20: «las siete estrellas son los ángeles de las siete iglesias»; Daniel 12:3'],
          ['Árboles', 'El pueblo de Dios', 'Salmo 1:3; Jeremías 17:8'],
          ['Lluvia', 'La enseñanza de Dios', 'Deuteronomio 32:2'],
          ['Inundación', 'Un ejército que invade', 'Isaías 8:7-8; Daniel 11:22: «barridas delante de él como por inundación de aguas»'],
          ['Río Éufrates', 'Los pueblos que sostienen a Babilonia', 'Isaías 8:7; Apocalipsis 17:15'],
          ['Babilonia', 'Confusión: la religión que se aparta de Dios', 'Génesis 11:9; Apocalipsis 17:5; 18:2-4'],
          ['Egipto', 'Negar a Dios: el ateísmo', 'Éxodo 5:2; Apocalipsis 11:8: la ciudad «que en sentido espiritual se llama Sodoma y Egipto»'],
          ['El norte', 'El trono de Dios; el falso rey del norte lo imita', 'Salmo 48:2; Isaías 14:13'],
          ['Jerusalén, Sion', 'La ciudad y el pueblo de Dios', 'Gálatas 4:26; Hebreos 12:22'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:102-106; Bohr, <i>Daniel 11</i>, p. 19-21; Bohr, <i>Daniel 1-10</i>, p. 63-64 y 121; CS 312.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos: objetos',
      capa: 'contexto',
      h: tbl(S, [
          ['Candelabro', 'La iglesia', 'Apocalipsis 1:20: «los siete candelabros que has visto son las siete iglesias»'],
          ['Espada', 'La palabra de Dios; en otro contexto, el poder civil que castiga', 'Hebreos 4:12; Efesios 6:17; Romanos 13:4'],
          ['Copa de la ira', 'El juicio de Dios', 'Jeremías 25:15; Apocalipsis 14:10: «el cáliz de su ira»'],
          ['Vino de Babilonia', 'Doctrinas falsas', 'Jeremías 51:7; Apocalipsis 17:2: «se han embriagado con el vino de su fornicación»'],
          ['Llave', 'Autoridad para abrir y cerrar', 'Isaías 22:20-22'],
          ['Incienso', 'Las oraciones', 'Apocalipsis 5:8: «copas de oro llenas de incienso, que son las oraciones de los santos»; Salmo 141:2'],
          ['Vestiduras blancas, lino fino', 'La justicia', 'Apocalipsis 19:8: «El lino fino representa las acciones justas de los santos»; Isaías 61:10'],
          ['Aceite', 'El Espíritu Santo', 'Zacarías 4:1-6'],
          ['Sello', 'Propiedad y protección de Dios', 'Ezequiel 9:4-6; Efesios 1:13; 2 Timoteo 2:19'],
          ['Libros', 'El registro de las obras', 'Apocalipsis 20:12: «fueron juzgados los muertos por las cosas que estaban escritas en los libros»; Malaquías 3:16'],
          ['Trompeta', 'Alarma de guerra; aviso del juicio', 'Números 10:9; Joel 2:1'],
          ['Arca del pacto', 'La ley de Dios, que se guardaba dentro', 'Deuteronomio 10:5; Apocalipsis 11:19'],
          ['Imagen', 'Una copia que se impone por ley', 'Daniel 3:1-6; Apocalipsis 13:14: «que le hagan una imagen a la bestia»'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:102-105; Bohr, <i>Las siete iglesias</i>, p. 23 y 124-125; Bohr, <i>Las siete trompetas</i>, p. 16-17; Bohr, <i>Tres ángeles</i> 1:182.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos: números y tiempo',
      capa: 'contexto',
      h: tbl(S, [
          ['Día', 'Un año', 'Números 14:34; Ezequiel 4:6'],
          ['Semana', 'Siete años', 'Levítico 25:8; Daniel 9:24-27'],
          ['Tarde y mañana', 'Un día completo', 'Génesis 1:5, 8'],
          ['Tiempo', 'Un año', 'Daniel 4:16, 25 (siete tiempos: siete años)'],
          ['Tiempo, tiempos y medio tiempo', 'Tres años y medio: 1.260 días proféticos', 'Apocalipsis 12:6 y 14: el mismo período es «mil doscientos sesenta días» y «un tiempo, tiempos y la mitad de un tiempo»'],
          ['Cuarenta y dos meses', '1.260 días', 'Apocalipsis 11:2-3; 13:5 (42 meses de 30 días)'],
          ['Mil doscientos sesenta días', '1.260 años: 538-1798', 'Daniel 7:25; Números 14:34; Ezequiel 4:6'],
          ['Cuatro', 'Todo el mundo', 'Apocalipsis 7:1; 20:8: «los cuatro ángulos de la tierra»'],
          ['Seis', 'Apostasía contra Dios', 'Apocalipsis 13:18; 1 Reyes 10:14; Daniel 3:1'],
          ['Siete', 'Plenitud, algo completo', 'Génesis 2:2; Josué 6:15-16; Apocalipsis 15:1'],
          ['Diez', 'Todos, el conjunto completo', 'Eclesiastés 12:13 (los diez mandamientos son todo el deber); Daniel 7:24'],
          ['Doce', 'El pueblo de Dios', 'Apocalipsis 21:12, 14: las doce tribus y los doce apóstoles'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 1:232-233 y 2:104-105; Bohr, <i>Daniel 1-10</i>, p. 125 y 315; Bohr, <i>Apocalipsis 17</i>, p. 20-21.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos: colores',
      capa: 'contexto',
      h: tbl(S, [
          ['Blanco', 'Pureza, justicia, victoria', 'Isaías 1:18; Apocalipsis 7:13-14; 19:8'],
          ['Azul', 'La ley de Dios: recordar sus mandamientos', 'Números 15:38-40'],
          ['Rojo', 'Sangre derramada, sacrificio', 'Isaías 63:1-3; Apocalipsis 14:20'],
          ['Púrpura y escarlata', 'Realeza', 'Juan 19:2, 5; Apocalipsis 17:4 con 18:7: «Yo estoy sentada como una reina»'],
          ['Oro', 'Un carácter probado, la fe refinada', '1 Pedro 1:7; Job 23:10'],
          ['Negro', 'Pecado, tinieblas, error', '1 Juan 1:5-6; Apocalipsis 6:5'],
        ]) +
        `<p>Fuente: Bohr, <i>15 principios</i> 2:106; Bohr, <i>Los siete sellos</i> 1:178-180.</p>`,
    },
  ],

  comparar: [
    {
      t: '🧭 Daniel 2, 7 y 8 lado a lado',
      capa: 'contexto',
      h: `<p>Las mismas épocas, en tres visiones. «—» quiere decir que el capítulo no la trae.</p>` +
        tbl(['Poder o época', 'Daniel 2', 'Daniel 7', 'Daniel 8'], [
          ['Babilonia (605-539 a.C.)', 'Cabeza de oro (2:32, 38)', 'León con alas de águila (7:4)', '—'],
          ['Medo-Persia (539-331 a.C.)', 'Pecho y brazos de plata (2:32, 39)', 'Oso alzado de un costado, con tres costillas (7:5)', 'Carnero de dos cuernos; el más alto creció después (8:3-4, 20)'],
          ['Grecia (331-168 a.C.)', 'Vientre y muslos de bronce (2:32, 39)', 'Leopardo con cuatro alas (7:6)', 'Macho cabrío; su cuerno notable es «el rey primero», Alejandro Magno (8:5, 21)'],
          ['Los cuatro reinos de Grecia', '—', 'Cuatro cabezas del leopardo (7:6)', 'Cuatro cuernos hacia los cuatro vientos (8:8, 22)'],
          ['Roma imperial (168 a.C.-476 d.C.)', 'Piernas de hierro (2:33, 40)', 'Cuarta bestia, con dientes de hierro (7:7, 23)', 'Cuerno pequeño que crece hacia el sur, el oriente y la tierra gloriosa (8:9-10)'],
          ['Roma dividida (desde 476)', 'Diez dedos: «será un reino dividido» (2:41-42)', 'Diez cuernos: «diez reyes» (7:7, 24)', '—'],
          ['Roma papal (538-1798)', 'Hierro mezclado con barro cocido (2:41-43)', 'Cuerno pequeño: arranca tres cuernos, habla contra el Altísimo, persigue a los santos por «tiempo, tiempos y medio tiempo» (7:8, 24-25)', 'El mismo cuerno se engrandece contra el Príncipe, quita el continuo y echa por tierra su santuario (8:11-12)'],
          ['El juicio en el cielo (1844)', '—', 'Se ponen tronos, se abren los libros; el Hijo del hombre va al Anciano de días (7:9-10, 13, 22)', '«Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado» (8:14): 457 a.C.-1844'],
          ['El tiempo del fin (desde 1798)', 'Dios muestra «lo que ha de acontecer en los últimos días» (2:28)', '—', '«La visión es para el tiempo del fin» (8:17, 19)'],
          ['La segunda venida y el reino eterno', 'La piedra cortada «sin que la cortara mano alguna» hiere los pies y se hace un gran monte (2:34-35, 44-45)', 'La bestia es destruida y el reino se da a los santos para siempre (7:11, 26-27)', 'El cuerno «será quebrantado, aunque no por mano humana» (8:25)'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 57-64, 119-121, 133-134, 293-298 y 307-316; Bohr, <i>15 principios</i> 2:105; CS 492.</p>`,
    },
    {
      t: '🧭 Daniel 8, 11 y 12 lado a lado',
      capa: 'contexto',
      h: `<p>Daniel 8 va en las dos tablas: es el puente. Daniel 11 sigue su mismo orden y Daniel 12 lo termina.</p>` +
        tbl(['Poder o época', 'Daniel 8', 'Daniel 11', 'Daniel 12'], [
          ['Babilonia (605-539 a.C.)', '—', '—', '—'],
          ['Medo-Persia (539-331 a.C.)', 'Carnero de dos cuernos (8:3-4, 20)', '«Aún habrá tres reyes en Persia, y el cuarto se hará de grandes riquezas» (11:2): Cambises II, Bardiya y Darío I; el cuarto es Jerjes I (Asuero), que levantó a todos contra Grecia', '—'],
          ['Grecia (331-168 a.C.)', 'Macho cabrío y su cuerno grande (8:5, 21)', 'Un rey valiente que domina con gran poder (11:3)', '—'],
          ['Los cuatro reinos de Grecia', 'Cuatro cuernos (8:8, 22)', 'El reino, «repartido hacia los cuatro vientos del cielo» (11:4); después, el rey del norte (Siria) contra el rey del sur (Egipto) (11:5-15)', '—'],
          ['Roma imperial (168 a.C.-476 d.C.)', 'Cuerno pequeño que crece hasta el ejército del cielo (8:9-10)', 'Se queda en la tierra gloriosa (11:16); el príncipe del pacto es quebrantado (11:22). Abarca 11:16-28, o 11:16-20 según dónde se ponga la línea', '—'],
          ['Roma dividida (desde 476)', '—', '—', '—'],
          ['Roma papal (538-1798)', 'Quita el continuo y echa por tierra el santuario (8:11-12)', 'Sus tropas quitan el continuo y ponen la abominación desoladora (11:31, desde 508); se engrandece sobre todo dios (11:36). Abarca 11:29-39, o 11:21-39', '«Tiempo, tiempos y la mitad de un tiempo» (12:7): 538-1798. Los 1.290 días (12:11): 508-1798'],
          ['El juicio en el cielo (1844)', 'Purificación del santuario (8:14): 1844', '—', 'Termina cuando «se levantará Miguel»: son librados los «inscritos en el libro» (12:1). Los 1.335 días (12:12) llegan a 1843, al anuncio del juicio'],
          ['El tiempo del fin (desde 1798)', '«La visión es para el tiempo del fin» (8:17, 19)', '«Al cabo del tiempo»: el rey del sur hiere al del norte en 1798; luego el norte se recupera (11:40-44)', 'El libro queda sellado «hasta el tiempo del fin»; «la ciencia aumentará» (12:4, 9)'],
          ['La segunda venida y el reino eterno', 'El cuerno, quebrantado «no por mano humana» (8:25)', '«Llegará a su fin, y no tendrá quien lo ayude» (11:45)', 'Se levanta Miguel; tiempo de angustia, liberación y resurrección (12:1-3); Daniel se levantará para recibir su heredad (12:13)'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 11</i>, p. 15-26 y 98-99; Bohr, <i>Daniel 1-10</i>, p. 5, 293-295 y 357; Bohr, <i>La gran cadena</i>, p. 44; Treiyer, <i>Enigmas descifrados</i>, p. 50-52.</p>`,
    },
    {
      t: '🧭 Lo que muestra la comparación',
      capa: 'contexto',
      h: `<p>Cada visión <strong>repite</strong> la anterior y <strong>agrega detalle</strong>. Es el principio de repetición y ampliación: como los cuatro evangelios, que cuentan la misma historia desde ángulos distintos. Daniel 2 mira con telescopio; Daniel 11, con microscopio.</p>` +
        li([
          '<strong>Daniel 2</strong> da el esquema: cuatro reinos, la división de Roma y el reino de Dios que no tiene fin.',
          '<strong>Daniel 7</strong> repite los cuatro reinos y agrega el cuerno pequeño, sus 1.260 años y el juicio en el cielo.',
          '<strong>Daniel 8</strong> empieza en Persia, porque los 2.300 años empiezan en tiempos de Persia. Usa animales del santuario y agrega el continuo y la fecha del juicio: 1844. Daniel 9 da el punto de partida, 457 a.C.',
          '<strong>Daniel 11</strong> sigue el mismo orden de Daniel 8, ahora rey por rey, y amplía el tiempo del fin (11:40-45), que Daniel 8 solo menciona.',
          '<strong>Daniel 12</strong> cierra la línea: se levanta Miguel, viene la angustia, el pueblo de Dios es librado y hay resurrección.',
        ]) +
        hi(`Daniel 8 no termina con el reino eterno porque Daniel 8 a 12 es una sola unidad: el reino llega al final, en 12:1-3.`) +
        `<p>Fuente: Shea, <i>Daniel</i>, p. 17-18; Bohr, <i>Daniel 1-10</i>, p. 119-120 y 293-295; Bohr, <i>Daniel 11</i>, p. 15-18.</p>`,
    },
  ],
};

/* Ninguna sección pasa de 2000 caracteres (regla del repo). Una tabla larga
   se parte por filas en dos o más secciones con el mismo título numerado; cada
   parte lleva el texto de antes en la primera y la fuente al final. */
const LIM = 1900;
function parte(sec) {
  if (sec.h.length <= LIM) return [sec];
  const m = sec.h.match(/^([\s\S]*?<tbody>)([\s\S]*?)(<\/tbody>[\s\S]*?<\/div>)([\s\S]*)$/);
  if (!m) return [sec];
  const [, ini, cuerpo, cierre, resto] = m;
  const filas = cuerpo.match(/<tr>[\s\S]*?<\/tr>/g) || [];
  const fuente = (resto.match(/<p>Fuentes?:[\s\S]*?<\/p>/) || [''])[0];
  const antes = ini.slice(0, ini.indexOf('<div class="tabla-scroll">')), cab = ini.slice(antes.length);
  let n = Math.ceil(sec.h.length / LIM), k;
  /* Las filas no miden lo mismo: se parte más fino hasta que ninguna parte pase. */
  const mide = k => { let m = 0; for (let i = 0; i < filas.length; i += k) m = Math.max(m, filas.slice(i, i + k).join('').length); return m; };
  for (k = Math.ceil(filas.length / n); k > 1 && mide(k) + ini.length + resto.length > LIM; k--);
  const out = [];
  for (let i = 0; i < filas.length; i += k) {
    const primera = i === 0, ultima = i + k >= filas.length;
    out.push({ ...sec, t: sec.t + ' (' + (out.length + 1) + ')',
      h: (primera ? antes : '') + cab + filas.slice(i, i + k).join('') + cierre + (ultima ? resto : fuente) });
  }
  return out;
}
for (const k of ['glosario', 'simbolos', 'comparar']) module.exports[k] = module.exports[k].flatMap(parte);

/* v189: «Quién es quién», armado de fuente/personajes.js (la misma ficha que
   abre el nombre en el estudio). Una tabla por tipo, partida por filas. */
{
  const { PERSONAJES } = require('../personajes.js');
  const orden = (a, b) => a.nombre.localeCompare(b.nombre, 'es');
  const tabla = (titulo, lista) => parte({ t: titulo, capa: 'contexto',
    h: tbl(['Nombre', 'Quién fue', 'Época'], lista.sort(orden).map(p => [p.nombre, p.quien, p.fechas || '—'])) +
      '<p>Fuente: la ficha de cada personaje (toca su nombre).</p>' });
  module.exports.personas = [
    ...tabla('🧭 Personajes bíblicos', PERSONAJES.filter(p => p.tipo === 'biblico')),
    ...tabla('🧭 Personajes de la historia', PERSONAJES.filter(p => p.tipo !== 'biblico')),
  ];
}

/* Los tres repasos, con el prefijo de cada tema (un id solo puede ser de un
   tema). `prof` los pinta como «Para profundizar»: no entran al examen ni
   al reglamento; cada categoría de su `tema` los ve sin que su ficha los
   nombre (ver modsDe en app.js). */
const P = module.exports;
P.modulos = (pre, tema) => [
  { id: pre + '-glosario', label: 'Glosario', sub: 'Las palabras de la profecía, en sencillo', icono: '📗', color: '#0E6A78', prof: true, tema },
  { id: pre + '-simbolos', label: 'Símbolos proféticos', sub: 'Qué representa cada uno y el texto que lo prueba', icono: '🧭', color: '#0E6A78', prof: true, tema },
  { id: pre + '-comparar', label: 'Daniel 2, 7, 8, 11 y 12', sub: 'Las visiones lado a lado', icono: '📕', color: '#0E6A78', prof: true, tema },
  { id: pre + '-personas', label: 'Quién es quién', sub: 'Los personajes bíblicos y de la historia', icono: '👥', color: '#0E6A78', prof: true, tema },
];
P.contenido = pre => ({ [pre + '-glosario']: P.glosario, [pre + '-simbolos']: P.simbolos, [pre + '-comparar']: P.comparar, [pre + '-personas']: P.personas });

