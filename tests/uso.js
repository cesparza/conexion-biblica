// Simula el recorrido de un usuario contra el JS real del index.html.
// El stub del navegador vive en tests/entorno.js, compartido por las tres suites.
const {montar,RAIZ}=require('./entorno.js');
const path=require('path');

/* Lo que esta suite necesita de la app. Es su superficie, no duplicacion. */
const RET=`S:()=>S, ponCat, capsDe, modsDe, tarjetasDe, buscaItem, armar, bien, limpia,
        avanza, listo, sumaRacha, revisaInsignias, mezcla, CAPS, MODULOS, TARJETAS, CONT_MODULOS, CONTENIDO,
        claveQ, claveT, falladasDe, bancoDe, tjBaraja, filtraTj, mazoActual:()=>mazo, normalizar,
        poolDe, opcionesCuantas, segundosPara,
        ponAlcance:v=>{alcance=v}, ponCuantas:v=>{cuantas=v}, alcanceActual:()=>alcance,
        barajaOpciones, CATS, CAT, poolNivel, nivelRecomendado, NPREG,
        ponNivel:v=>{nivel=v},
        htmlHoja, seccionLectura, refsTocables, VERS,
        ACTIVIDADES, ACT, ACT_DE, CATS_DE_ACT, bvActividad, bvCategoria,
        DB:()=>DB, alumnos, cambiaAlumno, agregaAlumno, normalizarDB, ponNombre,
        esNuevo, bvSigue, bvPaso, ir,
        codigoResumen, codigoCompleto, leeCodigo, resumenDe, tarjetasDe,
        huellaBanco, prng, mezclaR, armar, techoDe:c=>CATS[c].techo,
        ponRnd:f=>{rndEx=f}, rndNormal:()=>{rndEx=Math.random},
        claveQ, BANCO, pintaMenuEx, gruposEx, soloEstudio, ponFq:(k,n)=>{S.fq[k]={m:n}},
        diaHoy, cajaT, vencidaT, tocanHoy, topeSesion, tjSabia, filtraTj, tjFiltroActual:()=>tjFiltro,
        ponVisto:(k,d)=>{S.fv[k]=d}, pintaTarjetas, muestraTj, tjSig, ponTjI:v=>{tjI=v},
        puedeHablar, examenDelCapitulo, pintaLogros, sumaClub, REPARTO, textoReparto, armar,
        abreYo, pintaYo, cierraHoja, hojaTipoActual:()=>hojaTipo, pintaInicio, bvTermina,
        pasaAActividad, MAX_ALUMNOS, borraAlumno,
        pintaSenales, senal, abreLectura, cierraLectura, lectAvance,
        abrePaleta, cierraPaleta, pcFiltra, pcCatalogo,
        pcLimpia, pcAbre, pcItemsActuales:()=>pcItems, pcEstaAbierta:()=>pcAbierta,
        lectCidActual:()=>lectCid, listoDesdeLectura, modsDe, avanza,
        el:id=>document.getElementById(id)`;

let store={};
const A=montar(RET,{store});

/* La app se monta OTRA VEZ con un sintetizador de mentiras, para probar la voz
   sin depender de que el entorno traiga speechSynthesis. */
const VOZ=`
let speechSynthesis={speak(){},cancel(){},speaking:false,pending:false};
let SpeechSynthesisUtterance=function(txt){this.text=txt;};
`;
const AV=montar(RET,{antes:VOZ});

let f=0; const ok=(c,m)=>{console.log((c?'✅':'❌')+' '+m); if(!c)f++;};

// Aventureros
A.ponCat('av');
ok(A.capsDe().length===7,'Aventureros ve 7 capítulos');
ok(A.modsDe().length===9,'Aventureros ve 9 módulos de repaso ('+A.modsDe().length+')');
/* PISO, no cifra exacta: la cuenta sube cada vez que se agregan tarjetas y
   una igualdad obliga a editar la prueba en cada tanda de contenido. Lo que
   de verdad hay que cazar es que se PIERDAN tarjetas. */
ok(A.tarjetasDe().length>=102,'Aventureros: '+A.tarjetasDe().length+' tarjetas (piso 102)');
ok(!A.capsDe().some(c=>['d4','d5'].includes(c.id)),'Aventureros NO ve Daniel 4 ni 5');
ok(!A.modsDe().some(m=>['m-reyes','m-profetico'].includes(m.id)),'Aventureros NO ve módulos avanzados');

/* Las 28 creencias son otro evento dentro de la misma categoría (ev:'creencias')
   y no entran al alcance del campamento. Estas cuentas son del campamento, así
   que se filtran; si se contaran juntas, la prueba dejaría de decir lo que dice. */
const capsCampamento=()=>A.capsDe().filter(c=>c.ev!=='creencias');

// Guías Mayores
A.ponCat('gm');
ok(capsCampamento().length===12,'Guías Mayores ve 12 capítulos del campamento');
ok(A.modsDe().length===11,'Guías Mayores ve 11 módulos');
ok(A.tarjetasDe().length>=126,'Guías Mayores: '+A.tarjetasDe().length+' tarjetas (piso 126)');

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
  const labels=A.capsDe().filter(c=>c.ev!=='creencias').map(c=>c.label);
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
ok(capsCampamento().length===12,'Guías Mayores conserva los 12 capítulos del alcance ampliado');

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
const B=montar(RET,{store});
ok(B.esNuevo(),'Un usuario recién llegado se detecta como nuevo');

/* Sin nombre no avanza: el nombre es lo que separa una ficha de otra. */
B.bvSigue();
ok(B.el('bv-err').textContent.length>0,'Sin nombre, la bienvenida no deja seguir');

B.el('bv-nombre').value='Isabella';
B.bvSigue();
ok(B.S().nombre==='Isabella','El nombre queda guardado en el paso 1');

/* ACTIVIDAD primero, categoría después. El orden importa: antes se preguntaba
   la edad y luego el evento, y eso obligaba a mapear cada edad a cada evento
   a mano («4 a 6 en matutina es dm1»). Con tres actividades ese mapeo es una
   tabla de casos, y las creencias no tienen 4-6 ni 7-9 sino «los dos del
   examen escrito» y «el resto del club». Preguntando la actividad primero, el
   paso 3 solo ofrece las categorías de esa actividad. */
B.bvActividad('cb'); B.bvCategoria('me');
ok(B.S().cat==='me','Conexión Bíblica + 4 a 6 años queda en Menores');
ok(B.capsDe().every(c=>c.id.charAt(0)==='d'),'Menores solo ve capítulos de Daniel');
ok(!B.esNuevo(),'Después de la bienvenida ya no se considera usuario nuevo');

/* Cada actividad ofrece SOLO sus categorías. Es lo que hace que no haya
   mapeos que mantener. */
ok(B.CATS_DE_ACT('cb').join(',')==='me,av,pa,gm',
  'Conexión Bíblica ofrece sus cuatro categorías');
ok(B.CATS_DE_ACT('dm').join(',')==='dm1,dm2',
  'Devoción Matutina ofrece sus dos');
ok(B.CATS_DE_ACT('ec').join(',')==='ec1,ec2',
  'En esto creemos ofrece sus dos: los del examen escrito y el resto del club');
/* Y toda categoría pertenece a exactamente una actividad. */
const huerfanas=Object.keys(B.CATS).filter(k=>
  !Object.keys(B.ACTIVIDADES).some(a=>B.CATS_DE_ACT(a).includes(k)));
