import { Request, Response, NextFunction } from 'express';
import { ToDoService } from './todo.service';
import {
  CreateTodoSchema,
  TodoIdSchema,
  TodoQuerySchema,
  UpdateTodoSchema,
} from './todo.schema';
import { HttpStatus } from '../../constants/enum';

export const ToDoController = {
  async createNewTask(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = CreateTodoSchema.safeParse(req.body);

      if (!parsed.success) {
        throw parsed.error;
      }
      const result = await ToDoService.createToDoTask(parsed.data);
      return res.status(HttpStatus.Ok).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = TodoQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        throw parsed.error;
      }

      const todos = await ToDoService.getTodos(parsed.data);
      return res.status(HttpStatus.Ok).json(todos);
    } catch (error) {
      next(error);
    }
  },

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = TodoIdSchema.safeParse(req.params);
      if (!parsed.success) {
        throw parsed.error;
      }

      const todo = await ToDoService.getTodoById(parsed.data.id);
      return res.status(HttpStatus.Ok).json(todo);
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const params = TodoIdSchema.safeParse(req.params);
      if (!params.success) {
        throw params.error;
      }

      const body = UpdateTodoSchema.safeParse(req.body);
      if (!body.success) {
        throw body.error;
      }

      const todo = await ToDoService.updateToDo(params.data.id, body.data);
      return res.status(HttpStatus.Ok).json(todo);
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const params = TodoIdSchema.safeParse(req.params);
      if (!params.success) {
        throw params.error;
      }

      const deleted = await ToDoService.deleteToDo(params.data.id);
      return res.status(HttpStatus.Ok).json(deleted);
    } catch (error) {
      next(error);
    }
  },
};
