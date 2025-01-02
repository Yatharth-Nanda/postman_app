import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RootLayout() {
  const { user } = useAuth(); // picks from the context from authprovider 

  if (user == null) {
    return <Navigate to="/login" />; // is user does not exist , redirect to login 
  }
  return <Outlet />;
}
