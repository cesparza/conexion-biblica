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
/* ── EL MODELO: ACTIVIDAD × CATEGORIA ───────────────────────────────────
   Hay TRES actividades distintas, con fechas, jurados y reglamentos propios,
   y categorias por edad o rol DENTRO de cada una. Son dos dimensiones, no
   una.

   POR QUE ESTABA MAL Y COMO SE ARREGLO
   Antes cada actividad se resolvia distinto: Conexion Biblica con un campo
   `ev` de texto libre, la Devocion Matutina con claves propias (dm1, dm2), y
   las 28 creencias con un `S.evento` aparte y un conmutador. Tres mecanismos
   para el mismo concepto. Y `gm` declaraba a la vez ev:'Conexion Biblica' y
   edad:'Otro evento': el dato se contradecia solo.

   Ahora ACTIVIDADES es el dato de primer nivel y CATS declara a que actividad
   pertenece cada categoria. La clave de categoria NO cambio (av sigue siendo
   av), asi que el progreso guardado en los celulares y las 7 participantes de
   la base siguen valiendo tal cual: este rediseno no migra nada.

   UNA FICHA POR ACTIVIDAD, que es el patron que la app ya tenia
   La bienvenida ya creaba dos fichas para quien hacia Conexion Biblica y
   Matutina, con el comentario «el progreso de Daniel y el de la matutina son
   cuentas separadas y no se deben mezclar». Eso era lo correcto y ahora
   aplica a las tres: cada ficha tiene su prog, su racha y sus insignias, asi
   que el progreso queda separado POR CONSTRUCCION y no hace falta ninguna
   funcion que lo desmezcle. */
const ACTIVIDADES={
  cb:{nombre:'Conexión Bíblica', icono:'📘', cuando:'9 de octubre',
      que:'El libro de Daniel y Profetas y Reyes', cats:['me','av','pa','gm']},
  dm:{nombre:'Devoción Matutina', icono:'🌅', cuando:'Todo octubre',
      que:'Héroes y villanos, un día a la vez', cats:['dm1','dm2']},
  ec:{nombre:'En esto creemos', icono:'✝️', cuando:'Por confirmar',
      que:'Las 28 creencias', cats:['ec1','ec2']},
};

const CATS={
  me:{act:'cb', nombre:'Menores',  edad:'4 a 6 años',  n:10, techo:1, sinCompletar:true,
      alcance:'Daniel 1, 3 y 6'},
  av:{act:'cb', nombre:'Aventureros', edad:'7 a 9 años', n:15, techo:3, sinCompletar:false,
      alcance:'Daniel 1, 3 y 6 · P&R 39, 41 y 44'},
  pa:{act:'cb', nombre:'Padres y consejeros', edad:'Adultos', n:25, techo:3, sinCompletar:false,
      alcance:'Daniel 1, 3 y 6 · P&R 39, 41 y 44'},
  gm:{act:'cb', nombre:'Guías Mayores', edad:'Guías Mayores', n:25, techo:3, sinCompletar:false,
      alcance:'Daniel 1 al 6 · P&R 39 al 44'},
  dm1:{act:'dm', nombre:'Menores', edad:'4 a 6 años', n:10, techo:1, sinCompletar:true,
      alcance:'Héroes y villanos · 1 al 15 de octubre'},
  dm2:{act:'dm', nombre:'Aventureros', edad:'7 a 9 años', n:15, techo:2, sinCompletar:true,
      alcance:'Héroes y villanos · 1 al 30 de octubre'},
  /* El reglamento de «En esto creemos» reparte el club en dos: dos adultos
     presentan un examen escrito y el resto contesta otro cuestionario, y las
     dos notas SE SUMAN. Por eso son dos categorias y no una. */
  ec1:{act:'ec', nombre:'Los dos del examen escrito', edad:'Adultos', n:25, techo:3, sinCompletar:false,
      alcance:'Las 28 creencias'},
  ec2:{act:'ec', nombre:'El resto del club', edad:'Cuestionario', n:15, techo:2, sinCompletar:true,
      alcance:'Las 28 creencias'},
};

/** La actividad de una categoria, y su ficha completa. */
const ACT_DE=c=>(CATS[c]||CATS.av).act;
const ACT=()=>ACTIVIDADES[ACT_DE(S.cat)]||ACTIVIDADES.cb;
/** Las categorias de una actividad, en el orden en que se ofrecen. */
const CATS_DE_ACT=a=>(ACTIVIDADES[a]||ACTIVIDADES.cb).cats.filter(c=>CATS[c]);


const CAT=()=>CATS[S.cat]||CATS.av;

const CLAVE='conexion-biblica-v4';
/* `ft` es la caja de cada tarjeta (0, 1 o 2) y ya venía de antes. `fv` es
   NUEVO: el día en que se acertó por última vez. Se agrega como mapa aparte, y
   no cambiando la forma de `ft`, para que el progreso que ya está guardado en
   los celulares siga valiendo sin migración. */
const BASE={v:4,nombre:'',cat:'av',prog:{},examenes:[],racha:0,ultimo:null,insignias:[],fq:{},ft:{},fv:{},acc:{},act:{},links:{}};

/* Clave estable por pregunta/tarjeta: hash del texto, sobrevive a
   reordenar el banco en fuente/. */
