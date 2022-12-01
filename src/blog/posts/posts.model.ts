import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Blog } from '../blog.model';

@Table({ tableName: 'Post' })
export class Post extends Model<Post> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, unique: true })
  title: string;

  @Column({ type: DataType.STRING })
  content: string;

  @ForeignKey(() => Blog)
  blogId: number;

  @BelongsTo(() => Blog)
  blog: Blog[];
}
