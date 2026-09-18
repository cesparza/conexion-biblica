/* matutina-completar.js — NO EDITAR A MANO.
   Lo escribe tools/creencias/gen_matutina.py.

   POR QUE EXISTE
   La matutina no tenia ni una pregunta de completar, y por eso solo se le
   ofrecian cinco de los nueve modos de practicar: «Completar», «Caza el
   error» y «¿De donde es?» salen todos de ahi. El examen real tambien trae
   su seccion de completar.

   El texto sale del modulo «Los 31 versiculos con su referencia», que ya
   estaba publicado en la app. No se trae texto de ninguna otra parte. */

const MAT_COMPLETAR = [
  {cap:"m01",t:"fill",ins:"Lucas 12:15 — Completa el versículo del día 1:",
   p:[{x:""},{b:"Cuídense",h:"¿?"},{x:" ustedes de toda "},{b:"avaricia",h:"¿?"},{x:"; porque la vida no depende del poseer muchas cosas"}]},
  {cap:"m02",t:"fill",ins:"Salmo 113:7 — Completa el versículo del día 2:",
   p:[{x:"El Señor levanta del suelo al pobre, y saca del lugar más bajo al "},{b:"necesitado",h:"¿?"},{x:""}]},
  {cap:"m03",t:"fill",ins:"1 Juan 5:15 — Completa el versículo del día 3:",
   p:[{x:"Así como sabemos que Dios oye "},{b:"nuestras",h:"¿?"},{x:" "},{b:"oraciones",h:"¿?"},{x:", también sabemos que ya tenemos lo que le hemos pedido"}]},
  {cap:"m04",t:"fill",ins:"2 Timoteo 2:21 (NTV) — Completa el versículo del día 4:",
   p:[{x:"Si te "},{b:"mantienes",h:"¿?"},{x:" puro, serás un "},{b:"utensilio",h:"¿?"},{x:" especial para uso honorable. Tu vida será limpia, y estarás listo para que el Maestro te use en toda buena obra"}]},
  {cap:"m05",t:"fill",ins:"1 Timoteo 2:4 — Completa el versículo del día 5:",
   p:[{x:"[Dios] "},{b:"quiere",h:"¿?"},{x:" que todos se salven"}]},
  {cap:"m06",t:"fill",ins:"Isaías 41:10 — Completa el versículo del día 6:",
   p:[{x:"No temas, pues yo soy tu Dios. Yo te doy fuerzas, yo te ayudo, yo te "},{b:"sostengo",h:"¿?"},{x:" con mi mano "},{b:"victoriosa",h:"¿?"},{x:""}]},
  {cap:"m07",t:"fill",ins:"1 Tesalonicenses 5:18 — Completa el versículo del día 7:",
   p:[{x:"Den "},{b:"gracias",h:"¿?"},{x:" a Dios por todo, porque esto es lo que él quiere de ustedes como "},{b:"creyentes",h:"¿?"},{x:" en Cristo Jesús"}]},
  {cap:"m08",t:"fill",ins:"Hechos 1:8 — Completa el versículo del día 8:",
   p:[{x:"Cuando el Espíritu Santo venga sobre ustedes, "},{b:"recibirán",h:"¿?"},{x:" poder y saldrán a dar "},{b:"testimonio",h:"¿?"},{x:" de mí [...] hasta en las partes más lejanas de la tierra"}]},
  {cap:"m09",t:"fill",ins:"2 Timoteo 4:2 — Completa el versículo del día 9:",
   p:[{x:"Tú "},{b:"anuncia",h:"¿?"},{x:" el mensaje de Dios en todo momento"}]},
  {cap:"m10",t:"fill",ins:"Cantares 2:2 — Completa el versículo del día 10:",
   p:[{x:"Mi amada es, entre las "},{b:"mujeres",h:"¿?"},{x:", como una rosa entre los espinos"}]},
  {cap:"m11",t:"fill",ins:"Proverbios 16:9 — Completa el versículo del día 11:",
   p:[{x:"Al hombre le toca hacer planes, y al Señor "},{b:"dirigir",h:"¿?"},{x:" sus pasos"}]},
  {cap:"m12",t:"fill",ins:"Filipenses 3:14 (PDT) — Completa el versículo del día 12:",
   p:[{x:"Sigo hacia la meta para ganar el premio que Dios me "},{b:"ofreció",h:"¿?"},{x:" cuando me llamó por medio de "},{b:"Jesucristo",h:"¿?"},{x:""}]},
  {cap:"m13",t:"fill",ins:"Proverbios 31:10 (RV95) — Completa el versículo del día 13:",
   p:[{x:"Mujer virtuosa, ¿quién la hallará? Su valor "},{b:"sobrepasa",h:"¿?"},{x:" "},{b:"largamente",h:"¿?"},{x:" al de las piedras preciosas"}]},
  {cap:"m14",t:"fill",ins:"Gálatas 1:10 — Completa el versículo del día 14:",
   p:[{x:"Yo no busco la "},{b:"aprobación",h:"¿?"},{x:" de los hombres, sino la aprobación de Dios"}]},
  {cap:"m15",t:"fill",ins:"Marcos 5:19 — Completa el versículo del día 15:",
   p:[{x:"Vete a tu casa, con tus "},{b:"parientes",h:"¿?"},{x:", y "},{b:"cuéntales",h:"¿?"},{x:" todo lo que el Señor te ha hecho, y cómo ha tenido compasión de ti"}]},
  {cap:"m16",t:"fill",ins:"Filipenses 4:3 — Completa el versículo del día 16:",
   p:[{x:"Sus nombres ya están "},{b:"escritos",h:"¿?"},{x:" en el libro de la vida"}]},
  {cap:"m17",t:"fill",ins:"Salmo 120:2 — Completa el versículo del día 17:",
   p:[{x:"Señor, líbrame de los labios "},{b:"mentirosos",h:"¿?"},{x:" y de la lengua embustera"}]},
  {cap:"m18",t:"fill",ins:"Josué 1:9 — Completa el versículo del día 18:",
   p:[{x:"Yo soy quien te manda que tengas valor y firmeza. No tengas miedo ni te "},{b:"desanimes",h:"¿?"},{x:" porque yo, tu Señor y Dios, estaré contigo "},{b:"dondequiera",h:"¿?"},{x:" que vayas"}]},
  {cap:"m19",t:"fill",ins:"Juan 14:3 — Completa el versículo del día 19:",
   p:[{x:"Después de irme y de "},{b:"prepararles",h:"¿?"},{x:" un lugar, vendré otra vez para "},{b:"llevarlos",h:"¿?"},{x:" conmigo, para que ustedes estén en el mismo lugar en donde yo voy a estar"}]},
  {cap:"m20",t:"fill",ins:"Filipenses 4:8 — Completa el versículo del día 20:",
   p:[{x:""},{b:"Piensen",h:"¿?"},{x:" en todo lo "},{b:"verdadero",h:"¿?"},{x:", en todo lo que es digno de respeto, en todo lo recto, en todo lo puro"}]},
  {cap:"m21",t:"fill",ins:"Salmo 71:17 — Completa el versículo del día 21:",
   p:[{x:"Dios mío, tú me has "},{b:"enseñado",h:"¿?"},{x:" desde mi juventud"}]},
  {cap:"m22",t:"fill",ins:"Lucas 2:46-47 — Completa el versículo del día 22:",
   p:[{x:"Sentado [Jesús] entre los maestros de la ley, [...] todos los que lo oían se admiraban de su "},{b:"inteligencia",h:"¿?"},{x:" y de sus "},{b:"respuestas",h:"¿?"},{x:""}]},
  {cap:"m23",t:"fill",ins:"Isaías 52:7 (TLA) — Completa el versículo del día 23:",
   p:[{x:"¡Qué hermoso es ver al que llega por las colinas "},{b:"trayendo",h:"¿?"},{x:" buenas noticias: noticias de paz, noticias de "},{b:"salvación",h:"¿?"},{x:""}]},
  {cap:"m24",t:"fill",ins:"Gálatas 5:16-17 (TLA) — Completa el versículo del día 24:",
   p:[{x:""},{b:"Obedezcan",h:"¿?"},{x:" al "},{b:"Espíritu",h:"¿?"},{x:" de Dios, y así no desearán hacer lo malo. [...] Ustedes no pueden hacer lo que se les antoje"}]},
  {cap:"m25",t:"fill",ins:"Proverbios 14:29 (NBV) — Completa el versículo del día 25:",
   p:[{x:"El que controla su enojo es muy "},{b:"inteligente",h:"¿?"},{x:""}]},
  {cap:"m26",t:"fill",ins:"Proverbios 12:25 (NBV) — Completa el versículo del día 26:",
   p:[{x:"La angustia "},{b:"desalienta",h:"¿?"},{x:" el corazón del hombre, pero una palabra "},{b:"alentadora",h:"¿?"},{x:" lo anima"}]},
  {cap:"m27",t:"fill",ins:"Santiago 3:15 (NTV) — Completa el versículo del día 27:",
   p:[{x:"La envidia y el egoísmo no forman parte de la "},{b:"sabiduría",h:"¿?"},{x:" que proviene de Dios"}]},
  {cap:"m28",t:"fill",ins:"Hechos 10:34 (NTV) — Completa el versículo del día 28:",
   p:[{x:"Veo con claridad que Dios no muestra "},{b:"favoritismo",h:"¿?"},{x:""}]},
  {cap:"m29",t:"fill",ins:"Filipenses 4:19 (LBLA) — Completa el versículo del día 29:",
   p:[{x:"Mi Dios proveerá a todas vuestras "},{b:"necesidades",h:"¿?"},{x:""}]},
  {cap:"m30",t:"fill",ins:"Proverbios 29:11 (NVI) — Completa el versículo del día 30:",
   p:[{x:"El necio da rienda suelta a su ira, pero el sabio sabe "},{b:"dominarla",h:"¿?"},{x:""}]},
  {cap:"m31",t:"fill",ins:"Proverbios 15:1 (RVC) — Completa el versículo del día 31:",
   p:[{x:"La "},{b:"respuesta",h:"¿?"},{x:" amable calma la ira; la respuesta grosera aumenta el enojo"}]},
];

if (typeof module !== "undefined") module.exports = { MAT_COMPLETAR };
