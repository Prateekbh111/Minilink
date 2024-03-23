import { useState, useRef } from "react";
import axios from "axios";
import { FaLink } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";

export default function MainContainer() {
	const [URL, setURL] = useState("");
	const [isValidURL, setIsValidURL] = useState(true);
	const inputRef = useRef();

	function handleCopy() {
		inputRef.current?.select();
		console.log(inputRef.current.value);
		window.navigator.clipboard.writeText(URL);
	}

	function handleShorten() {
		if (URL == "" || !isValidUrl(URL)) {
			setIsValidURL(false);
			return;
		}
		setIsValidURL(true);
		axios
			.post("http://localhost:8000/url", {
				url: URL,
			})
			.then((response) => {
				setURL(`http://localhost:8000/url/${response.data.id}`);
			})
			.catch((error) => console.log(error));
	}

	function isValidUrl(urlString) {
		var urlPattern = new RegExp(
			"^(http?:\\/\\/)?" +
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
		<div className="flex w-3/5 border-4 border-zinc-300 rounded-xl bg-white dark:bg-neutral-700 dark:border-neutral-600 ">
			<div className="p-10">
				<FaLink size={200} className="text-indigo-500" />
			</div>
			<div className="p-10 flex flex-col justify-center gap-6 w-full">
				<div className="w-full space-y-2">
					<label className="font-semibold text-lg dark:text-white">
						Enter URL to be shortned!
					</label>
					<div className="flex items-center gap-2 w-full">
						<input
							type="text"
							className="w-full outline-none rounded-md p-2 border-[0.125rem] border-neutral-400 text-neutral-700 bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-800 dark:text-neutral-300 focus:border-indigo-500  dark:focus:border-indigo-500 transition-all ease-linear"
							placeholder="https://www.example.com/"
							value={URL}
							onChange={(event) => setURL(event.target.value)}
							ref={inputRef}
						/>
						<button onClick={handleCopy}>
							<IoCopy size={30} className="text-indigo-500" />
						</button>
					</div>
					{!isValidURL && <p className="text-red-500">Please enter a valid URL!</p>}
				</div>
				<div className="flex justify-end">
					<button
						className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all ease-linear"
						onClick={handleShorten}
					>
						Shorten It!
					</button>
				</div>
			</div>
		</div>
	);
}
