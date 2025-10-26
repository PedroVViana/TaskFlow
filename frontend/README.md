# TaskFlow - Frontend

Aplicação React com TypeScript para gerenciamento de tarefas.

## 🚀 Tecnologias

- React 19
- TypeScript
- Material UI
- Zustand (gerenciamento de estado)
- Axios (comunicação com API)
- Vite (build tool)

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Lógica de manipulação de dados
├── models/          # Definição de tipos de dados
├── services/        # Funções de interação com APIs
├── store/           # Gerenciamento de estado (Zustand)
├── utils/           # Funções utilitárias
└── views/           # Componentes de apresentação da UI
```

## 🛠️ Instalação

```bash
npm install
```

## ▶️ Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:3000
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 📋 Funcionalidades

- ✅ Criar tarefas
- ✅ Listar todas as tarefas
- ✅ Editar tarefas
- ✅ Excluir tarefas
- ✅ Filtrar por status (Pendente, Em Andamento, Concluída)

## 🔗 Integração com Backend

A aplicação se conecta com a API backend rodando em `http://localhost:3000` por padrão.

Certifique-se de que o backend está rodando antes de iniciar o frontend.
