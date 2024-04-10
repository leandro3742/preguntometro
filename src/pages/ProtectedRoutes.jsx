import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Chufles from '../clients/Chufles';
import Abysa from '../clients/Abysa';
import PregunTest from '../clients/PregunTest';

const ProtectedRoutes = () => {
  const { client } = useParams();

  useEffect(() => {
    if (client === 'iframe') {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const bg = params.get('bg');
      document.body.style.backgroundColor = `#${bg}`;
      if (mode === 'dark') {
        document.body.classList.add('dark');
      }
    }
  }, []);

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
