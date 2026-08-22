/* Tarjetas de memorización. frente → reverso.
   cap sirve para filtrar por categoría igual que el banco de preguntas. */

const TARJETAS = [
  // Daniel 1
  {cap:'d1', f:'Nombre babilónico de <b>Daniel</b>', r:'Beltsasar'},
  {cap:'d1', f:'Nombre babilónico de <b>Ananías</b>', r:'Sadrac'},
  {cap:'d1', f:'Nombre babilónico de <b>Misael</b>', r:'Mesac'},
  {cap:'d1', f:'Nombre babilónico de <b>Azarías</b>', r:'Abed-nego'},
  {cap:'d1', f:'¿Quién era <b>Aspenaz</b>?', r:'El jefe de los eunucos (1:3)'},
  {cap:'d1', f:'¿Quién era <b>Melsar</b>?', r:'El sirviente puesto sobre Daniel y sus tres compañeros (1:11, 16)'},
  {cap:'d1', f:'Años de educación de los jóvenes', r:'TRES años (1:5)'},
  {cap:'d1', f:'Días que duró la prueba', r:'DIEZ días (1:12)'},
  {cap:'d1', f:'Qué pidieron comer y beber', r:'Legumbres para comer y agua para beber (1:12)'},
  {cap:'d1', f:'Cómo apareció su rostro a los diez días', r:'«Mejor y más robusto» que el de los otros muchachos (1:15)'},
  {cap:'d1', f:'Cuántas veces mejores que los magos', r:'DIEZ veces mejores (1:20)'},
  {cap:'d1', f:'Don que recibió solo Daniel', r:'Entendimiento en toda visión y sueños (1:17)'},
  {cap:'d1', f:'Hasta cuándo continuó Daniel', r:'Hasta el año primero del rey Ciro (1:21)'},
  {cap:'d1', f:'Año del reinado de Joacim en que cae Jerusalén', r:'El TERCER año (1:1)'},

  // Daniel 2
  {cap:'d2', f:'Año del reinado en que Nabucodonosor soñó', r:'El SEGUNDO año (2:1)'},
  {cap:'d2', f:'¿Quién era <b>Arioc</b>?', r:'El capitán de la guardia del rey (2:14)'},
  {cap:'d2', f:'Cómo se le reveló el misterio a Daniel', r:'En visión de noche (2:19)'},
  {cap:'d2', f:'Material de la <b>cabeza</b>', r:'Oro fino → Babilonia'},
  {cap:'d2', f:'Material del <b>pecho y brazos</b>', r:'Plata → Medo-Persia'},
  {cap:'d2', f:'Material del <b>vientre y muslos</b>', r:'Bronce → Grecia'},
  {cap:'d2', f:'Material de las <b>piernas</b>', r:'Hierro → Roma'},
  {cap:'d2', f:'Material de los <b>pies</b>', r:'Hierro y barro cocido → reinos divididos'},
  {cap:'d2', f:'Dónde hirió la piedra a la imagen', r:'En sus pies de hierro y de barro cocido (2:34)'},
  {cap:'d2', f:'En qué se convirtió la piedra', r:'En un gran monte que llenó toda la tierra (2:35)'},
  {cap:'d2', f:'Cargo que recibió Daniel', r:'Gobernador de la provincia de Babilonia y principal de los gobernadores sobre los sabios (2:48)'},

  // Daniel 3
  {cap:'d3', f:'Medidas de la estatua de oro', r:'SESENTA codos de alto por SEIS de ancho (3:1)'},
  {cap:'d3', f:'Dónde se levantó la estatua', r:'En el campo de Dura, provincia de Babilonia (3:1)'},
  {cap:'d3', f:'Los seis instrumentos, en orden', r:'Bocina, flauta, tamboril, arpa, salterio y zampoña (3:5)'},
  {cap:'d3', f:'Instrumento que NO aparece en Daniel 3', r:'La trompeta'},
  {cap:'d3', f:'Cuántas veces más caliente el horno', r:'SIETE veces más de lo acostumbrado (3:19)'},
  {cap:'d3', f:'Con qué ropa entraron al horno', r:'Con sus mantos, sus calzas, sus turbantes y sus vestidos (3:21)'},
  {cap:'d3', f:'Qué les pasó a los que los echaron', r:'La llama del fuego los mató (3:22)'},
  {cap:'d3', f:'Cuántos vio el rey en el horno', r:'CUATRO varones sueltos (3:25)'},
  {cap:'d3', f:'Cómo era el cuarto varón', r:'«Semejante al Hijo de Dios» (3:25)'},
  {cap:'d3', f:'Las cuatro cosas que no sufrieron daño', r:'El fuego no se enseñoreó de sus cuerpos, ni cabello fue quemado, ni sus vestidos se alteraron, ni olor de fuego había en ellos (3:27)'},
  {cap:'d3', f:'La frase clave de los tres jóvenes', r:'«Y si no, no serviremos a tus dioses ni adoraremos la estatua» (3:18)'},

  // Daniel 4
  {cap:'d4', f:'Hasta dónde llegaba el árbol', r:'Hasta el cielo; se veía hasta los confines de la tierra (4:11)'},
  {cap:'d4', f:'Con qué quedó atada la cepa', r:'Con atadura de hierro y de bronce (4:15, 23)'},
  {cap:'d4', f:'Cuántos tiempos pasarían sobre el rey', r:'SIETE tiempos (4:25)'},
  {cap:'d4', f:'Cuánto tiempo de gracia tuvo', r:'DOCE meses, un año completo (4:29)'},
  {cap:'d4', f:'Cómo le creció el cabello', r:'Como plumas de águila (4:33)'},
  {cap:'d4', f:'Cómo quedaron sus uñas', r:'Como las de las aves (4:33)'},
  {cap:'d4', f:'Qué hizo para recuperar la razón', r:'Alzó sus ojos al cielo (4:34)'},
  {cap:'d4', f:'El consejo de Daniel al rey', r:'Redimir sus pecados con justicia y sus iniquidades haciendo misericordias para con los oprimidos (4:27)'},

  // Daniel 5
  {cap:'d5', f:'Cuántos convidados en el banquete', r:'MIL príncipes (5:1)'},
  {cap:'d5', f:'De dónde eran los vasos que usó', r:'Del templo que estaba en Jerusalén (5:2)'},
  {cap:'d5', f:'Frente a qué apareció la escritura', r:'Delante del candelero (5:5)'},
  {cap:'d5', f:'El texto exacto de la pared', r:'MENE, MENE, TEKEL, UPARSIN (5:25)'},
  {cap:'d5', f:'Qué significa <b>MENE</b>', r:'Contó Dios tu reino, y le ha puesto fin (5:26)'},
  {cap:'d5', f:'Qué significa <b>TEKEL</b>', r:'Pesado has sido en balanza, y fuiste hallado falto (5:27)'},
  {cap:'d5', f:'Qué significa <b>PERES</b>', r:'Tu reino ha sido roto, y dado a los medos y a los persas (5:28)'},
  {cap:'d5', f:'Las tres cosas ofrecidas', r:'Vestido de púrpura, collar de oro y ser el TERCER señor del reino (5:7)'},
  {cap:'d5', f:'Quién recordó a Daniel al rey', r:'La reina (5:10-12)'},
  {cap:'d5', f:'Edad de Darío al recibir el reino', r:'SESENTA Y DOS años (5:31)'},

  // Daniel 6
  {cap:'d6', f:'Cuántos sátrapas puso Darío', r:'CIENTO VEINTE (6:1)'},
  {cap:'d6', f:'Cuántos gobernadores sobre ellos', r:'TRES, y Daniel era uno de ellos (6:2)'},
  {cap:'d6', f:'Por qué sobresalía Daniel', r:'Porque había en él un espíritu superior (6:3)'},
  {cap:'d6', f:'Por qué no hallaron falta en él', r:'Porque él era fiel, y ningún vicio ni falta fue hallado en él (6:4)'},
  {cap:'d6', f:'Cuántos días duraba el edicto', r:'TREINTA días (6:7)'},
  {cap:'d6', f:'Cuántas veces al día oraba', r:'TRES veces al día (6:10)'},
  {cap:'d6', f:'Hacia dónde daban sus ventanas', r:'Hacia Jerusalén (6:10)'},
  {cap:'d6', f:'La frase final de Daniel 6:10', r:'«...como lo solía hacer antes»'},
  {cap:'d6', f:'Con qué se selló la piedra del foso', r:'Con el anillo del rey y con el de sus príncipes (6:17)'},
  {cap:'d6', f:'Qué hizo el rey esa noche', r:'Pasó la noche en ayuno, sin instrumentos de música, y se le fue el sueño (6:18)'},
  {cap:'d6', f:'Cuándo fue el rey al foso', r:'Muy de mañana, al rayar el alba (6:19)'},
  {cap:'d6', f:'Qué respondió Daniel desde el foso', r:'«Mi Dios envió su ángel, el cual cerró la boca de los leones» (6:22)'},

  // P&R
  {cap:'pr39', f:'Título del capítulo <b>39</b> de P&R', r:'«En la corte de Babilonia»'},
  {cap:'pr39', f:'Por qué rechazaron la comida del rey', r:'Había sido ofrecida a los ídolos y violaba las leyes de Dios'},
  {cap:'pr39', f:'Qué relación hay entre cuerpo y mente', r:'Los hábitos físicos temperantes favorecen la claridad mental y espiritual'},
  {cap:'pr40', f:'Título del capítulo <b>40</b> de P&R', r:'«El sueño de Nabucodonosor»'},
  {cap:'pr40', f:'A qué recurrieron ante la sentencia de muerte', r:'A la oración, antes que a cualquier estrategia humana'},
  {cap:'pr41', f:'Título del capítulo <b>41</b> de P&R', r:'«El horno de fuego»'},
  {cap:'pr41', f:'Quién era el cuarto del horno según E. de White', r:'El Hijo de Dios mismo'},
  {cap:'pr41', f:'Qué muestra la frase «y si no»', r:'Que la obediencia no dependía de recibir el milagro'},
  {cap:'pr42', f:'Título del capítulo <b>42</b> de P&R', r:'«La verdadera grandeza»'},
  {cap:'pr42', f:'Pecado principal de Nabucodonosor', r:'El orgullo: se atribuyó la gloria que pertenecía a Dios'},
  {cap:'pr43', f:'Título del capítulo <b>43</b> de P&R', r:'«El vigía invisible»'},
  {cap:'pr43', f:'Por qué Belsasar no tenía excusa', r:'Conocía la experiencia de Nabucodonosor y aun así se rebeló'},
  {cap:'pr44', f:'Título del capítulo <b>44</b> de P&R', r:'«En el foso de los leones»'},
  {cap:'pr44', f:'Qué caracterizaba la oración de Daniel', r:'Era la fuente diaria de su fortaleza, no una emergencia'},
  {cap:'pr44', f:'Qué edad tenía Daniel en el foso', r:'Más de ochenta años'},
];

module.exports = { TARJETAS };
