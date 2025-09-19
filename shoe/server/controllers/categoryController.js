// src/controllers/categoryController.js
const Category = require('../models/Category');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

// Helper function for uploading a single file to Cloudinary
const bufferUpload = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const readable = new Readable();
        readable.push(buffer);
        readable.push(null);
        readable.pipe(
            cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder: folder },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            )
        );
    });
};

// @desc    Create a new category with an image
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'Category image is required' });
    }
    
    try {
        const result = await bufferUpload(file.buffer, process.env.CLOUDINARY_FOLDER);
        const category = new Category({ name, image: result.secure_url });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error('Category creation failed:', error);
        res.status(500).json({ message: 'Category creation failed', error });
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a category by ID
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        const productsCount = await Product.countDocuments({ category: categoryId });
        if (productsCount > 0) {
            return res.status(400).json({ message: 'Cannot delete category with associated products.' });
        }
        
        await Category.findByIdAndDelete(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Failed to delete category:', error);
        res.status(500).json({ message: 'Failed to delete category.', error });
    }
};

