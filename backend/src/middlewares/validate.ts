import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: errors.array(),
    });
  };
};

