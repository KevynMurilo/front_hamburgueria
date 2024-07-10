import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useRestauranteContext } from "../../contexts/PedidoContext";

const PedidoForm = () => {
  const {
    garcons,
    categorias,
    mesas,
    adicionais,
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

  useEffect(() => {
    if (categoriaSelecionada !== null) {
      fetchProdutosByCategoria(categoriaSelecionada).then((produtos) => {
        setProdutos(produtos);
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
          adicionais:
            categoriaSelecionada === 1
              ? adicionaisSelecionados.map((id_item_adicional) => ({
                  id_item_adicional,
                }))
              : [],
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

        if (printStatus === "successo") {
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

  return (
    <div className="flex min-h-dvh bg-gray-100">
      <Sidebar />
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-3xl m-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Realizar Novo Pedido
        </h2>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-black text-black rounded-md text-center">
            {successMessage}
          </div>
        )}

        {warnMessage && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-md text-center">
            {warnMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Garçom
            </label>
            <select
              value={idGarcom ?? ""}
              onChange={(e) => setIdGarcom(Number(e.target.value))}
              className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
            >
              <option value="">Selecione...</option>
              {garcons.map((garcom) => (
                <option key={garcom.id} value={garcom.id}>
                  {garcom.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Tipo de Pedido
            </label>
            <div className="flex flex-col gap-2 lg:gap-0 lg:flex lg:flex-row lg:space-x-4">
              <div className="flex items-center">
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
            <div>
              <label className="block font-medium text-gray-700 text-lg">
                Mesa
              </label>
              <select
                value={numeroMesa ?? ""}
                onChange={(e) => setNumeroMesa(Number(e.target.value))}
                className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
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
            <div>
              <label className="block font-medium text-gray-700 text-lg">
                Nome do Cliente
              </label>
              <input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
              />
            </div>
          )}

          <div>
            <label className="block font-medium text-gray-700 text-lg">
              Categoria
            </label>
            <select
              value={categoriaSelecionada ?? ""}
              onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}
              className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
            >
              <option value="">Selecione uma Categoria...</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          {categoriaSelecionada && (
            <div>
              <label className="block font-medium text-gray-700 text-lg">
                Produto
              </label>
              <select
                value={selectedProduto ?? ""}
                onChange={(e) => setSelectedProduto(Number(e.target.value))}
                className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
              >
                <option value="">Selecione um Produto...</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedProduto && (
            <>
              <div>
                <label className="block font-medium text-gray-700 text-lg">
                  Quantidade
                </label>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  min="1"
                  className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 text-lg">
                  Observações
                </label>
                <input
                  type="text"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg p-2"
                />
              </div>

              {categoriaSelecionada === 1 && (
                <div>
                  <label className="block font-medium text-gray-700 text-lg">
                    Itens Adicionais
                  </label>
                  {adicionais.map((adicional) => (
                    <div key={adicional.id} className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id={`adicional-${adicional.id}`}
                        value={adicional.id}
                        checked={adicionaisSelecionados.includes(adicional.id)}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          if (e.target.checked) {
                            setAdicionaisSelecionados([
                              ...adicionaisSelecionados,
                              id,
                            ]);
                          } else {
                            setAdicionaisSelecionados(
                              adicionaisSelecionados.filter(
                                (item) => item !== id
                              )
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`adicional-${adicional.id}`}
                        className="text-gray-700"
                      >
                        {adicional.nome}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <button
            type="button"
            onClick={handleAddItem}
            className="block w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 text-lg"
          >
            Adicionar Item
          </button>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              Itens do Pedido
            </h3>
            <ul className="space-y-2">
              {itensPedido.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-3 border rounded-md shadow"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.nome_produto}
                    </p>
                    <p className="text-gray-600">
                      Quantidade: {item.quantidade}
                    </p>
                    <p className="text-gray-600">
                      Observações: {item.observacoes}
                    </p>
                    {item.adicionais.length > 0 && (
                      <p className="text-gray-600">
                        Adicionais:{" "}
                        {item.adicionais
                          .map(
                            (adicional) =>
                              adicionais.find(
                                (a) => a.id === adicional.id_item_adicional
                              )?.nome
                          )
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition duration-150"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="block w-full py-3 px-5 bg-green-500 text-white font-bold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition duration-150 text-lg"
          >
            Concluir Pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default PedidoForm;
