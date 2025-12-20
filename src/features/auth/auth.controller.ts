import { Request, Response } from 'express';
export const AuthController = {
  async register(req: Request, res: Response) {
    return res.json({
      message: 'register successfully!',
    });
  },

  async login(req: Request, res: Response) {
    return res.json({
      message: 'register successfully!',
    });
  },
};
