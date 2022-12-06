import { IsObject, IsString } from 'class-validator';

export class ChangeGameDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  link: string;
}
