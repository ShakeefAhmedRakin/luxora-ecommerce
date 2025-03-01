import { getUser } from "@/actions/auth";
import Link from "next/link";
import LogOutButton from "./_components/logout-button";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

export default async function Navbar() {
  const user = await getUser();

  return (
    <>
      <div className="flex justify-center gap-2">
        <h2>NAVBAR</h2>
        <div>
          {user ? (
            <LogOutButton />
          ) : (
            <Link href="/login" className="w-24">
              <Button className="w-24">
                Login <LogInIcon />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
