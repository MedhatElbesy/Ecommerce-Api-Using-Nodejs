const slugify = require('slugify');
const asyncHandeller = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
const ApiError = require('../utils/apiError');

//@desc get list of categories
//@route post /api/v1/categories
//@access public
exports.getCategories = asyncHandeller(async(req , res )=>{
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(201).json({ results: categories.length , page , data: categories });
});

//@desc get specific category by id
//@route get /api/v1/categories/:id
//@access public
exports.getcategoryById = asyncHandeller( async(req , res , next) =>{
    const {id} = req.params ;
    const specificCategory = await CategoryModel.findById(id);
    if(!specificCategory){
        return next(new ApiError(`No Category for this Id ${id}`) , 404);
    }
    res.status(200).json({data : specificCategory });
});

//@desc create category
//@route post /api/v1/categories
//@access private
exports.createCategory = asyncHandeller(async(req , res)=>{
    const {name} = req.body;
    const category = await CategoryModel.create({name , slug:slugify(name)});
    res.status(201).json({ data: category });
});

//@desc update specific category by id
//@route put /api/v1/categories/:id
//@access private
exports.updateCategory = asyncHandeller(async(req , res , next) => {
    const {id} = req.params;
    const {name} = req.body;
    const updatedCategory = await CategoryModel.findByIdAndUpdate({_id:id},{name , slug: slugify(name)},{new:true})
    if(!updatedCategory){
        return next(new ApiError(`Can not update this Id : ${id}`) , 404);
    }
    res.status(200).json({data:updatedCategory})
});

//@desc delete specific category by id
//@route delete /api/v1/categories/:id
//@access private
exports.deleteCategory = asyncHandeller( async(req , res, next) => {
    const {id} = req.params;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if(!deletedCategory){
        return next(new ApiError(`Can not delete this Id : ${id}`) , 404);
    }
    res.status(200).json({message:`${id} deleted successfully`})
});