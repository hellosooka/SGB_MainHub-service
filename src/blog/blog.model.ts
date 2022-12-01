import { ApiProperty } from '@nestjs/swagger';
import { Model, DataType, Table, Column, HasMany } from 'sequelize-typescript';
import { Post } from './posts/posts.model';

interface BlogCreationAttrs {
  title: string;
}

@Table({ tableName: 'blog' })
export class Blog extends Model<Blog, BlogCreationAttrs> {
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

  @HasMany(() => Post)
  posts: Post[];
}
