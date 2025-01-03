import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { useLocalStorage } from "../hooks/useLocalStorage"; // Ensure this import is correct/
import { StreamVideoClient } from "@stream-io/video-react-sdk";

const Context = createContext(null);

export function useAuth() {
  return useContext(Context); //any variables part of the context are passed down
}

export function useLoggedInAuth() {
  const context = useContext(Context);
  if (!context.user) {
    // if it is null
    throw new Error("User is not logged in");
  }
  return context;
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");
  const [streamChat, setStreamChat] = useState(null);

  const signup = useMutation({
    mutationFn: (user) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
    onSuccess() {
      navigate("/login"); //calling the hook
    },
  });

  const login = useMutation({
    mutationFn: (id) => {
      return axios
        .post(`${import.meta.env.VITE_SERVER_URL}/login`, { id })
        .then((res) => {
          const { token, user } = res.data;
          return { token, user };
        });
    },
    onSuccess(data) {
      console.log("Login successful:", data);
      setUser(data.user);
      setToken(data.token);
    },
  });

  const logout = useMutation({
    mutationFn: () => {
      console.log("Logging out");
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`, { token });
    },
    onSuccess() {
      setUser(undefined);
      setToken(undefined);
      setStreamChat(undefined);
      navigate("/login");
    },
  });

  //sets up a new stream chat instance to be used by all children wrapped in this context provider
  useEffect(() => {
    if (token == null || user == null) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY);

    if (chat.tokenManager.token === token && chat.userID === user.id) return;

    let isInterrupted = false;
    const connectPromise = chat.connectUser(user, token).then(() => {
      if (isInterrupted) return;
      setStreamChat(chat);
    });

    return () => {
      isInterrupted = true;
      setStreamChat(undefined);

      connectPromise.then(() => {
        chat.disconnectUser();
      });
    };
  }, [token, user]);

  return (
    <Context.Provider
      value={{
        signup,
        login,
        logout,
        user,
        token,
        streamChat,
      }} //passing all these as context
    >
      {children}
    </Context.Provider>
  );
}
