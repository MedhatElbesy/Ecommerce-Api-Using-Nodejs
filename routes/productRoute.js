const express = require('express');
const {
    getProductValidator,
    createProductValidator,
    updateProductValidator ,
    deleteProductValidator
    } = require('../utils/validation/productValidator');
const {
    getProducts ,
    createProduct ,
    getProductsById ,
    updateProduct ,
    deleteProduct
    } = require('../services/productServices');

const router = express.Router();


router.route('/')
    .get(getProducts)
    .post(createProductValidator,createProduct);

router.route('/:id')
    .get(getProductValidator,getProductsById) 
    .put(updateProductValidator,updateProduct)
    .delete(deleteProductValidator,deleteProduct);

module.exports = router;