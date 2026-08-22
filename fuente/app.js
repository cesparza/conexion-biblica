/* ───────── estado ───────── */
const CLAVE='conexion-biblica-v3';
const BASE={v:3,nombre:'',cat:'av',prog:{},examenes:[],racha:0,ultimo:null,insignias:[],fq:{},ft:{},acc:{}};

/* Clave estable por pregunta/tarjeta: hash del texto, sobrevive a
   reordenar el banco en fuente/. */
function hashTxt(s){let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
const claveQ=q=>q.cap+'.'+hashTxt((q.q||q.ins||'')+(q.p?q.p.map(p=>p.b||p.x).join('¦'):''));
const claveT=t=>t.cap+'.'+hashTxt(t.f||'');

function normalizar(x){
  const s=JSON.parse(JSON.stringify(BASE));
  CAPS.forEach(c=>s.prog[c.id]=0);
  if(!x||typeof x!=='object')return s;
  if(typeof x.nombre==='string')s.nombre=x.nombre.slice(0,60);
  if(Object.keys(CATS).includes(x.cat))s.cat=x.cat;
  if(x.prog&&typeof x.prog==='object')
    CAPS.forEach(c=>{const v=Number(x.prog[c.id]);s.prog[c.id]=Number.isFinite(v)?Math.min(100,Math.max(0,v)):0;});
  if(Array.isArray(x.examenes))
    s.examenes=x.examenes.filter(e=>e&&Number.isFinite(Number(e.pts)))
      .map(e=>({pts:Number(e.pts),total:Number(e.total)||0,
        cat:Object.keys(CATS).includes(e.cat)?e.cat:'av',fecha:String(e.fecha||''),
        modo:['simulacro','errores'].includes(e.modo)?e.modo:'normal',
        nv:[1,2,3].includes(Number(e.nv))?Number(e.nv):1})).slice(-40);
  const r=Number(x.racha);s.racha=Number.isFinite(r)?Math.max(0,Math.min(999,r)):0;
  if(typeof x.ultimo==='string')s.ultimo=x.ultimo;
  if(Array.isArray(x.insignias))s.insignias=x.insignias.filter(i=>typeof i==='string').slice(0,20);
  if(x.fq&&typeof x.fq==='object')
    for(const k of Object.keys(x.fq).slice(0,600)){
      const m=Number(x.fq[k]&&x.fq[k].m);
      if(Number.isFinite(m)&&m>0)s.fq[k]={m:Math.min(99,Math.round(m))};
    }
  if(x.ft&&typeof x.ft==='object')
    for(const k of Object.keys(x.ft).slice(0,600)){
      const c=Number(x.ft[k]);
      if(Number.isFinite(c))s.ft[k]=Math.min(2,Math.max(0,Math.round(c)));
    }
  if(x.acc&&typeof x.acc==='object')
    CAPS.forEach(c=>{
      const v=x.acc[c.id];
      if(v&&typeof v==='object'){
        const b=Number(v.b),m=Number(v.m);
        s.acc[c.id]={b:Number.isFinite(b)?Math.min(9999,Math.max(0,Math.round(b))):0,
                     m:Number.isFinite(m)?Math.min(9999,Math.max(0,Math.round(m))):0};
      }
    });
  return s;
}
let S;
try{S=normalizar(JSON.parse(localStorage.getItem(CLAVE)||'null'));}catch(e){S=normalizar(null);}
function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(S));}catch(e){}}

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const capsDe=()=>CAPS.filter(c=>c.cats.includes(S.cat));
/* Para exámenes se excluyen los capítulos marcados `extra`: están para
   estudiar, pero el reglamento no los pide (hoy, el 31 de octubre). */
const bancoDe=()=>{
  const ids=capsDe().filter(c=>!c.extra).map(c=>c.id);
  return BANCO.filter(q=>ids.includes(q.cap));
};
const modsDe=()=>MODULOS.filter(m=>m.cats.includes(S.cat));
const tarjetasDe=()=>{const ids=capsDe().map(c=>c.id);return TARJETAS.filter(t=>ids.includes(t.cap));};
const buscaItem=id=>CAPS.find(c=>c.id===id)||MODULOS.find(m=>m.id===id);

/* ───────── categorías ─────────
   Salen del reglamento del campamento: cada club presenta dos integrantes de
   4 a 6 años (examen solo del libro de Daniel), dos de 7 a 9 (Daniel más
   Profetas y Reyes) y dos padres o consejeros con el mismo alcance de 7 a 9.
   «gm» no está en ese reglamento: es el alcance ampliado de Guías Mayores,
   que es otro evento.
     n      preguntas del examen de práctica
     techo  nivel máximo de dificultad que se le ofrece
     sinCompletar  el examen no trae sección de completar */
const CATS={
  me:{ev:'Conexión Bíblica', nombre:'Menores',  edad:'4 a 6 años',  n:10, techo:1, sinCompletar:true,
      alcance:'Daniel 1, 2, 3 y 6'},
  av:{ev:'Conexión Bíblica', nombre:'Aventureros', edad:'7 a 9 años', n:15, techo:3, sinCompletar:false,
      alcance:'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44'},
  pa:{ev:'Conexión Bíblica', nombre:'Padres y consejeros', edad:'Adultos', n:25, techo:3, sinCompletar:false,
      alcance:'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44'},
  gm:{ev:'Conexión Bíblica', nombre:'Guías Mayores', edad:'Otro evento', n:25, techo:3, sinCompletar:false,
      alcance:'Daniel 1 al 6 · P&R 39 al 44'},
  dm1:{ev:'Devoción Matutina', nombre:'Matutina menores', edad:'4 a 6 años', n:10, techo:1, sinCompletar:true,
      alcance:'Héroes y villanos · 1 al 15 de octubre'},
  dm2:{ev:'Devoción Matutina', nombre:'Matutina Aventureros', edad:'7 a 9 años', n:15, techo:2, sinCompletar:true,
      alcance:'Héroes y villanos · 1 al 30 de octubre'},
};

