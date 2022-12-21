
exports.invalid=async(req,res,next)=>{
    try{
        const err=new Error('Invalid path');
        err.status(404);
        throw err;
    }
    catch(err){
        next(err);
    }
};