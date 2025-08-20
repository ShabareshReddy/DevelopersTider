import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const RegisterForm = ({ onSuccess }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignUp = async () => {
		try {
			const res = await axios.post(BASE_URL + "/signup",
				{ firstName, lastName, email, password },
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.user || res.data.data));
			if (onSuccess) onSuccess();
			navigate("/profile");
		} catch (err) {
			setError(err?.response?.data || "Signup failed");
		}
	};

		return (
			<div className="card w-96 bg-white/30 shadow-2xl border-none z-10 relative backdrop-blur-md">
				<div className="card-body">
					<h2 className="card-title flex justify-center text-2xl  font-extrabold ">Get Started Dev</h2>
					<label className="floating-label my-2 w-full">
						<span>First Name</span>
						<input type="text"
							value={firstName}
							placeholder="firstName"
							onChange={(e) => setFirstName(e.target.value)}
							className="input  bg-black/70 text-white placeholder-gray-300 border-none focus:ring-2 focus:ring-blue-400 w-full"
						/>
					</label>
					<label className="floating-label my-2 w-full">
						<span>Last Name</span>
						<input type="text"
							value={lastName}
							placeholder="lastName"
							onChange={(e) => setLastName(e.target.value)}
							className="input input-md bg-black/70 text-white placeholder-gray-300 border-none focus:ring-2 focus:ring-blue-400 w-full"
						/>
					</label>
					<label className="floating-label my-2 w-full">
						<span>Email ID</span>
						<input type="text"
							value={email}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							className="input input-md bg-black/70 text-white placeholder-gray-300 border-none focus:ring-2 focus:ring-blue-400 w-full"
						/>
					</label>
					<label className="floating-label w-full">
						<span>Password</span>
						<input type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							className="input input-md bg-black/70 text-white placeholder-gray-300 border-none focus:ring-2 focus:ring-blue-400 w-full" />
					</label>
					<p className="text-red">{error}</p>
					<div className="card-actions justify-center my-2">
						<button className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-full shadow-lg"
							onClick={handleSignUp}
						>Sign Up</button>
					</div>
					
				</div>
			</div>
		);
};

export default RegisterForm;