const CAT=()=>CATS[S.cat]||CATS.av;
/* CUÁNTAS PREGUNTAS TRAE EL EXAMEN REAL: NO SE SABE.
   Lo único confirmado del examen del campamento es el formato de tres
   secciones (múltiple, verdadero/falso, completar), visto en un examen que
   Camilo fotografió. La cantidad y el reparto por sección están sin
   confirmar. Estos números son un tamaño de práctica razonable, no un dato:
   cuando se confirme, se cambia aquí y todo lo demás se ajusta. */
const NPREG=()=>CAT().n;

/* ───────── cuenta hacia el campamento ───────── */
/* Fecha del evento de cada categoría. El campamento de Aventureros es el
   9 de octubre de 2026; si el de Guías Mayores queda en otra fecha, se
   cambia solo esta línea y la cuenta de días, la semana del plan y el techo
   de dificultad se recalculan solos para esa categoría. */
const FECHA_META={me:'2026-10-09',av:'2026-10-09',pa:'2026-10-09',gm:'2026-10-09',
  dm1:'2026-10-09',dm2:'2026-10-09'};
const SEMANAS_PLAN=7;

function diasParaMeta(){
  const hoy=new Date(); hoy.setHours(0,0,0,0);
  const meta=new Date((FECHA_META[S.cat]||FECHA_META.av)+'T00:00:00');
  return Math.round((meta-hoy)/864e5);
}
/* Semana del plan en la que vamos: 1 la más lejana, SEMANAS_PLAN la última. */
function semanaPlan(){
  const d=diasParaMeta();
  if(d<=0)return SEMANAS_PLAN;
  return Math.max(1,Math.min(SEMANAS_PLAN,SEMANAS_PLAN-Math.floor((d-1)/7)));
}

/* ───────── niveles de dificultad ───────── */
const ETIQ_NIVEL={1:'Básico',2:'Intermedio',3:'Avanzado'};

/* Promedio de los últimos tres exámenes de la categoría (0 a 1).
   Se ignoran los de «solo mis errores»: ahí el puntaje no es comparable. */
function promedioReciente(){
  const mios=S.examenes.filter(e=>e.cat===S.cat&&e.modo!=='errores').slice(-3);
  if(!mios.length)return null;
  return mios.reduce((a,e)=>a+(e.total?e.pts/e.total:0),0)/mios.length;
}

/* Nivel recomendado. Dos frenos, y manda el más bajo:
   · el calendario — en las primeras semanas no tiene sentido lo avanzado;
   · el desempeño — no se sube de nivel sin dominar el anterior.
   Así la dificultad crece de verdad y no de golpe. */
function nivelRecomendado(){
  const techoCat=CAT().techo;
  /* Los adultos no necesitan la rampa: entran directo a lo exigente. */
  if(S.cat==='pa')return techoCat;
  const sem=semanaPlan();
  const techoSemana=sem<=2?1:sem<=4?2:3;
  const prom=promedioReciente();
  const hechos=S.examenes.filter(e=>e.cat===S.cat&&e.modo!=='errores').length;
  let porDesempeno=1;
  if(prom!==null&&hechos>=2&&prom>=0.85)porDesempeno=3;
  else if(prom!==null&&hechos>=1&&prom>=0.70)porDesempeno=2;
  return Math.max(1,Math.min(techoCat,Math.min(techoSemana,porDesempeno)));
}

/* ───────── navegación ───────── */
function ir(id){
  document.querySelectorAll('.pantalla').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nav-t button').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  document.querySelectorAll('.nav-t button')[{inicio:0,estudio:1,tarjetas:2,examen:3,logros:4}[id]].classList.add('on');
  if(id==='inicio')pintaInicio();
  if(id==='estudio')pintaCaps();
  if(id==='tarjetas')pintaTarjetas();
  if(id==='examen')pintaExInicio();
  if(id==='logros')pintaLogros();
  window.scrollTo({top:0});
}

function ponNombre(v){S.nombre=String(v).slice(0,60);guardar();}
function ponCat(c){
  S.cat=c;guardar();
  marcaCat();
  pintaInicio();pintaCaps();
  document.getElementById('detalle').style.display='none';
}

/* Selector de categoría, pintado desde los datos de CATS. */
function pintaSelectorCat(){
  const cont=document.getElementById('cat-sel');
  if(!cont)return;
  const eventos=[...new Set(Object.values(CATS).map(c=>c.ev))];
  cont.innerHTML=eventos.map(ev=>
    '<div class="cat-grupo">'+esc(ev)+'</div>'+
    '<div class="cat-fila">'+Object.entries(CATS).filter(([,c])=>c.ev===ev).map(([k,c])=>
      '<button class="cat-btn'+(S.cat===k?' on':'')+'" onclick="ponCat(\''+k+'\')">'+
      '<div class="cn">'+esc(c.nombre)+'</div>'+
      '<div class="cd">'+esc(c.edad)+'<br>'+c.alcance+'</div></button>').join('')+'</div>').join('');
}

/* ───────── qué estudiar hoy ─────────
   El panel existe porque la app tenía todas las herramientas pero ninguna
   decía por dónde empezar. Cada tarea sale de un dato real del progreso,
   no de un plan genérico, y se ordena por lo que más rinde: primero cerrar
   errores, después memorizar lo pendiente, después leer lo que falta. */
const PLAN_SEMANAS=[
  {t:'Conocer el material',d:'Leer capítulo por capítulo sin apuro. Exámenes de nivel básico para fijar nombres, números y lugares.'},
  {t:'Fijar los datos',d:'Terminar de leer todos los capítulos y los repasos. Tarjetas todos los días.'},
  {t:'Entrar a lo literal',d:'Empiezan las citas exactas y las diferencias entre RV1995 y RV1960. Nivel intermedio.'},
  {t:'Dominar las trampas',d:'Los módulos de Trampas y de RV1995 vs RV1960. Repasar errores hasta vaciarlos.'},
  {t:'Precisión palabra por palabra',d:'Completar el versículo, nivel avanzado. Aquí se decide el concurso.'},
  {t:'Simulacros',d:'Exámenes completos cronometrados, con el formato del campamento.'},
  {t:'Afinar y descansar',d:'Solo errores pendientes y el módulo «Lo que más preguntan». Dormir bien.'},
];

