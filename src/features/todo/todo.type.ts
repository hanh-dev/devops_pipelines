import { z } from 'zod';
import { TodoPriorityEnum, TodoStatusEnum } from './todo.schema';

export type TodoStatus = z.infer<typeof TodoStatusEnum>;
export type TodoPriority = z.infer<typeof TodoPriorityEnum>;

export interface CreateToDoDTO {
  userId: number;
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}

export interface UpdateToDoDTO {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}

export interface TodoQueryDTO {
  userId: number;
  status?: TodoStatus;
  priority?: TodoPriority;
}
