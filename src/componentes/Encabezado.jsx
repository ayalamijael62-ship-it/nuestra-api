import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../contexto/AuthContext';

function Encabezado() {
  const titulo = import.meta.env.VITE_TITULO || 'Vivi Show';
  const partesTitulo = titulo.split(' ');

  const { usuario, cargando, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  async function handleCerrarSesion() {
    const { error } = await cerrarSesion();

    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      return;
    }

    navigate('/');
  }

  return (
    <header className="encabezado">
      <h1>
        {partesTitulo[0]} <span>{partesTitulo.slice(1).join(' ')}</span>
      </h1>

      <p>Tu próximo mundo de películas y series.</p>

      <nav aria-label="Navegación principal">
        <NavLink to="/">Inicio</NavLink>
        {' | '}
        <Link to="/favoritos">❤️ Mis Favoritos</Link>

        {' | '}

        {cargando ? (
          <span>Cargando...</span>
        ) : usuario ? (
          <>
            <span>
              {usuario.email}
            </span>
            {' | '}
            <button type="button" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Iniciar sesión</NavLink>
            {' | '}
            <NavLink to="/registro">Registrarse</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Encabezado;