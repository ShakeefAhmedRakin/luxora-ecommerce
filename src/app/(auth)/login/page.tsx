"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import { loginUser } from "../actions";
import { toast } from "sonner";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginUser, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={action} className="flex flex-col gap-3">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" />
      <button type="submit">{pending ? "XXX" : "Login"}</button>
    </form>
  );
}
