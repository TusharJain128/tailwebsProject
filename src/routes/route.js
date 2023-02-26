const express = require('express')
const route= express.Router()
const {loginUser} = require('../controllers/user')

route.get('/test',(req,res)=>{
    res.send("hello I am a testing api")
})

route.post('/loginUser',loginUser)

module.exports = route