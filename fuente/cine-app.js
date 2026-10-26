/* ───────── CINE: una lámina que se recorre con el dedo (v266) ─────────
   Camilo (20-oct): Daniel 9 «tipo producción de Hollywood», que se mueva como
   Daniel 2, 7 y 8. MECANISMO: la lámina (#lam) es el contenedor que se desplaza.
   Cada acto es una sección alta con una escena fija (sticky); el avance del
   desplazamiento dentro del acto (0 a 1) mueve la escena. Los actos son datos
   (LAMINAS[id].actos) y los efectos son seis piezas que se reusan: luz, cuenta,
   sello, mapa, via y barra. Sin librerías. */
let cineFoco=null,cineCuadro=0,cineActo=-1;
let cineExploraEstado=null;
const lamEsC=()=>!!(LAM()&&LAM().tipo==='cine');
const cineActos=()=>LAM().actos;
const cineLim=(x,a,b)=>Math.max(a,Math.min(b,x));
const cineTramo=(p,a,b)=>cineLim((p-a)/(b-a),0,1);
const cineQuieto=()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Fecha de un punto contado en años desde el otoño de 457 a.C. No hay año cero.
    Media vuelta después de un otoño ya es primavera del año siguiente (486.5 → 31 d.C.). */
const cineFecha=n=>{const y=Math.floor(n)+(n%1>=.25?1:0);return y<457?(457-y)+' a.C.':(y-456)+' d.C.';};
/** El texto de un versículo, o la frase que el acto cita de él. */
function cineVerso(v){
  const t=tablaDeCid(v.cap);if(!t)return {t:'',ref:''};
  const ref=t.ref+':'+v.de;
  return {t:v.frase||String(t.mapa[v.de]||'').replace(/^[«»”“"\s]+|[«»”“"\s]+$/g,''),ref:ref+' · '+t.version};
}
/* El versículo partido en palabras, para que se enciendan con el avance. */
function cinePalabras(txt,clave){
  return esc(txt).split(/(\s+)/).map(w=>/^\s+$/.test(w)||!w?w:
    '<span class="cine-w'+((clave||[]).some(k=>w.includes(k))?' k':'')+'">'+w+'</span>').join('');
}
const cineEgw=e=>'<p class="cine-egw">«'+esc(e.t)+'»<span>'+e.fuente+'</span></p>';
const cineOtro=o=>'<p class="cine-otro">«'+esc(o.t)+'»<span>'+esc(o.ref)+' · '+esc(o.ver)+'</span></p>';
function cineTexto(a,extra){
  const v=a.v?cineVerso(a.v):null;
  return '<div class="cine-capa" data-leer>'+cineFila(a.rot)+
    (v?'<p class="cine-verso">«'+cinePalabras(v.t,a.clave)+'»</p><span class="cine-ref">'+esc(v.ref)+'</span>':'')+
    (a.otros||[]).map(cineOtro).join('')+(extra||'')+'</div>';
}
/* El sello en dos tiempos, en el mismo lugar: primero el versículo; cuando cae el sello,
   la carta de Esdras y cómo lo aplica Elena de White. Así nada tapa la escena en el teléfono. */
function cinePila(a){
  const v=cineVerso(a.v);
  return '<div class="cine-capa" data-leer>'+cineFila(a.rot)+'<div class="cine-pila">'+
    '<div class="uno"><p class="cine-verso">«'+cinePalabras(v.t,a.clave)+'»</p><span class="cine-ref">'+esc(v.ref)+'</span></div>'+
    '<div class="dos">'+(a.otros||[]).map(cineOtro).join('')+(a.egw||[]).map(cineEgw).join('')+(a.explica?'<p class="cine-exp">'+esc(a.explica)+'</p>':'')+'</div></div></div>';
}
/* El botón de voz de la app (grupoVoz/leeCerca), el mismo de los versículos: lee la escena. */
const cineVoz=()=>typeof puedeHablar==='function'&&puedeHablar()?grupoVoz('btn-voz','Escuchar','Escuchar esta escena'):'';
const cineFila=rot=>'<div class="cine-fila"><span class="cine-rot">'+esc(rot||'')+'</span>'+cineVoz()+'</div>';
const cineFondo=(src,cls,est)=>'<div class="cine-f'+(cls?' '+cls:'')+'" style="background-image:url(\''+src+'\')'+(est?';'+est:'')+'"></div>';

