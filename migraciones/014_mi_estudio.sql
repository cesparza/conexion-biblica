-- Conexión Bíblica — «Mi estudio», la lista personal de temas (v236).
-- Ejecutar UNA vez, después de 013. Solo CREA una tabla nueva: no toca ninguna
-- fila ni columna de las que ya existen.
--
-- QUÉ GUARDA
-- La lista que cada persona arma con «Agregar a mi estudio»: llaves de tema
-- (`cap-d7`, `lam-d7`, `tema-apocalipsis`), cada una con el momento en que se
-- agregó o se quitó. El avance de cada tema NO va aquí: sale de lo que la app ya
-- guarda (`progreso`: leído, practicado, dominado).
--
-- DE QUIÉN
-- `dueno` es una llave opaca: 'p:' + participante.id (entró con su código),
-- 'd:' + cuenta.id (la clave del director) o 'j:' + un hash de la persona de la
-- app de Jóvenes (la puerta del módulo lo calcula; aquí no llega su id). Nadie
-- más que su dueño la lee ni la escribe (functions/api, /mi-estudio).
--
-- POR QUÉ UN JSON
-- Como `progreso`: se lee y se escribe entera, por una sola dueña, y la fusión
-- (la del aparato con la guardada) vive en un solo sitio, el servidor.

CREATE TABLE IF NOT EXISTS mi_estudio (
  dueno          TEXT PRIMARY KEY CHECK (length(dueno) BETWEEN 3 AND 80),
  lista          TEXT NOT NULL CHECK (json_valid(lista) AND length(lista) <= 32000),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);
