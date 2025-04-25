import Attribute from "../../../Models/product-management/attributes/index.js";
import ProductModel from "../../../Models/product-management/product/index.js";
import CategoryModel from "../../../Models/product-management/category/index.js"
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
                unit,
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
    const { orderBy = "created_at", sortedBy = "DESC", page = 1, limit = 10 } = req.query;

    const sortOrder = sortedBy === "ASC" ? 1 : -1;
    let sortQuery = {};

    if (orderBy === "min_price" || orderBy === "max_price") {
      sortQuery = { price: sortOrder };
    } else {
      sortQuery = { created_at: sortOrder, _id: 1 }; // Added _id for deterministic sorting
    }

    const priceFilter = {};
    if (req.query.min_price) {
      priceFilter.price = { $gte: parseFloat(req.query.min_price) };
    }
    if (req.query.max_price) {
      priceFilter.price = { ...priceFilter.price, $lte: parseFloat(req.query.max_price) };
    }

    const categoryFilter = {};
    if (filterQuerys.categories && filterQuerys.categories.length > 0) {
      categoryFilter.categories = { $in: filterQuerys.categories };
    } else if (req.query.parent) {
      const parentId = req.query.parent;
      const matchingCategories = await CategoryModel.find({ parent: parentId }).select("_id");

      if (matchingCategories.length > 0) {
        const categoryIds = matchingCategories.map((category) => category._id.toString());
        categoryFilter.categories = { $in: categoryIds };
      } else {
        categoryFilter.categories = { $in: [] };
      }
    }

    const textFilter = {};
    if (req.query.text) {
      const words = req.query.text.split(" ").filter(Boolean);
      const regexParts = words.map((word) => `(?=.*${word})`);
      const regex = new RegExp(regexParts.join(""), "i");
      textFilter.name = { $regex: regex };
    }

    const baseFilters = {
      ...filterQuerys,
      ...priceFilter,
      ...textFilter,
      is_delete: false,
    };

    let productFilter = { ...baseFilters };

    if (categoryFilter.categories) {
      productFilter = { ...productFilter, ...categoryFilter };
    } else if (filterQuerys.group) {
      productFilter.group = filterQuerys.group;
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skipCount = (pageNumber - 1) * pageSize;

    const product_list = await ProductModel.find(productFilter)
      .populate({ path: "group", model: "Group" })
      .populate({ path: "variants", populate: { path: "attributes" } })
      .sort(sortQuery)
      .skip(skipCount)
      .limit(pageSize);

    const totalProducts = await ProductModel.countDocuments(productFilter);

    res.status(200).json({
      status: "success",
      message: "All products retrieved successfully",
      data: product_list,
      pagination: {
        total: totalProducts,
        page: pageNumber,
        pageSize: pageSize,
        totalPages: Math.ceil(totalProducts / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error?.message });
  }
};



// export const getProducts = async (req, res) => {
//   try {
//     const filterQuerys = FilterQuery("product", req.query);
//     const { orderBy = "created_at", sortedBy = "DESC", page = 1, limit = 10 } = req.query;

//     const sortOrder = sortedBy === "ASC" ? 1 : -1;
//     let sortQuery = {};

//     if (orderBy === "min_price") {
//       sortQuery = { price: sortOrder };
//     } else if (orderBy === "max_price") {
//       sortQuery = { price: sortOrder };
//     } else {
//       sortQuery = { created_at: sortOrder };
//     }

//     const priceFilter = {};
//     if (req.query.min_price) {
//       priceFilter.price = { $gte: parseFloat(req.query.min_price) };
//     }
//     if (req.query.max_price) {
//       if (!priceFilter.price) {
//         priceFilter.price = {};
//       }
//       priceFilter.price.$lte = parseFloat(req.query.max_price);
//     }

//     const categoryFilter = {};
//     if (filterQuerys.categories) {
//       categoryFilter.categories = { $in: filterQuerys.categories };
//     }
//     if (req.query.parent) {
//       const parentId = req.query.parent;

//       const matchingCategories = await CategoryModel.find({ parent: parentId }).select("_id");

//       if (matchingCategories.length > 0) {
//         const categoryIds = matchingCategories.map((category) => category._id.toString());
//         categoryFilter.categories = { $in: categoryIds };
//       } else {
//         categoryFilter.categories = { $in: [] };
//       }
//     }

//     const textFilter = {};
//     if (req.query.text) {
//       const words = req.query.text.split(" ").filter(Boolean);
//       const regexParts = words.map((word) => `(?=.*${word})`);
//       const regex = new RegExp(regexParts.join(""), "i");
//       textFilter.name = { $regex: regex };
//     }

//     console.log(req.query, filterQuerys, categoryFilter);

//     const pageNumber = parseInt(page, 10);
//     const pageSize = parseInt(limit, 10);

//     const product_list = await ProductModel.find({
//       ...filterQuerys,
//       ...priceFilter,
//       ...categoryFilter,
//       ...textFilter,
//       is_delete: false,
//     })
//       .populate({ path: "group", model: "Group" })
//       .populate({ path: "variants", populate: { path: "attributes" } })
//       .sort(sortQuery)
//       .skip((pageNumber - 1) * pageSize)
//       .limit(pageSize);

//     const totalProducts = await ProductModel.countDocuments({
//       ...filterQuerys,
//       ...priceFilter,
//       ...categoryFilter,
//       ...textFilter,
//       is_delete: false,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "All products retrieved successfully",
//       data: product_list,
//       pagination: {
//         total: totalProducts,
//         page: pageNumber,
//         pageSize: pageSize,
//         totalPages: Math.ceil(totalProducts / pageSize),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ status: "failed", message: error?.message });
//   }
// };

  

export const getProductWithUUID = async (req,res) => {
    try {
    const { id } = req.params
    const product_item = await ProductModel.findOne({ uuid: id })
    .populate({ path: "categories", model: "category"})
    .populate({ path: "group", model: "Group"}).populate({ path: "tags", model:"Tag"}).populate({ path: "variants",populate: { path: "attributes"}})
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
    description: Joi.string().optional().allow("",null),
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
    variants: Joi.any().optional(),
    variation_options: Joi.any().optional(),
    quantity: Joi.number().optional(),
    min_price: Joi.any().optional(),
    max_price: Joi.any().optional(),
    unit: Joi.string().optional(),
    width: Joi.string().optional().allow(null,''),
    height: Joi.string().optional().allow(null,''),
    length: Joi.string().optional().allow(null,''),
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


export const deleteProductwithId = async (req,res) => {
    try {
    const { id} = req.params
    const delete_product = await ProductModel.findOneAndUpdate({_id: id},{ is_delete: true})   
    res.status(200).json({ status: 'success', message: "product deleted successfully"}) 
    } catch (error) {
       res.status(500).json({ success: false, message: error.message}) 
    }
}

