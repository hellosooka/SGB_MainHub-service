import { IsNumber } from 'class-validator';

export class ChangeImageDto {
  @IsNumber()
  id: number;

  image: string;
}
