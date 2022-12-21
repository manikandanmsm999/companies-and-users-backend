const mongoose=require('mongoose');

const userCounterSchema=new mongoose.Schema({
    Id:{
        type:String,
    },
    Count:{
        type:Number,
    },
});

const userCounterModel=mongoose.model('userCounter',userCounterSchema);

module.exports=userCounterModel;