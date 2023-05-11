import { IsString } from 'class-validator';

export class UpdateManyTagsDto {
  @IsString({ each: true })
  tagNames: string[];
}
