import React, { useState, useEffect } from 'react';
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
  Img,
  Checkbox
} from '@chakra-ui/react';
import Upload from '@/views/admin/profile/components/Upload';
import FileUpload from './fileUpload';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { AddProducts,Update } from '@/utils/url/api';
import TagInput2 from './taginput';
import { useCustomToast } from '@/components/toast/Toast';
import FileInput from './fileInput';
import { getAllProductEndPoint } from '@/utils/url/url';
import ProductUpload from '../file-upload/productUpload';

interface PropductFormProps extends PropsWithChildren {
  tags: any[],
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
  productDetails: any,
  setProductDetails: any,
  CurrentNewProduct: any,
  setCurrentNewProduct: any,
  countryList:any
}

const ProductForm = (props: PropductFormProps) => {
  const showToast = useCustomToast()
  const { tags, categories, subCategories, brand, handleUpdateTags, toastObject, updateToastObject, productId, setProductId, currentProudt, setCurrentProduct, productDetails, setProductDetails, setCurrentNewProduct,countryList } = props
  const [tages, setTags] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [matchedTags, setMatchedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [Specifications,setSpecification]=useState([])
  const [NutritionValues,setNutritionValues]=useState([])
  const [PriceList, setPriceList] = useState([])
  const [buttonLoading,setButtonLoading]=useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true)
    // if(productDetails.main_image === null){
    //  if(productDetails?.main_image===null){
    //     setButtonLoading(false)
    //     showToast({position:"top",status:"warning",title:"Main Image is Required"})
    //   }
    //   return;
    // }
    const header = {
      "Content-Type": "application/json",
    }
   const brand= productDetails.brand.length!==0?Number(productDetails.brand):null
   
    const response:any = await AddProducts(
      {
        description: productDetails.productDescription, 
        thumb_image: productDetails.thumb_image,brand:brand,
        main_image: productDetails.main_image,images:productDetails.images,
        category: Number(productDetails.Category), slug: productDetails.slug?.length!==0?productDetails?.slug:productDetails?.productTitle?.split(" ").join("-").toLowerCase(),tags:productDetails.tags,
        is_active: productDetails.Active,
        stock: Number(productDetails.stock),
        identity: productDetails.productTitle,
        product_code: productDetails.sku,
        weight_in_grams: Number(productDetails.weight),
        nutrition_values:NutritionValues,
        specifications:Specifications
    }, header)
    // const newImages={0:productDetails?.image?.uuid}
    const newImages={}
    const response2:any=await Update(getAllProductEndPoint,`${response.uuid}/update_price`,PriceList)
    if(productDetails?.images){
      const images= productDetails?.images?.map((i,index)=>newImages[index]=i.uuid)
      const response1:any=await Update(getAllProductEndPoint,`${response.uuid}/update_product_images`,newImages)
    }
    setCurrentProduct(response)
    setCurrentNewProduct(response)
    showToast({ title: `Product Added Successfully`, status: "success", position: "top" })
    setProductId(true)
    setButtonLoading(false)
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

  return (
    <>
      <Box>
        <Text textStyle={"fs6"} >Add your product and necessary information from here</Text>
        <Box display="flex" padding="20px">
          <form style={{ width: "85%" }} onSubmit={handleSubmit}>
            {/* Title Input */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel width={"50%"} textStyle={"fs6"}>Product Title / Name</FormLabel>
              <Flex w={"100%"}>
                <Input
                  type="text"
                  name="productTitle"
                  value={productDetails.productTitle}
                  onChange={handleInputChange}
                  placeholder="Product Title/name"
                  borderRadius={'10px'}
                  height={'46px'}
                  focusBorderColor={'#BDBDBD'}
                  textStyle={'fs6'}
                />
              </Flex>
            </FormControl>
            {/* Product Description */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={{ sm: "100%", md: "50%" }} textStyle={"fs6"}>Product Description</FormLabel>
              <Flex w={"100%"}>
                <Textarea
                  placeholder="Enter product description"
                  value={productDetails.productDescription}
                  onChange={handleInputChange}
                  name="productDescription"
                  h={"209px"}
                  focusBorderColor={"#BDBDBD"}
                  borderRadius={"10px"}
                />
              </Flex>
            </FormControl>
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={{ sm: "100%", md: "50%" }} textStyle={"fs6"}>Slug</FormLabel>
              <Flex w={"100%"}>
                <Input
                  placeholder="Enter product slug"
                  value={productDetails.slug?productDetails?.slug:productDetails?.productTitle?.split(" ").join("-").toLowerCase()}
                  onChange={handleInputChange}
                  name="slug"
                  h={"46px"}
                  focusBorderColor={"#BDBDBD"}
                  borderRadius={"10px"}
                />
              </Flex>
            </FormControl>
            <FileInput title={"main_image"} productDetails={productDetails} setProductDetails={setProductDetails} />
            {/* main image */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
              <FormLabel w={{ sm: "100%", md: "50%" }} textStyle={"fs6"}>Thumb Image</FormLabel>
              <Flex w={"100%"} flexDirection={"column"}>
                <FileUpload title={"thumb_image"} imagePreview={imagePreview} setImagePreview={setImagePreview} productDetails={productDetails} setProductDetails={setProductDetails} />
              </Flex>
            </FormControl>
            {/* product Images */}
                <ProductUpload
                  h={"134px"}
                  border={"1px solid #D2D2D2"}
                  productDetails={productDetails}
                  setProductDetails={setProductDetails}
                />
            {/* sku input */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"} h={"46px"}>SKU</FormLabel>
              <Flex w={"100%"}>
                <Input
                  type="text"
                  placeholder="Enter SKU"
                  value={productDetails.sku}
                  name="sku"
                  onChange={handleInputChange}
                />
              </Flex>
            </FormControl>
            {/* Category */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"}>Category</FormLabel>
              <Flex w={"100%"} textStyle={"fs6"}>
                <Select onChange={handleInputChange} placeholder="Select category" h={"46px"} name="Category" value={productDetails.id}>
                  {categories.map((cate: any) =>
                  (
                    <option key={cate.id} value={cate.id}>
                      {cate.identity}
                    </option>
                  ))}
                </Select>
              </Flex>
            </FormControl>
            <FormControl>

            </FormControl>
            {/* price */}
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
            {/* <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
               <Flex w={"60%"} textStyle={"fs6"}>Price<Text as={"span"} color={"red"}>*</Text></Flex>
               <Flex flexDirection={"column"} gap={"10px"}>
                 <Flex w={"100%"} gap={"10px"} flexDirection={"row"}>
                  {
                    countryList.slice(0,4)?.map((country,index)=>(
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
                    countryList.slice(4,8)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
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
                    countryList.slice(8,12)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
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
                    countryList.slice(12,16)?.map((country,index)=>(
                      <>
                        <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
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
                        <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
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
                        <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
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
                        <Flex flexDirection={"column"} key={country?.id} w={"24%"}>
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
                  productDetails={productDetails}
                  setProductDetails={setProductDetails}
                />
              </Flex>
            </FormControl>
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"}>Stock</FormLabel>
              <Flex w={"100%"}>
                <Input type="number" textStyle={"fs6"} value={productDetails.stock} name="stock" onChange={handleInputChange} _placeholder={{ textStyle: "fs6" }} h={"46px"} placeholder="stock" focusBorderColor='#D2D2D2' />
              </Flex>
            </FormControl>
            {/* Weight */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"}>Weight</FormLabel>
              <Flex w={"100%"}>
                <Input type="number" textStyle={"fs6"} value={productDetails.weight} name="weight" onChange={handleInputChange} _placeholder={{ textStyle: "fs6" }} h={"46px"} placeholder="Wights in Grmas (Example 500gm)" focusBorderColor='#D2D2D2' />
              </Flex>
            </FormControl>
            {/* Brand Input */}
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} >
              <FormLabel w={"50%"} textStyle={"fs6"}>Brand</FormLabel>
              <Flex w={"100%"}>
                <Select value={productDetails.brand} name='brand' onChange={handleInputChange} textStyle={"fs6"} h={"46px"} placeholder="Select" >
                  {
                    brand.map((b) => (
                      <option key={b.id} value={b.id}>{b.identity}</option>
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
              <Button variant={"#399f7f"} bg={"#399f7f"} color={"white"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={()=>handleAddNutritionFields()}>
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
              <Button variant={"solid"} bg={"#399f7f"} size={"lg"} h={"46px"} colorScheme={"whatsapp"} borderRadius={"8px"} onClick={()=>handleAddFields()}>
                Add
              </Button>
              </Box>

            </FormControl>
            <FormControl p={"10px"} display={"flex"} w={"100%"} flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"} isRequired>
              <FormLabel w={"50%"} textStyle={"fs6"}>Publish</FormLabel>
              <Flex w={"100%"}>
                <Switch colorScheme='brand' textStyle={"fs6"} name="Active" onChange={(e) => { setProductDetails({ ...productDetails, [e.target.name]: e.target.checked, }); }} _placeholder={{ textStyle: "fs6" }} h={"46px"} />
              </Flex>
            </FormControl>
            <Flex justifyContent={"flex-end"}>
              {
                productId?
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    size="lg"
                    onClick={() => { window.location.href = "/Admin/AddProducts" }}
                    _hover={{
                      backgroundColor: "blue.600",
                      color: "white",
                    }}
                  >
                    Back
                  </Button>
                  :
                  <Button type={"submit"} isLoading={buttonLoading} w={"267px"} _hover={{ bg: "#399f7f" }} height={"46px"} display={"flex"} justifyContent={"space-around"} bg={"#399f7f"} color={"white"} rightIcon={<Image width={30} height={30} alt='tick' src={"/img/product/tickicon.png"} />}>
                    Add Product
                  </Button>
              }

            </Flex>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ProductForm;
