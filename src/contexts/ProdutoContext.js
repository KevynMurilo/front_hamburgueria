import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProdutoContext = createContext();

export const useProdutoContext = () => useContext(ProdutoContext);

export const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);


  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const criarProduto = async (produto) => {
    try {
      await axios.post('http://192.168.0.105:8081/produtos', produto);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const contextValue = {
    produtos,
    criarProduto,
  };

  return (
    <ProdutoContext.Provider value={contextValue}>
      {children}
    </ProdutoContext.Provider>
  );
};
