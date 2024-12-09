import { CreateTypeDto } from './dto/create-type.dto';
import { GetTypesDto } from './dto/get-types.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import {
  createType,
  getTypes,
  getTypeBySlug,
  updateType,
  removeType,
} from './types.service';

export function createTypeRoute(createTypeDto: CreateTypeDto) {
  return createType(createTypeDto);
}

export function findAllTypesRoute(query: GetTypesDto) {
  return getTypes(query);
}

export function getTypeBySlugRoute(slug: string) {
  return getTypeBySlug(slug);
}

export function updateTypeRoute(id: string, updateTypeDto: UpdateTypeDto) {
  return updateType(+id, updateTypeDto);
}

export function removeTypeRoute(id: string) {
  return removeType(+id);
}
