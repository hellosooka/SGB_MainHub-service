import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameTags } from '../games-tags.model';
import { Game } from '../games.model';
import { TagsController } from './tags.controller';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [SequelizeModule.forFeature([Tag, Game, GameTags])],
  exports: [TagsService],
})
export class TagsModule { }
