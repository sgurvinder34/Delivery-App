const User=require("../Model/user.model")


exports.getallorders=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        res.status(200).send({
            "OrdersAre":user.orderId
        })
    }
    catch(err){
        console.log("controller/user/getallorder",err)
        res.status(500).send("There was an error from our side ")
    }


}
exports.deleteuser=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        await user.deleteOne({_id:user._id})
        res.status(200).send("The user deleted successfully")
    }
    catch(err){
        console.log("controller/user/delete",err)
        res.status(500).send("There was an error from our side")
    }
    
}