import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a UserName"],
        unique: true,
    },
    email: {
        type: String,
        require: [true, "please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "please provide a email"],

    },
    isVarifid: {
        type: Boolean,
        default: false,

    },
    isAdmin: {
        type: Boolean,
        default: false,

    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: Date,



});


const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;