function tareasDeHoy(){
  const tareas=[];
  const err=falladasDe().length;
  if(err>=3)tareas.push({ic:'🔁',t:'Repasar '+err+' errores',
    d:'Preguntas que fallaste y todavía no dominas. Es lo que más puntos recupera.',
    b:'Repasar ahora',f:"iniciar('errores')"});

  const porDominar=tarjetasDe().filter(t=>(S.ft[claveT(t)]||0)<2).length;
  if(porDominar)tareas.push({ic:'🃏',t:porDominar+' tarjetas por dominar',
    d:'Salen primero las que fallaste. Una tarjeta queda dominada al acertarla dos veces seguidas.',
    b:'Abrir tarjetas',f:"irTarjetasDificiles()"});

  const sinLeer=[...capsDe(),...modsDe()].filter(x=>(S.prog[x.id]||0)<100);
  if(sinLeer.length)tareas.push({ic:'📖',t:'Leer '+esc(sinLeer[0].label),
    d:'Te faltan '+sinLeer.length+' secciones por marcar como estudiadas.',
    b:'Estudiar',f:"verCap('"+sinLeer[0].id+"')"});

  /* Capítulo más flojo según los exámenes: dirige el estudio a donde duele. */
  const flojo=capsDe().map(c=>({c,a:S.acc[c.id]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>=3)
    .map(x=>({...x,pct:x.a.b/(x.a.b+x.a.m)}))
    .sort((p,q)=>p.pct-q.pct)[0];
  if(flojo&&flojo.pct<0.8)tareas.push({ic:'🎯',t:'Reforzar '+esc(flojo.c.label),
    d:'Vas en '+Math.round(flojo.pct*100)+'% en ese capítulo, tu punto más flojo.',
    b:'Examen de ese capítulo',f:"examenDeCapitulo('"+flojo.c.id+"')"});

  const n=nivelEfectivo();
  tareas.push({ic:'✏️',t:'Examen de nivel '+n+' · '+ETIQ_NIVEL[n],
    d:'Un examen de práctica de '+NPREG()+' preguntas, con las tres secciones.',
    b:'Comenzar',f:"iniciar('normal')"});

  return tareas.slice(0,4);
}

function pintaHoy(){
  const d=diasParaMeta(), sem=semanaPlan(), p=PLAN_SEMANAS[sem-1];
  const cuenta=d>0
    ?'<div class="cuenta"><div class="cd">'+d+'</div><div class="cl">día'+(d===1?'':'s')+
     '<br>para el campamento</div></div>'
    :'<div class="cuenta"><div class="cd">¡Hoy!</div><div class="cl">es el día</div></div>';

  const cab=cuenta+
    '<div class="sem"><div class="st">Semana '+sem+' de '+SEMANAS_PLAN+' · '+esc(p.t)+'</div>'+
    '<div class="sd">'+esc(p.d)+'</div></div>';

  const lista=tareasDeHoy().map(t=>
    '<div class="tarea"><div class="tic">'+t.ic+'</div>'+
    '<div class="ttx"><div class="tt">'+t.t+'</div><div class="td">'+t.d+'</div></div>'+
    '<button class="btn nar tbt" onclick="'+t.f+'">'+t.b+'</button></div>').join('');

  document.getElementById('hoy').innerHTML='<div class="hoy-cab">'+cab+'</div>'+lista;
}

/* Atajos que usa el panel. */
function irTarjetasDificiles(){tjFiltro='dificiles';ir('tarjetas');tjBaraja();}
function examenDeCapitulo(id){alcance=id;cuantas=0;ir('examen');pintaMenuEx();iniciar('normal');}

/* ───────── inicio ───────── */
function pintaInicio(){
  pintaHoy();
  pintaSelectorCat();
  const ni=document.getElementById('nombre');
  if(ni.value!==S.nombre)ni.value=S.nombre;

  const cs=capsDe();
  const listos=cs.filter(c=>S.prog[c.id]>=100).length;
  const mios=S.examenes.filter(e=>e.cat===S.cat);
  const mejor=mios.length?Math.max(...mios.map(e=>Math.round(e.pts/e.total*100))):0;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><div class="v">'+listos+'<small style="font-size:.9rem">/'+cs.length+'</small></div><div class="l">Capítulos<br>estudiados</div></div>'+
    '<div class="stat"><div class="v">'+mejor+'<small style="font-size:.9rem">%</small></div><div class="l">Mejor<br>puntaje</div></div>'+
    '<div class="stat"><div class="v">'+mios.length+'</div><div class="l">Exámenes<br>hechos</div></div>'+
    '<div class="stat"><div class="v">'+S.racha+'🔥</div><div class="l">Días de<br>racha</div></div>'+
    '<div class="stat" style="cursor:pointer" onclick="ir(\'examen\')" title="Preguntas que has fallado y aún no dominas">'+
    '<div class="v" style="color:'+(falladasDe().length?'var(--rojo)':'var(--verde)')+'">'+falladasDe().length+'</div>'+
    '<div class="l">Errores por<br>repasar</div></div>';

  document.getElementById('anillos').innerHTML=cs.map(c=>{
    const p=S.prog[c.id]||0,C=Math.PI*2*22,off=C*(1-p/100);
    return '<button class="anillo'+(p>=100?' full':'')+'" onclick="verCap(\''+c.id+'\')">'+
      '<svg viewBox="0 0 52 52" width="58" height="58">'+
      '<circle class="bg" cx="26" cy="26" r="22"/>'+
      '<circle class="fg" cx="26" cy="26" r="22" stroke="'+c.color+'" stroke-dasharray="'+C+'" stroke-dashoffset="'+off+'"/>'+
      '<text x="26" y="26" font-size="11" font-weight="800" fill="'+c.color+'" text-anchor="middle" dominant-baseline="central" transform="rotate(90 26 26)">'+p+'%</text>'+
      '</svg><div class="al">'+esc(c.label)+'</div><div class="as">'+esc(c.sub)+'</div></button>';
  }).join('');

  document.getElementById('racha').innerHTML=S.racha>0
    ?'<div style="font-size:2.6rem">🔥</div><div style="font-size:1.3rem;font-weight:800;color:var(--naranja)">'+S.racha+' día'+(S.racha!==1?'s':'')+' seguido'+(S.racha!==1?'s':'')+'</div>'
    :'<div style="font-size:.88rem;color:var(--gris)">Marca un capítulo como estudiado para empezar tu racha 🔥</div>';
}

/* ───────── estudio ───────── */
function pintaCaps(){
  const caps=capsDe().map(c=>
    '<button class="cap c-'+c.id+'" onclick="verCap(\''+c.id+'\')">'+
    '<div class="n" style="color:'+c.color+'">'+esc(c.label.replace(/^(Daniel |P&R )/,''))+'</div>'+
    '<div class="t">'+esc(c.sub)+'</div><div class="f">'+esc(c.src)+'</div>'+
    '<div class="p">'+(S.prog[c.id]||0)+'% leído</div></button>').join('');
  const mods=modsDe().map(m=>
    '<button class="mod c-'+m.id+'" onclick="verCap(\''+m.id+'\')">'+
    '<div class="ic">'+m.icono+'</div><div><div class="t">'+esc(m.label)+'</div>'+
    '<div class="s">'+esc(m.sub)+'</div>'+
    '<div class="p" style="font-size:.7rem;color:var(--verde);font-weight:700;margin-top:4px">'+(S.prog[m.id]||0)+'%</div>'+
    '</div></button>').join('');
  document.getElementById('lista-caps').innerHTML=
    '<div class="grupo" style="grid-column:1/-1">📘 Capítulos</div>'+caps+
    '<div class="grupo" style="grid-column:1/-1">🔎 Repaso general</div>'+mods;
}

function verCap(id){
  ir('estudio');
  document.querySelectorAll('.cap,.mod').forEach(b=>b.classList.remove('on'));
  document.querySelector('.c-'+id)?.classList.add('on');
  const c=buscaItem(id);
  if(!c)return;
  const secs=CONTENIDO[id]||CONT_MODULOS[id]||[];
  const d=document.getElementById('detalle');
  d.innerHTML=
    '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem">'+
    '<div><div style="font-size:1.15rem;font-weight:800;color:var(--azul)">'+esc(c.label)+'</div>'+
    '<div style="font-size:.83rem;color:var(--gris)">'+esc(c.sub)+(c.src?' · '+esc(c.src):'')+'</div></div>'+
    '<span class="pil az">RV1995</span></div>'+
    secs.map(s=>'<div class="sec"><h3>'+s.t+'</h3>'+s.h+'</div>').join('')+
    '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #eef0f4;display:flex;gap:.7rem;flex-wrap:wrap">'+
    '<button class="btn ver" onclick="listo(\''+id+'\')">✅ Ya lo estudié</button>'+
    '<button class="btn nar" onclick="ir(\'tarjetas\')">🃏 Tarjetas</button>'+
    '<button class="btn azul" onclick="ir(\'examen\')">✏️ Examen</button></div>';
  d.style.display='block';
  avanza(id,60);
}

function avanza(id,p){S.prog[id]=Math.max(S.prog[id]||0,p);guardar();pintaCaps();}

function listo(id){
  avanza(id,100);sumaRacha();
  const lista=[...capsDe(),...modsDe()];
  const i=lista.findIndex(x=>x.id===id)+1;
  if(i>0&&i<lista.length){verCap(lista[i].id);window.scrollTo({top:0,behavior:'smooth'});}
  else ir('inicio');
}

function sumaRacha(){
  const hoy=new Date().toDateString();
  if(S.ultimo!==hoy){
    const ayer=new Date(Date.now()-864e5).toDateString();
    S.racha=S.ultimo===ayer?S.racha+1:1;S.ultimo=hoy;guardar();
  }
}

/* ───────── tarjetas ───────── */
let mazo=[],tjI=0,tjVolteada=false,tjFiltro='todas',tjSabidas=new Set();

function pintaTarjetas(){
  const sel=document.getElementById('tj-filtro');
  const cs=capsDe();
  const nDif=tarjetasDe().filter(t=>(S.ft[claveT(t)]||0)<2).length;
  sel.innerHTML='<option value="todas">Todos los capítulos</option>'+
    '<option value="dificiles">🔁 Solo por dominar ('+nDif+')</option>'+
    cs.map(c=>'<option value="'+c.id+'">'+esc(c.label)+' — '+esc(c.sub)+'</option>').join('');
  sel.value=tjFiltro;
  if(!mazo.length)tjBaraja();
  else muestraTj();
}

function filtraTj(v){tjFiltro=v;tjBaraja();}

function tjBaraja(){
  let base=tarjetasDe();
  if(tjFiltro==='dificiles')base=base.filter(t=>(S.ft[claveT(t)]||0)<2);
  else if(tjFiltro!=='todas')base=base.filter(t=>t.cap===tjFiltro);
  /* Repetición espaciada (Leitner): caja 0 = fallada o nueva, sale
     primero; caja 1 = en repaso; caja 2 = dominada, sale al final. */
  const caja=t=>S.ft[claveT(t)]||0;
  mazo=[0,1,2].flatMap(n=>mezcla(base.filter(t=>caja(t)===n)));
  tjI=0;tjVolteada=false;tjSabidas=new Set();
  muestraTj();
}

function muestraTj(){
  const c=document.getElementById('tj-carta');
  if(!c)return;
  if(!mazo.length){
    c.className='tj';
    c.innerHTML='<div class="cara">No hay tarjetas para este filtro.</div>';
    document.getElementById('tj-pos').textContent='';
    document.getElementById('tj-prog').style.width='0%';
    document.getElementById('tj-resumen').textContent='';
    return;
  }
  if(tjI>=mazo.length){
    c.className='tj volteada';
    const s=tjSabidas.size,t=mazo.length;
    c.innerHTML='<div class="cara">🎉 Terminaste el mazo</div>'+
      '<div class="rev" style="margin-top:.7rem">Sabías '+s+' de '+t+' ('+Math.round(s/t*100)+'%)</div>';
    document.getElementById('tj-pos').textContent='Completado';
    document.getElementById('tj-prog').style.width='100%';
    document.getElementById('tj-resumen').textContent='Toca «Barajar de nuevo» para repetir.';
    return;
  }
  const t=mazo[tjI];
  const cj=S.ft[claveT(t)]||0;
  const est=cj===2?'<span class="pil az">✅ dominada</span>':cj===1?'<span class="pil na">🔁 en repaso</span>':'<span class="pil na">🆕 por aprender</span>';
  c.className='tj'+(tjVolteada?' volteada':'');
  c.innerHTML=(tjVolteada
    ? '<div class="rev">'+t.r+'</div><div class="pista">toca para volver</div>'
    : '<div class="cara">'+t.f+'</div><div class="pista">toca para ver la respuesta</div>')+
    '<div style="position:absolute;top:.6rem;right:.6rem">'+est+'</div>';
  document.getElementById('tj-pos').textContent='Tarjeta '+(tjI+1)+' de '+mazo.length;
  document.getElementById('tj-prog').style.width=Math.round(tjI/mazo.length*100)+'%';
  document.getElementById('tj-resumen').textContent=tjSabidas.size+' marcadas como sabidas · «La sabía» dos veces seguidas = dominada';
}

function voltea(){if(mazo.length&&tjI<mazo.length){tjVolteada=!tjVolteada;muestraTj();}}
function tjSig(){if(tjI<mazo.length){tjI++;tjVolteada=false;muestraTj();}}
function tjAnt(){if(tjI>0){tjI--;tjVolteada=false;muestraTj();}}
function tjSabia(si){
  if(tjI>=mazo.length)return;
  if(si)tjSabidas.add(tjI);else tjSabidas.delete(tjI);
  const k=claveT(mazo[tjI]);
  S.ft[k]=si?Math.min(2,(S.ft[k]||0)+1):0;
  sumaRacha();
  tjI++;tjVolteada=false;
  if(tjI>=mazo.length&&mazo.length>=10&&tjSabidas.size===mazo.length){
    if(!S.insignias.includes('Memoria de acero')){S.insignias.push('Memoria de acero');}
  }
  guardar();muestraTj();
}

/* ───────── examen ───────── */
let reloj=null,seg=1200,entregado=false,resp={},prueba=[],modo='normal';
/* alcance: 'todo' | 'biblia' | 'pr' | id de capítulo.
   nivel: 0 = progresivo (lo decide la app), o 1, 2, 3 fijo. */
let alcance='todo',cuantas=0,nivel=0;

const falladasDe=()=>{const p=bancoDe();return p.filter(q=>(S.fq[claveQ(q)]||{}).m>0);};

/* Preguntas disponibles según categoría + alcance elegido. */
function poolDe(){
  const b=bancoDe();
  if(alcance==='todo')return b;
  if(alcance==='biblia')return b.filter(q=>q.cap.charAt(0)==='d');
  if(alcance==='pr')return b.filter(q=>q.cap.slice(0,2)==='pr');
  if(alcance==='q1')return b.filter(q=>diaMat(q.cap)>0&&diaMat(q.cap)<=15);
  if(alcance==='q2')return b.filter(q=>diaMat(q.cap)>15);
  return b.filter(q=>q.cap===alcance);
}

/* Día del mes de un capítulo de matutina (m01..m31), o 0 si no lo es. */
const diaMat=id=>/^m\d\d$/.test(id)?Number(id.slice(1)):0;
const esMatutina=()=>CAT().ev==='Devoción Matutina';

/* Nivel efectivo del examen que se va a armar. */
const nivelEfectivo=()=>nivel||nivelRecomendado();

/* Pool filtrado por nivel. Un nivel incluye todo lo de abajo: al llegar al
   avanzado no se dejan de practicar los datos básicos, solo se agrega lo
   difícil. Si con el filtro no alcanzan preguntas, se usa el pool completo
   para no dejarla sin examen. */
function poolNivel(){
  let b=poolDe();
  /* A los 4 a 6 años no se les pide escribir la palabra exacta. */
  if(CAT().sinCompletar)b=b.filter(q=>q.t!=='fill');
  const n=nivelEfectivo();
  const f=b.filter(q=>(q.nv||1)<=n);
  return f.length>=Math.min(8,b.length)?f:b;
}

/* Opciones de cantidad que caben en el pool, más el máximo real. */
function opcionesCuantas(){
  const t=poolNivel().length;
  const base=[10,15,25,40,60,100].filter(n=>n<=t);
  if(!base.length||base[base.length-1]!==t)base.push(t);
  return base;
}

function pintaMenuEx(){
  const sa=document.getElementById('ex-alcance');
  const prev=alcance;
  const grupos=esMatutina()
    ?'<option value="q1">Solo la primera quincena (1 al 15)</option>'+
     '<option value="q2">Solo la segunda quincena (16 en adelante)</option>'
    :'<option value="biblia">Solo el libro de Daniel</option>'+
     '<option value="pr">Solo Profetas y Reyes</option>';
  sa.innerHTML='<option value="todo">Todo mi material</option>'+grupos+
    capsDe().map(c=>'<option value="'+c.id+'">'+esc(c.label)+' — '+esc(c.sub)+'</option>').join('');
  if(!capsDe().some(c=>c.id===prev)&&!['todo','biblia','pr','q1','q2'].includes(prev))alcance='todo';
  sa.value=alcance;

  const ops=opcionesCuantas();
  if(!ops.includes(cuantas))cuantas=ops.includes(NPREG())?NPREG():ops[0];
  const sc=document.getElementById('ex-cuantas');
  sc.innerHTML=ops.map(n=>'<option value="'+n+'">'+n+' pregunta'+(n===1?'':'s')+
    (n===NPREG()?' (tamaño de práctica)':'')+'</option>').join('');
  sc.value=cuantas;

  const rec=nivelRecomendado();
  const sn=document.getElementById('ex-nivel');
  sn.innerHTML='<option value="0">Progresivo — hoy nivel '+rec+', '+ETIQ_NIVEL[rec]+'</option>'+
    [1,2,3].map(n=>'<option value="'+n+'">Nivel '+n+' — '+ETIQ_NIVEL[n]+
      ' ('+poolDe().filter(q=>(q.nv||1)<=n).length+' preguntas)</option>').join('');
  sn.value=nivel;

  const pool=poolNivel();
  const t=pool.length;
  const porTipo=['mc','tf','fill'].map(x=>{
    const L={mc:'múltiple',tf:'V/F',fill:'completar'}[x];
    return pool.filter(q=>q.t===x).length+' de '+L;
  }).join(' · ');
  document.getElementById('ex-disponible').innerHTML=
    'Disponibles con esta selección: <strong>'+t+'</strong> preguntas ('+porTipo+').'+
    (t<cuantas?' <span style="color:var(--rojo)">Se usarán todas.</span>':'')+
    '<br>'+textoNivel();
}

/* Explica en una línea por qué está en ese nivel: sin el motivo, subir de
   nivel se siente arbitrario. */
function textoNivel(){
  const n=nivelEfectivo();
  const prom=promedioReciente();
  const d=diasParaMeta();
  let por;
  if(nivel)por='Nivel fijado a mano.';
  else if(prom===null)por='Primera sesión: se empieza por los datos directos.';
  else if(n===3)por='Vas en '+Math.round(prom*100)+'%: ya entra lo de precisión literal.';
  else por='Promedio reciente '+Math.round(prom*100)+'%: se sube de nivel al llegar a '+
    (n===1?'70':'85')+'%.';
  return '<strong>Nivel '+n+' · '+ETIQ_NIVEL[n]+'.</strong> '+por+
    (d>0?' Faltan '+d+' días para el campamento.':'');
}

function cambiaAlcance(){alcance=document.getElementById('ex-alcance').value;pintaMenuEx();}
function cambiaCuantas(){cuantas=Number(document.getElementById('ex-cuantas').value)||NPREG();pintaMenuEx();}
function cambiaNivel(){nivel=Number(document.getElementById('ex-nivel').value)||0;pintaMenuEx();}

function pintaExInicio(){
  const n=NPREG(),b=bancoDe().length,f=falladasDe().length;
  document.getElementById('ex-desc').textContent=n+' preguntas · '+CAT().nombre;
  document.getElementById('ex-nota').textContent='Banco completo de tu categoría: '+b+' preguntas. El examen real es de '+n+'.';
  document.getElementById('ex-err').innerHTML=f>=3
    ?'<button class="btn gho" onclick="iniciar(\'errores\')">🔁 Mis errores ('+f+')</button>':'';
  pintaMenuEx();
}

function mezcla(a){const r=a.slice();for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}

function armar(m){
  if(m==='errores'){
    const sel=mezcla(falladasDe()).slice(0,NPREG());
    return sel.map((q,i)=>barajaOpciones({...q,id:'q'+i}));
  }
  const b=poolNivel();
  const n=Math.min(cuantas||NPREG(),b.length);
  const mc=mezcla(b.filter(q=>q.t==='mc'));
  const tf=mezcla(b.filter(q=>q.t==='tf'));
  const fl=mezcla(b.filter(q=>q.t==='fill'));
  /* Proporción del examen real: 60% múltiple, 25% V/F, 15% completar.
     Si un tipo no alcanza en el alcance elegido, el faltante lo cubren
     los otros tipos para que siempre salgan n preguntas. */
  let nf=Math.min(fl.length,Math.max(1,Math.round(n*.15)));
  let nt=Math.min(tf.length,Math.max(1,Math.round(n*.25)));
  let nm=Math.min(mc.length,n-nf-nt);
  let falta=n-(nm+nt+nf);
  while(falta>0){
    const antes=falta;
    if(nf<fl.length){nf++;falta--;}
    if(falta>0&&nt<tf.length){nt++;falta--;}
    if(falta>0&&nm<mc.length){nm++;falta--;}
    if(falta===antes)break;
  }
  const sel=[...mc.slice(0,nm),...tf.slice(0,nt),...fl.slice(0,nf)];
  return sel.map((q,i)=>barajaOpciones({...q,id:'q'+i}));
}

/* Baraja las opciones de una pregunta múltiple y reubica la respuesta.
   Sin esto, la correcta cae casi siempre en la misma letra y se puede
   aprobar por patrón en vez de por contenido. */
function barajaOpciones(q){
  if(q.t!=='mc'||!q.o)return q;
  const idx=mezcla(q.o.map((_,i)=>i));
  return {...q,o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)};
}

/* Tiempo proporcional a la cantidad. El ritmo del examen real tampoco está
   confirmado; se usa algo más de un minuto por pregunta, que es lo cómodo
   para practicar sin acostumbrarse a ir lento. */
const segundosPara=n=>Math.max(300,Math.round(n*(S.cat==='me'?100:S.cat==='av'?80:72)));

function iniciar(m){
  modo=m||'normal';
  ir('examen');
  prueba=armar(modo);resp={};entregado=false;
  if(!prueba.length){reinicia();return;}
  seg=segundosPara(prueba.length);
  document.getElementById('ex-inicio').style.display='none';
  document.getElementById('ex-curso').style.display='block';
  document.getElementById('ex-result').style.display='none';
  pintaPreguntas();corre();
}

function corre(){
  clearInterval(reloj);
  reloj=setInterval(()=>{
    seg--;
    const e=document.getElementById('reloj');
    if(e){e.textContent=String(Math.floor(seg/60)).padStart(2,'0')+':'+String(seg%60).padStart(2,'0');
      e.className='timer'+(seg<120?' urg':'');}
    if(seg<=0){clearInterval(reloj);entregar();}
  },1000);
}

const ETQ={mc:'📋 Sección I — Selección Múltiple',tf:'✔ Sección II — Verdadero o Falso',fill:'✏️ Sección III — Completar el Versículo'};

function pintaPreguntas(){
  let h='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    h+='<div class="divisor">'+ETQ[t]+'</div>';
    qs.forEach(q=>{h+=htmlQ(q,n++,false);});
  }
  document.getElementById('preguntas').innerHTML=h;
  const ET={normal:'',simulacro:' · 🎓 Simulacro',errores:' · 🔁 Repaso de errores'};
  const NA={todo:'todo el material',biblia:'solo Daniel',pr:'solo Profetas y Reyes'};
  const alc=modo==='errores'?'mis errores':(NA[alcance]||(buscaItem(alcance)||{}).label||'');
  document.getElementById('ex-meta').textContent=prueba.length+' preguntas · '+alc+
    ' · '+(S.nombre||'Estudiante')+(ET[modo]||'');
  cuenta();
}

