import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Game } from './games.model';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
    return this.gameService.getGameByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createGame(@Body() dto: CreateGameDto, @UploadedFile() image: object) {
    return this.gameService.createGame(dto, image);
  }

  @ApiOperation({ summary: 'Delete game by title' })
  @ApiResponse({ status: 200, type: Game })
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:title')
  async deleteGameByTitle(@Param('title') title: string) {
    return this.gameService.deleteGameByTitle(title);
  }
}
