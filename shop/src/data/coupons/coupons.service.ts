import { plainToClass } from 'class-transformer';
import couponsJson from '../db/pickbazar/coupons.json';
import Fuse from 'fuse.js';
import { paginate } from '../common/pagination/paginate';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';

const coupons = plainToClass(Coupon, couponsJson);
const options = {
  keys: ['code'],
  threshold: 0.3,
};
const fuse = new Fuse(coupons, options);

// Function to create a coupon
export function createCoupon(createCouponDto: CreateCouponDto) {
  return coupons[0];
}

// Function to get coupons
export function getCoupons({ search, limit, page }: GetCouponsDto) {
  if (!page) page = 1;
  if (!limit) limit = 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let data: Coupon[] = coupons;

  if (search) {
    const parseSearchParams = search.split(';');
    const searchText: any = [];
    for (const searchParam of parseSearchParams) {
      const [key, value] = searchParam.split(':');
      // TODO: Temp Solution
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
  const url = `/coupons?search=${search}&limit=${limit}`;
  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

// Function to get a coupon by code
export function getCoupon(param: string, language: string): Coupon {
  return coupons.find((p) => p.code === param);
}

// Function to update a coupon
export function updateCoupon(id: number, updateCouponDto: UpdateCouponDto) {
  return coupons[0];
}

// Function to remove a coupon
export function removeCoupon(id: number) {
  return `This action removes a #${id} coupon`;
}

// Function to verify a coupon
export function verifyCoupon(code: string) {
  return {
    is_valid: true,
    coupon: {
      id: 9,
      code: code,
      // ... other coupon properties
    },
  };
}
