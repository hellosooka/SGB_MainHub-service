import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @Get('/:title')
  getTagByTitle(@Param('title') title: string) {
    return this.tagsService.getTagByTitle(title);
  }

  @Get()
  getAllTags() {
    return this.tagsService.getAllTags();
  }
}
