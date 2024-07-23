import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WaitersContext = createContext();

export const WaitersProvider = ({ children }) => {
  const [waiters, setWaiters] = useState([]);

  useEffect(() => {
    fetchWaiters();
  }, []);

  const fetchWaiters = async () => {
    try {
      const response = await axios.get('http://192.168.0.105:8081/garcons');
      setWaiters(response.data);
    } catch (error) {
      console.error('Erro ao buscar garçons:', error);
    }
  };

  const registerWaiter = async (newWaiter) => {
    try {
      const response = await axios.post('http://192.168.0.105:8081/garcons', newWaiter);
      setWaiters((prevWaiters) => [...prevWaiters, response.data]);
    } catch (error) {
      console.error('Erro ao registrar garçom:', error);
      throw error;
    }
  };

  const updateWaiter = async (id, updatedWaiter) => {
    try {
      await axios.patch(`http://192.168.0.105:8081/garcons/${id}`, updatedWaiter);
      setWaiters((prevWaiters) =>
        prevWaiters.map((waiter) => (waiter.id === id ? { ...waiter, ...updatedWaiter } : waiter))
      );
    } catch (error) {
      console.error('Erro ao atualizar garçom:', error);
      throw error;
    }
  };

  const deleteWaiter = async (id) => {
    try {
      await axios.delete(`http://192.168.0.105:8081/garcons/${id}`);
      setWaiters((prevWaiters) => prevWaiters.filter((waiter) => waiter.id !== id));
    } catch (error) {
      console.error('Erro ao deletar garçom:', error);
    }
  };

  return (
    <WaitersContext.Provider value={{ waiters, registerWaiter, updateWaiter, deleteWaiter }}>
      {children}
    </WaitersContext.Provider>
  );
};
