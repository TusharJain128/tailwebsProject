const studentModel= require('../model/studentModel')
const userModel= require('../model/userModel')
const jwt = require('jsonwebtoken')

const loginUser = async function(req,res){
    try{
        let {email, password}= req.body
        let checkauth = await userModel.findOne({email:email})
        if(!checkauth){
             checkauth= await userModel.create(req.body)
        }
        else{
            if(checkauth.password != password){
                return res.status(401).send({status:false, message:"Please enter correct password"})
            }
        }
        let token = jwt.sign({_id: checkauth._id}, "userSecretKey")
        res.status(200).send({status:true, message:token})
    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const getStudents = async function(req,res){
    try {
       let studentsData = await studentModel.findOne({userId:req._id, isDeleted:false})
       
       res.status(200).send({status:true, message:studentsData})
    } 
    catch (err) {
        res.status(500).send({status:false, message:err.message})
    }
}

module.exports.loginUser= loginUser
module.exports.getStudents= getStudents