import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile=({user})=>{
    
        const [firstName,setFirstName]=useState(user.firstName);
        const [lastName,setLastName]=useState(user.lastName);
        const [photoUrl,setPhotoUrl]=useState(user.photoUrl || " ");
        const [age,setAge]=useState(user.age || " ");
        const [gender,setGender]=useState(user.gender || " ");
        const [about,setAbout]=useState(user.about || " ");
        const[error,setError]=useState("");
        const[showToast,setShowToast]=useState(false);

        const dispatch=useDispatch();

        const saveEdits=async()=>{
           
            try{
                const res=await axios.put(BASE_URL + "/profile",{
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },{withCredentials:true});
                dispatch(addUser(res.data));
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                navigate("/");
            }catch(err){
              
            }
        }
        

    return(
        <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title flex justify-center text-2xl font-bold ">Edit Profile</h2>
        <div>
        <label className="floating-label my-4 ">
            <span>First Name</span>
            <input type="text"
              value={firstName} 
              placeholder="firstName" 
              onChange={(e)=>setFirstName(e.target.value)}
              className="input input-md"
               />
        </label>
        <label className="floating-label my-4">
            <span>Last Name</span>
            <input type="text" 
                value={lastName} 
                placeholder="lastName"
                onChange={(e)=>setLastName(e.target.value)}
                className="input input-md" />
        </label>
        <label className="floating-label my-4">
            <span>photoUrl</span>
            <input type="text" 
                value={photoUrl} 
                placeholder="photoUrl"
                onChange={(e)=>setPhotoUrl(e.target.value)}
                className="input input-md" />
        </label>
        <label className="floating-label my-4">
            <span>age</span>
            <input type="text" 
                value={age} 
                placeholder="Enter your age"
                onChange={(e)=>setAge(e.target.value)}
                className="input input-md" />
        </label>
        <label className="floating-label my-4">
            <span>Gender</span>
            <input type="text" 
                value={gender} 
                placeholder="gender"
                onChange={(e)=>setGender(e.target.value)}
                className="input input-md" />
        </label>
        <label className="floating-label my-4">
            <span>About</span>
            <input type="text" 
                value={about} 
                placeholder="about"
                onChange={(e)=>setAbout(e.target.value)}
                className="input input-md" />
        </label>
        </div>
        <p className="text-red">{error}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={saveEdits}
      >Save Edits</button>
    </div>
  </div>
</div>
        </div>
        <div className="shadow-2xl " >
            <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
        </div>
        {showToast && (<div className="toast toast-top toast-center">

  <div className="alert alert-success my-5">
    <span>Profile Saved Successfuly</span>
  </div>
</div>)}
        </div>

    )
}
export default EditProfile;