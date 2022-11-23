import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { GamesService } from 'src/games/games.service';
import { AddGameDto } from './dto/add-game.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private roleService: RolesService,
    private gameService: GamesService,
  ) { }

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('USER');
    const user = await this.usersRepository.create(dto);

    if (role && user) {
      await user.$set('role', role.id);
      return user;
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async changeRole(dto: ChangeRoleDto) {
    const user = await this.getUserById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$set('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async addGame(dto: AddGameDto) {
    const user = await this.getUserById(dto.userId);
    const game = await this.gameService.getGameByTitle(dto.title);

    if (user && game) {
      await user.$add('games', [game.id]);
      return dto;
    }
    throw new HttpException('User of Game not found', HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user = await this.getUserById(dto.userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.bannedReason = dto.banReason;
    await user.save();
    return user;
  }
}
