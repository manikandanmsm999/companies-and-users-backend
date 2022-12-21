const mongoose=require('mongoose');
const coordinate=require('./coordinateSchema');

const companySchema=new mongoose.Schema({
    CompanyId:{
        type:String,
        required:true,
        unique:true,
    },
    CompanyName:{
        type:String,
        required:true,
    },
    CompanyAddress:{
        type:String,
        required:true,
    },
    Coordinates:{
        Latitude:{
            type:Number,
            required:true,
        },
        Longitude:{
            type:Number,
            required:true,
        },
    }
});

const companyModel=mongoose.model('companies',companySchema);

module.exports=companyModel;