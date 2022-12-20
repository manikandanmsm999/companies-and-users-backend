const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    UserId:{
        type:String,
        required:true,
        unique:true,
    },
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Designation:{
        type:String,
        required:true,
    },
    DateOfBirth:{
        type:Date,
        required:true,
    },
    Active:{
        type:Boolean,
        required:true,
    }
});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;