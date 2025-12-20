import { User } from '../../generated/prisma/client';
import { AuthRepository } from './auth.repository';
import { RegisterDTO } from './auth.type';
import bcrypt from 'bcrypt';
export const AuthService = {
  async register(dto: RegisterDTO) {
    const isUserExists = await AuthRepository.findByEmail(dto.email);
    if (isUserExists) {
      throw new Error('User Exists!');
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const user: User = await AuthRepository.createUser({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  },
};
