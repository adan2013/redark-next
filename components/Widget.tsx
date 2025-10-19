import { ReactNode } from "react";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface WidgetProps {
  title?: string;
  children: ReactNode;
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <div className="p-0 bg-gray-50 border border-gray-400 mb-4">
      {title && (
        <div
          className={`text-xl bg-[#d40000] py-2 px-3 mx-[-5px] my-4 widget-title-shadow leading-tight text-white widget-text-shadow ${anton.className}`}
        >
          {title}
        </div>
      )}
      <div className="py-2 px-1.5 text-gray-700">{children}</div>
    </div>
  );
}