ok(huerfanas.length===0,'Ninguna categoría queda fuera de una actividad'+
  (huerfanas.length?' — '+huerfanas.join(', '):''));
ok(Object.keys(B.CATS).every(k=>B.ACTIVIDADES[B.CATS[k].act]),
  'Toda categoría declara una actividad que existe');

store={};
const C=montar(RET,{store});
C.el('bv-nombre').value='Camilo';
C.bvSigue(); C.bvActividad('dm'); C.bvCategoria('dm1');
ok(C.S().cat==='dm1','Matutina + 4 a 6 años queda en Matutina menores');
ok(C.capsDe().every(c=>/^m\d\d$/.test(c.id)),'Y solo ve los días de la matutina');

store={};
const D=montar(RET,{store});
D.el('bv-nombre').value='Ana';
D.bvSigue(); D.bvActividad('dm'); D.bvCategoria('dm2');
ok(D.S().cat==='dm2','Matutina + 7 a 9 años queda en Matutina Aventureros');

/* Las 28 creencias, que antes no cabían en el modelo y se resolvían con un
   interruptor aparte, ahora son una actividad con sus dos categorías. */
store={};
const F2=montar(RET,{store});
F2.el('bv-nombre').value='Papá';
F2.bvSigue(); F2.bvActividad('ec'); F2.bvCategoria('ec1');
ok(F2.S().cat==='ec1','En esto creemos + examen escrito queda en ec1');
ok(F2.capsDe().length===28&&F2.capsDe().every(c=>/^cr\d\d$/.test(c.id)),
  'Y ve las 28 creencias, y nada más');
ok(F2.tarjetasDe().every(x=>/^cr\d\d$/.test(x.cap)),'Sus tarjetas son solo de creencias');
F2.ponAlcance('todo');
ok(F2.poolDe().length===84&&F2.poolDe().every(q=>/^cr\d\d$/.test(q.cap)),
  'Y su examen son las 84 preguntas de creencias');

/* Al revés: una categoría de Conexión Bíblica no ve ni una creencia. Esta es
   la garantía que antes dependía de un filtro a mano en poolDe(). */
store={};
const G=montar(RET,{store});
G.el('bv-nombre').value='Guía';
G.bvSigue(); G.bvActividad('cb'); G.bvCategoria('gm');
ok(G.S().cat==='gm','Guía Mayor queda en su categoría');
ok(G.capsDe().every(c=>!/^cr\d\d$/.test(c.id)),
  'Guías Mayores no ve ni un capítulo de creencias en Conexión Bíblica');
ok(G.tarjetasDe().every(x=>!/^cr\d\d$/.test(x.cap)),'Ni una tarjeta de creencias');
G.ponAlcance('todo');
ok(G.poolDe().length>0&&G.poolDe().every(q=>!/^cr\d\d$/.test(q.cap)),
  'Ni una pregunta de creencias en su examen');

/* Quien participa en dos actividades usa dos fichas, que es el patrón que la
   app ya tenía para la matutina: cada ficha lleva su propio progreso, racha e
   insignias, así que las cuentas quedan separadas por construcción. */
store={};
const H=montar(RET,{store});
H.el('bv-nombre').value='María Camila';
H.bvSigue(); H.bvActividad('cb'); H.bvCategoria('av');
H.agregaAlumno(); H.ponNombre('María Camila'); H.ponCat('dm2');
const fichas=H.alumnos().map(([,al])=>al.cat).sort();
ok(H.alumnos().length===2,'Se puede tener una ficha por actividad');
ok(fichas.join(',')==='av,dm2','Las dos fichas son Aventureros y Matutina Aventureros');
ok(H.alumnos().every(([,al])=>al.nombre==='María Camila'),'Las dos llevan el mismo nombre');
/* Y el progreso de una no se ve en la otra. */
H.S().prog['m01']=100;
const fichaCb=H.alumnos().find(([,al])=>al.cat==='av');
ok((fichaCb[1].prog['m01']||0)===0,'El progreso de una actividad no aparece en la otra');

/* Un usuario que ya tiene progreso nunca debe volver a ver la bienvenida. */
store={};
const I=montar(RET,{store});
I.ponNombre('Con progreso');
ok(!I.esNuevo(),'Con nombre guardado ya no se muestra la bienvenida');


/* ───────── códigos de progreso ─────────
   Son dos códigos con propósitos distintos y el riesgo está en confundirlos:
   el resumen no debe poder escribir nada, y la ficha completa no debe perder
   nada al ir y volver. */
store={};
const J=montar(RET,{store});
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
const K=montar(RET,{store});
K.ponNombre('María Camila Ñuñez');
K.ponCat('dm2');
const leidoK=K.leeCodigo(K.codigoResumen());
ok(leidoK.n==='María Camila Ñuñez','Los nombres con tildes y eñes sobreviven al código');
ok(leidoK.c==='dm2'&&leidoK.ce==='Devoción Matutina','El resumen dice de qué evento es');


/* ───────── la evaluación del día ─────────
   La promesa es fuerte: dos niñas en dos aparatos distintos tienen que obtener
   el MISMO examen a partir de la receta que manda el servidor. Si eso se rompe,
   el director compara notas de exámenes distintos sin saberlo. */
store={};
const L=montar(RET,{store});
L.ponNombre('Director'); L.ponCat('av');

/* La receta que hoy llega del servidor: alcance, cuántas, nivel y semilla.
   La categoría NO viaja: cada niña contesta sobre el material de su grupo. */
const receta={a:'todo',n:2,q:15,s:123456789};

/* Se compara la identidad de cada pregunta Y el orden de sus opciones: si solo
   coincidieran las preguntas, la letra correcta podría cambiar de un aparato a
   otro. */
function armaCon(A,r,cat){
  A.ponCat(cat); A.ponAlcance(r.a); A.ponNivel(r.n); A.ponCuantas(r.q);
  A.ponRnd(A.prng(r.s));
  const sel=A.armar('normal');
  A.rndNormal();
  return sel.map(q=>A.claveQ(q)+'#'+(q.o?q.o.join('|'):'')).join(' ~ ');
}
const uno=armaCon(L,receta,'av');

/* Segundo «aparato»: almacenamiento nuevo, otro nombre y con historial propio,
   para que nada del estado local influya. */
store={};
const M2=montar(RET,{store});
M2.ponNombre('María');
M2.S().examenes=[{pts:24,total:25,cat:'av',fecha:'x',modo:'normal',nv:3}];
M2.S().prog.d1=100;
const dos=armaCon(M2,receta,'av');
ok(uno===dos,'La misma receta arma el mismo examen en dos aparatos distintos');
ok(uno.split(' ~ ').length===15,'La evaluación trae las 15 preguntas pedidas');

/* Semilla distinta, examen distinto: si no, no estaría barajando. */
const otra=armaCon(L,{...receta,s:987654321},'av');
ok(uno!==otra,'Con otra semilla sale otra evaluación');

/* El nivel de la receta manda. Si dependiera del historial local, dos niñas con
   distinto desempeño harían exámenes distintos en la misma evaluación. */
const nivBajo=armaCon(L,{...receta,n:1},'av');
const nivAlto=armaCon(L,{...receta,n:3},'av');
ok(nivBajo!==nivAlto,'El nivel de la receta cambia el examen, no lo decide el aparato');

