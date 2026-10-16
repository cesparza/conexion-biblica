/* ───────── v236: «MI ESTUDIO», LA LISTA PERSONAL (Camilo, 15-oct) ─────────
   QUÉ ES
   Una lista de temas que cada quien se aparta desde la Biblioteca con «Agregar a mi
   estudio»: un tema entero (Daniel, Apocalipsis…), un capítulo o repaso, o una
   lámina. En la pestaña «Mi estudio» se ven juntos con su avance.
   EL AVANCE NO ES NUEVO
   Sale de lo que la app ya guarda: Leído (S.prog), Practicado y Dominado (nivelesDe,
   v205). De un tema entero se cuentan sus capítulos leídos. No se inventa ninguna
   medida.
   DÓNDE SE GUARDA
   - Cada llave lleva [momento, 1|0]: agregada o quitada, y cuándo. Así dos aparatos
     se funden sin revivir lo que alguien quitó (gana lo más reciente).
   - En este aparato (localStorage, siempre con try/catch: puede no haber).
   - En la cuenta, si el servidor sabe quién es: con su código, con la clave del
     director o, dentro de Jóvenes, con la sesión de esa app (la puerta lo dice). El
     aparato manda su lista y el servidor la funde y la devuelve (/api/mi-estudio).
     Al entrar, lo que se apartó sin cuenta pasa a la cuenta y deja de ser del aparato.
   - Solo su dueño la ve. No hay lista de nadie en ningún otro lugar.
   LAS LLAVES
   Las mismas de la Tertulia de Jóvenes y de temas.json: `cap-<id>`, `lam-<id>`, y
   `tema-<tema>` para un tema entero. */

var ME_K_APARATO=null, ME_K_CUENTA=null;
/* La llave sigue a la de las fichas (CLAVE): dentro de Jóvenes, una por persona. */
function meK(cual){const b=(typeof CLAVE==='string'?CLAVE:'conexion-biblica-v4')+'-mi-estudio';return cual==='cuenta'?b+'-cuenta':b;}
var meModo='aparato', meSabe=false, meEnvio=0, meOcupado=false, mePend=false;
/* Antes de que el servidor conteste, se usa lo último que se supo: si este aparato tiene
   la lista de una cuenta, es que había cuenta. */
function meModoAhora(){if(meSabe)return meModo;try{return Object.keys(meLeeMapa(meK('cuenta'))).length?'cuenta':'aparato';}catch(e){return 'aparato';}}
var meLeeMapa=k=>{try{const x=JSON.parse(localStorage.getItem(k)||'null');return meLimpio(x);}catch(e){return {};}};
var meGuardaMapa=(k,m)=>{try{if(m&&Object.keys(m).length)localStorage.setItem(k,JSON.stringify(m));else localStorage.removeItem(k);}catch(e){}};
var ME_RE=/^(cap|lam|tema)-[a-z0-9-]{1,24}$/;
function meLimpio(x){
  const o={};if(!x||typeof x!=='object'||Array.isArray(x))return o;
  for(const [k,v] of Object.entries(x)){if(!ME_RE.test(k)||!Array.isArray(v))continue;const t=Math.round(Number(v[0]));if(!Number.isFinite(t)||t<1.6e12)continue;o[k]=[t,v[1]===1||v[1]===true?1:0];}
  return o;
}
/* La misma regla que el servidor, para ver la lista sin esperar la red. */
function meFunde(a,b){const o=Object.assign({},a);for(const [k,v] of Object.entries(b||{})){const x=o[k];if(!x||v[0]>x[0]||(v[0]===x[0]&&v[1]>x[1]))o[k]=v;}return o;}
/** El mapa que se ve: el de la cuenta si hay cuenta, el del aparato si no. */
function meMapa(){return meModoAhora()==='cuenta'?meLeeMapa(meK('cuenta')):meLeeMapa(meK('aparato'));}
/** Las llaves en la lista, de la más reciente a la más vieja, solo las que existen. */
function meLista(){const m=meMapa();return Object.keys(m).filter(k=>m[k][1]===1&&meExiste(k)).sort((a,b)=>m[b][0]-m[a][0]);}
var meEsta=k=>{const v=meMapa()[k];return !!(v&&v[1]===1);};
function meExiste(k){
  const m=/^(cap|lam|tema)-(.+)$/.exec(k);if(!m)return false;
  if(m[1]==='cap')return !!buscaItem(m[2]);
  if(m[1]==='lam')return typeof LAMINAS!=='undefined'&&!!(LAMINAS[m[2]]&&LAMINAS[m[2]].dir)&&!!buscaItem(m[2]);
  return !!(IDS_DE_TEMA[m[2]]&&IDS_DE_TEMA[m[2]].length);
}
/** Qué es una llave: {tipo, id, titulo, sub, tema}. */
function meQue(k){
  const m=/^(cap|lam|tema)-(.+)$/.exec(k);if(!m||!meExiste(k))return null;
  if(m[1]==='tema')return {tipo:'tema',id:m[2],titulo:bibNombreTema(m[2]),sub:'Tema completo',tema:m[2]};
  const c=buscaItem(m[2]);
  if(m[1]==='lam')return {tipo:'lam',id:m[2],titulo:c.label,sub:LAMINAS[m[2]].titulo,tema:bibTemaDe(m[2])};
  return {tipo:c.prof?'prof':CAPS.some(x=>x.id===c.id)?'cap':'rep',id:m[2],titulo:c.label,sub:c.sub||'',tema:bibTemaDe(m[2])||c.tema||''};
}

