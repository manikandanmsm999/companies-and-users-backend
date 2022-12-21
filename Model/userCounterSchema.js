const mongoose=require('mongoose');

const userCounterSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    count:{
        type:Number,
    },
});

const userCounterModel=mongoose.model('userCounter',userCounterSchema);

module.exports=userCounterModel;