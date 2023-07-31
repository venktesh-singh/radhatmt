const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const productSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    sale_price: {
        type: Number,
    },
    weight: {
        type: String,
    },
    descriptions: {
        type: String
    },
    product_thumbnail: {
        type: String,
    },  
    product_pic: {
        type: String,
    },
    category: {
        type: String,
    },
    stock: {
        type: String,
    },
    quantity: {
        type: Number,
    },  
    slug: {
        type: String,
    }, 
    tags: {
        type: String,
    }, 
    isVerified:
    {
        type: Boolean
    },

}, {
    timestamps: true
})

const Product = mongooose.model('PRODUCT', productSchema);

module.exports = Product;