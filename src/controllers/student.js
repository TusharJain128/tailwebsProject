const studentModel = require('../model/studentModel')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

const addStudent = async function (req, res) {
    try {
        let data = req.body
        let { name, subject, marks } = data

        let uniqueName = await studentModel.findOne({name:name,isDeleted:false})
        if(uniqueName) return res.status(400).send({status:false,message:"Name is already exist"})

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
        let id = req.params.id
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
            filter.marks= marks
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
        let id = req.params.id
        
        let findStudent = await studentModel.findOne({_id: id, isDeleted:false})
        if(!findStudent) return res.status(404).send({status:false,message:"Student is not found"})

        res.status(200).send({status:true, message:findStudent})
    }
    catch (err) {
        res.status(500).send({status:false, message:err.message})
    }
}

const deleteStudent = async function (req, res) {
    try {
        let id = req.params.id

        let deletedData=await studentModel.findOneAndUpdate(
            {_id:id, isDeleted:false}, 
            { $set: { isDeleted: true } })

        if(!deletedData) return res.status(404).send({status:false,message:"student is not present in database"})
       
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