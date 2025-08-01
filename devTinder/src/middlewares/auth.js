

const jwt =require("jsonwebtoken");
const JWT_SECRET="NamasteBhai@1234";
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
  try{
    const { token }=req.cookies;
    if(!token){
      throw new Error("Please Login!!!")
    }
    const decodedData=await jwt.verify(
      token,
      JWT_SECRET,
  )
  const {_id} =decodedData
  console.log(_id)
  const user=await User.findById(_id)
  if(!user){
    throw new Error("user not found!!!");
  }
  req.user=user;
  next();
  }catch(error){
    res.status(401).send("Unauthorized " + error.message)
  }
}

module.exports={
  userAuth
}