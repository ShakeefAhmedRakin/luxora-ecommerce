"use client";
import { useActionState } from "react";
import { useEffect } from "react";
import { registerUser } from "@/actions/auth";
import { toast } from "sonner";
import { ServerResponseType } from "@/types/responses";
import { useRouter } from "next/navigation";

const initialAuthResponse: ServerResponseType = { success: null, message: "" };

export default function RegisterPage() {
  const router = useRouter();
  const [authResponse, action, pending] = useActionState(
    registerUser,
    initialAuthResponse
  );

  useEffect(() => {
    if (authResponse.success !== null) {
      if (authResponse.success) {
        toast.success(authResponse.message);
        router.push("/");
      } else {
        toast.error(authResponse.message);
      }
    }
  }, [authResponse, router]);

  return (
    <form action={action} className="flex flex-col gap-3">
      <label htmlFor="fullname">Full Name:</label>
      <input
        id="fullname"
        name="fullname"
        type="text"
        required
        autoComplete="name"
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
