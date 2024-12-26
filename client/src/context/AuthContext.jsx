import { createContext, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Context = createContext(null);

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }) {
  const signup = useMutation({
    mutationFn: (user) => {
      return axios.post(`${impport.meta.env.VITE_SERVER_URL}/signup`, user); // might give error
    },
  });

  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}
