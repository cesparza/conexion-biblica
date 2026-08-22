// Simula el recorrido de un usuario contra el JS real del index.html
const fs=require('fs'),path=require('path');
const RAIZ=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(RAIZ,'index.html'),'utf8');
const js=html.match(/<script>([\s\S]*)<\/script>/)[1];

let store={};
const nodo=()=>({classList:{add(){},remove(){},toggle(){}},value:'',textContent:'',innerHTML:'',style:{},outerHTML:''});
/* El stub imita lo mínimo del navegador que usa la app. querySelectorAll
   devuelve un arreglo de verdad porque el código indexa el resultado
   (los botones del nav), no solo lo recorre. */
const stub=`
let localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
/* getElementById devuelve siempre el MISMO nodo por id. Antes devolvía uno
   nuevo cada vez, así que un valor escrito en un campo no se podía volver a
   leer y el recorrido de la bienvenida no era comprobable. */
let cacheEl={};
let document={
  body:nodo(),
  querySelectorAll:()=>[nodo(),nodo(),nodo(),nodo(),nodo()],
  getElementById:id=>(cacheEl[id]=cacheEl[id]||nodo()),
  querySelector:()=>nodo(),
};
let window={scrollTo(){}};
let setInterval=()=>0, clearInterval=()=>{}, confirm=()=>true;
let navigator={};
let Blob=function(){}, URL={createObjectURL:()=>'blob:x'};
let btoa=s=>Buffer.from(s,'binary').toString('base64');
let atob=s=>Buffer.from(s,'base64').toString('binary');
`;
const fn=new Function('store','nodo','Buffer',stub+js+`
return {S:()=>S, ponCat, capsDe, modsDe, tarjetasDe, buscaItem, armar, bien, limpia,
        avanza, listo, sumaRacha, revisaInsignias, mezcla, CAPS, MODULOS, TARJETAS, CONT_MODULOS, CONTENIDO,
        claveQ, claveT, falladasDe, bancoDe, tjBaraja, filtraTj, mazoActual:()=>mazo, normalizar,
        poolDe, opcionesCuantas, segundosPara,
        ponAlcance:v=>{alcance=v}, ponCuantas:v=>{cuantas=v}, alcanceActual:()=>alcance,
        barajaOpciones, CATS, CAT, poolNivel, nivelRecomendado, NPREG,
        ponNivel:v=>{nivel=v},
        DB:()=>DB, alumnos, cambiaAlumno, agregaAlumno, normalizarDB, ponNombre,
        esNuevo, bvSigue, bvEdad, bvEvento, bvPaso, ir,
        codigoResumen, codigoCompleto, leeCodigo, resumenDe, tarjetasDe,
        leeReceta, escribeReceta, huellaBanco, prng, mezclaR, armar,
        ponRnd:f=>{rndEx=f}, rndNormal:()=>{rndEx=Math.random},
        claveQ, BANCO,
        el:id=>document.getElementById(id)};`);
const A=fn(store,nodo,Buffer);

let f=0; const ok=(c,m)=>{console.log((c?'✅':'❌')+' '+m); if(!c)f++;};

// Aventureros
A.ponCat('av');
ok(A.capsDe().length===7,'Aventureros ve 7 capítulos');
ok(A.modsDe().length===9,'Aventureros ve 9 módulos de repaso ('+A.modsDe().length+')');
ok(A.tarjetasDe().length===57,'Aventureros: 57 tarjetas');
ok(!A.capsDe().some(c=>['d4','d5'].includes(c.id)),'Aventureros NO ve Daniel 4 ni 5');
ok(!A.modsDe().some(m=>['m-reyes','m-profetico'].includes(m.id)),'Aventureros NO ve módulos avanzados');

// Guías Mayores
A.ponCat('gm');
ok(A.capsDe().length===12,'Guías Mayores ve 12 capítulos');
ok(A.modsDe().length===11,'Guías Mayores ve 11 módulos');
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

