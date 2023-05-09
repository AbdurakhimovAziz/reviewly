import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createGoogleUserDto } from './dto/create-google-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  public async findOrCreate(createGoogleUserDto: createGoogleUserDto) {
    const { email } = createGoogleUserDto;
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user : new this.userModel(createGoogleUserDto).save();
  }

  public findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  public findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  public update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const options = { new: true };
    return this.userModel.findByIdAndUpdate(id, updateUserDto, options).exec();
  }

  public delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
