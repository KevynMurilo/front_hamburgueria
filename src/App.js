import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/app.routes";
import { WaitersProvider } from "./contexts/GarcomContext";
import { RestauranteProvider } from "./contexts/PedidoContext";
import { ProdutoProvider } from "./contexts/ProdutoContext";
import { TablesProvider } from "./contexts/MesaContext";

const App = () => (
  <Router>
    <AuthProvider>
      <WaitersProvider>
        <RestauranteProvider>
          <TablesProvider>
            <ProdutoProvider>
              <AppRoutes />
            </ProdutoProvider>
          </TablesProvider>
        </RestauranteProvider>
      </WaitersProvider>
    </AuthProvider>
  </Router>
);

export default App;
