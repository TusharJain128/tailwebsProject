const studentModel = require('../model/studentModel')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

const addStudent = async function (req, res) {
    try {
        let data = req.body
        let { name, subject, marks } = data

        data.userId = req.userId

        let savedData = await studentModel.create(data)

        res.status(201).send({ status: true, message: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



module.exports.addStudent = addStudent