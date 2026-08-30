-- Conexión Bíblica — la categoría del participante pasa a ser la de la app.
-- Ejecutar UNA vez, después de 004.
--
-- POR QUÉ
-- La tabla guardaba '4-6', '7-9' o 'padres': eso dice la edad pero NO dice el
-- evento, y en esta app un niño de 7 a 9 de Conexión Bíblica estudia material
-- distinto al de Devoción Matutina. Sin el evento, el director no puede abrir
-- una evaluación solo para matutina, que es justo lo que necesita.
-- Se pasa a las seis categorías reales de la app: me, av, pa, gm, dm1, dm2.
--
-- SQLite no deja quitar un CHECK: hay que recrear la tabla y copiar.

PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS participante_nuevo (
  id         TEXT PRIMARY KEY,
  nombre     TEXT NOT NULL,
  categoria  TEXT NOT NULL CHECK (categoria IN ('me','av','pa','gm','dm1','dm2')),
  codigo     TEXT NOT NULL,
  creado_en  TEXT NOT NULL DEFAULT (datetime('now')),
  borrado_en TEXT
);

INSERT INTO participante_nuevo (id, nombre, categoria, codigo, creado_en, borrado_en)
SELECT id, nombre,
       CASE categoria WHEN '4-6' THEN 'me' WHEN '7-9' THEN 'av' WHEN 'padres' THEN 'pa'
            ELSE categoria END,
       codigo, creado_en, borrado_en
FROM participante;

DROP TABLE participante;
ALTER TABLE participante_nuevo RENAME TO participante;
CREATE UNIQUE INDEX IF NOT EXISTS ix_part_codigo ON participante(codigo);

-- A qué categorías les toca la evaluación. '*' = a todas.
ALTER TABLE evaluacion ADD COLUMN categorias TEXT NOT NULL DEFAULT '*';

PRAGMA foreign_keys = ON;
