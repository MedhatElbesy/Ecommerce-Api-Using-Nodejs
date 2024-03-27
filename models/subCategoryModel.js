const mongoose = require('mongoose');


const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:[true, "subCategory Must be Unique"],
        minlength:[2,"Too Short name length"],
        maxlength:[32,"Too long name length"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true, " Sub Category Must be Belong to parent Category"]
    }
},{timestamps:true}
);

module.exports = mongoose.model("subCategory",subCategorySchema);