import Link from "next/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex font-heading">
      <div
        className="flex-1 w-full h-full hidden lg:block"
        style={{
          backgroundImage: 'url("/test.jpg")',
          backgroundPosition: "right",
        }}
      ></div>

      <div className="flex flex-col w-full max-w-lg mx-auto px-4 md:px-10 lg:px-20 justify-center items-center">
        <div className="w-full">
          <h1 className="text-3xl font-medium">
            Welcome back <br></br>
            to <span className="font-bold text-4xl">LUXORA</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 mb-4">
            Please Enter Your Information Below
          </p>
          <LoginForm />
          <p className="text-sm text-muted-foreground text-center mt-3">
            {`Don't have an account? `}
            <Link
              href="/register"
              className="underline text-primary font-medium"
            >
              Create here
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/support?type=authentication"
            className="underline text-sm font-medium"
          >
            Trouble logging in?
          </Link>
        </div>
      </div>
    </div>
  );
}
