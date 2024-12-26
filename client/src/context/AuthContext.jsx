import { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Context = createContext(null);

const AuthContext = {
  user: null,
  streamChat: null,
  signup: null,
  login: null,
  logout: null,
};

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }) {
  const signup = useMutation({
    mutationFn: (user) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
  });

  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}
