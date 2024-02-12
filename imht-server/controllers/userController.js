const User = require("../models/User")
const bcrypt = require("bcrypt")
const getUsers = async (req,res) =>{
    const users = await User.find({deleted: false}, {password: 0}).populate("company").lean()
    if(!users.length){
        return res.status(400).json({
            error: true,
            message: "No users",
            data: null
        })
    }
    res.json({
        error: false,
        message:'',
        data: users
    })
}
const getUser = async (req,res) =>{
    res.send("todos")

}
const addUser = async (req,res) =>{
    const {username, password, fullname, company, roles, active, email } = req.body
    if(!username || !password || !fullname || !company || !roles){
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }


    //validate duplicate user
    
    const duplicateUser = await User.findOne({username}).lean()
    if(duplicateUser){
        return res.status(409).json({
            error: true,
            message: "Duplicate User",
            data: null
        })
    }
    
    const hashPwd = await bcrypt.hash(password, 10)


    const user = await User.create({username, password: hashPwd, fullname, company, roles, active, email })
    if(!user){
        return res.status(400).json({
            error: true,
            message: "Something wrong",
            data: null
        })
    }
    res.status(201).json({
        error: false,
        message: "",
        data: {username: user.username, _id: user._id}
    })

}
const updateUser = async (req,res) =>{
    const {_id,  password, fullname, company, roles, active, email } = req.body
    if( !_id   || !fullname || !company || !roles){
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const user = await User.findById(_id)
    if(!user){
        return res.status(400).json({
            error: true,
            message: "No User found",
            data: null
        })
    }
    if(password){
        const hashPwd = await bcrypt.hash(password, 10)
        user.password = hashPwd
    }
    //user.username = username
    user.fullname = fullname
    user.company = company
    user.roles = roles
    user.active = active
    user.email = email
    const updateUser = await user.save()

    res.json({
        error: false,
        message: "",
        data: {username: updateUser.username, _id: updateUser._id}
    })

}
const deleteUser = async (req,res) =>{
    const {_id } = req.body
    if( !_id ){
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const user = await User.findById(_id)
    if(!user){
        return res.status(400).json({
            error: true,
            message: "No User found",
            data: null
        })
    }
    user.deleted = true
    const updateUser = await user.save()
    res.json({
        error: false,
        message: "",
        data: {username: updateUser.username, _id: updateUser._id}
    })
}

module.exports = {getUsers, getUser, addUser, updateUser, deleteUser}