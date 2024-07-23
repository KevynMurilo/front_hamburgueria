import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useRestauranteContext } from "../../contexts/PedidoContext";

const PedidoForm = () => {
  const {
    garcons = [],
    categorias = [],
    mesas = [],
    adicionais = [],
    fetchProdutosByCategoria,
    criarPedido,
  } = useRestauranteContext();
  const [tipoPedido, setTipoPedido] = useState("interno");
  const [numeroMesa, setNumeroMesa] = useState(null);
  const [nomeCliente, setNomeCliente] = useState("");
  const [idGarcom, setIdGarcom] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState("");
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [warnMessage, setWarnMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (categoriaSelecionada !== null) {
      fetchProdutosByCategoria(categoriaSelecionada).then((produtos) => {
        setProdutos(produtos || []); // Garantir que produtos seja um array
      });
    }
  }, [categoriaSelecionada, fetchProdutosByCategoria]);

  useEffect(() => {
    setItensPedido((prevItens) =>
      prevItens.map((item) => ({
        ...item,
        nome_produto:
          produtos.find((produto) => produto.id === item.id_produto)?.nome ||
          item.nome_produto,
      }))
    );
  }, [produtos]);

  const handleAddItem = () => {
    if (selectedProduto) {
      const produto = produtos.find((p) => p.id === selectedProduto);
      if (produto) {
        const newItem = {
          id_produto: produto.id,
          quantidade,
          observacoes,
          adicionais: isCategoriaDeBebida()
            ? []
            : adicionaisSelecionados.map((id_item_adicional) => ({
                id_item_adicional,
              })),
          nome_produto: produto.nome,
        };
        setItensPedido([...itensPedido, newItem]);
        setSelectedProduto(null);
        setQuantidade(1);
        setObservacoes("");
        setAdicionaisSelecionados([]);
      }
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItens = [...itensPedido];
    updatedItens.splice(index, 1);
    setItensPedido(updatedItens);
  };

  const handleSubmit = async () => {
    if (
      (numeroMesa || nomeCliente) &&
      !(numeroMesa && nomeCliente) &&
      idGarcom &&
      itensPedido.length > 0
    ) {
      try {
        const pedido = {
          pedido: {
            nome_cliente: nomeCliente || null,
            numero_mesa: numeroMesa || null,
            id_garcom: idGarcom,
          },
          itens: itensPedido,
        };

        const printStatus = await criarPedido(pedido);

        if (printStatus === "sucesso") {
          setSuccessMessage("Pedido realizado com sucesso!");
          setWarnMessage(null);
          setErrorMessage(null);
        } else if (printStatus === "Erro ao enviar para a impressora.") {
          setWarnMessage(
            "Pedido realizado, mas não foi possível enviar para a impressora. A impressora pode não estar conectada ou ser um problema de configuração."
          );
          setSuccessMessage(null);
          setErrorMessage(null);
        } else if (printStatus === "Erro na comunicação TCP") {
          setWarnMessage(
            "Pedido realizado, mas o serviço da impressora está indisponível."
          );
          setSuccessMessage(null);
          setErrorMessage(null);
        } else {
          setSuccessMessage(null);
          setErrorMessage(
            printStatus ||
              "Ocorreu um erro ao realizar o pedido. Tente novamente."
          );
        }

        setNumeroMesa(null);
        setNomeCliente("");
        setIdGarcom(null);
        setItensPedido([]);
        setTimeout(() => {
          setSuccessMessage(null);
          setWarnMessage(null);
          setErrorMessage(null);
        }, 5000);
      } catch (error) {
        setSuccessMessage(null);
        setErrorMessage(
          "Ocorreu um erro ao realizar o pedido. Tente novamente."
        );
      }
    } else {
      setSuccessMessage(null);
      setErrorMessage(
        "Por favor, preencha todos os campos obrigatórios e adicione pelo menos um item ao pedido."
      );
    }
  };

  const isCategoriaDeBebida = () => {
    if (categoriaSelecionada !== null) {
      const categoria = categorias.find(
        (cat) => cat.id === categoriaSelecionada
      );
      return categoria && ["bebidas", "bebida", "BEBIDAS"].includes(categoria.nome.toLowerCase());
    }
    return false;
  };

  return (
    <div className="flex min-h-dvh justify-center items-center bg-gray-100">
      <Sidebar />
      <div className="p-6 md:p-8 lg:p-10 xl:p-12 w-full lg:w-2/3 xl:w-1/2 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Realizar Novo Pedido
        </h2>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {warnMessage && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg text-center">
            {warnMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <div className="space-y-8">
          {step === 1 && (
            <>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Garçom
                </label>
                <select
                  value={idGarcom ?? ""}
                  onChange={(e) => setIdGarcom(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Selecione...</option>
                  {garcons.map((garcom) => (
                    <option key={garcom.id} value={garcom.id}>
                      {garcom.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Tipo de Pedido
                </label>
                <div className="flex flex-col sm:flex-row sm:space-x-6">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <input
                      type="radio"
                      id="pedido-interno"
                      name="tipo-pedido"
                      value="interno"
                      checked={tipoPedido === "interno"}
                      onChange={() => {
                        setTipoPedido("interno");
                        setNumeroMesa(null);
                        setNomeCliente("");
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="pedido-interno" className="text-gray-700">
                      Interno (Número da Mesa)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pedido-externo"
                      name="tipo-pedido"
                      value="externo"
                      checked={tipoPedido === "externo"}
                      onChange={() => {
                        setTipoPedido("externo");
                        setNumeroMesa(null);
                        setNomeCliente("");
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="pedido-externo" className="text-gray-700">
                      Externo (Nome do Cliente)
                    </label>
                  </div>
                </div>
              </div>

              {tipoPedido === "interno" && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Mesa
                  </label>
                  <select
                    value={numeroMesa ?? ""}
                    onChange={(e) => setNumeroMesa(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Selecione...</option>
                    {mesas.map((mesa) => (
                      <option key={mesa.id} value={mesa.numero}>
                        {mesa.numero}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {tipoPedido === "externo" && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Nome do Cliente
                  </label>
                  <input
                    type="text"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Digite o nome do cliente"
                  />
                </div>
              )}

              <div className="mb-6">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Avançar
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={categoriaSelecionada ?? ""}
                  onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Selecione...</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>

              {produtos.length > 0 && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Produto
                  </label>
                  <select
                    value={selectedProduto ?? ""}
                    onChange={(e) => setSelectedProduto(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Selecione...</option>
                    {produtos.map((produto) => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!isCategoriaDeBebida() && (
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Adicionais
                  </label>
                  <div className="space-y-2">
                    {adicionais.map((adicional) => (
                      <div key={adicional.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`adicional-${adicional.id}`}
                          checked={adicionaisSelecionados.includes(adicional.id)}
                          onChange={() =>
                            setAdicionaisSelecionados((prev) =>
                              prev.includes(adicional.id)
                                ? prev.filter((id) => id !== adicional.id)
                                : [...prev, adicional.id]
                            )
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`adicional-${adicional.id}`} className="text-gray-700">
                          {adicional.nome}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Quantidade
                </label>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  rows="3"
                  placeholder="Digite suas observações aqui..."
                />
              </div>

              <div className="mb-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-6 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition"
                >
                  Voltar
                </button>
                <button
                  onClick={handleAddItem}
                  className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Adicionar Item
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Itens do Pedido</h3>
                <ul className="space-y-4">
                  {itensPedido.map((item, index) => (
                    <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{item.nome_produto}</span>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          Remover
                        </button>
                      </div>
                      <div className="mt-2 text-gray-700">
                        <p>Quantidade: {item.quantidade}</p>
                        {item.observacoes && <p>Observações: {item.observacoes}</p>}
                        {item.adicionais.length > 0 && (
                          <div className="mt-2">
                            <p className="font-semibold">Adicionais:</p>
                            <ul className="list-disc ml-4">
                              {item.adicionais.map((adicional, idx) => (
                                <li key={idx}>
                                  {adicionais.find((a) => a.id === adicional.id_item_adicional)?.nome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Finalizar Pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidoForm;
