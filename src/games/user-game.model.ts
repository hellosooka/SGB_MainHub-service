import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Game } from './games.model';

@Table({ tableName: 'user_games', createdAt: false, updatedAt: false })
export class UserGames extends Model<UserGames> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Role id' })
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @ApiProperty({ example: '1', description: 'User id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
