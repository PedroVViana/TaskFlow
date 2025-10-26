# 📋 TaskFlow - Backend API

API RESTful desenvolvida com Node.js, Express e TypeScript para gerenciamento de tarefas.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript 5.9.3** - Linguagem de programação
- **Express 5.1.0** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose 8.19.2** - ODM para MongoDB
- **express-validator 7.3.0** - Validação de dados
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts              # Configuração do MongoDB
│   ├── controllers/
│   │   └── task.controller.ts # Lógica de requisições HTTP
│   ├── middlewares/
│   │   ├── error.ts           # Tratamento de erros
│   │   └── validate.ts        # Validação de dados
│   ├── models/
│   │   └── Task.ts            # Schema do Mongoose
│   ├── routes/
│   │   └── task.routes.ts     # Definição das rotas
│   ├── services/
│   │   └── task.service.ts   # Lógica de negócio
│   ├── app.ts                 # Configuração do Express
│   └── server.ts              # Inicialização do servidor
├── package.json
└── tsconfig.json
```

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env
```

### Configuração do .env

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskflow
```

## ▶️ Executar

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Build de produção
npm run build

# Executar em produção
npm start
```

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000
```

### Tarefas

#### POST /tasks
Cria uma nova tarefa.

**Body:**
```json
{
  "titulo": "Nova tarefa",
  "descricao": "Descrição opcional",
  "status": "pendente"
}
```

**Validações:**
- `titulo`: Obrigatório, 3-100 caracteres
- `descricao`: Opcional, máximo 500 caracteres
- `status`: Opcional, valores: `pendente`, `em_andamento`, `concluida`

**Resposta (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "titulo": "Nova tarefa",
    "descricao": "Descrição opcional",
    "status": "pendente",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Tarefa criada com sucesso"
}
```

#### GET /tasks
Lista todas as tarefas.

**Resposta (200):**
```json
{
  "success": true,
  "data": [
    { ... }
  ],
  "message": "Tarefas recuperadas com sucesso"
}
```

#### GET /tasks/:id
Busca uma tarefa específica por ID.

**Parâmetros:**
- `id`: MongoDB ObjectId

**Resposta (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Tarefa recuperada com sucesso"
}
```

**Erro (404):**
```json
{
  "success": false,
  "message": "Tarefa não encontrada"
}
```

#### PATCH /tasks/:id
Atualiza uma tarefa existente.

**Parâmetros:**
- `id`: MongoDB ObjectId

**Body (todos os campos são opcionais):**
```json
{
  "titulo": "Título atualizado",
  "descricao": "Nova descrição",
  "status": "em_andamento"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Tarefa atualizada com sucesso"
}
```

#### DELETE /tasks/:id
Exclui uma tarefa.

**Parâmetros:**
- `id`: MongoDB ObjectId

**Resposta (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Tarefa excluída com sucesso"
}
```

## 🔒 Validações

O backend utiliza `express-validator` para validar todos os dados de entrada:

- **Título**: Obrigatório na criação, opcional na atualização (3-100 caracteres)
- **Descrição**: Opcional, máximo 500 caracteres
- **Status**: Opcional, deve ser um dos valores: `pendente`, `em_andamento`, `concluida`
- **ID**: Deve ser um MongoDB ObjectId válido

### Exemplo de Erro de Validação (400)

```json
{
  "success": false,
  "message": "Erro de validação",
  "errors": [
    {
      "msg": "O título é obrigatório",
      "param": "titulo",
      "location": "body"
    }
  ]
}
```

## 🐛 Tratamento de Erros

O middleware de erro centralizado trata os seguintes casos:

- **400**: Erro de validação ou ID inválido
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

### Formato de Erro

```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": [ ... ] // Apenas em erros de validação
}
```

## 🏗️ Arquitetura

### Camadas

1. **Routes** (`routes/`) - Define as rotas e validações
2. **Controllers** (`controllers/`) - Manipula requisições HTTP
3. **Services** (`services/`) - Contém a lógica de negócio
4. **Models** (`models/`) - Define os schemas do banco de dados
5. **Middlewares** (`middlewares/`) - Validação e tratamento de erros

### Fluxo de Requisição

```
Cliente → Routes → Middleware de Validação → Controller → Service → Model → MongoDB
                                      ↓
                                Controller ← Service ← Model
                                      ↓
                                    Response
```

## 📝 Modelo de Dados

### Task Schema

```typescript
{
  titulo: string;              // Obrigatório, 3-100 caracteres
  descricao?: string;           // Opcional, máximo 500 caracteres
  status: 'pendente' | 'em_andamento' | 'concluida'; // Default: 'pendente'
  createdAt: Date;              // Gerado automaticamente
  updatedAt: Date;             // Gerado automaticamente
}
```

## 🔍 Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## 🧪 Testes

Para adicionar testes (futuro):

```bash
npm install --save-dev jest @types/jest ts-jest
```

## 📚 Recursos Adicionais

- TypeScript com strict mode habilitado
- Validação de dados em todas as rotas
- Tratamento centralizado de erros
- CORS configurado para aceitar requisições do frontend
- Suporte a variáveis de ambiente

## 🤝 Contribuindo

Ao contribuir, siga os padrões de código existentes:

- Use TypeScript para type safety
- Mantenha a separação de responsabilidades
- Adicione validações adequadas
- Trate erros apropriadamente
- Documente novas funcionalidades

