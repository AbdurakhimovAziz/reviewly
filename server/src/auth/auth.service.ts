import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/helpers/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    const isUserUnique = await this.isUserUnique(createUserDto.email);
    if (!isUserUnique) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: 'User created', success: true };
  }

  public async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);
    return { token };
  }

  public async grantAdminAccess(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    if (user.role === 'admin') {
      throw new BadRequestException('User is already an admin');
    }
    await this.usersService.update(user._id, { role: Role.Admin });
    return { message: 'User granted admin access', success: true };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
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
