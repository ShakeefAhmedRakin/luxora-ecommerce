"use client";
import { logOutUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { ServerResponseType } from "@/types/responses";
import { Loader2, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LogOutButton() {
  const [pending, setPending] = useState(false);

  const handleLogout = async () => {
    setPending(true);
    const response: ServerResponseType = await logOutUser();

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setPending(false);
  };

  return (
    <>
      <Button className="w-24" onClick={handleLogout} disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin"></Loader2>
          </>
        ) : (
          <>
            Logout <LogOutIcon />
          </>
        )}
      </Button>
    </>
  );
}
