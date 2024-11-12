import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name'],
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    avatar:{
        type: String, // image url
        default : ""
    },
    mobile :{
        type: Number,
        default : null
    },
    refreshToken :{
        type: String,
        default : ""
    },
    verifyEmail :{
        type: Boolean,
        default : false
    },
    lastLoginDate :{
        type: Date,
        default : ""
    },
    status:{
        type: String,
        enum : ["Active", "Inactive", "Suspended"],
        default : "Active"
    },
    addressDetails :[
        {
            type : mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ],
    shoppingCart :[
        {
            type : mongoose.Schema.ObjectId,
            ref: 'cartProduct'
        }
    ],
    orderHistory :[
        {
            type : mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ],
    forgotPasswordOtp :{
        type: String,
        default : null
    },
    forgotPasswordExpiry:{
        type: Date,
        default : ""
    },
    role :{
        type: String,
        enum : ["ADMIN", "USER"],
        default : "USER"
    }
},{timestamps: true});

 const UserModel= mongoose.model("User", userSchema)
 export default UserModel