import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    example: 'USER',
    description: 'this is existing role in system',
  })
  @IsString()
  readonly value: string;

  @ApiProperty({ example: 1, description: 'This is userId ' })
  @IsNumber()
  readonly userId: number;
}
