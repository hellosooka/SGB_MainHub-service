import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { GamesUsers } from './games-users.model';

interface GameCreationAttrs {
  title: string;
  description: string;
  image: string;
  link: string;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, GameCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Game title!' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Game description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({})
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: 'http://google.com', description: 'link to game' })
  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @BelongsToMany(() => User, () => GamesUsers)
  users: User[];
}
