import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getResults } from '../api/client';

function ClientDataModal({ data, setModal }) {
  const [results, setResults] = useState({});

  const getStats = async (ci) => {
    try {
      const response = await getResults(ci);
      if (response.ok) {
        const dataRes = await response.json();
        const cantExamenes = dataRes.length;
        const cantExamenesAprobados = dataRes.filter((res) => res.resultado >= 60).length;
        const porcentajeAprobacion = (cantExamenesAprobados / cantExamenes) * 100;
        const cantExamenesReprobados = dataRes.filter((res) => res.resultado < 60).length;
        setResults({
          cantExamenes,
          cantExamenesAprobados,
          cantExamenesReprobados,
          porcentajeAprobacion,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats(data.ci);
  }, [data]);

  return (
    <Modal show={Object.keys(data).length > 0} onClose={() => setModal({})}>
      <Modal.Header>Datos del usuario</Modal.Header>
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
              value={data.name}
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
              value={data.lastName}
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
              value={data.ci}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="fechaIngreso" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Fecha de Ingreso:
          </label>
          <div className="mt-1">
            <input
              readOnly
              type="text"
              name="fechaIngreso"
              id="fechaIngreso"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={data.fechaIngreso}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Fecha de finalizacion:
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="fechaFinalizacion"
              id="fechaFinalizacion"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={data.fechaFinalizacion}
            />
          </div>
        </div>

        <div className="mt-3">
          <span className="text-gray-700 text-xl dark:text-gray-200">Estadisticas</span>
          <div className="mt-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">Cant examenes: </span>
            <span className="text-gray-700 dark:text-gray-200">{results.cantExamenes || 0}</span>
          </div>
          <div className="mt-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">Cant examenes aprobados: </span>
            <span className="text-gray-700 dark:text-gray-200">{results.cantExamenesAprobados || 0}</span>
          </div>
          <div className="mt-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">Porcentaje de aprobacion: </span>
            <span className="text-gray-700 dark:text-gray-200">{parseInt(results.porcentajeAprobacion, 10) || 0}%</span>
          </div>

        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={() => setModal({})}
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-slate-600 border border-transparent rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cerrar
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-800 border border-transparent rounded-md shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Cambios
        </button>
        {/* <Button onClick={() => setOpenModal(false)}>I accept</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ClientDataModal;
