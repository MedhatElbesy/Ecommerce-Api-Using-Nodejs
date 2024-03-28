// const slugify = require('slugify');
// const multer  = require('multer');
// const ApiFeaturesClass = require('../utils/apiFeatures');
// const ApiError = require('../utils/apiError');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandeller = require('express-async-handler');

const handeller = require('./handellers');
const {uploadeSingleImage} = require('../middleware/uploadeImageMiddleware')
const CategoryModel = require('../models/categoryModel');

//disk storage engine
// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/categories')
//     },
//     filename: function (req, file, cb) {
//         const extention = file.mimetype.split("/")[1];
//         const uniqueFileName = `category-${uuidv4()}-${Date.now()}.${extention}`;
//         cb(null,uniqueFileName);
//     }
// });

//memory storage 
// const multerStorage = multer.memoryStorage()
// const multerFilter = function(req , file , cb){
//     if(file.mimetype.startsWith("image")){
//         cb(null , true);
//     }else{
//         cb(new ApiError("only images allowed" , 400) , false);
//     }
// };
// const upload = multer({ storage:multerStorage ,fileFilter:multerFilter})
exports.uploadCategoryImage = uploadeSingleImage("image");

exports.resizeImage = asyncHandeller( async(req , res , next) =>{
    const uniqueFileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
    // console.log(req.file);
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`uploads/categories/${uniqueFileName}`);
    
        //save image in db
    req.body.image = uniqueFileName ;
    next();
});











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


