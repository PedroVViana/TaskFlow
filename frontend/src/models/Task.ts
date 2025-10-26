export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';

export interface Task {
  _id: string;
  titulo: string;
  descricao?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  titulo: string;
  descricao?: string;
  status?: TaskStatus;
}

export interface UpdateTaskDTO {
  titulo?: string;
  descricao?: string;
  status?: TaskStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ msg: string; param: string }>;
}

