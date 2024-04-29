import Image from "next/image";

import { LoginForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <LoginForm />
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