// ── Menú de examen: alcance, cantidad y proporción ──
A.ponCat('gm');
A.ponAlcance('todo');
const totalGM=A.poolDe().length;
A.ponAlcance('biblia');
const soloBiblia=A.poolDe();
ok(soloBiblia.length>0&&soloBiblia.every(q=>q.cap.charAt(0)==='d'),'Alcance «solo Daniel» trae únicamente capítulos bíblicos');
A.ponAlcance('pr');
const soloPR=A.poolDe();
ok(soloPR.length>0&&soloPR.every(q=>q.cap.slice(0,2)==='pr'),'Alcance «solo P&R» trae únicamente capítulos de Profetas y Reyes');
ok(soloBiblia.length+soloPR.length===totalGM,'Los dos alcances suman el banco completo');

A.ponAlcance('d1');
const soloD1=A.poolDe();
ok(soloD1.length>0&&soloD1.every(q=>q.cap==='d1'),'Alcance por capítulo filtra bien (Daniel 1)');

// La cantidad pedida se respeta y nunca pasa del disponible
A.ponAlcance('todo');
let malCant=0;
for(const n of [10,15,25,40,60]){
  A.ponCuantas(n);
  for(let i=0;i<40;i++){
    const p=A.armar('normal');
    if(p.length!==Math.min(n,A.poolDe().length))malCant++;
    if(new Set(p).size!==p.length)malCant++;
  }
}
ok(malCant===0,'El examen respeta la cantidad elegida (10 a 60) sin repetir preguntas');

// Un alcance pequeño no rompe: entrega todo lo que hay
A.ponAlcance('pr44');
A.ponCuantas(100);
const chico=A.armar('normal');
ok(chico.length===A.poolDe().length&&chico.length>0,'Si piden más preguntas que las disponibles, entrega todas las que hay');

// Las opciones de cantidad nunca exceden el pool
A.ponAlcance('d1');
ok(A.opcionesCuantas().every(n=>n<=A.poolDe().length),'Las opciones de cantidad caben en el alcance');

// El tiempo escala con el número de preguntas
ok(A.segundosPara(25)>A.segundosPara(10)&&A.segundosPara(10)>=300,'El tiempo del examen escala con la cantidad');
A.ponAlcance('todo');A.ponCuantas(25);

// ── Barajado de opciones: la correcta no se queda en una sola letra ──
A.ponCat('gm');A.ponAlcance('todo');A.ponCuantas(60);
const letras={0:0,1:0,2:0,3:0};
let textoOk=true;
for(let i=0;i<40;i++){
  for(const q of A.armar('normal').filter(x=>x.t==='mc')){
    letras[q.a]++;
    // la opción marcada como correcta debe seguir siendo el mismo texto
    const orig=BANCO.find(o=>(o.q||'')===(q.q||'')&&o.cap===q.cap);
    if(orig&&orig.o[orig.a]!==q.o[q.a])textoOk=false;
  }
}
const tot=Object.values(letras).reduce((a,b)=>a+b,0);
const minimo=Math.min(...Object.values(letras));
ok(textoOk,'Al barajar opciones, la respuesta correcta sigue siendo el mismo texto');
ok(minimo>tot*0.15,'La respuesta correcta se reparte entre las cuatro letras (mínimo '+
  Math.round(minimo/tot*100)+'% por letra)');
const qm=BANCO.find(q=>q.t==='mc');
ok(A.barajaOpciones({...qm}).o.slice().sort().join('|')===qm.o.slice().sort().join('|'),
  'barajaOpciones no pierde ni duplica opciones');
A.ponCuantas(25);

// ── Las cuatro categorías del reglamento ──
const ESPERADO={
  me:{caps:['Daniel 1','Daniel 2','Daniel 3','Daniel 6'], pr:false},
  av:{caps:['Daniel 1','Daniel 2','Daniel 3','Daniel 6','P&R 39','P&R 41','P&R 44'], pr:true},
  pa:{caps:['Daniel 1','Daniel 2','Daniel 3','Daniel 6','P&R 39','P&R 41','P&R 44'], pr:true},
};
for(const [k,e] of Object.entries(ESPERADO)){
  A.ponCat(k);
  const labels=A.capsDe().map(c=>c.label);
  ok(labels.length===e.caps.length && e.caps.every(l=>labels.includes(l)),
    `Categoría ${k}: alcance exacto del reglamento (${labels.join(', ')})`);
  ok(!labels.some(l=>['Daniel 4','Daniel 5','P&R 40','P&R 42','P&R 43'].includes(l)),
    `Categoría ${k}: no incluye lo que el reglamento deja fuera`);
}

