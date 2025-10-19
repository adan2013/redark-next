import { ReactNode } from "react";

interface LayoutContainerProps {
  children: ReactNode;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  return <div className="flex flex-col md:flex-row">{children}</div>;
}
