/* v272 (Camilo, 7-nov: «la experiencia de los 1260 días no es muy fluida… quiero
   una experiencia muy superior», y «lo mismo para Daniel 11 y 12»): el modo
   historias. Una escena por pantalla; se avanza tocando o deslizando, como las
   historias del teléfono. Las animaciones corren solas y las escenas con pregunta
   esperan la respuesta. Lo usan las láminas con `historias:true`; los datos son
   los mismos del cine (laminas.js), aquí solo cambia la forma de recorrerlos.
   Todo vive dentro de HIST: el resto de la app solo ve abre, activa, tecla,
   irActo, irNumero y cierra. Clases con prefijo h- para no chocar con la app. */
const HIST=(()=>{
const H=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pars=t=>String(t||'').split(/\n\s*\n/).filter(Boolean).map(p=>'<p>'+H(p)+'</p>').join('');
const COL=['#5fb3ff','#e8b45a','#ff7a6b'];
let L=null,CID='',S=[],G=[],cur=-1,abierto=false,PUNTOS=0,raiz=null,x0=null,y0=null,t0=0;
const img=n=>lamRuta(L,n);
const vv=v=>v&&v.t!=null?v:cineVerso(v);
/* El versículo n de un capítulo, sin las comillas de la tabla. */
function parte(cap,n){const t=tablaDeCid(cap);return t?String(t.mapa[n]||'').replace(/^[«»”“"\s]+|[«»”“"\s]+$/g,''):''}
function marca(t,claves){if(!claves)return t;let r=t;claves.forEach(k=>{const w=k.replace(/[,.]$/,'');const re=new RegExp('(^|[^\\wáéíóúñ])('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![\\wáéíóúñ])','i');r=r.replace(re,'$1<mark>$2</mark>')});return r}
function verso(v,d,claves,chico){v=vv(v);return `<p class="h-ver h-a" style="--d:${d}${chico?';font-size:17px':''}">«${marca(H(v.t),claves)}»<span class="h-ref">${H(v.ref)}</span></p>`}
function egws(l,d){return (l||[]).map((e,i)=>`<div class="h-egw h-a" style="--d:${d+i*.25}">«${H(e.t)}»<small>${e.fuente}</small></div>`).join('')}
function fondo(n,pos){return n?`<div class="h-fondo" style="background-image:url('${img(n)}');${pos?'background-position:'+pos:''}"></div><div class="h-velo"></div>`:''}
const limpiaF=t=>H(String(t).replace(/ · Consulta externa[\s\S]*/,'').replace('Humberto Raúl Treiyer Blank','Humberto R. Treiyer')).replace('Enigmas descifrados (2006, tercera impresión 2007)','<i>Enigmas descifrados</i>');

function grupo(t,im,id){G.push({t,n:0,img:im,id,primero:S.length});return G.length-1}
function add(g,o){o.g=g;o.k=G[g].n++;S.push(o)}
function preguntaHTML(rot,q,o){return `<div class="h-panel h-centro"><p class="h-rot h-a">${rot}</p><p class="h-q h-a" style="--d:.1">${H(q)}</p><div class="h-ops h-a" style="--d:.25">${o.map((x,j)=>`<button type="button" class="h-op" data-j="${j}">${H(x)}</button>`).join('')}</div><p class="h-resp"></p></div>`}
function initPregunta(el,p,cuenta){
 const r=el.querySelector('.h-resp');let hecho=false,primero=true;
 el.querySelectorAll('.h-op').forEach(b=>b.onclick=e=>{e.stopPropagation();if(hecho)return;const j=+b.dataset.j;
  if(j===p.ok){b.classList.add('h-bien');hecho=true;if(cuenta&&primero)PUNTOS++;r.innerHTML=(primero?'¡Bien! ':'Así es. ')+H(p.e);libera()}
  else{b.classList.add('h-mal');primero=false;r.textContent='Todavía no. Prueba otra.';setTimeout(()=>b.classList.remove('h-mal'),400)}});
}
function finalHTML(total,texto){return `<div class="h-panel h-centro"><p class="h-rot h-a">Repaso</p><div class="h-logro h-a" style="--d:.1"><span class="h-pts">0</span> / ${total}</div><p class="h-ver h-a" style="--d:.4">${texto}</p><div class="h-a" style="--d:.7"><button type="button" class="h-boton h-otra">Ver otra vez</button><button type="button" class="h-boton h-sec h-salir">Cerrar</button></div></div>`}
function initFinal(el){el.querySelector('.h-pts').textContent=PUNTOS;el.querySelector('.h-otra').onclick=e=>{e.stopPropagation();PUNTOS=0;ir(0)};el.querySelector('.h-salir').onclick=e=>{e.stopPropagation();lamCierra()}}

/* ---------- tipos del cine que se reusan ---------- */
function viaSlides(g,a,NOM){
 const es=a.estaciones;
 es.forEach((e,i)=>{
  let cab;
  if(NOM){const vistos=[...new Set(NOM.slice(0,i+1))];cab=`<div class="h-colec h-a">${['1.260 días','Tiempo, tiempos y la mitad','42 meses'].map(x=>`<span class="${x===NOM[i]?'h-nuevo':vistos.includes(x)?'h-ya':''}">${x}</span>`).join('')}</div>`}
  else cab=`<div class="h-mini h-a">${['',...es].map((_,j)=>`${j?`<i class="${j<=i+1?'h-ya':''}"></i>`:''}<b class="${j<i+1?'h-ya':j===i+1?'h-aqui':''}"></b>`).join('')}</div><div class="h-mini-l h-a"><span>${H(a.inicio)}</span>${es.map(x=>`<span>${H(x.fecha)}</span>`).join('')}</div>`;
  add(g,{img:e.img,html:`<div class="h-panel">${cab}<span class="h-chip h-a" style="--d:.15">${H(e.fecha)}</span><p class="h-rot h-a" style="--d:.25">${e.rot}</p>${verso(e.v,.45,NOM?['mil doscientos sesenta días','cuarenta y dos meses','un tiempo, tiempos y la mitad de un tiempo']:null)}${e.nota?`<p class="h-nota h-a" style="--d:.9">${e.nota}${e.fuente?`<span class="h-fuente">${e.fuente}</span>`:''}</p>`:''}${egws(e.egw,1.1)}</div>`});
 });
}
function selloSlides(g,a){
 add(g,{img:a.img,html:`<div class="h-panel"><p class="h-rot h-a">${a.rot}</p><div class="h-sello">${H(a.fecha)}<em>${H(a.era)}</em></div>${verso(a.v,.9,a.clave)}${(a.otros||[]).map((o,i)=>`<p class="h-ver h-a" style="--d:${1.4+i*.3};font-size:17px">«${H(o.t)}»<span class="h-ref">${H(o.ref)} · ${H(o.ver)}</span></p>`).join('')}</div>`});
 if(a.egw||a.explica)add(g,{img:a.img,html:`<div class="h-panel"><p class="h-rot h-a">${a.rot} · ${H(a.fecha)} ${H(a.era)}</p>${egws(a.egw,.2)}${a.explica?`<p class="h-nota h-a" style="--d:${.5+(a.egw||[]).length*.25}">${a.explica}</p>`:''}</div>`});
}
function luzSlides(g,a){
 add(g,{img:a.imgs[0],html:`<div class="h-panel"><p class="h-rot h-a" style="--d:.2">${a.rot}</p>${a.cartel?`<h2 class="h-cartel h-a" style="--d:.5">${H(a.cartel)}</h2>`:verso(a.v,.4,a.clave)}</div>`});
 if(a.cartel)add(g,{img:a.imgs[1]||a.imgs[0],pos:a.foco2,html:`<div class="h-panel"><p class="h-rot h-a">${a.rot}</p>${verso(a.v,.3,a.clave)}</div>`});
}

/* =========== Los 1.260 años =========== */
function arma1260(D){
 const NOM=['1.260 días','Tiempo, tiempos y la mitad','42 meses','1.260 días','42 meses'];
 {const g=grupo('Inicio',D.portada,D.actos[0].id);add(g,{img:D.portada,html:`<div class="h-panel h-portada"><p class="h-rot h-a" style="--d:.1">Artículo</p><h1 class="h-cartel h-a" style="--d:.25">${H(D.libro)}</h1><p class="h-ver h-a" style="--d:.5">${H(D.titulo)}</p><p class="h-inv h-a" style="--d:.8">Toca la derecha para avanzar, la izquierda para volver. Toca el título de arriba para saltar a una escena.</p></div>`})}
 D.actos.forEach(a=>{
  const g=grupo(a.corto,a.img||(a.imgs&&a.imgs[0])||(a.estaciones&&a.estaciones[0].img),a.id);
  if(a.tipo==='luz')luzSlides(g,a);
  else if(a.tipo==='diluvio'){
   add(g,{img:a.img,bloquea:true,html:preguntaHTML(a.rot+' · piensa primero',a.piensa.q,a.piensa.o),init:el=>initPregunta(el,{ok:a.piensa.ok,e:a.piensa.r})});
   add(g,{img:a.img,bloquea:true,html:`<div class="h-panel"><p class="h-rot h-a">${a.rot}</p><p class="h-q h-a" style="--d:.15">Mueve el mes: del mes ${a.desde} al mes ${a.hasta}.</p>
    <div class="h-dil h-a" style="--d:.3"><div class="h-agua"></div><div class="h-num"><b>0</b><span>días · mes ${a.desde}</span></div></div>
    <input class="h-rango h-a" style="--d:.4" type="range" min="${a.desde}" max="${a.hasta}" step="0.01" value="${a.desde}" aria-label="Mes">
    <div class="h-meses h-a" style="--d:.4">${[...Array(a.hasta-a.desde+1)].map((_,i)=>`<span>mes ${a.desde+i}</span>`).join('')}</div>
    <div class="h-gen"></div><p class="h-resp"></p></div>`,init:el=>initDiluvio(el,a)});
  }
  else if(a.tipo==='balanza'){
   add(g,{bloquea:true,solo:true,html:preguntaHTML(a.rot+' · piensa primero',a.piensa.q,a.piensa.o),init:el=>initPregunta(el,{ok:a.piensa.ok,e:a.piensa.r})});
   add(g,{bloquea:true,solo:true,html:`<div class="h-panel h-centro"><p class="h-rot h-a">${a.rot}</p><p class="h-q h-a" style="--d:.1">${H(a.instruye)}</p>
    <div class="h-bal h-a" style="--d:.25"><div class="h-pie"></div><div class="h-brazo"><div class="h-plato h-l">1.260</div><div class="h-plato h-r">0</div></div></div>
    <div class="h-fichas h-a" style="--d:.4">${a.fichas.map((f,i)=>`<button type="button" class="h-ficha" data-i="${i}">${H(f.t)}<small>${H(f.s)}</small></button>`).join('')}</div>
    <p class="h-suma">Toca las piezas para ponerlas en la balanza.</p><p class="h-resp"></p></div>`,init:el=>initBalanza(el,a)});
  }
  else if(a.tipo==='cuenta'){
   add(g,{solo:true,html:`<div class="h-panel h-centro"><p class="h-rot h-a">${a.rot}</p>
    <div class="h-cont h-a" style="--d:.1"><span>0</span><small>días</small></div>
    <div class="h-leyenda h-a" style="--d:.15">${a.nombres.map((n,i)=>`<span><i style="background:${COL[i]}"></i>${H(n)}</span>`).join('')}</div>
    <canvas class="h-reja h-a" style="--d:.2"></canvas>
    <p class="h-equiv h-a" style="--d:3.6">${H(a.de)} ${H(a.uniIni)} = ${a.a.toLocaleString('es-CO')} ${H(a.uniFin)}</p>
    ${verso(a.v,3.9,['tiempo, tiempos y medio tiempo'])}</div>`,init:el=>initCuenta(el,a)});
  }
  else if(a.tipo==='via')viaSlides(g,a,a.id==='nombres'?NOM:null);
  else if(a.tipo==='sello')selloSlides(g,a);
  else if(a.tipo==='barra'){
   add(g,{solo:true,html:`<div class="h-panel h-centro"><p class="h-rot h-a">${a.rot}</p><h2 class="h-cartel h-a" style="--d:.1;font-size:clamp(28px,7.5vw,46px)">${H(a.cartel)}</h2>
    ${(a.barras||[]).map((b,i)=>`<div class="h-bb ${i?'h-dos':'h-uno'} h-a" style="--d:${.3+i*.2}"><div class="h-t">${H(b.t)}</div><div class="h-pista"><div class="h-lleno" data-desde="${b.desde}" style="left:${b.desde*100}%"><span>${H(b.de)}</span><span>${H(b.a)}</span></div><div class="h-raya"></div></div></div>`).join('')}
    <p class="h-subsum h-a" style="--d:2.4">${H(a.sub)}</p>${verso(a.v,2.7,['mil doscientos noventa días'])}${a.nota?`<p class="h-nota h-a" style="--d:3.1">${a.nota}<span class="h-fuente">${a.fuente||''}</span></p>`:''}</div>`,
    init:el=>setTimeout(()=>el.querySelectorAll('.h-lleno').forEach(b=>b.style.width=(100-b.dataset.desde*100)+'%'),900)});
  }
  else if(a.tipo==='repaso'){
   a.preguntas.forEach((p,i)=>add(g,{solo:true,bloquea:true,html:preguntaHTML(H(a.cartel)+' · '+(i+1)+' de '+a.preguntas.length,p.q,p.o),init:el=>initPregunta(el,p,true)}));
   add(g,{solo:true,html:finalHTML(a.preguntas.length,'Tiempo, tiempos y la mitad de un tiempo · 1.260 días · 42 meses: tres maneras de decir el mismo período, de 538 a 1798.'),init:initFinal});
  }
 });
}
function initDiluvio(el,a){
 const rg=el.querySelector('.h-rango'),ag=el.querySelector('.h-agua'),nb=el.querySelector('.h-num b'),ns=el.querySelector('.h-num span'),gen=el.querySelector('.h-gen'),r=el.querySelector('.h-resp');let ok=false;
 const cita=o=>`<div class="h-egw">«${H(o.t)}»<small>${H(o.ref)} · ${H(o.ver)}</small></div>`;
 gen.innerHTML=cita(a.otros[0]);
 rg.oninput=()=>{const m=+rg.value,d=Math.round((m-a.desde)*30);nb.textContent=d;ns.textContent='días · mes '+Math.floor(m+.001);ag.style.height=(8+(m-a.desde)/(a.hasta-a.desde)*80)+'%';
  if(m>=a.hasta-.02&&!ok){ok=true;rg.value=a.hasta;nb.textContent=a.dias;gen.innerHTML+=cita(a.otros[1]);r.innerHTML='<b>150 ÷ 5 = 30.</b> '+H(a.cierre);libera();setTimeout(()=>{const p=el.querySelector('.h-panel');if(p)p.scrollTo({top:9e3,behavior:'smooth'})},100)}};
}
function initBalanza(el,a){
 const puestas=new Set(),br=el.querySelector('.h-brazo'),pr=el.querySelector('.h-plato.h-r'),su=el.querySelector('.h-suma'),r=el.querySelector('.h-resp');let ok=false;
 el.querySelectorAll('.h-ficha').forEach(b=>b.onclick=e=>{e.stopPropagation();if(ok)return;const i=+b.dataset.i;puestas.has(i)?puestas.delete(i):puestas.add(i);b.classList.toggle('h-puesta');
  const s=[...puestas].reduce((t,i)=>t+a.fichas[i].d,0);pr.textContent=s.toLocaleString('es-CO');
  const dif=Math.max(-1,Math.min(1,(s-a.meta)/a.meta));br.style.transform=`rotate(${(dif*12).toFixed(1)}deg)`;
  const ps=[...puestas].sort().map(i=>a.fichas[i].d.toLocaleString('es-CO'));
  if(s===a.meta){ok=true;su.className='h-suma h-ok';su.textContent=ps.join(' + ')+' = 1.260 ✓';r.textContent=a.exito;libera()}
  else{su.className='h-suma';su.textContent=ps.length?ps.join(' + ')+' = '+s.toLocaleString('es-CO')+(s>a.meta?' · te pasaste, quita una':' · falta'):'Toca las piezas para ponerlas en la balanza.'}});
}
function initCuenta(el,a){
 const cv=el.querySelector('canvas'),ctx=cv.getContext&&cv.getContext('2d'),num=el.querySelector('.h-cont span'),ley=el.querySelectorAll('.h-leyenda span');if(!ctx)return;
 const w=cv.clientWidth||320,ht=Math.max(140,Math.min(w*.55,innerHeight*.3)),cols=Math.ceil(Math.sqrt(a.a*w/ht)),rows=Math.ceil(a.a/cols),cel=w/cols,dpr=devicePixelRatio||1,h=rows*cel;
 cv.width=w*dpr;cv.height=h*dpr;cv.style.height=h+'px';ctx.scale(dpr,dpr);
 const lim=[];let acc=0;a.tramos.forEach(t=>{acc+=t;lim.push(acc)});
 ctx.fillStyle='#ffffff14';for(let i=0;i<a.a;i++){const x=i%cols,y=i/cols|0;ctx.fillRect(x*cel+1,y*cel+1,cel-2,cel-2)}
 let hecho=0;const T=quieto()?1:3000,ini=performance.now()+300;
 function paso(t){if(!S[cur]||S[cur].el!==el)return;const f=Math.max(0,Math.min(1,(t-ini)/T)),n=Math.round(a.a*(1-Math.pow(1-f,2)));
  for(let i=hecho;i<n;i++){const k=lim.findIndex(l=>i<l);ctx.fillStyle=COL[k];const x=i%cols,y=i/cols|0;ctx.fillRect(x*cel+1,y*cel+1,cel-2,cel-2)}
  hecho=n;num.textContent=n.toLocaleString('es-CO');ley.forEach((s,k)=>s.classList.toggle('h-on',n>(k?lim[k-1]:0)));
  if(f<1)requestAnimationFrame(paso)}
 requestAnimationFrame(paso);
}

/* =========== Daniel 11: escena, versículo por versículo, explicación, pregunta =========== */
function armaD11(D){
 const DIN=typeof HIST_DIN!=='undefined'?HIST_DIN:null,P={};if(DIN)DIN.p.forEach(p=>P[p.id]=p);
 {const g=grupo('Inicio',D.portada,D.actos[0].id);add(g,{img:D.portada,html:`<div class="h-panel h-portada"><p class="h-rot h-a" style="--d:.1">${H(D.libro)} · 45 versículos · ${D.actos.length} escenas</p><h1 class="h-cartel h-a" style="--d:.25;font-size:clamp(36px,10vw,64px)">${H(D.titulo)}</h1><p class="h-inv h-a" style="--d:.6">Cada escena: lo que pasa, el texto versículo por versículo, cómo se entiende y una pregunta para pensar. Toca el título de arriba para saltar a cualquier escena.</p></div>`})}
 D.actos.forEach(a=>{
  const g=grupo(a.corto,a.img,a.id),vs=a.versos,refc='11:'+vs[0]+(vs[1]>vs[0]?'-'+vs[1]:'');
  const fts=`<p class="h-fnts">${(a.fuentes||[]).map(f=>limpiaF(f.titulo)).join(' · ')}</p>`;
  add(g,{img:a.img,html:`<div class="h-panel"><span class="h-chip h-a" style="--d:.1">Daniel ${refc}</span><p class="h-rot h-a" style="--d:.2">${H(a.rot)}</p><h2 class="h-titesc h-a" style="--d:.35">${H(a.titulo)}</h2><p class="h-relato h-a" style="--d:.7">${H(a.relato)}</p></div>`});
  (a.frases||[]).forEach((f,fi)=>{
   const vt=parte(a.v.cap,f.verso),pos=['30% center','70% center','50% 30%'][fi%3];
   const cab=`<div class="h-nver h-a">${f.verso}<small>DANIEL 11</small></div><p class="h-clave h-a" style="--d:.15">${H(f.clave)}</p>`,fte=f.fuente?`<p class="h-fnts h-a" style="--d:.8">${limpiaF(f.fuente)}</p>`:'';
   if(vt.length+String(f.explicacion).length<520)add(g,{img:a.img,pos,html:`<div class="h-panel">${cab}<p class="h-ver h-a" style="--d:.3;font-size:19px">«${H(vt)}»</p><div class="h-exp h-a" style="--d:.6">${pars(f.explicacion)}</div>${fte}</div>`});
   else{add(g,{img:a.img,pos,html:`<div class="h-panel">${cab}<p class="h-ver h-a" style="--d:.3">«${H(vt)}»</p></div>`});
    add(g,{img:a.img,pos,oscuro:true,html:`<div class="h-panel"><p class="h-rot h-a">Daniel 11:${f.verso} · ${H(f.clave)}</p><div class="h-exp h-a" style="--d:.15;margin-top:0;font-size:17px">${pars(f.explicacion)}</div>${fte}</div>`});}
  });
  if(a.mapa){
   const m=a.mapa;
   add(g,{solo:true,bloquea:true,html:`<div class="h-panel h-centro"><p class="h-rot h-a">${refc} · el norte y el sur se miden desde Judea</p><p class="h-q h-a" style="--d:.1">Toca cada región.</p>
    <div class="h-mapa h-a" style="--d:.2"><button type="button" class="h-zona h-n" data-z="norte">${H(m.norte.titulo)}<small>al norte de Judea</small></button><button type="button" class="h-zona h-c" data-z="centro">${H(m.centro.titulo)}<small>la tierra del pueblo de Daniel</small></button><button type="button" class="h-zona h-s" data-z="sur">${H(m.sur.titulo)}<small>al sur de Judea</small></button></div>
    <div class="h-info h-a" style="--d:.3"></div></div>`,init:el=>{const vis=new Set();el.querySelectorAll('.h-zona').forEach(b=>b.onclick=e=>{e.stopPropagation();el.querySelectorAll('.h-zona').forEach(x=>x.classList.toggle('h-sel',x===b));const z=m[b.dataset.z];el.querySelector('.h-info').innerHTML=`<div class="h-revela"><b>${H(z.titulo)}</b>${H(z.texto)}</div>`;vis.add(b.dataset.z);if(vis.size===3)libera()})}});
  }
  if(DIN&&(a.id==='d11-dinastias'||a.id==='d11-rafia')){
   const etapas=a.id==='d11-dinastias'?DIN.e.slice(0,3):DIN.e.slice(3);
   etapas.forEach(et=>add(g,{img:a.img,html:dinHTML(et,P,DIN),init:el=>initDin(el,et,P,DIN)}));
  }
  const ps=String(a.explica||'').split(/\n\s*\n/).filter(Boolean);
  ps.slice(0,-1).forEach((p,pi)=>add(g,{img:a.img,oscuro:true,html:`<div class="h-panel"><p class="h-rot h-a">Cómo se entiende · ${refc} · ${pi+1} de ${ps.length}</p><div class="h-exp h-a" style="--d:.15;margin-top:0;font-size:17px"><p>${H(p)}</p></div></div>`}));
  add(g,{img:a.img,oscuro:true,html:`<div class="h-panel"><p class="h-rot h-a">Cómo se entiende · ${refc}${ps.length>1?' · '+ps.length+' de '+ps.length:''}</p><div class="h-exp h-a" style="--d:.15;margin-top:0;font-size:17px"><p>${H(ps[ps.length-1])}</p></div>${a.profundiza?`<button type="button" class="h-mas h-a" style="--d:.4">Más a fondo</button><div class="h-exp h-oculto">${pars(a.profundiza)}</div>`:''}${fts}</div>`,
   init:el=>{const b=el.querySelector('.h-mas');if(b)b.onclick=e=>{e.stopPropagation();const d=el.querySelector('.h-oculto');d.classList.remove('h-oculto');d.classList.add('h-revela');b.remove();setTimeout(()=>d.scrollIntoView({behavior:'smooth',block:'start'}),50)}}});
  if(a.huellas)add(g,{img:a.img,html:`<div class="h-panel"><p class="h-rot h-a">Lo mismo en otros capítulos</p>${a.huellas.map((h,i)=>`<div class="h-huella h-a" style="--d:${.15+i*.25}"><b>${H(h.titulo)}</b>${H(h.texto)}</div>`).join('')}</div>`});
  if(a.cita){const c=a.cita,en=c.idioma==='en';
   add(g,{img:a.img,html:`<div class="h-panel"><p class="h-rot h-a">Testimonio · ${refc}</p><div class="h-egw h-a" style="--d:.2;font-size:18px">«${H(en?c.traduccion:c.texto)}»<small>${H(String(c.referencia).replace(/; PDF local[^;]*/,''))}${en?' · traducción del original en inglés':''}</small></div></div>`});}
  if(a.pregunta)add(g,{img:a.img,bloquea:true,html:`<div class="h-panel h-centro"><p class="h-rot h-a">Para pensar · ${refc}</p><p class="h-q h-a" style="--d:.15">${H(a.pregunta.q)}</p><p class="h-nota h-a" style="--d:.3">Piénsalo o dilo en voz alta antes de ver la pauta.</p><button type="button" class="h-boton h-a" style="--d:.45">Ver la pauta</button><div class="h-exp h-oculto">${pars(a.pregunta.respuesta)}</div></div>`,
   init:el=>{const b=el.querySelector('.h-boton');b.onclick=e=>{e.stopPropagation();const d=el.querySelector('.h-oculto');d.classList.remove('h-oculto');d.classList.add('h-revela');b.remove();libera()}}});
 });
 const hilo=[...(D.partes||[])];const t=(D.cmpExtra||[])[0];if(t)hilo.splice(hilo.length-1,0,t);
 if(hilo.length){const g=grupo('El hilo del capítulo',D.portada,'hilo');
  add(g,{solo:true,bloquea:true,html:ordenaHTML(hilo,'Daniel 11 de principio a fin','Toca los poderes en el orden en que aparecen en el capítulo.'),init:el=>initOrdena(el,hilo)});}
}
const nombreP=(P,id)=>P[id]?P[id].nombre:id;
function dinHTML(et,P,DIN){
 const rey=(id,c)=>`<button type="button" class="h-rey ${c==='n'?'h-n':'h-s'}${et.foco===id?' h-foco':''}" data-p="${id}"><small>${c==='n'?'Rey del norte · casa seléucida':'Rey del sur · casa de los Tolomeos'}</small><b>${H(nombreP(P,id))}</b></button>`;
 return `<div class="h-panel"><p class="h-rot h-a">${H(et.ref)} · ${H(et.fecha)}</p><p class="h-clave h-a" style="--d:.1">${H(et.titulo)}</p>
 <div class="h-din h-a" style="--d:.2">${rey(et.norte,'n')}<div class="h-judea"><span>◆ Judea en medio</span><span>${H(et.ref)}</span></div>${rey(et.sur,'s')}</div>
 <p class="h-nota h-a" style="--d:.4">${H(et.texto)}</p><div class="h-info h-a" style="--d:.5"></div>
 <div class="h-casas h-a" style="--d:.6">${DIN.p.map(p=>`<button type="button" class="${p.casa==='norte'?'h-n':p.casa==='sur'?'h-s':'h-ambas'}" data-p="${p.id}">${H(p.corto)}</button>`).join('')}</div></div>`;
}
function initDin(el,et,P,DIN){
 const muestra=id=>{const p=P[id];if(!p)return;const rel=DIN.v.filter(v=>v.desde===id||v.hasta===id).map(v=>v.tipo==='matrimonio'?'casado(a) con '+nombreP(P,v.desde===id?v.hasta:v.desde):v.hasta===id?'hijo(a) de '+nombreP(P,v.desde):'padre o madre de '+nombreP(P,v.hasta));
  el.querySelector('.h-info').innerHTML=`<div class="h-revela" style="margin-top:12px"><b>${H(p.nombre)}</b>${H(p.resumen)}${rel.length?`<span class="h-fuente">${H(rel.join(' · '))}</span>`:''}</div>`;
  el.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('h-sel',b.dataset.p===id))};
 el.querySelectorAll('[data-p]').forEach(b=>b.onclick=e=>{e.stopPropagation();muestra(b.dataset.p)});
 setTimeout(()=>{if(S[cur]&&S[cur].el===el)muestra(et.foco)},1300);
}
function ordenaHTML(hilo,tit,ins){
 const mez=hilo.map((h,i)=>({h,i})).sort((x,y)=>((x.i*7+3)%hilo.length)-((y.i*7+3)%hilo.length));
 return `<div class="h-panel h-centro"><p class="h-rot h-a">${tit}</p><p class="h-q h-a" style="--d:.1">${ins}</p>
  <div class="h-linea h-a" style="--d:.2">${hilo.map((h,i)=>`<button type="button" class="h-lin" data-i="${i}"><i style="background:${h.c}"></i><div><b>${H(h.reino)}</b><span>${H(h.nombre)}${h.fechas?' · '+H(h.fechas):''} · ${H(h.ref)}</span><p>«${H(h.texto)}» ${H(h.corto)}</p></div></button>`).join('')}</div>
  <div class="h-orden h-a" style="--d:.3">${mez.map(({h,i})=>`<button type="button" class="h-pza" data-i="${i}">${H(h.reino)}<small>${H(h.ref)}</small></button>`).join('')}</div><p class="h-resp"></p></div>`;
}
function initOrdena(el,hilo){
 let sig=0;const r=el.querySelector('.h-resp');
 el.querySelectorAll('.h-pza').forEach(b=>b.onclick=e=>{e.stopPropagation();const i=+b.dataset.i;
  if(i===sig){b.classList.add('h-usada');el.querySelector(`.h-lin[data-i="${i}"]`).classList.add('h-on');sig++;r.textContent='';
   if(sig===hilo.length){el.querySelector('.h-orden').remove();r.textContent='¡Completo! Toca cada poder para ver su versículo.';libera()}}
  else{b.classList.add('h-mal');r.textContent='Ese viene después. ¿Cuál sigue?';setTimeout(()=>b.classList.remove('h-mal'),400)}});
 el.querySelectorAll('.h-lin').forEach(b=>b.onclick=e=>{e.stopPropagation();if(b.classList.contains('h-on'))b.classList.toggle('h-abierta')});
}

/* =========== Daniel 12 =========== */
const EJE=[500,1850],xp=y=>((y-EJE[0])/(EJE[1]-EJE[0])*100);
const PER=[{k:'1260',t:'1.260 días',v:'Daniel 7:25; 12:7',de:538,n:1260,c:'#e8b45a'},{k:'1290',t:'1.290 días',v:'Daniel 12:11',de:508,n:1290,c:'#5fb3ff'},{k:'1335',t:'1.335 días',v:'Daniel 12:12',de:508,n:1335,c:'#ff7a6b'}];
function armaD12(D){
 {const g=grupo('Inicio',D.portada,D.actos[0].id);add(g,{img:D.portada,html:`<div class="h-panel h-portada"><p class="h-rot h-a" style="--d:.1">${H(D.libro)} · ${D.actos.length} escenas</p><h1 class="h-cartel h-a" style="--d:.25">${H(D.titulo)}</h1><p class="h-inv h-a" style="--d:.6">${H(D.invita)}</p></div>`})}
 D.actos.forEach(a=>{
  const g=grupo(a.corto,a.img||(a.imgs&&a.imgs[0])||(a.estaciones&&a.estaciones[0].img),a.id);
  if(a.tipo==='luz')add(g,{img:a.imgs[0],html:`<div class="h-panel"><p class="h-rot h-a" style="--d:.2">${a.rot}</p>${a.cartel?`<h2 class="h-cartel h-a" style="--d:.5">${H(a.cartel)}</h2>`:''}${verso(a.v,a.cartel?1:.4,a.clave)}</div>`});
  else if(a.tipo==='sello')selloSlides(g,a);
  else if(a.tipo==='via'){add(g,{solo:true,bloquea:true,html:calcHTML(),init:initCalc});viaSlides(g,a,null);}
 });
 const qs=['miguel','despertar','sellado','juramento','heredad'].map(id=>D.actos.find(a=>a.id===id)).filter(Boolean);
 const g=grupo('Repaso',D.portada,'repaso');
 qs.forEach((a,i)=>{const otros=D.actos.filter(x=>x!==a&&x.tipo!=='via');const o=[a.corto,otros[(i*2+1)%otros.length].corto,otros[(i*2+4)%otros.length].corto];const orden=[[0,1,2],[1,0,2],[2,1,0],[1,2,0],[0,2,1]][i%5];const op=orden.map(k=>o[k]);const v=vv(a.v);
  add(g,{solo:true,bloquea:true,html:preguntaHTML('¿De qué escena es? · '+(i+1)+' de '+qs.length,'«'+v.t+'»',op),init:el=>initPregunta(el,{ok:orden.indexOf(0),e:v.ref},true)})});
 if(D.partes)add(g,{solo:true,html:`<div class="h-panel h-centro"><p class="h-rot h-a">El hilo de Daniel 12</p><div class="h-linea h-a" style="--d:.15">${D.partes.map(h=>`<button type="button" class="h-lin h-on"><i style="background:${h.c}"></i><div><b>${H(h.nombre)}</b><span>${H(h.reino)}${h.fechas?' · '+H(h.fechas):''} · ${H(h.ref)}</span><p>«${H(h.texto)}» ${H(h.corto)}</p></div></button>`).join('')}</div><p class="h-nota h-a" style="--d:.6">Toca cada uno para leerlo.</p></div>`,init:el=>el.querySelectorAll('.h-lin').forEach(b=>b.onclick=e=>{e.stopPropagation();b.classList.toggle('h-abierta')})});
 add(g,{solo:true,html:finalHTML(qs.length,'«Tú irás hasta el fin, y reposarás, y te levantarás para recibir tu heredad al fin de los días.» Daniel 12:13'),init:initFinal});
}
function calcHTML(){return `<div class="h-panel h-centro"><p class="h-rot h-a">Daniel 12:11-12 · haz la cuenta</p><p class="h-q h-a" style="--d:.1">Un día por un año. Toca cada período para ver dónde empieza y dónde termina.</p>
 <div class="h-eje h-a" style="--d:.2">${[600,900,1200,1500,1800].map(y=>`<span style="left:${xp(y)}%">${y}</span>`).join('')}</div>
 ${PER.map(p=>`<div class="h-per h-a" data-k="${p.k}" style="--d:.3"><div class="h-t"><span>${p.t} · ${p.v}</span><span class="h-fin"></span></div><div class="h-pista"><div class="h-lleno" style="left:${xp(p.de)}%;background:${p.c}"></div><div class="h-marca" style="left:${xp(p.de+p.n)}%"></div>${p.k==='1335'?`<div class="h-alt" style="left:${xp(1844.8)}%"></div>`:''}</div></div>`).join('')}
 <div class="h-botones h-a" style="--d:.4">${PER.map(p=>`<button type="button" data-k="${p.k}">${p.t}</button>`).join('')}</div><p class="h-suma2"></p></div>`}
function initCalc(el){
 const hechos=new Set(),s=el.querySelector('.h-suma2');
 el.querySelectorAll('.h-botones button').forEach(b=>b.onclick=e=>{e.stopPropagation();const p=PER.find(x=>x.k===b.dataset.k);b.classList.add('h-hecho');
  const f=el.querySelector(`.h-per[data-k="${p.k}"]`);f.classList.add('h-on');f.querySelector('.h-lleno').style.width=(xp(p.de+p.n)-xp(p.de))+'%';f.querySelector('.h-fin').textContent=p.de+' → '+(p.de+p.n);
  let txt=`${p.de} + ${p.n.toLocaleString('es-CO')} = ${p.de+p.n}.`;
  if(p.k==='1260')txt+=' Terminan en 1798, igual que los 1.290.';
  if(p.k==='1290')txt+=' Empiezan treinta años antes que los 1.260 y terminan juntos.';
  if(p.k==='1335'){txt+=' La lectura principal llega a 1843; la otra, con el año judío que empieza en otoño, al 22 de octubre de 1844 (línea punteada).';f.classList.add('h-conalt')}
  s.textContent=txt;hechos.add(p.k);if(hechos.size===3)libera()});
}

/* =========== el lector =========== */
const ARMA={p1260:arma1260,d11:armaD11,d12:armaD12};
const quieto=()=>typeof cineQuieto==='function'&&cineQuieto();
const $=id=>raiz&&raiz.querySelector('#'+id);
function libera(){abierto=true;pintaPie()}
function pintaPie(){const s=S[cur],pie=$('hPie');if(!pie)return;pie.innerHTML=s.bloquea&&!abierto?`<div class="h-espera">Responde para seguir <button type="button" class="h-saltar">saltar</button></div>`:cur<S.length-1?`<div class="h-sig">${cur===0?'Toca para empezar':'Toca para seguir'} ›</div>`:'';const b=pie.querySelector('.h-saltar');if(b)b.onclick=e=>{e.stopPropagation();abierto=true;sig()}}
function ir(i){if(!raiz||i<0||i>=S.length)return;const s=S[i];
 if(cur>=0&&S[cur]&&S[cur].el){const v=S[cur].el;v.classList.remove('h-on');setTimeout(()=>v.remove(),600);S[cur].el=null}
 cur=i;abierto=!s.bloquea;
 const el=document.createElement('section');el.className='h-esc'+(s.solo||!s.img?' h-solo':'')+(s.oscuro?' h-oscuro':'');el.innerHTML=fondo(s.img,s.pos)+s.html;$('hEscenas').appendChild(el);s.el=el;
 requestAnimationFrame(()=>requestAnimationFrame(()=>{el.classList.add('h-on');if(s.init)s.init(el)}));
 raiz.querySelectorAll('.h-seg i').forEach((b,g)=>b.style.width=g<s.g?'100%':g>s.g?'0':((s.k+1)/G[g].n*100)+'%');
 $('hCabT').textContent=G[s.g].t;$('hCabS').textContent=s.g?`· ${s.g} de ${G.length-1}`:'';
 pintaPie();
 if(G[s.g].id&&lamDonde!==G[s.g].id){lamDonde=G[s.g].id;lamPaso=s.g;if(typeof lamLugar==='function')lamLugar();}
 const nx=S[i+1];if(nx&&nx.img){const im=new Image();im.src=img(nx.img)}
}
function sig(){if(!S[cur])return;if(S[cur].bloquea&&!abierto){const e=raiz.querySelector('.h-espera');if(e&&e.animate)e.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}ir(cur+1)}
function ant(){ir(cur-1)}
function abreMenu(){const m=$('hMenu');m.innerHTML=`<h3>${H(L.libro)}<button type="button" class="h-mx" aria-label="Cerrar">×</button></h3>${G.map((g,k)=>`<button type="button" class="h-it${S[cur].g===k?' h-aqui':''}" data-k="${k}"><i style="background-image:url('${img(g.img||L.portada)}')"></i><span><b>${k?k+'. ':''}${H(g.t)}</b><small>${g.n} ${g.n===1?'pantalla':'pantallas'}</small></span></button>`).join('')}`;
 m.classList.add('h-on');m.querySelector('.h-mx').onclick=e=>{e.stopPropagation();m.classList.remove('h-on')};
 m.querySelectorAll('.h-it').forEach(b=>b.onclick=e=>{e.stopPropagation();m.classList.remove('h-on');ir(G[+b.dataset.k].primero)});}
const menuAbierto=()=>{const m=$('hMenu');return !!(m&&m.classList.contains('h-on'))};
function abre(cid){
 const el=document.getElementById('lam');if(!el)return;
 if(typeof cineExploraLimpia==='function')cineExploraLimpia();
 if(!lamModo){const r=el.getRootNode?el.getRootNode():document;cineFoco=r.activeElement;}
 lamPara();
 L=LAMINAS[cid];CID=cid;lamId=cid;lamModo='explorar';lamPaso=0;lamDonde=L.actos[0].id;cineActo=-1;
 S=[];G=[];cur=-1;PUNTOS=0;
 (ARMA[L.historias]||ARMA[cid])(L);
 el.hidden=false;el.className='lam hist';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',L.libro+' · '+L.titulo);
 document.body.classList.add('leyendo');
 el.innerHTML='<div class="h-frame" id="hFrame"><div id="hEscenas"></div><div class="h-top"><div class="h-segs">'+G.map(()=>'<div class="h-seg"><i></i></div>').join('')+'</div><div class="h-cab"><button type="button" class="h-cabt" id="hCabT" aria-label="Escenas"></button><span id="hCabS"></span><button type="button" class="h-cerrar" aria-label="Cerrar">'+IC('x')+'</button></div></div><div id="hPie"></div><button type="button" class="h-flecha h-ant" aria-label="Anterior">‹</button><button type="button" class="h-flecha h-prox" aria-label="Siguiente">›</button><div class="h-menu" id="hMenu"></div></div>';
 raiz=el.querySelector('#hFrame');
 raiz.querySelector('.h-cerrar').onclick=e=>{e.stopPropagation();lamCierra()};
 raiz.querySelector('#hCabT').onclick=e=>{e.stopPropagation();abreMenu()};
 raiz.querySelector('.h-ant').onclick=e=>{e.stopPropagation();ant()};raiz.querySelector('.h-prox').onclick=e=>{e.stopPropagation();sig()};
 raiz.addEventListener('pointerdown',e=>{if(menuAbierto()||e.target.closest('button,input,a,.h-menu'))return;x0=e.clientX;y0=e.clientY;t0=Date.now()});
 raiz.addEventListener('pointerup',e=>{if(x0===null)return;const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){dx<0?sig():ant();return}
  if(Math.abs(dx)<10&&Math.abs(dy)<10&&Date.now()-t0<500){const sel=window.getSelection&&window.getSelection();if(sel&&String(sel))return;const r=raiz.getBoundingClientRect();(e.clientX-r.left)<r.width*.3?ant():sig()}});
 raiz.addEventListener('pointercancel',()=>{x0=null});
 [...new Set(S.map(s=>s.img).filter(Boolean))].slice(0,6).forEach(n=>{const im=new Image();im.src=img(n)});
 ir(0);
 const b=raiz.querySelector('.h-cerrar');if(b&&b.focus)b.focus({preventScroll:true});
}
const activa=()=>{const el=document.getElementById('lam');return !!(raiz&&el&&!el.hidden&&el.classList.contains('hist'))};
function tecla(e){
 const t=e.target;if(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName||''))return;
 if(e.key==='Escape'){e.preventDefault();if(menuAbierto())$('hMenu').classList.remove('h-on');else lamCierra();return}
 if(menuAbierto())return;
 if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();sig()}
 else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();ant()}
}
function irActo(id){const g=G.findIndex(x=>x.id===id);if(g>=0)ir(G[g].primero)}
function irNumero(n){const a=L&&L.actos[Number(n)];if(a)irActo(a.id)}
function cierra(){raiz=null;S=[];G=[];cur=-1}
/* Para las pruebas: las pantallas que arma cada lámina, sin pintar nada. */
function pantallas(cid){const L0=L;L=LAMINAS[cid];S=[];G=[];(ARMA[L.historias]||ARMA[cid])(L);const r={S:S.slice(),G:G.slice()};S=[];G=[];L=L0;return r}
return {abre,activa,tecla,irActo,irNumero,cierra,pantallas};
})();
