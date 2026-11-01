
import { createContext, useContext } from 'react';
import { useFavoritos } from '../hooks/useFavoritos';

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  const favoritosData = useFavoritos();

  return (
    <FavoritosContext.Provider value={favoritosData}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritosContext() {
  const contexto = useContext(FavoritosContext);

  if (!contexto) {
    throw new Error(
      'useFavoritosContext debe utilizarse dentro de FavoritosProvider'
    );
  }

  return contexto;
}
