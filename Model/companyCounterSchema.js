const mongoose=require('mongoose');

const companyCounterSchema=new mongoose.Schema({
    Id:{
        type:String,
    },
    Count:{
        type:Number,
    },
});

const companyCounterModel=mongoose.model('companyCounter',companyCounterSchema);

module.exports=companyCounterModel;