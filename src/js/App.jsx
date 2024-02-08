import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import TopUpPage from "./pages/TopUpPage";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import TwoFactorPage from "./pages/TwoFactorPage";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/login",
		element: <LoginPage />
	},
	{
		path: "/login/totp",
		element: <TwoFactorPage />
	},
	{
		path: "/register",
		element: <RegisterPage />
	},
	{
		path: "/profile",
		element: <ProfilePage />
	},
	{
		path: "/topup",
		element: <TopUpPage />
	}
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<MantineProvider defaultColorScheme="auto">
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>);