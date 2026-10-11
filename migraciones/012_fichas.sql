-- Conexión Bíblica — las fichas de campamento también se guardan en la base.
-- Ejecutar UNA vez, después de 011. Solo agrega una tabla: no toca ninguna
-- de las que existen y se puede correr dos veces.
--
-- POR QUÉ EXISTE ESTA TABLA
-- Hasta la v166 el reglamento de cada concurso (categorías, cuántas preguntas,
-- hasta qué nivel, qué capítulos entran, la fecha) vivía solo en el código,
-- en fuente/campamentos.js. Cambiar un número era publicar una versión, y eso
-- solo lo puede hacer quien mantiene la app. Con esta tabla, quien dirige un
-- club puede guardar una ficha y los aparatos la reciben con /estado.
--
-- QUIÉN GANA
-- Las fichas del código son las de fábrica. Una fila de aquí con el mismo
-- `ficha_id` reemplaza entera a la de fábrica; una con id nuevo es un concurso
-- nuevo. Con la tabla vacía, la app se porta exactamente como antes.
--
-- SOLO CRECE
-- Guardar una ficha agrega una fila; nunca se actualiza ni se borra una. La
-- vigente de cada id es la de `n` más alto. Así queda escrito quién cambió un
-- reglamento y cuándo, y volver a uno anterior es guardar otra vez aquel.
--
-- POR QUÉ UN JSON
-- La ficha se lee y se escribe entera, y nadie la consulta por dentro. La
-- forma la revisa la app antes de usarla (fuente/reglamento.js, revisa()).
--
-- LO QUE ESTA TABLA NO HACE
-- No deja crear categorías nuevas del lado del servidor: `participante` y
-- `evaluacion` siguen aceptando solo las ocho de siempre. Eso es otra
-- migración, la que acompañe a la pantalla donde se crean.

CREATE TABLE IF NOT EXISTS ficha (
  n        INTEGER PRIMARY KEY AUTOINCREMENT,
  ficha_id TEXT NOT NULL CHECK (length(ficha_id) BETWEEN 2 AND 12 AND ficha_id NOT GLOB '*[^a-z0-9]*'),
  -- La ficha completa, con su propio `id` igual a ficha_id.
  datos    TEXT NOT NULL CHECK (json_valid(datos) AND length(datos) <= 20000),
  -- Quién la guardó, como lo sepa quien escribe (una persona, «director»).
  quien    TEXT NOT NULL CHECK (length(quien) BETWEEN 1 AND 120),
  cuando   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS ix_ficha_id ON ficha(ficha_id, n);
