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

export const sidebarNavItems = [
  {
    title: "Home",
    href: "/platform",
    icon: <HomeIcon size={24} />,
  },
  {
    title: "Study Groups",
    href: "/platform/study-groups",
    icon: <Users size={24} />,
  },
  {
    title: "Discussions",
    href: "/platform/discussions",
    icon: <ListIcon size={24} />,
  },
  {
    title: "Course Materials",
    href: "/platform/course-materials",
    icon: <BookIcon size={24} />,
  },
  {
    title: "Profile",
    href: "/platform/profile",
    icon: <User2Icon size={24} />,
  },
  {
    title: "Sign Out",
    href: "/logout",
    icon: <LogOutIcon size={24} />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid h-screen w-full pl-[53px]">
        <TooltipProvider>
          <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
              <a href="/">
                <Button variant="outline" size="icon" aria-label="Home">
                  <BrainIcon size={24} />
                </Button>
              </a>
            </div>
            <nav className="grid gap-1 p-2">
              {sidebarNavItems.slice(0, 4).map((item) => (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href={item.href}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg"
                          aria-label={item.title}
                        >
                          {item.icon}
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </>
              ))}
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
              {sidebarNavItems.slice(4).map((item) => (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href={item.href}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg"
                          aria-label={item.title}
                        >
                          {item.icon}
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </>
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
            <main className="flex-1 overflow-auto p-4">{children}</main>
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}
