-- Conexión Bíblica — `participante` deja de enumerar las categorías.
-- Ejecutar UNA vez, después de 012, con respaldo antes (`wrangler d1 export`).
--
-- POR QUÉ
-- La tabla traía escritas las ocho categorías que existían (CHECK ... IN
-- ('me','av',...)). Cada categoría nueva obligaba a recrear la tabla: ya pasó
-- en la 005 y en la 006. Desde que un concurso se puede guardar en la base
-- (012), una categoría nueva nace cuando alguien guarda una ficha, sin
-- publicar nada, y la tabla no la dejaría entrar.
--
-- QUÉ CAMBIA
-- El CHECK ya no dice cuáles categorías existen: dice qué FORMA tiene un id de
-- categoría (de 2 a 12 letras minúsculas o números, empezando por letra, igual
-- que en fuente/reglamento.js). Cuáles existen lo decide el servidor contra el
-- reglamento vigente (`catsValidas` en functions/api).
--
-- QUÉ NO CAMBIA
-- Ninguna fila, ninguna columna, ningún índice. Las participantes que hay
-- siguen con su id, su código y su categoría. `intento` y `progreso` apuntan a
-- `participante` por nombre y siguen apuntando después del cambio.
--
-- SQLite no deja modificar un CHECK: se crea la tabla nueva, se copia, se
-- suelta la vieja y se renombra, como en la 005 y la 006. La diferencia es que
-- ahora hay filas en `intento` y `progreso` que la referencian: por eso las
-- llaves foráneas se DIFIEREN hasta el final de la transacción (D1 no deja
-- apagarlas con `foreign_keys = OFF`); al terminar, la tabla vuelve a existir
-- con las mismas filas y la comprobación pasa.

PRAGMA defer_foreign_keys = true;

CREATE TABLE participante_013 (
  id         TEXT PRIMARY KEY,
  nombre     TEXT NOT NULL,
  categoria  TEXT NOT NULL CHECK (length(categoria) BETWEEN 2 AND 12 AND categoria GLOB '[a-z]*' AND categoria NOT GLOB '*[^a-z0-9]*'),
  codigo     TEXT NOT NULL,
  creado_en  TEXT NOT NULL DEFAULT (datetime('now')),
  borrado_en TEXT
);

INSERT INTO participante_013 (id, nombre, categoria, codigo, creado_en, borrado_en)
SELECT id, nombre, categoria, codigo, creado_en, borrado_en FROM participante;

DROP TABLE participante;
ALTER TABLE participante_013 RENAME TO participante;
CREATE UNIQUE INDEX IF NOT EXISTS ix_part_codigo ON participante(codigo);

PRAGMA defer_foreign_keys = false;
