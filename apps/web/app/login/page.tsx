import Image from "next/image";

import { LoginForm } from "@/components/auth-form";
import { signIn } from "@/app/auth";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <form
          action={async () => {
            "use server"
            await signIn("google")
          }}
        > 
          <button className="border rounded-md" type="submit">
            <div className="flex flex-row justify-center items-center px-8 py-4">
              <Image 
                src="/google-icon.svg"
                alt="Google Logo"
                width="24"
                height="24"
                className="pr-2"
              />
              <span>Sign in with Google</span>
            </div>
            
          </button>
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
