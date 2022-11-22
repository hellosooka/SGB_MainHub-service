import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: 1, description: 'This is user id' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 'Beacuse' })
  @IsString()
  readonly banReason: string;
}
