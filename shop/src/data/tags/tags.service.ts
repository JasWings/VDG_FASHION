import { Injectable } from '@nestjs/common';
import { paginate } from '../common/pagination/paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import tagsJson from '../db/pickbazar/tags.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';

const tags = plainToClass(Tag, tagsJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(tags, options);

@Injectable()
export class TagsService {
  private tags: Tag[] = tags;

  create(createTagDto: CreateTagDto): Tag {
    return {
      id: this.tags.length + 1,
      ...createTagDto,
    };
  }

  findAll({ page, limit, search }: GetTagsDto): { data: Tag[]; page: number; limit: number } {
    if (!page) page = 1;
    let data: Tag[] = this.tags;
    if (search) {
      const parseSearchParams = search.split(';');
      const searchText: any = [];
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        // TODO: Temp Solution
        if (key !== 'slug') {
          searchText.push({
            [key]: value,
          });
        }
      }

      data = fuse
        .search({
          $and: searchText,
        })
        ?.map(({ item }) => item);
    }

    const url = `/tags?limit=${limit}`;
    const paginatedData = paginate(this.tags.length, page, limit, this.tags.length, url);
    return {
      data: data.slice(paginatedData.startIndex, paginatedData.endIndex),
      page: paginatedData.currentPage,
      limit: paginatedData.pageSize,
    };
  }

  findOne(param: string, language: string): Tag | undefined {
    return this.tags.find((p) => p.id === Number(param) || p.slug === param);
  }

  update(id: number, updateTagDto: UpdateTagDto): Tag {
    return this.tags[0];
  }

  remove(id: number): string {
    return `This action removes a #${id} tag`;
  }
}
