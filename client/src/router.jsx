import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthLayout } from "./pages/layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

// Define the router configuration
export const router = createBrowserRouter([
  {
    element: <ContextWrapper />, // Wraps the routes with AuthProvider context
    children: [
      {
        element: <AuthLayout />, // Layout for authentication-related pages
        children: [
          { path: "login", element: <Login /> }, // Login page
          { path: "signup", element: <Signup /> }, // Signup page
        ],
      },
    ],
  },
]);

// ContextWrapper component to provide AuthProvider context
function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet /> {/* Renders the matched child route */}
    </AuthProvider>
  );
}
