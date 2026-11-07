
import { Routes, Route } from 'react-router';
import NoEncontrado from '../componentes/NoEncontrado';
import Layout from '../componentes/Layout';
import App from '../App';
import DetallePelicula from '../paginas/DetallePelicula';
import Favoritos from '../paginas/Favoritos';
import Login from '../paginas/Login';
import Registro from '../paginas/Registro';
import RutaProtegida from './RutaProtegida';
import RutaPublica from './RutaPublica';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rutas públicas */}
        <Route path="/" element={<App />} />
        <Route path="/pelicula/:id" element={<DetallePelicula />} />

        {/* Rutas protegidas */}
        <Route element={<RutaProtegida />}>
          <Route path="/favoritos" element={<Favoritos />} />
        </Route>

        <Route element={<RutaPublica />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Route>

        {/* Ruta para páginas inexistentes */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
