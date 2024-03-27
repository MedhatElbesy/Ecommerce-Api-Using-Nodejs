const express = require('express');
const {createSubCategory,
    getsubCategoryById,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject
    } = require('../services/subCategoryService');
const {createsubCategoryValidator,
    getsubCategoryValidator,
    updatesubCategoryValidator,
    deletesubCategoryValidator
    } = require('../utils/validation/subCategoryValidator');

const router = express.Router({mergeParams: true});

router.route('/')
    .get(createFilterObject,getSubCategories)
    .post(setCategoryIdToBody,createsubCategoryValidator,createSubCategory);


router.route('/:id')
    .get(getsubCategoryValidator,getsubCategoryById)
    .put(updatesubCategoryValidator,updateSubCategory)
    .delete(deletesubCategoryValidator,deleteSubCategory);

    module.exports = router;    
