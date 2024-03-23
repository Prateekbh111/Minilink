import { Link } from "react-router-dom";

export default function Title({ heading }) {
	return (
		<div className="space-y-2 mb-8">
			<h2 className="dark:text-white font-semibold">{heading}</h2>
			<Link to="/">
				<h1 className="font-Orbitron text-3xl font-semibold dark:text-white">
					Minilink
				</h1>
			</Link>
			<p className="text-neutral-600 dark:text-neutral-400 w-3/5">
				Transforming your cumbersome links to concise & shareable links
			</p>
		</div>
	);
}
