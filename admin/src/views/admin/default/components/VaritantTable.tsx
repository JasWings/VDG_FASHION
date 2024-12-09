import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue,Tooltip} from '@chakra-ui/react';
import * as React from 'react';
import { FiEdit, } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Published2 from './published2';
import { useState } from 'react';
import ConfirmationModal from '@/components/modal/deleteModal';
import { Delete,Update } from '@/utils/url/api';
import { productDeleteEndPoint,updateProductEndPoint} from '@/utils/url/url';
import EditProductModal from '@/components/modal/editModal';
import CustomPagination from '@/components/pagination/customPagination';
import { useCustomToast } from '@/components/toast/Toast';
import {TbLayersDifference} from "react-icons/tb"


import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

import Card from '@/components/card/Card';


type RowObj = {
	identity: string;
	category: string;
	product_prices: number;
	stock: number;
	created:string,
	is_active:boolean,
	action:any
};
 
const columnHelper = createColumnHelper<RowObj>();

export default function VariantsTable(props: 
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
	  handleVariantUpdate:any,
	  countryList:any,
	  tags:any, categories:any, subCategories:any, brand:any, handleUpdateTags:any,  productId:any, setProductId:any, currentProudt:any, setCurrentProduct:any, productDetails:any, setProductDetails:any, setCurrentNewProduct:any

},
	) 
	{
	const { tableData ,proudctList,startLoading,stopLoading,toastObject,updateToastObject,updateProducts,totalPages,onPageChange,currentPage,VariantProducts,handleVariantUpdate
	,	tags, categories, subCategories, brand, handleUpdateTags, productId, setProductId, currentProudt, setCurrentProduct, productDetails, setProductDetails, setCurrentNewProduct,countryList
	} = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const [editingRow, setEditingRow] = useState(null);
    const [deletingRow, setDeletingRow] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
	const showToast=useCustomToast()
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
   
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

	const handleEditClick = (product) => {
		setSelectedProduct(product);
		setIsEditModalOpen(true);
		handleVariantUpdate(product)
	};
	
	const handleSaveEditedProduct = async(editedProduct) => {
		const updateObject=	{
			description: editedProduct.productDescription, 
			thumb_image: editedProduct.thumb_image,brand:editedProduct?.brand,
			main_image: editedProduct.main_image,
			category: editedProduct?.category?.id, slug: editedProduct?.slug,tags:editedProduct?.slug?.id,
			is_active: editedProduct.is_active,
			stock: editedProduct.stock,
			identity: editedProduct.identity,
			product_code: editedProduct.sku,
			weight_in_grams: editedProduct?.weight_in_grams,
			nutrition_values:editedProduct?.nutrition_values,
			specifications:editedProduct.specifications
		}
	const response2:any=await Update(updateProductEndPoint,`${editedProduct.uuid}/update_price`,editedProduct?.product_prices)
	const response:any=await Update(updateProductEndPoint,editedProduct.uuid,updateObject)
	showToast({title:"Product updated successfully!",status:"success",position:"top"})
	updateProducts()
	setIsEditModalOpen(false);
	window.location.reload()
	};

	const columns = [
		columnHelper.accessor('identity', {
			id: 'identity',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					ProductName
				</Text>
			),
		}),
		columnHelper.accessor('category', {
			id: 'category',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Category
				</Text>
			),
			cell: (info:any) => (
                   <Text color={textColor} fontSize='sm' fontWeight='700'>
					 {info.getValue()?.identity ?info.getValue()?.identity:"-"}
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
					color='gray.400'>
					PRICE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{/* {info.getValue()?"$"+info.getValue():"-"} */}
					{info.getValue()? info.getValue()?.[5]?.product_country?.currency_symbol +info.getValue()?.[5]?.actual_price:"-"}
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
					color='gray.400'>
					STACK
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
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
					color='gray.400'>
					DATE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
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
					color='gray.400'>
					PUBLISHED
				</Text>
			),
			cell: (info) => (<Published2 value={info.getValue()} data={info.row.original} toastObject={toastObject} updateToastObject={updateToastObject} updateproduct={updateProducts} handleVariantUpdate={handleVariantUpdate} />)
		}),
		columnHelper.accessor('action', {
			id: 'Action',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Action
				</Text>
			),
			cell: (info) => (
				<Text color={"#9E9E9E"} display={"flex"} justifyContent={"flex-start"} flexDirection={"row"} fontSize='17px' fontWeight='700'>
					<Tooltip label={"edit"}>
					<Text as={"span"} cursor={"pointer"} onClick={()=>handleEditClick(info.row.original)} >
					   <FiEdit  />
					</Text>
					</Tooltip>
					<Tooltip label={"delete"}>
					<Text as={"span"} cursor={"pointer"} onClick={() => handleDelete(info)} >
					<RiDeleteBin6Fill />
					</Text>
					</Tooltip>
				</Text>
			)
		})
	];

	
	const table = useReactTable({
		data:proudctList,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// debugTable: true
	});

	return (
		<>
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>
				{
					isEditModalOpen?
					(
						<EditProductModal
						countryList={countryList}
						isOpen={isEditModalOpen}
						onClose={() => setIsEditModalOpen(false)}
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
						currentProudt={currentProudt}
						setCurrentProduct={setCurrentProduct}
						productDetails={productDetails}
						setProductDetails={setProductDetails}
						// CurrentNewProduct={CurrentNewProduct}
						setCurrentNewProduct={setCurrentNewProduct}
						updateProduct={updateProducts}
						/>
					):(
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
					handleVariantUpdate(deletingRow)
					window.location.reload()
		      	}}
                  onClose={() => setDeletingRow(null)}
                  message={`Are you sure you want to delete ${deletingRow.identity}?`}
                />
                )}
			</Box>
		</Card>
		{/* <CustomPagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} /> */}
		</>
	);
} 