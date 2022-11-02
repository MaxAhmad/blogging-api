const User = require('./../Models/userModel')




exports.createUser = async (req, res) => {

}

exports.getUser = async (req, res) => {
   
}

exports.getAllUser = async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        status: "success",
        users
    })
}

exports.updateUser = async (req, res) => {
    
}

exports.deleteUser = async (req, res) => {
    
}