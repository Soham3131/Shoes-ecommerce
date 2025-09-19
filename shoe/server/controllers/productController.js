// src/controllers/productController.js
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

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

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Backend Error during product deletion:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, brand, category, gender, subCategory, variants } = req.body;

  if (!category || !gender) {
    return res.status(400).json({ message: 'Category and gender are required.' });
  }

  try {
    const fileUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await bufferUpload(file.buffer, process.env.CLOUDINARY_FOLDER);
        fileUrls.push(result.secure_url);
      }
    }

    const product = new Product({
      name,
      description,
      brand,
      category,
      gender,
      subCategory,
      images: fileUrls,
      variants: JSON.parse(variants),
    });

    const createdProduct = await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    console.error('Backend Error during product creation:', error);
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, brand, category, gender, subCategory, variants } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const fileUrls = req.files && req.files.length > 0 ? [] : product.images;
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await bufferUpload(file.buffer, process.env.CLOUDINARY_FOLDER);
        fileUrls.push(result.secure_url);
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.gender = gender || product.gender;
    product.subCategory = subCategory || product.subCategory;
    product.images = fileUrls;
    product.variants = JSON.parse(variants) || product.variants;

    const updatedProduct = await product.save();
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Backend Error during product update:', error);
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   try {
//     const products = await Product.find({ subCategory: req.params.subCategory }).limit(9);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.getProductsBySubCategory = async  (req, res) => {
  const { subCategory } = req.params;

  // Find products by subCategory and populate the 'category' field
  const products = await Product.find({ subCategory })
    .populate('category', 'name') // The second argument 'name' is optional, but it optimizes the query by only returning the name field.
    .exec();

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error('No products found for this subcategory');
  }

  res.json(products);
};
exports.getProductsByGender = async (req, res) => {
    try {
        const products = await Product.find({ gender: req.params.gender });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRecentProducts = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20; // Default to 20 products
  
  // The key change: add .populate('category', 'name')
  const products = await Product.find({})
    .sort({ createdAt: -1 }) // Sort by creation date, newest first
    .limit(limit)
    .populate('category', 'name') // This populates the category field
    .exec();

  res.json(products);
};
exports.searchProducts = async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ message: 'Search keyword is required' });
    }

    try {
        const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive search

        const products = await Product.find({
            $or: [
                { name: { $regex: regex } },
                { brand: { $regex: regex } },
                { subCategory: { $regex: regex } },
                { gender: { $regex: regex } }
            ]
        }).populate('category');

        res.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: error.message });
    }
};
// @desc    Update a product with new images and variants
// @route   PUT /api/products/:id
// @access  Private/Admin


// @desc    Update a product with 