const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { montar } = require('./entorno.js');
const {lamina, secciones} = require('../fuente/daniel11.js');
const datos = require('../fuente/daniel11-datos.json');
const preguntas = require('../fuente/complementos/daniel/d11.js').preguntas;
const desplegado = montar('LAMINAS, CONTENIDO');
assert.deepEqual(JSON.parse(JSON.stringify(desplegado.LAMINAS.d11)),lamina,'el recorrido servido coincide con su fuente');
assert.equal(lamina.actos.length,16);
assert.equal(new Set(lamina.actos.map(a=>a.id)).size,16);
assert.deepEqual(lamina.actos.flatMap(a=>Array.from({length:a.v.hasta-a.v.de+1},(_,i)=>a.v.de+i)),Array.from({length:45},(_,i)=>i+1),'cobertura sin saltos ni versículos repetidos');
assert.deepEqual(datos.flatMap(a=>a.frases.map(f=>f.verso)),Array.from({length:45},(_,i)=>i+1),'los 45 versículos tienen desarrollo');
for (const a of lamina.actos) {
 assert(a.pregunta.q.length>25 && a.pregunta.respuesta.length>80,'pregunta y pauta desarrolladas');
 assert(a.fuentes.length>=2 && a.fuentes[0].titulo.includes('Daniel'),'texto bíblico como primera fuente');
 assert(a.frases.every(f=>f.fuente && f.explicacion.split(/\s+/).length>=45),'cada frase tiene argumento y documentación');
 const ruta=path.join(__dirname,'../laminas',a.img.includes('/')?'':lamina.dir,a.img+'.webp');
 assert(fs.existsSync(ruta),'imagen existente: '+ruta);
 if(a.adaptable)assert(fs.existsSync(ruta.replace('.webp','-640.webp')),'variante móvil existente');
}
assert(secciones.every(s=>s.h.length<2000),'el lector conserva sus unidades breves');
assert(preguntas.every(q=>q.f==='c'),'la interpretación queda fuera del banco oficial');
assert(preguntas.some(q=>/interpretación y no como nombre/.test(q.q)),'la propuesta soviética no se examina como nombre literal');
assert([].concat(lamina.actos[5].profundiza).join(' ').includes('crucifixión') && [].concat(lamina.actos[5].profundiza).join(' ').includes('intercesión'),'la diferencia de11:22 es visible');
assert(lamina.actos[11].rot.includes('futura sin fecha'),'el futuro no recibe un año inventado');
assert.equal(lamina.actos.filter(a=>a.pregunta).length,16);
console.log('Daniel11: fuente y entrega,45versículos,16escenas,16preguntas, imágenes, banco y distinción interpretativa: TODO BIEN');
