const mongoose=require('mongoose');

const companyUserMappingSchema=new mongoose.Schema({
    CompanyId:{
        type:String,
        required:true,
    },
    UserId:{
        type:String,
        required:true,
    },
});

const companyUserMappingModel=mongoose.model('companyAndUser',companyUserMappingSchema);

module.exports=companyUserMappingModel;