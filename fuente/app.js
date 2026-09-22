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
      alcance:'Daniel 1, 2, 3 y 6'},
  av:{act:'cb', nombre:'Aventureros', edad:'7 a 9 años', n:15, techo:3, sinCompletar:false,
      alcance:'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44'},
  pa:{act:'cb', nombre:'Padres y consejeros', edad:'Adultos', n:25, techo:3, sinCompletar:false,
      alcance:'Daniel 1, 2, 3 y 6 · P&R 39, 41 y 44'},
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

/* El nombre de una categoria NO la identifica: «Menores» y «Aventureros»
   existen en Conexion Biblica y en Devocion Matutina, con la misma edad. En
   cualquier lista donde puedan aparecer las dos hay que decir de que actividad
   es, o son dos filas identicas que nombran cosas distintas. El icono va
   delante porque la columna de una tabla en un celular no da para mas. */
const catConActividad=k=>CATS[k]
  ? ((ACTIVIDADES[CATS[k].act]||{}).icono||'')+' '+CATS[k].nombre
  : String(k);

/* ───────── y en un desplegable, dentro del TEXTO de la opcion ─────────
   MECANISMO
   Agrupar con <optgroup> es lo correcto y en escritorio se ve bien, pero el
   selector nativo de iOS pinta la lista de opciones SIN las etiquetas de
   grupo. Visto en un iPhone: las ocho categorias seguidas, con «Menores · 4 a
   6 años» dos veces, exactamente igual que antes de agrupar.

   REGLA: lo que distingue dos opciones va en el TEXTO de la opcion, nunca solo
   en la estructura que las rodea. La estructura la pinta cada navegador como
   quiera; el texto se ve en todos.

   Y va de PRIMERO, no al final: en una pantalla angosta el texto se corta o se
   envuelve, y si la parte que distingue queda al final, las dos opciones
   empiezan igual y se leen igual. */
const catLarga=k=>CATS[k]
  ? ((ACTIVIDADES[CATS[k].act]||{}).nombre||'')+' · '+CATS[k].nombre+' '+CATS[k].edad
  : String(k);


const CAT=()=>CATS[S.cat]||CATS.av;

const CLAVE='conexion-biblica-v4';
/* `ft` es la caja de cada tarjeta (0, 1 o 2) y ya venía de antes. `fv` es
   NUEVO: el día en que se acertó por última vez. Se agrega como mapa aparte, y
   no cambiando la forma de `ft`, para que el progreso que ya está guardado en
   los celulares siga valiendo sin migración. */
/* `qv` cuenta CUANTAS VECES le ha salido cada pregunta a esta ficha. Campo
   nuevo, no renombrado: una ficha vieja llega sin el y `normalizar` lo deja
   en cero, que es exactamente «nunca le ha salido nada». */
const BASE={v:4,pid:'',nombre:'',cat:'av',prog:{},examenes:[],racha:0,ultimo:null,insignias:[],fq:{},ft:{},fv:{},qv:{},acc:{},act:{},links:{}};

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
  /* `pid` ata esta ficha a una persona del servidor. Es lo unico que
     sobrevive a que le cambien el nombre. */
  if(typeof x.pid==='string')s.pid=x.pid.slice(0,64);
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
  if(x.qv&&typeof x.qv==='object')
    for(const k of Object.keys(x.qv).slice(0,3000)){
      const v=Number(x.qv[k]);
      if(Number.isFinite(v)&&v>0)s.qv[k]=Math.min(99,Math.round(v));
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

function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(DB));}catch(e){}programaSubida();}

/* ── EL PROGRESO VIAJA CON LA PERSONA, NO CON EL NAVEGADOR ──────────────
   MECANISMO
   Una sola llamada sube y baja: el aparato manda SU ficha, el servidor la
   funde con la guardada y devuelve el resultado, y el aparato adopta lo
   devuelto. La fusión vive SOLO en el servidor (functions/api): escribirla
   también aquí serían dos versiones de la misma regla, y el día que una
   cambie la otra deja de coincidir sin avisar.

   CUÁNDO SE DISPARA
   Al arrancar con sesión, al entrar con el código, y 4 segundos después del
   último guardado. Los 4 segundos no son un adorno: sin ellos, contestar un
   examen de 15 preguntas mandaría quince fichas.

   SI NO HAY SEÑAL NO PASA NADA, y no hace falta cola: como la fusión es
   monótona (lo que crece nunca decrece), lo que no subió hoy sube en la
   próxima llamada con el mismo resultado. Esto NO reemplaza la cola de las
   notas de evaluación, que sí tienen que llegar una por una.

   SIN SESIÓN, TODO SIGUE EXACTAMENTE IGUAL QUE ANTES: quien nunca entró con
   un código estudia contra su localStorage y no habla con el servidor. */
let progTimer=null, adoptandoProg=false;

function programaSubida(){
  if(adoptandoProg)return;
  if(!srvYo||srvYo.rol!=='participante')return;
  if(typeof setTimeout!=='function')return;
  clearTimeout(progTimer);
  progTimer=setTimeout(function(){sincronizaProgreso();},4000);
}

/** ¿La ficha que esta abierta en el aparato es la de la sesion del servidor?
 *  Si la ficha ya sabe de quien es (`pid`), esa es la comparacion buena: no
 *  depende del nombre, que el director puede cambiar desde v110. Una ficha
 *  vieja todavia no tiene pid, y ahi se cae al nombre y a la ACTIVIDAD, que es
 *  como se comparaba antes. Por actividad y no por categoria a proposito: una
 *  nina puede pasar de Menores a Aventureros y sigue siendo su progreso. */
function fichaEsDeLaSesion(){
  if(!srvYo||!S)return false;
  if(S.pid&&srvYo.id)return S.pid===srvYo.id;
  if(srvYo.nombre&&(S.nombre||'').trim().toLowerCase()!==String(srvYo.nombre).trim().toLowerCase())
    return false;
  if(srvYo.categoria&&CATS[srvYo.categoria]&&ACT_DE(S.cat)!==ACT_DE(srvYo.categoria))
    return false;
  return true;
}

async function sincronizaProgreso(){
  if(!srvYo||srvYo.rol!=='participante'||!S)return false;
  /* LA GUARDA, a proposito. Quien llame a esto sin haber alineado la ficha no
     sube nada, en vez de mezclar dos progresos. */
  if(!fichaEsDeLaSesion())return false;
  let cuerpo;
  try{cuerpo=JSON.stringify(S);}catch(e){return false;}
  try{
    const d=await srvFetch('/progreso',{method:'POST',body:cuerpo});
    if(!d||!d.ficha)return false;
    adoptandoProg=true;
    DB.alumnos[DB.activo]=normalizar(d.ficha);
    S=DB.alumnos[DB.activo];
    guardar();
    adoptandoProg=false;
    if(typeof pintaInicio==='function')pintaInicio();
    if(typeof pintaSesion==='function')pintaSesion();
    return true;
  }catch(e){adoptandoProg=false;return false;}
}

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

/* evalId/evalTitulo siguen siendo UNA evaluación (la que le toca a ESTE
   aparato: la de la participante que entró con código, o ninguna). Eso no
   cambió, porque a un aparato nunca le pueden tocar dos a la vez.
   `evaluaciones` es nuevo y es la lista COMPLETA de lo que /estado ve abierto
   en el servidor ahora mismo (puede haber varias, una por categoría); solo la
   usa el panel del director para saber que hay algo corriendo antes de que
   termine de cargar el detalle. Si no se pasa (como en las llamadas viejas,
   con 3 argumentos), se conserva lo último que había, para no borrarle al
   director esa lista cada vez que un aparato de participante escribe en esta
   misma llave de localStorage. */
function srvGuarda(practica,evalId,evalTitulo,evaluaciones){
  try{
    const prev=srvLee();
    localStorage.setItem(SRV_CACHE,JSON.stringify(
      {practica:!!practica,evalId:evalId||null,evalTitulo:evalTitulo||null,
       evaluaciones:evaluaciones!==undefined?evaluaciones:((prev&&prev.evaluaciones)||[]),
       visto:Date.now()}));
  }catch(e){}
}

/* ───────── LAS PREGUNTAS RETIRADAS ─────────
   QUE ES UNA PREGUNTA RETIRADA
   Una que el director leyo y decidio sacar: esta repetida, mal redactada, o
   pregunta algo que el reglamento no pide. No se borra, se retira: sigue en el
   HTML y se puede devolver.

   POR QUE NO SE BORRA DEL BANCO
   El banco son 1.378 preguntas dentro de index.html, que es un archivo
   GENERADO: quitar una obliga a editar el generador, correr build.js y
   desplegar. Eso no se hace desde un celular. Asi que el retiro vive en el
   servidor, la app se lo trae y lo aplica al armar el examen. El artefacto no
   se toca y el generador tampoco.

   SE CACHEA IGUAL QUE LO DEMAS DEL SERVIDOR
   Viaja dentro de /estado, que es lo que la app ya consulta al arrancar y
   antes de cada examen. Sin señal se usa lo ultimo que se supo, que es lo
   mismo que hace el interruptor de la practica. Si nunca contesto, el conjunto
   esta vacio: el banco completo, que es lo que el artefacto trae escrito. */
const RET_CACHE='cb-ret';
let retiradas=new Set();
function retLee(){
  try{const x=JSON.parse(localStorage.getItem(RET_CACHE)||'[]');return Array.isArray(x)?x:[];}
  catch(e){return [];}
}
function retGuarda(lista){
  try{localStorage.setItem(RET_CACHE,JSON.stringify(lista.slice(0,3000)));}catch(e){}
}
function ponRetiradas(lista){retiradas=new Set(lista||[]);}
ponRetiradas(retLee());
const estaRetirada=q=>retiradas.has(claveQ(q));

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
    const evaluaciones=d.evaluaciones||[];
    /* evalId/evalTitulo (el aviso genérico de "hay una evaluación abierta",
       que usa pintaCierre() para cualquier aparato sin código) toman la que
       de verdad cierra la práctica para todos, si hay una así. Con varias
       abiertas dirigidas cada una a su categoría, ninguna es "la" de este
       aviso general: ese aparato sigue practicando y no hay nada que avisar
       aquí (a la participante invitada se lo dice /evaluacion, que sí sabe
       quién es ella). */
    const paraTodas=evaluaciones.find(function(e){return e.paraTodas;});
    srvGuarda(d.practica, paraTodas&&paraTodas.id, paraTodas&&paraTodas.titulo, evaluaciones);
    /* Solo si vino el campo. Un servidor viejo (o una respuesta recortada) no
       puede DEVOLVER al banco preguntas que el director retiro: se queda con
       lo ultimo que se supo, igual que el interruptor de la practica. */
    if(Array.isArray(d.retiradas)){ponRetiradas(d.retiradas);retGuarda(d.retiradas);}
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

/* ───────── lo que respondio, no solo cuanto saco ─────────
   MECANISMO
   El examen corre entero en el navegador, asi que el servidor recibia nota y
   total y nada mas. El director veia «13/20» y para saber EN QUE se equivoco
   tenia que ir al celular de ella y abrir la revision ahi mismo, apenas
   terminaba. Despues del campamento eso ya no se puede.

   QUE SE MANDA: una entrada por pregunta con la CLAVE de la pregunta, el tipo,
   lo que respondio y si acerto. No se manda el texto de la pregunta: ese vive
   en el HTML y el panel lo busca por la clave al pintar.

   POR QUE LA CLAVE Y NO LA SEMILLA
   Con la semilla se puede reconstruir el examen, pero solo mientras el banco no
   cambie: una pregunta nueva corre el sorteo y la reconstruccion deja de
   coincidir. La clave no depende del banco, asi que la revision sigue siendo
   correcta cuando el banco crezca. */
function respuestasDe(sel){
  return sel.map(q=>{
    const e={k:claveQ(q),t:q.t,b:bien(q)?1:0};
    if(q.t==='mc')e.r=(resp[q.id]===undefined?null:resp[q.id]);
    else if(q.t==='tf')e.r=(resp[q.id]===undefined?null:!!resp[q.id]);
    else e.r=q.p.map((x,i)=>x.b?String(resp[q.id+'_'+i]||''):null);
    return e;
  });
}

