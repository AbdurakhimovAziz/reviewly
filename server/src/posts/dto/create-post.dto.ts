import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PostGroup } from 'src/helpers/enums';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  reviewedItem: string;

  @IsEnum(PostGroup)
  group: PostGroup;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  grade: number;

  @IsOptional()
  @IsString({ each: true })
  tagNames?: string[];
}
