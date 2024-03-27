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
    deleteCategory
    } = require('../services/categoryServices');
const subcategoriesRoute= require('./subCategoryRoure');

const router = express.Router();

router.use('/:categoryId/subcategories',subcategoriesRoute)

router.route('/')
    .get(getCategories)
    .post(createCategoryValidator,createCategory);

router.route('/:id')
    .get(getCategoryValidator,getcategoryById) 
    .put(updateCategoryValidator,updateCategory)
    .delete(deleteCategoryValidator,deleteCategory);

module.exports = router;