import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto): Tag {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  async findAll(@Query() query: GetTagsDto): Promise<{ data: Tag[]; page: number; limit: number }> {
    return this.tagsService.findAll(query);
  }

  @Get(':param')
  findOne(@Param('param') param: string, @Query('language') language: string): Tag | undefined {
    return this.tagsService.findOne(param, language);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto): Tag {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.tagsService.remove(+id);
  }
}
