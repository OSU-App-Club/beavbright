import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { BrainIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import UserAvatar from "../avatar";
import { sidebarNavItems } from "../lib/constants";
import { getSession } from "../lib/session";

export const metadata: Metadata = {
  title: "BeavBright - Platform",
  description:
    "A fully-featured study-platform for Oregon State University Students. Find course materials, create study groups, and more.",
  openGraph: {
    type: "website",
    url: "https://beavbright-web.vercel.app/",
    title: "BeavBright - Platform",
    description:
      "A fully-featured study-platform for Oregon State University Students. Find course materials, create study groups, and more.",
    siteName: "BeavBright",
    images: [
      {
        url: "https://beavbright-web.vercel.app/images/og.png",
        secureUrl: "https://beavbright-web.vercel.app/images/og.png",
        width: 2880,
        height: 1612,
        alt: "BeavBright - Platform",
      },
    ],
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return (
    <>
      <div className="grid h-full w-full md:pl-[53px]">
        {/* mobile */}
        <div className="md:hidden fixed w-full z-10">
          <div className="flex flex-col">
            <header className="sticky top-0 z-10 flex h-[50px] items-center gap-1 border-b bg-background px-2">
              <Button className="px-2 mr-1" variant="ghost">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold">BeavBright</h1>
              <div className="ml-auto flex flex-row gap-4 justify-center items-center">
                <ModeToggle />
              </div>
            </header>
          </div>
        </div>
        {/* desktop */}
        <div className="max-md:hidden fixed w-full z-20 pr-[53px]">
          <TooltipProvider>
            <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
              <div className="border-b p-2">
                <a href="/">
                  <Button variant="outline" size="icon" aria-label="Home">
                    <BrainIcon size={24} />
                  </Button>
                </a>
              </div>
              <nav className="grid gap-1 p-2">
                {sidebarNavItems.slice(0, 4).map((item) => (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label={item.title}
                      >
                        <Link href={item.href}>{item.icon}</Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
              <nav className="mt-auto grid gap-1 p-2">
                {sidebarNavItems.slice(4).map((item) => (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label={item.title}
                      >
                        <Link href={item.href}>{item.icon}</Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            </aside>
            <div className="flex flex-col pt-1 bg-background">
              <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                <h1 className="text-xl font-semibold ml-2">BeavBright</h1>
                <div className="ml-auto flex flex-row gap-4 justify-center items-center mr-4">
                  <UserAvatar session={session} />
                  <ModeToggle />
                </div>
              </header>
            </div>
          </TooltipProvider>
        </div>

        <main className="flex flex-col w-full h-full p-4 overflow-y-auto mt-[50px] md:mt-[57px]">
          {children}
        </main>
      </div>
    </>
  );
}
