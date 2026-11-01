
function Buscador({ busqueda, setBusqueda, alBuscar, cargando }) {
  return (
    <section className="buscador">
      <h2>¿Qué querés ver hoy?</h2>

      <form onSubmit={alBuscar}>
        <input
          type="search"
          placeholder="Buscar películas o series..."
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          aria-label="Buscar películas o series"
        />

        <button type="submit" disabled={cargando}>
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </section>
  );
}

export default Buscador;
