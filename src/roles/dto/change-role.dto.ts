import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class ChangeRoleDto {
  @IsString()
  readonly value: string;

  @IsString()
  readonly description: string;
}
