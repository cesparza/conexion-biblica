/* EL CONFLICTO DE LOS SIGLOS: SUS CAPÍTULOS (v236)

   PARA QUÉ. La política de Conexión Bíblica 2027 (Asociación del Alto Magdalena)
   pide capítulos de este libro en cada categoría. La app todavía no lo trae como
   material de estudio: aquí solo están el número, el título y la página donde
   empieza cada capítulo, para nombrarlos en el concurso («24 · El Templo de Dios»).
   No hay texto del libro.

   DE DÓNDE. La edición en español de la biblioteca (Asociación Publicadora
   Interamericana, 1954; copia digital del Ministerio Evangelio Eterno), que tiene
   43 capítulos: «Capítulo N» y su título en el cuerpo del libro, y la página en el
   índice. Verificado capítulo por capítulo el 15-oct. Otras ediciones (la inglesa
   tiene 42) numeran distinto: la política usa esta. */
const CS_EDICION = 'APIA, 1954';
const CS_CAPS = [
  [1, 'El Destino del Mundo Predicho', 14], [2, 'La Fe de los Mártires', 31], [3, 'Una Era de Tinieblas Espirituales', 39],
  [4, 'Fieles Portaantorchas', 49], [5, 'El Lucero de la Reforma', 63], [6, 'Dos Héroes de la Edad Media', 77],
  [7, 'En la Encrucijada de los Caminos', 95], [8, 'Un Campeón de la Verdad', 114], [9, 'Se Enciende una Luz en Suiza', 134],
  [10, 'Progresos de la Reforma', 145], [11, 'La Protesta de los Príncipes', 154], [12, 'La Reforma en Francia', 165],
  [13, 'El Despertar de España', 186], [14, 'En los Países Bajos y Escandinavia', 203], [15, 'La Verdad Progresa en Inglaterra', 209],
  [16, 'La Biblia y la Revolución Francesa', 225], [17, 'América, Tierra de Libertad', 243], [18, 'Heraldos de una Nueva Era', 251],
  [19, 'Una Profecía Significativa', 265], [20, 'Luz a Través de las Tinieblas', 286], [21, 'Un Gran Despertar Religioso', 295],
  [22, 'Una Amonestación Rechazada', 310], [23, 'Profecías Cumplidas', 323], [24, 'El Templo de Dios', 337],
  [25, 'Jesucristo Nuestro Abogado', 348], [26, 'Los Estados Unidos en la Profecía', 355], [27, 'Una Obra de Reforma', 368],
  [28, 'La Verdadera Conversión es Esencial', 376], [29, 'El Juicio Investigador', 390], [30, 'El Origen del Mal y del Dolor', 400],
  [31, 'El Peor Enemigo del Hombre', 410], [32, '¿Quiénes Son los Ángeles?', 415], [33, 'Las Asechanzas del Enemigo', 421],
  [34, 'El Misterio de la Inmortalidad', 431], [35, '¿Pueden Hablarnos Nuestros Muertos?', 446], [36, 'La Libertad de Conciencia Amenazada', 455],
  [37, 'El Conflicto Inminente', 470], [38, 'Nuestra Única Salvaguardia', 479], [39, 'El Mensaje Final de Dios', 487],
  [40, 'El Tiempo de Angustia', 495], [41, 'La Liberación del Pueblo de Dios', 511], [42, 'La Desolación de la Tierra', 524],
  [43, 'El Fin del Conflicto', 531],
].map(([n, t, p]) => ({ n, t, p }));

module.exports = { CS_CAPS, CS_EDICION };
