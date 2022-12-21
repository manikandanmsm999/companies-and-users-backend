const userModel=require('../Model/userSchema');

exports.getUsers=async(req,res,next)=>{
    try{
        const userList=await userModel.find({},{__v:0,_id:0});
        if(userList.length>0){
            res.status(200).json(userList);
            res.end();
        }
        else{
            const err=new Error('No company is registered at this moment, Please try later');
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.getUsersById=async(req,res,next)=>{
    let userId=req.params.userId;
    try{
        const user=await userModel.find({UserId:userId},{__v:0,_id:0});
        if(user.length>0){
            res.status(200).json(user[0]);
            res.end();
        }
        else{
            const err=new Error(`No company is registered with the mentioned Company Id  : ${userId} `);
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.createUser=async(req,res,next)=>{};

exports.updateUser=async(req,res,next)=>{};

exports.deactivateUser=async(req,res,next)=>{};

exports.deleteUser=async(req,res,next)=>{
    let userId=req.params.userId;
    try{
        const user=await userModel.deleteOne({UserId:userId});
        if(user.deletedCount!=0){
            res.status(200).json({"message":"Company with Id "+userId+" Deleted Successfully"});
            res.end();
        }
        else{
            const err=new Error(`Unable to delete company is registered with the mentioned Company Id : ${userId} `);
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};