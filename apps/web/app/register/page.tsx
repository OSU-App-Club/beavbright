import Image from "next/image";

import { RegisterForm } from "@/components/auth-form";
import { signIn } from "@/app/auth";

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <RegisterForm />
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/campus.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="w-full object-cover dark:brightness-[0.2] max-h-screen"
        />
      </div>
    </div>
  );
}
