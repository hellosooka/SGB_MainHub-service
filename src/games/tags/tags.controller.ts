import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChangeTagDto } from './dto/change-tag.dto';
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

  @Delete('/:title')
  deleteTagByTitle(@Param('title') title: string) {
    return this.tagsService.deleteTagByTitle(title);
  }

  @Put('/:title')
  changeTagByTitle(@Param('title') title: string, @Body() dto: ChangeTagDto) {
    return this.tagsService.changeTagByTitle(title, dto);
  }

  @Get()
  getAllTags() {
    return this.tagsService.getAllTags();
  }
}
