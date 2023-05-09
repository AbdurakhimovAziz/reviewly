import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorMessages, Role, SuccessMessages } from 'src/helpers/enums';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CLIENT_URL } from 'src/helpers/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    const isUserUnique = await this.isUserUnique(createUserDto.email);
    if (!isUserUnique) {
      throw new ConflictException(ErrorMessages.USER_EXISTS);
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: SuccessMessages.USER_CREATED, success: true };
  }

  public async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }
    const token = this.generateToken(user);
    return {
      token,
      userId: user.id,
      message: SuccessMessages.LOGIN_SUCCESSFUL,
      success: true,
    };
  }

  public async grantAdminAccess(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    if (user.role === Role.Admin) {
      throw new BadRequestException(ErrorMessages.ALREADY_ADMIN);
    }
    await this.usersService.update(user._id, { role: Role.Admin });
    return { message: SuccessMessages.USER_GRANTED_ADMIN, success: true };
  }

  public async googleAuthRedirect(user: User) {
    const token = this.generateToken(user);
    return {
      url: `${CLIENT_URL}?token=${token}&userId=${user._id}`,
    };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.googleId) return null;
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  private generateToken = (user: User) => {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return this.jwtService.sign(payload);
  };

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private isUserUnique = async (email: string) => {
    return !(await this.usersService.findByEmail(email));
  };
}
