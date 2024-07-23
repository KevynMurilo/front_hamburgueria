import React, { useContext, useState, useEffect } from 'react';
import { TablesContext } from '../../contexts/MesaContext';

const GerenciarMesas = () => {
  const { tables, loading, error, addTable, updateTableStatus, deleteTable } = useContext(TablesContext);
  const [numero, setNumero] = useState('');
  const [errorMessage, setErrorMessage] = useState(error);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const handleCreate = async () => {
    if (!numero) {
      setErrorMessage('Por favor, preencha o número da mesa.');
      return;
    }

    try {
      await addTable(parseInt(numero));
      setNumero('');
      setErrorMessage(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Número de mesa já cadastrado. Por favor, use outro número.');
      } else {
        setErrorMessage('Erro ao adicionar mesa. Tente novamente.');
      }
    }
  };

  const toggleStatus = async (numero) => {
    const mesaToToggle = tables.find((mesa) => mesa.numero === numero);
    const newStatus = mesaToToggle.status === 'disponivel' ? 'ocupada' : 'disponivel';

    try {
      await updateTableStatus(numero, newStatus);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Erro ao atualizar o status da mesa. Tente novamente.');
    }
  };

  const handleDelete = (numero) => {
    setTableToDelete(numero);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTable(tableToDelete);
      setShowConfirmModal(false);
      setTableToDelete(null);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Erro ao deletar mesa. Tente novamente.');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setTableToDelete(null);
  };

  return (
    <div className=" mx-auto p-8 bg-gray-50 rounded-xl shadow-lg min-h-dvh">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Gerenciar Mesas</h2>

      {errorMessage && !showConfirmModal && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-md text-center">
          {errorMessage}
        </div>
      )}

      <div className="mb-8 flex items-center justify-center space-x-4">
        <input
          id="numero"
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg p-3"
          min="1"
          step="1"
          placeholder="Número da Mesa"
        />
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md shadow-sm hover:bg-indigo-700 transition duration-200"
        >
          Adicionar Mesa
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Carregando mesas...</p>
      ) : (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Lista de Mesas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tables.map((mesa) => (
              <div
                key={mesa.numero}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Mesa {mesa.numero}</h3>
                  <button
                    onClick={() => toggleStatus(mesa.numero)}
                    className={`${
                      mesa.status === 'disponivel' ? 'bg-green-500' : 'bg-red-500'
                    } text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-opacity-80 transition duration-200`}
                  >
                    {mesa.status === 'disponivel' ? 'Ocupar' : 'Desocupar'}
                  </button>
                </div>
                <div className="text-gray-600">
                  <p>Status: <span className={`${mesa.status === 'disponivel' ? 'text-green-500' : 'text-red-500'}`}>{mesa.status}</span></p>
                </div>
                <button
                  onClick={() => handleDelete(mesa.numero)}
                  className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-red-700 transition duration-200"
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-4">Você tem certeza que deseja deletar esta mesa? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-red-700 transition duration-200"
              >
                Confirmar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 transition duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarMesas;
