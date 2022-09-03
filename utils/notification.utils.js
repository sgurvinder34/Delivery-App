const Client=require("node-rest-client").Client
const client=new Client()

module.exports=(subject,content,recepient,requester)=>{
    const reqbody={
        subject:subject,
        recepientEmail:recepient,
        content:content,
        requester:requester
    }
    const reqHeader={
        "Content-Type":"application/json"
    }
    const args={
        data:reqbody,
        Headers:reqHeader
    }

    try{
        client.post("http://localhost:9090/notiserv/api/v1/notifications",args,(data,res)=>{
            console.log("Request sent")
            console.log(data)
        })
    }
    catch(err){
        console.log("utils/notification",err)
    }
}