import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authenticationActions } from "./store/authentication.slice";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <HomePage /> },
				{ path: "signup", element: <SignUp /> },
				{ path: "login", element: <LoginPage /> },
			],
		},
	]);

	const dispatch = useDispatch();
	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem("auth"));
		if (!auth) return;
		console.log(auth);
		dispatch(authenticationActions.setAuth({ auth: auth }));
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
