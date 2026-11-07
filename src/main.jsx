
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import AppRoutes from './rutas/AppRoutes';
import { FavoritosProvider } from './contexto/FavoritosContext';
import { AuthProvider } from './contexto/AuthContext';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritosProvider>
            <AppRoutes />
        </FavoritosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
