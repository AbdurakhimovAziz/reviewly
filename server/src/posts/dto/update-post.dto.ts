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
  content?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  grade?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  tags?: string[];
}
