const mongoose = require('mongoose')

const studentSchema= new mongoose.Schema({
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