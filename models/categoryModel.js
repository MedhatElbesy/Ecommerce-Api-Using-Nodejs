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


categorySchema.post('init',(doc) => {
    //return image url + image name
    if(doc.image){
        const imageUrl = `${process.env.BASE_URL}/caregories/${doc.image}`;
        doc.image = imageUrl;
    }
});

const CategoryModel = mongoose.model('Category',categorySchema);
module.exports = CategoryModel;
