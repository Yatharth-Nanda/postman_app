import React, { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function Login() {
  const { login, user } = useAuth(); // Destructure login and user from useAuth
  const usernameRef = useRef(null);

  console.log("Login component rendered");
  console.log("User state:", user);

  if (user != null) {
    console.log("User is already logged in, redirecting to home");
    return <Navigate to="/" />;
  }

  console.log("User is here");

  function handleSubmit(event) {
    console.log("handleSubmit called");
    event.preventDefault();

    console.log("Form submitted");

    if (login.isLoading) {
      console.log("Login is currently loading, returning early");
      return; // to not do anything in loading state
    }

    const username = usernameRef.current.value;

    if (username == null || username === "") {
      console.log("Invalid input");
      return;
    }

    console.log("Submitting:", { username });
    login.mutate(username); // Pass the username directly
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label htmlFor="userName">Username</label>
        <Input id="userName" required ref={usernameRef} />

        <Button
          disabled={login.isLoading}
          type="submit"
          className="col-span-full"
        >
          {login.isLoading ? "Loading..." : "Log in"}
        </Button>
      </form>
    </>
  );
}
