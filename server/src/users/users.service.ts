import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, createSocialUserDto } from './dto';
import { User } from './schemas/user.schema';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly postsService: PostsService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  public async findAndUpdateOrCreate(createSocialUserDto: createSocialUserDto) {
    const { email, githubId, googleId } = createSocialUserDto;
    const user = await this.userModel
      .findOneAndUpdate(
        { email },
        {
          githubId,
          googleId,
        },
        { new: true },
      )
      .exec();
    return user ? user : new this.userModel(createSocialUserDto).save();
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

  public async getPosts(id: string) {
    return this.postsService.findByAuthor(id);
  }

  public update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const options = { new: true };
    return this.userModel.findByIdAndUpdate(id, updateUserDto, options).exec();
  }

  public delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
