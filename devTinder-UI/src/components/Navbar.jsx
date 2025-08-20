import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar=()=>{
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user)
    const handleLogout=async()=>{
      try{
        await axios.post(BASE_URL+"/logout",
          {},
          {withCredentials:true}
        );
        dispatch(removeUser());
       navigate("/");
      }catch(err){
      }
    }

    return(
        <>
  <div className="navbar fixed w-full z-50 bg-transparent backdrop-blur-none text-white shadow-none">
  <div className="flex-1 ">
  <Link to="/feed" className="btn btn-ghost text-xl text-white">DevKonneckt♾️</Link>
  </div>
 { user && ( 
  <div className="flex gap-2">
  <div className="form-control font-bold text-1xl text-white">Welcome, {user.firstName}</div>
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
  className="menu menu-sm dropdown-content bg-white/10 backdrop-blur-lg rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections">Connections</Link>
        </li>
        <li>
          <Link to="/requests">Requests</Link>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>)
}
</div>
        
    </>
    )
}
export default Navbar