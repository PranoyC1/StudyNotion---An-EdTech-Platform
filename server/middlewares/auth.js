const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//AUTH MIDDLEWARE
exports.auth = async(req,res,next) => {
    try{
        const token = req.body?.token || 
                      req.cookies?.token ||
                      req.header("Authorization")?.replace("Bearer ", "");
        
        if(!token){
            return res.status(400).json({
                success: false,
                message: "No Token Found"
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Something Went Wrong While Validating Token"
        })
    }
}


//ISSTUDENT MIDDLEWARE
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "User Role Cannot Be Verified"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User Role Cannot Be Verified"
        })
    }
}


//ISINSTRUCTOR MIDDLEWARE
exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "User Role Cannot Be Verified"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User Role Cannot Be Verified"
        })
    }
}


//ISADMIN MIDDLEWARE
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "User Role Cannot Be Verified"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User Role Cannot Be Verified"
        })
    }
}