import CartCheckBagIcon from '@/components/icons/cart-check-bag';
import { formatString } from '@/lib/format-string';
import usePrice from '@/lib/use-price';
import { drawerAtom } from '@/store/drawer-atom';
import { useCart } from '@/store/quick-cart/cart.context';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { authorizationAtom } from '@/store/authorization-atom';
import { useModalAction } from '../ui/modal/modal.context';
import { showToast } from '../ui/toast/toast';

const CartCounterButton = () => {
  const { t } = useTranslation();
  const { Cart } = useCart();
  const [_, setDisplayCart] = useAtom(drawerAtom);
  const [isAuthorize]=useAtom(authorizationAtom)
  const {openModal}=useModalAction()
  const { price: totalPrice } = usePrice({
    amount: Cart.price_details.total_actual_price ?Cart.price_details.total_actual_price:0 ,
  });

  const handleCartOpen=()=>{
        if(!isAuthorize){
          showToast("Login to continue","warning")
          openModal("LOGIN_VIEW")
        }else if(isAuthorize){
          setDisplayCart({ display: true, view: 'cart' })
        }
  }

  const getText=(quantity)=>{
        if(quantity===0 || quantity===1){
          return "item"
        }else{
          return "items"
        }
  }

  return (
    <button
      className="product-cart fixed top-1/2 z-40 -mt-12 hidden flex-col items-center justify-center rounded bg-accent p-3 pt-3.5 text-sm font-semibold text-light shadow-900 transition-colors duration-200 hover:bg-accent-hover focus:outline-0 ltr:right-0 ltr:rounded-tr-none ltr:rounded-br-none rtl:left-0 rtl:rounded-tl-none rtl:rounded-bl-none lg:flex"
      onClick={()=>handleCartOpen()}
    >
      <span className="flex pb-0.5">
        <CartCheckBagIcon className="shrink-0" width={14} height={16} />
        <span className="flex ltr:ml-2 rtl:mr-2">
          {/* {isAuthorize?cartList?cartList.length +" "+t('common:text-item'):formatString(totalUniqueItems, t('common:text-item')):0} */}
          {/* {formatString(totalUniqueItems, t('common:text-item'))} */}
          {Cart.price_details.total_quantity+" "+getText(Cart.price_details.total_quantity)}

        </span>
      </span>
      <span className="mt-3 w-full rounded bg-light px-2 py-2 text-accent">
        {/* {isAuthorize?currency_symbol+total_current_price:totalPrice} */}
        {/* {totalPrice} */}
        {Cart.country.currency_symbol+Cart.price_details.total_current_price}
      </span>
    </button>
  );
};

export default CartCounterButton;