/* El estudio muestra el pasaje completo de la tabla bíblica, nunca una paráfrasis del acto. */
function cineEstudioVersos(v){
  const t=v&&tablaDeCid(v.cap),de=Number(v&&v.de),hasta=v&&v.hasta!==undefined?Number(v.hasta):de;
  if(!t||!Number.isInteger(de)||!Number.isInteger(hasta)||de<1||hasta<de||hasta>Math.max(...Object.keys(t.mapa).map(Number)))return '';
  const ns=Array.from({length:hasta-de+1},(_,i)=>de+i);if(ns.some(n=>!t.mapa[n]))return '';
  return '<p class="cine-ref">'+esc(t.ref+':'+de+(hasta>de?'–'+hasta:'')+' · '+t.version)+'</p>'+ns.map(n=>
    '<p class="cine-estudio-verso"><sup>'+n+'</sup> '+esc(t.mapa[n])+'</p>').join('');
}
/* Párrafos de texto simple: los saltos de línea son estructura, no HTML de los datos. */
function cineEstudioTexto(texto){
  const ps=Array.isArray(texto)?texto:String(texto||'').split(/\n\s*\n/);
  return ps.filter(p=>p!==undefined&&p!==null&&String(p).trim()).map(p=>'<p>'+esc(p)+'</p>').join('');
}
function cineEstudioFuentes(fuentes){
  return '<ul class="cine-estudio-fuentes">'+(fuentes||[]).map(f=>{
    let url='';try{const u=new URL(String(f.url||''));if(u.protocol==='https:'&&!u.username&&!u.password)url=u.href;}catch(e){}
    return '<li>'+(url?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(f.titulo)+'</a>':esc(f.titulo))+'</li>';
  }).join('')+'</ul>';
}
function cineEstudioRelaciones(a,i){
  let h='';
  if(a.mapa){
    const claves=['norte','centro','sur'],inicial=a.mapa.centro?'centro':claves.find(k=>a.mapa[k]);
    if(inicial)h+='<details class="cine-estudio-extra"><summary>Ubicar las relaciones</summary><p class="cine-estudio-ayuda">Esquema de relaciones, no mapa a escala.</p><div class="cine-estudio-mapa" role="group" aria-label="Relaciones entre los territorios">'+claves.map((k,n)=>a.mapa[k]?'<button type="button" aria-pressed="'+(k===inicial)+'" aria-controls="cineE-'+i+'-mapa" onclick="cineEstudioMapa('+i+','+n+')"><small>'+['Norte','Tierra de paso','Sur'][n]+'</small><span>'+esc(a.mapa[k].titulo)+'</span></button>':'').join('')+'</div><div id="cineE-'+i+'-mapa" class="cine-estudio-hallazgo" aria-live="polite"><h3>'+esc(a.mapa[inicial].titulo)+'</h3>'+cineEstudioTexto(a.mapa[inicial].texto)+'</div></details>';
  }
  if(a.huellas&&a.huellas.length)h+='<details class="cine-estudio-extra"><summary>Cruzar con otras visiones</summary><div class="cine-estudio-huellas" role="group" aria-label="Pasajes relacionados">'+a.huellas.map((r,n)=>'<button type="button" aria-pressed="'+(n===0)+'" aria-controls="cineE-'+i+'-huella" onclick="cineEstudioCruce('+i+','+n+')">'+esc(r.titulo)+'</button>').join('')+'</div><div id="cineE-'+i+'-huella" class="cine-estudio-hallazgo" aria-live="polite">'+cineEstudioTexto(a.huellas[0].texto)+'</div></details>';
  return h;
}
function cineEstudioFrases(a){
  if(!Array.isArray(a.frases)||!a.frases.length)return '';
  return '<details class="cine-estudio-extra"><summary>Versículo a versículo</summary>'+a.frases.map(f=>
    '<details class="cine-estudio-frase"><summary><b>'+esc('11:'+f.verso)+'</b> '+esc(f.clave)+'</summary>'+cineEstudioTexto(f.explicacion)+
    '<p class="cine-estudio-ayuda">Fuente: '+esc(f.fuente)+'</p></details>').join('')+'</details>';
}
function cineEstudio(a,L){
  const i=L.actos.indexOf(a),base='cineE-'+i,preg=a.pregunta||{},capas=['El texto','La explicación','Profundizar','Comprueba'];
  const img=typeof a.img==='string'&&/^[a-z0-9_/-]+(?:\.(?:webp|png|jpe?g))?$/i.test(a.img)?
    '<img class="cine-estudio-img" src="'+esc(lamRuta(L,a.img))+'"'+(a.adaptable?' srcset="'+esc(lamRuta(L,a.img+'-640'))+' 640w, '+esc(lamRuta(L,a.img))+' 1600w" sizes="(max-width: 900px) 100vw, 65vw"':'')+' alt="" loading="'+(i===0?'eager':'lazy')+'" fetchpriority="'+(i===0?'high':'auto')+'" decoding="async">':'';
  const cuerpo=[cineEstudioVersos(a.v),cineEstudioTexto(a.relato)+cineEstudioTexto(a.explica)+cineEstudioFrases(a)+cineEstudioRelaciones(a,i),
    cineEstudioTexto(a.profundiza)+(a.cita?'<blockquote>'+cineEstudioTexto(a.cita.texto)+(a.cita.traduccion?'<p>Traducción del original: '+esc(a.cita.traduccion)+'</p>':'')+'<cite>'+esc(a.cita.referencia)+(a.cita.idioma==='en'?' · Original en inglés':'')+'</cite></blockquote>':'')+(a.fuentes&&a.fuentes.length?'<h3>Fuentes para seguir estudiando</h3>'+cineEstudioFuentes(a.fuentes):''),
    '<p class="cine-estudio-preg">'+esc(preg.q||'¿Qué enseña este pasaje?')+'</p><button type="button" class="cine-estudio-revela" aria-expanded="false" aria-controls="'+base+'-respuesta" onclick="cineEstudioRespuesta('+i+')">Mostrar respuesta</button><div id="'+base+'-respuesta" class="cine-estudio-respuesta" hidden></div>'];
  return img+'<div class="cine-estudio-velo"></div>'+(img&&L.creditoImagen?'<span class="cine-estudio-credito">Recreación ilustrativa</span>':'')+'<div class="cine-estudio" data-estudio="'+i+'"><header class="cine-estudio-cab"><span class="cine-rot">'+esc(a.rot||'')+'</span><h2>'+esc(a.titulo||a.corto)+'</h2></header>'+
    '<div class="cine-estudio-tabs" role="tablist" aria-label="Capas de esta escena">'+capas.map((c,j)=>'<button type="button" role="tab" id="'+base+'-tab-'+j+'" aria-controls="'+base+'-capa-'+j+'" aria-selected="'+(j===0)+'" tabindex="'+(j===0?'0':'-1')+'" onclick="cineEstudioCapa('+i+','+j+')">'+c+'</button>').join('')+'</div>'+
    '<div class="cine-estudio-lectura">'+cuerpo.map((c,j)=>'<div role="tabpanel" id="'+base+'-capa-'+j+'" aria-labelledby="'+base+'-tab-'+j+'" tabindex="0" data-leer'+(j?' hidden':'')+'><div class="cine-estudio-voz">'+cineVoz()+'</div>'+c+'</div>').join('')+'</div></div>';
}
function cineEstudioCapa(i,n){
  const el=document.getElementById('lam'),sec=el&&el.querySelectorAll('.cine-acto')[Number(i)];
  if(!sec||!Number.isInteger(Number(n))||n<0||n>3)return;
  if(typeof paraVoz==='function')paraVoz();
  sec.querySelectorAll('[role="tab"]').forEach((b,j)=>{b.setAttribute('aria-selected',String(j===Number(n)));b.tabIndex=j===Number(n)?0:-1;});
  sec.querySelectorAll('[role="tabpanel"]').forEach((p,j)=>{p.hidden=j!==Number(n);});
  const caja=sec.querySelector('.cine-estudio-lectura');if(caja)caja.scrollTop=0;
}
function cineEstudioRespuesta(i){
  const a=cineActos()[Number(i)],el=document.getElementById('cineE-'+Number(i)+'-respuesta');if(!a||!el)return;
  const b=el.previousElementSibling,abierta=b.getAttribute('aria-expanded')==='true';
  if(!abierta)el.innerHTML=cineEstudioTexto(a.pregunta&&a.pregunta.respuesta);
  el.hidden=abierta;b.setAttribute('aria-expanded',String(!abierta));b.textContent=abierta?'Mostrar respuesta':'Ocultar respuesta';
}
function cineEstudioMapa(i,n){
  const a=cineActos()[Number(i)],k=['norte','centro','sur'][Number(n)],dato=a&&a.mapa&&a.mapa[k],el=document.getElementById('cineE-'+Number(i)+'-mapa');if(!dato||!el)return;
  if(typeof paraVoz==='function')paraVoz();
  el.innerHTML='<h3>'+esc(dato.titulo)+'</h3>'+cineEstudioTexto(dato.texto);
  const activos=['norte','centro','sur'].filter(c=>a.mapa[c]);el.previousElementSibling.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(activos[j]===k)));
}
function cineEstudioCruce(i,n){
  const a=cineActos()[Number(i)],dato=a&&a.huellas&&a.huellas[Number(n)],el=document.getElementById('cineE-'+Number(i)+'-huella');if(!dato||!el)return;
  if(typeof paraVoz==='function')paraVoz();
  el.innerHTML=cineEstudioTexto(dato.texto);el.previousElementSibling.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===Number(n))));
}
function cineEstudioTecla(e){
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  const lista=e.target.closest('.cine-estudio-tabs'),est=lista&&lista.closest('.cine-estudio');if(!est)return;
  const bs=[...lista.querySelectorAll('[role="tab"]')],actual=bs.indexOf(e.target);if(actual<0)return;
  const n=e.key==='Home'?0:e.key==='End'?bs.length-1:(actual+(e.key==='ArrowRight'?1:-1)+bs.length)%bs.length;
  e.preventDefault();cineEstudioCapa(Number(est.dataset.estudio),n);bs[n].focus({preventScroll:true});
}

