/* Revisa TODO el material que se le pregunta a una nina, en todos los bancos,
   y lo contrasta con el texto biblico que la app ya trae.
   MIDE, NO DECIDE. Sale con 1 si hay algo duro.

   POR QUE EXISTE
   Las suites comprueban que el examen funciona, no que las preguntas digan la
   verdad. Una respuesta equivocada pasa las cuatro en verde y solo se
   descubre cuando una nina la estudia mal y la pierde en el campamento.

   QUE SE PUEDE CONTRASTAR Y QUE NO, QUE ES PARTE DEL RESULTADO
   · fuente/biblia.js trae Daniel 1-12 completo en RV1995, 357 versiculos, que
     es la misma version en la que esta escrito todo el material de Daniel.
     Ahi el contraste es de verdad y lo que no calce es DURO.
   · fuente/biblia-otros.js trae 200 capitulos de otros libros, pero en RV1909.
     La matutina cita NTV y las creencias citan la cartilla, asi que una
     diferencia ahi puede ser solo de version: va a REVISAR, nunca a DURO.
   · Profetas y Reyes es un libro, no versiculos: de esas solo estructura.

   POR QUE «REVISAR» NO ES «DURO»
   Una respuesta puede ser correcta sin estar escrita en el verso: «setenta
   semanas» son cuatrocientos noventa anos, y el verso dice lo primero. Meter
   eso en la lista dura convierte el verificador en algo que se ignora, y un
   verificador que miente es peor que no tenerlo. */
const path=require('path');
const F=f=>require(path.join(__dirname,'..','fuente',f));
const {BANCO}=F('preguntas.js');
const {BANCO_PR}=F('preguntas-pr.js');
const {BANCO_COBERTURA}=F('preguntas-cobertura.js');
const {MAT_EXTRA}=F('matutina-extra.js');
const {MAT_COMPLETAR}=F('matutina-completar.js');
const {CR_BANCO}=F('creencias.js');
const {TARJETAS}=F('tarjetas.js');
const {VERS}=F('biblia.js');
const {OTRAS_VERS,NOMBRES_OTROS}=F('biblia-otros.js');

const BANCOS=[
  ['Daniel y P&R',        BANCO],
  ['P&R, completar',      BANCO_PR],
  ['Daniel 7-12, cobertura', BANCO_COBERTURA],
  ['Matutina',            MAT_EXTRA],
  ['Matutina, completar', MAT_COMPLETAR],
  ['28 creencias',        CR_BANCO],
];