function hashTxt(s){let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
const claveQ=q=>q.cap+'.'+hashTxt((q.q||q.ins||'')+(q.p?q.p.map(p=>p.b||p.x).join('¦'):''));
const claveT=t=>t.cap+'.'+hashTxt(t.f||'');

/* Día local, no UTC ni horas. Va ACÁ ARRIBA a propósito: normalizar() la usa
   para acotar fechas del futuro, y normalizar() corre al leer el estado
   guardado, mucho antes de la sección de tarjetas. Definirla allá abajo dejaba
   la app sin arrancar. */
/* Van aca arriba, no junto a habla(): ir() llama paraVoz() y esta declarado
   antes que la seccion de voz. Un `let` usado antes de su declaracion lanza
   por TDZ y la app no arranca, y el chequeo de sintaxis no lo detecta. Ya
   paso una vez en este archivo con diaHoy. */
let vozBtn=null, vozReloj=null;

const diaHoy=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5);

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
  /* `act` es NUEVO: acierto por TIPO de pregunta (múltiple, V/F, completar).
     `acc` ya guardaba por capítulo, y eso dice DÓNDE falla pero no EN QUÉ. La
     sección III del examen real es completar el versículo: ir al 90% en
     múltiple y al 40% en completar da el mismo promedio por capítulo que ir
     al 65% en las dos, y son dos situaciones muy distintas. */
  if(x.act&&typeof x.act==='object')
    for(const t of ['mc','tf','fill']){
      const v=x.act[t];
      if(v&&typeof v==='object'){
        const b=Math.max(0,Math.round(Number(v.b)||0)),m=Math.max(0,Math.round(Number(v.m)||0));
        if(b+m>0)s.act[t]={b:Math.min(9999,b),m:Math.min(9999,m)};
      }
    }
  if(x.fv&&typeof x.fv==='object')
    for(const k of Object.keys(x.fv).slice(0,600)){
      const d=Number(x.fv[k]);
      /* Una fecha del futuro sería un reloj mal puesto: se acota a hoy, o la
         tarjeta no volvería a salir nunca. */
      if(Number.isFinite(d)&&d>0)s.fv[k]=Math.min(diaHoy(),Math.round(d));
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
  mazo=[];tjI=0;tjFiltro='hoy';alcance='todo';cuantas=0;nivel=0;
  prueba=[];resp={};entregado=false;clearInterval(reloj);
  marcaCat();pintaInicio();pintaCaps();pintaYo();
  try{document.getElementById('detalle').style.display='none';}catch(e){}
  cierraHoja();
  /* Se aterriza en Inicio a propósito: al cambiar de persona o de actividad el
     mazo y el examen se reiniciaron, y quedarse en Tarjetas con un mazo vacío
     no se entiende. Inicio dice qué estudiar hoy con el material nuevo. */
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
/* La categoria ya identifica la actividad (av es Conexion Biblica de 7 a 9,
   dm2 es Matutina de 7 a 9, ec1 son los dos adultos de las creencias), asi
   que filtrar por categoria filtra por actividad. Esto era un enredo de tres
   funciones (capsCat, dosActividades y un conmutador) mientras las creencias
   vivian colgadas de las categorias de Conexion Biblica. */
const capsDe=()=>CAPS.filter(c=>c.cats.includes(S.cat));
/* Un capitulo puede ser material de estudio y NO salir en el examen. `extra`
   lista las categorias para las que es solo lectura: el reglamento dejo
   Daniel 2 fuera del examen de Menores, Aventureros y Padres, pero se sigue
   estudiando, y para Guias Mayores si cuenta. */
const soloEstudio=(c,cat)=>Array.isArray(c.extra)?c.extra.includes(cat):!!c.extra;

const bancoDe=()=>{
  const ids=capsDe().filter(c=>!soloEstudio(c,S.cat)).map(c=>c.id);
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
  paraVoz();
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
  pintaSenales();
  window.scrollTo({top:0});
}

function ponNombre(v){S.nombre=String(v).slice(0,60);guardar();pintaAlumnos();pintaYo();}
/* ───────── UNA FICHA, UNA ACTIVIDAD: invariante, no recomendación ─────────
   MECANISMO
   `racha`, `insignias` y `examenes` son campos de la FICHA. Eso da el
   comportamiento correcto mientras cada ficha pertenezca a una sola actividad,
   que es como la app se usa. Pero `ponCat` permitía saltar de `av` a `ec1`
   DENTRO de la misma ficha, y entonces esos tres campos se arrastraban.

   MEDIDO, no supuesto: con racha 7, dos insignias y tres exámenes de Conexión
   Bíblica, al pasar a las creencias la ficha llegaba con la racha, las
   insignias y los tres exámenes puestos, y `revisaInsignias` le daba
   «Persistente» en creencias por exámenes que había hecho en Daniel.

   El manual lo tapaba pidiéndole al usuario que agregara otro participante a
   mano. **Una nota que le pide al usuario mantener un invariante no es un
   invariante.**

   DECISIÓN
   Cambiar a una categoría de OTRA actividad ya no muta la ficha: busca la ficha
   de esa actividad con el mismo nombre y se pasa a ella, o la crea. Es
   exactamente lo que decía la nota, hecho por la app. El selector sigue
   mostrando las tres actividades, que es lo que las hace descubribles.

   Sin migración: usa `DB.alumnos`, que ya existía. */
/** Una ficha SIN NADA que proteger: ni progreso, ni exámenes, ni racha, ni
 *  insignias, ni errores. El nombre no cuenta, porque escribirlo no es haber
 *  estudiado. Solo cuando hay algo guardado vale la pena partir la ficha. */
const sinProgreso=al=>!al||(
  !Object.values(al.prog||{}).some(v=>v>0) &&
  !(al.examenes||[]).length &&
  !(al.insignias||[]).length &&
  !(al.racha>0) &&
  !Object.keys(al.fq||{}).length);

function ponCat(c){
  if(!CATS[c])return;
  if(ACT_DE(c)!==ACT_DE(S.cat)&&pasaAActividad(c))return;
  S.cat=c;guardar();
  marcaCat();
  pintaInicio();pintaCaps();pintaYo();
  try{document.getElementById('detalle').style.display='none';}catch(e){}
  /* Cambiar de categoría cambia el material entero, así que el mazo y el examen
     armado eran de la categoría anterior. Igual que al cambiar de persona. */
  mazo=[];tjI=0;prueba=[];resp={};entregado=false;
  try{clearInterval(reloj);}catch(e){}
  cierraHoja();
  ir('inicio');
}

/**
 * Lleva a la ficha que le corresponde a la categoría `c`, que es de otra
 * actividad. Devuelve `true` si se encargó del cambio, y `false` si `ponCat`
 * debe seguir y escribir la categoría en la ficha actual.
 *
 * El orden de los tres casos importa:
 * 1. Si ya existe una ficha de esa actividad con el mismo nombre, se pasa a
 *    ella. Va PRIMERO, incluso si la ficha actual está vacía: si no, la ficha
 *    vacía se queda con la actividad y la que tiene el progreso queda huérfana.
 * 2. Si la ficha actual no tiene nada que proteger, se le escribe la categoría
 *    encima. Es el caso de «+ Agregar», que crea la ficha en `av` por defecto;
 *    sin esto quedaban dos fichas, una vacía en Conexión Bíblica y la buena.
 * 3. Si hay progreso y no hay ficha destino, se crea. En el tope de fichas no
 *    se crea ni se muta: se avisa y no se pierde nada.
 */
function pasaAActividad(c){
  const nom=(S.nombre||'').trim().toLowerCase();
  const act=ACT_DE(c);
  const mia=alumnos().find(([,al])=>ACT_DE(al.cat)===act&&(al.nombre||'').trim().toLowerCase()===nom);
  if(mia){
    /* Se respeta SU categoría, no la que se acabó de tocar: su progreso es de
       esa. Quien quiera cambiarla, ya estando ahí, la cambia dentro. */
    cambiaAlumno(mia[0]);
    return true;
  }
  if(sinProgreso(S))return false;
  if(alumnos().length>=MAX_ALUMNOS){
    try{alert('Ya hay '+MAX_ALUMNOS+' fichas en este aparato. Borra una antes de agregar otra.');}catch(e){}
    return true;
  }
  const id=nuevoId();
  DB.alumnos[id]=normalizar({nombre:S.nombre,cat:c});
  guardar();
  cambiaAlumno(id);
  return true;
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
  /* Agrupado por actividad y con su nombre completo, no con la clave: este
     selector es tambien donde alguien que estudia dos actividades cambia de
     una a otra, asi que tiene que leerse como «Conexion Biblica», no «cb». */
  const eventos=Object.keys(ACTIVIDADES);
  cont.innerHTML=eventos.map(ev=>
    '<div class="cat-grupo">'+ACTIVIDADES[ev].icono+' '+esc(ACTIVIDADES[ev].nombre)+
    ' <small>· '+esc(ACTIVIDADES[ev].cuando)+'</small></div>'+
    '<div class="cat-fila">'+Object.entries(CATS).filter(([,c])=>c.act===ev).map(([k,c])=>
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

  /* La tarea del día es la SESIÓN, no el total pendiente. «102 tarjetas por
     dominar» no le dice a nadie qué hacer hoy; «15 tarjetas hoy» sí. */
  const nHoy=Math.min(tocanHoy().length,topeSesion());
  const porDominar=tarjetasDe().filter(t=>cajaT(t)<2).length;
  if(nHoy)tareas.push({ic:'tarjetas',t:nHoy+' tarjetas para hoy',
    d:'La sesión del día: primero lo que fallaste, y las dominadas vuelven a salir a los cuatro días. '+
      'Quedan '+porDominar+' por dominar en total.',
    b:'Abrir la sesión',f:"irTarjetasHoy()"});
  else if(tarjetasDe().length)tareas.push({ic:'tarjetas',t:'Tarjetas al día',
    d:'Ya repasaste lo que tocaba hoy. Las dominadas vuelven a salir en unos días.',
    b:'Repasar igual',f:"irTarjetasTodas()"});

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
function irTarjetasHoy(){tjFiltro='hoy';ir('tarjetas');tjBaraja();}
/* Del punto débil al examen de ese capítulo en un toque. Antes el panel decía
   dónde estaba flojo y dejaba al usuario armando el examen a mano. */
function examenDelCapitulo(id){
  if(!capsDe().some(c=>c.id===id&&!soloEstudio(c,S.cat)))return;
  alcance=id;nivel=0;cuantas=0;
  arrancaExamen('normal');
}
function irTarjetasTodas(){tjFiltro='todas';ir('tarjetas');tjBaraja();}
async function examenDeCapitulo(id){alcance=id;cuantas=0;ir('examen');pintaMenuEx();await arrancaExamen('normal');}

/* ───────── inicio ───────── */
/* ───────── quién estudia: la ficha de la barra y la hoja ─────────
   MECANISMO
   Las pantallas se conmutan con `ir()`, que solo prende una `.pantalla`. El
   panel de identidad vivía DENTRO de la pantalla de Inicio, así que solo
   existía ahí: para cambiar de persona o de actividad desde Estudiar había que
   volver a Inicio, abrirlo, cambiar, y navegar otra vez.

   POR QUÉ ESO IMPORTA MÁS DE LO QUE PARECE
   No es solo comodidad. El problema real es que en Estudiar, Tarjetas, Examen
   y Logros NADA en pantalla decía de quién era el progreso ni de qué actividad.
   Las dos hijas de Camilo comparten teléfono: María Camila podía hacer una
   sesión entera de tarjetas dentro de la ficha de Isabella y ninguna de las dos
   se daba cuenta hasta ver la racha rara. La identidad es ESTADO, y el estado
   que decide todo lo que se ve tiene que estar siempre a la vista, no a tres
   toques.

   DECISIÓN
   La ficha va en la barra, visible en las cinco pantallas, y al tocarla sube la
   MISMA hoja inferior que ya se usa para los versículos. Dos cosas de un golpe:
   se lee siempre quién estudia y qué estudia, y se cambia desde donde uno esté.
   No se estrenó ningún mecanismo: la hoja, su fondo, su asa y su Escape ya
   estaban probados. */
function pintaYo(){
  const b=document.getElementById('nav-yo');
  if(!b)return;
  const nom=S.nombre||'Sin nombre';
  b.innerHTML='<span class="yo-ini" aria-hidden="true">'+esc(nom.trim().charAt(0).toUpperCase()||'?')+'</span>'+
    '<span class="yo-tx"><span class="yo-n">'+esc(nom)+'</span>'+
    '<span class="yo-c">'+esc(ACT().icono+' '+CAT().nombre)+'</span></span>'+
    /* El globo es un nodo propio, no el `title` del navegador, por dos razones:
       el title tarda un segundo largo en salir y no admite dos renglones. En
       escritorio la ficha se reduce a la inicial, así que sin esto queda un
       botón mudo y hay que abrir el panel para saber quién estudia. */
    '<span class="yo-tip" aria-hidden="true"><b>'+esc(nom)+'</b>'+
    esc(ACT().icono+' '+ACT().nombre+' · '+CAT().nombre)+'</span>';
  b.setAttribute('aria-label','Estudia '+nom+', '+CAT().nombre+' de '+ACT().nombre+'. Toca para cambiar.');
}

/** Sube la hoja de identidad. El esqueleto trae los mismos ids que ya usan
 *  pintaAlumnos() y pintaSelectorCat(), así que esas dos siguen sirviendo sin
 *  cambios: pintan si su contenedor existe, y existe solo con la hoja abierta. */
function abreYo(){
  abreHojaHtml(
    '<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="Quién estudia y qué estudia">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab">'+
      /* El subtítulo dice solo la actividad: el nombre y la categoría ya están
         dos centímetros más abajo, y repetirlos aquí solo lograba que se
         cortaran con puntos suspensivos. */
      '<div><div class="hoja-ref">Quién estudia</div>'+
      '<div class="hoja-sub">'+esc(ACT().icono+' '+ACT().nombre)+'</div></div>'+
      '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">✕</button>'+
    '</div>'+
    '<div class="hoja-txt ident-cuerpo">'+
      '<h3>👥 ¿Quién estudia?</h3>'+
      '<div class="alu-sel" id="alu-sel"></div>'+
      '<input id="nombre" class="txti" type="text" placeholder="Escribe el nombre..." oninput="ponNombre(this.value)">'+
      '<p class="nota">Cada participante guarda su <strong>propio progreso</strong>. '+
      'Toca un nombre para cambiar de persona.</p>'+
      '<h3>🎯 Actividad y categoría</h3>'+
      '<div class="cat-sel" id="cat-sel"></div>'+
      '<p class="nota">Cada categoría pertenece a <strong>una actividad</strong>, y '+
      'define qué capítulos ves, de dónde salen las preguntas y hasta qué '+
      'dificultad llegan. Si tocas una categoría de <strong>otra actividad</strong>, '+
      'la app te lleva a tu ficha de esa actividad, o te la crea con tu mismo '+
      'nombre: así cada actividad guarda su progreso, su racha y sus insignias '+
      'aparte, y nada se revuelve.</p>'+
      '<p class="nota">En Conexión Bíblica el reglamento del campamento pide '+
      '<strong>Daniel 1, 3 y 6</strong> y los capítulos 39, 41 y 44 de Profetas y '+
      'Reyes; <strong>Guías Mayores</strong> es el alcance ampliado de otro '+
      'evento.</p>'+
    '</div></div>','yo');
  pintaAlumnos();pintaSelectorCat();
  const ni=document.getElementById('nombre');
  if(ni)ni.value=S.nombre||'';
  ancla();
}

/* En escritorio el panel no es una hoja: es un popover al lado del riel, a la
   altura de la ficha. La posición exacta no se puede escribir en el CSS porque
   depende de dónde quedó la ficha dentro del riel, así que se mide al abrir y
   se pasa en dos variables. El CSS decide si las usa o no; en celular las
   ignora y la hoja sigue subiendo desde abajo. */
/* Debajo de esto el popover no vale la pena: no alcanza para el selector de
   participantes y el primer grupo de categorías. */
const MIN_POPOVER=380;

function ancla(){
  try{
    if(!window.matchMedia||!window.matchMedia('(min-width:900px)').matches)return;
    const b=document.getElementById('nav-yo'), h=document.getElementById('hoja');
    if(!b||!h||!b.getBoundingClientRect)return;
    const r=b.getBoundingClientRect();
    /* La X se mide contra el borde del RIEL, no de la ficha: la ficha es un
       cuadro de 42 px centrado dentro de un riel de 92, así que anclar a su
       borde derecho dejaba el popover metido debajo del riel. */
    const nav=document.querySelector('.nav');
    const borde=nav&&nav.getBoundingClientRect?nav.getBoundingClientRect().right:r.right;
    h.style.setProperty('--yo-x',Math.round(Math.max(r.right,borde)+12)+'px');

    /* HACIA ARRIBA O HACIA ABAJO, medido y no supuesto.
       El popover crecía siempre hacia abajo desde el borde superior de la
       ficha. Con la ficha al pie del riel eso dejó el panel en 91 px de alto:
       `max-height` se calcula contra lo que queda de pantalla, y abajo no
       quedaba nada. Si el espacio de abajo no alcanza, se ancla por el borde
       INFERIOR y crece hacia arriba, que es lo que hace cualquier menú de
       sistema cuando el botón está al pie. */
    const alto=window.innerHeight||800;
    const abajo=alto-r.top-24;
    if(abajo>=MIN_POPOVER){
      h.classList.remove('hoja-arriba');
      h.style.setProperty('--yo-y',Math.round(r.top)+'px');
    }else{
      h.classList.add('hoja-arriba');
      h.style.setProperty('--yo-b',Math.round(Math.max(16,alto-r.bottom))+'px');
    }
  }catch(e){}
}

/* ───────── las senales de la barra ─────────
   MECANISMO
   Los cuatro datos ya los calcula la app: el promedio de `S.prog`, `tocanHoy()`,
   `falladasDe()` y `evalPend`. Lo que faltaba no era el dato, era que se viera
   sin entrar a la pantalla: hasta v51 había que abrir Tarjetas para saber si
   tocaban tarjetas, y abrir Logros para saber cuántos errores quedaban.

   POR QUÉ ES UN TABLERO Y NO ADORNO
   La app ya tiene «Qué estudiar hoy», pero solo en Inicio. Estando en Estudiar,
   nada decía que había 25 tarjetas esperando. La barra está en las cinco
   pantallas, así que es el único sitio donde el pendiente cabe siempre.

   Se llama desde `ir()`, o sea en cada navegación, y desde `pintaInicio()`. Los
   nodos ya existen en el HTML: aquí solo se llenan o se esconden. */
function senal(id,valor){
  const e=document.getElementById(id);
  if(!e)return;
  const n=Number(valor)||0;
  e.hidden=n<=0;
  if(n>0)e.textContent=n>99?'99+':String(n);
}

function pintaSenales(){
  try{
    /* El anillo de Estudiar promedia capítulos Y repasos, que es lo que la
       insignia «Lector completo» exige: promediar solo capítulos daría 100%
       con los repasos sin leer. */
    const items=[...capsDe(),...modsDe()];
    const pct=items.length
      ?Math.round(items.reduce((a,c)=>a+Math.min(100,S.prog[c.id]||0),0)/items.length):0;
    const est=document.getElementById('nv-est');
    /* En 0 no se muestra: un cero ocupa lugar y no dice nada que la pantalla de
       Inicio no diga mejor. En 100 sí se muestra, porque «100%» es justo lo que
       uno quiere ver de reojo. */
    if(est){est.hidden=pct<=0; if(!est.hidden)est.textContent=pct+'%';}
    senal('nv-tj',Math.min(tocanHoy().length,topeSesion()));
    senal('nv-lg',falladasDe().length);
    /* El punto verde del examen es lo único que NO sale del progreso propio:
       sale del servidor, y solo si la evaluación está abierta y sin hacer. */
    const ex=document.getElementById('nv-ex');
    if(ex)ex.hidden=!(evalPend&&!evalHecha);
  }catch(e){}
}

function pintaInicio(){
  pintaAlumnos();
  pintaYo();
  pintaSenales();
  pintaHoy();
  pintaSelectorCat();
  /* El campo del nombre vive en la hoja, que casi siempre está cerrada. Sin la
     guarda, pintaInicio() revienta al leer `.value` de null. */
  const ni=document.getElementById('nombre');
  if(ni&&ni.value!==S.nombre)ni.value=S.nombre;

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
    '<div class="t">'+esc(c.sub)+'</div>'+
    /* Cuantos versiculos trae, para poder repartir la lectura antes de abrirlo:
       Daniel 2 son 49 y Daniel 1 son 21, y eso cambia como se planea la semana.
       Solo los capitulos de la Biblia lo tienen; los de P&R no son versiculos. */
    '<div class="f">'+esc(c.src)+(c.vs?' · '+c.vs+' vers.':'')+'</div>'+
    /* Sin este aviso, un capítulo que se estudia y nunca sale en el examen
       parece un error de la app. Se dice donde se toma la decisión de leerlo. */
    (soloEstudio(c,S.cat)?'<div class="solo-est">Solo para estudiar</div>':'')+
    '<div class="p">'+(S.prog[c.id]||0)+'% leído</div></button>').join('');
  const mods=modsDe().map(m=>
    '<button class="mod c-'+m.id+'" onclick="verCap(\''+m.id+'\')">'+
    '<div class="ic">'+m.icono+'</div><div><div class="t">'+esc(m.label)+'</div>'+
    '<div class="s">'+esc(m.sub)+'</div>'+
    '<div class="p" style="font-size:.7rem;color:var(--verde);font-weight:700;margin-top:4px">'+(S.prog[m.id]||0)+'%</div>'+
    '</div></button>').join('');
  document.getElementById('lista-caps').innerHTML=
    /* El rotulo dice en que se esta: «Capitulos» dentro de las 28 creencias
       se lee como si fueran capitulos de la Biblia. */
    '<div class="grupo" style="grid-column:1/-1">'+
    ACT().icono+' '+(ACT_DE(S.cat)==='ec'?'Las 28 creencias':'Capítulos')+
    '</div>'+caps+
    '<div class="grupo" style="grid-column:1/-1">🔎 Repaso general</div>'+mods;
}

/* ═══════════ LOS VERSICULOS DENTRO DEL ESTUDIO ═══════════
   Dos formas de llegar al texto, y usan el mismo VERS de fuente/biblia.js:
   una referencia tocable al lado de cada dato, y el capitulo completo
   desplegable arriba. La idea es no tener que salir de la seccion para
   comprobar de donde sale un dato. */

/* MECANISMO DEL REEMPLAZO, Y POR QUE VA EN DOS PASADAS
   El material ya trae 163 referencias escritas como «(2:41)», «(Daniel 2:38)»
   o «(3:2-3)». En vez de reescribir los doce archivos de contenido, se
   convierten al pintar.

   Un regex suelto de \d+:\d+ NO sirve, y esto se probo: en las 28 creencias
   y en P&R hay doce citas de otros libros con ese mismo formato, y «Jn 3:16»
   habria abierto Daniel 3:16. Un versiculo equivocado presentado con la
   etiqueta «RV1995» es peor que no ofrecer el versiculo.

   Por eso: se acepta «Daniel N:M» en cualquier parte, y «N:M» a secas SOLO
   dentro de un parentesis y SOLO en un capitulo de Daniel, donde «(2:41)» no
   puede querer decir otra cosa. Si el parentesis trae una palabra con
   mayuscula que no sea Daniel ni RV1995, se deja quieto: ahi puede haber un
   nombre de libro.

   El texto se parte por etiquetas y solo se toca lo que esta FUERA de una: si
   el regex entrara en un atributo (un onclick, una clase) romperia el HTML
   sin avisar. */
const BIBLIA_CAPS=['d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12'];
const OTRO_LIBRO=/\b(?!Daniel\b|RV1995\b)(?:[123]\s?)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,}\b/;

/* CITAS A OTROS LIBROS (fuente/biblia-otros.js, RV1909, dominio publico).
   Mismo boton, misma hoja: solo cambia de que tabla sale el texto y que
   version se rotula. Un cid de Daniel es 'd'+numero; uno de otro libro es
   'slug-capitulo' (por ejemplo 'apocalipsis-1'), y los dos formatos nunca se
   confunden porque Daniel no lleva guion. */
function tablaDeCid(cid){
  if(typeof VERS!=='undefined'&&VERS[cid]){
    return {mapa:VERS[cid], ref:'Daniel '+cid.replace('d',''), version:'RV1995'};
  }
  if(typeof OTRAS_VERS!=='undefined'&&OTRAS_VERS[cid]){
    const meta=(typeof OTRAS_META!=='undefined'&&OTRAS_META[cid])||{};
    return {mapa:OTRAS_VERS[cid], ref:(meta.libro||'')+' '+(meta.cap||''), version:meta.version||'RV1909'};
  }
  return null;
}

/* Regex de citas a otro libro, armado desde NOMBRES_OTROS: «Apocalipsis
   1:13-16», «2 Reyes 24:1», etc. Si biblia-otros.js no esta cargado (por
   ejemplo en una prueba que solo mira un fragmento del archivo) esto queda
   en null y esa pasada simplemente no corre. */
const KEY_POR_NOMBRE=(typeof NOMBRES_OTROS!=='undefined')
  ?Object.keys(NOMBRES_OTROS).reduce((m,k)=>{m[NOMBRES_OTROS[k]]=k;return m;},{})
  :{};
const OTRO_LIBRO_CITA=(typeof NOMBRES_OTROS!=='undefined')
  ?new RegExp('\\b('+Object.values(NOMBRES_OTROS).map(n=>n.replace(/\s+/g,'\\s+'))
      .sort((a,b)=>b.length-a.length).join('|')+')\\s+(\\d{1,3}):(\\d{1,3})(?:[-–](\\d{1,3}))?','g')
  :null;

function botonRef(todo,c,v,v2){
  const cid='d'+c;
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[+v])return todo;
  const hasta=(v2&&+v2>+v&&t.mapa[+v2])?+v2:+v;
  return '<button type="button" class="vref" title="Ver el versículo"'+
    ' onclick="verVers(this,\''+cid+'\','+(+v)+','+hasta+')">'+todo+'</button>';
}

function botonRefOtro(todo,nombre,c,v,v2){
  const key=KEY_POR_NOMBRE[nombre];
  if(!key)return todo;
  const cid=key+'-'+c;
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[+v])return todo;
  const hasta=(v2&&+v2>+v&&t.mapa[+v2])?+v2:+v;
  return '<button type="button" class="vref" title="Ver el versículo"'+
    ' onclick="verVers(this,\''+cid+'\','+(+v)+','+hasta+')">'+todo+'</button>';
}

