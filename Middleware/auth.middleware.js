const User=require("../Model/user.model")
const jwt=require("jsonwebtoken")
const config=require("../Config/Auth.config")

const validtoken=async(req,res,next)=>{
    const accesstoken=req.headers["x-access-token"]
    if(!accesstoken){
        return res.status(400).send("Access--Token Required")
    }
    jwt.verify(accesstoken,config.secret,(err,decoded)=>{
        if(err){
            return res.status(400).send("Token is Wrong")
        }
        req.user=decoded.id
        next()
    })
}





const validAuth={
    validtoken:validtoken
}

module.exports=validAuth