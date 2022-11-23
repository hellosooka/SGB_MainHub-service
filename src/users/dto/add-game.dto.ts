import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddGameDto {
  @ApiProperty({ example: 'GAME' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly userId: number;
}
