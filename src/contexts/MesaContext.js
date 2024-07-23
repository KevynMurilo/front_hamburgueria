import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Criação do contexto
export const TablesContext = createContext();

export const TablesProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para carregar mesas da API
  const fetchTables = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://192.168.0.105:8081/mesas");
      setTables(response.data);
    } catch (err) {
      setError("Erro ao carregar mesas. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar uma nova mesa
  const addTable = async (numero) => {
    try {
      const response = await axios.post("http://192.168.0.105:8081/mesas", {
        numero,
      });
      setTables([...tables, response.data]);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Número de mesa já cadastrado. Por favor, use outro número.");
      } else {
        setError("Erro ao adicionar mesa. Por favor, tente novamente.");
      }
    }
  };

  // Função para editar o status de uma mesa
  const updateTableStatus = async (numero, status) => {
    try {
      await axios.patch(`http://192.168.0.105:8081/mesas/update-status/${numero}`, {
        status,
      });
      setTables(
        tables.map((table) =>
          table.numero === numero ? { ...table, status } : table
        )
      );
    } catch (err) {
      setError("Erro ao atualizar o status da mesa. Por favor, tente novamente.");
    }
  };

  // Função para deletar uma mesa
  const deleteTable = async (numero) => {
    if (window.confirm("Tem certeza que deseja deletar esta mesa?")) {
      try {
        await axios.delete(`http://192.168.0.105:8081/mesas/${numero}`);
        setTables(tables.filter((table) => table.numero !== numero));
      } catch (err) {
        setError("Erro ao deletar mesa. Por favor, tente novamente.");
      }
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <TablesContext.Provider
      value={{
        tables,
        loading,
        error,
        fetchTables,
        addTable,
        updateTableStatus,
        deleteTable,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};
