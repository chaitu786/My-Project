const { Schema, model } = require("mongoose")

const FarmerSchema = new Schema(
    {
        name:String,
        username : String,
        password : String,
        mail : String,
        mobile : Number,
        Problems : [
            {  }
        ]
    }
)