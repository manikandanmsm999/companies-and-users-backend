const mongoose=require('mongoose');
const coordinate=require('./coordinateSchema');

const companySchema=new mongoose.Schema({
    companyId:{
        type:String,
        required:true,
        unique:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    companyAddress:{
        type:String,
        required:true,
    },
    coordinates:{
        latitude:{
            type:Number,
            required:true,
        },
        longitude:{
            type:Number,
            required:true,
        },
    }
});

const companyModel=mongoose.model('companies',companySchema);

module.exports=companyModel;