function refsTocables(html,capId){
  if(typeof VERS==='undefined')return html;
  const enDaniel=BIBLIA_CAPS.indexOf(capId)>=0;
  return html.split(/(<[^>]+>)/).map(tr=>{
    if(tr.charAt(0)==='<')return tr;
    /* Pasada 1: «Daniel N:M» dice el libro, asi que vale en cualquier lado.
       Se marca el trozo ya convertido con \u0000 para que las pasadas
       siguientes no vuelvan a entrar en el, que anidaria un boton dentro de
       otro. */
    let out=tr.replace(/Daniel\s+(\d{1,2}):(\d{1,2})(?:[-–](\d{1,2}))?/g,
      (todo,c,v,v2)=>'\u0000'+botonRef(todo,c,v,v2)+'\u0000');
    /* Pasada 2: «Libro N:M» para un libro distinto de Daniel, en cualquier
       parte (fuera o dentro de parentesis). El nombre completo del libro ya
       distingue la cita: no hace falta el candado de la pasada 3. */
    if(OTRO_LIBRO_CITA){
      out=out.replace(OTRO_LIBRO_CITA,(todo,nombre,c,v,v2)=>{
        if(todo.indexOf('\u0000')>=0)return todo;
        return '\u0000'+botonRefOtro(todo,nombre,c,v,v2)+'\u0000';
      });
    }
    if(enDaniel){
      /* Pasada 3: (N:M) suelto dentro de parentesis, solo en un capitulo de
         Daniel, y solo si el parentesis no nombra ya otro libro. */
      out=out.replace(/\(([^)]*)\)/g,(todo,dentro)=>{
        if(dentro.indexOf('\u0000')>=0||OTRO_LIBRO.test(dentro))return todo;
        return '('+dentro.replace(/(\d{1,2}):(\d{1,2})(?:[-–](\d{1,2}))?/g,
          (t2,c,v,v2)=>botonRef(t2,c,v,v2))+')';
      });
    }
    return out.split('\u0000').join('');
  }).join('');
}

/* ── LA HOJA DEL VERSICULO ───────────────────────────────────────────────
   POR QUE UNA HOJA Y NO UN PANEL EN LINEA
   El panel en linea empujaba el contenido: el versiculo aparecia y todo lo de
   abajo bajaba, asi que en una lista de seis puntos se perdia el renglon que
   se estaba leyendo. Un modal centrado no empuja, pero tapa el dato, que era
   justo lo que se queria ver al lado.
   La hoja sube desde abajo, cubre la mitad inferior y deja a la vista la
   parte de arriba, donde esta el dato. Y como no toca el flujo, se puede
   abrir y cerrar diez veces sin mover el texto ni un pixel.

   Ademas permite algo que el panel no: pasar al versiculo de al lado sin
   cerrar, que es como se lee una Biblia de verdad. */
let hojaCid=null, hojaDe=0, hojaHasta=0;

/* La hoja es UNA sola pieza reutilizable, no dos. `hojaTipo` dice qué está
   mostrando ('vers' o 'yo'); `hojaCid` sigue siendo estado exclusivo del
   versículo. Tener dos hojas con su propio abrir, cerrar, fondo, asa y Escape
   habría sido el mismo error que v47 arrancó: dos mecanismos para un concepto. */
let hojaTipo=null;

function verVers(btn,cid,de,hasta){
  abreHoja(cid,de,hasta);
}

/** Sube la hoja con el HTML que se le pase. `tipo` solo sirve para saber qué
 *  hay abierto y para teñir la caja con una clase. */
function abreHojaHtml(html,tipo){
  const h=document.getElementById('hoja');
  if(!h)return;
  hojaTipo=tipo||'vers';
  h.className='hoja hoja-'+hojaTipo;
  h.innerHTML=html;
  h.hidden=false;
  /* El translate arranca abajo y la clase lo sube. Hay que dejar pasar un
     cuadro entre quitar [hidden] y poner la clase, o el navegador aplica los
     dos cambios juntos y la hoja aparece de golpe, sin subir. */
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>h.classList.add('abierta'));
  else h.classList.add('abierta');
}

function abreHoja(cid,de,hasta){
  if(!tablaDeCid(cid))return;
  hojaCid=cid; hojaDe=de; hojaHasta=hasta||de;
  abreHojaHtml(htmlHoja(),'vers');
}

function cierraHoja(){
  paraVoz();
  const h=document.getElementById('hoja');
  if(!h)return;
  h.classList.remove('abierta');
  hojaCid=null; hojaTipo=null;
  /* Se espera a que termine de bajar antes de esconderla: con [hidden] de
     una, desaparece de golpe y no se ve el gesto de cierre. */
  setTimeout(()=>{if(!hojaTipo){h.hidden=true;h.innerHTML='';}},220);
}

/** Pasa al versiculo anterior o siguiente sin cerrar la hoja. Se mueve de a
 *  uno y se queda en los topes del capitulo. */
function hojaMueve(d){
  if(!hojaCid)return;
  const t=tablaDeCid(hojaCid);
  if(!t)return;
  const nums=Object.keys(t.mapa).map(Number).sort((a,b)=>a-b);
  const min=nums[0], max=nums[nums.length-1];
  const rango=hojaHasta-hojaDe;
  let de=hojaDe+d;
  if(de<min||de+rango>max)return;
  paraVoz();
  hojaDe=de; hojaHasta=de+rango;
  const h=document.getElementById('hoja');
  if(h)h.innerHTML=htmlHoja();
}

function htmlHoja(cid,de,hasta){
  cid=cid||hojaCid; de=de||hojaDe; hasta=hasta||hojaHasta;
  const t=cid?tablaDeCid(cid):null;
  if(!cid||!t)return '';
  const nums=Object.keys(t.mapa).map(Number).sort((a,b)=>a-b);
  const min=nums[0], max=nums[nums.length-1];
  const cap=buscaItem(cid);
  const partes=[];
  for(let i=de;i<=hasta;i++)
    if(t.mapa[i])partes.push('<p><span class="vn">'+i+'</span>'+esc(t.mapa[i])+'</p>');
  const ref=t.ref+':'+de+(hasta>de?'-'+hasta:'');
  return '<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="'+ref+'">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab">'+
      '<div><div class="hoja-ref">'+ref+' · '+t.version+'</div>'+
      '<div class="hoja-sub">'+esc(cap?cap.sub:'')+'</div></div>'+
      (puedeHablar()?'<button type="button" class="btn-voz" title="Escuchar" aria-label="Escuchar el versículo" onclick="leeCerca(this)">🔊</button>':'')+
      '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">✕</button>'+
    '</div>'+
    '<div class="hoja-txt biblia" data-leer>'+partes.join('')+'</div>'+
    '<div class="hoja-pie">'+
      '<button type="button" class="hoja-nav" onclick="hojaMueve(-1)"'+
        (de<=min?' disabled':'')+' aria-label="Versículo anterior">‹ Anterior</button>'+
      '<span class="hoja-cta">'+de+(hasta>de?'-'+hasta:'')+' de '+max+'</span>'+
      '<button type="button" class="hoja-nav" onclick="hojaMueve(1)"'+
        (hasta>=max?' disabled':'')+' aria-label="Versículo siguiente">Siguiente ›</button>'+
    '</div></div>';
}

/* Escape cierra, como cualquier hoja o modal del sistema. */
if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&hojaTipo)cierraHoja();});

/* El capitulo completo, en bloques de cinco versiculos con su propio boton
   de voz: uno solo leeria los 49 de corrido, que no sirve para memorizar, y
   de paso el bloque queda de un tamano que se alcanza a seguir con el dedo.
   El boton va en su propia fila, no al lado del texto: al lado le quitaba
   unos 50px de ancho a las cinco lineas. */
