'use client'
import React ,{ReactNode,useEffect,useState} from "react"
import {ChakraProvider} from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js"
import theme from "@/theme/theme"
import { isAuthenticated } from "@/utils/auth"
import { LoadingProvider } from "@/context/loadingContext"
import { UserProvider } from "@/context/UserContext"
import { ProductProvider } from "@/context/productContext/productContext"
import { ObjectProvider } from "@/context/state/stateContext"
import Loader from "@/utils/helpers/loader"
import { ProductDetailsProvider } from "@/context/productContext/productDetailsContext"
import { ModalProvider } from "@/components/ui/modal/modal.context"
import { CartProvider } from "@/contexts/quick-cart/cart.context"
import { Provider } from "react-redux"
import { store } from "@/store"

export default function AppWrappers({children}:{children:ReactNode}){
  const [isTokenChecked, setIsTokenChecked] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            if(window.location.pathname !== '/auth/sign-in' && window.location.pathname !== '/auth/sign-up'){
                window.location.href='/auth/sign-in'
            }
          }
        }, 60*60 * 1000); 
      }, []);

    useEffect(() => {
        if (!isAuthenticated()) {
            
            if(window.location.pathname !== '/auth/sign-in' && window.location.pathname !== '/auth/sign-up'){
            window.location.href='/auth/sign-in'
            }
          } 
          setIsTokenChecked(true);     
        }, []);

        
    return(
      <Provider store={store}>
        <CacheProvider>
            <ChakraProvider theme={theme}>
              <LoadingProvider>
                <UserProvider>
                <ProductProvider>
                <ObjectProvider>
                <ProductDetailsProvider>
                <ModalProvider>
                <CartProvider>
                {isTokenChecked ? children : <Loader />}
                </CartProvider>
                </ModalProvider>
                </ProductDetailsProvider>
                </ObjectProvider>
                </ProductProvider>
                </UserProvider>
              </LoadingProvider>
              </ChakraProvider>
        </CacheProvider>
        </Provider>
    )
}