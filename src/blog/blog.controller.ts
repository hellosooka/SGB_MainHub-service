import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreatePostDto } from './posts/dto/create-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  async createBlog(@Body() dto: CreateBlogDto) {
    return this.blogService.createBlog(dto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post('/:blogTitle')
  createPost(
    @Param('blogTitle') blogTitle: string,
    @Body() dto: CreatePostDto,
    @UploadedFile() image: object,
  ) {
    return this.blogService.createPost(blogTitle, dto, image);
  }

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
