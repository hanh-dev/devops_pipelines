import { User } from '../../generated/prisma/client';
import { AuthRepository } from './auth.repository';
import { LoginDTO, RegisterDTO } from './auth.type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ERROR_MESSAGES } from '../../constants/error';
export const AuthService = {
  async register(dto: RegisterDTO) {
    const isUserExists = await AuthRepository.findByEmail(dto.email);
    if (isUserExists) {
      throw new Error(ERROR_MESSAGES.EMAIL_EXISTS);
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const user: User = await AuthRepository.createUser({
      name: dto.name,
      email: dto.email,
      password: hashPassword,
    });

    return user;
  },

  async login(dto: LoginDTO) {
    const user = await AuthRepository.findByEmail(dto.email);

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
    }
    const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const { id, name, email } = user;
    return {
      user: { id, name, email },
      accessToken: token,
    };
  },
};