function seccionLectura(cid){
  if(typeof VERS==='undefined'||!VERS[cid])return '';
  const nums=Object.keys(VERS[cid]).map(Number).sort((a,b)=>a-b);
  const bloques=[];
  for(let i=0;i<nums.length;i+=5){
    const grupo=nums.slice(i,i+5);
    const rot='Vers. '+grupo[0]+(grupo.length>1?'-'+grupo[grupo.length-1]:'');
    const txt=grupo.map(v=>'<p><span class="vn">'+v+'</span>'+esc(VERS[cid][v])+'</p>').join('');
    bloques.push('<div class="lect-bl">'+
      '<div class="lect-cab"><span class="lect-rot">'+rot+'</span>'+
      (puedeHablar()?'<button type="button" class="btn-voz" title="Escuchar estos versículos" aria-label="Escuchar '+rot+'" onclick="leeCerca(this)">🔊</button>':'')+
      '</div><div class="biblia" data-leer>'+txt+'</div></div>');
  }
  return '<details class="lect"><summary>📖 Leer el capítulo completo ('+
    nums.length+' versículos, RV1995)</summary><div class="lect-cuerpo">'+
    '<button type="button" class="btn gho lect-full" onclick="abreLectura(\''+cid+'\')">'+
    '📖 Leer sin distracciones</button>'+
    bloques.join('')+'</div></details>';
}

/* ───────── MODO LECTURA ─────────
   MECANISMO
   El capítulo se lee hoy dentro de la tarjeta de estudio: con el riel al lado,
   las pestañas abajo, los botones de voz de cada bloque y las secciones de
   estudio esperando debajo. Eso está bien para repasar un dato y mal para leer
   treinta versículos seguidos, que es lo que hay que hacer primero.

   Aquí no hay nada nuevo que aprender ni ningún dato que la app no tenga: es el
   MISMO texto de `VERS` (los 196 versículos que `tools/citas.js` verifica byte
   a byte contra la RV1995) en una capa que tapa todo lo demás. Se abre, se lee,
   se cierra. No reemplaza la pantalla de estudio.

   LA MEDIDA QUE MANDA es el ancho de línea: 62 caracteres. Más largo y el ojo
   pierde el renglón al volver; en la tarjeta de estudio a 1440 px una línea de
   la Biblia llega a 110 caracteres.

   Al cerrar ofrece marcar el capítulo como leído, que es el gesto que la app ya
   necesitaba y que hoy hay que ir a buscar abajo de las secciones. */
let lectCid=null;

function abreLectura(cid){
  if(typeof VERS==='undefined'||!VERS[cid])return;
  paraVoz();
  const c=buscaItem(cid), nums=Object.keys(VERS[cid]).map(Number).sort((a,b)=>a-b);
  const n=String(cid).replace('d','');
  const cap=document.getElementById('lectura');
  if(!cap)return;
  lectCid=cid;
  cap.innerHTML=
    '<div class="lec-barra">'+
      '<div class="lec-prog"><i id="lec-i" style="width:0%"></i></div>'+
      '<span class="lec-pct" id="lec-pct">Daniel '+n+'</span>'+
      (puedeHablar()?'<button type="button" class="lec-voz" onclick="leeCerca(this)" '+
        'aria-label="Escuchar el capítulo">🔊</button>':'')+
      '<button type="button" class="lec-x" onclick="cierraLectura()" aria-label="Cerrar">✕</button>'+
    '</div>'+
    '<div class="lec-caja" id="lec-caja"><h1>'+esc(c?c.sub:'Daniel '+n)+'</h1>'+
    '<p class="lec-sub">Daniel '+n+' · Reina-Valera 1995 · '+nums.length+' versículos</p>'+
    '<div class="lec-txt biblia" data-leer>'+
    nums.map(v=>'<p><span class="vn">'+v+'</span>'+esc(VERS[cid][v])+'</p>').join('')+
    '</div>'+
    '<div class="lec-fin">'+
      '<p>Terminaste de leer <strong>Daniel '+n+'</strong>.</p>'+
      ((S.prog[cid]||0)>=100
        ?'<p class="lec-ok">✓ Ya lo tenías marcado como estudiado.</p>'
        :'<button type="button" class="btn nar" onclick="listoDesdeLectura()">Ya lo estudié</button>')+
      '<button type="button" class="btn gho" onclick="cierraLectura()">Volver al estudio</button>'+
    '</div></div>';
  cap.hidden=false;
  document.body.classList.add('leyendo');
  const caja=document.getElementById('lec-caja');
  if(caja){caja.scrollTop=0;caja.onscroll=lectAvance;}
  lectAvance();
}

/** La barra de arriba dice cuánto del capítulo se ha recorrido, no cuánto se ha
 *  entendido: es la posición del scroll, y se dice así en el manual. */
function lectAvance(){
  const caja=document.getElementById('lec-caja'), i=document.getElementById('lec-i'),
        t=document.getElementById('lec-pct');
  if(!caja||!i)return;
  const max=caja.scrollHeight-caja.clientHeight;
  const pct=max>8?Math.min(100,Math.round(caja.scrollTop/max*100)):100;
  i.style.width=pct+'%';
  if(t&&lectCid)t.textContent='Daniel '+String(lectCid).replace('d','')+' · '+pct+'%';
}

function cierraLectura(){
  paraVoz();
  const cap=document.getElementById('lectura');
  if(!cap)return;
  cap.hidden=true;cap.innerHTML='';
  lectCid=null;
  document.body.classList.remove('leyendo');
}

function listoDesdeLectura(){
  if(lectCid)listo(lectCid);
  cierraLectura();
}

/* Escape cierra, igual que la hoja del versículo. */
if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lectCid)cierraLectura();});

function verCap(id){
  paraVoz();
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
    '<div style="font-size:.83rem;color:var(--gris)">'+esc(c.sub)+(c.src?' · '+esc(c.src):'')+
    (c.vs?' · '+c.vs+' versículo'+(c.vs===1?'':'s'):'')+'</div></div>'+
    /* La píldora dice de qué fuente sale el texto del capítulo. En las 28
       creencias no es la RV1995: la guía «En esto creemos» cita RV1960, y decir
       lo contrario sería justo el error que este proyecto persigue. */
    '<span class="pil az">'+(esCreencia(id)?'RV1960':esMatutina()?'Matutina':'RV1995')+'</span></div>'+
    /* El capitulo completo va ARRIBA de las secciones y cerrado: quien quiera
       leer primero lo abre, y a quien viene a repasar un dato no le estorba. */
    seccionLectura(id)+
    secs.map(s=>'<div class="sec"><h3>'+s.t+'</h3>'+refsTocables(s.h,id)+'</div>').join('')+
    '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #eef0f4;display:flex;gap:.7rem;flex-wrap:wrap">'+
    '<button class="btn ver" onclick="listo(\''+id+'\')">✅ Ya lo estudié</button>'+
    '<button class="btn nar" onclick="ir(\'tarjetas\')">🃏 Tarjetas</button>'+
    '<button class="btn azul" onclick="ir(\'examen\')">✏️ Examen</button>'+
    '<button class="btn gho" onclick="imprimeCapitulo(\''+id+'\')">🖨️ Imprimir este capítulo</button></div>';
  d.style.display='block';
  divideVista(d,id);
  avanza(id,60);
}

/* ───────── PALETA DE COMANDOS (⌘K) ─────────
   MECANISMO
   Para abrir un capítulo hay que ir a Estudiar, encontrar su tarjeta entre las
   siete y las nueve de repaso, y tocarla. Con teclado eso son cuatro gestos
   para algo que se puede escribir en tres letras.

   HONESTO, Y VA EN EL MANUAL: esto sirve a quien tiene teclado. Las niñas
   estudian en el teléfono y no lo van a ver nunca. Se construye porque el
   mantenedor arma exámenes y revisa capítulos todos los días, no porque haga
   la app mejor para quien la usa en el celular.

   La lista sale de los MISMOS datos: `capsDe()`, `modsDe()` y `CATS`. No hay un
   catálogo aparte que se pueda desincronizar del material.

   El filtro normaliza sin tildes y sin mayúsculas, igual que la comparación de
   respuestas del examen: quien escribe «babilonia» no debería quedarse sin
   resultados por escribir «Babilonia». */
let pcAbierta=false, pcSel=0, pcItems=[];

/** Todo lo que la paleta puede abrir, en el orden en que sirve. */
function pcCatalogo(){
  const it=[];
  capsDe().forEach(c=>it.push({g:'Capítulos',ic:'📖',t:c.label,
    s:c.sub+' · '+(S.prog[c.id]||0)+'% leído',f:()=>verCap(c.id)}));
  modsDe().forEach(m=>it.push({g:'Repasos',ic:'🔎',t:m.label,
    s:(m.sub||'')+' · '+(S.prog[m.id]||0)+'%',f:()=>verCap(m.id)}));
  it.push({g:'Acciones',ic:'🃏',t:'Tarjetas de hoy',
    s:Math.min(tocanHoy().length,topeSesion())+' para hacer',f:()=>ir('tarjetas')});
  const err=falladasDe().length;
  if(err>0)it.push({g:'Acciones',ic:'↺',t:'Repasar mis '+err+' errores',
    s:'Lo que más puntos recupera',f:()=>arrancaExamen('errores')});
  it.push({g:'Acciones',ic:'✏️',t:'Examen de práctica',
    s:CAT().n+' preguntas',f:()=>ir('examen')});
  it.push({g:'Acciones',ic:'📘',t:'Leer sin distracciones',
    s:'El capítulo completo, sin nada alrededor',f:()=>{
      const c=capsDe().find(x=>typeof VERS!=='undefined'&&VERS[x.id]);
      if(c)abreLectura(c.id);else ir('estudio');}});
  it.push({g:'Acciones',ic:'❓',t:'Cómo se usa esta app',s:'El manual completo',f:()=>ir('ayuda')});
  /* Cambiar de categoría entra aquí con el nombre de su actividad delante,
     porque «Aventureros» solo no dice de cuál de las tres es. */
  Object.keys(CATS).forEach(k=>{
    if(k===S.cat)return;
    const a=ACTIVIDADES[CATS[k].act];
    it.push({g:'Cambiar de material',ic:a?a.icono:'✳️',
      t:(a?a.nombre+' · ':'')+CATS[k].nombre,s:CATS[k].alcance,f:()=>ponCat(k)});
  });
  return it;
}

const pcLimpia=t=>String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

function pcFiltra(q){
  const todo=pcCatalogo();
  const n=pcLimpia(q).trim();
  /* SIN escribir nada, las ACCIONES van primero. Con el catálogo en su orden
     natural el tope de doce se lo comían los capítulos y los repasos, y la
     paleta abría mostrando justo lo que uno puede encontrar solo en Estudiar.
     Se vio en el render: doce filas y ni una acción.
     Escribiendo algo se respeta el orden natural, porque ahí uno ya sabe qué
     está buscando. */
  if(!n){
    const acc=todo.filter(i=>i.g==='Acciones');
    const resto=todo.filter(i=>i.g!=='Acciones');
    return acc.concat(resto).slice(0,12);
  }
  return todo.filter(i=>pcLimpia(i.t+' '+i.s+' '+i.g).includes(n)).slice(0,12);
}

function abrePaleta(){
  const c=document.getElementById('paleta');
  if(!c)return;
  pcAbierta=true;pcSel=0;
  c.innerHTML='<div class="pc-fondo" onclick="cierraPaleta()"></div>'+
    '<div class="pc" role="dialog" aria-modal="true" aria-label="Buscar y abrir">'+
    '<div class="pc-in"><span aria-hidden="true">⌘K</span>'+
    '<input id="pc-q" type="text" autocomplete="off" placeholder="Escribe un capítulo, un repaso o una acción..." '+
    'oninput="pcPinta()" aria-label="Buscar"></div>'+
    '<div class="pc-l" id="pc-l"></div>'+
    '<div class="pc-pie"><span><kbd>↑↓</kbd> mueve</span><span><kbd>↵</kbd> abre</span>'+
    '<span><kbd>esc</kbd> cierra</span></div></div>';
  c.hidden=false;
  pcPinta();
  try{document.getElementById('pc-q').focus();}catch(e){}
}

function cierraPaleta(){
  const c=document.getElementById('paleta');
  if(!c)return;
  pcAbierta=false;c.hidden=true;c.innerHTML='';
}

function pcPinta(){
  const l=document.getElementById('pc-l'), q=document.getElementById('pc-q');
  if(!l)return;
  pcItems=pcFiltra(q?q.value:'');
  if(pcSel>=pcItems.length)pcSel=Math.max(0,pcItems.length-1);
  if(!pcItems.length){
    l.innerHTML='<p class="pc-nada">Nada con eso. Prueba con «daniel», «trampas» o «errores».</p>';
    return;
  }
  let g='',h='';
  pcItems.forEach((i,n)=>{
    if(i.g!==g){g=i.g;h+='<div class="pc-g">'+esc(g)+'</div>';}
    h+='<button type="button" class="pc-r'+(n===pcSel?' on':'')+'" onclick="pcAbre('+n+')">'+
      '<span class="ic" aria-hidden="true">'+i.ic+'</span>'+
      '<b>'+esc(i.t)+'</b><small>'+esc(i.s||'')+'</small></button>';
  });
  l.innerHTML=h;
}

