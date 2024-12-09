import { Manufacturer } from './entities/manufacturer.entity';
import { GetTopManufacturersDto } from './dto/get-top-manufacturers.dto';
import { GetManufacturersDto } from './dto/get-manufactures.dto';
import { ManufacturerPaginator } from './dto/get-manufactures.dto';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { createManufacturer,getManufacturers ,getManufacturersBySlug,getTopManufacturers,removeManufacturers,updateManufacturers} from './manufacturers.service';

// Manufacturers Controller Functions
export async function createProduct(createManufactureDto: CreateManufacturerDto) {
  return createManufacturer(createManufactureDto);
}

export async function getManufactures(query: GetManufacturersDto): Promise<ManufacturerPaginator> {
  return getManufactures(query);
}

export async function getManufactureBySlug(slug: string): Promise<Manufacturer | undefined> {
  return getManufacturersBySlug(slug);
}

export async function updateManufacturer(id: string, updateManufacturerDto: UpdateManufacturerDto) {
  return updateManufacturers(+id, updateManufacturerDto);
}

export async function removeManufacturer(id: string) {
  return removeManufacturers(+id);
}

// Top Manufacturers Controller Functions
export async function getTopManufactures(query: GetTopManufacturersDto): Promise<Manufacturer[]> {
  return getTopManufacturers(query);
}
