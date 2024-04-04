import { Outlet, useParams } from 'react-router-dom';
import Chufles from '../clients/Chufles';
import Abysa from '../clients/Abysa';

const ProtectedRoutes = () => {
  const { client } = useParams();

  return (
    <>
      {client === 'chufles' && <Chufles />}
      {client === 'abysa' && <Abysa />}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
