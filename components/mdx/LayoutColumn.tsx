import { ReactNode } from "react";

interface LayoutColumnProps {
  children: ReactNode;
}

export function LayoutColumn({ children }: LayoutColumnProps) {
  return <div className="min-w-0 p-2 flex-1">{children}</div>;
}
