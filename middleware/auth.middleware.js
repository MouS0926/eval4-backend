const { BlacklistModel } = require("../model/blacklistModel")
const jwt=require("jsonwebtoken")
const auth=async (req,res,next)=>{

try {
    const token=req.headers.authorization
    if(token){
        let isblacklisted=await BlacklistModel.findOne({token})
        if(isblacklisted)
        {
            return res.status(200).send({"msg":"please login again"})
        }

        const decoded = jwt.verify(token, 'moumita');
        // console.log(decoded);

        if(decoded){
            req.body.userid=decoded.userid
            req.body.username=decoded.name
            console.log(decoded);
            next()
        }
        else{
            res.status(200).send({"msg":"wrong credential"})
        }


    }
    else{
        res.status(200).send({"msg":"token needed"})
    }
    
} catch (error) {
    res.status(400).send({"err":error})
    console.log(error);
}

}

module.exports={
    auth
}