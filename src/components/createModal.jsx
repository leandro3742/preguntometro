import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { createClient } from '../api/client';
import Spinner from './spinner';

const CreateModal = ({ show, close, reload }) => {
  const [data, setData] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const create = async () => {
    const fechaIngreso = new Date().toISOString().slice(0, 10);
    setShowSpinner(true);
    try {
      const response = await createClient({ ...data, fechaIngreso });
      if (response.ok) {
        reload(true);
        close();
      }
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      // console.log(error);
    }
  };
  return (
    <Modal show={show} onClose={() => close(false)}>
      {showSpinner && <Spinner />}
      <Modal.Header>Crear nuevo usuario</Modal.Header>
      <Modal.Body>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nombre:
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={data.name || ''}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Apellido:
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={data.lastName || ''}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="ci" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Cedula:
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="ci"
              id="ci"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={data.ci || ''}
              onChange={(e) => setData({ ...data, ci: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Fecha de finalizacion:
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="fechaFinalizacion"
              id="fechaFinalizacion"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={data.fechaFinalizacion || ''}
              onChange={(e) => setData({ ...data, fechaFinalizacion: e.target.value })}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={() => close()}
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-slate-600 border border-transparent rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cerrar
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-800 border border-transparent rounded-md shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={create}
        >
          Crear usuario
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
