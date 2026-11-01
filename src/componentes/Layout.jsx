
import { Outlet } from 'react-router';
import Encabezado from './Encabezado';

function Layout() {
  return (
    <>
      <Encabezado />
      <Outlet />
    </>
  );
}

export default Layout;
