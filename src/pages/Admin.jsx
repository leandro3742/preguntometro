import { useEffect, useState } from 'react';
import ClientDataModal from '../components/clientDataModal';
import CreateModal from '../components/createModal';
import { getClients } from '../api/client';
import Spinner from '../components/spinner';

function Admin() {
  const [clients, setClients] = useState([]);
  const [clientsFilter, setClientsFilter] = useState([]);
  const [modal, setModal] = useState({});
  const [createModal, setCreateModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [reload, setReload] = useState(false);

  const get = async () => {
    try {
      setShowSpinner(true);
      const response = await getClients();
      if (response.ok) {
        setShowSpinner(false);
        const data = await response.json();
        setClients(data.rows);
        setClientsFilter(data.rows);
      }
    } catch (error) {
      setShowSpinner(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    get();
  }, [reload]);

  const filterUsers = (value) => {
    const filtered = clients.filter(
      (client) => client.name.toLowerCase().includes(value.toLowerCase())
        || client.lastName.toLowerCase().includes(value.toLowerCase()),
    );
    setClientsFilter(filtered);
  };

  const openModal = (client) => {
    setModal(client);
  };

  return (
    <div className="mt-3 lg:p-3 md:p-3">
      {showSpinner && <Spinner />}
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-center">Administrar Usuarios</h1>
      </div>
      <div className="relative my-3 px-2">
        <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar usuario..."
          onChange={(e) => filterUsers(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 lg:px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-3 lg:px-6 py-3">
                Cédula
              </th>
              <th scope="col" className="px-3 lg:px-6 py-3">
                Ingreso
              </th>
              <th scope="col" className="px-3 lg:px-6 py-3">
                {' '}
              </th>
            </tr>
          </thead>
          <tbody>
            {clientsFilter.map((client) => (
              <tr key={client.ci} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-3 lg:px-6 lg:py-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {client.name}
                  {' '}
                  {client.lastName}
                </th>
                <td className="px-3 lg:px-6 lg:py-3 py-2">
                  {client.ci}
                </td>
                <td className="px-3 lg:px-6 lg:py-3 py-2">
                  {client.fechaIngreso}
                </td>
                <td className="px-3 lg:px-6 lg:py-3 py-2" onClick={() => openModal(client)}>
                  <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Abrir</span>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <div className="px-2 py-4 flex justify-end">
        <button
          type="button"
          onClick={() => setCreateModal(true)}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-800 border border-transparent rounded-md shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Crear usuario nuevo
        </button>
      </div>
      <ClientDataModal data={modal} setModal={setModal} reload={setReload} />
      <CreateModal show={createModal} close={setCreateModal} reload={setReload} />
    </div>
  );
}

export default Admin;
