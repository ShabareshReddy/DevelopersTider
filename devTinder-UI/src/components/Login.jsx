
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LoginForm = ({ onSuccess }) => {
	const [email, setEmail] = useState("arjun@gmail.com");
	const [password, setPassword] = useState("Arjun@123");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await axios.post(BASE_URL + "/login",
				{ email, password },
				{ withCredentials: true }
			);
            console.log(res.data);
			dispatch(addUser(res.data.user || res.data));
			if (onSuccess) onSuccess();
			navigate("/profile");
		} catch (err) {
			setError(err?.res?.data || "Login failed");
		}
	};

	return (
		<div className="card w-96 bg-white/30 shadow-2xl border-none z-10 relative backdrop-blur-lg">
			<div className="card-body">
				<h2 className="card-title flex justify-center text-2xl font-sans font-bold text-amber-900 ">Login</h2>
				<label className="floating-label my-4 w-full">
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
						onClick={handleLogin}
					>Login</button>
				</div>
				
			</div>
		</div>
	);
};

export default LoginForm;

