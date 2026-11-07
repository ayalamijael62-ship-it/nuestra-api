
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/cliente';
import { useAuth } from '../contexto/AuthContext';

export function useFavoritos() {
  const { usuario, cargando: cargandoAuth } = useAuth();

  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Obtener los favoritos del usuario
  useEffect(() => {
    let activo = true;

    async function obtenerFavoritos() {
      if (cargandoAuth) return;

      if (!usuario) {
        setFavoritos([]);
        setCargando(false);
        return;
      }

      setCargando(true);
      setError('');

      const { data, error } = await supabase
        .from('favoritos')
        .select('*')
        .eq('user_id', usuario.id);

      if (!activo) return;

      if (error) {
        setError(error.message);
        setCargando(false);
        return;
      }

      const peliculas = data.map((favorito) => ({
        imdbID: favorito.imdb_id,
        Title: favorito.titulo,
        Year: favorito.anio,
        Poster: favorito.poster,
        Type: favorito.tipo,
      }));

      setFavoritos(peliculas);
      setCargando(false);
    }

    obtenerFavoritos();

    return () => {
      activo = false;
    };
  }, [usuario, cargandoAuth]);

  // Escuchar cambios en tiempo real
  useEffect(() => {
    if (cargandoAuth || !usuario) return;

    const canal = supabase
      .channel(`favoritos-${usuario.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favoritos',
          filter: `user_id=eq.${usuario.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const nuevo = payload.new;

            const pelicula = {
              imdbID: nuevo.imdb_id,
              Title: nuevo.titulo,
              Year: nuevo.anio,
              Poster: nuevo.poster,
              Type: nuevo.tipo,
            };

            setFavoritos((actuales) => {
              const existe = actuales.some(
                (favorito) => favorito.imdbID === pelicula.imdbID
              );

              return existe ? actuales : [...actuales, pelicula];
            });
          }

          if (payload.eventType === 'DELETE') {
            const eliminado = payload.old;

            setFavoritos((actuales) =>
              actuales.filter(
                (favorito) => favorito.imdbID !== eliminado.imdb_id
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [usuario, cargandoAuth]);

  // Agregar un favorito
  async function agregarFavorito(pelicula) {
    if (!usuario) return;

    const nuevoFavorito = {
      user_id: usuario.id,
      imdb_id: pelicula.imdbID,
      titulo: pelicula.Title,
      anio: pelicula.Year,
      poster: pelicula.Poster,
      tipo: pelicula.Type,
    };

    const { error } = await supabase
      .from('favoritos')
      .insert(nuevoFavorito);

    if (error) {
      if (error.code !== '23505') {
        setError(error.message);
      }
      return;
    }

    setFavoritos((actuales) => {
      const existe = actuales.some(
        (favorito) => favorito.imdbID === pelicula.imdbID
      );

      return existe ? actuales : [...actuales, pelicula];
    });
  }

  // Eliminar un favorito
  async function quitarFavorito(id) {
    if (!usuario) return;

    const { error } = await supabase
      .from('favoritos')
      .delete()
      .eq('imdb_id', id)
      .eq('user_id', usuario.id);

    if (error) {
      setError(error.message);
      return;
    }

    setFavoritos((actuales) =>
      actuales.filter((favorito) => favorito.imdbID !== id)
    );
  }

  // Comprobar si una película es favorita
  function esFavorito(id) {
    return favoritos.some(
      (favorito) => favorito.imdbID === id
    );
  }

  return {
    favoritos,
    cargando,
    error,
    agregarFavorito,
    quitarFavorito,
    esFavorito,
  };
}

