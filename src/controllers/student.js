const studentModel = require('../model/studentModel')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

const addStudent = async function (req, res) {
    try {
        let data = req.body
        let { name, subject, marks } = data

        data.userId = req.userId

        let savedData = await studentModel.create(data)

        res.status(201).send({ status: true, message: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const updateStudent = async function (req, res) {
    try {
        let id = req.params
        let data = req.body
        let { name, subject, marks} = data

        let filter = {isDeleted:false}

        if(name){
            let checkName = await studentModel.findOne({name:name, isDeleted:false})
            if(checkName) return res.status(400).send({status:false, message:"Name is already exist"})
            
            filter.name= name
        }

        if(subject){
            filter.subject=subject
        }

        if(marks){
            filter.marks= subject
        }

        let updateData= await studentModel.findByIdAndUpdate(id, filter, {new:true})
        res.status(200).send({ status: true, message: updateData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const getStudent = async function(req,res){
    try {
        let id = req.params

        let findStudent = studentModel.findOne({_id: id, isDeleted:false})
        res.status(200).send({status:true, message:findStudent})
    }
    catch (err) {
        res.status(500).send({status:false, message:err.message})
    }
}

const deleteStudent = async function (req, res) {
    try {
        let id = req.params

        await studentModel.findByIdAndUpdate(id, { $set: { isDeleted: false } })
        res.status(200).send({ status: true, message: "Deleted Successfully" })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.addStudent = addStudent
module.exports.updateStudent = updateStudent
module.exports.getStudent= getStudent
module.exports.deleteStudent = deleteStudent