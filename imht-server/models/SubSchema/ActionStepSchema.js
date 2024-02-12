const mongoose = require("mongoose")

const ActionStepSchema = new mongoose.Schema({
    attachFiles: [{
        file: {type:String},
        title: String,
        description:String
    }],
    hasText:{
        type: Boolean,
        required: true
    },
    textLabel: {
        type: String
    },
    textRequired:{
        type:Boolean,
    },
    hasSingleFile: {
         type: Boolean
    },
    singleFileLabel: {
        type: String
    },
    singleFileRequired: {
        type: Boolean
    },
    hasMultiFiles:{
        type: Boolean
    },
    multiFilesLabel: {
        type: String
    },
    minimumFilesRequired: {
        type: Number
    },
    maximumFilesAllowd: {
        type: Number
    },
    filesType: {
        type: [String],
        enum: ["pdf", "jpg", "xls", "txt"]
    },
    relatedList:{
        type: [{
            name: {
                type: String,
                required: true
            },
            allowText: Boolean,
            textLabel: String
        }]
    }


},{timestamps: true})

module.exports = ActionStepSchema