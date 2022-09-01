const controller=require("../Controller/user.controller")
const middleware=require("../Middleware/auth.middleware")
module.exports=(app)=>{
    app.get("/delivery/api/v1/allorder",[middleware.validtoken],controller.getallorders)
    app.delete("/delivery/api/v1/deleteuser",[middleware.validtoken],controller.deleteuser)
}