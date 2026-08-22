const fs = require('fs');
const path = require('path');

// index.html se escribe en la raíz del repo, un nivel arriba de fuente/
const SALIDA = path.join(__dirname, '..', 'index.html');
const { CAPS, CONTENIDO } = require('./contenido.js');
const { BANCO } = require('./preguntas.js');
const { MODULOS, CONT_MODULOS } = require('./modulos.js');
const { TARJETAS } = require('./tarjetas.js');

/* Se serializa con indentación para que ninguna línea pase de 2.000
   caracteres: con una sola línea, ningún visor de diff abre el archivo. */
const DATA = `const CAPS = ${JSON.stringify(CAPS, null, 1)};

const CONTENIDO = ${JSON.stringify(CONTENIDO, null, 1)};

const BANCO = ${JSON.stringify(BANCO, null, 1)};

const MODULOS = ${JSON.stringify(MODULOS, null, 1)};

const CONT_MODULOS = ${JSON.stringify(CONT_MODULOS, null, 1)};

const TARJETAS = ${JSON.stringify(TARJETAS, null, 1)};`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Conexión Bíblica — Daniel</title>
<style>
:root{
  --azul:#1F3864; --cielo:#2E8BC0; --naranja:#E8720C; --verde:#1A7A1A;
  --rojo:#C0392B; --oro:#B8860B; --bg:#F0F4F8; --card:#fff; --txt:#1a1a2e;
  --gris:#6b7280; --r:16px; --sh:0 4px 20px rgba(0,0,0,.10);
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--txt);min-height:100vh;line-height:1.5}