/* EL BUG QUE ESTA PRUEBA EXISTE PARA IMPEDIR QUE VUELVA.
   nivelEfectivo() es `nivel || nivelRecomendado()`, y nivelRecomendado() mira
   el historial LOCAL. Cuando el director no fija nivel, la receta trae 0, y con
   0 cada niña armaba el examen con SU nivel: el director comparaba notas de
   exámenes distintos creyendo que eran el mismo. El arreglo es usar el techo de
   la categoría, que es igual para todas. */
store={};
const N1=montar(RET,{store});
N1.ponNombre('Sin historial');
store={};
const N2=montar(RET,{store});
N2.ponNombre('Con historial');
/* A esta le va bien: sin el arreglo, nivelRecomendado() la subiría de nivel. */
N2.S().examenes=[{pts:15,total:15,cat:'av',fecha:'x',modo:'normal',nv:3},
                 {pts:15,total:15,cat:'av',fecha:'x',modo:'normal',nv:3},
                 {pts:15,total:15,cat:'av',fecha:'x',modo:'normal',nv:3}];
function armaSinNivel(A){
  A.ponCat('av'); A.ponAlcance('todo'); A.ponCuantas(15);
  A.ponNivel(A.techoDe('av'));
  A.ponRnd(A.prng(123456789));
  const sel=A.armar('normal');
  A.rndNormal();
  return sel.map(q=>A.claveQ(q)).join(' ');
}
ok(armaSinNivel(N1)===armaSinNivel(N2),
  'Sin nivel fijado, dos niñas con distinto historial reciben la MISMA evaluación');

/* Cada categoría contesta sobre SU material, con la misma semilla. */
const otroGrupo=armaCon(L,receta,'me');
ok(uno!==otroGrupo,'Con la misma semilla, otra categoría recibe otras preguntas');

/* La huella del banco detecta que una evaluación se armó con otro contenido. */
ok(L.huellaBanco()===M2.huellaBanco(),'La huella del banco es igual en la misma versión');
ok(typeof L.huellaBanco()==='string'&&L.huellaBanco().length>3,'La huella es un texto corto');

/* Ya no hay link: la receta nunca sale del servidor hacia una URL, así que no
   hay nada que un tercero pueda leer del portapapeles ni de WhatsApp. */
ok(typeof L.escribeReceta==='undefined','El armado por link ya no existe en la app');

/* ───────── EN ESTO CREEMOS, el tercer evento ─────────
   MECANISMO: las 28 creencias son capítulos como cualquier otro, pero llevan
   `ev:'creencias'` y poolDe() las saca del alcance «todo». Así el examen del
   campamento sigue siendo Daniel y P&R, y las creencias son un examen aparte
   que el director abre escogiendo ese material en el panel.
   Si esta separación se rompe, el examen del campamento empieza a preguntar
   doctrina y nadie se da cuenta hasta que la niña lo está contestando. */
A.ponCat('pa'); A.ponNivel(3); A.ponCuantas(60);
A.ponAlcance('todo');
ok(A.poolDe().length>0 && A.poolDe().every(q=>!/^cr\d\d$/.test(q.cap)),
  'Padres: el alcance «todo» NO trae ninguna de las 28 creencias');
/* Las creencias no son un alcance del examen de Daniel ni un interruptor:
   son una ACTIVIDAD con sus propias categorías, ec1 y ec2. Cambiar de
   actividad es elegir una categoría de la otra actividad, que es el mismo
   gesto de siempre. */
A.ponCat('ec1'); A.ponAlcance('todo');
const poolCr=A.poolDe();
ok(poolCr.length>0 && poolCr.every(q=>/^cr\d\d$/.test(q.cap)),
  'En esto creemos (ec1): el examen trae SOLO creencias ('+poolCr.length+' preguntas)');
ok(new Set(poolCr.map(q=>q.cap)).size===28,'Están las 28 creencias, no menos');
A.ponCat('ec2'); A.ponAlcance('todo');
ok(A.poolDe().length===poolCr.length,
  'El resto del club (ec2) estudia el mismo material de creencias');
A.ponCat('pa');
for(const cat of ['me','av']){
  A.ponCat(cat); A.ponAlcance('todo');
  ok(!A.capsDe().some(c=>/^cr\d\d$/.test(c.id)),
    'Categoría '+cat+': las creencias no le aparecen ni para estudiar');
}
A.ponCat('av'); A.ponAlcance('todo'); A.ponNivel(0); A.ponCuantas(15);

/* El material de estudio de cada creencia trae la declaración oficial y los
   textos clave: sin eso, la tarjeta y la pregunta no tienen de dónde salir. */
const CR=require(path.join(RAIZ,'fuente','creencias.js'));
ok(CR.CR_CAPS.length===28,'Las 28 creencias están cargadas');
/* Ya no llevan `ev:'creencias'`: pertenecen a las categorias de su propia
   actividad, que es lo que las separa sin filtros a mano. */
ok(CR.CR_CAPS.every(c=>c.sub&&c.cats.includes('ec1')&&c.cats.includes('ec2')),
  'Cada creencia tiene título y pertenece a las dos categorías de su actividad');
ok(CR.CR_CAPS.every(c=>!('ev' in c)),
  'Y ya no lleva la marca `ev` con la que se filtraban a mano');
ok(Object.keys(CR.CR_CONTENIDO).length===28 &&
   Object.values(CR.CR_CONTENIDO).every(v=>/Declaración oficial/.test(v[0].h)&&/Textos clave/.test(v[1].h)),
  'Cada creencia trae su declaración oficial y sus textos clave');
ok(CR.CR_BANCO.length>=84 && CR.CR_BANCO.every(q=>q.o&&new Set(q.o).size===4),
  'El banco de creencias tiene '+CR.CR_BANCO.length+' preguntas y ninguna repite opción');
ok(CR.CR_TARJETAS.length>=56,'Las creencias traen '+CR.CR_TARJETAS.length+' tarjetas');

/* ───────── LO QUE ENCONTRÓ LA REVISIÓN DE QA ─────────
   Cuatro defectos que ninguna prueba veía porque salieron de mezclar dos
   eventos dentro de la misma categoría. */

/* 1. El alcance vive en el aparato y sobrevive al cambio de categoría.
   «pr» no existe en la matutina: si no se revalida, el examen queda en CERO
   preguntas y el desplegable muestra un valor que no está en su lista.
   Ojo: «creencias» ya NO es un alcance. Las 28 creencias pasaron a ser una
   ACTIVIDAD aparte, con su conmutador, porque mezclarlas con Daniel dentro
   del mismo selector de material era el problema de fondo. */
A.ponCat('gm'); A.ponAlcance('pr'); A.pintaMenuEx();
ok(A.alcanceActual()==='pr','Guías Mayores conserva el alcance «solo P&R», que sí tiene');
A.ponCat('me'); A.pintaMenuEx();
ok(A.alcanceActual()==='todo',
  'Al pasar a Menores, un alcance que esa categoría no tiene vuelve a «todo»');
A.ponCat('dm2'); A.ponAlcance('pr'); A.pintaMenuEx();
ok(A.alcanceActual()==='todo','Y lo mismo con «solo P&R» en una categoría de matutina');
A.ponCat('av'); A.ponAlcance('todo');

