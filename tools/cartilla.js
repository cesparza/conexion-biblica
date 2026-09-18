/* Verificador de las declaraciones de «En esto creemos».

   QUE PROBLEMA RESUELVE
   El examen del campamento pregunta la declaracion de cada creencia palabra
   por palabra. La app la tenia en la redaccion de OTRA edicion: la creencia 1
   y la 4 no coincidian con la cartilla que se evalua, y nadie se habria dado
   cuenta hasta el dia del examen. Revisar eso a ojo ya fallo antes en este
   mismo proyecto, con las citas biblicas: se declaro cerrado «corregido en
   cuatro archivos» y aparecieron quince casos mas.

   COMO
   fuente/cartilla.txt es la transcripcion de la cartilla. Este script saca
   cada declaracion de fuente/creencias.js (lo que va entre « y ») y exige que
   aparezca LITERAL alli. Normaliza acentos, mayusculas y espacios dobles,
   porque la transcripcion se escribio sin acentos y el HTML los lleva.

   Solo revisa las creencias que ya estan pasadas a la cartilla. Las que
   faltan salen listadas como pendientes, no como error: son trabajo por
   hacer, no algo roto.

   Uso:  node tools/cartilla.js          */

const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..');
const { CR_CAPS, CR_CONTENIDO } = require(path.join(RAIZ, 'fuente', 'creencias.js'));

const FUENTE = path.join(RAIZ, 'fuente', 'cartilla.txt');
const cartilla = fs.readFileSync(FUENTE, 'utf8');

const norm = t => t
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/[«»"']/g, ' ')
  .replace(/\s+/g, ' ')
  .trim().toLowerCase();

const CART = norm(cartilla);

/* La declaracion es lo que va entre comillas angulares en la PRIMERA pestaña.
   Las angulares estan reservadas en este proyecto para lo verificable, que es
   justo lo que hace este script. */
function declaracionDe(id) {
  const prim = (CR_CONTENIDO[id] || [])[0];
  if (!prim) return null;
  const m = prim.h.match(/«([^»]+)»/);
  return m ? m[1] : null;
}

let ok = 0;
const fallan = [];
const pendientes = [];

for (const c of CR_CAPS) {
  const d = declaracionDe(c.id);
  if (!d) { pendientes.push(c.id + ' (sin declaracion citada)'); continue; }
  const n = norm(d);
  /* Una declaracion que no esta en cartilla.txt puede ser de otra edicion (un
     error que hay que corregir) o de una creencia que todavia no se ha pasado
     a la cartilla (trabajo pendiente). Se distinguen por si la cartilla trae
     su seccion: si la trae y no coincide, es error. */
  const tieneSeccion = CART.includes('creencia ' + String(c.id.slice(2)).padStart(2, '0'));
  if (CART.includes(n)) ok++;
  else if (tieneSeccion) fallan.push(c.id + ' — ' + c.sub);
  else pendientes.push(c.id + ' — ' + c.sub);
}

console.log('Declaraciones verificadas contra fuente/cartilla.txt: ' + ok + ' de ' + CR_CAPS.length + '.');
if (pendientes.length) {
  console.log('\nPendientes de pasar a la cartilla (' + pendientes.length + '):');
  console.log('  ' + pendientes.join('\n  '));
}
if (fallan.length) {
  console.error('\n❌ NO coinciden con la cartilla, y la cartilla SI las trae:');
  console.error('  ' + fallan.join('\n  '));
  console.error('\nEsto es lo que se memoriza mal. Corregir fuente/creencias.js o fuente/cartilla.txt.');
  process.exit(1);
}
console.log('\n✅ Toda declaracion ya pasada a la cartilla coincide palabra por palabra.');
