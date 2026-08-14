import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/register";
import Login from "./features/auth/pages/login";
import ProtectedRoute from "./features/auth/components/protected";

export const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <h1>Home Page</h1>
      </ProtectedRoute>
    ),
  },
]);