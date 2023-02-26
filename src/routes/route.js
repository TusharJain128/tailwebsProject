const express = require('express')
const route= express.Router()
const {loginUser, getStudents} = require('../controllers/user')
const {addStudent, deleteStudent, updateStudent, getStudent} = require('../controllers/student')
const {authentication, autherisation} = require('../middleware/middleware')

route.get('/test',(req,res)=>{
    res.send("hello I am a testing api")
})

route.post('/loginUser',loginUser)
route.get('/getStudents',authentication,autherisation,getStudents)

route.post('/createStudent',authentication,autherisation,addStudent)
route.get('/getStudent/:id',authentication,autherisation,getStudent)
route.put('/updateStudent/:id',authentication,autherisation,updateStudent)
route.delete('/deleteStudent/:id',authentication,autherisation,deleteStudent)

module.exports = route