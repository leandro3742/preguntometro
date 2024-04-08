import { Outlet, useParams } from 'react-router-dom';
import Chufles from '../clients/Chufles';
import Abysa from '../clients/Abysa';
import PregunTest from '../clients/PregunTest';

const ProtectedRoutes = () => {
  const { client } = useParams();

  return (
    <>
      {client === 'chufles' && <Chufles />}
      {client === 'abysa' && <Abysa />}
      {client === 'preguntest' && <PregunTest />}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
