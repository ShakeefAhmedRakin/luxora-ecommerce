import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./_components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center p-1 font-heading">
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-center space-y-3">
              <h2 className="text-2xl">LUXORA</h2>
              <h1 className="font-medium">Create Account</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
