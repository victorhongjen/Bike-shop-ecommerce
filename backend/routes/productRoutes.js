import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

//@desc FETCH all products
//@route GET /api/products
//@access Public route 
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    
    res.json(products)
}))

//@desc FETCH one product
//@route GET /api/products/:id
//@access Public route 
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    // check if there is a product  
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))

export default router