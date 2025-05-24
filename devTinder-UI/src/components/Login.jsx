import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login=()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLoginForm,setIsLoginForm]=useState(false);
    const[error,setError]=useState("");
    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    const handleSignUp=async()=>{

        try{
            const res=await axios.post(BASE_URL + "/signup",
                {firstName,lastName,email,password},
                {withCredentials:true}
            );
           
            dispatch(addUser(res.data.data));
            navigate("/profile");
        }catch(err){
        }
    }


         const handleLogin=async ()=>{
            try{
                const res=await axios.post(BASE_URL +"/login",
                    {email,
                    password
                    },
                    {withCredentials:true}
                );
               
                dispatch(addUser(res.data))
                navigate("/");
            }catch(err){
                setError(err?.response?.data);
                (err);
            }
        }


    return(
        <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title flex justify-center text-2xl font-bold ">{isLoginForm?"Login":"Sign Up"}</h2>
        <div>
        { !isLoginForm && (
            <>
            <label className="floating-label my-4 ">
            <span>First Name</span>
            <input type="text"
              value={firstName} 
              placeholder="firstName" 

              onChange={(e)=>setFirstName(e.target.value)}
              className="input input-md"
               />
        </label>
        <label className="floating-label my-4 ">
            <span>Last Name</span>
            <input type="text"
              value={lastName} 
              placeholder="lastName" 
              onChange={(e)=>setLastName(e.target.value)}
              className="input input-md"
               />
        </label>
        </>)}
        <label className="floating-label my-4 ">
            <span>Email ID</span>
            <input type="text"
              value={email} 
              placeholder="Email" 
              onChange={(e)=>setEmail(e.target.value)}
              className="input input-md"
               />
        </label>
        <label className="floating-label">
            <span>Password</span>
            <input type="password" 
                value={password} 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                className="input input-md" />
        </label>
        </div>
        <p className="text-red">{error}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary"
      onClick={isLoginForm? handleLogin:handleSignUp}
      >{isLoginForm?"Login" : "Sign Up"}</button>
    </div>
    <p className="text-black cursor-pointer justify-center items-center m-auto" 
    onClick={()=>setIsLoginForm((value)=>!value)}>
    {isLoginForm?"New User?SignUp here":"Existing User?Login her"}</p>

  </div>
</div>
        </div>
    )
}
export default Login;