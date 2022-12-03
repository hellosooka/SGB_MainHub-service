import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogController } from './blog.controller';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { Post } from './posts/posts.model';
import { PostsModule } from './posts/posts.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [PostsModule, SequelizeModule.forFeature([Blog, Post])],
})
export class BlogModule { }
