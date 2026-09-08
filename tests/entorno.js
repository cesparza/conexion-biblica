/* Entorno compartido de las pruebas: el JS real del index.html montado sobre un
   stub mínimo del navegador.

   POR QUÉ EXISTE ESTE ARCHIVO
   Había CUATRO copias del mismo stub, una por suite más una mini dentro de
   test.js. Agregar `setAttribute` obligó a parchear dos, la tercera reventó
   después con el mismo error, y la cuarta nadie la miró. Es exactamente el olor
   que este proyecto persigue en la app: varios mecanismos para un concepto, y
   una función que existe solo para tapar la diferencia.

   QUÉ NO VIVE AQUÍ
   La lista de lo que cada suite exporta de la app (el `return {...}`). Esa no es
   duplicación: es la superficie que cada suite necesita, y meterla aquí volvería
   este archivo el catálogo de todo.

   EL STUB ES SUPERCONJUNTO, A PROPÓSITO
   Trae `sessionStorage`, `location` e `history` aunque solo el simulacro los use.
   Un stub por caso es lo que produjo las cuatro copias; que la suite reciba de
   más no le hace daño y evita la quinta. */
const fs=require('fs'), path=require('path');

const RAIZ=path.join(__dirname,'..');
const FUENTE=f=>path.join(RAIZ,'fuente',f);

/** El HTML desplegado y su JS. Se leen UNA vez por proceso: las pruebas afirman
 *  sobre lo que se SIRVE, no sobre las fuentes. */
const HTML=fs.readFileSync(path.join(RAIZ,'index.html'),'utf8');
const JS=HTML.match(/<script>([\s\S]*)<\/script>/)[1];

/** Un nodo del DOM con lo mínimo que la app le pide.
 *  `attrs` guarda lo que el código pone con setAttribute (el aria-label de la
 *  ficha de identidad, por ejemplo) para poder afirmar sobre eso. */
const nodo=()=>({classList:{add(){},remove(){},toggle(){}},value:'',textContent:'',
  innerHTML:'',style:{},outerHTML:'',focus(){},hidden:false,attrs:{},
  setAttribute(k,v){this.attrs[k]=String(v);},getAttribute(k){return this.attrs[k];},
  getBoundingClientRect(){return {x:0,y:0,top:0,left:0,right:0,bottom:0,width:0,height:0};}});

/* getElementById devuelve siempre el MISMO nodo por id. Antes devolvía uno nuevo
   cada vez, así que un valor escrito en un campo no se podía volver a leer y el
   recorrido de la bienvenida no era comprobable.
   querySelectorAll devuelve un arreglo de verdad porque el código INDEXA el
   resultado (los botones del nav), no solo lo recorre. */
const STUB=`
let localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
let sessionStorage={getItem:k=>sesion[k]||null,setItem:(k,v)=>{sesion[k]=v},removeItem:k=>{delete sesion[k]}};
let cacheEl={};
let document={
  body:nodo(),
  querySelectorAll:()=>[nodo(),nodo(),nodo(),nodo(),nodo()],
  getElementById:id=>(cacheEl[id]=cacheEl[id]||nodo()),
  querySelector:()=>nodo(),
  addEventListener(){},
};
let window={scrollTo(){}};
let setInterval=()=>0, clearInterval=()=>{}, setTimeout=()=>0, clearTimeout=()=>{}, confirm=()=>true;
let navigator={};
let history={replaceState(){}};
let location={href:'https://conexion-biblica.pages.dev/',hash:''};
let Blob=function(){}, URL={createObjectURL:()=>'blob:x'};
let btoa=s=>Buffer.from(s,'binary').toString('base64');
let atob=s=>Buffer.from(s,'base64').toString('binary');
`;

/**
 * Monta la app y devuelve lo que pida `ret`.
 * @param {string} ret Cuerpo del objeto a devolver, sin las llaves.
 * @param {{store?:object, sesion?:object, antes?:string}} [op]
 *        `store` y `sesion` son los respaldos que la suite quiere inspeccionar
 *        o reutilizar; `antes` es código que se inyecta ENTRE el stub y la app
 *        (por ejemplo un sintetizador de voz de mentiras).
 */
function montar(ret, op){
  op=op||{};
  const store=op.store||{}, sesion=op.sesion||{};
  const fn=new Function('store','sesion','nodo','Buffer',
    STUB+(op.antes||'')+JS+'\nreturn {'+ret+'};');
  return fn(store,sesion,nodo,Buffer);
}

module.exports={RAIZ,FUENTE,HTML,JS,nodo,STUB,montar};
