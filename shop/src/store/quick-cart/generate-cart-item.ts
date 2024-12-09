import isEmpty from 'lodash/isEmpty';
interface Item {
  id: string | number;
  uuid:string;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  product_prices
?: number;
  quantity?: number;
  [key: string]: unknown;
  language: string;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  product_prices
?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const {
    id,
    identity,
    slug,
    images,
    price,
    product_prices,
    weight_in_grams,
    stock,
    unit,
    uuid,
    is_digital,
    language
  } = item;
  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.identity}`,
      slug,
      unit,
      is_digital: variation?.is_digital,
      stock: variation.quantity,
      uuid:uuid,
      price: Number(
        variation.product_prices
 ? variation.product_prices
 : variation.price
      ),
      image: images[0].image.file,
      variationId: variation.id,
      language
    };
  }
  return {
    id,
    identity,
    slug,
    unit,
    is_digital,
    image: images&&images[0]&&images[0].image.file,
    weight:weight_in_grams,
    stock: stock,
    uuid:uuid,
    price: Number(product_prices&&product_prices[0]
 ? product_prices[0].actual_price
 : price),
    language
  };
}
