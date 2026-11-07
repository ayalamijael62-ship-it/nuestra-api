# 🎬 Vivi Show

Vivi Show es un proyecto grupal desarrollado con React que permite buscar películas y series, consultar información detallada, crear una cuenta y guardar películas favoritas en la nube.

## 👥 Integrantes

Este proyecto fue realizado por:

- MIJAEL AYALA
- LEANDRO CEBALLOS

## 🛠️ Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- React Router
- API de OMDb
- Supabase (autenticación, base de datos y Realtime)
- Web Speech API (búsqueda por voz)

## ✨ ¿Qué se puede hacer?

En nuestra aplicación se puede:

- Buscar películas y series por título.
- Realizar búsquedas mediante el micrófono.
- Ver los resultados de búsqueda.
- Consultar los detalles de una película o serie.
- Filtrar resultados por tipo.
- Filtrar resultados por año.
- Cambiar de página para consultar más resultados.
- Registrarse e iniciar sesión con una cuenta.
- Cerrar sesión y mantener la sesión al recargar la página.
- Agregar películas a favoritos.
- Quitar películas de favoritos.
- Guardar los favoritos en una base de datos en la nube.
- Mantener los favoritos asociados a cada usuario.
- Sincronizar los cambios en favoritos en tiempo real, sin necesidad de recargar la página.
- Navegar entre Inicio, Detalles, Favoritos, Inicio de sesión y Registro.

## 🔐 Autenticación y almacenamiento

Utilizamos **Supabase** para gestionar las cuentas de usuario y almacenar los favoritos.

Cada usuario puede consultar, agregar y eliminar únicamente sus propios favoritos. Para garantizarlo, implementamos políticas de seguridad mediante Row Level Security (RLS) en la base de datos.

```sql
    ALTER TABLE public."Favoritos"
    ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Usuarios pueden ver sus favoritos"
    ON public."Favoritos"
    FOR SELECT
    TO authenticated
    USING (
    auth.uid() = user_id
    );

    CREATE POLICY "Usuarios pueden agregar sus favoritos"
    ON public."Favoritos"
    FOR INSERT
    TO authenticated
    WITH CHECK (
    auth.uid() = user_id
    );

    CREATE POLICY "Usuarios pueden eliminar sus favoritos"
    ON public."Favoritos"
    FOR DELETE
    TO authenticated
    USING (
    auth.uid() = user_id
    );
```

Además, utilizamos **Supabase Realtime** para detectar los cambios en la tabla de favoritos y actualizar automáticamente la información en las sesiones correspondientes.

## 🎙️ Búsqueda por voz

Incorporamos la Web Speech API para permitir que los usuarios realicen búsquedas utilizando el micrófono de su dispositivo.

La aplicación utiliza el reconocimiento de voz en español (`es-AR`) para convertir el audio en texto y ejecutar la búsqueda correspondiente.

(Nota: Esta función no es compatible con firefox o brave, solo edge o chrome)

## ⚙️ Cómo instalar el proyecto

1. clonar el repositorio:

```bash
git clone https://github.com/ayalamijael62-ship-it/nuestra-api
```

2. ir a la carpeta del proyecto:

```bash
cd vivi-show
```

3. Instalar dependencias:

```bash
npm install
```

Después, hay que crear un archivo `.env` en la raíz del proyecto, utilizando como referencia `.env.ejemplo` con tus datos.

env de ejemplo:

```env
VITE_API_URL=https://www.omdbapi.com
VITE_API_KEY=TU_API_KEY
VITE_TITULO=Vivi Show

VITE_SUPABASE_URL=TU_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=TU_SUPABASE_PUBLISHABLE_KEY
```

Es necesario contar con:

- Una API Key de OMDb.
- Un proyecto de Supabase configurado con la tabla de favoritos, autenticación y políticas RLS.

## ▶️ Cómo ejecutar el proyecto

```bash
npm run dev
```

## 📚 Algunas cosas que utilizamos

Utilizamos **React Router** para navegar entre las diferentes páginas de la aplicación.

Creamos hooks personalizados para separar parte de la lógica del código y utilizamos **Context** para compartir los datos de autenticación y favoritos entre los componentes.

**Supabase** nos permite gestionar los usuarios y almacenar los favoritos en una base de datos, mientras que Realtime permite sincronizar los cambios automáticamente.

Por último, incorporamos la **Web Speech API** para ofrecer una alternativa de búsqueda mediante comandos de voz.


