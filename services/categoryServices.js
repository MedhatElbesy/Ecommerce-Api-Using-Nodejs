// const slugify = require('slugify');
// const asyncHandeller = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
// const ApiError = require('../utils/apiError');
// const ApiFeaturesClass = require('../utils/apiFeatures');
const handeller = require('./handellers');


//@desc get list of categories
//@route post /api/v1/categories
//@access public
exports.getCategories = handeller.wantToGetAll(CategoryModel);

// exports.getCategories = asyncHandeller(async(req , res )=>{

//     const documentCounts = await CategoryModel.countDocuments();
//     const ApiFeatures = new  ApiFeaturesClass(CategoryModel.find() , req.query)
//         .pagination(documentCounts)
//         .filter()
//         .search()
//         .limitFields()
//         .sort();
    
//         const {mongooseQuery,paginationResault } = ApiFeatures;
//         const categories = await mongooseQuery;

//     res.status(201).json({ results: categories.length , paginationResault , data: categories });
// });

//@desc get specific category by id
//@route get /api/v1/categories/:id
//@access public
exports.getcategoryById = handeller.wantToGetByID(CategoryModel);

// exports.getcategoryById = asyncHandeller( async(req , res , next) =>{
//     const {id} = req.params ;
//     const specificCategory = await CategoryModel.findById(id);
//     if(!specificCategory){
//         return next(new ApiError(`No Category for this Id ${id}`) , 404);
//     }
//     res.status(200).json({data : specificCategory });
// });

//@desc create category
//@route post /api/v1/categories
//@access private
exports.createCategory = handeller.wantToCreate(CategoryModel);

// exports.createCategory = asyncHandeller(async(req , res)=>{
//     const {name} = req.body;
//     const category = await CategoryModel.create({name , slug:slugify(name)});
//     res.status(201).json({ data: category });
// });

//@desc update specific category by id
//@route put /api/v1/categories/:id
//@access private
exports.updateCategory = handeller.wantToUpdate(CategoryModel);

//@desc delete specific category by id
//@route delete /api/v1/categories/:id
//@access private
exports.deleteCategory = handeller.wantToDelete(CategoryModel);