// 4 a 6 años: sin completar y solo nivel básico
A.ponCat('me');
A.ponAlcance('todo');A.ponNivel(0);
ok(A.poolNivel().every(q=>q.t!=='fill'),'Menores: el examen no trae sección de completar');
ok(A.poolNivel().every(q=>(q.nv||1)===1),'Menores: solo preguntas de nivel básico');
ok(A.NPREG()===10,'Menores: examen de práctica de 10 preguntas');

// Padres: arrancan en avanzado sin necesidad de rampa
A.ponCat('pa');
ok(A.nivelRecomendado()===3,'Padres y consejeros: arrancan en nivel avanzado');
ok(A.NPREG()===25,'Padres y consejeros: examen de práctica de 25 preguntas');
ok(A.poolNivel().some(q=>q.t==='fill'),'Padres: sí incluye completar el versículo');

// Guías Mayores conserva el alcance ampliado
A.ponCat('gm');
ok(A.capsDe().length===12,'Guías Mayores conserva los 12 capítulos del alcance ampliado');

// Los títulos de P&R que se muestran en las tarjetas son los verificados
const TITULOS={pr39:'En la corte de Babilonia',pr40:'El sueño de Nabucodonosor',
  pr41:'El horno de fuego',pr42:'La verdadera grandeza',
  pr43:'El vigía invisible',pr44:'En el foso de los leones'};
const malos=Object.entries(TITULOS).filter(([id,t])=>
  (A.CAPS.find(c=>c.id===id)||{}).sub!==t).map(([id])=>id);
ok(malos.length===0,'Los subtítulos de P&R son los títulos verificados'+
  (malos.length?' — mal: '+malos.join(', '):''));
A.ponCat('gm');A.ponAlcance('todo');A.ponCuantas(25);A.ponNivel(0);

// ── Varios participantes: cada uno con su progreso ──
A.ponCat('av'); A.ponNombre('Uno'); A.avanza('d1',100);
A.agregaAlumno(); A.ponNombre('Dos'); A.ponCat('dm2');
ok(A.alumnos().length===2,'Se pueden crear varios participantes');
ok(A.S().nombre==='Dos' && A.S().cat==='dm2','Al agregar, queda activo el nuevo con su propia categoría');
ok((A.S().prog.d1||0)===0,'El participante nuevo NO hereda el progreso del anterior');

const ids=A.alumnos().map(([id])=>id);
A.cambiaAlumno(ids[0]);
ok(A.S().nombre==='Uno' && A.S().prog.d1===100,'Al volver al primero, su progreso sigue intacto');

// Los errores de uno no aparecen en el otro
const q0=A.bancoDe()[0];
A.S().fq[A.claveQ(q0)]={m:2};
const errUno=A.falladasDe().length;
A.cambiaAlumno(ids[1]);
ok(errUno>0 && A.falladasDe().length===0,'Los errores por repasar son de cada participante');
A.cambiaAlumno(ids[0]);

// El contenedor tolera basura y migra el formato viejo de un solo alumno
const db1=A.normalizarDB(null);
ok(Object.keys(db1.alumnos).length===1 && db1.activo,'normalizarDB crea un participante por defecto');
const db2=A.normalizarDB({nombre:'Legado',cat:'gm',racha:5});
const primero=Object.values(db2.alumnos)[0];
ok(Object.keys(db2.alumnos).length===1 && primero.nombre==='Legado' && primero.racha===5,
  'normalizarDB migra el formato viejo de un solo alumno');
const db3=A.normalizarDB({activo:'zz',alumnos:{x:{nombre:'A'},y:{nombre:'B'}}});
ok(Object.keys(db3.alumnos).length===2 && db3.alumnos[db3.activo],
  'normalizarDB corrige un activo que no existe');
const muchos={alumnos:{}};
for(let i=0;i<30;i++)muchos.alumnos['k'+i]={nombre:'n'+i};
ok(Object.keys(A.normalizarDB(muchos).alumnos).length<=12,'normalizarDB no pasa de 12 participantes');


