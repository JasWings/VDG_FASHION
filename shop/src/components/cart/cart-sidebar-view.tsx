import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import CartCheckBagIcon from '@/components/icons/cart-check-bag';
import EmptyCartIcon from '@/components/icons/empty-cart';
import { CloseIcon } from '@/components/icons/close-icon';
import CartItem from '@/components/cart/cart-item';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import { Routes } from '@/config/routes';
import usePrice from '@/lib/use-price';
import { useCart } from '@/store/quick-cart/cart.context';
import { formatString } from '@/lib/format-string';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { authorizationAtom } from '@/store/authorization-atom';
import ProgressBar from '../ui/progressBar';
// import { useCountry } from '@/store/country/country.context';


const CartSidebarView = () => {
  const { t } = useTranslation('common');
  const { items,Cart} = useCart();
  const [_, closeSidebar] = useAtom(drawerAtom);
  const router = useRouter();
  const [isAuthorize]=useAtom(authorizationAtom)
  // const {selectedCountry}=useCountry()

  // const {total_current_price,currency_symbol ,cartList,cartDetails }=isAuthorize?useCarts():{total_current_price:null,currency_symbol:null}
  function handleCheckout() {
    const isRegularCheckout = items.find((item) => !Boolean(item.is_digital));
    if (isRegularCheckout) {
      router.push(Routes.checkout, undefined, {
        locale: "",
      });
    } else {
      router.push(Routes.checkoutDigital, undefined, {
        locale: "",
      });
    }

    closeSidebar({ display: false, view: '' });
  }

  const { price: totalPrice } = usePrice({
    amount: Cart.price_details.total_actual_price,
    currencyCode: "INR"
  }); 
  

  return (
    <section className="relative flex h-full flex-col">
      <header className="fixed top-0 z-10 flex w-full max-w-md flex-col justify-between border-b border-border-200 border-opacity-75 bg-light px-6 py-4">
        <div className=' flex flex-row justify-between'>
        <div className="flex font-semibold text-accent">
          <CartCheckBagIcon className="shrink-0" width={24} height={22} />
          <span className="flex ltr:ml-2 rtl:mr-2">
            {/* {formatString(totalUniqueItems, t('text-item'))} */}
            {/* {cartDetails?cartDetails.price_details.total_quantity:0} */}
            {Cart.price_details.total_quantity}
          </span>
        </div>
        <button
          onClick={() => closeSidebar({ display: false, view: '' })}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-muted transition-all duration-200 hover:bg-accent hover:text-light focus:bg-accent focus:text-light focus:outline-0 ltr:ml-3 ltr:-mr-2 rtl:mr-3 rtl:-ml-2"
        >
          <span className="sr-only">{t('text-close')}</span>
          <CloseIcon className="h-3 w-3" />
        </button>
        </div>
        <div>
        {/* <ProgressBar totalKg={1} valueInGrams={Cart.price_details.total_weight_in_grams} /> */}
        </div>
      </header>
      {/* End of cart header */}
      <motion.div layout className="grow pt-[80px] pb-20">
        {
        items.length > 0 ? (
          items?.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <motion.div
            layout
            initial="from"
            animate="to"
            exit="from"
            variants={fadeInOut(0.25)}
            className="flex h-full flex-col items-center justify-center"
          >
            <EmptyCartIcon width={140} height={176} />
            <h4 className="mt-6 text-base font-semibold">
              No Products found
            </h4>
          </motion.div>
        )}
      </motion.div>
      {/* End of cart items */}

      <footer className="fixed bottom-0 z-10 w-full max-w-md bg-light px-6 py-5">
        {
          Cart.items.length!==0&&(
            <button
            className="flex h-12 w-full justify-between rounded-full bg-accent p-1 text-sm font-bold shadow-700 transition-colors hover:bg-accent-hover focus:bg-accent-hover focus:outline-0 md:h-14"
            onClick={handleCheckout}
            disabled={Cart.items.length===0}
          >
            <span className="flex h-full flex-1 items-center px-5 text-light">
              Checkout
            </span>
            <span className="flex h-full shrink-0 items-center rounded-full bg-light px-5 text-accent">
              {/* {isAuthorize?currency_symbol+total_current_price:totalPrice} */}
              {/* {totalPrice} */}
              &#8377; {Cart.price_details.total_current_price}
            </span>
          </button>
          )
        }
      </footer>
      {/* End of footer */}
    </section>
  );
};

export default CartSidebarView;
