import { CreateCouponDto } from './dto/create-coupon.dto';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { createCoupon,getCoupon,updateCoupon,removeCoupon } from './coupons.service';

// Function to create a coupon
export function createCoupons(couponsService: CouponsService, createCouponDto: CreateCouponDto) {
  return createCoupon(createCouponDto);
}

// Function to get coupons
export function getCoupons(couponsService: CouponsService, query: GetCouponsDto) {
  return getCoupon(query);
}

// Function to get a coupon by code
export function getCoupon1(couponsService: CouponsService, param: string, language: string) {
  return couponsService.getCoupons(param, language);
}

// Function to verify a coupon
export function verify(couponsService: CouponsService, param: string, language: string) {
  return getCoupon(param, language);
}

// Function to create a coupon
export function verifyCoupon(couponsService: CouponsService, code: string) {
  return couponsService.verifyCoupon(code);
}

// Function to update a coupon
export function updateCoupon(couponsService: CouponsService, id: string, updateCouponDto: UpdateCouponDto) {
  return couponsService.update(+id, updateCouponDto);
}

// Function to delete a coupon
export function deleteCoupon(couponsService: CouponsService, id: string) {
  return couponsService.remove(+id);
}


const couponsService = new CouponsService();

const createCouponDto = {}; // Fill with appropriate data
const getQuery = {}; // Fill with appropriate query parameters

// Example usage
const createdCoupon = createCoupon(couponsService, createCouponDto);
const coupons = getCoupons(couponsService, getQuery);

// Similarly, use other functions as needed.
