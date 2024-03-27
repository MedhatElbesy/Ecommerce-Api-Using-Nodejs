const slugify = require('slugify');
const asyncHandeller = require('express-async-handler');
const productModel = require('../models/productModel');
const ApiError = require('../utils/apiError');

//@desc get list of Products
//@route post /api/v1/Products
//@access public
exports.getProducts = asyncHandeller(async(req , res )=>{
    const page = req.query.page * 1 || 1 ;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const Products = await productModel.find({}).skip(skip).limit(limit)
    .populate({path:'category' , select:'name -_id'});
    res.status(201).json({ results: Products.length , page , data: Products });
});

//@desc get specific Products by id
//@route get /api/v1/Products/:id
//@access public
exports.getProductsById = asyncHandeller( async(req , res , next) =>{
    const {id} = req.params ;
    const Product = await productModel.findById(id)
    .populate({path:'category' , select:'name -_id'});
    if(!Product){
        return next(new ApiError(`No Product for this Id ${id}`) , 404);
    }
    res.status(200).json({data : Product });
});

//@desc create Products
//@route post /api/v1/Products
//@access private
exports.createProduct = asyncHandeller(async(req , res)=>{
    req.body.slug = slugify(req.body.title);
    const createdProduct = await productModel.create(req.body);
    res.status(201).json({ data: createdProduct });
});

//@desc update specific Products by id
//@route put /api/v1/Products/:id
//@access private
exports.updateProduct = asyncHandeller(async(req , res , next) => {
    const {id} = req.params;
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await productModel.findByIdAndUpdate({_id:id},req.body,{new:true})
    if(!updatedProduct){
        return next(new ApiError(`Can not update this Id : ${id}`) , 404);
    }
    res.status(200).json({data:updatedProduct})
});

//@desc delete specific Products by id
//@route delete /api/v1/Products/:id
//@access private
exports.deleteProduct = asyncHandeller( async(req , res, next) => {
    const {id} = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if(!deletedProduct){
        return next(new ApiError(`Can not delete this Id : ${id}`) , 404);
    }
    res.status(200).json({message:`${id} deleted successfully`})
});