import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { siteSettings } from '@/config/site';
import Counter from '@/components/ui/counter';
import { CloseIcon } from '@/components/icons/close-icon';
import { fadeInOut } from '@/lib/motion/fade-in-out';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useCart } from '@/store/quick-cart/cart.context';
import { showToast } from '../ui/toast/toast';
import { useState ,useEffect} from 'react';
import { SpinnerLoader } from '../ui/loaders/spinner/spinner';
import { getImageURL } from '@/lib/image';
// import { useCountry } from '@/store/country/country.context';

interface CartItemProps {
  item: any;
  Cart?:any;
}

const isOfferProduct = (item:any, appliedOffer:any) => {
  if (!appliedOffer) return false;

  const { freeProducts } = appliedOffer;

  const isFreeProduct = freeProducts.some(
    (freeProduct:any) => freeProduct._id === item.product._id
  );
 
  console.log(isFreeProduct,item,appliedOffer,freeProducts)
  return isFreeProduct
};

const CartItem = ({ item }: CartItemProps) => {
  const { t } = useTranslation('common');
  const {
    isInStock,
    clearItemFromCart,addItemsToCart,
    addItemToCart,
    removeItemFromCart,
    updateCartLanguage,
    Cart,
    getCurrentLimit
  } = useCart();
  const [isLoading,setIsLoading]=useState(false)
  const [itemLoading,setItemLoading]=useState(false)
  // const {selectedCountry}=useCountry()
  const appliedOffer = Cart?.price_details?.applied_offer;
const hideAddToCart = isOfferProduct(item, appliedOffer);

  const clearLoading=()=>{
    setIsLoading(false)
  }
console.log(hideAddToCart,"hide")
  useEffect(()=>{
    if(isLoading){
       const intervalId=setInterval(clearLoading,750)
       return()=> clearInterval(intervalId)
    }
  },[isLoading])

  const findPriceIndex=()=>{
    let countryIndex: number | undefined
    const PriceIndex=  item?.product?.product_prices.map((list:any,index:number)=>{
        // if(list.country===selectedCountry.id ){
        //    return countryIndex=index
        // }
    })
  return countryIndex
}

  const { price } = usePrice({
    amount: item.sale_price,
    currencyCode: "INR"
  });
  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
    currencyCode: "INR"
  });
  const handleIncrement=async(e: any)=>{
    setIsLoading(true)
    const checkWeightValidation:any=getCurrentLimit(item.product)
    if(checkWeightValidation){
      return showToast("product weight limit reached","warning")
    }
    e.stopPropagation();
    const cart:any=Cart.items.filter((i)=>i.product.uuid===item.product.uuid)
    const currentCount=cart&&cart[0]?cart[0].quantity+1:1
    const response:any=await addItemToCart(item.product.uuid, currentCount);
    showToast(`${response.message}`,response.status==="failed"?"error":response.status)
    // setIsLoading(false)
  }
  
  const handleRemoveClick = async(e: any) => {
    setIsLoading(true)
    const currentCart:any=Cart.items.filter((i)=>i.product.uuid===item.product.uuid)
    const currentQuantity:any=currentCart[0].quantity===1?0:currentCart[0].quantity-1
    const response:any=await removeItemFromCart(item.product.uuid,currentQuantity);
    showToast(`${response.message}`,response.status==="failed"?"error":response.status)
    // setIsLoading(false)
  };
  const outOfStock = !isInStock(item.id);

  const handleRemoveProduct=async(item:any)=>{
    setItemLoading(true)
   await addItemToCart(item.product.uuid,0)
   setItemLoading(false)

  }

  return (
    <>
    {
     itemLoading
    ?
    <div className=' flex justify-center h-[116px] items-center'>
    <SpinnerLoader />
    </div>
    :
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex  border-b border-solid border-border-200 border-opacity-75 px-4 py-4 text-sm sm:px-6"
    >
     
      <div className="relative  mr-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden  sm:h-16 sm:w-16">
        <Image
          src={ getImageURL(item?.product?.image?.file ? item?.product?.image.file : item.image ) ?? siteSettings?.product?.placeholderImage}
          alt={item?.product?.identity ?? item?.identity}
          fill
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
        />
      </div>
      <div className=' flex flex-col'>
      <div className=' pb-2 md:pb-5 '>
        {/* <h3 className="font-bold text-heading">{item.name}</h3> */}
        <p className="font-light md:font-bold text-heading ">{item.product.identity} </p>
        {/* <p className="my-2.5 font-semibold text-accent">{price}</p> */}
        <p className=" text-[10px] leading-[10px] md:text-xs text-body w-[132px] md:w-auto">
          &#8377; {item.product.sale_price}
        </p>
      </div>
 {!hideAddToCart ? (
  <div className="flex-shrink-0">
    <Counter
      value={item.quantity}
      limit={getCurrentLimit(item)}
      onDecrement={handleRemoveClick}
      onIncrement={handleIncrement}
      variant="helium"
      disabled={outOfStock}
      isLoading={isLoading}
    />
  </div>
) : (
    <div className="flex items-center justify-center rounded bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
    🎉 Offer
  </div>
)}

      </div>
      <div className='flex w-full h-full flex-row justify-evenly items-center'>
        <div>
        <span className=" my-2.5 font-semibold text-accent  ltr:ml-auto rtl:mr-auto">
        &#8377; { (item.quantity* item.sale_price)}
      </span>
        </div>
        <div>
        {!hideAddToCart &&<button
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-0 ltr:ml-3 ltr:-mr-2 rtl:mr-3 rtl:-ml-2"
        onClick={() => handleRemoveProduct(item)}
        >
        <span className="sr-only">{t('text-close')}</span>
        <CloseIcon className="h-3 w-3" />
        </button>}
        </div>
      </div>
    </motion.div>
    }
    </>
  );
};

export default CartItem;