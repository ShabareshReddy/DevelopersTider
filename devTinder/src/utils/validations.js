const validator=require("validator");

const validateSignUpData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Invalid Name ")
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid Email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Invalid password")
    }
}


const validateEditProfileData=(req)=>{
    const ALLOWED_UPDATES=["firstName","lastName","photoUrl","age","gender","about"];
    const isUpdateAllowed=Object.keys(req.body).every((field)=>
        ALLOWED_UPDATES.includes(field)
);
    return isUpdateAllowed;
}



module.exports={validateSignUpData,validateEditProfileData};