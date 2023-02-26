const express = require('express')
const route= express.Router()
const {loginUser} = require('../controllers/user')
const {addStudent} = require('../controllers/student')
const {autherisation} = require('../middleware/middleware')

route.get('/test',(req,res)=>{
    res.send("hello I am a testing api")
})

route.post('/loginUser',loginUser)
route.post('/createStudent',autherisation,addStudent)

module.exports = route