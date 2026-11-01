
function Paginacion({
  paginaActual,
  totalPaginas,
  cambiarPagina,
}) {
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <nav className="paginacion" aria-label="Paginación">
      <button
        type="button"
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        ← Anterior
      </button>

      <span>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente →
      </button>
    </nav>
  );
}

export default Paginacion;
