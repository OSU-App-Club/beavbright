import { Button, buttonVariants } from "@ui/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const logOut = async (host: string) => {
  let data = await fetch(`http://${host}/api/auth/logout`);
  if (data.status === 200) {
    redirect("/");
  } else {
    throw new Error("Failed to log out");
  }
};

export default async function LogoutPage() {
  const host = headers().get("host");
  await logOut(host ?? "");
  return (
    <>
      <div className="flex items-center justify-center py-24 px-4 md:px-6">
        <div className="grid gap-4 w-full max-w-sm text-center">
          <div className="mx-auto rounded-full border border-gray-200  bg-white shadow-lg dark:border-secondary dark:bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full"
            >
              <LogOutIcon className="w-8 h-8" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Logged out
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-8">
              You have been logged out of Beavbright.
            </p>
            <div className="flex justify-center">
              <Link
                href="/login"
                className={`w-fit text-xs ${buttonVariants({
                  variant: "link",
                })}`}
              >
                Log in again
              </Link>

              <Link
                href="/"
                className={`w-fit text-xs ${buttonVariants({
                  variant: "link",
                })}`}
              >
                Go to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
