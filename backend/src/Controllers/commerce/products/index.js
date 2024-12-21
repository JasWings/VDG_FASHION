import Attribute from "../../../Models/product-management/attributes/index.js";
import ProductModel from "../../../Models/product-management/product/index.js";
import { FilterQuery, generateUUID } from "../../../utils/helpers.js";

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            sale_price,
            sku,
            product_type,
            quantity,
            min_price,
            max_price,
            gallery,
            categories,
            tags,
            image,
            variation_options,
            variations,
            width,
            height,
            length,
            unit,
            has_variants,
            type_id,slug
        } = req.body;

        if (!name || !product_type) {
            return res.status(400).json({ message: "Name and product type are required." });
        }

        if (product_type === "simple") {
            if (!price || !sale_price || !quantity) {
                return res.status(400).json({ message: "Price, sale price, and quantity are required for simple products." });
            }

            const simpleProduct = new ProductModel({
                name,
                description,
                price,
                sale_price,
                sku,
                product_type,
                quantity,
                categories,
                tags,
                slug,
                image,
                gallery,
                width,
                height,
                length,
                unit,
                is_active: true,
                is_delete: false,
                group: type_id
            });

            const savedProduct = await simpleProduct.save();
            return res.status(201).json(savedProduct);
        }

        if (product_type === "variable") {
            if (!variation_options || variation_options.upsert?.length === 0) {
                return res.status(400).json({ message: "Variation options are required for variable products." });
            }
            console.log(req.body)
            
            const variants = await Promise.all(
                (variations || []).map(async (variant, index) => {
                    try {
                        const attributes = await Attribute.findById(variant?.attribute_id);
                        console.log(attributes,"attribute",variant?.attribute_id)
                        const uuid = await generateUUID();
                        return {
                            id: index + 1,
                            uuid: uuid,
                            value: attributes.identity,
                            slug: attributes.identity.toLowerCase(),
                            meta: attributes.meta,
                            attributes: variant?.attribute_id,
                        };
                    } catch (error) {
                        console.error(`Error processing variant at index ${index}:`, error.message);
                        return null; // Handle the error gracefully or skip this variant
                    }
                })
            );

            const transformed = variation_options.upsert.map(item => {
                return {
                    title: item.title,
                    is_digital: item.is_digital,
                    sku: item.sku,
                    quantity: item.quantity,
                    sale_price: item.sale_price,
                    price: item.price,
                    is_disable: item.is_disable,
                    stock: item.quantity,
                    image: item.image,
                    options: item.options.map(option => ({
                        name: option.name,
                        value: option.value
                    }))
                };
            });

            console.log(variants,"variant",transformed)
            
            const variantData = variation_options.upsert?.map((option) => {
                return {
                    title: option.title,
                    is_digital: option.is_digital,
                    sku: option.sku,
                    quantity: option.quantity,
                    sale_price: option.sale_price,
                    price: option.price,
                    is_disable: option.is_disable,
                    options: option.options,
                    image: option.image?.file || null,
                };
            });

            const variableProduct = new ProductModel({
                name,
                slug,
                description,
                min_price,
                max_price,
                product_type,
                has_variants: true,
                quantity,
                categories,
                tags,
                image,
                gallery,
                unit,
                variants: variants,
                variation_options : transformed,
                group: type_id
            });

            const savedProduct = await variableProduct.save();
            return res.status(201).json(savedProduct);
        }

        return res.status(400).json({ message: "Invalid product type." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error?.message });
    }
};


export const getProducts = async (req,res) => {
    try {
    const filterQuerys = FilterQuery("product",req.query)
    console.log(filterQuerys)
    const product_list = await ProductModel.find({...filterQuerys}).populate({ path: "group",model:"Group"})
    res.status(200).json({ status: "success", message: "All products retrived successfully",data: product_list})    
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message })  
    }
}

export const getProductWithUUID = async (req,res) => {
    try {
    const { id } = req.params
    const product_item = await ProductModel.findOne({ uuid: id })
    .populate({ path: "categories", model: "category"}).populate({ path: "group", model: "Group"}).populate({ path: "tags", model:"Tag"})
    res.status(200).json({ status: "failed", message: "Product details retrived successfully",data: product_item})     
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message }) 
    }
}
