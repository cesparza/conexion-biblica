const assert=require('node:assert/strict');
const catalogo=require('../fuente/nombres-personajes.json');
const {normalizarNombre,nombresHTML}=require('../fuente/nombres-personajes.cjs');
const {PERSONAJES}=require('../fuente/personajes.js');
const {montar}=require('./entorno.js');
const servido=montar('PERSONAJES').PERSONAJES;
assert.deepEqual(JSON.parse(JSON.stringify(servido)),PERSONAJES,'la entrega conserva el catálogo canónico');
assert.equal(new Set(PERSONAJES.map(p=>p.id)).size,PERSONAJES.length);
for(const p of PERSONAJES){
 assert.deepEqual(normalizarNombre(p,catalogo),p,'normalizar dos veces conserva '+p.id);
 assert(Array.isArray(p.nombres.variantes));
 assert(!p.alias.some(a=>typeof a==='string'&&/[\u05d0-\u05ea]/.test(a)),'no introducir alias sin contexto en el lector: '+p.id);
}
for(const [nombre,f] of Object.entries(catalogo.formas)){
 assert(f.nombre&&f.escritura&&f.transliteracion,nombre);
 assert(/^[HG]\d+$/.test(f.strong));
 assert(['hebreo','arameo','griego'].includes(f.idioma));
 assert((f.idioma==='griego'?/[\u0370-\u03ff\u1f00-\u1fff]/:/[\u05d0-\u05ea]/).test(f.escritura));
}
const uno=id=>PERSONAJES.find(p=>p.id===id);
assert.equal(uno('moises').nombres.formas[0].escritura,'מֹשֶׁה');
assert.equal(uno('pablo').nombres.formas.find(f=>f.idioma==='hebreo').nombre,'Saulo');
assert(uno('pablo').nombres.formas.some(f=>f.nombre==='Pablo'&&f.idioma==='griego'));
assert(uno('persona-jesus').nombres.formas.some(f=>f.strong==='H3442'&&f.equivalenciaGriega==='G2424'));
for(const id of PERSONAJES.filter(p=>p.tipo!=='biblico').map(p=>p.id))assert.equal(uno(id).nombres.formas.length,0,'no inventar hebreo para '+id);
const joacim=normalizarNombre({id:'juda-joacim',nombre:'Eliaquim, llamado Joacim',alias:['Eliaquim','Joacim']},catalogo);
assert.equal(joacim.nombre,'Joacim (Eliaquim)');assert(joacim.alias.includes('Eliaquim'));
assert(joacim.nombres.formas.some(f=>f.nombre==='Joacim'));
const oded=normalizarNombre({id:'persona-oded-samaria',nombre:'Obed (Oded)',alias:['Obed','Oded']},catalogo);
assert.equal(oded.nombres.formas[0].strong,'H5752');assert(!oded.nombres.formas.some(f=>f.strong==='H5744'));
const peligro=normalizarNombre({id:'sin-forma',nombre:'Nombre',alias:['<img src=x onerror=alert(1)>']},catalogo);
assert(!nombresHTML(peligro).includes('<img'));
assert(nombresHTML(uno('moises')).includes('dir="rtl" lang="he"'));
assert(nombresHTML(uno('pedro')).includes('dir="ltr" lang="grc"'));
assert(uno('pedro').alias.includes('Simón Pedro')&&uno('pedro').alias.includes('Cefas'));
assert(!uno('pedro').alias.includes('Simón'),'se conserva el calificador del nombre ambiguo');
console.log('Nombres: '+PERSONAJES.length+' identidades, '+Object.keys(catalogo.formas).length+' formas documentadas; alias, homónimos, idiomas, HTML y fuente publicada coherentes.');
