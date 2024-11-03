import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		setIsSigningUp(true);
		setErrorMessage("");

		try {
			const response = await axios.post("http://localhost:5000/auth/signup", {
				email,
				username,
				password,
			});

			// Redirect to verification page with email and username
			navigate("/verify-code", { state: { email, username } });
		} catch (error) {
			setErrorMessage(error.response?.data?.message || "An error occurred during signup.");
		} finally {
			setIsSigningUp(false);
		}
	};

	return (
		<div className="h-screen w-full hero-bg flex flex-col items-center justify-center">
			<header className="w-full max-w-6xl flex items-center justify-between p-4">
				<Link to={"/"}>
					<img src="/netflix-logo.png" alt="logo" className="w-52" />
				</Link>
			</header>

			<div className="flex justify-center items-center mt-10 mx-3">
				<div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
					<h1 className="text-center text-white text-2xl font-bold mb-4">Sign Up</h1>

					{errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

					<form className="space-y-4" onSubmit={handleSignUp}>
						<div>
							<label htmlFor="email" className="text-sm font-medium text-gray-300 block">
								Email
							</label>
							<input
								type="email"
								className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
								placeholder="you@example.com"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="username" className="text-sm font-medium text-gray-300 block">
								Username
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
								placeholder="johndoe"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-300 block">
								Password
							</label>
							<input
								type="password"
								className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
								placeholder="••••••••"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
							disabled={isSigningUp}
						>
							{isSigningUp ? "Loading..." : "Sign Up"}
						</button>
					</form>
					<div className="text-center text-gray-400">
						Already a member?{" "}
						<Link to={"/login"} className="text-red-500 hover:underline">
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
