import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './games.model';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game) private gameRepository: typeof Game,
    private readonly filesService: FilesService,
  ) { }

  async getAllGames() {
    const games = await this.gameRepository.findAll();
    return games;
  }

  async createGame(dto: CreateGameDto, image) {
    const fileName = await this.filesService.createFile(image);
    const game = await this.gameRepository.create({ ...dto, image: fileName });
    return game;
  }

  async deleteGame(title: string) {
    const game = await this.findGame(title);
    game.destroy();
    return game;
  }

  async findGame(title: string) {
    const game = await this.gameRepository.findOne({ where: { title } });
    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }
    return game;
  }
}
