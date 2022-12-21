const mongoose=require('mongoose');

const coordinateSchema=new mongoose.Schema({
    Latitude:{
        type:Number,
        required:true,
    },
    Longitude:{
        type:Number,
        required:true,
    },
});

const coordinateModel=mongoose.model('coordinates',coordinateSchema);

module.exports=coordinateModel;