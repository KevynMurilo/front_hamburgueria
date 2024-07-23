import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RestauranteContext = createContext();

export const useRestauranteContext = () => useContext(RestauranteContext);

export const RestauranteProvider = ({ children }) => {
  const [garcons, setGarcons] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produtos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [adicionais, setAdicionais] = useState([]);
  const [pedidosPendentesClientes, setPedidosPendentesClientes] = useState([]);

  useEffect(() => {
    fetchGarcons();
    fetchCategorias();
    fetchMesas();
    fetchAdicionais();
    fetchPedidosPendentesClientes();
  }, []);

  const fetchGarcons = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/garcons');
      setGarcons(response.data);
    } catch (error) {
      console.error('Erro ao buscar garçons:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const fetchMesas = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/mesas');
      const sortedMesas = response.data.sort((a, b) => a.numero - b.numero);
      setMesas(sortedMesas);
    } catch (error) {
      console.error('Erro ao buscar mesas:', error);
    }
  };

  const fetchAdicionais = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/itens-adicionais');
      setAdicionais(response.data);
    } catch (error) {
      console.error('Erro ao buscar adicionais:', error);
    }
  };

  const fetchProdutosByCategoria = async (categoriaId) => {
    try {
      const response = await axios.get(`http://192.168.0.105:8081/produtos/categoria/${categoriaId}`);
      return response.data[0].produtoCategoria.map(p => ({
        id: p.id_produto,
        nome: p.produto.nome
      }));
    } catch (error) {
      console.error('Erro ao buscar produtos da categoria:', error);
    }
  };

  const criarPedido = async (pedido) => {
    try {
      const response = await axios.post('http://192.168.0.105:8081/pedidos', pedido);
      return response.data.printStatus; 
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  //tem que passar numero da mesa
  const fetchPedidosMesa = async (mesaId) => {
    try {
      const response = await axios.get(`http://192.168.0.105:8081/pedidos/mesa/${mesaId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos da mesa:', error);
      return [];
    }
  };

  const updateMesaStatus = async (mesaId, status) => {
    try {
      await axios.patch(`http://192.168.0.105:8081/mesas/update-status/${mesaId}`, { status });
    } catch (error) {
      console.error('Erro ao atualizar o status da mesa:', error);
    }
  };

  const atualizarPedidosMesa = async (idsPedidos, metodoPagamento) => {
    try {
      await axios.patch(`http://192.168.0.105:8081/pedidos/update/status`, {
        ids_numero_mesa: idsPedidos,
        status: 'finalizado',
        metodo_pagamento: metodoPagamento
      });
    } catch (error) {
      console.error('Erro ao atualizar os pedidos da mesa:', error);
    }
  };

  const fetchPedidosPendentesClientes = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/pedidos/pendente/cliente');
      setPedidosPendentesClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos pendentes dos clientes:', error);
    }
  };

  //tem que passar id_externo
  const fetchPedidosCliente = async (clienteId) => {
    try {
      const response = await axios.get(`http://192.168.0.105:8081/pedidos/cliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos do cliente:', error);
      return [];
    }
  };

  const deleteItemPedido = async (itemId) => {
    try {
      await axios.delete(`http://192.168.0.105:8081/itens-do-pedido/${itemId}`);
      // Atualizar a lista de pedidos ou o estado relevante após a deleção
    } catch (error) {
      console.error('Erro ao deletar item do pedido:', error);
    }
  };

  const contextValue = {
    garcons,
    categorias,
    produtos,
    mesas,
    adicionais,
    pedidosPendentesClientes,
    fetchProdutosByCategoria,
    fetchMesas,
    fetchAdicionais,
    criarPedido,
    fetchPedidosMesa,
    updateMesaStatus,
    atualizarPedidosMesa,
    fetchPedidosPendentesClientes,
    fetchPedidosCliente,
    deleteItemPedido, // Adicione a função ao contexto
  };

  return (
    <RestauranteContext.Provider value={contextValue}>
      {children}
    </RestauranteContext.Provider>
  );
};
