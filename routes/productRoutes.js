const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockReport,
  getCategorySummary
} = require('../controller/productController');
const { validateProductInput } = require('../middleware/validate');

// Aggregation & Specific static routes must be placed BEFORE dynamic :id routes
router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

router.route('/')
  .get(getProducts)
  .post(validateProductInput, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.patch('/:id/stock', updateStock);

module.exports = router;