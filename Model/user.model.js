const mongoose=require("mongoose")
const constants=require("../utils/user")
const userObj=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        lowerCase:true,
        unique:true
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
    },
    userType:{
        type:String,
        default:constants.userType.customer,
        enum:[constants.userType.admin,constants.userType.customer]
    },
    orderId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Orders"
    }
})

module.exports=mongoose.model("User",userObj)