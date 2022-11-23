import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './games.model';
import { FilesModule } from 'src/files/files.module';
import { GamesUsers } from './games-users.model';

@Module({
  imports: [FilesModule, SequelizeModule.forFeature([User, Game, GamesUsers])],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule { }
