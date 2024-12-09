import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Select,
  Checkbox,
  Box,
  Img,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react';
import { Update ,get} from '@/utils/url/api';
import { getAllProductEndPoint } from '@/utils/url/url';
import FileInput from '../products/components/fileInput';
import FileUpload from "../products/components/fileUpload"
import Upload from '@/views/admin/profile/components/Upload';
import TagInput2 from '../products/components/taginput';
import Image from 'next/image';
import ImageInput from './components/imageInput';
import EditTagInput from './components/editTagInput';
import { Switch } from '@chakra-ui/react';
import ProductUpload from '../products/file-upload/productUpload';
import ProductEditUpload from '../products/file-upload/productImagesEdit';
import { Spinner } from '@chakra-ui/react';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct: any;
  onSave: (updatedProduct: any) => void;
  updateProduct:any,
  tags: any, categories: any, subCategories: any, brand: any, handleUpdateTags: any, toastObject: any, updateToastObject: any, productId: any, setProductId: any, currentProudt: any, setCurrentProduct: any, productDetails: any, setProductDetails: any, setCurrentNewProduct: any,
  countryList:any
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onSave,updateProduct,
  tags, categories, subCategories, brand, handleUpdateTags, toastObject, updateToastObject, productId, setProductId, currentProudt, setCurrentProduct, productDetails, setProductDetails, setCurrentNewProduct,countryList
}) => {
  const [editedProduct, setEditedProduct] = useState(initialProduct);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImage] = useState({ thumImage: initialProduct?.thumb_image?.file===undefined?null:"https://api.slrexports.com" + initialProduct?.thumb_image?.file, mainImage:initialProduct?.main_image?.file===undefined?null: "https://api.slrexports.com" + initialProduct?.main_image?.file })
  const [tages, setTags] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [matchedTags, setMatchedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(initialProduct?.tags);
  const [priceList,setPriceList]=useState([])
  const [specifications,setSpecfications]=useState([])
  const [newPriceList,setNewPriceList]=useState(false)
  const [loading,setIsLoading]=useState(false)
  const [newPriceList1,setNewPriceList1]=useState([])


  useEffect(() => {
    if (priceList.length === 0 && initialProduct.product_prices.length !== priceList.length) {
       initialProduct.product_prices.forEach((price) => {
         setPriceList((prevPriceList) => ({
           ...prevPriceList,
           [price.country]: {
             ...prevPriceList[price.country],
             actual_price: price.actual_price,
             current_price: price.current_price
           },
         }));
       });
    }

    if (editedProduct?.product_prices.length !== countryList?.length && newPriceList === false) {
      setIsLoading(true);
      const IdsCountry = [];
      const IdsPrice = [];
      const newPriceIds = [];
      countryList?.forEach((i) => IdsCountry.push(i?.id));
      editedProduct?.product_prices?.forEach((i) => IdsPrice?.push(i?.product_country?.id));
      IdsCountry?.forEach((i) => {
         if (!IdsPrice?.includes(i)) {
            newPriceIds.push(i);
         }
      });

      const update = async () => {
        try {
           const response2 = await Update(getAllProductEndPoint, `${editedProduct.uuid}/update_price`, newPriceList1);
           const res = await get(getAllProductEndPoint + `${editedProduct?.uuid}/`, {});
           setNewPriceList(true);
           setEditedProduct(res);
           setIsLoading(false);
        } catch (error) {
           console.log(error, "err");
           setIsLoading(false);
        }
     };
      
      if(newPriceList1.length!==0){ 
       update();
      }else{
        newPriceIds?.forEach((price) => {
          setNewPriceList1((prevPriceList) => ({
             ...prevPriceList,
             [price]: {
                actual_price: 0,
                current_price: 0
             },
          }));
       });
       update();
      }

   }

 }, [priceList]);
 

 
  if(loading){
    return(
      <Box display={"flex"} flexDirection={"column"} height={"100vh"} alignItems={"center"} flexFlow={"row"} justifyContent={"center"}>
      <Spinner 
       thickness='4px'
       speed='0.65s'
       emptyColor='gray.200'
       color='brand.500'
       size='xl'
      />
      </Box>
    )
  }
  const newObj={}
  const fil=initialProduct.product_prices.filter((i)=>Object.assign(newObj,{[i.country]:i}))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if(name==="identity"){
      const newValue=value.split(" ").join("-")
      setEditedProduct((prevProduct)=>({
        ...prevProduct,
        ["slug"]:newValue
      }))
    }
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };
  
  const handleSave = async() => {
    const tagIds=[]
    await selectedTags?.map((i)=>tagIds.push(i.id))
    editedProduct?.product_prices.map((price)=>{
      setPriceList((prevPriceList) => ({
        ...prevPriceList,
        [price.country]: {
          ...prevPriceList[price.country],
          actual_price: price.actual_price,
          current_price:price.current_price
        },
      }));
    })
    const newObj={}
    editedProduct.product_prices.filter((i)=>Object.assign(newObj,{[i.country]:{"actual_price":i.actual_price,"current_price":i.current_price}}))
    try {
      const response2:any=await Update(getAllProductEndPoint,`${editedProduct.uuid}/update_price`,editedProduct?.product_prices.length===0&&priceList.length!==0?priceList:newObj)   
    } catch (error) {
      console.log(error,"err")
    }
    const tags=Array.isArray(editedProduct.tags)?editedProduct?.tags.filter((i)=>tages.push(i.id!==undefined?i?.id:i)):editedProduct?.tags
    const newObject={
      category:editedProduct?.category,
      main_image:editedProduct?.main_image?.id?editedProduct?.main_image?.id:null,
      thumb_image:editedProduct?.thumb_image?.id?editedProduct?.thumb_image?.id:null,
      identity:editedProduct?.identity,
      product_code:editedProduct?.product_code,
      slug:editedProduct?.slug?editedProduct?.slug:editedProduct?.identity.toLowerCase(),
      nutrition_values:editedProduct?.nutrition_values,
    tags:Array.isArray(editedProduct.tags)?tages:tages,    stock:editedProduct?.stock,
    weight_in_grams:editedProduct?.weight_in_grams,
    description:editedProduct?.description,
    specifications:editedProduct?.specifications,
    uuid:editedProduct?.uuid,
    brand:editedProduct?.brand?.id?editedProduct?.brand?.id:editedProduct?.brand,
    is_active:editedProduct?.is_active
    }
    //setEditedProduct((prev)=>({...prev ,newObject}))
    onSave(newObject);
    onClose();
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: checked,
    });
  };

  const handleActualPriceChange = (id: number, event: any) => {
    const { value } = event.target;
    setEditedProduct((prev) => ({
      ...prev,
      product_prices: prev.product_prices.map((price, index) =>
        index === id
          ? {
              ...price,
              actual_price: value,
            }
          : price
      ),
    }));
  };

  const handleActualPrices=(id:number,event:any)=>{
    const {name,value}=event?.target
    setPriceList((prevPriceList) => ({
     ...prevPriceList,
     [id]: {
       ...prevPriceList[id],
       actual_price: value,
     },
   }));
 }

 const handleRegularPrices=(id:number,event)=>{
       const {name,value}=event?.target 
       setPriceList((prevPriceList) => ({
         ...prevPriceList,
         [id]: {
           ...prevPriceList[id],
           current_price: value,
         },
       }));
 }

  const handleCurrentPriceChange = (id: number, event: any) => {
    const { value } = event.target;

    setEditedProduct((prev) => ({
      ...prev,
      product_prices: prev.product_prices.map((price, index) =>
        index === id
          ? {
              ...price,
              current_price: value,
            }
          : price
      ),
    }));
  };

  const handleSpecificationValues = (index, event) => {
    const { name, value } = event.target;
    if(Array.isArray(editedProduct.specifications)){
      const updatedSpecifications = [...editedProduct.specifications];
      updatedSpecifications[index][name] = value;
  
      setEditedProduct({
        ...editedProduct,
        specifications: updatedSpecifications,
      });
    }else{
      const updatedSpecifications = editedProduct.specifications

      updatedSpecifications[index]
  
      setEditedProduct({
        ...editedProduct,
        specifications: updatedSpecifications,
      });
    }

  };

  const handleNutritionValue = (index, event) => {
      const { name, value } = event.target;
      const updatedNutrition = [...editedProduct.nutrition_values];
      updatedNutrition[index][name] = value;
  
      setEditedProduct({
        ...editedProduct,
        nutrition_values: updatedNutrition,
      });
  };

  const handleChangeKey=(key,value)=>{
        const initialNutritionValues=editedProduct?.nutrition_values
        initialNutritionValues[key]=initialNutritionValues[value.target.value]
        initialNutritionValues[value.target.value]=editedProduct?.nutrition_values[key]
        delete initialNutritionValues[key]
        setEditedProduct({
          ...editedProduct,
          nutrition_values:initialNutritionValues
        })
  }

  const handleChangeValue=(key,value)=>{
    const initialNutritionValues=editedProduct?.nutrition_values
    initialNutritionValues[key]=value
    setEditedProduct({
      ...editedProduct,
      nutrition_values:initialNutritionValues
    })
  }

  const handleChangeKey1=(key,value)=>{
    const initialNutritionValues=editedProduct?.specifications
    const value1=editedProduct?.specifications[key]
    initialNutritionValues[key]=initialNutritionValues[value.target.value]
    initialNutritionValues[value.target.value]=value1
    delete initialNutritionValues[key]
    setEditedProduct({
      ...editedProduct,
      specifications:initialNutritionValues
    })
}

