import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  BelongsToMany,
} from 'sequelize-typescript';
import { GameTags } from '../games-tags.model';
import { Game } from '../games.model';

interface TagCreationAttrs {
  title: string;
}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, TagCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Tag title!' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @BelongsToMany(() => Game, () => GameTags)
  games: Game;
}
