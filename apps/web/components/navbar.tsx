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
import { Menu } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky md:relative top-0 z-40 w-screen bg-transparent backdrop-blur-lg flex justify-between items-center p-8">
      <NavigationMenu
        className={cn("flex justify-between items-center w-full max-w-full")}
      >
        <div className="flex justify-start mx-8 md:mx-12">
          <Icons.logo className="text-orange-600 mt-1" />
          <a href="/" className="ml-1 font-bold text-xl flex">
            BeavBright
          </a>
        </div>
        {/* mobile */}
        <div className="flex md:hidden">
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
              className={`text-[17px] ${buttonVariants({
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
              className={`w-fit ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              Login
            </a>
            <a
              href="/register"
              className={`w-fit ${buttonVariants({
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

const ListItem: React.FC<any> = ({
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
          : ""
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
