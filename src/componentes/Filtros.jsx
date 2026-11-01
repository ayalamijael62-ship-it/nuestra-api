
function Filtros({
  filtro,
  cambiarFiltro,
  anio,
  cambiarAnio,
  aniosDisponibles,
}) {
  return (
    <section className="filtros" aria-label="Filtros de búsqueda">
      <div>
        <p>Tipo de contenido</p>

        <button
          type="button"
          onClick={() => cambiarFiltro('todos')}
          aria-pressed={filtro === 'todos'}
        >
          Todas
        </button>

        <button
          type="button"
          onClick={() => cambiarFiltro('movie')}
          aria-pressed={filtro === 'movie'}
        >
          Películas
        </button>

        <button
          type="button"
          onClick={() => cambiarFiltro('series')}
          aria-pressed={filtro === 'series'}
        >
          Series
        </button>
      </div>

      <div>
        <label htmlFor="filtro-anio">Filtrar por año</label>

        <select
          id="filtro-anio"
          value={anio}
          onChange={(evento) => cambiarAnio(evento.target.value)}
        >
          <option value="todos">Todos los años</option>

          {aniosDisponibles.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default Filtros;
