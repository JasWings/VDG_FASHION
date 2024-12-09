import { Manufacturer } from './entities/manufacturer.entity';
import manufacturersJson from '../db/pickbazar/manufacturers.json';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { GetTopManufacturersDto } from './dto/get-top-manufacturers.dto';
import { GetManufacturersDto } from './dto/get-manufactures.dto';
import { ManufacturerPaginator } from './dto/get-manufactures.dto';
import { paginate } from '../common/pagination/paginate';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

const manufacturers = plainToClass(Manufacturer, manufacturersJson);

const options = {
  keys: ['name'],
  threshold: 0.3,
};

const fuse = new Fuse(manufacturers, options);

export function createManufacturer(createManufactureDto: CreateManufacturerDto) {
  return manufacturers[0];
}

export async function getManufacturers({
  limit,
  page,
  search,
}: GetManufacturersDto): Promise<ManufacturerPaginator> {
  if (!page) page = 1;
  if (!limit) limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let data: Manufacturer[] = manufacturers;

  if (search) {
    console.log('search', search);
    const parseSearchParams = search.split(';');
    for (const searchParam of parseSearchParams) {
      const [key, value] = searchParam.split(':');
      data = fuse.search(value)?.map(({ item }) => item) || [];
    }
  }

  const results = data.slice(startIndex, endIndex);
  const url = `/manufacturers?search=${search}&limit=${limit}`;

  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

export async function getTopManufacturers({
  limit = 10,
}: GetTopManufacturersDto): Promise<Manufacturer[]> {
  return manufacturers.slice(0, limit);
}

export async function getManufacturersBySlug(slug: string): Promise<Manufacturer | undefined> {
  return manufacturers.find((singleManufacture) => singleManufacture.slug === slug);
}

export function updateManufacturers(id: number, updateManufacturesDto: UpdateManufacturerDto) {
  const manufacturer = manufacturers.find((p) => p.id === Number(id));

  if (manufacturer) {
    // Update author
    manufacturer.is_approved = updateManufacturesDto.is_approved ?? true;
  }

  return manufacturer;
}

export function removeManufacturers(id: number) {
  return `This action removes a #${id} product`;
}
