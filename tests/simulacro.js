/* Prueba la evaluación del día contra el JS real del index.html.

   QUÉ SE PRUEBA Y POR QUÉ
   La app de preparación se apoya en cuatro piezas: la práctica se cierra sola
   cuando hay una evaluación abierta, sin señal se falla CERRADO, la evaluación
   no muestra las respuestas, y la revisión solo se abre con la clave del
   director. Cada una se puede romper con un cambio inocente en otra parte, y
   las cuatro son invisibles a ojo. */
const fs=require('fs'),path=require('path');
const RAIZ=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(RAIZ,'index.html'),'utf8');
const js=html.match(/<script>([\s\S]*)<\/script>/)[1];

let store={},sesion={};
const nodo=()=>({classList:{add(){},remove(){},toggle(){}},value:'',textContent:'',
  innerHTML:'',style:{},outerHTML:'',focus(){}});
const stub=`
let localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
let sessionStorage={getItem:k=>sesion[k]||null,setItem:(k,v)=>{sesion[k]=v},removeItem:k=>{delete sesion[k]}};
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
let history={replaceState(){}};
let location={href:'https://conexion-biblica.pages.dev/',hash:''};
let Blob=function(){}, URL={createObjectURL:()=>'blob:x'};
let btoa=s=>Buffer.from(s,'binary').toString('base64');
let atob=s=>Buffer.from(s,'base64').toString('binary');
`;
const fn=new Function('store','sesion','nodo','Buffer',stub+js+`
return {S:()=>S, ponCat, normalizar, guardar, huellaBanco,
        revelaRespuestas, activaDirector, salirDirector,
        entregar, iniciar, reinicia, prng, armar, claveQ,
        ponModo:m=>{modo=m}, modoActual:()=>modo,
        ponRnd:f=>{rndEx=f}, rndNormal:()=>{rndEx=Math.random},
        ponAlcance:v=>{alcance=v}, ponNivel:v=>{nivel=v}, ponCuantas:v=>{cuantas=v},
        esDirector:()=>director,
        prueba:()=>prueba, ultimoRes:()=>ultimoRes,
        entraDirector, pideClaveDir, pintaLogros,
        examenesCerrados, normalizarDB, tareasDeHoy, pintaCierre,
        srvLee, srvGuarda, pintaEvaluacion,
        ponEval:e=>{evalPend=e;evalHecha=false}, evalPend:()=>evalPend,
        haceEvaluacion, evalActual:()=>evalActual,
        DB:()=>DB,
        el:id=>document.getElementById(id)};`);
const A=fn(store,sesion,nodo,Buffer);

let f=0; const ok=(c,m)=>{console.log((c?'✅':'❌')+' '+m); if(!c)f++;};

/* ───────── UNA SOLA PERILLA ─────────
   La práctica está cerrada exactamente cuando hay una evaluación abierta. Antes
   había dos interruptores y un link; si vuelve a aparecer un segundo estado,
   estas pruebas lo tienen que ver. */
A.ponCat('av');
ok(A.examenesCerrados()===false,'Sin nada en el servidor, la práctica está abierta');

A.srvGuarda(false,'ev1','Sábado de prueba');
ok(A.examenesCerrados()===true,'Con una evaluación abierta, la práctica se cierra');

A.srvGuarda(true,null,null);
ok(A.examenesCerrados()===false,'Al cerrar la evaluación, la práctica vuelve');

/* SIN SEÑAL SE FALLA CERRADO. Es la regla que no se puede romper: si el
   servidor no contesta, manda lo último que dijo. */
A.srvGuarda(false,'ev1','x');
ok(A.srvLee().practica===false,'Lo último que dijo el servidor queda guardado');
ok(A.examenesCerrados()===true,'Sin señal, si lo último fue cerrado, sigue cerrado');

/* Ningún examen que la participante arme sola arranca con la práctica cerrada. */
for(const m of ['normal','simulacro','errores']){
  A.reinicia();
  A.iniciar(m);
  ok(A.prueba().length===0,'Con la práctica cerrada, iniciar('+m+') no arranca nada');
}

