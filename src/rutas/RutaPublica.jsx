import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexto/AuthContext';

function RutaPublica() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <p>Comprobando sesión...</p>;
  }

  if (usuario) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RutaPublica;