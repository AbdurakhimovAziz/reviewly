import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Request,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CLIENT_URL, Endpoints } from 'src/helpers/constants';
import { Public, Roles } from 'src/helpers/decorators';
import { Role } from 'src/helpers/enums';
import { RequestWithUser } from 'src/helpers/types';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { GrantAdminDto, LoginDto, RegisterDto } from './dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller(Endpoints.AUTH.BASE)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(Endpoints.AUTH.REGISTER)
  @Public()
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post(Endpoints.AUTH.LOGIN)
  @Public()
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get(Endpoints.AUTH.PROFILE)
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @Post(Endpoints.AUTH.GRANT_ADMIN)
  async grantAdminAccess(@Body() body: GrantAdminDto) {
    return this.authService.grantAdminAccess(body.email);
  }

  @Get(Endpoints.AUTH.GOOGLE)
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get(Endpoints.AUTH.GOOGLE_REDIRECT)
  @Public()
  @UseGuards(GoogleOauthGuard)
  @Redirect(CLIENT_URL)
  async googleAuthRedirect(@Request() req: Request & { user: User }) {
    return this.authService.googleAuthRedirect(req.user);
  }
}
