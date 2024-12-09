import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import {
  createAttribute,
  findAllAttributes,
  findOneAttribute,
  updateAttribute,
  removeAttribute,
} from './attributes.service';

export function createAttributeRoute(createAttributeDto: CreateAttributeDto) {
  return createAttribute(createAttributeDto);
}

export function findAllAttributesRoute() {
  return findAllAttributes();
}

export function findOneAttributeRoute(param: string) {
  return findOneAttribute(param);
}

export function updateAttributeRoute(id: string, updateAttributeDto: UpdateAttributeDto) {
  return updateAttribute(+id, updateAttributeDto);
}

export function removeAttributeRoute(id: string) {
  return removeAttribute(+id);
}
