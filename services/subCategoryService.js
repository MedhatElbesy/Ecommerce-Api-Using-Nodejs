// const slugify = require('slugify');
// const asyncHandeller = require('express-async-handler');
const subCategoryModel = require('../models/subCategoryModel');
// const ApiError = require('../utils/apiError');
// const ApiFeaturesClass = require('../utils/apiFeatures');
const handeller = require('./handellers');

exports.setCategoryIdToBody = (req,res,next)=>{
    if(!req.body.category)
        req.body.category = req.params.categoryId;
    next();
};



// exports.createSubCategory = asyncHandeller(async(req , res)=>{
//     const {name , category } = req.body;
//     const subCategory = await subCategoryModel.create({name , slug:slugify(name),category});
//     res.status(201).json({ data: subCategory });
// });

exports.createFilterObject = (req,res,next)=>{
    let filterObject = {};
    if (req.params.categoryId) 
        filterObject = {category:req.params.categoryId};
    req.filterObject = filterObject;
    next();
}

//@desc get list of subcategories
//@route post /api/v1/categories
//@access public
exports.getSubCategories = handeller.wantToGetAll(subCategoryModel);

// exports.getSubCategories = asyncHandeller(async(req , res )=>{

//     const documentCounts = await subCategoryModel.countDocuments();
//     const ApiFeatures = new  ApiFeaturesClass(subCategoryModel.find(req.filterObject) , req.query)
//         .pagination(documentCounts)
//         .filter()
//         .search()
//         .limitFields()
//         .sort();
    
//         const {mongooseQuery,paginationResault } = ApiFeatures;
//         const subCategories = await mongooseQuery;

//     res.status(201).json({ results: subCategories.length , paginationResault , data: subCategories });
// });


//@desc create subcategory
//@route post /api/v1/subcategory
//@access private
exports.createSubCategory = handeller.wantToCreate(subCategoryModel);


//@desc get specific subcategory by id
//@route get /api/v1/categories/:id
//@access public
exports.getsubCategoryById = handeller.wantToGetByID(subCategoryModel);

// exports.getsubCategoryById = asyncHandeller( async(req , res , next) =>{
//     const {id} = req.params ;
//     const specificSubCategory = await subCategoryModel.findById(id);
//     .populate({
//         path:"category",
//         select:'name -_id'
//     });

//     if(!specificSubCategory){
//         return next(new ApiError(`No Category for this Id ${id}`) , 404);
//     }
//     res.status(200).json({data : specificSubCategory });
// });

//@desc update specific subcategory by id
//@route put /api/v1/subcategories/:id
//@access private

exports.updateSubCategory = handeller.wantToUpdate(subCategoryModel);

//@desc delete specific subcategory by id
//@route delete /api/v1/subcategories/:id
//@access private

exports.deleteSubCategory = handeller.wantToDelete(subCategoryModel);
