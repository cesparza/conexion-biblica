/* Preguntas de completar para los capitulos de Profetas y Reyes que no tenian.

   EL HUECO
   De los seis capitulos de P&R, solo pr39, pr41 y pr44 traian preguntas de
   completar; pr40, pr42 y pr43 no tenian ninguna. El examen real trae su
   seccion de completar y no distingue de que capitulo salio la pregunta.

   DE DONDE SALEN LAS FRASES
   De «Profetas y Reyes», files/profetas-y-reyes.pdf, capitulos 40, 42 y 43.
   Se transcriben tal como estan en el libro, con su ortografia («fué»), igual
   que las que ya existian para pr39. Las comillas angulares se reservan en
   este proyecto para lo verificable, y estas lo son: salen del libro. */

const BANCO_PR = [

/* ─────── P&R 40 — El sueño de Nabucodonosor ─────── */
{cap:'pr40',t:'fill',ins:'Profetas y Reyes, cap. 40 — Completa la frase sobre el poder de los gobernantes:',
 p:[{x:'«El poder ejercido por todo gobernante de la tierra es '},{b:'impartido',h:'¿de dónde viene?'},
    {x:' del Cielo; y del uso que hace de este poder el tal gobernante, depende su '},
    {b:'éxito',h:'¿de qué depende?'},{x:'.»'}]},
{cap:'pr40',t:'fill',ins:'Profetas y Reyes, cap. 40 — Completa la frase sobre lo que Dios iba a revelar:',
 p:[{x:'«Dios iba a revelarle que él ejerce el poder sobre los reinos del mundo, el poder de '},
    {b:'entronizar',h:'¿poder de qué?'},{x:' y de '},{b:'destronar',h:'¿y de qué?'},{x:' a los reyes.»'}]},

/* ─────── P&R 42 — La verdadera grandeza ─────── */
{cap:'pr42',t:'fill',ins:'Profetas y Reyes, cap. 42 — Completa la frase sobre en qué falló el rey:',
 p:[{x:'«Endureciendo su corazón, usó los '},{b:'talentos',h:'¿qué usó mal?'},
    {x:' que Dios le había dado para '},{b:'glorificarse',h:'¿para qué?'},
    {x:' a sí mismo, y para ensalzarse sobre el Dios que le había dado la vida y el poder.»'}]},
{cap:'pr42',t:'fill',ins:'Profetas y Reyes, cap. 42 — Completa la frase sobre su restauración:',
 p:[{x:'«Al cabo de ese tiempo, la razón le fué devuelta, y mirando con '},
    {b:'humildad',h:'¿cómo miró?'},{x:' hacia el Dios del cielo, reconoció en su '},
    {b:'castigo',h:'¿en qué reconoció la mano divina?'},{x:' la intervención de la mano divina.»'}]},

/* ─────── P&R 43 — El vigía invisible ─────── */
{cap:'pr43',t:'fill',ins:'Profetas y Reyes, cap. 43 — Completa la frase sobre lo que Dios había intentado:',
 p:[{x:'«Mediante múltiples '},{b:'providencias',h:'¿mediante qué?'},
    {x:', Dios había procurado enseñarles a '},{b:'reverenciar',h:'¿a qué?'},{x:' su ley.»'}]},
{cap:'pr43',t:'fill',ins:'Profetas y Reyes, cap. 43 — Completa la frase sobre la noche del banquete:',
 p:[{x:'«Como en visión '},{b:'panorámica',h:'¿cómo desfilaron?'},
    {x:' desfilaron ante sus ojos los actos de su vida impía; les pareció estar emplazados ante el '},
    {b:'tribunal',h:'¿ante qué?'},{x:' del Dios eterno, cuyo poder acababan de desafiar.»'}]},

];

if (typeof module !== "undefined") module.exports = { BANCO_PR };
