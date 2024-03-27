// const slugify = require('slugify');
// const asyncHandeller = require('express-async-handler');
const BrandModel = require('../models/brandModel');
// const ApiError = require('../utils/apiError');
// const ApiFeaturesClass = require('../utils/apiFeatures');
const handeller = require('./handellers');


//@desc get list of brands
//@route post /api/v1/brands
//@access public
exports.getBrands = handeller.wantToGetAll(BrandModel);
// exports.getBrands = asyncHandeller(async(req , res )=>{

//     const documentCounts = await BrandModel.countDocuments();
//     const ApiFeatures = new  ApiFeaturesClass(BrandModel.find() , req.query)
//         .pagination(documentCounts)
//         .filter()
//         .search()
//         .limitFields()
//         .sort();
    
//         const {mongooseQuery,paginationResault } = ApiFeatures;
//         const brand = await mongooseQuery;

//     res.status(201).json({ results: brand.length ,paginationResault, data: brand });
// });

//@desc get specific brand by id
//@route get /api/v1/brand/:id
//@access public
exports.getBrandById = handeller.wantToGetByID(BrandModel);
// exports.getBrandById = asyncHandeller( async(req , res , next) =>{
//     const {id} = req.params ;
//     const specificBrand = await BrandModel.findById(id);
//     if(!specificBrand){
//         return next(new ApiError(`No brand for this Id ${id}`) , 404);
//     }
//     res.status(200).json({data : specificBrand });
// });

//@desc create brand
//@route post /api/v1/brands
//@access private
exports.createBrand = handeller.wantToCreate(BrandModel);

// exports.createBrand = asyncHandeller(async(req , res)=>{
//     const brand = await BrandModel.create(req.body);
//     res.status(201).json({ data: brand });
// });

//@desc update specific brand by id
//@route put /api/v1/brand/:id
//@access private

exports.updateBrand = handeller.wantToUpdate(BrandModel);

//@desc delete specific brand by id
//@route delete /api/v1/brand/:id
//@access private

exports.deleteBrand  = handeller.wantToDelete(BrandModel)

