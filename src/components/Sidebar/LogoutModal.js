import React from 'react';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Confirmar Logout</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">Tem certeza que deseja desconectar?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-200"
          >
            Confirmar Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