function pcAbre(n){
  const i=pcItems[n];
  if(!i)return;
  cierraPaleta();
  try{i.f();}catch(e){}
}

function pcTecla(e){
  /* Se abre con ⌘K o Ctrl+K, que es lo que ya esperan los dedos de cualquiera
     que use un editor. */
  const k=(e.key||'').toLowerCase();
  if(k==='k'&&(e.metaKey||e.ctrlKey)){
    e.preventDefault();
    if(pcAbierta)cierraPaleta();else abrePaleta();
    return;
  }
  if(!pcAbierta)return;
  if(e.key==='Escape'){e.preventDefault();cierraPaleta();return;}
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    e.preventDefault();
    if(!pcItems.length)return;
    pcSel=(pcSel+(e.key==='ArrowDown'?1:-1)+pcItems.length)%pcItems.length;
    pcPinta();
    return;
  }
  if(e.key==='Enter'){e.preventDefault();pcAbre(pcSel);}
}

if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('keydown',pcTecla);

/* ───────── VISTA DIVIDIDA ─────────
   MECANISMO
   El dato y el versículo están en la misma pantalla pero uno debajo del otro,
   así que compararlos es abrir la hoja del versículo, leerla, cerrarla y volver
   a buscar el renglón. En un celular no hay alternativa: no hay ancho. En
   escritorio sí, y a 1440 px sobran 412 px de margen sin usar.

   Aquí el texto queda a la izquierda, PEGADO con `position:sticky`, y el
   estudio se desplaza solo a la derecha. Es lo único que el escritorio puede
   hacer y el celular no.

   DECISIÓN DE IMPLEMENTACIÓN: el DOM se reestructura SIEMPRE y el CSS decide si
   lo pinta en dos columnas. Poner el ancho en un `matchMedia` de JS obligaría a
   escuchar el `resize` y a rearmar el DOM en cada cambio de tamaño; con la media
   query, por debajo de 1200 px el flex simplemente no aplica y todo se apila
   igual que antes.

   Solo en capítulos con texto en `VERS`: Profetas y Reyes y las creencias no
   tienen el capítulo palabra por palabra, así que no hay nada que poner a la
   izquierda. */
