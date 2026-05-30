import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import HomePage from "./pages/home.jsx";
import NotFoundPage from "./pages/notFoundPage.jsx";

import { AuthContextProvider } from "./context/authContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
);
