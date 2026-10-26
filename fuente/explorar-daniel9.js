export const estilosDaniel9 = `
      .d9lab{--d9lab-bg:var(--c-noche,#07060a);--d9lab-card:var(--c-noche,#100e12);--d9lab-ink:var(--c-perg,#f4eee2);--d9lab-muted:var(--c-tenue,#c9bda6);--d9lab-gold:var(--c-oro,#f2c46b);--d9lab-line:var(--c-linea,rgba(244,238,226,.16));color:var(--d9lab-ink);background:var(--d9lab-bg);font:400 16px/1.55 var(--cine-sans,system-ui,sans-serif);border-radius:20px;padding:clamp(16px,3vw,32px);max-width:1180px;margin:auto;isolation:isolate}
      .d9lab *{box-sizing:border-box}.d9lab [hidden]{display:none!important}.d9lab h2,.d9lab h3,.d9lab p{margin:0 0 .8rem}.d9lab h2{font:600 clamp(1.65rem,3vw,2.4rem)/1.16 var(--cine-serif,Georgia,serif);max-width:23ch}.d9lab h3{font-size:1.15rem;line-height:1.3}.d9lab p{max-width:74ch}.d9lab small{font-size:.85rem}.d9lab .d9lab-kicker{color:var(--d9lab-gold);font-size:.76rem;text-transform:uppercase;letter-spacing:.13em;font-weight:700}.d9lab .d9lab-intro{color:var(--d9lab-muted);max-width:68ch}
      .d9lab .d9lab-grid{display:grid;gap:18px;margin-top:24px}.d9lab .d9lab-panel{background:var(--d9lab-card);border:1px solid var(--d9lab-line);border-radius:16px;padding:clamp(16px,2.5vw,25px);min-width:0}.d9lab .d9lab-panel>header{margin-bottom:18px}.d9lab .d9lab-panel>header p{color:var(--d9lab-muted)}
      .d9lab button{appearance:none;font:inherit;color:inherit;background:transparent;border:1px solid var(--d9lab-line);border-radius:11px;padding:10px 12px;min-height:48px;cursor:pointer;line-height:1.35;text-align:left;transition:background .16s,border-color .16s}.d9lab button[aria-pressed="true"]{border-color:var(--d9lab-gold);background:#e7bf7420;box-shadow:inset 0 -3px var(--d9lab-gold)}.d9lab button:hover{background:#ffffff0c}.d9lab button:focus-visible,.d9lab summary:focus-visible{outline:3px solid var(--d9lab-gold);outline-offset:4px}.d9lab .d9lab-options{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}.d9lab .d9lab-options button{flex:1 1 100px}.d9lab .d9lab-options strong,.d9lab .d9lab-options small{display:block}.d9lab .d9lab-options small{color:var(--d9lab-muted);margin-top:3px}
      .d9lab .d9lab-equation{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px;color:var(--d9lab-gold);font-size:clamp(1.25rem,3vw,1.8rem);font-variant-numeric:tabular-nums;margin:12px 0}.d9lab .d9lab-equation small{font-size:.95rem;color:var(--d9lab-ink)}.d9lab .d9lab-note{font-size:.88rem;color:var(--d9lab-muted)}.d9lab .d9lab-visual{background:#0812108c;border:1px solid var(--d9lab-line);border-radius:12px;overflow:hidden;margin:16px 0;padding:8px 0}.d9lab svg{display:block;width:100%;height:auto}.d9lab svg text{fill:var(--d9lab-ink);font-family:var(--cine-sans,system-ui,sans-serif);font-size:23px}.d9lab .d9lab-bar{fill:#617e70;stroke:#101817;stroke-width:2;transition:opacity .16s,fill .16s}.d9lab .d9lab-bar[data-active="true"]{fill:var(--d9lab-gold)}.d9lab .d9lab-bar[data-active="false"]{opacity:.34}.d9lab .d9lab-svg-label{font-size:20px;fill:var(--d9lab-muted)}.d9lab .d9lab-svg-line{stroke:var(--d9lab-gold);stroke-width:3}.d9lab .d9lab-dot{fill:var(--d9lab-bg);stroke:var(--d9lab-gold);stroke-width:3}.d9lab .d9lab-dot[data-active="true"]{fill:var(--d9lab-gold);stroke:var(--d9lab-ink);stroke-width:4}
      .d9lab .d9lab-reading{border-left:3px solid var(--d9lab-gold);padding:2px 0 2px 15px;margin:18px 0}.d9lab .d9lab-reading h3{color:var(--d9lab-gold)}.d9lab .d9lab-reading p:last-child{margin-bottom:0}.d9lab details{border-top:1px solid var(--d9lab-line);margin-top:12px;padding-top:10px}.d9lab summary{cursor:pointer;min-height:44px;display:list-item;padding:9px 4px;font-weight:600;color:var(--d9lab-gold)}.d9lab details p,.d9lab blockquote{font-size:.94rem}.d9lab blockquote{margin:10px 0;padding:10px 14px;border-left:2px solid var(--d9lab-line);color:var(--d9lab-ink)}.d9lab .d9lab-source{color:var(--d9lab-muted);font-size:.84rem}
      .d9lab .d9lab-date-row{display:flex;justify-content:space-between;gap:10px;margin:4px 16px;font-size:.84rem;color:var(--d9lab-muted)}.d9lab .d9lab-period-caption{padding:6px 16px;color:var(--d9lab-gold);font-size:.9rem;min-height:2.2em}.d9lab .d9lab-nozero{display:flex;justify-content:center;align-items:center;gap:12px;padding:12px;border:1px dashed var(--d9lab-line);border-radius:10px;margin:12px 0;color:var(--d9lab-ink)}.d9lab .d9lab-crossed{color:var(--d9lab-muted);text-decoration:line-through}
      .d9lab .d9lab-evidence-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}.d9lab .d9lab-evidence-pair>div{border:1px solid var(--d9lab-line);border-radius:10px;padding:12px}.d9lab .d9lab-evidence-pair strong{color:var(--d9lab-gold)}.d9lab .d9lab-chain{display:flex;gap:8px;margin:16px 0}.d9lab .d9lab-chain button{flex:1;min-width:0;font-size:.9rem}.d9lab .d9lab-chain-num{display:inline-flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:50%;background:#42534b;margin-bottom:8px}.d9lab .d9lab-chain button[aria-pressed="true"] .d9lab-chain-num{background:var(--d9lab-gold);color:#101817}.d9lab .d9lab-chain-name{display:block}
      .d9lab .d9lab-activities{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:22px}.d9lab .d9lab-activities button{font-size:.92rem;text-align:center}.d9lab .d9lab-work{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:24px}.d9lab .d9lab-stage,.d9lab .d9lab-lesson{min-width:0}.d9lab .d9lab-lesson>.d9lab-reading:first-child{margin-top:0}.d9lab[data-d9lab-layout="b"] .d9lab-work{grid-template-columns:1fr}
      @media(max-width:900px){.d9lab .d9lab-work{grid-template-columns:1fr;gap:12px}.d9lab .d9lab-activities{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:480px){.d9lab{padding:14px;border-radius:14px}.d9lab .d9lab-panel{padding:15px}.d9lab .d9lab-options{gap:6px}.d9lab .d9lab-options button{padding:10px 8px;flex-basis:80px}.d9lab .d9lab-evidence-pair{grid-template-columns:1fr}.d9lab .d9lab-chain{gap:5px}.d9lab .d9lab-chain button{padding:10px 7px;font-size:.8rem}.d9lab .d9lab-nozero{gap:9px;font-size:.9rem}.d9lab .d9lab-date-row{font-size:.76rem}}
      @media(prefers-reduced-motion:reduce){.d9lab *{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;

/** Monta las actividades de Daniel 9 y devuelve su limpieza. */
export function montarDaniel9(root, opciones = {}) {
  if (!root || typeof root.append !== 'function') throw new TypeError('Falta el contenedor de Daniel 9.');
  const doc = root.ownerDocument || document;
  const caja = doc.createElement('section');
  caja.className = 'd9lab';
  caja.setAttribute('aria-label', 'Daniel 9: sigue el argumento');
  const vida = new AbortController();
  const bloques = [
    { semanas: 7, anos: 49, desde: '457 a.C.', hasta: '408 a.C.', titulo: 'La restauración de Jerusalén',
      texto: 'Las primeras siete semanas reúnen 49 años. El pasaje sitúa la reconstrucción de la plaza y el muro en tiempos angustiosos. El diagrama de El conflicto de los siglos ubica el final de este tramo en 408 a.C.',
      biblia: 'Daniel 9:25: «se volverán a edificar la plaza y el muro en tiempos angustiosos».', fuente: 'El conflicto de los siglos, cap. 18, diagrama de p. 374; PDF de la biblioteca, pp. 272–273.' },
    { semanas: 62, anos: 434, desde: '408 a.C.', hasta: '27 d.C.', titulo: 'Hasta el Mesías Príncipe',
      texto: 'A las siete semanas se añaden sesenta y dos: 7 + 62 = 69 semanas, o 483 años desde la orden. El término señala al Mesías Príncipe. Su unción con el Espíritu Santo se sitúa en el bautismo de Jesús, en el otoño del 27 d.C.',
      biblia: 'Daniel 9:25: «hasta el Mesías Príncipe, habrá siete semanas y sesenta y dos semanas».', fuente: 'El Deseado de todas las gentes, cap. 23, pp. 200–201; El conflicto de los siglos, cap. 18, pp. 373–374.' },
    { semanas: 1, anos: 7, desde: '27 d.C.', hasta: '34 d.C.', titulo: 'La última semana pertenece a las setenta',
      texto: 'Después de 69 semanas queda una, de siete años. Durante ella se confirma el pacto con muchos. La muerte del Mesías ocurre a la mitad, no al terminar los 490 años. Amplía este tramo en «La última semana».',
      biblia: 'Daniel 9:27: «Por otra semana más confirmará el pacto con muchos; a la mitad de la semana hará cesar el sacrificio y la ofrenda».', fuente: 'El Deseado de todas las gentes, cap. 23, pp. 200–201; Bohr, Studies in Daniel 1–10, pp. 346–347.' }
  ];
  const semana = [
    { fecha: 'Otoño del 27 d.C.', titulo: 'Jesús es ungido en su bautismo', x: 24,
      texto: 'Mesías significa ungido. El bautismo marca el comienzo de su ministerio y el inicio de la semana final. Los primeros tres años y medio corresponden al testimonio de Cristo.',
      biblia: 'Daniel 9:25 señala al Mesías Príncipe. Mateo 3:16–17 relata el bautismo; Hechos 10:38 explica su unción con el Espíritu Santo.',
      cita: '«En el año 27 de nuestra era, Jesús, en ocasión de su bautismo, recibió la unción del Espíritu Santo».', fuente: 'El Deseado de todas las gentes, cap. 23, p. 200; PDF de la biblioteca, p. 199.' },
    { fecha: 'Primavera del 31 d.C.', titulo: 'La cruz: la mitad de la semana', x: 340,
      texto: 'Del otoño del 27 a la primavera del 31 transcurren tres años y medio. La muerte de Jesús cumple lo que señalaban los sacrificios. Eso explica que cesen su significado y su función; el texto no exige afirmar que todos los ritos del templo se detuvieron ese día.',
      biblia: 'Daniel 9:26–27 une la muerte del Mesías con el cese del sacrificio. Mateo 27:50–51 relata su muerte y el velo rasgado.',
      cita: '«En la primavera del año 31 de nuestra era, Cristo, el verdadero sacrificio, fué ofrecido en el Calvario».', fuente: 'El Deseado de todas las gentes, cap. 23, p. 200; PDF de la biblioteca, p. 199.' },
    { fecha: 'Otoño del 34 d.C.', titulo: 'Se completan los siete años', x: 656,
      texto: 'Después de la cruz, los apóstoles continúan el testimonio especialmente dirigido a los judíos. La cronología del estudio relaciona su término con el martirio de Esteban y la expansión del evangelio. Termina ese período; el nuevo pacto no expira y las personas judías siguen incluidas en la salvación.',
      biblia: 'Daniel 9:24 delimita el período para el pueblo y la ciudad. Hechos 7 y 8:1–4 narran el martirio y la dispersión; Hechos no expresa el año 34.',
      cita: '«La semana—siete años—terminó en el año 34 de nuestra era».', fuente: 'El Deseado de todas las gentes, cap. 23, pp. 200–201; PDF de la biblioteca, p. 199.' }
  ];
  const pasos = [
    { nombre: 'La pregunta queda abierta', ref: 'Daniel 8:14, 26–27',
      cita: '«estaba espantado a causa de la visión, y no la entendía».',
      texto: 'La visión anuncia 2.300 tardes y mañanas y la purificación del santuario. Al final del capítulo, Daniel sigue sin comprender. El tiempo no tiene todavía un comienzo fechado.',
      apoyo: 'El conflicto de los siglos, cap. 18, pp. 372–373; Bohr, Studies in Daniel 1–10, pp. 325–326.' },
    { nombre: 'Gabriel vuelve para explicar', ref: 'Daniel 9:21–23',
      cita: '«el varón Gabriel, a quien había visto en la visión, al principio».',
      texto: 'El propio relato identifica al mismo mensajero. Gabriel viene para dar entendimiento y pide considerar la visión. Esa continuidad conecta la explicación con el capítulo anterior; la relación no depende solamente de una palabra.',
      apoyo: 'El conflicto de los siglos, cap. 18, pp. 372–373; Bohr, Studies in Daniel 1–10, pp. 325–327.' },
    { nombre: 'Se delimita la primera parte', ref: 'Daniel 9:24–25',
      cita: '«Setenta semanas están determinadas sobre tu pueblo y sobre tu santa ciudad».',
      texto: 'La explicación delimita 490 años y da el punto de partida: la orden de restaurar y edificar Jerusalén. El conflicto de los siglos aplica estas semanas como la primera parte de los 2.300 años, con un comienzo compartido.',
      apoyo: 'El conflicto de los siglos, cap. 18, p. 373; Bohr, Studies in Daniel 1–10, p. 325. La identificación del decreto con 457 a.C. se explica en CS 373–374 y Esdras 7.' }
  ];
  const pregunta = (titulo, respuesta) => `<details class="d9lab-pregunta"><summary>${titulo}</summary><p>${respuesta}</p></details>`;
  caja.innerHTML = `
    ${opciones.estilos === false ? '' : '<style>' + estilosDaniel9 + '</style>'}
    <header><p class="d9lab-kicker">Daniel 9 · sigue el argumento</p><h2>Una profecía que puedes recorrer y comprobar</h2><p class="d9lab-intro">Selecciona un tramo, amplía la última semana y contrasta los textos. Cada cambio muestra qué se cuenta, qué significa y dónde se sostiene.</p></header>
    <div class="d9lab-grid">
      <section class="d9lab-panel" data-d9lab-panel="semanas" aria-label="Las tres divisiones de las setenta semanas">
        <header><p class="d9lab-kicker">La duración</p><h3>Setenta semanas, tres tramos</h3><p>Una semana agrupa siete unidades. Aquí se cuentan años: 7 + 62 + 1 = 70 semanas.</p></header>
        <p class="d9lab-equation"><strong>70 × 7 = 490</strong><small>años en total</small></p>
        <div class="d9lab-options" role="group" aria-label="Elegir un tramo de las setenta semanas">
          <button type="button" data-d9lab-action="bloque" data-d9lab-value="0" aria-pressed="true"><strong>7 semanas</strong><small>49 años</small></button>
          <button type="button" data-d9lab-action="bloque" data-d9lab-value="1" aria-pressed="false"><strong>62 semanas</strong><small>434 años</small></button>
          <button type="button" data-d9lab-action="bloque" data-d9lab-value="2" aria-pressed="false"><strong>1 semana</strong><small>7 años</small></button>
        </div>
        <div class="d9lab-visual"><svg viewBox="0 0 680 120" role="img" aria-label="490 años divididos en 49, 434 y 7 años" data-d9lab-chart="bloques">
          <text x="24" y="30">490 años</text><text x="656" y="30" text-anchor="end" class="d9lab-svg-label">proporción real</text>
          <rect class="d9lab-bar" data-d9lab-block="0" x="24" y="50" width="63.2" height="40" rx="4"/>
          <rect class="d9lab-bar" data-d9lab-block="1" x="87.2" y="50" width="559.8" height="40" rx="4"/>
          <rect class="d9lab-bar" data-d9lab-block="2" x="647" y="50" width="9" height="40" rx="2"/>
        </svg><div class="d9lab-date-row"><span>457 a.C.</span><span>34 d.C.</span></div></div>
        <p class="d9lab-note">La semana final es pequeña en esta escala. En «La última semana» puedes ampliarla sin cambiar su duración.</p>
        <div class="d9lab-reading" aria-live="polite" aria-atomic="true"><h3 data-d9lab-field="bloque-titulo"></h3><p class="d9lab-equation" data-d9lab-field="bloque-cuenta"></p><p data-d9lab-field="bloque-fechas"></p><p data-d9lab-field="bloque-texto"></p></div>
        <details><summary>Consultar la evidencia de este tramo</summary><blockquote data-d9lab-field="bloque-biblia"></blockquote><p class="d9lab-source" data-d9lab-field="bloque-fuente"></p><p>Levítico 25:8 ofrece el precedente de semanas de años. DTG, cap. 23, explica 490 días proféticos como 490 años. Son dos formas de explicar la duración: los años ya obtenidos no se vuelven a convertir.</p></details>
        ${pregunta('Comprueba: ¿por qué no multiplicamos otra vez los 490 años?', 'Porque el resultado ya está expresado en años. Las semanas de años dan 70 × 7 = 490 años. La explicación mediante días proféticos llega a la misma duración; no es una segunda operación sobre esos años. Referencia: Levítico 25:8; DTG, cap. 23.')}
      </section>
      <section class="d9lab-panel" data-d9lab-panel="ultima" aria-label="La última semana ampliada">
        <header><p class="d9lab-kicker">El centro de la profecía</p><h3>Una semana: antes y después de la cruz</h3><p>La ampliación conserva los siete años. Selecciona un acontecimiento para relacionar fecha, texto y significado.</p></header>
        <div class="d9lab-options" role="group" aria-label="Elegir un acontecimiento de la última semana">
          <button type="button" data-d9lab-action="semana" data-d9lab-value="0" aria-pressed="false"><strong>27 · Bautismo</strong><small>Otoño</small></button>
          <button type="button" data-d9lab-action="semana" data-d9lab-value="1" aria-pressed="true"><strong>31 · Cruz</strong><small>Primavera</small></button>
          <button type="button" data-d9lab-action="semana" data-d9lab-value="2" aria-pressed="false"><strong>34 · Testimonio</strong><small>Otoño</small></button>
        </div>
        <div class="d9lab-visual"><svg viewBox="0 0 680 172" role="img" aria-label="Siete años: tres y medio antes de la cruz y tres y medio después" data-d9lab-chart="semana">
          <text x="182" y="30" text-anchor="middle">Cristo · 3½ años</text><text x="498" y="30" text-anchor="middle">Apóstoles · 3½ años</text>
          <rect class="d9lab-bar" data-d9lab-half="0" x="24" y="54" width="316" height="40" rx="4"/>
          <rect class="d9lab-bar" data-d9lab-half="1" x="340" y="54" width="316" height="40" rx="4"/>
          <line class="d9lab-svg-line" data-d9lab-marker x1="340" y1="43" x2="340" y2="110"/>
          <circle class="d9lab-dot" data-d9lab-point="0" cx="24" cy="74" r="9"/><circle class="d9lab-dot" data-d9lab-point="1" cx="340" cy="74" r="9"/><circle class="d9lab-dot" data-d9lab-point="2" cx="656" cy="74" r="9"/>
          <text x="24" y="140">27 · otoño</text><text x="340" y="140" text-anchor="middle">31 · primavera</text><text x="656" y="140" text-anchor="end">34 · otoño</text>
        </svg></div>
        <div class="d9lab-reading" aria-live="polite" aria-atomic="true"><p class="d9lab-kicker" data-d9lab-field="semana-fecha"></p><h3 data-d9lab-field="semana-titulo"></h3><p data-d9lab-field="semana-texto"></p></div>
        <details><summary>Consultar el texto y la aplicación</summary><p data-d9lab-field="semana-biblia"></p><blockquote data-d9lab-field="semana-cita"></blockquote><p class="d9lab-source" data-d9lab-field="semana-fuente"></p><p>Las fechas 27, 31 y 34 corresponden a la cronología explicada por Elena de White. Daniel no escribe esos años de nuestra era.</p></details>
        <details><summary>¿Qué significa confirmar el pacto con muchos?</summary><p>El pacto está en la oración de Daniel (9:4). Cristo confirma las promesas hechas a los padres (Romanos 15:8), y Jesús une pacto, sangre y muchos en Mateo 26:28. La semana delimita el testimonio especialmente dirigido a Israel; no fija una fecha de vencimiento del nuevo pacto.</p><p class="d9lab-source">DTG, cap. 23, pp. 200–201; Bohr, Studies in Daniel 1–10, pp. 346–347.</p></details>
        ${pregunta('Comprueba: ¿qué termina en la cruz y qué termina en el 34?', 'En la cruz se cumple la realidad anunciada por los sacrificios; su significado ritual ha llegado a su fin. En el 34 termina el período de 490 años de esta cronología. El pacto no expira y la salvación sigue incluyendo a las personas judías. Referencias: Daniel 9:24–27; Mateo 27:50–51; DTG, cap. 23; Romanos 11:1–5.')}
      </section>
      <section class="d9lab-panel" data-d9lab-panel="periodos" aria-label="Las setenta semanas dentro de los dos mil trescientos años">
        <header><p class="d9lab-kicker">La relación entre los períodos</p><h3>490 años dentro de 2.300</h3><p>La vista general conserva la proporción. La ampliación permite ver la primera parte con más detalle.</p></header>
        <div class="d9lab-options" role="group" aria-label="Elegir la escala del período">
          <button type="button" data-d9lab-action="escala" data-d9lab-value="general" aria-pressed="true"><strong>Ver los 2.300</strong><small>457 a.C. → 1844</small></button>
          <button type="button" data-d9lab-action="escala" data-d9lab-value="ampliada" aria-pressed="false"><strong>Ampliar los 490</strong><small>457 a.C. → 34 d.C.</small></button>
        </div>
        <div class="d9lab-visual"><svg viewBox="0 0 680 154" role="img" data-d9lab-chart="periodos" aria-label="490 años y 1810 años restantes forman 2300 años">
          <text x="24" y="30" data-d9lab-period-title>2.300 años · vista general</text>
          <rect class="d9lab-bar" data-active="true" data-d9lab-period-first x="24" y="50" width="134.64" height="40" rx="4"/>
          <rect class="d9lab-bar" data-active="false" data-d9lab-period-rest x="158.64" y="50" width="497.36" height="40" rx="4"/>
          <text x="24" y="125">457 a.C.</text><text x="158.64" y="125" text-anchor="middle" data-d9lab-period-mid>34 d.C.</text><text x="656" y="125" text-anchor="end" data-d9lab-period-end>1844</text>
        </svg><p class="d9lab-period-caption" data-d9lab-field="periodo-caption" role="status" aria-live="polite" aria-atomic="true">El tramo dorado ocupa el 21,3 % del período completo.</p></div>
        <div class="d9lab-reading"><h3>El tiempo que queda</h3><p class="d9lab-equation"><strong>2.300 − 490 = 1.810</strong><small>años restantes</small></p><p class="d9lab-equation"><strong>34 + 1.810 = 1844</strong></p><p>Ambos períodos empiezan con la orden de restaurar y edificar Jerusalén, identificada con el decreto completo de Artajerjes en 457 a.C.</p></div>
        <div class="d9lab-nozero" aria-label="El año uno antes de Cristo es seguido por el año uno después de Cristo"><span>1 a.C.</span><span>→</span><span class="d9lab-crossed">año 0</span><span>→</span><span>1 d.C.</span></div>
        <p class="d9lab-note">El año 0 no existe: de 457 a.C. a 34 d.C. son 457 + 34 − 1 = 490 años. De 457 a.C. a 1844 son 457 + 1844 − 1 = 2.300.</p>
        <details><summary>¿Dónde se sostiene el comienzo compartido?</summary><p>Daniel 8:14 presenta el período mayor; Daniel 9:24–25 delimita las setenta semanas y la orden inicial. Elena de White aplica esa relación:</p><blockquote>«las setenta semanas deben por consiguiente formar parte de los 2.300 días, y ambos períodos deben comenzar juntos».</blockquote><p class="d9lab-source">El conflicto de los siglos, cap. 18, p. 373; PDF de la biblioteca, p. 272. El diagrama de p. 374 sitúa el término de los 2.300 años en 1844; PDF p. 273.</p><p>El término se aplica a la purificación del santuario celestial y el juicio; no a una fecha de la segunda venida.</p></details>
        ${pregunta('Comprueba: ¿los 1.810 años comienzan en 457 a.C. o en el 34 d.C.?', 'En el 34 d.C. Los primeros 490 años ya transcurrieron desde 457 a.C. Los 1.810 restantes completan el mismo período hasta 1844. Comenzarlos otra vez en 457 superpondría los dos tramos. Referencia: CS, cap. 18, pp. 373–374.')}
      </section>
      <section class="d9lab-panel" data-d9lab-panel="gabriel" aria-label="Cómo se relacionan Daniel ocho y nueve">
        <header><p class="d9lab-kicker">El argumento bíblico</p><h3>¿Por qué vuelve Gabriel?</h3><p>Lee ambos capítulos juntos. Sigue la pregunta, el regreso del mensajero y la explicación del tiempo.</p></header>
        <div class="d9lab-evidence-pair"><div><strong>Daniel 8</strong><p>2.300 tardes y mañanas. Daniel termina sin comprender.</p><small>8:14, 26–27</small></div><div><strong>Daniel 9</strong><p>El mismo Gabriel vuelve para dar entendimiento.</p><small>9:21–25</small></div></div>
        <div class="d9lab-chain" role="group" aria-label="Seguir la explicación de Gabriel">
          <button type="button" data-d9lab-action="gabriel" data-d9lab-value="0" aria-pressed="true"><span class="d9lab-chain-num">1</span><span class="d9lab-chain-name">La pregunta</span></button>
          <button type="button" data-d9lab-action="gabriel" data-d9lab-value="1" aria-pressed="false"><span class="d9lab-chain-num">2</span><span class="d9lab-chain-name">El regreso</span></button>
          <button type="button" data-d9lab-action="gabriel" data-d9lab-value="2" aria-pressed="false"><span class="d9lab-chain-num">3</span><span class="d9lab-chain-name">La explicación</span></button>
        </div>
        <div class="d9lab-visual"><svg viewBox="0 0 680 100" role="img" data-d9lab-chart="gabriel" aria-label="Conexión entre la pregunta de Daniel ocho y la explicación de Daniel nueve">
          <line x1="84" y1="50" x2="596" y2="50" stroke="#42534b" stroke-width="8"/><line data-d9lab-gabriel-line x1="84" y1="50" x2="84" y2="50" class="d9lab-svg-line"/>
          <circle data-d9lab-link="0" class="d9lab-dot" cx="84" cy="50" r="16"/><circle data-d9lab-link="1" class="d9lab-dot" cx="340" cy="50" r="16"/><circle data-d9lab-link="2" class="d9lab-dot" cx="596" cy="50" r="16"/>
          <text x="84" y="90" text-anchor="middle" class="d9lab-svg-label">8:26–27</text><text x="340" y="90" text-anchor="middle" class="d9lab-svg-label">9:21–23</text><text x="596" y="90" text-anchor="middle" class="d9lab-svg-label">9:24–25</text>
        </svg></div>
        <div class="d9lab-reading" aria-live="polite" aria-atomic="true"><p class="d9lab-kicker" data-d9lab-field="gabriel-ref"></p><h3 data-d9lab-field="gabriel-titulo"></h3><blockquote data-d9lab-field="gabriel-cita"></blockquote><p data-d9lab-field="gabriel-texto"></p></div>
        <details><summary>Consultar la fuente de este paso</summary><p class="d9lab-source" data-d9lab-field="gabriel-fuente"></p><p>El texto bíblico muestra la continuidad del mensajero y su propósito. La aplicación de los 490 años como parte inicial de los 2.300 se explica en CS 373. La palabra «determinadas» se estudia dentro de ese argumento; por sí sola no reemplaza la comparación de los pasajes.</p></details>
        ${pregunta('Comprueba: ¿qué dos evidencias conectan los capítulos?', 'Daniel termina sin comprender la visión (8:26–27), y 9:21 identifica al mismo Gabriel antes de explicar el tiempo (9:22–25). La continuidad del mensajero y la continuidad de la explicación se leen juntas. Referencia: Daniel 8:26–27; 9:21–25; CS, cap. 18, pp. 372–373.')}
      </section>
    </div>`;
  const navegacion = doc.createElement('nav');
  navegacion.className = 'd9lab-activities';
  navegacion.setAttribute('aria-label', 'Actividades de Daniel 9');
  navegacion.innerHTML = '<button type="button" data-d9lab-action="actividad" data-d9lab-value="semanas" aria-pressed="true">70 semanas</button><button type="button" data-d9lab-action="actividad" data-d9lab-value="ultima" aria-pressed="false">La última semana</button><button type="button" data-d9lab-action="actividad" data-d9lab-value="periodos" aria-pressed="false">Los 2.300 años</button><button type="button" data-d9lab-action="actividad" data-d9lab-value="gabriel" aria-pressed="false">Gabriel vuelve</button>';
  caja.querySelector('header').after(navegacion);
  caja.querySelectorAll('[data-d9lab-panel]').forEach((panel, i) => {
    const trabajo = doc.createElement('div'), escena = doc.createElement('div'), lectura = doc.createElement('div');
    trabajo.className = 'd9lab-work';
    escena.className = 'd9lab-stage';
    lectura.className = 'd9lab-lesson';
    let enLectura = false;
    [...panel.children].filter(e => e.tagName !== 'HEADER').forEach(e => {
      if (e.classList.contains('d9lab-reading')) enLectura = true;
      (enLectura ? lectura : escena).append(e);
    });
    trabajo.append(escena, lectura);
    panel.append(trabajo);
    panel.hidden = i !== 0;
  });
  root.append(caja);
  const campo = (k, t) => { caja.querySelector(`[data-d9lab-field="${k}"]`).textContent = t; };
  const pulsado = (accion, valor) => caja.querySelectorAll(`[data-d9lab-action="${accion}"]`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.d9labValue === String(valor))));
  function eligeBloque(n) {
    const b = bloques[n];
    if (!b) return;
    pulsado('bloque', n);
    caja.querySelectorAll('[data-d9lab-block]').forEach(e => e.dataset.active = String(Number(e.dataset.d9labBlock) === n));
    campo('bloque-titulo', b.titulo);
    campo('bloque-cuenta', `${b.semanas} × 7 = ${b.anos} años`);
    campo('bloque-fechas', `${b.desde} → ${b.hasta}`);
    campo('bloque-texto', b.texto);
    campo('bloque-biblia', b.biblia);
    campo('bloque-fuente', b.fuente);
    caja.querySelector('[data-d9lab-chart="bloques"]').setAttribute('aria-label', `${b.semanas} semanas: ${b.anos} años, de ${b.desde} a ${b.hasta}. El tramo seleccionado se ilumina dentro de los 490 años.`);
  }
  function eligeSemana(n) {
    const s = semana[n];
    if (!s) return;
    pulsado('semana', n);
    caja.querySelectorAll('[data-d9lab-point]').forEach(e => e.dataset.active = String(Number(e.dataset.d9labPoint) === n));
    caja.querySelectorAll('[data-d9lab-half]').forEach(e => e.dataset.active = String(n === 1 || Number(e.dataset.d9labHalf) === (n === 0 ? 0 : 1)));
    const marcador = caja.querySelector('[data-d9lab-marker]');
    marcador.setAttribute('x1', String(s.x));
    marcador.setAttribute('x2', String(s.x));
    campo('semana-fecha', s.fecha);
    campo('semana-titulo', s.titulo);
    campo('semana-texto', s.texto);
    campo('semana-biblia', s.biblia);
    campo('semana-cita', s.cita);
    campo('semana-fuente', s.fuente);
    caja.querySelector('[data-d9lab-chart="semana"]').setAttribute('aria-label', `${s.fecha}: ${s.titulo}. La semana tiene dos mitades de tres años y medio.`);
  }
  function eligeEscala(valor) {
    if (!['general', 'ampliada'].includes(valor)) return;
    const amplia = valor === 'ampliada', ancho = amplia ? 632 : 632 * 490 / 2300;
    pulsado('escala', valor);
    caja.querySelector('[data-d9lab-period-first]').setAttribute('width', String(ancho));
    const resto = caja.querySelector('[data-d9lab-period-rest]');
    resto.setAttribute('x', String(24 + ancho));
    resto.setAttribute('width', String(632 - ancho));
    resto.style.display = amplia ? 'none' : '';
    const medio = caja.querySelector('[data-d9lab-period-mid]');
    medio.setAttribute('x', String(24 + ancho));
    medio.setAttribute('text-anchor', amplia ? 'end' : 'middle');
    caja.querySelector('[data-d9lab-period-end]').style.display = amplia ? 'none' : '';
    caja.querySelector('[data-d9lab-period-title]').textContent = amplia ? '490 años · primera parte ampliada' : '2.300 años · vista general';
    campo('periodo-caption', amplia ? 'Ampliación de 457 a.C. a 34 d.C. Los 1.810 años restantes continúan hasta 1844, fuera de esta ventana.' : 'El tramo dorado ocupa el 21,3 % del período completo. El resto representa 1.810 años.');
    caja.querySelector('[data-d9lab-chart="periodos"]').setAttribute('aria-label', amplia ? 'Primera parte ampliada: 490 años, de 457 antes de Cristo a 34 después de Cristo. El resto del período queda fuera de esta ventana.' : 'Vista general: 490 años de 457 antes de Cristo a 34 después de Cristo, seguidos por 1810 años hasta 1844.');
  }
  function eligeGabriel(n) {
    const p = pasos[n];
    if (!p) return;
    pulsado('gabriel', n);
    caja.querySelectorAll('[data-d9lab-link]').forEach(e => e.dataset.active = String(Number(e.dataset.d9labLink) <= n));
    caja.querySelector('[data-d9lab-gabriel-line]').setAttribute('x2', String([84, 340, 596][n]));
    campo('gabriel-ref', p.ref);
    campo('gabriel-titulo', p.nombre);
    campo('gabriel-cita', p.cita);
    campo('gabriel-texto', p.texto);
    campo('gabriel-fuente', p.apoyo);
    caja.querySelector('[data-d9lab-chart="gabriel"]').setAttribute('aria-label', `Paso ${n + 1} de tres: ${p.nombre}, ${p.ref}.`);
  }
  function eligeActividad(valor) {
    if (!['semanas', 'ultima', 'periodos', 'gabriel'].includes(valor)) return;
    pulsado('actividad', valor);
    caja.querySelectorAll('[data-d9lab-panel]').forEach(panel => panel.hidden = panel.dataset.d9labPanel !== valor);
  }
  const acciones = { actividad: eligeActividad, bloque: v => eligeBloque(Number(v)), semana: v => eligeSemana(Number(v)), escala: eligeEscala, gabriel: v => eligeGabriel(Number(v)) };
  caja.addEventListener('click', e => {
    const b = e.target.closest('button[data-d9lab-action]');
    if (b && caja.contains(b)) acciones[b.dataset.d9labAction]?.(b.dataset.d9labValue);
  }, { signal: vida.signal });
  caja.addEventListener('keydown', e => {
    const b = e.target.closest('button[data-d9lab-action]');
    if (!b || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    const bs = [...caja.querySelectorAll(`button[data-d9lab-action="${b.dataset.d9labAction}"]`)];
    const i = bs.indexOf(b), n = e.key === 'Home' ? 0 : e.key === 'End' ? bs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length;
    e.preventDefault();
    bs[n].focus();
    bs[n].click();
  }, { signal: vida.signal });
  eligeBloque(0);
  eligeSemana(1);
  eligeEscala('general');
  eligeGabriel(0);
  return () => { vida.abort(); caja.remove(); };
}
