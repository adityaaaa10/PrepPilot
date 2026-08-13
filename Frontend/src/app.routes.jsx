import {createBrowserRouter} from "react-router";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <h1>Home page</h1>
    }
])