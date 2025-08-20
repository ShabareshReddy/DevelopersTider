import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {BASE_URL} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";


const Body=()=>{
   const dispatch=useDispatch();
   const navigate=useNavigate();
   const userData = useSelector((store) => store.user);
   const fetchUser = async () => {
       try {
           const res = await axios.get(BASE_URL + "/profile", { withCredentials: true });
           dispatch(addUser(res.data));
       } catch (err) {
           if (err.response?.status === 401) {
               // Not logged in, do nothing
           } else {
               console.error("Failed to fetch user:", err);
           }
       }
   };
   useEffect(() => {
       if (!userData) fetchUser();
   }, [userData]);
    return(
        <>
        <Navbar/>
        <Outlet/>
        {/* <Footer/> */}
        </>
    )
}
export default Body;