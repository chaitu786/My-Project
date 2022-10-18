const { Router } = require("express")
const axios = require("axios")
const { Registration , Login } = require("../controller/User.controller")
const UserRouter = Router()

UserRouter.post("/register",async (req,res)=>{
    const {username,password,name,age,mail,mobile,role} = req.body
    const { message , status } = await Registration(username,password,name,age,mail,mobile,role)
    if (status === "error") {
        return res.status(404).send({ message, status });
    } else if (status === "invalid"){
        return res.status(400).send({ message, status });
    }
    else if (status === "exists") {
        return res.status(200).send({ message, status });
    }
    return res.status(200).send({message, status });
})

UserRouter.post("/login", async (req,res)=>{
    const {mobile,password} = req.body
    const { message , status } = await Login(mobile,password)
    if (status === "error") {
        return res.status(404).send({ message, status });
    } else if (status === "invalid"){
        return res.status(400).send({ message, status });
    }
    return res.status(200).send({message, status });
})

module.exports = { UserRouter }