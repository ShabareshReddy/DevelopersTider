const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const JWT_SECRET="NamasteBhai@1234"
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    firstName:{
        type:"String",
        required:true,
        
    },
    lastName:{
        type:String,

    },
     photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRD7Q19DRsBsG9YP8VVeKCwzAUv8VqE_TqdNn9aFAihZyng5IKPPouN463Kt7CW8dnag0&usqp=CAU"   
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:4,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)){      //akshaysaingmail.com
                throw new Error("it is not valid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("it is not strong")
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    about:{
        type:"String",
        default:"this is default info about user",
    },
    skills:{
        type:[String],
    },
},{
    timeStamps:true
})



userSchema.methods.getJWT=async function(){
    const user=this;
const token=await jwt.sign({_id:user._id},JWT_SECRET,{
        expiresIn:"8d"
    });
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user =this;
    const isPasswordValid=await bacrypt.compare(passwordInputByUser,user.password);
    return isPasswordValid;
}
module.exports=mongoose.model("User",userSchema);