/* ── Cada tipo de acto: su HTML ── */
const CINE_HTML={
  estudio:(a,L)=>cineEstudio(a,L),
  luz:(a,L)=>cineFondo(lamRuta(L,a.imgs[0]),'f1')+cineFondo(lamRuta(L,a.imgs[1]),'f2','background-position:'+(a.foco2||'center'))+
    '<div class="cine-luz"></div><div class="cine-vel"></div>'+
    (a.cartel?'<div class="cine-cartel"><h2>'+esc(a.cartel)+'</h2><p>'+esc(L.libro)+'</p></div><div class="cine-baja"><span>Desliza</span><i></i></div>':'')+cineTexto(a),
  cuenta:a=>'<div class="cine-cuenta" data-leer>'+cineFila(a.rot)+
    '<div class="cine-num"><b>'+a.de+'</b><small>semanas</small></div><div class="cine-rej" aria-hidden="true">'+'<i></i>'.repeat(a.a)+'</div>'+
    '<div class="cine-ley">'+a.nombres.map((n,i)=>'<span><b class="t'+i+'"></b>'+esc(n)+'</span>').join('')+'</div>'+
    '<p class="cine-verso chico">«'+esc(cineVerso(a.v).t)+'»</p><span class="cine-ref">'+esc(cineVerso(a.v).ref)+'</span>'+
    (a.egw||[]).map(cineEgw).join('')+'</div>',
  sello:(a,L)=>cineFondo(lamRuta(L,a.img),'f1')+'<div class="cine-vel"></div>'+
    '<svg class="cine-sello" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 8c14 0 18 10 30 13s24-2 32 9-1 22 4 34 16 18 14 32-15 17-17 30 6 24-3 34-22 4-33 10-17 20-31 20-19-14-31-20-24 1-33-10 0-21-4-33-15-16-17-30 9-21 14-32-4-23 4-34 20-6 32-9 16-13 30-13z"/>'+
    '<circle cx="100" cy="100" r="58"/><text x="100" y="98" class="n">'+esc(a.fecha)+'</text><text x="100" y="126" class="e">'+esc(a.era)+'</text></svg>'+
    '<div class="cine-flash"></div>'+cinePila(a),
  mapa:(a,L)=>cineFondo(lamRuta(L,a.img),'f1 tenue')+'<div class="cine-vel"></div>'+
    '<div class="cine-meses">'+Array.from({length:a.meses},(_,i)=>'<span>Mes '+(i+1)+'</span>').join('')+'</div>'+
    '<div class="cine-mapa"><svg viewBox="0 0 1000 520" role="img" aria-label="Ruta de '+esc(a.desde)+' a '+esc(a.hasta)+'">'+
    '<path class="mar" d="M0 210 C 40 230, 60 300, 90 380 L 70 520 L0 520Z"/><path class="rio" d="M955 470 C 900 400, 820 330, 760 250 S 650 120, 600 60"/>'+
    '<path class="ruta0" d="'+CINE_RUTA+'"/><path class="ruta" d="'+CINE_RUTA+'"/>'+
    '<circle class="pto" cx="905" cy="445" r="9"/><text x="885" y="490" class="lug" text-anchor="end">'+esc(a.desde)+'</text>'+
    '<circle class="meta" cx="150" cy="300" r="9"/><text x="150" y="345" class="lug" text-anchor="middle">'+esc(a.hasta)+'</text>'+
    '<g class="carav"><circle r="16"/><circle r="7"/></g></svg></div>'+cineTexto(a),
  via:(a,L)=>a.estaciones.map((e,i)=>cineFondo(lamRuta(L,e.img),'fv'+(i?'':' on'))).join('')+'<div class="cine-vel"></div>'+
    '<div class="cine-via"><div class="cine-pista"><i class="base"></i><i class="oro"></i>'+
    '<div class="cine-est" data-i="-1"><i></i><b>'+esc(a.inicio)+'</b></div>'+
    a.estaciones.map((e,i)=>'<div class="cine-est" data-i="'+i+'"><i></i><b>'+esc(e.fecha)+'</b></div>').join('')+'</div></div>'+
    '<div class="cine-tarj">'+a.estaciones.map((e,i)=>{const v=cineVerso(e.v);
      return '<div class="cine-capa" data-leer data-t="'+i+'">'+cineFila(e.rot)+'<p class="cine-verso">«'+esc(v.t)+'»</p><span class="cine-ref">'+esc(v.ref)+'</span>'+
        (e.egw||[]).map(cineEgw).join('')+(e.nota?'<p class="cine-egw nota">'+esc(e.nota)+'<span>'+e.fuente+'</span></p>':'')+'</div>';}).join('')+'</div>',
  barra:a=>'<div class="cine-final" data-leer>'+cineFila(a.rot)+'<h2>'+esc(a.cartel)+'</h2>'+
    '<div class="cine-dos"><div class="cine-2300"><i class="p"></i><i class="r"></i></div><div class="cine-marcas">'+a.marcas.map(m=>'<span>'+esc(m)+'</span>').join('')+'</div></div>'+
    '<p class="cine-verso chico">«'+esc(cineVerso(a.v).t)+'»</p><span class="cine-ref">'+esc(cineVerso(a.v).ref)+'</span>'+
    (a.egw||[]).map(cineEgw).join('')+'</div>'
};
const CINE_RUTA='M905 445 C 820 400, 760 300, 690 210 S 520 70, 380 120 S 200 230, 150 300';

