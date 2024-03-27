const slugify = require('slugify');
const asyncHandeller = require('express-async-handler');
const BrandModel = require('../models/brandModel');
const ApiError = require('../utils/apiError');

//@desc get list of brands
//@route post /api/v1/brands
//@access public
exports.getBrands = asyncHandeller(async(req , res )=>{
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const brand = await BrandModel.find({}).skip(skip).limit(limit);
    res.status(201).json({ results: brand.length , page , data: brand });
});

//@desc get specific brand by id
//@route get /api/v1/brand/:id
//@access public
exports.getBrandById = asyncHandeller( async(req , res , next) =>{
    const {id} = req.params ;
    const specificBrand = await BrandModel.findById(id);
    if(!specificBrand){
        return next(new ApiError(`No brand for this Id ${id}`) , 404);
    }
    res.status(200).json({data : specificBrand });
});

//@desc create brand
//@route post /api/v1/brands
//@access private
exports.createBrand = asyncHandeller(async(req , res)=>{
    const {name} = req.body;
    const brand = await BrandModel.create({name , slug:slugify(name)});
    res.status(201).json({ data: brand });
});

//@desc update specific brand by id
//@route put /api/v1/brand/:id
//@access private
exports.updateBrand = asyncHandeller(async(req , res , next) => {
    const {id} = req.params;
    const {name} = req.body;
    const updatedBrand = await BrandModel.findByIdAndUpdate({_id:id},{name , slug: slugify(name)},{new:true})
    if(!updatedBrand){
        return next(new ApiError(`Can not update this Id : ${id}`) , 404);
    }
    res.status(200).json({data:updatedBrand})
});

//@desc delete specific brand by id
//@route delete /api/v1/brand/:id
//@access private
exports.deleteBrand = asyncHandeller( async(req , res, next) => {
    const {id} = req.params;
    const deletedBrand = await BrandModel.findByIdAndDelete(id);
    if(!deletedBrand){
        return next(new ApiError(`Can not delete this Id : ${id}`) , 404);
    }
    res.status(200).json({message:`${id} deleted successfully`})
});