const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const autherisation = async function(req,res,next){
    let token = req.headers("x-api-key")
    let decode = jwt.verify(token, "userSecretKey")

    let findUser= await userModel.findById(decode._id)

    if(!findUser) return res.status(403).send({status:false, message:"You are not autherised"})

    req.userId= decode._id

    next()
}

module.exports.autherisation= autherisation