import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../store/authentication.slice";
import { toast } from "react-hot-toast";

export default function LoginPage() {
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});

	const dispatch = useDispatch();

	function validateForm(userData) {
		let isError = false;

		if (
			userData.email === "" ||
			/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userData.email) === false
		) {
			setErrors((prevErrors) => ({ ...prevErrors, email: true }));
			isError = true;
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, email: false }));
		}
		if (
			userData.password === "" ||
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,100}$/.test(
				userData.password
			) === false
		) {
			setErrors((prevErrors) => ({ ...prevErrors, password: true }));
			isError = true;
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, password: false }));
		}
		if (isError) return 0;
		return 1;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.target);
		const userData = Object.fromEntries(fd.entries());

		if (!validateForm(userData)) return;
		e.target.reset();

		axios
			.post(
				`${import.meta.env.VITE_BACKEND_API}/api/user/login`,
				{
					email: userData.email,
					password: userData.password,
				},
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				const respondedUserData = response.data.data;
				const auth = {
					fullname: respondedUserData.fullname,
					email: respondedUserData.email,
				};
				dispatch(
					authenticationActions.setAuth({
						auth: auth,
					})
				);

				localStorage.setItem("auth", JSON.stringify(auth));
				toast.success("Logged in Successfully!");
				navigate("/");
			});
	}

	return (
		<div className="flex flex-col justify-center items-center w-full flex-grow">
			<div className="sm:w-1/2 w-5/6">
				<Title heading="Log in to" />
				<form className="space-y-3 mb-2" onSubmit={(e) => handleSubmit(e)}>
					<Input
						name="email"
						type="text"
						placeholder="Email"
						error={errors.email}
						errorMsg="Enter a valid email."
					/>
					<Input
						name="password"
						type={visible ? "text" : "password"}
						placeholder="Password"
						error={errors.password}
						errorMsg="Password must include a special character and a number."
					>
						<button
							type="button"
							onClick={() => setVisible(!visible)}
							className="text-neutral-500"
						>
							{visible ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
						</button>
					</Input>
					<Button type="submit">Log in</Button>
				</form>
				<p className="text-neutral-400 dark:text-neutral-600">
					Don't have an account?{"  "}
					<Link to="/signup" className="text-black dark:text-neutral-200">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
