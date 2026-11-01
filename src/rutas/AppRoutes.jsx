
import { Routes, Route } from 'react-router';

import Layout from '../componentes/Layout';
import App from '../App';
import DetallePelicula from '../paginas/DetallePelicula';
import Favoritos from '../paginas/Favoritos';

function NoEncontrado() {
  return (
    <main className="app">
      <h1>Página no encontrada</h1>
      <p>La página que buscás no existe.</p>
    </main>
  );
}

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
