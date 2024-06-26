const multer  = require('multer');
const ApiError = require('../utils/apiError');



exports.uploadeSingleImage = (fieldName) => {
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
// exports.uploadCategoryImage = uploadeSingleImage;

    const multerStorage = multer.memoryStorage();
    const multerFilter = function(req , file , cb){
    if(file.mimetype.startsWith("image")){
        cb(null , true);
    }else{
        cb(new ApiError("only images allowed" , 400) , false);
    }
};

    const upload = multer({ storage: multerStorage ,fileFilter: multerFilter});
return upload.single(fieldName)
}