function htmlQ(q,n,ver){
  let cuerpo='';
  if(q.t==='mc'){
    cuerpo='<div class="ops">'+q.o.map((o,i)=>{
      const L='ABCD'[i];let c='op';
      if(ver){if(i===q.a)c+=' ok';else if(resp[q.id]===i)c+=' ko';}
      else if(resp[q.id]===i)c+=' sel';
      return '<button class="'+c+'"'+(ver?' disabled':'')+' onclick="marca(\''+q.id+'\','+i+')">'+
        '<span class="ol">'+L+'</span>'+esc(o)+'</button>';
    }).join('')+'</div>';
  } else if(q.t==='tf'){
    const r=resp[q.id];let cv='',cf='';
    if(ver){cv=q.a?'ok':(r===true?'ko':'');cf=!q.a?'ok':(r===false?'ko':'');}
    else{cv=r===true?'sel':'';cf=r===false?'sel':'';}
    cuerpo='<div class="vf">'+
      '<button class="'+cv+'"'+(ver?' disabled':'')+' onclick="marca(\''+q.id+'\',true)">✅ Verdadero</button>'+
      '<button class="'+cf+'"'+(ver?' disabled':'')+' onclick="marca(\''+q.id+'\',false)">❌ Falso</button></div>'+
      (ver?'<div class="fb '+(bien(q)?'ok':'ko')+'">'+esc(q.e)+'</div>':'');
  } else {
    const partes=q.p.map((p,i)=>{
      if(!p.b)return '<span>'+esc(p.x)+'</span>';
      const v=resp[q.id+'_'+i]||'';let c='';
      if(ver)c=igual(v,p.b)?'ok':'ko';
      const pista=modo==='simulacro'?'...':esc(p.h||'...');
      return '<input class="'+c+'" type="text" placeholder="'+pista+'" value="'+esc(v)+'"'+
        (ver?' disabled':'')+' oninput="rellena(\''+q.id+'\','+i+',this.value)">';
    }).join('');
    cuerpo='<div style="font-size:.79rem;color:var(--gris);font-style:italic;margin-bottom:.5rem">'+esc(q.ins)+'</div>'+
      '<div class="rell">'+partes+'</div>'+
      (ver?'<div class="fb '+(bien(q)?'ok':'ko')+'">'+(bien(q)?'✅ ¡Correcto!':'❌ Respuesta: '+esc(q.p.filter(p=>p.b).map(p=>p.b).join(' / ')))+'</div>':'');
  }
  const cls=ver?(bien(q)?' hecha':' mal'):(hecha(q)?' hecha':'');
  return '<div class="q'+cls+'" id="c-'+q.id+'"><div class="qt"><span class="qn">'+n+'.</span> '+esc(q.q||'')+'</div>'+cuerpo+'</div>';
}

