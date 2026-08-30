/* ───────── estado ───────── */
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

const CLAVE='conexion-biblica-v4';
const BASE={v:4,nombre:'',cat:'av',prog:{},examenes:[],racha:0,ultimo:null,insignias:[],fq:{},ft:{},acc:{},links:{}};

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
        modo:['simulacro','errores','evaluacion','compartido'].includes(e.modo)?e.modo:'normal',
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
  /* Compatibilidad: fichas guardadas antes de v24 traen `links`. Ya no se usan
     (la evaluación vive en el servidor), pero se conservan para no borrarle el
     historial a nadie al actualizar. */
  if(x.links&&typeof x.links==='object')
    for(const k of Object.keys(x.links).slice(0,200)){
      const v=x.links[k];
      if(!v||typeof v!=='object')continue;
      /* pts null significa «abierto y sin terminar», y hay que distinguirlo de
         cero de verdad: Number(null) es 0, así que leerlo con Number a secas
         convertía un examen abandonado en un examen sacado en cero. */
      const p=(v.pts===null||v.pts===undefined)?NaN:Number(v.pts);
      const t=Number(v.total);
      s.links[String(k).slice(0,12)]={
        pts:Number.isFinite(p)?Math.max(0,Math.round(p)):null,
        total:Number.isFinite(t)?Math.max(0,Math.round(t)):0,
        fecha:String(v.fecha||'').slice(0,40)};
    }
  return s;
}
/* ───────── varios participantes en un mismo aparato ─────────
   Los dos eventos llevan niños distintos: dos de 4 a 6 y dos de 7 a 9 en
   Conexión Bíblica, otros dos y otros dos en la Devoción Matutina, más los
   padres. Antes la app guardaba un solo progreso, así que si dos niños la
   usaban en el mismo celular se pisaban los errores y las tarjetas.

   Ahora se guarda { activo, alumnos:{id:datos} } y `S` apunta al alumno
   activo. Todo lo demás del código sigue leyendo `S` y no se enteró del
   cambio. La clave subió a v4 y se migra lo que hubiera en v3. */
const CLAVE_VIEJA='conexion-biblica-v3';
const MAX_ALUMNOS=12;

function nuevoId(){
  /* Id corto y estable, sin depender de la hora del sistema. */
  let n=1;
  while(DB&&DB.alumnos&&DB.alumnos['a'+n])n++;
  return 'a'+n;
}

function normalizarDB(x){
  const db={v:4,activo:'',alumnos:{},evento:false};
  if(x&&typeof x==='object'&&x.alumnos&&typeof x.alumnos==='object'){
    for(const id of Object.keys(x.alumnos).slice(0,MAX_ALUMNOS))
      db.alumnos[String(id).slice(0,8)]=normalizar(x.alumnos[id]);
    if(typeof x.activo==='string'&&db.alumnos[x.activo])db.activo=x.activo;
  }else if(x&&typeof x==='object'){
    /* Formato viejo: un solo alumno suelto. Se convierte en el primero. */
    db.alumnos.a1=normalizar(x);
  }
  if(!Object.keys(db.alumnos).length)db.alumnos.a1=normalizar(null);
  if(!db.activo)db.activo=Object.keys(db.alumnos)[0];
  return db;
}

let DB, S;
try{
  const guardado=JSON.parse(localStorage.getItem(CLAVE)||'null');
  const legado=guardado?null:JSON.parse(localStorage.getItem(CLAVE_VIEJA)||'null');
  DB=normalizarDB(guardado||legado);
}catch(e){DB=normalizarDB(null);}
S=DB.alumnos[DB.activo];

function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(DB));}catch(e){}}

/* ───────── perfil director ─────────
   MECANISMO
   La app es un solo archivo estático: todo lo que sabe está en el HTML que el
   navegador ya descargó, respuestas correctas incluidas. Así que el perfil
   director no esconde datos, esconde la pantalla que los muestra. Lo que sí es
   real: en el HTML no va la clave, va su SHA-256, y de un SHA-256 no se saca la
   clave. Quien mire el código encuentra 64 caracteres inútiles.

   POR QUÉ NO UN PARÁMETRO EN LA DIRECCIÓN
   ?director se copia una vez y se pasa entre primas. La clave hay que saberla,
   y queda en el aparato del director.

   POR QUÉ sessionStorage Y NO localStorage
   El director entra su clave en el celular de la niña para revisar. Con
   localStorage ese celular quedaría en modo director para siempre;
   sessionStorage se borra al cerrar la pestaña.

   POR QUÉ NO DISTINGUE MAYÚSCULAS
   La clave se escribe en el celular de una niña, de pie, en medio del club, y el
   teclado de iOS pone mayúscula en la primera letra por su cuenta. Un SHA-256
   distinto por una D distinta se lee como «me equivoqué» cuando la clave estaba
   bien. Se normaliza a minúsculas y sin espacios de sobra antes de comparar.
   Lo que se pierde: nada que importe. La clave no aguanta un ataque de fuerza
   bruta por ser larga, sino porque nadie la va a probar veinte veces a mano.

   LÍMITE
   crypto.subtle solo existe en contexto seguro (https). Abriendo el archivo con
   doble clic (file://) el perfil no se puede activar, y la app lo dice en vez
   de fallar en silencio. */
const CLAVE_DIR='8b43cbf2d3c9c8b365bf28e8309c7af81298d592fddc61bdd8e77a827d46f904';

/* La clave tal como se compara: sin espacios de sobra y en minúsculas. */
const normClave=c=>String(c||'').trim().toLowerCase();

let director=false;
try{director=sessionStorage.getItem('cb-dir')==='1';}catch(e){}

async function sha256(t){
  const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
}

/* Devuelve el texto del error, o cadena vacía si entró. */
async function activaDirector(clave){
  if(!(typeof crypto!=='undefined'&&crypto.subtle))
    return 'El perfil director necesita la app abierta desde su dirección de internet, no el archivo abierto a mano.';
  let h='';
  try{h=await sha256(normClave(clave));}
  catch(e){return 'Este navegador no pudo verificar la clave.';}
  if(h!==CLAVE_DIR)return 'Esa clave no es la del director.';
  director=true;
  try{sessionStorage.setItem('cb-dir','1');}catch(e){}
  return '';
}

function salirDirector(){
  director=false;
  try{sessionStorage.removeItem('cb-dir');}catch(e){}
  if(ultimoRes)pintaResultado();
}

/* En el simulacro y en la evaluación del día, quien contesta ve la nota y no la
   revisión: ni cuál falló ni cuál era la correcta. El director sí, con su
   clave, en el mismo aparato y al terminar. */
const revelaRespuestas=()=>director||!(modo==='simulacro'||modo==='evaluacion');

/* ───────── el servidor (v20) ─────────
   MECANISMO, Y ES EL CAMBIO DE FONDO DE ESTA VERSIÓN
   Hasta v19 el cierre vivía en el localStorage de cada celular. localStorage es
   por origen y por navegador: ningún aparato puede preguntarle nada a otro, así
   que cerrar había que repetirlo celular por celular y borrar los datos del
   navegador lo abría. Ahora hay una fila en D1 que todos los aparatos leen. La
   app dejó de decidir si puede arrancar un examen: lo PREGUNTA.

   CÓMO SE COMPORTA SIN SEÑAL, QUE ES EL CASO QUE IMPORTA
   El campamento puede no tener red. Por eso:
     · La respuesta del servidor se guarda en el aparato con su hora.
     · Si el servidor no contesta, manda lo último que dijo. Si dijo «cerrado»,
       sigue cerrado: se falla CERRADO, nunca abierto por accidente.
     · Si nunca contestó, manda el interruptor local de v19, que sigue vivo como
       respaldo.
   Estudiar, las tarjetas y el manual no le preguntan nada a nadie: la app sigue
   funcionando completa sin señal. */
const SRV_CACHE='cb-srv';
const SRV_TIMEOUT=2500;
let srvYo=null;

function srvLee(){
  try{
    const x=JSON.parse(localStorage.getItem(SRV_CACHE)||'null');
    return x&&typeof x==='object'&&typeof x.practica==='boolean'?x:null;
  }catch(e){return null;}
}

function srvGuarda(practica,evalId,evalTitulo){
  try{localStorage.setItem(SRV_CACHE,JSON.stringify(
    {practica:!!practica,evalId:evalId||null,evalTitulo:evalTitulo||null,visto:Date.now()}));}catch(e){}
}

/* fetch con límite de tiempo: sin esto, un celular con una barra de señal deja
   la niña mirando un botón que no responde. */
async function srvFetch(ruta,opciones){
  const ctrl=typeof AbortController!=='undefined'?new AbortController():null;
  const t=ctrl?setTimeout(()=>ctrl.abort(),SRV_TIMEOUT):0;
  try{
    const o=Object.assign({credentials:'same-origin'},opciones||{});
    if(ctrl)o.signal=ctrl.signal;
    if(o.body)o.headers=Object.assign({'content-type':'application/json'},o.headers||{});
    const r=await fetch('/api'+ruta,o);
    let d=null;try{d=await r.json();}catch(e){}
    if(!r.ok){const err=new Error((d&&d.error)||'No se pudo conectar');err.datos=d;err.status=r.status;throw err;}
    return d;
  }finally{if(t)clearTimeout(t);}
}

/* Refresca el interruptor global. Devuelve true si el servidor contestó. */
async function srvRefresca(){
  try{
    const d=await srvFetch('/estado');
    srvGuarda(d.practica, d.evaluacion&&d.evaluacion.id, d.evaluacion&&d.evaluacion.titulo);
    return true;
  }catch(e){return false;}
}

async function srvQuienSoy(){
  try{const d=await srvFetch('/yo');srvYo=d&&d.rol?d:null;}
  catch(e){srvYo=null;}
  return srvYo;
}

