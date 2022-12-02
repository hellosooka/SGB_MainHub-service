import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game } from './games.model';
import { FilesModule } from 'src/files/files.module';
import { GamesUsers } from './games-users.model';
import { AuthModule } from 'src/auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tags.model';
import { GameTags } from './games-tags.model';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    SequelizeModule.forFeature([User, Game, GamesUsers, Tag, GameTags]),
    TagsModule,
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule { }
