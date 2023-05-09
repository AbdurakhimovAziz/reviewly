import { CreateUserDto } from './create-user.dto';

export class createSocialUserDto {
  email: string;
  username: string;
  googleId?: string;
  githubId?: string;
}