function divideVista(d,id){
  try{
    if(typeof VERS==='undefined'||!VERS[id])return;
    const det=d.querySelector(':scope>details.lect');
    const secs=[...d.querySelectorAll(':scope>.sec')];
    if(!det||!secs.length)return;
    /* Abierto de entrada SOLO en dos columnas: ahí un acordeón cerrado deja
       media pantalla en blanco. En una sola columna sigue cerrado, que es lo
       que v43 decidió para no estorbarle a quien viene a repasar un dato, y se
       vio en el render que sin esta guarda quedaba abierto también a 390 px.
       Es el único sitio donde el JS mira el ancho, y no necesita `resize`: el
       acordeón lo abre y lo cierra quien quiera con un toque. */
    det.open=!!(window.matchMedia&&window.matchMedia('(min-width:1200px)').matches);
    const fila=document.createElement('div');fila.className='vd';
    const iz=document.createElement('div');iz.className='vd-izq';
    const de=document.createElement('div');de.className='vd-der';
    iz.innerHTML='<p class="vd-rot">El texto · RV1995</p>';
    de.innerHTML='<p class="vd-rot">El estudio</p>';
    iz.appendChild(det);
    secs.forEach(x=>de.appendChild(x));
    fila.appendChild(iz);fila.appendChild(de);
    d.insertBefore(fila,d.children[1]);
  }catch(e){}
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

/* ───────── leer en voz alta ─────────
   MECANISMO
   El navegador trae un sintetizador de voz (speechSynthesis). Se le pasa el
   texto y el idioma, y él usa una voz instalada en el aparato. No se descarga
   nada, no hay archivos de audio en el repo y funciona sin señal.

   PARA QUÉ, EN ESTE PROYECTO
   La sección III del examen es completar el versículo palabra por palabra, y
   memorizar escuchando rinde distinto que memorizar leyendo: se puede repasar
   caminando o con los ojos cerrados. Por eso el botón está en los versículos
   clave y en el reverso de las tarjetas.

   SI EL APARATO NO PUEDE, EL BOTÓN NO APARECE. Un botón de audio que no suena
   es peor que no tenerlo. */
const puedeHablar=()=>typeof speechSynthesis!=='undefined'&&
  typeof SpeechSynthesisUtterance!=='undefined';

/* Voz en español, un poco más lenta que el habla normal: se está memorizando,
   no escuchando una noticia. */
/* ── LEER EN VOZ ALTA, CON PAUSA Y REANUDAR DE VERDAD ───────────────────
   MECANISMO
   speechSynthesis es una cola global del navegador: speak() encola, cancel()
   vacia la cola entera, y pause()/resume() congelan y sueltan la lectura
   ACTUAL sin perder el lugar. La app recuerda que boton esta leyendo (y si
   esta en pausa) para saber a quien devolverle su icono.

   Version anterior: el boton solo alternaba 🔊 lee / ⏹ para-y-hay-que-
   reiniciar. Ahora es un control de tres estados, como cualquier reproductor:
   🔊 en reposo → toca y empieza (⏸, se puede pausar) → toca y pausa (▶, se
   puede reanudar DESDE EL MISMO PUNTO) → toca y reanuda.

   OJO CON iOS: onend no siempre dispara, sobre todo si se cancela, y el
   soporte de pause()/resume() en Safari ha sido historicamente menos fiable
   que en Chrome. Por eso el icono se restaura tambien con un reloj de
   seguridad; si resume() no despertara la voz en un aparato viejo, el peor
   caso es que quede en ▶ y haya que tocar 🔊 en otro boton para reiniciar,
   nunca una voz que seorda para siempre en silencio. */
let vozPausado=false;

function paraVoz(){
  if(vozReloj){clearTimeout(vozReloj);vozReloj=null;}
  if(vozBtn){
    try{vozBtn.textContent='🔊';vozBtn.setAttribute('title','Escuchar');
        vozBtn.classList.remove('sonando');}catch(e){}
    vozBtn=null;
  }
  vozPausado=false;
  try{if(puedeHablar())speechSynthesis.cancel();}catch(e){}
}

/* Cuanto falta, en milisegundos, a un ritmo de unas 12 palabras por segundo a
   rate .85 (con margen). Se recalcula al pausar y al reanudar porque el
   reloj de seguridad no sabe cuanto se alcanzo a leer. */
const msRestantes = txt => Math.max(4000, String(txt).length*95);

function habla(txt,btn){
  if(!puedeHablar()||!txt)return;
  paraVoz();
  try{
    const limpio=String(txt).replace(/\s+/g,' ').trim().slice(0,600);
    const u=new SpeechSynthesisUtterance(limpio);
    u.lang='es-ES';u.rate=.85;u.pitch=1;
    if(btn){
      vozBtn=btn; vozPausado=false; btn.dataset.txt=limpio;
      btn.textContent='⏸';btn.setAttribute('title','Pausar');
      btn.classList.add('sonando');
      u.onend=paraVoz; u.onerror=paraVoz;
      vozReloj=setTimeout(paraVoz, msRestantes(limpio));
    }
    speechSynthesis.speak(u);
  }catch(e){paraVoz();}
}

/* Lee el texto del bloque al que pertenece el botón. Así el HTML generado no
   tiene que repetir el versículo dentro de un atributo. */
function leeCerca(btn){
  if(!btn)return;
  /* Tocar el MISMO boton que ya esta leyendo pausa o reanuda, segun toque. */
  if(btn===vozBtn){
    if(vozPausado){
      try{speechSynthesis.resume();}catch(e){}
      vozPausado=false;
      btn.textContent='⏸';btn.setAttribute('title','Pausar');
      if(vozReloj)clearTimeout(vozReloj);
      vozReloj=setTimeout(paraVoz, msRestantes(btn.dataset.txt||''));
    }else{
      try{speechSynthesis.pause();}catch(e){}
      vozPausado=true;
      btn.textContent='▶';btn.setAttribute('title','Reanudar');
      if(vozReloj){clearTimeout(vozReloj);vozReloj=null;}
    }
    return;
  }
  /* De donde se saca el texto. El boton puede estar DENTRO del bloque
     [data-leer], como en las secciones de versiculos clave, o FUERA, en una
     cabecera hermana, como en el panel de un versiculo y en los bloques de
     lectura, donde se movio para que el texto use todo el ancho.
     Cuando esta fuera, closest('[data-leer]') da null y antes se caia a
     btn.parentNode: eso hacia que la voz leyera «Daniel 3:5 · RV1995», o sea
     la referencia en vez del versiculo. Se detecto midiendo el texto que se
     manda a hablar; en una captura no se ve. */
  let base=btn.closest?btn.closest('[data-leer]'):null;
  if(!base&&btn.closest){
    const caja=btn.closest('.hoja-caja,.lect-bl,.sec');
    if(caja&&caja.querySelector)base=caja.querySelector('[data-leer]');
  }
  if(!base)base=btn.parentNode;
  if(!base)return;
  /* Se lee una COPIA sin el botón: si no, el sintetizador pronuncia el emoji
     del altavoz al final de cada versículo. */
  let t='';
  try{
    const c=base.cloneNode(true);
    (c.querySelectorAll?[...c.querySelectorAll('.btn-voz')]:[]).forEach(b=>b.remove());
    t=c.textContent||'';
  }catch(e){ t=(base.textContent||'').replace(/🔊/g,''); }
  /* Fuera la referencia del principio («1:8»): se está memorizando el texto,
     no el número. */
  habla(t.replace(/^\s*[\d:]+\s*/,''),btn);
}

const BTN_VOZ='<button class="btn-voz" title="Escuchar" aria-label="Escuchar" onclick="leeCerca(this)">🔊</button>';

/* ───────── tarjetas ─────────
   REPETICIÓN ESPACIADA, EL MECANISMO
   Cada tarjeta vive en una caja: 0 recién vista o fallada, 1 en repaso, 2
   dominada. Al acertar sube de caja y se guarda EL DÍA. Al fallar vuelve a la
   caja 0. Una tarjeta solo vuelve a salir cuando se le cumple el plazo de su
   caja: la 0 siempre, la 1 al día siguiente, la 2 a los cuatro días.

   DÓNDE NACÍA EL PROBLEMA
   Antes el mazo traía SIEMPRE las 126 tarjetas, ordenadas por caja. Las
   dominadas seguían apareciendo todos los días, así que el tiempo de estudio se
   gastaba en lo que ya sabía, y un mazo de 126 cartas desanima a los diez
   minutos. Lo que rinde es una sesión corta con lo que toca hoy.

   EL PLAZO ES EN DÍAS LOCALES, no en horas: repasar a las 8 de la noche y
   volver a las 7 de la mañana cuenta como dos días distintos, que es lo que la
   niña espera. */
const PLAZO={0:0,1:1,2:4};
const cajaT=t=>S.ft[claveT(t)]||0;
const vistoT=t=>S.fv[claveT(t)]||0;
const vencidaT=t=>diaHoy()-vistoT(t)>=PLAZO[cajaT(t)];
const tocanHoy=()=>tarjetasDe().filter(vencidaT);
/* Tope de la sesión: el tamaño del examen de la categoría, con un piso de 12.
   Sale de un dato que ya existe en vez de inventar otra tabla. */
const topeSesion=()=>Math.max(12,CAT().n);

let mazo=[],tjI=0,tjVolteada=false,tjFiltro='hoy',tjSabidas=new Set();

/* El texto de cada opcion se recorta a proposito. El ancho intrinseco de un
   <select> es el de su opcion mas larga, y con el subtitulo completo la mas
   larga llegaba a 63 caracteres («26 de octubre — La heroina que ayudo a un
   nino con sus palabras»): unos 470px, que en un telefono no caben de
   ninguna manera. Recortar el subtitulo baja el maximo a unos 37 caracteres,
   que sí entran en los 358px de una fila completa a 390px.
   Esto NO reemplaza el min-width:0 del CSS, lo complementa: aquel deja que el
   select ceda, y esto hace que no tenga que ceder tanto. Son dos capas porque
   Safari de iOS y Chrome de escritorio no tratan igual el ancho intrinseco de
   un select, y el bug se vio en un iPhone. */
const TOPE_OP=22;
const opTj=c=>{
  const sub=String(c.sub||'');
  if(!sub)return c.label;
  /* Al cortar se limpia el guion o la coma que quede colgando al final, o sale
     «El heroe se enamora —…», que se lee como un error. */
  const corto=sub.length>TOPE_OP
    ? sub.slice(0,TOPE_OP-1).replace(/[\s—–\-,;:]+$/,'')+'…'
    : sub;
  return c.label+' — '+corto;
};

function pintaTarjetas(){
  const sel=document.getElementById('tj-filtro');
  const cs=capsDe();
  const nDif=tarjetasDe().filter(t=>(S.ft[claveT(t)]||0)<2).length;
  const nHoy=Math.min(tocanHoy().length,topeSesion());
  sel.innerHTML='<option value="hoy">🎯 La sesión de hoy ('+nHoy+')</option>'+
    '<option value="todas">Todos los capítulos ('+tarjetasDe().length+')</option>'+
    '<option value="dificiles">🔁 Solo por dominar ('+nDif+')</option>'+
    cs.map(c=>'<option value="'+c.id+'">'+esc(opTj(c))+'</option>').join('');
  sel.value=tjFiltro;
  if(!mazo.length)tjBaraja();
  else muestraTj();
}

function filtraTj(v){tjFiltro=v;tjBaraja();}

function tjBaraja(){
  let base=tarjetasDe();
  if(tjFiltro==='hoy')base=base.filter(vencidaT);
  else if(tjFiltro==='dificiles')base=base.filter(t=>cajaT(t)<2);
  else if(tjFiltro!=='todas')base=base.filter(t=>t.cap===tjFiltro);
  /* Orden Leitner: lo fallado o nuevo primero, lo dominado al final. */
  mazo=[0,1,2].flatMap(n=>mezcla(base.filter(t=>cajaT(t)===n)));
  /* La sesión del día se corta en el tope. Los otros filtros no se cortan:
     si alguien pide un capítulo o el mazo completo, es porque lo quiere
     completo. */
  if(tjFiltro==='hoy')mazo=mazo.slice(0,topeSesion());
  tjI=0;tjVolteada=false;tjSabidas=new Set();
  muestraTj();
}

/* Los botones de la tarjeta se apagan cuando no hay nada que contestar. Un
   botón encendido que no hace nada al tocarlo es el mismo defecto que
   arreglamos en el panel: parece que la app se trabó. */
function botonesTj(hayCarta){
  const on=(id,v)=>{const e=document.getElementById(id);if(e)e.disabled=!v;};
  on('tj-si',hayCarta);on('tj-no',hayCarta);on('tj-sig',hayCarta);
  on('tj-ant',hayCarta&&tjI>0);
}

function muestraTj(){
  const c=document.getElementById('tj-carta');
  if(!c)return;
  if(!mazo.length){
    c.className='tj';
    /* Un mazo vacío con el filtro del día NO es un error: es que ya repasó lo
       que tocaba. Decirlo así, y ofrecer el mazo completo, evita que parezca
       que la app se dañó. */
    c.innerHTML=tjFiltro==='hoy'
      ?'<div class="cara">✅ Ya repasaste lo de hoy</div>'+
       '<div class="rev" style="margin-top:.7rem">Las que dominaste vuelven a salir en unos días. '+
       'Si quieres seguir, escoge <strong>Todos los capítulos</strong> arriba.</div>'
      :'<div class="cara">No hay tarjetas para este filtro.</div>';
    document.getElementById('tj-pos').textContent='';
    document.getElementById('tj-prog').style.width='0%';
    document.getElementById('tj-resumen').textContent='';
    botonesTj(false);
    return;
  }
  if(tjI>=mazo.length){
    c.className='tj volteada';
    const s=tjSabidas.size,t=mazo.length;
    /* Al terminar una sesión corta hay que decir CUÁNTO QUEDA, porque es el
       momento en que la niña decide si sigue o cierra. «Terminaste el mazo» con
       87 tarjetas pendientes detrás era una media verdad. */
    const quedan=tjFiltro==='hoy'?tocanHoy().length:0;
    c.innerHTML='<div class="cara">🎉 '+(tjFiltro==='hoy'?'Terminaste la sesión':'Terminaste el mazo')+'</div>'+
      '<div class="rev" style="margin-top:.7rem">Sabías '+s+' de '+t+' ('+Math.round(s/t*100)+'%)'+
      (quedan?'<br>Todavía te toca repasar <strong>'+quedan+'</strong> hoy.'
             :(tjFiltro==='hoy'?'<br>Ya no te toca nada más hoy.':''))+'</div>';
    document.getElementById('tj-pos').textContent='Completado';
    document.getElementById('tj-prog').style.width='100%';
    document.getElementById('tj-resumen').textContent=quedan
      ?'Toca «Barajar de nuevo» y te salen las siguientes.'
      :'Toca «Barajar de nuevo» para repetir.';
    botonesTj(false);
    return;
  }
  const t=mazo[tjI];
  const cj=S.ft[claveT(t)]||0;
  const est=cj===2?'<span class="pil az">✅ dominada</span>':cj===1?'<span class="pil na">🔁 en repaso</span>':'<span class="pil na">🆕 por aprender</span>';
  c.className='tj'+(tjVolteada?' volteada':'');
  c.innerHTML=(tjVolteada
    ? '<div class="rev" data-leer>'+t.r+(puedeHablar()?' '+BTN_VOZ:'')+'</div>'+
      '<div class="pista">toca para volver</div>'
    : '<div class="cara">'+t.f+'</div><div class="pista">toca para ver la respuesta</div>')+
    '<div style="position:absolute;top:.6rem;right:.6rem">'+est+'</div>';
  document.getElementById('tj-pos').textContent='Tarjeta '+(tjI+1)+' de '+mazo.length;
  document.getElementById('tj-prog').style.width=Math.round(tjI/mazo.length*100)+'%';
  document.getElementById('tj-resumen').textContent=tjSabidas.size+' marcadas como sabidas · «La sabía» dos veces seguidas = dominada';
  botonesTj(true);
}

function voltea(){if(mazo.length&&tjI<mazo.length){tjVolteada=!tjVolteada;muestraTj();}}
function tjSig(){if(tjI<mazo.length){tjI++;tjVolteada=false;muestraTj();}}
function tjAnt(){if(tjI>0){tjI--;tjVolteada=false;muestraTj();}}
function tjSabia(si){
  if(tjI>=mazo.length)return;
  if(si)tjSabidas.add(tjI);else tjSabidas.delete(tjI);
  const k=claveT(mazo[tjI]);
  S.ft[k]=si?Math.min(2,(S.ft[k]||0)+1):0;
  /* El día solo se guarda al acertar. Al fallar se borra, para que vuelva a
     salir hoy mismo y no dentro de cuatro días. */
  if(si)S.fv[k]=diaHoy();else delete S.fv[k];
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

/* Los errores por repasar, del MISMO evento que se está practicando. Sin este
   filtro, un examen de errores de Padres mezclaba Daniel con doctrina, que es
   justo lo que el reglamento separa. */
/* Los errores que se repasan son los de la ACTIVIDAD activa. Antes esto
   colgaba del alcance del examen; ahora cuelga del conmutador, que es donde
   de verdad se decide en que se esta trabajando. bancoDe() ya viene filtrado,
   asi que basta con mirar los fallados. */
const falladasDe=()=>bancoDe().filter(q=>(S.fq[claveQ(q)]||{}).m>0);

/* Preguntas disponibles según categoría + alcance elegido. */
function poolDe(){
  const b=bancoDe();
  /* «todo» es todo lo de la ACTIVIDAD activa, no todo lo cargado. El filtro
     de creencias ya lo hizo capsDe(); dejarlo aqui tambien vaciaria el examen
     de las 28 creencias. La garantia sigue en pie por otro camino: con la
     actividad en Daniel, el banco no tiene ni una creencia. */
  if(alcance==='todo')return b;
  if(alcance==='creencias')return b.filter(q=>esCreencia(q.cap));
  if(alcance==='biblia')return b.filter(q=>q.cap.charAt(0)==='d');
  if(alcance==='pr')return b.filter(q=>q.cap.slice(0,2)==='pr');
  if(alcance==='q1')return b.filter(q=>diaMat(q.cap)>0&&diaMat(q.cap)<=15);
  if(alcance==='q2')return b.filter(q=>diaMat(q.cap)>15);
  return b.filter(q=>q.cap===alcance);
}

/* Día del mes de un capítulo de matutina (m01..m31), o 0 si no lo es. */
const diaMat=id=>/^m\d\d$/.test(id)?Number(id.slice(1)):0;
const esMatutina=()=>ACT_DE(S.cat)==='dm';
/* Un id de creencia. Ya no se usa para filtrar (la actividad lo hace), pero
   sigue sirviendo para reconocerlas en el material impreso y en las cuentas
   del reglamento, que reparte el club en dos. */
const esCreencia=id=>/^cr\d\d$/.test(id);

/* Los grupos de alcance que de verdad tienen preguntas en esta categoría. Se
   calcula probando cada uno contra poolDe(), no con una lista fija: la lista
   fija fue la que ofrecía «Solo Profetas y Reyes» a Menores, que no lo tiene. */
function gruposEx(){
  const cand=esMatutina()
    ?[['q1','Solo la primera quincena (1 al 15)'],['q2','Solo la segunda quincena (16 en adelante)']]
    :[['biblia','Solo el libro de Daniel'],['pr','Solo Profetas y Reyes']];
  const prev=alcance,out=[];
  try{
    for(const g of cand){alcance=g[0];if(poolDe().length)out.push(g);}
  }finally{alcance=prev;}
  return out;
}

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
  /* Se ofrecen SOLO los grupos que tienen preguntas en esta categoría.
     Menores no tiene Profetas y Reyes, y la matutina de menores no llega al 16
     de octubre: ofrecerlos dejaba el examen en CERO preguntas y el botón
     «Comenzar» sin hacer nada, que es una puerta con letrero y sin cerradura. */
  const disp=gruposEx();
  const grupos=disp.map(g=>'<option value="'+g[0]+'">'+g[1]+'</option>').join('');
  /* Y de los capítulos, solo los que SE EXAMINAN. Un capítulo marcado «solo
     para estudiar» no tiene preguntas en el sorteo: escogerlo dejaba el examen
     en cero. Pasaba con Daniel 2 desde que salió del reglamento, y con el día
     31 de la matutina desde antes. */
  const capsEx=capsDe().filter(c=>!soloEstudio(c,S.cat));
  sa.innerHTML='<option value="todo">Todo mi material</option>'+grupos+
    capsEx.map(c=>'<option value="'+c.id+'">'+esc(c.label)+' — '+esc(c.sub)+'</option>').join('');
    /* El alcance vive en el aparato y sobrevive al cambio de categoría. «q1» de
     la matutina, o «creencias» de padres, no existen en Aventureros: si no se
     revalida, el examen queda en CERO preguntas y el desplegable muestra un
     valor que no está en la lista. Se valida contra los grupos que esta
     categoría tiene de verdad, no contra una lista fija. */
  if(!capsEx.some(c=>c.id===prev)&&!['todo'].concat(disp.map(g=>g[0])).includes(prev))alcance='todo';
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
    '<br>'+esc(CAT().nombre)+' · '+esc(ACT().nombre);
  document.getElementById('ex-nota').textContent=
    'Tu categoría tiene '+b+' preguntas en total. Cada examen saca unas cuantas al azar, así que nunca sale el mismo dos veces. '+
    'Reparto: '+textoReparto()+'.';
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
  let nf=Math.min(fl.length,Math.max(1,Math.round(n*REPARTO.fill)));
  let nt=Math.min(tf.length,Math.max(1,Math.round(n*REPARTO.tf)));
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

/* REPARTO DE LAS TRES SECCIONES DEL EXAMEN.
   Está aquí, en un solo lugar y con nombre, porque es el número que hay que
   cambiar el día que se sepa el reparto real del campamento. Hoy no se conoce:
   del examen que Camilo fotografió se sabe que tiene tres secciones, no cuántas
   preguntas trae cada una. 60/25/15 es una estimación, no un dato.
   El resto de la sección I sale de lo que quede: mc = n - fill - tf. */
const REPARTO={fill:.15,tf:.25};
const textoReparto=()=>'Sección I '+Math.round((1-REPARTO.fill-REPARTO.tf)*100)+'% · '+
  'Sección II '+Math.round(REPARTO.tf*100)+'% · Sección III '+Math.round(REPARTO.fill*100)+'%';

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
    const at=S.act[q.t]||{b:0,m:0};
    if(bien(q))at.b++;else at.m++;
    S.act[q.t]=at;
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
  try{pintaSenales();}catch(e){}

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
  /* Filtrado por categoría: «tres exámenes» quiere decir tres de ESTE material.
     Sin el filtro, una ficha que hubiera cambiado de actividad estrenaba la
     insignia con exámenes de la otra. */
  if(S.examenes.filter(e=>e.cat===S.cat).length>=3)a('Persistente');
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
      '<p class="nota">Con base en '+filas.reduce((s,x)=>s+x.a.b+x.a.m,0)+' respuestas de examen. '+
      'Toca un capítulo para estudiarlo, o <button class="btn gho" style="min-height:30px;padding:.1rem .6rem;font-size:.72rem" '+
      'onclick="examenDelCapitulo(\''+filas[0].c.id+'\')">examina el más flojo</button>.</p>'
    :'<p class="nota">Haz un examen y aquí verás en qué capítulos estás fallando.</p>';

  /* Por TIPO de pregunta. Es el dato que dice qué hay que practicar, no solo
     qué hay que leer: si completar va en rojo, el problema es memorización
     literal y las tarjetas de versículo clave son la respuesta. */
  const TIPOS=[['mc','Selección múltiple','Sección I'],['tf','Verdadero o falso','Sección II'],
               ['fill','Completar el versículo','Sección III']];
  const porTipo=TIPOS.map(([t,nom,sec])=>({t,nom,sec,a:S.act[t]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>0)
    .map(x=>({...x,pct:Math.round(x.a.b/(x.a.b+x.a.m)*100)}));
  const dt=document.getElementById('debiles-tipo');
  if(dt)dt.innerHTML=porTipo.length
    ?porTipo.map(x=>
      '<div style="display:flex;align-items:center;gap:.7rem;margin:.45rem 0">'+
      '<span style="font-size:.78rem;font-weight:700;width:96px;color:var(--azul)">'+esc(x.sec)+'</span>'+
      '<div class="prog-lin" style="flex:1;margin:0"><div style="width:'+x.pct+'%;background:'+
        (x.pct<60?'var(--rojo)':x.pct<85?'var(--naranja)':'var(--verde)')+'"></div></div>'+
      '<span style="font-size:.8rem;font-weight:700;width:44px;text-align:right;color:'+
        (x.pct<60?'var(--rojo)':'var(--azul)')+'">'+x.pct+'%</span></div>'+
      '<p class="nota" style="margin:0 0 .5rem">'+esc(x.nom)+' · '+(x.a.b+x.a.m)+' respondidas</p>').join('')+
      (porTipo.some(x=>x.t==='fill'&&x.pct<70)
        ?'<div class="warn-box">Completar el versículo es la sección que decide el examen. '+
         'Repasa las <strong>tarjetas de versículo clave</strong> y vuelve a intentar.</div>':'')
    :'<p class="nota">Aquí verás si fallas más en múltiple, en verdadero o falso, o en completar.</p>';

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
  if(alcance==='creencias')return 'En esto creemos — las 28 creencias';
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
  /* Antes, si la receta no daba preguntas para esta participante, el botón no
     hacía nada y parecía que la app estuviera trabada. Pasa cuando el director
     abre una evaluación de un material que esta categoría no tiene cargado. */
  if(!sel.length){
    const d=document.getElementById('cb-eval');
    if(d)d.innerHTML='<div class="card eval"><div class="ev-t">'+esc(r.titulo)+'</div>'+
      '<p class="nota">Esta evaluación es de un material que <strong>tu categoría no '+
      'tiene</strong>, así que no se puede armar. Avísale al director.</p></div>';
    return;
  }
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
    CAT_EV:esc(ACT().nombre),
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
        '</td><td>'+esc((ACTIVIDADES[c.act]||{}).nombre||'')+'</td><td>'+esc(c.alcance)+'</td>'+
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
    meta:ACT().nombre+' · '+CAT().alcance,
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
    meta:ACT().nombre+' · '+esc(CAT().nombre),
  })],esc(c.label),'Un solo capítulo para imprimir.');
  imprimeDoc(html,c.label);
}

