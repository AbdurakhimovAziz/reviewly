import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { Endpoints } from 'src/helpers/constants';
import { EnvVariableMap } from 'src/helpers/enums';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get(EnvVariableMap.GITHUB_CLIENT_ID),
      clientSecret: configService.get(EnvVariableMap.GITHUB_CLIENT_SECRET),
      callbackURL: `${Endpoints.AUTH.BASE}${Endpoints.AUTH.GITHUB_REDIRECT}`,
      scope: ['user:email'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { emails, id, username } = profile;
    const newUser = {
      email: emails[0].value,
      username: username,
      githubId: id,
    };

    return this.usersService.findAndUpdateOrCreate(newUser);
  }
}
