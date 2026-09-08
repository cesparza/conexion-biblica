-- Conexión Bíblica — «En esto creemos» pasa a tener sus propias categorías.
-- Ejecutar UNA vez, después de 005.
--
-- POR QUÉ
-- Las 28 creencias eran una actividad distinta metida dentro de las categorías
-- de Conexión Bíblica: los capítulos declaraban cats:['pa','gm'] y la app las
-- separaba con un interruptor aparte. Eso significaba tres mecanismos para el
-- mismo concepto (Conexión Bíblica con un campo de texto, la matutina con
-- claves propias, las creencias con un interruptor) y que la racha y las
-- insignias de un padre sumaran dos actividades en un solo contador.
--
-- Ahora la actividad es una dimensión de primer nivel y cada una tiene sus
-- categorías. «En esto creemos» aporta dos, porque su reglamento reparte el
-- club en dos grupos cuyas notas SE SUMAN:
--   ec1  los dos adultos que presentan el examen escrito
--   ec2  el resto del club, que contesta el cuestionario
--
-- QUÉ NO CAMBIA, Y ES LO IMPORTANTE
-- Ninguna categoría existente se toca ni se renombra. Al correr esto hay 7
-- participantes creadas (3 av, 3 pa, 1 me) y siguen igual: esta migración solo
-- AMPLÍA lo que el CHECK acepta. Se hizo respaldo con `wrangler d1 export`
-- antes de ejecutarla.
--
-- SQLite no deja modificar un CHECK: hay que recrear la tabla y copiar, igual
-- que en 005.

PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS participante_006 (
  id         TEXT PRIMARY KEY,
  nombre     TEXT NOT NULL,
  categoria  TEXT NOT NULL CHECK (categoria IN ('me','av','pa','gm','dm1','dm2','ec1','ec2')),
  codigo     TEXT NOT NULL,
  creado_en  TEXT NOT NULL DEFAULT (datetime('now')),
  borrado_en TEXT
);

INSERT INTO participante_006 (id, nombre, categoria, codigo, creado_en, borrado_en)
SELECT id, nombre, categoria, codigo, creado_en, borrado_en FROM participante;

DROP TABLE participante;
ALTER TABLE participante_006 RENAME TO participante;
CREATE UNIQUE INDEX IF NOT EXISTS ix_part_codigo ON participante(codigo);

PRAGMA foreign_keys = ON;
