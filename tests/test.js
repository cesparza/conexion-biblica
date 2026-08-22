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

console.log('\n'+(fallos===0?'TODAS LAS PRUEBAS PASARON':fallos+' FALLOS'));
process.exit(fallos?1:0);
