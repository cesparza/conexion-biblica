const fs=require('fs');
const path=require('path');
const {montar,RAIZ,FUENTE,HTML:html,JS:js}=require('./entorno.js');
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
/* El stub del navegador y la lectura del index.html vienen de tests/entorno.js.
   Esta era la cuarta copia del stub: una mini, distinta de las otras tres, que
   nadie volvió a mirar. */
const {normalizar,esc}=montar('normalizar, esc');
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
/* UNA sola lectura de fuente/app.js para toda la suite. Habia siete, con siete
   nombres distintos (APP, APP, APP, APP, APP, APP, APP), y eso
   invitaba a agregar la octava en vez de reusar. `APP` es la fuente; `js` es el
   JS extraido del index.html desplegado. Para afirmar sobre lo que se SIRVE,
   preferir `js`. */
const APP = fs.readFileSync(FUENTE('app.js'), 'utf8');
ok(html.includes(cssF), 'index.html incluye los estilos de fuente/estilos.css');
ok(html.includes(APP.trim().split('\n').find(l => l.startsWith('const CLAVE'))),
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

/* Alcance OFICIAL del campamento: el reglamento quedó en DANIEL 1, 3 y 6, más
   los capítulos 39, 41 y 44 de Profetas y Reyes. La meta es 100%: si al editar
   el banco se cae un versículo, esta prueba lo caza.
   Daniel 2 salió de esta lista y pasa al piso del alcance ampliado. Está al
   100% y así se queda, pero ya no es la prueba la que lo obliga. */
const OFICIAL={d1:21,d3:30,d6:28};
let huecos=[];
for(const [c,n] of Object.entries(OFICIAL)){
  const falta=[]; for(let v=1;v<=n;v++) if(!cub.has(c+':'+v)) falta.push(v);
  if(falta.length) huecos.push(`${c}: ${falta.join(', ')}`);
}
ok(huecos.length===0,
  'Alcance oficial: los 79 versículos de Daniel 1, 3 y 6 tienen pregunta'
  + (huecos.length?' — SIN PREGUNTA -> '+huecos.join(' · '):''));

/* Alcance ampliado (Guías Mayores): Daniel 2, 4 y 5. Empezó con un piso del
   35% porque era otro evento y no alcanzaba el tiempo. Ya están los tres al
   100%, así que el piso pasa a ser 100%: lo ganado no se puede perder. */
let flojos=[];
for(const [c,n] of Object.entries(VERS)){
  if(OFICIAL[c])continue;
  const falta=[]; for(let v=1;v<=n;v++) if(!cub.has(c+':'+v)) falta.push(v);
  if(falta.length) flojos.push(`${c}: ${falta.join(', ')}`);
}
ok(flojos.length===0, 'Alcance ampliado: los 117 versículos de Daniel 2, 4 y 5 tienen pregunta'
  + (flojos.length?' — SIN PREGUNTA -> '+flojos.join(' · '):''));

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

/* Mismo criterio que bancoDe() en la app: `extra` puede ser un booleano
   (fuera del examen de todos) o una lista de categorías (fuera del de esas).
   Si este helper y la app filtran distinto, el examen impreso trae capítulos
   que el de pantalla no, y nadie lo nota hasta que la hoja está en la mano. */
const soloEstudioT=(c,cat)=>Array.isArray(c.extra)?c.extra.includes(cat):!!c.extra;

function selDe(cat,n){
  /* Mismo criterio que poolDe() con alcance «todo»: las 28 creencias son otro
     evento y no entran al examen del campamento ni a su hoja impresa. */
  const ids=CAPS_T.filter(c=>c.cats.includes(cat)&&!soloEstudioT(c,cat)&&c.ev!=='creencias').map(c=>c.id);
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
/* Se lee el botón COMPLETO y se le quitan las etiquetas. Con la captura vieja
   («hasta el primer <») un icono SVG dentro del botón dejaba la etiqueta vacía
   y la prueba decía que la pantalla no tenía botones de impresión. Es el mismo
   error de método que ya se había cometido con los <summary>. */
const etiquetasImpr=trozo=>[...trozo.matchAll(/onclick="imprime\w+\([^)]*\)"[^>]*>([\s\S]*?)<\/button>/g)]
  .map(m=>m[1].replace(/<[^>]*>/g,' ')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,'')
    .replace(/\s+/g,' ').trim());

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
/* El CSS sin comentarios, declarado JUNTO a su fuente y no donde se usa por
   primera vez: es la cuarta vez que este proyecto se cae por TDZ (diaHoy,
   MARCA_V, vozBtn y ahora esta). Hace falta porque una afirmacion NEGATIVA
   sobre una regla se cae con su propio comentario: `[^}]*` cruza el comentario
   que EXPLICA por que la propiedad no esta, y la encuentra ahi. */
const CSS_SIN=CSS.replace(/\/\*[\s\S]*?\*\//g,'');
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
  'El manual avisa que en el simulacro y en la evaluación no sale la revisión');
ok(/clave/.test(manPorId['a-examen']),
  'El tema del examen dice que la revisión la abre el director con su clave');
ok(/Repasar mis errores/.test(manPorId['d-limites'])||/mis errores/.test(manPorId['d-limites']),
  'El manual del director documenta la vuelta por «mis errores»');
/* Antes esto verificaba que el manual documentara una TRAMPA: con una segunda
   ficha se podía rehacer el examen. Desde v24 esa puerta la cierra la base de
   datos, así que ahora se verifica lo contrario: que el manual explique la
   garantía, y no una limitación que ya no existe. */
ok(/cada una hace la evaluación una vez|una vez por persona|propio código/.test(manPorId['d-limites']),
  'El manual del director explica que cada participante hace la evaluación una sola vez');

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
const sumarios=[...CUERPO.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map(m=>[m[0],m[1].replace(/<[^>]*>/g,' ')])
  .map(m=>limpiaEtq(m[1])).filter(Boolean);
const textoMan=MANUAL.map(m=>m.secs.map(s=>s.h).join(' ')).join(' ');
const citadas=[...textoMan.matchAll(/<strong>[^<]*→\s*([^<]+)<\/strong>/g)]
  .map(m=>limpiaEtq(m[1]));
const inventadas=citadas.filter(c=>!sumarios.some(s=>s===c));
ok(inventadas.length===0,'El manual no cita bloques que ya no existen'+
  (inventadas.length?' — '+inventadas.join(' / '):''));


/* ───────── el panel del director va en tres pasos ─────────
   Los tres defectos que se vieron en el panel real: el botón «Abrir una
   evaluación» pintado ARRIBA del formulario, el texto de ayuda describiendo
   siempre la opción 0 del desplegable aunque estuviera puesta otra, y el
   «no hay participantes» en letra pequeña al final.
   Se comprueba sobre fuente/app.js, no sobre index.html, porque ahí el chequeo
   sería circular. Es una prueba de ORDEN DE TEXTO en el fuente: barata y frágil
   ante un refactor. Si el panel se reescribe, esta prueba se reescribe. */
const posCampo=APP.indexOf('id="pan-eval-t"');
const posBoton=APP.indexOf('id="pan-abrir"');
ok(posCampo>0&&posBoton>posCampo,
  'El botón de abrir la evaluación se pinta DESPUÉS de los campos que hay que llenar');
ok(/id="pan-abrir"[^']*disabled/.test(APP),
  'El botón de abrir nace deshabilitado y lo habilita revisaAbrir()');
ok(/pan-abrir-razon/.test(APP),
  'Cuando el botón está apagado, la razón queda a la vista');

/* El texto de ayuda de Dificultad tiene que existir para CADA opción del
   desplegable y cambiar con la selección, no ser un párrafo fijo. */
const opcionesNv=[...APP.matchAll(/<option value="([0-3])">[^<]*<\/option>/g)].map(m=>m[1]);
const notas=[...APP.matchAll(/^  ([0-3]):'/gm)].map(m=>m[1]);
ok(opcionesNv.length>=4&&opcionesNv.every(v=>notas.includes(v)),
  'Cada opción de Dificultad tiene su propio texto de ayuda en NOTA_NIVEL'+
  (opcionesNv.length?' (opciones '+opcionesNv.join(',')+' · notas '+notas.join(',')+')':''));
ok(/id="pan-eval-nv" onchange="pintaNotaNivel\(\)"/.test(APP),
  'Al cambiar la dificultad, el texto de ayuda se repinta');

/* Una sola forma de cerrar: mientras hay evaluación abierta, el panel no puede
   ofrecer también el botón de abrir. Eran dos caminos y de ahí venía la
   confusión al cerrar. */
const bloquePanel=APP.slice(APP.indexOf('async function pintaPanel'),APP.indexOf('const NOTA_NIVEL'));
const trozoAbierta=bloquePanel.slice(bloquePanel.indexOf('if(hayEval){'),bloquePanel.indexOf('d.innerHTML=\'<div class="det-cuerpo">\'+\n\n'));
ok(/cierraEvaluacion/.test(trozoAbierta)&&!/abreEvaluacion/.test(trozoAbierta),
  'Con evaluación abierta el panel solo ofrece cerrarla, nunca abrir otra');

/* ───────── el alcance del campamento ─────────
   MECANISMO: `extra` marca un capítulo que se estudia y no se examina. Era un
   booleano global, y con el reglamento nuevo eso ya no alcanza: el campamento
   quedó en Daniel 1, 3 y 6, pero Guías Mayores es otro evento y ahí Daniel 2 sí
   entra al examen. El mismo capítulo tiene que estar fuera del examen de unas
   categorías y dentro del de otras, así que `extra` acepta una lista.
   Estas pruebas existen porque el error se vería en un examen, no en la app. */
const CAMPAMENTO=['me','av','pa'];
const bancoCat=cat=>{
  const ids=CAPS_T.filter(c=>c.cats.includes(cat)&&!soloEstudioT(c,cat)&&c.ev!=='creencias').map(c=>c.id);
  return BANCO_T.filter(q=>ids.includes(q.cap));
};
for(const cat of CAMPAMENTO){
  ok(bancoCat(cat).every(q=>q.cap!=='d2'),
    'Campamento ('+cat+'): ninguna pregunta de Daniel 2 entra al examen');
  ok(CAPS_T.some(c=>c.id==='d2'&&c.cats.includes(cat)),
    'Campamento ('+cat+'): Daniel 2 SIGUE disponible para estudiar');
}
ok(bancoCat('gm').some(q=>q.cap==='d2'),
  'Guías Mayores conserva Daniel 2 en su examen: es otro evento');
for(const c of ['d1','d3','d6']){
  ok(bancoCat('av').some(q=>q.cap===c),'Aventureros examina '+c);
}
for(const c of ['pr39','pr41','pr44']){
  ok(bancoCat('av').some(q=>q.cap===c),'Aventureros examina '+c);
}
ok(bancoCat('av').every(q=>!['pr40','pr42','pr43'].includes(q.cap)),
  'Aventureros no examina los capítulos de P&R que no le tocan');
/* El aviso en pantalla: un capítulo que se estudia y nunca sale en el examen
   parece un error de la app si no se dice. */
ok(/soloEstudio\(c,S\.cat\)\?'<div class="solo-est">/.test(APP),
  'La lista de capítulos marca «Solo para estudiar» el que no entra al examen');

/* ───────── CALIDAD DEL BANCO: patrones que se pueden explotar ─────────
   MECANISMO DEL PROBLEMA: en una pregunta de selección múltiple, la respuesta
   correcta se escribe con cuidado y los distractores se escriben rápido. La
   correcta termina siendo la opción más larga, y entonces se puede aprobar
   sin saber nada: escoger siempre la más larga. Con 4 opciones, el azar da
   25%. Esta prueba mide el sesgo real y le pone un TECHO para que no empeore.
   El techo es la línea de base de hoy, no la meta: la meta es bajarlo
   reescribiendo distractores, y cada vez que baje, se baja el techo. */
const TODO_MC=[...BANCO,...MATU2.MAT_BANCO,...require(path.join(RAIZ,'fuente','creencias.js')).CR_BANCO]
  .filter(q=>q.t==='mc'&&q.o&&q.o.length===4);
/* Lo que se mide es la brecha, no el empate. Que la correcta sea dos
   caracteres más larga no lo nota nadie; que sea el doble de larga se ve a un
   metro. El umbral es 25% más larga que el mejor distractor.
   HISTORIA DEL TECHO: empezó en 38% cuando se midió por primera vez, y bajó a
   22% al reescribir los distractores de 82 preguntas. Cada vez que baje de
   verdad, se baja el techo: así la deuda no puede volver a crecer. */
/* Dos condiciones, no una: 25% más larga Y al menos 10 caracteres de
   diferencia. Sin la segunda, la medida se queja de «Cuatro» contra «Tres» en
   opciones de una palabra, que es una diferencia que nadie ve, y esconde las
   que sí importan detrás del ruido. */
const larga=q=>{const L=q.o.map(o=>String(o).length);
  const ot=Math.max(...L.filter((_,i)=>i!==q.a));
  return L[q.a]>ot*1.25 && L[q.a]-ot>=10;};
/* La medida es de DOS LADOS. Al alargar distractores se puede caer en el sesgo
   contrario, que se explota igual: escoger siempre la más corta. */
const corta=q=>{const L=q.o.map(o=>String(o).length);
  const ot=Math.min(...L.filter((_,i)=>i!==q.a));
  return L[q.a]*1.25<ot && ot-L[q.a]>=10;};
const delatoras=TODO_MC.filter(larga).length;
const pctDelata=Math.round(delatoras/TODO_MC.length*100);
const pctCorta=Math.round(TODO_MC.filter(corta).length/TODO_MC.length*100);
ok(pctCorta<=8,'Y tampoco se delata por ser la más CORTA: '+pctCorta+'% (techo 8%)');
const masLarga=TODO_MC.filter(q=>{
  const L=q.o.map(o=>String(o).length);
  return L[q.a]===Math.max(...L);
}).length;
ok(pctDelata<=13,
  'La correcta se delata por tamaño (más de 25% más larga) en el '+pctDelata+'% de '+
  TODO_MC.length+' múltiples — techo 13%; y es la más larga en el '+
  Math.round(masLarga/TODO_MC.length*100)+'%');

/* El alcance del campamento tiene techo propio y más bajo: es el examen que se
   va a presentar. El resto del banco puede ir más atrás sin que eso afecte la
   nota del 9 de octubre. */
const CAMP_MC=BANCO.filter(q=>q.t==='mc'&&q.o&&q.o.length===4&&
  ['d1','d3','d6','pr39','pr41','pr44'].includes(q.cap));
const pctCamp=Math.round(CAMP_MC.filter(larga).length/CAMP_MC.length*100);
ok(pctCamp<=5,'En el alcance del campamento el sesgo por tamaño es del '+pctCamp+
  '% de '+CAMP_MC.length+' múltiples (techo 5%)');

/* Lo mismo con verdadero o falso: si la mayoría son verdaderas, contestar
   siempre «verdadero» saca nota. */
const TODO_TF=[...BANCO,...MATU2.MAT_BANCO].filter(q=>q.t==='tf');
const pctV=Math.round(TODO_TF.filter(q=>q.a).length/TODO_TF.length*100);
ok(pctV>=35&&pctV<=65,
  'Las de verdadero o falso están repartidas: '+pctV+'% verdaderas de '+TODO_TF.length+' (rango 35-65%)');

/* Dos preguntas de completar con el MISMO rótulo dentro del mismo capítulo: en
   la revisión el estudiante ve dos veces el mismo encabezado y no sabe cuál
   falló. Pasó al renombrar una referencia mal puesta. */
const rot={};
BANCO.filter(q=>q.t==='fill').forEach(q=>{const k=q.cap+'|'+q.ins;rot[k]=(rot[k]||0)+1;});
const rotDup=Object.entries(rot).filter(([,n])=>n>1).map(([k])=>k);
ok(rotDup.length===0,'Ningún rótulo de completar se repite dentro del mismo capítulo'+
  (rotDup.length?' — '+rotDup.join(' / '):''));

/* La pregunta «¿a qué creencia corresponde esta declaración?» no puede llevar
   el título de la creencia dentro de la cita: se contestaría sola. */
const CRE=require(path.join(RAIZ,'fuente','creencias.js'));
const titCre={};CRE.CR_CAPS.forEach(c=>{titCre[c.id]=c.sub;});
const delatan=CRE.CR_BANCO.filter(q=>/corresponde esta declaración/.test(q.q||''))
  .filter(q=>{
    const cita=(q.q.split('«')[1]||'').toLowerCase().slice(0,60);
    return cita.includes(titCre[q.cap].toLowerCase().slice(0,14));
  }).map(q=>q.cap);
ok(delatan.length===0,'Ninguna declaración de creencia se autodelata'+
  (delatan.length?' — '+delatan.join(', '):''));

/* La guía impresa del campamento no puede traer las 28 creencias: se imprime
   para estudiar lo que el examen del campamento pregunta. */
/* La guia impresa ya no filtra creencias a mano: se arma por categoria, y
   una categoria de Conexion Biblica no tiene creencias que excluir. Antes
   llevaba un `c.ev!=='creencias'` pegado, que era el sintoma del modelo
   mezclado. */
const bloqueGuias=APP.slice(APP.indexOf('function imprimeGuiasTodo'),
                             APP.indexOf('function imprimeGuiasTodo')+1400);
ok(!/c\.ev!=='creencias'/.test(bloqueGuias),
  'La guía impresa ya no necesita excluir las creencias a mano');
ok(/CATS\[k\]\.act===ev/.test(APP)||/c\.act===ev/.test(APP),
  'La guía impresa agrupa por actividad');


/* ── PISOS DE CONTENIDO DE ESTUDIO ──────────────────────────────────────
   El material habia crecido desparejo sin que nada lo notara: Daniel 2 tenia
   49 versiculos y 3.845 caracteres de explicacion, menos que Daniel 1 que
   tiene 21 y tenia 7.448. Los de Profetas y Reyes estaban entre 1.291 y
   2.358, la mitad de un capitulo biblico. Estos pisos son floor, no igualdad:
   agregar contenido nunca rompe la suite, quitarlo si. */
const largoDe = id => (CONTENIDO[id]||[]).reduce((a,s)=>a+s.h.length,0);
const flacosBib = CAPS.filter(c=>c.src==='Biblia')
  .filter(c=>CONTENIDO[c.id].length<8||largoDe(c.id)<5500)
  .map(c=>`${c.label} (${CONTENIDO[c.id].length} secs, ${largoDe(c.id)} chars)`);
ok(flacosBib.length===0,
  'Cada capitulo de la Biblia tiene 8+ secciones y 5.500+ caracteres de estudio'+
  (flacosBib.length?' — '+flacosBib.join(', '):''));

const flacosPR = CAPS.filter(c=>c.src==='Elena de White')
  .filter(c=>CONTENIDO[c.id].length<7||largoDe(c.id)<2500)
  .map(c=>`${c.label} (${CONTENIDO[c.id].length} secs, ${largoDe(c.id)} chars)`);
ok(flacosPR.length===0,
  'Cada capitulo de P&R tiene 7+ secciones y 2.500+ caracteres de estudio'+
  (flacosPR.length?' — '+flacosPR.join(', '):''));

/* Los tres del alcance del campamento son los que se estudian de verdad, asi
   que llevan un piso mas alto. */
const TRES_CAMP=['d1','d3','d6'];
const camppobres=TRES_CAMP.filter(id=>largoDe(id)<7000)
  .map(id=>id+' ('+largoDe(id)+')');
ok(camppobres.length===0,
  'Los tres capitulos del campamento pasan de 7.000 caracteres de estudio'+
  (camppobres.length?' — '+camppobres.join(', '):''));

/* Cada capitulo de P&R esta basado en un capitulo de Daniel, y el libro lo
   dice en su primera linea. Es la correspondencia que el examen pregunta, y
   estaba en el PDF pero no en la app. */
const PAREJA={pr39:'Daniel 1',pr40:'Daniel 2',pr41:'Daniel 3',
              pr42:'Daniel 4',pr43:'Daniel 5',pr44:'Daniel 6'};
const sinBase=Object.entries(PAREJA).filter(([id,dan])=>
  !CONTENIDO[id].some(s=>s.h.includes('Este capítulo está basado en '+dan)))
  .map(([id])=>id);
ok(sinBase.length===0,'Cada capitulo de P&R dice en que capitulo de Daniel se basa'+
  (sinBase.length?' — falta en '+sinBase.join(', '):''));

/* ── TODA CITA BIBLICA, EN CADA CORRIDA ─────────────────────────────────
   Antes esto vivia solo en tools/citas.js, que necesita los .txt de files/ y
   por lo tanto se corria cuando alguien se acordaba. Con fuente/biblia.js en
   el repo se puede cotejar aqui, en cada corrida. Los dos niveles:
     - esta prueba: el material coincide con biblia.js
     - tools/citas.js: biblia.js coincide con el texto RV1995 de files/
   Se colaron ocho errores de version en agosto y otros ocho en septiembre,
   uno de ellos en la opcion marcada como CORRECTA de una pregunta. */
const { VERS: BIBLIA } = require(path.join(RAIZ, 'fuente', 'biblia.js'));
const BIB6 = ['d1','d2','d3','d4','d5','d6'];
const BIB12 = ['d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12'];

ok(BIB12.every(c=>BIBLIA[c]) && BIB12.reduce((a,c)=>a+Object.keys(BIBLIA[c]).length,0)===357,
  'fuente/biblia.js trae los 357 versiculos de Daniel 1-12');
/* Tres fuentes que tienen que decir lo mismo: el `vs` de cada capitulo, el
   conteo que esta prueba usa para la cobertura, y los versiculos reales de
   biblia.js. Si alguien cambia una sola, esto avisa. */
ok(BIB6.every(c=>Object.keys(BIBLIA[c]).length===CAPS.find(x=>x.id===c).vs
                 && Object.keys(BIBLIA[c]).length===VERS[c]),
  'El `vs` declarado, el conteo de la cobertura y biblia.js coinciden en los seis');

const normB = s => String(s).replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ')
  .replace(/[«»“”]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
const TEXTO = normB(BIB12.map(c=>Object.keys(BIBLIA[c]).map(Number).sort((a,b)=>a-b)
  .map(v=>BIBLIA[c][v]).join(' ')).join(' '));

let citasOk = 0;
const citasMal = [];
const coteja = (cap, txt, donde) => {
  if (!txt) return;
  for (const m of String(txt).matchAll(/«([^»]{12,500})»/g))
    for (const parte of normB(m[1]).split(/\.\.\.|…/)) {
      const f = parte.replace(/^[ ,;:.¿?¡!]+|[ ,;:.¿?¡!]+$/g,'').trim();
      if (f.length < 12) continue;
      if (TEXTO.includes(f)) citasOk++; else citasMal.push(`[${cap}/${donde}] ${f.slice(0,90)}`);
    }
};
for (const cap of BIB12)
  for (const sec of CONTENIDO[cap]) coteja(cap, sec.h, sec.t);
for (const q of BANCO.filter(q=>BIB12.includes(q.cap))) {
  /* rv60:true marca las preguntas que citan RV1960 A PROPOSITO, para ensenar
     la diferencia. Son las que mas cuidan el punto del proyecto. */
  if (q.rv60) continue;
  coteja(q.cap, q.q, 'pregunta');
  coteja(q.cap, q.e, 'explicación');
  /* Las opciones INCORRECTAS son texto inventado por definicion: cotejarlas
     daba 32 falsos positivos («que venga el juicio de los dioses»). */
  if (Array.isArray(q.o) && typeof q.a === 'number') coteja(q.cap, q.o[q.a], 'opción correcta');
  /* En una pregunta de completar el enunciado ENTERO es el versiculo, y se
     coteja contra EL versiculo que dice su rotulo. Es la clase de pregunta
     que se memoriza palabra por palabra, asi que aqui una coma si importa. */
  if (q.t === 'fill' && Array.isArray(q.p)) {
    const ref = (String(q.ins||'').match(/(\d{1,2}):(\d{1,2})/)||[])[2];
    const real = BIBLIA[q.cap] && BIBLIA[q.cap][+ref] ? normB(BIBLIA[q.cap][+ref]) : TEXTO;
    for (const parte of normB(q.p.map(x=>x.x!==undefined?x.x:x.b).join('')).split(/\.\.\.|…/)) {
      const f = parte.replace(/^[ ,;:.¿?¡!]+|[ ,;:.¿?¡!]+$/g,'').trim();
      if (f.length < 12) continue;
      if (real.includes(f)) citasOk++; else citasMal.push(`[${q.cap}/completar ${q.ins}] ${f.slice(0,90)}`);
    }
  }
}
for (const tj of TARJETAS.filter(t=>BIB12.includes(t.cap))) {
  coteja(tj.cap, tj.f, 'tarjeta (frente)');
  coteja(tj.cap, tj.d, 'tarjeta (dorso)');
}
ok(citasMal.length===0,
  `Las ${citasOk} citas de Daniel coinciden literal con RV1995`+
  (citasMal.length?' — '+citasMal.slice(0,4).join(' / '):''));

/* Las referencias tocables no pueden abrir el versiculo de otro libro. En las
   28 creencias hay doce citas con formato N:M de Juan, Tito, Joel, Amos,
   Romanos, Filipenses y 1 Samuel: «Jn 3:16» abriria Daniel 3:16, y un
   versiculo equivocado con la etiqueta RV1995 es peor que no ofrecerlo. */
ok(/Daniel\\\\s\+\(\\\\d\{1,2\}\)/.test(APP.replace(/\s/g,''))||
   /Daniel\\s\+/.test(APP),
  'La primera pasada de refsTocables exige el nombre «Daniel» explicito');
ok(/OTRO_LIBRO/.test(APP)&&/BIBLIA_CAPS\.indexOf\(capId\)>=0/.test(APP),
  'La segunda pasada solo actua dentro de un capitulo de Daniel y descarta otros libros');

/* ── EL ATRIBUTO hidden TIENE QUE GANAR ─────────────────────────────────
   La hoja del navegador le da a [hidden] un display:none de baja prioridad,
   asi que cualquier regla de autor con display lo pisa. Paso de verdad:
   .av-nuevo{display:flex} dejaba la franja de «Hay material nuevo» visible en
   todo momento, aunque el HTML dijera hidden y el JS nunca la hubiera
   encendido. Se vio en una captura; ningun test de los que habia lo miraba. */
ok(/\[hidden\]\{display:none!important\}/.test(CSS.replace(/\s/g,'')),
  'El CSS hace que [hidden] gane sobre cualquier display de autor');
/* Y que los elementos que se esconden asi sigan usando el atributo. */
for(const id of ['aviso-nuevo','hoja'])
  ok(new RegExp('id="'+id+'"[^>]*hidden').test(CUERPO),
    'El elemento #'+id+' arranca oculto con el atributo hidden');

/* ── EL MODELO: ACTIVIDAD × CATEGORIA ──────────────────────────────────
   Habia TRES mecanismos para el mismo concepto: Conexion Biblica con un campo
   `ev` de texto libre, la Devocion Matutina con claves propias, y las 28
   creencias con un `S.evento` y un interruptor. Y `gm` declaraba a la vez
   ev:'Conexion Biblica' y edad:'Otro evento': el dato se contradecia solo.
   Ahora ACTIVIDADES es el dato de primer nivel y cada categoria declara a
   cual pertenece. */
const { CATS: CATS_APP, ACTIVIDADES: ACTS_APP } = (() => {
  /* Se leen del fuente evaluando solo esos dos bloques: son datos, no logica,
     y asi la prueba no depende de montar la app entera. */
  const bloque=APP.slice(APP.indexOf('const ACTIVIDADES={'),
                             APP.indexOf('const ACT_DE='));
  return new Function(bloque+'\nreturn {CATS,ACTIVIDADES};')();
})();

ok(Object.keys(ACTS_APP).length===3,'Hay tres actividades declaradas');
ok(['cb','dm','ec'].every(a=>ACTS_APP[a]),'Las tres son cb, dm y ec');
ok(Object.values(ACTS_APP).every(a=>a.nombre&&a.icono&&a.cuando&&a.que&&Array.isArray(a.cats)),
  'Cada actividad dice su nombre, su icono, cuando es, que se estudia y sus categorias');

/* Toda categoria pertenece a exactamente UNA actividad, y toda actividad
   lista solo categorias que existen. Sin esto vuelven los huerfanos: `gm`
   estaba en Conexion Biblica y decia «Otro evento» a la vez. */
const catsSueltas=Object.keys(CATS_APP).filter(k=>
  !Object.values(ACTS_APP).some(a=>a.cats.includes(k)));
ok(catsSueltas.length===0,'Ninguna categoria queda fuera de una actividad'+
  (catsSueltas.length?' — '+catsSueltas.join(', '):''));
const catsFantasma=Object.values(ACTS_APP).flatMap(a=>a.cats).filter(k=>!CATS_APP[k]);
ok(catsFantasma.length===0,'Ninguna actividad lista una categoria que no existe'+
  (catsFantasma.length?' — '+catsFantasma.join(', '):''));
const dobles=Object.keys(CATS_APP).filter(k=>
  Object.values(ACTS_APP).filter(a=>a.cats.includes(k)).length>1);
ok(dobles.length===0,'Ninguna categoria pertenece a dos actividades'+
  (dobles.length?' — '+dobles.join(', '):''));
ok(Object.keys(CATS_APP).every(k=>ACTS_APP[CATS_APP[k].act]),
  'Cada categoria declara `act` y apunta a una actividad que existe');
/* Y el campo `ev` de texto libre, que era la raiz del enredo, no vuelve. */
ok(Object.values(CATS_APP).every(c=>!('ev' in c)),
  'Ninguna categoria trae el viejo campo `ev` de texto libre');

/* Las claves NO cambiaron, y eso es deliberado: hay progreso guardado en los
   celulares y participantes en la base con estas mismas claves. Un rediseno
   que las renombrara obligaria a migrar las dos cosas a 31 dias del
   campamento. */
for(const k of ['me','av','pa','gm','dm1','dm2'])
  ok(!!CATS_APP[k],'La categoria `'+k+'` sigue existiendo con su clave de siempre');
ok(!!CATS_APP.ec1&&!!CATS_APP.ec2,
  'Y «En esto creemos» aporta ec1 y ec2 en vez de colgarse de pa y gm');

/* El interruptor de la version anterior se retiro entero: era un cuarto
   mecanismo para lo mismo. */
for(const resto of ['S.evento','dosActividades','cambiaEvento','pintaActividad','capsDelEvento','capsCat'])
  ok(!APP.includes(resto+'('),'No queda rastro de '+resto);
/* capsDelEvento() existia SOLO para desmezclar. Con una categoria por
   actividad, capsDe() ya trae lo correcto. */
ok(/const capsDe=\(\)=>CAPS\.filter\(c=>c\.cats\.includes\(S\.cat\)\)/.test(APP),
  'capsDe() volvio a ser un filtro simple por categoria');

/* La bienvenida pregunta la actividad ANTES de la categoria. Al revés hacia
   falta mapear cada edad a cada actividad a mano. */
const posAct=APP.indexOf('function bvActividad'), posCat=APP.indexOf('function bvCategoria');
ok(posAct>0&&posCat>posAct,'La bienvenida tiene el paso de actividad antes del de categoria');
ok(/id="bv-acts"/.test(CUERPO)&&/id="bv-cats"/.test(CUERPO),
  'Los dos pasos se generan desde el modelo, no escritos a mano en el HTML');
ok(!/bvEdad\(|bvEvento\(/.test(APP),
  'Ya no existen bvEdad ni bvEvento, que eran el mapeo edad→evento');

/* El servidor acepta las nuevas SIN quitar ninguna de las viejas: hay filas
   en la base con me, av y pa. */
const API=fs.readFileSync(path.join(RAIZ,'functions','api','[[ruta]].js'),'utf8');
const validas=(API.match(/CATS_VALIDAS = \[([^\]]+)\]/)||[])[1]||'';
for(const k of ['me','av','pa','gm','dm1','dm2','ec1','ec2'])
  ok(validas.includes("'"+k+"'"),'El servidor acepta la categoria `'+k+'`');

/* ── PARAR LA LECTURA EN AUDIO ──────────────────────────────────────────
   speechSynthesis es una cola global del navegador: no hay «parar este
   audio», solo cancel(), que vacia todo. Antes no habia forma de parar: se
   tocaba 🔊 y el bloque se leia completo. Ahora el boton alterna y se corta
   al navegar. */
ok(/function paraVoz\(\)/.test(APP),'Existe paraVoz()');
ok(/if\(btn===vozBtn\)\{paraVoz\(\);return;\}/.test(APP),
  'Tocar el boton que ya esta leyendo lo para');
ok(/function ir\(id\)\{\s*paraVoz\(\);/.test(APP),
  'Cambiar de pantalla corta la lectura');
ok(/function verCap\(id\)\{\s*paraVoz\(\);/.test(APP),
  'Cambiar de capitulo corta la lectura');
/* En iOS onend no siempre dispara, sobre todo si se cancela. Sin el reloj de
   seguridad el boton se quedaria en ⏹ para siempre. */
ok(/u\.onend=paraVoz/.test(APP)&&/u\.onerror=paraVoz/.test(APP),
  'El icono se restaura con onend y con onerror');
ok(/vozReloj=setTimeout\(paraVoz/.test(APP),
  'Hay un reloj de seguridad por si onend no llega (pasa en iOS)');
/* vozBtn es un `let` y ir() lo usa antes de la seccion de voz: si se declara
   abajo, la app no arranca por TDZ. Ya paso con diaHoy. */
const posVoz=APP.indexOf('let vozBtn'), posIr=APP.indexOf('function ir(id)');
ok(posVoz>=0&&posVoz<posIr,
  'vozBtn se declara ANTES de ir(), que es quien llama paraVoz (si no, TDZ)');

/* ── EL ESTILO DEL TEXTO BIBLICO ────────────────────────────────────────
   Que se vea distinto del texto de la app no es adorno: con la misma sans, la
   cita y la explicacion se leian como lo mismo. */
ok(/\.biblia\{font-family:Georgia/.test(CSS),
  'El texto biblico usa una serif, no la sans de la interfaz');
ok(/\.biblia \.vn\{[^}]*vertical-align:\.45em/.test(CSS),
  'El numero de versiculo va volado, como en una Biblia impresa');
/* Un <button> es inline-block: su caja crece con el line-height y un
   border-bottom se dibuja al FONDO de esa caja, no bajo el texto. En el
   iPhone quedaba una rayita flotando, y con padding vertical caia encima de
   la linea siguiente. */
ok(!/\.vref\{[^}]*border-bottom:1px/.test(CSS),
  'La referencia tocable NO usa border-bottom (se dibuja fuera del texto)');
ok(/\.vref\{[^}]*text-decoration:underline/.test(CSS),
  'La referencia tocable se subraya con text-decoration, que sigue al texto');
ok(!/\.vref\{[^}]*margin:-6px/.test(CSS),
  'La referencia no lleva margen negativo (caia sobre la linea siguiente)');
ok(/\.btn-voz\.sonando\{/.test(CSS),
  'El boton que esta sonando se distingue de los demas');
/* El boton de voz en su propia fila: al lado del texto le quitaba unos 50px
   de ancho a las cinco lineas del bloque. */
ok(/\.lect-cab\{[^}]*justify-content:flex-end/.test(CSS),
  'El boton de voz de la lectura va en su propia fila, no al lado del texto');

/* ── EL SELECT QUE SE SALIA DEL ANCHO EN EL IPHONE ──────────────────────
   MECANISMO. Un elemento dentro de un flex tiene min-width:auto, o sea que no
   puede encogerse por debajo del ancho intrinseco de su contenido. El ancho
   intrinseco de un <select> es el de su opcion mas larga. Las opciones por
   capitulo llevaban el subtitulo completo y llegaban a 63 caracteres
   («26 de octubre — La heroina que ayudo a un nino con sus palabras»): unos
   470px. El select se plantaba ahi, empujaba la barra fuera de la pantalla, y
   de paso comprimia el contador hasta partirlo en tres lineas.

   POR QUE ESTAS PRUEBAS SON ESTATICAS. El recorrido con iframe en Chrome de
   macOS NO reproduce este bug: Chrome de escritorio encoge el select y Safari
   de iOS respeta su ancho intrinseco. Se comprobo corriendo la auditoria de
   ancho contra la version ANTERIOR, la que si desbordaba en el iPhone de
   Camilo, y reporto «sin desbordes». Asi que lo unico que se puede sostener
   desde aca son las tres capas del arreglo. */
/* Los tres eventos, porque el select de tarjetas ofrece los capitulos de la
   categoria activa y las opciones mas largas son las de la matutina. */
const MATC=require(path.join(RAIZ,'fuente','matutina.js'));
const CREC=require(path.join(RAIZ,'fuente','creencias.js'));
const CAPS_TODOS=[...CAPS,...MATC.MAT_CAPS,...CREC.CR_CAPS];

ok(/#tj-filtro\{[^}]*min-width:0/.test(CSS),
  'El select de tarjetas declara min-width:0 (sin eso no puede encogerse en un flex)');
ok(/#tj-filtro\{[^}]*max-width:100%/.test(CSS),
  'El select de tarjetas declara max-width:100%');
ok(/\.tj-barra\{flex-direction:column|\.tj-barra\s*\{\s*flex-direction:\s*column/.test(
     CSS.replace(/\s*\n\s*/g,'')),
  'En pantalla angosta la barra de tarjetas pasa a columna, y el select va en su propia fila');

/* Los estilos del select tienen que vivir en el CSS, no en un style= del
   HTML: un estilo inline gana sobre el media query, asi que el arreglo de
   telefono no lo alcanzaria. */
const selectsInline=[...CUERPO.matchAll(/<select[^>]*>/g)]
  .map(m=>m[0]).filter(s=>/\sstyle=/.test(s));
ok(selectsInline.length===0,
  'Ningun <select> del HTML lleva estilos inline (un style= gana sobre el media query)'+
  (selectsInline.length?' — '+selectsInline.map(s=>(s.match(/id="([^"]+)"/)||[,'?'])[1]).join(', '):''));

/* Y la capa que no depende del motor: que ninguna opcion sea tan larga que no
   quepa en una fila de telefono. A 0,82rem, 40 caracteres son unos 260px mas
   el padding y la flecha; una fila completa a 390px da unos 358px. */
const TOPE_CH=40;
const largas=CAPS_TODOS.map(c=>{
  const sub=String(c.sub||'');
  if(!sub)return c.label;
  const corto=sub.length>22?sub.slice(0,21).replace(/[\s—–\-,;:]+$/,'')+'…':sub;
  return c.label+' — '+corto;
}).filter(s=>s.length>TOPE_CH);
ok(largas.length===0,
  `Ninguna opcion del select de tarjetas pasa de ${TOPE_CH} caracteres`+
  (largas.length?' — '+largas.slice(0,3).map(s=>s.length+': '+s).join(' / '):''));

/* Y que el recorte no deje un guion colgando: «El heroe se enamora —…» se lee
   como un error de la app, no como un texto cortado. */
const colgando=CAPS_TODOS.map(c=>{
  const sub=String(c.sub||'');
  if(!sub||sub.length<=22)return '';
  return sub.slice(0,21).replace(/[\s—–\-,;:]+$/,'')+'…';
}).filter(s=>/[\s—–\-,;:]…$/.test(s));
ok(colgando.length===0,'Ningun subtitulo recortado deja un guion o una coma colgando'+
  (colgando.length?' — '+colgando.slice(0,3).join(' / '):''));

/* ── CUANTOS VERSICULOS TRAE CADA CAPITULO ───────────────────────────────
   El numero sale de files/rv1995-daniel-N.txt, el texto RV1995 verificado.
   Sirve para dos cosas: el estudiante sabe cuanto va a leer antes de abrir el
   capitulo, y aqui se vuelve el tope contra el que se mide toda referencia. */
const conVs=CAPS.filter(c=>c.src==='Biblia');
ok(conVs.every(c=>typeof c.vs==='number'&&c.vs>0),
  'Todos los capitulos de la Biblia declaran cuantos versiculos tienen');
/* v54: Daniel 7-12 tambien son src:'Biblia', asi que sumar TODO lo que
   declare vs dejo de significar "Daniel 1-6". El total de 196 se acota a
   esos seis capitulos por id; los de 7-12 se validan aparte, uno por uno,
   solo si ya estan declarados (se van agregando de a poco). */
const D1_D6=['d1','d2','d3','d4','d5','d6'];
ok(conVs.filter(c=>D1_D6.includes(c.id)).reduce((a,c)=>a+c.vs,0)===196,
  'Daniel 1-6 suman 196 versiculos (21+49+30+37+31+28)');
/* Daniel 7 al 12: los numeros salen de Maxwell, «El Porvenir del Mundo
   Revelado», y solo el de Daniel 7 esta cruzado contra un .txt RV1995 en
   files/. Si algun dia se agrega el texto verificado de 8 a 12, este mapa es
   el que hay que corregir. */
const VS_D7_D12={d7:28,d8:27,d9:27,d10:21,d11:45,d12:13};
Object.keys(VS_D7_D12).forEach(cid=>{
  const c=CAPS.find(x=>x.id===cid);
  if(c)ok(c.vs===VS_D7_D12[cid],cid+' declara '+VS_D7_D12[cid]+' versiculos, como en Maxwell');
});
/* Ojo con Daniel 5: en RV1995 son 31 porque 5:31 va ahi. Otras ediciones lo
   mueven a 6:1 y darian 30 y 29; si alguien "corrige" eso, esta prueba avisa. */
ok(CAPS.find(c=>c.id==='d5').vs===31&&CAPS.find(c=>c.id==='d6').vs===28,
  'Daniel 5 son 31 versiculos y Daniel 6 son 28, como en RV1995');

/* Una referencia a Daniel 1:25 seria un error de contenido invisible: el
   capitulo termina en 21. Se revisan preguntas, rotulos, explicaciones y el
   texto de estudio contra el tope declarado. */
const TOPE={};CAPS.forEach(c=>{if(c.vs)TOPE[c.id]=c.vs;});
const fuera=[];
/* v54: con Daniel 7-12 en TOPE, un regex de una sola pasada empieza a leer
   citas de OTRO libro (Apocalipsis 12:6, 13:5, 20:12 — las tres ya estan en
   el contenido de Daniel 7) como si fueran de Daniel. Es el mismo problema
   que refsTocables() resolvio en v43: «Daniel N:M» vale en cualquier parte
   porque nombra el libro; un «N:M» a secas solo cuenta si esta entre
   parentesis y ese parentesis no nombra otro libro. */
const OTRO_LIBRO_TEST=/\b(?!Daniel\b|RV1995\b)(?:[123]\s?)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,}\b/;
const revisaRef=(donde,txt)=>{
  if(!txt)return;
  const s=String(txt);
  for(const m of s.matchAll(/Daniel\s+(\d{1,2}):(\d{1,2})/g)){
    const cid='d'+m[1];
    if(TOPE[cid]&&+m[2]>TOPE[cid])fuera.push(donde+' → '+m[0]+' (tiene '+TOPE[cid]+')');
  }
  for(const p of s.matchAll(/\(([^)]*)\)/g)){
    if(OTRO_LIBRO_TEST.test(p[1]))continue;
    for(const m of p[1].matchAll(/(\d{1,2}):(\d{1,2})/g)){
      const cid='d'+m[1];
      if(TOPE[cid]&&+m[2]>TOPE[cid])fuera.push(donde+' → ('+m[0]+') (tiene '+TOPE[cid]+')');
    }
  }
};
BANCO.filter(q=>TOPE[q.cap]).forEach(q=>{
  revisaRef(q.cap,q.q);revisaRef(q.cap,q.ins);revisaRef(q.cap,q.e);});
Object.keys(CONTENIDO).filter(k=>TOPE[k]).forEach(k=>CONTENIDO[k].forEach(s=>{
  revisaRef(k,s.t);revisaRef(k,s.h);}));
ok(fuera.length===0,'Ninguna referencia apunta mas alla del final de su capitulo'+
  (fuera.length?' — '+fuera.slice(0,5).join(' / '):''));

/* Y que el dato se vea, no solo que exista en los datos. */
ok(/c\.vs\?' · '\+c\.vs\+' vers\.'/.test(APP),
  'La ficha de cada capitulo muestra cuantos versiculos trae');
ok(/c\.vs\?' · '\+c\.vs\+' versículo'/.test(APP),
  'La cabecera del capitulo abierto muestra cuantos versiculos trae');

/* ── LA APP INSTALABLE ───────────────────────────────────────────────────
   Tres cosas que se rompen en silencio y sin error visible: un manifest que
   el navegador descarta, un icono que no mide lo que dice, y un sw.js
   regenerado a medias que sigue sirviendo material de otra version. */
const cryptoPwa=require('crypto');
const RZ=f=>path.join(RAIZ,f);
const htmlPwa=fs.readFileSync(RZ('index.html'),'utf8');

ok(/<link rel="manifest" href="\/manifest\.webmanifest">/.test(htmlPwa),
  'El HTML declara el manifest');
ok(/<link rel="apple-touch-icon" href="\/icono-180\.png">/.test(htmlPwa),
  'El HTML declara el apple-touch-icon (iOS no acepta SVG para ese icono)');
ok(/navigator\.serviceWorker\.register\('\/sw\.js'\)/.test(htmlPwa),
  'El HTML registra el service worker');
/* Sin la guarda de protocolo, abrir el index.html con doble clic lanza. */
ok(/location\.protocol\.indexOf\('http'\)===0/.test(htmlPwa),
  'El registro del service worker esta protegido para file://');

const man=JSON.parse(fs.readFileSync(RZ('manifest.webmanifest'),'utf8'));
ok(man.display==='standalone'&&man.start_url==='/'&&man.scope==='/',
  'El manifest pide standalone en la raiz');
ok(man.theme_color==='#1F3864','El theme_color del manifest es el azul de marca');
ok(man.icons.some(i=>i.purpose==='maskable'),
  'El manifest trae un icono maskable (el launcher de Android recorta el otro)');

/** Ancho y alto reales de un PNG: van big-endian en el IHDR, bytes 16 a 24. */
const tamPng=f=>{const b=fs.readFileSync(RZ(f));return b.readUInt32BE(16)+'x'+b.readUInt32BE(20);};
const iconosMal=man.icons.filter(i=>{
  const f=i.src.replace(/^\//,'');
  return !fs.existsSync(RZ(f))||tamPng(f)!==i.sizes;
}).map(i=>i.src);
ok(iconosMal.length===0,'Todos los iconos del manifest existen y miden lo que declaran'+
  (iconosMal.length?' — '+iconosMal.join(', '):''));

/* EL SEGURO QUE IMPORTA: los cuatro artefactos que build.js escribe tienen
   que ser de la MISMA corrida. Son cuatro y cada uno cumple un papel:
     index.html      → VERSION_APP, la huella de lo que esta corriendo
     sw.js           → el nombre de la cache
     version.json    → lo que la app consulta para saber si hay algo nuevo
   Si el index se regenera y el sw.js no, los celulares siguen sirviendo el
   material anterior. Si version.json se queda atras, el aviso de «material
   nuevo» no sale nunca. Con esto, olvidarse de correr build.js falla aqui.

   OJO CON EL CALCULO: la huella se calcula sobre el html con un MARCADOR de
   doce caracteres en el lugar de VERSION_APP, porque no se puede meter dentro
   del html un hash del propio html. Para recalcularla hay que volver a poner
   el marcador. */
const swSrc=fs.readFileSync(RZ('sw.js'),'utf8');
const verJson=JSON.parse(fs.readFileSync(RZ('version.json'),'utf8'));
const vApp=(htmlPwa.match(/const VERSION_APP = '([^']+)'/)||[])[1];

ok(!!vApp&&vApp.length===12,'El index.html trae su propia huella en VERSION_APP');
ok(swSrc.includes("const CACHE='cb-"+vApp+"'"),
  'El nombre de la cache del service worker es la huella del index vigente');
ok(verJson.v===vApp,'version.json declara la misma huella que el index');
ok(/^\d{4}-\d{2}-\d{2}$/.test(String(verJson.fecha||'')),
  'version.json trae la fecha de la publicacion');

const MARCA='HUELLAxxxxxx';
const recalculada=cryptoPwa.createHash('sha1')
  .update(htmlPwa.replace(vApp,MARCA)).digest('hex').slice(0,12);
ok(recalculada===vApp,
  'La huella corresponde de verdad al contenido del index (olvidar build.js falla aqui)');

/* Y que la app compare de verdad: sin esto el aviso no se enciende nunca. */
ok(/VERSION_APP/.test(APP)&&/version\.json/.test(APP),
  'La app consulta version.json y lo compara con VERSION_APP');
/* En medio de un examen no se recarga: se perderian las respuestas. */
ok(/examenEnCurso\(\)/.test(APP)&&/prueba&&prueba\.length>0&&!entregado/.test(APP),
  'Actualizar no recarga si hay un examen empezado y sin entregar');
/* El service worker no puede cachear justamente el archivo con el que se
   pregunta si hay algo nuevo. */
ok(/pathname==='\/version\.json'\)return/.test(swSrc),
  'El service worker deja version.json fuera de la cache');

/* Y que de verdad no toque la evaluacion: se ejecuta el sw con un self de
   mentiras y se mira si pide responder. Verificar el texto del guard no basta,
   porque un return mal puesto lo deja pasar igual. */
function corteSw(url,metodo){
  const oyentes={};
  const selfSw={addEventListener:(t,f)=>{oyentes[t]=f;},skipWaiting(){},clients:{claim(){}}};
  const cachesSw={open:()=>Promise.resolve({addAll:()=>Promise.resolve(),put(){}}),
                  match:()=>Promise.resolve(null),keys:()=>Promise.resolve([])};
  new Function('self','location','caches','fetch','Response','setTimeout','clearTimeout','URL',swSrc)
    (selfSw,{origin:'https://x.dev'},cachesSw,()=>new Promise(()=>{}),{error:()=>({})},
     ()=>0,()=>{},URL);
  let pidio=false;
  oyentes.fetch({request:{method:metodo||'GET',url:'https://x.dev'+url},
                 respondWith(){pidio=true;}});
  return pidio;
}
ok(corteSw('/api/evaluacion')===false,
  'El service worker NO intercepta /api/evaluacion (la nota siempre va al servidor)');
ok(corteSw('/api/participantes')===false,
  'El service worker NO intercepta ninguna ruta de /api/');
ok(corteSw('/')===true,'El service worker si atiende la pagina');
ok(corteSw('/','POST')===false,'El service worker no toca los POST');

/* ───────── la identidad va en la barra, no dentro del Inicio ─────────
   Las pantallas se conmutan prendiendo una `.pantalla`, asi que todo lo que
   viva dentro de `p-inicio` solo existe estando en Inicio. La ficha de quien
   estudia decide TODO lo que se ve en las cinco pantallas, asi que tiene que
   vivir en la barra: si vuelve a caer dentro de una pantalla, esta prueba
   avisa. */
const BARRA=CUERPO.slice(CUERPO.indexOf('<nav class="nav">'),CUERPO.indexOf('</nav>'));
ok(/id="nav-yo"/.test(BARRA),'La ficha de quien estudia vive en la barra, no en una pantalla');
ok(/onclick="abreYo\(\)"/.test(BARRA),'La ficha abre la hoja de identidad');
const INICIO=pantalla('p-inicio');
ok(!/id="alu-sel"/.test(INICIO)&&!/id="cat-sel"/.test(INICIO),
  'Los selectores de participante y categoria ya no viven dentro del Inicio');
ok(!/class="ident"/.test(CUERPO),'El <details> de identidad del Inicio quedo retirado');
/* Y la hoja sigue siendo UNA: dos hojas con su propio abrir, cerrar y Escape
   serian el mismo error de tres mecanismos que v47 arranco. */
ok((CUERPO.match(/class="hoja"/g)||[]).length===1,'Hay una sola hoja inferior en el HTML');
ok(/\.hoja-yo \.hoja-caja\{max-height/.test(CSS),
  'La hoja de identidad sube mas que la del versiculo, que trae menos contenido');
/* La ficha es un item flexible dentro de una barra estrecha: sin min-width:0 un
   nombre largo la desborda a 390px, que es el error del select de v42. */
const rYo=(CSS.match(/\.nav-yo\{[^}]*\}/)||[''])[0];
ok(/min-width:0/.test(rYo)&&/flex:1 1 auto/.test(rYo),
  'La ficha de la barra no desborda: flex con min-width:0');
ok(/\.nav-yo \.yo-n\{[^}]*text-overflow:ellipsis/.test(CSS),
  'Un nombre largo se corta con puntos suspensivos en vez de estirar la barra');
/* En celular hay un `.nav-b span{display:none}` que pesa mas que un `.yo-*` a
   secas y dejaba la ficha vacia. Los hijos van escritos con el padre delante
   para ganarle; si alguien los vuelve a poner sueltos, esta prueba avisa. */
for(const cl of ['yo-ini','yo-tx','yo-n','yo-c']){
  ok(new RegExp('\\.nav-yo \\.'+cl+'\\{').test(CSS),
    'La regla de .'+cl+' va calificada con .nav-yo, para ganarle a .nav-b span');
  ok(!new RegExp('(^|\\})\\s*\\.'+cl+'\\{').test(CSS),
    '  y no queda una version suelta que pierda la pelea');
}

/* ───────── en escritorio el panel es popover, no hoja ─────────
   Una hoja que sube del borde inferior es un patron de celular. A 1900px queda
   pegada abajo, los parrafos se estiran a una linea de 1900px y las ocho
   categorias se leen como un muro de cuatro columnas. El MISMO nodo se
   convierte en popover anclado al riel: 380px, sin oscurecer, una columna. */
const ESCRITORIO=CSS.slice(CSS.indexOf('@media (min-width:900px){',CSS.indexOf('.nav-yo')));
ok(/\.hoja-yo \.hoja-caja\{[^}]*width:380px/.test(ESCRITORIO),
  'En escritorio el panel de identidad mide 380px, no el ancho de la pantalla');
ok(/\.hoja-yo \.hoja-caja\{[^}]*left:var\(--yo-x/.test(ESCRITORIO)&&
   /\.hoja-yo \.hoja-caja\{[^}]*top:var\(--yo-y/.test(ESCRITORIO),
  'El popover se ancla con las dos variables que mide ancla()');
ok(/\.hoja-yo \.hoja-fondo\{background:none\}/.test(ESCRITORIO),
  'El popover no oscurece la pagina: el fondo solo sirve para cerrar');
ok(/\.hoja-yo \.hoja-asa\{display:none\}/.test(ESCRITORIO),
  'El asa de arrastrar no aparece con mouse');
ok(/\.hoja-yo \.cat-fila\{grid-template-columns:1fr/.test(ESCRITORIO),
  'Las categorias van en una columna dentro del popover, no en cuatro');
/* La X se mide contra el borde del RIEL: la ficha es un cuadro de 42px centrado
   en un riel de 92, asi que anclar a SU borde deja el popover bajo el riel. */
ok(/const nav=document\.querySelector\('\.nav'\)/.test(js)&&/Math\.max\(r\.right,borde\)/.test(js),
  'ancla() mide contra el borde del riel, no el de la ficha');
/* El globo del riel: nodo propio y no el `title`, que tarda y no admite dos
   renglones. En celular sobra, porque el nombre ya se lee en la barra. */
ok(/\.nav-yo \.yo-tip\{display:none\}/.test(CSS),'El globo esta apagado por defecto (celular)');
ok(/\.nav-yo:hover \.yo-tip/.test(ESCRITORIO),'y se prende al pasar el mouse en escritorio');
ok(/\.nav-yo \.yo-tip\{[^}]*pointer-events:none/.test(ESCRITORIO),
  'El globo no se come el clic del boton');
ok(!/b\.setAttribute\('title'/.test(js),
  'La ficha ya no usa el title del navegador, que se doblaria con el globo');

/* ───────── vista dividida ─────────
   El DOM se reestructura SIEMPRE y el CSS decide si lo pinta en dos columnas.
   Un matchMedia de JS para el layout obligaria a escuchar el resize y rearmar
   el DOM en cada cambio de tamano; con la media query, por debajo de 1200px el
   flex no aplica y todo se apila igual que antes. */
ok(/function divideVista\(d,id\)/.test(js),'Existe divideVista()');
ok(/divideVista\(d,id\);/.test(js)&&js.indexOf('divideVista(d,id);')<js.indexOf('function divideVista'),
  'y verCap() la llama despues de armar el detalle');
const bloqueVd=js.slice(js.indexOf('function divideVista'),js.indexOf('function divideVista')+1400);
ok(/if\(typeof VERS==='undefined'\|\|!VERS\[id\]\)return;/.test(bloqueVd),
  'Solo parte capitulos con texto RV1995: en P&R no habria nada en la izquierda');
ok(/@media \(min-width:1200px\)\{\s*\.vd\{display:flex/.test(CSS_SIN),
  'Las dos columnas son una media query, no una decision del JS');
ok(/\.vd-izq\{position:sticky/.test(CSS_SIN),
  'La columna del texto se queda pegada mientras el estudio se desplaza');
ok(/\.vd-izq\{[^}]*max-height:calc\(100vh/.test(CSS_SIN),
  'con max-height, o la columna crece y deja de estar pegada');
/* El unico sitio donde el JS mira el ancho es el `open` inicial del acordeon:
   sin la guarda quedaba abierto tambien a 390px, contra la decision de v43. */
ok(/det\.open=!!\(window\.matchMedia&&window\.matchMedia\('\(min-width:1200px\)'\)\.matches\);/.test(js),
  'El acordeon se abre de entrada SOLO en dos columnas');

/* ───────── paleta de comandos ─────────
   La lista sale de los mismos datos del material: no hay un catalogo aparte. */
ok(/function pcCatalogo\(\)/.test(js)&&/id="paleta"/.test(CUERPO),'Existe la paleta y su capa');
const bloquePc=js.slice(js.indexOf('function pcCatalogo'),js.indexOf('function abrePaleta'));
ok(/capsDe\(\)\.forEach/.test(bloquePc)&&/modsDe\(\)\.forEach/.test(bloquePc)
   &&/Object\.keys\(CATS\)/.test(bloquePc),
  'El catalogo se arma de capsDe(), modsDe() y CATS, no de una lista a mano');
ok(/k==='k'&&\(e\.metaKey\|\|e\.ctrlKey\)/.test(js),'Se abre con Cmd+K o Ctrl+K');
ok(/e\.key==='Escape'\).*cierraPaleta\(\)/s.test(js),'Escape cierra');
ok(/normalize\('NFD'\)\.replace\(\/\[\\u0300-\\u036f\]\/g,''\)/.test(js.slice(js.indexOf('const pcLimpia'))),
  'El filtro normaliza sin tildes, igual que la comparacion de respuestas');
/* La fila seleccionada se marca con fondo Y barra al borde: se navega con
   teclado, y el dedo no esta guiando la vista. */
ok(/\.pc-r\.on\{box-shadow:inset 3px 0 0/.test(CSS_SIN),
  'La fila activa lleva barra al borde, no solo color de texto');

/* ───────── las senales no pueden empujar la barra ─────────
   Si una insignia ocupara sitio en el flujo, la barra de cinco pestanas
   cambiaria de alto cada vez que aparece o desaparece un numero, y eso mueve
   el contenido de la pagina bajo el dedo. Por eso van en absoluto. */
const rNv=(CSS.match(/\.nv\{[^}]*\}/)||[''])[0];
ok(/position:absolute/.test(rNv),'Las senales van en absoluto, no empujan la barra');
ok(/\.nav-t button\{position:relative\}/.test(CSS),
  'y la pestana es el contenedor de posicionamiento');
ok(/box-shadow:0 0 0 2px/.test(rNv),
  'La senal lleva troquel del color de la barra, o se lee como parte del icono');
/* Los nodos van en el HTML: pintaSenales() solo los llena. Crearlos en JS
   abriria la puerta a duplicarlos en la segunda llamada. */
for(const id of ['nv-est','nv-tj','nv-ex','nv-lg'])
  ok(new RegExp('id="'+id+'"').test(CUERPO),'El nodo '+id+' vive en el HTML, no lo crea el JS');
ok(!/nv-anillo/.test(CUERPO)&&!/\.nv-ring\{/.test(CSS),
  'No quedo el anillo de progreso, que se descarto por ilegible y por el mask en Safari');
ok(/function pintaSenales\(\)/.test(js)&&/pintaSenales\(\);\s*window\.scrollTo/.test(js),
  'pintaSenales() se llama en cada navegacion, dentro de ir()');

/* ───────── modo lectura ─────────
   Es el MISMO texto de VERS, en una capa aparte. Lo que se fija es que no se
   convierta en una segunda fuente del texto biblico, que es la deuda que este
   proyecto persigue. */
ok(/function abreLectura\(cid\)/.test(js),'Existe el modo lectura');
ok(/id="lectura"/.test(CUERPO),'y su capa vive fuera de las pantallas, porque tapa todas');
const bloqueLec=js.slice(js.indexOf('function abreLectura'),js.indexOf('function lectAvance'));
ok(/VERS\[cid\]/.test(bloqueLec),'Lee de VERS: no hay un segundo texto biblico');
ok(!/RV1960/.test(bloqueLec)&&/Reina-Valera 1995/.test(bloqueLec),
  'y rotula RV1995, que es la version del examen');
ok(/document\.body\.classList\.remove\('leyendo'\)/.test(js),
  'Al cerrar suelta el body: si no, la pagina queda sin scroll y parece muerta');
ok(/body\.leyendo\{overflow:hidden\}/.test(CSS),
  'Mientras se lee, el scroll de atras esta bloqueado');
ok(/\.lec-caja>\*\{max-width:62ch/.test(CSS),
  'El ancho de linea esta acotado a 62 caracteres, que es la medida que manda');
ok(!/\.lec-caja\{[^}]*scroll-behavior:smooth/.test(CSS_SIN),
  'Sin scroll-behavior:smooth: pelea con el flick del dedo y atrasa la barra de avance');
ok(/e\.key==='Escape'&&lectCid/.test(js),'Escape cierra la lectura, igual que la hoja');
/* Justificar reparte el sobrante entre los espacios: a 38 caracteres por linea
   deja huecos de tres espacios entre palabras. Se enciende con la linea larga. */
ok(/\.lec-txt p\{[^}]*text-align:left/.test(CSS_SIN),
  'El texto de lectura va alineado a la izquierda por defecto');
ok(/@media \(min-width:640px\)\{\.lec-txt p\{text-align:justify\}\}/.test(CSS_SIN),
  'y solo se justifica cuando la linea da para repartir');

/* ───────── el orden del riel de escritorio ─────────
   `.nav` es una columna con dos hijos: `.nav-b` (marca, identidad, ayuda) y
   `.nav-t` (los cinco tabs). En el HTML la identidad y la ayuda van DENTRO de
   `.nav-b`, asi que salian apiladas arriba: tres circulos sin etiqueta antes de
   la navegacion y 375px vacios al pie. `display:contents` disuelve la caja de
   `.nav-b` para poder ordenar sus hijos por separado, sin tocar el HTML. */
ok(/\.nav-b\{display:contents\}/.test(ESCRITORIO),
  'En el riel .nav-b se disuelve con display:contents, para poder ordenar sus hijos');
const orden=['rail-marca','nav-t','nav-yo','nav-ayuda']
  .map(c=>{const m=new RegExp('\\.'+c+'\\{order:(\\d)\\}').exec(ESCRITORIO);return m?+m[1]:null;});
ok(orden.join()==='1,2,3,4',
  'El orden es marca, tabs, identidad, ayuda ('+orden.join()+')');
ok(/\.nav-t\{flex-direction:column;flex:1/.test(ESCRITORIO),
  'El flex:1 de los tabs es lo que empuja identidad y ayuda al pie');
/* La regla base pone `border:1px` en los cuatro lados; sobrescribir solo el de
   arriba dejaba un recuadro completo alrededor de la inicial. */
ok(/\.nav-yo\{margin:0 0 \.1rem;position:relative;\s*border:0;border-top:1px/.test(ESCRITORIO),
  'La separacion de la identidad es una linea, no un recuadro (border:0 antes del border-top)');
ok(/\.nav-ayuda\{[^}]*background:none/.test(ESCRITORIO),
  'La ayuda no lleva fondo en reposo, para no ser el unico boton relleno del riel');

/* ── el popover crece hacia arriba si abajo no cabe ──────────────────────
   Con la ficha al pie del riel, anclar el borde SUPERIOR del popover a la
   ficha lo dejo en 91px de alto: el max-height se calcula contra lo que queda
   de pantalla, y abajo no quedaba nada. Se ancla por el borde inferior. */
ok(/const MIN_POPOVER=\d+;/.test(js),'Hay un minimo medido para decidir hacia donde abre');
ok(/h\.classList\.add\('hoja-arriba'\)/.test(js)&&/h\.classList\.remove\('hoja-arriba'\)/.test(js),
  'ancla() pone y quita la clase segun el espacio que mide');
ok(/--yo-b/.test(js),'y pasa el anclaje inferior en su propia variable');
ok(/\.hoja-yo\.hoja-arriba \.hoja-caja\{[\s\S]*?bottom:var\(--yo-b/.test(ESCRITORIO),
  'El CSS usa esa variable para anclar por abajo');

/* ───────── una ficha, una actividad: el invariante, en el codigo ─────────
   `racha`, `insignias` y `examenes` son campos de la ficha, no de la actividad.
   Eso da el comportamiento correcto SOLO si cada ficha pertenece a una sola
   actividad. `ponCat` permitia saltar de actividad dentro de la misma ficha y
   arrastraba los tres campos; el manual lo tapaba pidiendole al usuario que
   creara la segunda ficha a mano. Si alguien vuelve a dejar que una ficha
   cambie de actividad en el sitio teniendo progreso, esta prueba avisa. */
ok(/function pasaAActividad\(c\)/.test(APP),
  'Existe pasaAActividad(), que lleva a la ficha de la otra actividad');
ok(/if\(ACT_DE\(c\)!==ACT_DE\(S\.cat\)&&pasaAActividad\(c\)\)return;/.test(APP),
  'ponCat() delega el salto de actividad antes de escribir la categoria');
ok(/const sinProgreso=al=>/.test(APP),
  'sinProgreso() decide cuando NO vale partir la ficha');
ok(/S\.examenes\.filter\(e=>e\.cat===S\.cat\)\.length>=3\)a\('Persistente'\)/.test(APP),
  '«Persistente» cuenta solo los examenes de la categoria activa');
/* Y que el manual ya no le pida al usuario mantener el invariante a mano. */
ok(!/no cambies de categor.a\s*'\+\s*'?aqu/.test(APP)&&!/agrega <strong>otro participante<\/strong> con tu mismo/.test(APP),
  'El texto que le pedia al usuario crear la ficha a mano quedo retirado');

/* ───────── que la deuda de infraestructura no vuelva ─────────
   Habia CUATRO copias del stub del navegador y SIETE lecturas de fuente/app.js
   con siete nombres distintos. Ninguna de las dos cosas hace fallar nada por si
   sola: lo que hacen es que el siguiente arreglo se aplique en una copia y no en
   las otras, que es como `setAttribute` rompio dos suites de a una. Estas
   pruebas fijan la forma, no el comportamiento. */
const SUITES=['test.js','uso.js','simulacro.js','api.js']
  .map(f=>({f,t:fs.readFileSync(path.join(RAIZ,'tests',f),'utf8')}));
const conStub=SUITES.filter(x=>/let localStorage=\{/.test(x.t)).map(x=>x.f);
ok(conStub.length===0,
  'Ninguna suite trae su propia copia del stub del navegador'+
  (conStub.length?' — la traen: '+conStub.join(', '):''));
ok(/let localStorage=\{/.test(fs.readFileSync(path.join(RAIZ,'tests','entorno.js'),'utf8')),
  'El unico stub vive en tests/entorno.js');
const lecturas=SUITES.map(x=>(x.t.match(/readFileSync\([^)]*app\.js/g)||[]).length)
  .reduce((a,b)=>a+b,0);
ok(lecturas<=1,'fuente/app.js se lee una sola vez en toda la suite (hoy '+lecturas+')');
const alias=(TXT=>[...TXT.matchAll(/const (APP[A-Z0-9_]*|CSS[A-Z0-9_]+)\s*=\s*(APP|CSS)\s*;/g)])(SUITES[0].t);
ok(alias.length===0,'Sin alias de APP ni de CSS'+
  (alias.length?' — sobran: '+alias.map(m=>m[1]).join(', '):''));

console.log('\n'+(fallos===0?'TODAS LAS PRUEBAS PASARON':fallos+' FALLOS'));
process.exit(fallos?1:0);
