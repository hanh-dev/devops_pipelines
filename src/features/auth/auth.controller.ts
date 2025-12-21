import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { LoginSchema, RegisterSchema } from './auth.schema';
export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = RegisterSchema.safeParse(req.body);

      if (!parsed.success) {
        throw parsed.error;
      }

      const user = await AuthService.register(req.body);
      return res.json({
        message: 'Register successfully!',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = LoginSchema.safeParse(req.body);

      if (!parsed.success) {
        throw parsed.error;
      }

      const result = await AuthService.login(req.body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
