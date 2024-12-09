import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue,Tooltip, Heading,Button} from '@chakra-ui/react';
import * as React from 'react';
import { FiEdit, } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Switch } from '@chakra-ui/react';
import Published from './published';
import { useState } from 'react';
import { ViewModal } from './modal/modal';
import ConfirmationModal from '@/components/modal/deleteModal';
import { Delete,Update } from '@/utils/url/api';
import { productDeleteEndPoint,updateProductEndPoint} from '@/utils/url/url';
import EditProductModal from '@/components/modal/editModal';
import CustomPagination from '@/components/pagination/customPagination';
import { useCustomToast } from '@/components/toast/Toast';
import {TbLayersDifference} from "react-icons/tb"
import VariantsTable from './VaritantTable';
import {IoIosArrowBack} from "react-icons/io"
import { get } from '@/utils/url/api';
import { getAllProductEndPoint } from '@/utils/url/url';
import {AiOutlineEye} from  "react-icons/ai"
import CombinationTable from '@/components/products/components/combinationTable';


import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import Card from '@/components/card/Card';
import ProductModal from './modal/ProductModal';
import { ImCancelCircle } from "react-icons/im";

type RowObj = {
	identity: string;
	category: any;
	product_prices: number;
	stock: number;
	created:string,
	is_active:boolean,
	action:any
};
 
const columnHelper = createColumnHelper<RowObj>();