/* La pantalla de Inicio deja de ofrecer exámenes y dice por qué. */
const hoyCerrado=A.tareasDeHoy();
ok(!hoyCerrado.some(t=>/arrancaExamen\(|examenDeCapitulo\(/.test(t.f)),
  'Cerrada, «Qué estudiar hoy» no ofrece ninguna tarea de examen');
ok(hoyCerrado.some(t=>/cerrados/i.test(t.t)),'Y en su lugar dice que están cerrados');
ok(hoyCerrado.some(t=>/tarjetas|Leer/i.test(t.t)),'Estudiar y las tarjetas siguen ofreciéndose');

/* ───────── LA EVALUACIÓN SÍ CORRE CON LA PRÁCTICA CERRADA ─────────
   Esa es toda la gracia: lo que se cierra es la práctica, no la evaluación. */
A.reinicia();
A.ponEval({id:'ev1',titulo:'Sábado 6',alcance:'todo',cuantas:15,nivel:2,semilla:123456789});
A.haceEvaluacion();
ok(A.prueba().length===15,'Con la práctica cerrada, la evaluación SÍ se puede hacer');
ok(A.modoActual()==='evaluacion','Y corre en modo evaluación');
ok(A.evalActual()&&A.evalActual().id==='ev1','Queda registrada cuál evaluación se está haciendo');

/* La revisión está cerrada en la evaluación y en el simulacro, y abierta en el
   examen normal y en el repaso de errores. */
ok(A.revelaRespuestas()===false,'En la evaluación no se ven las respuestas');
A.ponModo('simulacro');
ok(A.revelaRespuestas()===false,'En el simulacro tampoco');
A.ponModo('normal');
ok(A.revelaRespuestas()===true,'En un examen normal sí');
A.ponModo('errores');
ok(A.revelaRespuestas()===true,'Y en el repaso de errores también');

A.ponModo('evaluacion');
A.entregar();
const res=A.el('ex-result').innerHTML;
ok(/revisión está cerrada/.test(res),'La pantalla de resultado de la evaluación no muestra la revisión');
ok(!/Respuesta:/.test(res),'La pantalla no deja ver ninguna respuesta correcta');
ok(/Soy el director/.test(res),'La pantalla ofrece la clave del director');

/* Una evaluación ya hecha no se puede repetir desde la app. La regla de verdad
   vive en la base (índice único), esto solo evita el intento. */
const antes=A.prueba().length;
A.haceEvaluacion();
ok(A.prueba().length===antes,'Una evaluación ya entregada no se vuelve a armar');

/* ───────── EL EXAMEN NORMAL NO CAMBIÓ ───────── */
A.srvGuarda(true,null,null);
A.reinicia();
A.iniciar('normal');
ok(A.prueba().length>0,'Con la práctica abierta, un examen normal arranca');
A.entregar();
const normal=A.el('ex-result').innerHTML;
ok(/Revisión/.test(normal)&&!/revisión está cerrada/.test(normal),
  'Un examen normal sigue mostrando la revisión completa');

/* ───────── EL HISTORIAL DISTINGUE DE DÓNDE VINO CADA EXAMEN ─────────
   Solo la evaluación es comparable entre dos niñas: es el mismo examen el
   mismo día. En la tabla se tienen que ver distintos. */
A.reinicia();
A.iniciar('simulacro');
A.entregar();
A.pintaLogros();
const hist=A.el('historial').innerHTML;
ok(/simulacro/.test(hist),'El historial marca el simulacro');
ok(/evaluación/.test(hist),'El historial marca la evaluación');
ok(!/[\u{1F300}-\u{1FAFF}]/u.test(hist),'El historial ya no usa emojis, usa palabras');

/* ───────── LA CLAVE DEL DIRECTOR ─────────
   LA CLAVE NO VIVE EN ESTE ARCHIVO, Y ES EL ARREGLO DE v20.
   Hasta v19 estaba escrita aquí diez veces, en un repositorio PÚBLICO. La
   huella en el HTML era segura y el proceso no: la prueba de abajo verificaba
   que la clave no estuviera en index.html y pasaba en verde, porque miraba el
   archivo equivocado. Ahora entra por variable de entorno y la prueba barre
   TODO el repositorio.
     CB_CLAVE='la clave' node tests/simulacro.js */
const CLAVE=process.env.CB_CLAVE;
if(!CLAVE){
  console.error('\nFalta CB_CLAVE. Corre:  CB_CLAVE=\'la clave del director\' node tests/simulacro.js');
  process.exit(1);
}

(async()=>{
  const mal=await A.activaDirector('esta-no-es-la-clave');
  ok(mal!==''&&A.esDirector()===false,'Una clave equivocada no abre el perfil director');
  const vacia=await A.activaDirector('');
  ok(vacia!==''&&A.esDirector()===false,'Una clave vacía no abre el perfil director');

  const bien=await A.activaDirector(CLAVE);
  ok(bien===''&&A.esDirector()===true,'La clave correcta abre el perfil director');
  ok(sesion['cb-dir']==='1','El perfil queda en sessionStorage, que se borra al cerrar la pestaña');

  /* El director ve la revisión de la evaluación, que es para lo que existe. */
  A.ponModo('evaluacion');
  ok(A.revelaRespuestas()===true,'Con el perfil director la revisión de la evaluación se abre');

  /* Y se salta el cierre, para poder probar el día antes. */
  A.srvGuarda(false,'ev2','x');
  ok(A.examenesCerrados()===false,'Con el perfil director activo el cierre no le aplica');
  A.salirDirector();
  ok(A.examenesCerrados()===true,'Al salir del perfil, la práctica sigue cerrada');
  A.srvGuarda(true,null,null);

  /* La clave se escribe en un celular y el teclado de iOS pone mayúscula solo:
     las tres formas tienen que entrar, o el director cree que se equivocó. */
  A.salirDirector();
  ok(await A.activaDirector(CLAVE)===''&&A.esDirector(),'Entra tal como se escribió');
  A.salirDirector();
  ok(await A.activaDirector(CLAVE.toLowerCase())===''&&A.esDirector(),'Entra en minúsculas');
  A.salirDirector();
  ok(await A.activaDirector('  '+CLAVE.toUpperCase()+'  ')===''&&A.esDirector(),
    'Entra con espacios de sobra y en mayúsculas');
  /* Solo aplica si la clave lleva guion: quitarlo la convertiría en un prefijo,
     y normalizar de más es justo lo que no se puede hacer. */
  if(CLAVE.includes('-')){
    A.salirDirector();
    ok(await A.activaDirector(CLAVE.replace(/-/g,''))!==''&&!A.esDirector(),
      'Sin el guion NO entra: no se normaliza de más');
  }
  A.salirDirector();

  /* El barrido que faltaba: la clave no puede estar en NINGÚN archivo del
     repositorio, no solo en index.html. Así se detecta el caso que se nos pasó:
     estaba en las pruebas. */
  const fs2=require('fs'),path2=require('path');
  const raiz=path2.join(__dirname,'..');
  const salta=new Set(['.git','node_modules','.wrangler','files']);
  const sospechosos=[];
  (function barre(dir){
    for(const e of fs2.readdirSync(dir,{withFileTypes:true})){
      if(salta.has(e.name))continue;
      const full=path2.join(dir,e.name);
      if(e.isDirectory()){barre(full);continue;}
      if(!/\.(js|html|css|json|toml|sql|md|txt)$/.test(e.name))continue;
      let t='';try{t=fs2.readFileSync(full,'utf8');}catch(_){continue;}
      if(t.toLowerCase().includes(CLAVE.toLowerCase()))sospechosos.push(path2.relative(raiz,full));
    }
  })(raiz);
  ok(sospechosos.length===0,
    'La clave en texto plano no está en NINGÚN archivo del repo'+(sospechosos.length?' — aparece en '+sospechosos.join(', '):''));
  ok(/CLAVE_DIR='[0-9a-f]{64}'/.test(html),'En el HTML va un SHA-256 de 64 caracteres, no la clave');

  console.log('\n'+(f===0?'LA EVALUACIÓN DEL DÍA: TODO BIEN':f+' FALLOS'));
  process.exit(f?1:0);
})();
