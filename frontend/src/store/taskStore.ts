import { create } from 'zustand';
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/Task';
import { taskApi } from '../utils/api';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskDTO) => Promise<void>;
  updateTask: (id: string, task: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await taskApi.getAllTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao carregar tarefas',
        loading: false,
      });
    }
  },

  createTask: async (task: CreateTaskDTO) => {
    set({ loading: true, error: null });
    try {
      const newTask = await taskApi.createTask(task);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao criar tarefa',
        loading: false,
      });
      throw error;
    }
  },

  updateTask: async (id: string, task: UpdateTaskDTO) => {
    set({ loading: true, error: null });
    try {
      const updatedTask = await taskApi.updateTask(id, task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === id ? updatedTask : t)),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao atualizar tarefa',
        loading: false,
      });
      throw error;
    }
  },

  deleteTask: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await taskApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao excluir tarefa',
        loading: false,
      });
      throw error;
    }
  },
}));

