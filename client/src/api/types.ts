import { User } from '../interfaces/User';

export type ServerResponse = {
  message: string;
  success: boolean;
};

export type ServerErrorResponse = {
  message: string;
  statusCode: number;
  error: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ServerResponse & {
  token: string;
  userId: string;
};
