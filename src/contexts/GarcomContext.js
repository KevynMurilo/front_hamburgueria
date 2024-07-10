import React, { createContext, useState } from 'react';
import axios from 'axios';

export const WaitersContext = createContext();

export const WaitersProvider = ({ children }) => {
  const [waiters, setWaiters] = useState([]);
  const [error, setError] = useState(null);

  const registerWaiter = async (newWaiter) => {
    try {
      const response = await axios.post('http://192.168.0.105:8081/garcons', newWaiter);
      const data = response.data;
      setWaiters([...waiters, data]);
      console.log('Garçom registrado com sucesso:', data);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email já cadastrado. Por favor, use outro email.');
      } else {
        setError('Erro ao registrar garçom. Por favor, tente novamente.');
      }
    }
  };

  return (
    <WaitersContext.Provider value={{ waiters, error, registerWaiter }}>
      {children}
    </WaitersContext.Provider>
  );
};
