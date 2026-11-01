
import { useState } from 'react';
import { buscarPeliculas } from '../api/omdb';

export function usePeliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [totalResultados, setTotalResultados] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  async function buscar(termino, pagina = 1) {
    const texto = termino.trim();

    if (!texto) {
      setPeliculas([]);
      setTotalResultados(0);
      setError('Escribí el nombre de una película o serie.');
      setBusquedaRealizada(true);
      return;
    }

    setCargando(true);
    setError('');
    setBusquedaRealizada(true);

    try {
      const datos = await buscarPeliculas(texto, pagina);

      setPeliculas(datos.Search || []);
      setTotalResultados(Number(datos.totalResults) || 0);

      if (datos.Response === 'False') {
        setError('No encontramos resultados para esa búsqueda.');
      }
    } catch {
      setPeliculas([]);
      setTotalResultados(0);
      setError('Ocurrió un error al buscar. Intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  }

  return {
    peliculas,
    totalResultados,
    cargando,
    error,
    busquedaRealizada,
    buscar,
  };
}
