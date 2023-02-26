const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const autherisation = async function (req, res, next) {
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

module.exports.autherisation = autherisation