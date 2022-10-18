const { FarmerModel, AdminModel } = require("../models/User.Model")
const crypto = require("crypto");
const { log } = require("console");

const Registration = async (username,password,name,age,mail,mobile,role) =>{
    console.log(mobile.toString().length,"role")
    if(mobile.toString().length !== 10){
        return { message: "invalid mobile number", status: "invalid" };
    }
    
    try {
        let Farmer = await FarmerModel.find({mobile})
        let Admin = await AdminModel.find({mobile})
        if(Farmer.length!=0){
            console.log("qwer",Farmer);
            return { message: "user already exists as a farmer", status: "exists" };
        }
        else if(Admin.length!=0){
            console.log("qweree");
            return { message: "user already exists as a seller/admin", status: "exists" };
        }
       else{
        const hash=crypto
        .pbkdf2Sync(mobile.toString(), "SECRETESAL1234", 60, 64, "sha256")
        .toString("hex")
        let newFarmerData ={
            username,
            password,
            name,
            age,
            mail,
            mobile,
            role,
            hash,
            data:[]
        }
        console.log(newFarmerData,"newFarmerData");
        if(role == "Farmer"){
            console.log(1,2,3);
            const createUser = new FarmerModel(newFarmerData)
            createUser.save()
            return { message: "user created", status: "success" };
        }
        else{
            console.log(1,2,3,4,5,6);
            const createUser = new AdminModel(newFarmerData)
            createUser.save()
            return { message: "user created", status: "success" };
        }
       }
    } catch (error) {
        return { message: "something went wrong", status: "error" };
    }
}

const Login = async (mobile,password) =>{
    if(mobile.toString().length !== 10){
        return { message: "invalid mobile number", status: "invalid" };
    }
    try {
        const hash=crypto
        .pbkdf2Sync(mobile.toString(), "SECRETESAL1234", 60, 64, "sha256")
        .toString("hex")
        log(hash,hash)
        let Farmer = await FarmerModel.find({hash})
        let Admin = await AdminModel.find({hash})
        if(Farmer.length!=0){
            console.log("qwer",Farmer);
            return { message: "farmer login success", status: "success" };
        }
        else if(Admin.length!=0){
            console.log("qweree");
            return { message: "seller/admin login success", status: "success" };
        }
        else{
            return { message: "invalid credentionals", status: "invalid" };
        }
        
    } catch (error) {
        return { message: "something went wrong", status: "error",  };
    }
}

module.exports={ Registration, Login }