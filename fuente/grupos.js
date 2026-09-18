/* GRUPOS — la dimension de arriba de cada actividad.

   PARA QUE SIRVE
   Un capitulo declara a que grupo pertenece con su campo `doc`, y con eso el
   juego de clasificar funciona sin saber nada del contenido. Es el mismo
   criterio del ADR-01: una dimension por concepto, y la de arriba se declara
   primero.

   POR QUE ESTA TABLA Y NO UNA POR ACTIVIDAD
   Porque el juego es uno solo. Tres tablas serian tres mecanismos para el
   mismo concepto, que es el olor que este proyecto persigue. Los ids llevan
   prefijo por actividad (dt = doctrinas, dn = Daniel) y por eso no chocan.

   COMO SE AGREGA UNA ACTIVIDAD
   Se agregan sus grupos aqui y se le pone `doc` a sus capitulos. Nada mas:
   clasificar aparece solo donde hay grupos, y desaparece donde no. */

const { DOCTRINAS } = require('./creencias.js');

/* Daniel se divide como se ensena y como lo pregunta el concurso: la primera
   mitad son RELATOS (lo que les paso a Daniel y a sus companeros) y la segunda
   son VISIONES (lo que Daniel vio). Profetas y Reyes es otra fuente, no otra
   parte del libro, y por eso va aparte. */
const GRUPOS_DANIEL = [
  { id:'dn1', n:1, nombre:'Relatos (Daniel 1 a 6)',
    color:'#0F766E', icono:'📜' },
  { id:'dn2', n:2, nombre:'Visiones (Daniel 7 a 12)',
    color:'#7C3AED', icono:'👁️' },
  { id:'dn3', n:3, nombre:'Profetas y Reyes',
    color:'#B45309', icono:'✍️' },
];

/* Que grupo le toca a un capitulo de Daniel, sacado del id: no hace falta una
   lista aparte que mantener sincronizada. */
function grupoDaniel(id) {
  if (/^pr\d+$/.test(id)) return 'dn3';
  const m = /^d(\d+)$/.exec(id);
  if (!m) return null;
  return Number(m[1]) <= 6 ? 'dn1' : 'dn2';
}

const GRUPOS = [...DOCTRINAS, ...GRUPOS_DANIEL];

module.exports = { GRUPOS, GRUPOS_DANIEL, grupoDaniel };
