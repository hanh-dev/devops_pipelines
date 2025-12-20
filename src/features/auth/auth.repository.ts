import { prisma } from '../../config/prisma';
import { User } from '../../generated/prisma/client';

export const AuthRepository = {
  async createUser(data: Omit<User, 'id'>) {
    return await prisma.user.create({
      data,
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },
};
