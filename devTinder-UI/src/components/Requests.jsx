import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";


const Requests = () => {
  const requests = useSelector((store) => store.requests); // Accessing requests from Redux store
  const dispatch = useDispatch(); // Dispatch hook to update the Redux store


  const reviewRequest=async (status,_id)=>{
    try{
      const res=await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
        {},{withCredentials:true}
      );
      dispatch(removeRequest(_id));
    }catch(err){
      console.log(err.message)
    }
  }




  // Function to fetch the requests from the backend
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      console.log(res.data.data); // Log the response to ensure it's correct
      dispatch(addRequests(res.data.data)); // Dispatch the requests to the Redux store
    } catch (err) {
      console.log(err.message); // Log errors if any
    }
  };

  useEffect(() => {
    fetchRequests(); // Fetch requests when the component mounts
  }, []);

  // Make sure requests is an array and has content
  if (!Array.isArray(requests)) {
    return <p className="text-xl flex justify-center">Error: Invalid data format</p>;
  }

  if (requests.length === 0) {
    return <p className="text-xl flex justify-center">No Requests Found</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-flex">Requests</h1>
  
      <div className="flex flex-col items-center gap-4">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
  
          return (
            <div
              key={request._id}
              className="flex items-center gap-4 p-4 bg-base-300 rounded-lg shadow-md w-full max-w-md"
            >
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
              />
  
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-black">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-black">
                    {age} • {gender}
                  </p>
                )}
                {about && (
                  <p className="text-sm text-black-300 mt-1">{about}</p>
                )}
  
                <div className="flex gap-3 mt-4">
                  <button className="btn btn-secondary btn-sm"
                  onClick={()=>reviewRequest("accepted",request._id)}
                  >Accept</button>
                  <button className="btn btn-primary btn-sm"
                   onClick={()=>reviewRequest("rejected",request._id)}
                  >Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
 
};

export default Requests;
