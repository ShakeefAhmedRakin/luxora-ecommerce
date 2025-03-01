"use client";
import { logOutUser } from "@/actions/auth";

export default function LogOutButton() {
  return (
    <>
      <button onClick={logOutUser}>Logout</button>
    </>
  );
}
