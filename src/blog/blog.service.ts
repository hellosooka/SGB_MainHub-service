import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog) private blogRepository: typeof Blog) { }

  async getAllBlogs() {
    const blogs = await this.blogRepository.findAll();
    return blogs;
  }

  async getBlogByTitle(title: string) {
    const blog = await this.blogRepository.findOne({ where: { title } });
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    return blog;
  }
}
