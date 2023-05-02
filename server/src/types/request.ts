import { Request } from 'express';
import { Role } from 'src/constants';

export type RequestWithUser = Request & {
  user: { sub: string; role: Role; email: string };
};
