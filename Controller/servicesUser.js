const userModel=require('../Model/userSchema');
const userCounterModel=require('../Model/userCounterSchema');
const companyUserMappingModel=require('../Model/companyUserMappingSchema');
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
        const user=await userModel.find({userId:userId},{__v:0,_id:0});
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
            const emailDuplicateCheker=await userModel.find({email:email});
            if(emailDuplicateCheker.length<=0){
                userCounterModel.findOneAndUpdate(
                    {id:"UserCount"},
                    {"$inc":{"count":1}},
                    {new:true},(error,count1)=>{
                        if(count1==null){
                            const counterData=new userCounterModel({id:"UserCount",count:1})
                            counterData.save();
                            id=1;
                        }else{
                            id=count1.count;
                        }
                        userId='uid'+id;
                        const user=new userModel({
                            userId:userId,
                            firstName:firstName,
                            lastName:lastName,
                            email:email,
                            designation:designation,
                            dob:dob,
                            active:true
                        })
                        const complete=user.save();
                        console.log(user);
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
                const err=new Error('User already exists with this email id');
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
            const err=new Error('Designation should be of length between 2 till 20');
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

exports.updateUser=async(req,res,next)=>{
    try{
        let userId=req.body.userId;
        let user={};
        const userIdCount=await userModel.find({userId:userId});
        if(userIdCount.length>=1){
            user.userId=userId;
            let firstName=req.body.firstName;
            let lastName=req.body.lastName;
            let email=req.body.email;
            let designation=req.body.designation;
            let dob=req.body.dob;
            if(validator.nullAndUndefinedCheck(firstName)){
                if(validator.validateName(firstName)){
                    user.firstName=firstName;
                }
                else{
                    const err=new Error('First Name should be of length between 1 till 20');
                    err.status=401;
                    throw err;
                }
            }
            if(validator.nullAndUndefinedCheck(lastName)){
                if(validator.validateName(lastName)){
                    user.lastName=lastName;
                }
                else{
                    const err=new Error('Last Name should be of length between 1 till 20');
                    err.status=401;
                    throw err;
                }
            }
            if(validator.nullAndUndefinedCheck(email)){
                if(validator.validateEmail(email)){
                    const emailDuplicateCheker=await userModel.find({email:email});
                    if(emailDuplicateCheker.length<=0){
                        user.email=email;
                    }
                    else{
                        const err=new Error('User already exists with this email id');
                        err.status=401;
                        throw err;
                    }
                }
                else{
                    const err=new Error('Email entered is not in required format');
                    err.status=401;
                    throw err;
                }
            }
            if(validator.nullAndUndefinedCheck(designation)){
                if(validator.validateDesignation(designation)){
                    user.designation=designation;
                }
                else{
                    const err=new Error('Designation should be of length between 2 till 20');
                    err.status=401;
                    throw err;
                }
            }
            if(validator.nullAndUndefinedCheck(dob)){
                dob=new Date(dob);
                if(validator.validateDOB(dob)){
                    user.dob=dob;
                }
                else{
                    const err=new Error('Date of birth should be less than todays current date');
                    err.status=401;
                    throw err;
                }
            }
            console.log(user);
            const update=await userModel.findOneAndUpdate({userId:userId},user,{new:true});
            console.log(update);
            if(update==null){
                const err=new Error(`Unable to update user`);
                err.status=400;
                throw err;
            }
            res.status(200).json({"message":"User updated successfully"});
        }
        else{
            const err=new Error('No User is available with the mentioned id');
            err.status=401;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.deactivateUser=async(req,res,next)=>{
    try{
        let userId=req.params.userId;
        const user=await userModel.findOneAndUpdate({userId:userId},{active:false});
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
        const user=await userModel.deleteOne({userId:userId});
        if(user.deletedCount!=0){
            const deleteAll=companyUserMappingModel.deleteMany({userId:userId});
            deleteAll.then(
                function(){
                    res.status(200).json({"message":"User with Id "+userId+" Deleted Successfully"});
                    res.end();
                },
                function(){
                    const err=new Error(`Unable to delete user from the company user mapping`);
                    err.status=400;
                    throw err;
                }
            )
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