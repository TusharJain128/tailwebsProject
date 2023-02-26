const express= require('express')
const mongoose= require('mongoose')
const app= express()
const routes= require('./routes/route')

app.use(express.json())

mongoose.set('StrictQuery',true)
mongoose.connect('mongodb+srv://TusharJainFunctionup:functionup@tusharjaindb.zxey2fj.mongodb.net/tailwebs')
.then(()=>{console.log("mongodb is connected now")})
.catch((err)=> console.log(err))

app.use('/',routes)

app.listen(3000, ()=>{
    console.log("Port is running on 3000")
})