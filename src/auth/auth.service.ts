import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { ChangeUserDto } from 'src/users/dto/change-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Not correct user' });
  }

  async register(dto: CreateUserDto) {
    const candidateByEmail = await this.userService.getUserByEmail(dto.email);
    const candidateByNickname = await this.userService.getUserByNickname(
      dto.nickname,
    );
    if (candidateByEmail) {
      throw new HttpException('User is exist', HttpStatus.BAD_REQUEST);
    }
    if (candidateByNickname) {
      throw new HttpException('Nickname is exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.generatePayload(dto);
    return this.generateToken(user);
  }

  async reregister(dto: ChangeUserDto) {
    const candidate: CreateUserDto = {
      nickname: dto.oldNickname,
      email: dto.oldEmail,
      password: dto.oldPassword,
    };

    const user = await this.validateUser(candidate);

    if (!user) {
      console.log(user);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashPassword = await bcrypt.hash(dto.newPassword, 5);
    const newUser = await this.userService.changeUser({
      ...dto,
      newPassword: hashPassword,
    });

    return this.generateToken(newUser);
  }

  async generatePayload(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return user;
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
