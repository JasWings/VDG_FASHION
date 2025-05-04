import Category from '../../../Models/product-management/category/index.js';
import { FilterQuery } from '../../../utils/helpers.js';
import Validations from '../../../Validations/index.js';

const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const validatedCategory = Validations.validateCategory(categoryData);
    const category = new Category({...validatedCategory,description: validatedCategory?.details});
    await category.save();
    res.status(201).json({ status: "success", message: 'Category created successfully', data: category });
  } catch (error) {
    res.status(500).json({ status: "failed", message : error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const filters = FilterQuery('category',req.query)

    const { page, limit } = req.params
    
    const categories = await Category.find({...filters, is_deleted: false })
    .populate({ path: "type_id", model: "Group" }).skip((page-1) * limit).skip(limit)
    const categoryMap = new Map();
    console.log(filters,req.query,categories.length)

    categories.forEach((category) => {
      const parentId = category.parent ? category.parent.toString() : null;
      if (!categoryMap.has(parentId)) {
        categoryMap.set(parentId, []);
      }
      categoryMap.get(parentId).push(category);
    });

    const buildCategoryTree = (parentId) => {
      return (categoryMap.get(parentId) || []).map((category) => ({
        ...category.toObject(),
        children: buildCategoryTree(category._id.toString()),
      }));
    };

    const rootCategories = buildCategoryTree(null);

    res.status(200).json({
      status: "success",
      message: "All Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate({ path: "type_id"}).populate({ path: "parent",strictPopulate:false})
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ status: "success", message: "Category details retrived successfully", data: category});
  } catch (error) {
    res.status(500).json({ status: "success", message : error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const validatedCategory = Validations.validateCategory(categoryData);
    const category = await Category.findByIdAndUpdate(id, validatedCategory, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ status: "success", message: 'Category updated successfully', data: category });
  } catch (error) {
    res.status(400).json({ status: "failed",  error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate({uuid:id},{ is_deleted: true  })
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ status: "success", message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: "success", message: error.message });
  }
};

export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
