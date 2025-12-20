import { Response } from 'express';
export const errorResponse = <T>(
  res: Response,
  error: T,
  statusCode: number,
) => {
  return res.status(statusCode).json({
    success: false,
    error,
  });
};
