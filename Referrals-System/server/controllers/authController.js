const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password) return res.status(401).json({message:"All fields require!"})
        const user = await userModel.findOne({email});
        if(user) return res.status(401).json({message:"User is already registered Please Login!"})
        let hashedPass = await bcrypt.hash(password,10)
        let newUser = await userModel.create({name,email,password:hashedPass});
        return res.status(201).json({message:'SignUp successfully!',newUser})

    } catch (error) {
        return res.status(401).json({message:"Something went wrong!"})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(401).json({message:"User not found!"});
        let comparePass = await bcrypt.compare(password,user.password);
        if(!comparePass) res.status(401).json({message:"Wrong Password!"});
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"24h"})
        return res.status(201).json({message:'User Logeed In successfully!',token,user})
    } catch (error) {
        return res.status(401).json({message:"Something went wrong!"})
    }
}

module.exports = {
    login , 
    signup
}