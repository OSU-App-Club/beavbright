import Image from "next/image";

import { signIn } from "@/app/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BeavBright - Login",
  description:
    "A fully-featured study-platform for Oregon State University Students. Find course materials, create study groups, and more.",
  openGraph: {
    type: "website",
    url: "https://beavbright-web.vercel.app/",
    title: "BeavBright - Login",
    description:
      "A fully-featured study-platform for Oregon State University Students. Find course materials, create study groups, and more.",
    siteName: "BeavBright",
    images: [
      {
        url: "https://beavbright-web.vercel.app/images/og.png",
        secureUrl: "https://beavbright-web.vercel.app/images/og.png",
        width: 2880,
        height: 1612,
        alt: "BeavBright - Login",
      },
    ],
  },
};

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <form
          action={async () => {
            "use server";
            await signIn("google", {
              redirect: true,
              redirectTo: "/platform",
            });
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
