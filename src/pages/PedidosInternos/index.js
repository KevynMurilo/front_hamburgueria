import React from 'react';
import PedidosComModal from '../../components/EntidadesComModal/EntidadesComModal';
import { useRestauranteContext } from '../../contexts/PedidoContext';

function PedidosInternos() {
  const { mesas, fetchPedidosMesa, fetchMesas } = useRestauranteContext();

  return (
    <PedidosComModal
      title="Mesa"
      items={mesas}
      fetchItemsData={fetchPedidosMesa}
      fetchItems={fetchMesas}
    />
  );
}

export default PedidosInternos;