function imprimeTarjetas(){
  const t=tarjetasDe();
  if(!t.length){alertaImpr('No hay tarjetas en esta categoría.');return;}
  const html=docExamen([hojaTarjetas({
    tarjetas:t, caps:CAPS, logo:LOGO_TL,
    titulo:'TARJETAS DE MEMORIA',
    sub:esc(CAT().nombre)+' · '+esc(ACT().nombre),
  })],'Tarjetas — '+CAT().nombre,
  'Tarjetas para recortar. Tapa la respuesta con la mano antes de leerla.');
  imprimeDoc(html,'Tarjetas');
}

/* Las dos guías completas de los dos eventos, para el director. */
function imprimeGuiasTodo(){
  const hojas=[];
  for(const ev of ['Conexión Bíblica','Devoción Matutina']){
    const cats=Object.keys(CATS).filter(k=>CATS[k].act===ev);
    const ids=new Set();
    /* Las 28 creencias son otro evento y no van en la guía del campamento: la
       guía impresa se usa para estudiar lo que el examen pide. */
    const caps=CAPS.filter(c=>c.cats.some(x=>cats.includes(x))
      &&!ids.has(c.id)&&ids.add(c.id));
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
    tt:tarjetasDe().length, cn:c.nombre, ce:(ACTIVIDADES[c.act]||{}).nombre||'',
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


const esNuevo=()=>alumnos().length===1&&!S.nombre&&!S.examenes.length&&
  !Object.values(S.prog).some(v=>v>0);

/* ── LA BIENVENIDA: NOMBRE → ACTIVIDAD → CATEGORIA ──────────────────────
   El orden importa. Antes preguntaba la EDAD primero y el evento despues, y
   eso obligaba a mapear una edad a cada evento a mano: «si eligio 4 a 6 y
   matutina, entonces dm1». Con tres actividades ese mapeo se vuelve una tabla
   de casos, y las creencias no tienen 4-6 ni 7-9 sino «los dos del examen» y
   «el resto del club».

   Preguntando la ACTIVIDAD primero, el paso 3 solo ofrece las categorias de
   esa actividad y no hay mapeo que mantener. Las dos pantallas se generan
   desde ACTIVIDADES y CATS, asi que agregar una actividad es agregar una
   entrada al modelo.

   UNA SOLA ACTIVIDAD AQUI, a proposito. La mayoria participa en una. Quien
   este en dos la agrega despues desde el selector de fichas, que ya existe:
   cobrarle a todos una pantalla mas en el primer minuto, para algo que hace
   una minoria, es mal negocio. */
let bvActSel='cb';

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
  const el=document.getElementById('bv-saludo');
  if(el)el.textContent='Hola, '+v.split(' ')[0]+'. ¿En qué actividad participas?';
  pintaBvActs();
  bvPaso(2);
}

function bvAtras(n){bvPaso(n);}

/** Paso 2: las actividades, con lo que se estudia y cuándo. */
function pintaBvActs(){
  const c=document.getElementById('bv-acts');
  if(!c)return;
  c.innerHTML=Object.keys(ACTIVIDADES).map(k=>{
    const a=ACTIVIDADES[k];
    return '<button type="button" class="bv-op" onclick="bvActividad(\''+k+'\')">'+
      '<b>'+a.icono+' '+esc(a.nombre)+'</b>'+
      '<small>'+esc(a.que)+' · '+esc(a.cuando)+'</small></button>';
  }).join('');
}

function bvActividad(a){
  if(!ACTIVIDADES[a])return;
  bvActSel=a;
  const cats=CATS_DE_ACT(a);
  /* Si la actividad tuviera una sola categoria, preguntar seria un toque de
     mas sin informacion: se elige sola. Hoy las tres tienen varias, pero la
     guarda evita una pantalla tonta si manana se agrega una que no. */
  if(cats.length===1){ponCatBV(cats[0]);bvTermina();return;}
  const t3=document.getElementById('bv-t3'), p3=document.getElementById('bv-p3');
  if(t3)t3.textContent=ACTIVIDADES[a].icono+' '+ACTIVIDADES[a].nombre;
  if(p3)p3.textContent='¿Cuál es tu categoría? Esto decide qué vas a estudiar.';
  const c=document.getElementById('bv-cats');
  if(c)c.innerHTML=cats.map(k=>
    '<button type="button" class="bv-op" onclick="bvCategoria(\''+k+'\')">'+
    '<b>'+esc(CATS[k].edad)+'</b><small>'+esc(CATS[k].nombre)+' · '+
    esc(CATS[k].alcance)+'</small></button>').join('');
  bvPaso(3);
}

function bvCategoria(c){
  if(!CATS[c])return;
  ponCatBV(c);
  bvTermina();
}

function ponCatBV(c){S.cat=c;guardar();}

function bvTermina(){
  marcaCat();
  /* Hay que repintar, no solo navegar: `ir()` prende la pantalla pero no vuelve
     a dibujar su contenido, y al terminar la bienvenida cambiaron el nombre Y la
     categoria, o sea todo. Antes esto no se veia porque el panel de identidad
     vivia dentro del Inicio y nadie lo miraba de primeras; con la ficha en la
     barra, salia vacia en las cinco pantallas. */
  pintaInicio();pintaCaps();
  ir('inicio');
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
    guardar();marcaCat();pintaYo();pintaCaps();pintaInicio();
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

/* ───────── el panel del director ─────────
   TRES PASOS, EN EL ORDEN EN QUE HAY QUE HACERLOS
   Antes el botón «Abrir una evaluación» se pintaba ARRIBA del formulario: se
   veía el botón antes de saber que había campos, y abrir sin llenar nada era lo
   natural. Ahora el botón va al final y arranca deshabilitado.
   Los participantes se piden ANTES de pintar, no después: el paso 3 no puede
   decidir si el botón va habilitado sin saber cuántas hay. Pedirlos después
   obligaría a pintar el botón y corregirlo, que es cómo se ven los parpadeos. */
async function pintaPanel(){
  const d=document.getElementById('cb-panel');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="det-cuerpo"><p class="nota">Entra con la clave del director para '+
      'abrir y cerrar la evaluación del día y para manejar los códigos.</p>'+
      '<div class="ses-fila"><input id="pan-clave" type="password" autocomplete="off" placeholder="Clave">'+
      '<button class="btn azul" onclick="entraPanel()">Entrar</button></div>'+
      '<p class="nota" id="pan-msg"></p></div>';
    return;
  }
  const c=srvLee();
  const hayEval=!!(c&&c.practica===false);
  /* null = no se pudo preguntar. No es lo mismo que «no hay»: con la red caída
     no se puede afirmar que falten participantes, así que el paso 3 no bloquea
     y lo dice. */
  let parts=null;
  try{parts=(await srvFetch('/panel/participantes')).participantes||[];}catch(e){parts=null;}
  const cuantasP=parts?parts.length:null;

  if(hayEval){
    /* UNA SOLA FORMA DE CERRAR, y el conteo al lado del botón: quién falta es
       el dato con el que el director va y la busca. */
    d.innerHTML='<div class="det-cuerpo">'+
      '<div class="pan-paso"><div class="pan-paso-t">Evaluación en curso</div>'+
      '<p class="nota"><strong>'+esc((c&&c.evalTitulo)||'Sin nombre')+'</strong></p>'+
      '<div id="pan-eval"></div>'+
      '<div class="pan-sw"><button class="btn nar" onclick="cierraEvaluacion()">Cerrar la evaluación</button></div>'+
      '<p class="nota">Mientras está abierta, la práctica se cierra sola en <strong>todos los '+
      'aparatos</strong>. Al cerrarla vuelve, y las notas quedan guardadas. Estudiar y las '+
      'tarjetas nunca se cierran.</p></div>'+
      '<div class="pan-paso"><div class="pan-paso-t">Participantes</div>'+
      '<div id="pan-lista"><p class="nota">Cargando...</p></div></div></div>';
    cargaParticipantes(parts);
    await cargaResultados();
    return;
  }

  d.innerHTML='<div class="det-cuerpo">'+

    '<div class="pan-paso"><div class="pan-paso-t">Paso 1 · ¿Quiénes participan?</div>'+
    '<p class="nota">Cada participante necesita un código de 6 caracteres. Se lo das y ella lo '+
    'escribe una sola vez en su celular. Sin participantes, abrir una evaluación no sirve de nada.</p>'+
    '<div class="ses-fila"><input id="pan-nom" placeholder="Nombre" maxlength="40">'+
    '<select id="pan-cat">'+Object.keys(CATS).map(function(k){
      return '<option value="'+k+'">'+esc(CATS[k].nombre)+' · '+esc(CATS[k].edad)+'</option>';
    }).join('')+'</select>'+
    '<button class="btn azul" onclick="creaParticipante()">Agregar</button></div>'+
    '<div id="pan-lista"><p class="nota">Cargando...</p></div></div>'+

    '<div class="pan-paso'+(cuantasP===0?' pan-off':'')+'"><div class="pan-paso-t">Paso 2 · ¿Qué examen?</div>'+
    (cuantasP===0?'<p class="nota pan-razon">Primero crea al menos una participante en el paso 1.</p>':'')+
    '<div class="ses-fila"><input id="pan-eval-t" placeholder="Nombre, p. ej. Sábado 6 de septiembre" '+
    'maxlength="60" oninput="revisaAbrir()">'+
    '<input id="pan-eval-n" type="number" min="5" max="60" value="15" style="max-width:5.5rem" '+
    'title="Cuántas preguntas"></div>'+
    /* El reglamento tiene tres actividades distintas y cada una es un examen
       aparte. Sin este selector el panel solo podía abrir la de Daniel. */
    '<div class="ses-fila"><label class="pan-lb">Qué material'+
    '<select id="pan-eval-al" onchange="pintaNotaAlcance()">'+
      '<option value="todo">El material del campamento (Daniel y P&amp;R)</option>'+
      '<option value="creencias">En esto creemos — las 28 creencias</option>'+
      '<option value="biblia">Solo el libro de Daniel</option>'+
      '<option value="pr">Solo Profetas y Reyes</option>'+
    '</select></label></div>'+
    '<p class="nota" id="pan-nota-al">'+NOTA_ALCANCE.todo+'</p>'+
    '<div class="ses-fila"><label class="pan-lb">Dificultad'+
    '<select id="pan-eval-nv" onchange="pintaNotaNivel()">'+
      '<option value="0">La de cada categoría (recomendado)</option>'+
      '<option value="1">1 · básica</option>'+
      '<option value="2">2 · intermedia</option>'+
      '<option value="3">3 · avanzada</option>'+
    '</select></label></div>'+
    /* El texto describe LA OPCIÓN SELECCIONADA. Antes era fijo y describía
       siempre la opción 0: con «1 · básica» escogido, el panel afirmaba algo
       que no era cierto de lo que estaba puesto. */
    '<p class="nota" id="pan-nota-nv">'+NOTA_NIVEL[0]+'</p>'+
    '<p class="nota">¿A quiénes les toca? Si no marcas ninguna, les toca a todas.</p>'+
    '<div class="pan-cats">'+Object.keys(CATS).map(function(k){
      return '<label class="pan-cat"><input type="checkbox" class="pan-cat-ch" value="'+k+'"> '+
        '<span><strong>'+esc(CATS[k].nombre)+'</strong><br><small>'+esc((ACTIVIDADES[CATS[k].act]||{}).nombre||'')+' · '+esc(CATS[k].edad)+'</small></span></label>';
    }).join('')+'</div></div>'+

    '<div class="pan-paso"><div class="pan-paso-t">Paso 3 · Abrir</div>'+
    '<div class="pan-sw"><button class="btn azul" id="pan-abrir" disabled '+
    'onclick="abreEvaluacion()">Abrir una evaluación</button>'+
    '<span class="nota pan-razon" id="pan-abrir-razon"></span></div>'+
    '<p class="nota">Al abrirla, la práctica se cierra sola en <strong>todos los aparatos</strong> '+
    'y cada participante que ya entró con su código ve la evaluación en su pantalla.</p></div>'+

    '<div id="pan-eval"></div></div>';
  cargaParticipantes(parts);
  revisaAbrir(cuantasP);
  await cargaResultados();
}

/* Un texto por opción de dificultad. Los niveles los calcula fuente/niveles.js:
   1 es dato directo, 2 agrega verdadero/falso y redacciones, 3 agrega completar
   el versículo y las diferencias entre versiones. Un nivel incluye los de
   abajo, así que subir agrega preguntas, no las reemplaza. */
/* Un texto por material. El de las creencias avisa a quién le toca: el
   reglamento las pide a padres, consejeros y acompañantes, y solo esas dos
   categorías tienen ese material cargado. */
const NOTA_ALCANCE={
  todo:'Daniel 1, 3 y 6 más los capítulos 39, 41 y 44 de Profetas y Reyes. Es el examen del campamento.',
  creencias:'Las 28 creencias fundamentales. Es OTRA actividad del reglamento, para padres, '+
    'consejeros y acompañantes. Solo «Padres y consejeros» y «Guías Mayores» tienen este material: '+
    'si se la abres a una categoría de niños, a ellas no les va a salir nada.',
  biblia:'Solo el libro de Daniel, sin Profetas y Reyes.',
  pr:'Solo los capítulos de Profetas y Reyes que le tocan a la categoría.'
};

function pintaNotaAlcance(){
  const s=document.getElementById('pan-eval-al'),p=document.getElementById('pan-nota-al');
  if(!s||!p)return;
  p.textContent=NOTA_ALCANCE[s.value]||'';
}

const NOTA_NIVEL={
  0:'Cada grupo recibe la dificultad máxima de su categoría. Todas las de un mismo grupo hacen '+
    'exactamente el mismo examen y no depende del desempeño de cada una. Es la opción que hace '+
    'comparables las notas.',
  1:'Solo datos directos: nombres, números, lugares, materiales. Sin completar el versículo.',
  2:'Datos directos más verdadero o falso y preguntas que piden reconocer la redacción exacta.',
  3:'Todo lo anterior más completar el versículo y las diferencias entre RV1995 y RV1960. Es lo '+
    'más exigente del banco; en las categorías de 4 a 6 años no aplica.'
};

function pintaNotaNivel(){
  const s=document.getElementById('pan-eval-nv'),p=document.getElementById('pan-nota-nv');
  if(!s||!p)return;
  p.textContent=NOTA_NIVEL[Number(s.value)||0]||'';
}

/* Guarda del paso 3. Sin nombre no hay cómo llamar a la evaluación después, y
   sin participantes no hay a quién abrírsela: en los dos casos el botón queda
   apagado CON LA RAZÓN A LA VISTA, que es lo que faltaba. */
let panHayPart=null;
function revisaAbrir(cuantasP){
  if(cuantasP!==undefined)panHayPart=cuantasP;
  const b=document.getElementById('pan-abrir'),r=document.getElementById('pan-abrir-razon');
  if(!b)return;
  const t=(document.getElementById('pan-eval-t')||{}).value||'';
  const faltaNom=!t.trim();
  const faltaPart=panHayPart===0;
  b.disabled=faltaNom||faltaPart;
  if(r)r.textContent=faltaPart?'Falta crear participantes en el paso 1.'
    :faltaNom?'Falta ponerle nombre a la evaluación.'
    :panHayPart===null?'No se pudo confirmar cuántas participantes hay: revisa la señal.':'';
}

async function abreEvaluacion(){
  const t=document.getElementById('pan-eval-t'),n=document.getElementById('pan-eval-n');
  try{
    const cats=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
      .filter(function(c){return c.checked;}).map(function(c){return c.value;});
    await srvFetch('/panel/evaluacion',{method:'POST',body:JSON.stringify({
      titulo:t?t.value:'',cuantas:n?Number(n.value):15,
      alcance:(document.getElementById('pan-eval-al')||{}).value||'todo',
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
      (f.length?'<p class="nota">Faltan: '+f.map(function(x){return esc(x.nombre);}).join(', ')+'</p>':'')+
      sumaClub(h);
  }catch(e){d.innerHTML='';}
}

/* Acepta la lista que pintaPanel() ya pidió. Sin el parámetro la pide ella,
   que es lo que hacen creaParticipante() y borraParticipante(). */
/* SUMA DEL CLUB.
   El reglamento de «En esto creemos» dice: dos personas presentan un examen
   escrito, los demás miembros desarrollan otro cuestionario, y «el puntaje de
   los dos exámenes se sumará y el resultado de este será el resultado final».
   La app guardaba una nota por participante y dejaba la suma a mano.
   Se reparte en los dos grupos que el reglamento distingue: los adultos que
   presentan el escrito (padres, consejeros y Guías Mayores) y el resto del
   club. Y se muestra la suma, que es el numero que se reporta. */
/* El reglamento de «En esto creemos» suma dos notas: la de los dos adultos
   que presentan el examen escrito y la del resto del club. Con las creencias
   como actividad propia, esos dos grupos son sus dos categorias, y ya no hay
   que adivinarlos a partir de las categorias de Conexion Biblica. */
const ADULTOS=['ec1','pa','gm'];
function sumaClub(hechas){
  if(!hechas||hechas.length<2)return '';
  const tot=g=>g.reduce(function(a,x){return {n:a.n+(x.nota||0),t:a.t+(x.total||0),c:a.c+1};},{n:0,t:0,c:0});
  const ad=tot(hechas.filter(function(x){return ADULTOS.indexOf(x.categoria)>=0;}));
  const cl=tot(hechas.filter(function(x){return ADULTOS.indexOf(x.categoria)<0;}));
  const to=tot(hechas);
  const fila=function(tit,g){
    return g.c?'<tr><td>'+tit+'</td><td>'+g.c+'</td><td><strong>'+g.n+'/'+g.t+'</strong></td>'+
      '<td>'+(g.t?Math.round(g.n/g.t*100):0)+'%</td></tr>':'';
  };
  return '<div class="divisor">Resultado del club</div>'+
    '<div class="tabla-scroll"><table class="info-table">'+
    '<tr><th>Grupo</th><th>Cuántos</th><th>Puntaje</th><th>%</th></tr>'+
    fila('Adultos (escrito)',ad)+fila('Resto del club',cl)+
    '<tr><td><strong>Suma</strong></td><td><strong>'+to.c+'</strong></td>'+
    '<td><strong>'+to.n+'/'+to.t+'</strong></td><td><strong>'+
    (to.t?Math.round(to.n/to.t*100):0)+'%</strong></td></tr>'+
    '</table></div>'+
    '<p class="nota">El reglamento suma el examen escrito de los adultos con el cuestionario '+
    'del resto del club. <strong>La suma es el número que se reporta.</strong></p>';
}

async function cargaParticipantes(pre){
  const d=document.getElementById('pan-lista');
  if(!d)return;
  try{
    const p=pre||((await srvFetch('/panel/participantes')).participantes||[]);
    revisaAbrir(p.length);
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

/* ── MATERIAL NUEVO: COMO SE ENTERA LA APP ───────────────────────────────
   MECANISMO, Y POR QUE NO BASTABA CON LO QUE YA HABIA
   El service worker pide el index a la red primero, asi que cada vez que la
   app ARRANCA con internet ya trae lo ultimo. El problema es otro: iOS no
   recarga una app instalada al volver a ella, restaura la pantalla donde
   quedo. Se puede pasar dias con la app abierta viendo material viejo sin
   que nada avise, y eso es justo lo que paso.

   Asi que se pregunta por /version.json, que son unos 60 bytes, y se compara
   con VERSION_APP, la huella que va incrustada en el HTML que esta corriendo
   ahora. Preguntar por el index completo serian 772 KB cada vez, y con datos
   del celular eso no se puede hacer en cada apertura.

   NO SE RECARGA SOLA, A PROPOSITO. Si la nina esta a mitad de un examen,
   recargar le borra las respuestas sin entregar. Se avisa y ella decide
   cuando. La unica excepcion es que nunca aplica durante un examen aunque lo
   pida: primero hay que entregar. */
let verNueva=null, verUltimo=0;

/** Un examen empezado y sin entregar. Recargar aqui pierde las respuestas. */
const examenEnCurso=()=>prueba&&prueba.length>0&&!entregado;

async function buscaVersion(manual){
  if(typeof VERSION_APP==='undefined')return null;
  if(typeof location==='undefined'||location.protocol.indexOf('http')!==0)return null;
  const ahora=Date.now();
  /* Sin este freno, cambiar de app y volver diez veces son diez peticiones.
     Un minuto es de sobra: el material no cambia cada minuto. */
  if(!manual&&ahora-verUltimo<60000)return verNueva;
  verUltimo=ahora;
  try{
    const r=await fetch('/version.json?t='+ahora,{cache:'no-store'});
    if(!r.ok)return null;
    const j=await r.json();
    verNueva=(j&&j.v&&j.v!==VERSION_APP)?j.v:null;
  }catch(e){ /* sin internet no hay novedad que reportar */ }
  pintaAvisoVer();
  return verNueva;
}

function pintaAvisoVer(){
  const el=document.getElementById('aviso-nuevo');
  if(!el)return;
  el.hidden=!verNueva;
}

/** «Después»: se esconde hasta la proxima apertura, no se descarta para
 *  siempre. Si alguien no quiere actualizar ahora, mañana se le vuelve a
 *  ofrecer, porque el material del campamento si importa que este al dia. */
function cierraAvisoVer(){
  const el=document.getElementById('aviso-nuevo');
  if(el)el.hidden=true;
}

async function aplicaVersion(){
  if(examenEnCurso()){
    const el=document.getElementById('aviso-nuevo');
    if(el)el.innerHTML='<span>⚠️ Primero entrega el examen y vuelve a tocar Actualizar.</span>'+
      '<button type="button" class="av-x" onclick="cierraAvisoVer()" title="Cerrar">✕</button>';
    return;
  }
  /* Se borran las caches y se le pide al service worker que se revise. Sin
     borrar la cache, la app podria volver a abrir con el mismo HTML: el
     nombre de la cache lleva la huella, asi que la vieja quedaria huerfana
     igual, pero borrarla evita que la caida a cache sirva lo viejo mientras
     llega lo nuevo. */
  try{
    if(typeof caches!=='undefined')
      for(const k of await caches.keys())await caches.delete(k);
  }catch(e){}
  try{
    if(navigator.serviceWorker){
      const rs=await navigator.serviceWorker.getRegistrations();
      for(const r of rs)await r.update();
    }
  }catch(e){}
  location.reload();
}

/** El boton del manual. Dice siempre algo: «ya estas al dia» tambien es una
 *  respuesta, y sin ella el boton parece no hacer nada. */
async function revisaAhora(btn){
  const res=document.getElementById('ver-res');
  if(btn)btn.disabled=true;
  if(res)res.textContent='Revisando…';
  const nueva=await buscaVersion(true);
  if(btn)btn.disabled=false;
  if(!res)return;
  if(nueva)res.innerHTML='📘 <strong>Hay material nuevo.</strong> Toca '+
    '<strong>Actualizar</strong> en la franja naranja de arriba.';
  else if(typeof VERSION_APP==='undefined')res.textContent=
    'Esta copia se abrió como archivo, no desde internet, así que no hay nada que revisar.';
  else res.textContent='✅ Ya tienes la versión más reciente.';
}

if(typeof document!=='undefined'&&document.addEventListener){
  /* Volver a la app es el momento que importa: es cuando iOS restaura la
     pantalla vieja sin recargar. */
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible')buscaVersion(false);
  });
}
if(typeof addEventListener==='function')
  addEventListener('load',()=>{setTimeout(()=>buscaVersion(false),1500);});

/* ── REGISTRO DEL SERVICE WORKER ─────────────────────────────────────────
   Va al final y con tres guardas. typeof navigator, porque las pruebas cargan
   este archivo con un DOM de mentiras que no lo tiene. El protocolo, porque en
   file:// la llamada lanza y el index.html tiene que seguir abriendo con doble
   clic. Y el catch, porque un registro fallido no puede tumbar la app: sin
   service worker sigue funcionando, solo deja de abrir sin senal. */
if(typeof navigator!=='undefined'&&navigator.serviceWorker&&
   typeof location!=='undefined'&&location.protocol.indexOf('http')===0&&
   typeof addEventListener==='function'){
  addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
}
