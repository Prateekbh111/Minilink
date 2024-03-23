import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCopy } from "react-icons/io5";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Title from "../components/Title";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function HomePage() {
	const [URL, setURL] = useState("");
	const [isValidURL, setIsValidURL] = useState(true);
	const [userUrls, setUserUrls] = useState(undefined);
	const [isUpdating, setIsUpdating] = useState();
	const inputRef = useRef();
	const auth = useSelector((state) => state.authentication.auth);

	// const auth = document.cookie.includes("token");

	function handleFetchAllUrls() {
		axios
			.get("http://localhost:8000/api/getAllUrls", {
				withCredentials: true,
			})
			.then((response) => {
				setUserUrls(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		if (auth) handleFetchAllUrls();
	}, [auth]);

	function handleCopy() {
		inputRef.current?.select();
		window.navigator.clipboard.writeText(URL);
	}

	function handleShorten() {
		if (URL == "") {
			setIsValidURL(false);
			return;
		}

		setIsValidURL(true);

		axios
			.post(
				"http://localhost:8000/api/url",
				{
					url: URL,
				},
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				// if (response.status === 202) {
				// 	setIsUserLoggedIn(false);
				// 	return;
				// } else {
				// 	setIsUserLoggedIn(true);
				// }
				// console.log(response);
				toast.success("Shortened successfully!");
				setURL(`http://localhost:8000/api/url/${response.data.id}`);
			})
			.catch((error) => console.log(error));

		setIsUpdating(true);
		setTimeout(() => {
			setIsUpdating(false);
			handleFetchAllUrls();
		}, 100);
	}

	function isValidUrl(urlString) {
		var urlPattern = new RegExp(
			"^((https)*(http)?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return !!urlPattern.test(urlString);
	}

	return (
		<>
			<Modal
				open={!auth}
				className="space-y-10 rounded-lg p-4 shadow-sm backdrop:bg-black/[0.7] border-2 dark:bg-neutral-900 dark:border-neutral-700 animate-fade-slide-up"
			>
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold dark:text-white">
						Please login before using
					</h1>
					<p className="text-neutral-600 dark:text-neutral-400">
						Login to save your generated links and view analytics.
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
			<div className="flex justify-center items-center flex-grow my-2">
				<div className="sm:w-1/2 w-5/6 m-4">
					<Title />
					<div className="flex flex-col justify-center gap-6 w-full">
						<div className="w-full space-y-2">
							<div className="flex items-center gap-2 w-full">
								<div className="w-full px-3 py-2 bg-white rounded-xl border-2 shadow-sm dark:bg-black dark:border-neutral-700">
									<input
										name="url"
										type="text"
										value={URL}
										className="w-full outline-none dark:bg-black  dark:text-neutral-200"
										placeholder="URL to be shortned!"
										onChange={(event) => setURL(event.target.value)}
										ref={inputRef}
									/>
								</div>
								<button
									onClick={handleCopy}
									className="text-lime-500 hover:text-lime-600 transition-all ease-linear"
								>
									<IoCopy size={30} />
								</button>
							</div>
							{!isValidURL && <p className="text-red-500">Please enter a valid URL!</p>}
						</div>
						<Button onClick={handleShorten}>Shorten It!</Button>
					</div>
				</div>
			</div>

			{userUrls && userUrls.length > 0 && (
				<div className="flex flex-col justify-center items-center gap-3 mb-10">
					<h1 className="text-2xl font-semibold dark:text-white">Your Shortened URLs</h1>

					{isUpdating ? (
						<div className="flex flex-col justify-center items-center mb-10">
							<p className="text-xl font-semibold dark:text-white">Refreshing.....</p>
						</div>
					) : (
						<div className="space-y-2 relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="text-sm text-left text-gray-500 dark:text-gray-400">
								<tbody>
									<tr className="text-xs text-gray-700 uppercase shadow-lg bg-neutral-200 dark:bg-neutral-700 dark:text-gray-400">
										<th className="px-6 py-3">Short Id</th>
										<th className="px-6 py-3">Orignal URL</th>
										<th className="px-6 py-3">Clicks</th>
										<th className="px-6 py-3">Created At</th>
									</tr>
									{userUrls.map((url) => {
										const date = new Date(url.createdAt);

										return (
											<tr
												key={url._id}
												className="py-2 px-4 bg-neutral-100 rounded-md shadow-lg dark:bg-neutral-800 dark:shadow-none dark:text-neutral-200"
											>
												<td className="px-6 py-3">{url.shortId}</td>
												<td className="px-6 py-3">{url.redirectedURL}</td>
												<td className="px-6 py-3">{url.visitHistory.length}</td>
												<td className="px-6 py-3">{date.toLocaleDateString("en-US")}</td>
												{/* <p>
										<a
											href={`http://localhost:8000/url/${url.shortId}`}
											target="blank"
										>{`http://localhost:8000/url/${url.shortId}`}</a>
									</p>
									<span> Clicks - {url.visitHistory.length}</span> */}

												{/* http://localhost:8000/url/vhUuTPuW */}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</>
	);
}
