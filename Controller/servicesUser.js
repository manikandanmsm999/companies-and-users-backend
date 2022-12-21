const userModel=require('../Model/userSchema');
const userCounterModel=require('../Model/userCounterSchema');
const validator=require('../Utilities/validator');

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

exports.createUser=async(req,res,next)=>{
    try{
        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let email=req.body.email;
        let designation=req.body.designation;
        let dob=new Date(req.body.dob);
        let id;
        let userId;
        if(validator.validateName(firstName) && validator.validateName(lastName) && validator.validateEmail(email) && validator.validateDesignation(designation) && validator.validateDOB(dob)){
            const emailDuplicateCheker=await userModel.find({Email:email});
            if(emailDuplicateCheker.length<=0){
                userCounterModel.findOneAndUpdate(
                    {Id:"UserCount"},
                    {"$inc":{"Count":1}},
                    {new:true},(error,count)=>{
                        if(count==null){
                            const counterData=new userCounterModel({Id:"UserCount",Count:1})
                            counterData.save();
                            id=1;
                        }else{
                            id=count.Count;
                        }
                        userId='uid'+id;
                        const user=new userModel({
                            UserId:userId,
                            FirstName:firstName,
                            LastName:lastName,
                            Email:email,
                            Designation:designation,
                            DateOfBirth:dob,
                            Active:true
                        })
                        const complete=user.save();
                        complete.then(
                            function(){
                                res.status(200).json({"message":"User is created successfully"});
                            },
                            function(){
                                const err=new Error(`Unable to create user`);
                                err.status=400;
                                throw err;
                            }
                        )
                    });
            }
            else{
                const err=new Error('User exists with this email id');
                err.status=401;
                throw err;
            }
        }
        else if(!validator.validateName(firstName)){
            const err=new Error('First Name should be of length between 1 till 20');
            err.status=401;
            throw err;
        }
        else if(!validator.validateName(lastName)){
            const err=new Error('Last Name should be of length between 1 till 20');
            err.status=401;
            throw err;
        }
        else if(!validator.validateEmail(email)){
            const err=new Error('Email entered is not on required format');
            err.status=401;
            throw err;
        }
        else if(!validator.validateDesignation(designation)){
            const err=new Error('Last Name should be of length between 2 till 20');
            err.status=401;
            throw err;
        }
        else if(!validator.validateDOB(dob)){
            const err=new Error('Date of birth should be less than todays current date');
            err.status=401;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

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