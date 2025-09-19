// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Import upload middleware

router.get('/', categoryController.getCategories);
router.post('/', protect, admin, upload.single('image'), categoryController.createCategory);
router.delete('/:id', protect, admin, categoryController.deleteCategory);

module.exports = router;