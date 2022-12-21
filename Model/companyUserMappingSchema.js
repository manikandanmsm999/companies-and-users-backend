const mongoose=require('mongoose');

const companyUserMappingSchema=new mongoose.Schema({
    companyId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
});

const companyUserMappingModel=mongoose.model('companyAndUser',companyUserMappingSchema);

module.exports=companyUserMappingModel;