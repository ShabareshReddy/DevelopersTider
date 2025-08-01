const express=require("express");
const {connectionDB} = require("./config/database.js");
const app=express();
const cookieParser=require("cookie-parser");
const cors=require("cors")


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));


app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectionDB()
.then(()=>{
    console.log("database connection establised");
    app.listen(3000,()=>{
        console.log("server is listening successfully");
    });
    
    })
    .catch((err)=>{
        console.log("cannot connect db")
});

 


