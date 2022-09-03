const User=require("../Model/user.model")
const Order=require("../Model/order.model")
const constantsUser=require("../utils/user")
const constantOrder=require("../utils/order.utils")
const notification=require("../utils/notification.utils")
exports.create=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        const orderobj={
            customerId:user._id,
            deliveryDate:req.body.date,
            items:req.body.items,
            totalCost:req.body.totalcost,
            address:req.body.address
        }

        const newOrder=await Order.create(orderobj)
        console.log("This is NEW order",newOrder)
        if(newOrder){
            user.orderId.push(newOrder._id)
            await user.save()
        }
        console.log( '#### NEW ORDER CREATED BY',user.name,'####')
        res.status(201).send(orderobj)
        notification(`Ticket Created With: ${newOrder._id}`,"Customer Order",`${user.email},sgurvinder9263@gmail.com`,"Delivery App")

    }
    catch(err){
        console.log("There was an error in controller/order/create",err)
        res.status(500).send("there was an error from our side")
    }
}

exports.allOrder=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        const queryObj={}
        if(user.userType==constantsUser.userType.customer){
            if(user.orderId==null){
                return res.status(400).send("You have not ordered Anything yet Please Order")
            }
            queryObj["_id"]={$in:user.orderId}
        }
        console.log(queryObj)
        const orders=await Order.find(queryObj)
        res.status(200).send(orders)
    }
    catch(err){
        console.log("There was an error in contr/order/findallorder",err)
        return res.status(500).send("There was an error from our side ")
    }
}

exports.update=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        const order=await Order.findOne({"_id":req.params.id})
    
        order.items=req.body.items!==undefined?req.body.items:order.items
        order.totalCost=req.body.totalCost!==undefined?req.body.totalCost:order.totalCost
        order.address=req.body.address!==undefined?req.body.address:order.address

        const Updated=await order.save()
        res.status(200).send(Updated)
    }
    catch(err){
        console.log("controller/order/update",err)
        return res.status(500).send("There was an Error from our side")
    }
}
exports.deleteanorder=async(req,res)=>{
    try{
        const order=await Order.findOne({_id:req.params.id})
        const user=await User.findOne({userId:req.user})

        if(order.status==constantOrder.orderStatus.canceled || order.status==constantOrder.orderStatus.success){
            return res.status(400).send("The order cant be cancelled when it is delivered")
        }
        order.status=constantOrder.orderStatus.canceled
        await order.save()
        await user.save()
        res.status(200).send(order)

    }
    catch(err){
        console.log("controller/order/deleteanorder",err)
        res.status(500).send("there was an error from our side")
    }
}