-- PREGUNTAS RETIRADAS DEL BANCO, SIN TOCAR EL ARTEFACTO.
-- Ejecutar UNA vez, después de 009.
--
-- POR QUÉ
-- El banco son 1.378 preguntas que viven dentro de index.html, y ese archivo
-- se GENERA: sacar una pregunta mala obligaba a editar el generador, correr
-- build.js y desplegar. Eso no se puede hacer desde un celular el sábado por
-- la mañana, que es justo cuando el director la está leyendo y se da cuenta.
-- Aquí el retiro se mueve a donde sí se puede escribir desde el celular: una
-- fila en D1. El generador no se toca y el artefacto tampoco.
--
-- POR QUÉ UN REGISTRO DE HECHOS Y NO UNA MARCA
-- Cada retiro y cada devolución es una FILA. El estado actual de una pregunta
-- es su última fila. Eso da tres cosas de una sola forma:
--   · es reversible — devolver es otra fila, nunca un DELETE;
--   · queda el registro de quién, cuándo y por qué;
--   · se puede preguntar cómo estaba el banco EN UNA FECHA, que es lo que
--     mantiene idéntica una evaluación que ya estaba abierta cuando el
--     director retiró algo. Sin eso, dos participantes de la misma categoría
--     armarían exámenes distintos con la misma semilla.
--
-- POR QUÉ LA CLAVE Y NO UN id
-- Es la misma clave de la migración 008: capítulo + hash del enunciado. No
-- depende del orden ni del tamaño del banco, así que sigue apuntando a la
-- misma pregunta el año entrante. El servidor NO conoce el banco (vive en el
-- HTML), así que valida la FORMA de la clave, nunca su existencia: es el mismo
-- contrato que ya rige `alcance`.
CREATE TABLE IF NOT EXISTS pregunta_retirada (
  clave  TEXT NOT NULL,
  accion TEXT NOT NULL CHECK (accion IN ('retirar','restaurar')),
  quien  TEXT,
  motivo TEXT,
  cuando TEXT NOT NULL DEFAULT (datetime('now'))
);

-- El índice sostiene las dos consultas que existen: el estado actual de todas
-- y el estado a una fecha. Las dos buscan la última fila POR CLAVE.
CREATE INDEX IF NOT EXISTS ix_retirada_clave ON pregunta_retirada(clave, cuando);
