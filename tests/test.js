const fs=require('fs');
const path=require('path');
const RAIZ=path.join(__dirname,'..');
const {CAPS,CONTENIDO}=require(path.join(RAIZ,'fuente','contenido.js'));
const {BANCO}=require(path.join(RAIZ,'fuente','preguntas.js'));
const {MODULOS,CONT_MODULOS}=require(path.join(RAIZ,'fuente','modulos.js'));
const {TARJETAS}=require(path.join(RAIZ,'fuente','tarjetas.js'));
let fallos=0;
const ok=(c,m)=>{console.log((c?'✅':'❌')+' '+m); if(!c)fallos++;};

// 1. Integridad del banco
ok(BANCO.every(q=>CAPS.find(c=>c.id===q.cap)),'Todas las preguntas apuntan a un capítulo existente');
ok(BANCO.filter(q=>q.t==='mc').every(q=>q.o&&q.o.length===4&&q.a>=0&&q.a<4),'Preguntas MC: 4 opciones y respuesta en rango');
ok(BANCO.filter(q=>q.t==='tf').every(q=>typeof q.a==='boolean'&&q.e),'Preguntas V/F: respuesta booleana y explicación');
ok(BANCO.filter(q=>q.t==='fill').every(q=>q.p&&q.p.some(p=>p.b)&&q.ins),'Preguntas de completar: tienen espacios e instrucción');

// 2. Contenido por capítulo
ok(CAPS.every(c=>CONTENIDO[c.id]&&CONTENIDO[c.id].length>=4),'Cada capítulo tiene 4+ secciones de contenido');
ok(CAPS.every(c=>CONTENIDO[c.id].every(s=>s.t&&s.h)),'Cada sección tiene título y cuerpo');

