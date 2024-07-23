import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { WaitersContext } from "../../contexts/GarcomContext";
import "tailwindcss/tailwind.css";

Modal.setAppElement("#root");

const GerenciarGarcons = () => {
  const { waiters, registerWaiter, updateWaiter, deleteWaiter } =
    useContext(WaitersContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentWaiter, setCurrentWaiter] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpenModal = (waiter = null) => {
    setIsModalOpen(true);
    setIsEditMode(!!waiter);
    setCurrentWaiter(waiter);
    setNome(waiter ? waiter.nome : "");
    setEmail(waiter ? waiter.email : "");
    setSenha("");
    setConfirmSenha("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage(null);
    setSuccessMessage("");
  };

  const handleSave = async () => {
    if (!nome || !email || !senha || !confirmSenha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmSenha) {
      setErrorMessage("As senhas digitadas não coincidem.");
      return;
    }

    const newWaiter = { nome, email, senha };
    try {
      if (isEditMode) {
        await updateWaiter(currentWaiter.id, newWaiter);
        setSuccessMessage("Garçom atualizado com sucesso!");
      } else {
        await registerWaiter(newWaiter);
        setSuccessMessage("Garçom registrado com sucesso!");
      }
      handleCloseModal();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Email já cadastrado. Por favor, use outro email.");
      } else {
        setErrorMessage("Erro ao salvar garçom. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="p-8 mx-auto">
      <button
        onClick={() => handleOpenModal()}
        className="mb-8 bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 text-lg mt-14"
      >
        Adicionar Novo Garçom
      </button>

      <ul className="space-y-6">
        {waiters.map((waiter) => (
          <li
            key={waiter.id} 
            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row items-start justify-between"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full">
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-800">
                  {waiter.nome}
                </p>
                <p className="text-gray-600">{waiter.email}</p>
              </div>
              <div className="flex md:flex-row gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleOpenModal(waiter)}
                  className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteWaiter(waiter.id)}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  Deletar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={isEditMode ? "Editar Garçom" : "Registrar Garçom"}
        className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isEditMode ? "Editar Garçom" : "Registrar Garçom"}
        </h2>

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="nome" className="block text-gray-700 text-lg mb-2">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg p-3"
            placeholder="Digite o nome do garçom"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg p-3"
            placeholder="Digite o email do garçom"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="senha" className="block text-gray-700 text-lg mb-2">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg p-3"
            placeholder="Digite a senha"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmSenha"
            className="block text-gray-700 text-lg mb-2"
          >
            Confirmar Senha
          </label>
          <input
            id="confirmSenha"
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg p-3"
            placeholder="Confirme a senha"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSave}
            className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 text-lg"
          >
            {isEditMode ? "Atualizar" : "Registrar"}
          </button>
          <button
            onClick={handleCloseModal}
            className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 text-lg"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GerenciarGarcons;
