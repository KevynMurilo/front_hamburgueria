import React, { useState } from 'react';
import { mockMesas } from '../../mocks/mesas.mock';

const RegisterTable = ({ onTableAdded }) => {
  const [mesas, setMesas] = useState(mockMesas);
  const [numero, setNumero] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCreate = () => {
    if (!numero) {
      setErrorMessage('Por favor, preencha o número da mesa.');
      return;
    }

    const newTable = {
      id: Math.floor(Math.random() * 1000),
      numero: parseInt(numero),
    };

    setMesas([...mesas, newTable]);
    onTableAdded(newTable);
    setNumero('');
    setErrorMessage(null);
  };

  const handleEdit = (id) => {
    const mesaToEdit = mesas.find(mesa => mesa.id === id);
    if (mesaToEdit) {
      setNumero(mesaToEdit.numero.toString());
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (!numero) {
      setErrorMessage('Por favor, preencha o número da mesa.');
      return;
    }

    const updatedMesas = mesas.map(mesa => {
      if (mesa.id === editingId) {
        return { ...mesa, numero: parseInt(numero) };
      }
      return mesa;
    });

    setMesas(updatedMesas);
    setNumero('');
    setEditingId(null);
    setErrorMessage(null);
  };

  const handleDelete = (id) => {
    const updatedMesas = mesas.filter(mesa => mesa.id !== id);
    setMesas(updatedMesas);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Gerenciar Mesas</h2>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md text-center">
          {errorMessage}
        </div>
      )}

      <div className="mb-6 flex justify-center items-center">
        <input
          id="numero"
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
          min="1"
          step="1"
          placeholder="Número da Mesa"
        />
        {editingId ? (
          <>
            <button
              onClick={handleUpdate}
              className="ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-200"
            >
              Atualizar
            </button>
            <button
              onClick={() => {
                setNumero('');
                setEditingId(null);
              }}
              className="ml-2 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={handleCreate}
            className="ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-200"
          >
            Adicionar Mesa
          </button>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Lista de Mesas</h2>
        <ul>
          {mesas.map(mesa => (
            <li key={mesa.id} className="mb-4 bg-gray-100 p-4 rounded-md flex items-center justify-between">
              <span className="text-xl">Mesa {mesa.numero}</span>
              <div>
                <button
                  onClick={() => handleEdit(mesa.id)}
                  className="bg-yellow-400 text-white font-semibold py-1 px-2 rounded-md shadow-sm hover:bg-yellow-600 transition duration-200 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(mesa.id)}
                  className="bg-red-500 text-white font-semibold py-1 px-2 rounded-md shadow-sm hover:bg-red-700 transition duration-200"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RegisterTable;
