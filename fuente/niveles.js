/* Nivel de dificultad de cada pregunta, calculado con reglas explícitas.

   POR QUÉ SE CALCULA Y NO SE ESCRIBE A MANO
   Son 180+ preguntas y el banco sigue creciendo. Etiquetar a mano se
   desincroniza; una regla se aplica igual a la pregunta 20 y a la 300.
   Cualquier pregunta puede llevar `nv:1|2|3` y esa etiqueta manda sobre
   la regla, para los casos que la regla clasifica mal.

   CÓMO SE DECIDE
   nivel 1 — dato directo: un nombre, un número, un lugar, un material.
             Se responde recordando, sin comparar redacciones.
   nivel 2 — requiere la frase o la distinción: verdadero/falso, opciones
             que son citas largas, preguntas «según...».
   nivel 3 — precisión literal o interpretación: completar el versículo,
             diferencias entre RV1995 y RV1960, y lo que Elena de White
             explica o aplica (no el dato, el sentido).

   El examen usa esto para subir la dificultad a medida que la estudiante
   domina cada nivel, en vez de darle desde el primer día lo más difícil. */

const ABSTRACTO = /ense[ñn]a|aplicaci[oó]n|representa|significa|mensaje|virtud|resultado espiritual|lecci[oó]n|por qu[eé]|qu[eé] muestra|modelo/i;

function nivelDe(q) {
  if (q.nv === 1 || q.nv === 2 || q.nv === 3) return q.nv;   // override a mano
  const texto = (q.q || q.ins || '') + ' ' + (q.o || []).join(' ');

  // Completar el versículo: siempre es lo más exigente.
  if (q.t === 'fill') return 3;
  // Precisión entre versiones: es la trampa más fina del concurso.
  if (/RV1995|RV1960/i.test(texto)) return 3;
  // Profetas y Reyes cuando pide el sentido, no el dato.
  if (q.cap.slice(0, 2) === 'pr' && ABSTRACTO.test(texto)) return 3;

  // Verdadero o falso: hay que detectar el detalle cambiado.
  if (q.t === 'tf') return 2;
  // Opciones que son citas largas: hay que reconocer la redacción.
  if ((q.o || []).some(o => o.length > 60)) return 2;
  // Preguntas «según X»: piden ubicar la fuente.
  if (/seg[uú]n /i.test(texto)) return 2;

  return 1;
}

const ETIQUETA = { 1: 'Básico', 2: 'Intermedio', 3: 'Avanzado' };

module.exports = { nivelDe, ETIQUETA };
