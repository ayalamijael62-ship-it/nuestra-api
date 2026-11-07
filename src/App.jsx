
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { usePeliculas } from './hooks/usePeliculas';

import TarjetaPelicula from './componentes/TarjetaPelicula';
import EstadoCarga from './componentes/EstadoCarga';
import Buscador from './componentes/Buscador';
import Paginacion from './componentes/Paginacion';
import Filtros from './componentes/Filtros';

import './App.css';

function App() {
  const navegar = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [busqueda, setBusqueda] = useState(
    searchParams.get('q') || ''
  );

  const [filtro, setFiltro] = useState(
    searchParams.get('tipo') || 'todos'
  );

  const [anio, setAnio] = useState(
    searchParams.get('anio') || 'todos'
  );

  const [pagina, setPagina] = useState(
    Math.max(1, Number(searchParams.get('pagina')) || 1)
  );

  const {
    peliculas,
    totalResultados,
    cargando,
    error,
    busquedaRealizada,
    buscar,
  } = usePeliculas();

  const POR_PAGINA = 10;

  useEffect(() => {
    const termino = searchParams.get('q');

    if (termino) {
      buscar(termino, pagina);
    }
  }, []);

  useEffect(() => {
    const nuevosParametros = new URLSearchParams();

    if (busqueda.trim()) nuevosParametros.set('q', busqueda.trim());
    if (filtro !== 'todos') nuevosParametros.set('tipo', filtro);
    if (anio !== 'todos') nuevosParametros.set('anio', anio);
    if (pagina > 1) nuevosParametros.set('pagina', String(pagina));

    setSearchParams(nuevosParametros, { replace: true });
  }, [busqueda, filtro, anio, pagina, setSearchParams]);

    function manejarBusqueda(evento, termino = busqueda) {
    evento?.preventDefault();

    setBusqueda(termino);
    setPagina(1);
    buscar(termino, 1);
  }

  function cambiarPagina(nuevaPagina) {
    setPagina(nuevaPagina);
    buscar(busqueda, nuevaPagina);
  }

  function cambiarFiltro(nuevoFiltro) {
    setFiltro(nuevoFiltro);
    setPagina(1);
  }

  function cambiarAnio(nuevoAnio) {
    setAnio(nuevoAnio);
    setPagina(1);
  }

  function abrirDetalle(id) {
    navegar(`/pelicula/${id}`);
  }

  const aniosDisponibles = useMemo(() => {
    return [...new Set(
      peliculas
        .map((pelicula) => pelicula.Year?.match(/\d{4}/)?.[0])
        .filter(Boolean)
    )].sort((a, b) => Number(b) - Number(a));
  }, [peliculas]);

  const peliculasFiltradas = useMemo(() => {
    return peliculas.filter((pelicula) => {
      const coincideTipo =
        filtro === 'todos' || pelicula.Type === filtro;

      const anioPelicula = pelicula.Year?.match(/\d{4}/)?.[0];

      const coincideAnio =
        anio === 'todos' || anioPelicula === anio;

      return coincideTipo && coincideAnio;
    });
  }, [peliculas, filtro, anio]);

  const totalPaginas = Math.ceil(totalResultados / POR_PAGINA);

  return (
    <main className="app">
      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        alBuscar={manejarBusqueda}
        cargando={cargando}
      />

      <section className="resultados" aria-live="polite">
        <h2>
          {busquedaRealizada
            ? 'Resultados'
            : 'Explorá tu entretenimiento'}
        </h2>

        <EstadoCarga
          cargando={cargando}
          error={error}
          vacio={
            busquedaRealizada &&
            !cargando &&
            !error &&
            peliculas.length === 0
          }
          mensajeVacio="No encontramos resultados para tu búsqueda."
        />

        {!cargando && !error && !busquedaRealizada && (
          <p>Buscá tus títulos favoritos y descubrí nuevas historias.</p>
        )}

        {!cargando && !error && peliculas.length > 0 && (
          <>
            <Filtros
              filtro={filtro}
              cambiarFiltro={cambiarFiltro}
              anio={anio}
              cambiarAnio={cambiarAnio}
              aniosDisponibles={aniosDisponibles}
            />

            {peliculasFiltradas.length === 0 ? (
              <p>No hay resultados con esos filtros.</p>
            ) : (
              <div className="grilla-peliculas">
                {peliculasFiltradas.map((pelicula) => (
                  <TarjetaPelicula
                    key={pelicula.imdbID}
                    pelicula={pelicula}
                    alVerDetalle={abrirDetalle}
                  />
                ))}
              </div>
            )}

            <Paginacion
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              cambiarPagina={cambiarPagina}
            />

            <p>
              Se encontraron {totalResultados} resultados.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
