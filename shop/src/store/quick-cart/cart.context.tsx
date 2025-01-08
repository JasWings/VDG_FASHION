import React, { useCallback, useEffect, useState } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, inStock, addItemWithQuantity } from './cart.utils';
import { useAtom } from 'jotai';
import { verifiedResponseAtom } from '@/store/checkout';
import client from '@/framework/client';
import { authorizationAtom } from '@/store/authorization-atom';
// import { useCountry } from '../country/country.context';


interface CartProviderState extends State {
  addItemsToCart: (items: Item[]) => void;
  addItemToCart: (id: string, quantity: number) => void;
  removeItemFromCart: (id: Item['id'],quantity:number) => void;
  clearItemFromCart: (id: Item['id']) => void;
  getItemFromCart: (id: Item['id']) => any | undefined;
  isInCart: (id: Item['id']) => boolean;
  isInStock: (id: Item['id']) => boolean;
  resetCart: () => void;
  updateCartLanguage: (language: string) => void;
  getCurrentCart:()=>void,
  Cart:State,
  getCurrentLimit:(item:State)=>void,
  fetchCart:()=>void
}

export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw  Error(`useCart must be used within a CartProvider`);
  }
  return React.useMemo(() => context, [context]);
};

export const CartProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);
  const [, emptyVerifiedResponse] = useAtom(verifiedResponseAtom);
  const [isAuthorize]=useAtom(authorizationAtom)
  // const {selectedCountry}=useCountry()

  const fetchCart = async () => {
    try {
      const response = await client.cart.all();
      dispatch({ type: 'SET_CART', cartData: response.data }); 
    } catch (error) {
    }
  };
  useEffect(()=>{
  })
  useEffect(() => {
    emptyVerifiedResponse(null);
    if(isAuthorize){
      fetchCart()
    }
  }, [emptyVerifiedResponse]);

  const addItemsToCart = (items: Item[]) =>{
    dispatch({ type: 'ADD_ITEMS_WITH_QUANTITY', items });
  }
  
  const addItemToCartLocal = (item: Item, quantity: number) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });

  const addItemToCart = async (id: string, quantity: number) => {
  if (isAuthorize) {
    const response = await client.cart.update({ product: id, quantity });
    fetchCart();
    return response;
  } else {
    const item = getItem(state.items, id) || { id, quantity: 0 };
    const updatedItem = { ...item, quantity: item.quantity + quantity };
    const updatedCart = addItemWithQuantity(state.items, updatedItem, quantity);
    dispatch({ type: 'SET_CART', cartData: updatedCart });
    saveCartToLocalStorage(updatedCart);
  }
};

  
  const removeItemFromCart = async(id: string,quantity:number) =>{
        const cartObject={product:id,quantity:quantity}
        const response=await client.cart.update(cartObject)
        fetchCart()
        return response
  }


  const clearItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM', id });

  const isInCart = useCallback(
    (id: Item['id']) => !!getItem(state.items, id),
    [state.items]
  );

  const getItemFromCart = useCallback(
    (id: Item['id']) => getItem(state.items, id),
    [state.items]
  );

  const isInStock = useCallback(
    (id: Item['id']) => inStock(state.items, id),
    [state.items]
  );

  const updateCartLanguage = (language: string) =>
    dispatch({ type: 'UPDATE_CART_LANGUAGE', language });

  const getCurrentCart=()=>{
    return state
  }

  const getCurrentLimit=(item:any)=>{
        const product=state.items.filter((i)=>i.product?.uuid===item.uuid)
        const limit= 1000
        if(product&&product[0]){
          const weight=product[0].product.weight_in_grams
          const quantity:any=product[0].quantity
          const totalWeight=quantity*weight
          return totalWeight===limit || totalWeight >limit?true:false
        }else{
          return false
        }
  }

  const resetCart = () => dispatch({ type: 'RESET_CART' });

  const value = React.useMemo(
    () => ({
      ...state,
      Cart:state,
      addItemsToCart,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
      updateCartLanguage,
      getCurrentCart,
      getCurrentLimit,
      fetchCart,
      addItemToCartLocal
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );

  return <cartContext.Provider value={value} {...props} />;
};
