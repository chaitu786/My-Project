const { Schema, model } = require("mongoose")

const FarmerSchema = new Schema(
    {
        name:String,
        username : String,
        password : String,
        mail : String,
        mobile : Number,
        hash:String,
        data : [
            { 
                productId: Schema.Types.ObjectId
            }
        ],
        role:{
            type:String,
            enum:["Farmer","Admin"]
        }
    },
    { collection : "farmerData" }
)

const AdminSchema = new Schema(
    {
        name:String,
        username : String,
        password : String,
        mail : String,
        mobile : Number,
        hash:String,
        data : [
            { 
                productId: Schema.Types.ObjectId
            }
        ],
        role:{
            type:String,
            enum:["Farmer","Admin"]
        }
    },
    { collection : "adminData" }
)

const FarmerModel = model( "FarmerModel", FarmerSchema , "farmerData")
const AdminModel = model( "AdminModel", AdminSchema , "adminData")

module.exports = { FarmerModel, AdminModel };