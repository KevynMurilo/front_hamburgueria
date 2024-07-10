// Modal.jsx
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useRestauranteContext } from '../../contexts/PedidoContext';

function Modal({ itemId, data = [], onClose, onSuccess }) {
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [error, setError] = useState(null);
  const { updateMesaStatus, atualizarPedidosMesa } = useRestauranteContext();

  const pedidosPendentes = data.filter((pedido) => pedido.status === 'pendente');

  const total = pedidosPendentes.reduce((acc, pedido) => {
    const pedidoTotal = pedido.itens.reduce((accItem, item) => {
      const adicionaisTotal = item.itensAdicionais.reduce(
        (accAdicional, adicional) => accAdicional + adicional.itemAdicional.preco,
        0
      );
      return accItem + (item.produto.preco + adicionaisTotal);
    }, 0);
    return acc + pedidoTotal;
  }, 0);

  const handleConcluirPedido = async () => {
    if (!metodoPagamento) {
      setError('Por favor, selecione um método de pagamento.');
      return;
    }

    const ids = pedidosPendentes.map((pedido) => pedido.id);

    try {
      await atualizarPedidosMesa(ids, metodoPagamento);
      await updateMesaStatus(itemId, 'disponivel');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      setError('Ocorreu um erro ao concluir o pedido.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 w-full md:p-8 lg:p-10 rounded-lg md:w-3/4 lg:w-1/2 relative shadow-lg max-h-screen overflow-y-auto lg:max-h-full py-20">
        <IoMdClose
          onClick={onClose}
          className="text-3xl text-red-500 cursor-pointer absolute lg:top-4 right-4"
        />
        <div className="text-white overflow-y-auto max-h-full lg:max-h-screen flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Detalhes do Pedido</h2>
          {pedidosPendentes.length === 0 ? (
            <p>Nenhum pedido pendente.</p>
          ) : (
            <>
              <div className="text-sm font-medium mb-4">
                <p>{new Date(pedidosPendentes[0].hora_pedido).toLocaleDateString()}</p>
                <p>{new Date(pedidosPendentes[0].hora_pedido).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <p className="text-lg mb-2">
                <span className="font-bold">ID:</span> {itemId}
              </p>
              <div className="flex-grow overflow-y-auto break-words lg:max-h-96">
                <h3 className="text-xl font-semibold mb-2 sticky top-0 bg-gray-900 py-2">
                  Itens do Pedido:
                </h3>
                {pedidosPendentes.map((pedido, index) => (
                  <div key={index} className="mb-4 border-b border-gray-700 pb-4">
                    {pedido.itens.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-4 p-2 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <p className="text-lg font-bold break-words">{item.produto.nome}</p>
                          <p className="text-lg font-bold">R$ {item.produto.preco.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-400 break-words">{item.produto.descricao}</p>
                        {item.itensAdicionais.length > 0 && (
                          <ul className="ml-4 mt-2 text-sm text-gray-400">
                            {item.itensAdicionais.map((adicional, adicionalIndex) => (
                              <li key={adicionalIndex} className="flex justify-between">
                                <span>{adicional.itemAdicional.nome}</span>
                                <span>R$ {adicional.itemAdicional.preco.toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">Total: R$ {total.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-200 mb-2">Método de Pagamento</label>
                <select
                  value={metodoPagamento}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                  className="block w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="">Selecione um método de pagamento</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="debito">Débito</option>
                  <option value="credito">Crédito</option>
                </select>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <button
                onClick={handleConcluirPedido}
                className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Concluir Pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
