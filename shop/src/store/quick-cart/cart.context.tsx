import React, { useCallback, useEffect, useState } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, inStock } from './cart.utils';
import { useAtom } from 'jotai';
import { verifiedResponseAtom } from '@/store/checkout';
import client from '@/framework/client';
import { authorizationAtom } from '@/store/authorization-atom';
// import { useCountry } from '../country/country.context';
import { useLocalStorage } from "@/lib/use-local-storage"
import { CART_KEY } from '@/lib/constants';


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
  const [savedCart, saveCart] = useLocalStorage(
    CART_KEY,
    JSON.stringify(initialState)
  );
  const [, emptyVerifiedResponse] = useAtom(verifiedResponseAtom);
  const [isAuthorize]=useAtom(authorizationAtom)
  const [state, dispatch] = React.useReducer(cartReducer, isAuthorize ? JSON.parse(savedCart) : initialState);

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

  React.useEffect(() => {
    if(!isAuthorize){
      saveCart(JSON.stringify(state));
    }
  }, [state, saveCart]);

  const addItemsToCart = (item: Item, quantity: number) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });

  const addItemToCart = async(id: string, quantity: number) =>{
    try {
      const cartObject={product:id,quantity:quantity}
      const response=await client.cart.update(cartObject)
      fetchCart()
      return response
    } catch (error) {
      return error.response.data
    }
  }

  const removeItemFromCart = async(id: string,quantity:number) =>{
        const cartObject={product:id,quantity:quantity}
        const response=await client.cart.update(cartObject)
        fetchCart()
        return response
  }


  const clearItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM', id });
  const removesItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });

  const isInCart = useCallback(
    (id: Item['id']) => !!getItem(state.items, id,isAuthorize),
    [state.items]
  );

  const getItemFromCart = useCallback(
    (id: Item['id']) => getItem(state.items, id,isAuthorize),
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
      removesItemFromCart
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );

  return <cartContext.Provider value={value} {...props} />;
};