/* 2. Los errores por repasar son de la actividad en la que se está. Antes
   colgaban del alcance del examen y daban un repaso con Daniel y doctrina
   juntos; ahora cuelgan de la categoría, que ya dice la actividad. */
A.ponCat('pa'); A.ponAlcance('todo');
const unoDaniel=A.poolDe().find(q=>q.cap==='d1');
A.ponCat('ec1'); A.ponAlcance('todo');
const unaCreencia=A.poolDe()[0];
A.ponFq(A.claveQ(unoDaniel),2); A.ponFq(A.claveQ(unaCreencia),2);
ok(A.falladasDe().length>0&&A.falladasDe().every(q=>/^cr\d\d$/.test(q.cap)),
  'En «En esto creemos», los errores por repasar son solo de creencias');
A.ponCat('pa');
ok(A.falladasDe().length>0&&A.falladasDe().every(q=>!/^cr\d\d$/.test(q.cap)),
  'En «Conexión Bíblica», los errores por repasar no traen creencias');

/* 3. Las cuentas de progreso del campamento son de 12 capítulos, no de 40.
   Con capsDe() la insignia «Lector completo» quedaba fuera de alcance para
   padres y consejeros: había que leerse también las 28 creencias. */
A.ponCat('gm');
/* capsDelEvento() ya no existe: existia SOLO para desmezclar las creencias de
   los capitulos del campamento. Con una categoria por actividad, capsDe() ya
   trae los 12 correctos y no hay nada que desmezclar. */
ok(A.capsDe().length===12,
  'Guías Mayores: 12 capítulos, sin creencias que descontar ('+A.capsDe().length+')');
A.capsDe().forEach(c=>{A.S().prog[c.id]=100;});
A.modsDe().forEach(m=>{A.S().prog[m.id]=100;});
A.revisaInsignias(0);
ok(A.S().insignias.includes('Lector completo'),
  '«Lector completo» se alcanza leyendo el material del campamento, sin las 28 creencias');
A.ponCat('av'); A.ponAlcance('todo');

/* 4. NINGUNA OPCIÓN DEL DESPLEGABLE PUEDE QUEDARSE SIN PREGUNTAS.
   El barrido por las seis categorías encontró dos: «Solo Profetas y Reyes» en
   Menores, que no tiene P&R, y «Solo la segunda quincena» en Matutina menores,
   cuyos días pasados del 15 son de otra categoría. En los dos casos el examen
   arrancaba en cero y el botón no hacía nada. Ahora los grupos se prueban
   contra poolDe() antes de ofrecerse, y esta prueba lo vigila para las seis. */
const vacios=[];
for(const cat of Object.keys(A.CATS)){
  A.ponCat(cat);
  for(const g of [['todo','Todo mi material']].concat(A.gruposEx())){
    A.ponAlcance(g[0]); A.ponNivel(0); A.ponCuantas(0);
    if(!A.poolNivel().length) vacios.push(cat+'/'+g[0]);
    if(!A.armar('normal').length) vacios.push(cat+'/'+g[0]+' (armar)');
  }
  /* y cada capítulo suelto del desplegable también tiene que traer algo. Los
     marcados «solo para estudiar» ya no se ofrecen, así que no cuentan. */
  for(const c of A.capsDe().filter(c=>!A.soloEstudio(c,A.S().cat))){
    A.ponAlcance(c.id);
    if(!A.poolDe().length) vacios.push(cat+'/'+c.id);
  }
}
ok(vacios.length===0,'Ninguna opción de alcance se queda sin preguntas, en las 6 categorías'+
  (vacios.length?' — vacías: '+vacios.join(', '):''));
A.ponCat('av'); A.ponAlcance('todo'); A.ponNivel(0); A.ponCuantas(0);

/* ───────── REPETICIÓN ESPACIADA ─────────
   MECANISMO: cada tarjeta tiene una caja (0 nueva o fallada, 1 en repaso, 2
   dominada) y el día del último acierto. Solo vuelve a salir cuando se cumple
   el plazo de su caja: 0 siempre, 1 al día siguiente, 2 a los cuatro días.
   Antes el mazo traía las 102 tarjetas todos los días, dominadas incluidas, y
   el tiempo de estudio se gastaba en lo que ya sabía. */
A.ponCat('av');
const T=A.tarjetasDe();
ok(A.tocanHoy().length===T.length,'Al empezar, todas las tarjetas tocan hoy ('+T.length+')');
ok(A.topeSesion()===15,'Aventureros: la sesión del día se corta en 15 tarjetas');

/* Una tarjeta dominada HOY no vuelve a salir hoy. */
const k0=A.claveT(T[0]);
A.S().ft[k0]=2; A.ponVisto(k0,A.diaHoy());
ok(!A.vencidaT(T[0]),'Una dominada hoy no vuelve a salir hoy');
A.ponVisto(k0,A.diaHoy()-3);
ok(!A.vencidaT(T[0]),'Ni a los tres días');
A.ponVisto(k0,A.diaHoy()-4);
ok(A.vencidaT(T[0]),'A los cuatro días sí vuelve a salir');

/* La caja 1 es de un día, y la 0 siempre está vencida. */
const k1=A.claveT(T[1]);
A.S().ft[k1]=1; A.ponVisto(k1,A.diaHoy());
ok(!A.vencidaT(T[1]),'Una en repaso, acertada hoy, espera al día siguiente');
A.ponVisto(k1,A.diaHoy()-1);
ok(A.vencidaT(T[1]),'Al día siguiente vuelve');
const k2=A.claveT(T[2]);
A.S().ft[k2]=0; A.ponVisto(k2,A.diaHoy());
ok(A.vencidaT(T[2]),'Una de la caja 0 sale hoy aunque se haya visto hoy');

/* El mazo del día se corta en el tope; el mazo completo no se corta. */
A.filtraTj('hoy');
ok(A.mazoActual().length===A.topeSesion(),
  'La sesión del día trae '+A.mazoActual().length+' tarjetas, no las '+T.length);
A.filtraTj('todas');
ok(A.mazoActual().length===T.length,'«Todos los capítulos» sigue trayendo el mazo completo');

/* Fallar borra la fecha: la tarjeta vuelve HOY, no en cuatro días. */
A.filtraTj('todas');
const primera=A.mazoActual()[0], kp=A.claveT(primera);
A.S().ft[kp]=2; A.ponVisto(kp,A.diaHoy());
A.tjSabia(false);
ok(A.cajaT(primera)===0 && !A.S().fv[kp] && A.vencidaT(primera),
  'Al fallar, la tarjeta vuelve a la caja 0 y sale hoy mismo');

/* Un reloj adelantado no puede dejar una tarjeta fuera para siempre. */
const sucio=A.normalizar({ft:{x:2}, fv:{x:A.diaHoy()+500}});
ok(sucio.fv.x<=A.diaHoy(),'normalizar: una fecha del futuro se acota a hoy');
A.filtraTj('hoy');

/* Sin carta que contestar, los botones se apagan. Un botón encendido que no
   hace nada al tocarlo parece que la app se trabó. */
A.ponCat('av'); A.filtraTj('hoy');
ok(A.el('tj-si').disabled===false,'Con carta en pantalla, «La sabía» está habilitado');
ok(A.el('tj-ant').disabled===true,'En la primera carta, «Anterior» está apagado');
A.ponTjI(A.mazoActual().length); A.muestraTj();
ok(A.el('tj-si').disabled===true&&A.el('tj-sig').disabled===true,
  'Al terminar el mazo, «La sabía» y «Siguiente» quedan apagados');
