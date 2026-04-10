const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// All product routes require authentication
router.use(authMiddleware);

// Public routes (for authenticated users)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin only routes
router.post('/', authorize('admin'), productController.createProduct);
router.put('/:id', authorize('admin'), productController.updateProduct);
router.delete('/:id', authorize('admin'), productController.deleteProduct);

module.exports = router;
