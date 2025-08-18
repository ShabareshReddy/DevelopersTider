const express=require("express");
const authRouter=express.Router();
const User=require("../models/user.js");
const {validateSignUpData}=require("../utils/validations.js");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET="NamasteBhai@1234"



authRouter.post("/signup",async(req,res)=>{``
    try {
        validateSignUpData(req);
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        res.json({
            message: "successfully signedUp"
        });
    } catch (error) {
        res.status(400).send("ERROR " + error.message);
    }
})

authRouter.post("/login",async(req,res)=>{
    try{
        const { email, password }=req.body
        const user=await User.findOne(
            {email:email}
        )
        if(!user){
            throw new Error("Invalid credentials")
        }
        const isPasswordValid=await user.validatePassword(password)
        if(!isPasswordValid){
            throw new Error("Invalid crdentials");
        }
        const token = await user.getJWT();
        res.cookie("token",token);
        res.json({
            message:"successfully LoginedIn"
        })
    }catch(error){
        res.status(400).send("ERROR " + error.message)
    }
})

authRouter.post("/logout",async(req,res)=>{
   res.cookie("token",null,{
    expires:new Date(Date.now()),
   });
   res.send("Logout successfully");
})


module.exports=authRouter;
