import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'nick' })
  @IsString()
  readonly nickname: string;

  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123abc', description: 'User password' })
  @IsString()
  readonly password: string;
}
