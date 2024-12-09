import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  createAddress,
  findAllAddresses,
  findAddressById,
  updateAddress,
  deleteAddress,
} from './addresses.service';

export function createAddressRoute(createAddressDto: CreateAddressDto) {
  return createAddress(createAddressDto);
}

export function findAllAddressesRoute() {
  return findAllAddresses();
}

export function findAddressByIdRoute(id: string) {
  return findAddressById(+id);
}

export function updateAddressRoute(id: string, updateAddressDto: UpdateAddressDto) {
  return updateAddress(+id, updateAddressDto);
}

export function deleteAddressRoute(id: string) {
  return deleteAddress(+id);
}
