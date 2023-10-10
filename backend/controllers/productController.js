const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Product = require('../models/productModel')

const createProduct = asyncHandler(async (req, res) => {
    const {name, sku, category, brand, quantity, price, description, image, regularPrice, color} = req.body;
    if (!name || !sku || !category || !brand || !quantity || !price || !description || !regularPrice || !color) {
        res.status(400);
        throw new Error('All fields is required!');
    }

    const product = await Product.create({
        name, sku, category, brand, quantity, price, description, image, regularPrice, color
    })
    res.status(201).json(product);

})
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort('-createdAt');
    res.status(201).json(products);

})
const getSingleProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Product not found');
    }

    const product = await Product.findById(id);
    if (!product) {
        res.status(400)
        throw new Error('Product not found');
    }
    res.status(201).json(product);

})
const updateProduct = asyncHandler(async (req, res) => {
    const {name, sku, category, brand, quantity, price, description, image, regularPrice, color} = req.body;
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Product not found');
    }
    //
    const product = await Product.findById(id);
    if (!product) {
        res.status(400)
        throw new Error('Product not found');
    }
    const updateProductData = await Product.findByIdAndUpdate(
        {_id: id},
        {
            name, sku, category, brand, quantity, price, description, image, regularPrice, color
        }, {
            new: true,
            runValidators: true,
        }
    )
    res.status(201).json(updateProductData);
    res.send('success');

})
const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Product not found');
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        res.status(400)
        throw new Error('Product not found');
    }
    res.status(201).json({
        message: 'Product delete successfully',
    });

})
const reviewProduct = asyncHandler(async (req, res) => {
    const {star, review, reviewDate} = req.body;
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Product not found');
    }

    if (star < 1 || !review) {
        res.status(400);
        throw new Error('Please add a star');
    }
    const product = await Product.findById(id)
    if (!product) {
        res.status(400);
        throw new Error('Product not found');
    }

    product.ratings.push({
        star, review, reviewDate, name: req.user.name, userID: req.user._id
    })

    product.save();
    res.status(201).json({
        message: 'Product Review add successfully',
    });
})
const deleteReview = asyncHandler(async (req, res) => {
    const {userID} = req.body;
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400)
        throw new Error('Product not found');
    }

    try {
        const product = await Product.findById(productId);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        // Filter out the review with the matching userID
        const updatedRatings = product.ratings.filter((rating) => {
            return rating.userID.toString() !== userID;
        });

        // Update the product's ratings with the filtered array
        product.ratings = updatedRatings;

        // Save the updated product
        await product.save();

        res.status(200).json({
            message: 'Product Review Deleted.',
        });
    } catch (error) {
        res.status(500);
        throw new Error('Error deleting product review: ' + error.message);
    }

})
module.exports = {
    createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct, reviewProduct, deleteReview
}