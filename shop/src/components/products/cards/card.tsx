import type { Product } from '@/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const Helium = dynamic(() => import('@/components/products/cards/helium'));
const Neon = dynamic(() => import('@/components/products/cards/neon')); // grocery-two
const Argon = dynamic(() => import('@/components/products/cards/argon')); // bakery
const Krypton = dynamic(
  () => import('@/components/products/cards/krypton') // furniture extra price
);
const Xenon = dynamic(() => import('@/components/products/cards/xenon')); // furniture-two
const Radon = dynamic(() => import('@/components/products/cards/radon')); // Book
const Offer =dynamic(()=>import("@/components/products/cards/offer"))

const MAP_PRODUCT_TO_CARD: Record<string, any> = {
  neon: Neon,
  helium: Helium,
  argon: Argon,
  krypton: Krypton,
  xenon: Xenon,
  radon: Radon,
  offer:Offer
};
interface ProductCardProps {
  product: Product;
  className?: string;
  cardType?: any;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  ...props
}) => {
  const router=useRouter()
  const Component = router.pathname==="/offers"?MAP_PRODUCT_TO_CARD['offer']: MAP_PRODUCT_TO_CARD["neon"]
  return <Component product={product} {...props}  className={className} />;
};
export default ProductCard;


