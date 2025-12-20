import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/response';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    return errorResponse(res, err.message, 400);
  }

  return errorResponse(res, 'Something went wrong', 400);
};
