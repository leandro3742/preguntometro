import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../api/auth';
import Spinner from '../components/spinner';

// eslint-disable-next-line react/function-component-definition
const Notificacion = () => (
  <div className="transition-opacity duration-500 mt-3 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">Usaurio no encontrado!</span>
    </div>
  </div>
);

function Examen() {
  const [show, setShow] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const { client } = useParams();

  const verifyUser = async (e) => {
    e.preventDefault();
    try {
      setShow(false);
      setShowSpinner(true);
      const response = await login(e.target[0].value, e.target[1].value);
      if (response.ok) {
        const data = await response.json();
        if (data.role === 'admin') {
          navigate(`/${client}/admin`);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
        } else if (data.role === 'client') {
          navigate(`/${client}/alumno`);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
        }
      } else {
        setShow(true);
      }
      setShowSpinner(false);
    } catch (error) {
      setShow(true);
    }
  };

  return (
    <div className="mt-16 lg:w-3/12 md:w-10/12 m-auto dark:bg-gray-900 dark:text-white bg-slate-50 p-5 rounded-xl shadow-lg">
      {showSpinner && <Spinner />}
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold mb-4 text-center">Ingresar {isClient ? 'Alumno' : 'Administrador'}</h3>
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" onChange={() => setIsClient(!isClient)} checked={isClient} />
          <div
            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          />
        </label>
      </div>
      <hr className="mb-3" />
      <form className="flex flex-col" onSubmit={verifyUser}>
        <label htmlFor="ci" className="mb-2">Cédula</label>
        <input
          type="text"
          id="ci"
          name="ci"
          placeholder="Ej: 12345678"
          className="p-2 rounded-lg shadow-md focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {!isClient && (
          <>
            <label htmlFor="password" className="my-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ej: 12345678"
              className="text-gray-900 text-sm p-2 rounded-lg shadow-md focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </>
        )}
        {show && <Notificacion />}
        <section className="m-auto mt-3">
          <button type="submit" className="bg-blue-500 p-2 px-6 rounded-lg shadow-md focus:ring-blue-500 text-white">Ingresar</button>
        </section>
      </form>
    </div>
  );
}

export default Examen;
