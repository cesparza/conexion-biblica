-- Conexión Bíblica — sesiones de evaluación.
-- Ejecutar UNA vez, después de 003.
--
-- POR QUÉ EXISTE ESTA TABLA
-- La app no es la del campamento: es la de preparación. Cada sábado (o el día
-- que el director escoja) se mide el avance con un simulacro que solo está
-- disponible ese día. Antes eso se hacía con un link que llevaba la receta del
-- examen adentro, porque no había servidor. Ahora el examen vive aquí: el
-- director lo abre, todas hacen EL MISMO examen una sola vez, y él lo cierra.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS evaluacion (
  id         TEXT PRIMARY KEY,
  titulo     TEXT NOT NULL,
  alcance    TEXT NOT NULL DEFAULT 'todo',
  cuantas    INTEGER NOT NULL DEFAULT 15,
  nivel      INTEGER NOT NULL DEFAULT 0,
  -- La semilla la genera el SERVIDOR, no el aparato del director: así el examen
  -- es idéntico para todas y nadie puede adivinarlo antes de que se abra.
  semilla    TEXT NOT NULL,
  huella     TEXT,
  abierta    INTEGER NOT NULL DEFAULT 1,
  creada_en  TEXT NOT NULL DEFAULT (datetime('now')),
  cerrada_en TEXT
);
CREATE INDEX IF NOT EXISTS ix_eval_abierta ON evaluacion(abierta, creada_en);

-- Un intento puede pertenecer a una evaluación. Índice único: cada participante
-- hace cada evaluación UNA vez, en el aparato que sea. Eso es lo que la versión
-- con links no podía garantizar.
ALTER TABLE intento ADD COLUMN evaluacion_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS ix_intento_eval
  ON intento(participante_id, evaluacion_id) WHERE evaluacion_id IS NOT NULL;
