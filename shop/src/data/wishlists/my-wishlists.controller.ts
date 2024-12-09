import { GetWishlistDto } from './dto/get-wishlists.dto';
import { CreateWishlistDto } from './dto/create-wishlists.dto';
import { UpdateWishlistDto } from './dto/update-wishlists.dto';
import {
  findAMyWishlists,
  findAMyWishlist,
  createAMyWishlist,
  updateAMyWishlist,
  deleteAMyWishlist,
} from './my-wishlists.service';

export function findAMyWishlistsRoute(query: GetWishlistDto) {
  return findAMyWishlists(query);
}

export function findAMyWishlistRoute(id: string) {
  return findAMyWishlist(+id);
}

export function createAMyWishlistRoute(createWishlistDto: CreateWishlistDto) {
  return createAMyWishlist(createWishlistDto);
}

export function updateAMyWishlistRoute(id: string, updateWishlistDto: UpdateWishlistDto) {
  return updateAMyWishlist(+id, updateWishlistDto);
}

export function deleteAMyWishlistRoute(id: string) {
  return deleteAMyWishlist(+id);
}
