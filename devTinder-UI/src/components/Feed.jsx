import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const currentUser = useSelector((store) => store.user);
  const dispatch = useDispatch();



  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed" ,{
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const filteredFeed = feed?.filter((user) => user._id !== currentUser?._id);
  if(!feed || feed.length===0){
    return (
      <div className="text-center text-bold text-black mt-4">
        🎉 Feed completed. No more users to show.
      </div>
    )
  }
 
  return (
   feed && (
   <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  );

};
export default Feed;
