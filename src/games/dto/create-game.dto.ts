import { IsObject, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  link: string;

  image: string;
}
