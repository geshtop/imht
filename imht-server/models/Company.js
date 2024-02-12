const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    type:{
        type:String,
        enum:['OP','OM','AM','CM', 'SYS'],
        required: true
    },
    active:{
        type: Boolean,
        default: true,
        required: true
    },
    image:{
        type: String,
    }

},{
    timestamps: true
})

module.exports = mongoose.model("Company", companySchema)