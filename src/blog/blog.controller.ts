import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  createBlog(@Body() dto: CreateBlogDto) { }

  @Delete(':id')
  deleteBlog(@Param('id') id: number) { }

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get('/:title')
  getBlogByTitle(@Param('title') title: string) {
    return this.blogService.getBlogByTitle(title);
  }
}
