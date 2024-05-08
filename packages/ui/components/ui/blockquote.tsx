import { cn } from "@ui/lib/utils";
import React from "react";

type BlockquoteProps = {
  children?: React.ReactNode;
  className?: string;
};

const Blockquote = ({ children, className }: BlockquoteProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg border-l-8 border-l-secondary bg-muted mb-6 pl-12 py-4 pr-5 font-sans text-lg italic leading-relaxed text-gray-700 dark:text-foreground before:absolute before:left-3 before:top-2 before:font-serif before:text-6xl before:text-gray-700 before:content-['“'] ",
        className
      )}
    >
      {children}
    </div>
  );
};

const BlockquoteAuthor = ({ children, className }: BlockquoteProps) => {
  return (
    <p
      className={cn(
        "mt-5 pr-4 text-right font-bold not-italic text-gray-700",
        className
      )}
    >
      {children}
    </p>
  );
};

export { Blockquote, BlockquoteAuthor };
