
import EditProfile from "./EditProfile";
import { useSelector, useDispatch, } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            const fetchUser = async () => {
                setLoading(true);
                setError("");
                try {
                    const res = await axios.get(BASE_URL + "/profile", { withCredentials: true });
                    dispatch(addUser(res.data));
                } catch (err) {
                    setError("You are not logged in. Please login to view your profile.");
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [user, dispatch]);

    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading profile...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!user) return null;
    return <EditProfile user={user} />;
};

export default Profile;