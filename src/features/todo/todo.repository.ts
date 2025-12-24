import { prisma } from '@config/prisma';
import { CreateToDoDTO, TodoQueryDTO, UpdateToDoDTO } from './todo.type';

export const ToDoRepository = {
  async createToDoTask(dto: CreateToDoDTO) {
    const { userId, title, description, priority, status } = dto;
    return await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        status,
        user: {
          connect: { id: userId },
        },
      },
    });
  },

  async getTodos(query: TodoQueryDTO) {
    const { userId, status, priority } = query;
    return await prisma.todo.findMany({
      where: {
        userId,
        status,
        priority,
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getTodoById(id: number) {
    return await prisma.todo.findUnique({
      where: { id },
    });
  },

  async updateTodo(id: number, data: UpdateToDoDTO) {
    return await prisma.todo.update({
      where: { id },
      data,
    });
  },

  async deleteTodo(id: number) {
    return await prisma.todo.delete({
      where: { id },
    });
  },
};
