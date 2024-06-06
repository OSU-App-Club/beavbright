import { Button, buttonVariants } from "@ui/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { logOutUser } from "../lib/actions";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const logout = await logOutUser();
  if (!logout) {
    return null;
  } else {
    redirect("/login");
  }
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
