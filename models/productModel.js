const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
            minlength:[3,'Too short title'],
            maxlength:[100,'Too Long title'],
        },
        slug:{
            type:String,
            required:true,
            lowercase:true
        },
        description:{
            type:String,
            required:true,
            trim:true,
            minlength:[20,'Too short discription'],
        },
        quantity:{
            type:Number,
            required:[true , 'quility is required']
        },
        sold:{
            type:Number,
            default:0
        },
        price:{
            type:Number,
            required:[true,'price required'],
            trim:true,
            max:[200000,'Too long price']
        },
        priceAfterDiscount:{
            type:Number
        },
        imageCover:{
            type:String,
            required:[true , 'image cover is required']
        },
        category:{
            type:mongoose.Schema.ObjectId,
            ref:'Category',
            required:[true , 'Product must be belong to category']
        },
        subcategory:[{
            type:mongoose.Schema.ObjectId,
            ref:'subCategory'
        }],
        brand:{
            type:mongoose.Schema.ObjectId,
            ref:'Brand'
        },
        ratingsAvarage:{
            type:Number,
            min:[1, "Rating must be above or equal one"],
            max:[5, "Rating must be below or equal five"],
        },
        ratingsQuantity:{
            type:Number,
            default:0
        },
        colors:[String],
        images:[String],
    },
    {
        timestamp:true
    }
    );
    
module.exports = mongoose.model('Product' , productSchema );