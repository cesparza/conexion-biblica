-- Retired questions, without touching the artifact.
-- Run ONCE, after 009.
--
-- WHY
-- The bank is 1,378 questions living inside index.html, and that file is
-- GENERATED: pulling one out means editing the generator, running build.js and
-- deploying. That cannot be done from a phone on a Saturday morning, which is
-- exactly when the director is reading them and spots a bad one. So the
-- retirement moves to the one place writable from a phone: a row in D1.
--
-- WHY A LOG OF FACTS AND NOT A FLAG
-- Every retire and every restore is a ROW. A question's current state is its
-- last row. One shape gives three things:
--   . reversible, restoring is another row and never a DELETE;
--   . who, when and why stay on record;
--   . the bank can be asked how it stood ON A DATE, which is what keeps an
--     already open evaluation identical. Without it, two participants in the
--     same category would build different exams from the same seed.
--
-- WHY THE KEY AND NOT AN id
-- Same key as migration 008: chapter + hash of the wording. It does not depend
-- on the order or the size of the bank, so it still points at the same
-- question next year. The server does NOT know the bank (it lives in the
-- HTML), so it validates the SHAPE of the key, never its existence, which is
-- the same contract already governing `alcance`.
CREATE TABLE IF NOT EXISTS pregunta_retirada (
  clave  TEXT NOT NULL,
  accion TEXT NOT NULL CHECK (accion IN ('retirar','restaurar')),
  quien  TEXT,
  motivo TEXT,
  cuando TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The index backs the only two queries there are: current state of all, and
-- state as of a date. Both look for the last row PER KEY.
CREATE INDEX IF NOT EXISTS ix_retirada_clave ON pregunta_retirada(clave, cuando);
