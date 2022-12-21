const mongoose=require('mongoose');

const companyCounterSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    count:{
        type:Number,
    },
});

const companyCounterModel=mongoose.model('companyCounter',companyCounterSchema);

module.exports=companyCounterModel;