"use client";
import { loginUserWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function LoginGoogleButton({
  pending,
  setPending,
  buttonText = "Login with Google",
}: {
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText?: string;
}) {
  const handleLoginWithGoogle = async () => {
    setPending(true);

    const { success, message, data } = await loginUserWithGoogle();

    if (success && data) {
      window.location.replace(data.callbackUrl);
    } else {
      toast.error(message);
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
          <FcGoogle /> {buttonText}
        </>
      )}
    </Button>
  );
}
