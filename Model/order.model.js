const mongoose=require("mongoose")
const constants=require("../utils/order.utils")
const orderObj=new mongoose.Schema({
    customerId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    deliveryDate:{
        type:Date,
        // required:true,
        immutable:true
    },
    status:{
        type:String,
        default:constants.orderStatus.on_process,
        enum:[constants.orderStatus.canceled,constants.orderStatus.on_process,constants.orderStatus.success]
    },
    items :{
        type:String,
        required:true
    },
    totalCost:{
        type:Number,
        required:true
    },
    address :{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    }
})
module.exports=mongoose.model("Order",orderObj)