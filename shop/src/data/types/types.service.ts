import { plainToClass } from 'class-transformer';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';
import typesJson from '../db/pickbazar/types.json';
import Fuse from 'fuse.js';
import { GetTypesDto } from './dto/get-types.dto';

const types = plainToClass(Type, typesJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(types, options);

export function getTypes({ text, search }: GetTypesDto) {
  let data: Type[] = types;
  if (text?.replace(/%/g, '')) {
    data = fuse.search(text)?.map(({ item }) => item);
  }

  // if (search) {
  //   const parseSearchParams = search.split(';');
  //   const searchText: any = [];
  //   for (const searchParam of parseSearchParams) {
  //     const [key, value] = searchParam.split(':');
  //     // TODO: Temp Solution
  //     if (key !== 'slug') {
  //       searchText.push({
  //         [key]: value,
  //       });
  //     }
  //   }

  //   data = fuse
  //     .search({
  //       $and: searchText,
  //     })
  //     ?.map(({ item }) => item);
  // }

  return data;
}

export function getTypeBySlug(slug: string): Type {
  return types.find((p) => p.slug === slug);
}

export function createType(createTypeDto: CreateTypeDto) {
  return types[0];
}

export function findAllTypes() {
  return `This action returns all types`;
}

export function findTypeById(id: number) {
  return `This action returns a #${id} type`;
}

export function updateType(id: number, updateTypeDto: UpdateTypeDto) {
  return types[0];
}

export function removeType(id: number) {
  return `This action removes a #${id} type`;
}