function srvIntento(modo,evalId,nota,total,respuestas){
  if(!srvYo||srvYo.rol!=='participante')return;
  let idem='';
  try{idem=crypto.randomUUID();}catch(e){idem=String(Date.now())+Math.random();}
  const cuerpo={modo:modo,evaluacion_id:evalId||null,nota:nota,total:total,idempotency_key:idem,
    respuestas:respuestas?JSON.stringify(respuestas):''};
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
   UNA SOLA PERILLA.
   La práctica está cerrada exactamente cuando hay una evaluación abierta. No
   hay interruptor por aparato ni segundo estado que sincronizar: el servidor
   dice «hay evaluación» y con eso ya está dicho todo.
   Sin señal manda lo último que se supo, y si eso era «cerrado», sigue cerrado:
   se falla CERRADO, nunca abierto por accidente. El director se lo salta.

   HOY LA PERILLA ESTA EN «NO CERRAR», por decisión de Camilo del 19 de
   septiembre: el examen final no se presenta en esta app por ahora, así que
   todo lo que se abre aquí es un ensayo, y un ensayo que le apaga la práctica
   a las participantes hace más daño que bien. La evaluación se sigue viendo y
   se sigue pudiendo hacer; lo único que ya no pasa es que se cierre lo demás.

   ESTO ES UNA LINEA, A PROPOSITO. Cuando el examen de verdad se presente aquí,
   se pone `CIERRA_PRACTICA=true` y vuelve el comportamiento completo, que
   sigue escrito y probado abajo. Se deja como interruptor y no se borra el
   mecanismo porque «por ahora» fueron las palabras de Camilo. */
let CIERRA_PRACTICA=false;
const examenesCerrados=()=>{
  if(!CIERRA_PRACTICA)return false;
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
  reiniciaPractica();alcance='todo';cuantas=0;nivel=0;
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

async function borraAlumno(){
  if(alumnos().length<=1){
    borrarTodo();return;
  }
  if(!await preguntaApp('¿Borrar a '+(S.nombre||'este participante')+'?',
    'Se borra su progreso en este aparato.','Borrar',true))return;
  delete DB.alumnos[DB.activo];
  cambiaAlumno(Object.keys(DB.alumnos)[0]);
}

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* El frente y el reverso de una tarjeta traen negritas del generador. En el
   mazo se pintan; en la lista del revisor no, porque esc() las mostraria como
   texto ("Nombre babilonico de <b>Daniel</b>"). Se quitan antes de escapar,
   y el buscador filtra sobre lo mismo que se ve, o "de Daniel" no encontraria
   una tarjeta partida por una etiqueta en la mitad. */
const sinEtiquetas=s=>String(s??'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();

/* Lleva el ojo adonde pasó algo. Abrir un examen o entrar con el código
   repinta la pantalla, pero un repintado silencioso en un punto que ya no
   coincide con el scroll de quien lo pidió SE VE como que no pasó nada: la
   confirmación queda arriba o abajo del marco visible. Se usa después de esas
   acciones para que la persona vea de una el resultado, no para navegar. */
function llevaA(id){
  const el=document.getElementById(id);
  if(!el)return;
  el.scrollIntoView({behavior:'smooth',block:'start'});
  el.classList.remove('destaca');
  void el.offsetWidth;             // reinicia la animación si ya se usó antes
  el.classList.add('destaca');
}
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

/* EL FILTRO DE RETIRADAS VA AQUI Y EN NINGUN OTRO LADO.
   bancoDe() es el unico origen de preguntas de examen: de el salen el pool de
   practicar, el de la evaluacion, los errores por repasar, los impresos y las
   cuentas del manual. Filtrar aqui las retira de los seis a la vez, y no hay
   forma de agregar un camino nuevo que se las salte.
   Lo que NO pasa por aqui sigue intacto a proposito: las tarjetas, la pestaña
   «Compruebalo» y la revision de un intento viejo, que busca el enunciado por
   clave en BANCO. Una pregunta retirada hoy no puede borrar lo que una niña
   respondio la semana pasada. */
const bancoDe=()=>{
  const ids=capsDe().filter(c=>!soloEstudio(c,S.cat)).map(c=>c.id);
  return BANCO.filter(q=>ids.includes(q.cap)&&!estaRetirada(q));
};
const modsDe=()=>MODULOS.filter(m=>m.cats.includes(S.cat));
/* Las tarjetas pasan por el MISMO registro de retiradas que las preguntas: su
   clave tiene la misma forma (capitulo + hash del frente), asi que la tabla y
   el endpoint sirven igual. Y este es su unico embudo, como bancoDe() es el de
   las preguntas: filtrar aqui las saca del mazo, de la sesion de hoy, de los
   juegos, de los impresos y de las cuentas del manual, todo a la vez. */
const estaRetiradaT=t=>retiradas.has(claveT(t));
const tarjetasDe=()=>{const ids=capsDe().map(c=>c.id);
  return TARJETAS.filter(t=>ids.includes(t.cap)&&!estaRetiradaT(t));};
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
  if(id==='revisor')pintaRevisor();
  if(id==='historial')pintaHistorial();
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
  reiniciaPractica();prueba=[];resp={};entregado=false;
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
    avisaApp('Este aparato ya tiene '+MAX_ALUMNOS+' fichas','Borra una antes de agregar otra.');
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
      /* Con el icono de la actividad, no solo el nombre: en un aparato con
         fichas de dos actividades salian dos «Aventureros» iguales. */
      '<div class="ac">'+esc(catConActividad(al.cat))+'</div></button>';
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
      '<p class="nota">En Conexión Bíblica el campamento va en '+
      '<strong>Daniel 1, 2, 3 y 6</strong> y los capítulos 39, 41 y 44 de Profetas y '+
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
/* SIN \b AL PRINCIPIO, A PROPOSITO.
   `\b` en JavaScript se define sobre [A-Za-z0-9_], asi que entre un espacio y
   una «E» no hay frontera de palabra: las dos son no-palabra. Con `\b` delante,
   «Exodo 31:13-17» NO enganchaba y era el unico de los 42 libros que jamas se
   volvia tocable, sin error ni aviso. Se quita el `\b` y el borde izquierdo se
   comprueba a mano en el reemplazo, mirando el caracter anterior: hace lo mismo
   y ademas funciona con acentos. Sin lookbehind, que no esta en los iPhone
   viejos. */
const LETRA_ANTES=/[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
/* ── UNA CITA PUEDE TRAER UNA LISTA DE VERSICULOS ────────────────────
   MECANISMO
   La cartilla no cita siempre un versiculo suelto ni siempre un rango: cita
   listas — «2 Pedro 1:20,21», «Proverbios 30:5, 6», «Juan 1:1-3,14». El
   patron paraba en el primer tramo, asi que de «2 Pedro 1:20,21» solo
   «2 Pedro 1:20» se volvia boton y el «,21» se quedaba afuera: texto plano
   pegado a un enlace subrayado. Eso es lo que se veia roto en creencias.

   CADA TRAMO ES SU PROPIO BOTON y los separadores se quedan como texto.
   No se juntan todos en un solo rango a proposito: «1 Corintios 15:3,4,20-22»
   NO es «15:3-22», y el encabezado de la hoja anunciaria un rango que la
   cartilla nunca cito. Un boton por tramo dice la verdad y de paso deja
   tocable cada versiculo que la cartilla si cita.

   MEDIDO en tools/creencias/datos.py: de 261 referencias de las 28 creencias,
   60 traen coma — 50 consecutivas y 10 mezcladas con guion. */
const COLA_CITA='((?:\\s*,\\s*\\d{1,3}(?:\\s*[-–]\\s*\\d{1,3})?)*)';
const COLA_TRAMO=/(\s*,\s*)(\d{1,3})(?:(\s*[-–]\s*)(\d{1,3}))?/g;

const OTRO_LIBRO_CITA=(typeof NOMBRES_OTROS!=='undefined')
  ?new RegExp('('+Object.values(NOMBRES_OTROS).map(n=>n.replace(/\s+/g,'\\s+'))
      .sort((a,b)=>b.length-a.length).join('|')+')\\s+(\\d{1,3}):(\\d{1,3})(?:\\s*[-–]\\s*(\\d{1,3}))?'+COLA_CITA,'g')
  :null;

/** El unico sitio donde se arma un boton de versiculo. Si el capitulo no
 *  esta sourced o el versiculo no existe, devuelve el texto tal cual: un
 *  boton mudo es peor que texto sin boton. */
function botonVers(cid,texto,de,hasta){
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[de])return texto;
  const h=(hasta&&hasta>de&&t.mapa[hasta])?hasta:de;
  return '<button type="button" class="vref" title="Ver el versículo"'+
    ' onclick="verVers(this,\''+cid+'\','+de+','+h+')">'+texto+'</button>';
}

/** Los tramos que vienen detras de la primera cita («,21», «, 20-22»): uno
 *  por boton, con su separador intacto entre ellos. */
function colaVers(cid,cola){
  if(!cola)return '';
  return cola.replace(COLA_TRAMO,(t,sep,a,g,b)=>
    sep+botonVers(cid,a+(b?g+b:''),+a,b?+b:0));
}

function botonRef(todo,c,v,v2,cola){
  cola=cola||'';
  const cid='d'+c, cabeza=cola?todo.slice(0,todo.length-cola.length):todo;
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[+v])return todo;
  return botonVers(cid,cabeza,+v,v2?+v2:0)+colaVers(cid,cola);
}

function botonRefOtro(todo,nombre,c,v,v2,cola){
  cola=cola||'';
  const key=KEY_POR_NOMBRE[nombre];
  if(!key)return todo;
  const cid=key+'-'+c, cabeza=cola?todo.slice(0,todo.length-cola.length):todo;
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[+v])return todo;
  return botonVers(cid,cabeza,+v,v2?+v2:0)+colaVers(cid,cola);
}

/* ─────────────────── BLOQUES QUE SE REVELAN AL TOCAR ───────────────────
   MECANISMO
   Leer una respuesta y reconocerla se siente igual de facil que saberla, y
   no es lo mismo: al reconocer, la respuesta ya esta en la pantalla. Lo que
   fija es PRODUCIRLA. Por eso el material de estudio no muestra la respuesta:
   muestra la pregunta, y la respuesta sale cuando la persona ya intento.

   Es el mismo principio de las tarjetas, metido dentro del texto de estudio
   en vez de en una pantalla aparte.

   Se alterna, no es de un solo sentido: volver a tocar la tapa otra vez, para
   poder repasar la misma pregunta sin recargar. */
function revela(b){
  const a=b.nextElementSibling;
  if(!a)return;
  a.hidden=!a.hidden;
  b.classList.toggle('abierto',!a.hidden);
  const p=b.querySelector('.rev-p');
  if(p)p.textContent=a.hidden?'tocar para ver':'tocar para tapar';
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
    let out=tr.replace(/Daniel\s+(\d{1,2}):(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?((?:\s*,\s*\d{1,3}(?:\s*[-–]\s*\d{1,3})?)*)/g,
      (todo,c,v,v2,cola)=>'\u0000'+botonRef(todo,c,v,v2,cola)+'\u0000');
    /* Pasada 2: «Libro N:M» para un libro distinto de Daniel, en cualquier
       parte (fuera o dentro de parentesis). El nombre completo del libro ya
       distingue la cita: no hace falta el candado de la pasada 3. */
    if(OTRO_LIBRO_CITA){
      out=out.replace(OTRO_LIBRO_CITA,(todo,nombre,c,v,v2,cola,pos,cadena)=>{
        if(todo.indexOf('\u0000')>=0)return todo;
        /* El borde izquierdo, que antes hacia el \b: que no venga pegado a otra
           letra o numero, o «1 Juan» se tomaria de dentro de «21 Juan». */
        if(pos>0&&LETRA_ANTES.test(cadena.charAt(pos-1)))return todo;
        return '\u0000'+botonRefOtro(todo,nombre,c,v,v2,cola)+'\u0000';
      });
    }
    if(enDaniel){
      /* Pasada 3: (N:M) suelto dentro de parentesis, solo en un capitulo de
         Daniel, y solo si el parentesis no nombra ya otro libro. */
      out=out.replace(/\(([^)]*)\)/g,(todo,dentro)=>{
        if(dentro.indexOf('\u0000')>=0||OTRO_LIBRO.test(dentro))return todo;
        return '('+dentro.replace(/(\d{1,2}):(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?((?:\s*,\s*\d{1,3}(?:\s*[-–]\s*\d{1,3})?)*)/g,
          (t2,c,v,v2,cola)=>botonRef(t2,c,v,v2,cola))+')';
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

/* ─────────── PREGUNTAR Y AVISAR DENTRO DE LA APP ───────────
   POR QUE NO `confirm()` NI `alert()`
   No son de la app: en un iPhone instalado salen con el dominio encima, en la
   letra del sistema y con los botones del sistema, así que en la mitad de un
   examen la niña ve de golpe algo que parece del navegador y no de su app. Y
   son BLOQUEANTES: congelan todo el hilo, incluido el reloj del examen.

   NO ES UN MODAL NUEVO: es la MISMA hoja del versículo (`abreHojaHtml`), con
   otro contenido. Un segundo sistema de ventanas con su propio abrir, cerrar,
   fondo y Escape sería el error que v47 ya arregló una vez.

   Devuelve una promesa para poder escribir `if(await preguntaApp(...))`, que
   se lee igual que el `confirm()` de antes. Cerrar por el fondo o con Escape
   resuelve `false`: descartar una pregunta es decir que no. */
let hojaResuelve=null;

function htmlPregunta(titulo,texto,okTxt,peligro,soloAviso){
  return '<div class="hoja-fondo" onclick="cierraPregunta(false)"></div>'+
    '<div class="hoja-caja preg" role="alertdialog" aria-modal="true" aria-label="'+esc(titulo)+'">'+
    '<div class="hoja-asa" onclick="cierraPregunta(false)"></div>'+
    '<div class="preg-cuerpo">'+
      '<div class="preg-t">'+esc(titulo)+'</div>'+
      (texto?'<p class="preg-p">'+esc(texto)+'</p>':'')+
    '</div>'+
    '<div class="preg-pie">'+
      (soloAviso?'':'<button type="button" class="btn gho" onclick="cierraPregunta(false)">Cancelar</button>')+
      '<button type="button" class="btn '+(peligro?'rojo':'azul')+'" onclick="cierraPregunta(true)">'+
        esc(okTxt||'Entendido')+'</button>'+
    '</div></div>';
}

function preguntaApp(titulo,texto,okTxt,peligro){
  /* Sin la hoja en el HTML (las pruebas cargan el JS con un DOM de mentiras)
     se cae al confirm de siempre en vez de quedarse esperando para siempre. */
  if(typeof document==='undefined'||!document.getElementById('hoja'))
    return Promise.resolve(typeof confirm==='function'?confirm(titulo+(texto?'\n\n'+texto:'')):true);
  return new Promise(function(res){
    hojaResuelve=res;
    abreHojaHtml(htmlPregunta(titulo,texto,okTxt,peligro,false),'preg');
  });
}

function avisaApp(titulo,texto){
  if(typeof document==='undefined'||!document.getElementById('hoja')){
    try{if(typeof alert==='function')alert(titulo+(texto?'\n\n'+texto:''));}catch(e){}
    return Promise.resolve(true);
  }
  return new Promise(function(res){
    hojaResuelve=res;
    abreHojaHtml(htmlPregunta(titulo,texto,'Entendido',false,true),'preg');
  });
}

function cierraPregunta(v){
  const r=hojaResuelve;hojaResuelve=null;
  cierraHoja();
  if(r)r(!!v);
}

function cierraHoja(){
  paraVoz();
  /* Si había una pregunta abierta y se cierra por el fondo, por el asa o con
     Escape, eso es un «no». Sin esto, quien descarta la hoja deja la promesa
     colgada y la acción nunca termina. */
  if(hojaResuelve){const r=hojaResuelve;hojaResuelve=null;r(false);}
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
      (puedeHablar()?grupoVoz('btn-voz','Escuchar','Escuchar el versículo'):'')+
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
      (puedeHablar()?grupoVoz('btn-voz','Escuchar estos versículos','Escuchar '+rot):'')+
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
      (puedeHablar()?grupoVoz('lec-voz','Escuchar','Escuchar el capítulo'):'')+
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

/* ───────── CAPA POR SECCIÓN (núcleo / apoyo / contexto) ─────────
   MECANISMO
   fuente/contenido.js le pone `capa` a cada sección que ya la tiene
   clasificada (hoy solo Daniel 3) y build.js le agrega `preg` a las de capa
   núcleo cuando encuentra una pregunta del banco que cae en su rango de
   versículo. Aquí solo se pinta lo que ya llega armado: la franja de color
   en `.sec h3` la pone el CSS con `data-capa`, y estas funciones agregan la
   píldora, el filtro y la tarjeta de recordar.

   El filtro es de VISTA, no de estado: no se guarda en ningún lado, así que
   cambiar de capítulo o recargar la página siempre arranca en «Todo». */
const CAPA_ETQ={nucleo:'Entra al examen',apoyo:'Ayuda a entender',contexto:'No entra'};

/* ── LA CABECERA DE UNA SECCION ─────────────────────────────────
   ANTES: emoji + titulo azul en negrita + barra naranja a la izquierda +
   pildora de color. Cuatro señales para decir dos cosas, y encima la caja de
   adentro traía SU barra de color, así que quedaban dos rayas verticales
   seguidas. Eso es lo que se veía cargado.

   AHORA: el rótulo en versalitas, una línea que cruza hasta el borde, y la
   capa al final con un punto. Los tres puntos son una escala que se lee sin
   leer la palabra: relleno entra al examen, contorno ayuda a entender, gris
   no entra. El emoji del título se quita aquí y no en los datos, porque los
   mismos títulos los usan el buscador, la impresión y el revisor. */
const SIN_EMOJI=/^[^\p{L}\p{N}]+/u;
function tituloSec(t){
  try{return String(t||'').replace(SIN_EMOJI,'').trim();}
  catch(e){return String(t||'').replace(/^[^A-Za-z0-9\u00c0-\u024f]+/,'').trim();}
}
function cabezaSec(s){
  const cap=s.capa||'';
  return '<h3 class="sec-cab"><span class="sec-rot">'+tituloSec(s.t)+'</span>'+
    '<span class="sec-linea"></span>'+
    (cap?'<span class="sec-capa c-'+cap+'"><i></i>'+CAPA_ETQ[cap]+'</span>':'')+'</h3>';
}

function filtroCapas(){
  return '<div class="capa-filtro" role="group" aria-label="Filtrar por capa">'+
    '<button type="button" class="cf on" onclick="filtraCapa(this,\'\')">Todo</button>'+
    '<button type="button" class="cf" onclick="filtraCapa(this,\'nucleo\')">Solo lo del examen</button></div>';
}

function filtraCapa(btn,modo){
  const d=document.getElementById('detalle');
  if(!d)return;
  d.querySelectorAll('.capa-filtro .cf').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  d.querySelectorAll('.sec').forEach(function(s){
    const c=s.getAttribute('data-capa')||'';
    s.style.display=(!modo||c===modo)?'':'none';
  });
}

/* La tarjeta de recordar no toca el examen ni las estadísticas: es su propio
   botón con su propio comprobador, aislado de jgBien/jgMal y de S.hist. Sin
   puntaje y sin castigo — el mismo criterio que ya usa «Compruébalo». */
function recordarHTML(preg){
  const rid='rec_'+Math.random().toString(36).slice(2,8);
  /* Un completar no se puede ofrecer con botones: la respuesta estaria en la
     pantalla y elegir no es producir. Va con campos, y se comprueba con el
     MISMO comparador del examen (`igual`), que ya ignora mayusculas, tildes y
     espacios de sobra. Aqui tampoco hay puntaje ni registro: es el mismo
     aislamiento que las de seleccion. */
  if(preg.t==='fill')return recordarFillHTML(rid,preg);
  const esTF=preg.t==='tf';
  const ops=esTF
    ?['Verdadero','Falso'].map((txt,i)=>
      '<button type="button" class="btn peq" onclick="compruebaRec(\''+rid+'\','+(i===0)+','+preg.a+')">'+txt+'</button>').join('')
    :(preg.o||[]).map((o,i)=>
      '<button type="button" class="btn peq" onclick="compruebaRec(\''+rid+'\','+i+','+preg.a+')">'+esc(o)+'</button>').join('');
  return '<div class="recordar" id="'+rid+'">'+
    '<div class="rec-tit">Antes de pasar — recuerda</div>'+
    '<div class="rec-preg">'+esc(preg.q)+'</div>'+
    '<div class="rec-ops">'+ops+'</div>'+
    '<div class="rec-comp" hidden></div></div>';
}

function recordarFillHTML(rid,preg){
  const campos=(preg.p||[]).map(p=>p.b
    ?'<input class="rec-in" type="text" autocomplete="off" autocapitalize="off"'+
      ' spellcheck="false" placeholder="'+esc(p.h||'\u00bf?')+'" data-b="'+esc(p.b)+'">'
    :'<span>'+esc(p.x)+'</span>').join('');
  return '<div class="recordar" id="'+rid+'">'+
    '<div class="rec-tit">Antes de pasar \u2014 recuerda</div>'+
    '<div class="rec-preg">'+esc(preg.ins||'Completa la declaraci\u00f3n')+'</div>'+
    '<div class="rec-rell">'+campos+'</div>'+
    '<div class="rec-ops"><button type="button" class="btn peq"'+
      ' onclick="compruebaRecFill(\''+rid+'\')">Comprobar</button></div>'+
    '<div class="rec-comp" hidden></div></div>';
}

function compruebaRecFill(rid){
  const c=document.getElementById(rid);
  if(!c)return;
  const campos=[].slice.call(c.querySelectorAll('.rec-in'));
  if(!campos.length)return;
  let todas=true;
  const faltaron=[];
  campos.forEach(function(i){
    const ok=igual(i.value,i.getAttribute('data-b'));
    i.className='rec-in '+(ok?'ok':'ko');
    /* Solo se dicen las que FALTARON. Listarlas todas devolvia tambien la que
       ya estaba bien, y la nina tiene que volver a leer para saber cual
       fallo. */
    if(!ok){todas=false;faltaron.push(i.getAttribute('data-b'));}
  });
  const comp=c.querySelector('.rec-comp');
  if(!comp)return;
  comp.hidden=false;
  comp.className='rec-comp '+(todas?'ok':'ko');
  comp.textContent=todas
    ?'\u2705 Correcto, palabra por palabra.'
    :'\u274c Falt\u00f3: '+faltaron.join(' \u00b7 ');
}

function compruebaRec(rid,elegido,correcta){
  const c=document.getElementById(rid);
  if(!c)return;
  const bien=elegido===correcta;
  c.querySelectorAll('.rec-ops button').forEach(b=>b.disabled=true);
  const comp=c.querySelector('.rec-comp');
  if(!comp)return;
  comp.hidden=false;
  comp.className='rec-comp '+(bien?'ok':'ko');
  comp.textContent=bien?'✅ Correcto.':'❌ No era esa — sigue leyendo con calma.';
}

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
    '<div class="cap-cab">'+
    '<div class="cap-ante">'+esc(c.label)+'</div>'+
    '<h2 class="cap-tit">'+esc(c.sub)+'</h2>'+
    '<div class="cap-meta">'+(c.src?esc(c.src)+' · ':'')+
    (esCreencia(id)?'textos en RV1960':esMatutina()?'Devoción matutina':'texto RV1995')+
    (c.vs?' · '+c.vs+' versículo'+(c.vs===1?'':'s'):'')+'</div></div>'+
    /* El capitulo completo va ARRIBA de las secciones y cerrado: quien quiera
       leer primero lo abre, y a quien viene a repasar un dato no le estorba. */
    seccionLectura(id)+
    (secs.some(s=>s.capa)?filtroCapas():'')+
    secs.map(s=>'<div class="sec" data-capa="'+(s.capa||'')+'">'+cabezaSec(s)+
      refsTocables(s.h,id)+(s.preg?recordarHTML(s.preg):'')+'</div>').join('')+
    '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #eef0f4;display:flex;gap:.7rem;flex-wrap:wrap">'+
    '<button class="btn ver" onclick="listo(\''+id+'\')">✅ Ya lo estudié</button>'+
    '<button class="btn nar" onclick="ir(\'tarjetas\')">🃏 Tarjetas</button>'+
    '<button class="btn azul" onclick="ir(\'examen\')">✏️ Examen</button>'+
    '<button class="btn gho" onclick="imprimeCapitulo(\''+id+'\')">🖨️ Imprimir este capítulo</button></div>';
  d.style.display='block';
  limpiaRetiradasDe(d);
  divideVista(d,id);
  avanza(id,60);
  /* verCap() pinta el detalle pero no movía el foco hasta él: con 28
     creencias en una rejilla de cuatro columnas, el detalle nace siete filas
     más abajo, fuera de lo que se ve, y tocar una tarjeta parecía no hacer
     nada. Mismo defecto que tuvo «abrir evaluación» (v99), mismo arreglo:
     llevaA() hace scroll y marca dónde aterrizar. */
  llevaA('detalle');
}

/* ───────── LO RETIRADO TAMPOCO SALE EN «COMPRUEBALO» ─────────
   MECANISMO
   Esa pestaña no se arma al pintar: la escribe fuente/build.js al generar el
   HTML, a partir de las tarjetas y las preguntas del capitulo. Cuando el
   director retira una, el HTML ya esta escrito y la seguiria mostrando.

   POR QUE SE COMPARA EL TEXTO Y NO LA CLAVE
   Marcar cada bloque con su clave obligaria a que build.js calculara el mismo
   hash que la app, y seria la misma funcion escrita en dos archivos: el dia que
   una cambie, la otra deja de coincidir sin avisar. El frente de la tarjeta ya
   esta en los dos lados y es exacto, asi que sirve de enlace sin duplicar nada.

   Si se retira algo que la pestaña no trae, no pasa nada: no hay bloque que
   quitar. */
function textosRetirados(){
  const fuera=new Set();
  for(const t of TARJETAS)if(retiradas.has(claveT(t)))fuera.add(t.f);
  for(const q of BANCO)if(retiradas.has(claveQ(q)))fuera.add(q.q||q.ins||'');
  return fuera;
}

function limpiaRetiradasDe(d){
  if(!d||!retiradas.size||!d.querySelectorAll)return;
  const fuera=textosRetirados();
  [].slice.call(d.querySelectorAll('.rev')).forEach(function(b){
    const t=b.querySelector&&b.querySelector('.rev-t');
    if(t&&fuera.has(t.textContent))b.remove&&b.remove();
  });
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

/* Reinicia desde el principio, sin esperar a que termine ni a pausar primero.
   El boton ↺ solo se ve mientras el de al lado esta activo (CSS, :has()), y
   vive en el MISMO grupo — reusa el texto que habla() ya guardo en dataset.txt
   del boton de audio, asi no hay que volver a buscar el bloque [data-leer]. */
function reiniciaVoz(btn){
  const grupo=btn.closest?btn.closest('.grupo-voz'):null;
  const voz=grupo?grupo.querySelector('.btn-voz'):null;
  if(!voz||!voz.dataset.txt)return;
  habla(voz.dataset.txt,voz);
}

/* Envuelve un boton de audio con su compañero de reinicio, en un solo grupo
   para que el CSS (:has()) decida cuando mostrar el segundo. Un solo punto
   de armado evita que las ocho ubicaciones que reproducen audio se
   desincronicen entre si. */
const grupoVoz=(claseVoz,title,aria)=>
  '<span class="grupo-voz"><button type="button" class="btn-reinicia" title="Reiniciar"'+
  ' aria-label="Reiniciar" onclick="reiniciaVoz(this)">↺</button>'+
  '<button type="button" class="'+claseVoz+'" title="'+title+'" aria-label="'+aria+'"'+
  ' onclick="leeCerca(this)">🔊</button></span>';

const BTN_VOZ=grupoVoz('btn-voz','Escuchar','Escuchar');'<button class="btn-voz" title="Escuchar" aria-label="Escuchar" onclick="leeCerca(this)">🔊</button>';

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
  /* Los modos se repintan en cada entrada porque dependen de la categoria:
     al cambiar de actividad puede aparecer o desaparecer «Clasificar». */
  pintaModosJuego();
  if(jgModo!=='tarjetas'){ if(!jgR)nuevaRonda(); else pintaJuego(); return; }
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

/* ══════════════════════════ EJERCICIOS INTERACTIVOS ══════════════════════════
   POR QUE EXISTEN
   El examen simula el examen: multiple, verdadero/falso y completar, en la
   proporcion real. Eso NO se toca, porque su trabajo es parecerse al de
   verdad. Pero repasar 28 declaraciones leyendo y volteando tarjetas es lo
   mas parecido que hay a no repasar: se pasa la vista y la cabeza no hace
   nada. Un ejercicio obliga a producir la respuesta, y producir es lo que
   fija.

   Por eso los cuatro juegos viven en «Tarjetas», del lado de la practica, y
   ninguno entra al examen.

   POR QUE SON GENERICOS
   Ninguno sabe que existen las creencias. Leen tres cosas de cada capitulo:
   `label` (la clave), `sub` (el valor) y `doc` (el grupo, opcional). Daniel y
   la matutina ya tienen label y sub, asi que emparejar, ordenar y completar
   les funcionan tal cual. Clasificar aparece SOLO donde hay grupos
   declarados, que hoy es «En esto creemos» con sus seis doctrinas: la funcion
   no pregunta por la actividad, pregunta si hay grupos.

   Y NO HAY VIDAS NI CORAZONES
   A proposito. Castigar el error con un recurso que se acaba empuja a dejar
   de practicar, que es justo lo contrario de lo que se necesita. Lo que se
   refuerza es la racha, que ya existe, y el error manda la ficha al repaso. */

const JUEGOS = [
  { id:'tarjetas', et:'🃏 Tarjetas',   ayuda:'Lee el frente y comprueba.' },
  { id:'quiz',     et:'⚡ Quiz',        ayuda:'Una pregunta a la vez, y te dice al instante si acertaste.' },
  { id:'vf',       et:'✅ ¿V o F?',     ayuda:'Decide si la frase es verdadera o falsa.' },
  { id:'parear',   et:'🔗 Emparejar',  ayuda:'Toca a la izquierda y después su pareja a la derecha.' },
  { id:'clasif',   et:'🗂️ Clasificar', ayuda:'¿A qué grupo pertenece?' },
  { id:'ordenar',  et:'🔢 Ordenar',    ayuda:'Tócalos en el orden correcto.' },
  { id:'banco',    et:'✍️ Completar',  ayuda:'Toca las palabras en orden para llenar los espacios.' },
  { id:'error',    et:'🔍 Caza el error', ayuda:'Una palabra fue cambiada. Tócala.' },
  { id:'cita',     et:'📖 ¿De dónde es?', ayuda:'Lee el texto y di de dónde sale.' },
];

let jgModo='tarjetas', jgR=null, jgSel=null, jgN=0, jgBien=0, jgMal=0;

/* ───────── el estado de «Practicar» es de la CATEGORIA, no de la ficha ─────────
   MECANISMO
   El mazo, el filtro y la ronda del juego se arman con el material de la
   categoria activa, pero viven en variables sueltas de pantalla. `pintaTarjetas`
   repinta la ronda que YA existe (`if(!jgR)nuevaRonda(); else pintaJuego()`),
   asi que si la categoria cambia y nadie borra `jgR`, al volver a Practicar
   sale la ronda de la categoria anterior. Con el filtro pasa lo mismo y se ve
   peor: queda apuntando a un capitulo que en la categoria nueva no existe
   (`d1` en las creencias) y el mazo sale en cero, que parece la app dañada.

   MEDIDO: entrar a Practicar en Aventureros, escoger Quiz, cambiar a
   creencias y volver: la misma pregunta de Daniel. Y con el filtro en «Daniel
   1», mazo de 27 antes y 0 despues.

   DECISION
   Un solo punto de reinicio, y lo llaman TODOS los caminos que cambian el
   material: cambiar de categoria, cambiar de persona, terminar la bienvenida
   y adoptar la ficha del servidor. Cuatro reinicios distintos, cada uno con
   su propio subconjunto de variables, es como nacio el defecto. */
function reiniciaPractica(){
  mazo=[];tjI=0;tjVolteada=false;tjFiltro='hoy';tjSabidas=new Set();
  jgR=null;jgSel=null;jgN=0;jgBien=0;jgMal=0;
}

/* Repinta Practicar solo si es la pantalla que esta a la vista. Los caminos
   que aterrizan en Inicio no la necesitan; el que sincroniza contra el
   servidor si, porque no navega. */
function refrescaPracticaSiVisible(){
  try{
    const p=document.getElementById('p-tarjetas');
    if(p&&p.classList.contains('on'))pintaTarjetas();
  }catch(e){}
}

/* Los grupos disponibles en la actividad actual. Si ningun capitulo declara
   `doc`, no hay grupos y el juego de clasificar ni se ofrece. */
function gruposDe(){
  const cs=capsDe();
  if(!cs.some(c=>c.doc))return [];
  return (typeof GRUPOS!=='undefined'?GRUPOS:[]).filter(g=>cs.some(c=>c.doc===g.id));
}
const grupoDe=c=>(typeof GRUPOS!=='undefined'?GRUPOS:[]).find(g=>g.id===c.doc)||null;

/* Las preguntas de completar de la actividad actual sirven de insumo al juego
   del banco de palabras: la misma pregunta del examen, sin teclado. */
const fillsDe=()=>poolDe().filter(q=>q.t==='fill'&&(q.p||[]).some(x=>x.b));
/* Los modos nuevos no traen material propio: salen del banco que ya existe.
   Asi cualquier actividad los hereda, y crecen cuando crece el banco. */
const mcsDe=()=>poolDe().filter(q=>q.t==='mc'&&(q.o||[]).length>=3);
const tfsDe=()=>poolDe().filter(q=>q.t==='tf');
/* Para «¿de donde es?» sirve la pregunta de completar cuyo rotulo nombra la
   fuente («Daniel 1:20 (RV1995) — Completa:»): el texto es la frase armada y
   la respuesta es ese rotulo, limpio. */
const REF_INS=/^([^—]+?)\s*(?:\([^)]*\))?\s*—/;
const citasDe=()=>fillsDe().filter(q=>REF_INS.test(q.ins||''));
const refDe=q=>((q.ins||'').match(REF_INS)||[])[1].trim();
const fraseDe=q=>q.p.map(x=>x.b||x.x).join('');

/* Un modo se ofrece solo si tiene con que. Un boton que abre una ronda vacia
   es el mismo defecto del panel: parece que la app se trabo. */
function juegosDisponibles(){
  return JUEGOS.filter(j=>{
    if(j.id==='tarjetas')return true;
    if(j.id==='clasif')return gruposDe().length>1;
    if(j.id==='banco')return fillsDe().length>0;
    if(j.id==='error')return fillsDe().filter(q=>q.p.filter(x=>x.b).length>=2).length>0;
    if(j.id==='quiz')return mcsDe().length>=4;
    if(j.id==='vf')return tfsDe().length>=4;
    if(j.id==='cita')return citasDe().length>=4;
    return capsDe().length>=4;   // parear y ordenar
  });
}

function pintaModosJuego(){
  const z=document.getElementById('jg-modos');
  if(!z)return;
  const disp=juegosDisponibles();
  if(!disp.some(j=>j.id===jgModo))jgModo='tarjetas';
  z.innerHTML=disp.map(j=>'<button class="jg-m'+(j.id===jgModo?' on':'')+
    '" onclick="ponJuego(\''+j.id+'\')">'+j.et+'</button>').join('');
  const esTj=jgModo==='tarjetas';
  document.querySelector('.tj-zona').hidden=!esTj;
  const jz=document.getElementById('jg-zona');
  jz.hidden=esTj;
  const ay=document.getElementById('jg-ayuda');
  if(ay)ay.textContent=(disp.find(j=>j.id===jgModo)||{}).ayuda||'';
}

function ponJuego(id){
  jgModo=id;
  if(id!=='tarjetas')nuevaRonda();
  pintaModosJuego();
  /* Volver a Tarjetas con el mazo vacio mostraba «No hay tarjetas para este
     filtro», que es mentira: el mazo estaba vacio porque se reinicio al
     cambiar de material, no porque no haya tarjetas. Se baraja, igual que
     hace `pintaTarjetas`. */
  if(id==='tarjetas'){ if(!mazo.length)tjBaraja(); else muestraTj(); }
}

/* Cada ronda es corta a proposito: seis pasos se terminan en un minuto y
   medio, que es el tiempo que alguien de verdad le dedica en el bus. */
const PASOS_RONDA=6;

function nuevaRonda(){
  jgSel=null;jgN=0;jgBien=0;jgMal=0;
  const cs=mezcla(capsDe().slice());
  if(jgModo==='parear'){
    const sel=cs.slice(0,5);
    jgR={tipo:'parear',izq:sel,der:mezcla(sel.slice()),listos:[],total:sel.length};
  } else if(jgModo==='clasif'){
    jgR={tipo:'clasif',items:cs.slice(0,PASOS_RONDA),grupos:gruposDe(),i:0,total:Math.min(PASOS_RONDA,cs.length)};
  } else if(jgModo==='ordenar'){
    const sel=cs.slice(0,5);
    const bien=sel.slice().sort((a,b)=>ordenCap(a)-ordenCap(b));
    jgR={tipo:'ordenar',bien:bien,pool:mezcla(sel.slice()),puestos:[],total:bien.length};
  } else if(jgModo==='quiz'){
    const qs=mezcla(mcsDe().slice()).slice(0,PASOS_RONDA).map(q=>barajaOpciones({...q}));
    jgR={tipo:'quiz',qs:qs,i:0,elegida:null,total:qs.length};
  } else if(jgModo==='vf'){
    const qs=mezcla(tfsDe().slice()).slice(0,PASOS_RONDA);
    jgR={tipo:'vf',qs:qs,i:0,elegida:null,total:qs.length};
  } else if(jgModo==='error'){
    /* Se arma una frase con TODAS sus palabras puestas menos una, que se
       cambia por un señuelo sacado de otra pregunta. Es el ejercicio que mas
       se parece a lo que pide un examen de texto literal: no completar, sino
       notar que una palabra no es la que va. */
    /* Solo frases con DOS o mas palabras tapadas. Con una sola, la palabra
       cambiada es la unica que se puede tocar: no hay nada que cazar, y
       acertar no prueba nada. Medido en la matutina, donde varios versiculos
       son de una linea. */
    const pasos=mezcla(fillsDe().filter(q=>q.p.filter(x=>x.b).length>=2).slice())
      .slice(0,PASOS_RONDA).map(q=>{
      const huecos=q.p.map((x,i)=>({i:i,b:x.b})).filter(x=>x.b);
      const cual=huecos[Math.floor(Math.random()*huecos.length)];
      const otras=mezcla(fillsDe().flatMap(f=>f.p).filter(x=>x.b&&x.b!==cual.b).map(x=>x.b));
      return {q:q,malo:cual.i,puesto:otras[0]||cual.b,correcta:cual.b};
    }).filter(x=>x.puesto!==x.correcta);
    jgR={tipo:'error',pasos:pasos,i:0,elegida:null,total:pasos.length};
  } else if(jgModo==='cita'){
    const base=mezcla(citasDe().slice()).slice(0,PASOS_RONDA);
    const pasos=base.map(q=>{
      const otras=mezcla(citasDe().filter(x=>refDe(x)!==refDe(q)).map(refDe))
        .filter((v,i,a)=>a.indexOf(v)===i).slice(0,3);
      return {texto:fraseDe(q),ops:mezcla([refDe(q)].concat(otras)),bien:refDe(q)};
    }).filter(p=>p.ops.length>=2);
    jgR={tipo:'cita',pasos:pasos,i:0,elegida:null,total:pasos.length};
  } else if(jgModo==='banco'){
    /* Varias frases por ronda, no una. Con una sola la ronda se acababa en
       tres toques y no alcanzaba a ser practica: era una pregunta suelta.
       Se toman hasta cuatro y se encadenan, y la bolsa de palabras es comun a
       todas, asi que los señuelos de una frase son las respuestas de otra. */
    const disp=mezcla(fillsDe().slice()).slice(0,4);
    const frases=disp.map(q=>({q:q,huecos:q.p.map((x,i)=>({i:i,b:x.b})).filter(x=>x.b),puestas:{}}))
      .filter(f=>f.huecos.length);
    const todas=frases.flatMap(f=>f.huecos.map(h=>h.b));
    const señuelos=mezcla(fillsDe().flatMap(f=>f.p).filter(x=>x.b&&todas.indexOf(x.b)<0)
      .map(x=>x.b)).slice(0,3);
    jgR={tipo:'banco',frases:frases,i:0,
         bolsa:mezcla(todas.concat(señuelos)),
         total:frases.reduce((n,f)=>n+f.huecos.length,0)};
  }
  pintaJuego();
}

/* El orden natural de un capitulo. Se saca del id (cr07 -> 7, d12 -> 12): no
   hace falta un campo nuevo ni mantener una lista aparte. */
function ordenCap(c){
  const m=String(c.id).match(/(\d+)/);
  return m?Number(m[1]):0;
}

function pintaJuego(){
  const z=document.getElementById('jg-zona');
  if(!z||!jgR)return;
  const PASO_A_PASO=['quiz','vf','error','cita'];
  const hechos=jgR.tipo==='parear'?jgR.listos.length
    :jgR.tipo==='clasif'?jgR.i
    :jgR.tipo==='ordenar'?jgR.puestos.length
    :PASO_A_PASO.indexOf(jgR.tipo)>=0?jgR.i
    :jgR.frases.reduce((n,f)=>n+Object.keys(f.puestas).length,0);
  const pct=Math.round(hechos/jgR.total*100);
  let h='<div class="prog-lin"><div style="width:'+pct+'%"></div></div>';

  if(hechos>=jgR.total){
    const nota=jgMal===0?'🎉 Perfecto':jgBien>=jgMal?'👍 Bien':'🔁 A repasar';
    h+='<div class="jg-fin"><div class="jg-fin-t">'+nota+'</div>'+
       '<div class="jg-fin-s">'+jgBien+' a la primera · '+jgMal+' con error</div>'+
       '<button class="btn azul" onclick="nuevaRonda()">🔀 Otra ronda</button></div>';
    z.innerHTML=h;return;
  }

  if(jgR.tipo==='quiz'||jgR.tipo==='vf'){
    const q=jgR.qs[jgR.i];
    const resuelto=jgR.elegida!==null;
    h+='<div class="jg-preg">'+esc(q.q)+'</div>';
    if(jgR.tipo==='quiz'){
      h+='<div class="jg-gr col">'+q.o.map((o,i)=>{
        let c='jg-g';
        if(resuelto){ if(i===q.a)c+=' ok'; else if(i===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+i+')">'+esc(o)+'</button>';
      }).join('')+'</div>';
    } else {
      const bt=(v,et)=>{
        let c='jg-g';
        if(resuelto){ if(v===q.a)c+=' ok'; else if(v===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+v+')">'+et+'</button>';
      };
      h+='<div class="jg-gr">'+bt(true,'✅ Verdadero')+bt(false,'❌ Falso')+'</div>';
    }
    if(resuelto)h+=avisoPaso(jgR.tipo==='quiz'?jgR.elegida===q.a:jgR.elegida===q.a, q.e||'');
  } else if(jgR.tipo==='error'){
    const p=jgR.pasos[jgR.i], resuelto=jgR.elegida!==null;
    h+='<div class="jg-ins">'+esc(p.q.ins||'')+'</div><div class="jg-frase">'+
      p.q.p.map((x,i)=>{
        if(!x.b)return '<span>'+esc(x.x)+'</span>';
        const txt=i===p.malo?p.puesto:x.b;
        let c='jg-w';
        if(resuelto){ if(i===p.malo)c+=' ok'; else if(i===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+i+')">'+esc(txt)+'</button>';
      }).join('')+'</div>';
    if(resuelto)h+=avisoPaso(jgR.elegida===p.malo,
      'La palabra cambiada era «'+p.puesto+'». Va «'+p.correcta+'».');
  } else if(jgR.tipo==='cita'){
    const p=jgR.pasos[jgR.i], resuelto=jgR.elegida!==null;
    h+='<div class="jg-frase">'+esc(p.texto)+'</div>'+
      '<div class="jg-gr col">'+p.ops.map((o,i)=>{
        let c='jg-g';
        if(resuelto){ if(o===p.bien)c+=' ok'; else if(i===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+i+')">'+esc(o)+'</button>';
      }).join('')+'</div>';
    if(resuelto)h+=avisoPaso(p.ops[jgR.elegida]===p.bien,'Es '+p.bien+'.');
  } else if(jgR.tipo==='parear'){
    h+='<div class="jg-par">'+
      '<div class="jg-col">'+jgR.izq.map((c,i)=>btnPar('i',i,c.label,c)).join('')+'</div>'+
      '<div class="jg-col">'+jgR.der.map((c,i)=>btnPar('d',i,c.sub,c)).join('')+'</div></div>';
  } else if(jgR.tipo==='clasif'){
    const c=jgR.items[jgR.i];
    h+='<div class="jg-carta">'+esc(c.label)+'<b>'+esc(c.sub)+'</b></div>'+
       '<div class="jg-gr col">'+jgR.grupos.map(g=>
         '<button class="jg-g" style="--c:'+g.color+'" onclick="jgClasif(\''+g.id+'\')">'+
         (g.icono||'')+' '+esc(g.nombre)+'</button>').join('')+'</div>';
  } else if(jgR.tipo==='ordenar'){
    h+='<div class="jg-fila">'+jgR.puestos.map((c,i)=>
        '<span class="jg-p ok">'+(i+1)+'. '+esc(c.sub)+'</span>').join('')+'</div>'+
       '<div class="jg-gr col">'+jgR.pool.map((c,i)=>
        jgR.puestos.includes(c)?'':'<button class="jg-g" onclick="jgOrden('+i+')">'+
        esc(c.label)+' — '+esc(c.sub)+'</button>').join('')+'</div>';
  } else {
    const usadas=jgR.frases.flatMap(f=>Object.values(f.puestas));
    h+=jgR.frases.map((f,n)=>{
      const lista=n===jgR.i?' activa':(Object.keys(f.puestas).length>=f.huecos.length?' lista':'');
      return '<div class="jg-ins">'+esc(f.q.ins||'')+'</div>'+
        '<div class="jg-frase'+lista+'">'+f.q.p.map((x,i)=>x.b
          ? '<span class="jg-h'+(f.puestas[i]?' ok':'')+'">'+esc(f.puestas[i]||'______')+'</span>'
          : '<span>'+esc(x.x)+'</span>').join('')+'</div>';
    }).join('')+
      '<div class="jg-gr banco">'+jgR.bolsa.map((w,i)=>{
        let quedan=jgR.bolsa.filter(x=>x===w).length-usadas.filter(x=>x===w).length;
        if(quedan<=0)return '';
        if(jgR.bolsa.indexOf(w)!==i)return '';
        return '<button class="jg-g" onclick="jgBanco('+i+')">'+esc(w)+
          (quedan>1?' <small>×'+quedan+'</small>':'')+'</button>';
      }).join('')+'</div>';
  }
  h+='<p class="nota" style="text-align:center">'+jgBien+' bien · '+jgMal+' con error</p>';
  z.innerHTML=h;
}

/* El aviso sale DESPUES de responder, nunca antes: si la explicacion esta en
   pantalla mientras se decide, se lee en vez de pensarse. Y el boton de seguir
   va aqui abajo, donde quedo el dedo. */
function avisoPaso(bien,texto){
  return '<div class="jg-fb '+(bien?'ok':'ko')+'">'+
    '<b>'+(bien?'✅ Correcto':'❌ No era')+'</b>'+(texto?'<br>'+esc(texto):'')+'</div>'+
    '<div class="jg-gr"><button class="btn azul" onclick="jgSigue()">Siguiente →</button></div>';
}

/* Los cuatro modos paso a paso comparten el mismo mecanismo: se elige, se
   marca bien o mal UNA sola vez, y se avanza a mano. Una sola funcion para
   los cuatro; si cada uno trajera la suya, en el tercero ya habria tres
   maneras distintas de contar un acierto. */
function jgPaso(v){
  if(!jgR||jgR.elegida!==null)return;
  jgR.elegida=v;
  let bien=false;
  if(jgR.tipo==='quiz')      bien=(v===jgR.qs[jgR.i].a);
  else if(jgR.tipo==='vf')   bien=(v===jgR.qs[jgR.i].a);
  else if(jgR.tipo==='error')bien=(v===jgR.pasos[jgR.i].malo);
  else if(jgR.tipo==='cita') bien=(jgR.pasos[jgR.i].ops[v]===jgR.pasos[jgR.i].bien);
  if(bien)jgBien++;else jgMal++;
  pintaJuego();
}

function jgSigue(){
  if(!jgR)return;
  jgR.i++;jgR.elegida=null;
  pintaJuego();
  if(jgR.i>=jgR.total)cierraRonda();
}

function btnPar(lado,i,txt,c){
  const hecho=jgR.listos.includes(c.id);
  const sel=jgSel&&jgSel.lado===lado&&jgSel.i===i;
  return '<button class="jg-g'+(hecho?' ok':'')+(sel?' sel':'')+'"'+(hecho?' disabled':'')+
    ' onclick="jgPar(\''+lado+'\','+i+')">'+esc(txt)+'</button>';
}

function jgPar(lado,i){
  if(!jgR)return;
  if(!jgSel||jgSel.lado===lado){jgSel={lado:lado,i:i};pintaJuego();return;}
  const a=jgSel.lado==='i'?jgR.izq[jgSel.i]:jgR.der[jgSel.i];
  const b=lado==='i'?jgR.izq[i]:jgR.der[i];
  if(a.id===b.id){jgR.listos.push(a.id);jgBien++;}else{jgMal++;}
  jgSel=null;pintaJuego();
  if(jgR.listos.length>=jgR.total)cierraRonda();
}

function jgClasif(gid){
  if(!jgR)return;
  const c=jgR.items[jgR.i];
  if(c.doc===gid)jgBien++;else jgMal++;
  jgR.i++;pintaJuego();
  if(jgR.i>=jgR.total)cierraRonda();
}

function jgOrden(i){
  if(!jgR)return;
  const c=jgR.pool[i];
  const toca=jgR.bien[jgR.puestos.length];
  if(toca&&toca.id===c.id){jgR.puestos.push(c);jgBien++;}else{jgMal++;}
  pintaJuego();
  if(jgR.puestos.length>=jgR.total)cierraRonda();
}

function jgBanco(i){
  if(!jgR)return;
  const w=jgR.bolsa[i];
  /* Se llena la frase en curso; cuando queda completa se pasa a la siguiente.
     Asi el orden de las palabras dentro de cada frase sigue importando. */
  let f=jgR.frases[jgR.i];
  while(f&&Object.keys(f.puestas).length>=f.huecos.length){jgR.i++;f=jgR.frases[jgR.i];}
  if(!f)return;
  const hueco=f.huecos.find(h=>!f.puestas[h.i]);
  if(!hueco)return;
  if(igual(w,hueco.b)){f.puestas[hueco.i]=w;jgBien++;}else{jgMal++;}
  if(Object.keys(f.puestas).length>=f.huecos.length&&jgR.i<jgR.frases.length-1)jgR.i++;
  pintaJuego();
  const hechos=jgR.frases.reduce((n,x)=>n+Object.keys(x.puestas).length,0);
  if(hechos>=jgR.total)cierraRonda();
}

/* Terminar una ronda cuenta como haber estudiado hoy: es la misma racha de
   las tarjetas y del examen, no un contador nuevo. Un solo concepto, un solo
   mecanismo. */
function cierraRonda(){ sumaRacha(); }

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

/* ───────── la fuente que el reglamento nombra ─────────
   MECANISMO
   El reglamento le pone a cada actividad UNA fuente: Conexion Biblica se
   examina del libro de Daniel, la matutina del cuadernillo de octubre, y las
   creencias de la cartilla «En esto creemos». El material de estudio va mas
   alla de eso a proposito, porque es lo que hace entender: Profetas y Reyes
   comenta el relato, y el libro de 434 paginas explica cada creencia. Pero el
   examen tiene que medir lo que les pidieron aprender.

   DE DONDE SALE EL DATO, sin clasificar 1.378 preguntas a mano
   - Profetas y Reyes ya se distingue por el id del capitulo: `pr`. Es un
     hecho de la estructura, no una etiqueta que alguien pueda olvidar poner.
   - En las creencias solo el generador sabe de donde vino cada pregunta, asi
     que las escribe con `f:'c'`: son las 56 de verdadero y falso, que salen
     de editorial.py (el libro), contra las 215 que salen de datos.py (la
     cartilla).
   - La matutina no tiene material complementario: sus 269 preguntas salen de
     las dos tablas del cuadernillo publicado.

   SIN MARCA = OFICIAL, y es la falla segura. Una pregunta nueva de Daniel que
   nadie marque cuenta como oficial, que es lo que es. Al reves, una pregunta
   nueva desapareceria del examen sin que nadie lo note. */
/* COMPLEMENTARIA = la que NO sale de la fuente que el reglamento nombra.
   Profetas y Reyes estuvo aqui por el id del capitulo y estaba mal: el
   reglamento de la Asociacion manda leer P&R 39, 41 y 44 junto con Daniel,
   asi que es material del reglamento y entra al examen. Camilo lo confirmo
   contra las reglas del campamento (2026-09-21). Queda solo la marca del
   generador, `f:'c'`, que distingue la cartilla de las creencias del libro:
   ahi la separacion si existe, y con ella el interruptor sigue teniendo
   sentido en «En esto creemos» y desaparece solo en Conexion Biblica, porque
   pintaMenuEx() ya solo lo ofrece donde cambia algo. */
const esComplementaria=q=>q.f==='c';
/* Lo escoge el usuario y vive en el aparato, como `alcance` y `nivel`. */
let soloFuente=false;

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
  const r=rangoDe(alcance);
  if(r)return b.filter(q=>enRango(q.cap,r));
  return b.filter(q=>q.cap===alcance);
}

/* ───────── un rango de material: «del dia 5 al 12» ─────────
   POR QUE EXISTE
   A veces se reparten el material: una estudia del 1 al 10 y otra del 11 al
   20, y cada una presenta lo suyo. Con «primera quincena» y «segunda
   quincena», que eran los dos unicos tramos posibles, eso no se podia pedir.

   UN SOLO MECANISMO PARA LAS TRES ACTIVIDADES
   El rango no sabe que existe la matutina: se escribe `desde..hasta` con dos
   ids del MISMO tipo, y compara el numero que ya traen los ids. Asi `m05..m12`
   son los dias 5 al 12, `d1..d3` es Daniel 1 al 3 y `cr10..cr20` son las
   creencias 10 a la 20, sin una linea por actividad. Un rango que mezcle tipos
   (`m05..d3`) no es un rango y no filtra nada.

   La forma tiene que caber en 20 caracteres, que es lo que el servidor guarda
   en la columna `alcance`: `cr10..cr20` son 10. */
const PARTE_ID=/^([a-z]+)(\d+)$/;
function rangoDe(alc){
  const p=String(alc||'').split('..');
  if(p.length!==2)return null;
  const a=PARTE_ID.exec(p[0]),b=PARTE_ID.exec(p[1]);
  if(!a||!b||a[1]!==b[1])return null;
  const n1=Number(a[2]),n2=Number(b[2]);
  if(n1>n2)return null;
  return {pre:a[1],a:n1,b:n2};
}
function enRango(cap,r){
  const m=PARTE_ID.exec(String(cap||''));
  return !!m&&m[1]===r.pre&&Number(m[2])>=r.a&&Number(m[2])<=r.b;
}
/* El rango en palabras, con los nombres que la persona ve en pantalla. */
function textoRango(r){
  const de=CAPS.find(c=>enRango(c.id,{pre:r.pre,a:r.a,b:r.a}));
  const a=CAPS.find(c=>enRango(c.id,{pre:r.pre,a:r.b,b:r.b}));
  if(!de||!a)return 'Un rango del material';
  return de.id===a.id?('Solo '+de.label):('De '+de.label+' a '+a.label);
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
  /* El filtro de fuente va ANTES del de nivel: si fuera al reves, el rescate
     de «si el nivel deja muy pocas, usa todas» devolveria preguntas
     complementarias en un examen que pidio solo la fuente oficial. */
  if(soloFuente)b=b.filter(q=>!esComplementaria(q));
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
  /* UN TRAMO DEL MATERIAL, tambien aqui. Si el club se reparte el estudio («tu
     del 1 al 10, yo del 11 al 20»), practicar todo el material es gastar
     turnos en dias que no le tocan. Los extremos son los capitulos de SU
     categoria: un rango que salga de ahi no existe para ella. */
  const hayRango=capsEx.length>=3;
  sa.innerHTML='<option value="todo">Todo mi material</option>'+grupos+
    capsEx.map(c=>'<option value="'+c.id+'">'+esc(c.label)+' — '+esc(c.sub)+'</option>').join('')+
    (hayRango?'<option value="rango">Un tramo: de un capítulo a otro</option>':'');
    /* El alcance vive en el aparato y sobrevive al cambio de categoría. «q1» de
     la matutina, o «creencias» de padres, no existen en Aventureros: si no se
     revalida, el examen queda en CERO preguntas y el desplegable muestra un
     valor que no está en la lista. Se valida contra los grupos que esta
     categoría tiene de verdad, no contra una lista fija. */
  const rPrev=rangoDe(prev);
  if(!rPrev&&!capsEx.some(c=>c.id===prev)&&!['todo'].concat(disp.map(g=>g[0])).includes(prev))alcance='todo';
  /* Un rango guardado de OTRA categoría no sirve aquí: «del día 5 al 12» no
     existe en Aventureros. Se valida contra los capítulos que esta categoría
     tiene de verdad, igual que los grupos. */
  if(rPrev&&!capsEx.some(c=>enRango(c.id,rPrev)))alcance='todo';
  pintaRangoEx(capsEx,hayRango);
  sa.value=rangoDe(alcance)?'rango':alcance;

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
  /* Cuantas no ha visto nunca. Sin este renglon el «no se repiten» es una
     promesa invisible: se ve igual que antes y toca creerlo. */
  /* El interruptor de fuente solo se ofrece donde CAMBIA algo: en la matutina
     todo el material es el cuadernillo, asi que prenderlo no quitaria ni una
     pregunta y seria un control que no hace nada. */
  const zf=document.getElementById('ex-fuente-lb');
  const ch=document.getElementById('ex-fuente');
  if(zf&&ch){
    const hayComp=bancoDe().some(esComplementaria);
    zf.hidden=!hayComp;
    if(!hayComp&&soloFuente)soloFuente=false;
    ch.checked=soloFuente;
    const t=document.getElementById('ex-fuente-t');
    if(t)t.textContent=FUENTE_TXT[ACT_DE(S.cat)]||'';
  }
  const nv2=nuevasDe();
  const frescura=nv2>0
    ? 'De esas, <strong>'+nv2+'</strong> nunca te han salido, y son las que entran primero.'
    : 'Ya te salieron todas alguna vez: ahora entran primero las que fallaste.';
  document.getElementById('ex-disponible').innerHTML=
    'Disponibles con esta selección: <strong>'+t+'</strong> preguntas ('+porTipo+').'+
    (t<cuantas?' <span style="color:var(--rojo)">Se usarán todas.</span>':'')+
    '<br>'+frescura+
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

/* ───────── los dos extremos del tramo, en practicar ─────────
   MECANISMO
   Un rango solo existe entre capítulos del MISMO tipo: «de Daniel 1 a P&R 44»
   no es un tramo de nada y dejaría el examen en cero. En vez de dejar armar el
   disparate y después avisar, el desplegable «Hasta» solo ofrece lo que sí
   forma un tramo con lo que diga «Desde»: mismo tipo y de ahí en adelante.
   Así no hay estado inválido que validar, porque no se puede escoger. */
const familiaDe=id=>((PARTE_ID.exec(String(id||''))||[])[1])||'';
const numDe=id=>Number((PARTE_ID.exec(String(id||''))||[])[2]||0);

function pintaRangoEx(capsEx,hayRango){
  const l1=document.getElementById('ex-r1-lb'),l2=document.getElementById('ex-r2-lb');
  const s1=document.getElementById('ex-r1'),s2=document.getElementById('ex-r2');
  if(!s1||!s2||!l1||!l2)return;
  const r=rangoDe(alcance);
  const abierto=hayRango&&!!r;
  l1.hidden=!abierto;l2.hidden=!abierto;
  if(!abierto)return;
  const de=capsEx.find(c=>enRango(c.id,{pre:r.pre,a:r.a,b:r.a}));
  const a=capsEx.find(c=>enRango(c.id,{pre:r.pre,a:r.b,b:r.b}));
  s1.innerHTML=capsEx.map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s1.value=de?de.id:capsEx[0].id;
  const desde=s1.value;
  s2.innerHTML=capsEx.filter(c=>familiaDe(c.id)===familiaDe(desde)&&numDe(c.id)>=numDe(desde))
    .map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s2.value=a?a.id:s2.value;
}

/* Al escoger «Un tramo» todavía no hay extremos: se arranca con el material
   completo de la PRIMERA familia (todo Daniel, o todos los días, o todas las
   creencias), que siempre es un rango válido, y desde ahí se ajusta. Arrancar
   con «del primero al último» a secas daba «d1..pr44», que no es un rango. */
function cambiaAlcance(){
  const v=document.getElementById('ex-alcance').value;
  if(v==='rango'){
    const cs=capsDe().filter(c=>!soloEstudio(c,S.cat));
    const fam=cs.length?familiaDe(cs[0].id):'';
    const mismos=cs.filter(c=>familiaDe(c.id)===fam);
    alcance=mismos.length?(mismos[0].id+'..'+mismos[mismos.length-1].id):'todo';
  } else alcance=v;
  refrescaEx();
}

/* Cambiar «Desde» puede dejar «Hasta» atrás o en otra familia; se corrige
   solo con el primero que sí sirve, y pintaRangoEx vuelve a armar la lista. */
function cambiaRango(){
  const cs=capsDe().filter(c=>!soloEstudio(c,S.cat));
  const a=(document.getElementById('ex-r1')||{}).value||'';
  let b=(document.getElementById('ex-r2')||{}).value||'';
  if(!rangoDe(a+'..'+b)){
    const ult=cs.filter(c=>familiaDe(c.id)===familiaDe(a)&&numDe(c.id)>=numDe(a));
    b=ult.length?ult[ult.length-1].id:a;
  }
  if(rangoDe(a+'..'+b))alcance=a+'..'+b;
  refrescaEx();
}

function cambiaFuente(){
  soloFuente=!!document.getElementById('ex-fuente').checked;
  refrescaEx();
}

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
  /* Este renglon decia «nunca sale el mismo dos veces», y era falso: el sorteo
     no tenia memoria y repetia. Ahora si hay memoria, y el texto dice lo que
     de verdad hace, con la cifra de esta ficha. */
  const nuevas=nuevasDe();
  document.getElementById('ex-nota').textContent=
    'Tu categoría tiene '+b+' preguntas en total. '+
    (nuevas>0
      ? 'Te quedan '+nuevas+' que nunca te han salido, y el examen las escoge primero.'
      : 'Ya te salieron todas alguna vez; ahora el examen escoge primero las que fallaste.')+
    ' Reparto: '+textoReparto()+'.';
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

/* ───────── que no salgan las mismas preguntas la proxima vez ─────────
   MECANISMO
   `armar` sorteaba con Math.random sobre todo el pool, sin memoria. Con 86
   preguntas disponibles y examenes de 15, dos examenes seguidos repetian tres,
   y para ver el banco entero habia que hacer unas 29 corridas, porque el
   sorteo volvia a meter lo ya visto. MEDIDO, no estimado.

   `qv` arregla eso: cuenta cuantas veces le salio cada pregunta a ESTA ficha.
   El sorteo sigue siendo al azar, pero por tandas:
     0. las que nunca le han salido
     1. las vistas que ademas fallo (`fq`)
     2. las vistas que acerto
   Dentro de cada tanda se baraja, y entre vistas sale primero la que menos
   veces ha salido. Se acaban las nuevas, empieza por lo fallado: el repaso
   entra solo, sin que nadie escoja nada.

   POR QUE NO APLICA EN LA EVALUACION
   La evaluacion del director tiene que ser IDENTICA para todas: se arma con
   una semilla del servidor. Si el orden dependiera del historial de cada
   aparato, dos participantes de la misma categoria recibirian examenes
   distintos con la misma semilla, y el director estaria comparando notas de
   examenes que no son el mismo. Por eso esto se activa solo cuando el azar es
   `Math.random`, que es justo el caso de practicar. */
const vecesVista=q=>(S.qv||{})[claveQ(q)]||0;
const tandaDe=q=>{
  if(!vecesVista(q))return 0;
  return ((S.fq[claveQ(q)]||{}).m>0)?1:2;
};
/* Baraja primero y despues ordena por tanda: asi el orden dentro de la tanda
   sigue siendo azar, y no el orden en que estan escritas en el banco. */
const porFrescura=lista=>mezclaR(lista,rndEx)
  .map((q,i)=>({q,i}))
  .sort((a,b)=>(tandaDe(a.q)-tandaDe(b.q))||(vecesVista(a.q)-vecesVista(b.q))||(a.i-b.i))
  .map(x=>x.q);

/* Cuantas preguntas de la seleccion actual no le han salido nunca. Es lo que
   el menu del examen muestra, para que se vea que el banco no se esta
   repitiendo solo. */
const nuevasDe=()=>poolNivel().filter(q=>!vecesVista(q)).length;

/* Se marca cuando el examen SE PONE EN PANTALLA, no cuando se arma: armar()
   tambien corre para generar los impresos de todas las categorias, y eso no
   es una pregunta que a nadie le haya salido. */
function marcaVistas(sel){
  if(!S.qv)S.qv={};
  for(const q of sel){
    const k=claveQ(q);
    S.qv[k]=Math.min(99,(S.qv[k]||0)+1);
  }
  guardar();
}

function armar(m){
  if(m==='errores'){
    const sel=mezcla(falladasDe()).slice(0,NPREG());
    return sel.map((q,i)=>barajaOpciones({...q,id:'q'+i}));
  }
  const b=poolNivel();
  const n=Math.min(cuantas||NPREG(),b.length);
  /* Practicar prefiere lo que no ha visto; la evaluacion con semilla, no. */
  const orden=rndEx===Math.random?porFrescura:(l=>mezclaR(l,rndEx));
  const mc=orden(b.filter(q=>q.t==='mc'));
  const tf=orden(b.filter(q=>q.t==='tf'));
  const fl=orden(b.filter(q=>q.t==='fill'));
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
  marcaVistas(prueba);
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
  const rangoAct=rangoDe(alcance);
  const alc=modo==='errores'?'mis errores'
    :rangoAct?textoRango(rangoAct)
    :(NA[alcance]||(buscaItem(alcance)||{}).label||'');
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
  srvIntento(modo,modo==='evaluacion'&&evalActual?evalActual.id:null,pts,tot,respuestasDe(prueba));
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

/* Salir de un examen en curso sin entregarlo. No hace falta avisarle al
   servidor: nada queda guardado hasta «Entregar», así que cancelar es tan
   simple como volver al inicio. Antes la única forma de salir de una
   evaluación de prueba era refrescar la página entera. */
function cancelaExamen(){
  clearInterval(reloj);
  reinicia();
}

function reinicia(){
  clearInterval(reloj);
  entregado=false;resp={};prueba=[];evalActual=null;
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

async function borrarTodo(){
  if(!await preguntaApp('¿Borrar todo lo de este navegador?',
    'Se borra el progreso de TODOS los participantes de este aparato.','Borrar todo',true))return;
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
  const r=rangoDe(alcance);
  if(r)return textoRango(r);
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

/* TODAS las categorías en un solo documento, cada una en su hoja. Cambia la
   categoría activa, arma, y la devuelve como estaba: el progreso guardado no
   se toca porque armar() solo lee.
   Decía «las seis» en el botón y en el título: son ocho desde que «En esto
   creemos» trajo ec1 y ec2. El bucle siempre recorrió Object.keys(CATS), así
   que el número estaba solo en el texto, que es donde envejece sin avisar. */
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
  const t=conR?'Claves de todas las categorías':'Exámenes de todas las categorías';
  imprimeDoc(docExamen(hojas,t,hojas.length+' exámenes, uno por categoría, cada uno en su hoja.'+
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
  const prev={a:alcance,n:nivel,q:cuantas,f:soloFuente,r:retiradas};
  let sel=[];
  try{
    /* EL NIVEL TIENE QUE SER DETERMINISTA.
       nivelEfectivo() es `nivel || nivelRecomendado()`, y nivelRecomendado()
       mira el historial LOCAL. Con nivel 0 en la receta, dos niñas de la misma
       categoría y distinto desempeño recibían pools distintos: el director
       comparaba notas de exámenes que no eran el mismo. Cuando el director no
       fija nivel, se usa el techo de la categoría, que es igual para todas. */
    alcance=r.alcance||'todo';nivel=r.nivel||CAT().techo;cuantas=r.cuantas;
    soloFuente=!!r.solo_fuente;
    /* LAS RETIRADAS DE LA RECETA, NO LAS DE AHORA. La receta trae la lista tal
       como estaba cuando el director abrio la evaluacion. Si se usara la de
       ahora, retirar una pregunta a media mañana le cambiaria el examen a la
       que todavia no lo ha hecho, y dos notas de la misma semilla dejarian de
       ser comparables. */
    if(Array.isArray(r.retiradas))retiradas=new Set(r.retiradas);
    rndEx=prng(Number(r.semilla)>>>0);
    sel=armar('normal');
  }finally{
    rndEx=Math.random;alcance=prev.a;nivel=prev.n;cuantas=prev.q;soloFuente=prev.f;
    retiradas=prev.r;
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
  marcaVistas(prueba);
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
    /* La CUENTA de categorías también es una cifra, así que va como marca.
       Estaba escrita a mano en dos sitios del manual, decía «seis» y son ocho
       desde que entró «En esto creemos». Escrita a mano se desactualiza en el
       primer cambio y nadie se acuerda. */
    N_CATS:String(Object.keys(CATS).length),
    N_ACTS:String(Object.keys(ACTIVIDADES).length),
  };
}

/* Tabla de las categorías, con el conteo real de cada una. Se calcula
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
/* LAS MARCAS TAMBIEN VALEN EN EL TITULO Y EN EL SUBTITULO de cada seccion.
   Antes solo se reemplazaban en el cuerpo, asi que una cifra puesta en el
   titulo se pintaba literal, «Las {N_CATS} categorias», y eso es peor que la
   cifra escrita a mano: se ve roto. Se descubrio justo al mover «seis» a una
   marca. */
const tituloManual=(x,m)=>aplicaMarcas(x.t,m);
const subManual=(x,m)=>aplicaMarcas(x.d,m);

function pintaAyuda(){
  const m=marcasManual();
  const lista=MANUAL.filter(x=>x.para===ayGrupoAct);
  document.getElementById('ay-lista').innerHTML=lista.map(x=>
    '<details class="card ay-item"><summary>'+
    '<span class="ay-ic">'+x.icono+'</span>'+
    '<span class="ay-tx"><b>'+esc(tituloManual(x,m))+'</b><small>'+esc(subManual(x,m))+'</small></span>'+
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
      id:x.id, label:x.icono+' '+tituloManual(x,m), sub:subManual(x,m), src:'',
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

async function aplicaImport(como){
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
  if(!await preguntaApp('¿Reemplazar el progreso de '+(S.nombre||'esta ficha')+'?',
    'Queda el de '+(al.nombre||'la ficha importada')+'. Lo que hay ahora se pierde.',
    'Reemplazar',true))return;
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
  reiniciaPractica();
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
    /* El momento exacto en que el progreso deja de ser de este navegador: se
       manda lo que haya en el aparato y baja lo que ella ya tenía. */
    try{await sincronizaProgreso();}catch(e){}
    pintaSesion();await cargaEvaluacion();pintaExInicio();pintaInicio();
    if(document.getElementById('cb-panel'))await pintaPanel();
    llevaA(evalPend?'cb-eval':'cb-sesion');
  }catch(e){
    if(m)m.innerHTML='<span style="color:var(--rojo)">'+esc(e.message||'No se pudo conectar')+'</span>';
  }
}

/* ───────── entrar con un código NO renombra a quien estuviera ─────────
   MECANISMO DEL DEFECTO
   Esta función alineaba la ficha ACTIVA con lo que decía el servidor: le
   escribía encima el nombre y la categoría. Con una sola persona por aparato
   eso está bien. Con varias no: el celular de la casa tiene la ficha de Camila
   con su progreso, alguien entra con el código de Daniel, y la ficha de Camila
   pasa a llamarse Daniel CON EL PROGRESO DE CAMILA ADENTRO. Camila desaparece
   de la lista y Daniel arranca con 80% leído que no leyó.

   MEDIDO, no supuesto: ficha «Camila» con Daniel 1 al 80%, se adopta la ficha
   de Daniel, y queda una sola ficha, «Daniel», con d1=80.

   Es el MISMO defecto que ya se arregló al cambiar de actividad, y se arregla
   igual: el código identifica a una persona, así que se busca SU ficha y se
   pasa a ella, o se crea. Escribirle encima a la que estuviera solo se hace
   cuando esa no tiene nada que proteger, que es el caso de «+ Agregar». */
function adoptaFicha(d){
  if(!d)return;
  const nom=String(d.nombre||'').trim();
  const cat=(d.categoria&&CATS[d.categoria])?d.categoria:null;
  if(!nom&&!cat)return;

  /* PRIMERO POR `pid`, QUE ES LA IDENTIDAD DE VERDAD.
     Buscar por nombre funciona hasta que el nombre cambia, y desde v110 el
     director lo corrige cuando quiere. Sin esta pasada, corregir «Camila» a
     «Camila R.» dejaba la ficha vieja huerfana en el aparato y creaba una
     nueva en blanco: dos fichas de la misma nina, con caras casi iguales en
     la hoja de «¿quien estudia?».
     El `pid` no se adivina: lo manda el servidor en /yo y en /entrar, y lo
     estampa la sincronizacion. Una ficha vieja no lo tiene todavia, y por eso
     la busqueda por nombre sigue existiendo abajo como respaldo. */
  if(d.id){
    const porId=alumnos().find(([,al])=>al.pid===d.id);
    if(porId){
      if(porId[0]!==DB.activo)cambiaAlumno(porId[0]);
      let toco=false;
      if(nom&&S.nombre!==nom){S.nombre=nom;toco=true;}
      if(cat&&S.cat!==cat){S.cat=cat;toco=true;marcaCat();pintaCaps();}
      if(toco){guardar();pintaInicio();}
      return;
    }
  }

  /* ¿Ya existe la ficha de esa persona en esta actividad? Se compara por
     nombre y actividad, igual que pasaAActividad: dos fichas con el mismo
     nombre en la misma actividad es justo lo que se quiere evitar. */
  if(nom){
    const act=ACT_DE(cat||S.cat);
    const esMia=(S.nombre||'').trim().toLowerCase()===nom.toLowerCase()&&
                ACT_DE(S.cat)===act;
    if(!esMia){
      const suya=alumnos().find(([,al])=>ACT_DE(al.cat)===act&&
        (al.nombre||'').trim().toLowerCase()===nom.toLowerCase());
      if(suya){
        cambiaAlumno(suya[0]);
        /* Se le estampa el pid: la proxima vez se encuentra por id y ya no
           depende de que el nombre siga igual. */
        if(d.id&&S.pid!==d.id){S.pid=d.id;guardar();}
        if(cat&&S.cat!==cat){S.cat=cat;guardar();marcaCat();pintaCaps();pintaInicio();}
        return;
      }
      /* No existe y la de aquí tiene progreso: se crea la suya en vez de
         robarle la ficha a la otra persona. */
      if(!sinProgreso(S)){
        if(alumnos().length>=MAX_ALUMNOS){
          try{avisaApp('Este aparato ya tiene '+MAX_ALUMNOS+' fichas','Borra una para poder '+
            'entrar con otro código.');}catch(e){}
          return;
        }
        const id=nuevoId();
        DB.alumnos[id]=normalizar({pid:d.id||'',nombre:nom,cat:cat||S.cat});
        guardar();
        cambiaAlumno(id);
        return;
      }
    }
  }

  /* Queda el caso sano: es su propia ficha, o una ficha vacía que todavía no
     es de nadie. Ahí sí se escribe encima. */
  let cambio=false;
  if(d.id&&S.pid!==d.id){S.pid=d.id;cambio=true;}
  if(nom&&S.nombre!==nom){S.nombre=nom;cambio=true;}
  if(cat&&S.cat!==cat){S.cat=cat;cambio=true;}
  if(cambio){
    guardar();reiniciaPractica();
    marcaCat();pintaYo();pintaCaps();pintaInicio();refrescaPracticaSiVisible();
  }
}

async function salirCodigo(){
  try{await srvFetch('/salir',{method:'POST'});}catch(e){}
  srvYo=null;evalPend=null;evalHecha=false;pintaSesion();pintaEvaluacion();
  pintaExInicio();pintaInicio();
  if(document.getElementById('cb-panel'))await pintaPanel();
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
  /* null = no se pudo preguntar. No es lo mismo que «no hay»: con la red caída
     no se puede afirmar que falten participantes, así que el paso 3 no bloquea
     y lo dice. */
  let parts=null;
  try{parts=(await srvFetch('/panel/participantes')).participantes||[];}catch(e){parts=null;}
  const cuantasP=parts?parts.length:null;

  /* ANTES: con una evaluación abierta, este panel SOLO ofrecía cerrarla —
     "una sola forma de cerrar" — y escondía el asistente de abrir por
     completo, para que abrir y cerrar nunca se confundieran.
     CASO REAL DE CAMILO: eso le impedía tener a Guías Mayores, Aventureros y
     Devoción Matutina cada uno con SU evaluación corriendo el mismo rato,
     porque abrir la segunda escondía el control de la primera. Ahora el
     asistente (el registro y los dos pasos) SIEMPRE está a la vista, y lo que esté en curso se
     pinta aparte, en #pan-eval-en-curso (una tarjeta por evaluación abierta,
     cada una con su propio botón «Cerrar»). El servidor es quien de verdad
     evita la ambigüedad: nunca deja dos evaluaciones abiertas compartiendo
     categoría, así que abrir una nueva solo reemplaza la que se le cruce. */
  d.innerHTML='<div class="det-cuerpo">'+

    /* ESTO NO ES UN PASO, Y LLAMARLO «Paso 1 · ¿Quiénes participan?» era el
       origen de la confusión: prometía decidir quién participa en ESTA
       evaluación, y no lo hace. Es el registro del club, permanente. A quién
       le toca cada evaluación se decide abajo, en «A quiénes les toca». La
       misma pregunta contestada en dos sitios, y la primera mentía. */
    '<div class="pan-paso"><div class="pan-paso-t">Los del club, y su código</div>'+
    '<p class="nota">La lista del club, no la de esta evaluación: a quién le toca se escoge '+
    'más abajo. Cada una necesita su código de 6 caracteres, se lo das y ella lo escribe una '+
    'sola vez en su celular. El código no cambia nunca, ni al corregir el nombre.</p>'+
    '<div class="ses-fila"><input id="pan-nom" placeholder="Nombre" maxlength="40">'+
    /* AGRUPADO POR ACTIVIDAD, y no es cosmético.
       «Menores · 4 a 6 años» era la etiqueta EXACTA de dos categorías: la de
       Conexión Bíblica y la de Devoción Matutina. En el desplegable salían dos
       opciones idénticas y no había forma de saber cuál era cuál, así que
       crear una participante en la actividad equivocada era cuestión de suerte,
       y el error solo se notaba cuando la evaluación «no le llegaba». Lo mismo
       con las dos «Aventureros · 7 a 9 años». */
    '<select id="pan-cat">'+Object.keys(ACTIVIDADES).map(function(a){
      return '<optgroup label="'+esc(ACTIVIDADES[a].nombre)+'">'+
        CATS_DE_ACT(a).map(function(k){
          return '<option value="'+k+'">'+esc(catLarga(k))+'</option>';
        }).join('')+'</optgroup>';
    }).join('')+'</select>'+
    '<button class="btn azul" onclick="creaParticipante()">Agregar</button></div>'+
    '<div id="pan-lista"><p class="nota">Cargando...</p></div></div>'+

    /* El apagado del paso 2 lo maneja revisaAbrir(), no este armado: antes se
       calculaba UNA vez al pintar, así que crear la primera participante dejaba
       el paso 2 gris y con el letrero puesto hasta recargar. */
    '<div class="pan-paso" id="pan-paso2"><div class="pan-paso-t">Paso 1 · ¿Qué examen, y a quiénes?</div>'+
    '<p class="nota pan-razon" id="pan-paso2-razon"></p>'+
    '<div class="ses-fila"><label class="pan-lb">Nombre de la evaluación'+
    '<input id="pan-eval-t" placeholder="p. ej. Sábado 6 de septiembre" '+
    'maxlength="60" oninput="revisaAbrir()"></label></div>'+

    /* ───────── LAS RECETAS, Y POR QUE REEMPLAZAN AL DESPLEGABLE ─────────
       El desplegable de «Qué material» llego a 85 opciones: los grupos de las
       tres actividades, mas los 77 capitulos, mas los tramos. Se agrupo con
       <optgroup>, que es lo correcto, y en el iPhone del director se siguen
       viendo las 85 seguidas: el selector nativo de iOS no pinta las etiquetas
       de grupo. Un desplegable de 85 opciones en un celular no se lee, se
       recorre.

       Lo que de verdad hace falta no son 85 opciones: son cuatro exámenes que
       se abren siempre, y la posibilidad de armar cualquier otro. Eso es lo que
       hay aqui: una lista corta de recetas, y «Armarlo yo» para el resto. La
       receta no es un atajo a otro mecanismo: escribe en los MISMOS controles
       que abren la evaluacion, asi que no hay dos caminos que mantener. */
    '<p class="nota">Lo que más abres, de un toque. Después se puede ajustar.</p>'+
    '<div class="pan-recetas" id="pan-recetas"></div>'+

    /* LA FRASE. Es el estado completo dicho en una linea, y cada parte
       subrayada abre el control que la cambia. Antes el estado estaba repartido
       en seis campos y habia que leerlos todos para saber que se iba a abrir. */
    /* «AJUSTAR LO ESCOGIDO», tal como el maquetado C.
       Lo que de verdad se cambia despues de escoger una receta —el tramo o el
       capitulo, y cuantas preguntas— esta A LA VISTA, sin un toque de por
       medio. Lo demas (material, a quienes, dificultad y fuente) queda detras
       de un boton que dice lo que hay puesto, que es lo que hoy falta: para
       saber que dice una lista hay que abrirla.

       Los dos desplegables del tramo y el del capitulo viven AQUI y no dentro
       de un cajon que se repinta: llenaRangoPanel() les escribe las opciones,
       y volver a armar el HTML del contenedor se las borraria junto con lo que
       el director acaba de escoger. */
    '<div class="pan-grupo" id="pan-ajuste">'+
      '<div class="pan-grupo-t">Ajustar lo escogido</div>'+
      '<div class="ses-fila" id="pan-zona-cap" hidden><label class="pan-lb">Cuál'+
      '<select id="pan-cap" onchange="pintaNotaAlcance()"></select></label></div>'+
      '<div class="ses-fila" id="pan-rango" hidden>'+
        '<label class="pan-lb">Desde<select id="pan-r1" onchange="cambiaDesdePanel()"></select></label>'+
        '<label class="pan-lb">Hasta<select id="pan-r2" onchange="pintaNotaAlcance()"></select></label>'+
      '</div>'+
      /* Los tamaños los pinta pintaChips(), porque dependen de cuantas
         preguntas hay de verdad con el material escogido. */
      '<div class="pan-chips" id="pan-chips"></div>'+
      '<div class="pan-acc" id="pan-acc"></div>'+
    '</div>'+
    /* Los dos avisos viven FUERA de los grupos plegables: el de «ninguna
       categoría recibe preguntas» es justo lo que impide abrir una evaluación
       vacía, y esconderlo detrás de un pliegue lo volvería inútil. */
    '<p class="nota" id="pan-nota-al">'+NOTA_ALCANCE.todo+'</p>'+
    '<p class="nota" id="pan-aviso-cats"></p>'+

    /* ───────── QUE MATERIAL: DOS PASOS, NO 85 OPCIONES ─────────
       Primero la actividad, que es la dimension de arriba del modelo, y
       despues lo suyo. Ningun desplegable pasa de los 31 dias de octubre, y el
       tramo imposible («de la Creencia 24 a Daniel 1») no se puede ni escoger,
       porque los dos extremos se llenan con los capitulos de UNA actividad. */
    '<div class="pan-grupo" id="g-material" hidden>'+
      '<div class="pan-grupo-t">Qué material entra'+
      '<button type="button" class="pan-listo" onclick="panAbre(\'\')">Listo</button></div>'+
      '<div class="ses-fila"><label class="pan-lb">Actividad'+
      '<select id="pan-act" onchange="cambiaActPanel()">'+
        '<option value="">Todas · cada categoría recibe la suya</option>'+
        Object.keys(ACTIVIDADES).map(function(a){
          return '<option value="'+a+'">'+esc(ACTIVIDADES[a].icono+' '+ACTIVIDADES[a].nombre)+'</option>';
        }).join('')+
      '</select></label>'+
      '<label class="pan-lb">Material'+
      '<select id="pan-mat" onchange="cambiaMaterialPanel()"></select></label></div>'+
    '</div>'+

    /* ───────── CUANTAS, QUE TAN DIFICIL, Y DE QUE FUENTE ───────── */
    '<div class="pan-grupo" id="g-cuantas" hidden>'+
      '<div class="pan-grupo-t">Cuántas preguntas y qué tan difícil'+
      '<button type="button" class="pan-listo" onclick="panAbre(\'\')">Listo</button></div>'+
      /* Los tamaños de un toque estan arriba, en «Ajustar lo escogido». Aqui
         queda el campo para cualquier otro numero, que el servidor acota entre
         5 y 60. */
      '<div class="ses-fila"><label class="pan-lb" style="flex:0 0 9rem">Otro número'+
      '<input id="pan-eval-n" type="number" min="5" value="15" '+
      'oninput="pintaFrase()"></label></div>'+
      /* Confusión real: al probar con «Comenzar» (practicar), este número no
         cambiaba nada, porque practicar usa su PROPIO selector de cantidad en
         la ficha del capítulo. Este campo solo rige la evaluación con código. */
      '<p class="nota">Esta cantidad es solo para la evaluación con código (botón <strong>Hacer la evaluación</strong>). Practicar con «Comenzar» tiene su propio número, en la ficha del capítulo.</p>'+
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
      /* Solo «En esto creemos» tiene dos fuentes de verdad: la cartilla y el
         libro de las 28. En Conexion Biblica, P&R es del reglamento. */
      '<label class="ex-sw" style="margin:.2rem 0 .1rem">'+
        '<input type="checkbox" id="pan-fuente" onchange="pintaAvisoCats();pintaFrase()">'+
        '<span>Solo la fuente del reglamento<br>'+
        '<small>Solo aplica a «En esto creemos»: deja fuera lo que sale del '+
        'libro de las 28 y no de la cartilla.</small></span>'+
      '</label>'+
    '</div>'+

    /* ───────── A QUIENES LES TOCA ───────── */
    '<div class="pan-grupo" id="g-quienes" hidden>'+
      '<div class="pan-grupo-t">A quiénes les toca'+
      '<button type="button" class="pan-listo" onclick="panAbre(\'\')">Listo</button></div>'+
      '<p class="nota">Si no marcas ninguna, les toca a todas.</p>'+
      '<div class="pan-cats">'+Object.keys(CATS).map(function(k){
        return '<label class="pan-cat"><input type="checkbox" class="pan-cat-ch" value="'+k+'" '+
          'onchange="pintaAvisoCats();pintaFrase()"> '+
          '<span><strong>'+esc(CATS[k].nombre)+'</strong><br><small>'+esc((ACTIVIDADES[CATS[k].act]||{}).nombre||'')+' · '+esc(CATS[k].edad)+'</small></span></label>';
      }).join('')+'</div>'+
      /* POR PERSONA, que es el segundo nivel.
         Existe por un caso real: se reparten el material y una estudia del 1 al
         10 y otra del 11 al 20, las dos de la misma categoría y presentando el
         mismo rato. Con solo categorías eso no se podía, porque el servidor no
         deja dos abiertas que compartan categoría. Una dirigida a personas le
         gana a la de su categoría, así que se pueden tener las dos. */
      '<details class="pan-personas"><summary>O escoger personas, una por una</summary>'+
      '<p class="nota">Para cuando se reparten el material y cada una presenta su tramo. '+
      'Si marcas personas, <strong>mandan ellas</strong> y las categorías de arriba no cuentan. '+
      'A cada una le gana esta evaluación sobre la de su categoría, así que la del grupo '+
      'puede seguir abierta para las demás.</p>'+
      '<div class="pan-cats" id="pan-personas"><p class="nota">Cargando...</p></div>'+
      '</details>'+
    '</div></div>'+

    '<div class="pan-paso"><div class="pan-paso-t">Paso 2 · Abrir</div>'+
    /* LA BARRA, pegada al boton como en el maquetado: es lo ultimo que se lee
       antes de tocarlo. Dice lo escogido y CUANTAS PREGUNTAS RECIBE de verdad
       quien lo va a presentar. Esa cifra faltaba: el panel avisaba cuando una
       categoria recibia CERO, pero nunca cuantas recibe, asi que pedir 25 de un
       tramo que solo tiene 10 se descubria el dia del examen. */
    '<p class="pan-resumen" id="pan-resumen"></p>'+
    '<div class="pan-sw"><button class="btn azul" id="pan-abrir" disabled '+
    'onclick="abreEvaluacion()">Abrir una evaluación</button>'+
    '<span class="nota pan-razon" id="pan-abrir-razon"></span></div>'+
    /* Ya no dice "todos los aparatos": con categorías marcadas, solo se les
       les llega a esas — a las demás no les cambia nada. Si de
       verdad se marcan todas (o ninguna), pintaAvisoCats() ya lo advierte
       con más detalle (incluida cuál evaluación en curso se reemplazaría). */
    '<p class="nota">Cada participante de esas categorías que ya entró con su código ve la '+
    'evaluación en su pantalla. Los exámenes de práctica <strong>siguen abiertos</strong>: '+
    'abrir una evaluación ya no los cierra.</p></div>'+

    /* LA ENTRADA AL REVISOR VA AQUI Y NO EN LOS PASOS.
       Revisar el banco no es un paso de abrir una evaluacion: es el trabajo de
       otro dia, el de decidir que preguntas se quedan. Ponerlo como «paso 4»
       lo haria ver obligatorio antes de abrir. */
    '<div class="pan-paso"><div class="pan-paso-t">El banco de preguntas</div>'+
    '<p class="nota">Leer las preguntas una por una y retirar las que no deban '+
    'salir. Retirar no borra nada: la pregunta se puede devolver, y lo retirado '+
    'deja de entrar en cualquier examen.</p>'+
    '<button class="btn azul" onclick="abreRevisor()">Revisar las preguntas</button></div>'+

    /* EL HISTORIAL VA AQUI POR LA MISMA RAZON QUE EL REVISOR: no es un paso de
       abrir una evaluacion, es lo que se mira despues. */
    '<div class="pan-paso"><div class="pan-paso-t">Evaluaciones y notas</div>'+
    '<p class="nota">Todas las evaluaciones, abiertas y cerradas, con quién la hizo y '+
    'qué sacó. Cerrar una ya no la esconde.</p>'+
    '<button class="btn azul" onclick="abreHistorial()">Ver el historial</button></div>'+

    '<div id="pan-eval-en-curso"></div></div>';
  cargaParticipantes(parts);
  /* El orden importa: primero las listas del material (que dependen de la
     actividad), despues la frase, que las lee. */
  pintaRecetas();
  cambiaActPanel();
  revisaAbrir(cuantasP);
  pintaAvisoCats();
  pintaFrase();
  panLatido();
  await cargaResultados();
}

/* ───────── un capitulo suelto como alcance de la evaluacion ─────────
   La columna `alcance` de la tabla siempre acepto un id de capitulo, y la
   practica ya sabia armar «solo Daniel 1». Lo que faltaba era el desplegable:
   el panel solo ofrecia grupos, asi que abrir la evaluacion de un capitulo
   suelto no se podia pedir. Se listan agrupados por actividad, que es la
   dimension de arriba, y se marca el que es solo material de estudio: abrirle
   una evaluacion a ese capitulo deja a las participantes sin preguntas.
   Los capitulos que NINGUNA categoria examina no se ofrecen. */
/* Los extremos del rango: TODOS los capitulos, agrupados por actividad. Se
   ofrecen completos, incluidos los que son solo material de estudio, porque un
   rango es un tramo del material y cortarlo por la mitad seria mas raro que
   incluirlo; lo que no tenga preguntas simplemente no aporta ninguna. */
/* El alcance de una evaluación en palabras, para la tarjeta de «en curso». Sin
   esto la tarjeta decía el título y a quién, pero no QUÉ material, que es justo
   lo que cambia entre dos evaluaciones abiertas del mismo grupo. */
function textoAlcancePanel(alc){
  const r=rangoDe(alc);
  if(r)return textoRango(r);
  const c=CAPS.find(x=>x.id===alc);
  if(c)return 'Solo '+c.label+' — '+c.sub;
  return {todo:'Todo el material de cada categoría',creencias:'Las 28 creencias',
    biblia:'Solo el libro de Daniel',pr:'Solo Profetas y Reyes',
    q1:'Del 1 al 15 de octubre',q2:'Del 16 de octubre en adelante'}[alc]||alc;
}

/* Los capitulos de UNA actividad, en orden. */
function capsDeActividad(a){
  const cats=CATS_DE_ACT(a);
  return CAPS.filter(c=>c.cats.some(k=>cats.includes(k)));
}

/* Los dos extremos del tramo, llenados para la actividad escogida.
   «Hasta» solo ofrece lo que SI forma tramo con «Desde»: mismo tipo de
   capitulo y de ahi en adelante. Dentro de Conexion Biblica todavia hay dos
   tipos, Daniel y Profetas y Reyes, y un tramo de uno al otro no existe; con
   la lista filtrada no hay como escogerlo. */
function llenaRangoPanel(act,mantener){
  const s1=document.getElementById('pan-r1'),s2=document.getElementById('pan-r2');
  if(!s1||!s2)return;
  const caps=capsDeActividad(act||'cb');
  if(!caps.length)return;
  const prev1=mantener&&caps.some(c=>c.id===s1.value)?s1.value:caps[0].id;
  s1.innerHTML=caps.map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s1.value=prev1;
  const fam=caps.filter(c=>familiaDe(c.id)===familiaDe(prev1)&&numDe(c.id)>=numDe(prev1));
  const prev2=mantener&&fam.some(c=>c.id===s2.value)?s2.value:fam[fam.length-1].id;
  s2.innerHTML=fam.map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s2.value=prev2;
}

/* Un capitulo suelto como alcance. La columna `alcance` de la tabla siempre lo
   acepto y la practica siempre supo armar «solo Daniel 1»; lo que faltaba era
   poder pedirlo. Se listan los de LA ACTIVIDAD escogida, y solo los que alguna
   categoria de verdad examina: abrirle una evaluacion a un capitulo que es solo
   material de estudio deja a las participantes sin una sola pregunta. */
/* Los capitulos que ALGUNA categoria de la actividad examina de verdad. Se
   usa en dos sitios —el desplegable y la cifra de la receta— y por eso es una
   funcion: con la cuenta escrita aparte, la receta diria «18 capitulos» y el
   desplegable ofreceria otra cantidad. */
const capsExaminables=act=>{
  const cats=CATS_DE_ACT(act||'cb');
  return capsDeActividad(act||'cb')
    .filter(c=>cats.some(k=>c.cats.includes(k)&&!soloEstudio(c,k)));
};

function llenaCapPanel(act,mantener){
  const s=document.getElementById('pan-cap');
  if(!s)return;
  const caps=capsExaminables(act);
  if(!caps.length){s.innerHTML='';return;}
  const prev=mantener&&caps.some(c=>c.id===s.value)?s.value:caps[0].id;
  s.innerHTML=caps.map(c=>'<option value="'+c.id+'">'+
    esc(c.label+' — '+c.sub)+'</option>').join('');
  s.value=prev;
}

/* EL MATERIAL QUE OFRECE CADA ACTIVIDAD. Sale de la actividad y no de una
   lista fija: la lista fija fue la que le ofrecia «Solo Profetas y Reyes» a
   quien no lo tiene. Sin actividad escogida solo cabe «todo», porque cualquier
   otro recorte pertenece a una actividad en particular. */
/* Cada opcion trae dos etiquetas: la larga explica en el desplegable, donde
   hay renglon entero, y la corta es la que cabe en el acceso de «Material»,
   que vive en una tarjeta angosta. Dos textos para lo mismo se separarian, asi
   que van juntos en la misma linea y salen de aqui los dos. */
function opcionesMatPanel(act){
  if(act==='cb')return [['todo','Todo el material de Conexión Bíblica','todo'],
    ['biblia','Solo el libro de Daniel','solo Daniel'],
    ['pr','Solo Profetas y Reyes','solo Profetas y Reyes'],
    ['cap','Un capítulo, el que escojas','un capítulo'],
    ['tramo','Un tramo: desde… hasta…','un tramo']];
  if(act==='dm')return [['todo','Todo el cuadernillo de octubre','todo octubre'],
    ['q1','Solo la primera quincena (1 al 15)','primera quincena'],
    ['q2','Solo la segunda quincena (16 en adelante)','segunda quincena'],
    ['cap','Un día, el que escojas','un día'],
    ['tramo','Un tramo de días: desde… hasta…','un tramo']];
  if(act==='ec')return [['creencias','Las 28 creencias','las 28'],
    ['cap','Una creencia, la que escojas','una creencia'],
    ['tramo','Un tramo de creencias: desde… hasta…','un tramo']];
  return [['todo','Todo el material de cada categoría','todo']];
}

/* Cambiar de actividad rehace las tres listas de abajo y MARCA las categorías
   de esa actividad. Eso ultimo no es cosmetico: abrir «la primera quincena»
   sin marcar a nadie se la abre tambien a Conexion Biblica y a las creencias,
   que no tienen ese material, y esas se quedan sin una sola pregunta. Queda
   marcado, no fijo: el grupo «A quiénes les toca» sigue estando para cambiarlo. */
function cambiaActPanel(){
  const act=(document.getElementById('pan-act')||{}).value||'';
  const m=document.getElementById('pan-mat');
  if(m){
    const ops=opcionesMatPanel(act);
    m.innerHTML=ops.map(o=>'<option value="'+o[0]+'">'+esc(o[1])+'</option>').join('');
    m.value=ops[0][0];
  }
  llenaRangoPanel(act,false);
  llenaCapPanel(act,false);
  const suyas=act?CATS_DE_ACT(act):[];
  [].slice.call(document.querySelectorAll('.pan-cat-ch')).forEach(function(c){
    c.checked=suyas.indexOf(c.value)>=0;
  });
  pintaNotaAlcance();
}

/* Cambiar de material solo cambia que sub-control se ve; el tramo y el
   capitulo ya estan llenos con los de esta actividad. */
function cambiaMaterialPanel(){
  pintaNotaAlcance();
}

/* Cambiar «Desde» puede dejar «Hasta» atras o en otro tipo: se vuelve a armar
   la lista, que es lo que impide el estado invalido. */
function cambiaDesdePanel(){
  llenaRangoPanel((document.getElementById('pan-act')||{}).value||'',true);
  pintaNotaAlcance();
}

/* El alcance que de verdad se manda. Es la UNICA traduccion de lo que hay en
   pantalla a lo que el servidor guarda, y por eso las recetas escriben en los
   controles y no aqui: un segundo camino a `alcance` seria un segundo formato
   que mantener. */
function alcancePanel(){
  const m=(document.getElementById('pan-mat')||{}).value||'todo';
  if(m==='cap')return (document.getElementById('pan-cap')||{}).value||'todo';
  if(m==='tramo'){
    const a=(document.getElementById('pan-r1')||{}).value||'';
    const b=(document.getElementById('pan-r2')||{}).value||'';
    return a&&b?(a+'..'+b):'todo';
  }
  return m;
}

/* Un texto por opción de dificultad. Los niveles los calcula fuente/niveles.js:
   1 es dato directo, 2 agrega verdadero/falso y redacciones, 3 agrega completar
   el versículo y las diferencias entre versiones. Un nivel incluye los de
   abajo, así que subir agrega preguntas, no las reemplaza. */
/* Un texto por material. El de las creencias avisa a quién le toca: el
   reglamento las pide a padres, consejeros y acompañantes, y solo esas dos
   categorías tienen ese material cargado. */
const NOTA_ALCANCE={
  todo:'Cada categoría recibe el material de SU actividad: las de Conexión Bíblica reciben '+
    'Daniel y Profetas y Reyes, las de Devoción Matutina reciben las lecturas de octubre y las '+
    'de En esto creemos reciben las 28 creencias. Es la opción del examen del campamento.',
  creencias:'Las 28 creencias fundamentales. Solo las dos categorías de «En esto creemos» '+
    'tienen este material: si se la abres a una de Conexión Bíblica o de la matutina, a ellas '+
    'no les va a salir nada.',
  biblia:'Solo el libro de Daniel, sin Profetas y Reyes. Es material de Conexión Bíblica.',
  pr:'Solo los capítulos de Profetas y Reyes que le tocan a la categoría. Es material de '+
    'Conexión Bíblica.',
  q1:'Las lecturas de la Devoción Matutina del 1 al 15 de octubre. Es material de Devoción '+
    'Matutina: las categorías de Conexión Bíblica y de las creencias no lo tienen.',
  q2:'Las lecturas de la Devoción Matutina del 16 de octubre en adelante. «Menores» de la '+
    'matutina solo estudia hasta el 15, así que a esa categoría no le sale nada.'
};

/* CUÁNTAS PREGUNTAS LE SALDRÍAN A UNA CATEGORÍA CON ESTE MATERIAL.
   El pool cuelga de dos globales, S.cat y alcance, así que no hay forma de
   preguntarlo sin pararse un momento en esa categoría y devolver las dos como
   estaban. Es el mismo truco de gruposEx(), que ya hace esto en la práctica. */
function cuantasPara(cat,alc){
  const pc=S.cat,pa=alcance,pf=soloFuente;
  /* Con el interruptor puesto, el aviso tiene que contar lo que de verdad va a
     recibir esa categoria. Sin esto decia «274 preguntas» y el examen salia
     con otra cifra. */
  try{S.cat=cat;alcance=alc;
    soloFuente=!!(document.getElementById('pan-fuente')||{}).checked;
    return poolDe().length;}
  finally{S.cat=pc;alcance=pa;soloFuente=pf;}
}

/* AVISO DE COMBINACIÓN VACÍA.
   El material y las categorías son dos listas independientes y una
   combinación imposible no falla en ninguna parte: abre una evaluación que al
   participante le sale con CERO preguntas, y eso solo se descubre el día del
   examen. Se advertía en prosa, y solo para las creencias. Ahora se cuenta de
   verdad, contra el mismo banco que arma el examen. */
function pintaAvisoCats(){
  const p=document.getElementById('pan-aviso-cats');
  if(!p)return;
  const al=alcancePanel();
  /* CON PERSONAS MARCADAS MANDAN ELLAS, y lo que hay que revisar es si el
     material le sirve a SU categoría, no a las categorías marcadas arriba.
     Calcularlo sobre las de arriba diría que todo está bien mientras la
     persona escogida se queda sin una sola pregunta. */
  const personas=personasEval();
  const catsDePersonas=[...new Set(personas.map(function(id){
    const x=panParts.find(function(y){return y.id===id;});
    return x?x.categoria:'';
  }).filter(Boolean))];
  const marcadas=personas.length?catsDePersonas
    :[].slice.call(document.querySelectorAll('.pan-cat-ch'))
      .filter(function(c){return c.checked;}).map(function(c){return c.value;});
  /* Sin marcar ninguna les toca a todas, y ahí el dato útil es al revés: no
     la lista de las siete que se quedan sin nada, sino la de las que sí
     reciben. Nombrarlas todas era un párrafo que nadie lee. */
  const todas=!marcadas.length;
  const cats=todas?Object.keys(CATS):marcadas;
  const nom=function(c){
    return '<strong>'+esc(((ACTIVIDADES[CATS[c].act]||{}).nombre||'')+' · '+CATS[c].nombre)+'</strong>';
  };
  const con=cats.filter(function(c){return cuantasPara(c,al)>0;});
  const sin=cats.filter(function(c){return cuantasPara(c,al)===0;});
  let t='';
  if(!con.length)t='⚠️ Con este material <strong>ninguna categoría recibe preguntas</strong>. '+
    'Escoge otro material.';
  else if(!sin.length)t='';
  else if(todas)t='⚠️ Con este material solo reciben preguntas '+con.map(nom).join(' y ')+
    '. A las demás no les sale nada, así que marca abajo a quiénes les toca.';
  else t='⚠️ '+sin.map(nom).join(', ')+(sin.length===1?' no recibe':' no reciben')+
    ' ninguna pregunta con este material.';
  /* Aviso de solape: si lo que se va a abrir se cruza en categoría con algo
     que YA está en curso (panAbiertas, cargado por cargaResultados()), abrir
     lo reemplaza. Se avisa ANTES de que el director le dé al botón, no
     después: sin esto, cerrar una evaluación en curso por accidente se veía
     igual que abrir una nueva sin más. */
  /* El solape se mide EN EL MISMO NIVEL en que se va a abrir, igual que lo
     hace el servidor: una dirigida a personas solo choca con otra dirigida a
     personas que comparta alguna, y la del grupo se queda abierta. */
  const catsPend=todas?Object.keys(CATS):marcadas;
  const solapa=panAbiertas.filter(function(ev){
    if(personas.length)return (ev.ids||[]).some(function(x){return personas.indexOf(x)>=0;});
    if((ev.dirigida||[]).length)return false;
    const catsEv=(!ev.categorias||ev.categorias==='*')?Object.keys(CATS):ev.categorias.split(',');
    return catsPend.some(function(c){return catsEv.indexOf(c)>=0;});
  });
  if(solapa.length)t+=(t?'<br>':'')+'🔁 Si la abres, se cierra: '+
    solapa.map(function(ev){return '<strong>'+esc(ev.titulo)+'</strong>';}).join(', ')+'.';
  if(personas.length)t+=(t?'<br>':'')+'👤 Va dirigida a '+personas.length+
    (personas.length===1?' persona':' personas')+', no a las categorías de arriba.';
  p.innerHTML=t?'<span style="color:var(--rojo)">'+t+'</span>':'';
}

/* Que fuente nombra el reglamento para cada actividad, en palabras. Se dice
   cual es, no «la oficial»: el punto del interruptor es saber que entra. */
const FUENTE_TXT={

  dm:'Solo el cuadernillo de octubre.',
  ec:'Solo la cartilla «En esto creemos». Deja fuera lo que sale del libro de las 28 creencias.'
};

/* Por qué un rango escogido no sirve, en palabras, o cadena vacía si sirve.
   Devuelve el motivo y no un booleano porque el botón de abrir se apaga CON LA
   RAZÓN A LA VISTA: un botón gris sin explicación es el defecto que ya se
   arregló en el paso 3. */
/* GUARDA DE ULTIMO RECURSO, no la forma de avisar.
   Desde que «Hasta» se arma a partir de «Desde» y los dos salen de UNA
   actividad, un tramo invalido no se puede escoger, asi que esto no deberia
   disparar nunca. Se queda porque apaga el boton de abrir si alguien cambia
   los desplegables por otro camino: una evaluacion abierta con un tramo que no
   existe no le da preguntas a nadie, y el director se entera el dia del examen. */
function motivoRangoMalo(){
  const m=(document.getElementById('pan-mat')||{}).value||'';
  if(m!=='tramo')return '';
  const a=(document.getElementById('pan-r1')||{}).value||'';
  const b=(document.getElementById('pan-r2')||{}).value||'';
  if(!a||!b)return 'Falta escoger los dos extremos del tramo.';
  if(!rangoDe(a+'..'+b))return 'Ese tramo no existe: los dos extremos tienen que ser '+
    'del mismo material y en orden.';
  return '';
}

function pintaNotaAlcance(){
  const m=document.getElementById('pan-mat'),p=document.getElementById('pan-nota-al');
  if(!m||!p)return;
  const zc=document.getElementById('pan-zona-cap'),zr=document.getElementById('pan-rango');
  if(zc)zc.hidden=m.value!=='cap';
  if(zr)zr.hidden=m.value!=='tramo';

  if(m.value==='tramo'){
    const mal=motivoRangoMalo();
    if(mal){
      p.innerHTML='<span style="color:var(--rojo)">'+esc(mal)+'</span>';
      pintaAvisoCats();revisaAbrir();pintaFrase();return;
    }
    p.textContent=textoRango(rangoDe(alcancePanel()))+'. A una categoría que no tenga '+
      'ese material no le sale ninguna pregunta.';
    pintaAvisoCats();revisaAbrir();pintaFrase();return;
  }
  /* Con un capitulo suelto no hay texto escrito a mano: se arma con el dato,
     y se dice QUE CATEGORIAS lo examinan, que es lo que el director necesita
     saber antes de marcar a quien le toca. */
  const c=m.value==='cap'?CAPS.find(x=>x.id===alcancePanel()):null;
  if(c){
    const cats=Object.keys(CATS).filter(k=>c.cats.includes(k)&&!soloEstudio(c,k));
    p.textContent='Solo '+c.label+' — '+c.sub+'. Lo examinan: '+
      (cats.length?cats.map(k=>CATS[k].nombre+' ('+(ACTIVIDADES[CATS[k].act]||{}).nombre+')').join(', ')
                  :'ninguna categoría')+
      '. A una categoría que no lo tenga no le sale ninguna pregunta.';
  } else p.textContent=NOTA_ALCANCE[m.value]||'';
  pintaAvisoCats();revisaAbrir();pintaFrase();
}

/* ───────── LAS RECETAS Y LA FRASE ─────────
   Una receta es un punto de partida, no un modo aparte: escribe en los mismos
   controles y desde ahi se puede cambiar todo. Por eso no hay estado «estoy en
   la receta X» que pueda quedar desincronizado del formulario; lo unico que se
   guarda es cual quedo resaltada. */
const RECETAS=[
  {id:'campamento',i:'📘',t:'El examen del campamento',act:'',mat:'todo',
   d:()=>'Todo el material de cada categoría · a las '+Object.keys(CATS).length+' categorías'},
  {id:'daniel',i:'📖',t:'Un capítulo de Conexión Bíblica',act:'cb',mat:'cap',
   d:()=>'Escoges cuál · '+capsExaminables('cb').length+' capítulos con examen'},
  {id:'matutina',i:'🌅',t:'Un tramo de la matutina',act:'dm',mat:'tramo',
   d:()=>'Desde y hasta, dentro de los '+capsDeActividad('dm').length+' días'},
  {id:'creencias',i:'✝️',t:'Las 28 creencias',act:'ec',mat:'creencias',
   d:()=>'A las '+CATS_DE_ACT('ec').length+' categorías de En esto creemos'},
  {id:'yo',i:'⚙️',t:'Armarlo yo',act:null,mat:null,
   d:()=>'Material, cantidad, dificultad y a quiénes'},
];
let panReceta='';
/* Que grupo de controles esta abierto: '', 'material', 'cuantas', 'quienes' o
   'todo'. Uno a la vez, salvo «Armarlo yo», que los abre los tres. */
let panEdita='';

function pintaRecetas(){
  const d=document.getElementById('pan-recetas');
  if(!d)return;
  d.innerHTML=RECETAS.map(function(r){
    /* LA ESCOGIDA DICE LO QUE HAY PUESTO, no su descripcion generica: es lo
       que el maquetado marcaba en naranja. «Un tramo de la matutina» sin mas
       no distingue el tramo del 2 al 18 del tramo de todo octubre, y esa es
       justo la diferencia que hay que ver antes de abrir. */
    const sub=(panReceta===r.id&&r.act!==null)
      ? textoAlcancePanel(alcancePanel())+' · '+
        ((document.getElementById('pan-eval-n')||{}).value||'15')+' preguntas'
      : r.d();
    return '<button type="button" class="pan-receta'+(panReceta===r.id?' on':'')+
      (r.id==='yo'?' otra':'')+'" onclick="ponReceta(\''+r.id+'\')">'+
      '<span class="pan-receta-i">'+r.i+'</span>'+
      '<span class="pan-receta-x"><strong>'+esc(r.t)+'</strong>'+
      '<small>'+esc(sub)+'</small></span></button>';
  }).join('');
}

function ponReceta(id){
  const r=RECETAS.find(x=>x.id===id);
  if(!r)return;
  panReceta=id;
  if(r.act===null){pintaRecetas();panAbre('todo');return;}
  const a=document.getElementById('pan-act');
  if(a){a.value=r.act;cambiaActPanel();}
  const m=document.getElementById('pan-mat');
  if(m){m.value=r.mat;}
  pintaNotaAlcance();
  pintaRecetas();
  /* NINGUNA receta abre un cajon: lo que cada una deja por escoger —el tramo o
     el capitulo— ya esta a la vista en «Ajustar lo escogido». Abrir ademas el
     cajon del material mostraba los mismos dos desplegables de actividad y
     material que la receta acaba de poner, que es pedirle al director que
     confirme algo que no tiene que decidir. */
  panAbre('');
}

function panAbre(g){
  panEdita=(panEdita===g&&g!=='todo')?'':g;
  ['material','cuantas','quienes'].forEach(function(x){
    const e=document.getElementById('g-'+x);
    if(e)e.hidden=!(panEdita===x||panEdita==='todo');
  });
  pintaFrase();
}

function ponCuantasPanel(n){
  const e=document.getElementById('pan-eval-n');
  if(e)e.value=n;
  pintaFrase();
}

/* A quiénes, en palabras. Las personas mandan sobre las categorías, igual que
   en el servidor: decirlo al revés aquí haría que la frase mintiera. */
function textoQuienes(){
  const personas=personasEval();
  if(personas.length){
    const nn=personas.map(function(id){
      const x=panParts.find(function(y){return y.id===id;});
      return x?x.nombre:'';
    }).filter(Boolean);
    return nn.length<=3?nn.join(', '):(nn.length+' personas escogidas');
  }
  const cats=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
    .filter(function(c){return c.checked;}).map(function(c){return c.value;});
  if(!cats.length||cats.length===Object.keys(CATS).length)return 'todas las categorías';
  /* La actividad se nombra UNA vez cuando todas las marcadas son de la misma.
     La regla sigue siendo la de siempre —«Menores» solo no identifica nada,
     porque existe en dos actividades—, pero repetir el icono en cada nombre
     alargaba la frase hasta partirla en tres renglones en un celular. */
  const acts=[...new Set(cats.map(function(c){return CATS[c].act;}))];
  if(acts.length===1){
    const nom=(ACTIVIDADES[acts[0]]||{}).nombre;
    /* Si estan TODAS las de esa actividad, se dice asi y no se listan: «Padres
       y consejeros» ya lleva una «y» adentro, y cuatro nombres pegados con
       comas se vuelven un renglon que nadie lee. */
    if(cats.length===CATS_DE_ACT(acts[0]).length)
      return nom+': las '+cats.length+' categorías';
    return nom+': '+cats.map(function(c){return CATS[c].nombre;}).join(', ');
  }
  return cats.map(catConActividad).join(', ');
}

/* ───────── LO ESCOGIDO, EN PALABRAS ─────────
   POR QUE NO ES UN PARRAFO CON PALABRAS TOCABLES
   El maquetado B lo dibujaba asi y asi se construyo primero. Medido en 390 px,
   no funciona: un <button> no fluye como texto —aunque se le pida
   `display:inline`, el navegador lo calcula `inline-block`—, asi que un valor
   largo («De 2 de octubre a 18 de octubre», «Devoción Matutina: Menores y
   Aventureros») no se parte por donde se parte la frase: se va entero al
   renglon siguiente y deja colgando el separador y el punto final.

   Queda un boton por parte, con la etiqueta encima y el valor debajo: dice lo
   mismo —que hay puesto, y se toca para cambiarlo— y aguanta cualquier largo.

   LOS VALORES SALEN DE LAS MISMAS FUNCIONES que usa el resto del panel
   (textoAlcancePanel, el propio campo, textoQuienes): un segundo texto para lo
   mismo se separa del primero en el primer cambio. */
/* El acceso de material nombra la ACTIVIDAD y la opcion escogida, no el
   alcance en palabras: eso ya lo dicen la receta y la barra de abajo, y
   repetirlo tres veces no agrega nada. Lo que no se ve en ninguna otra parte
   es de que actividad es. */
const textoMaterialPanel=()=>{
  const a=(document.getElementById('pan-act')||{}).value||'';
  const m=(document.getElementById('pan-mat')||{}).value||'todo';
  const op=opcionesMatPanel(a).find(x=>x[0]===m);
  return (a?(ACTIVIDADES[a]||{}).nombre:'Todas las actividades')+
    (op?' · '+(op[2]||op[1]):'');
};

const FILAS_EVAL=[
  ['material','Material',textoMaterialPanel],
  ['cuantas','Preguntas',()=>((document.getElementById('pan-eval-n')||{}).value||'15')],
  ['quienes','A quiénes',()=>textoQuienes()],
];

function pintaFrase(){
  const d=document.getElementById('pan-acc');
  if(!d)return;
  d.innerHTML=FILAS_EVAL.map(function(f){
    return '<button type="button" class="pan-fila'+(panEdita===f[0]?' on':'')+
      '" onclick="panAbre(\''+f[0]+'\')">'+
      '<span class="pan-fila-k">'+esc(f[1])+'</span>'+
      '<span class="pan-fila-v">'+esc(f[2]())+'</span>'+
      '<span class="pan-fila-x" aria-hidden="true">✎</span></button>';
  }).join('');
  pintaChips();
  pintaRecetas();
  pintaResumen();
}

/* ───────── CUANTAS PREGUNTAS RECIBE DE VERDAD ─────────
   MECANISMO
   La cantidad que el director pide es un tope, no una promesa: el examen se
   arma con lo que haya en el pool de ESA categoria con ESE material. Pedir 25
   de un tramo que solo tiene 10 no falla en ninguna parte, simplemente salen
   10, y eso se descubria el dia del examen.
   Se cuenta con cuantasPara(), que es la misma funcion que ya usa el aviso de
   combinacion vacia, asi que la cifra de la barra y la del aviso no se pueden
   separar. */
function catsDestino(){
  const personas=personasEval();
  if(personas.length)return [...new Set(personas.map(function(id){
    const x=panParts.find(function(y){return y.id===id;});
    return x?x.categoria:'';
  }).filter(Boolean))];
  const m=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
    .filter(function(c){return c.checked;}).map(function(c){return c.value;});
  return m.length?m:Object.keys(CATS);
}

/* ───────── HASTA CUANTAS SE PUEDE PEDIR ─────────
   El tope real es cuantas preguntas hay con el material escogido, y no un
   numero escrito a mano. Se toma el MAYOR de las categorias a las que va
   dirigida: asi la que mas tiene puede llevarselas todas, y a la que tiene
   menos le salen las suyas, que es lo que armar() ya hace y lo que la barra de
   abajo advierte.
   Con 60 fijo, «Guias Mayores, todo el material» se recortaba a 60 de 523 sin
   decir por que. */
function topePanel(){
  const al=alcancePanel();
  const n=catsDestino().map(function(c){return cuantasPara(c,al);});
  return n.length?Math.max.apply(null,n):0;
}

/* Los tamaños de un toque. NO son numeros escogidos de gusto: son los que cada
   categoria usa de verdad (CATS[].n, hoy 10, 15 y 25), mas el maximo real al
   final. Sin ese ultimo, «todas» solo se puede pedir escribiendo el numero, y
   hay que saberlo de antemano.
   Practicar ofrece ademas 40, 60 y 100, que ahi tienen sentido como sesion
   larga; en una evaluacion del director no significan nada, y seis chips
   arbitrarios encima del campo que igual los edita son ruido. */
function pintaChips(){
  const d=document.getElementById('pan-chips');
  if(!d)return;
  const e=document.getElementById('pan-eval-n');
  const tope=topePanel();
  if(e)e.max=tope||60;
  /* Escondidos mientras «Preguntas» esta abierto: ahi debajo esta el campo, y
     dos controles para lo mismo en la misma pantalla se leen como un error. */
  if(!tope||panEdita==='cuantas'||panEdita==='todo'){d.innerHTML='';return;}
  const puesto=String((e||{}).value||'');
  const chip=function(n,txt){
    return '<button type="button" class="pan-chip'+(puesto===String(n)?' on':'')+'" '+
      'onclick="ponCuantasPanel('+n+')">'+esc(txt)+'</button>';
  };
  const suyos=[...new Set(Object.keys(CATS).map(function(k){return CATS[k].n;}))]
    .sort(function(a,b){return a-b;}).filter(function(n){return n<tope;});
  d.innerHTML=suyos.map(function(n){return chip(n,n);}).join('')+
    chip(tope,'Todas ('+tope+')');
}

const RESUMEN_EVAL='{QUIENES} · {MATERIAL} · {CUANTAS} preguntas. {DISPONIBLES}';

function pintaResumen(){
  const p=document.getElementById('pan-resumen');
  if(!p)return;
  const al=alcancePanel();
  const cats=catsDestino();
  const n=cats.map(function(c){return cuantasPara(c,al);}).filter(function(x){return x>0;});
  const min=n.length?Math.min.apply(null,n):0;
  const max=n.length?Math.max.apply(null,n):0;
  const disp=!n.length?'Con este material no hay preguntas para nadie.'
    :min===max?('Reciben <strong>'+min+'</strong> preguntas disponibles.')
    :('Reciben entre <strong>'+min+'</strong> y <strong>'+max+'</strong> preguntas disponibles.');
  const pide=Number((document.getElementById('pan-eval-n')||{}).value||15);
  /* PEDIR MAS DE LO QUE HAY NO FALLA: salen las que haya. Por eso se avisa
     aqui, con la cifra al lado de la que lo causa, y no se bloquea: un examen
     de 10 cuando se pidieron 25 puede ser exactamente lo que el director
     quiere. */
  const corto=n.length&&min<pide
    ? ' <span style="color:var(--rojo)">Pediste '+pide+
      ', así que a quien menos tenga le saldrán '+min+'.</span>'
    : '';
  p.innerHTML=aplicaMarcas(RESUMEN_EVAL,{
    QUIENES:esc(textoQuienes()),
    MATERIAL:esc(textoAlcancePanel(al)),
    CUANTAS:esc(String(pide)),
    DISPONIBLES:disp+corto});
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

/* El texto describe LA OPCION SELECCIONADA. Antes era fijo y describia siempre
   la opcion 0: con «1 · basica» escogido, el panel afirmaba algo que no era
   cierto de lo que estaba puesto. */
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
  /* El paso 2 se apaga y se prende AQUÍ, que es el único punto que sabe
     cuántas participantes hay en este momento. */
  const p2=document.getElementById('pan-paso2'),p2r=document.getElementById('pan-paso2-razon');
  if(p2)p2.classList.toggle('pan-off',panHayPart===0);
  if(p2r)p2r.textContent=panHayPart===0?'Primero crea al menos una participante en el paso 1.':'';
  const b=document.getElementById('pan-abrir'),r=document.getElementById('pan-abrir-razon');
  if(!b)return;
  const t=(document.getElementById('pan-eval-t')||{}).value||'';
  const faltaNom=!t.trim();
  const faltaPart=panHayPart===0;
  /* Un tramo mal armado no puede llegar al servidor: allá se cae al alcance
     «todo» en silencio, y el director abriría una evaluación de todo el
     material creyendo que abrió la del 1 al 10. */
  const malRango=motivoRangoMalo();
  b.disabled=faltaNom||faltaPart||!!malRango;
  if(r)r.textContent=faltaPart?'Falta crear participantes en el paso 1.'
    :faltaNom?'Falta ponerle nombre a la evaluación.'
    :malRango?malRango
    :panHayPart===null?'No se pudo confirmar cuántas participantes hay: revisa la señal.':'';
}

async function abreEvaluacion(){
  const t=document.getElementById('pan-eval-t'),n=document.getElementById('pan-eval-n');
  try{
    const cats=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
      .filter(function(c){return c.checked;}).map(function(c){return c.value;});
    const titulo=t?t.value:'';
    const d=await srvFetch('/panel/evaluacion',{method:'POST',body:JSON.stringify({
      titulo,cuantas:n?Number(n.value):15,
      alcance:alcancePanel(),
      nivel:Number((document.getElementById('pan-eval-nv')||{}).value||0),
      solo_fuente:!!(document.getElementById('pan-fuente')||{}).checked,
      categorias:cats,participantes:personasEval(),huella:huellaBanco()})});
    /* pintaPanel() ya NO decide qué mostrar leyendo una caché local: la
       tarjeta de "en curso" sale de preguntarle a /panel/evaluacion cada vez
       (cargaResultados()), así que no hace falta adivinar aquí si el POST de
       arriba funcionó — el repintado de abajo lo confirma solo, sin depender
       de que un segundo viaje de red (srvRefresca()) llegue a tiempo. */
    panReciente=(d&&d.id)||'';
    if(d&&d.cerradas&&d.cerradas.length){
      /* Avisar CUÁL se reemplazó: con varias evaluaciones corriendo a la vez,
         un clic sin darse cuenta del solape podría cerrar la de otro grupo
         sin que el director lo note hasta que alguien reclame. */
      avisaApp('Se cerró otra evaluación','Se cruzaba con esta: '+
        d.cerradas.map(function(x){return x.titulo;}).join(', '));
    }
    await srvRefresca();await pintaPanel();pintaExInicio();pintaInicio();
    /* En la evaluacion recien abierta, no en el contenedor: cb-panel empieza
       varias pantallas arriba, asi que llevar ahi el scroll se siente como
       volver al principio, y el pulso de .destaca queda fuera de la vista. */
    llevaA(d&&d.id?'ev-'+d.id:'cb-panel');
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

async function cierraEvaluacion(id){
  if(!id)return;
  if(panReciente===id)panReciente='';
  try{
    await srvFetch('/panel/evaluacion/cerrar',{method:'POST',body:JSON.stringify({id:id})});
    await srvRefresca();await cargaResultados();pintaExInicio();pintaInicio();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

/* Nombres legibles de un conjunto de categorías ('*' o 'gm,av'), para las
   tarjetas de "en curso" y el aviso de solape. */
function nombresCats(cats){
  const claves=(!cats||cats==='*')?Object.keys(CATS):cats.split(',');
  return claves.map(function(c){
    return (CATS[c]?((ACTIVIDADES[CATS[c].act]||{}).nombre||'')+' · '+CATS[c].nombre:c);
  }).join(', ');
}

/* El cuerpo que comparten la tarjeta "en curso" y la de "última evaluación":
   cuántas la hicieron, quién falta, y la suma del club si aplica. */
function cuerpoResultado(ev){
  const h=ev.hechas||[],f=ev.faltan||[];
  return '<p class="nota"><strong>'+h.length+'</strong> la hicieron · <strong>'+f.length+'</strong> faltan</p>'+
    (h.length?'<div class="tabla-scroll"><table class="info-table"><tr><th>Nombre</th><th>Cat.</th><th>Nota</th><th></th></tr>'+
      h.map(function(x){
        /* «Ver en qué falló» solo cuando el intento trae respuestas: los
           entregados antes de esta versión no las tienen, y un botón que abre
           una pantalla vacía parece que la app se trabó. */
        const rev=x.hay_revision
          ?'<button class="btn gho" onclick="verRevision(\''+esc(x.id)+'\')">Ver en qué falló</button>'
          :'<small class="nota">sin revisión</small>';
        return '<tr><td>'+esc(x.nombre)+'</td><td>'+esc(catConActividad(x.categoria))+'</td><td><strong>'+
        x.nota+'/'+x.total+'</strong></td><td>'+rev+'</td></tr>';}).join('')+'</table></div>':'')+
    (f.length?'<p class="nota">Faltan: '+f.map(function(x){return esc(x.nombre);}).join(', ')+'</p>':'')+
    sumaClub(h);
}

/* ───────── la revision de un intento, desde el panel ─────────
   El servidor guarda lo que respondio y la CLAVE de cada pregunta, no su
   texto: el texto vive en el HTML y se busca aqui. Si una pregunta ya no esta
   en el banco (porque el banco crecio o se corrigio), se dice asi en vez de
   inventar: la respuesta de ella y si acerto siguen siendo ciertas, lo unico
   que se perdio es el enunciado. */
const PREG_POR_CLAVE=(()=>{
  let mapa=null;
  return k=>{
    if(!mapa){mapa={};for(const q of BANCO)mapa[claveQ(q)]=q;}
    return mapa[k];
  };
})();

function htmlRevisionQ(e,n){
  const q=PREG_POR_CLAVE(e.k);
  const ok=!!e.b;
  const cab='<div class="qt"><span class="qn">'+n+'.</span> '+
    (q?esc(q.q||q.ins||''):'<em>Esta pregunta ya no está en el banco</em>')+'</div>';
  let cuerpo='';
  if(e.t==='mc'){
    const suya=q&&q.o&&e.r!==null&&e.r!==undefined?q.o[e.r]:null;
    const buena=q&&q.o?q.o[q.a]:null;
    cuerpo='<div class="fb '+(ok?'ok':'ko')+'">Respondió: <strong>'+
      (suya===null||suya===undefined?'nada':esc(suya))+'</strong>'+
      (ok?'':'<br>Era: <strong>'+(buena==null?'?':esc(buena))+'</strong>')+'</div>';
  } else if(e.t==='tf'){
    const di=v=>v===null||v===undefined?'nada':(v?'Verdadero':'Falso');
    cuerpo='<div class="fb '+(ok?'ok':'ko')+'">Respondió: <strong>'+di(e.r)+'</strong>'+
      (ok?'':'<br>Era: <strong>'+(q?di(!!q.a):'?')+'</strong>')+'</div>';
  } else {
    const suyas=(e.r||[]).filter(x=>x!==null);
    const buenas=q?q.p.filter(x=>x.b).map(x=>x.b):[];
    cuerpo='<div class="fb '+(ok?'ok':'ko')+'">Escribió: <strong>'+
      (suyas.length?esc(suyas.map(x=>x||'(vacío)').join(' · ')):'nada')+'</strong>'+
      (ok?'':'<br>Era: <strong>'+esc(buenas.join(' · '))+'</strong>')+'</div>';
  }
  const cap=q?(buscaItem(q.cap)||{}).label:'';
  return '<div class="q'+(ok?' hecha':' mal')+'">'+cab+cuerpo+
    (cap?'<p class="nota">'+esc(cap)+'</p>':'')+'</div>';
}

/* El esqueleto de una hoja: fondo que cierra, asa, cabecera con la X y el
   cuerpo. Estaba escrito a mano solo en abreYo(); una hoja sin ese esqueleto
   se abre y NO SE PUEDE CERRAR, que es como me quedo la primera version de la
   revision. */
const hojaConCierre=(ref,sub,cuerpo)=>
  '<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
  '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="'+esc(ref)+'">'+
  '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
  '<div class="hoja-cab">'+
    '<div><div class="hoja-ref">'+esc(ref)+'</div>'+
    '<div class="hoja-sub">'+esc(sub)+'</div></div>'+
    '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">✕</button>'+
  '</div>'+
  '<div class="hoja-txt">'+cuerpo+'</div></div>';

async function verRevision(id){
  if(!id)return;
  const d=document.getElementById('pan-eval-en-curso');
  abreHojaHtml(hojaConCierre('Revisión','Un momento...',
    '<p class="nota">Cargando la revisión...</p>'),'yo');
  try{
    const r=await srvFetch('/panel/intento?id='+encodeURIComponent(id));
    const it=r.intento||{};
    let lista=[];
    try{lista=JSON.parse(it.respuestas||'[]');}catch(e){lista=[];}
    const mal=lista.filter(x=>!x.b).length;
    abreHojaHtml(hojaConCierre('Revisión',(it.nombre||'')+' · '+it.nota+'/'+it.total,
      '<p class="nota">'+(mal?'Falló <strong>'+mal+'</strong> de '+lista.length+'. Lo que falló va en rojo.'
                             :'No falló ninguna.')+'</p>'+
      (lista.length?lista.map((e,i)=>htmlRevisionQ(e,i+1)).join('')
                   :'<p class="nota">Este intento no guardó las respuestas. Se entregó antes de que '+
                    'la app empezara a mandarlas al servidor.</p>')),'yo');
  }catch(e){
    abreHojaHtml(hojaConCierre('Revisión','No se pudo',
      '<p class="nota" style="color:var(--rojo)">'+esc(e.message||'No se pudo cargar')+'</p>'),'yo');
  }
}

/* Lo que hay corriendo AHORA MISMO, según el último /panel/evaluacion. La usa
   pintaAvisoCats() para avisar, ANTES de que el director confirme abrir, cuál
   evaluación en curso se cerraría por compartir categoría con la nueva. */
let panAbiertas=[];
/* La que se acaba de abrir desde ESTE celular. Solo sirve para señalarla al
   aterrizar: abrir una evaluacion repintaba el panel entero y subia al tope,
   asi que la unica prueba de que habia funcionado era ponerse a buscarla. */
let panReciente='';

/* Lo que el director mira mientras corre cada evaluación. Quién FALTA es el
   dato que sirve: con eso va y la busca, en vez de adivinar si ya terminaron.
   Puede haber varias a la vez, así que esto pinta una tarjeta por cada una —
   o, si no hay ninguna abierta, el resultado de la última que hubo. */
async function cargaResultados(){
  const d=document.getElementById('pan-eval-en-curso');
  if(!d)return;
  try{
    const r=await srvFetch('/panel/evaluacion');
    panAbiertas=r.evaluaciones||[];
    if(panAbiertas.length){
      d.innerHTML=panAbiertas.map(function(ev){
        /* Dirigida a personas: se nombran ELLAS, no su categoría. Decir
           «Aventureros» en una que solo le toca a Camila haría creer que el
           grupo entero tiene que presentar. */
        const para=(ev.dirigida&&ev.dirigida.length)
          ? ev.dirigida.map(esc).join(', ')+' <small>(solo estas personas)</small>'
          : esc(nombresCats(ev.categorias));
        const nueva=ev.id===panReciente;
        return '<div class="pan-paso" id="ev-'+esc(ev.id)+'">'+
          (nueva?'<div class="pan-nueva">Abierta ahora</div>':'')+
          '<div class="pan-paso-t">Evaluación en curso: '+esc(ev.titulo)+'</div>'+
          '<p class="nota">Para: <strong>'+para+'</strong></p>'+
          '<p class="nota">Material: '+esc(textoAlcancePanel(ev.alcance))+'</p>'+
          cuerpoResultado(ev)+
          '<div class="pan-sw"><button class="btn nar" onclick="cierraEvaluacion(\''+esc(ev.id)+'\')">'+
          'Cerrar esta evaluación</button></div>'+
          '<p class="nota">Se hace una sola vez por participante. Al cerrarla, las notas quedan '+
          'guardadas. Practicar, estudiar y las tarjetas no se cierran en ningún momento.</p></div>';
      }).join('');
    }else{
      panAbiertas=[];
      d.innerHTML=r.ultima?
        '<div class="pan-paso"><div class="pan-paso-t">Última evaluación (cerrada): '+esc(r.ultima.titulo)+'</div>'+
        cuerpoResultado(r.ultima)+'</div>':'';
    }
    pintaAvisoCats();
  }catch(e){d.innerHTML='';panAbiertas=[];}
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

/* ───────── REFRESCO VIVO DEL PANEL ─────────
   MECANISMO DEL PROBLEMA
   El panel se armaba UNA vez, al abrirlo, y después nadie le volvía a
   preguntar nada al servidor. Pero los participantes no viven en este aparato:
   viven en D1 y los crea cualquier director desde cualquier celular. Una
   participante creada en otro teléfono simplemente no existía para esta
   pantalla hasta rehacer el HTML, y eso solo pasaba recargando la página.
   En la app instalada es peor todavía: iOS no recarga al volver, restaura la
   pantalla congelada tal como quedó. Por eso tocaba cerrarla y abrirla.

   POR QUÉ NO SE REPINTA EL PANEL ENTERO
   pintaPanel() rehace el innerHTML, y con él se va el nombre de la evaluación
   a medio escribir y las categorías marcadas. Un refresco que borra lo que el
   director está escribiendo es peor que no refrescar. Así que el latido toca
   solo los dos pedazos que son del servidor —la lista y los resultados— y deja
   el formulario quieto.
   Antes había además un repintado COMPLETO reservado para cuando cambiaba el
   MODO (evaluación abierta o cerrada), porque el panel entero era otro en cada
   modo. Ya no: el asistente de abrir y las tarjetas de "en curso" conviven
   siempre en la misma pantalla, así que ese caso especial no hace falta —
   cargaResultados() (parte del refresco de siempre) ya trae y pinta las
   tarjetas que correspondan. */
const PAN_MS=8000;
let panReloj=null;

/* Visible de verdad: el panel vive dentro de un <details> dentro de una
   pantalla, y con cualquiera de los dos cerrado no hay nada que refrescar.
   getClientRects() vacío cubre los dos casos sin preguntar por cada uno. */
function panelALaVista(){
  const d=document.getElementById('cb-panel');
  if(!d||!srvYo||srvYo.rol!=='director')return false;
  /* El DOM de mentiras de las pruebas no trae getClientRects. Sin la guarda,
     cargar este archivo en las suites lanza. */
  return typeof d.getClientRects!=='function'||d.getClientRects().length>0;
}

async function refrescaPanel(){
  if(!panelALaVista())return;
  if(!await srvRefresca())return;   // sin señal no se toca nada de lo que hay
  await cargaParticipantes();
  await cargaResultados();
}

/* Un solo reloj, siempre. Arrancarlo dos veces dejaba dos latidos pidiendo lo
   mismo, que es como se duplican las peticiones sin que se note. */
function panLatido(){
  if(panReloj||typeof setInterval!=='function')return;
  panReloj=setInterval(function(){refrescaPanel().catch(function(){});},PAN_MS);
  /* unref solo existe en node: evita que un latido deje colgada una suite de
     pruebas. En el navegador la propiedad no está y la línea no hace nada. */
  if(panReloj&&typeof panReloj.unref==='function')panReloj.unref();
}

async function cargaParticipantes(pre){
  const d=document.getElementById('pan-lista');
  if(!d)return;
  try{
    const p=pre||((await srvFetch('/panel/participantes')).participantes||[]);
    revisaAbrir(p.length);
    pintaPersonasEval(p);
    if(!p.length){d.innerHTML='<p class="nota">Todavía no hay participantes.</p>';return;}
    partsCache=p;
    const filas=p.map(filaParticipante);
    d.innerHTML='<div class="tabla-scroll"><table class="info-table"><tr><th>Nombre</th><th>Cat.</th><th>Código</th>'+
      '<th>Enviados</th><th></th></tr>'+filas.join('')+'</table></div>'+leyendaParts(filas);
  }catch(e){d.innerHTML='<p class="nota">No se pudo cargar: '+esc(e.message||'')+'</p>';}
}

/* ─────────── UNA FILA DE LA LISTA DE PARTICIPANTES ───────────
   TRES COSAS QUE LA FILA TENÍA QUE DECIR Y NO DECÍA:

   1. CUÁL DE LAS DOS «ALAIA» ES. Medido en producción: 27 participantes para
      15 nombres distintos, o sea 12 filas son un nombre repetido con otro
      código, y en pantalla se veían idénticas. Ahora la repetida se marca, y
      se dice cuál es la que no se ha usado nunca: esa es la que se puede
      quitar sin pensarlo.
   2. QUE EL NOMBRE SE PUEDE CORREGIR. Antes, arreglar una tilde era quitar y
      volver a crear, lo que le cambiaba el código a la niña y dejaba la fila
      muerta en la lista. De ahí salen los duplicados.
   3. QUE QUITAR BORRA. Era el botón más grande de cada fila, doce veces
      seguidas: la acción destructiva era lo primero que veía el ojo. Ahora es
      texto, y pregunta cuántos exámenes se lleva por delante.

   El CÓDIGO nunca cambia al editar, y por eso no hay que avisarle a nadie: el
   nombre corregido le llega sola a la niña en la próxima sincronización,
   porque su ficha toma nombre y categoría del servidor. */
let partsCache=[];

const normNom=n=>String(n||'').trim().toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'');

/* LA COLUMNA CONTABA UNA COSA Y SE LEIA COMO OTRA.
   El numero son TODOS los examenes enviados con ese codigo: practica, «mis
   errores» y evaluaciones. La app manda al servidor todo lo que se entrega
   estando con sesion, no solo las evaluaciones del director. Medido en
   produccion: de 15 intentos, 6 de evaluacion, 5 de errores y 4 de practica.
   Un «3» pelado se leia como tres evaluaciones.

   El desglose va DENTRO de la celda y no en un `title`: en un celular no hay
   con que pasar el mouse por encima, y esta lista se mira desde el celular. */
function cuentaEnviados(x){
  const t=x.intentos||0, e=x.evaluaciones||0;
  if(!t)return '<span class="pf-cero">0</span>';
  return '<strong>'+t+'</strong>'+
    '<span class="pf-sub">'+(e?e+' de evaluación':'ninguno de evaluación')+'</span>';
}

/* La leyenda sale SOLO si hay algo marcado: una explicación permanente de
   dos etiquetas que hoy no aparecen es ruido en todas las pantallas. */
function leyendaParts(filas){
  const hayS=filas.some(function(h){return h.indexOf('>sin usar<')>=0;});
  const hayM=filas.some(function(h){return h.indexOf('>mismo nombre<')>=0;});
  if(!hayS&&!hayM)return '';
  return '<p class="nota">'+
    (hayS?'<strong>sin usar</strong>: ese código nunca presentó un examen, '+
          'quedó de cuando corregir un nombre era quitar y volver a crear. Se puede quitar. ':'')+
    (hayM?'<strong>mismo nombre</strong>: dos fichas se llaman igual y las dos se usaron, '+
          'así que la app no sabe si son dos niñas o una con dos códigos. Toca <em>Editar</em> '+
          'y cámbiale el nombre a una.':'')+'</p>';
}

/* LA ETIQUETA TIENE QUE DECIR QUÉ HACER, NO DESCRIBIR EL DATO.
   La primera versión decía «otro código» en las DOS filas del mismo nombre.
   Eso describe la situación y no ayuda: marca también la fila buena, no dice
   cuál quitar, y en un celular se parte en cuatro renglones encima de la
   columna del nombre. Se probó con el autor de la app y no la entendió.

   Ahora se marca UNA sola fila de cada par, y la marca es la acción:
   · «sin usar»      el código nunca presentó un examen. Es el sobrante de
                     cuando corregir un nombre era quitar y volver a crear:
                     ese se quita sin pensarlo.
   · «mismo nombre»  las dos fichas se usaron, así que la app NO puede saber
                     si son dos niñas o una con dos códigos. Eso lo sabe el
                     director, y ahora puede arreglarlo cambiándole el nombre
                     a una para distinguirlas.
   · sin marca       nombre único, o la fila viva de un par donde la otra ya
                     quedó marcada como sobrante. */
function filaParticipante(x){
  const cn=catConActividad(x.categoria);
  const mismos=partsCache.filter(function(y){return normNom(y.nombre)===normNom(x.nombre);});
  const repetido=mismos.length>1;
  const sinUsar=!(x.intentos||0);
  const todosUsados=repetido&&mismos.every(function(y){return (y.intentos||0)>0;});
  const etq=repetido&&sinUsar
    ?'<span class="pil na" title="Ese código nunca presentó un examen: se puede quitar">sin usar</span>'
    :todosUsados
      ?'<span class="pil az" title="Hay otra ficha con este mismo nombre y las dos se han usado: cámbiale el nombre a una para distinguirlas">mismo nombre</span>'
      :'';
  return '<tr id="pf-'+esc(x.id)+'"><td>'+esc(x.nombre)+' '+etq+'</td><td>'+esc(cn)+'</td>'+
    '<td><code>'+esc(x.codigo)+'</code></td><td>'+cuentaEnviados(x)+'</td>'+
    '<td class="pf-acc"><button type="button" class="pf-b" onclick="editaParticipante(\''+esc(x.id)+'\')">Editar</button>'+
    '<button type="button" class="pf-b pf-x" onclick="borraParticipante(\''+esc(x.id)+'\')">Quitar</button></td></tr>';
}

/* La fila se vuelve un formulario EN SU SITIO. Un modal para cambiar una
   palabra saca de la lista, y volver cuesta otro gesto. */
function editaParticipante(id){
  const x=partsCache.find(function(y){return y.id===id;});
  const fila=document.getElementById('pf-'+id);
  if(!x||!fila)return;
  fila.innerHTML='<td><input id="pe-n" class="txti" maxlength="40" value="'+esc(x.nombre)+'"></td>'+
    '<td colspan="2"><select id="pe-c">'+opcionesCatPanel(x.categoria)+'</select></td>'+
    '<td>'+(x.intentos||0)+'</td>'+
    '<td class="pf-acc"><button type="button" class="pf-b pf-ok" onclick="guardaParticipante(\''+esc(id)+'\')">Guardar</button>'+
    '<button type="button" class="pf-b" onclick="cargaParticipantes()">Cancelar</button></td>';
  const n=document.getElementById('pe-n');
  if(n&&n.focus)n.focus();
}

/* Las mismas opciones del desplegable de crear, agrupadas por actividad: dos
   categorías se llaman «Menores · 4 a 6 años» y sin la actividad no se
   distinguen. */
function opcionesCatPanel(sel){
  return Object.keys(CATS).map(function(k){
    return '<option value="'+k+'"'+(k===sel?' selected':'')+'>'+
      esc(catConActividad(k))+'</option>';
  }).join('');
}

async function guardaParticipante(id){
  const n=document.getElementById('pe-n'),c=document.getElementById('pe-c');
  if(!n||!c)return;
  const nombre=n.value.trim();
  if(!nombre){n.focus();return;}
  try{
    await srvFetch('/panel/participantes/'+encodeURIComponent(id)+'/editar',
      {method:'POST',body:JSON.stringify({nombre:nombre,categoria:c.value})});
    await cargaParticipantes();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

/* Las casillas de «escoger personas». Se pintan de la MISMA lista que la tabla
   de arriba, no de un segundo viaje al servidor: dos listas de participantes
   que se piden por aparte se desincronizan en cuanto se crea uno nuevo. */
let panParts=[];
function pintaPersonasEval(p){
  const z=document.getElementById('pan-personas');
  panParts=p||[];
  if(!z)return;
  if(!p||!p.length){z.innerHTML='<p class="nota">Todavía no hay participantes.</p>';return;}
  z.innerHTML=p.map(function(x){
    const cn=catConActividad(x.categoria);
    return '<label class="pan-cat"><input type="checkbox" class="pan-per-ch" value="'+esc(x.id)+'" '+
      'onchange="pintaAvisoCats()"> <span><strong>'+esc(x.nombre)+'</strong><br>'+
      '<small>'+esc(cn)+'</small></span></label>';
  }).join('');
}
const personasEval=()=>[].slice.call(document.querySelectorAll('.pan-per-ch'))
  .filter(function(c){return c.checked;}).map(function(c){return c.value;});

async function creaParticipante(){
  const n=document.getElementById('pan-nom'),c=document.getElementById('pan-cat');
  if(!n||!n.value.trim())return;
  try{
    await srvFetch('/panel/participantes',{method:'POST',
      body:JSON.stringify({nombre:n.value,categoria:c.value})});
    n.value='';
    await cargaParticipantes();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

async function borraParticipante(id){
  /* Se pregunta con el nombre y con lo que se lleva por delante. Un «¿Seguro?»
     pelado no dice si esta fila es la de la niña que ya presentó tres
     exámenes o el código de sobra que nadie usó. */
  const x=partsCache.find(function(y){return y.id===id;});
  if(x){
    const n=x.intentos||0;
    const detalle=n
      ?'Envió '+n+' examen'+(n===1?'':'es')+'. Las notas NO se borran, pero deja de '+
       'entrar a la app con ese código.'
      :'Nunca usó ese código, así que no se pierde nada.';
    if(!await preguntaApp('¿Quitar a '+x.nombre+'?',detalle+' · Código '+x.codigo,'Quitar',true))return;
  }
  try{
    await srvFetch('/panel/participantes/'+encodeURIComponent(id)+'/borrar',{method:'POST'});
    await cargaParticipantes();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}


/* ═══════════ EL REVISOR DEL BANCO ═══════════
   QUE ES
   La pantalla donde el director LEE las preguntas y decide cuales se quedan.
   Hasta aqui el banco solo se podia ver de a quince y al azar, dentro de un
   examen: ver las 1.378 completas costaba decenas de corridas y no habia forma
   de sacar una mala.

   QUE ES RETIRAR
   Escribir en el servidor «esta no entra mas». No borra nada: la pregunta
   sigue en el HTML, se puede devolver, y queda el registro de quien, cuando y
   por que. El generador no se toca.

   DE DONDE SALE CADA COLUMNA, para que ninguna cifra este escrita a mano:
   el capitulo y su nombre de CAPS, el tipo de q.t, el nivel de q.nv (lo
   calcula fuente/niveles.js al generar), y la fuente de esComplementaria(),
   que es la misma regla que aplica el interruptor del reglamento. */

/* El filtro es UN objeto y no seis variables sueltas: asi «limpiar» es una
   linea y agregar un criterio no obliga a tocar tres funciones. */
const REV_F0={cat:'',cap:'',t:'',nv:'',fu:'',est:'',q:''};
let revF=Object.assign({},REV_F0);
let revTope=40;
let revRet=[];        // lo que dice el servidor: clave, quien, motivo, cuando
let revMapa={};       // clave -> esa fila, para pintar el porque sin recorrer
/* El revisor mira dos cosas con el mismo mecanismo: las preguntas del examen y
   las tarjetas del mazo. Las dos se retiran con la misma tabla, porque su clave
   tiene la misma forma. Se separan en la pantalla porque son dos trabajos
   distintos: «esta pregunta esta mal» y «esta tarjeta no es de este capitulo».
   El caso que lo pidio: una tarjeta de Desmond Doss en Daniel 3, puesta como
   ejemplo moderno de los tres hebreos. */
let revQue='preguntas';  // 'preguntas' | 'tarjetas'
let revCaja='';       // la clave cuya caja de motivo esta abierta, o ''
let revMotivo='';     // lo escrito en esa caja

const REV_TIPO={mc:'Selección múltiple',tf:'Verdadero o falso',fill:'Completar'};
const REV_NIVEL={1:'1 · básica',2:'2 · intermedia',3:'3 · avanzada'};
/* Las razones de un toque salen de las que de verdad se usan al revisar. Que
   sean fijas es el punto: escribir el motivo en el celular es lo que hace
   abandonar la revision a la tercera pregunta. */
const REV_RAZONES=['Repetida','Mal redactada','Fuera del reglamento','Respuesta dudosa'];

/* La respuesta correcta, para poder juzgar la pregunta sin abrirla. Sin esto
   el director leeria el enunciado y tendria que adivinar que se espera. */
function revRespuesta(q){
  if(q.t==='mc')return q.o?q.o[q.a]:'';
  if(q.t==='tf')return (q.a?'Verdadero':'Falso')+(q.e?' — '+q.e:'');
  return (q.p||[]).filter(x=>x.b).map(x=>x.b).join(' · ');
}
const revTexto=q=>q.q||q.ins||'';

/* Los capitulos que examina una categoria. Es la MISMA regla de bancoDe()
   —las suyas, sin las que son solo material de estudio—, pero sin el filtro de
   retiradas: aqui hay que poder ver justamente las que ya se retiraron. */
function revCapsDe(cat){
  return CAPS.filter(c=>c.cats.includes(cat)&&!soloEstudio(c,cat));
}

/* Las preguntas que pasan el filtro. Se recorre BANCO entero, que es el banco
   crudo del artefacto: el revisor tiene que ver lo retirado tanto como lo
   vivo. */
function revFilas(){
  let b=BANCO;
  if(revF.cat){
    const ids=revCapsDe(revF.cat).map(c=>c.id);
    b=b.filter(q=>ids.includes(q.cap));
  }
  if(revF.cap)b=b.filter(q=>q.cap===revF.cap);
  if(revF.t)b=b.filter(q=>q.t===revF.t);
  if(revF.nv)b=b.filter(q=>String(q.nv||1)===revF.nv);
  if(revF.fu)b=b.filter(q=>(esComplementaria(q)?'c':'o')===revF.fu);
  if(revF.est)b=b.filter(q=>(retiradas.has(claveQ(q))?'r':'v')===revF.est);
  if(revF.q){
    const t=revF.q.toLowerCase();
    b=b.filter(q=>(revTexto(q)+' '+revRespuesta(q)).toLowerCase().indexOf(t)>=0);
  }
  return b;
}

/* Los capitulos de una categoria PARA TARJETAS. No es revCapsDe(): un capitulo
   que es solo material de estudio no entra al examen pero si tiene tarjetas, y
   son justo las que hay que poder revisar. */
const revCapsT=cat=>CAPS.filter(c=>c.cats.includes(cat));

function revFilasT(){
  let b=TARJETAS;
  if(revF.cat){
    const ids=revCapsT(revF.cat).map(c=>c.id);
    b=b.filter(t=>ids.includes(t.cap));
  }
  if(revF.cap)b=b.filter(t=>t.cap===revF.cap);
  if(revF.est)b=b.filter(t=>(retiradas.has(claveT(t))?'r':'v')===revF.est);
  if(revF.q){
    const x=revF.q.toLowerCase();
    b=b.filter(t=>sinEtiquetas(t.f+' '+t.r).toLowerCase().indexOf(x)>=0);
  }
  return b;
}

/* LAS CIFRAS SALEN DEL DATO. El texto lleva marcas y se rellena con lo que se
   acaba de contar, igual que el manual: una cifra escrita a mano en esta
   pantalla mentiria en el primer retiro. */
const REV_CUENTA='El banco tiene {TOTAL} {QUE} y hay {RET} cosas retiradas en total. '+
  'Con este filtro se ven {VISTA}, de las cuales {VISTA_RET} están retiradas.';

function pintaRevisor(){
  const d=document.getElementById('cb-revisor');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="card"><p class="nota">Esta pantalla es del director. '+
      'Entra con la clave en <strong>Examen · La evaluación del día</strong>.</p>'+
      '<button class="btn gho" onclick="ir(\'examen\')">Volver al examen</button></div>';
    return;
  }
  const esT=revQue==='tarjetas';
  const filas=esT?revFilasT():revFilas();
  const clave=esT?claveT:claveQ;
  const vistaRet=filas.filter(x=>retiradas.has(clave(x))).length;
  const cuenta=aplicaMarcas(REV_CUENTA,{
    QUE:esT?'tarjetas':'preguntas',
    TOTAL:String(esT?TARJETAS.length:BANCO.length),RET:String(retiradas.size),
    VISTA:String(filas.length),VISTA_RET:String(vistaRet)});

  /* Los capitulos que se ofrecen dependen de la categoria escogida: ofrecer
     los 77 con una categoria puesta deja escoger un capitulo que esa categoria
     no examina, y la lista sale vacia sin decir por que. Es la misma regla del
     tramo en el panel: lo invalido no se ofrece. */
  const caps=revF.cat?(esT?revCapsT(revF.cat):revCapsDe(revF.cat)):CAPS;
  const sel=(id,campo,opciones)=>'<select id="'+id+'" onchange="revPon(\''+campo+'\',this.value)">'+
    opciones.map(o=>'<option value="'+esc(o[0])+'"'+(revF[campo]===o[0]?' selected':'')+'>'+
      esc(o[1])+'</option>').join('')+'</select>';

  const cats=[['','Todas las categorías']].concat(
    Object.keys(CATS).map(k=>[k,catLarga(k)]));

  const tab=function(id,txt){
    return '<button type="button" class="rb-raz'+(revQue===id?' on':'')+'" '+
      'onclick="revQuePon(\''+id+'\')">'+esc(txt)+'</button>';
  };
  d.innerHTML='<div class="card">'+
    '<h2>Revisar el material</h2>'+
    '<div class="rb-razones">'+tab('preguntas','Preguntas del examen')+
      tab('tarjetas','Tarjetas del mazo')+'</div>'+
    '<p class="nota">'+cuenta+'</p>'+
    '<div class="rb-filtros">'+
      /* «El examen de» es la vista POR EXAMEN: pone en pantalla exactamente
         las preguntas que esa categoria puede recibir, con la misma regla con
         la que se arma su examen. */
      '<label class="pan-lb">El examen de'+sel('rb-cat','cat',cats)+'</label>'+
      '<label class="pan-lb">Capítulo'+sel('rb-cap','cap',
        [['','Todos']].concat(caps.map(c=>[c.id,c.label+' — '+c.sub])))+'</label>'+
      /* Tipo, nivel y fuente son de una pregunta: una tarjeta no tiene
         ninguno de los tres, y un filtro que no filtra nada es ruido. */
      (esT?'':'<label class="pan-lb">Tipo'+sel('rb-t','t',
        [['','Todos'],['mc',REV_TIPO.mc],['tf',REV_TIPO.tf],['fill',REV_TIPO.fill]])+'</label>'+
      '<label class="pan-lb">Nivel'+sel('rb-nv','nv',
        [['','Todos'],['1',REV_NIVEL[1]],['2',REV_NIVEL[2]],['3',REV_NIVEL[3]]])+'</label>'+
      '<label class="pan-lb">Fuente'+sel('rb-fu','fu',
        [['','Todas'],['o','Del reglamento'],['c','Complementaria']])+'</label>')+
      '<label class="pan-lb">Estado'+sel('rb-est','est',
        [['','Todas'],['v','A la vista'],['r','Retiradas']])+'</label>'+
    '</div>'+
    '<div class="ses-fila"><input id="rb-q" placeholder="Buscar en el enunciado" '+
      'value="'+esc(revF.q)+'" oninput="revBusca(this.value)">'+
      '<button class="btn gho" onclick="revLimpia()">Limpiar</button></div>'+
    '</div>'+
    '<div class="rb-lista">'+
      (filas.length?filas.slice(0,revTope).map(esT?revFilaT:revFila).join('')
        :'<p class="nota">Nada cumple este filtro.</p>')+
    '</div>'+
    (filas.length>revTope
      ?'<button class="btn gho rb-mas" onclick="revMas()">Ver '+
        Math.min(40,filas.length-revTope)+' más — faltan '+(filas.length-revTope)+'</button>'
      :'');
}

/* Una fila. Lo retirado NO se esconde: se ve tachado y con el motivo, porque
   la decision de devolverlo se toma leyendo por que se saco. */
function revFila(q){
  const k=claveQ(q);
  const ret=retiradas.has(k);
  const r=revMapa[k];
  const cap=(buscaItem(q.cap)||{}).label||q.cap;
  const etq=[cap,REV_TIPO[q.t]||q.t,REV_NIVEL[q.nv||1]||'',
    esComplementaria(q)?'Complementaria':'Del reglamento'];
  return '<div class="rb-it'+(ret?' fuera':'')+'">'+
    '<div class="rb-etq">'+etq.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>'+
    rbCuerpo(k,ret,revTexto(q),revRespuesta(q),r,'banco')+
    '</div>';
}

/* Una tarjeta. Se muestra el frente y el reverso, que es todo lo que tiene:
   la decision es si esa tarjeta pertenece a ese capitulo. */
function revFilaT(t){
  const k=claveT(t);
  const ret=retiradas.has(k);
  const r=revMapa[k];
  const cap=(buscaItem(t.cap)||{}).label||t.cap;
  return '<div class="rb-it'+(ret?' fuera':'')+'">'+
    '<div class="rb-etq"><span>'+esc(cap)+'</span></div>'+
    rbCuerpo(k,ret,sinEtiquetas(t.f),sinEtiquetas(t.r),r,'mazo')+
    '</div>';
}

/* EL CUERPO DE UNA FILA, compartido por preguntas y tarjetas.
   MECANISMO: antes la accion vivia en su propio renglon debajo del texto, asi
   que cada fila gastaba 44 px mas su margen en un boton que se usa en una de
   cada cien. Aqui va AL LADO del texto, que ya mide dos renglones o mas, y no
   suma altura. Esta pantalla se usa para escanear cientos de filas, no para
   leer una: lo que se gana en filas por pantalla es lo que se gana en revision.
   La caja del motivo sigue yendo debajo y a lo ancho, porque ahi si se escribe. */
function rbCuerpo(k,ret,txt,resp,r,donde){
  const porque=ret
    ?'<div class="rb-porque">Retirada'+
      (r&&r.cuando?' el '+esc(String(r.cuando).slice(0,10)):'')+
      (r&&r.motivo?' — '+esc(r.motivo):'')+'</div>'
    :'';
  /* Retirada, el boton dice solo «Devolver»: al lado de la linea roja que ya
     dice de donde se saco, repetirlo le roba ancho al texto. */
  const acc=ret
    ?'<button type="button" class="rb-x" onclick="revDevuelve(\''+k+'\')">Devolver</button>'
    :'<button type="button" class="rb-x" onclick="revAbreCaja(\''+k+'\')">Retirar</button>';
  return '<div class="rb-cuerpo">'+
      '<div class="rb-txt">'+
        '<div class="rb-q">'+esc(txt)+'</div>'+
        '<div class="rb-a">'+esc(resp)+'</div>'+
        porque+
      '</div>'+
      (revCaja===k?'':acc)+
    '</div>'+
    (revCaja===k?revCajaMotivo(k):'');
}

/* La caja del motivo se abre EN LA FILA, no en un cuadro del navegador: un
   prompt() tapa la pregunta que se esta juzgando, que es justo lo que hay que
   estar leyendo al escribir el motivo. */
function revCajaMotivo(k){
  return '<div class="rb-caja">'+
    '<div class="rb-razones">'+REV_RAZONES.map(x=>
      '<button type="button" class="rb-raz'+(revMotivo===x?' on':'')+'" '+
      'onclick="revRazon(\''+esc(x)+'\')">'+esc(x)+'</button>').join('')+'</div>'+
    '<input id="rb-motivo" maxlength="120" placeholder="Por qué (opcional)" '+
      'value="'+esc(revMotivo)+'" oninput="revEscribe(this.value)">'+
    '<div class="rb-acc">'+
      '<button class="btn nar" onclick="revRetira(\''+k+'\')">Retirar</button>'+
      '<button class="btn gho" onclick="revCierraCaja()">Cancelar</button>'+
    '</div></div>';
}

/* Al pasar a tarjetas se limpian los filtros que no existen ahi, o quedarian
   puestos y sin control a la vista para quitarlos: el resultado seria una
   pantalla vacia sin explicacion. */
function revQuePon(v){
  revQue=v;
  if(v==='tarjetas'){revF.t='';revF.nv='';revF.fu='';}
  revTope=40;revCaja='';
  pintaRevisor();
}

function revPon(campo,valor){
  revF[campo]=valor;
  /* Cambiar de categoria puede dejar puesto un capitulo que esa categoria no
     examina. Se limpia en vez de dejarlo: un filtro que no puede dar resultados
     no es un filtro, es una pantalla vacia sin explicacion. */
  if(campo==='cat'&&revF.cap&&!revCapsDe(valor||'').some(c=>c.id===revF.cap)&&valor)revF.cap='';
  revTope=40;pintaRevisor();
}
function revBusca(v){revF.q=String(v||'');revTope=40;pintaRevisor();}
function revLimpia(){revF=Object.assign({},REV_F0);revTope=40;pintaRevisor();}
function revMas(){revTope+=40;pintaRevisor();}
function revAbreCaja(k){revCaja=k;revMotivo='';pintaRevisor();}
function revCierraCaja(){revCaja='';revMotivo='';pintaRevisor();}
function revRazon(x){revMotivo=revMotivo===x?'':x;pintaRevisor();}
/* Escribir NO repinta: repintar en cada tecla vuelve a armar el input y el
   cursor salta al principio. Se guarda y ya; la pantalla se repinta al
   retirar. */
function revEscribe(v){revMotivo=String(v||'');}

/* El servidor devuelve la lista completa ya actualizada, asi que la pantalla
   no adivina como quedo: la copia. */
function revAplica(lista){
  revRet=lista||[];
  revMapa={};for(const r of revRet)revMapa[r.clave]=r;
  const claves=revRet.map(r=>r.clave);
  ponRetiradas(claves);retGuarda(claves);
}

async function revCarga(){
  try{revAplica((await srvFetch('/panel/retiradas')).retiradas);}catch(e){}
}

async function revRetira(k){
  try{
    const d=await srvFetch('/panel/retiradas',{method:'POST',
      body:JSON.stringify({clave:k,motivo:revMotivo})});
    revAplica(d.retiradas);
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
  revCaja='';revMotivo='';
  pintaRevisor();
  /* Las pantallas que muestran cuentas del material se quedan con la cifra
     vieja si no se les avisa: el menu del examen dice cuantas preguntas hay y
     el mazo cuantas tarjetas. */
  refrescaCuentas();
}

async function revDevuelve(k){
  try{
    const d=await srvFetch('/panel/retiradas',{method:'POST',
      body:JSON.stringify({clave:k,accion:'restaurar'})});
    revAplica(d.retiradas);
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
  pintaRevisor();
  refrescaCuentas();
}

/* Lo que hay que repintar cuando el material cambia de tamaño. */
function refrescaCuentas(){
  if(typeof pintaExInicio==='function')pintaExInicio();
  if(typeof pintaTarjetas==='function')pintaTarjetas();
  if(typeof pintaInicio==='function')pintaInicio();
}

/* La puerta del revisor. Se carga el detalle ANTES de pintar: sin el, las
   retiradas se verian sin el motivo ni la fecha, que es la mitad del dato. */
async function abreRevisor(){
  ir('revisor');
  await revCarga();
  pintaRevisor();
}


/* ═══════════ EL HISTORIAL DE EVALUACIONES ═══════════
   QUE ES
   La pantalla donde el director ve TODAS las evaluaciones, abiertas y
   cerradas, y las notas de cada participante a lo largo del tiempo.

   QUE PROBLEMA RESUELVE
   El panel solo habla de lo que esta abierto, y de la ultima cuando no hay
   ninguna: cerrar una evaluacion la sacaba de la vista para siempre. Las notas
   seguian guardadas en el servidor y no habia pantalla que las mostrara. Con
   nueve evaluaciones ya hechas, eso es justo lo que se mira despues del
   campamento.

   DOS VISTAS, PORQUE SON DOS PREGUNTAS DISTINTAS
   «¿Como le fue a ese examen?» se responde por evaluacion; «¿como va esta
   niña?» se responde por participante, y esa segunda no existia en ninguna
   parte. Las dos salen del mismo dato. */
let hisVista='evals';     // 'evals' | 'personas'
let hisEvals=null;        // lo que devolvio /panel/evaluaciones, o null si no se pudo
let hisIntentos=null;     // lo que devolvio /panel/intentos
let hisAbierta='';        // la evaluacion desplegada, si hay alguna
let hisDetalle={};        // id -> detalle ya pedido, para no volver a pedirlo
let hisVacias=false;      // mostrar tambien las que no tienen ni una nota

const HIS_CUENTA='{TOTAL} evaluaciones · {CON} con notas · {NOTAS} notas guardadas.';

/* Las que se ven. Las de cero notas se esconden por defecto: en esta base son
   siete pruebas de septiembre, y abrir la pantalla con eso arriba entierra lo
   que de verdad se quiere mirar. */
const hisFiltradas=()=>(hisEvals||[]).filter(e=>hisVacias||e.notas>0);

function pintaHistorial(){
  const d=document.getElementById('cb-historial');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="card"><p class="nota">Esta pantalla es del director. '+
      'Entra con la clave en <strong>Examen · La evaluación del día</strong>.</p>'+
      '<button class="btn gho" onclick="ir(\'examen\')">Volver al examen</button></div>';
    return;
  }
  if(hisEvals===null){
    d.innerHTML='<div class="card"><p class="nota">Cargando el historial...</p></div>';
    return;
  }
  const tab=(id,txt)=>'<button type="button" class="rb-raz'+(hisVista===id?' on':'')+
    '" onclick="hisPon(\''+id+'\')">'+esc(txt)+'</button>';
  d.innerHTML='<div class="card">'+
    '<h2>Evaluaciones y notas</h2>'+
    '<p class="nota">'+hisResumen()+'</p>'+
    '<div class="rb-razones">'+tab('evals','Por evaluación')+tab('personas','Por participante')+'</div>'+
    (hisVista==='evals'
      ?'<label class="ex-sw" style="margin:.4rem 0 0"><input type="checkbox"'+
       (hisVacias?' checked':'')+' onchange="hisVerVacias(this.checked)">'+
       '<span>Mostrar también las que no tienen ni una nota</span></label>':'')+
    '</div>'+
    (hisVista==='evals'?hisListaEvals():hisListaPersonas());
}

/* Las cifras salen del dato, con marcas, igual que en el revisor. */
function hisResumen(){
  const e=hisEvals||[];
  return aplicaMarcas(HIS_CUENTA,{
    TOTAL:String(e.length),
    CON:String(e.filter(x=>x.notas>0).length),
    NOTAS:String(e.reduce((a,x)=>a+(x.notas||0),0))});
}

function hisListaEvals(){
  const l=hisFiltradas();
  if(!l.length)return '<p class="nota">Todavía no hay evaluaciones con notas.</p>';
  return '<div class="rb-lista">'+l.map(function(ev){
    const abierta=!!ev.abierta;
    const cuando=String(ev.creada_en||'').slice(0,10);
    /* A quienes: las personas mandan sobre las categorias, igual que en el
       servidor. Aqui solo hay ids, asi que se dice cuantas son. */
    const ids=(ev.participantes||'').split(',').filter(Boolean);
    const para=ids.length
      ? ids.length+(ids.length===1?' persona':' personas')
      : nombresCats(ev.categorias);
    return '<div class="rb-it'+(abierta?' his-viva':'')+'">'+
      '<div class="rb-etq"><span>'+esc(cuando)+'</span>'+
      '<span>'+(abierta?'Abierta':'Cerrada')+'</span>'+
      '<span>'+ev.notas+(ev.notas===1?' nota':' notas')+'</span>'+
      (ev.solo_fuente?'<span>Solo la fuente</span>':'')+'</div>'+
      '<div class="rb-q">'+esc(ev.titulo)+'</div>'+
      '<div class="rb-a">'+esc(textoAlcancePanel(ev.alcance))+' · '+esc(para)+
      ' · '+ev.cuantas+' preguntas</div>'+
      '<div class="rb-acc"><button class="btn gho" onclick="hisAbre(\''+esc(ev.id)+'\')">'+
      (hisAbierta===ev.id?'Ocultar el detalle':'Ver quién la hizo')+'</button></div>'+
      (hisAbierta===ev.id?'<div class="his-det">'+
        (hisDetalle[ev.id]?cuerpoResultado(hisDetalle[ev.id])
                          :'<p class="nota">Cargando...</p>')+'</div>':'')+
    '</div>';
  }).join('')+'</div>';
}

/* Por participante: la linea de cada una, de la mas reciente a la mas vieja.
   Se arma desde /panel/intentos, que ya existia en el servidor y que ninguna
   pantalla llamaba. */
function hisListaPersonas(){
  const it=(hisIntentos||[]).filter(x=>x.evaluacion_id);
  if(!it.length)return '<p class="nota">Todavía no hay notas de ninguna evaluación.</p>';
  const por={};
  for(const x of it){(por[x.nombre]=por[x.nombre]||[]).push(x);}
  return '<div class="rb-lista">'+Object.keys(por).sort().map(function(nom){
    const suyos=por[nom];
    const prom=Math.round(suyos.reduce((a,x)=>a+(x.total?x.nota/x.total:0),0)/suyos.length*100);
    return '<div class="rb-it">'+
      '<div class="rb-etq"><span>'+esc(catConActividad(suyos[0].categoria))+'</span>'+
      '<span>'+suyos.length+(suyos.length===1?' evaluación':' evaluaciones')+'</span>'+
      '<span>promedio '+prom+'%</span></div>'+
      '<div class="rb-q">'+esc(nom)+'</div>'+
      '<div class="tabla-scroll"><table class="info-table">'+
      '<tr><th>Cuándo</th><th>Evaluación</th><th>Nota</th><th></th></tr>'+
      suyos.map(function(x){
        return '<tr><td>'+esc(String(x.creado_en||'').slice(0,10))+'</td>'+
          '<td>'+esc(x.evaluacion||'—')+'</td>'+
          '<td><strong>'+x.nota+'/'+x.total+'</strong></td><td>'+
          (x.hay_revision?'<button class="btn gho" onclick="verRevision(\''+esc(x.id)+'\')">Ver en qué falló</button>'
                         :'<small class="nota">sin revisión</small>')+'</td></tr>';
      }).join('')+'</table></div></div>';
  }).join('')+'</div>';
}

function hisPon(v){hisVista=v;pintaHistorial();}
function hisVerVacias(v){hisVacias=!!v;pintaHistorial();}

/* El detalle se pide de a UNA y se guarda: con veinte participantes por
   evaluacion, traerlas todas de entrada serian cientos de filas para escoger
   una. */
async function hisAbre(id){
  if(hisAbierta===id){hisAbierta='';pintaHistorial();return;}
  hisAbierta=id;
  pintaHistorial();
  if(!hisDetalle[id]){
    try{
      const r=await srvFetch('/panel/evaluacion?id='+encodeURIComponent(id));
      if(r&&r.evaluacion)hisDetalle[id]=r.evaluacion;
    }catch(e){}
  }
  pintaHistorial();
}

async function abreHistorial(){
  ir('historial');
  hisEvals=null;pintaHistorial();
  try{hisEvals=(await srvFetch('/panel/evaluaciones')).evaluaciones||[];}
  catch(e){hisEvals=[];}
  try{hisIntentos=(await srvFetch('/panel/intentos')).intentos||[];}
  catch(e){hisIntentos=[];}
  pintaHistorial();
}

/* Arranque: se le pregunta al servidor sin bloquear la pantalla. Si no hay
   señal, la app abre igual con lo último que supo. */
(async function(){
  try{
    await srvRefresca();
    await srvQuienSoy();
    pintaSesion();
    /* LA FICHA ACTIVA PUEDE NO SER LA DE LA SESION, y eso importa.
       Un aparato puede tener varias fichas (la misma persona en dos
       actividades, o dos personas compartiendo celular) y la app abre en la
       ultima que se uso, no en la de la sesion del servidor. Sin alinear
       primero, el arranque subiria el progreso de OTRA ficha a esta cuenta y
       las fundiria: como la fusion toma el mayor campo por campo, lo de una
       persona se le colaria a la otra sin que nada avise.
       adoptaFicha() hace exactamente esa alineacion (busca la ficha de ese
       nombre en esa actividad, o la crea) y ya se usa al entrar con codigo. */
    if(srvYo&&srvYo.rol==='participante')adoptaFicha(srvYo);
    /* Y con la ficha correcta activa: si esta niña ya entro con su codigo
       alguna vez, su progreso baja aqui, asi que abrir en otro celular
       muestra lo que estudio y no una ficha en blanco. */
    try{await sincronizaProgreso();}catch(e){}
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
    if(document.visibilityState!=='visible')return;
    buscaVersion(false);
    /* Y el estado del servidor, no solo la versión del material. Esto es lo
       que faltaba en la app instalada: iOS restaura la pantalla como estaba y
       sin esta línea la lista de participantes, la evaluación abierta y la
       nota siguen siendo las de la última vez que se abrió la app. */
    refrescaPanel().catch(()=>{});
    cargaEvaluacion().catch(()=>{});
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
