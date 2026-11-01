

import { Link, NavLink } from 'react-router';

function Encabezado() {
  const titulo = import.meta.env.VITE_TITULO || 'Vivi Show';
  const partesTitulo = titulo.split(' ');

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
      </nav>
    </header>
  );
}

export default Encabezado;
