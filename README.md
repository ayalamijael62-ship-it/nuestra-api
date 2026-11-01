# 🎬 Vivi Show

Vivi Show es un proyecto grupal hecho con React donde se pueden buscar películas y series, ver información de cada una y guardarlas en favoritos.

## 👥 Integrantes

Este proyecto fue realizado por:

- MIJAEL AYALA
- LEANDRO CEBALLOS

## 🛠️ Tecnologías que usamos

- React
- Vite
- JavaScript
- CSS
- React Router
- API de OMDb
- localStorage

## ✨ ¿Qué se puede hacer?

En nuestra aplicación se puede:

- Buscar películas y series.
- Ver los resultados de la búsqueda.
- Entrar a los detalles de una película o serie.
- Filtrar por tipo.
- Filtrar por año.
- Cambiar de página para ver más resultados.
- Agregar películas a favoritos.
- Quitar películas de favoritos.
- Mantener los favoritos guardados aunque se recargue la página.
- Navegar entre Inicio, Detalles y Favoritos.

## 📁 Organización

El proyecto está organizado en diferentes carpetas:

```text
src/
├── api/
├── componentes/
├── contexto/
├── hooks/
├── paginas/
├── rutas/
├── App.jsx
└── main.jsx
```

También usamos componentes reutilizables para no repetir tanto código, por ejemplo:

- Encabezado
- Buscador
- Tarjeta de película
- Filtros
- Paginación

## ⚙️ Cómo instalar el proyecto

Primero hay que instalar las dependencias:

```bash
npm install
```

Después hay que crear un archivo `.env` usando como ejemplo el archivo `.env.ejemplo`.

Ejemplo:

```env
VITE_API_URL=https://www.omdbapi.com
VITE_API_KEY=TU_API_KEY
VITE_TITULO=Vivi Show
```

## ▶ Cómo ejecutar el proyecto

Para iniciar el proyecto usamos:

```bash
npm run dev
```

Después abrimos en el navegador el enlace que aparece en la terminal.

##  Algunas cosas que usamos

Para el proyecto usamos React Router para movernos entre las diferentes páginas.

También creamos hooks para separar parte de la lógica del código y usamos Context para compartir los favoritos entre las páginas.

Los favoritos se guardan usando `localStorage`, así que no desaparecen cuando se recarga la página.


