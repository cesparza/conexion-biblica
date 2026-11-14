const assert = require('node:assert/strict');
const {montar} = require('./entorno.js');
const app = montar('nombre:lamNombreLibro, sesion:n=>OPC_APP.nombre=n, elegirNombre:n=>S.nombre=n, quien:(id,y)=>{lamId=id;return lamQuien(y)}');
app.sesion('Luis Miguel Herreño Bernal');
app.elegirNombre('');
assert.equal(app.nombre(),'Luis');
app.elegirNombre('Miguel Herreño');
assert.equal(app.nombre(),'Miguel');
for(const id of ['d2','d7','d8']){
 const hoy=app.quien(id,2026);assert.ok(hoy.on.length, id+': hoy tiene un período');
 assert.ok(!hoy.tx.includes('Antes de Nabucodonosor'),id+': hoy no cae en el inicio');
 assert.ok(app.quien(id,2626).fut,id+': futuro conserva su descripción');
}
console.log('Nombre de sesión, perfil elegido y cronología actual/futura: correctos');
