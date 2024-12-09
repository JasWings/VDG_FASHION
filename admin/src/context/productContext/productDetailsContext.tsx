import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the ProductDetails interface
interface ProductDetails {
  productTitle: string;
  productDescription: string;
  slug:string;
  images: any[]; // You may want to define a more specific type for productImages
  thumb_image: number;
  main_image: number;
  sku: string;
  Active: string;
  Category: string;
  product_prices: {
    Regusd: string;
    Reginr: string;
    Reggbp: string;
    Regaed: string;
    Actusd: string;
    Actinr: string;
    Actgbp: string;
    Actaed: string;
  };
  tags: string[]; // You may want to define a more specific type for tags
  stock: string;
  weight: string;
  brand: string;
  nutritionValues: {
    calories: string;
    totalFat: string;
    totalCarbohydrates: string;
    dietaryFiber: string;
    sugar: string;
    protein: string;
    calcium: string;
    iron: string;
    sodium: string;
    potassium: string;
  };
}

// Create a context for the ProductDetails
interface ProductDetailsContextType {
  productDetails: ProductDetails;
  setProductDetails: Dispatch<SetStateAction<ProductDetails>>;
}

const ProductDetailsContext = createContext<ProductDetailsContextType | undefined>(undefined);

// Create a provider component for the ProductDetails context
interface ProductDetailsProviderProps {
  children: ReactNode;
}

export const ProductDetailsProvider: React.FC<ProductDetailsProviderProps> = ({ children }) => {
  // Initialize productDetails with default values or fetch from an API
  const initialProductDetails: ProductDetails = {
    productTitle: '',
    productDescription: '',
    images: [],
    thumb_image: null,
    main_image: null,
    slug:"",
    sku: '',
    Active: '',
    Category: '',
    product_prices: {
      Regusd: '',
      Reginr: '',
      Reggbp: '',
      Regaed: '',
      Actusd: '',
      Actinr: '',
      Actgbp: '',
      Actaed: '',
    },
    tags: [],
    stock: '',
    weight: '',
    brand: '',
    nutritionValues: {
      calories: '',
      totalFat: '',
      totalCarbohydrates: '',
      dietaryFiber: '',
      sugar: '',
      protein: '',
      calcium: '',
      iron: '',
      sodium: '',
      potassium: '',
    },
  };

  const [productDetails, setProductDetails] = useState<ProductDetails>(initialProductDetails);

  const contextValue: ProductDetailsContextType = {
    productDetails,
    setProductDetails,
  };

  return (
    <ProductDetailsContext.Provider value={contextValue}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export const useProductDetails = () => {
  const context = useContext(ProductDetailsContext);
  if (context === undefined) {
    throw new Error('useProductDetails must be used within a ProductDetailsProvider');
  }
  return context;
};
