import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreatePostDto } from './posts/dto/create-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @ApiOperation({ summary: 'Creating new blog' })
  @ApiResponse({ status: 200, type: Blog })
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

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteBlog(@Param('id') id: number) {
    return this.blogService.deleteBlog(id);
  }

  @Get()
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get('/:title')
  getBlogByTitle(@Param('title') title: string) {
    return this.blogService.getBlogByTitle(title);
  }

  @Put()
  updateBlog(@Body() dto: UpdateBlogDto) {
    return this.blogService.updateBlog(dto);
  }
}
