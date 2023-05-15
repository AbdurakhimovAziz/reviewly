import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PostGroup } from 'src/helpers/enums';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  reviewedItem?: string;

  @IsOptional()
  @IsEnum(PostGroup)
  group?: PostGroup;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  previewText?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  grade?: number;

  @IsOptional()
  @IsString({ each: true })
  tagNames?: string[];
}
