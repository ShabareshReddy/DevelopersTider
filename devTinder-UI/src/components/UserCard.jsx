
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user: propUser }) => {
  const reduxUser = useSelector((store) => store.user);
  const user = propUser || reduxUser;
  const dispatch = useDispatch();
  if (!user) return null;
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const sendRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeUserFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-base-500 w-96 shadow-sm">
      <figure>
        <img className="w-96 justify-items-normal" src={photoUrl} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + "," + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center m-4">
          <button className="btn btn-secondary " onClick={() => sendRequest("interested", _id)}>
            Interested
          </button>
          <button className="btn btn-primary " onClick={() => sendRequest("ignored", _id)}>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;