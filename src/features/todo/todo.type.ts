import { z } from 'zod';
import { TodoPriorityEnum } from './todo.schema';
export interface CreateToDoDTO {
  title: string;
  description?: string;
  priority: z.infer<typeof TodoPriorityEnum>;
}
