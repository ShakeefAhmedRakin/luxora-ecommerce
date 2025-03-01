"use client";
import { loginUserWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { ServerResponseType } from "@/types/responses";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginGoogleButton() {
  const [pending, setPending] = useState(false);

  const handleLoginWithGoogle = async () => {
    setPending(true);

    const response: ServerResponseType<{ callbackUrl: string }> =
      await loginUserWithGoogle();

    if (response.success && response?.data?.callbackUrl) {
      window.location.replace(response.data.callbackUrl);
    } else {
      toast.error(response.message);
    }
    setPending(false);
  };
  return (
    <Button
      onClick={handleLoginWithGoogle}
      disabled={pending}
      variant={"outline"}
      className="w-full"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin"></Loader2>
        </>
      ) : (
        <>
          Login with Google <FcGoogle />
        </>
      )}
    </Button>
  );
}
