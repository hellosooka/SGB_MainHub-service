import { Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('blog/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  createNewPost() { }
}
