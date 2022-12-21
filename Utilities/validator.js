
exports.validateName=function(name){
    if(name.length >=1 && name.length<=20){
        return true;
    }
    return false;
};

exports.validateAddress=function(address){
    if(address.length >=15 && address.length<=200){
        return true;
    }
    return false;
};

exports.validateDesignation=function(designation){
    if(designation.length >=2 && designation.length<=20){
        return true;
    }
    return false;
};

exports.validateDOB=function(dateOfBirth){
    const dob=new Date(dateOfBirth);
    const todayDate=new Date();
    if(todayDate.getTime()>dob.getTime()){
        return true;
    }
    return false;
};

exports.validateEmail=function(email){
    const pattern=/^[a-z]+[A-Za-z0-9.-_]+@[a-z]+.[a-z]{2,}$/;
    if(pattern.test(email)){
        return true;
    }
    return false;
};

exports.nullAndUndefinedCheck=function(value){
    if(value!=null && value!=undefined){
        return true;
    }
    return false;
};

