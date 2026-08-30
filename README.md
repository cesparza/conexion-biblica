# Conexión Bíblica

App de **preparación** para el Club de Aventureros de la Iglesia Adventista
Tierra Linda. No es la app del campamento: sirve para estudiar durante las siete
semanas previas y para que el director mida el avance con una evaluación el día
que él escoja.

Publicada en `conexion-biblica.pages.dev` (Cloudflare Pages, cuenta personal).
El repositorio es **público**: nada sensible puede vivir aquí.

---

## Cómo se trabaja

```bash
# editar SIEMPRE en fuente/, nunca index.html
node fuente/build.js            # regenera index.html

node tests/test.js              # 114 pruebas de coherencia
node tests/uso.js               # recorrido de uso
CB_CLAVE='la clave' node tests/simulacro.js   # la evaluación y el perfil director
node tests/api.js               # invariantes del servidor
node tests/api.js --vivo        # además, contra el sitio publicado

node tools/cobertura.js --detalle   # qué versículos quedan sin pregunta
node tools/niveles.js               # reparto por nivel
node tools/hash-clave.js --escribir # cambiar la clave del director
```

`index.html` se genera: **no se edita a mano**. El hook de `tools/pre-commit`
bloquea líneas de más de 2.000 caracteres (`git config core.hooksPath tools`).

## Las dos mitades

| | Dónde | Qué hace |
|---|---|---|
| **La app** | `index.html`, un solo archivo | Estudiar, tarjetas, exámenes de práctica, manual. Funciona **sin señal** |
| **El servidor** | `functions/api/[[ruta]].js` + D1 | Quién es cada participante, la evaluación del día, las notas |

La app sigue funcionando completa sin servidor: lo único que necesita red es la
evaluación. Estudiar, las tarjetas y el manual nunca preguntan nada.

## La decisión de diseño que hay que recordar

**`iniciar()` es la cerradura y es síncrona.** Decide con lo que ya sabe, y por
eso las pruebas corren sin red. **`arrancaExamen()` es lo que llaman los
botones**: pregunta al servidor y después llama a `iniciar()`.

Hacer `iniciar()` async rompió las pruebas (top-level await en un archivo
CommonJS) y fue el camino equivocado. Si alguien lo intenta otra vez, que sepa
que ya se probó.

## Precedencia del estado

1. **Servidor** (`/api/estado` y `/api/evaluacion`), cacheado en `cb-srv`.
2. **Lo último que dijo el servidor**, si ahora no contesta.
3. **Abierto**, si nunca contestó.

**Sin señal se falla CERRADO**: si lo último que se supo fue «hay evaluación»,
la práctica sigue cerrada. Nunca se abre por accidente.

## Modelo de datos

| Tabla | Para qué | Lo que hay que saber |
|---|---|---|
| `participante` | Quién estudia | **Solo nombre de pila y categoría.** Sin apellido, edad exacta, teléfono ni foto. Es una decisión, no un olvido: son niñas de 4 a 9 años |
| `cuenta` / `sesion` | Entrar | Códigos de 6 caracteres (60 días) y la clave del director (30 días). Cookie HttpOnly |
| `evaluacion` | El examen del día | La **semilla la genera el servidor**. `categorias` dice a quién le toca, o `*` |
| `intento` | Las notas | Índice único `(participante, evaluacion)`: una vez por persona, en el aparato que sea |
| `auditoria` | Rastro | Obligatoria porque hay datos de menores. Se purga sola a los 180 días |
| `ajuste` | Heredada | Ya no se usa. Quedó de la versión con dos interruptores |

Las **seis categorías** son `me`, `av`, `pa`, `gm` (Conexión Bíblica) y `dm1`,
`dm2` (Devoción Matutina). La categoría del participante la manda el servidor y
la ficha local se alinea con ella.

## Endpoints

| Ruta | Quién | Qué |
|---|---|---|
| `GET /api/estado` | Cualquiera | Si la práctica está abierta y si hay evaluación. **Sin la semilla** |
| `POST /api/entrar` | Cualquiera | Canjea el código por una sesión |
| `POST /api/panel/entrar` | Cualquiera | La clave del director |
| `GET /api/evaluacion` | Participante | La receta, **solo si le toca por categoría** |
| `POST /api/intento` | Participante | Registra la nota |
| `POST /api/panel/evaluacion` | Director | Abre una, cerrando cualquier otra |
| `POST /api/panel/evaluacion/cerrar` | Director | La cierra |
| `GET /api/panel/evaluacion` | Director | Quién la hizo y **quién falta** |
| `GET/POST /api/panel/participantes` | Director | Lista y alta con código |

La guarda de `/panel/` está **antes** de todos sus handlers menos `entrar`, y
`tests/api.js` falla si alguien agrega uno más arriba.

## Despliegue

Cloudflare Pages, framework **None**, build vacío, output `/`, rama `main`. Push
a `main` despliega. Los bindings los manda `wrangler.toml`, no el dashboard.

```bash
npx wrangler d1 execute conexion-biblica --remote --file=migraciones/00X_....sql
npx wrangler pages secret put CLAVE_PANEL --project-name conexion-biblica
npx wrangler pages secret put SAL_IP --project-name conexion-biblica
```

**Regla de las migraciones:** los `ALTER`/`CREATE` se corren una vez; los
`INSERT OR REPLACE`, las veces que sea. Nunca mezclar estructura y datos.

## Síntoma → causa → salida

| Síntoma | Causa | Salida |
|---|---|---|
| La evaluación no le sale a una niña | No entró con su código, o su categoría no está marcada | Que entre con el código; revisar las casillas al abrirla |
| Todas ven la práctica cerrada y la evaluación era de un solo grupo | Caché viejo del navegador | Recargar. `/api/estado` solo cierra a todas si la evaluación es para todas |
| «Esa evaluación ya la hiciste» y no la hizo | Otra participante usó ese código | Un código por persona, nunca compartido |
| El panel responde 401 | La sesión de director venció (30 días) | Volver a entrar con la clave |
| `/api/estado` da error 500 | Falta el binding D1 o la migración | Revisar `wrangler.toml` y correr las migraciones |
| Las notas no llegan al panel | El celular no tenía señal al entregar | La nota queda en cola y sube sola al abrir la app |
| SmartGit falla después de que Claude tocó el repo | `.lock` y `tmp_obj_*` que el puente no puede borrar | `rm -f .git/*.lock; find .git -name 'tmp_obj_*' -delete` |

## Lo que la app NO hace, a propósito

- **No califica en el servidor.** El examen corre en el navegador para poder
  estudiar sin señal, así que las respuestas correctas viajan en el HTML. El
  servidor valida la forma de la nota (que no supere el total, que el número de
  preguntas sea el de la evaluación) pero no puede recalificar. Para niñas de 4
  a 9 años alcanza; si algún día las notas deciden algo, toca calificar en el
  servidor.
- **No guarda datos de menores más allá del nombre de pila y la categoría.**
- **No sincroniza el progreso de estudio entre aparatos.** Las notas sí siguen a
  la participante; lo leído y las tarjetas viven en cada navegador.
