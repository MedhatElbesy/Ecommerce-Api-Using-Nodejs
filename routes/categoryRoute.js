const express = require('express');
const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator ,
    deleteCategoryValidator
    } = require('../utils/validation/categoryValidator');
const {
    getCategories ,
    createCategory ,
    getcategoryById ,
    updateCategory ,
    deleteCategory,
    uploadCategoryImage,
    resizeImage,
    } = require('../services/categoryServices');


const subcategoriesRoute= require('./subCategoryRoure');

const router = express.Router();

router.use('/:categoryId/subcategories',subcategoriesRoute)

router.route('/')
    .get(getCategories)
    .post(uploadCategoryImage,resizeImage,createCategoryValidator,createCategory);

router.route('/:id')
    .get(getCategoryValidator,getcategoryById) 
    .put(uploadCategoryImage,resizeImage,updateCategoryValidator,updateCategory)
    .delete(deleteCategoryValidator,deleteCategory);

module.exports = router;