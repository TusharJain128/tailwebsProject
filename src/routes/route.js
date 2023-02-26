const express = require('express')
const route= express.Router()
const {loginUser, getStudents} = require('../controllers/user')
const {addStudent, deleteStudent, updateStudent, getStudent} = require('../controllers/student')
const {autherisation} = require('../middleware/middleware')

route.get('/test',(req,res)=>{
    res.send("hello I am a testing api")
})

route.post('/loginUser',loginUser)
route.get('/getStudents',autherisation,getStudents)

route.post('/createStudent',autherisation,addStudent)
route.get('/getStudent',autherisation,getStudent)
route.put('/updateStudent',autherisation,updateStudent)
route.delete('/deleteStudent',autherisation,deleteStudent)

module.exports = route