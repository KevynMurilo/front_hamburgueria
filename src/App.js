import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/app.routes';
import { WaitersProvider } from './contexts/GarcomContext';
import { RestauranteProvider } from './contexts/PedidoContext';
import { ProdutoProvider } from './contexts/ProdutoContext';

const App = () => (
  <Router>
    <AuthProvider>
      <WaitersProvider>
        <RestauranteProvider>
          <ProdutoProvider>
            <AppRoutes />
          </ProdutoProvider>
        </RestauranteProvider>
      </WaitersProvider>
    </AuthProvider>
  </Router>
);

export default App;
