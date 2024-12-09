'use client'
import { useState, PropsWithChildren, useEffect } from "react";
import React from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Text,
  Icon,
  InputLeftElement,
  InputGroup,
  InputLeftAddon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Img,
  Checkbox
} from '@chakra-ui/react';
import FileUpload from './fileUpload';
import { AddProducts, UpdateProduct, post ,Update} from '@/utils/url/api';
import TagInput2 from './taginput';
import Image from "next/image";
import Upload from "@/views/admin/profile/components/Upload";
import { useCustomToast } from "@/components/toast/Toast";
import { getAllProductEndPoint } from "@/utils/url/url";
import FileInput from "./fileInput";
import CombinationUpload from "../file-upload/combinationUpload";

type Variant = {
  image: string;
  price: number;
  combination: string;
  stock: number;
  sku: string;
};

interface PropductFormProps extends PropsWithChildren {
  tags: any,
  categories: any[],
  subCategories: any[],
  brand: any[],
  handleUpdateTags: () => Promise<void>,
  toastObject: any,
  updateToastObject: any,
  productId: any,
  setProductId: any,
  currentProudt: any,
  setCurrentProduct: any,
  CurrentNewProduct: any,
  setCurrentNewProduct: any,
  countryList:any
}


const CombinationTable = (props: PropductFormProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const [variants, setVariants] = useState<Array<Variant>>([]);
  const { tags, categories, subCategories, brand, handleUpdateTags, toastObject, updateToastObject, productId, setProductId, currentProudt, CurrentNewProduct ,countryList} = props
  const [tages, setTags] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [matchedTags, setMatchedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [Specifications,setSpecification]=useState([])
  const [NutritionValues,setNutritionValues]=useState([])
  const [PriceList, setPriceList] = useState([])
  const [buttonLoading,setButtonLoading]=useState(false)
  const [VariantProductDetails, setVariantProductDetails] = useState({
    productTitle: '',
    productDescription: '',
    productImages: [],
    slug:"",
    stock: '',
    sku: '',
    Category: '',
    price: {
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
    weight: '',
    main_image:null,
    thumb_image:null,
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
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const useToast = useCustomToast()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariantProductDetails({
      ...VariantProductDetails,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true)
    // if(VariantProductDetails?.thumb_image===null || VariantProductDetails.main_image === null){
    //   if(VariantProductDetails?.thumb_image===null){
    //     setButtonLoading(false)
    //     useToast({position:"top",status:"warning",title:"Thumb Image is Required"})
    //   }else if(VariantProductDetails?.main_image===null){
    //     setButtonLoading(false)
    //     useToast({position:"top",status:"warning",title:"Main Image is Required"})
    //   }
    //   return;
    // }
    const header = {
      "Content-Type": "application/json",
    }
    const response:any = await post(getAllProductEndPoint,
      {
        is_variant: true, description: CurrentNewProduct?.description,stock:VariantProductDetails?.stock,
        base_product: CurrentNewProduct.id,
        thumb_image:VariantProductDetails?.thumb_image,
        main_image:VariantProductDetails.main_image,
        category: Number(VariantProductDetails.Category), slug: VariantProductDetails.slug,
        identity: CurrentNewProduct?.identity,
        product_code: VariantProductDetails.sku,
        weight_in_grams: Number(VariantProductDetails.weight),
        product_prices: PriceList,
        nutrition_values: NutritionValues,
        specifications:Specifications,
      }, header)
      await Update(getAllProductEndPoint,`${response.uuid}/update_price`,PriceList)
      if(VariantProductDetails.productImages?.length!==0){
        const newImages={}
        const images= VariantProductDetails?.productImages?.map((i,index)=>newImages[index]=i.uuid)
        const response1:any=await Update(getAllProductEndPoint,`${response.uuid}/update_product_images`,newImages)
      }
    useToast({ title: `Product Added Successfully`, status: "success", position: "top" })
    setButtonLoading(false)
    setProductId(true)
  };

  const clearVariants = () => {
    setVariants([]);
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

 const handleSpecificationValues=(index:number,event:any)=>{
       const data:any=[...Specifications]
       data[index][event?.target?.name]=event?.target?.value
       setSpecification(data)
 }

 const handleNutrionValue=(index:number,event:any)=>{
       const data=[...NutritionValues]
       data[index][event?.target?.name]=event?.target?.value
       setNutritionValues(data)
 }

 const handleAddFields=()=>{
       const obj={
         specificatioName:"",
         specificationValue:""
       }
   setSpecification([...Specifications,obj])
 }

 const handleAddNutritionFields=()=>{
   const obj={
     NutritionName:"",
     NutritionValue:""
   }
   setNutritionValues([...NutritionValues,obj])
 }

 const handleRemoveFields=(index:number)=>{
       const data=[...Specifications]
       data?.splice(index,1)
       setSpecification(data)
 }

 const handleRemoveNutritionFields=(index:number)=>{
       const data=[...NutritionValues]
       data?.splice(index,1)
       setNutritionValues(data)
 }
 console.log(VariantProductDetails,"var",CurrentNewProduct)
  return (
    <>
      <Box >
        <Box display="flex" padding="20px">
          <form style={{ width: "85%" }} onSubmit={handleSubmit}>
            {/* Title Input */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel width={"50%"} textStyle={"fs6"}>Product Title / Name</FormLabel>
              <Flex w={"100%"}>
                <Input
                  type="text"
                  name="productTitle"
                  value={CurrentNewProduct?.identity}
                  onChange={handleInputChange}
                  placeholder="Product Title/name"
                  borderRadius={'10px'}
                  height={'46px'}
                  focusBorderColor={'#BDBDBD'}
                  textStyle={'fs6'}
                  readOnly
                />
              </Flex>
            </FormControl>
            {/* Product Description */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={{ sm: "100%", md: "50%" }} textStyle={"fs6"}>Product Description</FormLabel>
              <Flex w={"100%"}>
                <Textarea
                  placeholder="Enter product description"
                  value={CurrentNewProduct?.description}
                  onChange={handleInputChange}
                  name="productDescription"
                  h={"209px"}
                  focusBorderColor={"#BDBDBD"}
                  borderRadius={"10px"}
                  readOnly
                />
              </Flex>
            </FormControl>

            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel width={"50%"} textStyle={"fs6"}>Product Slug</FormLabel>
              <Flex w={"100%"}>
                <Input
                  type="text"
                  name="slug"
                  value={VariantProductDetails.slug}
                  onChange={handleInputChange}
                  placeholder="slug"
                  borderRadius={'10px'}
                  height={'46px'}
                  focusBorderColor={'#BDBDBD'}
                  textStyle={'fs6'}
                />
              </Flex>
            </FormControl>

            <FileInput title={"main_image"} productDetails={VariantProductDetails} setProductDetails={setVariantProductDetails} />
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} >
              <FormLabel w={{ sm: "100%", md: "50%" }} textStyle={"fs6"}>Thumb Image</FormLabel>
              <Flex w={"100%"} flexDirection={"column"}>
                <FileUpload title={"thumb_image"} imagePreview={imagePreview} setImagePreview={setImagePreview} productDetails={VariantProductDetails} setProductDetails={setVariantProductDetails} />
              </Flex>
            </FormControl>
            {/* <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={{ sm: "100%", md: "50%" }} textStyle={"fs6"}>Thumb Image</FormLabel>
              <Flex w={"100%"} flexDirection={"column"}>
                <FileUpload title={"thumb_image"} imagePreview={imagePreview} setImagePreview={setImagePreview} VariantProductDetails={VariantProductDetails} setProductDetails={setVariantProductDetails} />
                {imagePreview && imagePreview.title === "thumb_image" && (
                  <Flex>
                    <Box mt="10px">
                      <Img src={imagePreview.image} alt="Preview" maxH="200px" />
                    </Box>
                  </Flex>
                )}
              </Flex>
            </FormControl> */}
            {/* product Images */}
                <CombinationUpload
                  h={"134px"}
                  border={"1px solid #D2D2D2"}
                  productDetails={VariantProductDetails}
                  setProductDetails={setVariantProductDetails}
                />
            {/* sku input */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"} h={"46px"}>SKU</FormLabel>
              <Flex w={"100%"}>
                <Input
                  type="text"
                  placeholder="Enter SKU"
                  value={VariantProductDetails.sku}
                  name="sku"
                  onChange={handleInputChange}
                />
              </Flex>
            </FormControl>
            {/* Category */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"}>Category</FormLabel>
              <Flex w={"100%"} textStyle={"fs6"}>
                <Select onChange={handleInputChange} placeholder="Select category" h={"46px"} name="Category" value={VariantProductDetails.Category}>
                  {categories.map((cate: any) =>
                  (
                    <option key={cate.id} value={cate.id}>
                      {cate.identity}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>
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
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={'MRP Price'} id={'priceactual'+country?.currency_code} name='actual_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
                      </InputGroup>
                      {/* Current Price */}
                      <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={'Sales Price'} id={'pricecurrent'+country?.currency_code} name='current_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
                          </InputGroup>
                      </Flex>
                    </Flex>
                  ))
                 }
               </Flex>
            </FormControl>
            {/* price */}
            {/* <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
               <Flex w={"60%"} textStyle={"fs6"}>Price<Text as={"span"} color={"red"}>*</Text></Flex>
               <Flex flexDirection={"column"} gap={"10px"}>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(0,4)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Regular Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(4,8)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Regular Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(8,12)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Regular Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(12,16)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Regular Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='current_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['current_price']:''} onChange={(e) => handleRegularPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(0,4)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Actual Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(4,8)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Actual Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(8,12)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Actual Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList?.slice(12,16)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id}>
                          <Text>Actual Price</Text>
                          <InputGroup>
                            <InputLeftAddon children={country?.currency_symbol} h={"46px"} />
                            <Input type="number" h={"46px"} focusBorderColor={"#D2D2D2"} placeholder={country?.currency_name} id='priceusaid' name='actual_price' value={PriceList?.length!==0&&PriceList[country?.id]?PriceList[country?.id]['actual_price']:''} onChange={(e) => handleActualPrices(country?.id,e)} isRequired />
                          </InputGroup>
                        </Flex>
                      </>
                    ))
                  }
                 </Flex>
               </Flex>
            </FormControl> */}
            {/* Tag Input */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
              <FormLabel w={"50%"} textStyle={"fs6"}>Tags</FormLabel>
              <Flex w={"100%"}>
                <TagInput2
                  allTags={tags}
                  inputValue={inputValue}
                  selectedTags={selectedTags}
                  matchedTags={matchedTags}
                  setInputValue={setInputValue}
                  setMatchedTags={setMatchedTags}
                  setSelectedTags={setSelectedTags}
                  handleUpdateTags={handleUpdateTags}
                  productDetails={VariantProductDetails}
                  setProductDetails={setVariantProductDetails}
                />
              </Flex>
            </FormControl>
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"}>Stock</FormLabel>
              <Flex w={"100%"}>
                <Input type="text" textStyle={"fs6"} value={VariantProductDetails.stock} name="stock" onChange={handleInputChange} _placeholder={{ textStyle: "fs6" }} h={"46px"} placeholder="stock" focusBorderColor='#D2D2D2' />
              </Flex>
            </FormControl>
            {/* Weight */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"}>Weight</FormLabel>
              <Flex w={"100%"}>
                <Input type="text" textStyle={"fs6"} value={VariantProductDetails.weight} name="weight" onChange={handleInputChange} _placeholder={{ textStyle: "fs6" }} h={"46px"} placeholder="Wights in Grmas (Example 500gm)" focusBorderColor='#D2D2D2' />
              </Flex>
            </FormControl>
            {/*Nutrion Values */}
            <FormControl p={"10px"} display={"flex"} alignItems={"center"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} >
              <FormLabel w={"50%"} textStyle={"fs6"}>Nutrition Values</FormLabel>
              <Box w={"100%"}>
                 {
                  NutritionValues?.map((specif:any,index:any)=>(
                    <Flex w={"100%"} pb={"10px"} gap={"10px"} key={index}>
                    <Input id={specif?.NutritionName || "NutritionName"} type="text" borderRadius={"10px"} h={"46px"} name='NutritionName' value={specif?.NutritionName} onChange={(e) => handleNutrionValue(index, e)} placeholder="Nutrition Name" />
                    <Input id={specif?.NutritionValue || "NutritionValue"} type="text" borderRadius={"10px"} h={"46px"} name="NutritionValue" value={specif?.NutritionValue} onChange={(e) => handleNutrionValue(index, e)} placeholder="Nutrition Value" />
                    <Button variant={"solid"} size={"lg"} fontSize={"14px"} h={"46px"} colorScheme={"red"} borderRadius={"8px"} onClick={()=>handleRemoveNutritionFields(index)}>
                      Remove
                    </Button>
                  </Flex> 
                  ))
                 }
              <Button variant={"solid"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={()=>handleAddNutritionFields()}>
                Add
              </Button>
              </Box>

            </FormControl>
            <FormControl p={"10px"} display={"flex"} alignItems={"center"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} >
              <FormLabel w={"50%"} textStyle={"fs6"}>Specifications</FormLabel>
              <Box w={"100%"}>
                 {
                  Specifications?.map((specif:any,index:any)=>(
                    <Flex w={"100%"} pb={"10px"} gap={"10px"} key={index}>
                    <Input id={specif?.specificatioName || "specificationName"} type="text" borderRadius={"10px"} h={"46px"} name='specificatioName' value={specif?.specificatioName} onChange={(e) => handleSpecificationValues(index, e)} placeholder="Specification Name" />
                    <Input id={specif?.specificationValue || "specificationValue"} type="text" borderRadius={"10px"} h={"46px"} name="specificationValue" value={specif?.specificationValue} onChange={(e) => handleSpecificationValues(index, e)} placeholder="Specification Value" />
                    <Button variant={"solid"} size={"lg"} fontSize={"14px"} h={"46px"} colorScheme={"red"} borderRadius={"8px"} onClick={()=>handleRemoveFields(index)}>
                      Remove
                    </Button>
                  </Flex> 
                  ))
                 }
              <Button variant={"solid"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={()=>handleAddFields()}>
                Add
              </Button>
              </Box>

            </FormControl>
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"}>Publish</FormLabel>
              <Flex w={"100%"}>
                <Switch colorScheme="brand" textStyle={"fs6"} name="Active" onChange={(e) => { setVariantProductDetails({ ...VariantProductDetails, [e.target.name]: e.target.checked, }); }} _placeholder={{ textStyle: "fs6" }} h={"46px"} />
              </Flex>
            </FormControl>
            <Flex justifyContent={"flex-end"}>
          <Box display={"flex"} gap={{ sm: "5px", md: "30px" }} mt={{ sm: "10px", md: "0px" }}>
            <Button type={"submit"} isLoading={buttonLoading} bg={"brand.500"} _hover={{bg:"brand"}} color={"white"} borderRadius={"8px"}  >
              + Generate Variant
            </Button>
            {
              variants.length!==0&&
              <Button onClick={clearVariants} bg={"#F1F1F1"} color={"red"} borderRadius={"8px"} >
              Clear Variants
              </Button>
            } 
          </Box>
        </Flex>
          </form>
        </Box>

      </Box>
    </>
  );
}

export default CombinationTable;
