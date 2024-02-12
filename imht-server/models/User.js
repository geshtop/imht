const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Company"
    },
    roles:{
        type: String,
        enum: ["User", "Admin"],
        required: true,
        default: "User"
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    deleted: {
        type: Boolean,
        required: true,
        default:false
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)