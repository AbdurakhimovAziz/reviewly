import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { PostGroup } from 'src/helpers/enums';
import { Tag } from 'src/tags/schemas/tag.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true, versionKey: false })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  author: string;

  @Prop({ required: true })
  reviewedItem: string;

  @Prop({ required: true, enum: PostGroup })
  group: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }] })
  tags: Types.ObjectId[];

  @Prop({ required: true })
  content: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true, min: 0, max: 10 })
  grade: number;

  @Prop({ type: Map, of: Boolean, default: {} })
  likes: Map<string, boolean>;
}

export const PostSchema = SchemaFactory.createForClass(Post);
