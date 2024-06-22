# Node.js CRUD API

Este é um projeto de uma API CRUD (Create, Read, Update, Delete) desenvolvida em Node.js, utilizando Express.js, MySQL, e JWT para autenticação. A API possui endpoints para gerenciar clientes, produtos e usuários.

## Funcionalidades

- Autenticação de usuários utilizando JWT
- Operações CRUD para clientes e produtos
- Caching de requisições para clientes com invalidação de cache em operações de modificação
- Logs de requisições para cache e banco de dados

## Estrutura do Projeto

```plaintext
project-folder/
│
├── configs/
│   ├── cache.js        # Configuração de caching
│   ├── db.js           # Configuração de conexão com o banco de dados
│   └── logger.js       # Configuração de logging
├── controllers/
│   ├── clienteController.js  # Lógica de negócios para clientes
│   ├── produtoController.js  # Lógica de negócios para produtos
│   └── usuarioController.js  # Lógica de negócios para usuários
├── middlewares/
│   └── authMiddleware.js     # Middleware de autenticação JWT
├── models/
│   ├── createTables.sql      # Script SQL para criação de tabelas
├── routes/
│   ├── clientes.js           # Rotas para clientes
│   ├── produtos.js           # Rotas para produtos
│   └── usuarios.js           # Rotas para usuários
├── services/
│   ├── clientesService.js    # Serviços para clientes
│   ├── produtosService.js    # Serviços para produtos
│   └── usuariosService.js    # Serviços para usuários
├── views/
│   └── index.jade            # Template Jade
├── .env                      # Variáveis de ambiente
├── .gitignore                # Arquivos e pastas ignorados pelo git
├── package.json              # Dependências e scripts do projeto
├── README.md                 # Documentação do projeto
└── index.js                  # Arquivo principal do servidor