A.filtraTj('hoy');

/* ───────── PUNTOS DÉBILES POR TIPO Y VOZ ─────────
   `acc` dice en qué capítulo falla; `act` dice en qué TIPO de pregunta. Ir al
   90% en múltiple y al 40% en completar da el mismo promedio por capítulo que
   ir al 65% en las dos, y son dos situaciones distintas: la primera se arregla
   con tarjetas de versículo, la segunda leyendo el capítulo. */
const nAct=A.normalizar({act:{mc:{b:9,m:1},fill:{b:2,m:8},zz:{b:5,m:5},tf:'basura'}});
ok(nAct.act.mc.b===9&&nAct.act.fill.m===8,'normalizar: act conserva los tipos válidos');
ok(!nAct.act.zz&&!nAct.act.tf,'normalizar: act descarta tipos inventados y basura');
const nNeg=A.normalizar({act:{mc:{b:-5,m:99999}}});
ok(nNeg.act.mc.b===0&&nNeg.act.mc.m<=9999,'normalizar: act acota negativos y cifras absurdas');

/* El panel se pinta con datos por tipo sin reventar. */
A.ponCat('av');
A.S().act={mc:{b:18,m:2},tf:{b:6,m:2},fill:{b:2,m:8}};
A.S().acc={d1:{b:5,m:5}};
A.pintaLogros();
const htmlTipo=A.el('debiles-tipo').innerHTML;
ok(/Sección I/.test(htmlTipo)&&/Sección III/.test(htmlTipo),'El panel muestra las tres secciones del examen');
ok(/decide el examen/.test(htmlTipo),'Con completar por debajo del 70%, el panel dice qué hacer');
A.S().act={};A.S().acc={};

/* Examinar un capítulo desde el punto débil, con guarda: un capítulo que para
   esta categoría es solo material de estudio no se puede examinar. */
A.ponCat('av'); A.ponAlcance('todo');
A.examenDelCapitulo('d2');
ok(A.alcanceActual()==='todo','examenDelCapitulo ignora un capítulo de solo estudio (Daniel 2 en Aventureros)');
A.examenDelCapitulo('d3');
ok(A.alcanceActual()==='d3','examenDelCapitulo sí arma el examen de un capítulo examinable');
A.ponAlcance('todo');

/* La voz: si el aparato no la tiene, el botón NO se pinta. Un botón de audio
   que no suena es peor que no tenerlo. En estas pruebas no hay navegador, así
   que speechSynthesis no existe y sirve de caso de prueba. */
ok(A.puedeHablar()===false,'Sin navegador, puedeHablar() dice que no');
A.filtraTj('todas'); A.muestraTj();
ok(!/btn-voz/.test(A.el('tj-carta').innerHTML),'Y la tarjeta no pinta el botón de voz');
A.filtraTj('hoy');

/* ───────── LA SUMA DEL CLUB ─────────
   El reglamento de «En esto creemos»: dos adultos presentan un examen escrito,
   los demás desarrollan otro cuestionario, «el puntaje de los dos exámenes se
   sumará y el resultado de este será el resultado final». La app guardaba una
   nota por participante y dejaba la suma a mano. */
const HECHAS=[{nombre:'Consejera',categoria:'pa',nota:20,total:25},
              {nombre:'Guía',categoria:'gm',nota:18,total:25},
              {nombre:'Isabella',categoria:'av',nota:12,total:15},
              {nombre:'María Camila',categoria:'me',nota:8,total:10}];
const tabla=A.sumaClub(HECHAS);
ok(/Adultos \(escrito\)/.test(tabla)&&/Resto del club/.test(tabla),
  'La suma del club separa a los adultos del escrito y al resto');
ok(/38\/50/.test(tabla),'Suma correcta de los adultos: 20+18 de 25+25');
ok(/20\/25/.test(tabla),'Suma correcta del resto del club: 12+8 de 15+10');
ok(/<strong>58\/75<\/strong>/.test(tabla),'Y la suma total, que es el número que se reporta');
ok(A.sumaClub([HECHAS[0]])==='','Con una sola nota no hay nada que sumar: no se pinta la tabla');
ok(A.sumaClub([])===''&&A.sumaClub(null)==='','Sin notas tampoco');

/* El reparto de las tres secciones vive en UN solo lugar, con nombre, porque es
   el número que hay que cambiar el día que se sepa el reparto real. */
ok(A.REPARTO.fill>0&&A.REPARTO.tf>0&&A.REPARTO.fill+A.REPARTO.tf<1,
  'REPARTO deja sitio a las tres secciones');
ok(/Sección I 60%/.test(A.textoReparto())&&/Sección III 15%/.test(A.textoReparto()),
  'El reparto se puede leer en palabras: '+A.textoReparto());
A.ponCat('gm'); A.ponAlcance('todo'); A.ponNivel(3); A.ponCuantas(40);
const ex=A.armar('normal');
const pFill=ex.filter(q=>q.t==='fill').length/ex.length;
ok(Math.abs(pFill-A.REPARTO.fill)<=0.06,
  'El examen armado respeta el reparto de la sección III ('+Math.round(pFill*100)+'% con REPARTO '+Math.round(A.REPARTO.fill*100)+'%)');
A.ponCat('av'); A.ponNivel(0); A.ponCuantas(0);


/* ── QUE LA VOZ LEA EL VERSICULO, NO LA REFERENCIA ──────────────────────
   El boton de voz se movio a su propia fila para que el texto use todo el
   ancho, y con eso quedo FUERA del bloque [data-leer]. leeCerca() se caia a
   btn.parentNode y la voz empezo a leer «Daniel 3:5 · RV1995» en vez del
   versiculo. No se ve en una captura: hay que mirar el texto que se manda a
   hablar. Estas pruebas fijan la estructura de la que depende el arreglo. */
const hv=AV.htmlHoja('d3',5,5);
const cuerpoV=(hv.match(/data-leer>([\s\S]*?)<\/div>/)||[])[1]||'';
ok(cuerpoV.includes('que al oír el son de la bocina'),
  'El bloque [data-leer] de la hoja trae el texto del versiculo');
ok(!/RV1995/.test(cuerpoV),
  'El bloque [data-leer] NO trae la referencia (si la trae, la voz la lee)');
ok(/class="hoja-cab"[\s\S]*?btn-voz/.test(hv),
  'El boton de voz esta en la cabecera de la hoja');
ok((hv.match(/data-leer/g)||[]).length===1,
  'Hay exactamente un [data-leer] en la hoja, o leeCerca no sabria cual tomar');
/* La hoja no empuja el contenido, pero por eso tiene que poder cerrarse de
   varias formas: el fondo, el asa y la X. Si solo tuviera una y fallara, la
   nina se queda atrapada en el versiculo. */
ok(/hoja-fondo[^>]*onclick="cierraHoja\(\)"/.test(hv),'El fondo de la hoja cierra');
ok(/hoja-asa[^>]*onclick="cierraHoja\(\)"/.test(hv),'El asa cierra');
ok(/hoja-x[^>]*onclick="cierraHoja\(\)"/.test(hv),'La X cierra');
ok(/aria-modal="true"/.test(hv),'La hoja se anuncia como dialogo');
/* Anterior y siguiente para recorrer sin cerrar, y desactivados en los
   topes: Daniel 3 va del 1 al 30. */
