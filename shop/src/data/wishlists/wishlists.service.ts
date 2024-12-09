import { GetWishlistDto} from './dto/get-wishlists.dto';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';
import { Wishlist } from './entities/wishlist.entity';
import { paginate } from '../common/pagination/paginate';
import Fuse from 'fuse.js';
import { plainToClass } from 'class-transformer';
import wishlistsJSON from '../db/pickbazar/wishlists.json';
import productsJson from '../db/pickbazar/products.json';
import { Product } from '../products/entities/product.entity';

const wishlists = plainToClass(Wishlist, wishlistsJSON);
const products = plainToClass(Product, productsJson);
const options = {
  keys: ['answer'],
  threshold: 0.3,
};
const fuse = new Fuse(wishlists, options);

export function findAllWishlists({ limit, page, search }: GetWishlistDto) {
  if (!page) page = 1;
  if (!limit) limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let data: Wishlist[] = wishlists;

  if (search) {
    const parseSearchParams = search.split(';');
    for (const searchParam of parseSearchParams) {
      const [key, value] = searchParam.split(':');
      data = fuse.search(value)?.map(({ item }) => item);
    }
  }

  const results = data.slice(startIndex, endIndex);
  const url = `/wishlists?with=shop&orderBy=created_at&sortedBy=desc`;
  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

export function findWishlist(id: number) {
  return wishlists.find((p) => p.id === id);
}

export function create(createWishlistDto: CreateWishlistDto) {
  return wishlists[0];
}

export function update(id: number, updateWishlistDto: UpdateWishlistDto) {
  return wishlists[0];
}

export function deleteWishlist(id: number) {
  return wishlists[0];
}

export function isInWishlist(product_id: number) {
  const product = products.find((p) => p.id === Number(product_id));
  return product?.in_wishlist;
}

export function toggle({ product_id }: CreateWishlistDto) {
  const product = products.find((p) => p.id === Number(product_id));
  product.in_wishlist = !product?.in_wishlist;
  return product.in_wishlist;
}
