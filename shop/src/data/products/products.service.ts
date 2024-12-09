import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductPaginator } from './dto/get-products.dto';
import { Product } from './entities/product.entity';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { plainToClass } from 'class-transformer';
import productsJson from '../db/pickbazar/products.json';
import Fuse from 'fuse.js';
import { paginate } from '../common/pagination/paginate';

const products = plainToClass(Product, productsJson);

const options = {
  keys: [
    'name',
    'type.slug',
    'categories.slug',
    'status',
    'shop_id',
    'author.slug',
    'tags',
    'manufacturer.slug',
  ],
  threshold: 0.3,
};

const fuse = new Fuse(products, options);

export function createProduct(createProductDto: CreateProductDto) {
  return products[0];
}

export function getProducts({ limit, page, search }: GetProductsDto): ProductPaginator {
  if (!page) page = 1;
  if (!limit) limit = 500;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let data = products;
  if (search) {
    const parseSearchParams = search.split(';');
    const searchText: any = [];
    for (const searchParam of parseSearchParams) {
      const [key, value] = searchParam.split(':');
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
  console.log(results,"results",results[0])
  const url = `/products?search=${search}&limit=${limit}`;
  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

export function getProductBySlug(slug: string): Product {
  const product = products.find((p) => p.slug === slug);
  const related_products = products
    .filter((p) => p.type.slug === product.type.slug)
    .slice(0, 20);
  return {
    ...product,
    related_products,
  };
}

export function getPopularProducts({ limit, type_slug }: GetPopularProductsDto): Product[] {
  let data: any = products;
  if (type_slug) {
    data = fuse.search(type_slug)?.map(({ item }) => item);
  }
  return data?.slice(0, limit);
}

export function updateProduct(id: number, updateProductDto: UpdateProductDto) {
  return products[0];
}

export function removeProduct(id: number) {
  return `This action removes a #${id} product`;
}
