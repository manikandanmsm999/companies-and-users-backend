const mongoose=require('mongoose');

const companyUserMappingSchema=new mongoose.Schema({
    Company:{
        type:String,
        required:true,
    },
    User:{
        type:String,
        required:true,
    },
});

const companyUserMappingModel=mongoose.model('companyAndUser',companyUserMappingSchema);

module.exports=companyUserMappingModel;