import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTagDto } from './dto';
import { Tag } from './schemas/tag.schema';
import { ErrorMessages } from 'src/helpers/enums';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

  public async create(createTagDto: CreateTagDto) {
    const existingTag = await this.doesTagExist(createTagDto.name);
    if (existingTag) throw new ConflictException(ErrorMessages.TAG_EXISTS);
    return this.tagModel.create(createTagDto);
  }

  public async findAll() {
    return this.tagModel.find().exec();
  }

  public async findMostUsed(limit: number = 10) {
    return this.tagModel.find().sort({ frequency: -1 }).limit(limit).exec();
  }

  public async findByName(name: string) {
    return this.tagModel.findOne({ name }).exec();
  }

  public async findMany(names: string[]) {
    return this.tagModel.find({ name: { $in: names } }).exec();
  }

  public async findOne(id: string) {
    return this.tagModel.findById(id).exec();
  }

  public async updateOrCreateTags(tagNames: string[]) {
    const bulkWriteOps = tagNames.map((tagName) => ({
      updateOne: {
        filter: { name: tagName },
        update: { $inc: { frequency: 1 } },
        upsert: true,
      },
    }));

    return await this.tagModel.bulkWrite(bulkWriteOps);
  }

  public async decreaseFrequency(tagIds: Types.ObjectId[]) {
    const bulkWriteOps = tagIds.map((tagId) => ({
      updateOne: {
        filter: { _id: tagId },
        update: { $inc: { frequency: -1 } },
      },
    }));

    return await this.tagModel.bulkWrite(bulkWriteOps);
  }

  private async doesTagExist(name: string) {
    return this.tagModel.exists({ name });
  }
}
