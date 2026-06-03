import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "./assets/default-profile.png";

import App from "./App.jsx";

import RegisterPage from "./pages/register.jsx";
import LoginPage from "./pages/login.jsx";
import HomePage from "./pages/home.jsx";
import NotFoundPage from "./pages/notFoundPage.jsx";
import Profile from "./pages/profile.jsx";
import InputInfo from "./pages/inputInfo.jsx";
import NewPostForm from "./components/newPostForm.jsx";

import { AuthContextProvider } from "./context/authContext.jsx";
import { CommentsProvider } from "./context/CommentsContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register/complete", element: <InputInfo /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/users/:username", element: <Profile /> },
  { path: "/create", element: <NewPostForm /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CommentsProvider>
        <RouterProvider router={router} />
      </CommentsProvider>
    </AuthContextProvider>
  </StrictMode>,
);
