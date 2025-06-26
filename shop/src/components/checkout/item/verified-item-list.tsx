import Coupon from '@/components/checkout/coupon';
import EmptyCartIcon from '@/components/icons/empty-cart';
import { CloseIcon } from '@/components/icons/close-icon';
import { useTranslation } from 'next-i18next';
import { useCart } from '@/store/quick-cart/cart.context';
import { useAtom } from 'jotai';
import {
  couponAtom,
  verifiedResponseAtom,
} from '@/store/checkout';
import ItemCard from '@/components/checkout/item/item-card';
import { ItemInfoRow } from '@/components/checkout/item/item-info-row';
import PaymentGrid from '@/components/checkout/payment/payment-grid';
import { PlaceOrderAction } from '@/components/checkout/place-order-action';
import Wallet from '@/components/checkout/wallet/wallet';
import { useRevokeCoupon, useVerifyCoupon } from '@/framework/settings';
import { toast } from 'react-toastify';

interface Props {
  className?: string;
}

const VerifiedItemList: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');
  const { items, isEmpty: isEmptyCart, Cart,fetchCart } = useCart();
  const [verifiedResponse] = useAtom(verifiedResponseAtom);
  const [coupon, setCoupon] = useAtom(couponAtom);
  const {   mutate: revokeCoupon ,
    isLoading: loading,
    formError } = useRevokeCoupon()

  const appliedCoupon = Cart?.applied_coupon;
  const shippingDetails = Cart?.selected_shipping;

  const handleCouponRevoke = async () => {
    try {
     await  revokeCoupon({cartId: Cart?.uuid})
     setCoupon(null)
     toast.success("Coupon removed successfully")
    } catch (error) {
      toast.error(error.message)
    }
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col pb-2 border-b border-border-200">
        {Cart.items ? (
          Cart.items.map((item) => {
            const notAvailable = verifiedResponse?.unavailable_products?.includes(item.id);
            return (
              <ItemCard
                item={item}
                key={item.id}
                notAvailable={!!notAvailable}
              />
            );
          })
        ) : (
          <EmptyCartIcon />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {/* <ItemInfoRow title={t('text-sub-total')} value={`₹${Cart.price_details.total_current_price}`} /> */}

        {shippingDetails && (
          <ItemInfoRow
            title={t('text-shipping')}
            value={`₹${shippingDetails.cost} (${shippingDetails.name})`}
          />
        )}

        {appliedCoupon ? (
          <div className="flex justify-between">
            <p className="text-sm text-body">{t('text-discount')} 
            <span className="ml-1 text-xs font-semibold text-accent">
                ({appliedCoupon.code})
              </span>
            </p>
              
              <span className="text-sm text-body">{'₹' +"-"+ appliedCoupon?.amount}</span>
            <button  onClick={() => handleCouponRevoke()} className="text-red-500">
              <CloseIcon className="w-3 h-3 ml-2" />
            </button>
          </div>
        ) : (
          <div className="mt-5 !mb-4">
            <Coupon subtotal={Cart.price_details.total_current_price} Cart={Cart} />
          </div>
        )}

        <div className="flex justify-between pt-3 border-t-4 border-double border-border-200">
          <p className="text-base font-semibold text-heading">
            {t('text-total')}
          </p>
          <span className="text-base font-semibold text-heading">
            ₹{Cart.price_details.total_current_price}
          </span>
        </div>
      </div>
      <PaymentGrid cart={Cart} className={""} theme={{}} refetchCart={fetchCart} />
      {verifiedResponse && (
        <Wallet
          totalPrice={Cart.price_details.total_current_price}
          walletAmount={verifiedResponse.wallet_amount}
          walletCurrency={verifiedResponse.wallet_currency}
        />
      )}

      <PlaceOrderAction>Place Order</PlaceOrderAction>
    </div>
  );
};

export default VerifiedItemList;
