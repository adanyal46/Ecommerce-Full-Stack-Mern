const express = require('express');
const {protect, adminOnly} = require("../middleware/authMiddleware");
const {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview
} = require("../controllers/productController");
const router = express.Router();

router.post('/store', protect, adminOnly, createProduct);
router.get('/all', getProducts).get('/:id', getSingleProduct)
    .delete('/:id', protect, adminOnly, deleteProduct)
    .patch('/update/:id', protect, adminOnly, updateProduct)
    .patch('/review/:id', protect, reviewProduct)
    .delete('/review/:id', protect, adminOnly, deleteReview);

module.exports = router;