const slugify = require('slugify');
const asyncHandeller = require('express-async-handler');
const subCategoryModel = require('../models/subCategoryModel');
const ApiError = require('../utils/apiError');

exports.setCategoryIdToBody = (req,res,next)=>{
    if(!req.body.category)
        req.body.category = req.params.categoryId;
    next();
};
//@desc create subcategory
//@route post /api/v1/subcategory
//@access private
exports.createSubCategory = asyncHandeller(async(req , res)=>{
    const {name , category } = req.body;
    const subCategory = await subCategoryModel.create({name , slug:slugify(name),category});
    res.status(201).json({ data: subCategory });
});

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
exports.getSubCategories = asyncHandeller(async(req , res )=>{
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
// console.log(req.params);
    const subCategories = await subCategoryModel.find(req.filterObject)
        .skip(skip)
        .limit(limit);
        // .populate({path:"category", select:'name -_id'});

    res.status(201).json({ results: subCategories.length , page , data: subCategories });
});

//@desc get specific subcategory by id
//@route get /api/v1/categories/:id
//@access public
exports.getsubCategoryById = asyncHandeller( async(req , res , next) =>{
    const {id} = req.params ;
    const specificSubCategory = await subCategoryModel.findById(id);
    // .populate({
    //     path:"category",
    //     select:'name -_id'
    // });

    if(!specificSubCategory){
        return next(new ApiError(`No Category for this Id ${id}`) , 404);
    }
    res.status(200).json({data : specificSubCategory });
});

//@desc update specific subcategory by id
//@route put /api/v1/subcategories/:id
//@access private
exports.updateSubCategory = asyncHandeller(async(req , res , next) => {
    const {id} = req.params;
    const {name ,category} = req.body;

    const updatedsubCategory = await subCategoryModel.findByIdAndUpdate({_id:id},{name , slug: slugify(name), category},{new:true})
    if(!updatedsubCategory){
        return next(new ApiError(`Can not update this Id : ${id}`) , 404);
    }
    res.status(200).json({data:updatedsubCategory})
});

//@desc delete specific subcategory by id
//@route delete /api/v1/subcategories/:id
//@access private
exports.deleteSubCategory = asyncHandeller( async(req , res, next) => {
    const {id} = req.params;
    const deletedsubCategory = await subCategoryModel.findByIdAndDelete(id);

    if(!deletedsubCategory){
        return next(new ApiError(`Can not delete this Id : ${id}`) , 404);
    }
    res.status(200).json({message:`${id} deleted successfully`})
});