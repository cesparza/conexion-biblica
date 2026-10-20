const fs=require('fs');
const path=require('path');
const {montar,RAIZ,FUENTE,HTML:html,JS:js,REGLAMENTO,conReglas}=require('./entorno.js');
const {CAPS,CONTENIDO}=conReglas(require(path.join(RAIZ,'fuente','contenido.js')));
const {BANCO}=require(path.join(RAIZ,'fuente','preguntas.js'));
const {MODULOS,CONT_MODULOS}=conReglas(require(path.join(RAIZ,'fuente','modulos.js')));
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
ok(MODULOS.every(m=>(m.prof?m.tema:m.cats&&m.cats.length)&&m.icono&&m.color),'Cada módulo tiene categorías (o su tema, si es de profundizar), icono y color');
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
const MATU = conReglas(require(path.join(RAIZ,'fuente','matutina.js')));
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
ok(d31 && Array.isArray(d31.extra) && d31.extra.includes('dm2') && d31.cats.join()==='dm2',
  'El día 31 es de solo estudio para 7 a 9 años: se lee pero no entra al examen');

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
const MATU2=conReglas(require(path.join(RAIZ,'fuente','matutina.js')));
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
   conoce saldría impresa tal cual en la pantalla.
   LA LISTA VÁLIDA SE LEE DE marcasManual(), no se copia aquí: una lista
   escrita a mano en la prueba es un segundo sitio que mantener, y cuando se
   agregó N_CATS la prueba falló por estar desactualizada ELLA, no el manual.
   Una prueba que hay que arreglar cada vez que el código crece bien es una
   prueba que se termina apagando. */
const MARCAS_OK=(() => {
  const b = APP.slice(APP.indexOf('function marcasManual()'));
  const cuerpo = b.slice(0, b.indexOf('\n}'));
  return [...cuerpo.matchAll(/^\s{4}([A-Z_]+):/gm)].map(m => m[1]);
})();
ok(MARCAS_OK.length >= 9, 'Se leyeron las marcas que la app sabe reemplazar ('+MARCAS_OK.length+')');
const usadas=new Set();
/* También en el título y la bajada: ahí también se reemplazan. */
for(const m of MANUAL){
  for(const g of (m.t+' '+m.d).matchAll(/\{([A-Z_]+)\}/g))usadas.add(g[1]);
  for(const s of m.secs)
    for(const g of (s.t+' '+s.h).matchAll(/\{([A-Z_]+)\}/g))usadas.add(g[1]);
}
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
/* v135: contenido.js, modulos.js y build.js también arman tablas, y no se
   contaban: la tabla de nombres de Daniel 1 medía 577px a 390px de ancho. */
const FUENTES_TABLA=['app.js','manual.js','contenido.js','modulos.js','build.js']
  .map(f=>fs.readFileSync(FUENTE(f),'utf8')).join('\n');
