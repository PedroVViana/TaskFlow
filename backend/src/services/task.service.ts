import { Task } from '../models/Task';
import type { ITask } from '../models/Task';

export interface CreateTaskDTO {
  titulo: string;
  descricao?: string;
  status?: 'pendente' | 'em_andamento' | 'concluida';
}

export interface UpdateTaskDTO {
  titulo?: string;
  descricao?: string;
  status?: 'pendente' | 'em_andamento' | 'concluida';
}

export class TaskService {
  async createTask(data: CreateTaskDTO): Promise<ITask> {
    const task = new Task(data);
    return await task.save();
  }

  async getAllTasks(): Promise<ITask[]> {
    return await Task.find().sort({ createdAt: -1 });
  }

  async getTaskById(id: string): Promise<ITask | null> {
    return await Task.findById(id);
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteTask(id: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(id);
  }
}

export const taskService = new TaskService();

