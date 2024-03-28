const express = require('express');
const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator ,
    deleteBrandValidator
    } = require('../utils/validation/brandValidator');
const {
    getBrands ,
    createBrand ,
    getBrandById ,
    updateBrand ,
    deleteBrand,
    uploadBrandImage,
    resizeImage
    } = require('../services/brandServices');

const router = express.Router();


router.route('/')
    .get(getBrands)
    .post(uploadBrandImage,resizeImage,createBrandValidator,createBrand);

router.route('/:id')
    .get(getBrandValidator,getBrandById) 
    .put(uploadBrandImage,resizeImage,updateBrandValidator,updateBrand)
    .delete(deleteBrandValidator,deleteBrand);

module.exports = router;