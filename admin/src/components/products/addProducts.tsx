'use client'
import React, { PropsWithChildren, useEffect, useState } from "react"
import { Card, Flex, Heading, Switch, Table, Text, useControllableState } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { HSeparator } from "../separator/Separator"
import ProductForm from "./components/basicTable"
import CombinationTable from "./components/combinationTable"
import CustomModal from "../modal/customModal"
import { UpdateProduct } from "@/utils/url/api"


interface AddProductsTableProps {
  tags: any[],
  categories: any[]
  subCategories: any[]
  brand: any[],
  handleUpdateTags: () => Promise<void>,
  toastObject: any,
  updateToastObject: any,
  productDetails: any,
  setProductDetails: any,
  CurrentNewProduct: any,
  setCurrentNewProduct: any,
  countryList:any
}


const AddProductsTable: React.FC<AddProductsTableProps> = (props) => {
  const { tags, categories, subCategories, brand, handleUpdateTags, toastObject, updateToastObject, productDetails, setProductDetails, CurrentNewProduct, setCurrentNewProduct,countryList } = props
  const [showCombinationForm, setShowCombinationForm] = useState(false);
  const [BasicForm, setBasicForm] = useState(true)
  const [productId, setProductId] = useState(false)
  const [modelOpen, setModalOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(productId && showCombinationForm);
  const [currentProduct, setCurrentProduct] = useState(null)


 

  const toggleCombinationForm = async () => {
    if (productId) {
      setShowCombinationForm(!showCombinationForm);
      const response = await UpdateProduct(JSON.stringify({ has_variants: true }), CurrentNewProduct.uuid)
      if (BasicForm === false) {
        setBasicForm(true)
      }
    } else {
      setModalOpen(true)
    }
  };

  const handleforms = () => {
    if (showCombinationForm) {
      setBasicForm(!BasicForm)
    }
  }

  return (
    <>
      {modelOpen && <CustomModal state="Alert" isOpen={modelOpen} message={"Please save the product first to add variants"} onClose={() => setModalOpen(false)} />}
      <Box pt={"30px"}>
        <Flex justifyContent={"space-between"} w={"100%"} pb={"10px"}>
          <Box display={"flex"} gap={"30px"}>
            <Text as={"span"} color={BasicForm ? "brand.500" : "black"} _hover={{ cursor: "pointer" }} onClick={handleforms}>Basic info </Text>
            <Text as={"span"} display={showCombinationForm ? "inline-block" : "none"} _hover={{ cursor: "pointer" }} color={BasicForm ? "black" : "#399f7f"} onClick={handleforms}> Combination</Text>
          </Box>
          <Box display={"flex"}>
            <Text as="span" textStyle={"fs6"} pr={"10px"} display={"flex"} color={"#F97316"}>Does this product have variants?</Text><Flex >{<Switch colorScheme="brand" onChange={() => { toggleCombinationForm(); productId && setIsChecked(!isChecked) }} cursor={"pointer"} isChecked={isChecked} className="pointer-switch" id="pointerSwitch"></Switch>}</Flex>
          </Box>
        </Flex>
        <Box>
          <Text as="span" w={BasicForm ? "66px" : "90px"} bg={"brand.500"} ml={BasicForm ? "0px" : "96px"} display={"inline-block"} position={"absolute"} p="1px" borderRadius={"10px"} border={"1px solid #399f7f"}></Text>
          <HSeparator p={"2px"} mb={"20px"} bg={"#D9D9D9"} borderRadius={"10px"} />
        </Box>
      </Box>
      <>
        {
          BasicForm ?
            <ProductForm
              tags={tags}
              categories={categories}
              subCategories={subCategories}
              brand={brand}
              handleUpdateTags={handleUpdateTags}
              toastObject={toastObject}
              updateToastObject={updateToastObject}
              productId={productId}
              setProductId={setProductId}
              currentProudt={currentProduct}
              setCurrentProduct={setCurrentProduct}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              CurrentNewProduct={CurrentNewProduct}
              setCurrentNewProduct={setCurrentNewProduct}
              countryList={countryList}
            />
            :
            <CombinationTable
              tags={tags}
              categories={categories}
              subCategories={subCategories}
              brand={brand}
              handleUpdateTags={handleUpdateTags}
              toastObject={toastObject}
              updateToastObject={updateToastObject}
              productId={productId}
              setProductId={setProductId}
              currentProudt={currentProduct}
              setCurrentProduct={setCurrentProduct}
              CurrentNewProduct={CurrentNewProduct}
              setCurrentNewProduct={setCurrentNewProduct}
              countryList={countryList}
            />
        }

      </>
    </>
  )
}
export default AddProductsTable