/* La nota se manda al servidor pero NO se espera: si no hay señal, la nota ya
   quedó guardada en el aparato y la pantalla no se puede quedar esperando. */
/* La nota se manda sin esperar, pero NO se puede perder.
   Antes esto era un `.catch(function(){})`: si el celular se quedaba sin señal
   justo al entregar, la nota quedaba en el aparato y el director no la veía
   nunca. Ahora el intento se guarda en una cola y se reintenta al abrir la app.
   La clave de idempotencia se genera UNA vez y viaja con el intento, así que
   reintentar no puede duplicar la nota. */
const COLA='cb-cola';

function colaLee(){
  try{const x=JSON.parse(localStorage.getItem(COLA)||'[]');return Array.isArray(x)?x.slice(0,20):[];}
  catch(e){return [];}
}
function colaGuarda(a){try{localStorage.setItem(COLA,JSON.stringify(a.slice(0,20)));}catch(e){}}

function srvIntento(modo,evalId,nota,total){
  if(!srvYo||srvYo.rol!=='participante')return;
  let idem='';
  try{idem=crypto.randomUUID();}catch(e){idem=String(Date.now())+Math.random();}
  const cuerpo={modo:modo,evaluacion_id:evalId||null,nota:nota,total:total,idempotency_key:idem};
  const cola=colaLee();cola.push(cuerpo);colaGuarda(cola);
  enviaCola();
}

/* Vacía la cola. Un 409 («ya la hiciste») también saca el intento: reintentarlo
   para siempre no lo va a arreglar. Un fallo de red lo deja para la próxima. */
async function enviaCola(){
  let cola=colaLee();
  if(!cola.length||!srvYo||srvYo.rol!=='participante')return;
  const quedan=[];
  for(const it of cola){
    try{await srvFetch('/intento',{method:'POST',body:JSON.stringify(it)});}
    catch(e){
      if(!(e&&e.status>=400&&e.status<500))quedan.push(it);
    }
  }
  colaGuarda(quedan);
}

/* ───────── el cierre de la práctica ─────────
/* UNA SOLA PERILLA.
   La práctica está cerrada exactamente cuando hay una evaluación abierta. No
   hay interruptor por aparato ni segundo estado que sincronizar: el servidor
   dice «hay evaluación» y con eso ya está dicho todo.
   Sin señal manda lo último que se supo, y si eso era «cerrado», sigue cerrado:
   se falla CERRADO, nunca abierto por accidente. El director se lo salta. */
const examenesCerrados=()=>{
  if(director)return false;
  const c=srvLee();
  return !!(c&&c.practica===false);
};


const alumnos=()=>Object.entries(DB.alumnos);

function cambiaAlumno(id){
  if(!DB.alumnos[id])return;
  DB.activo=id;S=DB.alumnos[id];guardar();
  /* Al cambiar de persona se reinicia lo que está en pantalla: el mazo de
     tarjetas y el examen en curso son de quien estaba antes. */
  mazo=[];tjI=0;tjFiltro='todas';alcance='todo';cuantas=0;nivel=0;
  prueba=[];resp={};entregado=false;clearInterval(reloj);
  marcaCat();pintaInicio();pintaCaps();
  try{document.getElementById('detalle').style.display='none';}catch(e){}
  ir('inicio');
}

function agregaAlumno(){
  if(alumnos().length>=MAX_ALUMNOS)return;
  const id=nuevoId();
  DB.alumnos[id]=normalizar(null);
  cambiaAlumno(id);
  try{document.getElementById('nombre').focus();}catch(e){}
}

function borraAlumno(){
  if(alumnos().length<=1){
    borrarTodo();return;
  }
  if(!confirm('¿Borrar a '+(S.nombre||'este participante')+' con todo su progreso?'))return;
  delete DB.alumnos[DB.activo];
  cambiaAlumno(Object.keys(DB.alumnos)[0]);
}

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
const TABS={inicio:0,estudio:1,tarjetas:2,examen:3,logros:4};
/* 'bienvenida' y 'ayuda' no están en TABS: son pantallas sin pestaña. */

function ir(id){
  document.querySelectorAll('.pantalla').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nav-t button').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  document.querySelector('.nav').style.display=id==='bienvenida'?'none':'flex';
  if(TABS[id]!==undefined)
    document.querySelectorAll('.nav-t button')[TABS[id]].classList.add('on');
  if(id==='inicio')pintaInicio();
  if(id==='estudio')pintaCaps();
  if(id==='tarjetas')pintaTarjetas();
  if(id==='examen')pintaExInicio();
  if(id==='logros')pintaLogros();
  if(id==='ayuda')pintaAyuda();
  window.scrollTo({top:0});
}

function ponNombre(v){S.nombre=String(v).slice(0,60);guardar();pintaAlumnos();}
function ponCat(c){
  S.cat=c;guardar();
  marcaCat();
  pintaInicio();pintaCaps();
  document.getElementById('detalle').style.display='none';
}

/* Selector de participantes. Cada uno con su nombre y su categoría, para
   que se sepa de quién es el progreso que se está viendo. */