/* ───────── bienvenida ─────────
   Es el punto donde más se puede perder el concurso sin darse cuenta: si un
   niño de cinco años queda con la categoría de siete a nueve, estudia el
   material equivocado durante semanas y nadie lo nota hasta el examen. */

/* Arranque limpio: un solo participante, sin nombre y sin progreso. */
store={};
const B=fn(store,nodo,Buffer);
ok(B.esNuevo(),'Un usuario recién llegado se detecta como nuevo');

/* Sin nombre no avanza: el nombre es lo que separa una ficha de otra. */
B.bvSigue();
ok(B.el('bv-err').textContent.length>0,'Sin nombre, la bienvenida no deja seguir');

B.el('bv-nombre').value='Isabella';
B.bvSigue();
ok(B.S().nombre==='Isabella','El nombre queda guardado en el paso 1');

/* Edad + evento definen la categoría. Nadie escoge «av» ni «dm1» a mano. */
B.bvEdad('me'); B.bvEvento('cb');
ok(B.S().cat==='me','4 a 6 años en Conexión Bíblica queda en Menores');
ok(B.capsDe().every(c=>c.id.charAt(0)==='d'),'Menores solo ve capítulos de Daniel');
ok(!B.esNuevo(),'Después de la bienvenida ya no se considera usuario nuevo');

store={};
const C=fn(store,nodo,Buffer);
C.el('bv-nombre').value='Camilo';
C.bvSigue(); C.bvEdad('me'); C.bvEvento('dm');
ok(C.S().cat==='dm1','4 a 6 años en matutina queda en Matutina menores');

store={};
const D=fn(store,nodo,Buffer);
D.el('bv-nombre').value='Ana';
D.bvSigue(); D.bvEdad('av'); D.bvEvento('dm');
ok(D.S().cat==='dm2','7 a 9 años en matutina queda en Matutina Aventureros');

/* Los adultos no tienen categoría en la matutina: el reglamento solo abre
   4 a 6 y 7 a 9, así que para ellos no hay paso 3. */
store={};
const E=fn(store,nodo,Buffer);
E.el('bv-nombre').value='Papá';
E.bvSigue(); E.bvEdad('pa');
ok(E.S().cat==='pa','Un adulto queda en Padres y consejeros sin pasar por el paso 3');

store={};
const G=fn(store,nodo,Buffer);
G.el('bv-nombre').value='Guía';
G.bvSigue(); G.bvEdad('gm');
ok(G.S().cat==='gm','Guía Mayor queda en su categoría directamente');

/* Quien compite en los dos eventos necesita dos fichas: el progreso de
   Daniel y el de la matutina son cuentas separadas. */
store={};
const H=fn(store,nodo,Buffer);
H.el('bv-nombre').value='María Camila';
H.bvSigue(); H.bvEdad('av'); H.bvEvento('dos');
const fichas=H.alumnos().map(([,al])=>al.cat).sort();
ok(H.alumnos().length===2,'«En los dos» crea dos fichas de estudio');
ok(fichas.join(',')==='av,dm2','Las dos fichas son Aventureros y Matutina Aventureros');
ok(H.alumnos().every(([,al])=>al.nombre==='María Camila'),'Las dos fichas llevan el mismo nombre');

/* Un usuario que ya tiene progreso nunca debe volver a ver la bienvenida. */
store={};
const I=fn(store,nodo,Buffer);
I.ponNombre('Con progreso');
ok(!I.esNuevo(),'Con nombre guardado ya no se muestra la bienvenida');


/* ───────── códigos de progreso ─────────
   Son dos códigos con propósitos distintos y el riesgo está en confundirlos:
   el resumen no debe poder escribir nada, y la ficha completa no debe perder
   nada al ir y volver. */
store={};
const J=fn(store,nodo,Buffer);
J.ponNombre('Isabella');
J.ponCat('av');
J.S().prog.d1=100; J.S().prog.d2=100; J.S().racha=4;
J.S().examenes=[{pts:11,total:15,cat:'av',fecha:'2026-08-20',modo:'normal',nv:1},
                {pts:14,total:15,cat:'av',fecha:'2026-08-21',modo:'normal',nv:2}];