/* ── Cada tipo de acto: cómo se mueve con el avance p (0 a 1) ── */
function cineEnciende(sec,p){const ws=sec.querySelectorAll('.cine-capa .cine-w'),n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('si',i<n));}
const CINE_FX={
  estudio(s,p){
    const img=s.querySelector('.cine-estudio-img');if(img)img.style.transform=cineQuieto()?'none':'scale('+(1.02+.035*p)+')';
  },
  luz(s,p){
    s.querySelector('.f1').style.transform='scale('+(1.02+.16*p)+')';
    const f2=s.querySelector('.f2');f2.style.opacity=cineTramo(p,.68,.8);f2.style.transform='scale('+(1.12-.1*cineTramo(p,.68,1))+')';
    s.querySelector('.cine-luz').style.opacity=p<.62?0:p<.74?cineTramo(p,.62,.7):1-.75*cineTramo(p,.74,.88);
    const c=s.querySelector('.cine-cartel');if(c){const q=cineTramo(p,.02,.2);c.style.opacity=1-q;c.style.transform='translateY('+(-70*q)+'px)';c.style.filter='blur('+(10*q)+'px)';
      s.querySelector('.cine-baja').style.opacity=1-cineTramo(p,0,.06);}
    const t=s.querySelector('.cine-capa');t.style.opacity=cineTramo(p,.2,.3);
    cineEnciende(s,cineTramo(p,.3,.65));
  },
  cuenta(s,p,a){
    const cs=s.querySelectorAll('.cine-rej i'),ver=Math.round(a.a*cineTramo(p,.12,.42));
    // Son dos expresiones del mismo período, no cantidades intermedias de semanas.
    const enAnios=p>=.42;
    s.querySelector('.cine-num b').textContent=enAnios?a.a:a.de;
    s.querySelector('.cine-num small').textContent=enAnios?'años · '+a.de+' × 7':'semanas proféticas';
    const [t0,t1]=[a.tramos[0],a.tramos[0]+a.tramos[1]],q=[cineTramo(p,.48,.56),cineTramo(p,.56,.68),cineTramo(p,.68,.74)];
    cs.forEach((c,i)=>{c.classList.toggle('v',i<ver);
      const k=i<t0?0:i<t1?1:2,lim=k===0?t0*q[0]:k===1?t0+(t1-t0)*q[1]:t1+(a.a-t1)*q[2];c.className=(i<ver?'v':'')+(i<lim?' t'+k:'');});
    s.querySelector('.cine-ley').style.opacity=cineTramo(p,.7,.76);
    s.querySelector('.cine-num').style.transform='scale('+(1-.4*cineTramo(p,.76,.84))+')';
    s.querySelectorAll('.cine-cuenta>.cine-verso,.cine-cuenta>.cine-ref,.cine-egw').forEach(e=>e.style.opacity=cineTramo(p,.8,.88));
  },
  sello(s,p){
    s.querySelector('.f1').style.transform='scale('+(1.24-.22*p)+') translateX('+(4-4*p)+'%)';
    s.querySelector('.cine-capa').style.opacity=cineTramo(p,0,.1);
    cineEnciende(s,cineTramo(p,.05,.38));
    const g=s.querySelector('.cine-sello'),cae=p>=.46;
    if(g.classList.contains('cae')!==cae){g.classList.toggle('cae',cae);
      if(cae&&!cineQuieto()){const f=s.querySelector('.cine-flash');f.classList.remove('va');void f.offsetWidth;f.classList.add('va');s.classList.remove('tiembla');void s.offsetWidth;s.classList.add('tiembla');}}
    const q=cineTramo(p,.56,.66);s.querySelector('.cine-pila .uno').style.opacity=1-q;g.style.opacity=cae?String(1-.7*q):'';const d=s.querySelector('.cine-pila .dos');d.style.opacity=q;d.style.transform='translateY('+(16*(1-q))+'px)';
  },
  mapa(s,p){
    const r=s.querySelector('.ruta'),L=r.getTotalLength(),q=cineTramo(p,.1,.85);
    r.style.strokeDasharray=L;r.style.strokeDashoffset=L*(1-q);
    const pt=r.getPointAtLength(L*q);s.querySelector('.carav').setAttribute('transform','translate('+pt.x+','+pt.y+')');
    const ms=s.querySelectorAll('.cine-meses span');ms.forEach((m,i)=>m.classList.toggle('si',q>=.999?i===ms.length-1:Math.floor(q*ms.length)===i));
    s.querySelector('.meta').classList.toggle('si',q>=.999);
    s.querySelector('.f1').style.transform='scale(1.08) translateX('+(-4*q)+'%)';
    cineEnciende(s,cineTramo(p,0,.6));
  },
  via(s,p,a){
    const W=s.clientWidth,n=a.estaciones.length,paso=W*.9,x0=W*.14,X=i=>x0+(i+1)*paso,fin=X(n-1)-W/2;
    const pista=s.querySelector('.cine-pista');pista.style.width=(X(n-1)+W)+'px';
    s.querySelectorAll('.cine-est').forEach(e=>e.style.left=(Number(e.dataset.i)<0?x0:X(Number(e.dataset.i)))+'px');
    const dx=fin*p;pista.style.transform='translateX('+(-dx)+'px)';
    pista.querySelector('.oro').style.width=Math.max(0,dx+W/2-x0)+'px';pista.querySelector('.base').style.width=(X(n-1)-x0)+'px';pista.querySelectorAll('i.base,i.oro').forEach(i=>i.style.left=x0+'px');
    let act=-1;for(let i=0;i<n;i++)if(dx+W/2>=X(i)-W*.08)act=i;
    s.querySelectorAll('.cine-est').forEach(e=>e.classList.toggle('si',Number(e.dataset.i)<=act));
    s.querySelectorAll('.fv').forEach((f,i)=>{f.classList.toggle('on',i===Math.max(0,act));f.style.transform='scale('+(1.04+.06*p)+')';});
    s.querySelectorAll('.cine-tarj .cine-capa').forEach((t,i)=>t.classList.toggle('on',i===act));
  },
  barra(s,p,a){
    const q=a.parte/a.total*100;
    s.querySelector('.cine-2300 .p').style.width=(100-(100-q)*cineTramo(p,.12,.4))+'%';
    s.querySelector('.cine-2300 .r').style.width=((100-q)*cineTramo(p,.3,.6))+'%';
    s.querySelector('.cine-marcas span:last-child').style.opacity=cineTramo(p,.55,.62);
    s.querySelector('.cine-final h2').style.opacity=cineTramo(p,0,.12);
    s.querySelectorAll('.cine-final>.cine-verso,.cine-final>.cine-ref').forEach(e=>e.style.opacity=cineTramo(p,.35,.45));
    s.querySelectorAll('.cine-final .cine-egw').forEach((e,i)=>e.style.opacity=cineTramo(p,.6+i*.12,.68+i*.12));
  }
};
/* Los momentos donde se detiene «Siguiente» en cada tipo (fracción del acto). */
const CINE_PAUSAS={estudio:[.1],luz:[.4,.9],cuenta:[.45,.95],sello:[.3,.7],mapa:[.55,.95],via:null,barra:[.5,.95]};
function cinePausas(a){
  if(a.tipo!=='via')return CINE_PAUSAS[a.tipo];
  /* La estación i queda en el centro cuando el avance es (0,9·i + 0,54) / (0,9·(n−1) + 0,54): ver CINE_FX.via. */
  const n=a.estaciones.length;return a.estaciones.map((e,i)=>Math.min(.985,(.9*i+.54)/(.9*(n-1)+.54)));
}

