import React, { useState } from 'react';
import { useProdutoContext } from '../../contexts/ProdutoContext';
import { useRestauranteContext } from '../../contexts/PedidoContext';

const RegisterProduct = () => {
  const { criarProduto } = useProdutoContext();
  const { categorias } = useRestauranteContext();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategorias((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || !preco || selectedCategorias.length === 0) {
      setErrorMessage('Por favor, preencha todos os campos e selecione pelo menos uma categoria.');
      return;
    }

    const newProduct = {
      nome,
      descricao,
      preco: parseFloat(preco),
      ids_categorias: selectedCategorias,
    };

    try {
      await criarProduto(newProduct);
      setSuccessMessage('Produto registrado com sucesso!');
      setErrorMessage(null);
      setNome('');
      setDescricao('');
      setPreco('');
      setSelectedCategorias([]);
    } catch (error) {
      setErrorMessage('Erro ao registrar o produto.');
    }
  };

  return (
    <div className="flex min-h-dvh bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-3xl m-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Registrar Novo Produto</h2>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md text-center">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <div className="mb-6">
          <label className="block font-medium text-gray-700 text-lg">Nome do Produto</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 text-lg">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 text-lg">Preço</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
            min="0"
            step="0.25"
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 text-lg">Categorias</label>
          {categorias.map((categoria) => (
            <div key={categoria.id} className="flex items-center">
              <input
                type="checkbox"
                id={`categoria-${categoria.id}`}
                checked={selectedCategorias.includes(categoria.id)}
                onChange={() => handleCategoryChange(categoria.id)}
                className="mr-2"
              />
              <label htmlFor={`categoria-${categoria.id}`} className="text-gray-700">
                {categoria.nome}
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md shadow-sm hover:bg-blue-700 transition duration-200"
        >
          Registrar Produto
        </button>
      </div>
    </div>
  );
};

export default RegisterProduct;
