-- ═══════════════════════════════════════════════════════════════
-- Conexión Bíblica — esquema de Supabase
-- Pegar completo en: Supabase → SQL Editor → New query → Run
-- Corre de una sola vez. Es idempotente: se puede volver a correr.
-- ═══════════════════════════════════════════════════════════════

-- ── 1. TABLA DE RESULTADOS ────────────────────────────────────
-- Un registro por examen entregado. Nunca se edita ni se borra.
create table if not exists public.resultados (
  id          bigint generated always as identity primary key,
  alumno_id   uuid        not null,
  nombre      text        not null check (char_length(nombre) between 1 and 60),
  puntaje     smallint    not null check (puntaje between 0 and 15),
  porcentaje  smallint    not null check (porcentaje between 0 and 100),
  creado      timestamptz not null default now()
);

create index if not exists resultados_puntaje_idx on public.resultados (puntaje desc);
create index if not exists resultados_alumno_idx  on public.resultados (alumno_id);

-- ── 2. TABLA DE PROGRESO ──────────────────────────────────────
-- Una fila por alumno. Se sobrescribe (upsert) cada vez que avanza.
create table if not exists public.progreso (
  alumno_id    uuid        primary key,
  nombre       text        not null check (char_length(nombre) between 1 and 60),
  capitulos    jsonb       not null default '{}'::jsonb,
  racha        smallint    not null default 0 check (racha between 0 and 999),
  actualizado  timestamptz not null default now()
);

-- ── 3. VISTA DEL RANKING ──────────────────────────────────────
-- El mejor puntaje de cada alumno, no todos sus intentos.
-- La app lee de aquí, no de resultados directamente.
create or replace view public.ranking as
select
  nombre,
  max(puntaje)  as puntaje,
  count(*)      as intentos,
  max(creado)   as ultimo
from public.resultados
group by nombre
order by max(puntaje) desc, max(creado) asc;

-- ── 4. RLS: ESTO ES LO QUE PROTEGE LOS DATOS ──────────────────
-- La anon key es pública. Sin estas políticas, cualquiera con la
-- key podría borrar la tabla completa. Con ellas, solo puede
-- insertar y leer. No hay política de UPDATE ni de DELETE, así
-- que esas operaciones quedan denegadas por omisión.

alter table public.resultados enable row level security;
alter table public.progreso   enable row level security;

-- resultados: cualquiera puede insertar su examen y leer el ranking.
drop policy if exists "insertar resultado" on public.resultados;
create policy "insertar resultado"
  on public.resultados for insert
  to anon
  with check (true);

drop policy if exists "leer resultados" on public.resultados;
create policy "leer resultados"
  on public.resultados for select
  to anon
  using (true);

-- progreso: insertar y actualizar (para el upsert), y leer.
drop policy if exists "insertar progreso" on public.progreso;
create policy "insertar progreso"
  on public.progreso for insert
  to anon
  with check (true);

drop policy if exists "actualizar progreso" on public.progreso;
create policy "actualizar progreso"
  on public.progreso for update
  to anon
  using (true)
  with check (true);

drop policy if exists "leer progreso" on public.progreso;
create policy "leer progreso"
  on public.progreso for select
  to anon
  using (true);

-- ── 5. PERMISOS SOBRE LA VISTA ────────────────────────────────
grant select on public.ranking to anon;

-- ═══════════════════════════════════════════════════════════════
-- VERIFICACIÓN — correr después y revisar que devuelva filas
-- ═══════════════════════════════════════════════════════════════
-- select * from pg_policies where schemaname = 'public';
