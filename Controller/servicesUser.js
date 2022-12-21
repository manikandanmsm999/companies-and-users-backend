const userModel=require('../Model/userSchema');

exports.getUsers=async(req,res,next)=>{
    try{
        const userList=await userModel.find({},{__v:0,_id:0});
        if(userList.length>0){
            res.status(200).json(userList);
            res.end();
        }
        else{
            const err=new Error('No User is registered at this moment, Please try later');
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.getUsersById=async(req,res,next)=>{
    try{
        let userId=req.params.userId;
        const user=await userModel.find({UserId:userId},{__v:0,_id:0});
        if(user.length>0){
            res.status(200).json(user[0]);
            res.end();
        }
        else{
            const err=new Error(`No User is registered with the mentioned User Id  : ${userId} `);
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

exports.deactivateUser=async(req,res,next)=>{
    try{
        let userId=req.params.userId;
        const user=await userModel.findOneAndUpdate({UserId:userId},{Active:false});
        if(user!=null){
            res.status(200).json({"message":"User deactivated successfully"});
            res.end();
        }
        else{
            const err=new Error(`Unable to deactivate user as no user is registered with the mentioned User Id : ${userId} `);
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.deleteUser=async(req,res,next)=>{
    try{
        let userId=req.params.userId;
        const user=await userModel.deleteOne({UserId:userId});
        if(user.deletedCount!=0){
            res.status(200).json({"message":"User with Id "+userId+" Deleted Successfully"});
            res.end();
        }
        else{
            const err=new Error(`Unable to delete User is registered with the mentioned User Id : ${userId} `);
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};