const qJ=J.bancoDe()[0];
J.S().fq[J.claveQ(qJ)]={m:2};
J.tarjetasDe().slice(0,9).forEach(t=>{J.S().ft[J.claveT(t)]=2});

const cRes=J.codigoResumen();
const cFull=J.codigoCompleto();
ok(cRes.startsWith('CB1R'),'El código de resumen empieza en CB1R');
ok(cFull.startsWith('CB1F'),'El código completo empieza en CB1F');

/* El resumen tiene que caber en un mensaje de chat. Si un día crece, esta
   prueba avisa antes de que alguien intente pegar 4.000 caracteres. */
ok(cRes.length<700,'El resumen cabe en un mensaje de chat ('+cRes.length+' caracteres)');
ok(cFull.length>cRes.length,'El código completo es más grande que el resumen');

const leidoR=J.leeCodigo(cRes);
ok(leidoR&&leidoR.tipo==='R','El resumen se reconoce como resumen');
ok(leidoR.n==='Isabella'&&leidoR.c==='av','El resumen trae el nombre y la categoría');
ok(leidoR.e.length===2&&leidoR.r===4,'El resumen trae los exámenes y la racha');
ok(leidoR.f===1&&leidoR.d===9,'El resumen trae los errores pendientes y las tarjetas dominadas');

/* Lo que NO debe traer: el resumen es para ver, no para restaurar. Si llevara
   el estado completo, pegarlo en un chat expondría todo y además invitaría a
   usarlo para importar, que es lo que no queremos. */
ok(!leidoR.a&&!leidoR.fq&&!leidoR.ft,'El resumen no lleva el estado completo');

const leidoF=J.leeCodigo(cFull);
ok(leidoF&&leidoF.tipo==='F','El código completo se reconoce como ficha completa');
const rest=J.normalizar(leidoF.a);
ok(rest.nombre==='Isabella'&&rest.cat==='av'&&rest.prog.d1===100&&rest.racha===4,
  'La ficha completa se restaura con nombre, categoría, progreso y racha');
ok(rest.examenes.length===2,'La ficha completa conserva el historial de exámenes');
ok(Object.keys(rest.fq).length===1&&Object.values(rest.ft).filter(v=>v>=2).length===9,
  'La ficha completa conserva los errores y las tarjetas dominadas');

/* Un código roto no puede tumbar la app ni pasar como bueno. */
ok(J.leeCodigo('')===null,'Un código vacío se rechaza');
ok(J.leeCodigo('CB1Rbasura!!!')===null,'Un código con basura se rechaza');
ok(J.leeCodigo('CB1X'+cRes.slice(4))===null,'Un prefijo desconocido se rechaza');
ok(J.leeCodigo(cRes.slice(0,cRes.length-20))===null,'Un código cortado se rechaza');
ok(J.leeCodigo('hola, mira como voy')===null,'Un texto cualquiera se rechaza');

/* WhatsApp mete saltos de línea y espacios al copiar y pegar. */
const partido=cRes.slice(0,40)+'\n '+cRes.slice(40,90)+'\n'+cRes.slice(90);
const leidoP=J.leeCodigo(partido);
ok(leidoP&&leidoP.n==='Isabella','Un código con saltos de línea y espacios se lee igual');

/* Tildes y eñes: si el nombre se rompe al codificar, el boletín sale mal. */
store={};
const K=fn(store,nodo,Buffer);
K.ponNombre('María Camila Ñuñez');
K.ponCat('dm2');
const leidoK=K.leeCodigo(K.codigoResumen());
ok(leidoK.n==='María Camila Ñuñez','Los nombres con tildes y eñes sobreviven al código');
ok(leidoK.c==='dm2'&&leidoK.ce==='Devoción Matutina','El resumen dice de qué evento es');


/* ───────── examen por link ─────────
   La promesa es fuerte: dos personas en dos aparatos distintos tienen que
   obtener el MISMO examen a partir de un link de 60 caracteres. Si eso se
   rompe, el director compara puntajes de exámenes distintos sin saberlo. */
