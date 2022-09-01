const controller=require("../Controller/auth.controller")
const middleware=require("../Middleware/verifySign")
module.exports=(app)=>{
    app.post("/delivery/api/v1/user",[middleware.validsignup],controller.Signup)
    app.post("/delivery/api/v1/user/signin",[middleware.validSignin],controller.Signin)
}