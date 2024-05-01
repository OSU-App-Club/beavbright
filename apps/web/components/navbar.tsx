"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@ui/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/ui/sheet";
import { useState } from "react";

import { routeList } from "@/lib/constants";
import { Button } from "@ui/components/ui/button";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { BrainCog, Menu } from "lucide-react";
import { sidebarNavItems } from "../app/platform/layout";
import { SidebarNav } from "./nav-links";

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky md:relative top-0 z-40 ml-8 w-full bg-transparent backdrop-blur-lg flex justify-between items-center p-8 -mb-12 lg:mb-12">
      <NavigationMenu
        className={cn("flex justify-between items-center w-full max-w-full")}
      >
        <div className="flex justify-start md:mx-28">
          <Icons.logo className="text-orange-600 mt-1" />
          <a href="/" className="ml-1 font-bold text-xl flex">
            BeavBright
          </a>
        </div>
        {/* mobile */}
        <div className="flex justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2" asChild>
              <Button variant="ghost" className={cn("self-end")}>
                <Menu className="h-5 w-5" onClick={() => setIsOpen(true)} />
              </Button>
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="font-bold text-xl">
                  BeavBright
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                <ModeToggle />
                {routeList.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="https://github.com/OSU-App-Club/beavbright"
                  target="_blank"
                  className={`w-[100px] border ${buttonVariants({
                    variant: "secondary",
                  })}`}
                >
                  <GitHubLogoIcon className="mr-2 w-5 h-5" />
                  Github
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* desktop */}
        <NavigationMenuList className="hidden md:flex justify-center items-center w-full">
          {routeList.map((route, i) => (
            <a
              href={route.href}
              key={i}
              className={`text-xl ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              {route.label}
            </a>
          ))}
        </NavigationMenuList>
        <div className="hidden md:flex justify-end mx-12">
          <NavigationMenuItem className="flex items-center justify-end gap-2">
            <a
              href="/login"
              className={`w-fit text-xl ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              Login
            </a>
            <a
              href="/register"
              className={`w-fit text-xl ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              Register
            </a>
            <ModeToggle />
          </NavigationMenuItem>
        </div>
      </NavigationMenu>
    </header>
  );
}

export const ListItem: React.FC<any> = ({
  title,
  href,
  description,
  disabled,
  external,
}) => {
  const target = external ? "_blank" : undefined;

  return (
    <a
      href={disabled ? undefined : href}
      target={target}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        disabled
          ? "text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
          : "",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="mr-2">{title}</span>
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </a>
  );
};

ListItem.displayName = "ListItem";

export default function PlatformNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 w-full">
      <div className="container h-14 px-4 w-screen flex justify-between">
        <div className="font-bold flex items-center mx-12 gap-4">
          <BrainCog className="w-6 h-6" />
          <a href="/" className=" font-bold text-xl"></a>
        </div>

        {/* mobile */}
        <div className="flex md:hidden items-center justify-center gap-8 mx-4">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2" asChild>
              <Button variant="ghost">
                <Menu className="h-5 w-5" onClick={() => setIsOpen(true)} />
              </Button>
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="font-bold text-xl">
                  BeavBright
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                {routeList.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex flex-row gap-4 justify-center items-center mx-12">
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="hidden lg:flex flex-row justify-start items-start">
          <SidebarNav items={sidebarNavItems} className="w-4/6" />
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </header>
  );
}
