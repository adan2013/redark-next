import { ReactNode } from "react";

interface QuoteProps {
  children: ReactNode;
  source?: string;
}

export function Quote({ children, source }: QuoteProps) {
  return (
    <blockquote className="text-lg italic my-1.5 mx-[5px] py-1 px-[25px] leading-[1.45] relative text-[var(--sub-text-color)] border-l-0">
      <span
        className="block absolute text-[86px] left-[-20px] top-[-20px] text-[#7a7a7a]"
        aria-hidden="true"
      >
        "
      </span>
      {children}
      {source && (
        <cite className="text-[#999999] text-sm block mt-0.5">
          —{"\u2009"}
          {source}
        </cite>
      )}
    </blockquote>
  );
}
