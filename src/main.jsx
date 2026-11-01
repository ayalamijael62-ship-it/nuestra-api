
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes from './rutas/AppRoutes';
import { FavoritosProvider } from './contexto/FavoritosContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritosProvider>
        <AppRoutes />
      </FavoritosProvider>
    </BrowserRouter>
  </StrictMode>
);
