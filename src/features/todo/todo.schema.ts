import { z } from 'zod';

export const TodoStatusEnum = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']);

export const TodoPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const CreateTodoSchema = z.object({
  body: z.object({
    title: z
      .string({ error: 'Title is required' })
      .min(1, 'Title cannot be empty'),

    description: z.string().optional(),

    status: TodoStatusEnum.optional().default('PENDING'),

    priority: TodoPriorityEnum.optional().default('MEDIUM'),
  }),
});
