const jwt = require("jsonwebtoken")
const studentModel = require("../model/studentModel")
const userModel = require("../model/userModel")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if(!token) return res.status(400).send({status:false,message:"token is missing"})
       
        let decode = jwt.verify(token, "userSecretKey")

        let findUser = await userModel.findById(decode._id)

        if (!findUser) return res.status(403).send({ status: false, message: "You are not autherised" })

        req.userId = decode._id

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const autherisation = async function (req, res, next) {
    try {
        let checkauth = await studentModel.findOne({userId: req.userId})
        if(!checkauth) return res.status(403).send({status:false,message:"You are not autherised"})

        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.authentication = authentication
module.exports.autherisation = autherisation