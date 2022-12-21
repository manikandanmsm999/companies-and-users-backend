
exports.invalid=async(req,res,next)=>{
    res.json({"Hi":"request reached"});
    res.end();
};