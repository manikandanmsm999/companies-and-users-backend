const mongoose=require('mongoose');

const mapSchema=new mongoose.Schema({
    address:{
        type:String,
        required:true,
        unique:true,
    },
    coordinates:{
        latitude:{
            type:Number,
            required:true,
        },
        longitude:{
            type:Number,
            required:true,
        },
    }
});

const mapModel=mongoose.model('map',mapSchema);

module.exports=mapModel;