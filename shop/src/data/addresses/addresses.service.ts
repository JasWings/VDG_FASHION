import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

export function createAddress(createAddressDto: CreateAddressDto) {
  return 'This action adds a new address';
}

export function findAllAddresses() {
  return `This action returns all addresses`;
}

export function findAddressById(id: number) {
  return `This action returns a #${id} address`;
}

export function updateAddress(id: number, updateAddressDto: UpdateAddressDto) {
  return `This action updates a #${id} address`;
}

export function deleteAddress(id: number) {
  return [];
}
