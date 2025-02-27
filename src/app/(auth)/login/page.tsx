"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import { loginUser } from "../actions";
import { toast } from "sonner";
import { AuthResponseType } from "@/types/auth";

const initialAuthResponse: AuthResponseType = { success: null, message: "" };

export default function LoginPage() {
  const [responseState, action, pending] = useActionState(
    loginUser,
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
