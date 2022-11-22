import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin' })
  @IsString()
  readonly value: string;

  @ApiProperty({ example: 'This is main role in App' })
  @IsString()
  readonly description: string;
}
