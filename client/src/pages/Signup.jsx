import React, { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Signup() {
  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const imageUrlRef = useRef(null);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign up</h1>
      <form className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end">
        <label htmlFor="userName">Username</label>
        <Input id="userName" pattern="\S*" required ref={usernameRef} />
        <label htmlFor="name">Name</label>
        <Input id="name" required ref={nameRef} />
        <label htmlFor="imageUrl">Image Url</label>
        <Input id="imageUrl" type="url" ref={imageUrlRef} />
        <Button type="submit" className="col-span-full">
          Sign Up
        </Button>
      </form>
    </>
  );
}
