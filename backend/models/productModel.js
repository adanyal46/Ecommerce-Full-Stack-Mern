const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        default: 'SKU',
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
        default: 'As seen',
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
        trim: true,
    },
    regularPrice: {
        type: Number,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    image: {
        type: [String],
    },
    ratings: {
        type: [Object],
    }
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;