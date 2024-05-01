"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-col justify-center items-center h-full rounded-md w-full backdrop-filter backdrop-blur-lg bg-opacity-10 gap-1 mt-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center text-center rounded-md ml-6 hover:bg-primary-foreground hover:text-primary-background w-24 h-18",
                    {
                      "bg-primary-foreground text-primary-background":
                        pathname === item.href,
                    },
                  )}
                >
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <>{item.icon}</>
                    <p className="hidden lg:block text-xs">{item.title}</p>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>{item.title}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ))}
    </nav>
  );
}
