
# Sitio Leandro Pagura

Revisé el repo de GitHub (`arik-0/Pagina-lp`) — es solo el template inicial de Astro sin código de diseño todavía, así que construyo desde cero en este proyecto TanStack Start.

## Backend

Habilito **Lovable Cloud**, que provisiona un proyecto Supabase real y lo conecta al app (base de datos Postgres + Auth + Storage). Es Supabase por debajo, sin setup manual.

## Estructura de rutas

- `/` — Landing one-page scrolleable con todas las secciones + nav sticky con scroll suave
- `/cursos` — Landing pública de la plataforma (listado de cursos, "Próximamente" para los que aún no están, CTA de login)
- `/cursos/$slug` — Detalle de curso con lecciones
- `/cursos/$slug/$leccion` — Player de video (requiere login)
- `/auth` — Login / signup (email+password + Google)
- `/mi-cuenta` — Área del alumno: cursos inscriptos + progreso
- `/admin` — Panel para Leandro (protegido por rol `admin`): gestión de cursos, lecciones, videos, portadas, publicar/despublicar

## Secciones de la home (`/`)

Nav sticky con: Home · Cursos · Bio · Música · Media · Proyectos · Setup · Shows · Contacto

1. **Hero** — Foto de fondo a pantalla completa, nombre "LEANDRO PAGURA", subtítulo "Bajista, sesionista y educador"
2. **Cursos (teaser)** — Card "Próximamente: Plataforma de Cursos" con CTA → `/cursos`
3. **Bio** — Foto lateral + dos párrafos (carrera + enfoque como educador)
4. **Música** — Grid de embeds (Spotify + YouTube)
5. **Media** — Galería de fotos (en vivo, estudio, cuarteto)
6. **Proyectos** — Card destacada del "Leandro Pagura Cuarteto" con CTA "Escuchar material"
7. **Setup** — Procesamiento / Instrumentos / Amplificación con foto del gear
8. **Shows** — Lista de próximos shows (fecha, título, lugar, link a tickets)
9. **Contacto** — Email + Instagram / YouTube / Spotify

Fotos de fondo en estratégico: Hero, Bio, Setup y Shows (con overlay oscuro para legibilidad). Resto sobre fondo sólido.

## Estilo visual

Moderno, elegante, oscuro por defecto (encaja con la vibra de bajista de jazz/funk). Display sans fuerte para nombres/títulos, sans neutra para cuerpo. Accent cálido (ámbar/cobre) que remite al bajo. Bordes sutiles, mucho espacio, fotos que respiran.

Como no estás 100% seguro del diseño, hago una primera versión completa con este criterio. Si después querés explorar variantes, te genero 3 propuestas renderizadas para elegir.

## Plataforma de cursos — datos

Tablas en Lovable Cloud (Supabase):

- `profiles` — datos del usuario (nombre, avatar)
- `user_roles` — roles (`admin`, `student`) en tabla separada por seguridad
- `courses` — id, slug, título, descripción, imagen de portada, precio (0 = gratis), publicado, orden
- `lessons` — id, course_id, título, descripción, video_path, duración, orden, publicado
- `enrollments` — user_id, course_id, fecha de inscripción
- `lesson_progress` — user_id, lesson_id, completado, timestamp

RLS: alumnos ven solo cursos publicados y sus propias inscripciones/progreso; admin ve y edita todo.

**Sin pagos en esta versión** — cursos marcados como gratis o inscripciones manuales desde el admin. Cuando quieras vender, agregamos Stripe.

## Panel admin (`/admin`)

- Lista de cursos con crear/editar/eliminar/publicar
- Editor de curso: metadatos + subida de portada
- Gestión de lecciones dentro de cada curso: crear, reordenar, subir video, publicar
- Lista de alumnos y capacidad de inscribir manualmente

Para que vos seas el primer admin, después del primer signup te asigno el rol `admin` con un insert directo.

## Detalles técnicos

- TanStack Start + TanStack Router + TanStack Query
- Tailwind v4 con design tokens en `src/styles.css`
- shadcn/ui para componentes base
- Lovable Cloud (Supabase) para DB + Auth (email/password + Google) + Storage
- Videos e imágenes en Storage privado; acceso vía server functions que verifican inscripción
- SEO: `head()` por ruta con og:title/description/image

## Contenido / assets

- Textos: los que pasaste, tal cual
- Fotos: genero placeholders de calidad (retrato, bajo, en vivo, estudio) — después los reemplazás por tus fotos reales

## Orden de ejecución

1. Habilitar Lovable Cloud + schema (tablas, RLS, roles, storage buckets)
2. Auth (email/password + Google) + layout `_authenticated` + rol admin
3. Home one-page con todas las secciones y contenido
4. `/cursos` pública + detalle de curso
5. Player de lecciones (protegido)
6. Panel `/admin`
7. Pulido visual, SEO, favicon

¿Le damos así?
