import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessages, PostSortParams } from 'src/helpers/enums';
import { TagsService } from 'src/tags/tags.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from './schemas/post.schema';
import { mockPosts } from 'src/helpers/constants/mockPosts';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private tagsService: TagsService,
  ) {
    // this.postModel.insertMany(mockPosts);
  }

  public async create(createPostDto: CreatePostDto) {
    const { tagNames, ...post } = createPostDto;
    await this.tagsService.updateOrCreateTags(tagNames);
    const tags = await this.tagsService.findMany(tagNames);
    const tagIds = tags.map((tag) => tag._id);
    return this.postModel.create({ ...post, tags: tagIds });
  }

  public async findAll(
    limit: number = 10,
    page: number = 1,
    sortBy: PostSortParams = PostSortParams.DATE,
    tagName?: string,
  ) {
    const skip = (page - 1) * limit;
    let query = {};

    if (tagName) {
      const tag = await this.tagsService.findByName(tagName);
      query = { tags: tag._id };
    }

    return this.postModel
      .find(query)
      .select('-body')
      .sort({ [sortBy]: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author')
      .exec();
  }

  public findOne(id: string) {
    return this.postModel
      .findById(id)
      .populate('author')
      .populate('tags')
      .exec();
  }

  public async findByAuthor(id: string) {
    return this.postModel
      .find({ author: id })
      .select('-body')
      .sort({ createdAt: -1 })
      .populate('author')
      .populate('tags')
      .exec();
  }

  public update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  public async remove(id: string) {
    const post = await this.postModel.findById(id);
    await this.tagsService.decreaseFrequency(post.tags);
    return this.postModel.deleteOne({ _id: id });
  }

  public async like(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException(ErrorMessages.POST_NOT_FOUND);
    }

    const isLiked = post.likes.has(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    return post.save();
  }
}
