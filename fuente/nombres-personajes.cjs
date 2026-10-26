/** Name forms are shared by homonyms; identity and family links are unchanged. */
function normalizarNombre(persona, catalogo){
  const normal = s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
  const nombre = catalogo.preferidos[persona.id] || persona.nombre;
  const alias = [...(persona.alias||[])];
  for(const a of [persona.nombre,nombre,...(catalogo.adicionales[persona.id]||[])]){
    if(a&&!alias.some(x=>(typeof x==='string'?x:x.t)===a))alias.push(a);
  }
  const textos = [nombre,...alias.map(x=>typeof x==='string'?x:x.t)];
  const claves = Object.keys(catalogo.formas).filter(k=>!k.includes('(arameo)')&&!k.includes('(griego)')&&textos.some(t=>{
    const a=normal(t),b=normal(k);return a===b||a.startsWith(b+',')||a.startsWith(b+' (')||a.startsWith(b+' ');
  }));
  // A spelling used for Oded in older translations is not the name Obed.
  const elegidas = persona.id==='persona-oded-samaria'?['Oded']:claves;
  elegidas.sort((a,b)=>Number(!normal(nombre).startsWith(normal(a)))-Number(!normal(nombre).startsWith(normal(b))));
  const griegas = Object.keys(catalogo.formas).filter(k=>k.endsWith(' (griego)')&&textos.some(t=>{const a=normal(t),b=normal(k.replace(' (griego)',''));return a===b||a.startsWith(b+',')||a.startsWith(b+' (')||a.startsWith(b+' ');}));
  const formas = [...elegidas.flatMap(k=>[catalogo.formas[k],catalogo.formas[k+' (arameo)']].filter(Boolean)),...griegas.map(k=>catalogo.formas[k])];
  const variantes = persona.nombres?.variantes || [...new Set(alias.filter(x=>typeof x==='string'))].filter(a=>normal(a)!==normal(nombre));
  for(const f of formas)for(const a of [f.escritura,f.escritura.replace(/[\u0591-\u05BD\u05BF-\u05C7]/g,''),f.transliteracion,f.pronunciacion].filter(Boolean))if(!alias.includes(a))alias.push(a);
  return {...persona,nombre,alias,nombres:{variantes,formas,criterio:catalogo.criterio,fuente:catalogo.fuente}};
}
/** Shared biography fragment, without changing identity, layout or navigation. */
function nombresHTML(persona){
  const n=persona.nombres;if(!n)return '';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const forma=f=>'<bdi dir="'+(f.idioma==='griego'?'ltr':'rtl')+'" lang="'+(f.idioma==='griego'?'grc':f.idioma==='arameo'?'arc':'he')+'">'+esc(f.escritura)+'</bdi> · '+esc(f.pronunciacion||f.transliteracion);
  if(!n.formas.length&&!n.variantes.length)return '';
  return '<div class="rp-nombres sec-fuente" data-personas-omitir>'+
    (n.formas.length?'<p><b>'+esc(n.formas[0].nombre)+' · '+esc(n.formas[0].idioma)+':</b> '+forma(n.formas[0])+'</p>':'')+
    '<details><summary>Otros nombres y documentación</summary>'+
    (n.variantes.length?'<p><b>También aparece como:</b> '+n.variantes.map(esc).join(' · ')+'</p>':'')+
    n.formas.map(f=>'<p><b>'+esc(f.nombre)+' · '+esc(f.idioma)+':</b> '+forma(f)+' · Transliteración: '+esc(f.transliteracion)+' · '+esc(f.strong)+(f.equivalenciaGriega?' · '+esc(f.equivalenciaGriega):'')+(f.nota?' · '+esc(f.nota):'')+'</p>').join('')+
    (n.formas.length?'<p>'+esc(n.criterio)+'</p><p><a href="'+esc(n.fuente.url)+'" target="_blank" rel="noopener noreferrer">'+esc(n.fuente.titulo)+'</a>'+(n.fuente.griego?' · <a href="'+esc(n.fuente.griego)+'" target="_blank" rel="noopener noreferrer">Léxico griego</a>':'')+'. '+esc(n.fuente.licencia)+'</p>':'')+'</details></div>';
}
module.exports = {normalizarNombre,nombresHTML};
