/* ───────── CINE: una lámina que se recorre con el dedo (v266) ─────────
   Camilo (20-oct): Daniel 9 «tipo producción de Hollywood», que se mueva como
   Daniel 2, 7 y 8. MECANISMO: la lámina (#lam) es el contenedor que se desplaza.
   Cada acto es una sección alta con una escena fija (sticky); el avance del
   desplazamiento dentro del acto (0 a 1) mueve la escena. Los actos son datos
   (LAMINAS[id].actos) y los efectos son seis piezas que se reusan: luz, cuenta,
   sello, mapa, via y barra. Sin librerías. */
let cineFoco=null,cineCuadro=0,cineActo=-1;
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

/* ── Cada tipo de acto: su HTML ── */
const CINE_HTML={
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
    const n=Math.round(a.de+(a.a-a.de)*cineTramo(p,.16,.42));
    s.querySelector('.cine-num b').textContent=n;s.querySelector('.cine-num small').textContent=n>=a.a?'años':'semanas';
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
const CINE_PAUSAS={luz:[.4,.9],cuenta:[.45,.95],sello:[.3,.7],mapa:[.55,.95],via:null,barra:[.5,.95]};
function cinePausas(a){
  if(a.tipo!=='via')return CINE_PAUSAS[a.tipo];
  /* La estación i queda en el centro cuando el avance es (0,9·i + 0,54) / (0,9·(n−1) + 0,54): ver CINE_FX.via. */
  const n=a.estaciones.length;return a.estaciones.map((e,i)=>Math.min(.985,(.9*i+.54)/(.9*(n-1)+.54)));
}

/* ── Abrir, mover y cerrar ── */
function cineAbre(cid,modo){
  const el=document.getElementById('lam');if(!el)return;
  if(!lamModo){const r=el.getRootNode?el.getRootNode():document;cineFoco=r.activeElement;}
  lamPara();if(lamModo&&lamEsE())lamLimpia();
  lamId=cid;lamModo=modo==='presentar'?'presentar':'explorar';lamPaso=0;lamDonde=LAM().actos[0].id;cineActo=-1;
  const L=LAM();
  el.hidden=false;el.className='lam cine'+(lamModo==='presentar'?' cine-pres':'')+(cineQuieto()?' quieto':'');
  el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',L.libro+' · '+L.titulo);
  document.body.classList.add('leyendo');
  el.innerHTML='<header class="cine-cab"><div class="cine-tit"><span>'+esc(L.libro)+' · cine</span><b>'+esc(L.titulo)+'</b></div><div class="cine-bots">'+
    '<button type="button" onclick="cineModo()" id="cineModo">'+(lamModo==='presentar'?IC('libro')+'<span> Estudiar</span>':IC('play')+'<span> Presentar</span>')+'</button>'+
    (lamPuedeTodo()?'<button type="button" onclick="lamPantalla()" aria-label="Pantalla completa">'+IC('expandir')+'</button>':'')+
    (typeof meBoton==='function'?meBoton('lam-'+cid,true):'')+
    '<button type="button" class="cine-x" onclick="lamCierra()" aria-label="Cerrar">'+IC('x')+'</button></div></header>'+
    '<div class="cine-prog" aria-hidden="true"><i id="cineProg"></i></div>'+
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
    const d=document.getElementById('cineDonde');if(d)d.textContent=(act+1)+' de '+secs.length+' · '+cineActos()[act].corto;lamLugar();}
}
/* La posición de desplazamiento de una pausa (acto i, fracción f). */
function cineY(i,f){
  const el=document.getElementById('lam'),s=el.querySelectorAll('.cine-acto')[i];
  return s.offsetTop+f*Math.max(0,s.offsetHeight-el.clientHeight);
}
function cineSalto(d){
  const el=document.getElementById('lam');if(!el)return;
  const ys=[];cineActos().forEach((a,i)=>cinePausas(a).forEach(f=>ys.push(Math.round(cineY(i,f)))));
  const y=el.scrollTop,dest=d>0?ys.find(v=>v>y+4):ys.slice().reverse().find(v=>v<y-4);
  el.scrollTo({top:dest===undefined?(d>0?el.scrollHeight:0):dest,behavior:cineQuieto()?'auto':'smooth'});
}
function cineIrNumero(n,intento){
  const a=cineActos()[Number(n)];if(!a)return;
  const el=document.getElementById('lam'),ps=cinePausas(a),s=el&&el.querySelectorAll('.cine-acto')[Number(n)];if(!s)return;
  /* Dentro de Jóvenes la hoja de estilos llega después de abrir (enlace o recarga): sin ella los
     actos aún no miden lo suyo y el salto quedaría corto. Se espera a que midan, hasta ~3 s. */
  if(s.offsetHeight<el.clientHeight*1.5&&(intento||0)<180){requestAnimationFrame(()=>cineIrNumero(n,(intento||0)+1));return;}
  el.scrollTop=Math.round(cineY(Number(n),ps[ps.length-1]));cinePinta();
}
function cineIr(k){const i=cineActos().findIndex(a=>a.id===k);if(i>=0)cineIrNumero(i);}
function cineModo(){
  lamModo=lamModo==='presentar'?'explorar':'presentar';
  const el=document.getElementById('lam');el.classList.toggle('cine-pres',lamModo==='presentar');
  const b=document.getElementById('cineModo');if(b)b.innerHTML=lamModo==='presentar'?IC('libro')+'<span> Estudiar</span>':IC('play')+'<span> Presentar</span>';
  cinePinta();lamLugar();
}
function cineAlCerrar(){
  if(typeof paraVoz==='function')paraVoz();
  if(cineCuadro){cancelAnimationFrame(cineCuadro);cineCuadro=0;}
  const el=document.getElementById('lam'),r=el&&el.getRootNode?el.getRootNode():document;
  if((r.fullscreenElement||document.fullscreenElement)&&document.exitFullscreen){const p=document.exitFullscreen();if(p&&p.catch)p.catch(()=>{});}
  if(el){el.removeAttribute('role');el.removeAttribute('aria-modal');el.removeAttribute('aria-label');}
  const f=cineFoco;cineFoco=null;cineActo=-1;return f;
}
function cineTecla(e){
  const el=document.getElementById('lam');
  if(e.key==='Escape'){e.preventDefault();lamCierra();return;}
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)&&!/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(e.target.tagName||'')){e.preventDefault();cineSalto(1);return;}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)&&!/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName||'')){e.preventDefault();cineSalto(-1);return;}
  if(e.key==='Tab'){
    const bs=[...el.querySelectorAll('button:not(:disabled),a[href]')].filter(b=>b.getClientRects().length);
    const root=el.getRootNode?el.getRootNode():document,a=root.activeElement;
    if(bs.length&&((e.shiftKey&&a===bs[0])||(!e.shiftKey&&a===bs[bs.length-1]))){e.preventDefault();bs[e.shiftKey?bs.length-1:0].focus();}
  }
}