export default function CheckTable(props: 
	{ tableData: any,
	  proudctList:any,
	  startLoading:()=>void,
	  stopLoading:()=>void,
	  toastObject:any,
	  updateToastObject:any,	
	  updateProducts: () => Promise<void>,
	  totalPages:any,
	  onPageChange:(page:number)=>void,
	  currentPage:number,
	  VariantProducts:any,
	  tags: any[],
      categories: any[]
      subCategories: any[]
      brand: any[],
      handleUpdateTags: () => Promise<void>,
      productDetails: any,
      setProductDetails: any,
      CurrentNewProduct: any,
      setCurrentNewProduct: any,
	  countryList:any
},
	) 
	{
	const { tableData ,proudctList,startLoading,stopLoading,toastObject,updateToastObject,updateProducts,totalPages,onPageChange,currentPage,VariantProducts,
		tags, categories, subCategories, brand, handleUpdateTags, productDetails, setProductDetails, CurrentNewProduct, setCurrentNewProduct ,countryList
	} = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const [editingRow, setEditingRow] = useState(null);
    const [deletingRow, setDeletingRow] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
	const [variantTable,setVarriantTable]=useState(false)
	const [currentVariantData,setCurrentVariant]=useState([])
	const [productId, setProductId] = useState(false)
	const [currentProduct, setCurrentProduct] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddVariant,setAddVariant]=useState(false)

  const openModal = (product) => {
    setSelectedProduct(product?.row?.original);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
   
	const showToast=useCustomToast()
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData= proudctList;
    React.useEffect(()=>{
		const checkProducts=()=>{
			if(proudctList.length===0){
			   updateProducts()
			}
		}
		checkProducts()
	})
	const handleDelete = async(row:any) => {
		setDeletingRow(row.row.original)
	};

	const handleEditClick = async(product) => {
        // const response:any=await get(getAllProductEndPoint+product.uuid+"/",{})
		console.log(product,"product")
		setSelectedProduct(product);
		setIsEditModalOpen(true);
	};
	
	const handleSaveEditedProduct = async(editedProduct) => {
	 const updateObject=	{
			description: editedProduct.description, 
			thumb_image: editedProduct.thumb_image,brand:editedProduct?.brand,
			main_image: editedProduct.main_image,
			category: editedProduct?.category?.id!==undefined?editedProduct?.category?.id:editedProduct?.category, slug: editedProduct?.slug,tags:editedProduct?.tags,
			is_active: editedProduct.is_active,
			stock: editedProduct.stock,
			identity: editedProduct.identity,
			product_code: editedProduct.sku,
			weight_in_grams: editedProduct?.weight_in_grams,
			nutrition_values:editedProduct?.nutrition_values,
			specifications:editedProduct.specifications
		}
	// const response2:any=await Update(updateProductEndPoint,`${editedProduct.uuid}/update_price`,editedProduct?.product_prices)
	const response:any=await Update(updateProductEndPoint,editedProduct.uuid,updateObject)
	showToast({title:"Product updated successfully!",status:"success",position:"top"})
	updateProducts()
	setIsEditModalOpen(false);
	};

	const handleVariantProducts=(product)=>{
		  const filterProducts=VariantProducts.filter((variant)=>variant.base_product===product.row.original.id)
		  setCurrentVariant(filterProducts)
		  setSelectedProduct(product.row.original)
		  setVarriantTable(true)
	}

	const handleVariantUpdate=(product)=>{
		const filterProducts=VariantProducts.filter((variant)=>variant.base_product===product.base_product)
		setCurrentVariant(filterProducts)
	}

	const columns = [
		columnHelper.accessor('identity', {
			id: 'identity',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					Product Name
				</Text>
			),
		}),
		columnHelper.accessor('category.identity', {
			id: 'category',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					Category
				</Text>
			),
			cell: (info) => (
                   <Text color={textColor} fontSize='sm' >
					 {info.getValue() ?info.getValue():"-"}
				 </Text>
			)
		}),
		columnHelper.accessor('product_prices', {
			id: 'product_prices',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					PRICE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' >
					{info.getValue()? info.getValue()?.[7]?.product_country?.currency_symbol +info.getValue()?.[7]?.actual_price:"-"}
				</Text>
			)
		}),
		columnHelper.accessor('stock', {
			id: 'stock',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					STOCK
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' >
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('created', {
			id: 'created',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					DATE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' >
					{info.getValue().slice(0,10)}
				</Text>
			)
		}),
		columnHelper.accessor('is_active', {
			id: 'is_active',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					PUBLISHED
				</Text>
			),
			cell: (info) => (<Published value={info.getValue()} data={info.row.original} toastObject={toastObject} updateToastObject={updateToastObject} updateproduct={updateProducts} />)
		}),
		columnHelper.accessor('action', {
			id: 'Action',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color={"black"}
					fontWeight={700}
					>
					Action
				</Text>
			),
			cell: (info) => (
				<Box p={"0px"} color={"#9E9E9E"} display={"flex"}  flexDirection={"row"} fontSize='17px' fontWeight='700'>
					<Tooltip label={"edit"}>
					<Text fontSize={"25px"} color={"blue"} as={"span"} cursor={"pointer"} onClick={()=>handleEditClick(info.row.original)} >
					   <FiEdit  />
					</Text>
					</Tooltip>
					<Tooltip label={"delete"}>
					<Text fontSize={"25px"} color={"red"} as={"span"} cursor={"pointer"} onClick={() => handleDelete(info)} >
					<RiDeleteBin6Fill />
					</Text>
					</Tooltip>
					<Tooltip label={"variants"}>
                    <Text fontSize={"25px"} color={"orange"} as={"span"} cursor={"pointer"} onClick={()=>handleVariantProducts(info)} >
						<TbLayersDifference  />
					</Text>
					</Tooltip>
					<Tooltip label={"view"}>
                    <Text fontSize={"25px"} color={"green"} as={"span"} cursor={"pointer"} onClick={()=>openModal(info)} >
						<AiOutlineEye />
					</Text>
					</Tooltip>
				</Box>
			)
		})
	];

	const [ data, setData ] = React.useState(() => [ ...proudctList ]);
	
	const table = useReactTable({
		data:proudctList,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	const handleAddVariant=()=>{
		  setAddVariant(true)
	}

	return (
		<>
		{isAddVariant&&<Flex justifyContent={"space-between"}><Tooltip label={"cancel"}><Button onClick={()=>{setAddVariant(false)}} borderRadius={"8px"} w={"50p"} boxShadow={"2xl"}><ImCancelCircle ></ImCancelCircle></Button></Tooltip></Flex>}
		{isAddVariant&&
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
					CurrentNewProduct={selectedProduct}
					setCurrentNewProduct={setSelectedProduct}
					countryList={countryList}
				  />
		}
		{
		!isAddVariant&&(<>
			<ProductModal isOpen={isModalOpen} onClose={closeModal} productData={selectedProduct} />
			{variantTable&&<Flex justifyContent={"space-between"}><Tooltip label={"back"}><Button onClick={()=>{setVarriantTable(false)}} borderRadius={"8px"} w={"50p"} boxShadow={"2xl"}><IoIosArrowBack ></IoIosArrowBack></Button></Tooltip><Button color={"white"} borderRadius={"8px"} bg={"#399f7f"} _hover={{bg:"#399f7f"}} onClick={()=>handleAddVariant()}>Add Variant</Button></Flex>}
            <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>
				{
					isEditModalOpen?
					(
						<EditProductModal
						isOpen={isEditModalOpen}
						onClose={() => {setIsEditModalOpen(false);updateProducts()}}						
						initialProduct={selectedProduct}
						onSave={handleSaveEditedProduct}
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
						// CurrentNewProduct={CurrentNewProduct}
						setCurrentNewProduct={setCurrentNewProduct}
						updateProduct={updateProducts}
						countryList={countryList}
						/>
					):(
						variantTable ?
						<>
                        <VariantsTable 
						tableData={tableData} 
						proudctList={currentVariantData} 
						VariantProducts={VariantProducts}
						startLoading={startLoading} 
						stopLoading={stopLoading}
						toastObject={toastObject}
						updateToastObject={updateToastObject}
						updateProducts={updateProducts}
						onPageChange={onPageChange}
						currentPage={currentPage}
						totalPages={totalPages}
						handleVariantUpdate={handleVariantUpdate}
						tags={tags}
						categories={categories}
						subCategories={subCategories}
						brand={brand}
						handleUpdateTags={handleUpdateTags}
						productId={productId}
						setProductId={setProductId}
						currentProudt={currentProduct}
						setCurrentProduct={setCurrentProduct}
						productDetails={productDetails}
						setProductDetails={setProductDetails}
						// CurrentNewProduct={CurrentNewProduct}
						setCurrentNewProduct={setCurrentNewProduct}
						countryList={countryList}
						/>
						</>
						:
						<>
						<Table variant='simple' color='gray.500' mb='24px' mt="12px">
						<Thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<Tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<Th
												key={header.id}
												colSpan={header.colSpan}
												pe='10px' 
												borderColor={borderColor}
												cursor='pointer'
												onClick={header.column.getToggleSortingHandler()}>
												<Flex
													justifyContent={"flex-start"}
													align='center'
													fontSize={{ sm: '10px', lg: '12px' }}
													color='gray.400'>
													{flexRender(header.column.columnDef.header, header.getContext())}{{
														asc: '',
														desc: '',
													}[header.column.getIsSorted() as string] ?? null}
												</Flex>
											</Th>
										);
									})}
								</Tr>
							))}
						</Thead>
						<Tbody>
							{table.getRowModel().rows.map((row) => {
								return (
									<Tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<Td
													key={cell.id}
													fontSize={{ sm: '14px' }}
													minW={{ sm: '150px', md: '200px', lg: 'auto' }}
													borderColor='transparent'>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</Td>
											);
										})}
									</Tr>
								);
							})}
						</Tbody>
					</Table>
					<CustomPagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
					</>
					)
				}
				{deletingRow && (
                <ConfirmationModal
                isOpen={!!deletingRow}
		      	onConfirm={async()=>{
		      		await Delete(productDeleteEndPoint,deletingRow.uuid+"/")
					showToast({title:'Product delete successfully!',status:"success",position:"top"})
		      		updateToastObject({show:true,title:'Product delete successfully!',status:"success",position:"top"})
					updateProducts()
		      	}}
                  onClose={() => setDeletingRow(null)}
                  message={`Are you sure you want to delete ${deletingRow.identity}?`}
                />
                )}
			</Box>
		</Card>
		</>
		)
		}
		</>
	);
} 