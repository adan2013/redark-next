import { ReactNode } from "react";

interface WarningBlockProps {
  children: ReactNode;
}

export function WarningBlock({ children }: WarningBlockProps) {
  return (
    <div className="bg-[#f2f2f2] my-2 py-1.5 pr-3 pl-4 border-l-5 border-[#d40000] text-base font-bold">
      {children}
    </div>
  );
}
