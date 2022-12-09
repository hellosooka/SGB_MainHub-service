import { IsString } from 'class-validator';

export class ChangeUserDto {
  @IsString()
  oldNickname: string;

  @IsString()
  oldEmail: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newNickname: string;

  @IsString()
  newEmail: string;

  @IsString()
  newPassword: string;
}
