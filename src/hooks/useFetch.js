
import { useEffect, useState } from 'react';

function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) return;

    const controlador = new AbortController();

    async function obtenerDatos() {
      setCargando(true);
      setError('');

      try {
        const respuesta = await fetch(url, {
          signal: controlador.signal,
        });

        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos.');
        }

        const resultado = await respuesta.json();
        setDatos(resultado);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    obtenerDatos();

    return () => controlador.abort();
  }, [url]);

  return { datos, cargando, error };
}

export default useFetch;
