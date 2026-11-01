
import { Link } from 'react-router';
import { useFavoritosContext } from '../contexto/FavoritosContext';

function Favoritos() {
  const { favoritos, quitarFavorito } = useFavoritosContext();

  return (
    <main className="app">
      <header className="encabezado">
        <h1>Mis <span>Favoritos</span></h1>
        <p>Tu colección de películas y series favoritas.</p>
      </header>

      <Link to="/">← Volver al inicio</Link>

      {favoritos.length === 0 ? (
        <p>Todavía no agregaste favoritos.</p>
      ) : (
        <section className="grilla-peliculas">
          {favoritos.map((pelicula) => (
            <article
              className="tarjeta-pelicula"
              key={pelicula.imdbID}
            >
              <img
                src={
                  pelicula.Poster !== 'N/A'
                    ? pelicula.Poster
                    : 'https://placehold.co/300x450?text=Sin+poster'
                }
                alt={`Póster de ${pelicula.Title}`}
              />

              <h3>{pelicula.Title}</h3>
              <p>{pelicula.Year}</p>

              <button
                type="button"
                onClick={() => quitarFavorito(pelicula.imdbID)}
              >
                Quitar de favoritos
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Favoritos;
