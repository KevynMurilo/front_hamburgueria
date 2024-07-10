export const mockPedidos = [
    {
      id: 1,
      numero_mesa: 3,
      id_garcom: 5,
      id_externo: 101,
      garcom: { nome: 'Ana' },
      externo: { nome_cliente: 'Lucas Oliveira' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'dinheiro',
      itens: [
        {
          produto: {
            nome: 'Hamburguer Clássico',
            descricao: 'Hamburguer com carne, queijo e alface',
            preco: 15.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Bacon',
                descricao: 'Bacon crocante',
                preco: 3.0,
              },
            },
          ],
          observacoes: 'Adicionar ketchup',
        },
      ],
    },
    {
      id: 2,
      numero_mesa: 1,
      id_garcom: 2,
      id_externo: 102,
      garcom: { nome: 'Carlos' },
      externo: { nome_cliente: 'Fernanda Lima' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'cartão',
      itens: [
        {
          produto: {
            nome: 'Pizza Margherita',
            descricao: 'Pizza com molho de tomate e queijo',
            preco: 25.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Azeitonas',
                descricao: 'Azeitonas pretas',
                preco: 2.0,
              },
            },
          ],
          observacoes: 'Sem cebola',
        },
      ],
    },
    {
      id: 3,
      numero_mesa: 2,
      id_garcom: 3,
      id_externo: 103,
      garcom: { nome: 'Juliana' },
      externo: { nome_cliente: 'Pedro Santos' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'pix',
      itens: [
        {
          produto: {
            nome: 'Spaghetti à Carbonara',
            descricao: 'Spaghetti com molho cremoso de bacon e queijo',
            preco: 18.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Parmesão',
                descricao: 'Queijo parmesão ralado',
                preco: 1.5,
              },
            },
          ],
          observacoes: 'Adicionar pimenta',
        },
      ],
    },
    {
      id: 4,
      numero_mesa: 4,
      id_garcom: 4,
      id_externo: 104,
      garcom: { nome: 'Bruna' },
      externo: { nome_cliente: 'Ricardo Almeida' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'cartão',
      itens: [
        {
          produto: {
            nome: 'Sopa de Abóbora',
            descricao: 'Sopa cremosa de abóbora com especiarias',
            preco: 12.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Servir bem quente',
        },
      ],
    },
    {
      id: 5,
      numero_mesa: 5,
      id_garcom: 1,
      id_externo: 105,
      garcom: { nome: 'João' },
      externo: { nome_cliente: 'Roberta Cruz' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'dinheiro',
      itens: [
        {
          produto: {
            nome: 'Salada Caesar',
            descricao: 'Salada com frango grelhado, queijo parmesão e croutons',
            preco: 14.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Molho Caesar',
                descricao: 'Molho Caesar à parte',
                preco: 1.0,
              },
            },
          ],
          observacoes: 'Adicionar molho extra',
        },
      ],
    },
    {
      id: 6,
      numero_mesa: 6,
      id_garcom: 6,
      id_externo: 106,
      garcom: { nome: 'Renata' },
      externo: { nome_cliente: 'Marcelo Silva' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'cartão',
      itens: [
        {
          produto: {
            nome: 'Tacos Mexicanos',
            descricao: 'Tacos com carne, feijão e vegetais',
            preco: 16.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Guacamole',
                descricao: 'Guacamole fresco',
                preco: 2.5,
              },
            },
          ],
          observacoes: 'Sem pimenta',
        },
      ],
    },
    {
      id: 7,
      numero_mesa: 7,
      id_garcom: 2,
      id_externo: 107,
      garcom: { nome: 'Carlos' },
      externo: { nome_cliente: 'Tatiane Costa' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'pix',
      itens: [
        {
          produto: {
            nome: 'Coxinha',
            descricao: 'Coxinha de frango com massa crocante',
            preco: 8.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Sem azeitona',
        },
      ],
    },
    {
      id: 8,
      numero_mesa: 8,
      id_garcom: 3,
      id_externo: 108,
      garcom: { nome: 'Juliana' },
      externo: { nome_cliente: 'Felipe Gomes' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'dinheiro',
      itens: [
        {
          produto: {
            nome: 'Sanduíche Vegetariano',
            descricao: 'Sanduíche com vegetais frescos e queijo',
            preco: 11.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Adicionar maionese',
        },
      ],
    },
    {
      id: 9,
      numero_mesa: 9,
      id_garcom: 4,
      id_externo: 109,
      garcom: { nome: 'Bruna' },
      externo: { nome_cliente: 'Camila Rocha' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'cartão',
      itens: [
        {
          produto: {
            nome: 'Risoto de Cogumelos',
            descricao: 'Risoto cremoso com cogumelos frescos',
            preco: 20.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Adicionar queijo',
        },
      ],
    },
    {
      id: 10,
      numero_mesa: 10,
      id_garcom: 5,
      id_externo: 110,
      garcom: { nome: 'Ana' },
      externo: { nome_cliente: 'Roberto Almeida' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'pix',
      itens: [
        {
          produto: {
            nome: 'Espaguete à Bolonhesa',
            descricao: 'Espaguete com molho à bolonhesa',
            preco: 17.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Adicionar queijo ralado',
        },
      ],
    },
    {
      id: 11,
      numero_mesa: 11,
      id_garcom: 6,
      id_externo: 111,
      garcom: { nome: 'Renata' },
      externo: { nome_cliente: 'Pedro Martins' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'dinheiro',
      itens: [
        {
          produto: {
            nome: 'Batata Frita',
            descricao: 'Batata frita crocante',
            preco: 6.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Queijo Cheddar',
                descricao: 'Queijo cheddar derretido',
                preco: 2.0,
              },
            },
          ],
          observacoes: 'Com ketchup',
        },
      ],
    },
    {
      id: 12,
      numero_mesa: 12,
      id_garcom: 1,
      id_externo: 112,
      garcom: { nome: 'João' },
      externo: { nome_cliente: 'Júlia Campos' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'cartão',
      itens: [
        {
          produto: {
            nome: 'Frango à Parmegiana',
            descricao: 'Frango empanado com molho de tomate e queijo',
            preco: 22.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Sem acompanhamento',
        },
      ],
    },
    {
      id: 13,
      numero_mesa: 13,
      id_garcom: 2,
      id_externo: 113,
      garcom: { nome: 'Carlos' },
      externo: { nome_cliente: 'Bruno Costa' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'pix',
      itens: [
        {
          produto: {
            nome: 'Hamburguer Vegano',
            descricao: 'Hamburguer vegano com legumes e queijo',
            preco: 17.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Maionese Vegana',
                descricao: 'Maionese vegana',
                preco: 1.5,
              },
            },
          ],
          observacoes: 'Sem queijo',
        },
      ],
    },
    {
      id: 14,
      numero_mesa: 14,
      id_garcom: 3,
      id_externo: 114,
      garcom: { nome: 'Juliana' },
      externo: { nome_cliente: 'Mariana Lima' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'dinheiro',
      itens: [
        {
          produto: {
            nome: 'Hot Dog',
            descricao: 'Cachorro-quente com salsicha e condimentos',
            preco: 9.0,
            produtoCategoria: [],
          },
          itensAdicionais: [
            {
              itemAdicional: {
                nome: 'Mostarda',
                descricao: 'Mostarda saborosa',
                preco: 0.5,
              },
            },
          ],
          observacoes: 'Sem cebola',
        },
      ],
    },
    {
      id: 15,
      numero_mesa: 15,
      id_garcom: 4,
      id_externo: 115,
      garcom: { nome: 'Bruna' },
      externo: { nome_cliente: 'Rafael Santos' },
      hora_pedido: new Date(),
      status: 'pendente',
      metodo_pagamento: 'cartão',
      itens: [
        {
          produto: {
            nome: 'Cheesecake',
            descricao: 'Cheesecake com calda de frutas vermelhas',
            preco: 12.0,
            produtoCategoria: [],
          },
          itensAdicionais: [],
          observacoes: 'Com calda extra',
        },
      ],
    },
  ];
  