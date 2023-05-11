import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ versionKey: false })
export class Tag extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ default: 0 })
  frequency: number;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
