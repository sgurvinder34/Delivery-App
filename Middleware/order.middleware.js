const Order=require("../Model/order.model")
const constants=require("../utils/order.utils")
const validcreateorder=(req,res,next)=>{
    // if(!req.body.deliveryDate){
    //     return res.status(400).send("The delivery date is Required")
    // }
    if(!req.body.items){
        return res.status(400).send("Items Required")
    }
    if(!req.body.totalcost){
        return res.status(400).send("TotalPrice Required")
    }
    if(!req.body.address){
        return res.status(400).send("Address Required")
    }
    next()
}
const updateordervalid=async(req,res,next)=>{
    const order=await Order.findOne({_id:req.params.id})
    console.log(order.status)
    if(order.status==constants.orderStatus.canceled || order.status==constants.orderStatus.success){
        return res.status(400).send("The order cant be updated when it is Cancelled")
    }
    next()
}
const deleteTheorder=async(req,res,next)=>{
    const order=await Order.findOne({_id:req.params.id})
    if(order.status==constants.orderStatus.canceled || order.status==constants.orderStatus.success){
        return res.status(400).send("The order cant be cancelled when it is delivered")
    }
    next()
}

const validOrder={
    validcreateorder:validcreateorder,
    updateordervalid:updateordervalid,
    deleteTheorder:deleteTheorder
}

module.exports=validOrder