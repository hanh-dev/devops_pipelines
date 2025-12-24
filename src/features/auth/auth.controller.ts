import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { RegisterSchema } from './auth.schema';
import { HttpStatus } from '@constants/enum';
export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = RegisterSchema.safeParse(req.body);

      if (!parsed.success) {
        throw parsed.error;
      }

      const result = await AuthService.register(req.body);
      return res.status(HttpStatus.Ok).json(result);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);

      return res.status(HttpStatus.Ok).json(result);
    } catch (error) {
      next(error);
    }
  },
};
