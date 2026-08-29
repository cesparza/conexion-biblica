-- Conexión Bíblica — esquema base (cuentas y sesiones).
-- Ejecutar UNA vez:
--   wrangler d1 execute conexion-biblica --remote --file=migraciones/001_base.sql
--
-- REGLA DE ORO: los CREATE/ALTER se corren una vez; los INSERT OR REPLACE las
-- veces que sea. Nunca mezclar estructura y datos en el mismo archivo.

PRAGMA foreign_keys = ON;

-- Cuentas de acceso. Dos clases y una sola tabla:
--   'clave-panel' + 'director'  -> el director del club, entra con CLAVE_PANEL
--   'codigo'      + <codigo>    -> una participante, entra con su código de 6
-- persona_id apunta a participante(id) cuando la cuenta es de una participante.
CREATE TABLE IF NOT EXISTS cuenta (
  id            TEXT PRIMARY KEY,
  persona_id    TEXT,
  proveedor     TEXT NOT NULL,
  sub_proveedor TEXT,
  rol           TEXT NOT NULL DEFAULT 'participante'
                CHECK (rol IN ('participante','director')),
  creado_en     TEXT NOT NULL DEFAULT (datetime('now')),
  ultimo_acceso TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS ix_cuenta_prov ON cuenta(proveedor, sub_proveedor);

-- Sesiones en D1 y no en KV: el plan gratis de KV da 1.000 escrituras por día.
-- La sesión de una participante dura 60 días a propósito: el estudio son siete
-- semanas y no puede pedirle el código otra vez en mitad del camino.
CREATE TABLE IF NOT EXISTS sesion (
  token      TEXT PRIMARY KEY,
  cuenta_id  TEXT NOT NULL REFERENCES cuenta(id),
  expira_en  TEXT NOT NULL,
  creado_en  TEXT NOT NULL DEFAULT (datetime('now')),
  ip_hash    TEXT
);
CREATE INDEX IF NOT EXISTS ix_sesion_cuenta ON sesion(cuenta_id);

-- Auditoría. Obligatoria porque hay datos de menores: rastro de quién miró y
-- quién cambió qué.
CREATE TABLE IF NOT EXISTS auditoria (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  cuenta_id   TEXT,
  accion      TEXT NOT NULL,
  tabla       TEXT,
  registro_id TEXT,
  ip_hash     TEXT,
  cuando      TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS ix_audit_cuando ON auditoria(cuando);
