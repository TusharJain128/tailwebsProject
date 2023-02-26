const mongoose = require('mongoose')

const studentSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    name: {
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    marks:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("Students",studentSchema)