"use client";
import { useState } from "react";
import { loginUser } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import LoginGoogleButton from "./login-google-button";
import Link from "next/link";
import SeparatorWithText from "@/components/ui/separator-with-text";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const { success, message } = await loginUser(formData);
    if (success) {
      toast.success(message);
      router.push("/");
    } else {
      toast.error(message);
    }
    setPending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <LoginGoogleButton pending={pending} setPending={setPending} />
      <SeparatorWithText className="my-2">OR</SeparatorWithText>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            required
            placeholder="Email"
            disabled={pending}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2 my-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              required
              placeholder="Password"
              disabled={pending}
              value={formData.password}
              onChange={handleChange}
              className="relative pr-8"
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer h-4 w-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed className="text-muted-foreground w-full h-full" />
              ) : (
                <Eye className="text-muted-foreground w-full h-full" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <Link
            href={"/forgot-password"}
            className="text-xs font-medium hover:underline w-fit"
          >
            Forgot Password?
          </Link>
        </div>

        <Button disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <>Login</>
          )}
        </Button>
      </form>
    </>
  );
}
