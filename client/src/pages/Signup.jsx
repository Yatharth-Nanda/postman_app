import React, { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function Signup() {
  const { signup } = useAuth(); // Destructure signup from useAuth
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const imageUrlRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (signup.isLoading) return; // to not do anything in loading state

    const username = usernameRef.current.value;
    const name = nameRef.current.value;
    const imageUrl = imageUrlRef.current.value;

    if (
      username == null ||
      username === "" ||
      name == null ||
      name === "" 
    ) {
      console.log("Invalid input");
      return;
    }

    console.log("Submitting:", { username, name, imageUrl });
    signup.mutate({ id: username, name, imageUrl });
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label htmlFor="userName">Username</label>
        <Input id="userName" pattern="\S*" required ref={usernameRef} />
        <label htmlFor="name">Name</label>
        <Input id="name" required ref={nameRef} />
        <label htmlFor="imageUrl">Image Url</label>
        <Input id="imageUrl" type="url" ref={imageUrlRef} />
        <Button
          disabled={signup.isLoading}
          type="submit"
          className="col-span-full"
        >
          {signup.isLoading ? "Loading..." : "Sign up"}
        </Button>
      </form>
    </>
  );
}
