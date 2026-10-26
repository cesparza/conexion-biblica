import assert from 'node:assert/strict';
import {PERSONAS_DINASTIAS as personas,VINCULOS_DINASTIAS as vinculos,ETAPAS_DINASTIAS as etapas,FUENTES_DINASTIAS as fuentes,familiaDinastica as familia,hogarDinastico as hogar} from '../fuente/daniel11-dinastias.js';
const ids=new Set(personas.map(p=>p.id));assert.equal(ids.size,14);assert.equal(personas.length,14);
for(const p of personas){assert.ok(p.resumen.length>60);for(const f of p.fuentes)assert.ok(fuentes[f]);}
const firmas=new Set();
for(const v of vinculos){assert.ok(ids.has(v.desde)&&ids.has(v.hasta));assert.notEqual(v.desde,v.hasta);assert.ok(v.fuentes.length);for(const f of v.fuentes)assert.ok(fuentes[f]);const firma=[v.desde,v.hasta,v.tipo].join(':');assert.ok(!firmas.has(firma));firmas.add(firma);}
function revisar(id,camino=[]){assert.ok(!camino.includes(id),'parentage has no cycles');for(const hijo of familia(id).hijos)revisar(hijo,[...camino,id]);}
for(const id of ids)revisar(id);
assert.deepEqual(familia('berenice'),{padres:['tolomeo-ii'],parejas:['antioco-ii'],hijos:['hijo-berenice']});
assert.deepEqual(familia('seleuco-ii').padres,['antioco-ii','laodice']);
assert.deepEqual(familia('hijo-berenice').padres,['antioco-ii','berenice']);
assert.deepEqual(familia('seleuco-iii').padres,familia('antioco-iii').padres,'successor brothers share a parent');
assert.ok(!familia('seleuco-iii').hijos.includes('antioco-iii'),'succession must not invent parenthood');
assert.ok(!familia('tolomeo-iii').hijos.includes('berenice'),'Berenice is a sister, not a daughter');
assert.ok(!familia('tolomeo-i').hijos.includes('seleuco-i'),'political collaboration is not ancestry');
for(const e of etapas)assert.ok(ids.has(e.sur)&&ids.has(e.norte)&&ids.has(e.foco));
assert.deepEqual(etapas.map(e=>[e.sur,e.norte]),[['tolomeo-i','seleuco-i'],['tolomeo-ii','antioco-ii'],['tolomeo-iii','seleuco-ii'],['tolomeo-iv','antioco-iii'],['tolomeo-v','antioco-iii']]);
assert.deepEqual(hogar('antioco-ii','berenice').hijos,['hijo-berenice']);
assert.deepEqual(hogar('antioco-ii','laodice').hijos,['seleuco-ii']);
assert.throws(()=>hogar('antioco-ii','tolomeo-ii'),RangeError);
assert.throws(()=>familia('desconocido'),RangeError);
console.log('Daniel11 dinastías: 14 identidades, 15 vínculos con fuentes, ramas maternas y sucesión separadas; sin ciclos.');
