const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    designation:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    active:{
        type:Boolean,
        required:true,
    }
});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;