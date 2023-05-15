import { User } from 'interfaces';
import { Role } from './enums';

export const isAdmin = (user: User) => user.role === Role.ADMIN;
export const isAllowedToModify = (user: User, userId: string) =>
  user._id === userId || isAdmin(user);
