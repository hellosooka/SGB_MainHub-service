import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly filesService: FilesService,
  ) { }

  async createPost(dto: CreatePostDto, image) {
    const fileName = await this.filesService.createFile(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }

  async getAllPosts() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
    return posts;
  }

  async getPostByTitle(title: string) {
    const post = await this.postRepository.findOne({
      where: { title },
      include: { all: true },
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
}