store={};
const L=fn(store,nodo,Buffer);
L.ponNombre('Director'); L.ponCat('av');

const receta={c:'av',a:'todo',n:2,q:15,s:123456789,h:L.huellaBanco()};
const txt=L.escribeReceta(receta);
ok(txt.split('.').length===6,'La receta se escribe con seis campos');
ok(txt.length<60,'La receta cabe en un link corto ('+txt.length+' caracteres)');

const vuelta=L.leeReceta(txt);
ok(vuelta&&vuelta.c==='av'&&vuelta.a==='todo'&&vuelta.n===2&&vuelta.q===15&&vuelta.s===123456789,
  'La receta se lee igual que se escribió');

/* La misma semilla arma el mismo examen. Se compara la identidad de cada
   pregunta Y el orden de sus opciones: si solo coincidieran las preguntas,
   la letra correcta podría cambiar de un aparato a otro. */
function armaCon(A,r){
  A.ponCat(r.c); A.ponAlcance(r.a); A.ponNivel(r.n); A.ponCuantas(r.q);
  A.ponRnd(A.prng(r.s));
  const sel=A.armar('normal');
  A.rndNormal();
  return sel.map(q=>A.claveQ(q)+'#'+(q.o?q.o.join('|'):'')).join(' ~ ');
}
const uno=armaCon(L,receta);

/* Segundo «aparato»: almacenamiento nuevo, otro nombre, otra categoría
   guardada y con historial propio, para que nada del estado local influya. */
store={};
const M2=fn(store,nodo,Buffer);
M2.ponNombre('María'); M2.ponCat('pa');
M2.S().examenes=[{pts:24,total:25,cat:'pa',fecha:'x',modo:'normal',nv:3}];
M2.S().prog.d1=100;
const dos=armaCon(M2,receta);
ok(uno===dos,'La misma receta arma el mismo examen en dos aparatos distintos');
ok(uno.split(' ~ ').length===15,'El examen del link trae las 15 preguntas pedidas');

/* Semilla distinta, examen distinto: si no, el link no estaría barajando. */
const otra=armaCon(L,{...receta,s:987654321});
ok(uno!==otra,'Con otra semilla sale otro examen');

/* El nivel del link manda. Si dependiera del historial local, dos personas
   con distinto desempeño harían exámenes distintos desde el mismo link. */
const nivBajo=armaCon(L,{...receta,n:1});
const nivAlto=armaCon(L,{...receta,n:3});
ok(nivBajo!==nivAlto,'El nivel de la receta cambia el examen, no lo decide el aparato');

/* Recetas inválidas: ninguna puede pasar por buena. */
ok(L.leeReceta('')===null,'Una receta vacía se rechaza');
ok(L.leeReceta('av.todo.2.15')===null,'Una receta incompleta se rechaza');
ok(L.leeReceta('zz.todo.2.15.1.abc')===null,'Una categoría inexistente se rechaza');
ok(L.leeReceta('av.todo.9.15.1.abc')===null,'Un nivel fuera de 1 a 3 se rechaza');
ok(L.leeReceta('av.todo.2.0.1.abc')===null,'Una cantidad de cero preguntas se rechaza');
ok(L.leeReceta('av.todo.2.9999.1.abc')===null,'Una cantidad absurda se rechaza');
ok(L.leeReceta('av.todo.2.15.x.abc')===null,'Una semilla que no es número se rechaza');

/* La huella del banco es la que detecta que el link se armó con otro
   contenido. Tiene que cambiar si el banco cambia. */
ok(L.huellaBanco()===M2.huellaBanco(),'La huella del banco es igual en la misma versión');
ok(typeof L.huellaBanco()==='string'&&L.huellaBanco().length>3,'La huella es un texto corto');

/* El link no puede llevar las respuestas dentro: si las llevara, cualquiera
   las leería antes de contestar. La receta son solo cinco números y dos
   palabras cortas. */
ok(!/[¿?]/.test(txt)&&txt.length<60,'El link no lleva preguntas ni respuestas, solo la receta');

console.log('\n'+(f===0?'RECORRIDO DE USO: TODO BIEN':f+' FALLOS'));
process.exit(f?1:0);
