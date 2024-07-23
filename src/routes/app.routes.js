import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import PedidosInternos from "../pages/PedidosInternos";
import PedidosExternos from "../pages/PedidosExternos";
import PedidoForm from "../pages/FazerPedido";
import RegisterProduct from "../pages/CadastrarProduto";
import RegisterTable from "../pages/CadastrarMesa";
import GerenciarGarcons from "../pages/GerenciarGarcons";
import Login from "../pages/Login";
import AuthContext from "../contexts/AuthContext";
import DashboardPage from "../pages/Dashboard";

export const AppRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const shouldShowSidebar = isAuthenticated && location.pathname !== "/login";

  return (
    <div className="flex">
      {shouldShowSidebar && <Sidebar />}
      <div className={shouldShowSidebar ? "flex-1" : "w-full"}>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/pedidos-internos" element={<PedidosInternos />} />
              <Route path="/pedidos-externos" element={<PedidosExternos />} />
              <Route path="/realizar-pedidos" element={<PedidoForm />} />
              <Route path="/cadastrar-produto" element={<RegisterProduct />} />
              <Route path="/registrar-garcom" element={<GerenciarGarcons />} />
              <Route path="/cadastrar-mesa" element={<RegisterTable />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
