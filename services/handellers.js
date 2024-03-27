const asyncHandeller = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeaturesClass = require('../utils/apiFeatures');

exports.wantToDelete = (Model) => 
asyncHandeller( async (req , res, next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id);
    if(!document){
        return next(new ApiError(`Can not delete this Id : ${id}`) , 404);
    }
    res.status(200).json({message:`${id} deleted successfully`})
});

exports.wantToUpdate = (Model) =>
asyncHandeller(async(req , res , next) => {
    const updatedBrand = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true});

    if(!updatedBrand){
        return next(new ApiError(`Can not update this Id : ${req.params.id}`) , 404);
    }
    res.status(200).json({data:updatedBrand})
});

exports.wantToCreate = (Model) =>
asyncHandeller(async(req , res)=>{
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
});

exports.wantToGetByID = (Model) =>
asyncHandeller( async(req , res , next) =>{
    const {id} = req.params ;
    const document = await Model.findById(id);
    if(!document){
        return next(new ApiError(`No featch for this Id ${id}`) , 404);
    }
    res.status(200).json({data : document });
});

exports.wantToGetAll = (Model,modelName='') =>
    asyncHandeller(async(req , res )=>{
    let filter ={};
    if(req.filterObject){
            filter = req.filterObject;
        }

    const documentCounts = await Model.countDocuments();
    const ApiFeatures = new  ApiFeaturesClass(Model.find(filter) , req.query)
        .pagination(documentCounts)
        .filter()
        .search(modelName)
        .limitFields()
        .sort();
    
        const {mongooseQuery,paginationResault } = ApiFeatures;
        const documents = await mongooseQuery;

    res.status(201).json({ results: documents.length , paginationResault , data: documents });
});
