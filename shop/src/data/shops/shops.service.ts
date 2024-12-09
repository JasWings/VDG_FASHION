import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import Fuse from 'fuse.js';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';

class ShopsService {
  private shops: Shop[] = [];
  private nearShops: Shop[] = [];
  private fuse: Fuse<Shop>;

  constructor() {
    this.shops = []; // Initialize with your data
    this.nearShops = []; // Initialize with your data

    const options = {
      keys: ['name', 'type.slug', 'is_active'],
      threshold: 0.3,
    };
    this.fuse = new Fuse(this.shops, options);
  }

  create(createShopDto: CreateShopDto) {
    return this.shops[0];
  }

  getShops({ search, limit, page }: GetShopsDto) {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: Shop[] = this.shops;

    if (search) {
      const parseSearchParams = search.split(';');
      for (const searchParam of parseSearchParams) {
        const [key, value] = searchParam.split(':');
        data = this.fuse.search(value)?.map(({ item }) => item);
      }
    }

    const results = data.slice(startIndex, endIndex);
    const url = `/shops?search=${search}&limit=${limit}`;

    return {
      data: results,
      // Implement your paginate logic here
    };
  }

  getStaffs({ shop_id, limit, page }: GetStaffsDto) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let staffs: Shop['staffs'] = [];

    if (shop_id) {
      staffs = this.shops.find((p) => p.id === Number(shop_id))?.staffs ?? [];
    }

    const results = staffs?.slice(startIndex, endIndex);
    const url = `/staffs?limit=${limit}`;

    return {
      data: results,
      // Implement your paginate logic here
    };
  }

  getShop(slug: string): Shop {
    return this.shops.find((p) => p.slug === slug);
  }

  getNearByShop(lat: string, lng: string) {
    return this.nearShops;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return this.shops[0];
  }

  approve(id: number) {
    return `This action removes a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }

  disapproveShop(id: number) {
    const shop = this.shops.find((s) => s.id === Number(id));
    shop.is_active = false;
    return shop;
  }

  approveShop(id: number) {
    const shop = this.shops.find((s) => s.id === Number(id));
    shop.is_active = true;
    return shop;
  }
}

class StaffsController {
  private readonly shopsService: ShopsService;

  constructor(shopsService: ShopsService) {
    this.shopsService = shopsService;
  }

  create(createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  async getStaffs(query: GetStaffsDto) {
    return this.shopsService.getStaffs(query);
  }

  async getShop(slug: string) {
    return this.shopsService.getShop(slug);
  }

  update(id: string, updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  remove(id: string) {
    return this.shopsService.remove(+id);
  }
}

class DisapproveShopController {
  private shopsService: ShopsService;

  constructor(shopsService: ShopsService) {
    this.shopsService = shopsService;
  }

  async disapproveShop(id: string) {
    return this.shopsService.disapproveShop(id);
  }
}

class ApproveShopController {
  private shopsService: ShopsService;

  constructor(shopsService: ShopsService) {
    this.shopsService = shopsService;
  }

  async approveShop(id: string) {
    return this.shopsService.approveShop(id);
  }
}

class NearByShopController {
  private shopsService: ShopsService;

  constructor(shopsService: ShopsService) {
    this.shopsService = shopsService;
  }

  async getNearByShop(lat: string, lng: string) {
    return this.shopsService.getNearByShop(lat, lng);
  }
}
