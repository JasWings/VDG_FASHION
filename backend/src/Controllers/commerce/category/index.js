import Category from '../../../Models/product-management/category/index.js';
import Validations from '../../../Validations/index.js';

const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const validatedCategory = Validations.validateCategory(categoryData);
    const category = new Category(validatedCategory);
    await category.save();
    res.status(201).json({ status: "success", message: 'Category created successfully', data: category });
  } catch (error) {
    res.status(400).json({ status: "success", message : error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({ path: "type_id", model: "Group"})
    if (categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }
    res.status(200).json({ status: "success", message: "All Categories retrived successfully", data: categories});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
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
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ status: "success", message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: "success", message: error.message });
  }
};

export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
