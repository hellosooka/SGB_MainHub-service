import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('/:title')
  getPostByTitle(@Param('title') title: string) {
    return this.postsService.getPostByTitle(title);
  }

  @Delete('/:title')
  deletePostByTitle(@Param('title') title: string) {
    return this.postsService.deletePostByTitle(title);
  }

  @Put('/:title')
  updatePostByTitle(@Param('title') title: string, @Body() dto: UpdatePostDto) {
    return this.postsService.updatePostByTitle(dto, title);
  }
}
