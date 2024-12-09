import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { get } from "@/utils/url/api";
import { getTagEndPoint,getAllBrandEndPoint,getAllProductEndPoint,getCategoryEndPoint } from "@/utils/url/url";


const defaultContextValue = {
  categories: [],
  subcategories: [],
  tags: [],
  brand:[],
  allProducts:[],
  CurrentNewProduct:{},
  updateCategories: (newCategories) => {},
  updateSubcategories: (newSubcategories) => {},
  updateTags: (newTags) => {},
  updateBrands:(brand)=>{},
  updateAllProducts:(product)=>{},
  setCurrentNewProduct:(current)=>{}
};

export const ProductContext = createContext(defaultContextValue);

export const useGlobalContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [brand,setBrand]=useState([])
  const [allProducts,setAllProducts]=useState([])
  const [CurrentNewProduct,setCurrentNewProduct]=useState({})

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const updateSubcategories = (newSubcategories) => {
    setSubcategories(newSubcategories);
  };

  const updateTags = (newTags) => {
    setTags(newTags);
  };

  const updateBrands=(brand)=>{
    setBrand(brand)
  }

  const updateAllProducts=(product)=>{
    setAllProducts(product)
  }

  useEffect(() => {
    const getTages = async () => {
      try {
        const AllTags: any = await get(getTagEndPoint,{});
        const AllCategories:any =await get(getCategoryEndPoint,{})
        const AllBrands:any=await get(getAllBrandEndPoint,{})
        const response:any =await get(getAllProductEndPoint,{})
        if(response){
           updateAllProducts(response.results)
        }
        updateCategories(AllCategories.results)
        updateTags(AllTags.results)
        updateBrands(AllBrands.results)
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    if(localStorage.getItem("token")){
      getTages();
    }
  },[]);

  const contextValue = {
    categories,
    subcategories,
    tags,
    brand,
    allProducts,
    updateCategories,
    updateSubcategories,
    updateTags,
    updateBrands,
    updateAllProducts,
    CurrentNewProduct,
    setCurrentNewProduct
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
