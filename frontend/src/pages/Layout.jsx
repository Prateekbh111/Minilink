import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

export default function Layout() {
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
			<Outlet />
		</div>
	);
}
