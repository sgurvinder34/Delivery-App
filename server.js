const express = require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser = require("body-parser")
const User=require("./Model/user.model")
const serverConfig=require("./Config/server.config")
const dbConfig = require("./Config/db.config")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    init();
});
async function init(){
    try{
        await db.db.dropCollection("users")
    }
    catch(err){
        console.log(err)
    }
}

require("./Routes/auth.routes")(app)
require("./Routes/order.route")(app)
require("./Routes/user.route")(app)
module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});
