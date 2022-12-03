import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreatePostDto } from './posts/dto/create-post.dto';
import { PostsService } from './posts/posts.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogRepository: typeof Blog,
    private postService: PostsService,
  ) { }

  async createPost(blogTitle: string, dto: CreatePostDto, image) {
    const blog = await this.getBlogByTitle(blogTitle);
    const post = await this.postService.createPost(dto, image);

    if (blog && post) {
      blog.$add('posts', post.id);
      return post;
    }
    throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
  }

  async createBlog(dto: CreateBlogDto) {
    const blog = await this.blogRepository.create(dto);
    return blog;
  }

  async getAllBlogs() {
    const blogs = await this.blogRepository.findAll({ include: { all: true } });
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