const tablas=(FUENTES_TABLA.match(/<table class="info-table[ "]/g)||[]).length;
ok(tablas>0,'Hay tablas info-table que revisar ('+tablas+')');
const sinEnvolver=tablas-(FUENTES_TABLA.match(/tabla-scroll">\s*<table class="info-table[ "]/g)||[]).length;
ok(sinEnvolver===0,'Toda tabla info-table va dentro de un .tabla-scroll'+
  (sinEnvolver?' — quedan '+sinEnvolver+' sueltas':''));
ok(/\.tabla-scroll\{overflow-x:auto/.test(CSS),'El contenedor .tabla-scroll scrollea de lado');
ok(/\.sec-rot\{[^}]*flex:0 1 auto;min-width:0/.test(CSS_SIN),
  'El título de sección puede encogerse y partirse: con flex:0 0 auto uno largo sacaba la página de lado');
{ const B=fs.readFileSync(FUENTE('build.js'),'utf8');
  ok(/timeZone: 'America\/Bogota'/.test(B) && !/version\.json'\), PWA\.version\(huella, new Date\(\)\.toISOString/.test(B),
    'version.json lleva la fecha en hora de Colombia, no en UTC'); }
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


/* ───────── v234: Paralelos (fuente/paralelos.js) ─────────
   Camilo: una hoja por poder y una por tema, armadas solas; ninguna celda sin su texto. */
{
  const P=require(path.join(RAIZ,'fuente','paralelos.js')),{LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js')),{VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const mal=P.revisaParalelos(LAMINAS,{...VERS,...VERS_AP});
  ok(!mal.length,'Paralelos: cada cita está literal en la Biblia de la app, cada línea en su lámina y cada fuente trae página'+(mal.length?' — '+mal.slice(0,4).join(' | '):''));
  const H=P.armaParalelos(LAMINAS),ids=H.map(h=>h.id);
  const poderes=['babilonia','medopersia','grecia','imperial','dividida','papal','sanado'],temas=['juicio','santuario','ley','tiempo','santos','venida'];
  ok(poderes.every(x=>ids.includes(x)&&H.find(h=>h.id===x).tipo==='poder')&&temas.every(x=>ids.includes(x)&&H.find(h=>h.id===x).tipo==='tema'),
    'Paralelos: existen las hojas de los siete poderes y de los seis temas ('+ids.join(', ')+')');
  ok(H.every(h=>h.filas.length>=2&&h.cols.join()==='d2,d7,d8'),'Paralelos: cada hoja tiene filas y las columnas son Daniel 2, 7 y 8, en orden');
  const sinFuente=[];
  for(const h of H)for(const f of h.filas)for(const [k,es] of Object.entries(f.celdas))for(const e of es){
    const bien=e.tipo==='b'?/^(Daniel|Apocalipsis) \d+:\d+$/.test(e.ref)&&e.t:(e.tipo==='n'||e.tipo==='q')&&e.t&&/\bp\. ?\d|\b(CS|PE|\dT)\s+\d|\d+:\d+/.test(e.f||'');
    if(!bien||!e.p)sinFuente.push(h.id+'.'+f.id+'.'+k);}
  ok(!sinFuente.length,'Paralelos: toda celda es un texto bíblico con su referencia o una línea con fuente y página, o queda vacía'+(sinFuente.length?' — '+sinFuente.slice(0,5).join(', '):''));
  const papal=H.find(h=>h.id==='papal'),c=(f,k)=>((papal.filas.find(x=>x.id===f)||{celdas:{}}).celdas[k]||[]).map(e=>e.t).join(' | ');
  ok(/delante de él fueron arrancados tres cuernos/.test(c('origen','d7'))&&/cuatro vientos/.test(c('origen','d8'))&&/Hablará palabras contra el Altísimo/.test(c('contraDios','d7'))&&
    /cambiar los tiempos y la Ley/.test(c('ley','d7'))&&/quebrantado, aunque no por mano humana/.test(c('fin','d8'))&&/sacrificio continuo/.test(c('santuario','d8'))&&!c('santuario','d2'),
    'Paralelos: la hoja de Roma papal reúne lo de Daniel 2, 7 y 8 (el cuerno de Daniel 8 sale de uno de los vientos; el continuo lo quita la fase papal)');
  const imp=H.find(h=>h.id==='imperial'),dv=H.find(h=>h.id==='dividida');
  ok(!(imp.filas.find(f=>f.id==='santuario'))&&dv.vacias.d8==='Pasa de Roma imperial a Roma papal',
    'Paralelos: solo la fase papal quita el continuo; Daniel 8 no trae Roma dividida y dice por qué');
  ok(!/drag[oó]n/i.test(JSON.stringify(H)),'Paralelos: la bestia de Daniel 7 nunca se llama dragón');
  const venida=JSON.stringify(H.find(h=>h.id==='venida')),juicio=JSON.stringify(H.find(h=>h.id==='juicio'));
  ok(/hijo de hombre/.test(juicio)&&!/hijo de hombre/.test(venida)&&/Después de los mil años/.test(venida),
    'Paralelos: el Hijo del hombre va en el juicio (1844), no en la venida; el gran monte, después de los mil años');
  ok(/const PARALELOS = \[/.test(html)&&/function parHTML\(\)/.test(html)&&/\+ultHTML\(\)\+parHTML\(\)\+/.test(APP)&&/r\.push\('paralelos',parSel\)/.test(APP),
    'Paralelos: van en index.html, debajo de los últimos acontecimientos, y el enlace guarda la hoja');
  const PJ=html.slice(html.indexOf('/* ───────── v234: PARALELOS'),html.lastIndexOf('</script>'));
  ok(!/^(const|let) /m.test(PJ)&&!/onclick="[^"]*\b(this|event)\b/.test(PJ),'Paralelos: el código solo declara funciones y var (se puede pintar al arrancar) y sus toques son llamadas con literales (Jóvenes)');
}

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

/* CASO REAL: Camilo necesita varias evaluaciones abiertas a la vez (Guías,
   Aventureros y Devoción Matutina cada uno con la suya, el mismo rato). Antes
   esta prueba exigía lo contrario ("una sola forma de cerrar", el asistente de
   abrir se escondía mientras hubiera una abierta) — esa regla era la que lo
   impedía, y se cambió a propósito. Ahora se prueba lo que sí tiene que
   seguir siendo cierto: el asistente para abrir y el botón para cerrar
   conviven SIEMPRE en el mismo panel, y el panel nunca decide qué mostrar
   leyendo una caché local (esa fue la causa del bug de v74). */
const bloquePanel=APP.slice(APP.indexOf('async function pintaPanel'),APP.indexOf('const NOTA_NIVEL'));
ok(/abreEvaluacion/.test(bloquePanel),
  'El panel siempre ofrece el asistente para abrir, aunque ya haya evaluaciones en curso');
ok(!/const c=srvLee\(\)/.test(bloquePanel)&&!/hayEval/.test(bloquePanel),
  'pintaPanel() ya no decide qué mostrar leyendo la caché local de /estado');
const bloqueResultados=APP.slice(APP.indexOf('async function cargaResultados'),APP.indexOf('async function refrescaPanel'));
ok(/cierraEvaluacion/.test(bloqueResultados),
  'Cada tarjeta de "en curso" trae su propio botón para cerrar, con el id de esa evaluación');
ok(/panAbiertas=r\.evaluaciones/.test(bloqueResultados),
  'La lista de "en curso" sale de preguntarle al servidor cada vez, no de una caché');

/* ───────── el alcance del campamento ─────────
   MECANISMO: `extra` marca un capítulo que se estudia y no se examina, y
   acepta una lista de categorías porque el mismo capítulo puede estar fuera
   del examen de unas y dentro del de otras.
   Daniel 2 fue el caso que obligó a esa lista: el campamento se anunció con
   Daniel 1, 3 y 6. El 19 de septiembre Camilo decidió que Daniel 2 SÍ entra en
   las cuatro categorías, así que hoy no lo marca nadie. El mecanismo se queda
   probado con los capítulos que sí lo usan (Daniel 7 a 12 en Guías Mayores, el
   día 31 de la matutina).
   Estas pruebas existen porque el error se vería en un examen, no en la app. */
const CAMPAMENTO=['me','av','pa'];
const bancoCat=cat=>{
  const ids=CAPS_T.filter(c=>c.cats.includes(cat)&&!soloEstudioT(c,cat)&&c.ev!=='creencias').map(c=>c.id);
  return BANCO_T.filter(q=>ids.includes(q.cap));
};
for(const cat of CAMPAMENTO){
  ok(bancoCat(cat).some(q=>q.cap==='d2'),
    'Campamento ('+cat+'): Daniel 2 SÍ entra al examen');
  ok(CAPS_T.some(c=>c.id==='d2'&&c.cats.includes(cat)),
    'Campamento ('+cat+'): Daniel 2 está disponible para estudiar');
}
ok(bancoCat('gm').some(q=>q.cap==='d2'),
  'Guías Mayores conserva Daniel 2 en su examen');
/* El mecanismo `extra` sigue vivo y probado, aunque Daniel 2 ya no lo use. */
ok(CAPS_T.some(c=>Array.isArray(c.extra)&&c.extra.length),
  'La marca «solo para estudiar» sigue existiendo para los capítulos que la usan');
ok(bancoCat('gm').every(q=>!['d7','d8','d9','d10','d11','d12'].includes(q.cap)),
  'Guías Mayores estudia Daniel 7 a 12 pero no los examina');
for(const c of ['d1','d3','d6']){
  ok(bancoCat('av').some(q=>q.cap===c),'Aventureros examina '+c);
}
/* v177: desde el examen real del 10-oct, 7 a 9 años solo examina Daniel;
   Profetas y Reyes 39, 41 y 44 le queda para estudiar. Padres sí lo examina. */
for(const c of ['pr39','pr41','pr44']){
  ok(!bancoCat('av').some(q=>q.cap===c)&&bancoCat('pa').some(q=>q.cap===c),'Aventureros estudia '+c+' sin examinarlo; Padres lo examina');
}
ok(bancoCat('av').every(q=>!['pr40','pr42','pr43'].includes(q.cap)),
  'Aventureros no examina los capítulos de P&R que no le tocan');
/* El aviso en pantalla: un capítulo que se estudia y nunca sale en el examen
   parece un error de la app si no se dice. */
ok(/soloEstudio\(c,S\.cat\)\?'<div class="solo-est">/.test(APP),
  'La lista de capítulos marca «Solo para estudiar» el que no entra al examen');

/* ───────── UN TRAMO IMPOSIBLE NO SE PUEDE NI ESCOGER ─────────
   MECANISMO DEL PROBLEMA
   La primera version del tramo en el panel listaba los 77 capitulos de las
   tres actividades en los dos desplegables. Se podia armar «de la Creencia 24
   a Daniel 1», que no es un tramo de nada, y la app lo aceptaba y despues lo
   regañaba con tres parrafos rojos. Validar y avisar es la solucion floja: la
   buena es que el estado invalido no se pueda construir.

   COMO QUEDA: se escoge la actividad al escoger el material, «Hasta» se arma a
   partir de «Desde» (mismo tipo de capitulo y de ahi en adelante), y dentro de
   Conexion Biblica eso separa ademas Daniel de Profetas y Reyes. */
{
  /* v92: el desplegable de 85 opciones se partio en dos, actividad y material,
     asi que ya no hay un valor «rango:<actividad>»: la actividad es su propio
     control y el tramo sale de ella. La regla que se prueba es la misma. */
  ok(/function opcionesMatPanel\(act\)/.test(APP)&&/'tramo','Un tramo/.test(APP),
    'El tramo lo ofrece cada actividad, no una lista comun a las tres');
  ok(/const caps=capsDeActividad\(act\|\|PRIMERA_ACT\);/.test(APP),
    'Y los dos extremos salen de los capitulos de ESA actividad');
  ok(/function llenaRangoPanel\(act,mantener\)/.test(APP),
    'Los dos extremos se llenan para la actividad escogida');
  ok(/familiaDe\(c\.id\)===familiaDe\(prev1\)&&numDe\(c\.id\)>=numDe\(prev1\)/.test(APP),
    '«Hasta» solo ofrece el mismo tipo de capitulo y de ahi en adelante');
  ok(/id="pan-r1" onchange="cambiaDesdePanel\(\)"/.test(APP),
    'Cambiar «Desde» vuelve a armar «Hasta»: ahi es donde se cierra el hueco');
  ok(/onchange="cambiaMaterialPanel\(\)"/.test(APP),
    'Y cambiar de actividad reinicia el tramo, que era de otra');
  /* La guarda se queda, pero ya no es la forma de avisar. */
  ok(/GUARDA DE ULTIMO RECURSO/.test(APP),
    'La validacion sobrevive como guarda, no como mensaje');
  ok(!/son de[\s\S]{0,40}actividades distintas\. Los dos extremos/.test(APP),
    'Y el parrafo rojo que explicaba el disparate ya no hace falta');
}

/* ───────── DOS CATEGORIAS NO PUEDEN VERSE IGUAL ─────────
   MECANISMO DEL PROBLEMA
   «Menores · 4 a 6 años» es la etiqueta de DOS categorías: la de Conexión
   Bíblica y la de Devoción Matutina. Igual con las dos «Aventureros · 7 a 9
   años». En cualquier lista donde puedan aparecer las dos, el nombre solo no
   identifica nada: salían dos opciones idénticas en el desplegable de crear
   participantes, y escoger la equivocada era cuestión de suerte. El error no
   se veía ahí: se veía días después, cuando «la evaluación no le llegaba».

   Esta prueba no pide que los nombres sean únicos (no lo son, y está bien: son
   los nombres reales de los clubes). Pide que las LISTAS que pueden mezclar
   actividades digan de cuál es cada una. */
{
  const nombres = Object.values(REGLAMENTO.CATS).map(c => c.nombre);
  const repetidos = nombres.filter((n, i) => nombres.indexOf(n) !== i);
  ok(repetidos.length > 0,
    'Hay nombres de categoría repetidos entre actividades (' + [...new Set(repetidos)].join(', ') +
    '): por eso esta sección existe');
  /* AGRUPAR NO ALCANZA. El selector nativo de iOS pinta las opciones SIN las
     etiquetas de <optgroup>: visto en un iPhone, las ocho categorías seguidas
     con «Menores · 4 a 6 años» dos veces, igual que antes de agrupar. Lo que
     distingue dos opciones tiene que ir en el TEXTO de la opción, que se ve en
     todos los navegadores, y de primero, porque en pantalla angosta el texto
     se corta por el final. */
  ok(/'<select id="pan-cat">'\+Object\.keys\(ACTIVIDADES\)/.test(APP),
    'El selector de categoría del paso 1 agrupa por actividad');
  ok(/const catLarga=/.test(APP)&&/esc\(catLarga\(k\)\)/.test(APP),
    'Y cada opción lleva la actividad en su propio texto, no solo en el grupo');
  ok(/catLarga=k=>CATS\[k\]\s*\?\s*actYCat\(k\)\+' '/.test(APP)&&/modo==='par'\?c\.nombre\+' \('\+a\+'\)':a\+' · '\+c\.nombre/.test(APP),
    'Con la actividad de PRIMERO: es la parte que distingue y el texto se corta por el final');
  ok(/const catConActividad=/.test(APP),
    'Existe una sola forma de nombrar una categoría con su actividad');
  /* Y las tres listas que pueden mezclar actividades la usan. */
  const usos = (APP.match(/catConActividad\(/g) || []).length;
  ok(usos >= 3, 'Y la usan la tabla del panel, las casillas de personas y el selector de fichas ('
    + usos + ' usos)');
}

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

/* El banco tal como queda en el index.html: siete archivos fuente mas lo que
   inyecta el build. Cualquier cuenta sobre «el banco» tiene que salir de aqui. */
const BANCO_HTML = (() => {
  const m = js.match(/const BANCO = (\[[\s\S]*?\n\]);/);
  return eval(m[1]);
})();

/* Lo mismo con verdadero o falso: si la mayoría son verdaderas, contestar
   siempre «verdadero» saca nota.

   SE MIDE EL BANCO DESPLEGADO, NO DOS ARCHIVOS.
   Esta prueba sumaba solo `BANCO` y `MAT_BANCO`, y el banco ya son SIETE
   archivos. Por eso no vio que las 56 de verdadero/falso de las creencias
   salieron TODAS verdaderas: un generador tenia `a:true` clavado. La prueba
   daba verde mientras un tercio del banco se contestaba solo.
   Se mide sobre el index.html, que es lo que la gente usa, y ademas por
   actividad: un promedio global sano puede tapar una actividad entera
   desbalanceada, que es justo lo que paso. */
const TF_TODO = BANCO_HTML.filter(q => q.t === 'tf');
const pctDe = f => { const g = TF_TODO.filter(q => f(q.cap));
  return g.length ? Math.round(g.filter(q => q.a).length / g.length * 100) : null; };
const pctV = pctDe(() => true);
ok(pctV>=35&&pctV<=65,
  'Las de verdadero o falso están repartidas: '+pctV+'% verdaderas de '+TF_TODO.length+' (rango 35-65%)');
for (const [et, f] of [['Daniel', c=>/^d\d+$|^pr/.test(c)],
                       ['matutina', c=>/^m\d\d$/.test(c)],
                       ['creencias', c=>/^cr\d\d$/.test(c)]]) {
  const p = pctDe(f);
  ok(p !== null && p >= 35 && p <= 65,
    '  y también dentro de ' + et + ': ' + p + '% verdaderas');
}

/* Dos preguntas de completar con el MISMO rótulo dentro del mismo capítulo: en
   la revisión el estudiante ve dos veces el mismo encabezado y no sabe cuál
   falló. Pasó al renombrar una referencia mal puesta. */
const rot={};
BANCO.filter(q=>q.t==='fill').forEach(q=>{const k=q.cap+'|'+q.ins;rot[k]=(rot[k]||0)+1;});
const rotDup=Object.entries(rot).filter(([,n])=>n>1).map(([k])=>k);
ok(rotDup.length===0,'Ningún rótulo de completar se repite dentro del mismo capítulo'+
  (rotDup.length?' — '+rotDup.join(' / '):''));

/* ── EL BORDE IZQUIERDO DE LAS CITAS A OTROS LIBROS ──────────────────────
   `\b` en JavaScript se define sobre [A-Za-z0-9_]. Entre un espacio y una «É»
   no hay frontera de palabra, asi que con `\b` delante «Éxodo 31:13-17» nunca
   enganchaba: era el unico de los 42 libros que jamas se volvia tocable, y no
   fallaba nada, simplemente se quedaba en texto negro. Lo encontro una captura,
   no una prueba. Esta es la prueba. */
{
  ok(!/new RegExp\('\\\\b\('\+Object\.values\(NOMBRES_OTROS\)/.test(APP),
    'La regex de citas a otros libros ya no arranca con \\b, que no sirve con acentos');
  ok(/LETRA_ANTES/.test(APP),
    'Y el borde izquierdo se comprueba mirando el caracter anterior');
  /* Se pide aqui adentro y no arriba: `NOMBRES_OTROS` se declara mas abajo en
     este mismo archivo, y un const usado antes de su declaracion lanza TDZ. */
  const NOMS = require(path.join(RAIZ, 'fuente', 'biblia-otros.js')).NOMBRES_OTROS;
  /* Los que empiezan con numero («1 Juan») nunca tuvieron problema: un digito
     SI es caracter de palabra. El caso roto era el que empieza con letra
     acentuada. */
  const acentuados = Object.values(NOMS).filter(n => /^[^\x00-\x7F]/.test(n));
  ok(acentuados.length > 0,
    'Y hay libros que empiezan con letra acentuada, que es lo que lo rompia: ' + acentuados.join(', '));
}

/* La pregunta «¿a qué creencia corresponde esta declaración?» no puede llevar
   el título de la creencia dentro de la cita: se contestaría sola. */
const CRE=conReglas(require(path.join(RAIZ,'fuente','creencias.js')));
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
/* v178: «Daniel» o «Apocalipsis», los dos libros con texto RV1995 en VERS. */
ok(/\(Daniel\|Apocalipsis\)\\s\+/.test(APP),
  'La primera pasada de refsTocables exige el nombre «Daniel» explicito');
ok(/OTRO_LIBRO/.test(APP)&&/const lib=libroCid\(capId\), enDaniel=!!lib&&!!VERS\[capId\]/.test(APP),
  'La segunda pasada solo actua dentro de un capitulo de Daniel y descarta otros libros');

/* ── CITAS A OTROS LIBROS: TODAS TIENEN QUE ABRIR UN VERSICULO REAL ──────
   v60: BIBLIA_CAPS ahora cubre d1-d12 (antes se quedaba en d1-d6 y las
   citas sueltas (N:M) de Daniel 7-12 no abrian nada), y refsTocables()
   suma una pasada para «Libro N:M» de un libro distinto de Daniel
   (fuente/biblia-otros.js, RV1909, dominio publico). Esta prueba no repite
   ese mecanismo: solo comprueba que CADA cita de otro libro que aparece en
   el material tiene su versiculo ya sourced, para que el boton no quede
   mudo (texto sin \u0000 → sin onclick → sin hoja). */
ok(/BIBLIA_CAPS=\['d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12'\]/.test(APP),
  'BIBLIA_CAPS cubre Daniel 1-12: las citas (N:M) sueltas de 7-12 tambien abren');

const { NOMBRES_OTROS, OTRAS_VERS } = require(path.join(RAIZ, 'fuente', 'biblia-otros.js'));
const NOMBRE_A_SLUG = Object.keys(NOMBRES_OTROS).reduce((m,k)=>{m[NOMBRES_OTROS[k]]=k;return m;},{});
const RE_OTRO_LIBRO_CITA = new RegExp('\\b('+Object.values(NOMBRES_OTROS)
  .map(n=>n.replace(/\s+/g,'\\s+')).sort((a,b)=>b.length-a.length).join('|')+
  ')\\s+(\\d{1,3}):(\\d{1,3})(?:[-–](\\d{1,3}))?','g');

const sinFuente=[];
const revisaOtroLibro=(donde,txt)=>{
  if(!txt)return;
  for(const m of String(txt).matchAll(RE_OTRO_LIBRO_CITA)){
    const slug=NOMBRE_A_SLUG[m[1]], cid=slug+'-'+m[2];
    const de=+m[3], hasta=m[4]?+m[4]:de;
    const mapa=OTRAS_VERS[cid];
    if(!mapa||!mapa[de])sinFuente.push(donde+' → '+m[0]+' (falta '+cid+':'+de+')');
    else if(m[4]&&!mapa[hasta])sinFuente.push(donde+' → '+m[0]+' (falta '+cid+':'+hasta+')');
  }
};
Object.keys(CONTENIDO).forEach(k=>CONTENIDO[k].forEach(s=>{
  revisaOtroLibro('contenido/'+k,s.t);revisaOtroLibro('contenido/'+k,s.h);}));
BANCO.forEach(q=>{
  revisaOtroLibro('pregunta '+q.cap,q.q);revisaOtroLibro('pregunta '+q.cap,q.ins);
  revisaOtroLibro('pregunta '+q.cap,q.e);
  if(Array.isArray(q.o))q.o.forEach(o=>revisaOtroLibro('pregunta '+q.cap+'/opcion',o));
});
TARJETAS.forEach(tj=>{revisaOtroLibro('tarjeta '+tj.cap,tj.f);revisaOtroLibro('tarjeta '+tj.cap,tj.d);});
ok(sinFuente.length===0,
  `Toda cita a otro libro tiene su versiculo en biblia-otros.js`+
  (sinFuente.length?' — '+sinFuente.slice(0,6).join(' / '):''));

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
/* v163: salen de las fichas de campamentos.js, que es de donde las saca la app. */
const { CATS: CATS_APP, ACTIVIDADES: ACTS_APP } = REGLAMENTO;

ok(Object.keys(ACTS_APP).length===7,'Hay siete actividades declaradas (el concurso 2027 son tres, v239)');
ok(['cb','cbg','dm','ec','ap','apc','apa'].every(a=>ACTS_APP[a]),'Son cb, cbg, dm, ec, ap, apc y apa (Apocalipsis por club, v239)');
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
/* v214: la biblioteca es una sola. capsDe() es lo del concurso (capsConcurso, el
   filtro simple por categoría de siempre) o todo el material del tema (capsTema). */
ok(/const capsConcurso=\(\)=>CAPS\.filter\(c=>c\.cats\.includes\(S\.cat\)\)/.test(APP)&&
   /const capsDe=\(\)=>verTodo\(\)\?capsTema\(\):capsConcurso\(\);/.test(APP),
  'capsDe() es lo del concurso (filtro por categoría) o todo el material del tema');

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

/* ── PAUSAR Y REANUDAR LA LECTURA EN AUDIO ───────────────────────────────
   v127: la voz es una cola de partes (un versículo, o una frase si el
   versículo es largo). Pausar es cancelar y recordar la parte; no se usan
   pause()/resume() del navegador, que en Android y en iOS viejos dejaban el
   botón en ▶ sin voz. Cancel() via paraVoz sigue siendo el corte total al
   navegar, porque una voz que sigue sonando en otra pantalla es una falla. */
ok(/function paraVoz\(\)/.test(APP)&&/function pausaVoz\(\)/.test(APP),'Existen paraVoz() y pausaVoz()');
ok(/if\(btn===vozBtn&&VZ\.partes\.length\)\{\s*if\(VZ\.sonando\)pausaVoz\(\);else\{pideSonido\(\);desdeVoz\(VZ\.i\);\}/.test(APP),
  'Tocar el boton que ya esta leyendo pausa o sigue desde la misma parte');
ok(!/speechSynthesis\.pause\(\)/.test(APP)&&!/speechSynthesis\.resume\(\)/.test(APP),
  'No se usan pause()/resume() del navegador');
ok(!/slice\(0,600\)\);?\s*const u=/.test(APP)&&!/\.slice\(0,600\)/.test(APP.slice(APP.indexOf('leer en voz alta'))),
  'La voz ya no recorta el texto a 600 caracteres');
/* ── v158: UNA PIEZA, UN SOLO ARMADO ──────────────────────────────────
   Regla de Camilo (10-oct-2026): «un mismo componente se utiliza con su misma
   implantación en todos los lugares donde aparezca». Se cuenta en las fuentes:
   el HTML de cada pieza se escribe en UN sitio (su función) y los demás la
   llaman. Si alguien vuelve a escribir el botón a mano en otra pantalla, o lo
   deja escrito dentro del contenido, esto falla. */
{
  const leeF=f=>fs.readFileSync(path.join(__dirname,'..','fuente',f),'utf8');
  const app=leeF('app.js');
  const veces=(txt,re)=>(txt.match(re)||[]).length;
  const piezas=[
    ['el reproductor (htmlRp)',/class="lec-play"/g],
    ['la tira del reproductor (htmlTira)',/data-k="'\+k\+'"/g],
    ['Anterior y Siguiente (filaNav)',/class="hoja-nav"/g],
    ['el control segmentado (segmentado)',/class="capa-filtro/g],
    ['los botones del segmentado (segmentado)',/class="cf['" ]/g],
    ['el botón de escuchar de un bloque (grupoVoz)',/class="grupo-voz"><button/g],
  ];
  piezas.forEach(([nombre,re])=>{
    const n=veces(app,re);
    ok(n===1,'Una pieza, un armado: '+nombre+' se escribe en un solo sitio de app.js ('+n+')');
  });
  /* Y el contenido no trae la pieza escrita: deja una marca y la app la arma. */
  const contenido=['creencias.js','contenido.js','modulos.js','matutina.js','matutina-extra.js','manual.js'].map(leeF).join('\n');
  const escritas=[/class=\\?"cf[\\" ]/,/class=\\?"hoja-nav/,/class=\\?"lec-play/,/class=\\?"capa-filtro/].filter(re=>re.test(contenido)).map(String);
  ok(escritas.length===0,'El contenido no escribe a mano ninguna pieza de la app'+(escritas.length?': '+escritas.join(', '):''));
  ok(/function filtroCapas\(\w*\)\{\s*return segmentado\(/.test(app)&&/outerHTML=segmentado\('Cómo practicar'/.test(app),
    'Los dos controles de opciones (capas y niveles de las 28) salen de segmentado()');
  ok(/'<div class="hoja-pie">'\+\s*filaNav\(/.test(app)&&/'<div class="cap-nav">'\+filaNav\(/.test(app),
    'La hoja del versículo y el capítulo llaman a la misma filaNav()');
  ok(/return htmlRp\(modo==='texto'\?'texto':'lectura',/.test(app)&&/return htmlRp\('estudio',/.test(app),
    'Lectura, texto y estudio llaman al mismo htmlRp()');
}
/* v161: al pasar de un capítulo a otro la página no sube y baja. Camilo
   (10-oct): «cuando le doy siguiente, el scroll sube y baja». verCap() llamaba
   a ir(), que subía al principio, y después bajaba animado hasta el capítulo.
   El recorrido con navegador está en tools/en-navegador.js. */
ok(/ir\('estudio',true\);/.test(APP)&&/if\(!quedarse\)\{/.test(APP),
  'Abrir un capítulo no manda primero la página al principio');
/* La posición del título y el regreso al listado se comprueban en el navegador
   integrado: Jóvenes/tests/estudio-navegacion.mjs, con los estilos aplicados. */
ok(/if\(i>0&&i<lista\.length\)verCap\(lista\[i\]\.id\);\s*else ir\('inicio'\);/.test(APP),
  '«Ya lo estudié» deja en el capítulo que sigue, no arriba en la rejilla');
/* v159: la app no se amplía sola. Todo campo de escribir mide 16 px en una
   pantalla que se toca (si no, el iPhone amplía al tocarlo y no vuelve), y el
   doble toque no amplía. El pellizco se deja: es la lupa de quien no ve bien. */
{
  const css=fs.readFileSync(path.join(__dirname,'..','fuente','estilos.css'),'utf8');
  ok(/@media \(pointer:coarse\)\{\s*input:not\(\[type=checkbox\]\):not\(\[type=radio\]\):not\(\[type=range\]\),select,textarea\{font-size:16px!important\}/.test(css),
    'En pantallas que se tocan, cualquier campo de escribir mide 16 px, sin que otra regla le gane');
  ok(/html\{touch-action:manipulation\}/.test(css),'El doble toque no amplía la página');
  const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  ok(!/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\D|$)/.test(html),'Y el pellizco no se bloquea: quien no ve bien puede agrandar');
}
/* v158: el pie de las hojas no va pegado al borde del telefono. */
{
  const css=fs.readFileSync(path.join(__dirname,'..','fuente','estilos.css'),'utf8');
  ok(/\.hoja-caja\{[^}]*padding-bottom:calc\(env\(safe-area-inset-bottom,0px\) \+ (1[2-9]|[2-9]\d)px\)/.test(css),
    'La hoja deja un colchon fijo abajo, ademas del margen del sistema (que es 0 en un iPhone SE)');
  ok(/\.hoja-nav\{[^}]*min-height:(4[4-9]|[5-9]\d)px/.test(css),'«Anterior» y «Siguiente» miden 44 px o mas');
}
ok(/function ir\(id,quedarse\)\{\s*paraVoz\(\);/.test(APP),
  'Cambiar de pantalla corta la lectura');
ok(/function verCap\(id,quieto\)\{\s*paraVoz\(\);/.test(APP),
  'Cambiar de capitulo corta la lectura');
/* Cada speak lleva su turno: el onend de lo cancelado no avanza la cola nueva. */
ok(/u\.onend=\(\)=>\{if\(t===VZ\.turno&&VZ\.sonando\)siguePart\(\);\}/.test(APP),
  'El onend solo avanza si es del turno vigente');
/* En iOS onend no siempre llega. Sin el reloj de seguridad la cola se queda
   pegada en una parte. */
ok(/vozReloj=setTimeout\(mira,/.test(APP)&&/speechSynthesis\.speaking/.test(APP),
  'Hay un reloj de seguridad por si onend no llega (pasa en iOS), y espera si aun habla');
/* v128: el boton de silencio del iPhone. Cada toque que empieza a hablar pide
   la sesion «playback» y arranca el audio mudo; pausar y parar lo sueltan. Y
   en iOS cancelar y hablar en seguida sale mudo: se espera un respiro. */
ok(/navigator\.audioSession\.type='playback'/.test(APP),'Se pide la sesion de audio playback');
ok((APP.match(/pideSonido\(\);desdeVoz\(/g)||[]).length>=5,
  'Todo toque que empieza a hablar pide sonido antes ('+(APP.match(/pideSonido\(\);desdeVoz\(/g)||[]).length+')');
ok(/function pausaVoz\(\)\{[^}]*sueltaSonido\(\)/.test(APP)&&/function paraVoz\(\)\{[^}]*sueltaSonido\(\)/.test(APP),
  'Pausar y parar sueltan el audio mudo');
ok(/if\(sonaba\)speechSynthesis\.cancel\(\)/.test(APP)&&/setTimeout\(\(\)=>\{if\(t===VZ\.turno&&VZ\.sonando\)dice\(k\);\},VOZ_RESPIRO\)/.test(APP),
  'Si algo sonaba, se cancela y se habla un respiro despues');
/* vozBtn es un `let` y ir() lo usa antes de la seccion de voz: si se declara
   abajo, la app no arranca por TDZ. Ya paso con diaHoy. */
const posVoz=APP.indexOf('let vozBtn'), posIr=APP.indexOf('function ir(id,quedarse)');
ok(APP.indexOf('const VZ=')>=0&&APP.indexOf('const VZ=')<posIr,
  'VZ tambien se declara ANTES de ir() (paraVoz lo usa)');
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
/* EL GLOBO DE IDENTIDAD, QUE SE DESBORDO DOS VECES.
   `white-space` se hereda. El globo vive dentro de `.nav-yo`, que vive dentro
   de `.nav-b`, que declara `white-space:nowrap` para que el logo y las
   pestanas no se partan. En v104 se QUITO el `nowrap` propio del globo y el
   texto siguio saliendose: quitar la declaracion no devuelve el valor
   inicial, deja que gane la del padre. Con nowrap heredado el texto no
   envuelve, asi que `max-width:230px` recorta en vez de contener y la ultima
   palabra queda cortada. Medido: caja 230px, contenido 324px.
   Por eso la regla tiene que DECLARAR `white-space:normal`, y esta prueba
   existe para que no se vuelva a borrar por parecer redundante. */
ok(/\.nav-yo \.yo-tip\{[^}]*white-space:normal/.test(CSS),
  'El globo de identidad declara white-space:normal (el nowrap le llega heredado de .nav-b)');
ok(/\.nav-yo \.yo-tip\{[^}]*max-width:230px/.test(CSS),
  'Y conserva su maximo de 230px, que ahora si contiene en vez de recortar');

/* UN BOTON PEGADO AL TEXTO.
   `.nota` trae margin-top pero no margin-bottom, y `.btn` no trae ninguno: la
   distancia entre el ultimo renglon de una frase y el boton que la sigue era
   CERO, asi que el boton se leia como parte del parrafo. Medido despues del
   arreglo: 14px a 390px de ancho. */
ok(/\.nota \+ \.btn[^{]*\{[^}]*margin-top/.test(CSS),
  'Un boton que sigue a un texto lleva su propio margen');
/* Y una accion dentro de una tabla no puede ser una pildora: con el relleno
   de 1.3rem por lado, «Ver en que fallo» no cabia en la columna de un celular
   y salia cortada contra el borde. */
ok(/\.info-table \.btn\.gho\{[^}]*padding:\.4rem/.test(CSS),
  'La accion de una tabla va como texto, no como pildora');

/* EL ZOOM QUE NADIE PIDIO.
   Safari en iPhone amplia la pagina sola al tocar un campo cuya letra mide
   menos de 16px, y al salir NO vuelve. Medidos antes del arreglo: siete
   campos por debajo, entre ellos `.rell input`, los huecos de completar el
   versiculo: cada vez que la nina tocaba uno, el examen se le ampliaba y se
   quedaba asi. La unica forma de evitarlo es que el campo mida 16px. */
const coarse = (CSS.match(/@media \(pointer:coarse\)\{[^}]*\}/) || [''])[0];
/* ── LA HOJA DE ESTILOS TIENE QUE CERRAR TODO LO QUE ABRE ──
   Un `{` sin su `}` no rompe una regla: se traga TODO lo que viene despues.
   Paso de verdad en v114: una insercion dejo un `@media print{` de mas en la
   linea 83, y de ahi en adelante la hoja entera quedo dentro de «solo al
   imprimir». La app se publico SIN estilos y ninguna prueba lo vio, porque
   todas miran el texto del CSS y no su estructura. Esta si la mira. */
/* ── NINGUNA REGLA DE PANTALLA PUEDE QUEDAR DENTRO DE @media print ──
   ESTO ES LO QUE DE VERDAD FALLO EN v114, y el balance de llaves solo lo caza
   por casualidad: lo que rompio la app no fue que faltara un `}`, fue que la
   mitad de la hoja quedo dentro de «solo al imprimir». El balance detecta ese
   caso porque el archivo termina abierto, pero si el `}` hubiera aparecido mas
   abajo, las llaves cuadrarian y la app seguiria sin estilos.

   Asi que esta prueba recorre la hoja llevando la cuenta de en que @media esta
   parada cada regla, y exige que las piezas que se ven en pantalla NO vivan
   dentro de un bloque de impresion. Es la unica prueba del proyecto que mira
   la ESTRUCTURA del CSS y no su texto. */
{
  const sinCom0 = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
  const ESENCIALES = ['.nav{', '.pantalla{', '.btn{', '.cap{', '.hoja-caja{', 'body{'];
  const pila = [];   // los @ abiertos ahora mismo
  const fuera = new Set(); // los esenciales que SI viven fuera de impresion
  let i = 0, profundidad = 0;
  while (i < sinCom0.length) {
    const a = sinCom0.indexOf('{', i), c = sinCom0.indexOf('}', i);
    if (a < 0 && c < 0) break;
    if (a >= 0 && (c < 0 || a < c)) {
      const cabeza = sinCom0.slice(sinCom0.lastIndexOf('}', a - 1) + 1, a).trim();
      const esAt = cabeza.charAt(0) === '@';
      if (esAt) pila.push(cabeza);
      else {
        const enPrint = pila.some(x => /@media[^{]*\bprint\b/.test(x) && !/screen/.test(x));
        for (const e of ESENCIALES)
          if ((cabeza + '{').indexOf(e) >= 0 && !enPrint) fuera.add(e);
      }
      profundidad++; i = a + 1;
    } else {
      profundidad--; if (pila.length && profundidad < pila.length) pila.pop();
      i = c + 1;
    }
  }
  /* Un @media print que AJUSTA .pantalla al imprimir es legitimo y hay varios.
     Lo que no puede pasar es que la definicion NORMAL de una pieza solo exista
     dentro de impresion, que es lo que deja la app en blanco. */
  const perdidas = ESENCIALES.filter(e => !fuera.has(e));
  ok(perdidas.length === 0,
    'Las piezas esenciales se definen fuera de @media print' +
    (perdidas.length ? ' — se perdieron: ' + perdidas.join(', ') : ''));
}

{
  const sinCom = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
  const abre = (sinCom.match(/\{/g) || []).length;
  const cierra = (sinCom.match(/\}/g) || []).length;
  ok(abre === cierra,
    'Cada llave que abre en el CSS tiene la suya que cierra (' + abre + ' y ' + cierra + ')');
  ok(!/@media[^{]*\{\s*@media/.test(sinCom),
    'No hay un @media abierto justo dentro de otro, que es como se colo el de v114');
}

/* ─── el color de relleno no sirve de tinta ───
   Medido en el render real (24-sep): el verde #2E9E6B sobre su propio fondo
   claro daba 2,98 de contraste y el naranja #E8720C sobre la crema 2,93,
   cuando un texto se empieza a leer en 4,5. La piel de esta app existe para
   que una nina de siete anos lea al sol; ahi eso no se ve.
   Por eso los tres colores tienen una version TINTA, mas oscura, y el relleno
   y el borde siguen intactos. Esta prueba existe porque el error no se nota
   leyendo el CSS: el color «se ve bien» en la pantalla del que lo escribe. */
{
  /* v207: el modo oscuro va aparte (más abajo); aquí se mide la piel clara. */
  const sinCom = CSS.replace(/\/\*[\s\S]*?\*\//g, '').replace(/html\[data-cb-solo\][^{]*\{[^}]*\}/g, '');
  ok(/--naranja-txt:/.test(sinCom)&&/--verde-txt:/.test(sinCom)&&/--rojo-txt:/.test(sinCom),
    'Los tres colores de marca tienen su version tinta declarada');
  /* Tambien en el JS: los mensajes de error se pintan con style= en linea, y
     ahi el CSS no alcanza. Doce de ellos estaban con el relleno como tinta. */
  const comoTinta = (sinCom + APP).match(/(?<![-\w])color:var\(--(naranja|verde|rojo|cielo)\)/g) || [];
  ok(comoTinta.length === 0,
    'Ningun texto usa el color de relleno, ni en el CSS ni en un style= del JS' +
    (comoTinta.length ? ' (' + comoTinta.length + ' usos)' : ''));
  /* v137: letra blanca sobre el naranja de marca da 3,07. Donde el fondo
     naranja lleva letra blanca, va el naranja oscuro (--naranja-txt, 4,75). */
  const blancoSobreNar = [...sinCom.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(m => /background:var\(--(naranja|v-acento)\)/.test(m[2]) && /(?<![-\w])color:(var\(--v-sobre|#fff)/i.test(m[2]))
    .map(m => m[1].trim());
  ok(blancoSobreNar.length === 0,
    'Ninguna letra blanca va sobre el naranja de marca' + (blancoSobreNar.length ? ' (' + blancoSobreNar.join(', ') + ')' : ''));
  /* v138: auditoria completa con Playwright (tools/contraste.js): 19 casos a
     390 px y 1 mas a 1280. La suite no tiene navegador, asi que aqui se
     calcula el contraste de los pares de colores que la app usa, leyendo los
     valores del CSS. Si alguien cambia un color, esta prueba lo mide. */
  const hexDe = n => { const m = sinCom.match(new RegExp('--' + n + ':\\s*(#[0-9a-fA-F]{6})')); return m && m[1]; };
  const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const suaves = [...sinCom.matchAll(/--v-cat-suave:(#[0-9a-fA-F]{6})/g)].map(m => m[1]);
  const pares = [
    ['texto gris (tinta3) sobre blanco', hexDe('v-tinta3'), '#FFFFFF'],
    ...suaves.map(f => ['texto gris (tinta3) sobre el fondo suave ' + f, hexDe('v-tinta3'), f]),
    ['blanco sobre el azul de marca', '#FFFFFF', hexDe('v-marca')],
    ['blanco sobre el naranja oscuro', '#FFFFFF', (sinCom.match(/--naranja-txt:var\(--v-acento-txt,(#[0-9a-fA-F]{6})/) || [])[1]],
    ['blanco sobre el verde oscuro', '#FFFFFF', (sinCom.match(/--verde-txt:var\(--v-ok-txt,(#[0-9a-fA-F]{6})/) || [])[1]],
    ['azul claro de texto sobre blanco', (sinCom.match(/--cielo-txt:var\(--v-marca2-txt,(#[0-9a-fA-F]{6})/) || [])[1], '#FFFFFF'],
    ['azul claro de texto sobre la pildora #dbeafe', (sinCom.match(/--cielo-txt:var\(--v-marca2-txt,(#[0-9a-fA-F]{6})/) || [])[1], '#DBEAFE'],
    ['cafe del modo lectura sobre su papel', '#76674C', '#FBFAF7'],
  ];
  pares.forEach(([que, fg, bg]) => {
    const r = fg && bg ? ratio(fg, bg) : 0;
    ok(r >= 4.5, 'Contraste ' + que + ': ' + r.toFixed(2) + ' (minimo 4,5)');
  });
  ok(!/#8a7a5f|#a3946f/i.test(sinCom), 'El modo lectura no vuelve al cafe claro (2,86 a 4)');
  /* v207: EL MODO OSCURO DE LA APP SOLA. Dos copias del mismo bloque (el del
     teléfono y el elegido en Logros): tienen que decir lo mismo. Solo cuelga
     de html[data-cb-solo], que dentro de Jóvenes no existe. Y cada --o-* trae
     su valor de siempre como respaldo, para que en claro nada cambie. */
  {
    const conCom = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
    const reglas = sel => [...conCom.matchAll(/(html\[data-cb-solo\][^{]*)\{([^}]*)\}/g)]
      .filter(m => sel.test(m[1])).map(m => m[1].replace(sel, '').trim() + '{' + m[2].replace(/\s+/g, ' ').trim() + '}');
    const auto = reglas(/^html\[data-cb-solo\]:not\(\[data-apariencia="claro"\]\)/), fijo = reglas(/^html\[data-cb-solo\]\[data-apariencia="oscuro"\]/);
    ok(auto.length >= 5 && auto.join('\n') === fijo.join('\n'), 'Modo oscuro: las dos copias (automático y elegido) dicen lo mismo (' + auto.length + ' reglas)');
    ok(/@media \(prefers-color-scheme:dark\)\{\s*html\[data-cb-solo\]:not\(\[data-apariencia="claro"\]\)/.test(conCom), 'Modo oscuro: el automático sigue al teléfono (prefers-color-scheme)');
    ok(/<html lang="es" data-cb-solo>/.test(htmlApp), 'El <html> de la app sola lleva data-cb-solo (dentro de Jóvenes no está)');
    const usosO = [...conCom.matchAll(/var\(--o-[a-z0-9-]+(,?)/g)];
    ok(usosO.length >= 20 && usosO.every(m => m[1] === ','), 'Cada ficha --o-* trae su valor de siempre como respaldo (' + usosO.length + ' usos)');
    ok(!/(^|[;{\s])--o-[a-z0-9-]+:/.test(conCom.replace(/html\[data-cb-solo\][^{]*\{[^}]*\}/g, '')), 'Las fichas --o-* solo se definen en el modo oscuro');
    const os = auto[0] || '';
    const ho = n => (os.match(new RegExp('--' + n + ':\\s*(#[0-9a-fA-F]{6})')) || [])[1];
    const fondos = [['el lienzo', ho('v-lienzo')], ['la tarjeta', ho('v-sup')], ['lo hundido', ho('v-sup2')]];
    const tintas = [['la tinta', 'v-tinta'], ['la tinta 2', 'v-tinta2'], ['el gris', 'v-tinta3'], ['el azul', 'v-marca'], ['el azul claro', 'v-marca2-txt'],
      ['el naranja', 'v-acento-txt'], ['el verde', 'v-ok-txt'], ['el rojo', 'v-mal-txt'], ['el petróleo', 'v-prof']];
    const malos = [];
    for (const [tq, tn] of tintas) for (const [fq, f] of fondos) { const r = ho(tn) && f ? ratio(ho(tn), f) : 0; if (r < 4.5) malos.push(tq + ' sobre ' + fq + ' ' + r.toFixed(2)); }
    for (const m of auto.slice(1)) { const c = (m.match(/--v-cat:(#[0-9a-fA-F]{6})/) || [])[1], su = (m.match(/--v-cat-suave:(#[0-9a-fA-F]{6})/) || [])[1], fo = (m.match(/--v-cat-fondo:(#[0-9a-fA-F]{6})/) || [])[1];
      if (c) for (const f of [ho('v-sup'), su]) if (ratio(c, f) < 4.5) malos.push('categoría ' + c + ' sobre ' + f);
      if (fo && ratio('#FFFFFF', fo) < 4.5) malos.push('blanco sobre ' + fo); }
    for (const n of ['v-marca-fondo', 'v-acento-fondo', 'v-ok-fondo', 'v-prof-fondo', 'v-cat-fondo']) if (ratio('#FFFFFF', ho(n) || '#FFFFFF') < 4.5) malos.push('blanco sobre --' + n);
    ok(malos.length === 0, 'Modo oscuro: toda la letra se lee (4,5:1 o más)' + (malos.length ? ' — ' + malos.join('; ') : ''));
    ok(/function ponApariencia\(v\)/.test(APP) && /if\(!appSola\(\)\)return;/.test(APP) && /'cb-apariencia'/.test(APP) && /LLAVES_MUDANZA=\[[^\]]*'cb-apariencia'/.test(APP),
      'El tema se elige en Logros, se guarda en el aparato, viaja con la mudanza y no toca el <html> de Jóvenes');
  }
  const blancoTenue = [...sinCom.matchAll(/(?<![-\w])color:rgba\(255,\s*255,\s*255,\s*(0?\.\d+)\)/g)].map(m => +m[1]).filter(a => a < .9);
  ok(blancoTenue.length === 0, 'Ninguna letra en blanco translucido por debajo de 90%' + (blancoTenue.length ? ' (' + blancoTenue.join(', ') + ')' : ''));
  ok(/(^|\})\s*::placeholder\{color:var\(--v-tinta2/.test(sinCom), 'Los placeholders no usan el gris del navegador (#757575)');
  ok(/\.op:disabled,\.vf button:disabled\{color:var\(--v-tinta2/.test(sinCom), 'Las opciones del examen entregado se leen (el navegador las deja al 30%)');
  /* v139: sticky en la barra del examen, no en el reloj (su fila media 45px). */
  { const CUERPO=fs.readFileSync(FUENTE('cuerpo.html'),'utf8');
    ok(/\.ex-barra\{position:sticky/.test(sinCom),'La barra del examen es la que se pega arriba');
    ok(!/#ex-curso \.timer\{[^}]*position:sticky/.test(sinCom),'El reloj no lleva sticky propio (dentro de su fila no se pega)');
    ok(/class="ex-barra"[\s\S]{0,600}id="reloj"[\s\S]{0,600}id="ex-resp"/.test(CUERPO),'El reloj y el avance van dentro de la barra');
    ok(!/getElementById\('ex-curso'\)\.style\.display='(block|none)'/.test(APP),
      'El examen se muestra y se esconde solo con exCurso(), que también pone el modo concentración'); }
  /* v139: leer la pregunta en voz alta (4 a 6 años casi no leen). */
  ok(/function partesPregunta\(/.test(APP)&&/data-leer'\)==='preg'\?partesPregunta\(base\)/.test(APP),
    'El botón de voz de una pregunta lee enunciado y opciones con su propio armado');
  ok(/data-leer="preg"/.test(APP)&&/const esMenor=\(\)=>\(CAT\(\)\.edad\|\|''\)==='4 a 6 años'/.test(APP),
    'Examen y Practicar marcan la pregunta para leer; la lectura sola es solo para 4 a 6 años');
  ok(/conLetra\?'Opción '/.test(APP),'La letra de la opción solo se dice donde se ve');
  /* v136: lo mismo en el encabezado de las tablas: gris sobre azul, 1,52.
     Cuenta la ultima regla que le pone color, que es la que gana. */
  const colTh = [...sinCom.matchAll(/\.info-table th\{[^}]*?(?<![-\w])color:([^;}]+)/g)].map(m => m[1]);
  ok(colTh.length > 0 && /^var\(--v-sobre/.test(colTh[colTh.length - 1]),
    'El encabezado de las tablas va en blanco sobre el azul, no en gris (' + colTh.join(' / ') + ')');
  /* v147: .divisor es el segundo nivel de título (gris, sin fondo). Si
     vuelve a tener fondo azul, vuelve el tercer nivel que gritaba. */
  ok(!/\.divisor\{[^}]*background:var\(--azul\)/.test(sinCom),
    'El título de sección .divisor no es un bloque azul');
}

ok(/font-size:16px/.test(coarse),
  'En pantallas que se tocan, los campos miden 16px');
ok(/\.rell input/.test(coarse) && /\.rec-in/.test(coarse),
  'Y eso incluye los huecos de completar y la tarjeta de recordar, que es donde mas dolia');
/* El viewport NO puede prohibir el zoom: ampliar es del usuario, y quien lee
   esto por encima del hombro de la nina puede tener 60 anos. */
ok(!/user-scalable\s*=\s*no|maximum-scale/.test(
     require('fs').readFileSync(FUENTE('build.js'),'utf8')),
  'El viewport no prohibe ampliar con los dedos');
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
const MATC=conReglas(require(path.join(RAIZ,'fuente','matutina.js')));
const CREC=conReglas(require(path.join(RAIZ,'fuente','creencias.js')));
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
/* v228: 600 px (Camilo: «muy angosto»), el mismo número en app.js (YO_ANCHO) y en el CSS. */
ok(/\.hoja-yo \.hoja-caja\{[^}]*width:600px/.test(ESCRITORIO)&&/const YO_ANCHO=600;/.test(APP),
  'En escritorio el panel de identidad mide 600px (YO_ANCHO), no el ancho de la pantalla');
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
/* El lector por vistas y su ancho se comprueban con el navegador integrado
   en Jóvenes/tests/estudio-navegacion.mjs, incluyendo móvil y escritorio. */
/* v131, REGLA PARA QUE NO VUELVA A PASAR: ningun ancho de pantalla puede
   esconder la forma de escuchar el capitulo. En v127 el reproductor quedo solo
   en el modo lectura, y una regla de v43 escondia el boton que lleva ahi desde
   1200 px: en el computador no habia audio del capitulo y ninguna prueba lo
   vio. Se revisa el CSS sin los bloques de impresion: si una regla pone
   display:none sobre el reproductor, su boton o «Leer sin distracciones», falla.
   Es una revision del CSS, no un render: el render se mira a 390, 1000, 1280
   y 1920 antes de publicar. */
{
  const sinPrint=CSS_SIN.replace(/@media print\{(?:[^{}]*\{[^}]*\})*[^{}]*\}/g,'');
  const tapan=[...sinPrint.matchAll(/([^{}]*\.(?:lect-full|lect-top|txt-rp|lec-rp|lec-play|lec-tira))\s*\{[^}]*display:\s*none/g)].map(m=>m[1].trim());
  ok(tapan.length===0,'Ningun ancho esconde el reproductor ni «Pantalla completa»'+
    (tapan.length?': '+tapan.join(' | '):''));
}
/* v131: la marca del que suena se decide por ELEMENTO. Un versiculo largo se
   parte en trozos que comparten el mismo <p>; con `k===i` el trozo siguiente
   le quitaba la marca y el versiculo sonaba sin marcarse. */
ok(!/classList\.toggle\('suena',VZ\.sonando&&k===i\)/.test(APP),
  'Ningun reproductor marca el que suena por numero de parte');
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
ok(/function pintaSenales\(\)/.test(js)&&/pintaSenales\(\);\s*pintaAvisoVer\(\);\s*if\(!quedarse\)\{/.test(js),
  'Las senales y el aviso se actualizan en cada navegacion, dentro de ir()');
/* v188: cada pestaña recuerda su altura y Estudiar su capítulo abierto. */
ok(/lugarDe\[antes\]=Math\.round\(window\.scrollY/.test(js)&&/const y=vuelve\?lugarDe\[id\]:0;/.test(js)&&/S\.ultItem=capAbierto/.test(js),
  'Volver a una pestaña regresa a donde se iba; ir a otra empieza arriba');

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

/* ── EL REVISOR DEL BANCO: LO ESTRUCTURAL ──
   Lo que se comprueba aqui es que el mecanismo quede en un solo lugar. El
   comportamiento (que retirar saque la pregunta del examen) lo prueba uso.js
   contra el JS real; esto caza lo otro: que nadie agregue un segundo camino al
   banco que se salte el filtro, y que la pantalla tenga su guarda. */
ok(/<div id="p-revisor" class="pantalla">/.test(CUERPO),
  'El revisor es una pantalla propia, como la ayuda');
ok(/id="cb-revisor"/.test(CUERPO), 'Con su contenedor, que llena pintaRevisor()');
ok(/if\(id==='revisor'\)pintaRevisor\(\);/.test(APP), 'Y ir() sabe llegar a ella');
ok(/if\(!esDir\(\)\)\{/.test(APP.slice(APP.indexOf('function pintaRevisor'),
  APP.indexOf('function revFila(q)'))),
  'pintaRevisor() tiene su propia guarda: sin sesion de director no pinta el banco');
ok(/onclick="abreRevisor\(\)"/.test(APP), 'Se entra desde el panel del director');
/* v238: esDir() es la única regla: la clave (rol director) o, dentro de Jóvenes, su sesión (director: true). */
ok(/function esDir\(\)\{return !!srvYo&&\(srvYo\.rol==='director'\|\|srvYo\.director===true\);\}/.test(APP) && !/srvYo\.rol!=='director'/.test(APP),
  'El panel, el revisor y el historial preguntan lo mismo: esDir() (la clave o la sesión de Jóvenes)');
ok(/o\.pant==='examen'&&\/\^\(director\|revisar\|pendientes\)\$\//.test(APP) && /if\(o\.director\|\|o\.revisar\)dirDesdeAfuera\(o\)/.test(APP),
  'Los caminos concursos/director y concursos/revisar/pendientes llevan al panel y al revisor');

/* EL FILTRO DE RETIRADAS EN UN SOLO SITIO. bancoDe() es el unico origen de
   preguntas de examen; si apareciera una segunda ruta a BANCO para armar, se
   podria colar una retirada sin que nadie lo note. */
ok(/estaRetirada\(q\)/.test(APP.slice(APP.indexOf('const bancoDe='),
  APP.indexOf('const modsDe='))),
  'bancoDe() filtra las retiradas, que es el unico punto por donde pasan los examenes');
ok((APP.match(/!estaRetirada\(/g)||[]).length===1,
  'Y ese filtro existe una sola vez en toda la app');
/* Las tarjetas tienen su propio embudo, tarjetasDe(), y su propio filtro. */
ok(/!estaRetiradaT\(t\)/.test(APP.slice(APP.indexOf('const tarjetasDe='),
  APP.indexOf('const buscaItem='))),
  'tarjetasDe() filtra las retiradas: es el unico embudo del mazo');
/* «Compruebalo» se escribe al generar el HTML, asi que lo retirado se quita al
   pintar el capitulo. Se enlaza por el texto del frente y no por la clave, para
   no escribir el mismo hash en build.js y en la app. */
ok(/limpiaRetiradasDe\(d\)/.test(APP), 'Y al pintar un capitulo se quita lo retirado de «Compruebalo»');

/* SIN SEÑAL NO SE DEVUELVEN SOLAS. Un servidor que no contesta (o una
   respuesta sin el campo) no puede volver a meter al examen una pregunta que
   el director retiro: es la misma regla de fallar cerrado que ya rige la
   practica. */
ok(/if\(Array\.isArray\(d\.retiradas\)\)/.test(APP),
  'Las retiradas solo se reemplazan si el servidor las mando');

/* La evaluacion usa las de SU receta y despues devuelve las del aparato. */
const bloqueHace=APP.slice(APP.indexOf('function haceEvaluacion'),
  APP.indexOf('/* ───────── manual dentro de la app'));
ok(/if\(Array\.isArray\(r\.retiradas\)\)retiradas=new Set\(r\.retiradas\)/.test(bloqueHace),
  'La evaluacion se arma con las retiradas de su receta');
ok(/retiradas=prev\.r;/.test(bloqueHace),
  'Y las devuelve como estaban, igual que el alcance y el nivel');

/* Los toques del revisor llegan a 44 px, que es el minimo de un dedo. */
ok(/\.rb-raz\{[^}]*min-height:var\(--v-toque/.test(CSS_SIN), 'Las razones rapidas miden 44 px de alto');
ok(/#cb-revisor \.btn[^{]*\{[^}]*min-height:var\(--v-toque/.test(CSS_SIN),
  'Y todo boton del revisor tambien');
/* LAS CLASES DEL REVISOR NO PUEDEN LLAMARSE COMO LAS DE «COMPRUEBALO».
   `.rev-q` y `.rev-a` ya existian para los bloques de respuesta tapada del
   material, y reusarlas pintaba cada pregunta del revisor como una tarjeta
   para revelar. Se vio en el navegador, no en las pruebas: por eso queda
   escrito aqui. */
ok(!/class="rev-(q|a)[" ]/.test(APP.slice(APP.indexOf('function revFila(q)'),
  APP.indexOf('function revCajaMotivo'))),
  'El revisor usa su propio prefijo de clases (rb-), no el de Compruebalo');

/* ── ABRIR UNA EVALUACION TIENE QUE VERSE ──
   Aterrizaba en `cb-panel`, el contenedor entero del panel, que empieza varias
   pantallas arriba: el scroll se iba al principio y el pulso de .destaca
   quedaba fuera de la vista. Desde el celular parecia que no habia pasado nada. */
ok(APP.indexOf("llevaA(d&&d.id?'ev-'+d.id:'cb-panel')")>=0,
  'Al abrir, el scroll aterriza en la evaluacion recien creada');
ok(APP.indexOf('id="ev-')>=0&&APP.indexOf('esc(ev.id)')>=0,
  'Y cada evaluacion en curso trae su id, o no habria a donde aterrizar');
ok(APP.indexOf('panReciente')>=0&&APP.indexOf('Abierta ahora')>=0,
  'La recien abierta se marca: el aterrizaje solo no dice que fue lo que paso');
ok(CSS.indexOf('.pan-nueva')>=0,'Y la marca tiene estilo propio');

/* ── LA LISTA DEL REVISOR SE ESCANEA ──
   Cuatro filas por pantalla a 390 px para revisar 528 tarjetas son 132
   pantallazos. La accion dejo de gastar un renglon entero por fila. */
ok(APP.indexOf('function rbCuerpo')>=0,'Las dos vistas del revisor comparten el cuerpo de la fila');
ok(CSS.indexOf('.rb-cuerpo')>=0&&CSS.indexOf('.rb-txt')>=0,'Con su estilo de texto y accion en linea');
ok(/\.rb-x\{[^}]*min-height:var\(--v-toque/.test(CSS),'El boton compacto sigue midiendo 44 px de alto');

/* ── EL TOQUE, UNA SOLA RESPUESTA ──
   Habia 26 reglas de :hover y 4 de :active, y las cuatro respondian distinto
   (translateY 1px, 1.5px, scale .995). En un celular no hay puntero: el estado
   que se ve al tocar era el que casi no estaba escrito. */
ok(/--v-toque:\s*44px/.test(CSS),'El area minima que se puede tocar es un token, no un numero suelto');
ok(/--v-hundir:/.test(CSS),'Y la respuesta al toque tambien');
ok(!/:active\{transform:translateY/.test(CSS),'Ninguna regla se inventa su propio hundido');
ok(/button:active:not\(:disabled\)/.test(CSS),'Todo boton responde al toque, no solo los que alguien recordo');
ok(/prefers-reduced-motion/.test(CSS),'Y quien pide menos movimiento lo recibe');
ok(/\.rb-txt\{[^}]*min-width:0/.test(CSS),'Y el texto puede encogerse, o un enunciado largo estira la fila');

/* ── PASO 2: LO QUE NO PUEDE VOLVER ──
   El desplegable de 85 opciones se fue; lo que queda tiene que seguir
   cumpliendo lo mismo que el cumplia. Estas pruebas son el recordatorio de por
   que se cambio, para que nadie lo reponga «para tenerlo todo junto». */
ok(!/id="pan-eval-al"/.test(APP),
  'El desplegable unico de 85 opciones ya no existe');
ok(/id="pan-act" onchange="cambiaActPanel\(\)"/.test(APP)&&
   /id="pan-mat" onchange="cambiaMaterialPanel\(\)"/.test(APP),
  'El material se escoge en dos pasos: actividad y despues material');
/* Escoger actividad marca SUS categorias. Sin eso, «solo la primera quincena»
   abierta sin marcar a nadie se la abre tambien a Conexion Biblica y a las
   creencias, que no tienen ese material: se quedan sin una sola pregunta. */
ok(/const suyas=act\?CATS_DE_ACT\(act\):\[\];/.test(APP),
  'Escoger actividad marca las categorias de esa actividad');

/* LA RECETA ESCRIBE EN LOS CONTROLES, no calcula el alcance por su cuenta: un
   segundo camino a `alcance` seria un segundo formato que mantener, y el
   servidor solo entiende uno. */
const bloqueReceta=APP.slice(APP.indexOf('function ponReceta(id)'),APP.indexOf('function panAbre'));
ok(/a\.value=r\.act;cambiaActPanel\(\)/.test(bloqueReceta)&&/m\.value=r\.mat/.test(bloqueReceta),
  'Una receta escribe en los mismos controles que abren la evaluacion');
ok(!/alcance:/.test(bloqueReceta),
  'Y no arma un alcance propio: eso lo sigue haciendo alcancePanel()');
ok(/alcance:alcancePanel\(\)/.test(APP),
  'abreEvaluacion() sigue leyendo el alcance de un solo sitio');

/* TODO LO QUE CONFIGURA UNA EVALUACION SIGUE LLEGANDO. Los cajones esconden
   controles, no los quitan: si uno se perdiera, el servidor recibiria el valor
   por omision y el director abriria otra cosa distinta de la que pidio. */
for(const id of ['pan-eval-t','pan-eval-n','pan-eval-nv','pan-fuente','pan-r1','pan-r2','pan-cap','pan-personas'])
  ok(APP.includes('id="'+id+'"'), 'Sigue existiendo el control '+id);
ok(/class="pan-cat-ch"/.test(APP), 'Y las casillas de categoria');

/* Los avisos que impiden abrir una evaluacion vacia NO pueden quedar dentro de
   un cajon plegable: esconderlos los vuelve inutiles. */
const bloqueP2=APP.slice(APP.indexOf("id=\"pan-paso2\""),APP.indexOf("id=\"g-material\""));
ok(/id="pan-aviso-cats"/.test(bloqueP2)&&/id="pan-nota-al"/.test(bloqueP2),
  'Los dos avisos del material viven fuera de los cajones, siempre a la vista');

/* ── EL HISTORIAL: LO ESTRUCTURAL ── */
ok(/<div id="p-historial" class="pantalla">/.test(CUERPO),
  'El historial es una pantalla propia, como el revisor');
ok(/id="cb-historial"/.test(CUERPO), 'Con su contenedor, que llena pintaHistorial()');
ok(/if\(id==='historial'\)pintaHistorial\(\);/.test(APP), 'Y ir() sabe llegar a el');
ok(/onclick="abreHistorial\(\)"/.test(APP), 'Se entra desde el panel del director');
ok(/if\(!esDir\(\)\)\{/.test(APP.slice(APP.indexOf('function pintaHistorial'),
  APP.indexOf('function hisResumen'))),
  'pintaHistorial() tiene su propia guarda: sin sesion de director no muestra notas');
/* El detalle de una evaluacion se pinta con la MISMA funcion que el panel usa
   para la que esta en curso. Dos formatos para la misma tabla se separan al
   primer cambio. */
ok(/cuerpoResultado\(hisDetalle\[ev\.id\]\)/.test(APP),
  'El detalle del historial reusa cuerpoResultado(), el del panel');
ok(/verRevision\(/.test(APP.slice(APP.indexOf('function hisListaPersonas'))),
  'Y la revision pregunta por pregunta es la misma de siempre');

/* ─── el contenido tambien es parte de la suite ───
   Las pruebas de arriba comprueban que la maquinaria funciona; esta exige que
   las preguntas digan la verdad. tools/preguntas-vs-biblia.js contrasta los
   seis bancos y las tarjetas contra el texto biblico que la app ya trae, y
   sale con 1 si encuentra algo duro. Se corre desde aqui para que no dependa
   de que alguien se acuerde de correrlo a mano antes de publicar. */
{
  let salida = 0, texto = '';
  try {
    texto = execFileSync(process.execPath, [path.join(RAIZ, 'tools', 'preguntas-vs-biblia.js')],
      { encoding: 'utf8' });
  } catch (e) { salida = e.status || 1; texto = String(e.stdout || ''); }
  const duro = (texto.match(/DURO[^(]*\((\d+)\)/) || [])[1];
  const rev  = (texto.match(/REVISAR[^(]*\((\d+)\)/) || [])[1];
  ok(salida === 0,
    'El banco de preguntas no tiene ningun hallazgo duro contra la Biblia (' +
    (duro === undefined ? 'no se pudo correr el verificador' : duro + ' duros, ' + rev + ' para revisar') + ')');
  if (salida !== 0) console.log(texto.split('\n').filter(l => /^  ·|^      /.test(l)).slice(0, 12).join('\n'));
}
/* Que el verificador corra no quiere decir que haya verificado. Desde que el
   repo se movio, contrasto CERO preguntas de Profetas y Reyes y la suite
   seguia en verde. No se falla (sin el libro en el aparato no hay como), pero
   se dice en voz alta, con la razon, para que no pase otra vez sin verse. */
{
  let t2='';
  try{ t2=execFileSync(process.execPath,[path.join(RAIZ,'tools','preguntas-vs-biblia.js')],{encoding:'utf8'}); }
  catch(e){ t2=String(e.stdout||''); }
  const n=Number((t2.match(/(\d+) de Profetas y Reyes se contrastaron/)||[])[1]||0);
  const porque=(t2.match(/NO SE VERIFICO P&R: ([^\n]*)/)||[])[1];
  if(n===0) console.log('⚠️  AVISO: 0 preguntas de Profetas y Reyes se contrastaron contra el libro'+
    (porque?' — '+porque:'')+'. Corre con CB_PR_TEXTO=<texto del libro> para verificarlas.');
  else ok(true,'Profetas y Reyes contrastado contra el libro ('+n+' preguntas)');
}


/* v146: sistema de diseño. Cada tamaño de letra y cada redondeo sale de la
   escala; ningún control usa emoji como icono. Si alguien mete un valor suelto,
   falla aquí en vez de verse raro en un teléfono. */
{
  const css=fs.readFileSync(FUENTE('estilos.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  const ESC=new Set(['.75rem','.875rem','1rem','1.125rem','1.375rem','1.75rem','2.25rem','3rem','16px','inherit','1em','100%','0']);
  const fsSuelto=[...css.matchAll(/font-size:\s*([^;}!]+)/g)].map(m=>m[1].trim())
    .filter(v=>!ESC.has(v)&&!/^var\(--v-t/.test(v)&&!/^[\d.]+em$/.test(v)&&!/^calc\(.*var\(--/.test(v));
  ok(fsSuelto.length===0,'Letra: todo tamaño sale de la escala'+(fsSuelto.length?' (sueltos: '+[...new Set(fsSuelto)].slice(0,8).join(', ')+')':''));
  const RAD=/^(0|8px|12px|18px|999px|50%|var\(--[\w-]+(,[^)]*)?\))$/;
  const radSuelto=[...css.matchAll(/border-radius:\s*([^;}!]+)/g)].map(m=>m[1].trim())
    .filter(v=>!v.replace(/,\s+/g,',').split(/\s+/).every(x=>RAD.test(x)||/^[\d.]+em$/.test(x)||x==='3px'||x==='inherit'));
  ok(radSuelto.length===0,'Redondeo: solo 8, 12, 18 px y pastilla'+(radSuelto.length?' (sueltos: '+[...new Set(radSuelto)].slice(0,8).join(', ')+')':''));
  const app=APP, cuerpo=fs.readFileSync(FUENTE('cuerpo.html'),'utf8');
  const EMO=/[\u{1F300}-\u{1FAFF}☀-➿⏸-⏺↺]/u;
  const ctrl=[...(app+cuerpo).matchAll(/<button\b[^>]*>([^<]*)/g)].map(m=>m[1]).filter(t=>EMO.test(t));
  ok(ctrl.length===0,'Ningún botón usa emoji como icono'+(ctrl.length?' ('+ctrl.slice(0,6).join(' | ')+')':''));
}

/* v148: la celebración no suena (decisión de Camilo, 30-sep) y respeta
   «reducir movimiento». */
{
  const f=APP.slice(APP.indexOf('function festeja('),APP.indexOf('function festPaso('));
  ok(f.length>0&&!/new Audio|AudioContext|\.play\(/.test(f),'La celebración no usa sonido');
  ok(/prefers-reduced-motion: reduce/.test(f),'La celebración respeta «reducir movimiento»');
  ok(/if\(pct>=75\)festeja\(/.test(APP),'Aprobar el examen (75 % o más) se celebra');
}
/* v155: con Daniel en dos columnas, la cita del estudio va al versículo en la
   columna del texto en vez de repetirlo en el panel. */
ok(/function verVers\([^)]*\)\{\s*if\(saltaAlTexto\(/.test(APP)&&/data-cid="'\+cid\+'"/.test(APP),
  'verVers intenta primero ir al versículo que ya está en pantalla');
/* ───────── v163: LA FICHA DEL CAMPAMENTO ─────────
   El reglamento vivía en tres sitios (categorías, actividades y una marca en
   cada capítulo). Ahora sale de fuente/campamentos.js. Estas pruebas fijan
   tres cosas: que el reglamento vigente es el mismo de antes, que una ficha
   mal escrita no pasa, y que agregar un campamento o un tema es agregar
   datos y no tocar la app. */
{
  const F=require(path.join(RAIZ,'fuente','campamentos.js'));
  const lee=f=>fs.readFileSync(path.join(RAIZ,'fuente',f),'utf8');
  const sinComentarios=t=>t.replace(/\/\*[\s\S]*?\*\//g,'');
  ok(!/const (CATS|ACTIVIDADES)=\{/.test(lee('app.js'))&&
     ['contenido.js','modulos.js','matutina.js','creencias.js'].every(f=>!/\bcats\s*:/.test(sinComentarios(lee(f)))),
    'El reglamento tiene una sola fuente: ni app.js ni el contenido lo repiten');
  ok(/'cats' in x \|\| 'extra' in x/.test(lee('build.js')),
    'El build se niega a armar si el contenido vuelve a traer su propia marca');

  /* El reglamento vigente, categoría por categoría. Cambiar una ficha a
     propósito obliga a cambiar esta tabla: es el contrato con los clubes. */
  const APOC=conReglas(require(path.join(RAIZ,'fuente','apocalipsis.js')));
  const CAPS_V=[...CAPS,...MATU.MAT_CAPS,...CREC.CR_CAPS,...APOC.AP_CAPS], MODS_V=[...MODULOS,...MATU.MAT_MODULOS,...CREC.CR_MODULOS];
  const ve=k=>[CAPS_V,MODS_V].map(l=>l.filter(c=>c.cats.includes(k)).map(c=>c.id).join(' ')).join(' | ');
  const solo=k=>CAPS_V.filter(c=>(c.extra||[]).includes(k)).map(c=>c.id).join(' ');
  const R=(a,b,p)=>Array.from({length:b-a+1},(_,i)=>p+String(a+i).padStart(2,'0')).join(' ');
  const RAV='m-linea m-personajes m-numeros m-trampas m-versiculos m-lugares m-version m-prioridades m-palabras';
  const VIGENTE={
    me:['d1 d2 d3 d6 | m-personajes m-numeros m-versiculos m-lugares m-palabras','',10,1],
    av:['d1 d2 d3 d6 pr39 pr41 pr44 | '+RAV,'pr39 pr41 pr44',30,3],
    pa:['d1 d2 d3 d6 pr39 pr41 pr44 | '+RAV,'',35,3],
    gm:['d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 pr39 pr40 pr41 pr42 pr43 pr44 | m-linea m-personajes m-numeros m-trampas m-versiculos m-reyes m-profetico m-lugares m-version m-prioridades m-palabras',
        'd7 d8 d9 d10 d11 d12',25,3],
    dm1:[R(1,15,'m')+' | mm-quien mm-versiculos mm-plan','',10,1],
    dm2:[R(1,31,'m')+' | mm-quien mm-versiculos mm-plan','m31',15,2],
    ec1:[R(1,28,'cr')+' | mc-doctrinas mc-lista','',25,3],
    ec2:[R(1,28,'cr')+' | mc-doctrinas mc-lista','',15,2],
    /* v236: la política Conexión Bíblica 2027 (Asociación del Alto Magdalena): tres
       categorías, cada una con sus capítulos de Apocalipsis. */
    apgm:[Array.from({length:22},(_,i)=>'ap'+(i+1)).join(' ')+' | ','',35,3],
    apcq:[[1,2,3,4,5,10,11,12,13,14,19,20,21,22].map(n=>'ap'+n).join(' ')+' | ','',30,2],
    apav:[[1,12,14,21,22].map(n=>'ap'+n).join(' ')+' | ','',30,3],
    /* v237 (Camilo, 16-oct): vuelven Menores y Padres, dentro de Aventureros y con su alcance. */
    apme:[[1,12,14,21,22].map(n=>'ap'+n).join(' ')+' | ','',10,1],
    appa:[[1,12,14,21,22].map(n=>'ap'+n).join(' ')+' | ','',35,3],
  };
  const C=REGLAMENTO.CATS;
  const distintas=Object.keys(VIGENTE).filter(k=>!C[k]||ve(k)!==VIGENTE[k][0]||solo(k)!==VIGENTE[k][1]||C[k].n!==VIGENTE[k][2]||C[k].techo!==VIGENTE[k][3]);
  ok(Object.keys(C).join()===Object.keys(VIGENTE).join()&&!distintas.length,
    'El reglamento vigente no cambió (salvo la política 2027 de Apocalipsis): las 11 categorías ven lo mismo, con el mismo examen y el mismo techo'+(distintas.length?' (distintas: '+distintas.join(', ')+')':''));
  /* v164: Guías Mayores tiene su ficha (cbg). Su categoría conserva el id. */
  const AC=REGLAMENTO.ACTIVIDADES;
  ok(Object.keys(AC).join()==='cb,cbg,dm,ec,ap,apc,apa'&&AC.ap.cats.join()==='apgm'&&AC.apc.cats.join()==='apcq'&&AC.apa.cats.join()==='apav,apme,appa'&&AC.cb.cats.join()==='me,av,pa'&&AC.cbg.cats.join()==='gm'&&C.gm.act==='cbg',
    'Las actividades son cb, cbg, dm, ec, ap, apc y apa; Guías Mayores va en la suya y conserva su categoría gm');
  ok(C.me.club==='aventureros'&&C.pa.club==='aventureros'&&C.gm.club==='guias'&&C.apcq.club==='conquistadores'&&C.apgm.club==='guias'&&C.ec1.club==='',
    'v191: cada categoría de club dice su club (Aventureros, Conquistadores, Guías Mayores)');
  ok(AC.cb.tipo==='libro'&&AC.cbg.tipo==='libro'&&AC.dm.tipo==='dias'&&AC.ec.tipo==='creencias'&&AC.cbg.tema===AC.cb.tema,
    'Cada actividad sabe de qué tipo es su material: dos campamentos del mismo libro, un devocional por días y las creencias');
  const APP_F=lee('app.js');
  ok(!/ACT_DE\(S\.cat\)==='|act==='(cb|dm|ec)'/.test(APP_F)&&!/(capsExaminables|capsDeActividad|CATS_DE_ACT)\('(cb|dm|ec)'\)/.test(APP_F),
    'La app no se porta distinto por actividad ni por club: pregunta por el tipo de material');

  /* El servidor todavía tiene su propia lista de categorías: mientras exista,
     tiene que ser la misma. */
  const SRV=fs.readFileSync(path.join(RAIZ,'functions','api','[[ruta]].js'),'utf8');
  const validas=(/const CATS_VALIDAS = \[([^\]]*)\]/.exec(SRV)||[])[1]||'';
  ok(validas.replace(/['\s]/g,'')===Object.keys(C).join(','),
    'Las categorías que acepta el servidor son las de las fichas, en el mismo orden');

  /* Una ficha mal escrita no pasa. */
  const TEMAS_P={daniel:[...CAPS,...MODULOS.filter(x=>!x.prof)].map(x=>x.id),matutina:[...MATU.MAT_CAPS,...MATU.MAT_MODULOS].map(x=>x.id),
    creencias:[...CREC.CR_CAPS,...CREC.CR_MODULOS].map(x=>x.id),
    apocalipsis:require(path.join(RAIZ,'fuente','apocalipsis.js')).AP_CAPS.map(x=>x.id),
    conflicto:require(path.join(RAIZ,'fuente','conflicto.js')).CS_TEMA_CAPS.map(x=>x.id)};
  ok(F.revisa(F.CAMPAMENTOS,TEMAS_P).length===0&&F.sinUsar(F.CAMPAMENTOS,TEMAS_P).length===0,
    'Las fichas vigentes cuadran con el contenido y no dejan ningún capítulo sin dueño');
  const cat=(o)=>Object.assign({id:'cq1',nombre:'Conquistadores',edad:'10 a 15 años',n:20,techo:2,sinCompletar:false,
    alcance:'Daniel 1 al 6',estudia:['d1','d2','d3','d4','d5','d6']},o);
  const ficha=(c,o)=>Object.assign({id:'cq',tema:'daniel',nombre:'Campamento de Conquistadores',icono:'🏕️',cuando:'Por confirmar',fecha:'',
    que:'El libro de Daniel',categorias:[c]},o);
  const falla=(f,re)=>F.revisa([...F.CAMPAMENTOS,f],TEMAS_P).some(m=>re.test(m));
  ok(falla(ficha(cat({estudia:['d1','d99']})),/d99/)&&falla(ficha(cat({estudia:['d1','cr01']})),/cr01/)&&
     falla(ficha(cat({id:'av'})),/av/)&&falla(ficha(cat({soloEstudio:['d7']})),/d7/)&&
     falla(ficha(cat({techo:4})),/techo/)&&falla(ficha(cat(),{tema:'apocalipsis'}),/apocalipsis/)&&
     falla(ficha(cat(),{id:'cb'}),/cb/),
    'revisa() rechaza un capítulo que no existe, uno de otro tema, una categoría repetida, un solo-estudio que no se estudia, un techo imposible, un tema que no existe y una ficha repetida');

  /* v165: la fecha, el tiempo por pregunta y la rampa de los adultos salen de
     la ficha. Eran tres tablas más en app.js, escritas por categoría. */
  ok(['cb','dm','ec'].every(a=>AC[a].fecha==='2026-10-10'&&AC[a].cuando==='10 de octubre')&&AC.cbg.fecha==='',
    'Cada ficha trae su fecha: los tres concursos de Aventureros el 10 de octubre de 2026, y Guías Mayores sin fecha');
  ok(!/Tres tarjetas|el 9 de octubre/.test(lee('manual.js')),
    'El manual no cuenta las actividades ni afirma una fecha: las dos cosas salen de las fichas');
  ok(C.me.seg===100&&C.apme.seg===100&&C.av.seg===80&&C.apav.seg===80&&C.apcq.seg===80&&['pa','gm','dm1','dm2','ec1','ec2','apgm','appa'].every(k=>C[k].seg===72)&&
     C.pa.rampa===false&&C.apgm.rampa===false&&C.appa.rampa===false&&Object.keys(C).filter(k=>!['pa','apgm','appa'].includes(k)).every(k=>C[k].rampa===true),
    'El tiempo por pregunta y la rampa son los de antes: 100 s Menores, 80 s Aventureros, 72 s los demás, y solo Padres entra sin rampa');
  ok(!/FECHA_META/.test(lee('app.js'))&&!/S\.cat==='(me|av|pa|gm|dm1|dm2|ec1|ec2)'/.test(lee('app.js')),
    'app.js no tiene fechas ni reglas escritas por categoría');
  ok(falla(ficha(cat(),{fecha:'9 de octubre'}),/fecha/)&&falla(ficha(cat(),{fecha:'2026-13-40'}),/fecha/)&&falla(ficha(cat({segundos:5})),/tiempo/)&&
     F.revisa([...F.CAMPAMENTOS,ficha(cat(),{fecha:'2027-03-27'})],TEMAS_P).length===0,
    'revisa() rechaza una fecha mal escrita y un tiempo imposible, y acepta una fecha buena');
  /* Otro club con el mismo tema: una ficha más y nada de contenido nuevo. */
  const con=F.deriva([...F.CAMPAMENTOS,ficha(cat())]);
  const idsCq=cat().estudia;
  const BANCO_D=[...BANCO,...require(path.join(RAIZ,'fuente','preguntas-cobertura.js')).BANCO_COBERTURA];
  const {nivelDe}=require(path.join(RAIZ,'fuente','niveles.js'));
  const pool=BANCO_D.filter(q=>idsCq.includes(q.cap)&&nivelDe(q)<=2).length;
  ok(F.revisa([...F.CAMPAMENTOS,ficha(cat())],TEMAS_P).length===0&&con.ACTIVIDADES.cq.cats.join()==='cq1'&&
     con.CATS.cq1.act==='cq'&&con.ACTIVIDADES.cq.tipo==='libro'&&con.catsDe('d4').join()==='gm,cq1'&&con.catsDe('d1').join()==='me,av,pa,gm,cq1'&&
     JSON.stringify(con.CATS.av)===JSON.stringify(C.av)&&pool>cat().n*5,
    'Un campamento de Conquistadores con Daniel es una ficha más: sin escribir contenido ya tiene '+pool+' preguntas hasta nivel 2, y no mueve a las demás categorías');

  /* Un tema nuevo: su contenido, su entrada en TEMAS y su ficha. */
  const TEMAS_AP=Object.assign({},TEMAS_P,{apocalipsis:Array.from({length:22},(_,i)=>'ap'+(i+1))});
  const fAp=ficha(cat({id:'ap1c',alcance:'Apocalipsis 1 al 3',estudia:['ap1','ap2','ap3']}),{id:'ap27',tema:'apocalipsis',que:'El libro de Apocalipsis'});
  const TIPOS_AP=Object.assign({},F.TEMAS,{apocalipsis:{tipo:'libro'}});
  /* v178: Apocalipsis ya es un tema de verdad (ficha «ap»); el de prueba no
     puede quedar «sin tipo», así que se le quita el suyo para probar eso. */
  const SIN_AP=Object.assign({},F.TEMAS); delete SIN_AP.apocalipsis;
  const conAp=F.deriva([...F.CAMPAMENTOS,fAp],TIPOS_AP);
  ok(F.revisa([...F.CAMPAMENTOS,fAp],TEMAS_AP,TIPOS_AP).length===0&&conAp.catsDe('ap2').join()==='apgm,apcq,ap1c'&&
     conAp.ACTIVIDADES.ap27.tipo==='libro'&&JSON.stringify(conAp.CATS.gm)===JSON.stringify(C.gm)&&
     F.revisa([...F.CAMPAMENTOS.filter(f=>f.id!=='ap'),fAp],TEMAS_AP,SIN_AP).some(m=>/sin tipo/.test(m))&&
     F.revisa([...F.CAMPAMENTOS,ficha(cat({estudia:['ap1']}))],TEMAS_AP,TIPOS_AP).some(m=>/ap1/.test(m)),
    'Un tema nuevo entra con su tipo y su ficha, se porta como libro, deja a Daniel disponible, y una ficha de Daniel no puede nombrar capítulos de Apocalipsis');

  /* ── v167: LAS FICHAS TAMBIÉN SE GUARDAN EN LA BASE ── */
  const B=F.CAMPAMENTOS, J=g=>F.junta(B,g,TEMAS_P);
  const copia=x=>JSON.parse(JSON.stringify(x));
  const cbMod=o=>{const f=copia(B.find(x=>x.id==='cb'));o(f);return f;};
  ok(JSON.stringify(J([]).fichas)===JSON.stringify(B)&&J([]).fuera.length===0&&
     JSON.stringify(J(undefined).fichas)===JSON.stringify(B)&&JSON.stringify(J('x').fichas)===JSON.stringify(B),
    'Sin fichas guardadas, juntar devuelve las de fábrica tal cual');
  { const g=cbMod(f=>{f.categorias[1].n=20;f.fecha='2027-10-09';f.cuando='9 de octubre';});
    const r=J([g]), d=F.deriva(r.fichas);
    ok(r.fuera.length===0&&r.fichas.length===B.length&&r.fichas[0].id==='cb'&&d.CATS.av.n===20&&d.ACTIVIDADES.cb.fecha==='2027-10-09'&&
       JSON.stringify(d.CATS.gm)===JSON.stringify(C.gm)&&JSON.stringify(d.CATS.me)===JSON.stringify(C.me),
      'Una guardada con el id de una de fábrica la reemplaza en su puesto y no mueve a las demás'); }
  { const r=J([ficha(cat())]), d=F.deriva(r.fichas);
    ok(r.fuera.length===0&&r.fichas.length===B.length+1&&r.fichas[B.length].id==='cq'&&d.catsDe('d4').join()==='gm,cq1'&&
       Object.keys(d.ACTIVIDADES).slice(0,B.length).join()===B.map(f=>f.id).join(),
      'Una guardada con id nuevo es un concurso más, al final, y las de fábrica conservan su orden'); }
  { const sinAv=cbMod(f=>{f.categorias=f.categorias.filter(c=>c.id!=='av');});
    const otroTema=cbMod(f=>{f.tema='creencias';});
    const r1=J([sinAv]), r2=J([otroTema]);
    ok(JSON.stringify(r1.fichas)===JSON.stringify(B)&&/av/.test(r1.fuera[0].por)&&
       JSON.stringify(r2.fichas)===JSON.stringify(B)&&/tema/.test(r2.fuera[0].por),
      'Una guardada no puede quitarle una categoría ni cambiarle el tema a una ficha que ya existe'); }
  { const malas=[null,7,'cb',[],{},{id:'cb'},{id:'x y'},ficha(cat({id:'av'})),ficha(cat({estudia:['d99']})),
      ficha(cat(),{nombre:'<img src=x onerror=alert(1)>'}),ficha(cat({nombre:'A" onclick="x'})),ficha(cat({alcance:"it's"})),
      ficha(cat({n:5000})),ficha(cat({soloEstudio:'d1'})),ficha(cat(),{nombre:'x'.repeat(61)}),ficha(cat(),{categorias:[null]}),
      ficha(cat(),{tema:'constructor'}),ficha(cat(),{tema:'__proto__'}),ficha(cat({sinRampa:'si'}))];
    let lanza=false, r; try{r=J(malas);}catch(e){lanza=true;}
    ok(!lanza&&JSON.stringify(r.fichas)===JSON.stringify(B)&&r.fuera.length===malas.length,
      'Datos dañados, un id repetido, un capítulo que no existe o un texto con signos de HTML: ninguna entra y juntar no lanza error ('+(r?r.fuera.length:'?')+' de '+malas.length+' fuera)');
    const mezcla=J([malas[9],ficha(cat()),malas[7]]);
    ok(mezcla.fichas.length===B.length+1&&mezcla.fuera.length===2,
      'Una ficha mala no tumba a las buenas que vienen con ella'); }
  ok(J(Array.from({length:80},(_,i)=>ficha(cat({id:'q'+i}),{id:'f'+i}))).fichas.length===B.length+60,
    'A lo sumo entran 60 fichas guardadas');
  { /* Lo que se sirve trae las de fábrica y las reglas, y deriva al abrir. */
    const enHtml=/const FICHAS_BASE = \[/.test(js)&&/const IDS_DE_TEMA = \{/.test(js)&&/const CAPS_BASE = \[/.test(js)&&/const MODULOS_BASE = \[/.test(js);
    const reglas=fs.readFileSync(path.join(RAIZ,'fuente','reglamento.js'),'utf8').replace(/\n+$/,'');
    ok(enHtml&&js.includes(reglas)&&!/^const (ACTIVIDADES|CATS|CAPS|MODULOS) = /m.test(js),
      'El index.html lleva las fichas de fábrica, los capítulos sin marca y reglamento.js tal cual; ya no trae el reglamento derivado');
    ok(!/\bcats\b/.test(JSON.stringify(JSON.parse((/const CAPS_BASE = (\[[\s\S]*?\n\]);/.exec(js)||[])[1]||'[]').map(c=>Object.keys(c)))),
      'Los capítulos que se sirven no dicen para quién son: eso sale de las fichas al abrir');
    const A=lee('app.js');
    ok(/REGLAS\.junta\(FICHAS_BASE,FICHAS_GUARDADAS,IDS_DE_TEMA\)/.test(A)&&/if\(Array\.isArray\(d\.fichas\)\)fichasLlegan\(d\.fichas\)/.test(A)&&
       /el\.hidden=!\(verNueva\|\|fichasNuevas&&pantallaAct!==['"]estudio['"]\)/.test(A),
      'La app junta las de fábrica con las guardadas, guarda las que llegan con /estado y avisa si cambiaron'); }
  { const SRV2=fs.readFileSync(path.join(RAIZ,'functions','api','[[ruta]].js'),'utf8');
    const M=fs.readFileSync(path.join(RAIZ,'migraciones','012_fichas.sql'),'utf8').replace(/^--.*$/gm,'');
    ok(/fichas: \(await reglamentoVigente\(env\)\)\.guardadas/.test(SRV2)&&/guardadas: leidas && vivas\.filter/.test(SRV2)&&/catch \(e\) \{ return undefined; \}/.test(SRV2)&&
       !/(UPDATE|DELETE FROM) ficha\b/i.test(SRV2)&&SRV2.split('INSERT INTO ficha ').length===3,
      'El servidor entrega las fichas guardadas con /estado, calla el campo si la base falla, y la tabla solo crece: dos INSERT (guardar, y retirar o restaurar) y ningún UPDATE ni DELETE');
    ok(/CREATE TABLE IF NOT EXISTS ficha/.test(M)&&/AUTOINCREMENT/.test(M)&&/json_valid\(datos\)/.test(M)&&
       !/\b(DROP|ALTER|UPDATE|DELETE)\b/i.test(M),
      'La migración 012 solo agrega la tabla de fichas: no toca ninguna de las que existen'); }

  /* ── v169: LA LISTA DE CONCURSOS Y EL ENLACE A UN CONCURSO ── */
  { const SRV3=fs.readFileSync(path.join(RAIZ,'functions','api','[[ruta]].js'),'utf8');
    const GEN=fs.readFileSync(path.join(RAIZ,'fuente','servidor-reglamento.js'),'utf8');
    const reglas=fs.readFileSync(path.join(RAIZ,'fuente','reglamento.js'),'utf8');
    const cuerpoReglas=reglas.slice(0,reglas.lastIndexOf('if (typeof module'));
    ok(GEN.includes(cuerpoReglas)&&GEN.includes('export const FICHAS_BASE = '+JSON.stringify(F.CAMPAMENTOS,null,1)+';')&&
       GEN.includes('export const IDS_DE_TEMA = '+JSON.stringify(TEMAS_P,null,1)+';')&&/export \{ REGLAS \};\n$/.test(GEN)&&!/module\.exports/.test(GEN),
      'El reglamento del servidor es el mismo reglamento.js con las fichas de fábrica de hoy: no hay copia a mano');
    const pC=SRV3.indexOf("ruta === '/concursos'"), pG=SRV3.indexOf("ruta.startsWith('/panel/')");
    /* v172: el tramo es SOLO la ruta de la lista; antes llegaba hasta /entrar y medía también rutas que no son públicas. */
    const tramo=SRV3.slice(pC,SRV3.indexOf("ruta === '/reglamento'"));
    ok(pC>0&&pC<pG&&/reglamentoVigente\(env\)/.test(tramo)&&/completo/.test(tramo)&&!/estudia|soloEstudio|techo|participante|sesion/.test(tramo.replace(/\/\*[\s\S]*?\*\//g,'')),
      'La lista de concursos es pública, sale ya junta y revisada, y no entrega nada de personas');
    ok(/'access-control-allow-origin': '\*'/.test(tramo)&&SRV3.split("'access-control-allow-origin'").length===2&&!/sesionActual|leerCookie/.test(tramo),
      'Solo la lista de concursos se deja leer desde otra página, y esa ruta no mira la sesión');
    const A=lee('app.js'), HT=fs.readFileSync(path.join(RAIZ,'fuente','cuerpo.html'),'utf8');
    ok(/searchParams\.get\('concurso'\)/.test(A)&&/history\.replaceState/.test(A.slice(A.indexOf('function leeConcursoPedido'),A.indexOf('function hojaCategorias')))&&
       /\^\[a-z\]\[a-z0-9\]\{1,11\}\$/.test(A.slice(A.indexOf('function leeConcursoPedido'),A.indexOf('function hojaCategorias'))),
      'El enlace a un concurso se lee una vez, se quita de la dirección y solo acepta un id bien formado');
    ok(!/\d{1,2} de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/.test(HT.slice(HT.indexOf('id="p-bienvenida"'),HT.indexOf('id="bv-2"'))),
      'La bienvenida no promete una fecha: las fechas salen de cada ficha'); }

  /* ── v171: GUARDAR UNA FICHA ── */
  { const S4=fs.readFileSync(path.join(RAIZ,'functions','api','[[ruta]].js'),'utf8');
    const pS=S4.indexOf("ruta.startsWith('/servicio/')"), pF=S4.indexOf("ruta === '/servicio/ficha'"), pP=S4.indexOf("ruta.startsWith('/panel/')");
    const guarda=S4.slice(pS,pF), ruta=S4.slice(pF,S4.indexOf("return error('No existe.', 404)",pF));
    ok(pS>0&&pS<pF&&pF<pP&&/if \(!env\.CLAVE_SERVICIO\) return error\([^)]*503\)/.test(guarda)&&/igualSeguro\(dada, env\.CLAVE_SERVICIO\)/.test(guarda)&&
       /return error\('No autorizado\.', 401\)/.test(guarda)&&!/===\s*env\.CLAVE_SERVICIO|env\.CLAVE_SERVICIO\s*===/.test(S4),
      'Guardar una ficha pide el secreto del servicio antes de todo, lo compara sin filtrar por tiempo, y sin secreto configurado la puerta no existe');
    ok(/REGLAS\.forma\(b && b\.ficha\)/.test(ruta)&&/if \(!completo\) return error/.test(ruta)&&/REGLAS\.junta\(fichas, \[ficha\], IDS_DE_TEMA\)/.test(ruta)&&
       ruta.indexOf('REGLAS.junta')<ruta.indexOf('INSERT INTO ficha')&&/\.bind\(ficha\.id, datos, quien\)/.test(ruta),
      'Antes de guardar: solo los campos conocidos, contra el reglamento vigente completo, y los valores viajan por bind()');
    /* Las reglas, corridas de verdad contra la versión vigente y no la de fábrica. */
    const cq=F.forma(Object.assign(ficha(cat()),{basura:'x'})), cq2=JSON.parse(JSON.stringify(cq));
    const vig=F.junta(B,[cq],TEMAS_P).fichas;
    cq2.categorias=[Object.assign({},cq.categorias[0],{id:'cq9'})];
    ok(!('basura' in cq)&&F.forma(null)===null&&F.forma({id:'x'})===null&&F.junta(vig,[cq2],TEMAS_P).fuera.length===1&&
       F.junta(vig,[Object.assign({},cq,{nombre:'Otro nombre'})],TEMAS_P).fuera.length===0,
      'A un concurso guardado tampoco se le puede quitar una categoría después, y sí cambiarle el nombre');
    ok(/async function catsValidas\(env\)/.test(S4)&&/\[\.\.\.new Set\(\[\.\.\.CATS_VALIDAS, \.\.\.fichas\.flatMap/.test(S4),
      'Las categorías que acepta el servidor son las ocho de siempre más las de las fichas guardadas');
    const M13=fs.readFileSync(path.join(RAIZ,'migraciones','013_categorias_por_forma.sql'),'utf8').replace(/^--.*$/gm,'');
    ok(/PRAGMA defer_foreign_keys = true;/.test(M13)&&/INSERT INTO participante_013 \(id, nombre, categoria, codigo, creado_en, borrado_en\)\s+SELECT id, nombre, categoria, codigo, creado_en, borrado_en FROM participante;/.test(M13)&&
       /CREATE UNIQUE INDEX IF NOT EXISTS ix_part_codigo ON participante\(codigo\)/.test(M13)&&!/IN \('me'/.test(M13)&&!/foreign_keys = OFF/.test(M13),
      'La migración 013 copia las seis columnas tal cual, conserva el índice del código y ya no enumera categorías');
    const GEN4=fs.readFileSync(path.join(RAIZ,'fuente','servidor-reglamento.js'),'utf8');
    const cat4=JSON.parse((/export const CATALOGO = (\{[\s\S]*?\n\});/.exec(GEN4)||[])[1]||'{}');
    const d1=((cat4.daniel||{}).caps||[]).find(c=>c.id==='d1')||{n:[]};
    ok(Object.keys(cat4).join()==='daniel,matutina,creencias,apocalipsis,conflicto'&&cat4.apocalipsis.caps.length===22&&cat4.conflicto.caps.length===20&&cat4.daniel.caps.length===18&&cat4.matutina.caps.length===31&&cat4.creencias.caps.length===28&&
       d1.n.length===3&&d1.n.reduce((a,b)=>a+b,0)===[...BANCO,...require(path.join(RAIZ,'fuente','preguntas-cobertura.js')).BANCO_COBERTURA,...require(path.join(RAIZ,'fuente','examenes-reales.js')).BANCO_REAL,...require(path.join(RAIZ,'fuente','complementos','daniel.js')).preguntas].filter(q=>q.cap==='d1').length&&
       cat4.daniel.repasos.some(r=>r.id==='m-linea'),
      'El catálogo trae los cinco temas con sus capítulos, sus repasos y cuántas preguntas hay por nivel (Daniel 1: '+d1.n.join(', ')+')'); }

  /* ── v172: RETIRAR UN CONCURSO ── */
  { const S5=fs.readFileSync(path.join(RAIZ,'functions','api','[[ruta]].js'),'utf8');
    const pS=S5.indexOf("ruta.startsWith('/servicio/')"), pR=S5.indexOf("ruta === '/servicio/retirar'");
    const ruta=S5.slice(pR,S5.indexOf("return error('No existe.', 404)",pR));
    const vig=S5.slice(S5.indexOf('async function reglamentoVigente'),S5.indexOf('const clavesRetiradas'));
    ok(pR>pS&&pS>0&&/const vivas = \(leidas \|\| \[\]\)\.filter\(f => f\.retirado !== true\);/.test(vig)&&/REGLAS\.junta\(FICHAS_BASE, vivas, IDS_DE_TEMA\)/.test(vig)&&
       /guardadas: leidas && vivas\.filter/.test(vig),
      'Un concurso retirado se aparta antes de juntar: no llega a la app, a la lista pública ni a las categorías válidas, y la ruta va detrás del secreto');
    ok(/if \(!completo\) return error/.test(ruta)&&/FICHAS_BASE\.some\(f => f\.id === fid\)\) return error\([^)]*422/.test(ruta)&&
       /FROM participante WHERE borrado_en IS NULL AND categoria IN/.test(ruta)&&/if \(n > 0\) return error\([^;]*409/.test(ruta)&&
       ruta.indexOf('FROM participante')<ruta.indexOf('INSERT INTO ficha')&&/\.bind\(fid, datos, quien\)/.test(ruta)&&/\.bind\(\.\.\.cats\)/.test(ruta),
      'No se retira uno que viene con la app ni uno con personas inscritas, y se mira antes de guardar');
    ok(/const ficha = REGLAS\.forma\(quitada\);/.test(ruta)&&/REGLAS\.junta\(fichas, \[ficha\], IDS_DE_TEMA\)/.test(ruta)&&/return json\(\{ ok: true, id: fid, retirado: retirar, ya: true \}\)/.test(ruta),
      'Restaurar revisa la ficha contra el reglamento de ese momento, y pedir lo que ya está hecho no guarda otra fila');
    /* La marca no entra por la puerta de editar: forma() no la deja pasar. */
    const conMarca=F.forma(Object.assign(ficha(cat()),{retirado:true}));
    ok(conMarca&&!('retirado' in conMarca),'Editar un concurso no lo puede retirar: la forma de una ficha no lleva esa marca'); }
}

/* v173 (12-oct): EL EXAMEN REAL DE «EN ESTO CREEMOS» Y LAS INTRODUCCIONES.
   El 10-oct el club ganó con 25 de 26; la que se falló («la doctrina de Dios
   también es conocida como… teología propia») salía de la introducción de la
   doctrina, que la app no mostraba ni preguntaba. Regla de Camilo: todo lo que
   se pide estudiar es susceptible de ser preguntado. */
{ const CRx=require(path.join(RAIZ,'fuente','creencias.js'));
  const q=CRx.CR_BANCO.find(x=>/doctrina de Dios también es conocida como/.test(x.q||''));
  ok(q&&q.cap==='cr01'&&q.o[q.a]==='Teología propia.'&&!q.f,'La pregunta que se falló en el examen real está, con su respuesta, y entra al examen');
  const abre=CRx.DOCTRINAS.map(d=>'cr'+String(d.desde).padStart(2,'0'));
  ok(abre.every(k=>CRx.CR_CONTENIDO[k].some(s=>/La doctrina/.test(s.t)&&s.capa==='nucleo'&&s.h.length>200)),
    'Cada doctrina muestra su introducción en la creencia con que abre, como material de estudio');
  const examen=['Teología propia.','Para su gloria.','Justificación, santificación y glorificación.','Nehemías 9:6.',
    'Efesios 6:12-18.','Apocalipsis 19:10.','Un estado de inconsciencia.','La fase final de su ministerio: el juicio investigador.'];
  ok(examen.every(r=>CRx.CR_BANCO.some(x=>x.t==='mc'&&x.o[x.a]===r)),'Las preguntas del examen real están en el banco con la respuesta del jurado');
  /* Con la cartilla impresa en la mano (12-oct): la creencia 10 estaba mal
     transcrita y las introducciones iban incompletas. */
  const d10=CRx.CR_CONTENIDO.cr10[0].h;
  ok(/renueva nuestras mentes, graba su ley en nuestros corazones/.test(d10)&&!/graba su ley en nuestras mentes/.test(d10),
    'La creencia 10 dice lo que dice la cartilla impresa: «renueva nuestras mentes, graba su ley en nuestros corazones»');
  const intro2=CRx.CR_CONTENIDO.cr06.find(s=>/La doctrina/.test(s.t)).h;
  ok(/mayordomo de la creación/.test(intro2)&&/compuesta por dos creencias/.test(intro2),'Las introducciones van completas (la 2 trae «mayordomo de la creación»)');
  ok(CRx.CR_TARJETAS.some(x=>/Teología propia/i.test(x.r))&&CRx.CR_TARJETAS.some(x=>/mayordomo de la creación/.test(x.r)),
    'Lo de las introducciones también se practica en tarjetas');
  const md=(CRx.CR_CONT_MODULOS['mc-doctrinas']||[]).filter(s=>/Cómo abre la doctrina/.test(s.t));
  ok(md.length===6&&md.every((s,i)=>s.h.includes('Doctrina '+(i+1)+' de 6')),'El repaso de las 6 doctrinas trae las seis introducciones');
}

/* v176: los exámenes reales de Daniel. Cada pregunta de Daniel trae el
   versículo y un trozo literal que tiene que estar en RV1995; la clave es la
   del jurado. Las de Profetas y Reyes se cotejaron con el libro en el Mac. */
{
  const R=require(path.join(RAIZ,'fuente','examenes-reales.js'));
  const {VERS:VV}=require(path.join(RAIZ,'fuente','biblia.js'));
  const CONT=JSON.stringify(CONTENIDO);
  const pa=R.EXAMENES_REALES.pa26.preguntas, av=R.EXAMENES_REALES.av26.preguntas;
  ok(pa.length===35&&av.length===30&&pa.every((q,i)=>q.n===i+1)&&av.every((q,i)=>q.n===i+1),
    'Los exámenes reales de Daniel están completos y en orden (35 de Adultos, 30 de 7 a 9)');
  const malas=[...pa,...av].filter(q=>{
    if(q.pr)return !/^pr\d\d$/.test(q.cap);
    const [c,v]=(q.ref||'').split(':');
    return !(q.cap==='d'+c&&VV[q.cap]&&String(VV[q.cap][v]||'').includes(q.lit));
  });
  ok(!malas.length,'Cada respuesta de Daniel está literal en el versículo que cita'+(malas.length?' — '+malas.map(q=>q.n+' '+q.q.slice(0,30)).join(' / '):''));
  ok([...pa,...av].every(q=>q.t==='tf'?typeof q.a==='boolean':(Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length)),
    'Cada pregunta real tiene su respuesta dentro de sus opciones');
  ok(pa[16].a===3&&/sátrapas/.test(pa[16].o[3])&&/la única que el club perdió/.test(CONT),
    'La 17 de Adultos, la que se perdió, tiene la respuesta de Daniel 3:2 y el estudio lo advierte');
  ok(pa.filter(q=>q.t==='tf').length===8&&pa.filter(q=>q.cap.startsWith('pr')).length===7&&av.every(q=>q.t==='mc'&&q.cap[0]==='d'),
    'El formato es el del campamento: Adultos con 8 V/F y 7 de P&R, 7 a 9 solo selección de Daniel');
  const banco=new Set(BANCO_HTML.map(q=>q.q));
  ok([...pa,...av].every(q=>banco.has(q.q)),'Todas las preguntas reales entran al banco de la app');
  ok(/PR 351/.test(CONT)&&/grandes ciudades/.test(CONT)&&/de parte de los oprimidos/.test(CONT)&&/santifican el sábado/.test(CONT),
    'Lo que el examen preguntó de Profetas y Reyes está en el estudio (PR 351, 360, 375 y 376)');
}

/* v178: Apocalipsis. El texto RV1995 completo y cada capítulo revisado contra
   él por tools/apocalipsis-revisa.js (literalidad, cobertura de versículos,
   forma de cada pregunta). */
{
  const {VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const cuenta=Object.values(VERS_AP).reduce((s,c)=>s+Object.keys(c).length,0);
  ok(Object.keys(VERS_AP).length===22&&cuenta===404&&Object.keys(VERS_AP.ap12).length===17&&Object.keys(VERS_AP.ap13).length===18,
    'Apocalipsis trae sus 22 capítulos y 404 versículos en RV1995 ('+cuenta+')');
  const r=require('child_process').spawnSync(process.execPath,[path.join(RAIZ,'tools','apocalipsis-revisa.js')],{encoding:'utf8'});
  ok(r.status===0,'Los 22 capítulos de Apocalipsis pasan el revisor contra RV1995'+(r.status?' — '+r.stdout.split('\n').filter(l=>/❌/.test(l)).slice(0,3).join(' / '):''));
  const AP=require(path.join(RAIZ,'fuente','apocalipsis.js'));
  ok(AP.AP_CAPS.length===22&&AP.AP_BANCO.length>=600&&AP.AP_TARJETAS.length>=200,
    'Apocalipsis tiene estudio, '+AP.AP_BANCO.length+' preguntas y '+AP.AP_TARJETAS.length+' tarjetas');
  const inter=AP.AP_BANCO.filter(q=>/adventista/i.test(q.q||''));
  ok(inter.length>0&&inter.every(q=>q.f==='c'),'Toda pregunta de interpretación adventista va marcada complementaria ('+inter.length+')');
}

/* v185: la lámina de Daniel 2. Las imágenes existen, cada parte trae su
   texto literal de RV1995, su interpretación con fuente, y las etiquetas,
   cajas y preguntas nombran partes que existen. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const L=LAMINAS.d2, n=t=>String(t).replace(/[«»—]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const todo=n([...Object.values(VERS.d1),...Object.values(VERS.d2)].join(' ')); // v203: el primer paso cita Daniel 1:2
  const faltan=[...L.capas,'piedra','babilonia','monte'].filter(k=>!fs.existsSync(path.join(RAIZ,'laminas',L.dir+k+'.webp')));
  ok(!faltan.length,'La lámina de Daniel 2 tiene sus 9 imágenes'+(faltan.length?' (faltan '+faltan.join(', ')+')':''));
  const textos=[...L.partes.flatMap(p=>[p.texto,p.texto2]),...L.historia.map(h=>h.texto),L.despues.texto,L.inicio.texto,L.cierre.texto,L.intro.texto];
  const malos=textos.filter(t=>!String(t).split('…').every(tr=>todo.includes(n(tr))));
  ok(!malos.length,'Cada texto de la lámina está literal en Daniel 1-2 RV1995 ('+textos.length+')'+(malos.length?': '+malos[0].slice(0,50):''));
  ok(L.partes.every(p=>/\S/.test(p.fuente)&&p.interp.length&&p.c)&&L.partes.length===8,'Cada parte trae su interpretación y su fuente');
  const ids=new Set(L.partes.map(p=>p.id));
  ok(L.capas.every(k=>ids.has(k)&&L.cajas[k]&&L.etiquetas[k])&&L.reto.every(r=>ids.has(r.ok))&&L.tiempo.every(k=>ids.has(k)),'Las capas, etiquetas, cajas, la línea de tiempo y Pruébate nombran partes que existen');
  const barro=L.partes.find(p=>p.id==='barro'), piedra=L.partes.find(p=>p.id==='piedra');
  ok(/Roma papal/.test(barro.reino)&&/vuelve|sana/.test(barro.interp.join(' '))&&/segunda venida/.test(piedra.reino),'La lámina sigue la lectura de Camilo: Roma papal hasta el fin y la piedra en la segunda venida');
  ok(/lamTarjeta\(id\)/.test(js)&&/const LAMINAS_DIR='\/laminas\/';/.test(js),'El capítulo ofrece la lámina y las imágenes se piden aparte (LAMINAS_DIR)');
}

/* v204: la lámina de Daniel 7 (tipo 'escenas'): una imagen entera por parte.
   Las imágenes existen (las de Daniel 2 que reusa también), cada texto está
   literal en RV1995 (Daniel 7, y lo citado de Daniel 8 y Apocalipsis), y
   sigue la lectura de Camilo: bestia = Roma imperial, diez cuernos = Roma
   dividida, cuerno pequeño = Roma papal sanada; la cuarta bestia no es el dragón. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const {VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const L=LAMINAS.d7, n=t=>String(t).replace(/<[^>]+>/g,'').replace(/[«»“”—]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const d7=n(Object.values(VERS.d7).join(' ')), otros=n([...Object.values(VERS.d2),...Object.values(VERS.d8),...Object.values(VERS_AP).flatMap(c=>Object.values(c))].join(' '));
  ok(L&&L.tipo==='escenas'&&!LAMINAS.d2.tipo,'Daniel 7 es una lámina de escenas y Daniel 2 sigue siendo la estatua');
  const ruta=f=>path.join(RAIZ,'laminas',(f.includes('/')?'':L.dir)+f+'.webp');
  const fs7=[L.inicioF,L.miniF,...L.partes.map(p=>p.img),...L.historia.map(h=>h.f),L.despues.f,L.cierre.f,...L.escenas.map(e=>e.f)];
  const faltan=[...new Set(fs7)].filter(f=>!fs.existsSync(ruta(f)));
  ok(!faltan.length&&fs7.includes('d2/e1798'),'La lámina de Daniel 7 tiene sus '+new Set(fs7).size+' imágenes'+(faltan.length?' (faltan '+faltan.join(', ')+')':''));
  const textos=[...L.partes.flatMap(p=>[p.texto,p.texto2]),...L.historia.map(h=>h.texto),L.despues.texto,L.cierre.texto,L.intro.texto];
  const malos=textos.filter(t=>!String(t).split('…').every(tr=>d7.includes(n(tr))));
  ok(!malos.length,'Cada texto de la lámina de Daniel 7 está literal en Daniel 7 RV1995 ('+textos.length+')'+(malos.length?': '+malos[0].slice(0,50):''));
  /* Lo que va entre comillas en la interpretación también es literal (Daniel 7-8 o Apocalipsis). */
  const citas=[...L.partes.flatMap(p=>p.interp.concat(p.corto)),...L.historia.map(h=>h.nota),L.despues.nota].flatMap(t=>[...String(t).matchAll(/«([^»]+)»/g)].map(m=>m[1]));
  const sueltas=citas.filter(c=>!d7.includes(n(c))&&!otros.includes(n(c)));
  ok(citas.length>=15&&!sueltas.length,'Las citas dentro de la interpretación de Daniel 7 son literales ('+citas.length+')'+(sueltas.length?': '+sueltas.slice(0,3).join(' | '):''));
  ok(L.partes.length===10&&L.partes.every(p=>p.img&&p.c&&p.interp.length&&/\S/.test(p.fuente)&&p.corto),'Cada parte de Daniel 7 trae su imagen, interpretación y fuente');
  const ids=new Set(L.partes.map(p=>p.id));
  ok(L.reto.length>=4&&L.reto.every(r=>ids.has(r.ok))&&L.tiempo.every(k=>ids.has(k))&&L.paralelo.every(r=>ids.has(r[0]))&&L.escenas.every(e=>!e.parte||ids.has(e.parte)),
    'Pruébate, la línea de tiempo, el paralelo y las escenas de Daniel 7 nombran partes que existen');
  const P=id=>L.partes.find(p=>p.id===id);
  ok(P('bestia').reino==='Roma imperial'&&P('cuernos').reino==='Roma dividida'&&P('cuerno').reino==='Roma papal'&&/Apocalipsis 13:3/.test(P('cuerno').corto+P('cuerno').interp.join(' '))&&/7:21-22/.test(P('cuerno').corto),
    'Daniel 7 sigue la lectura de Camilo: Roma en tres etapas y el papado sanado hasta que viene el Anciano de días');
  ok(!/drag[oó]n/i.test(JSON.stringify(L)),'La cuarta bestia no se llama dragón');
  ok(!/\b(según|para) Bohr\b|Bohr (dice|ve|explica|compara)/.test(JSON.stringify(L).replace(/Fuente:[^"]*/g,'')),'Voz directa: Bohr solo en la fuente');
  ok(/lamTarjeta\(id\)/.test(js)&&!/lamAbre\('d2'/.test(js),'Daniel 7 se ofrece desde su capítulo igual que Daniel 2 (nada atado a d2)');
}

/* v205: Daniel 7 tan interactivo como Daniel 2. Con Daniel 2 (cuarta columna de
   `paralelo`: el metal que se enciende), los diez cuernos y los tres que caen,
   el juicio por pasos, 1844 en la línea de tiempo y las once señas. Todo lo
   citado, literal en RV1995; nada de el.animate() ni url(#) (Safari). */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const L=LAMINAS.d7,D2=LAMINAS[L.comparar],n=t=>String(t).replace(/<[^>]+>/g,'').replace(/[«»“”—]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const d7=n(Object.values(VERS.d7).join(' '));
  const par=Object.fromEntries(L.paralelo.map(r=>[r[0],r[3]]));
  ok(L.comparar==='d2'&&D2&&D2.marcoEstatua&&JSON.stringify(par)===JSON.stringify({leon:'oro',oso:'plata',leopardo:'bronce',bestia:'hierro',cuernos:'dedos',cuerno:'barro',juicio:null,hijo:null,santos:['piedra'],reino:['monte']}),
    'Con Daniel 2: cada parte de Daniel 7 enciende su metal (el juicio y el Hijo del hombre no tienen: los agrega Daniel 7; la venida enciende la piedra y el reino eterno, el monte)');
  ok(L.paralelo.every(r=>r[3]===null||[].concat(r[3]).every(k=>D2.capas.includes(k)||['piedra','monte'].includes(k)))&&/lo agrega Daniel 7/.test(L.agrega),'La cuarta columna del paralelo nombra partes de la estatua de Daniel 2');
  const C=L.cuernos;
  ok(C&&C.diez.length===10&&C.nombres.length===10&&C.tres.map(t=>t.t+' '+t.y).join(', ')==='Hérulos 493, Vándalos 534, Ostrogodos 538'&&C.nombres.slice(7).join()==='Hérulos,Vándalos,Ostrogodos',
    'Los diez cuernos: diez puntos y diez reinos; caen hérulos (493), vándalos (534) y ostrogodos (538)');
  ok(C.capas.pequeno==='cuerno-pequeno.png'&&C.capas.tres.map(t=>t.f).join()==='cuerno-8.png,cuerno-9.png,cuerno-10.png'&&C.capas.sin.f==='cuarta-sin-tres.png'&&L.sube.solo.join()==='leon-solo.png,oso-solo.png,leopardo-solo.png,cuarta-solo.png',
    'Las capas que la app espera: los tres cuernos recortados, el parche sin ellos, cuerno-pequeno.png y {leon,oso,leopardo,cuarta}-solo.png');
  /* v214 (Camilo, 14-oct: «está como sobre los ojos»): el pequeño sale de la cresta, en el
     hueco de los tres que caen (a la derecha del cuerno 7), y termina más alto que ellos. */
  { const P=C.capas.pq,ojo=[725,175],tres=C.capas.tres.map(t=>t.en);
    ok(P.base[1]<ojo[1]-12&&P.base[0]>C.capas.delante.en[0]+C.capas.delante.en[2]/2&&P.base[0]<Math.max(...tres.map(t=>t[0]+t[2]))&&P.corte<=ojo[1]-10,
      'El cuerno pequeño sale de la cresta, en el hueco de los tres, y su raíz queda escondida por encima de los ojos');
    ok(P.alto>Math.max(...tres.map(t=>t[3]))&&P.de<1,'Sale pequeño y termina más grande que sus compañeros (7:8, 20)');
    const fsC=require('fs'),pathC=require('path'),d7=pathC.join(__dirname,'..','laminas','d7');
    ok([C.capas.sin.f,C.capas.pequeno,C.capas.delante.f,...C.capas.tres.map(t=>t.f)].every(f=>fsC.existsSync(pathC.join(d7,f))),'Las piezas del cuerno están en laminas/d7 (tools/lamina-cuernos.py)'); }
  const fs7=[...new Set([L.sube.fondo,C.diezEn&&L.partes.find(p=>p.id===C.diezEn).img,L.partes.find(p=>p.id===C.caenEn).img])];
  ok(fs7.every(f=>fs.existsSync(path.join(RAIZ,'laminas',L.dir+f+'.webp')))&&L.sube.solo.every(f=>fs.existsSync(path.join(RAIZ,'laminas',L.dir+f))),
    'Las cuatro bestias tienen su capa recortada para subir del mar, además de la foto de respaldo');
  const pasos=L.partes.flatMap(p=>(p.pasos||[]).map(x=>Object.assign({p:p.id},x)));
  const malos=pasos.filter(x=>!d7.includes(n(x.texto))||!x.caja||x.caja.length!==4||Math.abs(x.caja[2]/x.caja[3]-1200/675)>.02||x.caja[0]<0||x.caja[1]<0||x.caja[0]+x.caja[2]>1200||x.caja[1]+x.caja[3]>675);
  ok(pasos.filter(x=>x.p==='juicio').map(x=>x.t).join(' / ')==='Fueron puestos unos tronos / Se sentó un Anciano de días / Un río de fuego / Los libros fueron abiertos / Mataron a la bestia / Las otras bestias'&&pasos.filter(x=>x.p==='hijo').length===2&&!malos.length,
    'El juicio en 6 pasos (v236: 7:11 y 7:12 después de los libros abiertos) y el Hijo del hombre en 2: texto literal RV1995 y la caja dentro de la imagen, en 16:9'+(malos.length?' ('+malos[0].t+')':''));
  ok(L.marcas.some(m=>m[0]===1844)&&L.escenas.some(e=>e.y===1844&&e.f==='juicio')&&L.hitos.includes(1844)&&L.partes.find(p=>p.id==='juicio').de===1844,'La línea de tiempo marca 1844: ahí empieza el juicio (8:14)');
  const senQ=L.senas.flatMap(x=>[...(x.t+' '+x.c).matchAll(/«([^»]+)»/g)].map(m=>m[1]));
  ok(L.senas.length===11&&L.senas.every(x=>x.t&&/^7:/.test(x.ref)&&x.c)&&senQ.length>=9&&senQ.every(q=>d7.includes(n(q)))&&/Fuente|Bohr/.test(L.senasFuente),
    'Las once señas del cuerno: cada una con su texto y su cumplimiento, y lo citado literal en Daniel 7 ('+senQ.length+')');
  const lam=js.slice(js.indexOf('/* ── v204: láminas de escenas'),js.indexOf('function lamPresE(')).replace(/\/\*[\s\S]*?\*\//g,'');
  ok(lam.length>5000&&!/\.animate\(/.test(lam)&&!/url\(#/.test(lam)&&/requestAnimationFrame/.test(lam)&&/lamQuieto\(\)/.test(lam),'Daniel 7 se mueve con requestAnimationFrame, sin el.animate() ni url(#), y respeta «reducir movimiento»');
  ok(/\/\\\.\\w\+\$\/\.test\(f\)\?'':'\.webp'/.test(js),'lamRuta acepta la extensión (las capas .png)');
}

/* v208: tiempo, tiempos y medio tiempo (1.260 años) y las señas del cuerno como
   segmento de la presentación. Lo citado, literal en RV1995; la cuenta cuadra;
   las once señas son las mismas de la interpretación (d7.js), en el mismo orden. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const {VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const L=LAMINAS.d7,P=L.periodo,n=t=>String(t).replace(/<[^>]+>/g,'').replace(/[«»“”—]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const verso=r=>{const m=/^(Daniel|Apocalipsis) (\d+):(\d+)$/.exec(r);if(!m)return '';return m[1]==='Daniel'?VERS['d'+m[2]][m[3]]:(VERS_AP['ap'+m[2]]||{})[m[3]];};
  const citas=P.pasos.flatMap(x=>x.citas),malas=citas.filter(([r,c])=>!n(verso(r)).includes(n(c)));
  ok(P&&P.tras==='cuerno'&&P.pasos.length===4&&citas.length===7&&!malas.length,'Tiempo, tiempos y medio tiempo: 4 pasos y 7 citas literales en Daniel 7 y Apocalipsis'+(malas.length?' ('+malas[0][0]+')':''));
  ok(360+720+180===1260&&42*30===1260&&P.de+1260===P.a&&P.de===538&&P.a===1798&&P.fotos.map(f=>f[0]).join()==='d2/e538,d2/e1798'&&P.fotos.every(f=>fs.existsSync(path.join(RAIZ,'laminas',f[0]+'.webp'))),
    'La cuenta cuadra: 360 + 720 + 180 = 1.260 = 42 × 30, y 538 + 1.260 = 1798 (con sus dos escenas)');
  ok(/Números 14:34/.test(P.pasos[1].nota)&&/Ezequiel 4:6/.test(P.pasos[1].nota)&&!/«/.test(P.pasos[1].nota)&&/CS 309, 492 y 636/.test(P.fuente)&&/15 principios/.test(P.fuente),
    'Día por año: Números 14:34 y Ezequiel 4:6 sin comillas (no están en la Biblia de la app); fuentes Bohr y CS 309, 492 y 636');
  const D7=fs.readFileSync(path.join(RAIZ,'fuente','complementos','daniel','d7.js'),'utf8');
  const refsD7=[...D7.slice(D7.indexOf('Las señas del cuerno pequeño (1)'),D7.indexOf('Apocalipsis 13 describe el mismo poder')).matchAll(/\['[^']*', '(7:[\d, ]+)'/g)].map(m=>m[1]);
  ok(L.senas.length===11&&refsD7.length===11&&refsD7.join('|')===L.senas.map(x=>x.ref).join('|'),'Las once señas de la lámina son las de d7.js, en el mismo orden ('+refsD7.length+')');
}

/* v210: el juicio que se anima (7:9-10) y las tres fases del juicio. Las luces
   caen dentro de juicio.webp; la animación no dibuja el rostro del Juez (solo
   luces y un libro); las fases usan los nombres de Apocalipsis 20 (cap20.js), en el orden de Daniel 7 (v213), y
   lo citado es literal (Daniel y Apocalipsis en RV1995 de la app). */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const {VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const {OTRAS_VERS}=require(path.join(RAIZ,'fuente','biblia-otros.js'));
  const L=LAMINAS.d7,J=L.partes.find(p=>p.id==='juicio'),A=J.anim,F=L.fases;
  const n=t=>String(t).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/<[^>]+>/g,'').replace(/[«»“”—,.;:¿?¡!]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const dentro=([x,y])=>x>=0&&x<=1200&&y>=0&&y<=675;
  ok(A&&dentro(A.trono)&&dentro(A.sentado)&&[A.tronos,A.rio,A.libros].every(a=>a.length>=3&&a.every(dentro))&&A.camara.every(c=>c.length===4&&c[0]+c[2]<=1200&&c[1]+c[3]<=675&&Math.abs(c[2]/c[3]-1200/675)<.02),
    'La animación del juicio: el trono, los tronos, el río y los libros caen dentro de juicio.webp, y la cámara va en 16:9');
  ok(J.pasos[3].t==='Los libros fueron abiertos'&&J.pasos[3].ms>=6000&&/El Juez se sentó y los libros fueron abiertos/.test(VERS.d7[10]),'«El Juez se sentó y los libros fueron abiertos» (7:10, RV1995) tiene tiempo para animarse');
  const lib=js.slice(js.indexOf('function lamJuicio('),js.indexOf('function lamFasesHTML('));
  ok(lib.length>2000&&!/url\(#|\.animate\(|filter=/.test(lib)&&/lamQuieto\(\)/.test(lib)&&/El Juez se sentó y los libros fueron abiertos\./.test(lib)&&!/\b(rostro|cara|face)\b/i.test(lib.replace(/\/\*[\s\S]*?\*\//g,'')),
    'El juicio se anima sin url(#), sin filtros de svg ni el.animate(), con «reducir movimiento», y sin dibujar el rostro del Juez');
  const css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8');
  ok(/\.lam-libro\{/.test(css)&&/@keyframes lb-sube/.test(css)&&/prefers-reduced-motion:reduce\)\{\.lam-ft/.test(css),'El libro que se abre y las chispas tienen su estilo, también con «reducir movimiento»');
  const verso=r=>{const m=/^(Daniel|Apocalipsis|1 Corintios|Malaquías) (\d+):(\d+)$/.exec(r);if(!m)return '';
    return m[1]==='Daniel'?VERS['d'+m[2]][m[3]]:m[1]==='Apocalipsis'?(VERS_AP['ap'+m[2]]||{})[m[3]]:(OTRAS_VERS[(m[1]==='Malaquías'?'malaquias':'1corintios')+'-'+m[2]]||{})[m[3]];};
  const citas=F.pasos.flatMap(x=>x.citas),malas=citas.filter(([r,c])=>!n(verso(r)).includes(n(c)));
  ok(F&&F.tras==='hijo'&&F.ve==='juicio'&&F.pasos.map(x=>x.t).join()==='Investigación,Sentencia,Ejecución'&&citas.length===8&&!malas.length,
    'Las tres fases del juicio: Investigación, Sentencia y Ejecución, con 8 citas literales'+(malas.length?' ('+malas[0][0]+')':''));
  ok(F.hitos.length===3&&F.pasos.every(x=>x.de>=0&&x.a<F.hitos.length&&x.de<=x.a&&x.cuando&&x.donde&&x.quien&&x.que&&x.para)&&/1844/.test(F.pasos[0].cuando)&&/venida/.test(F.pasos[2].cuando),
    'La mini línea de tiempo: 1844 → el Hijo recibe el reino → la venida, y cada fase con cuándo, dónde, quién y para quién');
  /* v213 (Camilo, 14-oct 13:24): el orden de Daniel 7. La sentencia es cuando el Hijo
     recibe el reino (7:14), la ejecución cuando los santos lo reciben (7:22); no el milenio. */
  const cit=k=>F.pasos[k].citas.map(c=>c[0]).join();
  ok(/Daniel 7:14/.test(cit(1))&&/Daniel 7:22/.test(cit(2))&&!/mil años|trono blanco/.test(F.pasos[1].cuando+F.pasos[2].cuando+F.pasos[2].quien)&&/Apocalipsis 20/.test(F.nota)&&!F.mil,
    'Las fases en el orden de Daniel 7: sentencia cuando el Hijo recibe el reino (7:14), ejecución cuando los santos lo reciben (7:22), y la nota une Apocalipsis 20');
  const ap20=fs.readFileSync(path.join(RAIZ,'fuente','apocalipsis','cap20.js'),'utf8');
  ok(['1 · Investigación','2 · Sentencia','3 · Ejecución'].every(t=>ap20.includes(t)),'Los mismos nombres que Apocalipsis 20 (cap20.js)');
  const CD=require(path.join(RAIZ,'fuente','complementos','daniel.js')),tf=CD.secciones.d7.find(x=>/tres fases del juicio/.test(x.t));
  ok(tf&&['Investigación','Sentencia','Ejecución','1844','(20:4)','Daniel 12:1','(7:13)','(7:14)','PE 280'].every(t=>tf.h.includes(t))&&!/juicio del milenio/.test(tf.h)&&CD.secciones.d7.some(x=>/El Juez se sentó/.test(x.t)&&/PE 55/.test(x.h)),
    'Daniel 7 explica las tres fases del juicio y el tribunal con sus libros (🧭)');
  const pre=js.slice(js.indexOf('const lamPasosE=()=>{'),js.indexOf('function lamHojaSub('));
  ok(/tipo:'fases'/.test(pre)&&/lamFasesVis\(s\.sub/.test(js)&&/lamFasE\(/.test(js),'Al presentar, después de los pasos del juicio van sus tres fases; en Explorar, una por una');
}

/* v211: la ronda de Camilo sobre v209/v210 (14-oct). */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {cmpModelo,catCorta,actCorta}=montar('cmpModelo, catCorta, actCorta');
  /* Doctrina: el Hijo del hombre (7:13) llega al Anciano de días en 1844; NO es la piedra. */
  const M=cmpModelo(LAMINAS),fila=k=>M.filas.find(f=>f.key===k),ids=(f,c)=>((f&&f.celdas[c])||[]).map(p=>p.id).join();
  ok(ids(fila('1844'),'d7')==='juicio,hijo'&&!ids(fila('1844'),'d2'),'Comparar: el Hijo del hombre va en la época del juicio (desde 1844), con el juicio; Daniel 2 no la trae');
  /* v218 (Camilo, 14-oct 16:01): la piedra (la venida) y el monte (el reino eterno, después de los mil años) no van lado a lado. */
  const fv=M.filas.findIndex(f=>f.key==='fin-venida'),fr=M.filas.findIndex(f=>f.key==='fin-reino');
  ok(ids(fila('fin-venida'),'d2')==='piedra'&&ids(fila('fin-venida'),'d7')==='santos'&&ids(fila('fin-reino'),'d2')==='monte'&&ids(fila('fin-reino'),'d7')==='reino'&&fv>=0&&fr===fv+1&&fr===M.filas.length-1&&!fila('fin')&&
    fila('fin-venida').reino==='La segunda venida'&&fila('fin-reino').reino==='El reino eterno'&&/mil años/.test(fila('fin-reino').fechas),
    'Comparar: la segunda venida (la piedra; los santos reciben el reino, 7:22, 26) y, después, el reino eterno (el monte; 7:27), dos épocas');
  const par=Object.fromEntries(LAMINAS.d7.paralelo.map(r=>[r[0],r[3]]));
  ok(par.hijo===null&&![].concat(par.hijo||[]).includes('piedra')&&JSON.stringify(par.santos)==='["piedra"]'&&JSON.stringify(par.reino)==='["monte"]','Con Daniel 2: el Hijo del hombre no enciende la piedra; la venida enciende la piedra y el reino eterno, el monte');
  const H=LAMINAS.d7.partes.find(p=>p.id==='hijo');
  ok(H.era===1844&&/1844/.test(H.fechas)&&/No es la piedra|No es la segunda venida/.test(H.corto+H.interp.join(' ')),'El Hijo del hombre dice 1844 y que no es la segunda venida');
  ok(/function cmpFasesHTML\(/.test(js)&&/cmpFasesHTML\(f,M,false\)/.test(js)&&/cmpFasesHTML\(f,M,true\)/.test(js),'La época del juicio se conecta con sus tres fases (en la lista y lado a lado)');
  /* Las fuentes de Comparar, una vez cada una. */
  const fu=[...new Set(M.cols.map(k=>String(LAMINAS[k].paraleloFuente||'').trim().replace(/\.$/,'')))];
  ok(fu.length===1,'Comparar cita su fuente una sola vez ('+fu.length+')');
  /* La línea de tiempo llega al futuro: 1844, la piedra y el monte después de hoy. */
  const F2=LAMINAS.d2.futuro,F7=LAMINAS.d7.futuro;
  const mil=[LAMINAS.d2,LAMINAS.d7,LAMINAS.d8].map(L=>[L,L.futuro[1]]);
  ok(mil.every(([L,f])=>f.f!==L.futuro[0].f&&fs.existsSync(path.join(RAIZ,'laminas',(f.f.includes('/')?'':L.dir)+f.f+'.webp')))&&
    mil[0][1].f==='mil-desolada'&&mil[1][1].f==='mil-juicio'&&mil[2][1].f==='d2/mil-desolada',
    'El milenio tiene imagen propia: tierra desolada en Daniel 2 y 8, juicio de los santos en Daniel 7');
  ok(F2.map(f=>f.id).join()==='piedra,,monte'&&F2[0].de===2026&&F2.every((f,i)=>!i||f.de===F2[i-1].a)&&F2.map(f=>f.ult).join()==='venida,desolada,reino'&&
    F7.map(f=>f.id).join()==='santos,,reino'&&F7.map(f=>f.ult).join()==='venida,juzgan,reino',
    'La línea de tiempo sigue después de hoy: la piedra, los mil años y el monte (Daniel 2); la venida, los mil años y el reino (Daniel 7)');
  ok([LAMINAS.d2,LAMINAS.d7].every(L=>L.marcas.some(m=>m[0]===1844)&&L.marcas.some(m=>m[0]===2026))&&LAMINAS.d2.escenas.some(e=>e.y===1844)&&LAMINAS.d2.juicio===1844,
    'Las dos líneas de tiempo marcan 1844 (el juicio) y hoy');
  ok(/const LAM_HOY=2026,LAM_FIN=2626;/.test(js)&&/max="'\+LAM_FIN\+'"/.test(js)&&/lamFuturo\(y\)/.test(js),'El control de la línea de tiempo llega hasta el final del futuro');
  /* Una sola pista: el tramo va dentro de ella (antes era otra raya encima). */
  ok(/class="lam-pista" id="lamPista"[^']*'[^]*?class="lam-tramo" id="lamTramo"/.test(js)&&!/b\.className='lam-banda'/.test(js),'La línea de tiempo es una sola pista con el tramo dentro');
  /* Capas: la escena que entra lleva una animación con relleno; al esconderla se le quita la clase. */
  const lh=js.slice(js.indexOf('function lamHist(t){'),js.indexOf('const lamEscenaDe='));
  ok(/if\(!t\|\|!t\.f\)\{h\.classList\.remove\('entra'\)/.test(lh)&&/lamHistT=setTimeout\(\(\)=>\{apagaBg\(\);h\.classList\.remove\('entra'\)/.test(lh),
    'La escena de la historia no queda encima de las partes: se le quita la animación al esconderla');
  /* La piedra y el monte, a la mano en Explorar. */
  ok(/class="lam-riel-l" id="lamTira"/.test(js)&&/function lamNavHTML\(/.test(js)&&LAMINAS.d2.partes.slice(-3).map(p=>p.id).join()==='barro,piedra,monte',
    'Daniel 2 en Explorar: todas las partes en el riel, y Siguiente pasa del barro a la piedra y al monte');
  /* Las categorías: cada pastilla dice su actividad. */
  ok(actCorta('ap')==='Apocalipsis'&&actCorta('cb')==='Daniel'&&catCorta('apgm')==='Apocalipsis · Guías Mayores (Jóvenes)'&&actCorta('dm')==='Devoción Matutina'&&catCorta('pa')==='Daniel · Padres y consejeros'&&catCorta('gm')==='Daniel · Guías Mayores',
    'Quién estudia: «Apocalipsis · Padres y consejeros» y «Daniel · Padres y consejeros» ya no se ven iguales');
  ok(/class="alu-act-a">'\+esc\(c\?actCorta\(c\.act\)/.test(js)&&/onclick="cambiaAlumno\(\\''\+id\+'\\'\)">'\+\s*'<span class="alu-act-a">/.test(js),'Cada pastilla abre su propia ficha y nombra su actividad');
  /* La portada de Daniel 7: las cuatro bestias. */
  ok(LAMINAS.d7.cartel.f==='bestias'&&LAMINAS.d7.inicioF==='bestias'&&fs.existsSync(path.join(RAIZ,'laminas','d7','bestias.webp')),'Daniel 7 abre con las cuatro bestias que suben del mar (bestias.webp)');
}
/* v212: la ronda de Camilo del 14-oct (13:00) sobre la lámina. Lo que se ve de verdad
   (la hoja no vacía, el riel con el teclado, nada cortado, monte y cierre distintos) lo
   mide tools/en-navegador.js; aquí, que el código y los datos lo sostengan. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const css=fs.readFileSync(FUENTE('estilos.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  /* La causa de la hoja vacía: dos cosas con el mismo nombre de clase. */
  ok((js.match(/class="lam-pista"/g)||[]).length===1&&/h\.innerHTML=(?:lamPer\()?html\|\|lamIntroHTML\(\)\)?;/.test(js),
    'La hoja sin parte es una portada (lamIntroHTML); «lam-pista» es solo la pista de la línea de tiempo');
  ok(['d2','d7'].every(k=>{const I=LAMINAS[k].intro;return I&&I.titulo&&I.ref&&I.texto&&I.nota&&I.datos.length===3;}),'Daniel 2 y Daniel 7 traen su portada: título, pasaje, de qué trata y tres datos');
  /* El riel: con el teclado, y sin texto cortado. */
  ok(/function lamRielTeclas\(/.test(js)&&/ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1/.test(js)&&/lamRielTeclas\(\);/.test(js),'El riel se maneja con las flechas, Inicio y Fin');
  const v212=css.slice(css.indexOf('--v-tet:'));
  ok(!/ellipsis/.test(v212)&&!/\.lam-ri-t b[^{]*\{[^}]*nowrap/.test(v212)&&!/\.lam-nav-p[^{]*\{[^}]*nowrap/.test(v212),'Ni el riel ni Anterior/Siguiente cortan un nombre con «…»');
  ok(!/lam-tb chip/.test(js)&&!/onclick="lamAtras\(\)">‹ Anterior/.test(js)&&/class="lam-rd sig"/.test(js)&&/id="lamSig" class="lam-rd sig"/.test(js),'Las pastillas y los botones de caja se fueron: botones redondos en Explorar y en Presentar');
  /* El monte y el cierre: cada uno con lo suyo. */
  ok(JSON.stringify(LAMINAS.d2.enEscena)==='["monte"]'&&/const lamEnEscena=/.test(js)&&/\(lamEnEscena\(e\)\?'':lamEscenaHTML\(e\)\)/.test(js),
    'En el paso del monte la hoja no repite el monte como foto (enEscena)');
  ok(/const verMonte=!cierre&&/.test(js)&&/lamFin\(cierre\);/.test(js)&&/function lamFinHTML\(/.test(js)&&LAMINAS.d2.cierre.ref2==='Daniel 2:44',
    'El cierre de Daniel 2 ya no es el monte otra vez: es la placa final con toda la historia');
}

/* v179: la interpretación con fuentes (Bohr, Elena de White, las notas de
   Camilo) va en su propia capa: secciones 'contexto' y preguntas f:'c', cada
   una con «Fuente:». En Apocalipsis y, aparte del examen, en Daniel. */
{
  const AP=require(path.join(RAIZ,'fuente','apocalipsis.js'));
  const secsAp=Object.values(AP.AP_CONTENIDO).flat().filter(s=>s.capa==='contexto');
  ok(secsAp.length>=100&&secsAp.every(s=>/Fuentes?:/.test(s.h)),'Apocalipsis: '+secsAp.length+' secciones de interpretación, todas con su fuente');
  const pcAp=AP.AP_BANCO.filter(q=>q.f==='c');
  ok(pcAp.length>=300&&pcAp.every(q=>/Fuentes?:/.test(q.e||'')),'Apocalipsis: '+pcAp.length+' preguntas de interpretación, todas con su fuente');
  ok(Object.values(AP.AP_CONTENIDO).flat().filter(s=>/^🧭/.test(s.t||'')).every(s=>s.capa==='contexto'),'Las secciones 🧭 son todas de interpretación');
  const tr=(AP.AP_CONTENIDO.ap8||[]).concat(AP.AP_CONTENIDO.ap9||[]).map(s=>s.h).join(' ');
  ok(/Bohr/.test(tr)&&/Revoluci[oó]n Francesa/.test(tr),'Las trompetas se explican según Bohr (la quinta, Revolución Francesa)');
  const r=require('child_process').spawnSync(process.execPath,[path.join(RAIZ,'tools','complementos-revisa.js')],{encoding:'utf8'});
  ok(r.status===0,'La interpretación de Daniel pasa su revisor'+(r.status?' — '+r.stdout.split('\n').filter(l=>/❌/.test(l)).slice(0,3).join(' / '):''));
  const CD=require(path.join(RAIZ,'fuente','complementos','daniel.js'));
  ok(Object.keys(CD.secciones).length===12&&CD.preguntas.length>=100&&CD.preguntas.every(q=>q.f==='c'&&/^d\d/.test(q.cap)),
    'Daniel 1-12 tiene interpretación aparte del examen ('+CD.preguntas.length+' preguntas, todas complementarias)');
  ok(html.includes(CD.secciones.d8[0].t.slice(2,30).trim()),'La interpretación de Daniel llega a la app');
  /* v207: «once señas», como la lámina: boca y palabras contra el Altísimo van juntas. */
  const senasD7=CD.secciones.d7.filter(x=>/señas del cuerno pequeño/.test(x.t)).map(x=>(x.h.match(/<tr>/g)||[]).length-1);
  ok(senasD7.length===2&&senasD7[0]+senasD7[1]===11&&/<b>once<\/b> señas/.test(CD.secciones.d7[0].h),'Daniel 7: la interpretación cuenta once señas y sus tablas tienen once filas ('+senasD7.join(' + ')+')');
}

/* v215: la ronda de Camilo (14-oct, 13:44-13:58). Lo que se puede afirmar sin
   navegador; lo que se ve y la recarga, en tools/en-navegador.js. */
{
  const {LAMINAS,ULTIMOS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const {VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8');
  const n=t=>String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/<[^>]+>/g,'').replace(/[«»“”—,.;:¿?¡!]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const verso=r=>{const m=/^(Daniel|Apocalipsis) (\d+):(\d+)$/.exec(r);if(!m)return '';return m[1]==='Daniel'?VERS['d'+m[2]][m[3]]:(VERS_AP['ap'+m[2]]||{})[m[3]];};
  /* 7. El lugar: un camino legible, en un solo bloque que Jóvenes cambia. */
  const {lugarParte,rec2,rec7}=montar("lugarParte, rec2:(lamId='d2',lamRecorrido().map(x=>x.k).join(' ')), rec7:(lamId='d7',lamRecorrido().map(x=>x.k).join(' '))");
  const o=lugarParte('estudio/d7/profundizar/s2/lamina/d7/explorar/x-fases?a=gm');
  ok(o.pant==='estudio'&&o.item==='d7'&&o.prof===true&&o.sec===2&&o.lam.id==='d7'&&o.lam.modo==='explorar'&&o.lam.paso==='x-fases'&&o.a==='gm',
    'El lugar se lee: pantalla, capítulo, pestaña, sección, lámina, modo, paso y actividad');
  ok(lugarParte('estudio/m-comparar/comparar/-331').cmp==='-331'&&lugarParte('estudio/m-comparar/ultimos/plagas').ult==='plagas'&&lugarParte('logros').pant==='logros'&&
    !lugarParte('cualquier/cosa').pant&&!lugarParte('').pant&&lugarParte('estudio/d2/lamina/d2/presentar/7').lam.paso==='7',
    'El lugar también dice la época de Comparar y el último acontecimiento; lo que no se entiende se ignora');
  const bloque=/\/\* LUGAR:INICIO \*\/\nfunction lugarLee\(\)\{[\s\S]*?\nfunction lugarEscribe\(c\)\{[\s\S]*?\/\* LUGAR:FIN \*\//;
  ok(bloque.test(js)&&(js.match(/\/\* LUGAR:INICIO \*\//g)||[]).length===1&&!/location\.hash/.test(js.replace(bloque,'')),
    'El lugar vive en un solo bloque (LUGAR:INICIO/FIN): fuera de él nadie toca el fragmento (Jóvenes lo cambia por el suyo)');
  ok(/lugarArranca\(true\)/.test(js)&&['ir(','verCap(','ponPest(','lamCierra(','cmpToca(','cmpCierra('].every(f=>new RegExp('function '+f.replace('(','\\(')+'[^]*?lugarAnota\\(\\)').test(js)),
    'Cada cambio de lugar lo anota (pantalla, capítulo, pestaña, lámina, Comparar) y el arranque lo aplica');
  /* 3. Explorar en orden, desde el primer paso. */
  ok(rec2==='h0 h1 h2 h3 h4 est oro plata bronce hierro dedos barro piedra monte desp cierre aplica','Daniel 2 en Explorar: la historia, la estatua, cada parte, la piedra, el monte, el rey, el cierre y la pregunta para la vida ('+rec2+')');
  ok(/^h0 h1 est leon oso leopardo bestia cuernos cuerno x-senas x-periodo juicio hijo x-fases santos reino desp cierre aplica$/.test(rec7),'Daniel 7 en Explorar: el mismo orden que Presentar ('+rec7+')');
  /* v225 (revisión de Camilo): B6, A3, B1. */
  const {dd2}=montar("dd2:(lamId='d2',lamEscenasDe(LAMINAS.d2.partes.find(p=>p.id==='dedos')).map(e=>e.y).join())");
  ok(!/1844/.test(dd2)&&LAMINAS.d2.escenas.some(e=>e.y===1844&&e.hoja===false),'v225: la escena del juicio de 1844 va en la línea de tiempo de Daniel 2, no en la hoja de «Los diez dedos» (Roma dividida) ('+dd2+')');
  const {pres7}=montar("pres7:(lamId='d7',lamPasosE().map(x=>x.tipo==='parte'?x.id+(x.sub!=null?'.'+x.sub:''):x.tipo).join(' '))");
  ok(/juicio\.3 juicio\.4 juicio\.5 hijo\.0 hijo\.1 fases fases fases santos/.test(pres7),'v225: al presentar Daniel 7, las tres fases del juicio van después del Hijo del hombre (la sentencia es el reino que recibe)');
  const fuenteTodo=['laminas.js','contenido.js','complementos/profundizar.js','complementos/daniel/d7.js','complementos/daniel/d2.js','complementos/daniel/d8.js'].map(f=>fs.readFileSync(path.join(RAIZ,'fuente',f),'utf8')).join('\n');
  const L7=LAMINAS.d7,A3=/volverá a perseguir a los santos hasta que el juicio le quite el dominio y Cristo vuelva \(7:21-22, 26\)/;
  ok(!/hasta que viene el Anciano de días|sigue en pie hasta que viene|el cuerno sigue hasta que/.test(fuenteTodo)&&A3.test(L7.periodo.pasos[3].nota)&&A3.test(L7.partes.find(p=>p.id==='cuerno').corto)&&
    (fuenteTodo.match(/volverá a perseguir a los santos hasta que el juicio le quite el dominio y Cristo vuelva/g)||[]).length>=6&&/El Padre le da el reino al Hijo, que está ante él desde 1844/.test(L7.fases.pasos[1].quien),
    'v225: ya no dice que el cuerno sigue «hasta que viene el Anciano de días» (7:13 es 1844): sigue hasta que el juicio le quita el dominio y Cristo vuelve; la sentencia: el Padre le da el reino al Hijo, que está ante él desde 1844');
  const Mc=montar('cmpModelo').cmpModelo(LAMINAS),is=Mc.filas.findIndex(f=>f.key==='fin-sanada'),fs98=Mc.filas[is];
  ok(fs98&&fs98.reino==='Roma papal sanada'&&/futura/.test(fs98.fechas)&&/sin fecha/.test(fs98.fechas)&&!/1798/.test(fs98.fechas)&&['d2','d7','d8'].every(k=>(fs98.celdas[k]||[]).length===1)&&
    Mc.filas[is-1].key==='1844'&&Mc.filas[is+1].key==='fin-venida'&&['d2','d7','d8'].every(k=>LAMINAS[k].cmpExtra.every(p=>p.de===null&&p.fin==='sanada'&&!('a' in p)))&&!LAMINAS.d7.partes.some(p=>p.de===1798),
    'v259: la restauración final es futura, sin año asignado, después del inicio del juicio y antes de la venida; 1798 es la herida');
  const v259=montar("alias:cmpNormaliza('1798'), nota:cmpNota('fin-sanada'), seg:(lamId='d7',lamSegmento(1820).tx), metro:(lamId='d7',lamMetroEra(LAMINAS.d7,1798,1844)), mini:cmpMini");
  ok(v259.alias==='fin-sanada'&&/1798 corresponde a la herida/.test(v259.nota)&&/protestantismo apóstata/.test(v259.nota)&&/cap. 26, p. 439/.test(v259.nota)&&/Roma dividida/.test(v259.seg)&&!/sanad/.test(JSON.stringify(v259.metro)),
    'v259: enlace antiguo compatible, explicación de la imagen de la bestia con fuente; la línea de 1798 no dice que la herida ya está sanada');
  const imagenes=[['d2','piedra','piedra-impacto'],['d7','santos','santos-venida'],['d8','quebrantado','quebrantado'],['d2','monte','monte-eterno'],['d7','reino','d2/e-monte']];
  ok(imagenes.every(([k,id,img])=>{const L=LAMINAS[k],p=L.partes.find(p=>p.id===id),ruta='laminas/'+(img.includes('/')?'':L.dir)+img+'.webp';return p.img===img&&fs.existsSync(path.join(RAIZ,ruta))&&v259.mini(L,p,1.6).includes(ruta);})&&new Set(imagenes.map(x=>x[2])).size===5&&!Mc.filas.find(f=>f.key==='fin-reino').celdas.d8,
    'v259: cinco imágenes diferenciadas por símbolo en Comparar; Daniel 8 no añade una escena del reino eterno');
  ok(/lamIr\('h0'\);lamPintaReto\(\)/.test(js)&&/function lamNavHTML\(k\)\{\s*const P=lamRecorrido\(\)/.test(js),'Explorar abre en «Cautivos en Babilonia» y Anterior/Siguiente siguen el recorrido entero');
  /* La piedra: oculta hasta su paso, y sin rótulo sobre la estatua. */
  ok(/function lamPiedraArriba\(\)\{[\s\S]*?pi\.style\.opacity='0'/.test(js)&&/data-p="piedra" style="opacity:0"/.test(js)&&/Object\.keys\(E\)\.filter\(id=>id!=='piedra'\)/.test(js)&&/esPiedra\)\{lamPiedraArriba\(\);pi\.style\.opacity='1'/.test(js),
    'La piedra no se ve hasta su paso (ni en la historia ni en la estatua entera)');
  /* 2. La luz detrás de la estatua. */
  ok(/<g class="lam-estatua"><g class="lam-brillos"/.test(js)&&/\.lam-brillo\{opacity:0/.test(css)&&!/\.lam-parte\.on\{filter:drop-shadow/.test(css)&&!/\.lam-parte:hover\{filter:drop-shadow/.test(css),
    'La luz de la parte elegida va detrás de la estatua (lam-brillo), no derramada sobre la vecina');
  /* 4. El río: un carril por visión, los hilos con nombre y la leyenda. */
  const {cmpRio,cmpModelo}=montar('cmpRio, cmpModelo');
  const rio=cmpRio(cmpModelo(LAMINAS));
  ok(!/--n:/.test(rio)&&(rio.match(/class="cmp-hilo/g)||[]).length===3&&/Roma papal <small>538–1798/.test(rio)&&/Juicio <small>desde 1844/.test(rio)&&/class="cmp-ley"/.test(rio),
    'Comparar: cada visión en una sola fila; Roma papal y el juicio, hilos con nombre; y una leyenda');
  /* 5. Las tres fases, con sus versículos (Camilo, v213). */
  const F=LAMINAS.d7.fases;
  ok(F.pasos.map(x=>x.ref).join('|')==='7:9-10|7:13-14, 22a|7:22b, 26-27'&&/^Al cierre de la gracia/.test(F.pasos[1].cuando)&&/antes de las plagas y de la venida/.test(F.pasos[1].cuando)&&F.hitos[1][0]==='Al cierre de la gracia'&&/Apocalipsis 22:11/.test(JSON.stringify(F.pasos[1].citas))&&/santos reciben el reino, en la segunda venida/.test(F.pasos[2].cuando)&&/cmp-fases-r/.test(js),
    'Las tres fases: Investigación (7:9-10), Sentencia cuando el Hijo recibe el reino (7:13-14, 22a), Ejecución en la venida (7:22b, 26-27)');
  const ap20=fs.readFileSync(path.join(RAIZ,'fuente','apocalipsis','cap20.js'),'utf8');
  ok(!/'2 · Sentencia', 'Durante los mil años/.test(ap20)&&!/'3 · Ejecución', 'Después de los mil años/.test(ap20)&&!/dicta sentencia \(durante los mil años\)/.test(ap20),
    'Apocalipsis 20 ya no dice «Sentencia · durante los mil años; Ejecución · después»: los mil años van dentro de la ejecución');
  /* 6. Los últimos acontecimientos. v219 (Camilo, 14-oct 18:12-18:17): la secuencia de CS,
     PE y EUD; columnas por capítulo (Mateo 24 y Apocalipsis 12, 13 y 17 aparte) y Elena de
     White; cada celda dice si lo dice el texto o según qué interpretación, con su fuente. */
  const E=ULTIMOS.eventos,citas=E.flatMap(e=>e.citas),malas=citas.filter(([r,c])=>!n(verso(r)).includes(n(c)));
  const ev=id=>E.find(e=>e.id===id),ord=E.map(e=>e.id).join(),cols=ULTIMOS.libros.map(x=>x[0]).join();
  ok(ord==='juicio,imagen,ley,ciudades,pequena,zarandeo,lluvia,pregon,sello,gracia,gran,jacob,plagas,plaga1,plaga2,plaga3,plaga4,plaga5,plaga6,falso,huida,decreto,plaga7,liberacion,senales,especial,voz,venida,justos,traslacion,desolada,juzgan,segunda,jerusalen,asedio,trono,final,reino'&&!malas.length&&citas.length>=70&&
    E.every(e=>e.t&&e.c&&e.cuando&&e.nota&&e.egw&&/\b(CS|PE|EUD) \d/.test(e.egw)&&ULTIMOS.fases.some(f=>f[0]===e.fase))&&
    ULTIMOS.fases.map(f=>f[0]).join()==='antes,angustia,venida,mil,fin'&&ULTIMOS.fases.every(([f],i)=>E.filter(e=>e.fase===f).length&&E.findIndex(e=>e.fase===f)>=(i?E.map(e=>e.fase).lastIndexOf(ULTIMOS.fases[i-1][0]):0)),
    'Los últimos acontecimientos: 38 (con las siete plagas desde v231), en el orden de CS, PE y EUD, en 5 fases; cada uno con su página de Elena de White; las citas, literales'+(malas.length?' ('+malas[0][0]+')':''));
  ok(cols==='d2,d7,d8,d11,d12,mt24,ap12,ap13,ap14,ap16,ap17,ap18,ap19,ap20,ap21,apo,egw'&&
    E.every(e=>Object.entries(e.l).every(([k,x])=>ULTIMOS.libros.some(y=>y[0]===k)&&k!=='egw'&&x[0]&&(x[1]===0||x[1]===1)&&x[2]&&x[3]&&Array.isArray(x[4])&&(k==='mt24'?!x[4].length:true))),
    'Las columnas: Daniel 2, 7, 8, 11, 12, Mateo 24, Apocalipsis 12, 13, 14, 16, 17, 18, 19, 20, 21-22 y otros, y Elena de White; cada celda con referencia, si es explícito o interpretación, una línea y su fuente; Mateo sin comillas');
  ok(ord.indexOf('pequena')<ord.indexOf('gracia')&&ord.indexOf('gracia')<ord.indexOf('jacob')&&ord.indexOf('especial')<ord.indexOf('venida')&&ord.indexOf('voz')<ord.indexOf('venida')&&ord.indexOf('segunda')<ord.indexOf('jerusalen')&&ord.indexOf('jerusalen')<ord.indexOf('final')&&ord.indexOf('zarandeo')<ord.indexOf('lluvia')&&ord.indexOf('venida')<ord.indexOf('desolada')&&ord.indexOf('desolada')<ord.indexOf('reino'),
    'El orden: el pequeño tiempo de angustia antes del cierre y la angustia de Jacob después; la resurrección especial y la voz de Dios antes de la venida; la segunda resurrección, la Nueva Jerusalén y después la destrucción final');
  /* v221 (Camilo, 14-oct: «corrobora el orden»): la imagen se levanta al imponer el domingo
     (CS 498, 502): van a la vez; desde la ley hasta el cierre, todo lo de la crisis va a la vez
     (PE 33 y 85-86; CS 661-671), con el zarandeo decisivo en CS 666. */
  const vez=v=>E.filter(e=>e.vez===v).map(e=>e.id).join();
  ok(vez('ley')==='imagen,ley'&&vez('crisis')==='ciudades,pequena,zarandeo,lluvia,pregon,sello'&&!ev('juicio').vez&&!ev('gracia').vez&&
    ULTIMOS.veces&&/CS 498 y 502/.test(ULTIMOS.veces.ley)&&/PE 33 y 85-86/.test(ULTIMOS.veces.crisis)&&/CS 666/.test(ev('zarandeo').egw)&&/Laodicea/.test(ev('zarandeo').cuando),
    'Lo simultáneo va «a la vez»: imagen y ley dominical; y, de la ley al cierre, salida de las ciudades, pequeño tiempo de angustia, zarandeo, lluvia tardía, fuerte pregón y sellamiento');
  /* Lo que Camilo pidió revisar: zarandeo, lluvia tardía y ley dominical en Daniel 11-12
     solo por interpretación (Daniel 11:41, 44), nunca como texto explícito ni en 12:3 o 12:10. */
  ok(['zarandeo','lluvia','ley'].every(id=>ev(id).l.d11&&ev(id).l.d11[1]===0&&!ev(id).l.d12)&&!ev('pregon').l.d12&&ev('gran').l.d12[1]===1&&ev('liberacion').l.d12[1]===1&&ev('gracia').l.d12[1]===0&&
    ev('falso').l.mt24[1]===1&&ev('ley').l.mt24[1]===0&&ev('ley').l.ap17&&ev('ley').l.ap13[1]===0&&ev('imagen').l.ap13[1]===1,
    'Daniel 11-12: el zarandeo (11:41), la lluvia tardía (11:44) y la ley dominical (11:41) van como interpretación con su fuente; el tiempo de angustia y la liberación (12:1) son texto');
  const refs=E.map(e=>Object.values(e.en).join(' ')).join(' | ');
  ok(['12:1','12:2','12:13','14:6-7','15:1','16','18:1-4','7:1-4','13:16-17','19:11-16','20:1-3','20:4','21:2','22:11','2:34','2:35','7:9-10','8:14','11:41','11:44','11:45','24:9','24:15','24:23-27','17:12-13','12:17'].every(r=>refs.includes(r))&&
    !ev('gracia').en.d2&&!ev('plagas').en.d7&&!ev('desolada').en.d8&&ev('venida').en.d2&&ev('venida').en.d7&&ev('venida').en.d8&&!ev('venida').en.d2.includes('35')&&ev('reino').en.d2.includes('35'),
    'Cada acontecimiento dice qué capítulo lo muestra: la piedra en la venida (2:34) y el monte en el reino eterno (2:35); Daniel 11-12, Mateo 24 y Apocalipsis cuentan lo de en medio');
  ok(/class="cmp-ult"/.test(js)&&/function cmpUlt\(/.test(js)&&/ultHTML\(\)\+/.test(js)&&/function lamUltHTML\(/.test(js)&&/lamUltHTML\(lamUltDe\(p\.id\)\)/.test(js),'La secuencia está en Comparar y en las láminas (la piedra, el monte, el juicio y el tramo futuro)');
  /* 5. La auditoría: lo que se corrigió no vuelve. */
  const D2=fs.readFileSync(path.join(RAIZ,'fuente','complementos','daniel','d2.js'),'utf8'),D7=fs.readFileSync(path.join(RAIZ,'fuente','complementos','daniel','d7.js'),'utf8'),
    LJ=fs.readFileSync(path.join(RAIZ,'fuente','laminas.js'),'utf8'),PR=fs.readFileSync(path.join(RAIZ,'fuente','complementos','profundizar.js'),'utf8');
  ok(!/«Sin mano»|«[Nn]o con mano»|quien le ayude|«tú eres la cabeza de oro»|«no a la tierra, sino»|el reino se da a los santos \(7:14/.test(D2+D7+LJ+PR)&&
    /lo recibe el Hijo del hombre \(7:14\) y lo reciben los santos/.test(LJ)&&/empieza después de sus 1\.260 años/.test(D7),
    'Auditoría v215: las citas de 2:34, 2:38, 11:45 y CS 477 literales; 7:14 es el Hijo, no los santos; el juicio empieza después de los 1.260 años');
  /* 1. «Quién estudia». */
  ok(/class="alu-btn nuevo" onclick="agregaPersona\(\)"><span class="alu-av mas"/.test(js)&&/IC\('check','alu-act-ok'\)/.test(css+js)&&/\.ident-cuerpo \.alu-act\{position:relative;display:grid/.test(css),
    '«Quién estudia»: las actividades son filas (actividad arriba, categoría abajo) y «Agregar persona» es una fila con su círculo');
}

/* v217: la lámina en el teléfono (Camilo, 14-oct, captura del iPhone). Lo que se ve lo mide
   tools/en-navegador.js a 390 y 430; aquí, que los datos y el código lo sostengan. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const css=fs.readFileSync(FUENTE('estilos.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
  /* 1. Cada paso de la historia con su propia escena: ninguno repite la de otro. */
  const rep=Object.keys(LAMINAS).filter(k=>LAMINAS[k].historia).map(k=>{const L=LAMINAS[k],fs_=L.historia.map(h=>h.f).concat(L.despues?[L.despues.f]:[]).filter(Boolean);
    return fs_.filter((f,i)=>fs_.indexOf(f)!==i).map(f=>k+':'+f);}).flat();
  ok(!rep.length,'Ningún paso de la historia de una lámina repite la escena de otro'+(rep.length?' ('+rep.join(', ')+')':''));
  ok(LAMINAS.d7.despues.f==='recuerdo'&&fs.existsSync(path.join(RAIZ,'laminas','d7','recuerdo.webp'))&&fs.existsSync(path.join(RAIZ,'tools','lamina-recuerdo.py')),
    'Daniel 7:28 («guardé el asunto en mi corazón») tiene su escena (recuerdo.webp), no el mar de 7:2');
  const faltan=Object.keys(LAMINAS).flatMap(k=>{const L=LAMINAS[k];return L.historia?L.historia.map(h=>h.f).concat(L.despues?[L.despues.f]:[],L.cierre&&L.cierre.f?[L.cierre.f]:[])
    .filter(f=>f&&!fs.existsSync(path.join(RAIZ,'laminas',(f.includes('/')?'':L.dir)+f+(/\.\w+$/.test(f)?'':'.webp')))).map(f=>k+':'+f):[];});
  ok(!faltan.length,'Toda escena que declara un paso existe en laminas/'+(faltan.length?' ('+faltan.join(', ')+')':''));
  ok(/\.\.\.\[L\.despues,L\.cierre\]\.filter\(x=>x&&x\.f\)\.map\(x=>x\.f\)/.test(js),'La precarga de Daniel 7 incluye la escena de 7:28 y la del cierre');
  /* 2. Ningún nombre es enlace dentro de un título. */
  ok(/const PER_TITULOS=new Set\(\[[^\]]*'lam-p2'[^\]]*'lam-nav-p'[^\]]*\]\)/.test(js)&&/role="heading"/.test(js)&&/class="lam-chip-t"/.test(js),
    'Los personajes no se vuelven enlace en títulos (h1-h6, cabecera de la hoja, «Sigue…», rótulo de la imagen)');
  /* 3. La barra de Anterior/Siguiente al pie de la pantalla, con su espacio reservado. */
  ok(/\.lam:not\(\.pres\) \.lam-pie \.lam-nav\{position:fixed;left:0;right:0;bottom:0/.test(css)&&/env\(safe-area-inset-bottom,0px\)\) max\(16px/.test(css)&&
    /\.lam\.con-nav:not\(\.pres\)\{padding-bottom:calc\(var\(--lam-nav-h,72px\) \+ 16px\)\}/.test(css)&&/function lamNavAlto\(\)/.test(js)&&/id="lamPie"/.test(js),
    'En el teléfono la barra de Anterior/Siguiente va fija al pie (con el área segura) y la lámina reserva su alto');
  ok(/\.lam\.pres:not\(\.ancho\)\{padding-bottom:0\}/.test(css),'Al presentar en el teléfono los botones ‹ › van al borde de la pantalla');
  /* 4. El navegador de partes y la fila de pasos. */
  ok(/\.lam:not\(\.pres\) \.lam-riel-l>li\{flex:0 0 104px;width:104px;scroll-snap-align:start\}/.test(css)&&/scroll-snap-type:x proximity/.test(css)&&/\.lam-ri-t small:not\(\.lam-ri-f\)\{display:none\}/.test(css),
    'El navegador de partes en el teléfono es una tira de tarjetas de 104 px (tres a la vista y la siguiente asomando), con imán');
  ok(/function lamMarcaPaso\(k\)\{[\s\S]{0,900}scrollTo\(\{left:x/.test(js)&&/-webkit-mask-image:linear-gradient\(90deg,transparent 0,#000 var\(--fi\)/.test(css),
    'La fila de pasos corre sola al paso activo y desvanece el borde donde hay más');
}

/* v222: la lámina de Daniel 8 (como Daniel 7: escenas). Las imágenes y las piezas existen,
   los textos y lo citado son literales en RV1995, el recorrido va en orden, cada movimiento
   tiene sus piezas dentro de su imagen, la cuenta de los 2.300 años cuadra y Daniel 8 entra
   en Comparar y en los últimos acontecimientos. Lo que se ve, en tools/en-navegador.js. */
{
  const {LAMINAS,ULTIMOS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const {VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const L=LAMINAS.d8,n=t=>String(t).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/<[^>]+>/g,'').replace(/[«»“”—,.;:¿?¡!]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const d8=n(Object.values(VERS.d8).join(' ')),dan=n(['d2','d7','d8','d9','d12'].flatMap(k=>Object.values(VERS[k])).join(' ')+' '+Object.values(VERS_AP).flatMap(c=>Object.values(c)).join(' '));
  ok(L&&L.tipo==='escenas'&&L.comparar==='d2'&&L.comparar2==='d7','Daniel 8 es una lámina de escenas que se compara con Daniel 2 y Daniel 7');
  const ruta=f=>path.join(RAIZ,'laminas',(f.includes('/')?'':L.dir)+f+(/\.\w+$/.test(f)?'':'.webp'));
  const fs8=[L.inicioF,L.miniF,L.cartel.f,...L.partes.map(p=>p.img),...L.historia.map(h=>h.f),L.despues.f,L.cierre.f,...L.escenas.map(e=>e.f),...L.precarga];
  const faltan=[...new Set(fs8)].filter(f=>!fs.existsSync(ruta(f)));
  ok(!faltan.length&&['ulai','gabriel','santuario','carnero-solo.png','macho-cabrio-solo.png','cuernos-cuatro.png','cuerno-roto.png'].every(f=>fs.existsSync(ruta(f))),
    'Las imágenes de Camilo y las piezas de tools/lamina-d8.py están en laminas/d8 ('+new Set(fs8).size+')'+(faltan.length?' — faltan '+faltan.join(', '):''));
  const textos=[...L.partes.flatMap(p=>[p.texto,p.texto2]),...L.historia.map(h=>h.texto),L.despues.texto,L.cierre.texto,L.intro.texto,L.cartel.cita.texto];
  const malos=textos.filter(t=>!String(t).split('…').every(tr=>d8.includes(n(tr))));
  ok(!malos.length,'Cada texto de la lámina de Daniel 8 está literal en Daniel 8 RV1995 ('+textos.length+')'+(malos.length?': '+malos[0].slice(0,50):''));
  const citas=[...L.partes.flatMap(p=>p.interp.concat(p.corto)),...L.historia.map(h=>h.nota),L.despues.nota,L.cierre.nota,...L.reto.map(r=>r.q),...L.periodo.pasos.map(x=>x.nota)].flatMap(t=>[...String(t).matchAll(/«([^»]+)»/g)].map(m=>m[1]));
  const sueltas=citas.filter(c=>!dan.includes(n(c)));
  ok(citas.length>=25&&!sueltas.length,'Lo citado en la interpretación de Daniel 8 es literal ('+citas.length+')'+(sueltas.length?': '+sueltas.slice(0,3).join(' | '):''));
  const verso=r=>{const m=/^Daniel (\d+):(\d+)$/.exec(r);return m?VERS['d'+m[1]][m[2]]:'';};
  const pc=L.periodo.pasos.flatMap(x=>x.citas),pm=pc.filter(([r,c])=>!n(verso(r)).includes(n(c)));
  ok(pc.length>=6&&!pm.length,'Las citas de las 2.300 tardes y mañanas son literales (Daniel 7, 8 y 9)'+(pm.length?' ('+pm[0][0]+')':''));
  const P=id=>L.partes.find(p=>p.id===id);
  ok(L.partes.map(p=>p.id).join()==='carnero,macho,cuatro,cuerno,cielo,santuario,purificado,quebrantado'&&L.partes.every(p=>p.img&&p.c&&p.interp.length&&/\S/.test(p.fuente)&&p.corto),'Daniel 8: ocho partes, cada una con su imagen, interpretación y fuente');
  ok(P('carnero').reino==='Medo-Persia'&&P('macho').reino==='Grecia'&&P('cuerno').reino==='Roma imperial'&&P('cielo').reino==='Roma papal'&&P('santuario').reino==='Roma papal'&&P('purificado').de===1844&&P('quebrantado').fin==='venida'&&
    /550 a\.C\./.test(L.cartel.cuando)&&/tercer año de Belsasar/.test(L.cartel.cuando),'La lectura de Camilo: Medo-Persia, Grecia, Roma imperial y papal en un solo cuerno, 1844 y la venida; tercer año de Belsasar, 550 a.C.');
  ok(!/\b(según|para) (Bohr|Smith|Maxwell)\b|(Bohr|Smith|Maxwell) (dice|ve|explica|compara)/.test(JSON.stringify(L).replace(/fuente[^,]*,/g,'')),'Daniel 8, voz directa: los autores solo en la fuente');
  /* El recorrido, en orden. */
  const {rec8,cmp,cmpRio}=montar("rec8:(lamId='d8',lamRecorrido().map(x=>x.k).join(' ')), cmp:cmpModelo, cmpRio");
  ok(rec8==='h0 est carnero macho cuatro cuerno cielo santuario purificado x-periodo quebrantado desp cierre aplica','Daniel 8 en Explorar: la historia, la visión, cada parte, las 2.300 tardes y mañanas, la venida, Gabriel, el cierre y la pregunta para la vida ('+rec8+')');
  /* Cada movimiento: sus piezas existen y caen dentro de su imagen. */
  const M=L.mov,dentro=(c,w,h)=>c[0]>=0&&c[1]>=0&&c[2]<=w&&c[3]<=h&&c[0]<c[2]&&c[1]<c[3];
  const piezas=[[M.carnero.a,M.carnero],[M.carnero.b,M.carnero],[M.macho.cuerno,M.macho],...M.cabeza.cuernos.map(c=>[c,M.cabeza])];
  ok(piezas.every(([q,I])=>dentro(q.caja,I.w,I.h)&&q.base[0]>=q.caja[0]-20&&q.base[0]<=q.caja[2]+20&&fs.existsSync(ruta(q.f)))&&[M.carnero,M.macho,M.cabeza].every(I=>fs.existsSync(ruta(I.f)))&&M.cabeza.cuernos.length===4&&
    M.cabeza.cuernos.map(c=>c.t).join()==='Casandro,Lisímaco,Seleuco,Tolomeo'&&L.partes.filter(p=>p.mov).map(p=>p.mov).join()==='carnero,choque,cuatro,crece,cielo,santuario,purifica'&&L.partes.filter(p=>p.mov).every(p=>p.ms>=5000),
    'Cada movimiento de Daniel 8 tiene sus piezas en su imagen y tiempo para verse; los cuatro cuernos son Casandro, Lisímaco, Seleuco y Tolomeo');
  ok(M.mapa.va.map(v=>M.mapa.reinos[v.r].t+' '+v.s).join(', ')==='Macedonia 168 a.C., Siria 65 a.C., Judea 63 a.C., Egipto 30 a.C.'&&M.mapa.reinos[3].g,'El cuerno crece al oriente (Macedonia, Siria), a la tierra gloriosa (Judea) y al sur (Egipto)');
  const lam=js.slice(js.indexOf('/* ── v222: DANIEL 8, LO QUE SE MUEVE'),js.indexOf('/* ── Explorar ── */\nfunction lamInicioE('));
  ok(lam.length>8000&&!/\.animate\(|url\(#|filter=/.test(lam)&&/requestAnimationFrame|lamTween/.test(lam)&&(lam.match(/if\(q\)\{/g)||[]).length>=6,'Daniel 8 se mueve con requestAnimationFrame, sin el.animate() ni url(#), y cada movimiento tiene su cuadro final quieto («reducir movimiento»)');
  /* La cuenta. */
  const Pe=L.periodo,L23=y=>y>0?y+456:y+457;
  ok(Pe.tras==='purificado'&&Pe.de===-457&&Pe.a===1844&&L23(1844)===2300&&L23(34)===490&&L23(27)===483&&2300-490===1810&&34+1810===1844&&Pe.pasos.map(x=>x.v).join()==='tm,decreto,semanas,resta,purif'&&Pe.ir[0][0]==='d7'&&Pe.ir[0][1]==='juicio',
    'Las 2.300 tardes y mañanas: de 457 a.C. a 1844 (sin año cero), 70 semanas hasta 34 d.C., 1.810 años después, y el paso al juicio de Daniel 7');
  /* Comparar y los últimos acontecimientos. */
  const Mo=cmp(LAMINAS),fila=k=>Mo.filas.find(f=>f.key===k),ids=(f,c)=>((f&&f.celdas[c])||[]).map(p=>p.id).join();
  ok(Mo.cols.join()==='d2,d7,d8'&&ids(fila('-539'),'d8')==='carnero'&&ids(fila('-331'),'d8')==='macho,cuatro'&&ids(fila('-168'),'d8')==='cuerno'&&ids(fila('538'),'d8')==='cielo,santuario'&&ids(fila('1844'),'d8')==='purificado'&&ids(fila('fin-venida'),'d8')==='quebrantado'&&!ids(fila('-605'),'d8')&&/Medo-Persia/.test(L.noTrae['-605']),
    'Comparar suma la columna de Daniel 8: carnero, macho cabrío y cuatro cuernos, Roma imperial, papal, 1844 y la venida; Babilonia no, y dice por qué');
  ok(L.paralelo.every(r=>r.length===6&&(r[3]===null||[].concat(r[3]).every(k=>LAMINAS.d2.capas.includes(k)||['piedra','monte'].includes(k)))&&LAMINAS.d7.partes.some(p=>p.id===r[5])),'Con Daniel 2 y 7: cada parte enciende su metal y muestra su parte de Daniel 7');
  const ev=id=>ULTIMOS.eventos.find(e=>e.id===id);
  ok(ev('juicio').l.d8&&ev('juicio').l.d8[0]==='8:14'&&ev('venida').l.d8[0]==='8:25'&&ev('juicio').partes.includes('purificado')&&ev('venida').partes.includes('quebrantado')&&ULTIMOS.eventos.filter(e=>e.l.d8).length===2,
    'Los últimos acontecimientos: Daniel 8 solo donde aplica (el juicio en 8:14 y la venida en 8:25), y su lámina los muestra');
  const CD=require(path.join(RAIZ,'fuente','complementos','daniel.js')),s8=CD.secciones.d8.map(x=>x.t).join(' | ');
  ok(['Antíoco','457 a.C. a 1844','Expiación','primero a lo ancho'].every(t=>s8.includes(t))&&CD.secciones.d8.every(x=>/Fuente:/.test(x.h)),'Daniel 8 explica (🧭) la cuenta de 457 a 1844, la purificación como juicio, hacia dónde crece el cuerno y por qué no es Antíoco');
  /* v223 (Camilo, 14-oct 22:01). */
  ok(L.inicioF==='ulai'&&L.cartel.f==='ulai'&&L.portada==='portada'&&L.historia[0].f==='ulai',
    'v223: Daniel 8 abre (Explorar y Presentar) solo en el río Ulai; los animales llegan en su parte (la portada del capítulo sigue con ellos)');
  const png=f=>{const b=fs.readFileSync(ruta(f));return [b.readUInt32BE(16),b.readUInt32BE(20)];},[cw,ch]=png('cuernos-cuatro.png');
  ok(M.cabeza.w===cw&&M.cabeza.h===ch&&cw<=800&&ch<=800,'v223: la cabeza rubia de los cuatro cuernos (cuernos-cuatro.png '+cw+' × '+ch+') manda en las piezas de tools/lamina-d8.py');
  ok(M.carnero.dirs.map(d=>d.t+' '+d.s).join(' | ')==='al poniente Babilonia 539 a.C. | al norte Lidia 546 a.C. | al sur Egipto 525 a.C.'&&/al poniente, Babilonia \(539 a\.C\.\); al norte, Lidia \(546\); al sur, Egipto \(525\)/.test(P('carnero').interp.join(' ')),
    'v223: el carnero hiere al poniente (Babilonia 539), al norte (Lidia 546) y al sur (Egipto 525), como Bohr, Daniel 1-10, p. 295');
  const Mp=M.mapa,app8=js.slice(js.indexOf('function lamMovCrece'),js.indexOf('/* Hasta el ejército del cielo'));
  ok(Mp.rosa&&Mp.rosa.vientos.map(v=>v[1]).join()==='n,e,s,o'&&Mp.pasos.length===4&&/«De uno de ellos»: de uno de los cuatro vientos/.test(Mp.pasos[1][0])&&/Simposio sobre Daniel/.test(Mp.pasos[1][1])&&!/deduc/.test(Mp.pasos.join(' '))&&Mp.roma[0]<Mp.rosa.c[0]-Mp.rosa.dx+80&&
    /paso\(0\)[\s\S]*poniente\(\)[\s\S]*paso\(2\)[\s\S]*paso\(3\)/.test(app8)&&/«ellos» \(<i>mehem<\/i>\) es masculino y «cuernos» \(<i>qeranot<\/i>\) es femenino/.test(P('cuerno').interp.join(' '))&&!/deduc/.test(P('cuerno').interp.join(' '))&&/solo puede ser el oeste/.test(P('cuerno').interp.join(' '))&&/Simposio sobre Daniel<\/i>, p\. 394-399/.test(P('cuerno').fuente),
    'v223/v225: el cuerno pequeño sigue 8:8-9: los cuatro vientos, «de uno de ellos» (uno de los vientos, por el género hebreo), Roma (el oeste, de Hasel, Simposio sobre Daniel, p. 399, no una deducción de la app), y después crece al oriente, a la tierra gloriosa y al sur');
  const appC=js.slice(js.indexOf('function lamMovChoque'),js.indexOf('function lamMovCuatro'));
  ok(/cuerpo\.style\.opacity=\(1-f\)/.test(appC)&&/lamTween\(1600,cae\)/.test(appC),'v223: el carnero cae a tierra y se apaga (8:7); al final queda solo el macho cabrío, sin cuerpos encimados');
  const T=L.linea2300,Hy=T.hitos.map(h=>h.y),sinCero=(a,n)=>a+n+(a<0&&a+n>0?1:0);
  ok(Hy.join()==='-457,-408,27,31,34,1844'&&sinCero(-457,2300)===1844&&sinCero(-457,49)===-408&&sinCero(-457,483)===27&&27+7===34&&34+1810===1844&&2300-490===1810&&
    T.reinos.map(r=>r[2]).join()==='Persia,Grecia,Roma imperial,Roma papal,El juicio'&&/function lamL23tHTML/.test(js)&&/onclick="lamL23tToca\(/.test(js),
    'v223: la línea de tiempo de Daniel 8 dibuja los 2.300 años (457 a.C. – 1844), las 70 semanas (408, 27, 31, 34) y los reinos, con cada fecha para tocar');
  const q23=T.hitos.flatMap(h=>[...h.n.matchAll(/«([^»]+)»/g)].map(m=>m[1])),q23m=q23.filter(c=>!dan.includes(n(c)));
  ok(q23.length>=3&&!q23m.length,'v223: lo citado en las fechas de los 2.300 años es literal (Daniel 9 RV1995)'+(q23m.length?': '+q23m[0]:''));
  const css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8'),m600=(css.match(/@media \(max-width:600px\)\{[\s\S]*?\n\}/g)||[]).join('');
  ok(/\.lam-d2\{display:none!important\}/.test(m600)&&/\.lam-d2-fila:not\(\[hidden\]\)\{display:flex;flex-wrap:wrap/.test(m600)&&/function lamD2Fila/.test(js)&&/lamD2Fila\(r\)/.test(js),
    'v223: en el teléfono la comparación con Daniel 2 y 7 va debajo de la imagen en pastillas que se doblan (no se corta)');
  /* v224 (Camilo, 15-oct): el continuo es del atrio y del lugar santo (Bohr, Daniel 1-10, p. 308-313). */
  const Sa=L.mov.santuario,cs=Sa.cosas;
  ok(cs.map(c=>c.id).join()==='altar,mesa,candelabro,incienso'&&!cs.some(c=>/arca/i.test(c.t+c.s+c.c))&&/confesionario/.test(cs[3].c)&&/María y los santos/.test(cs[3].c)&&/misa/.test(cs[0].c)&&
    Sa.verdad&&/Ley/.test(Sa.verdad.s)&&/7:25/.test(Sa.verdad.c)&&cs.every(c=>!c.en||(c.en.length===2&&c.en[0]>0&&c.en[0]<1200&&c.en[1]>0&&c.en[1]<675)),
    'v224: el continuo en cuatro piezas (altar del holocausto → la misa, mesa → la tradición, candelabro → la iglesia a oscuras, altar del incienso → el confesionario, María y los santos), «la verdad» aparte, sin el arca; los puntos salen de coordenadas de la imagen');
  /* v225: la imagen nueva de Camilo trae el altar del incienso al centro (con humo), delante del velo;
     el cuerno sube de abajo al centro y su punta llega a la altura del altar (x ≈ 624, y ≈ 337 en la escena). */
  const inc=cs.find(c=>c.id==='incienso'),san=fs.readFileSync(ruta('santuario')),wv=san.toString('latin1',12,16);
  ok(inc.en&&inc.en[0]>520&&inc.en[0]<660&&inc.en[1]<320&&cs.find(c=>c.id==='altar').en==null&&cs.filter(c=>c.en).map(c=>c.id).join()==='mesa,candelabro,incienso'&&
    cs.find(c=>c.id==='candelabro').en[0]<300&&cs.find(c=>c.id==='mesa').en[0]>900&&/^VP8/.test(wv)&&san.length<260000,
    'v225: con la imagen nueva llevan punto el candelabro (izquierda), la mesa (derecha) y el altar del incienso (centro, arriba de la punta del cuerno); el altar del holocausto y «la verdad», sin punto; santuario.webp pesa '+Math.round(san.length/1024)+' KB');
  ok(L.d2Abajo&&L.d2Abajo.includes('santuario')&&L.d2Abajo.includes('purificado')&&/function lamLey8HTML/.test(js)&&/class="d8-num"/.test(js)&&!/d8-punto/.test(js.slice(js.indexOf('function lamMovSantuario'),js.indexOf('function lamMovPurifica')))&&cs.every(c=>!c.dy&&!c.tel),
    'v226: el santuario lleva puntos numerados y la lista de las señas debajo (sin rótulos encima), y la comparación va debajo de la imagen');
  const d8txt=JSON.stringify(L)+fs.readFileSync(path.join(RAIZ,'fuente','complementos','daniel','d8.js'),'utf8');
  /* v227 (Camilo): la lista posterior de Bohr (antigónidas, seléucidas, tolomeos, atálidas) puede ir en
     una sola línea con su fuente; el cuerno pequeño sigue sin salir de Pérgamo. */
  const d8sin=d8txt.replace(/\/\*[\s\S]*?\*\//g,''),lineaBohr=L.partes.find(p=>p.id==='cuatro').interp.filter(t=>/atálidas/.test(t));
  ok(!/Atalo|de uno de los cuernos[^»]*(sale|ve)|Otra lectura del hebreo/i.test(d8sin)&&(d8sin.match(/Pérgamo|atálidas/gi)||[]).length===2&&lineaBohr.length===1&&/Bohr, <i>Daniel 1-10<\/i>, p\. 297/.test(lineaBohr[0])&&!/cuerno/.test(lineaBohr[0])&&!/atalo-iii/.test(fs.readFileSync(path.join(RAIZ,'fuente','personajes.js'),'utf8')),
    'v224: Daniel 8 sin la lectura «de uno de los cuernos» (Pérgamo, Atalo III), decisión de Camilo; v227: los atálidas solo en la línea de Bohr, p. 297');
  const fuera=t=>String(t).replace(/<[^>]+>/g,'').replace(/«[^»]*»/g,'').replace(/"[^"]*"/g,'');
  const expl=[...L.partes.flatMap(p=>p.interp.concat(p.corto)),...CD.secciones.d8.map(x=>x.h)].map(fuera).filter(t=>/sacrificio continuo|continuo sacrificio|sacrificio diario/i.test(t));
  ok(!expl.length,'v224: en Daniel 8 el texto que explica dice «el continuo»; «sacrificio continuo» solo dentro de las citas'+(expl.length?': '+expl[0].slice(0,60):''));
  ok(/agregaron los traductores/.test(P('santuario').interp[0])&&/agregaron los traductores/.test(P('purificado').interp[0]),'v224: en 8:11 y en 8:13 la lámina dice que «sacrificio» lo agregaron los traductores');
  const C8=require(path.join(RAIZ,'fuente','contenido.js')),c8=JSON.stringify(C8.CONTENIDO?C8.CONTENIDO.d8:C8.d8||'');
  ok(c8.length>1000&&!/pisotea 2\.300|guerra verbal|perplejo|Ese año, sin haber|en cada una de las tres/.test(c8)&&/estaba espantado a causa de la visión, y no la entendía/.test(c8)&&/1818/.test(c8),
    'v223: Daniel 8 en el estudio, sin los errores de la auditoría (2.300 no es el tiempo del pisoteo, 8:27 literal, Miller en 1818, Darío no estuvo en el Gránico)');
}

/* v227 (Camilo, 15-oct): cada vez que Elena de White aplica un texto, su cita literal y una línea;
   las dos lecturas del continuo lado a lado; las once señas en tres pasos; la pregunta para la vida;
   el reparto del reino de Alejandro; purificado.webp es la imagen de Camilo. */
{
  const {LAMINAS,ULTIMOS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
  const js=APP;
  const n=t=>String(t).replace(/<[^>]+>/g,'').replace(/[«»“”—]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  const dan=n(Object.keys(VERS).filter(k=>/^d\d+$/.test(k)).flatMap(k=>Object.values(VERS[k])).join(' '));
  const E=ULTIMOS.eventos,ev=id=>E.find(e=>e.id===id);
  const conC=E.filter(e=>e.egwC&&e.egwC.length);
  ok(conC.length>=29&&conC.every(e=>e.egwC.every(([r,q,l])=>/^CS \d+(-\d+)?$/.test(r)&&q.length>25&&!/[«»]/.test(q)&&l&&l.length<160))&&!ev('ciudades').egwC&&/function ultEgwHTML/.test(js),
    'v227: los últimos acontecimientos traen la cita literal de Elena de White (solo de CS, el libro que está en la biblioteca) y una línea que la explica ('+conC.length+' eventos)');
  const mt=ev('gran').l.mt24,jz=ev('juzgan').l.d7;
  ok(mt&&mt[0]==='24:21-22'&&/1260/.test(mt[2])&&/cierre de la gracia/.test(mt[2])&&(mt[5]||[]).filter(x=>/^CS (309|28|672)$/.test(x[0])).length===4,
    'v227: Mateo 24:21-22 se cumple en los 1260 años y en la tribulación final, con CS 309 (dos), CS 28 y CS 672 literales');
  ok(jz&&jz[0]==='7:22'&&(jz[5]||[]).some(x=>x[0]==='CS 719'&&/se dio el juicio a los santos del Altísimo/.test(x[1])&&x[2]),
    'v227: el juicio del milenio en Daniel 7 sigue en 7:22, con CS 719 literal y su línea');
  const todo=['laminas.js','contenido.js','complementos/daniel/d2.js','complementos/daniel/d7.js','complementos/daniel/d8.js'].map(f=>fs.readFileSync(path.join(RAIZ,'fuente',f),'utf8')).join('\n');
  /* 1T 361 se queda (Camilo: «no lo quites»; la fuente la trae él, pendiente en el ESTADO). */
  ok(/1T 361\). Estamos en los dedos/.test(todo)&&/Hoy estamos en los dedos: el mundo sigue dividido \(1T 361\)/.test(todo)&&!/no se puede comprar|Tanto la Roma pagana/.test(todo),
    'v227: 1T 361 («estamos en los dedos») sigue en Daniel 2; sin «un Juez que no se puede comprar» y sin «Tanto la Roma pagana…»');
  const L7=LAMINAS.d7,L8=LAMINAS.d8,P8=id=>L8.partes.find(p=>p.id===id),cu7=L7.partes.find(p=>p.id==='cuernos').interp.join(' ');
  ok(/por una hora/.test(cu7)&&/Apocalipsis 17:12-13|17:12-13/.test(cu7)&&/2:43/.test(cu7)&&/Maxwell/.test(L7.partes.find(p=>p.id==='cuernos').fuente),
    'v227: «nunca se volvieron a unir» con Apocalipsis 17:12-13 («por una hora»), Daniel 2:43 y Maxwell en la fuente');
  const sa=P8('santuario');
  ok(/dos lecturas/i.test(sa.interp.join(' '))&&/el paganismo/.test(sa.interp.join(' '))&&/Smith/.test(sa.fuente)&&/157-159/.test(sa.fuente)&&/Dos lecturas del continuo, lado a lado/.test(todo),
    'v227: las dos lecturas del continuo, cada una con su fuente (Smith p. 157-159; Bohr p. 307-312), lado a lado');
  const cont=fs.readFileSync(path.join(RAIZ,'fuente','contenido.js'),'utf8'),c8=cont.slice(cont.indexOf('<em>tamid</em>'),cont.indexOf('<em>tamid</em>')+3000);
  ok(/9:26/.test(c8)&&/9:27/.test(c8)&&/Mateo 27:51/.test(c8)&&/8:10-11/.test(c8),'v227: solo la fase papal quita el continuo: Daniel 9:26, 9:27, Mateo 27:51 y 8:10-11');
  const G=L7.senasGrupos,idx=G.flatMap(g=>g.s).sort((a,b)=>a-b).join();
  const {pres7g}=montar("pres7g:(lamId='d7',lamPasosE().map(x=>x.tipo).join(' '))");
  ok(G.length===3&&G.map(g=>g.t).join('|')==='De dónde sale|Qué es|Qué hace'&&idx===[...Array(L7.senas.length).keys()].join()&&(pres7g.match(/senasG/g)||[]).length===3&&!/\bsenas\b/.test(pres7g),
    'v227: al presentar, las once señas van en tres pasos (de dónde sale, qué es, qué hace), cada una una sola vez');
  const fin=montar("p2:(lamId='d2',lamPasos().map(x=>x.tipo).pop()), p7:(lamId='d7',lamPasosE().map(x=>x.tipo).pop()), p8:(lamId='d8',lamPasosE().map(x=>x.tipo).pop()), r2:(lamId='d2',lamRecorrido().map(x=>x.k).pop()), r7:(lamId='d7',lamRecorrido().map(x=>x.k).pop()), r8:(lamId='d8',lamRecorrido().map(x=>x.k).pop())");
  const ap=['d2','d7','d8'].map(k=>LAMINAS[k].aplica);
  ok(Object.values(fin).every(v=>v==='aplica')&&ap.every(a=>a&&/\?$/.test(a.pregunta)&&/^Daniel \d+:\d+$/.test(a.ref)&&dan.includes(n(a.texto)))&&
    ap[2].pregunta==='¿Qué parte de la obra diaria de Cristo dejaste en manos de otro?'&&ap[1].ref==='Daniel 7:22'&&/piedra/.test(ap[0].pregunta),
    'v227: cada lámina (Daniel 2, 7 y 8) termina, al presentar y al explorar, con una pregunta para la vida atada a un texto literal');
  const {REPARTOS}=require(path.join(RAIZ,'fuente','laminas.js'));
  const cua=P8('cuatro'),R=REPARTOS[cua.reparto],notas=cua.pasos.map(x=>x.nota).join(' '),refs=cua.pasos.map(x=>x.ref+' '+x.nota).join(' ');
  const cit=[...notas.matchAll(/«([^»]+)»/g)].map(m=>m[1]),malas=cit.filter(c=>!dan.includes(n(c)));
  ok(cua.pasos.length===6&&R.gen.map(g=>g.t).join()==='Casandro,Lisímaco,Seleuco,Tolomeo'&&R.gen.map(g=>g.v).join('')==='ones'&&/281/.test(R.gen[1].roma)&&R.gen.every(g=>g.roma&&g.s)&&
    ['8:8','8:22','11:4'].every(r=>refs.includes(r))&&cua.pasos.every(x=>dan.includes(n(x.texto)))&&cit.length>=2&&!malas.length&&/Treiyer/.test(cua.fuente)&&/function lamReparto\(R,id,g,s,j\)/.test(js)&&/lamRepartoToca\(/.test(js)&&!L8.mov.reparto&&!/LAMINAS|LAM\(\)|'cuatro'|d8\./.test(js.slice(js.indexOf('function lamReparto('),js.indexOf('function lamMovCielo'))),
    'v227: el reparto del reino de Alejandro: cuatro generales en el mapa de los vientos, para tocar, con 8:8, 8:22 y 11:4 literales y cuándo los absorbió Roma'+(malas.length?' — '+malas[0]:''));
  const per=fs.readFileSync(path.join(RAIZ,'fuente','personajes.js'),'utf8');
  ok(/id: 'alejandro-iv'/.test(per)&&/id: 'heracles'/.test(per)&&/Treiyer/.test(per),'v227: los herederos de Alejandro (Alejandro IV y Heracles) son personajes, con su fuente');
  const pu=fs.readFileSync(path.join(RAIZ,'laminas','d8','purificado.webp')),py=fs.readFileSync(path.join(RAIZ,'tools','lamina-d8.py'),'utf8');
  const vp=pu.toString('latin1',12,16),ancho=vp==='VP8 '?pu.readUInt16LE(26)&0x3fff:vp==='VP8X'?1+pu.readUIntLE(24,3):0,alto=vp==='VP8 '?pu.readUInt16LE(28)&0x3fff:vp==='VP8X'?1+pu.readUIntLE(27,3):0;
  ok(ancho===1600&&alto===900&&!/guarda\([^)]*'purificado\.webp'/.test(py),'v227: purificado.webp es la imagen de Camilo (1600 × 900) y tools/lamina-d8.py ya no la genera ('+ancho+' × '+alto+')');
  const tr=L8.mapa&&L8.mapa.reinos?L8.mapa.reinos.find(r=>/Tracia/.test(r.t||r.s||'')):null;
  ok(!tr||!tr.en||tr.en[1]>150,'v227: «Tracia y Asia Menor» va debajo de «NORTE» (no se encima)');
}

/* v228 (Camilo, 15-oct): los hitos de la línea de tiempo y el panel «Quién estudia». */
{
  const js=APP,css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8');
  ok(/function lamHitosHTML/.test(js)&&/lam-hito juicio/.test(js)&&/lam-hito venida/.test(js)&&/lam-hito hoy/.test(js)&&/class="lam-corte"[^\n]{0,60}<b>\/\/<\/b>/.test(js)&&/class="lam-mil"/.test(js)&&!/class="lam-hoy"/.test(js),
    'v228: la línea de tiempo trae 1844 (juicio), la venida, hoy, el corte «//» y los mil años');
  ok(/@media \(prefers-reduced-motion:reduce\)\{\.lam-hito\.hoy::after\{animation:none/.test(css),'v228: «hoy» late, salvo con movimiento reducido');
  ok(!/Ya la tiene/.test(js)&&/Tu preparación actual/.test(js)&&/prep-chip/.test(js)&&/Escoge para qué te preparas/.test(js),'v228: el panel dice la preparación actual, las edades de cada categoría y para qué sirve');
}

/* v229 (Camilo, 15-oct): la escena llena su área al presentar; las señales de la liberación; la
   resurrección especial con «los que le traspasaron»; el nombre en el libro abierto. */
{
  const {ULTIMOS}=require(path.join(RAIZ,'fuente','laminas.js')),{VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const js=APP,css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8'),E=ULTIMOS.eventos,ev=id=>E.find(e=>e.id===id);
  ok(/function lamCubre\(V,lado\)/.test(js)&&/--lam-hoja-w/.test(js)&&/\.lam\.pres \.lam-d2\{display:none!important\}/.test(css)&&/innerHeight\*1\.45/.test(js)&&/const sinCmp=false;/.test(js),
    'v229: al presentar la escena llena su área (lamCubre) y «Con Daniel 2 y 7» va en pastillas, nunca sobre la escena');
  const se=ev('senales'),pg=se&&se.egwC.map(x=>+x[0].slice(3));
  ok(se&&se.fase==='venida'&&se.egwC.length===14&&pg.every((v,i)=>v>=693&&v<=697&&(!i||v>=pg[i-1]))&&!/\b12\b|doce/.test(se.t+se.nota)&&['liberacion','senales','especial'].every(id=>ev(id).vez==='medianoche')&&ULTIMOS.veces.medianoche&&
    se.l.ap16&&se.l.ap16[4].length===3,
    'v229: «Las señales de la liberación»: 14 citas literales de CS 693-697 en su orden, sin decir «12», a la vez que la liberación y la resurrección especial, con Apocalipsis 16:17, 18 y 21');
  const es=ev('especial'),tx=es.egwC.map(x=>x.join(' ')).join(' ');
  ok(/Los que le traspasaron/.test(tx)&&/se mofaron y se rieron de la agonía de Cristo/.test(tx)&&/S\. Mateo 26: 64/.test(tx)&&/Daniel 12: 2/.test(tx)&&es.egwC.every(x=>/^CS \d+$/.test(x[0])&&x[2])&&/Mateo 26:64/.test(es.nota),
    'v229: la resurrección especial con «los que le traspasaron», los que se burlaron y Mateo 26:64, cada uno con la cita literal de CS');
  const ap35=VERS_AP.ap3[5];
  ok(/function lamLibroNombre/.test(js)&&/b\.textContent=n\|\|'tu nombre'/.test(js)&&ap35.startsWith('El vencedor será vestido de vestiduras blancas, y no borraré su nombre del libro de la vida')&&
    js.includes('El vencedor será vestido de vestiduras blancas, y no borraré su nombre del libro de la vida</q><small>Apocalipsis 3:5')&&!/lb-nombre[^\n]*innerHTML/.test(js),
    'v229: el libro abierto lleva el nombre de quien estudia (con textContent; sin nombre, «tu nombre») y Apocalipsis 3:5 literal, con su condición');
}

/* v230 (Camilo, 15-oct): la línea de tiempo con todas sus fechas y los mil años desde la venida;
   en Explorar, la línea debajo de la escena; los nombres del libro abierto. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js')),js=APP;
  const pide={d2:[-605,-539,-331,-168,476,538,1798,1844],d7:[-605,-539,-331,-168,476,538,1798,1844],d8:[-539,-331,-301,-168,476,538,1798,1844]};
  const malos=Object.entries(pide).flatMap(([k,ys])=>{const L=LAMINAS[k],m=L.marcas.map(x=>x[0]),fu=L.futuro,ven=L.marcas.find(x=>/\bfut\b/.test(x[2]||''))[0];
    const ini=L.tiempo.map(id=>L.partes.find(p=>p.id===id).de).filter(y=>y<2026);
    return [...ys,...ini].filter(y=>!m.includes(y)).map(y=>k+' sin '+y).concat(ven===fu[1].de&&fu[0].a===fu[1].de&&fu[1].a===fu[2].de?[]:[k+': la venida no es el comienzo de los mil años']);});
  ok(!malos.length,'v230: cada reino con su fecha en la línea (Daniel 2 y 7: 605, 539, 331, 168, 476, 538, 1798, 1844; Daniel 8: 539, 331, 301, 168, 476, 538, 1798, 1844) y los mil años empiezan en la venida'+(malos.length?' — '+malos.join(', '):''));
  /* La pista: cada año del pasado tiene el color del reino que gobierna (sin degradados). */
  const pis=montar("p2:(lamId='d2',lamPista()), p7:(lamId='d7',lamPista()), p8:(lamId='d8',lamPista())"),mal=[];
  for(const [k,g] of [['d2',pis.p2],['d7',pis.p7],['d8',pis.p8]]){const L=LAMINAS[k],lin=g.slice(g.lastIndexOf('linear-gradient(90deg,')+22,-1);
    const st=[...lin.matchAll(/(#[0-9A-Fa-f]{6}|transparent) ([\d.]+)% ([\d.]+)%/g)].map(m=>[m[1],+m[2],+m[3]]);
    const pos=y=>(y+620)/(2626+620)*100;
    /* v231: donde se solapan, la pista lleva la parte más corta (Roma papal sobre Roma dividida, que va en
       su carril de abajo); después de la herida, Roma dividida continúa. */
    for(let y=-615;y<1844;y+=7){const x=pos(y),s=st.find(q=>x>=q[1]&&x<q[2]),act=L.tiempo.map(id=>L.partes.find(p=>p.id===id)).filter(p=>p.de!=null&&y>=p.de&&y<p.a),gob=act.filter(p=>!p.hasta).sort((a,b)=>(a.a-a.de)-(b.a-b.de))[0]||act[0];
      const quiere=gob?gob.c:'#4a4032';if(!s||s[0].toLowerCase()!==quiere.toLowerCase()){mal.push(k+' '+y+' '+(s&&s[0])+'≠'+quiere);break;}}}
  ok(!mal.length,'v230: la pista tiene, año por año, el color del reino que gobierna, de borde a borde, y gris donde el capítulo no tiene reino'+(mal.length?' — '+mal.join(', '):''));
  ok(/function lamTiempoAlMarco/.test(js)&&/function lamTiempoPega/.test(js)&&/function lamBordeAbajo/.test(js)&&/lam-l23-sec/.test(js),'v230: en Explorar la línea va debajo de la escena, se pega abajo al pasarla y el panel de las 2.300 tardes y mañanas sigue aparte');
  ok(/srvFetch\('\/nombres'\)/.test(js)&&/e\.textContent=x/.test(js)&&!/lb-otros[^\n]*innerHTML/.test(js),'v230: el libro abierto pide los nombres de pila al servidor y los escribe con textContent');
}

/* v231 (Camilo, 15-oct): las eras que se solapan van en dos carriles (Roma dividida, delgada, hasta
   la venida; Roma papal, encima hasta la herida); al elegir o llegar a una parte, el pulgar, la
   escena y el rótulo van a su INICIO; las catorce señales numeradas; las siete plagas. */
{
  const {LAMINAS,ULTIMOS}=require(path.join(RAIZ,'fuente','laminas.js')),{VERS_AP}=require(path.join(RAIZ,'fuente','biblia-apocalipsis.js'));
  const js=APP,E=ULTIMOS.eventos,ev=id=>E.find(e=>e.id===id),pa=(k,id)=>LAMINAS[k].partes.find(p=>p.id===id);
  const q=montar("r2:(lamId='d2',lamRangoTx(lamParte('dedos'))), r7:(lamId='d7',lamRangoTx(lamParte('cuernos'))), rp:(lamId='d7',lamRangoTx(lamParte('cuerno'))), "+
    "a2:(lamId='d2',lamQuien(1520).tx), b2:(lamId='d2',lamQuien(1820).tx), c2:(lamId='d2',lamQuien(500).tx), a7:(lamId='d7',lamQuien(1520).tx), "+
    "k2:(lamId='d2',lamCarrilHTML(LAMINAS.d2)), k7:(lamId='d7',lamCarrilHTML(LAMINAS.d7)), k8:(lamId='d8',lamCarrilHTML(LAMINAS.d8)), ven:(lamId='d2',lamHitos(LAMINAS.d2).ven)");
  ok(pa('d2','dedos').hasta==='venida'&&pa('d7','cuernos').hasta==='venida'&&!pa('d2','barro').hasta&&!pa('d7','cuerno').hasta&&
    q.r2==='476 d.C. – hasta la venida'&&q.r7==='476 d.C. – hasta la venida'&&q.rp==='538 d.C. – 1798 d.C.'&&/Maxwell, <i>El porvenir del mundo revelado<\/i>, p\. 39-40/.test(pa('d2','dedos').fuente+pa('d7','cuernos').fuente),
    'v231: Roma dividida (los diez dedos y los diez cuernos) va de 476 «hasta la venida» (2:43-44; Maxwell, p. 39-40); Roma papal, de 538 a 1798 ('+[q.r2,q.r7,q.rp].join(' · ')+')');
  ok(/^Roma papal; a la vez, Roma dividida sigue hasta la venida/.test(q.a2)&&/^Roma papal; a la vez, Roma dividida sigue hasta la venida/.test(q.a7)&&/^Roma papal, herida en 1798; restauración final futura, sin fecha fijada \(Ap 13:3, 11-15\); a la vez, Roma dividida sigue/.test(q.b2)&&/^Roma dividida, hasta la venida/.test(q.c2),
    'v231: al arrastrar, el rótulo dice primero la fase de arriba (Roma papal, después herida) y después que Roma dividida sigue a la vez ('+q.a2+' | '+q.b2+')');
  const kk=h=>(h.match(/class="lam-carril2"/g)||[]).length,lf=h=>{const m=h.match(/left:([\d.]+)%;width:([\d.]+)%/);return m?[+m[1],+m[1]+ +m[2]]:[];};
  const pos=y=>(y+620)/(2626+620)*100,[x0,x1]=lf(q.k2);
  ok(kk(q.k2)===1&&kk(q.k7)===1&&kk(q.k8)===0&&Math.abs(x0-pos(476))<.01&&Math.abs(x1-pos(q.ven))<.01&&/data-de="476"/.test(q.k7),
    'v231: el carril de abajo: Roma dividida, de 476 a la venida, en Daniel 2 y 7 (Daniel 8 no la trae)');
  const nPres=(js.match(/getElementById\('lamTano'\)\.textContent=lamRangoTx\(/g)||[]).length;
  ok(nPres>=4&&!/textContent=lamAnioTx\(p\.de\)\+' – '/.test(js)&&!/textContent=lamAnioTx\(q\.de\)\+' – '/.test(js)&&/r\.value=P\.de;(lamLineaPide\(\);)?document\.getElementById\('lamTano'\)/.test(js)&&!/r\.value=P\.a;/.test(js)&&
    /lamTramo\(p\.de,p\.a,p\.hasta\)/.test(js),
    'v231: en Explorar y en Presentar (Daniel 2, 7 y 8) el pulgar y el rótulo van al INICIO de la parte, con su tramo; la cuenta de los 1.260 años empieza en 538 ('+nPres+')');
  /* Las señales, numeradas del 1 al 14. */
  const se=ev('senales'),h=montar("h:ultDetHTML(ultIdx('senales'),'')").h;
  ok(se.egwNum===true&&se.egwC.length===14&&se.t==='Las señales de la liberación'&&(h.match(/<li>/g)||[]).length===14&&/<ol class="cmp-ult-num">/.test(h)&&!/\b12\b|doce/.test(se.t+se.nota),
    'v231: «Las señales de la liberación», numeradas del 1 al 14 (lista ordenada), sin «12»');
  /* Las siete plagas. */
  const ps=[1,2,3,4,5,6,7].map(n=>ev('plaga'+n)),ord=E.map(e=>e.id),vv=r=>{const [c,v]=r.split(':');return VERS_AP['ap'+c][+v];};
  const lit=ps.every(p=>p&&p.l.ap16&&p.l.ap16[1]===1&&p.l.ap16[4].every(([r,c])=>vv(r.replace('Apocalipsis ',''))&&vv(r.replace('Apocalipsis ','')).includes(c)));
  const nota=ps.every((p,i)=>{const v=[2,3,4,8,10,12,17][i];return p.nota.includes(VERS_AP.ap16[v].replace(/[.»]+$/,'').slice(0,60));});
  ok(ps.every(Boolean)&&lit&&nota&&ps.slice(0,6).every(p=>p.fase==='angustia'&&p.grupo==='copas')&&ps[6].fase==='venida'&&ps[6].vez==='medianoche'&&
    ord.indexOf('plagas')<ord.indexOf('plaga1')&&[1,2,3,4,5].every(n=>ord.indexOf('plaga'+n)+1===ord.indexOf('plaga'+(n+1)))&&ord.indexOf('plaga7')+1===ord.indexOf('liberacion'),
    'v231: las siete plagas de Apocalipsis 16, una fila cada una, en su orden y con su texto RV1995 literal; la séptima, a medianoche, con la liberación');
  const cita=e=>(e.egwC||[]).map(x=>x[0]+' '+x[1]).join(' | ');
  ok([1,2,3,4].every(n=>/CS 686/.test(cita(ev('plaga'+n))))&&!(ev('plaga5').egwC||[]).length&&/CS 618 .*no dice que sea en la sexta plaga/.test(ev('plaga6').egwC.map(x=>x.join(' ')).join())&&
    /CS 694 .*Hecho es/.test(cita(ev('plaga7')))&&/CS 695 .*Babilonia/.test(cita(ev('plaga7')))&&/CS 687 Estas plagas no serán universales/.test(cita(ev('plagas')))&&
    ['falso','huida','decreto'].every(id=>ev(id).grupo==='sin'&&!ev(id).vez)&&ULTIMOS.grupos&&/ni la Biblia ni Elena de White/.test(ULTIMOS.grupos.sin)&&/CS 687/.test(ULTIMOS.grupos.copas)&&
    /Apocalipsis 16:17, 18, 19 y 21/.test(ULTIMOS.veces.medianoche)&&ev('falso').l.ap16[3]==='CS 618'&&/cmp-ult-vz grupo/.test(js),
    'v231: Elena de White, literal: las plagas 1-4 (CS 686), que no son universales (CS 687) y la séptima en la liberación (CS 694-695); el falso Cristo, la huida y el decreto, sin plaga precisa');
}

/* v232 (Camilo, iPhone): al avanzar, la imagen entera y la línea de tiempo debajo con aire; la
   línea limpia detrás de una sola bandera (LAM_LIMPIA) para poder volver atrás. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js')),js=APP,css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8');
  const q=montar("a:(lamId='d8',lamSegmento(-320).tx), b:(lamId='d2',lamSegmento(1000).tx), c:(lamId='d2',lamSegmento(1820).tx), d:(lamId='d8',lamSegmento(1820).tx), e:(lamId='d7',lamSegmento(1900).tx), f:(lamId='d8',lamSegmento(-600).tx), g:(lamId='d8',lamQuien(1820).tx)");
  ok(q.a==='331 – 301 a.C. · Grecia'&&q.b==='538 – 1798 d.C. · Roma papal'&&/^476 d\.C\. – hasta la venida · Roma dividida$/.test(q.c)&&/^1798 – 1844 d\.C\. · Las 2\.300 tardes y mañanas$/.test(q.d)&&/^1844 d\.C\. – hoy · El juicio en el cielo$/.test(q.e)&&q.f==='Antes de 539 a.C. · Babilonia'&&!/Nabucodonosor/.test(q.g),
    'v232: encima de la línea, el tramo con sus fechas ('+[q.a,q.b,q.c,q.d,q.e,q.f].join(' | ')+'); Daniel 8 de 1798 a 1844 ya no dice «Antes de Nabucodonosor»');
  ok(/const LAM_LIMPIA=true;/.test(js)&&/PARA VOLVER A LA LÍNEA DE v231 basta poner/.test(js)&&/t\.classList\.add\('limpia'\)/.test(js)&&/\.lam-tiempo\.limpia \.lam-hley\{display:none!important\}/.test(css)&&
    (css.match(/\.lam-tk|\.lam-futx|\.lam-seg/g)||[]).length>=6&&!/\.lam-tiempo:not\(\.limpia\)/.test(css),
    'v232: la línea limpia cuelga de una sola bandera (LAM_LIMPIA) y de la clase .limpia: en false vuelve la de v231');
  ok(/function lamVeEscena/.test(js)&&/if\(lamModo!=='presentar'\)return lamVeEscena\(\);/.test(js)&&/lamModo!=='presentar'&&!lamAncho\(\)\)lamVeEscena\(\)/.test(js)&&!/document\.scrollingElement/.test(js)&&
    /\.lam:not\(\.pres\) \.lam-esc\{position:relative;top:auto\}/.test(css)&&/lam-tiempo\.en-marco:not\(\.fija\)\{margin-top:10px\}/.test(css),
    'v232: en el celular la imagen de Explorar ya no queda pegada arriba; al avanzar se ve entera (suave, salvo movimiento reducido) y la línea va debajo con aire');
}

/* v233 (Camilo: «claro, todas las fechas, que se memoricen, que abarque todo pero no se vea
   apeñuscado»): la línea de metro. Las estaciones de cada lámina, con las palabras de la lámina; el
   futuro (la venida, los mil años desde la venida, el reino); una bandera para volver a v232. */
{
  const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js')),js=APP,css=fs.readFileSync(path.join(RAIZ,'fuente','estilos.css'),'utf8');
  const fuente=fs.readFileSync(path.join(RAIZ,'fuente','laminas.js'),'utf8').split('\n').filter(l=>!/^\s*metro:/.test(l)).join('\n').toLowerCase();
  const quiere={d2:[-605,-597,-586,-539,-331,-168,476,538,1798,1844,2026,2226,2526],d7:[-605,-597,-586,-539,-331,-168,476,538,1798,1844,2026,2226,2526],d8:[-539,-457,-331,-301,-168,476,538,1798,1844,2026,2226,2526]};
  const mal=[];
  for(const id of ['d2','d7','d8']){const L=LAMINAS[id],E=L.metro&&L.metro.est||[];
    if(E.map(e=>e[0]).join()!==quiere[id].join())mal.push(id+' estaciones '+E.map(e=>e[0]).join());
    E.filter(e=>!e[2]||e[2]==='juicio').forEach(([y,n,c,k])=>{if(!L.marcas.some(m=>m[0]===y)&&!(L.hitos||[]).includes(y))mal.push(id+' '+y+' sin marca');
      [n.replace(/\s*\(.*\)/,''),k].filter(Boolean).forEach(t=>{if(!fuente.includes(t.toLowerCase()))mal.push(id+' «'+t+'» no está en la lámina');});});
    const fut=E.filter(e=>/fut/.test(e[2]||'')),mil=(L.futuro||[]).find(f=>/mil años/i.test(f.t));
    if(fut.length!==2||!mil||mil.de!==fut[0][0])mal.push(id+' los mil años no empiezan en la venida');
    if(!E.some(e=>e[0]===1844&&e[2]==='juicio')||!E.some(e=>e[2]==='hoy'))mal.push(id+' 1844 u hoy');
    (L.metro.l2||[]).forEach(([de,a])=>{if(!E.some(e=>e[0]===de)||!E.some(e=>e[0]===a))mal.push(id+' segunda línea '+de+'-'+a);});
    /* v233b: toda escena del pasado y todo comienzo de parte es una estación (las que no empiezan
       una parte, menores); las menores, con las palabras de su escena. */
    const ys=E.map(e=>e[0]);
    (L.escenas||[]).filter(e=>e.y<=2026).forEach(e=>{if(!ys.includes(e.y))mal.push(id+' escena '+e.y+' sin estación');});
    (L.partes||[]).filter(q=>q.de!=null).forEach(q=>{if(!ys.includes(q.de))mal.push(id+' parte '+q.id+' ('+q.de+') sin estación');});
    E.filter(e=>/menor/.test(e[2]||'')).forEach(([y,n])=>{const es=(L.escenas||[]).find(e=>e.y===y);if(!es||!(es.c+' '+es.t).toLowerCase().includes(n.toLowerCase()))mal.push(id+' menor '+y+' sin su escena');});
    /* v233b: 457 a.C. dice lo mismo que el panel de las 2.300 tardes y mañanas. */
    if(L.linea2300)E.filter(e=>e[0]<2026&&e[0]!==1844).forEach(([y,n])=>{const h=L.linea2300.hitos.find(h=>h.y===y);if(h&&h.s!==n)mal.push(id+' '+y+' «'+n+'» ≠ panel «'+h.s+'»');});}
  ok(!mal.length,'v233: la línea de metro de Daniel 2, 7 y 8: cada estación con su marca y con las palabras de la lámina; toda escena y todo comienzo de parte es una estación (597 y 586, menores); 457 como en el panel de las 2.300; 1844, hoy, la venida y el reino; los mil años empiezan en la venida'+(mal.length?' — '+mal.slice(0,4).join(' | '):''));
  ok(/const LAM_METRO=true;/.test(js)&&/PARA VOLVER A LA LÍNEA DE v232: `const LAM_METRO=false;`/.test(js)&&/t\.classList\.add\('metro'\)/.test(js)&&/\.lam-tiempo\.metro\.escala \.lam-metro\{display:none\}/.test(css)&&
    /prefers-reduced-motion:reduce\)\{\.lm-p,\.lm-a,\.lm-seg\{transition:none\}\.lm-e\.hoy \.lm-p::after\{animation:none/.test(css)&&/scroll-snap-type:x mandatory/.test(css)&&/aria-current','step'/.test(js),
    'v233: la línea de metro cuelga de una bandera (LAM_METRO) y de la clase .metro; «Ver a escala» muestra la de v232; la tira del teléfono con scroll-snap; «hoy» quieto con movimiento reducido');
}

/* v235 (Camilo aprobó la opción A y los nombres, 15-oct): dos entradas, «Biblioteca» y
   «Concursos». Las pantallas siguen siendo 'estudio' y 'examen' por dentro; en la barra y en
   la dirección tienen el nombre nuevo y los caminos viejos se leen igual. Las fuentes de cada
   tema salen solas de sus líneas «Fuente:»; cada pregunta lleva a su capítulo y, si una sección
   trae su versículo en el título, a esa sección. */
{
  const cuerpo=fs.readFileSync(FUENTE('cuerpo.html'),'utf8'),BIB_F='biblioteca-'+'app.js',BJ=fs.readFileSync(FUENTE(BIB_F),'utf8'); /* el nombre partido: la cuenta de lecturas de app.js no lo confunde */
  ok(/<b>Biblioteca<\/b>/.test(cuerpo)&&/<b>Concursos<\/b>/.test(cuerpo)&&!/<b>Estudiar<\/b>/.test(cuerpo)&&!/<b>Examen<\/b>/.test(cuerpo)&&
    /id="bib-cab"/.test(cuerpo)&&/id="con-cab"/.test(cuerpo)&&/id="con-lista"/.test(cuerpo)&&/id="ini-entradas"/.test(cuerpo)&&/\$\{APP_BIB\}/.test(fs.readFileSync(FUENTE('build.js'),'utf8')),
    'v235: la barra dice Biblioteca y Concursos; la portada de la Biblioteca, la de Concursos y las dos puertas del Inicio tienen su sitio');
  const cod=BJ.replace(/\/\*[\s\S]*?\*\//g,'');
  ok(!/^(const|let) /m.test(cod)&&!/onclick="[^"]*\b(this|event)\b/.test(cod)&&!/document\.(fonts|createRange)/.test(cod),
    'v235: biblioteca-app.js solo declara funciones y var arriba (se pinta al arrancar) y sus toques son llamadas con literales (Jóvenes)');
  const {lugarParte,LUGAR_PUB}=montar('lugarParte, LUGAR_PUB');
  const a=lugarParte('biblioteca/d7/profundizar/lamina/d7/explorar/x-fases'),b=lugarParte('estudio/d7/profundizar/lamina/d7/explorar/x-fases'),c=lugarParte('#/concursos'),d=lugarParte('examen');
  ok(JSON.stringify(a)===JSON.stringify(b)&&a.pant==='estudio'&&a.item==='d7'&&a.lam&&a.lam.id==='d7'&&c.pant==='examen'&&d.pant==='examen'&&LUGAR_PUB.estudio==='biblioteca'&&LUGAR_PUB.examen==='concursos',
    'v235: «biblioteca/…» y «concursos» llevan al mismo lugar que los caminos viejos «estudio/…» y «examen»');
  const q=montar("fd:bibFuentes('daniel'), fa:bibFuentes('apocalipsis'), fm:bibFuentes('matutina'), st:(()=>{const r={sec:0,cap:0,mal:0};for(const q of BANCO){const d=bibDondeQ(q);if(!d){r.mal++;continue;}if(d.i<0){r.cap++;continue;}r.sec++;const s=CONTENIDO[q.cap][d.i];const rg=bibRangos(s.t,libroCid(q.cap).n);const vs=q.v?(()=>{const m=/^(\\d+):(\\d+)(?:-(\\d+))?$/.exec(q.v);const o=[];for(let x=+m[2];x<=(m[3]?+m[3]:+m[2]);x++)o.push(x);return o;})():refsQ(q,q.cap);if(!vs.some(v=>rg.some(([x,y])=>v>=x&&v<=y)))r.mal++;}return r;})()");
  const bohr=q.fd.find(o=>o.autor==='Bohr'&&o.obra==='Daniel 1-10'),cs=q.fd.find(o=>o.abr==='CS');
  ok(q.fd.length>20&&q.fa.length>20&&!q.fm.length&&bohr&&bohr.pags.length>10&&bohr.caps.length>3&&cs&&cs.pags.length>10&&!q.fd.some(o=>/^\d+:\d/.test(o.tal||'')),
    'v235: las fuentes de Daniel ('+q.fd.length+') y Apocalipsis ('+q.fa.length+') salen solas de sus líneas «Fuente:», juntas por obra con sus páginas y capítulos; la matutina no cita otras obras');
  ok(q.st.mal===0&&q.st.sec>1000&&q.st.cap>0,
    'v235: cada pregunta lleva a su capítulo en la Biblioteca y '+q.st.sec+' a la sección cuyo título trae su versículo ('+q.st.cap+' solo al capítulo; ninguna a una sección equivocada)');
  ok(/\.lm-e\.juicio \.lm-a b\{color:var\(--lam-oro/.test(fs.readFileSync(FUENTE('estilos.css'),'utf8'))&&/function bibProximo\(/.test(BJ)&&/function bibPieHTML\(/.test(BJ)&&/bibPieHTML\(\)/.test(APP),
    'v235: 1844 con el año en oro en la línea de metro; el Inicio anuncia el concurso que viene; cada tema termina con su «Bibliografía»');
}

/* v237 (Camilo, 16-oct, 5:38 a. m.): el concurso 2027 con el club adelante y la fecha tentativa;
   Menores y Padres de vuelta dentro de Aventureros; El conflicto de los siglos 24-43 como
   material: un archivo por capítulo, cada pregunta sacada de una frase literal y pendiente de
   revisión, ligado al alcance de cada categoría, y su texto pedido al abrir (no en el index). */
{
  const F=require(path.join(RAIZ,'fuente','campamentos.js')), CS=require(path.join(RAIZ,'fuente','conflicto.js'));
  const AP=F.CAMPAMENTOS.find(f=>f.id==='ap'), C=REGLAMENTO.CATS, A=REGLAMENTO.ACTIVIDADES;
  ok(AP.nombre==='Guías Mayores - Conexión Bíblica 2027'&&AP.cuando==='6 de marzo de 2027 (fecha tentativa)'&&AP.fecha==='2027-03-06'&&
     F.CAMPAMENTOS.find(f=>f.id==='cb').nombre==='Aventureros - Conexión Bíblica: Daniel'&&F.CAMPAMENTOS.find(f=>f.id==='cbg').nombre==='Guias - Conexión Bíblica: Daniel'&&
     AP.categorias.map(c=>c.nombre.split(/[ (]/)[0]).every(n=>['Guías','Conquistadores','Aventureros'].includes(n)),
    'v237: el concurso 2027 se llama con el club adelante, como lo guardó Camilo, y su fecha dice «(fecha tentativa)»');
  const AVF=F.CAMPAMENTOS.find(f=>f.id==='apa'), CQF=F.CAMPAMENTOS.find(f=>f.id==='apc');
  ok(CQF.nombre==='Conquistadores - Conexión Bíblica 2027'&&AVF.nombre==='Aventureros - Conexión Bíblica 2027'&&[AP,CQF,AVF].every(f=>f.cuando==='6 de marzo de 2027 (fecha tentativa)'&&f.organiza==='Asociación del Alto Magdalena')&&
     AP.categorias.map(c=>c.id).join()==='apgm'&&CQF.categorias.map(c=>c.id).join()==='apcq'&&AVF.categorias.map(c=>c.id).join()==='apav,apme,appa'&&
     C.apcq.act==='apc'&&C.apav.act==='apa'&&C.appa.act==='apa'&&C.apgm.act==='ap',
    'v239: el concurso 2027 son tres, uno por club: Guías Mayores (ap), Conquistadores (apc) y Aventureros con Menores y Padres (apa)');
  const AV=AVF.categorias.find(c=>c.id==='apav');
  ok(['apme','appa'].every(k=>C[k]&&C[k].act==='apa'&&C[k].club==='aventureros'&&/^Aventureros - /.test(C[k].nombre))&&C.apme.edad==='4 a 6 años'&&C.appa.edad==='Adultos'&&
     ['apme','appa'].every(k=>{const c=AVF.categorias.find(x=>x.id===k);return c.estudia.join()===AV.estudia.join()&&JSON.stringify(c.obras)===JSON.stringify(AV.obras);}),
    'v237: Menores (4 a 6) y Padres (adultos) vuelven a Apocalipsis, dentro de Aventureros y con su mismo alcance (Ap 1, 12, 14, 21, 22; CS 24, 25, 32, 39, 41, 43)');
  const ids=CS.CS_TEMA_CAPS.map(c=>c.id), arch=fs.readdirSync(path.join(RAIZ,'fuente','conflicto')).filter(f=>/^cap\d\d\.js$/.test(f));
  const sinLit=CS.CS_BANCO.concat(CS.CS_TARJETAS).filter(q=>!q.lit||!CS.CS_TEXTO[q.cap].includes(q.lit)||!q.pend);
  const tapada=CS.CS_BANCO.filter(q=>q.t==='mc'&&!q.lit.includes((q.q.match(/«(.*)___/)||[])[1]+q.o[q.a]));
  ok(arch.length===20&&ids.join()===Array.from({length:20},(_,i)=>'cs'+(24+i)).join()&&CS.CS_BANCO.length>=200&&!sinLit.length&&!tapada.length&&
     CS.CS_TEMA_CAPS.every(c=>c.pag===(CS.CS_CAPS.find(x=>x.n===+c.id.slice(2))||{}).p),
    'v237: CS 24-43, un archivo por capítulo con su página de inicio; '+CS.CS_BANCO.length+' preguntas y '+CS.CS_TARJETAS.length+' tarjetas, cada una de una frase literal del capítulo y pendiente de revisión');
  const caps=k=>montar("x:(S.cat='"+k+"',capsConcurso().map(c=>c.id).join(' '))").x;
  const banco=montar("x:(S.cat='apav',[...new Set(bancoDe().map(q=>q.cap.replace(/\\d+$/,'')))].sort().join())").x;
  ok(caps('apav')==='ap1 ap12 ap14 ap21 ap22 cs24 cs25 cs32 cs39 cs41 cs43'&&caps('apme')===caps('apav')&&
     caps('apcq')===[1,2,3,4,5,10,11,12,13,14,19,20,21,22].map(n=>'ap'+n).concat([24,25,26,29,32,36,37,38,39,41,43].map(n=>'cs'+n)).join(' ')&&
     caps('apgm').split(' ').filter(x=>/^cs/.test(x)).length===20&&banco==='ap,cs'&&A.ap.temas.join()==='apocalipsis,conflicto',
    'v237: el alcance de CS de cada categoría 2027 es real: se filtra, se estudia y el examen de práctica mezcla los dos libros ('+banco+')');
  const libres=montar("x:temasLibres().join()").x, bib=montar("x:bibTemas().join()").x;
  ok(/conflicto/.test(libres)&&/conflicto/.test(bib)&&fs.readFileSync(path.join(RAIZ,'temas.json'),'utf8').includes('"cap-cs24"'),
    'v237: la Biblioteca, Mi estudio y la lista de temas traen El conflicto de los siglos solos');
  const json=ids.map(id=>JSON.parse(fs.readFileSync(path.join(RAIZ,'conflicto',id+'.json'),'utf8')));
  const huellas=montar('x:CS_HUELLAS').x, txt1=CS.parrafos(require(path.join(RAIZ,'fuente','conflicto','cap24.js')))[3].slice(0,80);
  ok(json.every((d,i)=>d.id===ids[i]&&d.estudio.some(s=>/^📖 Página/.test(s.t)))&&!html.includes(txt1)&&json[0].estudio.map(s=>[].concat(s.h).join('')).join('').includes(txt1.slice(0,40))&&
     Object.keys(huellas).join()===ids.join()&&/function csCarga\(/.test(APP)&&/if\(esCS\(id\)&&!CONTENIDO\[id\]\)/.test(APP)&&/CONFLICTO_DIR\+id\+'\.json\?v='\+CS_HUELLAS\[id\]/.test(APP)&&
     /\.cs-pag,\.cs-ref/.test(APP)&&/q-pend/.test(APP)&&/revF\.pend/.test(APP),
    'v237: el texto de CS va en conflicto/<id>.json y se pide al abrir el capítulo (no está en el index.html); la página no se lee en voz alta; lo pendiente se marca en el examen y se filtra en «Revisar el material»');
}

{
  const casos=[
    ['d1','Propuso en su corazón',8],
    ['d3','El cuarto en el horno',25],
    ['d5','Mene, mene, tekel',25],
    ['d6','Por qué Dios dejó',16],
    ['d7','Las señas del cuerno pequeño (1)',8],
    ['d7','Fueron puestos unos tronos',9],
    ['d7','Dónde y cuándo empieza el juicio',9],
    ['d7','El Juez se sentó y los libros',10],
    ['d7','La Biblia explica sus símbolos (1)',17],
    ['d8','Qué quitó el cuerno',11],
    ['d8','La Biblia explica sus símbolos (1)',20],
    ['d8','Hacia dónde crece el cuerno',9],
    ['d8','De 457 a.C. a 1844',14],
    ['d8','Hasta cuándo durará la visión',13],
    ['d8','el santuario y el tiempo',14],
    ['d9','Las seis metas',24],
    ['d9','príncipe que ha de venir',26],
    ['d11','Daniel 11:21-30',21],
    ['d11','Daniel 11:40-45: más detalles',40],
    ['d12','Se levantará Miguel',1],
    ['d12','El varón sobre las aguas',5],
    ['d12','Bienaventurado el que espere',12],
  ];
  const mal=casos.filter(([cid,t,v])=>{
    const expr='x:diceDe(CONTENIDO.'+cid+'.find(s=>s.t.includes('+JSON.stringify(t)+')),'+JSON.stringify(cid)+')';
    const html=montar(expr).x;
    return !html.includes('<cite>Daniel '+cid.slice(1)+':'+v+'</cite>')||html.includes('«»');
  });
  ok(!mal.length,'El estudio de Daniel cita el versículo de su tema sin comillas duplicadas'+(mal.length?' ('+mal.map(x=>x[1]).join(', ')+')':''));
  const duplicadas=montar('x:Object.entries(CONTENIDO).flatMap(([cid,ss])=>ss.filter(s=>s.capa==="contexto").map(s=>({cid,t:s.t,html:diceDe(s,cid)}))).filter(s=>/biblia-t">«[«»“”‘’"\x27]|[«»“”‘’"\x27]» <cite>/.test(s.html))').x;
  ok(!duplicadas.length,'Ningún estudio de Daniel o Apocalipsis duplica las comillas bíblicas'+(duplicadas.length?' ('+duplicadas.map(x=>x.cid+': '+x.t).join(', ')+')':''));
  const titulos=montar('x:[tituloSec("🧭 «Fueron puestos unos tronos»"),tituloSec("🤔 ¿La bestia es el dragón?"),tituloSec("📖 Daniel 7")]').x;
  ok(titulos.join('|')==='«Fueron puestos unos tronos»|¿La bestia es el dragón?|Daniel 7',
    'Los encabezados conservan sus signos de apertura al quitar el emoji');
}

/* Toda referencia de imagen, incluidas capas, subpasos y tramos futuros. */
{
  const {LAMINAS,ULTIMOS}=require(path.join(RAIZ,'fuente','laminas.js')),rutas=new Set();
  const archivo=/^[a-z0-9_/-]+(?:\.(?:webp|png|jpg))?$/i;
  for(const L of Object.values(LAMINAS)){
    const agrega=f=>{if(typeof f==='string'&&archivo.test(f))rutas.add((f.includes('/')?'':L.dir)+f+(/\.\w+$/.test(f)?'':'.webp'));};
    const visita=o=>{if(!o||typeof o!=='object')return;for(const[k,v]of Object.entries(o)){
      if(['f','img','fondo','inicioF','miniF','pequeno','portada'].includes(k))agrega(v);
      if(['solo','precarga','imgs'].includes(k)&&Array.isArray(v))v.forEach(agrega);
      if(v&&typeof v==='object')visita(v);
    }};
    visita(L);(L.capas||[]).forEach(agrega);
  }
  ULTIMOS.eventos.filter(e=>e.img).forEach(e=>rutas.add(e.img+'.webp'));
  const faltan=[...rutas].filter(f=>!fs.existsSync(path.join(RAIZ,'laminas',f)));
  ok(rutas.size>=68&&!faltan.length,'Inventario de '+rutas.size+' imágenes referenciadas sin archivos ausentes'+(faltan.length?': '+faltan.join(', '):''));
}

/* Daniel 9 en Cine (v266): el motor cuenta sin año cero, cada versículo es el de la app,
   cada cita de Elena de White lleva libro y página, y el texto no atribuye ideas a autores
   (regla de Camilo, 13-oct: voz directa; la fuente va aparte, una vez). */
{
 const {LAMINAS}=require(path.join(RAIZ,'fuente','laminas.js'));
 const {VERS}=require(path.join(RAIZ,'fuente','biblia.js'));
 const D=LAMINAS.d9,A=montar('cineFecha,cinePausas,CINE_PAUSAS,cmpModelo');
 ok(D.tipo==='cine'&&D.actos.length===6&&new Set(D.actos.map(a=>a.id)).size===6,'Daniel 9 es una lámina de cine con seis actos de llave única');
 ok([[0,'457 a.C.'],[49,'408 a.C.'],[456,'1 a.C.'],[457,'1 d.C.'],[483,'27 d.C.'],[486.5,'31 d.C.'],[490,'34 d.C.']].every(([n,f])=>A.cineFecha(n)===f),'Cine cuenta sin año cero: 408 a.C., 27, 31 y 34 d.C.');
 const est=D.actos.find(a=>a.tipo==='via').estaciones;
 ok(est.every(e=>A.cineFecha(e.n)===e.fecha),'Cada estación de la línea dice la fecha que da su cuenta');
 const n=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/gi,'').replace(/\s+/g,' ').toLowerCase().trim();
 const versos=[...D.actos.filter(a=>a.v).map(a=>a.v),...est.map(e=>e.v)];
 ok(versos.every(v=>VERS[v.cap]&&VERS[v.cap][v.de]&&(!v.frase||n(VERS[v.cap][v.de]).includes(n(v.frase)))),'Cada versículo que cita Cine es el texto RV1995 de la app');
 const textos=[],egw=[];
 const recorre=o=>{if(Array.isArray(o))return o.forEach(recorre);if(!o||typeof o!=='object')return;
   for(const[k,v]of Object.entries(o)){if(k==='egw')v.forEach(e=>egw.push(e));if(typeof v==='string'&&!['fuente','id','img','dir','tipo','foco2','miniF','portada'].includes(k))textos.push(v);else recorre(v);}};
 recorre(D);
 const atribuye=textos.filter(t=>/\b(seg[uú]n|examina|Shea|Bohr|notas de Camilo)\b/i.test(t));
 ok(!atribuye.length,'El texto de Cine no atribuye ideas a autores'+(atribuye.length?': '+atribuye.join(' | ').slice(0,200):''));
 ok(egw.length>=8&&egw.every(e=>/Elena G\. de White/.test(e.fuente)&&/pp?\. \d/.test(e.fuente)&&e.t.length>20),'Cada cita de Elena de White en Cine lleva libro y página');
 ok(D.actos.every(a=>A.cinePausas(a).every(f=>f>0&&f<=1)),'Siguiente tiene paradas válidas en cada acto');
 ok(A.cmpModelo().cols.join(',')==='d2,d7,d8','Daniel 9 no añade una columna de reinos a Comparar');
 const comp=fs.readFileSync(path.join(RAIZ,'fuente','complementos','daniel','d9.js'),'utf8').replace(/^\/\*[\s\S]*?\*\//,'').replace(/Fuentes?:[\s\S]*?(?=<\/p>|'\s*\}|`)/g,'');
 const nombra=comp.match(/.{0,40}(?:\b(?:Shea|Bohr)\b|[Ss]eg[uú]n (?:Bohr|Shea)).{0,40}/g)||[];
 ok(!nombra.length,'«Para profundizar» de Daniel 9 no atribuye ideas a autores fuera de su línea «Fuente:»'+(nombra.length?': '+nombra.join(' | '):''));
}

console.log('\n'+(fallos===0?'TODAS LAS PRUEBAS PASARON':fallos+' FALLOS'));
process.exit(fallos?1:0);
