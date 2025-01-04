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
            has_variants,
            type_id,slug,unit
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
                is_active: true,
                is_delete: false,
                group: type_id,unit:unit
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
                        const variantfind = variation_options?.upsert?.map((o) => 
                            o.options.find((i) => i.name === attributes.identity)
                        );
                                                
                        console.log(attributes,"attribute",variant?.attribute_id,variantfind)
                        const uuid = await generateUUID();
                        
                        return {
                            id: index + 1,
                            uuid: uuid,
                            value: variantfind[0]?.value,
                            slug: variantfind[0]?.value.toLowerCase(),
                            meta: variantfind[0]?.name.toLowerCase(),
                            attributes: variant?.attribute_id,
                        };
                        
                    } catch (error) {
                        console.error(`Error processing variant at index ${index}:`, error.message);
                        throw new Error(error)
                        // return null; // Handle the error gracefully or skip this variant
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
                variants: variants,
                variation_options : transformed,
                group: type_id,
                unit: unit
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


export const getProducts = async (req, res) => {
    try {
      const filterQuerys = FilterQuery("product", req.query);
      const { orderBy = "created_at", sortedBy = "DESC" } = req.query;
  
      const sortOrder = sortedBy === "ASC" ? 1 : -1;
      let sortQuery = {};
      console.log(req.query)
      
      if (orderBy === "min_price") {
        sortQuery = { price: sortOrder };
      } else if (orderBy === "max_price") {
        sortQuery = { price: sortOrder };
      } else {
        sortQuery = { created_at: sortOrder };
      }
  
      const priceFilter = {};
      if (req.query.min_price) {
        priceFilter.price = { $gte: parseFloat(req.query.min_price) };
      }
      if (req.query.max_price) {
        if (!priceFilter.price) {
          priceFilter.price = {};
        }
        priceFilter.price.$lte = parseFloat(req.query.max_price);
      }
  
      const product_list = await ProductModel.find({
        ...filterQuerys,
        ...priceFilter,
        is_delete: false,
      })
        .populate({ path: "group", model: "Group" })
        .populate({ path: "variants", populate: { path: "attributes" } })
        .sort(sortQuery);
  
      res.status(200).json({
        status: "success",
        message: "All products retrieved successfully",
        data: product_list,
      });
    } catch (error) {
      res.status(500).json({ status: "failed", message: error?.message });
    }
  };
  

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


import Joi from "joi";

const updateProductSchema = Joi.object({
   id : Joi.string().required(),
   variations : Joi.any().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    sale_price: Joi.number().optional(),
    language: Joi.any().optional(),
    video: Joi.any().optional(),
    is_external : Joi.any().optional(),
    is_digital: Joi.any().optional(),
    type_id : Joi.any().optional(),
    status: Joi.string().valid("publish", "draft").optional(),
    sku: Joi.string().optional(),
    slug: Joi.string().optional(),
    gender: Joi.string().optional(),
    group: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    categories: Joi.array().items(Joi.string()).optional(),
    product_type: Joi.string().valid("simple", "variable").optional(),
    has_variants: Joi.boolean().optional(),
    variants: Joi.array().items(
        Joi.object({
            id: Joi.number().optional(),
            uuid: Joi.string().optional(),
            value: Joi.string().required(),
            slug: Joi.string().required(),
            meta: Joi.string().optional(),
            attributes: Joi.string().optional(),
        })
    ).optional(),
    variation_options: Joi.any().optional(),
    quantity: Joi.number().optional(),
    min_price: Joi.any().optional(),
    max_price: Joi.any().optional(),
    unit: Joi.string().optional(),
    width: Joi.string().optional(),
    height: Joi.string().optional(),
    length: Joi.string().optional(),
    image: Joi.object({
        uuid: Joi.string().required(),
        is_active: Joi.boolean().optional(),
        is_deleted: Joi.boolean().optional(),
        file: Joi.string().required(),
        id: Joi.number().optional(),
    }).optional(),
    gallery: Joi.array().items(
        Joi.object({
            uuid: Joi.string().required(),
            is_active: Joi.boolean().optional(),
            is_deleted: Joi.boolean().optional(),
            file: Joi.string().required(),
            id: Joi.number().optional(),
            _id : Joi.any().optional(),
            __v : Joi.any().optional()
        })
    ).optional(),
    is_active: Joi.boolean().optional(),
    is_delete: Joi.boolean().optional(),
});

export const updateProductById = async (req, res) => {
    const { _id } = req.params;
    const updates = req.body;

    const { error, value } = updateProductSchema.validate(updates, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map((detail) => detail.message),
        });
    }

    try {
        const product = await ProductModel.findByIdAndUpdate(
            _id,
            { $set: value },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating product", error: error.message });
    }
};

