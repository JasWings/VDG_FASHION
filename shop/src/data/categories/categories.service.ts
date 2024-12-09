import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import categoriesJson from '../db/pickbazar/categories.json';
import { Category } from './entities/category.entity';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { paginate } from '../common/pagination/paginate';

const categories = plainToClass(Category, categoriesJson);

const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};

const fuse = new Fuse(categories, options);

export function createCategory(createCategoryDto: CreateCategoryDto) {
  return categories[0];
}

export function getCategories({ limit, page, search, parent }: GetCategoriesDto) {
  if (!page) page = 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let data: Category[] = categories;
  if (search) {
    const parseSearchParams = search.split(';');
    for (const searchParam of parseSearchParams) {
      const [key, value] = searchParam.split(':');
      data = fuse.search(value)?.map(({ item }) => item);
    }
  }
  if (parent === 'null') {
    data = data.filter((item) => item.parent === null);
  }

  const results = data.slice(startIndex, endIndex);
  const url = `/categories?search=${search}&limit=${limit}&parent=${parent}`;
  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

export function getCategory(param: string, language: string) {
  return categories.find(
    (p) => p.id === Number(param) || p.slug === param,
  );
}

export function updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
  return categories[0];
}

export function removeCategory(id: number) {
  return `This action removes a #${id} category`;
}
