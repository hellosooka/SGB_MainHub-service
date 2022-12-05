import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { GamesService } from 'src/games/games.service';
import { AddGameDto } from './dto/add-game.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private roleService: RolesService,
    private gameService: GamesService,
    private filesService: FilesService,
  ) { }

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue('ADMIN');
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
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    await user.destroy();
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async banUser(dto: BanUserDto) {
    const user = await this.getUserById(dto.userId);
    user.banned = true;
    user.bannedReason = dto.banReason;
    await user.save();
    return user;
  }

  async changeUserRole(dto: ChangeRoleDto) {
    const user = await this.getUserById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role) {
      await user.$set('role', role.id);
      return dto;
    }
    throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  }

  async addGameToUser(dto: AddGameDto) {
    const user = await this.getUserById(dto.userId);
    const game = await this.gameService.getGameByTitle(dto.title);

    if (game) {
      await user.$add('games', [game.id]);
      return dto;
    }
    throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
  }

  async getUserGames(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.games;
  }

  async addUserImage(email: string, image) {
    const user = await this.getUserByEmail(email);
    const fileName = await this.filesService.createFile(image, 'user');
    if (user) {
      user.image = fileName;
      await user.save();
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
