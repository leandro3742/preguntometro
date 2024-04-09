import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Chufles from '../clients/Chufles';
import Abysa from '../clients/Abysa';
import PregunTest from '../clients/PregunTest';

const ProtectedRoutes = () => {
  const { client } = useParams();

  useEffect(() => {
    const body = document.querySelector('body');
    if (client === 'iframe') {
      window.addEventListener('message', (event) => {
        body.style.backgroundColor = event.data.backgroundColor;
        if (event.data.dark) {
          body.classList.add('dark');
        } else {
          body.classList.remove('dark');
        }
      }, false);
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
