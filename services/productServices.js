// const slugify = require('slugify');
// const asyncHandeller = require('express-async-handler');
// const ApiError = require('../utils/apiError');
// const ApiFeaturesClass = require('../utils/apiFeatures');
const productModel = require('../models/productModel');
const handeller = require('./handellers');

//@desc get list of Products
//@route post /api/v1/Products
//@access public
exports.getProducts = handeller.wantToGetAll(productModel);

// exports.getProducts = asyncHandeller(async(req , res )=>{

//     const documentCounts = await productModel.countDocuments();
//     const ApiFeatures = new  ApiFeaturesClass(productModel.find() , req.query)
//         .pagination(documentCounts)
//         .filter()
//         .search('Products')
//         .limitFields()
//         .sort();

//         //     .populate({path:'category' , select:'name -_id'});
//     const {mongooseQuery,paginationResault } = ApiFeatures;
//     const Products = await mongooseQuery;
//     res.status(201).json({ results: Products.length ,paginationResault, data: Products });
// });

/**
* @desc get specific Products by id
* @route get /api/v1/Products/:id
* @access public 
*/
exports.getProductsById = handeller.wantToGetByID(productModel);

// exports.getProductsById = asyncHandeller( async(req , res , next) =>{
//     const {id} = req.params ;
//     const Product = await productModel.findById(id)
//     .populate({path:'category' , select:'name -_id'});
//     if(!Product){
//         return next(new ApiError(`No Product for this Id ${id}`) , 404);
//     }
//     res.status(200).json({data : Product });
// });

//@desc create Products
//@route post /api/v1/Products
//@access private
exports.createProduct = handeller.wantToCreate(productModel);

// exports.createProduct = asyncHandeller(async(req , res)=>{
//     const createdProduct = await productModel.create(req.body);
//     res.status(201).json({ data: createdProduct });
// });

//@desc update specific Products by id
//@route put /api/v1/Products/:id
//@access private

exports.updateProduct = handeller.wantToCreate(productModel,"productModel");

//@desc delete specific Products by id
//@route delete /api/v1/Products/:id
//@access private

exports.deleteProduct = handeller.wantToDelete(productModel);
