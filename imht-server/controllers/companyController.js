const Company = require("../models/Company")
const getCompanies = async (req,res) =>{
    const companies = await Company.find({}).lean()
    if(!companies.length){
        return res.status(400).json({
            error: true,
            message: "No companies",
            data: null
        })
    }
    res.json({
        error: false,
        message:'',
        data: companies
    })
}
const getCompany = async (req,res) =>{
    res.send("todos")

}
const addCompany = async (req,res) =>{
    const {name, type, active, image} = req.body
    if(!name || !type){
        return res.status(400).json({
            error: true,
            message: "Name and Type are required",
            data: null
        })
    }

    const company = await Company.create({name, type, active, image})
    if(!company){
        return res.status(400).json({
            error: true,
            message: "Something wrong",
            data: null
        })
    }
    res.status(201).json({
        error: false,
        message: "",
        data: company
    })

}
const updateCompany = async (req,res) =>{
    const {_id, name, type, active, image} = req.body
    if(!_id || !name || !type){
        return res.status(400).json({
            error: true,
            message: "Id and Name and Type are required",
            data: null
        })
    }
    const company = await Company.findById(_id)
    if(!company){
        return res.status(400).json({
            error: true,
            message: "No Company found",
            data: null
        })
    }
    company.name = name
    company.type = type
    company.active = active
    company.image = image
    const updateCompany = await company.save()

    res.json({
        error: false,
        message: "",
        data: updateCompany
    })

}
const deleteCompany = async (req,res) =>{
    const {_id} = req.body
    if(!_id ){
        return res.status(400).json({
            error: true,
            message: "Id are required",
            data: null
        })
    }
    const company = await Company.findById(_id)
    if(!company){
        return res.status(400).json({
            error: true,
            message: "No Company found",
            data: null
        })
    }
    const deletedCompany = await company.deleteOne()
    res.json({
        error: false,
        message: "",
        data: deletedCompany
    })
}

module.exports = {getCompanies, getCompany, addCompany, updateCompany, deleteCompany}