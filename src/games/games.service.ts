import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ChangeGameDto } from './dto/change-game.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './games.model';
import { TagsService } from './tags/tags.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game) private gameRepository: typeof Game,
    private readonly filesService: FilesService,
    private readonly tagsService: TagsService,
  ) { }

  async getAllGames() {
    const games = await this.gameRepository.findAll({ include: { all: true } });
    return games;
  }

  async createGame(dto: CreateGameDto, image) {
    const fileName = await this.filesService.createFile(image);
    const game = await this.gameRepository.create({ ...dto, image: fileName });
    return game;
  }

  async deleteGameByTitle(title: string) {
    const game = await this.getGameByTitle(title);
    game.destroy();
    return game;
  }

  async getGameByTitle(title: string) {
    const game = await this.gameRepository.findOne({
      where: { title },
      include: { all: true },
    });
    if (!game) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }
    return game;
  }

  async changeGameByTitle(title: string, dto: ChangeGameDto) {
    const game = await this.getGameByTitle(title);
    game.title = dto.title;
    game.description = dto.description;
    game.link = dto.link;
    await game.save();
    return game;
  }

  async changeGameImageByTitle(title: string, image) {
    const game = await this.getGameByTitle(title);
    const fileName = await this.filesService.createFile(image);

    game.image = fileName;
    await game.save();
    return game;
  }

  async addTagToGame(gameTitle: string, tagTitle: string) {
    const game = await this.getGameByTitle(gameTitle);
    const tag = await this.tagsService.getTagByTitle(tagTitle);

    if (game && tag) {
      game.$add('tags', tag.id);
      return game;
    }

    throw new HttpException('Game or Tag not found', HttpStatus.NOT_FOUND);
  }
}
