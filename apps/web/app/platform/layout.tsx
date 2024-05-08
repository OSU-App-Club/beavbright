import {
  BookIcon,
  BrainIcon,
  HomeIcon,
  ListIcon,
  LogOutIcon,
  User2Icon,
  Users,
} from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import Link from "next/link";
import { sidebarNavItems } from "../lib/constants";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid h-full w-full pl-[53px]">
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
          <div className="flex flex-col pt-1">
            <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
              <h1 className="text-xl font-semibold">BeavBright</h1>
              <div className="ml-auto">
                <ModeToggle />
              </div>
            </header>
          </div>
        </TooltipProvider>
        <main className="flex flex-col w-full h-full p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}
