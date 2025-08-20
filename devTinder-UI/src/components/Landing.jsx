import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import { FaArrowRight } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";


const Landing = () => {
	const [showRegister, setShowRegister] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	return (
		<div
			className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: "url('/images/newimage.png')",
			}}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/20 z-0" />

			{/* Centered Content */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-white text-6xl font-extrabold  my-9 text-center drop-shadow-lg">
					Connect with Developers Worldwide
								 DevKonneckt♾️
				</h1>
				<div className="flex gap-4 mb-8">
					<button
						className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-lg font-semibold shadow hover:bg-gray-200 transition"
						onClick={() => setShowLogin(true)}
					>
						<span className="material-icons"><FaArrowRight /></span><div className=" font-semibold w-full">Login</div> 
					</button>
					<button
						className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-lg font-semibold shadow hover:bg-gray-200 transition"
						onClick={() => setShowRegister(true)}
					>
						<span className="material-icons"><SiGnuprivacyguard /></span> Sign Up
					</button>
				</div>
			</div>

			{/* Login Modal */}
			{showLogin && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="absolute inset-0 bg-black/20" onClick={() => setShowLogin(false)} />
					<div className="relative z-10">
						<button className="absolute top-2 right-4 text-2xl text-black" onClick={() => setShowLogin(false)}>&times;</button>
						<LoginForm onSuccess={() => setShowLogin(false)} />
					</div>
				</div>
			)}

			{/* Register Modal */}
			{showRegister && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="absolute inset-0 bg-black/20" onClick={() => setShowRegister(false)} />
					<div className="relative z-10">
						<button className="absolute top-2 right-4 text-2xl text-black" onClick={() => setShowRegister(false)}>&times;</button>
						<RegisterForm onSuccess={() => setShowRegister(false)} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Landing;
