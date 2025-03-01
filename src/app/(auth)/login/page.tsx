import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center p-1 font-heading">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-center space-y-3">
            <h2 className="text-2xl">LUXORA</h2>
            <h1>Log into account</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {`Don't have an account? `}
            <Link href="/register" className="underline">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
