# 📋 TaskFlow

Sistema completo de gerenciamento de tarefas desenvolvido com arquitetura full-stack, utilizando React no frontend e Node.js/Express no backend.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Express 5.1.0** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose 8.19.2** - ODM (Object Data Modeling) para MongoDB
- **express-validator 7.3.0** - Validação de dados de entrada
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 19.1.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite 7.1.7** - Build tool e dev server
- **Material UI 7.3.4** - Biblioteca de componentes React
- **Zustand 5.0.8** - Gerenciamento de estado global
- **Axios 1.12.2** - Cliente HTTP para requisições à API
- **Emotion** - Estilização CSS-in-JS

## 📁 Estrutura do Projeto

```
taskflow/
├── backend/                    # API Backend
│   ├── src/
│   │   ├── config/            # Configurações (banco de dados)
│   │   ├── controllers/      # Controladores (lógica de requisições)
│   │   ├── middlewares/      # Middlewares (validação, erro)
│   │   ├── models/           # Modelos de dados (Mongoose)
│   │   ├── routes/           # Rotas da API
│   │   ├── services/         # Serviços (lógica de negócio)
│   │   ├── app.ts            # Configuração do Express
│   │   └── server.ts         # Inicialização do servidor
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                  # Aplicação React
    ├── src/
    │   ├── controllers/      # Lógica de manipulação de dados
    │   ├── models/           # Definição de tipos TypeScript
    │   ├── store/            # Gerenciamento de estado (Zustand)
    │   ├── utils/            # Funções utilitárias (API client)
    │   ├── views/            # Componentes de UI
    │   ├── App.tsx           # Componente principal
    │   └── main.tsx          # Entry point
    ├── package.json
    └── vite.config.ts
```

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **MongoDB** (rodando localmente ou MongoDB Atlas)

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd taskflow
```

### 2. Configuração do Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz do backend
```

Crie o arquivo `.env` no diretório `backend/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow
```

### 3. Configuração do Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz do frontend
```

Crie o arquivo `.env` no diretório `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

## ▶️ Como Executar

### Backend

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

> **Nota:** Certifique-se de que o MongoDB está rodando antes de iniciar o backend.

## 📡 API Endpoints

### Tarefas (Tasks)

#### Criar Tarefa
```http
POST /tasks
Content-Type: application/json

{
  "titulo": "Nova tarefa",
  "descricao": "Descrição da tarefa (opcional)",
  "status": "pendente" // pendente | em_andamento | concluida
}
```

#### Listar Todas as Tarefas
```http
GET /tasks
```

#### Buscar Tarefa por ID
```http
GET /tasks/:id
```

#### Atualizar Tarefa
```http
PATCH /tasks/:id
Content-Type: application/json

{
  "titulo": "Título atualizado",
  "descricao": "Nova descrição",
  "status": "em_andamento"
}
```

#### Excluir Tarefa
```http
DELETE /tasks/:id
```

### Resposta da API

Todas as respostas seguem o formato:

```json
{
  "success": true,
  "data": { ... },
  "message": "Mensagem de sucesso"
}
```

Em caso de erro:

```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": [ ... ]
}
```

## 🎯 Funcionalidades

### Backend
- ✅ CRUD completo de tarefas
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros centralizado
- ✅ Conexão com MongoDB
- ✅ API RESTful
- ✅ Suporte a CORS

### Frontend
- ✅ Interface moderna e responsiva com Material UI
- ✅ Criar, listar, editar e excluir tarefas
- ✅ Filtro por status (Pendente, Em Andamento, Concluída)
- ✅ Gerenciamento de estado com Zustand
- ✅ Loading states e tratamento de erros
- ✅ Diálogos modais para edição e confirmação
- ✅ Formatação de datas em português

## 📝 Modelo de Dados

### Task

```typescript
{
  _id: string;
  titulo: string;              // Obrigatório, 3-100 caracteres
  descricao?: string;           // Opcional, máximo 500 caracteres
  status: 'pendente' | 'em_andamento' | 'concluida';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Scripts Disponíveis

### Backend

```bash
npm run dev      # Inicia servidor em modo desenvolvimento
npm run build    # Compila TypeScript para JavaScript
npm start        # Inicia servidor em produção
```

### Frontend

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🏗️ Arquitetura

### Backend - Padrão MVC

- **Models**: Definição dos schemas do Mongoose
- **Views**: Não aplicável (API REST)
- **Controllers**: Manipulação das requisições HTTP
- **Services**: Lógica de negócio
- **Routes**: Definição das rotas da API
- **Middlewares**: Validação e tratamento de erros

### Frontend - Padrão MVC Adaptado

- **Models**: Tipos TypeScript e interfaces
- **Views**: Componentes React (UI)
- **Controllers**: Hooks customizados para lógica de negócio
- **Store**: Gerenciamento de estado global (Zustand)
- **Utils**: Serviços de API e utilitários

## 🔒 Validações

### Criar Tarefa
- `titulo`: Obrigatório, 3-100 caracteres
- `descricao`: Opcional, máximo 500 caracteres
- `status`: Opcional, deve ser: pendente, em_andamento ou concluida

### Atualizar Tarefa
- Todos os campos são opcionais
- Se informados, seguem as mesmas regras de validação

## 🐛 Tratamento de Erros

O backend possui middleware centralizado de tratamento de erros que retorna respostas padronizadas:

- **400**: Erro de validação
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

## 📚 Recursos Adicionais

- TypeScript em todo o projeto para type safety
- Validação de dados no backend e frontend
- Interface responsiva e moderna
- Código organizado seguindo boas práticas
- Separação clara de responsabilidades

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como parte de um projeto de gerenciamento de tarefas.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

