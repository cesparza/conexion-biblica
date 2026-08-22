/* Prueba el candado del simulacro contra el JS real del index.html.

   QUÉ SE PRUEBA Y POR QUÉ
   El simulacro se cierra en el tiempo sin servidor, y eso se apoya en tres
   piezas: la semilla es impredecible, el link se gasta al abrirse, y la
   revisión solo se abre con la clave del director. Cada una se puede romper con
   un cambio inocente en otra parte, y las tres son invisibles a ojo. */
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
return {S:()=>S, ponCat, normalizar, guardar, huellaBanco, escribeReceta, leeReceta,
        semillaNueva, revelaRespuestas, activaDirector, salirDirector,
        aceptaLink, entregar, pintaInvitacion, iniciar, reinicia,
        ponReceta:r=>{recetaPend=r}, receta:()=>recetaPend,
        ponModo:m=>{modo=m}, modoActual:()=>modo,
        esDirector:()=>director, semLinkActual:()=>semLink,
        prueba:()=>prueba, ultimoRes:()=>ultimoRes,
        entraDirector, pideClaveDir, pintaLinkUsado, pintaLogros,
        examenesCerrados, alternaEvento, normalizarDB, tareasDeHoy, pintaCierre,
        DB:()=>DB,
        el:id=>document.getElementById(id)};`);
const A=fn(store,sesion,nodo,Buffer);

let f=0; const ok=(c,m)=>{console.log((c?'✅':'❌')+' '+m); if(!c)f++;};

/* ── la semilla es el secreto, así que tiene que ser impredecible ── */
const semillas=new Set();
for(let i=0;i<500;i++)semillas.add(A.semillaNueva());
ok(semillas.size===500,'500 semillas seguidas no repiten ninguna ('+semillas.size+')');
ok([...semillas].every(s=>Number.isInteger(s)&&s>=0&&s<=4294967295),
  'Toda semilla es un entero de 32 bits sin signo');
/* Con Date.now() como base, las semillas de un mismo segundo comparten los
   bits altos. Con azar del sistema no: se reparten por todo el rango. */
const altos=new Set([...semillas].map(s=>s>>>24));
ok(altos.size>=200,'Las semillas se reparten por todo el rango, no por reloj ('+altos.size+' de 256 bytes altos)');

/* ── normalizar() sanea el registro de links usados ── */
const n1=A.normalizar({links:{'123':{pts:12,total:15,fecha:'2026-10-09'}}});
ok(n1.links['123']&&n1.links['123'].pts===12,'normalizar conserva un link usado con su nota');
const n2=A.normalizar({links:{'9':{pts:null,total:15,fecha:''}}});
ok(n2.links['9']&&n2.links['9'].pts===null,'normalizar conserva un link abierto y sin terminar');
const n3=A.normalizar({links:{'x':'basura','y':null,'z':{pts:'no'}}});
ok(n3.links['x']===undefined&&n3.links['y']===undefined,'normalizar descarta entradas que no son objeto');
ok(n3.links['z']&&n3.links['z'].pts===null,'Un puntaje que no es número queda como sin terminar');
ok(A.normalizar(null).links&&Object.keys(A.normalizar(null).links).length===0,
  'Una ficha sin links arranca con el registro vacío');

/* ── un link se gasta al abrirlo ── */
A.ponCat('av');
const SEM=987654321;
const receta={c:'av',a:'todo',n:1,q:15,s:SEM,h:A.huellaBanco()};
const r=A.leeReceta(A.escribeReceta(receta));
ok(r&&r.s===SEM,'La receta de prueba se lee bien');

A.ponReceta(r);
A.aceptaLink();
ok(A.prueba().length===15,'El link armó las 15 preguntas');
ok(A.modoActual()==='compartido','El examen del link corre en modo compartido');
ok(A.semLinkActual()===SEM,'La semilla del link queda activa');
const reg=A.S().links[String(SEM)];
ok(reg&&reg.pts===null,'Al ABRIR el link su semilla queda anotada, todavía sin nota');
ok(reg&&reg.total===15,'La anotación guarda cuántas preguntas eran');

/* Segundo intento con la misma semilla: la app lo rechaza. */
A.ponReceta(r);
A.pintaInvitacion(r);
const pantalla=A.el('ex-result').innerHTML;
ok(/ya se usó/.test(pantalla),'Un segundo intento con la misma semilla se rechaza');
ok(/Soy el director/.test(pantalla),'La pantalla de link usado ofrece liberarlo con la clave');

/* ── la revisión está cerrada en simulacro y en link ── */
A.ponModo('compartido');
ok(A.revelaRespuestas()===false,'En un examen por link la revisión está cerrada');
A.ponModo('simulacro');
ok(A.revelaRespuestas()===false,'En un simulacro la revisión está cerrada');
A.ponModo('normal');
ok(A.revelaRespuestas()===true,'En un examen normal la revisión se muestra');
A.ponModo('errores');
ok(A.revelaRespuestas()===true,'El repaso de errores sí muestra las respuestas');

/* ── entregar cierra el link con su nota ── */
A.ponReceta(r);
A.S().links={};
A.aceptaLink();
A.entregar();
const cerrado=A.S().links[String(SEM)];
ok(cerrado&&typeof cerrado.pts==='number','Al entregar, el link queda cerrado con una nota');
ok(cerrado&&cerrado.pts===0,'Sin responder nada la nota es cero');
const res=A.el('ex-result').innerHTML;
ok(/revisión está cerrada/.test(res),'La pantalla de resultado de un link no muestra la revisión');
ok(!/Respuesta:/.test(res),'La pantalla no deja ver ninguna respuesta correcta');
ok(/Soy el director/.test(res),'La pantalla ofrece la clave del director');

/* ── el examen de todos los días no cambió: sigue mostrando la revisión ── */
A.reinicia();
A.iniciar('normal');
A.entregar();
const normal=A.el('ex-result').innerHTML;
ok(/Revisión/.test(normal)&&!/revisión está cerrada/.test(normal),
  'Un examen normal sigue mostrando la revisión completa');
ok(/Repasar mis errores|Otro examen/.test(normal),'Un examen normal conserva sus botones');

/* ── un examen normal no toca el registro de links ── */
A.iniciar('simulacro');
ok(A.semLinkActual()===null,'Un examen armado en el aparato no lleva semilla de link');
const antes=Object.keys(A.S().links).length;
A.entregar();
ok(Object.keys(A.S().links).length===antes,'Entregar un simulacro propio no anota ningún link');

/* ── modo evento: el director cierra los exámenes que se arman en el aparato ──
   Lo que importa: que el cierre NO toque el examen por link, que es el único que
   el director quiere que se haga ese día. */
ok(A.examenesCerrados()===false,'De entrada los exámenes están abiertos');
ok(A.DB().evento===false,'El interruptor arranca apagado');

A.alternaEvento();
ok(A.DB().evento===true&&A.examenesCerrados(),'El interruptor cierra los exámenes');

/* Ningún examen que se arme en el aparato arranca. */
for(const m of ['normal','simulacro','errores']){
  A.reinicia();
  A.iniciar(m);
  ok(A.prueba().length===0,'Con los exámenes cerrados, iniciar('+m+') no arranca nada');
}

/* Pero el que llega por link sí. Esa es toda la gracia. */
A.S().links={};
A.ponReceta(A.leeReceta(A.escribeReceta(receta)));
A.aceptaLink();
ok(A.prueba().length===15,'Con los exámenes cerrados, el examen por link SÍ se puede hacer');
ok(A.modoActual()==='compartido','Y corre como examen compartido');
A.entregar();
ok(typeof A.S().links[String(SEM)].pts==='number','El examen por link se cierra con su nota igual');

/* La pantalla de Inicio no ofrece tareas que arranquen un examen. */
const hoyCerrado=A.tareasDeHoy();
ok(!hoyCerrado.some(t=>/iniciar\(|examenDeCapitulo\(/.test(t.f)),
  'Cerrados, «Qué estudiar hoy» no ofrece ninguna tarea de examen');
ok(hoyCerrado.some(t=>/cerrados/i.test(t.t)),'Y en su lugar dice que están cerrados');
ok(hoyCerrado.some(t=>/tarjetas|Leer/i.test(t.t)),'Estudiar y las tarjetas siguen ofreciéndose');

/* El director ve todo aunque el aparato esté cerrado, para poder probar.
   Va como función y no como IIFE, y monta y desmonta su propio estado: un await
   cede el control al resto del archivo, que es síncrono y ya había vuelto a
   abrir el interruptor. La prueba fallaba por el orden, no por la app. */
async function pruebaDirectorSobreCierre(){
  const antes=A.DB().evento;
  if(!A.DB().evento)A.alternaEvento();
  await A.activaDirector('Daniel-1844');
  ok(A.examenesCerrados()===false,'Con el perfil director activo el cierre no le aplica');
  A.salirDirector();
  ok(A.examenesCerrados()===true,'Al salir del perfil, el aparato sigue cerrado');
  if(A.DB().evento!==antes)A.alternaEvento();
}

/* normalizarDB solo acepta true: cualquier basura deja los exámenes abiertos,
   que es el estado normal de las siete semanas de estudio. */
ok(A.normalizarDB({evento:true}).evento===true,'Un aparato cerrado sigue cerrado al recargar');
ok(A.normalizarDB({evento:'si'}).evento===false,'Un valor que no es true deja los exámenes abiertos');
ok(A.normalizarDB({}).evento===false,'Sin el campo, los exámenes están abiertos');
ok(A.normalizarDB(null).evento===false,'Un aparato nuevo arranca con los exámenes abiertos');

A.alternaEvento();
ok(A.DB().evento===false&&!A.examenesCerrados(),'El interruptor los vuelve a abrir');
A.reinicia();
A.iniciar('normal');
ok(A.prueba().length>0,'Abiertos otra vez, un examen normal arranca');

/* ── el historial distingue de dónde vino cada examen ──
   Sin esto el director no puede comparar: solo los exámenes por link son el
   mismo examen para dos niños, y en la tabla se veían iguales a los normales. */
A.pintaLogros();
const hist=A.el('historial').innerHTML;
ok(/🔗/.test(hist),'El historial marca con 🔗 el examen que vino por link');
ok(/🎓/.test(hist),'El historial marca con 🎓 el simulacro');
ok(A.S().examenes.some(e=>e.modo==='compartido'),'El examen por link se registra como compartido');

/* ── liberar un link que se abrió por error ──
   Se prueba llegando a la pantalla SIN pasar por revisaLink, que es el camino
   que dejó el botón sin efecto la primera vez: aceptaLink() limpia recetaPend,
   así que el liberar no podía colgar de esa variable. */
async function pruebaLibera(){
  await A.activaDirector('Daniel-1844');
  A.ponReceta(null);
  A.S().links[String(SEM)]={pts:null,total:15,fecha:'2026-10-09'};
  A.pintaLinkUsado(A.leeReceta(A.escribeReceta(receta)));
  A.pideClaveDir('libera');
  A.el('dir-clave').value='Daniel-1844';
  await A.entraDirector();
  await new Promise(r=>setTimeout(r,20));
  ok(!A.S().links[String(SEM)],'El director libera un link aunque recetaPend esté vacío');
  ok(/Examen compartido/.test(A.el('ex-result').innerHTML),
    'Al liberarlo vuelve a salir la invitación al examen');
  A.salirDirector();
}

/* ── la clave del director ── */
(async()=>{
  await pruebaDirectorSobreCierre();
  await pruebaLibera();
  const mal=await A.activaDirector('esta-no-es');
  ok(mal!==''&&A.esDirector()===false,'Una clave equivocada no abre el perfil director');
  const vacia=await A.activaDirector('');
  ok(vacia!==''&&A.esDirector()===false,'Una clave vacía no abre el perfil director');
  const bien=await A.activaDirector('Daniel-1844');
  ok(bien===''&&A.esDirector()===true,'La clave correcta abre el perfil director');
  ok(sesion['cb-dir']==='1','El perfil queda en sessionStorage, que se borra al cerrar la pestaña');

  A.ponModo('compartido');
  ok(A.revelaRespuestas()===true,'Con el perfil director la revisión de un link se abre');
  A.salirDirector();
  ok(A.esDirector()===false&&!sesion['cb-dir'],'Salir del modo director lo cierra y limpia el rastro');
  ok(A.revelaRespuestas()===false,'Al salir, la revisión vuelve a quedar cerrada');

  /* El HTML no puede llevar la clave, solo su huella. */
  /* La clave se escribe en un celular y el teclado de iOS pone mayúscula solo:
     las tres formas tienen que entrar, o el director cree que se equivocó. */
  A.salirDirector();
  ok(await A.activaDirector('Daniel-1844')===''&&A.esDirector(),'Entra con la D mayúscula');
  A.salirDirector();
  ok(await A.activaDirector('daniel-1844')===''&&A.esDirector(),'Entra en minúsculas');
  A.salirDirector();
  ok(await A.activaDirector('  DANIEL-1844  ')===''&&A.esDirector(),'Entra con espacios de sobra y en mayúsculas');
  A.salirDirector();
  ok(await A.activaDirector('daniel1844')!==''&&!A.esDirector(),'Sin el guion NO entra: no se normaliza de más');
  ok(await A.activaDirector('daniel-1995')!==''&&!A.esDirector(),'La clave vieja ya no sirve');

  ok(!html.includes('Daniel-1844')&&!html.toLowerCase().includes('daniel-1844'),
    'La clave en texto plano NO está en el index.html, ni en minúsculas');
  ok(/CLAVE_DIR='[0-9a-f]{64}'/.test(html),'En el HTML va un SHA-256 de 64 caracteres, no la clave');

  console.log('\n'+(f===0?'CANDADO DEL SIMULACRO: TODO BIEN':f+' FALLOS'));
  process.exit(f?1:0);
})();
