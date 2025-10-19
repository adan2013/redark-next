import { ReactNode } from "react";

interface ImageDescriptionProps {
  children: ReactNode;
}

export function ImageDescription({ children }: ImageDescriptionProps) {
  return (
    <div className="block text-center text-xs italic my-2 mx-auto mb-4 max-w-[450px]">
      {children}
    </div>
  );
}
