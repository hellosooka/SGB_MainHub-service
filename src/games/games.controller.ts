import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Game } from './games.model';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) { }

  @ApiOperation({ summary: 'Getting all games' })
  @ApiResponse({ status: 200, type: [Game] })
  @Get()
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @ApiOperation({ summary: 'Getting game by title' })
  @ApiResponse({ status: 200, type: Game })
  @Get('/:title')
  getGameByTitle(@Param('title') title: string) {
    return this.gameService.findGame(title);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createGame(@Body() dto: CreateGameDto, @UploadedFile() image: object) {
    return this.gameService.createGame(dto, image);
  }

  @ApiOperation({ summary: 'Delete game by title' })
  @ApiResponse({ status: 200, type: Game })
  @Delete('/:title')
  async deleteGameByTitle(@Param('title') title: string) {
    return this.gameService.deleteGame(title);
  }
}
