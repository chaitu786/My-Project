const { FarmerModel, AdminModel } = require("../models/User.Model")

const Registration = async (username,password,name,age,mail,mobile,role) =>{
    console.log(role,"role")
    let Farmer = await FarmerModel.find({mobile})
    let Admin = await AdminModel.find({mobile})
    try {
        if(Farmer.length!=0){
            console.log("qwer",Farmer);
            return { message: "user already exists as a farmer", status: "exists" };
        }
        else if(Admin.length!=0){
            console.log("qweree");
            return { message: "user already exists as a seller/admin", status: "exists" };
        }
       else{
        let newFarmerData ={
            username,
            password,
            name,
            age,
            mail,
            mobile,
            role,
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

module.exports={ Registration }