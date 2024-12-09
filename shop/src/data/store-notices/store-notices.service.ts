import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { GetStoreNoticesDto } from './dto/get-store-notices.dto';
import { StoreNotice } from './entities/store-notices.entity';
import storeNoticesJson from '../db/pickbazar/store-notices.json';
import Fuse from 'fuse.js';
import { paginate } from '../common/pagination/paginate';
import { CreateStoreNoticeDto } from './dto/create-store-notice.dto';
import { UpdateStoreNoticeDto } from './dto/update-store-notice.dto';

const storeNotices = plainToClass(StoreNotice, storeNoticesJson);
const options = {
  keys: ['notice'],
  threshold: 0.3,
};
const fuse = new Fuse(storeNotices, options);

  

export async function  create(createStoreNoticeDto: CreateStoreNoticeDto) {
    return storeNotices[0];
  }

export async function getStoreNotices({ search, limit, page }: GetStoreNoticesDto) {
    if (!page) page = 1;
    if (!limit) limit = 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: StoreNotice[] = storeNotices;

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

    const results = data.slice(startIndex, endIndex);
    const url = `/store-notices?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

export async function  getStoreNotice(param: string, language: string) {
    return storeNotices.find((p) => p.id === Number(param));
  }

export async function  update(id: number, updateStoreNoticeDto: UpdateStoreNoticeDto) {
    return storeNotices[0];
  }

export async function  remove(id: number) {
    return `This action removes a #${id} store notice`;
  }
