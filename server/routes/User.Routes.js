const { Router } = require("express")
const crypto = require("crypto")
const axios = require("axios")
const { Registration } = require("../controller/User.controller")
const UserRouter = Router()

UserRouter.post("/register",(req,res)=>{
    const {username,password,name,age,mail,mobile,role} = req.body
    const { message,status } = Registration(username,password,name,age,mail,mobile,role)
    console.log("message",message,status);
    if (status === "error") {
        return res.status(404).send({ message, status });
    } else if (status === "exists") {
        return res.status(200).send({ message, status });
    }
    return res.status(200).send({ message, status });
})

module.exports = { UserRouter }