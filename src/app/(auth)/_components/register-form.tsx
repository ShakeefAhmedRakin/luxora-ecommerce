"use client";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { registerUser } from "@/actions/auth";
import { toast } from "sonner";
import { defaultServerResponse } from "@/types/responses";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [serverResponse, action, pending] = useActionState(
    registerUser,
    defaultServerResponse
  );

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (serverResponse.success !== null) {
      if (serverResponse.success) {
        toast.success(serverResponse.message);
        router.push("/");
      } else {
        toast.error(serverResponse.message);
      }
    }
  }, [serverResponse, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      action={async (formData) => {
        action(formData);
      }}
      className="flex flex-col gap-4"
    >
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          name="fullname"
          type="text"
          required
          placeholder="Full Name"
          disabled={pending}
          value={formData.fullname}
          onChange={handleChange}
        />
      </div>
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
      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          required
          placeholder="Password"
          disabled={pending}
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <Input
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
          disabled={pending}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <Button disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Please wait
          </>
        ) : (
          <>Create account</>
        )}
      </Button>
    </form>
  );
}
