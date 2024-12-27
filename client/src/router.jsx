import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthLayout } from "./pages/layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RootLayout } from "./pages/layouts/RootLayout";
import { Home } from "./pages/Home";

// ContextWrapper component to provide AuthProvider context
function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet /> {/* Renders the matched child route */}
    </AuthProvider>
  );
}

// Define the router configuration
export const router = createBrowserRouter([
  {
    element: <ContextWrapper />, // Wraps the routes with AuthProvider context
    children: [
      {
        element: <RootLayout />, // Layout for authentication-related pages
        children: [
          { index: true, element: <Home /> }, // Login page
          {
            path: "channel",
            children: [
              {
                path: "new",
                element: <h1>New Channel</h1>,
              },
            ],
          }, // Signup page
        ],
      },
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

export default router;
