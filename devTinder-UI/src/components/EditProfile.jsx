import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const [form, setForm] = useState({});
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user) return <div className="flex justify-center items-center h-screen text-white">Loading profile...</div>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveEdits = async () => {
        try {
            const updated = {
                firstName: form.firstName ?? user.firstName,
                lastName: form.lastName ?? user.lastName,
                photoUrl: form.photoUrl ?? user.photoUrl,
                age: form.age ?? user.age,
                gender: form.gender ?? user.gender,
                about: form.about ?? user.about,
            };
            const res = await axios.put(BASE_URL + "/profile", updated, { withCredentials: true });
            dispatch(addUser(res.data));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setForm({});
            navigate("/feed");
        } catch (err) {
            setError("Failed to save edits");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title flex justify-center text-2xl font-bold ">Edit Profile</h2>
                        <div>
                            <label className="floating-label my-4 ">
                                <span>First Name</span>
                                <input type="text"
                                    name="firstName"
                                    value={form.firstName ??user.firstName}
                                    placeholder="firstName"
                                    onChange={handleChange}
                                    className="input input-md"
                                />
                            </label>
                            <label className="floating-label my-4">
                                <span>Last Name</span>
                                <input type="text"
                                    name="lastName"
                                    value={form.lastName ?? user.lastName}
                                    placeholder="lastName"
                                    onChange={handleChange}
                                    className="input input-md" />
                            </label>
                            <label className="floating-label my-4">
                                <span>photoUrl</span>
                                <input type="text"
                                    name="photoUrl"
                                    value={form.photoUrl ?? user.photoUrl}
                                    placeholder="photoUrl"
                                    onChange={handleChange}
                                    className="input input-md" />
                            </label>
                            <label className="floating-label my-4">
                                <span>age</span>
                                <input type="text"
                                    name="age"
                                    value={form.age ?? user.age}
                                    placeholder="Enter your age"
                                    onChange={handleChange}
                                    className="input input-md" />
                            </label>
                            <label className="floating-label my-4">
                                <span>Gender</span>
                                <input type="text"
                                    name="gender"
                                    value={form.gender ?? user.gender}
                                    placeholder="gender"
                                    onChange={handleChange}
                                    className="input input-md" />
                            </label>
                            <label className="floating-label my-4">
                                <span>About</span>
                                <input type="text"
                                    name="about"
                                    value={form.about ?? user.about}
                                    placeholder="about"
                                    onChange={handleChange}
                                    className="input input-md" />
                            </label>
                        </div>
                        <p className="text-red">{error}</p>
                        <div className="card-actions justify-center my-2">
                            <button className="btn btn-primary" onClick={saveEdits}>Save Edits</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-2xl " >
                <UserCard user={user} />
            </div>
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success my-5">
                    <span>Profile Saved Successfuly</span>
                </div>
            </div>)}
        </div>
    );
};

export default EditProfile;