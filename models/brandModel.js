const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true , 'Brand Required'],
        unique:[true , 'Brand Must be Unique'],
        minlength:[3 , 'Too Short Brand Name'],
        maxlength:['32' , 'Too long Brand Name']
    },
    slug:{
        type : String,
        lowercase:true,
    },
    image:String 
},
{timestamps:true});

const BrandModel = mongoose.model('Brand',brandSchema);
module.exports = BrandModel;
