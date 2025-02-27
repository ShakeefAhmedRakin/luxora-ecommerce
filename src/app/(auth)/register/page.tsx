"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import { registerUser } from "../actions";
import { toast } from "sonner";
import { AuthResponseType } from "@/types/auth";

const initialAuthResponse: AuthResponseType = { success: null, message: "" };

export default function RegisterPage() {
  const [responseState, action, pending] = useActionState(
    registerUser,
    initialAuthResponse
  );

  useEffect(() => {
    if (responseState.message) {
      if (responseState.success) {
        toast.success(responseState.message);
      } else {
        toast.error(responseState.message);
      }
    }
  }, [responseState]);

  return (
    <form action={action} className="flex flex-col gap-3">
      <label htmlFor="displayName">Display Name:</label>
      <input
        id="displayName"
        name="displayName"
        type="text"
        required
        autoComplete="username"
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />

      <button type="submit" disabled={pending}>
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
