const companyModel=require('../Model/companySchema');
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
    let companyId=req.params.companyId;
    try{
        const company=await companyModel.find({CompanyId:companyId},{__v:0,_id:0});
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

exports.createCompany=async(req,res,next)=>{};

exports.updateCompany=async(req,res,next)=>{};

exports.deleteCompany=async(req,res,next)=>{
    let companyId=req.params.companyId;
    try{
        const company=await companyModel.deleteOne({CompanyId:companyId});
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