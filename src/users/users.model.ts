import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  BelongsToMany,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { GamesUsers } from 'src/games/games-users.model';
import { Game } from 'src/games/games.model';
import { Role } from 'src/roles/roles.model';

interface UserCreationAttrs {
  nickname: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'nickname' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  nickname: string;

  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '123abc', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Toggle user ban' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'Because', description: 'Reason of banned user' })
  @Column({ type: DataType.STRING, allowNull: true })
  bannedReason: string;

  @ApiProperty({})
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsToMany(() => Game, () => GamesUsers)
  games: Game[];
}
