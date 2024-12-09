import { CreateCategoryDto} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { CategoryPaginator } from './dto/get-categories.dto';
import { Category } from './entities/category.entity';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  removeCategory,
} from './categories.service';

export function createCategoryRoute(createCategoryDto: CreateCategoryDto) {
  return createCategory(createCategoryDto);
}

export async function getCategoriesRoute(query: GetCategoriesDto): Promise<CategoryPaginator> {
  return getCategories(query);
}

export async function getCategoryRoute(param: string, language: string): Promise<Category> {
  return getCategory(param, language);
}

export function updateCategoryRoute(id: string, updateCategoryDto: UpdateCategoryDto) {
  return updateCategory(+id, updateCategoryDto);
}

export function removeCategoryRoute(id: string) {
  return removeCategory(+id);
}
