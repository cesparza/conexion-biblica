/* ───────── v234: PARALELOS (PARALELOS, armadas en el build por fuente/paralelos.js) ─────────
   Camilo (15-oct): «paralelos por capítulo de acuerdo a un poder y una característica o
   temática, de tal manera que se obtenga todo lo que se dice de algo agrupado». Hermana de
   Comparar y de los últimos acontecimientos: va en la misma sala, debajo de ellos.
   Una hoja por poder y una por tema; filas = características, columnas = capítulos. En
   pantalla ancha es una tabla con la característica fija a la izquierda (si un día no
   caben los capítulos, la tabla rueda de lado dentro de su caja); en una caja angosta
   cada característica es una tarjeta con los capítulos como renglones. Es el MISMO
   marcado: lo cambia el CSS por el ancho de la sala (@container), así sirve igual dentro
   de Jóvenes. Tocar una celda abre su paso en la lámina. Una celda sin texto es «–»:
   aquí nada se deduce.
   Este archivo va pegado después de app.js en el mismo <script> (fuente/build.js). Solo
   declara funciones y `var`: Comparar puede pintarse al arrancar, antes de que el
   archivo termine de leerse, y un `const` o `let` todavía no existiría. */
var parSel, parTocado = false;
function parDatos(){return typeof PARALELOS!=='undefined'&&Array.isArray(PARALELOS)?PARALELOS:[];}
function parHoja(id){const P=parDatos();return P.find(h=>h.id===(id||parSel))||P.find(h=>h.id==='papal')||P[0]||null;}
function parHTML(){
  const P=parDatos(),h=parHoja();if(!h)return '';
  const chips=t=>P.filter(x=>x.tipo===t).map(x=>'<button type="button" class="par-chip'+(x.id===h.id?' on':'')+'" data-par="'+esc(x.id)+'" aria-pressed="'+(x.id===h.id)+'"'+
    (x.c?' style="--c:'+esc(x.c)+'"':'')+' onclick="parElige(\''+x.id+'\')">'+(x.c?'<i aria-hidden="true"></i>':'')+esc(x.t)+'</button>').join('');
  return '<section class="par" id="cmpPar" aria-labelledby="cmpParT"><header class="par-cab"><div class="cmp-ant">'+IC('comparar')+' Paralelos</div>'+
    '<h3 class="cmp-tit" id="cmpParT">Todo lo que se dice de algo, junto</h3>'+
    '<p class="cmp-p">Una hoja por poder y una por tema: cada fila es una característica y cada columna, un capítulo. Toca una celda para verla en su lámina.</p></header>'+
    '<div class="par-elige"><div class="par-grupo" role="group" aria-label="Por poder"><span class="par-gt">Por poder</span>'+chips('poder')+'</div>'+
    '<div class="par-grupo" role="group" aria-label="Por tema"><span class="par-gt">Por tema</span>'+chips('tema')+'</div></div>'+
    '<div class="par-hoja" id="parHoja">'+parHojaHTML(h)+'</div></section>';
}
function parNomCap(k){return typeof cmpNom==='function'?cmpNom(k):k;}
function parHojaHTML(h){
  const cols=h.cols||[];
  const vac=cols.filter(k=>k in (h.vacias||{}));
  return '<header class="par-hc"'+(h.c?' style="--c:'+esc(h.c)+'"':'')+'><span class="par-tipo">'+(h.tipo==='tema'?'Tema':'Poder')+'</span><h4>'+esc(h.t)+'</h4>'+
      (h.s?'<p class="par-s">'+esc(h.s)+'</p>':'')+
      (h.lema?'<p class="par-lema"><q>'+esc(h.lema[1])+'</q> <cite>'+esc(h.lema[0])+'</cite></p>':'')+'</header>'+
    '<div class="par-scroll"><div class="par-m" role="table" aria-label="'+esc(h.t+': cada característica en cada capítulo')+'" style="--n:'+cols.length+'">'+
      '<div class="par-f cab" role="row"><span class="par-0" role="columnheader">Característica</span>'+
        cols.map(k=>'<span class="par-cl" role="columnheader">'+esc(parNomCap(k))+'</span>').join('')+'</div>'+
      h.filas.map(f=>'<div class="par-f" role="row"><span class="par-k" role="rowheader">'+esc(f.t)+'</span>'+cols.map(k=>parCelda(f,k)).join('')+'</div>').join('')+
    '</div></div>'+
    (vac.length?'<p class="par-no">'+vac.map(k=>'No aparece en '+esc(parNomCap(k))+(h.vacias[k]?': '+esc(h.vacias[k].replace(/^./,c=>c.toLowerCase())):'')+'.').join(' ')+'</p>':'')+
    (h.fuente?'<p class="sec-fuente">Fuente: '+h.fuente+'</p>':'');
}
function parCelda(f,k){
  const es=f.celdas[k]||[],cap='<span class="par-cap">'+esc(parNomCap(k))+'</span>';
  if(!es.length)return '<span class="par-c vacia" role="cell" aria-label="'+esc(parNomCap(k)+': no lo trae')+'">'+cap+'<span class="par-es"><span class="par-nada" aria-hidden="true">–</span></span></span>';
  return '<button type="button" class="par-c" role="cell" onclick="parIr(\''+k+'\',\''+es[0].p+'\')" aria-label="'+esc(f.t+' en '+parNomCap(k)+'. Abre la lámina')+'">'+cap+
    '<span class="par-es">'+es.map(parEnt).join('')+'</span></button>';
}
/* b: la Biblia (RV1995), entre « »; q: un autor, entre “ ”; n: la línea de la lámina, con su rótulo. */
function parEnt(e){
  if(e.tipo==='b')return '<span class="par-b"><q>'+esc(e.t)+'</q> <cite>'+esc(e.ref)+'</cite></span>';
  if(e.tipo==='q')return '<span class="par-q">“'+esc(e.t)+'”</span>';
  return '<span class="par-n">'+(e.k?'<b>'+esc(e.k)+'.</b> ':'')+e.t+'</span>';
}
function parElige(id){
  const h=parHoja(id);if(!h)return;
  /* Lo último que se tocó es lo que guarda el enlace: los últimos acontecimientos van antes en lugarActual. */
  parSel=h.id;parTocado=true;ultTocado=false;
  const m=document.getElementById('cmpPar'),d=document.getElementById('parHoja');if(!m||!d)return;
  m.querySelectorAll('.par-chip').forEach(b=>{const on=b.getAttribute('data-par')===h.id;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});
  d.innerHTML=parHojaHTML(h);
  d.classList.remove('ve');void d.offsetWidth;d.classList.add('ve');
  lugarAnota();
}
/* La celda lleva a su paso en la lámina (una parte, las señas, el periodo, las fases o el cierre). */
function parIr(cap,k){
  if(typeof LAMINAS==='undefined'||!LAMINAS[cap])return;
  parTocado=true;
  lamAbre(cap,'explorar');
  setTimeout(()=>{if(lamId===cap&&k)lamIr(k);},60);
}
/* Del enlace o la recarga: «…/paralelos/<hoja>». */
function parAplica(id,dondeOk){
  if(!parHoja(id)||parHoja(id).id!==id||!document.getElementById('cmpPar'))return false;
  parElige(id);
  if(!dondeOk){const m=document.getElementById('cmpPar');if(m&&m.scrollIntoView)m.scrollIntoView({block:'start'});}
  return true;
}