const h1=AV.htmlHoja('d3',1,1), h30=AV.htmlHoja('d3',30,30);
ok(/hojaMueve\(-1\)"\s*disabled/.test(h1),'En el versiculo 1, «Anterior» esta desactivado');
ok(/hojaMueve\(1\)"\s*disabled/.test(h30),'En el ultimo versiculo, «Siguiente» esta desactivado');
ok(/hoja-cta">1 de 30</.test(h1),'La hoja dice en que versiculo va y cuantos hay');
ok(!/disabled/.test(hv.match(/hojaMueve\(-1\)[^>]*/)[0]),
  'En un versiculo del medio, «Anterior» esta activo');

const sl=AV.seccionLectura('d3');
const bloquesL=sl.split('class="lect-bl"').slice(1);
ok(bloquesL.length===6,'Daniel 3 se parte en 6 bloques de cinco versiculos (30)');
ok(bloquesL.every(b=>(b.match(/data-leer/g)||[]).length===1),
  'Cada bloque de lectura tiene exactamente un [data-leer]');
ok(bloquesL.every(b=>/class="lect-rot">Vers\. \d/.test(b)),
  'Cada bloque de lectura dice que versiculos son');
const bl1=(bloquesL[0].match(/data-leer>([\s\S]*?)<\/div>/)||[])[1]||'';
ok(bl1.includes('El rey Nabucodonosor hizo una estatua de oro'),
  'El primer bloque de lectura arranca en el versiculo 1');
ok(!/Vers\./.test(bl1),'El rotulo del bloque queda fuera del texto que se lee');

/* Cada versiculo en su parrafo con el numero volado: si van corridos, un
   capitulo de 49 se lee como un muro. */
ok((bl1.match(/<p><span class="vn">/g)||[]).length===5,
  'Los cinco versiculos del bloque van cada uno en su parrafo, con su numero');

/* La clase .biblia es la que le pone la serif y el interlineado de lectura.
   Sin ella el texto biblico se ve igual que el de la app. */
ok(/class="[^"]*\bbiblia\b/.test(hv)&&/class="[^"]*\bbiblia\b/.test(sl),
  'El texto biblico lleva la clase .biblia en la hoja y en la lectura');


/* ── CADA ACTIVIDAD, SEPARADA POR CONSTRUCCION ──────────────────────────
   Antes solo el examen las separaba: la lista de Estudiar de un padre tenia
   35 capitulos en un monton (4 Daniel + 3 P&R + 28 creencias) y la sesion de
   tarjetas del dia mezclaba un versiculo de Daniel con una creencia. Se
   parcheo con un interruptor, que era un cuarto mecanismo.

   Ahora la categoria dice la actividad, asi que no hay nada que filtrar
   aparte: si estas en `av` no existen las creencias, y si estas en `ec1` no
   existe Daniel. Esta tabla lo recorre entero. */
const esCrAct=id=>/^cr\d\d$/.test(id);
const esDanAct=id=>/^d\d$/.test(id)||/^pr\d\d$/.test(id);
const esMatAct=id=>/^m\d\d$/.test(id);

const POR_CAT={
  me:{act:'cb', caps:4,  suyo:esDanAct},
  av:{act:'cb', caps:7,  suyo:esDanAct},
  pa:{act:'cb', caps:7,  suyo:esDanAct},
  gm:{act:'cb', caps:12, suyo:esDanAct},
  dm1:{act:'dm', caps:15, suyo:esMatAct},
  dm2:{act:'dm', caps:31, suyo:esMatAct},
  ec1:{act:'ec', caps:28, suyo:esCrAct},
  ec2:{act:'ec', caps:28, suyo:esCrAct},
};
for(const cat of Object.keys(ESPERADO)){
  const e=POR_CAT[cat];
  A.ponCat(cat); A.ponAlcance('todo');
  ok(A.ACT_DE(cat)===e.act,cat+' pertenece a la actividad '+e.act);
  ok(A.capsDe().length===e.caps,
    cat+': '+e.caps+' capitulos ('+A.capsDe().length+')');
  ok(A.capsDe().every(c=>e.suyo(c.id)),
    cat+': todos los capitulos son de su actividad, ninguno de otra');
  ok(A.tarjetasDe().every(x=>e.suyo(x.cap)),
    cat+': todas las tarjetas son de su actividad');
  ok(A.poolDe().length>0&&A.poolDe().every(q=>e.suyo(q.cap)),
    cat+': el examen solo trae preguntas de su actividad ('+A.poolDe().length+')');
}

/* La garantia que mas importa, dicha al reves: ninguna categoria del
   campamento puede ver una creencia, porque el examen del 9 de octubre no
   pregunta doctrina. */
for(const cat of ['me','av','pa','gm']){
  A.ponCat(cat); A.ponAlcance('todo');
  ok(!A.capsDe().some(c=>esCrAct(c.id))&&!A.poolDe().some(q=>esCrAct(q.cap)),
    cat+': ni una creencia, ni para estudiar ni en el examen');
}
A.ponCat('av'); A.ponAlcance('todo');

/* Un estado guardado de una version anterior tiene que abrir intacto. Este
   rediseno NO cambio ninguna clave de categoria justamente para eso: quien
   tenga `av` guardado en su celular sigue en Aventureros. */
for(const cat of ['me','av','pa','gm','dm1','dm2']){
  const s=A.normalizar({cat,nombre:'De antes',prog:{d1:60},racha:5});
  ok(s.cat===cat,'Un estado guardado con cat='+cat+' sigue en esa categoria');
  ok(s.prog.d1===60&&s.racha===5,'  y conserva su progreso y su racha');
}
/* Una categoria que no existe cae en la de siempre, no deja la app vacia. */
ok(A.normalizar({cat:'inventada'}).cat==='av',
  'Una categoria invalida cae en Aventureros');
/* Y el campo `evento` del interruptor retirado se ignora sin romper nada. */
ok(A.normalizar({cat:'pa',evento:'creencias'}).cat==='pa',
  'El campo `evento` de la version anterior se ignora sin efecto');


/* ───────── la identidad es global, no una seccion del Inicio ─────────
   El panel vivia dentro de la pantalla de Inicio, asi que para cambiar de
   persona desde Estudiar habia que volver. Peor: en Estudiar, Tarjetas, Examen
   y Logros nada decia de quien era el progreso, y dos hermanas comparten
   telefono. Ahora la ficha va en la barra y la hoja se abre desde donde sea. */
A.ponCat('pa'); A.ponNombre('Isabella');
A.pintaYo();
const chip=A.el('nav-yo');
ok(/Isabella/.test(chip.innerHTML),'La ficha de la barra dice quien estudia');
ok(/Padres y consejeros/.test(chip.innerHTML),'La ficha dice su categoria');
ok(/Conexi/.test(chip.getAttribute('aria-label')||''),
  'La ficha nombra la actividad para quien usa lector de pantalla');

/* La hoja se abre sin pasar por Inicio, y al abrirse pinta los dos selectores:
   si el esqueleto no trajera los ids, pintaAlumnos() y pintaSelectorCat() se
   irian en silencio y la hoja saldria vacia. */
A.ir('estudio');
A.abreYo();
ok(A.hojaTipoActual()==='yo','La hoja de identidad se abre desde cualquier pantalla');
ok(/alu-sel/.test(A.el('hoja').innerHTML),'La hoja trae el selector de participantes');
ok(A.el('alu-sel').innerHTML.length>0,'  y viene pintado, no vacio');
ok(A.el('cat-sel').innerHTML.length>0,'La hoja trae el selector de actividad y categoria pintado');
ok(/Conexi.n B.blica/.test(A.el('cat-sel').innerHTML)&&/En esto creemos/.test(A.el('cat-sel').innerHTML),
  '  con las tres actividades agrupadas');
A.cierraHoja();
ok(A.hojaTipoActual()===null,'La hoja de identidad se cierra');

/* pintaInicio() ya no puede suponer que el campo del nombre existe: vive en la
   hoja, que casi siempre esta cerrada. Sin la guarda revienta al leer .value. */
A.pintaInicio();
ok(true,'pintaInicio() no revienta con la hoja cerrada');

/* Al terminar la bienvenida hay que REPINTAR, no solo navegar: `ir()` prende la
   pantalla pero no la vuelve a dibujar, y ahi acaban de cambiar el nombre y la
   categoria. Se salio vacia la ficha en un render a 390px, con las suites en
   verde, porque ninguna cubria el camino completo de la bienvenida. */
store={};
const Y=montar(RET,{store});
Y.el('bv-nombre').value='María Camila';
Y.bvSigue();
Y.bvActividad('cb');
Y.bvCategoria('pa');
ok(/María Camila/.test(Y.el('nav-yo').innerHTML),
  'Al salir de la bienvenida la ficha de la barra ya dice el nombre');
ok(/Padres y consejeros/.test(Y.el('nav-yo').innerHTML),
  '  y la categoria que se acabo de escoger');


/* ───────── UNA FICHA, UNA ACTIVIDAD: invariante, no recomendacion ─────────
   `racha`, `insignias` y `examenes` son campos de la FICHA, y eso funciona
   mientras cada ficha pertenezca a una sola actividad. `ponCat` permitia saltar
   de `av` a `ec1` dentro de la misma ficha y los tres campos se arrastraban:
   medido, una ficha con racha 7, dos insignias y tres examenes de Conexion
   Biblica llegaba a las creencias con todo puesto, y se ganaba «Persistente»
   con examenes de la otra actividad. El manual lo tapaba pidiendole al usuario
   que creara la segunda ficha a mano. */
store={};
const Z=montar(RET,{store});
Z.ponNombre('Camilo');
Z.ponCat('av');
Z.S().racha=7;
Z.S().insignias=['Racha de fuego','Lector completo'];
Z.S().examenes=[{cat:'av',pts:10,total:10},{cat:'av',pts:9,total:10},{cat:'av',pts:8,total:10}];
ok(Z.alumnos().length===1,'Arranca con una sola ficha');

Z.ponCat('ec1');
ok(Z.alumnos().length===2,'Tocar una categoria de otra actividad crea la ficha de esa actividad');
ok(Z.S().cat==='ec1','  y deja activa la nueva');
ok(Z.S().nombre==='Camilo','  con el mismo nombre');
ok(Z.S().racha===0,'  sin arrastrar la racha de la otra actividad');
ok(Z.S().insignias.length===0,'  sin arrastrar las insignias');
ok(Z.S().examenes.length===0,'  sin arrastrar los examenes');
Z.revisaInsignias(50);
ok(!Z.S().insignias.includes('Persistente'),
  'No se gana «Persistente» en una actividad con examenes hechos en la otra');

/* La ficha de Conexion Biblica sigue intacta: no se movio nada de ella. */
const cb=Z.alumnos().find(([,al])=>Z.ACT_DE(al.cat)==='cb')[1];
ok(cb.racha===7&&cb.insignias.length===2&&cb.examenes.length===3,
  'La ficha de la otra actividad queda intacta');

/* Volver no crea una tercera: se pasa a la que ya existe, con SU categoria. */
Z.ponCat('av');
ok(Z.alumnos().length===2,'Volver a la primera actividad no crea otra ficha');
ok(Z.S().racha===7&&Z.S().examenes.length===3,'  y recupera su progreso');

/* Y dentro de la MISMA actividad cambiar de categoria sigue siendo cambiar de
   categoria, sin crear fichas. */
Z.ponCat('pa');
ok(Z.alumnos().length===2&&Z.S().cat==='pa',
  'Cambiar de categoria dentro de la misma actividad no crea ficha');
ok(Z.S().racha===7,'  y no reinicia la racha, que es de la persona en esa actividad');

/* En el tope de fichas no se pierde nada ni se muta la ficha actual. */
store={};
const W=montar(RET,{store});
W.ponNombre('Tope');
W.ponCat('av');
W.avanza('d1',100);            // hay progreso: la ficha ya vale partirla
for(let i=0;i<W.MAX_ALUMNOS-1;i++)W.agregaAlumno();
const idTope=W.alumnos().find(([,al])=>al.nombre==='Tope')[0];
W.cambiaAlumno(idTope);
const antesCat=W.S().cat, antesN=W.alumnos().length;
ok(antesN===W.MAX_ALUMNOS,'El aparato queda en el tope de fichas ('+antesN+')');
W.ponCat('ec1');
ok(W.alumnos().length===antesN,'En el tope de fichas no se crea una mas');
ok(W.S().cat===antesCat,'  y la ficha con progreso NO cambia de actividad a la fuerza');
ok((W.S().prog.d1||0)===100,'  y su progreso sigue ahi');

/* Una ficha VACIA si se deja cambiar de actividad en el sitio, aun en el tope:
   no hay nada que proteger, y es el caso de «+ Agregar». */
const idVacia=W.alumnos().find(([,al])=>al.nombre!=='Tope')[0];
W.cambiaAlumno(idVacia);
W.ponCat('ec1');
ok(W.S().cat==='ec1'&&W.alumnos().length===antesN,
  'Una ficha sin progreso cambia de actividad en el sitio, sin crear otra');


/* ───────── las senales de la barra ─────────
   Los cuatro datos ya los calculaba la app; lo que faltaba era verlos sin
   entrar a la pantalla. Lo que estas pruebas fijan es que la senal diga la
   VERDAD, porque una insignia con un numero viejo es peor que ninguna. */
store={};
const N=montar(RET,{store});
N.ponNombre('Senales'); N.ponCat('av');
N.pintaSenales();
ok(N.el('nv-est').hidden,'Sin nada leido, la senal de Estudiar no aparece');
/* OJO: en una ficha nueva la senal de Tarjetas SI aparece, y esta bien. Todas
   las tarjetas arrancan en la caja 0, y PLAZO[0] es 0 dias, o sea que el dia
   uno estan todas vencidas. La barra diciendo «15» el primer dia es la app
   avisando que hay trabajo hoy, que es justo para lo que sirve. */
ok(!N.el('nv-tj').hidden&&Number(N.el('nv-tj').textContent)>0,
  'En una ficha nueva la senal de Tarjetas aparece: todas vencen el dia uno');
ok(N.el('nv-lg').hidden,'Sin errores, la de Logros no aparece');
ok(N.el('nv-ex').hidden,'Sin evaluacion abierta, el punto del Examen no aparece');

/* Errores: la senal tiene que cuadrar con falladasDe(), que es lo que el boton
   «Repasar mis errores» va a armar. */
const bk=N.bancoDe();
for(let i=0;i<5;i++)N.ponFq(N.claveQ(bk[i]),2);
N.pintaSenales();
ok(N.el('nv-lg').textContent===String(N.falladasDe().length)&&!N.el('nv-lg').hidden,
  'La senal de Logros dice los errores pendientes ('+N.el('nv-lg').textContent+')');

/* Progreso: promedia capitulos Y repasos. Promediar solo capitulos daria 100%
   con los repasos sin leer, y la insignia «Lector completo» exige los dos. */
const items=[...N.capsDe(),...N.modsDe()];
N.avanza(items[0].id,100);
N.pintaSenales();
const esperado=Math.round(items.reduce((a,c)=>a+Math.min(100,N.S().prog[c.id]||0),0)/items.length);
ok(N.el('nv-est').textContent===esperado+'%',
  'La senal de Estudiar promedia capitulos y repasos ('+N.el('nv-est').textContent+')');

/* Tope de la sesion: la senal dice lo que se va a estudiar hoy, no el total
   pendiente. «102 por dominar» no es una tarea; «25 hoy» si. */
const t=N.tarjetasDe();
for(let i=0;i<40&&i<t.length;i++)N.ponVisto(N.claveT(t[i]),N.diaHoy()-9);
N.pintaSenales();
ok(Number(N.el('nv-tj').textContent)<=N.topeSesion(),
  'La senal de Tarjetas no pasa del tope de la sesion ('+N.el('nv-tj').textContent+
  ' con tope '+N.topeSesion()+')');
/* Un numero de tres cifras rompe la insignia: se corta en 99+. */
N.senal('nv-tj',250);
ok(N.el('nv-tj').textContent==='99+','Un numero de tres cifras se corta en 99+');
/* Y cero esconde, no escribe «0». */
N.senal('nv-tj',0);
ok(N.el('nv-tj').hidden,'Cero esconde la senal en vez de escribir un 0');

/* Cada senal es un nodo que YA existe en el HTML: llamar dos veces no duplica. */
N.pintaSenales();N.pintaSenales();
ok(!/nv-est.*nv-est/s.test(N.el('nv-est').innerHTML||''),
  'Repintar las senales no duplica nodos');


/* ───────── modo lectura ─────────
   El mismo texto de VERS en una capa que tapa todo. Lo que se fija: que sea el
   capitulo completo, que el avance no minta y que al cerrar no deje el body
   bloqueado, que es como se queda una pagina muerta. */
N.abreLectura('d3');
ok(N.lectCidActual()==='d3','El modo lectura se abre en el capitulo pedido');
ok(!N.el('lectura').hidden,'y la capa queda visible');
const vs=(N.el('lectura').innerHTML.match(/class="vn"/g)||[]).length;
ok(vs===Object.keys(N.VERS['d3']).length,
  'Trae el capitulo COMPLETO, no los bloques de cinco ('+vs+' versiculos)');
ok(/Reina-Valera 1995/.test(N.el('lectura').innerHTML),
  'Dice de que version es el texto, que es de lo que vive este proyecto');
N.cierraLectura();
ok(N.el('lectura').hidden&&N.lectCidActual()===null,'Se cierra y suelta el capitulo');

/* Un capitulo que no tiene texto en VERS (los de Profetas y Reyes) no abre el
   modo lectura en blanco: simplemente no abre. */
N.abreLectura('pr39');
ok(N.lectCidActual()===null,'Un capitulo sin texto RV1995 no abre el modo lectura');

/* Marcar como leido desde la lectura hace lo mismo que el boton de siempre. */
N.abreLectura('d6');
N.listoDesdeLectura();
ok((N.S().prog.d6||0)===100,'«Ya lo estudie» desde la lectura marca el capitulo');
ok(N.lectCidActual()===null,'y cierra la capa');


/* La vista dividida NO se prueba aqui, y vale decir por que: el stub del DOM
   es PLANO, no un arbol. `getElementById` devuelve nodos independientes que se
   guardan en cache, sin padres ni hijos, asi que `createElement`,
   `appendChild` e `insertBefore` no existen y `divideVista()` se va por su
   try/catch sin hacer nada. Reestructurar el DOM se verifica con el render de
   Playwright (medido: dos columnas de 432px a 1440, apiladas a 1100 y a 390) y
   con las pruebas estructurales de test.js. Levantar un DOM de verdad para el
   stub cuesta mas de lo que rinde, que es la misma decision que api.js tomo
   con la base de datos. */


/* ───────── paleta de comandos ─────────
   La lista sale de capsDe(), modsDe() y CATS: no hay un catalogo aparte que se
   pueda desincronizar del material. */
N.ponCat('pa');
const cat=N.pcCatalogo();
ok(cat.length>0,'El catalogo de la paleta trae items ('+cat.length+')');
const nCaps=cat.filter(i=>i.g==='Capítulos').length;
ok(nCaps===N.capsDe().length,
  'Trae exactamente los capitulos de la categoria activa ('+nCaps+' de '+N.capsDe().length+')');
ok(!cat.some(i=>i.g==='Cambiar de material'&&/^\s*$/.test(i.t)),'Ninguna fila queda sin nombre');
/* La categoria activa NO se ofrece para cambiar a ella misma. */
ok(!cat.some(i=>i.g==='Cambiar de material'&&i.t.indexOf(N.CATS[N.S().cat].nombre)>=0
   &&i.t.indexOf(N.ACTIVIDADES[N.CATS[N.S().cat].act].nombre)>=0),
  'No ofrece cambiar a la categoria en la que ya estas');

/* Sin escribir nada, las ACCIONES van primero: con el orden natural el tope de
   doce se lo comian los capitulos y la paleta abria sin una sola accion. */
const vacio=N.pcFiltra('');
ok(vacio[0].g==='Acciones','Sin escribir nada, la primera fila es una accion');
ok(vacio.some(i=>i.g!=='Acciones'),'y despues siguen los capitulos');

/* El filtro normaliza sin tildes ni mayusculas, igual que la comparacion de
   respuestas del examen. */
const a=N.pcFiltra('babilonia').map(i=>i.t).join('|');
const bb=N.pcFiltra('BABILONIA').map(i=>i.t).join('|');
ok(a===bb&&a.length>0,'El filtro ignora mayusculas y tildes ('+a+')');
ok(N.pcFiltra('zzzznoexiste').length===0,'Una busqueda sin resultados devuelve vacio, no todo');
ok(N.pcFiltra('').length<=12&&N.pcFiltra('daniel').length<=12,'La lista nunca pasa de 12 filas');

N.abrePaleta();
ok(N.pcEstaAbierta(),'La paleta se abre');
/* Ojo con el stub plano: el markup de las filas lo escribe pcPinta() en
   `#pc-l`, que aqui es un nodo hermano y no un hijo de `#paleta`. */
ok(N.el('pc-l').innerHTML.indexOf('pc-r')>0,'y las filas quedan pintadas');
N.cierraPaleta();
ok(!N.pcEstaAbierta()&&N.el('paleta').hidden,'y se cierra');

console.log('\n'+(f===0?'RECORRIDO DE USO: TODO BIEN':f+' FALLOS'));
process.exit(f?1:0);
