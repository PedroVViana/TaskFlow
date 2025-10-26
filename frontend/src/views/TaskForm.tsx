import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useTaskStore } from '../store/taskStore';
import { useTaskController } from '../controllers/taskController';
import type { CreateTaskDTO, TaskStatus } from '../models/Task';

export const TaskForm = () => {
  const [formData, setFormData] = useState<CreateTaskDTO>({
    titulo: '',
    descricao: '',
    status: 'pendente',
  });

  const { loading, error } = useTaskStore();
  const { handleCreateTask } = useTaskController();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleCreateTask(formData);
      setFormData({
        titulo: '',
        descricao: '',
        status: 'pendente',
      });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Nova Tarefa
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Título"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              required
              fullWidth
              disabled={loading}
            />
            <TextField
              label="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              multiline
              rows={3}
              fullWidth
              disabled={loading}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                label="Status"
                disabled={loading}
              >
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="em_andamento">Em Andamento</MenuItem>
                <MenuItem value="concluida">Concluída</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !formData.titulo.trim()}
              fullWidth
            >
              {loading ? 'Criando...' : 'Criar Tarefa'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