// 3. Simular armar() para ambas categorías, muchas veces
function mezcla(a){const r=a.slice();for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
function armar(cat){
  const ids=CAPS.filter(c=>c.cats.includes(cat)).map(c=>c.id);
  const b=BANCO.filter(q=>ids.includes(q.cap));
  const n=cat==='av'?15:25;
  const mc=mezcla(b.filter(q=>q.t==='mc')),tf=mezcla(b.filter(q=>q.t==='tf')),fl=mezcla(b.filter(q=>q.t==='fill'));
  const nf=Math.max(2,Math.round(n*.15)),nt=Math.max(2,Math.round(n*.25)),nm=n-nf-nt;
  return [...mc.slice(0,nm),...tf.slice(0,nt),...fl.slice(0,nf)];
}
for(const cat of ['av','gm']){
  const n=cat==='av'?15:25;
  let malos=0,sinDup=true;
  for(let i=0;i<300;i++){
    const p=armar(cat);
    if(p.length!==n)malos++;
    // las de completar no tienen .q (el texto va en .ins), así que se compara por identidad
    if(new Set(p).size!==p.length)sinDup=false;
    const ids=CAPS.filter(c=>c.cats.includes(cat)).map(c=>c.id);
    if(!p.every(q=>ids.includes(q.cap)))malos++;
  }
  ok(malos===0,`Categoría ${cat}: 300 exámenes con exactamente ${n} preguntas del alcance correcto`);
  ok(sinDup,`Categoría ${cat}: nunca repite una pregunta en el mismo examen`);
}

// 4. Comparación de respuestas (acentos, mayúsculas, espacios)
const limpia=s=>String(s).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
const igual=(a,b)=>limpia(a)===limpia(b);
ok(igual('Jerusalén','jerusalen'),'Acepta sin tilde: "jerusalen" = "Jerusalén"');
ok(igual('  TRES  ','tres'),'Acepta espacios y mayúsculas');
ok(igual('Hijo de Dios','hijo  de  dios'),'Acepta espacios múltiples');
ok(!igual('cuatro','tres'),'Rechaza respuesta incorrecta');

// 5. normalizar() con estados dañados
const html=fs.readFileSync(path.join(RAIZ,'index.html'),'utf8');
const js=html.match(/<script>([\s\S]*)<\/script>/)[1];
const stub=`
let localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
let document={querySelectorAll:()=>({forEach:()=>{}}),getElementById:()=>({classList:{toggle:()=>{},add:()=>{},remove:()=>{}},value:'',textContent:'',innerHTML:'',style:{}}),querySelector:()=>null};
let window={scrollTo:()=>{}};
let setInterval=()=>0, clearInterval=()=>{}, confirm=()=>false;
`;
const fn=new Function(stub+js+`
return {normalizar, esc};`);
const {normalizar,esc}=fn();
const casos=[null,undefined,{},'texto',{prog:'roto'},{cat:'xx',racha:-5},{examenes:'no es array'},{prog:{d1:999,d2:-3}},{nombre:'x'.repeat(500)}];
let sano=true;
for(const c of casos){
  try{const r=normalizar(c);
    if(!r.prog||typeof r.prog!=='object')sano=false;
    if(r.cat!=='av'&&r.cat!=='gm')sano=false;
    if(r.racha<0||r.racha>999)sano=false;
    if(!Array.isArray(r.examenes))sano=false;
    if(r.nombre.length>60)sano=false;
    if(Object.values(r.prog).some(v=>v<0||v>100))sano=false;
  }catch(e){sano=false;console.log('   excepción con',JSON.stringify(c),e.message);}
}
ok(sano,'normalizar() sobrevive a 9 estados dañados sin romperse');

// 6. Escape de HTML
ok(esc('<script>')==='&lt;script&gt;','esc() neutraliza etiquetas');
ok(esc(`Tom's & "co"`)===`Tom&#39;s &amp; &quot;co&quot;`,'esc() maneja comillas y ampersand');
ok(esc('Camilo Esparza')==='Camilo Esparza','esc() no daña texto normal');


// 7. Módulos de repaso
ok(MODULOS.every(m=>CONT_MODULOS[m.id]&&CONT_MODULOS[m.id].length>=2),'Cada módulo tiene 2+ secciones');
ok(MODULOS.every(m=>CONT_MODULOS[m.id].every(s=>s.t&&s.h)),'Cada sección de módulo tiene título y cuerpo');
ok(MODULOS.every(m=>m.cats&&m.cats.length&&m.icono&&m.color),'Cada módulo tiene categorías, icono y color');
ok(new Set(MODULOS.map(m=>m.id)).size===MODULOS.length,'Los ids de módulo no se repiten');
ok(!MODULOS.some(m=>CAPS.find(c=>c.id===m.id)),'Ningún id de módulo choca con un id de capítulo');

// 8. Tarjetas
ok(TARJETAS.every(t=>t.f&&t.r&&t.cap),'Todas las tarjetas tienen frente, reverso y capítulo');
ok(TARJETAS.every(t=>CAPS.find(c=>c.id===t.cap)),'Todas las tarjetas apuntan a un capítulo existente');
for(const cat of ['av','gm']){
  const ids=CAPS.filter(c=>c.cats.includes(cat)).map(c=>c.id);
  const n=TARJETAS.filter(t=>ids.includes(t.cap)).length;
  ok(n>=30,`Categoría ${cat}: ${n} tarjetas disponibles (mínimo 30)`);
}
ok(CAPS.every(c=>TARJETAS.some(t=>t.cap===c.id)),'Cada capítulo tiene al menos una tarjeta');

// 9. Ninguna cadena de contenido supera 2000 caracteres (regla del repo)
const todas=[];
Object.values(CONTENIDO).forEach(v=>v.forEach(s=>todas.push(s.h)));
Object.values(CONT_MODULOS).forEach(v=>v.forEach(s=>todas.push(s.h)));
const max=Math.max(...todas.map(x=>x.length));
ok(max<2000,`La sección más larga tiene ${max} caracteres (límite 2000)`);

// 10. El index.html generado no tiene líneas largas
const lineas=html.split('\n');
const nLargas=lineas.filter(l=>l.length>2000).length;
const maxL=Math.max(...lineas.map(l=>l.length));
ok(nLargas===0,`index.html: 0 líneas sobre 2000 caracteres (máx ${maxL})`);

// 11. El examen sigue funcionando con el banco ampliado
ok(BANCO.filter(q=>q.t==='fill').length>=15,`Banco: ${BANCO.filter(q=>q.t==='fill').length} preguntas de completar`);
ok(BANCO.length>=130,`Banco total: ${BANCO.length} preguntas`);

// 12. Arquitectura: la app vive en archivos reales y se puede chequear
const { execFileSync } = require('child_process');
const FUENTE = f => path.join(RAIZ, 'fuente', f);
let sintaxis = true;
try { execFileSync(process.execPath, ['--check', FUENTE('app.js')], { stdio: 'pipe' }); }
catch (e) { sintaxis = false; console.log('   ' + String(e.stderr || e.message).split('\n')[0]); }
ok(sintaxis, 'fuente/app.js pasa el chequeo de sintaxis de Node');

for (const f of ['estilos.css', 'cuerpo.html', 'app.js']) {
  ok(fs.existsSync(FUENTE(f)) && fs.readFileSync(FUENTE(f), 'utf8').length > 500,
    `fuente/${f} existe y tiene contenido`);
}

// El HTML generado incluye de verdad los tres pedazos
const cssF = fs.readFileSync(FUENTE('estilos.css'), 'utf8').trim().split('\n')[0];
const appF = fs.readFileSync(FUENTE('app.js'), 'utf8');
ok(html.includes(cssF), 'index.html incluye los estilos de fuente/estilos.css');
ok(html.includes(appF.trim().split('\n').find(l => l.startsWith('const CLAVE'))),
  'index.html incluye el código de fuente/app.js');

// El build es reproducible: correrlo dos veces da el mismo archivo
const antes = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
execFileSync(process.execPath, [path.join(RAIZ, 'fuente', 'build.js')], { stdio: 'pipe' });
ok(antes === fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8'),
  'El build es reproducible (dos corridas dan el mismo index.html)');

// 13. Cobertura mínima: que no se pierda terreno al editar el banco
const VERS = { d1:21, d2:49, d3:30, d4:37, d5:31, d6:28 };
function refsQ(q){
  const t=[q.q,q.ins,q.e,...(q.o||[]),...(q.p||[]).map(p=>(p.x||'')+(p.b||''))].filter(Boolean).join(' ');
  const out=new Set(); const re=/(?:Daniel\s*)?(\d{1,2})\s*:\s*(\d{1,2})(?:\s*[-,–]\s*(\d{1,2}))?/g;
  let m; while((m=re.exec(t))){ const c='d'+m[1]; if(!VERS[c])continue;
    const a=Number(m[2]), b=Number(m[3]||m[2]);
    for(let v=a;v<=Math.min(b,VERS[c]);v++)out.add(c+':'+v); }
  return out;
}
const cub=new Set(); BANCO.forEach(q=>refsQ(q).forEach(r=>cub.add(r)));

/* Alcance OFICIAL del campamento (Daniel 1-3 y 6): la meta es 100%.
   Si al editar el banco se cae un versículo, esta prueba lo caza. */
const OFICIAL={d1:21,d2:49,d3:30,d6:28};
let huecos=[];
for(const [c,n] of Object.entries(OFICIAL)){
  const falta=[]; for(let v=1;v<=n;v++) if(!cub.has(c+':'+v)) falta.push(v);
  if(falta.length) huecos.push(`${c}: ${falta.join(', ')}`);
}
ok(huecos.length===0,
  'Alcance oficial: los 128 versículos de Daniel 1, 2, 3 y 6 tienen pregunta'
  + (huecos.length?' — SIN PREGUNTA -> '+huecos.join(' · '):''));

/* Alcance ampliado (Guías Mayores): piso más bajo, es otro evento. */
let flojos=[];
for(const [c,n] of Object.entries(VERS)){
  if(OFICIAL[c])continue;
  let k=0; for(let v=1;v<=n;v++) if(cub.has(c+':'+v)) k++;
  if(k/n < 0.35) flojos.push(`${c} ${Math.round(k/n*100)}%`);
}
ok(flojos.length===0, 'Alcance ampliado: Daniel 4 y 5 sobre el 35% de cobertura'
  + (flojos.length?' — flojos: '+flojos.join(', '):''));

const nPR = BANCO.filter(q=>q.cap.slice(0,2)==='pr').length;
const pctPR = nPR/BANCO.length;
ok(pctPR>=0.15 && pctPR<=0.28,
  `Profetas y Reyes pesa ${Math.round(pctPR*100)}% del banco (objetivo 15-28%; ` +
  `el reparto del examen real no se conoce)`);

// 14. Niveles: los tres existen y crecen de forma usable
const { nivelDe } = require(path.join(RAIZ,'fuente','niveles.js'));
const porNv = {1:0,2:0,3:0};
BANCO.forEach(q=>porNv[nivelDe(q)]++);
ok([1,2,3].every(n=>porNv[n]>=25),
  `Cada nivel tiene material suficiente (1:${porNv[1]} 2:${porNv[2]} 3:${porNv[3]})`);
for(const cat of ['av','gm']){
  const ids=CAPS.filter(c=>c.cats.includes(cat)).map(c=>c.id);
  const b=BANCO.filter(q=>ids.includes(q.cap));
  ok(b.filter(q=>nivelDe(q)===1).length>=NPREG_TEST(cat),
    `Categoría ${cat}: alcanza para un examen de práctica completo solo de nivel 1`);
}
function NPREG_TEST(c){return c==='av'?15:25;}

// 15. Devoción Matutina: cobertura completa del alcance del reglamento
const MATU = require(path.join(RAIZ,'fuente','matutina.js'));
const B_ALL = [...BANCO, ...MATU.MAT_BANCO];

ok(MATU.DIAS.length===31, `La matutina tiene los 31 días de octubre (${MATU.DIAS.length})`);

/* Cada día debe tener contenido completo y al menos 4 preguntas. */
const flojosDia=[], sinCont=[];
for(const x of MATU.DIAS){
  const id=MATU.idDia(x.d);
  const n=MATU.MAT_BANCO.filter(q=>q.cap===id).length;
  if(n<4)flojosDia.push(`${x.d} (${n})`);
  const c=MATU.MAT_CONTENIDO[id]||[];
  if(c.length<4 || c.some(s=>!s.t||!s.h))sinCont.push(String(x.d));
  if(!x.t||!x.r||!x.v||!x.q||!x.h||!x.l)sinCont.push(x.d+' datos');
}
ok(flojosDia.length===0, 'Cada día de la matutina tiene 4 o más preguntas'
  + (flojosDia.length?' — flojos: '+flojosDia.join(', '):''));
ok(sinCont.length===0, 'Cada día de la matutina tiene versículo, quién es, historia y lección'
  + (sinCont.length?' — incompletos: '+sinCont.join(', '):''));

/* El alcance de cada categoría es el del reglamento. */
const diasDe=c=>MATU.MAT_CAPS.filter(x=>x.cats.includes(c)).map(x=>Number(x.id.slice(1))).sort((a,b)=>a-b);
const d1=diasDe('dm1'), d2=diasDe('dm2');
ok(d1.length===15 && d1[0]===1 && d1[14]===15,
  `Matutina 4 a 6 años: días 1 al 15 (${d1.length} días)`);
ok(d2.length===31 && d2[0]===1 && d2[30]===31,
  `Matutina 7 a 9 años: días 1 al 30 más el 31 de lectura (${d2.length} días)`);

/* El día 31 está fuera del examen porque el reglamento llega al 30. */
const d31 = MATU.MAT_CAPS.find(x=>x.id==='m31');
ok(d31 && d31.extra===true, 'El día 31 está marcado como extra: se estudia pero no entra al examen');

/* Las referencias de los versículos no se repiten al azar entre distractores:
   cada pregunta de «qué versículo va con qué día» debe tener 4 opciones distintas. */
const malas = MATU.MAT_BANCO.filter(q=>q.t==='mc' && new Set(q.o).size!==q.o.length);
ok(malas.length===0, 'Ninguna pregunta de matutina repite una opción'
  + (malas.length?' — '+malas.length+' con opciones repetidas':''));

/* Ninguna pregunta de matutina cae en un capítulo que no existe. */
const idsMat = new Set(MATU.MAT_CAPS.map(c=>c.id));
ok(MATU.MAT_BANCO.every(q=>idsMat.has(q.cap)),
  'Todas las preguntas de matutina apuntan a un día existente');


/* ───────── examen imprimible ─────────
   El render es puro: no toca disco ni DOM, así que se prueba aquí mismo.
   Eso es todo el punto de haberlo sacado de tools/imprimir.js: antes solo se
   podía revisar abriendo el HTML generado a ojo. */
const IMPR=require(path.join(RAIZ,'fuente','imprimible.js'));
const MATU2=require(path.join(RAIZ,'fuente','matutina.js'));
const CAPS_T=[...CAPS,...MATU2.MAT_CAPS];
const BANCO_T=[...BANCO,...MATU2.MAT_BANCO];
const CATS_T={me:10,av:15,pa:25,gm:25,dm1:10,dm2:15};

function selDe(cat,n){
  const ids=CAPS_T.filter(c=>c.cats.includes(cat)&&!c.extra).map(c=>c.id);
  const b=BANCO_T.filter(q=>ids.includes(q.cap));
  const mc=b.filter(q=>q.t==='mc').slice(0,Math.max(1,Math.round(n*.6)));
  const tf=b.filter(q=>q.t==='tf').slice(0,Math.max(1,Math.round(n*.25)));
  const fl=b.filter(q=>q.t==='fill').slice(0,Math.round(n*.15));
  return [...mc,...tf,...fl];
}
const hoja=(cat,conR)=>IMPR.hojaExamen({sel:selDe(cat,CATS_T[cat]),cat,conR,
  logo:'',caps:CAPS_T,etiqueta:cat,alcance:'prueba'});

/* Las seis categorías tienen que poder imprimirse: es el «para todos los
   casos». Si una queda vacía, el examen sale en blanco. */
ok(Object.keys(CATS_T).every(c=>hoja(c,false).length>1200),
  'Las 6 categorías generan una hoja de examen con contenido');

/* La numeración corre de 1 a n sin saltos y en orden de sección. */
const numsOk=Object.keys(CATS_T).every(c=>{
  const sel=IMPR.ordenaYNumera(selDe(c,CATS_T[c]));
  const tipos=sel.map(q=>q.t);
  const pos=t=>tipos.indexOf(t);
  const orden=['mc','tf','fill'].filter(t=>pos(t)>=0).map(pos);
  return sel.every((q,i)=>q.n===i+1)&&
    orden.every((v,i)=>i===0||v>orden[i-1]);
});
ok(numsOk,'Numeración de 1 a n y secciones en orden I, II, III');

/* El examen del alumno no puede traer ni una respuesta. Se revisa el marcador
   verde, el visto y la palabra subrayada de completar. */
const sinR=Object.keys(CATS_T).map(c=>hoja(c,false)).join('');
ok(!/#1A7A1A/.test(sinR),'El examen sin respuestas no marca ninguna correcta');
ok(!/✔/.test(sinR),'El examen sin respuestas no trae vistos');
ok(!/SOLO PARA LÍDERES/.test(sinR),'El examen sin respuestas no lleva el aviso de líderes');

/* La clave sí las trae: una marca por cada múltiple y el aviso de líderes. */
const claveAv=hoja('av',true);
const nmcAv=selDe('av',15).filter(q=>q.t==='mc').length;
ok((claveAv.match(/✔/g)||[]).length===nmcAv,
  'La clave marca exactamente una opción por pregunta de selección múltiple');
ok(/SOLO PARA LÍDERES/.test(claveAv),'La clave avisa que es solo para líderes');

/* Examen y clave deben ser la misma prueba: mismo orden, mismas preguntas.
   Si se desincronizan, el líder califica con la hoja equivocada. */
const sel15=selDe('av',15);
const texto=h=>(h.match(/<b>\d+\.[^<]*/g)||[]).join('|');
ok(texto(IMPR.hojaExamen({sel:sel15,cat:'av',conR:false,logo:'',caps:CAPS_T,etiqueta:'x',alcance:'y'}))
  ===texto(IMPR.hojaExamen({sel:sel15,cat:'av',conR:true,logo:'',caps:CAPS_T,etiqueta:'x',alcance:'y'})),
  'La clave trae las mismas preguntas en el mismo orden que el examen');

/* En completar, la palabra de la respuesta no puede aparecer en la hoja del
   alumno ni siquiera oculta en el HTML. */
const fills=BANCO_T.filter(q=>q.t==='fill').slice(0,20);
const hojaFill=IMPR.hojaExamen({sel:fills,cat:'gm',conR:false,logo:'',caps:CAPS_T,
  etiqueta:'x',alcance:'y'});
const palabras=fills.flatMap(q=>q.p.filter(p=>p.b).map(p=>p.b));
ok(palabras.every(w=>!hojaFill.includes('>&nbsp;'+w)),
  'Completar: la palabra correcta no viaja en la hoja del alumno');

/* Documento autocontenido: sin CSS externo no hay nada que cargar, así que
   imprime igual sin internet. */
const doc=IMPR.docExamen([hoja('av',false)],'t','aviso');
ok(doc.startsWith('<!DOCTYPE html')&&/@page/.test(doc)&&/page-break-inside/.test(doc),
  'El documento imprimible es autocontenido y trae reglas de paginación');
ok(!/<link|src="http|@import/.test(doc),'El documento imprimible no pide archivos externos');

/* Las seis hojas en un documento: cada una debe empezar en página nueva. */
const seis=IMPR.docExamen(Object.keys(CATS_T).map(c=>hoja(c,false)),'t');
ok((seis.match(/class="hoja"/g)||[]).length===6,
  'El documento de las 6 categorías trae 6 hojas con salto de página');

/* La matutina no puede salir titulada «Conexión Bíblica» ni citando la
   RV1995: es otro evento y otra fuente. */
ok(/DEVOCIÓN MATUTINA/.test(hoja('dm2',false))&&!/RV1995/.test(hoja('dm2',false)),
  'El examen de matutina lleva su propio título y su propia fuente');
ok(/CONEXIÓN BÍBLICA/.test(hoja('av',false))&&/RV1995/.test(hoja('av',false)),
  'El examen de Conexión Bíblica cita la RV1995');

/* La app y el generador de material tienen que compartir el render: si
   alguien vuelve a copiar el HTML dentro de tools/imprimir.js, esto falla. */
const htmlApp=fs.readFileSync(path.join(RAIZ,'index.html'),'utf8');
ok(/function hojaExamen/.test(htmlApp)&&/function imprimeExamen/.test(htmlApp),
  'index.html trae el render compartido y los botones de impresión');


/* ───────── guía y tarjetas imprimibles ─────────
   El render de la guía también es compartido: la herramienta saca la de los
   dos eventos y la app la del participante. Si alguien vuelve a duplicarlo,
   la última prueba de este bloque falla. */
const TARJ=require(path.join(RAIZ,'fuente','tarjetas.js')).TARJETAS;
const TARJ_ALL=[...TARJ,...MATU2.MAT_TARJETAS];

const guiaAv=IMPR.hojaGuia({
  caps:CAPS.filter(c=>c.cats.includes('av')), contenido:CONTENIDO,
  modulos:MODULOS.filter(m=>m.cats.includes('av')), contModulos:CONT_MODULOS,
  logo:'', titulo:'T', sub:'S', meta:'M'});
const nAvCaps=CAPS.filter(c=>c.cats.includes('av')).length;
const nAvMods=MODULOS.filter(m=>m.cats.includes('av')).length;
ok((guiaAv.match(/class="gcap"/g)||[]).length===nAvCaps+nAvMods,
  'La guía de Aventureros trae sus '+nAvCaps+' capítulos y '+nAvMods+' módulos');
ok(CAPS.filter(c=>c.cats.includes('av')).every(c=>guiaAv.includes(c.label)),
  'La guía nombra cada capítulo de la categoría');
ok(!CAPS.filter(c=>!c.cats.includes('av')).some(c=>guiaAv.includes('>'+c.label+' —')),
  'La guía de Aventureros no incluye capítulos de otra categoría');

/* Cada sección del contenido tiene que llegar al papel: si el render se salta
   una, el que estudia impreso queda con menos material que el que estudia en
   la app, y eso no se nota hasta el examen. */
const secsAv=CAPS.filter(c=>c.cats.includes('av'))
  .reduce((n,c)=>n+(CONTENIDO[c.id]||[]).length,0);
ok((guiaAv.match(/<h3>/g)||[]).length>=secsAv,
  'La guía impresa trae todas las secciones del contenido ('+secsAv+')');

const guiaMat=IMPR.hojaGuia({
  caps:MATU2.MAT_CAPS, contenido:MATU2.MAT_CONTENIDO,
  modulos:MATU2.MAT_MODULOS, contModulos:MATU2.MAT_CONT_MODULOS,
  logo:'', titulo:'T'});
ok((guiaMat.match(/class="gcap"/g)||[]).length===MATU2.MAT_CAPS.length+MATU2.MAT_MODULOS.length,
  'La guía de la matutina trae los 31 días y sus módulos');
ok(MATU2.DIAS.every(x=>guiaMat.includes(x.t)),'La guía de la matutina nombra los 31 títulos');

const tj=IMPR.hojaTarjetas({tarjetas:TARJ_ALL, caps:CAPS_T, logo:'', titulo:'T'});
ok((tj.match(/class="tarjeta"/g)||[]).length===TARJ_ALL.length,
  'Las tarjetas imprimibles son las '+TARJ_ALL.length+' del banco');
/* La respuesta vive en `r`, no en `d`. Con `t.d` la prueba pasaba porque el
   HTML traía literalmente la palabra «undefined» y includes('undefined') era
   verdadero: 143 tarjetas impresas sin respuesta y la prueba en verde. De ahí
   el chequeo explícito de que no aparezca «undefined». */
ok(TARJ_ALL.every(t=>tj.includes(t.r)),'Cada tarjeta impresa trae su respuesta');
ok(!/undefined/.test(tj),'Las tarjetas impresas no traen campos vacíos');
ok(!/undefined/.test(guiaAv+guiaMat),'La guía impresa no trae campos vacíos');
ok(/break-inside: avoid/.test(IMPR.CSS_IMPR),
  'Las tarjetas no se pueden partir entre dos hojas');

ok(/function imprimeGuia/.test(htmlApp)&&/function imprimeTarjetas/.test(htmlApp)&&
   /function hojaGuia/.test(htmlApp),
  'index.html puede imprimir la guía y las tarjetas');

/* Los códigos de progreso: el resumen no debe llevar el estado completo. */
ok(/function codigoResumen|const codigoResumen/.test(htmlApp)&&
   /function leeCodigo/.test(htmlApp),
  'index.html trae los códigos de progreso');

/* ───────── el manual vive en la app ─────────
   Se quitaron tools/imprimir.js y tools/manuales.js: solo servían para dejar
   archivos fuera de la app, y todo tiene que salir de la app. Estas pruebas
   fijan esa decisión y la coherencia del manual con los datos reales. */
const {MANUAL}=require(path.join(RAIZ,'fuente','manual.js'));

ok(!fs.existsSync(path.join(RAIZ,'tools','imprimir.js'))&&
   !fs.existsSync(path.join(RAIZ,'tools','manuales.js')),
  'No quedan herramientas que generen material fuera de la app');

ok(MANUAL.length>=15,'El manual trae '+MANUAL.length+' temas');
ok(MANUAL.some(m=>m.para==='estudia')&&MANUAL.some(m=>m.para==='director'),
  'El manual cubre a quien estudia y al director');
ok(MANUAL.every(m=>m.id&&m.icono&&m.t&&m.d&&m.secs&&m.secs.length),
  'Cada tema del manual tiene id, icono, título, bajada y secciones');
ok(new Set(MANUAL.map(m=>m.id)).size===MANUAL.length,'Los ids del manual no se repiten');
ok(MANUAL.every(m=>m.secs.every(s=>s.t&&s.h)),'Cada sección del manual tiene título y cuerpo');

/* Las marcas {ENTRE_LLAVES} las reemplaza la app. Una marca que la app no
   conoce saldría impresa tal cual en la pantalla, así que la lista de marcas
   válidas se fija aquí. */
const MARCAS_OK=['CAPS_CAT','MODS_CAT','TJ_CAT','BANCO_CAT','BANCO_TOTAL',
  'TJ_TOTAL','CAT_NOMBRE','CAT_EV','TABLA_CATS'];
const usadas=new Set();
for(const m of MANUAL)for(const s of m.secs)
  for(const g of s.h.matchAll(/\{([A-Z_]+)\}/g))usadas.add(g[1]);
const marcasMalas=[...usadas].filter(x=>!MARCAS_OK.includes(x));
ok(marcasMalas.length===0,'El manual no usa marcas que la app no sepa reemplazar'+
  (marcasMalas.length?' — '+marcasMalas.join(', '):''));
ok(MARCAS_OK.every(k=>new RegExp(k+':').test(htmlApp)),
  'La app sabe reemplazar todas las marcas de la lista');

/* El manual tiene que decir lo que hay que decir: son los dos puntos donde
   un error cuesta el concurso. */
const txtMan=MANUAL.map(m=>m.t+' '+m.secs.map(s=>s.t+' '+s.h).join(' ')).join(' ');
ok(/Reina-Valera 1995/.test(txtMan)&&/Nueva Reina-Valera/.test(txtMan),
  'El manual explica qué versión de la Biblia es');
ok(/SOLO PARA LÍDERES/.test(txtMan),'El manual avisa que la clave es para líderes');
ok(/Ya lo estudié/.test(txtMan),'El manual explica que el círculo se llena al marcar el capítulo');
ok(/voz alta/.test(txtMan),'El manual explica el mecanismo de las tarjetas');

ok(/function pintaAyuda/.test(htmlApp)&&/function imprimeManual/.test(htmlApp)&&
   /p-ayuda/.test(htmlApp),
  'index.html trae la pantalla del manual y su impresión');

/* ───────── el manual no puede quedarse atrás de la interfaz ─────────
   Las cifras del manual se resuelven con marcas, pero los nombres de los
   botones son prosa escrita a mano, y al reorganizar pantallas quedaron tres
   afirmaciones falsas: el manual decía que se imprimía desde Estudiar algo que
   está en otra pantalla, citaba un bloque con un nombre que ya no existía, y
   listaba cuatro botones donde hay seis.

   Se compara contra fuente/cuerpo.html, que es la interfaz de verdad. Contra
   index.html el chequeo sería circular: el manual va incrustado ahí dentro y
   se validaría a sí mismo. */
const CUERPO=fs.readFileSync(FUENTE('cuerpo.html'),'utf8');
const manPorId=Object.fromEntries(MANUAL.map(m=>[m.id,m.secs.map(s=>s.h).join(' ')]));

/* Botones de impresión que hay en cada pantalla, leídos de la interfaz. */
function pantalla(id){
  const i=CUERPO.indexOf('id="'+id+'"');
  if(i<0)return '';
  const j=CUERPO.indexOf('<div id="p-', i+10);
  return CUERPO.slice(i, j<0?CUERPO.length:j);
}
const etiquetasImpr=trozo=>[...trozo.matchAll(/onclick="imprime\w+\([^)]*\)"[^>]*>([^<]+)</g)]
  .map(m=>m[1].replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,'').trim());

const btsEstudio=etiquetasImpr(pantalla('p-estudio'));
const btsExamen=etiquetasImpr(pantalla('p-examen'));
const btsAyuda=etiquetasImpr(pantalla('p-ayuda'));

ok(btsEstudio.length>0&&btsExamen.length>0&&btsAyuda.length>0,
  'Cada pantalla con impresión tiene botones detectables');

/* Todo botón de impresión de Estudiar tiene que estar documentado en el tema
   del manual que habla de estudiar en papel, y ninguno de otra pantalla puede
   aparecer ahí como si estuviera. */
const faltanEst=btsEstudio.filter(t=>!manPorId['a-papel'].includes(t));
ok(faltanEst.length===0,'El manual documenta los botones de impresión de Estudiar'+
  (faltanEst.length?' — falta: '+faltanEst.join(' / '):''));

/* Y los del bloque del director, en su tema. */
const faltanEx=btsExamen.filter(t=>!manPorId['d-imprimir'].includes(t));
ok(faltanEx.length===0,'El manual documenta los botones de impresión del director'+
  (faltanEx.length?' — falta: '+faltanEx.join(' / '):''));

/* ───────── toda tabla ancha va envuelta para que scrollee sola ─────────
   La tabla de las categorías tiene cinco columnas y la columna clave llevaba
   white-space:nowrap, así que su ancho mínimo pasaba de 390px: en el celular se
   salía de la pantalla y arrastraba la tarjeta. Una tabla no puede medir menos
   que su contenido, así que el arreglo no es CSS sobre la tabla: es envolverla.
   Se cuenta sobre el código y el manual, no sobre index.html, porque ahí el
   chequeo sería circular. */
const CSS=fs.readFileSync(FUENTE('estilos.css'),'utf8');
const FUENTES_TABLA=['app.js','manual.js'].map(f=>fs.readFileSync(FUENTE(f),'utf8')).join('\n');
const tablas=(FUENTES_TABLA.match(/<table class="info-table"/g)||[]).length;
ok(tablas>0,'Hay tablas info-table que revisar ('+tablas+')');
const sinEnvolver=tablas-(FUENTES_TABLA.match(/tabla-scroll">\s*<table class="info-table"/g)||[]).length;
ok(sinEnvolver===0,'Toda tabla info-table va dentro de un .tabla-scroll'+
  (sinEnvolver?' — quedan '+sinEnvolver+' sueltas':''));
ok(/\.tabla-scroll\{overflow-x:auto/.test(CSS),'El contenedor .tabla-scroll scrollea de lado');
ok(/@media print\{\.tabla-scroll\{overflow:visible\}\}/.test(CSS),
  'En papel la tabla envuelta sale completa, sin recorte');

/* ───────── width:100% junto a un margen horizontal desborda ─────────
   El botón de «Qué estudiar hoy» se salía de la tarjeta en el celular: tenía
   width:100% y margin-left a la vez, y con box-sizing:border-box el 100% ya es
   todo el contenedor, así que el margen se suma por fuera. En pantalla de
   escritorio no se nota porque sobra ancho; en un iPhone el botón queda cortado
   contra el borde. Se revisa el CSS regla por regla en vez de confiar en el ojo. */
const reglas=[...CSS.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m=>({sel:m[1].trim(),cuerpo:m[2]}));
const desbordan=reglas.filter(r=>
  /width:\s*100%/.test(r.cuerpo)&&
  /margin-(left|right):\s*(?!0)/.test(r.cuerpo)&&
  !/width:\s*calc\(100%/.test(r.cuerpo));
ok(desbordan.length===0,'Ninguna regla junta width:100% con un margen horizontal'+
  (desbordan.length?' — revisar: '+desbordan.map(r=>r.sel).join(', '):''));

/* Y que el arreglo siga puesto: si alguien vuelve a poner width:100% ahí, la
   prueba de arriba lo caza, pero esta dice qué se esperaba. */
ok(/\.tbt\{width:calc\(100% - var\(--sangra\)\)/.test(CSS),
  'El botón de la tarea descuenta su sangrado del ancho');

/* ───────── los iconos del historial ─────────
   El historial marca cada examen con un icono según su modo. Ya pasó una vez
   que el manual prometía la marca del examen por link y la interfaz no la
   ponía: el manual decía «queda marcado como examen compartido» y en la tabla
   no salía nada. Se leen los iconos del código y se exige que el manual
   explique cada uno, para que el director no vea un dibujito sin significado. */
const APP=fs.readFileSync(FUENTE('app.js'),'utf8');
const mtBloque=/const mt=\{([^}]*)\}\[e\.modo\]/.exec(APP);
ok(!!mtBloque,'Se encuentra en el código la tabla de iconos del historial');
const iconosHist=mtBloque?[...mtBloque[1].matchAll(/'([^']*)'/g)].map(m=>m[1].trim()).filter(Boolean):[];
ok(iconosHist.length>=3,'El historial marca al menos simulacro, errores y link ('+iconosHist.length+')');
const iconosSinDocu=iconosHist.filter(i=>!txtMan.includes(i));
ok(iconosSinDocu.length===0,'El manual explica todos los iconos del historial'+
  (iconosSinDocu.length?' — falta: '+iconosSinDocu.join(' '):''));
ok(/compartido/.test(mtBloque?mtBloque[1]:''),
  'El examen por link tiene su propia marca en el historial');

/* ───────── el manual no puede prometer una revisión que ya no sale ─────────
   Antes de v15 el manual decía que al terminar se ven «todas las preguntas con
   la respuesta correcta», sin excepción. Con el simulacro y el link cerrados
   eso quedó falso, y es justo la clase de frase que nadie vuelve a leer. */
ok(/no sale la revisión/.test(txtMan),
  'El manual avisa que en el simulacro y en el link no sale la revisión');
ok(/clave/.test(manPorId['a-examen']),
  'El tema del examen dice que la revisión la abre el director con su clave');
ok(/Repasar mis errores/.test(manPorId['d-limites'])||/mis errores/.test(manPorId['d-limites']),
  'El manual del director documenta la vuelta por «mis errores»');
ok(/segunda ficha|otra ficha/.test(manPorId['d-limites']),
  'El manual del director documenta que otra ficha puede rehacer un link');

/* La afirmación exacta que estaba mal: el manual de la app no se imprime desde
   Estudiar, y el tema de Estudiar no debe decir que sí. */
ok(!btsEstudio.some(t=>/manual/i.test(t)),
  'El manual de la app no se imprime desde Estudiar (la interfaz)');
ok(!/<li><strong>Este manual<\/strong>/.test(manPorId['a-papel']),
  'El manual no dice que se imprime a sí mismo desde Estudiar');

/* Cada <summary> que el manual cita tiene que existir tal cual en la
   interfaz. Comparación exacta sobre el texto sin emojis: la comparación
   difusa daba cero y dejaba pasar un nombre viejo. */
const limpiaEtq=s=>s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,'')
  .replace(/\s+/g,' ').trim();
const sumarios=[...CUERPO.matchAll(/<summary[^>]*>([^<]+)</g)]
  .map(m=>limpiaEtq(m[1])).filter(Boolean);
const textoMan=MANUAL.map(m=>m.secs.map(s=>s.h).join(' ')).join(' ');
const citadas=[...textoMan.matchAll(/<strong>[^<]*→\s*([^<]+)<\/strong>/g)]
  .map(m=>limpiaEtq(m[1]));
const inventadas=citadas.filter(c=>!sumarios.some(s=>s===c));
ok(inventadas.length===0,'El manual no cita bloques que ya no existen'+
  (inventadas.length?' — '+inventadas.join(' / '):''));


console.log('\n'+(fallos===0?'TODAS LAS PRUEBAS PASARON':fallos+' FALLOS'));
process.exit(fallos?1:0);
