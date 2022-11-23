import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 'Beacuse you gay' })
  @IsString()
  readonly banReason: string;
}
