import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await axios.post(
        "http://192.168.0.105:8081/auth/login",
        { email, senha }
      );
      const { token } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      localStorage.setItem("authToken", token);
      setToken(token);
      setIsAuthenticated(true);
      setError(null);
      navigate("/pedidos-internos");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("Garçom não encontrado");
        } else if (err.response.status === 401) {
          setError("Credenciais inválidas");
        } else {
          setError("Erro ao fazer login");
        }
      } else {
        setError("Erro ao fazer login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
