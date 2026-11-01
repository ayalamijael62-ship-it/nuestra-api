
function EstadoCarga({ cargando, error, vacio, mensajeVacio }) {
  if (cargando) {
    return <p role="status">Cargando información...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (vacio) {
    return <p>{mensajeVacio || 'No hay resultados disponibles.'}</p>;
  }

  return null;
}

export default EstadoCarga;
