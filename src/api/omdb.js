

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function buscarPeliculas(termino, pagina = 1) {
  const url = `${API_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(termino)}&page=${pagina}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error('Error al buscar películas');
  }

  const datos = await respuesta.json();

  if (datos.Response === 'False') {
    return {
      Search: [],
      totalResults: '0',
      Response: 'False',
    };
  }

  return datos;
}

export function crearUrlDetalle(id) {
  return `${API_URL}/?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`;
}
