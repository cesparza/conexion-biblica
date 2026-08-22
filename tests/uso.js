// Simula el recorrido de un usuario contra el JS real del index.html
const fs=require('fs'),path=require('path');
const RAIZ=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(RAIZ,'index.html'),'utf8');
const js=html.match(/<script>([\s\S]*)<\/script>/)[1];

let store={};
const nodo=()=>({classList:{add(){},remove(){},toggle(){}},value:'',textContent:'',innerHTML:'',style:{},outerHTML:''});
const stub=`
let localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
let document={querySelectorAll:()=>({forEach(){}}),getElementById:()=>nodo(),querySelector:()=>nodo()};
let window={scrollTo(){}};
let setInterval=()=>0, clearInterval=()=>{}, confirm=()=>true;
`;
const fn=new Function('store','nodo',stub+js+`
return {S:()=>S, ponCat, capsDe, modsDe, tarjetasDe, buscaItem, armar, bien, limpia,
        avanza, listo, sumaRacha, revisaInsignias, mezcla, CAPS, MODULOS, TARJETAS, CONT_MODULOS, CONTENIDO,
        claveQ, claveT, falladasDe, bancoDe, tjBaraja, filtraTj, mazoActual:()=>mazo, normalizar};`);
const A=fn(store,nodo);

let f=0; const ok=(c,m)=>{console.log((c?'✅':'❌')+' '+m); if(!c)f++;};

// Aventureros
A.ponCat('av');
ok(A.capsDe().length===7,'Aventureros ve 7 capítulos');
ok(A.modsDe().length===6,'Aventureros ve 6 módulos de repaso ('+A.modsDe().length+')');
ok(A.tarjetasDe().length===57,'Aventureros: 57 tarjetas');
ok(!A.capsDe().some(c=>['d4','d5'].includes(c.id)),'Aventureros NO ve Daniel 4 ni 5');
ok(!A.modsDe().some(m=>['m-reyes','m-profetico'].includes(m.id)),'Aventureros NO ve módulos avanzados');

// Guías Mayores
A.ponCat('gm');
ok(A.capsDe().length===12,'Guías Mayores ve 12 capítulos');
ok(A.modsDe().length===8,'Guías Mayores ve 8 módulos');
ok(A.tarjetasDe().length===81,'Guías Mayores: 81 tarjetas');

// buscaItem resuelve ambos tipos
ok(A.buscaItem('d1')&&A.buscaItem('d1').label==='Daniel 1','buscaItem encuentra un capítulo');
ok(A.buscaItem('m-trampas')&&A.buscaItem('m-trampas').label==='Trampas','buscaItem encuentra un módulo');
ok(A.buscaItem('inexistente')===undefined,'buscaItem devuelve undefined si no existe');

// Contenido de cada módulo accesible
ok(A.MODULOS.every(m=>A.CONT_MODULOS[m.id]),'Todo módulo tiene contenido cargado');

// Recorrido completo: marcar todo como estudiado
A.ponCat('av');
[...A.capsDe(),...A.modsDe()].forEach(x=>A.avanza(x.id,100));
A.revisaInsignias(100);
const S=A.S();
ok(S.insignias.includes('Lector completo'),'Insignia "Lector completo" al terminar capítulos Y módulos');
ok(S.insignias.includes('Perfecto'),'Insignia "Perfecto" con 100%');

// El progreso de módulos persiste
ok(S.prog['m-trampas']===100,'El progreso de un módulo se guarda');

// Examen sigue sano con banco ampliado
for(const cat of ['av','gm']){
  A.ponCat(cat);
  let malo=0;
  for(let i=0;i<200;i++){
    const p=A.armar();
    if(p.length!==(cat==='av'?15:25))malo++;
    if(new Set(p).size!==p.length)malo++;
  }
  ok(malo===0,`Categoría ${cat}: 200 exámenes correctos con el banco de 144`);
}

// Normalización de respuestas con el banco nuevo
ok(A.limpia('  Jerusalén  ')==='jerusalen','limpia() quita tildes y espacios');

// ── Funciones nuevas: errores, repetición espaciada, puntos débiles ──

// Claves estables sin colisiones
const {BANCO}=require(path.join(RAIZ,'fuente','preguntas.js'));
ok(new Set(BANCO.map(A.claveQ)).size===BANCO.length,'claveQ: sin colisiones en el banco');
ok(new Set(A.TARJETAS.map(A.claveT)).size===A.TARJETAS.length,'claveT: sin colisiones en tarjetas');

// Examen de solo-lo-que-fallé
A.ponCat('gm');
const seed=A.bancoDe().slice(0,5);
seed.forEach(q=>A.S().fq[A.claveQ(q)]={m:1});
ok(A.falladasDe().length===5,'falladasDe() cuenta las preguntas falladas');
const exErr=A.armar('errores');
const setSeed=new Set(seed.map(A.claveQ));
ok(exErr.length===5&&exErr.every(q=>setSeed.has(A.claveQ(q))),'armar("errores") usa solo las preguntas falladas');
seed.forEach(q=>delete A.S().fq[A.claveQ(q)]);

// Repetición espaciada: las dominadas (caja 2) salen al final
A.ponCat('av');
const tjs=A.tarjetasDe();
A.S().ft[A.claveT(tjs[0])]=2;
A.S().ft[A.claveT(tjs[1])]=2;
A.filtraTj('todas');
const cajaDe=t=>A.S().ft[A.claveT(t)]||0;
const orden=A.mazoActual().map(cajaDe);
ok(orden.length===tjs.length&&orden.every((c,i)=>i===0||c>=orden[i-1]),
  'tjBaraja(): mazo ordenado por caja (falladas primero, dominadas al final)');

// El filtro «solo por dominar» excluye las dominadas
A.filtraTj('dificiles');
ok(A.mazoActual().length===tjs.length-2&&A.mazoActual().every(t=>cajaDe(t)<2),
  'Filtro «por dominar» excluye las tarjetas dominadas');

// normalizar conserva y sanea los campos nuevos
const n1=A.normalizar({fq:{a:{m:3},b:{m:-1},c:'roto'},ft:{x:2,y:99,z:'no'},acc:{d1:{b:5,m:2},zz:{b:1,m:1}}});
ok(n1.fq.a.m===3&&!n1.fq.b&&!n1.fq.c,'normalizar: fq conserva fallos válidos y bota lo dañado');
ok(n1.ft.x===2&&n1.ft.y===2&&!('z' in n1.ft),'normalizar: ft acota cajas a 0-2');
ok(n1.acc.d1.b===5&&n1.acc.d1.m===2&&!n1.acc.zz,'normalizar: acc solo acepta capítulos reales');

console.log('\n'+(f===0?'RECORRIDO DE USO: TODO BIEN':f+' FALLOS'));
process.exit(f?1:0);