function pintaAlumnos(){
  const cont=document.getElementById('alu-sel');
  if(!cont)return;
  cont.innerHTML=alumnos().map(([id,al])=>{
    const c=CATS[al.cat]||CATS.av;
    return '<button class="alu-btn'+(DB.activo===id?' on':'')+'" onclick="cambiaAlumno(\''+id+'\')">'+
      '<div class="an">'+esc(al.nombre||'Sin nombre')+'</div>'+
      '<div class="ac">'+esc(c.nombre)+'</div></button>';
  }).join('')+
  (alumnos().length<MAX_ALUMNOS
    ?'<button class="alu-btn nuevo" onclick="agregaAlumno()"><div class="an">+ Agregar</div>'+
     '<div class="ac">otro participante</div></button>':'');
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
  if(err>=3)tareas.push({ic:'repetir',t:'Repasar '+err+' errores',
    d:'Preguntas que fallaste y todavía no dominas. Es lo que más puntos recupera.',
    b:'Repasar ahora',f:"arrancaExamen('errores')"});

  const porDominar=tarjetasDe().filter(t=>(S.ft[claveT(t)]||0)<2).length;
  if(porDominar)tareas.push({ic:'tarjetas',t:porDominar+' tarjetas por dominar',
    d:'Salen primero las que fallaste. Una tarjeta queda dominada al acertarla dos veces seguidas.',
    b:'Abrir tarjetas',f:"irTarjetasDificiles()"});

  const sinLeer=[...capsDe(),...modsDe()].filter(x=>(S.prog[x.id]||0)<100);
  if(sinLeer.length)tareas.push({ic:'libro',t:'Leer '+esc(sinLeer[0].label),
    d:'Te faltan '+sinLeer.length+' secciones por marcar como estudiadas.',
    b:'Estudiar',f:"verCap('"+sinLeer[0].id+"')"});

  /* Capítulo más flojo según los exámenes: dirige el estudio a donde duele. */
  const flojo=capsDe().map(c=>({c,a:S.acc[c.id]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>=3)
    .map(x=>({...x,pct:x.a.b/(x.a.b+x.a.m)}))
    .sort((p,q)=>p.pct-q.pct)[0];
  if(flojo&&flojo.pct<0.8)tareas.push({ic:'diana',t:'Reforzar '+esc(flojo.c.label),
    d:'Vas en '+Math.round(flojo.pct*100)+'% en ese capítulo, tu punto más flojo.',
    b:'Examen de ese capítulo',f:"examenDeCapitulo('"+flojo.c.id+"')"});

  const n=nivelEfectivo();
  tareas.push({ic:'examen',t:'Examen de nivel '+n+' · '+ETIQ_NIVEL[n],
    d:'Un examen de práctica de '+NPREG()+' preguntas, con las tres secciones.',
    b:'Comenzar',f:"arrancaExamen('normal')"});

  /* Con los exámenes cerrados, las tareas que arrancan uno no se ofrecen: leer y
     las tarjetas siguen igual, y en su lugar entra una que explica por qué, para
     que la pantalla no quede muda. */
  if(examenesCerrados()){
    const quedan=tareas.filter(t=>!/arrancaExamen\(|examenDeCapitulo\(/.test(t.f));
    quedan.push({ic:'candado',t:'Los exámenes están cerrados',
      d:'Hay una evaluación abierta. Si tienes tu código, te sale arriba en Examen.',
      b:'Ver',f:"ir('examen')"});
    return quedan.slice(0,4);
  }

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
    '<div class="tarea"><div class="tic"><svg class="ico" aria-hidden="true"><use href="#i-'+t.ic+'"/></svg></div>'+
    '<div class="ttx"><div class="tt">'+t.t+'</div><div class="td">'+t.d+'</div></div>'+
    '<button class="btn nar tbt" onclick="'+t.f+'">'+t.b+'</button></div>').join('');

  document.getElementById('hoy').innerHTML='<div class="hoy-cab">'+cab+'</div>'+lista;
}

/* Atajos que usa el panel. */
function irTarjetasDificiles(){tjFiltro='dificiles';ir('tarjetas');tjBaraja();}
async function examenDeCapitulo(id){alcance=id;cuantas=0;ir('examen');pintaMenuEx();await arrancaExamen('normal');}

/* ───────── inicio ───────── */
/* Una línea con quién estudia y qué estudia, en vez de las seis categorías
   siempre a la vista. El resto del selector vive dentro del <details>. */
function pintaIdent(){
  const s=document.getElementById('ident-sum');
  if(!s)return;
  s.innerHTML='<span class="id-quien"><svg class="ico" aria-hidden="true"><use href="#i-persona"/></svg>'+esc(S.nombre||'Sin nombre')+'</span>'+
    '<span class="id-que">'+esc(CAT().nombre)+' · '+esc(CAT().ev)+'</span>';
}

function pintaInicio(){
  pintaAlumnos();
  pintaIdent();
  pintaHoy();
  pintaSelectorCat();
  const ni=document.getElementById('nombre');
  if(ni.value!==S.nombre)ni.value=S.nombre;

  const cs=capsDe();
  const listos=cs.filter(c=>S.prog[c.id]>=100).length;
  const mios=S.examenes.filter(e=>e.cat===S.cat);
  const mejor=mios.length?Math.max(...mios.map(e=>Math.round(e.pts/e.total*100))):0;

  /* El primer día todo va en cero. Cinco tarjetas con un cero no enseñan
     nada y empujan hacia abajo lo único que sí sirve, que es «Qué estudiar
     hoy»; la tarjeta aparece cuando ya hay algo que contar. */
  const hayNumeros=listos>0||mios.length>0||S.racha>0||falladasDe().length>0;
  const cardStats=document.getElementById('card-stats');
  if(cardStats)cardStats.style.display=hayNumeros?'block':'none';

  const pn=document.getElementById('prog-nota');
  if(pn)pn.textContent=listos>=cs.length
    ?'Terminaste de leer los '+cs.length+' capítulos. Ahora toca repasar.'
    :'Al terminar de leer un capítulo toca «Ya lo estudié» y el círculo se llena. Vas '+listos+' de '+cs.length+'.';

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
    '<span class="pil az">'+(esMatutina()?'Matutina':'RV1995')+'</span></div>'+
    secs.map(s=>'<div class="sec"><h3>'+s.t+'</h3>'+s.h+'</div>').join('')+
    '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #eef0f4;display:flex;gap:.7rem;flex-wrap:wrap">'+
    '<button class="btn ver" onclick="listo(\''+id+'\')">✅ Ya lo estudié</button>'+
    '<button class="btn nar" onclick="ir(\'tarjetas\')">🃏 Tarjetas</button>'+
    '<button class="btn azul" onclick="ir(\'examen\')">✏️ Examen</button>'+
    '<button class="btn gho" onclick="imprimeCapitulo(\''+id+'\')">🖨️ Imprimir este capítulo</button></div>';
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

function cambiaAlcance(){alcance=document.getElementById('ex-alcance').value;refrescaEx();}
function cambiaCuantas(){cuantas=Number(document.getElementById('ex-cuantas').value)||NPREG();refrescaEx();}
function cambiaNivel(){nivel=Number(document.getElementById('ex-nivel').value)||0;refrescaEx();}

/* La pantalla abre diciendo en palabras qué examen va a salir si toca
   «Comenzar». Antes abría con tres listas desplegables y el usuario tenía
   que armar el examen para poder empezarlo. */
const refrescaEx=()=>{pintaExInicio();};

function pintaExInicio(){
  pintaMenuEx();
  const b=bancoDe().length,f=falladasDe().length;
  const nv=nivelEfectivo();
  const n=Math.min(cuantas||NPREG(),poolNivel().length);
  document.getElementById('ex-resumen').textContent=n+' preguntas · nivel '+nv+' '+ETIQ_NIVEL[nv];
  document.getElementById('ex-desc').innerHTML=esc(textoAlcanceImpr())+
    '<br>'+esc(CAT().nombre)+' · '+esc(CAT().ev);
  document.getElementById('ex-nota').textContent=
    'Tu categoría tiene '+b+' preguntas en total. Cada examen saca unas cuantas al azar, así que nunca sale el mismo dos veces.';
  document.getElementById('ex-err').innerHTML=f>=3
    ?'<button class="btn gho" onclick="arrancaExamen(\'errores\')">🔁 Repasar mis '+f+' errores</button>':'';
  pintaCierre();
}

/* El aviso de cerrado y el interruptor van los dos en la pantalla de Examen: es
   donde el cierre tiene efecto y donde el director lo va a buscar. */
function pintaCierre(){
  const cerrado=examenesCerrados();
  const tarjeta=document.querySelector('#ex-inicio .card.ex-hoy');
  const cambiar=document.querySelector('#ex-inicio details');
  if(tarjeta)tarjeta.style.display=cerrado?'none':'';
  if(cambiar)cambiar.style.display=cerrado?'none':'';
  const av=document.getElementById('ex-cerrado');
  const c=srvLee();
  if(av)av.innerHTML=cerrado
    ?'<div class="card"><h2><svg class="ico" aria-hidden="true"><use href="#i-candado"/></svg>'+
     '<span>Los exámenes de práctica están cerrados</span></h2>'+
     '<p class="nota">Hay una <strong>evaluación abierta</strong>'+
     (c&&c.evalTitulo?': '+esc(c.evalTitulo):'')+'. Mientras tanto puedes '+
     '<strong>estudiar los capítulos</strong> y practicar con las '+
     '<strong>tarjetas</strong>, que es donde de verdad se aprende.</p>'+
     '<p class="nota">Si tienes tu código, la evaluación te sale arriba.</p></div>'
    :'';
}

/* Mezcla con fuente de azar explícita. mezcla() usa Math.random y es la de
   siempre; mezclaR() acepta un generador con semilla, y eso es lo que hace
   reproducible la evaluación del día. */
function mezclaR(a,r){const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function mezcla(a){return mezclaR(a,Math.random);}

/* Generador con semilla (congruencial lineal). La misma semilla da la misma
   secuencia en cualquier aparato, que es lo que permite que una evaluación
   reconstruya el examen idéntico sin llevar las preguntas dentro. */
function prng(semilla){let s=semilla>>>0;return()=>(s=(s*1664525+1013904223)>>>0)/4294967296;}

/* Azar que usa el armado del examen. Es Math.random salvo cuando se está
   reconstruyendo un examen compartido. */
let rndEx=Math.random;

function armar(m){
  if(m==='errores'){
    const sel=mezcla(falladasDe()).slice(0,NPREG());
    return sel.map((q,i)=>barajaOpciones({...q,id:'q'+i}));
  }
  const b=poolNivel();
  const n=Math.min(cuantas||NPREG(),b.length);
  const mc=mezclaR(b.filter(q=>q.t==='mc'),rndEx);
  const tf=mezclaR(b.filter(q=>q.t==='tf'),rndEx);
  const fl=mezclaR(b.filter(q=>q.t==='fill'),rndEx);
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
  const idx=mezclaR(q.o.map((_,i)=>i),rndEx);
  return {...q,o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)};
}

/* Tiempo proporcional a la cantidad. El ritmo del examen real tampoco está
   confirmado; se usa algo más de un minuto por pregunta, que es lo cómodo
   para practicar sin acostumbrarse a ir lento. */
const segundosPara=n=>Math.max(300,Math.round(n*(S.cat==='me'?100:S.cat==='av'?80:72)));

/* iniciar() sigue siendo la GUARDA y sigue siendo síncrona: decide con lo que
   ya sabe. Quien le da frescura es arrancaExamen(), que es lo que llaman los
   botones: pregunta al servidor y después llama aquí. Separarlos deja la
   cerradura en un solo lugar y mantiene la app probable sin red. */
function iniciar(m){
  /* Guarda de verdad, no cosmética. Aunque un botón quede pintado de antes o
     alguien llame iniciar() por otro camino, aquí se detiene: esconder el botón
     sin esto sería una puerta con letrero y sin cerradura. La evaluación no
     pasa por aquí, y por eso el cierre no la toca. */
  if(examenesCerrados()){ir('examen');pintaExInicio();return;}
  modo=m||'normal';
  /* Se limpia el resultado anterior para que el director no vea la revisión del
     examen pasado, y la evaluación en curso porque este examen no es ella. */
  evalActual=null;ultimoRes=null;
  ir('examen');
  prueba=armar(modo);resp={};entregado=false;
  if(!prueba.length){reinicia();return;}
  seg=segundosPara(prueba.length);
  document.getElementById('ex-inicio').style.display='none';
  document.getElementById('ex-curso').style.display='block';
  document.getElementById('ex-result').style.display='none';
  pintaPreguntas();corre();
}

/* Lo que llaman todos los botones. Le pregunta al servidor y luego arranca.
   Si el servidor no contesta, iniciar() decide con lo último conocido. */
async function arrancaExamen(m){
  await srvRefresca();
  iniciar(m);
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
  const catReg=S.cat;
  const nvReg=modo==='evaluacion'&&evalActual&&evalActual.nivel?evalActual.nivel:nivelEfectivo();
  S.examenes.push({pts,total:tot,cat:catReg,fecha:new Date().toISOString(),modo,nv:nvReg});
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

  /* La nota al servidor. Con la evaluación va su id, y el índice único de la
     base garantiza que cada participante la haga una sola vez, en el aparato
     que sea. Eso es lo que la versión con links no podía cumplir. */
  srvIntento(modo,modo==='evaluacion'&&evalActual?evalActual.id:null,pts,tot);
  if(modo==='evaluacion'){evalHecha=true;evalNota={pts,total:tot};try{pintaEvaluacion();}catch(e){}}

  ultimoRes={pts,tot,pct,med,msg,s3};
  document.getElementById('ex-curso').style.display='none';
  pintaResultado();
}

/* Resultado del examen que acabó, guardado para poder re-pintar la pantalla
   cuando el director entra su clave, sin volver a calificar. */
let ultimoRes=null;

function htmlRevision(){
  let rev='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    rev+='<div class="divisor" style="font-size:.79rem;margin:.8rem 0 .5rem">'+ETQ[t]+'</div>';
    qs.forEach(q=>{rev+=htmlQ(q,n++,true);});
  }
  return rev;
}

function pintaResultado(){
  if(!ultimoRes)return;
  const {pts,tot,pct,med,msg,s3}=ultimoRes;
  const ver=revelaRespuestas();
  const r=document.getElementById('ex-result');
  r.style.display='block';
  r.innerHTML=
    '<div class="res"><div style="font-size:2.6rem">'+med+'</div>'+
    '<div class="pt">'+pts+'<span style="font-size:1.7rem;opacity:.7">/'+tot+'</span></div>'+
    '<div style="opacity:.9;margin-top:.3rem">'+pct+'% · '+msg+'</div>'+
    '<div class="sec3">'+s3+'</div></div>'+
    (ver
      ?'<div class="card"><h2>📋 Revisión</h2>'+htmlRevision()+
       (director?'<p class="nota">Estás viendo esto como <strong>director</strong>. '+
        '<button class="btn gho" onclick="salirDirector()">Salir del modo director</button></p>':'')+
       '</div>'
      :'<div class="card"><h2>🔒 La revisión está cerrada</h2>'+
       '<p class="nota">Esto fue un <strong>simulacro</strong>: queda la nota, no '+
       'las respuestas. El examen del campamento funciona igual. Para ver qué '+
       'falló, el director entra su clave en este mismo aparato.</p>'+
       '<div id="dir-caja"></div>'+
       '<button class="btn gho" style="margin-top:.7rem" onclick="pideClaveDir(\'res\')">🔑 Soy el director</button>'+
       '</div>')+
    '<div style="display:flex;gap:.7rem;flex-wrap:wrap">'+
    (ver&&falladasDe().length>=3?'<button class="btn azul" onclick="arrancaExamen(\'errores\')">🔁 Repasar mis errores ('+falladasDe().length+')</button>':'')+
    '<button class="btn nar" onclick="reinicia()">🔄 Otro examen</button>'+
    '<button class="btn azul" onclick="ir(\'estudio\')">📖 Estudiar</button>'+
    '<button class="btn gho" onclick="ir(\'logros\')">🏆 Logros</button></div>';
  window.scrollTo({top:0,behavior:'smooth'});
}

/* Qué se hace después de entrar la clave: 'res' vuelve a pintar el resultado
   con la revisión abierta. */
let trasDir='res';

/* Caja de clave dentro de la pantalla, no prompt() del navegador: en iPhone el
   teclado tapa el prompt y no se ve lo que se escribe. */
const CAJAS_DIR=['dir-caja','dir-caja-ex'];

function pideClaveDir(que,caja){
  trasDir=que||'res';
  /* Hay dos cajas de clave en el documento (la del resultado y la de la pantalla
     de Examen) y el input siempre se llama igual. Se limpian las dos antes de
     abrir una, o getElementById encuentra el input de la otra y la clave se
     escribe en un campo que nadie está viendo. */
  for(const id of CAJAS_DIR){const e=document.getElementById(id);if(e)e.innerHTML='';}
  const c=document.getElementById(caja||'dir-caja');
  if(!c)return;
  c.innerHTML='<input id="dir-clave" type="password" class="clave-dir" '+
    'placeholder="Clave del director" autocomplete="off" '+
    'onkeydown="if(event.key===\'Enter\')entraDirector()">'+
    '<div id="dir-msg" class="nota"></div>'+
    '<button class="btn nar" style="margin-top:.5rem" onclick="entraDirector()">Entrar</button>';
  const i=document.getElementById('dir-clave');
  if(i)i.focus();
}

function entraDirector(){
  const i=document.getElementById('dir-clave');
  if(!i)return;
  activaDirector(i.value).then(err=>{
    const m=document.getElementById('dir-msg');
    if(err){if(m)m.innerHTML='<span style="color:var(--rojo)">'+esc(err)+'</span>';return;}
    if(trasDir==='evento'){
      /* La clave se usó para el interruptor, no para ver respuestas: se apaga el
         perfil director de una, para no dejar abierto el celular de la niña. El
         orden importa, porque examenesCerrados() mira `director`. */
      alternaEvento();
      director=false;
      try{sessionStorage.removeItem('cb-dir');}catch(e){}
      ir('examen');
      pintaExInicio();
      return;
    }
    pintaResultado();
  });
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
    ?'<div class="tabla-scroll"><table class="info-table"><thead><tr><th>Fecha</th><th>Categoría</th><th>Puntaje</th></tr></thead><tbody>'+
     h.map(e=>{
       const f=new Date(e.fecha);
       const fs=isNaN(f)?'—':f.toLocaleDateString('es-CO',{day:'2-digit',month:'short'})+' '+f.toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});
       /* La evaluación se marca aparte. El director necesita distinguirla de un
          examen que la participante armó sola, porque solo la evaluación es
          comparable entre dos niñas: es el mismo examen el mismo día.
          Van como texto y no como emoji: un emoji lo dibuja el sistema y se ve
          distinto en cada aparato. */
       const mt={simulacro:' · simulacro',errores:' · repaso',evaluacion:' · evaluación',compartido:' · evaluación'}[e.modo]||'';
       return '<tr><td class="key">'+fs+'</td><td>'+((CATS[e.cat]||CATS.av).nombre)+mt+'</td><td><strong>'+e.pts+'/'+e.total+'</strong> ('+Math.round(e.pts/e.total*100)+'%)</td></tr>';
     }).join('')+'</tbody></table></div>'
    :'<p class="nota">Todavía no has hecho ningún examen.</p>';
}

function borrarTodo(){
  if(!confirm('¿Seguro? Se borra el progreso de TODOS los participantes de este navegador.'))return;
  try{localStorage.removeItem(CLAVE);localStorage.removeItem(CLAVE_VIEJA);}catch(e){}
  DB=normalizarDB(null);S=DB.alumnos[DB.activo];guardar();
  marcaCat();ir('inicio');
}

/* ───────── imprimir y guardar en PDF ───────── */
/* MECANISMO
   No se genera el PDF con una librería. Se arma un documento HTML completo
   (fuente/imprimible.js, el mismo render que usa tools/imprimir.js), se
   mete en un iframe oculto y se llama a print() sobre ese iframe. El motor
   de impresión del navegador es el que pagina: @page pone tamaño carta y
   márgenes, y page-break-inside evita que una pregunta quede partida entre
   dos hojas. El diálogo de impresión de cualquier sistema trae «Guardar
   como PDF», así que el PDF sale del mismo camino que el papel.

   POR QUÉ EN UN IFRAME Y NO EN LA MISMA PÁGINA
   La app tiene sus propios estilos de pantalla. Imprimiéndola directo
   habría que apagarlos uno por uno con @media print y cada estilo nuevo
   podría dañar el impreso. El iframe es un documento aparte: solo tiene el
   CSS del examen, así que lo que se ve en el papel no depende de la app.

   POR QUÉ NO UNA LIBRERÍA DE PDF
   Sumaría cientos de kilobytes al archivo único, tocaría reimplementar la
   paginación a mano, y el resultado tipográfico es peor en un documento de
   puro texto. Lo que se pierde: no se puede fijar el nombre del archivo ni
   generar el PDF sin que el usuario pase por el diálogo. */

let ifrImpr=null;

function imprimeDoc(html,titulo){
  try{
    if(ifrImpr&&ifrImpr.parentNode)ifrImpr.parentNode.removeChild(ifrImpr);
    ifrImpr=document.createElement('iframe');
    ifrImpr.setAttribute('title',titulo||'Examen para imprimir');
    ifrImpr.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0';
    /* El iframe dispara onload dos veces: primero por el about:blank con que
       nace y después por el srcdoc. Sin esta bandera saldrían dos diálogos de
       impresión, y el primero sobre un documento en blanco. */
    let yaImprimio=false;
    ifrImpr.onload=()=>{
      if(yaImprimio)return;
      const w=ifrImpr.contentWindow;
      if(!w||!w.document||!w.document.body||!w.document.body.innerHTML)return;
      yaImprimio=true;
      try{w.focus();w.print();}catch(e){avisoImpr(html);}
    };
    ifrImpr.srcdoc=html;
    document.body.appendChild(ifrImpr);
    return true;
  }catch(e){avisoImpr(html);return false;}
}

/* Salida de emergencia. En iPhone y iPad el print() sobre un iframe no
   siempre abre el diálogo; con el documento en una pestaña aparte se
   imprime desde Compartir → Imprimir. */
function avisoImpr(html){
  try{
    const b=new Blob([html],{type:'text/html'});
    const u=URL.createObjectURL(b);
    const c=document.getElementById('impr-alt');
    if(c)c.innerHTML='<p class="nota">Si no se abrió el cuadro de impresión, '+
      '<a href="'+u+'" target="_blank" rel="noopener"><strong>abre el examen en otra pestaña</strong></a> '+
      'y usa Compartir → Imprimir.</p>';
  }catch(e){}
}

/* Los datos que el render necesita de la categoría actual. */
const etiqImpr=c=>CATS[c].nombre+' · '+CATS[c].edad;

/* Una hoja con la selección que esté armada en el menú de arriba: mismo
   alcance, misma cantidad, mismo nivel que el examen que haría en pantalla. */
function hojaActual(conR){
  const sel=armar('normal');
  if(!sel.length)return null;
  return hojaExamen({sel,cat:S.cat,conR,logo:LOGO_TL,caps:CAPS,
    etiqueta:etiqImpr(S.cat),alcance:textoAlcanceImpr()});
}

/* Alcance en palabras, para el encabezado del impreso. */
function textoAlcanceImpr(){
  if(alcance==='todo')return CAT().alcance;
  if(alcance==='biblia')return 'Solo el libro de Daniel';
  if(alcance==='pr')return 'Solo Profetas y Reyes';
  if(alcance==='q1')return 'Del 1 al 15 de octubre';
  if(alcance==='q2')return 'Del 16 en adelante';
  const c=CAPS.find(x=>x.id===alcance);
  return c?c.label+' — '+c.sub:CAT().alcance;
}

function imprimeExamen(conR){
  const h=hojaActual(!!conR);
  if(!h){alertaImpr('No hay preguntas con esta selección.');return;}
  const t=(conR?'Clave — ':'Examen — ')+etiqImpr(S.cat);
  imprimeDoc(docExamen([h],t,conR
    ?'Clave de respuestas. En el cuadro de impresión escoge «Guardar como PDF» si lo quieres en archivo.'
    :'Examen para imprimir. En el cuadro de impresión escoge «Guardar como PDF» si lo quieres en archivo.'),t);
}

/* Las seis categorías en un solo documento, cada una en su hoja. Cambia la
   categoría activa, arma, y la devuelve como estaba: el progreso guardado no
   se toca porque armar() solo lee. */
function imprimeTodos(conR){
  const prevCat=S.cat,prevAl=alcance,prevN=nivel,prevC=cuantas;
  const hojas=[];
  try{
    for(const c of Object.keys(CATS)){
      S.cat=c;alcance='todo';nivel=CATS[c].techo;cuantas=CATS[c].n;
      const sel=armar('normal');
      if(!sel.length)continue;
      hojas.push(hojaExamen({sel,cat:c,conR:!!conR,logo:LOGO_TL,caps:CAPS,
        etiqueta:etiqImpr(c),alcance:CATS[c].alcance}));
    }
  }finally{S.cat=prevCat;alcance=prevAl;nivel=prevN;cuantas=prevC;}
  if(!hojas.length){alertaImpr('No se pudo armar ningún examen.');return;}
  const t=conR?'Claves de las seis categorías':'Exámenes de las seis categorías';
  imprimeDoc(docExamen(hojas,t,'Seis exámenes, uno por categoría, cada uno en su hoja.'+
    (conR?' Contiene las respuestas: solo para líderes.':'')),t);
  pintaMenuEx();
}

function alertaImpr(msj){
  const c=document.getElementById('impr-alt');
  if(c)c.innerHTML='<p class="nota" style="color:var(--rojo)">'+esc(msj)+'</p>';
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

/* ───────── la evaluación del día ─────────
   QUÉ ES ESTA APP, PORQUE DE AHÍ SALE TODO EL DISEÑO
   Esta no es la app del campamento. Es la de preparación: cada sábado, o el
   día que el director escoja, se mide el avance con un simulacro que solo está
   disponible ESE día. El resto de la semana se practica libremente y con las
   respuestas a la vista, que es como se aprende.

   MECANISMO
   El director abre la evaluación desde su panel. El servidor genera la semilla
   y guarda la receta: alcance, cuántas preguntas, nivel. Cada participante que
   entró con su código pide esa receta y su aparato arma el examen. Como el
   banco está ordenado igual en todas partes y la mezcla usa un generador con
   semilla (prng), la misma receta produce las mismas preguntas en el mismo
   orden. La categoría NO viaja en la receta a propósito: cada niña contesta
   sobre el material de su categoría, y aun así es "el mismo examen" para las
   de su grupo.

   POR QUÉ SE FUE EL LINK
   Hasta v22 esto se hacía con un link que llevaba la receta adentro y se
   mandaba por WhatsApp a la hora exacta. Ese link era una muleta para no tener
   servidor: sin reloj confiable, el control de acceso tenía que ser «cuándo lo
   mando». Con base de datos el control es «está abierta o no», que es lo que
   el director ya tenía en la cabeza. Se fueron con el link: copiar y pegar,
   liberar un link gastado, el interruptor por aparato, y que agregar preguntas
   invalidara los links viejos.

   UNA VEZ POR PERSONA, DE VERDAD
   El índice único (participante, evaluación) vive en la base. No es una
   promesa del navegador: una segunda ficha en otro celular tampoco la repite. */

/* Huella del banco: si cambia el contenido, cambia la huella. Sirve para saber
   si una evaluación se armó con otra versión del material. */
const huellaBanco=()=>hashTxt(BANCO.length+'|'+BANCO.map(q=>q.cap).join(''));

/* La evaluación que el servidor tiene abierta, o null. La semilla la genera el
   SERVIDOR, nunca este aparato: así el examen es idéntico para todas y nadie
   puede adivinarlo antes de que se abra. */
let evalPend=null;   // la que se puede hacer ahora
let evalActual=null; // la que se está contestando
let evalHecha=false; // ya la hizo esta participante

async function cargaEvaluacion(){
  if(!srvYo||srvYo.rol!=='participante'){evalPend=null;pintaEvaluacion();return;}
  try{
    const d=await srvFetch('/evaluacion');
    evalPend=d&&d.evaluacion?d.evaluacion:null;
    evalHecha=!!(d&&d.hecha);
    evalNota=d&&d.hecha?{pts:d.nota,total:d.total}:null;
    /* Este endpoint sí sabe quién soy, así que es el que decide si a MÍ me
       cierra la práctica. /estado no puede: es público y no sabe mi categoría. */
    if(evalPend)srvGuarda(false,evalPend.id,evalPend.titulo);
    else if(d&&d.noMeToca)srvGuarda(true,null,null);
  }catch(e){evalPend=null;}
  pintaEvaluacion();
}

let evalNota=null;

function pintaEvaluacion(){
  const d=document.getElementById('cb-eval');
  if(!d)return;
  if(!evalPend){d.innerHTML='';return;}
  if(evalHecha){
    d.innerHTML='<div class="card eval hecha"><div class="ev-t">'+esc(evalPend.titulo)+'</div>'+
      '<p class="nota">Ya la hiciste'+(evalNota&&evalNota.total?': <strong>'+evalNota.pts+'/'+evalNota.total+'</strong>':'')+
      '. Para ver qué fallaste, el director entra su clave.</p></div>';
    return;
  }
  d.innerHTML='<div class="card eval"><div class="ev-t">'+esc(evalPend.titulo)+'</div>'+
    '<p class="nota">'+evalPend.cuantas+' preguntas. Se hace <strong>una sola vez</strong> '+
    'y al final sale la nota, no las respuestas.</p>'+
    '<button class="btn nar ex-go" onclick="haceEvaluacion()">Hacer la evaluación</button></div>';
}

/* Arma la evaluación con la receta del servidor. El alcance, el nivel y la
   cantidad se aplican solo para armar y se devuelven como estaban: la
   evaluación no toca la configuración del participante. */
function haceEvaluacion(){
  if(!evalPend||evalHecha)return;
  const r=evalPend;
  const prev={a:alcance,n:nivel,q:cuantas};
  let sel=[];
  try{
    /* EL NIVEL TIENE QUE SER DETERMINISTA.
       nivelEfectivo() es `nivel || nivelRecomendado()`, y nivelRecomendado()
       mira el historial LOCAL. Con nivel 0 en la receta, dos niñas de la misma
       categoría y distinto desempeño recibían pools distintos: el director
       comparaba notas de exámenes que no eran el mismo. Cuando el director no
       fija nivel, se usa el techo de la categoría, que es igual para todas. */
    alcance=r.alcance||'todo';nivel=r.nivel||CAT().techo;cuantas=r.cuantas;
    rndEx=prng(Number(r.semilla)>>>0);
    sel=armar('normal');
  }finally{
    rndEx=Math.random;alcance=prev.a;nivel=prev.n;cuantas=prev.q;
  }
  if(!sel.length)return;
  evalActual=r;
  modo='evaluacion';prueba=sel;resp={};entregado=false;ultimoRes=null;
  seg=segundosPara(prueba.length);
  ir('examen');
  document.getElementById('ex-result').style.display='none';
  document.getElementById('ex-inicio').style.display='none';
  document.getElementById('ex-curso').style.display='block';
  pintaPreguntas();corre();
  window.scrollTo({top:0});
}

/* ───────── manual dentro de la app ─────────
   MECANISMO
   El texto vive en fuente/manual.js y llega al HTML como datos, igual que los
   capítulos. Las cifras no están escritas en el texto: van como marcas
   {ENTRE_LLAVES} que se reemplazan al pintar con los datos del participante
   activo. Así el manual dice «tienes 57 tarjetas» y no «hay muchas tarjetas»,
   y si el banco crece el manual crece con él.

   POR QUÉ REEMPLAZO Y NO TEXTO FIJO
   Un manual con cifras escritas a mano se desactualiza en el primer cambio de
   contenido, y nadie se acuerda de corregirlo. Estas marcas fallan de forma
   visible si alguien escribe una que no existe, en vez de mentir en silencio. */

let ayGrupoAct='estudia';

function marcasManual(){
  return {
    CAPS_CAT:String(capsDe().length),
    MODS_CAT:String(modsDe().length),
    TJ_CAT:String(tarjetasDe().length),
    BANCO_CAT:String(bancoDe().length),
    BANCO_TOTAL:String(BANCO.length),
    TJ_TOTAL:String(TARJETAS.length),
    CAT_NOMBRE:esc(CAT().nombre),
    CAT_EV:esc(CAT().ev),
    TABLA_CATS:tablaCats(),
  };
}

/* Tabla de las seis categorías, con el conteo real de cada una. Se calcula
   cambiando S.cat temporalmente porque bancoDe() lee la categoría activa. */
function tablaCats(){
  const prev=S.cat;
  let filas='';
  try{
    for(const k of Object.keys(CATS)){
      S.cat=k;
      const c=CATS[k];
      filas+='<tr><td class="key">'+esc(c.nombre)+'</td><td>'+esc(c.edad)+
        '</td><td>'+esc(c.ev)+'</td><td>'+esc(c.alcance)+'</td>'+
        '<td style="text-align:center">'+bancoDe().length+'</td></tr>';
    }
  }finally{S.cat=prev;}
  /* Cinco columnas no caben en un celular: va envuelta para que scrollee ella
     sola en vez de empujar la pantalla. */
  return '<div class="tabla-scroll"><table class="info-table">'+
    '<thead><tr><th>Categoría</th><th>Edad</th>'+
    '<th>Evento</th><th>Alcance</th><th>Preg.</th></tr></thead><tbody>'+
    filas+'</tbody></table></div>';
}

const aplicaMarcas=(txt,m)=>String(txt).replace(/\{([A-Z_]+)\}/g,
  (todo,k)=>m[k]!==undefined?m[k]:todo);

function pintaAyuda(){
  const m=marcasManual();
  const lista=MANUAL.filter(x=>x.para===ayGrupoAct);
  document.getElementById('ay-lista').innerHTML=lista.map(x=>
    '<details class="card ay-item"><summary>'+
    '<span class="ay-ic">'+x.icono+'</span>'+
    '<span class="ay-tx"><b>'+esc(x.t)+'</b><small>'+esc(x.d)+'</small></span>'+
    '</summary><div class="det-cuerpo">'+
    x.secs.map(s=>'<h4 class="ay-h">'+esc(s.t)+'</h4>'+aplicaMarcas(s.h,m)).join('')+
    '</div></details>').join('');
  document.getElementById('ay-t1').className=ayGrupoAct==='estudia'?'on':'';
  document.getElementById('ay-t2').className=ayGrupoAct==='director'?'on':'';
}

function ayGrupo(g){ayGrupoAct=g;pintaAyuda();window.scrollTo({top:0});}

/* El manual también en papel, generado desde la app: no hay un PDF aparte que
   pueda quedar describiendo una versión vieja. */
function imprimeManual(){
  const m=marcasManual();
  const grupos=[['estudia','PARA QUIEN ESTUDIA'],['director','PARA EL DIRECTOR']];
  const hojas=grupos.map(([g,tit])=>hojaGuia({
    caps:MANUAL.filter(x=>x.para===g).map(x=>({
      id:x.id, label:x.icono+' '+x.t, sub:x.d, src:'',
    })),
    contenido:Object.fromEntries(MANUAL.filter(x=>x.para===g)
      .map(x=>[x.id,x.secs.map(s=>({t:s.t,h:aplicaMarcas(s.h,m)}))])),
    modulos:[], contModulos:{}, logo:LOGO_TL,
    titulo:'CÓMO SE USA LA APP',
    sub:tit,
    meta:'Conexión Bíblica y Devoción Matutina · Club de Aventureros',
    pie:'Impreso desde la app, con los datos de hoy',
  }));
  imprimeDoc(docExamen(hojas,'Manual de la app',
    'El manual completo. En el cuadro de impresión escoge «Guardar como PDF» si lo quieres en archivo.'),
    'Manual de la app');
}

/* ───────── imprimir el material de estudio ─────────
   Mismo render que la herramienta de Node (fuente/imprimible.js), pero
   filtrado a lo que le toca al participante activo. Antes la guía en papel
   solo existía si un adulto corría un script; ahora sale de la app, que es
   donde está el niño. */

function imprimeGuia(){
  const html=docExamen([hojaGuia({
    caps:capsDe(), contenido:CONTENIDO, modulos:modsDe(), contModulos:CONT_MODULOS,
    logo:LOGO_TL,
    titulo:'GUÍA DE ESTUDIO',
    sub:esc(CAT().nombre)+' · '+esc(CAT().edad),
    meta:CAT().ev+' · '+CAT().alcance,
    pie:'Mismo material que la app · '+esc(S.nombre||'sin nombre'),
  })],'Guía de estudio — '+CAT().nombre,
  'Tu guía completa. En el cuadro de impresión escoge «Guardar como PDF» si la quieres en archivo.');
  imprimeDoc(html,'Guía de estudio');
}

function imprimeCapitulo(id){
  const c=[...capsDe(),...modsDe()].find(x=>x.id===id);
  if(!c)return;
  const esMod=!!c.icono;
  const html=docExamen([hojaGuia({
    caps:esMod?[]:[c], contenido:CONTENIDO,
    modulos:esMod?[c]:[], contModulos:CONT_MODULOS,
    logo:LOGO_TL,
    titulo:esc(c.label).toUpperCase(),
    sub:esc(c.sub),
    meta:CAT().ev+' · '+esc(CAT().nombre),
  })],esc(c.label),'Un solo capítulo para imprimir.');
  imprimeDoc(html,c.label);
}

function imprimeTarjetas(){
  const t=tarjetasDe();
  if(!t.length){alertaImpr('No hay tarjetas en esta categoría.');return;}
  const html=docExamen([hojaTarjetas({
    tarjetas:t, caps:CAPS, logo:LOGO_TL,
    titulo:'TARJETAS DE MEMORIA',
    sub:esc(CAT().nombre)+' · '+esc(CAT().ev),
  })],'Tarjetas — '+CAT().nombre,
  'Tarjetas para recortar. Tapa la respuesta con la mano antes de leerla.');
  imprimeDoc(html,'Tarjetas');
}

/* Las dos guías completas de los dos eventos, para el director. */
function imprimeGuiasTodo(){
  const hojas=[];
  for(const ev of ['Conexión Bíblica','Devoción Matutina']){
    const cats=Object.keys(CATS).filter(k=>CATS[k].ev===ev);
    const ids=new Set();
    const caps=CAPS.filter(c=>c.cats.some(x=>cats.includes(x))&&!ids.has(c.id)&&ids.add(c.id));
    const mods=MODULOS.filter(m=>m.cats.some(x=>cats.includes(x)));
    if(!caps.length)continue;
    hojas.push(hojaGuia({
      caps, contenido:CONTENIDO, modulos:mods, contModulos:CONT_MODULOS,
      logo:LOGO_TL,
      titulo:'GUÍA DE ESTUDIO — '+ev.toUpperCase(),
      sub:'Material completo del evento',
      meta:'Los capítulos marcados con ★ también aplican para la categoría de 7 a 9 años',
      marca:c=>c.cats.includes('av')||c.cats.includes('dm2'),
    }));
  }
  imprimeDoc(docExamen(hojas,'Guías de los dos eventos',
    'Las guías completas de los dos eventos, cada una desde su propia hoja.'),
    'Guías completas');
}

/* ───────── pasar y compartir el progreso ─────────
   MECANISMO
   Todo el progreso vive en el localStorage del navegador donde se estudió.
   Eso no se puede consultar desde otro aparato, así que la única forma de
   moverlo es sacarlo como texto. El estado se convierte a JSON, se pasa a
   base64 (para que sobreviva a WhatsApp, que rompe los saltos de línea y las
   comillas) y se le pone un prefijo que dice qué trae.

   DOS CÓDIGOS DISTINTOS, A PROPÓSITO
   · CB1R = resumen. Corto, para mandar por chat. Trae cómo va: capítulos
     leídos, exámenes, racha, insignias, cuántos errores le faltan. Al
     importarlo NO se toca nada: se muestra en pantalla como un boletín.
   · CB1F = ficha completa. Trae todo, incluidos los errores y las tarjetas
     pregunta por pregunta, para restaurarla en otro aparato. Es largo, así
     que además se ofrece como archivo.

   Se separan porque son dos necesidades distintas: el director quiere VER, y
   quien cambia de teléfono quiere RECUPERAR. Un solo código haría que el
   director pegue por chat 4.000 caracteres para ver un porcentaje. */

const aB64=s=>btoa(unescape(encodeURIComponent(s)));
const deB64=s=>decodeURIComponent(escape(atob(s)));

function resumenDe(al){
  const c=CATS[al.cat]||CATS.av;
  const caps=CAPS.filter(x=>x.cats.includes(al.cat));
  return {
    n:al.nombre, c:al.cat, r:al.racha, i:al.insignias||[],
    p:caps.map(x=>x.id+'='+(al.prog[x.id]||0)),
    e:(al.examenes||[]).filter(x=>x.cat===al.cat).slice(-12)
      .map(x=>[x.fecha,x.pts,x.total,x.nv,x.modo].join('/')),
    f:Object.keys(al.fq||{}).length,
    d:Object.values(al.ft||{}).filter(v=>v>=2).length,
    tt:tarjetasDe().length, cn:c.nombre, ce:c.ev,
  };
}

const codigoResumen=()=>'CB1R'+aB64(JSON.stringify(resumenDe(S)));
const codigoCompleto=()=>'CB1F'+aB64(JSON.stringify({n:S.nombre,a:S}));

function leeCodigo(txt){
  const s=String(txt||'').replace(/\s+/g,'');
  const m=/^CB1([RF])([A-Za-z0-9+/=]+)$/.exec(s);
  if(!m)return null;
  try{const o=JSON.parse(deB64(m[2]));o.tipo=m[1];return o;}catch(e){return null;}
}

function ponCodigo(cual){
  const t=document.getElementById('exp-txt');
  if(!t)return;
  const cod=cual==='full'?codigoCompleto():codigoResumen();
  t.value=cod;
  document.getElementById('exp-info').innerHTML=cual==='full'
    ?'<strong>Ficha completa</strong> de '+esc(S.nombre||'este participante')+
     ', '+cod.length+' caracteres. Sirve para recuperar todo en otro aparato. '+
     'Si es muy largo para el chat, usa el botón de guardar como archivo.'
    :'<strong>Resumen</strong> de '+esc(S.nombre||'este participante')+', '+
     cod.length+' caracteres. Se puede pegar en un chat. Muestra cómo va, '+
     'pero no restaura el progreso.';
  const g=document.getElementById('exp-guardar');
  if(g){
    try{
      const b=new Blob([cod],{type:'text/plain'});
      g.href=URL.createObjectURL(b);
      g.download='progreso-'+(S.nombre||'participante').replace(/[^\w-]+/g,'-')+'.txt';
      g.style.display=cual==='full'?'inline-block':'none';
    }catch(e){g.style.display='none';}
  }
}

function copiaCodigo(){
  const t=document.getElementById('exp-txt');
  if(!t||!t.value){ponCodigo('res');return;}
  try{t.select();document.execCommand('copy');}catch(e){}
  if(navigator.clipboard)navigator.clipboard.writeText(t.value).catch(()=>{});
  document.getElementById('exp-info').innerHTML='<strong>Copiado.</strong> Pégalo en el chat.';
}

/* Boletín de solo lectura: lo que ve el director al pegar un resumen. */
function pintaBoletin(o){
  const caps=o.p.map(s=>s.split('='));
  const listos=caps.filter(([,v])=>Number(v)>=100).length;
  const ex=o.e.map(s=>s.split('/'));
  const mejor=ex.length?Math.max(...ex.map(x=>Math.round(x[1]/x[2]*100))):0;
  const ult=ex.slice(-5).map(x=>'<tr><td>'+esc(x[0])+'</td><td>'+esc(x[1])+'/'+esc(x[2])+
    '</td><td>'+Math.round(x[1]/x[2]*100)+'%</td><td>nivel '+esc(x[3])+'</td></tr>').join('');
  return '<div class="bol"><h3>'+esc(o.n||'Sin nombre')+'</h3>'+
    '<p class="nota">'+esc(o.cn||'')+' · '+esc(o.ce||'')+'</p>'+
    '<div class="bol-g">'+
    '<div><b>'+listos+'/'+caps.length+'</b><span>capítulos leídos</span></div>'+
    '<div><b>'+mejor+'%</b><span>mejor puntaje</span></div>'+
    '<div><b>'+ex.length+'</b><span>exámenes</span></div>'+
    '<div><b>'+o.r+'🔥</b><span>días de racha</span></div>'+
    '<div><b>'+o.d+'/'+(o.tt||'?')+'</b><span>tarjetas dominadas</span></div>'+
    '<div><b>'+o.f+'</b><span>errores por repasar</span></div>'+
    '</div>'+
    (ult?'<table class="bol-t"><thead><tr><th>Fecha</th><th>Puntaje</th><th>%</th>'+
      '<th>Nivel</th></tr></thead><tbody>'+ult+'</tbody></table>':
      '<p class="nota">Todavía no ha hecho exámenes.</p>')+
    '<p class="nota">Esto es solo una foto de cómo va. No cambió nada de tus datos.</p></div>';
}

function importaCodigo(){
  const t=document.getElementById('imp-txt');
  const out=document.getElementById('imp-out');
  if(!t||!out)return;
  const o=leeCodigo(t.value);
  if(!o){out.innerHTML='<p class="nota" style="color:var(--rojo)">Ese código no se '+
    'entiende. Tiene que empezar en <strong>CB1R</strong> o <strong>CB1F</strong> y '+
    'venir completo, sin cortar.</p>';return;}
  if(o.tipo==='R'){out.innerHTML=pintaBoletin(o);return;}
  impPendiente=o;
  out.innerHTML='<p class="nota"><strong>Ficha completa de '+esc(o.n||'sin nombre')+
    '.</strong> ¿Qué quieres hacer?</p>'+
    '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.5rem">'+
    '<button class="btn azul" onclick="aplicaImport(\'nueva\')">➕ Agregarla como ficha nueva</button>'+
    '<button class="btn gho" onclick="aplicaImport(\'reemplaza\')">♻️ Reemplazar la ficha actual</button>'+
    '</div>';
}

let impPendiente=null;

function aplicaImport(como){
  if(!impPendiente)return;
  const al=normalizar(impPendiente.a);
  if(como==='nueva'){
    if(alumnos().length>=MAX_ALUMNOS){
      document.getElementById('imp-out').innerHTML='<p class="nota" style="color:var(--rojo)">'+
        'Ya hay '+MAX_ALUMNOS+' fichas en este aparato. Borra una antes de agregar otra.</p>';
      return;
    }
    const id=nuevoId();
    DB.alumnos[id]=al;guardar();
    impPendiente=null;
    cambiaAlumno(id);
    return;
  }
  if(!confirm('¿Reemplazar el progreso de '+(S.nombre||'esta ficha')+' por el de '+
    (al.nombre||'la ficha importada')+'? Lo actual se pierde.'))return;
  DB.alumnos[DB.activo]=al;S=al;guardar();
  impPendiente=null;
  marcaCat();pintaInicio();pintaCaps();ir('inicio');
}

/* ───────── bienvenida ─────────
   MECANISMO
   La categoría (me / av / pa / gm / dm1 / dm2) es el dato del que dependen
   los capítulos que se ven, las preguntas que salen y el techo de
   dificultad. Antes se escogía tocando una de seis tarjetas en el Inicio,
   con «Aventureros» puesto por defecto: un niño de cinco años que no
   tocaba nada estudiaba durante semanas el material de siete a nueve.
   Aquí la categoría ya no se escoge: se deduce de dos preguntas que un
   niño sí sabe contestar, su edad y su evento.

   CUÁNDO SE MUESTRA
   Solo la primera vez: cuando hay un único participante, sin nombre y sin
   nada de progreso. Cualquier dato guardado significa que ya pasó por aquí.

   Si compite en los dos eventos se crean dos fichas, porque el progreso de
   Daniel y el de la matutina no se mezclan. */

let bvEdadSel='av';

const esNuevo=()=>alumnos().length===1&&!S.nombre&&!S.examenes.length&&
  !Object.values(S.prog).some(v=>v>0);

function bvPaso(n){
  ['bv-1','bv-2','bv-3'].forEach((id,i)=>{
    const e=document.getElementById(id);
    if(e)e.classList.toggle('on',i===n-1);
  });
  window.scrollTo({top:0});
}

function bvSigue(){
  const v=document.getElementById('bv-nombre').value.trim();
  const err=document.getElementById('bv-err');
  if(v.length<2){err.textContent='Escribe tu nombre para seguir.';return;}
  err.textContent='';
  S.nombre=v.slice(0,60);guardar();
  document.getElementById('bv-saludo').textContent='Hola, '+v.split(' ')[0]+'. ¿Cuántos años tienes?';
  bvPaso(2);
}

function bvAtras(n){bvPaso(n);}

function bvEdad(e){
  bvEdadSel=e;
  /* Adultos y Guías Mayores no tienen categoría en la matutina: el
     reglamento solo abre 4 a 6 y 7 a 9. Para ellos no hay paso 3. */
  if(e==='pa'||e==='gm'){ponCatBV(e);bvTermina();return;}
  bvPaso(3);
}

function bvEvento(ev){
  const cb=bvEdadSel;
  const dm=bvEdadSel==='me'?'dm1':'dm2';
  if(ev==='cb')ponCatBV(cb);
  else if(ev==='dm')ponCatBV(dm);
  else{
    /* Dos fichas con el mismo nombre, una por evento: el progreso de Daniel
       y el de la matutina son cuentas separadas y no se deben mezclar.
       Se escribe directo en DB en vez de usar agregaAlumno() porque ese
       cambia de participante y navega, y aquí todavía estamos en la
       bienvenida. */
    ponCatBV(cb);
    if(alumnos().length<MAX_ALUMNOS){
      const id=nuevoId();
      const otro=normalizar(null);
      otro.nombre=S.nombre;otro.cat=dm;
      DB.alumnos[id]=otro;
      guardar();
    }
  }
  bvTermina();
}

function ponCatBV(c){S.cat=c;guardar();}

function bvTermina(){
  marcaCat();
  ir('inicio');
  const id=document.getElementById('ident');
  if(id)id.open=false;
  try{cargaEvaluacion();}catch(e){}
}

/* ───────── arranque ───────── */
try{
  pintaLogo();marcaCat();pintaInicio();
  if(esNuevo()){ir('bienvenida');bvPaso(1);}
}catch(e){console.error(e);}

/* ───────── entrar con el código (v20) ─────────
   POR QUÉ UN CÓDIGO Y NO UN USUARIO CON CONTRASEÑA
   Quien usa esto tiene entre 4 y 9 años. Un correo y una contraseña son dos
   cosas que olvidar y una que se escribe mal en un teclado de celular. El
   director entrega un código de 6 caracteres, se escribe UNA vez, y el aparato
   guarda una cookie de 60 días: las siete semanas de estudio caben enteras. */
function pintaSesion(){
  const d=document.getElementById('cb-sesion');
  if(!d)return;
  if(srvYo&&srvYo.rol==='participante'){
    d.innerHTML='<div class="card sesion"><div class="ses-h">Hola, '+esc(srvYo.nombre)+'</div>'+
      '<p class="nota">Categoría '+esc(srvYo.categoria)+'. Tus notas le llegan al director del club.</p>'+
      '<button class="btn gho" onclick="salirCodigo()">Salir de mi ficha</button></div>';
    return;
  }
  d.innerHTML='<div class="card sesion"><div class="ses-h">Entra con tu código</div>'+
    '<p class="nota">El director del club te da un código de 6 letras y números. '+
    'Se escribe una sola vez en este celular.</p>'+
    '<div class="ses-fila"><input id="cb-cod" maxlength="9" autocomplete="off" '+
    'spellcheck="false" placeholder="ABC234" oninput="this.value=this.value.toUpperCase()">'+
    '<button class="btn nar" onclick="entraCodigo()">Entrar</button></div>'+
    '<p class="nota" id="cb-cod-msg"></p>'+
    '<p class="nota">Sin código también puedes estudiar y practicar. El código sirve '+
    'para que tus notas queden con tu nombre y para el examen del día del evento.</p></div>';
}

async function entraCodigo(){
  const i=document.getElementById('cb-cod'),m=document.getElementById('cb-cod-msg');
  if(!i)return;
  if(m)m.textContent='Un momento...';
  try{
    const d=await srvFetch('/entrar',{method:'POST',body:JSON.stringify({codigo:i.value})});
    srvYo={rol:'participante',nombre:d.nombre,categoria:d.categoria};
    /* El código es la identidad: el nombre y la categoría los manda el
       servidor, y la ficha local se alinea con ellos. Antes había dos verdades
       sobre quién era la niña y cuál era su material; ahora hay una. */
    adoptaFicha(d);
    pintaSesion();await cargaEvaluacion();pintaExInicio();pintaInicio();
  }catch(e){
    if(m)m.innerHTML='<span style="color:var(--rojo)">'+esc(e.message||'No se pudo conectar')+'</span>';
  }
}

/* Alinea la ficha local con lo que dice el servidor. No borra el progreso: el
   estudio hecho sigue siendo suyo; solo se corrigen el nombre y la categoría,
   que son los datos que el director necesita que coincidan. */
function adoptaFicha(d){
  if(!d)return;
  let cambio=false;
  if(d.nombre&&S.nombre!==d.nombre){S.nombre=d.nombre;cambio=true;}
  if(d.categoria&&CATS[d.categoria]&&S.cat!==d.categoria){S.cat=d.categoria;cambio=true;}
  if(cambio){
    guardar();marcaCat();pintaIdent();pintaCaps();pintaInicio();
  }
}

async function salirCodigo(){
  try{await srvFetch('/salir',{method:'POST'});}catch(e){}
  srvYo=null;evalPend=null;evalHecha=false;pintaSesion();pintaEvaluacion();
}

/* ───────── el panel del director (v20) ─────────
   La clave es la MISMA que la de v18. Aquí viaja al servidor para abrir una
   sesión de director; la de v18 sigue viviendo en el aparato y sirve para ver
   la revisión sin señal. Dos caminos, una sola clave que recordar. */
async function entraPanel(){
  const i=document.getElementById('pan-clave'),m=document.getElementById('pan-msg');
  if(!i)return;
  if(m)m.textContent='Un momento...';
  try{
    await srvFetch('/panel/entrar',{method:'POST',body:JSON.stringify({clave:i.value})});
    srvYo={rol:'director'};
    await pintaPanel();
  }catch(e){
    if(m)m.innerHTML='<span style="color:var(--rojo)">'+esc(e.message||'No se pudo conectar')+'</span>';
  }
}

async function pintaPanel(){
  const d=document.getElementById('cb-panel');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="det-cuerpo"><p class="nota">Entra con la clave del director para '+
      'cerrar los exámenes de TODOS los aparatos a la vez y para manejar los códigos.</p>'+
      '<div class="ses-fila"><input id="pan-clave" type="password" autocomplete="off" placeholder="Clave">'+
      '<button class="btn azul" onclick="entraPanel()">Entrar</button></div>'+
      '<p class="nota" id="pan-msg"></p></div>';
    return;
  }
  const c=srvLee();
  const hayEval=!!(c&&c.practica===false);
  d.innerHTML='<div class="det-cuerpo">'+
    '<div class="pan-sw"><strong>'+(hayEval?'Evaluación ABIERTA'+(c.evalTitulo?': '+esc(c.evalTitulo):''):'Sin evaluación abierta')+'</strong>'+
    (hayEval
      ?'<button class="btn nar" onclick="cierraEvaluacion()">Cerrar la evaluación</button>'
      :'<button class="btn azul" onclick="abreEvaluacion()">Abrir una evaluación</button>')+'</div>'+
    (hayEval?'':'<div class="ses-fila"><input id="pan-eval-t" placeholder="Nombre, p. ej. Sábado 6 de septiembre" maxlength="60">'+
      '<input id="pan-eval-n" type="number" min="5" max="60" value="15" style="max-width:5.5rem" title="Cuántas preguntas">'+
      '</div>'+
      '<div class="ses-fila"><label class="pan-lb">Dificultad'+
      '<select id="pan-eval-nv">'+
        '<option value="0">La de cada categoría (recomendado)</option>'+
        '<option value="1">1 · básica</option>'+
        '<option value="2">2 · intermedia</option>'+
        '<option value="3">3 · avanzada</option>'+
      '</select></label></div>'+
      '<p class="nota">Con «la de cada categoría» todas las de un mismo grupo reciben '+
      'exactamente el mismo examen. No depende del desempeño de cada una.</p>'+
      '<p class="nota">¿A quiénes les toca? Si no marcas ninguna, les toca a todas.</p>'+
      '<div class="pan-cats">'+Object.keys(CATS).map(function(k){
        return '<label class="pan-cat"><input type="checkbox" class="pan-cat-ch" value="'+k+'"> '+
          '<span><strong>'+esc(CATS[k].nombre)+'</strong><br><small>'+esc(CATS[k].ev)+' · '+esc(CATS[k].edad)+'</small></span></label>';
      }).join('')+'</div>')+
    '<p class="nota">Mientras hay una evaluación abierta, la práctica se cierra sola en '+
    '<strong>todos los aparatos</strong>. Al cerrarla vuelve. Estudiar y las tarjetas nunca se cierran.</p>'+
    '<div id="pan-eval"></div>'+
    '<div class="divisor">Participantes</div>'+
    '<div class="ses-fila"><input id="pan-nom" placeholder="Nombre" maxlength="40">'+
    '<select id="pan-cat">'+Object.keys(CATS).map(function(k){
      return '<option value="'+k+'">'+esc(CATS[k].nombre)+' · '+esc(CATS[k].edad)+'</option>';
    }).join('')+'</select>'+
    '<button class="btn azul" onclick="creaParticipante()">Agregar</button></div>'+
    '<div id="pan-lista"><p class="nota">Cargando...</p></div></div>';
  await cargaParticipantes();
  await cargaResultados();
}

async function abreEvaluacion(){
  const t=document.getElementById('pan-eval-t'),n=document.getElementById('pan-eval-n');
  try{
    const cats=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
      .filter(function(c){return c.checked;}).map(function(c){return c.value;});
    await srvFetch('/panel/evaluacion',{method:'POST',body:JSON.stringify({
      titulo:t?t.value:'',cuantas:n?Number(n.value):15,alcance:'todo',
      nivel:Number((document.getElementById('pan-eval-nv')||{}).value||0),
      categorias:cats,huella:huellaBanco()})});
    await srvRefresca();await pintaPanel();pintaExInicio();pintaInicio();
  }catch(e){alert(e.message||'No se pudo conectar');}
}

async function cierraEvaluacion(){
  try{
    await srvFetch('/panel/evaluacion/cerrar',{method:'POST'});
    await srvRefresca();await pintaPanel();pintaExInicio();pintaInicio();
  }catch(e){alert(e.message||'No se pudo conectar');}
}

/* Lo que el director mira mientras corre la evaluación. Quién FALTA es el dato
   que sirve: con eso va y la busca, en vez de adivinar si ya terminaron. */
async function cargaResultados(){
  const d=document.getElementById('pan-eval');
  if(!d)return;
  try{
    const r=await srvFetch('/panel/evaluacion');
    if(!r.evaluacion&&!(r.hechas||[]).length){d.innerHTML='';return;}
    const h=r.hechas||[],f=r.faltan||[];
    d.innerHTML='<div class="divisor">Cómo va</div>'+
      '<p class="nota"><strong>'+h.length+'</strong> la hicieron · <strong>'+f.length+'</strong> faltan</p>'+
      (h.length?'<div class="tabla-scroll"><table class="info-table"><tr><th>Nombre</th><th>Cat.</th><th>Nota</th></tr>'+
        h.map(function(x){return '<tr><td>'+esc(x.nombre)+'</td><td>'+esc((CATS[x.categoria]||{}).nombre||x.categoria)+'</td><td><strong>'+
          x.nota+'/'+x.total+'</strong></td></tr>';}).join('')+'</table></div>':'')+
      (f.length?'<p class="nota">Faltan: '+f.map(function(x){return esc(x.nombre);}).join(', ')+'</p>':'');
  }catch(e){d.innerHTML='';}
}

async function cargaParticipantes(){
  const d=document.getElementById('pan-lista');
  if(!d)return;
  try{
    const r=await srvFetch('/panel/participantes');
    const p=r.participantes||[];
    if(!p.length){d.innerHTML='<p class="nota">Todavía no hay participantes.</p>';return;}
    d.innerHTML='<div class="tabla-scroll"><table class="info-table"><tr><th>Nombre</th><th>Cat.</th><th>Código</th>'+
      '<th>Exámenes</th><th></th></tr>'+p.map(function(x){
        const cn=CATS[x.categoria]?CATS[x.categoria].nombre:x.categoria;
        return '<tr><td>'+esc(x.nombre)+'</td><td>'+esc(cn)+'</td>'+
          '<td><code>'+esc(x.codigo)+'</code></td><td>'+(x.intentos||0)+'</td>'+
          '<td><button class="btn gho" onclick="borraParticipante(\''+esc(x.id)+'\')">Quitar</button></td></tr>';
      }).join('')+'</table></div>';
  }catch(e){d.innerHTML='<p class="nota">No se pudo cargar: '+esc(e.message||'')+'</p>';}
}

async function creaParticipante(){
  const n=document.getElementById('pan-nom'),c=document.getElementById('pan-cat');
  if(!n||!n.value.trim())return;
  try{
    await srvFetch('/panel/participantes',{method:'POST',
      body:JSON.stringify({nombre:n.value,categoria:c.value})});
    n.value='';
    await cargaParticipantes();
  }catch(e){alert(e.message||'No se pudo conectar');}
}

async function borraParticipante(id){
  try{
    await srvFetch('/panel/participantes/'+encodeURIComponent(id)+'/borrar',{method:'POST'});
    await cargaParticipantes();
  }catch(e){alert(e.message||'No se pudo conectar');}
}

/* Arranque: se le pregunta al servidor sin bloquear la pantalla. Si no hay
   señal, la app abre igual con lo último que supo. */
(async function(){
  try{
    await srvRefresca();
    await srvQuienSoy();
    pintaSesion();
    await cargaEvaluacion();
    try{await enviaCola();}catch(e){}
    await pintaPanel();
    if(typeof pintaExInicio==='function')pintaExInicio();
    if(typeof pintaInicio==='function')pintaInicio();
  }catch(e){}
})();
