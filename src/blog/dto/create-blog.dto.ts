import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;
}
