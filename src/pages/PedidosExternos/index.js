import React from 'react';
import PedidosComModal from '../../components/EntidadesComModal/EntidadesComModal';
import { useRestauranteContext } from '../../contexts/PedidoContext';

function PedidosExternos() {
  const { pedidosPendentesClientes, fetchPedidosCliente, fetchPedidosPendentesClientes } = useRestauranteContext();

  return (
    <PedidosComModal
      title=""
      items={pedidosPendentesClientes}
      fetchItemsData={fetchPedidosCliente}
      fetchItems={fetchPedidosPendentesClientes}
      isExternal={true}
    />
  );
}

export default PedidosExternos;
