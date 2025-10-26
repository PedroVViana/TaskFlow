import type { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erro capturado:', err);

  if (err instanceof Error.CastError) {
    res.status(400).json({
      success: false,
      message: 'ID inválido',
    });
    return;
  }

  if (err instanceof Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => e.message);
    res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