const limpia=s=>String(s).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
const igual=(a,b)=>limpia(a)===limpia(b);

function bien(q){
  if(q.t==='mc')return resp[q.id]===q.a;
  if(q.t==='tf')return resp[q.id]===q.a;
  return q.p.every((p,i)=>!p.b||igual(resp[q.id+'_'+i]||'',p.b));
}
function hecha(q){
  if(q.t==='fill')return q.p.some((p,i)=>p.b&&(resp[q.id+'_'+i]||'').trim());
  return resp[q.id]!==undefined;
}

function marca(id,v){
  if(entregado)return;
  resp[id]=v;
  const q=prueba.find(x=>x.id===id),n=prueba.indexOf(q)+1;
  const el=document.getElementById('c-'+id);
  if(el)el.outerHTML=htmlQ(q,posicion(q),false);
  cuenta();
}
function rellena(id,i,v){if(entregado)return;resp[id+'_'+i]=v;cuenta();}

function posicion(q){
  let n=1;
  for(const t of ['mc','tf','fill'])
    for(const x of prueba.filter(y=>y.t===t)){if(x.id===q.id)return n;n++;}
  return n;
}

function cuenta(){
  const a=prueba.filter(hecha).length;
  const e=document.getElementById('contador');
  if(e)e.textContent=a+' de '+prueba.length+' respondidas';
}

