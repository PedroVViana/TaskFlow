import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  titulo: string;
  descricao?: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pendente', 'em_andamento', 'concluida'],
      default: 'pendente',
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>('Task', TaskSchema);

