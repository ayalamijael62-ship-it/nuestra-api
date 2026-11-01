
import { Routes, Route } from 'react-router';
import NoEncontrado from '../componentes/NoEncontrado';
import Layout from '../componentes/Layout';
import App from '../App';
import DetallePelicula from '../paginas/DetallePelicula';
import Favoritos from '../paginas/Favoritos';


function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/pelicula/:id" element={<DetallePelicula />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
