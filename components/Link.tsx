import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "fill" | "bottom-line" | "none";
  className?: string;
  nextLinkClassName?: string;
  target?: string;
  rel?: string;
}

export default function Link({
  href,
  children,
  variant = "fill",
  className = "",
  nextLinkClassName = "",
  target,
  rel,
}: LinkProps) {
  const variantClasses = {
    fill: "inline hover-fill-link",
    "bottom-line": "inline hover-bottom-line-link",
    none: "",
  };

  // Check if it's an external link
  const isExternal =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    // For external links, use regular anchor tag
    return (
      <div className={cn(variantClasses[variant], className)}>
        <a href={href} className="inline-block" target={target} rel={rel}>
          {children}
        </a>
      </div>
    );
  }

  // For internal links, use Next.js Link
  return (
    <div className={cn(variantClasses[variant], className)}>
      <NextLink href={href} className={cn("inline-block", nextLinkClassName)}>
        {children}
      </NextLink>
    </div>
  );
}
