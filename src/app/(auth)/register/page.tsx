import RegisterForm from "../_components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex font-heading">
      <div
        className="flex-1 w-full h-full hidden lg:block"
        style={{
          backgroundImage: 'url("/test.jpg")',
          backgroundPosition: "right",
        }}
      ></div>

      <div className="flex w-full max-w-lg flex-col mx-auto px-8 md:px-10 lg:px-20 justify-center items-center">
        <div className="w-full">
          <h1 className="text-3xl font-medium">
            Get Started <br></br>with{" "}
            <span className="font-bold text-4xl">LUXORA</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 mb-4">
            Please Enter Your Information Below
          </p>
          <RegisterForm />
          <p className="text-sm text-muted-foreground text-center mt-3">
            {`Already have an account? `}
            <Link href="/login" className="underline text-primary font-medium">
              Login here
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/support?type=authentication"
            className="underline text-sm font-medium"
          >
            Trouble registering?
          </Link>
        </div>
      </div>
    </div>
  );
}
