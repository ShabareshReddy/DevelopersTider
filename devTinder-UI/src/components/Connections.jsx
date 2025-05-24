import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
  const currentUser = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return <p className="text-center mt-4">No Connections Found</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>
      <div className="flex flex-col items-center gap-4">
        {connections.map((conn) => {
          const otherUser =
            conn.fromUserId._id === currentUser._id ? conn.toUserId : conn.fromUserId;

          const { _id, firstName, lastName, photoUrl, about,age,gender } = otherUser;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 p-4 bg-base-300 rounded-lg shadow-md w-full max-w-md"
            >
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}
                </h2>
               { age && gender && <h2 className="text-lg font-semibold">
                  {age} {gender}
                </h2>}
                <p className="text-sm text-gray-600">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
