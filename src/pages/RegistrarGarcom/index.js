import React, { useState, useContext } from 'react';
import { WaitersContext } from '../../contexts/GarcomContext';

const RegisterWaiter = () => {
  const { registerWaiter } = useContext(WaitersContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmSenha) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmSenha) {
      setErrorMessage('As senhas digitadas não coincidem.');
      return;
    }

    const newWaiter = {
      nome,
      email,
      senha,
    };

    try {
      await registerWaiter(newWaiter);
      setSuccessMessage('Garçom registrado com sucesso!');
      setErrorMessage(null);
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmSenha('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Email já cadastrado. Por favor, use outro email.');
      } else {
        console.error('Erro ao registrar garçom:', error);
        setErrorMessage('Erro ao registrar garçom. Por favor, tente novamente.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Registrar Garçom</h2>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 text-lg mb-2">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
            placeholder="Digite o nome do garçom"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
            placeholder="Digite o email do garçom"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-gray-700 text-lg mb-2">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
            placeholder="Digite a senha do garçom"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmSenha" className="block text-gray-700 text-lg mb-2">Confirmar Senha</label>
          <input
            id="confirmSenha"
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
            placeholder="Confirme a senha"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md shadow-sm hover:bg-blue-700 transition duration-200"
        >
          Registrar Garçom
        </button>
      </div>
    </div>
  );
};

export default RegisterWaiter;
