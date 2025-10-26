import { useTaskStore } from '../store/taskStore';
import type { CreateTaskDTO, UpdateTaskDTO } from '../models/Task';

export const useTaskController = () => {
  const { fetchTasks, createTask, updateTask, deleteTask } = useTaskStore();

  const handleFetchTasks = async () => {
    await fetchTasks();
  };

  const handleCreateTask = async (task: CreateTaskDTO) => {
    await createTask(task);
  };

  const handleUpdateTask = async (id: string, task: UpdateTaskDTO) => {
    await updateTask(id, task);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  return {
    handleFetchTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};

