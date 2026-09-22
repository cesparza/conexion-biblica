-- Conexión Bíblica — el progreso deja de ser del navegador.
-- Ejecutar UNA vez, después de 010.
--
-- POR QUÉ EXISTE ESTA TABLA
-- Hasta aquí, todo lo que la niña estudió (capítulos leídos, preguntas
-- falladas, cuándo vio cada tarjeta, sus exámenes, la racha y las insignias)
-- vivía solo en el localStorage del navegador donde estudió. Cambiar de
-- celular, limpiar el navegador o entrar desde el del papá era empezar de
-- cero, sin aviso y sin copia. El servidor ya sabía quién era ella —
-- `participante` con su código, `cuenta` y `sesion` — pero no sabía nada de
-- lo que había estudiado.
--
-- POR QUÉ UN JSON Y NO UNA COLUMNA POR CAMPO
-- La ficha se lee y se escribe ENTERA, por una sola dueña, y nada la consulta
-- por dentro: no hay ningún reporte que pregunte "¿quién leyó Daniel 7?". Una
-- columna por campo obligaría a una migración cada vez que la app guarde algo
-- nuevo, y hoy la ficha tiene catorce campos. Si algún día hay que consultar
-- por dentro, se agrega una columna derivada y se llena desde el JSON.
--
-- LA FUSIÓN NO VIVE AQUÍ, VIVE EN EL SERVIDOR (functions/api), y es una sola:
-- el aparato manda su ficha, el servidor la funde con la guardada y devuelve
-- el resultado. Así no hay dos implementaciones que se desincronicen.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS progreso (
  participante_id TEXT PRIMARY KEY REFERENCES participante(id),
  -- La ficha completa, ya fusionada. La escribe solo el endpoint /progreso.
  ficha           TEXT NOT NULL,
  -- Para saber si una ficha está viva sin tener que abrir el JSON.
  actualizado_en  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS ix_progreso_fecha ON progreso(actualizado_en);
