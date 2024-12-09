import attributesJson from '../db/pickbazar/attributes.json';
import { Attribute } from './entities/attribute.entity';
import { plainToClass } from 'class-transformer';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

const attributes = plainToClass(Attribute, attributesJson);

export function createAttribute(createAttributeDto: CreateAttributeDto) {
  return attributes[0];
}

export function findAllAttributes() {
  return attributes;
}

export function findOneAttribute(param: string) {
  return attributes.find(
    (p) => p.id === Number(param) || p.slug === param,
  );
}

export function updateAttribute(id: number, updateAttributeDto: UpdateAttributeDto) {
  return attributes[0];
}

export function removeAttribute(id: number) {
  return `This action removes a #${id} attribute`;
}
