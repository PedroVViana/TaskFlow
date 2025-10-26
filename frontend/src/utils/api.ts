import axios from 'axios';
import type { ApiResponse, Task, CreateTaskDTO, UpdateTaskDTO } from '../models/Task';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  },

  getTaskById: async (id: string): Promise<Task | null> => {
    const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data || null;
  },

  createTask: async (task: CreateTaskDTO): Promise<Task> => {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', task);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Erro ao criar tarefa');
    }
    return response.data.data;
  },

  updateTask: async (id: string, task: UpdateTaskDTO): Promise<Task> => {
    const response = await apiClient.patch<ApiResponse<Task>>(`/tasks/${id}`, task);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Erro ao atualizar tarefa');
    }
    return response.data.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<Task>>(`/tasks/${id}`);
  },
};

