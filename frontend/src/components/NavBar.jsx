import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { themeActions } from "../store/theme.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgShortcut } from "react-icons/cg";
import { authenticationActions } from "../store/authentication.slice";
import { toast } from "react-hot-toast";

export default function NavBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const themeMode = useSelector((state) => state.theme.themeMode);
	const auth = useSelector((state) => state.authentication.auth);

	useEffect(() => {
		document.querySelector("html").classList.remove("light", "dark");
		document.querySelector("html").classList.add(themeMode);
	}, [themeMode]);

	function handleLogout() {
		localStorage.removeItem("auth");
		dispatch(
			authenticationActions.setAuth({
				auth: null,
			})
		);
		toast.success("Logged Out Successfully!");
		navigate("/login");
	}

	function handleThemeChange() {
		if (themeMode == "light") {
			dispatch(themeActions.setDarkMode());
		} else {
			dispatch(themeActions.setLightMode());
		}
	}

	return (
		<div className="flex justify-between items-center min-h-20 h-20 px-6">
			<div className="">
				<Link to="/" className="flex items-center dark:text-white sm:text-5xl text-3xl">
					<CgShortcut />
					<h1 className="font-Orbitron text-4xl font-semibold dark:text-white sm:block hidden">
						Minilink
					</h1>
				</Link>
			</div>
			<div className="flex items-center sm:gap-8 gap-4 sm:text-xl sm:font-medium font-Montserrat dark:text-white">
				{auth ? (
					<button
						to="/"
						className="border-2 py-1 sm:px-3 px-1 rounded-lg shadow border-lime-500 bg-lime-500 text-black hover:bg-lime-600 transition-all ease-linear"
						onClick={handleLogout}
					>
						Log Out
					</button>
				) : (
					<>
						<Link to="signup" className="dark:text-white py-1 sm:px-3 px-1">
							Sign Up
						</Link>
						<Link
							to="login"
							className="border-2 py-1 sm:px-3 px-1 rounded-lg shadow border-lime-500 bg-lime-500 text-black hover:bg-lime-600 transition-all ease-linear"
						>
							Log in
						</Link>
					</>
				)}

				<button onClick={handleThemeChange}>
					{themeMode == "light" && <MdDarkMode size={25} />}
					{themeMode == "dark" && <MdLightMode size={25} />}
				</button>
			</div>
		</div>
	);
}
