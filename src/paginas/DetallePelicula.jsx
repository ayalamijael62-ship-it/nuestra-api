
import { useParams, useNavigate } from 'react-router';

import { crearUrlDetalle } from '../api/omdb';
import useFetch from '../hooks/useFetch';
import { useFavoritosContext } from '../contexto/FavoritosContext';

function DetallePelicula() {
  const { id } = useParams();
  const navegar = useNavigate();

  const {
    agregarFavorito,
    quitarFavorito,
    esFavorito,
  } = useFavoritosContext();

  const url = crearUrlDetalle(id);

  const {
    datos: pelicula,
    cargando,
    error,
  } = useFetch(url);

  const favorita = esFavorito(id);

  function manejarFavorito() {
    if (favorita) {
      quitarFavorito(id);
    } else if (pelicula) {
      agregarFavorito({
        imdbID: pelicula.imdbID,
        Title: pelicula.Title,
        Year: pelicula.Year,
        Poster: pelicula.Poster,
        Type: pelicula.Type,
      });
    }
  }

  if (cargando) {
    return (
      <main className="app">
        <p role="status">Cargando detalles...</p>
      </main>
    );
  }

  if (error || !pelicula || pelicula.Response === 'False') {
    return (
      <main className="app">
        <p role="alert">
          {error || 'No encontramos esa película.'}
        </p>
        <button onClick={() => navegar(-1)}>Volver</button>
      </main>
    );
  }

  return (
    <main className="app">
      <button onClick={() => navegar(-1)}>← Volver</button>

      <section className="detalle-pelicula">
        <img
          src={
            pelicula.Poster !== 'N/A'
              ? pelicula.Poster
              : 'https://placehold.co/300x450?text=Sin+poster'
          }
          alt={`Póster de ${pelicula.Title}`}
        />

        <div>
          <h1>{pelicula.Title}</h1>
          <p><strong>Año:</strong> {pelicula.Year}</p>
          <p><strong>Género:</strong> {pelicula.Genre}</p>
          <p><strong>Duración:</strong> {pelicula.Runtime}</p>
          <p><strong>Director:</strong> {pelicula.Director}</p>
          <p><strong>Actores:</strong> {pelicula.Actors}</p>
          <p><strong>Sinopsis:</strong> {pelicula.Plot}</p>
          <p><strong>Calificación IMDb:</strong> {pelicula.imdbRating}</p>

          <button
            type="button"
            onClick={manejarFavorito}
            aria-pressed={favorita}
          >
            {favorita
              ? '♥ Quitar de favoritos'
              : '♡ Agregar a favoritos'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default DetallePelicula;
