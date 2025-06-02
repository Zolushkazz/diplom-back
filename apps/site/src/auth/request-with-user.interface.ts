// auth/request-with-user.interface.ts
import { Request } from 'express';
import { User } from '../users/entities/users.entity';

export interface RequestWithUser extends Request {
  user: Partial<User> & { id: number }; // 'id' байгаа гэж үзнэ
}
