import { GetWishlistDto} from './dto/get-wishlists.dto';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';
import {
  findAllWishlists,
  findWishlist,
  create,
  update,
  deleteWishlist,
  toggle,
  isInWishlist,
} from './wishlists.service';

export function findAllWishlistsRoute(query: GetWishlistDto) {
  return findAllWishlists(query);
}

export function findWishlistRoute(id: string) {
  return findWishlist(+id);
}

export function createWishlistRoute(createWishlistDto: CreateWishlistDto) {
  return create(createWishlistDto);
}

export function updateWishlistRoute(id: string, updateWishlistDto: UpdateWishlistDto) {
  return update(+id, updateWishlistDto);
}

export function deleteWishlistRoute(id: string) {
  return deleteWishlist(+id);
}

export function toggleWishlistRoute(CreateWishlistDto: CreateWishlistDto) {
  return toggle(CreateWishlistDto);
}

export function isInWishlistRoute(id: string) {
  return isInWishlist(+id);
}
