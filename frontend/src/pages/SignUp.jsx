import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Title from "../components/Title";
import Input from "../components/Input";
import { toast } from "react-hot-toast";

export default function SignUp() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [visible, setVisible] = useState(false);
	const [errors, setErrors] = useState({
		fullname: false,
		email: false,
		password: false,
	});

	function handleModalClose() {
		//do nothing
	}

	function validateForm(userData) {
		let isError = false;
		if (userData.fullname.length < 4) {
			setErrors((prevErrors) => ({ ...prevErrors, fullname: true }));
			isError = true;
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, fullname: false }));
		}

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

		console.log(userData);
		axios
			.post(`${import.meta.env.VITE_BACKEND_API}/api/user/signup`, {
				fullname: userData.fullname,
				email: userData.email,
				password: userData.password,
			})
			.then((response) => {
				toast.success("Signed up Successfully!");
				setIsSubmitted(true);
			})
			.catch((error) => console.log(error));
	}

	return (
		<>
			<Modal
				open={isSubmitted}
				onClose={handleModalClose}
				className="space-y-10 rounded-lg p-4 shadow-sm backdrop:bg-black/[0.7] border-2 dark:bg-neutral-900 dark:border-neutral-700 animate-fade-slide-up"
			>
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold dark:text-white">Account Created!</h1>
					<p className="text-neutral-600 dark:text-neutral-400">
						You can now log in with your account.
					</p>
				</div>
				<div className="flex justify-end">
					<Link
						to="/login"
						className="bg-lime-500 border-2 border-lime-500 rounded-xl shadow-lg p-2 font-medium hover:bg-lime-600 transition-all ease-linear "
					>
						Proceed to Log in
					</Link>
				</div>
			</Modal>
			<div className="flex flex-col justify-center items-center w-full flex-grow">
				<div className="sm:w-1/2 w-5/6 m-4">
					<Title heading="Sign up to" />
					<form className="space-y-3 mb-2" onSubmit={(e) => handleSubmit(e)}>
						<Input
							name="fullname"
							type="text"
							placeholder="Full Name"
							error={errors.fullname}
							errorMsg="Name is too short."
						/>
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
						<Button type="submit">Sign up</Button>
					</form>
					<p className="text-neutral-400 dark:text-neutral-600">
						Already have an account?{"  "}
						<Link to="/login" className="text-black dark:text-neutral-200">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
