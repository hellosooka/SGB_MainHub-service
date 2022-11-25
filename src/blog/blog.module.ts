import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { PostsModule } from './posts/posts.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [PostsModule]
})
export class BlogModule {}
