import { IsString, Matches } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Matches(/^[^\s]+$/, { message: 'Spaces are not allowed' })
  name: string;
}
