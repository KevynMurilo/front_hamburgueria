import React, { useEffect } from 'react';
import PedidosComModal from '../../components/EntidadesComModal/EntidadesComModal';
import { useRestauranteContext } from '../../contexts/PedidoContext';

function PedidosClientes() {
  const { pedidosPendentesClientes, fetchPedidosPendentesClientes } = useRestauranteContext();

  useEffect(() => {
    fetchPedidosPendentesClientes();
  }, []);

  return (
    <PedidosComModal
      title="Pedidos Externos (Clientes)"
      items={pedidosPendentesClientes}
      fetchItemsData={fetchPedidosPendentesClientes}
      fetchItems={fetchPedidosPendentesClientes}
    />
  );
}

export default PedidosClientes;
