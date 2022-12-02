import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) { }

  async createTag(dto: CreateTagDto) {
    const tag = await this.tagRepository.create(dto);
    return tag;
  }

  async getTagByTitle(title: string) {
    const tag = await this.tagRepository.findOne({ where: { title } });
    if (tag) {
      return tag;
    }
    throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
  }

  async getAllTags() {
    const tags = await this.tagRepository.findAll();
    return tags;
  }
}
