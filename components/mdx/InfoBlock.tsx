import { ReactNode } from "react";

interface InfoBlockProps {
  children: ReactNode;
}

export function InfoBlock({ children }: InfoBlockProps) {
  return (
    <div className="bg-[#f2f2f2] my-2 py-1.5 pr-3 pl-4 border-l-5 border-[rgb(49,170,201)] text-base font-bold">
      {children}
    </div>
  );
}
