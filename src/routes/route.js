const express = require('express')
const route= express.Router()

route.get('/test',(req,res)=>{
    res.send("hello I am a testing api")
})

module.exports = route