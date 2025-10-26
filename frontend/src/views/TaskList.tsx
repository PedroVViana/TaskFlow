import { useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { useTaskStore } from '../store/taskStore';
import { useTaskController } from '../controllers/taskController';
import { TaskCard } from './TaskCard';

export const TaskList = () => {
  const { tasks, loading, error } = useTaskStore();
  const { handleFetchTasks } = useTaskController();

  useEffect(() => {
    handleFetchTasks();
  }, []);

  if (loading && tasks.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          Nenhuma tarefa encontrada
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Crie sua primeira tarefa usando o formulário acima
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </Stack>
  );
};

