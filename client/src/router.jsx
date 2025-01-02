import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthLayout } from "./pages/layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { RootLayout } from "./pages/layouts/RootLayout";
import { CurrentChats } from "./pages/CurrentChats";
import { NewChannel } from "./pages/channel/new";
import { PatientHome } from "./components/PatientHome"; // Import the PatientHome component
import { VideoChat } from "./pages/VideoChat"; // Import the VideoChat component

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
        element: <RootLayout />, // Layout for authenticated pages
        children: [
          // Home page
          {
            path: "channel",
            children: [
              {
                path: "new",
                element: <NewChannel />, // New Channel page
              },
            ],
          },
          {
            path: "patient",
            element: <PatientHome />, // Patient Home page
          },
          {
            path: "chat",
            element: <CurrentChats />, // Patient Home page
          },
          {
            path: "vidchat",
            element: <VideoChat />, // Patient Home page
          },
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