/* ── El botón de agregar y quitar (una pieza, un armado) ── */
function meBoton(k,chico){
  if(!meExiste(k))return '';
  const on=meEsta(k);
  return '<button type="button" class="me-tg'+(on?' on':'')+(chico?' chico':'')+'" data-me="'+k+'" aria-pressed="'+on+'" onclick="meToca(\''+k+'\')">'+meBotonDentro(on)+'</button>';
}
var meBotonDentro=on=>on?IC('marca','me-ico')+'<span class="me-tx">En mi estudio</span><span class="me-q">Quitar</span>':IC('mas','me-ico')+'<span class="me-tx">Agregar a mi estudio</span>';
function meToca(k){
  if(!ME_RE.test(k)||!meExiste(k))return;
  const on=!meEsta(k),kk=meK(meModoAhora()),m=meLeeMapa(kk);
  m[k]=[Math.max(Date.now(),((m[k]||[])[0]||0)+1),on?1:0];meGuardaMapa(kk,m);
  meRepintaBotones(k);
  if(pantallaAct==='miestudio')pintaMiEstudio();
  pintaSenales();
  if(typeof aviso==='function')aviso(on?'Agregado a Mi estudio':'Quitado de Mi estudio');
  if(meModoAhora()==='cuenta')meSube();
}
function meRepintaBotones(k){
  const on=meEsta(k);
  document.querySelectorAll('[data-me="'+k+'"]').forEach(b=>{b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));b.innerHTML=meBotonDentro(on);});
}

/* ── Con la cuenta ── */
/* Pregunta y funde: lo del aparato sin cuenta + lo de la cuenta en este aparato + lo del
   servidor. Si el servidor no sabe quién es (401), la lista se queda en el aparato. */
async function meSincroniza(){
  if(meOcupado){mePend=true;return;}
  meOcupado=true;
  try{
    const local=meFunde(meLeeMapa(meK('aparato')),meLeeMapa(meK('cuenta')));
    const d=await srvFetch('/mi-estudio',{method:'POST',body:JSON.stringify({lista:local})});
    meGuardaMapa(meK('cuenta'),meLimpio(d&&d.lista));
    /* Lo apartado sin cuenta ya es de la cuenta: deja de ser del aparato. */
    meGuardaMapa(meK('aparato'),{});
    meModo='cuenta';meSabe=true;
  }catch(e){
    if(e&&e.status===401){meModo='aparato';meSabe=true;meGuardaMapa(meK('cuenta'),{});}
    /* Sin red: se queda como estaba y vuelve a intentar la próxima vez. */
  }finally{meOcupado=false;}
  if(pantallaAct==='miestudio')pintaMiEstudio();
  document.querySelectorAll('[data-me]').forEach(b=>meRepintaBotones(b.getAttribute('data-me')));
  if(mePend){mePend=false;meSincroniza();}
}
/* Al tocar, se sube un momento después (varios toques seguidos, una sola subida). */
function meSube(){clearTimeout(meEnvio);meEnvio=setTimeout(()=>{meSincroniza();},700);}
/* Al salir de la cuenta, la lista de la cuenta deja este aparato. */
function meSale(){meModo='aparato';meSabe=true;meGuardaMapa(meK('cuenta'),{});if(pantallaAct==='miestudio')pintaMiEstudio();}

/* ── El avance de cada uno, con lo que ya existe ── */
function meAvance(q){
  if(q.tipo==='tema'){
    const ids=IDS_DE_TEMA[q.id]||[],caps=CAPS.filter(c=>ids.includes(c.id));
    const leidos=caps.filter(c=>(S.prog[c.id]||0)>=100).length;
    const pct=caps.length?Math.round(caps.reduce((a,c)=>a+Math.min(100,S.prog[c.id]||0),0)/caps.length):0;
    return '<div class="me-av"><div class="me-av-t"><b>'+leidos+'</b> de '+caps.length+' capítulos leídos</div>'+
      '<div class="nv3 fino" aria-label="Leído '+pct+'%"><div class="nv3-b nv3-l"><span class="nv3-pista"><i style="width:'+pct+'%"></i></span></div></div></div>';
  }
  const n=nivelesDe(q.id);
  return '<div class="me-av">'+barrasNivel(n)+'</div>';
}
function meAbre(k){
  const q=meQue(k);if(!q)return;
  if(q.tipo==='tema'){bibPonTema(q.id);ir('estudio');return;}
  if(q.tipo==='lam'){bibLamina(q.id);return;}
  verCap(q.id);
}

