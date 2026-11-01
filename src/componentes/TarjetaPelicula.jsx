
function TarjetaPelicula({ pelicula, alVerDetalle }) {
  return (
    <article className="tarjeta-pelicula">
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

      <p>
        {pelicula.Type === 'series' ? 'Serie' : 'Película'}
      </p>

      <button
        type="button"
        onClick={() => alVerDetalle(pelicula.imdbID)}
        aria-label={`Ver detalles de ${pelicula.Title}`}
      >
        Ver detalles
      </button>
    </article>
  );
}

export default TarjetaPelicula;
