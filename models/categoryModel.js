const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true , 'Category Required'],
        unique:[true , 'category Must be Unique'],
        minlength:[3 , 'Too Short Category Name'],
        maxlength:['32' , 'Too long Category Name']
    },
    slug:{
        type : String,
        lowercase:true,
    },
    image:String 
},
{timestamps:true});

const CategoryModel = mongoose.model('Category',categorySchema);
module.exports = CategoryModel;