const handleChangeValue1=(key,value)=>{
const initialNutritionValues=editedProduct?.specifications
initialNutritionValues[key]=value
setEditedProduct({
  ...editedProduct,
  specifications:initialNutritionValues
})
}

  const handleAddNutritionField = () => {
    if(Array.isArray(editedProduct.nutrition_values)){
      const initialNutritionValues = editedProduct?.nutrition_values || [{ NutritionName: '', NutritionValue: '' }];
      const updatedNutritionValues = [
        ...initialNutritionValues,
        { NutritionName: '', NutritionValue: '' }
      ];
  
      setEditedProduct({
        ...editedProduct,
        nutrition_values: updatedNutritionValues
      });

    }else{
      const initialNutritionValues = editedProduct?.nutrition_values || { };
     initialNutritionValues["name"]="value"
  
      setEditedProduct({
        ...editedProduct,
        nutrition_values: initialNutritionValues
      });
    }

  };

  const handleRemoveNutritionField = (index) => {
    if(Array.isArray(editedProduct?.nutrition_values)){
      const initialNutritionValues = editedProduct?.nutrition_values || [];
      const updatedNutritionValues = initialNutritionValues.filter((_, i) => i !== index);
  
      setEditedProduct({
        ...editedProduct,
        nutrition_values: updatedNutritionValues
      });
    }else{
      const initialNutritionValues = editedProduct?.nutrition_values;
      delete initialNutritionValues[index]
      setEditedProduct({
        ...editedProduct,
        nutrition_values: initialNutritionValues
      });
    }

  };

  const handleAddFields=()=>{
      if(Array.isArray(editedProduct?.specifications)){
        const initialSpecifications=editedProduct?.specifications || []
        const updateSpeifications=[
              ...initialSpecifications,
              {specificatioName: " ", specificationValue: " "} 
        ]
        setEditedProduct({
          ...editedProduct,
          specifications:updateSpeifications
        })
      }else{
        const initialSpecifications=editedProduct?.specifications
        initialSpecifications["name"]="value"
        setEditedProduct({
          ...editedProduct,
          specifications:initialSpecifications
        }) 
      }
  }

  const handleRemoveFields=(index)=>{
    if(Array.isArray(editedProduct?.specifications)){
      const initialNutritionValues = editedProduct?.specifications || [];
      const updatedSpecificationsValues = initialNutritionValues.filter((_, i) => i !== index);
  
      setEditedProduct({
        ...editedProduct,
        specifications: updatedSpecificationsValues
      });
    }else{
        const initialNutritionValues = editedProduct?.specifications ;
        delete initialNutritionValues[index]
    
        setEditedProduct({
          ...editedProduct,
          specifications: initialNutritionValues
        });
    }

  }
  const isObject = (value) => typeof value === 'object' && !Array.isArray(value);
  const isArray = (value) => Array.isArray(value);
  
  if(specifications.length===0&&editedProduct?.specifications){
    specifications.push(editedProduct?.specifications)
  }

  console.log(editedProduct,editedProduct?.specifications,Array.isArray(editedProduct?.specifications))
  

  return (
    <>
      <Box display="flex" padding="20px">
        <form style={{ width: "85%" }} onSubmit={handleSave}>
          {/* Title Input */}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel width={"50%"} textStyle={"fs6"}>Product Title / Name</FormLabel>
            <Flex w={"100%"}>
              <Input
                type="text"
                name="identity"
                value={editedProduct.identity || ''}
                onChange={handleChange}
                placeholder="Product Title/name"
                borderRadius={'10px'}
                height={'46px'}
                focusBorderColor={'#BDBDBD'}
                textStyle={'fs6'}
              />
            </Flex>
          </FormControl>
          {/* Product Description */}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel w={{ sm: "100%", "2xl": "50%" }} textStyle={"fs6"}>Product Description</FormLabel>
            <Flex w={"100%"}>
              <Textarea
                placeholder="Enter product description"
                value={editedProduct.description || ''}
                onChange={handleChange}
                name="description"
                h={"209px"}
                focusBorderColor={"#BDBDBD"}
                borderRadius={"10px"}
              />
            </Flex>
          </FormControl>
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel width={"50%"} textStyle={"fs6"}>Product Slug</FormLabel>
            <Flex w={"100%"}>
              <Input
                type="text"
                name="slug"
                value={editedProduct.slug || ''}
                onChange={handleChange}
                placeholder="Slug"
                borderRadius={'10px'}
                height={'46px'}
                focusBorderColor={'#BDBDBD'}
                textStyle={'fs6'}
              />
            </Flex>
          </FormControl>
        <ImageInput id={"main_image"} label={"Main Image"} title={"mainImage"} imagePreview={{image:images?.mainImage}}  images={images} setImagePreview={setImage} productDetails={editedProduct} setProductDetails={setEditedProduct}  />
        <ImageInput id={"thumb_image"} label={"Thumb Image"} title={"thumImage"} imagePreview={{image:images?.thumImage}} images={images} setImagePreview={setImage} productDetails={editedProduct} setProductDetails={setEditedProduct} />
        <ProductEditUpload 
        h={"134px"}
        border={"1px solid #D2D2D2"}
        productDetails={editedProduct} 
        setProductDetails={setEditedProduct} />
          {/* sku input */}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel w={"50%"} textStyle={"fs6"} h={"46px"}>SKU</FormLabel>
            <Flex w={"100%"}>
              <Input
                type="text"
                placeholder="Enter SKU"
                value={editedProduct.product_code}
                name="product_code"
                onChange={handleChange}
              />
            </Flex>
          </FormControl>
          {/* Category */}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"}>
            <FormLabel w={"50%"}>Category</FormLabel>
            <Flex w={"100%"} textStyle={"fs6"}>
              <Select onChange={handleChange} placeholder="Select category" h={"46px"} name="category"  value={editedProduct?.category?.id}>
                {categories.map((cate: any) =>
                (
                  <option key={cate.id} value={cate.id} selected={initialProduct?.category?.identity===cate.identity}>
                    {cate.identity}
                  </option>
                ))}
              </Select>
            </Flex>
          </FormControl>
          {
            editedProduct?.product_prices.length===0?
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
            <Flex w={"35%"} textStyle={"fs6"}>Price<Text as={"span"} color={"red"}>*</Text></Flex>
            <Flex flexDirection={"column"} gap={"10px"} w={"65%"} justifyContent={"flex-start"}>
              {
               countryList?.map((country)=>(
                 <Flex key={country.uuid} flexDirection={"column"} gap={"10px"}>
                   <Text  fontWeight={"bold"}>{country?.identity}</Text>
                   <Flex flexDirection={"row"} justifyContent={"space-between"} gap={"20px"}>
                   <InputGroup>
                   {/* Actual Price */}
                         <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                         <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={'MRP Price'} id={'priceactual'+country?.currency_code} name='actual_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
                   </InputGroup>
                   {/* Current Price */}
                   <InputGroup>
                         <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                         <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={'Sales Price'} id={'pricecurrent'+country?.currency_code} name='current_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
                       </InputGroup>
                   </Flex>
                 </Flex>
               ))
              }
            </Flex>
         </FormControl>
          // <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
          //      <Flex w={"60%"} textStyle={"fs6"}>Price<Text as={"span"} color={"red"}>*</Text></Flex>
          //      <Flex flexDirection={"column"} gap={"10px"}>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList.slice(0,4)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList.slice(4,8)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //                         <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList.slice(8,12)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //                         <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList.slice(8,12)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //                         <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList.slice(12,16)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList?.slice(0,4)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList?.slice(4,8)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //       <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList?.slice(8,12)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //                         <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           countryList?.slice(12,16)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
          //                   <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={priceList?.length!==0&&priceList[country?.id]?priceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //      </Flex>
          //   </FormControl>
:
<FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
<Flex w={"35%"} textStyle={"fs6"}>Price<Text as={"span"} color={"red"}>*</Text></Flex>
<Flex flexDirection={"column"} gap={"10px"} w={"65%"} justifyContent={"flex-start"}>
  {
   editedProduct?.product_prices?.map((country,index)=>(
     <Flex key={country.uuid} flexDirection={"column"} gap={"10px"}>
       <Text  fontWeight={"bold"}>{country?.product_country?.identity}</Text>
       <Flex flexDirection={"row"} justifyContent={"space-between"} gap={"20px"}>
       <InputGroup>
       {/* Actual Price */}
             <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
             <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={'MRP Price'} id={'priceactual'+country?.product_country?.currency_code} name='actual_price' value={country?.actual_price} onChange={(e)=>handleActualPriceChange(index,e)} isRequired />
       </InputGroup>
       {/* Current Price */}
       <InputGroup>
             <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
             <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={'Sales Price'} id={'pricecurrent'+country?.product_country?.currency_code} name='current_price' value={country?.current_price} onChange={(e)=>handleCurrentPriceChange(index,e)} isRequired />
           </InputGroup>
       </Flex>
     </Flex>
   ))
  }
</Flex>
</FormControl>
          // <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
          //      <Flex w={"60%"} textStyle={"fs6"}>Price<Text as={"span"} color={"red"}>*</Text></Flex>
          //      <Flex flexDirection={"column"} gap={"10px"}>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(0,4)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.country}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='current_price' value={country?.current_price||''} onChange={(e)=>handleCurrentPriceChange(index,e)}  />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(4,8)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.country}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='current_price' value={country?.current_price||''} onChange={(e)=>handleCurrentPriceChange(index,e)}  />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(8,12)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.country}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='current_price' value={country?.current_price||''} onChange={(e)=>handleCurrentPriceChange(index,e)}  />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(12,16)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.country}>
          //                 <Text>Regular Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='current_price' value={country?.current_price||''} onChange={(e)=>handleCurrentPriceChange(index,e)}  />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(0,4)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='actual_price' value={country?.actual_price||''} onChange={(e)=>handleActualPriceChange(index,e)} />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(4,8)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='actual_price' value={country?.actual_price||''} onChange={(e)=>handleActualPriceChange(index,e)} />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(8,12)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='actual_price' value={country?.actual_price||''} onChange={(e)=>handleActualPriceChange(index,e)} />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //        <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
          //         {
          //           editedProduct?.product_prices?.slice(12,16)?.map((country,index)=>(
          //             <>
          //               <Flex flexDirection={"column"} key={country?.id}>
          //                 <Text>Actual Price</Text>
          //                 <InputGroup>
          //                   <InputLeftAddon children={country?.product_country?.currency_symbol} h={"46px"} />
          //                   <Input isRequired type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.product_country?.currency_name} id='priceusaid' name='actual_price' value={country?.actual_price||''} onChange={(e)=>handleActualPriceChange(index,e)} />
          //                 </InputGroup>
          //               </Flex>
          //             </>
          //           ))
          //         }
          //        </Flex>
          //      </Flex>
          //   </FormControl>
}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"}>
            <FormLabel w={"50%"} textStyle={"fs6"}>Tags</FormLabel>
            <Flex w={"100%"}>
              <EditTagInput
                allTags={tags}
                inputValue={inputValue}
                selectedTags={selectedTags}
                matchedTags={matchedTags}
                setInputValue={setInputValue}
                setMatchedTags={setMatchedTags}
                setSelectedTags={setSelectedTags}
                handleUpdateTags={handleUpdateTags}
                productDetails={editedProduct}
                setProductDetails={setEditedProduct}
              />
            </Flex>
          </FormControl>
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel w={"50%"} textStyle={"fs6"}>Stock</FormLabel>
            <Flex w={"100%"}>
              <Input type="text" textStyle={"fs6"} value={editedProduct.stock} name="stock" onChange={handleChange} _placeholder={{ textStyle: "fs6" }} h={"46px"} placeholder="stock" focusBorderColor='#D2D2D2' />
            </Flex>
          </FormControl>
          {/* Weight */}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel w={"50%"} textStyle={"fs6"}>Weight</FormLabel>
            <Flex w={"100%"}>
              <Input type="text" textStyle={"fs6"} value={editedProduct.weight_in_grams} name="weight_in_grams" onChange={handleChange} _placeholder={{ textStyle: "fs6" }} h={"46px"} placeholder="Wights in Grmas (Example 500gm)" focusBorderColor='#D2D2D2' />
            </Flex>
          </FormControl>
          {/* Brand Input */}
          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"} >
            <FormLabel w={"50%"} textStyle={"fs6"}>Brand</FormLabel>
            <Flex w={"100%"}>
              <Select value={editedProduct.brand?.id} name='brand' onChange={handleChange} textStyle={"fs6"} h={"46px"} placeholder="Select"  >
                {
                  brand.map((b) => (
                    <option key={b.id} value={b.id} selected={editedProduct?.brand?.identity===b.identity}>{b.identity}</option>
                  ))
                }
              </Select>
            </Flex>
          </FormControl>
          {/*Nutrion Values */}
          
            <FormControl p={"10px"} display={"flex"} alignItems={"center"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} >
              <FormLabel w={"50%"} textStyle={"fs6"}>Nutrition Values</FormLabel>
              <Box w={"100%"}>
              
                 {
                  !isArray(editedProduct?.nutrition_values)?
                  Object.keys(editedProduct?.nutrition_values)?.map((key:any,index:any)=>(
                    <Flex w={"100%"} pb={"10px"} gap={"10px"} key={index}>
                    <Input id={key || "NutritionName"} type="text" borderRadius={"10px"} h={"46px"} name='NutritionName' value={key} onChange={(e) => handleChangeKey(key, e)} placeholder="Nutrition Name" />
                    <Input id={editedProduct?.nutrition_values[key] || "NutritionValue"} type="text" borderRadius={"10px"} h={"46px"} name="NutritionValue" value={editedProduct?.nutrition_values[key]} onChange={(e) => handleChangeValue(key, e?.target.value)} placeholder="Nutrition Value" />
                    <Button variant={"solid"} size={"lg"} fontSize={"14px"} h={"46px"} colorScheme={"red"} borderRadius={"8px"} onClick={()=>handleRemoveNutritionField(key)}>
                      Remove
                    </Button>
                  </Flex> 
                  ))
                  :
                  editedProduct&&editedProduct?.nutrition_values?.length!==undefined&&editedProduct?.nutrition_values?.map((specif:any,index:any)=>(
                    <Flex w={"100%"} pb={"10px"} gap={"10px"} key={index}>
                    <Input id={specif?.NutritionName || "NutritionName"} type="text" borderRadius={"10px"} h={"46px"} name='NutritionName' value={specif?.NutritionName} onChange={(e) => handleNutritionValue(index, e)} placeholder="Nutrition Name" />
                    <Input id={specif?.NutritionValue || "NutritionValue"} type="text" borderRadius={"10px"} h={"46px"} name="NutritionValue" value={specif?.NutritionValue} onChange={(e) => handleNutritionValue(index, e)} placeholder="Nutrition Value" />
                    <Button variant={"solid"} size={"lg"} fontSize={"14px"} h={"46px"} colorScheme={"red"} borderRadius={"8px"} onClick={()=>handleRemoveNutritionField(index)}>
                      Remove
                    </Button>
                  </Flex> 
                  ))
                 }
              <Button variant={"solid"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={()=>handleAddNutritionField()}>
                Add
              </Button>
              </Box>
            </FormControl>
            
                  
            <FormControl p={"10px"} display={"flex"} alignItems={"center"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
  <FormLabel w={"50%"} textStyle={"fs6"}>Specifications</FormLabel>
  {
    Array.isArray(editedProduct?.specifications) ?
      <Box>
        {editedProduct?.specifications.map((specif:any, index:any) => (
          <Flex w={"100%"} pb={"10px"} gap={"10px"} key={index}>
            <Input id={`specificationName_${index}`} type="text" borderRadius={"10px"} h={"46px"} name='specificatioName' value={specif.specificatioName} onChange={(e) => handleSpecificationValues(index, e)} placeholder="Specification Name" />
            <Input id={`specificationValue_${index}`} type="text" borderRadius={"10px"} h={"46px"} name="specificationValue" value={specif.specificationValue} onChange={(e) => handleSpecificationValues(index, e)} placeholder="Specification Value" />
            <Button variant={"solid"} size={"lg"} fontSize={"14px"} h={"46px"} colorScheme={"red"} borderRadius={"8px"} onClick={() => handleRemoveFields(index)}>
              Remove
            </Button>
          </Flex>
        ))}
        <Button variant={"solid"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={() => handleAddFields()}>
          Add
        </Button>
      </Box>
      :
      <Box w={"100%"}>
        {Object.keys(editedProduct?.specifications).map((key, index) => (
          <Flex w={"100%"} pb={"10px"} gap={"10px"} key={key}>
            <Input id={`specificationName_${key}`} type="text" borderRadius={"10px"} h={"46px"} name={"specificationName"} value={key} onChange={(e) => handleChangeKey1(key, e)} placeholder="Specification Name" />
            <Input id={`specificationValue_${key}`} type="text" borderRadius={"10px"} h={"46px"} name={editedProduct?.specifications[key] || "specificationValue"} value={editedProduct?.specifications[key]} onChange={(e) => handleChangeValue1(key, e.target.value)} placeholder="Specification Value" />
            <Button variant={"solid"} size={"lg"} fontSize={"14px"} h={"46px"} colorScheme={"red"} borderRadius={"8px"} onClick={() => handleRemoveFields(key)}>
              Remove
            </Button>
          </Flex>
        ))}
        <Button variant={"solid"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={() => handleAddFields()}>
          Add
        </Button>
      </Box>
  }
</FormControl>

          <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", "2xl": "row" }} justifyContent={"space-between"} isRequired>
            <FormLabel w={"50%"} textStyle={"fs6"}>Publish</FormLabel>
            <Flex w={"100%"}>
              {/* <Checkbox textStyle={"fs6"}  isChecked={Boolean(editedProduct.is_active)} name="is_active" onChange={(e) => handleCheckboxChange(e)} _placeholder={{ textStyle: "fs6" }} h={"46px"} /> */}
              <Switch textStyle={"fs6"}  colorScheme='brand'  isChecked={Boolean(editedProduct.is_active)} name="is_active" onChange={(e) => handleCheckboxChange(e)} _placeholder={{ textStyle: "fs6" }} h={"46px"} />            
            </Flex>
          </FormControl>
        </form>
      </Box>
      <Box>
        <Box>
          <Button colorScheme="green" size="md" borderRadius="8px" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose} ml="10px" size="md" borderRadius="8px" bg="#9DA5B1">
            Cancel
          </Button>
        </Box>
      </Box>
    </>

  );
};

export default EditProductModal;
