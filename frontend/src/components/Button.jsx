export default function Button({ children, ...props }) {
	return (
		<button
			{...props}
			className="bg-lime-500 border-2 border-lime-500 w-full rounded-xl shadow-lg p-2 font-medium hover:bg-lime-600 transition-all ease-linear "
		>
			{children}
		</button>
	);
}
