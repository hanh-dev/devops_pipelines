import { prisma } from '../../config/prisma';
import { CreateToDoDTO } from './todo.type';

export const ToDoRepository = {
  async createToDoTask(dto: CreateToDoDTO, userId: number) {
    const { title, description, priority } = dto;
    return await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        user: {
          connect: { id: userId },
        },
      },
    });
  },
};
