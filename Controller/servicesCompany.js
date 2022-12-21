const companyModel=require('../Model/companySchema');
const userModel=require('../Model/userSchema');
const companyUserMappingModel=require('../Model/companyUserMappingSchema');
const companyCounterModel=require('../Model/companyCounterSchema');
const validator=require('../Utilities/validator');

exports.getCompanies=async(req,res,next)=>{
    try{
        const companyList=await companyModel.find({},{__v:0,_id:0});
        if(companyList.length>0){
            res.status(200).json(companyList);
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

exports.getCompanyById=async(req,res,next)=>{
    try{
        let companyId=req.params.companyId;
        const company=await companyModel.find({companyId:companyId},{__v:0,_id:0});
        if(company.length>0){
            res.status(200).json(company[0]);
            res.end();
        }
        else{
            const err=new Error(`No company is registered with the mentioned Company Id  : ${companyId} `);
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.createCompany=async(req,res,next)=>{
    try{
        let companyName=req.body.companyName;
        let companyAddress=req.body.companyAddress;
        let coordinates=req.body.coordinates;
        let id;
        let companyId;
        if(validator.validateName(companyName) && validator.validateAddress(companyAddress)){
            companyCounterModel.findOneAndUpdate(
                {id:"CompanyCount"},
                {"$inc":{"count":1}},
                {new:true},(error,count1)=>{
                    if(count1==null){
                        const counterData=new companyCounterModel({id:"CompanyCount",count:1})
                        counterData.save();
                        id=1;
                    }else{
                        id=count1.count;
                    }
                    companyId='cid'+id;
                    const company=new companyModel({
                        companyId:companyId,
                        companyName:companyName,
                        companyAddress:companyAddress,
                        coordinates:{
                            latitude:coordinates.latitude,
                            longitude:coordinates.longitude
                        }
                    })
                    const complete=company.save();
                    complete.then(
                        function(){
                            res.status(200).json({"message":"Company is created successfully"});
                        },
                        function(){
                            const err=new Error(`Unable to create company`);
                            err.status=400;
                            throw err;
                        }
                    )
                })
        }
        else if(!validator.validateName(companyName)){
            const err=new Error('Company Name should be of length between 1 till 20');
            err.status=401;
            throw err;
        }
        else if(!validator.validateAddress(companyAddress)){
            const err=new Error('Company Name should be of length between 15 till 200');
            err.status=401;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.updateCompany=async(req,res,next)=>{
    try{
        let companyId=req.body.companyId;
        const companyIdCount=await companyModel.find({companyId:companyId});
        if(companyIdCount.length>=1){
            let companyName=req.body.companyName;
            let companyAddress=req.body.companyAddress;
            let coordinates=req.body.coordinates;
            if(validator.nullAndUndefinedCheck(companyName)){
                if(validator.validateName(companyName)){
                    const update=await companyModel.findOneAndUpdate({companyId:companyId},{companyName:companyName},{new:true});
                    if(update==null){
                        const err=new Error(`Unable to update company`);
                        err.status=400;
                        throw err;
                    }
                }
                else{
                    const err=new Error('Company Name should be of length between 1 till 20');
                    err.status=401;
                    throw err;
                }
            }
            if(validator.nullAndUndefinedCheck(companyAddress)){
                if(validator.validateAddress(companyAddress)){
                    const update=await companyModel.findOneAndUpdate({companyId:companyId},{companyAddress:companyAddress},{new:true});
                    if(update==null){
                        const err=new Error(`Unable to update company.`);
                        err.status=400;
                        throw err;
                    }
                }
                else{
                    const err=new Error('Company Name should be of length between 15 till 200');
                    err.status=401;
                    throw err;
                }
            }
            if(coordinates!=null && coordinates!=undefined && coordinates.latitude!=null && coordinates.latitude!=undefined){
                const find=await companyModel.findOne({companyId:companyId});
                const update=await companyModel.findOneAndUpdate(
                    {companyId:companyId},
                    {coordinates:{latitude:coordinates.latitude,longitude:find.coordinates.longitude}},
                    {new:true});
                if(update==null){
                    const err=new Error(`Unable to update company`);
                    err.status=400;
                    throw err;
                }

            }
            if(coordinates!=null && coordinates!=undefined && coordinates.longitude!=null && coordinates.longitude!=undefined){
                const find=await companyModel.findOne({companyId:companyId});
                const update=await companyModel.findOneAndUpdate(
                    {companyId:companyId},
                    {coordinates:{latitude:find.coordinates.latitude,longitude:coordinates.longitude}},
                    {new:true});
                if(update==null){
                    const err=new Error(`Unable to update company`);
                    err.status=400;
                    throw err;
                }

            }

            res.status(200).json({"message":"Company updated successfully"});
        }
        else{
            const err=new Error('No company is available with the mentioned id');
            err.status=401;
            throw err;

        }
    }
    catch(err){
        next(err);
    }
};

exports.deleteCompany=async(req,res,next)=>{
    try{
        let companyId=req.params.companyId;
        const company=await companyModel.deleteOne({companyId:companyId});
        if(company.deletedCount!=0){
            res.status(200).json({"message":"Company with Id "+companyId+" Deleted Successfully"});
            res.end();
        }
        else{
            const err=new Error(`Unable to delete company is registered with the mentioned Company Id : ${companyId} `);
            err.status=400;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
};

exports.addUserToCompany=async(req,res,next)=>{
    try{
        let companyId=req.body.companyId;
        let userId=req.body.userId;
        const companyCount=await companyModel.find({companyId:companyId});
        const userCount=await userModel.find({userId:userId});

        if(companyCount.length<=0){
            const err=new Error(`No company is registered with the mentioned Company Id : ${companyId} `);
            err.status=400;
            throw err;
        }
        if(userCount.length<=0){
            const err=new Error(`No user is registered with the mentioned Company Id : ${userId} `);
            err.status=400;
            throw err;
        }

        const insert=new companyUserMappingModel({
            companyId:companyId,
            userId:userId
        })
        const complete=insert.save();
        complete.then(
            function(){
                res.status(200).json({"message":"User added to the company"});
            },
            function(){
                const err=new Error(`Unable to add user to the company`);
                err.status=400;
                throw err;
            }
        )

    }
    catch(err){
        next(err);
    }
};

exports.removeUserFromCompany=async(req,res,next)=>{
    try{
        let companyId=req.body.companyId;
        let userId=req.body.userId;
        const companyCount=await companyModel.find({companyId:companyId});
        const userCount=await userModel.find({userId:userId});

        if(companyCount.length<=0){
            const err=new Error(`No company is registered with the mentioned Company Id : ${companyId} `);
            err.status=400;
            throw err;
        }
        if(userCount.length<=0){
            const err=new Error(`No user is registered with the mentioned Company Id : ${userId} `);
            err.status=400;
            throw err;
        }

        const deleteAll=companyUserMappingModel.deleteMany({$and:[{companyId:companyId},{userId:userId}]});
        deleteAll.then(
            function(){
                res.status(200).json({"message":"User deleted from the company"});
            },
            function(){
                const err=new Error(`Unable to delete user from the company`);
                err.status=400;
                throw err;
            }
        )

    }
    catch(err){
        next(err);
    }
};