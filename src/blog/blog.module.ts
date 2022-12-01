import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogController } from './blog.controller';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { Post } from './posts/posts.model';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [SequelizeModule.forFeature([Blog, Post])],
})
export class BlogModule { }
