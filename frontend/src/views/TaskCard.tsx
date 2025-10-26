import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTaskStore } from '../store/taskStore';
import { useTaskController } from '../controllers/taskController';
import type { Task, TaskStatus } from '../models/Task';

interface TaskCardProps {
  task: Task;
}

const statusColors: Record<TaskStatus, 'default' | 'primary' | 'success'> = {
  pendente: 'default',
  em_andamento: 'primary',
  concluida: 'success',
};

const statusLabels: Record<TaskStatus, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída',
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: task.titulo,
    descricao: task.descricao || '',
    status: task.status,
  });

  const { loading } = useTaskStore();
  const { handleUpdateTask, handleDeleteTask } = useTaskController();

  const handleEditClick = () => {
    setFormData({
      titulo: task.titulo,
      descricao: task.descricao || '',
      status: task.status,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await handleUpdateTask(task._id, formData);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await handleDeleteTask(task._id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h6">{task.titulo}</Typography>
                <Chip
                  label={statusLabels[task.status]}
                  color={statusColors[task.status]}
                  size="small"
                />
              </Box>
              {task.descricao && (
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {task.descricao}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                Criada em: {formatDate(task.createdAt)}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleEditClick} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDeleteClick} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Título"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                label="Status"
              >
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="em_andamento">Em Andamento</MenuItem>
                <MenuItem value="concluida">Concluída</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditSubmit} variant="contained" disabled={loading}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a tarefa &quot;{task.titulo}&quot;?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" disabled={loading}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

