
import { useEffect, useState } from 'react';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('vivi-favoritos');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('vivi-favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  function agregarFavorito(pelicula) {
    setFavoritos((actuales) => {
      const existe = actuales.some(
        (favorito) => favorito.imdbID === pelicula.imdbID
      );

      if (existe) return actuales;

      return [...actuales, pelicula];
    });
  }

  function quitarFavorito(id) {
    setFavoritos((actuales) =>
      actuales.filter((favorito) => favorito.imdbID !== id)
    );
  }

  function esFavorito(id) {
    return favoritos.some((favorito) => favorito.imdbID === id);
  }

  return {
    favoritos,
    agregarFavorito,
    quitarFavorito,
    esFavorito,
  };
}
