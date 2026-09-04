# JOTAC - Centro Académico y Plataforma Web

JOTAC es una plataforma web para la gestión de un centro académico. Permite a los estudiantes consultar cursos, recursos bibliográficos y gestionar solicitudes de inscripción, mientras que los administradores pueden supervisar y gestionar dichos trámites.

## Tecnologías

- Next.js 14 (App Router)
- TypeScript / JavaScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- Git & GitHub
- Vercel

## Capturas de pantalla

![Página principal](./public/screenshots/home.png)

![Autenticación](./public/screenshots/auth.png)

![Panel de estudiante](./public/screenshots/dashboard.png)

## Roles de usuario

### Estudiante

- Registro e inicio de sesión.
- Consulta de cursos y recursos.
- Creación y seguimiento de solicitudes.

### Administrador

- Acceso al panel `/admin`.
- Visualización de solicitudes.
- Actualización de estados.
- Eliminación de solicitudes.

## Rutas principales

- `/` - Página principal.
- `/login` - Inicio de sesión.
- `/register` - Registro.
- `/dashboard` - Panel del estudiante.
- `/admin` - Panel administrativo.
- `/solicitud/[id]` - Detalle de una solicitud.

## Base de datos

La aplicación utiliza PostgreSQL mediante Supabase.

La tabla `solicitudes` contiene:

- `id` - Identificador único.
- `nombre` - Nombre de la solicitud.
- `descripcion` - Descripción.
- `estado` - Pendiente, En proceso o Completado.
- `created_at` - Fecha de creación.
- `user_id` - Usuario relacionado.

## Funcionalidades

- [x] Autenticación con Supabase Auth.
- [x] Control de acceso basado en roles (RBAC).
- [x] Protección de rutas privadas.
- [x] Dashboard de estudiantes.
- [x] Panel administrativo.
- [x] Operaciones CRUD.
- [x] Consulta de cursos y recursos bibliográficos.
- [x] Ruta dinámica de solicitudes.
- [x] Diseño responsive.
- [x] Despliegue en Vercel.

## Instalación

Clonar el repositorio:

    git clone https://github.com/joeliga/jotace-app.git

Acceder al proyecto:

    cd jotace-app

Instalar las dependencias:

    npm install

Ejecutar el proyecto:

    npm run dev

Crear un archivo `.env.local` en la raíz del proyecto:

    NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_de_supabase

Abrir en el navegador:

    http://localhost:3000

## Autor

**Joel Coro**

GitHub: https://github.com/joeliga

Repositorio: https://github.com/joeliga/jotace-app