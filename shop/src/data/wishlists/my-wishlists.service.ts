import { GetWishlistDto } from './dto/get-wishlists.dto';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';
import { Wishlist } from './entities/wishlist.entity';
import { paginate } from '../common/pagination/paginate';
import Fuse from 'fuse.js';
import { plainToClass } from 'class-transformer';
import wishlistsJSON from '../db/pickbazar/wishlists.json';
import productsJson from '../db/pickbazar/products.json';
import { Product } from '../products/entities/product.entity';

const products = plainToClass(Product, productsJson);
const wishlists = plainToClass(Wishlist, wishlistsJSON);

export function findAMyWishlists({ limit, page, search }: GetWishlistDto) {
  if (!page) page = 1;
  if (!limit) limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const data: Product[] = products.slice(1, 7);
  const results = data.slice(startIndex, endIndex);
  const url = `/my-wishlists?with=shop&orderBy=created_at&sortedBy=desc`;
  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

export function findAMyWishlist(id: number) {
  return wishlists.find((p) => p.id === id);
}

export function createAMyWishlist(createWishlistDto: CreateWishlistDto) {
  return wishlists[0];
}

export function updateAMyWishlist(id: number, updateWishlistDto: UpdateWishlistDto) {
  return wishlists[0];
}

export function deleteAMyWishlist(id: number) {
  return wishlists[0];
}
