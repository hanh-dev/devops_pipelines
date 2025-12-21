import { User } from '../../generated/prisma/client';
import { AuthRepository } from './auth.repository';
import { LoginDTO, RegisterDTO } from './auth.type';
import jwt from 'jsonwebtoken';
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

  async login(dto: LoginDTO) {
    const user = await AuthRepository.findByEmail(dto.email);

    if (!user) {
      throw new Error('User not found!');
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Password is not correct!');
    }
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    return {
      user,
      accessToken: token,
    };
  },
};
