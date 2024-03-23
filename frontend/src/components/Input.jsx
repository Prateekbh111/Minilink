export default function Input({ error, errorMsg, children, ...props }) {
	return (
		<>
			<div className="w-full flex items-center px-3 py-2 bg-white rounded-xl border-2 shadow-sm dark:bg-black dark:border-neutral-700">
				<input
					className="w-full outline-none dark:bg-black dark:text-neutral-200"
					{...props}
				/>
				{children}
			</div>
			{error && <p className="text-red-500 text-xs italic">{errorMsg}</p>}
		</>
	);
}
