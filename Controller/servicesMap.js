const mapModel=require('../Model/mapSchema');

exports.getCoordinates=async(req,res,next)=>{
    try{
        let address=req.params.address;
        let addresses=address.split(",");
        for(let i=0;i<addresses.length;i++){
            addresses[i]=addresses[i].trim();
            addresses[i]=addresses[i].toLowerCase();
            const mapData=await mapModel.findOne({address:addresses[i]});
            if(mapData!=null){
                res.status(200).json(mapData).end();
                return;
            }
        }
        res.status(200).json({"address":"none","message":" address not found"});
        
    }
    catch(err){
        next(err);
    }
}

exports.mapInvalid=async(req,res,next)=>{
    try{
        res.status(200).json({"address":"none","message":" address not found"});
    }
    catch(err){
        next(err);
    }
}