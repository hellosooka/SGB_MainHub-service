import { IsNumber, IsString } from 'class-validator';

export class AddGameDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly userId: number;
}
