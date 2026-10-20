/* Daniel 9 en Cine: seis actos que se recorren con el dedo (motor: cine-app.js).
   Cada texto es literal: Daniel de biblia.js (RV1995), Esdras de la RV1995 y Elena
   de White de El Deseado de todas las gentes y El conflicto de los siglos (edición de
   la biblioteca de Camilo, con la paginación entre corchetes). `explica` solo explica
   cómo Elena de White aplica el texto; no agrega deducciones. */
const DTG = 'Elena G. de White, <i>El Deseado de todas las gentes</i>, cap. 23';
const CS = 'Elena G. de White, <i>El conflicto de los siglos</i>, cap. 18';
module.exports = {
 tipo: 'cine', libro: 'Daniel 9', titulo: 'Las setenta semanas', dir: 'd9/',
 miniF: 'gabriel', portada: 'oracion',
 invita: 'Seis escenas que se recorren con el dedo: Daniel ora, llega Gabriel, las 490 casillas, la orden de 457, el viaje de Esdras y la línea del 408 al 34.',
 actos: [
  { id: 'oracion', corto: 'Daniel ora', tipo: 'luz', alto: 4.2, imgs: ['oracion', 'gabriel'], foco2: '72% center',
    cartel: 'Setenta semanas', rot: 'Babilonia · primer año de Darío',
    v: { cap: 'd9', de: 21 }, clave: ['Gabriel', 'oración', 'sacrificio'] },
  { id: 'semanas', corto: '70 × 7', tipo: 'cuenta', alto: 3.8, rot: 'Daniel 9:24 · lo que dijo Gabriel',
    de: 70, a: 490, tramos: [49, 434, 7], nombres: ['7 semanas · 49 años', '62 semanas · 434 años', '1 semana · 7 años'],
    v: { cap: 'd9', de: 24, frase: 'Setenta semanas están determinadas sobre tu pueblo y sobre tu santa ciudad' },
    egw: [{ t: 'En la profecía, un día representa un año. Las setenta semanas, o cuatrocientos noventa días, representaban cuatrocientos noventa años.', fuente: DTG + ', p. 200' }] },
  { id: 'orden', corto: 'La orden', tipo: 'sello', alto: 3.4, img: 'decreto', fecha: '457', era: 'a.C.', rot: 'El punto de partida',
    v: { cap: 'd9', de: 25, frase: 'desde la salida de la orden para restaurar y edificar a Jerusalén hasta el Mesías Príncipe, habrá siete semanas y sesenta y dos semanas' },
    clave: ['orden', 'Jerusalén', 'Mesías', 'Príncipe'],
    otros: [{ ref: 'Esdras 7:11', ver: 'RV1995', t: 'Ésta es la copia de la carta que dio el rey Artajerjes al sacerdote Esdras, escriba versado en los mandamientos de Jehová y en sus estatutos dados a Israel:' }],
    egw: [{ t: 'Ese decreto se encuentra en el capítulo séptimo de Esdras. (Vers. 12 - 26.) Fue expedido en su forma más completa por Artajerjes, rey de Persia, en el año 457 ant. de J. C.', fuente: CS + ', p. 373' },
      { t: 'La orden de restaurar y edificar a Jerusalén, completada por el decreto de Artajerjes Longímano, entró a regir en el otoño del año 457 ant. de C.', fuente: DTG + ', p. 200' }],
    explica: 'Elena de White une «la salida de la orden» de Daniel 9:25 con la carta de Artajerjes a Esdras (Esdras 7) y le pone fecha: el otoño de 457 a.C. Desde ahí se cuentan las setenta semanas.' },
  { id: 'viaje', corto: 'El viaje', tipo: 'mapa', alto: 3.6, img: 'caravana', meses: 5, rot: '457 a.C. · la orden viaja con Esdras',
    desde: 'Babilonia', hasta: 'Jerusalén',
    otros: [{ ref: 'Esdras 7:9', ver: 'RV1995', t: 'El primer día del primer mes había dispuesto su partida de Babilonia, y el primero del mes quinto llegaba a Jerusalén. ¡La buena mano de Dios estaba con él!' }],
    clave: ['primer', 'quinto', 'Jerusalén'] },
  { id: 'linea', corto: '408 al 34', tipo: 'via', alto: 6, inicio: '457 a.C.',
    estaciones: [
     { n: 49, fecha: '408 a.C.', img: 'restauracion', rot: '7 semanas · 49 años',
       v: { cap: 'd9', de: 25, frase: 'se volverán a edificar la plaza y el muro en tiempos angustiosos' },
       nota: 'La fecha 408 a.C. está en el diagrama de los 2.300 días.', fuente: CS + ', p. 374' },
     { n: 483, fecha: '27 d.C.', img: 'jordan', rot: '69 semanas · 483 años · el Ungido',
       v: { cap: 'd9', de: 25, frase: 'hasta el Mesías Príncipe, habrá siete semanas y sesenta y dos semanas' },
       egw: [{ t: 'En el año 27 de nuestra era, Jesús, en ocasión de su bautismo, recibió la unción del Espíritu Santo, y poco después empezó su ministerio.', fuente: DTG + ', p. 200' }] },
     { n: 486.5, fecha: '31 d.C.', img: 'cruz', rot: 'A la mitad de la semana',
       v: { cap: 'd9', de: 27, frase: 'a la mitad de la semana hará cesar el sacrificio y la ofrenda' },
       egw: [{ t: 'En la primavera del año 31 de nuestra era, Cristo, el verdadero sacrificio, fué ofrecido en el Calvario.', fuente: DTG + ', p. 200' }] },
     { n: 490, fecha: '34 d.C.', img: 'testigos', rot: 'Se cumplen los 490 años',
       v: { cap: 'd9', de: 27, frase: 'Por otra semana más confirmará el pacto con muchos' },
       egw: [{ t: 'La semana—siete años—terminó en el año 34 de nuestra era. Entonces, por el apedreamiento de Esteban, los judíos sellaron finalmente su rechazamiento del Evangelio', fuente: DTG + ', pp. 200-201' }] }
    ] },
  { id: 'dosmil', corto: 'Los 2.300', tipo: 'barra', alto: 3, cartel: 'Los 490 años eran solo el comienzo', rot: 'Daniel 8:14 · Daniel 9:24',
    total: 2300, parte: 490, marcas: ['457 a.C.', '34 d.C.', '1844'],
    v: { cap: 'd8', de: 14 },
    egw: [{ t: 'las setenta semanas deben por consiguiente formar parte de los 2.300 días, y ambos períodos deben comenzar juntos.', fuente: CS + ', p. 373' },
      { t: 'El período completo de los 2.300 días se extendía de 457 ant. de J. C. hasta 1844 de nuestra era, cuando se inició en el cielo el juicio investigador.', fuente: CS + ', p. 374' }] }
 ]
};
