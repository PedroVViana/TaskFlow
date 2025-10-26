import type { Request, Response } from 'express';
import { taskService } from '../services/task.service';
import type { ITask } from '../models/Task';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.createTask(req.body);
      const response: ApiResponse<ITask> = {
        success: true,
        data: task,
        message: 'Tarefa criada com sucesso',
      };
      res.status(201).json(response);
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      const response: ApiResponse<ITask[]> = {
        success: true,
        data: tasks,
        message: 'Tarefas recuperadas com sucesso',
      };
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: 'ID é obrigatório' });
        return;
      }
      const task = await taskService.getTaskById(id);

      if (!task) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'Tarefa não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<ITask> = {
        success: true,
        data: task,
        message: 'Tarefa recuperada com sucesso',
      };
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: 'ID é obrigatório' });
        return;
      }
      const task = await taskService.updateTask(id, req.body);

      if (!task) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'Tarefa não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<ITask> = {
        success: true,
        data: task,
        message: 'Tarefa atualizada com sucesso',
      };
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: 'ID é obrigatório' });
        return;
      }
      const task = await taskService.deleteTask(id);

      if (!task) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'Tarefa não encontrada',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<ITask> = {
        success: true,
        data: task,
        message: 'Tarefa excluída com sucesso',
      };
      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
}

export const taskController = new TaskController();

