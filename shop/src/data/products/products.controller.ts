import { CreateProductDto} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto, ProductPaginator } from './dto/get-products.dto';
import { Product } from './entities/product.entity';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  removeProduct,
} from './products.service';
import { getPopularProducts } from './products.service';


export function createProductRoute(createProductDto: CreateProductDto) {
  return createProduct(createProductDto);
}

export async function getProductsRoute(query: GetProductsDto): Promise<ProductPaginator> {
  return getProducts(query);
}

export async function getProductBySlugRoute(slug: string): Promise<Product> {
  return getProductBySlug(slug);
}

export function updateProductRoute(id: string, updateProductDto: UpdateProductDto) {
  return updateProduct(+id, updateProductDto);
}

export function removeProductRoute(id: string) {
  return removeProduct(+id);
}

export async function getPopularProductsRoute(query: GetPopularProductsDto): Promise<Product[]> {
  return getPopularProducts(query);
}

