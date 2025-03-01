import { getUser } from "@/actions/auth";
import Link from "next/link";
import LogOutButton from "./logoutbutton";

export default async function Navbar() {
  const user = await getUser();

  return (
    <>
      <div className="flex justify-center gap-2">
        <h2>NAVBAR</h2>
        <div>{user ? <LogOutButton /> : <Link href="/login">Login</Link>}</div>
      </div>
    </>
  );
}
