const controller=require("../Controller/Order")
const authmiddleware=require("../Middleware/auth.middleware")
const ordermiddleware=require("../Middleware/order.middleware")

module.exports=(app)=>{
    app.post("/delivery/api/v1/orders",[authmiddleware.validtoken,ordermiddleware.validcreateorder],controller.create)
    app.get("/delivery/api/v1/allorders/orders",[authmiddleware.validtoken],controller.allOrder)
    app.put("/delivery/api/v1/updateorder/:id",[authmiddleware.validtoken,ordermiddleware.updateordervalid],controller.update)
    app.put("/delivery/api/v1/anorder/:id",[authmiddleware.validtoken,ordermiddleware.deleteTheorder],controller.deleteanorder)
}