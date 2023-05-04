import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Role } from 'src/helpers/constants';
import { Public, Roles } from 'src/helpers/decorators';
import { RequestWithUser } from 'src/helpers/types';
import { AuthService } from './auth.service';
import { GrantAdminDto, LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @Post('grant-admin')
  async grantAdminAccess(@Body() body: GrantAdminDto) {
    return this.authService.grantAdminAccess(body.email);
  }
}
