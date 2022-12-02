import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from './games.model';
import { Tag } from './tags/tags.model';

@Table({ tableName: 'game_tags', createdAt: false, updatedAt: false })
export class GameTags extends Model<GameTags> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Game id' })
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @ApiProperty({ example: '1', description: 'Tag id' })
  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tagId: number;
}
