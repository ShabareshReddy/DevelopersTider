const express=require("express");
const authRouter=express.Router();
const User=require("../models/user.js");
const {validateSignUpData}=require("../utils/validations.js");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");


authRouter.post("/signup", async(req,res)=>{
    try{ 
    // validation the data  before the user enter into db
    validateSignUpData(req);

    // Encrypt the password

    const {firstName,lastName,photoUrl,email,password,}=req.body;

    const passwordHash=await bcrypt.hash(password,10);
    


    // Here we create the instance of the model it means we can create a new user to add it to database
    const user= new User({
        firstName,
        lastName,
        email,
        password:passwordHash
    });

       const savedUser= await user.save();
       const token=await jwt.sign({_id:user._id},"NamasteDev@90");
       res.cookie("token",token,{
        expires:new Date(Date.now() + 8 *3600000),
       });
 
       res.json({message:"Data Saved Succesfuly",data:savedUser});
    }
    catch(err){
        res.status(400).send(err.message);
    }
   
}
);

authRouter.post("/login",async(req,res)=>{
// user is there are not check
try{
    const{email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        throw new Error("invalid credentials")
    }
    const passwordValid=await bcrypt.compare(password,user.password);
    if(passwordValid){

        // Token logic 
        const token=await jwt.sign({_id:user._id},"NamasteDev@90");
        // console.log(token);

        // add the token to cookie and send responce back to user
        res.cookie("token",token);

        res.send(user);
    }
    else{
        throw new Error("invalid credentials")
    }
}catch(err){
    res.status(400).send(err.message);
}
})

authRouter.post("/logout",async(req,res)=>{
   res.cookie("token",null,{
    expires:new Date(Date.now()),
   });
   res.send("Logout successfully");
})


module.exports=authRouter;
