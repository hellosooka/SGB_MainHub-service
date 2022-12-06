import { IsString } from 'class-validator';

export class ChangeUserDto {
  @IsString()
  oldEmail: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newEmail: string;

  @IsString()
  newPassword: string;
}
