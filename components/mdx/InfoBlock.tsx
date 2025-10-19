import { ReactNode } from "react";

interface InfoBlockProps {
  children: ReactNode;
}

export function InfoBlock({ children }: InfoBlockProps) {
  return (
    <div className="bg-[#f2f2f2] my-2 py-1 px-3 border-l-5 border-[rgb(49,170,201)] font-bold">
      {children}
    </div>
  );
}