function entregar(){
  if(entregado)return;
  entregado=true;clearInterval(reloj);
  const pts=prueba.filter(bien).length,tot=prueba.length,pct=Math.round(pts/tot*100);
  S.examenes.push({pts,total:tot,cat:S.cat,fecha:new Date().toISOString(),modo,nv:nivelEfectivo()});
  /* Registro por pregunta y por capítulo: alimenta «mis errores»,
     el panel de puntos débiles y la repetición espaciada. */
  for(const q of prueba){
    const k=claveQ(q);
    if(bien(q)){delete S.fq[k];}
    else S.fq[k]={m:Math.min(99,((S.fq[k]||{}).m||0)+1)};
    const a=S.acc[q.cap]||{b:0,m:0};
    if(bien(q))a.b++;else a.m++;
    S.acc[q.cap]=a;
  }
  revisaInsignias(pct);sumaRacha();guardar();

  const s3=['mc','tf','fill'].map(t=>{
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)return '';
    const L={mc:'Múltiple',tf:'V o F',fill:'Completar'}[t];
    return '<div><div class="sv">'+qs.filter(bien).length+'/'+qs.length+'</div><div class="sl">'+L+'</div></div>';
  }).join('');

  const med=pct>=93?'🥇':pct>=75?'🥈':pct>=60?'🥉':'📖';
  const msg=pct>=93?'¡Excelente! Dominas el material.':pct>=75?'¡Muy bien! Repasa lo que falló.':pct>=60?'Buen intento. Vuelve al material.':'Estudia la guía y vuelve a intentarlo.';

  let rev='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    rev+='<div class="divisor" style="font-size:.79rem;margin:.8rem 0 .5rem">'+ETQ[t]+'</div>';
    qs.forEach(q=>{rev+=htmlQ(q,n++,true);});
  }

  document.getElementById('ex-curso').style.display='none';
  const r=document.getElementById('ex-result');
  r.style.display='block';
  r.innerHTML=
    '<div class="res"><div style="font-size:2.6rem">'+med+'</div>'+
    '<div class="pt">'+pts+'<span style="font-size:1.7rem;opacity:.7">/'+tot+'</span></div>'+
    '<div style="opacity:.9;margin-top:.3rem">'+pct+'% · '+msg+'</div>'+
    '<div class="sec3">'+s3+'</div></div>'+
    '<div class="card"><h2>📋 Revisión</h2>'+rev+'</div>'+
    '<div style="display:flex;gap:.7rem;flex-wrap:wrap">'+
    (falladasDe().length>=3?'<button class="btn azul" onclick="iniciar(\'errores\')">🔁 Repasar mis errores ('+falladasDe().length+')</button>':'')+
    '<button class="btn nar" onclick="reinicia()">🔄 Otro examen</button>'+
    '<button class="btn azul" onclick="ir(\'estudio\')">📖 Estudiar</button>'+
    '<button class="btn gho" onclick="ir(\'logros\')">🏆 Logros</button></div>';
  window.scrollTo({top:0,behavior:'smooth'});
}

