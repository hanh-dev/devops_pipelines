import { z } from 'zod';

export const TodoStatusEnum = z.enum(['PENDING', 'COMPLETED']);

export const TodoPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);

export const CreateTodoSchema = z.object({
  userId: z.coerce.number().int().positive({ message: 'userId is required' }),
  title: z.string({ message: 'Title is required' }).min(1, 'Title cannot be empty'),
  description: z.string().optional(),
  status: TodoStatusEnum.optional().default('PENDING'),
  priority: TodoPriorityEnum.optional().default('MEDIUM'),
});

export const UpdateTodoSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: TodoStatusEnum.optional(),
    priority: TodoPriorityEnum.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const TodoQuerySchema = z.object({
  userId: z.coerce.number().int().positive({ message: 'userId is required' }),
  status: TodoStatusEnum.optional(),
  priority: TodoPriorityEnum.optional(),
});

export const TodoIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