const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
  .replace(/[«»"“”'’,.;:!¡?¿()\[\]—–-]/g,' ').replace(/\s+/g,' ').trim();

/* El slug del libro tal como lo guarda biblia-otros.js, desde su nombre. */
const SLUG={}; for(const [s,n] of Object.entries(NOMBRES_OTROS)) SLUG[norm(n)]=s;

/* ── la Biblia entera, si esta ──
   files/_biblia-libre-raw.txt es la RV1909 completa, 66 libros, en el formato
   libro+capitulo+versiculo+texto+. Vive FUERA del repo, igual que los .txt que
   verifica tools/citas.js, porque el repo es publico. Si no esta, el
   verificador sigue corriendo con lo que hay dentro: lo dice y no se cae. */
const fs=require('fs');
const LIBROS=['Genesis','Exodo','Levitico','Numeros','Deuteronomio','Josue','Jueces','Rut',
 '1 Samuel','2 Samuel','1 Reyes','2 Reyes','1 Cronicas','2 Cronicas','Esdras','Nehemias','Ester',
 'Job','Salmos','Proverbios','Eclesiastes','Cantares','Isaias','Jeremias','Lamentaciones',
 'Ezequiel','Daniel','Oseas','Joel','Amos','Abdias','Jonas','Miqueas','Nahum','Habacuc',
 'Sofonias','Hageo','Zacarias','Malaquias','Mateo','Marcos','Lucas','Juan','Hechos','Romanos',
 '1 Corintios','2 Corintios','Galatas','Efesios','Filipenses','Colosenses','1 Tesalonicenses',
 '2 Tesalonicenses','1 Timoteo','2 Timoteo','Tito','Filemon','Hebreos','Santiago','1 Pedro',
 '2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Apocalipsis'];
const ALIAS={'salmo':'Salmos','cantar de los cantares':'Cantares','apocalipsis de juan':'Apocalipsis'};
const NUM={}; LIBROS.forEach((l,i)=>{NUM[norm(l)]=i+1;});
for(const [a,l] of Object.entries(ALIAS)) NUM[norm(a)]=NUM[norm(l)];
let BIBLIA=null, RUTA_BIBLIA=path.join(__dirname,'..','..','..','files','_biblia-libre-raw.txt');
try{
  const bruto=fs.readFileSync(RUTA_BIBLIA,'utf8');
  BIBLIA={};
  for(const linea of bruto.split('\n')){
    const m=/^(\d+)\+(\d+)\+(\d+)\+([\s\S]*?)\+?$/.exec(linea.trim());
    if(!m)continue;
    (BIBLIA[m[1]+'-'+m[2]]||(BIBLIA[m[1]+'-'+m[2]]={}))[+m[3]]=m[4];
  }
}catch(e){ BIBLIA=null; }

/* Profetas y Reyes, el libro entero. Los capitulos no se separan bien en el
   PDF, asi que se usa el libro completo: para una frase transcrita eso alcanza
   (o esta en el libro o no esta), y para una opcion es una red ancha, asi que
   solo se senala cuando NO aparece en ninguna parte. El .txt se genera con
   pdftotext -layout y vive fuera del repo, como todas las fuentes. */
let PYR=null;
try{
  /* Dos cosas del PDF antes de comparar, y las dos costaron un falso positivo:
     el libro corta palabras al final de renglon con guion («pa-\nnoramica»), y
     mete el numero de pagina entre corchetes en medio del parrafo. Sin quitar
     eso, una frase que SI esta en el libro se reporta como que no. */
  PYR=norm(fs.readFileSync(path.join(__dirname,'..','..','..','files','_pr-texto.txt'),'utf8')
    .replace(/-\s*\r?\n\s*/g,'').replace(/\[\d+\]/g,' '));
}catch(e){ PYR=null; }

/* Cualquier cita, contra la RV1909 completa. */
function enLaBibliaEntera(nombre,cap,ini,fin){
  if(!BIBLIA)return null;
  const n=NUM[norm(nombre)]; if(!n)return null;
  const c=BIBLIA[n+'-'+cap]; if(!c)return null;
  let t=''; for(let v=ini;v<=fin;v++) if(c[v]) t+=' '+c[v];
  return t.trim()||null;
}

/* Devuelve el texto citado y de donde salio, o null si no hay contra que
   comparar. `fuerte` dice si la version coincide con la del material. */
function textoCitado(txt,cap){
  txt=String(txt||'');
  const dan=/(?:Daniel\s+)?(\d{1,2}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?/.exec(txt);
  const esDan=/Daniel/i.test(txt)||/^d\d+$/.test(cap||'');
  if(dan&&esDan){
    const c=/Daniel/i.test(txt)?dan[1]:((cap||'').match(/^d(\d+)$/)||[])[1];
    const libro=VERS['d'+c];
    if(libro){
      const ini=+dan[2], fin=dan[3]?+dan[3]:ini;
      const tope=Math.max(...Object.keys(libro).map(Number));
      if(fin>tope) return {imposible:'Daniel '+c+' llega al versiculo '+tope+', y la cita pide el '+fin};
      let t=''; for(let v=ini;v<=fin;v++) if(libro[v]) t+=' '+libro[v];
      if(t.trim()) return {ref:'Daniel '+c+':'+ini+(fin>ini?'-'+fin:''),texto:t.trim(),fuerte:true};
    }
    return null;
  }
  const otro=/([1-3]?\s*[A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s+(\d{1,3}):(\d{1,3})(?:\s*[-–,]\s*(\d{1,3}))?/.exec(txt);
  if(otro){
    const ini=+otro[3], fin=otro[4]?+otro[4]:ini;
    const s=SLUG[norm(otro[1])];
    const libro=s&&OTRAS_VERS[s+'-'+otro[2]];
    if(libro){
      let t=''; for(let v=ini;v<=fin;v++) if(libro[v]) t+=' '+libro[v];
      if(t.trim()) return {ref:NOMBRES_OTROS[s]+' '+otro[2]+':'+ini,texto:t.trim(),fuerte:false};
    }
    /* Si el libro no esta en la app, se busca en la RV1909 completa. */
    const t2=enLaBibliaEntera(otro[1],+otro[2],ini,fin);
    if(t2) return {ref:otro[1].trim()+' '+otro[2]+':'+ini+' (RV1909 completa)',texto:t2,fuerte:false};
  }
  return null;
}

const dura=[], blanda=[], ciega=[], porEnunciado=new Map();
let porCapitulo=0, enPyR=0, citaFloja=0;

/* Todo el capitulo, cuando el enunciado no cita verso. */
function capituloEntero(cap){
  const m=/^d(\d+)$/.exec(cap||''); if(!m)return null;
  const libro=VERS['d'+m[1]]; if(!libro)return null;
  return {ref:'Daniel '+m[1]+' (el capitulo entero)',
          texto:Object.keys(libro).map(Number).sort((a,b)=>a-b).map(v=>libro[v]).join(' '),
          fuerte:true, capitulo:true};
}
let enElVerso=0, contrastadas=0, sinCita=0;

for(const [banco,lista] of BANCOS){
  for(const q of lista||[]){
    const nom='['+banco+'] '+(q.q||q.ins||'').slice(0,64);

    /* ── estructura: vale para todos los bancos y no admite interpretacion ── */
    if(q.t==='mc'){
      if(!Array.isArray(q.o)||q.o.length<2) dura.push(['sin opciones',nom,'']);
      else{
        if(!(q.a>=0&&q.a<q.o.length)) dura.push(['la respuesta apunta fuera de las opciones',nom,'a='+q.a]);
        const vistas=new Set();
        for(const o of q.o){
          if(!String(o||'').trim()) dura.push(['una opcion vacia',nom,'']);
          const k=norm(o);
          if(vistas.has(k)) dura.push(['dos opciones iguales',nom,String(o)]);
          vistas.add(k);
        }
      }
    } else if(q.t==='tf'){
      if(typeof q.a!=='boolean') dura.push(['verdadero o falso sin respuesta booleana',nom,String(q.a)]);
      if(!String(q.q||'').trim()) dura.push(['verdadero o falso sin enunciado',nom,'']);
    } else if(q.t==='fill'){
      if(!Array.isArray(q.p)||!q.p.some(x=>x.b)) dura.push(['completar sin ningun hueco',nom,'']);
      for(const x of (q.p||[])) if(x.b!==undefined&&!String(x.b).trim())
        dura.push(['completar con un hueco vacio',nom,'']);
    } else if(q.t) dura.push(['tipo de pregunta desconocido',nom,String(q.t)]);

    /* ── toda referencia biblica que se ofrezca como opcion tiene que existir ──
       Las creencias y la matutina preguntan por la REFERENCIA («¿cual es el
       primer texto clave?», «¿cual es la referencia del versiculo del dia?»),
       y esas opciones no son texto: son coordenadas. Que apunten a un
       versiculo que existe se comprueba exacto contra la Biblia completa, sin
       interpretar nada. Es lo unico duro que se puede decir de esos bancos. */
    if(BIBLIA&&q.t==='mc'&&Array.isArray(q.o)){
      for(const op of q.o){
        const m=/^\s*((?:[1-3]\s*)?[A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s+(\d{1,3}):([\d,\s-]+)/.exec(String(op));
        if(!m)continue;
        const n=NUM[norm(m[1])]; if(!n)continue;
        const cap=BIBLIA[n+'-'+m[2]];
        if(!cap){ dura.push(['esa referencia apunta a un capitulo que no existe',nom,String(op)]); continue; }
        const tope=Math.max(...Object.keys(cap).map(Number));
        for(const v of String(m[3]).split(/[,\s]+/)){
          for(const w of v.split('-')){
            const x=parseInt(w,10);
            if(x&&x>tope) dura.push(['esa referencia apunta a un versiculo que no existe',nom,
              String(op)+'  ·  '+m[1]+' '+m[2]+' llega al '+tope]);
          }
        }
      }
    }

    /* ── cuentas sobre el propio libro: eso si se puede comprobar exacto ── */
    if(q.t==='mc'&&Array.isArray(q.o)&&q.o[q.a]!==undefined){
      const N=norm(q.q), r=String(q.o[q.a]).replace(/[^0-9]/g,'');
      const mv=/cuantos versiculos tiene el capitulo (\d+)/.exec(N);
      if(mv&&VERS['d'+mv[1]]){
        const real=Math.max(...Object.keys(VERS['d'+mv[1]]).map(Number));
        if(+r!==real) dura.push(['la cuenta de versiculos no cuadra',nom,'dice '+r+' y Daniel '+mv[1]+' tiene '+real]);
      }
      if(/cuantos capitulos tiene el libro de daniel/.test(N)){
        const real=Object.keys(VERS).length;
        if(+r!==real) dura.push(['la cuenta de capitulos no cuadra',nom,'dice '+r+' y el libro tiene '+real]);
      }
    }

    /* ── el mismo enunciado con distinta respuesta, mirando todos los bancos ── */
    const clave=norm(q.q||q.ins);
    const resp=q.t==='mc'?norm(q.o&&q.o[q.a]):q.t==='tf'?String(q.a):
      (q.p||[]).filter(x=>x.b).map(x=>norm(x.b)).join('|');
    if(clave){
      const ant=porEnunciado.get(clave);
      if(ant&&ant.resp!==resp)
        dura.push(['el mismo enunciado con DOS respuestas',nom,ant.banco+': '+ant.resp+'   vs   '+banco+': '+resp]);
      else if(!ant) porEnunciado.set(clave,{resp,banco});
    }

    /* ── contra el texto, donde lo hay ── */
    let c=textoCitado(q.q||q.ins,q.cap);
    if(c&&c.imposible){ dura.push(['cita un versiculo que no existe',nom,c.imposible]); continue; }
    /* Sin cita en el enunciado todavia se puede contrastar contra el CAPITULO
       entero, que el campo cap si dice. Es una red mas ancha: que una palabra
       este en el capitulo prueba menos que estarlo en el verso. Por eso lo que
       salga de aqui nunca es duro, salvo que la respuesta no aparezca en
       ninguna parte del capitulo, que si es una senal fuerte. */
    if(!c){ c=capituloEntero(q.cap); if(c) porCapitulo++; }
    if(!c&&PYR&&/^pr\d+$/.test(q.cap||'')){ c={ref:'Profetas y Reyes (el libro entero)',texto:PYR,fuerte:true,capitulo:true,yaNorm:true}; enPyR++; }
    if(!c){ sinCita++; continue; }
    else if(c.ref&&!c.capitulo) contrastadas++;
    const V=c.yaNorm?c.texto:norm(c.texto), donde=c.ref, duro=l=>c.fuerte?dura.push(l):blanda.push(l);

    if(q.t==='fill'){
      const frase=norm(q.p.map(x=>x.b||x.x).join('')).replace(/^\s*\.*\s*/,'');
      if(!V.includes(frase)){
        const faltan=q.p.filter(x=>x.b).map(x=>x.b).filter(b=>!V.includes(norm(b)));
        if(faltan.length&&!c.fuerte) ciega.push(['no coincide con la RV1909, que es lo unico que hay de ese libro',nom,donde+'  ·  '+faltan.join(' · ')]);
        else if(faltan.length) duro(['completar: la respuesta no esta en '+donde,nom,faltan.join(' · ')]);
        else if(!c.capitulo) blanda.push(['completar: el verso las trae, pero la frase no calza entera',nom,donde]);
      }
      /* Aunque la version no coincida, la CITA se puede auditar: si casi
         ninguna palabra con peso de la frase aparece en la RV1909, lo mas
         probable es que la referencia este equivocada, no la traduccion. */
      if(!c.fuerte){
        const palabras=norm(q.p.map(x=>x.b||x.x).join(' ')).split(' ').filter(w=>w.length>4);
        const dentro=palabras.filter(w=>V.includes(w)).length;
        const pct=palabras.length?dentro/palabras.length:1;
        /* Se cuenta pero NO se reporta como hallazgo. Se probo al reves y las
           13 que salian eran todas traducciones distintas de la cita correcta
           («no hace acepcion de personas» y «no muestra favoritismo» son el
           mismo Hechos 10:34). Un cruce de version no distingue una referencia
           equivocada de una traduccion distinta, asi que como alarma miente. */
        if(pct<0.25) citaFloja++;
      }
    } else if(q.t==='mc'&&Array.isArray(q.o)&&q.o[q.a]!==undefined){
      const buena=norm(q.o[q.a]);
      const esCantidad=/^.?\s*cuant[oa]s?\b/.test(norm(q.q));
      const esNombre=/como se llamaba|que nombre|cual era el nombre/.test(norm(q.q));
      if(esCantidad||esNombre){
        const nucleo=buena.split(' ').filter(w=>w.length>2)[0]||buena;
        const falsas=q.o.filter((o,i)=>i!==q.a)
          .map(o=>(norm(o).split(' ').filter(w=>w.length>2)[0]||norm(o)))
          .filter(w=>V.includes(w));
        /* Un nombre propio SI tiene que estar escrito: «como se llamaba» no se
           calcula, se lee. Una cantidad puede ser un calculo. */
        if(!V.includes(nucleo)&&esNombre) duro(['el nombre de la correcta no esta en '+donde,nom,'«'+q.o[q.a]+'»']);
        else if(!V.includes(nucleo)) blanda.push(['la correcta no esta escrita en '+donde+'; puede ser un calculo',nom,'«'+q.o[q.a]+'»']);
        else if(falsas.length) enElVerso++;
      }
    }
  }
}

/* ── las tarjetas tambien se estudian ── */
const caras=new Map();
for(const t of TARJETAS||[]){
  const nom='[Tarjetas] '+String(t.f||'').replace(/<[^>]+>/g,'').slice(0,64);
  if(!String(t.f||'').trim()||!String(t.r||'').trim()) dura.push(['una tarjeta sin cara o sin respuesta',nom,'']);
  const k=norm(String(t.f).replace(/<[^>]+>/g,''));
  const ant=caras.get(k);
  if(ant&&ant!==norm(t.r)) dura.push(['la misma tarjeta con DOS respuestas',nom,ant+'   vs   '+norm(t.r)]);
  else if(!ant) caras.set(k,norm(t.r));
}

const total=BANCOS.reduce((a,[,l])=>a+(l?l.length:0),0);
const pinta=(t,l)=>{
  console.log('\n'+t+'  ('+l.length+')');
  if(!l.length){console.log('  nada'); return;}
  for(const [x,n,d] of l.slice(0,60)) console.log('  · '+x+'\n      '+n+(d?'\n      '+d:''));
  if(l.length>60) console.log('  ... y '+(l.length-60)+' mas');
};
console.log('REVISADO');
console.log(BIBLIA?('  Referencia: la RV1909 completa, '+Object.keys(BIBLIA).length+' capitulos, ademas de lo que trae la app.')
                 :'  AVISO: no encontre files/_biblia-libre-raw.txt; solo se uso lo que trae la app.');
for(const [b,l] of BANCOS) console.log('  '+String((l||[]).length).padStart(4)+'  '+b);
console.log('  '+String((TARJETAS||[]).length).padStart(4)+'  Tarjetas');
console.log('  ————');
console.log('  '+String(total).padStart(4)+'  preguntas, mas '+(TARJETAS||[]).length+' tarjetas');
pinta('DURO — hay que corregirlo',dura);
pinta('PARA REVISAR — puede ser legitimo',blanda);
console.log('\nNO SE PUEDE VERIFICAR  ('+ciega.length+')');
if(ciega.length){
  console.log('  La matutina cita NTV, PDT, TLA, NBV, LBLA, NVI, RVC y RV95 segun el dia,');
  console.log('  y de esos libros la app solo guarda RV1909. No estan mal: es que no hay');
  console.log('  contra que compararlas. Descansan en quien las transcribio.');
  console.log('  El folleto impreso (files/Heroes y villanos -mes octubre.pdf) es un');
  console.log('  escaneo de CamScanner sin capa de texto: pdftotext saca cero bytes.');
  console.log('  Verificarlas a maquina pide OCR, y un OCR con errores inventaria');
  console.log('  hallazgos falsos. Hoy es el limite real de este verificador.');
  for(const [x,n2,d] of ciega.slice(0,8)) console.log('   · '+n2+(d?'\n       '+d:''));
  if(ciega.length>8) console.log('   ... y '+(ciega.length-8)+' mas');
}
console.log('\nHASTA DONDE LLEGA ESTE VERIFICADOR, que tambien es un dato:');
console.log('  '+contrastadas+' se contrastaron contra el VERSO que cita el enunciado.');
console.log('  '+porCapitulo+' no citan verso, pero su capitulo de Daniel si esta: se');
console.log('       contrastaron contra el capitulo entero, que es una red mas ancha.');
console.log('  '+enPyR+' de Profetas y Reyes se contrastaron contra el libro entero,');
console.log('       sacado de files/profetas-y-reyes.pdf con pdftotext.');
console.log('  '+sinCita+' quedan sin nada contra que compararlas: las 28 creencias');
console.log('       (que se generan, no se escriben a mano) y la matutina. Ver abajo.');
console.log('  '+citaFloja+' de la matutina comparten menos del 25% de sus palabras con la RV1909,');
console.log('       que es lo esperable entre traducciones distintas, no una alarma.');
console.log('  '+enElVerso+' tienen la correcta Y alguna falsa dentro del mismo verso:');
console.log('       esas son buenas distractoras, sacadas del texto y no inventadas.');
process.exit(dura.length?1:0);
