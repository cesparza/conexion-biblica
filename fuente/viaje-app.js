/* ───────── VIAJE: un camino de paradas por capítulo (v266) ─────────
   Camilo (20-oct): «que sea un método más de estudio… para todo». Es un modo de
   Practicar, como Quiz o Tarjetas, y como ellos no trae material propio: sale de
   poolDe(), así que sirve igual para Daniel, Profetas y Reyes, las creencias, la
   matutina o El conflicto de los siglos, y crece cuando crece el banco.
   MECANISMO: las preguntas de opción y de verdadero/falso de un capítulo se ordenan
   por el versículo que citan y se reparten en paradas (máximo 10). Cada parada se
   abre como una escena y se responde con las mismas piezas de la pregunta del día
   (adsHTML/adsResponde): cada respuesta ya cuenta para la racha, y la fallada va a
   «Repasar mis errores». La parada se gana con el 60 %; ganarla por primera vez
   abre la siguiente y suma 10 puntos por acierto. Lo guardado: S.via[cap] (paradas
   ganadas) y S.viaPts; el servidor los funde como todo lo que solo crece. */
let viajeCap='',viajeK=-1,viajeTerminada=false;
const VIAJE_MAX=10,VIAJE_META=.6;
const viajeHechas=cap=>Number((S.via||{})[cap])||0;
const viajeVersoQ=q=>{const r=refsQ(q,q.cap);return r.length?r[0]:999;};
/** Las paradas de un capítulo, en el orden del texto. */
function viajeParadas(cap){
  const qs=poolDe().filter(q=>q.cap===cap&&(q.t==='tf'||(q.t==='mc'&&(q.o||[]).length>=2)))
    .map(q=>({q,v:viajeVersoQ(q),k:claveQ(q)})).sort((a,b)=>a.v-b.v||(a.k<b.k?-1:1));
  if(qs.length<2)return [];
  const n=Math.min(VIAJE_MAX,Math.ceil(qs.length/5)),tam=Math.ceil(qs.length/n),out=[];
  for(let i=0;i<qs.length;i+=tam){const g=qs.slice(i,i+tam),vs=g.map(x=>x.v).filter(v=>v<999);
    out.push({qs:g.map(x=>x.q),de:vs.length?Math.min(...vs):0,a:vs.length?Math.max(...vs):0});}
  return out;
}
function viajeTitulo(cap,p,k){
  const lb=libroCid(cap);
  return lb&&p.de?lb.nombre+' '+lb.n+':'+p.de+(p.a>p.de?'–'+p.a:''):'Parada '+(k+1);
}
/* Las imágenes de la lámina del capítulo, si tiene: una por parada, en rueda. */
function viajeImgs(cap){
  const L=typeof LAMINAS!=='undefined'&&LAMINAS[cap];if(!L)return [];
  const out=[],mira=o=>{if(!o||typeof o!=='object')return;for(const[k,v]of Object.entries(o)){
    if(['f','img','portada','miniF','inicioF'].includes(k)&&typeof v==='string'&&/^[\w-]+$/.test(v)&&out.indexOf(v)<0)out.push(v);
    else if(k==='imgs'&&Array.isArray(v))v.forEach(x=>out.indexOf(x)<0&&out.push(x));else if(v&&typeof v==='object')mira(v);}};
  mira(L);return out.map(f=>lamRuta(L,f));
}
const viajeCaps=()=>capsVista().filter(c=>viajeParadas(c.id).length>0);
/* El capítulo por donde seguir: el que se estaba leyendo, o el primero sin terminar. */
function viajeElige(){
  const cs=viajeCaps();if(!cs.length)return '';
  if(viajeCap&&cs.some(c=>c.id===viajeCap))return viajeCap;
  const u=cs.find(c=>c.id===S.ultItem);if(u&&viajeHechas(u.id)<viajeParadas(u.id).length)return u.id;
  return (cs.find(c=>viajeHechas(c.id)<viajeParadas(c.id).length)||cs[0]).id;
}
function irViaje(cap){viajeCap=cap||viajeElige();jgModo='viaje';jgR=null;ir('tarjetas');}
/* El camino del capítulo, dentro de Practicar (#jg-zona). */
function viajePinta(){
  const z=document.getElementById('jg-zona');if(!z)return;
  viajeCap=viajeElige();
  if(!viajeCap){z.innerHTML='<p class="nota">Este material todavía no tiene preguntas para un viaje.</p>';return;}
  const ps=viajeParadas(viajeCap),h=Math.min(viajeHechas(viajeCap),ps.length),imgs=viajeImgs(viajeCap);
  const cap=(capsVista().find(c=>c.id===viajeCap)||{label:viajeCap});
  const X=[50,74,38,22,56,80,60,30,46,70];
  z.innerHTML='<div class="via-cab"><label class="via-sel">'+IC('mapa')+'<select id="viaCap" onchange="viajeCap=this.value;viajePinta()" aria-label="Capítulo del viaje">'+
    viajeCaps().map(c=>'<option value="'+c.id+'"'+(c.id===viajeCap?' selected':'')+'>'+esc(c.label)+' · '+Math.min(viajeHechas(c.id),viajeParadas(c.id).length)+'/'+viajeParadas(c.id).length+'</option>').join('')+'</select></label>'+
    '<div class="via-stats"><span title="Días seguidos">'+IC('fuego')+'<b>'+(S.racha||0)+'</b> días</span><span title="Puntos del viaje">'+IC('trofeo')+'<b>'+(S.viaPts||0)+'</b> pts</span>'+
    '<span><b>'+h+'</b>/'+ps.length+' paradas</span></div></div>'+
    '<div class="via-camino" style="--n:'+ps.length+'"><svg class="via-svg" aria-hidden="true"></svg>'+
    ps.map((p,k)=>{const est=k<h?'hecha':k===h?'ahora':'cerrada',im=imgs.length?imgs[k%imgs.length]:'';
      return '<button type="button" class="via-nodo '+est+'" style="--x:'+X[k%X.length]+'%;--y:'+k+'" onclick="viajeAbre('+k+')"'+
        ' aria-label="'+esc(viajeTitulo(viajeCap,p,k))+(est==='hecha'?', ganada':est==='ahora'?', la siguiente':', se abre al ganar la anterior')+'">'+
        (est==='ahora'?'<span class="via-ya">'+(h?'SIGUE':'EMPIEZA')+'</span>':'')+
        '<span class="via-disco"'+(im?' style="background-image:url(\''+im+'\')"':'')+'>'+(im?'':'<b>'+(k+1)+'</b>')+'</span>'+
        '<small>'+esc(viajeTitulo(viajeCap,p,k))+'</small></button>';}).join('')+'</div>'+
    (h>=ps.length?'<p class="via-fin">'+IC('trofeo')+' Terminaste el viaje de '+esc(cap.label)+'. Puedes repetir cualquier parada.</p>':'');
  requestAnimationFrame(viajeLinea);
}
/* La línea entre las paradas: gris la que falta, dorada la recorrida. */
function viajeLinea(){
  const c=document.querySelector('.via-camino'),svg=c&&c.querySelector('.via-svg');if(!svg)return;
  const r=c.getBoundingClientRect(),ns=[...c.querySelectorAll('.via-disco')].map(d=>{const b=d.getBoundingClientRect();return [b.left-r.left+b.width/2,b.top-r.top+b.height/2];});
  if(ns.length<2){svg.innerHTML='';return;}
  const tramo=(a,b)=>'M'+a[0]+' '+a[1]+' C '+a[0]+' '+(a[1]+60)+', '+b[0]+' '+(b[1]-60)+', '+b[0]+' '+b[1];
  const h=c.querySelectorAll('.via-nodo.hecha').length;
  svg.setAttribute('viewBox','0 0 '+r.width+' '+r.height);
  svg.innerHTML=ns.slice(1).map((b,i)=>'<path class="'+(i<h?'si':'no')+'" d="'+tramo(ns[i],b)+'"/>').join('');
}
if(typeof addEventListener==='function')addEventListener('resize',()=>{if(jgModo==='viaje')viajeLinea();});
/* Una parada: la escena y sus preguntas. */
function viajeAbre(k){
  const ps=viajeParadas(viajeCap),p=ps[k];if(!p)return;
  if(k>viajeHechas(viajeCap)){const n=document.querySelectorAll('.via-nodo')[k];if(n){n.classList.remove('nop');void n.offsetWidth;n.classList.add('nop');}return;}
  viajeK=k;viajeTerminada=false;
  const imgs=viajeImgs(viajeCap),im=imgs.length?imgs[k%imgs.length]:'',v=versoDeQ(p.qs[0]);
  let el=document.getElementById('viaEsc');
  if(!el){el=document.createElement('div');el.id='viaEsc';el.className='via-esc';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');document.body.appendChild(el);
    el.addEventListener('click',()=>setTimeout(viajeMira,0));}
  el.setAttribute('aria-label',viajeTitulo(viajeCap,p,k));
  el.innerHTML='<button type="button" class="via-x" onclick="viajeCierra()" aria-label="Cerrar">'+IC('x')+'</button>'+
    '<div class="via-img'+(im?'':' sin')+'">'+(im?'<i style="background-image:url(\''+im+'\')"></i>':'')+'<div class="via-tx"><span class="via-rot">'+
    esc((capsVista().find(c=>c.id===viajeCap)||{label:''}).label)+' · parada '+(k+1)+' de '+ps.length+'</span>'+
    '<h2>'+esc(viajeTitulo(viajeCap,p,k))+'</h2>'+(v?'<p class="via-verso">«'+esc(v.txt)+'» <cite>'+esc(v.ref)+'</cite></p>':'')+'</div></div>'+
    '<div class="via-reto">'+adsHTML(p.qs,'Gana la parada: '+Math.ceil(p.qs.length*VIAJE_META)+' de '+p.qs.length)+'<div id="viaRes" aria-live="polite"></div></div>';
  el.hidden=false;document.body.classList.add('leyendo');
  requestAnimationFrame(()=>el.classList.add('on'));
  const b=el.querySelector('.ads-op');if(b&&b.focus)b.focus({preventScroll:true});
}
/* Después de cada respuesta: ¿ya respondió todas? */
function viajeMira(){
  const el=document.getElementById('viaEsc');if(!el||el.hidden||viajeTerminada)return;
  const qs=[...el.querySelectorAll('.ads-q')];if(!qs.length||!qs.every(q=>q.classList.contains('hecha')))return;
  viajeTerminada=true;
  const bien=qs.filter(q=>q.classList.contains('ok')).length,meta=Math.ceil(qs.length*VIAJE_META),gana=bien>=meta;
  const ps=viajeParadas(viajeCap),nueva=gana&&viajeK===viajeHechas(viajeCap);
  if(nueva){S.via=Object.assign({},S.via||{});S.via[viajeCap]=viajeK+1;S.viaPts=(Number(S.viaPts)||0)+10*bien;guardar();}
  const r=document.getElementById('viaRes');
  if(r)r.innerHTML='<div class="via-res '+(gana?'si':'no')+'"><b>'+(gana?(nueva?'¡Parada ganada! +'+(10*bien)+' pts':'¡Bien! Otra vez la ganaste'):'Casi: '+bien+' de '+qs.length+'. Necesitas '+meta+'.')+'</b>'+
    '<span>'+(gana?(viajeK+1<ps.length?'Se abrió la parada '+(viajeK+2)+'.':'Terminaste el viaje del capítulo.'):'Las que fallaste ya están en «Repasar mis errores».')+'</span>'+
    '<div class="via-bots">'+(gana&&viajeK+1<ps.length?'<button type="button" class="btn tono" onclick="viajeAbre('+(viajeK+1)+')">Siguiente parada</button>':'')+
    (!gana?'<button type="button" class="btn tono" onclick="viajeAbre('+viajeK+')">Intentar otra vez</button>':'')+
    '<button type="button" class="btn txt" onclick="viajeCierra()">Volver al camino</button></div></div>';
  if(gana)festeja(viajeK+1>=ps.length?'fuegos':'confeti',nueva?'+'+(10*bien)+' pts':'');
  festejaRacha(gana?2600:0);
  const f=r&&r.querySelector('button');if(f&&f.focus)f.focus({preventScroll:true});
}
function viajeCierra(){
  const el=document.getElementById('viaEsc');if(!el)return;
  el.classList.remove('on');el.hidden=true;el.innerHTML='';document.body.classList.remove('leyendo');
  if(jgModo==='viaje')viajePinta();
}
if(typeof document!=='undefined')document.addEventListener('keydown',e=>{const el=document.getElementById('viaEsc');if(e.key==='Escape'&&el&&!el.hidden)viajeCierra();});
