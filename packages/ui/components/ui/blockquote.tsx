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
        "relative rounded-lg border-l-8 border-l-neutral-800 bg-background mb-2 py-5 pl-12 pr-5 font-sans text-lg italic leading-relaxed text-gray-200 before:absolute before:left-3 before:top-3 before:font-serif before:text-6xl before:text-gray-700 before:content-['“'] ",
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