function reinicia(){
  entregado=false;resp={};prueba=[];
  document.getElementById('ex-inicio').style.display='block';
  document.getElementById('ex-curso').style.display='none';
  document.getElementById('ex-result').style.display='none';
  pintaExInicio();
}

const TODAS=[
  {k:'Perfecto',i:'🌟',d:'100% en un examen'},
  {k:'Casi perfecto',i:'🥇',d:'93% o más'},
  {k:'Estudioso',i:'📚',d:'75% o más'},
  {k:'Persistente',i:'🔄',d:'3 exámenes hechos'},
  {k:'Racha de fuego',i:'🔥',d:'3 días seguidos'},
  {k:'Lector completo',i:'📖',d:'Todos los capítulos y repasos estudiados'},
  {k:'Memoria de acero',i:'🃏',d:'Un mazo de tarjetas completo'},
];
function revisaInsignias(pct){
  const a=k=>{if(!S.insignias.includes(k))S.insignias.push(k);};
  if(pct===100)a('Perfecto');
  if(pct>=93)a('Casi perfecto');
  if(pct>=75)a('Estudioso');
  if(S.examenes.length>=3)a('Persistente');
  if(S.racha>=3)a('Racha de fuego');
  if([...capsDe(),...modsDe()].every(x=>S.prog[x.id]>=100))a('Lector completo');
}

