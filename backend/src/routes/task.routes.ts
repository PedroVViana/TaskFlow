import { Router } from 'express';
import { body, param } from 'express-validator';
import { taskController } from '../controllers/task.controller';
import { validate } from '../middlewares/validate';

const router = Router();

const taskValidation = [
  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('O título é obrigatório')
    .isLength({ min: 3, max: 100 })
    .withMessage('O título deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('A descrição deve ter no máximo 500 caracteres'),
  body('status')
    .optional()
    .isIn(['pendente', 'em_andamento', 'concluida'])
    .withMessage('Status deve ser: pendente, em_andamento ou concluida'),
];

const updateTaskValidation = [
  body('titulo')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O título não pode estar vazio')
    .isLength({ min: 3, max: 100 })
    .withMessage('O título deve ter entre 3 e 100 caracteres'),
  body('descricao')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('A descrição deve ter no máximo 500 caracteres'),
  body('status')
    .optional()
    .isIn(['pendente', 'em_andamento', 'concluida'])
    .withMessage('Status deve ser: pendente, em_andamento ou concluida'),
];

const idValidation = [
  param('id')
    .notEmpty()
    .withMessage('ID é obrigatório')
    .isMongoId()
    .withMessage('ID inválido'),
];

router.post('/tasks', validate(taskValidation), taskController.createTask.bind(taskController));
router.get('/tasks', taskController.getAllTasks.bind(taskController));
router.get('/tasks/:id', validate(idValidation), taskController.getTaskById.bind(taskController));
router.patch('/tasks/:id', validate([...idValidation, ...updateTaskValidation]), taskController.updateTask.bind(taskController));
router.delete('/tasks/:id', validate(idValidation), taskController.deleteTask.bind(taskController));

export default router;