/* ── Abrir, mover y cerrar ── */
function cineExploraPersonas(){
  const estado=cineExploraEstado;if(!estado)return;
  const omitir='svg,button,a,blockquote,cite,q,h1,h2,h3,h4,h5,h6,[role="heading"],.d11lab-sources,.d9lab-source,.d11lab-ref,.d11lab-quote,.d9lab-kicker,.d11lab-eyebrow,.sec-fuente,.lam-fu,[data-d9lab-field$="-biblia"],[data-d9lab-field$="-cita"],[data-d9lab-field$="-ref"]';
  estado.seccion.querySelectorAll('p,dd').forEach(p=>{
    if(p.closest(omitir))return;
    const antes=p.innerHTML,html=personasTocables(antes,lamId);if(html===antes)return;
    const caja=p.ownerDocument.createElement('div');caja.innerHTML=html;
    caja.querySelectorAll('button.per').forEach(b=>{
      if(/^(?:Elena(?: G\.)? de White|Stephen Bohr|Esteban Bohr|Humberto(?: R\.)? Treiyer)$/.test(b.textContent))b.replaceWith(b.ownerDocument.createTextNode(b.textContent));
    });
    if(caja.innerHTML!==antes)p.innerHTML=caja.innerHTML;
  });
}
function cineExploraPersonaVuelve(){
  const estado=cineExploraEstado;if(!estado||lamPersonaAbierta())return;
  const foco=estado.personaFoco;estado.personaFoco=null;
  if(foco&&foco.isConnected)foco.focus({preventScroll:true});
}
function cineEnfocables(contenedor){
  return [...contenedor.querySelectorAll('button,a[href],summary,input,select,textarea,[tabindex]')]
    .filter(b=>b.tabIndex>=0&&!b.matches(':disabled')&&b.getClientRects().length);
}
function cineExploraLimpia(){
  const anterior=cineExploraEstado;if(!anterior)return null;
  cineExploraEstado=null;
  if(anterior.observador)anterior.observador.disconnect();
  if(anterior.eventos)anterior.eventos.abort();
  clearTimeout(anterior.personaEspera);
  lamPersonaCierra();
  const tarjeta=document.getElementById('lamPerC');if(tarjeta)tarjeta.remove();
  if(anterior.limpia)anterior.limpia();
  anterior.seccion.remove();
  const el=document.getElementById('lam');if(el)el.classList.remove('cine-explorando');
  return anterior;
}
function cineExploraAbre(){
  const el=document.getElementById('lam'),montar=EXPLORAR_DANIEL[lamId];if(!el||!montar||cineExploraEstado)return;
  if(typeof paraVoz==='function')paraVoz();
  const raiz=el.getRootNode(),seccion=el.ownerDocument.createElement('section');
  seccion.id='cineExploraciones';seccion.className='cine-exploraciones';seccion.setAttribute('aria-labelledby','cineExploraTitulo');
  seccion.innerHTML='<header class="cine-explora-cab"><h2 id="cineExploraTitulo" tabindex="-1">Explorar y comparar</h2><button type="button" id="cineVolverRecorrido" onclick="cineExploraVuelve()">'+IC('izq')+' Volver al recorrido</button></header><div class="cine-explora-contenido"></div>';
  cineExploraEstado={scroll:el.scrollTop,foco:raiz.activeElement,seccion,limpia:null,personaFoco:null,eventos:new AbortController()};
  el.append(seccion);el.classList.add('cine-explorando');
  cineExploraEstado.limpia=montar(seccion.querySelector('.cine-explora-contenido'),{estilos:false});
  cineExploraPersonas();
  cineExploraEstado.observador=new MutationObserver(cineExploraPersonas);
  cineExploraEstado.observador.observe(seccion,{childList:true,subtree:true,characterData:true});
  const estado=cineExploraEstado;
  el.addEventListener('click',e=>{
    const boton=e.target.closest('button.per');
    if(boton&&seccion.contains(boton)){estado.personaFoco=boton;return;}
    if(e.target.closest('.lam-perc .lam-x,.lam-perc-fondo')){
      clearTimeout(estado.personaEspera);estado.personaEspera=setTimeout(cineExploraPersonaVuelve,0);return;
    }
    if(seccion.contains(e.target)&&e.target.closest('button')&&lamPersonaAbierta()){
      lamPersonaCierra();estado.personaFoco=null;
    }
  },{capture:true,signal:estado.eventos.signal});
  el.scrollTop=0;seccion.querySelector('h2').focus({preventScroll:true});
}
function cineExploraVuelve(){
  const anterior=cineExploraLimpia(),el=document.getElementById('lam');if(!anterior||!el)return;
  if(typeof paraVoz==='function')paraVoz();
  el.scrollTop=anterior.scroll;cinePinta();
  if(anterior.foco&&anterior.foco.isConnected)anterior.foco.focus({preventScroll:true});
}
function cineAbre(cid,modo){
  const el=document.getElementById('lam');if(!el)return;
  cineExploraLimpia();
  if(!lamModo){const r=el.getRootNode?el.getRootNode():document;cineFoco=r.activeElement;}
  lamPara();if(lamModo&&lamEsE())lamLimpia();
  lamId=cid;lamModo=modo==='presentar'?'presentar':'explorar';lamPaso=0;lamDonde=LAM().actos[0].id;cineActo=-1;
  const L=LAM();
  el.hidden=false;el.className='lam cine'+(L.selector?' cine-con-selector':'')+(lamModo==='presentar'?' cine-pres':'')+(cineQuieto()?' quieto':'');
  el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',L.libro+' · '+L.titulo);
  document.body.classList.add('leyendo');
  el.innerHTML='<header class="cine-cab"><div class="cine-tit"><span>'+esc(L.libro)+' · cine</span><b>'+esc(L.titulo)+'</b></div><div class="cine-bots">'+
    (EXPLORAR_DANIEL[cid]?'<button type="button" id="cineExplorar" onclick="cineExploraAbre()" aria-label="Explorar relaciones">'+IC('comparar')+'<span> Explorar</span></button>':'')+
    '<button type="button" onclick="cineModo()" id="cineModo">'+(lamModo==='presentar'?IC('libro')+'<span> Estudiar</span>':IC('play')+'<span> Presentar</span>')+'</button>'+
    (lamPuedeTodo()?'<button type="button" onclick="lamPantalla()" aria-label="Pantalla completa">'+IC('expandir')+'</button>':'')+
    (typeof meBoton==='function'?meBoton('lam-'+cid,true):'')+
    '<button type="button" class="cine-x" onclick="lamCierra()" aria-label="Cerrar">'+IC('x')+'</button></div></header>'+
    '<div class="cine-prog" aria-hidden="true"><i id="cineProg"></i></div>'+
    (L.selector?'<div class="cine-selector"><label for="cineSelector">Ir a una escena</label><select id="cineSelector" onchange="cineElige(this.value)">'+L.actos.map((a,i)=>'<option value="'+i+'">'+esc((i+1)+' · '+a.corto)+'</option>').join('')+'</select></div>':'')+
    L.actos.map((a,i)=>'<section class="cine-acto c-'+a.tipo+'" data-i="'+i+'" style="--alto:'+a.alto+'" aria-label="'+esc(a.corto)+'"><div class="cine-esc">'+CINE_HTML[a.tipo](a,L)+'</div></section>').join('')+
    '<nav class="cine-nav" aria-label="Recorrer"><button type="button" onclick="cineSalto(-1)" aria-label="Anterior">'+IC('izq')+'</button>'+
    '<span id="cineDonde" aria-live="polite"></span><button type="button" class="sig" onclick="cineSalto(1)" aria-label="Siguiente">'+IC('der')+'</button></nav>';
  el.scrollTop=0;
  if(!el.__cine){el.__cine=true;el.addEventListener('scroll',()=>{if(lamEsC()&&!cineCuadro)cineCuadro=requestAnimationFrame(cinePinta);},{passive:true});
    if(typeof addEventListener==='function')addEventListener('resize',()=>{if(lamModo&&lamEsC())cinePinta();});}
  cinePinta();
  const b=el.querySelector('.cine-x');if(b&&b.focus)b.focus({preventScroll:true});
}
/* El avance de cada acto y su efecto. Solo se mueven los actos a la vista. */
function cinePinta(){
  cineCuadro=0;
  if(cineExploraEstado)return;
  const el=document.getElementById('lam');if(!el||el.hidden||!lamEsC())return;
  const vh=el.clientHeight,y=el.scrollTop,secs=el.querySelectorAll('.cine-acto');let act=0;
  secs.forEach((s,i)=>{
    const top=s.offsetTop,h=s.offsetHeight,p=cineLim((y-top)/Math.max(1,h-vh),0,1);
    if(y+vh*.5>=top)act=i;
    if(y+vh<top-vh||y>top+h+vh)return;
    CINE_FX[cineActos()[i].tipo](s.querySelector('.cine-esc'),p,cineActos()[i]);
  });
  const tot=el.scrollHeight-vh;const pr=document.getElementById('cineProg');if(pr)pr.style.width=(tot>0?y/tot*100:0)+'%';
  if(act!==cineActo){cineActo=act;lamPaso=act;lamDonde=cineActos()[act].id;
    const selector=document.getElementById('cineSelector');if(selector)selector.value=String(act);
    const estudio=cineActos()[act].tipo==='estudio',prev=el.querySelector('.cine-nav button'),sig=el.querySelector('.cine-nav .sig');
    if(prev)prev.disabled=estudio&&act===0;if(sig)sig.disabled=estudio&&act===secs.length-1;
    const d=document.getElementById('cineDonde');if(d)d.textContent=(act+1)+' de '+secs.length+' · '+cineActos()[act].corto;lamLugar();}
}
/* La posición de desplazamiento de una pausa (acto i, fracción f). */
function cineY(i,f){
  const el=document.getElementById('lam'),s=el.querySelectorAll('.cine-acto')[i];
  return s.offsetTop+f*Math.max(0,s.offsetHeight-el.clientHeight);
}
function cineSalto(d){
  if(cineExploraEstado)return;
  const el=document.getElementById('lam');if(!el)return;
  if(cineActos()[cineActo]&&cineActos()[cineActo].tipo==='estudio'){
    const n=cineActo+d,a=cineActos()[n];if(!a)return;
    const ps=cinePausas(a);el.scrollTo({top:Math.round(cineY(n,ps[ps.length-1])),behavior:cineQuieto()?'auto':'smooth'});return;
  }
  const ys=[];cineActos().forEach((a,i)=>cinePausas(a).forEach(f=>ys.push(Math.round(cineY(i,f)))));
  const y=el.scrollTop,dest=d>0?ys.find(v=>v>y+4):ys.slice().reverse().find(v=>v<y-4);
  el.scrollTo({top:dest===undefined?(d>0?el.scrollHeight:0):dest,behavior:cineQuieto()?'auto':'smooth'});
}
function cineIrNumero(n,intento){
  if(cineExploraEstado)return;
  const a=cineActos()[Number(n)];if(!a)return;
  const el=document.getElementById('lam'),ps=cinePausas(a),s=el&&el.querySelectorAll('.cine-acto')[Number(n)];if(!s)return;
  /* Dentro de Jóvenes la hoja de estilos llega después de abrir (enlace o recarga): sin ella los
     actos aún no miden lo suyo y el salto quedaría corto. Se espera a que midan, hasta ~3 s. */
  const minAlto=a.tipo==='estudio'?Math.max(1,Number(a.alto)||1.4)*.9:1.5;
  if(s.offsetHeight<el.clientHeight*minAlto&&(intento||0)<180){requestAnimationFrame(()=>cineIrNumero(n,(intento||0)+1));return;}
  el.scrollTop=Math.round(cineY(Number(n),ps[ps.length-1]));cinePinta();
}
function cineIr(k){const i=cineActos().findIndex(a=>a.id===k);if(i>=0)cineIrNumero(i);}
function cineElige(valor){cineIrNumero(Number(valor));}
function cineModo(){
  lamModo=lamModo==='presentar'?'explorar':'presentar';
  const el=document.getElementById('lam');el.classList.toggle('cine-pres',lamModo==='presentar');
  const b=document.getElementById('cineModo');if(b)b.innerHTML=lamModo==='presentar'?IC('libro')+'<span> Estudiar</span>':IC('play')+'<span> Presentar</span>';
  cinePinta();lamLugar();
}
function cineAlCerrar(){
  cineExploraLimpia();
  if(typeof paraVoz==='function')paraVoz();
  if(cineCuadro){cancelAnimationFrame(cineCuadro);cineCuadro=0;}
  const el=document.getElementById('lam'),r=el&&el.getRootNode?el.getRootNode():document;
  if((r.fullscreenElement||document.fullscreenElement)&&document.exitFullscreen){const p=document.exitFullscreen();if(p&&p.catch)p.catch(()=>{});}
  if(el){el.removeAttribute('role');el.removeAttribute('aria-modal');el.removeAttribute('aria-label');}
  const f=cineFoco;cineFoco=null;cineActo=-1;return f;
}
function cineTecla(e){
  const el=document.getElementById('lam');
  if(lamPersonaAbierta()){
    if(e.key==='Escape'){e.preventDefault();lamPersonaCierra();cineExploraPersonaVuelve();return;}
    if(e.key==='Tab'){
      const tarjeta=document.getElementById('lamPerC'),bs=cineEnfocables(tarjeta);
      const actual=el.getRootNode().activeElement;
      if(bs.length&&((e.shiftKey&&actual===bs[0])||(!e.shiftKey&&actual===bs[bs.length-1]))){e.preventDefault();bs[e.shiftKey?bs.length-1:0].focus();}
    }
    return;
  }
  if(e.key==='Escape'){e.preventDefault();lamCierra();return;}
  if(cineExploraEstado&&e.key!=='Tab')return;
  if(e.key!=='Tab'&&e.target.closest&&e.target.closest('.cine-estudio')){cineEstudioTecla(e);return;}
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)&&!/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(e.target.tagName||'')){e.preventDefault();cineSalto(1);return;}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)&&!/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName||'')){e.preventDefault();cineSalto(-1);return;}
  if(e.key==='Tab'){
    const bs=cineEnfocables(el);
    const root=el.getRootNode?el.getRootNode():document,a=root.activeElement;
    if(bs.length&&((e.shiftKey&&a===bs[0])||(!e.shiftKey&&a===bs[bs.length-1]))){e.preventDefault();bs[e.shiftKey?bs.length-1:0].focus();}
  }
}