function pintaLogros(){
  /* Puntos débiles: % de acierto por capítulo con lo respondido en
     exámenes. Ordena del más flojo al más fuerte para dirigir el
     estudio a donde duele. */
  const filas=capsDe()
    .map(c=>({c,a:S.acc[c.id]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>0)
    .map(x=>({...x,pct:Math.round(x.a.b/(x.a.b+x.a.m)*100)}))
    .sort((p,q)=>p.pct-q.pct);
  document.getElementById('debiles').innerHTML=filas.length
    ?filas.map(x=>
      '<div style="display:flex;align-items:center;gap:.7rem;margin:.45rem 0">'+
      '<button class="btn gho" style="min-height:34px;padding:.2rem .7rem;font-size:.75rem" onclick="verCap(\''+x.c.id+'\')">'+esc(x.c.label)+'</button>'+
      '<div class="prog-lin" style="flex:1;margin:0"><div style="width:'+x.pct+'%;background:'+(x.pct<60?'var(--rojo)':x.pct<85?'var(--naranja)':'var(--verde)')+'"></div></div>'+
      '<span style="font-size:.8rem;font-weight:700;width:44px;text-align:right;color:'+(x.pct<60?'var(--rojo)':'var(--azul)')+'">'+x.pct+'%</span></div>').join('')+
      '<p class="nota">Con base en '+filas.reduce((s,x)=>s+x.a.b+x.a.m,0)+' respuestas de examen. Toca un capítulo para estudiarlo.</p>'
    :'<p class="nota">Haz un examen y aquí verás en qué capítulos estás fallando.</p>';

  document.getElementById('insignias').innerHTML=TODAS.map(b=>{
    const t=S.insignias.includes(b.k);
    return '<span class="ins '+(t?'oro':'gris')+'" title="'+esc(b.d)+'">'+b.i+' '+esc(b.k)+'</span>';
  }).join('')+'<p class="nota">'+S.insignias.length+' de '+TODAS.length+' conseguidas.</p>';

  const h=S.examenes.slice().reverse();
  document.getElementById('historial').innerHTML=h.length
    ?'<table class="info-table"><thead><tr><th>Fecha</th><th>Categoría</th><th>Puntaje</th></tr></thead><tbody>'+
     h.map(e=>{
       const f=new Date(e.fecha);
       const fs=isNaN(f)?'—':f.toLocaleDateString('es-CO',{day:'2-digit',month:'short'})+' '+f.toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});
       const mt={simulacro:' 🎓',errores:' 🔁'}[e.modo]||'';
       return '<tr><td class="key">'+fs+'</td><td>'+((CATS[e.cat]||CATS.av).nombre)+mt+'</td><td><strong>'+e.pts+'/'+e.total+'</strong> ('+Math.round(e.pts/e.total*100)+'%)</td></tr>';
     }).join('')+'</tbody></table>'
    :'<p class="nota">Todavía no has hecho ningún examen.</p>';
}

function borrarTodo(){
  if(!confirm('¿Seguro? Se borra tu progreso, tu racha y tus insignias de este navegador.'))return;
  try{localStorage.removeItem(CLAVE);}catch(e){}
  S=normalizar(null);guardar();ir('inicio');
}

/* ───────── logo de la iglesia ───────── */
/* El data URI vive en una constante y se asigna aquí, no en el HTML: así
   ninguna línea del archivo generado pasa de 2.000 caracteres. */
/* La clase en el body permite que los estilos suban un punto el tamaño de
   letra en Aventureros, sin duplicar pantallas. */
function marcaCat(){
  try{document.body.className=S.cat+' '+(CAT().edad==='4 a 6 años'?'me':CAT().edad==='7 a 9 años'?'av':'gm');}catch(e){}
}

function pintaLogo(){
  try{document.querySelectorAll('.logo-tl').forEach(i=>{i.src=LOGO_TL;});}catch(e){}
}

/* ───────── arranque ───────── */
try{pintaLogo();marcaCat();pintaInicio();}catch(e){console.error(e);}
