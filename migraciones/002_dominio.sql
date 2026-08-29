-- Conexión Bíblica — tablas del dominio.
-- Ejecutar UNA vez, después de 001.

PRAGMA foreign_keys = ON;

-- DATO MÍNIMO DE MENORES, Y ES UNA DECISIÓN, NO UN OLVIDO.
-- Las participantes tienen entre 4 y 9 años. Aquí va lo estrictamente necesario
-- para que el director sepa de quién es una nota: nombre de pila y categoría.
-- NO va apellido, fecha de nacimiento, foto, teléfono, correo ni acudiente.
-- Si algún día hace falta algo más, se pide permiso a los padres primero y se
-- agrega en una migración aparte, no aquí.
CREATE TABLE IF NOT EXISTS participante (
  id         TEXT PRIMARY KEY,
  nombre     TEXT NOT NULL,
  categoria  TEXT NOT NULL CHECK (categoria IN ('4-6','7-9','padres')),
  codigo     TEXT NOT NULL,
  creado_en  TEXT NOT NULL DEFAULT (datetime('now')),
  borrado_en TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_part_codigo ON participante(codigo);

-- Ajustes del club. Hoy tiene una sola fila que importa: si los exámenes de
-- práctica están abiertos o cerrados. Es el interruptor global que reemplaza al
-- de cada aparato.
CREATE TABLE IF NOT EXISTS ajuste (
  clave       TEXT PRIMARY KEY,
  valor       TEXT,
  cambiado_en TEXT,
  cambiado_por TEXT
);

-- Un intento de examen. idempotency_key evita que un reintento de red guarde la
-- misma nota dos veces. La semilla es la que identifica el examen por link: con
-- (participante, semilla) único, el link deja de poder rehacerse en OTRO
-- aparato, que es justo lo que la versión sin servidor no podía impedir.
CREATE TABLE IF NOT EXISTS intento (
  id              TEXT PRIMARY KEY,
  participante_id TEXT NOT NULL REFERENCES participante(id),
  modo            TEXT NOT NULL,
  semilla         TEXT,
  nota            INTEGER,
  total           INTEGER,
  idempotency_key TEXT,
  creado_en       TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_intento_idem ON intento(idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS ix_intento_link ON intento(participante_id, semilla) WHERE semilla IS NOT NULL;
CREATE INDEX IF NOT EXISTS ix_intento_part ON intento(participante_id, creado_en);
