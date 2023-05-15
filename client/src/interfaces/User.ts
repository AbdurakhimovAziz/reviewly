import { Role } from 'utils';

export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
}

export interface UserWithPassword extends User {
  password: string;
}
