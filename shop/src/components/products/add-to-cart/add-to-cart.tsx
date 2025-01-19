import Counter from '@/components/ui/counter';
import AddToCartBtn from '@/components/products/add-to-cart/add-to-cart-btn';
import { cartAnimation } from '@/lib/cart-animation';
import { useCart } from '@/store/quick-cart/cart.context';
import { generateCartItem } from '@/store/quick-cart/generate-cart-item';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@/store/authorization-atom';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { showToast } from '@/components/ui/toast/toast';
import { useState ,useEffect} from 'react';

interface Props {
  data: any;
  variant?:
    | 'helium'
    | 'neon'
    | 'argon'
    | 'oganesson'
    | 'single'
    | 'big'
    | 'text';
  counterVariant?:
    | 'helium'
    | 'neon'
    | 'argon'
    | 'oganesson'
    | 'single'
    | 'details';
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
  cartProduct:any
}

export const AddToCart = ({
  data,
  variant = 'helium',
  counterVariant,
  counterClass,
  variation,
  disabled,
  cartProduct
}: Props) => {
  const {
    addItemToCart,
    removeItemFromCart,
    addItemsToCart,
    isInStock,
    getItemFromCart,
    isInCart,
    Cart,
    getCurrentLimit,removesItemFromCart
  } = useCart();
  const [isAuthorize]=useAtom(authorizationAtom)
  const item:any = generateCartItem(data, variation);
  // const {currentQuantity}=getProductCartDetails(item.uuid)
  const {openModal}=useModalAction()
  // const  updateCart  = useCartUpdate();
  // const {cartProducts}=useCartProducts()
  const [isLoading,setIsLoading]=useState(false)

  const clearLoading=()=>{
    setIsLoading(false)
  }

  useEffect(()=>{
    if(isLoading){
       const intervalId=setInterval(clearLoading,750)
       return()=> clearInterval(intervalId)
    }
  },[isLoading])



  const handleAddClick = async(
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    setIsLoading(true)
    if(isAuthorize ){
      const cart:any=Cart.items.filter((i)=>i.product.uuid===data.uuid)
      const currentCount=cart&&cart[0]?cart[0].quantity+1:1
     const response:any=await addItemToCart(item.uuid, currentCount);
     
      cartAnimation(e);
      showToast(`${response.message}`,response.status==="failed"?"error":response.status)
      const checkWeightValidation:any=getCurrentLimit(data)
      if(checkWeightValidation){
        return showToast("product weight limit reached","warning")
      }
    }else if(!isAuthorize){
      addItemsToCart(item,1)
    }
    
    // setIsLoading(false)
  };
  const handleRemoveClick = async(e: any) => {
    e.stopPropagation();
    if(isAuthorize){
      setIsLoading(true)
      const currentCart:any=Cart.items.filter((i)=>i.product.uuid===data.uuid)
      const currentQuantity=currentCart[0].quantity===1?0:currentCart[0].quantity-1
      const response:any=await removeItemFromCart(item.uuid,currentQuantity);
      showToast(`${response.message}`,response.status)
    }else if(!isAuthorize){
      removesItemFromCart(item.id)
    }
    
    // setIsLoading(false)
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);

  const handleAddCart=(item:any)=>{
    console.log(item,"item",data)
        setIsLoading(true)
        if(isAuthorize){
          handleAddClick(item)
        }else if(!isAuthorize){
          // setIsLoading(false)
          // openModal('LOGIN_VIEW')
          // showToast("Login to continue","warning")
          addItemsToCart(item,1)
        }
  }
  
  getCurrentLimit(item)
  return !isInCart(item?.uuid)?(
    <div>
      {!data?.is_external || !data?.external_product_url ? (
        <AddToCartBtn
          disabled={
            disabled || outOfStock || data.status.toLowerCase() != 'publish'
          }
          variant={variant}
          onClick={()=>handleAddCart(item)}
        />
      ) : (
          <Link href={data?.external_product_url} target="_blank" className='inline-flex items-center justify-center font-semibold text-sm leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-0 focus:shadow focus:ring-1 focus:ring-accent-700 bg-accent text-light border border-transparent hover:bg-accent-hover px-5 py-0 h-10 !shrink'>
            {data?.external_product_button_text}
          </Link>
      )}
    </div>
  ) : (
    <>
      <Counter
      value={getItemFromCart(item.uuid)?.quantity}
      limit={getCurrentLimit(item)}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      variant={counterVariant || variant}
      className={counterClass}
      disabled={outOfStock}
      isLoading={isLoading}
    />
    </>
  )
};
