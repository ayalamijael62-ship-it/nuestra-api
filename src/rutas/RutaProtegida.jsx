import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexto/AuthContext';

function RutaProtegida() {
  const { usuario, cargando } = useAuth();

  // Esperamos a que Supabase compruebe si existe una sesión.
  if (cargando) {
    return <p>Comprobando sesión...</p>;
  }

  // Si no hay usuario, redirigimos al login.
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si hay un usuario autenticado, mostramos la ruta solicitada.
  return <Outlet />;
}

//navigate: permite redirigir al usuario a otra ruta.
//outlet: representa el contenido de la ruta hija que se está intentando mostrar.
//replace: reemplaza la entrada actual del historial para que el usuario no vuelva a la página protegida al pulsar el botón Atrás.

export default RutaProtegida;