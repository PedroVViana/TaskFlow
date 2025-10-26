# 🎨 TaskFlow - Frontend

Aplicação React moderna com TypeScript para gerenciamento de tarefas, integrada com a API backend.

## 🚀 Tecnologias

- **React 19.1.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.9.3** - Tipagem estática
- **Vite 7.1.7** - Build tool e dev server
- **Material UI 7.3.4** - Biblioteca de componentes React
- **Zustand 5.0.8** - Gerenciamento de estado global
- **Axios 1.12.2** - Cliente HTTP para comunicação com API
- **Emotion** - Estilização CSS-in-JS
- **@mui/icons-material** - Ícones Material Design

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── controllers/
│   │   └── taskController.ts  # Hooks para lógica de negócio
│   ├── models/
│   │   └── Task.ts            # Tipos TypeScript e interfaces
│   ├── store/
│   │   └── taskStore.ts       # Estado global (Zustand)
│   ├── utils/
│   │   └── api.ts             # Cliente Axios e funções de API
│   ├── views/
│   │   ├── TaskForm.tsx       # Formulário de criação
│   │   ├── TaskList.tsx       # Lista de tarefas
│   │   └── TaskCard.tsx       # Card individual de tarefa
│   ├── App.tsx                # Componente principal
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais
├── package.json
├── vite.config.ts
└── .env
```

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
```

### Configuração do .env

```env
VITE_API_URL=http://localhost:3000
```

## ▶️ Executar

```bash
# Modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linter
npm run lint
```

A aplicação estará disponível em `http://localhost:5173`

## 🎯 Funcionalidades

### ✅ Gerenciamento de Tarefas

- **Criar Tarefa**: Formulário com validação para criar novas tarefas
- **Listar Tarefas**: Visualização de todas as tarefas cadastradas
- **Editar Tarefa**: Modal com formulário para edição
- **Excluir Tarefa**: Confirmação antes de excluir
- **Filtro por Status**: Visualização por status (Pendente, Em Andamento, Concluída)

### 🎨 Interface

- Design moderno e responsivo com Material UI
- Tema personalizado e consistente
- Loading states durante operações assíncronas
- Tratamento de erros com mensagens amigáveis
- Diálogos modais para ações importantes
- Formatação de datas em português (pt-BR)

## 🏗️ Arquitetura

### Padrão MVC Adaptado

#### Models (`models/`)
Define os tipos TypeScript e interfaces:

```typescript
export interface Task {
  _id: string;
  titulo: string;
  descricao?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
```

#### Controllers (`controllers/`)
Hooks customizados que encapsulam a lógica de negócio:

```typescript
export const useTaskController = () => {
  const { fetchTasks, createTask, updateTask, deleteTask } = useTaskStore();
  // ... lógica de manipulação
};
```

#### Views (`views/`)
Componentes React de apresentação:

- **TaskForm**: Formulário para criar tarefas
- **TaskList**: Lista todas as tarefas
- **TaskCard**: Card individual com ações de editar/excluir

#### Store (`store/`)
Gerenciamento de estado global com Zustand:

```typescript
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => { ... },
  // ...
}));
```

#### Utils (`utils/`)
Funções utilitárias e cliente de API:

```typescript
export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => { ... },
  createTask: async (task: CreateTaskDTO): Promise<Task> => { ... },
  // ...
};
```

## 🔄 Fluxo de Dados

```
User Action → View Component → Controller Hook → Zustand Store → API Service → Backend
                                                                    ↓
                                      State Update ← API Response ← Backend
```

## 📦 Componentes Principais

### TaskForm
Formulário para criação de tarefas com validação em tempo real.

**Props:** Nenhuma (utiliza store)

**Features:**
- Validação de título obrigatório
- Campo de descrição opcional
- Seleção de status
- Estado de loading durante criação

### TaskList
Componente que lista todas as tarefas.

**Props:** Nenhuma (utiliza store)

**Features:**
- Carregamento automático ao montar
- Loading state inicial
- Mensagem quando não há tarefas
- Exibição de erros

### TaskCard
Card individual para cada tarefa.

**Props:**
```typescript
{
  task: Task;
}
```

**Features:**
- Exibição de título, descrição e status
- Chip colorido para status
- Botões de editar e excluir
- Modal de edição
- Dialog de confirmação de exclusão
- Formatação de data

## 🎨 Temas e Estilização

### Material UI Theme

```typescript
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});
```

### Status Colors

- **Pendente**: Gray (default)
- **Em Andamento**: Blue (primary)
- **Concluída**: Green (success)

## 🔌 Integração com API

O frontend utiliza Axios para comunicação com o backend:

```typescript
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Endpoints Utilizados

- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `GET /tasks/:id` - Buscar tarefa por ID
- `PATCH /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Excluir tarefa

## 🐛 Tratamento de Erros

- Erros da API são capturados e exibidos ao usuário
- Estados de loading durante operações assíncronas
- Validação de formulários antes do envio
- Mensagens de erro amigáveis

## ⚡ Performance

- Estado global otimizado com Zustand
- Re-renderizações mínimas
- Componentes funcionais com hooks
- Loading states para melhor UX

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL da API backend | `http://localhost:3000` |

## 🧪 Testes (Futuro)

Para adicionar testes:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 📚 Recursos Adicionais

- ✅ TypeScript com tipagem forte
- ✅ Componentes reutilizáveis
- ✅ Hooks customizados
- ✅ Estado global com Zustand
- ✅ Validação de formulários
- ✅ Tratamento de erros
- ✅ Loading states
- ✅ Interface moderna e intuitiva

## 🤝 Contribuindo

Ao contribuir, siga os padrões:

- Use componentes funcionais
- Hooks customizados para lógica complexa
- Zustand para estado global
- Material UI para componentes
- TypeScript para type safety
- Código limpo e documentado

## 🔗 Links Úteis

- [React Documentation](https://react.dev)
- [Material UI Documentation](https://mui.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
