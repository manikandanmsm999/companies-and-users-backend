const mongoose=require('mongoose');

const coordinateSchema=new mongoose.Schema({
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true,
    },
});

const coordinateModel=mongoose.model('coordinates',coordinateSchema);

module.exports=coordinateModel;