/* ── La pantalla ── */
var ME_TIPO={tema:'Tema',cap:'Capítulo',rep:'Repaso',prof:'Para profundizar',lam:'Lámina'};
function pintaMiEstudio(){
  const z=document.getElementById('me-cuerpo');if(!z)return;
  const L=meLista().map(k=>[k,meQue(k)]).filter(x=>x[1]);
  const estado=meModoAhora()==='cuenta'?IC('check')+' Se guarda en tu cuenta: la ves en cualquier aparato donde entres.':
    IC('persona')+' Se guarda en este aparato. Si entras con tu código, pasa a tu cuenta.';
  const fila=([k,q])=>'<li class="me-f"><button type="button" class="me-abre" onclick="meAbre(\''+k+'\')">'+
    '<span class="me-fic">'+(q.tipo==='lam'?lamMiniHTML(q.id):IC(q.tipo==='tema'?'libro':q.tipo==='prof'?'brujula':q.tipo==='rep'?'lupa':'lista'))+'</span>'+
    '<span class="me-ftx"><small>'+esc(ME_TIPO[q.tipo])+(q.tipo!=='tema'&&q.tema?' · '+esc(bibNombreTema(q.tema)):'')+'</small><b>'+esc(q.titulo)+'</b>'+(q.sub?'<span>'+esc(q.sub)+'</span>':'')+'</span>'+IC('der','me-fl')+'</button>'+
    meAvance(q)+'<div class="me-facc">'+meBoton(k,true)+'</div></li>';
  z.innerHTML='<div class="me-hero"><div class="bib-ant">'+IC('marca')+' Mi estudio</div>'+
    '<h2 class="bib-tit">Lo que te apartaste para estudiar</h2>'+
    '<p class="bib-p">Agrega temas, capítulos y láminas desde la Biblioteca. Aquí ves tu avance en cada uno.</p>'+
    '<p class="me-donde">'+estado+'</p></div>'+
    (L.length?'<ul class="me-l">'+L.map(fila).join('')+'</ul>':
      '<div class="me-vacio"><span class="me-vic">'+IC('marca')+'</span><b>Todavía no tienes nada aquí</b>'+
      '<p>En la Biblioteca, cada tema, capítulo y lámina tiene «Agregar a mi estudio».</p>'+
      '<button type="button" class="btn ver" onclick="ir(\'estudio\')">'+IC('libro')+' Ir a la Biblioteca</button></div>')+
    '<h3 class="bib-h">Para repasar</h3><div class="me-mas">'+
    '<button type="button" class="me-ir" onclick="ir(\'tarjetas\')"><span class="me-iric">'+IC('tarjetas')+'</span><span><b>Practicar</b><small>Tarjetas y juegos del día</small></span><span class="nv" id="nv-tj2" hidden></span>'+IC('der','me-fl')+'</button>'+
    '<button type="button" class="me-ir" onclick="ir(\'logros\')"><span class="me-iric">'+IC('trofeo')+'</span><span><b>Logros</b><small>Tu racha, insignias y exámenes</small></span>'+IC('der','me-fl')+'</button></div>';
  pintaSenales();
}

/* ── Ir a un tema desde afuera (Jóvenes: «Estudia el tema de hoy») ──
   Recibe una llave (`lam-d7`, `cap-d8`, `cap-cr20`, `tema-apocalipsis`) o un camino de
   la dirección («biblioteca/d7/lamina/d7/explorar»). No recarga nada: lleva al lugar
   igual que un enlace (lugarAplica). Devuelve si lo encontró. */
function irATema(x){
  x=String(x||'').trim();
  const m=/^(cap|lam|tema)-([a-z0-9-]{1,24})$/.exec(x);
  let camino=x;
  if(m){
    if(!meExiste(x))return false;
    if(m[1]==='tema'){cierraCapas();bibPonTema(m[2]);ir('estudio');lugarAnota();return true;}
    camino=m[1]==='lam'?'biblioteca/'+m[2]+'/lamina/'+m[2]+'/explorar':'biblioteca/'+m[2];
  }
  const o=lugarParte(camino);
  if(!o.pant||(o.item&&!buscaItem(o.item)))return false;
  cierraCapas();
  try{lugarAplica(camino,false);}catch(e){console.error(e);}
  lugarAnota();
  return true;
}
/* Lo que tapa la pantalla (una lámina abierta, la hoja del versículo, la lectura) se cierra antes de ir. */
function cierraCapas(){
  try{const l=document.getElementById('lam');if(l&&!l.hidden&&typeof lamCierra==='function')lamCierra();}catch(e){}
  try{if(typeof cierraHoja==='function')cierraHoja();}catch(e){}
}