.nav{background:var(--azul);display:flex;position:sticky;top:0;z-index:50;box-shadow:0 2px 8px rgba(0,0,0,.15)}
.nav-b{color:#fff;font-size:1.05rem;font-weight:800;padding:.9rem 1rem;display:flex;align-items:center;gap:8px;white-space:nowrap}
.nav-t{display:flex;flex:1;overflow-x:auto}
.nav-t button{color:rgba(255,255,255,.65);font-size:.82rem;font-weight:600;padding:0 .9rem;cursor:pointer;border:none;background:none;border-bottom:3px solid transparent;min-height:46px;white-space:nowrap;font-family:inherit}
.nav-t button:hover{color:#fff}
.nav-t button.on{color:#fff;border-bottom-color:#D4AC0D}

.pantalla{display:none;padding:1.5rem 1rem;max-width:880px;margin:0 auto}
.pantalla.on{display:block}

.card{background:var(--card);border-radius:var(--r);box-shadow:var(--sh);padding:1.4rem;margin-bottom:1.1rem}
.card h2{font-size:1rem;font-weight:700;color:var(--azul);margin-bottom:.8rem}

.hero{background:linear-gradient(135deg,var(--azul),var(--cielo));border-radius:var(--r);padding:1.8rem 1.4rem;color:#fff;text-align:center;margin-bottom:1.3rem}
.hero h1{font-size:1.9rem;font-weight:900;letter-spacing:-.5px}
.hero p{opacity:.9;margin-top:.4rem;font-size:.92rem}

.cat-sel{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.cat-btn{background:#f8f9ff;border:3px solid #e5e7eb;border-radius:12px;padding:1rem .8rem;cursor:pointer;font-family:inherit;text-align:center;min-height:46px}
.cat-btn:hover{border-color:var(--cielo)}
.cat-btn.on{border-color:var(--naranja);background:#fff8f0}
.cat-btn .cn{font-size:.95rem;font-weight:800;color:var(--azul)}
.cat-btn .cd{font-size:.74rem;color:var(--gris);margin-top:4px;line-height:1.35}

.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:.9rem;margin-bottom:1.2rem}
.stat{background:var(--card);border-radius:var(--r);box-shadow:var(--sh);padding:1rem .6rem;text-align:center}
.stat .v{font-size:1.9rem;font-weight:900;color:var(--naranja);line-height:1}
.stat .l{font-size:.71rem;color:var(--gris);margin-top:5px;font-weight:600}

.rejilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:.9rem}
.anillo{background:var(--card);border-radius:14px;box-shadow:var(--sh);padding:1rem .5rem;text-align:center;cursor:pointer;border:2px solid transparent;font-family:inherit}
.anillo:hover{transform:translateY(-2px)}
.anillo.full{border-color:var(--verde)}
.anillo svg{transform:rotate(-90deg)}
.anillo circle.bg{fill:none;stroke:#e5e7eb;stroke-width:6}
.anillo circle.fg{fill:none;stroke-width:6;stroke-linecap:round;transition:stroke-dashoffset .5s}
.anillo .al{font-size:.76rem;font-weight:700;color:var(--azul);margin-top:.4rem}
.anillo .as{font-size:.67rem;color:var(--gris);margin-top:2px;line-height:1.3}

.caps{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:.9rem}
.cap{background:var(--card);border:2px solid #e5e7eb;border-radius:14px;padding:1rem;cursor:pointer;text-align:left;font-family:inherit;min-height:46px}
.cap:hover{border-color:var(--cielo)}
.cap.on{border-color:var(--naranja);background:#fff8f0}
.cap .n{font-size:1.5rem;font-weight:900;line-height:1}
.cap .t{font-size:.8rem;font-weight:700;color:var(--azul);margin-top:3px;line-height:1.3}
.cap .f{font-size:.7rem;color:var(--gris);margin-top:2px}
.cap .p{font-size:.7rem;color:var(--verde);font-weight:700;margin-top:5px}

.sec{margin-bottom:1.3rem}
.sec h3{font-size:.93rem;color:var(--azul);font-weight:700;margin-bottom:.6rem;border-left:4px solid var(--naranja);padding-left:.6rem}
.info-table{width:100%;border-collapse:collapse;font-size:.84rem;margin:.4rem 0}
.info-table th{background:var(--azul);color:#fff;padding:.5rem .7rem;text-align:left;font-size:.77rem}
.info-table td{padding:.45rem .7rem;border-bottom:1px solid #eef0f4;vertical-align:top}
.info-table tr:nth-child(even) td{background:#f7f9ff}
.info-table td.key{font-weight:700;color:var(--azul);white-space:nowrap}
.highlight-box{background:#e8f5e9;border-left:5px solid var(--verde);border-radius:8px;padding:.75rem .9rem;font-size:.85rem;margin:.5rem 0;line-height:1.65}
.warn-box{background:#fff3e0;border-left:5px solid var(--naranja);border-radius:8px;padding:.75rem .9rem;font-size:.85rem;margin:.5rem 0;line-height:1.65}
.verse-box{background:#e3f2fd;border-left:5px solid var(--cielo);border-radius:8px;padding:.75rem .9rem;font-size:.87rem;font-style:italic;margin:.5rem 0;line-height:1.7}
ul.tight{margin:.4rem 0 .4rem 1.2rem;font-size:.85rem;line-height:1.75}

.timer{font-size:1.35rem;font-weight:900;color:var(--naranja);font-variant-numeric:tabular-nums}
.timer.urg{color:var(--rojo);animation:pp .6s infinite}
@keyframes pp{0%,100%{opacity:1}50%{opacity:.45}}
.divisor{background:var(--azul);color:#fff;padding:.5rem .9rem;border-radius:8px;font-size:.84rem;font-weight:700;margin:1.1rem 0 .7rem}

.q{background:var(--card);border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.07);padding:1.1rem;margin-bottom:.9rem;border:2px solid transparent}
.q.hecha{border-color:#d1fae5}
.q.mal{border-color:#fee2e2}
.q .qt{font-size:.89rem;font-weight:600;margin-bottom:.75rem;line-height:1.5}
.q .qn{color:var(--naranja);font-weight:800;margin-right:4px}

.ops{display:flex;flex-direction:column;gap:.4rem}
.op{display:flex;align-items:center;gap:.65rem;background:#f8f9ff;border:2px solid #e5e7eb;border-radius:8px;padding:.5rem .85rem;cursor:pointer;font-family:inherit;font-size:.85rem;text-align:left;min-height:46px}
.op:hover:not(:disabled){border-color:var(--cielo);background:#eff6ff}
.op.sel{border-color:var(--cielo);background:#eff6ff}
.op.ok{border-color:var(--verde);background:#e8f5e9;color:var(--verde);font-weight:700}
.op.ko{border-color:var(--rojo);background:#fee2e2;color:var(--rojo)}
.op:disabled{cursor:default}
.ol{width:25px;height:25px;border-radius:50%;background:var(--azul);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.74rem;font-weight:700;flex-shrink:0}
.op.ok .ol{background:var(--verde)} .op.ko .ol{background:var(--rojo)} .op.sel .ol{background:var(--cielo)}

.vf{display:flex;gap:.6rem}
.vf button{flex:1;padding:.6rem;border-radius:8px;border:2px solid #e5e7eb;cursor:pointer;font-family:inherit;font-size:.87rem;font-weight:700;background:#f8f9ff;min-height:46px}
.vf button.sel{border-color:var(--cielo);background:#eff6ff}
.vf button.ok{border-color:var(--verde);background:#e8f5e9;color:var(--verde)}
.vf button.ko{border-color:var(--rojo);background:#fee2e2;color:var(--rojo)}
.vf button:disabled{cursor:default}

.rell{display:flex;flex-wrap:wrap;gap:.25rem;align-items:center;font-size:.87rem;line-height:2.1}
.rell input{border:none;border-bottom:2px solid var(--cielo);background:#eff6ff;border-radius:4px 4px 0 0;padding:.2rem .45rem;font-family:inherit;font-size:.87rem;color:var(--azul);min-width:95px;max-width:190px;outline:none;min-height:34px}
.rell input:focus{background:#dbeafe}
.rell input.ok{background:#d1fae5;border-bottom-color:var(--verde);color:var(--verde);font-weight:700}
.rell input.ko{background:#fee2e2;border-bottom-color:var(--rojo);color:var(--rojo)}

.fb{font-size:.79rem;margin-top:.5rem;padding:.35rem .6rem;border-radius:6px;font-weight:600;line-height:1.5}
.fb.ok{background:#d1fae5;color:var(--verde)}
.fb.ko{background:#fee2e2;color:var(--rojo)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:.6rem 1.3rem;border-radius:50px;border:none;cursor:pointer;font-family:inherit;font-size:.87rem;font-weight:700;min-height:46px}
.btn.azul{background:var(--azul);color:#fff}
.btn.nar{background:var(--naranja);color:#fff}
.btn.ver{background:var(--verde);color:#fff}
.btn.gho{background:transparent;color:var(--azul);border:2px solid var(--azul)}

.res{background:linear-gradient(135deg,var(--verde),var(--cielo));color:#fff;border-radius:var(--r);padding:1.8rem 1.2rem;text-align:center;margin-bottom:1.1rem}
.res .pt{font-size:3.2rem;font-weight:900;line-height:1}
.res .sec3{display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem;margin-top:1rem}
.res .sec3 div{background:rgba(255,255,255,.2);border-radius:10px;padding:.7rem .3rem}
.res .sec3 .sv{font-size:1.35rem;font-weight:800}
.res .sec3 .sl{font-size:.69rem;opacity:.88;margin-top:2px}

.ins{display:inline-flex;align-items:center;gap:5px;padding:.4rem .9rem;border-radius:50px;font-size:.79rem;font-weight:700;margin:.25rem}
.ins.oro{background:#fef3c7;color:#92400e;border:2px solid #D4AC0D}
.ins.gris{background:#f1f5f9;color:#64748b;border:2px solid #cbd5e1}

.txti{width:100%;max-width:330px;padding:.55rem .8rem;border:2px solid #e5e7eb;border-radius:8px;font-size:.9rem;font-family:inherit;min-height:46px}
.pil{display:inline-block;padding:2px 10px;border-radius:20px;font-size:.71rem;font-weight:700}

.grupo{font-size:.8rem;font-weight:800;color:var(--gris);text-transform:uppercase;letter-spacing:.5px;margin:1.4rem 0 .7rem}
.grupo:first-child{margin-top:0}
.mod{background:var(--card);border:2px solid #e5e7eb;border-radius:14px;padding:1rem;cursor:pointer;text-align:left;font-family:inherit;min-height:46px;display:flex;gap:.7rem;align-items:flex-start}
.mod:hover{border-color:var(--cielo)}
.mod.on{border-color:var(--naranja);background:#fff8f0}
.mod .ic{font-size:1.5rem;line-height:1}
.mod .t{font-size:.84rem;font-weight:700;color:var(--azul);line-height:1.3}
.mod .s{font-size:.71rem;color:var(--gris);margin-top:2px;line-height:1.3}

.tj-zona{max-width:520px;margin:0 auto}
.tj{background:var(--card);border-radius:18px;box-shadow:0 6px 24px rgba(0,0,0,.13);padding:2rem 1.4rem;min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer;border:3px solid var(--cielo);position:relative}
.tj.volteada{border-color:var(--verde);background:#f4fcf5}
.tj .cara{font-size:1.05rem;font-weight:700;color:var(--azul);line-height:1.6}
.tj .cara b{color:var(--naranja)}
.tj .rev{font-size:1rem;color:var(--verde);font-weight:600;line-height:1.65}
.tj .pista{position:absolute;bottom:.7rem;font-size:.7rem;color:var(--gris);font-weight:600}
.tj-barra{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin:.9rem 0;font-size:.83rem;color:var(--gris);font-weight:600}
.tj-btns{display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;margin-top:.9rem}
.prog-lin{height:7px;background:#e5e7eb;border-radius:5px;overflow:hidden;margin:.5rem 0}
.prog-lin div{height:100%;background:var(--verde);transition:width .3s}
.pil.az{background:#dbeafe;color:var(--cielo)}
.pil.na{background:#ffedd5;color:var(--naranja)}
.nota{font-size:.78rem;color:var(--gris);margin-top:.5rem;line-height:1.5}

@media(max-width:620px){
  .nav-b span{display:none}
  .nav-t button{padding:0 .6rem;font-size:.76rem}
  .stats{grid-template-columns:repeat(2,1fr)}
  .cat-sel{grid-template-columns:1fr}
  .hero h1{font-size:1.55rem}
  .info-table{font-size:.79rem}
  .info-table td.key{white-space:normal}
}
</style>
</head>
<body>

<nav class="nav">
  <div class="nav-b">🕊️ <span>Conexión Bíblica</span></div>
  <div class="nav-t">
    <button class="on" onclick="ir('inicio')">🏠 Inicio</button>
    <button onclick="ir('estudio')">📖 Estudiar</button>
    <button onclick="ir('tarjetas')">🃏 Tarjetas</button>
    <button onclick="ir('examen')">✏️ Examen</button>
    <button onclick="ir('logros')">🏆 Logros</button>
  </div>
</nav>

<div id="p-inicio" class="pantalla on">
  <div class="hero">
    <h1>🕊️ Conexión Bíblica</h1>
    <p>Libro de Daniel · Profetas y Reyes · Reina Valera 1995</p>
  </div>

  <div class="card">
    <h2>👤 ¿Quién estudia?</h2>
    <input id="nombre" class="txti" type="text" placeholder="Escribe tu nombre..." oninput="ponNombre(this.value)">
  </div>

  <div class="card">
    <h2>🎯 Tu categoría</h2>
    <div class="cat-sel">
      <button class="cat-btn" id="cb-av" onclick="ponCat('av')">
        <div class="cn">Aventureros</div>
        <div class="cd">7 a 9 años<br>Daniel 1, 2, 3 y 6<br>P&amp;R 39, 41 y 44</div>
      </button>
      <button class="cat-btn" id="cb-gm" onclick="ponCat('gm')">
        <div class="cn">Guías Mayores</div>
        <div class="cd">Categoría mayor<br>Daniel 1 al 6<br>P&amp;R 39 al 44</div>
      </button>
    </div>
    <p class="nota">La categoría define qué capítulos ves y de dónde salen las preguntas del examen.</p>
  </div>

  <div class="stats" id="stats"></div>

  <div class="card">
    <h2>📊 Progreso por capítulo</h2>
    <div class="rejilla" id="anillos"></div>
  </div>

  <div class="card">
    <h2>🔥 Racha de estudio</h2>
    <div id="racha" style="text-align:center;padding:.4rem 0"></div>
  </div>
</div>

<div id="p-estudio" class="pantalla">
  <h2 style="color:var(--azul);margin-bottom:.9rem">📖 Material de estudio</h2>
  <div class="caps" id="lista-caps"></div>
  <div id="detalle" class="card" style="margin-top:1rem;display:none"></div>
</div>

<div id="p-tarjetas" class="pantalla">
  <h2 style="color:var(--azul);margin-bottom:.3rem">🃏 Tarjetas de memoria</h2>
  <p class="nota" style="margin-bottom:1rem">Lee el frente, responde en voz alta y toca la tarjeta para comprobar.</p>
  <div class="tj-zona">
    <div class="tj-barra">
      <span id="tj-pos"></span>
      <select id="tj-filtro" onchange="filtraTj(this.value)" style="padding:.4rem .6rem;border:2px solid #e5e7eb;border-radius:8px;font-family:inherit;font-size:.82rem;min-height:38px"></select>
    </div>
    <div class="prog-lin"><div id="tj-prog" style="width:0%"></div></div>
    <div class="tj" id="tj-carta" onclick="voltea()"></div>
    <div class="tj-btns">
      <button class="btn gho" onclick="tjAnt()">← Anterior</button>
      <button class="btn ver" onclick="tjSabia(true)">✅ La sabía</button>
      <button class="btn nar" onclick="tjSabia(false)">🔁 Repasar</button>
      <button class="btn gho" onclick="tjSig()">Siguiente →</button>
    </div>
    <div class="tj-btns"><button class="btn azul" onclick="tjBaraja()">🔀 Barajar de nuevo</button></div>
    <p class="nota" id="tj-resumen" style="text-align:center"></p>
  </div>
</div>

<div id="p-examen" class="pantalla">
  <div id="ex-inicio">
    <div class="hero"><h1>✏️ Examen</h1><p id="ex-desc"></p></div>
    <div class="card">
      <h2>📋 Cómo funciona</h2>
      <p style="font-size:.87rem;line-height:1.8;color:var(--gris)">
        <strong>Sección I</strong> — Selección múltiple<br>
        <strong>Sección II</strong> — Verdadero o Falso<br>
        <strong>Sección III</strong> — Completar el versículo<br><br>
        Las preguntas <strong>cambian cada vez</strong>, salen al azar del banco.
        Al terminar ves tu puntaje y la respuesta correcta de cada una.<br><br>
        El <strong>🎓 Simulacro</strong> es como el examen del campamento: sin pistas
        en la sección de completar. Y si ya fallaste preguntas, puedes hacer un
        examen <strong>solo con tus errores</strong> hasta dominarlos.
      </p>
      <div style="margin-top:1rem;display:flex;gap:.7rem;flex-wrap:wrap">
        <button class="btn nar" onclick="iniciar('normal')">🚀 Comenzar</button>
        <button class="btn azul" onclick="iniciar('simulacro')">🎓 Simulacro</button>
        <span id="ex-err"></span>
      </div>
      <p class="nota" id="ex-nota"></p>
    </div>
  </div>

  <div id="ex-curso" style="display:none">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.7rem;margin-bottom:1rem">
      <div>
        <div style="font-size:.98rem;font-weight:800;color:var(--azul)">✏️ Examen en curso</div>
        <div id="ex-meta" style="font-size:.83rem;color:var(--gris)"></div>
      </div>
      <div class="timer" id="reloj">20:00</div>
    </div>
    <div id="preguntas"></div>
    <div style="display:flex;gap:.8rem;flex-wrap:wrap;align-items:center;margin-top:1.4rem">
      <button class="btn ver" onclick="entregar()">✅ Entregar</button>
      <span id="contador" style="font-size:.84rem;color:var(--gris)"></span>
    </div>
  </div>

  <div id="ex-result" style="display:none"></div>
</div>

<div id="p-logros" class="pantalla">
  <h2 style="color:var(--azul);margin-bottom:.9rem">🏆 Tus logros</h2>
  <div class="card"><h2>🎯 Puntos débiles</h2><div id="debiles"></div></div>
  <div class="card"><h2>🎖️ Insignias</h2><div id="insignias"></div></div>
  <div class="card"><h2>📈 Historial de exámenes</h2><div id="historial"></div></div>
  <div class="card">
    <h2>⚙️ Datos guardados</h2>
    <p class="nota">Todo se guarda solo en este navegador. Si cambias de dispositivo, empiezas de cero.</p>
    <button class="btn gho" style="margin-top:.7rem" onclick="borrarTodo()">🗑️ Borrar mi progreso</button>
  </div>
</div>

<script>
${DATA}

/* ───────── estado ───────── */
const CLAVE='conexion-biblica-v3';
const BASE={v:3,nombre:'',cat:'av',prog:{},examenes:[],racha:0,ultimo:null,insignias:[],fq:{},ft:{},acc:{}};

/* Clave estable por pregunta/tarjeta: hash del texto, sobrevive a
   reordenar el banco en fuente/. */
function hashTxt(s){let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
const claveQ=q=>q.cap+'.'+hashTxt((q.q||q.ins||'')+(q.p?q.p.map(p=>p.b||p.x).join('¦'):''));
const claveT=t=>t.cap+'.'+hashTxt(t.f||'');

function normalizar(x){
  const s=JSON.parse(JSON.stringify(BASE));
  CAPS.forEach(c=>s.prog[c.id]=0);
  if(!x||typeof x!=='object')return s;
  if(typeof x.nombre==='string')s.nombre=x.nombre.slice(0,60);
  if(x.cat==='av'||x.cat==='gm')s.cat=x.cat;
  if(x.prog&&typeof x.prog==='object')
    CAPS.forEach(c=>{const v=Number(x.prog[c.id]);s.prog[c.id]=Number.isFinite(v)?Math.min(100,Math.max(0,v)):0;});
  if(Array.isArray(x.examenes))
    s.examenes=x.examenes.filter(e=>e&&Number.isFinite(Number(e.pts)))
      .map(e=>({pts:Number(e.pts),total:Number(e.total)||0,cat:e.cat==='gm'?'gm':'av',fecha:String(e.fecha||''),
        modo:['simulacro','errores'].includes(e.modo)?e.modo:'normal'})).slice(-40);
  const r=Number(x.racha);s.racha=Number.isFinite(r)?Math.max(0,Math.min(999,r)):0;
  if(typeof x.ultimo==='string')s.ultimo=x.ultimo;
  if(Array.isArray(x.insignias))s.insignias=x.insignias.filter(i=>typeof i==='string').slice(0,20);
  if(x.fq&&typeof x.fq==='object')
    for(const k of Object.keys(x.fq).slice(0,600)){
      const m=Number(x.fq[k]&&x.fq[k].m);
      if(Number.isFinite(m)&&m>0)s.fq[k]={m:Math.min(99,Math.round(m))};
    }
  if(x.ft&&typeof x.ft==='object')
    for(const k of Object.keys(x.ft).slice(0,600)){
      const c=Number(x.ft[k]);
      if(Number.isFinite(c))s.ft[k]=Math.min(2,Math.max(0,Math.round(c)));
    }
  if(x.acc&&typeof x.acc==='object')
    CAPS.forEach(c=>{
      const v=x.acc[c.id];
      if(v&&typeof v==='object'){
        const b=Number(v.b),m=Number(v.m);
        s.acc[c.id]={b:Number.isFinite(b)?Math.min(9999,Math.max(0,Math.round(b))):0,
                     m:Number.isFinite(m)?Math.min(9999,Math.max(0,Math.round(m))):0};
      }
    });
  return s;
}
let S;
try{S=normalizar(JSON.parse(localStorage.getItem(CLAVE)||'null'));}catch(e){S=normalizar(null);}
function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(S));}catch(e){}}

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const capsDe=()=>CAPS.filter(c=>c.cats.includes(S.cat));
const bancoDe=()=>{const ids=capsDe().map(c=>c.id);return BANCO.filter(q=>ids.includes(q.cap));};
const modsDe=()=>MODULOS.filter(m=>m.cats.includes(S.cat));
const tarjetasDe=()=>{const ids=capsDe().map(c=>c.id);return TARJETAS.filter(t=>ids.includes(t.cap));};
const buscaItem=id=>CAPS.find(c=>c.id===id)||MODULOS.find(m=>m.id===id);
const NPREG=()=>S.cat==='av'?15:25;

/* ───────── navegación ───────── */
function ir(id){
  document.querySelectorAll('.pantalla').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nav-t button').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  document.querySelectorAll('.nav-t button')[{inicio:0,estudio:1,tarjetas:2,examen:3,logros:4}[id]].classList.add('on');
  if(id==='inicio')pintaInicio();
  if(id==='estudio')pintaCaps();
  if(id==='tarjetas')pintaTarjetas();
  if(id==='examen')pintaExInicio();
  if(id==='logros')pintaLogros();
  window.scrollTo({top:0});
}

function ponNombre(v){S.nombre=String(v).slice(0,60);guardar();}
function ponCat(c){
  S.cat=c;guardar();
  pintaInicio();pintaCaps();
  document.getElementById('detalle').style.display='none';
}

/* ───────── inicio ───────── */
function pintaInicio(){
  document.getElementById('cb-av').classList.toggle('on',S.cat==='av');
  document.getElementById('cb-gm').classList.toggle('on',S.cat==='gm');
  const ni=document.getElementById('nombre');
  if(ni.value!==S.nombre)ni.value=S.nombre;

  const cs=capsDe();
  const listos=cs.filter(c=>S.prog[c.id]>=100).length;
  const mios=S.examenes.filter(e=>e.cat===S.cat);
  const mejor=mios.length?Math.max(...mios.map(e=>Math.round(e.pts/e.total*100))):0;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><div class="v">'+listos+'<small style="font-size:.9rem">/'+cs.length+'</small></div><div class="l">Capítulos<br>estudiados</div></div>'+
    '<div class="stat"><div class="v">'+mejor+'<small style="font-size:.9rem">%</small></div><div class="l">Mejor<br>puntaje</div></div>'+
    '<div class="stat"><div class="v">'+mios.length+'</div><div class="l">Exámenes<br>hechos</div></div>'+
    '<div class="stat"><div class="v">'+S.racha+'🔥</div><div class="l">Días de<br>racha</div></div>'+
    '<div class="stat" style="cursor:pointer" onclick="ir(\\'examen\\')" title="Preguntas que has fallado y aún no dominas">'+
    '<div class="v" style="color:'+(falladasDe().length?'var(--rojo)':'var(--verde)')+'">'+falladasDe().length+'</div>'+
    '<div class="l">Errores por<br>repasar</div></div>';

  document.getElementById('anillos').innerHTML=cs.map(c=>{
    const p=S.prog[c.id]||0,C=Math.PI*2*22,off=C*(1-p/100);
    return '<button class="anillo'+(p>=100?' full':'')+'" onclick="verCap(\\''+c.id+'\\')">'+
      '<svg viewBox="0 0 52 52" width="58" height="58">'+
      '<circle class="bg" cx="26" cy="26" r="22"/>'+
      '<circle class="fg" cx="26" cy="26" r="22" stroke="'+c.color+'" stroke-dasharray="'+C+'" stroke-dashoffset="'+off+'"/>'+
      '<text x="26" y="26" font-size="11" font-weight="800" fill="'+c.color+'" text-anchor="middle" dominant-baseline="central" transform="rotate(90 26 26)">'+p+'%</text>'+
      '</svg><div class="al">'+esc(c.label)+'</div><div class="as">'+esc(c.sub)+'</div></button>';
  }).join('');

  document.getElementById('racha').innerHTML=S.racha>0
    ?'<div style="font-size:2.6rem">🔥</div><div style="font-size:1.3rem;font-weight:800;color:var(--naranja)">'+S.racha+' día'+(S.racha!==1?'s':'')+' seguido'+(S.racha!==1?'s':'')+'</div>'
    :'<div style="font-size:.88rem;color:var(--gris)">Marca un capítulo como estudiado para empezar tu racha 🔥</div>';
}

/* ───────── estudio ───────── */
function pintaCaps(){
  const caps=capsDe().map(c=>
    '<button class="cap c-'+c.id+'" onclick="verCap(\\''+c.id+'\\')">'+
    '<div class="n" style="color:'+c.color+'">'+esc(c.label.replace(/^(Daniel |P&R )/,''))+'</div>'+
    '<div class="t">'+esc(c.sub)+'</div><div class="f">'+esc(c.src)+'</div>'+
    '<div class="p">'+(S.prog[c.id]||0)+'% leído</div></button>').join('');
  const mods=modsDe().map(m=>
    '<button class="mod c-'+m.id+'" onclick="verCap(\\''+m.id+'\\')">'+
    '<div class="ic">'+m.icono+'</div><div><div class="t">'+esc(m.label)+'</div>'+
    '<div class="s">'+esc(m.sub)+'</div>'+
    '<div class="p" style="font-size:.7rem;color:var(--verde);font-weight:700;margin-top:4px">'+(S.prog[m.id]||0)+'%</div>'+
    '</div></button>').join('');
  document.getElementById('lista-caps').innerHTML=
    '<div class="grupo" style="grid-column:1/-1">📘 Capítulos</div>'+caps+
    '<div class="grupo" style="grid-column:1/-1">🔎 Repaso general</div>'+mods;
}

function verCap(id){
  ir('estudio');
  document.querySelectorAll('.cap,.mod').forEach(b=>b.classList.remove('on'));
  document.querySelector('.c-'+id)?.classList.add('on');
  const c=buscaItem(id);
  if(!c)return;
  const secs=CONTENIDO[id]||CONT_MODULOS[id]||[];
  const d=document.getElementById('detalle');
  d.innerHTML=
    '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:1rem">'+
    '<div><div style="font-size:1.15rem;font-weight:800;color:var(--azul)">'+esc(c.label)+'</div>'+
    '<div style="font-size:.83rem;color:var(--gris)">'+esc(c.sub)+(c.src?' · '+esc(c.src):'')+'</div></div>'+
    '<span class="pil az">RV1995</span></div>'+
    secs.map(s=>'<div class="sec"><h3>'+s.t+'</h3>'+s.h+'</div>').join('')+
    '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid #eef0f4;display:flex;gap:.7rem;flex-wrap:wrap">'+
    '<button class="btn ver" onclick="listo(\\''+id+'\\')">✅ Ya lo estudié</button>'+
    '<button class="btn nar" onclick="ir(\\'tarjetas\\')">🃏 Tarjetas</button>'+
    '<button class="btn azul" onclick="ir(\\'examen\\')">✏️ Examen</button></div>';
  d.style.display='block';
  avanza(id,60);
}

function avanza(id,p){S.prog[id]=Math.max(S.prog[id]||0,p);guardar();pintaCaps();}

function listo(id){
  avanza(id,100);sumaRacha();
  const lista=[...capsDe(),...modsDe()];
  const i=lista.findIndex(x=>x.id===id)+1;
  if(i>0&&i<lista.length){verCap(lista[i].id);window.scrollTo({top:0,behavior:'smooth'});}
  else ir('inicio');
}

function sumaRacha(){
  const hoy=new Date().toDateString();
  if(S.ultimo!==hoy){
    const ayer=new Date(Date.now()-864e5).toDateString();
    S.racha=S.ultimo===ayer?S.racha+1:1;S.ultimo=hoy;guardar();
  }
}

/* ───────── tarjetas ───────── */
let mazo=[],tjI=0,tjVolteada=false,tjFiltro='todas',tjSabidas=new Set();

function pintaTarjetas(){
  const sel=document.getElementById('tj-filtro');
  const cs=capsDe();
  const nDif=tarjetasDe().filter(t=>(S.ft[claveT(t)]||0)<2).length;
  sel.innerHTML='<option value="todas">Todos los capítulos</option>'+
    '<option value="dificiles">🔁 Solo por dominar ('+nDif+')</option>'+
    cs.map(c=>'<option value="'+c.id+'">'+esc(c.label)+' — '+esc(c.sub)+'</option>').join('');
  sel.value=tjFiltro;
  if(!mazo.length)tjBaraja();
  else muestraTj();
}

function filtraTj(v){tjFiltro=v;tjBaraja();}

function tjBaraja(){
  let base=tarjetasDe();
  if(tjFiltro==='dificiles')base=base.filter(t=>(S.ft[claveT(t)]||0)<2);
  else if(tjFiltro!=='todas')base=base.filter(t=>t.cap===tjFiltro);
  /* Repetición espaciada (Leitner): caja 0 = fallada o nueva, sale
     primero; caja 1 = en repaso; caja 2 = dominada, sale al final. */
  const caja=t=>S.ft[claveT(t)]||0;
  mazo=[0,1,2].flatMap(n=>mezcla(base.filter(t=>caja(t)===n)));
  tjI=0;tjVolteada=false;tjSabidas=new Set();
  muestraTj();
}

function muestraTj(){
  const c=document.getElementById('tj-carta');
  if(!c)return;
  if(!mazo.length){
    c.className='tj';
    c.innerHTML='<div class="cara">No hay tarjetas para este filtro.</div>';
    document.getElementById('tj-pos').textContent='';
    document.getElementById('tj-prog').style.width='0%';
    document.getElementById('tj-resumen').textContent='';
    return;
  }
  if(tjI>=mazo.length){
    c.className='tj volteada';
    const s=tjSabidas.size,t=mazo.length;
    c.innerHTML='<div class="cara">🎉 Terminaste el mazo</div>'+
      '<div class="rev" style="margin-top:.7rem">Sabías '+s+' de '+t+' ('+Math.round(s/t*100)+'%)</div>';
    document.getElementById('tj-pos').textContent='Completado';
    document.getElementById('tj-prog').style.width='100%';
    document.getElementById('tj-resumen').textContent='Toca «Barajar de nuevo» para repetir.';
    return;
  }
  const t=mazo[tjI];
  const cj=S.ft[claveT(t)]||0;
  const est=cj===2?'<span class="pil az">✅ dominada</span>':cj===1?'<span class="pil na">🔁 en repaso</span>':'<span class="pil na">🆕 por aprender</span>';
  c.className='tj'+(tjVolteada?' volteada':'');
  c.innerHTML=(tjVolteada
    ? '<div class="rev">'+t.r+'</div><div class="pista">toca para volver</div>'
    : '<div class="cara">'+t.f+'</div><div class="pista">toca para ver la respuesta</div>')+
    '<div style="position:absolute;top:.6rem;right:.6rem">'+est+'</div>';
  document.getElementById('tj-pos').textContent='Tarjeta '+(tjI+1)+' de '+mazo.length;
  document.getElementById('tj-prog').style.width=Math.round(tjI/mazo.length*100)+'%';
  document.getElementById('tj-resumen').textContent=tjSabidas.size+' marcadas como sabidas · «La sabía» dos veces seguidas = dominada';
}

function voltea(){if(mazo.length&&tjI<mazo.length){tjVolteada=!tjVolteada;muestraTj();}}
function tjSig(){if(tjI<mazo.length){tjI++;tjVolteada=false;muestraTj();}}
function tjAnt(){if(tjI>0){tjI--;tjVolteada=false;muestraTj();}}
function tjSabia(si){
  if(tjI>=mazo.length)return;
  if(si)tjSabidas.add(tjI);else tjSabidas.delete(tjI);
  const k=claveT(mazo[tjI]);
  S.ft[k]=si?Math.min(2,(S.ft[k]||0)+1):0;
  sumaRacha();
  tjI++;tjVolteada=false;
  if(tjI>=mazo.length&&mazo.length>=10&&tjSabidas.size===mazo.length){
    if(!S.insignias.includes('Memoria de acero')){S.insignias.push('Memoria de acero');}
  }
  guardar();muestraTj();
}

/* ───────── examen ───────── */
let reloj=null,seg=1200,entregado=false,resp={},prueba=[],modo='normal';

const falladasDe=()=>{const p=bancoDe();return p.filter(q=>(S.fq[claveQ(q)]||{}).m>0);};

function pintaExInicio(){
  const n=NPREG(),b=bancoDe().length,f=falladasDe().length;
  document.getElementById('ex-desc').textContent=n+' preguntas · '+(S.cat==='av'?'Aventureros':'Guías Mayores');
  document.getElementById('ex-nota').textContent='Banco disponible para tu categoría: '+b+' preguntas. Cada examen toma '+n+' al azar.';
  document.getElementById('ex-err').innerHTML=f>=3
    ?'<button class="btn gho" onclick="iniciar(\\'errores\\')">🔁 Mis errores ('+f+')</button>':'';
}

function mezcla(a){const r=a.slice();for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}

function armar(m){
  if(m==='errores'){
    const sel=mezcla(falladasDe()).slice(0,NPREG());
    return sel.map((q,i)=>({...q,id:'q'+i}));
  }
  const b=bancoDe(),n=NPREG();
  const mc=mezcla(b.filter(q=>q.t==='mc'));
  const tf=mezcla(b.filter(q=>q.t==='tf'));
  const fl=mezcla(b.filter(q=>q.t==='fill'));
  // proporción: 60% múltiple, 25% V/F, 15% completar
  const nf=Math.max(2,Math.round(n*.15)), nt=Math.max(2,Math.round(n*.25)), nm=n-nf-nt;
  const sel=[...mc.slice(0,nm),...tf.slice(0,nt),...fl.slice(0,nf)];
  return sel.map((q,i)=>({...q,id:'q'+i}));
}

function iniciar(m){
  modo=m||'normal';
  ir('examen');
  prueba=armar(modo);resp={};entregado=false;seg=S.cat==='av'?1200:1800;
  if(!prueba.length){reinicia();return;}
  document.getElementById('ex-inicio').style.display='none';
  document.getElementById('ex-curso').style.display='block';
  document.getElementById('ex-result').style.display='none';
  pintaPreguntas();corre();
}

function corre(){
  clearInterval(reloj);
  reloj=setInterval(()=>{
    seg--;
    const e=document.getElementById('reloj');
    if(e){e.textContent=String(Math.floor(seg/60)).padStart(2,'0')+':'+String(seg%60).padStart(2,'0');
      e.className='timer'+(seg<120?' urg':'');}
    if(seg<=0){clearInterval(reloj);entregar();}
  },1000);
}

const ETQ={mc:'📋 Sección I — Selección Múltiple',tf:'✔ Sección II — Verdadero o Falso',fill:'✏️ Sección III — Completar el Versículo'};

function pintaPreguntas(){
  let h='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    h+='<div class="divisor">'+ETQ[t]+'</div>';
    qs.forEach(q=>{h+=htmlQ(q,n++,false);});
  }
  document.getElementById('preguntas').innerHTML=h;
  const ET={normal:'',simulacro:' · 🎓 Simulacro',errores:' · 🔁 Repaso de errores'};
  document.getElementById('ex-meta').textContent=prueba.length+' preguntas · '+(S.nombre||'Estudiante')+(ET[modo]||'');
  cuenta();
}

function htmlQ(q,n,ver){
  let cuerpo='';
  if(q.t==='mc'){
    cuerpo='<div class="ops">'+q.o.map((o,i)=>{
      const L='ABCD'[i];let c='op';
      if(ver){if(i===q.a)c+=' ok';else if(resp[q.id]===i)c+=' ko';}
      else if(resp[q.id]===i)c+=' sel';
      return '<button class="'+c+'"'+(ver?' disabled':'')+' onclick="marca(\\''+q.id+'\\','+i+')">'+
        '<span class="ol">'+L+'</span>'+esc(o)+'</button>';
    }).join('')+'</div>';
  } else if(q.t==='tf'){
    const r=resp[q.id];let cv='',cf='';
    if(ver){cv=q.a?'ok':(r===true?'ko':'');cf=!q.a?'ok':(r===false?'ko':'');}
    else{cv=r===true?'sel':'';cf=r===false?'sel':'';}
    cuerpo='<div class="vf">'+
      '<button class="'+cv+'"'+(ver?' disabled':'')+' onclick="marca(\\''+q.id+'\\',true)">✅ Verdadero</button>'+
      '<button class="'+cf+'"'+(ver?' disabled':'')+' onclick="marca(\\''+q.id+'\\',false)">❌ Falso</button></div>'+
      (ver?'<div class="fb '+(bien(q)?'ok':'ko')+'">'+esc(q.e)+'</div>':'');
  } else {
    const partes=q.p.map((p,i)=>{
      if(!p.b)return '<span>'+esc(p.x)+'</span>';
      const v=resp[q.id+'_'+i]||'';let c='';
      if(ver)c=igual(v,p.b)?'ok':'ko';
      const pista=modo==='simulacro'?'...':esc(p.h||'...');
      return '<input class="'+c+'" type="text" placeholder="'+pista+'" value="'+esc(v)+'"'+
        (ver?' disabled':'')+' oninput="rellena(\\''+q.id+'\\','+i+',this.value)">';
    }).join('');
    cuerpo='<div style="font-size:.79rem;color:var(--gris);font-style:italic;margin-bottom:.5rem">'+esc(q.ins)+'</div>'+
      '<div class="rell">'+partes+'</div>'+
      (ver?'<div class="fb '+(bien(q)?'ok':'ko')+'">'+(bien(q)?'✅ ¡Correcto!':'❌ Respuesta: '+esc(q.p.filter(p=>p.b).map(p=>p.b).join(' / ')))+'</div>':'');
  }
  const cls=ver?(bien(q)?' hecha':' mal'):(hecha(q)?' hecha':'');
  return '<div class="q'+cls+'" id="c-'+q.id+'"><div class="qt"><span class="qn">'+n+'.</span> '+esc(q.q||'')+'</div>'+cuerpo+'</div>';
}

const limpia=s=>String(s).trim().toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/\\s+/g,' ');
const igual=(a,b)=>limpia(a)===limpia(b);

function bien(q){
  if(q.t==='mc')return resp[q.id]===q.a;
  if(q.t==='tf')return resp[q.id]===q.a;
  return q.p.every((p,i)=>!p.b||igual(resp[q.id+'_'+i]||'',p.b));
}
function hecha(q){
  if(q.t==='fill')return q.p.some((p,i)=>p.b&&(resp[q.id+'_'+i]||'').trim());
  return resp[q.id]!==undefined;
}

function marca(id,v){
  if(entregado)return;
  resp[id]=v;
  const q=prueba.find(x=>x.id===id),n=prueba.indexOf(q)+1;
  const el=document.getElementById('c-'+id);
  if(el)el.outerHTML=htmlQ(q,posicion(q),false);
  cuenta();
}
function rellena(id,i,v){if(entregado)return;resp[id+'_'+i]=v;cuenta();}

function posicion(q){
  let n=1;
  for(const t of ['mc','tf','fill'])
    for(const x of prueba.filter(y=>y.t===t)){if(x.id===q.id)return n;n++;}
  return n;
}

function cuenta(){
  const a=prueba.filter(hecha).length;
  const e=document.getElementById('contador');
  if(e)e.textContent=a+' de '+prueba.length+' respondidas';
}

function entregar(){
  if(entregado)return;
  entregado=true;clearInterval(reloj);
  const pts=prueba.filter(bien).length,tot=prueba.length,pct=Math.round(pts/tot*100);
  S.examenes.push({pts,total:tot,cat:S.cat,fecha:new Date().toISOString(),modo});
  /* Registro por pregunta y por capítulo: alimenta «mis errores»,
     el panel de puntos débiles y la repetición espaciada. */
  for(const q of prueba){
    const k=claveQ(q);
    if(bien(q)){delete S.fq[k];}
    else S.fq[k]={m:Math.min(99,((S.fq[k]||{}).m||0)+1)};
    const a=S.acc[q.cap]||{b:0,m:0};
    if(bien(q))a.b++;else a.m++;
    S.acc[q.cap]=a;
  }
  revisaInsignias(pct);sumaRacha();guardar();

  const s3=['mc','tf','fill'].map(t=>{
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)return '';
    const L={mc:'Múltiple',tf:'V o F',fill:'Completar'}[t];
    return '<div><div class="sv">'+qs.filter(bien).length+'/'+qs.length+'</div><div class="sl">'+L+'</div></div>';
  }).join('');

  const med=pct>=93?'🥇':pct>=75?'🥈':pct>=60?'🥉':'📖';
  const msg=pct>=93?'¡Excelente! Dominas el material.':pct>=75?'¡Muy bien! Repasa lo que falló.':pct>=60?'Buen intento. Vuelve al material.':'Estudia la guía y vuelve a intentarlo.';

  let rev='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    rev+='<div class="divisor" style="font-size:.79rem;margin:.8rem 0 .5rem">'+ETQ[t]+'</div>';
    qs.forEach(q=>{rev+=htmlQ(q,n++,true);});
  }

  document.getElementById('ex-curso').style.display='none';
  const r=document.getElementById('ex-result');
  r.style.display='block';
  r.innerHTML=
    '<div class="res"><div style="font-size:2.6rem">'+med+'</div>'+
    '<div class="pt">'+pts+'<span style="font-size:1.7rem;opacity:.7">/'+tot+'</span></div>'+
    '<div style="opacity:.9;margin-top:.3rem">'+pct+'% · '+msg+'</div>'+
    '<div class="sec3">'+s3+'</div></div>'+
    '<div class="card"><h2>📋 Revisión</h2>'+rev+'</div>'+
    '<div style="display:flex;gap:.7rem;flex-wrap:wrap">'+
    (falladasDe().length>=3?'<button class="btn azul" onclick="iniciar(\\'errores\\')">🔁 Repasar mis errores ('+falladasDe().length+')</button>':'')+
    '<button class="btn nar" onclick="reinicia()">🔄 Otro examen</button>'+
    '<button class="btn azul" onclick="ir(\\'estudio\\')">📖 Estudiar</button>'+
    '<button class="btn gho" onclick="ir(\\'logros\\')">🏆 Logros</button></div>';
  window.scrollTo({top:0,behavior:'smooth'});
}

function reinicia(){
  entregado=false;resp={};prueba=[];
  document.getElementById('ex-inicio').style.display='block';
  document.getElementById('ex-curso').style.display='none';
  document.getElementById('ex-result').style.display='none';
  pintaExInicio();
}

const TODAS=[
  {k:'Perfecto',i:'🌟',d:'100% en un examen'},
  {k:'Casi perfecto',i:'🥇',d:'93% o más'},
  {k:'Estudioso',i:'📚',d:'75% o más'},
  {k:'Persistente',i:'🔄',d:'3 exámenes hechos'},
  {k:'Racha de fuego',i:'🔥',d:'3 días seguidos'},
  {k:'Lector completo',i:'📖',d:'Todos los capítulos y repasos estudiados'},
  {k:'Memoria de acero',i:'🃏',d:'Un mazo de tarjetas completo'},
];
function revisaInsignias(pct){
  const a=k=>{if(!S.insignias.includes(k))S.insignias.push(k);};
  if(pct===100)a('Perfecto');
  if(pct>=93)a('Casi perfecto');
  if(pct>=75)a('Estudioso');
  if(S.examenes.length>=3)a('Persistente');
  if(S.racha>=3)a('Racha de fuego');
  if([...capsDe(),...modsDe()].every(x=>S.prog[x.id]>=100))a('Lector completo');
}

function pintaLogros(){
  /* Puntos débiles: % de acierto por capítulo con lo respondido en
     exámenes. Ordena del más flojo al más fuerte para dirigir el
     estudio a donde duele. */
  const filas=capsDe()
    .map(c=>({c,a:S.acc[c.id]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>0)
    .map(x=>({...x,pct:Math.round(x.a.b/(x.a.b+x.a.m)*100)}))
    .sort((p,q)=>p.pct-q.pct);
  document.getElementById('debiles').innerHTML=filas.length
    ?filas.map(x=>
      '<div style="display:flex;align-items:center;gap:.7rem;margin:.45rem 0">'+
      '<button class="btn gho" style="min-height:34px;padding:.2rem .7rem;font-size:.75rem" onclick="verCap(\\''+x.c.id+'\\')">'+esc(x.c.label)+'</button>'+
      '<div class="prog-lin" style="flex:1;margin:0"><div style="width:'+x.pct+'%;background:'+(x.pct<60?'var(--rojo)':x.pct<85?'var(--naranja)':'var(--verde)')+'"></div></div>'+
      '<span style="font-size:.8rem;font-weight:700;width:44px;text-align:right;color:'+(x.pct<60?'var(--rojo)':'var(--azul)')+'">'+x.pct+'%</span></div>').join('')+
      '<p class="nota">Con base en '+filas.reduce((s,x)=>s+x.a.b+x.a.m,0)+' respuestas de examen. Toca un capítulo para estudiarlo.</p>'
    :'<p class="nota">Haz un examen y aquí verás en qué capítulos estás fallando.</p>';

  document.getElementById('insignias').innerHTML=TODAS.map(b=>{
    const t=S.insignias.includes(b.k);
    return '<span class="ins '+(t?'oro':'gris')+'" title="'+esc(b.d)+'">'+b.i+' '+esc(b.k)+'</span>';
  }).join('')+'<p class="nota">'+S.insignias.length+' de '+TODAS.length+' conseguidas.</p>';

  const h=S.examenes.slice().reverse();
  document.getElementById('historial').innerHTML=h.length
    ?'<table class="info-table"><thead><tr><th>Fecha</th><th>Categoría</th><th>Puntaje</th></tr></thead><tbody>'+
     h.map(e=>{
       const f=new Date(e.fecha);
       const fs=isNaN(f)?'—':f.toLocaleDateString('es-CO',{day:'2-digit',month:'short'})+' '+f.toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});
       const mt={simulacro:' 🎓',errores:' 🔁'}[e.modo]||'';
       return '<tr><td class="key">'+fs+'</td><td>'+(e.cat==='gm'?'Guías Mayores':'Aventureros')+mt+'</td><td><strong>'+e.pts+'/'+e.total+'</strong> ('+Math.round(e.pts/e.total*100)+'%)</td></tr>';
     }).join('')+'</tbody></table>'
    :'<p class="nota">Todavía no has hecho ningún examen.</p>';
}

function borrarTodo(){
  if(!confirm('¿Seguro? Se borra tu progreso, tu racha y tus insignias de este navegador.'))return;
  try{localStorage.removeItem(CLAVE);}catch(e){}
  S=normalizar(null);guardar();ir('inicio');
}

/* ───────── arranque ───────── */
try{pintaInicio();}catch(e){console.error(e);}
</script>
</body>
</html>`;

fs.writeFileSync(SALIDA, html);
console.log('✅ index.html regenerado —', html.length, 'bytes');
